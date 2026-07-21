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
  console.error("没有找到详情页 Tab 样式文件。");
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${targetFile}.backup-tab-reset-clean-${time}`;
fs.copyFileSync(targetFile, backupFile);

let content = fs.readFileSync(targetFile, "utf8");

/*
  清理之前多次追加的 Tab override，避免样式互相打架。
*/
const markerPairs = [
  [
    "/* ===== FOREACH product detail tab active override START ===== */",
    "/* ===== FOREACH product detail tab active override END ===== */",
  ],
  [
    "/* ===== FOREACH force product detail tab size START ===== */",
    "/* ===== FOREACH force product detail tab size END ===== */",
  ],
  [
    "/* ===== FOREACH product detail tab spacing START ===== */",
    "/* ===== FOREACH product detail tab spacing END ===== */",
  ],
];

for (const [startMarker, endMarker] of markerPairs) {
  const pattern = new RegExp(
    `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    "g"
  );
  content = content.replace(pattern, "");
}

const startMarker = "/* ===== FOREACH product detail tab final clean START ===== */";
const endMarker = "/* ===== FOREACH product detail tab final clean END ===== */";

const finalPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(finalPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品详情页资料 Tab 最终样式：
  - 居中
  - 字号接近“型号：EA-100-PMMA”
  - 文字与下方横线拉开距离
  - 不使用背景色
*/

.tabNav {
  justify-content: center !important;
  gap: 76px !important;
  border-bottom: 1px solid #dbe3ee !important;
  padding-bottom: 14px !important;
  margin-bottom: 18px !important;
}

.tabNav .tabButton {
  position: relative !important;
  min-width: auto !important;
  padding: 0 6px !important;
  border: 0 !important;
  background: transparent !important;
  color: #0b2f5b !important;
  font-size: 24px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  cursor: pointer !important;
}

.tabNav .tabButton:hover {
  color: #00b894 !important;
  background: transparent !important;
}

.tabNav .tabButton.isActive {
  color: #00cfa5 !important;
  font-weight: 600 !important;
  background: transparent !important;
}

.tabNav .tabButton::after {
  content: "" !important;
  position: absolute !important;
  left: 50% !important;
  right: auto !important;
  bottom: -14px !important;
  width: 0 !important;
  height: 0 !important;
  transform: translateX(-50%) !important;
  background: transparent !important;
  border-radius: 999px !important;
}

.tabNav .tabButton.isActive::after {
  width: 46px !important;
  height: 3px !important;
  background: #00d6aa !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(targetFile, content, "utf8");

console.log("已重置详情页 Tab 样式：文字与下方横线已拉开距离。");
console.log("修改文件：", targetFile);
console.log("备份文件：", backupFile);
