"use client";

import { fmt, useTransport } from "./TransportContext";

/**
 * IMAGE-mode transport: a thin filmstrip-style progress bar with the running
 * timecode. (In SON mode the <Waveform> is itself the scrubber.) Click to seek.
 */
export function MediaScrubber() {
  const { progress, time, duration, seekTo } = useTransport();

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo((e.clientX - rect.left) / rect.width);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] tabular-nums text-paper/80">
        {fmt(time)}
      </span>
      <div
        role="slider"
        tabIndex={0}
        aria-label="Barre de lecture du showreel"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        onClick={onSeek}
        data-cursor-label="Naviguer"
        className="group relative h-6 flex-1 cursor-pointer"
      >
        {/* sprocket ticks */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between opacity-30">
          {Array.from({ length: 41 }).map((_, i) => (
            <span key={i} className="h-1.5 w-px bg-paper" />
          ))}
        </div>
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-paper/25" />
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2"
          style={{ width: `${progress * 100}%`, background: "var(--accent)" }}
        />
        <div
          className="absolute top-1/2 h-3 w-px -translate-y-1/2"
          style={{ left: `${progress * 100}%`, background: "var(--accent)" }}
        />
      </div>
      <span className="font-mono text-[11px] tabular-nums text-paper-dim">
        {fmt(duration)}
      </span>
    </div>
  );
}
