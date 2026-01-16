import * as styles from './Mypage.css'
import { Button } from '../../components/Button/Button'

export const Mypage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>마이페이지</h1>
      </div>

      <div className={styles.profile}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>U</div>
          <div className={styles.profileInfo}>
            <h2 className={styles.username}>사용자</h2>
            <p className={styles.email}>user@example.com</p>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0</div>
          <div className={styles.statLabel}>총 풀이 문제</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0%</div>
          <div className={styles.statLabel}>평균 정답률</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0</div>
          <div className={styles.statLabel}>완료한 모의고사</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0일</div>
          <div className={styles.statLabel}>연속 학습일</div>
        </div>
      </div>

      <div className={styles.recentResults}>
        <h2 className={styles.sectionTitle}>최근 모의고사 결과</h2>
        <div className={styles.resultsList}>
          <div className={styles.emptyState}>
            <p>아직 완료한 모의고사가 없습니다.</p>
            <Button variant="primary">모의고사 시작하기</Button>
          </div>
        </div>
      </div>

      <div className={styles.settings}>
        <h2 className={styles.sectionTitle}>설정</h2>
        <div className={styles.settingsList}>
          <button className={styles.settingItem}>
            <span>알림 설정</span>
            <span className={styles.arrow}>›</span>
          </button>
          <button className={styles.settingItem}>
            <span>학습 목표 설정</span>
            <span className={styles.arrow}>›</span>
          </button>
          <button className={styles.settingItem}>
            <span>계정 설정</span>
            <span className={styles.arrow}>›</span>
          </button>
        </div>
      </div>
    </div>
  )
}
