import type { Metadata } from "next";
import { CrewIndex } from "@/components/CrewIndex";
import { Footer } from "@/components/Footer";
import { RailSection } from "@/components/Rail";
import { getListedCrew } from "@/lib/source";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Les artisans de l’image et du son, cadreurs, chefs op, ingénieurs du son, compositeurs, monteurs, étalonneurs.",
};

export default async function EquipePage() {
  const members = await getListedCrew();

  return (
    <>
      <main className="min-h-screen pb-28 pt-32">
        <RailSection
          rail={
            <div className="flex flex-col gap-4">
              <p className="margin-note">
                Équipe, {members.length} artisans de l’image et du son
              </p>
              <p className="margin-note hover-hint max-w-[12rem] leading-relaxed opacity-70">
                Survolez un nom, le visage et le métier se révèlent.
              </p>
              <p className="margin-note max-w-[12rem] leading-relaxed opacity-70">
                Le mode IMAGE / SON met en avant le pôle concerné.
              </p>
            </div>
          }
          railClassName="pb-10 pt-2"
          bodyClassName="pb-10"
        >
          <CrewIndex members={members} />
        </RailSection>
      </main>
      <Footer />
    </>
  );
}
