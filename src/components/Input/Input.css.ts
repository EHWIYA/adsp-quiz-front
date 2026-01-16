import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  width: '100%',
})

export const label = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const input = style({
  width: '100%',
  padding: `${spacing[3]} ${spacing[4]}`,
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.sans,
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
  '::placeholder': {
    color: colors.textTertiary,
  },
  ':disabled': {
    backgroundColor: colors.gray100,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    color: darkColors.textPrimary,
    backgroundColor: darkColors.backgroundSecondary,
    borderColor: darkColors.gray600,
    '::placeholder': {
      color: darkColors.textTertiary,
    },
    ':focus': {
      borderColor: darkColors.primary,
      boxShadow: `0 0 0 3px ${darkColors.primary}20`,
    },
    ':disabled': {
      backgroundColor: darkColors.gray700,
    },
  },
})

export const inputError = style({
  borderColor: colors.error,
  ':focus': {
    borderColor: colors.error,
    boxShadow: `0 0 0 3px ${colors.error}20`,
  },
})

export const errorText = style({
  fontSize: typography.fontSize.sm,
  color: colors.error,
})
