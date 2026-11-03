import { MapPin, Navigation } from 'lucide-react'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { PlaceholderImage } from '../common/PlaceholderImage'

export function VenueSection() {
  const { wedding } = useAppConfig()
  const { venue } = wedding

  return (
    <section id="venue" className="bg-[var(--color-background-alt)] py-20">
      <Container className="text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Join Us At</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">The Venue</h2>
          <SectionDivider />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-gold)]/30 bg-[var(--color-background)] shadow-[var(--shadow-soft)]">
          <PlaceholderImage
            src={venue.photo ?? venue.mapImage}
            alt={venue.name}
            label="Venue photo / map"
            className="aspect-video w-full object-cover"
          />
          <div className="flex flex-col items-center gap-2 p-8">
            <MapPin className="text-[var(--color-gold)]" size={24} />
            <h3 className="text-2xl text-[var(--color-primary)]">{venue.name}</h3>
            <p className="text-sm text-[var(--color-text)]">
              {[venue.address, venue.city, venue.state, venue.country].filter(Boolean).join(', ')}
            </p>

            {venue.mapsUrl && (
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)] px-6 py-3 text-sm tracking-[0.1em] text-white uppercase shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
