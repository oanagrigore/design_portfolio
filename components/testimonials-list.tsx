'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/content'

function getInitials(name: string) {
  const words = name.split(/\s+/).filter((w) => w && w !== '&')
  const first = words[0]?.[0] ?? ''
  const second = words[1]?.[0] ?? ''
  return (first + second).toUpperCase()
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightQuote(quote: string, highlights?: string[]): ReactNode[] {
  if (!highlights || highlights.length === 0) return [quote]
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'g')
  const set = new Set(highlights)
  return quote.split(pattern).map((part, i) =>
    set.has(part) ? (
      <mark
        key={i}
        className="rounded bg-primary/15 px-1 font-medium text-foreground"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary text-xs font-medium text-foreground"
    >
      {getInitials(name)}
    </span>
  )
}

export function TestimonialsList({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [featured, ...rest] = testimonials

  return (
    <div className="flex flex-col gap-6">
      {/* Featured testimonial */}
      {featured && (
        <Reveal>
          <figure className="relative overflow-hidden rounded-xl border border-border/60 bg-card p-8 md:p-12">
            <Quote
              aria-hidden="true"
              className="size-8 text-primary"
            />
            {featured.headline && (
              <p className="mt-6 text-balance text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                {featured.headline}
              </p>
            )}
            <blockquote className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {highlightQuote(featured.quote, featured.highlights)}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-6">
              <Avatar name={featured.name} />
              <span className="flex flex-col leading-tight">
                <span className="text-base font-medium text-foreground">
                  {featured.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {featured.title}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      )}

      {/* Remaining testimonials */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {rest.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <figure className="flex h-full flex-col rounded-xl border border-border/60 bg-card p-8 md:p-10">
              {t.headline && (
                <p className="text-pretty text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {t.headline}
                </p>
              )}
              <blockquote className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {highlightQuote(t.quote, t.highlights)}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-border/60 pt-6">
                <Avatar name={t.name} />
                <span className="flex flex-col leading-tight">
                  <span className="text-base font-medium text-foreground">
                    {t.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t.title}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
