import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/content";
import { CaseStudyJsonLd } from "@/components/json-ld";

/**
 * Server-side wrapper for every case study: its own title, description,
 * canonical URL, share preview and JSON-LD. The page itself stays a client component.
 */
const findStudy = (slug: string) => caseStudies.find((s) => s.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = findStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title: study.title,
      description: study.summary,
      ...(study.cover ? { images: [{ url: study.cover, alt: study.title }] } : {}),
    },
  };
}

export default async function CaseStudyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = findStudy(slug);
  if (!study) notFound();

  return (
    <>
      <CaseStudyJsonLd
        slug={slug}
        title={study.title}
        description={study.summary}
        image={study.cover || undefined}
        year={study.year ? String(study.year) : undefined}
        keywords={study.tags}
      />
      {children}
    </>
  );
}
