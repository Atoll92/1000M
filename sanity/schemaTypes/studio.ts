import { defineType, defineField } from "sanity";

export const studio = defineType({
  name: "studio",
  title: "Studio (À propos)",
  type: "document",
  fields: [
    defineField({
      name: "manifesto",
      title: "Manifeste",
      type: "localeText",
      description: "La phrase d'accroche, façon manifeste.",
    }),
    defineField({
      name: "philosophy",
      title: "Philosophie",
      type: "array",
      of: [
        defineField({
          name: "block",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Titre", type: "localeString" }),
            defineField({ name: "body", title: "Texte", type: "localeText" }),
          ],
          preview: { select: { title: "heading.fr" } },
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
            defineField({ name: "title", title: "Service", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
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
              initialValue: "both",
            }),
          ],
          preview: { select: { title: "title.fr", subtitle: "category" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Studio — À propos" }),
  },
});
