import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", "/work", "/about", "/testimonials", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const studies = caseStudies.map((s: { slug: string }) => ({
    url: absoluteUrl(`/work/${s.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.9,
  }));
  return [...pages, ...studies];
}
