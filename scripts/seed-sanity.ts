/**
 * Export the bundled /content data as Sanity NDJSON.
 *
 *   npm run seed:sanity                 # writes seed.ndjson
 *   npx sanity dataset import seed.ndjson production --replace
 *
 * Images and local audio under /public are uploaded by the importer via the
 * `_sanityAsset` shorthand; remote demo media stays as plain URLs. Document
 * _ids are deterministic (role.<id>, member.<slug>, project.<slug>) so a
 * re-import with --replace is idempotent. Run `node scripts/peaks.mjs` first
 * if you change any audio.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { roles } from "../content/roles";
import { crew } from "../content/crew";
import { projects } from "../content/projects";
import { site, home, studio, contact, footer } from "../content/copy";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "..", "public");

/** local /public path → file:// URL the importer can upload; remote → as-is */
const resolveSrc = (src: string) =>
  src.startsWith("http")
    ? src
    : pathToFileURL(resolve(PUBLIC, src.replace(/^\//, ""))).href;

const imageAsset = (src: string) => ({ _sanityAsset: `image@${resolveSrc(src)}` });
const fileAsset = (src: string) => ({ _sanityAsset: `file@${resolveSrc(src)}` });

/** local file → upload into <prefix>File; remote → <prefix>Url string */
function mediaFields(prefix: string, src?: string): Record<string, unknown> {
  if (!src) return {};
  return src.startsWith("http")
    ? { [`${prefix}Url`]: src }
    : { [`${prefix}File`]: fileAsset(src) };
}

const key = (s: string, i: number) => `${s}-${i}`;
const docs: Record<string, unknown>[] = [];

// ---- roles -----------------------------------------------------------------
for (const r of roles) {
  docs.push({
    _id: `role.${r.id}`,
    _type: "role",
    label: r.label,
    ...(r.labelEn ? { labelEn: r.labelEn } : {}),
    roleId: { _type: "slug", current: r.id },
    category: r.category,
  });
}

// ---- members ---------------------------------------------------------------
for (const m of crew) {
  docs.push({
    _id: `member.${m.slug}`,
    _type: "member",
    name: m.name,
    slug: { _type: "slug", current: m.slug },
    roles: m.roles.map((rid, i) => ({
      _type: "reference",
      _key: key(m.slug, i),
      _ref: `role.${rid}`,
    })),
    portrait: imageAsset(m.portrait),
    bio: m.bio,
    ...(m.bioEn ? { bioEn: m.bioEn } : {}),
    skills: m.skills,
    ...mediaFields("reel", m.reel),
    listed: m.listed !== false,
    order: m.order,
  });
}

// ---- projects --------------------------------------------------------------
for (const p of projects) {
  docs.push({
    _id: `project.${p.slug}`,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    ...(p.client ? { client: p.client } : {}),
    year: Number(p.year),
    category: p.category,
    poster: imageAsset(p.poster),
    ...mediaFields("video", p.video),
    ...mediaFields("audio", p.audio),
    ...(p.audioTitle ? { audioTitle: p.audioTitle } : {}),
    ...(p.audioStartAt != null ? { audioStartAt: p.audioStartAt } : {}),
    ...(p.peaks ? { peaks: p.peaks } : {}),
    ...(p.runtime ? { runtime: p.runtime } : {}),
    ...(p.gear ? { gear: p.gear } : {}),
    credits: p.credits.map((c, i) => ({
      _type: "credit",
      _key: key(p.slug, i),
      member: { _type: "reference", _ref: `member.${c.memberSlug}` },
      role: { _type: "reference", _ref: `role.${c.roleId}` },
    })),
    description: p.description,
    ...(p.link ? { link: p.link } : {}),
    ...(p.linkLabel ? { linkLabel: p.linkLabel } : {}),
    featured: !!p.featured,
    order: p.order,
  });
}

// ---- singletons ------------------------------------------------------------
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: site.title,
  tagline: site.tagline,
  base: site.base,
  email: site.email,
  accentImage: site.accent.image,
  accentSon: site.accent.son,
  socials: site.socials.map((s, i) => ({
    _type: "social",
    _key: key("social", i),
    label: s.label,
    url: s.url,
  })),
});

docs.push({
  _id: "homePage",
  _type: "homePage",
  manifestoLead: home.manifestoLead,
  manifestoAccent: home.manifestoAccent,
  manifestoSub: home.manifestoSub,
  sonHeadingLead: home.sonHeadingLead,
  sonHeadingAccent: home.sonHeadingAccent,
  contactKicker: contact.kicker,
  contactLeadA: contact.leadA,
  contactLeadB: contact.leadB,
  contactLeadAccent: contact.leadAccent,
  footerCta: footer.cta,
});

docs.push({
  _id: "studio",
  _type: "studio",
  kicker: studio.kicker,
  manifesto: studio.manifesto,
  philosophy: studio.philosophy.map((b, i) => ({
    _type: "philosophyBlock",
    _key: key("phil", i),
    heading: b.heading,
    body: b.body,
  })),
  services: studio.services.map((s, i) => ({
    _type: "service",
    _key: key("svc", i),
    title: s.title,
    body: s.body,
    category: s.category,
  })),
});

const out = resolve(__dirname, "..", "seed.ndjson");
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents → ${out}`);
