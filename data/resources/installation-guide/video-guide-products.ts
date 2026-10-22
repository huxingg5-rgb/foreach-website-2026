import { getDiaphragmPumpReferenceModel } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";
import { diaphragmPumpSelectionProducts } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { pipettingPumpSelectionProducts } from "@/data/products/selection/pipetting-pump-selection.generated";
import { getPipettingModelPath } from "@/data/products/selection/pipetting-pump-routes";
import { probeIntrosEn } from "@/data/products/selection/probe-control-selection.en";
import type { ArticleRelatedProduct } from "@/services/resources/technical-articles/getArticleRelatedProducts";

// Existing official photographs, inspected for identity and orientation on 2026-10-21.
// The dpl60 "front" file shows a 300 mL/min label, so it must not be used here.
const pumpPhotos: Record<string, string> = {
  "dpl30-bb": "dpl30/images/dpl30-brushless-liquid-diaphragm-pump-front-port-view.webp",
  "dpl60-db": "dpl60/images/foreach-dpl60-600ml-min-brushed-miniature-liquid-diaphragm-pump-front-side.webp",
  "dpl60-bb": "dpl60/images/foreach-dpl60-600ml-min-brushless-pwm-miniature-liquid-diaphragm-pump-front-side.webp",
  "dpl30h-bs": "dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-supply-pump.webp",
  "dpl30h-ds": "dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-pressurized-liquid-transfer-pump.webp",
  "dpgl800-bs": "dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-gas-liquid-diaphragm-pump.webp",
};

/** Resolve card text and canonical URLs from the published product sources. */
export function getVideoGuideProduct(key: string): ArticleRelatedProduct {
  const reference = getDiaphragmPumpReferenceModel(key);
  if (reference) {
    const product = diaphragmPumpSelectionProducts.find(item => reference.selectionProductIds.includes(item.productId));
    if (!product?.imageCard) throw new Error(`Missing video pump image: ${key}`);
    return {
      id: reference.slug,
      title: reference.model,
      href: getDiaphragmPumpPath("en", reference.slug, { trailingSlash: true }),
      imageSrc: pumpPhotos[key] ? `/images/products/pumps/diaphragm-pumps/${pumpPhotos[key]}` : product.imageCard,
      imageAlt: `${reference.model} miniature diaphragm pump, representative ${pumpPhotos[key] ? "product photograph" : "product view"}`,
      imageFill: true,
    };
  }
  if (key === "sampling-probes") {
    const copy = probeIntrosEn["sampling-probes"];
    return { id: key, title: "Sampling Probes for Liquid Handling", href: "/en/products/probes/selection/sampling-probes/",
      imageSrc: copy.image.src, imageAlt: copy.image.alt, imageFill: true };
  }
  if (key === "smtp2-1000ul") {
    const product = pipettingPumpSelectionProducts.find(item => item.detailSlug === key);
    const href = getPipettingModelPath("en", key);
    if (!product?.imageCard || !href) throw new Error(`Missing video pipetting product: ${key}`);
    return { id: key, title: product.cardTitle.en, href, imageSrc: product.imageCard,
      imageAlt: "SMTP2 1000 microliter air-displacement pipetting pump", imageFill: true };
  }
  throw new Error(`Unknown video product key: ${key}`);
}

export function videoProductLinks(keys: readonly string[]) {
  return keys.map(key => {
    const { title, href } = getVideoGuideProduct(key);
    return { title, href };
  });
}
