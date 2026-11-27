import { productOverviewHeadings } from "../selection/product-overview-headings";
import copy from "./content.json";
import de from "./content.de.json";
import it from "./content.it.json";
import hi from "./content.hi.json";

const germanMaterials: Partial<Record<string, typeof copy.materials.pvc.en>> = de;
import { getTubingMaterialHeading } from "./headings";

export const tubingSeriesImage = "/images/products/tubing/foreach-tubing-series.webp";

export function getTubingSeriesCopy(locale: string) {
  if (locale === "it") return it.series;
  if (locale === "hi") return hi.series;
  return locale === "zh" || locale === "en"
    ? { ...copy.series[locale], h1: productOverviewHeadings.tubing[locale] }
    : undefined;
}

export function getTubingMaterialCopy(slug: string, locale: string) {
  const key = slug.replace(/-tubing$/, "") as keyof typeof copy.materials;
  if (locale === "de") return germanMaterials[key];
  if (locale === "it") return it[key];
  if (locale === "hi") return hi[key];
  if (locale !== "zh" && locale !== "en") return undefined;
  return copy.materials[key]?.[locale];
}

export function getTubingIntroductionCopy(slug: string, locale: string) {
  const key = slug.replace(/-tubing$/, "") as keyof typeof copy.materials;
  const material = copy.materials[key];
  const language = locale === "zh-CN" ? "zh" : locale;
  if (language === "de" || language === "it" || language === "hi") {
    const localized = getTubingMaterialCopy(slug, language);
    return localized && { intro: localized.intro, applications: localized.applications };
  }
  if (!material || !["zh", "en", "es", "fr", "ko", "ru"].includes(language)) return undefined;
  const translated = material[language as keyof typeof material];
  return { intro: translated.intro, applications: translated.applications };
}

export function getTubingIntro(locale: string, materialSlug?: string) {
  const series = getTubingSeriesCopy(locale);
  const material = materialSlug ? getTubingMaterialCopy(materialSlug, locale) : undefined;
  const introduction = materialSlug ? getTubingIntroductionCopy(materialSlug, locale) : undefined;
  const heading = materialSlug ? getTubingMaterialHeading(materialSlug, locale) : undefined;
  if (!series && !introduction) return undefined;
  const title = material?.h1 || heading?.h1 || series?.h1 || "";
  return {
    title,
    paragraphs: introduction?.intro || series?.paragraphs || [],
    image: {
      src: introduction ? `/images/products/tubing/${materialSlug}/${materialSlug}-main.webp` : tubingSeriesImage,
      alt: material?.imageAlt || heading?.h1 || (locale === "hi" ? "द्रव लाइनों के लिए FOREACH ट्यूबिंग" : locale === "it" ? "Tubi FOREACH per circuiti fluidici" : locale === "zh" ? "FOREACH 仪器流体管材产品图" : "FOREACH instrument fluidic tubing"),
    },
  };
}
