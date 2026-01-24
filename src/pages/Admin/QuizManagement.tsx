import { useState, useMemo } from 'react'
import * as styles from './QuizManagement.css'
import { useQuizDashboard, useValidateQuiz } from '../../api/quiz'
import { useUIStore } from '../../store/uiStore'
import { Tab } from '../../components/Tab/Tab'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { SUBJECT_CATEGORIES } from '../../data/subjectCategories'
import type { ApiError, QuizResponse, ValidateQuizResponse } from '../../api/types'

type TabType = 'all' | 'validation-needed' | 'by-category'

export const QuizManagement = () => {
  const { data: dashboard, isLoading, isError, error, refetch } = useQuizDashboard()
  const validateQuizMutation = useValidateQuiz()
  const { setLoading } = useUIStore()
  const [validatingQuizId, setValidatingQuizId] = useState<number | null>(null)
  const [validationResult, setValidationResult] = useState<{
    quizId: number
    result: ValidateQuizResponse
  } | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleValidate = async (quizId: number) => {
    setValidatingQuizId(quizId)
    setValidationResult(null)
    
    setLoading(true)
    validateQuizMutation.mutate(quizId, {
      onSuccess: (result) => {
        setValidationResult({ quizId, result })
        
        // 백엔드에서 검증 상태를 업데이트했으므로 대시보드 데이터 새로고침
        // 백엔드가 quizzes_needing_validation에서 유효 판정 받은 문제를 자동으로 제외함
        refetch()
        setLoading(false)
      },
      onError: () => {
        setValidatingQuizId(null)
        setLoading(false)
      },
    })
  }

  // 모든 문제를 하나의 배열로 합치기 (최근 문제 + 검증 필요 문제)
  // 검증 완료된 문제(validation_status: 'valid')는 목록에서 제외
  const allQuizzes = useMemo<QuizResponse[]>(() => {
    if (!dashboard) return []
    return [
      ...dashboard.recent_quizzes.filter((q) => q.validation_status !== 'valid'),
      ...dashboard.quizzes_needing_validation.filter(
        (q) => !dashboard.recent_quizzes.some((rq) => rq.id === q.id)
      ),
    ]
  }, [dashboard])

  // 카테고리별 검증 필요 개수 계산
  const validationNeededByCategory = useMemo(() => {
    if (!dashboard) return {}
    const counts: Record<number, number> = {}
    dashboard.quizzes_needing_validation.forEach((quiz) => {
      const subjectId = quiz.subject_id || 1
      counts[subjectId] = (counts[subjectId] || 0) + 1
    })
    return counts
  }, [dashboard])

  // 필터링된 문제 목록
  const filteredQuizzes = useMemo(() => {
    if (!dashboard) return []
    let filtered = allQuizzes

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (quiz) =>
          quiz.question.toLowerCase().includes(query) ||
          quiz.options.some((opt) => opt.text.toLowerCase().includes(query)) ||
          quiz.explanation?.toLowerCase().includes(query)
      )
    }

    // 탭별 필터
    if (activeTab === 'validation-needed') {
      filtered = filtered.filter((quiz) =>
        dashboard.quizzes_needing_validation.some((vq) => vq.id === quiz.id)
      )
    } else if (activeTab === 'by-category') {
      if (selectedSubjectId) {
        filtered = filtered.filter((quiz) => quiz.subject_id === selectedSubjectId)
      }
      // selectedSubjectId가 null이면 전체 카테고리이므로 필터링하지 않음
    }

    return filtered
  }, [allQuizzes, activeTab, selectedSubjectId, searchQuery, dashboard])

  // 카테고리 옵션
  const categoryOptions = useMemo(() => {
    return [
      { value: 0, label: '전체 카테고리' },
      ...SUBJECT_CATEGORIES.map((subject) => ({
        value: subject.id,
        label: subject.name,
      })),
    ]
  }, [])

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>문제 목록을 불러오는 중...</p>
      </div>
    )
  }

  if (isError) {
    const apiError = error as ApiError
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles.errorMessage}>
            문제 목록을 불러오는 중 오류가 발생했습니다.
          </p>
          {apiError?.message && <p className={styles.helperText}>{apiError.message}</p>}
        </div>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyText}>문제 데이터가 없습니다.</p>
      </div>
    )
  }

  // 탭 변경 시 카테고리 선택 초기화
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType)
    if (tabId !== 'by-category') {
      setSelectedSubjectId(null)
    }
  }

  if (allQuizzes.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyText}>등록된 문제가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>문제 관리</h2>
      </div>

      {/* 상단 요약 대시보드 */}
      <div className={styles.summaryDashboard}>
        <div
          className={`${styles.summaryCard} ${styles.summaryCardPrimary}`}
          onClick={() => {
            setActiveTab('validation-needed')
            setSearchQuery('')
          }}
        >
          <div className={styles.summaryLabel}>검증 필요</div>
          <div className={styles.summaryValue}>
            {dashboard.quizzes_needing_validation.length}개
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>전체 문제</div>
          <div className={styles.summaryValue}>{allQuizzes.length}개</div>
        </div>
        {SUBJECT_CATEGORIES.map((subject) => (
          <div
            key={subject.id}
            className={`${styles.summaryCard} ${
              validationNeededByCategory[subject.id] > 0
                ? styles.summaryCardWarning
                : ''
            }`}
            onClick={() => {
              setActiveTab('by-category')
              setSelectedSubjectId(subject.id)
              setSearchQuery('')
            }}
          >
            <div className={styles.summaryLabel}>{subject.name}</div>
            <div className={styles.summaryValue}>
              {validationNeededByCategory[subject.id] || 0}개
            </div>
          </div>
        ))}
      </div>

      {/* 검색 및 필터 */}
      <div className={styles.filters}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="문제 검색 (문제, 선택지, 해설)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {activeTab === 'by-category' && (
          <div className={styles.categoryFilter}>
            <Dropdown
              value={selectedSubjectId || 0}
              options={categoryOptions}
              placeholder="카테고리 선택"
              onChange={(value) => {
                const numValue = value ? Number(value) : 0
                setSelectedSubjectId(numValue === 0 ? null : numValue)
              }}
            />
          </div>
        )}
      </div>

      {/* 탭 */}
      <Tab
        tabs={[
          { id: 'all', label: '전체 보기' },
          { id: 'validation-needed', label: '검증 필요' },
          { id: 'by-category', label: '카테고리별' },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      >

      {/* 검증 결과 표시 */}
      {validationResult && (
        <div className={styles.validationResult}>
          <div className={styles.validationHeader}>
            <h3 className={styles.validationTitle}>
              문제 #{validationResult.quizId} 검증 결과
            </h3>
            <button
              className={styles.closeButton}
              onClick={() => setValidationResult(null)}
            >
              ✕
            </button>
          </div>
          <div className={styles.validationContent}>
            <div className={styles.validationStatus}>
              <span
                className={`${styles.statusBadge} ${
                  validationResult.result.is_valid
                    ? styles.statusValid
                    : styles.statusInvalid
                }`}
              >
                {validationResult.result.is_valid ? '유효' : '무효'}
              </span>
              <span className={styles.validationScore}>
                검증 점수: {Math.round(validationResult.result.validation_score * 100)}/100
              </span>
            </div>
            {validationResult.result.category && (
              <div className={styles.validationInfo}>
                <strong>카테고리:</strong> {validationResult.result.category}
              </div>
            )}
            {validationResult.result.feedback && (
              <div className={styles.validationInfo}>
                <strong>피드백:</strong>
                <p>{validationResult.result.feedback}</p>
              </div>
            )}
            {validationResult.result.issues && validationResult.result.issues.length > 0 && (
              <div className={styles.validationInfo}>
                <strong>이슈:</strong>
                <ul className={styles.issuesList}>
                  {validationResult.result.issues.map((issue: string, index: number) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

        {/* 문제 목록 */}
        <div className={styles.quizList}>
          {filteredQuizzes.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                {searchQuery
                  ? '검색 결과가 없습니다.'
                  : activeTab === 'by-category' && !selectedSubjectId
                    ? '카테고리를 선택해주세요.'
                    : '표시할 문제가 없습니다.'}
              </p>
            </div>
          ) : (
            <>
              <div className={styles.quizListHeader}>
                <span className={styles.quizCount}>
                  {filteredQuizzes.length}개의 문제
                </span>
              </div>
              {filteredQuizzes.map((quiz) => {
                const needsValidation = dashboard.quizzes_needing_validation.some(
                  (vq) => vq.id === quiz.id
                )
                const subject = SUBJECT_CATEGORIES.find((s) => s.id === quiz.subject_id)
                return (
                  <div
                    key={quiz.id}
                    className={`${styles.quizCard} ${
                      needsValidation ? styles.quizCardNeedsValidation : ''
                    }`}
                  >
                    <div className={styles.quizHeader}>
                      <div className={styles.quizHeaderLeft}>
                        <span className={styles.quizId}>문제 #{quiz.id}</span>
                        {subject && (
                          <span className={styles.quizCategory}>{subject.name}</span>
                        )}
                        {needsValidation && (
                          <span className={styles.validationBadge}>검증 필요</span>
                        )}
                      </div>
                      <button
                        className={styles.validateButton}
                        onClick={() => handleValidate(quiz.id)}
                        disabled={
                          validatingQuizId === quiz.id || validateQuizMutation.isPending
                        }
                      >
                        {validatingQuizId === quiz.id ? '검증 중...' : '검증하기'}
                      </button>
                    </div>
            <div className={styles.quizContent}>
              <div className={styles.quizQuestion}>{quiz.question}</div>
              <div className={styles.quizOptions}>
                {quiz.options.map((option, index) => (
                  <div key={index} className={styles.quizOption}>
                    <span className={styles.optionNumber}>{index + 1}.</span>
                    <span className={styles.optionText}>{option.text}</span>
                    {index === quiz.correct_answer && (
                      <span className={styles.correctBadge}>정답</span>
                    )}
                  </div>
                ))}
              </div>
              {quiz.explanation && (
                <div className={styles.quizExplanation}>
                  <strong>해설:</strong> {quiz.explanation}
                </div>
              )}
              <div className={styles.quizMeta}>
                <span className={styles.quizDate}>
                  생성일: {new Date(quiz.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </Tab>
    </div>
  )
}
