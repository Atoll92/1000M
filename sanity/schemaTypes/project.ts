import { defineType, defineField } from "sanity";

/** A piece of work. Mirrors content/types.ts → Project. */
export const project = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  groups: [
    { name: "main", title: "Général", default: true },
    { name: "media", title: "Média" },
    { name: "credits", title: "Crédits & texte" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "client", title: "Client", type: "string", group: "main" }),
    defineField({
      name: "year",
      title: "Année",
      type: "number",
      group: "main",
      validation: (r) => r.min(1990).max(2100),
    }),
    defineField({
      name: "category",
      title: "Pôle",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Son", value: "son" },
          { title: "Image & Son", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "runtime",
      title: "Durée",
      type: "string",
      group: "main",
      description: 'ex. "12:40" ou "3 min 20"',
    }),
    defineField({
      name: "gear",
      title: "Tourné sur / Matériel",
      type: "string",
      group: "main",
      description: 'ex. "Shot on ARRI Alexa 35 · Cooke S4", "Neumann U87 · Pro Tools"',
    }),
    defineField({
      name: "featured",
      title: "Mis en avant (accueil)",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      group: "main",
      initialValue: 0,
    }),

    // ---- media -----------------------------------------------------------
    defineField({
      name: "poster",
      title: "Affiche / Still",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoFile",
      title: "Vidéo (fichier)",
      type: "file",
      group: "media",
      options: { accept: "video/*" },
      description: "Projets Image : mp4 lu en fond / au survol.",
    }),
    defineField({
      name: "videoUrl",
      title: "Vidéo (URL externe)",
      type: "url",
      group: "media",
      description: "Alternative au fichier — utilisée si aucun fichier n'est fourni.",
    }),
    defineField({
      name: "audioFile",
      title: "Audio (fichier)",
      type: "file",
      group: "media",
      options: { accept: "audio/*" },
      description: "Projets Son : mp3/wav lu dans la forme d'onde.",
    }),
    defineField({
      name: "audioUrl",
      title: "Audio (URL externe)",
      type: "url",
      group: "media",
    }),
    defineField({
      name: "audioTitle",
      title: "Titre de la piste",
      type: "string",
      group: "media",
      description: "Libellé affiché dans le transport de la forme d'onde.",
    }),
    defineField({
      name: "audioStartAt",
      title: "Départ de lecture (secondes)",
      type: "number",
      group: "media",
      description: 'ex. 575 pour démarrer à 9:35.',
    }),
    defineField({
      name: "peaks",
      title: "Amplitudes (forme d'onde)",
      type: "array",
      group: "media",
      of: [{ type: "number" }],
      readOnly: true,
      description:
        "200 amplitudes normalisées 0–1, générées hors-ligne par scripts/peaks.mjs (ffmpeg). Ne pas saisir à la main.",
    }),

    // ---- credits & text --------------------------------------------------
    defineField({
      name: "credits",
      title: "Crédits",
      type: "array",
      group: "credits",
      of: [
        defineField({
          name: "credit",
          type: "object",
          fields: [
            defineField({
              name: "member",
              title: "Membre",
              type: "reference",
              to: [{ type: "member" }],
            }),
            defineField({
              name: "role",
              title: "Rôle sur le projet",
              type: "reference",
              to: [{ type: "role" }],
            }),
          ],
          preview: {
            select: { title: "member.name", subtitle: "role.label", media: "member.portrait" },
          },
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description (FR)",
      type: "text",
      group: "credits",
      rows: 5,
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (EN)",
      type: "text",
      group: "credits",
      rows: 5,
    }),
    defineField({
      name: "link",
      title: "Lien externe",
      type: "url",
      group: "credits",
      description: "Page du projet (ex. Villa Médicis).",
    }),
    defineField({
      name: "linkLabel",
      title: "Libellé du lien",
      type: "string",
      group: "credits",
      description: 'Défaut : "En savoir plus".',
    }),
  ],
  orderings: [
    { title: "Ordre manuel", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Année ↓", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "poster" },
  },
});
