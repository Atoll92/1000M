"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Anorak-style load animation: lines bleed in from blur→sharp with a
 * font-variation-settings weight sweep. Fully skipped under reduced-motion
 * (lines render final-state immediately).
 */
export function Manifesto({
  lead,
  accent,
  sub,
}: {
  lead: string;
  accent: string;
  sub: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-bleed]");
      gsap.set(lines, {
        opacity: 0,
        y: 28,
        filter: "blur(14px)",
        fontVariationSettings: '"wght" 200, "opsz" 48',
      });
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        fontVariationSettings: '"wght" 380, "opsz" 48',
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.15,
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="max-w-4xl">
      <h1 className="display text-[clamp(2.6rem,8vw,8rem)]">
        <span data-bleed className="block">
          {lead}
        </span>
        <span
          data-bleed
          className="block italic"
          style={{ color: "var(--accent)" }}
        >
          {accent}
        </span>
      </h1>
      <p data-bleed className="margin-note mt-6 max-w-md leading-relaxed">
        {sub}
      </p>
    </div>
  );
}
