import type { SchemaTypeDefinition } from "sanity";

import { role } from "./role";
import { member } from "./member";
import { project } from "./project";
import { studio } from "./studio";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  project,
  member,
  role,
  // singletons
  siteSettings,
  homePage,
  studio,
];

export const schema = { types: schemaTypes };
