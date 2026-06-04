"use client";

import { Filmstrip } from "./Filmstrip";
import type { Project } from "@/content/types";

/**
 * Featured-project filmstrip pinned to the bottom (both modes). The MODE
 * signature now lives in the hero (video ⇄ waveform), so this stays a stable
 * navigation rail with the "thousand margins" ruler ticks.
 */
export function BottomStrip({ items }: { items: Project[] }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-24 border-t border-hairline bg-ink/50 backdrop-blur-md">
      <div className="pointer-events-none absolute -top-px left-0 right-0 flex justify-between px-[var(--margin-page)] opacity-30">
        {Array.from({ length: 13 }).map((_, i) => (
          <span key={i} className="h-2 w-px bg-paper-dim" />
        ))}
      </div>
      <Filmstrip items={items} />
    </div>
  );
}
