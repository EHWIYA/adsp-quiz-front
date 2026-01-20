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

export interface CreateCoreContentRequest {
  sub_topic_id: number
  content: string
  source_type: 'text' | 'youtube_url'
}

export interface UpdateCoreContentRequest {
  content: string
  source_type?: 'text' | 'youtube_url'
}

// 관리자 API 핵심 정보 등록/수정 요청 (2026-01-20 변경)
export interface UpdateCoreContentByPathRequest {
  core_content: string
}

export interface UpdateCoreContentByPathResponse {
  id: number
  name: string
  core_content: string
  updated_at: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: unknown
}
