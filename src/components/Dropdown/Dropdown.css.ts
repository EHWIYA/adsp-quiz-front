import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

export const dropdown = style({
  position: 'relative',
  width: '100%',
})

export const trigger = style({
  width: '100%',
  padding: `${spacing[3]} ${spacing[4]}`,
  paddingRight: spacing[4],
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.sans,
  color: colors.textPrimary,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'left',
  position: 'relative',
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

export const selectedText = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: 'inherit',
  selectors: {
    'button:disabled &': {
      color: colors.textSecondary,
    },
    '.dark button:disabled &': {
      color: darkColors.textSecondary,
    },
  },
})

export const arrow = style({
  width: '16px',
  height: '16px',
  color: colors.gray500,
  transition: 'transform 0.2s ease-in-out',
  flexShrink: 0,
  position: 'absolute',
  right: spacing[4],
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  selectors: {
    '.dark &': {
      color: darkColors.gray400,
    },
    'button:disabled &': {
      color: colors.gray400,
    },
    '.dark button:disabled &': {
      color: darkColors.gray500,
    },
  },
})

export const arrowOpen = style({
  transform: 'translateY(-50%) rotate(180deg)',
})

export const menu = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: spacing[1],
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray300}`,
  borderRadius: borderRadius.md,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  zIndex: 1000,
  maxHeight: '240px',
  overflowY: 'auto',
  overflowX: 'hidden',
  // 스크롤바 스타일링
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.sm,
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: colors.gray400,
    borderRadius: borderRadius.sm,
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.gray300,
      borderColor: darkColors.gray500,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    },
    '.dark &::-webkit-scrollbar-track': {
      backgroundColor: darkColors.gray700,
    },
    '.dark &::-webkit-scrollbar-thumb': {
      backgroundColor: darkColors.gray600,
    },
  },
})

export const option = style({
  width: '100%',
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.sans,
  color: colors.textPrimary,
  backgroundColor: 'transparent',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.15s ease-in-out',
  display: 'block',
  ':hover': {
    backgroundColor: colors.gray100,
    color: colors.primary,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
  },
  ':first-child': {
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },
  ':last-child': {
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
  },
  selectors: {
    '.dark &': {
      color: darkColors.black,
      backgroundColor: 'transparent',
    },
    '.dark &:hover': {
      backgroundColor: darkColors.gray400,
      color: darkColors.black,
    },
    '.dark &:disabled': {
      backgroundColor: 'transparent',
      color: darkColors.textSecondary,
      opacity: 0.5,
    },
  },
})

export const optionSelected = style({
  backgroundColor: colors.primaryLight,
  color: colors.primary,
  fontWeight: typography.fontWeight.semibold,
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.primaryLight,
      color: darkColors.black,
    },
    '&:hover': {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
    },
    '.dark &:hover': {
      backgroundColor: darkColors.primaryLight,
      color: darkColors.black,
    },
  },
})

export const emptyOption = style({
  padding: `${spacing[3]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  color: colors.textSecondary,
  textAlign: 'center',
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
  },
})
