import { pipettingPumpSelectionProducts } from "../products/selection/pipetting-pump-selection.generated";
import { getPipettingCardCopy } from "../products/selection/pipetting-pump-cards.locales";
import { instrumentCardsZh } from "../products/selection/instrument-fluidics-copy.zh";
import { getPipettingModelPath } from "../products/selection/pipetting-pump-routes";
import type { SelectionLocale } from "../products/selection/product-selection.types";
import type { SiteSearchItem } from "./site-search.types";
import { getSmtp4ModelCopy } from "../products/detail/smtp4-model-content";

const cards = pipettingPumpSelectionProducts.filter(item => item.detailSlug?.startsWith("smtp4-"));
const isSmtp4Model = (href: string) => /\/pipetting-pumps\/(?:smtp4-pipetting-module\/)?smtp4-(?:100|250|500)ul\/?$/.test(href);
const normalize = (value: string) => value.toUpperCase().replace(/[\s\-_/.,，。:：;；()（）[\]{}'"“”‘’]+/g, "");
function copy(slug: string, locale: string) {
  return locale === "zh" || locale === "zh-CN" ? instrumentCardsZh[slug] : getPipettingCardCopy(locale as SelectionLocale, slug)!;
}
export function replaceSmtp4SearchItems(items: SiteSearchItem[]): SiteSearchItem[] {
  return [...items.filter(item => item.module !== "products" || !isSmtp4Model(item.href)), ...cards.map(card => {
    const slug = card.detailSlug!, text = copy(slug, "zh");
    return { id: `product:pipetting-${slug}`, module: "products" as const, title: text.model,
      subtitle: text.heading, description: getSmtp4ModelCopy(slug, "zh")!.meta, href: getPipettingModelPath("zh", slug)!,
      image: card.imageCard, model: text.model, productCode: text.model,
      keywords: [text.model, text.heading, copy(slug, "en").heading],
    };
  })];
}
type CompactItem = {m:string;t:string;h:string;x:string;s?:string;d?:string;i?:string;k?:string;a?:string};
export function replaceSmtp4CompactItems<T extends CompactItem>(items: T[], locale: string): T[] {
  const old = items.find(item => item.m === "products" && isSmtp4Model(item.h));
  return [...items.filter(item => item.m !== "products" || !isSmtp4Model(item.h)), ...cards.map(card => {
    const slug = card.detailSlug!, text = copy(slug, locale), keywords = normalize(text.model);
    const description = getSmtp4ModelCopy(slug, locale)!.meta;
    return {m:"products", t:text.model, s:text.heading, d:description, h:getPipettingModelPath("zh",slug)!,
      i:card.imageCard, x:`${keywords}|${normalize(text.heading)}|${normalize(description)}`, k:keywords, a:old?.a} as T;
  })];
}
