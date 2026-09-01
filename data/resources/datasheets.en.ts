/* =========================================================
   datasheets.en.ts
   FOREACH Website｜Resources｜Datasheets｜English Data

   File path:
   data/resources/datasheets.en.ts

   Purpose:
   1. Store all English data for the datasheets page
   2. Include page copy, banner image, filter options, and datasheet items
   3. Keep page structure and interaction logic out of this file
   4. When adding new English datasheets later, update this file first
========================================================= */

import type {
  DatasheetFilterOption,
  DatasheetItem,
} from "./datasheets.zh";

/* ================================
   English page text
================================ */

export const datasheetsEnPageText = {
  seo: {
    title: "Datasheets｜Resources｜FOREACH",
    description:
      "Download FOREACH product datasheets for microfluidic pumps, valves, tubing, fittings, probes, and smart control modules.",
  },

  hero: {
    title: "Datasheets",
    description:
      "Find and download FOREACH product datasheets for pumps, valves, tubing, fittings, and smart control modules, and quickly review key specifications, materials, interfaces, and application information.",

    image:
      "/images/resource/datasheets/banner/resource-datasheet-banner-1920x800-v001.webp",

    imageAlt: "FOREACH resources datasheets page banner",
  },

  breadcrumb: {
    home: "Home",
    homeHref: "/en",
    resources: "Resources",
    resourcesHref: "/en/resources",
    current: "Datasheets",
  },

  search: {
    placeholder:
      "Search by product name or keyword, such as plunger pump, rotary valve, pressure sensor, tubing and fittings",
    buttonText: "Search",
  },

  section: {
    title: "Product Datasheets",
    description:
      "This page currently includes product datasheets only. Probe products support drawing-based customization. Product drawings are recommended to be placed on corresponding product detail pages.",
    resultPrefix: "",
    resultSuffix: "resources",
    emptyTitle: "No matching resources found",
    emptyDescription:
      "Try searching by product name, keyword, or product category. If you still cannot find the required document, please submit a document request and our team will assist you.",
  },

  labels: {
    language: "Language",
    version: "Version",
    update: "Updated",
    fieldSeparator: ": ",
    viewProduct: "View Product",
    download: "Download",
    custom: "Custom Request",
  },

  support: {
    kicker: "Need Support",
    title: "Cannot find the datasheet you need?",
    description:
      "Submit the product name, application scenario, or document request. We will help you obtain the corresponding datasheet and provide selection or technical support if needed.",
    buttonText: "Submit Request",
    buttonHref: "/en/contact?type=datasheet",
  },
};

/* ================================
   English filter options
================================ */

export const datasheetEnFilterOptions: DatasheetFilterOption[] = [
  { label: "All", value: "all" },
  { label: "Pumps", value: "pump" },
  { label: "Valves", value: "valve" },
  { label: "Probes", value: "needle" },
  { label: "Tubing & Fittings", value: "tubing" },
  { label: "Smart Control Modules", value: "smart" },
];

/* ================================
   English datasheet list
================================ */

export const datasheetEnItems: DatasheetItem[] = [
  {
    id: "ea-piston-pump",
    category: "pump",
    keywords: "EA piston pump plunger pump precision metering dispensing 50 uL 20 mL",
    title: "EA Piston Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "EA piston pumps for precise metering, dispensing, and automated liquid handling across capacities from 50 µL to 20 mL.",
    image:
      "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
    productHref: "/en/products/pumps/plunger-pumps/ea-standard-piston-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00001-001-en-ea-piston-pump.pdf",
    actionType: "download",
  },
  {
    id: "eas-piston-pump",
    category: "pump",
    keywords: "EAS piston pump plunger pump easy deaeration priming bubble removal",
    title: "EAS Piston Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "EAS easy-deaeration piston pumps for precise liquid handling where fast priming and efficient bubble removal are important.",
    image:
      "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
    productHref: "/en/products/pumps/plunger-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf",
    actionType: "download",
  },
  {
    id: "sm-piston-pump",
    category: "pump",
    keywords: "SM piston pump compact plunger pump miniature instrument reagent dosing",
    title: "SM Piston Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "Compact SM piston pumps for precise small-volume dosing and integration into miniature automated instruments.",
    image:
      "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
    productHref: "/en/products/pumps/plunger-pumps/sm-miniature-piston-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00004-001-en-sm-piston-pump.pdf",
    actionType: "download",
  },
  {
    id: "rpl-p635-p15-valveless-pump",
    category: "pump",
    keywords: "RPL P6.35 P15 valveless pump ceramic piston 50 1200 uL",
    title: "RPL-P6.35 / RPL-P15 Valveless Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "A combined datasheet for RPL-P6.35 and RPL-P15 valveless pumps, covering precision metering ranges from 50 µL to 1200 µL.",
    image:
      "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp",
    productHref: "/en/products/pumps/valveless-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-121b-2507-00001-001-en-rpl-valveless-pump.pdf",
    actionType: "download",
  },
  {
    id: "smtp2-smtp4-pipetting-pump",
    category: "pump",
    keywords: "SMTP2 SMTP4 pipetting pump air displacement automatic tip ejection liquid level detection",
    title: "SMTP2 / SMTP4 Pipetting Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "A combined datasheet for SMTP2 and SMTP4 air-displacement pipetting pumps used in automated sample and reagent handling.",
    image:
      "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
    productHref: "/en/products/pumps/pipetting-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-130a-2507-00001-001-en-smtp2-smtp4-pipetting-pump.pdf",
    actionType: "download",
  },
  {
    id: "hld3-syringe-pump",
    category: "pump",
    keywords: "HLD3 syringe pump rotary valve 30 mm stroke precision liquid handling",
    title: "HLD3 Syringe Pump with Rotary Valve Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "HLD3 syringe pump with a 30 mm stroke and rotary-valve configurations for precise liquid handling.",
    image:
      "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp",
    productHref: "/en/products/pumps/syringe-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-130b-2507-00001-001-en-hld3-syringe-pump-rotary-valve.pdf",
    actionType: "download",
  },
  {
    id: "hld6-syringe-pump",
    category: "pump",
    keywords: "HLD6 syringe pump rotary valve 60 mm stroke precision liquid handling",
    title: "HLD6 Syringe Pump with Rotary Valve Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "HLD6 syringe pump with a 60 mm stroke and rotary-valve configurations for µL-to-mL liquid handling.",
    image:
      "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.webp",
    productHref: "/en/products/pumps/syringe-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-130b-2507-00002-001-en-hld6-syringe-pump-rotary-valve.pdf",
    actionType: "download",
  },
  {
    id: "hmd3-syringe-pump",
    category: "pump",
    keywords: "HMD3 syringe pump solenoid valve 30 mm stroke multi-channel",
    title: "HMD3 Syringe Pump with Solenoid Valve Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "HMD3 syringe pump with a 30 mm stroke and integrated solenoid-valve configurations for automated dispensing.",
    image:
      "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp",
    productHref: "/en/products/pumps/syringe-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-130b-2507-00003-001-en-hmd3-syringe-pump-solenoid-valve.pdf",
    actionType: "download",
  },
  {
    id: "hmd6-syringe-pump",
    category: "pump",
    keywords: "HMD6 syringe pump solenoid valve 60 mm stroke multi-channel",
    title: "HMD6 Syringe Pump with Solenoid Valve Datasheet",
    label: "Pumps",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "HMD6 syringe pump with a 60 mm stroke and integrated solenoid valves for multi-channel liquid handling.",
    image:
      "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp",
    productHref: "/en/products/pumps/syringe-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/ps-130b-2507-00004-001-en-hmd6-syringe-pump-solenoid-valve.pdf",
    actionType: "download",
  },
  {
    id: "dpl30-diaphragm-pump",
    category: "pump",
    keywords: "DPL30 diaphragm pump 300 mL min self priming liquid transfer",
    title: "DPL30 Diaphragm Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A03",
    update: "2026-08",
    description:
      "DPL30 diaphragm pump for compact liquid-transfer applications, with flow rates up to 300 mL/min.",
    image:
      "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp",
    productHref:
      "/en/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/PS-150B-2507-00001_A03_en_DPL30 Diaphragm Pump Specification Sheet.pdf",
    actionType: "download",
  },
  {
    id: "dpl60-diaphragm-pump",
    category: "pump",
    keywords: "DPL60 diaphragm pump 600 mL min self priming liquid transfer",
    title: "DPL60 Diaphragm Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A00",
    update: "2026-07",
    description:
      "DPL60 diaphragm pump for liquid supply and transfer applications, with flow rates up to 600 mL/min.",
    image:
      "/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp",
    productHref:
      "/en/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/PS-150B-2607-00001_A00_en_DPL60 Diaphragm Pump Specification Sheet.pdf",
    actionType: "download",
  },
  {
    id: "dpgl800-diaphragm-pump",
    category: "pump",
    keywords: "DPGL800 diaphragm pump gas liquid 6 L min vacuum aspiration",
    title: "DPGL800 Diaphragm Pump Specification Sheet",
    label: "Pumps",
    language: "English",
    version: "A00",
    update: "2026-08",
    description:
      "DPGL800 gas-liquid diaphragm pump for gas and gas-liquid aspiration, vacuum generation, and waste-fluid removal.",
    image:
      "/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp",
    productHref:
      "/en/products/pumps/miniature-diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/PS-150B-2608-00005_A00_en_DPGL800 Diaphragm Pump Specification Sheet.pdf",
    actionType: "download",
  },
  {
    id: "mrv3-multi-channel-rotary-valve",
    category: "valve",
    keywords: "MRV3 multi-channel rotary valve multi-port flow path switching",
    title: "MRV3 Multi-Channel Rotary Valve Datasheet",
    label: "Valves",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "MRV3 multi-channel rotary valve for multi-port flow-path switching, reagent distribution, and fluidic integration.",
    image:
      "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",
    productHref: "/en/products/valves/rotary-valves",
    downloadHref:
      "/downloads/resources/datasheets/en/Valves/ps-120c-2507-00003-001-en-mrv3-multi-channel-rotary-valve.pdf",
    actionType: "download",
  },
  {
    id: "hp-2-position-6-port-high-pressure-valve",
    category: "valve",
    keywords: "HP 2-position 6-port vent high-pressure valve pressure resistant switching",
    title: "HP 2-Position, 6-Port with Vent High-Pressure Valve Datasheet",
    label: "Valves",
    language: "English",
    version: "001",
    update: "2026-04",
    description:
      "HP 2-position, 6-port high-pressure valve with a vent path for pressure-resistant liquid-path switching.",
    image:
      "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    productHref: "/en/products/valves/high-pressure-valves",
    downloadHref:
      "/downloads/resources/datasheets/en/Valves/ps-120c-2604-00001-001-en-hp-2-position-6-port-with-vent-high-pressure-valve.pdf",
    actionType: "download",
  },
  {
    id: "6010-solenoid-valve",
    category: "valve",
    keywords: "6010 SV10 solenoid valve substrate threaded barbed 2-way 3-way",
    title: "6010 Solenoid Valve Datasheet",
    label: "Valves",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "6010 solenoid valve datasheet covering substrate, threaded, and barbed configurations for 2-way and 3-way control.",
    image:
      "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
    productHref: "/en/products/valves/solenoid-valves",
    downloadHref:
      "/downloads/resources/datasheets/en/Valves/ps-122a-2507-00001-001-en-6010-solenoid-valve.pdf",
    actionType: "download",
  },
  {
    id: "fittings-and-tubing-catalog",
    category: "tubing",
    keywords: "fittings tubing connectors catalog rigid flexible tubing assemblies",
    title: "Fittings & Tubing Catalog",
    label: "Tubing & Fittings",
    language: "English",
    version: "A02",
    update: "—",
    description:
      "A combined English catalog covering FOREACH fittings, connectors, rigid tubing, flexible tubing, and tubing assemblies.",
    image:
      "/images/products/fittings/barbed-fittings/products/ba-16c-pa-w-main.jpg",
    productHref: "/en/products/fittings",
    downloadHref:
      "/downloads/resources/datasheets/en/Tubing-and-Fittings/fittings-and-tubing-catalog-a02.pdf",
    actionType: "download",
  },
  {
    id: "abd-air-bubble-detector",
    category: "smart",
    keywords: "ABD air bubble detector liquid detector tubing Modbus RTU TTL",
    title: "ABD Air Bubble Detector Datasheet",
    label: "Smart Control Modules",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "ABD non-contact air-bubble and liquid detector for transparent tubing, with TTL communication and Modbus RTU support.",
    image:
      "/images/products/control/foreach-abd-air-bubble-detector.webp",
    productHref: "/en/products/control/abd-air-bubble-detector",
    downloadHref:
      "/downloads/resources/datasheets/en/Smart-Control-Modules/ps-110b-2507-00001-001-en-abd-air-bubble-detector.pdf",
    actionType: "download",
  },
  {
    id: "pdm5-pressure-sensor",
    category: "smart",
    keywords: "PDM5 pressure sensor user manual I2C fluid pressure monitoring",
    title: "PDM5 Pressure Sensor User Manual",
    label: "Smart Control Modules",
    language: "English",
    version: "001",
    update: "2025-07",
    description:
      "PDM5 pressure sensor user manual covering installation, I2C communication, specifications, and fluid-pressure monitoring.",
    image:
      "/images/products/control/foreach-pdm5-pressure-sensor.webp",
    productHref: "/en/products/control/pdm5-pressure-sensor",
    downloadHref:
      "/downloads/resources/datasheets/en/Smart-Control-Modules/ps-110b-2507-00002-001-en-pdm5-pressure-sensor-user-manual.pdf",
    actionType: "download",
  },
  {
    id: "sample-probe",
    category: "needle",
    keywords: "sample probe probe custom drawing-based customization",
    title: "Probe Series",
    label: "Probes",
    language: "—",
    version: "—",
    update: "—",
    description:
      "Datasheet is not currently available. Drawing-based customization is supported based on drawings or samples.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-sample-probe-v001.webp",
    productHref: "/en/products/probes",
    downloadHref: "/en/contact?type=custom-probe",
    actionType: "custom",
  },
];
