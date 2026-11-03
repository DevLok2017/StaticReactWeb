import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { CeremonyCard } from './CeremonyCard'

type Side = 'bride' | 'groom'

export function CeremonySection() {
  const { wedding } = useAppConfig()
  const [side, setSide] = useState<Side>('groom')

  const ceremonies = wedding.ceremonies[side]

  return (
    <section id="ceremonies" className="bg-[var(--color-background)] py-20">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Festivities</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Ceremonies</h2>
          <SectionDivider />
          <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-text-muted)]">
            Pick your side to see your wedding ceremonies!
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-8 flex w-fit rounded-full border border-[var(--color-gold)] p-1">
          {(['groom', 'bride'] as Side[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              aria-pressed={side === s}
              className={`relative rounded-full px-5 py-2.5 text-sm tracking-[0.1em] uppercase transition-colors sm:px-6 ${
                side === s
                  ? 'text-white'
                  : 'text-[var(--color-secondary)] hover:bg-[var(--color-background-alt)]'
              }`}
            >
              {side === s && (
                <motion.span
                  layoutId="ceremony-side-pill"
                  className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {s === 'groom' ? 'Ladke Wale' : 'Ladki Wale'}
              </span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={side}
            initial={{ opacity: 0, x: side === 'bride' ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: side === 'bride' ? -24 : 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-6"
          >
            {ceremonies.length === 0 ? (
              <p className="text-center text-sm text-[var(--color-text-muted)]">
                Ceremony details coming soon.
              </p>
            ) : (
              ceremonies.map((ceremony, index) => (
                <CeremonyCard key={ceremony.id} ceremony={ceremony} index={index} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

      </Container>
    </section>
  )
}
