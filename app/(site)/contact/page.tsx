import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Timecode } from "@/components/Timecode";
import { RailSection } from "@/components/Rail";
import { contact, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de votre projet, image, son, ou les deux.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-12 pt-32">
      <RailSection
        rail={
          <div className="flex h-full flex-col gap-8">
            <p className="margin-note">{contact.kicker}</p>

            <div>
              <p className="margin-note opacity-70">Base</p>
              <p className="mt-1 font-mono text-xs text-paper">{site.base}</p>
            </div>

            <div>
              <p className="margin-note opacity-70">Réseaux</p>
              <ul className="mt-1 space-y-1">
                {site.socials.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-paper transition-colors hover:text-[var(--accent)]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="margin-note opacity-70">Pôles</p>
              <p className="mt-1 font-mono text-xs text-paper">{site.tagline}</p>
            </div>

            <div>
              <p className="margin-note opacity-70">Session</p>
              <p className="mt-1">
                <Timecode className="text-paper" />
              </p>
            </div>
          </div>
        }
        railClassName="min-h-[60vh] pb-10 pt-2"
        bodyClassName="pb-10"
      >
        <Reveal>
          <h1 className="display text-[clamp(2.4rem,7vw,6rem)]">
            {contact.leadA}
            <br />
            {contact.leadB}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {" "}
              {contact.leadAccent}
            </span>
          </h1>
        </Reveal>

        <a
          href={`mailto:${site.email}`}
          data-cursor-label="Écrire"
          className="mt-12 inline-block font-mono text-lg tracking-wide text-paper underline decoration-hairline underline-offset-8 transition hover:decoration-[var(--accent)] md:text-xl"
        >
          {site.email}
        </a>
      </RailSection>
    </main>
  );
}
