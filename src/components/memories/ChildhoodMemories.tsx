import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { PlaceholderImage } from '../common/PlaceholderImage'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ChildhoodMemories() {
  const { wedding } = useAppConfig()
  const reducedMotion = useReducedMotion()
  const [cleared, setCleared] = useState(false)

  if (wedding.childhoodMemories.length === 0) return null

  return (
    <section id="memories" className="relative overflow-hidden bg-[var(--color-background-alt)] py-20">
      {!reducedMotion &&
        Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-[var(--color-gold)]/40"
            style={{ left: `${(i + 1) * 14}%`, top: '-5%' }}
            animate={{ y: ['0%', '120%'], rotate: [0, 180] }}
            transition={{ duration: 10 + i, repeat: Infinity, delay: i * 1.3, ease: 'linear' }}
            aria-hidden="true"
          >
            ❀
          </motion.span>
        ))}

      <Container className="relative text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Little Ones</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Childhood Memories</h2>
          <SectionDivider />
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-2xl">
          <div className="flex flex-wrap justify-center gap-8">
            {wedding.childhoodMemories.map((memory, index) => (
              <Reveal key={index} delay={index * 0.1} className="w-56">
                <motion.div
                  className="rounded-[var(--radius-md)] border-4 border-white bg-white p-2 shadow-[var(--shadow-soft)]"
                  whileHover={{ rotate: index % 2 === 0 ? -2 : 2, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <PlaceholderImage
                    src={memory.photo}
                    alt={memory.caption ?? 'Childhood memory'}
                    label="Childhood photo"
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                </motion.div>
                {memory.caption && (
                  <p className="mt-3 font-script text-xl text-[var(--color-primary)]">
                    {memory.caption}
                  </p>
                )}
              </Reveal>
            ))}
          </div>

          <AnimatePresence>
            {!cleared && (
              <motion.button
                type="button"
                onClick={() => setCleared(true)}
                className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)]"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                aria-label="Brush the petals away"
              >
                <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-background-alt)]/55 backdrop-blur-[2px]">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-2xl text-[var(--color-primary)]/55 sm:text-3xl"
                      style={{
                        left: `${(i * 17) % 90}%`,
                        top: `${(i * 23) % 85}%`,
                      }}
                      animate={
                        reducedMotion
                          ? undefined
                          : { y: [0, -6, 0], rotate: [0, 12, -8, 0] }
                      }
                      transition={{ duration: 2.5 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden
                    >
                      ❀
                    </motion.span>
                  ))}
                </div>
                <span className="relative z-10 rounded-full border border-[var(--color-gold)] bg-[var(--color-background)]/90 px-5 py-2 text-xs tracking-[0.15em] text-[var(--color-secondary)] uppercase shadow-[var(--shadow-soft)]">
                  Brush the petals away
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {cleared && (
          <motion.p
            className="mx-auto mt-8 max-w-md text-sm text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Little did they know… they&apos;d grow up to be each other&apos;s forever…
          </motion.p>
        )}
      </Container>
    </section>
  )
}
