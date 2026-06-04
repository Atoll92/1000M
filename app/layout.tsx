import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { ModeProvider } from "@/components/ModeContext";
import { getSiteTitle } from "@/sanity/siteTitle";
import { site } from "@/content/copy";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  // gated Sanity smoke-test; falls back to the static title
  const title = await getSiteTitle();
  const description =
    "Société de production — image et son. Cadreurs, ingénieurs du son, chefs op, compositeurs.";
  return {
    title: { default: `${title} — ${site.tagline}`, template: `%s — ${title}` },
    description,
    metadataBase: new URL("https://1000marges.fr"),
    openGraph: { title, description, locale: "fr_FR", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteTitle = await getSiteTitle();

  return (
    <html lang="fr" className={`${bricolage.variable} ${geistMono.variable}`}>
      <body data-site-title={siteTitle}>
        <ModeProvider
          accentImage={site.accent.image}
          accentSon={site.accent.son}
        >
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
