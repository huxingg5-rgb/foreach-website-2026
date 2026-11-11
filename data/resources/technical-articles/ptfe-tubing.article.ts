import { ptfeTubingCopy } from "./what-is-ptfe-tubing.zh";
import { fepTubingCopy } from "./what-is-fep-tubing.zh";
import { pfaTubingCopy } from "./what-is-pfa-tubing.zh";
import { pvcTubingCopy } from "./what-is-pvc-tubing.zh";
import { medicalPvcTubingCopy, medicalPvcTubingSlug } from "./medical-pvc-tubing.zh";
import { medicalPvcTubingCopyEn, medicalPvcTubingMentionsEn } from "./medical-pvc-tubing.en";
import { medicalPvcTubingCopyEs, medicalPvcTubingMentionsEs } from "./medical-pvc-tubing.es";
import { medicalPvcTubingCopyFr, medicalPvcTubingMentionsFr } from "./medical-pvc-tubing.fr";
import { medicalPvcTubingCopyKo, medicalPvcTubingMentionsKo } from "./medical-pvc-tubing.ko";
import { medicalPvcTubingCopyRu, medicalPvcTubingMentionsRu } from "./medical-pvc-tubing.ru";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { numberTubingArticle, tubingAssemblyCard, tubingProductCard, type ArticleTubeMaterial } from "./tubing-article-support";
import { localizeTubingArticle } from "./tubing-material-locales";
import { pvcCleaningCompatibilityCopy } from "./pvc-tubing-cleaning-fluid-compatibility.zh";
import { pvcPressurePullOffCopy } from "./pvc-tubing-pressure-rating-pull-off-force.zh";
import { getPvcValidationTranslations, pvcValidationBarbLabels } from "./pvc-validation-locales";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { getBarbedFittingImageAlt } from "@/data/products/detail/barbed-fitting-gallery";

type TubingArticleDefinition = {
  material: ArticleTubeMaterial;
  copy: DiaphragmPumpEngineeringArticleCopy;
  anchors: string[];
  /** Defaults to what-is-{material}-tubing. */
  slug?: string;
  date?: string;
  /** Chinese-only articles have no tubing-material-locales dictionary entries yet. */
  zhOnly?: boolean;
  squareProductImages?: boolean;
  mentions?: string[];
  relatedMaterials?: string[];
  fittingModels?: string[];
  /** A family photograph links to the matching category, never to a pictured-but-unverified SKU. */
  fittingCardPhoto?: { src: string; href: string };
  /** Full per-locale copies, adapted for each market instead of the string dictionary; a missing locale is not published. */
  translations?: Partial<Record<Exclude<TechnicalArticleLocale, "zh-CN">, { copy: DiaphragmPumpEngineeringArticleCopy; mentions: string[] }>>;
};
const sourceDefinitions: TubingArticleDefinition[] = [
  { material: "pvc", slug: "pvc-tubing-cleaning-fluid-compatibility", copy: pvcCleaningCompatibilityCopy,
    date: "2026-11-10", squareProductImages: true, relatedMaterials: ["pvc", "fep"],
    translations: getPvcValidationTranslations("compatibility"),
    mentions: ["透明 PVC 软管", "PVC 管化学兼容性", "清洗液浸泡发白", "IVD 清洗管路", "化学发光本底"],
    anchors: ["compatibility-directions", "contact-test-method", "mass-hardness-appearance", "extended-immersion", "luminescence-background", "assembly-validation", "evidence-scope"] },
  { material: "pvc", slug: "pvc-tubing-pressure-rating-pull-off-force", copy: pvcPressurePullOffCopy,
    date: "2026-11-10", squareProductImages: true, relatedMaterials: ["pvc"], fittingModels: ["BA-16F-PP-N"],
    fittingCardPhoto: {
      src: "/images/products/fittings/barbed-fittings/photos/equal-straight-barbed-fittings-mixed-lineup-dark.webp",
      href: "/products/fittings/barbed-fittings/",
    },
    translations: getPvcValidationTranslations("pressure"),
    mentions: ["宝塔接头脱管", "倒刺接头脱管", "PVC 软管耐压", "管体爆破压力", "接头拉脱力", "倒刺连接验证"],
    anchors: ["barbed-fitting-pull-off-causes", "pressure-force-terms", "hydraulic-test-method", "pressure-results", "aging-pull-off", "force-vs-pressure", "component-validation", "evidence-sources"] },
  { material: "ptfe", copy: ptfeTubingCopy, anchors: ["material-processing", "properties-limits", "temperature-pressure", "instrument-applications", "ptfe-vs-peek", "diameter-pressure-drop", "fittings-creep", "gas-cleanliness", "foreach-sizes", "sample-validation", "material-sources"] },
  { material: "fep", copy: fepTubingCopy, anchors: ["material-appearance", "properties", "material-comparison", "instrument-applications", "diameter-volume", "flanged-assemblies", "temperature-pressure", "foreach-sizes", "installation-validation", "related-tubing"] },
  { material: "pfa", copy: pfaTubingCopy, anchors: ["material-processing", "material-comparison", "cleanliness", "instrument-applications", "diameter-volume", "fittings-assemblies", "operating-validation", "foreach-sizes", "related-tubing"] },
  { material: "pvc", copy: pvcTubingCopy, anchors: ["material-formulation", "hardness-wall", "connection-vs-pump-tube", "instrument-applications", "diameter-routing", "fittings", "cleaning-maintenance", "foreach-sizes", "related-tubing"] },
  { material: "pvc", slug: medicalPvcTubingSlug, copy: medicalPvcTubingCopy, date: "2026-11-04",
    mentions: ["医用 PVC 管", "尺寸精度", "洁净车间", "ISO 13485"],
    translations: {
      en: { copy: medicalPvcTubingCopyEn, mentions: medicalPvcTubingMentionsEn },
      es: { copy: medicalPvcTubingCopyEs, mentions: medicalPvcTubingMentionsEs },
      fr: { copy: medicalPvcTubingCopyFr, mentions: medicalPvcTubingMentionsFr },
      ko: { copy: medicalPvcTubingCopyKo, mentions: medicalPvcTubingMentionsKo },
      ru: { copy: medicalPvcTubingCopyRu, mentions: medicalPvcTubingMentionsRu },
    },
    anchors: ["medical-vs-general", "material-properties", "dimensional-precision", "cleanroom-production", "extrusion-process", "certifications-traceability", "supplier-checklist", "foreach-sizes", "related-tubing"] },
];
const articleSlug = (definition: TubingArticleDefinition) => definition.slug ?? `what-is-${definition.material}-tubing`;
const definitionsByLocale = new Map<TechnicalArticleLocale, typeof sourceDefinitions>();
function getDefinitions(locale: TechnicalArticleLocale) {
  const cached = definitionsByLocale.get(locale);
  if (cached) return cached;
  const definitions = sourceDefinitions.flatMap(definition => {
    if (locale !== "zh-CN" && definition.translations) {
      const translated = definition.translations[locale];
      // Adapted copies carry Chinese-site paths; the localizer only prefixes links here.
      return translated ? [{ ...definition, mentions: translated.mentions,
        copy: numberTubingArticle(localizeTubingArticle(translated.copy, locale)) }] : [];
    }
    if (locale !== "zh-CN" && definition.zhOnly) return [];
    return [{ ...definition, copy: numberTubingArticle(localizeTubingArticle(definition.copy, locale)) }];
  });
  definitionsByLocale.set(locale, definitions);
  return definitions;
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": case "notice": return block.text;
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return `${block.alt} ${block.caption}`;
    case "formula": return `${block.expression} ${block.note ?? ""}`;
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => item.label).join(" · ");
  }
}

export function getTubingMaterialArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  return getDefinitions(locale).map(definition => {
    const { material, copy } = definition;
    const slug = articleSlug(definition);
    return { id: slug, slug, category: "fittings-tubing", ...copy.metadata, summary: copy.deck, date: definition.date ?? "2026-10-29",
      relationKeys: [`product:${material}-tubing`, `category:${material}-tubing`, material === "pvc" ? "category:flexible-tubing" : "category:hard-tube-fittings",
        ...(definition.fittingModels?.length ? ["category:barbed-fittings", "series:ba"] : [])], relationPriority: 155,
      content: [
        { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
        ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
        { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
      ],
    };
  });
}

export function getTubingMaterialArticle(slug: string, locale: TechnicalArticleLocale) {
  const definition = getDefinitions(locale).find(item => slug === articleSlug(item));
  if (!definition) return null;
  const { material, copy, anchors } = definition;
  const related = definition.relatedMaterials ?? (material === "pvc" ? ["pvc", "tpu", "fep", "ptfe"] : [material, ...["ptfe", "fep", "pfa", "peek"].filter(id => id !== material)]);
  const products = related.map(id => tubingProductCard(`${id}-tubing`, locale));
  for (const model of definition.fittingModels ?? []) {
    const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
    if (!product) throw new Error(`Missing published tubing article fitting: ${model}`);
    const label = pvcValidationBarbLabels[locale];
    const photo = definition.fittingCardPhoto;
    const imageAlt = photo ? getBarbedFittingImageAlt(photo.src, locale === "zh-CN" ? "zh" : locale) : undefined;
    if (photo && !imageAlt) throw new Error(`Missing fitting photograph description: ${photo.src}`);
    products.push({ id: photo ? "equal-straight-barbed-fittings" : product.productCode, title: photo ? label : `${model} ${label}`,
      href: `${locale === "zh-CN" ? "" : `/${locale}`}${photo?.href ?? `${product.detailHref}/`}`,
      imageSrc: photo?.src ?? product.imageCard,
      imageAlt: imageAlt ?? `${locale === "zh-CN" ? "恒永达" : "FOREACH"} ${model} ${label}`, imageAspectRatio: 1 });
  }
  if (material !== "pvc") products.splice(1, 0, tubingAssemblyCard(material, locale));
  const displayProducts = products.map(product => definition.squareProductImages ? { ...product, imageFill: true } : product);
  return { copy, products: displayProducts, sidebarProducts: displayProducts.slice(0, 2),
    subject: localizeTubingArticle({ about: [`${material.toUpperCase()} 管`, "仪器液路选型"], mentions: definition.mentions ?? (material === "pvc"
      ? ["PVC 软管硬度", "倒刺接头", "蠕动泵泵管", "清洗管路"]
      : ["PTFE 管", "FEP 管", "PFA 管", "管路流阻", "定长管组件"]) }, locale),
    navigation: copy.sections.map((section, index) => ({ id: anchors[index], label: section.tocLabel ?? section.title })),
  };
}
