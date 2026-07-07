const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionCard.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionCard.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_final_card_href_guard_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const marker = "FINAL_CARD_HREF_GUARD_20260707";

if (!text.includes(marker)) {
  const helper = `
/*
  ${marker}

  卡片最终 href 出口保护：
  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
*/
function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {
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

  return rawHref || "/products";
}

`;

  text = text.replace(
    "export default function ProductSelectionCard({",
    helper + "\nexport default function ProductSelectionCard({"
  );
}

if (!text.includes("const safeDetailHref = normalizeCardDetailHref(product, detailHref);")) {
  text = text.replace(
    "const safeSubtitle = toDisplayText(subtitle);",
    `const safeSubtitle = toDisplayText(subtitle);
  const safeDetailHref = normalizeCardDetailHref(product, detailHref);`
  );
}

text = text.replace(
  /<a className="product-link" href=\{detailHref\}/g,
  '<a className="product-link" href={safeDetailHref}'
);

fs.writeFileSync(file, text, "utf8");

console.log("已在 ProductSelectionCard 最终 href 出口增加保护。");
console.log("EA / SM / TM 柱塞泵最终不会再输出 /products/probes/[slug]。");