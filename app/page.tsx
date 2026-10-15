"use client";

import { Fragment, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies, profile, services } from '@/lib/content'
import { HeroAnimator } from '@/components/hero-animator'
import { AnimatedProjectCard } from '@/components/animated-project-card'
import ImageSlider from '@/components/ImageSlider'
import { PrimaryButton } from '@/components/PrimaryButton'
import { ReadingRoomHero } from '@/components/reading-room'
import { Sparkle } from '@/components/sparkle'

type Comparison = {
  id: string
  tabLabel: string
  title: string
  description: string
  caseStudyUrl: string
  beforeImage: string
  beforeAlt: string
  afterImage: string
  afterAlt: string
  aspectRatio: string
}

// Before / after pairs. No metrics here on purpose: none of these have a measured
// baseline yet, and the case studies say so. Add numbers only when you can defend them.
const COMPARISONS: Comparison[] = [
  {
    id: 'portal',
    tabLabel: 'Member Portal',
    title: 'Designing ride booking portal every Medicaid member can use',
    description:
      'Redesigned the complex legacy member portal to adhere to WCAG 2.1 AA standards, simplifying patient onboarding and drive scheduling.',
    caseStudyUrl: '/work/medidrive-member-portal',
    beforeImage: '/work/md-portal-before.png',
    beforeAlt: 'Legacy MediDrive Member Portal interface',
    afterImage: '/work/md-portal-after.png',
    afterAlt: 'Redesigned accessible MediDrive Member Portal interface',
    aspectRatio: '16/10',
  },
  {
    id: 'app',
    tabLabel: 'Mobile App Flow',
    title: 'MediDrive Native Mobile App',
    description:
      'Standardized tokenized mobile UI components to ensure seamless booking flows for patients with visual and motor impairments.',
    caseStudyUrl: '/work/design-system-redesign',
    beforeImage: '/work/md-app-before.png',
    beforeAlt: 'Legacy MediDrive Mobile App flow',
    afterImage: '/work/md-app-after.png',
    afterAlt: 'Redesigned accessible MediDrive Mobile App flow',
    aspectRatio: '16/10',
  },
  {
    id: 'omni',
    tabLabel: 'Omni Limousine',
    title: 'Omni Limousine Direct Booking Flow',
    description:
      'Transformed a static brand website into a high-converting, accessible direct-booking funnel for luxury chauffeur services in Las Vegas and Miami.',
    caseStudyUrl: '/work/omni-limousine',
    beforeImage: '/work/omni-before.png',
    beforeAlt: 'Legacy Omni Limousine website interface',
    afterImage: '/work/omni-after.png',
    afterAlt: 'Redesigned accessible Omni Limousine direct booking web experience',
    aspectRatio: '16/10',
  },
]

const heroLines = [
  { text: 'Make yourself at home.', className: 'block text-foreground' },
  {
    text: 'I’ll show you how I design for people who can’t afford to get lost.',
    className: 'block text-muted-foreground',
  },
]

const label =
  'text-xs font-medium uppercase tracking-[0.08em] tabular-nums text-muted-foreground'

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className={`${label} flex items-baseline gap-3.5`}>
      <span className="text-pink-400">{n}</span>
      <span>{children}</span>
    </p>
  )
}

/** The glass "+" from the reading room, reused as the link marker below it. */
function Plus() {
  return (
    <span
      aria-hidden="true"
      className="grid size-6 shrink-0 place-items-center rounded-full bg-white/5 text-foreground ring-1 ring-white/15 transition-transform duration-300 group-hover:rotate-90 group-hover:bg-white/10 motion-reduce:transition-none"
    >
      <svg viewBox="0 0 10 10" width="10" height="10">
        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

/**
 * Case-study cover with a big glass "View" bubble that follows the cursor on hover
 * (and sits in the centre on keyboard focus). Sparks rise from it like the fire in the hero.
 */
function Cover({ src, priority }: { src: string; priority: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const leave = () => {
    ref.current?.style.removeProperty('--mx')
    ref.current?.style.removeProperty('--my')
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="relative aspect-[16/10] overflow-hidden rounded-md bg-card ring-1 ring-white/5 md:col-span-7"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 58vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        priority={priority}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-10 hidden transition-[left,top] duration-150 ease-out md:block motion-reduce:transition-none"
        style={{ left: 'var(--mx, 50%)', top: 'var(--my, 50%)' }}
      >
        <span className="block -translate-x-1/2 -translate-y-1/2">
          <span className="block scale-50 opacity-0 transition duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
            <Sparkle on className="sp-big">
              <span className="relative grid size-28 place-items-center overflow-hidden rounded-full bg-[rgba(18,14,26,0.22)] text-sm font-medium tracking-wide text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-8px_16px_rgba(255,255,255,0.05),0_18px_40px_-14px_rgba(0,0,0,0.7)] ring-1 ring-white/25 backdrop-blur-xl backdrop-saturate-150">
                {/* soft light catching the top of the glass */}
                <span aria-hidden="true" className="absolute inset-x-3 top-1 h-1/2 rounded-full bg-gradient-to-b from-white/25 to-transparent opacity-70" />
                <span className="relative">View</span>
              </span>
            </Sparkle>
          </span>
        </span>
      </span>
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(COMPARISONS[0])
  const featured = caseStudies.slice(0, 4)

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <ReadingRoomHero />

      {/* The room's starlight carries on faintly down the page, on the right. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[80svh] z-0 h-[1600px]">
        <div className="absolute -right-40 top-[420px] size-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.08),transparent)]" />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
        {/* 1 · Introduction */}
        <HeroAnimator>
          <section className="pt-20 pb-24 md:pt-28 md:pb-36">
            <p className={`${label} mb-6 md:mb-8`}>{profile.name}</p>

            <h1 className="max-w-5xl text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              {heroLines.map((line, lineIndex) => (
                <span key={lineIndex} className={line.className}>
                  {line.text.split(' ').map((word, wordIndex, words) => (
                    <Fragment key={`${lineIndex}-${wordIndex}`}>
                      <span className="hero-title-word inline-block whitespace-nowrap">{word}</span>
                      {/* a real space, so crawlers, AI assistants and screen readers read words */}
                      {wordIndex < words.length - 1 ? ' ' : null}
                    </Fragment>
                  ))}
                  {lineIndex < heroLines.length - 1 ? ' ' : null}
                </span>
              ))}
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12">
              <p className="max-w-[58ch] text-pretty text-lg leading-relaxed text-muted-foreground md:col-span-7 md:text-xl">
                {profile.intro}
              </p>
              <div className="hero-cta-group flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end md:self-end">
                <Sparkle>
                  <PrimaryButton href="/work">View selected work</PrimaryButton>
                </Sparkle>
                <Sparkle>
                  <Link
                    href="/about"
                    className="inline-flex min-h-12 items-center rounded-full border border-border/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-muted-foreground"
                  >
                    About me
                  </Link>
                </Sparkle>
              </div>
            </div>
          </section>
        </HeroAnimator>

        {/* 2 · Selected work — the work comes first */}
        <section aria-labelledby="work-heading" className="py-16 md:py-28">
          <div className="mb-10 flex items-baseline justify-between gap-6 md:mb-14">
            <SectionLabel n="01">Selected work</SectionLabel>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All {caseStudies.length} projects →
            </Link>
          </div>
          <h2 id="work-heading" className="sr-only">
            Selected work
          </h2>

          <ol className="border-t border-border/60">
            {featured.map((study, i) => (
              <li key={study.slug} className="border-b border-border/60">
                <AnimatedProjectCard>
                  <Link
                    href={`/work/${study.slug}`}
                    className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14"
                  >
                    <Cover src={study.cover} priority={i === 0} />
                    <div className="flex flex-col md:col-span-5">
                      <p className={label}>
                        <span className="text-pink-400">{String(i + 1).padStart(2, '0')}</span>
                        <span className="ml-3.5">{`${study.client} · ${study.year}`}</span>
                      </p>
                      <h3 className="mt-5 text-balance text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
                        {study.title}
                      </h3>
                      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{study.summary}</p>
                      <p className="mt-5 text-sm text-muted-foreground/80">{study.tags.join(' · ')}</p>
                      <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-foreground md:mt-auto md:pt-8">
                        <Plus />
                        Read the case study
                      </span>
                    </div>
                  </Link>
                </AnimatedProjectCard>
              </li>
            ))}
          </ol>
        </section>

        {/* 3 · Before & after */}
        <section aria-labelledby="ba-heading" className="py-16 md:py-28">
          <SectionLabel n="02">Before &amp; after</SectionLabel>
          <div className="mt-6 mb-10 flex flex-col justify-between gap-8 md:mb-12 md:flex-row md:items-end">
            <h2
              id="ba-heading"
              className="max-w-2xl text-balance text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Every confusing screen is a missed ride.
            </h2>

            {/* Text tabs with a sliding underline */}
            <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
              <div className="flex shrink-0 gap-6 border-b border-border/60">
                {COMPARISONS.map((item) => {
                  const isActive = activeTab.id === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveTab(item)}
                      className={`relative min-h-11 whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
                        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.tabLabel}
                      {isActive && (
                        <motion.span
                          layoutId="baUnderline"
                          className="absolute inset-x-0 -bottom-px h-px bg-pink-400"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="overflow-hidden rounded-md ring-1 ring-white/5">
                <ImageSlider
                  beforeImage={activeTab.beforeImage}
                  beforeAlt={activeTab.beforeAlt}
                  afterImage={activeTab.afterImage}
                  afterAlt={activeTab.afterAlt}
                  aspectRatio={activeTab.aspectRatio}
                />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                <h3 className="text-balance text-xl font-medium leading-snug tracking-tight text-foreground md:col-span-5 md:text-2xl">
                  {activeTab.title}
                </h3>
                <div className="md:col-span-7">
                  <p className="max-w-[60ch] text-pretty leading-relaxed text-muted-foreground">
                    {activeTab.description}
                  </p>
                  <Link
                    href={activeTab.caseStudyUrl}
                    className="group mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <Plus />
                    Read the case study
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 4 · What I do */}
        <section aria-labelledby="do-heading" className="py-16 md:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel n="03">What I do</SectionLabel>
              <h2 id="do-heading" className="sr-only">
                What I do
              </h2>
            </div>
            <ul className="md:col-span-8">
              {services.map((service, i) => (
                <li
                  key={service}
                  className="flex items-baseline gap-6 border-t border-border/60 py-6 last:border-b md:py-8"
                >
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
