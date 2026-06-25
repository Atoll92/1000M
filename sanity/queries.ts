import { groq } from "next-sanity";

/**
 * Every query is shaped so lib/source.ts maps the result almost 1:1 onto the
 * TS interfaces in content/types.ts. Asset references are resolved to plain
 * URLs here (asset->url) because the front-end renders plain <img>/<video>/
 * <audio> src strings — exactly like the static path strings it uses today.
 */

const projectFields = groq`
  "slug": slug.current,
  title,
  client,
  year,
  category,
  "poster": poster.asset->url,
  "video": coalesce(videoFile.asset->url, videoUrl),
  "audio": coalesce(audioFile.asset->url, audioUrl),
  audioTitle,
  audioStartAt,
  peaks,
  runtime,
  gear,
  description,
  descriptionEn,
  link,
  linkLabel,
  featured,
  order,
  "credits": credits[]{
    "memberSlug": member->slug.current,
    "roleId": role->roleId.current
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) { ${projectFields} }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, year desc) {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] { ${projectFields} }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;

const memberFields = groq`
  "slug": slug.current,
  name,
  "roles": roles[]->roleId.current,
  "portrait": portrait.asset->url,
  bio,
  bioEn,
  skills,
  "reel": coalesce(reelFile.asset->url, reelUrl),
  listed,
  order
`;

export const allMembersQuery = groq`
  *[_type == "member"] | order(order asc, name asc) { ${memberFields} }
`;

export const memberBySlugQuery = groq`
  *[_type == "member" && slug.current == $slug][0] { ${memberFields} }
`;

export const memberSlugsQuery = groq`
  *[_type == "member" && defined(slug.current)].slug.current
`;

export const rolesQuery = groq`
  *[_type == "role"] {
    "id": roleId.current,
    label,
    labelEn,
    category
  }
`;

export const studioQuery = groq`
  *[_type == "studio"][0] {
    kicker,
    manifesto,
    "philosophy": philosophy[]{ heading, body },
    "services": services[]{ title, body, category }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    manifestoLead, manifestoAccent, manifestoSub,
    sonHeadingLead, sonHeadingAccent,
    contactKicker, contactLeadA, contactLeadB, contactLeadAccent,
    footerCta
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    tagline,
    base,
    email,
    accentImage,
    accentSon,
    "socials": socials[]{ label, url },
    "showreel": coalesce(showreelFile.asset->url, showreelUrl),
    "showreelPoster": showreelPoster.asset->url,
    seo
  }
`;
