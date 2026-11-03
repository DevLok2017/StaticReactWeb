import { cn } from '../../utils/cn'

export function Monogram({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border-2 border-[var(--color-gold)] px-6 py-4 font-script text-3xl text-[var(--color-primary)]',
        className,
      )}
    >
      {text}
    </div>
  )
}
