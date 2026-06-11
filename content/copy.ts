/**
 * All site prose lives here so nothing is hardcoded inside components.
 * FR primary; add `*En` siblings when the EN pass happens.
 */

export const site = {
  /** hardcoded fallback for the gated Sanity siteTitle smoke-test */
  title: "1000 marges",
  tagline: "Image & Son",
  base: "Marseille, FR",
  email: "bonjour@1000marges.fr",
  /** accent per mode — consumed by <ModeProvider> */
  accent: { image: "#3b6dff", son: "#ffae2b" },
  socials: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Vimeo", url: "https://vimeo.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
  ],
};

export const home = {
  manifestoLead: "L’image et le son,",
  manifestoAccent: "sans marges.",
  manifestoSub:
    "Société de production — cadreurs, ingénieurs du son, chefs op, compositeurs, monteurs, étalonneurs.",
  sonHeading: "Écoutez la marge.",
};

export const studio = {
  kicker: "À propos — 1000 marges",
  manifesto:
    "Une société de production qui travaille les marges — celles de l’image et celles du son — comme un seul geste.",
  philosophy: [
    {
      heading: "Deux artisanats, une grammaire",
      body: "Nous ne séparons pas la caméra du micro. L’image et le son sont pensés ensemble, dès le repérage, jusqu’à l’étalonnage et le mixage final.",
    },
    {
      heading: "La marge comme méthode",
      body: "Ce qui déborde du cadre nous intéresse autant que ce qui s’y trouve. Nous cultivons l’écart, l’annotation, le hors-champ.",
    },
    {
      heading: "Petit collectif, grands formats",
      body: "Cadreurs, ingénieurs du son, compositeurs, monteurs, étalonneurs — un réseau resserré d’artisans qui se choisissent projet par projet.",
    },
  ],
  services: [
    { title: "Réalisation & cadre", body: "Court-métrage, clip, documentaire, captation.", category: "image" as const },
    { title: "Image & étalonnage", body: "Chef op, lumière, étalonnage look-dev.", category: "image" as const },
    { title: "Prise de son & mixage", body: "Son direct, post-production, mixage 5.1 / Atmos.", category: "son" as const },
    { title: "Composition originale", body: "Musique à l’image, sound design, habillage.", category: "son" as const },
  ],
};

export const contact = {
  kicker: "Contact — 1000 marges",
  leadA: "Un projet d’image,",
  leadB: "de son,",
  leadAccent: "ou les deux ?",
};

export const footer = {
  cta: "Parlons.",
};
