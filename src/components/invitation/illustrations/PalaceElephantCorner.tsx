export function PalaceElephantCorner({
  className,
  mirror = false,
}: {
  className?: string
  mirror?: boolean
}) {
  return (
    <svg
      viewBox="0 0 240 200"
      className={className}
      aria-hidden="true"
      style={mirror ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* palace / fort wall */}
      <path
        d="M20 150V70c0-4 4-8 8-8h18c4 0 6 2 8 6l8 18h20l6-14c2-4 6-6 10-6h24c6 0 10 4 10 10v74H20Z"
        fill="#c4a574"
      />
      <path d="M28 62h20v-18c0-4 4-8 10-8s10 4 10 8v18" fill="#b8955f" />
      <path d="M86 62h28v-22c0-6 6-10 14-10s14 4 14 10v22" fill="#b8955f" />
      {/* arches */}
      <path d="M40 150v-34c0-10 8-18 16-18s16 8 16 18v34" fill="#8f6b3e" opacity="0.55" />
      <path d="M96 150v-40c0-12 10-20 18-20s18 8 18 20v40" fill="#8f6b3e" opacity="0.55" />
      <rect x="20" y="148" width="150" height="8" fill="#a88452" />

      {/* dome accents */}
      <path d="M38 44c8-16 22-16 30 0" fill="#c9a24b" opacity="0.85" />
      <path d="M100 40c10-18 28-18 38 0" fill="#c9a24b" opacity="0.85" />
      <circle cx="53" cy="40" r="2.5" fill="#7a1f2b" />
      <circle cx="119" cy="36" r="2.5" fill="#7a1f2b" />

      {/* elephant */}
      <g transform="translate(118 88)">
        <ellipse cx="48" cy="48" rx="36" ry="28" fill="#9a9a9a" />
        <ellipse cx="48" cy="48" rx="36" ry="28" fill="#7d7d7d" opacity="0.25" />
        <path d="M14 46c-10 2-16 12-12 22 8 4 16 2 22-4" fill="#8e8e8e" />
        <circle cx="78" cy="36" r="18" fill="#9a9a9a" />
        <path d="M90 40c8 6 10 18 4 26-8 2-14-2-16-8" fill="#8a8a8a" />
        <circle cx="84" cy="32" r="2" fill="#2b2118" />
        {/* trunk */}
        <path
          d="M94 44c10 4 12 16 6 24-4 4-10 4-12 0"
          fill="none"
          stroke="#7a7a7a"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* jhool / blanket */}
        <path d="M22 40c18-16 52-16 70 2-8 18-48 26-70 8Z" fill="#7a1f2b" />
        <path d="M28 38c16-10 44-10 60 4" stroke="#d4af57" strokeWidth="2" fill="none" />
        <path d="M34 48h44" stroke="#e8c872" strokeWidth="1.4" />
        {/* legs */}
        <rect x="28" y="68" width="10" height="26" rx="3" fill="#888" />
        <rect x="46" y="70" width="10" height="24" rx="3" fill="#888" />
        <rect x="62" y="68" width="10" height="26" rx="3" fill="#7f7f7f" />
        {/* tusk */}
        <path d="M88 44c6 2 10 8 8 12" stroke="#f5e6c8" strokeWidth="2" fill="none" />
      </g>

      {/* florals at base */}
      {[
        [24, 158],
        [52, 164],
        [84, 156],
        [150, 168],
        [178, 160],
        [200, 170],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 6 }).map((_, p) => (
            <ellipse
              key={p}
              cx="0"
              cy="-6"
              rx="3.5"
              ry="7"
              fill={i % 2 === 0 ? '#e36a8a' : '#fff4f0'}
              transform={`rotate(${p * 60})`}
            />
          ))}
          <circle r="2.2" fill="#f0c44c" />
          <path d="M-2 8c4 6 8 6 12 0" stroke="#3f7a45" strokeWidth="2" fill="none" />
        </g>
      ))}
    </svg>
  )
}
