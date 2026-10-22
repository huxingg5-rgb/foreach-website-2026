import { getSolenoidContent } from "@/data/products/detail/solenoid-content";
import { getSolenoidConfigurationImage } from "@/data/products/detail/solenoid-images";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { controlModuleSelectionProducts } from "@/data/products/selection/control-module-selection.generated";
import { getControlModulePath } from "@/data/products/selection/control-module-routes";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getConnectorSelectionArticle } from "@/data/resources/technical-articles/connector-selection-articles.article";
import { getHardTubeGuideProducts } from "@/data/resources/technical-articles/hard-tube-fittings-related-products";
import { getFerruleFittingRelatedProducts } from "@/data/resources/technical-articles/what-is-a-ferrule-fitting.zh";
import { getLuerFittingRelatedProducts } from "@/data/resources/technical-articles/what-is-a-luer-fitting.zh";
import { getRplSelectionProducts } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import { getValvelessMeteringPumpOverviewProducts } from "@/data/resources/technical-articles/what-is-a-valveless-metering-pump.article";
import { getValveEngineeringArticle } from "@/data/resources/technical-articles/valve-engineering-articles.article";
import { pipettingBasicsRelatedProductIds } from "@/data/resources/technical-articles/what-is-pipetting.article";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";

const featuredProductIds: Record<string, readonly string[]> = {
  "what-is-pipetting": pipettingBasicsRelatedProductIds,
  // Pressure-drop articles cover the pump and restrictive flow-path components.
  "fluid-resistance-calculator-liquid-path-design-guide": ["diaphragm-dpl30-brushed", "6010-solenoid-valve", "mrv3-ceramic-rotary-valve"],
  "cv-kv-correction-for-microfluidics": ["6010-solenoid-valve", "mrv3-ceramic-rotary-valve"],
};

function selectArticleResources(data: RelatedResourcesData): RelatedResourcesData {
  const ids = new Set<string>();
  const hrefs = new Set<string>();
  const products = data.products.filter(product => {
    const href = product.href?.replace(/\/$/, "");
    if (!href || !product.title || !product.imageSrc || ids.has(product.id) || hrefs.has(href)) return false;
    ids.add(product.id);
    hrefs.add(href);
    return true;
  }).slice(0, 10);
  // Articles link to one another in the body and pager, without a card carousel.
  return { ...data, products, articles: [] };
}

/** Shared footer selection for both editorial templates, independent of the sidebar. */
export function getArticleFooterResources(article: TechnicalArticleItem, locale: TechnicalArticleLocale): RelatedResourcesData {
  let data: RelatedResourcesData = { locale, products: [], articles: [], videos: [] };
  const connector = getConnectorSelectionArticle(article.slug, locale);
  if (connector) {
    data.products = connector.products;
  } else switch (article.slug) {
    case "what-is-a-solenoid-valve": {
      const productLocale = locale === "zh-CN" ? "zh" : locale;
      const configurations = ["2-way-nc-barbed", "3-way-barbed", "2-way-nc-base", "3-way-base", "2-way-nc-threaded", "3-way-threaded", "2-way-no-barbed", "2-way-no-base", "2-way-no-threaded"];
      data.products = configurations.map(slug => {
        const product = getSolenoidContent(slug, productLocale)!;
        const image = getSolenoidConfigurationImage(slug, productLocale)!;
        return { id: slug, title: `${product.modelName} · ${product.cardName}`,
          href: product.detailHref, imageSrc: image.src, imageAlt: image.alt, imageAspectRatio: 1 };
      });
      break;
    }
    case "what-is-a-luer-fitting": data = getLuerFittingRelatedProducts(locale); break;
    case "what-is-a-ferrule-fitting": data = getFerruleFittingRelatedProducts(locale); break;
    case "hard-tube-fittings-selection-guide": data = getHardTubeGuideProducts(locale); break;
    case "what-is-a-barbed-fitting": {
      // One published model for each straight, elbow, tee and Y family.
      data.products = ["ba", "bl", "bt", "by"].flatMap(series => {
        const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.productTypeId === "barbed-fittings" && item.seriesId === series);
        return product ? [{ id: product.productCode, title: product.foreachModel,
          href: `${locale === "zh-CN" ? "" : `/${locale}`}${product.detailHref}/`,
          imageSrc: product.imageCard, imageAlt: `FOREACH ${product.foreachModel}` }] : [];
      });
      break;
    }
    case "flanged-tubing-assemblies-selection-guide":
    case "what-is-a-compression-ring-fitting": {
      // Assembly articles link to complete configurations, not individual fittings.
      const family = article.slug === "flanged-tubing-assemblies-selection-guide"
        ? "flanged-tubing" : "retaining-ring-kits";
      // Keep each family aligned even when its source photos have different ratios.
      const imageAspectRatio = family === "retaining-ring-kits" ? 4 / 3 : 1;
      data.products = getTubingAssemblySelectionContent(locale).cards
        .filter(card => card.productTypeId === family)
        .flatMap(card => card.detailHref && card.imageCard
          ? [{ id: card.productId, title: card.cardTitle, href: card.detailHref,
            imageSrc: card.imageCard, imageAlt: card.imageAlt || card.cardTitle,
            imageAspectRatio }] : []);
      break;
    }
    case "modbus-protocol-fluid-control": {
      // ABD explicitly supports Modbus RTU; an RS-485 label alone is not sufficient.
      const product = controlModuleSelectionProducts.find(item => item.productId === "control-abd-air-bubble-detector");
      const title = product?.cardTitle?.[locale === "zh-CN" ? "zh" : locale];
      if (product && title && product.imageCard && product.detailSlug) {
        data.products = [{ id: product.productId, title, href: getControlModulePath(product.detailSlug, locale),
          imageSrc: product.imageCard, imageAlt: title }];
      }
      break;
    }
    case "metering-pump-accuracy-repeatability-reagent-dispensing":
    case "rpl-valveless-metering-pump-selection-guide":
    case "what-is-a-valveless-metering-pump": {
      const products = article.slug === "what-is-a-valveless-metering-pump"
        ? getValvelessMeteringPumpOverviewProducts(locale) : getRplSelectionProducts(locale);
      data.products = products.map(product => ({ id: product.name, title: product.name,
        href: product.href, imageSrc: product.image, imageAlt: product.alt }));
      break;
    }
    default: data = getRelatedResourcesData({ sourceType: "article", sourceId: article.id,
      sourceSlug: article.slug, relationKeys: article.relationKeys, locale,
      featuredProductIds: featuredProductIds[article.slug] ?? getValveEngineeringArticle(article.slug, locale)?.productIds });
  }
  return selectArticleResources(data);
}
