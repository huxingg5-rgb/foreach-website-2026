import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";

// Native English catalogue views and derivatives of the original engineering
// drawings retain geometry and dimension values. Photos remain language-neutral.
const variants: Record<string, { name: string; width?: number; height?: number }> = {
  "catalog-two-way-section.webp": { name: "catalog-two-way-section-en.webp", width: 1500, height: 959 },
  "catalog-us-bore.webp": { name: "catalog-us-bore-en.webp", width: 1500, height: 960 },
  "catalog-tee-y-channels.webp": { name: "catalog-tee-y-channels-en.webp", width: 1321, height: 1451 },
  "catalog-pmu-panel-mount.webp": { name: "catalog-pmu-panel-mount-en.webp", width: 1500, height: 1190 },
  "panel-assembly-engineering.svg": { name: "panel-assembly-engineering-en.svg" },
  "tube-barb-bore-engineering.svg": { name: "tube-barb-bore-engineering-en.svg" },
  "pmb-u28-16d-pp-n-section.webp": { name: "pmb-u28-16d-pp-n-section-en.webp" },
  "pmb-u28-24d-pp-n-section.webp": { name: "pmb-u28-24d-pp-n-section-en.webp" },
  "pmb-u28-32d-pp-n-section.webp": { name: "pmb-u28-32d-pp-n-section-en.webp" },
};

export function withEnglishPanelFittingImages(copy: DiaphragmPumpEngineeringArticleCopy): DiaphragmPumpEngineeringArticleCopy {
  const block = (item: EngineeringArticleBlock): EngineeringArticleBlock => {
    if (item.type !== "figure") return item;
    const name = item.src.split("/").at(-1)!;
    const variant = variants[name];
    return variant ? { ...item, src: item.src.slice(0, -name.length) + variant.name,
      width: variant.width ?? item.width, height: variant.height ?? item.height } : item;
  };
  return { ...copy, leadBlocks: copy.leadBlocks.map(block),
    sections: copy.sections.map(section => ({ ...section, blocks: section.blocks.map(block) })) };
}
