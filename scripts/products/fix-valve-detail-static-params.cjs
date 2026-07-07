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

function backup(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_fix_static_params_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

/* =========================================================
   1. 修复阀系列详情页 generateStaticParams
========================================================= */

const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("找不到阀系列详情页文件：app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

backup(pagePath);

let text = fs.readFileSync(pagePath, "utf8");

/*
  output: export 模式下，动态路由必须明确声明所有静态路径。
  这里不再依赖 JSON 数据生成，直接写死三个阀系列详情路径。
*/
const staticParamsBlock = `export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "rotary-valves" },
    { slug: "high-pressure-valves" },
    { slug: "solenoid-valves" },
  ];
}`;

/*
  替换旧的 generateStaticParams。
*/
const generatePattern = /export function generateStaticParams\(\) \{[\s\S]*?\n\}/;

if (generatePattern.test(text)) {
  text = text.replace(generatePattern, staticParamsBlock);
} else {
  /*
    如果没找到旧函数，就插入到 import 区之后。
  */
  const importEndMarker = 'import "./valve-detail.css";';
  if (!text.includes(importEndMarker)) {
    console.error("没有找到 import 锚点，无法自动插入 generateStaticParams。");
    process.exit(1);
  }

  text = text.replace(
    importEndMarker,
    `${importEndMarker}

${staticParamsBlock}`
  );
}

/*
  避免重复 dynamicParams。
*/
text = text.replace(
  /export const dynamicParams = false;\s*\n\s*export const dynamicParams = false;/g,
  "export const dynamicParams = false;"
);

fs.writeFileSync(pagePath, text, "utf8");

console.log("已修复阀系列详情页 generateStaticParams。");

/* =========================================================
   2. 检查是否还有错误链接 /products/valves/[slug]
========================================================= */

const searchRoots = ["app", "components", "data"];
const badNeedle = "/products/valves/[slug]";
const badFiles = [];

function walk(dir) {
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
      walk(fullPath);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    if (content.includes(badNeedle)) {
      badFiles.push(path.relative(root, fullPath));
    }
  }
}

for (const item of searchRoots) {
  walk(abs(item));
}

if (badFiles.length > 0) {
  console.log("");
  console.log("发现仍然包含 /products/valves/[slug] 的文件：");
  for (const file of badFiles) {
    console.log(" - " + file);
  }
  console.log("这些文件需要下一步单独修链接。");
} else {
  console.log("没有发现 /products/valves/[slug] 错误链接。");
}

console.log("");
console.log("请访问真实路径，不要访问 /products/valves/[slug]：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");