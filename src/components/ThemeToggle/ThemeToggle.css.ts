import { style } from '@vanilla-extract/css'
import { colors, darkColors, spacing, borderRadius } from '../../styles/theme'

export const toggleButton = style({
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  padding: spacing[2],
  borderRadius: borderRadius.md,
  transition: 'background-color 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  ':hover': {
    backgroundColor: colors.gray100,
  },
  // @ts-expect-error - Vanilla Extract supports :global() selector

  ':global(.dark) &': {
    ':hover': {
      backgroundColor: darkColors.gray700,
    },
  },
})
