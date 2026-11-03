import { useCountdown } from '../../hooks/useCountdown'

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-4xl text-[var(--color-primary)] tabular-nums sm:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-xs tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
        {label}
      </span>
    </div>
  )
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const countdown = useCountdown(targetDate)

  if (countdown.isPast) {
    return <p className="text-lg text-[var(--color-primary)]">We're celebrating! 🎉</p>
  }

  return (
    <div className="flex gap-6 sm:gap-10" role="timer" aria-live="polite">
      <Unit value={countdown.days} label="Days" />
      <Unit value={countdown.hours} label="Hours" />
      <Unit value={countdown.minutes} label="Minutes" />
      <Unit value={countdown.seconds} label="Seconds" />
    </div>
  )
}
