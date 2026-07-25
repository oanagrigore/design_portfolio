import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import {
  caseStudies,
  type CaseStudyDecision,
  type CaseStudyImage,
  type CaseStudySection,
} from '@/lib/content'

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) return { title: 'Case study — Oana Grigore' }
  return {
    title: `${study.title} — Oana Grigore`,
    description: study.summary,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = caseStudies.findIndex((s) => s.slug === slug)
  const study = caseStudies[index]

  if (!study) notFound()

  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <article className="mx-auto max-w-4xl px-6">
      <div className="pt-16 md:pt-20">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>
      </div>

      <header className="pt-10 pb-12 md:pt-12 md:pb-16">
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          {study.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {study.summary}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Client</dt>
            <dd className="mt-1 text-sm text-foreground">{study.client}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Role</dt>
            <dd className="mt-1 text-sm text-foreground">{study.role}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Year</dt>
            <dd className="mt-1 text-sm text-foreground">{study.year}</dd>
          </div>
        </dl>
      </header>

      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/60 bg-card">
        <Image
          src={study.cover || '/placeholder.svg'}
          alt={`${study.title} cover`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      {study.quickSummary && (
        <aside className="mt-12 rounded-lg border border-border/60 bg-card p-6 md:p-8">
          <h2 className="text-sm font-medium tracking-tight text-primary">
            Quick summary
          </h2>
          <dl className="mt-6 flex flex-col">
            {study.quickSummary.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-b border-border/60 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="shrink-0 text-xs uppercase tracking-wide text-muted-foreground sm:w-40">
                  {item.label}
                </dt>
                <dd className="text-pretty leading-relaxed text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      )}

      {study.sections ? (
        <div className="py-16 md:py-20">
          <MetricsBlock metrics={study.metrics} />
          <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
            {study.sections.map((section, i) => (
              <RichSection
                key={section.heading}
                section={section}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-14 py-16 md:py-20">
          <Section title="Overview" body={study.overview} />
          <Section title="The challenge" body={study.challenge} />
          <Section title="Approach" body={study.approach} />
          <MetricsBlock metrics={study.metrics} border />
          <Section title="Outcome" body={study.outcome} />
        </div>
      )}

      <div className="border-t border-border/60 py-12">
        <p className="text-sm text-muted-foreground">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="group mt-3 flex items-center justify-between gap-4"
        >
          <span className="text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            {next.title}
          </span>
          <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      </div>
    </article>
  )
}

function MetricsBlock({
  metrics,
  border,
}: {
  metrics: { label: string; value: string }[]
  border?: boolean
}) {
  return (
    <section
      className={
        border
          ? 'grid grid-cols-1 gap-8 border-y border-border/60 py-12 sm:grid-cols-3'
          : 'grid grid-cols-1 gap-8 border-b border-border/60 pb-12 sm:grid-cols-3'
      }
    >
      {metrics.map((metric) => (
        <div key={metric.label}>
          <p className="text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            {metric.value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </section>
  )
}

function RichSection({
  section,
  index,
}: {
  section: CaseStudySection
  index: number
}) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
      <div>
        <h2 className="flex items-baseline gap-3 text-sm font-medium tracking-tight text-muted-foreground">
          <span className="tabular-nums text-primary">
            {String(index).padStart(2, '0')}
          </span>
          {section.heading}
        </h2>
      </div>
      <div className="space-y-6">
        {section.paragraphs?.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="text-pretty text-lg leading-relaxed text-foreground"
          >
            {paragraph}
          </p>
        ))}

        {section.bullets && (
          <ul className="flex flex-col gap-4">
            {section.bullets.map((bullet, i) => {
              return (
              <li key={bullet.slice(0, 32)} className="flex flex-col gap-4">
                <div className="flex gap-3 text-pretty leading-relaxed text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-primary"
                  />
                  <span>{bullet}</span>
                </div>
                {section.images?.filter(image => image.afterBullet === i).map(
                  (image, idx) => (
                     <SectionImage image={image} key={`${image.src}-${idx}-${i}`}/>
                  )
                )}
              </li>
            )})}
          </ul>
        )}

        {section.images?.filter(image => image.afterBullet === undefined && image.afterDecision === undefined).map(
          (image, idx) => (
              <SectionImage image={image} key={`${image.src}-trailing-${idx}`}/>
            )
        )}

        {section.decisions && (
          <ol className="flex flex-col gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60">
            {section.decisions.map((decision, i) => (
              <li key={decision.title} className="flex flex-col gap-px">
                <DecisionItem decision={decision} />
                {section.images
                  ?.filter((image) => image.afterDecision === i)
                  .map((image, idx) => (
                    <div className="bg-card p-6 pt-0" key={`${image.src}-${idx}-${i}`}>
                      <SectionImage image={image} />
                    </div>
                  ))}
              </li>
            ))}
          </ol>
          )}

        {section.callout && (
          <div className="rounded-lg border border-primary/25 bg-primary/5 p-6">
            <p className="text-pretty leading-relaxed text-foreground">
              {section.callout}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function SectionImage({ image }: { image: CaseStudyImage }) {
  const hasIntrinsicSize = Boolean(image.width && image.height)

  return (
    <figure className="my-2">
      {hasIntrinsicSize ? (
        <Image
          src={image.src || '/placeholder.svg'}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 100vw, 600px"
          className="h-auto w-full rounded-lg border border-border/60 bg-card"
        />
      ) : (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/60 bg-card">
          <Image
            src={image.src || '/placeholder.svg'}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-top"
          />
        </div>
      )}
      {image.caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
    <div className="bg-card p-6">
      <h3 className="text-base font-medium tracking-tight text-foreground">
        {decision.title}
      </h3>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[4.5rem_1fr] gap-3">
            <dt className="text-xs uppercase tracking-wide text-primary">
              {row.label}
            </dt>
            <dd className="text-pretty leading-relaxed text-muted-foreground">
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
    <section className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
      <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
        {title}
      </h2>
      <p className="text-pretty text-lg leading-relaxed text-foreground">
        {body}
      </p>
    </section>
  )
}
