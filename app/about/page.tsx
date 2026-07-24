import type { Metadata } from 'next'
import Image from 'next/image'
import {
  certifications,
  experience,
  highlights,
  profile,
  services,
} from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — Oana Grigore',
  description:
    'A little about Oana Grigore, a senior product designer based in Bucharest, Romania.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="text-sm text-muted-foreground">About</p>
        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          {`${profile.name} — ${profile.role}, based in ${profile.location}.`}
        </h1>
      </section>

      <section className="grid grid-cols-1 gap-12 border-t border-border/60 py-16 md:grid-cols-[2fr_1fr] md:gap-16 md:py-20">
        <div className="order-2 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground md:order-1">
          <p>
            {`Right now I'm leading design strategy across 5 transportation brands, from premium chauffeur services to non-emergency medical transport (NEMT), where accessibility isn't a nice-to-have but a mandatory requirement.`}
          </p>
          <p>
            I shape everything from landing pages and social to product flows
            across multiple platforms.
          </p>
          <p>
            {`With 8+ years of experience designing web applications for 40+ Shopify apps and 30,000+ merchants, and a 14-year foundation in visual, graphic, and web design.`}
          </p>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/60 bg-card">
            <Image
              src={profile.name ? '/portrait.png' : '/placeholder.svg'}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20">
        <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
          Results include
        </h2>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <li
              key={item}
              className="flex flex-col gap-4 bg-card p-6"
            >
              <span className="text-sm font-medium tabular-nums text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-pretty leading-relaxed text-foreground">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20">
        <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
          Experience
        </h2>
        <ol className="flex flex-col">
          {experience.map((item) => (
            <li
              key={`${item.role}-${item.company}`}
              className="border-b border-border/60 py-8 first:pt-0 last:border-b-0"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {item.role}
                  <span className="text-muted-foreground">
                    {' · '}
                    {item.company}
                  </span>
                </h3>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.bullets.length > 0 && (
                <ul className="mt-4 flex max-w-2xl flex-col gap-3">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-pretty leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-primary"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20">
        <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
          Certifications
        </h2>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex flex-col gap-1 bg-card p-6">
              <span className="text-base font-medium tracking-tight text-foreground">
                {cert.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {cert.issuer}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20">
        <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
          Capabilities
        </h2>
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-border px-4 py-2 text-sm text-foreground"
            >
              {service}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
