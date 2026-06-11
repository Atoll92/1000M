import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TransitionLink } from "@/components/TransitionLink";
import { VideoMedia } from "@/components/VideoMedia";
import { Waveform } from "@/components/Waveform";
import { TransportProvider } from "@/components/TransportContext";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RailSection } from "@/components/Rail";
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

  const num = String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");

  const meta: [string, string | undefined][] = [
    ["Client", project.client],
    ["Année", String(project.year)],
    ["Pôle", catLabel[project.category]],
    ["Durée", project.runtime],
  ];
  if (project.gear) {
    meta.push([
      project.gear.startsWith("Shot on") ? "Tourné sur" : "Matériel",
      project.gear,
    ]);
  }

  return (
    <>
      <main className="min-h-screen pb-28">
        {/* full-frame plate (shared element with the grid poster) */}
        <section
          className="relative h-[70vh] w-full overflow-hidden bg-ink"
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        </section>

        {/* title — annotated in the rail */}
        <RailSection
          rail={
            <div className="flex flex-row flex-wrap gap-x-6 gap-y-1 md:flex-col md:gap-2">
              <TransitionLink
                href="/work"
                className="margin-note inline-block hover:text-paper"
              >
                ← Travaux
              </TransitionLink>
              <p className="margin-note tabular-nums">N°{num}</p>
            </div>
          }
          railClassName="pt-3 md:pt-12"
          bodyClassName="pt-2 pb-12 md:pt-10"
        >
          <h1 className="display text-[clamp(2.6rem,8vw,6.5rem)]">
            {project.title}
          </h1>
        </RailSection>

        {/* the margin carries the data; the body carries the prose */}
        <RailSection
          rail={
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-1">
              {meta.map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <dt className="margin-note">{label}</dt>
                    <dd className="mt-1 font-mono text-xs text-paper">
                      {value}
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          }
          railClassName="py-2 md:py-14"
          bodyClassName="pb-14 md:pt-12"
        >
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-paper/85 md:text-xl">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="Ouvrir"
                className="mt-8 inline-block border-b border-hairline pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {project.linkLabel ?? "En savoir plus"} ↗
              </a>
            )}
          </Reveal>
        </RailSection>

        {/* SON projects: waveform listening transport */}
        {project.audio && project.peaks?.length ? (
          <RailSection
            rail={<p className="margin-note">Écoute</p>}
            railClassName="py-2 md:py-12"
            bodyClassName="pb-12 md:pt-10"
          >
            <TransportProvider>
              <Waveform
                src={project.audio}
                peaks={project.peaks}
                title={project.audioTitle ?? project.title}
                startAt={project.audioStartAt}
                height={140}
              />
            </TransportProvider>
          </RailSection>
        ) : null}

        {/* crew on this project */}
        {project.credits.length ? (
          <RailSection
            rail={<p className="margin-note">Équipe sur ce projet</p>}
            railClassName="py-2 md:py-12"
            bodyClassName="pb-12 md:pt-10"
          >
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {project.credits.map((c, i) => {
                const m = memberBySlug(c.memberSlug);
                const role = roleById(c.roleId);
                if (!m) return null;
                return (
                  <li key={i}>
                    <TransitionLink
                      href={`/equipe/${m.slug}`}
                      className="group block"
                      data-cursor-label="Voir"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-ink">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.portrait}
                          alt={m.name}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                        />
                      </div>
                      <p className="title mt-2 text-lg">{m.name}</p>
                      <p className="margin-note">{role?.label}</p>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </RailSection>
        ) : null}

        <RailSection rail={null} railClassName="md:py-2" bodyClassName="pt-4">
          <Link href="/work" className="margin-note hover:text-paper">
            ← Tous les travaux
          </Link>
        </RailSection>
      </main>
      <Footer />
    </>
  );
}
