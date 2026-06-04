export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * When no projectId is configured the site renders from local demo data
 * (see lib/demo.ts) so `npm run dev` works before Sanity is wired up.
 */
export const hasSanity = Boolean(projectId);

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/admin";
