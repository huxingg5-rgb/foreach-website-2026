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
const backupFile = `${file}.backup-wider-product-center-container-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product center wider main container START ===== */";
const endMarker = "/* ===== FOREACH product center wider main container END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心主内容区加宽：
  - 解决产品中心整体内容偏窄的问题
  - 不单独修改筛选栏宽度
  - 不强行修改卡片样式
  - 让搜索、分类、筛选和产品卡片整体占比更合理
*/

.products-page,
.products-container,
.product-selection-page,
.selection-container,
.product-selection-shell,
.products-shell,
.products-main,
.selection-main {
  width: min(100% - 96px, 1600px) !important;
  max-width: 1600px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.product-selection-layout,
.selection-layout,
.products-layout {
  width: 100% !important;
}

@media (max-width: 1200px) {
  .products-page,
  .products-container,
  .product-selection-page,
  .selection-container,
  .product-selection-shell,
  .products-shell,
  .products-main,
  .selection-main {
    width: min(100% - 48px, 100%) !important;
    max-width: none !important;
  }
}

@media (max-width: 768px) {
  .products-page,
  .products-container,
  .product-selection-page,
  .selection-container,
  .product-selection-shell,
  .products-shell,
  .products-main,
  .selection-main {
    width: calc(100% - 32px) !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已加宽产品中心主内容容器。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
