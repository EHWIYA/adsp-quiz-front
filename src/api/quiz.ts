import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  GenerateQuizRequest,
  GenerateQuizResponse,
  GenerateStudyQuizRequest,
  GenerateStudyQuizResponse,
  GetNextStudyQuizParams,
  GetNextStudyQuizResponse,
  Quiz,
  QuizResponse,
  ValidateQuizResponse,
  RequestCorrectionRequest,
  RequestCorrectionResponse,
  QuizDashboardResponse,
} from './types'

// GenerateQuizRequest를 백엔드 형식으로 변환
function transformGenerateQuizRequest(data: GenerateQuizRequest): Record<string, unknown> {
  // source를 source_type으로 변환: "youtube" → "url", "text" → "text"
  const sourceType = data.source === 'youtube' ? 'url' : 'text'
  
  // content를 source_url 또는 source_text로 변환
  const transformedData: Record<string, unknown> = {
    source_type: sourceType,
    subject_id: data.subjectId ? Number(data.subjectId) : 1, // 기본값 1 (ADsP)
  }
  
  if (data.source === 'youtube') {
    transformedData.source_url = data.content
  } else {
    transformedData.source_text = data.content
  }
  
  return transformedData
}

// 백엔드 응답(QuizResponse)을 프론트엔드 형식(Quiz)으로 변환
function transformQuizResponse(response: QuizResponse): Quiz {
  return {
    id: String(response.id),
    question: response.question,
    options: response.options.map((option) => option.text),
    correctAnswer: response.correct_answer,
    explanation: response.explanation,
  }
}

export const useGenerateQuiz = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: GenerateQuizRequest): Promise<Quiz> => {
      // 백엔드 형식으로 변환
      const transformedData = transformGenerateQuizRequest(data)
      const response = await apiClient.post<GenerateQuizResponse>('/api/v1/quiz/generate', transformedData)
      // 프론트엔드 형식으로 변환
      return transformQuizResponse(response)
    },
    onSuccess: (quiz) => {
      // 생성된 문제를 캐시에 저장
      queryClient.setQueryData(['quiz', quiz.id], quiz)
    },
  })
}

export const useQuiz = (quizId: string | null) => {
  return useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async (): Promise<Quiz> => {
      if (!quizId) throw new Error('Quiz ID is required')
      return apiClient.get<Quiz>(`/api/v1/quiz/${quizId}`)
    },
    enabled: !!quizId,
    staleTime: 1000 * 60 * 5, // 5분
  })
}

// 학습 모드 문제 생성 Hook (2026-01-19 추가)
export const useGenerateStudyQuiz = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: GenerateStudyQuizRequest): Promise<Quiz[]> => {
      const response = await apiClient.post<GenerateStudyQuizResponse>(
        '/api/v1/quiz/generate-study',
        {
          sub_topic_id: data.sub_topic_id,
          quiz_count: data.quiz_count || 10,
        }
      )
      // 백엔드 응답(QuizResponse[])을 프론트엔드 형식(Quiz[])으로 변환
      return response.quizzes.map((quizResponse) => transformQuizResponse(quizResponse))
    },
    onSuccess: (quizzes) => {
      // 생성된 문제들을 캐시에 저장
      quizzes.forEach((quiz) => {
        queryClient.setQueryData(['quiz', quiz.id], quiz)
      })
    },
  })
}

// 학습 모드 점진적 생성 Hook (2026-01-20 추가)
export const useGetNextStudyQuiz = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: GetNextStudyQuizParams): Promise<Quiz> => {
      // exclude_quiz_ids를 콤마로 구분된 문자열로 변환
      const queryParams = new URLSearchParams({
        sub_topic_id: String(params.sub_topic_id),
      })
      
      if (params.exclude_quiz_ids && params.exclude_quiz_ids.length > 0) {
        queryParams.append('exclude_quiz_ids', params.exclude_quiz_ids.join(','))
      }
      
      const response = await apiClient.get<GetNextStudyQuizResponse>(
        `/api/v1/quiz/study/next?${queryParams.toString()}`
      )
      
      // 백엔드 응답(QuizResponse)을 프론트엔드 형식(Quiz)으로 변환
      return transformQuizResponse(response)
    },
    onSuccess: (quiz) => {
      // 생성된 문제를 캐시에 저장
      queryClient.setQueryData(['quiz', quiz.id], quiz)
    },
  })
}

// 문제 검증 Hook (2026-01-23 추가)
export const useValidateQuiz = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (quizId: number): Promise<ValidateQuizResponse> => {
      return await apiClient.post<ValidateQuizResponse>(`/api/v1/quiz/${quizId}/validate`)
    },
    onSuccess: () => {
      // 대시보드 캐시 무효화 (검증 상태가 변경되었으므로)
      queryClient.invalidateQueries({ queryKey: ['quiz-dashboard'] })
    },
  })
}

// 문제 수정 요청 Hook (2026-01-23 추가)
export const useRequestCorrection = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({
      quizId,
      data,
    }: {
      quizId: number
      data: RequestCorrectionRequest
    }): Promise<RequestCorrectionResponse> => {
      return await apiClient.post<RequestCorrectionResponse>(`/api/v1/quiz/${quizId}/correction`, data)
    },
    onSuccess: (response) => {
      // 수정된 문제가 있으면 캐시 업데이트
      if (response.corrected_quiz) {
        const transformedQuiz = transformQuizResponse(response.corrected_quiz)
        queryClient.setQueryData(['quiz', transformedQuiz.id], transformedQuiz)
      }
      // 대시보드 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['quiz-dashboard'] })
    },
  })
}

// 관리자 대시보드 Hook (2026-01-23 추가)
export const useQuizDashboard = () => {
  return useQuery({
    queryKey: ['quiz-dashboard'],
    queryFn: async (): Promise<QuizDashboardResponse> => {
      return await apiClient.get<QuizDashboardResponse>('/api/v1/quiz/dashboard')
    },
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
    gcTime: 1000 * 60 * 5, // 5분간 캐시 보관
  })
}
