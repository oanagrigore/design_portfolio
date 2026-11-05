/**
 * One source of truth for who you are. Metadata, JSON-LD, sitemap and llms.txt
 * all read from here, so search engines and AI assistants see the same facts everywhere.
 */
export const SITE_URL = "https://www.ogrigore.design";

export const PERSON = {
  name: "Oana Grigore",
  // Pick ONE title and use it everywhere (header, about page, case studies, LinkedIn).
  jobTitle: "Senior Product Designer",
  location: { city: "Bucharest", country: "Romania", countryCode: "RO" },
  email: "grigore.oana.elena@gmail.com",
  summary:
    "Senior Product Designer for B2B SaaS and enterprise products with multiple user roles and compliance requirements. Designs accessibility in from the start (WCAG 2.1 AA) and builds the design systems that hold products together. Open to full-time and fractional work.",
  knowsAbout: [
    "Product design",
    "B2B SaaS",
    "Enterprise UX",
    "Accessibility",
    "WCAG 2.1 AA",
    "Design systems",
    "Design system governance",
    "Design tokens",
    "Product strategy",
    "Information architecture",
    "UX audits",
    "Conversion and flow optimisation",
    "AI-assisted design with Claude",
    "Healthcare UX",
    "Non-emergency medical transportation (NEMT)",
    "Shopify apps",
    "Webflow",
  ],
  sameAs: [
    "https://www.linkedin.com/in/oanagrigore",
    "https://github.com/oanagrigore",
    "https://dribbble.com/oelenagrigore",
    "https://medium.com/@oelenagrigore",
  ],
};

export const SITE_DESCRIPTION =
  "Oana Grigore is a Senior Product Designer in Bucharest for B2B SaaS and enterprise: accessible WCAG 2.1 AA products, design systems and complex multi-role flows. Led design at MediDrive; solo designer behind 40+ Vitals Shopify apps. Open to full-time and fractional work.";

/** Search and AI-answer keywords. Google ignores the keywords tag, but Bing and some AI tools still read it. */
export const SITE_KEYWORDS = [
  "Oana Grigore",
  "Senior Product Designer",
  "Lead Product Designer",
  "Fractional Product Designer",
  "B2B SaaS product designer",
  "Enterprise UX designer",
  "Design systems",
  "Design system governance",
  "Accessibility designer",
  "WCAG 2.1 AA",
  "Healthcare UX",
  "NEMT",
  "Shopify app design",
  "AI-assisted product design",
  "Product designer Bucharest",
  "Remote product designer Europe",
];

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();