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
    setModeState(m);
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
