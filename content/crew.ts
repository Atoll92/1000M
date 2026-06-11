import type { Member } from "./types";

/**
 * Portraits point at remote stills so the demo renders — replace each
 * `portrait` with a local `/equipe/<slug>.jpg` in /public (real photos).
 */
const portrait = (seed: string) =>
  `https://picsum.photos/seed/${seed}/900/1200`;

export const crew: Member[] = [
  {
    slug: "alexandre-krajewski",
    name: "Alexandre Krajewski",
    roles: ["realisateur", "chefop", "etalonneur"],
    portrait: portrait("crew-alexandre"),
    bio: "Réalisateur et chef opérateur. Il mène le film du découpage à l'étalonnage, garant d'une cohérence visuelle de bout en bout.",
    skills: ["Réalisation", "Direction de la photographie", "Étalonnage", "Découpage"],
    order: 1,
  },
  {
    slug: "valentin-leverrier",
    name: "Valentin Leverrier",
    roles: ["ingeson", "preneurson", "compositeur"],
    portrait: portrait("crew-valentin"),
    bio: "Ingénieur du son et compositeur. De la prise de son directe au mixage final, il façonne la matière sonore comme une écriture.",
    skills: ["Prise de son directe", "Mixage", "Composition", "Pro Tools"],
    order: 2,
  },
  {
    slug: "damien-desmier",
    name: "Damien Desmier",
    roles: ["monteur", "cadreur"],
    portrait: portrait("crew-damien"),
    bio: "Monteur et cadreur. Il pense le rythme dès le tournage — le cadre et le montage comme un seul mouvement.",
    skills: ["Montage", "Cadre", "DaVinci Resolve", "Découpage"],
    order: 3,
  },
  {
    slug: "arthur-boval",
    name: "Arthur Boval",
    roles: ["compositeur"],
    portrait: portrait("crew-arthur"),
    bio: "Compositeur. Il écrit la musique à l'image et le design sonore, à la lisière entre la note et le bruit.",
    skills: ["Composition", "Sound design", "Synthèse modulaire", "Ableton Live"],
    order: 4,
  },

  /* — collaborateurs — */
  {
    slug: "camille-roussel",
    name: "Camille Roussel",
    roles: ["chefop", "cadreur"],
    portrait: portrait("crew-camille"),
    bio: "Chef opératrice et cadreuse. Quinze ans de plateau, de la fiction au documentaire. Elle cherche la lumière qui déborde — celle qui laisse une marge à l'accident.",
    bioEn: "Director of photography and camera operator. Fifteen years on set, from fiction to documentary.",
    skills: ["Arri Alexa 35", "Steadicam", "Lumière naturelle", "Anamorphique"],
    order: 5,
  },
  {
    slug: "idriss-benali",
    name: "Idriss Benali",
    roles: ["ingeson"],
    portrait: portrait("crew-idriss"),
    bio: "Ingénieur du son. Prise de son directe et mixage. Convaincu qu'un plan se joue autant à l'oreille qu'à l'œil.",
    skills: ["Prise de son directe", "Mixage 5.1 / Atmos", "Pro Tools", "Sound design"],
    order: 6,
  },
  {
    slug: "lou-marchetti",
    name: "Lou Marchetti",
    roles: ["cadreur", "monteur"],
    portrait: portrait("crew-lou"),
    bio: "Cadreur et monteur. Le cadre à l'épaule, le montage dans la foulée. Une grammaire continue, du tournage à la table.",
    skills: ["Cadre épaule", "Montage narratif", "DaVinci Resolve", "Repérage"],
    order: 7,
  },
  {
    slug: "salome-vidal",
    name: "Salomé Vidal",
    roles: ["compositeur"],
    portrait: portrait("crew-salome"),
    bio: "Compositrice. Musique à l'image, du quatuor au modulaire. Elle écrit à partir du silence du film.",
    skills: ["Composition", "Cordes", "Synthèse modulaire", "Ableton Live"],
    order: 8,
  },
  {
    slug: "theo-nguyen",
    name: "Théo Nguyen",
    roles: ["perchman"],
    portrait: portrait("crew-theo"),
    bio: "Perchman. La perche comme prolongement du regard. Discrétion absolue, présence totale.",
    skills: ["Perche", "HF", "Plateau", "Acoustique de lieu"],
    order: 9,
  },
  {
    slug: "margaux-lefevre",
    name: "Margaux Lefèvre",
    roles: ["etalonneur"],
    portrait: portrait("crew-margaux"),
    bio: "Étalonneuse. Le dernier geste sur l'image — celui qui décide de la température d'un souvenir.",
    skills: ["Étalonnage", "Look dev", "HDR", "Baselight"],
    order: 10,
  },
  {
    slug: "antoine-rivet",
    name: "Antoine Rivet",
    roles: ["monteur", "etalonneur"],
    portrait: portrait("crew-antoine"),
    bio: "Monteur et étalonneur. Il pense le film comme un seul flux, du rush à la copie finale.",
    skills: ["Montage", "Étalonnage", "Conform", "Premiere Pro"],
    order: 11,
  },
  {
    slug: "nina-faure",
    name: "Nina Faure",
    roles: ["compositeur", "ingeson"],
    portrait: portrait("crew-nina"),
    bio: "Compositrice et ingénieure du son. Elle brouille volontiers la frontière entre musique et bruitage.",
    skills: ["Composition", "Field recording", "Mixage", "Max/MSP"],
    order: 12,
  },
];

export const memberBySlug = (slug: string) => crew.find((m) => m.slug === slug);
