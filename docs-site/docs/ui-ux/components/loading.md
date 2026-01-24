# Loading 컴포넌트

## 개요
전역 로딩 오버레이 컴포넌트. Portal을 사용하여 body에 렌더링.

## Props
- `isLoading`: 로딩 표시 여부

## 동작
- `isLoading`이 false일 때 렌더링하지 않음
- Portal을 사용하여 body에 직접 렌더링
- 스피너 애니메이션 표시
- 전체 화면 오버레이

## 사용 예시
```tsx
<Loading isLoading={isLoading} />
```

## 주의사항
- 전역 상태(uiStore)와 함께 사용
- 여러 컴포넌트에서 동시에 사용 가능
