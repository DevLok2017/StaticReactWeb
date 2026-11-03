import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppConfig } from '../../config/ConfigContext'
import { useMusic } from '../../context/MusicContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { FloralDecoration } from '../common/FloralDecoration'
import { Monogram } from '../common/Monogram'
import { PeacockMotif } from '../common/illustrations/PeacockMotif'

interface InvitationCoverProps {
  enabled: boolean
}

export function InvitationCover({ enabled }: InvitationCoverProps) {
  const { wedding } = useAppConfig()
  const { startAfterOpen } = useMusic()
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState(!enabled)

  useScrollLock(enabled && !open)

  if (!enabled) return null

  function handleOpen() {
    setOpen(true)
    void startAfterOpen()
  }

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[var(--color-background)] px-6"
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.06, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {!reducedMotion &&
            Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute text-[var(--color-gold)]/35"
                style={{ left: `${8 + i * 11}%`, top: `${10 + (i % 3) * 25}%` }}
                animate={{ y: [0, -12, 0], rotate: [0, 15, -10, 0], opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              >
                ❀
              </motion.span>
            ))}

          <FloralDecoration variant="corner" className="absolute top-4 left-4 h-20 w-20" />
          <FloralDecoration
            variant="corner"
            className="absolute right-4 bottom-4 h-20 w-20 rotate-180"
          />
          <PeacockMotif className="absolute bottom-6 left-6 h-20 w-20 opacity-60 sm:h-24 sm:w-24" />
          <PeacockMotif className="absolute right-6 bottom-6 h-20 w-20 scale-x-[-1] opacity-60 sm:h-24 sm:w-24" />

          <motion.div
            className="relative flex max-w-md flex-col items-center gap-6 rounded-[var(--radius-lg)] border border-[var(--color-gold)]/40 bg-[var(--color-background-alt)] px-8 py-12 text-center shadow-[var(--shadow-strong)]"
            initial={reducedMotion ? { opacity: 0 } : { scale: 0.88, opacity: 0, rotateX: 12 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { scale: 1.08, opacity: 0, rotateY: -8 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1000 }}
          >
            {wedding.blessing && (
              <motion.p
                className="text-sm tracking-wide text-[var(--color-text-muted)]"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                {wedding.blessing}
              </motion.p>
            )}

            <Monogram
              text={
                wedding.monogram ??
                `${wedding.coupleNames.bride[0]} & ${wedding.coupleNames.groom[0]}`
              }
            />

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
              onClick={handleOpen}
              className="rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)] px-8 py-3 text-sm tracking-[0.15em] text-white uppercase shadow-[var(--shadow-soft)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={
                reducedMotion
                  ? undefined
                  : { boxShadow: ['0 0 0 0 rgba(201,162,75,0.4)', '0 0 0 12px rgba(201,162,75,0)'] }
              }
              transition={
                reducedMotion
                  ? undefined
                  : { duration: 2, repeat: Infinity, ease: 'easeOut' }
              }
            >
              Tap to Open
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
