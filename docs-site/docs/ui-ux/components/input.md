# Input 컴포넌트

## 개요
폼 입력을 위한 텍스트 입력 컴포넌트. 라벨 및 에러 메시지 지원.

## Props
- `label`: 입력 필드 라벨 (선택)
- `error`: 에러 메시지 (선택)
- 표준 HTML input 속성 지원

## 상태
- 기본: 일반 스타일
- 에러: 빨간색 테두리 및 에러 메시지 표시

## 사용 예시
```tsx
<Input
  label="이메일"
  type="email"
  error={errors.email}
  value={email}
  onChange={handleChange}
/>
```
