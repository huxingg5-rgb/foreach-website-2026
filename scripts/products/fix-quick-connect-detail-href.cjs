const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "Missing ProductSelectionClient.tsx"
  );
}

const marker =
  "QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712";

let source =
  fs.readFileSync(
    targetPath,
    "utf8"
  );

if (source.includes(marker)) {
  console.log(
    "Quick-connect detail href patch already exists."
  );

  process.exit(0);
}

const functionPattern =
  /function makeDetailHref\(product: ProductSelectionProduct\) \{\r?\n/;

if (!functionPattern.test(source)) {
  throw new Error(
    "Cannot locate makeDetailHref function."
  );
}

const patchBlock = `function makeDetailHref(product: ProductSelectionProduct) {
  /*
    QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712

    快插接头卡片优先使用生成数据中的真实详情链接：
    /products/fittings/quick-connect-fittings/q20#商品编码

    避免后续通用逻辑把链接改回产品类型筛选页。
  */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawSourceType =
      String(
        (product as any)?.sourceType ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.href ||
        ""
      ).trim();

    const rawProductText =
      JSON.stringify(
        product || {}
      );

    const isQuickConnect =
      rawProductTypeId ===
        "quick-connect-fittings" ||
      rawSourceType ===
        "quick-connect-selection" ||
      rawExistingHref.includes(
        "/products/fittings/quick-connect-fittings/"
      ) ||
      rawProductText.includes(
        "快插接头"
      );

    if (isQuickConnect) {
      if (
        /^\\/products\\/fittings\\/quick-connect-fittings\\/(q20|q40|q60)(?:#.*)?$/i.test(
          rawExistingHref
        )
      ) {
        return rawExistingHref;
      }

      const seriesMatch =
        rawProductText.match(
          /\\bQ(?:20|40|60)\\b/i
        );

      const productCode =
        String(
          (product as any)?.productCode ||
          (product as any)?.productId ||
          ""
        ).trim();

      if (seriesMatch) {
        const seriesSlug =
          seriesMatch[0]
            .toLowerCase();

        return (
          "/products/fittings/quick-connect-fittings/" +
          seriesSlug +
          (
            productCode
              ? "#" +
                encodeURIComponent(
                  productCode
                )
              : ""
          )
        );
      }

      return rawExistingHref ||
        "/products/fittings/quick-connect-fittings";
    }
  }
`;

source =
  source.replace(
    functionPattern,
    patchBlock
  );

const stamp =
  new Date()
    .toISOString()
    .replace(
      /[-:T.Z]/g,
      ""
    )
    .slice(
      0,
      14
    );

fs.copyFileSync(
  targetPath,
  targetPath +
    ".bak_quick_connect_href_" +
    stamp
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

const verify =
  fs.readFileSync(
    targetPath,
    "utf8"
  );

if (!verify.includes(marker)) {
  throw new Error(
    "Patch verification failed."
  );
}

console.log("");
console.log(
  "Quick-connect detail href fixed."
);

console.log(
  "Existing q20/q40/q60 href and product-code anchor will be preserved."
);