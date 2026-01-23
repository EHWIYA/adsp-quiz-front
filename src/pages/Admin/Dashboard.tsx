import * as styles from './Dashboard.css'
import { useQuizDashboard } from '../../api/quiz'
import type { ApiError } from '../../api/types'

export const Dashboard = () => {
  const { data: dashboard, isLoading, isError, error } = useQuizDashboard()

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>대시보드 데이터를 불러오는 중...</p>
      </div>
    )
  }

  if (isError) {
    const apiError = error as ApiError
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles.errorMessage}>
            대시보드 데이터를 불러오는 중 오류가 발생했습니다.
          </p>
          {apiError?.message && <p className={styles.helperText}>{apiError.message}</p>}
        </div>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyText}>대시보드 데이터가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 통계 카드 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>전체 문제 수</div>
          <div className={styles.statValue}>{dashboard.total_quizzes.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>검증 완료</div>
          <div className={styles.statValue}>
            {dashboard.validation_status.valid || 0}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>검증 필요</div>
          <div className={styles.statValue}>
            {dashboard.validation_status.pending || 0}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>검증 실패</div>
          <div className={styles.statValue}>
            {dashboard.validation_status.invalid || 0}
          </div>
        </div>
      </div>

      {/* 카테고리별 통계 */}
      {Object.keys(dashboard.quizzes_by_category).length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>카테고리별 문제 수</h2>
          <div className={styles.categoryGrid}>
            {Object.entries(dashboard.quizzes_by_category).map(([category, count]) => (
              <div key={category} className={styles.categoryItem}>
                <span className={styles.categoryName}>{category || '미분류'}</span>
                <span className={styles.categoryCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 검증 필요 문제 목록 */}
      {dashboard.quizzes_needing_validation.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>검증 필요 문제 ({dashboard.quizzes_needing_validation.length}개)</h2>
          <div className={styles.quizList}>
            {dashboard.quizzes_needing_validation.slice(0, 10).map((quiz) => (
              <div key={quiz.id} className={styles.quizItem}>
                <div className={styles.quizQuestion}>
                  <span className={styles.quizId}>#{quiz.id}</span>
                  <span className={styles.quizText}>
                    {quiz.question.length > 100 ? `${quiz.question.substring(0, 100)}...` : quiz.question}
                  </span>
                </div>
              </div>
            ))}
            {dashboard.quizzes_needing_validation.length > 10 && (
              <p className={styles.helperText}>
                외 {dashboard.quizzes_needing_validation.length - 10}개의 문제가 더 있습니다.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 최근 문제 목록 */}
      {dashboard.recent_quizzes.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>최근 생성된 문제 ({dashboard.recent_quizzes.length}개)</h2>
          <div className={styles.quizList}>
            {dashboard.recent_quizzes.slice(0, 10).map((quiz) => (
              <div key={quiz.id} className={styles.quizItem}>
                <div className={styles.quizQuestion}>
                  <span className={styles.quizId}>#{quiz.id}</span>
                  <span className={styles.quizText}>
                    {quiz.question.length > 100 ? `${quiz.question.substring(0, 100)}...` : quiz.question}
                  </span>
                </div>
                <div className={styles.quizMeta}>
                  <span className={styles.quizDate}>
                    {new Date(quiz.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
            ))}
            {dashboard.recent_quizzes.length > 10 && (
              <p className={styles.helperText}>
                외 {dashboard.recent_quizzes.length - 10}개의 문제가 더 있습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
