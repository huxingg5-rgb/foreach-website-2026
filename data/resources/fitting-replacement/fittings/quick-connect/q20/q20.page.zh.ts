/* =========================================================
   fitting-replacement.page.zh.ts
   恒永达官网｜接头替代查询页面文案

   文件路径：
   data/resources/fitting-replacement/fitting-replacement.page.zh.ts

   所属模块：
   资源中心 > 接头替代查询
   页面路径：
   /resources/selection-support/fitting-replacement

   =========================================================
   文件结构说明
   =========================================================

   1. fitting-replacement.zh.ts
      - 自动生成文件
      - 来源：Excel / 脚本转换
      - 存放：产品数据、型号规则、图片路径、兼容编码
      - 不建议手动修改，避免下次生成时被覆盖

   2. fitting-replacement.page.zh.ts
      - 手写页面文案文件
      - 存放：Banner、面包屑、搜索框、按钮等页面展示文案
      - 不参与自动生成
      - 后期多语言时，可新增：
        fitting-replacement.page.en.ts
        fitting-replacement.page.es.ts
        fitting-replacement.page.fr.ts
        fitting-replacement.page.ko.ts
        fitting-replacement.page.ru.ts

   3. getFittingReplacementHomeData.ts
      - 数据服务层
      - 负责把“自动生成产品数据”和“手写页面文案”合并
      - 页面组件只读取最终合并后的 data
      - 后期接 CMS / API / 数据库时，优先改 service 层

   4. FittingReplacementHome.tsx
      - 页面展示组件
      - 只负责渲染页面和交互
      - 不直接写死产品数据
      - 不直接读取 Excel

   =========================================================
   当前原则
   =========================================================

   产品数据自动生成：
   fitting-replacement.zh.ts

   页面文案人工维护：
   fitting-replacement.page.zh.ts

   数据统一出口：
   services/resources/getFittingReplacementHomeData.ts

   组件只负责展示：
   components/resources/fitting-replacement/FittingReplacementHome.tsx
========================================================= */

/* =========================================================
   fitting-replacement.page.zh.ts
   恒永达官网｜接头替代查询页面文案

   文件路径：
   data/resources/fitting-replacement/fitting-replacement.page.zh.ts

   说明：
   1. 本文件不参与 Excel 自动生成
   2. 不会被 convert-q20-fitting-replacement.ts 覆盖
   3. 专门管理页面文案
   4. 产品数据仍然来自自动生成文件
   5. 后期英文、西语等语言直接新增对应文件即可
========================================================= */

export const fittingReplacementQuickConnectQ20PageZh = {
  /* =====================================================
     Banner
  ===================================================== */
  banner: {
    eyebrow: "",
    title: "接头替代查询", 
    description:
      "输入竞品编码、商品编码或恒永达型号，快速查找对应产品。",
  },

  /* =====================================================
     面包屑
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
     搜索区
  ===================================================== */
  search: {
    placeholder: "输入商品编码、兼容编码或恒永达型号",
    buttonText: "搜索",
  },
} as const;