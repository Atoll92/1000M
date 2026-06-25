import type { StructureResolver } from "sanity/structure";
import type { DocumentActionComponent, DocumentActionsContext } from "sanity";

const SINGLETONS = ["siteSettings", "homePage", "studio"];
const KEEP_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

/* Singletons pinned at the top, document lists below. */
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
        .title("Page d'accueil & textes")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Studio — À propos")
        .id("studio")
        .child(S.document().schemaType("studio").documentId("studio")),
      S.divider(),
      S.documentTypeListItem("project").title("Projets"),
      S.documentTypeListItem("member").title("Membres"),
      S.documentTypeListItem("role").title("Métiers"),
    ]);

/** Singletons must not be duplicated or deleted from the desk. */
export const singletonActions = (
  prev: DocumentActionComponent[],
  { schemaType }: DocumentActionsContext,
): DocumentActionComponent[] =>
  SINGLETONS.includes(schemaType)
    ? prev.filter((a) => !!a.action && KEEP_ACTIONS.has(a.action))
    : prev;

export const isSingleton = (schemaType: string) => SINGLETONS.includes(schemaType);
