import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import { getApplicationFittingVideos } from "@/services/applications/fitting-video-resources";

/** Server-rendered slot for the existing Chinese industry overview clients. */
export default function ApplicationFittingVideos() {
  const videos = getApplicationFittingVideos("zh-CN", { kind: "hub", slug: "" });
  return <RelatedResourcesLoader locale="zh-CN" videos={videos} products={[]} articles={[]} />;
}
