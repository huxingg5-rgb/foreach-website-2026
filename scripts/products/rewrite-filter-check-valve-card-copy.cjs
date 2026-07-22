const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const targetPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-card-copy-report.md"
);

function text(value) {
  return String(value ?? "").trim();
}

function findArrayRange(source, exportName) {
  const declaration = new RegExp(
    `export\\s+const\\s+${exportName}\\s*=`
  );

  const match = source.match(declaration);

  if (!match || match.index == null) {
    throw new Error(
      `没有找到导出数组：${exportName}`
    );
  }

  const start = source.indexOf(
    "[",
    match.index + match[0].length
  );

  if (start < 0) {
    throw new Error(
      `没有找到数组起点：${exportName}`
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
    const char = source[index];

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
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end: index + 1,
        };
      }
    }
  }

  throw new Error(
    `数组没有正常结束：${exportName}`
  );
}

function readArray(source, exportName) {
  const range = findArrayRange(
    source,
    exportName
  );

  return JSON.parse(
    source.slice(
      range.start,
      range.end
    )
  );
}

function replaceArray(
  source,
  exportName,
  value
) {
  const range = findArrayRange(
    source,
    exportName
  );

  return (
    source.slice(0, range.start) +
    JSON.stringify(value, null, 2) +
    source.slice(range.end)
  );
}

function isThreadConnection(value) {
  const connection = text(value).toUpperCase();

  return (
    connection.includes("NPT") ||
    connection.includes("UNF") ||
    connection.startsWith("M5") ||
    connection.startsWith("M6")
  );
}

function buildConnectionLine(connection) {
  const value = text(connection);

  if (!value) {
    return "";
  }

  if (isThreadConnection(value)) {
    return `适配 ${value} 螺纹接口`;
  }

  return `适配 ${value} 接管内径`;
}

function buildFilterCard(product) {
  const filters = product.filters || {};

  const filterType = text(
    filters.filter02
  );

  const filterMedia = text(
    filters.filter03
  );

  const precision = text(
    filters.filter04
  );

  const connection = text(
    filters.filter07
  );

  const housingMaterial = text(
    filters.filter08
  );

  const slug = text(
    product.detailSlug
  );

  /*
   * 两个组件单独处理，避免把外形尺寸误写成接管尺寸。
   */
  if (
    slug === "filter-component-139009"
  ) {
    return [
      "水循环过滤器组件",
      housingMaterial
        ? `壳体材质为 ${housingMaterial}`
        : "水循环过滤器组件",
      "外形尺寸 86 × 48.8 mm",
    ];
  }

  if (
    slug === "filter-component-139010"
  ) {
    return [
      filterMedia
        ? `${filterMedia} 滤网材质过滤器组件`
        : "水循环过滤器组件",

      [
        precision
          ? `过滤精度 ${precision}`
          : "",

        housingMaterial
          ? `壳体材质为 ${housingMaterial}`
          : "",
      ]
        .filter(Boolean)
        .join("，"),

      connection
        ? buildConnectionLine(connection)
        : "外形尺寸 78 × 46 mm",
    ].filter(Boolean);
  }

  let title = "";

  if (filterMedia) {
    title =
      `${filterMedia} 滤网材质过滤器`;
  } else if (
    filterType === "G系列过滤器"
  ) {
    title = "G 系列过滤器";
  } else {
    title =
      filterType || "过滤器";
  }

  const secondLine = [
    precision
      ? `过滤精度 ${precision}`
      : "",

    housingMaterial
      ? `壳体材质为 ${housingMaterial}`
      : "",
  ]
    .filter(Boolean)
    .join("，");

  return [
    title,
    secondLine,
    buildConnectionLine(connection),
  ].filter(Boolean);
}

function buildCheckValveCard(product) {
  const filters = product.filters || {};

  const sealType = text(
    filters.filter05
  );

  const sealMaterial = text(
    filters.filter06
  );

  const connection = text(
    filters.filter07
  );

  const housingMaterial = text(
    filters.filter08
  );

  const title = sealType
    ? `${sealType}单向阀`
    : "单向阀";

  const materialLabel =
    sealType === "鸭嘴式"
      ? "密封件材质"
      : "膜片材质";

  const secondLine = [
    sealMaterial
      ? `${materialLabel}为 ${sealMaterial}`
      : "",

    housingMaterial
      ? `壳体材质为 ${housingMaterial}`
      : "",
  ]
    .filter(Boolean)
    .join("，");

  return [
    title,
    secondLine,
    buildConnectionLine(connection),
  ].filter(Boolean);
}

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到文件：" + targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const products = readArray(
  source,
  "filterCheckValveSelectionProducts"
);

if (products.length !== 34) {
  throw new Error(
    `卡片数量异常：${products.length}/34`
  );
}

let filterCount = 0;
let checkValveCount = 0;

const updatedProducts = products.map(
  (product) => {
    const productType = text(
      product.filters?.filter01
    );

    const isCheckValve =
      productType === "单向阀" ||
      product.productTypeId ===
        "check-valves";

    const lines = isCheckValve
      ? buildCheckValveCard(product)
      : buildFilterCard(product);

    if (isCheckValve) {
      checkValveCount += 1;
    } else {
      filterCount += 1;
    }

    if (
      lines.length < 2 ||
      lines.length > 3
    ) {
      throw new Error(
        `卡片文案行数异常：${product.productId}，${lines.length}行`
      );
    }

    const zhCopy = lines.join("\n");

    const forbidden = [
      "商品编码",
      "PE&PA过滤器",
      "PP材质",
      "PA材质",
      "PVDF材质",
      "本色",
      "黑色",
      "V色",
    ];

    for (const value of forbidden) {
      if (zhCopy.includes(value)) {
        throw new Error(
          `卡片仍包含不需要的文案“${value}”：${product.productId}`
        );
      }
    }

    return {
      ...product,

      cardSubtitle: {
        ...(product.cardSubtitle || {}),
        zh: zhCopy,
      },
    };
  }
);

if (
  filterCount !== 18 ||
  checkValveCount !== 16
) {
  throw new Error(
    `数量异常：过滤器${filterCount}，单向阀${checkValveCount}`
  );
}

source = replaceArray(
  source,
  "filterCheckValveSelectionProducts",
  updatedProducts
);

/*
 * TypeScript语法检查
 */
const result = ts.transpileModule(
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

    reportDiagnostics: true,

    fileName:
      "filter-check-valve-selection.generated.ts",
  }
);

const errors = (
  result.diagnostics || []
).filter(
  (diagnostic) =>
    diagnostic.category ===
    ts.DiagnosticCategory.Error
);

if (errors.length) {
  throw new Error(
    "修改后语法检查失败：\n" +
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

/*
 * 备份并写入
 */
const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${targetPath}.bak_card_copy_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

/*
 * 输出报告
 */
const examples = updatedProducts
  .slice(0, 8)
  .map(
    (product) =>
      `### ${product.productId}\n\n` +
      "```text\n" +
      product.cardSubtitle.zh +
      "\n```"
  );

const report = [
  "# 过滤器与单向阀卡片文案重写结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 数量",
  "",
  `- 过滤器：${filterCount}`,
  `- 单向阀：${checkValveCount}`,
  `- 总卡片：${updatedProducts.length}`,
  "",
  "## 文案规则",
  "",
  "- 只保留关键结构、功能材质、壳体材质和接口尺寸",
  "- 不显示颜色",
  "- 不显示商品编码",
  "- 不使用笼统的“材质”表述",
  "- 过滤器明确区分滤网材质与壳体材质",
  "- 单向阀明确区分膜片/密封件材质与壳体材质",
  "",
  "## 示例",
  "",
  ...examples,
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
  "过滤器与单向阀卡片文案重写完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器：",
  filterCount
);
console.log(
  "单向阀：",
  checkValveCount
);
console.log(
  "总卡片：",
  updatedProducts.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
