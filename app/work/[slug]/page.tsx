'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { X } from 'lucide-react'

import {
  caseStudies,
  type CaseStudy,
  type CaseStudyDecision,
  type CaseStudyImage,
  type CaseStudySection,
} from '@/lib/content'

/* ------------------------------------------------------------------ */
/* Shared styles — same system as Home, About and Testimonials         */
/* ------------------------------------------------------------------ */

const label = 'text-xs font-medium uppercase tracking-[0.08em] tabular-nums text-muted-foreground'
const num = (n: number) => String(n).padStart(2, '0')
const slugify = (s: string) =>
  s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** "Label: rest of the sentence" → bold label + text, so long bullets can be scanned by their first words. */
function splitLead(text: string): { lead?: string; rest: string } {
  const i = text.indexOf(': ')
  if (i > 0 && i <= 60 && !/[.!?]/.test(text.slice(0, i))) {
    return { lead: text.slice(0, i), rest: text.slice(i + 2) }
  }
  return { rest: text }
}

/** Pulls a value out of the quick summary by label, e.g. "My role". */
const fromSummary = (study: CaseStudy, key: string) =>
  study.quickSummary?.find((q) => q.label.toLowerCase() === key.toLowerCase())?.value

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  // Hooks run before any early exit
  const [activeImage, setActiveImage] = useState<CaseStudyImage | null>(null)
  const [activeId, setActiveId] = useState<string>('')

  const index = caseStudies.findIndex((s) => s.slug === slug)
  const study = caseStudies[index]

  const sections = (study?.sections ?? []).map((s) => ({ ...s, id: slugify(s.heading) }))

  // Highlight the section being read in the side index
  useEffect(() => {
    if (!sections.length) return
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close the lightbox with Escape
  useEffect(() => {
    if (!activeImage) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActiveImage(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeImage])

  if (!study) notFound()
  const next = caseStudies[(index + 1) % caseStudies.length]

  const role = fromSummary(study, 'My role') ?? study.role
  const team = fromSummary(study, 'Team')
  const status = fromSummary(study, 'Status') ?? fromSummary(study, 'Timeline') ?? fromSummary(study, 'Timeframe')
  const otherFacts = (study.quickSummary ?? []).filter(
    (q) => !['my role', 'team', 'status', 'timeline', 'timeframe'].includes(q.label.toLowerCase()),
  )

  return (
    <article className="w-full">
      {activeImage && <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 1 · Opening */}
        <header className="pt-20 pb-12 md:pt-28 md:pb-16">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <div className={`${label} mt-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-border/60 pb-5 md:mt-12`}>
            <span className="text-foreground">{study.client}</span>
            <span>{study.year}</span>
            <span>{study.tags.join(' · ')}</span>
          </div>

          <h1 className="mt-10 max-w-5xl text-balance text-4xl font-medium leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl md:mt-14">
            {study.title}
          </h1>
          <p className="mt-8 max-w-[60ch] text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {study.summary}
          </p>
        </header>

        {/* 2 · The short version — for the 30-second read */}
        <section aria-labelledby="tldr" className="pb-12 md:pb-16">
          <h2 id="tldr" className={`${label} mb-6`}>
            <span className="text-pink-400">At a glance</span>
          </h2>
          <dl className="grid grid-cols-1 border-y border-border/60 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: 'The problem', v: study.challenge },
              { k: 'What I did', v: study.approach },
              { k: 'The outcome', v: study.outcome },
              { k: 'My role', v: [role, team].filter(Boolean).join(' ') },
            ].map((f, i) => (
              <div
                key={f.k}
                className={`min-w-0 py-6 md:py-8 ${i > 0 ? 'border-t border-border/60 md:border-t-0' : ''} ${
                  i % 2 === 1 ? 'md:border-l md:pl-6' : 'md:pr-6'
                } ${i >= 2 ? 'md:border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
              >
                <dt className={label}>{f.k}</dt>
                <dd className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-foreground/90">{f.v}</dd>
              </div>
            ))}
          </dl>
          {(status || otherFacts.length > 0) && (
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              {status && (
                <div>
                  <dt className={label}>Status</dt>
                  <dd className="mt-1.5 max-w-[46ch] text-muted-foreground">{status}</dd>
                </div>
              )}
              {otherFacts.map((f) => (
                <div key={f.label}>
                  <dt className={label}>{f.label}</dt>
                  <dd className="mt-1.5 max-w-[46ch] text-muted-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {/* 3 · Cover */}
        <button
          type="button"
          onClick={() => setActiveImage({ src: study.cover, alt: `${study.title} cover`, caption: study.title })}
          className="group relative block aspect-[16/9] w-full overflow-hidden rounded-md bg-card ring-1 ring-white/5"
          aria-label="Open the cover image larger"
        >
          <Image
            src={study.cover}
            alt={`${study.title} cover`}
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none"
            priority
          />
        </button>

        {/* 4 · Body: sticky index + story */}
        {sections.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-10 pt-16 md:pt-24 lg:grid-cols-12">
            <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
              <ol className="sticky top-28 space-y-1 border-l border-border/60">
                {sections.map((s, i) => {
                  const on = activeId === s.id
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={on ? 'true' : undefined}
                        className={`-ml-px flex min-h-9 items-baseline gap-3 border-l py-1.5 pl-4 text-sm transition-colors ${
                          on
                            ? 'border-pink-400 text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className={`text-xs tabular-nums ${on ? 'text-pink-400' : ''}`}>{num(i + 1)}</span>
                        <span className="text-pretty">{s.heading}</span>
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <div className="min-w-0 lg:col-span-9">
              {sections.map((s, i) => (
                <StorySection key={s.id} id={s.id} n={i + 1} section={s} onImage={setActiveImage} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-14 py-16 md:py-24">
            {[
              ['Overview', study.overview],
              ['The challenge', study.challenge],
              ['Approach', study.approach],
              ['Outcome', study.outcome],
            ].map(([h, b], i) => (
              <section key={h}>
                <p className={`${label} flex gap-3.5`}>
                  <span className="text-pink-400">{num(i + 1)}</span>
                  <span>{h}</span>
                </p>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground/90">{b}</p>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* 5 · Next case study: an image card, so it reads differently from the contact footer below */}
      <div className="mx-auto mt-20 max-w-6xl px-4 pb-20 sm:px-6 md:mt-28 md:pb-28">
        <Link
          href={`/work/${next.slug}`}
          className="group relative block overflow-hidden rounded-md bg-card ring-1 ring-white/5"
        >
          <span className="relative block aspect-[16/9]">
            <Image
              src={next.cover}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            {/* frosted blur that fades in towards the bottom, behind the text */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-3/4 backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black_45%,transparent)] [mask-image:linear-gradient(to_top,black_45%,transparent)]"
            />
            {/* and a dark tint over it, so white text has strong contrast on any cover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,12,0.9)_0%,rgba(8,7,12,0.7)_35%,rgba(8,7,12,0.3)_65%,transparent_100%)]"
            />
          </span>

          <span className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:gap-6 sm:p-10 md:flex-row md:items-end md:justify-between md:p-12">
            <span className="max-w-3xl">
              <span className="block text-xs font-medium uppercase tracking-[0.08em] text-white/70">
                <span className="text-pink-300">Next case study</span>
                <span className="ml-3.5">{`${next.client} · ${next.year}`}</span>
              </span>
              <span className="mt-2 block text-balance text-lg font-medium leading-[1.1] tracking-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-3xl lg:text-5xl">
                {next.title}
              </span>
            </span>
            <span className="hidden shrink-0 items-center gap-3 self-start rounded-full sm:inline-flex bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-md transition-colors group-hover:bg-white/15 md:self-auto">
              Read it
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
                →
              </span>
            </span>
          </span>
        </Link>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

function StorySection({
  id,
  n,
  section,
  onImage,
}: {
  id: string
  n: number
  section: CaseStudySection & { lead?: string }
  onImage: (img: CaseStudyImage) => void
}) {
  const trailing = section.images?.filter((im) => im.afterBullet === undefined && im.afterDecision === undefined) ?? []

  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-border/60 py-14 first:border-t-0 first:pt-0 md:py-20">
      <p className={`${label} flex gap-3.5`}>
        <span className="text-pink-400">{num(n)}</span>
      </p>
      <h2 id={`${id}-h`} className="mt-4 max-w-3xl text-balance text-3xl font-medium leading-[1.12] tracking-tight text-foreground md:text-4xl">
        {section.heading}
      </h2>

      {/* The one line to take away, for skimmers */}
      {section.lead && (
        <p className="mt-6 max-w-[56ch] text-pretty text-xl leading-snug tracking-tight text-foreground md:text-2xl">
          {section.lead}
        </p>
      )}

      <div className="mt-8 max-w-[66ch] space-y-5">
        {section.paragraphs?.map((p, i) => (
          <p key={i} className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {p}
          </p>
        ))}
      </div>

      {section.bullets && (
        <ul className="mt-10 border-t border-border/60">
          {section.bullets.map((b, i) => {
            const { lead, rest } = splitLead(b)
            return (
              <li key={i} className="border-b border-border/60 py-6">
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-2">
                  <span className="pt-1 text-xs font-medium tabular-nums text-pink-400">{num(i + 1)}</span>
                  <p className="max-w-[64ch] text-pretty leading-relaxed text-muted-foreground md:text-lg">
                    {lead && <strong className="font-medium text-foreground">{lead}: </strong>}
                    {rest}
                  </p>
                </div>
                {section.images
                  ?.filter((im) => im.afterBullet === i)
                  .map((im, k) => (
                    <Figure key={k} image={im} onOpen={onImage} className="mt-8" />
                  ))}
              </li>
            )
          })}
        </ul>
      )}

      {section.decisions && (
        <ol className="mt-10 space-y-6">
          {section.decisions.map((d, i) => (
            <li key={d.title}>
              <Decision decision={d} n={i + 1} />
              {section.images
                ?.filter((im) => im.afterDecision === i)
                .map((im, k) => (
                  <Figure key={k} image={im} onOpen={onImage} className="mt-6" />
                ))}
            </li>
          ))}
        </ol>
      )}

      {section.testimonialQuotes?.map((t) => (
        <figure key={t.name} className="mt-10 border-l-2 border-pink-400 pl-6 md:pl-8">
          <blockquote>
            <p className="max-w-[56ch] text-pretty text-xl leading-snug tracking-tight text-foreground md:text-2xl">
              <span aria-hidden="true" className="text-pink-400">“</span>
              {t.quote}
              <span aria-hidden="true" className="text-pink-400">”</span>
            </p>
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted-foreground">
            <span className="text-foreground">{t.name}</span>
            <span aria-hidden="true"> · </span>
            {t.title}
          </figcaption>
        </figure>
      ))}

      {section.callout && (
        <aside className="mt-10 rounded-md bg-white/[0.03] p-6 ring-1 ring-white/5 md:p-8">
          <p className={label}>
            <span className="text-pink-400">Worth noting</span>
          </p>
          <p className="mt-3 max-w-[60ch] text-pretty text-lg leading-relaxed text-foreground/90">{section.callout}</p>
          {section.calloutAttribution && <p className="mt-3 text-sm text-muted-foreground">{section.calloutAttribution}</p>}
        </aside>
      )}

      {trailing.length > 0 && (
        <div className="mt-12 space-y-10">
          {trailing.map((im, k) => (
            <Figure key={k} image={im} onOpen={onImage} />
          ))}
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Pieces                                                               */
/* ------------------------------------------------------------------ */

function Decision({ decision, n }: { decision: CaseStudyDecision; n: number }) {
  const rows = [
    { k: 'Problem', v: decision.problem },
    { k: 'Change', v: decision.change },
    { k: 'Why it matters', v: decision.why },
  ]
  return (
    <div className="rounded-md bg-white/[0.03] p-6 ring-1 ring-white/5 md:p-8">
      <p className="flex items-baseline gap-3.5">
        <span className="text-xs font-medium tabular-nums text-pink-400">{num(n)}</span>
        <span className="text-lg font-medium tracking-tight text-foreground md:text-xl">{decision.title}</span>
      </p>
      <dl className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {rows.map((r) => (
          <div key={r.k} className="min-w-0">
            <dt className={label}>{r.k}</dt>
            <dd className="mt-2 text-pretty leading-relaxed text-muted-foreground">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Figure({
  image,
  onOpen,
  className = '',
}: {
  image: CaseStudyImage
  onOpen: (img: CaseStudyImage) => void
  className?: string
}) {
  const sized = Boolean(image.width && image.height)
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => onOpen(image)}
        className="group relative block w-full overflow-hidden rounded-md bg-card ring-1 ring-white/5"
        aria-label={`Open larger: ${image.caption ?? image.alt}`}
      >
        {sized ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 100vw, 860px"
            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.01] motion-reduce:transition-none"
          />
        ) : (
          <span className="relative block aspect-[16/9] w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 860px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01] motion-reduce:transition-none"
            />
          </span>
        )}
      </button>
      {image.caption && (
        <figcaption className="mt-3 max-w-[64ch] text-pretty text-sm leading-relaxed text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

function Lightbox({ image, onClose }: { image: CaseStudyImage; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption ?? image.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/15"
      >
        <X className="size-5" />
      </button>
      <figure className="max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width || 1920}
          height={image.height || 1080}
          className="max-h-[82vh] w-auto rounded-md object-contain"
        />
        {image.caption && <figcaption className="mt-4 text-center text-sm text-white/70">{image.caption}</figcaption>}
      </figure>
    </div>
  )
}
