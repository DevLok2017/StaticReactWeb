import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ScrollIndicator() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="flex flex-col items-center gap-1 text-[var(--color-text-muted)]"
      animate={reducedMotion ? {} : { y: [0, 8, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
      <ChevronDown size={20} />
    </motion.div>
  )
}
