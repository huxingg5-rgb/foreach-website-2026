const fs = require("fs");
const path = require("path");

const root = process.cwd();
const detailDir = path.join(root, "components", "products", "detail");

const cssFiles = fs
  .readdirSync(detailDir)
  .filter((name) => name.endsWith(".css") || name.endsWith(".module.css"))
  .map((name) => path.join(detailDir, name));

const targetFile = cssFiles.find((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("FOREACH product detail tab final clean START");
});

if (!targetFile) {
  console.error("没有找到最终 Tab 样式块。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-spacing-fine-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  微调 Tab 文字与下方横线距离：
  从偏松改为适中
*/
content = content
  .replace(/padding-bottom:\s*14px\s*!important;/g, "padding-bottom: 10px !important;")
  .replace(/margin-bottom:\s*18px\s*!important;/g, "margin-bottom: 12px !important;")
  .replace(/bottom:\s*-14px\s*!important;/g, "bottom: -10px !important;");

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将详情页 Tab 间距微调为适中。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);
