const fs = require("fs");
const path = require("path");

let XLSX;

try {
  XLSX = require("xlsx");
} catch {
  throw new Error(
    "项目中没有找到xlsx依赖，请先执行：npm install xlsx"
  );
}

const root = process.cwd();

const assetRoot =
  "H:\\01-官网项目\\02_产品中心\\fit\\Quick connector";

const excelPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const sheetName =
  "04_快插接头";

const jsonReportPath = path.join(
  root,
  "reports",
  "quick-connect-asset-mapping-audit.json"
);

const markdownReportPath = path.join(
  root,
  "reports",
  "quick-connect-asset-mapping-audit.md"
);

function ensureExists(
  targetPath,
  label
) {
  if (
    !fs.existsSync(
      targetPath
    )
  ) {
    throw new Error(
      label +
      "不存在：" +
      targetPath
    );
  }
}

function walk(
  directory,
  output = []
) {
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
        output
      );
    } else {
      output.push(
        fullPath
      );
    }
  }

  return output;
}

function clean(
  value
) {
  return String(
    value ?? ""
  ).trim();
}

function normalizeKey(
  value
) {
  return clean(
    value
  )
    .toLowerCase()
    .replace(
      /\.[a-z0-9]+$/i,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      ""
    );
}

function isMeaningfulCode(
  value
) {
  const text =
    clean(
      value
    );

  if (
    !text
  ) {
    return false;
  }

  return ![
    "√",
    "有",
    "是",
    "yes",
    "true",
    "-",
    "—",
  ].includes(
    text.toLowerCase()
  );
}

function findColumn(
  headers,
  aliases
) {
  return headers.find(
    (header) =>
      aliases.some(
        (alias) =>
          clean(
            header
          ) ===
          alias
      )
  );
}

function fileType(
  filePath
) {
  const extension =
    path.extname(
      filePath
    ).toLowerCase();

  if (
    [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".bmp",
      ".tif",
      ".tiff",
    ].includes(
      extension
    )
  ) {
    return "image";
  }

  if (
    extension ===
    ".pdf"
  ) {
    return "pdf";
  }

  if (
    [
      ".step",
      ".stp",
      ".igs",
      ".iges",
      ".x_t",
      ".x_b",
      ".sldprt",
      ".prt",
    ].includes(
      extension
    )
  ) {
    return "model3d";
  }

  return "other";
}

function getMatches(
  files,
  keys
) {
  const validKeys =
    Array.from(
      new Set(
        keys
          .map(
            normalizeKey
          )
          .filter(
            (key) =>
              key.length >=
              4
          )
      )
    );

  if (
    validKeys.length ===
    0
  ) {
    return [];
  }

  return files.filter(
    (file) => {
      const baseName =
        normalizeKey(
          path.basename(
            file.fullPath
          )
        );

      return validKeys.some(
        (key) =>
          baseName ===
            key ||
          baseName.startsWith(
            key
          ) ||
          baseName.includes(
            key
          )
      );
    }
  );
}

ensureExists(
  assetRoot,
  "快插接头资源目录"
);

ensureExists(
  excelPath,
  "连接件在售清单"
);

const allFilePaths =
  walk(
    assetRoot
  );

const files =
  allFilePaths.map(
    (fullPath) => ({
      fullPath,

      relativePath:
        path
          .relative(
            assetRoot,
            fullPath
          )
          .replace(
            /\\/g,
            "/"
          ),

      fileName:
        path.basename(
          fullPath
        ),

      type:
        fileType(
          fullPath
        ),

      extension:
        path
          .extname(
            fullPath
          )
          .toLowerCase(),

      normalizedName:
        normalizeKey(
          path.basename(
            fullPath
          )
        ),
    })
  );

const workbook =
  XLSX.readFile(
    excelPath,
    {
      cellDates: false,
    }
  );

if (
  !workbook.SheetNames.includes(
    sheetName
  )
) {
  throw new Error(
    "Excel中没有找到工作表：" +
    sheetName +
    "\n现有工作表：" +
    workbook.SheetNames.join(
      "、"
    )
  );
}

const sheet =
  workbook.Sheets[
    sheetName
  ];

const rows =
  XLSX.utils.sheet_to_json(
    sheet,
    {
      defval: "",
      raw: false,
    }
  );

if (
  rows.length ===
  0
) {
  throw new Error(
    "快插接头工作表没有数据。"
  );
}

const headers =
  Object.keys(
    rows[0]
  );

const modelColumn =
  findColumn(
    headers,
    [
      "恒永达型号",
      "型号",
      "产品型号",
    ]
  );

const productCodeColumn =
  findColumn(
    headers,
    [
      "商品编码",
      "产品编码",
      "物料编码",
    ]
  );

const drawing2dColumn =
  findColumn(
    headers,
    [
      "2D图编码",
      "2D图纸编码",
      "二维图编码",
      "二维图纸编码",
    ]
  );

const model3dColumn =
  findColumn(
    headers,
    [
      "3D图编码",
      "3D模型编码",
      "三维图编码",
      "三维模型编码",
    ]
  );

if (
  !modelColumn
) {
  throw new Error(
    "没有识别到恒永达型号列。\n实际表头：" +
    headers.join(
      "、"
    )
  );
}

const validRows =
  rows
    .map(
      (
        row,
        index
      ) => ({
        sourceRow:
          index + 2,

        model:
          clean(
            row[
              modelColumn
            ]
          ),

        productCode:
          productCodeColumn
            ? clean(
                row[
                  productCodeColumn
                ]
              )
            : "",

        drawing2dCode:
          drawing2dColumn
            ? clean(
                row[
                  drawing2dColumn
                ]
              )
            : "",

        model3dCode:
          model3dColumn
            ? clean(
                row[
                  model3dColumn
                ]
              )
            : "",
      })
    )
    .filter(
      (row) =>
        /^Q(?:20|40|60)/i.test(
          row.model
        )
    );

const imageFiles =
  files.filter(
    (file) =>
      file.type ===
      "image"
  );

const pdfFiles =
  files.filter(
    (file) =>
      file.type ===
      "pdf"
  );

const model3dFiles =
  files.filter(
    (file) =>
      file.type ===
      "model3d"
  );

const mappings =
  validRows.map(
    (row) => {
      const baseKeys = [
        row.model,
        row.productCode,
      ];

      const drawingKeys = [
        ...baseKeys,

        isMeaningfulCode(
          row.drawing2dCode
        )
          ? row.drawing2dCode
          : "",
      ];

      const model3dKeys = [
        ...baseKeys,

        isMeaningfulCode(
          row.model3dCode
        )
          ? row.model3dCode
          : "",
      ];

      const imageMatches =
        getMatches(
          imageFiles,
          baseKeys
        );

      const pdfMatches =
        getMatches(
          pdfFiles,
          drawingKeys
        );

      const model3dMatches =
        getMatches(
          model3dFiles,
          model3dKeys
        );

      return {
        ...row,

        imageMatches:
          imageMatches.map(
            (file) =>
              file.relativePath
          ),

        pdfMatches:
          pdfMatches.map(
            (file) =>
              file.relativePath
          ),

        model3dMatches:
          model3dMatches.map(
            (file) =>
              file.relativePath
          ),
      };
    }
  );

const matchedImageRows =
  mappings.filter(
    (item) =>
      item.imageMatches.length >
      0
  );

const matchedPdfRows =
  mappings.filter(
    (item) =>
      item.pdfMatches.length >
      0
  );

const matched3dRows =
  mappings.filter(
    (item) =>
      item.model3dMatches.length >
      0
  );

const multipleImageRows =
  mappings.filter(
    (item) =>
      item.imageMatches.length >
      1
  );

const multiplePdfRows =
  mappings.filter(
    (item) =>
      item.pdfMatches.length >
      1
  );

const usedFiles =
  new Set(
    mappings.flatMap(
      (item) => [
        ...item.imageMatches,
        ...item.pdfMatches,
        ...item.model3dMatches,
      ]
    )
  );

const unmatchedFiles =
  files.filter(
    (file) =>
      !usedFiles.has(
        file.relativePath
      )
  );

const seriesCounts =
  validRows.reduce(
    (
      output,
      row
    ) => {
      const match =
        row.model.match(
          /^Q(?:20|40|60)/i
        );

      const series =
        match
          ? match[0].toUpperCase()
          : "UNKNOWN";

      output[
        series
      ] =
        (
          output[
            series
          ] ||
          0
        ) +
        1;

      return output;
    },
    {}
  );

const report = {
  createdAt:
    new Date()
      .toISOString(),

  assetRoot,

  excelPath:
    path
      .relative(
        root,
        excelPath
      )
      .replace(
        /\\/g,
        "/"
      ),

  sheetName,

  detectedColumns: {
    model:
      modelColumn,

    productCode:
      productCodeColumn,

    drawing2d:
      drawing2dColumn,

    model3d:
      model3dColumn,
  },

  excelHeaders:
    headers,

  counts: {
    excelRows:
      rows.length,

    validQuickConnectRows:
      validRows.length,

    series:
      seriesCounts,

    totalFiles:
      files.length,

    images:
      imageFiles.length,

    pdfs:
      pdfFiles.length,

    model3d:
      model3dFiles.length,

    other:
      files.filter(
        (file) =>
          file.type ===
          "other"
      ).length,

    matchedImageRows:
      matchedImageRows.length,

    matchedPdfRows:
      matchedPdfRows.length,

    matched3dRows:
      matched3dRows.length,

    missingImageRows:
      mappings.length -
      matchedImageRows.length,

    missingPdfRows:
      mappings.length -
      matchedPdfRows.length,

    multipleImageRows:
      multipleImageRows.length,

    multiplePdfRows:
      multiplePdfRows.length,

    unmatchedFiles:
      unmatchedFiles.length,
  },

  mappings,

  missingImages:
    mappings
      .filter(
        (item) =>
          item.imageMatches.length ===
          0
      )
      .map(
        (item) => ({
          sourceRow:
            item.sourceRow,

          model:
            item.model,

          productCode:
            item.productCode,
        })
      ),

  missingPdfs:
    mappings
      .filter(
        (item) =>
          item.pdfMatches.length ===
          0
      )
      .map(
        (item) => ({
          sourceRow:
            item.sourceRow,

          model:
            item.model,

          productCode:
            item.productCode,

          drawing2dCode:
            item.drawing2dCode,
        })
      ),

  multipleImageMatches:
    multipleImageRows,

  multiplePdfMatches:
    multiplePdfRows,

  unmatchedFiles:
    unmatchedFiles.map(
      (file) => ({
        type:
          file.type,

        relativePath:
          file.relativePath,
      })
    ),
};

fs.mkdirSync(
  path.dirname(
    jsonReportPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  jsonReportPath,
  JSON.stringify(
    report,
    null,
    2
  ) +
    "\n",
  "utf8"
);

const md = [];

md.push(
  "# 快插接头图片与PDF图纸映射检查报告"
);

md.push("");

md.push(
  `生成时间：${report.createdAt}`
);

md.push("");

md.push(
  "## 一、数据源"
);

md.push("");

md.push(
  `- 资源目录：\`${assetRoot}\``
);

md.push(
  `- Excel：\`${report.excelPath}\``
);

md.push(
  `- 工作表：\`${sheetName}\``
);

md.push("");

md.push(
  "## 二、识别到的字段"
);

md.push("");

md.push(
  `- 型号列：${modelColumn || "未识别"}`
);

md.push(
  `- 商品编码列：${productCodeColumn || "未识别"}`
);

md.push(
  `- 2D图编码列：${drawing2dColumn || "未识别"}`
);

md.push(
  `- 3D图编码列：${model3dColumn || "未识别"}`
);

md.push("");

md.push(
  "## 三、统计"
);

md.push("");

md.push(
  `- 快插接头有效型号：${validRows.length}`
);

md.push(
  `- Q20：${seriesCounts.Q20 || 0}`
);

md.push(
  `- Q40：${seriesCounts.Q40 || 0}`
);

md.push(
  `- Q60：${seriesCounts.Q60 || 0}`
);

md.push(
  `- 图片文件：${imageFiles.length}`
);

md.push(
  `- PDF文件：${pdfFiles.length}`
);

md.push(
  `- 3D文件：${model3dFiles.length}`
);

md.push("");

md.push(
  "## 四、匹配结果"
);

md.push("");

md.push(
  `- 已匹配图片的型号：${matchedImageRows.length}`
);

md.push(
  `- 缺少图片的型号：${mappings.length - matchedImageRows.length}`
);

md.push(
  `- 已匹配PDF的型号：${matchedPdfRows.length}`
);

md.push(
  `- 缺少PDF的型号：${mappings.length - matchedPdfRows.length}`
);

md.push(
  `- 已匹配3D文件的型号：${matched3dRows.length}`
);

md.push(
  `- 图片存在多个候选的型号：${multipleImageRows.length}`
);

md.push(
  `- PDF存在多个候选的型号：${multiplePdfRows.length}`
);

md.push("");

md.push(
  "## 五、前20条映射示例"
);

md.push("");

md.push(
  "| 型号 | 商品编码 | 图片 | PDF | 3D |"
);

md.push(
  "|---|---|---:|---:|---:|"
);

for (
  const item of mappings.slice(
    0,
    20
  )
) {
  md.push(
    `| ${item.model} | ${item.productCode} | ${item.imageMatches.length} | ${item.pdfMatches.length} | ${item.model3dMatches.length} |`
  );
}

md.push("");

md.push(
  "## 六、缺少图片的前30个型号"
);

md.push("");

for (
  const item of report.missingImages.slice(
    0,
    30
  )
) {
  md.push(
    `- ${item.model}｜商品编码 ${item.productCode}`
  );
}

md.push("");

md.push(
  "## 七、缺少PDF的前30个型号"
);

md.push("");

for (
  const item of report.missingPdfs.slice(
    0,
    30
  )
) {
  md.push(
    `- ${item.model}｜商品编码 ${item.productCode}｜2D图编码 ${item.drawing2dCode || "空"}`
  );
}

md.push("");

md.push(
  "## 八、未匹配资源文件前50项"
);

md.push("");

for (
  const item of report.unmatchedFiles.slice(
    0,
    50
  )
) {
  md.push(
    `- [${item.type}] ${item.relativePath}`
  );
}

md.push("");

fs.writeFileSync(
  markdownReportPath,
  md.join(
    "\n"
  ) +
    "\n",
  "utf8"
);

console.log("");

console.log(
  "快插接头资源检查完成。"
);

console.log(
  "有效型号：" +
  validRows.length
);

console.log(
  "图片文件：" +
  imageFiles.length
);

console.log(
  "PDF文件：" +
  pdfFiles.length
);

console.log(
  "匹配图片型号：" +
  matchedImageRows.length
);

console.log(
  "匹配PDF型号：" +
  matchedPdfRows.length
);

console.log("");

console.log(
  "Markdown报告："
);

console.log(
  path.relative(
    root,
    markdownReportPath
  )
);

console.log("");

console.log(
  "JSON详细报告："
);

console.log(
  path.relative(
    root,
    jsonReportPath
  )
);