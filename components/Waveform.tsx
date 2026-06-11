"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fmt, useTransport } from "./TransportContext";

/**
 * Audio waveform that doubles as the seek bar (SON mode signature).
 * - draws a precomputed `peaks` array instantly (no decode-on-load)
 * - played portion fills with var(--accent), rest is muted grey
 * - click / drag anywhere to seek; hover shows a thin playhead
 * - while playing, a live AnalyserNode scales the bars by amplitude
 * - honors prefers-reduced-motion (static, no live animation, no autoplay)
 */
export function Waveform({
  src,
  peaks,
  title,
  height = 160,
  active = true,
  startAt = 0,
  className = "",
}: {
  src: string;
  peaks: number[];
  title?: string;
  height?: number;
  /** when false (e.g. hidden hero layer), don't claim the shared seek */
  active?: boolean;
  /** seconds, playback begins here the first time the user presses play */
  startAt?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const freq = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const raf = useRef(0);
  const level = useRef(0); // live amplitude 0..1
  const hasStarted = useRef(false); // has the user pressed play at least once

  const { progress, time, duration, playing, report, setPlaying, registerSeek } =
    useTransport();
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const accent = () =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#ffae2b";

  const draw = useCallback(
    (p: number) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      const w = c.clientWidth;
      const h = c.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (c.width !== w * dpr || c.height !== h * dpr) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const n = peaks.length;
      const bw = w / n;
      const rulerH = 14; // reserved strip under the track for the ruler
      const trackH = h - rulerH;
      const mid = trackH / 2;
      const acc = accent();
      const boost = 1 + level.current * 0.4; // live amplitude reaction

      // the optical track: a ruled baseline the sound is printed on
      ctx.fillStyle = "rgba(242,240,235,0.16)";
      ctx.fillRect(0, mid, w, 1);

      for (let i = 0; i < n; i++) {
        const played = i / n < p;
        const amp = Math.max(1.5, peaks[i] * (trackH * 0.46) * (played ? boost : 1));
        ctx.fillStyle = played ? acc : "rgba(242,240,235,0.26)";
        ctx.fillRect(i * bw + bw * 0.22, mid - amp, bw * 0.56, amp * 2);
      }

      // time ruler: minor tick / 15 s, major / 60 s
      if (duration > 0) {
        const px = (s: number) => (s / duration) * w;
        ctx.fillStyle = "rgba(242,240,235,0.3)";
        for (let s = 0; s <= duration; s += 15) {
          const major = s % 60 === 0;
          ctx.fillRect(px(s), h - (major ? 9 : 5), 1, major ? 9 : 5);
        }
        // the edit point — where the piece begins on first play
        if (startAt > 0) {
          const x = px(startAt);
          ctx.fillStyle = acc;
          ctx.fillRect(x, 0, 1, h);
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + 6, 0);
          ctx.lineTo(x, 7);
          ctx.closePath();
          ctx.fill();
        }
      }

      // playhead — printed in accent ink
      if (p > 0) {
        ctx.fillStyle = acc;
        ctx.fillRect(p * w, 0, 1, trackH);
      }

      // hover ghost
      if (hoverX != null) {
        ctx.fillStyle = "rgba(242,240,235,0.55)";
        ctx.fillRect(hoverX, 0, 1, trackH);
      }
    },
    [peaks, hoverX, duration, startAt],
  );

  // redraw on progress / hover / mode-accent changes
  useEffect(() => {
    draw(progress);
  }, [draw, progress]);

  // live animation loop while playing (skipped under reduced-motion)
  useEffect(() => {
    if (!playing || reduce) {
      cancelAnimationFrame(raf.current);
      level.current = 0;
      return;
    }
    const loop = () => {
      const a = analyser.current;
      const f = freq.current;
      if (a && f) {
        a.getByteFrequencyData(f);
        let sum = 0;
        for (let i = 0; i < f.length; i++) sum += f[i];
        level.current = sum / f.length / 255;
      }
      const au = audio.current;
      if (au && au.duration) draw(au.currentTime / au.duration);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, reduce, draw]);

  // register seek with the shared transport (only when this is the active medium)
  useEffect(() => {
    if (!active) return;
    registerSeek((ratio) => {
      const au = audio.current;
      if (au && au.duration) au.currentTime = ratio * au.duration;
      else report({ progress: ratio, time: 0, duration: 0 });
    });
  }, [active, registerSeek, report]);

  const ensureGraph = useCallback(() => {
    if (ctxRef.current || reduce) return;
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ac = new AC();
      const srcNode = ac.createMediaElementSource(audio.current!);
      const an = ac.createAnalyser();
      an.fftSize = 64;
      srcNode.connect(an);
      an.connect(ac.destination);
      ctxRef.current = ac;
      analyser.current = an;
      freq.current = new Uint8Array(new ArrayBuffer(an.frequencyBinCount));
    } catch {
      // cross-origin without CORS audio taints the graph, play still works,
      // we just skip live amplitude reactivity.
      analyser.current = null;
    }
  }, [reduce]);

  const toggle = async () => {
    const au = audio.current;
    if (!au) return;
    if (au.paused) {
      // first play jumps to the configured start offset (e.g. 9:35)
      if (!hasStarted.current && startAt > 0) {
        au.currentTime = startAt;
      }
      hasStarted.current = true;
      ensureGraph();
      await ctxRef.current?.resume();
      au.play().catch(() => {});
    } else {
      au.pause();
    }
  };

  const ratioFromEvent = (clientX: number) => {
    const rect = wrap.current!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const onSeek = (e: React.MouseEvent) => {
    const au = audio.current;
    const r = ratioFromEvent(e.clientX);
    if (au && au.duration) au.currentTime = r * au.duration;
  };

  // keyboard seek (←/→ 5s, space play/pause)
  const onKey = (e: React.KeyboardEvent) => {
    const au = audio.current;
    if (!au) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight") {
      au.currentTime = Math.min(au.duration || 0, au.currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      au.currentTime = Math.max(0, au.currentTime - 5);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={toggle}
          data-cursor-label={playing ? "Pause" : "Écouter"}
          aria-label={playing ? "Mettre en pause" : "Écouter la piste"}
          className="rounded-full border border-paper/30 px-5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition hover:bg-paper hover:text-ink"
        >
          {playing ? "❚❚ Pause" : "▶ Écouter"}
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-dim">
          {title}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-paper-dim">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>

      <div
        ref={wrap}
        role="slider"
        tabIndex={0}
        aria-label="Barre de lecture, cliquez pour naviguer dans la piste"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        onClick={onSeek}
        onKeyDown={onKey}
        onMouseMove={(e) => setHoverX(e.clientX - wrap.current!.getBoundingClientRect().left)}
        onMouseLeave={() => setHoverX(null)}
        data-cursor-label="Naviguer"
        className="relative w-full cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
        style={{ height }}
      >
        <canvas ref={canvas} className="h-full w-full" />
      </div>

      <audio
        ref={audio}
        src={src}
        crossOrigin="anonymous"
        preload="metadata"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          report({
            progress: a.currentTime / (a.duration || 1),
            time: a.currentTime,
            duration: a.duration || 0,
          });
        }}
        onLoadedMetadata={(e) => {
          const a = e.currentTarget;
          // pre-position the playhead at the start offset (display only)
          if (!hasStarted.current && startAt > 0 && a.duration) {
            a.currentTime = Math.min(startAt, a.duration);
          }
          const t = a.currentTime || 0;
          report({ progress: t / (a.duration || 1), time: t, duration: a.duration || 0 });
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
