import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { useAppConfig } from '../../config/ConfigContext'
import { useDetailsVisible, usePrivacy } from '../../context/PrivacyContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { PlaceholderImage } from '../common/PlaceholderImage'
import { ShowDetailsButton } from '../common/ShowDetailsButton'

export function VenueSection() {
  const { wedding } = useAppConfig()
  const { venue } = wedding
  const detailsVisible = useDetailsVisible()
  const { openUnlockModal } = usePrivacy()

  return (
    <section id="venue" className="bg-[var(--color-background-alt)] py-20">
      <Container className="text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Join Us At</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">The Venue</h2>
          <SectionDivider />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-gold)]/30 bg-[var(--color-background)] shadow-[var(--shadow-soft)]">
          <div className={detailsVisible ? undefined : 'relative'}>
            <PlaceholderImage
              src={venue.photo ?? venue.mapImage}
              alt={detailsVisible ? venue.name : 'Venue'}
              label="Venue photo / map"
              className={`aspect-video w-full object-cover transition-[filter] duration-500 ${
                detailsVisible ? '' : 'scale-105 blur-md'
              }`}
            />
            {!detailsVisible && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-background)]/35">
                <p className="text-sm tracking-[0.15em] text-[var(--color-secondary)] uppercase">
                  Venue hidden
                </p>
                <ShowDetailsButton className="rounded-full border border-[var(--color-gold)]/60 bg-[var(--color-background-alt)]/90 px-4 py-2" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 p-8">
            <MapPin className="text-[var(--color-gold)]" size={24} />
            {detailsVisible ? (
              <>
                <h3 className="text-2xl text-[var(--color-primary)]">{venue.name}</h3>
                <p className="text-sm text-[var(--color-text)]">
                  {[venue.address, venue.city, venue.state, venue.country].filter(Boolean).join(', ')}
                </p>
                {venue.mapsUrl && (
                  <motion.a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)] px-6 py-3 text-sm tracking-[0.1em] text-white uppercase shadow-[var(--shadow-soft)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Navigation size={16} />
                    Get Directions
                  </motion.a>
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl tracking-[0.2em] text-[var(--color-primary)]/50 blur-[3px] select-none">
                  •••••••••••••
                </h3>
                <p className="text-sm tracking-[0.15em] text-[var(--color-text)]/50 blur-[2px] select-none">
                  •••••••••••••••••••••
                </p>
                <button
                  type="button"
                  onClick={openUnlockModal}
                  className="mt-4 flex items-center gap-2 rounded-full border border-[var(--color-gold)]/50 px-6 py-3 text-sm tracking-[0.1em] text-[var(--color-secondary)] uppercase opacity-70"
                >
                  <Navigation size={16} />
                  Get Directions
                </button>
              </>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
