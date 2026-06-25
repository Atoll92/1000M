import { defineType, defineField } from "sanity";

/** Singleton — the À propos page. Mirrors content/copy.ts → studio. */
export const studio = defineType({
  name: "studio",
  title: "Studio (À propos)",
  type: "document",
  fields: [
    defineField({
      name: "kicker",
      title: "Sur-titre",
      type: "string",
      description: 'ex. "À propos, 1000 marges".',
    }),
    defineField({
      name: "manifesto",
      title: "Manifeste",
      type: "text",
      rows: 3,
      description: "La phrase d'accroche, façon manifeste.",
    }),
    defineField({
      name: "philosophy",
      title: "Philosophie",
      type: "array",
      of: [
        defineField({
          name: "philosophyBlock",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Titre", type: "string" }),
            defineField({ name: "body", title: "Texte", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineField({
          name: "service",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Service", type: "string" }),
            defineField({ name: "body", title: "Description", type: "text", rows: 2 }),
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
              },
              initialValue: "image",
            }),
          ],
          preview: { select: { title: "title", subtitle: "category" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Studio — À propos" }),
  },
});
