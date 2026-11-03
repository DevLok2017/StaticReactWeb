import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { ContactCard } from './ContactCard'

export function RSVPSection() {
  const { wedding } = useAppConfig()
  const coupleNames = `${wedding.coupleNames.bride} & ${wedding.coupleNames.groom}`
  const hasContacts = wedding.rsvp.bride.length > 0 || wedding.rsvp.groom.length > 0
  if (!hasContacts) return null

  return (
    <section id="rsvp" className="bg-[var(--color-background-alt)] py-20">
      <Container className="text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">RSVP</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Reach Out To Us</h2>
          <SectionDivider />
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-text-muted)]">
            Call or message any of our family contacts below to confirm your attendance.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {wedding.rsvp.bride.length > 0 && (
            <div>
              <h3 className="mb-5 font-script text-2xl text-[var(--color-primary)]">
                {wedding.coupleNames.bride}&apos;s Side
              </h3>
              <div className="flex flex-col gap-4">
                {wedding.rsvp.bride.map((contact) => (
                  <Reveal key={contact.name}>
                    <ContactCard contact={contact} coupleNames={coupleNames} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
          {wedding.rsvp.groom.length > 0 && (
            <div>
              <h3 className="mb-5 font-script text-2xl text-[var(--color-primary)]">
                {wedding.coupleNames.groom}&apos;s Side
              </h3>
              <div className="flex flex-col gap-4">
                {wedding.rsvp.groom.map((contact) => (
                  <Reveal key={contact.name}>
                    <ContactCard contact={contact} coupleNames={coupleNames} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
