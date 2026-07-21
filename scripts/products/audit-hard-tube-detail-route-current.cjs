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

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const hardDetailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "hard-tube-fittings",
  "detail",
  "index.json"
);

const selectionDirectory = path.join(
  root,
  "data",
  "products",
  "selection"
);

const reportPath = path.join(
  root,
  "reports",
  "hard-tube-detail-route-current-audit.md"
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

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function count(source, value) {
  return source
    .split(value)
    .length - 1;
}

function lineNumberAt(
  source,
  index
) {
  return source
    .slice(0, index)
    .split(/\r?\n/)
    .length;
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
    return null;
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
    return null;
  }

  const bodyStart =
    source.indexOf(
      "{",
      parameterEnd
    );

  if (bodyStart < 0) {
    return null;
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

  return null;
}

function contextAround(
  source,
  pattern,
  before = 8,
  after = 16
) {
  const index =
    typeof pattern === "string"
      ? source.indexOf(pattern)
      : source.search(pattern);

  if (index < 0) {
    return "";
  }

  const lines =
    source.split(/\r?\n/);

  const lineNumber =
    lineNumberAt(
      source,
      index
    );

  const start =
    Math.max(
      0,
      lineNumber -
        before -
        1
    );

  const end =
    Math.min(
      lines.length,
      lineNumber +
        after
    );

  return lines
    .slice(
      start,
      end
    )
    .map(
      (line, offset) =>
        `${String(
          start +
            offset +
            1
        ).padStart(5, " ")} | ${line}`
    )
    .join("\n");
}

function addCode(
  report,
  source,
  language = "text"
) {
  report.push(
    `\`\`\`${language}`
  );

  report.push(
    source || "（未找到）"
  );

  report.push(
    "```"
  );

  report.push("");
}

/* =========================================================
   1. 读取详情数据
   ========================================================= */

const hardDetails =
  JSON.parse(
    read(hardDetailPath)
  );

const emptySlugs =
  hardDetails
    .map(
      (item, index) => ({
        index,
        model:
          item.model,
        slug:
          item.slug,
      })
    )
    .filter(
      (item) =>
        !String(
          item.slug || ""
        ).trim()
    );

const slugCounts = {};

for (
  const detail
  of hardDetails
) {
  const slug =
    String(
      detail.slug || ""
    )
      .trim()
      .toLowerCase();

  slugCounts[slug] =
    (slugCounts[slug] || 0) +
    1;
}

const duplicateSlugs =
  Object.entries(
    slugCounts
  )
    .filter(
      ([slug, itemCount]) =>
        slug &&
        itemCount > 1
    );

/* =========================================================
   2. 检查公共动态路由
   ========================================================= */

const routeSource =
  read(routePath);

const routeTranspile =
  ts.transpileModule(
    routeSource,
    {
      fileName:
        routePath,

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
      },
    }
  );

const routeErrors =
  (routeTranspile.diagnostics || [])
    .filter(
      (item) =>
        item.category ===
        ts.DiagnosticCategory.Error
    )
    .map(
      (item) =>
        ts.flattenDiagnosticMessageText(
          item.messageText,
          "\n"
        )
    );

const findRange =
  findFunctionRange(
    routeSource,
    "findFittingDetail"
  );

const staticRange =
  findFunctionRange(
    routeSource,
    "generateStaticParams"
  );

const findSource =
  findRange
    ? routeSource.slice(
        findRange.start,
        findRange.end
      )
    : "";

const staticSource =
  staticRange
    ? routeSource.slice(
        staticRange.start,
        staticRange.end
      )
    : "";

const routeChecks = {
  hardImport:
    routeSource.includes(
      'hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json"'
    ),

  hardCollection:
    routeSource.includes(
      "const hardTubeDetails ="
    ),

  hardResolveBranch:
    findSource.includes(
      "hard-tube-fittings"
    ),

  hardStaticDeclaration:
    staticSource.includes(
      "const hardTubeParams ="
    ),

  hardStaticSpread:
    staticSource.includes(
      "...hardTubeParams"
    ),

  returnRouteMap:
    staticSource.includes(
      "routeMap.values()"
    ),
};

/* =========================================================
   3. 找硬管选型数据文件
   ========================================================= */

const selectionFiles =
  fs.existsSync(
    selectionDirectory
  )
    ? fs
        .readdirSync(
          selectionDirectory
        )
        .filter(
          (name) =>
            /hard.*tube.*selection.*\.ts$/i.test(
              name
            )
        )
        .map(
          (name) =>
            path.join(
              selectionDirectory,
              name
            )
        )
    : [];

const selectionReports =
  selectionFiles.map(
    (filePath) => {
      const source =
        read(filePath);

      return {
        filePath,
        hardTypeCount:
          count(
            source,
            '"productTypeId": "hard-tube-fittings"'
          ),

        detailSlugCount:
          count(
            source,
            '"detailSlug"'
          ),

        detailHrefCount:
          count(
            source,
            '"detailHref"'
          ),

        context:
          contextAround(
            source,
            '"productTypeId": "hard-tube-fittings"',
            5,
            28
          ),
      };
    }
  );

/* =========================================================
   4. 检查筛选页卡片跳转
   ========================================================= */

const clientExists =
  fs.existsSync(
    clientPath
  );

const clientSource =
  clientExists
    ? read(clientPath)
    : "";

const clientContexts = [];

if (clientExists) {
  const searchPatterns = [
    "hard-tube-fittings",
    "makeDetailHref",
    "detailSlug",
    "detailHref",
  ];

  for (
    const pattern
    of searchPatterns
  ) {
    const context =
      contextAround(
        clientSource,
        pattern,
        8,
        22
      );

    if (context) {
      clientContexts.push({
        pattern,
        context,
      });
    }
  }
}

/* =========================================================
   5. 基础判断
   ========================================================= */

const failedRouteChecks =
  Object.entries(
    routeChecks
  )
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

let preliminaryConclusion = "";

if (routeErrors.length) {
  preliminaryConclusion =
    "公共动态路由当前存在TSX语法错误。";
} else if (
  !routeChecks.hardStaticDeclaration ||
  !routeChecks.hardStaticSpread
) {
  preliminaryConclusion =
    "generateStaticParams 已不再完整加入 hardTubeParams，因此硬管详情会404。";
} else if (
  !routeChecks.hardResolveBranch
) {
  preliminaryConclusion =
    "findFittingDetail 已没有硬管接头匹配分支，因此静态路径存在但页面仍会404。";
} else if (
  hardDetails.length !== 147 ||
  emptySlugs.length ||
  duplicateSlugs.length
) {
  preliminaryConclusion =
    "硬管详情数据本身存在数量、空slug或重复slug问题。";
} else {
  preliminaryConclusion =
    "硬管详情数据和公共路由表面完整，下一步重点检查卡片跳转地址或开发缓存。";
}

/* =========================================================
   6. 输出报告
   ========================================================= */

const report = [];

report.push(
  "# 硬管接头详情失效检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有修改任何项目文件。"
);
report.push("");

report.push(
  "## 1. 初步结论"
);
report.push("");

report.push(
  preliminaryConclusion
);
report.push("");

report.push(
  "## 2. 硬管详情数据"
);
report.push("");

report.push(
  `- 文件：\`${relative(hardDetailPath)}\``
);
report.push(
  `- 详情数量：${hardDetails.length}`
);
report.push(
  `- 空slug：${emptySlugs.length}`
);
report.push(
  `- 重复slug：${duplicateSlugs.length}`
);
report.push("");

report.push(
  "### 前5个有效测试地址"
);
report.push("");

for (
  const detail
  of hardDetails.slice(0, 5)
) {
  report.push(
    `- \`/products/fittings/hard-tube-fittings/${detail.slug}\``
  );
}

report.push("");

report.push(
  "## 3. 公共动态路由检查"
);
report.push("");

report.push(
  `- 文件：\`${relative(routePath)}\``
);
report.push(
  `- TSX语法错误：${routeErrors.length}`
);
report.push(
  `- 未通过检查项：${failedRouteChecks.length ? failedRouteChecks.join("、") : "无"}`
);
report.push("");

report.push("```json");
report.push(
  JSON.stringify(
    routeChecks,
    null,
    2
  )
);
report.push("```");
report.push("");

if (routeErrors.length) {
  report.push(
    "### TSX语法错误"
  );
  report.push("");

  addCode(
    report,
    routeErrors.join("\n\n")
  );
}

report.push(
  "## 4. 当前 findFittingDetail"
);
report.push("");

addCode(
  report,
  findSource,
  "tsx"
);

report.push(
  "## 5. 当前 generateStaticParams"
);
report.push("");

addCode(
  report,
  staticSource,
  "tsx"
);

report.push(
  "## 6. 硬管选型数据文件"
);
report.push("");

if (!selectionReports.length) {
  report.push(
    "没有找到名称包含 hard-tube-selection 的选型文件。"
  );
  report.push("");
} else {
  for (
    const item
    of selectionReports
  ) {
    report.push(
      `### ${relative(item.filePath)}`
    );
    report.push("");

    report.push(
      `- 硬管产品记录：${item.hardTypeCount}`
    );
    report.push(
      `- detailSlug字段：${item.detailSlugCount}`
    );
    report.push(
      `- detailHref字段：${item.detailHrefCount}`
    );
    report.push("");

    addCode(
      report,
      item.context,
      "ts"
    );
  }
}

report.push(
  "## 7. ProductSelectionClient跳转逻辑"
);
report.push("");

report.push(
  `- 文件存在：${clientExists}`
);
report.push(
  `- hard-tube-fittings出现次数：${count(clientSource, "hard-tube-fittings")}`
);
report.push("");

for (
  const item
  of clientContexts
) {
  report.push(
    `### ${item.pattern}`
  );
  report.push("");

  addCode(
    report,
    item.context,
    "tsx"
  );
}

report.push(
  "## 8. 数据异常明细"
);
report.push("");

if (
  !emptySlugs.length &&
  !duplicateSlugs.length
) {
  report.push(
    "未发现空slug或重复slug。"
  );
  report.push("");
} else {
  report.push("```json");
  report.push(
    JSON.stringify(
      {
        emptySlugs,
        duplicateSlugs,
      },
      null,
      2
    )
  );
  report.push("```");
  report.push("");
}

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "硬管接头详情失效检查完成"
);
console.log(
  "============================================"
);
console.log(
  "详情数量：" + hardDetails.length
);
console.log(
  "空slug：" + emptySlugs.length
);
console.log(
  "重复slug：" + duplicateSlugs.length
);
console.log(
  "TSX语法错误：" + routeErrors.length
);
console.log(
  "未通过路由检查：" +
    (
      failedRouteChecks.length
        ? failedRouteChecks.join("、")
        : "无"
    )
);
console.log("");
console.log(
  "初步结论："
);
console.log(
  preliminaryConclusion
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "本次未修改任何项目文件。"
);
