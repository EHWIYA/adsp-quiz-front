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

export const header = style({
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

export const profile = style({
  marginBottom: spacing[8],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      marginBottom: spacing[6],
    },
  },
})

export const profileCard = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
  padding: spacing[6],
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  boxShadow: shadow.md,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.backgroundSecondary,
    borderColor: darkColors.gray700,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      flexDirection: 'column',
      textAlign: 'center',
      padding: spacing[4],
    },
  },
})

export const avatar = style({
  width: '80px',
  height: '80px',
  borderRadius: borderRadius.full,
  backgroundColor: colors.primary,
  color: colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
})

export const profileInfo = style({
  flex: 1,
})

export const username = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  marginBottom: spacing[1],
  margin: 0,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const email = style({
  fontSize: typography.fontSize.base,
  color: colors.textSecondary,
  margin: 0,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textSecondary,
  },
})

export const stats = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: spacing[6],
  marginBottom: spacing[8],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr',
      gap: spacing[4],
      marginBottom: spacing[6],
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

export const recentResults = style({
  marginBottom: spacing[8],
  padding: spacing[6],
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
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
  margin: 0,
  transition: 'color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    color: darkColors.textPrimary,
  },
})

export const resultsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
})

export const emptyState = style({
  textAlign: 'center',
  padding: spacing[12],
  color: colors.textSecondary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[4],
})

export const settings = style({
  padding: spacing[6],
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  boxShadow: shadow.md,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    backgroundColor: darkColors.backgroundSecondary,
    borderColor: darkColors.gray700,
  },
})

export const settingsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
})

export const settingItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  borderRadius: borderRadius.md,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  ':hover': {
    backgroundColor: colors.gray100,
  },
})

export const arrow = style({
  fontSize: typography.fontSize['2xl'],
  color: colors.textSecondary,
})
