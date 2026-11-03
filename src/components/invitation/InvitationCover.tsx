import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppConfig } from '../../config/ConfigContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import { FloralDecoration } from '../common/FloralDecoration'
import { Monogram } from '../common/Monogram'
import { PeacockMotif } from '../common/illustrations/PeacockMotif'

interface InvitationCoverProps {
  enabled: boolean
}

export function InvitationCover({ enabled }: InvitationCoverProps) {
  const { wedding } = useAppConfig()
  const [open, setOpen] = useState(!enabled)

  useScrollLock(enabled && !open)

  if (!enabled) return null

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)] px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloralDecoration variant="corner" className="absolute top-4 left-4 h-20 w-20" />
          <FloralDecoration
            variant="corner"
            className="absolute right-4 bottom-4 h-20 w-20 rotate-180"
          />
          <PeacockMotif className="absolute bottom-6 left-6 h-20 w-20 opacity-60 sm:h-24 sm:w-24" />
          <PeacockMotif className="absolute right-6 bottom-6 h-20 w-20 scale-x-[-1] opacity-60 sm:h-24 sm:w-24" />

          <motion.div
            className="relative flex max-w-md flex-col items-center gap-6 rounded-[var(--radius-lg)] border border-[var(--color-gold)]/40 bg-[var(--color-background-alt)] px-8 py-12 text-center shadow-[var(--shadow-strong)]"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {wedding.blessing && (
              <p className="text-sm tracking-wide text-[var(--color-text-muted)]">
                {wedding.blessing}
              </p>
            )}

            <Monogram text={wedding.monogram ?? `${wedding.coupleNames.bride[0]} & ${wedding.coupleNames.groom[0]}`} />

            <div>
              <h1 className="font-script text-4xl text-[var(--color-primary)] sm:text-5xl">
                {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom}
              </h1>
              <p className="mt-2 text-sm tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
                request the pleasure of your company
              </p>
            </div>

            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)] px-8 py-3 text-sm tracking-[0.15em] text-white uppercase shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
              whileTap={{ scale: 0.96 }}
            >
              Tap to Open
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
