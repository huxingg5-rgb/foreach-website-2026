/* =========================================================
   fitting-replacement.detail.zh.ts
   恒永达官网｜接头替代查询详情页文案

   文件路径：
   data/resources/fitting-replacement/fitting-replacement.detail.zh.ts

   所属模块：
   资源中心 > 接头替代查询 > 产品详情页

   页面路径：
   /resources/selection-support/fitting-replacement/q20/[productCode]

   说明：
   1. 本文件不参与 Excel 自动生成
   2. 不会被 convert-q20-fitting-replacement.ts 覆盖
   3. 专门管理详情页展示文案
   4. 产品数据、型号规则、图片路径仍然来自自动生成文件：
      data/resources/fitting-replacement/fitting-replacement.zh.ts
   5. 后期接多语言时，可新增：
      fitting-replacement.detail.en.ts
      fitting-replacement.detail.es.ts
      fitting-replacement.detail.fr.ts
      fitting-replacement.detail.ko.ts
      fitting-replacement.detail.ru.ts
========================================================= */

export const fittingReplacementQuickConnectQ20DetailZh = {
  /* =====================================================
     面包屑基础项

     说明：
     最后一个当前产品型号由 service 层根据 product.foreachModel 自动补上。
  ===================================================== */
  breadcrumbs: [
    {
      label: "首页",
      href: "/",
    },
    {
      label: "资源中心",
      href: "/resources",
    },
    {
      label: "接头替代查询",
      href: "/resources/selection-support/fitting-replacement",
    },
  ],

  /* =====================================================
     详情页按钮文案
  ===================================================== */
  actions: {
    addToCart: "加入清单",
    addedToCart: "已加入清单",
    addDrawing: "添加图纸",
    drawingAdded: "已添加图纸",
  },

  /* =====================================================
     2D 图纸预览文案
  ===================================================== */
  drawingPreview: {
    title: "2D 图纸",
    loadingLabel: "正在加载 2D 图纸...",
    previewButton: "点击预览图纸",
    downloadTip: "如需下载，请添加至清单列表",
  },

  /* =====================================================
     详情表格字段文案
  ===================================================== */
  tableLabels: {
    productCode: "商品编码",
    compatibleCode: "兼容编码",
  },

  /* =====================================================
     清单来源文案
  ===================================================== */
  cart: {
    sourceLabel: "接头替代查询",
    productNameFallback: "Q20 快插接头",
  },
} as const; 