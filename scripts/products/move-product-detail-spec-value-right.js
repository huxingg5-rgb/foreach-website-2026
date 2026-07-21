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
  return content.includes("FOREACH product detail spec table text indent START");
});

if (!targetFile) {
  console.error("没有找到规格表文字缩进样式块。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-spec-value-move-right-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  只让右侧参数值再往右一点：
  th 保持不动
  td 从 48px 调到 84px
*/
content = content.replace(
  /\.specTable td \{\s*padding-left: 48px !important;\s*\}/g,
  `.specTable td {
  padding-left: 84px !important;
}`
);

fs.writeFileSync(targetFile, content, "utf8");

console.log("已将规格表右侧内容整体右移。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);
