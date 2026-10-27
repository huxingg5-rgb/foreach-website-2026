import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { ApplicationDocument } from "@/data/applications/analytical-documents/types";
import type { EnglishApplicationKind } from "@/data/applications/application-english";
import type { InstallationGuideLocale } from "@/data/resources/installation-guide/installation-guide.types";
import { isFittingOverviewVideo } from "@/data/resources/installation-guide/fitting-video-relations";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { withQuickDisconnectArticle } from "./quick-disconnect-resources";

type ApplicationContext = Pick<ApplicationDocument, "kind" | "slug" | "reviewContext">;

// Connection overviews belong to the industry overview and fluidic integration guides.
// Do not add them to unrelated pump, valve, detector or high-pressure LC task pages.
export function getApplicationFittingVideos(
  locale: InstallationGuideLocale,
  document: ApplicationContext,
) {
  const context = document.reviewContext;
  const relevant = document.kind === "hub"
    || ["fluidics", "fluidics-fittings", "guide-system-integration", "guide-lab-analyzer", "guide-bio-process-integration"].includes(document.slug)
    || (context?.family === "fluidics" && context.products.includes("fittings") && context.topic !== "gasPretreatment");
  return relevant ? getInstallationGuidePageData(locale).guides.filter(video => isFittingOverviewVideo(video.id)) : [];
}

/** Preserve curated products/readings and append the matching localized video components. */
export function withApplicationFittingResources(
  resources: RelatedResourcesData,
  kind: EnglishApplicationKind,
  document: ApplicationContext,
): RelatedResourcesData {
  const current = withQuickDisconnectArticle(resources, kind, document);
  const additions = getApplicationFittingVideos(current.locale, document)
    .filter(video => !current.videos.some(existing => existing.id === video.id));
  return additions.length ? { ...current, videos: [...current.videos, ...additions] } : current;
}
