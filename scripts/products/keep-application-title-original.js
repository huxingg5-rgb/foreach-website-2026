const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-keep-application-title-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  保留产品简介文字放大；
  恢复“常见应用：”四个字原来的样式。
*/

// 删除我们之前追加的 applicationTitle 覆盖
content = content.replace(
  /\.applicationTitle\s*\{[\s\S]*?\}\r?\n\r?\n/g,
  ""
);

// 手机端也不要覆盖 applicationTitle，只保留 applicationText
content = content.replace(
  /\.applicationTitle,\s*\r?\n\s*\.applicationText\s*\{/g,
  ".applicationText {"
);

fs.writeFileSync(file, content, "utf8");

console.log("已恢复“常见应用：”标题原样，只保留简介文字优化。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
