import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, breakpoints } from '../../styles/theme'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
  maxWidth: '720px',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[3],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
})

export const title = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
  padding: spacing[4],
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.white,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const guideBox = style({
  padding: spacing[3],
  borderRadius: borderRadius.md,
  border: `1px dashed ${colors.gray300}`,
  backgroundColor: colors.gray50,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray600,
    },
  },
})

export const guideItem = style({
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: spacing[4],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr',
    },
  },
})

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
})

export const label = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const helperText = style({
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const textarea = style({
  width: '100%',
  padding: spacing[3],
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.mono,
  color: colors.textPrimary,
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  resize: 'vertical',
  minHeight: '160px',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray600,
    },
  },
})

export const actionRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: spacing[2],
})

export const emptyText = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const error = style({
  padding: spacing[4],
  backgroundColor: '#fef2f2',
  border: `1px solid ${colors.error}`,
  borderRadius: borderRadius.md,
  selectors: {
    '.dark &': {
      backgroundColor: '#7f1d1d',
      borderColor: darkColors.error,
    },
  },
})

export const errorMessage = style({
  fontSize: typography.fontSize.sm,
  color: colors.error,
  margin: 0,
  selectors: {
    '.dark &': {
      color: darkColors.error,
    },
  },
})
