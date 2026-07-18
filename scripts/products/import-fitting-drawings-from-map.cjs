/* =========================================================
   import-fitting-drawings-from-map.cjs
   FOREACH 官网｜倒刺接头和螺纹转倒刺接头图纸接入脚本

   作用：
   1. 读取已经核对好的图纸对应关系 JSON
   2. 按产品类型复制 PDF 到 public 目录
   3. 按商品编码优先、型号辅助匹配详情数据
   4. 写入 drawingPdfUrl、drawingUrl、drawingPdf
   5. 修改前自动备份详情 JSON
   6. 输出匹配、缺图、未匹配报告

   注意：
   - 不修改 ProductDetailClient.tsx
   - 不修改页面样式
   - 不修改产品文案
   - 不删除原始 PDF
========================================================= */

const fs = require("fs");
const path = require("path");

const root = process.cwd();

/* =========================================================
   一、寻找图纸对应关系 JSON

   优先读取 H 盘资料目录。
   同时保留项目根目录作为备用位置。
========================================================= */
const mappingCandidates = [
  "H:\\01-官网项目\\02_产品中心\\fit\\接头图纸对应关系\\fitting-drawing-map.barbed-and-thread-to-barbed.json",
  path.join(
    root,
    "fitting-drawing-map.barbed-and-thread-to-barbed.json"
  ),
];

const mappingPath = mappingCandidates.find((filePath) =>
  fs.existsSync(filePath)
);

if (!mappingPath) {
  console.error("");
  console.error("没有找到接头图纸对应关系 JSON。");
  console.error("请将文件放到下面任一位置：");

  for (const filePath of mappingCandidates) {
    console.error(`- ${filePath}`);
  }

  process.exit(1);
}

/* =========================================================
   二、产品类型配置

   detailFile：
   当前产品详情最终使用的数据文件。

   publicDirectory：
   PDF 在项目中的实际存储目录。

   publicUrlBase：
   浏览器访问 PDF 时使用的网站路径。
========================================================= */
const productTypeConfigs = {
  倒刺接头: {
    key: "barbed-fittings",
    detailFile: path.join(
      root,
      "data",
      "products",
      "generated",
      "fittings",
      "barbed-fittings",
      "detail",
      "index.json"
    ),
    publicDirectory: path.join(
      root,
      "public",
      "documents",
      "products",
      "fittings",
      "barbed-fittings",
      "drawings"
    ),
    publicUrlBase:
      "/documents/products/fittings/barbed-fittings/drawings",
  },

  螺纹转倒刺接头: {
    key: "thread-to-barbed-fittings",
    detailFile: path.join(
      root,
      "data",
      "products",
      "generated",
      "fittings",
      "thread-to-barbed-fittings",
      "detail",
      "index.json"
    ),
    publicDirectory: path.join(
      root,
      "public",
      "documents",
      "products",
      "fittings",
      "thread-to-barbed-fittings",
      "drawings"
    ),
    publicUrlBase:
      "/documents/products/fittings/thread-to-barbed-fittings/drawings",
  },
};

/* =========================================================
   三、基础工具函数
========================================================= */

/**
 * 读取 JSON 文件。
 */
function readJson(filePath) {
  const content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(content);
}

/**
 * 写入格式化 JSON。
 */
function writeJson(filePath, value) {
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`,
    "utf8"
  );
}

/**
 * 统一商品编码格式。
 * 防止 Excel 导出的编码出现 809276.0。
 */
function normalizeCode(value) {
  return String(value ?? "")
    .trim()
    .replace(/\.0$/, "");
}

/**
 * 统一型号格式。
 */
function normalizeModel(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

/**
 * 生成 Windows 文件名可用的时间戳。
 */
function createTimestamp() {
  const now = new Date();

  const pad = (value) => String(value).padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "_",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
}

/**
 * 转义 CSV 单元格。
 */
function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

/**
 * 从产品详情对象中读取可能的商品编码。
 */
function getProductCodes(product) {
  return [
    product.productCode,
    product.productId,
    product.code,
    product.sku,
    product.itemCode,
    product.goodsCode,
  ]
    .map(normalizeCode)
    .filter(Boolean);
}

/**
 * 从产品详情对象中读取可能的型号。
 */
function getProductModels(product) {
  return [
    product.model,
    product.modelDisplay,
    product.displayModel,
    product.foreachModel,
    product.title,
  ]
    .map(normalizeModel)
    .filter(Boolean);
}

/**
 * 先按商品编码匹配，再按完整型号匹配。
 *
 * 商品编码优先的原因：
 * 同一个结构型号可能存在不同材质、颜色或其他配置，
 * 商品编码更适合定位具体官网产品记录。
 */
function findProduct(detailData, mappingItem) {
  const expectedCode = normalizeCode(mappingItem.productCode);
  const expectedModel = normalizeModel(mappingItem.model);

  if (expectedCode) {
    const byCode = detailData.find((product) =>
      getProductCodes(product).includes(expectedCode)
    );

    if (byCode) {
      return {
        product: byCode,
        matchMethod: "productCode",
      };
    }
  }

  if (expectedModel) {
    const byModel = detailData.find((product) =>
      getProductModels(product).includes(expectedModel)
    );

    if (byModel) {
      return {
        product: byModel,
        matchMethod: "model",
      };
    }
  }

  return null;
}

/* =========================================================
   四、读取映射表
========================================================= */
const mappingData = readJson(mappingPath);

if (!Array.isArray(mappingData)) {
  throw new Error("图纸对应关系 JSON 顶层必须是数组。");
}

console.log("");
console.log("==============================================");
console.log("FOREACH 接头图纸接入");
console.log("==============================================");
console.log(`映射文件：${mappingPath}`);
console.log(`映射记录：${mappingData.length}`);

/* =========================================================
   五、读取详情数据并创建备份
========================================================= */
const timestamp = createTimestamp();
const detailStores = {};

for (const [productType, config] of Object.entries(productTypeConfigs)) {
  if (!fs.existsSync(config.detailFile)) {
    throw new Error(
      `没有找到 ${productType} 详情数据：${config.detailFile}`
    );
  }

  const detailData = readJson(config.detailFile);

  if (!Array.isArray(detailData)) {
    throw new Error(
      `${productType} 详情数据顶层不是数组：${config.detailFile}`
    );
  }

  const backupFile = `${config.detailFile}.bak_drawing_${timestamp}`;

  fs.copyFileSync(config.detailFile, backupFile);
  fs.mkdirSync(config.publicDirectory, {
    recursive: true,
  });

  detailStores[productType] = {
    config,
    detailData,
    backupFile,
  };

  console.log("");
  console.log(`${productType}详情记录：${detailData.length}`);
  console.log(`备份文件：${backupFile}`);
}

/* =========================================================
   六、复制 PDF 并写入图纸字段
========================================================= */
const results = [];
const modifiedProducts = new Set();

for (const mappingItem of mappingData) {
  const productType = String(mappingItem.productType ?? "").trim();
  const store = detailStores[productType];

  const baseResult = {
    productType,
    productCode: normalizeCode(mappingItem.productCode),
    model: String(mappingItem.model ?? "").trim(),
    structureModel: String(mappingItem.structureModel ?? "").trim(),
    partNumber: String(mappingItem.partNumber ?? "").trim(),
    sourcePdfPath: String(mappingItem.sourcePdfPath ?? "").trim(),
    pdfFileName: String(mappingItem.pdfFileName ?? "").trim(),
    status: "",
    matchMethod: "",
    websitePdfUrl: "",
    message: "",
  };

  if (!store) {
    results.push({
      ...baseResult,
      status: "unsupported-product-type",
      message: "映射表中的产品类型不在本次处理范围内",
    });
    continue;
  }

  if (!baseResult.sourcePdfPath) {
    results.push({
      ...baseResult,
      status: "missing-source-path",
      message: "映射记录没有 sourcePdfPath",
    });
    continue;
  }

  if (!fs.existsSync(baseResult.sourcePdfPath)) {
    results.push({
      ...baseResult,
      status: "missing-source-pdf",
      message: "H盘源 PDF 不存在",
    });
    continue;
  }

  const matched = findProduct(store.detailData, mappingItem);

  if (!matched) {
    results.push({
      ...baseResult,
      status: "product-not-found",
      message: "详情 JSON 中没有找到对应商品编码或型号",
    });
    continue;
  }

  const finalPdfFileName =
    baseResult.pdfFileName ||
    path.basename(baseResult.sourcePdfPath);

  const destinationPdfPath = path.join(
    store.config.publicDirectory,
    finalPdfFileName
  );

  const websitePdfUrl =
    `${store.config.publicUrlBase}/${finalPdfFileName}`;

  /*
     复制 PDF：
     -Force 对应 Node 中直接覆盖目标文件。
     原始 H 盘 PDF 不会被删除或移动。
  */
  fs.copyFileSync(
    baseResult.sourcePdfPath,
    destinationPdfPath
  );

  /*
     写入详情页现有识别字段。

     三个字段保持一致，是为了兼容当前详情页不同数据读取入口。
  */
  matched.product.drawingPdfUrl = websitePdfUrl;
  matched.product.drawingUrl = websitePdfUrl;
  matched.product.drawingPdf = websitePdfUrl;

  /*
     drawingSource 用于内部追溯：
     不直接作为前台文案使用。
  */
  matched.product.drawingSource = {
    sourceFile: finalPdfFileName,
    sourcePartNumber: baseResult.partNumber,
    structureModel: baseResult.structureModel,
    matchRule:
      matched.matchMethod === "productCode"
        ? `商品编码 ${baseResult.productCode} 精确匹配`
        : `完整型号 ${baseResult.model} 精确匹配`,
  };

  const uniqueProductKey =
    `${productType}:${baseResult.productCode}:${baseResult.model}`;

  modifiedProducts.add(uniqueProductKey);

  results.push({
    ...baseResult,
    status: "matched",
    matchMethod: matched.matchMethod,
    websitePdfUrl,
    message: "PDF 已复制，详情图纸字段已写入",
  });
}

/* =========================================================
   七、保存详情 JSON
========================================================= */
for (const [productType, store] of Object.entries(detailStores)) {
  writeJson(store.config.detailFile, store.detailData);

  console.log("");
  console.log(`已更新：${productType}`);
  console.log(store.config.detailFile);
}

/* =========================================================
   八、输出审查报告
========================================================= */
const reportDirectory = path.join(root, "reports");

fs.mkdirSync(reportDirectory, {
  recursive: true,
});

const summary = results.reduce((output, result) => {
  output[result.status] = (output[result.status] || 0) + 1;
  return output;
}, {});

const typeSummary = {};

for (const result of results) {
  if (!typeSummary[result.productType]) {
    typeSummary[result.productType] = {};
  }

  const current = typeSummary[result.productType];

  current[result.status] = (current[result.status] || 0) + 1;
}

const report = {
  generatedAt: new Date().toISOString(),
  mappingPath,
  mappingCount: mappingData.length,
  modifiedProductCount: modifiedProducts.size,
  summary,
  typeSummary,
  backups: Object.fromEntries(
    Object.entries(detailStores).map(([productType, store]) => [
      productType,
      store.backupFile,
    ])
  ),
  results,
};

const jsonReportPath = path.join(
  reportDirectory,
  "fitting-drawing-import-report.json"
);

const csvReportPath = path.join(
  reportDirectory,
  "fitting-drawing-import-report.csv"
);

writeJson(jsonReportPath, report);

const csvHeaders = [
  "productType",
  "productCode",
  "model",
  "structureModel",
  "partNumber",
  "pdfFileName",
  "status",
  "matchMethod",
  "websitePdfUrl",
  "sourcePdfPath",
  "message",
];

const csvLines = [
  csvHeaders.map(csvCell).join(","),
  ...results.map((result) =>
    csvHeaders.map((header) => csvCell(result[header])).join(",")
  ),
];

fs.writeFileSync(
  csvReportPath,
  `\uFEFF${csvLines.join("\r\n")}\r\n`,
  "utf8"
);

/* =========================================================
   九、终端汇总
========================================================= */
console.log("");
console.log("==============================================");
console.log("接入结果");
console.log("==============================================");
console.log(`成功对应：${summary.matched || 0}`);
console.log(`详情中未找到产品：${summary["product-not-found"] || 0}`);
console.log(`H盘缺少 PDF：${summary["missing-source-pdf"] || 0}`);
console.log(`缺少源路径：${summary["missing-source-path"] || 0}`);
console.log(
  `不支持的产品类型：${summary["unsupported-product-type"] || 0}`
);
console.log("");
console.log(`JSON 报告：${jsonReportPath}`);
console.log(`CSV 报告：${csvReportPath}`);
console.log("");

if (
  (summary["product-not-found"] || 0) > 0 ||
  (summary["missing-source-pdf"] || 0) > 0
) {
  console.warn("存在未对应项目，请先查看 CSV 报告。");
} else {
  console.log("全部映射记录已完成接入。");
}
