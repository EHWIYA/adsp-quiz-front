import { useState, useEffect } from 'react'
import * as styles from './Admin.css'
import { useSubjects, useMainTopics, useSubTopics } from '../../api/subjects'
import {
  useCoreContent,
  useCreateCoreContent,
  useUpdateCoreContent,
  useDeleteCoreContent,
} from '../../api/coreContent'
import type { ApiError } from '../../api/types'

export const Admin = () => {
  // 3단계 분류 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  
  // 핵심 정보 입력 상태
  const [content, setContent] = useState('')
  const [sourceType, setSourceType] = useState<'text' | 'youtube_url'>('text')
  const [isEditMode, setIsEditMode] = useState(false)

  const { data: subjects, isLoading: isLoadingSubjects, isError: isSubjectsError } = useSubjects()
  const { data: mainTopicsData, isLoading: isLoadingMainTopics } = useMainTopics(selectedSubjectId)
  const { data: subTopicsData, isLoading: isLoadingSubTopics } = useSubTopics(selectedMainTopicId)
  const { data: coreContent, isLoading: isLoadingCoreContent, isError: isCoreContentError } = useCoreContent(selectedSubTopicId)
  
  const createMutation = useCreateCoreContent()
  const updateMutation = useUpdateCoreContent()
  const deleteMutation = useDeleteCoreContent()

  // 과목 선택 시 주요항목 초기화
  useEffect(() => {
    if (selectedSubjectId) {
      setSelectedMainTopicId(null)
      setSelectedSubTopicId(null)
      setContent('')
      setIsEditMode(false)
    }
  }, [selectedSubjectId])

  // 주요항목 선택 시 세부항목 초기화
  useEffect(() => {
    if (selectedMainTopicId) {
      setSelectedSubTopicId(null)
      setContent('')
      setIsEditMode(false)
    }
  }, [selectedMainTopicId])

  // 세부항목 선택 시 핵심 정보 로드
  useEffect(() => {
    if (coreContent && selectedSubTopicId) {
      setContent(coreContent.content)
      setSourceType(coreContent.source_type)
      setIsEditMode(true)
    } else if (selectedSubTopicId && !isLoadingCoreContent && isCoreContentError) {
      // 핵심 정보가 없는 경우 (404 에러)
      setContent('')
      setSourceType('text')
      setIsEditMode(false)
    }
  }, [coreContent, selectedSubTopicId, isLoadingCoreContent, isCoreContentError])

  const handleSave = () => {
    if (!selectedSubTopicId || !content.trim()) {
      return
    }

    if (isEditMode && coreContent) {
      // 수정
      updateMutation.mutate(
        {
          id: coreContent.id,
          data: {
            content: content.trim(),
            source_type: sourceType,
          },
        },
        {
          onSuccess: () => {
            alert('핵심 정보가 수정되었습니다.')
          },
        }
      )
    } else {
      // 등록
      createMutation.mutate(
        {
          sub_topic_id: selectedSubTopicId,
          content: content.trim(),
          source_type: sourceType,
        },
        {
          onSuccess: () => {
            alert('핵심 정보가 등록되었습니다.')
            setIsEditMode(true)
          },
        }
      )
    }
  }

  const handleDelete = () => {
    if (!coreContent || !selectedSubTopicId) {
      return
    }

    if (confirm('정말로 이 핵심 정보를 삭제하시겠습니까?')) {
      deleteMutation.mutate(
        {
          id: coreContent.id,
          subTopicId: selectedSubTopicId,
        },
        {
          onSuccess: () => {
            alert('핵심 정보가 삭제되었습니다.')
            setContent('')
            setIsEditMode(false)
          },
        }
      )
    }
  }

  const error = createMutation.error || updateMutation.error || deleteMutation.error
  const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>관리 페이지</h1>
      </div>

      <div className={styles.form}>
        {/* 과목 선택 */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subjectId">
            과목 선택
          </label>
          <select
            id="subjectId"
            className={styles.select}
            value={selectedSubjectId || ''}
            onChange={(e) => setSelectedSubjectId(e.target.value ? Number(e.target.value) : null)}
            disabled={isLoadingSubjects || isSubjectsError}
          >
            <option value="">과목을 선택하세요</option>
            {subjects?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {isLoadingSubjects && (
            <p className={styles.helperText}>과목 목록을 불러오는 중...</p>
          )}
          {isSubjectsError && (
            <p className={styles.errorText}>과목 목록을 불러올 수 없습니다.</p>
          )}
        </div>

        {/* 주요항목 선택 */}
        {selectedSubjectId && (
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="mainTopicId">
              주요항목 선택
            </label>
            <select
              id="mainTopicId"
              className={styles.select}
              value={selectedMainTopicId || ''}
              onChange={(e) => setSelectedMainTopicId(e.target.value ? Number(e.target.value) : null)}
              disabled={isLoadingMainTopics || !mainTopicsData}
            >
              <option value="">주요항목을 선택하세요</option>
              {mainTopicsData?.main_topics.map((mainTopic) => (
                <option key={mainTopic.id} value={mainTopic.id}>
                  {mainTopic.name}
                </option>
              ))}
            </select>
            {isLoadingMainTopics && (
              <p className={styles.helperText}>주요항목 목록을 불러오는 중...</p>
            )}
            {mainTopicsData && mainTopicsData.main_topics.length === 0 && (
              <p className={styles.helperText}>주요항목이 없습니다. 백엔드에 데이터를 입력해주세요.</p>
            )}
          </div>
        )}

        {/* 세부항목 선택 */}
        {selectedMainTopicId && (
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="subTopicId">
              세부항목 선택
            </label>
            <select
              id="subTopicId"
              className={styles.select}
              value={selectedSubTopicId || ''}
              onChange={(e) => setSelectedSubTopicId(e.target.value ? Number(e.target.value) : null)}
              disabled={isLoadingSubTopics || !subTopicsData}
            >
              <option value="">세부항목을 선택하세요</option>
              {subTopicsData?.sub_topics.map((subTopic) => (
                <option key={subTopic.id} value={subTopic.id}>
                  {subTopic.name}
                </option>
              ))}
            </select>
            {isLoadingSubTopics && (
              <p className={styles.helperText}>세부항목 목록을 불러오는 중...</p>
            )}
            {subTopicsData && subTopicsData.sub_topics.length === 0 && (
              <p className={styles.helperText}>세부항목이 없습니다. 백엔드에 데이터를 입력해주세요.</p>
            )}
          </div>
        )}

        {/* 핵심 정보 입력 */}
        {selectedSubTopicId && (
          <div className={styles.contentSection}>
            <div className={styles.formGroup}>
              <label className={styles.label}>핵심 정보</label>
              <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="핵심 정보를 입력하세요..."
                disabled={isLoadingCoreContent}
              />
              {isLoadingCoreContent && (
                <p className={styles.helperText}>핵심 정보를 불러오는 중...</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>정보 유형</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="text"
                    checked={sourceType === 'text'}
                    onChange={(e) => setSourceType(e.target.value as 'text')}
                    className={styles.radio}
                  />
                  <span>텍스트</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="youtube_url"
                    checked={sourceType === 'youtube_url'}
                    onChange={(e) => setSourceType(e.target.value as 'youtube_url')}
                    className={styles.radio}
                  />
                  <span>YouTube URL</span>
                </label>
              </div>
            </div>

            {error && (
              <div className={styles.error}>
                <p className={styles.errorMessage}>
                  {(error as ApiError)?.message || '오류가 발생했습니다.'}
                </p>
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={handleSave}
                disabled={isPending || !content.trim()}
              >
                {isPending ? '처리 중...' : isEditMode ? '수정' : '등록'}
              </button>
              {isEditMode && coreContent && (
                <button
                  className={styles.deleteButton}
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
