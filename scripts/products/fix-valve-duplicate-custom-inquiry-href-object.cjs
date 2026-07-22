const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_remove_duplicate_customInquiryHref_object_${stamp}`);

const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

const key = "customInquiryHref";
const hits = [];

lines.forEach((line, index) => {
  if (new RegExp(`^ {4}${key}\\s*:`).test(line)) {
    hits.push(index);
  }
});

console.log(`${key} 出现次数：${hits.length}`);
hits.forEach((index) => {
  console.log(`line ${index + 1}: ${lines[index].trim()}`);
});

if (hits.length <= 1) {
  console.log("没有发现重复 customInquiryHref，不需要修改。");
  process.exit(0);
}

/*
  保留最后一个 customInquiryHref。
  删除前面重复项。
  支持单行：
    customInquiryHref: detail.xxx || "/contact",
  也支持多行：
    customInquiryHref:
      detail.xxx || "/contact",
*/
const keepIndex = hits[hits.length - 1];
const removeRanges = [];

for (const start of hits.slice(0, -1)) {
  let end = start;

  // 如果当前行没有逗号，说明可能是多行属性，继续删除到逗号行为止
  while (end < lines.length - 1 && !lines[end].includes(",")) {
    end++;
  }

  removeRanges.push([start, end]);
}

const removeIndexes = new Set();

for (const [start, end] of removeRanges) {
  for (let i = start; i <= end; i++) {
    removeIndexes.add(i);
  }
}

const nextLines = lines.filter((_, index) => !removeIndexes.has(index));

fs.writeFileSync(file, nextLines.join("\n"), "utf8");

console.log("");
console.log("已删除前面重复的 customInquiryHref。");
console.log("保留最后一个：");
console.log(`line ${keepIndex + 1}: ${lines[keepIndex].trim()}`);
console.log("删除行数：" + removeIndexes.size);