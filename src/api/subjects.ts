import { useQuery } from '@tanstack/react-query'
import { apiClient } from './client'
import type { Subject } from './types'

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async (): Promise<Subject[]> => {
      // 새 엔드포인트가 아직 배포되지 않은 경우를 대비하여 기존 엔드포인트 사용
      // TODO: 백엔드 배포 후 /api/v1/subjects로 변경
      try {
        return await apiClient.get<Subject[]>('/api/v1/subjects')
      } catch (error) {
        // 404 에러인 경우 기존 엔드포인트 시도
        const errorCode = (error as { code?: string })?.code
        if (errorCode === 'HTTP_404') {
          console.warn('[API] /api/v1/subjects not found, trying /api/v1/quiz/subjects')
          try {
            return await apiClient.get<Subject[]>('/api/v1/quiz/subjects')
          } catch (fallbackError) {
            console.error('[API] Both endpoints failed:', fallbackError)
            throw fallbackError
          }
        }
        throw error
      }
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
  })
}
