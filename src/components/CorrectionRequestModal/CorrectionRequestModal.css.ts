import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
})

export const questionSection = style({
  padding: spacing[4],
  backgroundColor: colors.gray50,
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const label = style({
  display: 'block',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  marginBottom: spacing[2],
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const questionText = style({
  fontSize: typography.fontSize.base,
  color: colors.textSecondary,
  lineHeight: 1.6,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
})

export const required = style({
  color: colors.error,
  selectors: {
    '.dark &': {
      color: darkColors.error,
    },
  },
})

export const textarea = style({
  width: '100%',
  padding: spacing[3],
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.sans,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  resize: 'vertical',
  transition: 'all 0.2s ease-in-out',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primary}20`,
  },
  '::placeholder': {
    color: colors.textTertiary,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray600,
    },
    '.dark &::placeholder': {
      color: darkColors.textTertiary,
    },
    '.dark &:focus': {
      borderColor: darkColors.primary,
      boxShadow: `0 0 0 3px ${darkColors.primary}20`,
    },
  },
})

export const footer = style({
  display: 'flex',
  gap: spacing[3],
  justifyContent: 'flex-end',
})

export const cancelButton = style({
  padding: `${spacing[3]} ${spacing[6]}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  backgroundColor: colors.gray100,
  border: 'none',
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: colors.gray200,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.gray700,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.gray600,
    },
  },
})

export const submitButton = style({
  padding: `${spacing[3]} ${spacing[6]}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
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

export const error = style({
  padding: spacing[3],
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
