"use client";

import { Fragment } from "react";
import { MotionConfig, motion } from "framer-motion";
import { Layers, LayoutGrid, PenTool, RefreshCcw, Search, Share2, Target, type LucideIcon } from "lucide-react";
import { aiProcess } from "@/lib/content";

/** One icon per step, in the same order as aiProcess.steps. */
const ICONS: LucideIcon[] = [Layers, Search, Target, LayoutGrid, PenTool, Share2];

/** Consecutive steps that share a phase, with where each group starts. */
const phases = aiProcess.steps.reduce<{ name: string; start: number; count: number }[]>((acc, step, i) => {
  const last = acc[acc.length - 1];
  if (last && last.name === step.phase) last.count += 1;
  else acc.push({ name: step.phase, start: i, count: 1 });
  return acc;
}, []);

const isClaude = (tool: string) => tool === "Claude";

function Node({ index, tool }: { index: number; tool: string }) {
  const Icon = ICONS[index];
  return (
    <span
      aria-hidden="true"
      className={[
        "relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-[#121016] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1",
        isClaude(tool) ? "text-pink-300 ring-pink-400/40" : "text-foreground ring-white/20",
      ].join(" ")}
    >
      <Icon className="size-[18px]" strokeWidth={1.75} />
    </span>
  );
}

function ToolChip({ tool }: { tool: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ring-1",
        isClaude(tool) ? "bg-pink-400/10 text-pink-200 ring-pink-400/25" : "bg-white/[0.04] text-foreground/80 ring-white/15",
      ].join(" ")}
    >
      {tool}
    </span>
  );
}

export function AiProcess() {
  const n = aiProcess.steps.length;
  // With reduced motion on, MotionConfig drops the movement and keeps only a soft fade.
  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <MotionConfig reducedMotion="user">
      {/* ───── Desktop: a horizontal path with phases above and a loop below ───── */}
      <div className="relative hidden lg:block">
        {/* Phase brackets */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {phases.map((p) => (
            <div key={p.name} className="px-3" style={{ gridColumn: `${p.start + 1} / span ${p.count}` }}>
              <p className="border-b border-border/60 pb-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                {p.name}
              </p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <ol className="relative mt-10 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {/* the line running through every node */}
          <motion.span
            aria-hidden="true"
            className="absolute top-[22px] h-px origin-left bg-gradient-to-r from-pink-400/70 via-fuchsia-400/50 to-white/25"
            style={{ left: `${50 / n}%`, right: `${50 / n}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {aiProcess.steps.map((step, i) => (
            <motion.li key={step.title} className="flex flex-col items-center px-3 text-center" {...reveal(i)}>
              <Node index={i} tool={step.tool} />
              <span className="mt-5 text-xs font-medium tabular-nums text-pink-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-balance text-base font-medium leading-snug tracking-tight text-foreground xl:text-lg">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              <span className="mt-auto pt-4">
                <ToolChip tool={step.tool} />
              </span>
            </motion.li>
          ))}
        </ol>

        {/* The loop: step 6 back to step 1 */}
        <div aria-hidden="true" className="relative mt-8 h-14" style={{ marginLeft: `${50 / n}%`, marginRight: `${50 / n}%` }}>
          <span className="absolute inset-0 rounded-b-[28px] border-x border-b border-dashed border-white/20" />
          {/* arrowhead pointing up at step 1 */}
          <svg className="absolute -left-[5px] -top-2 text-white/40" width="11" height="8" viewBox="0 0 11 8">
            <path d="M1 7 5.5 1.5 10 7" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
          <span className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-2 bg-background px-4 text-xs font-medium text-muted-foreground">
            <RefreshCcw className="size-3.5 text-pink-400" strokeWidth={2} />
            {aiProcess.loop}
          </span>
        </div>
      </div>

      {/* ───── Mobile & tablet: a vertical timeline ───── */}
      <ol className="relative lg:hidden">
        <span aria-hidden="true" className="absolute bottom-16 left-[21px] top-2 w-px bg-gradient-to-b from-pink-400/70 via-fuchsia-400/40 to-white/20" />
        {aiProcess.steps.map((step, i) => {
          const phaseStart = phases.find((p) => p.start === i);
          return (
            <Fragment key={step.title}>
              {phaseStart && (
                <li aria-hidden="true" className={`pl-[68px] ${i === 0 ? "" : "pt-4"} pb-4`}>
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">{phaseStart.name}</span>
                </li>
              )}
              <motion.li className="grid grid-cols-[44px_1fr] gap-x-6 pb-9" {...reveal(i)}>
                <Node index={i} tool={step.tool} />
                <div className="pt-1">
                  <p className="text-xs font-medium tabular-nums text-pink-400">
                    {String(i + 1).padStart(2, "0")}
                    <span className="sr-only"> · {step.phase}</span>
                  </p>
                  <h3 className="mt-1.5 text-lg font-medium tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">{step.detail}</p>
                  <span className="mt-3 inline-block">
                    <ToolChip tool={step.tool} />
                  </span>
                </div>
              </motion.li>
            </Fragment>
          );
        })}
        <li aria-hidden="true" className="grid grid-cols-[44px_1fr] items-center gap-x-6">
          <span className="grid size-11 place-items-center rounded-full border border-dashed border-white/25">
            <RefreshCcw className="size-4 text-pink-400" strokeWidth={2} />
          </span>
          <span className="text-sm font-medium text-muted-foreground">{aiProcess.loop}</span>
        </li>
      </ol>

      {/* the loop, said once for screen readers */}
      <p className="sr-only">After step 6, the process starts again: {aiProcess.loop.toLowerCase()}.</p>
    </MotionConfig>
  );
}
