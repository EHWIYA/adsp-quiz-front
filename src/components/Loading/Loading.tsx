import { createPortal } from 'react-dom'
import * as styles from './Loading.css'

interface LoadingProps {
  isLoading: boolean
}

export const Loading = ({ isLoading }: LoadingProps) => {
  if (!isLoading) return null

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    </div>,
    document.body
  )
}
