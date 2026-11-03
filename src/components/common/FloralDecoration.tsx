import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAppConfig } from '../../config/ConfigContext'
import { cn } from '../../utils/cn'
import { FloralCornerBorder } from './illustrations/FloralCornerBorder'

interface FloralDecorationProps {
  className?: string
  variant?: 'corner' | 'divider'
}

export function FloralDecoration({ className, variant = 'corner' }: FloralDecorationProps) {
  const reducedMotion = useReducedMotion()
  const { animations } = useAppConfig()
  const shouldFloat = !reducedMotion && animations.floating.enabled

  const svg =
    variant === 'corner' ? (
      <FloralCornerBorder className="h-full w-full text-[var(--color-gold)]" />
    ) : (
      <svg viewBox="0 0 200 24" fill="none" className="h-full w-full text-[var(--color-gold)]">
        <path d="M0 12h70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M130 12h70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="12" r="6" fill="currentColor" opacity="0.7" />
        <circle cx="85" cy="12" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="115" cy="12" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    )

  if (!shouldFloat) {
    return <div className={cn('pointer-events-none select-none', className)}>{svg}</div>
  }

  return (
    <motion.div
      className={cn('pointer-events-none select-none', className)}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: animations.floating.duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {svg}
    </motion.div>
  )
}
