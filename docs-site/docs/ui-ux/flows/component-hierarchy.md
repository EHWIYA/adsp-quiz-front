# 컴포넌트 계층 구조

## 전체 컴포넌트 트리

```mermaid
graph TD
    A[App] --> B[Navigation]
    A --> C[Routes]
    C --> D[Home]
    C --> E[Training]
    C --> F[Exam]
    C --> G[Mypage]
    
    B --> H[ThemeToggle]
    
    D --> I[Button]
    D --> J[StatCard]
    
    E --> K[QuestionDisplay]
    K --> L[QuizCard]
    
    F --> M[Timer]
    F --> K
    
    G --> N[ResultAnalysis]
    G --> I
    G --> O[ProfileCard]
    
    style A fill:#e1f5ff
    style D fill:#fff4e1
    style E fill:#fff4e1
    style F fill:#fff4e1
    style G fill:#fff4e1
```

## 공통 컴포넌트

```mermaid
graph LR
    A[Button] --> B[Primary/Secondary/Outline/Ghost]
    A --> C[Size: sm/md/lg]
    
    D[Modal] --> E[Overlay]
    D --> F[Header]
    D --> G[Content]
    D --> H[Footer]
    
    I[QuizCard] --> J[Category]
    I --> K[Question]
    I --> L[Options]
    I --> M[Explanation]
    
    N[Timer] --> O[Time Display]
    N --> P[Control Button]
```

## 페이지별 컴포넌트 구성

### Home 페이지
- Hero Section
- StatCard (3개)
- Button (2개)
- ActivityList

### Training 페이지
- Header (제목, 진행률)
- QuestionDisplay
  - QuizCard
- Footer (다음 문제 버튼)

### Exam 페이지
- Header (제목, Timer)
- ProgressBar
- QuestionDisplay
  - QuizCard
- Footer (제출 버튼)

### Mypage 페이지
- ProfileCard
- StatCard (4개)
- ResultAnalysis
- SettingsList
