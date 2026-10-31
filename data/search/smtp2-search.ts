import { getSmtp2VariantCopy, smtp2Variants } from "../products/detail/smtp2-variant-content";
import { getPipettingModelPath } from "../products/selection/pipetting-pump-routes";
import type { SiteSearchItem } from "./site-search.types";

const isSmtp2Model = (href: string) => /\/pipetting-pumps\/(?:smtp2-programmable-pipetting-module\/)?smtp2-(?:1000ul|500|510|520)\/?$/.test(href);
const normalize = (value: string) => value.toUpperCase().replace(/[\s\-_/.,，。:：;；()（）[\]{}'"“”‘’]+/g, "");

export function replaceSmtp2SearchItems(items: SiteSearchItem[]): SiteSearchItem[] {
  return [...items.filter(item => item.module !== "products" || !isSmtp2Model(item.href)), ...smtp2Variants.map(variant => {
    const copy = getSmtp2VariantCopy(variant.slug, "zh")!;
    return { id: `product:pipetting-${variant.slug}`, module: "products" as const,
      title: variant.model, subtitle: copy.heading, description: copy.meta,
      href: getPipettingModelPath("zh", variant.slug)!, image: variant.cardImage,
      model: variant.model, productCode: variant.model,
      keywords: [variant.model, variant.adapter, `${variant.lengthMm} mm`, copy.keyword, getSmtp2VariantCopy(variant.slug, "en")!.keyword],
    };
  })];
}

type CompactItem = {m: string; t: string; h: string; x: string; s?: string; d?: string; i?: string; k?: string; a?: string};
export function replaceSmtp2CompactItems<T extends CompactItem>(items: T[], locale: string): T[] {
  const old = items.find(item => item.m === "products" && isSmtp2Model(item.h));
  return [...items.filter(item => item.m !== "products" || !isSmtp2Model(item.h)), ...smtp2Variants.map(variant => {
    const copy = getSmtp2VariantCopy(variant.slug, locale)!;
    const keywords = [variant.model, variant.adapter, `${variant.lengthMm} mm`, copy.keyword].map(normalize).join("|");
    return { m: "products", t: variant.model, s: copy.heading, d: copy.meta,
      h: getPipettingModelPath("zh", variant.slug)!, i: variant.cardImage,
      x: `${keywords}|${normalize(copy.heading)}|${normalize(copy.meta)}`, k: keywords, a: old?.a,
    } as T;
  })];
}
