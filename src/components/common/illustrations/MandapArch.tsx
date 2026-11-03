export function MandapArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 190"
      fill="none"
      preserveAspectRatio="xMidYMin meet"
      className={className}
      aria-hidden="true"
    >
      {/* scalloped dome, three tiers */}
      <path
        d="M20 160C20 90 120 40 300 40C480 40 580 90 580 160"
        stroke="var(--color-gold)"
        strokeWidth="3"
        opacity="0.4"
      />
      <path
        d="M70 160C70 108 160 70 300 70C440 70 530 108 530 160"
        stroke="var(--color-gold)"
        strokeWidth="2"
        opacity="0.3"
      />
      <path
        d="M120 160C120 124 196 98 300 98C404 98 480 124 480 160"
        stroke="var(--color-gold)"
        strokeWidth="2"
        opacity="0.3"
      />

      {/* finial */}
      <circle cx="300" cy="34" r="7" fill="var(--color-gold)" opacity="0.55" />
      <path d="M300 41v22" stroke="var(--color-gold)" strokeWidth="2" opacity="0.4" />

      {/* scalloped trim along the arch */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13
        const x = 20 + t * 560
        const y = 160 - Math.sin(Math.PI * t) * 118
        return <circle key={i} cx={x} cy={y + 14} r="5" fill="var(--color-gold)" opacity="0.3" />
      })}

      {/* pillar stubs anchoring the arch */}
      <rect x="12" y="155" width="16" height="35" fill="var(--color-gold)" opacity="0.2" />
      <rect x="572" y="155" width="16" height="35" fill="var(--color-gold)" opacity="0.2" />
    </svg>
  )
}
