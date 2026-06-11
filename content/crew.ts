import type { Member } from "./types";

export const crew: Member[] = [
  {
    slug: "alexandre-krajewski",
    name: "Alexandre Krajewski",
    roles: ["realisateur", "chefop", "etalonneur"],
    portrait: "/equipe/alexandre-krajewski.jpg",
    bio: "Réalisateur et chef opérateur. Il mène le film du découpage à l'étalonnage, garant d'une cohérence visuelle de bout en bout.",
    skills: ["Réalisation", "Direction de la photographie", "Étalonnage", "Découpage"],
    order: 1,
  },
  {
    slug: "valentin-leverrier",
    name: "Valentin Leverrier",
    roles: ["ingeson", "preneurson", "compositeur"],
    portrait: "/equipe/valentin-leverrier.webp",
    bio: "Ingénieur du son et compositeur. De la prise de son directe au mixage final, il façonne la matière sonore comme une écriture.",
    skills: ["Prise de son directe", "Mixage", "Composition", "Pro Tools"],
    order: 2,
  },
  {
    slug: "damien-desmier",
    name: "Damien Desmier",
    roles: ["monteur", "cadreur"],
    portrait: "/equipe/damien-desmier.webp",
    bio: "Monteur et cadreur. Il pense le rythme dès le tournage, le cadre et le montage comme un seul mouvement.",
    skills: ["Montage", "Cadre", "DaVinci Resolve", "Découpage"],
    order: 3,
  },
  {
    slug: "arthur-boval",
    name: "Arthur Boval",
    roles: ["compositeur"],
    portrait: "/equipe/arthur-boval.jpg",
    bio: "Compositeur. Il écrit la musique à l'image et le design sonore, à la lisière entre la note et le bruit.",
    skills: ["Composition", "Sound design", "Synthèse modulaire", "Ableton Live"],
    order: 4,
  },
];

export const memberBySlug = (slug: string) => crew.find((m) => m.slug === slug);
