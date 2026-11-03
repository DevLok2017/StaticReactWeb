import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { FamilyCard } from './FamilyCard'

export function FamilySection() {
  const { wedding } = useAppConfig()

  return (
    <section id="family" className="bg-[var(--color-background)] py-20">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">With blessings from</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Our Families</h2>
          <SectionDivider />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal direction="left">
            <FamilyCard title="Bride" name={wedding.coupleNames.bride} family={wedding.family.bride} />
          </Reveal>
          <Reveal direction="right">
            <FamilyCard title="Groom" name={wedding.coupleNames.groom} family={wedding.family.groom} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
