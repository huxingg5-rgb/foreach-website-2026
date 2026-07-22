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

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === ".next" ||
        entry.name === "node_modules" ||
        entry.name === ".git"
      ) {
        continue;
      }

      walk(fullPath, callback);
      continue;
    }

    callback(fullPath);
  }
}

/* =========================================================
   1. 扫描并修复损坏的 JSON 文件
   终端报：
   SyntaxError: Unexpected non-whitespace character after JSON at position 1597
   所以先找出到底哪个 JSON 坏了。
========================================================= */

const invalidJsonFiles = [];

walk(abs("data"), (filePath) => {
  if (!filePath.endsWith(".json")) return;

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    JSON.parse(raw);
  } catch (error) {
    invalidJsonFiles.push({
      filePath,
      message: error.message,
      raw,
    });
  }
});

if (invalidJsonFiles.length > 0) {
  console.log("");
  console.log("发现损坏 JSON 文件：");

  for (const item of invalidJsonFiles) {
    console.log(" - " + path.relative(root, item.filePath));
    console.log("   " + item.message);

    const backupCandidates = fs
      .readdirSync(path.dirname(item.filePath))
      .filter((name) => {
        return name.startsWith(path.basename(item.filePath) + ".bak");
      })
      .map((name) => path.join(path.dirname(item.filePath), name))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    const validBackup = backupCandidates.find((backupPath) => {
      try {
        JSON.parse(fs.readFileSync(backupPath, "utf8"));
        return true;
      } catch {
        return false;
      }
    });

    if (validBackup) {
      const brokenBackup = `${item.filePath}.bak_broken_json_${stamp()}`;
      fs.copyFileSync(item.filePath, brokenBackup);
      fs.copyFileSync(validBackup, item.filePath);

      console.log("   已从可用备份恢复：");
      console.log("   " + path.relative(root, validBackup));
      console.log("   当前坏文件已另存为：");
      console.log("   " + path.relative(root, brokenBackup));
    } else {
      console.log("   没有找到可用备份。错误位置附近内容：");
      const match = item.message.match(/position\s+(\d+)/);
      const pos = match ? Number(match[1]) : 0;
      const start = Math.max(0, pos - 160);
      const end = Math.min(item.raw.length, pos + 160);
      console.log(item.raw.slice(start, end));
      process.exitCode = 1;
    }
  }
} else {
  console.log("data 目录下 JSON 文件全部可解析。");
}

/* =========================================================
   2. 重写阀系列选型数据，彻底消除 /products/valves/undefined
   关键：
   - 页面显示：productTypeId 用中文
   - 路由字段：productTypeSlug / detailSlug / routeSlug / slug / href 全部写全
========================================================= */

const selectionPath = abs("data/products/selection/valve-selection.generated.ts");

if (fs.existsSync(selectionPath)) {
  backup(selectionPath, "fix_valve_selection_undefined");
}

ensureDir(selectionPath);

const valveSelection = `/* =========================================================
   valve-selection.generated.ts
   FOREACH 官网｜阀系列产品中心卡片数据

   说明：
   1. 阀系列产品类型分为：旋转阀 / 高压阀 / 电磁阀
   2. productTypeId 使用中文，用于前台筛选显示
   3. productTypeSlug / detailSlug / routeSlug / slug 使用英文，用于路由
   4. 避免生成 /products/valves/undefined
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
    detailSlug: "rotary-valves",
    routeSlug: "rotary-valves",
    seriesSlug: "rotary-valves",
    productTypeSlug: "rotary-valves",

    productId: "mrv3-ceramic-rotary-valve",
    productCode: "MRV3",
    code: "MRV3",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "旋转阀",
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

    image: "/images/products/valves/rotary-valves/mrv3-ceramic-rotary-valve-main.webp",
    imagePath: "/images/products/valves/rotary-valves/mrv3-ceramic-rotary-valve-main.webp",
    imageUrl: "/images/products/valves/rotary-valves/mrv3-ceramic-rotary-valve-main.webp",
    imageAlt: "MRV3 陶瓷多通道旋转阀",

    subtitle: "10 / 16 / 24 通道可选，适用于多试剂和清洗路径切换",
    description:
      "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多通道流路切换、试剂选择、样本分配和清洗路径管理。",

    summary:
      "10 / 16 / 24 通道可选，耐压 0.7MPa，内容积低至 2.9μL。",

    tags: ["多通道切换", "0.7MPa", "低内容积"],

    specs: [
      { label: "通道数量", value: "10 / 16 / 24" },
      { label: "通道直径", value: "1.2 / 1.0 / 0.5mm" },
      { label: "内容积", value: "15.8 / 10 / 2.9μL" },
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
    detailSlug: "high-pressure-valves",
    routeSlug: "high-pressure-valves",
    seriesSlug: "high-pressure-valves",
    productTypeSlug: "high-pressure-valves",

    productId: "hp-3-position-7-port-high-pressure-valve",
    productCode: "HP",
    code: "HP",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "高压阀",
    productTypeLabel: "高压阀",

    model: "HP 三位七通高压阀",
    title: "HP 三位七通高压阀",
    name: "HP 三位七通高压阀",
    productName: "HP 三位七通高压阀",

    cardTitle: {
      zh: "HP 三位七通高压阀",
      en: "HP Three-position Seven-port High-pressure Valve",
    },

    cardSubtitle: {
      zh: "三位七通高压流路控制\\n25MPa，10-32UNF 接口\\n适用于 HPLC 自动进样与排气场景",
      en: "Three-position seven-port high-pressure flow control\\n25MPa, 10-32UNF port\\nFor HPLC autosampling and venting",
    },

    image: "/images/products/valves/high-pressure-valves/hp-3-position-7-port-high-pressure-valve-main.webp",
    imagePath: "/images/products/valves/high-pressure-valves/hp-3-position-7-port-high-pressure-valve-main.webp",
    imageUrl: "/images/products/valves/high-pressure-valves/hp-3-position-7-port-high-pressure-valve-main.webp",
    imageAlt: "HP 三位七通高压阀",

    subtitle: "三位七通高压流路控制，适用于 HPLC 自动进样与排气场景",
    description:
      "HP 三位七通高压阀用于 HPLC 自动进样、高压流路切换、系统排气和分析仪器高压液路模块。",

    summary:
      "三位七通结构，最大工作压力 25MPa，接口 10-32UNF。",

    tags: ["25MPa", "三位七通", "HPLC"],

    specs: [
      { label: "最大工作压力", value: "25MPa" },
      { label: "接口规格", value: "10-32UNF" },
      { label: "内体积", value: "0.8μL" },
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
    detailSlug: "solenoid-valves",
    routeSlug: "solenoid-valves",
    seriesSlug: "solenoid-valves",
    productTypeSlug: "solenoid-valves",

    productId: "6010-solenoid-valve",
    productCode: "6010",
    code: "6010",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "电磁阀",
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
      zh: "2通 / 3通摆臂隔膜阀\\n-75kPa~0.25MPa，CV 0.03\\n支持基板型、螺纹型和倒刺型配置",
      en: "2-port / 3-port rocker diaphragm valve\\n-75kPa to 0.25MPa, CV 0.03\\nPanel, threaded and barbed configurations",
    },

    image: "/images/products/valves/solenoid-valves/6010-solenoid-valve-main.webp",
    imagePath: "/images/products/valves/solenoid-valves/6010-solenoid-valve-main.webp",
    imageUrl: "/images/products/valves/solenoid-valves/6010-solenoid-valve-main.webp",
    imageAlt: "6010 系列电磁阀",

    subtitle: "2通 / 3通摆臂隔膜阀，适用于试剂通断与阀组集成",
    description:
      "6010 系列电磁阀用于自动化分析仪器中的试剂通断、清洗液控制、废液控制和阀组集成。",

    summary:
      "2通 / 3通结构可选，压力范围 -75kPa~0.25MPa，CV 0.03。",

    tags: ["通断控制", "CV 0.03", "2通 / 3通"],

    specs: [
      { label: "使用压力范围", value: "-75kPa~0.25MPa" },
      { label: "孔口直径", value: "1.4mm" },
      { label: "流量系数CV", value: "0.03" },
    ],

    filter01: "电磁阀",
    filter02: "通断控制",
    filter03: "-75kPa~0.25MPa",
    filter04: "定制配置",

    filters: {
      filter01: "电磁阀",
      filter02: "通断控制",
      filter03: "-75kPa~0.25MPa",
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

fs.writeFileSync(selectionPath, valveSelection, "utf8");
console.log("已重写阀系列选型数据，补齐所有路由 slug，避免 undefined。");

/* =========================================================
   3. 确认阀详情页静态参数
========================================================= */

const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (fs.existsSync(pagePath)) {
  backup(pagePath, "ensure_valve_static_params");

  let pageText = fs.readFileSync(pagePath, "utf8");

  const staticBlock = `export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "rotary-valves" },
    { slug: "high-pressure-valves" },
    { slug: "solenoid-valves" },
  ];
}`;

  const staticPattern =
    /export const dynamicParams = false;\s*[\s\S]*?export function generateStaticParams\(\) \{[\s\S]*?\n\}/;

  const generateOnlyPattern =
    /export function generateStaticParams\(\) \{[\s\S]*?\n\}/;

  if (staticPattern.test(pageText)) {
    pageText = pageText.replace(staticPattern, staticBlock);
  } else if (generateOnlyPattern.test(pageText)) {
    pageText = pageText.replace(generateOnlyPattern, staticBlock);
  } else {
    const marker = "const details = valveDetailData as ValveDetailRecord[];";
    if (pageText.includes(marker)) {
      pageText = pageText.replace(marker, `${marker}\n\n${staticBlock}`);
    }
  }

  fs.writeFileSync(pagePath, pageText, "utf8");
  console.log("已确认阀详情页 generateStaticParams。");
}

/* =========================================================
   4. 最后再扫一次固定 undefined 链接
========================================================= */

const badFiles = [];

for (const dirName of ["app", "components", "data"]) {
  walk(abs(dirName), (filePath) => {
    if (!/\.(ts|tsx|js|jsx|json)$/.test(filePath)) return;

    const content = fs.readFileSync(filePath, "utf8");
    if (content.includes("/products/valves/undefined")) {
      badFiles.push(path.relative(root, filePath));
    }
  });
}

if (badFiles.length) {
  console.log("");
  console.log("仍发现 /products/valves/undefined：");
  for (const file of badFiles) {
    console.log(" - " + file);
  }
} else {
  console.log("未发现固定写死的 /products/valves/undefined。");
}

console.log("");
console.log("修复完成。下一步请重新启动 dev。");