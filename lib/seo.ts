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
    "Product designer specialising in accessible healthcare transportation products: member portals, booking flows and the design systems behind them, built to WCAG 2.1 AA.",
  knowsAbout: [
    "Product design",
    "Accessibility",
    "WCAG 2.1 AA",
    "Design systems",
    "Design system governance",
    "Information architecture",
    "UX audits",
    "Non-emergency medical transportation (NEMT)",
    "Healthcare UX",
    "Webflow",
  ],
  sameAs: [
    "https://www.linkedin.com/in/oanagrigore",
    "https://dribbble.com/oelenagrigore",
    "https://medium.com/@oelenagrigore",
  ],
};

export const SITE_DESCRIPTION =
  "Oana Grigore is a Senior Product Designer in Bucharest designing accessible healthcare transportation products: Medicaid ride booking portals, state NEMT pages and the design systems that keep them WCAG 2.1 AA compliant.";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();