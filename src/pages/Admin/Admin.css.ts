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
  selectors: {
    '.dark &': {
      borderBottomColor: darkColors.gray700,
    },
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
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      fontSize: typography.fontSize['2xl'],
    },
  },
})

export const form = style({
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[6],
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
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const select = style({
  width: '100%',
  padding: `${spacing[3]} ${spacing[4]}`,
  paddingRight: spacing[12], // 화살표 공간 확보
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.sans,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  appearance: 'none', // 기본 화살표 제거
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `right ${spacing[4]} center`,
  backgroundSize: '16px 16px',
  ':hover': {
    borderColor: colors.primary,
    backgroundColor: colors.gray50,
  },
  ':focus': {
    outline: 'none',
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primary}20`,
    backgroundColor: colors.white,
  },
  ':disabled': {
    backgroundColor: colors.gray100,
    borderColor: colors.gray300,
    cursor: 'not-allowed',
    opacity: 0.6,
    color: colors.textSecondary,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray600,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%9CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    },
    '.dark &:hover': {
      borderColor: darkColors.primary,
      backgroundColor: darkColors.gray700,
    },
    '.dark &:focus': {
      borderColor: darkColors.primary,
      boxShadow: `0 0 0 3px ${darkColors.primary}20`,
      backgroundColor: darkColors.backgroundSecondary,
    },
    '.dark &:disabled': {
      backgroundColor: darkColors.gray700,
      borderColor: darkColors.gray600,
      color: darkColors.textSecondary,
    },
  },
})

export const textarea = style({
  width: '100%',
  padding: spacing[3],
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.sans,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  resize: 'vertical',
  minHeight: '200px',
  transition: 'all 0.2s ease-in-out',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primary}20`,
  },
  '::placeholder': {
    color: colors.textTertiary,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray600,
    },
    '.dark &::placeholder': {
      color: darkColors.textTertiary,
    },
    '.dark &:focus': {
      borderColor: darkColors.primary,
      boxShadow: `0 0 0 3px ${darkColors.primary}20`,
    },
  },
})

export const radioGroup = style({
  display: 'flex',
  gap: spacing[4],
  flexWrap: 'wrap',
})

export const radioLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[2],
  fontSize: typography.fontSize.base,
  color: colors.textPrimary,
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})

export const radio = style({
  width: '18px',
  height: '18px',
  cursor: 'pointer',
  accentColor: colors.primary,
  selectors: {
    '.dark &': {
      accentColor: darkColors.primary,
    },
  },
})

export const buttonGroup = style({
  display: 'flex',
  gap: spacing[3],
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
})

export const button = style({
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
  ':disabled': {
    backgroundColor: colors.gray300,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.primary,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.primaryDark,
    },
    '.dark &:disabled': {
      backgroundColor: darkColors.gray600,
    },
  },
})

export const deleteButton = style({
  padding: `${spacing[3]} ${spacing[6]}`,
  fontSize: typography.fontSize.base,
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
  ':disabled': {
    backgroundColor: colors.gray300,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.error,
    },
    '.dark &:hover': {
      backgroundColor: '#dc2626',
    },
    '.dark &:disabled': {
      backgroundColor: darkColors.gray600,
    },
  },
})

export const error = style({
  padding: spacing[4],
  backgroundColor: '#fef2f2',
  border: `1px solid ${colors.error}`,
  borderRadius: borderRadius.md,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
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
  fontSize: typography.fontSize.xs,
  color: colors.textSecondary,
  margin: 0,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})

export const errorText = style({
  fontSize: typography.fontSize.xs,
  color: colors.error,
  margin: 0,
  transition: 'color 0.3s ease',
  selectors: {
    '.dark &': {
      color: darkColors.error,
    },
  },
})

export const successMessage = style({
  padding: spacing[4],
  backgroundColor: '#f0fdf4',
  border: `1px solid ${colors.success || '#22c55e'}`,
  borderRadius: borderRadius.md,
  fontSize: typography.fontSize.sm,
  color: colors.success || '#22c55e',
  selectors: {
    '.dark &': {
      backgroundColor: '#14532d',
      borderColor: colors.success || '#22c55e',
      color: colors.success || '#22c55e',
    },
  },
})

export const contentSection = style({
  marginTop: spacing[6],
  padding: spacing[6],
  backgroundColor: colors.gray50,
  border: `1px solid ${colors.gray200}`,
  borderRadius: borderRadius.md,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderColor: darkColors.gray700,
    },
  },
})
