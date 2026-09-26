import type { Metadata } from "next";
import { getPipettingModelPath } from "@/data/products/selection/pipetting-pump-routes";
import { getPipettingCardCopy } from "@/data/products/selection/pipetting-pump-cards.locales";
import { instrumentCardsZh } from "@/data/products/selection/instrument-fluidics-copy.zh";
export function getPipettingModelMetadata(locale: string, model: string): Metadata {
  const card = locale === "zh" || locale === "zh-CN" ? instrumentCardsZh[model] : getPipettingCardCopy(locale as "en", model);
  const canonical = getPipettingModelPath(locale, model);
  if (!card || !canonical) return {};
  const title = `${model.toUpperCase().replace("UL", " μL")} | ${card.heading} | FOREACH`;
  const languages = Object.fromEntries(["zh", "en", "es", "fr", "ko", "ru"].map(l => [l === "zh" ? "zh-CN" : l, getPipettingModelPath(l, model)!]));
  return {title:{absolute:title},description:card.heading,robots:{index:true,follow:true},alternates:{canonical,languages:{...languages,"x-default":getPipettingModelPath("zh",model)!}},openGraph:{type:"website",url:canonical,title,description:card.heading}};
}
