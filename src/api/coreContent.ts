import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  CoreContent,
  CreateCoreContentRequest,
  UpdateCoreContentRequest,
} from './types'

export const useCoreContent = (subTopicId: number | null) => {
  return useQuery({
    queryKey: ['core-content', subTopicId],
    queryFn: async (): Promise<CoreContent> => {
      if (!subTopicId) throw new Error('Sub Topic ID is required')
      return await apiClient.get<CoreContent>(`/api/v1/core-content/${subTopicId}`)
    },
    enabled: !!subTopicId,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
  })
}

export const useCreateCoreContent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateCoreContentRequest): Promise<CoreContent> => {
      return await apiClient.post<CoreContent>('/api/v1/admin/core-content', {
        sub_topic_id: data.sub_topic_id,
        content: data.content,
        source_type: data.source_type,
      })
    },
    onSuccess: (data) => {
      // 생성된 핵심 정보를 캐시에 저장
      queryClient.setQueryData(['core-content', data.sub_topic_id], data)
      // 세부항목 목록 캐시 무효화 (필요시)
      queryClient.invalidateQueries({ queryKey: ['sub-topics'] })
    },
  })
}

export const useUpdateCoreContent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateCoreContentRequest }): Promise<CoreContent> => {
      const updateData: Record<string, unknown> = {
        content: data.content,
      }
      if (data.source_type) {
        updateData.source_type = data.source_type
      }
      return await apiClient.put<CoreContent>(`/api/v1/admin/core-content/${id}`, updateData)
    },
    onSuccess: (data) => {
      // 수정된 핵심 정보를 캐시에 저장
      queryClient.setQueryData(['core-content', data.sub_topic_id], data)
      // 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['core-content', data.sub_topic_id] })
    },
  })
}

export const useDeleteCoreContent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id }: { id: number; subTopicId: number }): Promise<void> => {
      await apiClient.delete(`/api/v1/admin/core-content/${id}`)
    },
    onSuccess: (_data, variables) => {
      // 삭제된 핵심 정보 캐시 제거
      queryClient.removeQueries({ queryKey: ['core-content', variables.subTopicId] })
      // 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['sub-topics'] })
    },
  })
}
