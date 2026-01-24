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
  marginBottom: '1rem',
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

export const answerList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const sectionTitle = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
    color: darkColors.textPrimary,
    },
  },
})

export const answerItem = style({
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

export const answerHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

export const correctBadge = style({
  padding: spacing[1] + ' ' + spacing[3],
  backgroundColor: colors.success,
  color: colors.white,
  borderRadius: borderRadius.base,
  fontSize: typography.fontSize.sm,
})

export const wrongBadge = style({
  padding: spacing[1] + ' ' + spacing[3],
  backgroundColor: colors.error,
  color: colors.white,
  borderRadius: borderRadius.base,
  fontSize: typography.fontSize.sm,
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
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
      border: `1px solid ${darkColors.gray700}`,
      color: darkColors.black,
    },
  },
})

export const footer = style({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginTop: '2rem',
})
