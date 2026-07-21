const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const targetPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "bulkhead-barbed-fitting-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-selection-card-schema-fix.md"
);

function text(value) {
  return String(value ?? "").trim();
}

function extractProductsArray(source) {
  const marker =
    "export const bulkheadBarbedFittingSelectionProducts =";

  const markerIndex =
    source.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error(
      "没有找到 bulkheadBarbedFittingSelectionProducts 导出。"
    );
  }

  const arrayStart =
    source.indexOf(
      "[",
      markerIndex + marker.length
    );

  if (arrayStart < 0) {
    throw new Error(
      "没有找到选型产品数组开始位置。"
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = arrayStart;
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
          start: arrayStart,
          end: index + 1,
          source:
            source.slice(
              arrayStart,
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

function slugifyModel(model) {
  return text(model)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function publicFileFromUrl(url) {
  const normalized =
    text(url);

  if (
    !normalized.startsWith("/")
  ) {
    return "";
  }

  return path.join(
    root,
    "public",
    normalized.replace(/^\/+/, "")
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

if (
  !fs.existsSync(
    targetPath
  )
) {
  throw new Error(
    "未找到穿板倒刺接头选型数据：" +
      targetPath
  );
}

const originalSource =
  fs.readFileSync(
    targetPath,
    "utf8"
  );

const range =
  extractProductsArray(
    originalSource
  );

const products =
  JSON.parse(
    range.source
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

let addedImageCard = 0;
let addedStatus = 0;
let addedDetailSlug = 0;
let addedSourceType = 0;
let addedSourceIndex = 0;

const updatedProducts =
  products.map(
    (product, index) => {
      const model =
        text(
          product.model ||
          product.displayModel
        );

      const detailSlug =
        text(
          product.detailSlug
        ) ||
        text(
          product.detailHref
        )
          .split("/")
          .filter(Boolean)
          .pop() ||
        slugifyModel(model);

      const imageCard =
        text(
          product.imageCard
        ) ||
        text(
          product.imagePath
        ) ||
        text(
          product.imageUrl
        ) ||
        text(
          product.image
        );

      if (!imageCard) {
        throw new Error(
          `产品缺少图片路径：${model}`
        );
      }

      if (!product.imageCard) {
        addedImageCard += 1;
      }

      if (!product.status) {
        addedStatus += 1;
      }

      if (!product.detailSlug) {
        addedDetailSlug += 1;
      }

      if (!product.sourceType) {
        addedSourceType += 1;
      }

      if (
        product.sourceIndex == null
      ) {
        addedSourceIndex += 1;
      }

      return {
        ...product,

        imageCard,

        detailSlug,

        status:
          product.status ||
          "active",

        sourceType:
          product.sourceType ||
          "bulkhead-barbed-selection",

        sourceIndex:
          product.sourceIndex ??
          index,
      };
    }
  );

const imageCardCount =
  updatedProducts.filter(
    (product) =>
      text(product.imageCard)
  ).length;

const realImageCount =
  updatedProducts.filter(
    (product) => {
      const filePath =
        publicFileFromUrl(
          product.imageCard
        );

      return (
        Boolean(filePath) &&
        fs.existsSync(filePath) &&
        !text(product.imageCard).includes(
          "/images/logo/"
        )
      );
    }
  ).length;

const missingImageFiles =
  updatedProducts.filter(
    (product) => {
      const filePath =
        publicFileFromUrl(
          product.imageCard
        );

      return (
        !filePath ||
        !fs.existsSync(filePath)
      );
    }
  );

if (
  imageCardCount !== 11
) {
  throw new Error(
    `imageCard数量异常：${imageCardCount}/11`
  );
}

if (
  missingImageFiles.length
) {
  throw new Error(
    "以下imageCard文件不存在：" +
      missingImageFiles
        .map(
          (product) =>
            `${product.model}:${product.imageCard}`
        )
        .join("、")
  );
}

const updatedArraySource =
  JSON.stringify(
    updatedProducts,
    null,
    2
  );

const updatedSource =
  originalSource.slice(
    0,
    range.start
  ) +
  updatedArraySource +
  originalSource.slice(
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
  `${targetPath}.bak_card_schema_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  updatedSource,
  "utf8"
);

const report = [
  "# 穿板倒刺接头选型卡片字段修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 修复结果",
  "",
  `- 产品总数：${updatedProducts.length}`,
  `- 新增 imageCard：${addedImageCard}`,
  `- 新增 detailSlug：${addedDetailSlug}`,
  `- 新增 status：${addedStatus}`,
  `- 新增 sourceType：${addedSourceType}`,
  `- 新增 sourceIndex：${addedSourceIndex}`,
  `- 可显示真实图片：${realImageCount}`,
  `- Logo占位图：${updatedProducts.length - realImageCount}`,
  `- 缺失图片文件：${missingImageFiles.length}`,
  "",
  "## 说明",
  "",
  "- 公共选型卡片使用 imageCard 作为卡片图片字段。",
  "- 同时补齐 detailSlug、status、sourceType、sourceIndex，使数据结构与现有正常选型数据一致。",
  "- 未修改详情数据。",
  "- 未修改公共组件与CSS。",
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
  "穿板倒刺接头选型卡片字段修复完成"
);
console.log(
  "============================================"
);
console.log(
  "产品总数：",
  updatedProducts.length
);
console.log(
  "新增imageCard：",
  addedImageCard
);
console.log(
  "真实产品图：",
  realImageCount
);
console.log(
  "占位图：",
  updatedProducts.length -
    realImageCount
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
