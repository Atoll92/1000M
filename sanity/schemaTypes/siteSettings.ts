import { defineType, defineField } from "sanity";

/** Singleton — global identity & contact. Mirrors content/copy.ts → site. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Titre du site",
      type: "string",
      description:
        "Seul champ actuellement lu par le site en production (balise <title>). Le reste reste statique tant que le contenu n'est pas migré.",
      initialValue: "1000 marges",
    }),
    defineField({
      name: "tagline",
      title: "Accroche",
      type: "string",
      initialValue: "Image & Son",
    }),
    defineField({
      name: "base",
      title: "Localisation",
      type: "string",
      initialValue: "Marseille, FR",
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
    }),
    defineField({
      name: "showreelFile",
      title: "Showreel d'accueil (fichier)",
      type: "file",
      options: { accept: "video/*" },
      description: "Vidéo de fond de la page d'accueil.",
    }),
    defineField({
      name: "showreelUrl",
      title: "Showreel d'accueil (URL externe)",
      type: "url",
    }),
    defineField({
      name: "showreelPoster",
      title: "Poster du showreel (LCP)",
      type: "image",
      options: { hotspot: true },
      description: "Image chargée en premier — évite de plomber le LCP.",
    }),
    defineField({
      name: "accentImage",
      title: "Accent — Image",
      type: "string",
      initialValue: "#3b6dff",
      description: "Couleur hex de l'accent en mode Image.",
    }),
    defineField({
      name: "accentSon",
      title: "Accent — Son",
      type: "string",
      initialValue: "#ffae2b",
      description: "Couleur hex de l'accent en mode Son.",
    }),
    defineField({
      name: "socials",
      title: "Réseaux",
      type: "array",
      of: [
        defineField({
          name: "social",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Nom", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titre", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", title: "Image de partage", type: "image" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Réglages du site" }),
  },
});
