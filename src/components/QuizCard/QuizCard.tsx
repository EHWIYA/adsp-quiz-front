import { Quiz } from './QuizCard.types'
import * as styles from './QuizCard.css'

interface QuizCardProps {
  quiz: Quiz
  selectedAnswer?: number
  showAnswer?: boolean
  onAnswerSelect?: (answerIndex: number) => void
}

export const QuizCard = ({ quiz, selectedAnswer, showAnswer = false, onAnswerSelect }: QuizCardProps) => {

  return (
    <div className={styles.card}>
      {quiz.category && (
        <div className={styles.category}>{quiz.category}</div>
      )}
      <div className={styles.question}>{quiz.question}</div>
      <div className={styles.options}>
        {quiz.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = showAnswer && quiz.correctAnswer === index
          const isWrongSelected = showAnswer && isSelected && !isCorrectOption

          return (
            <button
              key={index}
              className={`${styles.option} ${
                isSelected ? styles.optionSelected : ''
              } ${
                isCorrectOption ? styles.optionCorrect : ''
              } ${
                isWrongSelected ? styles.optionWrong : ''
              }`}
              disabled={showAnswer}
              onClick={() => !showAnswer && onAnswerSelect && onAnswerSelect(index)}
            >
              <span className={styles.optionNumber}>{index + 1}</span>
              <span className={styles.optionText}>{option}</span>
            </button>
          )
        })}
      </div>
      {showAnswer && quiz.explanation && (
        <div className={styles.explanation}>
          <div className={styles.explanationTitle}>해설</div>
          <div className={styles.explanationText}>{quiz.explanation}</div>
        </div>
      )}
    </div>
  )
}
