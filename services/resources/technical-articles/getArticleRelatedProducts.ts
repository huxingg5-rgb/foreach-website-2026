import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { getRelatedProductSeriesKey, getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { getFerruleFittingRelatedProducts } from "@/data/resources/technical-articles/what-is-a-ferrule-fitting.zh";
import { getHardTubeGuideProducts } from "@/data/resources/technical-articles/hard-tube-fittings-related-products";
import { getRplSelectionProducts } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import { getValvelessMeteringPumpOverviewProducts } from "@/data/resources/technical-articles/what-is-a-valveless-metering-pump.article";
import { pipettingBasicsRelatedProductIds } from "@/data/resources/technical-articles/what-is-pipetting.article";
import { getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";

export type ArticleRelatedProduct = RelatedResourcesData["products"][number] & { imageFill?: boolean };

// Explicit comparisons take priority over the default one-card-per-series rule.
// IDs refer to published configurations; no fabricated series/detail URLs.
const articleProductIds: Record<string, readonly string[]> = {
  "diaphragm-pump-vs-peristaltic-pump": ["diaphragm-dpl30h-brushless", "diaphragm-dpl60-brushed"],
  "100-kpa-vs-600-kpa-diaphragm-pump-selection": ["diaphragm-dpl30-brushed", "diaphragm-dpl30h-brushed"],
  "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump": ["diaphragm-dpl30-brushed", "diaphragm-dpgl800-ff"],
  "brushed-vs-brushless-diaphragm-pump-3000h-10000h": ["diaphragm-dpl30-brushed", "diaphragm-dpl30-brushless"],
  "piston-pump-head-material-selection": ["pump-ea-500ul-pmma", "pump-ea-500ul-peek"],
  "what-is-pipetting": pipettingBasicsRelatedProductIds,
};

const diaphragmComparisonProductPhotos: Partial<Record<string, Pick<ArticleRelatedProduct, "title" | "imageSrc" | "imageAlt"> & {
  localizedTitles: Record<Exclude<TechnicalArticleLocale, "zh-CN">, string>;
}>> = {
  "diaphragm-dpl30h-brushless": {
    title: "DPL30H 无刷高压微型隔膜泵",
    imageSrc: "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-supply-pump.webp",
    imageAlt: "FOREACH DPL30H-BS 无刷高压微型隔膜泵实物图",
    localizedTitles: {
      en: "DPL30H-BS Brushless High-Pressure Miniature Liquid Diaphragm Pump",
      es: "DPL30H-BS Bomba miniatura de diafragma de alta presión para líquidos, sin escobillas",
      fr: "DPL30H-BS Pompe à membrane miniature haute pression pour liquides, sans balais",
      ko: "DPL30H-BS 브러시리스 고압 소형 액체 다이어프램 펌프",
      ru: "DPL30H-BS Миниатюрный жидкостный мембранный насос высокого давления с бесщёточным двигателем",
    },
  },
  "diaphragm-dpl60-brushed": {
    title: "DPL60 微型液体隔膜泵",
    imageSrc: "/images/products/pumps/diaphragm-pumps/dpl60/images/foreach-dpl60-600ml-min-brushed-miniature-liquid-diaphragm-pump-front-side.webp",
    imageAlt: "FOREACH DPL60-DB 有刷微型液体隔膜泵实物图",
    localizedTitles: {
      en: "DPL60-DB Miniature Liquid Diaphragm Pump",
      es: "DPL60-DB Bomba miniatura de diafragma para líquidos",
      fr: "DPL60-DB Pompe à membrane miniature pour liquides",
      ko: "DPL60-DB 소형 액체 다이어프램 펌프",
      ru: "DPL60-DB Миниатюрный жидкостный мембранный насос",
    },
  },
};

export function getArticleRelatedProducts(article: TechnicalArticleItem, locale: TechnicalArticleLocale): ArticleRelatedProduct[] {
  let products: ArticleRelatedProduct[];
  let explicit = true;
  switch (article.slug) {
    case "what-is-a-luer-fitting": {
      const imageAlts = {
        "zh-CN": ["彩色鲁尔接头实拍，中央展示蓝色锁圈装配示例", "LPR-32-PP-Y 黄色旋转锁圈公鲁尔接头及剖面"],
        en: ["Colored Luer fittings with a blue locking-collar assembly in the center", "LPR-32-PP-Y male Luer with yellow rotating collar and cutaway view"],
        es: ["Conectores Luer de colores con un conjunto de collar azul en el centro", "LPR-32-PP-Y Luer macho con collar giratorio amarillo y vista en sección"],
        fr: ["Raccords Luer de différentes couleurs avec un assemblage à bague bleue au centre", "LPR-32-PP-Y Luer mâle à bague rotative jaune et vue en coupe"],
        ko: ["중앙에 파란색 잠금 링 조립 예시가 있는 다양한 색상의 루어 피팅", "LPR-32-PP-Y 노란색 회전 잠금 링 수 루어와 단면"],
        ru: ["Цветные фитинги Люэр с синей фиксирующей гайкой в сборе в центре", "LPR-32-PP-Y Люэр «папа» с жёлтой вращающейся гайкой и вид в разрезе"],
      };
      products = ["LPS-32-PP-U", "LPR-32-PP-Y"].map((model, index) => {
        const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
        if (!product) throw new Error(`Missing luer article sidebar product: ${model}`);
        return {
          id: product.productCode,
          title: product.foreachModel,
          href: locale === "zh-CN" ? `${product.detailHref}/` : `/${locale}${product.detailHref}/`,
          imageSrc: index === 0
            ? "/images/resources/technical-articles/what-is-a-luer-fitting/pp-panel-mount-luer-photo.png"
            : product.imageCard,
          imageAlt: imageAlts[locale][index],
          imageFill: index === 0,
        };
      });
      break;
    }
    case "what-is-a-ferrule-fitting": products = getFerruleFittingRelatedProducts(locale).products; break;
    case "hard-tube-fittings-selection-guide": {
      const all = getHardTubeGuideProducts(locale).products;
      products = [all[0], all[2]].filter((product): product is ArticleRelatedProduct => Boolean(product));
      break;
    }
    case "metering-pump-accuracy-repeatability-reagent-dispensing":
    case "rpl-valveless-metering-pump-selection-guide":
    case "what-is-a-valveless-metering-pump": {
      const all = article.slug === "what-is-a-valveless-metering-pump"
        ? getValvelessMeteringPumpOverviewProducts(locale) : getRplSelectionProducts(locale);
      products = all.map(product => ({ id: product.name, title: product.name, href: product.href, imageSrc: product.image, imageAlt: product.alt }));
      break;
    }
    default: {
      const ids = articleProductIds[article.slug];
      explicit = Boolean(ids);
      products = getRelatedResourcesData({ sourceType: "article", sourceId: article.id, sourceSlug: article.slug, relationKeys: article.relationKeys, featuredProductIds: ids, locale }).products;
    }
  }

  const seen = new Set<string>();
  const selected = products.filter(product => {
    if (!product.href || !product.imageSrc || !product.title) return false;
    // Use product identity, not translated title parsing, for series deduplication.
    // Explicit editorial selections may intentionally compare variants of one series.
    const key = explicit ? product.href : getRelatedProductSeriesKey(product.id) ?? product.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 2);
  return selected.map(product => {
    const photo = article.slug === "diaphragm-pump-vs-peristaltic-pump"
      ? diaphragmComparisonProductPhotos[product.id]
      : undefined;
    if (photo) {
      const title = locale === "zh-CN" ? photo.title : photo.localizedTitles[locale];
      return { ...product, title, imageSrc: photo.imageSrc, imageAlt: locale === "zh-CN" ? photo.imageAlt : `FOREACH ${title}`, imageFill: true };
    }
    const reference = getDiaphragmPumpReferenceByProductId(product.id);
    if (!reference) return product;
    const copy = reference.localized[locale === "zh-CN" ? "zh" : locale];
    // Show the descriptive product name; the card link still targets the exact model.
    const title = locale === "zh-CN" ? copy.cardSubtitle.split("，")[0] : copy.cardSubtitle;
    return { ...product, title };
  });
}
