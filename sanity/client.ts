import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // CDN in prod; turn off when a read token is present for fresh drafts
  useCdn: !process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
  stega: false,
});
