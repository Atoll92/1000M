import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Timecode } from "@/components/Timecode";
import { contact, site } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de votre projet, image, son, ou les deux.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between px-[var(--margin-page)] pb-12 pt-32">
      <div>
        <p className="margin-note mb-8">{contact.kicker}</p>
        <Reveal>
          <h1 className="display text-[clamp(2.4rem,7vw,6rem)] leading-[0.95]">
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
          className="mt-10 inline-block font-mono text-xl tracking-wide text-paper underline decoration-hairline underline-offset-8 transition hover:decoration-[var(--accent)] hover:text-[var(--accent)]"
        >
          {site.email}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-hairline pt-8 md:grid-cols-4">
        <div>
          <p className="margin-note">Réseaux</p>
          <ul className="mt-2 space-y-1">
            {site.socials.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-paper hover:text-[var(--accent)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="margin-note">Base</p>
          <p className="mt-2 font-mono text-sm text-paper">{site.base}</p>
        </div>
        <div>
          <p className="margin-note">Heure locale</p>
          <p className="mt-2 font-mono text-sm text-paper">
            <Timecode />
          </p>
        </div>
        <div>
          <p className="margin-note">Pôles</p>
          <p className="mt-2 font-mono text-sm text-paper">{site.tagline}</p>
        </div>
      </div>
    </main>
  );
}
