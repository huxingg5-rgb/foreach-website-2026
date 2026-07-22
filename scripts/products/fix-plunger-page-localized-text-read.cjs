const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/pumps/plunger-pumps/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/pumps/plunger-pumps/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_localized_text_read_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const helper = `
function getLocalizedSelectionText(
  value: string | { zh?: string; en?: string; [key: string]: string | undefined } | undefined,
  locale: "zh" | "en"
): string {
  if (!value) return "";
  if (typeof value === "string") return value;

  return value[locale] || value.zh || value.en || "";
}
`;

if (!text.includes("function getLocalizedSelectionText(")) {
  const insertAfterImports = text.search(/\n(export\s+|const\s+|function\s+|async\s+function\s+)/);

  if (insertAfterImports < 0) {
    console.error("没有找到合适的 helper 插入位置，请把文件发我。");
    process.exit(1);
  }

  text = text.slice(0, insertAfterImports) + helper + text.slice(insertAfterImports);
  console.log("已添加 getLocalizedSelectionText helper。");
} else {
  console.log("helper 已存在，不重复添加。");
}

const replacements = [
  ["product.cardTitle?.en", 'getLocalizedSelectionText(product.cardTitle, "en")'],
  ["product.cardTitle?.zh", 'getLocalizedSelectionText(product.cardTitle, "zh")'],
  ["product.cardSubtitle?.en", 'getLocalizedSelectionText(product.cardSubtitle, "en")'],
  ["product.cardSubtitle?.zh", 'getLocalizedSelectionText(product.cardSubtitle, "zh")'],
  ["product.searchKeywords?.en", 'getLocalizedSelectionText(product.searchKeywords, "en")'],
  ["product.searchKeywords?.zh", 'getLocalizedSelectionText(product.searchKeywords, "zh")'],
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
console.log("完成：柱塞泵详情页 LocalizedText 安全读取修复。");
console.log("替换数量：" + changed);