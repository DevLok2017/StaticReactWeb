import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useAppConfig } from '../config/ConfigContext'

interface MusicContextValue {
  available: boolean
  playing: boolean
  visible: boolean
  setVisible: (visible: boolean) => void
  /** Start playback after invitation open (honours autoplayOnOpen). */
  startAfterOpen: () => Promise<void>
  pause: () => void
  toggle: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function MusicProvider({
  children,
  invitationEnabled,
}: {
  children: ReactNode
  invitationEnabled: boolean
}) {
  const { wedding } = useAppConfig()
  const src = wedding.music?.src
  const autoplayOnOpen = wedding.music?.autoplayOnOpen ?? true
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(!invitationEnabled)

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audioRef.current = null
    }
  }, [src])

  // If invitation cover is disabled, show the control immediately (autoplay may still need a tap).
  useEffect(() => {
    if (!invitationEnabled && src) setVisible(true)
  }, [invitationEnabled, src])

  const playInternal = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (playing) pause()
    else void playInternal()
  }, [playing, pause, playInternal])

  const startAfterOpen = useCallback(async () => {
    setVisible(true)
    if (autoplayOnOpen) await playInternal()
  }, [autoplayOnOpen, playInternal])

  const value = useMemo(
    () => ({
      available: Boolean(src),
      playing,
      visible: Boolean(src) && visible,
      setVisible,
      startAfterOpen,
      pause,
      toggle,
    }),
    [src, playing, visible, startAfterOpen, pause, toggle],
  )

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
