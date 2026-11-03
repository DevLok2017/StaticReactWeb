import { useAppConfig } from '../../config/ConfigContext'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { StoryChapter } from './StoryChapter'

export function LoveStorySection() {
  const { wedding } = useAppConfig()
  if (wedding.loveStory.length === 0) return null

  return (
    <section id="loveStory" className="bg-[var(--color-background-alt)] py-20">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">Our Journey</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Love Story</h2>
          <SectionDivider />
        </Reveal>

        <div className="relative mt-14 flex flex-col gap-16">
          <div
            className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--color-gold)]/30 md:block"
            aria-hidden="true"
          />
          {wedding.loveStory.map((chapter, index) => (
            <StoryChapter key={chapter.number} chapter={chapter} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
