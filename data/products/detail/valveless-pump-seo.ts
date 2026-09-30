import { valvelessPumpSelectionProducts } from "../selection/valveless-pump-selection.generated";

// Browser/social titles only. Model identity is read from the same catalog as
// the cards; these concise labels do not replace visible H1 or body copy.
const pumpNames: Record<string, { single: string; dual: string }> = {
  zh: { single: "无阀计量泵", dual: "双头无阀计量泵" },
  en: { single: "Valveless Metering Pump", dual: "Dual-Head Valveless Metering Pump" },
  es: { single: "Bomba dosificadora sin válvulas", dual: "Bomba dosificadora sin válvulas de doble cabezal" },
  fr: { single: "Pompe doseuse sans valve", dual: "Pompe doseuse sans valve à double tête" },
  ko: { single: "무밸브 정량 펌프", dual: "듀얼 헤드 무밸브 정량 펌프" },
  ru: { single: "Бесклапанный дозирующий насос", dual: "Двухголовочный бесклапанный дозирующий насос" },
};

export function getValvelessPumpSeoTitle(slug: string, locale: string): string | undefined {
  const normalizedLocale = locale === "zh-CN" ? "zh" : locale;
  const names = pumpNames[normalizedLocale];
  const product = valvelessPumpSelectionProducts.find(item => item.detailSlug === slug);
  if (!names || !product) return undefined;
  const name = slug.startsWith("drpl-") ? names.dual : names.single;
  const separator = normalizedLocale === "zh" ? "｜" : " | ";
  return `${product.cardTitle.zh} ${name}${separator}FOREACH`;
}
