import { Quiz } from '../QuizCard/QuizCard.types'
import { QuizCard } from '../QuizCard/QuizCard'
import * as styles from './QuestionDisplay.css'

interface QuestionDisplayProps {
  quiz: Quiz
  selectedAnswer?: number
  showAnswer?: boolean
  onAnswerSelect?: (answerIndex: number) => void
}

export const QuestionDisplay = ({
  quiz,
  selectedAnswer,
  showAnswer = false,
  onAnswerSelect,
}: QuestionDisplayProps) => {
  return (
    <div className={styles.container}>
      <QuizCard
        quiz={quiz}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
      />
      {!showAnswer && onAnswerSelect && (
        <div className={styles.actions}>
          <button
            className={styles.submitButton}
            onClick={() => selectedAnswer !== undefined && onAnswerSelect(selectedAnswer)}
            disabled={selectedAnswer === undefined}
          >
            답안 제출
          </button>
        </div>
      )}
    </div>
  )
}
