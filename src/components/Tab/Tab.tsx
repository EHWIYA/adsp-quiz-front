import * as styles from './Tab.css'

interface TabProps {
  tabs: Array<{
    id: string
    label: string
  }>
  activeTab: string
  onTabChange: (tabId: string) => void
  children: React.ReactNode
}

export const Tab = ({ tabs, activeTab, onTabChange, children }: TabProps) => {
  return (
    <div>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{children}</div>
    </div>
  )
}
