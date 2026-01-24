import { style } from '@vanilla-extract/css'
import { colors, darkColors, typography } from '../../styles/theme'

export const message = style({
  margin: 0,
  color: colors.textPrimary,
  fontSize: typography.fontSize.base,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
  selectors: {
    '.dark &': {
      color: darkColors.textPrimary,
    },
  },
})
