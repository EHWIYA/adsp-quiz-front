import { useState, useEffect, useMemo } from 'react'
import * as styles from './Admin.css'
import {
  useCoreContent,
  useCreateCoreContent,
  useUpdateCoreContent,
  useDeleteCoreContent,
  useUpdateCoreContentByPath,
} from '../../api/coreContent'
import { SUBJECT_CATEGORIES, getMainTopics, getSubTopics } from '../../data/subjectCategories'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import type { ApiError } from '../../api/types'

export const Admin = () => {
  // 3단계 분류 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  
  // 핵심 정보 입력 상태
  const [content, setContent] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

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
  
  const { data: coreContent, isLoading: isLoadingCoreContent, isError: isCoreContentError } = useCoreContent(selectedSubTopicId)
  
  const createMutation = useCreateCoreContent()
  const updateMutation = useUpdateCoreContent()
  const updateByPathMutation = useUpdateCoreContentByPath()
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
      setContent(coreContent.core_content || '')
      setIsEditMode(true)
    } else if (selectedSubTopicId && !isLoadingCoreContent && isCoreContentError) {
      // 핵심 정보가 없는 경우 (404 에러)
      setContent('')
      setIsEditMode(false)
    }
  }, [coreContent, selectedSubTopicId, isLoadingCoreContent, isCoreContentError])

  const handleSave = () => {
    if (!selectedSubTopicId || !selectedMainTopicId || !content.trim()) {
      return
    }

    // 새로운 경로 기반 API 사용 (2026-01-20 변경)
    updateByPathMutation.mutate(
      {
        mainTopicId: selectedMainTopicId,
        subTopicId: selectedSubTopicId,
        data: {
          core_content: content.trim(),
        },
      },
      {
        onSuccess: () => {
          alert(isEditMode ? '핵심 정보가 수정되었습니다.' : '핵심 정보가 등록되었습니다.')
          if (!isEditMode) {
            setIsEditMode(true)
          }
        },
      }
    )
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


  const error = createMutation.error || updateMutation.error || updateByPathMutation.error || deleteMutation.error
  const isPending = createMutation.isPending || updateMutation.isPending || updateByPathMutation.isPending || deleteMutation.isPending

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
