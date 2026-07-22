/**
 * 螺纹转倒刺接头详情页接入审计
 *
 * 只读取，不修改任何项目文件。
 *
 * 输出：
 * reports/thread-to-barbed-detail-audit.md
 *
 * 使用：
 * node scripts/products/audit-thread-to-barbed-detail.cjs
 */

const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const root = process.cwd();

const sourceJpgDir = String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图_JPG`;
const sourcePdfDir = String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图纸_PDF`;

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "thread-to-barbed-detail-audit.md"
);

const candidateFiles = [
  "app/products/fittings/barbed-fittings/[slug]/page.tsx",
  "app/products/fittings/quick-connect-fittings/[slug]/page.tsx",
  "app/products/[category]/[slug]/[seriesSlug]/page.tsx",
  "components/products/detail/ProductDetailClient.tsx",
  "data/products/generated/fittings/barbed-fittings/detail/index.json",
  "data/products/generated/fittings/quick-connect-fittings/detail/index.json",
  "scripts/products/setup-barbed-fitting-detail-like-hard-tube.cjs",
  "scripts/products/setup-quick-connect-model-detail-like-barbed.cjs",
];

function text(value) {
  return value == null ? "" : String(value).trim();
}

function normalizeKey(value) {
  return text(value)
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/\.[^.]+$/g, "")
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  }).outputText;

  const loaded = new Module(filePath, module);
  loaded.filename = filePath;
  loaded.paths = Module._nodeModulePaths(path.dirname(filePath));
  loaded._compile(compiled, filePath);

  return loaded.exports;
}

function listFiles(dirPath, extensions) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((name) =>
      extensions.some((ext) =>
        name.toLowerCase().endsWith(ext)
      )
    )
    .sort((a, b) =>
      a.localeCompare(b, "zh-CN", { numeric: true })
    );
}

function firstLines(filePath, maxLines = 120) {
  if (!fs.existsSync(filePath)) {
    return "未找到";
  }

  const lines = fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/);

  return lines
    .slice(0, maxLines)
    .map((line, index) =>
      `${String(index + 1).padStart(5, " ")}: ${line}`
    )
    .join("\n");
}

function countBy(items, getter) {
  const result = {};

  for (const item of items) {
    const key = text(getter(item)) || "（空）";
    result[key] = (result[key] || 0) + 1;
  }

  return result;
}

if (!fs.existsSync(selectionPath)) {
  throw new Error(
    `未找到筛选数据：${selectionPath}`
  );
}

const selectionModule = loadTsModule(selectionPath);

const products =
  selectionModule.threadToBarbedFittingSelectionProducts || [];

const jpgFiles = listFiles(
  sourceJpgDir,
  [".jpg", ".jpeg", ".png", ".webp"]
);

const pdfFiles = listFiles(
  sourcePdfDir,
  [".pdf"]
);

const jpgMap = new Map(
  jpgFiles.map((fileName) => [
    normalizeKey(fileName),
    fileName,
  ])
);

const pdfMap = new Map(
  pdfFiles.map((fileName) => [
    normalizeKey(fileName),
    fileName,
  ])
);

const modelRows = products.map((product) => {
  const model = text(
    product.model ||
      product.foreachModel ||
      product.cardTitle?.zh
  );

  const key = normalizeKey(model);

  return {
    productCode:
      product.productCode ||
      product.productId ||
      "",
    model,
    slug: key,
    jpg: jpgMap.get(key) || "",
    pdf: pdfMap.get(key) || "",
    imageCard: text(product.imageCard),
  };
});

const duplicateSlugMap = new Map();

for (const row of modelRows) {
  if (!duplicateSlugMap.has(row.slug)) {
    duplicateSlugMap.set(row.slug, []);
  }

  duplicateSlugMap.get(row.slug).push({
    model: row.model,
    productCode: row.productCode,
  });
}

const duplicateSlugs = Array.from(
  duplicateSlugMap.entries()
)
  .filter(([, rows]) => rows.length > 1)
  .map(([slug, rows]) => ({
    slug,
    rows,
  }));

const matchedJpg = modelRows.filter((row) => row.jpg);
const matchedPdf = modelRows.filter((row) => row.pdf);
const missingJpg = modelRows.filter((row) => !row.jpg);
const missingPdf = modelRows.filter((row) => !row.pdf);

const usedJpgKeys = new Set(
  matchedJpg.map((row) => normalizeKey(row.jpg))
);
const usedPdfKeys = new Set(
  matchedPdf.map((row) => normalizeKey(row.pdf))
);

const unusedJpg = jpgFiles.filter(
  (fileName) =>
    !usedJpgKeys.has(normalizeKey(fileName))
);

const unusedPdf = pdfFiles.filter(
  (fileName) =>
    !usedPdfKeys.has(normalizeKey(fileName))
);

const report = [];

report.push("# 螺纹转倒刺接头详情页接入审计");
report.push("");
report.push(`生成时间：${new Date().toLocaleString("zh-CN")}`);
report.push("");
report.push("> 本次只检查，没有修改任何代码或文件。");
report.push("");

report.push("## 1. 数据概况");
report.push("");
report.push(`- 筛选型号数量：**${products.length}**`);
report.push(`- JPG 文件数量：**${jpgFiles.length}**`);
report.push(`- PDF 文件数量：**${pdfFiles.length}**`);
report.push(`- JPG 成功匹配：**${matchedJpg.length}**`);
report.push(`- JPG 未匹配型号：**${missingJpg.length}**`);
report.push(`- PDF 成功匹配：**${matchedPdf.length}**`);
report.push(`- PDF 未匹配型号：**${missingPdf.length}**`);
report.push(`- 重复 slug 组数：**${duplicateSlugs.length}**`);
report.push("");

report.push("## 2. 系列数量");
report.push("");
report.push("```json");
report.push(
  JSON.stringify(
    countBy(products, (item) => item.seriesCode),
    null,
    2
  )
);
report.push("```");
report.push("");

report.push("## 3. 推荐详情结构");
report.push("");
report.push("```text");
report.push("data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json");
report.push("app/products/fittings/thread-to-barbed-fittings/[slug]/page.tsx");
report.push("components/products/detail/ProductDetailClient.tsx");
report.push("```");
report.push("");
report.push("建议继续使用：");
report.push("");
report.push("```ts");
report.push('detailMode: "standard_model"');
report.push('productTypeId: "thread-to-barbed-fittings"');
report.push("```");
report.push("");

report.push("## 4. 型号与资源匹配");
report.push("");
report.push("| 商品编码 | 型号 | slug | JPG | PDF |");
report.push("|---|---|---|---|---|");

for (const row of modelRows) {
  report.push(
    `| ${row.productCode} | ${row.model} | ${row.slug} | ${
      row.jpg || "缺失"
    } | ${row.pdf || "缺失"} |`
  );
}

report.push("");

report.push("## 5. 未匹配 JPG 的型号");
report.push("");

if (missingJpg.length === 0) {
  report.push("无。");
} else {
  missingJpg.forEach((row) => {
    report.push(
      `- ${row.model}（${row.productCode}）`
    );
  });
}

report.push("");

report.push("## 6. 未匹配 PDF 的型号");
report.push("");

if (missingPdf.length === 0) {
  report.push("无。");
} else {
  missingPdf.forEach((row) => {
    report.push(
      `- ${row.model}（${row.productCode}）`
    );
  });
}

report.push("");

report.push("## 7. 未使用 JPG");
report.push("");

if (unusedJpg.length === 0) {
  report.push("无。");
} else {
  unusedJpg.forEach((fileName) => {
    report.push(`- ${fileName}`);
  });
}

report.push("");

report.push("## 8. 未使用 PDF");
report.push("");

if (unusedPdf.length === 0) {
  report.push("无。");
} else {
  unusedPdf.forEach((fileName) => {
    report.push(`- ${fileName}`);
  });
}

report.push("");

report.push("## 9. 重复 slug");
report.push("");

if (duplicateSlugs.length === 0) {
  report.push("无。");
} else {
  duplicateSlugs.forEach((group) => {
    report.push(`### ${group.slug}`);
    report.push("");

    group.rows.forEach((row) => {
      report.push(
        `- ${row.model}（${row.productCode}）`
      );
    });

    report.push("");
  });
}

report.push("## 10. 现有详情页参考文件");
report.push("");

for (const relativePath of candidateFiles) {
  const absolutePath = path.join(root, relativePath);

  report.push(`### ${relativePath}`);
  report.push("");

  if (!fs.existsSync(absolutePath)) {
    report.push("> 未找到");
    report.push("");
    continue;
  }

  report.push("```text");
  report.push(firstLines(absolutePath, 140));
  report.push("```");
  report.push("");
}

report.push("## 11. 下一步");
report.push("");
report.push("检查报告确认后，下一步只做：");
report.push("");
report.push("1. 生成详情 JSON；");
report.push("2. 导入 JPG 主图；");
report.push("3. 导入 PDF 二维图；");
report.push("4. 暂不修改公共详情组件；");
report.push("5. 暂不做型号选择交互。");
report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  { recursive: true }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺详情页审计完成");
console.log("============================================");
console.log(`型号数量：${products.length}`);
console.log(`JPG 匹配：${matchedJpg.length}/${products.length}`);
console.log(`PDF 匹配：${matchedPdf.length}/${products.length}`);
console.log(`重复 slug：${duplicateSlugs.length}`);
console.log(`报告：${reportPath}`);
console.log("");
console.log("本次未修改任何代码。");
