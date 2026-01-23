import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Admin.css'
import {
  useCoreContent,
  useCreateCoreContentByPath,
} from '../../api/coreContent'
import { SUBJECT_CATEGORIES, getMainTopics, getSubTopics, getSubTopicById } from '../../data/subjectCategories'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import type { ApiError } from '../../api/types'

export const CoreContentRegistration = () => {
  const navigate = useNavigate()
  
  // 3단계 분류 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  
  // 핵심 정보 입력 상태
  const [content, setContent] = useState('')
  const [sourceType, setSourceType] = useState<'text' | 'youtube_url'>('text')

  // 하드코딩된 분류 데이터 사용 (2026-01-20 변경)
  const subjects = useMemo(() => SUBJECT_CATEGORIES.map((s) => ({ id: s.id, name: s.name })), [])
  const mainTopicsData = useMemo(
    () => (selectedSubjectId ? getMainTopics(selectedSubjectId) : null),
    [selectedSubjectId]
  )
  const subTopicsData = useMemo(
    () => (selectedSubjectId && selectedMainTopicId ? getSubTopics(selectedSubjectId, selectedMainTopicId) : null),
    [selectedSubjectId, selectedMainTopicId]
  )
  
  const { 
    data: coreContent, 
    isLoading: isLoadingCoreContent, 
    isError: isCoreContentError,
    error: coreContentError 
  } = useCoreContent(selectedSubTopicId)
  
  const createByPathMutation = useCreateCoreContentByPath()

  // YouTube URL 감지 함수
  const detectSourceType = (text: string): 'text' | 'youtube_url' => {
    if (!text.trim()) return 'text'
    // YouTube URL 패턴 감지
    const youtubePattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    return youtubePattern.test(text.trim()) ? 'youtube_url' : 'text'
  }

  // 과목 선택 시 주요항목 초기화
  useEffect(() => {
    if (selectedSubjectId) {
      setSelectedMainTopicId(null)
      setSelectedSubTopicId(null)
      setContent('')
      setSourceType('text')
    }
  }, [selectedSubjectId])

  // 주요항목 선택 시 세부항목 초기화
  useEffect(() => {
    if (selectedMainTopicId) {
      setSelectedSubTopicId(null)
      setContent('')
      setSourceType('text')
    }
  }, [selectedMainTopicId])

  // 세부항목 선택 시 핵심 정보 로드
  useEffect(() => {
    if (coreContent && selectedSubTopicId) {
      // core_content가 null이어도 200 OK로 응답되므로, null인 경우 빈 문자열로 처리
      const contentValue = coreContent.core_content || ''
      setContent(contentValue)
      
      // 백엔드에서 제공하는 source_type 우선 사용, 없으면 자동 감지
      if (coreContent.source_type) {
        setSourceType(coreContent.source_type)
      } else if (contentValue.trim()) {
        setSourceType(detectSourceType(contentValue))
      } else {
        // core_content가 null이거나 빈 문자열인 경우 기본값 설정
        setSourceType('text')
      }
      
      // 이미 등록된 데이터가 있으면 입력 필드 비활성화 (수정/삭제 불가)
    } else if (selectedSubTopicId && !isLoadingCoreContent && isCoreContentError) {
      const apiError = coreContentError as ApiError
      // 404 에러: 핵심 정보가 없는 경우
      if (apiError?.status === 404) {
        setContent('')
        setSourceType('text')
      }
      // 500 에러는 별도로 표시 (아래 에러 표시 영역에서 처리)
    }
  }, [coreContent, selectedSubTopicId, isLoadingCoreContent, isCoreContentError, coreContentError])

  // content 변경 시 source_type 자동 감지
  useEffect(() => {
    if (content.trim()) {
      const detectedType = detectSourceType(content)
      setSourceType(detectedType)
    }
  }, [content])

  const handleSave = () => {
    // 필수 필드 검증
    if (!selectedSubjectId || !selectedMainTopicId || !selectedSubTopicId || !content.trim()) {
      alert('모든 항목을 선택하고 핵심 정보를 입력해주세요.')
      return
    }

    // 3단계 카테고리 검증: 선택된 세부항목이 선택된 과목과 주요항목에 속하는지 확인
    const isValidSubTopic = getSubTopicById(selectedSubjectId, selectedMainTopicId, selectedSubTopicId)
    if (!isValidSubTopic) {
      alert('선택한 과목, 주요항목, 세부항목이 일치하지 않습니다. 다시 선택해주세요.')
      return
    }

    // 최종 source_type 결정 (사용자 선택 또는 자동 감지)
    const finalSourceType = detectSourceType(content)

    // 새로운 경로 기반 API 사용 (2026-01-23 변경: PUT → POST)
    createByPathMutation.mutate(
      {
        mainTopicId: selectedMainTopicId,
        subTopicId: selectedSubTopicId,
        data: {
          core_content: content.trim(),
          source_type: finalSourceType,
        },
      },
      {
        onSuccess: () => {
          alert('핵심 정보가 등록되었습니다.')
          // 저장 성공 후 홈으로 이동
          navigate('/')
        },
        onError: (error) => {
          const apiError = error as ApiError
          
          // code 필드 기반 에러 처리 (백엔드 변경사항 반영)
          if (apiError.code === 'ALREADY_EXISTS') {
            alert('이미 등록된 핵심 정보입니다. 수정 및 삭제가 불가능합니다.')
            return
          }
          
          if (apiError.code === 'INVALID_CATEGORY') {
            alert('선택한 과목, 주요항목, 세부항목이 일치하지 않습니다. 다시 선택해주세요.')
            return
          }
          
          // status 기반 에러 처리 (fallback)
          if (apiError.status === 409) {
            alert('이미 등록된 핵심 정보입니다. 수정 및 삭제가 불가능합니다.')
          } else if (apiError.status === 400) {
            alert(apiError.message || apiError.code || '잘못된 요청입니다.')
          } else if (apiError.status === 500) {
            alert('서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.')
          } else {
            alert(apiError.message || apiError.code || '오류가 발생했습니다.')
          }
        },
      }
    )
  }

  const error = createByPathMutation.error
  const isPending = createByPathMutation.isPending

  return (
    <div className={styles.form}>
      {/* 과목 선택 */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="subjectId">
          과목 선택
        </label>
        <Dropdown
          id="subjectId"
          value={selectedSubjectId}
          options={subjects.map((subject) => ({
            value: subject.id,
            label: subject.name,
          }))}
          placeholder="과목을 선택하세요"
          onChange={(value) => setSelectedSubjectId(value ? Number(value) : null)}
        />
      </div>

      {/* 주요항목 선택 */}
      {selectedSubjectId && (
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="mainTopicId">
            주요항목 선택
          </label>
          <Dropdown
            id="mainTopicId"
            value={selectedMainTopicId}
            options={
              mainTopicsData?.main_topics.map((mainTopic) => ({
                value: mainTopic.id,
                label: mainTopic.name,
              })) || []
            }
            placeholder="주요항목을 선택하세요"
            disabled={!mainTopicsData}
            onChange={(value) => setSelectedMainTopicId(value ? Number(value) : null)}
          />
        </div>
      )}

      {/* 세부항목 선택 */}
      {selectedMainTopicId && (
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subTopicId">
            세부항목 선택
          </label>
          <Dropdown
            id="subTopicId"
            value={selectedSubTopicId}
            options={
              subTopicsData?.sub_topics.map((subTopic) => ({
                value: subTopic.id,
                label: subTopic.name,
              })) || []
            }
            placeholder="세부항목을 선택하세요"
            disabled={!subTopicsData}
            onChange={(value) => setSelectedSubTopicId(value ? Number(value) : null)}
          />
        </div>
      )}

      {/* 핵심 정보 입력 */}
      {selectedSubTopicId && (
        <div className={styles.contentSection}>
          <div className={styles.formGroup}>
            <label className={styles.label}>정보 유형</label>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="sourceType"
                  value="text"
                  checked={sourceType === 'text'}
                  onChange={() => setSourceType('text')}
                  disabled={isLoadingCoreContent || !!coreContent?.core_content}
                />
                <span>텍스트</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="sourceType"
                  value="youtube_url"
                  checked={sourceType === 'youtube_url'}
                  onChange={() => setSourceType('youtube_url')}
                  disabled={isLoadingCoreContent || !!coreContent?.core_content}
                />
                <span>YouTube URL</span>
              </label>
            </div>
            {sourceType === 'youtube_url' && (
              <p className={styles.helperText} style={{ marginBottom: '8px', fontSize: '0.9em', color: '#666' }}>
                YouTube URL을 입력하세요. (예: https://www.youtube.com/watch?v=...)
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>핵심 정보</label>
            {coreContent?.core_content && (
              <p className={styles.helperText} style={{ marginBottom: '8px', fontSize: '0.9em', color: '#ff9800' }}>
                ⚠️ 이미 등록된 핵심 정보입니다. 수정 및 삭제가 불가능합니다.
              </p>
            )}
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={sourceType === 'youtube_url' ? 'YouTube URL을 입력하세요...' : '핵심 정보를 입력하세요...'}
              disabled={isLoadingCoreContent || !!coreContent?.core_content}
            />
            {isLoadingCoreContent && (
              <p className={styles.helperText}>핵심 정보를 불러오는 중...</p>
            )}
            {content.trim() && sourceType === 'text' && detectSourceType(content) === 'youtube_url' && (
              <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em', color: '#ff9800' }}>
                ⚠️ YouTube URL이 감지되었습니다. 정보 유형을 "YouTube URL"로 변경하시겠습니까?
              </p>
            )}
          </div>

          {/* 조회 API 에러 (500 에러 등) */}
          {isCoreContentError && coreContentError && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(coreContentError as ApiError)?.status === 500
                  ? '핵심 정보를 불러오는 중 서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.'
                  : (coreContentError as ApiError)?.status === 404
                  ? '핵심 정보를 찾을 수 없습니다.'
                  : '핵심 정보를 불러오는 중 오류가 발생했습니다.'}
              </p>
              {(coreContentError as ApiError)?.code && (
                <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                  에러 코드: {(coreContentError as ApiError).code}
                </p>
              )}
              <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                {(coreContentError as ApiError)?.message || 'Database error occurred'}
              </p>
              {(coreContentError as ApiError)?.status === 500 && (
                <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '0.85em' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>💡 확인 사항:</p>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    <li>백엔드 서버가 정상적으로 배포되었는지 확인</li>
                    <li>데이터베이스 마이그레이션이 실행되었는지 확인</li>
                    <li>초기 데이터(주요항목 8개, 세부항목 28개)가 DB에 존재하는지 확인</li>
                    <li>백엔드 로그에서 상세 에러 메시지 확인</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 등록/수정/삭제 API 에러 */}
          {error && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(error as ApiError)?.code === 'ALREADY_EXISTS'
                  ? '이미 등록된 핵심 정보입니다. 수정 및 삭제가 불가능합니다.'
                  : (error as ApiError)?.code === 'INVALID_CATEGORY'
                  ? '선택한 과목, 주요항목, 세부항목이 일치하지 않습니다.'
                  : (error as ApiError)?.status === 500
                  ? '서버 오류가 발생했습니다. 데이터베이스 연결을 확인해주세요.'
                  : (error as ApiError)?.message || '오류가 발생했습니다.'}
              </p>
              {(error as ApiError)?.code && (
                <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                  에러 코드: {(error as ApiError).code}
                </p>
              )}
              {(error as ApiError)?.details != null && (
                <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                  상세: {JSON.stringify((error as ApiError).details)}
                </p>
              )}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={handleSave}
              disabled={isPending || !content.trim() || !!coreContent?.core_content}
            >
              {isPending ? '처리 중...' : coreContent?.core_content ? '이미 등록됨' : '등록'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
