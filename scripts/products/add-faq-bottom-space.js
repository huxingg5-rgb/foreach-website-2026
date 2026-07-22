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
const backupFile = `${file}.backup-faq-bottom-space-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product detail FAQ bottom space START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ bottom space END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  FAQ 与页脚之间的底部留白：
  - 避免 FAQ 卡片直接贴到 footer 灰色区域
  - 只影响产品详情页 FAQ 下方
*/

.faqSection {
  margin-bottom: 56px !important;
}

@media (max-width: 768px) {
  .faqSection {
    margin-bottom: 36px !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已增加 FAQ 与页脚之间的底部留白。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
