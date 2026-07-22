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
   1. 修复阀系列卡片数据：补 detailSlug / routeSlug
========================================================= */

const valveSelectionPath = abs("data/products/selection/valve-selection.generated.ts");

if (!fs.existsSync(valveSelectionPath)) {
  console.error("找不到阀系列选型数据文件：data/products/selection/valve-selection.generated.ts");
  process.exit(1);
}

backup(valveSelectionPath, "fix_valve_slug");

let valveText = fs.readFileSync(valveSelectionPath, "utf8");

function insertSlugFields(text, slug) {
  const slugLine = `slug: "${slug}",`;

  if (!text.includes(slugLine)) {
    return text;
  }

  const alreadyHasDetailSlug =
    text.includes(`detailSlug: "${slug}"`) ||
    text.includes(`routeSlug: "${slug}"`);

  if (alreadyHasDetailSlug) {
    return text;
  }

  return text.replace(
    slugLine,
    `${slugLine}
    detailSlug: "${slug}",
    routeSlug: "${slug}",
    seriesSlug: "${slug}",`
  );
}

valveText = insertSlugFields(valveText, "rotary-valves");
valveText = insertSlugFields(valveText, "high-pressure-valves");
valveText = insertSlugFields(valveText, "solenoid-valves");

/*
  保证 href / detailHref 是真实路径，不是 undefined。
*/
valveText = valveText
  .replace(/href:\s*"\/products\/valves\/undefined"/g, 'href: "/products/valves/rotary-valves"')
  .replace(/detailHref:\s*"\/products\/valves\/undefined"/g, 'detailHref: "/products/valves/rotary-valves"');

fs.writeFileSync(valveSelectionPath, valveText, "utf8");

console.log("已补齐阀系列卡片 detailSlug / routeSlug。");

/* =========================================================
   2. 修复 ProductSelectionClient 详情链接
   说明：
   只在 makeDetailHref 开头加阀系列兜底分支。
   不改页面样式，不改其他产品逻辑。
========================================================= */

const clientPath = abs("components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(clientPath)) {
  console.error("找不到 ProductSelectionClient.tsx");
  process.exit(1);
}

backup(clientPath, "fix_valve_href");

let clientText = fs.readFileSync(clientPath, "utf8");

if (clientText.includes("VALVE_DETAIL_HREF_PATCH_20260707")) {
  console.log("ProductSelectionClient 已经包含阀系列详情链接补丁，跳过。");
} else {
  const patchBlock = `
  /*
    VALVE_DETAIL_HREF_PATCH_20260707

    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */
  if ((product as any)?.categoryId === "valves") {
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
      (product as any).detailSlug ||
      (product as any).routeSlug ||
      (product as any).slug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      slugFromHref;

    const valveSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    if (
      valveSlug &&
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {
      return \`/products/valves/\${valveSlug}\`;
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
  } else if (arrowPattern.test(clientText)) {
    clientText = clientText.replace(arrowPattern, `$1${patchBlock}`);
  } else {
    console.error("没有找到 makeDetailHref 函数，无法自动修复。");
    console.error("请把 components/products/selection/ProductSelectionClient.tsx 中 makeDetailHref 附近代码发我。");
    process.exit(1);
  }

  fs.writeFileSync(clientPath, clientText, "utf8");
  console.log("已修复 ProductSelectionClient 阀系列详情链接。");
}

/* =========================================================
   3. 保证阀详情页 generateStaticParams 只有真实路径
========================================================= */

const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (fs.existsSync(pagePath)) {
  backup(pagePath, "fix_valve_static_params");

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
      pageText = pageText.replace(marker, `${marker}

${staticBlock}`);
    }
  }

  fs.writeFileSync(pagePath, pageText, "utf8");
  console.log("已确认阀详情页 generateStaticParams。");
}

/* =========================================================
   4. 扫描错误链接
========================================================= */

const scanRoots = ["app", "components", "data"];
const badLinks = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if ([".next", "node_modules", ".git"].includes(entry.name)) continue;
      walk(full);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) continue;

    const content = fs.readFileSync(full, "utf8");
    if (content.includes("/products/valves/undefined")) {
      badLinks.push(path.relative(root, full));
    }
  }
}

for (const dir of scanRoots) {
  walk(abs(dir));
}

console.log("");
if (badLinks.length) {
  console.log("仍发现 /products/valves/undefined：");
  for (const file of badLinks) {
    console.log(" - " + file);
  }
} else {
  console.log("未发现 /products/valves/undefined 固定错误链接。");
}

console.log("");
console.log("请重新启动后测试：");
console.log("/products");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");