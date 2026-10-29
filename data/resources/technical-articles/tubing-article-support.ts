import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import { getTubingGallery } from "@/data/products/tubing/gallery";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";
import { getTubingDetailPath } from "@/data/products/selection/tubing-selection-routes";
import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { localizeProductCardTitle } from "@/data/products/selection/card-copy/product-card-copy.intl";
import type { TechnicalArticleLocale } from "./technical-articles.types";

export type ArticleTubeMaterial = "ptfe" | "fep" | "pfa" | "pvc";
type AssemblyMaterial = Exclude<ArticleTubeMaterial, "pvc">;
const assemblyPhotos: Record<AssemblyMaterial, { src: string; alt: string }> = {
  ptfe: { src: "/images/products/tubing-assemblies/flanged-tubing/ptfe/foreach-ptfe-flanged-tubing-assembly-angled.webp", alt: "恒永达 PTFE 法兰翻边管组件实拍，展示管体、螺纹接头与端面垫圈" },
  fep: { src: "/images/products/tubing-assemblies/flanged-tubing/fep/foreach-fep-flanged-tubing-assembly-end-detail.webp", alt: "恒永达透明 FEP 法兰翻边管组件实拍，展示管端翻边、垫圈和螺纹接头" },
  pfa: { src: "/images/products/tubing-assemblies/flanged-tubing/pfa/foreach-pfa-flanged-tubing-assembly-side.webp", alt: "恒永达 PFA 法兰翻边管组件侧面实拍，展示透明管体与端部连接" },
};

export function tubingProductCard(id: string, locale: TechnicalArticleLocale = "zh-CN") {
  const language = locale === "zh-CN" ? "zh" : locale;
  const product = getTubingMaterialCopy(id, language === "zh" ? "zh" : "en");
  const selection = tubingSelectionProducts.find(item => item.productId === id);
  if (!product || !selection) throw new Error(`Missing tubing article product: ${id}`);
  const photo = getTubingGallery(id)?.[0];
  // The shared card dictionary uses the material's short catalog name as its key.
  const title = language === "zh" || language === "en" ? product.cardTitle
    : localizeProductCardTitle(selection, language, `${id.replace("-tubing", "").toUpperCase()} Tubing`);
  return { id, title, href: getTubingDetailPath(locale, id),
    imageSrc: photo?.src ?? selection.imageCard!, imageAlt: photo?.alt[language] ?? title, imageAspectRatio: 1 };
}

export function tubingAssemblyCard(material: AssemblyMaterial, locale: TechnicalArticleLocale = "zh-CN") {
  const id = `tubing-assembly-${material}-flanged`;
  const card = getTubingAssemblySelectionContent(locale).cards.find(item => item.productId === id);
  if (!card?.detailHref) throw new Error(`Missing published tubing assembly: ${id}`);
  return { id, title: card.cardTitle, href: card.detailHref,
    imageSrc: `/images/products/tubing-assemblies/related/${id}-square.webp`,
    imageAlt: card.imageAlt, imageAspectRatio: 1 };
}

export function tubingArticlePhoto(material: ArticleTubeMaterial) {
  if (material === "pfa") return assemblyPhotos.pfa;
  const photo = getTubingGallery(`${material}-tubing`)![0];
  return { src: photo.src, alt: photo.alt.zh };
}

export function tubingAssemblyFigure(material: AssemblyMaterial, caption: string): EngineeringArticleBlock {
  return { type: "figure", ...assemblyPhotos[material], width: 1500, height: 1500,
    caption, captionHref: tubingAssemblyCard(material).href };
}

export function tubingSeriesLinks(current: ArticleTubeMaterial): EngineeringArticleBlock {
  const labels: Record<ArticleTubeMaterial, string> = {
    ptfe: "PTFE 管：材料、流阻与接头选型", fep: "FEP 管：透明细管与翻边连接",
    pfa: "PFA 管：试剂输送与洁净度控制", pvc: "PVC 管：硬度、布管与软管接头",
  };
  return { type: "links", ordered: true, items: (Object.keys(labels) as ArticleTubeMaterial[])
    .filter(material => material !== current)
    .map(material => ({ label: labels[material], href: `/resources/technical-articles/what-is-${material}-tubing/` })) };
}

export function numberTubingArticle(copy: DiaphragmPumpEngineeringArticleCopy): DiaphragmPumpEngineeringArticleCopy {
  // The article template already numbers section headings and table-of-contents entries.
  return { ...copy, sections: copy.sections.map(section => ({ ...section,
    blocks: section.blocks.map(block => block.type === "list" || block.type === "links" ? { ...block, ordered: true } : block),
  })),
  faqItems: copy.faqItems.map((item, index) => ({ ...item, question: `${index + 1}. ${item.question}` })) };
}
