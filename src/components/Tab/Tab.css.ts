import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const tabContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing[2],
  borderBottom: `2px solid ${colors.gray200}`,
  marginBottom: spacing[6],
  flexWrap: 'wrap',
  selectors: {
    '.dark &': {
      borderBottomColor: darkColors.gray700,
    },
  },
})

export const tabButton = style({
  padding: `${spacing[3]} ${spacing[4]}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textSecondary,
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: `2px solid transparent`,
  borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  marginBottom: '-2px',
  whiteSpace: 'normal',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  minWidth: 'fit-content',
  flexShrink: 0,
  ':hover': {
    color: colors.primary,
    backgroundColor: colors.gray50,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
    '.dark &:hover': {
      color: darkColors.primary,
      backgroundColor: darkColors.gray700,
    },
  },
})

export const tabButtonActive = style({
  color: colors.primary,
  borderBottomColor: colors.primary,
  fontWeight: typography.fontWeight.semibold,
  selectors: {
    '.dark &': {
      color: darkColors.primary,
      borderBottomColor: darkColors.primary,
    },
  },
})

export const tabContent = style({
  width: '100%',
})
