import { useAppConfig } from '../../config/ConfigContext'
import { useDetailsVisible } from '../../context/PrivacyContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { Monogram } from '../common/Monogram'
import { FloralDecoration } from '../common/FloralDecoration'
import { ShowDetailsButton } from '../common/ShowDetailsButton'
import { CountdownTimer } from '../countdown/CountdownTimer'

export function ClosingSection() {
  const { wedding } = useAppConfig()
  const detailsVisible = useDetailsVisible()

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
            text={
              wedding.monogram ??
              `${wedding.coupleNames.bride[0]} & ${wedding.coupleNames.groom[0]}`
            }
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
          <p className="text-xs tracking-[0.2em] text-white/70 uppercase">Counting down to forever</p>
          <div className="mt-3 [&_span]:text-white/70 [&_span.tabular-nums]:text-white">
            {detailsVisible ? (
              <CountdownTimer targetDate={wedding.weddingDate} />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-4 blur-[3px] select-none" aria-hidden>
                  {['Days', 'Hours', 'Min', 'Sec'].map((label) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <span className="tabular-nums text-3xl">••</span>
                      <span className="text-xs tracking-[0.15em] uppercase">{label}</span>
                    </div>
                  ))}
                </div>
                <ShowDetailsButton className="text-white/80 hover:text-white" />
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-4 text-xs tracking-[0.2em] text-white/60 uppercase">
            With love, {wedding.coupleNames.bride} &amp; {wedding.coupleNames.groom}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
