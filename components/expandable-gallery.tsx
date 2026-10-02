"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState, useId, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;

      if (el.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
}

const shot = (filename: string) =>
  `https://oana-ecru.vercel.app/work/${filename}`;

const PHOTOS = [
  {
    id: "photo-1",
    src: shot("Bundle.png"),
    alt: "Bundle Project",
    rotation: -10,
    x: -95,
    y: 12,
    zIndex: 10,
  },
  {
    id: "photo-2",
    src: shot("book-a-trip.png"),
    alt: "Design research",
    rotation: -2,
    x: -12,
    y: -18,
    zIndex: 20,
  },
  {
    id: "photo-3",
    src: shot("gallery-2.png"),
    alt: "Code and development",
    rotation: 9,
    x: 85,
    y: 10,
    zIndex: 30,
  },
  {
    id: "photo-4",
    src: shot("gallery-3.png"),
    alt: "Dashboard interface",
  },
  {
    id: "photo-5",
    src: shot("gallery-4.png"),
    alt: "Product design",
  },
  {
    id: "photo-6",
    src: shot("gallery-5.png"),
    alt: "Laptop on desk",
  },
  {
    id: "photo-7",
    src: shot("gallery-6.png"),
    alt: "Team collaboration",
  },
  {
    id: "photo-8",
    src: shot("gallery-7.png"),
    alt: "UX wireframes",
  },
  {
    id: "photo-9",
    src: shot("gallery-8.png"),
    alt: "Developer workspace",
  },
  {
    id: "photo-10",
    src: shot("gallery-9.png"),
    alt: "Developer workspace",
  },
];

const transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
} as const;

export default function ExpandableGallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  });

  return (
    <section className="relative w-full px-4 md:px-8 bg-background flex flex-col items-center justify-start min-h-[850px] overflow-hidden">
      <LayoutGroup id={layoutGroupId}>
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full h-12 flex items-center justify-between px-4 mb-2">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group z-50 cursor-pointer"
                >
                  <div className="p-2 rounded-full bg-muted group-hover:bg-accent transition-colors text-foreground">
                    <svg
                      className="w-4 h-4 stroke-current stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Go back</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            ref={containerRef}
            layout
            className={cn(
              "relative w-full",
              isExpanded
                ? "grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
                : "flex flex-col items-center justify-start pt-4"
            )}
            transition={transition}
          >
            <div
              className={cn(
                "relative",
                isExpanded
                  ? "contents"
                  : "h-[420px] md:h-[500px] w-full flex items-center justify-center mb-10"
              )}
            >
              {PHOTOS.map((photo, index) => {
                const isPrimary = index < 3;
                if (!isPrimary && !isExpanded) return null;

                return (
                  <motion.div
                    key={`card-${photo.id}`}
                    layoutId={`card-container-${photo.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: !isExpanded ? photo.rotation || 0 : 0,
                      x: !isExpanded ? photo.x || 0 : 0,
                      y: !isExpanded ? photo.y || 0 : 0,
                      zIndex: !isExpanded ? photo.zIndex || index : 10,
                    }}
                    transition={transition}
                    whileHover={
                      !isExpanded
                        ? {
                            scale: 1.04,
                            y: (photo.y || 0) - 15,
                            rotate: (photo.rotation || 0) * 0.8,
                            zIndex: 50,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }
                        : { scale: 1.02 }
                    }
                    className={cn(
                      "cursor-pointer overflow-hidden bg-muted",
                      isExpanded
                        ? "relative aspect-video rounded-2xl md:rounded-[2.5rem] border-4 md:border-[6px] border-background shadow-lg"
                        : "absolute w-[340px] sm:w-[480px] md:w-[620px] aspect-video rounded-3xl md:rounded-[2.5rem] border-4 md:border-[6px] border-background shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
                    )}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                  >
                    <motion.div
                      layoutId={`image-inner-${photo.id}`}
                      layout="position"
                      className="w-full h-full relative"
                      transition={transition}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="absolute inset-0 size-full object-cover select-none pointer-events-none"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="stack-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-2xl space-y-8"
                >
                  <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-foreground/90 leading-tight text-balance">
                    Turning complex ideas into intuitive products people genuinely love using every day.
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 text-[15px] font-medium text-background transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25"
                  >
                    See all {PHOTOS.length}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}