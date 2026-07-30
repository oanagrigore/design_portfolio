"use client";

import { useRef } from "react";
import gsap from "gsap";

export function ServiceItem({ service }: { service: string }) {
  const itemRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    gsap.to(itemRef.current, {
      x: 12,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(itemRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <li
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="service-item border-b border-border/60 py-5 text-2xl font-medium tracking-tight text-foreground/80 transition-colors hover:text-foreground cursor-pointer first:pt-0 md:text-3xl"
    >
      {service}
    </li>
  );
}