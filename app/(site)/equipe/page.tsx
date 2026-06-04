import type { Metadata } from "next";
import { CrewIndex } from "@/components/CrewIndex";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { crewSorted } from "@/content";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Les artisans de l’image et du son — cadreurs, chefs op, ingénieurs du son, compositeurs, monteurs, étalonneurs.",
};

export default function EquipePage() {
  const members = crewSorted();

  return (
    <>
      <main className="min-h-screen px-[var(--margin-page)] pb-28 pt-32">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="margin-note mb-4">
              Équipe — {members.length} artisans de l’image et du son
            </p>
          </Reveal>
          <p className="margin-note max-w-xs leading-relaxed">
            Survolez un nom — le visage, le métier et les compétences se
            révèlent. Le mode IMAGE / SON met en avant le pôle concerné.
          </p>
        </header>

        <CrewIndex members={members} />
      </main>
      <Footer />
    </>
  );
}
