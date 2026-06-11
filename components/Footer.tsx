import Link from "next/link";
import { Timecode } from "./Timecode";
import { RailSection } from "./Rail";
import { site, footer } from "@/content/copy";

/**
 * The site signs off on paper — the margin of the dark print. Same rail
 * grid as the pages above it; tokens re-ink via .surface-paper.
 */
export function Footer() {
  return (
    <footer className="surface-paper relative z-10">
      <RailSection
        rail={
          <div className="flex h-full flex-col justify-between gap-8">
            <p className="margin-note">Contact</p>
            <div className="space-y-1">
              <p className="margin-note">© {new Date().getFullYear()} {site.title}</p>
              <p className="margin-note">
                {site.tagline}, {site.base}
              </p>
            </div>
          </div>
        }
        railClassName="pb-10 pt-10 md:pt-14 md:pb-14"
        bodyClassName="pb-10 pt-2 md:pt-14 md:pb-14"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-[clamp(2rem,6vw,4.5rem)] text-paper">
              {footer.cta}
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor-label="Écrire"
              className="mt-4 inline-block font-mono text-sm tracking-wide text-paper underline decoration-hairline underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav className="flex gap-4">
              {site.socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="margin-note transition-colors hover:text-[var(--accent)]"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Timecode className="text-paper-dim" />
              <Link href="/" className="margin-note hover:text-paper">
                ↑ Haut de page
              </Link>
            </div>
          </div>
        </div>
      </RailSection>
    </footer>
  );
}
