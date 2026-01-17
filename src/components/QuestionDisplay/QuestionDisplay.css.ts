import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const container = style({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
})

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: spacing[6],
  gap: spacing[3],
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
    opacity: 0.5,
    cursor: 'not-allowed',
    backgroundColor: colors.primary,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.primary,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.primaryDark,
    },
    '.dark &:disabled': {
      backgroundColor: darkColors.primary,
    },
  },
})
