# ============================================================
# 产品中心：精确下架 92 个无有效主图接头
#
# 作用：
# 1. 读取原始 92 个接头清单 CSV
# 2. 只在清单指定的 5 个选型数据文件中精确匹配
# 3. 将目标商品状态统一改为 hidden
# 4. 不修改 ProductSelectionClient.tsx
# 5. 不修改接头替代查询
# 6. 不使用任何全局下架 Helper
# 7. 构建失败自动回滚
#
# 预期分布：
# - 倒刺接头：22
# - 过滤器及单向阀：28
# - 螺纹转倒刺：36
# - 内螺纹转接头：5
# - 鲁尔接头：1
# - 合计：92
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$preferredCsvPath = Join-Path `
    $projectRoot `
    'audit-reports\fitting-main-images\官网接头无主图清单_20260720-173258.csv'

$tempTargetJson = Join-Path `
    $projectRoot `
    '.hide-92-fitting-targets.json'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.hide-92-fitting-products.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

Set-Location -LiteralPath $projectRoot

# ------------------------------------------------------------
# 一、查找原始 92 个接头清单
# ------------------------------------------------------------

$csvPath = $preferredCsvPath

if (-not (Test-Path -LiteralPath $csvPath)) {
    $auditRoot = Join-Path $projectRoot 'audit-reports'

    if (-not (Test-Path -LiteralPath $auditRoot)) {
        throw "没有找到 audit-reports 目录。"
    }

    $matchedCsv = Get-ChildItem `
        -LiteralPath $auditRoot `
        -Recurse `
        -File `
        -Filter '官网接头无主图清单_20260720-173258.csv' `
        -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if ($null -eq $matchedCsv) {
        throw "没有找到 92 个接头清单：官网接头无主图清单_20260720-173258.csv"
    }

    $csvPath = $matchedCsv.FullName
}

Write-Host ''
Write-Host '准备精确下架 92 个无主图接头……' -ForegroundColor Cyan
Write-Host "清单：$csvPath" -ForegroundColor DarkGray
Write-Host ''

$rows = Import-Csv -LiteralPath $csvPath

if ($rows.Count -ne 92) {
    throw "清单数量异常：预期 92 条，实际 $($rows.Count) 条。"
}

# ------------------------------------------------------------
# 二、验证清单中的文件分布
# ------------------------------------------------------------

$expectedFileCounts = @{
    'data/products/selection/barbed-fitting-selection.generated.ts' = 22
    'data/products/selection/filter-check-valve-selection.generated.ts' = 28
    'data/products/selection/thread-to-barbed-fitting-selection.generated.ts' = 36
    'data/products/selection/female-thread-adapter-selection.generated.ts' = 5
    'data/products/selection/luer-fitting-selection.generated.ts' = 1
}

$actualFileCounts = @{}

foreach ($row in $rows) {
    $dataFile = ([string]$row.'数据文件').Trim().Replace('\', '/')

    if ([string]::IsNullOrWhiteSpace($dataFile)) {
        throw "CSV 中存在空的数据文件字段。"
    }

    if (-not $actualFileCounts.ContainsKey($dataFile)) {
        $actualFileCounts[$dataFile] = 0
    }

    $actualFileCounts[$dataFile] += 1
}

foreach ($entry in $expectedFileCounts.GetEnumerator()) {
    $actualCount = 0

    if ($actualFileCounts.ContainsKey($entry.Key)) {
        $actualCount = $actualFileCounts[$entry.Key]
    }

    if ($actualCount -ne $entry.Value) {
        throw "清单分布异常：$($entry.Key) 预期 $($entry.Value) 条，实际 $actualCount 条。"
    }
}

if ($actualFileCounts.Count -ne $expectedFileCounts.Count) {
    $unexpectedFiles = @(
        $actualFileCounts.Keys |
            Where-Object {
                -not $expectedFileCounts.ContainsKey($_)
            }
    )

    throw "清单中出现预期外的数据文件：$($unexpectedFiles -join ', ')"
}

# ------------------------------------------------------------
# 三、整理目标商品
# ------------------------------------------------------------

$targets = foreach ($row in $rows) {
    $productCode = ([string]$row.'产品编码').Trim()
    $productId = ([string]$row.'产品ID').Trim()
    $model = ([string]$row.'型号').Trim()
    $dataFile = ([string]$row.'数据文件').Trim().Replace('\', '/')

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        $productCode = $productId
    }

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        throw "清单中存在既没有产品编码，也没有产品 ID 的记录。"
    }

    if ([string]::IsNullOrWhiteSpace($model)) {
        throw "商品 $productCode 没有型号。"
    }

    [PSCustomObject]@{
        productCode = $productCode
        productId   = $productId
        model       = $model
        dataFile    = $dataFile
    }
}

$uniqueCodes = @(
    $targets |
        Select-Object -ExpandProperty productCode -Unique
)

if ($uniqueCodes.Count -ne 92) {
    throw "商品编码去重后不是 92 个，而是 $($uniqueCodes.Count) 个。"
}

# 使用无 BOM UTF-8，避免 Node JSON.parse 报错。
$targetJson = $targets | ConvertTo-Json -Depth 6

[System.IO.File]::WriteAllText(
    $tempTargetJson,
    $targetJson,
    [System.Text.UTF8Encoding]::new($false)
)

# ------------------------------------------------------------
# 四、Node 脚本：精确修改状态并构建
# ------------------------------------------------------------

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();

const targetJsonPath = path.join(
  root,
  ".hide-92-fitting-targets.json"
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
  const result = new Map();

  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = propertyName(property.name);

    if (key) {
      result.set(key, property);
    }
  }

  return result;
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
    `没有找到临时目标清单：${rel(targetJsonPath)}`
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

const expectedCounts = new Map([
  [
    "data/products/selection/barbed-fitting-selection.generated.ts",
    22,
  ],
  [
    "data/products/selection/filter-check-valve-selection.generated.ts",
    28,
  ],
  [
    "data/products/selection/thread-to-barbed-fitting-selection.generated.ts",
    36,
  ],
  [
    "data/products/selection/female-thread-adapter-selection.generated.ts",
    5,
  ],
  [
    "data/products/selection/luer-fitting-selection.generated.ts",
    1,
  ],
]);

const targetsByFile = new Map();

for (const target of targets) {
  const dataFile = clean(target.dataFile)
    .replace(/\\/g, "/");

  if (!targetsByFile.has(dataFile)) {
    targetsByFile.set(
      dataFile,
      []
    );
  }

  targetsByFile.get(dataFile).push({
    ...target,
    codeKey: normalize(
      target.productCode
    ),
    productIdKey: normalize(
      target.productId
    ),
    modelKey: normalize(
      target.model
    ),
  });
}

for (
  const [
    dataFile,
    expectedCount,
  ] of expectedCounts
) {
  const fileTargets =
    targetsByFile.get(dataFile);

  if (
    !fileTargets ||
    fileTargets.length !== expectedCount
  ) {
    throw new Error(
      `${dataFile} 目标数量异常：预期 ${expectedCount}，实际 ${fileTargets?.length || 0}。`
    );
  }
}

function prepareFile(
  dataFile,
  fileTargets
) {
  const filePath = path.join(
    root,
    dataFile
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `没有找到目标数据文件：${dataFile}`
    );
  }

  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const parsed = parseSource(
    filePath,
    source
  );

  assertSyntax(filePath, source);

  const targetByCode = new Map();
  const targetByModel = new Map();

  for (const target of fileTargets) {
    if (target.codeKey) {
      targetByCode.set(
        target.codeKey,
        target
      );
    }

    if (target.productIdKey) {
      targetByCode.set(
        target.productIdKey,
        target
      );
    }

    if (target.modelKey) {
      targetByModel.set(
        target.modelKey,
        target
      );
    }
  }

  const matchedTargetKeys = new Set();
  const matches = [];
  const edits = [];

  function visit(node) {
    if (
      ts.isObjectLiteralExpression(node)
    ) {
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

      const modelValues = [
        getString(
          properties,
          ["model"]
        ),
        getString(
          properties,
          ["productModel"]
        ),
      ]
        .map(normalize)
        .filter(Boolean);

      let matchedTarget = null;
      let matchedBy = "";

      for (const code of codeValues) {
        if (targetByCode.has(code)) {
          matchedTarget =
            targetByCode.get(code);
          matchedBy =
            "商品编码/产品ID";
          break;
        }
      }

      /*
       * 对象没有编码时才允许型号兜底，
       * 避免同型号不同商品编码误匹配。
       */
      if (
        !matchedTarget &&
        codeValues.length === 0
      ) {
        for (const model of modelValues) {
          if (targetByModel.has(model)) {
            matchedTarget =
              targetByModel.get(model);
            matchedBy =
              "型号兜底";
            break;
          }
        }
      }

      if (matchedTarget) {
        const targetKey =
          matchedTarget.codeKey ||
          matchedTarget.productIdKey ||
          matchedTarget.modelKey;

        if (
          matchedTargetKeys.has(targetKey)
        ) {
          throw new Error(
            `${dataFile} 中目标 ${targetKey} 匹配了多个对象。`
          );
        }

        const statusProperty =
          properties.get("status");

        if (!statusProperty) {
          throw new Error(
            `${dataFile} 中商品 ${targetKey} 没有 status 字段。`
          );
        }

        const oldStatus = literalValue(
          statusProperty.initializer
        );

        /*
         * active、inactive、draft 都统一改为 hidden。
         * 已经是 hidden 的只记录，不重复修改。
         */
        if (
          ![
            "active",
            "inactive",
            "draft",
            "hidden",
          ].includes(oldStatus)
        ) {
          throw new Error(
            `${dataFile} 中商品 ${targetKey} 的状态异常：${oldStatus}`
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

        matchedTargetKeys.add(targetKey);

        matches.push({
          dataFile,
          productCode:
            codeValues[0] ||
            matchedTarget.productCode ||
            "",
          model:
            modelValues[0] ||
            matchedTarget.model ||
            "",
          oldStatus,
          newStatus: "hidden",
          changed:
            oldStatus !== "hidden"
              ? "是"
              : "否",
          matchedBy,
          line:
            parsed.getLineAndCharacterOfPosition(
              node.getStart(parsed)
            ).line + 1,
        });
      }
    }

    ts.forEachChild(
      node,
      visit
    );
  }

  visit(parsed);

  const expectedCount =
    expectedCounts.get(dataFile);

  if (
    matches.length !== expectedCount ||
    matchedTargetKeys.size !== expectedCount
  ) {
    const missingTargets =
      fileTargets.filter((target) => {
        const targetKey =
          target.codeKey ||
          target.productIdKey ||
          target.modelKey;

        return !matchedTargetKeys.has(
          targetKey
        );
      });

    throw new Error(
      `${dataFile} 匹配数量异常。\n` +
      `预期 ${expectedCount} 条，实际 ${matches.length} 条。\n` +
      `未匹配：${missingTargets
        .map(
          (item) =>
            `${item.productCode || item.productId || "-"} / ${item.model}`
        )
        .join(", ")}`
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
    filePath,
    updatedSource
  );

  return {
    dataFile,
    filePath,
    source,
    updatedSource,
    matches,
    changedCount:
      edits.length,
  };
}

const preparedFiles = [];

for (
  const [
    dataFile,
    fileTargets,
  ] of targetsByFile
) {
  preparedFiles.push(
    prepareFile(
      dataFile,
      fileTargets
    )
  );
}

const allMatches =
  preparedFiles.flatMap(
    (item) => item.matches
  );

if (allMatches.length !== 92) {
  throw new Error(
    `总匹配数量异常：预期 92，实际 ${allMatches.length}。`
  );
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/fitting-92-hidden-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/fitting-92-hidden/${stamp}`
);

ensureDirectory(backupDirectory);
ensureDirectory(reportDirectory);

for (const item of preparedFiles) {
  const backupPath = path.join(
    backupDirectory,
    item.dataFile
  );

  ensureDirectory(
    path.dirname(backupPath)
  );

  fs.copyFileSync(
    item.filePath,
    backupPath
  );
}

function restore() {
  for (const item of preparedFiles) {
    const backupPath = path.join(
      backupDirectory,
      item.dataFile
    );

    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(
        backupPath,
        item.filePath
      );
    }
  }
}

function csvCell(value) {
  return `"${String(
    value ?? ""
  ).replace(/"/g, '""')}"`;
}

const headers = [
  "序号",
  "数据文件",
  "商品编码",
  "型号",
  "原状态",
  "新状态",
  "本次修改",
  "匹配方式",
  "原数据行",
];

const csvLines = [
  headers
    .map(csvCell)
    .join(","),
];

allMatches.forEach(
  (item, index) => {
    csvLines.push(
      [
        index + 1,
        item.dataFile,
        item.productCode,
        item.model,
        item.oldStatus,
        item.newStatus,
        item.changed,
        item.matchedBy,
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
    "92个接头状态修改清单.csv"
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
    "# 产品中心 92 个无主图接头下架",
    "",
    `- 精确匹配：${allMatches.length} 个`,
    `- 本次实际修改：${preparedFiles.reduce(
      (sum, item) =>
        sum + item.changedCount,
      0
    )} 个`,
    `- 原本已经 hidden：${allMatches.filter(
      (item) =>
        item.oldStatus === "hidden"
    ).length} 个`,
    "",
    "## 修改范围",
    "",
    ...preparedFiles.map(
      (item) =>
        `- ${item.dataFile}：匹配 ${item.matches.length}，本次修改 ${item.changedCount}`
    ),
    "",
    "## 未修改",
    "",
    "- ProductSelectionClient.tsx",
    "- 接头替代查询",
    "- 产品详情数据",
    "- 图片文件",
    "- 其他产品类别",
    "",
  ].join("\n"),
  "utf8"
);

console.log("");
console.log(
  "92 个接头状态修改复查："
);

for (const item of preparedFiles) {
  console.log(
    `- ${item.dataFile}：匹配 ${item.matches.length}，本次修改 ${item.changedCount}`
  );
}

try {
  for (const item of preparedFiles) {
    fs.writeFileSync(
      item.filePath,
      item.updatedSource,
      "utf8"
    );

    console.log(
      `已写入：${item.dataFile}`
    );
  }

  /*
   * 写入后再次精确验证：
   * 92 个目标必须全部为 hidden。
   */
  let verifiedHidden = 0;

  for (const prepared of preparedFiles) {
    const fileTargets =
      targetsByFile.get(
        prepared.dataFile
      );

    const targetCodes = new Set(
      fileTargets
        .flatMap((target) => [
          target.codeKey,
          target.productIdKey,
        ])
        .filter(Boolean)
    );

    const targetModels = new Set(
      fileTargets
        .map((target) =>
          target.modelKey
        )
        .filter(Boolean)
    );

    const source = fs.readFileSync(
      prepared.filePath,
      "utf8"
    );

    const parsed = parseSource(
      prepared.filePath,
      source
    );

    function verify(node) {
      if (
        ts.isObjectLiteralExpression(node)
      ) {
        const properties =
          objectProperties(node);

        const codes = [
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

        const models = [
          getString(
            properties,
            ["model"]
          ),
          getString(
            properties,
            ["productModel"]
          ),
        ]
          .map(normalize)
          .filter(Boolean);

        const matchedByCode =
          codes.some((code) =>
            targetCodes.has(code)
          );

        const matchedByModel =
          codes.length === 0 &&
          models.some((model) =>
            targetModels.has(model)
          );

        if (
          matchedByCode ||
          matchedByModel
        ) {
          const status = getString(
            properties,
            ["status"]
          );

          if (status !== "hidden") {
            throw new Error(
              `${prepared.dataFile} 写入后仍发现目标状态为 ${status}。`
            );
          }

          verifiedHidden += 1;
        }
      }

      ts.forEachChild(
        node,
        verify
      );
    }

    verify(parsed);
  }

  if (verifiedHidden !== 92) {
    throw new Error(
      `写入后验证数量异常：预期 92，实际 ${verifiedHidden}。`
    );
  }
} catch (error) {
  restore();
  throw error;
}

/*
 * 历史审计目录中的 .ts/.tsx 快照会被 Next.js 类型检查。
 * 构建前只在 audit-reports 内将其改名为 .txt。
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

  console.log(
    `已将 ${quarantined.length} 个历史审计 .ts/.tsx 快照改名为 .txt。`
  );
}

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
  const failedDirectory =
    path.join(
      reportDirectory,
      "构建失败时的修改文件"
    );

  ensureDirectory(
    failedDirectory
  );

  for (const item of preparedFiles) {
    fs.copyFileSync(
      item.filePath,
      path.join(
        failedDirectory,
        `${path.basename(
          item.filePath
        )}.txt`
      )
    );
  }

  restore();

  throw new Error(
    "构建失败，已自动恢复 92 个接头修改前的数据。\n" +
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
  "92 个无主图接头已在产品中心下架"
);
console.log(
  "============================================"
);
console.log(
  `精确匹配：${allMatches.length} 个`
);
console.log(
  `本次修改：${preparedFiles.reduce(
    (sum, item) =>
      sum + item.changedCount,
    0
  )} 个`
);
console.log(
  `已是 hidden：${allMatches.filter(
    (item) =>
      item.oldStatus === "hidden"
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
    throw "92 个接头下架未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
