"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroAnimator({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Accessibility Guard
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Avatar Pop In
      tl.from(".hero-avatar", {
        scale: 0.75,
        opacity: 0,
        duration: 1.1,
        ease: "back.out(1.6)",
      });

      // 2. Subtitle / Location Fade Up
      tl.from(
        ".hero-subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.7"
      );

      // 3. Main Title Words Slide Up
      tl.from(
        ".hero-title-word",
        {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.03,
        },
        "-=0.6"
      );

      // 4. Buttons Fade In
      tl.from(
        ".hero-cta-group",
        {
          y: 15,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert(); // Automatic GSAP cleanup
  }, []);

  return <div ref={containerRef}>{children}</div>;
}