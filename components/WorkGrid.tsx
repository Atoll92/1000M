"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { RailSection } from "./Rail";
import { useMode } from "./ModeContext";
import type { Project, RoleCategory } from "@/content/types";

type Filter = "all" | "image" | "son";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "image", label: "Image" },
  { key: "son", label: "Son" },
];

const matches = (cat: RoleCategory, f: Filter) =>
  f === "all" ? true : cat === f || cat === "both";

/* staggered editorial rhythm: wide plate + offset companion, alternating */
const slot = (i: number) => {
  switch (i % 4) {
    case 0:
      return { className: "md:col-span-7", wide: true };
    case 1:
      return { className: "md:col-span-5 md:mt-28", wide: false };
    case 2:
      return { className: "md:col-span-5", wide: false };
    default:
      return { className: "md:col-span-7 md:mt-28", wide: true };
  }
};

export function WorkGrid({ projects }: { projects: Project[] }) {
  const { mode } = useMode();
  const [filter, setFilter] = useState<Filter>("all");

  // the global MODE nudges the default filter; the user can still override
  useEffect(() => {
    setFilter(mode);
  }, [mode]);

  const shown = useMemo(
    () => projects.filter((p) => matches(p.category, filter)),
    [projects, filter],
  );

  return (
    <RailSection
      rail={
        <div className="flex flex-row flex-wrap items-baseline gap-x-6 gap-y-2 md:sticky md:top-32 md:flex-col md:items-stretch md:gap-3 md:pb-16">
          <p className="margin-note md:mb-2">Filtre</p>
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-cursor-label="Filtrer"
                aria-pressed={active}
                className={`flex items-baseline gap-2 text-left font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-paper" : "text-paper-dim hover:text-paper"
                }`}
              >
                <span
                  aria-hidden
                  className={`inline-block w-4 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                  style={{ color: "var(--accent)" }}
                >
                  —
                </span>
                {f.label}
              </button>
            );
          })}
          <p className="margin-note tabular-nums md:mt-8">
            {String(shown.length).padStart(2, "0")} projet
            {shown.length > 1 ? "s" : ""}
          </p>
        </div>
      }
      railClassName="pb-8 md:pb-0"
      bodyClassName="pb-8"
    >
      {shown.length === 0 ? (
        <p className="margin-note py-20">Aucun projet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-10 md:gap-y-24">
          {shown.map((p, i) => {
            const s = slot(i);
            return (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                num={projects.indexOf(p) + 1}
                wide={s.wide}
                className={s.className}
              />
            );
          })}
        </div>
      )}
    </RailSection>
  );
}
