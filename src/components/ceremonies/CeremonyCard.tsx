import { motion } from 'framer-motion'
import { format } from 'date-fns'
import type { WeddingConfig } from '../../schemas/wedding'
import { useDetailsVisible, usePrivacy } from '../../context/PrivacyContext'
import { Reveal } from '../common/Reveal'
import { PlaceholderImage } from '../common/PlaceholderImage'
import { ShowDetailsButton } from '../common/ShowDetailsButton'

type Ceremony = WeddingConfig['ceremonies']['bride'][number]

export function CeremonyCard({ ceremony, index }: { ceremony: Ceremony; index: number }) {
  const detailsVisible = useDetailsVisible()
  const { openUnlockModal } = usePrivacy()
  const date = new Date(ceremony.date)

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-gold)]/30 bg-[var(--color-background-alt)] shadow-[var(--shadow-soft)] sm:flex-row"
        whileHover={{ y: -4, boxShadow: '0 14px 36px rgba(43,33,24,0.14)' }}
        transition={{ duration: 0.3 }}
      >
        <PlaceholderImage
          src={ceremony.image}
          alt={ceremony.name}
          label={`${ceremony.name} photo`}
          className="h-48 w-full object-cover sm:h-auto sm:w-56"
        />
        <div className="flex flex-1 flex-col gap-2 p-6 text-left">
          <h3 className="text-2xl text-[var(--color-primary)]">{ceremony.name}</h3>
          {detailsVisible ? (
            <p className="text-xs tracking-[0.15em] text-[var(--color-gold)] uppercase">
              {format(date, 'EEEE, d MMMM yyyy')} · {ceremony.startTime}
              {ceremony.endTime ? ` – ${ceremony.endTime}` : ''}
            </p>
          ) : (
            <button
              type="button"
              onClick={openUnlockModal}
              className="w-fit text-left text-xs tracking-[0.15em] text-[var(--color-gold)]/60 uppercase blur-[2px] transition-all hover:blur-0"
            >
              ••••• · •• ••• · ••:••
            </button>
          )}
          {ceremony.description && (
            <p className="text-sm text-[var(--color-text)]">{ceremony.description}</p>
          )}
          {detailsVisible ? (
            ceremony.venue && (
              <p className="text-sm text-[var(--color-text-muted)]">📍 {ceremony.venue}</p>
            )
          ) : (
            <p className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <span className="blur-[2px] select-none">📍 •••••••••••••</span>
              {index === 0 && <ShowDetailsButton />}
            </p>
          )}
          {ceremony.dressCode && (
            <p className="text-xs text-[var(--color-text-muted)]">Dress code: {ceremony.dressCode}</p>
          )}
          {ceremony.instructions && detailsVisible && (
            <p className="text-xs text-[var(--color-text-muted)] italic">{ceremony.instructions}</p>
          )}
        </div>
      </motion.div>
    </Reveal>
  )
}
