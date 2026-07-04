const fs = require("fs");
const path = require("path");

/* =========================================================
   fix-pump-series-selection-card-assets.js
   恒永达官网｜柱塞泵产品中心卡片图路径修复脚本

   说明：
   1. xlsx 生成的卡片图路径目前是：
      /images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
   2. 但 public 目录真实存在的图片是：
      /images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp
   3. 本脚本会在 build:pump-series-data 后自动修复 generated 文件
   4. 不补假图片，不改 xlsx，只修正生成文件里的路径
   5. 同时把缺失的 product-placeholder.webp fallback 改为真实存在的 SVG fallback
========================================================= */

const root = process.cwd();

const selectionFile = path.join(
  root,
  "data/products/generated/pumps/pump-series.selection.generated.ts"
);

const detailFile = path.join(
  root,
  "data/products/generated/pumps/pump-series.detail.generated.ts"
);

const placeholderDir = path.join(root, "public/images/products/common");
const placeholderSvgPath = path.join(placeholderDir, "product-placeholder.svg");
const placeholderSvgWebPath = "/images/products/common/product-placeholder.svg";

/**
 * 判断 public 目录下的网页路径是否真实存在。
 */
function publicPathExists(webPath) {
  const localPath = path.join(root, "public", webPath.replace(/^\//, ""));
  return fs.existsSync(localPath);
}

/**
 * 确保公共 placeholder 图片存在。
 * 说明：
 * - 使用 SVG 是因为体积小、清晰、适合作为 fallback
 * - 如果后续设计了正式占位图，可以替换这个文件
 */
function ensurePlaceholderSvg() {
  if (!fs.existsSync(placeholderDir)) {
    fs.mkdirSync(placeholderDir, { recursive: true });
  }

  if (fs.existsSync(placeholderSvgPath)) {
    return;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="FOREACH product placeholder">
  <rect width="800" height="600" fill="#F5F7FA"/>
  <rect x="120" y="120" width="560" height="360" rx="24" fill="#FFFFFF" stroke="#D9E2EC" stroke-width="2"/>
  <circle cx="400" cy="260" r="54" fill="#E8F7FB"/>
  <path d="M286 394h228c14 0 22-16 14-28l-62-88c-8-12-25-12-33 0l-45 64-26-34c-8-11-25-10-32 2l-58 86c-8 12 1 28 14 28z" fill="#CDEAF4"/>
  <text x="400" y="512" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#173368">FOREACH Product Image</text>
</svg>`;

  fs.writeFileSync(placeholderSvgPath, svg, "utf8");
}

/**
 * 把不存在的卡片图路径转为已有真实产品图路径。
 *
 * 例：
 * /images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
 * ->
 * /images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp
 */
function fixSelectionCardImages() {
  if (!fs.existsSync(selectionFile)) {
    throw new Error(`未找到文件：${selectionFile}`);
  }

  let content = fs.readFileSync(selectionFile, "utf8");
  let changedCount = 0;
  const missingTargets = [];

  content = content.replace(
    /\/images\/products\/pumps\/plunger-pump\/(ea|sm)\/(?:ea|sm)-(\d+)-(pmma|peek)-card\.webp/gi,
    (match, series, capacity, material) => {
      const normalizedSeries = String(series).toLowerCase();
      const normalizedMaterial = String(material).toLowerCase();
      const nextPath = `/images/products/pumps/plunger-pump/${normalizedSeries}/pump-${normalizedSeries}-${capacity}ul-${normalizedMaterial}.webp`;

      if (!publicPathExists(nextPath)) {
        missingTargets.push(`${match} -> ${nextPath}`);
        return match;
      }

      changedCount += 1;
      return nextPath;
    }
  );

  fs.writeFileSync(selectionFile, content, "utf8");

  console.log(`已修复产品中心卡片图路径：${changedCount} 处`);

  if (missingTargets.length > 0) {
    console.log("");
    console.log("以下卡片图目标路径仍不存在，请后续补真实产品图：");
    missingTargets.forEach((item) => console.log(`- ${item}`));
  }
}

/**
 * 修复详情页 fallback 图片路径。
 * 说明：
 * - 原来指向 product-placeholder.webp，但该文件不存在
 * - 改为本脚本生成的 product-placeholder.svg
 */
function fixDetailFallbackImage() {
  if (!fs.existsSync(detailFile)) {
    throw new Error(`未找到文件：${detailFile}`);
  }

  ensurePlaceholderSvg();

  let content = fs.readFileSync(detailFile, "utf8");
  const before = content;

  content = content.replaceAll(
    "/images/products/common/product-placeholder.webp",
    placeholderSvgWebPath
  );

  fs.writeFileSync(detailFile, content, "utf8");

  if (content !== before) {
    console.log("已修复详情页 fallback 图片路径：product-placeholder.webp -> product-placeholder.svg");
  } else {
    console.log("详情页 fallback 图片路径无需修复");
  }
}

fixSelectionCardImages();
fixDetailFallbackImage();
