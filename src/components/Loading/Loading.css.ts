import { style, keyframes } from '@vanilla-extract/css'
import { spacing, borderRadius } from '../../styles/theme'

// 스피너 회전 애니메이션
const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

// 오버레이 스타일
// 라이트 모드: 살짝 어둡게 (검은색 반투명)
// 다크 모드: 살짝 밝게 (흰색 반투명)
export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(2px)',
  selectors: {
    '.dark &': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
})

export const spinnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const spinner = style({
  width: '48px',
  height: '48px',
  border: '4px solid transparent',
  borderTop: '4px solid #2563eb',
  borderRight: '4px solid #2563eb',
  borderRadius: borderRadius.full,
  animation: `${spin} 0.8s linear infinite`,
  transition: 'border-color 0.3s ease',
  selectors: {
    '.dark &': {
      borderTopColor: '#60a5fa',
      borderRightColor: '#60a5fa',
    },
  },
})
