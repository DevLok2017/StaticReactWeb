import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useAppConfig } from '../../config/ConfigContext'
import { useScrollLock } from '../../hooks/useScrollLock'
import { Container } from '../common/Container'
import { Reveal } from '../common/Reveal'
import { SectionDivider } from '../common/SectionDivider'
import { PlaceholderImage } from '../common/PlaceholderImage'

export function InteractiveStorybook() {
  const { wedding } = useAppConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(0)

  useScrollLock(isOpen)

  if (wedding.storybook.length === 0) return null

  const pages = wedding.storybook
  const canPrev = page > 0
  const canNext = page < pages.length - 1

  function close() {
    setIsOpen(false)
    setPage(0)
  }

  return (
    <section id="storybook" className="bg-[var(--color-background)] py-20">
      <Container className="text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase">A Little Story</p>
          <h2 className="mt-2 text-4xl text-[var(--color-secondary)] sm:text-5xl">Open Our Storybook</h2>
          <SectionDivider />

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-primary)] px-7 py-3 text-sm tracking-[0.1em] text-white uppercase shadow-[var(--shadow-soft)] transition-transform hover:scale-105"
          >
            <BookOpen size={18} />
            Open Our Story
          </button>
        </Reveal>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative flex w-full max-w-xl flex-col gap-4 rounded-[var(--radius-lg)] bg-[var(--color-background-alt)] p-8 shadow-[var(--shadow-strong)]"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformPerspective: 1200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close the book"
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              >
                <X size={22} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  {pages[page].image && (
                    <PlaceholderImage
                      src={pages[page].image}
                      alt={pages[page].title ?? `Page ${page + 1}`}
                      className="aspect-[4/3] w-full max-w-sm rounded-[var(--radius-md)] object-cover"
                    />
                  )}
                  {pages[page].title && (
                    <h3 className="text-2xl text-[var(--color-primary)]">{pages[page].title}</h3>
                  )}
                  <p className="text-sm leading-relaxed text-[var(--color-text)]">{pages[page].text}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={!canPrev}
                  className="flex items-center gap-1 text-sm text-[var(--color-secondary)] disabled:opacity-30"
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {page + 1} / {pages.length}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!canNext}
                  className="flex items-center gap-1 text-sm text-[var(--color-secondary)] disabled:opacity-30"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
