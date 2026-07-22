const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-luer-female-thread-detail-data.cjs"
);

const luerSelectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "luer-fitting-selection.generated.ts"
);

const femaleSelectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "detail-array-reader-audit.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" +
        filePath
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

function lineNumberAt(
  source,
  index
) {
  return source
    .slice(0, index)
    .split(/\r?\n/)
    .length;
}

function getContext(
  source,
  index,
  before = 10,
  after = 30
) {
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

  return {
    lineNumber,

    text:
      lines
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
        .join("\n"),
  };
}

function findFunctionRange(
  source,
  functionName
) {
  const pattern =
    new RegExp(
      `function\\s+${functionName}\\s*\\(`
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

  const bodyStart =
    source.indexOf(
      "{",
      start
    );

  if (bodyStart < 0) {
    return null;
  }

  let depth = 0;
  let quote = "";
  let escaped = false;
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
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
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

function addCodeBlock(
  report,
  value,
  language = "text"
) {
  report.push(
    `\`\`\`${language}`
  );

  report.push(
    value || "（无内容）"
  );

  report.push(
    "```"
  );

  report.push("");
}

function inspectExport(
  filePath,
  exportName
) {
  const source =
    read(filePath);

  const marker =
    `export const ${exportName}`;

  const index =
    source.indexOf(marker);

  if (index < 0) {
    return {
      found: false,
      source,
      marker,
    };
  }

  const context =
    getContext(
      source,
      index,
      3,
      15
    );

  const firstBracketAfterMarker =
    source.indexOf(
      "[",
      index
    );

  const firstEqualsAfterMarker =
    source.indexOf(
      "=",
      index
    );

  const firstBracketAfterEquals =
    firstEqualsAfterMarker >= 0
      ? source.indexOf(
          "[",
          firstEqualsAfterMarker
        )
      : -1;

  return {
    found: true,
    source,
    marker,
    context,

    firstBracketAfterMarker,

    firstEqualsAfterMarker,

    firstBracketAfterEquals,

    textAtFirstBracketAfterMarker:
      firstBracketAfterMarker >= 0
        ? source.slice(
            firstBracketAfterMarker,
            firstBracketAfterMarker + 80
          )
        : "",

    textAtFirstEquals:
      firstEqualsAfterMarker >= 0
        ? source.slice(
            firstEqualsAfterMarker,
            firstEqualsAfterMarker + 100
          )
        : "",

    textAtFirstBracketAfterEquals:
      firstBracketAfterEquals >= 0
        ? source.slice(
            firstBracketAfterEquals,
            firstBracketAfterEquals + 80
          )
        : "",
  };
}

/* =========================================================
   1. 检查详情生成脚本
   ========================================================= */

const generatorSource =
  read(generatorPath);

const syntaxResult =
  childProcess.spawnSync(
    process.execPath,
    [
      "--check",
      generatorPath,
    ],
    {
      cwd: root,
      encoding: "utf8",
    }
  );

const functionRange =
  findFunctionRange(
    generatorSource,
    "extractJsonArray"
  );

const keywordResults = [];

const keywords = [
  "extractJsonArray",
  "markerIndex",
  "arrayStart",
  "assignmentIndex",
  "source.indexOf",
];

for (
  const keyword
  of keywords
) {
  let searchIndex = 0;
  let count = 0;

  while (
    searchIndex <
    generatorSource.length
  ) {
    const foundIndex =
      generatorSource.indexOf(
        keyword,
        searchIndex
      );

    if (foundIndex < 0) {
      break;
    }

    keywordResults.push({
      keyword,
      ...getContext(
        generatorSource,
        foundIndex,
        4,
        10
      ),
    });

    count += 1;

    if (count >= 10) {
      break;
    }

    searchIndex =
      foundIndex +
      keyword.length;
  }
}

/* =========================================================
   2. 检查两个选型文件的真实导出结构
   ========================================================= */

const luerExport =
  inspectExport(
    luerSelectionPath,
    "luerFittingSelectionProducts"
  );

const femaleExport =
  inspectExport(
    femaleSelectionPath,
    "femaleThreadAdapterSelectionProducts"
  );

/* =========================================================
   3. 输出报告
   ========================================================= */

const report = [];

report.push(
  "# 详情数据数组读取器检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查当前详情生成脚本和两个选型数据文件，没有修改任何项目文件。"
);
report.push("");

report.push(
  "## 1. 详情生成脚本状态"
);
report.push("");

report.push(
  `- 文件：\`${relative(generatorPath)}\``
);
report.push(
  `- 总行数：${generatorSource.split(/\r?\n/).length}`
);
report.push(
  `- Node语法：${syntaxResult.status === 0 ? "✅ 通过" : "❌ 失败"}`
);
report.push("");

if (syntaxResult.status !== 0) {
  report.push(
    "### Node语法错误"
  );
  report.push("");

  addCodeBlock(
    report,
    String(
      syntaxResult.stderr ||
      syntaxResult.stdout ||
      ""
    ).trim()
  );
}

report.push(
  "## 2. extractJsonArray完整函数"
);
report.push("");

if (!functionRange) {
  report.push(
    "没有找到 extractJsonArray 函数，或无法确定函数结束位置。"
  );
  report.push("");
} else {
  const functionSource =
    generatorSource.slice(
      functionRange.start,
      functionRange.end
    );

  report.push(
    `- 起始行：${lineNumberAt(generatorSource, functionRange.start)}`
  );
  report.push(
    `- 结束行：${lineNumberAt(generatorSource, functionRange.end)}`
  );
  report.push("");

  addCodeBlock(
    report,
    functionSource,
    "js"
  );
}

report.push(
  "## 3. 相关关键字位置"
);
report.push("");

if (!keywordResults.length) {
  report.push(
    "未找到相关关键字。"
  );
  report.push("");
} else {
  for (
    const item
    of keywordResults
  ) {
    report.push(
      `### ${item.keyword}（第 ${item.lineNumber} 行）`
    );
    report.push("");

    addCodeBlock(
      report,
      item.text,
      "js"
    );
  }
}

function addExportSection(
  title,
  filePath,
  exportInfo
) {
  report.push(
    `## ${title}`
  );
  report.push("");

  report.push(
    `- 文件：\`${relative(filePath)}\``
  );
  report.push(
    `- 找到导出：${exportInfo.found ? "是" : "否"}`
  );
  report.push("");

  if (!exportInfo.found) {
    return;
  }

  report.push(
    "### 导出附近代码"
  );
  report.push("");

  addCodeBlock(
    report,
    exportInfo.context.text,
    "ts"
  );

  report.push(
    "### 数组定位结果"
  );
  report.push("");

  report.push(
    `- export名称后的第一个 \`[\`：索引 ${exportInfo.firstBracketAfterMarker}`
  );
  report.push(
    `- export名称后的第一个 \`=\`：索引 ${exportInfo.firstEqualsAfterMarker}`
  );
  report.push(
    `- 等号后的第一个 \`[\`：索引 ${exportInfo.firstBracketAfterEquals}`
  );
  report.push("");

  report.push(
    "#### export名称后的第一个 `[` 附近"
  );
  report.push("");

  addCodeBlock(
    report,
    exportInfo.textAtFirstBracketAfterMarker,
    "ts"
  );

  report.push(
    "#### 第一个 `=` 附近"
  );
  report.push("");

  addCodeBlock(
    report,
    exportInfo.textAtFirstEquals,
    "ts"
  );

  report.push(
    "#### 等号后的第一个 `[` 附近"
  );
  report.push("");

  addCodeBlock(
    report,
    exportInfo.textAtFirstBracketAfterEquals,
    "ts"
  );
}

addExportSection(
  "4. 鲁尔接头选型导出结构",
  luerSelectionPath,
  luerExport
);

addExportSection(
  "5. 内螺纹互转接头选型导出结构",
  femaleSelectionPath,
  femaleExport
);

report.push(
  "## 6. 当前初步结论"
);
report.push("");

if (
  luerExport.found &&
  luerExport.firstBracketAfterMarker >= 0 &&
  luerExport.firstEqualsAfterMarker >= 0 &&
  luerExport.firstBracketAfterMarker <
    luerExport.firstEqualsAfterMarker
) {
  report.push(
    "- 鲁尔接头导出名称后的第一个 `[` 位于赋值符号之前，说明它属于 TypeScript 类型声明。"
  );
} else {
  report.push(
    "- 鲁尔接头数组结构与预期不同，需要根据上面的实际代码继续判断。"
  );
}

if (
  femaleExport.found &&
  femaleExport.firstBracketAfterMarker >= 0 &&
  femaleExport.firstEqualsAfterMarker >= 0 &&
  femaleExport.firstBracketAfterMarker <
    femaleExport.firstEqualsAfterMarker
) {
  report.push(
    "- 内螺纹互转接头也存在类型声明数组，需要跳过赋值符号之前的 `[]`。"
  );
} else {
  report.push(
    "- 内螺纹互转接头数组结构与预期不同，需要根据上面的实际代码继续判断。"
  );
}

report.push("");
report.push(
  "下一步应根据 extractJsonArray 的真实代码结构进行精确修改，而不是继续按固定整段文本替换。"
);
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
  "详情数组读取器检查完成"
);
console.log(
  "============================================"
);
console.log(
  `生成脚本语法：${syntaxResult.status === 0 ? "通过" : "失败"}`
);
console.log(
  `extractJsonArray：${functionRange ? "已找到" : "未找到"}`
);
console.log(
  `鲁尔导出：${luerExport.found ? "已找到" : "未找到"}`
);
console.log(
  `内螺纹导出：${femaleExport.found ? "已找到" : "未找到"}`
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
