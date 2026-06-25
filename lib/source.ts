import "server-only";

import { hasSanity } from "@/sanity/env";
import { client } from "@/sanity/client";
import * as Q from "@/sanity/queries";

import { projects as staticProjects } from "@/content/projects";
import { crew as staticCrew } from "@/content/crew";
import type { Project, Member } from "@/content/types";

/**
 * The single data seam. Pages read content through these getters instead of
 * importing the static modules directly. Today every getter returns the
 * bundled /content data, so the site is 100% static and needs no Sanity
 * connection. The moment NEXT_PUBLIC_SANITY_PROJECT_ID is set (and the
 * dataset seeded — see scripts/seed-sanity.mjs), the same getters fetch from
 * Sanity instead, with no page changes.
 *
 * Scope of this phase: structured content (projects, members) flips through
 * here. The role taxonomy stays a static enum keyed by stable id (identical
 * in both backends), and the editorial copy in content/copy.ts is mirrored by
 * the Studio singletons but still read statically — see HANDOFF for the
 * trivial remaining wiring.
 */

/* ------------------------------------------------------------------ *
 *  mappers — Sanity result → the TS shapes in content/types.ts
 * ------------------------------------------------------------------ */

type Raw = Record<string, unknown>;
const str = (v: unknown): string | undefined =>
  v == null ? undefined : String(v);

function toProject(r: Raw): Project {
  return {
    slug: String(r.slug),
    title: String(r.title),
    client: str(r.client),
    year: String(r.year ?? ""),
    category: (r.category as Project["category"]) ?? "image",
    poster: String(r.poster ?? ""),
    video: str(r.video),
    audio: str(r.audio),
    audioTitle: str(r.audioTitle),
    audioStartAt: (r.audioStartAt as number | undefined) ?? undefined,
    peaks: (r.peaks as number[] | undefined) ?? undefined,
    runtime: str(r.runtime),
    gear: str(r.gear),
    credits: Array.isArray(r.credits)
      ? (r.credits as Raw[])
          .filter((c) => c.memberSlug && c.roleId)
          .map((c) => ({
            memberSlug: String(c.memberSlug),
            roleId: String(c.roleId),
          }))
      : [],
    description: String(r.description ?? ""),
    link: str(r.link),
    linkLabel: str(r.linkLabel),
    featured: Boolean(r.featured),
    order: (r.order as number | undefined) ?? 0,
  };
}

function toMember(r: Raw): Member {
  return {
    slug: String(r.slug),
    name: String(r.name),
    roles: Array.isArray(r.roles) ? (r.roles as string[]).filter(Boolean) : [],
    portrait: String(r.portrait ?? ""),
    bio: String(r.bio ?? ""),
    bioEn: str(r.bioEn),
    skills: Array.isArray(r.skills) ? (r.skills as string[]) : [],
    reel: str(r.reel),
    order: (r.order as number | undefined) ?? 0,
    listed: r.listed === false ? false : undefined,
  };
}

/* ------------------------------------------------------------------ *
 *  projects
 * ------------------------------------------------------------------ */

export async function getProjects(): Promise<Project[]> {
  if (!hasSanity) return staticProjects;
  const rows = await client.fetch<Raw[]>(Q.allProjectsQuery);
  return (rows ?? []).map(toProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!hasSanity) return staticProjects.filter((p) => p.featured);
  const rows = await client.fetch<Raw[]>(Q.featuredProjectsQuery);
  return (rows ?? []).map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!hasSanity) return staticProjects.find((p) => p.slug === slug) ?? null;
  const row = await client.fetch<Raw | null>(Q.projectBySlugQuery, { slug });
  return row ? toProject(row) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  if (!hasSanity) return staticProjects.map((p) => p.slug);
  return (await client.fetch<string[]>(Q.projectSlugsQuery)) ?? [];
}

export async function getProjectsForMember(slug: string): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.credits.some((c) => c.memberSlug === slug));
}

/* ------------------------------------------------------------------ *
 *  members — getAllMembers includes unlisted (for credits + params);
 *  getListedCrew is what the Équipe page renders.
 * ------------------------------------------------------------------ */

export async function getAllMembers(): Promise<Member[]> {
  if (!hasSanity) return staticCrew;
  const rows = await client.fetch<Raw[]>(Q.allMembersQuery);
  return (rows ?? []).map(toMember);
}

export async function getListedCrew(): Promise<Member[]> {
  const all = await getAllMembers();
  return all.filter((m) => m.listed !== false).sort((a, b) => a.order - b.order);
}

export async function getMemberBySlug(slug: string): Promise<Member | null> {
  if (!hasSanity) return staticCrew.find((m) => m.slug === slug) ?? null;
  const row = await client.fetch<Raw | null>(Q.memberBySlugQuery, { slug });
  return row ? toMember(row) : null;
}

export async function getMemberSlugs(): Promise<string[]> {
  if (!hasSanity) return staticCrew.map((m) => m.slug);
  return (await client.fetch<string[]>(Q.memberSlugsQuery)) ?? [];
}
