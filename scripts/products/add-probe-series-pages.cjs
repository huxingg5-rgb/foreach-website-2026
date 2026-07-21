const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function abs(relativePath) {
  return path.join(root, relativePath);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

function writeFileWithBackup(relativePath, content) {
  const filePath = abs(relativePath);
  ensureDir(filePath);
  backup(filePath, "probe_series");
  fs.writeFileSync(filePath, content, "utf8");
  console.log("已写入：" + relativePath);
}

function detectProbeCategoryId() {
  const files = [
    "components/products/selection/ProductSelectionClient.tsx",
    "data/products/selection/product-type-intro.ts",
    "data/products/selection/product-route-map.ts",
    "data/products/selection/product-selection.types.ts",
  ];

  for (const relativePath of files) {
    const filePath = abs(relativePath);
    if (!fs.existsSync(filePath)) continue;

    const text = fs.readFileSync(filePath, "utf8");

    const patterns = [
      /id:\s*["']([^"']+)["'][\s\S]{0,300}?label:\s*["']针系列["']/,
      /label:\s*["']针系列["'][\s\S]{0,300}?id:\s*["']([^"']+)["']/,
      /value:\s*["']针系列["'][\s\S]{0,300}?id:\s*["']([^"']+)["']/,
      /zh:\s*["']针系列["'][\s\S]{0,300}?id:\s*["']([^"']+)["']/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    if (text.includes("针系列") && text.includes("probes")) {
      return "probes";
    }

    if (text.includes("针系列") && text.includes("needles")) {
      return "needles";
    }
  }

  return "probes";
}

const probeCategoryId = detectProbeCategoryId();

console.log("检测到针系列 categoryId：" + probeCategoryId);

/* =========================================================
   1. 图片预留目录
========================================================= */

const imageSlots = [
  {
    dir: "public/images/products/probes/sampling-probes",
    file: "sampling-probes-main.webp",
  },
  {
    dir: "public/images/products/probes/piercing-probes",
    file: "piercing-probes-main.webp",
  },
  {
    dir: "public/images/products/probes/wash-probes",
    file: "wash-probes-main.webp",
  },
  {
    dir: "public/images/products/probes/stirring-paddles",
    file: "stirring-paddles-main.webp",
  },
];

for (const item of imageSlots) {
  const dirPath = abs(item.dir);
  fs.mkdirSync(dirPath, { recursive: true });

  const readme = `把主图放到当前目录，并使用下面文件名：\n\n${item.file}\n\n官网访问路径：\n/${item.dir.replace(/^public\//, "")}/${item.file}\n`;

  const readmePath = path.join(dirPath, "README.txt");
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, readme, "utf8");
  }
}

/* =========================================================
   2. 产品中心针系列卡片数据
========================================================= */

const probeSelection = `/* =========================================================
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
  "采样针",
  "穿刺针",
  "清洗针",
  "搅拌桨",
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

    categoryId: "${probeCategoryId}",
    category: "probes",
    categoryLabel: "针系列",

    productTypeId: "采样针",
    productTypeLabel: "采样针",

    model: "采样针系列",
    title: "采样针系列",
    name: "采样针系列",
    productName: "采样针系列",

    cardTitle: {
      zh: "采样针系列",
      en: "Sampling Probe Series",
    },

    cardSubtitle: {
      zh: "用于试剂、样本吸取与分配\\n可做针尖、侧孔、弯折和长度定制\\n支持内壁抛光与液位检测适配",
      en: "For reagent and sample aspiration and dispensing\\nCustom tip, side hole, bending and length options\\nInner-wall polishing and liquid level detection support",
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

    filter01: "采样针",
    filter02: "试剂 / 样本吸取",
    filter03: "内壁抛光",
    filter04: "来图定制",

    filters: {
      filter01: "采样针",
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

    categoryId: "${probeCategoryId}",
    category: "probes",
    categoryLabel: "针系列",

    productTypeId: "穿刺针",
    productTypeLabel: "穿刺针",

    model: "穿刺针系列",
    title: "穿刺针系列",
    name: "穿刺针系列",
    productName: "穿刺针系列",

    cardTitle: {
      zh: "穿刺针系列",
      en: "Piercing Probe Series",
    },

    cardSubtitle: {
      zh: "用于封膜、瓶塞和耗材穿刺取液\\n针管、针尖和排气结构可定制\\n适用于试剂仓、样本仓和封闭耗材",
      en: "For piercing sealed films, stoppers and consumables\\nCustom tube, tip and venting structures\\nFor reagent chambers, sample chambers and closed consumables",
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

    filter01: "穿刺针",
    filter02: "穿刺取液",
    filter03: "排气结构",
    filter04: "来图定制",

    filters: {
      filter01: "穿刺针",
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

    categoryId: "${probeCategoryId}",
    category: "probes",
    categoryLabel: "针系列",

    productTypeId: "清洗针",
    productTypeLabel: "清洗针",

    model: "清洗针系列",
    title: "清洗针系列",
    name: "清洗针系列",
    productName: "清洗针系列",

    cardTitle: {
      zh: "清洗针系列",
      en: "Wash Probe Series",
    },

    cardSubtitle: {
      zh: "用于针外壁清洗、废液排出和残液处理\\n可做单头、双头、多头和侧孔结构\\n适配清洗站与自动化液路模块",
      en: "For outer-wall washing, waste removal and residual liquid handling\\nSingle-head, dual-head, multi-head and side-hole options\\nFor wash stations and automated fluidic modules",
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

    filter01: "清洗针",
    filter02: "清洗 / 排废",
    filter03: "侧孔加工",
    filter04: "来图定制",

    filters: {
      filter01: "清洗针",
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

    categoryId: "${probeCategoryId}",
    category: "probes",
    categoryLabel: "针系列",

    productTypeId: "搅拌桨",
    productTypeLabel: "搅拌桨",

    model: "搅拌桨系列",
    title: "搅拌桨系列",
    name: "搅拌桨系列",
    productName: "搅拌桨系列",

    cardTitle: {
      zh: "搅拌桨系列",
      en: "Stirring Paddle Series",
    },

    cardSubtitle: {
      zh: "用于样本、试剂和反应液混匀\\n支持平板、螺旋、90度角叶片等结构\\n可按杯型、转速和混匀效果定制",
      en: "For sample, reagent and reaction-liquid mixing\\nFlat, spiral and 90-degree blade options\\nCustomizable by cup geometry, speed and mixing effect",
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

    filter01: "搅拌桨",
    filter02: "搅拌 / 混匀",
    filter03: "涂层处理",
    filter04: "来图定制",

    filters: {
      filter01: "搅拌桨",
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
`;

writeFileWithBackup("data/products/selection/probe-selection.generated.ts", probeSelection);

/* =========================================================
   3. 针系列详情页 JSON
========================================================= */

const probeDetailData = [
  {
    slug: "sampling-probes",
    productTypeId: "sampling-probes",
    productTypeName: "采样针",
    title: "采样针系列",
    h1Title: "采样针系列",
    pageTitle: "采样针系列",
    modelName: "采样针系列",
    seoTitle: "采样针系列｜自动化分析仪器试剂针与样本针定制｜恒永达 FOREACH",
    seoDescription:
      "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，支持针尖、侧孔、弯折、长度、内壁抛光、涂层和液位检测适配等来图定制。",
    image: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
    imageAlt: "采样针系列",
    description:
      "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，可根据仪器结构、液体类型、目标容量和液位检测方式进行来图定制。针管可根据项目需求确认外径、内径、长度、针尖形状、侧孔结构、折弯方向和安装方式，并可结合内壁抛光、外壁涂层和电容式液位检测适配，降低挂液、残留和交叉污染风险。",
    commonApplications: [
      "试剂吸取",
      "样本吸取",
      "液体分配",
      "定量转移",
      "cLLD适配",
      "低残留液路"
    ],
    advantages: [
      "可按仪器结构定制外径、内径、总长和有效长度",
      "支持尖口、平口、V型口、侧孔和弯折结构",
      "可结合内壁抛光降低挂液、残留和交叉污染风险",
      "可按项目需求确认外壁涂层和电容式液位检测适配",
      "适用于试剂针、样本针和自动化液体处理针组件"
    ],
    specsTitle: "定制确认项",
    specs: [
      { label: "图纸或样品", value: "建议提供 2D 图纸、3D 文件或实物样品" },
      { label: "针管尺寸", value: "外径 / 内径 / 总长 / 有效长度" },
      { label: "针尖结构", value: "尖口 / 平口 / V型口 / 其他定制形状" },
      { label: "孔位结构", value: "单孔 / 侧孔 / 多孔 / 孔径与位置" },
      { label: "工艺要求", value: "内壁抛光 / 外壁涂层 / 折弯 / 焊接" },
      { label: "功能适配", value: "液位检测 / 低残留 / 防挂液 / 清洗适配" },
      { label: "使用信息", value: "液体类型 / 目标容量 / 安装空间 / 运动方向" }
    ],
    faq: [
      {
        question: "采样针是否有标准型号？",
        answer:
          "采样针主要按客户仪器结构来图定制。官网页面只展示典型用途和可定制方向，具体外径、内径、长度、针尖和安装方式需结合图纸确认。"
      },
      {
        question: "采样针为什么需要内壁抛光？",
        answer:
          "内壁抛光可降低液体残留和挂壁风险，有助于提升清洗效果和减少交叉污染，适合试剂、样本和低残留要求较高的液路。"
      },
      {
        question: "是否可以适配液位检测？",
        answer:
          "可以根据项目需求确认电容式液位检测适配方式，需要结合针体结构、线缆连接、安装方式和整机检测方案确认。"
      }
    ],
    bottomCtaTitle: "需要定制采样针结构？",
    bottomCtaDescription:
      "请提供针管外径、内径、长度、针尖形状、侧孔要求、安装空间、液体类型和是否需要液位检测，FOREACH 可协助确认采样针定制方案。",
    bottomCtaButtonText: "联系工程师",
    bottomCtaHref: "/contact"
  },
  {
    slug: "piercing-probes",
    productTypeId: "piercing-probes",
    productTypeName: "穿刺针",
    title: "穿刺针系列",
    h1Title: "穿刺针系列",
    pageTitle: "穿刺针系列",
    modelName: "穿刺针系列",
    seoTitle: "穿刺针系列｜封膜瓶塞与密闭耗材穿刺取液定制｜恒永达 FOREACH",
    seoDescription:
      "穿刺针系列用于封膜、瓶塞、试剂仓、样本仓和密闭耗材穿刺取液，可定制针尖、侧孔、排气结构、折弯结构和安装端。",
    image: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
    imageAlt: "穿刺针系列",
    description:
      "穿刺针系列用于自动化仪器中封膜、瓶塞、试剂仓、样本仓和密闭耗材的穿刺取液场景，可根据穿刺对象、穿刺深度、液体路径和排气需求进行定制。针尖形状、针管强度、排气口方向、侧孔位置、折弯结构和安装方式均可根据设备空间确认，适合需要稳定穿刺、取液和排气控制的分析仪器液路模块。",
    commonApplications: [
      "封膜穿刺",
      "瓶塞穿刺",
      "试剂仓取液",
      "样本仓取液",
      "排气辅助",
      "密闭耗材液路"
    ],
    advantages: [
      "可根据封膜、瓶塞和耗材结构定制针尖形状",
      "支持排气口方向、侧孔位置和液体路径定制",
      "可按穿刺深度、运动方向和安装空间确认结构",
      "适用于封闭试剂仓、样本仓和密闭耗材取液",
      "可结合折弯、焊接和安装端结构进行整机适配"
    ],
    specsTitle: "定制确认项",
    specs: [
      { label: "穿刺对象", value: "封膜 / 瓶塞 / 密闭耗材 / 试剂仓 / 样本仓" },
      { label: "穿刺参数", value: "穿刺深度 / 穿刺方向 / 运动路径 / 目标取液位置" },
      { label: "针尖结构", value: "穿刺针尖 / 刃口方向 / 针尖强度 / 针尖角度" },
      { label: "排气结构", value: "排气孔 / 排气槽 / 排气方向 / 气液路径分离" },
      { label: "安装信息", value: "安装端结构 / 固定方式 / 仪器内部空间" },
      { label: "资料要求", value: "耗材结构图 / 穿刺位置图 / 样品或图纸" }
    ],
    faq: [
      {
        question: "穿刺针和采样针有什么区别？",
        answer:
          "采样针更偏液体吸取和分配，穿刺针更强调穿透封膜、瓶塞或密闭耗材后的取液能力，通常需要确认针尖强度、穿刺角度和排气结构。"
      },
      {
        question: "穿刺针是否可以做排气结构？",
        answer:
          "可以。排气方向、排气槽、侧孔和液体通道需要根据耗材结构和取液动作确认，避免取液不稳定或产生气阻。"
      },
      {
        question: "穿刺针选型需要提供哪些资料？",
        answer:
          "建议提供耗材结构、封膜或瓶塞材料、穿刺深度、取液位置、针体运动方向、安装空间和目标液体类型。"
      }
    ],
    bottomCtaTitle: "需要确认穿刺针针尖、排气和取液结构？",
    bottomCtaDescription:
      "请提供耗材结构、穿刺对象、穿刺深度、排气方向、取液路径和安装空间，FOREACH 可协助确认穿刺针定制方案。",
    bottomCtaButtonText: "联系工程师",
    bottomCtaHref: "/contact"
  },
  {
    slug: "wash-probes",
    productTypeId: "wash-probes",
    productTypeName: "清洗针",
    title: "清洗针系列",
    h1Title: "清洗针系列",
    pageTitle: "清洗针系列",
    modelName: "清洗针系列",
    seoTitle: "清洗针系列｜针外壁清洗废液排出与清洗站液路定制｜恒永达 FOREACH",
    seoDescription:
      "清洗针系列用于针外壁清洗、针内壁冲洗、废液排出和残液处理，支持单头、双头、多头、侧孔、弯折和涂层结构定制。",
    image: "/images/products/probes/wash-probes/wash-probes-main.webp",
    imageAlt: "清洗针系列",
    description:
      "清洗针系列用于自动化分析仪器中的针外壁清洗、针内壁冲洗、废液排出和残液处理，可根据清洗站结构、清洗液路径、废液路径和喷孔方向进行定制。产品可做单头、双头、多头、侧孔、弯折和多种涂层结构，适用于样本针清洗、试剂针清洗、废液抽排和降低 carry-over 风险的液路模块。",
    commonApplications: [
      "针外壁清洗",
      "针内壁冲洗",
      "废液抽排",
      "残液处理",
      "清洗站集成",
      "降低carry-over"
    ],
    advantages: [
      "可根据清洗站空间定制单头、双头和多头结构",
      "支持侧孔喷洗、排废通道和多路径清洗结构",
      "适合样本针、试剂针和清洗站液路集成",
      "可根据清洗液路径和废液路径确认孔位方向",
      "可结合涂层处理降低挂液和交叉污染风险"
    ],
    specsTitle: "定制确认项",
    specs: [
      { label: "清洗对象", value: "样本针 / 试剂针 / 外壁 / 内壁 / 清洗站" },
      { label: "清洗结构", value: "单头 / 双头 / 多头 / 侧孔 / 喷洗孔" },
      { label: "液路路径", value: "清洗液入口 / 废液出口 / 残液回收路径" },
      { label: "孔位要求", value: "孔径 / 孔数 / 方向 / 喷射区域" },
      { label: "安装要求", value: "清洗站空间 / 固定方式 / 针体相对位置" },
      { label: "工艺要求", value: "焊接 / 抛光 / 涂层 / 弯折" }
    ],
    faq: [
      {
        question: "清洗针主要解决什么问题？",
        answer:
          "清洗针主要用于针外壁清洗、针内壁冲洗、废液抽排和残液处理，目的是降低 carry-over、挂液和交叉污染风险。"
      },
      {
        question: "单头、双头和多头怎么选？",
        answer:
          "需要根据清洗站空间、清洗液入口数量、废液出口数量和清洗动作确认。多头结构适合同时完成冲洗和排废，但对空间和加工一致性要求更高。"
      },
      {
        question: "清洗针是否可以做侧孔？",
        answer:
          "可以。侧孔方向、数量、孔径和位置需要结合清洗液喷射方向、目标清洗区域和废液回收路径确认。"
      }
    ],
    bottomCtaTitle: "需要定制清洗针或清洗站液路结构？",
    bottomCtaDescription:
      "请提供清洗站空间、清洗液路径、废液路径、喷孔方向、针体数量和清洗动作要求，FOREACH 可协助确认清洗针定制方案。",
    bottomCtaButtonText: "联系工程师",
    bottomCtaHref: "/contact"
  },
  {
    slug: "stirring-paddles",
    productTypeId: "stirring-paddles",
    productTypeName: "搅拌桨",
    title: "搅拌桨系列",
    h1Title: "搅拌桨系列",
    pageTitle: "搅拌桨系列",
    modelName: "搅拌桨系列",
    seoTitle: "搅拌桨系列｜样本试剂与反应液混匀结构定制｜恒永达 FOREACH",
    seoDescription:
      "搅拌桨系列用于样本、试剂、稀释液和反应液混匀，可根据反应杯结构、目标液量、搅拌空间、转速范围和混匀效果定制。",
    image: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
    imageAlt: "搅拌桨系列",
    description:
      "搅拌桨系列用于自动化分析仪器中的样本、试剂、稀释液和反应液混匀场景，可根据反应杯结构、目标液量、搅拌空间、转速范围和混匀效果进行来图定制。桨叶可做平板、螺旋、90度角叶片等结构，并可根据项目需求确认表面涂层、焊接方式、同轴度和安装端结构，适合对混匀效率和液体飞溅控制有要求的仪器模块。",
    commonApplications: [
      "样本混匀",
      "试剂混匀",
      "反应液混匀",
      "杯内搅拌",
      "涂层防挂液",
      "自动化分析仪器"
    ],
    advantages: [
      "支持平板、螺旋、90度角叶片等桨叶结构",
      "可根据反应杯尺寸、液量和转速范围定制",
      "可确认同轴度、安装端结构和焊接方式",
      "可做表面涂层以降低挂液和改善清洗效果",
      "适合对混匀效率、飞溅控制和液体残留有要求的仪器模块"
    ],
    specsTitle: "定制确认项",
    specs: [
      { label: "反应容器", value: "反应杯尺寸 / 杯底形状 / 液面高度 / 搅拌空间" },
      { label: "混匀目标", value: "目标液量 / 混匀时间 / 转速范围 / 是否允许气泡" },
      { label: "桨叶结构", value: "平板 / 螺旋 / 90度角叶片 / 其他定制形状" },
      { label: "安装结构", value: "安装端形式 / 同轴度 / 连接方式 / 运动方向" },
      { label: "工艺要求", value: "激光焊接 / 一体成型 / 表面涂层 / 颜色要求" },
      { label: "验证信息", value: "混匀效果要求 / 飞溅控制 / 清洗方式 / 介质类型" }
    ],
    faq: [
      {
        question: "搅拌桨为什么需要按反应杯定制？",
        answer:
          "搅拌桨的叶片形状、直径、长度和安装端结构都与反应杯尺寸、液量和搅拌空间有关，不能只按单一标准型号选择。"
      },
      {
        question: "如何判断搅拌桨形状？",
        answer:
          "需要结合目标液量、杯底形状、转速范围、混匀时间和是否允许气泡或飞溅确认。平板、螺旋和角叶片适合不同混匀方式。"
      },
      {
        question: "是否可以做表面涂层？",
        answer:
          "可以。涂层主要用于降低挂液、改善清洗效果或满足特定介质要求，具体颜色和材料需根据项目确认。"
      }
    ],
    bottomCtaTitle: "需要确认搅拌桨叶片形状和混匀效果？",
    bottomCtaDescription:
      "请提供反应杯尺寸、目标液量、转速范围、混匀时间、叶片形状、安装端结构和是否需要涂层，FOREACH 可协助确认搅拌桨定制方案。",
    bottomCtaButtonText: "联系工程师",
    bottomCtaHref: "/contact"
  }
];

writeFileWithBackup(
  "data/products/generated/probes/detail/index.json",
  JSON.stringify(probeDetailData, null, 2) + "\\n"
);

/* =========================================================
   4. 针系列详情页路由
========================================================= */

const pageTsx = String.raw`import type { ComponentType } from "react";

import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import probeDetailData from "@/data/products/generated/probes/detail/index.json";

type ProbeDetailRecord = {
  slug: string;
  productTypeId: string;
  productTypeName: string;
  title: string;
  h1Title?: string;
  pageTitle?: string;
  modelName: string;
  seoTitle?: string;
  seoDescription?: string;
  image: string;
  imageAlt?: string;
  description: string;
  commonApplications: string[];
  advantages: string[];
  specsTitle?: string;
  specs: {
    label: string;
    value: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  bottomCtaTitle?: string;
  bottomCtaDescription?: string;
  bottomCtaButtonText?: string;
  bottomCtaHref?: string;
};

const details = probeDetailData as ProbeDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "sampling-probes" },
    { slug: "piercing-probes" },
    { slug: "wash-probes" },
    { slug: "stirring-paddles" },
  ];
}

type ProbeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDetailBySlug(slug: string) {
  return details.find((item) => item.slug === slug);
}

function toClientData(detail: ProbeDetailRecord) {
  const image = detail.image || "/images/products/common/product-placeholder.svg";

  const faqItems = Array.isArray(detail.faq)
    ? detail.faq.map((item) => ({
        ...item,
        q: item.question,
        a: item.answer,
      }))
    : [];

  return {
    ...detail,

    category: "probes",
    categoryId: "${probeCategoryId}",
    categoryLabel: "针系列",

    productTypeSlug: detail.slug,
    productTypeId: detail.productTypeId,
    productTypeName: detail.productTypeName,
    productTypeLabel: detail.productTypeName,

    slug: detail.slug,

    title: detail.h1Title || detail.pageTitle || detail.title,
    name: detail.h1Title || detail.pageTitle || detail.title,
    productName: detail.h1Title || detail.pageTitle || detail.title,
    model: detail.h1Title || detail.pageTitle || detail.title,
    modelName: detail.modelName || detail.h1Title || detail.pageTitle || detail.title,
    h1Title: detail.h1Title || detail.pageTitle || detail.title,
    pageTitle: detail.pageTitle || detail.h1Title || detail.title,

    description: detail.description,
    summary: detail.description,
    overview: detail.description,

    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    advantages: Array.isArray(detail.advantages) ? detail.advantages : [],
    highlights: Array.isArray(detail.advantages) ? detail.advantages : [],
    features: Array.isArray(detail.advantages) ? detail.advantages : [],

    specsTitle: detail.specsTitle || "定制确认项",
    specTitle: detail.specsTitle || "定制确认项",
    specificationTitle: detail.specsTitle || "定制确认项",
    specs: Array.isArray(detail.specs) ? detail.specs : [],

    faq: faqItems,
    faqs: faqItems,
    faqItems,
    detailFaqs: faqItems,

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    modelDisplay: "来图定制请联系我们",
    displayModel: "来图定制请联系我们",

    customInquiryHref: detail.bottomCtaHref || "/contact",
    contactHref: "/contact",

    showDrawingRequest: true,
    show3DRequest: false,
    showModel3dRequest: false,
    showDatasheetRequest: false,

    drawing2dUrl: "",
    model3dUrl: "",
    datasheetUrl: "",

    image,
    imagePath: image,
    imageUrl: image,
    mainImage: image,
    primaryImage: image,
    productImage: image,
    heroImage: image,
    imageAlt: detail.imageAlt || detail.title,

    additionalImages: [],
    images: [],
    thumbnails: [],

    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDescription: detail.bottomCtaDescription,
    bottomCtaButtonText: detail.bottomCtaButtonText || "联系工程师",
    bottomCtaHref: detail.bottomCtaHref || "/contact",

    bottomCta: {
      title: detail.bottomCtaTitle,
      desc: detail.bottomCtaDescription,
      description: detail.bottomCtaDescription,
      button: detail.bottomCtaButtonText || "联系工程师",
      buttonText: detail.bottomCtaButtonText || "联系工程师",
      href: detail.bottomCtaHref || "/contact",
    },

    customInquiryTitle: detail.bottomCtaTitle,
    customInquiryDescription: detail.bottomCtaDescription,
    customInquiryButtonText: detail.bottomCtaButtonText || "联系工程师",
    customInquiryHref: detail.bottomCtaHref || "/contact",

    customInquiryCta: {
      title: detail.bottomCtaTitle,
      desc: detail.bottomCtaDescription,
      description: detail.bottomCtaDescription,
      button: detail.bottomCtaButtonText || "联系工程师",
      buttonText: detail.bottomCtaButtonText || "联系工程师",
      href: detail.bottomCtaHref || "/contact",
    },

    selectionHref: "/products",
    detailHref: "/products/probes/" + detail.slug,

    sourceType: "probe-detail",
  };
}

export async function generateMetadata({ params }: ProbeDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return {
      title: "针系列产品｜恒永达 FOREACH",
    };
  }

  return {
    title: detail.seoTitle || detail.title + "｜" + detail.productTypeName + "｜恒永达 FOREACH",
    description: detail.seoDescription || detail.description,
  };
}

export default async function ProbeDetailPage({ params }: ProbeDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView data={toClientData(detail)} />;
}
`;

writeFileWithBackup("app/products/probes/[slug]/page.tsx", pageTsx);

/* =========================================================
   5. 接入 ProductSelectionClient
========================================================= */

const clientPath = abs("components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(clientPath)) {
  console.log("未找到 ProductSelectionClient.tsx，跳过产品中心接入。");
} else {
  backup(clientPath, "probe_series_patch");

  let text = fs.readFileSync(clientPath, "utf8");

  if (!text.includes("probe-selection.generated")) {
    const valveImport = '} from "@/data/products/selection/valve-selection.generated";';
    const valvelessImport = '} from "@/data/products/selection/valveless-pump-selection.generated";';

    const importBlock = `import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";`;

    if (text.includes(valveImport)) {
      text = text.replace(valveImport, `${valveImport}
${importBlock}`);
    } else if (text.includes(valvelessImport)) {
      text = text.replace(valvelessImport, `${valvelessImport}
${importBlock}`);
    } else {
      console.log("没有找到合适 import 锚点，请手动检查 ProductSelectionClient。");
    }
  }

  if (!text.includes("...probeSelectionProducts")) {
    const anchors = [
      "...valveSelectionProducts,",
      "...syringePumpSelectionProducts,",
      "...valvelessPumpSelectionProducts,",
      "...diaphragmPumpSelectionProducts,",
    ];

    const anchor = anchors.find((item) => text.includes(item));

    if (anchor) {
      text = text.replace(anchor, `${anchor}
  ...probeSelectionProducts,`);
    } else {
      console.log("没有找到产品池锚点，请手动检查 ProductSelectionClient。");
    }
  }

  if (!text.includes("...probeFilterLabels")) {
    const anchors = [
      "...valveFilterLabels,",
      "...syringePumpFilterLabels,",
      "...valvelessPumpFilterLabels,",
      "...diaphragmPumpFilterLabels,",
    ];

    const anchor = anchors.find((item) => text.includes(item));

    if (anchor) {
      text = text.replace(anchor, `${anchor}
  ...probeFilterLabels,`);
    } else {
      console.log("没有找到筛选标签锚点，请手动检查 ProductSelectionClient。");
    }
  }

  if (!text.includes("PROBE_DETAIL_HREF_PATCH_20260708")) {
    const patchBlock = `
  /*
    PROBE_DETAIL_HREF_PATCH_20260708

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "${probeCategoryId}" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||
        ""
    );

    const slugFromHref = rawHref
      .split("/")
      .filter(Boolean)
      .pop();

    const rawSlug =
      (product as any).productTypeSlug ||
      (product as any).detailSlug ||
      (product as any).routeSlug ||
      (product as any).slug ||
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return \`/products/probes/\${probeSlug}\`;
    }

    return "/products";
  }
`;

    const functionPattern =
      /(function\s+makeDetailHref\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/;

    const arrowPattern =
      /(const\s+makeDetailHref\s*=\s*\([^)]*\)\s*(?::\s*[^=]+)?=>\s*\{)/;

    if (functionPattern.test(text)) {
      text = text.replace(functionPattern, `$1${patchBlock}`);
    } else if (arrowPattern.test(text)) {
      text = text.replace(arrowPattern, `$1${patchBlock}`);
    } else {
      console.log("没有找到 makeDetailHref 函数，暂未自动插入针系列详情链接补丁。");
    }
  }

  fs.writeFileSync(clientPath, text, "utf8");
  console.log("已接入 ProductSelectionClient。");
}

/* =========================================================
   6. 修复 ProductDetailClient 底部 CTA 识别
========================================================= */

const detailClientPath = abs("components/products/detail/ProductDetailClient.tsx");

if (fs.existsSync(detailClientPath)) {
  backup(detailClientPath, "probe_bottom_cta");

  let text = fs.readFileSync(detailClientPath, "utf8");

  if (!text.includes("PROBE_DETAIL_BOTTOM_CTA_20260708")) {
    const helper = `
/*
  PROBE_DETAIL_BOTTOM_CTA_20260708

  针系列详情页复用公共 ProductDetailClient。
  这里单独识别针系列数据，避免底部 CTA 回退到其他产品系列，或直接不显示。
*/
function isProbeDetailData(data: any): boolean {
  return (
    data?.sourceType === "probe-detail" ||
    data?.category === "probes" ||
    data?.categoryLabel === "针系列" ||
    data?.productTypeName === "采样针" ||
    data?.productTypeName === "穿刺针" ||
    data?.productTypeName === "清洗针" ||
    data?.productTypeName === "搅拌桨"
  );
}

function getProbeDetailBottomCta(data: any) {
  if (!isProbeDetailData(data)) {
    return null;
  }

  const title =
    data?.bottomCtaTitle ||
    data?.customInquiryTitle ||
    data?.bottomCta?.title ||
    data?.customInquiryCta?.title ||
    "需要确认针系列来图定制方案？";

  const desc =
    data?.bottomCtaDescription ||
    data?.customInquiryDescription ||
    data?.bottomCta?.desc ||
    data?.bottomCta?.description ||
    data?.customInquiryCta?.desc ||
    data?.customInquiryCta?.description ||
    "请提供图纸、样品、针管尺寸、针尖结构、安装空间和目标液体信息，FOREACH 可协助确认针系列定制方案。";

  const button =
    data?.bottomCtaButtonText ||
    data?.customInquiryButtonText ||
    data?.bottomCta?.button ||
    data?.bottomCta?.buttonText ||
    data?.customInquiryCta?.button ||
    data?.customInquiryCta?.buttonText ||
    "联系工程师";

  const href =
    data?.bottomCtaHref ||
    data?.customInquiryHref ||
    data?.bottomCta?.href ||
    data?.customInquiryCta?.href ||
    "/contact";

  return {
    title,
    desc,
    description: desc,
    button,
    buttonText: button,
    href,
  };
}
`;

    const anchor = "function getPlungerPumpBottomCta";

    if (text.includes(anchor)) {
      text = text.replace(anchor, `${helper}
${anchor}`);
    } else if (text.includes("function getValveDetailBottomCta")) {
      text = text.replace("function getValveDetailBottomCta", `${helper}
function getValveDetailBottomCta`);
    } else {
      console.log("没有找到底部 CTA 函数锚点，跳过 ProductDetailClient CTA 补丁。");
    }
  }

  if (
    text.includes("function getPlungerPumpBottomCta") &&
    !text.includes("const probeBottomCta = getProbeDetailBottomCta(data);")
  ) {
    const pattern =
      /function\s+getPlungerPumpBottomCta\s*\(\s*data\s*:\s*any\s*\)\s*(?::\s*[^{]+)?\s*\{/;

    if (pattern.test(text)) {
      text = text.replace(pattern, (match) => {
        return `${match}
  const probeBottomCta = getProbeDetailBottomCta(data);

  if (probeBottomCta) {
    return probeBottomCta;
  }
`;
      });
    }
  }

  fs.writeFileSync(detailClientPath, text, "utf8");
  console.log("已确认 ProductDetailClient 针系列底部 CTA 识别。");
}

console.log("");
console.log("针系列已生成并接入：");
console.log("- /products/probes/sampling-probes");
console.log("- /products/probes/piercing-probes");
console.log("- /products/probes/wash-probes");
console.log("- /products/probes/stirring-paddles");
console.log("");
console.log("主图预留位置：");
console.log("- public/images/products/probes/sampling-probes/sampling-probes-main.webp");
console.log("- public/images/products/probes/piercing-probes/piercing-probes-main.webp");
console.log("- public/images/products/probes/wash-probes/wash-probes-main.webp");
console.log("- public/images/products/probes/stirring-paddles/stirring-paddles-main.webp");