import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
})

export const header = style({
  marginBottom: '2rem',
  textAlign: 'center',
})

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const subtitle = style({
  fontSize: '1rem',
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const filters = style({
  marginBottom: '2rem',
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
})

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  minWidth: '200px',
})

export const label = style({
  fontSize: typography.fontSize.sm,
  fontWeight: 'bold',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const loading = style({
  textAlign: 'center',
  padding: '4rem',
  fontSize: '1.2rem',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const error = style({
  textAlign: 'center',
  padding: '4rem',
  fontSize: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const emptyState = style({
  textAlign: 'center',
  padding: '4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
})

export const stats = style({
  marginBottom: '1.5rem',
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.base,
  display: 'flex',
  gap: spacing[4],
  transition: 'background-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray800,
    },
  },
})

export const statItem = style({
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const wrongAnswersList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const wrongAnswerItem = style({
  padding: '1.5rem',
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  backgroundColor: colors.white,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const wrongAnswerHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: spacing[2],
})

export const wrongAnswerInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
})

export const questionNumber = style({
  fontWeight: 'bold',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const savedDate = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const wrongAnswerActions = style({
  display: 'flex',
  gap: spacing[2],
})

export const questionText = style({
  fontSize: '1rem',
  marginTop: '0.5rem',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const answerInfo = style({
  display: 'flex',
  gap: spacing[4],
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const explanation = style({
  marginTop: spacing[2],
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.base,
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray800,
      color: darkColors.textPrimary,
    },
  },
})

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing[4],
  marginTop: '2rem',
})

export const pageInfo = style({
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
})

export const footer = style({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginTop: '2rem',
})
