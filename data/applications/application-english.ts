export type EnglishApplicationKind =
  | "analytical-instruments"
  | "environmental-monitoring"
  | "ivd"
  | "lab-automation"
  | "life-science"
  | "synthetic-biology";

type SourceProduct = {
  key?: string;
  params?: string[];
  productHref?: string;
  contactHref?: string;
};

type SourceModule = {
  key: string;
  index?: string;
  products?: string[];
};

type SourceGroup = {
  key: string;
  index?: string;
  modules?: SourceModule[];
};

export type ApplicationSourceData = {
  hero?: unknown;
  instruments?: SourceGroup[];
  applications?: SourceGroup[];
  productAbilities?: Record<string, SourceProduct>;
  products?: Record<string, SourceProduct>;
};

export type EnglishApplicationProduct = {
  key: string;
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
  productHref: string;
  contactHref: string;
};

export type EnglishApplicationModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type EnglishApplicationGroup = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: EnglishApplicationModule[];
};

export type EnglishApplicationPageData = {
  queryKey: "application" | "instrument";
  breadcrumb: Array<{ label: string; href?: string }>;
  hero: {
    title: string;
    highlight: string;
    description: string;
    panelTitle: string;
    panelItems: string[];
    backgroundImage?: string;
  };
  groupSectionTitle: string;
  groupSectionDescription: string;
  focusKicker: string;
  moduleSectionTitle: string;
  moduleSectionDescription: string;
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
  groups: EnglishApplicationGroup[];
  products: Record<string, EnglishApplicationProduct>;
};

type PageConfig = Omit<
  EnglishApplicationPageData,
  "groups" | "products" | "queryKey" | "breadcrumb"
> & {
  breadcrumbLabel: string;
  queryKey: "application" | "instrument";
};

const PAGE_CONFIG: Record<EnglishApplicationKind, PageConfig> = {
  "analytical-instruments": {
    breadcrumbLabel: "Analytical Instruments",
    queryKey: "application",
    hero: {
      title: "Fluidic Components for",
      highlight: "Analytical Instruments",
      description:
        "Pumps, valves, probes, fittings, tubing and sensing components for precise sample preparation, reagent handling and instrument fluidics.",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Sample aspiration and metering",
        "Reagent delivery and path switching",
        "Rinsing, drainage and waste handling",
        "Pressure, liquid-level and bubble monitoring",
      ],
    },
    groupSectionTitle: "Instrument Types",
    groupSectionDescription:
      "Choose an instrument type to review its principal fluidic tasks and component requirements.",
    focusKicker: "Current Instrument Priorities",
    moduleSectionTitle: "Fluidic Modules and Product Capabilities",
    moduleSectionDescription:
      "Select a fluidic module to review suitable component categories and configuration considerations.",
    cta: {
      title: "Need help with an analytical instrument fluid path?",
      description:
        "Share the medium, flow range, pressure, connection and control requirements with our engineering team.",
      buttonLabel: "Contact an Engineer",
      href: "/en/contact",
    },
  },
  "environmental-monitoring": {
    breadcrumbLabel: "Environmental Monitoring",
    queryKey: "application",
    hero: {
      title: "Fluidic Components for",
      highlight: "Environmental Monitoring",
      description:
        "Configurable fluidic components for online water analysis, sampling, reagent dosing, rinsing and waste handling.",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Representative sample collection",
        "Stable reagent dosing",
        "Multi-path switching and rinsing",
        "Drainage, filtration and status monitoring",
      ],
    },
    groupSectionTitle: "Monitoring Applications",
    groupSectionDescription:
      "Choose an application to review its fluidic priorities and relevant component categories.",
    focusKicker: "Current Application Priorities",
    moduleSectionTitle: "Fluidic Modules and Product Capabilities",
    moduleSectionDescription:
      "Review the functional modules involved in sample, reagent, cleaning and waste paths.",
    cta: {
      title: "Planning a fluid path for a monitoring system?",
      description:
        "Our engineers can help assess flow, pressure, medium compatibility and connection requirements.",
      buttonLabel: "Contact an Engineer",
      href: "/en/contact",
    },
  },
  ivd: {
    breadcrumbLabel: "IVD",
    queryKey: "instrument",
    hero: {
      title: "IVD Fluidic System",
      highlight: "Solutions",
      description:
        "Fluidic component support for biochemistry, immunoassay, hematology, coagulation and molecular diagnostic instruments.",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Sample aspiration and reagent dispensing",
        "Multi-channel path switching",
        "Rinsing, drainage and waste handling",
        "Pressure, liquid-level and bubble monitoring",
      ],
    },
    groupSectionTitle: "Instrument Types",
    groupSectionDescription:
      "Choose an IVD instrument type to review its fluidic priorities and component requirements.",
    focusKicker: "Current Instrument Priorities",
    moduleSectionTitle: "Fluidic Modules and Product Capabilities",
    moduleSectionDescription:
      "Select a fluidic module to review suitable components and configuration considerations.",
    cta: {
      title: "Have a specific IVD fluidic requirement?",
      description:
        "Share the instrument type, medium, flow range, pressure and connection requirements with our engineering team.",
      buttonLabel: "Submit an Application Request",
      href: "/en/contact",
    },
  },
  "lab-automation": {
    breadcrumbLabel: "Laboratory Automation",
    queryKey: "application",
    hero: {
      title: "Fluidic Components for",
      highlight: "Laboratory Automation",
      description:
        "Precision liquid handling components for automated workstations, plate handling, sample preparation and reagent dispensing.",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Accurate aspiration and dispensing",
        "Reagent and buffer distribution",
        "Plate washing and waste removal",
        "Modular fluid-path integration",
      ],
    },
    groupSectionTitle: "Automation Applications",
    groupSectionDescription:
      "Choose an automation workflow to review its fluidic priorities and component requirements.",
    focusKicker: "Current Workflow Priorities",
    moduleSectionTitle: "Fluidic Modules and Product Capabilities",
    moduleSectionDescription:
      "Review component categories for liquid transfer, routing, rinsing and system monitoring.",
    cta: {
      title: "Building an automated liquid-handling workflow?",
      description:
        "Our engineers can help evaluate component combinations for your throughput and fluid requirements.",
      buttonLabel: "Contact an Engineer",
      href: "/en/contact",
    },
  },
  "life-science": {
    breadcrumbLabel: "Life Science",
    queryKey: "application",
    hero: {
      title: "Fluidic Components for",
      highlight: "Life Science Instruments",
      description:
        "Fluidic components for genomics, cell culture, sample preparation and other automated life science workflows.",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Low-volume sample handling",
        "Media, buffer and reagent delivery",
        "Closed transfer and path switching",
        "Rinsing, waste handling and monitoring",
      ],
    },
    groupSectionTitle: "Application Types",
    groupSectionDescription:
      "Choose a life science workflow to review its fluidic priorities and relevant components.",
    focusKicker: "Current Application Priorities",
    moduleSectionTitle: "Fluidic Modules and Product Capabilities",
    moduleSectionDescription:
      "Review component categories for sample, reagent, transfer, cleaning and waste paths.",
    cta: {
      title: "Need support for a life science fluid path?",
      description:
        "Share the application, medium, volume, pressure and connection requirements with our engineering team.",
      buttonLabel: "Contact an Engineer",
      href: "/en/contact",
    },
  },
  "synthetic-biology": {
    breadcrumbLabel: "Synthetic Biology",
    queryKey: "application",
    hero: {
      title: "Fluidic Components for",
      highlight: "Synthetic Biology",
      description:
        "Configurable components for automated construction, screening, feeding, sampling and compact bioprocess systems.",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Media and additive feeding",
        "Online sampling and transfer",
        "Multi-path routing and rinsing",
        "Process monitoring and waste handling",
      ],
    },
    groupSectionTitle: "Synthetic Biology Systems",
    groupSectionDescription:
      "Choose a system type to review its fluidic priorities and component requirements.",
    focusKicker: "Current System Priorities",
    moduleSectionTitle: "Fluidic Modules and Product Capabilities",
    moduleSectionDescription:
      "Review component categories for feeding, sampling, routing, monitoring and cleaning.",
    cta: {
      title: "Designing a synthetic biology fluid path?",
      description:
        "Our engineering team can help evaluate component combinations and fluid-path requirements.",
      buttonLabel: "Contact an Engineer",
      href: "/en/contact",
    },
  },
};

const PRODUCT_COPY: Record<
  string,
  Pick<EnglishApplicationProduct, "name" | "ability" | "advantage" | "solves">
> = {
  syringePump: {
    name: "Syringe Pump",
    ability: "Controlled aspiration, holding and dispensing for precise liquid handling.",
    advantage: "Supports programmable bidirectional liquid movement and controlled delivery.",
    solves: "Helps manage low-volume transfer, aspiration and dispense steps.",
  },
  pistonPump: {
    name: "Plunger Pump",
    ability: "Repeatable metering for high-frequency liquid dispensing.",
    advantage: "Provides consistent volumetric delivery in automated workflows.",
    solves: "Helps maintain repeatable dosing across repeated operating cycles.",
  },
  sampleNeedle: {
    name: "Sampling and Dispensing Probes",
    ability: "Front-end liquid access for sample aspiration and reagent dispensing.",
    advantage: "Probe configurations can be selected for the vessel and workflow geometry.",
    solves: "Provides a controlled liquid interface at the aspiration or dispense position.",
  },
  solenoidValve: {
    name: "Solenoid Valve",
    ability: "Fast on-off control for reagent, cleaning and waste paths.",
    advantage: "Supports compact automated flow-path control.",
    solves: "Controls individual fluid paths during dosing, rinsing and drainage cycles.",
  },
  rotaryValve: {
    name: "Rotary Valve",
    ability: "Centralized switching among multiple fluid channels.",
    advantage: "Combines multiple routing functions in a compact valve assembly.",
    solves: "Reduces the complexity of multi-reagent and multi-waste path selection.",
  },
  pinchValve: {
    name: "Pinch Valve",
    ability: "Non-contact on-off control for flexible tubing paths.",
    advantage: "The fluid remains inside the tubing during valve operation.",
    solves: "Supports isolated flow control where wetted-valve contact is undesirable.",
  },
  diaphragmPump: {
    name: "Diaphragm Pump",
    ability: "Liquid transfer, rinsing and waste removal at higher flow rates.",
    advantage: "Suitable for continuous transfer and drainage duties.",
    solves: "Provides fluid movement for cleaning and waste-handling circuits.",
  },
  fittingsTubing: {
    name: "Fittings and Tubing",
    ability: "Sealed connections and material-compatible fluid routing.",
    advantage: "Multiple connection and material options support system integration.",
    solves: "Connects pumps, valves, probes and sensors into a complete fluid path.",
  },
  sensors: {
    name: "Pressure, Level and Bubble Sensing",
    ability: "Fluid-path status detection and abnormal-condition feedback.",
    advantage: "Adds monitoring points to critical sections of the fluid path.",
    solves: "Helps identify pressure, liquid-level and bubble-related conditions.",
  },
  checkFilter: {
    name: "Check Valves and Filters",
    ability: "Backflow prevention, particle filtration and component protection.",
    advantage: "Protects critical fluidic components from reverse flow and particles.",
    solves: "Reduces contamination, blockage and backflow risks in key paths.",
  },
};

const GROUP_LABELS: Record<string, string> = {
  biochemicalAnalyzer: "Biochemistry Analyzer",
  immunoassayAnalyzer: "Immunoassay Analyzer",
  hematologyAnalyzer: "Hematology Analyzer",
  coagulationAnalyzer: "Coagulation Analyzer",
  molecularDiagnostics: "Molecular Diagnostics",
  genomics: "Genomics and Sample Preparation",
  cellCulture: "Cell Culture and Cell Therapy",
  proteinAnalysis: "Protein Analysis",
  organoid: "Organoid and 3D Culture",
  microBioreactor: "Microbioreactor",
  biofoundry: "Automated Construction and Screening Platform",
  feedingControl: "Feeding and Culture Control System",
  onlineSampling: "Online Sampling and Process Analysis",
  bioProcessIntegration: "Compact Bioprocess Integration",
};

const MODULE_LABELS: Record<string, string> = {
  samplePrep: "Sample Preparation",
  washElution: "Washing and Elution",
  pathManagement: "Path Management",
  fluidDrive: "Liquid Transfer",
  moduleConnection: "Module Connections",
  tubeControl: "Tubing Control",
  pretreatment: "Sample Pretreatment",
  filtration: "Filtration and Protection",
  protection: "Backflow Protection",
  monitoring: "Process Monitoring",
  switching: "Path Switching",
  waste: "Drainage and Rinsing",
  sampling: "Sampling",
  feeding: "Liquid Feeding",
  pipetting: "Pipetting and Dispensing",
  reagent: "Reagent Dispensing",
  plate: "Microplate Handling",
  connection: "Low-Residual Connections",
  transfer: "Liquid Transfer",
  media: "Media Delivery",
};

function humanizeKey(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function localizeHref(href: string | undefined, fallback: string) {
  if (!href) {
    return fallback;
  }

  if (/^(?:https?:|mailto:|tel:|#)/.test(href) || href.startsWith("/en/")) {
    return href;
  }

  return href.startsWith("/") ? `/en${href}` : href;
}

function getBackgroundImage(hero: unknown) {
  if (
    typeof hero === "object" &&
    hero !== null &&
    "backgroundImage" in hero &&
    typeof hero.backgroundImage === "string"
  ) {
    return hero.backgroundImage;
  }

  return undefined;
}

function translateParam(value: string) {
  const replacements: Array<[RegExp, string]> = [
    [/分配误差/g, "dispensing error "],
    [/重复精度/g, "repeatability "],
    [/额定流量/g, "rated flow "],
    [/无刷电机寿命/g, "brushless motor service life "],
    [/管外径/g, "tube OD "],
    [/管内径/g, "tube ID "],
    [/工作压力/g, "operating pressure "],
    [/最大压力/g, "maximum pressure "],
    [/最高压力/g, "maximum pressure "],
    [/流量范围/g, "flow range "],
    [/行程/g, "stroke "],
    [/流量/g, "flow "],
    [/压力/g, "pressure "],
    [/真空/g, "vacuum "],
    [/寿命/g, "service life "],
    [/体积/g, "volume "],
    [/精度/g, "accuracy "],
    [/通道/g, "channels "],
    [/接口/g, "port "],
    [/材质/g, "material "],
    [/温度/g, "temperature "],
    [/速度/g, "speed "],
    [/可选/g, "optional "],
    [/最高/g, "up to "],
    [/最大/g, "maximum "],
    [/最小/g, "minimum "],
  ];

  let translated = value;

  for (const [pattern, replacement] of replacements) {
    translated = translated.replace(pattern, replacement);
  }

  translated = translated
    .replace(/[\u3400-\u9fff]+/g, " ")
    .replace(/[，；：。、“”]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return /[A-Za-z0-9]/.test(translated)
    ? translated
    : "Application-specific configuration";
}

function createProduct(
  key: string,
  source: SourceProduct | undefined
): EnglishApplicationProduct {
  const copy = PRODUCT_COPY[key] ?? {
    name: humanizeKey(key),
    ability: "Configurable fluidic functionality for automated instruments.",
    advantage: "Supports integration into application-specific fluid paths.",
    solves: "Provides a configurable component option for the selected fluidic module.",
  };

  const params = (source?.params ?? [])
    .map(translateParam)
    .filter((value, index, values) => values.indexOf(value) === index);

  return {
    key,
    ...copy,
    params: params.length > 0 ? params : ["Application-specific configuration"],
    productHref: localizeHref(source?.productHref, "/en/products"),
    contactHref: localizeHref(source?.contactHref, "/en/contact"),
  };
}

export function createEnglishApplicationData(
  kind: EnglishApplicationKind,
  source: ApplicationSourceData
): EnglishApplicationPageData {
  const config = PAGE_CONFIG[kind];
  const sourceProducts = source.productAbilities ?? source.products ?? {};
  const sourceGroups = source.instruments ?? source.applications ?? [];
  const products = Object.fromEntries(
    Object.entries(sourceProducts).map(([key, product]) => [
      key,
      createProduct(key, product),
    ])
  );

  const groups = sourceGroups.map((group, groupIndex) => {
    const groupTitle = GROUP_LABELS[group.key] ?? humanizeKey(group.key);
    const modules = (group.modules ?? []).map((module, moduleIndex) => {
      const moduleTitle = MODULE_LABELS[module.key] ?? humanizeKey(module.key);
      const productKeys = (module.products ?? []).filter((key) => products[key]);
      const productNames = productKeys.map((key) => products[key].name);

      return {
        key: module.key,
        index: module.index ?? String(moduleIndex + 1).padStart(2, "0"),
        navLabel: moduleTitle,
        navSubtitle:
          productNames.slice(0, 3).join(" / ") || "Configurable fluidic components",
        title: moduleTitle,
        description: `Review the component categories used for ${moduleTitle.toLowerCase()} in ${groupTitle.toLowerCase()} workflows.`,
        tags: productNames.slice(0, 4),
        products: productKeys,
      };
    });

    return {
      key: group.key,
      index: group.index ?? String(groupIndex + 1).padStart(2, "0"),
      title: groupTitle,
      summary: "Fluidic workflow and component overview",
      focusTitle: `${groupTitle} Fluidic Priorities`,
      focusSummary:
        "Component selection should account for liquid properties, target volume, flow, pressure, connection geometry and maintenance requirements.",
      focusPoints: [
        "Stable liquid metering and transfer",
        "Reliable path switching and sealing",
        "Compatible wetted materials and connections",
        "Accessible cleaning, monitoring and maintenance",
      ],
      modules,
    };
  });

  return {
    queryKey: config.queryKey,
    breadcrumb: [
      { label: "Home", href: "/en" },
      { label: "Applications", href: "/en/applications" },
      { label: config.breadcrumbLabel },
    ],
    hero: {
      ...config.hero,
      backgroundImage: getBackgroundImage(source.hero),
    },
    groupSectionTitle: config.groupSectionTitle,
    groupSectionDescription: config.groupSectionDescription,
    focusKicker: config.focusKicker,
    moduleSectionTitle: config.moduleSectionTitle,
    moduleSectionDescription: config.moduleSectionDescription,
    cta: config.cta,
    groups,
    products,
  };
}
