export function GaneshaMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 72" className={className} fill="none" aria-hidden="true">
      <ellipse cx="40" cy="28" rx="16" ry="14" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M28 30c-6 2-10 8-8 14 2 4 8 6 12 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M40 20c2-8 10-12 16-8 2 8-2 14-8 16"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="34" cy="26" r="1.4" fill="currentColor" />
      <circle cx="46" cy="26" r="1.4" fill="currentColor" />
      <path d="M36 32h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M32 42c2 10 6 18 8 22M48 42c-2 10-6 18-8 22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M24 48c6 4 14 6 16 6s10-2 16-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M30 18c2-6 8-10 14-8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="40" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M20 54h40M24 58h32"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
