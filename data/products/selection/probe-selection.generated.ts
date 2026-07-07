/* =========================================================
   probe-selection.generated.ts
   FOREACH 官网｜针系列产品中心卡片数据

   说明：
   1. 针系列全部按来图定制展示
   2. 产品类型分为：采样针 / 穿刺针 / 清洗针 / 搅拌桨
   3. productTypeId 使用中文，便于前台筛选显示
   4. slug / detailSlug / routeSlug 使用英文，避免生成 undefined 路径
========================================================= */

import type { ProductSelectionProduct } from "./product-selection.types";

export const probeFilterLabels = [
  "针系列",
] as const;

const probeProducts = [
  {
    id: "sampling-probes",
    slug: "sampling-probes",
    detailSlug: "sampling-probes",
    routeSlug: "sampling-probes",
    seriesSlug: "sampling-probes",
    productTypeSlug: "sampling-probes",

    productId: "sampling-probes",
    productCode: "Custom Sampling Probe",
    code: "Custom Sampling Probe",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "采样针系列",
    title: "采样针系列",
    name: "采样针系列",
    productName: "采样针系列",

    cardTitle: {
      zh: "采样针系列",
      en: "Sampling Probe Series",
    },

    cardSubtitle: {
      zh: "用于试剂、样本吸取与分配\n可做针尖、侧孔、弯折和长度定制\n支持内壁抛光与液位检测适配",
      en: "For reagent and sample aspiration and dispensing\nCustom tip, side hole, bending and length options\nInner-wall polishing and liquid level detection support",
    },

    image: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
    imagePath: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
    imageUrl: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
    imageAlt: "采样针系列",

    subtitle: "用于试剂、样本吸取与分配，支持来图定制",
    description:
      "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，可根据仪器结构、液体类型、目标容量和液位检测方式进行来图定制。",

    summary:
      "试剂吸取、样本吸取、液体分配，支持针尖、侧孔、弯折、内壁抛光和液位检测适配。",

    tags: ["样本吸取", "试剂分配", "内壁抛光", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "试剂吸取 / 样本吸取 / 液体分配" },
      { label: "可选工艺", value: "内壁抛光 / 侧孔加工 / 涂层处理" },
    ],

    filter01: "针系列",
    filter02: "试剂 / 样本吸取",
    filter03: "内壁抛光",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "试剂 / 样本吸取",
      filter03: "内壁抛光",
      filter04: "来图定制",
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {
    id: "piercing-probes",
    slug: "piercing-probes",
    detailSlug: "piercing-probes",
    routeSlug: "piercing-probes",
    seriesSlug: "piercing-probes",
    productTypeSlug: "piercing-probes",

    productId: "piercing-probes",
    productCode: "Custom Piercing Probe",
    code: "Custom Piercing Probe",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "穿刺针系列",
    title: "穿刺针系列",
    name: "穿刺针系列",
    productName: "穿刺针系列",

    cardTitle: {
      zh: "穿刺针系列",
      en: "Piercing Probe Series",
    },

    cardSubtitle: {
      zh: "用于封膜、瓶塞和耗材穿刺取液\n针管、针尖和排气结构可定制\n适用于试剂仓、样本仓和封闭耗材",
      en: "For piercing sealed films, stoppers and consumables\nCustom tube, tip and venting structures\nFor reagent chambers, sample chambers and closed consumables",
    },

    image: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
    imagePath: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
    imageUrl: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
    imageAlt: "穿刺针系列",

    subtitle: "用于封膜、瓶塞和耗材穿刺取液，支持来图定制",
    description:
      "穿刺针系列用于自动化仪器中封膜、瓶塞、试剂仓、样本仓和密闭耗材的穿刺取液场景，可根据穿刺对象、穿刺深度、液体路径和排气需求进行定制。",

    summary:
      "封膜穿刺、瓶塞穿刺、密闭耗材取液，支持针尖、排气、侧孔和安装端定制。",

    tags: ["穿刺取液", "排气结构", "针尖定制", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "封膜穿刺 / 瓶塞穿刺 / 密闭耗材取液" },
      { label: "可选结构", value: "穿刺针尖 / 排气口 / 侧孔 / 折弯结构" },
    ],

    filter01: "针系列",
    filter02: "穿刺取液",
    filter03: "排气结构",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "穿刺取液",
      filter03: "排气结构",
      filter04: "来图定制",
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {
    id: "wash-probes",
    slug: "wash-probes",
    detailSlug: "wash-probes",
    routeSlug: "wash-probes",
    seriesSlug: "wash-probes",
    productTypeSlug: "wash-probes",

    productId: "wash-probes",
    productCode: "Custom Wash Probe",
    code: "Custom Wash Probe",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "清洗针系列",
    title: "清洗针系列",
    name: "清洗针系列",
    productName: "清洗针系列",

    cardTitle: {
      zh: "清洗针系列",
      en: "Wash Probe Series",
    },

    cardSubtitle: {
      zh: "用于针外壁清洗、废液排出和残液处理\n可做单头、双头、多头和侧孔结构\n适配清洗站与自动化液路模块",
      en: "For outer-wall washing, waste removal and residual liquid handling\nSingle-head, dual-head, multi-head and side-hole options\nFor wash stations and automated fluidic modules",
    },

    image: "/images/products/probes/wash-probes/wash-probes-main.webp",
    imagePath: "/images/products/probes/wash-probes/wash-probes-main.webp",
    imageUrl: "/images/products/probes/wash-probes/wash-probes-main.webp",
    imageAlt: "清洗针系列",

    subtitle: "用于清洗排废与残液处理，支持清洗站适配",
    description:
      "清洗针系列用于自动化分析仪器中的针外壁清洗、针内壁冲洗、废液排出和残液处理，可根据清洗站结构、清洗液路径、废液路径和喷孔方向进行定制。",

    summary:
      "针外壁清洗、针内壁冲洗、废液抽排，支持单头、双头、多头和侧孔结构。",

    tags: ["清洗排废", "多头结构", "侧孔加工", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "针外壁清洗 / 针内壁冲洗 / 废液抽排" },
      { label: "可选结构", value: "单头 / 双头 / 多头 / 侧孔喷洗" },
    ],

    filter01: "针系列",
    filter02: "清洗 / 排废",
    filter03: "侧孔加工",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "清洗 / 排废",
      filter03: "侧孔加工",
      filter04: "来图定制",
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {
    id: "stirring-paddles",
    slug: "stirring-paddles",
    detailSlug: "stirring-paddles",
    routeSlug: "stirring-paddles",
    seriesSlug: "stirring-paddles",
    productTypeSlug: "stirring-paddles",

    productId: "stirring-paddles",
    productCode: "Custom Stirring Paddle",
    code: "Custom Stirring Paddle",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "搅拌桨系列",
    title: "搅拌桨系列",
    name: "搅拌桨系列",
    productName: "搅拌桨系列",

    cardTitle: {
      zh: "搅拌桨系列",
      en: "Stirring Paddle Series",
    },

    cardSubtitle: {
      zh: "用于样本、试剂和反应液混匀\n支持平板、螺旋、90度角叶片等结构\n可按杯型、转速和混匀效果定制",
      en: "For sample, reagent and reaction-liquid mixing\nFlat, spiral and 90-degree blade options\nCustomizable by cup geometry, speed and mixing effect",
    },

    image: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
    imagePath: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
    imageUrl: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
    imageAlt: "搅拌桨系列",

    subtitle: "用于杯内混匀与反应液搅拌，支持来图定制",
    description:
      "搅拌桨系列用于自动化分析仪器中的样本、试剂、稀释液和反应液混匀场景，可根据反应杯结构、目标液量、搅拌空间、转速范围和混匀效果进行来图定制。",

    summary:
      "样本混匀、试剂混匀、反应液混匀，支持平板、螺旋、90度角叶片和涂层处理。",

    tags: ["混匀搅拌", "叶片定制", "涂层可选", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "样本混匀 / 试剂混匀 / 反应液混匀" },
      { label: "可选结构", value: "平板 / 螺旋 / 90度角叶片 / 表面涂层" },
    ],

    filter01: "针系列",
    filter02: "搅拌 / 混匀",
    filter03: "涂层处理",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "搅拌 / 混匀",
      filter03: "涂层处理",
      filter04: "来图定制",
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },
] as const;

export const probeSelectionProducts =
  probeProducts as unknown as ProductSelectionProduct[];
