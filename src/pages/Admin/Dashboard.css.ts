import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, breakpoints } from '../../styles/theme'

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
})

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: spacing[4],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
})

export const statCard = style({
  padding: spacing[5],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.lg,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const statLabel = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textSecondary,
  marginBottom: spacing[2],
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const statValue = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const section = style({
  marginTop: spacing[6],
})

export const sectionTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  marginBottom: spacing[4],
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const categoryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: spacing[4],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: '1fr',
    },
  },
})

export const filterContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing[4],
  marginBottom: spacing[4],
  padding: spacing[4],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  minWidth: '180px',
  flex: '1 1 200px',
})

export const filterLabel = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const categoryTree = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
})

export const categoryItem = style({
  padding: spacing[4],
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
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

export const categoryName = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  lineHeight: typography.lineHeight.relaxed,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const categoryInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing[3],
  flexWrap: 'wrap',
})

export const categoryCount = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary,
  whiteSpace: 'nowrap',
  selectors: {
    '.dark &': {
      color: darkColors.primary,
    },
  },
})

export const categoryStatus = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[1],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  padding: `${spacing[2]} ${spacing[3]}`,
  borderRadius: borderRadius.md,
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const categoryStatusNormal = style({
  backgroundColor: colors.success + '15',
  color: colors.success,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.success + '20',
      color: darkColors.success,
    },
  },
})

export const categoryStatusInsufficient = style({
  backgroundColor: colors.warning + '15',
  color: colors.warning,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.warning + '20',
      color: darkColors.warning,
    },
  },
})

export const categoryStatusProductionDifficult = style({
  backgroundColor: colors.error + '15',
  color: colors.error,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.error + '20',
      color: darkColors.error,
    },
  },
})

export const quizList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
})

export const quizItem = style({
  padding: spacing[4],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
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

export const quizQuestion = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing[3],
  width: '100%',
})

export const quizId = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary,
  padding: `${spacing[1]} ${spacing[2]}`,
  backgroundColor: colors.primary + '10',
  borderRadius: borderRadius.sm,
  flexShrink: 0,
  selectors: {
    '.dark &': {
      color: darkColors.primary,
      backgroundColor: darkColors.primary + '20',
    },
  },
})

export const quizText = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.normal,
  color: colors.textPrimary,
  flex: 1,
  lineHeight: typography.lineHeight.relaxed,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const quizMeta = style({
  display: 'flex',
  gap: spacing[2],
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  marginTop: spacing[1],
})

export const quizDate = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  whiteSpace: 'nowrap',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const loadingText = style({
  textAlign: 'center',
  padding: spacing[8],
  color: colors.textSecondary,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const emptyText = style({
  textAlign: 'center',
  padding: spacing[8],
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

export const helperText = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  marginTop: spacing[2],
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

// 계층형 트리 스타일
export const treeNode = style({
  display: 'flex',
  flexDirection: 'column',
  borderLeft: `2px solid ${colors.gray200}`,
  marginLeft: spacing[2],
  paddingLeft: spacing[3],
  selectors: {
    '.dark &': {
      borderLeftColor: darkColors.gray700,
    },
  },
})

export const treeNodeHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[2],
  padding: `${spacing[2]} ${spacing[3]}`,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: colors.gray50,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.gray700,
    },
  },
})

export const treeIcon = style({
  fontSize: typography.fontSize.lg,
  flexShrink: 0,
  width: '24px',
  textAlign: 'center',
})

export const treeNodeTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  flex: 1,
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const treeNodeCount = style({
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  fontWeight: typography.fontWeight.normal,
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const treeNodeChildren = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: spacing[1],
  marginLeft: spacing[4],
  gap: spacing[1],
})

export const treeLeaf = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  padding: spacing[3],
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
  marginLeft: spacing[2],
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})

export const treeLeafName = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textPrimary,
  lineHeight: typography.lineHeight.relaxed,
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})
