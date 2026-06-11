export type Mode = "image" | "son";
export type RoleCategory = "image" | "son" | "both";

export interface Role {
  id: string;
  label: string; // "Chef opérateur"
  labelEn?: string; // "Director of Photography"
  category: RoleCategory;
}

export interface Member {
  slug: string;
  name: string;
  roles: string[]; // Role ids
  portrait: string; // /equipe/xxx.jpg in /public (demo uses remote stills)
  bio: string; // FR
  bioEn?: string;
  skills: string[]; // ["Steadicam", "Arri Alexa", "Étalonnage"]
  reel?: string; // optional video url
  order: number;
  /** false → credited on projects but not listed on the Équipe page */
  listed?: boolean;
}

export interface ProjectCredit {
  memberSlug: string;
  roleId: string;
}

export interface Project {
  slug: string;
  title: string;
  client?: string;
  year: string;
  category: RoleCategory;
  poster: string;
  video?: string; // mp4 for now
  audio?: string; // mp3/wav for SON projects
  audioTitle?: string; // label shown in the waveform transport
  audioStartAt?: number; // seconds, where playback starts when you press play
  peaks?: number[]; // precomputed, normalized 0..1 (see scripts/peaks.mjs)
  runtime?: string; // "04:12"
  gear?: string; // "Shot on Arri Alexa Mini"
  credits: ProjectCredit[];
  description: string;
  link?: string; // external project page
  linkLabel?: string; // CTA label (defaults to "En savoir plus")
  featured?: boolean;
  order: number;
}
