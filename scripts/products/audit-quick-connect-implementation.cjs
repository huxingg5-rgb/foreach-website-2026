const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const reportPath = path.join(
  root,
  "reports",
  "quick-connect-implementation-audit.md"
);

function walk(
  directory,
  results = []
) {
  if (
    !fs.existsSync(directory)
  ) {
    return results;
  }

  const entries =
    fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    );

  for (
    const entry of entries
  ) {
    if (
      entry.name ===
        "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git" ||
      entry.name.startsWith(
        "."
      )
    ) {
      continue;
    }

    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (
      entry.isDirectory()
    ) {
      walk(
        fullPath,
        results
      );
    } else {
      results.push(
        fullPath
      );
    }
  }

  return results;
}

function relative(
  filePath
) {
  return path
    .relative(
      root,
      filePath
    )
    .replace(
      /\\/g,
      "/"
    );
}

function text(
  value
) {
  return String(
    value ?? ""
  ).trim();
}

function escapeMarkdown(
  value
) {
  return text(value)
    .replace(
      /\|/g,
      "\\|"
    )
    .replace(
      /\r?\n/g,
      " / "
    );
}

function findWorkbook() {
  const dataSourceRoot =
    path.join(
      root,
      "data-source"
    );

  const candidates =
    walk(
      dataSourceRoot
    )
      .filter(
        (filePath) => {
          const fileName =
            path.basename(
              filePath
            );

          return (
            /\.xlsx$/i.test(
              fileName
            ) &&
            /连接件标品在售清单/.test(
              fileName
            ) &&
            !/^~\$/.test(
              fileName
            )
          );
        }
      )
      .sort(
        (current, next) => {
          return (
            fs.statSync(
              next
            ).mtimeMs -
            fs.statSync(
              current
            ).mtimeMs
          );
        }
      );

  if (
    candidates.length === 0
  ) {
    throw new Error(
      "未在data-source目录中找到连接件标品在售清单Excel。"
    );
  }

  return candidates[0];
}

function scoreHeaderRow(
  row
) {
  const keywords = [
    "型号",
    "商品编码",
    "产品系列",
    "系列",
    "接管",
    "管径",
    "软管",
    "公端",
    "母端",
    "公母",
    "穿板",
    "带阀",
    "无阀",
    "形状",
    "结构",
    "材质",
    "密封",
    "颜色",
  ];

  let score = 0;

  for (
    const cell of row
  ) {
    const value =
      text(cell);

    for (
      const keyword of
      keywords
    ) {
      if (
        value.includes(
          keyword
        )
      ) {
        score += 1;
      }
    }
  }

  return score;
}

function findHeaderRow(
  matrix
) {
  let bestIndex = 0;
  let bestScore = -1;

  matrix
    .slice(0, 30)
    .forEach(
      (
        row,
        index
      ) => {
        const score =
          scoreHeaderRow(
            row
          );

        if (
          score >
          bestScore
        ) {
          bestScore =
            score;

          bestIndex =
            index;
        }
      }
    );

  return bestIndex;
}

function getSeriesCounts(
  records
) {
  const counts = {
    Q20: 0,
    Q40: 0,
    Q60: 0,
    其他: 0,
  };

  for (
    const record of records
  ) {
    const joined =
      Object.values(
        record
      )
        .map(text)
        .join(" ");

    if (
      /\bQ20\b/i.test(
        joined
      )
    ) {
      counts.Q20 += 1;
    } else if (
      /\bQ40\b/i.test(
        joined
      )
    ) {
      counts.Q40 += 1;
    } else if (
      /\bQ60\b/i.test(
        joined
      )
    ) {
      counts.Q60 += 1;
    } else {
      counts.其他 += 1;
    }
  }

  return counts;
}

function inspectWorkbook(
  workbookPath
) {
  const workbook =
    XLSX.readFile(
      workbookPath,
      {
        raw: false,
        cellDates: false,
      }
    );

  const reports = [];

  for (
    const sheetName of
    workbook.SheetNames
  ) {
    const worksheet =
      workbook.Sheets[
        sheetName
      ];

    const matrix =
      XLSX.utils
        .sheet_to_json(
          worksheet,
          {
            header: 1,
            defval: "",
            raw: false,
          }
        );

    const sampleText =
      matrix
        .slice(0, 20)
        .flat()
        .map(text)
        .join(" ");

    const relevant =
      /快插|Q20|Q40|Q60/i.test(
        sheetName
      ) ||
      /快插|Q20|Q40|Q60/i.test(
        sampleText
      );

    if (
      !relevant
    ) {
      continue;
    }

    const headerRowIndex =
      findHeaderRow(
        matrix
      );

    const rawHeaders =
      matrix[
        headerRowIndex
      ] || [];

    const headers =
      rawHeaders.map(
        (
          value,
          index
        ) => {
          return (
            text(value) ||
            `未命名列${index + 1}`
          );
        }
      );

    const records =
      XLSX.utils
        .sheet_to_json(
          worksheet,
          {
            range:
              headerRowIndex,
            defval: "",
            raw: false,
          }
        )
        .filter(
          (record) => {
            return Object
              .values(
                record
              )
              .some(
                (value) =>
                  text(value)
              );
          }
        );

    reports.push({
      sheetName,
      headerRowIndex:
        headerRowIndex + 1,
      headers,
      records,
      counts:
        getSeriesCounts(
          records
        ),
    });
  }

  return reports;
}

function inspectCode() {
  const roots = [
    "app",
    "components",
    "data",
    "scripts",
    "services",
  ];

  const allowedExtensions =
    new Set([
      ".ts",
      ".tsx",
      ".js",
      ".cjs",
      ".mjs",
      ".json",
      ".css",
    ]);

  const keywords = [
    "quick-connect",
    "quick-connect-fittings",
    "fitting-replacement",
    "Q20",
    "Q40",
    "Q60",
    "快插接头",
  ];

  const matches = [];

  for (
    const relativeRoot of
    roots
  ) {
    const absoluteRoot =
      path.join(
        root,
        relativeRoot
      );

    const files =
      walk(
        absoluteRoot
      );

    for (
      const filePath of
      files
    ) {
      const extension =
        path.extname(
          filePath
        ).toLowerCase();

      if (
        !allowedExtensions.has(
          extension
        )
      ) {
        continue;
      }

      const content =
        fs.readFileSync(
          filePath,
          "utf8"
        );

      const lines =
        content.split(
          /\r?\n/
        );

      lines.forEach(
        (
          line,
          index
        ) => {
          const matched =
            keywords.filter(
              (keyword) =>
                line
                  .toLowerCase()
                  .includes(
                    keyword
                      .toLowerCase()
                  )
            );

          if (
            matched.length === 0
          ) {
            return;
          }

          matches.push({
            file:
              relative(
                filePath
              ),
            line:
              index + 1,
            content:
              line.trim(),
          });
        }
      );
    }
  }

  return matches;
}

const workbookPath =
  findWorkbook();

const sheetReports =
  inspectWorkbook(
    workbookPath
  );

const codeMatches =
  inspectCode();

const output = [];

output.push(
  "# 快插接头实施前检查报告"
);

output.push("");

output.push(
  `生成时间：${new Date().toISOString()}`
);

output.push("");

output.push(
  "## 一、实施结构"
);

output.push("");

output.push(
  "- 产品中心入口：快插接头"
);

output.push(
  "- 产品系列：Q20、Q40、Q60"
);

output.push(
  "- 页面形式：系列页 + 系列内筛选 + 完整型号表"
);

output.push(
  "- 不为全部SKU逐个建立独立详情页"
);

output.push(
  "- 现有Q20竞品替代模块继续独立保留"
);

output.push("");

output.push(
  "## 二、权威Excel"
);

output.push("");

output.push(
  `- 文件：\`${relative(workbookPath)}\``
);

output.push("");

if (
  sheetReports.length === 0
) {
  output.push(
    "没有识别到包含快插、Q20、Q40或Q60的工作表。"
  );

  output.push("");
}

for (
  const sheet of
  sheetReports
) {
  output.push(
    `### 工作表：${sheet.sheetName}`
  );

  output.push("");

  output.push(
    `- 表头行：第${sheet.headerRowIndex}行`
  );

  output.push(
    `- 有效数据：${sheet.records.length}条`
  );

  output.push(
    `- Q20：${sheet.counts.Q20}条`
  );

  output.push(
    `- Q40：${sheet.counts.Q40}条`
  );

  output.push(
    `- Q60：${sheet.counts.Q60}条`
  );

  output.push(
    `- 其他：${sheet.counts.其他}条`
  );

  output.push("");

  output.push(
    "#### 字段"
  );

  output.push("");

  for (
    const header of
    sheet.headers
  ) {
    output.push(
      `- ${escapeMarkdown(header)}`
    );
  }

  output.push("");

  output.push(
    "#### 前8条数据"
  );

  output.push("");

  const previewHeaders =
    sheet.headers
      .slice(0, 14);

  output.push(
    `| ${previewHeaders
      .map(
        escapeMarkdown
      )
      .join(" | ")} |`
  );

  output.push(
    `| ${previewHeaders
      .map(
        () => "---"
      )
      .join(" | ")} |`
  );

  sheet.records
    .slice(0, 8)
    .forEach(
      (record) => {
        output.push(
          `| ${previewHeaders
            .map(
              (header) =>
                escapeMarkdown(
                  record[
                    header
                  ]
                )
            )
            .join(" | ")} |`
        );
      }
    );

  output.push("");
}

output.push(
  "## 三、现有快插相关代码"
);

output.push("");

const grouped =
  new Map();

for (
  const match of
  codeMatches
) {
  if (
    !grouped.has(
      match.file
    )
  ) {
    grouped.set(
      match.file,
      []
    );
  }

  grouped
    .get(
      match.file
    )
    .push(
      match
    );
}

if (
  grouped.size === 0
) {
  output.push(
    "未找到快插接头相关代码。"
  );

  output.push("");
}

for (
  const [
    file,
    matches,
  ] of grouped
) {
  output.push(
    `### \`${file}\``
  );

  output.push("");

  matches
    .slice(0, 20)
    .forEach(
      (match) => {
        output.push(
          `- L${match.line}：\`${escapeMarkdown(match.content)}\``
        );
      }
    );

  output.push("");
}

output.push(
  "## 四、下一步实施内容"
);

output.push("");

output.push(
  "- 生成Q20、Q40、Q60系列数据"
);

output.push(
  "- 建立快插接头产品中心入口"
);

output.push(
  "- 建立Q20、Q40、Q60系列页面"
);

output.push(
  "- 增加系列内筛选"
);

output.push(
  "- 增加完整型号表"
);

output.push(
  "- 接入加入清单功能"
);

output.push(
  "- 接入产品中心路由"
);

output.push(
  "- 增加系列页FAQ和底部CTA"
);

output.push("");

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
  output.join("\n") + "\n",
  "utf8"
);

console.log("");

console.log(
  "快插接头检查完成。"
);

console.log(
  `Excel：${relative(workbookPath)}`
);

console.log(
  `匹配工作表：${sheetReports.length}`
);

console.log(
  `代码命中：${codeMatches.length}`
);

console.log(
  `报告：${relative(reportPath)}`
);