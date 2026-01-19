import { useState, useEffect } from 'react'
import * as styles from './Training.css'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { useGenerateQuiz } from '../../api/quiz'
import { useSubjects } from '../../api/subjects'
import type { Quiz } from '../../components/QuizCard/QuizCard.types'
import type { GenerateQuizRequest, ApiError } from '../../api/types'

export const Training = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showAnswer, setShowAnswer] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  
  const [source, setSource] = useState<'youtube' | 'text'>('text')
  const [content, setContent] = useState('ADsP 데이터 분석 준전문가 시험 문제를 생성해주세요.')
  const [subjectId, setSubjectId] = useState<string>('')
  
  const generateQuizMutation = useGenerateQuiz()
  const { data: subjects, isLoading: isLoadingSubjects, isError: isSubjectsError } = useSubjects()

  const handleStart = () => {
    if (!content.trim()) {
      return
    }

    const requestData: GenerateQuizRequest = {
      source,
      content: content.trim(),
    }

    if (subjectId) {
      requestData.subjectId = subjectId
    }

    generateQuizMutation.mutate(
      requestData,
      {
        onSuccess: (quiz) => {
          setCurrentQuiz(quiz)
          setQuestionNumber(1)
          setSelectedAnswer(undefined)
          setShowAnswer(false)
        },
      }
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
  }

  const handleNext = () => {
    if (!content.trim()) {
      return
    }

    const requestData: GenerateQuizRequest = {
      source,
      content: content.trim(),
    }

    if (subjectId) {
      requestData.subjectId = subjectId
    }

    generateQuizMutation.mutate(
      requestData,
      {
        onSuccess: (quiz) => {
          setCurrentQuiz(quiz)
          setQuestionNumber(questionNumber + 1)
          setSelectedAnswer(undefined)
          setShowAnswer(false)
        },
      }
    )
  }

  // 503 에러 자동 재시도 (7초 후)
  useEffect(() => {
    const error = generateQuizMutation.error as ApiError | undefined
    if (error?.status === 503 && !generateQuizMutation.isPending) {
      const retryTimer = setTimeout(() => {
        if (content.trim()) {
          const requestData: GenerateQuizRequest = {
            source,
            content: content.trim(),
          }
          if (subjectId) {
            requestData.subjectId = subjectId
          }
          generateQuizMutation.mutate(requestData)
        }
      }, 7000) // 7초 후 자동 재시도

      return () => clearTimeout(retryTimer)
    }
  }, [generateQuizMutation.error, generateQuizMutation.isPending, content, source, subjectId])

  if (!currentQuiz) {
    const error = generateQuizMutation.error as ApiError | undefined
    const is503Error = error?.status === 503

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>학습 모드</h1>
        </div>
        <div className={styles.startSection}>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>문제 생성 방식</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="text"
                    checked={source === 'text'}
                    onChange={(e) => setSource(e.target.value as 'text')}
                    className={styles.radio}
                  />
                  <span>텍스트</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="youtube"
                    checked={source === 'youtube'}
                    onChange={(e) => setSource(e.target.value as 'youtube')}
                    className={styles.radio}
                  />
                  <span>YouTube URL</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="content">
                {source === 'text' ? '문제 생성 내용' : 'YouTube URL'}
              </label>
              <textarea
                id="content"
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  source === 'text'
                    ? 'ADsP 데이터 분석 준전문가 시험 문제를 생성해주세요.'
                    : 'https://www.youtube.com/watch?v=...'
                }
                rows={source === 'text' ? 4 : 2}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subjectId">
                과목 선택 (선택사항)
              </label>
              <select
                id="subjectId"
                className={styles.select}
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                disabled={isLoadingSubjects || isSubjectsError}
              >
                <option value="">과목 선택 안 함</option>
                {subjects?.map((subject) => (
                  <option key={subject.id} value={String(subject.id)}>
                    {subject.name}
                    {subject.quiz_count !== null && ` (${subject.quiz_count}문제)`}
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

            {error && (
              <div className={styles.error}>
                <p className={styles.errorMessage}>
                  {is503Error
                    ? error.message || 'Gemini API가 일시적으로 과부하 상태입니다. 잠시 후 다시 시도해주세요.'
                    : error.message || '문제 생성 중 오류가 발생했습니다.'}
                </p>
                {is503Error && (
                  <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                    7초 후 자동으로 재시도합니다...
                  </p>
                )}
                <button
                  className={styles.retryButton}
                  onClick={() => {
                    generateQuizMutation.reset()
                    if (content.trim()) {
                      const requestData: GenerateQuizRequest = {
                        source,
                        content: content.trim(),
                      }
                      if (subjectId) {
                        requestData.subjectId = subjectId
                      }
                      generateQuizMutation.mutate(requestData)
                    }
                  }}
                >
                  다시 시도
                </button>
              </div>
            )}

            <button
              className={styles.startButton}
              onClick={handleStart}
              disabled={generateQuizMutation.isPending || !content.trim()}
            >
              {generateQuizMutation.isPending ? '문제 생성 중...' : '학습 시작하기'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>학습 모드</h1>
        <div className={styles.progress}>
          문제 {questionNumber} / 10
        </div>
      </div>

      <div className={styles.content}>
        <QuestionDisplay
          quiz={currentQuiz}
          selectedAnswer={selectedAnswer}
          showAnswer={showAnswer}
          onAnswerSelect={handleAnswerSelect}
        />
      </div>

      {showAnswer && (
        <div className={styles.footer}>
          {generateQuizMutation.isError && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(generateQuizMutation.error as { message?: string })?.message || '문제 생성 중 오류가 발생했습니다.'}
              </p>
            </div>
          )}
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={generateQuizMutation.isPending || !content.trim()}
          >
            {generateQuizMutation.isPending ? '다음 문제 생성 중...' : '다음 문제'}
          </button>
        </div>
      )}
    </div>
  )
}
