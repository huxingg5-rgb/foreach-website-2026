import { tpuTubingVariants } from "@/data/products/configurator/tpu-tubing";
import { getThreadBarbSelection } from "@/data/products/detail/thread-to-barbed-selection.zh";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";

export type TpuGuideVariant = {
  id: string;
  model: string;
  productCode: string;
  hardness: string;
  innerDiameter: number;
  outerDiameter: number;
  wall: number;
  color: string;
};

export type TpuGuideBarb = {
  model: string;
  href: string;
  profile: string;
  tubeId: number;
  crest: number;
  thread: string;
};

export type TpuSelectionGuideData = {
  variants: TpuGuideVariant[];
  barbs: TpuGuideBarb[];
};

/** Run on the route: send only current TPU sizes and published, dimensioned SA candidates. */
export function getTpuSelectionGuideData(): TpuSelectionGuideData {
  const variants = tpuTubingVariants.map((variant) => {
    const innerDiameter = Number(variant.attributes.innerDiameter);
    const outerDiameter = Number(variant.attributes.outerDiameter);
    return {
      id: variant.id,
      model: variant.model,
      productCode: String(variant.productCode),
      hardness: String(variant.attributes.hardness),
      innerDiameter,
      outerDiameter,
      wall: Number(((outerDiameter - innerDiameter) / 2).toFixed(3)),
      color: String(variant.attributes.color),
    };
  }).sort((a, b) => a.innerDiameter - b.innerDiameter || a.outerDiameter - b.outerDiameter);

  const tubeIds = new Set(variants.map((variant) => variant.innerDiameter));
  const barbs = FITTING_PUBLISHED_PRODUCTS.flatMap((product) => {
    if (product.productTypeId !== "thread-to-barbed-fittings" || !/^SA-.*-PP-N$/.test(product.foreachModel)) return [];
    const detail = getThreadBarbSelection({ model: product.foreachModel });
    if (!detail || !detail.crest || !tubeIds.has(detail.tubeId) || !["D", "F"].includes(detail.profile)) return [];
    return [{
      model: product.foreachModel,
      href: `${product.detailHref.replace(/\/$/, "")}/`,
      profile: detail.profile,
      tubeId: detail.tubeId,
      crest: detail.crest,
      thread: detail.threadLabel,
    }];
  });

  return { variants, barbs };
}
