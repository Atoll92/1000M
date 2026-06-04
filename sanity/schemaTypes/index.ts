import type { SchemaTypeDefinition } from "sanity";

import { localeString, localeText, localeBlock } from "./locale";
import { muxVideo } from "./muxVideo";
import { role } from "./role";
import { member } from "./member";
import { project } from "./project";
import { studio } from "./studio";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  project,
  member,
  role,
  studio,
  siteSettings,
  // objects
  localeString,
  localeText,
  localeBlock,
  muxVideo,
];

export const schema = { types: schemaTypes };
