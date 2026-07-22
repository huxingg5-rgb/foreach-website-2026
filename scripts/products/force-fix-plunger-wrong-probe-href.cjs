const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_force_fix_plunger_probe_href_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const marker = "FORCE_FIX_PLUNGER_WRONG_PROBE_HREF_20260707";

if (!text.includes(marker)) {
  const helper = `
/*
  ${marker}

  最终详情链接出口保护：
  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
*/
function normalizeFinalProductDetailHref(
  product: ProductSelectionProduct,
  href: string
): string {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  const rawSlug = String(
    (product as any).detailSlug ||
      (product as any).slug ||
      (product as any).productId ||
      hrefSlug ||
      ""
  )
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  if (rawSlug && /^(ea|sm|tm)-\\d+-(pmma|peek)$/.test(rawSlug)) {
    return \`/products/pumps/plunger-pumps/\${rawSlug}\`;
  }

  if (
    rawHref.includes("/products/probes/") &&
    hrefSlug &&
    /^(ea|sm|tm)-\\d+-(pmma|peek)$/.test(hrefSlug)
  ) {
    return \`/products/pumps/plunger-pumps/\${hrefSlug}\`;
  }

  return rawHref;
}

`;

  const anchor = "function makeDetailHref(product: ProductSelectionProduct)";
  if (text.includes(anchor)) {
    text = text.replace(anchor, helper + "\n" + anchor);
  } else {
    console.error("没有找到 makeDetailHref，无法插入链接保护函数。");
    process.exit(1);
  }
}

/*
  把传给 ProductCardGrid 的 getDetailHref 包一层最终纠正。
*/
const old1 = "getDetailHref={makeDetailHref}";
const new1 = "getDetailHref={(product) => normalizeFinalProductDetailHref(product, makeDetailHref(product))}";

if (text.includes(old1)) {
  text = text.replace(old1, new1);
  console.log("已替换 ProductCardGrid 的 getDetailHref 出口。");
} else if (text.includes("normalizeFinalProductDetailHref(product, makeDetailHref(product))")) {
  console.log("ProductCardGrid 的 getDetailHref 已经是安全出口。");
} else {
  console.error("没有找到 getDetailHref={makeDetailHref}，需要继续查 ProductCardGrid 调用位置。");
  process.exit(1);
}

/*
  顺手删除针系列分支中错误的 categoryId === pumps 条件。
*/
text = text.replace(/\s*\|\|\s*\(product as any\)\?\.categoryId === "pumps"/g, "");

fs.writeFileSync(file, text, "utf8");

console.log("已完成最终链接出口修复。");
console.log("EA / SM / TM 柱塞泵不会再跳到 /products/probes/[slug]。");