import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Admin.css.ts'
import {
  useCoreContent,
  useCreateCoreContentAuto,
  useCreateCoreContentByPath,
  useAutoClassificationSettings,
  useApproveAutoClassification,
  useRejectAutoClassification,
} from '../../api/coreContent'
import { SUBJECT_CATEGORIES, getMainTopics, getSubTopics, getSubTopicById } from '../../data/subjectCategories'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import { useUIStore } from '../../store/uiStore'
import { getAutoReviewPreferences, subscribeAutoReviewPreferences } from '../../utils/autoReviewPreferences'
import type { ApiError, AutoClassificationCandidate } from '../../api/types'

const applyTemplate = (current: string, template: string) => {
  const trimmed = current.trim()
  if (!trimmed) return template
  return `${trimmed}\n${template}`
}

export const CoreContentRegistration = () => {
  const navigate = useNavigate()
  const { setLoading } = useUIStore()
  const alertActionRef = useRef<(() => void) | null>(null)

  const DECISION_REASON_LIMIT = 200
  const REQUIRE_DECISION_REASON_ON_REJECT = true
  const REQUIRE_DECISION_REASON_ON_APPROVE = true
  
  // 3단계 분류 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  
  // 핵심 정보 입력 상태
  const [content, setContent] = useState('')
  const [sourceType, setSourceType] = useState<'text' | 'youtube_url'>('text')
  const [registrationMode, setRegistrationMode] = useState<'category' | 'auto'>('category')
  const [autoDecision, setAutoDecision] = useState<{
    runId: string
    categoryPath: string | null
    confidence: number | null
    candidates: AutoClassificationCandidate[]
    updatedAt: string | null
  } | null>(null)
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number | null>(null)
  const [autoDecisionApproveReason, setAutoDecisionApproveReason] = useState('')
  const [autoDecisionRejectReason, setAutoDecisionRejectReason] = useState('')
  const [reviewPreferences, setReviewPreferences] = useState(getAutoReviewPreferences)

  // 하드코딩된 분류 데이터 사용 (2026-01-20 변경)
  const subjects = useMemo(() => SUBJECT_CATEGORIES.map((s) => ({ id: s.id, name: s.name })), [])
  const mainTopicsData = useMemo(
    () => (selectedSubjectId ? getMainTopics(selectedSubjectId) : null),
    [selectedSubjectId]
  )
  const subTopicsData = useMemo(
    () => (selectedSubjectId && selectedMainTopicId ? getSubTopics(selectedSubjectId, selectedMainTopicId) : null),
    [selectedSubjectId, selectedMainTopicId]
  )
  
  const { 
    data: coreContent, 
    isLoading: isLoadingCoreContent, 
    isError: isCoreContentError,
    error: coreContentError 
  } = useCoreContent(selectedSubTopicId)
  
  const createByPathMutation = useCreateCoreContentByPath()
  const createAutoMutation = useCreateCoreContentAuto()
  const { data: autoSettings } = useAutoClassificationSettings(registrationMode === 'auto')
  const approveAutoMutation = useApproveAutoClassification()
  const rejectAutoMutation = useRejectAutoClassification()

  // YouTube URL 감지 함수
  const detectSourceType = (text: string): 'text' | 'youtube_url' => {
    if (!text.trim()) return 'text'
    // YouTube URL 패턴 감지
    const youtubePattern = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    return youtubePattern.test(text.trim()) ? 'youtube_url' : 'text'
  }

  const handleRegistrationModeChange = (mode: 'category' | 'auto') => {
    setRegistrationMode(mode)
    if (mode === 'auto') {
      setSelectedSubjectId(null)
      setSelectedMainTopicId(null)
      setSelectedSubTopicId(null)
    }
    setSourceType(detectSourceType(content))
  }

  const handleSave = () => {
    if (!content.trim()) {
      openAlert('핵심 정보를 입력해주세요.')
      return
    }

    // 최종 source_type 결정 (사용자 선택 또는 자동 감지)
    const finalSourceType = detectSourceType(content)

    if (registrationMode === 'auto') {
      setLoading(true)
      createAutoMutation.mutate(
        {
          core_content: content.trim(),
          source_type: finalSourceType,
        },
        {
          onSuccess: (data) => {
            setLoading(false)
            const candidates = data.candidates || []
            const runId = data.run_id ?? String(data.id)
            const defaultIndex = candidates.findIndex((candidate) => candidate.rank === 1)
            setSelectedCandidateIndex(defaultIndex >= 0 ? defaultIndex : candidates.length > 0 ? 0 : null)
            setAutoDecision({
              runId,
              categoryPath: data.category_path,
              confidence: data.confidence,
              candidates,
              updatedAt: data.updated_at,
            })
          },
          onError: (error) => {
            const apiError = error as ApiError
            if (apiError.status === 400) {
              openAlert(apiError.message || apiError.code || '잘못된 요청입니다.')
            } else if (apiError.status === 500) {
              openAlert('서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.')
            } else {
              openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
            }
            setLoading(false)
          },
        }
      )
      return
    }

    // 필수 필드 검증
    if (!selectedSubjectId || !selectedMainTopicId || !selectedSubTopicId) {
      openAlert('모든 항목을 선택하고 핵심 정보를 입력해주세요.')
      return
    }

    // 3단계 카테고리 검증: 선택된 세부항목이 선택된 과목과 주요항목에 속하는지 확인
    const isValidSubTopic = getSubTopicById(selectedSubjectId, selectedMainTopicId, selectedSubTopicId)
    if (!isValidSubTopic) {
      openAlert('선택한 과목, 주요항목, 세부항목이 일치하지 않습니다. 다시 선택해주세요.')
      return
    }

    // 새로운 경로 기반 API 사용 (2026-01-23 변경: PUT → POST)
    setLoading(true)
    createByPathMutation.mutate(
      {
        mainTopicId: selectedMainTopicId,
        subTopicId: selectedSubTopicId,
        data: {
          core_content: content.trim(),
          source_type: finalSourceType,
        },
      },
      {
        onSuccess: () => {
          setLoading(false)
          openAlert('핵심 정보가 등록되었습니다.', {
            onConfirm: () => navigate('/'),
          })
          // 등록 성공 후 홈으로 이동
        },
        onError: (error) => {
          const apiError = error as ApiError
          
          // ALREADY_EXISTS는 더 이상 에러로 처리하지 않음 (다중 등록 허용)
          // INVALID_CATEGORY 에러 처리
          if (apiError.code === 'INVALID_CATEGORY') {
            setLoading(false)
            openAlert('선택한 과목, 주요항목, 세부항목이 일치하지 않습니다. 다시 선택해주세요.')
            return
          }
          
          // status 기반 에러 처리 (fallback)
          if (apiError.status === 400) {
            openAlert(apiError.message || apiError.code || '잘못된 요청입니다.')
          } else if (apiError.status === 500) {
            openAlert('서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.')
          } else {
            openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
          }
          setLoading(false)
        },
      }
    )
  }

  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '알림',
    message: '',
    confirmText: '확인',
  })

  useEffect(() => {
    return subscribeAutoReviewPreferences(setReviewPreferences)
  }, [])

  const openAlert = (
    message: string,
    options?: { title?: string; confirmText?: string; onConfirm?: () => void }
  ) => {
    const { title = '알림', confirmText = '확인', onConfirm } = options || {}
    alertActionRef.current = onConfirm || null
    setAlertState({
      isOpen: true,
      title,
      message,
      confirmText,
    })
  }

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
    const action = alertActionRef.current
    alertActionRef.current = null
    if (action) {
      action()
    }
  }

  const error = registrationMode === 'auto' ? createAutoMutation.error : createByPathMutation.error
  const isPending = createByPathMutation.isPending || createAutoMutation.isPending
  const isDecisionOpen = !!autoDecision
  const isDecisionBusy = approveAutoMutation.isPending || rejectAutoMutation.isPending
  const canSubmit =
    registrationMode === 'auto'
      ? !!content.trim()
      : !!(content.trim() && selectedSubjectId && selectedMainTopicId && selectedSubTopicId)
  const contentPlaceholder =
    registrationMode === 'auto'
      ? sourceType === 'youtube_url'
        ? 'YouTube URL을 입력하세요...'
        : '텍스트 또는 YouTube URL을 입력하세요...'
      : sourceType === 'youtube_url'
        ? 'YouTube URL을 입력하세요...'
        : '핵심 정보를 입력하세요...'
  const decisionCandidates = autoDecision?.candidates || []
  const selectedCandidate =
    selectedCandidateIndex != null ? decisionCandidates[selectedCandidateIndex] : null
  const approveReasonLength = autoDecisionApproveReason.length
  const rejectReasonLength = autoDecisionRejectReason.length
  const approveReasonTrimmedLength = autoDecisionApproveReason.trim().length
  const rejectReasonTrimmedLength = autoDecisionRejectReason.trim().length
  const approveReasonMinLength = reviewPreferences.approveReasonMinLength
  const rejectReasonMinLength = reviewPreferences.rejectReasonMinLength
  const approveTemplates = reviewPreferences.approveTemplates
  const rejectTemplates = reviewPreferences.rejectTemplates
  const confidencePercent =
    autoDecision?.confidence != null ? Math.round(autoDecision.confidence * 100) : null
  const thresholdPercent =
    autoSettings?.min_confidence != null ? Math.round(autoSettings.min_confidence * 100) : null
  const isBelowThreshold =
    autoDecision?.confidence != null && autoSettings?.min_confidence != null
      ? autoDecision.confidence < autoSettings.min_confidence
      : null

  const handleAutoApprove = () => {
    if (!autoDecision) return
    const candidate =
      selectedCandidateIndex != null ? autoDecision.candidates[selectedCandidateIndex] : null
    if (!candidate) {
      openAlert('승인할 후보가 없습니다. 다른 입력으로 다시 시도해주세요.')
      return
    }
    const reason = autoDecisionApproveReason.trim()
    if (REQUIRE_DECISION_REASON_ON_APPROVE && reason.length < approveReasonMinLength) {
      openAlert(`승인 사유를 ${approveReasonMinLength}자 이상 입력해주세요.`)
      return
    }
    setLoading(true)
    approveAutoMutation.mutate(
      {
        runId: autoDecision.runId,
        data: {
          sub_topic_id: candidate.sub_topic_id,
          ...(reason ? { reason } : {}),
        },
      },
      {
        onSuccess: () => {
          setLoading(false)
          setAutoDecision(null)
          setSelectedCandidateIndex(null)
          setAutoDecisionApproveReason('')
          setAutoDecisionRejectReason('')
          openAlert('검수 승인으로 저장되었습니다.', {
            onConfirm: () => navigate('/'),
          })
        },
        onError: (error) => {
          const apiError = error as ApiError
          openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
          setLoading(false)
        },
      }
    )
  }

  const handleAutoReject = () => {
    if (!autoDecision) return
    const reason = autoDecisionRejectReason.trim()
    if (REQUIRE_DECISION_REASON_ON_REJECT && reason.length < rejectReasonMinLength) {
      openAlert(`보류 사유를 ${rejectReasonMinLength}자 이상 입력해주세요.`)
      return
    }
    setLoading(true)
    rejectAutoMutation.mutate(
      {
        runId: autoDecision.runId,
        data: {
          ...(reason ? { reason } : {}),
        },
      },
      {
        onSuccess: () => {
          setLoading(false)
          setAutoDecision(null)
          setSelectedCandidateIndex(null)
          setAutoDecisionApproveReason('')
          setAutoDecisionRejectReason('')
          openAlert('보류 처리되었습니다.', {
            onConfirm: () => navigate('/'),
          })
        },
        onError: (error) => {
          const apiError = error as ApiError
          openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
          setLoading(false)
        },
      }
    )
  }

  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>등록 방식</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="registrationMode"
              value="category"
              checked={registrationMode === 'category'}
              onChange={() => handleRegistrationModeChange('category')}
              className={styles.radio}
            />
            <span>카테고리 지정</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="registrationMode"
              value="auto"
              checked={registrationMode === 'auto'}
              onChange={() => handleRegistrationModeChange('auto')}
              className={styles.radio}
            />
            <span>자동 분류</span>
          </label>
        </div>
        <p className={styles.helperText}>
          카테고리를 알고 있으면 "카테고리 지정", 모를 경우 "자동 분류"로 등록하세요.
        </p>
      </div>

      {registrationMode === 'auto' && (
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>자동 분류 안내</p>
          <p className={styles.infoText}>
            텍스트/YouTube URL만 입력하면 AI가 카테고리를 분류하고 문제 생성에 활용합니다.
          </p>
          <p className={styles.infoText}>등록 후 분류 결과를 확인할 수 있습니다.</p>
        </div>
      )}

      {/* 과목 선택 */}
      {registrationMode === 'category' && (
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subjectId">
            과목 선택
          </label>
          <Dropdown
            id="subjectId"
            value={selectedSubjectId}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
            placeholder="과목을 선택하세요"
            onChange={(value) => {
              const nextSubjectId = value ? Number(value) : null
              setSelectedSubjectId(nextSubjectId)
              setSelectedMainTopicId(null)
              setSelectedSubTopicId(null)
              setContent('')
              setSourceType('text')
            }}
          />
        </div>
      )}

      {/* 주요항목 선택 */}
      {registrationMode === 'category' && selectedSubjectId && (
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="mainTopicId">
            주요항목 선택
          </label>
          <Dropdown
            id="mainTopicId"
            value={selectedMainTopicId}
            options={
              mainTopicsData?.main_topics.map((mainTopic) => ({
                value: mainTopic.id,
                label: mainTopic.name,
              })) || []
            }
            placeholder="주요항목을 선택하세요"
            disabled={!mainTopicsData}
            onChange={(value) => {
              const nextMainTopicId = value ? Number(value) : null
              setSelectedMainTopicId(nextMainTopicId)
              setSelectedSubTopicId(null)
              setContent('')
              setSourceType('text')
            }}
          />
        </div>
      )}

      {/* 세부항목 선택 */}
      {registrationMode === 'category' && selectedMainTopicId && (
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subTopicId">
            세부항목 선택
          </label>
          <Dropdown
            id="subTopicId"
            value={selectedSubTopicId}
            options={
              subTopicsData?.sub_topics.map((subTopic) => ({
                value: subTopic.id,
                label: subTopic.name,
              })) || []
            }
            placeholder="세부항목을 선택하세요"
            disabled={!subTopicsData}
            onChange={(value) => {
              const nextSubTopicId = value ? Number(value) : null
              setSelectedSubTopicId(nextSubTopicId)
              setContent('')
              setSourceType('text')
            }}
          />
        </div>
      )}

      {/* 핵심 정보 입력 */}
      {(registrationMode === 'auto' || selectedSubTopicId) && (
        <div className={styles.contentSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>정보 유형</label>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sourceType"
                  value="text"
                  checked={sourceType === 'text'}
                  onChange={() => setSourceType('text')}
                  disabled={isLoadingCoreContent}
                  className={styles.radio}
                />
                <span>텍스트</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sourceType"
                  value="youtube_url"
                  checked={sourceType === 'youtube_url'}
                  onChange={() => setSourceType('youtube_url')}
                  disabled={isLoadingCoreContent}
                  className={styles.radio}
                />
                <span>YouTube URL</span>
              </label>
            </div>
            {sourceType === 'youtube_url' && (
              <p className={styles.helperText} style={{ marginBottom: '8px', fontSize: '0.9em', color: '#666' }}>
                YouTube URL을 입력하세요. (예: https://www.youtube.com/watch?v=...)
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>핵심 정보</label>
            {registrationMode === 'category' && coreContent && coreContent.core_contents.length > 0 && (
              <p className={styles.helperText} style={{ marginBottom: '8px', fontSize: '0.9em', color: '#2196F3' }}>
                ℹ️ 이 세부항목에 이미 등록된 핵심 정보가 {coreContent.core_contents.length}개 있습니다. 추가로 핵심 정보를 등록할 수 있으며, 백엔드에서 모든 핵심 정보를 종합하여 문제 생성 다양화 및 강화에 활용됩니다.
              </p>
            )}
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => {
                const nextContent = e.target.value
                setContent(nextContent)
                if (!nextContent.trim()) {
                  setSourceType('text')
                  return
                }
                setSourceType(detectSourceType(nextContent))
              }}
              placeholder={contentPlaceholder}
              disabled={isLoadingCoreContent}
            />
            {registrationMode === 'category' && isLoadingCoreContent && (
              <p className={styles.helperText}>핵심 정보를 불러오는 중...</p>
            )}
            {content.trim() && sourceType === 'text' && detectSourceType(content) === 'youtube_url' && (
              <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em', color: '#ff9800' }}>
                ⚠️ YouTube URL이 감지되었습니다. 정보 유형을 "YouTube URL"로 변경하시겠습니까?
              </p>
            )}
          </div>

          {/* 조회 API 에러 (500 에러 등) */}
          {registrationMode === 'category' && isCoreContentError && coreContentError && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(coreContentError as ApiError)?.status === 500
                  ? '핵심 정보를 불러오는 중 서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.'
                  : (coreContentError as ApiError)?.status === 404
                  ? '핵심 정보를 찾을 수 없습니다.'
                  : '핵심 정보를 불러오는 중 오류가 발생했습니다.'}
              </p>
              {(coreContentError as ApiError)?.code && (
                <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                  에러 코드: {(coreContentError as ApiError).code}
                </p>
              )}
              <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                {(coreContentError as ApiError)?.message || 'Database error occurred'}
              </p>
              {(coreContentError as ApiError)?.status === 500 && (
                <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '0.85em' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>💡 확인 사항:</p>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    <li>백엔드 서버가 정상적으로 배포되었는지 확인</li>
                    <li>데이터베이스 마이그레이션이 실행되었는지 확인</li>
                    <li>초기 데이터(주요항목 8개, 세부항목 28개)가 DB에 존재하는지 확인</li>
                    <li>백엔드 로그에서 상세 에러 메시지 확인</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 등록/수정/삭제 API 에러 */}
          {error && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(error as ApiError)?.code === 'INVALID_CATEGORY'
                  ? '선택한 과목, 주요항목, 세부항목이 일치하지 않습니다.'
                  : (error as ApiError)?.status === 500
                  ? '서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.'
                  : (error as ApiError)?.message || '오류가 발생했습니다.'}
              </p>
              {(error as ApiError)?.code && (
                <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                  에러 코드: {(error as ApiError).code}
                </p>
              )}
              {(error as ApiError)?.details != null && (
                <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                  상세: {JSON.stringify((error as ApiError).details)}
                </p>
              )}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={handleSave}
              disabled={isPending || !canSubmit}
            >
              {isPending ? '처리 중...' : '등록'}
            </button>
          </div>
        </div>
      )}
      <Modal
        isOpen={isDecisionOpen}
        onClose={() => {
          setAutoDecision(null)
          setSelectedCandidateIndex(null)
          setAutoDecisionApproveReason('')
          setAutoDecisionRejectReason('')
        }}
        title="자동 분류 확인"
        footer={
          <div className={styles.buttonGroup}>
            <Button
              variant="outline"
              onClick={handleAutoReject}
              disabled={
                isDecisionBusy ||
                (REQUIRE_DECISION_REASON_ON_REJECT && rejectReasonTrimmedLength < rejectReasonMinLength)
              }
            >
              보류
            </Button>
            <Button
              variant="primary"
              onClick={handleAutoApprove}
              disabled={
                isDecisionBusy ||
                !selectedCandidate ||
                (REQUIRE_DECISION_REASON_ON_APPROVE &&
                  approveReasonTrimmedLength < approveReasonMinLength)
              }
            >
              저장
            </Button>
          </div>
        }
      >
        <div className={styles.autoDecisionContent}>
          <p className={styles.helperText}>분류 결과를 확인한 뒤 저장 여부를 선택하세요.</p>
          {autoDecision && (
            <div className={styles.autoDecisionSummary}>
              <p className={styles.autoDecisionLine}>
                추천 카테고리: {autoDecision.categoryPath || '없음'}
              </p>
              <p className={styles.autoDecisionLine}>
                신뢰도: {confidencePercent != null ? `${confidencePercent}%` : '정보 없음'}
                {thresholdPercent != null ? `, 임계값 ${thresholdPercent}%` : ''}
              </p>
              {isBelowThreshold === true && (
                <p className={styles.autoDecisionWarning}>임계값 미달 후보입니다.</p>
              )}
              {isBelowThreshold === false && autoDecision.updatedAt == null && (
                <p className={styles.autoDecisionWarning}>보류 상태로 저장 전 확인이 필요합니다.</p>
              )}
            </div>
          )}
          {decisionCandidates.length > 0 ? (
            <div className={styles.candidateList}>
              {decisionCandidates.map((candidate, index) => (
                <label key={`${candidate.sub_topic_id}-${candidate.rank}`} className={styles.candidateItem}>
                  <input
                    type="radio"
                    name="autoCandidate"
                    checked={selectedCandidateIndex === index}
                    onChange={() => setSelectedCandidateIndex(index)}
                  />
                  <div className={styles.candidateContent}>
                    <span className={styles.candidatePath}>{candidate.category_path}</span>
                    <span className={styles.candidateMeta}>
                      점수 {Math.round(candidate.score * 100)}% · 순위 {candidate.rank}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <p className={styles.helperText}>후보 카테고리가 없습니다.</p>
          )}
          <div className={styles.autoDecisionReasonBox}>
            <span className={styles.helperText}>
              승인 사유 (필수) · {approveReasonLength}/{DECISION_REASON_LIMIT}
            </span>
            {approveReasonTrimmedLength > 0 &&
              approveReasonTrimmedLength < approveReasonMinLength && (
                <span className={styles.errorText}>
                  승인 사유는 {approveReasonMinLength}자 이상 입력해주세요.
                </span>
              )}
            <textarea
              className={styles.autoDecisionTextarea}
              value={autoDecisionApproveReason}
              onChange={(event) => setAutoDecisionApproveReason(event.target.value)}
              placeholder="승인 사유를 입력하세요."
              maxLength={DECISION_REASON_LIMIT}
            />
            <div className={styles.templateList}>
              {approveTemplates.map((template) => (
                <button
                  key={`approve-${template}`}
                  type="button"
                  className={styles.templateButton}
                  onClick={() =>
                    setAutoDecisionApproveReason((prev) => applyTemplate(prev, template))
                  }
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.autoDecisionReasonBox}>
            <span className={styles.helperText}>
              보류 사유 (필수) · {rejectReasonLength}/{DECISION_REASON_LIMIT}
            </span>
            {rejectReasonTrimmedLength > 0 &&
              rejectReasonTrimmedLength < rejectReasonMinLength && (
                <span className={styles.errorText}>
                  보류 사유는 {rejectReasonMinLength}자 이상 입력해주세요.
                </span>
              )}
            <textarea
              className={styles.autoDecisionTextarea}
              value={autoDecisionRejectReason}
              onChange={(event) => setAutoDecisionRejectReason(event.target.value)}
              placeholder="보류 사유를 입력하세요."
              maxLength={DECISION_REASON_LIMIT}
            />
            <div className={styles.templateList}>
              {rejectTemplates.map((template) => (
                <button
                  key={`reject-${template}`}
                  type="button"
                  className={styles.templateButton}
                  onClick={() =>
                    setAutoDecisionRejectReason((prev) => applyTemplate(prev, template))
                  }
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
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
