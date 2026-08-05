import type { Metadata } from 'next'
import Image from 'next/image'
import {
  certifications,
  experience,
  highlights,
  profile,
  services,
} from '@/lib/content'
import { AboutAnimator } from '@/components/about-animator'

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    'Lead Product Designer driving design strategy and accessible product design across multiple brands and platforms, from marketing to product flows.',
}

export default function AboutPage() {
  return (
    <AboutAnimator>
      <div className="mx-auto max-w-6xl px-6">
        <section className="pt-24 pb-16 md:pt-32 md:pb-20">
          <p data-animate="hero-label" className="text-sm text-muted-foreground">
            About
          </p>
          <h1
            data-animate="hero-title"
            className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            {`${profile.name} — ${profile.role}, based in ${profile.location}.`}
          </h1>
        </section>

        <section className="grid grid-cols-1 gap-12 py-16 md:grid-cols-[2fr_1fr] md:gap-16 md:py-20">
          <div
            data-animate="hero-bio"
            className="order-2 space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground md:order-1"
          >
            {(profile.aboutIntro ?? []).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="order-1 md:order-2">
            <div
              data-animate="hero-image"
              className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/60 bg-card"
            >
              <Image
                src={profile.name ? '/oana-grigore.JPG' : '/placeholder.svg'}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Selected Impact Section */}
        <section
          data-animate="impact-section"
          className="grid grid-cols-1 gap-10 py-16 md:grid-cols-[1fr_2fr] md:py-20"
        >
          <div>
            <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
              Selected Impact
            </h2>
            <p className="mt-2 text-sm text-muted-foreground/80">
              Key outcomes across systems, accessibility, and reach.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item.title}
                data-animate="impact-card"
                className="flex flex-col justify-between gap-6 bg-card p-8 transition-colors hover:bg-accent/5"
              >
                <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {item.value}
                </span>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Experience Section */}
        <section className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20">
          <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
            Experience
          </h2>
          <ol className="flex flex-col">
            {experience.map((item) => (
              <li
                key={`${item.role}-${item.company}`}
                data-animate="experience-item"
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

        {/* Certifications Section */}
        <section
          data-animate="certs-section"
          className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20"
        >
          <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
            Certifications
          </h2>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                data-animate="cert-item"
                className="flex flex-col gap-1 bg-card p-6"
              >
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

        {/* Capabilities Section */}
        <section
          data-animate="capabilities-section"
          className="grid grid-cols-1 gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_2fr] md:py-20"
        >
          <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
            Capabilities
          </h2>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <span
                key={service}
                data-animate="capability-badge"
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground"
              >
                {service}
              </span>
            ))}
          </div>
        </section>
      </div>
    </AboutAnimator>
  )
}