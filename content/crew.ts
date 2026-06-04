import type { Member } from "./types";

/**
 * PLACEHOLDER crew — replace names, bios, skills and portraits with the real
 * people. Portraits currently point at remote stills so the demo renders;
 * swap each `portrait` for a local `/equipe/<slug>.jpg` in /public.
 */
const portrait = (seed: string) =>
  `https://picsum.photos/seed/${seed}/900/1200`;

export const crew: Member[] = [
  {
    slug: "camille-roussel",
    name: "Camille Roussel",
    roles: ["chefop", "cadreur"],
    portrait: portrait("crew-camille"),
    bio: "Chef opératrice et cadreuse. Quinze ans de plateau, de la fiction au documentaire. Cherche la lumière qui déborde — celle qui laisse une marge à l'accident.",
    bioEn: "Director of photography and camera operator. Fifteen years on set, from fiction to documentary.",
    skills: ["Arri Alexa 35", "Steadicam", "Lumière naturelle", "Anamorphique"],
    order: 1,
  },
  {
    slug: "idriss-benali",
    name: "Idriss Benali",
    roles: ["ingeson"],
    portrait: portrait("crew-idriss"),
    bio: "Ingénieur du son. Prise de son directe et mixage. Convaincu qu'un plan se joue autant à l'oreille qu'à l'œil.",
    skills: ["Prise de son directe", "Mixage 5.1 / Atmos", "Pro Tools", "Sound design"],
    order: 2,
  },
  {
    slug: "lou-marchetti",
    name: "Lou Marchetti",
    roles: ["cadreur", "monteur"],
    portrait: portrait("crew-lou"),
    bio: "Cadreur et monteur. Le cadre à l'épaule, le montage dans la foulée. Une grammaire continue, du tournage à la table.",
    skills: ["Cadre épaule", "Montage narratif", "DaVinci Resolve", "Repérage"],
    order: 3,
  },
  {
    slug: "salome-vidal",
    name: "Salomé Vidal",
    roles: ["compositeur"],
    portrait: portrait("crew-salome"),
    bio: "Compositrice. Musique à l'image, du quatuor au modulaire. Écrit à partir du silence du film.",
    skills: ["Composition", "Cordes", "Synthèse modulaire", "Ableton Live"],
    order: 4,
  },
  {
    slug: "theo-nguyen",
    name: "Théo Nguyen",
    roles: ["perchman"],
    portrait: portrait("crew-theo"),
    bio: "Perchman. La perche comme prolongement du regard. Discrétion absolue, présence totale.",
    skills: ["Perche", "HF", "Plateau", "Acoustique de lieu"],
    order: 5,
  },
  {
    slug: "margaux-lefevre",
    name: "Margaux Lefèvre",
    roles: ["etalonneur"],
    portrait: portrait("crew-margaux"),
    bio: "Étalonneuse. Le dernier geste sur l'image — celui qui décide de la température d'un souvenir.",
    skills: ["Étalonnage", "Look dev", "HDR", "Baselight"],
    order: 6,
  },
  {
    slug: "antoine-rivet",
    name: "Antoine Rivet",
    roles: ["monteur", "etalonneur"],
    portrait: portrait("crew-antoine"),
    bio: "Monteur et étalonneur. Pense le film comme un seul flux, du rush à la copie finale.",
    skills: ["Montage", "Étalonnage", "Conform", "Premiere Pro"],
    order: 7,
  },
  {
    slug: "nina-faure",
    name: "Nina Faure",
    roles: ["compositeur", "ingeson"],
    portrait: portrait("crew-nina"),
    bio: "Compositrice et ingénieure du son. Brouille volontiers la frontière entre musique et bruitage.",
    skills: ["Composition", "Field recording", "Mixage", "Max/MSP"],
    order: 8,
  },
];

export const memberBySlug = (slug: string) => crew.find((m) => m.slug === slug);
