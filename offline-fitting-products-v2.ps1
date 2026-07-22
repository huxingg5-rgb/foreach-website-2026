# ============================================================
# 官网无主图接头批量下架
#
# 本脚本会：
# 1. 读取 audit-reports\fitting-main-images 下的指定 CSV
# 2. 严格校验 92 条接头记录
# 3. 将清单内接头状态改为 inactive
# 4. 接入永久下架过滤，防止重新生成数据后再次显示
# 5. 自动备份所有修改文件
# 6. 执行 npm run build 构建检查
#
# 不会修改泵、阀、针、管路和智控。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$temporaryNodeScript = Join-Path $projectRoot '.offline-fitting-products.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

Set-Location -LiteralPath $projectRoot

$csvPath = Join-Path `
    $projectRoot `
    'audit-reports\fitting-main-images\官网接头无主图清单_20260720-173258.csv'

if (-not (Test-Path -LiteralPath $csvPath)) {
    throw "没有找到下架清单：$csvPath"
}

Write-Host ''
Write-Host '准备下架官网无主图接头……' -ForegroundColor Cyan
Write-Host '目标数量：92 个' -ForegroundColor Yellow
Write-Host '泵、阀、针、管路和智控不会修改。' -ForegroundColor Yellow
Write-Host ''

$nodeScript = @'

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();
const csvPath = path.join(
  root,
  "audit-reports/fitting-main-images/官网接头无主图清单_20260720-173258.csv"
);
const clientPath = path.join(
  root,
  "components/products/selection/ProductSelectionClient.tsx"
);
const helperPath = path.join(
  root,
  "data/products/selection/fitting-offline-products.generated.ts"
);

const allowedCounts = new Map([
  ["data/products/selection/barbed-fitting-selection.generated.ts", 22],
  ["data/products/selection/thread-to-barbed-fitting-selection.generated.ts", 36],
  ["data/products/selection/filter-check-valve-selection.generated.ts", 28],
  ["data/products/selection/female-thread-adapter-selection.generated.ts", 5],
  ["data/products/selection/luer-fitting-selection.generated.ts", 1],
]);

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const stamp =
  now.getFullYear() +
  pad(now.getMonth() + 1) +
  pad(now.getDate()) +
  "-" +
  pad(now.getHours()) +
  pad(now.getMinutes()) +
  pad(now.getSeconds());

const backupDir = path.join(
  root,
  `.local-backups/fitting-offline-${stamp}`
);
const reportDir = path.join(
  root,
  `audit-reports/fitting-offline/${stamp}`
);

function clean(value) {
  return String(value ?? "").trim();
}

function rel(value) {
  return clean(value).replace(/\\/g, "/").replace(/^\.\/+/, "");
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function parseCsv(content) {
  const text = content.replace(/^\uFEFF/, "");
  const table = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      field = "";
      if (row.some(Boolean)) table.push(row);
      row = [];
    } else {
      field += char;
    }
  }

  row.push(field.replace(/\r$/, ""));
  if (row.some(Boolean)) table.push(row);

  if (table.length < 2) {
    throw new Error("CSV 中没有有效数据。");
  }

  const headers = table[0].map(clean);
  const required = [
    "产品编码",
    "型号",
    "产品ID",
    "产品名称",
    "接头类型",
    "当前状态",
    "详情Slug",
    "数据文件",
  ];

  for (const key of required) {
    if (!headers.includes(key)) {
      throw new Error(`CSV 缺少必要列：${key}`);
    }
  }

  return table.slice(1).map((values, index) => {
    const item = { __row: index + 2 };
    headers.forEach((header, column) => {
      item[header] = clean(values[column]);
    });
    return item;
  });
}

function scriptKind(filePath) {
  return filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.TS;
}

function sourceFile(filePath, content) {
  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind(filePath)
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
      (
        typeof ts.isSatisfiesExpression === "function" &&
        ts.isSatisfiesExpression(current)
      )
    )
  ) {
    current = current.expression;
  }

  return current;
}

function propName(node) {
  if (
    ts.isIdentifier(node) ||
    ts.isStringLiteral(node) ||
    ts.isNumericLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return String(node.text);
  }

  return "";
}

function prop(objectNode, name) {
  return (
    objectNode.properties.find(
      (item) =>
        ts.isPropertyAssignment(item) &&
        propName(item.name) === name
    ) || null
  );
}

function literal(node) {
  const value = unwrap(node);

  return value &&
    (
      ts.isStringLiteral(value) ||
      ts.isNumericLiteral(value) ||
      ts.isNoSubstitutionTemplateLiteral(value)
    )
    ? clean(value.text)
    : "";
}

function collectProducts(filePath, content) {
  const parsed = sourceFile(filePath, content);
  const products = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const productIdProperty = prop(node, "productId");
      const productId = productIdProperty
        ? literal(productIdProperty.initializer)
        : "";

      if (productId) {
        products.push({
          node,
          productId,
          statusProperty: prop(node, "status"),
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(parsed);

  return { parsed, products };
}

function indentAt(content, position) {
  const start = content.lastIndexOf("\n", position - 1) + 1;
  return (content.slice(start, position).match(/^[\t ]*/) || [""])[0];
}

function statusEdit(content, product) {
  if (product.statusProperty) {
    return {
      start: product.statusProperty.initializer.getStart(),
      end: product.statusProperty.initializer.getEnd(),
      text: '"inactive"',
    };
  }

  const end = product.node.getEnd() - 1;
  const baseIndent = indentAt(content, product.node.getStart());
  const itemIndent = baseIndent + "  ";
  const before = content.slice(0, end).trimEnd();
  const comma =
    product.node.properties.length > 0 &&
    !before.endsWith(",")
      ? ","
      : "";

  return {
    start: end,
    end,
    text: `${comma}\n${itemIndent}"status": "inactive"\n${baseIndent}`,
  };
}

function applyEdits(content, edits) {
  let result = content;

  for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
    result =
      result.slice(0, edit.start) +
      edit.text +
      result.slice(edit.end);
  }

  return result;
}

function assertSyntax(filePath, content) {
  const parsed = sourceFile(filePath, content);

  if (parsed.parseDiagnostics.length === 0) return;

  const message = parsed.parseDiagnostics
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      )
    )
    .join("\n");

  throw new Error(`TypeScript 语法检查失败：${filePath}\n${message}`);
}

function backup(filePath) {
  if (!fs.existsSync(filePath)) return;

  const target = path.join(
    backupDir,
    path.relative(root, filePath)
  );

  ensureDir(path.dirname(target));
  fs.copyFileSync(filePath, target);
}

function restore(filePaths) {
  for (const filePath of filePaths) {
    const saved = path.join(
      backupDir,
      path.relative(root, filePath)
    );

    if (fs.existsSync(saved)) {
      ensureDir(path.dirname(filePath));
      fs.copyFileSync(saved, filePath);
    } else if (filePath === helperPath) {
      fs.rmSync(filePath, { force: true });
    }
  }
}

function buildHelper(rows) {
  const keys = [
    ...new Set(
      rows.flatMap((row) => [
        row["产品ID"],
        row["产品编码"],
      ]).filter(Boolean)
    ),
  ].sort((a, b) =>
    a.localeCompare(b, "zh-CN", { numeric: true })
  );

  return `/* =========================================================
   官网接头下架清单
   来源：audit-reports/fitting-main-images/官网接头无主图清单_20260720-173258.csv
   数量：${rows.length}
   生成时间：${now.toISOString()}
========================================================= */

export const FITTING_OFFLINE_PRODUCT_KEYS = new Set<string>(
  ${JSON.stringify(keys, null, 2)}
);

function text(value: unknown): string {
  return String(value ?? "").trim();
}

export function isFittingProductOffline(
  product: Record<string, unknown>
): boolean {
  const category = text(product.categoryId).toLowerCase();
  const sourceType = text(product.sourceType).toLowerCase();
  const href = text(
    product.detailHref ||
      product.href ||
      product.productHref ||
      product.detailUrl
  ).toLowerCase();

  const isFitting =
    category === "fittings" ||
    sourceType.includes("fitting") ||
    sourceType.includes("adapter") ||
    sourceType.includes("check-valve") ||
    sourceType.includes("filter") ||
    href.includes("/products/fittings/");

  if (!isFitting) return false;

  const status = text(product.status).toLowerCase();

  if (status && status !== "active") {
    return true;
  }

  return [
    product.productId,
    product.productCode,
    product.sku,
    product.code,
  ]
    .map(text)
    .filter(Boolean)
    .some((key) =>
      FITTING_OFFLINE_PRODUCT_KEYS.has(key)
    );
}
`;
}

function findSelectionProductsArrayRange(content) {
  const parsed = sourceFile(clientPath, content);
  let arrayNode = null;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "selectionProducts" &&
      node.initializer
    ) {
      const initializer = unwrap(node.initializer);

      if (ts.isArrayLiteralExpression(initializer)) {
        arrayNode = initializer;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(parsed);

  if (arrayNode) {
    return {
      start: arrayNode.getStart(parsed),
      end: arrayNode.getEnd(),
    };
  }

  /*
     兼容当前项目里更复杂的写法：
     const selectionProducts = [ ... ] as ...
     const selectionProducts: Type[] = [ ... ]
     const selectionProducts = [ ... ] satisfies ...

     AST 无法直接拿到数组时，使用文本级括号匹配兜底。
  */
  const declarationPattern = /\bconst\s+selectionProducts\b[\s\S]{0,300}?=/g;
  const declarationMatch = declarationPattern.exec(content);

  if (!declarationMatch) {
    throw new Error(
      "没有找到 const selectionProducts = ... 声明。"
    );
  }

  const equalsIndex = content.indexOf(
    "=",
    declarationMatch.index
  );

  if (equalsIndex < 0) {
    throw new Error(
      "找到了 selectionProducts，但没有找到等号。"
    );
  }

  const arrayStart = content.indexOf(
    "[",
    equalsIndex + 1
  );

  if (arrayStart < 0) {
    throw new Error(
      "找到了 selectionProducts，但没有找到数组开始符号 [。"
    );
  }

  let depth = 0;
  let state = "code";
  let escaped = false;

  for (let index = arrayStart; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1] || "";

    if (state === "line-comment") {
      if (char === "\n") {
        state = "code";
      }
      continue;
    }

    if (state === "block-comment") {
      if (char === "*" && next === "/") {
        state = "code";
        index += 1;
      }
      continue;
    }

    if (state === "single-quote") {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "'") {
        state = "code";
      }
      continue;
    }

    if (state === "double-quote") {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        state = "code";
      }
      continue;
    }

    if (state === "template") {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "`") {
        state = "code";
      }
      continue;
    }

    if (char === "/" && next === "/") {
      state = "line-comment";
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      state = "block-comment";
      index += 1;
      continue;
    }

    if (char === "'") {
      state = "single-quote";
      escaped = false;
      continue;
    }

    if (char === '"') {
      state = "double-quote";
      escaped = false;
      continue;
    }

    if (char === "`") {
      state = "template";
      escaped = false;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start: arrayStart,
          end: index + 1,
        };
      }
    }
  }

  throw new Error(
    "selectionProducts 数组括号不完整，未找到对应的 ]。"
  );
}

function patchClient(content) {
  const importPath =
    "@/data/products/selection/fitting-offline-products.generated";

  const filterCall = "isFittingProductOffline(";

  if (
    content.includes(importPath) &&
    content.includes(filterCall)
  ) {
    return content;
  }

  let result = content;
  let parsed = sourceFile(clientPath, result);

  if (!result.includes(importPath)) {
    const imports = parsed.statements.filter(
      ts.isImportDeclaration
    );

    if (imports.length === 0) {
      throw new Error(
        "ProductSelectionClient.tsx 中没有找到 import。"
      );
    }

    const lastImport = imports[imports.length - 1];

    result =
      result.slice(0, lastImport.getEnd()) +
      `\nimport { isFittingProductOffline } from "${importPath}";` +
      result.slice(lastImport.getEnd());
  }

  const arrayRange = findSelectionProductsArrayRange(
    result
  );

  const arrayText = result.slice(
    arrayRange.start,
    arrayRange.end
  );

  const replacement =
    `${arrayText}.filter((product) => ` +
    `!isFittingProductOffline(` +
    `product as unknown as Record<string, unknown>` +
    `))`;

  const nextContent =
    result.slice(0, arrayRange.start) +
    replacement +
    result.slice(arrayRange.end);

  if (!nextContent.includes(importPath)) {
    throw new Error(
      "过滤器 import 接入失败。"
    );
  }

  if (!nextContent.includes(filterCall)) {
    throw new Error(
      "selectionProducts 下架过滤接入失败。"
    );
  }

  return nextContent;
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function main() {
  if (!fs.existsSync(csvPath)) {
    throw new Error(`没有找到清单：${csvPath}`);
  }

  if (!fs.existsSync(clientPath)) {
    throw new Error(`没有找到组件：${clientPath}`);
  }

  const rows = parseCsv(
    fs.readFileSync(csvPath, "utf8")
  );

  if (rows.length !== 92) {
    throw new Error(
      `清单数量不一致：预期 92 条，实际 ${rows.length} 条。`
    );
  }

  const counts = new Map();

  for (const row of rows) {
    const file = rel(row["数据文件"]);
    const productId = row["产品ID"];

    if (!allowedCounts.has(file)) {
      throw new Error(
        `CSV 第 ${row.__row} 行包含非允许文件：${file}`
      );
    }

    if (!productId) {
      throw new Error(
        `CSV 第 ${row.__row} 行缺少产品ID。`
      );
    }

    counts.set(file, (counts.get(file) || 0) + 1);
  }

  for (const [file, expected] of allowedCounts) {
    const actual = counts.get(file) || 0;
    if (actual !== expected) {
      throw new Error(
        `${file} 数量不一致：预期 ${expected}，实际 ${actual}。`
      );
    }
  }

  const duplicateKeys = new Set();

  for (const row of rows) {
    const key = `${rel(row["数据文件"])}::${row["产品ID"]}`;
    if (duplicateKeys.has(key)) {
      throw new Error(`CSV 中存在重复产品：${key}`);
    }
    duplicateKeys.add(key);
  }

  const grouped = new Map();

  for (const row of rows) {
    const file = rel(row["数据文件"]);
    if (!grouped.has(file)) grouped.set(file, []);
    grouped.get(file).push(row);
  }

  const staged = new Map();
  const resultRows = [];

  for (const [relativeFile, targetRows] of grouped) {
    const fullPath = path.join(root, relativeFile);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`没有找到数据文件：${relativeFile}`);
    }

    const content = fs.readFileSync(fullPath, "utf8");
    const { parsed, products } = collectProducts(fullPath, content);
    const edits = [];

    for (const row of targetRows) {
      const matches = products.filter(
        (product) =>
          product.productId === row["产品ID"]
      );

      if (matches.length !== 1) {
        throw new Error(
          `${relativeFile} 中产品ID ${row["产品ID"]} 匹配到 ${matches.length} 条。`
        );
      }

      const product = matches[0];
      const oldStatus = product.statusProperty
        ? literal(product.statusProperty.initializer)
        : "未配置";

      edits.push(statusEdit(content, product));

      const location =
        parsed.getLineAndCharacterOfPosition(
          product.node.getStart(parsed)
        );

      resultRows.push({
        产品编码: row["产品编码"],
        型号: row["型号"],
        产品ID: row["产品ID"],
        产品名称: row["产品名称"],
        接头类型: row["接头类型"],
        原状态: oldStatus,
        新状态: "inactive",
        详情Slug: row["详情Slug"],
        数据文件: relativeFile,
        匹配行号: location.line + 1,
      });
    }

    const nextContent = applyEdits(content, edits);
    assertSyntax(fullPath, nextContent);
    staged.set(fullPath, nextContent);
  }

  if (resultRows.length !== 92) {
    throw new Error(
      `实际匹配数量异常：${resultRows.length}。`
    );
  }

  const helperContent = buildHelper(rows);
  const clientContent = patchClient(
    fs.readFileSync(clientPath, "utf8")
  );

  assertSyntax(helperPath, helperContent);
  assertSyntax(clientPath, clientContent);

  staged.set(helperPath, helperContent);
  staged.set(clientPath, clientContent);

  ensureDir(backupDir);
  ensureDir(reportDir);

  const changedFiles = [...staged.keys()];

  for (const filePath of changedFiles) {
    backup(filePath);
  }

  fs.copyFileSync(
    csvPath,
    path.join(reportDir, path.basename(csvPath))
  );

  try {
    for (const [filePath, content] of staged) {
      ensureDir(path.dirname(filePath));
      fs.writeFileSync(filePath, content, "utf8");
    }

    for (const [relativeFile, targetRows] of grouped) {
      const fullPath = path.join(root, relativeFile);
      const content = fs.readFileSync(fullPath, "utf8");
      const { products } = collectProducts(fullPath, content);

      for (const row of targetRows) {
        const matches = products.filter(
          (product) =>
            product.productId === row["产品ID"]
        );

        if (matches.length !== 1) {
          throw new Error(
            `复查失败：${relativeFile} ${row["产品ID"]}。`
          );
        }

        const status = matches[0].statusProperty
          ? literal(matches[0].statusProperty.initializer)
          : "";

        if (status !== "inactive") {
          throw new Error(
            `复查失败：${relativeFile} ${row["产品ID"]} 状态不是 inactive。`
          );
        }
      }
    }

    const finalClient = fs.readFileSync(clientPath, "utf8");
    if (!finalClient.includes("isFittingProductOffline")) {
      throw new Error("复查失败：下架过滤未接入。");
    }
  } catch (error) {
    restore(changedFiles);
    throw error;
  }

  resultRows.sort((a, b) =>
    a.接头类型.localeCompare(b.接头类型, "zh-CN") ||
    a.产品ID.localeCompare(b.产品ID, "zh-CN", {
      numeric: true,
    })
  );

  const headers = [
    "序号",
    "产品编码",
    "型号",
    "产品ID",
    "产品名称",
    "接头类型",
    "原状态",
    "新状态",
    "详情Slug",
    "数据文件",
    "匹配行号",
  ];

  const csvLines = [
    headers.map(csvCell).join(","),
    ...resultRows.map((row, index) =>
      [
        index + 1,
        row.产品编码,
        row.型号,
        row.产品ID,
        row.产品名称,
        row.接头类型,
        row.原状态,
        row.新状态,
        row.详情Slug,
        row.数据文件,
        row.匹配行号,
      ].map(csvCell).join(",")
    ),
  ];

  const resultCsv = path.join(
    reportDir,
    `官网接头下架结果_${stamp}.csv`
  );

  fs.writeFileSync(
    resultCsv,
    "\uFEFF" + csvLines.join("\r\n"),
    "utf8"
  );

  const report = path.join(
    reportDir,
    `官网接头下架报告_${stamp}.md`
  );

  fs.writeFileSync(
    report,
    [
      "# 官网接头无主图产品下架报告",
      "",
      `- 下架数量：${resultRows.length}`,
      `- 备份目录：${rel(path.relative(root, backupDir))}`,
      "",
      "## 分类",
      "",
      ...[...allowedCounts].map(
        ([file]) => `- ${file}：${counts.get(file) || 0}`
      ),
      "",
      "## 处理方式",
      "",
      "- 清单内产品状态已改为 inactive。",
      "- 产品中心已接入永久下架过滤。",
      "- 后续重新生成接头数据，这 92 个产品仍不会重新显示。",
      "- 泵、阀、针、管路和智控均未修改。",
      "",
    ].join("\n"),
    "utf8"
  );

  console.log("");
  console.log("============================================");
  console.log("官网接头下架完成");
  console.log("============================================");
  console.log(`下架数量：${resultRows.length}`);
  console.log(`备份目录：${backupDir}`);
  console.log(`结果清单：${resultCsv}`);
  console.log(`下架报告：${report}`);
  console.log("");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error("下架失败：");
  console.error(
    error instanceof Error
      ? error.message
      : String(error)
  );
  console.error("");
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
    throw '接头下架失败。所有写入操作会按脚本中的备份机制恢复，请把完整错误发来。'
}

Write-Host ''
Write-Host '接头数据下架完成，开始构建检查……' -ForegroundColor Cyan
Write-Host ''

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host '接头下架已完成，但构建检查失败。' -ForegroundColor Red
    Write-Host '请不要提交代码，把完整构建错误发来。' -ForegroundColor Yellow
    throw 'npm run build 构建失败。'
}

Write-Host ''
Write-Host '============================================' -ForegroundColor Green
Write-Host '官网无主图接头已全部下架' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host ''
Write-Host '下架数量：92' -ForegroundColor Cyan
Write-Host '下架方式：inactive 状态 + 永久过滤清单' -ForegroundColor Cyan
Write-Host ''
Write-Host '查看本次修改：' -ForegroundColor Yellow
git status --short
Write-Host ''
git diff --stat
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
