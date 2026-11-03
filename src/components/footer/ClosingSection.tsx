import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { Monogram } from '../common/Monogram'
import { FloralDecoration } from '../common/FloralDecoration'
import { CountdownTimer } from '../countdown/CountdownTimer'
import { MusicPlayer } from './MusicPlayer'

export function ClosingSection() {
  const { wedding } = useAppConfig()

  return (
    <section
      id="closing"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[var(--color-primary)] px-6 py-24 text-center text-white"
    >
      <FloralDecoration variant="corner" className="absolute top-6 left-6 h-20 w-20 text-white/40" />
      <FloralDecoration
        variant="corner"
        className="absolute right-6 bottom-6 h-20 w-20 rotate-180 text-white/40"
      />

      <Container className="relative flex flex-col items-center gap-6">
        <Reveal>
          <Monogram
            text={wedding.monogram ?? `${wedding.coupleNames.bride[0]} & ${wedding.coupleNames.groom[0]}`}
            className="border-white/60 text-white"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-script text-4xl sm:text-5xl">
            {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom}
          </h2>
        </Reveal>

        {wedding.closingMessage && (
          <Reveal delay={0.2}>
            <p className="max-w-lg text-sm leading-relaxed text-white/85">{wedding.closingMessage}</p>
          </Reveal>
        )}

        <Reveal delay={0.3}>
          <div className="[&_span]:text-white/70 [&_span.tabular-nums]:text-white">
            <CountdownTimer targetDate={wedding.weddingDate} />
          </div>
        </Reveal>

        {wedding.music && (
          <Reveal delay={0.4}>
            <MusicPlayer src={wedding.music.src} />
          </Reveal>
        )}

        <Reveal delay={0.5}>
          <p className="mt-4 text-xs tracking-[0.2em] text-white/60 uppercase">
            With love, {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
