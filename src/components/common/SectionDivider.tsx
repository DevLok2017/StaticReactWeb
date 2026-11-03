export function SectionDivider() {
  return (
    <div className="my-2 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-16 bg-[var(--color-gold)]/50" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[var(--color-gold)]">
        <path
          d="M12 2c1 3 3 5 6 6-3 1-5 3-6 6-1-3-3-5-6-6 3-1 5-3 6-6Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-16 bg-[var(--color-gold)]/50" />
    </div>
  )
}
