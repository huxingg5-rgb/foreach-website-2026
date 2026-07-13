const fs = require("fs");
const path = require("path");

let XLSX;

try {
  XLSX = require("xlsx");
} catch {
  throw new Error(
    "当前项目没有安装 xlsx，请先确认项目原有依赖。"
  );
}

const root = process.cwd();

const searchRoots = [
  path.join(
    root,
    "data-source"
  ),

  String.raw`H:\01-官网项目\02_产品中心\fit`,

  String.raw`H:\01-官网项目\02_产品中心`,
];

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-source-files-audit.md"
);

const jsonReportPath = path.join(
  root,
  "reports",
  "filter-check-valve-source-files-audit.json"
);

const workbookExtensions =
  new Set([
    ".xlsx",
    ".xlsm",
    ".xls",
  ]);

const keywords = [
  "过滤器",
  "过滤接头",
  "过滤",
  "单向阀",
  "止回阀",
  "逆止阀",
  "check valve",
  "check-valve",
  "one way valve",
  "one-way valve",
  "filter",
];

const priorityFileKeywords = [
  "FRGD-140D-2606-0002",
  "连接件标品在售清单",
  "过滤器",
  "单向阀",
];

const ignoredDirectoryNames =
  new Set([
    "node_modules",
    ".next",
    ".git",
    "backups",
    "out",
  ]);

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function relativeToRepo(filePath) {
  if (
    filePath
      .toLowerCase()
      .startsWith(
        root.toLowerCase()
      )
  ) {
    return path
      .relative(
        root,
        filePath
      )
      .replace(/\\/g, "/");
  }

  return filePath;
}

function walk(directory) {
  if (
    !directory ||
    !fs.existsSync(directory)
  ) {
    return [];
  }

  const result = [];

  let entries;

  try {
    entries =
      fs.readdirSync(
        directory,
        {
          withFileTypes: true,
        }
      );
  } catch {
    return [];
  }

  for (
    const entry
    of entries
  ) {
    if (
      entry.isDirectory() &&
      ignoredDirectoryNames.has(
        entry.name
      )
    ) {
      continue;
    }

    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      result.push(
        ...walk(fullPath)
      );

      continue;
    }

    if (
      entry.isFile() &&
      workbookExtensions.has(
        path
          .extname(entry.name)
          .toLowerCase()
      )
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

function includesKeyword(value) {
  const text =
    normalizeText(value)
      .toLowerCase();

  return keywords.some(
    (keyword) =>
      text.includes(
        keyword.toLowerCase()
      )
  );
}

function matchedKeywords(value) {
  const text =
    normalizeText(value)
      .toLowerCase();

  return keywords.filter(
    (keyword) =>
      text.includes(
        keyword.toLowerCase()
      )
  );
}

function rowToReadableText(row) {
  return row
    .map(normalizeText)
    .filter(Boolean)
    .join("｜");
}

function escapeMarkdown(value) {
  return normalizeText(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function detectHeaderRow(rows) {
  const candidateRows =
    rows.slice(
      0,
      Math.min(
        rows.length,
        20
      )
    );

  let bestIndex = 0;
  let bestScore = -1;

  candidateRows.forEach(
    (row, index) => {
      const values =
        Array.isArray(row)
          ? row
              .map(normalizeText)
              .filter(Boolean)
          : [];

      const headerKeywordScore =
        values.filter(
          (value) =>
            /型号|商品编码|产品名称|类别|规格|材料|接口|图号|名称|系列|model|code|sku/i.test(
              value
            )
        ).length * 5;

      const score =
        values.length +
        headerKeywordScore;

      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }
  );

  return bestIndex;
}

function objectFromRow(
  headers,
  row
) {
  const result = {};

  const maxLength =
    Math.max(
      headers.length,
      row.length
    );

  for (
    let index = 0;
    index < maxLength;
    index += 1
  ) {
    const header =
      normalizeText(
        headers[index]
      ) ||
      `列${index + 1}`;

    const value =
      normalizeText(
        row[index]
      );

    if (value) {
      result[header] =
        value;
    }
  }

  return result;
}

const workbookPaths =
  [
    ...new Set(
      searchRoots.flatMap(
        walk
      )
    ),
  ].sort(
    (a, b) =>
      a.localeCompare(
        b,
        "zh-CN"
      )
  );

const results = [];
const errors = [];

for (
  const workbookPath
  of workbookPaths
) {
  const fileName =
    path.basename(
      workbookPath
    );

  const fileNameMatches =
    priorityFileKeywords.filter(
      (keyword) =>
        fileName
          .toLowerCase()
          .includes(
            keyword.toLowerCase()
          )
    );

  let workbook;

  try {
    workbook =
      XLSX.readFile(
        workbookPath,
        {
          cellDates: false,
          cellFormula: false,
          cellHTML: false,
        }
      );
  } catch (error) {
    errors.push({
      workbookPath,
      error:
        error?.message ||
        String(error),
    });

    continue;
  }

  const workbookResult = {
    workbookPath,
    fileName,
    fileNameMatches,
    sheetNames:
      workbook.SheetNames,
    matches: [],
  };

  for (
    const sheetName
    of workbook.SheetNames
  ) {
    const worksheet =
      workbook.Sheets[
        sheetName
      ];

    if (!worksheet) {
      continue;
    }

    const rows =
      XLSX.utils.sheet_to_json(
        worksheet,
        {
          header: 1,
          defval: "",
          raw: false,
          blankrows: false,
        }
      );

    const headerIndex =
      detectHeaderRow(
        rows
      );

    const headers =
      Array.isArray(
        rows[headerIndex]
      )
        ? rows[headerIndex]
            .map(normalizeText)
        : [];

    rows.forEach(
      (row, rowIndex) => {
        if (
          !Array.isArray(row)
        ) {
          return;
        }

        const rowText =
          rowToReadableText(
            row
          );

        const rowKeywords =
          matchedKeywords(
            rowText
          );

        if (!rowKeywords.length) {
          return;
        }

        workbookResult
          .matches
          .push({
            sheetName,
            excelRow:
              rowIndex + 1,

            keywords:
              rowKeywords,

            rowText,

            data:
              objectFromRow(
                headers,
                row
              ),
          });
      }
    );
  }

  if (
    workbookResult.matches.length ||
    workbookResult.fileNameMatches.length
  ) {
    results.push(
      workbookResult
    );
  }
}

const exactAuthorityFiles =
  results.filter(
    (item) =>
      item.fileNameMatches.some(
        (value) =>
          value.includes(
            "FRGD-140D-2606-0002"
          ) ||
          value.includes(
            "连接件标品在售清单"
          )
      )
  );

const filterMatches = [];
const checkValveMatches = [];

for (
  const workbook
  of results
) {
  for (
    const match
    of workbook.matches
  ) {
    const text =
      match.rowText
        .toLowerCase();

    const base = {
      workbookPath:
        workbook.workbookPath,

      fileName:
        workbook.fileName,

      ...match,
    };

    if (
      /过滤器|过滤接头|filter/.test(
        text
      )
    ) {
      filterMatches.push(base);
    }

    if (
      /单向阀|止回阀|逆止阀|check valve|check-valve|one way valve|one-way valve/.test(
        text
      )
    ) {
      checkValveMatches.push(
        base
      );
    }
  }
}

const report = [];

report.push(
  "# 过滤器与单向阀数据源检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只读取 Excel，没有复制、修改或生成任何产品数据。"
);
report.push("");

report.push(
  "## 1. 搜索范围"
);
report.push("");

for (
  const searchRoot
  of searchRoots
) {
  report.push(
    `- \`${searchRoot}\`：${fs.existsSync(searchRoot) ? "存在" : "不存在"}`
  );
}

report.push("");

report.push(
  "## 2. 总体结果"
);
report.push("");

report.push(
  `- 扫描 Excel：${workbookPaths.length} 个`
);
report.push(
  `- 包含相关关键词的 Excel：${results.length} 个`
);
report.push(
  `- 找到权威清单候选：${exactAuthorityFiles.length} 个`
);
report.push(
  `- 过滤器相关行：${filterMatches.length} 行`
);
report.push(
  `- 单向阀相关行：${checkValveMatches.length} 行`
);
report.push(
  `- 无法读取的 Excel：${errors.length} 个`
);
report.push("");

report.push(
  "## 3. 权威清单候选"
);
report.push("");

if (
  !exactAuthorityFiles.length
) {
  report.push(
    "没有在当前搜索范围内找到文件名包含 `FRGD-140D-2606-0002` 或“连接件标品在售清单”的 Excel。"
  );
} else {
  for (
    const item
    of exactAuthorityFiles
  ) {
    report.push(
      `### ${item.fileName}`
    );
    report.push("");

    report.push(
      `- 路径：\`${item.workbookPath}\``
    );
    report.push(
      `- Sheet：${item.sheetNames.join("、")}`
    );
    report.push(
      `- 相关行：${item.matches.length}`
    );
    report.push("");
  }
}

report.push("");

function appendMatchSection(
  title,
  items
) {
  report.push(
    `## ${title}`
  );
  report.push("");

  if (!items.length) {
    report.push("未找到。");
    report.push("");
    return;
  }

  report.push(
    "| 文件 | Sheet | Excel行 | 命中关键词 | 行内容 |"
  );
  report.push(
    "|---|---|---:|---|---|"
  );

  for (
    const item
    of items
  ) {
    report.push(
      `| ${escapeMarkdown(item.fileName)} | ${escapeMarkdown(item.sheetName)} | ${item.excelRow} | ${escapeMarkdown(item.keywords.join("、"))} | ${escapeMarkdown(item.rowText)} |`
    );
  }

  report.push("");
}

appendMatchSection(
  "4. 过滤器相关数据",
  filterMatches
);

appendMatchSection(
  "5. 单向阀相关数据",
  checkValveMatches
);

report.push(
  "## 6. 涉及的Excel文件"
);
report.push("");

for (
  const workbook
  of results
) {
  report.push(
    `### ${workbook.fileName}`
  );
  report.push("");

  report.push(
    `- 路径：\`${workbook.workbookPath}\``
  );
  report.push(
    `- Sheet：${workbook.sheetNames.join("、")}`
  );
  report.push(
    `- 相关行：${workbook.matches.length}`
  );
  report.push("");
}

report.push(
  "## 7. 读取失败"
);
report.push("");

if (!errors.length) {
  report.push("无。");
} else {
  for (
    const item
    of errors
  ) {
    report.push(
      `- \`${item.workbookPath}\`：${item.error}`
    );
  }
}

report.push("");

report.push(
  "## 8. 后续生成规则"
);
report.push("");

report.push(
  "确认数据源后再执行以下工作："
);
report.push("");

report.push(
  "1. 过滤器生成内部类型 `filters`。"
);
report.push(
  "2. 单向阀生成内部类型 `check-valves`。"
);
report.push(
  "3. 前台统一显示为“过滤器与单向阀”。"
);
report.push(
  "4. 两类产品分别保留自己的规格字段和详情内容。"
);
report.push(
  "5. 型号、商品编码、图片和二维图必须从正式资料匹配，不自动猜测。"
);
report.push("");

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

fs.writeFileSync(
  jsonReportPath,
  JSON.stringify(
    {
      generatedAt:
        new Date().toISOString(),

      searchRoots,
      workbookCount:
        workbookPaths.length,

      exactAuthorityFiles,
      filterMatches,
      checkValveMatches,
      errors,
    },
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀数据源检查完成"
);
console.log(
  "============================================"
);
console.log(
  "扫描Excel：",
  workbookPaths.length
);
console.log(
  "权威清单候选：",
  exactAuthorityFiles.length
);
console.log(
  "过滤器相关行：",
  filterMatches.length
);
console.log(
  "单向阀相关行：",
  checkValveMatches.length
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
  "JSON明细："
);
console.log(
  jsonReportPath
);
console.log("");
console.log(
  "本次没有修改任何产品数据。"
);
