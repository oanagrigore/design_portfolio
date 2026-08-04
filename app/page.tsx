"use client";

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { WorkCard } from '@/components/work-card'
import { caseStudies, profile, services } from '@/lib/content'
import { HeroAnimator } from "@/components/hero-animator"
import { ServicesAnimator } from "@/components/services-animator"
import { ServiceItem } from "@/components/service-item"
import { AnimatedProjectCard } from "@/components/animated-project-card"
import ImageSlider from "@/components/ImageSlider"

// Data structure for the comparison tabs
const COMPARISONS = [
  {
    id: "portal",
    tabLabel: "Member Portal",
    title: "MediDrive Member Portal Redesign",
    subtitle: "Scaling accessibility across an enterprise healthtech ecosystem.",
    description: "Redesigned the complex legacy member portal to adhere to WCAG 2.1 AA standards, simplifying patient onboarding and drive scheduling.",
    metrics: [
      { label: "Touch Target Compliance", value: "+100%" },
      { label: "Task Completion Time", value: "-34%" },
    ],
    caseStudyUrl: "/work/design-system-redesign",
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
    metrics: [
      { label: "Mobile Booking Lift", value: "+42%" },
      { label: "WCAG Contrast Rating", value: "AAA Pass" },
    ],
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
    metrics: [
      { label: "Direct Booking Conversion", value: "+38%" },
      { label: "Form Abandonment Rate", value: "-22%" },
    ],
    caseStudyUrl: "/work/omni-limousine",
    beforeImage: "/work/omni-before.png", // Replace with your Omni before image path in /public/work/
    beforeAlt: "Legacy Omni Limousine website interface",
    afterImage: "/work/omni-after.png",   // Replace with your Omni after image path in /public/work/
    afterAlt: "Redesigned accessible Omni Limousine direct booking web experience",
    aspectRatio: "16/10",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(COMPARISONS[0]);
  const quote = "Good design should feel like someone thought about you. That's the thing I chase.";

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero Section */}
      <HeroAnimator>
        <section className="pt-24 pb-20 md:pt-36 md:pb-28">
          <Image
            src={profile.avatar || '/placeholder.svg'}
            alt={`${profile.name} portrait`}
            width={96}
            height={96}
            priority
            className="hero-avatar mb-8 size-20 rounded-full border border-border/60 bg-card object-cover md:size-24"
          />
          <p className="hero-subtitle text-sm text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
          
          <h1 className="mt-6 max-w-4xl overflow-hidden text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {quote.split(" ").map((word, i) => (
              <span key={i} className="hero-title-word inline-block mr-[0.22em] whitespace-nowrap">
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {profile.intro}
          </p>
          
          <div className="hero-cta-group mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View selected work
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              About me
            </Link>
          </div>
        </section>
      </HeroAnimator>

      {/* Multi Before vs After Comparison Section */}
      <section className="border-t border-border/60 py-16 md:py-24">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
              Design Transformation
            </span>
            <h2 className="mt-1 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Before & After Impact
            </h2>
          </div>

          {/* Tab Controls */}
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-border/60 bg-secondary/50 p-1">
            {COMPARISONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  activeTab.id === item.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Content */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Slider for Active Tab */}
          <div>
            <ImageSlider
              key={activeTab.id} // Re-mounts component on tab change to reset slider position
              beforeImage={activeTab.beforeImage}
              beforeAlt={activeTab.beforeAlt}
              afterImage={activeTab.afterImage}
              afterAlt={activeTab.afterAlt}
              aspectRatio={activeTab.aspectRatio}
            />
          </div>

          {/* Active Tab Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {activeTab.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {activeTab.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
              {activeTab.metrics.map((m, idx) => (
                <div key={idx}>
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            <div>
              <Link
                href={activeTab.caseStudyUrl}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                Read deep-dive case study
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="border-t border-border/60 py-16 md:py-24">
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

      {/* Services Section ("What I do") */}
      <section className="border-t border-border/60 py-16 md:py-24">
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
  )
}