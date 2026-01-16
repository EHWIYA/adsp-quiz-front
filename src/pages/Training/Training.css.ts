import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, breakpoints } from '../../styles/theme'

export const container = style({
  minHeight: '100vh',
  padding: spacing[6],
  maxWidth: '1200px',
  margin: '0 auto',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      padding: spacing[4],
    },
  },
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: spacing[8],
  paddingBottom: spacing[4],
  borderBottom: `1px solid ${colors.gray200}`,
  transition: 'border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    borderBottomColor: darkColors.gray700,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing[3],
      marginBottom: spacing[6],
    },
  },
})

export const title = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  margin: 0,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      fontSize: typography.fontSize['2xl'],
    },
  },
})

export const progress = style({
  fontSize: typography.fontSize.base,
  color: colors.textSecondary,
  fontWeight: typography.fontWeight.medium,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const content = style({
  marginBottom: spacing[8],
})

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: spacing[6],
  borderTop: `1px solid ${colors.gray200}`,
  transition: 'border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    borderTopColor: darkColors.gray700,
  },
})

export const nextButton = style({
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
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.primary,
    ':hover': {
      backgroundColor: darkColors.primaryDark,
    },
  },
})
