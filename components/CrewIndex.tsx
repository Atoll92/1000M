"use client";

import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { useMode } from "./ModeContext";
import { memberInMode, roleLabel } from "@/content";
import type { Member } from "@/content/types";

/**
 * Anorak-manifesto index: all crew names as one large justified typographic
 * block. Hover/focus a name → it goes solid accent, the rest dim, a portrait
 * follows the cursor (eased), and a corner panel reveals roles + skills.
 * The global MODE emphasizes image- vs son-side crew. Reduced-motion users
 * get a plain accessible grid instead.
 */
export function CrewIndex({ members }: { members: Member[] }) {
  const { mode } = useMode();
  const [active, setActive] = useState<Member | null>(null);
  const [reduce, setReduce] = useState(false);

  const portrait = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // eased follow loop for the floating portrait
  useEffect(() => {
    if (reduce) return;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (portrait.current) {
        portrait.current.style.transform = `translate(${pos.current.x + 28}px, ${
          pos.current.y - 130
        }px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  /* ---- reduced-motion: accessible grid fallback ---- */
  if (reduce) {
    return (
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <li key={m.slug}>
            <TransitionLink href={`/equipe/${m.slug}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.portrait}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 font-display text-xl">{m.name}</p>
              <p className="margin-note">{roleLabel(m)}</p>
            </TransitionLink>
          </li>
        ))}
      </ul>
    );
  }

  /* ---- interactive manifesto ---- */
  return (
    <div onMouseMove={onMove}>
      {/* floating cursor-follow portrait */}
      <div
        ref={portrait}
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-48 overflow-hidden transition-opacity duration-300 md:block ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {active && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={active.portrait}
            alt=""
            className="h-full w-full object-cover grayscale [transition:filter_.4s] hover:grayscale-0"
          />
        )}
      </div>

      <h1 className="display text-[clamp(2rem,6vw,5.5rem)] leading-[1.08] [text-align:justify] [text-justify:inter-word]">
        {members.map((m) => {
          const isActive = active?.slug === m.slug;
          const someActive = active !== null;
          const dim = !memberInMode(m, mode);
          const opacity = isActive
            ? "opacity-100"
            : dim
              ? "opacity-20"
              : someActive
                ? "opacity-30"
                : "opacity-100";
          return (
            <span key={m.slug} className="inline">
              <TransitionLink
                href={`/equipe/${m.slug}`}
                onMouseEnter={() => setActive(m)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(m)}
                onBlur={() => setActive(null)}
                data-cursor-label="Voir"
                style={{ viewTransitionName: `member-${m.slug}` }}
                className={`sweep transition-[opacity,color] duration-300 ${opacity} ${
                  isActive ? "italic" : ""
                }`}
                {...(isActive ? { "data-active": true } : {})}
              >
                <span style={isActive ? { color: "var(--accent)" } : undefined}>
                  {m.name}
                </span>
              </TransitionLink>
              <span className="mx-3 align-middle font-mono text-[0.26em] uppercase tracking-[0.2em] text-paper-dim">
                {roleLabel(m)}
              </span>
            </span>
          );
        })}
      </h1>

      {/* corner panel, roles + skills of the active member */}
      <div
        className={`pointer-events-none fixed bottom-28 right-[var(--margin-page)] z-30 hidden w-64 border-t border-hairline pt-3 transition-opacity duration-300 md:block ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {active && (
          <>
            <p className="margin-note" style={{ color: "var(--accent)" }}>
              {roleLabel(active)}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {active.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-paper-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
