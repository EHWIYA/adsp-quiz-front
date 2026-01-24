import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing[4],
})

export const title = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const quizList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
})

export const quizCard = style({
  padding: spacing[5],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.lg,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const quizHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing[4],
  paddingBottom: spacing[3],
  borderBottom: `1px solid ${colors.gray200}`,
  selectors: {
    '.dark &': {
      borderBottomColor: darkColors.gray700,
    },
  },
})

export const quizId = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary,
  selectors: {
    '.dark &': {
      color: darkColors.primary,
    },
  },
})

export const validateButton = style({
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.white,
  backgroundColor: colors.primary,
  border: 'none',
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: colors.primaryDark,
  },
  ':disabled': {
    backgroundColor: colors.gray300,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.primary,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.primaryDark,
    },
    '.dark &:disabled': {
      backgroundColor: darkColors.gray600,
    },
  },
})

export const validatedButton = style({
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.white,
  backgroundColor: colors.success || '#22c55e',
  border: 'none',
  borderRadius: borderRadius.md,
  cursor: 'not-allowed',
  opacity: 0.8,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.success,
      color: darkColors.black,
    },
  },
})

export const quizContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
})

export const quizQuestion = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  lineHeight: 1.6,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const quizOptions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  marginTop: spacing[2],
})

export const quizOption = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[2],
  padding: spacing[2],
  backgroundColor: colors.gray50,
  borderRadius: borderRadius.sm,
  border: `1px solid ${colors.gray300}`,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const optionNumber = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textSecondary,
  minWidth: '24px',
  selectors: {
    '.dark &': {
      color: darkColors.black,
    },
  },
})

export const optionText = style({
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  flex: 1,
  selectors: {
    '.dark &': {
      color: darkColors.black,
    },
  },
})

export const correctBadge = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  color: colors.success || '#22c55e',
  backgroundColor: (colors.success || '#22c55e') + '20',
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: borderRadius.sm,
})

export const quizExplanation = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  padding: spacing[3],
  backgroundColor: colors.gray50,
  borderRadius: borderRadius.md,
  marginTop: spacing[2],
  border: `1px solid ${colors.gray300}`,
  selectors: {
    '.dark &': {
      color: darkColors.black,
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const quizMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: spacing[2],
  paddingTop: spacing[3],
  borderTop: `1px solid ${colors.gray200}`,
  selectors: {
    '.dark &': {
      borderTopColor: darkColors.gray700,
    },
  },
})

export const quizDate = style({
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const validationResult = style({
  padding: spacing[5],
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.lg,
  marginBottom: spacing[6],
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const validationHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing[4],
})

export const validationTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.black,
    },
  },
})

export const closeButton = style({
  padding: spacing[2],
  fontSize: typography.fontSize.xl,
  color: colors.textSecondary,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: borderRadius.sm,
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: colors.gray200,
    color: colors.textPrimary,
  },
  selectors: {
    '.dark &': {
      color: darkColors.black,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.gray600,
      color: darkColors.black,
    },
  },
})

export const validationContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
})

export const validationStatus = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
})

export const statusBadge = style({
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  borderRadius: borderRadius.md,
})

export const statusValid = style({
  color: colors.success || '#22c55e',
  backgroundColor: (colors.success || '#22c55e') + '20',
})

export const statusInvalid = style({
  color: colors.error,
  backgroundColor: colors.error + '20',
  selectors: {
    '.dark &': {
      backgroundColor: colors.error + '30',
    },
  },
})

export const validationScore = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.black,
    },
  },
})

export const validationInfo = style({
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  lineHeight: 1.6,
  selectors: {
    '.dark &': {
      color: darkColors.black,
    },
  },
})

export const issuesList = style({
  margin: `${spacing[2]} 0 0 ${spacing[4]}`,
  padding: 0,
  listStyle: 'disc',
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const loadingText = style({
  textAlign: 'center',
  padding: spacing[8],
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const emptyText = style({
  textAlign: 'center',
  padding: spacing[8],
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const error = style({
  padding: spacing[4],
  backgroundColor: '#fef2f2',
  border: `1px solid ${colors.error}`,
  borderRadius: borderRadius.md,
  selectors: {
    '.dark &': {
      backgroundColor: '#7f1d1d',
      borderColor: darkColors.error,
    },
  },
})

export const errorMessage = style({
  fontSize: typography.fontSize.sm,
  color: colors.error,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.error,
    },
  },
})

export const helperText = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  marginTop: spacing[2],
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

// 요약 대시보드
export const summaryDashboard = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: spacing[4],
  marginBottom: spacing[6],
})

export const summaryCard = style({
  padding: spacing[4],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.lg,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const summaryCardPrimary = style({
  backgroundColor: colors.primary + '10',
  borderColor: colors.primary,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.primary + '20',
      borderColor: darkColors.primary,
    },
  },
})

export const summaryCardWarning = style({
  backgroundColor: (colors.error || '#ef4444') + '10',
  borderColor: colors.error || '#ef4444',
  selectors: {
    '.dark &': {
      backgroundColor: (darkColors.error || '#ef4444') + '20',
      borderColor: darkColors.error || '#ef4444',
    },
  },
})

export const summaryLabel = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  marginBottom: spacing[2],
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const summaryValue = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

// 필터
export const filters = style({
  display: 'flex',
  gap: spacing[4],
  marginBottom: spacing[6],
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const searchInput = style({
  flex: 1,
  minWidth: '200px',
  padding: `${spacing[3]} ${spacing[4]}`,
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  transition: 'all 0.2s ease-in-out',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primary}20`,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
      color: darkColors.textPrimary,
    },
    '.dark &:focus': {
      borderColor: darkColors.primary,
      boxShadow: `0 0 0 3px ${darkColors.primary}20`,
    },
  },
})

export const categoryFilter = style({
  minWidth: '200px',
})

// 문제 목록 헤더
export const quizListHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing[4],
})

export const quizCount = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  fontWeight: typography.fontWeight.medium,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

// 문제 카드 개선
export const quizCardNeedsValidation = style({
  borderLeft: `4px solid ${colors.error || '#ef4444'}`,
  selectors: {
    '.dark &': {
      borderLeftColor: darkColors.error || '#ef4444',
    },
  },
})

export const quizHeaderLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
  flexWrap: 'wrap',
})

export const quizCategory = style({
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  backgroundColor: colors.gray100,
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: borderRadius.sm,
  fontWeight: typography.fontWeight.medium,
  border: `1px solid ${colors.gray300}`,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.gray300,
      borderColor: darkColors.gray400,
    },
  },
})

export const validationBadge = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  color: colors.error || '#ef4444',
  backgroundColor: (colors.error || '#ef4444') + '20',
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: borderRadius.sm,
  selectors: {
    '.dark &': {
      color: darkColors.error || '#ef4444',
      backgroundColor: (darkColors.error || '#ef4444') + '30',
    },
  },
})

export const emptyState = style({
  padding: spacing[8],
  textAlign: 'center',
})
