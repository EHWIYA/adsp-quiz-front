import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Exam.css'
import { Timer } from '../../components/Timer/Timer'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { useStartExam, useSubmitExam } from '../../api/exam'
import { useExamStore } from '../../store/examStore'
import { useTimerStore } from '../../store/timerStore'
import { useUIStore } from '../../store/uiStore'

export const Exam = () => {
  const navigate = useNavigate()
  const { examSessionId, answers, startExam, addAnswer, resetExam } = useExamStore()
  const { seconds, isRunning, start, pause, resume, tick } = useTimerStore()
  const { setLoading } = useUIStore()
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  
  const startExamMutation = useStartExam()
  const submitExamMutation = useSubmitExam()

  useEffect(() => {
    // examSessionId가 없고, 로딩 중이 아니며, 데이터도 없고, 에러도 없을 때만 요청
    if (!examSessionId && !startExamMutation.isPending && !startExamMutation.data && !startExamMutation.isError) {
      startExamMutation.mutate(
        { 
          subjectId: 1,
          quizCount: 10 
        },
        {
          onMutate: () => {
            setLoading(true)
          },
          onSuccess: (data) => {
            startExam(data.examSessionId)
            start(data.timeLimit)
          },
          onSettled: () => {
            setLoading(false)
          },
        }
      )
    }
  }, [examSessionId, startExamMutation.isPending, startExamMutation.data, startExamMutation.isError, startExam, start, setLoading])

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const interval = window.setInterval(() => {
      tick()
      const currentSeconds = useTimerStore.getState().seconds
      if (currentSeconds <= 0) {
        handleTimeUp()
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, seconds])

  const handlePause = () => {
    pause()
  }

  const handleResume = () => {
    resume()
  }

  const handleTimeUp = () => {
    handleSubmit()
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (startExamMutation.data && selectedAnswer !== undefined) {
      const currentQuiz = startExamMutation.data.quizzes[currentQuizIndex]
      if (currentQuiz) {
        const isCorrect = currentQuiz.correctAnswer === selectedAnswer
        addAnswer(currentQuiz.id, selectedAnswer, isCorrect)
      }
      
      if (currentQuizIndex < startExamMutation.data.quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1)
        setSelectedAnswer(undefined)
      }
    }
  }

  const handleSubmit = () => {
    if (!examSessionId || !startExamMutation.data) return

    const allAnswers = startExamMutation.data.quizzes.map((quiz) => {
      const answer = answers.find((a) => a.quizId === quiz.id)
      return {
        quizId: quiz.id,
        selectedAnswer: answer?.selectedAnswer ?? -1,
      }
    })

    submitExamMutation.mutate(
      {
        examSessionId,
        answers: allAnswers,
      },
      {
        onMutate: () => {
          setLoading(true)
        },
        onSuccess: () => {
          resetExam()
          navigate(`/exam/result/${examSessionId}`)
        },
        onSettled: () => {
          setLoading(false)
        },
      }
    )
  }

  if (startExamMutation.isPending) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>시험 준비 중...</div>
      </div>
    )
  }

  if (startExamMutation.isError) {
    const error = startExamMutation.error as { message?: string; code?: string; details?: unknown }
    const statusCode = error.code || ''
    const isServerError = statusCode.includes('500') || statusCode.includes('HTTP_500')
    const isNotFound = statusCode.includes('404') || statusCode.includes('HTTP_404')
    const isBadRequest = statusCode.includes('400') || statusCode.includes('HTTP_400')
    const isValidationError = statusCode.includes('422') || statusCode.includes('HTTP_422')
    
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>시험 시작 중 오류가 발생했습니다</h2>
          {isNotFound ? (
            <>
              <p>요청한 과목을 찾을 수 없습니다.</p>
              <p style={{ fontSize: '0.9em', marginTop: '0.5em' }}>
                {error.message || '과목 ID를 확인해주세요.'}
              </p>
              <p style={{ fontSize: '0.85em', marginTop: '0.5em', color: '#666' }}>
                현재 사용 중인 과목 ID: 1
              </p>
            </>
          ) : isBadRequest ? (
            <>
              <p>요청한 문제 개수를 생성할 수 없습니다.</p>
              <p style={{ fontSize: '0.9em', marginTop: '0.5em' }}>
                {error.message || '문제 개수를 줄이거나 다른 과목을 선택해주세요.'}
              </p>
              {error.message && error.message.includes('현재:') && (
                <p style={{ fontSize: '0.85em', marginTop: '0.5em', color: '#666' }}>
                  {error.message.match(/현재: \d+개/)?.[0] || ''}
                </p>
              )}
              <p style={{ fontSize: '0.85em', marginTop: '0.5em', color: '#666' }}>
                현재 요청한 문제 개수: 10개
              </p>
            </>
          ) : isValidationError ? (
            <>
              <p>요청 데이터에 문제가 있습니다.</p>
              <p style={{ fontSize: '0.9em', marginTop: '0.5em' }}>
                {error.message || '필수 필드를 확인해주세요.'}
              </p>
            </>
          ) : isServerError ? (
            <>
              <p>서버 내부 오류가 발생했습니다.</p>
              <p style={{ fontSize: '0.9em', marginTop: '0.5em' }}>
                오류 코드: {error.code || '500'}
              </p>
              <p style={{ fontSize: '0.85em', marginTop: '0.5em' }}>
                잠시 후 다시 시도해주세요.
              </p>
            </>
          ) : (
            <p>{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
          )}
          <button onClick={() => {
            startExamMutation.reset()
            window.location.reload()
          }}>
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  if (!startExamMutation.data) {
    return null
  }

  const currentQuiz = startExamMutation.data.quizzes[currentQuizIndex]
  const totalQuestions = startExamMutation.data.quizzes.length
  const progress = ((currentQuizIndex + 1) / totalQuestions) * 100

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모의고사</h1>
        <div className={styles.timerWrapper}>
          <Timer
            seconds={seconds}
            isRunning={isRunning}
            onPause={handlePause}
            onResume={handleResume}
            onTimeUp={handleTimeUp}
          />
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span>문제 {currentQuizIndex + 1} / {totalQuestions}</span>
          <span>남은 시간: {Math.floor(seconds / 60)}분</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.content}>
        {currentQuiz && (
          <QuestionDisplay
            quiz={currentQuiz}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        )}
      </div>

      <div className={styles.footer}>
        {currentQuizIndex < totalQuestions - 1 ? (
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
          >
            다음 문제
          </button>
        ) : (
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={submitExamMutation.isPending}
          >
            {submitExamMutation.isPending ? '제출 중...' : '시험 제출'}
          </button>
        )}
      </div>
    </div>
  )
}
