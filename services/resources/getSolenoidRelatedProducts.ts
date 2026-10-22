import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import {getSolenoidContent, solenoidConfigurations} from "@/data/products/detail/solenoid-content";
import { getTubingGalleryData } from "@/data/products/tubing/gallery";
import { getTubingDetailPath } from "@/data/products/selection/tubing-selection-routes";

const pvcTitles: Record<RelatedResourcesData["locale"], string> = {
  "zh-CN": "PVC 软管", en: "PVC Tubing", es: "Tubo de PVC",
  fr: "Tube en PVC", ko: "PVC 튜브", ru: "Трубка из PVC",
};

export function getBarbedSolenoidRelatedProducts(locale: RelatedResourcesData["locale"]): RelatedResourcesData["products"] {
  // PVC includes ID 1.6 / 2.0 mm, OD 3.2 / 4.0 mm, 55A options.
  // Current TPU options (80–95A) exceed SV10-B16's recommended 55–65A.
  const gallery = getTubingGalleryData("pvc-tubing", locale)!;
  return [{
    id: "pvc-tubing", title: pvcTitles[locale],
    href: getTubingDetailPath(locale, "pvc-tubing"),
    imageSrc: gallery.additionalImages[0], imageAlt: gallery.additionalImageAlts[0],
  }];
}

export function getSolenoidRelatedProducts(locale: RelatedResourcesData["locale"]): RelatedResourcesData["products"] {
  return solenoidConfigurations.map(c => {
    const copy = getSolenoidContent(c.slug, locale === "zh-CN" ? "zh" : locale)!;
    return {id: c.slug, title: copy.title, href: copy.detailHref, imageSrc: copy.imageCard!, imageAlt: copy.imageAlt!};
  });
}
