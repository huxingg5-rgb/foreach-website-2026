const fs = require("node:fs");
const path = require("node:path");

const project = process.cwd();

const sourceDir = String.raw`H:\01-官网项目\02_产品中心\fit\Quick connector\快插2D图纸_PDF`;

const mappingPath = path.join(
  project,
  "快插接头_图纸映射.json"
);

const dataPath = path.join(
  project,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "detail",
  "index.json"
);

const destinationDir = path.join(
  project,
  "public",
  "documents",
  "products",
  "fittings",
  "quick-connect-fittings",
  "drawings"
);

const publicUrlBase =
  "/documents/products/fittings/quick-connect-fittings/drawings";

const reportPath = path.join(
  project,
  "快插2D图纸正式导入报告.txt"
);

function readJson(filePath) {
  const content = fs
    .readFileSync(filePath, "utf8")
    .replace(/^\uFEFF/, "");

  return JSON.parse(content);
}

function toText(value) {
  return String(value ?? "").trim();
}

function timestamp() {
  const now = new Date();

  const pad = (value) =>
    String(value).padStart(2, "0");

  return (
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    "-" +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

function findProductArray(root) {
  if (Array.isArray(root)) {
    return root;
  }

  const preferredKeys = [
    "products",
    "items",
    "details",
    "records",
    "list",
    "data",
  ];

  for (const key of preferredKeys) {
    if (Array.isArray(root?.[key])) {
      return root[key];
    }
  }

  const arrayCandidates = Object.values(root || {})
    .filter(
      (value) =>
        Array.isArray(value) &&
        value.some(
          (item) =>
            item &&
            typeof item === "object" &&
            !Array.isArray(item)
        )
    )
    .sort((a, b) => b.length - a.length);

  if (arrayCandidates.length > 0) {
    return arrayCandidates[0];
  }

  throw new Error(
    "无法在官网 JSON 中找到产品数组。"
  );
}

function getProductCode(product, mappingCodeSet) {
  const candidateKeys = [
    "productCode",
    "product_code",
    "commodityCode",
    "commodity_code",
    "goodsCode",
    "goods_code",
    "itemCode",
    "item_code",
    "sku",
    "code",
  ];

  for (const key of candidateKeys) {
    const value = toText(product?.[key]);

    if (/^\d{6}$/.test(value)) {
      return value;
    }
  }

  // 只在当前产品对象的第一层字段中查找，
  // 并且只接受映射清单中存在的六位编码。
  for (const value of Object.values(product || {})) {
    if (
      typeof value !== "string" &&
      typeof value !== "number"
    ) {
      continue;
    }

    const text = toText(value);

    if (
      /^\d{6}$/.test(text) &&
      mappingCodeSet.has(text)
    ) {
      return text;
    }
  }

  return "";
}

function getProductModel(product) {
  const keys = [
    "model",
    "modelName",
    "productName",
    "name",
    "title",
    "slug",
  ];

  for (const key of keys) {
    const value = toText(product?.[key]);

    if (value) {
      return value;
    }
  }

  return "";
}

function getSeries(model) {
  const normalized = toText(model).toUpperCase();
  const match = normalized.match(/^Q(20|40|60)/);

  return match ? `Q${match[1]}` : "其他";
}

function ensureFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `${label}不存在：${filePath}`
    );
  }
}

ensureFileExists(sourceDir, "图纸源目录");
ensureFileExists(mappingPath, "映射文件");
ensureFileExists(dataPath, "官网快插数据");

const mappingRoot = readJson(mappingPath);
const websiteRoot = readJson(dataPath);

const mappings = Array.isArray(mappingRoot)
  ? mappingRoot
  : mappingRoot.mappings;

if (!Array.isArray(mappings)) {
  throw new Error(
    "映射文件中没有找到 mappings 数组。"
  );
}

const products = findProductArray(websiteRoot);

const mappingCodeSet = new Set(
  mappings
    .map((item) => toText(item.productCode))
    .filter(Boolean)
);

// ------------------------------------------------------------
// 检查映射编码重复
// ------------------------------------------------------------

const mappingCodeCounts = new Map();

for (const mapping of mappings) {
  const code = toText(mapping.productCode);

  mappingCodeCounts.set(
    code,
    (mappingCodeCounts.get(code) || 0) + 1
  );
}

const duplicateMappingCodes = [
  ...mappingCodeCounts.entries(),
]
  .filter(([, count]) => count > 1)
  .map(([code]) => code);

if (duplicateMappingCodes.length > 0) {
  throw new Error(
    "映射商品编码重复：" +
      duplicateMappingCodes.join(", ")
  );
}

// ------------------------------------------------------------
// 建立官网商品编码索引
// ------------------------------------------------------------

const websiteByCode = new Map();
const websiteDuplicateCodes = [];

for (const product of products) {
  const code = getProductCode(
    product,
    mappingCodeSet
  );

  if (!code) {
    continue;
  }

  if (websiteByCode.has(code)) {
    websiteDuplicateCodes.push(code);
    continue;
  }

  websiteByCode.set(code, product);
}

if (websiteDuplicateCodes.length > 0) {
  throw new Error(
    "官网存在重复商品编码：" +
      websiteDuplicateCodes.join(", ")
  );
}

// ------------------------------------------------------------
// 划分有效和无效映射
// ------------------------------------------------------------

const validMappings = [];
const missingWebsiteMappings = [];

for (const mapping of mappings) {
  const code = toText(mapping.productCode);

  if (websiteByCode.has(code)) {
    validMappings.push(mapping);
  } else {
    missingWebsiteMappings.push(mapping);
  }
}

// ------------------------------------------------------------
// 导入前检查全部 PDF
// ------------------------------------------------------------

const uniquePdfFiles = [
  ...new Set(
    validMappings
      .map((mapping) =>
        toText(mapping.pdfFile)
      )
      .filter(Boolean)
  ),
].sort();

const missingSourcePdfs = uniquePdfFiles.filter(
  (pdfFile) =>
    !fs.existsSync(
      path.join(sourceDir, pdfFile)
    )
);

if (missingSourcePdfs.length > 0) {
  throw new Error(
    "源目录缺少 PDF：\n" +
      missingSourcePdfs.join("\n")
  );
}

// 所有检查通过后才开始写入
fs.mkdirSync(destinationDir, {
  recursive: true,
});

const backupPath =
  dataPath + `.bak_${timestamp()}`;

fs.copyFileSync(dataPath, backupPath);

// ------------------------------------------------------------
// 复制 PDF
// ------------------------------------------------------------

for (const pdfFile of uniquePdfFiles) {
  const sourcePath = path.join(
    sourceDir,
    pdfFile
  );

  const destinationPath = path.join(
    destinationDir,
    pdfFile
  );

  fs.copyFileSync(
    sourcePath,
    destinationPath
  );
}

// ------------------------------------------------------------
// 写入产品图纸地址
// ------------------------------------------------------------

const importedCodes = new Set();
const importedRows = [];

for (const mapping of validMappings) {
  const code = toText(mapping.productCode);
  const pdfFile = toText(mapping.pdfFile);
  const product = websiteByCode.get(code);

  const drawingUrl =
    `${publicUrlBase}/${pdfFile}`;

  product.drawing2dUrl = drawingUrl;
  product.drawingPdfUrl = drawingUrl;

  importedCodes.add(code);

  importedRows.push({
    code,
    model:
      getProductModel(product) ||
      toText(mapping.websiteStructuralModel),
    pdfFile,
    matchResult:
      toText(mapping.matchResult),
  });
}

fs.writeFileSync(
  dataPath,
  JSON.stringify(websiteRoot, null, 2) + "\n",
  "utf8"
);

// ------------------------------------------------------------
// 写入后验证
// ------------------------------------------------------------

const verifyRoot = readJson(dataPath);
const verifyProducts = findProductArray(
  verifyRoot
);

const verifiedCodes = new Set();

for (const product of verifyProducts) {
  const code = getProductCode(
    product,
    mappingCodeSet
  );

  if (!importedCodes.has(code)) {
    continue;
  }

  const drawingUrl = toText(
    product.drawing2dUrl
  );

  const expectedMapping =
    validMappings.find(
      (mapping) =>
        toText(mapping.productCode) === code
    );

  const expectedUrl =
    `${publicUrlBase}/${toText(
      expectedMapping.pdfFile
    )}`;

  if (drawingUrl === expectedUrl) {
    verifiedCodes.add(code);
  }
}

if (
  verifiedCodes.size !==
  validMappings.length
) {
  throw new Error(
    `写入验证失败：预计 ${validMappings.length} 个，实际验证 ${verifiedCodes.size} 个。备份：${backupPath}`
  );
}

// ------------------------------------------------------------
// 未映射官网产品
// ------------------------------------------------------------

const unmappedWebsiteRows = [];

for (const [code, product] of websiteByCode) {
  if (importedCodes.has(code)) {
    continue;
  }

  unmappedWebsiteRows.push({
    code,
    model: getProductModel(product),
  });
}

unmappedWebsiteRows.sort((a, b) =>
  a.code.localeCompare(b.code)
);

// ------------------------------------------------------------
// 统计系列
// ------------------------------------------------------------

const seriesCounts = {
  Q20: 0,
  Q40: 0,
  Q60: 0,
  其他: 0,
};

for (const row of importedRows) {
  const series = getSeries(row.model);

  seriesCounts[series] =
    (seriesCounts[series] || 0) + 1;
}

// ------------------------------------------------------------
// 生成报告
// ------------------------------------------------------------

const report = [];

report.push("快插 2D 图纸正式导入报告");
report.push(
  `生成时间：${new Date().toLocaleString()}`
);
report.push(`项目：${project}`);
report.push(`官网数据备份：${backupPath}`);
report.push("");

report.push(
  "============================================================"
);
report.push("一、导入结果");
report.push(
  "============================================================"
);
report.push(
  `映射清单产品：${mappings.length}`
);
report.push(
  `成功导入官网产品：${validMappings.length}`
);
report.push(
  `成功复制唯一 PDF：${uniquePdfFiles.length}`
);
report.push(
  `写入后验证通过：${verifiedCodes.size}`
);
report.push(
  `官网不存在的映射：${missingWebsiteMappings.length}`
);
report.push(
  `官网仍未映射产品：${unmappedWebsiteRows.length}`
);
report.push("");

report.push(
  `Q20 已导入：${seriesCounts.Q20}`
);
report.push(
  `Q40 已导入：${seriesCounts.Q40}`
);
report.push(
  `Q60 已导入：${seriesCounts.Q60}`
);

report.push("");
report.push(
  "============================================================"
);
report.push("二、官网不存在的映射");
report.push(
  "============================================================"
);

if (missingWebsiteMappings.length === 0) {
  report.push("没有发现。");
} else {
  for (const mapping of missingWebsiteMappings) {
    report.push(
      [
        toText(mapping.productCode),
        toText(
          mapping.websiteStructuralModel
        ),
        toText(mapping.pdfFile),
      ].join(" | ")
    );
  }
}

report.push("");
report.push(
  "============================================================"
);
report.push("三、官网仍未映射产品");
report.push(
  "============================================================"
);

if (unmappedWebsiteRows.length === 0) {
  report.push("没有发现。");
} else {
  for (const row of unmappedWebsiteRows) {
    report.push(
      `${row.code} | ${row.model}`
    );
  }
}

report.push("");
report.push(
  "============================================================"
);
report.push("四、已导入明细");
report.push(
  "============================================================"
);

for (
  const row of importedRows.sort((a, b) =>
    a.code.localeCompare(b.code)
  )
) {
  report.push(
    [
      row.code,
      row.model,
      row.pdfFile,
      row.matchResult,
    ].join(" | ")
  );
}

fs.writeFileSync(
  reportPath,
  "\uFEFF" + report.join("\r\n"),
  "utf8"
);

console.log("");
console.log("快插 2D 图纸导入完成。");
console.log(
  `成功导入产品：${validMappings.length}`
);
console.log(
  `成功复制 PDF：${uniquePdfFiles.length}`
);
console.log(
  `官网不存在映射：${missingWebsiteMappings.length}`
);
console.log(
  `官网仍未映射：${unmappedWebsiteRows.length}`
);
console.log("");
console.log(`备份：${backupPath}`);
console.log(`报告：${reportPath}`);
console.log("");