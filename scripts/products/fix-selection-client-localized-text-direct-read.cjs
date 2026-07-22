const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_localized_text_direct_read_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const helper = `
function getSelectionLocalizedText(value: unknown, locale: "zh" | "en" = "zh"): string {
  if (!value) return "";
  if (typeof value === "string") return value;

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const current = record[locale];
    const zh = record.zh;
    const en = record.en;

    if (typeof current === "string") return current;
    if (typeof zh === "string") return zh;
    if (typeof en === "string") return en;
  }

  return "";
}
`;

if (!text.includes("function getSelectionLocalizedText(")) {
  const anchor = "function findPlungerPumpDetailSlug";
  const index = text.indexOf(anchor);

  if (index < 0) {
    console.error("没有找到 function findPlungerPumpDetailSlug，无法确定 helper 插入位置。");
    process.exit(1);
  }

  text = text.slice(0, index) + helper + "\n" + text.slice(index);
  console.log("已添加 getSelectionLocalizedText helper。");
} else {
  console.log("getSelectionLocalizedText helper 已存在，不重复添加。");
}

const replacements = [
  ["product.cardTitle?.en", 'getSelectionLocalizedText(product.cardTitle, "en")'],
  ["product.cardTitle?.zh", 'getSelectionLocalizedText(product.cardTitle, "zh")'],
  ["product.cardSubtitle?.en", 'getSelectionLocalizedText(product.cardSubtitle, "en")'],
  ["product.cardSubtitle?.zh", 'getSelectionLocalizedText(product.cardSubtitle, "zh")'],
  ["product.cardDescription?.en", 'getSelectionLocalizedText(product.cardDescription, "en")'],
  ["product.cardDescription?.zh", 'getSelectionLocalizedText(product.cardDescription, "zh")'],
  ["product.searchKeywords?.en", 'getSelectionLocalizedText(product.searchKeywords, "en")'],
  ["product.searchKeywords?.zh", 'getSelectionLocalizedText(product.searchKeywords, "zh")'],
];

let changed = 0;

for (const [from, to] of replacements) {
  if (text.includes(from)) {
    text = text.replaceAll(from, to);
    changed++;
    console.log(`已替换：${from} -> ${to}`);
  }
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：ProductSelectionClient.tsx LocalizedText 安全读取修复。");
console.log("替换类型数量：" + changed);