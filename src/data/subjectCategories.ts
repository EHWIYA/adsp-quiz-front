// ADsP 자격검정 시험 3단계 분류 고정 데이터 (2026-01-20 추가)

export interface SubjectCategory {
  id: number
  name: string
  mainTopics: MainTopicCategory[]
}

export interface MainTopicCategory {
  id: number
  name: string
  subTopics: SubTopicCategory[]
}

export interface SubTopicCategory {
  id: number
  name: string
}

// 과목명: 데이터 이해 (Data Understanding)
const dataUnderstanding: SubjectCategory = {
  id: 1,
  name: '데이터 이해',
  mainTopics: [
    {
      id: 1,
      name: '데이터의 이해',
      subTopics: [
        { id: 1, name: '데이터와 정보' },
        { id: 2, name: '데이터베이스의 정의와 특징' },
        { id: 3, name: '데이터베이스 활용' },
        { id: 4, name: '빅데이터의 이해' },
        { id: 5, name: '빅데이터의 가치와 영향' },
      ],
    },
    {
      id: 2,
      name: '데이터의 가치와 미래',
      subTopics: [
        { id: 6, name: '비즈니스 모델' },
        { id: 7, name: '위기 요인과 통제 방안' },
        { id: 8, name: '미래의 빅데이터' },
      ],
    },
    {
      id: 3,
      name: '가치 창조를 위한 데이터 사이언스와 전략 인사이트',
      subTopics: [
        { id: 9, name: '빅데이터분석과 전략 인사이트' },
        { id: 10, name: '전략 인사이트 도출을 위한 필요 역량' },
        { id: 11, name: '빅데이터 그리고 데이터 사이언스의 미래' },
      ],
    },
  ],
}

// 과목명: 데이터분석 기획 (Data Analysis Planning)
const dataAnalysisPlanning: SubjectCategory = {
  id: 2,
  name: '데이터분석 기획',
  mainTopics: [
    {
      id: 4,
      name: '데이터분석 기획의 이해',
      subTopics: [
        { id: 12, name: '분석 기획 방향성 도출' },
        { id: 13, name: '분석 방법론' },
        { id: 14, name: '분석 과제 발굴' },
        { id: 15, name: '분석 프로젝트 관리 방안' },
      ],
    },
    {
      id: 5,
      name: '분석 마스터 플랜',
      subTopics: [
        { id: 16, name: '마스터 플랜 수립' },
        { id: 17, name: '분석 거버넌스 체계 수립' },
      ],
    },
  ],
}

// 과목명: 데이터분석 (Data Analysis)
const dataAnalysis: SubjectCategory = {
  id: 3,
  name: '데이터분석',
  mainTopics: [
    {
      id: 6,
      name: 'R기초와 데이터 마트',
      subTopics: [
        { id: 18, name: 'R기초' },
        { id: 19, name: '데이터 마트' },
        { id: 20, name: '결측값 처리와 이상값 검색' },
      ],
    },
    {
      id: 7,
      name: '통계분석',
      subTopics: [
        { id: 21, name: '통계학 개론' },
        { id: 22, name: '기초 통계분석' },
        { id: 23, name: '다변량 분석' },
        { id: 24, name: '시계열 예측' },
      ],
    },
    {
      id: 8,
      name: '정형 데이터 마이닝',
      subTopics: [
        { id: 25, name: '데이터 마이닝 개요' },
        { id: 26, name: '분류분석(Classification)' },
        { id: 27, name: '군집분석(Clustering)' },
        { id: 28, name: '연관분석(Association Analysis)' },
      ],
    },
  ],
}

// 전체 과목 목록
export const SUBJECT_CATEGORIES: SubjectCategory[] = [
  dataUnderstanding,
  dataAnalysisPlanning,
  dataAnalysis,
]

// ID로 과목 찾기
export const getSubjectById = (id: number): SubjectCategory | undefined => {
  return SUBJECT_CATEGORIES.find((subject) => subject.id === id)
}

// ID로 주요항목 찾기
export const getMainTopicById = (
  subjectId: number,
  mainTopicId: number
): MainTopicCategory | undefined => {
  const subject = getSubjectById(subjectId)
  return subject?.mainTopics.find((mainTopic) => mainTopic.id === mainTopicId)
}

// ID로 세부항목 찾기
export const getSubTopicById = (
  subjectId: number,
  mainTopicId: number,
  subTopicId: number
): SubTopicCategory | undefined => {
  const mainTopic = getMainTopicById(subjectId, mainTopicId)
  return mainTopic?.subTopics.find((subTopic) => subTopic.id === subTopicId)
}

// 과목 목록 (API 호환 형식)
export const getSubjects = () => {
  return SUBJECT_CATEGORIES.map((subject) => ({
    id: subject.id,
    name: subject.name,
    description: null,
    quiz_count: null,
    created_at: '',
  }))
}

// 주요항목 목록 (API 호환 형식)
export const getMainTopics = (subjectId: number) => {
  const subject = getSubjectById(subjectId)
  if (!subject) {
    return { main_topics: [], total: 0 }
  }
  return {
    main_topics: subject.mainTopics.map((mainTopic) => ({
      id: mainTopic.id,
      name: mainTopic.name,
      description: null,
      subject_id: subjectId,
    })),
    total: subject.mainTopics.length,
  }
}

// 세부항목 목록 (API 호환 형식)
export const getSubTopics = (subjectId: number, mainTopicId: number) => {
  const mainTopic = getMainTopicById(subjectId, mainTopicId)
  if (!mainTopic) {
    return { sub_topics: [], total: 0 }
  }
  return {
    sub_topics: mainTopic.subTopics.map((subTopic) => ({
      id: subTopic.id,
      name: subTopic.name,
      description: null,
      main_topic_id: mainTopicId,
    })),
    total: mainTopic.subTopics.length,
  }
}
