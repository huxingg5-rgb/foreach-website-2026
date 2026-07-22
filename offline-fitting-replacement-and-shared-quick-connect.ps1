# ============================================================
# 接头替代缺图产品 + 复用图片快插接头下架
#
# 本脚本是补充脚本，处理：
# 1. 接头替代查询中无图、占位图、图片文件不存在的产品
# 2. 接头替代查询中使用通用快插图片的产品
# 3. 产品中心中多个快插型号复用同一张图片的产品
# 4. 图片重复按 SHA-256 文件内容判断，不只比较文件名
#
# 不会修改泵、阀、针、管路和智控。
# 不会执行 git commit 或 git push。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$temporaryNodeScript = Join-Path $projectRoot '.offline-fitting-replacement-and-shared-quick-connect.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

Set-Location -LiteralPath $projectRoot

Write-Host ''
Write-Host '开始处理接头替代缺图产品和复用图片快插……' -ForegroundColor Cyan
Write-Host '正常使用独立图片的快插型号不会整类下架。' -ForegroundColor Yellow
Write-Host '本脚本不会修改泵、阀、针、管路和智控。' -ForegroundColor Yellow
Write-Host ''

$nodeScript = @'
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ts = require('typescript');

const root = process.cwd();
const quickSelectionPath = path.join(root, 'data/products/selection/quick-connect-fitting-selection.generated.ts');
const productClientPath = path.join(root, 'components/products/selection/ProductSelectionClient.tsx');
const quickHelperPath = path.join(root, 'data/products/selection/quick-connect-offline-products.generated.ts');
const replacementPaths = [
  path.join(root, 'data/resources/fitting-replacement/all-compatible-products.generated.ts'),
  path.join(root, 'data/resources/fitting-replacement/compatible-models.generated.ts'),
];
const replacementHelperPath = path.join(root, 'data/resources/fitting-replacement/fitting-replacement-offline.generated.ts');

const now = new Date();
const pad = (value) => String(value).padStart(2, '0');
const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
const backupDir = path.join(root, `.local-backups/fitting-extra-offline-${stamp}`);
const reportDir = path.join(root, `audit-reports/fitting-extra-offline/${stamp}`);

const QUICK_IMPORT_PATH = '@/data/products/selection/quick-connect-offline-products.generated';
const REPLACEMENT_IMPORT_PATH = '@/data/resources/fitting-replacement/fitting-replacement-offline.generated';
const quickMarker = 'isQuickConnectProductOffline';
const replacementMarker = 'isFittingReplacementProductOffline';

function clean(value) {
  return String(value ?? '').trim();
}

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, '/');
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function scriptKind(filePath) {
  if (filePath.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (filePath.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (filePath.endsWith('.js') || filePath.endsWith('.cjs')) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function parseSource(filePath, content) {
  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind(filePath),
  );
}

function unwrap(node) {
  let current = node;
  while (
    current &&
    (
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isNonNullExpression(current) ||
      (typeof ts.isSatisfiesExpression === 'function' && ts.isSatisfiesExpression(current))
    )
  ) {
    current = current.expression;
  }
  return current;
}

function propertyName(node) {
  if (
    ts.isIdentifier(node) ||
    ts.isStringLiteral(node) ||
    ts.isNumericLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return String(node.text);
  }
  return '';
}

function findProperty(objectNode, candidates) {
  const wanted = new Set(candidates.map((item) => item.toLowerCase()));
  return objectNode.properties.find((property) => {
    return (
      ts.isPropertyAssignment(property) &&
      wanted.has(propertyName(property.name).toLowerCase())
    );
  }) || null;
}

function literalValue(node) {
  const value = unwrap(node);
  if (!value) return undefined;
  if (
    ts.isStringLiteral(value) ||
    ts.isNoSubstitutionTemplateLiteral(value) ||
    ts.isNumericLiteral(value)
  ) {
    return String(value.text);
  }
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (value.kind === ts.SyntaxKind.NullKeyword) return null;
  return undefined;
}

function field(record, candidates) {
  const property = findProperty(record.node, candidates);
  return property ? literalValue(property.initializer) : undefined;
}

function textField(record, candidates) {
  return clean(field(record, candidates));
}

function collectRecords(filePath, content, mode) {
  const parsed = parseSource(filePath, content);
  const records = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const temp = { node, parsed, filePath };
      const productId = textField(temp, ['productId']);
      const productCode = textField(temp, ['productCode', 'sku', 'code']);
      const model = textField(temp, ['model', 'foreachModel', 'productModel']);
      const sourceType = textField(temp, ['sourceType']);
      const productTypeId = textField(temp, ['productTypeId']);
      const productType = textField(temp, ['productType']);
      const productSeries = textField(temp, ['productSeries', 'series']);
      const status = textField(temp, ['status']);
      const showOnHome = field(temp, ['showOnHome']);
      const image = textField(temp, [
        'imageCard',
        'cardImage',
        'imagePath',
        'imageUrl',
        'mainImage',
        'image',
      ]);

      const normalizedSource = sourceType.toLowerCase();
      const normalizedType = productTypeId.toLowerCase();

      const isQuickSelection =
        mode === 'quick' &&
        Boolean(productId || productCode || model) &&
        (
          normalizedSource.includes('quick-connect') ||
          normalizedType === 'quick-connect-fittings' ||
          /^q\d/i.test(model)
        );

      const isReplacement =
        mode === 'replacement' &&
        Boolean(productCode || model) &&
        (
          findProperty(node, ['imagePath', 'image', 'imageUrl']) ||
          findProperty(node, ['showOnHome']) ||
          productType ||
          productSeries
        );

      if (isQuickSelection || isReplacement) {
        records.push({
          node,
          parsed,
          filePath,
          productId,
          productCode,
          model,
          sourceType,
          productTypeId,
          productType,
          productSeries,
          status,
          showOnHome,
          image,
          line: parsed.getLineAndCharacterOfPosition(node.getStart(parsed)).line + 1,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(parsed);
  return { parsed, records };
}

function isActive(record) {
  const status = record.status.toLowerCase();
  if (status && status !== 'active') return false;
  if (record.showOnHome === false) return false;
  return true;
}

function cleanImagePath(value) {
  return clean(value)
    .split('?')[0]
    .split('#')[0]
    .replace(/\\/g, '/');
}

function isPlaceholderOrGeneric(imagePath) {
  const value = cleanImagePath(imagePath).toLowerCase();
  return (
    !value ||
    value.includes('placeholder') ||
    value.includes('no-image') ||
    value.includes('no_image') ||
    value.includes('/images/logo/') ||
    value.includes('foreach-logo') ||
    value.includes('quick connector_200x200_01_v001.jpg')
  );
}

function resolveLocalImage(imagePath) {
  const value = cleanImagePath(imagePath);
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || /^(data:|blob:)/i.test(value)) return '';

  const withoutAlias = value.replace(/^@\//, '').replace(/^~\//, '');
  const withoutLeadingSlash = withoutAlias.replace(/^\/+/, '');
  const candidates = /^public\//i.test(withoutLeadingSlash)
    ? [path.join(root, withoutLeadingSlash)]
    : [path.join(root, 'public', withoutLeadingSlash), path.join(root, withoutLeadingSlash)];

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
    } catch {
      // 继续检查其他候选路径。
    }
  }
  return '';
}

function fileHash(filePath) {
  if (!filePath) return '';
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function canonicalKey(record) {
  return clean(record.productCode || record.productId || record.model).toLowerCase();
}

function isQuickReplacement(record) {
  const combined = [record.productType, record.productSeries, record.model]
    .join(' ')
    .toLowerCase();
  return combined.includes('快插') || combined.includes('quick') || /^q(20|40|60|\d)/i.test(record.model);
}

function classifyRecords(records, { quickOnly = false } = {}) {
  const active = records.filter(isActive);
  const missing = [];
  const valid = [];

  for (const record of active) {
    const generic = isPlaceholderOrGeneric(record.image);
    const localPath = resolveLocalImage(record.image);
    const isExternal = /^(https?:)?\/\//i.test(cleanImagePath(record.image));
    const missingFile = Boolean(record.image) && !generic && !localPath && !isExternal;

    const info = {
      ...record,
      localPath,
      hash: localPath ? fileHash(localPath) : '',
      reason: '',
    };

    if (!record.image) {
      info.reason = '未配置图片';
      missing.push(info);
    } else if (generic) {
      info.reason = cleanImagePath(record.image).toLowerCase().includes('quick connector_200x200_01_v001.jpg')
        ? '使用快插通用复用图'
        : '使用占位图或公司 Logo';
      missing.push(info);
    } else if (missingFile) {
      info.reason = '图片文件不存在';
      missing.push(info);
    } else {
      valid.push(info);
    }
  }

  const groups = new Map();
  for (const record of valid) {
    if (quickOnly && !isQuickReplacement(record)) continue;
    const groupKey = record.hash || cleanImagePath(record.image).toLowerCase();
    if (!groupKey) continue;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(record);
  }

  const shared = [];
  for (const group of groups.values()) {
    const canonicalProducts = new Set(group.map(canonicalKey).filter(Boolean));
    if (canonicalProducts.size <= 1) continue;
    for (const record of group) {
      shared.push({ ...record, reason: `与 ${canonicalProducts.size - 1} 个其他产品复用同一张图片` });
    }
  }

  const byObject = new Map();
  for (const record of [...missing, ...shared]) {
    const key = `${rel(record.filePath)}::${record.node.getStart(record.parsed)}`;
    if (!byObject.has(key)) byObject.set(key, record);
  }

  return {
    active,
    missing,
    shared,
    offline: [...byObject.values()],
  };
}

function indentAt(content, position) {
  const start = content.lastIndexOf('\n', position - 1) + 1;
  return (content.slice(start, position).match(/^[\t ]*/) || [''])[0];
}

function propertyEdit(content, record, propertyNames, propertyText, literalText) {
  const existing = findProperty(record.node, propertyNames);
  if (existing) {
    return {
      start: existing.initializer.getStart(record.parsed),
      end: existing.initializer.getEnd(),
      text: literalText,
    };
  }

  const end = record.node.getEnd() - 1;
  const baseIndent = indentAt(content, record.node.getStart(record.parsed));
  const itemIndent = `${baseIndent}  `;
  const before = content.slice(0, end).trimEnd();
  const comma = record.node.properties.length > 0 && !before.endsWith(',') ? ',' : '';
  return {
    start: end,
    end,
    text: `${comma}\n${itemIndent}${JSON.stringify(propertyText)}: ${literalText}\n${baseIndent}`,
  };
}

function applyEdits(content, edits) {
  let result = content;
  const unique = new Map();
  for (const edit of edits) unique.set(`${edit.start}:${edit.end}`, edit);
  for (const edit of [...unique.values()].sort((a, b) => b.start - a.start)) {
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  }
  return result;
}

function assertSyntax(filePath, content) {
  const parsed = parseSource(filePath, content);
  if (parsed.parseDiagnostics.length === 0) return;
  const message = parsed.parseDiagnostics
    .map((item) => ts.flattenDiagnosticMessageText(item.messageText, '\n'))
    .join('\n');
  throw new Error(`TypeScript 语法检查失败：${rel(filePath)}\n${message}`);
}

function addImport(content, filePath, importPath, importedName) {
  if (content.includes(importPath)) return content;
  const parsed = parseSource(filePath, content);
  const imports = parsed.statements.filter(ts.isImportDeclaration);
  const line = `import { ${importedName} } from ${JSON.stringify(importPath)};\n`;

  if (imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    return content.slice(0, lastImport.getEnd()) + `\n${line.trimEnd()}` + content.slice(lastImport.getEnd());
  }

  const bomOffset = content.charCodeAt(0) === 0xfeff ? 1 : 0;
  const firstStatement = parsed.statements[0];
  if (firstStatement) {
    const insertionPoint = Math.max(bomOffset, firstStatement.getFullStart());
    return content.slice(0, insertionPoint) + line + content.slice(insertionPoint);
  }
  return content.slice(0, bomOffset) + line + content.slice(bomOffset);
}

function patchSelectionClient(content) {
  let result = addImport(content, productClientPath, QUICK_IMPORT_PATH, quickMarker);
  if (result.includes('QUICK_CONNECT_OFFLINE_FILTER_START')) return result;

  const parsed = parseSource(productClientPath, result);
  let declaration = null;

  function visit(node) {
    if (
      !declaration &&
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'selectionProducts' &&
      node.initializer
    ) {
      declaration = node;
    }
    ts.forEachChild(node, visit);
  }
  visit(parsed);

  if (!declaration || !declaration.initializer) {
    throw new Error('ProductSelectionClient.tsx 中没有找到 selectionProducts 初始化表达式。');
  }

  const initializer = declaration.initializer;
  const original = result.slice(initializer.getStart(parsed), initializer.getEnd());
  const replacement = `/* QUICK_CONNECT_OFFLINE_FILTER_START */\n(${original}).filter((product) => !${quickMarker}(product as unknown as Record<string, unknown>))\n/* QUICK_CONNECT_OFFLINE_FILTER_END */`;
  result = result.slice(0, initializer.getStart(parsed)) + replacement + result.slice(initializer.getEnd());
  assertSyntax(productClientPath, result);
  return result;
}

function patchReplacementExports(content, filePath) {
  let result = addImport(content, filePath, REPLACEMENT_IMPORT_PATH, replacementMarker);
  if (result.includes('FITTING_REPLACEMENT_OFFLINE_FILTER_START')) return result;

  const parsed = parseSource(filePath, result);
  const edits = [];

  for (const statement of parsed.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const isExported = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExported) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer) continue;
      const initializerText = result.slice(declaration.initializer.getStart(parsed), declaration.initializer.getEnd());
      if (!/productCode|foreachModel|imagePath|compatibleModel/i.test(initializerText)) continue;
      if (initializerText.includes(replacementMarker)) continue;
      edits.push({
        start: declaration.initializer.getStart(parsed),
        end: declaration.initializer.getEnd(),
        text: `/* FITTING_REPLACEMENT_OFFLINE_FILTER_START */\n(${initializerText}).filter((item) => !${replacementMarker}(item as unknown as Record<string, unknown>))\n/* FITTING_REPLACEMENT_OFFLINE_FILTER_END */`,
      });
    }
  }

  if (edits.length === 0) {
    return { content: result, patchedArrays: 0 };
  }

  result = applyEdits(result, edits);
  assertSyntax(filePath, result);
  return { content: result, patchedArrays: edits.length };
}

function uniqueKeys(records) {
  return [...new Set(records.flatMap((record) => [record.productId, record.productCode, record.model]).map(clean).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true }));
}

function buildQuickHelper(records) {
  const keys = uniqueKeys(records);
  return `/* =========================================================\n   快插接头临时下架清单\n   原因：无图片、图片文件缺失或多个产品复用同一张图片\n   数量：${records.length}\n   生成时间：${now.toISOString()}\n========================================================= */\n\nexport const QUICK_CONNECT_OFFLINE_PRODUCT_KEYS = new Set<string>(\n  ${JSON.stringify(keys, null, 2)}\n);\n\nfunction text(value: unknown): string {\n  return String(value ?? "").trim();\n}\n\nexport function isQuickConnectProductOffline(\n  product: Record<string, unknown>\n): boolean {\n  const sourceType = text(product.sourceType).toLowerCase();\n  const typeId = text(product.productTypeId).toLowerCase();\n  const model = text(product.model);\n\n  const isQuickConnect =\n    sourceType.includes("quick-connect") ||\n    typeId === "quick-connect-fittings" ||\n    /^q\\d/i.test(model);\n\n  if (!isQuickConnect) return false;\n\n  const status = text(product.status).toLowerCase();\n  if (status && status !== "active") return true;\n\n  return [\n    product.productId,\n    product.productCode,\n    product.sku,\n    product.code,\n    product.model,\n  ]\n    .map(text)\n    .filter(Boolean)\n    .some((key) => QUICK_CONNECT_OFFLINE_PRODUCT_KEYS.has(key));\n}\n`;
}

function buildReplacementHelper(records) {
  const keys = uniqueKeys(records);
  return `/* =========================================================\n   接头替代查询临时下架清单\n   原因：无图片、占位图、图片文件缺失或快插产品复用同一张图片\n   数量：${records.length}\n   生成时间：${now.toISOString()}\n========================================================= */\n\nexport const FITTING_REPLACEMENT_OFFLINE_PRODUCT_KEYS = new Set<string>(\n  ${JSON.stringify(keys, null, 2)}\n);\n\nfunction text(value: unknown): string {\n  return String(value ?? "").trim();\n}\n\nexport function isFittingReplacementProductOffline(\n  product: Record<string, unknown>\n): boolean {\n  const imagePath = text(\n    product.imagePath || product.image || product.imageUrl\n  ).toLowerCase();\n\n  if (\n    !imagePath ||\n    imagePath.includes("placeholder") ||\n    imagePath.includes("no-image") ||\n    imagePath.includes("no_image") ||\n    imagePath.includes("/images/logo/") ||\n    imagePath.includes("foreach-logo") ||\n    imagePath.includes("quick connector_200x200_01_v001.jpg")\n  ) {\n    return true;\n  }\n\n  if (product.showOnHome === false) return true;\n\n  const status = text(product.status).toLowerCase();\n  if (status && status !== "active") return true;\n\n  return [\n    product.productId,\n    product.productCode,\n    product.code,\n    product.model,\n    product.foreachModel,\n    product.productModel,\n  ]\n    .map(text)\n    .filter(Boolean)\n    .some((key) => FITTING_REPLACEMENT_OFFLINE_PRODUCT_KEYS.has(key));\n}\n`;
}

function backup(filePath) {
  if (!fs.existsSync(filePath)) return;
  const target = path.join(backupDir, rel(filePath));
  ensureDir(path.dirname(target));
  fs.copyFileSync(filePath, target);
}

function restore(filePaths) {
  for (const filePath of filePaths) {
    const saved = path.join(backupDir, rel(filePath));
    if (fs.existsSync(saved)) {
      ensureDir(path.dirname(filePath));
      fs.copyFileSync(saved, filePath);
    } else if (filePath === quickHelperPath || filePath === replacementHelperPath) {
      fs.rmSync(filePath, { force: true });
    }
  }
}

function csvCell(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function reportRows(records, moduleName) {
  return records.map((record) => ({
    模块: moduleName,
    产品编码: record.productCode,
    产品ID: record.productId,
    型号: record.model,
    产品类型: record.productType || record.productTypeId,
    产品系列: record.productSeries,
    图片路径: record.image,
    下架原因: record.reason,
    数据文件: rel(record.filePath),
    行号: record.line,
  }));
}

function writeCsv(filePath, rows) {
  const headers = ['序号', '模块', '产品编码', '产品ID', '型号', '产品类型', '产品系列', '图片路径', '下架原因', '数据文件', '行号'];
  const lines = [headers.map(csvCell).join(',')];
  rows.forEach((row, index) => {
    lines.push([
      index + 1,
      row.模块,
      row.产品编码,
      row.产品ID,
      row.型号,
      row.产品类型,
      row.产品系列,
      row.图片路径,
      row.下架原因,
      row.数据文件,
      row.行号,
    ].map(csvCell).join(','));
  });
  fs.writeFileSync(filePath, '\uFEFF' + lines.join('\r\n'), 'utf8');
}

function main() {
  if (!fs.existsSync(quickSelectionPath)) throw new Error(`没有找到快插选型数据：${rel(quickSelectionPath)}`);
  if (!fs.existsSync(productClientPath)) throw new Error(`没有找到产品中心组件：${rel(productClientPath)}`);

  const existingReplacementPaths = replacementPaths.filter((filePath) => fs.existsSync(filePath));
  if (existingReplacementPaths.length === 0) throw new Error('没有找到接头替代查询生成数据文件。');

  const quickContent = fs.readFileSync(quickSelectionPath, 'utf8');
  const quickCollection = collectRecords(quickSelectionPath, quickContent, 'quick');
  const quickClassification = classifyRecords(quickCollection.records, { quickOnly: false });

  const replacementCollections = existingReplacementPaths.map((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    return { filePath, content, ...collectRecords(filePath, content, 'replacement') };
  });
  const replacementClassification = classifyRecords(
    replacementCollections.flatMap((item) => item.records),
    { quickOnly: true },
  );

  const quickOffline = quickClassification.offline;
  const replacementOffline = replacementClassification.offline;

  if (quickOffline.length === 0 && replacementOffline.length === 0) {
    console.log('没有发现需要新增下架的接头替代记录或复用图片快插。');
    return;
  }

  const staged = new Map();

  if (quickOffline.length > 0) {
    const quickEdits = quickOffline.map((record) =>
      propertyEdit(quickContent, record, ['status'], 'status', '"inactive"'),
    );
    const nextQuickContent = applyEdits(quickContent, quickEdits);
    assertSyntax(quickSelectionPath, nextQuickContent);
    staged.set(quickSelectionPath, nextQuickContent);

    const quickHelper = buildQuickHelper(quickOffline);
    assertSyntax(quickHelperPath, quickHelper);
    staged.set(quickHelperPath, quickHelper);

    const nextClient = patchSelectionClient(fs.readFileSync(productClientPath, 'utf8'));
    staged.set(productClientPath, nextClient);
  }

  const replacementByFile = new Map();
  for (const record of replacementOffline) {
    if (!replacementByFile.has(record.filePath)) replacementByFile.set(record.filePath, []);
    replacementByFile.get(record.filePath).push(record);
  }

  const replacementHelper = buildReplacementHelper(replacementOffline);
  assertSyntax(replacementHelperPath, replacementHelper);
  staged.set(replacementHelperPath, replacementHelper);

  for (const collection of replacementCollections) {
    const fileRecords = replacementByFile.get(collection.filePath) || [];
    let nextContent = collection.content;

    if (fileRecords.length > 0) {
      const edits = fileRecords.map((record) =>
        propertyEdit(collection.content, record, ['showOnHome'], 'showOnHome', 'false'),
      );
      nextContent = applyEdits(collection.content, edits);
    }

    const patched = patchReplacementExports(nextContent, collection.filePath);
    if (collection.records.length > 0 && patched.patchedArrays === 0 && !patched.content.includes('FITTING_REPLACEMENT_OFFLINE_FILTER_START')) {
      throw new Error(`没有找到可接入过滤器的替代查询产品数组：${rel(collection.filePath)}`);
    }
    nextContent = patched.content;
    assertSyntax(collection.filePath, nextContent);
    staged.set(collection.filePath, nextContent);
  }

  ensureDir(backupDir);
  ensureDir(reportDir);
  const changedFiles = [...staged.keys()];
  changedFiles.forEach(backup);

  try {
    for (const [filePath, content] of staged) {
      ensureDir(path.dirname(filePath));
      fs.writeFileSync(filePath, content, 'utf8');
    }

    if (quickOffline.length > 0) {
      const verifyQuick = collectRecords(
        quickSelectionPath,
        fs.readFileSync(quickSelectionPath, 'utf8'),
        'quick',
      ).records;
      const offlineKeys = new Set(uniqueKeys(quickOffline));
      for (const record of verifyQuick) {
        if ([record.productId, record.productCode, record.model].some((key) => offlineKeys.has(clean(key)))) {
          if (record.status.toLowerCase() !== 'inactive') {
            throw new Error(`复查失败：快插 ${record.model || record.productCode || record.productId} 未变为 inactive。`);
          }
        }
      }
    }

    for (const collection of replacementCollections) {
      const finalContent = fs.readFileSync(collection.filePath, 'utf8');
      if (collection.records.length > 0 && !finalContent.includes('FITTING_REPLACEMENT_OFFLINE_FILTER_START')) {
        throw new Error(`复查失败：${rel(collection.filePath)} 未接入替代查询产品过滤器。`);
      }
    }
  } catch (error) {
    restore(changedFiles);
    throw error;
  }

  const rows = [
    ...reportRows(quickOffline, '产品中心快插接头'),
    ...reportRows(replacementOffline, '接头替代查询'),
  ].sort((a, b) =>
    a.模块.localeCompare(b.模块, 'zh-CN') ||
    String(a.产品编码 || a.型号).localeCompare(String(b.产品编码 || b.型号), 'zh-CN', { numeric: true }),
  );

  const resultCsv = path.join(reportDir, `接头替代与复用图片快插下架清单_${stamp}.csv`);
  writeCsv(resultCsv, rows);

  const reportPath = path.join(reportDir, `接头替代与复用图片快插下架报告_${stamp}.md`);
  fs.writeFileSync(reportPath, [
    '# 接头替代与复用图片快插下架报告',
    '',
    `- 产品中心快插下架记录：${quickOffline.length}`,
    `- 接头替代查询下架记录：${replacementOffline.length}`,
    `- 快插无图或通用图：${quickClassification.missing.length}`,
    `- 快插图片内容重复：${quickClassification.shared.length}`,
    `- 替代查询无图、占位图或通用图：${replacementClassification.missing.length}`,
    `- 替代查询快插图片内容重复：${replacementClassification.shared.length}`,
    `- 备份目录：${rel(backupDir)}`,
    '',
    '## 处理方式',
    '',
    '- 产品中心快插记录状态改为 inactive。',
    '- 接头替代查询记录 showOnHome 改为 false。',
    '- 两个页面的数据出口均增加永久过滤清单。',
    '- 图片重复按文件 SHA-256 内容判断，不只比较文件名。',
    '- 没有修改泵、阀、针、管路或智控。',
    '',
  ].join('\n'), 'utf8');

  console.log('');
  console.log('============================================');
  console.log('接头替代与复用图片快插下架完成');
  console.log('============================================');
  console.log(`产品中心快插下架：${quickOffline.length}`);
  console.log(`接头替代查询下架：${replacementOffline.length}`);
  console.log(`备份目录：${backupDir}`);
  console.log(`结果清单：${resultCsv}`);
  console.log(`下架报告：${reportPath}`);
  console.log('');
}

try {
  main();
} catch (error) {
  console.error('');
  console.error('处理失败：');
  console.error(error instanceof Error ? error.message : String(error));
  console.error('');
  process.exit(1);
}

'@

[System.IO.File]::WriteAllText(
    $temporaryNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

$nodeExitCode = 0

try {
    node $temporaryNodeScript
    $nodeExitCode = $LASTEXITCODE
}
finally {
    Remove-Item `
        -LiteralPath $temporaryNodeScript `
        -Force `
        -ErrorAction SilentlyContinue
}

if ($nodeExitCode -ne 0) {
    throw '接头替代和复用图片快插处理失败。脚本已按备份机制恢复，请把完整错误发来。'
}

Write-Host ''
Write-Host '数据处理完成，开始执行构建检查……' -ForegroundColor Cyan
Write-Host ''

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host '下架数据已写入，但构建检查失败。' -ForegroundColor Red
    Write-Host '请不要提交代码，把完整构建错误发来。' -ForegroundColor Yellow
    throw 'npm run build 构建失败。'
}

Write-Host ''
Write-Host '============================================' -ForegroundColor Green
Write-Host '接头替代与复用图片快插处理完成' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host ''
Write-Host '查看本次修改：' -ForegroundColor Yellow
git status --short
Write-Host ''
git diff --stat
Write-Host ''
Write-Host '报告目录：' -ForegroundColor Cyan
Write-Host (Join-Path $projectRoot 'audit-reports\fitting-extra-offline')
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
