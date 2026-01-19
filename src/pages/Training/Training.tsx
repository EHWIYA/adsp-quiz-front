import { useState, useEffect } from 'react'
import * as styles from './Training.css'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { useGenerateStudyQuiz } from '../../api/quiz'
import { useSubjects, useMainTopics, useSubTopics } from '../../api/subjects'
import type { Quiz } from '../../components/QuizCard/QuizCard.types'
import type { ApiError } from '../../api/types'

export const Training = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showAnswer, setShowAnswer] = useState(false)
  
  // 3단계 분류 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  
  const generateStudyQuizMutation = useGenerateStudyQuiz()
  const { data: subjects, isLoading: isLoadingSubjects, isError: isSubjectsError } = useSubjects()
  const { data: mainTopicsData, isLoading: isLoadingMainTopics } = useMainTopics(selectedSubjectId)
  const { data: subTopicsData, isLoading: isLoadingSubTopics } = useSubTopics(selectedMainTopicId)

  // 과목 선택 시 주요항목 초기화
  useEffect(() => {
    if (selectedSubjectId) {
      setSelectedMainTopicId(null)
      setSelectedSubTopicId(null)
    }
  }, [selectedSubjectId])

  // 주요항목 선택 시 세부항목 초기화
  useEffect(() => {
    if (selectedMainTopicId) {
      setSelectedSubTopicId(null)
    }
  }, [selectedMainTopicId])

  const handleStart = () => {
    if (!selectedSubTopicId) {
      return
    }

    generateStudyQuizMutation.mutate(
      {
        sub_topic_id: selectedSubTopicId,
        quiz_count: 10,
      },
      {
        onSuccess: (generatedQuizzes) => {
          setQuizzes(generatedQuizzes)
          setCurrentQuizIndex(0)
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
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setSelectedAnswer(undefined)
      setShowAnswer(false)
    }
  }

  // 503 에러 자동 재시도 (7초 후)
  useEffect(() => {
    const error = generateStudyQuizMutation.error as ApiError | undefined
    if (error?.status === 503 && !generateStudyQuizMutation.isPending && selectedSubTopicId) {
      const retryTimer = setTimeout(() => {
        generateStudyQuizMutation.mutate({
          sub_topic_id: selectedSubTopicId,
          quiz_count: 10,
        })
      }, 7000) // 7초 후 자동 재시도

      return () => clearTimeout(retryTimer)
    }
  }, [generateStudyQuizMutation.error, generateStudyQuizMutation.isPending, selectedSubTopicId])

  // 문제가 없으면 시작 화면 표시
  if (quizzes.length === 0) {
    const error = generateStudyQuizMutation.error as ApiError | undefined
    const is503Error = error?.status === 503

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>학습 모드</h1>
        </div>
        <div className={styles.startSection}>
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
              </div>
            )}

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
                    generateStudyQuizMutation.reset()
                    if (selectedSubTopicId) {
                      generateStudyQuizMutation.mutate({
                        sub_topic_id: selectedSubTopicId,
                        quiz_count: 10,
                      })
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
              disabled={generateStudyQuizMutation.isPending || !selectedSubTopicId}
            >
              {generateStudyQuizMutation.isPending ? '문제 생성 중...' : '학습 시작하기'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 문제 풀이 화면
  const currentQuiz = quizzes[currentQuizIndex]
  const totalQuestions = quizzes.length

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>학습 모드</h1>
        <div className={styles.progress}>
          문제 {currentQuizIndex + 1} / {totalQuestions}
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
          {generateStudyQuizMutation.isError && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(generateStudyQuizMutation.error as { message?: string })?.message || '문제 생성 중 오류가 발생했습니다.'}
              </p>
            </div>
          )}
          {currentQuizIndex < totalQuestions - 1 ? (
            <button
              className={styles.nextButton}
              onClick={handleNext}
            >
              다음 문제
            </button>
          ) : (
            <button
              className={styles.startButton}
              onClick={() => {
                setQuizzes([])
                setCurrentQuizIndex(0)
                setSelectedAnswer(undefined)
                setShowAnswer(false)
                setSelectedSubjectId(null)
                setSelectedMainTopicId(null)
                setSelectedSubTopicId(null)
              }}
            >
              다시 시작
            </button>
          )}
        </div>
      )}
    </div>
  )
}
