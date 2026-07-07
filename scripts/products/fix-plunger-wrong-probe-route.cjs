const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_plunger_wrong_probe_route_${stamp}`);

let text = fs.readFileSync(file, "utf8");

/*
  1. 删除针系列分支里错误的 categoryId === "pumps"
  这个错误会导致柱塞泵 EA-100-PMMA 被当成 probes 处理。
*/
text = text.replace(/\s*\|\|\s*\(product as any\)\?\.categoryId === "pumps"/g, "");

/*
  2. 在 makeDetailHref 顶部增加柱塞泵强制优先分支。
  只要识别到 EA / SM / TM 柱塞泵，就直接返回 /products/pumps/plunger-pumps/[slug]
  避免后面的针系列、阀系列分支误判。
*/
const marker = "PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707";

if (!text.includes(marker)) {
  text = text.replace(
    /function makeDetailHref\(product: ProductSelectionProduct\)\s*\{\s*/,
    `function makeDetailHref(product: ProductSelectionProduct) {
  /*
    ${marker}

    柱塞泵详情链接优先处理。
    防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        ""
    ).trim();

    if (rawHref.includes("/products/pumps/plunger-pumps/")) {
      return rawHref;
    }

    const rawSlug = String(
      (product as any).detailSlug ||
        (product as any).slug ||
        (product as any).productId ||
        ""
    )
      .split("/")
      .filter(Boolean)
      .pop()
      ?.toLowerCase();

    if (rawSlug && /^(ea|sm|tm)-\\d+-(pmma|peek)$/.test(rawSlug)) {
      return \`/products/pumps/plunger-pumps/\${rawSlug}\`;
    }

    const textForModel = [
      (product as any).productId,
      (product as any).detailSlug,
      (product as any).slug,
      (product as any).cardTitle?.zh,
      (product as any).cardTitle?.en,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const modelMatch = textForModel.match(/\\b(ea|sm|tm)[-_\\s]*(\\d{2,5})[-_\\s]*(pmma|peek)\\b/i);

    if (modelMatch) {
      return \`/products/pumps/plunger-pumps/\${modelMatch[1].toLowerCase()}-\${modelMatch[2]}-\${modelMatch[3].toLowerCase()}\`;
    }
  }

`
  );
}

fs.writeFileSync(file, text, "utf8");

console.log("已修复：柱塞泵不再错误跳转到 /products/probes/[slug]");
console.log("已删除针系列判断中的 categoryId === pumps。");
console.log("已增加柱塞泵详情链接优先分支。");