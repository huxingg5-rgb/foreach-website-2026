const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "app",
  "products",
  "products.css"
);

if (!fs.existsSync(file)) {
  console.error("找不到产品中心 CSS 文件：", file);
  process.exit(1);
}

const time = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = `${file}.backup-enlarge-product-cards-${time}`;
fs.copyFileSync(file, backupFile);

let content = fs.readFileSync(file, "utf8");

const startMarker = "/* ===== FOREACH product center enlarge cards START ===== */";
const endMarker = "/* ===== FOREACH product center enlarge cards END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  "g"
);

content = content.replace(markerPattern, "").trimEnd();

const block = `
${startMarker}

/*
  产品中心卡片放大：
  - 不再修改左侧筛选栏宽度
  - 只放大右侧产品卡片、产品图、标题、描述和按钮
  - 电脑端仍保持一排 3 张
*/

.product-card-grid,
.selection-card-grid,
.products-grid {
  grid-template-columns: repeat(3, minmax(340px, 1fr)) !important;
  gap: 32px !important;
}

.product-selection-card,
.product-card {
  min-height: 420px !important;
  padding: 24px !important;
}

.product-selection-card img,
.product-card img {
  max-height: 210px !important;
  object-fit: contain !important;
}

.product-card-image,
.product-image,
.card-image,
.product-selection-card__image {
  min-height: 220px !important;
}

.product-title,
.product-card-title,
.product-selection-card-title {
  font-size: 22px !important;
  line-height: 1.25 !important;
}

.product-param-line,
.product-card-subtitle,
.product-selection-card-subtitle {
  font-size: 15px !important;
  line-height: 1.6 !important;
}

.product-selection-card button,
.product-card button {
  min-height: 44px !important;
  font-size: 15px !important;
}

@media (max-width: 1200px) {
  .product-card-grid,
  .selection-card-grid,
  .products-grid {
    grid-template-columns: repeat(2, minmax(300px, 1fr)) !important;
  }
}

@media (max-width: 768px) {
  .product-card-grid,
  .selection-card-grid,
  .products-grid {
    grid-template-columns: 1fr !important;
  }

  .product-selection-card,
  .product-card {
    min-height: auto !important;
  }
}

${endMarker}
`;

content = `${content}\n\n${block}\n`;

fs.writeFileSync(file, content, "utf8");

console.log("已放大产品中心右侧产品卡片，筛选栏保持不变。");
console.log("修改文件：", file);
console.log("备份文件：", backupFile);
