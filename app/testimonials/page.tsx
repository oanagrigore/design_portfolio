import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Quote } from 'lucide-react'
import { testimonials, type Testimonial } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Testimonials | Oana Grigore',
  description: 'Kind words from people I have worked with.',
}

function getInitials(name: string) {
  return name
    .split('&')[0]
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

// Break a long quote into shorter paragraphs (grouping a couple of sentences
// each) so the copy is easier to scan than a single dense block.
function splitIntoParagraphs(quote: string, sentencesPerParagraph = 2) {
  const sentences = quote.trim().match(/[^.!?]+[.!?]*\s*/g) ?? [quote]
  const paragraphs: string[] = []
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(
      sentences
        .slice(i, i + sentencesPerParagraph)
        .join('')
        .trim(),
    )
  }
  return paragraphs
}

// Wrap each highlighted phrase found in the quote with a subtle marker so the
// key takeaways are scannable at a glance. Matching is case-insensitive and the
// original casing from the quote is preserved.
function highlightQuote(quote: string, highlights?: string[]): ReactNode {
  if (!highlights || highlights.length === 0) return quote

  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(${highlights.map(escape).join('|')})`, 'gi')
  const parts = quote.split(pattern)

  return parts.map((part, index) => {
    const isHighlight = highlights.some(
      (h) => h.toLowerCase() === part.toLowerCase(),
    )
    if (!isHighlight) return part
    return (
      <mark
        key={index}
        className="rounded bg-pink-500/15 px-1 py-0.5 font-medium text-pink-300 decoration-clone"
      >
        {part}
      </mark>
    )
  })
}

// Distribute testimonials into balanced columns by estimated content height so
// neither column ends dramatically earlier than the other (unlike CSS columns,
// which balance by splitting and leave uneven gaps).
function balanceColumns(items: Testimonial[], columnCount = 2) {
  const columns: Testimonial[][] = Array.from({ length: columnCount }, () => [])
  const heights = new Array(columnCount).fill(0)
  for (const item of items) {
    const weight = (item.headline?.length ?? 0) + item.quote.length
    const target = heights.indexOf(Math.min(...heights))
    columns[target].push(item)
    heights[target] += weight
  }
  return columns
}

function TestimonialCard({
  testimonial,
  featured,
}: {
  testimonial: Testimonial
  featured?: boolean
}) {
  const t = testimonial
  return (
    <figure
      className={`flex break-inside-avoid flex-col gap-6 rounded-xl border border-border/60 bg-card p-8 transition-colors hover:border-border md:p-10 ${
        featured ? 'md:gap-8' : ''
      }`}
    >
      <Quote aria-hidden="true" className="size-6 shrink-0 text-pink-500" />

      {t.headline && (
        <p
          className={`text-pretty font-semibold leading-snug tracking-tight text-foreground ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}
        >
          {t.headline}
        </p>
      )}

      <blockquote
        className={`flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground ${
          featured ? 'text-lg' : 'text-base'
        }`}
      >
        {splitIntoParagraphs(t.quote).map((paragraph, index) => (
          <p key={index}>{highlightQuote(paragraph, t.highlights)}</p>
        ))}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-border/60 pt-5">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink-500/10 text-sm font-medium text-pink-300"
        >
          {getInitials(t.name)}
        </span>
        <span className="flex flex-col">
          <span className="text-base font-medium text-foreground">
            {t.name}
          </span>
          <span className="text-sm text-muted-foreground">{t.title}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function TestimonialsPage() {
  const [featured, ...rest] = testimonials

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          Kind words from people I&apos;ve had the pleasure of working with.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          Honest feedback earned through hard work and collaboration, not sales
          pitches. Skim the highlights, or read the full stories below.
        </p>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="flex flex-col gap-6">
          {featured && <TestimonialCard testimonial={featured} featured />}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            {balanceColumns(rest).map((column, index) => (
              <div key={index} className="flex flex-col gap-6">
                {column.map((t) => (
                  <TestimonialCard key={t.name} testimonial={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
