const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_tubing_make_detail_href_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const marker = "TUBING_SELECTION_DETAIL_HREF_PATCH_20260707";

if (text.includes(marker)) {
  console.log("管路详情链接补丁已存在，不重复添加。");
} else {
  const patch = `function makeDetailHref(product: ProductSelectionProduct) {
  /*
    ${marker}

    管路系列详情链接分支。
    只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
    其它产品仍走原来的针、阀、泵逻辑。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        (product as any).url ||
        (product as any).path ||
        ""
    ).trim();

    if (rawHref.includes("/products/tubing/")) {
      return rawHref;
    }

    const rawText = JSON.stringify(product || {}).toLowerCase();

    const isTubingProduct =
      rawText.includes("tubing") ||
      rawText.includes("管路") ||
      rawText.includes("pvc 管") ||
      rawText.includes("tpu 管") ||
      rawText.includes("fep 管") ||
      rawText.includes("ptfe 管") ||
      rawText.includes("peek 管") ||
      rawText.includes("pfa 管") ||
      rawText.includes("pvc-tubing") ||
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");

    if (isTubingProduct) {
      const rawSlug = String(
        (product as any).detailSlug ||
          (product as any).routeSlug ||
          (product as any).slug ||
          (product as any).seriesSlug ||
          (product as any).productId ||
          ""
      )
        .split("/")
        .filter(Boolean)
        .pop()
        ?.toLowerCase();

      if (
        rawSlug === "pvc-tubing" ||
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {
        return \`/products/tubing/\${rawSlug}\`;
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";
    }
  }

`;

  if (!text.includes("function makeDetailHref(product: ProductSelectionProduct) {")) {
    console.error("没有找到 makeDetailHref 函数，请把 ProductSelectionClient.tsx 发我。");
    process.exit(1);
  }

  text = text.replace(
    "function makeDetailHref(product: ProductSelectionProduct) {",
    patch
  );

  fs.writeFileSync(file, text, "utf8");
  console.log("已加入管路筛选页详情链接分支。");
}

console.log("");
console.log("请测试：");
console.log("/products -> 管路系列 -> PVC 管 / TPU 管 / FEP 管 / PTFE 管 / PEEK 管 / PFA 管 -> 查看详情");