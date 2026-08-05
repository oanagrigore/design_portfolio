'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function AboutAnimator({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // 1. Hero Reveal Timeline
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.9 },
      })

      heroTl
        .from('[data-animate="hero-label"]', { y: 20, opacity: 0 })
        .from('[data-animate="hero-title"]', { y: 30, opacity: 0 }, '-=0.6')
        .from('[data-animate="hero-bio"] p', { y: 20, opacity: 0, stagger: 0.12 }, '-=0.5')
        .from('[data-animate="hero-image"]', { scale: 0.96, opacity: 0, duration: 1 }, '-=0.7')

      // Image Parallax
      gsap.to('[data-animate="hero-image"] img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-animate="hero-image"]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // 2. Selected Impact Section Reveal
      gsap.from('[data-animate="impact-card"]', {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-animate="impact-section"]',
          start: 'top 80%',
        },
      })

      // 3. Experience Timeline Reveal
      const experienceItems = gsap.utils.toArray<HTMLElement>('[data-animate="experience-item"]')
      experienceItems.forEach((item) => {
        gsap.from(item, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        })
      })

      // 4. Certifications Grid Reveal
      gsap.from('[data-animate="cert-item"]', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-animate="certs-section"]',
          start: 'top 85%',
        },
      })

      // 5. Capabilities Badges Reveal
      gsap.from('[data-animate="capability-badge"]', {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '[data-animate="capabilities-section"]',
          start: 'top 85%',
        },
      })
    },
    { scope: containerRef }
  )

  return <div ref={containerRef}>{children}</div>
}