import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'
import * as styles from './AlertModal.css'

interface AlertModalProps {
  isOpen: boolean
  title?: string
  message: string
  confirmText?: string
  onClose: () => void
}

export const AlertModal = ({
  isOpen,
  title = '알림',
  message,
  confirmText = '확인',
  onClose,
}: AlertModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <Button variant="primary" onClick={onClose}>
          {confirmText}
        </Button>
      }
    >
      <p className={styles.message}>{message}</p>
    </Modal>
  )
}
