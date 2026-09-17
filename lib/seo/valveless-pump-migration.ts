import { getValvelessPumpPath, VALVELESS_PUMP_MODEL_SLUGS } from "../../data/products/selection/valveless-pump-routes";

/** Exact legacy model URLs only. Local Next.js and Cloudflare share this source. */
export function getValvelessPumpRedirectEntries() {
  return ["zh", "en", "es", "fr", "ko", "ru"].flatMap(locale =>
    VALVELESS_PUMP_MODEL_SLUGS.map(slug => ({
      source: `${locale === "zh" ? "" : `/${locale}`}/products/pumps/valveless-pumps/${slug}`,
      destination: getValvelessPumpPath(locale, slug),
      statusCode: 301 as const,
    })));
}
