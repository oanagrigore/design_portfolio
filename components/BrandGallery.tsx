"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type BrandGalleryItem = {
  id: string;
  /** Image or video path in /public. `.mp4` / `.webm` render as <video>. */
  src: string;
  alt: string;
  /** First frame for videos — shown before playback and when motion is reduced. */
  poster?: string;
};

export const brandGalleryItems: BrandGalleryItem[] = [
  { id: "1", src: "/work/Bundle.png", alt: "." },
  { id: "2", src: "/work/book-a-trip.png", alt: "." },
  { id: "3", src: "/work/gallery-2.png", alt: "." },
  { id: "4", src: "/work/gallery-5.mp4", alt: "." },
  { id: "5", src: "/work/gallery-12.mp4", alt: "." },
  { id: "6", src: "/work/gallery-4.png", alt: "." },
  { id: "7", src: "/work/gallery-13.mp4", alt: "." },
  { id: "8", src: "/work/gallery-7.png", alt: "." },
  { id: "9", src: "/work/gallery-11.png", alt: "." },
  { id: "10", src: "/work/gallery-10.png", alt: "." },
  { id: "11", src: "/work/gallery-3.mp4", alt: "." },
];

/* ── Tuning knobs ─────────────────────────────────────────────────────────── */
/** Where a card parks, as a % of viewport height. */
const PARK_TOP_VH = 10;
/** Each card parks this many px lower than the one before, so the deck peeks. */
const PARK_STEP_PX = 8;
/** Flow gap between cards — how much scroll passes between two handoffs. */
const GAP_VH = 8;
/** Scale lost by a card as the next one covers it. */
const BASE_SHRINK = 0.05;
/** Extra scale lost per card that will still stack on top of it. */
const DEPTH_SHRINK = 0.008;
/** Dark overlay opacity once covered, and the extra per stacked card. */
const BASE_SHADE = 0.28;
const DEPTH_SHADE = 0.045;
const MAX_SHADE = 0.6;
/* ─────────────────────────────────────────────────────────────────────────── */

const isVideoSrc = (src: string) => /\.(mp4|webm)$/i.test(src);

export default function BrandGallery({
  items = brandGalleryItems,
}: {
  items?: BrandGalleryItem[];
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Track the motion preference so videos can opt out of autoplay too.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!reduceMotion || !containerRef.current) return;
    // The markup renders with autoPlay before we know the preference client-side.
    containerRef.current.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.controls = true;
    });
  }, [reduceMotion]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    // Mobile browsers resize the viewport when the URL bar hides — don't re-measure.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card]", root);
        // Zero-height siblings that sit at each card's natural flow position.
        // ScrollTrigger mis-measures `position: sticky` elements, so we trigger
        // off these instead of off the cards themselves.
        const anchors = gsap.utils.toArray<HTMLElement>("[data-deck-anchor]", root);
        if (cards.length < 2) return;

        const lastIndex = cards.length - 1;
        const parkPx = (index: number) =>
          window.innerHeight * (PARK_TOP_VH / 100) + index * PARK_STEP_PX;

        gsap.set(cards, { transformOrigin: "center top" });

        cards.forEach((card, index) => {
          // Nothing ever covers the last card.
          if (index === lastIndex) return;

          const depth = lastIndex - 1 - index; // cards still to stack on top
          const shade = card.querySelector<HTMLElement>("[data-deck-shade]");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: anchors[index + 1],
              // From the moment the next card starts overlapping this one…
              start: "top 80%",
              // …until it lands on its own parking line.
              end: () => `top ${parkPx(index + 1)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(
            card,
            { scale: 1 - (BASE_SHRINK + depth * DEPTH_SHRINK), ease: "none" },
            0,
          );

          if (shade) {
            timeline.to(
              shade,
              {
                opacity: Math.min(MAX_SHADE, BASE_SHADE + depth * DEPTH_SHADE),
                ease: "none",
              },
              0,
            );
          }
        });
      },
      root,
    );

    return () => mm.revert();
  }, [items]);

  return (
    <section
      ref={containerRef}
      aria-label="Selected work"
      className="relative mx-auto w-full max-w-5xl px-4 pt-20 pb-[30vh]"
      style={
        {
          "--deck-gap": `${GAP_VH}vh`,
          "--deck-top": `${PARK_TOP_VH}vh`,
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div data-deck-anchor aria-hidden="true" className="h-0 w-full" />

          <div
            data-deck-card
            style={{
              zIndex: index + 1,
              top: `calc(var(--deck-top) + ${index * PARK_STEP_PX}px)`,
            }}
            className="sticky mb-[var(--deck-gap)] aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/40 bg-card shadow-2xl last:mb-0"
          >
            {isVideoSrc(item.src) ? (
              <video
                src={item.src}
                poster={item.poster}
                aria-label={item.alt}
                autoPlay={!reduceMotion}
                controls={reduceMotion}
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority={index === 0}
                className="object-cover"
              />
            )}

            <div
              data-deck-shade
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black opacity-0"
            />
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
