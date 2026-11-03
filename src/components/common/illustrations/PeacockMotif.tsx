export function PeacockMotif({ className }: { className?: string }) {
  const feathers = [-60, -36, -12, 12, 36, 60]

  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} aria-hidden="true">
      <g transform="translate(70 92)">
        {/* tail fan */}
        {feathers.map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path
              d="M0 0C-7 -28 -7 -52 0 -78C7 -52 7 -28 0 0Z"
              fill="var(--color-jewel)"
              opacity={0.25 + (i % 2) * 0.1}
            />
            <ellipse cx="0" cy="-68" rx="6" ry="9" fill="var(--color-gold)" opacity="0.8" />
            <circle cy="-68" r="3" fill="var(--color-primary)" opacity="0.85" />
          </g>
        ))}

        {/* body */}
        <ellipse cx="0" cy="-6" rx="11" ry="16" fill="var(--color-jewel)" opacity="0.9" />
        {/* neck */}
        <path
          d="M-2 -18C-6 -28 -4 -36 4 -40"
          stroke="var(--color-jewel)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* head */}
        <circle cx="6" cy="-41" r="5" fill="var(--color-jewel)" opacity="0.95" />
        {/* crest */}
        <path
          d="M6 -46c1 -4 3 -6 5 -8"
          stroke="var(--color-gold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
