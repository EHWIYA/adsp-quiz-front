import { useEffect, useState } from 'react'
import * as styles from './AutoClassificationSettings.css'
import {
  useAutoClassificationSettings,
  useUpdateAutoClassificationSettings,
} from '../../api/coreContent'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { useUIStore } from '../../store/uiStore'
import {
  getAutoReviewPreferences,
  saveAutoReviewPreferences,
  type HighlightColorPreset,
  type HighlightDurationPreset,
  type HighlightMode,
} from '../../utils/autoReviewPreferences'
import type {
  ApiError,
  AutoClassificationCategoryRule,
  AutoClassificationSettings as AutoClassificationSettingsResponse,
} from '../../api/types'

type SettingsFormState = {
  min_confidence: string
  strategy: 'hybrid' | 'similarity_only' | 'keyword_only'
  keyword_weight: string
  similarity_weight: string
  max_candidates: string
  text_preview_length: string
}

type ReviewFormState = {
  approve_reason_min_length: string
  reject_reason_min_length: string
  highlight_color_preset: HighlightColorPreset
  highlight_duration_preset: HighlightDurationPreset
  highlight_mode: HighlightMode
  highlight_custom_color: string
  highlight_custom_duration_ms: string
  approve_templates_text: string
  reject_templates_text: string
}

export const AutoClassificationSettings = () => {
  const { data, isLoading, isError, error } = useAutoClassificationSettings()
  const updateMutation = useUpdateAutoClassificationSettings()
  const { setLoading } = useUIStore()
  const [form, setForm] = useState<SettingsFormState | null>(null)
  const [reviewForm, setReviewForm] = useState<ReviewFormState>(() => {
    const preferences = getAutoReviewPreferences()
    return {
      approve_reason_min_length: String(preferences.approveReasonMinLength),
      reject_reason_min_length: String(preferences.rejectReasonMinLength),
      highlight_color_preset: preferences.highlightColorPreset,
      highlight_duration_preset: preferences.highlightDurationPreset,
      highlight_mode: preferences.highlightMode,
      highlight_custom_color: preferences.highlightCustomColor,
      highlight_custom_duration_ms: String(preferences.highlightCustomDurationMs),
      approve_templates_text: preferences.approveTemplates.join('\n'),
      reject_templates_text: preferences.rejectTemplates.join('\n'),
    }
  })
  const [rulesText, setRulesText] = useState('')
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '알림',
    message: '',
    confirmText: '확인',
  })

  useEffect(() => {
    if (!data) return
    setForm({
      min_confidence: String(data.min_confidence),
      strategy: data.strategy,
      keyword_weight: String(data.keyword_weight),
      similarity_weight: String(data.similarity_weight),
      max_candidates: String(data.max_candidates),
      text_preview_length: String(data.text_preview_length),
    })
    setRulesText(data.category_rules ? JSON.stringify(data.category_rules, null, 2) : '')
  }, [data])

  const openAlert = (message: string) => {
    setAlertState({ isOpen: true, title: '알림', message, confirmText: '확인' })
  }

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
  }

  const parseNumber = (value: string, label: string) => {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) {
      openAlert(`${label} 값을 확인해주세요.`)
      return null
    }
    return parsed
  }

  const parseTemplates = (value: string) => {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  }

  const handleSave = () => {
    if (!form) return
    const minConfidence = parseNumber(form.min_confidence, 'min_confidence')
    const keywordWeight = parseNumber(form.keyword_weight, 'keyword_weight')
    const similarityWeight = parseNumber(form.similarity_weight, 'similarity_weight')
    const maxCandidates = parseNumber(form.max_candidates, 'max_candidates')
    const textPreviewLength = parseNumber(form.text_preview_length, 'text_preview_length')
    if (
      minConfidence == null ||
      keywordWeight == null ||
      similarityWeight == null ||
      maxCandidates == null ||
      textPreviewLength == null
    ) {
      return
    }

    let categoryRules: AutoClassificationCategoryRule[] | undefined
    if (rulesText.trim()) {
      try {
        const parsed = JSON.parse(rulesText) as AutoClassificationCategoryRule[]
        if (!Array.isArray(parsed)) {
          openAlert('category_rules는 배열 형식이어야 합니다.')
          return
        }
        categoryRules = parsed
      } catch {
        openAlert('category_rules JSON 형식을 확인해주세요.')
        return
      }
    }

    const payload: AutoClassificationSettingsResponse = {
      min_confidence: minConfidence,
      strategy: form.strategy,
      keyword_weight: keywordWeight,
      similarity_weight: similarityWeight,
      max_candidates: maxCandidates,
      text_preview_length: textPreviewLength,
      category_rules: categoryRules,
    }

    setLoading(true)
    updateMutation.mutate(payload, {
      onSuccess: () => {
        setLoading(false)
        openAlert('설정이 저장되었습니다.')
      },
      onError: (error) => {
        const apiError = error as ApiError
        setLoading(false)
        openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
      },
    })
  }

  const handleSaveReviewSettings = () => {
    const approveMin = parseNumber(reviewForm.approve_reason_min_length, 'approve_reason_min_length')
    const rejectMin = parseNumber(reviewForm.reject_reason_min_length, 'reject_reason_min_length')
    const customDuration = parseNumber(reviewForm.highlight_custom_duration_ms, 'highlight_custom_duration_ms')
    if (approveMin == null || rejectMin == null) return
    if (customDuration == null) return

    const nextApproveTemplates = parseTemplates(reviewForm.approve_templates_text)
    const nextRejectTemplates = parseTemplates(reviewForm.reject_templates_text)
    const currentPreferences = getAutoReviewPreferences()
    const nextApproveFavorites = currentPreferences.approveTemplateFavorites.filter((item) =>
      nextApproveTemplates.includes(item)
    )
    const nextRejectFavorites = currentPreferences.rejectTemplateFavorites.filter((item) =>
      nextRejectTemplates.includes(item)
    )

    saveAutoReviewPreferences({
      approveReasonMinLength: approveMin,
      rejectReasonMinLength: rejectMin,
      approveTemplates: nextApproveTemplates,
      rejectTemplates: nextRejectTemplates,
      approveTemplateFavorites: nextApproveFavorites,
      rejectTemplateFavorites: nextRejectFavorites,
      highlightColorPreset: reviewForm.highlight_color_preset,
      highlightDurationPreset: reviewForm.highlight_duration_preset,
      highlightMode: reviewForm.highlight_mode,
      highlightCustomColor: reviewForm.highlight_custom_color,
      highlightCustomDurationMs: customDuration,
    })
    openAlert('검수 UI 설정이 저장되었습니다.')
  }

  if (isLoading || !form) {
    return <p className={styles.emptyText}>설정을 불러오는 중...</p>
  }

  if (isError) {
    const apiError = error as ApiError
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>설정을 불러오는 중 오류가 발생했습니다.</p>
        {apiError?.message && <p className={styles.helperText}>{apiError.message}</p>}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>자동 분류 설정</h2>
      </div>

      <div className={styles.guideBox}>
        <p className={styles.guideItem}>min_confidence: 0~1 범위, 높을수록 보류가 증가</p>
        <p className={styles.guideItem}>keyword_weight + similarity_weight = 1 권장</p>
        <p className={styles.guideItem}>max_candidates: 1~5 권장 (기본 3)</p>
        <p className={styles.guideItem}>text_preview_length: 50~500 권장</p>
      </div>

      <div className={styles.section}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <Input
              label="min_confidence"
              type="number"
              step="0.01"
              value={form.min_confidence}
              onChange={(e) => setForm((prev) => prev && { ...prev, min_confidence: e.target.value })}
            />
            <p className={styles.helperText}>0~1 범위 권장, 기본 0.3</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>strategy</label>
            <Dropdown
              value={form.strategy}
              options={[
                { value: 'hybrid', label: 'hybrid' },
                { value: 'similarity_only', label: 'similarity_only' },
                { value: 'keyword_only', label: 'keyword_only' },
              ]}
              onChange={(value) =>
                setForm((prev) => prev && { ...prev, strategy: value as SettingsFormState['strategy'] })
              }
            />
            <p className={styles.helperText}>hybrid: 키워드+유사도 혼합</p>
          </div>
          <div className={styles.formGroup}>
            <Input
              label="keyword_weight"
              type="number"
              step="0.01"
              value={form.keyword_weight}
              onChange={(e) => setForm((prev) => prev && { ...prev, keyword_weight: e.target.value })}
            />
            <p className={styles.helperText}>0~1 범위, 합계 1 권장</p>
          </div>
          <div className={styles.formGroup}>
            <Input
              label="similarity_weight"
              type="number"
              step="0.01"
              value={form.similarity_weight}
              onChange={(e) => setForm((prev) => prev && { ...prev, similarity_weight: e.target.value })}
            />
            <p className={styles.helperText}>0~1 범위, 합계 1 권장</p>
          </div>
          <div className={styles.formGroup}>
            <Input
              label="max_candidates"
              type="number"
              step="1"
              value={form.max_candidates}
              onChange={(e) => setForm((prev) => prev && { ...prev, max_candidates: e.target.value })}
            />
            <p className={styles.helperText}>1~5 권장</p>
          </div>
          <div className={styles.formGroup}>
            <Input
              label="text_preview_length"
              type="number"
              step="1"
              value={form.text_preview_length}
              onChange={(e) => setForm((prev) => prev && { ...prev, text_preview_length: e.target.value })}
            />
            <p className={styles.helperText}>50~500 권장</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.formGroup}>
          <label className={styles.label}>category_rules (옵션)</label>
          <textarea
            className={styles.textarea}
            value={rulesText}
            onChange={(e) => setRulesText(e.target.value)}
            placeholder='예: [{"sub_topic_id": 23, "weight": 1, "priority": 1, "is_active": true}]'
          />
          <p className={styles.helperText}>JSON 배열 형식으로 입력</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>검수 UI 설정</h3>
        <p className={styles.helperText}>이 설정은 브라우저 로컬에 저장됩니다.</p>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <Input
              label="승인 사유 최소 글자수"
              type="number"
              step="1"
              value={reviewForm.approve_reason_min_length}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, approve_reason_min_length: e.target.value }))
              }
            />
            <p className={styles.helperText}>권장: 3자</p>
          </div>
          <div className={styles.formGroup}>
            <Input
              label="보류 사유 최소 글자수"
              type="number"
              step="1"
              value={reviewForm.reject_reason_min_length}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, reject_reason_min_length: e.target.value }))
              }
            />
            <p className={styles.helperText}>권장: 10자</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>하이라이트 색상 프리셋</label>
            <Dropdown
              value={reviewForm.highlight_color_preset}
              options={[
                { value: 'blue', label: 'blue' },
                { value: 'green', label: 'green' },
                { value: 'orange', label: 'orange' },
              ]}
              onChange={(value) =>
                setReviewForm((prev) => ({ ...prev, highlight_color_preset: value as HighlightColorPreset }))
              }
            />
            <p className={styles.helperText}>카드 포커스 색상</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>하이라이트 지속 시간</label>
            <Dropdown
              value={reviewForm.highlight_duration_preset}
              options={[
                { value: 'short', label: 'short (1.2s)' },
                { value: 'medium', label: 'medium (1.8s)' },
                { value: 'long', label: 'long (2.4s)' },
              ]}
              onChange={(value) =>
                setReviewForm((prev) => ({
                  ...prev,
                  highlight_duration_preset: value as HighlightDurationPreset,
                }))
              }
            />
            <p className={styles.helperText}>포커스 유지 시간</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>하이라이트 모드</label>
            <Dropdown
              value={reviewForm.highlight_mode}
              options={[
                { value: 'preset', label: 'preset' },
                { value: 'custom', label: 'custom' },
              ]}
              onChange={(value) =>
                setReviewForm((prev) => ({ ...prev, highlight_mode: value as HighlightMode }))
              }
            />
            <p className={styles.helperText}>preset 또는 custom 선택</p>
          </div>
          {reviewForm.highlight_mode === 'custom' && (
            <>
              <div className={styles.formGroup}>
                <Input
                  label="하이라이트 색상"
                  type="color"
                  value={reviewForm.highlight_custom_color}
                  onChange={(e) =>
                    setReviewForm((prev) => ({ ...prev, highlight_custom_color: e.target.value }))
                  }
                />
                <p className={styles.helperText}>직접 색상 지정</p>
              </div>
              <div className={styles.formGroup}>
                <Input
                  label="하이라이트 지속 시간(ms)"
                  type="number"
                  step="100"
                  value={reviewForm.highlight_custom_duration_ms}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      highlight_custom_duration_ms: e.target.value,
                    }))
                  }
                />
                <p className={styles.helperText}>예: 1800</p>
              </div>
            </>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label}>승인 템플릿 (줄바꿈 구분)</label>
            <textarea
              className={styles.textarea}
              value={reviewForm.approve_templates_text}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, approve_templates_text: e.target.value }))
              }
              placeholder="승인 템플릿을 줄바꿈으로 입력하세요."
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>보류 템플릿 (줄바꿈 구분)</label>
            <textarea
              className={styles.textarea}
              value={reviewForm.reject_templates_text}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, reject_templates_text: e.target.value }))
              }
              placeholder="보류 템플릿을 줄바꿈으로 입력하세요."
            />
          </div>
        </div>
        <div className={styles.actionRow}>
          <Button variant="primary" onClick={handleSaveReviewSettings}>
            검수 UI 설정 저장
          </Button>
        </div>
      </div>

      <div className={styles.actionRow}>
        <Button variant="primary" onClick={handleSave} disabled={updateMutation.isPending}>
          저장
        </Button>
      </div>

      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        confirmText={alertState.confirmText}
        onClose={closeAlert}
      />
    </div>
  )
}
