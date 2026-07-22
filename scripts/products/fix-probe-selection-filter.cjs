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

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

/* =========================================================
   1. 检测产品中心“针系列”的真实 categoryId
========================================================= */

function detectNeedleCategoryId() {
  const files = [
    "components/products/selection/ProductSelectionClient.tsx",
    "data/products/selection/product-type-intro.ts",
    "data/products/selection/product-route-map.ts",
    "data/products/selection/product-selection.types.ts",
    "data/navigation.ts",
  ];

  for (const relativePath of files) {
    const filePath = abs(relativePath);
    if (!fs.existsSync(filePath)) continue;

    const text = fs.readFileSync(filePath, "utf8");

    const patterns = [
      /id:\s*["']([^"']+)["'][\s\S]{0,500}?label:\s*["']针系列["']/,
      /label:\s*["']针系列["'][\s\S]{0,500}?id:\s*["']([^"']+)["']/,
      /id:\s*["']([^"']+)["'][\s\S]{0,500}?zh:\s*["']针系列["']/,
      /zh:\s*["']针系列["'][\s\S]{0,500}?id:\s*["']([^"']+)["']/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    /*
      兜底判断：
      之前官网大类更常见是 needles，不是 probes。
      probes 更适合详情路由，不一定适合作为产品中心分类 id。
    */
    if (text.includes("针系列") && text.includes("needles")) {
      return "needles";
    }
  }

  return "needles";
}

const needleCategoryId = detectNeedleCategoryId();

console.log("当前针系列产品中心 categoryId 使用：" + needleCategoryId);

/* =========================================================
   2. 修复 probe-selection.generated.ts 的 categoryId
========================================================= */

const selectionPath = abs("data/products/selection/probe-selection.generated.ts");

if (!fs.existsSync(selectionPath)) {
  console.error("找不到针系列选型数据：data/products/selection/probe-selection.generated.ts");
  process.exit(1);
}

backup(selectionPath, "fix_probe_filter_category");

let selectionText = fs.readFileSync(selectionPath, "utf8");

/*
  把针系列卡片 categoryId 统一改成产品中心真实分类 id。
  详情路由仍然走 /products/probes/[slug]，不受影响。
*/
selectionText = selectionText.replace(
  /categoryId:\s*"[^"]+"/g,
  `categoryId: "${needleCategoryId}"`
);

/*
  保证 categoryLabel 存在。
*/
selectionText = selectionText.replace(
  /categoryLabel:\s*"[^"]+"/g,
  `categoryLabel: "针系列"`
);

/*
  保证前台筛选显示中文，路由字段显示英文。
*/
const routeFixes = [
  ["sampling-probes", "采样针"],
  ["piercing-probes", "穿刺针"],
  ["wash-probes", "清洗针"],
  ["stirring-paddles", "搅拌桨"],
];

for (const [slug, label] of routeFixes) {
  const slugLine = `slug: "${slug}",`;

  if (selectionText.includes(slugLine)) {
    const objectStart = selectionText.lastIndexOf("{", selectionText.indexOf(slugLine));
    const objectEnd = selectionText.indexOf("},", selectionText.indexOf(slugLine));

    if (objectStart !== -1 && objectEnd !== -1) {
      let block = selectionText.slice(objectStart, objectEnd + 2);

      const requiredFields = [
        [`detailSlug`, slug],
        [`routeSlug`, slug],
        [`seriesSlug`, slug],
        [`productTypeSlug`, slug],
      ];

      for (const [field, value] of requiredFields) {
        if (!block.includes(`${field}:`)) {
          block = block.replace(slugLine, `${slugLine}
    ${field}: "${value}",`);
        }
      }

      block = block
        .replace(/productTypeId:\s*"[^"]+"/, `productTypeId: "${label}"`)
        .replace(/productTypeLabel:\s*"[^"]+"/, `productTypeLabel: "${label}"`);

      selectionText =
        selectionText.slice(0, objectStart) +
        block +
        selectionText.slice(objectEnd + 2);
    }
  }
}

fs.writeFileSync(selectionPath, selectionText, "utf8");
console.log("已修复针系列选型数据 categoryId 和筛选显示字段。");

/* =========================================================
   3. 确认 ProductSelectionClient 已接入针系列
========================================================= */

const clientPath = abs("components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(clientPath)) {
  console.error("找不到 ProductSelectionClient.tsx");
  process.exit(1);
}

backup(clientPath, "fix_probe_filter_client");

let clientText = fs.readFileSync(clientPath, "utf8");

/*
  3.1 补 import
*/
if (!clientText.includes("probe-selection.generated")) {
  const importBlock = `import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";`;

  const importAnchors = [
    '} from "@/data/products/selection/valve-selection.generated";',
    '} from "@/data/products/selection/syringe-pump-selection.generated";',
    '} from "@/data/products/selection/valveless-pump-selection.generated";',
    '} from "@/data/products/selection/diaphragm-pump-selection.generated";',
  ];

  const anchor = importAnchors.find((item) => clientText.includes(item));

  if (!anchor) {
    console.error("未找到合适 import 锚点，无法自动插入针系列 import。");
    process.exit(1);
  }

  clientText = clientText.replace(anchor, `${anchor}
${importBlock}`);

  console.log("已补充 probe-selection import。");
}

/*
  3.2 补产品池合并
*/
if (!clientText.includes("...probeSelectionProducts")) {
  const productAnchors = [
    "...valveSelectionProducts,",
    "...syringePumpSelectionProducts,",
    "...valvelessPumpSelectionProducts,",
    "...diaphragmPumpSelectionProducts,",
    "...plungerPumpSelectionProducts,",
  ];

  const anchor = productAnchors.find((item) => clientText.includes(item));

  if (!anchor) {
    console.error("未找到产品池锚点，无法自动插入 ...probeSelectionProducts。");
    process.exit(1);
  }

  clientText = clientText.replace(anchor, `${anchor}
  ...probeSelectionProducts,`);

  console.log("已补充 ...probeSelectionProducts。");
}

/*
  3.3 补筛选标签合并
*/
if (!clientText.includes("...probeFilterLabels")) {
  const labelAnchors = [
    "...valveFilterLabels,",
    "...syringePumpFilterLabels,",
    "...valvelessPumpFilterLabels,",
    "...diaphragmPumpFilterLabels,",
    "...plungerPumpFilterLabels,",
  ];

  const anchor = labelAnchors.find((item) => clientText.includes(item));

  if (!anchor) {
    console.error("未找到筛选标签锚点，无法自动插入 ...probeFilterLabels。");
    process.exit(1);
  }

  clientText = clientText.replace(anchor, `${anchor}
  ...probeFilterLabels,`);

  console.log("已补充 ...probeFilterLabels。");
}

/*
  3.4 修复针系列详情链接，避免以后出现 /products/probes/undefined
*/
if (!clientText.includes("PROBE_DETAIL_HREF_PATCH_20260709")) {
  const patchBlock = `
  /*
    PROBE_DETAIL_HREF_PATCH_20260709

    针系列在产品中心中使用中文 productTypeId 显示筛选项，
    详情路由不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryId === "${needleCategoryId}" ||
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

  if (functionPattern.test(clientText)) {
    clientText = clientText.replace(functionPattern, `$1${patchBlock}`);
    console.log("已补充针系列 makeDetailHref 补丁。");
  } else if (arrowPattern.test(clientText)) {
    clientText = clientText.replace(arrowPattern, `$1${patchBlock}`);
    console.log("已补充针系列 makeDetailHref 补丁。");
  } else {
    console.log("没有找到 makeDetailHref 函数，跳过详情链接补丁。");
  }
}

fs.writeFileSync(clientPath, clientText, "utf8");

console.log("已确认 ProductSelectionClient 针系列接入。");

/* =========================================================
   4. 输出检查结果
========================================================= */

console.log("");
console.log("检查结果：");
console.log("- 针系列 categoryId：" + needleCategoryId);
console.log("- 选型数据文件：data/products/selection/probe-selection.generated.ts");
console.log("- 详情路径：");
console.log("  /products/probes/sampling-probes");
console.log("  /products/probes/piercing-probes");
console.log("  /products/probes/wash-probes");
console.log("  /products/probes/stirring-paddles");
console.log("");
console.log("现在请打开 /products，点击“针系列”，左侧应出现：");
console.log("采样针 / 穿刺针 / 清洗针 / 搅拌桨");