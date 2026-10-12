import type { Metadata } from 'next'
import { testimonials, type Testimonial } from '@/lib/content'
import { AboutAnimator } from '@/components/about-animator'

const TITLE = "Kind words from people I've had the pleasure of working with."
const INTRO = 'Honest feedback earned through hard work and collaboration, not sales pitches.'

export const metadata: Metadata = {
  // The root layout adds "— Oana Grigore" automatically
  title: 'Testimonials',
  description: `${TITLE} ${INTRO}`,
  alternates: { canonical: '/testimonials' },
  openGraph: {
    url: '/testimonials',
    title: 'Testimonials — Oana Grigore',
    description: `${TITLE} ${INTRO}`,
  },
}

/** Who goes where, in this order. Anyone not listed lands in the last group. */
const GROUPS: { label: string; names: string[] }[] = [
  { label: 'Founders & clients', names: ['Ibrahim Bashir', 'Vasile Popescu & Pascal Franke', 'Felix Harms'] },
  { label: 'Engineering partners', names: ['Adrian Neatu', 'Serhii Nadoienko'] },
  { label: 'Design & content peers', names: ['Liviu Atudorei', 'Livia Burbulea', 'Alice Fischer'] },
]

/** The pull quote at the top: the sentence that proves the About page headline. */
const FEATURED = { name: 'Serhii Nadoienko', highlight: 'passing every accessibility audit without friction' }

const label =
  'text-xs font-medium uppercase tracking-[0.08em] tabular-nums text-muted-foreground'

function grouped() {
  const used = new Set<string>()
  const groups = GROUPS.map((g) => {
    const items = g.names
      .map((n) => testimonials.find((t) => t.name === n))
      .filter((t): t is Testimonial => Boolean(t))
    items.forEach((t) => used.add(t.name))
    return { label: g.label, items }
  })
  const rest = testimonials.filter((t) => !used.has(t.name))
  if (rest.length) groups[groups.length - 1].items.push(...rest)
  return groups.filter((g) => g.items.length > 0)
}

/** The full sentence of a quote that contains a phrase, word for word. */
function sentenceWith(quote: string, phrase: string) {
  const sentences = quote.match(/[^.!?]+[.!?]+/g) ?? [quote]
  return sentences.find((s) => s.includes(phrase))?.trim()
}

/**
 * Breaks a long quote into short paragraphs so it is easy to follow.
 * A blank line in the text (\n\n) is used as-is; otherwise sentences are
 * grouped into paragraphs of roughly two sentences. No words change.
 */
function paragraphs(quote: string): string[] {
  const text = quote.trim()
  if (text.includes('\n\n')) return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z\u201C"])/)
  const out: string[] = []
  let current = ''
  for (const sentence of sentences) {
    current = current ? `${current} ${sentence}` : sentence
    if (current.length >= 200) {
      out.push(current)
      current = ''
    }
  }
  if (current) {
    // fold a short last sentence into the previous paragraph
    if (out.length && current.length < 90) out[out.length - 1] += ` ${current}`
    else out.push(current)
  }
  return out
}

/** Renders the quote with its highlight phrases brightened (matched ignoring case). The text is untouched. */
function Quote({ text, highlights = [] }: { text: string; highlights?: string[] }) {
  const lower = text.toLowerCase()
  const ranges = highlights
    .map((h) => ({ start: lower.indexOf(h.toLowerCase()), end: lower.indexOf(h.toLowerCase()) + h.length }))
    .filter((r) => r.start >= 0)
    .sort((a, b) => a.start - b.start)
    .filter((r, i, all) => i === 0 || r.start >= all[i - 1].end)

  const parts: React.ReactNode[] = []
  let cursor = 0
  ranges.forEach((r, i) => {
    if (r.start > cursor) parts.push(text.slice(cursor, r.start))
    parts.push(
      <strong key={i} className="font-normal text-foreground">
        {text.slice(r.start, r.end)}
      </strong>,
    )
    cursor = r.end
  })
  if (cursor < text.length) parts.push(text.slice(cursor))
  return <>{parts}</>
}

export default function TestimonialsPage() {
  const groups = grouped()
  const featured = testimonials.find((t) => t.name === FEATURED.name)
  const pull = featured && sentenceWith(featured.quote, FEATURED.highlight)

  return (
    <AboutAnimator>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 1 · Opening */}
        <section aria-labelledby="testimonials-title" className="pt-24 pb-16 md:pt-36 md:pb-24">
          <h1
            id="testimonials-title"
            data-animate="hero-title"
            className="max-w-4xl text-balance text-4xl font-medium leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {TITLE}
          </h1>
          <p
            data-animate="hero-bio"
            className="mt-8 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {INTRO}
          </p>
        </section>

        {/* 2 · Pull quote */}
        {featured && pull && (
          <figure data-animate="hero-bio" className="grid grid-cols-1 pb-20 md:grid-cols-12 md:pb-36">
            <blockquote className="md:col-span-10 md:col-start-2">
              <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                <span aria-hidden="true" className="text-pink-400">“</span>
                {pull}
                <span aria-hidden="true" className="text-pink-400">”</span>
              </p>
            </blockquote>
            <figcaption className="mt-6 text-muted-foreground md:col-span-10 md:col-start-2">
              <span className="text-foreground">{featured.name}</span>
              <span aria-hidden="true"> · </span>
              {featured.title}
            </figcaption>
          </figure>
        )}

        {/* 3 · Testimonials, grouped by who is speaking */}
        {groups.map((group, gi) => (
          <section
            key={group.label}
            aria-labelledby={`group-${gi}`}
            className="py-10 md:py-16"
          >
            <h2 id={`group-${gi}`} className={`${label} mb-8 flex items-baseline gap-3.5 md:mb-12`}>
              <span className="text-pink-400">{String(gi + 1).padStart(2, '0')}</span>
              <span>{group.label}</span>
            </h2>

            <ol className="border-t border-border/60">
              {group.items.map((t) => (
                <li
                  key={t.name}
                  data-animate="experience-item"
                  className="grid grid-cols-1 gap-x-6 gap-y-5 border-b border-border/60 py-10 md:grid-cols-12 md:py-14"
                >
                  <figure className="contents">
                    <figcaption className="md:col-span-4">
                      <p className="font-medium text-foreground">{t.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{t.title}</p>
                    </figcaption>
                    <div className="md:col-span-8">
                      {t.headline && (
                        <h3 className="text-balance text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
                          {t.headline}
                        </h3>
                      )}
                      <blockquote className="mt-4 max-w-[64ch] space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                        {paragraphs(t.quote).map((para, pi) => (
                          <p key={pi}>
                            <Quote text={para} highlights={t.highlights} />
                          </p>
                        ))}
                      </blockquote>
                    </div>
                  </figure>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </AboutAnimator>
  )
}
