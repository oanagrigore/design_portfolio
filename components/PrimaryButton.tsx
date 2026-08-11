'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

interface PrimaryButtonProps {
  href?: string
  children: React.ReactNode
}

export function PrimaryButton({ href = '/work', children }: PrimaryButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const gradientOverlayRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)

  const { contextSafe } = useGSAP({ scope: buttonRef })

  const handleMouseEnter = contextSafe(() => {
    // Smooth transition between gradient layers
    gsap.to(gradientOverlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })

    // Slight arrow nudge
    gsap.to(arrowRef.current, {
      x: 4,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(gradientOverlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    })

    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  return (
    <Link
      href={href}
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Base Pink Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600" />

      {/* Hover Shifted Gradient Layer */}
      <div
        ref={gradientOverlayRef}
        className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-pink-500 opacity-0"
      />

      {/* Button Text & Icon */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight ref={arrowRef} className="size-4 shrink-0" />
      </span>
    </Link>
  )
}