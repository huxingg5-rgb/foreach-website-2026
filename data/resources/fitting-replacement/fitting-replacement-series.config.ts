/* =========================================================
   fitting-replacement-series.config.ts
   恒永达官网｜接头替代查询系列配置

   文件路径：
   data/resources/fitting-replacement/fitting-replacement-series.config.ts

   作用：
   1. 统一管理接头替代查询不同系列的基础配置
   2. 避免在 Home / Detail / Guide 组件里到处写死 q20 路径
   3. 为后续 Q40 / Q60 / 其他接头系列做模板
   4. 后续新增系列时，优先在这里增加配置

   当前支持：
   1. Q20 快插接头

   后续扩展示例：
   q40: {
     seriesKey: "q40",
     seriesCode: "Q40",
     productName: "Q40 快插接头",
     ...
   }
========================================================= */

export type FittingReplacementSeriesKey = "q20";

/* =========================================================
   接头系列配置类型

   字段说明：
   1. seriesKey：用于 URL 路径，例如 q20
   2. seriesCode：用于显示系列，例如 Q20
   3. productName：用于清单和卡片展示
   4. sourceType：用于全局选型清单区分来源
   5. sourceLabel：用于全局选型清单显示来源名称
   6. homeHref：接头替代查询首页路径
   7. detailBaseHref：当前系列详情页基础路径
   8. drawingBaseHref：当前系列 2D 图纸 PDF 文件夹路径
========================================================= */
export interface FittingReplacementSeriesConfig {
  seriesKey: FittingReplacementSeriesKey;
  seriesCode: string;
  productName: string;
  sourceType: "fitting-replacement";
  sourceLabel: string;
  homeHref: string;
  detailBaseHref: string;
  drawingBaseHref: string;
}

/* =========================================================
   Q20 系列配置

   注意：
   1. 中文默认路径不加 /zh-CN
   2. public 目录下文件引用时，不需要写 public
========================================================= */
export const Q20_FITTING_REPLACEMENT_SERIES_CONFIG: FittingReplacementSeriesConfig =
  {
    seriesKey: "q20",
    seriesCode: "Q20",
    productName: "Q20 快插接头",
    sourceType: "fitting-replacement",
    sourceLabel: "接头替代查询",
    homeHref: "/resources/selection-support/fitting-replacement",
    detailBaseHref: "/resources/selection-support/fitting-replacement/q20",
    drawingBaseHref:
      "/downloads/resources/selection-support/fitting-replacement/q20/drawings",
  };

/* =========================================================
   系列配置集合

   说明：
   后续新增 q40 / q60 时，在这里继续补。
========================================================= */
export const FITTING_REPLACEMENT_SERIES_CONFIG_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementSeriesConfig
> = {
  q20: Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
};

/* =========================================================
   获取系列配置

   说明：
   1. 当前默认返回 Q20
   2. 后续如果详情页路由扩展为 /[seriesKey]/[productCode]
      可以根据 seriesKey 动态读取
========================================================= */
export function getFittingReplacementSeriesConfig(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return FITTING_REPLACEMENT_SERIES_CONFIG_MAP[seriesKey];
}

/* =========================================================
   生成详情页路径
========================================================= */
export function getFittingReplacementDetailHref(
  productCode: string,
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const config = getFittingReplacementSeriesConfig(seriesKey);

  return `${config.detailBaseHref}/${encodeURIComponent(productCode)}`;
}

/* =========================================================
   生成 2D 图纸 PDF 路径
========================================================= */
export function getFittingReplacementDrawingPdfHref(
  foreachModel: string,
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const config = getFittingReplacementSeriesConfig(seriesKey);

  return `${config.drawingBaseHref}/${foreachModel}.pdf`;
} 