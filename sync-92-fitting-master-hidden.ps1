# ============================================================
# 将已确认下架的 92 个接头同步到产品中心总表
#
# 原因：
# ProductSelectionClient 实际读取：
# data/products/selection/product-selection.generated.ts
#
# 上一步只修改了 5 个分类文件，因此页面总表中仍是 active。
#
# 本脚本：
# 1. 读取原始 92 个无主图接头 CSV
# 2. 只修改 product-selection.generated.ts
# 3. 按商品编码 / 产品 ID 精确匹配
# 4. 必须恰好命中 92 个唯一商品
# 5. 将状态统一改为 hidden
# 6. 不修改 ProductSelectionClient.tsx
# 7. 不修改分类文件和接头替代查询
# 8. 构建失败自动回滚
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$preferredCsvPath = Join-Path `
    $projectRoot `
    'audit-reports\fitting-main-images\官网接头无主图清单_20260720-173258.csv'

$tempTargetJson = Join-Path `
    $projectRoot `
    '.sync-92-fitting-master-targets.json'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.sync-92-fitting-master.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

Set-Location -LiteralPath $projectRoot

# ------------------------------------------------------------
# 一、定位原始 92 个接头清单
# ------------------------------------------------------------

$csvPath = $preferredCsvPath

if (-not (Test-Path -LiteralPath $csvPath)) {
    $matchedCsv = Get-ChildItem `
        -LiteralPath (Join-Path $projectRoot 'audit-reports') `
        -Recurse `
        -File `
        -Filter '官网接头无主图清单_20260720-173258.csv' `
        -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if ($null -eq $matchedCsv) {
        throw "没有找到 92 个接头清单。"
    }

    $csvPath = $matchedCsv.FullName
}

$rows = Import-Csv -LiteralPath $csvPath

if ($rows.Count -ne 92) {
    throw "清单数量异常：预期 92 条，实际 $($rows.Count) 条。"
}

$targets = foreach ($row in $rows) {
    $productCode = ([string]$row.'产品编码').Trim()
    $productId = ([string]$row.'产品ID').Trim()
    $model = ([string]$row.'型号').Trim()

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        $productCode = $productId
    }

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        throw "清单中存在既没有产品编码，也没有产品 ID 的记录。"
    }

    [PSCustomObject]@{
        productCode = $productCode
        productId   = $productId
        model       = $model
    }
}

$uniqueCodes = @(
    $targets |
        Select-Object -ExpandProperty productCode -Unique
)

if ($uniqueCodes.Count -ne 92) {
    throw "商品编码去重后不是 92 个，而是 $($uniqueCodes.Count) 个。"
}

$targetJson = $targets | ConvertTo-Json -Depth 6

[System.IO.File]::WriteAllText(
    $tempTargetJson,
    $targetJson,
    [System.Text.UTF8Encoding]::new($false)
)

# ------------------------------------------------------------
# 二、Node：精确同步总表状态
# ------------------------------------------------------------

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();

const targetJsonPath = path.join(
  root,
  ".sync-92-fitting-master-targets.json"
);

const masterPath = path.join(
  root,
  "data/products/selection/product-selection.generated.ts"
);

function clean(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return clean(value).toUpperCase();
}

function rel(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {
    recursive: true,
  });
}

function createStamp() {
  const now = new Date();
  const pad = (value) =>
    String(value).padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "-",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
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
  const parsed = parseSource(
    filePath,
    source
  );

  if (parsed.parseDiagnostics.length === 0) {
    return;
  }

  const message = parsed.parseDiagnostics
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      )
    )
    .join("\n");

  throw new Error(
    `${rel(filePath)} TypeScript 语法检查失败：\n${message}`
  );
}

function unwrap(expression) {
  let current = expression;

  while (current) {
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

  return current;
}

function propertyName(node) {
  if (!node) {
    return "";
  }

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

function literalValue(expression) {
  const current = unwrap(expression);

  if (!current) {
    return "";
  }

  if (
    ts.isStringLiteral(current) ||
    ts.isNoSubstitutionTemplateLiteral(current) ||
    ts.isNumericLiteral(current)
  ) {
    return String(current.text);
  }

  return "";
}

function objectProperties(objectNode) {
  const properties = new Map();

  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = propertyName(property.name);

    if (key) {
      properties.set(key, property);
    }
  }

  return properties;
}

function getString(properties, candidates) {
  for (const candidate of candidates) {
    const property = properties.get(candidate);

    if (!property) {
      continue;
    }

    const value = literalValue(
      property.initializer
    );

    if (value) {
      return value;
    }
  }

  return "";
}

if (!fs.existsSync(targetJsonPath)) {
  throw new Error(
    `没有找到目标清单：${rel(targetJsonPath)}`
  );
}

if (!fs.existsSync(masterPath)) {
  throw new Error(
    `没有找到产品中心总表：${rel(masterPath)}`
  );
}

const targets = JSON.parse(
  fs
    .readFileSync(
      targetJsonPath,
      "utf8"
    )
    .replace(/^\uFEFF/, "")
);

if (
  !Array.isArray(targets) ||
  targets.length !== 92
) {
  throw new Error(
    `目标清单应为 92 条，实际 ${
      Array.isArray(targets)
        ? targets.length
        : 0
    } 条。`
  );
}

const targetByCode = new Map();

for (const target of targets) {
  const keys = [
    normalize(target.productCode),
    normalize(target.productId),
  ].filter(Boolean);

  for (const key of keys) {
    targetByCode.set(key, target);
  }
}

const source = fs.readFileSync(
  masterPath,
  "utf8"
);

assertSyntax(masterPath, source);

const parsed = parseSource(
  masterPath,
  source
);

const matchedCodes = new Set();
const matches = [];
const edits = [];

function visit(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const properties =
      objectProperties(node);

    const codeValues = [
      getString(
        properties,
        ["productCode"]
      ),
      getString(
        properties,
        ["productId"]
      ),
      getString(
        properties,
        ["code"]
      ),
      getString(
        properties,
        ["sku"]
      ),
    ]
      .map(normalize)
      .filter(Boolean);

    let matchedTarget = null;
    let matchedCode = "";

    for (const code of codeValues) {
      if (targetByCode.has(code)) {
        matchedTarget =
          targetByCode.get(code);
        matchedCode = code;
        break;
      }
    }

    if (matchedTarget) {
      const canonicalCode = normalize(
        matchedTarget.productCode ||
        matchedTarget.productId
      );

      if (matchedCodes.has(canonicalCode)) {
        throw new Error(
          `产品中心总表中商品 ${canonicalCode} 匹配了多个对象。`
        );
      }

      const statusProperty =
        properties.get("status");

      if (!statusProperty) {
        throw new Error(
          `产品中心总表中商品 ${canonicalCode} 没有 status 字段。`
        );
      }

      const oldStatus = literalValue(
        statusProperty.initializer
      );

      if (
        ![
          "active",
          "draft",
          "hidden",
          "inactive",
        ].includes(oldStatus)
      ) {
        throw new Error(
          `商品 ${canonicalCode} 状态异常：${oldStatus}`
        );
      }

      if (oldStatus !== "hidden") {
        edits.push({
          start:
            statusProperty.initializer.getStart(
              parsed
            ),
          end:
            statusProperty.initializer.getEnd(),
          replacement: '"hidden"',
        });
      }

      matchedCodes.add(canonicalCode);

      matches.push({
        productCode: canonicalCode,
        model:
          getString(
            properties,
            ["model", "productModel"]
          ) ||
          clean(matchedTarget.model),
        productTypeId:
          getString(
            properties,
            ["productTypeId"]
          ),
        oldStatus,
        newStatus: "hidden",
        changed:
          oldStatus === "hidden"
            ? "否"
            : "是",
        line:
          parsed.getLineAndCharacterOfPosition(
            node.getStart(parsed)
          ).line + 1,
      });
    }
  }

  ts.forEachChild(node, visit);
}

visit(parsed);

if (
  matchedCodes.size !== 92 ||
  matches.length !== 92
) {
  const missing = targets.filter(
    (target) => {
      const code = normalize(
        target.productCode ||
        target.productId
      );

      return !matchedCodes.has(code);
    }
  );

  throw new Error(
    "产品中心总表匹配数量异常。\n" +
    `预期：92 个；实际：${matchedCodes.size} 个、${matches.length} 条。\n` +
    `未匹配：${missing
      .map(
        (item) =>
          `${item.productCode || item.productId} / ${item.model || "-"}`
      )
      .join(", ")}\n` +
    "脚本已停止，没有修改文件。"
  );
}

edits.sort(
  (a, b) =>
    b.start - a.start
);

let updatedSource = source;

for (const edit of edits) {
  updatedSource =
    updatedSource.slice(
      0,
      edit.start
    ) +
    edit.replacement +
    updatedSource.slice(
      edit.end
    );
}

assertSyntax(
  masterPath,
  updatedSource
);

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/fitting-92-master-hidden-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/fitting-92-master-hidden/${stamp}`
);

ensureDirectory(backupDirectory);
ensureDirectory(reportDirectory);

const backupPath = path.join(
  backupDirectory,
  rel(masterPath)
);

ensureDirectory(
  path.dirname(backupPath)
);

fs.copyFileSync(
  masterPath,
  backupPath
);

function restore() {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(
      backupPath,
      masterPath
    );
  }
}

function csvCell(value) {
  return `"${String(
    value ?? ""
  ).replace(/"/g, '""')}"`;
}

const headers = [
  "序号",
  "商品编码",
  "型号",
  "产品类型",
  "原状态",
  "新状态",
  "本次修改",
  "原数据行",
];

const csvLines = [
  headers
    .map(csvCell)
    .join(","),
];

matches.forEach(
  (item, index) => {
    csvLines.push(
      [
        index + 1,
        item.productCode,
        item.model,
        item.productTypeId,
        item.oldStatus,
        item.newStatus,
        item.changed,
        item.line,
      ]
        .map(csvCell)
        .join(",")
    );
  }
);

fs.writeFileSync(
  path.join(
    reportDirectory,
    "产品中心总表92个接头状态清单.csv"
  ),
  "\uFEFF" +
    csvLines.join("\r\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(
    reportDirectory,
    "执行摘要.md"
  ),
  [
    "# 产品中心总表同步 92 个接头",
    "",
    `- 精确匹配：${matches.length} 个`,
    `- 本次实际修改：${matches.filter(
      (item) => item.changed === "是"
    ).length} 个`,
    `- 原本已经 hidden：${matches.filter(
      (item) => item.oldStatus === "hidden"
    ).length} 个`,
    "- 修改文件：data/products/selection/product-selection.generated.ts",
    "- 未修改 ProductSelectionClient.tsx",
    "- 未修改接头分类文件",
    "- 未修改接头替代查询",
    "",
  ].join("\n"),
  "utf8"
);

try {
  fs.writeFileSync(
    masterPath,
    updatedSource,
    "utf8"
  );

  /*
   * 写入后复查 92 个编码必须全部为 hidden。
   */
  const afterSource = fs.readFileSync(
    masterPath,
    "utf8"
  );

  const afterParsed = parseSource(
    masterPath,
    afterSource
  );

  const verifiedCodes = new Set();

  function verify(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const properties =
        objectProperties(node);

      const codeValues = [
        getString(
          properties,
          ["productCode"]
        ),
        getString(
          properties,
          ["productId"]
        ),
        getString(
          properties,
          ["code"]
        ),
        getString(
          properties,
          ["sku"]
        ),
      ]
        .map(normalize)
        .filter(Boolean);

      for (const code of codeValues) {
        if (!targetByCode.has(code)) {
          continue;
        }

        const target =
          targetByCode.get(code);

        const canonicalCode =
          normalize(
            target.productCode ||
            target.productId
          );

        const status = getString(
          properties,
          ["status"]
        );

        if (status !== "hidden") {
          throw new Error(
            `写入后商品 ${canonicalCode} 状态仍为 ${status}。`
          );
        }

        verifiedCodes.add(
          canonicalCode
        );

        break;
      }
    }

    ts.forEachChild(node, verify);
  }

  verify(afterParsed);

  if (verifiedCodes.size !== 92) {
    throw new Error(
      `写入后验证数量异常：预期 92，实际 ${verifiedCodes.size}。`
    );
  }
} catch (error) {
  restore();
  throw error;
}

/*
 * 防止 audit-reports 中历史 .ts/.tsx 快照参与 Next.js 类型检查。
 */
function quarantineAuditTypeScriptFiles(
  directory
) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const renamed = [];

  function walk(currentDirectory) {
    for (
      const entry of
      fs.readdirSync(
        currentDirectory,
        {
          withFileTypes: true,
        }
      )
    ) {
      const fullPath = path.join(
        currentDirectory,
        entry.name
      );

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (
        !entry.isFile() ||
        !/\.(ts|tsx)$/i.test(
          entry.name
        )
      ) {
        continue;
      }

      const targetPath =
        `${fullPath}.txt`;

      if (fs.existsSync(targetPath)) {
        fs.rmSync(
          targetPath,
          {
            force: true,
          }
        );
      }

      fs.renameSync(
        fullPath,
        targetPath
      );

      renamed.push({
        from: rel(fullPath),
        to: rel(targetPath),
      });
    }
  }

  walk(directory);
  return renamed;
}

const quarantined =
  quarantineAuditTypeScriptFiles(
    path.join(
      root,
      "audit-reports"
    )
  );

if (quarantined.length > 0) {
  fs.writeFileSync(
    path.join(
      reportDirectory,
      "历史审计TS快照改名.json"
    ),
    JSON.stringify(
      quarantined,
      null,
      2
    ),
    "utf8"
  );
}

console.log("");
console.log(
  "产品中心总表同步复查："
);
console.log(
  `精确匹配：${matches.length} 个`
);
console.log(
  `本次修改：${matches.filter(
    (item) => item.changed === "是"
  ).length} 个`
);
console.log(
  `原本已 hidden：${matches.filter(
    (item) => item.oldStatus === "hidden"
  ).length} 个`
);
console.log("");
console.log(
  "开始执行 npm run build……"
);

const buildCommand =
  process.platform === "win32"
    ? {
        command:
          process.env.ComSpec ||
          "cmd.exe",
        args: [
          "/d",
          "/s",
          "/c",
          "npm run build",
        ],
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
    maxBuffer:
      1024 * 1024 * 100,
  }
);

const launchError =
  buildResult.error
    ? [
        "构建进程启动异常：",
        buildResult.error.stack ||
          buildResult.error.message ||
          String(
            buildResult.error
          ),
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
  `构建信号：${
    buildResult.signal || "无"
  }`,
]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(
  path.join(
    reportDirectory,
    "npm-build.log"
  ),
  buildOutput,
  "utf8"
);

if (buildOutput.trim()) {
  process.stdout.write(
    buildOutput + "\n"
  );
}

if (
  buildResult.error ||
  buildResult.status !== 0
) {
  fs.copyFileSync(
    masterPath,
    path.join(
      reportDirectory,
      "构建失败时的产品中心总表.ts.txt"
    )
  );

  restore();

  throw new Error(
    "构建失败，已自动恢复产品中心总表。\n" +
    `完整日志：${rel(
      path.join(
        reportDirectory,
        "npm-build.log"
      )
    )}`
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "产品中心总表的 92 个接头已同步下架"
);
console.log(
  "============================================"
);
console.log(
  `精确匹配：${matches.length} 个`
);
console.log(
  `本次修改：${matches.filter(
    (item) => item.changed === "是"
  ).length} 个`
);
console.log(
  `备份目录：${rel(backupDirectory)}`
);
console.log(
  `报告目录：${rel(reportDirectory)}`
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '准备同步产品中心总表中的 92 个接头……' -ForegroundColor Cyan
Write-Host "清单：$csvPath" -ForegroundColor DarkGray
Write-Host '只修改 product-selection.generated.ts。' -ForegroundColor Yellow
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
    throw "产品中心总表同步未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
