import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/TransitionLink";
import { VideoMedia } from "@/components/VideoMedia";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RailSection } from "@/components/Rail";
import { roleLabel } from "@/content";
import {
  getMemberSlugs,
  getMemberBySlug,
  getListedCrew,
  getProjectsForMember,
} from "@/lib/source";

export async function generateStaticParams() {
  return (await getMemberSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = await getMemberBySlug(slug);
  if (!m) return {};
  return { title: m.name, description: `${m.name}, ${roleLabel(m)}` };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  const sorted = await getListedCrew();
  const idx = sorted.findIndex((m) => m.slug === slug);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];
  const memberProjects = await getProjectsForMember(slug);

  return (
    <>
      <main className="min-h-screen pb-28 pt-32">
        {/* identity — roles & skills annotated in the rail */}
        <RailSection
          rail={
            <div className="flex flex-col gap-6">
              <TransitionLink
                href="/equipe"
                className="margin-note inline-block hover:text-paper"
              >
                ← Équipe
              </TransitionLink>
              <p className="margin-note" style={{ color: "var(--accent)" }}>
                {roleLabel(member)}
              </p>
              {/* on mobile the skills read below the portrait & bio instead */}
              {member.skills.length ? (
                <div className="hidden md:block">
                  <p className="margin-note mb-2 opacity-70">Compétences</p>
                  <ul className="space-y-1">
                    {member.skills.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          }
          railClassName="pb-10 pt-2"
          bodyClassName="pb-16"
        >
          <h1
            className="display text-[clamp(2.6rem,7vw,5.5rem)]"
            style={{ viewTransitionName: `member-${member.slug}` }}
          >
            {member.name}
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="aspect-[3/4] w-full overflow-hidden bg-ink">
                {member.reel ? (
                  <VideoMedia
                    src={member.reel}
                    poster={member.portrait}
                    controls
                    muted={false}
                    autoPlay={false}
                    loop={false}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.portrait}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </Reveal>

            <div className="md:col-span-7">
              <p className="max-w-xl text-lg leading-relaxed text-paper/85">
                {member.bio}
              </p>
            </div>
          </div>

          {/* mobile-only: compétences follow the portrait & bio */}
          {member.skills.length ? (
            <div className="mt-10 md:hidden">
              <p className="margin-note mb-2 opacity-70">Compétences</p>
              <ul className="space-y-1">
                {member.skills.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-dim"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </RailSection>

        {/* projects with this member */}
        {memberProjects.length ? (
          <RailSection
            rail={<p className="margin-note">Projets</p>}
            railClassName="py-2 md:py-12"
            bodyClassName="pb-12 md:pt-10"
          >
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
              {memberProjects.map((p) => (
                <li key={p.slug}>
                  <TransitionLink
                    href={`/work/${p.slug}`}
                    className="group block"
                    data-cursor-label="Voir"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-ink">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.poster}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                      />
                    </div>
                    <p className="title mt-2 text-lg">{p.title}</p>
                    <p className="margin-note">{p.year}</p>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </RailSection>
        ) : null}

        {/* prev / next member */}
        <RailSection
          rail={<p className="margin-note">Aussi dans l’équipe</p>}
          railClassName="py-2 md:py-12"
          bodyClassName="pb-4 md:pt-10"
        >
          <nav className="grid grid-cols-1 gap-px border-y border-hairline sm:grid-cols-2">
            {[
              { m: prev, label: "← Précédent" },
              { m: next, label: "Suivant →" },
            ].map(({ m, label }, i) => (
              <TransitionLink
                key={m.slug}
                href={`/equipe/${m.slug}`}
                data-cursor-label="Voir"
                className={`group relative flex h-36 items-center gap-4 overflow-hidden bg-ink p-5 ${
                  i === 1 ? "sm:flex-row-reverse sm:text-right" : ""
                }`}
              >
                <div className="h-24 w-18 shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.portrait}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div>
                  <p className="margin-note">{label}</p>
                  <p className="title mt-1 text-xl">{m.name}</p>
                  <p className="margin-note mt-1">{roleLabel(m)}</p>
                </div>
              </TransitionLink>
            ))}
          </nav>
        </RailSection>
      </main>
      <Footer />
    </>
  );
}
