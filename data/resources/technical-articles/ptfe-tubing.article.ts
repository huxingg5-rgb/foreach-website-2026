import { ptfeTubingCopy } from "./what-is-ptfe-tubing.zh";
import { fepTubingCopy } from "./what-is-fep-tubing.zh";
import { pfaTubingCopy } from "./what-is-pfa-tubing.zh";
import { pvcTubingCopy } from "./what-is-pvc-tubing.zh";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { numberTubingArticle, tubingAssemblyCard, tubingProductCard, type ArticleTubeMaterial } from "./tubing-article-support";
import { localizeTubingArticle } from "./tubing-material-locales";

const sourceDefinitions: { material: ArticleTubeMaterial; copy: DiaphragmPumpEngineeringArticleCopy; anchors: string[] }[] = [
  { material: "ptfe", copy: ptfeTubingCopy, anchors: ["material-processing", "properties-limits", "temperature-pressure", "instrument-applications", "ptfe-vs-peek", "diameter-pressure-drop", "fittings-creep", "gas-cleanliness", "foreach-sizes", "sample-validation", "material-sources"] },
  { material: "fep", copy: fepTubingCopy, anchors: ["material-appearance", "properties", "material-comparison", "instrument-applications", "diameter-volume", "flanged-assemblies", "temperature-pressure", "foreach-sizes", "installation-validation", "related-tubing"] },
  { material: "pfa", copy: pfaTubingCopy, anchors: ["material-processing", "material-comparison", "cleanliness", "instrument-applications", "diameter-volume", "fittings-assemblies", "operating-validation", "foreach-sizes", "related-tubing"] },
  { material: "pvc", copy: pvcTubingCopy, anchors: ["material-formulation", "hardness-wall", "connection-vs-pump-tube", "instrument-applications", "diameter-routing", "fittings", "cleaning-maintenance", "foreach-sizes", "related-tubing"] },
];
const definitionsByLocale = new Map<TechnicalArticleLocale, typeof sourceDefinitions>();
function getDefinitions(locale: TechnicalArticleLocale) {
  const cached = definitionsByLocale.get(locale);
  if (cached) return cached;
  const definitions = sourceDefinitions.map(definition => ({ ...definition,
    copy: numberTubingArticle(localizeTubingArticle(definition.copy, locale)),
  }));
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
  return getDefinitions(locale).map(({ material, copy }) => {
    const slug = `what-is-${material}-tubing`;
    return { id: slug, slug, category: "fittings-tubing", ...copy.metadata, summary: copy.deck, date: "2026-10-29",
      relationKeys: [`product:${material}-tubing`, `category:${material}-tubing`, material === "pvc" ? "category:flexible-tubing" : "category:hard-tube-fittings"], relationPriority: 155,
      content: [
        { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
        ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
        { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
      ],
    };
  });
}

export function getTubingMaterialArticle(slug: string, locale: TechnicalArticleLocale) {
  const definition = getDefinitions(locale).find(item => slug === `what-is-${item.material}-tubing`);
  if (!definition) return null;
  const { material, copy, anchors } = definition;
  const related = material === "pvc" ? ["pvc", "tpu", "fep", "ptfe"] : [material, ...["ptfe", "fep", "pfa", "peek"].filter(id => id !== material)];
  const products = related.map(id => tubingProductCard(`${id}-tubing`, locale));
  if (material !== "pvc") products.splice(1, 0, tubingAssemblyCard(material, locale));
  return { copy, products, sidebarProducts: products.slice(0, 2),
    subject: localizeTubingArticle({ about: [`${material.toUpperCase()} 管`, "仪器液路选型"], mentions: material === "pvc"
      ? ["PVC 软管硬度", "倒刺接头", "蠕动泵泵管", "清洗管路"]
      : ["PTFE 管", "FEP 管", "PFA 管", "管路流阻", "定长管组件"] }, locale),
    navigation: copy.sections.map((section, index) => ({ id: anchors[index], label: section.tocLabel ?? section.title })),
  };
}
