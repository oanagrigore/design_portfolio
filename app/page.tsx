"use client";

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { WorkCard } from '@/components/work-card'
import { caseStudies, profile, services } from '@/lib/content'
import { HeroAnimator } from "@/components/hero-animator"
import { ServicesAnimator } from "@/components/services-animator"
import { ServiceItem } from "@/components/service-item"
import { AnimatedProjectCard } from "@/components/animated-project-card"

export default function HomePage() {
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