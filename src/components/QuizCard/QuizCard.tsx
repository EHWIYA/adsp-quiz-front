import { useState } from 'react'
import { Quiz } from './QuizCard.types'
import * as styles from './QuizCard.css'
import { CorrectionRequestModal } from '../CorrectionRequestModal/CorrectionRequestModal'

interface QuizCardProps {
  quiz: Quiz
  selectedAnswer?: number
  onAnswerSelect?: (answerIndex: number) => void
  showCorrectionRequest?: boolean
}

export const QuizCard = ({ quiz, selectedAnswer, onAnswerSelect, showCorrectionRequest = false }: QuizCardProps) => {
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false)

  return (
    <>
      <div className={styles.card}>
        {quiz.category && (
          <div className={styles.category}>{quiz.category}</div>
        )}
        <div className={styles.question}>{quiz.question}</div>
        <div className={styles.options}>
          {quiz.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = quiz.correctAnswer === index
            // 선택된 답안이 있으면 즉시 정/오 판별
            const hasSelection = selectedAnswer !== undefined
            // 정답은 항상 표시 (선택 여부와 관계없이)
            const isCorrectOption = hasSelection && isCorrect
            // 선택한 답안이 오답인 경우 빨간색 표시
            const isWrongSelected = hasSelection && isSelected && !isCorrect

            return (
              <button
                key={index}
                className={`${styles.option} ${
                  isCorrectOption ? styles.optionCorrect : ''
                } ${
                  isWrongSelected ? styles.optionWrong : ''
                }`}
                disabled={hasSelection}
                onClick={() => !hasSelection && onAnswerSelect && onAnswerSelect(index)}
              >
                <span className={styles.optionNumber}>{index + 1}</span>
                <span className={styles.optionText}>{option}</span>
              </button>
            )
          })}
        </div>
        {selectedAnswer !== undefined && quiz.explanation && (
          <div className={styles.explanation}>
            <div className={styles.explanationTitle}>해설</div>
            <div className={styles.explanationText}>{quiz.explanation}</div>
          </div>
        )}
        {showCorrectionRequest && (
          <div className={styles.actions}>
            <button
              className={styles.correctionButton}
              onClick={() => setIsCorrectionModalOpen(true)}
            >
              수정 요청
            </button>
          </div>
        )}
      </div>
      {showCorrectionRequest && (
        <CorrectionRequestModal
          isOpen={isCorrectionModalOpen}
          onClose={() => setIsCorrectionModalOpen(false)}
          quizId={Number(quiz.id)}
          quizQuestion={quiz.question}
        />
      )}
    </>
  )
}
