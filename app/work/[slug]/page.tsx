'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Maximize2, X } from 'lucide-react'
import {
  caseStudies,
  type CaseStudyDecision,
  type CaseStudyImage,
  type CaseStudySection,
} from '@/lib/content'

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = React.use(params)
  const index = caseStudies.findIndex((s) => s.slug === slug)
  const study = caseStudies[index]

  if (!study) notFound()

  const next = caseStudies[(index + 1) % caseStudies.length]
  const [activeImage, setActiveImage] = useState<CaseStudyImage | null>(null)

  return (
    <article className="w-full">
      {/* Lightbox Modal for Image Expansion */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4 md:p-10"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 rounded-full bg-card p-3 text-foreground shadow-lg border border-border hover:bg-muted transition-colors"
            onClick={() => setActiveImage(null)}
            aria-label="Close image lightbox"
          >
            <X className="size-6" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.src || '/placeholder.svg'}
              alt={activeImage.alt}
              width={activeImage.width || 1920}
              height={activeImage.height || 1080}
              className="max-h-[85vh] w-auto object-contain"
            />
            {activeImage.caption && (
              <p className="bg-card/90 p-4 text-center text-sm font-medium text-muted-foreground border-t border-border">
                {activeImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="pt-16 md:pt-24">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-x-1 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>
        </div>

        <header className="pt-12 pb-14 md:pt-16 md:pb-20">
          {/* Eyebrow meta line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="text-pink-400">{study.client}</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span className="text-muted-foreground">{study.role}</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span className="text-muted-foreground">{study.year}</span>
          </div>

          <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {study.title}
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            {study.summary}
          </p>

          <div className="mt-9 flex flex-wrap gap-2.5">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
      </div>

      {/* Full-width cover band */}
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50"
          onClick={() =>
            setActiveImage({
              src: study.cover,
              alt: study.title,
              caption: study.title,
            })
          }
        >
          <Image
            src={study.cover || '/placeholder.svg'}
            alt={`${study.title} cover`}
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            priority
          />
          <div className="absolute top-4 right-4 rounded-full bg-background/80 p-2.5 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <Maximize2 className="size-4 text-foreground" />
          </div>
        </div>
      </div>

      {/* Editorial lead statement (impact) */}
      {study.impactText && (
        <div className="mx-auto max-w-5xl px-6">
          <p className="mt-16 max-w-4xl text-balance text-2xl font-medium leading-[1.4] tracking-tight text-foreground md:mt-24 md:text-[2rem]">
            {study.impactText}
          </p>
        </div>
      )}

      {/* Quick summary as a spec sheet */}
      {study.quickSummary && (
        <aside className="mx-auto max-w-5xl px-6">
          <div className="mt-14 md:mt-20">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-400">
              At a glance
            </h2>
            <dl className="mt-6 border-t border-border">
              {study.quickSummary.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 gap-1.5 border-b border-border py-6 sm:grid-cols-[11rem_1fr] sm:gap-10"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-pretty text-base leading-relaxed text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      )}

      {/* Main content */}
      {study.sections ? (
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <MetricsBlock metrics={study.metrics} />
          </div>

          <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
            {study.sections.map((section, i) => (
              <RichSection
                key={section.heading}
                section={section}
                index={i + 1}
                onImageClick={(img) => setActiveImage(img)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-6 space-y-16 py-16 md:py-24">
          <MetricsBlock metrics={study.metrics} />
          <Section title="Overview" body={study.overview} index={1} />
          <Section title="The challenge" body={study.challenge} index={2} />
          <Section title="Approach" body={study.approach} index={3} />
          <Section title="Outcome" body={study.outcome} index={4} />
        </div>
      )}

      {/* Next project */}
      <div className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-400">
            Next project
          </p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-5 flex items-center justify-between gap-6"
          >
            <span className="text-balance text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-pink-400 sm:text-5xl">
              {next.title}
            </span>
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-all group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white">
              <ArrowUpRight className="size-7 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  )
}

function MetricsBlock({
  metrics,
}: {
  metrics: { label: string; value: string }[]
}) {
  return (
    <section className="grid grid-cols-1 border-t border-border sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="border-b border-border py-8 sm:border-b-0 sm:border-r sm:px-8 sm:py-10 sm:first:pl-0 sm:last:border-r-0"
        >
          <p className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-pink-400 md:text-4xl">
            {metric.value}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </section>
  )
}

function RichSection({
  section,
  index,
  onImageClick,
}: {
  section: CaseStudySection
  index: number
  onImageClick: (image: CaseStudyImage) => void
}) {
  const hasTrailingImages = section.images?.some(
    (image) =>
      image.afterBullet === undefined && image.afterDecision === undefined
  )

  return (
    <section className="space-y-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-8 border-t border-border pt-12 md:grid-cols-[200px_1fr] md:gap-16 md:pt-16 items-start">
          {/* Sticky numbered header */}
          <div className="md:sticky md:top-28">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold tabular-nums text-primary">
                {String(index).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
            </div>
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-foreground">
              {section.heading}
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-pretty text-xl leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}

            {section.bullets && (
              <ul className="flex flex-col">
                {section.bullets.map((bullet, i) => (
                  <li
                    key={bullet.slice(0, 32)}
                    className="flex flex-col gap-6 border-t border-border py-6 first:border-t-0 first:pt-0"
                  >
                    <div className="flex gap-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                      <span className="shrink-0 pt-1 font-mono text-xs font-semibold tabular-nums text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{bullet}</span>
                    </div>
                    {section.images
                      ?.filter((image) => image.afterBullet === i)
                      .map((image, idx) => (
                        <SectionImage
                          image={image}
                          key={`${image.src}-${idx}-${i}`}
                          onClick={() => onImageClick(image)}
                        />
                      ))}
                  </li>
                ))}
              </ul>
            )}

            {section.decisions && (
              <ol className="flex flex-col gap-4">
                {section.decisions.map((decision, i) => (
                  <li key={decision.title} className="flex flex-col gap-4">
                    <DecisionItem decision={decision} />
                    {section.images
                      ?.filter((image) => image.afterDecision === i)
                      .map((image, idx) => (
                        <SectionImage
                          image={image}
                          key={`${image.src}-${idx}-${i}`}
                          onClick={() => onImageClick(image)}
                        />
                      ))}
                  </li>
                ))}
              </ol>
            )}

            {/* Editorial pull-quote */}
            {section.callout && (
              <blockquote className="my-4 border-l-2 border-pink-500 pl-6 md:pl-8">
                <p className="text-pretty text-xl font-medium leading-[1.45] text-foreground sm:text-2xl">
                  <span aria-hidden="true" className="text-pink-400">
                    {'“'}
                  </span>
                  {section.callout}
                  <span aria-hidden="true" className="text-pink-400">
                    {'”'}
                  </span>
                </p>
                {section.calloutAttribution && (
                  <cite className="mt-4 block text-xs font-semibold not-italic uppercase tracking-[0.14em] text-muted-foreground">
                    {section.calloutAttribution}
                  </cite>
                )}
              </blockquote>
            )}
          </div>
        </div>
      </div>

      {/* Trailing full-bleed imagery */}
      {hasTrailingImages && (
        <div className="mx-auto max-w-6xl px-6 space-y-10 pt-2">
          {section.images
            ?.filter(
              (image) =>
                image.afterBullet === undefined &&
                image.afterDecision === undefined
            )
            .map((image, idx) => (
              <SectionImage
                image={image}
                key={`${image.src}-trailing-${idx}`}
                isFullBleed
                onClick={() => onImageClick(image)}
              />
            ))}
        </div>
      )}
    </section>
  )
}

function SectionImage({
  image,
  isFullBleed,
  onClick,
}: {
  image: CaseStudyImage
  isFullBleed?: boolean
  onClick?: () => void
}) {
  const hasIntrinsicSize = Boolean(image.width && image.height)

  return (
    <figure
      className={`group relative my-2 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50 ${
        isFullBleed ? 'w-full' : ''
      }`}
      onClick={onClick}
    >
      {hasIntrinsicSize ? (
        <Image
          src={image.src || '/placeholder.svg'}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={
            isFullBleed
              ? '(max-width: 1200px) 100vw, 1152px'
              : '(max-width: 768px) 100vw, 640px'
          }
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
        />
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-card">
          <Image
            src={image.src || '/placeholder.svg'}
            alt={image.alt}
            fill
            sizes={
              isFullBleed
                ? '(max-width: 1200px) 100vw, 1152px'
                : '(max-width: 768px) 100vw, 640px'
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      )}

      <div className="absolute top-4 right-4 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
        <Maximize2 className="size-4 text-foreground" />
      </div>

      {image.caption && (
        <figcaption className="border-t border-border bg-card/90 px-6 py-3.5 text-center text-sm font-medium leading-relaxed text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

function DecisionItem({ decision }: { decision: CaseStudyDecision }) {
  const rows: { label: string; text: string }[] = [
    { label: 'Problem', text: decision.problem },
    { label: 'Change', text: decision.change },
    { label: 'Why', text: decision.why },
  ]
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {decision.title}
      </h3>
      <dl className="mt-6 divide-y divide-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[5rem_1fr] sm:gap-4"
          >
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
              {row.label}
            </dt>
            <dd className="text-pretty text-base leading-relaxed text-muted-foreground">
              {row.text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Section({
  title,
  body,
  index,
}: {
  title: string
  body: string
  index: number
}) {
  return (
    <section className="grid grid-cols-1 gap-8 border-t border-border pt-12 md:grid-cols-[200px_1fr] md:gap-16 md:pt-16 items-start">
      <div className="md:sticky md:top-28">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold tabular-nums text-primary">
            {String(index).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </div>
        <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      <p className="text-pretty text-xl leading-relaxed text-foreground/90">
        {body}
      </p>
    </section>
  )
}
