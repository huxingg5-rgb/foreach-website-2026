/* =========================================================
   getProductDetailPageData.ts
   恒永达官网｜中文产品详情页数据服务层

   当前 EA 数据来源：
   1. 详情资料：
      ea-product-details.zh.generated.ts
   2. 规格参数：
      ea-product-specs.zh.generated.ts
   3. 主图：
      优先读取产品选型生成数据中的 imageCard
   4. 附属图片：
      读取详情页资料生成数据

   说明：
   1. 当前正式 EA slug 不包含 ul：
      ea-100-pmma
      ea-100-peek
   2. 当前不再生成旧测试路由 ea-100-pmma
   3. 页面样式与组件结构不在本文件修改
========================================================= */

import {
  eaProductDetailStaticParams,
  getEaProductDetailZhBySlug,
} from "@/data/products/detail/ea-product-details.zh.generated";

import {
  getEaProductSpecsZhBySlug,
} from "@/data/products/detail/ea-product-specs.zh.generated";

import { selectionProducts } from "@/data/products/selection/product-selection.generated";

import { getProductDetailFaqZhBySeries } from "@/data/products/detail/product-detail-faq.zh";

import type {
  ProductDetailCategory,
  ProductDetailPageData,
} from "@/data/products/detail/product-detail.types";

/* =========================================================
   获取选型页面中的 EA 主图

   选型数据当前仍使用旧格式 slug：
   ea-100-pmma

   新详情页使用：
   ea-100-pmma

   因此这里根据容量与材质构造选型 slug，
   只用于查找选型主图，不影响正式详情页 URL。
========================================================= */
function getEaSelectionMainImage({
  category,
  capacity,
  material,
}: {
  category: string;
  capacity: number;
  material: "PMMA" | "PEEK";
}) {
  const selectionSlug =
    `ea-${capacity}-${material.toLowerCase()}`;

  const selectionProduct = selectionProducts.find(
    (item) =>
      item.categoryId === category &&
      item.seriesId === "ea" &&
      item.detailSlug === selectionSlug &&
      item.status === "active",
  );

  return selectionProduct?.imageCard || null;
}

/* =========================================================
   获取详情页数据
========================================================= */
export function getProductDetailPageData({
  category,
  slug,
}: {
  category: string;
  slug: string;
}): ProductDetailPageData | null {
  if (category !== "pumps") {
    return null;
  }

  const detailRecord = getEaProductDetailZhBySlug(slug);

  if (!detailRecord || detailRecord.category !== category) {
    return null;
  }

  const mainImageFromSelection = getEaSelectionMainImage({
    category,
    capacity: detailRecord.capacity,
    material: detailRecord.material,
  });

  const specs = getEaProductSpecsZhBySlug(
    detailRecord.slug,
  ).map((item) => ({
    label: item.name,
    value: item.value,
  }));

  return {
    category: detailRecord.category,
    slug: detailRecord.slug,
    model: detailRecord.model,
    name: detailRecord.name,

    advantages: detailRecord.advantages,
    commonApplications: detailRecord.commonApplications,
    additionalImages: detailRecord.additionalImages,

    showConfigurator: detailRecord.showConfiguration,
    showDatasheetRequest:
      detailRecord.showDatasheetRequest,
    showDrawingRequest: detailRecord.show2DRequest,
    show3DRequest: detailRecord.show3DRequest,

    /*
     * FAQ 第一版只预留，不渲染。
     */
    faqKey: detailRecord.faqSeries || undefined,
    faqs: getProductDetailFaqZhBySeries(
      detailRecord.faqSeries,
    ),

    /*
     * 用于标识当前规格系列。
     */
    specSeriesKey: detailRecord.productFamily,

    /*
     * 主图优先来自产品选型数据。
     * 如果选型生成数据暂时没有匹配项，
     * 则使用转换脚本按正式图片文件生成的兜底路径。
     */
    mainImage:
      mainImageFromSelection ||
      detailRecord.mainImage ||
      null,

    specs,
  };
}

/* =========================================================
   构建静态详情页路径

   output: export 模式要求：
   所有详情页路径必须在 generateStaticParams 中出现。
========================================================= */
export function getAllProductDetailRouteParams(): Array<{
  category: ProductDetailCategory;
  slug: string;
}> {
  return eaProductDetailStaticParams.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}