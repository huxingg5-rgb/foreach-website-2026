import type { VideoGuideDetail } from "./video-guide-detail.types";
import { sv10EnglishGuide, sv10Video } from "./installation-guide.sv10.en";

// Source: official YouTube watch-page metadata, descriptions and captions/frames,
// checked 2026-10-17. Durations use the watch page's ISO metadata (rounded seconds).
// Syringe and ABD highlights were checked against on-screen text; their automatic
// captions contain music rather than an accurate transcript. Q60 panel dimensions
// and the adapter video's certification claims are intentionally not restated.
function videoUrls(id: string, videoId: string) {
  return {
    id, locale: "en" as const,
    detailHref: `/en/resources/installation-guide/${id}/`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1&hl=en`,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };
}

export const englishVideoGuideDetails: readonly VideoGuideDetail[] = [
  {
    ...sv10Video,
    locale: "en",
    breadcrumbLabel: "SV10 Solenoid Valves",
    sectionId: "sv10",
    watchHeading: "Watch the SV10 video",
    caption: "SV10 series product overview",
    productHeading: "Explore SV10 solenoid valves",
    seriesLink: { title: "View the SV10 series →", href: "/en/products/valves/solenoid-valves/" },
    relationKeys: [...(sv10EnglishGuide.relationKeys ?? [])],
    featuredProductIds: ["6010-solenoid-valve"],
    support: {
      title: "Choosing a valve for your fluid system?",
      description: "Share your medium, switching function and connection requirements with our team.",
    },
  },
  {
    ...videoUrls("youtube-syringe-installation", "llwyaeH9Ti4"),
    title: "Syringe Pump: Syringe Installation Guide",
    seoTitle: "HLD6 Syringe Pump Installation Video | FOREACH",
    description: "Watch the FOREACH HLD6 syringe installation demonstration, covering drive positioning, locking-clip orientation and syringe fastening.",
    uploadDate: "2025-10-22T05:24:21-07:00",
    duration: "PT1M33S", durationLabel: "1 minute 33 seconds",
    breadcrumbLabel: "Syringe Installation",
    sectionId: "syringe-installation",
    watchHeading: "Watch the syringe installation video",
    caption: "HLD6 syringe installation demonstration",
    highlightsIntroduction: "These selected moments show the HLD6 assembly demonstrated in the video. Open a timestamp to view the corresponding action on YouTube. Confirm the installation instructions for your pump and syringe configuration before applying the demonstrated settings.",
    highlights: [
      { time: "00:05", start: 5, title: "Check the drive position", description: "The demonstration checks the drive pin shaft position before fitting the syringe. This establishes the space needed for the installation sequence shown." },
      { time: "00:27", start: 27, title: "Orient the locking clip", description: "The locking clip slides onto the syringe with its screw facing outward. The close-up shows the orientation of the clip relative to the syringe barrel." },
      { time: "00:46", start: 46, title: "Secure the upper connection", description: "The video shows the upper locking clip being secured and tightened by hand, with the syringe positioned on the pump." },
      { time: "01:04", start: 64, title: "Complete the fastening step", description: "A torque screwdriver is used for the second tightening step. The displayed setting belongs to this demonstrated assembly; use the confirmed installation specification for your configuration." },
    ],
    productHeading: "Explore HLD6 syringe pumps",
    productIntroduction: "The video identifies the HLD6 series. Visit its product page for syringe capacities, valve configurations, dimensions and integration information, or compare the syringe pump range.",
    products: [{ title: "HLD6 Rotary Valve Syringe Pump", href: "/en/products/pumps/syringe-pumps/rotary-valve-syringe-pumps/hld6/" }],
    seriesLink: { title: "View syringe pumps →", href: "/en/products/pumps/syringe-pumps/" },
    relationKeys: ["series:hld6", "category:syringe-pumps"],
    featuredProductIds: ["hld6-60mm-rotary-valve-syringe-pump"],
    support: { title: "Need help installing your syringe?", description: "Share your pump model, syringe capacity and a description of the installation issue with our technical team." },
  },
  {
    ...videoUrls("youtube-q60-quick-fitting", "tmwsLxhxBPQ"),
    title: "Q60 Series Quick Fittings",
    seoTitle: "Q60 Quick-Connect Fittings Video | FOREACH",
    description: "Explore FOREACH Q60 quick-connect fittings in this video: male and female halves, panel mounting, valved and non-valved configurations, and hose connections.",
    uploadDate: "2025-10-30T03:01:08-07:00",
    duration: "PT1M8S", durationLabel: "1 minute 8 seconds",
    breadcrumbLabel: "Q60 Quick Fittings", sectionId: "q60",
    watchHeading: "Watch the Q60 quick-fitting video",
    caption: "Q60 quick-connect fitting overview",
    highlightsIntroduction: "Follow the overview from mating connector halves to mounting and valve options. These timestamps locate the corresponding discussion; consult the selected product drawing for dimensions and installation requirements.",
    highlights: [
      { time: "00:07", start: 7, title: "Male and female connector halves", description: "The overview introduces the male and female versions and shows how mating halves form a quick connection." },
      { time: "00:14", start: 14, title: "Panel and inline mounting", description: "Panel-mounted and non-panel-mounted versions are presented for different installation layouts. Confirm panel thickness and mounting-hole dimensions from the drawing for the chosen connector." },
      { time: "00:30", start: 30, title: "Valved and non-valved versions", description: "The video introduces halves with or without a valve and describes fluid shutoff during disconnection for the valved configuration." },
      { time: "00:39", start: 39, title: "Combining connector configurations", description: "The overview shows that valve configurations can differ between the two mating halves. Select the pair according to which side needs to retain fluid when disconnected." },
      { time: "00:50", start: 50, title: "Hose connection options", description: "The closing section introduces different hose connection sizes. Match each end to its hose size and verify the complete mating pair on the product pages." },
    ],
    productHeading: "Explore Q60 quick-connect fittings",
    productIntroduction: "Use the Q60 series page to compare connector halves and connection options. Check the required shutoff arrangement, hose dimensions, material and installation drawing for the selected pair.",
    products: [{ title: "Q60 Quick-Connect Fittings", href: "/en/products/fittings/quick-connect-fittings/q60/" }],
    seriesLink: { title: "View all quick-connect fittings →", href: "/en/products/fittings/quick-connect-fittings/" },
    relationKeys: ["series:q60"],
    support: { title: "Choosing a quick-connect pair?", description: "Tell us your hose sizes, mounting arrangement, fluid and shutoff requirements so we can help identify the connector configuration." },
  },
  {
    ...videoUrls("youtube-female-thread-conversion", "W1FQgD9sVK8"),
    title: "Female Thread Conversion Solutions",
    seoTitle: "Female Thread Adapter Video | FOREACH",
    description: "Watch the FOREACH female thread adapter overview, introducing engineering-plastic connectors, M6 and 1/4-28 UNF interfaces, and compact fluid connections.",
    uploadDate: "2026-03-20T02:31:14-07:00",
    duration: "PT0M46S", durationLabel: "46 seconds",
    breadcrumbLabel: "Female Thread Conversion", sectionId: "female-thread",
    watchHeading: "Watch the female thread conversion video",
    caption: "Female thread adapter overview",
    highlightsIntroduction: "The video introduces connector materials, thread interfaces and compact installation. Use these moments to find the relevant section, then compare the exact connection requirements on the product pages.",
    highlights: [
      { time: "00:00", start: 0, title: "Engineering-plastic connector options", description: "The opening introduces plastic material options for liquid and gas connections. Material selection should be checked against the actual fluid, temperature and selected part documentation." },
      { time: "00:17", start: 17, title: "Thread interfaces", description: "The overview mentions M6 and 1/4-28 UNF interfaces. Confirm the thread, sealing arrangement and connecting fitting at both ends of the selected adapter." },
      { time: "00:35", start: 35, title: "Compact connections and disassembly", description: "The closing section emphasizes a compact connector layout and convenient disassembly for fluid-system integration." },
    ],
    productHeading: "Explore female thread adapters",
    productIntroduction: "Compare the available connector geometries and thread combinations in the product category. Use the individual drawings to verify port arrangement and installation space.",
    products: [{ title: "Female Thread Adapters and Connectors", href: "/en/products/fittings/female-thread-adapters/" }],
    relationKeys: ["category:female-thread-adapters"],
    support: { title: "Matching two fluid connections?", description: "Share both thread specifications, the connecting fittings, fluid and available installation space with our technical team." },
  },
  {
    ...videoUrls("youtube-bubble-detection-module", "iafwYrNZs9k"),
    title: "Bubble Detection Module",
    seoTitle: "ABD Air Bubble Detection Module Video | FOREACH",
    description: "Watch the FOREACH ABD bubble detection module overview, showing tubing compatibility, response performance and software settings for fluid monitoring.",
    uploadDate: "2025-10-31T03:12:28-07:00",
    duration: "PT0M54S", durationLabel: "54 seconds",
    breadcrumbLabel: "ABD Bubble Detection", sectionId: "abd",
    watchHeading: "Watch the bubble detection module video",
    caption: "ABD air bubble detection module overview",
    highlightsIntroduction: "These selected frames introduce the module, its tubing interface and the configuration software. The overview presents product capabilities; the selected tubing, liquid and operating conditions still need to be considered during integration.",
    highlights: [
      { time: "00:16", start: 16, title: "Tubing compatibility", description: "The on-screen text introduces use with transparent and semi-transparent tubing. Confirm the tubing material, outer diameter and liquid combination for the chosen ABD configuration." },
      { time: "00:26", start: 26, title: "Response performance", description: "The video presents a response-time claim of up to 30 microseconds. Refer to the product documentation and verify detection performance under the intended operating conditions." },
      { time: "00:37", start: 37, title: "Software parameters and output status", description: "The software screen shows parameters, signal information and output-state settings, illustrating how the module can be configured for integration." },
    ],
    productHeading: "Explore the ABD bubble detection module",
    productIntroduction: "Continue to the ABD product page for compatible tubing configurations, detection and communication information, and installation details. Describe the liquid and expected bubble conditions when discussing your application.",
    products: [{ title: "ABD Air Bubble Detection Module", href: "/en/products/control/air-bubble-detectors/abd/" }],
    relationKeys: ["series:abd"],
    support: { title: "Integrating bubble detection into your instrument?", description: "Share your tubing material and dimensions, liquid, flow conditions and control-interface requirements with our team." },
  },
];

export function getVideoGuideDetail(locale: string, id: string) {
  return locale === "en" ? englishVideoGuideDetails.find(video => video.id === id) : undefined;
}
