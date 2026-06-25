export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** Studio connection — needs only a projectId (the embedded /admin Studio). */
export const hasSanity = Boolean(projectId);

/**
 * Whether the *site* reads live from Sanity. Deliberately separate from
 * `hasSanity` so the Studio can be connected (projectId set) while the public
 * site keeps serving the bundled /content. Flip NEXT_PUBLIC_USE_SANITY=true
 * once the dataset is seeded and reviewed — lib/source.ts switches with no
 * other change.
 */
export const useSanity =
  hasSanity && process.env.NEXT_PUBLIC_USE_SANITY === "true";

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/admin";
