import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, shadow, breakpoints } from '../../styles/theme'

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

export const hero = style({
  textAlign: 'center',
  padding: `${spacing[20]} ${spacing[4]}`,
  marginBottom: spacing[12],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      padding: `${spacing[12]} ${spacing[4]}`,
      marginBottom: spacing[8],
    },
  },
})

export const title = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  marginBottom: spacing[4],
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      fontSize: typography.fontSize['2xl'],
      marginBottom: spacing[3],
    },
  },
})

export const subtitle = style({
  fontSize: typography.fontSize.xl,
  color: colors.textSecondary,
  lineHeight: typography.lineHeight.relaxed,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      fontSize: typography.fontSize.base,
    },
  },
})

export const stats = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: spacing[6],
  marginBottom: spacing[12],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr',
      gap: spacing[4],
      marginBottom: spacing[8],
    },
  },
})

export const statCard = style({
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  padding: spacing[6],
  boxShadow: shadow.md,
  border: `1px solid ${colors.gray200}`,
  textAlign: 'center',
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.backgroundSecondary,
    borderColor: darkColors.gray700,
  },
})

export const statNumber = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.primary,
  marginBottom: spacing[2],
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.primary,
  },
})

export const statLabel = style({
  fontSize: typography.fontSize.base,
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const actions = style({
  display: 'flex',
  gap: spacing[4],
  justifyContent: 'center',
  marginBottom: spacing[12],
  flexWrap: 'wrap',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      flexDirection: 'column',
      gap: spacing[3],
      marginBottom: spacing[8],
    },
  },
})

export const recentActivity = style({
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  padding: spacing[6],
  boxShadow: shadow.md,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.backgroundSecondary,
    borderColor: darkColors.gray700,
  },
})

export const sectionTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  marginBottom: spacing[6],
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const activityList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
})

export const activityItem = style({
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.md,
  transition: 'background-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.gray800,
  },
})

export const activityText = style({
  fontSize: typography.fontSize.base,
  color: colors.textSecondary,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})
