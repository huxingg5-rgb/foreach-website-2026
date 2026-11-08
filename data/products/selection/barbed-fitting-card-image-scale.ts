import type { ProductSelectionProduct } from "./product-selection.types";

// Visual size cues for listing cards, not a physical scale drawing. Keep small
// fittings legible and leave room around larger fittings, including on hover.
const SIZE_SCALES = [
  [1.6, 0.6],
  [2.4, 0.72],
  [3.2, 0.84],
  [4, 0.86],
  [4.8, 0.88],
  [6.4, 0.9],
  [7.9, 0.91],
  [9.5, 0.92],
  [12.7, 0.94],
  [16, 0.95],
] as const;

function parseTubeId(value: unknown): number {
  const match = String(value ?? "").trim().match(/^(\d+(?:\.\d+)?)\s*mm$/i);
  return match ? Number(match[1]) : 0;
}

export function getBarbedFittingCardImageScale(product: ProductSelectionProduct) {
  const isThreadToBarbed = product.productTypeId === "thread-to-barbed-fittings";
  if (product.productTypeId !== "barbed-fittings" && !isThreadToBarbed) return undefined;

  const ports = Array.isArray(product.portValues) ? product.portValues : [];
  const portSizes = ports.map(parseTubeId).filter((size) => size > 0);
  // Thread-to-barb records have an explicit tube-ID field. Their legacy
  // portValues can describe generic ports rather than the selected barb size.
  const sizes = isThreadToBarbed
    ? [parseTubeId(product.tubingInnerDiameter) || parseTubeId(product.filters?.filter04)].filter(size => size > 0)
    : portSizes.length ? portSizes : ["filter02", "filter03", "filter04"]
    .map((key) => parseTubeId(product.filters?.[key]))
    .filter((size) => size > 0);
  if (!sizes.length) return undefined;

  // Reducing fittings and tees use their largest tube connection.
  const size = Math.max(...sizes);
  if (size <= SIZE_SCALES[0][0]) return SIZE_SCALES[0][1];
  for (let index = 1; index < SIZE_SCALES.length; index += 1) {
    const [upperSize, upperScale] = SIZE_SCALES[index];
    if (size <= upperSize) {
      const [lowerSize, lowerScale] = SIZE_SCALES[index - 1];
      return lowerScale + (upperScale - lowerScale) * (size - lowerSize) / (upperSize - lowerSize);
    }
  }
  return SIZE_SCALES[SIZE_SCALES.length - 1][1];
}
