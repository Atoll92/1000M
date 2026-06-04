import { defineType, defineField } from "sanity";

/**
 * Bilingual helpers — FR primary, EN optional.
 * Kept as simple two-field objects so the Studio stays approachable;
 * swap for @sanity/document-internationalization later if you need
 * per-language documents.
 */

export const localeString = defineType({
  name: "localeString",
  title: "Texte localisé",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "FR", type: "string" }),
    defineField({ name: "en", title: "EN", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Paragraphe localisé",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "FR", type: "text", rows: 3 }),
    defineField({ name: "en", title: "EN", type: "text", rows: 3 }),
  ],
});

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Contenu riche localisé",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "FR", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "en", title: "EN", type: "array", of: [{ type: "block" }] }),
  ],
});
