import { productOverviewHeadings } from "./product-overview-headings";
import type { FittingIntroZh } from "./fitting-headings.zh";

// English selection copy uses the existing type IDs and product detail URLs.
export const probeTypesEn = [
  { id: "sampling-probes", label: "Sampling Probes" },
  { id: "piercing-probes", label: "Piercing Probes" },
  { id: "wash-probes", label: "Wash Probes" },
  { id: "stirring-paddles", label: "Mixing Paddles" },
] as const;

export const controlTypesEn = [
  {
    id: "air-bubble-detectors",
    label: "Air Bubble Detectors",
    modelSlug: "abd-air-bubble-detector",
    image: "/images/products/control/foreach-abd-air-bubble-detector.webp",
  },
  {
    id: "pressure-sensors",
    label: "Pressure Sensors",
    modelSlug: "pdm5-pressure-sensor",
    image: "/images/products/control/foreach-pdm5-pressure-sensor.webp",
  },
] as const;

export function getProbeSelectionPathEn(productTypeId?: string) {
  const type = probeTypesEn.find((item) => item.id === productTypeId);
  return type
    ? `/en/products/probes/selection/${type.id}/`
    : "/en/products/probes/";
}

export function getControlSelectionPathEn(productTypeId?: string) {
  const type = controlTypesEn.find((item) => item.id === productTypeId);
  return type
    ? `/en/products/control/${type.id}/`
    : "/en/products/control/";
}

export const probeOverviewHeadingEn = productOverviewHeadings.needles.en;
export const probeOverviewParagraphsEn = [
  "FOREACH develops custom sampling probes, piercing probes, wash probes and mixing paddles for automated analyzers and liquid handling equipment. Choose the component around its task: sample or reagent aspiration and dispensing, access to sealed consumables, washing and waste removal, or reaction-fluid mixing.",
  "Designs are matched to instrument drawings or samples. Probe dimensions, tip and port geometry, mounting ends and paddle shape depend on the container, fluid path and motion space. Polishing, coatings, welding and capacitive liquid-level detection compatibility are reviewed for the selected design and operating conditions.",
];

export const controlOverviewHeadingEn = productOverviewHeadings.control.en;
export const controlOverviewParagraphsEn = [
  "FOREACH offers air bubble detectors and pressure sensors for IVD, life science and automated analytical equipment. ABD detects bubbles, droplets and gas/liquid states in transparent tubing. PDM5 measures fluid-path pressure. Their signals support liquid-supply checks, blockage assessment and abnormal-state alarms in the instrument control system.",
  "Select the module according to the condition being monitored, its position in the fluid path and the required electrical interface. ABD uses non-contact infrared detection; PDM5 uses a PEEK flow path and I2C communication. Check the selected model's tubing or port requirements, operating conditions and signal handling before validating it in the complete instrument.",
];

export const probeIntrosEn: Record<string, FittingIntroZh> = {
  "sampling-probes": {
    title: "Sampling Probes for Automated Liquid Handling",
    image: {
      src: "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",
      alt: "FOREACH custom sampling probes for samples and reagents",
      width: 1440,
      height: 904,
    },
    paragraphs: [
      "Sampling probes provide the liquid contact point for aspirating and dispensing samples or reagents in automated analyzers. Select the probe around the container, required liquid volume and instrument motion, then match its connection to the surrounding fluid path.",
      "FOREACH develops the probe from drawings or samples, with dimensions, tip geometry and mounting details agreed for the instrument. Provide the fluids, cleaning sequence and residue requirements so the appropriate surface processes and any liquid-level detection interface can be reviewed.",
    ],
    features: [
      {
        title: "Tip and flow openings",
        description:
          "Pointed, flat or V-shaped tips and side ports are matched to the aspiration and dispensing task, container position and direction of liquid flow.",
      },
      {
        title: "Tubing and mounting geometry",
        description:
          "Confirm inner and outer diameter, overall and working length, bends and mounting ends against the instrument drawing and available motion space.",
      },
      {
        title: "Surface and detection requirements",
        description:
          "Review inner-wall polishing, external coatings and capacitive liquid-level detection compatibility for the actual fluid, cleaning method and instrument controls.",
      },
    ],
  },
  "piercing-probes": {
    title: "Piercing Probes for Sealed Reagent and Sample Containers",
    image: {
      src: "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp",
      alt: "FOREACH custom piercing probes for sealed consumables",
      width: 1039,
      height: 939,
    },
    paragraphs: [
      "Piercing probes provide liquid access through films or stoppers in sealed reagent reservoirs, sample containers and consumables. The starting point is the consumable being pierced, including its material, thickness and position in the instrument.",
      "Provide a drawing or sample together with the penetration depth, motion path and fluid connection. FOREACH reviews the tip, probe body and any venting features as one structure, with performance confirmed against the actual consumable and liquid-transfer sequence.",
    ],
    features: [
      {
        title: "Piercing tip",
        description:
          "Tip angle and cutting-edge orientation are evaluated with penetration force, probe strength and the required instrument motion.",
      },
      {
        title: "Liquid and vent paths",
        description:
          "Side ports, vent holes or grooves are positioned according to the aspiration point and the required paths for liquid and air.",
      },
      {
        title: "Instrument fit",
        description:
          "Confirm probe length, bends and mounting ends against the consumable location, available installation space and fluid connection.",
      },
    ],
  },
  "wash-probes": {
    title: "Wash Probes for Analyzer Wash Stations",
    image: {
      src: "/images/products/probes/wash-probes/foreach-wash-probe-main.webp",
      alt: "FOREACH custom wash probes and multi-head wash structures",
      width: 877,
      height: 800,
    },
    paragraphs: [
      "Wash probes form part of analyzer wash stations for probe washing, flushing, waste aspiration and residual-liquid removal. Start with the area to be cleaned and identify the wash-fluid supply and waste-removal paths separately.",
      "FOREACH matches the probe arrangement to the wash-station drawing, available space and cleaning sequence. Provide the wash and waste fluids, required flow and cycle timing to review hole placement, connections and surface processes before assessing the complete cleaning operation.",
    ],
    features: [
      {
        title: "Head arrangement",
        description:
          "Single-head, dual-head, multi-head and bent structures are developed around the station layout and movement of the parts being cleaned.",
      },
      {
        title: "Wash and waste openings",
        description:
          "Hole size, position and direction are matched to wash coverage, the waste outlet and the intended aspiration path.",
      },
      {
        title: "Cleaning compatibility",
        description:
          "Review welding, polishing and coatings against the wash-fluid composition, waste-fluid properties and required service life.",
      },
    ],
  },
  "stirring-paddles": {
    title: "Mixing Paddles for Automated Analyzers",
    image: {
      src: "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp",
      alt: "FOREACH custom mixing paddles for reaction vessels",
      width: 928,
      height: 803,
    },
    paragraphs: [
      "Mixing paddles combine samples, reagents, diluents or reaction fluids inside automated analyzer vessels. Choose the paddle geometry around the vessel shape, working liquid volume and available drive motion.",
      "Provide the reaction-vessel drawing, speed range and mixing-time requirement for a custom design. The paddle and mounting end are reviewed together, with mixing performance, bubbles, splashing and residue evaluated using the actual fluid and vessel.",
    ],
    features: [
      {
        title: "Paddle geometry",
        description:
          "Flat, helical and 90-degree-angle paddle options are selected according to the liquid, vessel and intended mixing action.",
      },
      {
        title: "Clearance and drive connection",
        description:
          "Check paddle dimensions, working position, concentricity and mounting ends against the vessel bottom, liquid level and motion space.",
      },
      {
        title: "Surface and cleaning",
        description:
          "Materials, welding and coatings are reviewed for fluid compatibility, cleaning conditions and the required structural strength.",
      },
    ],
  },
};

export const controlIntrosEn: Record<string, FittingIntroZh> = {
  "air-bubble-detectors": {
    title: "Air Bubble Detectors for Transparent Tubing",
    image: {
      src: "/images/products/control/foreach-abd-air-bubble-detector.webp",
      alt: "FOREACH ABD air bubble detector for transparent tubing",
      width: 1500,
      height: 1500,
    },
    paragraphs: [
      "Air bubble detectors monitor the liquid state at a selected point in transparent tubing. The FOREACH ABD uses non-contact infrared detection to identify bubbles, droplets and gas/liquid states without contacting the fluid.",
      "Choose the configuration around the tubing and the event the instrument must detect. The tubing wall, optical properties of the fluid, flow conditions and mounting position affect detection; signal interpretation and alarm handling are confirmed in the assembled system.",
    ],
    features: [
      {
        title: "Tubing match",
        description:
          "Confirm the tubing outer diameter, wall and transparency for the selected ABD configuration, using the actual tubing and fluid during evaluation.",
      },
      {
        title: "Detection task",
        description:
          "Define whether the instrument needs to identify bubbles, droplets or a change between gas and liquid, then check the model's detection and response specifications.",
      },
      {
        title: "Control interface",
        description:
          "Match TTL/UART connections, Modbus RTU communication and the configuration's IO outputs to the equipment control system.",
      },
    ],
  },
  "pressure-sensors": {
    title: "Pressure Sensors for Instrument Fluid Paths",
    image: {
      src: "/images/products/control/foreach-pdm5-pressure-sensor.webp",
      alt: "FOREACH PDM5 pressure sensor for instrument fluid paths",
      width: 1500,
      height: 1500,
    },
    paragraphs: [
      "Pressure sensors provide a pressure measurement for fluid-path monitoring and control. The FOREACH PDM5 supplies a digital pressure signal through I2C for pump feedback, blockage assessment and abnormal-state detection in automated instruments.",
      "Select the sensor position and configuration around the operating pressure, pressure fluctuations and required response. Match the fluid connection and wetted materials to the system, then verify how the instrument uses the measured signal for feedback and alarms.",
    ],
    features: [
      {
        title: "Pressure and sampling",
        description:
          "Check the PDM5 pressure range and sampling configuration against the expected steady pressure, fluctuations and monitoring task.",
      },
      {
        title: "Fluid connection",
        description:
          "The PEEK flow path and 1/4-28 UNF female-thread ports require compatible fluids, fittings and sealing structures.",
      },
      {
        title: "System integration",
        description:
          "Confirm supply conditions, I2C communication, temperature and installation space, then validate signal interpretation in the complete fluid path.",
      },
    ],
  },
};

export type ProbeControlDetailCopyEn = {
  cardTitle: string;
  h1: string;
  seoTitle: string;
  description: string;
};

export const probeControlDetailCopyEn: Partial<
  Record<string, ProbeControlDetailCopyEn>
> = {
  "sampling-probes": {
    cardTitle: "Sampling Probes",
    h1: "Custom Sampling Probes for Samples and Reagents",
    seoTitle: "Custom Sampling Probes for Samples and Reagents | FOREACH",
    description:
      "FOREACH custom sampling probes for automated analyzers, with tip, side-port, mounting and surface options matched to sample and reagent handling.",
  },
  "piercing-probes": {
    cardTitle: "Piercing Probes",
    h1: "Custom Piercing Probes for Sealed Consumables",
    seoTitle: "Custom Piercing Probes for Sealed Consumables | FOREACH",
    description:
      "FOREACH custom piercing probes for sealed films, stoppers and consumables. Match tip geometry, liquid access, venting and mounting to your instrument.",
  },
  "wash-probes": {
    cardTitle: "Wash Probes",
    h1: "Custom Wash Probes for Automated Analyzers",
    seoTitle: "Custom Wash Probes for Automated Analyzers | FOREACH",
    description:
      "FOREACH custom wash probes for analyzer wash stations, with head arrangements and openings matched to washing, waste aspiration and residual-liquid removal.",
  },
  "stirring-paddles": {
    cardTitle: "Mixing Paddles",
    h1: "Custom Mixing Paddles for Reaction Vessels",
    seoTitle: "Custom Mixing Paddles for Reaction Vessels | FOREACH",
    description:
      "FOREACH custom mixing paddles for automated analyzer vessels. Match paddle geometry, mounting and surface treatment to the fluid, vessel and mixing task.",
  },
  "abd-air-bubble-detector": {
    cardTitle: "ABD Air Bubble Detector",
    h1: "ABD Air Bubble Detector for Transparent Tubing",
    seoTitle: "ABD Air Bubble Detector for Transparent Tubing | FOREACH",
    description:
      "FOREACH ABD uses non-contact infrared detection to identify bubbles, droplets and gas/liquid states in transparent tubing for instrument fluid monitoring.",
  },
  "pdm5-pressure-sensor": {
    cardTitle: "PDM5 Pressure Sensor",
    h1: "PDM5 Pressure Sensor",
    seoTitle: "PDM5 Pressure Sensor with I2C Communication | FOREACH",
    description:
      "FOREACH PDM5 pressure sensor with I2C communication, a PEEK flow path and 1/4-28 UNF ports for fluid-path pressure feedback and monitoring.",
  },
};
