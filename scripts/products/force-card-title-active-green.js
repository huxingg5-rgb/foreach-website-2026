const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-force-card-title-active-green-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH force product card title green START ===== */";
const endMarker = "/* ===== FOREACH force product card title green END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  强制产品卡片型号在 hover / 选中状态下变为品牌绿色。
  放在 CSS 最后，覆盖前面 final stable 里把标题改回深蓝色的规则。
*/

.products-selection-page .product-card:hover .product-title,
.products-selection-page .product-card:focus-within .product-title,
.products-selection-page .product-card:has(.list-toggle.active) .product-title,
.products-selection-page .product-card:has(.list-toggle[aria-pressed="true"]) .product-title,
.products-selection-page .product-card:has(.list-toggle[data-active="true"]) .product-title,
.products-selection-page .product-card:has(.list-toggle.is-active) .product-title,
.products-selection-page .product-card.active .product-title,
.products-selection-page .product-card.selected .product-title,
.products-selection-page .product-card.is-selected .product-title,
.products-selection-page .product-card[data-selected="true"] .product-title {
  color: var(--brand-cyan, #09e9b4) !important;
}

${endMarker}
`;

content = `${content.trimEnd()}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已强制设置产品卡片 hover / 选中时型号变为品牌绿色。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
