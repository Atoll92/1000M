"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * One shared transport for the homepage hero, so toggling IMAGE ⇄ SON keeps
 * the play position conceptually aligned. The active medium (video or audio)
 * registers a `seek` handler and reports progress/time; the scrubbers read the
 * normalized progress and call `seekTo`.
 */
interface TransportValue {
  progress: number; // 0..1
  time: number; // seconds
  duration: number; // seconds
  playing: boolean;
  /** live audio amplitude 0..1, written by the playing <Waveform> each
   *  frame (a ref so visualisers can read it without re-renders) */
  levelRef: React.RefObject<number>;
  report: (p: { progress: number; time: number; duration: number }) => void;
  setPlaying: (b: boolean) => void;
  registerSeek: (fn: (ratio: number) => void) => void;
  seekTo: (ratio: number) => void;
}

const Ctx = createContext<TransportValue | null>(null);

export const useTransport = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTransport must be used within <TransportProvider>");
  return v;
};

/** Non-throwing variant for components that may render outside a provider. */
export const useTransportOptional = () => useContext(Ctx);

export function TransportProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const seekRef = useRef<(ratio: number) => void>(() => {});
  const levelRef = useRef(0);

  const report = useCallback(
    (p: { progress: number; time: number; duration: number }) => {
      setProgress(p.progress);
      setTime(p.time);
      setDuration(p.duration);
    },
    [],
  );

  const registerSeek = useCallback((fn: (ratio: number) => void) => {
    seekRef.current = fn;
  }, []);

  const seekTo = useCallback((ratio: number) => {
    seekRef.current(Math.max(0, Math.min(1, ratio)));
  }, []);

  const value = useMemo(
    () => ({ progress, time, duration, playing, levelRef, report, setPlaying, registerSeek, seekTo }),
    [progress, time, duration, playing, report, registerSeek, seekTo],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** mm:ss helper shared by transports */
export const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
