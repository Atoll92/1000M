"use client";

import { useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { VideoMedia } from "./VideoMedia";
import type { Project } from "@/content/types";

/** Bottom thumbnail strip. Hover promotes the still to an inline preview. */
export function Filmstrip({ items }: { items: Project[] }) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="flex h-full gap-px overflow-x-auto">
      {items.map((it) => {
        const isHot = hover === it.slug;
        return (
          <TransitionLink
            key={it.slug}
            href={`/work/${it.slug}`}
            onMouseEnter={() => setHover(it.slug)}
            onMouseLeave={() => setHover(null)}
            data-cursor-label="Voir"
            className="group relative h-full w-44 shrink-0 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.poster}
              alt={it.title}
              loading="lazy"
              style={{ viewTransitionName: isHot ? `poster-${it.slug}` : undefined }}
              className={`h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 ${
                isHot && it.video ? "opacity-0" : "opacity-100"
              }`}
            />
            {isHot && it.video && (
              <div className="absolute inset-0">
                <VideoMedia
                  src={it.video}
                  poster={it.poster}
                  active={isHot}
                  muted
                  loop
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-0 transition group-hover:opacity-100">
              <span className="margin-note text-paper">{it.year}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper">
                {it.title}
              </span>
            </div>
            <span
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: "var(--accent)" }}
            />
          </TransitionLink>
        );
      })}
    </div>
  );
}
