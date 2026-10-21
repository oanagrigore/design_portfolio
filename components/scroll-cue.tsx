'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Scroll cue at the bottom of the contact scene. Clicking it jumps to the contact details.
 * It fades out as soon as the visitor scrolls, and isn't shown on phones, where the details
 * are already on screen. The motion turns off under prefers-reduced-motion.
 */
export function ScrollCue({ targetId }: { targetId: string }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={`#${targetId}`}
      data-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      onClick={(e) => {
        const el = document.getElementById(targetId)
        if (!el) return
        e.preventDefault()
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      }}
      className="cs-cue group flex-col items-center gap-2 rounded-full focus-visible:outline-none"
    >
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
        Get in touch
      </span>
      <span className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors group-hover:bg-white/20 group-focus-visible:ring-2 group-focus-visible:ring-pink-400">
        <ChevronDown aria-hidden="true" className="cs-cue-arrow size-5" />
      </span>
    </a>
  )
}
