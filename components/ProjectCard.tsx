"use client";

import { useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { VideoMedia } from "./VideoMedia";
import type { Project } from "@/content/types";

const catLabel: Record<string, string> = {
  image: "Image",
  son: "Son",
  both: "Image · Son",
};

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const [hot, setHot] = useState(false);

  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      data-cursor-label={project.video ? "Lire" : "Voir"}
      className={`group relative block ${featured ? "md:col-span-2" : ""}`}
    >
      <div
        className="relative w-full overflow-hidden bg-ink"
        style={{ aspectRatio: featured ? "16 / 9" : "4 / 3" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.poster}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          style={{ viewTransitionName: `poster-${project.slug}` }}
          className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03] ${
            hot && project.video
              ? "opacity-0"
              : "opacity-100 grayscale group-hover:grayscale-0"
          }`}
        />
        {hot && project.video && (
          <div className="absolute inset-0">
            <VideoMedia
              src={project.video}
              poster={project.poster}
              active={hot}
              muted
              loop
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <span className="margin-note absolute left-3 top-3 text-paper mix-blend-difference">
          N°{String(index + 1).padStart(2, "0")}
        </span>
        {project.runtime && (
          <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-paper mix-blend-difference">
            {project.runtime}
          </span>
        )}
        <span
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl md:text-3xl">{project.title}</h3>
        <span className="margin-note shrink-0">
          {catLabel[project.category]} · {project.year}
        </span>
      </div>
      {project.client && <p className="margin-note mt-1">{project.client}</p>}
    </TransitionLink>
  );
}
