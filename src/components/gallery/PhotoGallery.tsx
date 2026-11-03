import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { PlaceholderImage } from '../common/PlaceholderImage'

export function PhotoGallery() {
  const { wedding } = useAppConfig()
  const [index, setIndex] = useState(-1)

  if (wedding.gallery.length === 0) return null

  const slides = wedding.gallery.map((img) => ({
    src: img.src,
    alt: img.caption ?? 'Gallery photo',
    width: img.width,
    height: img.height,
  }))

  return (
    <section id="gallery" className="bg-[var(--color-background)] py-20">
      <Container className="text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Memories</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Photo Gallery</h2>
          <SectionDivider />
        </Reveal>

        <div className="mt-10 columns-2 gap-3 sm:columns-3">
          {wedding.gallery.map((image, i) => (
            <Reveal key={image.src + i} delay={i * 0.03} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="block w-full overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
                aria-label={`Open ${image.caption ?? 'photo'} in gallery`}
              >
                <PlaceholderImage
                  src={image.thumb ?? image.src}
                  alt={image.caption ?? 'Wedding photo'}
                  label="Gallery photo"
                  className="w-full object-cover"
                  width={image.width}
                  height={image.height}
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  )
}
