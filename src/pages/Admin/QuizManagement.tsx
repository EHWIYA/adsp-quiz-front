import { useState } from 'react'
import * as styles from './QuizManagement.css'
import { useQuizDashboard, useValidateQuiz } from '../../api/quiz'
import type { ApiError } from '../../api/types'
import type { QuizResponse } from '../../api/types'

export const QuizManagement = () => {
  const { data: dashboard, isLoading, isError, error, refetch } = useQuizDashboard()
  const validateQuizMutation = useValidateQuiz()
  const [validatingQuizId, setValidatingQuizId] = useState<number | null>(null)
  const [validationResult, setValidationResult] = useState<{
    quizId: number
    result: any
  } | null>(null)

  const handleValidate = async (quizId: number) => {
    setValidatingQuizId(quizId)
    setValidationResult(null)
    
    validateQuizMutation.mutate(quizId, {
      onSuccess: (result) => {
        setValidationResult({ quizId, result })
        
        // 백엔드에서 검증 상태를 업데이트했으므로 대시보드 데이터 새로고침
        // 백엔드가 quizzes_needing_validation에서 유효 판정 받은 문제를 자동으로 제외함
        refetch()
      },
      onError: () => {
        setValidatingQuizId(null)
      },
    })
  }

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

  // 모든 문제를 하나의 배열로 합치기 (최근 문제 + 검증 필요 문제)
  // 검증 완료된 문제(validation_status: 'valid')는 목록에서 제외
  const allQuizzes: QuizResponse[] = [
    ...dashboard.recent_quizzes.filter((q) => q.validation_status !== 'valid'),
    ...dashboard.quizzes_needing_validation.filter(
      (q) => !dashboard.recent_quizzes.some((rq) => rq.id === q.id)
    ),
  ]

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
        <h2 className={styles.title}>문제 목록 ({allQuizzes.length}개)</h2>
      </div>

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
                검증 점수: {validationResult.result.validation_score < 1 
                  ? (validationResult.result.validation_score * 100).toFixed(0)
                  : validationResult.result.validation_score}/100
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
        {allQuizzes.map((quiz) => (
          <div key={quiz.id} className={styles.quizCard}>
            <div className={styles.quizHeader}>
              <span className={styles.quizId}>문제 #{quiz.id}</span>
              <button
                className={styles.validateButton}
                onClick={() => handleValidate(quiz.id)}
                disabled={validatingQuizId === quiz.id || validateQuizMutation.isPending}
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
        ))}
      </div>
    </div>
  )
}
