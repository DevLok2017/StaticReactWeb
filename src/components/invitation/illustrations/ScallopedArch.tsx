export function ScallopedArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 70"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 70
           C20 70 28 18 50 18
           C72 18 80 70 100 70
           C120 70 128 18 150 18
           C172 18 180 70 200 70
           C220 70 228 18 250 18
           C272 18 280 70 300 70
           C320 70 328 18 350 18
           C372 18 380 70 400 70
           L400 0 L0 0 Z"
        fill="var(--color-background-alt)"
        stroke="#c9a24b"
        strokeWidth="1.5"
        opacity="0.95"
      />
      <path
        d="M0 70
           C20 70 28 22 50 22
           C72 22 80 70 100 70
           C120 70 128 22 150 22
           C172 22 180 70 200 70
           C220 70 228 22 250 22
           C272 22 280 70 300 70
           C320 70 328 22 350 22
           C372 22 380 70 400 70"
        fill="none"
        stroke="#d4af57"
        strokeWidth="0.8"
        opacity="0.55"
      />
    </svg>
  )
}
