import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, shadow, breakpoints } from './styles/theme'

export const app = style({
  minHeight: '100vh',
  backgroundColor: colors.background,
  transition: 'background-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.background,
    },
  },
})

export const nav = style({
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.gray200}`,
  boxShadow: shadow.sm,
  position: 'sticky',
  top: 0,
  zIndex: 100,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderBottomColor: darkColors.gray700,
    },
  },
})

export const navContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${spacing[4]} ${spacing[6]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      padding: `${spacing[3]} ${spacing[4]}`,
    },
  },
})

export const logo = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: colors.primary,
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  ':hover': {
    opacity: 0.8,
  },
  selectors: {
    '.dark &': {
      color: darkColors.primary,
    },
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      fontSize: typography.fontSize.lg,
    },
  },
})

export const mypageButton = style({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  borderRadius: borderRadius.md,
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      display: 'flex',
    },
  },
  ':hover': {
    backgroundColor: 'transparent',
  },
  ':active': {
    backgroundColor: 'transparent',
  },
  ':focus': {
    backgroundColor: 'transparent',
    outline: 'none',
  },
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
    '.dark &:hover': {
      backgroundColor: 'transparent',
    },
    '.dark &:active': {
      backgroundColor: 'transparent',
    },
    '.dark &:focus': {
      backgroundColor: 'transparent',
    },
  },
})

export const mypageButtonActive = style({
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: 'transparent',
  },
  selectors: {
    '.dark &': {
      backgroundColor: 'transparent',
    },
    '.dark &:hover': {
      backgroundColor: 'transparent',
    },
  },
})

export const mypageIcon = style({
  fontSize: '1.2em',
  width: '1.2em',
  height: '1.2em',
  color: 'inherit',
})

export const navRight = style({
  display: 'none',
  alignItems: 'center',
  gap: spacing[3],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      display: 'flex',
    },
  },
})

export const navLinks = style({
  display: 'flex',
  gap: spacing[4],
  alignItems: 'center',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      display: 'none',
    },
  },
})

export const navLink = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textSecondary,
  textDecoration: 'none',
  padding: `${spacing[2]} ${spacing[3]}`,
  borderRadius: borderRadius.md,
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    color: colors.primary,
    backgroundColor: colors.gray100,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
    '.dark &:hover': {
      color: darkColors.primary,
      backgroundColor: darkColors.gray700,
    },
  },
})

export const navLinkActive = style({
  color: colors.primary,
  backgroundColor: 'transparent',
  ':hover': {
    color: colors.primary,
    backgroundColor: 'transparent',
  },
  selectors: {
    '.dark &': {
      color: darkColors.primary,
      backgroundColor: 'transparent',
    },
    '.dark &:hover': {
      color: darkColors.primary,
      backgroundColor: 'transparent',
    },
  },
})

export const themeToggleButton = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.textSecondary,
  textDecoration: 'none',
  padding: spacing[2],
  borderRadius: borderRadius.md,
  transition: 'all 0.2s ease-in-out',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  fontFamily: 'inherit',
  ':hover': {
    color: colors.primary,
    backgroundColor: 'transparent',
  },
  ':active': {
    backgroundColor: 'transparent',
  },
  ':focus': {
    backgroundColor: 'transparent',
    outline: 'none',
  },
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
    '.dark &:hover': {
      color: darkColors.primary,
      backgroundColor: 'transparent',
    },
    '.dark &:active': {
      backgroundColor: 'transparent',
    },
    '.dark &:focus': {
      backgroundColor: 'transparent',
    },
  },
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      padding: `${spacing[2]} ${spacing[3]}`,
      width: 'auto',
      height: 'auto',
      gap: spacing[2],
    },
  },
})

export const themeToggleIcon = style({
  fontSize: '1em',
  width: '1em',
  height: '1em',
  color: 'inherit',
})

export const themeToggleText = style({
  display: 'none',
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      display: 'inline',
    },
  },
})

export const main = style({
  minHeight: 'calc(100vh - 80px)',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      paddingBottom: '80px',
    },
  },
})

export const bottomNav = style({
  display: 'none',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.white,
  borderTop: `1px solid ${colors.gray200}`,
  boxShadow: shadow.md,
  zIndex: 100,
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: `${spacing[2]} 0`,
      paddingBottom: `calc(${spacing[2]} + env(safe-area-inset-bottom))`,
    },
  },
  selectors: {
    '.dark &': {
      backgroundColor: darkColors.backgroundSecondary,
      borderTopColor: darkColors.gray700,
    },
  },
})

export const bottomNavLink = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  padding: `${spacing[1]} ${spacing[2]}`,
  textDecoration: 'none',
  color: colors.textSecondary,
  borderRadius: borderRadius.md,
  transition: 'all 0.2s ease-in-out',
  minWidth: '60px',
  flex: 1,
  maxWidth: '100px',
  ':hover': {
    color: colors.primary,
    backgroundColor: colors.gray100,
  },
  selectors: {
    '.dark &': {
      color: darkColors.textSecondary,
    },
    '.dark &:hover': {
      color: darkColors.primary,
      backgroundColor: darkColors.gray700,
    },
  },
})

export const bottomNavLinkActive = style({
  color: colors.primary,
  backgroundColor: 'transparent',
  ':hover': {
    color: colors.primary,
    backgroundColor: 'transparent',
  },
  selectors: {
    '.dark &': {
      color: darkColors.primary,
      backgroundColor: 'transparent',
    },
    '.dark &:hover': {
      color: darkColors.primary,
      backgroundColor: 'transparent',
    },
  },
})

export const bottomNavIcon = style({
  fontSize: '1.2em',
  width: '1.2em',
  height: '1.2em',
  lineHeight: 1,
  color: 'inherit',
})

export const bottomNavLabel = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  lineHeight: 1,
  wordBreak: 'keep-all',
})
