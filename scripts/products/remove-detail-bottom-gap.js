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
const backupFile = `${file}.backup-remove-bottom-gap-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

/*
  去掉产品详情页规格表到页脚之间的白色空白。
*/
content = content
  .replace(/padding-bottom:\s*24px\s*!important;/g, "padding-bottom: 0 !important;")
  .replace(/padding-bottom:\s*32px\s*!important;/g, "padding-bottom: 0 !important;")
  .replace(/padding-bottom:\s*12px\s*!important;/g, "padding-bottom: 0 !important;");

const startMarker = "/* ===== FOREACH remove detail bottom gap START ===== */";
const endMarker = "/* ===== FOREACH remove detail bottom gap END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  最终压缩产品详情页底部空白：
  规格表结束后直接进入页脚区域。
*/

.page {
  padding-bottom: 0 !important;
}

.detailSection {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.panelWrap {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.specPanelClean {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已去掉产品详情页规格表下方白色空白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
