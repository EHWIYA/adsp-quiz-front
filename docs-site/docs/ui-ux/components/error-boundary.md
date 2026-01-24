# ErrorBoundary 컴포넌트

## 개요
React 에러 바운더리 컴포넌트. 하위 컴포넌트에서 발생한 에러를 캐치하여 에러 UI 표시.

## Props
- `children`: 자식 컴포넌트
- `fallback`: 커스텀 에러 UI 렌더 함수 (선택)
  - 파라미터: `error: Error | ApiError`

## 기능
- 하위 컴포넌트의 렌더링 에러 캐치
- 에러 발생 시 폴백 UI 표시
- 에러 정보 로깅 (콘솔)
- "다시 시도" 버튼 제공 (기본 폴백)
- 커스텀 폴백 UI 지원

## 사용 예시
```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>

// 커스텀 폴백
<ErrorBoundary fallback={(error) => <CustomErrorUI error={error} />}>
  <App />
</ErrorBoundary>
```

## 주의사항
- 비동기 에러는 캐치하지 않음
- 이벤트 핸들러 에러는 캐치하지 않음
- React 16+ 에러 바운더리 API 사용
- ApiError 타입 지원
