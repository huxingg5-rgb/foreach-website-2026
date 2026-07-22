const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const routePath = path.join(
  root,
  "app",
  "products",
  "[category]",
  "[slug]",
  "[seriesSlug]",
  "page.tsx"
);

const luerJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "luer-fittings",
  "detail",
  "index.json"
);

const femaleJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "female-thread-adapters",
  "detail",
  "index.json"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function countOccurrences(
  source,
  value
) {
  return source
    .split(value)
    .length - 1;
}

function findFunctionRange(
  source,
  functionName
) {
  const pattern =
    new RegExp(
      `(?:export\\s+)?(?:async\\s+)?function\\s+${functionName}\\s*\\(`
    );

  const match =
    source.match(pattern);

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `没有找到函数：${functionName}`
    );
  }

  const start =
    match.index;

  const parameterStart =
    source.indexOf(
      "(",
      start
    );

  let parameterDepth = 0;
  let parameterEnd = -1;

  let quote = "";
  let escaped = false;

  for (
    let index = parameterStart;
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

    if (char === "(") {
      parameterDepth += 1;
      continue;
    }

    if (char === ")") {
      parameterDepth -= 1;

      if (parameterDepth === 0) {
        parameterEnd =
          index;
        break;
      }
    }
  }

  if (parameterEnd < 0) {
    throw new Error(
      `${functionName} 参数未正常结束。`
    );
  }

  const bodyStart =
    source.indexOf(
      "{",
      parameterEnd
    );

  if (bodyStart < 0) {
    throw new Error(
      `${functionName} 没有找到函数体。`
    );
  }

  let bodyDepth = 0;

  quote = "";
  escaped = false;

  let lineComment = false;
  let blockComment = false;

  for (
    let index = bodyStart;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    const next =
      source[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }

      continue;
    }

    if (blockComment) {
      if (
        char === "*" &&
        next === "/"
      ) {
        blockComment = false;
        index += 1;
      }

      continue;
    }

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
      char === "/" &&
      next === "/"
    ) {
      lineComment = true;
      index += 1;
      continue;
    }

    if (
      char === "/" &&
      next === "*"
    ) {
      blockComment = true;
      index += 1;
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

    if (char === "{") {
      bodyDepth += 1;
      continue;
    }

    if (char === "}") {
      bodyDepth -= 1;

      if (bodyDepth === 0) {
        return {
          start,
          end:
            index + 1,
        };
      }
    }
  }

  throw new Error(
    `${functionName} 函数体未正常结束。`
  );
}

function validateTsx(
  filePath,
  source
) {
  const result =
    ts.transpileModule(
      source,
      {
        fileName:
          filePath,

        reportDiagnostics:
          true,

        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          moduleResolution:
            ts.ModuleResolutionKind.Bundler,

          jsx:
            ts.JsxEmit.ReactJSX,

          resolveJsonModule:
            true,

          esModuleInterop:
            true,

          allowSyntheticDefaultImports:
            true,
        },
      }
    );

  const errors =
    (result.diagnostics || [])
      .filter(
        (diagnostic) =>
          diagnostic.category ===
          ts.DiagnosticCategory.Error
      );

  if (!errors.length) {
    return;
  }

  throw new Error(
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

/* =========================================================
   1. 检查详情数据
   ========================================================= */

const luerDetails =
  JSON.parse(
    read(luerJsonPath)
  );

const femaleDetails =
  JSON.parse(
    read(femaleJsonPath)
  );

if (luerDetails.length !== 151) {
  throw new Error(
    `鲁尔接头详情数量错误：${luerDetails.length}/151`
  );
}

if (femaleDetails.length !== 24) {
  throw new Error(
    `内螺纹互转详情数量错误：${femaleDetails.length}/24`
  );
}

if (
  luerDetails.some(
    (detail) =>
      !String(
        detail.slug || ""
      ).trim()
  )
) {
  throw new Error(
    "鲁尔接头详情存在空 slug。"
  );
}

if (
  femaleDetails.some(
    (detail) =>
      !String(
        detail.slug || ""
      ).trim()
  )
) {
  throw new Error(
    "内螺纹互转详情存在空 slug。"
  );
}

/* =========================================================
   2. 读取并备份路由文件
   ========================================================= */

let source =
  read(routePath);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${routePath}.bak_luer_female_route_v2_${stamp}`;

fs.copyFileSync(
  routePath,
  backupPath
);

/* =========================================================
   3. 加入JSON导入
   ========================================================= */

const threadImport =
  'import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";';

const luerImport =
  'import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";';

const femaleImport =
  'import femaleThreadDetailsJson from "@/data/products/generated/fittings/female-thread-adapters/detail/index.json";';

if (!source.includes(threadImport)) {
  throw new Error(
    "没有找到螺纹转倒刺详情导入锚点。"
  );
}

if (!source.includes(luerImport)) {
  source = source.replace(
    threadImport,
    `${threadImport}

${luerImport}

${femaleImport}`
  );
}

if (
  source.includes(luerImport) &&
  !source.includes(femaleImport)
) {
  source = source.replace(
    luerImport,
    `${luerImport}

${femaleImport}`
  );
}

/* =========================================================
   4. 加入详情集合
   ========================================================= */

const threadCollectionPattern =
  /const\s+threadToBarbedDetails\s*=\s*threadToBarbedDetailsJson\s+as\s+FittingDetailRecord\[\]\s*;/;

const threadCollectionMatch =
  source.match(
    threadCollectionPattern
  );

if (
  !threadCollectionMatch ||
  threadCollectionMatch.index == null
) {
  throw new Error(
    "没有找到 threadToBarbedDetails 集合。"
  );
}

if (
  !source.includes(
    "const luerDetails ="
  )
) {
  const insertIndex =
    threadCollectionMatch.index +
    threadCollectionMatch[0].length;

  const collectionCode = `

/* LUER_FEMALE_DETAIL_COLLECTIONS_START */

const luerDetails =
  luerDetailsJson as FittingDetailRecord[];

const femaleThreadDetails =
  femaleThreadDetailsJson as FittingDetailRecord[];

/* LUER_FEMALE_DETAIL_COLLECTIONS_END */`;

  source =
    source.slice(
      0,
      insertIndex
    ) +
    collectionCode +
    source.slice(
      insertIndex
    );
}

/* =========================================================
   5. 接入 findFittingDetail
   ========================================================= */

if (
  !source.includes(
    "LUER_FEMALE_DETAIL_RESOLVE_START"
  )
) {
  const functionRange =
    findFunctionRange(
      source,
      "findFittingDetail"
    );

  const functionSource =
    source.slice(
      functionRange.start,
      functionRange.end
    );

  const finalReturnIndex =
    functionSource.lastIndexOf(
      "return null;"
    );

  if (finalReturnIndex < 0) {
    throw new Error(
      "findFittingDetail 中没有找到最终 return null。"
    );
  }

  const absoluteIndex =
    functionRange.start +
    finalReturnIndex;

  const resolveCode = `/* LUER_FEMALE_DETAIL_RESOLVE_START */

  if (
    category ===
      "fittings" &&
    slug ===
      "luer-fittings"
  ) {
    const detail =
      findDetailInCollection(
        luerDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "luer-fittings",
          fallbackName:
            "鲁尔接头",
        }
      : null;
  }

  if (
    category ===
      "fittings" &&
    slug ===
      "female-thread-adapters"
  ) {
    const detail =
      findDetailInCollection(
        femaleThreadDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "female-thread-adapters",
          fallbackName:
            "内螺纹互转接头",
        }
      : null;
  }

  /* LUER_FEMALE_DETAIL_RESOLVE_END */

  `;

  source =
    source.slice(
      0,
      absoluteIndex
    ) +
    resolveCode +
    source.slice(
      absoluteIndex
    );
}

/* =========================================================
   6. 完整重写 generateStaticParams

   保留现有：
   - 产品系列参数
   - 硬管接头147
   - 螺纹转倒刺101

   新增：
   - 鲁尔接头151
   - 内螺纹互转24
   ========================================================= */

const staticRange =
  findFunctionRange(
    source,
    "generateStaticParams"
  );

const newStaticFunction = `export function generateStaticParams() {
  const existingSeriesParams =
    getSeriesRouteParams();

  const hardTubeParams =
    hardTubeDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "hard-tube-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const threadToBarbedParams =
    threadToBarbedDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "thread-to-barbed-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const luerParams =
    luerDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "luer-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const femaleThreadParams =
    femaleThreadDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "female-thread-adapters",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const routeMap =
    new Map<
      string,
      {
        category: string;
        slug: string;
        seriesSlug: string;
      }
    >();

  [
    ...existingSeriesParams,
    ...hardTubeParams,
    ...threadToBarbedParams,
    ...luerParams,
    ...femaleThreadParams,
  ]
    .filter(
      (item) =>
        Boolean(
          item &&
          item.category &&
          item.slug &&
          item.seriesSlug
        )
    )
    .forEach((item) => {
      const key = [
        item.category,
        item.slug,
        item.seriesSlug,
      ].join("/");

      routeMap.set(
        key,
        item
      );
    });

  return Array.from(
    routeMap.values()
  );
}`;

source =
  source.slice(
    0,
    staticRange.start
  ) +
  newStaticFunction +
  source.slice(
    staticRange.end
  );

/* =========================================================
   7. 验证
   ========================================================= */

try {
  validateTsx(
    routePath,
    source
  );
} catch (error) {
  fs.copyFileSync(
    backupPath,
    routePath
  );

  throw new Error(
    "TSX语法检查失败，已恢复备份：\n" +
      error.message
  );
}

const checks = {
  luerImport:
    countOccurrences(
      source,
      luerImport
    ) === 1,

  femaleImport:
    countOccurrences(
      source,
      femaleImport
    ) === 1,

  luerCollection:
    countOccurrences(
      source,
      "const luerDetails ="
    ) === 1,

  femaleCollection:
    countOccurrences(
      source,
      "const femaleThreadDetails ="
    ) === 1,

  luerResolve:
    source.includes(
      'slug ===\n      "luer-fittings"'
    ),

  femaleResolve:
    source.includes(
      'slug ===\n      "female-thread-adapters"'
    ),

  luerParams:
    countOccurrences(
      source,
      "const luerParams ="
    ) === 1,

  femaleParams:
    countOccurrences(
      source,
      "const femaleThreadParams ="
    ) === 1,

  spreadLuer:
    source.includes(
      "...luerParams"
    ),

  spreadFemale:
    source.includes(
      "...femaleThreadParams"
    ),
};

const failedChecks =
  Object.entries(checks)
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

if (failedChecks.length) {
  fs.copyFileSync(
    backupPath,
    routePath
  );

  throw new Error(
    "路由接入验证失败，已恢复备份：" +
      failedChecks.join("、")
  );
}

fs.writeFileSync(
  routePath,
  source,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "两类接头详情路由接入成功"
);
console.log(
  "============================================"
);
console.log(
  "鲁尔接头静态详情：151"
);
console.log(
  "内螺纹互转静态详情：24"
);
console.log(
  "generateStaticParams：已重写"
);
console.log(
  "空参数过滤：已加入"
);
console.log(
  "findFittingDetail：已接入"
);
console.log(
  "TSX语法检查：通过"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
