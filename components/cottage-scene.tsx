import Image from 'next/image'
import type { CSSProperties } from 'react'
import '@/app/cottage-scene.css'

/**
 * Contact page scene: the outside of the house from the homepage at night.
 * It's decorative, so screen readers skip it. Uses CSS only, no JavaScript.
 * The motion turns off under prefers-reduced-motion.
 * Positions are % of the painting (measured on the 2000 × 1116 version).
 */

const pct = (x: number, y: number) => ({ left: `${(x / 2000) * 100}%`, top: `${(y / 1116) * 100}%` })

const LANTERNS: [number, number, number][] = [
  // x, y, flicker speed in s
  [232, 212, 3.1],
  [411, 182, 3.7],
  [248, 490, 2.9],
  [1716, 183, 3.4],
  [1758, 200, 4.1],
  [1871, 455, 3.3],
  [1785, 563, 3.8],
]

// x, y, drift time, blink time, delay
const FLIES: [number, number, number, number, number][] = [
  [140, 640, 9, 4.2, 0],
  [330, 560, 11, 5, 1.6],
  [210, 760, 10, 3.8, 3.1],
  [560, 980, 12, 4.6, 0.8],
  [760, 900, 9.5, 5.4, 2.4],
  [1130, 990, 10.5, 4, 4],
  [1330, 940, 11.5, 4.8, 1.2],
  [1610, 1000, 9, 3.6, 2.8],
  [1740, 960, 12, 5.2, 0.4],
  [1880, 820, 10, 4.4, 3.6],
  [1920, 300, 11, 5, 1.9],
  [1640, 640, 9.5, 4.1, 4.6],
  [90, 340, 10.5, 4.7, 2.2],
  [470, 300, 12, 5.6, 5.2],
]

export function CottageScene() {
  return (
    <div className="cs-root" aria-hidden="true">
      <div className="cs-frame">
        <div className="cs-scene">
          <Image
            src="/contact/cottage.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="cs-img"
          />

          <span className="cs-glow cs-glow--window" style={{ ...pct(1430, 560), '--d': '6s' } as CSSProperties} />
          {LANTERNS.map(([x, y, d], i) => (
            <span
              key={`l${i}`}
              className="cs-glow"
              style={{ ...pct(x, y), '--d': `${d}s`, '--delay': `${-i * 0.7}s` } as CSSProperties}
            />
          ))}

          {[0, 2.3, 4.6].map((delay) => (
            <span key={`s${delay}`} className="cs-smoke" style={{ '--delay': `${delay}s` } as CSSProperties} />
          ))}

          {FLIES.map(([x, y, d, b, delay], i) => (
            <span
              key={`f${i}`}
              className="cs-fly"
              style={
                {
                  ...pct(x, y),
                  '--d': `${d}s`,
                  '--b': `${b}s`,
                  '--delay': `${delay}s`,
                  '--x1': `${(i % 3) * 8 + 6}px`,
                  '--y1': `${-((i % 4) * 5 + 6)}px`,
                  '--x2': `${-((i % 2) * 10 + 4)}px`,
                  '--y2': `${-((i % 3) * 7 + 14)}px`,
                  '--x3': `${-((i % 4) * 6 + 8)}px`,
                  '--y3': `${-((i % 2) * 6 + 4)}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
