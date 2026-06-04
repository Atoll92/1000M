"use client";

import { useEffect, useRef, useState } from "react";

/**
 * UI-honesty running timecode (HH:MM:SS:FF @ 25fps), driven by a single
 * rAF loop so the frame counter actually moves. Counts up from mount.
 */
export function Timecode({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState("00:00:00:00");
  const start = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    const pad = (n: number) => String(n).padStart(2, "0");

    const tick = (now: number) => {
      if (start.current === null) start.current = now;
      const elapsed = (now - start.current) / 1000;
      const hh = pad(Math.floor(elapsed / 3600));
      const mm = pad(Math.floor((elapsed % 3600) / 60));
      const ss = pad(Math.floor(elapsed % 60));
      const ff = pad(Math.floor((elapsed * 25) % 25));
      setLabel(`${hh}:${mm}:${ss}:${ff}`);
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      // static, still "honest" but no per-frame churn
      setLabel("00:00:00:00");
      return;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span
      className={`font-mono text-[11px] tracking-[0.2em] tabular-nums ${className}`}
      aria-hidden
    >
      {label}
    </span>
  );
}
