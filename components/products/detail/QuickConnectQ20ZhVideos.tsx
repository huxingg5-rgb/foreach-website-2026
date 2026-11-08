import { getChannelVideoAdditions } from "@/data/resources/installation-guide/installation-guide.channel-additions";
import QuickConnectVideoShowcase, { type ShowcaseVideo } from "./QuickConnectVideoShowcase";

/**
 * Q2001 中文页「产品资料」结尾的演示视频区（参考 Keyto 产品页）：
 * 产品视频 = 快插接头实物演示；工厂视频 = 公司介绍（首页同一个本地 MP4，国内可直接播放）。
 */

// 产品视频显示顺序（循环播放）：插拔与密封演示排第一，默认居中。
const PRODUCT_VIDEO_IDS = [
  "youtube-quick-connect-sealing-compatibility",
  "youtube-quick-connect-coupling-types",
  "youtube-q60-quick-fitting",
];

const FACTORY_VIDEOS: ShowcaseVideo[] = [
  {
    id: "foreach-company-intro",
    title: "FOREACH 公司介绍",
    cover: "/images/home/tv-foreach-1280.webp",
    kind: "file",
    src: "/images/home/foreach-company-intro.mp4",
  },
];

export default function QuickConnectQ20ZhVideos() {
  const channelVideos = getChannelVideoAdditions("zh-CN");
  const productVideos: ShowcaseVideo[] = PRODUCT_VIDEO_IDS.flatMap(id => {
    const video = channelVideos.find(item => item.id === id);
    return video?.videoUrl
      ? [{ id: video.id, title: video.title, cover: video.thumbnail ?? "", kind: "youtube" as const, src: video.videoUrl }]
      : [];
  });

  return (
    <QuickConnectVideoShowcase
      title="演示视频"
      groups={[
        { key: "product", label: "产品视频", videos: productVideos },
        { key: "factory", label: "工厂视频", videos: FACTORY_VIDEOS },
      ]}
    />
  );
}
