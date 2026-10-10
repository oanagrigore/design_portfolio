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
import { FiveReasons } from '@/components/five-reasons'
import { JsonLd, personId } from '@/components/json-ld'
import { SITE_URL, absoluteUrl } from '@/lib/seo'

// Matches the file name in /public exactly (Vercel paths are case-sensitive)
const PORTRAIT = '/oana-grigore.JPG'
const DESCRIPTION = `${profile.role} driving design strategy and accessible product design across multiple brands and platforms, from marketing to product flows.`

// Not in lib/content yet. Move it there if you prefer; replace the period with your real years.
const EARLIER_ROLES = {
  period: 'Before 2016',
  role: 'Graphic Designer · Marketing Specialist',
  company: 'NGOs, startups and local companies',
}


export const metadata: Metadata = {
  // The root layout adds "— Oana Grigore" automatically
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: `${profile.name} — ${profile.role}`,
    description: DESCRIPTION,
    images: [{ url: PORTRAIT, alt: `Portrait of ${profile.name}` }],
  },
}

const label =
  'text-xs font-medium uppercase tracking-[0.08em] tabular-nums text-muted-foreground'

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className={`${label} mb-10 flex items-baseline gap-3.5 md:mb-14`}>
      <span className="text-pink-400">{n}</span>
      <span>{children}</span>
    </p>
  )
}

function PlusIcon() {
  return (
    <span
      aria-hidden="true"
      className="grid size-6 place-items-center rounded-full border border-border/60 text-muted-foreground transition duration-300 group-hover:border-muted-foreground group-open:rotate-45 group-open:border-pink-400 group-open:text-pink-400 motion-reduce:transition-none"
    >
      <svg viewBox="0 0 10 10" width="10" height="10" className="block">
        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

// Shared row grid: period · role · company · icon
const rowGrid =
  'grid grid-cols-[1fr_24px] items-center gap-x-3 gap-y-1 py-6 md:grid-cols-[2.2fr_4fr_3fr_24px] md:items-baseline md:gap-4'

const period = 'text-xs font-medium tabular-nums text-muted-foreground'

export default function AboutPage() {
  return (
    <AboutAnimator>
      {/* Tells search engines and AI assistants this page is about you */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': `${SITE_URL}/about#profilepage`,
          url: absoluteUrl('/about'),
          name: `About ${profile.name}`,
          mainEntity: {
            '@id': personId,
            '@type': 'Person',
            name: profile.name,
            jobTitle: profile.role,
            image: absoluteUrl(PORTRAIT),
          },
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 1 · Opening */}
        <section
          aria-labelledby="about-title"
          className="grid grid-cols-1 gap-x-6 pt-24 pb-16 md:grid-cols-12 md:pt-36 md:pb-24"
        >
          <div
            data-animate="hero-label"
            className={`${label} col-span-full mb-10 flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-border/60 pb-5 md:mb-20`}
          >
            <span>About</span>
            <span className="text-foreground">
              Open to senior product design roles · Remote in Europe
            </span>
          </div>

          <div className="md:col-span-8">
            <h1
              id="about-title"
              data-animate="hero-title"
              className="text-balance text-4xl font-medium leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            >
              I design accessibility in from the start,{' '}
              <span className="text-muted-foreground">
                across portals, apps and the systems that hold them together.
              </span>
            </h1>
            <p className="mt-8 flex flex-wrap gap-x-5 gap-y-1.5 text-base text-muted-foreground md:mt-11">
              <span className="font-medium text-foreground">{profile.name}</span>
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </p>
          </div>

          <div className="mt-10 w-full max-w-md md:col-span-4 md:col-start-9 md:row-start-2 md:mt-0">
            <div
              data-animate="hero-image"
              className="relative aspect-4/5 overflow-hidden rounded bg-card"
            >
              <Image
                src={PORTRAIT}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* 2 · Bio */}
        <section className="grid grid-cols-1 pb-20 md:grid-cols-12 md:pb-36">
          <div data-animate="hero-bio" className="space-y-6 md:col-span-7 md:col-start-4">
            {(profile.aboutIntro ?? []).map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'max-w-[62ch] text-pretty text-xl leading-normal tracking-tight text-foreground md:text-2xl'
                    : 'max-w-[62ch] text-pretty text-lg leading-relaxed text-muted-foreground'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* 3 · Scope & scale: four facts, thin dividers, no boxes */}
        <section
          data-animate="impact-section"
          aria-labelledby="scope-heading"
          className="pb-20 md:pb-36"
        >
          <h2 id="scope-heading" className="sr-only">
            Scope and scale
          </h2>
          <ul className="grid grid-cols-1 border-y border-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, idx) => (
              <li
                key={item.value}
                data-animate="impact-card"
                className={[
                  'min-w-0 py-7 lg:py-10',
                  idx > 0 ? 'border-t border-border/60' : '',
                  // 2 columns: right column gets a left divider; second row a top divider
                  idx % 2 === 1 ? 'sm:border-l sm:pl-6' : 'sm:pr-6',
                  idx === 1 ? 'sm:border-t-0' : '',
                  // 4 columns: one row, dividers between every fact
                  'lg:border-t-0',
                  idx > 0 ? 'lg:border-l lg:pl-6' : '',
                  idx < highlights.length - 1 ? 'lg:pr-6' : '',
                ].join(' ')}
              >
                <span className="block text-3xl font-medium leading-none tracking-tight tabular-nums text-foreground lg:text-4xl">
                  {item.value}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 · How I work */}
        <section className="py-20 md:py-36">
          <SectionLabel n="01">How I work</SectionLabel>
          <FiveReasons />
        </section>

        {/* 5 · Experience: one line per role, details on demand */}
        <section className="py-20 md:py-36" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="sr-only">
            Experience
          </h2>
          <SectionLabel n="02">Experience</SectionLabel>
          <div className="border-t border-border/60">
            {experience.map((item) => (
              <details
                key={`${item.role}-${item.company}`}
                data-animate="experience-item"
                className="group border-b border-border/60"
              >
                <summary
                  className={`${rowGrid} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
                >
                  <span className={period}>{item.period}</span>
                  <h3 className="col-start-1 text-lg font-medium tracking-tight text-foreground md:col-start-auto md:text-xl">
                    {item.role}
                  </h3>
                  <span className="col-start-1 text-muted-foreground md:col-start-auto">
                    {item.company}
                  </span>
                  <span className="col-start-2 row-span-3 row-start-1 self-center justify-self-end md:col-start-auto md:row-span-1 md:row-start-auto">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="pb-7 md:grid md:grid-cols-[2.2fr_7fr_24px] md:gap-4">
                  <div className="max-w-[64ch] text-pretty leading-relaxed text-muted-foreground md:col-start-2">
                    <p>{item.description}</p>
                    {item.bullets.length > 0 && (
                      <ul className="mt-4 flex flex-col gap-3">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1 shrink-0 rounded-full bg-pink-400"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </details>
            ))}

            {/* Summary row: nothing to expand, so no icon */}
            <div
              data-animate="experience-item"
              className={`${rowGrid} border-b border-border/60`}
            >
              <span className={period}>{EARLIER_ROLES.period}</span>
              <h3 className="text-lg font-medium tracking-tight text-foreground md:text-xl">
                {EARLIER_ROLES.role}
              </h3>
              <span className="text-muted-foreground">{EARLIER_ROLES.company}</span>
            </div>
          </div>
        </section>

        {/* 6 · Toolkit & credentials */}
        <section data-animate="certs-section" className="py-20 md:py-36">
          <SectionLabel n="03">Toolkit &amp; credentials</SectionLabel>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div data-animate="capabilities-section">
              <h2 className={`${label} mb-5`}>Capabilities</h2>
              <ul>
                {services.map((service) => (
                  <li
                    key={service}
                    data-animate="capability-badge"
                    className="border-t border-border/60 py-3.5 text-foreground"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={`${label} mb-5`}>Certifications</h2>
              <ul>
                {certifications.map((cert) => (
                  <li
                    key={cert.name}
                    data-animate="cert-item"
                    className="flex justify-between gap-4 border-t border-border/60 py-3.5"
                  >
                    <span className="text-foreground">{cert.name}</span>
                    <span className="shrink-0 text-right text-sm text-muted-foreground">
                      {cert.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </AboutAnimator>
  )
}
