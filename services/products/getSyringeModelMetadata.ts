import type { Metadata } from "next";
import { getSyringeModelPath, syringeModelRoutes } from "@/data/products/selection/syringe-pump-routes";
import { instrumentCardsZh } from "@/data/products/selection/instrument-fluidics-copy.zh";
import { syringePumpCardsLocales } from "@/data/products/selection/syringe-pump-cards.locales";
export function getSyringeModelMetadata(locale: string, legacy: string): Metadata {
 const card = locale === "zh" ? instrumentCardsZh[legacy] : syringePumpCardsLocales[locale]?.[legacy];
 const r = syringeModelRoutes.find(r => r.legacy === legacy);
 if (!card || !r) return {};
 const title = r.model.toUpperCase() + " | " + card.heading + " | FOREACH";
 const canonical = getSyringeModelPath(locale, legacy)!;
 const languages = Object.fromEntries(["zh", "en", "es", "fr", "ko", "ru"].map(l => [l === "zh" ? "zh-CN" : l === "en" ? "en-US" : l, getSyringeModelPath(l, legacy)!]));
 return {title:{absolute:title},description:card.heading,robots:{index:true,follow:true},alternates:{canonical,languages:{...languages,"x-default":getSyringeModelPath("zh",legacy)!}},openGraph:{type:"website",url:canonical,title,description:card.heading},twitter:{card:"summary",title,description:card.heading}};
}
