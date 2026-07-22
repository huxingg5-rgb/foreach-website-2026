const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/probes/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/probes/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_remove_duplicate_customInquiryHref_${stamp}`);

const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

const hitIndexes = [];
lines.forEach((line, index) => {
  if (/^\s*customInquiryHref\s*:/.test(line)) {
    hitIndexes.push(index);
  }
});

console.log("customInquiryHref 出现次数：" + hitIndexes.length);
hitIndexes.forEach((index) => {
  console.log(`line ${index + 1}: ${lines[index].trim()}`);
});

if (hitIndexes.length <= 1) {
  console.log("没有发现重复 customInquiryHref，不需要修改。");
  process.exit(0);
}

/*
  保留最后一个 customInquiryHref。
  删除前面重复项，避免：
  Type error: An object literal cannot have multiple properties with the same name.
*/
const keepIndex = hitIndexes[hitIndexes.length - 1];
const removeIndexes = new Set(hitIndexes.slice(0, -1));

const nextLines = lines.filter((_, index) => !removeIndexes.has(index));

fs.writeFileSync(file, nextLines.join("\n"), "utf8");

console.log("");
console.log("已删除前面重复的 customInquiryHref，保留最后一个：");
console.log(lines[keepIndex].trim());