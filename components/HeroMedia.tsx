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
 *           negative and warped in real time by the playing audio
 *           (feTurbulence/feDisplacementMap driven by the analyser level) —
 *           image and son as one gesture.
 * Entering SON starts the track at its cue, riding the toggle's activation.
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

  const turb = useRef<SVGFETurbulenceElement>(null);
  const warp = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // real-time distortion: the displacement field breathes with the music.
  // Attribute writes are cheap; the displacement render is the cost, so the
  // loop only runs in SON mode and the turbulence drifts at low frequency.
  useEffect(() => {
    if (isImage || reduce) {
      warp.current?.setAttribute("scale", "0");
      return;
    }
    let raf = 0;
    let cur = 0;
    let frame = 0;
    const loop = (now: number) => {
      const lvl = transport?.levelRef.current ?? 0;
      const target = 12 + lvl * 140; // idle ripple → loud warp
      cur += (target - cur) * 0.1;
      warp.current?.setAttribute("scale", cur.toFixed(1));
      if (frame++ % 12 === 0) {
        const bf = 0.005 + Math.sin(now * 0.00011) * 0.0018 + lvl * 0.004;
        turb.current?.setAttribute(
          "baseFrequency",
          `${bf.toFixed(4)} ${(bf * 1.7).toFixed(4)}`,
        );
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isImage, reduce, transport]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* displacement field for the SON re-print */}
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <filter
            id="son-warp"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turb}
              type="fractalNoise"
              baseFrequency="0.005 0.0085"
              numOctaves="2"
              seed="7"
              result="n"
            />
            <feDisplacementMap
              ref={warp}
              in="SourceGraphic"
              in2="n"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* the one reel, both modes — never remounts, never pauses */}
      <div
        className="absolute inset-0 scale-[1.04]"
        style={{
          filter: isImage
            ? undefined
            : "url(#son-warp) invert(1) contrast(1.1) saturate(1.2) sepia(0.3) hue-rotate(-18deg)",
        }}
      >
        <VideoMedia
          src={video}
          poster={poster}
          active
          bindTransport
          transportActive={isImage}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-ink/40 mix-blend-multiply" />

      {/* SON layer — a thinner ink veil so the warped print reads through */}
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
