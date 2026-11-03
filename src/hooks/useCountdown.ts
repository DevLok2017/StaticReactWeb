import { useEffect, useState } from 'react'

export interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function computeCountdown(targetIso: string): CountdownValue {
  const target = new Date(targetIso).getTime()
  const now = Date.now()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPast: false }
}

export function useCountdown(targetIso: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => computeCountdown(targetIso))

  useEffect(() => {
    setValue(computeCountdown(targetIso))
    const interval = window.setInterval(() => {
      setValue(computeCountdown(targetIso))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [targetIso])

  return value
}
