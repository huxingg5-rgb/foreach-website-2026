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
  return content.includes("specTable");
});

if (!targetFile) {
  console.error("没有找到规格表 CSS 文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-force-spec-value-right-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH force spec value column right START ===== */";
const endMarker = "/* ===== FOREACH force spec value column right END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制调整规格表右侧参数值位置：
  - 左侧参数名保持不动
  - 右侧参数值整体往右
  - 放在 CSS 最后，避免被前面的 padding 覆盖
*/

.specPanelClean .specTable td {
  padding-left: 140px !important;
  text-align: left !important;
}

@media (max-width: 768px) {
  .specPanelClean .specTable td {
    padding-left: 16px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已强制将规格表右侧参数值往右移动。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);
