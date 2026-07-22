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
   1. 强制修复针系列产品中心数据 categoryId

   说明：
   产品中心顶部“针系列”大类一般使用 needles。
   详情页路径可以继续使用 /products/probes/[slug]。
========================================================= */

const selectionPath = abs("data/products/selection/probe-selection.generated.ts");

if (!fs.existsSync(selectionPath)) {
  console.error("找不到：data/products/selection/probe-selection.generated.ts");
  process.exit(1);
}

backup(selectionPath, "force_needles_category");

let selectionText = fs.readFileSync(selectionPath, "utf8");

selectionText = selectionText
  .replace(/categoryId:\s*"[^"]+"/g, 'categoryId: "needles"')
  .replace(/category:\s*"[^"]+"/g, 'category: "needles"')
  .replace(/categoryLabel:\s*"[^"]+"/g, 'categoryLabel: "针系列"');

fs.writeFileSync(selectionPath, selectionText, "utf8");

console.log("已强制把针系列产品中心 categoryId 改为 needles。");

/* =========================================================
   2. 确保 ProductSelectionClient 已经 import 针系列数据
========================================================= */

const clientPath = abs("components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(clientPath)) {
  console.error("找不到：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

backup(clientPath, "force_probe_selection_client");

let clientText = fs.readFileSync(clientPath, "utf8");

/*
  2.1 补 import
*/
if (!clientText.includes("probe-selection.generated")) {
  const importBlock = `import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";`;

  const anchors = [
    '} from "@/data/products/selection/valve-selection.generated";',
    '} from "@/data/products/selection/syringe-pump-selection.generated";',
    '} from "@/data/products/selection/valveless-pump-selection.generated";',
    '} from "@/data/products/selection/diaphragm-pump-selection.generated";',
  ];

  const anchor = anchors.find((item) => clientText.includes(item));

  if (!anchor) {
    console.error("没有找到 import 锚点，无法自动接入针系列 import。");
    process.exit(1);
  }

  clientText = clientText.replace(anchor, `${anchor}
${importBlock}`);

  console.log("已补充针系列 import。");
} else {
  console.log("针系列 import 已存在。");
}

/*
  2.2 补产品池
*/
if (!clientText.includes("...probeSelectionProducts")) {
  const anchors = [
    "...valveSelectionProducts,",
    "...syringePumpSelectionProducts,",
    "...valvelessPumpSelectionProducts,",
    "...diaphragmPumpSelectionProducts,",
    "...plungerPumpSelectionProducts,",
  ];

  const anchor = anchors.find((item) => clientText.includes(item));

  if (!anchor) {
    console.error("没有找到产品池锚点，无法自动插入 ...probeSelectionProducts。");
    process.exit(1);
  }

  clientText = clientText.replace(anchor, `${anchor}
  ...probeSelectionProducts,`);

  console.log("已补充 ...probeSelectionProducts。");
} else {
  console.log("...probeSelectionProducts 已存在。");
}

/*
  2.3 补筛选标签
*/
if (!clientText.includes("...probeFilterLabels")) {
  const anchors = [
    "...valveFilterLabels,",
    "...syringePumpFilterLabels,",
    "...valvelessPumpFilterLabels,",
    "...diaphragmPumpFilterLabels,",
    "...plungerPumpFilterLabels,",
  ];

  const anchor = anchors.find((item) => clientText.includes(item));

  if (!anchor) {
    console.error("没有找到筛选标签锚点，无法自动插入 ...probeFilterLabels。");
    process.exit(1);
  }

  clientText = clientText.replace(anchor, `${anchor}
  ...probeFilterLabels,`);

  console.log("已补充 ...probeFilterLabels。");
} else {
  console.log("...probeFilterLabels 已存在。");
}

/*
  2.4 修详情链接
*/
if (!clientText.includes("PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES")) {
  const patchBlock = `
  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
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
    console.log("已补充针系列详情链接补丁。");
  } else if (arrowPattern.test(clientText)) {
    clientText = clientText.replace(arrowPattern, `$1${patchBlock}`);
    console.log("已补充针系列详情链接补丁。");
  } else {
    console.log("没有找到 makeDetailHref，跳过详情链接补丁。");
  }
}

fs.writeFileSync(clientPath, clientText, "utf8");

/* =========================================================
   3. 如果顶部分类没有 needles，则尝试补一个“针系列”
========================================================= */

let updatedTopCategory = false;
let text2 = fs.readFileSync(clientPath, "utf8");

if (!text2.includes('id: "needles"') && !text2.includes("id: 'needles'")) {
  /*
    常见结构：PRODUCT_CATEGORIES = [ ... ]
    在 valves 后面插入 needles。
  */
  const valveCategoryBlockPattern =
    /\{\s*id:\s*["']valves["'][\s\S]*?label:\s*["']阀系列["'][\s\S]*?\},/;

  if (valveCategoryBlockPattern.test(text2)) {
    text2 = text2.replace(valveCategoryBlockPattern, (match) => {
      return `${match}
  {
    id: "needles",
    label: "针系列",
    description: "根据采样针、穿刺针、清洗针和搅拌桨选择来图定制方向。",
  },`;
    });

    updatedTopCategory = true;
  }
}

if (updatedTopCategory) {
  fs.writeFileSync(clientPath, text2, "utf8");
  console.log("已补充顶部分类：针系列 needles。");
} else {
  console.log("顶部分类 needles 已存在，或未找到可自动插入的位置。");
}

/* =========================================================
   4. 输出检查
========================================================= */

console.log("");
console.log("修复完成。请打开 /products 测试：");
console.log("1. 顶部应有：针系列");
console.log("2. 点击针系列后，应显示 4 张卡片：");
console.log("   - 采样针系列");
console.log("   - 穿刺针系列");
console.log("   - 清洗针系列");
console.log("   - 搅拌桨系列");
console.log("3. 左侧筛选应显示：");
console.log("   - 采样针");
console.log("   - 穿刺针");
console.log("   - 清洗针");
console.log("   - 搅拌桨");
console.log("");
console.log("详情测试：");
console.log("/products/probes/sampling-probes");
console.log("/products/probes/piercing-probes");
console.log("/products/probes/wash-probes");
console.log("/products/probes/stirring-paddles");