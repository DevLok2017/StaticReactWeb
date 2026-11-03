import { motion } from 'framer-motion'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { PlaceholderImage } from '../common/PlaceholderImage'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ChildhoodMemories() {
  const { wedding } = useAppConfig()
  const reducedMotion = useReducedMotion()
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

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {wedding.childhoodMemories.map((memory, index) => (
            <Reveal key={index} delay={index * 0.1} className="w-56">
              <div className="rounded-[var(--radius-md)] border-4 border-white bg-white p-2 shadow-[var(--shadow-soft)]">
                <PlaceholderImage
                  src={memory.photo}
                  alt={memory.caption ?? 'Childhood memory'}
                  label="Childhood photo"
                  className="aspect-square w-full rounded-sm object-cover"
                />
              </div>
              {memory.caption && (
                <p className="mt-3 font-script text-xl text-[var(--color-primary)]">{memory.caption}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
