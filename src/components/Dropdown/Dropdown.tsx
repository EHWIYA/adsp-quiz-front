import { useState, useRef, useEffect } from 'react'
import * as styles from './Dropdown.css'

export interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface DropdownProps {
  id?: string
  value: string | number | null
  options: DropdownOption[]
  placeholder?: string
  disabled?: boolean
  onChange: (value: string | number | null) => void
  className?: string
}

export const Dropdown = ({
  id,
  value,
  options,
  placeholder = '선택하세요',
  disabled = false,
  onChange,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      // mousedown과 click 모두 사용하여 더 안정적인 감지
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className || ''}`}>
      <button
        id={id}
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.selectedText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {options.length === 0 ? (
            <div className={styles.emptyOption}>옵션이 없습니다</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${styles.option} ${value === option.value ? styles.optionSelected : ''}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
