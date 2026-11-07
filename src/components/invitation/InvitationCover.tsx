import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppConfig } from '../../config/ConfigContext'
import { useMusic } from '../../context/MusicContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GaneshaMotif } from './illustrations/GaneshaMotif'
import { WaxSeal } from './illustrations/WaxSeal'
import { ToranCorner } from './illustrations/ToranCorner'
import { PalaceElephantCorner } from './illustrations/PalaceElephantCorner'
import { ScallopedArch } from './illustrations/ScallopedArch'

interface InvitationCoverProps {
  enabled: boolean
}

function sealInitials(monogram: string | undefined, bride: string, groom: string): string {
  if (monogram) {
    const letters = monogram.replace(/[^A-Za-z]/g, '').toUpperCase()
    if (letters.length >= 2) return `${letters[0]} ${letters[1]}`
    if (letters.length === 1) return letters
  }
  return `${groom[0]?.toUpperCase() ?? 'G'} ${bride[0]?.toUpperCase() ?? 'B'}`
}

export function InvitationCover({ enabled }: InvitationCoverProps) {
  const { wedding } = useAppConfig()
  const { startAfterOpen } = useMusic()
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState(!enabled)

  useScrollLock(enabled && !open)

  const initials = useMemo(
    () =>
      sealInitials(
        wedding.monogram,
        wedding.coupleNames.bride,
        wedding.coupleNames.groom,
      ),
    [wedding.monogram, wedding.coupleNames.bride, wedding.coupleNames.groom],
  )

  if (!enabled) return null

  function handleOpen() {
    setOpen(true)
    void startAfterOpen()
  }

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="invitation-parchment fixed inset-0 z-50 flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Wedding invitation cover"
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04, filter: 'blur(8px)' }
          }
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top flap */}
          <motion.div
            className="relative z-20 flex flex-[0.95] flex-col items-center"
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { y: '-28%', rotateX: -28, opacity: 0.2, transformOrigin: 'top center' }
            }
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <ScallopedArch className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full text-[var(--color-gold)] sm:h-14" />

            <ToranCorner className="pointer-events-none absolute top-2 left-0 h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56" />
            <ToranCorner
              mirror
              className="pointer-events-none absolute top-2 right-0 h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56"
            />

            <div className="relative z-10 mt-14 flex flex-col items-center px-6 sm:mt-16">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <GaneshaMotif className="h-14 w-16 text-[var(--color-gold)] sm:h-16 sm:w-20" />
              </motion.div>
              {wedding.blessing && (
                <motion.p
                  className="invitation-blessing mt-2 text-center text-base tracking-wide text-[var(--color-secondary)] sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                >
                  {wedding.blessing}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Thread + seal */}
          <div className="relative z-30 flex items-center justify-center">
            <div className="invitation-thread absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2" />
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Tap to open the invitation"
              className="relative z-10 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
              initial={reducedMotion ? { opacity: 0 } : { scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { scale: 0.6, opacity: 0, y: 24 }
              }
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <WaxSeal initials={initials} className="h-28 w-28 drop-shadow-xl sm:h-36 sm:w-36" />
              {!reducedMotion && (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(122,31,43,0.35)',
                      '0 0 0 16px rgba(122,31,43,0)',
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          </div>

          {/* Bottom panel */}
          <motion.div
            className="relative z-20 flex flex-1 flex-col items-center justify-between px-6 pb-8 pt-6"
            exit={reducedMotion ? { opacity: 0 } : { y: '18%', opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="max-w-xs font-[family-name:var(--font-heading)] text-lg text-[var(--color-secondary)] italic sm:text-xl">
                We cordially invite you to the wedding of …
              </p>
              <p className="font-script text-3xl text-[var(--color-primary)] sm:text-4xl">
                {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom}
              </p>
              <motion.button
                type="button"
                onClick={handleOpen}
                className="mt-1 font-[family-name:var(--font-heading)] text-base tracking-[0.08em] text-[var(--color-text-muted)] underline decoration-[var(--color-gold)] underline-offset-6 transition-colors hover:text-[var(--color-primary)]"
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: [0.65, 1, 0.65] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                Tap to open
              </motion.button>
            </div>

            <div className="pointer-events-none relative mt-4 flex w-full max-w-3xl items-end justify-between">
              <PalaceElephantCorner className="h-32 w-40 sm:h-44 sm:w-56 md:h-52 md:w-64" />
              <PalaceElephantCorner
                mirror
                className="h-32 w-40 sm:h-44 sm:w-56 md:h-52 md:w-64"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
