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
  flexWrap: 'wrap',
  gap: spacing[4],
  transition: 'border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    borderBottomColor: darkColors.gray700,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
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

export const timerWrapper = style({
  flexShrink: 0,
})

export const progress = style({
  marginBottom: spacing[8],
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.md,
  transition: 'background-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.gray800,
  },
})

export const progressInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: spacing[2],
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  fontWeight: typography.fontWeight.medium,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const progressBar = style({
  width: '100%',
  height: '8px',
  backgroundColor: colors.gray200,
  borderRadius: borderRadius.full,
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.gray700,
  },
})

export const progressFill = style({
  height: '100%',
  backgroundColor: colors.primary,
  transition: 'width 0.3s ease-in-out, background-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.primary,
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

export const submitButton = style({
  padding: `${spacing[4]} ${spacing[8]}`,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.white,
  backgroundColor: colors.error,
  border: 'none',
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: '#dc2626',
  },
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    ':hover': {
      backgroundColor: '#f87171',
    },
  },
})
