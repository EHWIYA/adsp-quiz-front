import { create } from 'zustand'

interface UIState {
  isModalOpen: boolean
  modalContent: React.ReactNode | null
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  modalContent: null,
  openModal: (content: React.ReactNode) => {
    set({ isModalOpen: true, modalContent: content })
  },
  closeModal: () => {
    set({ isModalOpen: false, modalContent: null })
  },
  isSidebarOpen: false,
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
  },
  isLoading: false,
  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
}))
