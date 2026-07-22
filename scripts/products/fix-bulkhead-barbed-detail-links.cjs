const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "bulkhead-barbed-fitting-selection.generated.ts"
);

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "bulkhead-barbed-fittings",
  "detail",
  "index.json"
);

const routePath = path.join(
  root,
  "app",
  "products",
  "fittings",
  "bulkhead-barbed-fittings",
  "[slug]",
  "page.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-detail-link-fix.md"
);

const detailBase =
  "/products/fittings/bulkhead-barbed-fittings";

function text(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return text(value).toLowerCase();
}

function extractProductsArray(source) {
  const marker =
    "export const bulkheadBarbedFittingSelectionProducts =";

  const markerIndex =
    source.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error(
      "没有找到 bulkheadBarbedFittingSelectionProducts。"
    );
  }

  const start =
    source.indexOf(
      "[",
      markerIndex + marker.length
    );

  if (start < 0) {
    throw new Error(
      "没有找到选型产品数组开始位置。"
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = start;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = "";
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end: index + 1,
          json:
            source.slice(
              start,
              index + 1
            ),
        };
      }
    }
  }

  throw new Error(
    "选型产品数组没有正常结束。"
  );
}

function assertTsSyntax(
  fileName,
  source
) {
  const result =
    ts.transpileModule(
      source,
      {
        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          jsx:
            ts.JsxEmit.Preserve,
        },

        reportDiagnostics:
          true,

        fileName,
      }
    );

  const errors =
    (
      result.diagnostics ||
      []
    ).filter(
      (diagnostic) =>
        diagnostic.category ===
        ts.DiagnosticCategory.Error
    );

  if (errors.length) {
    throw new Error(
      `${fileName}语法检查失败：\n` +
        errors
          .map(
            (diagnostic) =>
              ts.flattenDiagnosticMessageText(
                diagnostic.messageText,
                "\n"
              )
          )
          .join("\n")
    );
  }
}

for (
  const filePath
  of [
    selectionPath,
    detailPath,
    routePath,
  ]
) {
  if (
    !fs.existsSync(
      filePath
    )
  ) {
    throw new Error(
      `缺少文件：${filePath}`
    );
  }
}

const selectionSource =
  fs.readFileSync(
    selectionPath,
    "utf8"
  );

const range =
  extractProductsArray(
    selectionSource
  );

const products =
  JSON.parse(
    range.json
  );

const details =
  JSON.parse(
    fs.readFileSync(
      detailPath,
      "utf8"
    )
  );

if (
  !Array.isArray(products) ||
  products.length !== 11
) {
  throw new Error(
    `选型产品数量异常：${
      Array.isArray(products)
        ? products.length
        : "非数组"
    }/11`
  );
}

if (
  !Array.isArray(details) ||
  details.length !== 11
) {
  throw new Error(
    `详情数据数量异常：${
      Array.isArray(details)
        ? details.length
        : "非数组"
    }/11`
  );
}

const detailByModel =
  new Map(
    details.map(
      (detail) => [
        normalize(
          detail.model
        ),
        detail,
      ]
    )
  );

const detailByProductCode =
  new Map(
    details.map(
      (detail) => [
        text(
          detail.productCode
        ),
        detail,
      ]
    )
  );

let changed = 0;

const updatedProducts =
  products.map(
    (product) => {
      const model =
        text(
          product.model ||
          product.displayModel
        );

      const productCode =
        text(
          product.productCode ||
          product.productId
        );

      const detail =
        detailByModel.get(
          normalize(model)
        ) ||
        detailByProductCode.get(
          productCode
        );

      if (!detail) {
        throw new Error(
          `没有找到对应详情数据：${model}｜${productCode}`
        );
      }

      const slug =
        text(
          detail.slug
        );

      if (!slug) {
        throw new Error(
          `详情数据缺少slug：${model}`
        );
      }

      const href =
        `${detailBase}/${slug}`;

      const next = {
        ...product,

        detailSlug:
          slug,

        detailHref:
          href,

        href,

        productHref:
          href,

        detailUrl:
          href,

        selectionHref:
          detailBase,
      };

      if (
        text(
          product.detailHref
        ) !== href ||
        text(
          product.href
        ) !== href ||
        text(
          product.detailSlug
        ) !== slug
      ) {
        changed += 1;
      }

      return next;
    }
  );

const invalidLinks =
  updatedProducts.filter(
    (product) => {
      const detail =
        detailByModel.get(
          normalize(
            product.model
          )
        );

      if (!detail) {
        return true;
      }

      const expected =
        `${detailBase}/${detail.slug}`;

      return (
        product.detailHref !==
          expected ||
        product.href !==
          expected ||
        product.detailSlug !==
          detail.slug
      );
    }
  );

if (
  invalidLinks.length
) {
  throw new Error(
    "仍有详情链接异常：" +
      invalidLinks
        .map(
          (product) =>
            product.model
        )
        .join("、")
  );
}

const updatedArray =
  JSON.stringify(
    updatedProducts,
    null,
    2
  );

const updatedSource =
  selectionSource.slice(
    0,
    range.start
  ) +
  updatedArray +
  selectionSource.slice(
    range.end
  );

assertTsSyntax(
  "bulkhead-barbed-fitting-selection.generated.ts",
  updatedSource
);

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${selectionPath}.bak_detail_links_${stamp}`;

fs.copyFileSync(
  selectionPath,
  backupPath
);

fs.writeFileSync(
  selectionPath,
  updatedSource,
  "utf8"
);

const report = [
  "# 穿板倒刺接头详情链接修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  `- 选型产品：${updatedProducts.length}`,
  `- 详情数据：${details.length}`,
  `- 更新链接记录：${changed}`,
  `- 异常链接：${invalidLinks.length}`,
  "",
  "## 已统一字段",
  "",
  "- detailSlug",
  "- detailHref",
  "- href",
  "- productHref",
  "- detailUrl",
  "- selectionHref",
  "",
  "## 链接",
  "",
  ...updatedProducts.map(
    (product) =>
      `- ${product.model} → ${product.detailHref}`
  ),
  "",
  `- 备份：${backupPath}`,
  "",
];

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "穿板倒刺接头详情链接修复完成"
);
console.log(
  "============================================"
);
console.log(
  "选型产品：",
  updatedProducts.length
);
console.log(
  "详情数据：",
  details.length
);
console.log(
  "更新记录：",
  changed
);
console.log(
  "异常链接：",
  invalidLinks.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
