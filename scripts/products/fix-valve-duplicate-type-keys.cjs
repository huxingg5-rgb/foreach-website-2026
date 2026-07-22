const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_remove_duplicate_type_keys_${stamp}`);

const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

/*
  只清理文件顶部 type/interface 里的重复字段。
  当前 build 报错是 Duplicate identifier 'seoTitle'。
  同时顺手检查 seoDescription、bottomCta 等同类重复字段。
*/
const targetKeys = [
  "seoTitle",
  "seoDescription",
  "bottomCtaTitle",
  "bottomCtaDescription",
  "bottomCtaButtonText",
  "bottomCtaHref",
  "h1Title",
  "pageTitle",
];

const removeIndexes = new Set();
const seen = new Map();

let inTopTypeBlock = false;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!inTopTypeBlock && /^\s*(type|interface)\s+/.test(line) && line.includes("{")) {
    inTopTypeBlock = true;
    braceDepth = 0;
  }

  if (inTopTypeBlock) {
    for (const ch of line) {
      if (ch === "{") braceDepth++;
      if (ch === "}") braceDepth--;
    }

    const match = line.match(/^\s*([A-Za-z0-9_]+)\??\s*:/);
    if (match) {
      const key = match[1];

      if (targetKeys.includes(key)) {
        if (!seen.has(key)) {
          seen.set(key, []);
        }

        seen.get(key).push(i);
      }
    }

    if (braceDepth <= 0 && line.includes("}")) {
      break;
    }
  }
}

console.log("顶部类型字段检查：");

for (const key of targetKeys) {
  const hits = seen.get(key) || [];

  if (hits.length > 0) {
    console.log(`${key} 出现次数：${hits.length}`);
    hits.forEach((index) => {
      console.log(`  line ${index + 1}: ${lines[index].trim()}`);
    });
  }

  if (hits.length > 1) {
    /*
      类型定义里重复字段无意义。
      保留第一次出现，删除后面的重复项。
    */
    hits.slice(1).forEach((index) => removeIndexes.add(index));
  }
}

if (removeIndexes.size === 0) {
  console.log("没有发现需要删除的重复类型字段。");
  process.exit(0);
}

const nextLines = lines.filter((_, index) => !removeIndexes.has(index));

fs.writeFileSync(file, nextLines.join("\n"), "utf8");

console.log("");
console.log("已删除重复类型字段行数：" + removeIndexes.size);
console.log("已保留第一次出现的字段定义。");