"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a lagging ring + immediate dot (mix-blend-difference) that
 * grows over interactive elements and shows a contextual label pulled from a
 * `data-cursor-label` attribute ("Voir", "Lire", "Écouter"…). No-ops on touch
 * / coarse pointers and under reduced-motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;

      const el = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor-label], [data-cursor='hot']",
      ) as HTMLElement | null;
      const hot = !!el;
      if (ring.current) ring.current.dataset.hot = hot ? "true" : "false";
      setLabel(el?.getAttribute("data-cursor-label") ?? "");
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (labelRef.current)
        labelRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className="cursor-ring" data-has-label={label ? "true" : "false"} aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
      <span ref={labelRef} className="cursor-label" aria-hidden>
        {label}
      </span>
    </>
  );
}
