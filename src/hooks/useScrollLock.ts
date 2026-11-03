import { useEffect } from 'react'

/**
 * Locks page scroll while `active` is true. Uses the fixed-body-position
 * trick (not just `overflow: hidden`) because mobile Safari still allows
 * background rubber-band scrolling with overflow alone.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return

    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    }

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.position = prev.bodyPosition
      body.style.top = prev.bodyTop
      body.style.width = prev.bodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [active])
}
