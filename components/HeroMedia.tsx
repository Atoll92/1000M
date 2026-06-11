"use client";

import { useEffect, useRef, useState } from "react";
import { useMode } from "./ModeContext";
import { useTransportOptional } from "./TransportContext";
import { VideoMedia } from "./VideoMedia";
import { Waveform } from "./Waveform";

export interface SonTrack {
  src: string;
  peaks: number[];
  title?: string;
  startAt?: number;
}

/**
 * Full-bleed hero. ONE background video runs through both modes — it never
 * pauses on a toggle, and neither does the music once it has started:
 *   IMAGE → the reel, plain, owning the shared transport scrubber
 *   SON   → the same reel seen through a thinner ink veil, re-printed in
 *           negative and pulsed by the playing audio.
 * The reactivity is compositor-only on purpose (color-matrix filter,
 * transform, opacity — see .son-reel in globals.css): the analyser level is
 * written to a CSS var at ~11 Hz and CSS transitions smooth in between.
 * No SVG displacement — fullscreen feDisplacementMap is software-rendered
 * and burns CPU. Entering SON starts the track at its cue, riding the
 * toggle's activation.
 */
export function HeroMedia({
  video,
  poster,
  son,
  sonHeading,
}: {
  video?: string;
  poster?: string;
  son?: SonTrack;
  sonHeading?: { lead: string; accent: string };
}) {
  const { mode } = useMode();
  const isImage = mode === "image";
  const transport = useTransportOptional();
  const [reduce, setReduce] = useState(false);
  const reel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // feed the live level into --lvl at low frequency; CSS does the easing.
  // Writes are skipped while the value is static so an idle SON hero
  // costs nothing.
  useEffect(() => {
    const el = reel.current;
    if (!el || isImage || reduce) {
      reel.current?.style.setProperty("--lvl", "0");
      return;
    }
    let id = 0;
    let last = -1;
    const tick = () => {
      const raw = transport?.levelRef.current ?? 0;
      const lvl = Math.min(1, raw * 1.7); // make peaks actually land
      if (Math.abs(lvl - last) > 0.012) {
        el.style.setProperty("--lvl", lvl.toFixed(3));
        last = lvl;
      }
      id = window.setTimeout(tick, 90);
    };
    tick();
    return () => clearTimeout(id);
  }, [isImage, reduce, transport]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* the one reel, both modes — never remounts, never pauses */}
      <div ref={reel} className={`son-reel absolute inset-0 ${isImage ? "" : "is-on"}`}>
        <div className="son-drift absolute inset-0">
          <div className="son-reel-media absolute inset-0">
            <VideoMedia
              src={video}
              poster={poster}
              active
              bindTransport
              transportActive={isImage}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* accent flare, breathes with the music (opacity = compositor) */}
        <div className="son-flare absolute inset-0" aria-hidden />
      </div>
      <div className="absolute inset-0 bg-ink/40 mix-blend-multiply" />

      {/* SON layer — a thinner ink veil so the re-printed reel reads through */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-ink/70 px-[var(--margin-page)] pb-[26vh] transition-opacity duration-700 ${
          isImage ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={isImage}
      >
        {sonHeading && (
          <p className="display mb-10 text-center text-[clamp(1.8rem,4.5vw,3.2rem)]">
            {sonHeading.lead}{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {sonHeading.accent}
            </span>
          </p>
        )}
        {son && (
          <Waveform
            src={son.src}
            peaks={son.peaks}
            title={son.title}
            startAt={son.startAt}
            height={180}
            active={!isImage}
            autoPlayOnActive
            className="max-w-4xl"
          />
        )}
      </div>
    </div>
  );
}
