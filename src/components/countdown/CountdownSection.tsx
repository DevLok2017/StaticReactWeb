import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { format } from 'date-fns'
import { CalendarPlus } from 'lucide-react'
import { useAppConfig } from '../../config/ConfigContext'
import { useDetailsVisible, usePrivacy } from '../../context/PrivacyContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { ShowDetailsButton } from '../common/ShowDetailsButton'
import { CountdownTimer } from './CountdownTimer'
import { downloadIcsFile } from '../../utils/calendar'

export function CountdownSection() {
  const { wedding } = useAppConfig()
  const detailsVisible = useDetailsVisible()
  const { openUnlockModal } = usePrivacy()
  const [revealed, setRevealed] = useState(false)
  const date = new Date(wedding.weddingDate)

  function addToCalendar() {
    if (!detailsVisible) {
      openUnlockModal()
      return
    }
    downloadIcsFile({
      title: `${wedding.coupleNames.bride} & ${wedding.coupleNames.groom}'s Wedding`,
      description: wedding.blessing,
      location: wedding.venue.address || wedding.venue.name,
      start: wedding.weddingDate,
      filename: 'wedding-invitation.ics',
    })
  }

  function onTapReveal() {
    if (!detailsVisible) {
      openUnlockModal()
      return
    }
    setRevealed(true)
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
          <AnimatePresence mode="wait">
            {!detailsVisible ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-background-alt)] px-8 py-10 shadow-[var(--shadow-soft)]"
              >
                <p className="font-script text-4xl tracking-[0.2em] text-[var(--color-primary)]/50 blur-[3px] select-none">
                  •• · ••• · ••••
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">Date kept private for guests</p>
                <ShowDetailsButton />
              </motion.div>
            ) : !revealed ? (
              <motion.button
                key="tap"
                type="button"
                onClick={onTapReveal}
                className="w-full rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-background-alt)] px-8 py-10 shadow-[var(--shadow-soft)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="font-script text-2xl text-[var(--color-primary)]">
                  Tap to reveal our date
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="date"
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-background-alt)] px-8 py-10 shadow-[var(--shadow-soft)]"
                style={{ transformPerspective: 800 }}
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
          </AnimatePresence>
        </Reveal>

        <div className="mt-10">
          {detailsVisible ? (
            <CountdownTimer targetDate={wedding.weddingDate} />
          ) : (
            <div className="flex gap-4 blur-[3px] select-none" aria-hidden>
              {['Days', 'Hours', 'Min', 'Sec'].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="tabular-nums text-3xl text-[var(--color-primary)]">••</span>
                  <span className="text-xs tracking-[0.15em] text-[var(--color-text-muted)] uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <motion.button
          type="button"
          onClick={addToCalendar}
          className="mt-10 flex items-center gap-2 rounded-full border border-[var(--color-gold)] px-6 py-3 text-sm tracking-[0.1em] text-[var(--color-secondary)] uppercase transition-colors hover:bg-[var(--color-background-alt)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <CalendarPlus size={18} />
          Add to Calendar
        </motion.button>
      </Container>
    </section>
  )
}
