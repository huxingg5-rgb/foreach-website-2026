const fs = require("fs");
const path = require("path");
const vm = require("vm");
const childProcess = require("child_process");

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

const reportPath = path.join(
  root,
  "reports",
  "current-luer-female-static-params-audit.md"
);

const detailPaths = {
  hardTubeDetails: path.join(
    root,
    "data",
    "products",
    "generated",
    "fittings",
    "hard-tube-fittings",
    "detail",
    "index.json"
  ),

  threadToBarbedDetails: path.join(
    root,
    "data",
    "products",
    "generated",
    "fittings",
    "thread-to-barbed-fittings",
    "detail",
    "index.json"
  ),

  luerDetails: path.join(
    root,
    "data",
    "products",
    "generated",
    "fittings",
    "luer-fittings",
    "detail",
    "index.json"
  ),

  femaleThreadDetails: path.join(
    root,
    "data",
    "products",
    "generated",
    "fittings",
    "female-thread-adapters",
    "detail",
    "index.json"
  ),
};

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

function readJson(filePath) {
  return JSON.parse(
    read(filePath)
  );
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
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
        parameterEnd =
          index;
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

function countOccurrences(
  source,
  value
) {
  return source
    .split(value)
    .length - 1;
}

function normalizeSegment(value) {
  return (
    String(value || "")
      .trim()
      .toLowerCase()
      .split("/")
      .filter(Boolean)
      .pop() ||
    ""
  );
}

const routeSource =
  read(routePath);

const syntaxResult =
  childProcess.spawnSync(
    process.execPath,
    [
      "--check",
      routePath,
    ],
    {
      cwd: root,
      encoding: "utf8",
    }
  );

const range =
  findFunctionRange(
    routeSource,
    "generateStaticParams"
  );

if (!range) {
  throw new Error(
    "没有找到完整的 generateStaticParams 函数。"
  );
}

const functionSource =
  routeSource.slice(
    range.start,
    range.end
  );

const collections = {};

for (
  const [
    name,
    filePath,
  ]
  of Object.entries(
    detailPaths
  )
) {
  collections[name] =
    fs.existsSync(filePath)
      ? readJson(filePath)
      : [];
}

/*
 * 隔离执行当前 generateStaticParams。
 *
 * getSeriesRouteParams 暂时返回空数组，
 * 只检查四套接头详情参数本身。
 */
let isolatedResult = null;
let isolatedError = "";

try {
  const executableFunction =
    functionSource.replace(
      /^\s*export\s+/,
      ""
    );

  const context = {
    ...collections,

    normalizeSegment,

    getSeriesRouteParams() {
      return [];
    },

    result: null,
  };

  vm.runInNewContext(
    `${executableFunction}

result = generateStaticParams();`,
    context,
    {
      filename:
        "generateStaticParams-isolated.js",

      timeout:
        5000,
    }
  );

  isolatedResult =
    context.result;
} catch (error) {
  isolatedError =
    error?.stack ||
    error?.message ||
    String(error);
}

const invalidParams = [];
const nestedArrays = [];
const routeCounts = {};

if (Array.isArray(isolatedResult)) {
  isolatedResult.forEach(
    (item, index) => {
      if (Array.isArray(item)) {
        nestedArrays.push({
          index,
          length:
            item.length,
        });

        return;
      }

      const category =
        String(
          item?.category ||
          ""
        ).trim();

      const slug =
        String(
          item?.slug ||
          ""
        ).trim();

      const seriesSlug =
        String(
          item?.seriesSlug ||
          ""
        ).trim();

      if (
        !category ||
        !slug ||
        !seriesSlug
      ) {
        invalidParams.push({
          index,
          item,
          category,
          slug,
          seriesSlug,
        });
      }

      const key =
        `${category}/${slug}`;

      routeCounts[key] =
        (routeCounts[key] || 0) +
        1;
    }
  );
}

function inspectDetails(
  name,
  details
) {
  const invalid = [];
  const duplicateMap = {};

  details.forEach(
    (detail, index) => {
      const slug =
        normalizeSegment(
          detail?.slug
        );

      if (!slug) {
        invalid.push({
          index,
          model:
            detail?.model,
          slug:
            detail?.slug,
        });
      }

      duplicateMap[slug] =
        (duplicateMap[slug] || 0) +
        1;
    }
  );

  const duplicates =
    Object.entries(
      duplicateMap
    ).filter(
      ([
        slug,
        count,
      ]) =>
        slug &&
        count > 1
    );

  return {
    name,
    count:
      details.length,
    invalid,
    duplicates,
  };
}

const detailChecks =
  Object.entries(
    collections
  ).map(
    ([
      name,
      details,
    ]) =>
      inspectDetails(
        name,
        details
      )
  );

const markers = {
  luerImport:
    countOccurrences(
      routeSource,
      "luerDetailsJson"
    ),

  femaleImport:
    countOccurrences(
      routeSource,
      "femaleThreadDetailsJson"
    ),

  luerCollection:
    countOccurrences(
      routeSource,
      "const luerDetails ="
    ),

  femaleCollection:
    countOccurrences(
      routeSource,
      "const femaleThreadDetails ="
    ),

  luerResolve:
    countOccurrences(
      routeSource,
      '"luer-fittings"'
    ),

  femaleResolve:
    countOccurrences(
      routeSource,
      '"female-thread-adapters"'
    ),

  luerParams:
    countOccurrences(
      routeSource,
      "const luerParams ="
    ),

  femaleParams:
    countOccurrences(
      routeSource,
      "const femaleThreadParams ="
    ),

  spreadLuer:
    countOccurrences(
      routeSource,
      "...luerParams"
    ),

  spreadFemale:
    countOccurrences(
      routeSource,
      "...femaleThreadParams"
    ),
};

const report = [];

report.push(
  "# 当前接头详情静态参数检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查当前路由文件和详情JSON，没有修改任何项目文件。"
);
report.push("");

report.push(
  "## 1. 路由文件状态"
);
report.push("");

report.push(
  `- 文件：\`${relative(routePath)}\``
);
report.push(
  `- 总行数：${routeSource.split(/\r?\n/).length}`
);
report.push(
  `- Node直接语法检查：${syntaxResult.status === 0 ? "通过" : "不适用于TSX或失败"}`
);
report.push(
  `- generateStaticParams起始行：${lineNumberAt(routeSource, range.start)}`
);
report.push("");

report.push(
  "## 2. 当前 generateStaticParams 完整代码"
);
report.push("");
report.push("```tsx");
report.push(
  functionSource
);
report.push("```");
report.push("");

report.push(
  "## 3. 路由接入标记数量"
);
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    markers,
    null,
    2
  )
);
report.push("```");
report.push("");

report.push(
  "## 4. 四套详情数据检查"
);
report.push("");

for (
  const item
  of detailChecks
) {
  report.push(
    `### ${item.name}`
  );
  report.push("");
  report.push(
    `- 数量：${item.count}`
  );
  report.push(
    `- 空slug：${item.invalid.length}`
  );
  report.push(
    `- 重复slug：${item.duplicates.length}`
  );
  report.push("");

  if (item.invalid.length) {
    report.push("```json");
    report.push(
      JSON.stringify(
        item.invalid.slice(0, 20),
        null,
        2
      )
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 5. 隔离执行 generateStaticParams"
);
report.push("");

if (isolatedError) {
  report.push(
    "执行失败："
  );
  report.push("");
  report.push("```text");
  report.push(
    isolatedError
  );
  report.push("```");
  report.push("");
} else {
  report.push(
    `- 返回值是否为数组：${Array.isArray(isolatedResult)}`
  );
  report.push(
    `- 返回数量：${Array.isArray(isolatedResult) ? isolatedResult.length : 0}`
  );
  report.push(
    `- 嵌套数组数量：${nestedArrays.length}`
  );
  report.push(
    `- 缺少参数的记录：${invalidParams.length}`
  );
  report.push("");

  report.push(
    "### 各路由数量"
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      routeCounts,
      null,
      2
    )
  );
  report.push("```");
  report.push("");

  if (nestedArrays.length) {
    report.push(
      "### 嵌套数组"
    );
    report.push("");
    report.push("```json");
    report.push(
      JSON.stringify(
        nestedArrays.slice(0, 30),
        null,
        2
      )
    );
    report.push("```");
    report.push("");
  }

  if (invalidParams.length) {
    report.push(
      "### 缺少参数的记录"
    );
    report.push("");
    report.push("```json");
    report.push(
      JSON.stringify(
        invalidParams.slice(0, 30),
        null,
        2
      )
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 6. 检查结论"
);
report.push("");

if (isolatedError) {
  report.push(
    "当前 generateStaticParams 本身无法独立执行，需要根据上面的完整函数修复。"
  );
} else if (
  nestedArrays.length
) {
  report.push(
    "当前返回数组中包含未展开的嵌套数组，这会导致 Next.js 读取到缺少参数的记录。"
  );
} else if (
  invalidParams.length
) {
  report.push(
    "当前返回结果中存在缺少 category、slug 或 seriesSlug 的对象。"
  );
} else {
  report.push(
    "四套接头详情参数本身完整；问题更可能来自 getSeriesRouteParams() 返回的旧系列参数，或开发缓存仍在使用修改前代码。"
  );
}

report.push("");

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
  "当前静态参数检查完成"
);
console.log(
  "============================================"
);
console.log(
  `隔离执行：${isolatedError ? "失败" : "成功"}`
);
console.log(
  `返回数量：${Array.isArray(isolatedResult) ? isolatedResult.length : 0}`
);
console.log(
  `嵌套数组：${nestedArrays.length}`
);
console.log(
  `缺少参数：${invalidParams.length}`
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
