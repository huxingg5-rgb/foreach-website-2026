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
const backupFile = `${file}.backup-spec-label-right-100-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  将规格表左侧字段名整体向右移动 100px：
  原来 padding-left 48px
  现在改为 148px
*/
content = content.replace(
  /padding:\s*14px\s+32px\s+14px\s+48px\s*!important;/g,
  "padding: 14px 32px 14px 148px !important;"
);

/*
  如果已经被改过，继续统一成 148px，避免重复叠加。
*/
content = content.replace(
  /padding:\s*14px\s+32px\s+14px\s+\d+px\s*!important;/g,
  "padding: 14px 32px 14px 148px !important;"
);

fs.writeFileSync(file, content, "utf8");

console.log("已将规格表左侧字段名向右移动 100px。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
