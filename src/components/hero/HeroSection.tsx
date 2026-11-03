import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { FloralDecoration } from '../common/FloralDecoration'
import { ScrollIndicator } from '../common/ScrollIndicator'
import { PlaceholderImage } from '../common/PlaceholderImage'
import { MandapArch } from '../common/illustrations/MandapArch'
import { PeacockMotif } from '../common/illustrations/PeacockMotif'

export function HeroSection() {
  const { wedding } = useAppConfig()
  const date = new Date(wedding.weddingDate)

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[var(--color-background-alt)] py-20"
    >
      <MandapArch className="absolute inset-x-0 top-0 h-28 w-full sm:h-40" />

      <FloralDecoration variant="corner" className="absolute top-6 left-6 h-24 w-24 sm:h-32 sm:w-32" />
      <FloralDecoration
        variant="corner"
        className="absolute top-6 right-6 h-24 w-24 rotate-90 sm:h-32 sm:w-32"
      />
      <FloralDecoration
        variant="corner"
        className="absolute bottom-6 left-6 h-24 w-24 -rotate-90 sm:h-32 sm:w-32"
      />
      <FloralDecoration
        variant="corner"
        className="absolute right-6 bottom-6 h-24 w-24 rotate-180 sm:h-32 sm:w-32"
      />

      <PeacockMotif className="absolute top-10 left-2 h-28 w-28 -rotate-12 opacity-80 sm:h-36 sm:w-36 md:left-10" />
      <PeacockMotif className="absolute top-10 right-2 h-28 w-28 scale-x-[-1] rotate-12 opacity-80 sm:h-36 sm:w-36 md:right-10" />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <motion.p
          className="text-sm tracking-[0.3em] text-[var(--color-text-muted)] uppercase"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Together with their families
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="w-full max-w-lg"
        >
          <PlaceholderImage
            src={wedding.heroImage}
            alt={`${wedding.coupleNames.bride} and ${wedding.coupleNames.groom}`}
            label="Hero illustration / couple photo"
            className="aspect-[4/3] w-full rounded-[var(--radius-lg)] object-cover shadow-[var(--shadow-strong)]"
            loading="eager"
          />
        </motion.div>

        <motion.h1
          className="font-script text-5xl text-[var(--color-primary)] sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom}
        </motion.h1>

        {wedding.heroTagline && (
          <motion.p
            className="max-w-md text-base text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {wedding.heroTagline}
          </motion.p>
        )}

        <motion.p
          className="text-lg tracking-wide text-[var(--color-secondary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {format(date, 'EEEE, d MMMM yyyy')}
        </motion.p>

        <div className="mt-6">
          <ScrollIndicator />
        </div>
      </Container>
    </section>
  )
}
