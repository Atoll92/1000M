import type { Role } from "./types";

export const roles: Role[] = [
  { id: "cadreur", label: "Cadreur", labelEn: "Camera Operator", category: "image" },
  { id: "chefop", label: "Chef opérateur", labelEn: "Director of Photography", category: "image" },
  { id: "ingeson", label: "Ingénieur du son", labelEn: "Sound Engineer", category: "son" },
  { id: "perchman", label: "Perchman", labelEn: "Boom Operator", category: "son" },
  { id: "compositeur", label: "Compositeur", labelEn: "Composer", category: "son" },
  { id: "monteur", label: "Monteur", labelEn: "Editor", category: "both" },
  { id: "etalonneur", label: "Étalonneur", labelEn: "Colorist", category: "image" },
];

export const roleById = (id: string) => roles.find((r) => r.id === id);
