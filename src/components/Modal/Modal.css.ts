import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, shadow } from '../../styles/theme'

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: spacing[4],
  selectors: {
    '.dark &': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  },
})

export const modal = style({
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  boxShadow: shadow.xl,
  maxWidth: '500px',
  width: '100%',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
    },
  },
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing[6],
  borderBottom: `1px solid ${colors.gray200}`,
  transition: 'border-color 0.3s ease',
  selectors: {
    '.dark &': {
      borderBottomColor: darkColors.gray700,
    },
  },
})

export const title = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  margin: 0,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const closeButton = style({
  background: 'none',
  border: 'none',
  fontSize: typography.fontSize['3xl'],
  color: colors.textSecondary,
  cursor: 'pointer',
  padding: 0,
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: borderRadius.md,
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: colors.gray100,
    color: colors.textPrimary,
  },
})

export const content = style({
  padding: spacing[6],
  overflowY: 'auto',
  flex: 1,
})

export const footer = style({
  padding: spacing[6],
  borderTop: `1px solid ${colors.gray200}`,
  display: 'flex',
  gap: spacing[3],
  justifyContent: 'flex-end',
})
