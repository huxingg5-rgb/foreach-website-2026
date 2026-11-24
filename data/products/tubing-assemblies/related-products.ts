import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { getTubingAssemblySelectionContent } from "./localized";
import type { TubingAssemblyLocale } from "./locales";

const assemblyImages = {
  "tubing-assembly-fep-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-fep-flanged-square.webp",
  "tubing-assembly-ptfe-ferrule": "/images/products/tubing-assemblies/ferrule-kits/ptfe/foreach-ptfe-ferrule-tubing-assembly-front-angle.webp",
  "tubing-assembly-pfa-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-pfa-flanged-square.webp",
  "tubing-assembly-retaining-ring-pfa": "/images/products/tubing-assemblies/related/tubing-assembly-retaining-ring-pfa-square.webp",
  "tubing-assembly-pfa-ferrule": "/images/products/tubing-assemblies/related/tubing-assembly-pfa-ferrule-square.webp",
} as const;

export function getTubingAssemblyRelatedProducts(
  locale: TubingAssemblyLocale,
  ids: readonly (keyof typeof assemblyImages)[],
): RelatedResourcesData["products"] {
  const cards = getTubingAssemblySelectionContent(locale).cards;
  return ids.flatMap((id) => {
    const card = cards.find((item) => item.productId === id);
    if (!card?.detailHref) return [];
    return [{
      id,
      title: card.cardTitle,
      href: card.detailHref,
      imageSrc: assemblyImages[id],
      imageAlt: card.imageAlt,
      imageAspectRatio: 1,
    }];
  });
}

/** PFA tubing assemblies shown on the PFA tubing detail page and related content. */
export function getPfaTubingAssemblyRelatedProducts(locale: TubingAssemblyLocale = "zh-CN") {
  return getTubingAssemblyRelatedProducts(locale, [
    "tubing-assembly-pfa-flanged",
    "tubing-assembly-retaining-ring-pfa",
    "tubing-assembly-pfa-ferrule",
  ]);
}
