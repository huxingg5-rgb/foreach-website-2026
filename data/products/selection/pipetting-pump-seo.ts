import { getPipettingSeriesSlug } from "./pipetting-pump-routes";
import { instrumentIntrosZh, instrumentSeriesIntrosZh } from "./instrument-fluidics-copy.zh";
import { pipettingPumpIntroEn } from "./pipetting-pump-intro.en";
import translated from "./pipetting-pump-intro.locales.json";

export const pipettingLocales = ["zh", "en", "es", "fr", "ko", "ru"] as const;
export const pipettingSeriesSlugs = ["smtp2", "smtp4"] as const;
export const pipettingSeriesFilters = ["SMTP2 可编程气体置换式移液泵", "SMTP4 气体置换式移液泵"];
export type PipettingPageKey = "category" | "smtp2" | "smtp4";
type Copy = { title: string; paragraphs: string[]; seoTitle: string; description: string };
const meta = {
  zh: {
    category: ["气体置换式移液泵与移液模块 | 恒永达 FOREACH", "比较恒永达 SMTP2、SMTP4 气体置换式移液泵，提供 100、500、1000 μL 标称容量，按样本转移、试剂添加及检测控制需求选型。"],
    smtp2: ["SMTP2 可编程移液泵：液面与堵塞检测 | 恒永达 FOREACH", "SMTP2-1000 μL 集成驱动控制、液面、堵塞和吸头检测及自动脱吸头，提供 RS-232、RS-485、CAN 通讯配置，用于自动化仪器集成。"],
    smtp4: ["SMTP4 气体置换式移液泵：100 与 500 μL | 恒永达 FOREACH", "比较 SMTP4 100 μL、500 μL 移液泵，用于样本转移、分装及试剂添加，支持自动脱吸头，由设备配套驱动、运动轴与流程控制。"]
  },
  en: {
    category: ["Air Displacement Pipetting Modules | SMTP2 & SMTP4 | FOREACH", "Compare SMTP2 and SMTP4 air displacement pipetting modules in 100, 500 and 1000 μL configurations for sample transfer, reagent dispensing and OEM integration."],
    smtp2: ["SMTP2 Pipetting Modules with Liquid-Level Detection | FOREACH", "SMTP2 1000 μL programmable pipetting modules integrate drive, control, liquid-level, blockage and tip detection, with automatic tip ejection for OEM instruments."],
    smtp4: ["SMTP4 Air Displacement Pipetting Modules, 100 & 500 μL | FOREACH", "Compare SMTP4 100 and 500 μL pipetting modules for sample transfer and reagent addition, with automatic tip ejection and instrument-provided drive and control."]
  }
};

export function isPipettingPageKey(key: string): key is PipettingPageKey {
  return key === "category" || key === "smtp2" || key === "smtp4";
}
export function getPipettingPath(locale: string, key: PipettingPageKey = "category") {
  return `${locale === "zh" || locale === "zh-CN" ? "" : `/${locale}`}/products/pumps/pipetting-pumps/${key === "category" ? "" : `${getPipettingSeriesSlug(key)}/`}`;
}
export function getPipettingCopy(locale: string, key: PipettingPageKey = "category"): Copy & {imageAlt: string} {
  const lang = locale === "zh-CN" ? "zh" : locale;
  if (lang === "zh" || lang === "en") {
    const copy = lang === "en" ? pipettingPumpIntroEn[key] : key === "category" ? instrumentIntrosZh["pipette-pump"] : instrumentSeriesIntrosZh[pipettingSeriesFilters[key === "smtp2" ? 0 : 1]];
    return {...copy, seoTitle: meta[lang][key][0], description: meta[lang][key][1], imageAlt: lang === "zh" ? "恒永达 SMTP2 与 SMTP4 气体置换式移液泵" : "FOREACH SMTP2 and SMTP4 air displacement pipetting modules"};
  }
  const copy = translated[lang as keyof typeof translated]?.[key];
  if (!copy) throw new Error(`Unsupported pipetting locale: ${locale}`);
  return {...copy, imageAlt: `FOREACH SMTP2 / SMTP4 — ${translated[lang as keyof typeof translated].category.title}`};
}
export function getPipettingAlternates(key: PipettingPageKey) {
  return {...Object.fromEntries(pipettingLocales.map(locale => [locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : locale, getPipettingPath(locale, key)])), "x-default": getPipettingPath("zh", key)};
}
