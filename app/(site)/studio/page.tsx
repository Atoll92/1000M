import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { studio } from "@/content/copy";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "La philosophie « 1000 marges » — l’image et le son pensés d’un même geste.",
};

const catLabel: Record<string, string> = {
  image: "Image",
  son: "Son",
  both: "Image · Son",
};

export default function StudioPage() {
  return (
    <>
      <main className="min-h-screen px-[var(--margin-page)] pb-28 pt-32">
        <header className="border-b border-hairline pb-10">
          <p className="margin-note mb-6">{studio.kicker}</p>
          <Reveal>
            <h1 className="display max-w-5xl text-[clamp(2rem,6vw,5rem)] leading-[1.02]">
              {studio.manifesto}
            </h1>
          </Reveal>
        </header>

        <section className="py-16">
          {studio.philosophy.map((block, i) => (
            <Reveal
              key={i}
              className="grid grid-cols-1 gap-6 border-b border-hairline py-12 md:grid-cols-12"
            >
              <span className="margin-note md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="display text-3xl md:col-span-4 md:text-4xl">
                {block.heading}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-paper/85 md:col-span-7">
                {block.body}
              </p>
            </Reveal>
          ))}
        </section>

        <section className="border-t border-hairline py-16">
          <p className="margin-note mb-10">Services</p>
          <div className="grid grid-cols-1 gap-px md:grid-cols-2">
            {studio.services.map((s, i) => (
              <div
                key={i}
                className="group relative border border-hairline p-8 transition-colors hover:border-transparent"
              >
                <span
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-10"
                  style={{ background: "var(--accent)" }}
                />
                <p className="margin-note mb-3" style={{ color: "var(--accent)" }}>
                  {catLabel[s.category]}
                </p>
                <h3 className="display text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-paper/75">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
