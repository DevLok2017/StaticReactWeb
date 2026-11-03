import { motion } from 'framer-motion'
import { Music, Pause } from 'lucide-react'
import { useMusic } from '../../context/MusicContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function MusicPlayer() {
  const { available, visible, playing, toggle } = useMusic()
  const reducedMotion = useReducedMotion()

  if (!available || !visible) return null

  return (
    <motion.div
      className="fixed right-4 bottom-24 z-40 sm:right-6 sm:bottom-28"
      initial={{ opacity: 0, scale: 0.8, x: 12 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-background-alt)] text-[var(--color-primary)] shadow-[var(--shadow-strong)] transition-colors hover:bg-[var(--color-background)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] sm:h-14 sm:w-14"
        whileTap={{ scale: 0.94 }}
        animate={
          playing && !reducedMotion
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(201,162,75,0.35)',
                  '0 0 0 10px rgba(201,162,75,0)',
                  '0 0 0 0 rgba(201,162,75,0.35)',
                ],
              }
            : { boxShadow: '0 10px 40px rgba(43,33,24,0.18)' }
        }
        transition={
          playing && !reducedMotion
            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        {playing ? <Pause size={20} /> : <Music size={20} />}
      </motion.button>
    </motion.div>
  )
}
