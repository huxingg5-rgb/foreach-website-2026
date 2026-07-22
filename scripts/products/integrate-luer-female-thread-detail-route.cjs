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

const luerDetailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "luer-fittings",
  "detail",
  "index.json"
);

const femaleDetailPath = path.join(
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
        parameterEnd = index;
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
          bodyStart,
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

          jsx:
            ts.JsxEmit.ReactJSX,

          resolveJsonModule:
            true,

          esModuleInterop:
            true,
        },
      }
    );

  const errors =
    (result.diagnostics || [])
      .filter(
        (item) =>
          item.category ===
          ts.DiagnosticCategory.Error
      );

  if (!errors.length) {
    return;
  }

  throw new Error(
    errors
      .map((item) =>
        ts.flattenDiagnosticMessageText(
          item.messageText,
          "\n"
        )
      )
      .join("\n")
  );
}

/* =========================================================
   1. 基础验证
   ========================================================= */

const luerDetails =
  JSON.parse(
    read(luerDetailPath)
  );

const femaleDetails =
  JSON.parse(
    read(femaleDetailPath)
  );

if (luerDetails.length !== 151) {
  throw new Error(
    `鲁尔详情数量错误：${luerDetails.length}/151`
  );
}

if (femaleDetails.length !== 24) {
  throw new Error(
    `内螺纹互转详情数量错误：${femaleDetails.length}/24`
  );
}

let source =
  read(routePath);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${routePath}.bak_luer_female_route_${stamp}`;

fs.copyFileSync(
  routePath,
  backupPath
);

/* =========================================================
   2. 增加 JSON 导入
   ========================================================= */

const threadImport =
  'import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";';

const luerImport =
  'import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";';

const femaleImport =
  'import femaleThreadDetailsJson from "@/data/products/generated/fittings/female-thread-adapters/detail/index.json";';

if (!source.includes(luerImport)) {
  if (!source.includes(threadImport)) {
    throw new Error(
      "没有找到螺纹转倒刺详情导入锚点。"
    );
  }

  source = source.replace(
    threadImport,
    `${threadImport}

${luerImport}

${femaleImport}`
  );
}

/* =========================================================
   3. 增加详情集合
   ========================================================= */

const collectionMarker =
  "LUER_FEMALE_DETAIL_COLLECTIONS_START";

if (!source.includes(collectionMarker)) {
  const collectionAnchor =
    /const\s+threadToBarbedDetails\s*=\s*[\s\S]*?threadToBarbedDetailsJson\s+as\s+FittingDetailRecord\[\]\s*;/;

  const match =
    source.match(
      collectionAnchor
    );

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      "没有找到 threadToBarbedDetails 集合。"
    );
  }

  const insertIndex =
    match.index +
    match[0].length;

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
   4. 接入 resolveFittingDetail
   ========================================================= */

const resolveMarker =
  "LUER_FEMALE_DETAIL_RESOLVE_START";

if (!source.includes(resolveMarker)) {
  const range =
    findFunctionRange(
      source,
      "resolveFittingDetail"
    );

  const functionSource =
    source.slice(
      range.start,
      range.end
    );

  const returnIndex =
    functionSource.lastIndexOf(
      "return null;"
    );

  if (returnIndex < 0) {
    throw new Error(
      "resolveFittingDetail 中未找到最终 return null。"
    );
  }

  const insertIndex =
    range.start +
    returnIndex;

  const resolveCode = `/* LUER_FEMALE_DETAIL_RESOLVE_START */

  if (
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
      insertIndex
    ) +
    resolveCode +
    source.slice(
      insertIndex
    );
}

/* =========================================================
   5. 接入 generateStaticParams
   ========================================================= */

const staticMarker =
  "LUER_FEMALE_DETAIL_STATIC_PARAMS_START";

if (!source.includes(staticMarker)) {
  const range =
    findFunctionRange(
      source,
      "generateStaticParams"
    );

  let functionSource =
    source.slice(
      range.start,
      range.end
    );

  const returnIndex =
    functionSource.lastIndexOf(
      "return ["
    );

  if (returnIndex < 0) {
    throw new Error(
      "generateStaticParams 中未找到 return [。"
    );
  }

  const declarations = `  /* LUER_FEMALE_DETAIL_STATIC_PARAMS_START */

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

  /* LUER_FEMALE_DETAIL_STATIC_PARAMS_END */

`;

  functionSource =
    functionSource.slice(
      0,
      returnIndex
    ) +
    declarations +
    functionSource.slice(
      returnIndex
    );

  functionSource =
    functionSource.replace(
      "return [",
      `return [
    ...luerParams,
    ...femaleThreadParams,`
    );

  source =
    source.slice(
      0,
      range.start
    ) +
    functionSource +
    source.slice(
      range.end
    );
}

/* =========================================================
   6. 验证并写入
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

const requiredChecks = [
  source.includes(luerImport),
  source.includes(femaleImport),

  source.includes(
    "const luerDetails ="
  ),

  source.includes(
    "const femaleThreadDetails ="
  ),

  source.includes(
    '"luer-fittings"'
  ),

  source.includes(
    '"female-thread-adapters"'
  ),

  source.includes(
    "...luerParams"
  ),

  source.includes(
    "...femaleThreadParams"
  ),
];

if (
  requiredChecks.some(
    (value) =>
      !value
  )
) {
  fs.copyFileSync(
    backupPath,
    routePath
  );

  throw new Error(
    "路由接入验证失败，已恢复备份。"
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
  "两类接头详情路由接入完成"
);
console.log(
  "============================================"
);
console.log(
  "鲁尔接头静态页面：151"
);
console.log(
  "内螺纹互转静态页面：24"
);
console.log(
  "详情组件：继续复用 ProductDetailClient"
);
console.log(
  "TSX语法检查：通过"
);
console.log(
  "筛选卡片跳转：本次未修改"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
