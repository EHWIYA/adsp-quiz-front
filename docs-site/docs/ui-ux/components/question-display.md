# QuestionDisplay 컴포넌트

## 개요
문제 표시 및 답안 제출을 위한 컨테이너 컴포넌트. QuizCard를 래핑하여 제출 버튼 제공.

## Props
- `quiz`: Quiz 타입 객체
- `selectedAnswer`: 선택된 답안 인덱스 (선택)
- `showAnswer`: 정답 표시 여부 (기본값: false)
- `onAnswerSelect`: 답안 선택 핸들러 (선택)

## 동작
- 답안 미선택 시 제출 버튼 비활성화
- 정답 표시 모드에서는 제출 버튼 숨김

## 사용 예시
```tsx
<QuestionDisplay
  quiz={currentQuiz}
  selectedAnswer={selected}
  showAnswer={showAnswer}
  onAnswerSelect={handleSelect}
/>
```
