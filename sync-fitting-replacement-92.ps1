param(
    [switch]$Apply
)

# ============================================================
# 将产品中心已下架的 92 个无主图接头
# 精确同步到“接头替代查询”页面
#
# 默认模式：
# - 只读审计
# - 不修改任何网站文件
#
# 使用 -Apply：
# - 只按 CSV 中的商品编码 / 产品 ID 精确隐藏
# - 同一商品对应多个第三方兼容型号时，一并隐藏这些关联记录
# - 不根据占位图、Logo 或缺图扩大下架范围
# - 不修改产品中心任何文件
# - 自动备份并执行 npm run build
# - 构建失败时自动回滚
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$tempNodeScript = Join-Path `
    $projectRoot `
    '.sync-fitting-replacement-92.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

Set-Location -LiteralPath $projectRoot

Write-Host ''
Write-Host '接头替代查询精确同步' -ForegroundColor Cyan
Write-Host '目标：产品中心已确认下架的 92 个接头' -ForegroundColor Yellow

if ($Apply) {
    Write-Host '模式：正式同步' -ForegroundColor Red
} else {
    Write-Host '模式：只读审计，不修改文件' -ForegroundColor Green
}

Write-Host ''

$nodeScript = @'

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();
const applyMode = process.argv.includes("--apply");

const csvCandidates = [
  path.join(root, "audit-reports/fitting-main-images/官网接头无主图清单_20260720-173258.csv"),
  path.join(root, "官网接头无主图清单_20260720-173258.csv"),
];

function findCsv() {
  for (const candidate of csvCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  const auditRoot = path.join(root, "audit-reports");
  if (fs.existsSync(auditRoot)) {
    const stack = [auditRoot];
    while (stack.length) {
      const current = stack.pop();
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const full = path.join(current, entry.name);
        if (entry.isDirectory()) stack.push(full);
        else if (entry.name === "官网接头无主图清单_20260720-173258.csv") return full;
      }
    }
  }
  throw new Error("没有找到 92 个接头清单 CSV。");
}

const csvPath = findCsv();
const replacementPaths = [
  path.join(root, "data/resources/fitting-replacement/all-compatible-products.generated.ts"),
  path.join(root, "data/resources/fitting-replacement/compatible-models.generated.ts"),
];
const helperPath = path.join(
  root,
  "data/resources/fitting-replacement/fitting-replacement-hidden-products.generated.ts"
);
const importPath =
  "@/data/resources/fitting-replacement/fitting-replacement-hidden-products.generated";
const helperFunction = "isFittingReplacementProductHidden";
const markerStart = "FITTING_REPLACEMENT_92_SYNC_FILTER_START";
const markerEnd = "FITTING_REPLACEMENT_92_SYNC_FILTER_END";

function clean(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return clean(value).toUpperCase();
}

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.replace(/\r$/, ""));
    rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map((item) => item.replace(/^\uFEFF/, "").trim());
  return rows
    .slice(1)
    .filter((item) => item.some((value) => clean(value)))
    .map((item) =>
      Object.fromEntries(headers.map((header, index) => [header, item[index] ?? ""]))
    );
}

const csvRows = parseCsv(fs.readFileSync(csvPath, "utf8"));
if (csvRows.length !== 92) {
  throw new Error(`清单数量不是 92，实际读取 ${csvRows.length} 条。已停止。`);
}

const targetRows = csvRows.map((row, index) => {
  const productCode = clean(row["产品编码"]);
  const productId = clean(row["产品ID"]);
  const model = clean(row["型号"]);
  const primaryCode = productCode || productId;

  if (!primaryCode) {
    throw new Error(`清单第 ${index + 1} 条缺少产品编码和产品 ID。`);
  }

  return {
    sequence: clean(row["序号"]) || String(index + 1),
    productCode,
    productId,
    primaryCode,
    model,
    productName: clean(row["产品名称"]),
    fittingType: clean(row["接头类型"]),
  };
});

const targetCodeSet = new Set();
const targetModelSet = new Set();
for (const row of targetRows) {
  for (const value of [row.productCode, row.productId, row.primaryCode]) {
    if (clean(value)) targetCodeSet.add(normalize(value));
  }
  if (row.model) targetModelSet.add(normalize(row.model));
}

const uniquePrimaryCodes = new Set(targetRows.map((item) => normalize(item.primaryCode)));
if (uniquePrimaryCodes.size !== 92) {
  throw new Error(
    `清单主键存在重复：92 条记录只有 ${uniquePrimaryCodes.size} 个唯一产品编码/产品 ID。已停止。`
  );
}

for (const filePath of replacementPaths) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`没有找到接头替代数据文件：${rel(filePath)}`);
  }
}

function parseSource(filePath, content) {
  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
}

function propertyNameText(name) {
  if (!name) return "";
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return "";
}

function literalText(node) {
  if (!node) return "";
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isNumericLiteral(node)
  ) {
    return clean(node.text);
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return "true";
  if (node.kind === ts.SyntaxKind.FalseKeyword) return "false";
  return "";
}

function objectRecord(node, filePath, parsed) {
  const values = {};
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = propertyNameText(property.name);
    if (!name) continue;
    values[name] = literalText(property.initializer);
  }

  return {
    filePath,
    start: node.getStart(parsed),
    line: parsed.getLineAndCharacterOfPosition(node.getStart(parsed)).line + 1,
    productCode: clean(values.productCode),
    productId: clean(values.productId),
    code: clean(values.code),
    sku: clean(values.sku),
    model: clean(values.model),
    foreachModel: clean(values.foreachModel),
    productModel: clean(values.productModel),
    compatibleModel: clean(values.compatibleModel),
    title: clean(values.title || values.productName || values.name),
    productType: clean(values.productType),
    productSeries: clean(values.productSeries),
    imagePath: clean(values.imagePath || values.image || values.imageUrl),
  };
}

function matchRecord(record) {
  const codeValues = [
    record.productCode,
    record.productId,
    record.code,
    record.sku,
  ]
    .map(normalize)
    .filter(Boolean);

  if (codeValues.length > 0) {
    return codeValues.some((value) => targetCodeSet.has(value));
  }

  const modelValues = [
    record.foreachModel,
    record.productModel,
    record.model,
  ]
    .map(normalize)
    .filter(Boolean);

  return modelValues.some((value) => targetModelSet.has(value));
}

function collectMatches(filePath, content) {
  const parsed = parseSource(filePath, content);
  const matches = [];
  const allRecords = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const record = objectRecord(node, filePath, parsed);
      const hasIdentity = [
        record.productCode,
        record.productId,
        record.code,
        record.sku,
        record.model,
        record.foreachModel,
        record.productModel,
      ].some(Boolean);

      if (hasIdentity) {
        allRecords.push(record);
        if (matchRecord(record)) matches.push(record);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(parsed);
  return { parsed, matches, allRecords };
}

function targetCodesFound(matches) {
  const found = new Set();
  for (const record of matches) {
    for (const value of [
      record.productCode,
      record.productId,
      record.code,
      record.sku,
    ]) {
      const key = normalize(value);
      if (key && targetCodeSet.has(key)) found.add(key);
    }

    if (
      !record.productCode &&
      !record.productId &&
      !record.code &&
      !record.sku
    ) {
      for (const value of [
        record.foreachModel,
        record.productModel,
        record.model,
      ]) {
        const modelKey = normalize(value);
        const target = targetRows.find((item) => normalize(item.model) === modelKey);
        if (target) found.add(normalize(target.primaryCode));
      }
    }
  }
  return found;
}

const sourceData = replacementPaths.map((filePath) => {
  const content = fs.readFileSync(filePath, "utf8");

  if (
    content.includes("FITTING_REPLACEMENT_OFFLINE_FILTER_START") ||
    content.includes("isFittingReplacementProductOffline") ||
    content.includes("fitting-replacement-offline.generated")
  ) {
    throw new Error(
      `${rel(filePath)} 仍存在旧的宽泛过滤器。请先完成“仅恢复接头替代查询”，再运行本脚本。`
    );
  }

  const collection = collectMatches(filePath, content);
  return { filePath, content, ...collection };
});

const allMatches = sourceData.flatMap((item) => item.matches);
const foundCodes = targetCodesFound(allMatches);
const missingTargets = targetRows.filter(
  (item) => !foundCodes.has(normalize(item.primaryCode))
);

if (allMatches.length === 0) {
  throw new Error("两个接头替代数据文件中没有匹配到这 92 个商品中的任何记录。已停止。");
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const stamp =
  `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-` +
  `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
const reportDir = path.join(root, `audit-reports/fitting-replacement-sync/${stamp}`);
const backupDir = path.join(root, `.local-backups/fitting-replacement-sync-${stamp}`);
ensureDir(reportDir);

function csvEscape(value) {
  const text = clean(value);
  return `"${text.replace(/"/g, '""')}"`;
}

const matchCsvHeaders = [
  "数据文件",
  "数据行",
  "商品编码",
  "产品ID",
  "型号",
  "FOREACH型号",
  "产品型号",
  "兼容型号",
  "标题",
  "产品类型",
  "产品系列",
  "图片",
];
const matchCsvLines = [matchCsvHeaders.map(csvEscape).join(",")];
for (const record of allMatches) {
  matchCsvLines.push(
    [
      rel(record.filePath),
      record.line,
      record.productCode,
      record.productId,
      record.model,
      record.foreachModel,
      record.productModel,
      record.compatibleModel,
      record.title,
      record.productType,
      record.productSeries,
      record.imagePath,
    ]
      .map(csvEscape)
      .join(",")
  );
}
fs.writeFileSync(
  path.join(reportDir, "接头替代查询_92个商品匹配记录.csv"),
  "\uFEFF" + matchCsvLines.join("\r\n"),
  "utf8"
);

const missingCsvHeaders = ["序号", "产品编码", "产品ID", "型号", "产品名称", "接头类型"];
const missingCsvLines = [missingCsvHeaders.map(csvEscape).join(",")];
for (const row of missingTargets) {
  missingCsvLines.push(
    [
      row.sequence,
      row.productCode,
      row.productId,
      row.model,
      row.productName,
      row.fittingType,
    ]
      .map(csvEscape)
      .join(",")
  );
}
fs.writeFileSync(
  path.join(reportDir, "92个商品中未出现在接头替代查询的商品.csv"),
  "\uFEFF" + missingCsvLines.join("\r\n"),
  "utf8"
);

const fileSummaries = sourceData.map((item) => ({
  file: rel(item.filePath),
  records: item.allRecords.length,
  matched: item.matches.length,
}));

const summaryLines = [
  "# 接头替代查询同步审计",
  "",
  `- 执行模式：${applyMode ? "正式同步" : "只读审计"}`,
  `- 目标商品：92 个`,
  `- 在替代查询中命中的目标商品：${foundCodes.size} 个`,
  `- 匹配到的替代查询记录：${allMatches.length} 条`,
  `- 未出现在替代查询中的目标商品：${missingTargets.length} 个`,
  "",
  "## 文件匹配",
  "",
  ...fileSummaries.map(
    (item) => `- ${item.file}：共识别 ${item.records} 条对象记录，匹配 ${item.matched} 条`
  ),
  "",
  "## 规则",
  "",
  "- 只按 CSV 中的商品编码、产品 ID 精确匹配。",
  "- 仅当替代数据没有任何编码字段时，才用 FOREACH 型号兜底匹配。",
  "- 不根据占位图、Logo、缺图、showOnHome 或 status 自动扩大范围。",
  "- 不修改产品中心任何文件。",
  "",
];
fs.writeFileSync(
  path.join(reportDir, "接头替代查询同步审计.md"),
  "\uFEFF" + summaryLines.join("\r\n"),
  "utf8"
);

console.log("");
console.log("接头替代查询同步审计完成：");
console.log(`目标商品：92 个`);
console.log(`命中的目标商品：${foundCodes.size} 个`);
console.log(`需要隐藏的替代查询记录：${allMatches.length} 条`);
console.log(`未出现在替代查询中的目标商品：${missingTargets.length} 个`);
for (const summary of fileSummaries) {
  console.log(`- ${summary.file}：匹配 ${summary.matched} 条`);
}
console.log(`审计报告：${rel(reportDir)}`);

if (!applyMode) {
  console.log("");
  console.log("当前是只读审计模式，没有修改任何网站文件。");
  process.exit(0);
}

function isExportedVariable(statement, exportedNames) {
  return (
    statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
    ) || false
  );
}

function unwrapExpression(node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isNonNullExpression(current) ||
    (ts.isSatisfiesExpression && ts.isSatisfiesExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function addImport(content, filePath) {
  if (content.includes(importPath)) return content;
  const parsed = parseSource(filePath, content);
  const imports = parsed.statements.filter(ts.isImportDeclaration);
  const importLine =
    `import { ${helperFunction} } from ${JSON.stringify(importPath)};`;

  if (imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    return (
      content.slice(0, lastImport.getEnd()) +
      "\n" +
      importLine +
      content.slice(lastImport.getEnd())
    );
  }

  const bomOffset = content.charCodeAt(0) === 0xfeff ? 1 : 0;
  return content.slice(0, bomOffset) + importLine + "\n" + content.slice(bomOffset);
}

function patchReplacementFile(content, filePath) {
  if (content.includes(markerStart)) {
    return { content, patchedArrays: 0, alreadyPatched: true };
  }

  let result = addImport(content, filePath);
  const parsed = parseSource(filePath, result);

  const separatelyExported = new Set();
  for (const statement of parsed.statements) {
    if (!ts.isExportDeclaration(statement) || !statement.exportClause) continue;
    if (!ts.isNamedExports(statement.exportClause)) continue;
    for (const element of statement.exportClause.elements) {
      separatelyExported.add(element.propertyName?.text || element.name.text);
    }
  }

  const edits = [];

  for (const statement of parsed.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    const directExport =
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
      ) || false;

    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer || !ts.isIdentifier(declaration.name)) continue;

      const exported = directExport || separatelyExported.has(declaration.name.text);
      if (!exported) continue;

      const unwrapped = unwrapExpression(declaration.initializer);
      if (!ts.isArrayLiteralExpression(unwrapped)) continue;

      const initializerText = result.slice(
        declaration.initializer.getStart(parsed),
        declaration.initializer.getEnd()
      );

      if (
        !/productCode|productId|foreachModel|productModel|compatibleModel|imagePath/i.test(
          initializerText
        )
      ) {
        continue;
      }

      edits.push({
        start: declaration.initializer.getStart(parsed),
        end: declaration.initializer.getEnd(),
        text:
          `/* ${markerStart} */\n` +
          `(${initializerText}).filter((item) => ` +
          `!${helperFunction}(item as unknown as Record<string, unknown>))\n` +
          `/* ${markerEnd} */`,
      });
    }
  }

  for (const statement of parsed.statements) {
    if (!ts.isExportAssignment(statement)) continue;
    const unwrapped = unwrapExpression(statement.expression);
    if (!ts.isArrayLiteralExpression(unwrapped)) continue;

    const expressionText = result.slice(
      statement.expression.getStart(parsed),
      statement.expression.getEnd()
    );
    if (
      !/productCode|productId|foreachModel|productModel|compatibleModel|imagePath/i.test(
        expressionText
      )
    ) {
      continue;
    }

    edits.push({
      start: statement.expression.getStart(parsed),
      end: statement.expression.getEnd(),
      text:
        `/* ${markerStart} */\n` +
        `(${expressionText}).filter((item) => ` +
        `!${helperFunction}(item as unknown as Record<string, unknown>))\n` +
        `/* ${markerEnd} */`,
    });
  }

  if (edits.length === 0) {
    throw new Error(
      `${rel(filePath)} 没有找到可安全接入的导出数组。没有写入任何文件。`
    );
  }

  edits.sort((a, b) => b.start - a.start);
  for (const edit of edits) {
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  }

  const validation = parseSource(filePath, result);
  const diagnostics = validation.parseDiagnostics;
  if (diagnostics.length > 0) {
    const message = diagnostics
      .map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n"))
      .join("\n");
    throw new Error(`${rel(filePath)} 修改后语法检查失败：\n${message}`);
  }

  return { content: result, patchedArrays: edits.length, alreadyPatched: false };
}

function buildHelper() {
  const codes = [...new Set(targetRows.map((item) => item.primaryCode).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
  const models = [...new Set(targetRows.map((item) => item.model).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));

  return `/* =========================================================
   接头替代查询精确隐藏清单
   来源：官网接头无主图清单_20260720-173258.csv
   商品数量：92
   说明：
   - 只按商品编码 / 产品 ID 精确隐藏
   - 没有编码字段时才用 FOREACH 型号兜底
   - 不根据占位图、Logo、缺图或状态扩大范围
========================================================= */

export const FITTING_REPLACEMENT_HIDDEN_PRODUCT_CODES =
  new Set<string>(${JSON.stringify(codes, null, 2)});

export const FITTING_REPLACEMENT_HIDDEN_MODELS =
  new Set<string>(${JSON.stringify(models, null, 2)});

function normalize(value: unknown): string {
  return String(value ?? "").trim().toUpperCase();
}

export function ${helperFunction}(
  item: Record<string, unknown>
): boolean {
  const codeValues = [
    item.productCode,
    item.productId,
    item.code,
    item.sku,
  ]
    .map(normalize)
    .filter(Boolean);

  if (codeValues.length > 0) {
    return codeValues.some((value) =>
      FITTING_REPLACEMENT_HIDDEN_PRODUCT_CODES.has(value)
    );
  }

  return [
    item.foreachModel,
    item.productModel,
    item.model,
  ]
    .map(normalize)
    .filter(Boolean)
    .some((value) =>
      FITTING_REPLACEMENT_HIDDEN_MODELS.has(value)
    );
}
`;
}

ensureDir(backupDir);
const filesToBackup = [...replacementPaths, helperPath];
for (const filePath of filesToBackup) {
  if (!fs.existsSync(filePath)) continue;
  const target = path.join(backupDir, rel(filePath));
  ensureDir(path.dirname(target));
  fs.copyFileSync(filePath, target);
}

const modified = [];
try {
  const patchedFiles = sourceData.map((item) => {
    const patched = patchReplacementFile(item.content, item.filePath);
    return { filePath: item.filePath, ...patched };
  });

  ensureDir(path.dirname(helperPath));
  fs.writeFileSync(helperPath, "\uFEFF" + buildHelper(), "utf8");
  modified.push(helperPath);

  for (const item of patchedFiles) {
    fs.writeFileSync(item.filePath, item.content, "utf8");
    modified.push(item.filePath);
    console.log(
      `已同步：${rel(item.filePath)}，接入 ${item.patchedArrays} 个精确过滤数组`
    );
  }
} catch (error) {
  for (const filePath of modified) {
    const saved = path.join(backupDir, rel(filePath));
    if (fs.existsSync(saved)) {
      ensureDir(path.dirname(filePath));
      fs.copyFileSync(saved, filePath);
    } else {
      fs.rmSync(filePath, { force: true });
    }
  }
  throw error;
}

function restoreFromBackup() {
  for (const filePath of filesToBackup) {
    const saved = path.join(backupDir, rel(filePath));
    if (fs.existsSync(saved)) {
      ensureDir(path.dirname(filePath));
      fs.copyFileSync(saved, filePath);
    } else {
      fs.rmSync(filePath, { force: true });
    }
  }
}

console.log("");
console.log("接头替代查询已按 92 个商品编码精确同步。");
console.log(`备份目录：${rel(backupDir)}`);
console.log("");
console.log("开始执行 npm run build……");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const buildResult = spawnSync(npmCommand, ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: false,
});

if (buildResult.error || buildResult.status !== 0) {
  restoreFromBackup();
  throw new Error(
    "构建失败，已自动恢复本次同步前的接头替代数据。"
  );
}

console.log("");
console.log("构建检查通过。");

'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

$nodeExitCode = 0

try {
    if ($Apply) {
        node $tempNodeScript --apply
    } else {
        node $tempNodeScript
    }

    $nodeExitCode = $LASTEXITCODE
}
finally {
    Remove-Item `
        -LiteralPath $tempNodeScript `
        -Force `
        -ErrorAction SilentlyContinue
}

if ($nodeExitCode -ne 0) {
    throw '接头替代查询同步未完成。请把完整错误信息发来。'
}

Write-Host ''

if ($Apply) {
    Write-Host '============================================' -ForegroundColor Green
    Write-Host '92 个接头已同步到接头替代查询下架范围' -ForegroundColor Green
    Write-Host '============================================' -ForegroundColor Green
    Write-Host ''
    Write-Host '本次没有修改产品中心数据。' -ForegroundColor Yellow
    Write-Host '本次没有执行 git commit 或 git push。' -ForegroundColor Yellow
    Write-Host ''
    git status --short
} else {
    Write-Host '审计完成，没有修改任何网站文件。' -ForegroundColor Green
    Write-Host ''
    Write-Host '确认终端中的匹配数量后，正式执行命令：' -ForegroundColor Yellow
    Write-Host ''
    Write-Host 'powershell -ExecutionPolicy Bypass -File .\sync-fitting-replacement-92.ps1 -Apply' -ForegroundColor Cyan
}
