import { hindiPipettingDetailText } from "@/data/products/detail/instrument-pumps.hi";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { italianPipettingText } from "@/data/products/detail/pipetting-pump-detail.it";
import { germanPipettingText } from "@/data/products/detail/pipetting-pump-detail.de";
import { getPipettingModelPath } from "@/data/products/selection/pipetting-pump-routes";
import { getPipettingCardCopy } from "@/data/products/selection/pipetting-pump-cards.locales";
import { instrumentCardsZh } from "@/data/products/selection/instrument-fluidics-copy.zh";
import { getSmtp2VariantCopy } from "@/data/products/detail/smtp2-variant-content";
import { getSmtp4ModelCopy } from "@/data/products/detail/smtp4-model-content";
export function getPipettingModelMetadata(locale: string, model: string): Metadata {
  const german = locale === "de";
  const italian = locale === "it";
  const hindi = locale === "hi";
  const sourceLocale = german || italian || hindi ? "en" : locale;
  const variant = getSmtp2VariantCopy(model, sourceLocale);
  const smtp4 = getSmtp4ModelCopy(model, sourceLocale);
  const card = variant || (locale === "zh" || locale === "zh-CN" ? instrumentCardsZh[model] : getPipettingCardCopy(sourceLocale as "en", model));
  const canonical = getPipettingModelPath(locale, model);
  if (!card || !canonical) return {};
  const title = variant?.title || smtp4?.title || `${model.toUpperCase().replace("UL", " μL")} | ${card.heading} | FOREACH`;
  const description = variant?.meta || smtp4?.meta || card.heading;
  if (german || italian || hindi) {
    const text = hindi ? hindiPipettingDetailText : italian ? italianPipettingText : germanPipettingText;
    const url = getCanonicalUrl(canonical);
    const localizedTitle = text(title);
    const localizedDescription = text(description);
    return { title: { absolute: localizedTitle }, description: localizedDescription, robots: { index: false, follow: true },
      alternates: { canonical: url }, openGraph: { type: "website", url, locale: hindi ? "hi_IN" : italian ? "it_IT" : "de_DE", title: localizedTitle, description: localizedDescription,
        ...(variant ? { images: [{ url: variant.image, alt: text(variant.imageAlt) }] } : {}) },
    };
  }
  const languages = Object.fromEntries(["zh", "en", "es", "fr", "ko", "ru"].map(l => [l === "zh" ? "zh-CN" : l, getPipettingModelPath(l, model)!]));
  return {title:{absolute:title},description,robots:{index:true,follow:true},alternates:{canonical,languages:{...languages,"x-default":getPipettingModelPath("zh",model)!}},openGraph:{type:"website",url:canonical,title,description, ...(variant ? {images:[{url:variant.image,alt:variant.imageAlt}]} : {})}};
}
