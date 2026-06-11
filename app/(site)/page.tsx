import { HomeStage } from "@/components/HomeStage";
import { featuredProjects } from "@/content";
import { home } from "@/content/copy";

/** the homepage reel — local, looped, muted; poster paints first for LCP */
const HERO_VIDEO = "/video/0611.mp4";
const HERO_POSTER = "/video/0611-poster.jpg";

export default function HomePage() {
  const featured = featuredProjects();
  const sonProject = featured.find((p) => p.audio && p.peaks?.length);

  const son = sonProject
    ? {
        src: sonProject.audio!,
        peaks: sonProject.peaks!,
        title: sonProject.audioTitle,
        startAt: sonProject.audioStartAt,
      }
    : undefined;

  return (
    <HomeStage
      video={HERO_VIDEO}
      poster={HERO_POSTER}
      son={son}
      featured={featured}
      copy={{
        lead: home.manifestoLead,
        accent: home.manifestoAccent,
        sub: home.manifestoSub,
        sonHeading: {
          lead: home.sonHeadingLead,
          accent: home.sonHeadingAccent,
        },
      }}
    />
  );
}
