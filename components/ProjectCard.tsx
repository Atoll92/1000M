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

/**
 * A plate + its annotation. The poster stays clean (no overlaid data);
 * N°, pôle, année, durée live in a mono caption line under the image,
 * like a figure caption in the margin of a print.
 */
export function ProjectCard({
  project,
  index,
  num,
  wide = false,
  className = "",
}: {
  project: Project;
  /** position in the rendered grid (drives eager loading) */
  index: number;
  /** canonical project number, stable across filters */
  num: number;
  wide?: boolean;
  className?: string;
}) {
  const [hot, setHot] = useState(false);

  const caption = [
    `N°${String(num).padStart(2, "0")}`,
    catLabel[project.category],
    project.year,
    project.runtime,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      data-cursor-label={project.video ? "Lire" : "Voir"}
      className={`group relative block ${className}`}
    >
      <div
        className="relative w-full overflow-hidden bg-ink"
        style={{ aspectRatio: wide ? "16 / 9" : "4 / 3" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.poster}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          style={{ viewTransitionName: `poster-${project.slug}` }}
          className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02] ${
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
        {/* annotation-ink underline, drawn on hover */}
        <span
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="mt-3">
        <p className="margin-note tabular-nums">{caption}</p>
        <h3 className="title mt-1 text-xl md:text-2xl">{project.title}</h3>
        {project.client && (
          <p className="margin-note mt-1 opacity-70">{project.client}</p>
        )}
      </div>
    </TransitionLink>
  );
}
