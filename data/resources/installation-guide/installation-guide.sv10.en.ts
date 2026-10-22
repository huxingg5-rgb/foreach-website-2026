import type { InstallationGuideCard } from "./installation-guide.types";
import type { RelatedResourcesLocale } from "../related-resources/related-resources.intl";

// Verified on the FOREACH channel on 2026-09-30; this is a product overview.
export const sv10Video = {
  id: "sv10-solenoid-valve-overview",
  videoId: "ayaTLByvWgE",
  title: "SV10 Miniature Solenoid Valves: Product Overview",
  seoTitle: "SV10 Miniature Solenoid Valves Video | FOREACH",
  description:
    "Watch a 45-second introduction to FOREACH SV10 miniature rocker diaphragm solenoid valves for air and liquid control, with 2-port and 3-port configurations.",
  highlightsIntroduction:
    "Follow the video from the valve connection options through material choices, performance parameters and the integrated manifold. Each timestamp opens the corresponding part on YouTube.",
  // Timestamps checked against the official video's English captions on 2026-09-30.
  // Values below describe what the video states; model ratings remain on the product pages.
  highlights: [
    {
      time: "00:00", start: 0,
      title: "Connection styles and valve configurations",
      description: "The opening sequence introduces different connection formats and two-way and three-way configurations. Compare the views of the valve bodies and ports, then use the related product pages to identify the configuration you need.",
    },
    {
      time: "00:09", start: 9,
      title: "Flow coefficient",
      description: "The narration states a flow coefficient of Cv 0.03. Check the selected product's documentation for the detailed specification and operating conditions.",
    },
    {
      time: "00:13", start: 13,
      title: "Diaphragm material options",
      description: "EPDM, FKM and FFKM diaphragm options are introduced. Compatibility depends on the actual fluid and operating conditions, so confirm the complete wetted configuration before specifying a material.",
    },
    {
      time: "00:21", start: 21,
      title: "Pressure range in the overview",
      description: "The video states a pressure range of −75 kPa to 0.25 MPa. Refer to the selected valve's documentation to confirm the operating limits for your configuration.",
    },
    {
      time: "00:28", start: 28,
      title: "Optional power-saving circuit",
      description: "An optional power-saving circuit is presented for continuous operation, with the narration highlighting control of temperature rise. Availability and electrical details are covered in the product documentation.",
    },
    {
      time: "00:34", start: 34,
      title: "Integrated valve manifold",
      description: "The closing sequence introduces an integrated valve manifold and customization options. For a configuration discussion, share your required fluid connections and mounting layout.",
    },
  ],
  productIntroduction:
    "Continue to the product pages for specifications, dimensions and connection requirements. Start with the two-way or three-way configuration, or browse the full SV10 series. Include your fluid, pressure, temperature and supply voltage when discussing a configuration with our team.",
  uploadDate: "2026-09-30",
  duration: "PT45S",
  durationLabel: "45 seconds",
  detailHref: "/en/resources/installation-guide/sv10-solenoid-valve-overview/",
  watchUrl: "https://www.youtube.com/watch?v=ayaTLByvWgE",
  embedUrl: "https://www.youtube.com/embed/ayaTLByvWgE?rel=0&playsinline=1&hl=en",
  thumbnail: "https://i.ytimg.com/vi/ayaTLByvWgE/hqdefault.jpg",
  products: [
    {
      title: "2-Way Miniature Solenoid Valves",
      description: "Normally closed or normally open configurations for on/off control.",
      href: "/en/products/valves/solenoid-valves/?solenoid=2-way",
    },
    {
      title: "3-Way Miniature Solenoid Valves",
      description: "Configurations for switching between fluid connections.",
      href: "/en/products/valves/solenoid-valves/?solenoid=3-way",
    },
  ],
} as const;

export const sv10EnglishGuide: InstallationGuideCard = {
  id: sv10Video.id,
  detailHref: sv10Video.detailHref,
  // The current product pages retain the internal 6010 series key for SV10.
  relationKeys: ["series:6010"],
  relationPriority: 100,
  title: sv10Video.title,
  category: "valves",
  series: "solenoid-valve",
  tags: ["Solenoid valves", "Product overview"],
  description: sv10Video.description,
  thumbnail: sv10Video.thumbnail,
  videoPlatform: "youtube",
  videoUrl: sv10Video.embedUrl,
  keywords: ["SV10", "solenoid valve video", "miniature solenoid valve", "rocker diaphragm valve", "2-way solenoid valve", "3-way solenoid valve", "fluid control"],
  steps: [],
};

const sv10RelatedVideoCopy: Record<RelatedResourcesLocale, { title: string; description: string }> = {
  "zh-CN": { title: "SV10 微型电磁阀产品介绍", description: "45 秒英文视频，介绍二通与三通配置、接口形式、膜片材料及节能选项。" },
  en: { title: sv10Video.title, description: "45-second English overview of two-way and three-way configurations, connection styles, diaphragm materials and power-saving options." },
  es: { title: "Presentación de las electroválvulas miniatura SV10", description: "Vídeo en inglés de 45 segundos sobre configuraciones de 2 y 3 vías, conexiones, materiales del diafragma y opciones de ahorro energético." },
  fr: { title: "Présentation des électrovannes miniatures SV10", description: "Vidéo en anglais de 45 secondes sur les configurations à 2 et 3 voies, les raccordements, les membranes et les options d’économie d’énergie." },
  ko: { title: "SV10 소형 솔레노이드 밸브 제품 소개", description: "2방향 및 3방향 구성, 연결 방식, 다이어프램 재질과 절전 옵션을 소개하는 45초 영어 영상입니다." },
  ru: { title: "Обзор миниатюрных электромагнитных клапанов SV10", description: "45-секундное видео на английском: двухходовые и трёхходовые исполнения, подключения, материалы мембраны и энергосберегающие опции." },
};

export function getSv10RelatedVideo(locale: RelatedResourcesLocale): InstallationGuideCard {
  return { ...sv10EnglishGuide, ...sv10RelatedVideoCopy[locale], tags: ["SV10"] };
}
