/* =========================================================
   getFittingReplacementDetailData.ts
   恒永达官网｜接头替代查询详情页数据服务层

   文件路径：
   services/resources/getFittingReplacementDetailData.ts

   作用：
   1. 根据商品编码读取单个接头替代详情
   2. 当前阶段默认读取：
      fittings / quick-connect / q20
   3. 产品数据来自 q20.zh.ts
   4. 详情页多语言文案来自 q20.detail.intl.ts
   5. 支持 zh / en / es / fr / ko / ru 多语言详情页文案
   6. 后期接后台 / 数据库时，优先改这个文件
========================================================= */

import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";

import { getFittingReplacementQuickConnectQ20DetailIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl";

import {
  publishedFittingReplacementProducts,
} from "@/services/resources/fitting-replacement/getPublishedFittingReplacementProducts";

import type {
  FittingModelRule,
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

/* =========================================================
   详情页多语言文案类型
========================================================= */
type FittingReplacementDetailText = ReturnType<
  typeof getFittingReplacementQuickConnectQ20DetailIntl
>;

/* =========================================================
   详情页数据类型
========================================================= */
export interface FittingReplacementDetailPageData {
  /* 当前商品数据 */
  product: FittingReplacementProduct;

  /* 型号解析规则 */
  modelRules: FittingModelRule[];

  /* 面包屑 */
  breadcrumbs: {
    label: string;
    href?: string;
  }[];

  /* 详情页多语言文案 */
  detailText: FittingReplacementDetailText;
}

/* =========================================================
   静态数据源类型

   说明：
   1. pageData：当前系列产品数据与型号规则
   2. 详情页文案不放在这里
   3. 详情页文案统一从 q20.detail.intl.ts 按 locale 读取
========================================================= */
interface FittingReplacementStaticDataSource {
  pageData: typeof fittingReplacementQuickConnectQ20ZhData;
}

/* =========================================================
   当前支持的详情页数据源映射

   当前：
   q20 = fittings / quick-connect / q20

   后续：
   q40       = fittings / quick-connect / q40
   hardTube  = fittings / hard-tube
   barbed    = fittings / barbed
========================================================= */
const publishedQ20ReplacementProducts =
  publishedFittingReplacementProducts
    .filter(
      (product) =>
        normalizeValue(product.productSeries) === "Q20"
    )
    .map((product) => {
      const originalProduct =
        fittingReplacementQuickConnectQ20ZhData.products.find(
          (item) =>
            normalizeValue(item.productCode) ===
              normalizeValue(product.productCode) &&
            normalizeValue(item.foreachModel) ===
              normalizeValue(product.foreachModel)
        );

      return {
        ...product,
        packageText:
          originalProduct?.packageText ?? product.packageText,
        note:
          originalProduct?.note ?? product.note,
        drawingPdfPath:
          originalProduct?.drawingPdfPath ??
          product.drawingPdfPath,
      };
    });

const publishedQ20ReplacementPageData = {
  ...fittingReplacementQuickConnectQ20ZhData,
  products: publishedQ20ReplacementProducts,
};

const FITTING_REPLACEMENT_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementStaticDataSource
> = {
  q20: {
    pageData: publishedQ20ReplacementPageData,
  },
};

/* =========================================================
   统一处理编码
========================================================= */
function normalizeValue(value: unknown) {
  return String(value ?? "").trim().toUpperCase();
}

/* =========================================================
   获取当前系列的数据源
========================================================= */
function getFittingReplacementStaticDataSource(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return FITTING_REPLACEMENT_STATIC_DATA_SOURCE_MAP[seriesKey];
}

/* =========================================================
   根据商品编码查找产品

   说明：
   1. 只在当前 seriesKey 对应的数据源里查找
   2. 不跨系列查找，避免后续不同系列商品编码或型号逻辑混乱
========================================================= */
function findFittingReplacementProductByCode(
  productCode: string,
  products: FittingReplacementProduct[]
) {
  const decodedProductCode = decodeURIComponent(productCode);
  const targetCode = normalizeValue(decodedProductCode);

  return (
    products.find((item) => {
      return normalizeValue(item.productCode) === targetCode;
    }) || null
  );
}

/* =========================================================
   生成详情页面包屑

   说明：
   1. 基础层级来自 q20.detail.intl.ts
   2. 最后一项当前产品型号由 service 自动补上
   3. 这样不会污染自动生成的产品数据文件
========================================================= */
function createDetailBreadcrumbs(
  product: FittingReplacementProduct,
  detailText: FittingReplacementDetailText
): FittingReplacementDetailPageData["breadcrumbs"] {
  const baseBreadcrumbs = detailText.breadcrumbs.map((item) => {
    return {
      label: String(item.label),
      href: item.href,
    };
  });

  return [
    ...baseBreadcrumbs,
    {
      label: product.foreachModel,
    },
  ];
}

/* =========================================================
   根据商品编码获取详情页数据

   参数说明：
   1. productCode：商品编码，例如 839085
   2. seriesKey：接头系列，当前默认 q20
   3. locale：语言，中文传 zh，外语传 en / es / fr / ko / ru
========================================================= */
export async function getFittingReplacementDetailData(
  productCode: string,
  seriesKey: FittingReplacementSeriesKey = "q20",
  locale: string = "zh"
): Promise<FittingReplacementDetailPageData | null> {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);
  const detailText = getFittingReplacementQuickConnectQ20DetailIntl(locale);

  const product = findFittingReplacementProductByCode(
    productCode,
    dataSource.pageData.products
  );

  if (!product) {
    return null;
  }

  return {
    product,
    modelRules: [...dataSource.pageData.modelRules],
    breadcrumbs: createDetailBreadcrumbs(product, detailText),
    detailText,
  };
}

/* =========================================================
   静态导出路径

   说明：
   1. 当前路由结构是：
      /resources/selection-support/fitting-replacement/q20/[productCode]
   2. 所以这里仍然只返回 productCode
   3. 后续如果路由升级为 /[seriesKey]/[productCode]
      再改成返回 seriesKey + productCode
========================================================= */
export function getFittingReplacementDetailStaticParams(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  return dataSource.pageData.products.map((product) => {
    return {
      productCode: product.productCode,
    };
  });
}

/* =========================================================
   获取当前系列全部产品
========================================================= */
export function getFittingReplacementProductsBySeries(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  return dataSource.pageData.products;
}

/* =========================================================
   获取当前系列型号解析规则
========================================================= */
export function getFittingReplacementModelRulesBySeries(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  return dataSource.pageData.modelRules;
} 