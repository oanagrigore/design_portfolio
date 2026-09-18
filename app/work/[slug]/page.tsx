'use client'

import React, { useState } from 'react'
import type { Metadata } from 'next'
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
            className="absolute top-6 right-6 rounded-full bg-card p-3 text-foreground shadow-lg border border-border/80 hover:bg-muted transition-colors"
            onClick={() => setActiveImage(null)}
            aria-label="Close image lightbox"
          >
            <X className="size-6" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xl"
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
              <p className="bg-card/90 p-4 text-center text-sm font-medium text-muted-foreground border-t border-border/60">
                {activeImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Hero Container */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="pt-16 md:pt-20">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-x-1 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>
        </div>

        <header className="pt-10 pb-12 md:pt-12 md:pb-16">
          <div className="flex flex-wrap gap-2.5">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/80 bg-muted/40 px-3.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {study.title}
          </h1>

          <p className="mt-8 max-w-3xl text-pretty text-xl leading-relaxed text-muted-foreground font-normal">
            {study.summary}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border/80 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Client
              </dt>
              <dd className="mt-1.5 text-base font-medium text-foreground">
                {study.client}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Role
              </dt>
              <dd className="mt-1.5 text-base font-medium text-foreground">
                {study.role}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Year
              </dt>
              <dd className="mt-1.5 text-base font-medium text-foreground">
                {study.year}
              </dd>
            </div>
          </dl>
        </header>

        {/* Hero Cover Frame */}
        <div
          className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl transition-all hover:border-primary/50"
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
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            priority
          />
          <div className="absolute top-4 right-4 rounded-full bg-background/80 p-2.5 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <Maximize2 className="size-4 text-foreground" />
          </div>
        </div>

        {/* Quick Summary Aside */}
        {study.quickSummary && (
          <aside className="mt-16 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-8 md:p-10 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
              Quick Summary
            </h2>
            <dl className="mt-6 flex flex-col divide-y divide-border/60">
              {study.quickSummary.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-10"
                >
                  <dt className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-44">
                    {item.label}
                  </dt>
                  <dd className="text-pretty text-base leading-relaxed text-foreground font-normal">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>

      {/* Main Content Sections */}
      {study.sections ? (
        <div className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <MetricsBlock metrics={study.metrics} />
          </div>

          <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
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
        <div className="mx-auto max-w-5xl px-6 space-y-16 py-20 md:py-28">
          <Section title="Overview" body={study.overview} />
          <Section title="The challenge" body={study.challenge} />
          <Section title="Approach" body={study.approach} />
          <MetricsBlock metrics={study.metrics} />
          <Section title="Outcome" body={study.outcome} />
        </div>
      )}

      {/* Next Project Footer */}
      <div className="border-t border-border/80 bg-muted/20 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Next project
          </p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-4 flex items-center justify-between gap-6"
          >
            <span className="text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-5xl">
              {next.title}
            </span>
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
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
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col justify-between rounded-2xl bg-card p-8 min-h-[280px]"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] text-balance">
            {metric.value}
          </p>
          <p className="text-sm text-muted-foreground font-normal">
            {metric.label}
          </p>
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
    <section className="space-y-12">
      {/* 2-Column Sticky Layout Container */}
      <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-8 md:grid-cols-[1fr_2.2fr] md:gap-12 items-start">
        {/* Left Sticky Header */}
        <div className="md:sticky md:top-24">
          <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-foreground">
            <span className="tabular-nums font-mono text-sm font-bold text-primary">
              {String(index).padStart(2, '0')}
            </span>
            {section.heading}
          </h2>
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-pretty text-xl leading-relaxed text-foreground/90 font-normal"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="flex flex-col gap-6">
              {section.bullets.map((bullet, i) => (
                <li key={bullet.slice(0, 32)} className="flex flex-col gap-6">
                  <div className="flex gap-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-3 size-2 shrink-0 rounded-full bg-primary"
                    />
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

          {/* High-Impact Editorial Quote Callout */}
          {section.callout && (
            <blockquote className="relative my-6 overflow-hidden rounded-2xl border-l-4 border-primary bg-primary/5 p-8 md:p-10">
              <p className="text-pretty text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                “{section.callout}”
              </p>
              {section.quoteAuthor && (
                <footer className="mt-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.quoteAuthor}
                </footer>
              )}
            </blockquote>
          )}
        </div>
      </div>

      {/* Expanded Full-Bleed Image Container */}
      {hasTrailingImages && (
        <div className="mx-auto max-w-[1200px] px-6 space-y-10 pt-4">
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
      className={`group relative my-4 cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg transition-all hover:border-primary/50 hover:shadow-xl ${
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
              ? '(max-width: 1200px) 100vw, 1200px'
              : '(max-width: 768px) 100vw, 600px'
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
                ? '(max-width: 1200px) 100vw, 1200px'
                : '(max-width: 768px) 100vw, 600px'
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      )}

      <div className="absolute top-4 right-4 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
        <Maximize2 className="size-4 text-foreground" />
      </div>

      {image.caption && (
        <figcaption className="bg-card/90 px-6 py-3.5 text-center text-sm font-medium leading-relaxed text-muted-foreground border-t border-border/60">
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
    <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {decision.title}
      </h3>
      <dl className="mt-6 space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1.5 sm:grid-cols-[5rem_1fr] sm:gap-4"
          >
            <dt className="text-xs font-bold uppercase tracking-wider text-primary">
              {row.label}
            </dt>
            <dd className="text-pretty text-base leading-relaxed text-muted-foreground font-normal">
              {row.text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2.2fr] md:gap-12 items-start">
      <h2 className="text-lg font-semibold tracking-tight text-foreground md:sticky md:top-24">
        {title}
      </h2>
      <p className="text-pretty text-xl leading-relaxed text-foreground/90 font-normal">
        {body}
      </p>
    </section>
  )
}
