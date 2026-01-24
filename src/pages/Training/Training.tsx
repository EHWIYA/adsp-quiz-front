import { useState, useEffect, useMemo } from 'react'
import * as styles from './Training.css'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { useGetNextStudyQuiz } from '../../api/quiz'
import { useCoreContent } from '../../api/coreContent'
import { SUBJECT_CATEGORIES, getMainTopics, getSubTopics } from '../../data/subjectCategories'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { useUIStore } from '../../store/uiStore'
import { useCreateWrongAnswer } from '../../api/wrongAnswer'
import { apiClient } from '../../api/client'
import type { Quiz } from '../../components/QuizCard/QuizCard.types'
import type { ApiError, QuizResponse } from '../../api/types'

export const Training = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]) // 원본 QuizResponse 저장
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showAnswer, setShowAnswer] = useState(false)
  const [seenQuizIds, setSeenQuizIds] = useState<number[]>([]) // 이미 본 문제 ID 추적
  
  // 3단계 분류 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  
  const getNextStudyQuizMutation = useGetNextStudyQuiz()
  const {
    mutate: fetchNextStudyQuiz,
    reset: resetNextStudyQuiz,
    isPending: isNextQuizPending,
    isError: isNextQuizError,
    error: nextQuizError,
  } = getNextStudyQuizMutation
  const createWrongAnswerMutation = useCreateWrongAnswer()
  const { setLoading } = useUIStore()
  
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

  const handleStart = () => {
    if (!selectedSubTopicId) {
      return
    }

    // 초기화
    setQuizzes([])
    setQuizResponses([])
    setCurrentQuizIndex(0)
    setSelectedAnswer(undefined)
    setShowAnswer(false)
    setSeenQuizIds([])

    // 첫 번째 문제 요청
    setLoading(true)
    // 원본 QuizResponse를 가져오기 위해 직접 API 호출
    const queryParams = new URLSearchParams({
      sub_topic_id: String(selectedSubTopicId),
    })
    apiClient.get<QuizResponse>(`/api/v1/quiz/study/next?${queryParams.toString()}`)
      .then((response) => {
        // 원본 응답 저장
        setQuizResponses([response])
        // 프론트엔드 형식으로 변환하여 저장
        const quiz: Quiz = {
          id: String(response.id),
          question: response.question,
          options: response.options.map((option) => option.text),
          correctAnswer: response.correct_answer,
          explanation: response.explanation,
        }
        setQuizzes([quiz])
        setCurrentQuizIndex(0)
        setSeenQuizIds([response.id])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    
    // 틀린 문제인 경우 오답노트에 자동 저장
    const currentQuiz = quizzes[currentQuizIndex]
    const currentQuizResponse = quizResponses[currentQuizIndex]
    
    if (currentQuiz && currentQuizResponse && currentQuiz.correctAnswer !== undefined) {
      const isCorrect = currentQuiz.correctAnswer === answerIndex
      
      if (!isCorrect && selectedSubjectId && selectedSubTopicId) {
        // 틀린 문제인 경우 오답 저장
        createWrongAnswerMutation.mutate({
          quiz_id: currentQuizResponse.id,
          question: currentQuizResponse.question,
          options: currentQuizResponse.options.map((option) => option.text),
          selected_answer: answerIndex,
          correct_answer: currentQuizResponse.correct_answer,
          explanation: currentQuizResponse.explanation,
          subject_id: currentQuizResponse.subject_id,
          sub_topic_id: selectedSubTopicId,
          created_at: currentQuizResponse.created_at,
        })
      }
    }
  }

  const handleNext = () => {
    if (!selectedSubTopicId) {
      return
    }

    // 현재 문제 인덱스가 마지막이 아니면 다음 문제로 이동
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setSelectedAnswer(undefined)
      setShowAnswer(false)
      return
    }

    // 마지막 문제였고, 아직 10문제 미만이면 다음 문제 요청
    if (quizzes.length < 10) {
      // 로딩을 먼저 시작 (비동기 작업 시작 전 즉시 피드백)
      setLoading(true)
      // 원본 QuizResponse를 가져오기 위해 직접 API 호출
      const queryParams = new URLSearchParams({
        sub_topic_id: String(selectedSubTopicId),
      })
      if (seenQuizIds.length > 0) {
        queryParams.append('exclude_quiz_ids', seenQuizIds.join(','))
      }
      apiClient.get<QuizResponse>(`/api/v1/quiz/study/next?${queryParams.toString()}`)
        .then((response) => {
          // 원본 응답 저장
          setQuizResponses([...quizResponses, response])
          // 프론트엔드 형식으로 변환하여 저장
          const quiz: Quiz = {
            id: String(response.id),
            question: response.question,
            options: response.options.map((option) => option.text),
            correctAnswer: response.correct_answer,
            explanation: response.explanation,
          }
          setQuizzes([...quizzes, quiz])
          setCurrentQuizIndex(quizzes.length)
          setSeenQuizIds([...seenQuizIds, response.id])
          setSelectedAnswer(undefined)
          setShowAnswer(false)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }

  // 503 에러 자동 재시도 (7초 후)
  useEffect(() => {
    const error = nextQuizError as ApiError | undefined
    if (error?.status === 503 && !isNextQuizPending && selectedSubTopicId) {
      const retryTimer = setTimeout(() => {
        setLoading(true)
        fetchNextStudyQuiz(
          {
            sub_topic_id: selectedSubTopicId,
            exclude_quiz_ids: seenQuizIds,
          },
          {
            onSuccess: () => {
              setLoading(false)
            },
            onError: () => {
              setLoading(false)
            },
          }
        )
      }, 7000) // 7초 후 자동 재시도

      return () => clearTimeout(retryTimer)
    }
  }, [fetchNextStudyQuiz, isNextQuizPending, nextQuizError, selectedSubTopicId, seenQuizIds, setLoading])

  // 문제가 없으면 시작 화면 표시
  if (quizzes.length === 0) {
    const error = nextQuizError as ApiError | undefined
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
              <Dropdown
                id="subjectId"
                value={selectedSubjectId}
                options={subjects.map((subject) => ({
                  value: subject.id,
                  label: subject.name,
                }))}
                placeholder="과목을 선택하세요"
                onChange={(value) => {
                  const nextSubjectId = value ? Number(value) : null
                  setSelectedSubjectId(nextSubjectId)
                  setSelectedMainTopicId(null)
                  setSelectedSubTopicId(null)
                }}
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
                  onChange={(value) => {
                    const nextMainTopicId = value ? Number(value) : null
                    setSelectedMainTopicId(nextMainTopicId)
                    setSelectedSubTopicId(null)
                  }}
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
                {/* 핵심 정보 존재 여부 확인 */}
                {selectedSubTopicId && !isLoadingCoreContent && (
                  <>
                    {isCoreContentError ? (
                      <div className={styles.error}>
                        <p className={styles.errorMessage}>
                          이 세부항목에 핵심 정보가 등록되어 있지 않습니다.
                        </p>
                        <p className={styles.helperText} style={{ marginTop: '8px', fontSize: '0.9em' }}>
                          관리 페이지에서 먼저 핵심 정보를 등록해주세요.
                        </p>
                      </div>
                    ) : coreContent && coreContent.core_contents.length > 0 ? (
                      <p className={styles.successText}>
                        ✓ 핵심 정보가 {coreContent.core_contents.length}개 등록되어 있습니다.
                      </p>
                    ) : null}
                  </>
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
                    resetNextStudyQuiz()
                    if (selectedSubTopicId) {
                      setLoading(true)
                      fetchNextStudyQuiz(
                        {
                          sub_topic_id: selectedSubTopicId,
                          exclude_quiz_ids: seenQuizIds,
                        },
                        {
                          onSuccess: () => {
                            setLoading(false)
                          },
                          onError: () => {
                            setLoading(false)
                          },
                        }
                      )
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
              disabled={
                isNextQuizPending ||
                !selectedSubTopicId ||
                isLoadingCoreContent ||
                isCoreContentError ||
                !coreContent ||
                coreContent.core_contents.length === 0
              }
            >
              {isNextQuizPending
                ? '문제 생성 중...'
                : isLoadingCoreContent
                  ? '핵심 정보 확인 중...'
                  : isCoreContentError || !coreContent || coreContent.core_contents.length === 0
                    ? '핵심 정보가 없습니다'
                    : '학습 시작하기'}
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
          {isNextQuizError && (
            <div className={styles.error}>
              <p className={styles.errorMessage}>
                {(nextQuizError as { message?: string })?.message || '문제 생성 중 오류가 발생했습니다.'}
              </p>
            </div>
          )}
          {currentQuizIndex < totalQuestions - 1 || (totalQuestions < 10 && !isNextQuizPending) ? (
            <button
              className={styles.nextButton}
              onClick={handleNext}
              disabled={isNextQuizPending}
            >
              {isNextQuizPending ? '문제 생성 중...' : '다음 문제'}
            </button>
          ) : totalQuestions >= 10 ? (
            <button
              className={styles.startButton}
              onClick={() => {
                setQuizzes([])
                setQuizResponses([])
                setCurrentQuizIndex(0)
                setSelectedAnswer(undefined)
                setShowAnswer(false)
                setSeenQuizIds([])
                setSelectedSubjectId(null)
                setSelectedMainTopicId(null)
                setSelectedSubTopicId(null)
              }}
            >
              다시 시작
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
