"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMode } from "./ModeContext";
import { Timecode } from "./Timecode";

const links = [
  { href: "/work", label: "Travaux" },
  { href: "/equipe", label: "Équipe" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const { mode, setMode } = useMode();
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--margin-page)] py-5 mix-blend-difference text-paper">
      {/* blocky monospace wordmark */}
      <Link
        href="/"
        className="font-mono text-sm font-bold leading-none tracking-[0.3em]"
      >
        1000
        <span className="text-paper-dim">&nbsp;/&nbsp;</span>
        MARGES
      </Link>

      {/* centre pill cluster */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-paper/20 p-1 backdrop-blur md:flex">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="hot"
              className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                active
                  ? "bg-paper text-ink"
                  : "text-paper hover:bg-paper hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-5">
        <Timecode className="hidden text-paper/70 sm:inline" />

        {/* IMAGE / SON toggle */}
        <div
          role="radiogroup"
          aria-label="Basculer entre image et son"
          className="flex items-center gap-1 rounded-full border border-paper/30 p-1 text-[10px] uppercase tracking-[0.2em]"
        >
          {(["image", "son"] as const).map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              data-cursor="hot"
              className={`rounded-full px-3 py-1 transition ${
                mode === m
                  ? "text-ink"
                  : "text-paper/50 hover:text-paper"
              }`}
              style={mode === m ? { background: "var(--accent)" } : undefined}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
