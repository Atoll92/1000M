import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="margin-note">Erreur 404, hors-champ</p>
      <h1 className="display text-[clamp(3rem,12vw,9rem)]">
        Hors&nbsp;
        <span className="italic" style={{ color: "var(--accent)" }}>
          marges
        </span>
      </h1>
      <p className="max-w-sm text-paper/70">
        Cette page a débordé du cadre. Revenons au montage.
      </p>
      <Link
        href="/"
        className="margin-note border border-hairline px-5 py-2 hover:text-paper"
      >
        ← Accueil
      </Link>
    </main>
  );
}
