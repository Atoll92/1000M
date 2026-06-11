import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RailSection } from "@/components/Rail";
import { studio } from "@/content/copy";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "La philosophie « 1000 marges », l’image et le son pensés d’un même geste.",
};

const catLabel: Record<string, string> = {
  image: "Image",
  son: "Son",
  both: "Image · Son",
};

export default function StudioPage() {
  return (
    <>
      <main className="min-h-screen pb-28 pt-32">
        <RailSection
          rail={<p className="margin-note">{studio.kicker}</p>}
          railClassName="pb-12 pt-2"
          bodyClassName="pb-16"
        >
          <Reveal>
            <h1 className="display max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)]">
              {studio.manifesto}
            </h1>
          </Reveal>
        </RailSection>

        {/* the philosophy reads on paper — the margin of the dark print */}
        <div className="surface-paper">
          {studio.philosophy.map((block, i) => (
            <RailSection
              key={i}
              rail={
                <p className="margin-note tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
              }
              railClassName="pt-10 md:py-12"
              bodyClassName="pb-10 md:py-12"
            >
              <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-12">
                <h2 className="title text-2xl md:col-span-5 md:text-3xl">
                  {block.heading}
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-paper/85 md:col-span-7">
                  {block.body}
                </p>
              </Reveal>
            </RailSection>
          ))}
        </div>

        <RailSection
          rail={<p className="margin-note">Services</p>}
          railClassName="py-2 md:py-14"
          bodyClassName="pb-14 md:pt-12"
        >
          <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
            {studio.services.map((s, i) => (
              <div
                key={i}
                className="group relative bg-ink p-8 transition-colors"
              >
                <p
                  className="margin-note mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {catLabel[s.category]}
                </p>
                <h3 className="title text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-paper/75">
                  {s.body}
                </p>
                {/* annotation-ink tick, drawn on hover */}
                <span
                  className="absolute left-0 top-8 h-0 w-px transition-all duration-500 group-hover:h-12"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            ))}
          </div>
        </RailSection>
      </main>
      <Footer />
    </>
  );
}
