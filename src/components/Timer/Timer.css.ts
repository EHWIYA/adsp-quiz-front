import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const timer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[4],
  padding: spacing[6],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.xl,
  border: `2px solid ${colors.primary}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.gray800,
    borderColor: darkColors.primary,
  },
})

export const timeDisplay = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[2],
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.primary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.primary,
  },
})

export const timeUnit = style({
  minWidth: '60px',
  textAlign: 'center',
})

export const separator = style({
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const controlButton = style({
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.primary,
  backgroundColor: 'transparent',
  border: `1px solid ${colors.primary}`,
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.primary,
    borderColor: darkColors.primary,
    ':hover': {
      backgroundColor: darkColors.primary,
      color: darkColors.white,
    },
  },
})
