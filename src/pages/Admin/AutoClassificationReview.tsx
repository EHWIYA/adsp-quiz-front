import { useMemo, useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import * as styles from './AutoClassificationReview.css'
import {
  useAutoClassificationPending,
  useAutoClassificationSettings,
  useApproveAutoClassification,
  useRejectAutoClassification,
} from '../../api/coreContent'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/Button/Button'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { SUBJECT_CATEGORIES } from '../../data/subjectCategories'
import {
  getAutoReviewPreferences,
  saveAutoReviewPreferences,
  subscribeAutoReviewPreferences,
} from '../../utils/autoReviewPreferences'
import type { ApiError, AutoClassificationCandidate, AutoClassificationPendingItem } from '../../api/types'

const getDefaultCandidateIndex = (candidates: AutoClassificationCandidate[]) => {
  const rankedIndex = candidates.findIndex((candidate) => candidate.rank === 1)
  if (rankedIndex >= 0) return rankedIndex
  return candidates.length > 0 ? 0 : null
}

const REASON_LIMIT = 200
const REQUIRE_REASON_ON_REJECT = true
const REQUIRE_REASON_ON_APPROVE = true

const buildTemplateList = (templates: string[], favorites: string[]) => {
  const favoriteSet = new Set(favorites)
  const uniqueTemplates = Array.from(new Set(templates))
  const favoriteTemplates = uniqueTemplates.filter((item) => favoriteSet.has(item))
  const restTemplates = uniqueTemplates.filter((item) => !favoriteSet.has(item))
  return [...favoriteTemplates, ...restTemplates]
}

const toggleFavorite = (favorites: string[], template: string) => {
  if (favorites.includes(template)) {
    return favorites.filter((item) => item !== template)
  }
  return [...favorites, template]
}

const toRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace('#', '')
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((c) => c + c)
          .join('')
      : sanitized
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const applyTemplate = (current: string, template: string) => {
  const trimmed = current.trim()
  if (!trimmed) return template
  return `${trimmed}\n${template}`
}

const findCategoryTreeBySubTopicId = (subTopicId: number) => {
  for (const subject of SUBJECT_CATEGORIES) {
    for (const mainTopic of subject.mainTopics) {
      const subTopic = mainTopic.subTopics.find((item) => item.id === subTopicId)
      if (subTopic) {
        return {
          subjectName: subject.name,
          mainTopicName: mainTopic.name,
          subTopicName: subTopic.name,
        }
      }
    }
  }
  return null
}

const getCategoryPathChips = (categoryPath?: string | null, fallback?: { subjectName: string; mainTopicName: string; subTopicName: string } | null) => {
  if (categoryPath) {
    const parts = categoryPath
      .split('>')
      .map((part) => part.trim())
      .filter(Boolean)
    if (parts[0] === 'ADsP') {
      return parts.slice(1)
    }
    return parts
  }
  if (fallback) {
    return [fallback.subjectName, fallback.mainTopicName, fallback.subTopicName]
  }
  return []
}

export const AutoClassificationReview = () => {
  const { data, isLoading, isError, error, refetch } = useAutoClassificationPending()
  const { data: settings } = useAutoClassificationSettings()
  const approveMutation = useApproveAutoClassification()
  const rejectMutation = useRejectAutoClassification()
  const { setLoading } = useUIStore()
  const [selectedCandidates, setSelectedCandidates] = useState<Record<string, number>>({})
  const [approveReasons, setApproveReasons] = useState<Record<string, string>>({})
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({})
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [focusRunId, setFocusRunId] = useState<string | null>(null)
  const [highlightRunId, setHighlightRunId] = useState<string | null>(null)
  const [reviewPreferences, setReviewPreferences] = useState(getAutoReviewPreferences)
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '알림',
    message: '',
    confirmText: '확인',
  })

  const pendingItems = data?.pending ?? []
  const previewLength = settings?.text_preview_length ?? 200

  const openAlert = (message: string) => {
    setAlertState({ isOpen: true, title: '알림', message, confirmText: '확인' })
  }

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
  }

  const getSelectedIndex = (item: AutoClassificationPendingItem) => {
    const stored = selectedCandidates[item.run_id]
    if (stored != null && item.candidates[stored]) {
      return stored
    }
    return getDefaultCandidateIndex(item.candidates)
  }

  const getNextRunId = (runId: string) => {
    const index = pendingItems.findIndex((item) => item.run_id === runId)
    if (index === -1) return null
    return pendingItems[index + 1]?.run_id ?? pendingItems[index - 1]?.run_id ?? null
  }

  const handleApprove = (item: AutoClassificationPendingItem) => {
    const selectedIndex = getSelectedIndex(item)
    const candidate = selectedIndex != null ? item.candidates[selectedIndex] : null
    if (!candidate) {
      openAlert('승인할 후보가 없습니다. 다른 입력으로 다시 시도해주세요.')
      return
    }

    setLoading(true)
    const reason = approveReasons[item.run_id]?.trim() || ''
    if (REQUIRE_REASON_ON_APPROVE && reason.length < reviewPreferences.approveReasonMinLength) {
      setLoading(false)
      openAlert(`승인 사유를 ${reviewPreferences.approveReasonMinLength}자 이상 입력해주세요.`)
      return
    }
    setFocusRunId(getNextRunId(item.run_id))
    approveMutation.mutate(
      {
        runId: item.run_id,
        data: {
          sub_topic_id: candidate.sub_topic_id,
          ...(reason ? { reason } : {}),
        },
      },
      {
        onSuccess: () => {
          setLoading(false)
          setApproveReasons((prev) => ({ ...prev, [item.run_id]: '' }))
          refetch()
          openAlert('검수 승인으로 저장되었습니다.')
        },
        onError: (error) => {
          const apiError = error as ApiError
          setLoading(false)
          setFocusRunId(null)
          openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
        },
      }
    )
  }

  const handleReject = (item: AutoClassificationPendingItem) => {
    setLoading(true)
    const reason = rejectReasons[item.run_id]?.trim() || ''
    if (REQUIRE_REASON_ON_REJECT && reason.length < reviewPreferences.rejectReasonMinLength) {
      setLoading(false)
      openAlert(`보류 사유를 ${reviewPreferences.rejectReasonMinLength}자 이상 입력해주세요.`)
      return
    }
    setFocusRunId(getNextRunId(item.run_id))
    rejectMutation.mutate(
      {
        runId: item.run_id,
        data: {
          ...(reason ? { reason } : {}),
        },
      },
      {
        onSuccess: () => {
          setLoading(false)
          setRejectReasons((prev) => ({ ...prev, [item.run_id]: '' }))
          refetch()
          openAlert('보류 처리되었습니다.')
        },
        onError: (error) => {
          const apiError = error as ApiError
          setLoading(false)
          setFocusRunId(null)
          openAlert(apiError.message || apiError.code || '오류가 발생했습니다.')
        },
      }
    )
  }

  const formatConfidence = (confidence: number | null) => {
    if (confidence == null) return '정보 없음'
    return `${Math.round(confidence * 100)}%`
  }

  const thresholdPercent = useMemo(() => {
    return settings?.min_confidence != null ? Math.round(settings.min_confidence * 100) : null
  }, [settings])

  useEffect(() => {
    if (!focusRunId) return
    const node = itemRefs.current.get(focusRunId)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setHighlightRunId(focusRunId)
      setFocusRunId(null)
    }
  }, [focusRunId, pendingItems])

  useEffect(() => {
    if (!highlightRunId) return
    const duration =
      reviewPreferences.highlightMode === 'custom'
        ? reviewPreferences.highlightCustomDurationMs
        : reviewPreferences.highlightDurationPreset === 'short'
          ? 1200
          : reviewPreferences.highlightDurationPreset === 'long'
            ? 2400
            : 1800
    const timer = setTimeout(() => setHighlightRunId(null), duration)
    return () => clearTimeout(timer)
  }, [highlightRunId, reviewPreferences.highlightDurationPreset, reviewPreferences.highlightMode, reviewPreferences.highlightCustomDurationMs])

  useEffect(() => {
    return subscribeAutoReviewPreferences(setReviewPreferences)
  }, [])

  if (isLoading) {
    return <p className={styles.emptyText}>검수 대기 목록을 불러오는 중...</p>
  }

  if (isError) {
    const apiError = error as ApiError
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>검수 대기 목록을 불러오는 중 오류가 발생했습니다.</p>
        {apiError?.message && <p className={styles.metaText}>{apiError.message}</p>}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>자동 분류 검수</h2>
        <div className={styles.summaryCard}>검수 대기 {pendingItems.length}건</div>
      </div>

      {pendingItems.length === 0 ? (
        <p className={styles.emptyText}>검수 대기 항목이 없습니다.</p>
      ) : (
        <div className={styles.list}>
          {pendingItems.map((item) => {
            const selectedIndex = getSelectedIndex(item)
            const preview =
              item.core_content.length > previewLength
                ? `${item.core_content.slice(0, previewLength)}...`
                : item.core_content
            const confidenceText = formatConfidence(item.confidence)
            const showWarning =
              item.confidence != null && settings?.min_confidence != null
                ? item.confidence < settings.min_confidence
                : false
            const selectedCandidate = selectedIndex != null ? item.candidates[selectedIndex] : null
            const treeInfo = selectedCandidate
              ? findCategoryTreeBySubTopicId(selectedCandidate.sub_topic_id)
              : null
            const categoryChips = getCategoryPathChips(selectedCandidate?.category_path, treeInfo)
            const approveReasonValue = approveReasons[item.run_id] || ''
            const rejectReasonValue = rejectReasons[item.run_id] || ''
            const approveReasonLength = approveReasonValue.trim().length
            const rejectReasonLength = rejectReasonValue.trim().length
            const isRejectBlocked =
              REQUIRE_REASON_ON_REJECT && rejectReasonLength < reviewPreferences.rejectReasonMinLength
            const isApproveBlocked =
              REQUIRE_REASON_ON_APPROVE && approveReasonLength < reviewPreferences.approveReasonMinLength

            const highlightColorClass =
              reviewPreferences.highlightColorPreset === 'green'
                ? styles.cardHighlightGreen
                : reviewPreferences.highlightColorPreset === 'orange'
                  ? styles.cardHighlightOrange
                  : styles.cardHighlightBlue
            const highlightDurationClass =
              reviewPreferences.highlightDurationPreset === 'short'
                ? styles.highlightDurationShort
                : reviewPreferences.highlightDurationPreset === 'long'
                  ? styles.highlightDurationLong
                  : styles.highlightDurationMedium
            const highlightStyle: CSSProperties | undefined =
              reviewPreferences.highlightMode === 'custom'
                ? ({
                    '--highlight-color': reviewPreferences.highlightCustomColor,
                    '--highlight-shadow-strong': toRgba(reviewPreferences.highlightCustomColor, 0.4),
                    '--highlight-shadow-soft': toRgba(reviewPreferences.highlightCustomColor, 0.18),
                    '--highlight-duration': `${reviewPreferences.highlightCustomDurationMs}ms`,
                  } as CSSProperties)
                : undefined

            return (
              <div
                key={item.run_id}
                className={`${styles.card} ${
                  highlightRunId === item.run_id
                    ? reviewPreferences.highlightMode === 'custom'
                      ? styles.cardHighlightCustom
                      : `${highlightColorClass} ${highlightDurationClass}`
                    : ''
                }`}
                style={highlightRunId === item.run_id ? highlightStyle : undefined}
                ref={(node) => {
                  if (node) {
                    itemRefs.current.set(item.run_id, node)
                  } else {
                    itemRefs.current.delete(item.run_id)
                  }
                }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.badge}>
                    {item.source_type === 'youtube_url' ? 'YouTube URL' : '텍스트'}
                  </span>
                  <span className={styles.metaText}>신뢰도 {confidenceText}</span>
                </div>
                <p className={styles.contentPreview}>{preview}</p>
                <p className={styles.metaText}>
                  임계값 {thresholdPercent != null ? `${thresholdPercent}%` : '정보 없음'}
                </p>
                {showWarning && <p className={styles.warningText}>임계값 미달 후보입니다.</p>}

                {item.candidates.length > 0 ? (
                  <div className={styles.candidateList}>
                    {item.candidates.map((candidate, index) => (
                      <label key={`${item.run_id}-${candidate.rank}`} className={styles.candidateItem}>
                        <input
                          type="radio"
                          name={`candidate-${item.run_id}`}
                          checked={selectedIndex === index}
                          onChange={() =>
                            setSelectedCandidates((prev) => ({ ...prev, [item.run_id]: index }))
                          }
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
                  <p className={styles.emptyText}>후보 카테고리가 없습니다.</p>
                )}

                <div className={styles.treePreview}>
                  {categoryChips.length > 0 && (
                    <div className={styles.pathChips}>
                      {categoryChips.map((chip, index) => (
                        <span
                          key={`${item.run_id}-chip-${index}`}
                          className={
                            index === 0
                              ? styles.pathChipSubject
                              : index === 1
                                ? styles.pathChipMain
                                : styles.pathChipSub
                          }
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                  {treeInfo ? (
                    <>
                      <span className={styles.treeLine}>과목: {treeInfo.subjectName}</span>
                      <span className={styles.treeLine}>주요항목: {treeInfo.mainTopicName}</span>
                      <span className={styles.treeLine}>세부항목: {treeInfo.subTopicName}</span>
                    </>
                  ) : (
                    <span className={styles.metaText}>카테고리 트리 정보를 찾을 수 없습니다.</span>
                  )}
                </div>

                <div className={styles.reasonBox}>
                  <span className={styles.metaText}>
                    승인 사유 (필수)
                    <span className={styles.metaText}>
                      {' '}
                      · {approveReasonValue.length}/{REASON_LIMIT}
                    </span>
                  </span>
                  {approveReasonValue.trim().length > 0 &&
                    approveReasonLength < reviewPreferences.approveReasonMinLength && (
                      <span className={styles.warningText}>
                        승인 사유는 {reviewPreferences.approveReasonMinLength}자 이상 입력해주세요.
                      </span>
                    )}
                  <textarea
                    className={styles.textarea}
                    value={approveReasonValue}
                    onChange={(event) =>
                      setApproveReasons((prev) => ({ ...prev, [item.run_id]: event.target.value }))
                    }
                    placeholder="승인 사유를 입력하세요."
                    maxLength={REASON_LIMIT}
                  />
                  <div className={styles.templateList}>
                    {buildTemplateList(
                      reviewPreferences.approveTemplates,
                      reviewPreferences.approveTemplateFavorites
                    ).map((template) => {
                      const isFavorite = reviewPreferences.approveTemplateFavorites.includes(template)
                      return (
                        <div key={`${item.run_id}-approve-${template}`} className={styles.templateItem}>
                          <button
                            type="button"
                            className={styles.templateButton}
                            onClick={() =>
                              setApproveReasons((prev) => ({
                                ...prev,
                                [item.run_id]: applyTemplate(approveReasonValue, template),
                              }))
                            }
                          >
                            {template}
                          </button>
                          <button
                            type="button"
                            className={`${styles.favoriteButton} ${
                              isFavorite ? styles.favoriteButtonActive : ''
                            }`}
                            aria-label="즐겨찾기"
                            onClick={() =>
                              saveAutoReviewPreferences({
                                ...reviewPreferences,
                                approveTemplateFavorites: toggleFavorite(
                                  reviewPreferences.approveTemplateFavorites,
                                  template
                                ),
                              })
                            }
                          >
                            ★
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className={styles.reasonBox}>
                  <span className={styles.metaText}>
                    보류 사유 (필수)
                    <span className={styles.metaText}>
                      {' '}
                      · {rejectReasonValue.length}/{REASON_LIMIT}
                    </span>
                  </span>
                  {rejectReasonValue.trim().length > 0 &&
                    rejectReasonLength < reviewPreferences.rejectReasonMinLength && (
                      <span className={styles.warningText}>
                        보류 사유는 {reviewPreferences.rejectReasonMinLength}자 이상 입력해주세요.
                      </span>
                    )}
                  <textarea
                    className={styles.textarea}
                    value={rejectReasonValue}
                    onChange={(event) =>
                      setRejectReasons((prev) => ({ ...prev, [item.run_id]: event.target.value }))
                    }
                    placeholder="보류 사유를 입력하세요."
                    maxLength={REASON_LIMIT}
                  />
                  <div className={styles.templateList}>
                    {buildTemplateList(
                      reviewPreferences.rejectTemplates,
                      reviewPreferences.rejectTemplateFavorites
                    ).map((template) => {
                      const isFavorite = reviewPreferences.rejectTemplateFavorites.includes(template)
                      return (
                        <div key={`${item.run_id}-reject-${template}`} className={styles.templateItem}>
                          <button
                            type="button"
                            className={styles.templateButton}
                            onClick={() =>
                              setRejectReasons((prev) => ({
                                ...prev,
                                [item.run_id]: applyTemplate(rejectReasonValue, template),
                              }))
                            }
                          >
                            {template}
                          </button>
                          <button
                            type="button"
                            className={`${styles.favoriteButton} ${
                              isFavorite ? styles.favoriteButtonActive : ''
                            }`}
                            aria-label="즐겨찾기"
                            onClick={() =>
                              saveAutoReviewPreferences({
                                ...reviewPreferences,
                                rejectTemplateFavorites: toggleFavorite(
                                  reviewPreferences.rejectTemplateFavorites,
                                  template
                                ),
                              })
                            }
                          >
                            ★
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className={styles.actionRow}>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(item)}
                    disabled={rejectMutation.isPending || isRejectBlocked}
                  >
                    보류
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleApprove(item)}
                    disabled={approveMutation.isPending || selectedIndex == null || isApproveBlocked}
                  >
                    저장
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

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
