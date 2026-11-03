import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { CalendarPlus } from 'lucide-react'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { CountdownTimer } from './CountdownTimer'
import { downloadIcsFile } from '../../utils/calendar'

export function CountdownSection() {
  const { wedding } = useAppConfig()
  const [revealed, setRevealed] = useState(false)
  const date = new Date(wedding.weddingDate)

  function addToCalendar() {
    downloadIcsFile({
      title: `${wedding.coupleNames.bride} & ${wedding.coupleNames.groom}'s Wedding`,
      description: wedding.blessing,
      location: wedding.venue.address || wedding.venue.name,
      start: wedding.weddingDate,
      filename: 'wedding-invitation.ics',
    })
  }

  return (
    <section id="countdown" className="bg-[var(--color-background)] py-20">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Save the Date</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Mark Your Calendar</h2>
          <SectionDivider />
        </Reveal>

        <Reveal className="mt-8 w-full max-w-sm">
          {!revealed ? (
            <motion.button
              type="button"
              onClick={() => setRevealed(true)}
              className="w-full rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-background-alt)] px-8 py-10 shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-script text-2xl text-[var(--color-primary)]">
                Tap to reveal our date
              </span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-background-alt)] px-8 py-10 shadow-[var(--shadow-soft)]"
            >
              <p className="text-sm tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
                {format(date, 'EEEE')}
              </p>
              <p className="mt-1 font-script text-5xl text-[var(--color-primary)]">
                {format(date, 'd MMMM')}
              </p>
              <p className="text-lg text-[var(--color-secondary)]">{format(date, 'yyyy')}</p>
            </motion.div>
          )}
        </Reveal>

        <div className="mt-10">
          <CountdownTimer targetDate={wedding.weddingDate} />
        </div>

        <button
          type="button"
          onClick={addToCalendar}
          className="mt-10 flex items-center gap-2 rounded-full border border-[var(--color-gold)] px-6 py-3 text-sm tracking-[0.1em] text-[var(--color-secondary)] uppercase transition-colors hover:bg-[var(--color-background-alt)]"
        >
          <CalendarPlus size={18} />
          Add to Calendar
        </button>
      </Container>
    </section>
  )
}
