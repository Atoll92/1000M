import "server-only";
import { client } from "./client";
import { hasSanity } from "./env";
import { site } from "@/content/copy";

/**
 * Phase-2 Sanity smoke-test: the ONLY content the running site reads from
 * Sanity. Gated behind NEXT_PUBLIC_SANITY_PROJECT_ID so the site builds and
 * runs fully static with no Sanity connection. Falls back to the static
 * title on any miss/error. Everything else lives in /content.
 */
export async function getSiteTitle(): Promise<string> {
  if (!hasSanity) return site.title;
  try {
    const title = await client.fetch<string | null>(
      `*[_type == "siteSettings"][0].siteTitle`,
    );
    return title || site.title;
  } catch {
    return site.title;
  }
}
