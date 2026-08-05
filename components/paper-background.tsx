"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function PaperBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track global scroll
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth scroll spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  // Background SVG grid shift on scroll
  const gridY = useTransform(scrollY, [0, 3000], [0, 400]);

  // Dynamic vertical rule positions (shifts inward as user scrolls down)
  const ruleXLeft = useTransform(smoothProgress, [0, 1], ["3%", "10%"]);
  const ruleXRight = useTransform(smoothProgress, [0, 1], ["97%", "90%"]);
  const ruleYTop = useTransform(smoothProgress, [0, 1], [160, 650]);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1. SCROLL-DRIVEN ARCHITECTURAL GRID */}
      <motion.div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{ y: gridY }}
      >
        <svg className="h-[140vh] w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="paper-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.75" />
              <circle cx="48" cy="48" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paper-grid)" />
        </svg>
      </motion.div>

      {/* 2. DYNAMIC RULES & ALIGNMENT GUIDES */}
      <div className="absolute inset-0 z-10">
        {/* Left Vertical Line */}
        <motion.div
          className="absolute top-0 bottom-0 border-l border-dashed border-border/60"
          style={{ left: ruleXLeft }}
        >
          <span className="absolute top-6 left-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 select-none">
            X1 · CANVAS
          </span>
        </motion.div>

        {/* Right Vertical Line */}
        <motion.div
          className="absolute top-0 bottom-0 border-r border-dashed border-border/60"
          style={{ left: ruleXRight }}
        >
          <span className="absolute top-6 right-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 select-none">
            X2 · MARGIN
          </span>
        </motion.div>

        {/* Dynamic Horizontal Tracker Rule */}
        <motion.div
          className="absolute left-0 right-0 flex items-center justify-between border-t border-border/60 px-4"
          style={{ top: ruleYTop }}
        >
          <span className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground/70 backdrop-blur-xs -mt-2.5">
            GRID_Y
          </span>
          <span className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground/70 backdrop-blur-xs -mt-2.5">
            PAPER.DESIGN ENGINE
          </span>
        </motion.div>
      </div>
    </div>
  );
}