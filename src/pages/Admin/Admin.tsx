import { useState } from 'react'
import * as styles from './Admin.css'
import { Tab } from '../../components/Tab/Tab'
import { Dashboard } from './Dashboard'
import { QuizManagement } from './QuizManagement'
import { CoreContentRegistration } from './CoreContentRegistration'
import { AutoClassificationReview } from './AutoClassificationReview'
import { AutoClassificationSettings } from './AutoClassificationSettings'

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'core-content' | 'auto-review' | 'auto-settings' | 'quiz-management'
  >('dashboard')

  const tabs = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'core-content', label: '핵심 정보 등록' },
    { id: 'auto-review', label: '자동 분류 검수' },
    { id: 'auto-settings', label: '자동 분류 설정' },
    { id: 'quiz-management', label: '문제 관리' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'core-content':
        return <CoreContentRegistration />
      case 'auto-review':
        return <AutoClassificationReview />
      case 'auto-settings':
        return <AutoClassificationSettings />
      case 'quiz-management':
        return <QuizManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>관리 페이지</h1>
      </div>

      <Tab tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId as typeof activeTab)}>
        {renderTabContent()}
      </Tab>
    </div>
  )
}
