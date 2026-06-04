import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";

/**
 * Site shell — everything except the embedded Studio (/admin) lives here.
 * Mounts the smooth-scroll engine, the cinematic overlays (grain + gate
 * vignette), the custom cursor and the fixed navigation.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell relative min-h-screen">
      <SmoothScroll />
      <Nav />
      {children}

      {/* cinematic overlays, mounted once, above content */}
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <Cursor />
    </div>
  );
}
