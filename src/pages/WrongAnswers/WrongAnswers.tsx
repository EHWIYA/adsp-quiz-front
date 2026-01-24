import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './WrongAnswers.css'
import { useWrongAnswers, useDeleteWrongAnswer } from '../../api/wrongAnswer'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { Button } from '../../components/Button/Button'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { SUBJECT_CATEGORIES } from '../../data/subjectCategories'
import type { Quiz } from '../../components/QuizCard/QuizCard.types'
import type { WrongAnswerResponse } from '../../api/types'

export const WrongAnswers = () => {
  const navigate = useNavigate()
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [selectedWrongAnswer, setSelectedWrongAnswer] = useState<WrongAnswerResponse | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showAnswer, setShowAnswer] = useState(false)
  
  const { data, isLoading, isError } = useWrongAnswers({
    subject_id: selectedSubjectId || undefined,
    page,
    limit: 20,
    sort: 'saved_at',
    order: 'desc',
  })
  
  const deleteWrongAnswerMutation = useDeleteWrongAnswer()
  
  const subjects = SUBJECT_CATEGORIES.map((s) => ({ id: s.id, name: s.name }))
  
  const handleDelete = (id: number) => {
    if (confirm('이 오답을 삭제하시겠습니까?')) {
      deleteWrongAnswerMutation.mutate(id)
    }
  }
  
  const handleStudy = (wrongAnswer: WrongAnswerResponse) => {
    // 오답노트 항목을 Quiz 형식으로 변환
    const quiz: Quiz = {
      id: String(wrongAnswer.quiz_id),
      question: wrongAnswer.question,
      options: wrongAnswer.options,
      correctAnswer: wrongAnswer.correct_answer,
      explanation: wrongAnswer.explanation,
    }
    setSelectedWrongAnswer(wrongAnswer)
    setSelectedAnswer(wrongAnswer.selected_answer)
    setShowAnswer(true)
  }
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
  }
  
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>오답노트를 불러오는 중...</div>
      </div>
    )
  }
  
  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          오답노트를 불러오는 중 오류가 발생했습니다.
          <Button onClick={() => navigate('/')}>홈으로 이동</Button>
        </div>
      </div>
    )
  }
  
  if (selectedWrongAnswer) {
    // 재학습 모드
    const quiz: Quiz = {
      id: String(selectedWrongAnswer.quiz_id),
      question: selectedWrongAnswer.question,
      options: selectedWrongAnswer.options,
      correctAnswer: selectedWrongAnswer.correct_answer,
      explanation: selectedWrongAnswer.explanation,
    }
    
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>오답 재학습</h1>
        </div>
        
        <div className={styles.content}>
          <QuestionDisplay
            quiz={quiz}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        </div>
        
        <div className={styles.footer}>
          <Button variant="outline" onClick={() => {
            setSelectedWrongAnswer(null)
            setSelectedAnswer(undefined)
            setShowAnswer(false)
          }}>
            목록으로 돌아가기
          </Button>
          {showAnswer && selectedAnswer === selectedWrongAnswer.correct_answer && (
            <Button variant="primary" onClick={() => {
              handleDelete(selectedWrongAnswer.id)
              setSelectedWrongAnswer(null)
              setSelectedAnswer(undefined)
              setShowAnswer(false)
            }}>
              오답노트에서 삭제
            </Button>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>오답노트</h1>
        <p className={styles.subtitle}>
          틀린 문제를 다시 학습하고 복습하세요.
        </p>
      </div>
      
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label} htmlFor="subjectFilter">
            과목 필터
          </label>
          <Dropdown
            id="subjectFilter"
            value={selectedSubjectId}
            options={[
              { value: 0, label: '전체' },
              ...subjects.map((subject) => ({
                value: subject.id,
                label: subject.name,
              })),
            ]}
            placeholder="과목을 선택하세요"
            onChange={(value) => {
              const numValue = value ? Number(value) : null
              setSelectedSubjectId(numValue === 0 ? null : numValue)
              setPage(1)
            }}
          />
        </div>
      </div>
      
      {data && data.wrong_answers.length === 0 ? (
        <div className={styles.emptyState}>
          <p>오답노트가 비어있습니다.</p>
          <Button variant="primary" onClick={() => navigate('/training')}>
            학습 모드 시작하기
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              총 오답: <strong>{data?.total || 0}개</strong>
            </div>
          </div>
          
          <div className={styles.wrongAnswersList}>
            {data?.wrong_answers.map((wrongAnswer) => (
              <div key={wrongAnswer.id} className={styles.wrongAnswerItem}>
                <div className={styles.wrongAnswerHeader}>
                  <div className={styles.wrongAnswerInfo}>
                    <span className={styles.questionNumber}>문제 #{wrongAnswer.quiz_id}</span>
                    <span className={styles.savedDate}>
                      저장일: {new Date(wrongAnswer.saved_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div className={styles.wrongAnswerActions}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStudy(wrongAnswer)}
                    >
                      재학습
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(wrongAnswer.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                <div className={styles.questionText}>{wrongAnswer.question}</div>
                <div className={styles.answerInfo}>
                  <span>선택한 답: {wrongAnswer.selected_answer + 1}번</span>
                  <span>정답: {wrongAnswer.correct_answer + 1}번</span>
                </div>
                {wrongAnswer.explanation && (
                  <div className={styles.explanation}>{wrongAnswer.explanation}</div>
                )}
              </div>
            ))}
          </div>
          
          {data && data.total_pages > 1 && (
            <div className={styles.pagination}>
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                이전
              </Button>
              <span className={styles.pageInfo}>
                {page} / {data.total_pages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page >= data.total_pages}
              >
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
