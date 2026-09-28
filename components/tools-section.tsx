// components/tools-section.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

export function ToolsSection({
  className = "",
  title = "Tools & Stack",
  subtitle = "The software, frameworks, and AI tools I rely on to bridge product strategy, system design, and frontend execution.",
}: ToolsSectionProps) {
  return (
    <section className={`border-y border-border/80 py-12 md:py-14 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
      >
        {stackData.map((item, index) => (
          <motion.div
            key={item.category}
            variants={cardVariants}
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default ToolsSection;
