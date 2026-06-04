import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({
      name: "year",
      title: "Année",
      type: "number",
      validation: (r) => r.min(1990).max(2100),
    }),
    defineField({
      name: "category",
      title: "Pôle",
      type: "string",
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
      name: "poster",
      title: "Affiche / Still",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "video",
      title: "Vidéo (Mux)",
      type: "muxVideo",
      description: "Pour les projets Image.",
    }),
    defineField({
      name: "audio",
      title: "Fichier audio",
      type: "file",
      options: { accept: "audio/*" },
      description: "Pour les projets Son.",
    }),
    defineField({
      name: "credits",
      title: "Crédits",
      type: "array",
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
            select: { title: "member.name", subtitle: "role.title", media: "member.portrait" },
          },
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeBlock",
    }),
    defineField({
      name: "runtime",
      title: "Durée",
      type: "string",
      description: 'ex. "12:40" ou "3 min 20"',
    }),
    defineField({
      name: "gear",
      title: "Tourné sur / Matériel",
      type: "string",
      description: 'ex. "ARRI Alexa 35 · Cooke S4", "Neumann U87 · Pro Tools"',
    }),
    defineField({
      name: "featured",
      title: "Mis en avant (accueil)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
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
