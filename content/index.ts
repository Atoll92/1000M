export * from "./types";
export { roles, roleById } from "./roles";
export { crew, memberBySlug } from "./crew";
export {
  projects,
  projectBySlug,
  projectsForMember,
  featuredProjects,
} from "./projects";
export * as copy from "./copy";

import { crew } from "./crew";
import { roleById } from "./roles";
import type { Member, RoleCategory } from "./types";

/** Resolve a member's Role objects (skipping unknown ids). */
export const rolesForMember = (m: Member) =>
  m.roles.map((id) => roleById(id)).filter((r): r is NonNullable<typeof r> => !!r);

/** Pretty "Chef opérateur · Cadreur" label. */
export const roleLabel = (m: Member) =>
  rolesForMember(m)
    .map((r) => r.label)
    .join(" · ");

/** Is this member emphasized in the given MODE? (image / son / both). */
export const memberInMode = (m: Member, mode: RoleCategory) =>
  rolesForMember(m).some((r) => r.category === mode || r.category === "both");

export const crewSorted = () => [...crew].sort((a, b) => a.order - b.order);
