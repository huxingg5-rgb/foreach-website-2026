import { reviewProductCards, type ReviewProductCardId } from '../english-review-resources';
import { localizeIvdHref, type IvdLocale } from './routes';

// Existing product-gallery photographs, scoped to the localized IVD pages.
// Series/category links show a representative configuration, not every option.
const productPhotos: Partial<Record<ReviewProductCardId, string>> = {
  "dpl30": "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-2-wire-real-product-photo.webp",
  "dpl60": "/images/products/pumps/diaphragm-pumps/dpl60/images/foreach-dpl60-600ml-min-brushed-miniature-liquid-diaphragm-pump-front-side.webp",
  "dpl30h": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-probe-wash-pump.webp",
  "dpgl": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-vacuum-pump.webp",
  "mrv": "/images/products/valves/rotary-valves/foreach-rotary-valve-24-channel-assembly.webp",
  "sv": "/images/products/valves/solenoid-valves/foreach-6010-3-way-assembly.webp",
  "pdm": "/images/products/control/foreach-pdm5-pressure-sensor-front.webp",
  "fittings": "/images/products/fittings/hard-tube-fittings/photos/flat-bottom-fitting-body-and-seal-comparison.webp",
  "tubing": "/images/products/tubing/foreach-tubing-series.webp"
};

export function getIvdProductCardImage(key: ReviewProductCardId) {
  return productPhotos[key] ?? reviewProductCards[key].image;
}

// Footer recommendations prefer existing white-background product photography.
// Keep the in-article photographs and their display settings independent.
const relatedProductPhotos: Partial<Record<ReviewProductCardId, string>> = {
  sv: reviewProductCards.sv.image,
  fittings: '/images/products/fittings/hard-tube-fittings/photos/flat-bottom-fitting-knurled-body-variant-closeup.webp',
};

export function getIvdRelatedProductCardImage(key: ReviewProductCardId) {
  return relatedProductPhotos[key] ?? getIvdProductCardImage(key);
}

export function getIvdProductLinkImageScales(locale: IvdLocale) {
  // This photograph includes white bands at the top and bottom; trim only its background.
  return { [localizeIvdHref(reviewProductCards.fittings.href, locale)]: 1.1 };
}

export function getIvdProductLinkImages(locale: IvdLocale) {
  return Object.fromEntries((Object.keys(reviewProductCards) as ReviewProductCardId[]).map(key => [
    localizeIvdHref(reviewProductCards[key].href, locale), getIvdProductCardImage(key),
  ]));
}
