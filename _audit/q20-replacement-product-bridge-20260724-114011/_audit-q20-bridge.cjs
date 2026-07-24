"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const projectPath = path.resolve(process.argv[2]);
const reportDirectory = path.resolve(process.argv[3]);
const ts = require(path.join(projectPath, "node_modules", "typescript", "lib", "typescript.js"));

const paths = {
  selection: path.join(projectPath, "data", "products", "selection", "quick-connect-fitting-selection.generated.ts"),
  compatibleModels: path.join(projectPath, "data", "resources", "fitting-replacement", "compatible-models.generated.ts"),
  compatibleProducts: path.join(projectPath, "data", "resources", "fitting-replacement", "all-compatible-products.generated.ts"),
  config: path.join(projectPath, "data", "resources", "fitting-replacement", "fitting-replacement-series.config.ts"),
  homeService: path.join(projectPath, "services", "resources", "getFittingReplacementHomeData.ts"),
  detailService: path.join(projectPath, "services", "resources", "getFittingReplacementDetailData.ts"),
  zhPage: path.join(projectPath, "app", "resources", "selection-support", "fitting-replacement", "page.tsx"),
  intlPage: path.join(projectPath, "app", "[locale]", "resources", "selection-support", "fitting-replacement", "page.tsx"),
  zhDetailPage: path.join(projectPath, "app", "resources", "selection-support", "fitting-replacement", "q20", "[productCode]", "page.tsx"),
  intlDetailPage: path.join(projectPath, "app", "[locale]", "resources", "selection-support", "fitting-replacement", "q20", "[productCode]", "page.tsx"),
};

for (const [name, filePath] of Object.entries(paths)) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`缺少必要文件：${name}\n${filePath}`);
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
}

function normalizeSlash(value) {
  return String(value || "").replace(/\\/g, "/");
}

function relative(filePath) {
  return normalizeSlash(path.relative(projectPath, filePath));
}

function normalizeText(value) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
}

function normalizeModel(value) {
  return normalizeText(value)
    .toUpperCase()
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(/\s+/g, "")
    .replace(/[｜|]/g, "-");
}

function normalizeProductCode(value) {
  return normalizeText(value).replace(/\.0$/, "");
}

function csvEscape(value) {
  const text = String(value == null ? "" : value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath, rows, columns) {
  const lines = [columns.map((column) => csvEscape(column.title)).join(",")];
  for (const row of rows) {
    lines.push(columns.map((column) => csvEscape(row[column.key])).join(","));
  }
  fs.writeFileSync(filePath, "\uFEFF" + lines.join("\r\n") + "\r\n", "utf8");
}

function writeText(filePath, lines) {
  fs.writeFileSync(filePath, "\uFEFF" + lines.join("\r\n") + "\r\n", "utf8");
}

const moduleCache = new Map();

function resolveProjectModule(request, parentFilename) {
  if (request.endsWith(".css") || request.endsWith(".scss") || request.endsWith(".sass")) {
    return { virtual: true, exports: {} };
  }
  if (request === "server-only") {
    return { virtual: true, exports: {} };
  }

  let basePath = null;
  if (request.startsWith("@/")) {
    basePath = path.join(projectPath, request.slice(2));
  } else if (request.startsWith(".")) {
    basePath = path.resolve(path.dirname(parentFilename), request);
  } else {
    return null;
  }

  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.cjs`,
    `${basePath}.mjs`,
    `${basePath}.json`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
    path.join(basePath, "index.js"),
    path.join(basePath, "index.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return { virtual: false, filePath: candidate };
    }
  }

  throw new Error(`无法解析模块：${request}\n引用文件：${parentFilename}`);
}

function loadProjectModule(filePath) {
  const resolvedPath = path.resolve(filePath);
  if (moduleCache.has(resolvedPath)) {
    return moduleCache.get(resolvedPath).exports;
  }

  const extension = path.extname(resolvedPath).toLowerCase();
  if (extension === ".json") {
    const exports = JSON.parse(readText(resolvedPath));
    moduleCache.set(resolvedPath, { exports });
    return exports;
  }
  if (extension === ".js" || extension === ".cjs") {
    return require(resolvedPath);
  }

  const sourceCode = readText(resolvedPath);
  const transpiled = ts.transpileModule(sourceCode, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      resolveJsonModule: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: resolvedPath,
    reportDiagnostics: false,
  }).outputText;

  const loadedModule = new Module(resolvedPath, module.parent);
  moduleCache.set(resolvedPath, loadedModule);
  loadedModule.filename = resolvedPath;
  loadedModule.paths = Module._nodeModulePaths(path.dirname(resolvedPath));

  const nativeRequire = loadedModule.require.bind(loadedModule);
  loadedModule.require = function customRequire(request) {
    const resolved = resolveProjectModule(request, resolvedPath);
    if (resolved && resolved.virtual) return resolved.exports;
    if (resolved && resolved.filePath) return loadProjectModule(resolved.filePath);
    return nativeRequire(request);
  };

  loadedModule._compile(transpiled, resolvedPath);
  return loadedModule.exports;
}

function collectObjects(root, exportName) {
  const rows = [];
  const visited = new WeakSet();

  function walk(value, objectPath) {
    if (!value || typeof value !== "object") return;
    if (visited.has(value)) return;
    visited.add(value);

    if (!Array.isArray(value)) {
      rows.push({ value, objectPath, exportName });
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${objectPath}[${index}]`));
      return;
    }

    for (const [key, child] of Object.entries(value)) {
      walk(child, objectPath ? `${objectPath}.${key}` : key);
    }
  }

  walk(root, exportName);
  return rows;
}

function collectModuleObjects(moduleExports) {
  const rows = [];
  for (const [exportName, value] of Object.entries(moduleExports || {})) {
    rows.push(...collectObjects(value, exportName));
  }
  return rows;
}

function firstValue(record, keys) {
  for (const key of keys) {
    if (record && record[key] != null && normalizeText(record[key])) {
      return record[key];
    }
  }
  return "";
}

function allPrimitiveStrings(record, maxDepth = 2) {
  const result = [];
  const visited = new WeakSet();

  function walk(value, depth) {
    if (value == null) return;
    if (typeof value === "string" || typeof value === "number") {
      result.push(String(value));
      return;
    }
    if (depth >= maxDepth || typeof value !== "object") return;
    if (visited.has(value)) return;
    visited.add(value);
    if (Array.isArray(value)) {
      value.slice(0, 30).forEach((item) => walk(item, depth + 1));
    } else {
      Object.values(value).forEach((item) => walk(item, depth + 1));
    }
  }

  walk(record, 0);
  return result;
}

function inferSeries(record) {
  const candidates = [
    firstValue(record, ["series", "seriesCode", "seriesKey", "seriesName", "productSeries"]),
    firstValue(record, ["foreachModel", "model", "modelCode", "productModel", "sku"]),
    ...allPrimitiveStrings(record, 1),
  ].map(normalizeText);

  for (const candidate of candidates) {
    const match = candidate.toUpperCase().match(/\bQ(20|40|60)/);
    if (match) return `Q${match[1]}`;
  }
  return "";
}

function getModel(record) {
  return normalizeText(firstValue(record, [
    "foreachModel",
    "model",
    "modelCode",
    "productModel",
    "targetModel",
    "replacementModel",
    "sku",
  ]));
}

function getProductCode(record) {
  return normalizeProductCode(firstValue(record, [
    "productCode",
    "productId",
    "commodityCode",
    "itemCode",
    "code",
  ]));
}

function getSlug(record) {
  return normalizeText(firstValue(record, ["slug", "productSlug", "detailSlug"]));
}

function getHref(record) {
  return normalizeText(firstValue(record, [
    "detailHref",
    "href",
    "productHref",
    "url",
    "pathname",
  ]));
}

function getTitle(record) {
  return normalizeText(firstValue(record, [
    "title",
    "name",
    "productName",
    "displayName",
    "label",
  ]));
}

function extractCompetitorModels(record) {
  const output = [];
  for (const [key, value] of Object.entries(record || {})) {
    if (!/(competitor|compatible|alternative|equivalent|sourceModel|originalModel)/i.test(key)) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string" || typeof item === "number") output.push(normalizeText(item));
        else if (item && typeof item === "object") {
          const nested = firstValue(item, ["model", "code", "value", "name", "label"]);
          if (nested) output.push(normalizeText(nested));
        }
      }
    } else if (typeof value === "string" || typeof value === "number") {
      output.push(normalizeText(value));
    }
  }
  return [...new Set(output.filter(Boolean))];
}

function candidateProductRows(moduleExports, sourceName) {
  const objects = collectModuleObjects(moduleExports);
  const rows = [];
  for (const item of objects) {
    const record = item.value;
    const model = getModel(record);
    const productCode = getProductCode(record);
    const series = inferSeries(record);
    if (!model && !productCode) continue;
    if (!series) continue;

    rows.push({
      sourceName,
      exportName: item.exportName,
      objectPath: item.objectPath,
      series,
      productCode,
      model,
      normalizedModel: normalizeModel(model),
      slug: getSlug(record),
      title: getTitle(record),
      href: getHref(record),
      competitorModels: extractCompetitorModels(record),
      raw: record,
    });
  }
  return rows;
}

function dedupeProducts(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = row.productCode
      ? `code:${row.productCode}`
      : `model:${row.normalizedModel}`;
    if (!key || key.endsWith(":")) continue;
    const current = map.get(key);
    if (!current) {
      map.set(key, row);
      continue;
    }
    const currentScore = [current.title, current.href, current.slug, current.competitorModels.length].filter(Boolean).length;
    const newScore = [row.title, row.href, row.slug, row.competitorModels.length].filter(Boolean).length;
    if (newScore > currentScore) map.set(key, row);
  }
  return [...map.values()];
}

function candidateMappingRows(moduleExports, sourceName) {
  const objects = collectModuleObjects(moduleExports);
  const rows = [];
  for (const item of objects) {
    const record = item.value;
    const competitorModels = extractCompetitorModels(record);
    if (competitorModels.length === 0) continue;

    const model = getModel(record);
    const productCode = getProductCode(record);
    const series = inferSeries(record);
    if (!model && !productCode) continue;
    if (series && series !== "Q20") continue;

    rows.push({
      sourceName,
      exportName: item.exportName,
      objectPath: item.objectPath,
      series: series || "Q20",
      productCode,
      model,
      normalizedModel: normalizeModel(model),
      competitorModels,
      title: getTitle(record),
      href: getHref(record),
    });
  }

  const map = new Map();
  for (const row of rows) {
    const key = `${row.productCode}|${row.normalizedModel}|${row.competitorModels.slice().sort().join("|")}`;
    if (!map.has(key)) map.set(key, row);
  }
  return [...map.values()];
}

function exportSummary(moduleExports) {
  return Object.entries(moduleExports || {}).map(([name, value]) => {
    let kind = typeof value;
    let size = "";
    if (Array.isArray(value)) {
      kind = "array";
      size = value.length;
    } else if (value && typeof value === "object") {
      kind = "object";
      size = Object.keys(value).length;
    }
    return { name, kind, size };
  });
}

const selectionModule = loadProjectModule(paths.selection);
const compatibleModelsModule = loadProjectModule(paths.compatibleModels);
const compatibleProductsModule = loadProjectModule(paths.compatibleProducts);
const configModule = loadProjectModule(paths.config);

const selectionRows = dedupeProducts(candidateProductRows(selectionModule, "产品中心正式选型数据"));
const resourceProductRows = dedupeProducts(candidateProductRows(compatibleProductsModule, "替代页产品数据"));
const mappings = [
  ...candidateMappingRows(compatibleModelsModule, "竞品型号映射"),
  ...candidateMappingRows(compatibleProductsModule, "替代页产品数据"),
];

const selectionBySeries = {
  Q20: selectionRows.filter((row) => row.series === "Q20"),
  Q40: selectionRows.filter((row) => row.series === "Q40"),
  Q60: selectionRows.filter((row) => row.series === "Q60"),
};
const resourceQ20 = resourceProductRows.filter((row) => row.series === "Q20");

const officialByCode = new Map();
const officialByModel = new Map();
for (const row of selectionBySeries.Q20) {
  if (row.productCode) {
    if (!officialByCode.has(row.productCode)) officialByCode.set(row.productCode, []);
    officialByCode.get(row.productCode).push(row);
  }
  if (row.normalizedModel) {
    if (!officialByModel.has(row.normalizedModel)) officialByModel.set(row.normalizedModel, []);
    officialByModel.get(row.normalizedModel).push(row);
  }
}

const bridgeRows = [];
for (const mapping of mappings) {
  const codeMatches = mapping.productCode ? (officialByCode.get(mapping.productCode) || []) : [];
  const modelMatches = mapping.normalizedModel ? (officialByModel.get(mapping.normalizedModel) || []) : [];
  const uniqueMatches = new Map();
  for (const match of [...codeMatches, ...modelMatches]) {
    uniqueMatches.set(`${match.productCode}|${match.normalizedModel}`, match);
  }
  const matches = [...uniqueMatches.values()];
  const matchMethod = codeMatches.length && modelMatches.length
    ? "productCode + foreachModel"
    : codeMatches.length
      ? "productCode"
      : modelMatches.length
        ? "foreachModel"
        : "未匹配";

  bridgeRows.push({
    映射来源: mapping.sourceName,
    替代数据位置: `${mapping.exportName}:${mapping.objectPath}`,
    商品编码: mapping.productCode,
    FOREACH型号: mapping.model,
    竞品型号数量: mapping.competitorModels.length,
    竞品型号: mapping.competitorModels.join(" | "),
    匹配状态: matches.length === 1 ? "唯一匹配" : matches.length > 1 ? "多重匹配" : "未匹配",
    匹配方式: matchMethod,
    正式数据匹配数: matches.length,
    正式商品编码: matches.map((item) => item.productCode).filter(Boolean).join(" | "),
    正式FOREACH型号: matches.map((item) => item.model).filter(Boolean).join(" | "),
    正式Slug: matches.map((item) => item.slug).filter(Boolean).join(" | "),
    正式详情链接: matches.map((item) => item.href).filter(Boolean).join(" | "),
    正式标题: matches.map((item) => item.title).filter(Boolean).join(" | "),
    建议桥接键: matches.length === 1
      ? (mapping.productCode && matches[0].productCode === mapping.productCode ? "productCode" : "foreachModel")
      : "人工确认",
  });
}

const uniqueBridgeMap = new Map();
for (const row of bridgeRows) {
  const key = `${row.商品编码}|${normalizeModel(row.FOREACH型号)}|${row.竞品型号}`;
  if (!uniqueBridgeMap.has(key)) uniqueBridgeMap.set(key, row);
}
const uniqueBridgeRows = [...uniqueBridgeMap.values()];

const matchedOfficialKeys = new Set();
for (const row of uniqueBridgeRows) {
  if (row.匹配状态 !== "唯一匹配") continue;
  const codes = String(row.正式商品编码 || "").split("|").map((item) => normalizeText(item));
  const models = String(row.正式FOREACH型号 || "").split("|").map((item) => normalizeModel(item));
  codes.filter(Boolean).forEach((code) => matchedOfficialKeys.add(`code:${code}`));
  models.filter(Boolean).forEach((model) => matchedOfficialKeys.add(`model:${model}`));
}

const officialWithoutReplacement = selectionBySeries.Q20.filter((row) => {
  return !matchedOfficialKeys.has(`code:${row.productCode}`) && !matchedOfficialKeys.has(`model:${row.normalizedModel}`);
});

const resourceMatchRows = resourceQ20.map((resource) => {
  const codeMatches = resource.productCode ? (officialByCode.get(resource.productCode) || []) : [];
  const modelMatches = resource.normalizedModel ? (officialByModel.get(resource.normalizedModel) || []) : [];
  const uniqueMatches = new Map();
  [...codeMatches, ...modelMatches].forEach((item) => uniqueMatches.set(`${item.productCode}|${item.normalizedModel}`, item));
  const matches = [...uniqueMatches.values()];
  return {
    替代页商品编码: resource.productCode,
    替代页FOREACH型号: resource.model,
    替代页标题: resource.title,
    替代页Href: resource.href,
    替代页数据位置: `${resource.exportName}:${resource.objectPath}`,
    正式数据匹配数: matches.length,
    匹配状态: matches.length === 1 ? "唯一匹配" : matches.length > 1 ? "多重匹配" : "未匹配",
    正式商品编码: matches.map((item) => item.productCode).filter(Boolean).join(" | "),
    正式FOREACH型号: matches.map((item) => item.model).filter(Boolean).join(" | "),
    正式Slug: matches.map((item) => item.slug).filter(Boolean).join(" | "),
    正式详情链接: matches.map((item) => item.href).filter(Boolean).join(" | "),
  };
});

function lineNumberedSource(filePath, includeAll, patterns = []) {
  const lines = readText(filePath).split(/\r?\n/);
  const output = [];
  output.push(`文件：${relative(filePath)}`);
  output.push("-".repeat(90));

  if (includeAll) {
    lines.forEach((line, index) => output.push(`${String(index + 1).padStart(5)}: ${line}`));
  } else {
    const selected = new Set();
    lines.forEach((line, index) => {
      if (patterns.some((pattern) => pattern.test(line))) {
        for (let i = Math.max(0, index - 5); i <= Math.min(lines.length - 1, index + 8); i++) selected.add(i);
      }
    });
    [...selected].sort((a, b) => a - b).forEach((index) => output.push(`${String(index + 1).padStart(5)}: ${lines[index]}`));
  }
  output.push("");
  return output;
}

const sourceContext = [];
sourceContext.push(...lineNumberedSource(paths.config, true));
const servicePatterns = [
  /^\s*import\s/,
  /compatible/i,
  /seriesKey/i,
  /productCode/i,
  /foreachModel/i,
  /detailHref|href|basePath|pathname/i,
  /filter\(|find\(|map\(/,
];
sourceContext.push(...lineNumberedSource(paths.homeService, false, servicePatterns));
sourceContext.push(...lineNumberedSource(paths.detailService, false, servicePatterns));
const routePatterns = [/Q20_FITTING_REPLACEMENT_SERIES_CONFIG/, /SERIES_CONFIG/, /getFittingReplacement/, /q20/i];
sourceContext.push(...lineNumberedSource(paths.zhPage, false, routePatterns));
sourceContext.push(...lineNumberedSource(paths.intlPage, false, routePatterns));
sourceContext.push(...lineNumberedSource(paths.zhDetailPage, false, routePatterns));
sourceContext.push(...lineNumberedSource(paths.intlDetailPage, false, routePatterns));

const bridgeCsvPath = path.join(reportDirectory, "01_Q20竞品替代映射_对接产品中心结果.csv");
writeCsv(bridgeCsvPath, uniqueBridgeRows, [
  ["映射来源", "映射来源"],
  ["替代数据位置", "替代数据位置"],
  ["商品编码", "替代数据商品编码"],
  ["FOREACH型号", "替代数据FOREACH型号"],
  ["竞品型号数量", "竞品型号数量"],
  ["竞品型号", "竞品型号"],
  ["匹配状态", "匹配状态"],
  ["匹配方式", "匹配方式"],
  ["正式数据匹配数", "正式数据匹配数"],
  ["正式商品编码", "产品中心商品编码"],
  ["正式FOREACH型号", "产品中心FOREACH型号"],
  ["正式Slug", "产品中心Slug"],
  ["正式详情链接", "产品中心详情链接"],
  ["正式标题", "产品中心标题"],
  ["建议桥接键", "建议桥接键"],
].map(([key, title]) => ({ key, title })));

const resourceCsvPath = path.join(reportDirectory, "02_Q20替代页产品_对接正式产品结果.csv");
writeCsv(resourceCsvPath, resourceMatchRows, [
  ["替代页商品编码", "替代页商品编码"],
  ["替代页FOREACH型号", "替代页FOREACH型号"],
  ["替代页标题", "替代页标题"],
  ["替代页Href", "替代页Href"],
  ["替代页数据位置", "替代页数据位置"],
  ["正式数据匹配数", "正式数据匹配数"],
  ["匹配状态", "匹配状态"],
  ["正式商品编码", "产品中心商品编码"],
  ["正式FOREACH型号", "产品中心FOREACH型号"],
  ["正式Slug", "产品中心Slug"],
  ["正式详情链接", "产品中心详情链接"],
].map(([key, title]) => ({ key, title })));

const noReplacementCsvPath = path.join(reportDirectory, "03_Q20产品中心中没有竞品替代映射的产品.csv");
writeCsv(noReplacementCsvPath, officialWithoutReplacement.map((row) => ({
  商品编码: row.productCode,
  FOREACH型号: row.model,
  标题: row.title,
  Slug: row.slug,
  详情链接: row.href,
  数据位置: `${row.exportName}:${row.objectPath}`,
})), [
  ["商品编码", "商品编码"],
  ["FOREACH型号", "FOREACH型号"],
  ["标题", "标题"],
  ["Slug", "Slug"],
  ["详情链接", "详情链接"],
  ["数据位置", "数据位置"],
].map(([key, title]) => ({ key, title })));

const sourcePath = path.join(reportDirectory, "04_关键源码与调用上下文.txt");
writeText(sourcePath, sourceContext);

const unmatchedMappings = uniqueBridgeRows.filter((row) => row.匹配状态 === "未匹配");
const multipleMappings = uniqueBridgeRows.filter((row) => row.匹配状态 === "多重匹配");
const uniqueMappings = uniqueBridgeRows.filter((row) => row.匹配状态 === "唯一匹配");
const resourceUnmatched = resourceMatchRows.filter((row) => row.匹配状态 === "未匹配");
const resourceMultiple = resourceMatchRows.filter((row) => row.匹配状态 === "多重匹配");

const summary = [];
summary.push("Q20 快插接头：产品中心与型号替代模块精确桥接审计");
summary.push(`生成时间：${new Date().toLocaleString("zh-CN")}`);
summary.push("");
summary.push("一、正式产品中心数据");
summary.push(`Q20：${selectionBySeries.Q20.length}`);
summary.push(`Q40：${selectionBySeries.Q40.length}`);
summary.push(`Q60：${selectionBySeries.Q60.length}`);
summary.push("");
summary.push("二、旧型号替代模块数据");
summary.push(`Q20 替代页产品记录：${resourceQ20.length}`);
summary.push(`Q20 竞品替代映射记录：${uniqueBridgeRows.length}`);
summary.push("");
summary.push("三、竞品替代映射连接产品中心结果");
summary.push(`唯一匹配：${uniqueMappings.length}`);
summary.push(`未匹配：${unmatchedMappings.length}`);
summary.push(`多重匹配：${multipleMappings.length}`);
summary.push("");
summary.push("四、替代页产品数据连接产品中心结果");
summary.push(`唯一匹配：${resourceMatchRows.filter((row) => row.匹配状态 === "唯一匹配").length}`);
summary.push(`未匹配：${resourceUnmatched.length}`);
summary.push(`多重匹配：${resourceMultiple.length}`);
summary.push("");
summary.push("五、产品中心中没有竞品替代映射的 Q20 产品");
summary.push(`${officialWithoutReplacement.length}`);
summary.push("说明：该数量不代表数据错误，只表示这些正式产品目前没有配置竞品型号关系。");
summary.push("");
summary.push("六、模块导出概览");
for (const [label, moduleExports] of [
  ["产品中心正式选型数据", selectionModule],
  ["竞品型号映射", compatibleModelsModule],
  ["替代页产品数据", compatibleProductsModule],
  ["系列配置", configModule],
]) {
  summary.push(label + "：");
  for (const item of exportSummary(moduleExports)) {
    summary.push(`  - ${item.name} (${item.kind}${item.size !== "" ? `, ${item.size}` : ""})`);
  }
}
summary.push("");
summary.push("七、下一步判断规则");
summary.push("1. 若竞品映射大部分可唯一匹配，应让替代 service 通过 productCode 优先、foreachModel 兜底读取产品中心正式数据。");
summary.push("2. 若存在未匹配记录，先核对旧替代数据中的商品编码或 FOREACH 型号，不要自动猜测。");
summary.push("3. Q40、Q60 只有正式产品数据，没有竞品对照表时，不应生成虚假的替代关系。");
summary.push("4. 最终替代结果卡片应使用正式产品数据的标题、主图、规格和详情链接，竞品型号关系仍由 compatible-models.generated.ts 提供。");
summary.push("");
summary.push("本次只读取，没有修改网站源码。");

const summaryPath = path.join(reportDirectory, "00_审计摘要.txt");
writeText(summaryPath, summary);

console.log("");
console.log("Q20 精确桥接审计完成。");
console.log("");
console.log(`产品中心 Q20：${selectionBySeries.Q20.length}`);
console.log(`产品中心 Q40：${selectionBySeries.Q40.length}`);
console.log(`产品中心 Q60：${selectionBySeries.Q60.length}`);
console.log(`竞品替代映射：${uniqueBridgeRows.length}`);
console.log(`唯一匹配：${uniqueMappings.length}`);
console.log(`未匹配：${unmatchedMappings.length}`);
console.log(`多重匹配：${multipleMappings.length}`);
console.log("");
console.log(summaryPath);
console.log(bridgeCsvPath);
console.log(resourceCsvPath);
console.log(noReplacementCsvPath);
console.log(sourcePath);
console.log("");