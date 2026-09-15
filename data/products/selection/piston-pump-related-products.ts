import type { ProductSelectionProduct } from "./product-selection.types";

type PistonPumpModelTuple = readonly [
  series: "EA" | "SM" | "TM",
  capacity: string,
  material: "PMMA" | "PEEK",
];

const pistonPumpModels: readonly PistonPumpModelTuple[] = [
  ["EA", "500", "PMMA"],
  ["EA", "500", "PEEK"],
  ["SM", "100", "PMMA"],
  ["TM", "100", "PMMA"],
  ["EA", "100", "PMMA"],
  ["EA", "100", "PEEK"],
  ["EA", "250", "PMMA"],
  ["EA", "250", "PEEK"],
  ["EA", "1000", "PMMA"],
  ["EA", "1000", "PEEK"],
  ["EA", "2500", "PMMA"],
  ["EA", "2500", "PEEK"],
  ["EA", "5000", "PMMA"],
  ["EA", "5000", "PEEK"],
  ["EA", "10000", "PMMA"],
  ["EA", "10000", "PEEK"],
  ["SM", "50", "PMMA"],
  ["SM", "100", "PEEK"],
  ["SM", "250", "PMMA"],
  ["SM", "250", "PEEK"],
  ["SM", "500", "PMMA"],
  ["SM", "1000", "PMMA"],
  ["TM", "50", "PMMA"],
  ["TM", "250", "PMMA"],
  ["TM", "500", "PMMA"],
];

function localizedModelName(model: string) {
  return {
    zh: model,
    en: model,
    es: model,
    fr: model,
    ko: model,
    ru: model,
  };
}

export const pistonPumpRelatedProducts: ProductSelectionProduct[] =
  pistonPumpModels.map(([series, capacity, material], index) => {
    const seriesSlug = series.toLowerCase();
    const materialSlug = material.toLowerCase();
    const model = `${series}-${capacity}-${material}`;
    const detailSlug = `${seriesSlug}-${capacity}-${materialSlug}`;

    return {
      productId: `pump-${seriesSlug}-${capacity}ul-${materialSlug}`,
      id: `pump-${seriesSlug}-${capacity}ul-${materialSlug}`,
      relationKeys: [`series:${seriesSlug}`],
      relationPriority: Math.max(1, 100 - index),
      categoryId: "pumps",
      categorySlug: "pumps",
      productTypeId: "plunger-pump",
      productTypeSlug: "piston-pump",
      seriesId: seriesSlug,
      detailSlug,
      detailHref: `/products/pumps/piston-pump/${detailSlug}`,
      cardTitle: localizedModelName(model),
      imageCard: `/images/products/pumps/plunger-pump/${seriesSlug}/pump-${seriesSlug}-${capacity}ul-${materialSlug}.webp`,
      imageAlt: localizedModelName(model),
      status: "active",
    };
  });
