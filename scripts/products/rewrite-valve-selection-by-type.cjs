/* =========================================================
   rewrite-valve-selection-by-type.cjs
   恒永达官网｜阀系列按产品类型重写

   作用：
   1. 阀系列产品类型分为：旋转阀、高压阀、电磁阀
   2. 卡片分别为：
      - MRV3 陶瓷多通道旋转阀
      - HP 三位七通高压阀
      - 6010 系列电磁阀
   3. 使用 Node 写入 UTF-8，避免 PowerShell 直接改 .tsx 造成中文乱码
========================================================= */

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
    const backupPath = `${filePath}.bak_valve_type_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`已备份：${path.relative(root, backupPath)}`);
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`已写入：${relativePath}`);
}

function hasMojibake(text) {
  return /涓|浜у搧|绯诲垪|鍒嗙被|闆|鍨|搴|潯|鍚/.test(text);
}

/* =========================================================
   1. 重写阀系列产品中心数据
========================================================= */

const valveSelectionGenerated = `/* =========================================================
   valve-selection.generated.ts
   FOREACH 官网｜阀系列产品中心卡片数据

   说明：
   1. 当前文件用于产品中心“阀系列”第一版上线
   2. 阀系列按产品类型拆分：
      - 旋转阀
      - 高压阀
      - 电磁阀
   3. 不再额外显示“产品系列”层级
   4. id / slug / href 使用英文，页面显示使用中文
========================================================= */

import type { ProductSelectionProduct } from "./product-selection.types";

export const valveFilterLabels = [
  "旋转阀",
  "高压阀",
  "电磁阀",
] as const;

const valveProducts = [
  {
    id: "mrv3-ceramic-rotary-valve",
    slug: "rotary-valves",
    productId: "mrv3-ceramic-rotary-valve",
    productCode: "MRV3-D16-10-U28APE-MD",
    code: "MRV3-D16-10-U28APE-MD",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "rotary-valves",
    productTypeLabel: "旋转阀",

    model: "MRV3 陶瓷多通道旋转阀",
    title: "MRV3 陶瓷多通道旋转阀",
    name: "MRV3 陶瓷多通道旋转阀",
    productName: "MRV3 陶瓷多通道旋转阀",

    cardTitle: {
      zh: "MRV3 陶瓷多通道旋转阀",
      en: "MRV3 Ceramic Multi-channel Rotary Valve",
    },

    cardSubtitle: {
      zh: "10 / 16 / 24 通道可选\\n耐压 0.7MPa，内容积低至 2.9μL\\n适用于多试剂、多清洗液路径切换",
      en: "10 / 16 / 24 channels available\\n0.7MPa pressure rating, internal volume down to 2.9μL\\nFor multi-reagent and wash path switching",
    },

    image: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imagePath: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imageUrl: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imageAlt: "MRV3 陶瓷多通道旋转阀",

    subtitle: "10 / 16 / 24 通道可选，适用于多试剂和清洗路径切换",
    description:
      "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多通道流路切换、试剂选择、样本分配和清洗路径管理。",

    summary:
      "10 / 16 / 24 通道可选，耐压 0.7MPa，内容积低至 2.9μL。",

    tags: ["多通道切换", "0.7MPa", "低内容积"],

    specs: [
      { label: "产品类型", value: "旋转阀" },
      { label: "通道数量", value: "10 / 16 / 24" },
      { label: "通道直径", value: "1.2 / 1.0 / 0.5mm" },
      { label: "内容积", value: "15.8 / 10 / 2.9μL" },
      { label: "耐压", value: "0.7MPa" },
      { label: "接口", value: "1/4-28UNF / 6-40UNF" },
      { label: "寿命", value: "100万圈" },
    ],

    filter01: "旋转阀",
    filter02: "多通道切换",
    filter03: "0.7MPa",
    filter04: "定制配置",

    filters: {
      filter01: "旋转阀",
      filter02: "多通道切换",
      filter03: "0.7MPa",
      filter04: "定制配置",
    },

    href: "/products/valves/rotary-valves",
    detailHref: "/products/valves/rotary-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },

  {
    id: "hp-3-position-7-port-high-pressure-valve",
    slug: "high-pressure-valves",
    productId: "hp-3-position-7-port-high-pressure-valve",
    productCode: "HP-37SSU3204",
    code: "HP-37SSU3204",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "high-pressure-valves",
    productTypeLabel: "高压阀",

    model: "HP 三位七通高压阀",
    title: "HP 三位七通高压阀",
    name: "HP 三位七通高压阀",
    productName: "HP 三位七通高压阀",

    cardTitle: {
      zh: "HP 三位七通高压阀",
      en: "HP 3-position 7-port High-pressure Valve",
    },

    cardSubtitle: {
      zh: "三位七通高压流路控制\\n耐压 25MPa，内体积 0.8μL\\n适用于 HPLC 自动进样与排气场景",
      en: "3-position 7-port high-pressure flow control\\n25MPa pressure rating, 0.8μL internal volume\\nFor HPLC autosampling and venting applications",
    },

    image: "/images/products/common/product-placeholder.svg",
    imagePath: "/images/products/common/product-placeholder.svg",
    imageUrl: "/images/products/common/product-placeholder.svg",
    imageAlt: "HP 三位七通高压阀",

    subtitle: "三位七通高压流路控制，适用于 HPLC 自动进样与排气场景",
    description:
      "HP 三位七通高压阀用于高压流体控制、HPLC 自动进样、进样位 / 抽样位 / 排气位切换和分析仪器高压流路管理。",

    summary:
      "三位七通结构，耐压 25MPa，内体积 0.8μL，接口 10-32UNF。",

    tags: ["25MPa", "三位七通", "HPLC"],

    specs: [
      { label: "产品类型", value: "高压阀" },
      { label: "结构", value: "三位七通" },
      { label: "最大工作压力", value: "25MPa" },
      { label: "通道直径", value: "0.4mm" },
      { label: "内体积", value: "0.8μL" },
      { label: "接口", value: "10-32UNF" },
      { label: "寿命", value: "15万 cycles（纯水）" },
    ],

    filter01: "高压阀",
    filter02: "高压控制",
    filter03: "25MPa",
    filter04: "定制配置",

    filters: {
      filter01: "高压阀",
      filter02: "高压控制",
      filter03: "25MPa",
      filter04: "定制配置",
    },

    href: "/products/valves/high-pressure-valves",
    detailHref: "/products/valves/high-pressure-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },

  {
    id: "6010-solenoid-valve",
    slug: "solenoid-valves",
    productId: "6010-solenoid-valve",
    productCode: "SV10",
    code: "SV10",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "solenoid-valves",
    productTypeLabel: "电磁阀",

    model: "6010 系列电磁阀",
    title: "6010 系列电磁阀",
    name: "6010 系列电磁阀",
    productName: "6010 系列电磁阀",

    cardTitle: {
      zh: "6010 系列电磁阀",
      en: "6010 Series Solenoid Valve",
    },

    cardSubtitle: {
      zh: "2通 / 3通，NO / NC / 万向可选\\n-75kPa～0.25MPa，孔口直径 1.4mm\\n支持基板型、螺纹型和倒刺型配置",
      en: "2-port / 3-port, NO / NC / universal options\\n-75kPa to 0.25MPa, 1.4mm orifice\\nPanel-mount, threaded and barbed configurations",
    },

    image: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imagePath: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imageUrl: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imageAlt: "6010 系列电磁阀",

    subtitle: "2通 / 3通，NO / NC / 万向可选，适用于液路通断控制",
    description:
      "6010 系列电磁阀用于自动化仪器中的液路通断控制、试剂路径控制、清洗路径控制和阀组集成。",

    summary:
      "2通 / 3通结构可选，压力范围 -75kPa～0.25MPa，CV 0.03。",

    tags: ["通断控制", "CV 0.03", "2通 / 3通"],

    specs: [
      { label: "产品类型", value: "电磁阀" },
      { label: "结构形式", value: "基板型 / 螺纹型 / 倒刺型" },
      { label: "通口数", value: "2 / 3" },
      { label: "阀形式", value: "万向 / NO / NC" },
      { label: "使用压力范围", value: "-75kPa～0.25MPa" },
      { label: "孔口直径", value: "1.4mm" },
      { label: "CV", value: "0.03" },
      { label: "膜片材质", value: "EPDM / FKM / FFKM" },
    ],

    filter01: "电磁阀",
    filter02: "通断控制",
    filter03: "-75kPa～0.25MPa",
    filter04: "定制配置",

    filters: {
      filter01: "电磁阀",
      filter02: "通断控制",
      filter03: "-75kPa～0.25MPa",
      filter04: "定制配置",
    },

    href: "/products/valves/solenoid-valves",
    detailHref: "/products/valves/solenoid-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },
] as const;

export const valveSelectionProducts =
  valveProducts as unknown as ProductSelectionProduct[];
`;

writeFileWithBackup(
  "data/products/selection/valve-selection.generated.ts",
  valveSelectionGenerated,
);

/* =========================================================
   2. 写入详情基础数据
========================================================= */

const valveDetailData = [
  {
    slug: "rotary-valves",
    title: "MRV3 陶瓷多通道旋转阀",
    seoTitle: "MRV3 陶瓷多通道旋转阀｜旋转阀｜恒永达 FOREACH",
    model: "MRV3-D10 / MRV3-D16 / MRV3-D24",
    productTypeName: "旋转阀",
    image: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    description:
      "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多通道流路切换、试剂选择、样本分配和清洗路径管理。",
    applications: [
      "多试剂路径切换",
      "样本与清洗液路径管理",
      "多废液路径集中控制",
      "自动化分析仪器多通道液路",
    ],
    advantages: [
      "10 / 16 / 24 通道可选",
      "内容积低至 2.9μL",
      "耐压 0.7MPa",
      "触液材料包含 PCTFE、氧化锆陶瓷和蓝宝石",
    ],
    specs: [
      { label: "产品类型", value: "旋转阀" },
      { label: "通道数量", value: "10 / 16 / 24" },
      { label: "通道直径", value: "1.2 / 1.0 / 0.5mm" },
      { label: "内容积", value: "15.8 / 10 / 2.9μL" },
      { label: "耐压", value: "0.7MPa" },
      { label: "寿命", value: "100万圈" },
    ],
  },
  {
    slug: "high-pressure-valves",
    title: "HP 三位七通高压阀",
    seoTitle: "HP 三位七通高压阀｜高压阀｜恒永达 FOREACH",
    model: "HP-37SSU3204",
    productTypeName: "高压阀",
    image: "/images/products/common/product-placeholder.svg",
    description:
      "HP 三位七通高压阀用于高压流体控制、HPLC 自动进样、进样位 / 抽样位 / 排气位切换和分析仪器高压流路管理。",
    applications: [
      "HPLC 自动进样",
      "高压流路切换",
      "系统排气",
      "分析仪器高压液路模块",
    ],
    advantages: [
      "三位七通结构",
      "最大工作压力 25MPa",
      "内体积 0.8μL",
      "接口规格 10-32UNF",
    ],
    specs: [
      { label: "产品类型", value: "高压阀" },
      { label: "结构", value: "三位七通" },
      { label: "最大工作压力", value: "25MPa" },
      { label: "通道直径", value: "0.4mm" },
      { label: "内体积", value: "0.8μL" },
      { label: "接口", value: "10-32UNF" },
      { label: "寿命", value: "15万 cycles（纯水）" },
    ],
  },
  {
    slug: "solenoid-valves",
    title: "6010 系列电磁阀",
    seoTitle: "6010 系列电磁阀｜电磁阀｜恒永达 FOREACH",
    model: "SV10-P / SV10-M6 / SV10-U28 / SV10-B16",
    productTypeName: "电磁阀",
    image: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    description:
      "6010 系列电磁阀用于自动化仪器中的液路通断控制、试剂路径控制、清洗路径控制和阀组集成。",
    applications: [
      "试剂路径通断控制",
      "清洗液路径控制",
      "废液路径控制",
      "自动化仪器阀组集成",
    ],
    advantages: [
      "基板型、螺纹型和倒刺型结构可选",
      "2通 / 3通，NO / NC / 万向可选",
      "压力范围 -75kPa～0.25MPa",
      "膜片材质 EPDM / FKM / FFKM 可选",
    ],
    specs: [
      { label: "产品类型", value: "电磁阀" },
      { label: "结构形式", value: "基板型 / 螺纹型 / 倒刺型" },
      { label: "通口数", value: "2 / 3" },
      { label: "阀形式", value: "万向 / NO / NC" },
      { label: "使用压力范围", value: "-75kPa～0.25MPa" },
      { label: "孔口直径", value: "1.4mm" },
      { label: "CV", value: "0.03" },
    ],
  },
];

writeFileWithBackup(
  "data/products/generated/valves/detail/index.json",
  `${JSON.stringify(valveDetailData, null, 2)}\n`,
);

/* =========================================================
   3. 安全检查 ProductSelectionClient.tsx
========================================================= */

const clientRelativePath =
  "components/products/selection/ProductSelectionClient.tsx";
const clientPath = abs(clientRelativePath);

if (!fs.existsSync(clientPath)) {
  console.log(`未找到 ${clientRelativePath}，跳过。`);
} else {
  let clientText = fs.readFileSync(clientPath, "utf8");

  if (hasMojibake(clientText)) {
    const dir = path.dirname(clientPath);
    const base = path.basename(clientPath);

    const backupCandidates = fs
      .readdirSync(dir)
      .filter((name) => name.startsWith(`${base}.bak`) && !name.includes("broken_encoding"))
      .map((name) => path.join(dir, name))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    const usableBackup = backupCandidates.find((file) => {
      const text = fs.readFileSync(file, "utf8");
      return !hasMojibake(text);
    });

    if (!usableBackup) {
      throw new Error("ProductSelectionClient.tsx 检测到乱码，但没有找到可用备份。");
    }

    const brokenBackupPath = `${clientPath}.bak_broken_encoding_${stamp()}`;
    fs.copyFileSync(clientPath, brokenBackupPath);
    fs.copyFileSync(usableBackup, clientPath);

    console.log("检测到 ProductSelectionClient.tsx 乱码，已恢复：");
    console.log(path.relative(root, usableBackup));

    clientText = fs.readFileSync(clientPath, "utf8");
  }

  let patched = clientText;

  if (!patched.includes("valve-selection.generated")) {
    const importAnchor =
      '} from "@/data/products/selection/valveless-pump-selection.generated";';

    if (!patched.includes(importAnchor)) {
      throw new Error("未找到无阀泵 import 锚点，无法自动插入阀系列 import。");
    }

    patched = patched.replace(
      importAnchor,
      `${importAnchor}
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";`,
    );
  }

  if (!patched.includes("...valveSelectionProducts")) {
    const productAnchor = "...valvelessPumpSelectionProducts,";

    if (!patched.includes(productAnchor)) {
      throw new Error("未找到产品池锚点 ...valvelessPumpSelectionProducts,。");
    }

    patched = patched.replace(
      productAnchor,
      `${productAnchor}
  ...valveSelectionProducts,`,
    );
  }

  if (!patched.includes("...valveFilterLabels")) {
    const labelAnchor = "...valvelessPumpFilterLabels,";

    if (!patched.includes(labelAnchor)) {
      throw new Error("未找到筛选标签锚点 ...valvelessPumpFilterLabels,。");
    }

    patched = patched.replace(
      labelAnchor,
      `${labelAnchor}
  ...valveFilterLabels,`,
    );
  }

  if (patched !== clientText) {
    const backupPath = `${clientPath}.bak_valve_type_patch_${stamp()}`;
    fs.copyFileSync(clientPath, backupPath);
    fs.writeFileSync(clientPath, patched, "utf8");

    console.log(`已更新：${clientRelativePath}`);
    console.log(`已备份：${path.relative(root, backupPath)}`);
  } else {
    console.log(`${clientRelativePath} 已接入阀系列，无需修改。`);
  }
}

console.log("");
console.log("阀系列已按产品类型拆分完成：");
console.log("- 旋转阀：MRV3 陶瓷多通道旋转阀");
console.log("- 高压阀：HP 三位七通高压阀");
console.log("- 电磁阀：6010 系列电磁阀");
console.log("");
console.log("下一步运行：");
console.log("Remove-Item -Recurse -Force .next");
console.log("npm run dev");
