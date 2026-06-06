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
    id: "plunger-pump",
    category: "pump",
    keywords: "plunger pump piston pump precision metering dispensing",
    title: "Plunger Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For high-precision metering, dispensing, and liquid handling in automated analytical instruments.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/FOREACH_Plunger_Pump_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "valveless-pump",
    category: "pump",
    keywords: "valveless pump micro-volume metering dispensing",
    title: "Valveless Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For micro-volume liquid metering applications that reduce valve usage and improve system reliability.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-valveless-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/FOREACH_Valveless_Pump_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "diaphragm-pump",
    category: "pump",
    keywords: "diaphragm pump self-priming supply washing waste liquid",
    title: "Diaphragm Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For small-flow liquid supply, self-priming transfer, washing liquid delivery, and automated fluidic systems.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-diaphragm-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/FOREACH_Diaphragm_Pump_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "high-pressure-pump",
    category: "pump",
    keywords: "high pressure pump precision transfer pressure resistant",
    title: "High Pressure Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For high-pressure fluid control, precision liquid transfer, and pressure-resistant fluidic applications.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/FOREACH_High_Pressure_Pump_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "syringe-pump",
    category: "pump",
    keywords: "syringe pump multi-channel metering dispensing",
    title: "Syringe Pump Datasheet",
    label: "Pumps",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For high-precision μL–mL level metering, dispensing, and multi-channel liquid handling.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Pumps/FOREACH_Syringe_Pump_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "rotary-valve",
    category: "valve",
    keywords: "rotary valve multi-port flow path switching",
    title: "Rotary Valve Datasheet",
    label: "Valves",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For multi-channel flow path switching, reagent distribution, and complex fluidic system integration.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-rotary-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Valves/FOREACH_Rotary_Valve_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "high-pressure-valve",
    category: "valve",
    keywords: "high pressure valve pressure resistant flow switching",
    title: "High Pressure Valve Datasheet",
    label: "Valves",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For high-pressure liquid path switching, pressure-resistant control, and precision fluid management.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Valves/FOREACH_High_Pressure_Valve_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "solenoid-valve",
    category: "valve",
    keywords: "solenoid valve on off control flow path switching",
    title: "Solenoid Valve Datasheet",
    label: "Valves",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For on/off control and flow path switching of samples, reagents, and washing liquids in microfluidic systems.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-solenoid-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Valves/FOREACH_Solenoid_Valve_Datasheet_A01.pdf",
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
    productHref: "#",
    downloadHref: "/en/contact?type=custom-probe",
    actionType: "custom",
  },
  {
    id: "tubing-fitting",
    category: "tubing",
    keywords: "tubing fittings connectors rigid tubing flexible tubing assemblies",
    title: "Tubing & Fittings Datasheet",
    label: "Tubing & Fittings",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For tubing connection, rigid and flexible tubing assemblies, and common fitting solutions in microfluidic systems.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-tubing-fitting-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Tubing-and-Fittings/FOREACH_Tubing_and_Fittings_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "pressure-sensor",
    category: "smart",
    keywords: "pressure sensor fluid pressure monitoring smart control module",
    title: "Pressure Sensor Datasheet",
    label: "Smart Control Modules",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For fluid pressure monitoring, system status feedback, and automated control integration.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-pressure-sensor-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Smart-Control-Modules/FOREACH_Pressure_Sensor_Datasheet_A01.pdf",
    actionType: "download",
  },
  {
    id: "bubble-detector",
    category: "smart",
    keywords: "bubble detector air bubble detection smart control module",
    title: "Bubble Detector Datasheet",
    label: "Smart Control Modules",
    language: "English",
    version: "A01",
    update: "2026-05",
    description:
      "For bubble detection, abnormal fluid status monitoring, and system safety control in liquid paths.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-bubble-detector-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/en/Smart-Control-Modules/FOREACH_Bubble_Detector_Datasheet_A01.pdf",
    actionType: "download",
  },
]; 