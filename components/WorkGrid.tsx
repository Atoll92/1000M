"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
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
    <div>
      <div className="mb-10 flex items-center gap-3 border-b border-hairline pb-4">
        <span className="margin-note mr-2">Filtre</span>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            data-cursor-label="Filtrer"
            className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition ${
              filter === f.key
                ? "border-transparent text-ink"
                : "border-hairline text-paper/60 hover:text-paper"
            }`}
            style={filter === f.key ? { background: "var(--accent)" } : undefined}
          >
            {f.label}
          </button>
        ))}
        <span className="margin-note ml-auto tabular-nums">
          {String(shown.length).padStart(2, "0")} projet
          {shown.length > 1 ? "s" : ""}
        </span>
      </div>

      {shown.length === 0 ? (
        <p className="margin-note py-20 text-center">Aucun projet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
          {shown.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              featured={!!p.featured && i % 3 === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
