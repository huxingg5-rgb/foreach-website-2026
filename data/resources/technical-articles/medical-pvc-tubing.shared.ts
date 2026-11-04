import { pvcTubingVariants } from "@/data/products/configurator/pvc-tubing";

/* =========================================================
   医用 PVC 管文章｜各语言共用的数据
   照片尺寸、规格范围在这里维护一次，六种语言同步使用。
========================================================= */

export const medicalPvcTubingSlug = "medical-pvc-tubing";

const imageBase = "/images/resources/technical-articles/medical-pvc-tubing";

/** 恒永达 10 万级洁净挤出车间实拍（2026-11），统一 1600×900 WebP（与站内文章配图规格一致），各语言只替换 alt 与图注。 */
export const medicalPvcTubingImages = {
  line: { src: `${imageBase}/foreach-cleanroom-tubing-extrusion-line.webp`, width: 1600, height: 900 },
  gauge: { src: `${imageBase}/foreach-inline-diameter-gauge-clear-tubing.webp`, width: 1600, height: 900 },
  resin: { src: `${imageBase}/foreach-cleanroom-resin-drying-conveying.webp`, width: 1600, height: 900 },
  die: { src: `${imageBase}/foreach-tubing-extrusion-die-sizing.webp`, width: 1600, height: 900 },
  tank: { src: `${imageBase}/foreach-cleanroom-extrusion-cooling-tank.webp`, width: 1600, height: 900 },
} as const;

function formatRange(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}` : `${min}–${max}`;
}

// 规格范围直接读取 PVC 管选型数据，产品数据更新后文章自动同步。
export const medicalPvcTubingDiameters = {
  inner: formatRange(pvcTubingVariants.map(item => Number(item.attributes.innerDiameter))),
  outer: formatRange(pvcTubingVariants.map(item => Number(item.attributes.outerDiameter))),
};

/** [硬度, 规格数, 内径范围, 外径范围]，不含文字，可直接用于各语言表格。 */
export const medicalPvcTubingSizeRows = (["55A", "65A"] as const).map(hardness => {
  const items = pvcTubingVariants.filter(item => item.attributes.hardness === hardness);
  return [
    hardness,
    String(items.length),
    formatRange(items.map(item => Number(item.attributes.innerDiameter))),
    formatRange(items.map(item => Number(item.attributes.outerDiameter))),
  ];
});
