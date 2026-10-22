import {getSolenoidContent, solenoidConfigurations} from "../products/detail/solenoid-content";
import type {SiteSearchItem} from "./site-search.types";
export const isSolenoidSearchHref = (href: string) => /^\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/valves\/solenoid-valves(?:\/|[?#]|$)/.test(href);
export function buildSolenoidSearchItems(locale: string): SiteSearchItem[] {
  const lang = locale === "zh-CN" ? "zh" : locale;
  return ["solenoid-valves", ...solenoidConfigurations.map(c => c.slug)].map(slug => {
    const c = getSolenoidContent(slug, lang)!;
    return {id: `solenoid:${slug}`, module: "products", title: c.title, subtitle: c.modelName, description: c.seoDescription,
      href: c.detailHref, image: c.imageCard || "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
      keywords: [c.cardName, c.modelName, c.specs[2].value, c.specs[3].value, ...c.searchTerms, "SV10", "6010"], model: c.modelName};
  });
}
export function replaceSolenoidSearchItems(items: SiteSearchItem[], locale: string) {
  return [...items.filter(i => i.module !== "products" || !isSolenoidSearchHref(i.href)), ...buildSolenoidSearchItems(locale)];
}
export function buildCompactSolenoidSearchItems(locale: string) {
  return buildSolenoidSearchItems(locale).map(i => ({m: "products" as const, t: i.title, s: i.subtitle, d: i.description, h: i.href, i: i.image, x: [i.title, i.subtitle, i.description, ...i.keywords].join(" ").toLowerCase(), k: i.keywords.join(" ").toLowerCase()}));
}
