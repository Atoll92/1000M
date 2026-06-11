import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/TransitionLink";
import { VideoMedia } from "@/components/VideoMedia";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import {
  crew,
  crewSorted,
  memberBySlug,
  projectsForMember,
  roleLabel,
} from "@/content";

export function generateStaticParams() {
  return crew.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = memberBySlug(slug);
  if (!m) return {};
  return { title: m.name, description: `${m.name}, ${roleLabel(m)}` };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = memberBySlug(slug);
  if (!member) notFound();

  const sorted = crewSorted();
  const idx = sorted.findIndex((m) => m.slug === slug);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];
  const memberProjects = projectsForMember(slug);

  return (
    <>
      <main className="min-h-screen px-[var(--margin-page)] pb-28 pt-32">
        <TransitionLink href="/equipe" className="margin-note mb-8 inline-block hover:text-paper">
          ← Équipe
        </TransitionLink>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* portrait or reel */}
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
            <p className="margin-note" style={{ color: "var(--accent)" }}>
              {roleLabel(member)}
            </p>
            <h1
              className="display mt-3 text-[clamp(2.6rem,8vw,6rem)]"
              style={{ viewTransitionName: `member-${member.slug}` }}
            >
              {member.name}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/85">
              {member.bio}
            </p>

            {member.skills.length ? (
              <div className="mt-10">
                <p className="margin-note mb-3">Compétences</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-paper-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* projects with this member */}
        {memberProjects.length ? (
          <section className="mt-20 border-t border-hairline pt-10">
            <p className="margin-note mb-8">Projets</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {memberProjects.map((p) => (
                <li key={p.slug}>
                  <TransitionLink href={`/work/${p.slug}`} className="group block" data-cursor-label="Voir">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-ink">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.poster}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                      />
                    </div>
                    <p className="mt-2 font-display text-lg">{p.title}</p>
                    <p className="margin-note">{p.year}</p>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* prev / next member, filmstrip style */}
        <nav className="mt-20 grid grid-cols-2 gap-px border-t border-hairline">
          {[
            { m: prev, label: "← Précédent" },
            { m: next, label: "Suivant →" },
          ].map(({ m, label }, i) => (
            <TransitionLink
              key={m.slug}
              href={`/equipe/${m.slug}`}
              data-cursor-label="Voir"
              className={`group relative flex h-40 items-center gap-4 overflow-hidden bg-ink p-5 ${
                i === 1 ? "flex-row-reverse text-right" : ""
              }`}
            >
              <div className="h-28 w-20 shrink-0 overflow-hidden">
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
                <p className="display mt-1 text-2xl">{m.name}</p>
                <p className="margin-note mt-1">{roleLabel(m)}</p>
              </div>
            </TransitionLink>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
