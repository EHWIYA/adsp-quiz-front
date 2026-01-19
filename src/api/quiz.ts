import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  GenerateQuizRequest,
  GenerateQuizResponse,
  Quiz,
  QuizResponse,
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
