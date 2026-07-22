const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const imageSourceDir =
  String.raw`H:\01-官网项目\02_产品中心\fit\Luer fitting\已压缩_JPG`;

const drawingSourceDir =
  String.raw`H:\01-官网项目\02_产品中心\fit\Luer fitting\luer 2D图纸`;

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
  "luer-fitting-assets-audit.md"
);

function text(value) {
  return value == null
    ? ""
    : String(value).trim();
}

function normalize(value) {
  return text(value)
    .replace(/\.[^.]+$/g, "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/μ/g, "U")
    .replace(/[^A-Z0-9]+/gi, "")
    .toUpperCase();
}

function escapeCell(value) {
  return text(value)
    .replace(/\r?\n/g, " / ")
    .replace(/\|/g, "\\|");
}

function listFiles(
  directory,
  extensions
) {
  if (!fs.existsSync(directory)) {
    throw new Error(
      "未找到目录：" +
        directory
    );
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) =>
      extensions.some((extension) =>
        fileName
          .toLowerCase()
          .endsWith(extension)
      )
    )
    .sort((a, b) =>
      a.localeCompare(
        b,
        "zh-CN",
        {
          numeric: true,
        }
      )
    );
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
      "未找到连接件标品在售清单。"
    );
  }

  return files[0];
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
    "没有找到工作表：" +
      sheetName
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

const headers =
  Array.from(
    {
      length: maxColumns,
    },
    (_, index) =>
      text(rows[0]?.[index]) ||
      `未命名列${index + 1}`
  );

const dataRows =
  rows
    .slice(1)
    .map(
      (row, index) => ({
        excelRow:
          index + 2,

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
    .filter((item) =>
      item.values.some(Boolean)
    );

const imageFiles =
  listFiles(
    imageSourceDir,
    [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ]
  );

const drawingFiles =
  listFiles(
    drawingSourceDir,
    [".pdf"]
  );

const imageMap =
  new Map();

for (const fileName of imageFiles) {
  const key =
    normalize(fileName);

  if (!imageMap.has(key)) {
    imageMap.set(
      key,
      fileName
    );
  }
}

const drawingMap =
  new Map();

for (const fileName of drawingFiles) {
  const key =
    normalize(fileName);

  if (!drawingMap.has(key)) {
    drawingMap.set(
      key,
      fileName
    );
  }
}

/*
 * 检查每一列与 JPG 文件名的匹配率，
 * 用于自动判断哪一列是真正的型号列。
 */
const columnScores =
  headers.map(
    (header, columnIndex) => {
      let imageMatchCount = 0;
      let drawingMatchCount = 0;
      let valueCount = 0;

      for (const row of dataRows) {
        const value =
          row.values[
            columnIndex
          ];

        if (!value) {
          continue;
        }

        valueCount += 1;

        const key =
          normalize(value);

        if (
          imageMap.has(key)
        ) {
          imageMatchCount += 1;
        }

        if (
          drawingMap.has(key)
        ) {
          drawingMatchCount += 1;
        }
      }

      return {
        columnIndex,
        excelColumn:
          XLSX.utils.encode_col(
            columnIndex
          ),
        header,
        valueCount,
        imageMatchCount,
        drawingMatchCount,
      };
    }
  );

const likelyModelColumn =
  [...columnScores]
    .sort(
      (a, b) =>
        b.imageMatchCount -
        a.imageMatchCount
    )[0];

const modelColumnIndex =
  likelyModelColumn
    ?.imageMatchCount > 0
      ? likelyModelColumn
          .columnIndex
      : -1;

const drawingCodeColumnIndex =
  headers.findIndex(
    (header) =>
      /2D图编码|二维图编码|2D/i.test(
        header
      )
  );

const productCodeColumnIndex =
  headers.findIndex(
    (header) =>
      /商品编码|物料编码/.test(
        header
      )
  );

const seriesColumnIndex =
  headers.findIndex(
    (header) =>
      /产品系列|^系列$/.test(
        header
      )
  );

const typeColumnIndex =
  headers.findIndex(
    (header) =>
      /产品类型/.test(
        header
      )
  );

const matches = [];
const missingImages = [];
const missingDrawings = [];

for (const row of dataRows) {
  const model =
    modelColumnIndex >= 0
      ? row.values[
          modelColumnIndex
        ]
      : "";

  const productCode =
    productCodeColumnIndex >= 0
      ? row.values[
          productCodeColumnIndex
        ]
      : "";

  const series =
    seriesColumnIndex >= 0
      ? row.values[
          seriesColumnIndex
        ]
      : "";

  const productType =
    typeColumnIndex >= 0
      ? row.values[
          typeColumnIndex
        ]
      : "";

  const drawingCode =
    drawingCodeColumnIndex >= 0
      ? row.values[
          drawingCodeColumnIndex
        ]
      : "";

  const imageKey =
    normalize(model);

  const imageFile =
    imageMap.get(imageKey) ||
    "";

  const drawingKey =
    normalize(drawingCode);

  const drawingFile =
    drawingMap.get(drawingKey) ||
    drawingMap.get(
      normalize(model)
    ) ||
    "";

  const item = {
    excelRow:
      row.excelRow,
    productCode,
    model,
    series,
    productType,
    drawingCode,
    imageFile,
    drawingFile,
  };

  matches.push(item);

  if (
    model &&
    !imageFile
  ) {
    missingImages.push(item);
  }

  if (
    drawingCode &&
    drawingCode !== "√" &&
    !drawingFile
  ) {
    missingDrawings.push(item);
  }
}

const usedImages =
  new Set(
    matches
      .map(
        (item) =>
          item.imageFile
      )
      .filter(Boolean)
  );

const usedDrawings =
  new Set(
    matches
      .map(
        (item) =>
          item.drawingFile
      )
      .filter(Boolean)
  );

const unusedImages =
  imageFiles.filter(
    (fileName) =>
      !usedImages.has(
        fileName
      )
  );

const unusedDrawings =
  drawingFiles.filter(
    (fileName) =>
      !usedDrawings.has(
        fileName
      )
  );

const report = [];

report.push(
  "# 鲁尔接头图片与二维图纸匹配检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有复制或修改任何文件。"
);
report.push("");

report.push("## 1. 资源目录");
report.push("");

report.push(
  `- 产品图：\`${imageSourceDir}\``
);
report.push(
  `- 二维图纸：\`${drawingSourceDir}\``
);
report.push(
  `- 产品图数量：**${imageFiles.length}**`
);
report.push(
  `- PDF数量：**${drawingFiles.length}**`
);
report.push("");

report.push(
  "## 2. Excel 列匹配评分"
);
report.push("");

report.push(
  "| Excel列 | 表头 | 有值数量 | JPG匹配数量 | PDF匹配数量 |"
);
report.push(
  "|---|---|---:|---:|---:|"
);

for (
  const item
  of columnScores
) {
  report.push(
    `| ${item.excelColumn} | ${escapeCell(item.header)} | ${item.valueCount} | ${item.imageMatchCount} | ${item.drawingMatchCount} |`
  );
}

report.push("");

report.push(
  `- 自动识别型号列：**${
    modelColumnIndex >= 0
      ? `${likelyModelColumn.excelColumn}列「${likelyModelColumn.header}」`
      : "未识别"
  }**`
);
report.push("");

report.push(
  "## 3. 型号资源匹配结果"
);
report.push("");

report.push(
  "| Excel行 | 商品编码 | 型号 | 产品系列 | 产品类型 | JPG | 2D图编码 | PDF |"
);
report.push(
  "|---:|---|---|---|---|---|---|---|"
);

for (const item of matches) {
  report.push(
    `| ${item.excelRow} | ${escapeCell(item.productCode)} | ${escapeCell(item.model)} | ${escapeCell(item.series)} | ${escapeCell(item.productType)} | ${escapeCell(item.imageFile || "缺失")} | ${escapeCell(item.drawingCode)} | ${escapeCell(item.drawingFile || "缺失")} |`
  );
}

report.push("");

report.push(
  "## 4. 未匹配产品图的型号"
);
report.push("");

if (!missingImages.length) {
  report.push("无。");
} else {
  for (
    const item
    of missingImages
  ) {
    report.push(
      `- ${item.model}（${item.productCode}）`
    );
  }
}

report.push("");

report.push(
  "## 5. 未匹配 PDF 的记录"
);
report.push("");

if (!missingDrawings.length) {
  report.push("无。");
} else {
  for (
    const item
    of missingDrawings
  ) {
    report.push(
      `- ${item.model}｜图号：${item.drawingCode}`
    );
  }
}

report.push("");

report.push(
  "## 6. 未使用产品图"
);
report.push("");

if (!unusedImages.length) {
  report.push("无。");
} else {
  for (
    const fileName
    of unusedImages
  ) {
    report.push(
      `- ${fileName}`
    );
  }
}

report.push("");

report.push(
  "## 7. 未使用 PDF"
);
report.push("");

if (!unusedDrawings.length) {
  report.push("无。");
} else {
  for (
    const fileName
    of unusedDrawings
  ) {
    report.push(
      `- ${fileName}`
    );
  }
}

report.push("");

report.push(
  "## 8. 下一步"
);
report.push("");

report.push(
  "确认本报告后再进行："
);
report.push("");

report.push(
  "1. 确认实际型号列；"
);
report.push(
  "2. 确认 JPG 与型号的命名关系；"
);
report.push(
  "3. 确认 PDF 使用型号还是 2D 图编码匹配；"
);
report.push(
  "4. 生成鲁尔接头选型数据；"
);
report.push(
  "5. 导入产品图和二维图纸。"
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
  "鲁尔接头资源检查完成"
);
console.log(
  "============================================"
);
console.log(
  `产品图：${imageFiles.length}`
);
console.log(
  `PDF：${drawingFiles.length}`
);
console.log(
  `型号列：${
    modelColumnIndex >= 0
      ? likelyModelColumn.excelColumn +
        " / " +
        likelyModelColumn.header
      : "未识别"
  }`
);
console.log(
  `JPG匹配：${
    matches.filter(
      (item) =>
        item.imageFile
    ).length
  }`
);
console.log(
  `PDF匹配：${
    matches.filter(
      (item) =>
        item.drawingFile
    ).length
  }`
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何项目文件。"
);
