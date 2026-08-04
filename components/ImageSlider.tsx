"use client";

import { useState, useRef, useCallback, KeyboardEvent } from "react";
import Image from "next/image";

interface ImageSliderProps {
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  aspectRatio?: string;
}

export default function ImageSlider({
  beforeImage,
  beforeAlt,
  afterImage,
  afterAlt,
  aspectRatio = "16/10",
}: ImageSliderProps) {
  // Slider position from 0 to 100
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to calculate clamp values between 0 and 100
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  // Mouse & Touch Drag Handlers
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Keyboard Navigation Handler (WCAG 2.1 - Arrow Left/Right, Home, End)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = 5; // 5% shift per keypress
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className="space-y-2">
      {/* Screen Reader Only Instruction Summary */}
      <div className="sr-only">
        Before and after visual comparison slider. Use left and right arrow keys to adjust the visible comparison threshold.
      </div>

      {/* Main Interactive Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative select-none overflow-hidden rounded-xl border border-border/60 bg-muted touch-pan-y"
        style={{ aspectRatio }}
      >
        {/* AFTER Image (Background Base Layer) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {/* Badge Label */}
          <span className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 text-[10px] font-medium tracking-wide text-foreground backdrop-blur-sm">
            AFTER
          </span>
        </div>

        {/* BEFORE Image (Clipped Foreground Layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Note: Fixed width matching parent container avoids image squeezing */}
          <div className="relative h-full w-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Badge Label */}
            <span className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 text-[10px] font-medium tracking-wide text-foreground backdrop-blur-sm">
              BEFORE
            </span>
          </div>
        </div>

        {/* Vertical Separator Line */}
        <div
          className="absolute bottom-0 top-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* WCAG Accessible Slider Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after image comparison slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${Math.round(sliderPosition)} percent before image visible`}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none rounded-full border border-border/80 bg-background/90 p-2.5 shadow-lg backdrop-blur-md transition-shadow hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Custom Handle Icon (Double Arrows) */}
          <svg
            className="size-4 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}