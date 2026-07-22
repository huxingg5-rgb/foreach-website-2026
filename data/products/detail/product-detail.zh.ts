/* =========================================================
   product-detail.zh.ts
   恒永达官网｜中文产品详情页测试数据

   说明：
   1. 页面 slug 与产品选型数据中的 detailSlug 保持一致
   2. 主图继续由选型页面基础数据提供
   3. 本文件不重复维护主图
========================================================= */

import type { ProductDetailZhRecord } from "./product-detail.types";

export const productDetailZhData: ProductDetailZhRecord[] = [
  {
    category: "pumps",
    slug: "ea-100ul-pmma",

    model: "EA-100-PMMA",
    name: "常规柱塞泵",

    advantages: [
      "适合对安装空间、控制联动和系统稳定性要求更高的自动化液路系统，可用于复杂设备中的定量输送模块。",
    ],

    commonApplications: [
      "IVD 诊断设备",
      "生命科学仪器",
      "实验室自动化",
      "分析仪器",
    ],

    /*
     * 这里只维护详情页附属图片。
     * 没有附属图片时保持空数组。
     */
    additionalImages: [],

    showConfigurator: true,
    showDatasheetRequest: true,
    showDrawingRequest: true,
    show3DRequest: true,

    /*
     * 第一版只预留 FAQ，不在页面显示。
     */
    faqKey: "ea-conventional-plunger-pump",

    specSeriesKey: "ea-conventional-plunger-pump",
  },
];