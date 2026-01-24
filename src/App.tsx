import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  IoHomeOutline, 
  IoBookOutline, 
  IoDocumentTextOutline, 
  IoBookmarkOutline, 
  IoSettingsOutline, 
  IoPersonOutline, 
  IoMoonOutline, 
  IoSunnyOutline 
} from 'react-icons/io5'
import { Home } from './pages/Home/Home'
import { Training } from './pages/Training/Training'
import { Exam } from './pages/Exam/Exam'
import { ExamResult } from './pages/ExamResult/ExamResult'
import { Mypage } from './pages/Mypage/Mypage'
import { WrongAnswers } from './pages/WrongAnswers/WrongAnswers'
import { Admin } from './pages/Admin/Admin'
import { useThemeStore } from './store/themeStore'
import { useUIStore } from './store/uiStore'
import { Loading } from './components/Loading/Loading'
import * as styles from './App.css'

const Navigation = () => {
  const location = useLocation()
  const { resolvedTheme, toggleTheme } = useThemeStore()

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>
            ADsP AI Pass
          </Link>
          <div className={styles.navRight}>
            <Link
              to="/mypage"
              className={`${styles.mypageButton} ${isActive('/mypage') ? styles.mypageButtonActive : ''}`}
              aria-label="마이페이지"
            >
              <IoPersonOutline className={styles.mypageIcon} />
            </Link>
            <button
              className={styles.themeToggleButton}
              onClick={toggleTheme}
              aria-label="테마 전환"
            >
              {resolvedTheme === 'dark' ? (
                <IoMoonOutline className={styles.themeToggleIcon} />
              ) : (
                <IoSunnyOutline className={styles.themeToggleIcon} />
              )}
            </button>
          </div>
          <div className={styles.navLinks}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
            >
              홈
            </Link>
            <Link
              to="/training"
              className={`${styles.navLink} ${isActive('/training') ? styles.navLinkActive : ''}`}
            >
              학습 모드
            </Link>
            <Link
              to="/exam"
              className={`${styles.navLink} ${isActive('/exam') ? styles.navLinkActive : ''}`}
            >
              모의고사
            </Link>
            <Link
              to="/mypage"
              className={`${styles.navLink} ${isActive('/mypage') ? styles.navLinkActive : ''}`}
            >
              마이페이지
            </Link>
            <Link
              to="/wrong-answers"
              className={`${styles.navLink} ${isActive('/wrong-answers') ? styles.navLinkActive : ''}`}
            >
              오답노트
            </Link>
            <Link
              to="/admin"
              className={`${styles.navLink} ${isActive('/admin') ? styles.navLinkActive : ''}`}
            >
              관리
            </Link>
            <button
              className={styles.themeToggleButton}
              onClick={toggleTheme}
              aria-label="테마 전환"
            >
              {resolvedTheme === 'dark' ? (
                <IoMoonOutline className={styles.themeToggleIcon} />
              ) : (
                <IoSunnyOutline className={styles.themeToggleIcon} />
              )}
              <span className={styles.themeToggleText}>테마 전환</span>
            </button>
          </div>
        </div>
      </nav>
      <nav className={styles.bottomNav}>
        <Link
          to="/training"
          className={`${styles.bottomNavLink} ${isActive('/training') ? styles.bottomNavLinkActive : ''}`}
          aria-label="학습 모드"
        >
          <IoBookOutline className={styles.bottomNavIcon} />
          <span className={styles.bottomNavLabel}>학습 모드</span>
        </Link>
        <Link
          to="/exam"
          className={`${styles.bottomNavLink} ${isActive('/exam') ? styles.bottomNavLinkActive : ''}`}
          aria-label="모의고사"
        >
          <IoDocumentTextOutline className={styles.bottomNavIcon} />
          <span className={styles.bottomNavLabel}>모의고사</span>
        </Link>
        <Link
          to="/"
          className={`${styles.bottomNavLink} ${isActive('/') ? styles.bottomNavLinkActive : ''}`}
          aria-label="홈"
        >
          <IoHomeOutline className={styles.bottomNavIcon} />
          <span className={styles.bottomNavLabel}>홈</span>
        </Link>
        <Link
          to="/wrong-answers"
          className={`${styles.bottomNavLink} ${isActive('/wrong-answers') ? styles.bottomNavLinkActive : ''}`}
          aria-label="오답노트"
        >
          <IoBookmarkOutline className={styles.bottomNavIcon} />
          <span className={styles.bottomNavLabel}>오답노트</span>
        </Link>
        <Link
          to="/admin"
          className={`${styles.bottomNavLink} ${isActive('/admin') ? styles.bottomNavLinkActive : ''}`}
          aria-label="관리"
        >
          <IoSettingsOutline className={styles.bottomNavIcon} />
          <span className={styles.bottomNavLabel}>관리</span>
        </Link>
      </nav>
    </>
  )
}

function App() {
  const { resolvedTheme } = useThemeStore()
  const { isLoading } = useUIStore()

  // 테마 변경 시 DOM에 적용
  useEffect(() => {
    const root = document.documentElement
    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [resolvedTheme])

  // 초기 마운트 시 테마 적용 (persist hydration 대비)
  useEffect(() => {
    const store = useThemeStore.getState()
    const root = document.documentElement
    const resolved = store.resolvedTheme
    if (resolved === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navigation />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam/result/:examSessionId" element={<ExamResult />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/wrong-answers" element={<WrongAnswers />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Loading isLoading={isLoading} />
      </div>
    </BrowserRouter>
  )
}

export default App
