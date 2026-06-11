import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RailSection } from "@/components/Rail";
import { projects } from "@/content";

export const metadata: Metadata = {
  title: "Travaux",
  description: "Films, clips, documentaires, captations, image et son.",
};

export default function WorkPage() {
  return (
    <>
      <main className="min-h-screen pb-28 pt-32">
        <RailSection
          rail={<p className="margin-note">Travaux, sélection</p>}
          railClassName="pb-10 pt-2"
          bodyClassName="pb-14"
        >
          <Reveal>
            <h1 className="display text-[clamp(2.6rem,8vw,7rem)]">Travaux</h1>
          </Reveal>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/75">
            Une sélection, l’image et le son traités d’un même geste.
            <span className="hover-hint"> Survolez pour prévisualiser.</span>
          </p>
        </RailSection>

        <WorkGrid projects={projects} />
      </main>
      <Footer />
    </>
  );
}
