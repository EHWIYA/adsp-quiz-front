import { style, keyframes } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, breakpoints } from '../../styles/theme'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
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

export const summaryCard = style({
  padding: spacing[3],
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.white,
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
      color: darkColors.textSecondary,
    },
  },
})

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
})

export const card = style({
  padding: spacing[4],
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.white,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

const highlightPulseBlue = keyframes({
  '0%': {
    boxShadow: `0 0 0 0 ${colors.primaryLight}55`,
    borderColor: colors.primary,
  },
  '70%': {
    boxShadow: `0 0 0 12px ${colors.primaryLight}20`,
    borderColor: colors.primary,
  },
  '100%': {
    boxShadow: '0 0 0 0 transparent',
    borderColor: colors.gray200,
  },
})

const highlightPulseCustom = keyframes({
  '0%': {
    boxShadow: '0 0 0 0 var(--highlight-shadow-strong, rgba(37, 99, 235, 0.4))',
    borderColor: 'var(--highlight-color, #2563eb)',
  },
  '70%': {
    boxShadow: '0 0 0 12px var(--highlight-shadow-soft, rgba(37, 99, 235, 0.18))',
    borderColor: 'var(--highlight-color, #2563eb)',
  },
  '100%': {
    boxShadow: '0 0 0 0 transparent',
    borderColor: colors.gray200,
  },
})

const highlightPulseGreen = keyframes({
  '0%': {
    boxShadow: `0 0 0 0 ${colors.success}44`,
    borderColor: colors.success,
  },
  '70%': {
    boxShadow: `0 0 0 12px ${colors.success}1f`,
    borderColor: colors.success,
  },
  '100%': {
    boxShadow: '0 0 0 0 transparent',
    borderColor: colors.gray200,
  },
})

const highlightPulseOrange = keyframes({
  '0%': {
    boxShadow: `0 0 0 0 ${colors.warning}44`,
    borderColor: colors.warning,
  },
  '70%': {
    boxShadow: `0 0 0 12px ${colors.warning}1f`,
    borderColor: colors.warning,
  },
  '100%': {
    boxShadow: '0 0 0 0 transparent',
    borderColor: colors.gray200,
  },
})

const highlightBase = style({
  animationTimingFunction: 'ease-out',
  animationFillMode: 'forwards',
  animationIterationCount: 1,
})

export const cardHighlightBlue = style([
  highlightBase,
  {
    animationName: highlightPulseBlue,
    borderColor: colors.primary,
  },
])

export const cardHighlightGreen = style([
  highlightBase,
  {
    animationName: highlightPulseGreen,
    borderColor: colors.success,
  },
])

export const cardHighlightOrange = style([
  highlightBase,
  {
    animationName: highlightPulseOrange,
    borderColor: colors.warning,
  },
])

export const highlightDurationShort = style({
  animationDuration: '1.2s',
})

export const highlightDurationMedium = style({
  animationDuration: '1.8s',
})

export const highlightDurationLong = style({
  animationDuration: '2.4s',
})

export const cardHighlightCustom = style({
  animationName: highlightPulseCustom,
  animationDuration: 'var(--highlight-duration, 1800ms)',
  animationTimingFunction: 'ease-out',
  animationFillMode: 'forwards',
  borderColor: 'var(--highlight-color, #2563eb)',
  boxShadow: '0 0 0 0 var(--highlight-shadow-strong, rgba(37, 99, 235, 0.4))',
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[2],
})

export const badge = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: borderRadius.sm,
  backgroundColor: colors.gray100,
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray700,
      color: darkColors.textSecondary,
    },
  },
})

export const contentPreview = style({
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  lineHeight: typography.lineHeight.normal,
  whiteSpace: 'pre-wrap',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const metaText = style({
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const warningText = style({
  fontSize: typography.fontSize.xs,
  color: colors.warning,
  selectors: {
    '.dark &': {
      color: darkColors.warning,
    },
  },
})

export const candidateList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
})

export const candidateItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing[2],
  padding: spacing[3],
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.gray50,
  cursor: 'pointer',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const candidateContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
})

export const candidatePath = style({
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const candidateMeta = style({
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const reasonBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
})

export const textarea = style({
  width: '100%',
  padding: spacing[3],
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.sans,
  color: colors.textPrimary,
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  resize: 'vertical',
  minHeight: '80px',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray600,
    },
  },
})

export const templateList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing[2],
})

export const templateItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[1],
})

export const templateButton = style({
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: borderRadius.sm,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.white,
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  cursor: 'pointer',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
      color: darkColors.textSecondary,
    },
  },
  ':hover': {
    borderColor: colors.primary,
    color: colors.textPrimary,
  },
})

export const favoriteButton = style({
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.white,
  color: colors.gray400,
  borderRadius: borderRadius.sm,
  padding: `${spacing[1]} ${spacing[2]}`,
  fontSize: typography.fontSize.xs,
  cursor: 'pointer',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
      color: darkColors.gray500,
    },
  },
  ':hover': {
    color: colors.primary,
    borderColor: colors.primary,
  },
})

export const favoriteButtonActive = style({
  color: colors.primary,
  borderColor: colors.primary,
})

export const treePreview = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  padding: spacing[3],
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: colors.gray50,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const pathChips = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing[2],
})

const chipBase = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: borderRadius.sm,
})

export const pathChipSubject = style([
  chipBase,
  {
    backgroundColor: `${colors.primary}14`,
    color: colors.primary,
    selectors: {
      '.dark &': {
        backgroundColor: `${darkColors.primary}22`,
        color: darkColors.primary,
      },
    },
  },
])

export const pathChipMain = style([
  chipBase,
  {
    backgroundColor: `${colors.secondary}20`,
    color: colors.secondaryDark,
    selectors: {
      '.dark &': {
        backgroundColor: `${darkColors.secondary}24`,
        color: darkColors.secondary,
      },
    },
  },
])

export const pathChipSub = style([
  chipBase,
  {
    backgroundColor: `${colors.success}14`,
    color: colors.success,
    selectors: {
      '.dark &': {
        backgroundColor: `${darkColors.success}22`,
        color: darkColors.success,
      },
    },
  },
])

export const treeLine = style({
  fontSize: typography.fontSize.sm,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const actionRow = style({
  display: 'flex',
  gap: spacing[2],
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
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
