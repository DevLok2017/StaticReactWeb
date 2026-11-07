export function WaxSeal({
  initials,
  className,
}: {
  initials: string
  className?: string
}) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="waxFill" cx="42%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#9a2f3c" />
          <stop offset="55%" stopColor="#6e1824" />
          <stop offset="100%" stopColor="#4a0f18" />
        </radialGradient>
        <radialGradient id="waxShine" cx="35%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* irregular wax edge */}
      <path
        d="M80 8c14 0 22 6 32 10 12 5 24 4 30 16 6 12 2 24 4 34 2 12 10 20 6 32-4 12-16 16-22 26-6 10-6 22-18 26-12 4-22-2-34 0-12 2-20 12-32 8-12-4-14-18-24-26-10-8-24-8-28-20-4-12 6-22 6-34 0-12-6-24 2-34 8-10 22-6 32-12C54 8 66 8 80 8Z"
        fill="url(#waxFill)"
      />
      <circle cx="80" cy="80" r="58" fill="url(#waxShine)" />
      <circle cx="80" cy="80" r="48" fill="none" stroke="#d4af57" strokeWidth="1.6" opacity="0.85" />
      <circle cx="80" cy="80" r="42" fill="none" stroke="#d4af57" strokeWidth="0.8" opacity="0.45" />

      {/* heart outline */}
      <path
        d="M80 108c-18-14-28-26-28-38 0-10 8-18 18-18 6 0 10 2 10 8 0-6 4-8 10-8 10 0 18 8 18 18 0 12-10 24-28 38Z"
        fill="none"
        stroke="#e8c872"
        strokeWidth="1.8"
        opacity="0.9"
      />

      <text
        x="80"
        y="78"
        textAnchor="middle"
        fill="#f0d78c"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="600"
        letterSpacing="2"
      >
        {initials}
      </text>
    </svg>
  )
}
