export const plungerPumpImageAltMap = {
  "EA-100-PMMA": "FOREACH EA-100-PMMA 100 碌L standard piston pump with PMMA pump head for low-volume reagent dispensing and small-volume sample handling in IVD analyzers",
  "EA-100-PEEK": "FOREACH EA-100-PEEK 100 碌L standard piston pump with PEEK pump head for special reagent dispensing and molecular diagnostics liquid handling",
  "EA-250-PMMA": "FOREACH EA-250-PMMA 250 碌L standard piston pump with PMMA pump head for sample dilution and reagent dispensing in biochemistry and immunoassay analyzers",
  "EA-250-PEEK": "FOREACH EA-250-PEEK 250 碌L standard piston pump with PEEK pump head for light-sensitive reagent transfer and high-compatibility fluidic modules",
  "EA-500-PMMA": "FOREACH EA-500-PMMA 500 碌L standard piston pump with PMMA pump head for reagent transfer, sample dilution and buffer dispensing in automated analyzers",
  "EA-500-PEEK": "FOREACH EA-500-PEEK 500 碌L standard piston pump with PEEK pump head for special reagent transfer in molecular diagnostics and analytical instruments",
  "EA-1000-PMMA": "FOREACH EA-1000-PMMA 1000 碌L standard piston pump with PMMA pump head for reagent transfer, diluent addition and buffer dispensing in IVD systems",
  "EA-1000-PEEK": "FOREACH EA-1000-PEEK 1000 碌L standard piston pump with PEEK pump head for light-sensitive reagent handling in molecular diagnostics and life science instruments",
  "EA-2500-PMMA": "FOREACH EA-2500-PMMA 2.5 mL standard piston pump with PMMA pump head for buffer delivery, diluent addition and wash liquid supply in automated analyzers",
  "EA-2500-PEEK": "FOREACH EA-2500-PEEK 2.5 mL standard piston pump with PEEK pump head for special reagent, buffer and wash liquid transfer in analytical instruments",
  "EA-5000-PMMA": "FOREACH EA-5000-PMMA 5 mL standard piston pump with PMMA pump head for wash liquid addition, buffer delivery and line priming in automated analyzers",
  "EA-5000-PEEK": "FOREACH EA-5000-PEEK 5 mL standard piston pump with PEEK pump head for chemically compatible wash liquid, buffer and life science reagent transfer",
  "EA-10000-PMMA": "FOREACH EA-10000-PMMA 10 mL standard piston pump with PMMA pump head for high-volume wash liquid delivery, buffer refill and system rinsing",
  "EA-10000-PEEK": "FOREACH EA-10000-PEEK 10 mL standard piston pump with PEEK pump head for high-volume special liquid, wash liquid and buffer transfer in analytical instruments",

  "SM-50-PMMA": "FOREACH SM-50-PMMA 50 碌L miniature piston pump with PMMA pump head for micro-volume reagent dispensing and sample handling in compact IVD devices",
  "SM-100-PMMA": "FOREACH SM-100-PMMA 100 碌L miniature piston pump with PMMA pump head for POCT analyzers, compact liquid handling modules and sample dilution",
  "SM-100-PEEK": "FOREACH SM-100-PEEK 100 碌L miniature piston pump with PEEK pump head for special reagent handling in compact molecular diagnostics modules",
  "SM-250-PMMA": "FOREACH SM-250-PMMA 250 碌L miniature piston pump with PMMA pump head for compact IVD sample processing and reaction liquid dispensing",
  "SM-250-PEEK": "FOREACH SM-250-PEEK 250 碌L miniature piston pump with PEEK pump head for light-sensitive reagent transfer in compact diagnostic instruments",
  "SM-500-PMMA": "FOREACH SM-500-PMMA 500 碌L miniature piston pump with PMMA pump head for reagent transfer and reaction liquid dispensing in compact automation modules",
  "SM-1000-PMMA": "FOREACH SM-1000-PMMA 1000 碌L miniature piston pump with PMMA pump head for reagent transfer, diluent addition and buffer dispensing in compact instruments",

  "TM-50-PMMA": "FOREACH TM-50-PMMA 50 碌L ultra-compact piston pump with PMMA pump head for portable analyzers and low-volume microfluidic control",
  "TM-100-PMMA": "FOREACH TM-100-PMMA 100 碌L ultra-compact piston pump with PMMA pump head for portable IVD modules and small-volume liquid handling",
  "TM-250-PMMA": "FOREACH TM-250-PMMA 250 碌L ultra-compact piston pump with PMMA pump head for micro-volume reagent transfer and sample processing in compact instruments",
  "TM-500-PMMA": "FOREACH TM-500-PMMA 500 碌L ultra-compact piston pump with PMMA pump head for reagent transfer and compact fluid supply in modular liquid handling systems",
} as const;


export const PLUNGER_PUMP_IMAGE_ALT_BY_PRODUCT_ID = plungerPumpImageAltMap;

export const PLUNGER_PUMP_SERIES_LABELS = {
  EA: "standard piston pump",
  SM: "miniature piston pump",
  TM: "ultra-compact piston pump",
} as const;

export const PLUNGER_PUMP_DEFAULT_APPLICATIONS_BY_SERIES = {
  EA: "precision reagent dispensing, buffer transfer and automated analytical instrument integration",
  SM: "micro-volume reagent dispensing, compact liquid handling and small fluidic module integration",
  TM: "portable analyzer liquid handling, ultra-compact reagent transfer and microfluidic control",
} as const;

export type PlungerPumpImageAltKey = keyof typeof plungerPumpImageAltMap;

export type ProductImageAltInput =
  | string
  | {
      productId?: string;
      model?: string;
      title?: string;
      name?: string;
      slug?: string;
      material?: string;
      series?: string;
      capacity?: string | number;
    };

function normalizeModel(input: ProductImageAltInput): string {
  if (typeof input === "string") {
    return input.trim().toUpperCase();
  }

  return String(
    input.productId ||
      input.model ||
      input.title ||
      input.name ||
      input.slug ||
      ""
  )
    .trim()
    .toUpperCase();
}

function getModelParts(input: ProductImageAltInput) {
  const model = normalizeModel(input);
  const parts = model.split("-");
  const series = parts[0] || "";
  const capacity = Number(parts[1] || 0);
  const material = parts[2] || "";

  return {
    model,
    series,
    capacity,
    material,
  };
}

function formatCapacity(capacity: number): string {
  if (!capacity) return "";
  if (capacity >= 1000) {
    const ml = capacity / 1000;
    return `${Number.isInteger(ml) ? ml : ml.toFixed(1)} mL`;
  }
  return `${capacity} 碌L`;
}

export function getPlungerPumpSeriesPhrase(input: ProductImageAltInput): string {
  const { series } = getModelParts(input);

  if (series === "SM") {
    return "miniature piston pump";
  }

  if (series === "TM") {
    return "ultra-compact piston pump";
  }

  return "standard piston pump";
}

export function getPlungerPumpMaterialPhrase(input: ProductImageAltInput): string {
  const { material } = getModelParts(input);

  if (material === "PEEK") {
    return "with PEEK pump head for chemically compatible and light-sensitive reagent handling";
  }

  if (material === "PMMA") {
    return "with PMMA pump head for common reagent dispensing and automated liquid handling";
  }

  return "for precision fluidic liquid handling";
}

export function getPlungerPumpDefaultApplicationPhrase(): string {
  return "precision fluidic liquid handling, reagent dispensing and automated instrument integration";
}

export function getPlungerPumpApplicationPhrase(input: ProductImageAltInput): string {
  const { series, capacity, material } = getModelParts(input);

  if (series === "SM" || series === "TM") {
    if (capacity <= 100) {
      return "micro-volume reagent dispensing and compact IVD liquid handling";
    }

    if (capacity <= 500) {
      return "compact reagent transfer, sample processing and reaction liquid dispensing";
    }

    return "compact instrument reagent transfer, diluent addition and buffer dispensing";
  }

  if (capacity <= 250) {
    return material === "PEEK"
      ? "special reagent dispensing and molecular diagnostics liquid handling"
      : "low-volume reagent dispensing and small-volume sample handling";
  }

  if (capacity <= 1000) {
    return material === "PEEK"
      ? "special reagent transfer in molecular diagnostics and analytical instruments"
      : "reagent transfer, sample dilution and buffer dispensing in automated analyzers";
  }

  if (capacity <= 5000) {
    return material === "PEEK"
      ? "special reagent, buffer and wash liquid transfer in analytical instruments"
      : "buffer delivery, diluent addition and wash liquid supply in automated analyzers";
  }

  return material === "PEEK"
    ? "high-volume special liquid, wash liquid and buffer transfer in analytical instruments"
    : "high-volume wash liquid delivery, buffer refill and system rinsing";
}

function buildFallbackPlungerPumpAlt(input: ProductImageAltInput): string {
  const { model, capacity } = getModelParts(input);
  const seriesPhrase = getPlungerPumpSeriesPhrase(input);
  const materialPhrase = getPlungerPumpMaterialPhrase(input);
  const applicationPhrase = getPlungerPumpApplicationPhrase(input);
  const capacityText = formatCapacity(capacity);

  if (model) {
    return `FOREACH ${model} ${capacityText ? `${capacityText} ` : ""}${seriesPhrase} ${materialPhrase} for ${applicationPhrase}`;
  }

  return `FOREACH ${seriesPhrase} product image for ${getPlungerPumpDefaultApplicationPhrase()}`;
}

export function getPlungerPumpImageAlt(input: ProductImageAltInput): string {
  const model = normalizeModel(input);

  return (
    plungerPumpImageAltMap[model as PlungerPumpImageAltKey] ||
    buildFallbackPlungerPumpAlt(input)
  );
}