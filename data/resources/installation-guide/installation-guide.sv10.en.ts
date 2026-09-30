import type { InstallationGuideCard } from "./installation-guide.types";

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
      href: "/en/products/valves/solenoid-valves/2-way/",
    },
    {
      title: "3-Way Miniature Solenoid Valves",
      description: "Configurations for switching between fluid connections.",
      href: "/en/products/valves/solenoid-valves/3-way/",
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
