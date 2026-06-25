import { defineType, defineField } from "sanity";

/**
 * A craft/métier. `roleId` is the stable key the rest of the content links
 * to (member.roles[], project credits) — it mirrors the `id` in
 * content/roles.ts, so the static data and the dataset stay interchangeable.
 */
export const role = defineType({
  name: "role",
  title: "Métier",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Intitulé (FR)",
      type: "string",
      description: "ex. Cadreur, Chef opérateur, Ingénieur du son, Perchman…",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "labelEn",
      title: "Intitulé (EN)",
      type: "string",
    }),
    defineField({
      name: "roleId",
      title: "Identifiant",
      type: "slug",
      description:
        "Clé stable référencée par les membres et les crédits (ex. chefop, ingeson). Ne pas changer une fois en place.",
      options: { source: "label", maxLength: 40 },
      validation: (r) => r.required(),
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
    select: { title: "label", subtitle: "category" },
  },
});
