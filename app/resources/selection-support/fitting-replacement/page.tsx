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
   5. 当前默认加载 Q20 系列
   6. 后续 Q40 / Q60 可以复用同样入口结构

   注意：
   1. 这里不要直接写产品数据
   2. 产品数据来自 data/resources/fitting-replacement/
   3. 数据获取统一走 services/resources/getFittingReplacementHomeData.ts
   4. 页面交互统一写在 FittingReplacementHome.tsx
   5. 样式统一写在 fitting-replacement.css
========================================================= */

import type { Metadata } from "next";

import FittingReplacementHome from "@/components/resources/fitting-replacement/FittingReplacementHome";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementHomeData } from "@/services/resources/getFittingReplacementHomeData";

import "./fitting-replacement.css";

/* =========================================================
   当前页面系列配置

   说明：
   1. 当前中文入口默认展示 Q20 快插接头
   2. 后续如果首页支持 Q40 / Q60 切换，可以改为更上层配置
   3. 这里先不要写死 q20 字符串，统一从系列配置读取
========================================================= */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* =========================================================
   页面 SEO 信息

   说明：
   1. 当前页面是“接头替代查询”工具首页
   2. SEO 文案暂时围绕 Q20 快插接头
   3. 后续多系列合并时，可以改成“微流体接头替代查询”
========================================================= */
export const metadata: Metadata = {
  title: `${SERIES_CONFIG.sourceLabel}｜选型支持｜恒永达`,
  description: `输入竞品编码、商品编码或恒永达型号，快速查找 ${SERIES_CONFIG.productName} 对应产品，并查看型号解析信息。`,
};

/* =========================================================
   中文接头替代查询页面

   说明：
   1. page.tsx 只负责调用 service
   2. 不在这里写搜索、筛选、分页、清单逻辑
   3. 后续接后端 / CMS / 数据库时，优先改 service 层
========================================================= */
export default async function FittingReplacementPage() {
  const pageData = await getFittingReplacementHomeData(
    SERIES_CONFIG.seriesKey
  );

  return <FittingReplacementHome data={pageData} />;
} 