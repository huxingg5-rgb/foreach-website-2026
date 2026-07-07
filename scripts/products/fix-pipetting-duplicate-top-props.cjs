const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/pumps/pipetting-pumps/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/pumps/pipetting-pumps/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_remove_duplicate_top_props_${stamp}`);

const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

/*
  只处理顶层 4 空格缩进的对象属性。
  不处理 resources: { ... } 里面的子字段，避免误删嵌套对象内容。
*/
const targetKeys = [
  "show3DRequest",
  "showDrawingRequest",
  "model3dUrl",
  "drawingPdfUrl",
  "drawing2dUrl",
  "customInquiryTitle",
  "customInquiryDescription",
  "customInquiryButtonText",
  "customInquiryHref",
];

const hitsByKey = new Map();

lines.forEach((line, index) => {
  const match = line.match(/^ {4}([A-Za-z0-9_]+)\s*:/);
  if (!match) return;

  const key = match[1];
  if (!targetKeys.includes(key)) return;

  if (!hitsByKey.has(key)) hitsByKey.set(key, []);
  hitsByKey.get(key).push(index);
});

const removeIndexes = new Set();

console.log("重复字段检查：");

for (const key of targetKeys) {
  const hits = hitsByKey.get(key) || [];

  if (hits.length > 0) {
    console.log(`${key} 出现次数：${hits.length}`);
    hits.forEach((index) => {
      console.log(`  line ${index + 1}: ${lines[index].trim()}`);
    });
  }

  if (hits.length > 1) {
    /*
      保留最后一个，删除前面重复项。
    */
    hits.slice(0, -1).forEach((index) => removeIndexes.add(index));
  }
}

if (removeIndexes.size === 0) {
  console.log("没有发现需要删除的重复顶层字段。");
  process.exit(0);
}

const nextLines = lines.filter((_, index) => !removeIndexes.has(index));

fs.writeFileSync(file, nextLines.join("\n"), "utf8");

console.log("");
console.log("已删除重复字段行数：" + removeIndexes.size);
console.log("已保留每个重复字段最后一次出现的值。");