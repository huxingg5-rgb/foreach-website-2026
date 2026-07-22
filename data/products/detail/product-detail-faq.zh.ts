/* =========================================================
   产品详情页 FAQ 数据
   规则：
   1. FAQ 按产品系列维护
   2. 不按单个型号重复维护
   3. 页面会根据 faqSeries / faqKey 自动读取
========================================================= */

export type ProductDetailFaqZhItem = {
  question: string;
  answer: string;
};

export const productDetailFaqZhBySeries: Record<
  string,
  ProductDetailFaqZhItem[]
> = {
  /*
   * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
   * 同属 EA 常规柱塞泵系列，后续统一在这里补 FAQ。
   */
  "EA常规柱塞泵": [
    {
      question: "EA 常规柱塞泵适合哪些应用场景？",
      answer:
        "EA 常规柱塞泵适用于 IVD 诊断设备、生命科学仪器、实验室自动化设备和分析仪器中的试剂分配、定量输送和液路集成场景。",
    },
  ],
};

export function getProductDetailFaqZhBySeries(
  series?: string,
): ProductDetailFaqZhItem[] {
  if (!series) {
    return [];
  }

  return productDetailFaqZhBySeries[series] ?? [];
}
