import { groq } from "next-sanity";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  client,
  year,
  category,
  poster,
  video,
  "audioUrl": audio.asset->url,
  runtime,
  gear,
  featured,
  order
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, year desc) {
    ${projectFields}
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields},
    description,
    "credits": credits[]{
      "role": role->title,
      "member": member->{ name, "slug": slug.current, portrait }
    }
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

const memberFields = groq`
  _id,
  name,
  "slug": slug.current,
  portrait,
  skills,
  reel,
  order,
  "roles": roles[]->{ title, titleEn, category }
`;

export const allMembersQuery = groq`
  *[_type == "member"] | order(order asc, name asc) {
    ${memberFields}
  }
`;

export const memberBySlugQuery = groq`
  *[_type == "member" && slug.current == $slug][0] {
    ${memberFields},
    bio,
    "projects": *[_type == "project" && references(^._id)] | order(year desc) {
      title, "slug": slug.current, year, poster, category
    }
  }
`;

export const memberSlugsQuery = groq`
  *[_type == "member" && defined(slug.current)][].slug.current
`;

export const studioQuery = groq`
  *[_type == "studio"][0] {
    manifesto,
    philosophy,
    services
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    showreel,
    showreelPoster,
    accentImage,
    accentSon,
    email,
    socials,
    seo
  }
`;
