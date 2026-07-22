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
  return content.includes("tabNav") && content.includes("tabButton");
});

if (!targetFile) {
  console.error("没有找到包含 tabNav / tabButton 的详情页 CSS 文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-force-tab-size-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

const startMarker = "/* ===== FOREACH force product detail tab size START ===== */";
const endMarker = "/* ===== FOREACH force product detail tab size END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制放大详情页资料 Tab：
  规格 / 3D模型 / 零件图
*/

.tabNav {
  justify-content: center !important;
  gap: 66px !important;
}

.tabNav .tabButton {
  font-size: 24px !important;
  line-height: 1.2 !important;
  padding-top: 16px !important;
  padding-bottom: 18px !important;
}

.tabNav .tabButton::after {
  left: 50% !important;
  right: auto !important;
  width: 0 !important;
  transform: translateX(-50%) !important;
}

.tabNav .tabButton.isActive::after {
  width: 46px !important;
  height: 3px !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已强制放大详情页 Tab 字号。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);
