import { useState, useMemo, useRef } from 'react'
import * as styles from './Dashboard.css'
import { useQuizDashboard } from '../../api/quiz'
import type { ApiError, QuizDashboardResponse } from '../../api/types'
import { SUBJECT_CATEGORIES, getMainTopics, getSubTopics } from '../../data/subjectCategories'
import { Dropdown } from '../../components/Dropdown/Dropdown'

// 카테고리 문자열을 파싱하여 계층 구조로 변환
interface CategoryHierarchy {
  subjectName: string
  mainTopicName: string
  subTopicName: string
  fullPath: string
  count: number
  status?: 'normal' | 'insufficient' | 'production_difficult'
}

const parseCategoryString = (category: string): { subject: string; mainTopic: string; subTopic: string } | null => {
  // "ADsP > 데이터 이해 > 데이터의 이해 > 데이터와 정보" 형식
  const parts = category.split(' > ').map((p) => p.trim())
  if (parts.length < 3) return null
  
  // 첫 번째가 "ADsP"일 수 있으므로 제거
  const filteredParts = parts[0] === 'ADsP' || parts[0] === 'ADsP ' ? parts.slice(1) : parts
  
  if (filteredParts.length < 3) return null
  
  return {
    subject: filteredParts[0],
    mainTopic: filteredParts[1],
    subTopic: filteredParts[2],
  }
}

const buildCategoryHierarchy = (dashboard: QuizDashboardResponse): Map<string, Map<string, CategoryHierarchy[]>> => {
  const hierarchy = new Map<string, Map<string, CategoryHierarchy[]>>()
  
  Object.entries(dashboard.quizzes_by_category).forEach(([category, count]) => {
    const parsed = parseCategoryString(category)
    if (!parsed) return
    
    const status = dashboard.category_status?.[category]
    
    if (!hierarchy.has(parsed.subject)) {
      hierarchy.set(parsed.subject, new Map())
    }
    
    const subjectMap = hierarchy.get(parsed.subject)!
    if (!subjectMap.has(parsed.mainTopic)) {
      subjectMap.set(parsed.mainTopic, [])
    }
    
    subjectMap.get(parsed.mainTopic)!.push({
      subjectName: parsed.subject,
      mainTopicName: parsed.mainTopic,
      subTopicName: parsed.subTopic,
      fullPath: category,
      count,
      status,
    })
  })
  
  return hierarchy
}

export const Dashboard = () => {
  const { data: dashboard, isLoading, isError, error } = useQuizDashboard()
  const [collapsedSubjects, setCollapsedSubjects] = useState<Set<string>>(new Set())
  const [expandedMainTopics, setExpandedMainTopics] = useState<Set<string>>(new Set())
  
  // 3단계 드롭다운 선택 상태
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [selectedMainTopicId, setSelectedMainTopicId] = useState<number | null>(null)
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  
  // 트리 노드 ref (스크롤용)
  const treeNodeRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  
  // 과목 목록
  const subjects = useMemo(() => SUBJECT_CATEGORIES.map((s) => ({ id: s.id, name: s.name })), [])
  
  // 선택된 과목에 따른 주요항목 목록
  const mainTopicsData = useMemo(() => {
    if (!selectedSubjectId) return null
    return getMainTopics(selectedSubjectId)
  }, [selectedSubjectId])
  
  // 선택된 과목/주요항목에 따른 세부항목 목록
  const subTopicsData = useMemo(() => {
    if (!selectedSubjectId || !selectedMainTopicId) return null
    return getSubTopics(selectedSubjectId, selectedMainTopicId)
  }, [selectedSubjectId, selectedMainTopicId])
  
  // 카테고리 이름과 ID 매칭을 위한 헬퍼 함수
  const getSubjectNameById = (id: number) => {
    return SUBJECT_CATEGORIES.find((s) => s.id === id)?.name
  }
  
  const getMainTopicNameById = (subjectId: number, mainTopicId: number) => {
    const subject = SUBJECT_CATEGORIES.find((s) => s.id === subjectId)
    return subject?.mainTopics.find((mt) => mt.id === mainTopicId)?.name
  }
  
  const getSubTopicNameById = (subjectId: number, mainTopicId: number, subTopicId: number) => {
    const subject = SUBJECT_CATEGORIES.find((s) => s.id === subjectId)
    const mainTopic = subject?.mainTopics.find((mt) => mt.id === mainTopicId)
    return mainTopic?.subTopics.find((st) => st.id === subTopicId)?.name
  }

  // 모든 Hook은 조건부 return 전에 호출해야 함 (React Hooks 규칙)
  const categoryHierarchy = useMemo(() => {
    if (!dashboard) return new Map<string, Map<string, CategoryHierarchy[]>>()
    return buildCategoryHierarchy(dashboard)
  }, [dashboard])

  const allSubjectNames = useMemo(() => {
    return new Set(Array.from(categoryHierarchy.keys()))
  }, [categoryHierarchy])

  const expandedSubjects = useMemo(() => {
    if (allSubjectNames.size === 0) return new Set<string>()
    const expanded = new Set<string>()
    allSubjectNames.forEach((name) => {
      if (!collapsedSubjects.has(name)) {
        expanded.add(name)
      }
    })
    return expanded
  }, [allSubjectNames, collapsedSubjects])

  const ensureSubjectExpanded = (subjectName: string) => {
    setCollapsedSubjects((prev) => {
      if (!prev.has(subjectName)) return prev
      const next = new Set(prev)
      next.delete(subjectName)
      return next
    })
  }

  const scrollToSubjectNode = (subjectName: string) => {
    setTimeout(() => {
      const subjectNode = treeNodeRefs.current.get(`subject-${subjectName}`)
      if (subjectNode) {
        subjectNode.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const scrollToMainTopicNode = (mainTopicKey: string) => {
    setTimeout(() => {
      const mainTopicNode = treeNodeRefs.current.get(`mainTopic-${mainTopicKey}`)
      if (mainTopicNode) {
        mainTopicNode.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 200)
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingText}>대시보드 데이터를 불러오는 중...</p>
      </div>
    )
  }

  if (isError) {
    const apiError = error as ApiError
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles.errorMessage}>
            대시보드 데이터를 불러오는 중 오류가 발생했습니다.
          </p>
          {apiError?.message && <p className={styles.helperText}>{apiError.message}</p>}
        </div>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyText}>대시보드 데이터가 없습니다.</p>
      </div>
    )
  }
  
  const toggleSubject = (subjectName: string) => {
    setCollapsedSubjects((prev) => {
      const next = new Set(prev)
      if (next.has(subjectName)) {
        next.delete(subjectName)
      } else {
        next.add(subjectName)
      }
      return next
    })
  }
  
  const toggleMainTopic = (key: string) => {
    const newExpanded = new Set(expandedMainTopics)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedMainTopics(newExpanded)
  }
  
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'normal':
        return styles.categoryStatusNormal
      case 'insufficient':
        return styles.categoryStatusInsufficient
      case 'production_difficult':
        return styles.categoryStatusProductionDifficult
      default:
        return ''
    }
  }
  
  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'normal':
        return '정상'
      case 'insufficient':
        return '부족'
      case 'production_difficult':
        return '생산 어려움'
      default:
        return null
    }
  }
  
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'normal':
        return '✓'
      case 'insufficient':
        return '⚠'
      case 'production_difficult':
        return '🛑'
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      {/* 통계 카드 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>전체 문제 수</div>
          <div className={styles.statValue}>{dashboard.total_quizzes.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>검증 완료</div>
          <div className={styles.statValue}>
            {dashboard.validation_status.valid || 0}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>검증 필요</div>
          <div className={styles.statValue}>
            {dashboard.validation_status.pending || 0}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>검증 실패</div>
          <div className={styles.statValue}>
            {dashboard.validation_status.invalid || 0}
          </div>
        </div>
      </div>

      {/* 카테고리별 통계 - 계층형 트리 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>카테고리별 문제 수</h2>
        
        {/* 필터 드롭다운 */}
        <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="subjectFilter">
                과목
              </label>
              <Dropdown
                id="subjectFilter"
                value={selectedSubjectId}
                options={[
                  { value: 'all', label: '전체' },
                  ...subjects.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                  })),
                ]}
                placeholder="과목 선택"
                onChange={(value) => {
                  if (value === 'all') {
                    setSelectedSubjectId(null)
                    setSelectedMainTopicId(null)
                    setSelectedSubTopicId(null)
                    return
                  }
                  const nextSubjectId = Number(value)
                  setSelectedSubjectId(nextSubjectId)
                  setSelectedMainTopicId(null)
                  setSelectedSubTopicId(null)
                  const subjectName = getSubjectNameById(nextSubjectId)
                  if (subjectName) {
                    ensureSubjectExpanded(subjectName)
                    scrollToSubjectNode(subjectName)
                  }
                }}
              />
            </div>
            
            {selectedSubjectId && mainTopicsData && (
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="mainTopicFilter">
                  주요항목
                </label>
                <Dropdown
                  id="mainTopicFilter"
                  value={selectedMainTopicId}
                  options={[
                    { value: 'all', label: '전체' },
                    ...mainTopicsData.main_topics.map((mainTopic) => ({
                      value: mainTopic.id,
                      label: mainTopic.name,
                    })),
                  ]}
                  placeholder="주요항목 선택"
                  onChange={(value) => {
                    if (value === 'all') {
                      setSelectedMainTopicId(null)
                      setSelectedSubTopicId(null)
                      return
                    }
                    const nextMainTopicId = Number(value)
                    setSelectedMainTopicId(nextMainTopicId)
                    setSelectedSubTopicId(null)
                    if (selectedSubjectId) {
                      const subjectName = getSubjectNameById(selectedSubjectId)
                      const mainTopicName = getMainTopicNameById(selectedSubjectId, nextMainTopicId)
                      if (subjectName) {
                        ensureSubjectExpanded(subjectName)
                        scrollToSubjectNode(subjectName)
                      }
                      if (subjectName && mainTopicName) {
                        const mainTopicKey = `${subjectName}-${mainTopicName}`
                        setExpandedMainTopics((prev) => new Set([...prev, mainTopicKey]))
                        scrollToMainTopicNode(mainTopicKey)
                      }
                    }
                  }}
                />
              </div>
            )}
            
            {selectedSubjectId && selectedMainTopicId && subTopicsData && (
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="subTopicFilter">
                  세부항목
                </label>
                <Dropdown
                  id="subTopicFilter"
                  value={selectedSubTopicId}
                  options={[
                    { value: 'all', label: '전체' },
                    ...subTopicsData.sub_topics.map((subTopic) => ({
                      value: subTopic.id,
                      label: subTopic.name,
                    })),
                  ]}
                  placeholder="세부항목 선택"
                  onChange={(value) => {
                    if (value === 'all') {
                      setSelectedSubTopicId(null)
                    } else {
                      setSelectedSubTopicId(Number(value))
                    }
                  }}
                />
              </div>
            )}
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="statusFilter">
                상태
              </label>
              <Dropdown
                id="statusFilter"
                value={selectedStatus}
                options={[
                  { value: 'all', label: '전체' },
                  { value: 'normal', label: '정상' },
                  { value: 'insufficient', label: '부족' },
                  { value: 'production_difficult', label: '생산 어려움' },
                ]}
                placeholder="상태 선택"
                onChange={(value) => {
                  if (value === 'all') {
                    setSelectedStatus(null)
                  } else {
                    setSelectedStatus(value as string)
                  }
                }}
              />
            </div>
          </div>
          
          {categoryHierarchy.size > 0 ? (
            <div className={styles.categoryTree}>
              {Array.from(categoryHierarchy.entries())
              .filter(([subjectName]) => {
                // 과목 필터링
                if (selectedSubjectId) {
                  const expectedSubjectName = getSubjectNameById(selectedSubjectId)
                  return expectedSubjectName === subjectName
                }
                return true
              })
              .map(([subjectName, mainTopicsMap]) => {
                const isSubjectExpanded = expandedSubjects.has(subjectName)
                
                // 과목별 총 문제 수 계산
                let subjectTotal = 0
                mainTopicsMap.forEach((subTopics) => {
                  subTopics.forEach((item) => {
                    subjectTotal += item.count
                  })
                })
                
                return (
                  <div
                    key={subjectName}
                    ref={(el) => {
                      if (el) treeNodeRefs.current.set(`subject-${subjectName}`, el)
                    }}
                    className={styles.treeNode}
                  >
                  <button
                    className={styles.treeNodeHeader}
                    onClick={() => toggleSubject(subjectName)}
                  >
                    <span className={styles.treeIcon}>
                      {isSubjectExpanded ? '📂' : '📁'}
                    </span>
                    <span className={styles.treeNodeTitle}>{subjectName}</span>
                    <span className={styles.treeNodeCount}>(전체: {subjectTotal}개)</span>
                  </button>
                  
                  {isSubjectExpanded && (
                    <div className={styles.treeNodeChildren}>
                      {Array.from(mainTopicsMap.entries())
                        .filter(([mainTopicName]) => {
                          // 주요항목 필터링
                          if (selectedSubjectId && selectedMainTopicId) {
                            const expectedMainTopicName = getMainTopicNameById(selectedSubjectId, selectedMainTopicId)
                            return expectedMainTopicName === mainTopicName
                          }
                          return true
                        })
                        .map(([mainTopicName, subTopics]) => {
                          const mainTopicKey = `${subjectName}-${mainTopicName}`
                          const isMainTopicExpanded = expandedMainTopics.has(mainTopicKey)
                          
                          // 주요항목별 총 문제 수 계산
                          const mainTopicTotal = subTopics.reduce((sum, item) => sum + item.count, 0)
                          
                          return (
                            <div
                              key={mainTopicKey}
                              ref={(el) => {
                                if (el) treeNodeRefs.current.set(`mainTopic-${mainTopicKey}`, el)
                              }}
                              className={styles.treeNode}
                            >
                            <button
                              className={styles.treeNodeHeader}
                              onClick={() => toggleMainTopic(mainTopicKey)}
                            >
                              <span className={styles.treeIcon}>
                                {isMainTopicExpanded ? '📂' : '📁'}
                              </span>
                              <span className={styles.treeNodeTitle}>{mainTopicName}</span>
                              <span className={styles.treeNodeCount}>({mainTopicTotal}개)</span>
                            </button>
                            
                            {isMainTopicExpanded && (
                              <div className={styles.treeNodeChildren}>
                                {subTopics
                                  .filter((item) => {
                                    // 세부항목 필터링
                                    if (selectedSubjectId && selectedMainTopicId && selectedSubTopicId) {
                                      const expectedSubTopicName = getSubTopicNameById(
                                        selectedSubjectId,
                                        selectedMainTopicId,
                                        selectedSubTopicId
                                      )
                                      if (expectedSubTopicName !== item.subTopicName) {
                                        return false
                                      }
                                    }
                                    // 상태 필터링
                                    if (selectedStatus) {
                                      return item.status === selectedStatus
                                    }
                                    return true
                                  })
                                  .map((item) => (
                                    <div key={item.fullPath} className={styles.treeLeaf}>
                                    <span className={styles.treeLeafName}>{item.subTopicName}</span>
                                    <div className={styles.categoryInfo}>
                                      {item.status && (
                                        <span className={`${styles.categoryStatus} ${getStatusStyle(item.status)}`}>
                                          {getStatusIcon(item.status)} {getStatusLabel(item.status)}
                                        </span>
                                      )}
                                      <span className={styles.categoryCount}>{item.count}개</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
            </div>
          ) : (
            <p className={styles.helperText}>카테고리 데이터가 없습니다.</p>
          )}
        </div>

      {/* 검증 필요 문제 목록 */}
      {dashboard.quizzes_needing_validation.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>검증 필요 문제 ({dashboard.quizzes_needing_validation.length}개)</h2>
          <div className={styles.quizList}>
            {dashboard.quizzes_needing_validation.slice(0, 10).map((quiz) => (
              <div key={quiz.id} className={styles.quizItem}>
                <div className={styles.quizQuestion}>
                  <span className={styles.quizId}>#{quiz.id}</span>
                  <span className={styles.quizText}>{quiz.question}</span>
                </div>
              </div>
            ))}
            {dashboard.quizzes_needing_validation.length > 10 && (
              <p className={styles.helperText}>
                외 {dashboard.quizzes_needing_validation.length - 10}개의 문제가 더 있습니다.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 최근 문제 목록 */}
      {dashboard.recent_quizzes.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>최근 생성된 문제 ({dashboard.recent_quizzes.length}개)</h2>
          <div className={styles.quizList}>
            {dashboard.recent_quizzes.slice(0, 10).map((quiz) => (
              <div key={quiz.id} className={styles.quizItem}>
                <div className={styles.quizQuestion}>
                  <span className={styles.quizId}>#{quiz.id}</span>
                  <span className={styles.quizText}>{quiz.question}</span>
                </div>
                <div className={styles.quizMeta}>
                  <span className={styles.quizDate}>
                    {new Date(quiz.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
            ))}
            {dashboard.recent_quizzes.length > 10 && (
              <p className={styles.helperText}>
                외 {dashboard.recent_quizzes.length - 10}개의 문제가 더 있습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
