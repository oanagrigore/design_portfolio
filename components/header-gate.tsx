"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Hides the site header on the homepage and shows it everywhere else.
 *
 * SHOW_AFTER_HERO = false → the header never appears on the homepage.
 * SHOW_AFTER_HERO = true  → the header is hidden over the reading room and
 *                            appears once the visitor scrolls past it.
 */
const SHOW_AFTER_HERO = false;

export function HeaderGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome || !SHOW_AFTER_HERO) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (!isHome) return <>{children}</>;
  if (!SHOW_AFTER_HERO || !pastHero) return null;
  return <>{children}</>;
}
