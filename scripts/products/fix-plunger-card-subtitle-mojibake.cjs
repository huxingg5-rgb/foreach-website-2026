const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_plunger_card_subtitle_mojibake_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const marker = "PLUNGER_CARD_SUBTITLE_MOJIBAKE_FIX_20260707";

if (!text.includes(marker)) {
  const helper = `
/*
  ${marker}

  柱塞泵选型卡片副标题乱码修复。
  只影响柱塞泵 EA / SM / TM 卡片。
  管路、阀、针、隔膜泵、移液泵等其它产品保持原 cardSubtitle。
*/
function getSafeSelectionCardSubtitle(
  product: ProductSelectionProduct,
  locale: SelectionLocale
): string {
  const originalSubtitle = getText(locale, product.cardSubtitle, "");

  const productId = String((product as any).productId || "").toLowerCase();
  const productTypeId = String((product as any).productTypeId || "").toLowerCase();
  const detailHref = String((product as any).detailHref || (product as any).href || "").toLowerCase();
  const detailSlug = String((product as any).detailSlug || (product as any).slug || "").toLowerCase();

  const isPlungerPump =
    productTypeId === "plunger-pump" ||
    productTypeId === "plunger-pumps" ||
    detailHref.includes("/products/pumps/plunger-pumps/") ||
    detailSlug.includes("plunger-pumps") ||
    /^(ea|sm|tm)-\\d+-(pmma|peek)$/i.test(productId);

  if (!isPlungerPump) {
    return originalSubtitle;
  }

  const titleText = getText(locale, product.cardTitle, productId);
  const modelText = String(titleText || productId).toUpperCase();

  const material =
    modelText.includes("PEEK") || productId.includes("-peek")
      ? "PEEK"
      : modelText.includes("PMMA") || productId.includes("-pmma")
        ? "PMMA"
        : "PMMA / PEEK";

  const capacityMatch = productId.match(/^(?:ea|sm|tm)-(\\d+)/i);
  const capacity = capacityMatch ? `${Number(capacityMatch[1])} µL` : "";

  if (locale === "zh") {
    return [
      "1/4-28 UNF / M6 接口可选",
      capacity ? `${capacity} / ${material} 泵头` : `${material} 泵头`,
      "100% 满量程重复精度＜0.5%"
    ].join("\\n");
  }

  return [
    "1/4-28 UNF / M6 thread options",
    capacity ? `${capacity} / ${material} pump head` : `${material} pump head`,
    "Repeatability <0.5% at full stroke"
  ].join("\\n");
}

`;

  const insertBefore = "function makeDetailHref(product: ProductSelectionProduct)";
  if (!text.includes(insertBefore)) {
    console.error("没有找到 makeDetailHref 位置，无法插入修复函数。");
    process.exit(1);
  }

  text = text.replace(insertBefore, helper + "\n" + insertBefore);
}

const oldBlockRegex = /getSubtitle=\{\(product\)\s*=>\s*getText\(locale,\s*product\.cardSubtitle,\s*""\)\s*\}/m;

if (oldBlockRegex.test(text)) {
  text = text.replace(
    oldBlockRegex,
    'getSubtitle={(product) => getSafeSelectionCardSubtitle(product, locale)}'
  );
  console.log("已把卡片副标题读取方式改为安全函数。");
} else if (text.includes("getSafeSelectionCardSubtitle(product, locale)")) {
  console.log("卡片副标题读取方式已经修复，跳过。");
} else {
  console.error("没有找到 getSubtitle 原始代码，请再发 ProductSelectionClient 相关片段。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("完成：柱塞泵卡片副标题乱码修复。");
console.log("只影响 EA / SM / TM 柱塞泵卡片。");