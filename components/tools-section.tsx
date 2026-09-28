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
    category: "Interface & Workshop",
    description: "",
    tools: ["Figma", "FigJam", "Canva", "Miro", "Paper Design"],
  },
  {
    category: "Design Systems & UI Frameworks",
    description: "",
    tools: ["Shadcn UI", "Radix UI", "Polaris", "Tailwind CSS"],
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
    <section className={`border-y border-border/80 py-12 md:py-14 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">

        {stackData.map((item, index) => (
          <div
            key={item.category}
            className={`min-h-[220px] px-0 py-2 md:px-8 lg:min-h-[280px] lg:py-0 ${
              index < stackData.length - 1
                ? "border-border/80 md:border-r"
                : ""
            } ${index > 0 ? "border-t md:border-t-0" : ""}`}
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
    </section>
  );
}

export default ToolsSection;
