import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { getGermanTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/selection.de";
import { germanBatchTechnicalArticleDictionaries } from "@/data/resources/technical-articles/batch-locales/de";
import { getInstrumentFluidicsArticle } from "@/data/resources/technical-articles/instrument-fluidics-articles.article";
import { virtualLeaksArticleSlug } from "@/data/resources/technical-articles/instrument-fluidics/virtual-leaks-causes-diagnosis-prevention.zh";
import type { TechnicalArticleItem } from "@/data/resources/technical-articles/technical-articles.types";
import { getGermanArticleDestination } from "@/lib/i18n/german-article-link";
import { samplingProbeProductNames } from "@/data/resources/technical-articles/sampling-probe-selection-locales";
import { samplingProbeSelectionSlug } from "@/data/resources/technical-articles/technical-article-availability";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getArticleFooterResources } from "./getArticleFooterResources";
import { getArticleRelatedProducts, type ArticleRelatedProduct } from "./getArticleRelatedProducts";

const pumpCopy: Record<string, readonly [model: string, title: string]> = {
  "diaphragm-dpl30-brushed": ["DPL30-DB", "Miniatur-Flüssigkeitsmembranpumpe mit Bürstenmotor, 300 mL/min, für OEM-Geräte"],
  "diaphragm-dpl30-brushless": ["DPL30-BB", "Bürstenlose Miniatur-Flüssigkeitsmembranpumpe mit 2 Leitungen, 300 mL/min"],
  "diaphragm-dpl60-brushed": ["DPL60-DB", "Flüssigkeitsmembranpumpe mit Bürstenmotor, 600 mL/min"],
  "diaphragm-dpl60-brushless": ["DPL60-BB", "Bürstenlose Flüssigkeitsmembranpumpe, 600 mL/min"],
  "diaphragm-dpl30h-brushed": ["DPL30H-DS", "Miniatur-Hochdruckmembranpumpe für Flüssigkeiten mit Bürstenmotor"],
  "diaphragm-dpl30h-brushless": ["DPL30H-BS", "Bürstenlose Miniatur-Hochdruckmembranpumpe für Flüssigkeiten"],
  "diaphragm-dpgl800-ff": ["DPGL800-BS", "Bürstenlose Gas-Flüssigkeits-Membranpumpe mit 24 V zur Abfallabsaugung in OEM-Geräten"],
};

const productCopy: Record<string, string> = {
  "sampling-probes": samplingProbeProductNames.de[0],
  "piercing-probes": samplingProbeProductNames.de[1],
  "6010-solenoid-valve": "Magnetventil der Baureihe SV10",
  "mrv3-ceramic-rotary-valve": "Keramisches Mehrkanal-Drehventil MRV3",
  "809359": "Winkel-Schlauchtülle mit F-Profil BL-32F-PP-N",
  "809636": "Winkel-Schlauchtülle mit D-Profil BL-32D-PP-N",
  "809278": "Gerade Schlauchtülle mit F-Profil BA-32F-PP-N",
  "809467": "Gewinde-Schlauchtülle SA-U28-32D-PP-N",
};

const assemblyCards = new Map(getGermanTubingAssemblySelectionContent().cards.map(card => [card.productId, card]));

function germanProductCard(product: ArticleRelatedProduct, labels?: Readonly<Record<string, string>>): ArticleRelatedProduct {
  const assembly = assemblyCards.get(product.id);
  const pump = pumpCopy[product.id];
  const extra = product.title.includes("12V/24V") ? " · 12 V/24 V"
    : product.title.includes("Custom OEM Options") ? " · kundenspezifische OEM-Ausführungen" : "";
  const title = pump && product.title !== pump[0] ? `${pump[0]} · ${pump[1]}${extra}` : labels?.[product.title] ?? productCopy[product.id] ?? assembly?.cardTitle ?? product.title;
  return {
    ...product,
    title,
    imageAlt: pump ? `Produktfoto der FOREACH-Membranpumpe ${pump[0]}` : labels?.[product.imageAlt ?? ""] ?? productCopy[product.id] ?? assembly?.imageAlt ?? product.imageAlt,
    ...getGermanArticleDestination(product.href),
  };
}

export function getGermanArticleRelatedResources(article: TechnicalArticleItem): {
  sidebar: ArticleRelatedProduct[];
  footer: RelatedResourcesData;
} {
  const baseline = getArticleFooterResources(article, "en");
  const translatedVideos = new Map(getInstallationGuidePageData("de").guides.map((guide) => [guide.id, guide]));
  const virtualLeaks = article.slug === virtualLeaksArticleSlug ? getInstrumentFluidicsArticle(article.slug, "en") : null;
  const sidebar = virtualLeaks?.sidebarProducts
    ?? (article.slug === samplingProbeSelectionSlug ? baseline.products : getArticleRelatedProducts(article, "en"));
  const labels = germanBatchTechnicalArticleDictionaries[article.slug];
  const localizeProduct = (product: ArticleRelatedProduct) => germanProductCard(product, labels);
  return {
    sidebar: sidebar.map(localizeProduct),
    footer: {
      ...baseline,
      uiLocale: "de",
      videoLocale: "de",
      products: baseline.products.map(localizeProduct),
      videos: baseline.videos.map((guide) => translatedVideos.get(guide.id) ?? guide),
    },
  };
}
