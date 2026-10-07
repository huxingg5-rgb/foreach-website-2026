import { productOverviewHeadings } from "../selection/product-overview-headings";
import copy from "./content.json";

export const tubingSeriesImage = "/images/products/tubing/foreach-tubing-series.webp";

export function getTubingSeriesCopy(locale: string) {
  return locale === "zh" || locale === "en"
    ? { ...copy.series[locale], h1: productOverviewHeadings.tubing[locale] }
    : undefined;
}

export function getTubingMaterialCopy(slug: string, locale: string) {
  if (locale !== "zh" && locale !== "en") return undefined;
  const key = slug.replace(/-tubing$/, "") as keyof typeof copy.materials;
  return copy.materials[key]?.[locale];
}

export function getTubingIntro(locale: string, materialSlug?: string) {
  const series = getTubingSeriesCopy(locale);
  if (!series) return undefined;
  const material = materialSlug ? getTubingMaterialCopy(materialSlug, locale) : undefined;
  return {
    title: material?.h1 || series.h1,
    paragraphs: material?.intro || series.paragraphs,
    image: {
      src: material ? `/images/products/tubing/${materialSlug}/${materialSlug}-main.webp` : tubingSeriesImage,
      alt: material?.imageAlt || (locale === "zh" ? "FOREACH 仪器流体管材产品图" : "FOREACH instrument fluidic tubing"),
    },
  };
}
