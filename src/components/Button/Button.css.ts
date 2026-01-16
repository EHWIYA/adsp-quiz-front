import { style, styleVariants } from '@vanilla-extract/css'
import { colors, darkColors, typography, spacing, borderRadius } from '../../styles/theme'

const baseButton = style({
  fontFamily: typography.fontFamily.sans,
  fontWeight: typography.fontWeight.medium,
  borderRadius: borderRadius.md,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

export const button = styleVariants({
  primary: [
    baseButton,
    {
      backgroundColor: colors.primary,
      color: colors.white,
      transition: 'all 0.2s ease-in-out',
      ':hover': {
        backgroundColor: colors.primaryDark,
      },
      ':active': {
        backgroundColor: colors.primaryDark,
        transform: 'scale(0.98)',
      },
      // @ts-ignore - Vanilla Extract supports :global() selector
      ':global(.dark) &': {
        backgroundColor: darkColors.primary,
        ':hover': {
          backgroundColor: darkColors.primaryDark,
        },
        ':active': {
          backgroundColor: darkColors.primaryDark,
        },
      },
    },
  ],
  secondary: [
    baseButton,
    {
      backgroundColor: colors.secondary,
      color: colors.white,
      transition: 'all 0.2s ease-in-out',
      ':hover': {
        backgroundColor: colors.secondaryDark,
      },
      ':active': {
        backgroundColor: colors.secondaryDark,
        transform: 'scale(0.98)',
      },
      // @ts-ignore - Vanilla Extract supports :global() selector
      ':global(.dark) &': {
        backgroundColor: darkColors.secondary,
        ':hover': {
          backgroundColor: darkColors.secondaryDark,
        },
        ':active': {
          backgroundColor: darkColors.secondaryDark,
        },
      },
    },
  ],
  outline: [
    baseButton,
    {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      transition: 'all 0.2s ease-in-out',
      ':hover': {
        backgroundColor: colors.primary,
        color: colors.white,
      },
      ':active': {
        transform: 'scale(0.98)',
      },
      // @ts-ignore - Vanilla Extract supports :global() selector
      ':global(.dark) &': {
        color: darkColors.primary,
        borderColor: darkColors.primary,
        ':hover': {
          backgroundColor: darkColors.primary,
          color: darkColors.white,
        },
      },
    },
  ],
  ghost: [
    baseButton,
    {
      backgroundColor: 'transparent',
      color: colors.textPrimary,
      transition: 'all 0.2s ease-in-out',
      ':hover': {
        backgroundColor: colors.gray100,
      },
      ':active': {
        backgroundColor: colors.gray200,
      },
      // @ts-ignore - Vanilla Extract supports :global() selector
      ':global(.dark) &': {
        color: darkColors.textPrimary,
        ':hover': {
          backgroundColor: darkColors.gray700,
        },
        ':active': {
          backgroundColor: darkColors.gray600,
        },
      },
    },
  ],
})

const buttonSize = styleVariants({
  sm: {
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
  },
  md: {
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  lg: {
    padding: `${spacing[4]} ${spacing[6]}`,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.normal,
  },
})

export const buttonVariants = styleVariants({
  'primary-sm': [button.primary, buttonSize.sm],
  'primary-md': [button.primary, buttonSize.md],
  'primary-lg': [button.primary, buttonSize.lg],
  'secondary-sm': [button.secondary, buttonSize.sm],
  'secondary-md': [button.secondary, buttonSize.md],
  'secondary-lg': [button.secondary, buttonSize.lg],
  'outline-sm': [button.outline, buttonSize.sm],
  'outline-md': [button.outline, buttonSize.md],
  'outline-lg': [button.outline, buttonSize.lg],
  'ghost-sm': [button.ghost, buttonSize.sm],
  'ghost-md': [button.ghost, buttonSize.md],
  'ghost-lg': [button.ghost, buttonSize.lg],
})
