import { getDiaphragmPumpCardPhoto } from "@/data/products/detail/diaphragm-pump-reference-models";
import type { TechnicalArticleLocale } from "../../technical-articles.types";

// Shared assets for the localized "What is a diaphragm pump?" article.
// FOREACH product photos use the same card images as the product category page.
export const imageBase = "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump";
export const dpl30Card = getDiaphragmPumpCardPhoto("dpl30-brushless") ?? "/images/products/pumps/diaphragm-pumps/dpl30/images/foreach-dpl30-bb-brushless-labeled-front-card.webp";
export const dpgl800Card = getDiaphragmPumpCardPhoto("dpgl800-brushless") ?? "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-vacuum-pump.webp";

/** The working-principle diagram has text labels, so each language has its own SVG. */
export function principleDiagram(locale: Exclude<TechnicalArticleLocale, "zh-CN">) {
  return `${imageBase}/diaphragm-pump-working-principle-${locale}.svg`;
}

/** FOREACH flow–pressure curves with axis labels translated per language (curve data unchanged). */
export function dpl30CurveImage(locale: Exclude<TechnicalArticleLocale, "zh-CN">) {
  return `${imageBase}/dpl30-flow-pressure-curve-${locale}.webp`;
}

export function dpgl800CurveImage(locale: Exclude<TechnicalArticleLocale, "zh-CN">) {
  return `${imageBase}/dpgl800-gas-flow-pressure-curve-${locale}.webp`;
}
