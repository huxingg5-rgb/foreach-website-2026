const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const sourceDir = path.join(
  root,
  "data-source",
  "product-center",
  "fittings"
);

const sheetName =
  "03_鲁尔接头";

const reportPath = path.join(
  root,
  "reports",
  "luer-fitting-column-audit.md"
);

function text(value) {
  return value == null
    ? ""
    : String(value).trim();
}

function escapeCell(value) {
  return text(value)
    .replace(/\r?\n/g, " / ")
    .replace(/\|/g, "\\|");
}

function findWorkbook() {
  const files = fs
    .readdirSync(sourceDir)
    .filter(
      (name) =>
        name.endsWith(".xlsx") &&
        name.includes(
          "连接件标品在售清单"
        ) &&
        !name.startsWith("~$")
    )
    .map((name) =>
      path.join(sourceDir, name)
    )
    .sort(
      (a, b) =>
        fs.statSync(b).mtimeMs -
        fs.statSync(a).mtimeMs
    );

  if (!files.length) {
    throw new Error(
      "没有找到连接件标品在售清单 Excel。"
    );
  }

  return files[0];
}

function unique(values) {
  return Array.from(
    new Set(
      values
        .map(text)
        .filter(Boolean)
    )
  );
}

const workbookPath =
  findWorkbook();

const workbook =
  XLSX.readFile(
    workbookPath,
    {
      raw: false,
      cellDates: false,
    }
  );

const sheet =
  workbook.Sheets[sheetName];

if (!sheet) {
  throw new Error(
    `没有找到工作表：${sheetName}`
  );
}

const rows =
  XLSX.utils.sheet_to_json(
    sheet,
    {
      header: 1,
      defval: "",
      raw: false,
    }
  );

const maxColumns =
  Math.max(
    ...rows.map(
      (row) => row.length
    )
  );

const rawHeaders =
  rows[0] || [];

const headers =
  Array.from(
    {
      length: maxColumns,
    },
    (_, index) => {
      const header =
        text(rawHeaders[index]);

      return header ||
        `未命名列${index + 1}`;
    }
  );

const dataRows =
  rows
    .slice(1)
    .map(
      (row, index) => ({
        excelRow: index + 2,
        values:
          Array.from(
            {
              length: maxColumns,
            },
            (_, columnIndex) =>
              text(
                row[columnIndex]
              )
          ),
      })
    )
    .filter((item) =>
      item.values.some(Boolean)
    );

/* =========================================
   每列统计
   ========================================= */

const columnStats =
  headers.map(
    (header, columnIndex) => {
      const values =
        dataRows
          .map(
            (item) =>
              item.values[
                columnIndex
              ]
          )
          .filter(Boolean);

      const uniqueValues =
        unique(values);

      const modelLikeCount =
        values.filter(
          (value) =>
            /^[A-Z0-9]+(?:[-/][A-Z0-9().×]+)+$/i.test(
              value
            )
        ).length;

      const numericLikeCount =
        values.filter(
          (value) =>
            /^\d+$/.test(value)
        ).length;

      return {
        columnIndex,
        columnNumber:
          columnIndex + 1,
        excelColumn:
          XLSX.utils.encode_col(
            columnIndex
          ),
        header,
        valueCount:
          values.length,
        uniqueCount:
          uniqueValues.length,
        modelLikeCount,
        numericLikeCount,
        samples:
          uniqueValues.slice(0, 15),
      };
    }
  );

/* =========================================
   系列列和产品类型列
   ========================================= */

const seriesColumnIndex =
  headers.findIndex(
    (header) =>
      header === "产品系列" ||
      header === "系列"
  );

const productTypeColumnIndex =
  headers.findIndex(
    (header) =>
      header === "产品类型"
  );

const seriesMap =
  new Map();

if (seriesColumnIndex >= 0) {
  for (const row of dataRows) {
    const series =
      row.values[
        seriesColumnIndex
      ];

    if (!series) {
      continue;
    }

    if (!seriesMap.has(series)) {
      seriesMap.set(
        series,
        {
          count: 0,
          productTypes:
            new Map(),
          rows: [],
        }
      );
    }

    const seriesItem =
      seriesMap.get(series);

    seriesItem.count += 1;

    if (
      productTypeColumnIndex >= 0
    ) {
      const productType =
        row.values[
          productTypeColumnIndex
        ] || "（空）";

      seriesItem.productTypes.set(
        productType,
        (
          seriesItem.productTypes.get(
            productType
          ) || 0
        ) + 1
      );
    }

    if (
      seriesItem.rows.length < 8
    ) {
      seriesItem.rows.push(row);
    }
  }
}

/* =========================================
   可能的型号列
   ========================================= */

const modelCandidates =
  columnStats
    .filter(
      (item) =>
        item.valueCount > 0 &&
        item.modelLikeCount >=
          Math.max(
            5,
            item.valueCount * 0.4
          )
    )
    .sort(
      (a, b) =>
        b.modelLikeCount -
        a.modelLikeCount
    );

/* =========================================
   输出报告
   ========================================= */

const report = [];

report.push(
  "# 鲁尔接头完整列结构检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只读取 Excel，没有修改项目文件。"
);
report.push("");

report.push("## 1. 数据概况");
report.push("");

report.push(
  `- Excel：\`${workbookPath}\``
);
report.push(
  `- 工作表：\`${sheetName}\``
);
report.push(
  `- 总列数：**${maxColumns}**`
);
report.push(
  `- 有效数据行：**${dataRows.length}**`
);
report.push("");

report.push("## 2. 原始表头");
report.push("");

report.push(
  "| 列序号 | Excel列 | 表头 | 有值行数 | 唯一值数 | 型号格式数量 | 样例值 |"
);
report.push(
  "|---:|---|---|---:|---:|---:|---|"
);

for (
  const item
  of columnStats
) {
  report.push(
    `| ${item.columnNumber} | ${item.excelColumn} | ${escapeCell(item.header)} | ${item.valueCount} | ${item.uniqueCount} | ${item.modelLikeCount} | ${item.samples.map(escapeCell).join("、")} |`
  );
}

report.push("");

report.push(
  "## 3. 可能的型号列"
);
report.push("");

if (
  modelCandidates.length === 0
) {
  report.push(
    "没有自动识别到型号列。"
  );
} else {
  for (
    const item
    of modelCandidates
  ) {
    report.push(
      `- ${item.excelColumn}列「${item.header}」：${item.modelLikeCount}/${item.valueCount} 个值符合型号格式`
    );
  }
}

report.push("");

report.push(
  "## 4. 前 40 条完整数据"
);
report.push("");

report.push(
  `| Excel行 | ${headers.map(escapeCell).join(" | ")} |`
);

report.push(
  `|---:|${headers.map(() => "---").join("|")}|`
);

for (
  const row
  of dataRows.slice(0, 40)
) {
  report.push(
    `| ${row.excelRow} | ${row.values.map(escapeCell).join(" | ")} |`
  );
}

report.push("");

report.push(
  "## 5. 各产品系列分布"
);
report.push("");

for (
  const [
    series,
    info,
  ]
  of seriesMap
) {
  report.push(
    `### ${series}（${info.count} 条）`
  );
  report.push("");

  report.push(
    "产品类型统计："
  );
  report.push("");

  for (
    const [
      productType,
      count,
    ]
    of info.productTypes
  ) {
    report.push(
      `- ${productType}：${count}`
    );
  }

  report.push("");

  report.push(
    "该系列样例："
  );
  report.push("");

  report.push(
    `| Excel行 | ${headers.map(escapeCell).join(" | ")} |`
  );

  report.push(
    `|---:|${headers.map(() => "---").join("|")}|`
  );

  for (
    const row
    of info.rows
  ) {
    report.push(
      `| ${row.excelRow} | ${row.values.map(escapeCell).join(" | ")} |`
    );
  }

  report.push("");
}

report.push(
  "## 6. 下一步判定目标"
);
report.push("");

report.push(
  "根据本报告确认以下字段："
);
report.push("");

report.push(
  "```text"
);
report.push(
  "型号"
);
report.push(
  "商品编码"
);
report.push(
  "产品系列"
);
report.push(
  "产品类型"
);
report.push(
  "公鲁尔 / 母鲁尔"
);
report.push(
  "锁紧形式"
);
report.push(
  "安装方式"
);
report.push(
  "接管尺寸"
);
report.push(
  "螺纹规格"
);
report.push(
  "主体材质"
);
report.push(
  "颜色"
);
report.push(
  "密封圈或附加配置"
);
report.push(
  "```"
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
  "鲁尔接头完整列检查完成"
);
console.log(
  "============================================"
);
console.log(
  `数据行：${dataRows.length}`
);
console.log(
  `总列数：${maxColumns}`
);
console.log(
  `型号候选列：${modelCandidates.length}`
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何项目文件。"
);
