import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TransitionLink } from "@/components/TransitionLink";
import { VideoMedia } from "@/components/VideoMedia";
import { Waveform } from "@/components/Waveform";
import { TransportProvider } from "@/components/TransportContext";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects, projectBySlug, memberBySlug, roleById } from "@/content";

const catLabel: Record<string, string> = {
  image: "Image",
  son: "Son",
  both: "Image · Son",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title}, ${p.client ?? ""} ${p.year}`.trim(),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <main className="min-h-screen pb-28">
        {/* full-frame hero media (shared element with the grid poster) */}
        <section
          className="relative h-[78vh] w-full overflow-hidden bg-ink"
          style={{ viewTransitionName: `poster-${project.slug}` }}
        >
          {project.video ? (
            <VideoMedia
              src={project.video}
              poster={project.poster}
              controls
              muted={false}
              autoPlay={false}
              loop={false}
              className="h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.poster}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
          <div className="absolute bottom-8 left-[var(--margin-page)] right-[var(--margin-page)]">
            <TransitionLink href="/work" className="margin-note mb-4 inline-block hover:text-paper">
              ← Travaux
            </TransitionLink>
            <h1 className="display text-[clamp(2.6rem,9vw,7rem)]">{project.title}</h1>
          </div>
        </section>

        {/* metadata */}
        <section className="grid grid-cols-1 gap-10 border-b border-hairline px-[var(--margin-page)] py-12 md:grid-cols-4">
          {[
            ["Client", project.client],
            ["Année", project.year],
            ["Pôle", catLabel[project.category]],
            ["Durée", project.runtime],
          ].map(([label, value]) =>
            value ? (
              <div key={label}>
                <p className="margin-note">{label}</p>
                <p className="mt-1 font-mono text-sm text-paper">{value}</p>
              </div>
            ) : null,
          )}
          {project.gear && (
            <div className="md:col-span-4">
              <p className="margin-note">{project.gear.startsWith("Shot on") ? "Tourné sur" : "Matériel"}</p>
              <p className="mt-1 font-mono text-sm text-paper">{project.gear}</p>
            </div>
          )}
        </section>

        {/* SON projects: waveform listening transport */}
        {project.audio && project.peaks?.length ? (
          <section className="border-b border-hairline px-[var(--margin-page)] py-12">
            <p className="margin-note mb-4">Écoute</p>
            <TransportProvider>
              <Waveform
                src={project.audio}
                peaks={project.peaks}
                title={project.audioTitle ?? project.title}
                startAt={project.audioStartAt}
                height={140}
              />
            </TransportProvider>
          </section>
        ) : null}

        {/* description */}
        <section className="px-[var(--margin-page)] py-16">
          <Reveal>
            <p className="max-w-2xl text-xl leading-relaxed text-paper/85">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="Ouvrir"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition hover:border-transparent hover:bg-[var(--accent)] hover:text-ink"
              >
                {project.linkLabel ?? "En savoir plus"} ↗
              </a>
            )}
          </Reveal>
        </section>

        {/* crew on this project */}
        {project.credits.length ? (
          <section className="border-t border-hairline px-[var(--margin-page)] py-16">
            <h2 className="margin-note mb-8">Équipe sur ce projet</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {project.credits.map((c, i) => {
                const m = memberBySlug(c.memberSlug);
                const role = roleById(c.roleId);
                if (!m) return null;
                return (
                  <li key={i}>
                    <TransitionLink href={`/equipe/${m.slug}`} className="group block" data-cursor-label="Voir">
                      <div className="aspect-[3/4] w-full overflow-hidden bg-ink">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.portrait}
                          alt={m.name}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                        />
                      </div>
                      <p className="mt-2 font-display text-lg">{m.name}</p>
                      <p className="margin-note">{role?.label}</p>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <div className="px-[var(--margin-page)]">
          <Link href="/work" className="margin-note hover:text-paper">
            ← Tous les travaux
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
