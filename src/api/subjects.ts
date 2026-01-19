import { useQuery } from '@tanstack/react-query'
import { apiClient } from './client'
import type { Subject, MainTopicsResponse, SubTopicsResponse } from './types'

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
