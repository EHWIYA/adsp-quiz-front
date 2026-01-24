# WrongAnswers 페이지

## 개요
오답노트 페이지. 틀린 문제를 모아서 재학습할 수 있는 기능 제공.

## 기능
- 오답 목록 조회 및 표시
- 과목별 필터링 (Dropdown 사용)
- 오답 재학습 모드
- 오답 삭제 기능
- 페이지네이션

## 라우팅
- 경로: `/wrong-answers`

## 주요 컴포넌트
- `QuestionDisplay`: 문제 표시 및 재학습
- `Dropdown`: 과목 필터
- `Button`: 액션 버튼

## 상태 관리
- `useWrongAnswers`: 오답 목록 조회 API
- `useDeleteWrongAnswer`: 오답 삭제 API
- 필터 및 페이지 상태 관리

## 사용 흐름
1. 오답 목록 조회
2. 과목 필터 선택 (선택사항)
3. 오답 항목 클릭하여 재학습
4. 정답 확인 후 오답노트에서 삭제 가능

## 재학습 모드
- 선택된 오답을 QuestionDisplay로 표시
- 정답 확인 후 삭제 옵션 제공
- 목록으로 돌아가기 기능
