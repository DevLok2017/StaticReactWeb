import type { WeddingConfig } from '../../schemas/wedding'
import { Reveal } from '../common/Reveal'
import { PlaceholderImage } from '../common/PlaceholderImage'

type Chapter = WeddingConfig['loveStory'][number]

export function StoryChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const isEven = index % 2 === 0

  return (
    <Reveal direction={isEven ? 'left' : 'right'} className="relative">
      <div
        className={`flex flex-col items-center gap-6 md:flex-row ${
          isEven ? '' : 'md:flex-row-reverse'
        }`}
      >
        <div className="w-full md:w-1/2">
          <PlaceholderImage
            src={chapter.image}
            alt={chapter.title}
            label={`Chapter ${chapter.number} photo`}
            className="aspect-[4/3] w-full rounded-[var(--radius-md)] object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
        <div className="w-full text-center md:w-1/2 md:text-left">
          <span className="font-script text-5xl text-[var(--color-gold)]">
            {String(chapter.number).padStart(2, '0')}
          </span>
          <h3 className="mt-2 text-2xl text-[var(--color-primary)] sm:text-3xl">{chapter.title}</h3>
          {chapter.date && (
            <p className="mt-1 text-xs tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
              {chapter.date}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)]">{chapter.description}</p>
        </div>
      </div>
    </Reveal>
  )
}
