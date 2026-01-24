export type HighlightColorPreset = 'blue' | 'green' | 'orange'
export type HighlightDurationPreset = 'short' | 'medium' | 'long'
export type HighlightMode = 'preset' | 'custom'

export interface AutoReviewPreferences {
  approveReasonMinLength: number
  rejectReasonMinLength: number
  approveTemplates: string[]
  rejectTemplates: string[]
  approveTemplateFavorites: string[]
  rejectTemplateFavorites: string[]
  highlightColorPreset: HighlightColorPreset
  highlightDurationPreset: HighlightDurationPreset
  highlightMode: HighlightMode
  highlightCustomColor: string
  highlightCustomDurationMs: number
}

const STORAGE_KEY = 'autoReviewPreferences'

const DEFAULT_PREFERENCES: AutoReviewPreferences = {
  approveReasonMinLength: 3,
  rejectReasonMinLength: 10,
  approveTemplates: ['카테고리 일치 확인', '문맥과 주제가 일치', '세부항목 적합'],
  rejectTemplates: ['카테고리 불일치', '근거 부족/모호', '다른 세부항목이 더 적합'],
  approveTemplateFavorites: [],
  rejectTemplateFavorites: [],
  highlightColorPreset: 'blue',
  highlightDurationPreset: 'medium',
  highlightMode: 'preset',
  highlightCustomColor: '#2563eb',
  highlightCustomDurationMs: 1800,
}

const safeParse = (value: string | null): AutoReviewPreferences | null => {
  if (!value) return null
  try {
    const parsed = JSON.parse(value) as Partial<AutoReviewPreferences>
    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
      approveTemplates: Array.isArray(parsed.approveTemplates)
        ? parsed.approveTemplates
        : DEFAULT_PREFERENCES.approveTemplates,
      rejectTemplates: Array.isArray(parsed.rejectTemplates)
        ? parsed.rejectTemplates
        : DEFAULT_PREFERENCES.rejectTemplates,
      approveTemplateFavorites: Array.isArray(parsed.approveTemplateFavorites)
        ? parsed.approveTemplateFavorites
        : DEFAULT_PREFERENCES.approveTemplateFavorites,
      rejectTemplateFavorites: Array.isArray(parsed.rejectTemplateFavorites)
        ? parsed.rejectTemplateFavorites
        : DEFAULT_PREFERENCES.rejectTemplateFavorites,
    }
  } catch {
    return null
  }
}

export const getAutoReviewPreferences = (): AutoReviewPreferences => {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES
  const stored = safeParse(window.localStorage.getItem(STORAGE_KEY))
  return stored ?? DEFAULT_PREFERENCES
}

export const saveAutoReviewPreferences = (preferences: AutoReviewPreferences) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  window.dispatchEvent(new CustomEvent('autoReviewPreferencesUpdated', { detail: preferences }))
}

export const subscribeAutoReviewPreferences = (callback: (preferences: AutoReviewPreferences) => void) => {
  if (typeof window === 'undefined') return () => undefined
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<AutoReviewPreferences>
    if (customEvent.detail) {
      callback(customEvent.detail)
    } else {
      callback(getAutoReviewPreferences())
    }
  }
  window.addEventListener('autoReviewPreferencesUpdated', handler)
  return () => window.removeEventListener('autoReviewPreferencesUpdated', handler)
}
