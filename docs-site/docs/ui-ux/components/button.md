# Button 컴포넌트

## 개요
재사용 가능한 버튼 컴포넌트. 다양한 variant와 size 옵션 제공.

## Props
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (기본값: 'primary')
- `size`: 'sm' | 'md' | 'lg' (기본값: 'md')
- `children`: 버튼 텍스트
- 표준 HTML button 속성 지원

## 사용 예시
```tsx
<Button variant="primary" size="lg">학습 모드 시작</Button>
<Button variant="outline" size="md">취소</Button>
```

## 스타일 특징
- 다크모드 지원
- 반응형 디자인
- 호버/포커스 상태 스타일링
- 접근성 고려 (키보드 네비게이션)
