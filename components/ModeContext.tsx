"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Mode } from "@/content/types";

interface ModeCtxValue {
  mode: Mode;
  accent: string;
  setMode: (m: Mode) => void;
  toggle: () => void;
}

const ModeCtx = createContext<ModeCtxValue>({
  mode: "image",
  accent: "#3b6dff",
  setMode: () => {},
  toggle: () => {},
});

export const useMode = () => useContext(ModeCtx);

const STORAGE_KEY = "marges-mode";

export function ModeProvider({
  children,
  accentImage = "#3b6dff",
  accentSon = "#ffae2b",
}: {
  children: ReactNode;
  accentImage?: string;
  accentSon?: string;
}) {
  const [mode, setModeState] = useState<Mode>("image");

  // restore persisted choice
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Mode | null;
    if (saved === "image" || saved === "son") setModeState(saved);
  }, []);

  const setMode = useCallback((m: Mode) => {
    const apply = () => setModeState(m);

    // the re-print: the page re-inks itself behind a left-to-right wipe
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => {
        finished: Promise<void>;
        ready: Promise<void>;
        updateCallbackDone: Promise<void>;
      };
    };
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (doc.startViewTransition && !reduce) {
      document.documentElement.classList.add("mode-reprint");
      const vt = doc.startViewTransition(apply);
      // aborted transitions (hidden tab, rapid toggling) are fine —
      // every promise of the transition must be marked handled
      vt.ready.catch(() => {});
      vt.updateCallbackDone.catch(() => {});
      vt.finished
        .finally(() =>
          document.documentElement.classList.remove("mode-reprint"),
        )
        .catch(() => {});
    } else {
      apply();
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* private mode, ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setMode(mode === "image" ? "son" : "image"),
    [mode, setMode],
  );

  const accent = mode === "image" ? accentImage : accentSon;

  // reflect mode on <html> for any CSS hooks + a11y
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const value = useMemo(
    () => ({ mode, accent, setMode, toggle }),
    [mode, accent, setMode, toggle],
  );

  return (
    <ModeCtx.Provider value={value}>
      <div style={{ "--accent": accent } as React.CSSProperties}>{children}</div>
    </ModeCtx.Provider>
  );
}
