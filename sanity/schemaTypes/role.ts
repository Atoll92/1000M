import { defineType, defineField } from "sanity";

export const role = defineType({
  name: "role",
  title: "Métier",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Intitulé",
      type: "string",
      description: "ex. Cadreur, Chef opérateur, Ingénieur du son, Perchman…",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Intitulé (EN)",
      type: "string",
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
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
