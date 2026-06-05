import type { Project } from "./types";
import { peaks } from "./peaks.generated";

/* Demo media: Google sample clips (video), SoundHelix (audio, CORS-enabled),
   picsum (stills). Replace with real assets in /public. */
const VID = (n: string) =>
  `https://storage.googleapis.com/gtv-videos-bucket/sample/${n}.mp4`;
const SONG = (n: number) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;
const POSTER = (seed: string) => `https://picsum.photos/seed/${seed}/1600/1000`;

export const projects: Project[] = [
  {
    slug: "lignes-de-fuite",
    title: "Lignes de fuite",
    client: "ARTE",
    year: "2025",
    category: "image",
    poster: POSTER("marges-fuite"),
    video: VID("ForBiggerJoyrides"),
    runtime: "14:20",
    gear: "Shot on Arri Alexa 35 · Cooke S4/i",
    credits: [
      { memberSlug: "camille-roussel", roleId: "chefop" },
      { memberSlug: "lou-marchetti", roleId: "cadreur" },
      { memberSlug: "margaux-lefevre", roleId: "etalonneur" },
    ],
    description:
      "Un court-métrage tourné en anamorphique sur trois nuits. L'image et le son captés ensemble, au plus près du grain de la ville.",
    featured: true,
    order: 1,
  },
  {
    slug: "20-pierres",
    title: "20 pierres",
    client: "Création",
    year: "2024",
    category: "son",
    poster: POSTER("marges-basse"),
    audio: "/audio/20-pierres.mp3",
    audioTitle: "20 pierres",
    audioStartAt: 575, // commence à 9:35
    peaks: peaks["20-pierres"],
    runtime: "13:14",
    gear: "Prise de son directe · mixage",
    credits: [
      { memberSlug: "idriss-benali", roleId: "ingeson" },
      { memberSlug: "salome-vidal", roleId: "compositeur" },
    ],
    description:
      "Pièce sonore. À l'écoute, la lecture démarre sur le passage à 9:35 — le cœur du morceau.",
    featured: true,
    order: 2,
  },
  {
    slug: "hors-champ",
    title: "Hors-champ",
    client: "CNC",
    year: "2024",
    category: "both",
    poster: POSTER("marges-horschamp"),
    video: VID("ForBiggerBlazes"),
    audio: SONG(2),
    audioTitle: "Hors-champ — bande son",
    peaks: peaks["hors-champ"],
    runtime: "26:00",
    gear: "Sony VENICE · Sound Devices 833",
    credits: [
      { memberSlug: "lou-marchetti", roleId: "monteur" },
      { memberSlug: "theo-nguyen", roleId: "perchman" },
      { memberSlug: "salome-vidal", roleId: "compositeur" },
      { memberSlug: "nina-faure", roleId: "ingeson" },
    ],
    description:
      "Documentaire où le son précède toujours l'image. Ce qui déborde du cadre y est le vrai sujet.",
    featured: true,
    order: 3,
  },
  {
    slug: "regie-nuit",
    title: "Régie nuit",
    client: "Boiler Room",
    year: "2024",
    category: "son",
    poster: POSTER("marges-regie"),
    audio: SONG(3),
    audioTitle: "Régie nuit — live",
    peaks: peaks["regie-nuit"],
    runtime: "58:12",
    gear: "DiGiCo SD12 · captation 32 pistes",
    credits: [
      { memberSlug: "idriss-benali", roleId: "ingeson" },
      { memberSlug: "nina-faure", roleId: "compositeur" },
    ],
    description:
      "Captation live d'une nuit entière. Mixée au petit matin, dans la fatigue qui aiguise l'oreille.",
    order: 4,
  },
  {
    slug: "plan-sequence",
    title: "Plan-séquence",
    client: "Gaumont",
    year: "2023",
    category: "image",
    poster: POSTER("marges-plan"),
    video: VID("ForBiggerMeltdowns"),
    runtime: "09:30",
    gear: "Shot on RED V-Raptor · DJI Ronin 2",
    credits: [
      { memberSlug: "camille-roussel", roleId: "chefop" },
      { memberSlug: "antoine-rivet", roleId: "monteur" },
    ],
    description:
      "Neuf minutes, une seule prise. La chorégraphie de la caméra et des corps répétée vingt nuits durant.",
    featured: true,
    order: 5,
  },
  {
    slug: "marge-brute",
    title: "Marge brute",
    client: "Indépendant",
    year: "2023",
    category: "both",
    poster: POSTER("marges-brute"),
    video: VID("ForBiggerEscapes"),
    audio: SONG(4),
    audioTitle: "Marge brute — thème",
    peaks: peaks["marge-brute"],
    runtime: "07:05",
    gear: "Blackmagic URSA · Schoeps CMC",
    credits: [
      { memberSlug: "lou-marchetti", roleId: "cadreur" },
      { memberSlug: "nina-faure", roleId: "compositeur" },
      { memberSlug: "antoine-rivet", roleId: "etalonneur" },
    ],
    description:
      "Auto-production. Tout le monde à tous les postes — la marge comme méthode plutôt que comme contrainte.",
    order: 6,
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsForMember = (memberSlug: string) =>
  projects.filter((p) => p.credits.some((c) => c.memberSlug === memberSlug));

export const featuredProjects = () => projects.filter((p) => p.featured);
