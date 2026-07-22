# ============================================================
# 将已下架的 92 个无主图接头（V4）
# 精确同步到“接头替代查询”
#
# V3 修复临时 JSON BOM，并修复写入后的零匹配复查。
# 本版不再接入过滤函数，而是：
# 1. 从 CSV 读取 92 个商品编码 / 产品 ID
# 2. 只删除两个替代查询生成数组中精确命中的对象
# 3. 强制要求只命中 3 个商品、6 条记录
# 4. 数量不一致立即停止，不写文件
# 5. 自动备份、构建检查和失败回滚
#
# 不会修改产品中心任何文件。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$csvPath = Join-Path `
    $projectRoot `
    'audit-reports\fitting-main-images\官网接头无主图清单_20260720-173258.csv'

$tempTargetJson = Join-Path `
    $projectRoot `
    '.sync-fitting-replacement-targets.json'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.sync-fitting-replacement-direct-remove.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $csvPath)) {
    throw "没有找到 92 个接头清单：$csvPath"
}

Set-Location -LiteralPath $projectRoot

$rows = Import-Csv `
    -LiteralPath $csvPath

if ($rows.Count -ne 92) {
    throw "CSV 数量不正确：预期 92 条，实际 $($rows.Count) 条。"
}

$targets = foreach ($row in $rows) {
    $code = [string]$row.'产品编码'

    if ([string]::IsNullOrWhiteSpace($code)) {
        $code = [string]$row.'产品ID'
    }

    [PSCustomObject]@{
        code  = $code.Trim()
        model = ([string]$row.'型号').Trim()
    }
}

$targetJsonText = $targets |
    ConvertTo-Json -Depth 4

# 使用无 BOM 的 UTF-8 写入，避免 Node JSON.parse 把 BOM 当成非法字符。
[System.IO.File]::WriteAllText(
    $tempTargetJson,
    $targetJsonText,
    [System.Text.UTF8Encoding]::new($false)
)

$nodeScript = @'

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();
const targetJsonPath = path.join(root, ".sync-fitting-replacement-targets.json");

const replacementFiles = [
  path.join(
    root,
    "data/resources/fitting-replacement/all-compatible-products.generated.ts"
  ),
  path.join(
    root,
    "data/resources/fitting-replacement/compatible-models.generated.ts"
  ),
];

const oldHelperPath = path.join(
  root,
  "data/resources/fitting-replacement/fitting-replacement-hidden-products.generated.ts"
);

const oldMarkers = [
  "FITTING_REPLACEMENT_92_SYNC_FILTER_START",
  "FITTING_REPLACEMENT_92_SYNC_FILTER_END",
  "isFittingReplacementProductHidden",
  "fitting-replacement-hidden-products.generated",
  "FITTING_REPLACEMENT_OFFLINE_FILTER_START",
  "isFittingReplacementProductOffline",
  "fitting-replacement-offline.generated",
];

function normalize(value) {
  return String(value ?? "").trim().toUpperCase();
}

function rel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function timeStamp() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "-",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function parseSource(filePath, source) {
  return ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
}

function assertSyntax(filePath, source) {
  const parsed = parseSource(filePath, source);

  if (parsed.parseDiagnostics.length === 0) {
    return;
  }

  const message = parsed.parseDiagnostics
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
    )
    .join("\n");

  throw new Error(`${rel(filePath)} TypeScript 语法检查失败：\n${message}`);
}

function propertyName(property) {
  const name = property.name;

  if (!name) {
    return "";
  }

  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return String(name.text);
  }

  return "";
}

function literalValue(expression) {
  if (
    ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression) ||
    ts.isNumericLiteral(expression)
  ) {
    return String(expression.text);
  }

  if (
    ts.isPrefixUnaryExpression(expression) &&
    ts.isNumericLiteral(expression.operand)
  ) {
    return `${expression.operator === ts.SyntaxKind.MinusToken ? "-" : ""}${
      expression.operand.text
    }`;
  }

  return "";
}

function objectValues(objectNode) {
  const values = new Map();

  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = propertyName(property);
    if (!key) {
      continue;
    }

    values.set(key, literalValue(property.initializer));
  }

  return values;
}

function unwrapArrayExpression(expression) {
  let current = expression;

  while (current) {
    if (ts.isArrayLiteralExpression(current)) {
      return current;
    }

    if (
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isNonNullExpression(current)
    ) {
      current = current.expression;
      continue;
    }

    if (
      typeof ts.isSatisfiesExpression === "function" &&
      ts.isSatisfiesExpression(current)
    ) {
      current = current.expression;
      continue;
    }

    break;
  }

  return null;
}

function isExportedVariableStatement(statement) {
  return Boolean(
    statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
    )
  );
}

function identifyRecord(objectNode) {
  const values = objectValues(objectNode);

  const codeValues = [
    values.get("productCode"),
    values.get("productId"),
    values.get("code"),
    values.get("sku"),
  ]
    .map(normalize)
    .filter(Boolean);

  const modelValues = [
    values.get("foreachModel"),
    values.get("productModel"),
    values.get("model"),
  ]
    .map(normalize)
    .filter(Boolean);

  return {
    codeValues,
    modelValues,
    productCode:
      codeValues[0] ||
      "",
    model:
      modelValues[0] ||
      "",
    title:
      values.get("title") ||
      values.get("name") ||
      "",
    compatibleModel:
      values.get("compatibleModel") ||
      values.get("competitorModel") ||
      "",
  };
}

if (!fs.existsSync(targetJsonPath)) {
  throw new Error(`没有找到临时目标清单：${rel(targetJsonPath)}`);
}

const targetJsonSource = fs
  .readFileSync(targetJsonPath, "utf8")
  .replace(/^\uFEFF/, "");

const targetRows = JSON.parse(targetJsonSource);

if (!Array.isArray(targetRows) || targetRows.length !== 92) {
  throw new Error(
    `目标清单数量不正确：预期 92，实际 ${
      Array.isArray(targetRows) ? targetRows.length : 0
    }。脚本已停止。`
  );
}

const targetCodes = new Set(
  targetRows.map((row) => normalize(row.code)).filter(Boolean)
);
const targetModels = new Set(
  targetRows.map((row) => normalize(row.model)).filter(Boolean)
);

if (targetCodes.size !== 92) {
  throw new Error(
    `目标商品编码去重后不是 92 个，而是 ${targetCodes.size} 个。脚本已停止。`
  );
}

for (const filePath of replacementFiles) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`没有找到接头替代数据文件：${rel(filePath)}`);
  }
}

for (const filePath of replacementFiles) {
  const source = fs.readFileSync(filePath, "utf8");

  for (const marker of oldMarkers) {
    if (source.includes(marker)) {
      throw new Error(
        `${rel(filePath)} 仍包含上一版过滤标记：${marker}\n` +
          "请先确认上一版脚本已经回滚，再运行本脚本。"
      );
    }
  }
}

if (fs.existsSync(oldHelperPath)) {
  throw new Error(
    `${rel(oldHelperPath)} 仍然存在。\n` +
      "这通常表示上一版过滤脚本没有完全恢复。请先不要继续修改。"
  );
}

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
});

function analyzeAndPrepare(filePath, { allowZero = false } = {}) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = parseSource(filePath, source);
  const edits = [];
  const matches = [];

  for (const statement of parsed.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !isExportedVariableStatement(statement)
    ) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer) {
        continue;
      }

      const arrayNode = unwrapArrayExpression(declaration.initializer);

      if (!arrayNode || arrayNode.elements.length === 0) {
        continue;
      }

      const recordElements = arrayNode.elements.filter((element) =>
        ts.isObjectLiteralExpression(element)
      );

      if (recordElements.length !== arrayNode.elements.length) {
        continue;
      }

      const relevantCount = recordElements.filter((element) => {
        const record = identifyRecord(element);
        return (
          record.codeValues.length > 0 ||
          record.modelValues.length > 0
        );
      }).length;

      if (relevantCount === 0) {
        continue;
      }

      const keptElements = [];
      let removedFromArray = 0;

      for (const element of arrayNode.elements) {
        const record = identifyRecord(element);

        const matchedByCode = record.codeValues.some((value) =>
          targetCodes.has(value)
        );

        const matchedByModel =
          record.codeValues.length === 0 &&
          record.modelValues.some((value) =>
            targetModels.has(value)
          );

        if (matchedByCode || matchedByModel) {
          removedFromArray += 1;
          matches.push({
            file: rel(filePath),
            productCode: record.productCode,
            model: record.model,
            title: record.title,
            compatibleModel: record.compatibleModel,
            matchedBy: matchedByCode ? "商品编码/产品ID" : "FOREACH型号兜底",
          });
          continue;
        }

        keptElements.push(element);
      }

      if (removedFromArray === 0) {
        continue;
      }

      const updatedArray = ts.factory.updateArrayLiteralExpression(
        arrayNode,
        keptElements
      );

      const replacement = printer.printNode(
        ts.EmitHint.Expression,
        updatedArray,
        parsed
      );

      edits.push({
        start: arrayNode.getStart(parsed),
        end: arrayNode.getEnd(),
        replacement,
        removedFromArray,
      });
    }
  }

  if (edits.length === 0) {
    if (allowZero) {
      return {
        filePath,
        source,
        updatedSource: source,
        matches: [],
        removedCount: 0,
        editedArrays: 0,
      };
    }

    throw new Error(
      `${rel(filePath)} 没有找到需要删除的目标记录。脚本已停止。`
    );
  }

  edits.sort((a, b) => b.start - a.start);

  let updatedSource = source;

  for (const edit of edits) {
    updatedSource =
      updatedSource.slice(0, edit.start) +
      edit.replacement +
      updatedSource.slice(edit.end);
  }

  assertSyntax(filePath, updatedSource);

  return {
    filePath,
    source,
    updatedSource,
    matches,
    removedCount: matches.length,
    editedArrays: edits.length,
  };
}

const preparedFiles = replacementFiles.map(analyzeAndPrepare);
const allMatches = preparedFiles.flatMap((item) => item.matches);
const matchedCodes = new Set(
  allMatches.map((item) => normalize(item.productCode)).filter(Boolean)
);

const expectedPerFile = new Map([
  [
    "data/resources/fitting-replacement/all-compatible-products.generated.ts",
    3,
  ],
  [
    "data/resources/fitting-replacement/compatible-models.generated.ts",
    3,
  ],
]);

console.log("");
console.log("接头替代查询精确删除复查：");
console.log(`目标商品：${targetCodes.size} 个`);
console.log(`实际命中的目标商品：${matchedCodes.size} 个`);
console.log(`准备删除的替代查询记录：${allMatches.length} 条`);

for (const item of preparedFiles) {
  console.log(
    `- ${rel(item.filePath)}：删除 ${item.removedCount} 条，修改 ${item.editedArrays} 个数组`
  );
}

if (matchedCodes.size !== 3 || allMatches.length !== 6) {
  throw new Error(
    "本次匹配数量与上一轮只读审计不一致。\n" +
      `预期：3 个商品、6 条记录；实际：${matchedCodes.size} 个商品、${allMatches.length} 条记录。\n` +
      "脚本已停止，没有修改文件。"
  );
}

for (const item of preparedFiles) {
  const expected = expectedPerFile.get(rel(item.filePath));

  if (item.removedCount !== expected) {
    throw new Error(
      `${rel(item.filePath)} 匹配数量异常：预期 ${expected} 条，实际 ${item.removedCount} 条。\n` +
        "脚本已停止，没有修改文件。"
    );
  }
}

const stamp = timeStamp();
const backupDirectory = path.join(
  root,
  `.local-backups/fitting-replacement-direct-remove-${stamp}`
);
const reportDirectory = path.join(
  root,
  `audit-reports/fitting-replacement-direct-remove/${stamp}`
);

ensureDirectory(backupDirectory);
ensureDirectory(reportDirectory);

function writeCsv(filePath, rows) {
  const headers = [
    "序号",
    "数据文件",
    "商品编码",
    "FOREACH型号",
    "兼容型号",
    "标题",
    "匹配方式",
  ];

  function csvCell(value) {
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }

  const lines = [
    headers.map(csvCell).join(","),
    ...rows.map((row, index) =>
      [
        index + 1,
        row.file,
        row.productCode,
        row.model,
        row.compatibleModel,
        row.title,
        row.matchedBy,
      ]
        .map(csvCell)
        .join(",")
    ),
  ];

  fs.writeFileSync(
    filePath,
    "\uFEFF" + lines.join("\r\n"),
    "utf8"
  );
}

writeCsv(
  path.join(reportDirectory, "本次精确删除记录.csv"),
  allMatches
);

fs.writeFileSync(
  path.join(reportDirectory, "审计摘要.md"),
  [
    "# 接头替代查询精确同步",
    "",
    `- 原始目标商品：${targetCodes.size} 个`,
    `- 实际命中商品：${matchedCodes.size} 个`,
    `- 精确删除记录：${allMatches.length} 条`,
    "",
    "## 修改范围",
    "",
    ...preparedFiles.map(
      (item) =>
        `- ${rel(item.filePath)}：删除 ${item.removedCount} 条`
    ),
    "",
    "## 安全约束",
    "",
    "- 未修改产品中心任何文件",
    "- 未接入全局过滤函数",
    "- 未根据占位图或 Logo 扩大范围",
    "- 只删除商品编码或产品 ID 精确命中的对象",
    "",
  ].join("\n"),
  "utf8"
);

for (const item of preparedFiles) {
  const backupPath = path.join(
    backupDirectory,
    rel(item.filePath)
  );

  ensureDirectory(path.dirname(backupPath));

  fs.copyFileSync(
    item.filePath,
    backupPath
  );
}

function restore() {
  for (const item of preparedFiles) {
    const backupPath = path.join(
      backupDirectory,
      rel(item.filePath)
    );

    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(
        backupPath,
        item.filePath
      );
    }
  }
}

try {
  for (const item of preparedFiles) {
    fs.writeFileSync(
      item.filePath,
      item.updatedSource,
      "utf8"
    );

    console.log(`已精确删除：${rel(item.filePath)}`);
  }

  const secondCheck = replacementFiles.map((filePath) =>
    analyzeAndPrepare(filePath, { allowZero: true })
  );
  const remainingMatches = secondCheck.reduce(
    (total, item) => total + item.matches.length,
    0
  );

  if (remainingMatches !== 0) {
    throw new Error(
      `写入后仍发现 ${remainingMatches} 条目标记录，已准备回滚。`
    );
  }
} catch (error) {
  restore();
  throw error;
}

console.log("");
console.log("开始执行 npm run build……");

/*
 * Windows 下不要直接 spawn npm.cmd。
 * Node.js 24 在 shell:false 时可能无法启动 .cmd 文件，
 * 表现为 stdout/stderr 为空、status 为 null。
 *
 * 因此 Windows 使用 cmd.exe 显式执行 npm run build。
 */
const buildCommand =
  process.platform === "win32"
    ? {
        command: process.env.ComSpec || "cmd.exe",
        args: ["/d", "/s", "/c", "npm run build"],
      }
    : {
        command: "npm",
        args: ["run", "build"],
      };

const buildResult = spawnSync(
  buildCommand.command,
  buildCommand.args,
  {
    cwd: root,
    encoding: "utf8",
    shell: false,
    windowsHide: false,
    maxBuffer: 1024 * 1024 * 100,
  }
);

const launchError = buildResult.error
  ? [
      "构建进程启动异常：",
      buildResult.error.stack ||
        buildResult.error.message ||
        String(buildResult.error),
    ].join("\n")
  : "";

const buildOutput = [
  buildResult.stdout || "",
  buildResult.stderr || "",
  launchError,
  `构建退出码：${
    buildResult.status === null ||
    buildResult.status === undefined
      ? "null"
      : buildResult.status
  }`,
  `构建信号：${buildResult.signal || "无"}`,
].filter(Boolean).join("\n");

fs.writeFileSync(
  path.join(reportDirectory, "npm-build.log"),
  buildOutput,
  "utf8"
);

if (buildOutput.trim()) {
  process.stdout.write(buildOutput + "\n");
}

if (
  buildResult.error ||
  buildResult.status !== 0
) {
  const failedStateDirectory = path.join(
    reportDirectory,
    "构建失败时的修改文件"
  );

  ensureDirectory(failedStateDirectory);

  for (const item of preparedFiles) {
    fs.copyFileSync(
      item.filePath,
      path.join(
        failedStateDirectory,
        path.basename(item.filePath)
      )
    );
  }

  restore();

  const tail = buildOutput
    .split(/\r?\n/)
    .slice(-80)
    .join("\n");

  throw new Error(
    "构建失败，已自动恢复本次修改前的两个接头替代数据文件。\n" +
      `完整日志：${rel(
        path.join(reportDirectory, "npm-build.log")
      )}\n\n` +
      tail
  );
}

console.log("");
console.log("============================================");
console.log("接头替代查询同步完成");
console.log("============================================");
console.log(`实际同步商品：${matchedCodes.size} 个`);
console.log(`删除替代查询记录：${allMatches.length} 条`);
console.log(`备份目录：${rel(backupDirectory)}`);
console.log(`审计报告：${rel(reportDirectory)}`);

'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '准备精确同步接头替代查询……' -ForegroundColor Cyan
Write-Host '安全限制：必须只命中 3 个商品、6 条记录。' -ForegroundColor Yellow
Write-Host '不会修改产品中心任何文件。' -ForegroundColor Yellow
Write-Host ''

$nodeExitCode = 0

try {
    node $tempNodeScript
    $nodeExitCode = $LASTEXITCODE
}
finally {
    Remove-Item `
        -LiteralPath $tempNodeScript `
        -Force `
        -ErrorAction SilentlyContinue

    Remove-Item `
        -LiteralPath $tempTargetJson `
        -Force `
        -ErrorAction SilentlyContinue
}

if ($nodeExitCode -ne 0) {
    throw '接头替代查询精确同步未完成。请把新的完整错误和 npm-build.log 发来。'
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
