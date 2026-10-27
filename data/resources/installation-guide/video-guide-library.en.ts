import { fittingOverviewVideoRelations } from "@/data/resources/installation-guide/fitting-video-relations";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import type { VideoGuideDetail } from "./video-guide-detail.types";
import metadata from "./video-guide-source-metadata.json";
import { videoProductLinks } from "./video-guide-products";

// Existing channel videos only. Watch-page dates, durations and descriptions were
// checked on 2026-10-21. Untimed notes are editorial selection guidance, not invented
// transcript chapters. Product specifications remain in their current product sources.
type LibraryEntry = {
  thumbnail?: string;
  key: string; youtubeId: keyof typeof metadata; title: string; seoTitle: string;
  description: string; watchHeading: string; caption: string;
  highlightsHeading: string; introduction: string;
  highlights: readonly [title: string, description: string][];
  productKeys?: readonly string[]; relationKeys: string[];
  productHeading: string; productIntroduction: string;
  links?: VideoGuideDetail["products"];
  keywords?: readonly string[];
};

function makeGuide(entry: LibraryEntry): VideoGuideDetail {
  const id = `youtube-${entry.key}`;
  const source = metadata[entry.youtubeId];
  const parts = source.duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!parts) throw new Error(`Invalid source duration: ${entry.youtubeId}`);
  const minutes = Number(parts[1] || 0), seconds = Number(parts[2] || 0);
  const durationLabel = [minutes ? `${minutes} minute${minutes === 1 ? "" : "s"}` : "", seconds ? `${seconds} seconds` : ""].filter(Boolean).join(" ");
  return {
    id, locale: "en", title: entry.title, seoTitle: `${entry.seoTitle} | FOREACH`,
    description: entry.description, ...source, durationLabel,
    detailHref: `/en/resources/installation-guide/${id}/`,
    watchUrl: `https://www.youtube.com/watch?v=${entry.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${entry.youtubeId}?rel=0&playsinline=1&hl=en`,
    thumbnail: entry.thumbnail ? getCanonicalUrl(entry.thumbnail) : `https://i.ytimg.com/vi/${entry.youtubeId}/hqdefault.jpg`,
    breadcrumbLabel: entry.title, sectionId: entry.key,
    watchHeading: entry.watchHeading, caption: entry.caption,
    highlightsHeading: entry.highlightsHeading, highlightsIntroduction: entry.introduction,
    highlights: entry.highlights.map(([title, description]) => ({ title, description })),
    productHeading: entry.productHeading, productIntroduction: entry.productIntroduction,
    products: [...videoProductLinks(entry.productKeys ?? []), ...(entry.links ?? [])],
    productKeys: entry.productKeys, relationKeys: entry.relationKeys,
    keywords: entry.keywords,
    support: { title: "Discuss your fluid-system requirements", description: "Share your fluid, required flow and pressure, operating cycle, connections and control interface so we can review a suitable configuration." },
  };
}

const liquidCategory = { title: "Compare miniature liquid diaphragm pumps", href: "/en/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/" };
const gasLiquidCategory = { title: "Explore pumps for gas-liquid handling and waste aspiration", href: "/en/products/pumps/miniature-diaphragm-pumps/gas-liquid-diaphragm-pumps/" };

const entries: readonly LibraryEntry[] = [
  // Official watch-page metadata and descriptions verified on 2026-10-27.
{
  "key": "f-ss-water-circulation-filter",
  "youtubeId": "2K0r5MMFcHs",
  "thumbnail": "/images/resources/installation-guide/youtube/f-ss-water-circulation-filter-cover.jpg",
  "title": "Water Circulation Filter for Recirculating Water Loops",
  "seoTitle": "Water Circulation Filter for Water Loops",
  "description": "Watch the FOREACH F-SS water circulation filter overview. Review filtration requirements, flow conditions and tubing connections for a recirculating water loop.",
  "watchHeading": "Watch the F-SS water circulation filter overview",
  "caption": "F-SS water circulation filter",
  "highlightsHeading": "What should you check when selecting a water-loop filter?",
  "introduction": "The F-SS overview introduces a filter for recirculating water systems. Select the filter around the water-loop task, then confirm the required filtration, flow conditions and connection compatibility for the intended configuration.",
  "highlights": [
    [
      "Filtration requirements",
      "Define what the water loop needs to filter and confirm the filter medium and filtration rating for the selected configuration."
    ],
    [
      "Flow conditions",
      "Review the required circulation flow and the pressure drop available across the filter. Check performance in the complete loop, including the pump and tubing."
    ],
    [
      "Connection compatibility",
      "Match the filter connections to the tubing and confirm material compatibility with the water treatment and cleaning conditions."
    ]
  ],
  "productKeys": [],
  "relationKeys": [
    "topic:f-ss-water-circulation"
  ],
  "productHeading": "Discuss a filter for your recirculating water system",
  "productIntroduction": "Contact our team with the required filtration, flow conditions and tubing dimensions to review the F-SS configuration. The filter category provides other available filter products for comparison; they are not presented as equivalent replacements.",
  "links": [
    {
      "title": "View available filter products",
      "href": "/en/products/fittings/filters/"
    }
  ],
  "keywords": [
    "F-SS",
    "water circulation filter",
    "water loop filtration"
  ]
},
{
  "key": "thread-to-barb-fittings",
  "youtubeId": "i7Gr86k5xoI",
  "thumbnail": "/images/resources/installation-guide/youtube/thread-to-barb-fittings-cover.jpg",
  "title": "Thread-to-Barb Fittings for Flexible Tubing Connections",
  "seoTitle": "Thread-to-Barb Fittings for Flexible Tubing",
  "description": "Watch how thread-to-barb fittings connect flexible tubing to threaded ports. Match the thread specification, tubing inner diameter and wetted materials.",
  "watchHeading": "Watch the thread-to-barb fitting overview",
  "caption": "Thread-to-barb fittings for flexible tubing and threaded ports",
  "highlightsHeading": "How do you match a thread-to-barb fitting to a fluid connection?",
  "introduction": "Thread-to-barb fittings connect flexible tubing to threaded ports on pumps, valves and other fluid-system components. The official overview identifies the thread specification, tubing inner diameter and material compatibility as the starting points for selection.",
  "highlights": [
    [
      "Threaded port",
      "Match the thread specification and sealing arrangement to the mating port. A similar-looking thread is not enough to establish compatibility."
    ],
    [
      "Flexible tubing",
      "Match the tubing inner diameter to the specified hose-barb connection. Review the tubing material and operating conditions as part of the complete connection."
    ],
    [
      "Fluid and operating conditions",
      "Check all wetted materials against the fluid and cleaning process, then verify the assembled connection under its intended pressure and temperature."
    ]
  ],
  "relationKeys": [...fittingOverviewVideoRelations["youtube-thread-to-barb-fittings"]],
  "productHeading": "Compare fittings for flexible tubing and threaded ports",
  "productIntroduction": "Use the current product drawings and specifications to compare thread and hose-barb connections. The example products below illustrate available configurations; they do not identify every part shown in the video.",
  "links": [
    {
      "title": "View thread-to-barbed fittings",
      "href": "/en/products/fittings/thread-to-barbed-fittings/"
    }
  ],
  "keywords": [
    "thread-to-barb fittings",
    "threaded hose barb",
    "flexible tubing",
    "tubing inner diameter"
  ]
},
{
  "key": "rigid-tubing-fittings",
  "youtubeId": "20BZArgyibY",
  "thumbnail": "/images/resources/installation-guide/youtube/rigid-tubing-fittings-cover.jpg",
  "title": "Rigid Tubing Fittings for Fluid System Connections",
  "seoTitle": "Rigid Tubing Fittings for Fluid Systems",
  "description": "Watch the rigid tubing fitting overview. Match tubing outer diameter, port specification and sealing arrangement when connecting pumps, valves and fluid lines.",
  "watchHeading": "Watch the rigid tubing fitting overview",
  "caption": "Rigid tubing fittings for fluid-system connections",
  "highlightsHeading": "How do you select a fitting for rigid tubing?",
  "introduction": "Rigid tubing fittings connect tubing to pumps, valves and other fluid-system components. Select the connection to match the tubing outer diameter, port specification and application requirements, as described in the official overview.",
  "highlights": [
    [
      "Tubing outer diameter",
      "Start with the actual tubing outer diameter and its dimensional tolerance. Confirm the fitting is intended for that tube size and material."
    ],
    [
      "Port and sealing arrangement",
      "Match the thread, port geometry and required sealing components. Flanged and flangeless connections use different assembly arrangements; follow the selected product's instructions."
    ],
    [
      "Application requirements",
      "Check fluid compatibility, pressure, temperature and available assembly space. Verify the complete connection in the intended fluid circuit."
    ]
  ],
  "relationKeys": [...fittingOverviewVideoRelations["youtube-rigid-tubing-fittings"]],
  "productHeading": "Compare rigid tubing connection options",
  "productIntroduction": "Review the available flanged and flangeless fitting options, together with the mating port and required sealing components. Use the product drawing for the exact assembly.",
  "links": [
    {
      "title": "View rigid tubing fittings",
      "href": "/en/products/fittings/hard-tube-fittings/"
    }
  ],
  "keywords": [
    "rigid tubing fittings",
    "hard tube fittings",
    "tubing outer diameter",
    "flanged fitting",
    "flangeless fitting"
  ]
},
  {
    key: "dpl30-vs-dpl30h", youtubeId: "ReMmjMTZgjM",
    title: "How to Choose a Liquid Diaphragm Pump for Higher Backpressure",
    seoTitle: "Liquid Diaphragm Pump Selection for Higher Backpressure",
    description: "Compare liquid diaphragm pumps with the same nominal flow but different pressure capability. See how backpressure and tubing connections affect selection.",
    watchHeading: "Watch the standard- and high-pressure liquid pump comparison",
    caption: "DPL30 and DPL30H liquid diaphragm pump comparison",
    highlightsHeading: "Why equal free-flow ratings do not mean equal pump performance",
    introduction: "A pump should meet the required flow at the resistance of the installed circuit. This comparison introduces DPL30 and DPL30H, both listed at 300 mL/min free flow, with different pressure capabilities and connection arrangements.",
    highlights: [
      ["Compare the operating point", "The overview lists 100 kPa for DPL30 and 600 kPa for DPL30H. These pressure specifications are separate from the 300 mL/min free-flow rating; they do not mean either pump delivers that flow at its maximum pressure."],
      ["Match the tubing connection", "DPL30 uses hose-barb connections, while DPL30H uses threaded connections. Check the mating fitting, tubing, seal and assembly space before replacing one with the other."],
      ["Include the full liquid circuit", "Filters, valves, narrow tubing and the receiving chamber all contribute to backpressure. Compare the flow-pressure curve at the required operating condition, then test with the intended fluid and temperature."],
    ],
    productKeys: ["dpl30-db", "dpl30h-ds", "dpl30-bb", "dpl30h-bs"],
    relationKeys: ["series:dpl30", "series:dpl30h"],
    productHeading: "Compare standard- and high-pressure liquid pump configurations",
    productIntroduction: "The first pair compares brushed versions; the brushless alternatives are also available below. Select the motor and electrical interface separately from pressure capability. Use the individual specifications and drawings for the exact configuration.",
    links: [liquidCategory], keywords: ["liquid pump backpressure", "high pressure miniature diaphragm pump", "300 mL/min pump"],
  },
  {
    key: "dpgl800-vacuum-test", youtubeId: "zIRjV3F279I",
    title: "Miniature Diaphragm Vacuum Pump Test for Waste Aspiration",
    seoTitle: "Miniature Diaphragm Vacuum Pump Test",
    description: "Watch a miniature gas-liquid diaphragm pump vacuum test and learn which pressure, tubing and head-connection conditions matter for waste aspiration.",
    watchHeading: "Watch the gas-liquid diaphragm pump vacuum test", caption: "DPGL800 dual-head pump vacuum demonstration",
    highlightsHeading: "How to interpret a miniature pump vacuum test",
    introduction: "Ultimate vacuum describes the low-pressure condition a pump can approach under the test arrangement. It does not tell you how quickly a complete waste line will empty. This short video demonstrates vacuum performance with a DPGL800 gas-liquid pump.",
    highlights: [
      ["Identify the head connection", "The source describes a dual-head pump with four ports and single-head, parallel and series arrangements. Record the arrangement used before comparing suction performance; changing the connections changes the system being evaluated."],
      ["Keep gas flow separate from liquid removal", "The quoted 6 L/min is single-head no-load gas flow. It is not a liquid delivery rate and is not the flow at ultimate vacuum. Waste-removal performance needs measurement with the actual liquid and tubing."],
      ["Check vacuum at the useful location", "Leaks, restrictions, collection vessels and line length can change the pressure at the aspiration point. Measure the pressure and emptying time in the installed layout, including the expected air-liquid transitions."],
    ],
    productKeys: ["dpgl800-bs"], relationKeys: ["series:dpgl800"],
    productHeading: "Review the gas-liquid pump used in the vacuum demonstration",
    productIntroduction: "Use the DPGL800 product page for the head arrangement, wetted materials, electrical options and pressure limits. A single relevant pump is shown because the liquid-only models are not equivalents for this gas-liquid aspiration task.",
    links: [gasLiquidCategory], keywords: ["waste aspiration pump", "miniature vacuum pump", "gas liquid diaphragm pump"],
  },
  {
    key: "dpl-series-introduction", youtubeId: "FfOkY6ZA8yc",
    title: "Miniature Liquid Diaphragm Pumps for Instrument Fluid Transfer",
    seoTitle: "Miniature Liquid Diaphragm Pump Overview",
    description: "Explore miniature liquid diaphragm pumps for instrument fluid transfer. Compare flow requirements, pressure capability, motor options and tubing connections.",
    watchHeading: "Watch the miniature liquid diaphragm pump overview", caption: "DPL liquid diaphragm pump series introduction",
    highlightsHeading: "Which liquid pump specifications matter for an instrument?",
    introduction: "Start with the liquid-transfer task: reagent supply, washing or circulation. The DPL series introduction provides a visual starting point; the current product pages provide the configuration-specific data needed for selection.",
    highlights: [
      ["Required flow at working pressure", "Choose the flow at the circuit's operating pressure, rather than the largest free-flow number. Small tubing, filters and downstream valves can reduce delivery compared with an open-outlet test."],
      ["Motor and control requirements", "Brushed and brushless configurations have different drive and control considerations. Confirm voltage, duty cycle, wiring and any speed-control or feedback requirement for the selected motor."],
      ["Liquid compatibility and installation", "Review all wetted materials with the reagent and cleaning sequence. Check the inlet and outlet connection, available mounting space and inlet supply conditions before testing the pump in the instrument."],
    ],
    productKeys: ["dpl30-db", "dpl60-db", "dpl30-bb", "dpl60-bb", "dpl30h-ds", "dpl30h-bs"],
    relationKeys: ["series:dpl30", "series:dpl60", "series:dpl30h"],
    productHeading: "Compare liquid diaphragm pumps by flow and pressure requirement",
    productIntroduction: "DPL30 and DPL60 cover different nominal flow requirements; DPL30H provides a higher-pressure option. The model pages separate motor variants and connection details so you can compare the conditions that matter for your fluid circuit.",
    links: [liquidCategory],
  },
  {
    key: "lld-liquid-level-detection", youtubeId: "TlwZ3Ba6H_M",
    title: "Liquid Level Detection for Automated Pipetting",
    seoTitle: "Liquid Level Detection for Automated Pipetting",
    description: "See how liquid level detection supports automated pipetting, and review probe geometry, liquid conditions and the control response before aspiration.",
    watchHeading: "Watch the liquid level detection module overview", caption: "LLD liquid level detection for automated pipetting",
    highlightsHeading: "What must liquid level detection confirm before pipetting?",
    introduction: "An automated pipetting sequence needs to establish where the liquid surface is before aspiration. The LLD overview introduces liquid level detection; the detector, probe motion and aspiration command must be evaluated together in the intended instrument.",
    highlights: [
      ["Liquid surface and probe position", "The controller needs a usable detection event at the intended probe position. Check approach speed, immersion depth and the response to empty containers, rather than treating detection as a standalone volume measurement."],
      ["Probe, liquid and container combination", "Probe geometry, liquid properties and the container affect integration. Use the actual samples and reagents, including relevant foam or residue conditions, when evaluating detection reliability."],
      ["Aspiration and fault handling", "Confirm how the instrument stops or changes probe motion after detection and how it handles a missing or unexpected signal. A detection module does not by itself establish dispensing accuracy or complete instrument performance."],
    ],
    productKeys: ["sampling-probes", "smtp2-1000ul"], relationKeys: ["category:sampling-probes", "series:smtp2"],
    productHeading: "Review sampling probes and pipetting hardware for integration",
    productIntroduction: "The links below are complementary liquid-handling components, not substitutes for the LLD module. Review custom sampling-probe geometry and the SMTP2 pipetting pump separately, and contact the technical team for the LLD interface and compatibility requirements.",
    keywords: ["liquid level sensor pipetting", "automated pipetting liquid detection", "sampling probe"],
  },
  {
    key: "about-foreach", youtubeId: "4lJCbmfZZEs",
    title: "Fluid Control Components for Laboratory Instruments",
    seoTitle: "Fluid Control Components for Laboratory Instruments",
    description: "Watch the FOREACH company overview and explore fluid-control components for laboratory instruments, from liquid transfer to automated pipetting.",
    watchHeading: "Watch the fluid-control component supplier overview", caption: "FOREACH company and fluid-control component overview",
    highlightsHeading: "How to define a laboratory instrument fluid-control requirement",
    introduction: "Selecting a component supplier begins with the fluid task and the information needed to validate a component in your instrument. This company overview introduces FOREACH; the selection notes below help turn that overview into a specific technical discussion.",
    highlights: [
      ["Separate transfer, dispensing and monitoring", "A transfer pump, a pipetting mechanism and a fluid-monitoring sensor perform different jobs. Define where each component sits in the liquid path before comparing products or assembling a shortlist."],
      ["Prepare the operating conditions", "Provide the liquid, working flow and pressure, required volume or repeatability, cycle timing and cleaning method. These inputs are more useful for configuration review than a product family name alone."],
      ["Plan component and instrument verification", "Use the selected product's specifications, drawings and interface information for component assessment. Then verify the assembled fluid circuit under its actual operating conditions; a company overview is not an instrument qualification report."],
    ],
    productKeys: ["dpl30-db", "smtp2-1000ul"], relationKeys: ["product:dpl30-db", "series:smtp2"],
    productHeading: "Explore liquid-transfer and pipetting component examples",
    productIntroduction: "These two starting points illustrate different tasks: continuous liquid transfer and controlled pipetting. Continue to the complete product range when the task requires other pumps, valves, connectors or sensors.",
    links: [{title:"Explore the complete fluid-control product range",href:"/en/products/"},{title:"Read about FOREACH",href:"/en/about/foreach/"}],
  },
  {
    key: "dpl60-brushed-pressure-test", youtubeId: "yeOkzvD86xI",
    title: "Brushed Liquid Diaphragm Pump Pressure Test: 600 mL/min Class",
    seoTitle: "Brushed Liquid Diaphragm Pump Pressure Test",
    description: "Watch a brushed liquid diaphragm pump pressure test and see why its 600 mL/min free-flow rating must be evaluated separately from pressure capability.",
    watchHeading: "Watch the brushed liquid pump pressure test", caption: "DPL60 brushed liquid diaphragm pump pressure demonstration",
    highlightsHeading: "What does the brushed liquid pump pressure test establish?",
    introduction: "Pressure capability and useful liquid flow are different selection inputs. The source video presents the brushed DPL60, described with 600 mL/min flow and a 100 kPa maximum pressure specification. The short demonstration does not establish continuous delivery at both values together.",
    highlights: [
      ["Identify the pressure being read", "Record whether the pressure is measured at the pump outlet or elsewhere in the circuit, and whether liquid is still flowing. A gauge reading alone cannot define the usable flow-pressure operating point."],
      ["Confirm the brushed motor configuration", "Compare voltage and motor type with the selected product. A pressure result from one motor and supply setting should not be silently applied to another configuration."],
      ["Check the required running condition", "For repeated wash or transfer cycles, evaluate flow, current and temperature over the intended duty cycle. Use the current specification for operating limits rather than treating the end of a short test as a continuous rating."],
    ],
    productKeys: ["dpl60-db", "dpl60-bb"], relationKeys: ["product:dpl60-db"],
    productHeading: "Review the brushed pump and compare its brushless alternative",
    productIntroduction: "DPL60-DB is the relevant brushed configuration. DPL60-BB is included for motor-option comparison; the video does not report its pressure test. Confirm the exact electrical and wetted-material configuration before selection.", links:[liquidCategory],
  },
  {
    key: "dpl60-brushed-flow-rate-test", youtubeId: "WRBdbi1A83U",
    title: "600 mL/min Brushed Liquid Diaphragm Pump Flow Test",
    seoTitle: "600 mL/min Brushed Liquid Pump Flow Test",
    description: "Watch a 600 mL/min class brushed liquid diaphragm pump flow test and review how inlet conditions, tubing and backpressure affect delivered flow.",
    watchHeading: "Watch the brushed liquid pump flow-rate demonstration", caption: "DPL60 brushed pump liquid flow demonstration",
    highlightsHeading: "How to compare a liquid pump flow test with your circuit",
    introduction: "A measured flow rate is useful only with its operating conditions. This DPL60 brushed-pump video provides a short flow demonstration; the 600 mL/min catalog value should be read with the product's stated test conditions.",
    highlights: [
      ["Record the measured quantity and elapsed time", "When collecting liquid, calculate flow from collected volume divided by collection time. State the interval and repeat the measurement; a brief visual demonstration alone does not establish dosing repeatability."],
      ["Include inlet height and tubing", "The source mentions 3.2 mm internal-diameter hose for the suction-lift specification. Hose size, length, reservoir level and inlet restrictions also matter when comparing a bench setup with an installed liquid path."],
      ["Measure with the outlet components connected", "A filter, valve or elevated outlet can create backpressure that an open discharge does not have. Verify the target flow with those components in place rather than sizing the pump from free flow alone."],
    ],
    productKeys: ["dpl60-db", "dpl30-db"], relationKeys: ["product:dpl60-db"],
    productHeading: "Compare brushed liquid pumps for the required working flow",
    productIntroduction: "Start with DPL60-DB for the pump family demonstrated. DPL30-DB is a lower nominal-flow alternative to compare when the liquid-transfer task requires less flow. Check each curve at the actual operating pressure.", links:[liquidCategory],
  },
  {
    key: "dpl60-brushless-flow-rate-test", youtubeId: "pZV2uQOMt5I",
    title: "600 mL/min Brushless Liquid Diaphragm Pump Flow Test",
    seoTitle: "600 mL/min Brushless Liquid Pump Flow Test",
    description: "See a brushless liquid diaphragm pump flow test for the 600 mL/min class, with selection checks for motor control, backpressure and operating duty.",
    watchHeading: "Watch the brushless liquid pump flow-rate demonstration", caption: "DPL60 brushless pump liquid flow demonstration",
    highlightsHeading: "Which conditions belong with a brushless pump flow result?",
    introduction: "The brushless DPL60 demonstration concerns liquid delivery in a short test. For an instrument, compare its nominal 600 mL/min flow class with the flow available at the actual pressure and motor-control setting.",
    highlights: [
      ["Document the drive setting", "Supply voltage and any speed-control command belong in the test record. Brushless does not identify a single control interface; confirm whether the selected pump has simple power wiring or additional control leads."],
      ["Check delivery under resistance", "The delivered flow changes with inlet and outlet conditions. Include the intended tubing, valves and filters when determining whether the pump can sustain the required liquid-transfer rate."],
      ["Separate flow testing from lifetime evidence", "A seconds-long flow clip cannot demonstrate thousands of operating hours. Evaluate service-life information with its test conditions and validate the actual on/off cycle, temperature and fluid exposure."],
    ],
    productKeys: ["dpl60-bb", "dpl30-bb"], relationKeys: ["product:dpl60-bb"],
    productHeading: "Compare brushless liquid pumps by operating flow",
    productIntroduction: "DPL60-BB is the relevant 600 mL/min class configuration. Compare DPL30-BB when a lower nominal flow is sufficient, and confirm the required wiring and control options with the selected part.", links:[liquidCategory],
  },
  {
    key: "dpl30-brushed-pressure-test", youtubeId: "p5_Brvhf9Qo",
    title: "Brushed Micro Liquid Diaphragm Pump Pressure Test",
    seoTitle: "Brushed Micro Liquid Pump Pressure Test",
    description: "Review a brushed micro liquid diaphragm pump pressure test and check how working pressure, flow and connection type determine suitability for a fluid circuit.",
    watchHeading: "Watch the brushed micro liquid pump pressure demonstration", caption: "DPL30 brushed liquid diaphragm pump pressure test",
    highlightsHeading: "How to assess pressure capability in a compact liquid pump",
    introduction: "The DPL30 brushed-pump source lists 300 mL/min flow and 100 kPa maximum pressure. Treat these as separate specification points. The pressure demonstration is a starting point for evaluating the pump, not evidence that all installed circuits have the same performance.",
    highlights: [
      ["Relate pressure to the fluid task", "Identify whether pressure comes from tubing resistance, a filter, a valve or a pressurized destination. The pump must deliver the needed liquid flow against that combined load."],
      ["Check the hose-barb installation", "The liquid connection is part of the pressure boundary. Match the tubing to the specified barb and confirm retention, material compatibility and assembly quality before operating the circuit."],
      ["Avoid extending a short test claim", "A short pressure clip does not establish long-term sealing, thermal stability or endurance. Use the formal product limits and a duty-cycle test to assess continuous or repeated operation."],
    ],
    productKeys: ["dpl30-db", "dpl30h-ds"], relationKeys: ["product:dpl30-db"],
    productHeading: "Compare standard- and higher-pressure brushed liquid pumps",
    productIntroduction: "DPL30-DB corresponds to the standard-pressure family in the demonstration. DPL30H-DS is a separate higher-pressure option with a different connection arrangement; it requires its own fit and performance review.", links:[liquidCategory],
  },
  {
    key: "dpl30-brushless-pressure-test", youtubeId: "Lzox2V0DiYs",
    title: "Brushless Micro Liquid Diaphragm Pump Pressure Test",
    seoTitle: "Brushless Micro Liquid Pump Pressure Test",
    description: "Watch a brushless micro liquid diaphragm pump pressure test and review the difference between nominal flow, pressure capability and installed performance.",
    watchHeading: "Watch the brushless micro liquid pump pressure demonstration", caption: "DPL30 brushless liquid diaphragm pump pressure test",
    highlightsHeading: "What to verify before using a brushless pump under pressure",
    introduction: "This video introduces the DPL30 brushless pump in a pressure-test context. Its 300 mL/min nominal flow and 100 kPa maximum pressure belong to different conditions; selecting a working point requires the flow-pressure curve and the intended motor configuration.",
    highlights: [
      ["Keep the electrical configuration consistent", "Record supply voltage, control method and test duration. A result from one drive setting is not a universal result for every brushless option or speed command."],
      ["Observe liquid delivery as well as pressure", "A circuit can reach pressure while delivering little liquid. Confirm the flow required by the downstream task, especially when a valve, narrow tube or filter introduces resistance."],
      ["Evaluate the complete pressure boundary", "Tubing, fittings, seals and downstream components must be suitable for the working pressure and liquid. Confirm startup and shutoff behavior rather than checking only the steady gauge reading."],
    ],
    productKeys: ["dpl30-bb", "dpl30h-bs"], relationKeys: ["product:dpl30-bb"],
    productHeading: "Compare brushless liquid pumps for the required pressure",
    productIntroduction: "Review DPL30-BB for the demonstrated family and DPL30H-BS for a higher-pressure alternative. The higher-pressure model has different connections and must be evaluated as a separate configuration.", links:[liquidCategory],
  },
  {
    key: "dpl30-brushless-flow-rate-test", youtubeId: "esCbqosu9NU",
    title: "300 mL/min Brushless Liquid Diaphragm Pump Flow Test",
    seoTitle: "300 mL/min Brushless Liquid Pump Flow Test",
    description: "Watch a 300 mL/min class brushless liquid diaphragm pump flow test and check the inlet, outlet and control conditions needed for a useful comparison.",
    watchHeading: "Watch the 300 mL/min class brushless pump flow demonstration", caption: "DPL30 brushless pump liquid flow demonstration",
    highlightsHeading: "How to evaluate low-flow liquid transfer with a brushless pump",
    introduction: "For reagent transfer or small instrument fluid circuits, the useful quantity is flow through the installed path. The DPL30 brushless-pump clip demonstrates liquid delivery; it does not establish an exact dispensed volume per command.",
    highlights: [
      ["Measure the liquid flow under stated conditions", "Record fluid, temperature, supply setting and collection interval. If using volume and time, keep the collection method consistent so results can be compared between pump configurations."],
      ["Check priming separately", "The source includes a suction-lift specification with 3.2 mm internal-diameter tubing. Reaching a liquid supply and maintaining flow after priming are different checks; include reservoir height and inlet sealing in both."],
      ["Test the actual outlet load", "Measure with the intended delivery tube, filter and valve connected. A successful open-outlet demonstration does not establish the same flow against resistance or into a pressurized chamber."],
    ],
    productKeys: ["dpl30-bb", "dpl60-bb"], relationKeys: ["product:dpl30-bb"],
    productHeading: "Compare brushless pumps for low-flow liquid transfer",
    productIntroduction: "Start with DPL30-BB and compare DPL60-BB if the circuit requires a higher nominal flow. Verify the working point and control options on the product pages before testing your selected configuration.", links:[liquidCategory],
  },
  {
    key: "dpl30-brushed-flow-rate-test", youtubeId: "RqgFil-5YAo",
    title: "300 mL/min Brushed Liquid Diaphragm Pump Flow Test",
    seoTitle: "300 mL/min Brushed Liquid Pump Flow Test",
    description: "See a 300 mL/min class brushed liquid diaphragm pump flow demonstration and review the conditions needed to assess a compact liquid-transfer pump.",
    watchHeading: "Watch the 300 mL/min class brushed pump flow demonstration", caption: "DPL30 brushed pump liquid flow demonstration",
    highlightsHeading: "What to record in a brushed liquid pump flow test",
    introduction: "A compact brushed liquid pump can be assessed by measuring the flow delivered through a defined circuit. This DPL30 clip is a short demonstration of the 300 mL/min class; use the current product specification and your own operating conditions for selection.",
    highlights: [
      ["Voltage and operating interval", "Record the voltage at the pump and how long it runs before and during measurement. Startup, priming and established liquid delivery should not be combined into an unexplained average."],
      ["Volume, time and repeat measurements", "Measure the collected liquid and elapsed time, then repeat under the same conditions. Average transfer flow and the repeatability of individual dispenses are different results and should be reported separately."],
      ["Duty cycle and maintenance expectations", "The flow clip is not a motor endurance test. Consider the actual starts, stops and operating time when comparing a brushed option with a brushless one."],
    ],
    productKeys: ["dpl30-db", "dpl30-bb"], relationKeys: ["product:dpl30-db"],
    productHeading: "Compare brushed and brushless pumps in the same flow class",
    productIntroduction: "DPL30-DB is the brushed configuration. DPL30-BB is provided as a motor alternative, so you can compare electrical integration and service requirements without confusing the two test subjects.", links:[liquidCategory],
  },
  {
    key: "five-wire-brushless-control-wires", youtubeId: "hIR9dg47_wU",
    title: "5-Wire Brushless Diaphragm Pump Wiring: PWM and Speed Feedback",
    seoTitle: "5-Wire Brushless Pump Wiring: PWM and FG",
    description: "Understand the control functions introduced in a five-wire brushless diaphragm pump video, including PWM speed control, FG feedback and direction control.",
    watchHeading: "Watch the five-wire brushless pump control overview", caption: "Five-wire brushless DPL60 pump control functions",
    highlightsHeading: "What do the control wires on a brushless pump do?",
    introduction: "The source introduces PWM control, FG speed feedback and direction control on a five-wire brushless configuration. Confirm the actual wiring diagram before connection: the number of wires alone does not establish colors, pin assignments or signal voltage levels.",
    highlights: [
      ["PWM command", "PWM provides a motor-speed command on a supported configuration. Its required frequency, logic levels and allowable duty-cycle range must come from the selected motor documentation. A speed command is not a calibrated liquid-flow measurement."],
      ["FG feedback", "FG reports motor rotation information. The controller must interpret the documented pulses-per-revolution relationship. Motor rotation can continue when liquid delivery is interrupted, so speed feedback alone cannot confirm flow."],
      ["Direction control", "A motor direction signal does not automatically make a diaphragm pump's liquid path reversible. Inlet and outlet check valves determine fluid direction; confirm the pump's permitted rotation and operating behavior before using this input."],
    ],
    productKeys: ["dpl60-bb"], relationKeys: ["product:dpl60-bb"],
    productHeading: "Review brushless pump control options before wiring",
    productIntroduction: "The DPL60-BB product page is the starting point for the brushless family. Specify the five-wire control requirement when requesting the motor variant and its electrical drawing; not every brushless pump uses this wiring arrangement.",
    links: [{title:"Compare a two-wire brushless pump interface",href:"/en/resources/installation-guide/youtube-two-wire-brushless-diaphragm-pump/"}],
    keywords:["PWM pump control", "FG speed feedback", "brushless pump wiring"],
  },
  {
    key: "two-wire-brushless-diaphragm-pump", youtubeId: "p3PlAdfx9Sk",
    title: "2-Wire Brushless Diaphragm Pumps: Power Connections and Selection",
    seoTitle: "2-Wire Brushless Diaphragm Pump Connections",
    description: "Explore a two-wire brushless diaphragm pump interface and compare simple power connections with the control and feedback needs of an instrument.",
    watchHeading: "Watch the two-wire brushless pump overview", caption: "Two-wire brushless DPL60 pump introduction",
    highlightsHeading: "When is a two-wire brushless pump interface suitable?",
    introduction: "A two-wire brushless configuration offers a simple power connection when separate control and feedback leads are not required. The source demonstrates this approach with a DPL60 pump; choose it around the control behavior your instrument actually needs.",
    highlights: [
      ["Power polarity and voltage", "The demonstrated wiring identifies red as positive and black as negative. Check the supplied motor's label and wiring specification before applying power; do not extend this color convention to every pump or cable assembly."],
      ["On/off control versus speed feedback", "Two power wires do not provide a separate FG output. If the instrument requires a speed command or rotation feedback, review a control-equipped motor configuration and its interface requirements."],
      ["Confirm permitted supply control", "Do not assume that arbitrary supply-voltage reduction or power-line PWM is acceptable. Ask for the supported control method, startup behavior and protection requirements for the selected two-wire driver."],
    ],
    productKeys:["dpl60-bb"], relationKeys:["product:dpl60-bb"],
    productHeading:"Select a brushless pump with the required electrical interface",
    productIntroduction:"Review the DPL60-BB family and specify whether the application requires two-wire operation. Confirm the offered motor configuration separately from the fluid flow and pressure requirements.",
    links:[{title:"Review five-wire PWM and feedback functions",href:"/en/resources/installation-guide/youtube-five-wire-brushless-control-wires/"}],
  },
  {
    key:"diaphragm-pump-hose-barb-protection", youtubeId:"rSFDAexeFmU",
    title:"How to Prevent Diaphragm Pump Hose Barb Breakage",
    seoTitle:"How to Prevent Pump Hose Barb Breakage",
    description:"See how to connect tubing without bending a miniature diaphragm pump hose barb, and check tubing fit, insertion direction and strain relief.",
    watchHeading:"Watch the pump hose-barb handling demonstration", caption:"Tubing installation and hose-barb protection",
    highlightsHeading:"Why can a pump hose barb break during tubing installation?",
    introduction:"Side loading turns the tubing into a lever against the pump port. The source emphasizes straight insertion and avoiding forced bending near the barb. Apply that handling principle together with the selected pump's installation specification.",
    highlights:[
      ["Match the tube before pushing it on","Confirm the specified tubing internal diameter, wall and material. A tube that is too tight may require excessive force; one that is too loose may not seal or remain attached under the working conditions."],
      ["Keep insertion aligned with the port","Support the pump and advance the tube along the barb axis. Avoid using a sideways bend or the weight of the pump as leverage. Do not turn a force value mentioned in a short clip into a universal safe installation limit."],
      ["Relieve load after assembly","Route and support the tubing so that a tight bend, moving reservoir or external pull does not load the port. Inspect the joint and check for leakage under the intended pressure and temperature."],
    ],
    productKeys:["dpl30-db","dpl60-db","dpl30-bb","dpl60-bb"], relationKeys:["series:dpl30","series:dpl60"],
    productHeading:"Check the connections on hose-barb liquid diaphragm pumps",
    productIntroduction:"These DPL30 and DPL60 configurations use hose-barb connections. Threaded DPL30H ports require a different assembly procedure and are not grouped into this hose-barb installation guide.", links:[liquidCategory],
  },
  {
    key:"diaphragm-pump-placement-stability", youtubeId:"ag48EKqdPyU",
    title:"Why Does a Miniature Diaphragm Pump Rock on a Flat Surface?",
    seoTitle:"Why a Diaphragm Pump Rocks on a Flat Surface",
    description:"Learn why a motor housing can prevent a miniature diaphragm pump from sitting flat, and how to check the intended mounting faces and fixing points.",
    watchHeading:"Watch the diaphragm pump mounting explanation", caption:"Motor-housing projection and intended pump mounting",
    highlightsHeading:"Which pump surfaces are intended for mounting?",
    introduction:"A pump that rocks when placed on a bench may be resting on a housing feature rather than a mounting face. The video explains a projection associated with the motor bearing and points to the intended mounting arrangement.",
    highlights:[
      ["Separate a housing feature from a mounting datum","The outer motor case does not necessarily form a flat support surface. Check the product drawing for the intended orientation and fixing points rather than judging mounting suitability from bench placement."],
      ["Do not remove the projection","Do not grind or flatten a housing feature to make the pump sit level. Confirm its purpose and use the specified mounting features so that the motor and bearing arrangement remain intact."],
      ["Distinguish rocking from vibration in service","A loose pump on a bench and a mounted pump vibrating during operation are different conditions. For an installed problem, inspect the fixings, support stiffness, tubing loads and operating speed."],
    ],
    productKeys:["dpl30-db","dpl60-db","dpl30-bb","dpl60-bb"], relationKeys:["series:dpl30","series:dpl60"],
    productHeading:"Review liquid pump mounting drawings",
    productIntroduction:"Use the drawing for the selected DPL30 or DPL60 motor configuration to locate the mounting points. Confirm the assembly orientation and surrounding clearances before designing the support or bracket.",
    links:[{title:"Review diaphragm pump installation precautions",href:"/en/resources/installation-guide/youtube-diaphragm-installation/"}],
  },
  {
    key:"diaphragm-installation", youtubeId:"bVbg038KImo",
    title:"How to Install a Miniature Liquid Diaphragm Pump",
    seoTitle:"Miniature Liquid Diaphragm Pump Installation Guide",
    description:"Watch miniature liquid diaphragm pump installation methods and review mounting, tubing connections, electrical checks and startup precautions.",
    watchHeading:"Watch the miniature diaphragm pump installation demonstration", caption:"Diaphragm pump installation methods and precautions",
    highlightsHeading:"What should be checked before starting a liquid diaphragm pump?",
    introduction:"Mount the pump using its specified fixing points, connect the inlet and outlet correctly and verify the electrical configuration before startup. The short installation video illustrates mounting approaches; the selected model drawing determines the actual dimensions and fastening requirements.",
    highlights:[
      ["Mounting and clearance","Locate the permitted fixing faces and leave room for tubing, cable routing and service access. Do not force an uneven motor housing against a flat plate or use an assumed screw length."],
      ["Inlet and outlet connections","Follow the flow markings and match the tube to the specified port. Support the tubing to prevent bending loads, keep the inlet path appropriately sealed and avoid sharp restrictions close to the pump."],
      ["Controlled startup","Check voltage and polarity, supply the intended liquid and observe priming, flow and leakage. Compare operation with the specified pressure and duty cycle before starting the normal instrument sequence."],
    ],
    productKeys:["dpl30-db","dpl30-bb"], relationKeys:["series:dpl30"],
    productHeading:"Check the pump configuration and installation drawing",
    productIntroduction:"The DPL30 brushed and brushless variants provide the relevant product information for this guide. Confirm the motor, mounting and connection details of the supplied pump before applying an installation method from the demonstration.",
    links:[{title:"Prevent hose-barb damage during tubing installation",href:"/en/resources/installation-guide/youtube-diaphragm-pump-hose-barb-protection/"}],
  },
  {
    key:"800-series-gas-liquid", youtubeId:"UwleXANBWvQ",
    title:"Gas-Liquid Diaphragm Pumps for Waste Aspiration and Vacuum Handling",
    seoTitle:"Gas-Liquid Diaphragm Pumps for Waste Aspiration",
    description:"Explore a miniature gas-liquid diaphragm pump for aspiration tasks, with clear distinctions between no-load gas flow, vacuum and liquid-handling performance.",
    watchHeading:"Watch the gas-liquid diaphragm pump overview", caption:"DPGL800 gas-liquid diaphragm pump introduction",
    highlightsHeading:"When does a fluid system need a gas-liquid diaphragm pump?",
    introduction:"Waste aspiration can involve liquid interrupted by air, so the pump must be selected for mixed gas-liquid handling. The DPGL800 overview introduces a brushless dual-head configuration for this type of task.",
    highlights:[
      ["Check the medium throughout the cycle","Define whether the pump encounters liquid, air or alternating portions of both. Include the expected waste composition and cleaning fluids when checking the wetted materials."],
      ["Read the flow rating with its medium","The 6 L/min figure is single-head no-load gas flow. It must not be used as a liquid pumping rate or combined with the ultimate-vacuum value as though both occur at the same operating point."],
      ["Review the head and tubing arrangement","The dual-head layout allows different connection arrangements, subject to the product documentation. Confirm the chosen arrangement and measure aspiration time, line pressure and gas-liquid behavior in the complete circuit."],
    ],
    productKeys:["dpgl800-bs"], relationKeys:["series:dpgl800"],
    productHeading:"Review a pump designed for gas-liquid handling",
    productIntroduction:"Use the DPGL800 product page to check connections, materials and operating limits. Liquid-only diaphragm pumps should not be substituted simply because their nominal flow appears similar.",
    links:[gasLiquidCategory,{title:"Watch the gas-liquid pump vacuum test",href:"/en/resources/installation-guide/youtube-dpgl800-vacuum-test/"}],
  },
  {
    key:"brushed-vs-brushless-lifespan", youtubeId:"EUt7BG3WWwA",
    title:"Brushed vs. Brushless Pump Motors: Wear, Cleanliness and EMI",
    seoTitle:"Brushed vs. Brushless Pump Motors: Wear and EMI",
    description:"Compare brushed and brushless diaphragm pump motors beyond service life, including brush wear, contamination concerns and electromagnetic interference.",
    watchHeading:"Watch the brushed and brushless pump motor comparison", caption:"Motor wear, cleanliness and electrical integration considerations",
    highlightsHeading:"Why is pump motor selection about more than service life?",
    introduction:"Motor life is one part of selecting a diaphragm pump. This comparison also raises brush wear, cleanliness and electromagnetic interference. Evaluate these factors in the actual instrument instead of treating one motor type as universally better.",
    highlights:[
      ["Brush wear and particles","A brushed motor uses mechanical brush contact and can produce wear debris. Consider whether the motor location and enclosure could affect nearby sensitive components; motor debris is not automatically evidence of contamination inside the sealed liquid path."],
      ["Electronic switching and EMI","A brushless motor uses electronic commutation. Electrical noise depends on the driver, wiring, grounding and installation, so a general comparison cannot establish which complete instrument will have lower emissions."],
      ["Life under the intended duty cycle","Compare endurance information only with its operating conditions. Starts and stops, temperature, load and liquid-side wear all matter; removing carbon brushes does not remove every pump wear mechanism."],
    ],
    productKeys:["dpl30-db","dpl30-bb"], relationKeys:["series:dpl30"],
    productHeading:"Compare brushed and brushless liquid pump configurations",
    productIntroduction:"The DPL30 pair lets you review motor options in the same nominal flow class. Check the electrical configuration and plan instrument-level noise and endurance verification for the selected assembly.",
    links:[{title:"Choose a pump motor for your duty cycle and controls",href:"/en/resources/installation-guide/youtube-motor-selection/"}],
  },
  {
    key:"60-series-pressure", youtubeId:"fH9ofJfE4Us",
    title:"Diaphragm Pump Maximum Pressure vs. Working Pressure",
    seoTitle:"Diaphragm Pump Maximum vs. Working Pressure",
    description:"Use a diaphragm pump pressure demonstration to understand the difference between a test reading, a published pressure limit and a useful flow-pressure operating point.",
    watchHeading:"Watch the liquid diaphragm pump maximum-pressure demonstration", caption:"DPL60 series pressure demonstration",
    highlightsHeading:"Can a pressure-test reading be used as a continuous pump rating?",
    introduction:"A pressure reached during a short demonstration is not automatically a permitted continuous working pressure. This DPL60 video should be read alongside the current product specification and flow-pressure curve before choosing an operating point.",
    highlights:[
      ["Read the gauge with the test setup","Gauge location, outlet restriction, supply conditions and elapsed time are needed to interpret a pressure reading. Without that context, do not use the visible peak as a system design rating."],
      ["Ask how much liquid is still moving","A maximum-pressure condition does not establish useful delivery flow. Select the point that meets the required flow through the actual downstream resistance, within the published operating limits."],
      ["Check every pressure-exposed part","The pump, tubing, fittings, valves and destination all have their own constraints. Evaluate transients and prolonged operation in addition to the pressure shown in a brief clip."],
    ],
    productKeys:["dpl60-db","dpl60-bb"], relationKeys:["series:dpl60"],
    productHeading:"Use current liquid pump specifications for pressure selection",
    productIntroduction:"Compare the DPL60 motor variants and their documented conditions. The linked specification and curve, together with your system test, determine a suitable operating point; the video alone does not establish a new pressure rating.", links:[liquidCategory],
  },
  {
    key:"motor-selection", youtubeId:"FGQFrcs9cWI",
    title:"How to Choose a Brushed or Brushless Diaphragm Pump Motor",
    seoTitle:"Choosing a Brushed or Brushless Pump Motor",
    description:"Choose a diaphragm pump motor around operating hours, start-stop cycles, control requirements and electrical integration, then compare the matching pump configurations.",
    watchHeading:"Watch the diaphragm pump motor selection introduction", caption:"Brushed or brushless motor selection for diaphragm pumps",
    highlightsHeading:"Which operating requirements should decide the pump motor?",
    introduction:"Start with the required fluid performance, then choose the motor around the operating cycle and controls. This short selection video introduces the brushed-versus-brushless question; a useful decision also needs the instrument's electrical and maintenance requirements.",
    highlights:[
      ["Operating hours and starts","Record how long the pump runs each day and how often it starts. Compare life and maintenance expectations under a comparable load and duty cycle rather than selecting from an unqualified hour figure."],
      ["Control and feedback","Define whether simple on/off operation is sufficient or whether speed commands and rotation feedback are needed. Brushless motor variants can have different interfaces, so confirm the actual wiring and signal requirements."],
      ["Integration cost and verification","Include the power supply, driver, cable routing and noise mitigation in the comparison. Validate the complete fluid circuit after selecting the motor; changing the motor does not remove flow, pressure or material-compatibility constraints."],
    ],
    productKeys:["dpl30-db","dpl30-bb","dpl60-db","dpl60-bb"], relationKeys:["series:dpl30","series:dpl60"],
    productHeading:"Compare pump motor options within the required flow class",
    productIntroduction:"Compare brushed and brushless variants of DPL30 or DPL60 once the fluid operating point is known. Request the electrical specification for the chosen variant and test it under the intended on/off sequence.",
    links:[{title:"Review brush wear, cleanliness and EMI considerations",href:"/en/resources/installation-guide/youtube-brushed-vs-brushless-lifespan/"}],
  },
  {
    key:"30h-series-pressure", youtubeId:"ntivZyFe1B0",
    title:"High-Pressure Miniature Liquid Diaphragm Pump Test",
    seoTitle:"High-Pressure Miniature Liquid Diaphragm Pump Test",
    description:"Watch a high-pressure miniature liquid diaphragm pump demonstration and review pressure limits, threaded connections and flow under backpressure.",
    watchHeading:"Watch the high-pressure liquid diaphragm pump demonstration", caption:"DPL30H series pressure demonstration",
    highlightsHeading:"What must be checked when selecting a high-pressure micro pump?",
    introduction:"Higher pressure capability is useful only when the pump can still deliver the required flow in the actual circuit. This DPL30H demonstration accompanies the current 300 mL/min free-flow and 600 kPa maximum-pressure specifications, which describe separate operating conditions.",
    highlights:[
      ["Flow under the required backpressure","Locate the needed flow on the product's pressure curve. Do not assume the 300 mL/min free-flow rating remains available at the maximum pressure or that a short test establishes continuous operation."],
      ["Threaded connection and seal","DPL30H uses a different connection arrangement from hose-barb DPL30 models. Verify the mating fitting, seal and assembly instructions, and check the pressure suitability of the complete fluid connection."],
      ["Operating cycle and system response","Record the pressure during startup, normal running and valve switching. Assess current, temperature, leakage and flow over the intended duty cycle, using the formal specification to set the limits."],
    ],
    productKeys:["dpl30h-ds","dpl30h-bs"], relationKeys:["series:dpl30h"],
    productHeading:"Compare high-pressure liquid pump motor configurations",
    productIntroduction:"DPL30H-DS and DPL30H-BS are the brushed and brushless options for this family. Check each model's electrical configuration and connection drawing, then verify performance at your required pressure and flow.",
    links:[{title:"Compare standard- and high-pressure liquid pump selection",href:"/en/resources/installation-guide/youtube-dpl30-vs-dpl30h/"}],
  },
  {
    key:"diaphragm-selection", youtubeId:"zgP7udU0asI",
    title:"How to Choose a Miniature Diaphragm Pump for Your Fluid System",
    seoTitle:"How to Choose a Miniature Diaphragm Pump",
    description:"Choose a miniature diaphragm pump by medium, working flow, pressure, materials and control requirements, then compare liquid and gas-liquid configurations.",
    watchHeading:"Watch the miniature diaphragm pump selection introduction", caption:"Diaphragm pump selection introduction",
    highlightsHeading:"Which requirements should come first in diaphragm pump selection?",
    introduction:"Define the medium and the required operating point before choosing a pump model. This short video introduces diaphragm pump selection; the checklist below turns that starting point into a practical comparison of available configurations.",
    highlights:[
      ["Liquid or alternating gas and liquid","Decide whether the pump transfers a continuous liquid supply or encounters air-liquid transitions during aspiration. Select a pump intended for that medium pattern instead of comparing flow numbers across different test media."],
      ["Flow at pressure and inlet conditions","Specify the required flow together with outlet backpressure, inlet lift and tubing restrictions. Free flow, maximum pressure and ultimate vacuum are separate specification points, not a single guaranteed operating condition."],
      ["Materials, connections and controls","Check all wetted materials against the fluid and cleaning method. Then confirm tubing connections, mounting space, voltage, duty cycle and required motor-control signals before choosing a prototype configuration."],
    ],
    productKeys:["dpl30-db","dpgl800-bs","dpl60-db","dpl30h-ds"],
    relationKeys:["series:dpl30","series:dpl60","series:dpl30h","series:dpgl800"],
    productHeading:"Compare pumps by the liquid-handling task",
    productIntroduction:"Use DPL30 and DPL60 for different liquid-flow requirements, DPL30H when higher backpressure needs review, and DPGL800 for gas-liquid aspiration tasks. These are different selection paths, not interchangeable pump ratings.",
    links:[liquidCategory,gasLiquidCategory],
  },
];

export const additionalEnglishVideoGuideDetails: readonly VideoGuideDetail[] = entries.map(makeGuide);
