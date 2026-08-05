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
    description: "UI design, spatial brainstorming, and analog low-fidelity exploration.",
    tools: ["Figma", "Paper Design", "FigJam", "Miro"],
  },
  {
    category: "Design Systems & UI Frameworks",
    description: "Accessible component governance, tokenized layouts, and UI primitives.",
    tools: ["Shadcn UI", "Radix UI", "Polaris", "Tailwind CSS"],
  },
  {
    category: "AI & Co-Creation",
    description: "Prompt-driven iteration, concept generation, and AI-assisted workflows.",
    tools: ["Claude", "Claude Design"],
  },
  {
    category: "Frontend & Prototyping",
    description: "Production-grade code understanding, structural markup, and IDE tuning.",
    tools: ["HTML", "CSS", "Visual Studio Code"],
  },
  {
    category: "Product & Operations",
    description: "Async collaboration, spec documentation, and issue tracking.",
    tools: ["Linear", "Notion"],
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
      ease: [0.215, 0.61, 0.355, 1] as const, // Added 'as const' here to enforce the tuple type
    },
  },
};

export function ToolsSection({
  className = "",
  title = "Tools & Stack",
  subtitle = "The software, frameworks, and AI tools I rely on to bridge product strategy, system design, and frontend execution.",
}: ToolsSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10"
      >
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Toolkit & Environment
        </span>
        <h2 className="mt-1 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </motion.div>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stackData.map((item) => (
          <motion.div
            key={item.category}
            variants={cardVariants}
            className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs flex flex-col justify-between hover:border-border transition-colors duration-200"
          >
            <div>
              <h3 className="text-base font-medium text-foreground">
                {item.category}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 mb-6 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground border border-border/50"
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