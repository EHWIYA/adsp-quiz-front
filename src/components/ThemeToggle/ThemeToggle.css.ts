import { style } from '@vanilla-extract/css'
import { colors, darkColors, spacing, borderRadius } from '../../styles/theme'

export const toggleButton = style({
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  padding: spacing[2],
  borderRadius: borderRadius.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
})
