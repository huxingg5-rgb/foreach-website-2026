import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { getTubingAssemblySelectionContent } from "./localized";
import type { TubingAssemblyLocale } from "./locales";

const pfaAssemblyImages = {
  "tubing-assembly-pfa-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-pfa-flanged-square.webp",
  "tubing-assembly-retaining-ring-pfa": "/images/products/tubing-assemblies/related/tubing-assembly-retaining-ring-pfa-square.webp",
  "tubing-assembly-pfa-ferrule": "/images/products/tubing-assemblies/related/tubing-assembly-pfa-ferrule-square.webp",
} as const;

const pfaAssemblyIds = Object.keys(pfaAssemblyImages) as (keyof typeof pfaAssemblyImages)[];

/** PFA tubing assemblies shown on the PFA tubing detail page and related content. */
export function getPfaTubingAssemblyRelatedProducts(
  locale: TubingAssemblyLocale = "zh-CN",
): RelatedResourcesData["products"] {
  const cards = getTubingAssemblySelectionContent(locale).cards;
  return pfaAssemblyIds.flatMap((id) => {
    const card = cards.find((item) => item.productId === id);
    if (!card?.detailHref) return [];
    return [{
      id,
      title: card.cardTitle,
      href: card.detailHref,
      imageSrc: pfaAssemblyImages[id],
      imageAlt: card.imageAlt,
      imageAspectRatio: 1,
    }];
  });
}
