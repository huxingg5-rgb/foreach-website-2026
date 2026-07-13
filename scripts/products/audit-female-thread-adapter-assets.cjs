const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const imageSourceDir =
  String.raw`H:\01-官网项目\02_产品中心\fit\Union\螺纹互转产品图_JPG`;

const drawingSourceDir =
  String.raw`H:\01-官网项目\02_产品中心\fit\Union\螺纹互转2D图纸_PDF`;

const sourceDir = path.join(
  root,
  "data-source",
  "product-center",
  "fittings"
);

const sheetName =
  "07_内螺纹互转接头";

const reportPath = path.join(
  root,
  "reports",
  "female-thread-adapter-assets-audit.md"
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

function normalize(value) {
  return text(value)
    .replace(/\.[^.]+$/g, "")
    .replace(/\s+/g, "")
    .replace(/[（）()_\-./\\]/g, "")
    .toUpperCase();
}

function normalizeRelativePath(value) {
  return value
    .split(path.sep)
    .join("/");
}

function walkFiles(
  directory,
  extensions
) {
  if (!fs.existsSync(directory)) {
    throw new Error(
      "未找到目录：" +
        directory
    );
  }

  const result = [];

  function walk(currentDir) {
    const entries =
      fs.readdirSync(
        currentDir,
        {
          withFileTypes: true,
        }
      );

    for (const entry of entries) {
      const fullPath =
        path.join(
          currentDir,
          entry.name
        );

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (
        !extensions.some(
          (extension) =>
            entry.name
              .toLowerCase()
              .endsWith(extension)
        )
      ) {
        continue;
      }

      result.push({
        fileName:
          entry.name,

        fullPath,

        relativePath:
          normalizeRelativePath(
            path.relative(
              directory,
              fullPath
            )
          ),

        baseName:
          path.parse(
            entry.name
          ).name,

        normalized:
          normalize(
            entry.name
          ),
      });
    }
  }

  walk(directory);

  return result.sort(
    (a, b) =>
      a.relativePath.localeCompare(
        b.relativePath,
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
      path.join(
        sourceDir,
        name
      )
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

function extractModelCode(
  fullModel
) {
  const value =
    text(fullModel);

  const match =
    value.match(
      /([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)$/i
    );

  return match
    ? match[1].toUpperCase()
    : "";
}

function findExactFile(
  files,
  candidateNames
) {
  const normalizedCandidates =
    candidateNames
      .map(normalize)
      .filter(Boolean);

  return (
    files.find(
      (file) =>
        normalizedCandidates.includes(
          file.normalized
        )
    ) || null
  );
}

function findPossibleFiles(
  files,
  candidateNames
) {
  const normalizedCandidates =
    candidateNames
      .map(normalize)
      .filter(
        (value) =>
          value.length >= 5
      );

  return files
    .filter((file) =>
      normalizedCandidates.some(
        (candidate) =>
          file.normalized.includes(
            candidate
          ) ||
          candidate.includes(
            file.normalized
          )
      )
    )
    .slice(0, 5);
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
  workbook.Sheets[
    sheetName
  ];

if (!sheet) {
  throw new Error(
    "未找到工作表：" +
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

const records =
  rows
    .slice(1)
    .map(
      (row, index) => ({
        excelRow:
          index + 2,

        productType:
          text(row[0]),

        series:
          text(row[1]),

        itemNumber:
          text(row[2]),

        fullModel:
          text(row[3]),

        productCode:
          text(row[4]),

        drawing2DFlag:
          text(row[10]),

        drawing3DFlag:
          text(row[11]),
      })
    )
    .filter(
      (record) =>
        record.productType &&
        record.itemNumber &&
        record.fullModel &&
        record.productCode
    )
    .map((record) => ({
      ...record,
      model:
        extractModelCode(
          record.fullModel
        ),
    }));

if (records.length !== 24) {
  throw new Error(
    `有效产品数量异常：${records.length}`
  );
}

const imageFiles =
  walkFiles(
    imageSourceDir,
    [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ]
  );

const drawingFiles =
  walkFiles(
    drawingSourceDir,
    [".pdf"]
  );

const results = [];

for (const record of records) {
  const imageCandidates = [
    record.model,
    record.fullModel,
    record.itemNumber,
    record.productCode,
  ];

  const drawingCandidates = [
    `${record.itemNumber}-C`,
    record.itemNumber,
    record.model,
    record.fullModel,
  ];

  const imageMatch =
    findExactFile(
      imageFiles,
      imageCandidates
    );

  const drawingMatch =
    findExactFile(
      drawingFiles,
      drawingCandidates
    );

  const possibleImages =
    imageMatch
      ? []
      : findPossibleFiles(
          imageFiles,
          imageCandidates
        );

  const possibleDrawings =
    drawingMatch
      ? []
      : findPossibleFiles(
          drawingFiles,
          drawingCandidates
        );

  results.push({
    ...record,

    imageMatch:
      imageMatch
        ? imageMatch.relativePath
        : "",

    drawingMatch:
      drawingMatch
        ? drawingMatch.relativePath
        : "",

    possibleImages:
      possibleImages.map(
        (item) =>
          item.relativePath
      ),

    possibleDrawings:
      possibleDrawings.map(
        (item) =>
          item.relativePath
      ),
  });
}

const usedImages =
  new Set(
    results
      .map(
        (item) =>
          item.imageMatch
      )
      .filter(Boolean)
  );

const usedDrawings =
  new Set(
    results
      .map(
        (item) =>
          item.drawingMatch
      )
      .filter(Boolean)
  );

const unusedImages =
  imageFiles.filter(
    (file) =>
      !usedImages.has(
        file.relativePath
      )
  );

const unusedDrawings =
  drawingFiles.filter(
    (file) =>
      !usedDrawings.has(
        file.relativePath
      )
  );

const exactImageCount =
  results.filter(
    (item) =>
      item.imageMatch
  ).length;

const exactDrawingCount =
  results.filter(
    (item) =>
      item.drawingMatch
  ).length;

const report = [];

report.push(
  "# 内螺纹互转接头资源匹配检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查文件名，没有复制或修改任何网站资源。"
);
report.push("");

report.push(
  "## 1. 资源目录"
);
report.push("");

report.push(
  `- 产品图：\`${imageSourceDir}\``
);
report.push(
  `- 二维图纸：\`${drawingSourceDir}\``
);
report.push(
  `- 产品图文件：**${imageFiles.length}**`
);
report.push(
  `- PDF文件：**${drawingFiles.length}**`
);
report.push(
  `- Excel有效产品：**${records.length}**`
);
report.push("");

report.push(
  "## 2. 匹配结果汇总"
);
report.push("");

report.push(
  `- JPG精确匹配：**${exactImageCount}/${records.length}**`
);
report.push(
  `- PDF精确匹配：**${exactDrawingCount}/${records.length}**`
);
report.push(
  `- JPG未精确匹配：**${records.length - exactImageCount}**`
);
report.push(
  `- PDF未精确匹配：**${records.length - exactDrawingCount}**`
);
report.push("");

report.push(
  "## 3. 每个型号匹配结果"
);
report.push("");

report.push(
  "| Excel行 | 产品类型 | 料号 | 商品编码 | 型号 | 产品图 | 二维图纸 |"
);
report.push(
  "|---:|---|---|---|---|---|---|"
);

for (const item of results) {
  report.push(
    `| ${item.excelRow} | ${escapeCell(item.productType)} | ${escapeCell(item.itemNumber)} | ${escapeCell(item.productCode)} | ${escapeCell(item.model)} | ${escapeCell(item.imageMatch || "缺失")} | ${escapeCell(item.drawingMatch || "缺失")} |`
  );
}

report.push("");

report.push(
  "## 4. 未匹配产品图"
);
report.push("");

const missingImages =
  results.filter(
    (item) =>
      !item.imageMatch
  );

if (!missingImages.length) {
  report.push("无。");
} else {
  for (const item of missingImages) {
    report.push(
      `### ${item.model}｜${item.productCode}`
    );
    report.push("");
    report.push(
      `- 料号：${item.itemNumber}`
    );
    report.push(
      `- 完整名称：${item.fullModel}`
    );

    if (
      item.possibleImages.length
    ) {
      report.push(
        `- 可能对应：${item.possibleImages.join("、")}`
      );
    } else {
      report.push(
        "- 可能对应：未找到"
      );
    }

    report.push("");
  }
}

report.push(
  "## 5. 未匹配二维图纸"
);
report.push("");

const missingDrawings =
  results.filter(
    (item) =>
      !item.drawingMatch
  );

if (!missingDrawings.length) {
  report.push("无。");
} else {
  for (
    const item
    of missingDrawings
  ) {
    report.push(
      `### ${item.model}｜${item.productCode}`
    );
    report.push("");
    report.push(
      `- 料号：${item.itemNumber}`
    );
    report.push(
      `- Excel二维图标记：${item.drawing2DFlag || "空"}`
    );

    if (
      item.possibleDrawings.length
    ) {
      report.push(
        `- 可能对应：${item.possibleDrawings.join("、")}`
      );
    } else {
      report.push(
        "- 可能对应：未找到"
      );
    }

    report.push("");
  }
}

report.push(
  "## 6. 未使用产品图"
);
report.push("");

if (!unusedImages.length) {
  report.push("无。");
} else {
  for (const file of unusedImages) {
    report.push(
      `- ${file.relativePath}`
    );
  }
}

report.push("");

report.push(
  "## 7. 未使用二维图纸"
);
report.push("");

if (!unusedDrawings.length) {
  report.push("无。");
} else {
  for (
    const file
    of unusedDrawings
  ) {
    report.push(
      `- ${file.relativePath}`
    );
  }
}

report.push("");

report.push(
  "## 8. 建议匹配规则"
);
report.push("");

report.push(
  "```text"
);
report.push(
  "产品图：优先按正式型号匹配"
);
report.push(
  "示例：UT-U28-15-PP-N.jpg"
);
report.push("");
report.push(
  "二维图纸：优先按料号 + -C.pdf 匹配"
);
report.push(
  "示例：443-02-00260-C.pdf"
);
report.push(
  "```"
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
  "内螺纹互转接头资源检查完成"
);
console.log(
  "============================================"
);
console.log(
  `产品数量：${records.length}`
);
console.log(
  `产品图：${imageFiles.length}`
);
console.log(
  `PDF：${drawingFiles.length}`
);
console.log(
  `JPG精确匹配：${exactImageCount}/${records.length}`
);
console.log(
  `PDF精确匹配：${exactDrawingCount}/${records.length}`
);
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何网站文件。"
);
