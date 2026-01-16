import { useState } from 'react'
import * as styles from './Exam.css'
import { Timer } from '../../components/Timer/Timer'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { Quiz } from '../../components/QuizCard/QuizCard.types'

const dummyQuiz: Quiz = {
  id: '1',
  question: '다음 중 데이터 분석에서 사용되는 기법이 아닌 것은?',
  options: [
    '회귀 분석',
    '군집 분석',
    '의사결정나무',
    '이미지 처리',
  ],
  correctAnswer: 3,
  category: '데이터 분석 기초',
}

export const Exam = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [timeRemaining] = useState(90 * 60)
  const [isRunning, setIsRunning] = useState(true)

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleResume = () => {
    setIsRunning(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모의고사</h1>
        <div className={styles.timerWrapper}>
          <Timer
            seconds={timeRemaining}
            isRunning={isRunning}
            onPause={handlePause}
            onResume={handleResume}
          />
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span>문제 1 / 50</span>
          <span>남은 시간: {Math.floor(timeRemaining / 60)}분</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '2%' }} />
        </div>
      </div>

      <div className={styles.content}>
        <QuestionDisplay
          quiz={dummyQuiz}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={setSelectedAnswer}
        />
      </div>

      <div className={styles.footer}>
        <button className={styles.submitButton}>
          시험 제출
        </button>
      </div>
    </div>
  )
}
