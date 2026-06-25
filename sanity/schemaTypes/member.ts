import { defineType, defineField } from "sanity";

/** A crew member. Mirrors content/types.ts → Member. */
export const member = defineType({
  name: "member",
  title: "Membre",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "roles",
      title: "Métiers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "role" }] }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio (FR)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bioEn",
      title: "Bio (EN)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "skills",
      title: "Compétences",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "reelFile",
      title: "Showreel (fichier)",
      type: "file",
      options: { accept: "video/*" },
      description: "Vidéo mp4. Laisser vide pour n'afficher que le portrait.",
    }),
    defineField({
      name: "reelUrl",
      title: "Showreel (URL externe)",
      type: "url",
      description: "Alternative au fichier — utilisé si aucun fichier n'est fourni.",
    }),
    defineField({
      name: "listed",
      title: "Affiché sur la page Équipe",
      type: "boolean",
      description:
        "Décocher pour créditer ce membre sur les projets sans le lister sur la page Équipe.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre manuel",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "portrait" },
  },
});
