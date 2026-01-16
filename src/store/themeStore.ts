import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: typeof window !== 'undefined' ? getSystemTheme() : 'light',
      setTheme: (theme) => {
        const resolved = resolveTheme(theme)
        set({ theme, resolvedTheme: resolved })
        if (typeof window !== 'undefined') {
          applyTheme(resolved)
        }
      },
      toggleTheme: () => {
        const store = get()
        const currentResolved = store.resolvedTheme
        const nextResolved: 'light' | 'dark' = currentResolved === 'light' ? 'dark' : 'light'
        // theme을 직접 'light' 또는 'dark'로 설정 (system이 아닌 명시적 값)
        set({ 
          theme: nextResolved,
          resolvedTheme: nextResolved 
        })
        if (typeof window !== 'undefined') {
          applyTheme(nextResolved)
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          const resolved = resolveTheme(state.theme)
          state.resolvedTheme = resolved
          applyTheme(resolved)
        }
      },
    }
  )
)

// 초기 테마 적용 및 시스템 테마 변경 감지
if (typeof window !== 'undefined') {
  // persist hydration 완료 후 초기 테마 적용
  const checkAndApplyTheme = () => {
    const store = useThemeStore.getState()
    const resolved = resolveTheme(store.theme)
    if (store.resolvedTheme !== resolved) {
      store.setTheme(store.theme)
    } else {
      applyTheme(resolved)
    }
  }
  
  // 즉시 실행
  checkAndApplyTheme()
  
  // persist hydration 대기 후 재실행
  setTimeout(checkAndApplyTheme, 100)
  
  // 시스템 테마 변경 감지
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const store = useThemeStore.getState()
    if (store.theme === 'system') {
      store.setTheme('system')
    }
  })
}
