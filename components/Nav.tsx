"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  // close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-paper">
      {/* legibility scrim, keeps the nav readable over any hero media */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/30 to-transparent" />

      <div className="flex items-center justify-between px-[var(--margin-page)] py-5">
        {/* blocky monospace wordmark */}
        <Link
          href="/"
          data-cursor-label="Accueil"
          className="font-mono text-sm font-bold leading-none tracking-[0.3em] transition-opacity hover:opacity-70"
        >
          1000
          <span className="text-paper/40">&nbsp;/&nbsp;</span>
          MARGES
        </Link>

        {/* centre pill cluster (desktop) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-paper/15 bg-ink/40 p-1 backdrop-blur-md md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                data-cursor-label="Ouvrir"
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "bg-paper font-medium text-ink"
                    : "text-paper/75 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <Timecode className="text-paper/70" />
          </div>

          {/* IMAGE / SON toggle */}
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40 lg:inline">
              Mode
            </span>
            <div
              role="radiogroup"
              aria-label="Basculer entre image et son"
              className="flex items-center gap-1 rounded-full border border-paper/25 bg-ink/40 p-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md"
            >
              {(["image", "son"] as const).map((m) => (
                <button
                  key={m}
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  data-cursor-label={m === "image" ? "Voir" : "Écouter"}
                  className={`rounded-full px-3 py-1 font-medium transition ${
                    mode === m ? "" : "text-paper/55 hover:text-paper"
                  }`}
                  style={mode === m ? { color: "var(--accent)" } : undefined}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/25 bg-ink/40 backdrop-blur-md md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-paper transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-paper transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-paper transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile dropdown panel */}
      <nav
        className={`overflow-hidden border-t border-hairline bg-ink/90 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-[var(--margin-page)] py-2">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <li key={l.href} className="border-b border-hairline last:border-0">
                <Link
                  href={l.href}
                  className={`flex items-center justify-between py-4 font-display text-2xl ${
                    active ? "text-[var(--accent)]" : "text-paper"
                  }`}
                >
                  {l.label}
                  <span className="margin-note">↗</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
