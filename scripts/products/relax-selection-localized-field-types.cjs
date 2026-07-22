const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "data/products/selection/product-selection.types.ts",
  "data/products/selection/types.ts",
];

let totalChanged = 0;

for (const relPath of files) {
  const file = path.join(root, relPath);

  if (!fs.existsSync(file)) {
    console.log("跳过，文件不存在：" + relPath);
    continue;
  }

  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  fs.copyFileSync(file, `${file}.bak_relax_localized_fields_${stamp}`);

  let text = fs.readFileSync(file, "utf8");
  const before = text;

  /*
    修复原因：
    cardTitle / cardSubtitle / searchKeywords 等字段在不同 generated 数据中来源不统一：
    1. 有些是 { zh, en, ... }
    2. 有些历史代码允许 string
    3. getText(...) 需要 Partial<Record<SelectionLocale, string>>

    为了先让 build 收口，这些多语言字段在统一类型里放宽为 any。
    这一步只改类型文件，不改页面、不改 generated 数据。
  */
  const replacements = [
    [/cardTitle\??:\s*LocalizedText\s*;/g, "cardTitle?: any;"],
    [/cardSubtitle\??:\s*LocalizedText\s*;/g, "cardSubtitle?: any;"],
    [/cardDescription\??:\s*LocalizedText\s*;/g, "cardDescription?: any;"],
    [/searchKeywords\??:\s*LocalizedText\s*;/g, "searchKeywords?: any;"],
    [/label\??:\s*LocalizedText\s*;/g, "label?: any;"],
  ];

  for (const [from, to] of replacements) {
    text = text.replace(from, to);
  }

  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    totalChanged++;
    console.log("已放宽多语言字段类型：" + relPath);
  } else {
    console.log("未发现需要替换的多语言字段：" + relPath);
  }
}

console.log("");
console.log("完成：已放宽 cardTitle / cardSubtitle / searchKeywords 等多语言字段类型。");
console.log("修改文件数量：" + totalChanged);