import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAppConfig } from '../config/ConfigContext'

const STORAGE_KEY = 'wedding-details-unlocked'

interface PrivacyContextValue {
  lockEnabled: boolean
  unlocked: boolean
  modalOpen: boolean
  openUnlockModal: () => void
  closeUnlockModal: () => void
  tryUnlock: (code: string) => boolean
}

const PrivacyContext = createContext<PrivacyContextValue | null>(null)

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const { wedding } = useAppConfig()
  const lockEnabled = wedding.privacy?.lockDetails ?? true
  const expectedCode = (wedding.privacy?.detailsCode ?? 'AK47').trim()

  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })
  const [modalOpen, setModalOpen] = useState(false)

  const openUnlockModal = useCallback(() => setModalOpen(true), [])
  const closeUnlockModal = useCallback(() => setModalOpen(false), [])

  const tryUnlock = useCallback(
    (code: string) => {
      if (code.trim().toUpperCase() === expectedCode.toUpperCase()) {
        setUnlocked(true)
        try {
          sessionStorage.setItem(STORAGE_KEY, '1')
        } catch {
          /* ignore */
        }
        setModalOpen(false)
        return true
      }
      return false
    },
    [expectedCode],
  )

  const value = useMemo(
    () => ({
      lockEnabled,
      unlocked: !lockEnabled || unlocked,
      modalOpen,
      openUnlockModal,
      closeUnlockModal,
      tryUnlock,
    }),
    [lockEnabled, unlocked, modalOpen, openUnlockModal, closeUnlockModal, tryUnlock],
  )

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>
}

export function usePrivacy(): PrivacyContextValue {
  const ctx = useContext(PrivacyContext)
  if (!ctx) throw new Error('usePrivacy must be used within PrivacyProvider')
  return ctx
}

export function useDetailsVisible(): boolean {
  const { unlocked } = usePrivacy()
  return unlocked
}
