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

function writeFileWithBackup(relativePath, content) {
  const filePath = abs(relativePath);
  ensureDir(filePath);

  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_restore_rpl_style_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log("已写入：" + relativePath);
}

/* =========================================================
   1. 阀系列详情数据
   说明：
   这里不做新页面设计，只提供数据。
   page.tsx 会把这些数据适配成 ProductDetailClient 需要的结构。
========================================================= */

const valveDetailData = [
  {
    slug: "rotary-valves",
    productTypeId: "rotary-valves",
    productTypeName: "旋转阀",
    title: "MRV3 陶瓷多通道旋转阀",
    modelName: "MRV3 陶瓷多通道旋转阀",
    image: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    description:
      "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多通道流路切换、试剂选择、样本分配、清洗路径管理和废液路径集中控制。产品可根据通道数量、通径、接口形式、触液材料、驱动方式和安装空间进行配置确认。",
    commonApplications: [
      "多试剂路径切换",
      "多样本分配",
      "清洗液路径管理",
      "废液路径集中控制",
      "自动化分析仪器多通道液路",
      "IVD 与实验室自动化设备"
    ],
    advantages: [
      "10 / 16 / 24 通道可选",
      "耐压 0.7MPa",
      "内容积低至 2.9μL",
      "PCTFE / 氧化锆陶瓷 / 蓝宝石触液材料"
    ],
    specs: [
      { "label": "产品类型", "value": "旋转阀" },
      { "label": "配置方式", "value": "定制配置" },
      { "label": "典型型号", "value": "MRV3-D10 / MRV3-D16 / MRV3-D24" },
      { "label": "通道数量", "value": "10 / 16 / 24" },
      { "label": "通道直径", "value": "1.2 / 1.0 / 0.5mm" },
      { "label": "内容积", "value": "15.8 / 10 / 2.9μL" },
      { "label": "耐压", "value": "0.7MPa" },
      { "label": "触液材质", "value": "PCTFE / 氧化锆陶瓷 / 蓝宝石" },
      { "label": "切换时间", "value": "≤2s/圈，相邻端口＜100ms" },
      { "label": "寿命", "value": "100万圈" },
      { "label": "通信接口", "value": "RS232 / RS485" },
      { "label": "适用电源", "value": "DC24V/2A±10%" }
    ],
    faq: [
      {
        "question": "MRV3 旋转阀为什么按定制品展示？",
        "answer": "MRV3 涉及通道数量、通径、接口、触液材料、电机、驱动器和通讯方式等配置，实际项目通常需要结合客户液路方案确认。"
      },
      {
        "question": "MRV3 旋转阀适合哪些场景？",
        "answer": "适用于多试剂、多样本、多清洗液和多废液路径的集中切换，常见于 IVD、生命科学和实验室自动化设备。"
      }
    ]
  },
  {
    slug: "high-pressure-valves",
    productTypeId: "high-pressure-valves",
    productTypeName: "高压阀",
    title: "HP 三位七通高压阀",
    modelName: "HP 三位七通高压阀",
    image: "/images/products/common/product-placeholder.svg",
    description:
      "HP 三位七通高压阀用于高压流体控制、HPLC 自动进样、高压流路切换、系统排气和分析仪器高压液路模块集成。产品按项目需求确认压力范围、通道结构、接口形式、触液材料、驱动方式和安装空间。",
    commonApplications: [
      "HPLC 自动进样",
      "高压流路切换",
      "进样位 / 抽样位 / 排气位切换",
      "系统排气",
      "分析仪器高压液路模块"
    ],
    advantages: [
      "三位七通高压流路控制",
      "最大工作压力 25MPa",
      "内体积 0.8μL",
      "适用于 HPLC 自动进样与排气场景"
    ],
    specs: [
      { "label": "产品类型", "value": "高压阀" },
      { "label": "配置方式", "value": "定制配置" },
      { "label": "典型型号", "value": "HP-37SSU3204" },
      { "label": "结构", "value": "三位七通" },
      { "label": "最大工作压力", "value": "25MPa" },
      { "label": "通道直径", "value": "0.4mm" },
      { "label": "内体积", "value": "0.8μL" },
      { "label": "接口", "value": "10-32UNF" },
      { "label": "寿命", "value": "15万 cycles（纯水）" }
    ],
    faq: [
      {
        "question": "HP 高压阀是否是标准现货？",
        "answer": "官网按定制品展示。具体型号、压力、接口、切换位置和安装方式需要结合客户高压液路方案确认。"
      },
      {
        "question": "高压阀选型时需要确认什么？",
        "answer": "需要确认系统压力、介质、接口、切换位置、内体积要求和安装空间。"
      }
    ]
  },
  {
    slug: "solenoid-valves",
    productTypeId: "solenoid-valves",
    productTypeName: "电磁阀",
    title: "6010 系列电磁阀",
    modelName: "6010 系列电磁阀",
    image: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    description:
      "6010 系列电磁阀用于自动化仪器中的液路通断控制、试剂路径控制、清洗路径控制、废液路径控制和阀组集成。产品可根据通口数、阀形式、接口方式、膜片材质、底板材质、阀座材质、电压和节能回路进行配置确认。",
    commonApplications: [
      "试剂路径通断控制",
      "清洗液路径控制",
      "废液路径控制",
      "自动化仪器阀组集成",
      "IVD 分析仪器",
      "实验室自动化设备"
    ],
    advantages: [
      "2通 / 3通结构可选",
      "NO / NC / 万向阀形式可选",
      "-75kPa～0.25MPa 使用压力范围",
      "支持基板型、螺纹型和倒刺型配置"
    ],
    specs: [
      { "label": "产品类型", "value": "电磁阀" },
      { "label": "配置方式", "value": "定制配置" },
      { "label": "典型型号", "value": "SV10-P / SV10-M6 / SV10-U28 / SV10-B16" },
      { "label": "结构形式", "value": "基板型 / 螺纹型 / 倒刺型" },
      { "label": "通口数", "value": "2 / 3" },
      { "label": "阀形式", "value": "万向 / NO / NC" },
      { "label": "使用压力范围", "value": "-75kPa～0.25MPa" },
      { "label": "孔口直径", "value": "1.4mm" },
      { "label": "阀室内容积", "value": "20μL" },
      { "label": "CV", "value": "0.03" },
      { "label": "膜片材质", "value": "EPDM / FKM / FFKM" }
    ],
    faq: [
      {
        "question": "6010 电磁阀为什么按定制品展示？",
        "answer": "6010 电磁阀涉及结构形式、通口数、阀形式、膜片材质、底板材质、阀座材质、电压和节能回路等多项配置，实际项目中通常需要按液路方案确认。"
      },
      {
        "question": "基板型、螺纹型和倒刺型怎么选择？",
        "answer": "基板型适合阀组集成，螺纹型适合标准接头连接，倒刺型适合软管连接。具体方式需要结合整机空间和管路方案确认。"
      }
    ]
  }
];

writeFileWithBackup(
  "data/products/generated/valves/detail/index.json",
  JSON.stringify(valveDetailData, null, 2) + "\n"
);

/* =========================================================
   2. 阀系列详情页：恢复为 RPL 同款 ProductDetailClient
   说明：
   不再使用单独设计的 CSS Module 页面。
   这里沿用公共产品详情页组件。
========================================================= */

const pageTsx = String.raw`import type { ComponentType } from "react";

import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import valveDetailData from "@/data/products/generated/valves/detail/index.json";

type ValveDetailRecord = {
  slug: string;
  productTypeId: string;
  productTypeName: string;
  title: string;
  modelName: string;
  image: string;
  description: string;
  commonApplications: string[];
  advantages: string[];
  specs: {
    label: string;
    value: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

const details = valveDetailData as ValveDetailRecord[];

/*
  ProductDetailClient 是官网已有公共详情页组件。
  阀系列详情页不重新设计页面，只把数据适配成该组件需要的结构。
*/
const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "rotary-valves" },
    { slug: "high-pressure-valves" },
    { slug: "solenoid-valves" },
  ];
}

type ValveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDetailBySlug(slug: string) {
  return details.find((item) => item.slug === slug);
}

/*
  将阀系列数据转换为 ProductDetailClient 可以识别的数据。
  这里参考 RPL 无阀泵定制品写法：
  - 型号显示为“定制配置请联系我们”
  - 不显示标准型号选择
  - 保留添加图纸 / 加入清单逻辑
  - 传 additionalImages / images / thumbnails 空数组，避免轮播读取报错
*/
function toClientData(detail: ValveDetailRecord) {
  const image = detail.image || "/images/products/common/product-placeholder.svg";

  return {
    ...detail,

    category: "valves",
    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeSlug: detail.slug,
    productTypeId: detail.productTypeId,
    productTypeName: detail.productTypeName,
    productTypeLabel: detail.productTypeName,

    slug: detail.slug,

    title: detail.title,
    name: detail.title,
    productName: detail.title,
    model: detail.title,
    modelName: detail.title,
    h1Title: detail.title,
    pageTitle: detail.title,

    description: detail.description,
    summary: detail.description,
    overview: detail.description,

    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    advantages: Array.isArray(detail.advantages) ? detail.advantages : [],
    highlights: Array.isArray(detail.advantages) ? detail.advantages : [],
    features: Array.isArray(detail.advantages) ? detail.advantages : [],

    specs: Array.isArray(detail.specs) ? detail.specs : [],

    faq: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],

    /*
      定制品模式。
      这里沿用 RPL 无阀泵详情页的定制配置逻辑。
    */
    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    customInquiryHref: "/contact",
    contactHref: "/contact",

    /*
      阀系列暂时不直接开放下载 3D / 规格书。
      图纸按“添加图纸”需求进入清单。
    */
    showDrawingRequest: true,
    show3DRequest: false,
    showModel3dRequest: false,
    showDatasheetRequest: false,

    drawing2dUrl: "",
    model3dUrl: "",
    datasheetUrl: "",

    /*
      公共详情页图片字段。
      additionalImages / images / thumbnails 必须给空数组，
      避免 ProductDetailClient 读取 forEach / map 时报错。
    */
    image,
    imagePath: image,
    imageUrl: image,
    mainImage: image,
    primaryImage: image,
    productImage: image,
    heroImage: image,
    imageAlt: detail.title,

    additionalImages: [],
    images: [],
    thumbnails: [],

    selectionHref: "/products",
    detailHref: "/products/valves/" + detail.slug,

    sourceType: "valve-detail",
  };
}

export async function generateMetadata({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return {
      title: "阀系列产品｜恒永达 FOREACH",
    };
  }

  return {
    title: detail.title + "｜" + detail.productTypeName + "｜恒永达 FOREACH",
    description: detail.description,
  };
}

export default async function ValveDetailPage({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView data={toClientData(detail)} />;
}
`;

writeFileWithBackup("app/products/valves/[slug]/page.tsx", pageTsx);

/* =========================================================
   3. 移除刚才新设计页面用的 CSS 文件
   说明：
   详情页样式回到 ProductDetailClient 自带样式。
========================================================= */

const oldCssFiles = [
  "app/products/valves/[slug]/valve-detail.css",
  "app/products/valves/[slug]/valve-detail.module.css"
];

for (const relativePath of oldCssFiles) {
  const filePath = abs(relativePath);

  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_removed_restore_rpl_style_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    fs.unlinkSync(filePath);
    console.log("已移除旧设计 CSS，并备份：" + path.relative(root, backupPath));
  }
}

console.log("");
console.log("阀系列详情页已恢复为 RPL 同款 ProductDetailClient 结构。");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");