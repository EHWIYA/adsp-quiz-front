import { getApiUrl } from './config'
import type { ApiError } from './types'

interface RequestOptions extends RequestInit {
  timeout?: number
}

// camelCase를 snake_case로 변환하는 유틸리티 함수
function toSnakeCase(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase)
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      const value = (obj as Record<string, unknown>)[key]
      return {
        ...acc,
        [snakeKey]: toSnakeCase(value),
      }
    }, {} as Record<string, unknown>)
  }

  return obj
}

class ApiClient {
  private async request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout = 30000, ...fetchOptions } = options
    const url = getApiUrl(path)

    console.log('[API Request URL]', url)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData: unknown
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json().catch(() => ({
            message: response.statusText,
          }))
        } else {
          const text = await response.text().catch(() => response.statusText)
          errorData = { message: text || response.statusText }
        }
        console.error('[API Error]', path, 'Status:', response.status, 'URL:', url, 'Error:', JSON.stringify(errorData, null, 2))
        throw this.createError(errorData, response.status)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw this.createError({ message: '요청 시간이 초과되었습니다.' }, 408)
        }
        throw this.createError({ message: error.message }, 0)
      }
      throw error
    }
  }

  private createError(data: unknown, status: number): ApiError {
    const error = data as { 
      message?: string
      detail?: string | Array<{ type?: string; loc?: unknown[]; msg?: string; input?: unknown }>
      code?: string
      details?: unknown
    }
    
    // 백엔드가 detail 필드로 에러 메시지를 반환하는 경우 처리
    let errorMessage = error.message
    if (!errorMessage && error.detail) {
      if (typeof error.detail === 'string') {
        errorMessage = error.detail
      } else if (Array.isArray(error.detail) && error.detail.length > 0) {
        // Pydantic validation error 형식 처리
        errorMessage = error.detail.map((item) => item.msg || JSON.stringify(item)).join(', ')
      }
    }
    
    return {
      message: errorMessage || '알 수 없는 오류가 발생했습니다.',
      code: error.code || `HTTP_${status}`,
      status,
      details: error.details || error.detail,
    }
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' })
  }

  async post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const transformedData = data ? toSnakeCase(data) : undefined
    if (transformedData) {
      console.log('[API Request]', path, 'Body:', JSON.stringify(transformedData, null, 2))
    }
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: transformedData ? JSON.stringify(transformedData) : undefined,
    })
  }

  async put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(toSnakeCase(data)) : undefined,
    })
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
