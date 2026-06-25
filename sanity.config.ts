"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure, isSingleton, singletonActions } from "./sanity/structure";

export default defineConfig({
  basePath: "/admin",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  document: {
    // singletons can't be created/deleted from the desk, only edited
    actions: (prev, ctx) => singletonActions(prev, ctx),
    newDocumentOptions: (prev) =>
      prev.filter((t) => !isSingleton(t.templateId)),
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  title: "1000 marges",
});
