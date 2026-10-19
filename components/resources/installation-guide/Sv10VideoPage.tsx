import VideoGuideDetailPage from "./VideoGuideDetailPage";
import { getVideoGuideDetail } from "@/data/resources/installation-guide/video-guide-details.en";

export default function Sv10VideoPage() {
  const video = getVideoGuideDetail("en", "sv10-solenoid-valve-overview")!;
  return <VideoGuideDetailPage video={video} />;
}
