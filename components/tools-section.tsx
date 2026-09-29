// components/tools-section.tsx
"use client";

import React from 'react';
interface ToolCategory {
  category: string;
  description: string;
  tools: string[];
}

const stackData: ToolCategory[] = [
  {
    category: "Interface",
    description: "",
    tools: ["Figma", "FigJam", "Canva", "Miro", "Paper Design"],
  },
  {
    category: "Design Systems & UI Frameworks",
    description: "",
    tools: ["Shadcn UI", "Radix UI", "Shopify Polaris", "Tailwind CSS"],
  },
  {
    category: "Frontend & Prototyping",
    description: "",
    tools: ["Framer", "Webflow", "HTML", "CSS", "VS Code"],
  },
  {
    category: "Product & Operations",
    description: "",
    tools: ["Linear", "Notion"],
  },
  {
    category: "AI & Co-Creation",
    description: "",
    tools: ["Claude", "Claude Design", "ChatGPT", "Moda.app", "Gamma.app"],
  },
];

interface ToolsSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function ToolsSection({
  className = "",
  title = "Tools & Stack",
  subtitle = "The software, frameworks, and AI tools I rely on to bridge product strategy, system design, and frontend execution.",
}: ToolsSectionProps) {
  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 bg-muted/20 py-12 md:py-14 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
      <div className="mb-10 px-0 md:mb-12">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          Toolkit & Environment
        </span>
        <h2 className="mt-1 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {stackData.map((item, index) => (
          <div
            key={item.category}
            className={`min-h-[220px] lg:min-h-[280px] ${
              index < stackData.length - 1
                ? ""
                : ""
            } ${index > 0 ? "" : ""}`}
          >
            <h3 className="max-w-[190px] text-lg font-semibold leading-tight tracking-tight text-foreground md:text-xl">
              {item.category}
            </h3>
            <div className="mt-6 flex flex-wrap content-start gap-2.5">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-pink-500/60 hover:text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export default ToolsSection;
