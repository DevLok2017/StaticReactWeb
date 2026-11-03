import { useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'

export function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      void audio.play()
    }
    setPlaying(!playing)
  }

  return (
    <div>
      <audio ref={audioRef} src={src} loop />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex items-center gap-2 rounded-full border border-[var(--color-gold)] px-5 py-2 text-xs tracking-[0.1em] text-[var(--color-secondary)] uppercase transition-colors hover:bg-[var(--color-background-alt)]"
      >
        {playing ? <Pause size={14} /> : <Music size={14} />}
        {playing ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  )
}
