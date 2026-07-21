const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const reportPath = path.join(
  root,
  "reports",
  "luer-card-copy-audit.md"
);

const searchDirectories = [
  path.join(root, "scripts", "products"),
  path.join(root, "data", "products", "selection"),
];

const clientCandidates = [
  path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductSelectionClient.tsx"
  ),
];

function exists(filePath) {
  return fs.existsSync(filePath);
}

function read(filePath) {
  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function walk(directory) {
  if (!exists(directory)) {
    return [];
  }

  const result = [];

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      result.push(
        ...walk(fullPath)
      );
    } else {
      result.push(
        fullPath
      );
    }
  }

  return result;
}

function relative(filePath) {
  return path.relative(
    root,
    filePath
  );
}

function checkNodeSyntax(filePath) {
  if (
    !/\.(cjs|mjs|js)$/i.test(
      filePath
    )
  ) {
    return {
      checked: false,
      valid: null,
      message: "",
    };
  }

  const result =
    childProcess.spawnSync(
      process.execPath,
      [
        "--check",
        filePath,
      ],
      {
        cwd: root,
        encoding: "utf8",
      }
    );

  return {
    checked: true,
    valid:
      result.status === 0,
    message:
      String(
        result.stderr ||
        result.stdout ||
        ""
      ).trim(),
  };
}

function getLineNumber(
  source,
  index
) {
  return (
    source
      .slice(0, index)
      .split(/\r?\n/)
      .length
  );
}

function getSnippet(
  source,
  pattern,
  before = 5,
  after = 14
) {
  const match =
    source.match(pattern);

  if (
    !match ||
    match.index == null
  ) {
    return null;
  }

  const lines =
    source.split(/\r?\n/);

  const lineNumber =
    getLineNumber(
      source,
      match.index
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
        .slice(start, end)
        .map(
          (line, index) =>
            `${String(
              start +
              index +
              1
            ).padStart(5, " ")} | ${line}`
        )
        .join("\n"),
  };
}

function unique(values) {
  return Array.from(
    new Set(
      values.filter(Boolean)
    )
  );
}

function escapeTable(value) {
  return String(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

/* =========================================================
   1. 查找鲁尔相关文件
   ========================================================= */

const allFiles =
  searchDirectories.flatMap(
    walk
  );

const fileNameMatches =
  allFiles.filter(
    (filePath) =>
      /luer|鲁尔/i.test(
        path.basename(filePath)
      )
  );

const contentMatches =
  allFiles.filter(
    (filePath) => {
      if (
        !/\.(cjs|mjs|js|ts|tsx|json|md)$/i.test(
          filePath
        )
      ) {
        return false;
      }

      try {
        const source =
          read(filePath);

        return (
          /luer/i.test(source) ||
          /鲁尔/.test(source)
        );
      } catch {
        return false;
      }
    }
  );

const luerFiles =
  unique([
    ...fileNameMatches,
    ...contentMatches,
  ]);

/* =========================================================
   2. 分类生成脚本与生成数据
   ========================================================= */

const generatorFiles =
  luerFiles.filter(
    (filePath) =>
      relative(filePath)
        .replace(/\\/g, "/")
        .startsWith(
          "scripts/products/"
        )
  );

const generatedFiles =
  luerFiles.filter(
    (filePath) =>
      relative(filePath)
        .replace(/\\/g, "/")
        .startsWith(
          "data/products/selection/"
        )
  );

/* =========================================================
   3. 生成文件数据检查
   ========================================================= */

const generatedSummaries = [];

for (
  const filePath
  of generatedFiles
) {
  const source =
    read(filePath);

  const productTypeIds =
    unique(
      [...source.matchAll(
        /"productTypeId"\s*:\s*"([^"]+)"/g
      )].map(
        (match) =>
          match[1]
      )
    );

  const seriesIds =
    unique(
      [...source.matchAll(
        /"seriesId"\s*:\s*"([^"]+)"/g
      )].map(
        (match) =>
          match[1]
      )
    );

  const titles =
    [...source.matchAll(
      /"cardTitle"\s*:\s*\{[\s\S]*?"zh"\s*:\s*"([^"]+)"/g
    )].map(
      (match) =>
        match[1]
    );

  const subtitles =
    [...source.matchAll(
      /"cardSubtitle"\s*:\s*\{[\s\S]*?"zh"\s*:\s*"([\s\S]*?)"\s*,\s*"en"/g
    )].map(
      (match) =>
        match[1]
          .replace(/\\n/g, "\n")
    );

  const modelLikeTitles =
    titles.filter(
      (value) =>
        /^[A-Z0-9]+(?:-[A-Z0-9]+)+$/i.test(
          value
        )
    );

  const filter01InputType =
    source.match(
      /"filterKey"\s*:\s*"filter01"[\s\S]*?"inputType"\s*:\s*"([^"]+)"/
    )?.[1] || "";

  generatedSummaries.push({
    filePath,
    productTypeIds,
    seriesIds,
    productCount:
      [...source.matchAll(
        /"productId"\s*:/g
      )].length,
    titles,
    subtitles,
    modelLikeTitleCount:
      modelLikeTitles.length,
    filter01InputType,
  });
}

/* =========================================================
   4. 生成脚本关键代码检查
   ========================================================= */

const generatorSummaries =
  generatorFiles.map(
    (filePath) => {
      const source =
        read(filePath);

      return {
        filePath,
        size:
          Buffer.byteLength(
            source,
            "utf8"
          ),
        lineCount:
          source.split(/\r?\n/)
            .length,
        syntax:
          checkNodeSyntax(
            filePath
          ),
        snippets: {
          parseModel:
            getSnippet(
              source,
              /function\s+parseModel\s*\(/
            ),

          cardSubtitle:
            getSnippet(
              source,
              /function\s+createCardSubtitle\s*\(/
            ),

          cardTitle:
            getSnippet(
              source,
              /cardTitle\s*:/
            ),

          structureMap:
            getSnippet(
              source,
              /const\s+(structureMap|seriesMap|productNameMap)\s*=/
            ),

          colorMap:
            getSnippet(
              source,
              /const\s+(colorMap|colorFilterMap)\s*=/
            ),

          filterLabels:
            getSnippet(
              source,
              /const\s+filterLabels\s*=/
            ),
        },
      };
    }
  );

/* =========================================================
   5. 页面接入检查
   ========================================================= */

const clientResults = [];

for (
  const clientPath
  of clientCandidates
) {
  if (!exists(clientPath)) {
    continue;
  }

  const source =
    read(clientPath);

  const matches =
    [];

  for (
    const match
    of source.matchAll(
      /.*(?:luer|鲁尔).*/gi
    )
  ) {
    if (
      match.index == null
    ) {
      continue;
    }

    matches.push({
      lineNumber:
        getLineNumber(
          source,
          match.index
        ),
      text:
        match[0].trim(),
    });
  }

  clientResults.push({
    filePath:
      clientPath,
    matches,
  });
}

/* =========================================================
   6. 输出报告
   ========================================================= */

const report = [];

report.push(
  "# 鲁尔接头卡片文案检查"
);
report.push("");
report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");
report.push(
  "> 本次只检查现有生成逻辑、生成数据和页面接入，没有修改产品数据或页面代码。"
);
report.push("");

report.push(
  "## 1. 鲁尔相关文件"
);
report.push("");

if (!luerFiles.length) {
  report.push(
    "未找到鲁尔相关文件。"
  );
} else {
  for (
    const filePath
    of luerFiles
  ) {
    report.push(
      `- \`${relative(filePath)}\``
    );
  }
}

report.push("");
report.push(
  "## 2. 鲁尔生成脚本"
);
report.push("");

if (!generatorSummaries.length) {
  report.push(
    "未识别到鲁尔生成脚本。"
  );
} else {
  report.push(
    "| 文件 | 行数 | 大小 | Node语法 |"
  );
  report.push(
    "|---|---:|---:|---|"
  );

  for (
    const item
    of generatorSummaries
  ) {
    report.push(
      `| ${escapeTable(relative(item.filePath))} | ${item.lineCount} | ${item.size} | ${
        item.syntax.checked
          ? item.syntax.valid
            ? "✅ 通过"
            : "❌ 失败"
          : "未检查"
      } |`
    );
  }
}

report.push("");

for (
  const item
  of generatorSummaries
) {
  report.push(
    `### ${relative(item.filePath)}`
  );
  report.push("");

  if (
    item.syntax.checked &&
    !item.syntax.valid
  ) {
    report.push(
      "#### Node语法错误"
    );
    report.push("");
    report.push("```text");
    report.push(
      item.syntax.message ||
      "无错误信息"
    );
    report.push("```");
    report.push("");
  }

  const snippetEntries = [
    [
      "型号解析 parseModel",
      item.snippets.parseModel,
    ],
    [
      "卡片描述 createCardSubtitle",
      item.snippets.cardSubtitle,
    ],
    [
      "卡片标题 cardTitle",
      item.snippets.cardTitle,
    ],
    [
      "系列或结构映射",
      item.snippets.structureMap,
    ],
    [
      "颜色映射",
      item.snippets.colorMap,
    ],
    [
      "筛选标签",
      item.snippets.filterLabels,
    ],
  ];

  for (
    const [
      title,
      snippet,
    ]
    of snippetEntries
  ) {
    report.push(
      `#### ${title}`
    );
    report.push("");

    if (!snippet) {
      report.push(
        "未找到。"
      );
      report.push("");
      continue;
    }

    report.push(
      `起始行：${snippet.lineNumber}`
    );
    report.push("");
    report.push("```text");
    report.push(
      snippet.text
    );
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 3. 当前生成数据"
);
report.push("");

if (!generatedSummaries.length) {
  report.push(
    "未识别到鲁尔生成数据文件。"
  );
} else {
  for (
    const item
    of generatedSummaries
  ) {
    report.push(
      `### ${relative(item.filePath)}`
    );
    report.push("");
    report.push(
      `- 产品数量：${item.productCount}`
    );
    report.push(
      `- productTypeId：${item.productTypeIds.join("、") || "未找到"}`
    );
    report.push(
      `- 系列：${item.seriesIds.join("、") || "未找到"}`
    );
    report.push(
      `- 型号式标题数量：${item.modelLikeTitleCount}/${item.titles.length}`
    );
    report.push(
      `- filter01 inputType：${item.filter01InputType || "未找到"}`
    );
    report.push("");

    report.push(
      "#### 当前卡片示例"
    );
    report.push("");

    const sampleCount =
      Math.min(
        12,
        Math.max(
          item.titles.length,
          item.subtitles.length
        )
      );

    for (
      let index = 0;
      index < sampleCount;
      index += 1
    ) {
      report.push(
        `**示例 ${index + 1}**`
      );
      report.push("");
      report.push("```text");
      report.push(
        item.titles[index] ||
        "（无标题）"
      );

      if (
        item.subtitles[index]
      ) {
        report.push(
          item.subtitles[index]
        );
      }

      report.push("```");
      report.push("");
    }
  }
}

report.push(
  "## 4. 页面接入情况"
);
report.push("");

if (!clientResults.length) {
  report.push(
    "未找到 ProductSelectionClient。"
  );
} else {
  for (
    const item
    of clientResults
  ) {
    report.push(
      `### ${relative(item.filePath)}`
    );
    report.push("");

    if (!item.matches.length) {
      report.push(
        "未发现 luer / 鲁尔相关代码。"
      );
      report.push("");
      continue;
    }

    report.push(
      "| 行号 | 内容 |"
    );
    report.push(
      "|---:|---|"
    );

    for (
      const match
      of item.matches.slice(0, 30)
    ) {
      report.push(
        `| ${match.lineNumber} | \`${escapeTable(match.text)}\` |`
      );
    }

    report.push("");
  }
}

report.push(
  "## 5. 下一步修改目标"
);
report.push("");
report.push(
  "确认生成脚本和型号解析无误后，按以下规则修改："
);
report.push("");
report.push(
  "1. 卡片标题改为完整型号。"
);
report.push(
  "2. 普通鲁尔接头描述为：结构名称 / 接管或螺纹规格 / 材质。"
);
report.push(
  "3. 普通产品颜色只保留在筛选中。"
);
report.push(
  "4. LCR 色环保留材质和颜色。"
);
report.push(
  "5. LPT、LNS按附件逻辑显示，不套用软管适配描述。"
);
report.push(
  "6. 不修改现有筛选、联动置灰和详情链接。"
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
  "鲁尔接头卡片文案检查完成"
);
console.log(
  "============================================"
);
console.log(
  `相关文件：${luerFiles.length}`
);
console.log(
  `生成脚本：${generatorFiles.length}`
);
console.log(
  `生成数据：${generatedFiles.length}`
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
  "本次未修改产品数据或页面代码。"
);
