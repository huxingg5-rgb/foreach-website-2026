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
const backupFile = `${file}.backup-spec-column-plus-250-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  将规格表右侧参数值整体向右移动 250px：
  当前左列 420px → 670px
*/
content = content.replace(
  /grid-template-columns:\s*420px\s+minmax\(0,\s*1fr\)\s*!important;/g,
  "grid-template-columns: 670px minmax(0, 1fr) !important;"
);

content = content.replace(
  /grid-template-columns:\s*460px\s+minmax\(0,\s*1fr\)\s*!important;/g,
  "grid-template-columns: 670px minmax(0, 1fr) !important;"
);

fs.writeFileSync(file, content, "utf8");

console.log("已将规格表右侧参数值整体向右移动 250px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
