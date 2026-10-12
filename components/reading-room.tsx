"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/reading-room-hero.css";

/** class names defined in app/reading-room-hero.css */
const styles = {
  awake: "rr-awake",
  base: "rr-base",
  books: "rr-books",
  bubble: "rr-bubble",
  eye: "rr-eye",
  eyes: "rr-eyes",
  full: "rr-full",
  fx: "rr-fx",
  heart: "rr-heart",
  hearts: "rr-hearts",
  hint: "rr-hint",
  hintMobile: "rr-hint-mobile",
  hot: "rr-hot",
  hotin: "rr-hotin",
  kitty: "rr-kitty",
  lab: "rr-lab",
  lit: "rr-lit",
  lt: "rr-lt",
  pan: "rr-pan",
  pause: "rr-pause",
  plus: "rr-plus",
  reader: "rr-reader",
  root: "rr-root",
  scene: "rr-scene",
  sr: "rr-sr",
  still: "rr-still",
  talk: "rr-talk",
  tip: "rr-tip",
  zz: "rr-zz",
} as const;

/**
 * Reading room hero.
 * Two paintings: the room fully lit (/hero/room-lit.webp) and with every light out
 * (/hero/room-dark.webp). Each light reveals the lit painting in its own pool of light.
 * Coordinates below are in the painting's own pixels (2752 × 1536).
 */

const IW = 2752;
const IH = 1536;
const px = (v: number) => `${(v / IW) * 100}%`;
const py = (v: number) => `${(v / IH) * 100}%`;
const cq = (v: number) => `${(v / IW) * 100}cqi`;

type Light = {
  id: string;
  name: string;
  x: number;
  y: number;
  /** radius of the pool of light, in painting pixels */
  r?: number;
  /** elliptical pool, used by the fireplace */
  pool?: { x: number; y: number; rx: number; ry: number };
  /** hit area, in painting pixels */
  hw?: number;
  hh?: number;
};

const LIGHTS: Light[] = [
  { id: "fire", name: "Fireplace", x: 470, y: 1075, hw: 200, hh: 290, pool: { x: 480, y: 1170, rx: 680, ry: 540 } },
  { id: "c1", name: "Mantel candle", x: 407, y: 610, r: 300 },
  { id: "c2", name: "Mantel candle", x: 621, y: 665, r: 280 },
  { id: "lh", name: "Hanging lantern", x: 916, y: 300, r: 380 },
  { id: "lt", name: "Hanging lantern", x: 1767, y: 330, r: 380 },
  { id: "ll", name: "Hanging lantern", x: 987, y: 690, r: 360 },
  { id: "lr", name: "Hanging lantern", x: 1478, y: 722, r: 360 },
  { id: "tl", name: "Table lantern", x: 1205, y: 1118, r: 460 },
  { id: "cr", name: "Window candle", x: 2667, y: 915, r: 380 },
  { id: "cw", name: "Window candles", x: 2345, y: 990, r: 330 },
];

/** Plus markers. Positions are % of the scene. */
/** The reader (box in painting pixels). The two paintings have her in different poses,
 *  so she's drawn as her own layer, always reading: one copy lit by the lantern beside
 *  her, one with it out. Only the light changes. */
const READER = { x: 795, y: 750, w: 441, h: 609 };

const HOTSPOTS = [
  { href: "/about", label: "About me", left: 36.3, top: 70.3 },
  { href: "/testimonials", label: "Testimonials", left: 26.7, top: 89.5 },
  { href: "/contact", label: "Contact", left: 45.5, top: 56.8 },
];

const PURRS = ["prrr…", "prrrrrr", "okay, one more", "♥"];

function poolMask(l: Light): string {
  if (l.pool) {
    const p = l.pool;
    return `radial-gradient(ellipse ${cq(p.rx)} ${cq(p.ry)} at ${px(p.x)} ${py(p.y)}, #000 0 35%, rgba(0,0,0,.55) 62%, transparent 100%)`;
  }
  return `radial-gradient(circle ${cq(l.r ?? 300)} at ${px(l.x)} ${py(l.y)}, #000 0 22%, rgba(0,0,0,.5) 55%, transparent 100%)`;
}

function PlusIcon() {
  return (
    <span className={styles.plus} aria-hidden="true">
      <svg viewBox="0 0 10 10">
        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function ReadingRoomHero() {
  const [lights, setLights] = useState<Record<string, boolean>>(
    () => Object.fromEntries(LIGHTS.map((l) => [l.id, true]))
  );
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [purr, setPurr] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; dx: number; i: number }[]>([]);
  const [status, setStatus] = useState("");

  const rootRef = useRef<HTMLElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightsRef = useRef(lights);
  const petsRef = useRef(0);
  const purrTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  lightsRef.current = lights;
  const still = paused || reducedMotion;
  const onCount = Object.values(lights).filter(Boolean).length;
  const allOff = onCount === 0;

  // reduced motion + remembered pause choice
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    try {
      if (localStorage.getItem("rr-motion") === "off") setPaused(true);
    } catch {}
    return () => mq.removeEventListener("change", sync);
  }, []);

  // on phones, open the pan with the cat in view
  useEffect(() => {
    const pan = panRef.current;
    const scene = sceneRef.current;
    if (pan && scene && pan.scrollWidth > pan.clientWidth) {
      pan.scrollLeft = scene.offsetWidth * 0.7 - pan.clientWidth / 2;
    }
  }, []);

  // sparks from the fire, dust in the lamplight, stars in the window
  useEffect(() => {
    const cv = canvasRef.current;
    const scene = sceneRef.current;
    const root = rootRef.current;
    if (!cv || !scene || !root) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, visible = true;
    type P = { k: "e" | "d"; x: number; y: number; vx: number; vy: number; life: number };
    let parts: P[] = [];
    let stars: { x: number; y: number; p: number; s: number }[] = [];

    const size = () => {
      const r = scene.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * d; cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      stars = Array.from({ length: 26 }, () => ({
        x: (2090 + Math.random() * 420) / IW,
        y: (140 + Math.random() * 820) / IH,
        p: Math.random() * 6,
        s: 0.6 + Math.random() * 1.2,
      }));
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(scene);

    if (still) { ctx.clearRect(0, 0, w, h); return () => ro.disconnect(); }

    // stop drawing while the hero is scrolled out of view
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });
    io.observe(root);

    const t0 = performance.now();
    function frame(now: number) {
      if (!visible || !ctx) return;
      const t = (now - t0) / 1000;
      const L = lightsRef.current;
      const lit = Object.values(L).filter(Boolean).length / LIGHTS.length;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const a = 0.25 + 0.75 * Math.max(0, Math.sin(t * s.s + s.p));
        ctx.fillStyle = `rgba(230,235,255,${a * 0.9})`;
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, 1 + a, 0, 7); ctx.fill();
      }

      if (L.fire && parts.filter((p) => p.k === "e").length < 55 && Math.random() < 0.7)
        parts.push({ k: "e", x: (410 + Math.random() * 120) / IW, y: (1110 + Math.random() * 40) / IH, vx: (Math.random() - 0.5) * 0.00012, vy: -(0.0006 + Math.random() * 0.0009), life: 1 });
      if (parts.length < 90 && Math.random() < 0.08)
        parts.push({ k: "d", x: Math.random(), y: 0.3 + Math.random() * 0.6, vx: (Math.random() - 0.5) * 0.00008, vy: -0.00006 - Math.random() * 0.0001, life: 1 });

      parts = parts.filter((p) => p.life > 0 && p.y > 0);
      for (const p of parts) {
        p.x += p.vx + Math.sin(t * 2 + p.y * 40) * 0.00008;
        p.y += p.vy;
        p.life -= p.k === "e" ? (L.fire ? 0.006 : 0.03) : 0.002;
        const a = Math.max(0, Math.min(1, p.life * 1.4));
        ctx.beginPath();
        if (p.k === "e") {
          ctx.fillStyle = `rgba(255,${(150 + Math.random() * 60) | 0},70,${a})`;
          ctx.shadowColor = "#ff9a40"; ctx.shadowBlur = 8;
          ctx.arc(p.x * w, p.y * h, 1.6, 0, 7);
        } else {
          ctx.fillStyle = `rgba(255,220,160,${a * 0.5 * lit})`;
          ctx.shadowBlur = 0;
          ctx.arc(p.x * w, p.y * h, 1.1, 0, 7);
        }
        ctx.fill(); ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [still]);

  const toggleLight = useCallback((l: Light) => {
    const next = { ...lightsRef.current, [l.id]: !lightsRef.current[l.id] };
    const off = Object.values(next).every((v) => !v);
    setLights(next);
    setStatus(`${l.name} ${next[l.id] ? "on" : "off"}.${off ? " The cat opened its eyes." : ""}`);
  }, []);

  const petCat = () => {
    const n = petsRef.current++;
    setPurr(PURRS[n % PURRS.length]);
    setStatus("The cat purrs.");
    clearTimeout(purrTimer.current);
    purrTimer.current = setTimeout(() => setPurr(null), 1800);
    if (!still) {
      const base = Date.now();
      const batch = Array.from({ length: 4 }, (_, i) => ({ id: base + i, dx: Math.random() * 40 - 20, i }));
      setHearts((h) => [...h, ...batch]);
      setTimeout(() => setHearts((h) => h.filter((x) => !batch.some((b) => b.id === x.id))), 1800);
    }
  };

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem("rr-motion", next ? "off" : "on"); } catch {}
  };

  const bubbleText = purr ?? (allOff ? "who turned off the lights?" : "pet me");

  return (
    <section ref={rootRef} className={`${styles.root} ${still ? styles.still : ""}`} aria-label="The reading room">
      <div ref={panRef} className={styles.pan}>
        <div ref={sceneRef} className={styles.scene}>
          <Image
            src="/hero/room-dark.webp"
            alt="Illustration of a cozy two-storey library at night: a fire in a stone fireplace, candles on the mantel, hanging lanterns, a woman reading in a patchwork armchair by a table lantern, a tall arched window full of stars, and a black cat asleep on a stack of books."
            fill
            priority
            sizes="(max-aspect-ratio: 1/1) 180svh, 100vw"
            className={styles.base}
          />

          {/* lit painting: whole room when every light is on, otherwise one pool per light */}
          <div className={`${styles.lit} ${styles.full}`} style={{ opacity: onCount === LIGHTS.length ? 1 : 0 }} />
          {LIGHTS.map((l) => {
            const mask = poolMask(l);
            return (
              <div
                key={l.id}
                className={styles.lit}
                style={{ maskImage: mask, WebkitMaskImage: mask, opacity: lights[l.id] ? 1 : 0 }}
              />
            );
          })}

          {/* the reader: covers both poses so the light pools never show two of her */}
          {[
            { src: "/hero/reader-reading.webp", show: lights.tl },
            { src: "/hero/reader-reading-dark.webp", show: !lights.tl },
          ].map((r) => (
            <div
              key={r.src}
              aria-hidden="true"
              className={styles.reader}
              style={{
                left: px(READER.x),
                top: py(READER.y),
                width: px(READER.w),
                height: py(READER.h),
                backgroundImage: `url(${r.src})`,
                opacity: r.show ? 1 : 0,
              }}
            />
          ))}

          <canvas ref={canvasRef} className={styles.fx} aria-hidden="true" />

          {LIGHTS.map((l) => {
            const on = lights[l.id];
            const style: CSSProperties = { left: px(l.x), top: py(l.y), width: px(l.hw ?? 110), height: px(l.hh ?? l.hw ?? 110) };
            if (l.id === "fire") {
              style.borderRadius = "40% 40% 12% 12%";
              style.height = "auto";
              style.aspectRatio = `${l.hw}/${l.hh}`;
            }
            return (
              <button
                key={l.id}
                type="button"
                className={styles.lt}
                style={style}
                aria-pressed={on}
                aria-label={`${l.name}, ${on ? "on. Turn off" : "off. Turn on"}`}
                onClick={() => toggleLight(l)}
              >
                <span className={styles.tip} aria-hidden="true">{l.name} · {on ? "off" : "on"}</span>
              </button>
            );
          })}

          <button
            type="button"
            className={`${styles.kitty} ${purr ? styles.talk : ""} ${allOff ? styles.awake : ""}`}
            aria-label="Pet the cat"
            onClick={petCat}
          >
            <span className={styles.eyes} aria-hidden="true">
              <b className={styles.eye} style={{ left: "18.2%", top: "63.7%" }} />
              <b className={styles.eye} style={{ left: "30.4%", top: "54.7%" }} />
            </span>
            <span className={styles.zz} aria-hidden="true"><span>z</span><span>z</span><span>z</span></span>
            <span className={styles.hearts} aria-hidden="true">
              {hearts.map((h) => (
                <i key={h.id} className={styles.heart} style={{ left: h.i * 14, animationDelay: `${h.i * 0.12}s`, ["--dx" as string]: `${h.dx}px` }}>♥</i>
              ))}
            </span>
            <span className={styles.bubble} aria-hidden="true">{bubbleText}</span>
          </button>

          <Link href="/work" className={styles.books}>
            <span className={styles.hotin}><PlusIcon /><span className={styles.lab}>Open the case studies</span></span>
          </Link>

          {HOTSPOTS.map((h) => (
            <Link key={h.href} href={h.href} className={styles.hot} style={{ left: `${h.left}%`, top: `${h.top}%` }}>
              <span className={styles.hotin}><PlusIcon /><span className={styles.lab}>{h.label}</span></span>
            </Link>
          ))}

          <p className={styles.hint} aria-hidden="true">Click a light · Say hi to the cat · Follow the + signs</p>
        </div>
      </div>

      <p className={styles.hintMobile} aria-hidden="true">Swipe to look around · tap a light · follow the + signs</p>
      <button type="button" className={styles.pause} aria-pressed={paused} onClick={togglePause}>
        {paused ? "Play motion" : "Pause motion"}
      </button>
      <p className={styles.sr} role="status">{status}</p>
    </section>
  );
}

export default ReadingRoomHero;
