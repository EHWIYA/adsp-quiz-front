import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, breakpoints } from '../../styles/theme'

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
})

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: spacing[4],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
})

export const statCard = style({
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

export const statLabel = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  marginBottom: spacing[2],
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const statValue = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const section = style({
  marginTop: spacing[6],
})

export const sectionTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  marginBottom: spacing[4],
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const categoryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: spacing[3],
})

export const categoryItem = style({
  padding: spacing[3],
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const categoryName = style({
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const categoryCount = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary,
  selectors: {
    '.dark &': {
      color: darkColors.primary,
    },
  },
})

export const quizList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
})

export const quizItem = style({
  padding: spacing[4],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const quizQuestion = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
  flex: 1,
})

export const quizId = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary,
  padding: `${spacing[1]} ${spacing[2]}`,
  backgroundColor: colors.primary + '10',
  borderRadius: borderRadius.sm,
  selectors: {
    '.dark &': {
      color: darkColors.primary,
      backgroundColor: darkColors.primary + '20',
    },
  },
})

export const quizText = style({
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  flex: 1,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const quizMeta = style({
  display: 'flex',
  gap: spacing[2],
  alignItems: 'center',
})

export const quizDate = style({
  fontSize: typography.fontSize.sm,
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
