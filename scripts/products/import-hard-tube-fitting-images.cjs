const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const XLSX = require("xlsx");

const root = process.cwd();
const sourceDir = path.resolve(process.argv[2] || "");

const workbookPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "hard-tube-fitting-selection.generated.ts"
);

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-hard-tube-fitting-selection.cjs"
);

const imageMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "hard-tube-fitting-image-map.generated.json"
);

const outputRoot = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "hard-tube-fittings"
);

const reportPath = path.join(
  root,
  "hard-tube-fitting-image-import-report.md"
);

const allowedExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

const unsupportedImageExtensions = new Set([
  ".bmp",
  ".tif",
  ".tiff",
  ".gif",
  ".heic",
  ".avif",
]);

function ensureFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`找不到${label}：${filePath}`);
  }
}

function normalizeMatchText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toUpperCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function slugify(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractModelCode(value) {
  const text = String(value || "")
    .normalize("NFKC")
    .toUpperCase();

  const matches =
    text.match(
      /[A-Z][A-Z0-9]*-[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+/g
    ) || [];

  return matches[0] || "";
}

function walkFiles(directory) {
  const output = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      output.push(...walkFiles(fullPath));
      continue;
    }

    output.push(fullPath);
  }

  return output;
}

function sourceImageRank(filePath) {
  const name = path.basename(filePath, path.extname(filePath))
    .normalize("NFKC")
    .toLowerCase();

  if (
    name.includes("main") ||
    name.includes("主图") ||
    name.includes("封面") ||
    name.includes("正面")
  ) {
    return 0;
  }

  if (/(^|[^0-9])0?1([^0-9]|$)/.test(name)) {
    return 1;
  }

  if (/(^|[^0-9])0?2([^0-9]|$)/.test(name)) {
    return 2;
  }

  return 20;
}

function uniqueBy(array, getter) {
  const seen = new Set();

  return array.filter((item) => {
    const key = getter(item);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

ensureFile(workbookPath, "硬管接头在售清单");
ensureFile(generatedPath, "硬管接头生成数据");
ensureFile(generatorPath, "硬管接头生成脚本");

if (!sourceDir || !fs.existsSync(sourceDir)) {
  throw new Error(`找不到图片源目录：${sourceDir}`);
}

fs.mkdirSync(outputRoot, {
  recursive: true,
});

/*
 * 读取权威Excel，取得：
 * 型号、商品编码、料号、产品系列。
 */
const workbook = XLSX.readFile(workbookPath);
const sheet = workbook.Sheets["01_硬管接头"];

if (!sheet) {
  throw new Error("Excel中找不到工作表：01_硬管接头");
}

const rows = XLSX.utils.sheet_to_json(sheet, {
  header: 1,
  defval: "",
  raw: false,
}).slice(2);

const workbookRecordMap = new Map();

for (const row of rows) {
  const sourceProductType = String(row[0] || "").trim();
  const sourceSeries = String(row[1] || "").trim();
  const partNumber = String(row[2] || "").trim();
  const sourceModelText = String(row[3] || "").trim();
  const productCode = String(row[4] || "")
    .trim()
    .replace(/\.0+$/, "");

  const modelCode = extractModelCode(sourceModelText);

  if (!modelCode) {
    continue;
  }

  workbookRecordMap.set(modelCode, {
    modelCode,
    productCode,
    partNumber,
    sourceSeries,
    sourceProductType,
  });
}

/*
 * 从当前网站生成数据读取：
 * productId、seriesId、完整型号。
 */
const generatedContent = fs.readFileSync(
  generatedPath,
  "utf8"
);

const records = [];
const objectPattern =
  /\{\s*"productId":\s*"([^"]+)"[\s\S]*?"seriesId":\s*"([^"]+)"[\s\S]*?"cardTitle":\s*\{\s*"zh":\s*"([^"]+)"/g;

let objectMatch;

while (
  (objectMatch = objectPattern.exec(generatedContent)) !== null
) {
  const productId = objectMatch[1];
  const seriesId = objectMatch[2];
  const modelCode = objectMatch[3].toUpperCase();

  const workbookRecord =
    workbookRecordMap.get(modelCode) || {};

  const modelParts = modelCode.split("-");
  const structureCode =
    modelParts.length >= 3
      ? modelParts.slice(0, 3).join("-")
      : modelCode;

  records.push({
    productId,
    seriesId,
    modelCode,
    structureCode,
    productCode:
      workbookRecord.productCode || productId,
    partNumber:
      workbookRecord.partNumber || "",
    sourceSeries:
      workbookRecord.sourceSeries || "",
  });
}

const uniqueRecords = uniqueBy(
  records,
  (record) => record.modelCode
);

if (uniqueRecords.length < 100) {
  throw new Error(
    `从网站数据中只读取到 ${uniqueRecords.length} 个硬管接头型号，停止导入。`
  );
}

/*
 * 建立所有产品系列文件夹。
 */
const seriesIds = Array.from(
  new Set(
    uniqueRecords.map((record) => record.seriesId)
  )
).sort();

for (const seriesId of seriesIds) {
  fs.mkdirSync(
    path.join(outputRoot, seriesId),
    {
      recursive: true,
    }
  );
}

const rootReadme = [
  "FOREACH 硬管接头图片目录",
  "",
  "目录结构：",
  "hard-tube-fittings / 产品系列 / 图片",
  "",
  "图片与SKU的对应关系由以下文件维护：",
  "data/products/selection/hard-tube-fitting-image-map.generated.json",
  "",
  "请不要直接修改 generated.ts 中的图片路径。",
  "重新运行图片导入脚本即可更新映射。",
  "",
].join("\r\n");

fs.writeFileSync(
  path.join(outputRoot, "README.txt"),
  rootReadme,
  "utf8"
);

/*
 * 为每个产品建立多级匹配键。
 *
 * 优先级：
 * 1. 完整型号
 * 2. 商品编码
 * 3. 料号
 * 4. 前三段结构型号
 */
const matchEntries = [];

for (const record of uniqueRecords) {
  const entries = [
    {
      type: "model",
      display: record.modelCode,
      value: record.modelCode,
      priority: 400,
    },
    {
      type: "productCode",
      display: record.productCode,
      value: record.productCode,
      priority: 390,
    },
    {
      type: "partNumber",
      display: record.partNumber,
      value: record.partNumber,
      priority: 380,
    },
    {
      type: "structure",
      display: record.structureCode,
      value: record.structureCode,
      priority: 300,
    },
  ];

  for (const entry of entries) {
    const normalized = normalizeMatchText(
      entry.value
    );

    if (normalized.length < 4) {
      continue;
    }

    matchEntries.push({
      ...entry,
      normalized,
      record,
      score:
        entry.priority * 1000 +
        normalized.length,
    });
  }
}

const allFiles = walkFiles(sourceDir);

const supportedFiles = allFiles
  .filter((filePath) =>
    allowedExtensions.has(
      path.extname(filePath).toLowerCase()
    )
  )
  .sort((current, next) => {
    return (
      sourceImageRank(current) -
        sourceImageRank(next) ||
      current.localeCompare(next, "zh-CN", {
        numeric: true,
      })
    );
  });

const unsupportedFiles = allFiles.filter((filePath) =>
  unsupportedImageExtensions.has(
    path.extname(filePath).toLowerCase()
  )
);

const unmatchedFiles = [];
const ambiguousFiles = [];
const copiedFiles = [];
const modelImageMap = {};
const targetNameCounters = new Map();

for (const sourceFile of supportedFiles) {
  const relativeSource = path.relative(
    sourceDir,
    sourceFile
  );

  /*
   * 文件夹名称和文件名同时参与匹配。
   * 例如：
   * HF-M6-20\01.png
   * 也能识别为HF-M6-20结构图片。
   */
  const normalizedSource =
    normalizeMatchText(relativeSource);

  const matches = matchEntries.filter((entry) =>
    normalizedSource.includes(entry.normalized)
  );

  if (matches.length === 0) {
    unmatchedFiles.push(relativeSource);
    continue;
  }

  const highestScore = Math.max(
    ...matches.map((entry) => entry.score)
  );

  const bestMatches = matches.filter(
    (entry) => entry.score === highestScore
  );

  const matchedRecords = uniqueBy(
    bestMatches.map((entry) => entry.record),
    (record) => record.modelCode
  );

  const matchedSeries = Array.from(
    new Set(
      matchedRecords.map(
        (record) => record.seriesId
      )
    )
  );

  if (matchedSeries.length !== 1) {
    ambiguousFiles.push({
      file: relativeSource,
      models: matchedRecords.map(
        (record) => record.modelCode
      ),
    });
    continue;
  }

  const bestEntry = bestMatches[0];
  const seriesId = matchedSeries[0];

  /*
   * 完整型号图片按完整型号命名。
   * 结构共享图片按前三段结构型号命名。
   */
  const targetBase =
    bestEntry.type === "structure"
      ? slugify(
          bestEntry.record.structureCode
        )
      : slugify(
          bestEntry.record.modelCode
        );

  const counterKey = `${seriesId}/${targetBase}`;
  const nextIndex =
    (targetNameCounters.get(counterKey) || 0) + 1;

  targetNameCounters.set(
    counterKey,
    nextIndex
  );

  const sourceExtension =
    path.extname(sourceFile).toLowerCase();

  const targetFilename =
    nextIndex === 1
      ? `${targetBase}-main${sourceExtension}`
      : `${targetBase}-${String(
          nextIndex
        ).padStart(2, "0")}${sourceExtension}`;

  const targetDirectory = path.join(
    outputRoot,
    seriesId
  );

  fs.mkdirSync(targetDirectory, {
    recursive: true,
  });

  const targetPath = path.join(
    targetDirectory,
    targetFilename
  );

  fs.copyFileSync(
    sourceFile,
    targetPath
  );

  const publicPath =
    "/" +
    path
      .relative(
        path.join(root, "public"),
        targetPath
      )
      .split(path.sep)
      .join("/");

  for (const record of matchedRecords) {
    if (!modelImageMap[record.modelCode]) {
      modelImageMap[record.modelCode] = {
        imageCard: publicPath,
        images: [],
        sourceFiles: [],
      };
    }

    if (
      !modelImageMap[
        record.modelCode
      ].images.includes(publicPath)
    ) {
      modelImageMap[
        record.modelCode
      ].images.push(publicPath);
    }

    modelImageMap[
      record.modelCode
    ].sourceFiles.push(relativeSource);
  }

  copiedFiles.push({
    source: relativeSource,
    target: publicPath,
    matchType: bestEntry.type,
    matchKey: bestEntry.display,
    models: matchedRecords.map(
      (record) => record.modelCode
    ),
  });
}

const sortedImageMap = Object.fromEntries(
  Object.entries(modelImageMap).sort(
    ([current], [next]) =>
      current.localeCompare(next, "en", {
        numeric: true,
      })
  )
);

fs.writeFileSync(
  imageMapPath,
  JSON.stringify(
    sortedImageMap,
    null,
    2
  ) + "\n",
  "utf8"
);

/*
 * 将图片映射接入硬管接头生成脚本。
 */
let generatorContent = fs.readFileSync(
  generatorPath,
  "utf8"
);

const mapMarkerStart =
  "/* HARD_TUBE_IMAGE_MAP_START */";

if (!generatorContent.includes(mapMarkerStart)) {
  const productsAnchor =
    "const products = records.map((record, index) => {";

  if (!generatorContent.includes(productsAnchor)) {
    throw new Error(
      "没有找到硬管接头products生成位置。"
    );
  }

  const mapLoader = `/* HARD_TUBE_IMAGE_MAP_START */
const imageMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "hard-tube-fitting-image-map.generated.json"
);

const imageMap = fs.existsSync(imageMapPath)
  ? JSON.parse(
      fs.readFileSync(imageMapPath, "utf8")
    )
  : {};
/* HARD_TUBE_IMAGE_MAP_END */

`;

  generatorContent =
    generatorContent.replace(
      productsAnchor,
      mapLoader + productsAnchor
    );
}

const oldImageLine =
  '    imageCard: "/images/logo/foreach-logo-color.svg",';

const newImageBlock = `    imageCard:
      imageMap[modelCode]?.imageCard ||
      "/images/logo/foreach-logo-color.svg",`;

if (generatorContent.includes(oldImageLine)) {
  generatorContent =
    generatorContent.replace(
      oldImageLine,
      newImageBlock
    );
} else if (
  !generatorContent.includes(
    "imageMap[modelCode]?.imageCard"
  )
) {
  throw new Error(
    "没有找到imageCard占位图位置。"
  );
}

fs.writeFileSync(
  generatorPath,
  generatorContent,
  "utf8"
);

/*
 * 重新生成硬管接头卡片数据。
 */
const generateResult = spawnSync(
  process.execPath,
  [
    generatorPath,
    workbookPath,
  ],
  {
    cwd: root,
    stdio: "inherit",
  }
);

if (generateResult.status !== 0) {
  throw new Error(
    "硬管接头数据重新生成失败。"
  );
}

/*
 * 输出检查报告。
 */
const matchedModelCount =
  Object.keys(sortedImageMap).length;

const reportLines = [
  "# 硬管接头图片导入报告",
  "",
  `- 图片源目录：${sourceDir}`,
  `- 网站图片目录：${outputRoot}`,
  `- 网站硬管接头型号数：${uniqueRecords.length}`,
  `- 扫描到支持的图片数：${supportedFiles.length}`,
  `- 成功复制图片数：${copiedFiles.length}`,
  `- 已匹配型号数：${matchedModelCount}`,
  `- 未匹配图片数：${unmatchedFiles.length}`,
  `- 匹配冲突图片数：${ambiguousFiles.length}`,
  `- 不支持格式图片数：${unsupportedFiles.length}`,
  "",
  "## 网站文件夹",
  "",
  ...seriesIds.map(
    (seriesId) => `- ${seriesId}`
  ),
  "",
  "## 成功对应",
  "",
];

for (const item of copiedFiles) {
  reportLines.push(
    `### ${item.source}`,
    "",
    `- 匹配方式：${item.matchType}`,
    `- 匹配依据：${item.matchKey}`,
    `- 网站路径：${item.target}`,
    `- 对应型号：${item.models.join("、")}`,
    ""
  );
}

reportLines.push(
  "## 无法自动确认的图片",
  ""
);

if (unmatchedFiles.length === 0) {
  reportLines.push("- 无", "");
} else {
  for (const file of unmatchedFiles) {
    reportLines.push(`- ${file}`);
  }
  reportLines.push("");
}

reportLines.push(
  "## 存在匹配冲突的图片",
  ""
);

if (ambiguousFiles.length === 0) {
  reportLines.push("- 无", "");
} else {
  for (const item of ambiguousFiles) {
    reportLines.push(
      `- ${item.file}：${item.models.join("、")}`
    );
  }
  reportLines.push("");
}

reportLines.push(
  "## 暂不支持的图片格式",
  ""
);

if (unsupportedFiles.length === 0) {
  reportLines.push("- 无", "");
} else {
  for (const file of unsupportedFiles) {
    reportLines.push(
      `- ${path.relative(sourceDir, file)}`
    );
  }
  reportLines.push("");
}

fs.writeFileSync(
  reportPath,
  reportLines.join("\n"),
  "utf8"
);

console.log("");
console.log("===== 硬管接头图片导入完成 =====");
console.log(`扫描图片：${supportedFiles.length}`);
console.log(`复制图片：${copiedFiles.length}`);
console.log(`匹配型号：${matchedModelCount}`);
console.log(`未匹配图片：${unmatchedFiles.length}`);
console.log(`匹配冲突：${ambiguousFiles.length}`);
console.log(`检查报告：${reportPath}`);
console.log(`图片映射：${imageMapPath}`);
console.log(`网站目录：${outputRoot}`);