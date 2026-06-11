"use client";

import { TransportProvider } from "./TransportContext";
import { HeroMedia, type SonTrack } from "./HeroMedia";
import { MediaScrubber } from "./MediaScrubber";
import { BottomStrip } from "./BottomStrip";
import { Manifesto } from "./Manifesto";
import { useMode } from "./ModeContext";
import type { Project } from "@/content/types";

export function HomeStage({
  video,
  poster,
  son,
  featured,
  copy,
}: {
  video?: string;
  poster?: string;
  son?: SonTrack;
  featured: Project[];
  copy: {
    lead: string;
    accent: string;
    sub: string;
    sonHeading: string;
  };
}) {
  return (
    <TransportProvider>
      <Stage video={video} poster={poster} son={son} featured={featured} copy={copy} />
    </TransportProvider>
  );
}

function Stage({
  video,
  poster,
  son,
  featured,
  copy,
}: {
  video?: string;
  poster?: string;
  son?: SonTrack;
  featured: Project[];
  copy: { lead: string; accent: string; sub: string; sonHeading: string };
}) {
  const { mode } = useMode();

  return (
    <>
      <main className="relative h-screen w-full overflow-hidden">
        <HeroMedia
          video={video}
          poster={poster}
          son={son}
          sonHeading={copy.sonHeading}
        />

        {/* manifesto */}
        <div className="absolute bottom-44 left-[var(--margin-page)] z-20">
          <Manifesto lead={copy.lead} accent={copy.accent} sub={copy.sub} />
        </div>

        {/* IMAGE-mode transport sits just above the filmstrip */}
        {mode === "image" && (
          <div className="absolute bottom-28 left-[var(--margin-page)] right-[var(--margin-page)] z-20 hidden md:block">
            <MediaScrubber />
          </div>
        )}
      </main>

      <BottomStrip items={featured} />
    </>
  );
}
