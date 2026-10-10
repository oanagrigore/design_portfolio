"use client";

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { WorkCard } from '@/components/work-card'
import { caseStudies, profile, services } from '@/lib/content'
import { HeroAnimator } from "@/components/hero-animator"
import { ServicesAnimator } from "@/components/services-animator"
import { ServiceItem } from "@/components/service-item"
import { AnimatedProjectCard } from "@/components/animated-project-card"
import ImageSlider from "@/components/ImageSlider"
import { ToolsSection } from '@/components/tools-section';
import { PrimaryButton } from '@/components/PrimaryButton';
import ExpandableGallery from '@/components/expandable-gallery';
import { ReadingRoomHero } from '@/components/reading-room';

type Metric = { label: string; value: string };

type Comparison = {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  /** Only measured results. Leave empty until you have a number you can defend. */
  metrics: Metric[];
  caseStudyUrl: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  aspectRatio: string;
};

// Data structure for the comparison tabs
const COMPARISONS: Comparison[] = [
  {
    id: "portal",
    tabLabel: "Member Portal",
    title: "Designing ride booking portal every Medicaid member can use",
    subtitle: "Scaling accessibility across an enterprise healthtech ecosystem.",
    description: "Redesigned the complex legacy member portal to adhere to WCAG 2.1 AA standards, simplifying patient onboarding and drive scheduling.",
    metrics: [
      { label: "Touch Target Compliance", value: "+100%" },
      { label: "Task Completion Time", value: "-34%" },
    ],
    caseStudyUrl: "/work/medidrive-member-portal",
    beforeImage: "/work/md-portal-before.png",
    beforeAlt: "Legacy MediDrive Member Portal interface",
    afterImage: "/work/md-portal-after.png",
    afterAlt: "Redesigned accessible MediDrive Member Portal interface",
    aspectRatio: "16/10",
  },
  {
    id: "app",
    tabLabel: "Mobile App Flow",
    title: "MediDrive Native Mobile App",
    subtitle: "Accessible touch targets and instant appointment booking on mobile.",
    description: "Standardized tokenized mobile UI components to ensure seamless booking flows for patients with visual and motor impairments.",
    // Removed until measured: "Mobile Booking Lift +42%", "WCAG Contrast Rating AAA Pass"
    metrics: [],
    caseStudyUrl: "/work/design-system-redesign",
    beforeImage: "/work/md-app-before.png",
    beforeAlt: "Legacy MediDrive Mobile App flow",
    afterImage: "/work/md-app-after.png",
    afterAlt: "Redesigned accessible MediDrive Mobile App flow",
    aspectRatio: "16/10",
  },
  {
    id: "omni",
    tabLabel: "Omni Limousine",
    title: "Omni Limousine Direct Booking Flow",
    subtitle: "Driving direct bookings through a premium web experience.",
    description: "Transformed a static brand website into a high-converting, accessible direct-booking funnel for luxury chauffeur services in Las Vegas and Miami.",
    // Removed until measured: "Direct Booking Conversion +38%", "Form Abandonment Rate -22%"
    metrics: [],
    caseStudyUrl: "/work/omni-limousine",
    beforeImage: "/work/omni-before.png",
    beforeAlt: "Legacy Omni Limousine website interface",
    afterImage: "/work/omni-after.png",
    afterAlt: "Redesigned accessible Omni Limousine direct booking web experience",
    aspectRatio: "16/10",
  },
];

const heroLines = [
  { text: "Make yourself at home.", className: "block text-foreground" },
  {
    text: "I’ll show you how I design for people who can’t afford to get lost.",
    className: "block text-muted-foreground",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(COMPARISONS[0]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ReadingRoomHero />

      {/* Main Page Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6">
        {/* Hero Section */}
        <HeroAnimator>
          <section className="pt-24 pb-20 md:pt-36 md:pb-28 flex flex-col items-center text-center">
            <p className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              Oana Grigore · Senior Product Designer
            </p>

            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              {heroLines.map((line, lineIndex) => (
                <span key={lineIndex} className={line.className}>
                  {line.text.split(" ").map((word, wordIndex, words) => (
                    <Fragment key={`${lineIndex}-${wordIndex}`}>
                      <span className="hero-title-word inline-block whitespace-nowrap">{word}</span>
                      {/* a real space, so crawlers, AI assistants and screen readers read words, not "Makeyourselfathome" */}
                      {wordIndex < words.length - 1 ? " " : null}
                    </Fragment>
                  ))}
                  {lineIndex < heroLines.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {profile.intro}
            </p>

            <div className="hero-cta-group mt-10 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton href="/work">View selected work</PrimaryButton>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                About me
              </Link>
            </div>
          </section>
        </HeroAnimator>

        <ExpandableGallery />

        {/* Multi Before vs After Comparison Section */}
        <section className="py-16 md:py-24">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                Before & After Impact
              </span>
              <h2 className="mt-1 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Every confusing screen is a missed ride.
              </h2>
            </div>

            {/* Tab Controls - Horizontally scrollable on mobile */}
            <div className="-mx-6 flex items-center overflow-x-auto px-6 py-1 no-scrollbar md:mx-0 md:px-0">
              <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-secondary/50 p-1">
                {COMPARISONS.map((item) => {
                  const isActive = activeTab.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveTab(item)}
                      className="relative min-h-11 rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 rounded-full bg-background shadow-sm"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                        {item.tabLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Tab Content */}
          <div>
            {/* Slider Container with Cross-Fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ImageSlider
                  beforeImage={activeTab.beforeImage}
                  beforeAlt={activeTab.beforeAlt}
                  afterImage={activeTab.afterImage}
                  afterAlt={activeTab.afterAlt}
                  aspectRatio={activeTab.aspectRatio}
                />
              </motion.div>
            </AnimatePresence>

            {/* Active Tab Details with Cross-Fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8"
              >
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-foreground">
                    {activeTab.title}
                  </h3>

                  <div className="mt-3">
                    <Link
                      href={activeTab.caseStudyUrl}
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                    >
                      Read deep-dive case study
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {activeTab.description}
                  </p>

                  {activeTab.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      {activeTab.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-2xl font-semibold tracking-tight text-foreground">{m.value}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Selected Work Section */}
        <section className="py-16 md:py-24">
          <div className="flex items-end justify-between">
            <h2 className="text-sm font-medium tracking-tight text-muted-foreground">
              Selected work
            </h2>
            <Link
              href="/work"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
            {caseStudies.slice(0, 4).map((study) => (
              <AnimatedProjectCard key={study.slug}>
                <WorkCard study={study} />
              </AnimatedProjectCard>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <ToolsSection />

        {/* Services Section ("What I do") */}
        <section className="py-16 md:py-24">
          <ServicesAnimator>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
              <h2 className="services-header text-sm font-medium tracking-tight text-muted-foreground">
                What I do
              </h2>
              <ul className="services-list flex flex-col">
                {services.map((service) => (
                  <ServiceItem key={service} service={service} />
                ))}
              </ul>
            </div>
          </ServicesAnimator>
        </section>
      </div>
    </div>
  )
}
