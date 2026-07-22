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
const backupFile = `${file}.backup-force-spec-grid-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH force spec table grid column START ===== */";
const endMarker = "/* ===== FOREACH force spec table grid column END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制规格表两列布局：
  - 不再依赖 table th width
  - 每一行固定为 360px + 自适应
  - 右侧参数值自然往右
*/

.specPanelClean .specTable {
  width: 100% !important;
  table-layout: auto !important;
  border-collapse: collapse !important;
}

.specPanelClean .specTable tbody {
  display: block !important;
  width: 100% !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"] {
  display: grid !important;
  grid-template-columns: 360px minmax(0, 1fr) !important;
  width: 100% !important;
  align-items: stretch !important;
  border-bottom: 1px solid #dbe3ee !important;
}

.specPanelClean .specTable th,
.specPanelClean .specTable td {
  display: flex !important;
  align-items: center !important;
  width: auto !important;
  height: 52px !important;
  padding-top: 14px !important;
  padding-bottom: 14px !important;
  border: 0 !important;
  background: #ffffff !important;
  color: #0b2f5b !important;
  text-align: left !important;
  vertical-align: middle !important;
}

.specPanelClean .specTable th {
  padding-left: 48px !important;
  padding-right: 24px !important;
  font-weight: 600 !important;
  justify-content: flex-start !important;
}

.specPanelClean .specTable td {
  padding-left: 32px !important;
  padding-right: 24px !important;
  font-weight: 400 !important;
  justify-content: flex-start !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"]:hover th,
.specPanelClean .specTable tr[data-product-spec-row="true"]:hover td {
  background-color: rgba(0, 214, 170, 0.055) !important;
}

@media (max-width: 768px) {
  .specPanelClean .specTable tr[data-product-spec-row="true"] {
    grid-template-columns: minmax(108px, 36%) minmax(0, 1fr) !important;
  }

  .specPanelClean .specTable th,
  .specPanelClean .specTable td {
    min-height: 42px !important;
    height: auto !important;
    padding: 9px 10px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已强制改为规格表 grid 两列布局，右侧参数值会明显右移。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
