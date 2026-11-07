export function ToranCorner({
  className,
  mirror = false,
}: {
  className?: string
  mirror?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      aria-hidden="true"
      style={mirror ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* banana leaves */}
      <path
        d="M28 20c40 8 70 40 78 90-28-10-52-34-78-90Z"
        fill="#3f7a45"
        opacity="0.92"
      />
      <path
        d="M48 10c36 18 58 52 62 96-24-16-42-46-62-96Z"
        fill="#4f9456"
        opacity="0.9"
      />
      <path d="M40 18c28 20 46 52 52 88" stroke="#2d5a34" strokeWidth="1.2" fill="none" />

      {/* marigold garland */}
      {[
        [70, 42],
        [88, 58],
        [102, 78],
        [112, 100],
        [118, 124],
        [120, 148],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 8 }).map((_, p) => (
            <ellipse
              key={p}
              cx="0"
              cy="-5"
              rx="3.2"
              ry="5.5"
              fill={i % 2 === 0 ? '#f0c44c' : '#fff8e8'}
              transform={`rotate(${p * 45})`}
            />
          ))}
          <circle r="2.4" fill={i % 2 === 0 ? '#e08a2a' : '#f5d98a'} />
        </g>
      ))}

      {/* hanging bells */}
      {[
        [96, 92],
        [110, 118],
        [116, 146],
      ].map(([x, y], i) => (
        <g key={`bell-${i}`} transform={`translate(${x} ${y})`}>
          <line x1="0" y1="-10" x2="0" y2="0" stroke="#c9a24b" strokeWidth="1" />
          <path d="M-6 0h12l-2 10h-8Z" fill="#d4af57" />
          <circle cy="12" r="1.6" fill="#b8923d" />
        </g>
      ))}

      {/* diya */}
      <g transform="translate(34 150)">
        <ellipse cx="22" cy="28" rx="20" ry="7" fill="#c9a24b" />
        <path d="M4 28c2-14 12-22 20-22s18 8 20 22" fill="#d4af57" />
        <path d="M18 8c2-10 8-14 10-4 4 8-2 14-8 12-2-2-2-4-2-8Z" fill="#f4c15d" />
        <path d="M22 2c1-6 5-8 6-2" stroke="#fff3c4" strokeWidth="1.2" fill="none" />
      </g>

      {/* small white flowers near diya */}
      {[
        [18, 178],
        [48, 188],
        [72, 176],
      ].map(([x, y], i) => (
        <g key={`fl-${i}`} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 5 }).map((_, p) => (
            <ellipse
              key={p}
              cx="0"
              cy="-4"
              rx="2.2"
              ry="4"
              fill="#fff8ef"
              transform={`rotate(${p * 72})`}
            />
          ))}
          <circle r="1.5" fill="#e8c872" />
        </g>
      ))}
    </svg>
  )
}
