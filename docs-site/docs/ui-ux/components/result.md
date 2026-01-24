# ResultAnalysis 컴포넌트

## 개요
시험 결과를 통계와 함께 표시하는 컴포넌트.

## Props
- `totalQuestions`: 전체 문제 수
- `correctAnswers`: 정답 수
- `wrongAnswers`: 오답 수
- `unanswered`: 미답 수 (선택, 기본값: 0)
- `timeSpent`: 소요 시간 초 단위 (선택)

## 표시 정보
- 점수 (백분율)
- 정답/오답/미답 문항 수
- 정답률
- 소요 시간 (제공 시)
- 진행률 바

## 사용 예시
```tsx
<ResultAnalysis
  totalQuestions={50}
  correctAnswers={35}
  wrongAnswers={10}
  unanswered={5}
  timeSpent={3600}
/>
```
