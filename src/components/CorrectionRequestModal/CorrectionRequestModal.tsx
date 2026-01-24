import { useState } from 'react'
import { Modal } from '../Modal/Modal'
import { useRequestCorrection } from '../../api/quiz'
import { useUIStore } from '../../store/uiStore'
import * as styles from './CorrectionRequestModal.css'
import type { ApiError } from '../../api/types'

interface CorrectionRequestModalProps {
  isOpen: boolean
  onClose: () => void
  quizId: number
  quizQuestion: string
}

export const CorrectionRequestModal = ({
  isOpen,
  onClose,
  quizId,
  quizQuestion,
}: CorrectionRequestModalProps) => {
  const [correctionRequest, setCorrectionRequest] = useState('')
  const [suggestedCorrection, setSuggestedCorrection] = useState('')
  const requestCorrectionMutation = useRequestCorrection()
  const { setLoading } = useUIStore()

  const handleSubmit = () => {
    if (!correctionRequest.trim()) {
      alert('수정 요청 사유를 입력해주세요.')
      return
    }

    setLoading(true)
    requestCorrectionMutation.mutate(
      {
        quizId,
        data: {
          correction_request: correctionRequest.trim(),
          suggested_correction: suggestedCorrection.trim() || undefined,
        },
      },
      {
        onSuccess: (response) => {
          if (response.is_valid_request) {
            alert('수정 요청이 성공적으로 제출되었습니다.')
            if (response.corrected_quiz) {
              alert('수정된 문제가 생성되었습니다.')
            }
            handleClose()
          } else {
            alert(`수정 요청이 유효하지 않습니다: ${response.validation_feedback}`)
          }
          setLoading(false)
        },
        onError: (error) => {
          const apiError = error as ApiError
          alert(apiError.message || '수정 요청 제출 중 오류가 발생했습니다.')
          setLoading(false)
        },
      }
    )
  }

  const handleClose = () => {
    setCorrectionRequest('')
    setSuggestedCorrection('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="문제 수정 요청"
      footer={
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={handleClose}>
            취소
          </button>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={!correctionRequest.trim() || requestCorrectionMutation.isPending}
          >
            {requestCorrectionMutation.isPending ? '제출 중...' : '제출'}
          </button>
        </div>
      }
    >
      <div className={styles.content}>
        <div className={styles.questionSection}>
          <label className={styles.label}>문제</label>
          <div className={styles.questionText}>{quizQuestion}</div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="correctionRequest">
            수정 요청 사유 <span className={styles.required}>*</span>
          </label>
          <textarea
            id="correctionRequest"
            className={styles.textarea}
            value={correctionRequest}
            onChange={(e) => setCorrectionRequest(e.target.value)}
            placeholder="문제의 어떤 부분을 수정하고 싶은지 설명해주세요..."
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="suggestedCorrection">
            제안 수정 내용 (선택)
          </label>
          <textarea
            id="suggestedCorrection"
            className={styles.textarea}
            value={suggestedCorrection}
            onChange={(e) => setSuggestedCorrection(e.target.value)}
            placeholder="수정된 문제 내용을 제안해주세요 (선택사항)..."
            rows={4}
          />
        </div>

        {requestCorrectionMutation.error && (
          <div className={styles.error}>
            <p className={styles.errorMessage}>
              {(requestCorrectionMutation.error as ApiError)?.message ||
                '오류가 발생했습니다.'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
