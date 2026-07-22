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
  "luer-fitting-source-audit.md"
);

function text(value) {
  return value == null
    ? ""
    : String(value).trim();
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
        name.includes("连接件标品在售清单") &&
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

function rowContainsLuer(row) {
  return row.some((cell) =>
    /鲁尔|luer/i.test(
      text(cell)
    )
  );
}

function findHeaderRow(rows) {
  const keywords = [
    "型号",
    "商品编码",
    "物料编码",
    "系列",
    "产品系列",
    "材质",
    "颜色",
    "接管内径",
    "公母",
    "结构",
    "安装",
  ];

  let bestIndex = 0;
  let bestScore = -1;

  rows.slice(0, 20).forEach(
    (row, index) => {
      const values =
        row.map(text);

      const score =
        keywords.filter((keyword) =>
          values.some((value) =>
            value.includes(keyword)
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

function unique(values) {
  return Array.from(
    new Set(
      values
        .map(text)
        .filter(Boolean)
    )
  );
}

function getSeriesPrefix(model) {
  const match = text(model)
    .toUpperCase()
    .match(/^[A-Z]+/);

  return match
    ? match[0]
    : "未识别";
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

const candidateSheets = [];

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

  const nameMatched =
    /鲁尔|luer/i.test(
      sheetName
    );

  const contentMatched =
    rows
      .slice(0, 50)
      .some(rowContainsLuer);

  if (
    nameMatched ||
    contentMatched
  ) {
    candidateSheets.push({
      sheetName,
      rows,
    });
  }
}

if (!candidateSheets.length) {
  throw new Error(
    "Excel 中没有找到鲁尔接头相关工作表。"
  );
}

const report = [];

report.push(
  "# 鲁尔接头数据源检查报告"
);
report.push("");
report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");
report.push(
  "> 本次只读取 Excel，没有修改任何项目文件。"
);
report.push("");

report.push("## 1. 数据源");
report.push("");
report.push(
  `- Excel：\`${workbookPath}\``
);
report.push(
  `- 命中工作表：${candidateSheets.length} 个`
);
report.push("");

for (
  const candidate
  of candidateSheets
) {
  const {
    sheetName,
    rows,
  } = candidate;

  const headerRowIndex =
    findHeaderRow(rows);

  const headers =
    rows[headerRowIndex]
      .map((value, index) =>
        text(value) ||
        `未命名列${index + 1}`
      );

  const records =
    rows
      .slice(
        headerRowIndex + 1
      )
      .map((row, rowIndex) => {
        const record = {
          excelRow:
            headerRowIndex +
            rowIndex +
            2,
        };

        headers.forEach(
          (header, columnIndex) => {
            record[header] =
              text(
                row[columnIndex]
              );
          }
        );

        return record;
      })
      .filter((record) =>
        Object.entries(record).some(
          ([key, value]) =>
            key !== "excelRow" &&
            text(value)
        )
      );

  function findHeader(
    patterns
  ) {
    return headers.find(
      (header) =>
        patterns.some(
          (pattern) =>
            pattern.test(header)
        )
    );
  }

  const modelHeader =
    findHeader([
      /^型号$/,
      /产品型号/,
      /model/i,
    ]);

  const codeHeader =
    findHeader([
      /商品编码/,
      /物料编码/,
      /item.*code/i,
    ]);

  const seriesHeader =
    findHeader([
      /产品系列/,
      /^系列$/,
      /series/i,
    ]);

  const materialHeader =
    findHeader([
      /材质/,
      /material/i,
    ]);

  const colorHeader =
    findHeader([
      /颜色/,
      /color/i,
    ]);

  const tubeHeader =
    findHeader([
      /接管内径/,
      /软管内径/,
      /tube.*id/i,
    ]);

  const genderHeader =
    findHeader([
      /公母/,
      /鲁尔端/,
      /接口类型/,
      /gender/i,
    ]);

  const structureHeader =
    findHeader([
      /连接结构/,
      /产品结构/,
      /结构/,
      /类型/,
    ]);

  const mountingHeader =
    findHeader([
      /安装方式/,
      /面板/,
      /mount/i,
    ]);

  const drawing2dHeader =
    findHeader([
      /二维/,
      /2d/i,
    ]);

  const drawing3dHeader =
    findHeader([
      /三维/,
      /3d/i,
    ]);

  const models =
    modelHeader
      ? records.map(
          (record) =>
            record[modelHeader]
        )
      : [];

  const prefixCounts = {};

  models
    .filter(Boolean)
    .forEach((model) => {
      const prefix =
        getSeriesPrefix(model);

      prefixCounts[prefix] =
        (
          prefixCounts[prefix] ||
          0
        ) + 1;
    });

  const duplicateModels =
    unique(models).filter(
      (model) =>
        models.filter(
          (value) =>
            value === model
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
    `- 数据记录：${records.length} 条`
  );
  report.push(
    `- 型号列：${modelHeader || "未识别"}`
  );
  report.push(
    `- 商品编码列：${codeHeader || "未识别"}`
  );
  report.push(
    `- 系列列：${seriesHeader || "未识别"}`
  );
  report.push(
    `- 公母端列：${genderHeader || "未识别"}`
  );
  report.push(
    `- 结构列：${structureHeader || "未识别"}`
  );
  report.push(
    `- 安装方式列：${mountingHeader || "未识别"}`
  );
  report.push(
    `- 接管内径列：${tubeHeader || "未识别"}`
  );
  report.push(
    `- 材质列：${materialHeader || "未识别"}`
  );
  report.push(
    `- 颜色列：${colorHeader || "未识别"}`
  );
  report.push(
    `- 二维图列：${drawing2dHeader || "未识别"}`
  );
  report.push(
    `- 三维图列：${drawing3dHeader || "未识别"}`
  );
  report.push("");

  report.push("### 系列前缀统计");
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

  report.push("### 可选值检查");
  report.push("");

  const fields = [
    ["产品系列", seriesHeader],
    ["公母端", genderHeader],
    ["连接结构", structureHeader],
    ["安装方式", mountingHeader],
    ["接管内径", tubeHeader],
    ["材质", materialHeader],
    ["颜色", colorHeader],
  ];

  for (
    const [
      label,
      header,
    ]
    of fields
  ) {
    if (!header) {
      report.push(
        `- ${label}：未识别对应列`
      );
      continue;
    }

    const values =
      unique(
        records.map(
          (record) =>
            record[header]
        )
      );

    report.push(
      `- ${label}（${values.length}）：${values.join("、")}`
    );
  }

  report.push("");

  report.push("### 重复型号");
  report.push("");

  if (
    duplicateModels.length
  ) {
    duplicateModels.forEach(
      (model) =>
        report.push(
          `- ${model}`
        )
    );
  } else {
    report.push("无。");
  }

  report.push("");

  report.push("### 前 30 条数据");
  report.push("");

  const displayHeaders = [
    codeHeader,
    modelHeader,
    seriesHeader,
    genderHeader,
    structureHeader,
    mountingHeader,
    tubeHeader,
    materialHeader,
    colorHeader,
    drawing2dHeader,
  ].filter(Boolean);

  report.push(
    `| Excel行 | ${displayHeaders.join(" | ")} |`
  );

  report.push(
    `|---|${displayHeaders.map(() => "---").join("|")}|`
  );

  records
    .slice(0, 30)
    .forEach((record) => {
      report.push(
        `| ${record.excelRow} | ${displayHeaders
          .map((header) =>
            text(
              record[header]
            ).replace(/\|/g, "\\|")
          )
          .join(" | ")} |`
      );
    });

  report.push("");
}

report.push("## 2. 初步筛选规划");
report.push("");
report.push("最终仍以 Excel 实际字段为准，初步建议顺序：");
report.push("");
report.push("```text");
report.push("1. 鲁尔端类型：公鲁尔 / 母鲁尔");
report.push("2. 连接结构：旋转 / 固定 / 一体式 / 面板安装");
report.push("3. 接管内径");
report.push("4. 螺纹或安装方式");
report.push("5. 材质");
report.push("6. 颜色");
report.push("```");
report.push("");

report.push("## 3. 下一步");
report.push("");
report.push("检查报告确认后再进行：");
report.push("");
report.push("1. 确定鲁尔接头的产品分类和筛选项；");
report.push("2. 生成选型数据；");
report.push("3. 导入产品 JPG；");
report.push("4. 接入筛选页面；");
report.push("5. 最后生成详情页。");
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
console.log("============================================");
console.log("鲁尔接头数据源检查完成");
console.log("============================================");
console.log(
  `命中工作表：${candidateSheets.length}`
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何代码。"
);
