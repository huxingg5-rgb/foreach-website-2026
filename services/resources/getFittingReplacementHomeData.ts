/* =========================================================
   getFittingReplacementHomeData.ts
   恒永达官网｜接头替代查询首页数据服务层

   文件路径：
   services/resources/getFittingReplacementHomeData.ts

   作用：
   1. 获取接头替代查询首页数据
   2. 当前阶段默认读取：
      fittings / quick-connect / q20
   3. 后续新增 Q40、硬管接头、倒刺接头时，在数据源映射里继续扩展
   4. 后期接 CMS / API / 数据库时，优先修改这里

   当前数据层级：
   fitting-replacement
   └─ fittings
      └─ quick-connect
         └─ q20
========================================================= */

import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";
import { fittingReplacementQuickConnectQ20PageZh } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.zh";

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementSeriesConfig } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

/* =========================================================
   首页静态数据源类型

   说明：
   1. productData：当前系列产品数据、型号规则、搜索基础数据
   2. pageText：当前系列页面 Banner、面包屑、搜索文案
========================================================= */
interface FittingReplacementHomeStaticDataSource {
  productData: typeof fittingReplacementQuickConnectQ20ZhData;
  pageText: typeof fittingReplacementQuickConnectQ20PageZh;
}

/* =========================================================
   当前支持的首页数据源映射

   当前：
   q20 = fittings / quick-connect / q20

   后续：
   q40       = fittings / quick-connect / q40
   hardTube  = fittings / hard-tube
   barbed    = fittings / barbed
========================================================= */
const FITTING_REPLACEMENT_HOME_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementHomeStaticDataSource
> = {
  q20: {
    productData: fittingReplacementQuickConnectQ20ZhData,
    pageText: fittingReplacementQuickConnectQ20PageZh,
  },
};

/* =========================================================
   获取当前系列首页数据源
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
   2. 如果旧文案里仍然出现“接头型号替代查询 / 型号替代查询”
      在 service 层统一替换成系列配置里的 sourceLabel
   3. String(item.label) 用于避免 TypeScript 字面量类型收窄报错
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
   2. 后续如果页面要切换 Q40 / 硬管 / 倒刺，可以传入对应系列
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
   后续如果需要生成站点地图、搜索索引、产品统计，可以复用。
========================================================= */
export function getFittingReplacementHomeProducts(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementHomeStaticDataSource(seriesKey);

  return dataSource.productData.products;
}

/* =========================================================
   获取当前系列首页型号规则
========================================================= */
export function getFittingReplacementHomeModelRules(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementHomeStaticDataSource(seriesKey);

  return dataSource.productData.modelRules;
} 