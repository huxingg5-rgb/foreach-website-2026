import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { TechnicalArticleLocale } from "./technical-articles.types";

// Representative configurations, not interchangeable replacements or pressure recommendations.
const featuredModels = [
  { model: "HFL-M6-16-PV-N", structure: "法兰式" },
  { model: "HF6-M6-20-PV-N", structure: "法兰式" },
  { model: "HN6-M6-16-PV-N", structure: "卡箍式" },
  { model: "HNF-M6-16-PV-N", structure: "卡箍式" },
] as const;

const structureLabels = {
  "zh-CN": ["法兰式", "卡箍式"], en: ["Flanged", "Ferrule"],
  es: ["Con reborde", "Con férula"], fr: ["À collet", "À férule"],
  ko: ["플랜지형", "페룰형"], ru: ["Фланцевый", "С обжимным кольцом"],
};
export function getHardTubeGuideProducts(locale: TechnicalArticleLocale = "zh-CN"): RelatedResourcesData {
  return {
    locale, articles: [], videos: [],
    products: featuredModels.flatMap(({ model, structure }) => {
      const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
      const label = structureLabels[locale][structure === "法兰式" ? 0 : 1];
      return product ? [{
        id: product.productCode,
        title: `${model} · ${label}`,
        href: locale === "zh-CN" ? product.detailHref : `/${locale}${product.detailHref}`,
        imageSrc: product.imageCard,
        imageAlt: locale === "zh-CN" ? `${structure}硬管接头 ${model}` : `${model} · ${label}`,
      }] : [];
    }),
  };
}

export function isHardTubeGuideModel(model: string) {
  return /^(?:HF|HF6|HFL|HFL6|HN|HN6|HNF|HNF6|HSF|HSF6)-/i.test(model);
}
