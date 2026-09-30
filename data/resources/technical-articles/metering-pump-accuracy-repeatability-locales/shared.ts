import { getValvelessPumpPath } from "@/data/products/selection/valveless-pump-routes";
import type { TechnicalArticleLocale } from "../technical-articles.types";

export const meteringPumpAccuracyRepeatabilityCoverImage =
  "/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-pump.webp";

export function getMeteringPumpAccuracyRepeatabilityArticleHref(
  locale: TechnicalArticleLocale,
  slug: string,
) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return `${prefix}/resources/technical-articles/${slug}/`;
}

export function getMeteringPumpAccuracyRepeatabilityProductHref(
  locale: TechnicalArticleLocale,
) {
  return getValvelessPumpPath(locale);
}
