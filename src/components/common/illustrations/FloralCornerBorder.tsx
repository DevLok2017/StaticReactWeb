export function FloralCornerBorder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6c0 40 2 72 16 96 14 24 42 40 82 46"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path d="M6 6c28 4 50 14 64 32" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* leaves along the vine */}
      {[
        { x: 18, y: 44, r: 20 },
        { x: 32, y: 70, r: -10 },
        { x: 54, y: 96, r: 25 },
      ].map((leaf, i) => (
        <path
          key={i}
          d="M0 0c6 -10 18 -10 22 0c-10 6 -16 6 -22 0Z"
          fill="currentColor"
          opacity="0.3"
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}
        />
      ))}

      {/* primary bloom */}
      <g transform="translate(20 20)">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="4.5"
            ry="8"
            fill="currentColor"
            opacity="0.6"
            transform={`rotate(${i * 60})`}
          />
        ))}
        <circle r="4" fill="currentColor" opacity="0.9" />
      </g>

      {/* secondary bloom */}
      <g transform="translate(56 50) scale(0.65)">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="4.5"
            ry="8"
            fill="currentColor"
            opacity="0.45"
            transform={`rotate(${i * 60 + 20})`}
          />
        ))}
        <circle r="3.5" fill="currentColor" opacity="0.75" />
      </g>

      {/* small bud */}
      <g transform="translate(84 88) scale(0.4)">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="4.5"
            ry="8"
            fill="currentColor"
            opacity="0.3"
            transform={`rotate(${i * 60})`}
          />
        ))}
        <circle r="3.5" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  )
}
