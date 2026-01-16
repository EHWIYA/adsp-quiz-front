# QuizCard 컴포넌트

## 개요
퀴즈 문제를 표시하는 카드 컴포넌트. 선택된 답안과 정답 표시 기능 제공.

## Props
- `quiz`: Quiz 타입 객체 (문제 정보)
- `selectedAnswer`: 선택된 답안 인덱스 (선택)
- `showAnswer`: 정답 표시 여부 (기본값: false)
- `onAnswerSelect`: 답안 선택 핸들러 (선택)

## 상태 표시
- **선택 전**: 기본 스타일
- **선택됨**: 선택된 옵션 하이라이트
- **정답 표시 모드**:
  - 정답: 초록색 배경
  - 오답 선택: 빨간색 배경
  - 해설 표시 (explanation 제공 시)

## 사용 예시
```tsx
<QuizCard
  quiz={quizData}
  selectedAnswer={selected}
  showAnswer={showAnswer}
  onAnswerSelect={handleSelect}
/>
```
