"use client";

import { useMode } from "./ModeContext";
import { VideoMedia } from "./VideoMedia";
import { Waveform } from "./Waveform";

export interface SonTrack {
  src: string;
  peaks: number[];
  title?: string;
  startAt?: number;
}

/**
 * Full-bleed hero that cross-fades with MODE:
 *   IMAGE → looping muted showreel (poster-first, transport-bound)
 *   SON   → the optical track: a Web-Audio waveform printed like the
 *           soundtrack in the margin of a 35mm print, doubling as seek bar
 * Both layers stay mounted so toggling is an opacity cross-fade, not a remount.
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

  return (
    <div className="absolute inset-0">
      {/* IMAGE layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isImage ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isImage}
      >
        <VideoMedia
          src={video}
          poster={poster}
          active={isImage}
          bindTransport
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/40 mix-blend-multiply" />
      </div>

      {/* SON layer — the track sits in the upper field, clear of the manifesto */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-ink px-[var(--margin-page)] pb-[26vh] transition-opacity duration-700 ${
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
            className="max-w-4xl"
          />
        )}
      </div>
    </div>
  );
}
