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
  const [side, setSide] = useState<Side>('bride')

  const ceremonies = wedding.ceremonies[side]

  return (
    <section id="ceremonies" className="bg-[var(--color-background)] py-20">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Festivities</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Wedding Ceremonies</h2>
          <SectionDivider />
        </Reveal>

        <Reveal className="mx-auto mt-8 flex w-fit rounded-full border border-[var(--color-gold)] p-1">
          {(['bride', 'groom'] as Side[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              aria-pressed={side === s}
              className={`rounded-full px-6 py-2 text-sm tracking-[0.1em] uppercase transition-colors ${
                side === s
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-secondary)] hover:bg-[var(--color-background-alt)]'
              }`}
            >
              {s === 'bride' ? wedding.coupleNames.bride : wedding.coupleNames.groom}&apos;s Side
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={side}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
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
