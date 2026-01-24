import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  CreateWrongAnswerRequest,
  WrongAnswerResponse,
  WrongAnswersListResponse,
  WrongAnswersStatsResponse,
  DeleteWrongAnswersRequest,
  DeleteWrongAnswerResponse,
  DeleteWrongAnswersResponse,
} from './types'

// 오답 저장 Hook
export const useCreateWrongAnswer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateWrongAnswerRequest): Promise<WrongAnswerResponse> => {
      return await apiClient.post<WrongAnswerResponse>('/api/v1/wrong-answers', data)
    },
    onSuccess: () => {
      // 오답노트 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['wrong-answers'] })
      queryClient.invalidateQueries({ queryKey: ['wrong-answers-stats'] })
    },
  })
}

// 오답노트 목록 조회 Hook
export interface GetWrongAnswersParams {
  subject_id?: number
  sub_topic_id?: number
  page?: number
  limit?: number
  sort?: 'created_at' | 'saved_at'
  order?: 'asc' | 'desc'
}

export const useWrongAnswers = (params: GetWrongAnswersParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.subject_id !== undefined) {
    queryParams.append('subject_id', String(params.subject_id))
  }
  if (params.sub_topic_id !== undefined) {
    queryParams.append('sub_topic_id', String(params.sub_topic_id))
  }
  if (params.page !== undefined) {
    queryParams.append('page', String(params.page))
  }
  if (params.limit !== undefined) {
    queryParams.append('limit', String(params.limit))
  }
  if (params.sort) {
    queryParams.append('sort', params.sort)
  }
  if (params.order) {
    queryParams.append('order', params.order)
  }
  
  const queryString = queryParams.toString()
  const url = queryString ? `/api/v1/wrong-answers?${queryString}` : '/api/v1/wrong-answers'
  
  return useQuery({
    queryKey: ['wrong-answers', params],
    queryFn: async (): Promise<WrongAnswersListResponse> => {
      return await apiClient.get<WrongAnswersListResponse>(url)
    },
    staleTime: 1000 * 60 * 1, // 1분간 캐시 유지
  })
}

// 오답 삭제 Hook
export const useDeleteWrongAnswer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: number): Promise<DeleteWrongAnswerResponse> => {
      return await apiClient.delete<DeleteWrongAnswerResponse>(`/api/v1/wrong-answers/${id}`)
    },
    onSuccess: () => {
      // 오답노트 목록 및 통계 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['wrong-answers'] })
      queryClient.invalidateQueries({ queryKey: ['wrong-answers-stats'] })
    },
  })
}

// 오답 일괄 삭제 Hook
export const useDeleteWrongAnswers = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: DeleteWrongAnswersRequest): Promise<DeleteWrongAnswersResponse> => {
      return await apiClient.delete<DeleteWrongAnswersResponse>('/api/v1/wrong-answers', data)
    },
    onSuccess: () => {
      // 오답노트 목록 및 통계 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['wrong-answers'] })
      queryClient.invalidateQueries({ queryKey: ['wrong-answers-stats'] })
    },
  })
}

// 오답노트 통계 조회 Hook
export const useWrongAnswersStats = () => {
  return useQuery({
    queryKey: ['wrong-answers-stats'],
    queryFn: async (): Promise<WrongAnswersStatsResponse> => {
      return await apiClient.get<WrongAnswersStatsResponse>('/api/v1/wrong-answers/stats')
    },
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
  })
}
