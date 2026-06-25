import { defineType, defineField } from "sanity";

/**
 * Singleton — the editorial copy that isn't tied to a project or member:
 * the home manifesto, the SON heading, the contact lead and the footer CTA.
 * Mirrors content/copy.ts → home / contact / footer.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Page d'accueil & textes",
  type: "document",
  groups: [
    { name: "home", title: "Accueil", default: true },
    { name: "contact", title: "Contact" },
    { name: "footer", title: "Pied de page" },
  ],
  fields: [
    defineField({
      name: "manifestoLead",
      title: "Manifeste — ligne 1",
      type: "string",
      group: "home",
      description: "L'accent est rendu en couleur sur la 2e ligne.",
    }),
    defineField({
      name: "manifestoAccent",
      title: "Manifeste — ligne 2 (accent)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "manifestoSub",
      title: "Manifeste — sous-titre",
      type: "text",
      rows: 2,
      group: "home",
    }),
    defineField({
      name: "sonHeadingLead",
      title: "Titre Son — début",
      type: "string",
      group: "home",
      description: 'ex. "Écoutez".',
    }),
    defineField({
      name: "sonHeadingAccent",
      title: "Titre Son — accent",
      type: "string",
      group: "home",
      description: 'ex. "la marge.".',
    }),

    defineField({
      name: "contactKicker",
      title: "Contact — sur-titre",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactLeadA",
      title: "Contact — ligne 1",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactLeadB",
      title: "Contact — ligne 2",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactLeadAccent",
      title: "Contact — accent",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "footerCta",
      title: "Pied de page — accroche",
      type: "string",
      group: "footer",
      description: 'ex. "Parlons.".',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil & textes" }),
  },
});
