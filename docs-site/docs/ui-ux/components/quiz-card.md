# QuizCard 컴포넌트

## 개요
퀴즈 문제를 표시하는 카드 컴포넌트. 선택된 답안과 정답 표시 기능 제공. 문제 수정 요청 기능 포함.

## Props
- `quiz`: Quiz 타입 객체 (문제 정보)
- `selectedAnswer`: 선택된 답안 인덱스 (선택)
- `onAnswerSelect`: 답안 선택 핸들러 (선택)
- `showCorrectionRequest`: 수정 요청 버튼 표시 여부 (기본값: false)

## 상태 표시
- **선택 전**: 기본 스타일, 답안 선택 가능
- **선택됨**: 선택된 옵션 하이라이트, 답안 선택 비활성화
- **정답 표시**:
  - 정답 옵션: 초록색 배경
  - 선택한 오답: 빨간색 배경
  - 해설 표시 (explanation 제공 시)

## 기능
- 답안 선택 및 정답 표시
- 문제 수정 요청 모달 (CorrectionRequestModal 연동)
- 카테고리 표시 (category 제공 시)

## 사용 예시
```tsx
<QuizCard
  quiz={quizData}
  selectedAnswer={selected}
  showAnswer={showAnswer}
  onAnswerSelect={handleSelect}
/>
```
