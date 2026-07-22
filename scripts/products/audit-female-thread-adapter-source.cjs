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

const reportPath = path.join(
  root,
  "reports",
  "female-thread-adapter-source-audit.md"
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

function unique(values) {
  return Array.from(
    new Set(
      values
        .map(text)
        .filter(Boolean)
    )
  );
}

function findWorkbook() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(
      "未找到连接件数据源目录：" +
        sourceDir
    );
  }

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
      "未找到连接件标品在售清单。"
    );
  }

  return files[0];
}

function isCandidateSheet(
  sheetName,
  rows
) {
  const nameMatched =
    /内螺|互转|转接|adapter/i.test(
      sheetName
    );

  const contentText =
    rows
      .slice(0, 40)
      .flat()
      .map(text)
      .join(" ");

  const contentMatched =
    /内螺纹互转|内螺互转|内螺纹转接|母螺纹转接|female thread adapter/i.test(
      contentText
    );

  return (
    nameMatched ||
    contentMatched
  );
}

function findHeaderRow(rows) {
  const keywords = [
    "产品类型",
    "产品系列",
    "料号",
    "恒永达型号",
    "型号",
    "商品编码",
    "2D图编码",
    "3D图编码",
  ];

  let bestIndex = 0;
  let bestScore = -1;

  rows
    .slice(0, 15)
    .forEach(
      (row, index) => {
        const values =
          row.map(text);

        const score =
          keywords.filter(
            (keyword) =>
              values.some(
                (value) =>
                  value.includes(
                    keyword
                  )
              )
          ).length;

        if (score > bestScore) {
          bestIndex = index;
          bestScore = score;
        }
      }
    );

  return bestIndex;
}

function getSeriesPrefix(value) {
  const model = text(value)
    .toUpperCase();

  const modelCodeMatch =
    model.match(
      /([A-Z][A-Z0-9]*)(?:-[A-Z0-9/]+)+$/
    );

  if (modelCodeMatch) {
    return modelCodeMatch[1];
  }

  const beginningMatch =
    model.match(/^[A-Z]+/);

  return beginningMatch
    ? beginningMatch[0]
    : "未识别";
}

function getThreadValues(value) {
  const source =
    text(value).toUpperCase();

  const patterns = [
    /1\/4-28\s*UNF/g,
    /10-32\s*UNF/g,
    /M5/g,
    /M6/g,
    /M8/g,
    /G1\/8/g,
    /G1\/4/g,
    /1\/8NPT/g,
    /1\/4NPT/g,
    /U28/g,
    /U32/g,
    /U24/g,
  ];

  const result = [];

  for (const pattern of patterns) {
    const matches =
      source.match(pattern) || [];

    result.push(...matches);
  }

  return unique(result);
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

const candidates = [];

for (
  const sheetName
  of workbook.SheetNames
) {
  const sheet =
    workbook.Sheets[sheetName];

  const rows =
    XLSX.utils.sheet_to_json(
      sheet,
      {
        header: 1,
        defval: "",
        raw: false,
      }
    );

  if (
    isCandidateSheet(
      sheetName,
      rows
    )
  ) {
    candidates.push({
      sheetName,
      rows,
    });
  }
}

if (!candidates.length) {
  throw new Error(
    "没有找到内螺纹互转接头相关工作表。"
  );
}

const report = [];

report.push(
  "# 内螺纹互转接头数据源检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只读取 Excel，没有修改网站代码。"
);
report.push("");

report.push("## 1. 数据源");
report.push("");

report.push(
  `- Excel：\`${workbookPath}\``
);
report.push(
  `- 命中工作表：${candidates.length} 个`
);
report.push("");

for (
  const candidate
  of candidates
) {
  const {
    sheetName,
    rows,
  } = candidate;

  const headerRowIndex =
    findHeaderRow(rows);

  const maxColumns =
    Math.max(
      ...rows.map(
        (row) => row.length
      )
    );

  const headers =
    Array.from(
      {
        length: maxColumns,
      },
      (_, index) =>
        text(
          rows[headerRowIndex]?.[
            index
          ]
        ) ||
        `未命名列${index + 1}`
    );

  const records =
    rows
      .slice(
        headerRowIndex + 1
      )
      .map(
        (row, index) => ({
          excelRow:
            headerRowIndex +
            index +
            2,

          values:
            Array.from(
              {
                length:
                  maxColumns,
              },
              (_, columnIndex) =>
                text(
                  row[columnIndex]
                )
            ),
        })
      )
      .filter(
        (item) =>
          item.values.some(
            Boolean
          )
      );

  const columnStats =
    headers.map(
      (
        header,
        columnIndex
      ) => {
        const values =
          records
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
              /[A-Z][A-Z0-9]*(?:-[A-Z0-9/().]+)+$/i.test(
                value
              )
          ).length;

        const threadValues =
          unique(
            values.flatMap(
              getThreadValues
            )
          );

        return {
          columnIndex,
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
          samples:
            uniqueValues.slice(
              0,
              15
            ),
          threadValues,
        };
      }
    );

  const modelCandidate =
    [...columnStats]
      .sort(
        (a, b) =>
          b.modelLikeCount -
          a.modelLikeCount
      )[0];

  const findColumnIndex =
    (...patterns) =>
      headers.findIndex(
        (header) =>
          patterns.some(
            (pattern) =>
              pattern.test(
                header
              )
          )
      );

  const typeIndex =
    findColumnIndex(
      /^产品类型$/,
      /结构类型/
    );

  const seriesIndex =
    findColumnIndex(
      /^产品系列$/,
      /^系列$/
    );

  const itemNumberIndex =
    findColumnIndex(
      /^料号$/,
      /内部料号/
    );

  const modelIndex =
    findColumnIndex(
      /恒永达型号/,
      /^型号$/
    );

  const productCodeIndex =
    findColumnIndex(
      /商品编码/,
      /物料编码/
    );

  const drawing2DIndex =
    findColumnIndex(
      /2D图编码/,
      /二维图/
    );

  const drawing3DIndex =
    findColumnIndex(
      /3D图编码/,
      /三维图/
    );

  const validRecords =
    records.filter(
      (record) => {
        const productCode =
          productCodeIndex >= 0
            ? record.values[
                productCodeIndex
              ]
            : "";

        const model =
          modelIndex >= 0
            ? record.values[
                modelIndex
              ]
            : "";

        return (
          productCode &&
          model
        );
      }
    );

  const seriesCounts = {};
  const typeCounts = {};
  const prefixCounts = {};
  const threadValues =
    new Set();

  for (
    const record
    of validRecords
  ) {
    const series =
      seriesIndex >= 0
        ? record.values[
            seriesIndex
          ]
        : "";

    const productType =
      typeIndex >= 0
        ? record.values[
            typeIndex
          ]
        : "";

    const model =
      modelIndex >= 0
        ? record.values[
            modelIndex
          ]
        : "";

    const prefix =
      getSeriesPrefix(model);

    if (series) {
      seriesCounts[series] =
        (
          seriesCounts[
            series
          ] || 0
        ) + 1;
    }

    if (productType) {
      typeCounts[
        productType
      ] =
        (
          typeCounts[
            productType
          ] || 0
        ) + 1;
    }

    prefixCounts[prefix] =
      (
        prefixCounts[
          prefix
        ] || 0
      ) + 1;

    for (
      const thread
      of getThreadValues(
        model
      )
    ) {
      threadValues.add(
        thread
      );
    }
  }

  const productCodes =
    validRecords.map(
      (record) =>
        record.values[
          productCodeIndex
        ]
    );

  const duplicateProductCodes =
    unique(productCodes)
      .filter(
        (value) =>
          productCodes.filter(
            (item) =>
              item === value
          ).length > 1
      );

  const models =
    validRecords.map(
      (record) =>
        record.values[
          modelIndex
        ]
    );

  const duplicateModels =
    unique(models)
      .filter(
        (value) =>
          models.filter(
            (item) =>
              item === value
          ).length > 1
      );

  report.push(
    `## 工作表：${sheetName}`
  );
  report.push("");

  report.push(
    `- 表头行：第 ${headerRowIndex + 1} 行`
  );
  report.push(
    `- 原始非空行：${records.length}`
  );
  report.push(
    `- 有效产品行：${validRecords.length}`
  );
  report.push(
    `- 总列数：${maxColumns}`
  );
  report.push(
    `- 产品类型列：${typeIndex >= 0 ? headers[typeIndex] : "未识别"}`
  );
  report.push(
    `- 产品系列列：${seriesIndex >= 0 ? headers[seriesIndex] : "未识别"}`
  );
  report.push(
    `- 料号列：${itemNumberIndex >= 0 ? headers[itemNumberIndex] : "未识别"}`
  );
  report.push(
    `- 型号列：${modelIndex >= 0 ? headers[modelIndex] : "未识别"}`
  );
  report.push(
    `- 商品编码列：${productCodeIndex >= 0 ? headers[productCodeIndex] : "未识别"}`
  );
  report.push(
    `- 2D图列：${drawing2DIndex >= 0 ? headers[drawing2DIndex] : "未识别"}`
  );
  report.push(
    `- 3D图列：${drawing3DIndex >= 0 ? headers[drawing3DIndex] : "未识别"}`
  );
  report.push(
    `- 自动型号候选：${modelCandidate?.excelColumn || "无"}列「${modelCandidate?.header || "无"}」`
  );
  report.push("");

  report.push(
    "### 完整列结构"
  );
  report.push("");

  report.push(
    "| Excel列 | 表头 | 有值数 | 唯一值数 | 型号格式数 | 识别到的螺纹 | 样例值 |"
  );
  report.push(
    "|---|---|---:|---:|---:|---|---|"
  );

  for (
    const item
    of columnStats
  ) {
    report.push(
      `| ${item.excelColumn} | ${escapeCell(item.header)} | ${item.valueCount} | ${item.uniqueCount} | ${item.modelLikeCount} | ${item.threadValues.map(escapeCell).join("、")} | ${item.samples.map(escapeCell).join("、")} |`
    );
  }

  report.push("");

  report.push(
    "### 产品类型统计"
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      typeCounts,
      null,
      2
    )
  );
  report.push("```");
  report.push("");

  report.push(
    "### 产品系列统计"
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      seriesCounts,
      null,
      2
    )
  );
  report.push("```");
  report.push("");

  report.push(
    "### 型号前缀统计"
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      prefixCounts,
      null,
      2
    )
  );
  report.push("```");
  report.push("");

  report.push(
    "### 型号中识别到的螺纹"
  );
  report.push("");

  if (
    threadValues.size
  ) {
    for (
      const value
      of threadValues
    ) {
      report.push(
        `- ${value}`
      );
    }
  } else {
    report.push(
      "暂未自动识别。"
    );
  }

  report.push("");

  report.push(
    "### 重复数据"
  );
  report.push("");

  report.push(
    `- 重复商品编码：${duplicateProductCodes.length ? duplicateProductCodes.join("、") : "无"}`
  );
  report.push(
    `- 重复型号：${duplicateModels.length ? duplicateModels.join("、") : "无"}`
  );
  report.push("");

  report.push(
    "### 前 50 条完整数据"
  );
  report.push("");

  report.push(
    `| Excel行 | ${headers.map(escapeCell).join(" | ")} |`
  );

  report.push(
    `|---:|${headers.map(() => "---").join("|")}|`
  );

  for (
    const record
    of records.slice(0, 50)
  ) {
    report.push(
      `| ${record.excelRow} | ${record.values.map(escapeCell).join(" | ")} |`
    );
  }

  report.push("");
}

report.push(
  "## 初步选型规划"
);
report.push("");

report.push(
  "最终根据实际型号结构确认，预计可能使用："
);
report.push("");

report.push("```text");
report.push("1. 连接结构");
report.push("2. 产品系列");
report.push("3. 接口一螺纹");
report.push("4. 接口二螺纹");
report.push("5. 安装方式");
report.push("6. 材质");
report.push("7. 颜色");
report.push("```");
report.push("");

report.push(
  "## 下一步"
);
report.push("");

report.push(
  "确认 Excel 字段后，再提供产品图和二维图纸目录，检查型号、料号与资源文件的匹配关系。"
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

console.log("");
console.log(
  "============================================"
);
console.log(
  "内螺纹互转接头数据源检查完成"
);
console.log(
  "============================================"
);
console.log(
  `命中工作表：${candidates.length}`
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何网站文件。"
);
