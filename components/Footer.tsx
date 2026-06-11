import Link from "next/link";
import { Timecode } from "./Timecode";
import { site, footer } from "@/content/copy";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline px-[var(--margin-page)] py-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-[clamp(2rem,6vw,4.5rem)] leading-[0.9]">
            {footer.cta}
          </p>
          <a
            href={`mailto:${site.email}`}
            data-cursor-label="Écrire"
            className="mt-3 inline-block font-mono text-sm tracking-wide text-paper underline decoration-hairline underline-offset-4 hover:decoration-[var(--accent)]"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex gap-4">
            {site.socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="margin-note text-paper hover:text-[var(--accent)]"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Timecode className="text-paper-dim" />
            <Link href="/" className="margin-note text-paper-dim hover:text-paper">
              ↑ Haut de page
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-hairline pt-4">
        <span className="margin-note">© {new Date().getFullYear()} {site.title}</span>
        <span className="margin-note">
          {site.tagline}, {site.base}
        </span>
      </div>
    </footer>
  );
}
