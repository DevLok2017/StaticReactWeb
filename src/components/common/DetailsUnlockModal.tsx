import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { KeyRound, X } from 'lucide-react'
import { usePrivacy } from '../../context/PrivacyContext'

export function DetailsUnlockModal() {
  const { modalOpen, closeUnlockModal, tryUnlock } = usePrivacy()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!modalOpen) return
    setCode('')
    setError(false)
    const t = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => window.clearTimeout(t)
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeUnlockModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, closeUnlockModal])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = tryUnlock(code)
    setError(!ok)
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeUnlockModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--color-gold)]/40 bg-[var(--color-background-alt)] p-6 shadow-[var(--shadow-strong)]"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeUnlockModal}
              aria-label="Close"
              className="absolute top-3 right-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
            >
              <X size={18} />
            </button>

            <div className="mb-4 flex items-center gap-2 text-[var(--color-primary)]">
              <KeyRound size={18} className="text-[var(--color-gold)]" />
              <h2 id={titleId} className="text-lg tracking-wide">
                Show wedding details
              </h2>
            </div>

            <p className="mb-4 text-sm text-[var(--color-text-muted)]">
              Enter the invite code shared with guests to reveal the date, venue, and ceremony timings.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="details-code">
                Invite code
              </label>
              <input
                ref={inputRef}
                id="details-code"
                type="text"
                autoComplete="off"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  setError(false)
                }}
                placeholder="Invite code"
                className="rounded-[var(--radius-md)] border border-[var(--color-gold)]/50 bg-[var(--color-background)] px-4 py-2.5 text-center tracking-[0.2em] text-[var(--color-secondary)] outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
              />
              {error && (
                <p className="text-center text-xs text-[var(--color-primary)]" role="alert">
                  That code doesn’t match. Please try again.
                </p>
              )}
              <button
                type="submit"
                className="mt-1 rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)] px-5 py-2.5 text-sm tracking-[0.12em] text-white uppercase shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
              >
                Unlock
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
