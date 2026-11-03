import { format } from 'date-fns'
import type { WeddingConfig } from '../../schemas/wedding'
import { Reveal } from '../common/Reveal'
import { PlaceholderImage } from '../common/PlaceholderImage'

type Ceremony = WeddingConfig['ceremonies']['bride'][number]

export function CeremonyCard({ ceremony, index }: { ceremony: Ceremony; index: number }) {
  const date = new Date(ceremony.date)

  return (
    <Reveal delay={index * 0.08}>
      <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-gold)]/30 bg-[var(--color-background-alt)] shadow-[var(--shadow-soft)] sm:flex-row">
        <PlaceholderImage
          src={ceremony.image}
          alt={ceremony.name}
          label={`${ceremony.name} photo`}
          className="h-48 w-full object-cover sm:h-auto sm:w-56"
        />
        <div className="flex flex-1 flex-col gap-2 p-6 text-left">
          <h3 className="text-2xl text-[var(--color-primary)]">{ceremony.name}</h3>
          <p className="text-xs tracking-[0.15em] text-[var(--color-gold)] uppercase">
            {format(date, 'EEEE, d MMMM yyyy')} · {ceremony.startTime}
            {ceremony.endTime ? ` – ${ceremony.endTime}` : ''}
          </p>
          {ceremony.description && (
            <p className="text-sm text-[var(--color-text)]">{ceremony.description}</p>
          )}
          {ceremony.venue && (
            <p className="text-sm text-[var(--color-text-muted)]">📍 {ceremony.venue}</p>
          )}
          {ceremony.dressCode && (
            <p className="text-xs text-[var(--color-text-muted)]">Dress code: {ceremony.dressCode}</p>
          )}
          {ceremony.instructions && (
            <p className="text-xs text-[var(--color-text-muted)] italic">{ceremony.instructions}</p>
          )}
        </div>
      </div>
    </Reveal>
  )
}
