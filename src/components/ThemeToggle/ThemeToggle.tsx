import { useThemeStore } from '../../store/themeStore'
import * as styles from './ThemeToggle.css'

export const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme } = useThemeStore()

  const handleToggle = () => {
    toggleTheme()
  }

  return (
    <button 
      className={styles.toggleButton} 
      onClick={handleToggle} 
      aria-label="테마 전환"
    >
      {resolvedTheme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
