// 백엔드 응답 형식 (snake_case)
export interface QuizResponse {
  id: number
  subject_id: number
  question: string
  options: Array<{
    index: number
    text: string
  }>
  correct_answer: number
  explanation: string
  source_url: string
  created_at: string
  validation_status?: 'pending' | 'valid' | 'invalid' // 2026-01-23 추가: 검증 상태
}

// 프론트엔드에서 사용하는 Quiz 타입 (camelCase)
export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer?: number
  explanation?: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface GenerateQuizRequest {
  source: 'youtube' | 'text'
  content: string
  subjectId?: string
}

// 백엔드는 Quiz 객체를 직접 반환 (중첩된 quiz 객체 없음)
export type GenerateQuizResponse = QuizResponse

export interface StartExamRequest {
  subjectId?: number
  quizCount?: number
}

export interface StartExamResponse {
  examSessionId: string
  quizzes: Quiz[]
  totalQuestions: number
  timeLimit: number
}

export interface SubmitExamRequest {
  examSessionId: string
  answers: {
    quizId: string
    selectedAnswer: number
  }[]
}

export interface ExamResult {
  examSessionId: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  score: number
  answers: {
    quizId: string
    question: string
    selectedAnswer: number
    correctAnswer: number
    isCorrect: boolean
    explanation?: string
  }[]
  completedAt: string
}

export interface Subject {
  id: number
  name: string
  description: string | null
  quiz_count: number | null
  created_at: string
}

// 과목 분류 세분화 타입 (2026-01-19 추가)
export interface MainTopic {
  id: number
  name: string
  description: string | null
  subject_id: number
}

export interface SubTopic {
  id: number
  name: string
  description: string | null
  main_topic_id: number
}

export interface MainTopicsResponse {
  main_topics: MainTopic[]
  total: number
}

export interface SubTopicsResponse {
  sub_topics: SubTopic[]
  total: number
}

// 주요항목/세부항목 생성 타입 (2026-01-20 추가)
export interface CreateMainTopicRequest {
  name: string
  description?: string | null
}

export interface CreateSubTopicRequest {
  name: string
  description?: string | null
}

// 학습 모드 문제 생성 타입 (2026-01-19 추가)
export interface GenerateStudyQuizRequest {
  sub_topic_id: number
  quiz_count?: number // 기본값: 10, 최대: 50
}

export interface GenerateStudyQuizResponse {
  quizzes: QuizResponse[]
  total_count: number
}

// 학습 모드 점진적 생성 타입 (2026-01-20 추가)
export interface GetNextStudyQuizParams {
  sub_topic_id: number
  exclude_quiz_ids?: number[] // 이미 본 문제 ID 리스트
}

export type GetNextStudyQuizResponse = QuizResponse

// 핵심 정보 관리 타입 (2026-01-19 추가)
export interface CoreContent {
  id: number
  sub_topic_id: number
  content: string
  source_type: 'text' | 'youtube_url'
  created_at: string
  updated_at: string
}

// 핵심 정보 조회 응답 타입 (2026-01-24 변경: 단일 → 배열)
// GET /api/v1/core-content/{sub_topic_id} 응답
export interface CoreContentItem {
  index: number
  core_content: string
  source_type: 'text' | 'youtube_url'
}

export interface SubTopicCoreContentResponse {
  id: number
  name: string
  core_contents: CoreContentItem[] // 2026-01-24 변경: core_content → core_contents 배열
  updated_at: string
}

export interface CreateCoreContentRequest {
  sub_topic_id: number
  content: string
  source_type: 'text' | 'youtube_url'
}

export interface UpdateCoreContentRequest {
  content: string
  source_type?: 'text' | 'youtube_url'
}

// 관리자 API 핵심 정보 등록 요청 (2026-01-23 변경: PUT → POST, 수정 → 추가)
export interface CreateCoreContentByPathRequest {
  core_content: string
  source_type: 'text' | 'youtube_url'
}

export interface CreateCoreContentByPathResponse {
  id: number
  name: string
  core_content: string
  updated_at: string
}

// 핵심 정보 자동 분류 등록 타입 (2026-01-24 추가)
export interface CreateCoreContentAutoRequest {
  core_content: string
  source_type: 'text' | 'youtube_url'
}

export interface AutoClassificationCandidate {
  sub_topic_id: number
  category_path: string
  score: number
  rank: number
}

export interface CreateCoreContentAutoResponse {
  id: number
  run_id?: string
  category_path: string | null
  confidence: number | null
  candidates: AutoClassificationCandidate[]
  updated_at: string | null
}

export interface AutoClassificationCategoryRule {
  sub_topic_id: number
  weight: number
  priority: number
  is_active: boolean
}

export interface AutoClassificationSettings {
  min_confidence: number
  strategy: 'hybrid' | 'similarity_only' | 'keyword_only'
  keyword_weight: number
  similarity_weight: number
  max_candidates: number
  text_preview_length: number
  category_rules?: AutoClassificationCategoryRule[]
}

export interface AutoClassificationPendingItem {
  run_id: string
  core_content: string
  source_type: 'text' | 'youtube_url'
  confidence: number | null
  candidates: AutoClassificationCandidate[]
  created_at?: string
}

export interface AutoClassificationPendingResponse {
  pending: AutoClassificationPendingItem[]
}

export interface AutoClassificationApproveRequest {
  sub_topic_id: number
  reason?: string
}

export interface AutoClassificationRejectRequest {
  reason?: string
}

// 문제 검증 타입 (2026-01-23 추가)
export interface ValidateQuizResponse {
  quiz_id: number
  is_valid: boolean
  category: string
  /**
   * 검증 점수 (0.0 ~ 1.0 범위의 float 값)
   * 예: 0.95 = 95점
   * 프론트엔드에서는 Math.round(validation_score * 100)으로 백분율 표시
   */
  validation_score: number
  feedback: string
  issues: string[]
}

// 문제 수정 요청 타입 (2026-01-23 추가)
export interface RequestCorrectionRequest {
  correction_request: string
  suggested_correction?: string
}

export interface RequestCorrectionResponse {
  quiz_id: number
  is_valid_request: boolean
  validation_feedback: string
  corrected_quiz?: QuizResponse
  original_quiz: QuizResponse
}

// 관리자 대시보드 타입 (2026-01-23 추가)
export interface QuizDashboardResponse {
  total_quizzes: number
  quizzes_by_category: Record<string, number>
  category_status?: Record<string, 'normal' | 'insufficient' | 'production_difficult'> // 2026-01-24 추가: 카테고리 상태
  validation_status: Record<string, number>
  recent_quizzes: QuizResponse[]
  quizzes_needing_validation: QuizResponse[]
}

// 오답노트 타입 (2026-01-24 추가)
export interface CreateWrongAnswerRequest {
  quiz_id: number
  question: string
  options: string[]
  selected_answer: number
  correct_answer: number
  explanation?: string
  subject_id?: number
  sub_topic_id?: number
  created_at?: string
}

export interface WrongAnswerResponse {
  id: number
  quiz_id: number
  question: string
  options: string[]
  selected_answer: number
  correct_answer: number
  explanation?: string
  subject_id?: number
  sub_topic_id?: number
  created_at: string
  saved_at: string
  updated_at?: string
}

export interface WrongAnswersListResponse {
  wrong_answers: WrongAnswerResponse[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface WrongAnswersStatsResponse {
  total_count: number
  by_subject: Record<string, number>
  by_sub_topic: Record<string, number>
  recent_count: number
}

export interface DeleteWrongAnswersRequest {
  ids: number[]
}

export interface DeleteWrongAnswerResponse {
  message: string
  id: number
}

export interface DeleteWrongAnswersResponse {
  message: string
  deleted_count: number
}

export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: unknown
}
