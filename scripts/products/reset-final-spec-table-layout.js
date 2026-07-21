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
const backupFile = `${file}.backup-final-spec-layout-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
  清理之前多次追加的规格表 override，避免 padding / width / grid 互相打架。
*/
const markerPairs = [
  [
    "/* ===== FOREACH product detail spec table readable override START ===== */",
    "/* ===== FOREACH product detail spec table readable override END ===== */",
  ],
  [
    "/* ===== FOREACH product detail spec table text indent START ===== */",
    "/* ===== FOREACH product detail spec table text indent END ===== */",
  ],
  [
    "/* ===== FOREACH force spec value column right START ===== */",
    "/* ===== FOREACH force spec value column right END ===== */",
  ],
  [
    "/* ===== FOREACH force spec table grid column START ===== */",
    "/* ===== FOREACH force spec table grid column END ===== */",
  ],
  [
    "/* ===== FOREACH final spec table layout START ===== */",
    "/* ===== FOREACH final spec table layout END ===== */",
  ],
];

for (const [start, end] of markerPairs) {
  const pattern = new RegExp(
    `${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`,
    "g"
  );
  content = content.replace(pattern, "");
}

const finalBlock = `
/* ===== FOREACH final spec table layout START ===== */

/*
  产品详情页规格表最终样式：
  - 表格宽度保持当前页面宽度
  - 左列字段名固定 420px，让右侧参数值自然靠右
  - 只保留横向分割线
  - 鼠标经过行有浅色高亮
  - 不使用外框和竖线
*/

.specPanelClean {
  padding: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  background: #ffffff !important;
}

.specPanelClean .specTable {
  display: block !important;
  width: 100% !important;
  border: 0 !important;
  border-collapse: collapse !important;
  table-layout: auto !important;
  background: #ffffff !important;
}

.specPanelClean .specTable tbody {
  display: block !important;
  width: 100% !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"] {
  display: grid !important;
  grid-template-columns: 420px minmax(0, 1fr) !important;
  width: 100% !important;
  min-height: 56px !important;
  border-bottom: 1px solid #dbe3ee !important;
  transition: background-color 0.18s ease !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"]:first-child {
  border-top: 1px solid #dbe3ee !important;
}

.specPanelClean .specTable th,
.specPanelClean .specTable td {
  display: flex !important;
  align-items: center !important;
  width: auto !important;
  min-width: 0 !important;
  height: auto !important;
  margin: 0 !important;
  border: 0 !important;
  background: #ffffff !important;
  color: #0b2f5b !important;
  line-height: 1.45 !important;
  text-align: left !important;
  vertical-align: middle !important;
  box-sizing: border-box !important;
  cursor: default !important;
}

.specPanelClean .specTable th {
  padding: 14px 32px 14px 48px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  justify-content: flex-start !important;
  white-space: nowrap !important;
}

.specPanelClean .specTable td {
  padding: 14px 32px 14px 32px !important;
  font-size: 17px !important;
  font-weight: 400 !important;
  justify-content: flex-start !important;
  white-space: normal !important;
}

.specPanelClean .specTable tr[data-product-spec-row="true"]:hover th,
.specPanelClean .specTable tr[data-product-spec-row="true"]:hover td {
  background-color: rgba(0, 214, 170, 0.055) !important;
}

@media (max-width: 768px) {
  .specPanelClean .specTable tr[data-product-spec-row="true"] {
    grid-template-columns: minmax(108px, 36%) minmax(0, 1fr) !important;
    min-height: 42px !important;
  }

  .specPanelClean .specTable th,
  .specPanelClean .specTable td {
    padding: 9px 10px !important;
    font-size: 14px !important;
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: anywhere !important;
  }
}

/* ===== FOREACH final spec table layout END ===== */
`;

content = `${content.trimEnd()}\n\n${finalBlock}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已重置规格表最终样式。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
