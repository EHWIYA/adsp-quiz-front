# CorrectionRequestModal 컴포넌트

## 개요
문제 수정 요청을 제출하는 모달 컴포넌트. 문제의 오류나 개선사항을 제안.

## Props
- `isOpen`: 모달 열림 여부
- `onClose`: 모달 닫기 핸들러
- `quizId`: 문제 ID
- `quizQuestion`: 문제 텍스트

## 기능
- 수정 요청 사유 입력 (필수)
- 제안 수정 내용 입력 (선택)
- API를 통한 수정 요청 제출
- 유효성 검증 피드백 표시

## 사용 예시
```tsx
<CorrectionRequestModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  quizId={quiz.id}
  quizQuestion={quiz.question}
/>
```

## 동작
- 수정 요청 사유 미입력 시 제출 불가
- 제출 중 로딩 상태 표시
- 성공/실패 알림 표시
- 수정된 문제 생성 시 알림
