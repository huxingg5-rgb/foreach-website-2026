/* =========================================================
   getFittingReplacementHomeData.ts
   恒永达官网｜接头替代查询首页数据服务层

   文件路径：
   services/resources/getFittingReplacementHomeData.ts

   作用：
   1. 获取接头替代查询首页数据
   2. 当前阶段默认读取 Q20 本地静态数据
   3. 获取页面文案数据
   4. 统一输出给 FittingReplacementHome 组件
   5. 后期接 CMS / API / 数据库时，优先修改这里
   6. 为后续 Q40 / Q60 / 其他接头系列预留 seriesKey 参数

   当前阶段：
   1. 中文页面路径仍然是：
      /resources/selection-support/fitting-replacement
   2. 默认展示 Q20 产品替换表
   3. 后续如果首页要支持切换 Q20 / Q40 / Q60，
      优先扩展本文件的数据源映射，不要直接改组件
========================================================= */

import { fittingReplacementZhData } from "@/data/resources/fitting-replacement/fitting-replacement.zh";
import { fittingReplacementPageZh } from "@/data/resources/fitting-replacement/fitting-replacement.page.zh";

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementSeriesConfig } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

/* =========================================================
   首页静态数据源类型

   说明：
   1. productData：产品数据、型号规则、自动生成搜索数据
   2. pageText：页面 Banner、面包屑、搜索框文案等手写内容
   3. 后续 Q40 / Q60 有独立数据文件时，在这里继续扩展
========================================================= */
interface FittingReplacementHomeStaticDataSource {
  productData: typeof fittingReplacementZhData;
  pageText: typeof fittingReplacementPageZh;
}

/* =========================================================
   当前支持的首页数据源映射

   说明：
   1. 当前只有 q20
   2. 后续新增 Q40 / Q60 时，建议新增类似文件：
      - fitting-replacement.q40.zh.ts
      - fitting-replacement.q60.zh.ts
      - fitting-replacement.q40.page.zh.ts
      - fitting-replacement.q60.page.zh.ts
   3. 然后在这里继续补充：
      q40: {
        productData: fittingReplacementQ40ZhData,
        pageText: fittingReplacementQ40PageZh,
      }
========================================================= */
const FITTING_REPLACEMENT_HOME_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementHomeStaticDataSource
> = {
  q20: {
    productData: fittingReplacementZhData,
    pageText: fittingReplacementPageZh,
  },
};

/* =========================================================
   获取当前系列首页数据源

   说明：
   1. 当前默认 q20
   2. 后续 Q40 / Q60 接入后，只需要传入对应 seriesKey
========================================================= */
function getFittingReplacementHomeStaticDataSource(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return FITTING_REPLACEMENT_HOME_STATIC_DATA_SOURCE_MAP[seriesKey];
}

/* =========================================================
   生成首页面包屑

   说明：
   1. 基础面包屑来自 pageText
   2. 如果文案里仍然写“接头型号替代查询”或“型号替代查询”
      在 service 层统一替换成系列配置里的 sourceLabel
   3. String(item.label) 用来把字面量类型转成普通 string
      避免 TypeScript 判断旧文案永远不可能出现而报错
   4. 返回给组件的是普通数组，不是 readonly 数组
========================================================= */
function createFittingReplacementHomeBreadcrumbs(
  seriesKey: FittingReplacementSeriesKey
): FittingReplacementPageData["breadcrumbs"] {
  const dataSource = getFittingReplacementHomeStaticDataSource(seriesKey);
  const seriesConfig = getFittingReplacementSeriesConfig(seriesKey);

  return dataSource.pageText.breadcrumbs.map((item) => {
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
} 

/* =========================================================
   获取接头替代查询首页数据

   参数说明：
   1. seriesKey：接头系列，当前默认 q20
   2. 后续如果页面要切换 Q40 / Q60，可以传入对应系列

   返回内容：
   1. products：产品数据
   2. modelRules：型号解析规则
   3. banner：页面 Banner 文案
   4. breadcrumbs：面包屑
   5. search：搜索框文案与搜索数据
========================================================= */
export async function getFittingReplacementHomeData(
  seriesKey: FittingReplacementSeriesKey = "q20"
): Promise<FittingReplacementPageData> {
  const dataSource = getFittingReplacementHomeStaticDataSource(seriesKey);

  return {
    ...dataSource.productData,

    banner: dataSource.pageText.banner,

    breadcrumbs: createFittingReplacementHomeBreadcrumbs(seriesKey),

    search: {
      ...dataSource.productData.search,
      ...dataSource.pageText.search,
    },
  };
}

/* =========================================================
   获取当前系列首页产品数据

   说明：
   1. 当前暂时未被页面直接调用
   2. 后续如果需要生成站点地图、搜索索引、产品统计，可以复用
========================================================= */
export function getFittingReplacementHomeProducts(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementHomeStaticDataSource(seriesKey);

  return dataSource.productData.products;
}

/* =========================================================
   获取当前系列首页型号规则

   说明：
   后续如果其它模块只需要型号规则，可以直接调用这个方法。
========================================================= */
export function getFittingReplacementHomeModelRules(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementHomeStaticDataSource(seriesKey);

  return dataSource.productData.modelRules;
} 