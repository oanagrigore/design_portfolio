import type { ReactNode } from 'react'
import '@/app/sparkles.css'

/**
 * Wraps a button or link so a few fire sparks rise from it on hover and keyboard focus.
 * Pure CSS, works in server and client components, off with reduced motion.
 * Pass `on` to keep the sparks running (used by the case-study "View" bubble).
 */
export function Sparkle({ children, on = false, className = '' }: { children: ReactNode; on?: boolean; className?: string }) {
  return (
    <span className={`sp-wrap ${on ? 'sp-on' : ''} ${className}`}>
      {children}
      <span className="sp" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} />
        ))}
      </span>
    </span>
  )
}
