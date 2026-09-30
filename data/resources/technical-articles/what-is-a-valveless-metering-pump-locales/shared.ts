import { getValvelessPumpPath } from "@/data/products/selection/valveless-pump-routes";
import type { TechnicalArticleLocale } from "../technical-articles.types";

export const valvelessMeteringPumpOverviewCoverImage =
  "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp";

export function getValvelessMeteringPumpOverviewArticleHref(
  locale: TechnicalArticleLocale,
  slug: string,
) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return `${prefix}/resources/technical-articles/${slug}/`;
}

export function getValvelessMeteringPumpOverviewProductHref(
  locale: TechnicalArticleLocale,
  slug?: string,
) {
  return getValvelessPumpPath(locale, slug);
}
