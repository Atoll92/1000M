import type { StructureResolver } from "sanity/structure";

/* Singletons (studio + siteSettings) pinned at the top, lists below. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("1000 marges")
    .items([
      S.listItem()
        .title("Réglages du site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Studio — À propos")
        .id("studio")
        .child(S.document().schemaType("studio").documentId("studio")),
      S.divider(),
      S.documentTypeListItem("project").title("Projets"),
      S.documentTypeListItem("member").title("Membres"),
      S.documentTypeListItem("role").title("Métiers"),
    ]);
