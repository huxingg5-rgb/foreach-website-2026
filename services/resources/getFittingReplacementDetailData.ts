/* =========================================================
   getFittingReplacementDetailData.ts
   恒永达官网｜接头替代查询详情页数据服务层

   文件路径：
   services/resources/getFittingReplacementDetailData.ts

   作用：
   1. 根据商品编码读取单个接头替代详情
   2. 当前阶段默认读取：
      fittings / quick-connect / q20
   3. 后续新增 Q40、硬管接头、倒刺接头时，在数据源映射里继续扩展
   4. 后期接后台 / 数据库时，优先改这个文件

   当前数据层级：
   fitting-replacement
   └─ fittings
      └─ quick-connect
         └─ q20
========================================================= */

import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";
import { fittingReplacementQuickConnectQ20DetailZh } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.zh";

import type {
  FittingModelRule,
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementSeriesConfig } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

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
}

/* =========================================================
   静态数据源类型

   说明：
   1. pageData：当前系列产品数据与型号规则
   2. detailText：当前系列详情页文案
========================================================= */
interface FittingReplacementStaticDataSource {
  pageData: typeof fittingReplacementQuickConnectQ20ZhData;
  detailText: typeof fittingReplacementQuickConnectQ20DetailZh;
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
const FITTING_REPLACEMENT_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementStaticDataSource
> = {
  q20: {
    pageData: fittingReplacementQuickConnectQ20ZhData,
    detailText: fittingReplacementQuickConnectQ20DetailZh,
  },
};

/* =========================================================
   统一处理编码
========================================================= */
function normalizeValue(value: string) {
  return value.trim().toUpperCase();
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
   1. 基础层级来自详情页文案文件
   2. 最后一项当前产品型号由 service 自动补上
   3. String(item.label) 用于避免 TypeScript 字面量类型收窄报错
========================================================= */
function createDetailBreadcrumbs(
  product: FittingReplacementProduct,
  seriesKey: FittingReplacementSeriesKey
): FittingReplacementDetailPageData["breadcrumbs"] {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);
  const seriesConfig = getFittingReplacementSeriesConfig(seriesKey);

  const baseBreadcrumbs = dataSource.detailText.breadcrumbs.map((item) => {
    const label = String(item.label);

    if (label === "接头型号替代查询" || label === "型号替代查询") {
      return {
        label: seriesConfig.sourceLabel,
        href: seriesConfig.homeHref,
      };
    }

    return {
      label,
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
========================================================= */
export async function getFittingReplacementDetailData(
  productCode: string,
  seriesKey: FittingReplacementSeriesKey = "q20"
): Promise<FittingReplacementDetailPageData | null> {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

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
    breadcrumbs: createDetailBreadcrumbs(product, seriesKey),
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