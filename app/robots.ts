import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Everything is open: classic search, AI search (OAI-SearchBot, Claude-SearchBot,
 * PerplexityBot) and the user-triggered fetchers (ChatGPT-User, Claude-User).
 * Training crawlers (GPTBot, ClaudeBot, Google-Extended) are allowed too, so models
 * can learn who you are. To opt out of training only, uncomment the block below.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // { userAgent: ["GPTBot", "ClaudeBot", "Google-Extended"], disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
