"use client";

import { useEffect, useRef, useState } from "react";
import { useTransportOptional } from "./TransportContext";

/**
 * Plain <video> (phase 2 uses mp4, not Mux). Poster paints first so the reel
 * never blocks LCP; the video is lazy + muted-autoplay by default. When
 * `bindTransport` is set it reports progress to / takes seeks from the shared
 * transport so position survives an IMAGE ⇄ SON toggle.
 */
export function VideoMedia({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  active = true,
  bindTransport = false,
  transportActive,
  className = "",
}: {
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  active?: boolean;
  bindTransport?: boolean;
  /** owns the shared transport (seek + reporting); defaults to `active`.
   *  Lets a background video keep PLAYING while the waveform narrates. */
  transportActive?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [failed, setFailed] = useState(false);

  // transport is optional, null when rendered outside the hero provider
  const transport = useTransportOptional();

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && autoPlay && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [active, autoPlay, reduce]);

  const tActive = transportActive ?? active;

  useEffect(() => {
    // only the active medium owns the shared seek handler
    if (!bindTransport || !transport || !tActive) return;
    transport.registerSeek((ratio) => {
      const v = ref.current;
      if (v && v.duration) v.currentTime = ratio * v.duration;
    });
  }, [bindTransport, transport, tActive]);

  // no source, or the source failed to load → show the still, never the
  // browser's broken-video chrome
  if (!src || failed) {
    return poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="" className={className} />
    ) : null;
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay={autoPlay && active && !reduce}
      loop={loop}
      muted={muted}
      playsInline
      controls={controls}
      preload={controls ? "metadata" : "none"}
      src={src}
      onError={() => setFailed(true)}
      onTimeUpdate={
        bindTransport && transport && tActive
          ? (e) => {
              const v = e.currentTarget;
              transport.report({
                progress: v.currentTime / (v.duration || 1),
                time: v.currentTime,
                duration: v.duration || 0,
              });
            }
          : undefined
      }
    />
  );
}
