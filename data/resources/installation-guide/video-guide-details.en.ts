import type { VideoGuideDetail } from "./video-guide-detail.types";
import { sv10EnglishGuide, sv10Video } from "./installation-guide.sv10.en";
import { additionalEnglishVideoGuideDetails } from "./video-guide-library.en";
import { getProductVideoCopy, videoGuideUi } from "./product-video-copy";
import { getLanguageHref } from "@/lib/i18n/language-switch";

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
    title: "Quick Disconnect Fittings: Valved, Non-Valved and Panel-Mount Options",
    seoTitle: "Quick Disconnect Fittings: Valve and Mounting Options | FOREACH",
    description: "Choose quick disconnect fittings by shutoff function, panel mounting and hose size. Watch how mating halves and valve options affect a fluid connection.",
    uploadDate: "2025-10-30T03:01:08-07:00",
    duration: "PT1M8S", durationLabel: "1 minute 8 seconds",
    breadcrumbLabel: "Quick Disconnect Fitting Options", sectionId: "q60",
    watchHeading: "Watch the quick disconnect fitting configuration guide",
    caption: "Q60 quick-connect fitting overview",
    highlightsHeading: "How do valve, mounting and hose options change a quick disconnect?",
    highlightsIntroduction: "Choose the mating pair according to which side must retain fluid during disconnection, where the connector mounts and which hose fits each end. The Q60 overview illustrates these choices. A shutoff valve is not a guarantee of spill-free disconnection; confirm the complete pair under the intended pressure and fluid conditions.",
    highlights: [
      { time: "00:07", start: 7, title: "Male and female connector halves", description: "The overview introduces the male and female versions and shows how mating halves form a quick connection." },
      { time: "00:14", start: 14, title: "Panel and inline mounting", description: "Panel-mounted and non-panel-mounted versions are presented for different installation layouts. Confirm panel thickness and mounting-hole dimensions from the drawing for the chosen connector." },
      { time: "00:30", start: 30, title: "Valved and non-valved versions", description: "The video introduces halves with or without a valve and describes fluid shutoff during disconnection for the valved configuration." },
      { time: "00:39", start: 39, title: "Combining connector configurations", description: "The overview shows that valve configurations can differ between the two mating halves. Select the pair according to which side needs to retain fluid when disconnected." },
      { time: "00:50", start: 50, title: "Hose connection options", description: "The closing section introduces different hose connection sizes. Match each end to its hose size and verify the complete mating pair on the product pages." },
    ],
    productHeading: "Compare quick disconnect halves for the required shutoff arrangement",
    productIntroduction: "Use the Q60 series page to compare connector halves and connection options. Check the required shutoff arrangement, hose dimensions, material and installation drawing for the selected pair.",
    products: [{ title: "Q60 Quick-Connect Fittings", href: "/en/products/fittings/quick-connect-fittings/q60/" }],
    seriesLink: { title: "View all quick-connect fittings →", href: "/en/products/fittings/quick-connect-fittings/" },
    relationKeys: ["series:q60"],
    keywords: ["quick disconnect fittings", "valved quick connect", "non-valved coupling", "panel mount coupling", "hose connector"],
    support: { title: "Choosing a quick-connect pair?", description: "Tell us your hose sizes, mounting arrangement, fluid and shutoff requirements so we can help identify the connector configuration." },
  },
  {
    ...videoUrls("youtube-female-thread-conversion", "W1FQgD9sVK8"),
    title: "Female Thread Adapters for M6 and 1/4-28 Fluid Connections",
    seoTitle: "Female Thread Adapters: M6 and 1/4-28 Connections | FOREACH",
    description: "Compare female thread adapters for compact fluid connections. Check M6 and 1/4-28 interfaces, sealing geometry, materials and port arrangement before assembly.",
    uploadDate: "2026-03-20T02:31:14-07:00",
    duration: "PT0M46S", durationLabel: "46 seconds",
    breadcrumbLabel: "Female Thread Adapters", sectionId: "female-thread",
    watchHeading: "Watch the female thread adapter overview",
    caption: "Female thread adapter overview",
    highlightsHeading: "How to match female thread adapters to a fluid connection",
    highlightsIntroduction: "Match both ports by thread specification and sealing geometry, then select the body shape and material. M6 and 1/4-28 are different thread standards; similar appearance does not make them interchangeable. The video introduces interface and material options rather than proving that every adapter converts between these two threads.",
    highlights: [
      { time: "00:00", start: 0, title: "Engineering-plastic connector options", description: "The opening introduces plastic material options for liquid and gas connections. Material selection should be checked against the actual fluid, temperature and selected part documentation." },
      { time: "00:17", start: 17, title: "Thread interfaces", description: "The overview mentions M6 and 1/4-28 UNF interfaces. Confirm the thread, sealing arrangement and connecting fitting at both ends of the selected adapter." },
      { time: "00:35", start: 35, title: "Compact connections and disassembly", description: "The closing section emphasizes a compact connector layout and convenient disassembly for fluid-system integration." },
    ],
    productHeading: "Compare female thread unions, tees and connector layouts",
    productIntroduction: "Compare the available connector geometries and thread combinations in the product category. Use the individual drawings to verify port arrangement and installation space.",
    products: [{ title: "Female Thread Adapters and Connectors", href: "/en/products/fittings/female-thread-adapters/" }],
    relationKeys: ["category:female-thread-adapters"],
    keywords: ["female thread adapter", "M6 fluid fitting", "1/4-28 union", "female threaded tee", "plastic fluid connector"],
    support: { title: "Matching two fluid connections?", description: "Share both thread specifications, the connecting fittings, fluid and available installation space with our technical team." },
  },
  {
    ...videoUrls("youtube-bubble-detection-module", "iafwYrNZs9k"),
    title: "Air Bubble Detection in Transparent Tubing",
    seoTitle: "Air Bubble Detection in Transparent Tubing | FOREACH",
    description: "See how an air bubble detection module monitors transparent tubing. Review tubing compatibility, detection response and output settings for instrument fluid paths.",
    uploadDate: "2025-10-31T03:12:28-07:00",
    duration: "PT0M54S", durationLabel: "54 seconds",
    breadcrumbLabel: "Air Bubble Detection", sectionId: "abd",
    watchHeading: "Watch the air bubble detection module overview",
    caption: "ABD air bubble detection module overview",
    highlightsHeading: "What affects air bubble detection in an instrument fluid line?",
    highlightsIntroduction: "Air bubble detection must be matched to the tubing and liquid passing through the sensing location. This ABD overview introduces the tubing interface and configuration software. Evaluate the actual bubble conditions and controller response before relying on the signal for a fluid-path alarm.",
    highlights: [
      { time: "00:16", start: 16, title: "Tubing compatibility", description: "The on-screen text introduces use with transparent and semi-transparent tubing. Confirm the tubing material, outer diameter and liquid combination for the chosen ABD configuration." },
      { time: "00:26", start: 26, title: "Detection response", description: "The video introduces response performance. Sensor response time alone does not establish the smallest detectable bubble or the complete instrument's reaction time; confirm those requirements with the actual tube, liquid, flow and controller." },
      { time: "00:37", start: 37, title: "Software parameters and output status", description: "The software screen shows parameters, signal information and output-state settings, illustrating how the module can be configured for integration." },
    ],
    productHeading: "Review air bubble detection and complementary pressure monitoring",
    productIntroduction: "Use the ABD product page for compatible tubing, detection interfaces and installation details. The PDM5 pressure sensor shown alongside it supports a different monitoring task; pressure measurement does not replace air bubble detection. Describe the liquid, tubing and expected bubble conditions when reviewing the application.",
    products: [{ title: "ABD Air Bubble Detection Module", href: "/en/products/control/air-bubble-detectors/abd/" }],
    relationKeys: ["series:abd"],
    keywords: ["air bubble detector", "bubble detection tubing", "air in line sensor", "transparent tubing sensor"],
    support: { title: "Integrating bubble detection into your instrument?", description: "Share your tubing material and dimensions, liquid, flow conditions and control-interface requirements with our team." },
  },
  ...additionalEnglishVideoGuideDetails,
];

export function getVideoGuideDetail(locale: string, id: string): VideoGuideDetail | undefined {
  const base = englishVideoGuideDetails.find(video => video.id === id);
  if (!base) return undefined;
  const copy = getProductVideoCopy(locale, id);
  if (!copy) return locale === "en" ? base : undefined;
  const language = locale as VideoGuideDetail["locale"];
  const { sections, productLinkTitle, ...fields } = copy;
  const localLink = (link: { title: string; href: string }, title?: string) => {
    // Preserve existing English references. The older size guide has a full
    // English detail only, identified as such in the translated link labels.
    const href = language === "en" || link.href.includes("/youtube-quick-connect-coupling-types/")
      ? link.href : getLanguageHref(link.href, language);
    if (link.href.includes("/quick-disconnect-coupling-pressure-rating/") && href.endsWith("/resources/technical-articles/")) {
      const labels = { "zh-CN": "快插接头选型与截止配置", en: "Quick-disconnect selection and shutoff configurations",
        es: "Selección de acoplamientos rápidos y opciones de cierre", fr: "Choix des raccords rapides et configurations d’obturation",
        ko: "퀵 커플링 선정과 차단 구성", ru: "Выбор быстроразъёмных соединений и вариантов перекрытия" };
      return { title: labels[language], href: getLanguageHref("/en/resources/technical-articles/what-is-a-quick-disconnect-fitting/", language) };
    }
    return { title: title ?? link.title, href };
  };
  return {
    ...base, ...fields, locale: language, seoTitle: language === "en" ? base.seoTitle : `${copy.title} | FOREACH`,
    lead: undefined,
    detailHref: `${language === "zh-CN" ? "" : `/${language}`}/resources/installation-guide/${id}/`,
    embedUrl: base.embedUrl.replace(/([?&]hl=)en\b/, `$1${language === "zh-CN" ? "zh-Hans" : language}`),
    durationLabel: videoGuideUi[language].duration,
    sections: base.sections?.map((section, index) => ({
      ...section,
      title: sections?.[index]?.title ?? section.title,
      paragraphs: sections?.[index]?.paragraphs ?? section.paragraphs,
      links: section.links?.map(link => localLink(link, sections?.[index]?.linkTitle)),
    })),
    products: base.products.map(link => localLink(link, productLinkTitle)),
  };
}
