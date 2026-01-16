import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius, shadow, breakpoints } from './styles/theme'

export const app = style({
  minHeight: '100vh',
  backgroundColor: colors.background,
  transition: 'background-color 0.3s ease',
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    backgroundColor: darkColors.background,
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
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    backgroundColor: darkColors.backgroundSecondary,
    borderBottomColor: darkColors.gray700,
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
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    color: darkColors.primary,
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      fontSize: typography.fontSize.lg,
    },
  },
})

export const menuButton = style({
  display: 'none',
  flexDirection: 'column',
  gap: '4px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: spacing[2],
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      display: 'flex',
    },
  },
})

export const menuIcon = style({
  width: '24px',
  height: '2px',
  backgroundColor: colors.textPrimary,
  borderRadius: '2px',
  transition: 'all 0.3s ease',
})

export const navRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
})

export const navLinks = style({
  display: 'flex',
  gap: spacing[4],
  alignItems: 'center',
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      flexDirection: 'column',
      backgroundColor: colors.white,
      borderTop: `1px solid ${colors.gray200}`,
      boxShadow: shadow.md,
      padding: spacing[4],
      gap: spacing[2],
      transform: 'translateY(-100%)',
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s ease',
      // @ts-expect-error - Vanilla Extract supports :global() selector
      ':global(.dark) &': {
        backgroundColor: darkColors.backgroundSecondary,
        borderTopColor: darkColors.gray700,
      },
    },
  },
})

export const navLinksOpen = style({
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      transform: 'translateY(0)',
      opacity: 1,
      visibility: 'visible',
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
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    color: darkColors.textSecondary,
    ':hover': {
      color: darkColors.primary,
      backgroundColor: darkColors.gray700,
    },
  },
  '@media': {
    [`screen and (max-width: ${breakpoints.md})`]: {
      width: '100%',
      textAlign: 'center',
      padding: spacing[3],
    },
  },
})

export const navLinkActive = style({
  color: colors.primary,
  backgroundColor: colors.primaryLight + '20',
  // @ts-expect-error - Vanilla Extract supports :global() selector
  ':global(.dark) &': {
    color: darkColors.primary,
    backgroundColor: darkColors.primary + '30',
  },
})

export const main = style({
  minHeight: 'calc(100vh - 80px)',
})
