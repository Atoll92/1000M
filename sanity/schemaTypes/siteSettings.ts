import { defineType, defineField } from "sanity";

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
        "Smoke-test phase 2 : seul champ lu par le site (balise <title>). Le reste du contenu est statique dans /content.",
      initialValue: "1000 marges",
    }),
    defineField({
      name: "showreel",
      title: "Showreel (accueil)",
      type: "muxVideo",
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
      name: "email",
      title: "Email de contact",
      type: "string",
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
