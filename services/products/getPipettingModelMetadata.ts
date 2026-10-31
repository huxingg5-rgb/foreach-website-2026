import type { Metadata } from "next";
import { getPipettingModelPath } from "@/data/products/selection/pipetting-pump-routes";
import { getPipettingCardCopy } from "@/data/products/selection/pipetting-pump-cards.locales";
import { instrumentCardsZh } from "@/data/products/selection/instrument-fluidics-copy.zh";
import { getSmtp2VariantCopy } from "@/data/products/detail/smtp2-variant-content";
import { getSmtp4ModelCopy } from "@/data/products/detail/smtp4-model-content";
export function getPipettingModelMetadata(locale: string, model: string): Metadata {
  const variant = getSmtp2VariantCopy(model, locale);
  const smtp4 = getSmtp4ModelCopy(model, locale);
  const card = variant || (locale === "zh" || locale === "zh-CN" ? instrumentCardsZh[model] : getPipettingCardCopy(locale as "en", model));
  const canonical = getPipettingModelPath(locale, model);
  if (!card || !canonical) return {};
  const title = variant?.title || smtp4?.title || `${model.toUpperCase().replace("UL", " μL")} | ${card.heading} | FOREACH`;
  const description = variant?.meta || smtp4?.meta || card.heading;
  const languages = Object.fromEntries(["zh", "en", "es", "fr", "ko", "ru"].map(l => [l === "zh" ? "zh-CN" : l, getPipettingModelPath(l, model)!]));
  return {title:{absolute:title},description,robots:{index:true,follow:true},alternates:{canonical,languages:{...languages,"x-default":getPipettingModelPath("zh",model)!}},openGraph:{type:"website",url:canonical,title,description, ...(variant ? {images:[{url:variant.image,alt:variant.imageAlt}]} : {})}};
}
