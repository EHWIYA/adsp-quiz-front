# 페이지별 컴포넌트 구성

## Home 페이지
- Hero Section
- StatCard (3개)
- Button (2개)
- ActivityList

## Training 페이지
- Header (제목)
- Dropdown (과목/주요항목/세부항목 필터)
- QuestionDisplay
  - QuizCard
    - CorrectionRequestModal (선택)
- Footer (다음 문제 버튼)

## Exam 페이지
- Header (제목, Timer)
- ProgressBar
- QuestionDisplay
  - QuizCard
- Footer (제출 버튼)

## ExamResult 페이지
- Header (제목)
- ResultAnalysis
- 문제별 정답 확인 리스트
- Footer (다시 시험 보기, 마이페이지 이동 버튼)

## Mypage 페이지
- ProfileCard
- StatCard (4개)
- 최근 모의고사 결과 리스트
- Button (모의고사 시작하기)

## WrongAnswers 페이지
- Header (제목)
- Dropdown (과목 필터)
- 통계 정보
- 오답 목록
  - 재학습 모드 전환
  - 삭제 기능
- 페이지네이션
- 재학습 모드:
  - QuestionDisplay
  - Footer (목록으로 돌아가기, 삭제 버튼)

## Admin 페이지
- Header (제목)
- Tab
  - Dashboard 탭
  - CoreContentRegistration 탭
  - AutoClassificationReview 탭
  - AutoClassificationSettings 탭
  - QuizManagement 탭
