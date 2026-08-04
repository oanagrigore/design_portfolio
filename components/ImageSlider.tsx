// components/ImageSlider.tsx
'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  aspectRatio?: string; // e.g., '16/9'
}

export default function ImageSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  aspectRatio = '16/9'
}: ImageSliderProps) {
  const [position, setPosition] = useState<number>(50); // Initialize slider at 50%
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle slider input changes
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(e.target.value));
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
      style={{ aspectRatio: aspectRatio }}
    >
      {/* 1. After (Right) Image - Set as background/base layer */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover object-left"
        priority={false}
      />
      {/* Label for After image */}
      <span className="absolute bottom-3 right-3 z-10 rounded bg-neutral-900/70 px-2 py-0.5 text-[11px] font-mono font-medium uppercase text-white backdrop-blur-sm">
        After
      </span>

      {/* 2. Before (Left) Image - Clipped based on slider position */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-left"
          priority={false}
        />
        {/* Label for Before image */}
        <span className="absolute bottom-3 left-3 z-10 rounded bg-red-600/90 px-2 py-0.5 text-[11px] font-mono font-medium uppercase text-white backdrop-blur-sm">
          Original
        </span>
      </div>

      {/* 3. The Interactive Handle/Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleSliderChange}
        className="before-after-slider absolute inset-0 z-30 h-full w-full cursor-col-resize opacity-0"
        aria-label="Before and After design comparison slider"
        aria-valuenow={position}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 4. The Visual Handle (line and circle) */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 z-20 w-0.5 bg-white shadow-xl transition-all"
        style={{ left: `calc(${position}% - 1px)` }}
      >
        {/* The Circle Handle */}
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl transition group-hover:scale-110">
          {/* SVGs for Arrows (left/right) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-5 w-5 text-neutral-900"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
      </div>
    </div>
  );
}