"use client";

import { useRef } from "react";
import gsap from "gsap";

export function AnimatedProjectCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotateY: x * 0.025,
      rotateX: -y * 0.025,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });

    const img = card.querySelector("img");
    if (img) {
      gsap.to(img, { scale: 1.03, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    const img = card.querySelector("img");
    if (img) {
      gsap.to(img, { scale: 1, duration: 0.7, ease: "power3.out" });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="will-change-transform transition-shadow duration-300 rounded-2xl overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}