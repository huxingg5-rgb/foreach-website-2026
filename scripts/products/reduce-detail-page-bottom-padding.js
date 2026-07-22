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
const backupFile = `${file}.backup-reduce-page-bottom-padding-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH reduce detail page bottom padding START ===== */";
const endMarker = "/* ===== FOREACH reduce detail page bottom padding END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  减少产品详情页规格表结束后到页脚之间的空白。
  原 .page 底部 padding 为 72px，这里压缩为 24px。
*/

.page {
  padding-bottom: 24px !important;
}

.detailSection {
  margin-bottom: 0 !important;
}

.panelWrap {
  margin-bottom: 0 !important;
}

/* 规格面板不额外保留底部高度 */
.specPanelClean {
  min-height: 0 !important;
  margin-bottom: 0 !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已减少产品详情页底部空白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
