"use client";

/**
 * AI Workflows — homepage section (Next.js App Router + Tailwind CSS).
 *
 * Setup
 * 1. Save this file as components/AiWorkflows.tsx
 * 2. Upload the three images to public/work/ (same folder as MediDrive-portal-cover.png).
 *    File names are set in IMAGES below; change them there if yours differ.
 * 3. On the homepage: import AiWorkflows from "@/components/AiWorkflows";
 *    then render <AiWorkflows /> after the Before & After section.
 *
 * Uses your site's fonts (inherits the sans font; labels use Tailwind `font-mono`).
 * Works with Tailwind v3.3+ and v4. Copy lives in AUDIENCES / PROMPT below.
 * The phone screens are hand-built from the medidrive-prototyper skill's rules
 * (fictional data). Replace them with real skill output before launch.
 */

import { useRef, useState, type KeyboardEvent, type ReactNode, type SVGProps } from "react";
import Image from "next/image";


/* ============================== Content ============================== */

type Rule = { id: string; title: string; section: string; excerpt: string; note?: string };
type AudienceId = "designer" | "developer" | "marketing";
type Audience = { id: AudienceId; label: string; hint: string; rules: Rule[] };

const PROMPT = "“Show Maria Lopez that her driver is on the way to her dialysis appointment.”";
const SKILL_NAME = "medidrive-prototyper";

const AUDIENCES: Audience[] = [
  {
    id: "designer",
    label: "Designer",
    hint: "Open a rule to see what it changed on screen.",
    rules: [
      { id: "d-var", title: "Variants test ideas, not colors", section: "Explore mode", excerpt: "2–3 meaningfully different variants side by side, each labeled with the design hypothesis it tests. Not color swaps." },
      { id: "d-primary", title: "One primary action per screen", section: "Who members are", excerpt: "Use only one primary button. Everything else is secondary, tertiary or a link.", note: "Why: members are often stressed, older, or on a small phone." },
      { id: "d-color", title: "Status is never shown by color alone", section: "Who members are", excerpt: "Every status badge needs a text label.", note: "Source: WCAG 2.1 SC 1.4.1 Use of Color" },
      { id: "d-help", title: "There's always a human to reach", section: "Who members are", excerpt: "Show a way to get human help on any screen where something can go wrong. A call may be the primary action only when calling is the fix." },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    hint: "Specs show the Figma token and component behind each element.",
    rules: [
      { id: "v-status", title: "Every status maps to one badge", section: "Usage rules", excerpt: "Trip status → badge. Waiting for approval → warning. Driver on the way → info. Always use a text label.", note: "The skill marks mappings that aren't in Figma yet as proposed, for the design team to confirm." },
      { id: "v-type", title: "Member-critical text is 16px or larger", section: "Who members are", excerpt: "Times, addresses, names and instructions use at least body/sm (16px). This is a team rule; the DS itself allows 12px." },
      { id: "v-hex", title: "Semantic tokens only, gaps get flagged", section: "Tokens", excerpt: "Never hardcode hex values and never use primitives directly. CSS names are the Figma variable names with / replaced by -.", note: "The secondary button gradient has no token in Figma, so the skill flags it instead of hiding it." },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    hint: "Open a rule to see what it changed on screen.",
    rules: [
      { id: "m-guard", title: "It won't invent patterns", section: "Guarded mode", excerpt: "If part of the request isn't covered, build the rest and put a grey placeholder labeled “Needs design team: <what>” where it would go.", note: "Live maps are out of scope for the skill, so the tracking map becomes a placeholder." },
      { id: "m-data", title: "Real member data gets replaced", section: "Data rules", excerpt: "Treat any value the requester supplies about a specific person as real and replace it.", note: "“Maria Lopez” in the prompt became “Dana Reyes”." },
      { id: "m-min", title: "Health details stay off summary screens", section: "Minimum necessary", excerpt: "On summary surfaces, say “Medical appointment”, not the treatment type.", note: "Source: HIPAA minimum necessary, 45 CFR 164.502(b). “Dialysis” stays off the trips list." },
      { id: "m-plain", title: "Plain language, no internal jargon", section: "Who members are", excerpt: "Write “Your driver is on the way”, not “Trip status: En route”.", note: "Source: Federal Plain Language Guidelines" },
    ],
  },
];

// Images live in public/work/ — served at https://oana-ecru.vercel.app/work/<file>
const IMAGES = {
  ambulatory: "/work/MediDrive-ride-ambulatory.png",
  wheelchair: "/work/MediDrive-ride-wheelchair.png",
  map: "/work/MediDrive-ride-map.png",
};

const DEFAULT_OPEN: Record<AudienceId, string | null> = { designer: "d-var", developer: "v-status", marketing: "m-guard" };

/* ============================== Helpers ============================== */

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
type Hl = (ids: string) => string;

const MONO = "font-mono"; // your portfolio's Tailwind mono font
const FOCUS = "focus-visible:[outline:2px_solid_#ff5c97] focus-visible:[outline-offset:2px]";
const HL = "[outline:2px_solid_#ff5c97] [outline-offset:4px]";

/* ============================== Icons ============================== */

type P = SVGProps<SVGSVGElement>;
const svg = (p: P, children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...p}>{children}</svg>
);
const Ic = {
  Back: (p: P) => svg(p, <path d="m15 18-6-6 6-6" />),
  Chevron: (p: P) => svg(p, <path d="m6 9 6 6 6-6" />),
  Phone: (p: P) => svg(p, <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />),
  Headset: (p: P) => svg(p, <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />),
  Pin: (p: P) => svg(p, <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  Flag: (p: P) => svg(p, <path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H5" />),
  Clock: (p: P) => svg(p, <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  Warning: (p: P) => svg(p, <><path d="m10.3 3.9-8.2 14A2 2 0 0 0 3.8 21h16.4a2 2 0 0 0 1.7-3.1l-8.2-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>),
  Link: (p: P) => svg(p, <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>),
  Home: (p: P) => svg(p, <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />),
  Calendar: (p: P) => svg(p, <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  File: (p: P) => svg(p, <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>),
  User: (p: P) => svg(p, <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  Car: (p: P) => svg(p, <><path d="M19 17h2v-4l-2-5H5L3 13v4h2" /><path d="M3 13h18" /><circle cx="7.5" cy="17" r="2" /><circle cx="16.5" cy="17" r="2" /></>),
  Map: (p: P) => svg(p, <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>),
  Route: (p: P) => svg(p, <><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></>),
};

/* ===================== MediDrive UI (tokens noted in comments) ===================== */

// Phone frame: 375 × 812. Colors are the MediDrive semantic tokens.
const FRAME = "flex h-[812px] w-[375px] flex-none flex-col overflow-hidden rounded-[28px] border-8 border-[#1b1b1b] bg-[#fafafa] text-left leading-[1.4] text-[#2b2b2b] shadow-[0_20px_40px_rgba(0,0,0,.12)]";
const MAIN = "flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-4 pb-6";
const H1 = "text-2xl font-semibold leading-[1.3]"; // heading/md/semibold
const HERO = "text-[22px] font-semibold leading-[1.3]"; // heading/sm/semibold
const SUB = "text-base font-semibold text-[#525252]"; // body/sm/semibold, text/default/secondary
const CARD = "rounded-xl border-2 border-[#85bcf8] bg-white shadow-[0_4px_8px_rgba(0,0,0,.04)]"; // card--active: border/info-subtle
const BADGE = "inline-flex items-center gap-1 rounded-[30px] px-3 py-1.5 text-sm font-medium";
const BADGE_INFO = `${BADGE} bg-[#f0f7ff] text-[#094e88]`;
const BADGE_WARN = `${BADGE} bg-[#fffbf0] text-[#a86000]`;
const CHIP_BASE = "inline-flex whitespace-nowrap rounded-[30px] px-2.5 py-1 text-base font-semibold";
const CHIP = `${CHIP_BASE} bg-[#f4f4f4]`;
const CHIP_WARN = `${CHIP_BASE} bg-[#fffbf0] text-[#a86000]`;
const BTN = "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent text-base font-semibold [&_svg]:h-5 [&_svg]:w-5 [&_svg]:flex-none";
const BTN_PRIMARY = `${BTN} w-full bg-[#007a55] px-4 text-white`; // add h-10 (md) or h-12 (lg)
const BTN_SECONDARY = `${BTN} h-10 border-[#d0d0d0] bg-white bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(153,153,153,.2))] px-4 text-[#525252]`;
const BTN_ICON = `${BTN} h-10 w-10 bg-white text-[#525252]`;
const AV = "grid flex-none place-items-center font-semibold [&_svg]:h-5 [&_svg]:w-5";
const AVATAR = `${AV} h-10 w-10 rounded-full bg-[#f4f4f4] text-sm text-[#525252]`;
const AVATAR_BRAND = `${AV} h-10 w-10 rounded-full bg-[#e3f2ee] text-sm text-[#004d37]`;
const AVATAR_LG = `${AV} h-14 w-14 rounded-full bg-[#f4f4f4] text-base text-[#525252]`;
const AVATAR_SQUARE = `${AV} h-10 w-10 rounded-lg bg-[#f4f4f4] text-[#525252]`;
const LABEL = "text-xs font-medium uppercase tracking-[.02em] text-[#525252]"; // caption/sm
// Spec annotation tag (Developer tab)
const SPEC = "relative [outline:1px_solid_rgba(94,59,247,.55)] [outline-offset:2px] after:pointer-events-none after:absolute after:z-[2] after:whitespace-nowrap after:rounded after:bg-[#5e3bf7] after:px-1.5 after:py-[3px] after:text-[9.5px] after:font-medium after:leading-[1.2] after:text-white after:content-[attr(data-spec)] after:font-mono";
const SPEC_TOP = "after:-top-2.5 after:-right-1";
const SPEC_BELOW = "after:-bottom-5 after:-right-1";
const SPEC_INSIDE = "after:bottom-1 after:right-2";

function Illo({ wheelchair }: { wheelchair?: boolean }) {
  return wheelchair
    ? <Image src={IMAGES.wheelchair} alt="" width={120} height={80} className="h-auto w-[120px] flex-none" />
    : <Image src={IMAGES.ambulatory} alt="" width={84} height={56} className="h-auto w-[84px] flex-none" />;
}

function MemberHeader({ className }: { className?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white px-3.5 py-2.5 shadow-[0_4px_8px_rgba(0,0,0,.04)]">
      <span className={AVATAR_BRAND}>DR</span>
      <span className={cx("flex-1 text-xl font-semibold leading-[1.3]", className)}>Dana Reyes</span>
      <Ic.Chevron className="h-5 w-5 text-[#525252]" />
    </div>
  );
}

function TripTabs() {
  const base = "flex-1 rounded-lg px-1 py-2 text-center text-sm";
  const item = `${base} font-medium text-[#525252]`;
  return (
    <div className="flex rounded-xl bg-white p-1 shadow-[0_4px_8px_rgba(0,0,0,.04)]">
      <span className={`${base} bg-[#f4f4f4] font-semibold text-[#2b2b2b]`}>Today (1)</span>
      <span className={item}>Upcoming (3)</span>
      <span className={item}>Past (4)</span>
    </div>
  );
}

function TabBar() {
  const base = "flex min-h-14 flex-1 flex-col items-center gap-0.5 py-2 text-sm font-medium [&_svg]:h-[22px] [&_svg]:w-[22px]";
  const tab = `${base} text-[#525252]`;
  return (
    <nav aria-label="App" className="mt-auto flex flex-none border-t border-[#ededed] bg-white">
      <span className={tab}><Ic.Home />Home</span>
      <span className={`${base} text-[#004d37]`}><Ic.Route />Trips</span>
      <span className={tab}><Ic.File />Enrollment</span>
      <span className={tab}><Ic.User />Account</span>
    </nav>
  );
}

/* Designer · A — Time-first */
function VariantA({ hl }: { hl: Hl }) {
  return (
    <div className={cx(FRAME, hl("d-var"))}>
      <div className={cx(MAIN, "gap-5")}>
        <MemberHeader />
        <TripTabs />
        <p className={H1}>Today&apos;s trips</p>
        <div className={CARD}>
          <div className="flex flex-col gap-3 p-4">
            <div><span className={cx(BADGE_INFO, hl("d-color"))}>Driver on the way</span></div>
            <div className="flex items-start gap-3">
              <Illo />
              <div>
                <span className="text-xs text-[#525252]">ID: 10-14-2026-4673-A</span>
                <p className={HERO}>Arrives in 7 min</p>
                <p className={SUB}>Ambulatory</p>
              </div>
            </div>
            <Image src={IMAGES.map} alt="" width={652} height={360} className="block h-auto w-full rounded-2xl border border-[#ededed]" />
            <div className="flex items-center gap-3">
              <span className={AVATAR}>MR</span>
              <div>
                <span className="block text-base font-semibold">Driver: Marco Ruiz</span>
                <span className="block text-sm text-[#525252]">Silver Toyota Sienna · ABC-1234</span>
              </div>
            </div>
            <span className={cx(BTN_PRIMARY, "h-10", hl("d-primary d-help"))}><Ic.Phone />Call driver</span>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
}

/* Designer · B — Driver-first */
function VariantB({ hl }: { hl: Hl }) {
  return (
    <div className={cx(FRAME, hl("d-var"))}>
      <div className={cx(MAIN, "gap-5")}>
        <MemberHeader />
        <TripTabs />
        <p className={H1}>Today&apos;s trips</p>
        <div className={CARD}>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <span className={cx(BADGE_INFO, hl("d-color"))}>Driver on the way</span>
              <span className={CHIP}>7 min</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={AVATAR_LG}>MR</span>
              <div>
                <p className={HERO}>Marco is coming</p>
                <span className="text-base font-medium">Silver Toyota Sienna</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#ededed] bg-[#fafafa] px-3.5 py-3">
              <span className={LABEL}>Look for plate</span>
              <b className="text-xl font-bold tracking-[.06em]">ABC-1234</b>
            </div>
            <span className={cx(BTN_PRIMARY, "h-12", hl("d-primary d-help"))}><Ic.Phone />Call driver</span>
            <span className={cx(BTN, "h-auto text-[#006145]")}>See on map</span>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
}

/* Developer — Your ride (trip details), annotated */
function SpecFrame({ hl, specs }: { hl: Hl; specs: boolean }) {
  const s = (pos = SPEC_TOP) => (specs ? cx(SPEC, pos) : "relative");
  const row = "grid grid-cols-[24px_1fr_auto] items-center gap-2.5 [&>span:first-child_svg]:h-[22px] [&>span:first-child_svg]:w-[22px] [&>span:first-child]:text-[#007a55]";
  return (
    <div className={FRAME}>
      <div data-spec="topbar · background" className={cx("flex min-h-14 flex-none items-center gap-3 border-b border-[#ededed] bg-white px-4 py-2", s(SPEC_INSIDE))}>
        <span className={BTN_ICON}><Ic.Back /></span>
        <p className="flex-1 text-center text-xl font-semibold">Your ride</p>
        <span className={BTN_ICON}><Ic.Map /></span>
      </div>
      <div className={cx(MAIN, specs ? "gap-7" : "gap-5")}>
        <div className={cx("flex flex-col items-center text-center", specs ? "gap-[18px] pt-2" : "gap-2")}>
          <span data-spec="Badges · Warning · lg" className={cx(BADGE_WARN, s(), hl("v-status"))}>Waiting for confirmation</span>
          <Illo wheelchair />
          <span className="text-xs text-[#525252]">ID: 10-14-2026-4673-A</span>
          <p data-spec="heading/md/semibold" className={cx(H1, s(), hl("v-type"))}>Tue, Oct 14 at 9:30 AM</p>
          <p className={SUB}>Wheelchair</p>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#ededed] pt-4">
          <p className={LABEL}>Trip route</p>
          <ul className={cx("flex flex-col", specs ? "gap-[22px]" : "gap-3.5")}>
            <li className={row}><span><Ic.Clock /></span><span className="text-base font-medium">Be ready by</span><span data-spec="badge--warning · time" className={cx(CHIP_WARN, s(), hl("v-status"))}>9:15 AM</span></li>
            <li className={row}><span><Ic.Pin /></span><span data-spec="body/sm/medium · 16px" className={cx("text-base font-medium", s(SPEC_BELOW), hl("v-type"))}>112 Larkspur Ln, Apt 4B</span><span className={CHIP}>9:30 AM</span></li>
            <li className={row}><span><Ic.Flag /></span><span className="text-base font-medium">Bramblewood Health Center</span><span className={CHIP}>10:30 AM</span></li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#ededed] pt-4">
          <p className={LABEL}>Transportation provider</p>
          <div className="flex items-center gap-3"><span className={AVATAR_SQUARE}><Ic.Car /></span><span className="text-base font-medium">Cedar Lane Medical Rides</span></div>
        </div>
      </div>
      <div data-spec="Buttons · secondary · md" className={cx("mt-auto grid flex-none grid-cols-2 gap-2.5 border-t border-[#ededed] bg-white px-4 pt-3.5 pb-[18px]", s(), hl("v-hex"))}>
        <span className={BTN_SECONDARY}><Ic.Headset />Support</span>
        <span className={BTN_SECONDARY}><Ic.Calendar />Add to calendar</span>
      </div>
    </div>
  );
}

/* Marketing — Guarded */
function GuardedFrame({ hl }: { hl: Hl }) {
  return (
    <div className={FRAME}>
      <div className={cx(MAIN, "gap-5")}>
        <MemberHeader className={hl("m-data")} />
        <p className={H1}>Today&apos;s trips</p>
        <div className={CARD}>
          <div className="flex flex-col gap-3 p-4">
            <div><span className={BADGE_INFO}>Driver on the way</span></div>
            <div className="flex items-start gap-3">
              <Illo />
              <div>
                <p className={cx(HERO, hl("m-plain"))}>Your driver is on the way</p>
                <p className={cx(SUB, hl("m-min"))}>Medical appointment · 9:30 AM</p>
              </div>
            </div>
            <div className={cx("grid place-items-center gap-1 rounded-lg border border-dashed border-[#8c8c8c] bg-[#f4f4f4] px-3.5 py-[18px] text-center text-sm font-medium text-[#525252]", hl("m-guard"))}>
              <b className="inline-flex items-center gap-1.5 text-[#2b2b2b]"><Ic.Warning className="h-4 w-4" />Needs design team</b>
              Live driver map. Real-time tracking isn&apos;t in the design system yet.
            </div>
            <span className={cx(BTN_PRIMARY, "h-10")}><Ic.Phone />Call driver</span>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
}

/* ============================== Section ============================== */

export default function AiWorkflows() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(DEFAULT_OPEN);
  const [hover, setHover] = useState<string | null>(null);
  const [specs, setSpecs] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const aud = AUDIENCES[tab];
  const active = hover ?? open[aud.id];
  const hl: Hl = (ids) => (active && ids.split(" ").includes(active) ? HL : "");

  const select = (i: number, focus = false) => {
    setTab(i);
    setHover(null);
    if (focus) tabRefs.current[i]?.focus();
  };
  const onTabKey = (e: KeyboardEvent, i: number) => {
    const n = AUDIENCES.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (next !== null) { e.preventDefault(); select(next, true); }
  };

  const shot = "[zoom:.8] sm:[zoom:1]"; // single phone
  const pairShot = "[zoom:.8] sm:[zoom:.86]"; // two phones side by side
  const canvas = "flex items-start gap-7 overflow-x-auto rounded-xl bg-[#f2f2f2] px-4 py-5 snap-x snap-mandatory lg:min-h-[620px] lg:px-6 lg:py-8 xl:justify-center";

  return (
    <section
      aria-labelledby="aw-title"
      className="mx-auto max-w-[1100px] text-[#f2f2f2] antialiased"
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="aw-title" className="text-3xl font-semibold leading-[1.25] tracking-[-.015em] [text-wrap:balance] sm:text-2xl">
            Teaching AI to design like the MediDrive team
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#a3a3a3]">
            Same prompt, three people asking. Pick who&apos;s asking, then open a rule to see what it changed on screen.
          </p>
        </div>
        <div role="tablist" aria-label="Who is asking" className="inline-flex gap-0.5 rounded-full border border-[#2a2a2a] bg-[#111111] p-1">
          {AUDIENCES.map((a, i) => (
            <button
              key={a.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`aw-tab-${a.id}`}
              aria-controls={`aw-panel-${a.id}`}
              aria-selected={i === tab}
              tabIndex={i === tab ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cx(
                "h-9 cursor-pointer rounded-full px-4 text-[13px] font-medium transition-colors duration-200",
                i === tab ? "bg-[#f2f2f2] text-[#0a0a0a]" : "text-[#a3a3a3] hover:bg-[#171717] hover:text-[#f2f2f2]",
                FOCUS,
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Module */}
      <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#111111]">
        <div className="mb-2 flex flex-wrap items-center gap-4 border-b border-[#1f1f1f] px-4 py-4 sm:px-5">
          <span className={cx("text-[11px] font-medium uppercase leading-none tracking-[.12em] text-[#8a8a8a]", MONO)}>Prompt</span>
          <span className="min-w-[220px] flex-1 text-[15px] font-medium leading-normal">{PROMPT}</span>
          <span className={cx("inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-2.5 py-1.5 text-xs leading-none text-[#a3a3a3]", MONO)}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#ff2d7a,#c81fd1)]" />
            Claude skill · {SKILL_NAME}
          </span>
        </div>

        <div role="tabpanel" id={`aw-panel-${aud.id}`} aria-labelledby={`aw-tab-${aud.id}`} className="grid grid-cols-1 gap-2 px-2 pb-2 lg:grid-cols-[minmax(0,1fr)_336px]">
          {/* Output */}
          <div className="min-w-0">
            {aud.id === "designer" && (
              <>
                <div tabIndex={0} role="group" aria-label="Two design variants, scrollable" className={cx(canvas, FOCUS)}>
                  <figure className="m-0 flex flex-none snap-center flex-col items-start gap-3">
                    <div inert className={pairShot}><VariantA hl={hl} /></div>
                    <figcaption className="flex max-w-[322px] flex-col gap-1 text-xs leading-normal text-[#525252]">
                      <b className={cx("font-semibold tracking-[.02em] text-[#2b2b2b]", MONO)}>A · Time-first</b>
                      <span>Watch in testing: do members know when to be outside?</span>
                    </figcaption>
                  </figure>
                  <figure className="m-0 flex flex-none snap-center flex-col items-start gap-3">
                    <div inert className={pairShot}><VariantB hl={hl} /></div>
                    <figcaption className="flex max-w-[322px] flex-col gap-1 text-xs leading-normal text-[#525252]">
                      <b className={cx("font-semibold tracking-[.02em] text-[#2b2b2b]", MONO)}>B · Driver-first</b>
                      <span>Watch: do members find the right car faster at a busy pickup?</span>
                      <span className="inline-flex items-center gap-1.5"><Ic.Link className="h-3.5 w-3.5 flex-none" />Depends on: ride companies sharing the driver&apos;s first name</span>
                    </figcaption>
                  </figure>
                </div>
                <p className="px-1 pt-2.5 text-xs text-[#a3a3a3] lg:hidden">Swipe to compare variant A and B.</p>
              </>
            )}
            {aud.id === "developer" && (
              <div className={cx(canvas, "justify-center")}>
                <figure className="m-0">
                  <div inert className={shot}><SpecFrame hl={hl} specs={specs} /></div>
                  <figcaption className="sr-only">Ride details screen, waiting for confirmation, with spec annotations</figcaption>
                </figure>
              </div>
            )}
            {aud.id === "marketing" && (
              <div className={cx(canvas, "justify-center")}>
                <figure className="m-0">
                  <div inert className={shot}><GuardedFrame hl={hl} /></div>
                  <figcaption className="sr-only">Today&apos;s trips screen with a placeholder where the design team needs to add a live map</figcaption>
                </figure>
              </div>
            )}
          </div>

          {/* Why it did that */}
          <aside aria-label="Why it did that" className="flex min-w-0 flex-col gap-3 rounded-xl bg-[#171717] px-4 py-5">
            <p className={cx("text-[11px] font-medium uppercase leading-none tracking-[.12em] text-[#8a8a8a]", MONO)}>Why it did that</p>
            {aud.id === "developer" ? (
              <button
                type="button"
                aria-pressed={specs}
                onClick={() => setSpecs((v) => !v)}
                className={cx("inline-flex h-9 cursor-pointer items-center gap-2 self-start rounded-full border border-[#2a2a2a] bg-[#111111] px-3.5 text-[13px] font-medium", FOCUS)}
              >
                <i aria-hidden="true" className={cx("h-2 w-2 rounded-full", specs ? "bg-[#7c5cff]" : "bg-[#8a8a8a]")} />
                Show specs
              </button>
            ) : (
              <p className="mb-1 text-[13px] leading-normal text-[#a3a3a3]">{aud.hint}</p>
            )}
            <ul className="flex flex-col gap-1.5">
              {aud.rules.map((r, i) => {
                const isOpen = open[aud.id] === r.id;
                return (
                  <li key={r.id} className={cx("rounded-[10px] transition-colors duration-200", isOpen ? "bg-[#1f1f1f]" : "bg-[#111111] hover:bg-[#1c1c1c]")}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`aw-rule-${r.id}`}
                      onClick={() => setOpen((o) => ({ ...o, [aud.id]: isOpen ? null : r.id }))}
                      onMouseEnter={() => setHover(r.id)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(r.id)}
                      onBlur={() => setHover(null)}
                      className={cx("flex min-h-11 w-full cursor-pointer items-start gap-3 rounded-[10px] px-3.5 py-3 text-left", FOCUS)}
                    >
                      <span className={cx("min-w-[18px] text-[11px] font-medium leading-[1.7]", isOpen ? "text-[#ff5c97]" : "text-[#8a8a8a]")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-sm font-medium leading-[1.45]">{r.title}</span>
                      <Ic.Chevron className={cx("mt-0.5 h-4 w-4 flex-none text-[#8a8a8a] transition-transform duration-200 motion-reduce:transition-none", isOpen && "rotate-180")} />
                    </button>
                    {isOpen && (
                      <div id={`aw-rule-${r.id}`} className="pr-3.5 pb-3.5 pl-11">
                        <blockquote className={cx("m-0 text-md text-[#d4d4d4]")}>
                          {r.excerpt}
                        </blockquote>
                        {r.note && <p className="mt-2.5 text-xs leading-normal text-[#a3a3a3]">{r.note}</p>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
