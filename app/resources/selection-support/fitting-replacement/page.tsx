/* =========================================================
   page.tsx
   恒永达官网｜接头替代查询页面入口

   文件路径：
   app/resources/selection-support/fitting-replacement/page.tsx

   页面路径：
   /resources/selection-support/fitting-replacement

   作用：
   1. 作为中文接头替代查询页面入口
   2. 引入页面专用 CSS
   3. 从 service 层获取当前系列数据
   4. 渲染 FittingReplacementHome 客户端组件
   5. 当前默认加载 Q20 快插接头
   6. 中文页面固定传 locale = zh
========================================================= */

import type { Metadata } from "next";

import FittingReplacementHome from "@/components/resources/fitting-replacement/FittingReplacementHome";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementHomeData } from "@/services/resources/getFittingReplacementHomeData";

import "./fitting-replacement.css";

/* 当前页面系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* 当前页面语言 */
const PAGE_LOCALE = "zh";

/* =========================================================
   页面 SEO 信息
========================================================= */
export const metadata: Metadata = {
  title: `${SERIES_CONFIG.sourceLabel}｜选型支持｜恒永达`,
  description: `输入竞品编码、商品编码或恒永达型号，快速查找 ${SERIES_CONFIG.productName} 对应产品，并查看型号解析信息。`,
};

/* =========================================================
   中文接头替代查询页面
========================================================= */
export default async function FittingReplacementPage() {
  const pageData = await getFittingReplacementHomeData(
    SERIES_CONFIG.seriesKey,
    PAGE_LOCALE
  );

  return <FittingReplacementHome data={pageData} />;
} 