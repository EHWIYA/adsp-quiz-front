import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Training } from './pages/Training/Training'
import { Exam } from './pages/Exam/Exam'
import { ExamResult } from './pages/ExamResult/ExamResult'
import { Mypage } from './pages/Mypage/Mypage'
import { Admin } from './pages/Admin/Admin'
import { useThemeStore } from './store/themeStore'
import { useUIStore } from './store/uiStore'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle'
import { Loading } from './components/Loading/Loading'
import * as styles from './App.css'

const Navigation = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          ADsP AI Pass
        </Link>
        <div className={styles.navRight}>
          <ThemeToggle />
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
          </button>
        </div>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            홈
          </Link>
          <Link
            to="/training"
            className={`${styles.navLink} ${isActive('/training') ? styles.navLinkActive : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            학습 모드
          </Link>
          <Link
            to="/exam"
            className={`${styles.navLink} ${isActive('/exam') ? styles.navLinkActive : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            모의고사
          </Link>
          <Link
            to="/mypage"
            className={`${styles.navLink} ${isActive('/mypage') ? styles.navLinkActive : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            마이페이지
          </Link>
          <Link
            to="/admin"
            className={`${styles.navLink} ${isActive('/admin') ? styles.navLinkActive : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            관리
          </Link>
        </div>
      </div>
    </nav>
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
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Loading isLoading={isLoading} />
      </div>
    </BrowserRouter>
  )
}

export default App
