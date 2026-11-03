import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { CoupleProfile } from './CoupleProfile'

export function CoupleSection() {
  const { wedding } = useAppConfig()

  return (
    <section id="couple" className="bg-[var(--color-background)] py-20">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Meet</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">The Bride &amp; Groom</h2>
          <SectionDivider />
        </Reveal>

        <div className="mt-12 flex flex-col gap-8">
          <Reveal direction="left">
            <CoupleProfile profile={wedding.profiles.bride} align="left" />
          </Reveal>
          <Reveal direction="right">
            <CoupleProfile profile={wedding.profiles.groom} align="right" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
