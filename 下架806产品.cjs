const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

let ts;
try {
  ts = require('typescript');
} catch (error) {
  console.error('未找到 TypeScript。请先在项目根目录执行 npm install。');
  process.exit(1);
}

const project = process.cwd();
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const backupRoot = path.join(project, '.local-backups', `downlist-806-${runId}`);
const reportPath = path.join(project, '806产品下架报告.txt');

const listedProducts = [
  ['806033', 'BA-32-64-PP-N', 'ba-32-64-pp-n'],
  ['806036', 'BA-24-40-PP-N', 'ba-24-40-pp-n'],
  ['806037', 'BA-40-64-PP-N', 'ba-40-64-pp-n'],
  ['806055', 'BF4-24-PP-N', 'bf4-24-pp-n'],
  ['806147', 'BA-32-48-PP-N', 'ba-32-48-pp-n'],
  ['806148', 'BA-32-95-PP-N', 'ba-32-95-pp-n'],
  ['806189', 'BF4-32-PP-N', 'bf4-32-pp-n'],
  ['806192', 'BX4-24-PP-N', 'bx4-24-pp-n'],
  ['806197', 'BT-24-16-16-PP-N', 'bt-24-16-16-pp-n'],
  ['806201', 'BA-127-PP-N', 'ba-127-pp-n'],
  ['806208', 'BY-64-40-40-PP-N', 'by-64-40-40-pp-n'],
  ['806220', 'BX4-16-PP-N', 'bx4-16-pp-n'],
  ['806221', 'BX4-32-PP-N', 'bx4-32-pp-n'],
  ['806224', 'BF4-16-PP-N', 'bf4-16-pp-n'],
  ['806233', 'PMB-M6-40-PP-N', 'pmb-m6-40-pp-n'],
  ['806235', 'PMB-M10-64-PP-N', 'pmb-m10-64-pp-n'],
  ['806236', 'PMB-M12-79-PP-N', 'pmb-m12-79-pp-n'],
  ['806256', 'BA-95-127-PP-N', 'ba-95-127-pp-n'],
  ['806272', 'BA-40-79-AC-W', 'ba-40-79-ac-w'],
  ['806276', 'BA-48-95-PP-N', 'ba-48-95-pp-n'],
  ['806282', 'BY-79-PP-N', 'by-79-pp-n'],
];

const targetCodes = new Set(listedProducts.map(([code]) => code));
const targetModels = new Set(listedProducts.map(([, model]) => model.toUpperCase()));
const targetSlugs = new Set(listedProducts.map(([, , slug]) => slug.toLowerCase()));
const targetRoutes = new Set(
  listedProducts.flatMap(([, , slug]) => [
    `/products/fittings/barbed-fittings/${slug}`,
    `/products/fittings/bulkhead-barbed-fittings/${slug}`,
    `/en/products/fittings/barbed-fittings/${slug}`,
    `/en/products/fittings/bulkhead-barbed-fittings/${slug}`,
  ]),
);

const sourceRoots = ['data', 'app', 'components', 'lib']
  .map((item) => path.join(project, item))
  .filter(fs.existsSync);

const mutableExtensions = new Set(['.json', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const textExtensions = new Set(['.json', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html', '.txt']);
const codeKeyPattern = /(productcode|product_code|goodscode|goods_code|itemcode|item_code|sku|code|商品编码)/i;
const slugKeyPattern = /(slug|productslug|routekey)/i;
const modelKeyPattern = /(model|modelname|modelcode|foreachmodel|title)/i;
const routeKeyPattern = /(href|url|path|route|detailhref|detailurl)/i;

const changedFiles = [];
const deletedFiles = [];
const removalLog = [];
const backupManifest = [];
let totalRemovedRecords = 0;

function normalizeSlashes(value) {
  return String(value || '').replace(/\\/g, '/');
}

function relative(filePath) {
  return path.relative(project, filePath).replace(/\\/g, '/');
}

function shouldSkip(filePath) {
  const normalized = normalizeSlashes(filePath);
  return (
    normalized.includes('/node_modules/') ||
    normalized.includes('/.next/') ||
    normalized.includes('/out/') ||
    normalized.includes('/.git/') ||
    normalized.includes('/.local-backups/') ||
    /\.bak(?:_|\.)/i.test(normalized)
  );
}

function walk(root, files = []) {
  if (!fs.existsSync(root)) return files;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (shouldSkip(fullPath)) continue;
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureBackup(filePath) {
  const rel = path.relative(project, filePath);
  const backupPath = path.join(backupRoot, rel);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.copyFileSync(filePath, backupPath);
  backupManifest.push({ source: filePath, backup: backupPath });
}

function restoreAll() {
  for (const item of backupManifest.slice().reverse()) {
    fs.mkdirSync(path.dirname(item.source), { recursive: true });
    fs.copyFileSync(item.backup, item.source);
  }
}

function stringMatchesTarget(value, key = '') {
  const raw = String(value || '').trim();
  if (!raw) return false;

  const upper = raw.toUpperCase();
  const lower = normalizeSlashes(raw).toLowerCase();

  if (targetCodes.has(raw) || targetModels.has(upper) || targetSlugs.has(lower)) {
    return true;
  }

  if (codeKeyPattern.test(key) && raw.startsWith('806')) {
    return true;
  }

  if (slugKeyPattern.test(key) && targetSlugs.has(lower)) {
    return true;
  }

  if (modelKeyPattern.test(key) && targetModels.has(upper)) {
    return true;
  }

  if (routeKeyPattern.test(key)) {
    for (const slug of targetSlugs) {
      if (lower.endsWith(`/${slug}`) || lower.includes(`/${slug}/`)) {
        return true;
      }
    }
  }

  return false;
}

function getRecordIdentifier(record) {
  if (!record || typeof record !== 'object') return '';
  const candidates = [
    record.productCode,
    record.product_code,
    record.goodsCode,
    record.itemCode,
    record.sku,
    record.code,
    record.model,
    record.modelName,
    record.slug,
    record.href,
  ];
  return candidates.map((item) => String(item || '').trim()).find(Boolean) || '';
}

function objectMatchesTarget(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false;

  for (const [key, value] of Object.entries(record)) {
    if (typeof value === 'string' || typeof value === 'number') {
      if (stringMatchesTarget(value, key)) return true;
    }
  }

  return false;
}

function keyMatchesTarget(key) {
  const raw = String(key || '').trim();
  return (
    targetCodes.has(raw) ||
    targetModels.has(raw.toUpperCase()) ||
    targetSlugs.has(raw.toLowerCase())
  );
}

function transformJson(value, context = { file: '', key: '' }) {
  if (Array.isArray(value)) {
    const next = [];
    for (const item of value) {
      const primitiveMatch =
        (typeof item === 'string' || typeof item === 'number') &&
        stringMatchesTarget(item, context.key);
      const recordMatch = objectMatchesTarget(item);

      if (primitiveMatch || recordMatch) {
        totalRemovedRecords += 1;
        removalLog.push(`${context.file} | 删除：${getRecordIdentifier(item) || String(item)}`);
        continue;
      }

      next.push(transformJson(item, context));
    }
    return next;
  }

  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, child] of Object.entries(value)) {
      if (keyMatchesTarget(key)) {
        totalRemovedRecords += 1;
        removalLog.push(`${context.file} | 删除对象键：${key}`);
        continue;
      }
      next[key] = transformJson(child, { file: context.file, key });
    }

    for (const arrayKey of ['products', 'items', 'records', 'routes']) {
      if (Array.isArray(next[arrayKey])) {
        for (const countKey of ['total', 'count', 'totalCount', 'productCount']) {
          if (typeof next[countKey] === 'number') {
            next[countKey] = next[arrayKey].length;
          }
        }
        break;
      }
    }

    return next;
  }

  return value;
}

function processJsonFile(filePath) {
  const rel = relative(filePath);
  const baseName = path.basename(filePath, path.extname(filePath)).toLowerCase();

  if (targetSlugs.has(baseName) && normalizeSlashes(filePath).includes('/data/products/')) {
    ensureBackup(filePath);
    fs.unlinkSync(filePath);
    deletedFiles.push(rel);
    removalLog.push(`${rel} | 删除产品独立数据文件`);
    totalRemovedRecords += 1;
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(original.replace(/^\uFEFF/, ''));
  } catch {
    return;
  }

  const transformed = transformJson(parsed, { file: rel, key: '' });
  const output = `${JSON.stringify(transformed, null, 2)}\n`;
  const normalizedOriginal = `${JSON.stringify(parsed, null, 2)}\n`;

  if (output === normalizedOriginal) return;

  ensureBackup(filePath);
  fs.writeFileSync(filePath, output, 'utf8');
  changedFiles.push(rel);
}

function propertyNameText(nameNode) {
  if (!nameNode) return '';
  if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode) || ts.isNumericLiteral(nameNode)) {
    return nameNode.text;
  }
  return nameNode.getText().replace(/^['"]|['"]$/g, '');
}

function literalValue(node) {
  if (!node) return undefined;
  if (ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function objectLiteralMatches(node) {
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const key = propertyNameText(property.name);
    const value = literalValue(property.initializer);
    if (value !== undefined && stringMatchesTarget(value, key)) {
      return true;
    }
  }
  return false;
}

function nodeRemovalRange(node, sourceFile) {
  const parent = node.parent;
  if (parent && ts.isArrayLiteralExpression(parent)) {
    const elements = Array.from(parent.elements);
    const index = elements.indexOf(node);
    if (index >= 0) {
      if (elements.length === 1) {
        return { start: node.getFullStart(), end: node.getEnd() };
      }
      if (index < elements.length - 1) {
        return { start: node.getFullStart(), end: elements[index + 1].getFullStart() };
      }
      return { start: elements[index - 1].getEnd(), end: node.getEnd() };
    }
  }

  if (parent && ts.isPropertyAssignment(parent) && parent.initializer === node) {
    return nodeRemovalRange(parent, sourceFile);
  }

  if (parent && ts.isObjectLiteralExpression(parent)) {
    const properties = Array.from(parent.properties);
    const index = properties.indexOf(node);
    if (index >= 0) {
      if (properties.length === 1) {
        return { start: node.getFullStart(), end: node.getEnd() };
      }
      if (index < properties.length - 1) {
        return { start: node.getFullStart(), end: properties[index + 1].getFullStart() };
      }
      return { start: properties[index - 1].getEnd(), end: node.getEnd() };
    }
  }

  return null;
}

function filterSiteSearchJsonLiteral(source, filePath) {
  const pattern = /const\s+siteSearchIndexJson\s*=\s*("(?:\\.|[^"\\])*")\s*;/;
  const match = source.match(pattern);
  if (!match) return { source, changed: false, removed: 0 };

  let jsonText;
  let items;
  try {
    jsonText = JSON.parse(match[1]);
    items = JSON.parse(jsonText);
  } catch {
    return { source, changed: false, removed: 0 };
  }

  if (!Array.isArray(items)) return { source, changed: false, removed: 0 };

  const kept = items.filter((item) => !objectMatchesTarget(item));
  const removed = items.length - kept.length;
  if (removed === 0) return { source, changed: false, removed: 0 };

  const replacement = `const siteSearchIndexJson = ${JSON.stringify(JSON.stringify(kept))};`;
  return {
    source: source.replace(match[0], replacement),
    changed: true,
    removed,
  };
}

function processGeneratedCodeFile(filePath) {
  const normalizedPath = normalizeSlashes(filePath).toLowerCase();
  const isGenerated = normalizedPath.includes('.generated.') || normalizedPath.includes('/generated/');
  if (!isGenerated) return;

  const original = fs.readFileSync(filePath, 'utf8');
  let source = original;
  let removedInFile = 0;

  const searchResult = filterSiteSearchJsonLiteral(source, filePath);
  if (searchResult.changed) {
    source = searchResult.source;
    removedInFile += searchResult.removed;
  }

  const kind = filePath.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : filePath.endsWith('.jsx')
      ? ts.ScriptKind.JSX
      : filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.cjs')
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS;

  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, kind);
  const candidateNodes = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node) && objectLiteralMatches(node)) {
      candidateNodes.push(node);
      return;
    }

    if (
      (ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) &&
      node.parent &&
      ts.isArrayLiteralExpression(node.parent) &&
      stringMatchesTarget(node.text, '')
    ) {
      candidateNodes.push(node);
      return;
    }

    if (ts.isPropertyAssignment(node) && keyMatchesTarget(propertyNameText(node.name))) {
      candidateNodes.push(node);
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  const ranges = [];
  for (const node of candidateNodes) {
    const range = nodeRemovalRange(node, sourceFile);
    if (range) ranges.push(range);
  }

  ranges.sort((a, b) => b.start - a.start || b.end - a.end);
  const accepted = [];
  for (const range of ranges) {
    if (accepted.some((item) => range.start >= item.start && range.end <= item.end)) {
      continue;
    }
    accepted.push(range);
  }

  for (const range of accepted) {
    source = source.slice(0, range.start) + source.slice(range.end);
    removedInFile += 1;
  }

  if (source === original) return;

  ensureBackup(filePath);
  fs.writeFileSync(filePath, source, 'utf8');
  changedFiles.push(relative(filePath));
  totalRemovedRecords += removedInFile;
  removalLog.push(`${relative(filePath)} | 删除生成数据项：${removedInFile}`);
}

function scanRemaining(rootPaths) {
  const matches = [];
  const tokens = [...targetCodes, ...targetSlugs];

  for (const root of rootPaths) {
    for (const filePath of walk(root, [])) {
      if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue;
      let content;
      try {
        content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      } catch {
        continue;
      }
      const found = tokens.filter((token) => content.includes(token.toLowerCase()));
      const extra806Codes = Array.from(new Set(content.match(/\b806\d{3,}\b/g) || []));
      const allFound = Array.from(new Set([...found, ...extra806Codes]));
      if (allFound.length > 0) {
        matches.push(`${relative(filePath)} | ${allFound.join(', ')}`);
      }
    }
  }

  return matches;
}

function scanExportedRoutes() {
  const outputRoots = [path.join(project, 'out'), path.join(project, '.next', 'server', 'app')]
    .filter(fs.existsSync);
  const matches = [];

  for (const root of outputRoots) {
    for (const filePath of walk(root, [])) {
      const relLower = normalizeSlashes(path.relative(root, filePath)).toLowerCase();
      for (const slug of targetSlugs) {
        if (relLower.includes(slug)) {
          matches.push(`${relative(filePath)} | 路径仍包含 ${slug}`);
          break;
        }
      }

      const ext = path.extname(filePath).toLowerCase();
      if (!new Set(['.html', '.json', '.js']).has(ext)) continue;
      if (relLower.includes('/documents/') || relLower.includes('/images/') || relLower.includes('/assets/')) {
        continue;
      }

      let content;
      try {
        content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      } catch {
        continue;
      }

      const found = [...targetCodes, ...targetSlugs].filter((token) => content.includes(token.toLowerCase()));
      const extra806Codes = Array.from(new Set(content.match(/\b806\d{3,}\b/g) || []));
      const allFound = Array.from(new Set([...found, ...extra806Codes]));
      if (allFound.length > 0) {
        matches.push(`${relative(filePath)} | 页面内容仍包含 ${allFound.join(', ')}`);
      }
    }
  }

  return Array.from(new Set(matches));
}

function writeReport({ sourceRemaining = [], exportRemaining = [], buildPassed = false, restored = false }) {
  const lines = [
    '806 产品下架报告',
    `执行时间：${new Date().toLocaleString('zh-CN')}`,
    `项目目录：${project}`,
    `清单产品数：${listedProducts.length}`,
    `移除的数据项：${totalRemovedRecords}`,
    `修改文件数：${changedFiles.length}`,
    `删除独立数据文件数：${deletedFiles.length}`,
    `构建结果：${buildPassed ? '通过' : '未通过'}`,
    `是否已自动恢复：${restored ? '是' : '否'}`,
    `备份目录：${backupRoot}`,
    '',
    '一、下架产品',
    ...listedProducts.map(([code, model, slug], index) => `${index + 1}. ${code} | ${model} | ${slug}`),
    '',
    '二、修改文件',
    ...(changedFiles.length ? changedFiles : ['无']),
    '',
    '三、删除的数据文件',
    ...(deletedFiles.length ? deletedFiles : ['无']),
    '',
    '四、移除记录',
    ...(removalLog.length ? removalLog : ['无']),
    '',
    '五、源码中剩余匹配（仅供核对）',
    ...(sourceRemaining.length ? sourceRemaining : ['无']),
    '',
    '六、构建产物中剩余匹配',
    ...(exportRemaining.length ? exportRemaining : ['无']),
    '',
    '说明：本脚本只下架产品数据、筛选项、详情路由和搜索索引，不删除产品图片、PDF 或其他资源文件。',
  ];
  fs.writeFileSync(reportPath, `${lines.join('\r\n')}\r\n`, 'utf8');
}

try {
  fs.mkdirSync(backupRoot, { recursive: true });

  const allSourceFiles = sourceRoots.flatMap((root) => walk(root, []));

  for (const filePath of allSourceFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!mutableExtensions.has(ext)) continue;

    if (ext === '.json' && normalizeSlashes(filePath).includes('/data/products/')) {
      processJsonFile(filePath);
      continue;
    }

    if (ext !== '.json') {
      processGeneratedCodeFile(filePath);
    }
  }

  const sourceRemaining = scanRemaining(sourceRoots);
  const activeProductDataRemaining = sourceRemaining.filter((line) =>
    line.startsWith('data/products/') ||
    line.startsWith('data/search/') ||
    line.startsWith('data/resources/fitting-replacement/'),
  );

  if (activeProductDataRemaining.length > 0) {
    throw new Error(
      `下架后仍在活动产品数据中发现 ${activeProductDataRemaining.length} 处 806 产品引用。\n` +
      activeProductDataRemaining.slice(0, 20).join('\n'),
    );
  }

  for (const generatedDir of [path.join(project, '.next'), path.join(project, 'out')]) {
    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true, force: true });
    }
  }

  console.log('');
  console.log(`已修改 ${changedFiles.length} 个文件，移除 ${totalRemovedRecords} 条数据。`);
  console.log('开始构建验证……');
  console.log('');

  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const build = spawnSync(npmCommand, ['run', 'build'], {
    cwd: project,
    stdio: 'inherit',
    shell: false,
  });

  if (build.status !== 0) {
    throw new Error(`npm run build 失败，退出码：${build.status}`);
  }

  const exportRemaining = scanExportedRoutes();
  if (exportRemaining.length > 0) {
    throw new Error(
      `构建产物中仍发现 ${exportRemaining.length} 处 806 产品引用。\n` +
      exportRemaining.slice(0, 20).join('\n'),
    );
  }

  writeReport({ sourceRemaining, exportRemaining, buildPassed: true, restored: false });

  console.log('');
  console.log('806 产品已全部下架，构建与导出验证通过。');
  console.log(`报告：${reportPath}`);
  console.log(`备份：${backupRoot}`);
  console.log('');
} catch (error) {
  console.error('');
  console.error(error instanceof Error ? error.message : String(error));
  console.error('修改失败，正在自动恢复备份……');

  try {
    restoreAll();
    writeReport({ sourceRemaining: [], exportRemaining: [], buildPassed: false, restored: true });
    console.error('已恢复所有被修改文件。');
    console.error(`失败报告：${reportPath}`);
  } catch (restoreError) {
    console.error('自动恢复失败：');
    console.error(restoreError);
  }

  process.exit(1);
}
