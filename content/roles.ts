import type { Role } from "./types";

export const roles: Role[] = [
  { id: "realisateur", label: "Réalisateur", labelEn: "Director", category: "image" },
  { id: "chefop", label: "Chef opérateur", labelEn: "Director of Photography", category: "image" },
  { id: "cadreur", label: "Cadreur", labelEn: "Camera Operator", category: "image" },
  { id: "etalonneur", label: "Étalonneur", labelEn: "Colorist", category: "image" },
  { id: "monteur", label: "Monteur", labelEn: "Editor", category: "image" },
  { id: "ingeson", label: "Ingénieur du son", labelEn: "Sound Engineer", category: "son" },
  { id: "preneurson", label: "Preneur de son", labelEn: "Production Sound", category: "son" },
  { id: "perchman", label: "Perchman", labelEn: "Boom Operator", category: "son" },
  { id: "compositeur", label: "Compositeur", labelEn: "Composer", category: "son" },
];

export const roleById = (id: string) => roles.find((r) => r.id === id);
