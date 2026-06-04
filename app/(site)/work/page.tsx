import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content";

export const metadata: Metadata = {
  title: "Travaux",
  description: "Films, clips, documentaires, captations — image et son.",
};

export default function WorkPage() {
  return (
    <>
      <main className="min-h-screen px-[var(--margin-page)] pb-28 pt-32">
        <header className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-8">
          <Reveal>
            <h1 className="display text-[clamp(2.6rem,9vw,8rem)]">Travaux</h1>
          </Reveal>
          <p className="margin-note max-w-xs leading-relaxed">
            Une sélection — l’image et le son traités d’un même geste.
            Survolez pour prévisualiser.
          </p>
        </header>

        <WorkGrid projects={projects} />
      </main>
      <Footer />
    </>
  );
}
