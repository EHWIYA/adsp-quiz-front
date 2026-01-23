import { useState } from 'react'
import * as styles from './Admin.css'
import { Tab } from '../../components/Tab/Tab'
import { Dashboard } from './Dashboard'
import { QuizManagement } from './QuizManagement'
import { CoreContentRegistration } from './CoreContentRegistration'

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'core-content' | 'quiz-management'>('dashboard')

  const tabs = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'core-content', label: '핵심 정보 등록' },
    { id: 'quiz-management', label: '문제 관리' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'core-content':
        return <CoreContentRegistration />
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
