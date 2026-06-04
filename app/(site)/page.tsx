import { HomeStage } from "@/components/HomeStage";
import { featuredProjects } from "@/content";
import { home } from "@/content/copy";

export default function HomePage() {
  const featured = featuredProjects();
  const heroVideo = featured.find((p) => p.video) ?? featured[0];
  const sonProject = featured.find((p) => p.audio && p.peaks?.length);

  const son = sonProject
    ? {
        src: sonProject.audio!,
        peaks: sonProject.peaks!,
        title: sonProject.audioTitle,
      }
    : undefined;

  return (
    <HomeStage
      video={heroVideo?.video}
      poster={heroVideo?.poster}
      son={son}
      featured={featured}
      copy={{
        lead: home.manifestoLead,
        accent: home.manifestoAccent,
        sub: home.manifestoSub,
        sonHeading: home.sonHeading,
      }}
    />
  );
}
