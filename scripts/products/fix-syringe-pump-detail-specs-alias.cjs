const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const full = p(rel);
  if (!fs.existsSync(full)) return;
  const bak = full + suffix;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(full, bak);
    console.log("已备份:", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("已修改:", rel);
}

/**
 * 1. 给详情 JSON 补 specs 字段
 * ProductDetailClient 当前读取 data.specs，不读取 data.specifications
 */
const jsonRel = "data/products/generated/pumps/syringe-pumps/detail/index.json";

if (!fs.existsSync(p(jsonRel))) {
  console.error("未找到:", jsonRel);
  process.exit(1);
}

backup(jsonRel, ".bak.fix-specs");

const details = JSON.parse(fs.readFileSync(p(jsonRel), "utf8"));

for (const item of details) {
  if (!Array.isArray(item.specs)) {
    item.specs = Array.isArray(item.specifications) ? item.specifications : [];
  }

  if (!Array.isArray(item.specifications)) {
    item.specifications = Array.isArray(item.specs) ? item.specs : [];
  }
}

write(jsonRel, JSON.stringify(details, null, 2));

/**
 * 2. 给详情路由 toClientData 增加 specs 兼容
 */
const pageRel = "app/products/pumps/syringe-pumps/[slug]/page.tsx";

if (!fs.existsSync(p(pageRel))) {
  console.error("未找到:", pageRel);
  process.exit(1);
}

let page = fs.readFileSync(p(pageRel), "utf8");

if (!page.includes("specs: Array.isArray((detail as any).specs)")) {
  backup(pageRel, ".bak.fix-specs");

  page = page.replace(
    `additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],`,
    `specs: Array.isArray((detail as any).specs)
      ? (detail as any).specs
      : Array.isArray((detail as any).specifications)
        ? (detail as any).specifications
        : [],

    specifications: Array.isArray((detail as any).specifications)
      ? (detail as any).specifications
      : Array.isArray((detail as any).specs)
        ? (detail as any).specs
        : [],

    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],`
  );

  write(pageRel, page);
} else {
  console.log("详情路由已包含 specs 兼容，跳过:", pageRel);
}

console.log("");
console.log("已修复 data.specs 缺失问题。");
console.log("下一步：停止 dev 后重新 npm run dev，再刷新详情页。");