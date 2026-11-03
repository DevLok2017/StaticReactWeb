import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAppConfig } from '../../config/ConfigContext'
import { cn } from '../../utils/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  as?: 'div' | 'section'
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
}: RevealProps) {
  const { ref, inView } = useScrollReveal()
  const reducedMotion = useReducedMotion()
  const { animations } = useAppConfig()

  if (reducedMotion || !animations.enabled) {
    const Tag = as
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    )
  }

  const distance = animations.scrollReveal.distance
  const offsets: Record<typeof direction, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }
  const offset = offsets[direction]

  const MotionTag = as === 'section' ? motion.section : motion.div

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: animations.scrollReveal.duration,
        delay: animations.scrollReveal.delay + delay,
        ease: animations.scrollReveal.easing,
      }}
    >
      {children}
    </MotionTag>
  )
}
