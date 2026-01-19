import { style, globalStyle } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, shadow, breakpoints } from '../../styles/theme'

export const card = style({
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,
  padding: spacing[6],
  boxShadow: shadow.md,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      padding: spacing[4],
      borderRadius: borderRadius.lg,
    },
  },
})

export const category = style({
  display: 'inline-block',
  padding: `${spacing[1]} ${spacing[3]}`,
  backgroundColor: colors.gray100,
  color: colors.textSecondary,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  borderRadius: borderRadius.full,
  marginBottom: spacing[4],
  transition: 'background-color 0.3s ease, color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray700,
      color: darkColors.textSecondary,
    },
  },
})

export const question = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textPrimary,
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing[6],
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const options = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[3],
  marginBottom: spacing[6],
})

export const option = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
  padding: spacing[4],
  backgroundColor: colors.backgroundSecondary,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  textAlign: 'left',
  width: '100%',
  ':hover': {
    backgroundColor: colors.gray100,
    borderColor: colors.primary,
  },
  ':disabled': {
    cursor: 'default',
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray200,
      borderColor: darkColors.gray300,
      color: darkColors.textPrimary,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.gray300,
      borderColor: darkColors.primary,
    },
  },
})

export const optionSelected = style({
  backgroundColor: colors.primaryLight,
  borderColor: colors.primary,
  color: colors.white,
  ':hover': {
    backgroundColor: colors.primaryLight,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.primary,
      borderColor: darkColors.primaryLight,
      color: darkColors.textPrimary,
    },
  },
})

export const optionCorrect = style({
  backgroundColor: colors.success,
  borderColor: colors.success,
  color: colors.white,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.success,
      borderColor: darkColors.success,
      color: darkColors.textPrimary,
    },
  },
})

export const optionWrong = style({
  backgroundColor: colors.error,
  borderColor: colors.error,
  color: colors.white,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.error,
      borderColor: darkColors.error,
      color: darkColors.textPrimary,
    },
  },
})

export const optionNumber = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: borderRadius.full,
  backgroundColor: colors.white,
  color: colors.textPrimary,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  flexShrink: 0,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray300,
      color: darkColors.textPrimary,
    },
  },
})

// 다크 모드에서 선택/정답/오답 상태의 번호 스타일
globalStyle('.dark .optionSelected .optionNumber', {
  backgroundColor: darkColors.primaryDark,
  color: darkColors.textPrimary,
})

globalStyle('.dark .optionCorrect .optionNumber', {
  backgroundColor: darkColors.success,
  color: darkColors.textPrimary,
})

globalStyle('.dark .optionWrong .optionNumber', {
  backgroundColor: darkColors.error,
  color: darkColors.textPrimary,
})

export const optionText = style({
  flex: 1,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.normal,
  color: colors.textPrimary,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const explanation = style({
  marginTop: spacing[6],
  padding: spacing[4],
  backgroundColor: colors.gray50,
  borderRadius: borderRadius.md,
  border: `1px solid ${colors.gray200}`,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray200,
      borderColor: darkColors.gray300,
    },
  },
})

export const explanationTitle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.textSecondary,
  marginBottom: spacing[2],
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const explanationText = style({
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  lineHeight: typography.lineHeight.relaxed,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})
