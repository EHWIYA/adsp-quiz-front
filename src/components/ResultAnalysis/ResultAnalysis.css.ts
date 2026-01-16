import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, shadow } from '../../styles/theme'

export const container = style({
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  padding: spacing[8],
  boxShadow: shadow.lg,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.backgroundSecondary,
    borderColor: darkColors.gray700,
  },
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: spacing[8],
  paddingBottom: spacing[6],
  borderBottom: `2px solid ${colors.gray200}`,
  transition: 'border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    borderBottomColor: darkColors.gray700,
  },
})

export const title = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  margin: 0,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const score = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.primary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.primary,
  },
})

export const stats = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: spacing[4],
  marginBottom: spacing[8],
})

export const statCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.gray800,
    borderColor: darkColors.gray700,
  },
})

export const statLabel = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  marginBottom: spacing[2],
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const statValue = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const statCorrect = style({
  color: colors.success,
})

export const statWrong = style({
  color: colors.error,
})

export const statUnanswered = style({
  color: colors.warning,
})

export const timeInfo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  marginBottom: spacing[6],
  padding: spacing[4],
  backgroundColor: colors.gray50,
  borderRadius: borderRadius.md,
  transition: 'background-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.gray800,
  },
})

export const timeLabel = style({
  fontSize: typography.fontSize.base,
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const timeValue = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const progressBar = style({
  width: '100%',
  height: '12px',
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
