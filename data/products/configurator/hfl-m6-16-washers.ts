// A02 Chinese tubing/fittings catalog: p.8 compatibility; p.12 washer SKUs.
// This catalog is intentionally limited to the HFL-M6-16-PV-N pilot.
export const HFL_WASHER_PILOT = {
  slug: "hfl-m6-16-pv-n",
  model: "HFL-M6-16-PV-N",
  productCode: "809032",
  detailHref: "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n/",
  thread: "M6×1",
  tubeOuterDiameter: 1.6,
  material: "PVDF",
  color: "本色",
} as const;

export const HFL_PILOT_WASHERS = [
  { productCode: "809215", model: "WS-46-18-08-SS-N", material: "SUS", materialLabel: "SUS 不锈钢", outerDiameter: 4.6, innerDiameter: 1.8, thickness: 0.8 },
  { productCode: "809216", model: "WS-46-18-09-PK-N", material: "PEEK", materialLabel: "PEEK", outerDiameter: 4.6, innerDiameter: 1.8, thickness: 0.9 },
  { productCode: "809217", model: "WS-46-18-09-PT-N", material: "PTFE", materialLabel: "PTFE", outerDiameter: 4.6, innerDiameter: 1.8, thickness: 0.9 },
] as const;

export type HflWasherCode = typeof HFL_PILOT_WASHERS[number]["productCode"];
export type HflWasherChoice = "none" | HflWasherCode;

export function getHflPilotWasher(choice: HflWasherChoice | null) {
  return HFL_PILOT_WASHERS.find(washer => washer.productCode === choice);
}

export function isHflWasherPilot(data: { slug?: string; productCode?: string }, locale: string) {
  return locale === "zh" && data.slug === HFL_WASHER_PILOT.slug && data.productCode === HFL_WASHER_PILOT.productCode;
}

// Validate the accessory itself as well as its source; do not relax the normal
// published-product filter for arbitrary fittings or arbitrary custom items.
export function isHflPilotWasherCartItem(item: {
  sourceType: string;
  productCode: string;
  foreachModel?: string;
  detailHref?: string;
}) {
  // The existing shared product-detail cart uses this source for all products.
  return item.sourceType === "pump-selection"
    && item.detailHref === HFL_WASHER_PILOT.detailHref
    && HFL_PILOT_WASHERS.some(washer =>
      washer.productCode === item.productCode && washer.model === item.foreachModel);
}
