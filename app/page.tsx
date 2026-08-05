"use client";

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { WorkCard } from '@/components/work-card'
import { caseStudies, profile, services } from '@/lib/content'
import { HeroAnimator } from "@/components/hero-animator"
import { ServicesAnimator } from "@/components/services-animator"
import { ServiceItem } from "@/components/service-item"
import { AnimatedProjectCard } from "@/components/animated-project-card"
import ImageSlider from "@/components/ImageSlider"
import { ToolsSection } from '@/components/tools-section';

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
    beforeImage: "/work/omni-before.png",
    beforeAlt: "Legacy Omni Limousine website interface",
    afterImage: "/work/omni-after.png",
    afterAlt: "Redesigned accessible Omni Limousine direct booking web experience",
    aspectRatio: "16/10",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(COMPARISONS[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track page scroll progress for background canvas effects
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Grid background translate on scroll
  const gridY = useTransform(scrollY, [0, 3000], [0, 400]);

  // Dynamic vertical rule positions shifting inward/outward as user scrolls
  const ruleXLeft = useTransform(smoothProgress, [0, 1], ['4%', '12%']);
  const ruleXRight = useTransform(smoothProgress, [0, 1], ['96%', '88%']);
  const ruleYTop = useTransform(smoothProgress, [0, 1], [180, 600]);

  const quote = "Good design should feel like someone thought about you. That's the thing I chase.";

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* 1. SCROLL-DRIVEN ARCHITECTURAL GRID BACKGROUND */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{ y: gridY }}
      >
        <svg className="w-full h-[140vh]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="paper-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.75" />
              <circle cx="48" cy="48" r="1.2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paper-grid)" />
        </svg>
      </motion.div>

      {/* 2. DYNAMIC SCROLL RULES & ALIGNMENT GUIDES */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Left Vertical Alignment Line */}
        <motion.div 
          className="absolute top-0 bottom-0 border-l border-dashed border-primary/20 dark:border-primary/30"
          style={{ left: ruleXLeft }}
        >
          <span className="absolute top-6 left-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 select-none">
            X1 · CANVAS
          </span>
        </motion.div>

        {/* Right Vertical Alignment Line */}
        <motion.div 
          className="absolute top-0 bottom-0 border-r border-dashed border-primary/20 dark:border-primary/30"
          style={{ left: ruleXRight }}
        >
          <span className="absolute top-6 right-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 select-none">
            X2 · MARGIN
          </span>
        </motion.div>

        {/* Dynamic Horizontal Tracker Rule */}
        <motion.div 
          className="absolute left-0 right-0 border-t border-primary/20 dark:border-primary/30 flex justify-between items-center px-4"
          style={{ top: ruleYTop }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 bg-background/80 backdrop-blur-xs px-1.5 py-0.5 rounded -mt-2.5">
            PORTFOLIO
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 bg-background/80 backdrop-blur-xs px-1.5 py-0.5 rounded -mt-2.5">
            OANA GRIGORE
          </span>
        </motion.div>
      </div>

      {/* Main Page Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6">
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
        <section className="py-16 md:py-24">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                Design Transformation
              </span>
              <h2 className="mt-1 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Before & After Impact
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
                      onClick={() => setActiveTab(item)}
                      className="relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
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
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
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
                className="space-y-6"
              >
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  {activeTab.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activeTab.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-6">
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
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Tools Section */}
        <ToolsSection />

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