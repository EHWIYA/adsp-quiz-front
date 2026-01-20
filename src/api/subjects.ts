import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  Subject,
  MainTopicsResponse,
  SubTopicsResponse,
  MainTopic,
  SubTopic,
  CreateMainTopicRequest,
  CreateSubTopicRequest,
} from './types'

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async (): Promise<Subject[]> => {
      return await apiClient.get<Subject[]>('/api/v1/subjects')
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
  })
}

export const useMainTopics = (subjectId: number | null) => {
  return useQuery({
    queryKey: ['main-topics', subjectId],
    queryFn: async (): Promise<MainTopicsResponse> => {
      if (!subjectId) throw new Error('Subject ID is required')
      return await apiClient.get<MainTopicsResponse>(`/api/v1/subjects/${subjectId}/main-topics`)
    },
    enabled: !!subjectId,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
  })
}

export const useSubTopics = (mainTopicId: number | null) => {
  return useQuery({
    queryKey: ['sub-topics', mainTopicId],
    queryFn: async (): Promise<SubTopicsResponse> => {
      if (!mainTopicId) throw new Error('Main Topic ID is required')
      return await apiClient.get<SubTopicsResponse>(`/api/v1/main-topics/${mainTopicId}/sub-topics`)
    },
    enabled: !!mainTopicId,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
  })
}

// 주요항목 생성 Hook (2026-01-20 추가)
export const useCreateMainTopic = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({
      subjectId,
      data,
    }: {
      subjectId: number
      data: CreateMainTopicRequest
    }): Promise<MainTopic> => {
      return await apiClient.post<MainTopic>(`/api/v1/subjects/${subjectId}/main-topics`, {
        name: data.name,
        description: data.description || null,
      })
    },
    onSuccess: (_data, variables) => {
      // 주요항목 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['main-topics', variables.subjectId] })
    },
  })
}

// 세부항목 생성 Hook (2026-01-20 추가)
export const useCreateSubTopic = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({
      mainTopicId,
      data,
    }: {
      mainTopicId: number
      data: CreateSubTopicRequest
    }): Promise<SubTopic> => {
      return await apiClient.post<SubTopic>(`/api/v1/main-topics/${mainTopicId}/sub-topics`, {
        name: data.name,
        description: data.description || null,
      })
    },
    onSuccess: (_data, variables) => {
      // 세부항목 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['sub-topics', variables.mainTopicId] })
    },
  })
}
