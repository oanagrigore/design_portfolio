import { PERSON, SITE_URL, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";

/** Renders schema.org JSON-LD. Server component: safe to use in layouts and pages. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for "<" so the script tag cannot be closed early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const personId = `${SITE_URL}/#person`;

/** Site-wide: who you are + what the site is. Put once in app/layout.tsx. */
export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": personId,
            name: PERSON.name,
            jobTitle: PERSON.jobTitle,
            description: PERSON.summary,
            url: SITE_URL,
            address: {
              "@type": "PostalAddress",
              addressLocality: PERSON.location.city,
              addressCountry: PERSON.location.countryCode,
            },
            knowsAbout: PERSON.knowsAbout,
            sameAs: PERSON.sameAs,
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: `${PERSON.name} — Portfolio`,
            description: SITE_DESCRIPTION,
            publisher: { "@id": personId },
            inLanguage: "en",
          },
        ],
      }}
    />
  );
}

/** Per case study: put in app/work/[slug]/page.tsx. */
export function CaseStudyJsonLd(props: {
  slug: string;
  title: string;
  description: string;
  image?: string;
  year?: string;
  keywords?: string[];
}) {
  const url = absoluteUrl(`/work/${props.slug}`);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#casestudy`,
        url,
        name: props.title,
        headline: props.title,
        description: props.description,
        ...(props.image ? { image: absoluteUrl(props.image) } : {}),
        ...(props.year ? { dateCreated: props.year } : {}),
        ...(props.keywords?.length ? { keywords: props.keywords.join(", ") } : {}),
        author: { "@id": personId },
        creator: { "@id": personId },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en",
      }}
    />
  );
}
