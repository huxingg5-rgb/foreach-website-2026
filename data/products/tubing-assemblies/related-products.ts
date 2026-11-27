import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { getTubingAssemblySelectionContent } from "./localized";
import type { TubingAssemblyDetailLocale } from "./locales";
import { getGermanTubingAssemblySelectionContent } from "./selection.de";
import { getGermanDraftLink } from "@/lib/i18n/draft-languages";

// Lead the piston-pump carousel with a mix of connection types and tubing materials.
const assemblyImages = {
  "tubing-assembly-fep-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-fep-flanged-square.webp",
  "tubing-assembly-retaining-ring-pfa": "/images/products/tubing-assemblies/related/tubing-assembly-retaining-ring-pfa-square.webp",
  "tubing-assembly-ptfe-ferrule": "/images/products/tubing-assemblies/ferrule-kits/ptfe/foreach-ptfe-ferrule-tubing-assembly-front-angle.webp",
  "tubing-assembly-black-ptfe-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-black-ptfe-flanged-square.webp",
  "tubing-assembly-pfa-ferrule": "/images/products/tubing-assemblies/related/tubing-assembly-pfa-ferrule-square.webp",
  "tubing-assembly-retaining-ring-fep": "/images/products/tubing-assemblies/retaining-ring-kits/fep/foreach-fep-retaining-ring-tubing-assembly-white-mirrored.webp",
  "tubing-assembly-ptfe-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-ptfe-flanged-square.webp",
  "tubing-assembly-black-ptfe-ferrule": "/images/products/tubing-assemblies/ferrule-kits/black-ptfe/foreach-black-ptfe-ferrule-tubing-assembly-front-angle.webp",
  "tubing-assembly-pfa-flanged": "/images/products/tubing-assemblies/related/tubing-assembly-pfa-flanged-square.webp",
  "tubing-assembly-fep-ferrule": "/images/products/tubing-assemblies/related/tubing-assembly-fep-ferrule-square.webp",
  "tubing-assembly-retaining-ring-black-ptfe": "/images/products/tubing-assemblies/selection/black-ptfe-retaining-ring-kits-guide-photo.webp",
} as const;

type AssemblyProductId = keyof typeof assemblyImages;

export function getTubingAssemblyRelatedProducts(
  locale: TubingAssemblyDetailLocale,
  ids: readonly AssemblyProductId[],
): RelatedResourcesData["products"] {
  const cards = locale === "de" ? getGermanTubingAssemblySelectionContent().cards : getTubingAssemblySelectionContent(locale).cards;
  return ids.flatMap((id) => {
    const card = cards.find((item) => item.productId === id);
    if (!card?.detailHref) return [];
    const link = locale === "de" ? getGermanDraftLink(card.detailHref) : { href: card.detailHref, hrefLang: undefined };
    return [{
      id,
      title: card.cardTitle,
      href: link.href,
      destinationLanguage: link.hrefLang,
      imageSrc: assemblyImages[id],
      imageAlt: card.imageAlt,
      imageAspectRatio: 1,
    }];
  });
}

export function getPfaTubingAssemblyRelatedProducts(locale: TubingAssemblyDetailLocale = "zh-CN") {
  return getTubingAssemblyRelatedProducts(locale, [
    "tubing-assembly-pfa-flanged",
    "tubing-assembly-retaining-ring-pfa",
    "tubing-assembly-pfa-ferrule",
  ]);
}

export function getPistonPumpTubingAssemblyRelatedProducts(locale: TubingAssemblyDetailLocale) {
  const ids = Object.keys(assemblyImages) as AssemblyProductId[];
  return getTubingAssemblyRelatedProducts(locale, ids);
}
