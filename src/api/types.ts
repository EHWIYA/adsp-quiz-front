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

export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: unknown
}
