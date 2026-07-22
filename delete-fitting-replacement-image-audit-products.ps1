# ============================================================
# 接头兼容型号查询｜按最新主图审查清单删除商品
#
# 数据来源：
# audit-reports/fitting-replacement-main-image-audit/<最新时间>/
# 05_建议删除商品编码清单.csv
#
# 删除对象：
# 1. data/resources/fitting-replacement/all-compatible-products.generated.ts
# 2. data/resources/fitting-replacement/compatible-models.generated.ts
#
# 删除规则：
# - 只按唯一商品编码精确匹配
# - 不使用型号兜底
# - 不根据图片路径再次扩大范围
# - 当前数据文件中同一商品编码重复时立即停止
#
# 安全措施：
# - 自动定位最新审查报告
# - 写入前完成全部匹配检查
# - 自动备份两个数据文件
# - 写入后复查目标编码已全部消失
# - npm run build 失败自动回滚
#
# 不修改：
# - 产品中心
# - ProductSelectionClient.tsx
# - 阀系列、针系列
# - 图片文件
# - 产品详情数据
# - compatible-models.audit.json
# - 全站搜索索引
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$auditRoot = Join-Path `
    $projectRoot `
    'audit-reports\fitting-replacement-main-image-audit'

$tempTargetJson = Join-Path `
    $projectRoot `
    '.delete-fitting-replacement-image-audit-targets.json'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.delete-fitting-replacement-image-audit-targets.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $auditRoot)) {
    throw "没有找到主图审查目录：$auditRoot"
}

Set-Location -LiteralPath $projectRoot

# ------------------------------------------------------------
# 一、定位最新且包含删除清单的审查报告
# ------------------------------------------------------------

$latestReport = Get-ChildItem `
    -LiteralPath $auditRoot `
    -Directory `
    -ErrorAction Stop |
    Where-Object {
        Test-Path `
            -LiteralPath (
                Join-Path `
                    $_.FullName `
                    '05_建议删除商品编码清单.csv'
            )
    } |
    Sort-Object `
        LastWriteTime `
        -Descending |
    Select-Object -First 1

if ($null -eq $latestReport) {
    throw "没有找到包含 05_建议删除商品编码清单.csv 的审查报告。"
}

$csvPath = Join-Path `
    $latestReport.FullName `
    '05_建议删除商品编码清单.csv'

$summaryPath = Join-Path `
    $latestReport.FullName `
    '00_审查摘要.md'

Write-Host ''
Write-Host '准备按最新主图审查清单删除兼容查询商品……' -ForegroundColor Cyan
Write-Host "审查目录：$($latestReport.FullName)" -ForegroundColor DarkGray
Write-Host "删除清单：$csvPath" -ForegroundColor DarkGray
Write-Host ''

$rows = @(
    Import-Csv `
        -LiteralPath $csvPath
)

if ($rows.Count -eq 0) {
    throw "建议删除商品编码清单为空，脚本已停止。"
}

$targets = foreach ($row in $rows) {
    $productCode = (
        [string]$row.'商品编码'
    ).Trim()

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        throw "建议删除清单中存在空商品编码。"
    }

    [PSCustomObject]@{
        productCode = $productCode
        model = (
            [string]$row.'FOREACH型号'
        ).Trim()
        productType = (
            [string]$row.'产品类型'
        ).Trim()
        productSeries = (
            [string]$row.'产品系列'
        ).Trim()
        imagePath = (
            [string]$row.'图片路径'
        ).Trim()
        reason = (
            [string]$row.'建议删除原因'
        ).Trim()
    }
}

$uniqueCodes = @(
    $targets |
        Select-Object `
            -ExpandProperty productCode `
            -Unique
)

if ($uniqueCodes.Count -ne $targets.Count) {
    $duplicateCodes = @(
        $targets |
            Group-Object productCode |
            Where-Object {
                $_.Count -gt 1
            } |
            Select-Object `
                -ExpandProperty Name
    )

    throw (
        "建议删除清单中商品编码不唯一：" +
        ($duplicateCodes -join ', ')
    )
}

$payload = [PSCustomObject]@{
    sourceCsv = $csvPath
    sourceSummary = $summaryPath
    auditDirectory = $latestReport.FullName
    targets = $targets
}

$payloadJson = $payload |
    ConvertTo-Json -Depth 8

[System.IO.File]::WriteAllText(
    $tempTargetJson,
    $payloadJson,
    [System.Text.UTF8Encoding]::new($false)
)

# ------------------------------------------------------------
# 二、Node：按唯一商品编码删除两个数组
# ------------------------------------------------------------

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();

const targetJsonPath = path.join(
  root,
  ".delete-fitting-replacement-image-audit-targets.json"
);

const fileConfigs = [
  {
    filePath: path.join(
      root,
      "data/resources/fitting-replacement/all-compatible-products.generated.ts"
    ),
    variableName:
      "fittingReplacementAllCompatibleProducts",
  },
  {
    filePath: path.join(
      root,
      "data/resources/fitting-replacement/compatible-models.generated.ts"
    ),
    variableName:
      "fittingCompatibleModelProducts",
  },
];

function clean(value) {
  return String(value ?? "").trim();
}

function normalizeCode(value) {
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
  if (
    ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression) ||
    ts.isNumericLiteral(expression)
  ) {
    return String(expression.text);
  }

  return "";
}

function directPropertyValue(
  objectNode,
  candidates
) {
  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = propertyName(
      property.name
    );

    if (!candidates.includes(key)) {
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

function extractRecordInfo(objectNode) {
  return {
    productCode: normalizeCode(
      directPropertyValue(
        objectNode,
        [
          "productCode",
          "productId",
          "code",
          "sku",
        ]
      )
    ),
    model: clean(
      directPropertyValue(
        objectNode,
        [
          "foreachModel",
          "productModel",
          "model",
        ]
      )
    ),
    productType: clean(
      directPropertyValue(
        objectNode,
        ["productType"]
      )
    ),
    productSeries: clean(
      directPropertyValue(
        objectNode,
        ["productSeries"]
      )
    ),
    imagePath: clean(
      directPropertyValue(
        objectNode,
        ["imagePath"]
      )
    ),
  };
}

function csvCell(value) {
  return `"${String(
    value ?? ""
  ).replace(/"/g, '""')}"`;
}

function writeCsv(
  filePath,
  headers,
  rows
) {
  const lines = [
    headers.map(csvCell).join(","),
  ];

  for (const row of rows) {
    lines.push(
      headers
        .map((header) =>
          csvCell(row[header])
        )
        .join(",")
    );
  }

  fs.writeFileSync(
    filePath,
    "\uFEFF" +
      lines.join("\r\n"),
    "utf8"
  );
}

if (!fs.existsSync(targetJsonPath)) {
  throw new Error(
    `没有找到临时删除清单：${rel(targetJsonPath)}`
  );
}

const payload = JSON.parse(
  fs
    .readFileSync(
      targetJsonPath,
      "utf8"
    )
    .replace(/^\uFEFF/, "")
);

if (
  !payload ||
  !Array.isArray(payload.targets) ||
  payload.targets.length === 0
) {
  throw new Error(
    "临时删除清单为空或格式错误。"
  );
}

const targetByCode = new Map();

for (const target of payload.targets) {
  const code = normalizeCode(
    target.productCode
  );

  if (!code) {
    throw new Error(
      "删除目标中存在空商品编码。"
    );
  }

  if (targetByCode.has(code)) {
    throw new Error(
      `删除目标商品编码重复：${code}`
    );
  }

  targetByCode.set(code, {
    ...target,
    productCode: code,
  });
}

const targetCodes = new Set(
  targetByCode.keys()
);

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
});

function prepareFile(config) {
  const {
    filePath,
    variableName,
  } = config;

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `没有找到数据文件：${rel(filePath)}`
    );
  }

  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  assertSyntax(filePath, source);

  const parsed = parseSource(
    filePath,
    source
  );

  let declarationCount = 0;
  let arrayNode = null;

  for (const statement of parsed.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (
      const declaration of
      statement.declarationList.declarations
    ) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !==
          variableName ||
        !declaration.initializer
      ) {
        continue;
      }

      declarationCount += 1;
      arrayNode = unwrap(
        declaration.initializer
      );
    }
  }

  if (
    declarationCount !== 1 ||
    !arrayNode
  ) {
    throw new Error(
      `${rel(filePath)} 中 ${variableName} 声明数量异常：${declarationCount}`
    );
  }

  const seenCodes = new Map();
  const keptElements = [];
  const removed = [];

  for (const element of arrayNode.elements) {
    if (!ts.isObjectLiteralExpression(element)) {
      throw new Error(
        `${rel(filePath)} 的 ${variableName} 中存在非对象元素。`
      );
    }

    const info =
      extractRecordInfo(element);

    if (!info.productCode) {
      throw new Error(
        `${rel(filePath)} 中存在没有商品编码的记录。`
      );
    }

    if (
      seenCodes.has(
        info.productCode
      )
    ) {
      throw new Error(
        `${rel(filePath)} 中商品编码重复：${info.productCode}`
      );
    }

    seenCodes.set(
      info.productCode,
      info
    );

    if (
      targetCodes.has(
        info.productCode
      )
    ) {
      const target =
        targetByCode.get(
          info.productCode
        );

      removed.push({
        数据文件:
          rel(filePath),
        商品编码:
          info.productCode,
        FOREACH型号:
          info.model ||
          clean(target.model),
        产品类型:
          info.productType ||
          clean(target.productType),
        产品系列:
          info.productSeries ||
          clean(target.productSeries),
        图片路径:
          info.imagePath ||
          clean(target.imagePath),
        删除原因:
          clean(target.reason),
      });

      continue;
    }

    keptElements.push(element);
  }

  if (removed.length === 0) {
    return {
      ...config,
      source,
      updatedSource: source,
      beforeCount:
        arrayNode.elements.length,
      afterCount:
        arrayNode.elements.length,
      removed,
      changed: false,
      existingCodes:
        new Set(seenCodes.keys()),
    };
  }

  const updatedArray =
    ts.factory.updateArrayLiteralExpression(
      arrayNode,
      keptElements
    );

  const replacement =
    printer.printNode(
      ts.EmitHint.Expression,
      updatedArray,
      parsed
    );

  const updatedSource =
    source.slice(
      0,
      arrayNode.getStart(parsed)
    ) +
    replacement +
    source.slice(
      arrayNode.getEnd()
    );

  assertSyntax(
    filePath,
    updatedSource
  );

  return {
    ...config,
    source,
    updatedSource,
    beforeCount:
      arrayNode.elements.length,
    afterCount:
      keptElements.length,
    removed,
    changed: true,
    existingCodes:
      new Set(seenCodes.keys()),
  };
}

function collectCodes(
  filePath,
  variableName
) {
  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  assertSyntax(filePath, source);

  const parsed = parseSource(
    filePath,
    source
  );

  let arrayNode = null;
  let declarationCount = 0;

  for (const statement of parsed.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (
      const declaration of
      statement.declarationList.declarations
    ) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !==
          variableName ||
        !declaration.initializer
      ) {
        continue;
      }

      declarationCount += 1;
      arrayNode = unwrap(
        declaration.initializer
      );
    }
  }

  if (
    declarationCount !== 1 ||
    !arrayNode
  ) {
    throw new Error(
      `写入后无法定位 ${rel(filePath)} 中的 ${variableName}。`
    );
  }

  const codes = new Set();

  for (const element of arrayNode.elements) {
    if (!ts.isObjectLiteralExpression(element)) {
      throw new Error(
        `${rel(filePath)} 写入后存在非对象元素。`
      );
    }

    const code = normalizeCode(
      directPropertyValue(
        element,
        [
          "productCode",
          "productId",
          "code",
          "sku",
        ]
      )
    );

    if (!code) {
      throw new Error(
        `${rel(filePath)} 写入后存在空商品编码。`
      );
    }

    if (codes.has(code)) {
      throw new Error(
        `${rel(filePath)} 写入后商品编码重复：${code}`
      );
    }

    codes.add(code);
  }

  return codes;
}

const preparedFiles =
  fileConfigs.map(prepareFile);

const allRemoved =
  preparedFiles.flatMap(
    (item) => item.removed
  );

const matchedByFile =
  preparedFiles.map((item) => {
    return new Set(
      item.removed.map(
        (row) =>
          normalizeCode(
            row.商品编码
          )
      )
    );
  });

const unionMatchedCodes = new Set(
  allRemoved.map(
    (row) =>
      normalizeCode(
        row.商品编码
      )
  )
);

const absentFromBoth = [
  ...targetCodes,
].filter(
  (code) =>
    !unionMatchedCodes.has(code)
);

const fileMatchSummary =
  preparedFiles.map((item) => ({
    数据文件:
      rel(item.filePath),
    删除前记录:
      item.beforeCount,
    删除记录:
      item.removed.length,
    删除后记录:
      item.afterCount,
  }));

console.log("");
console.log(
  "接头兼容型号查询删除复查："
);
console.log(
  `审查建议删除商品编码：${targetCodes.size} 个`
);

for (const item of preparedFiles) {
  console.log(
    `- ${rel(item.filePath)}：命中 ${item.removed.length} 个，删除前 ${item.beforeCount}，删除后 ${item.afterCount}`
  );
}

if (absentFromBoth.length > 0) {
  console.log(
    `- 两个文件中原本均不存在：${absentFromBoth.length} 个`
  );
}

if (
  preparedFiles.every(
    (item) => !item.changed
  )
) {
  console.log("");
  console.log(
    "两份兼容查询数据中已经没有建议删除清单里的商品编码。"
  );
  console.log(
    "本次没有修改文件，也不需要重复构建。"
  );
  process.exit(0);
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/fitting-replacement-image-cleanup-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/fitting-replacement-image-cleanup/${stamp}`
);

ensureDirectory(
  backupDirectory
);

ensureDirectory(
  reportDirectory
);

for (const item of preparedFiles) {
  const backupPath = path.join(
    backupDirectory,
    rel(item.filePath)
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

writeCsv(
  path.join(
    reportDirectory,
    "01_本次删除记录.csv"
  ),
  [
    "数据文件",
    "商品编码",
    "FOREACH型号",
    "产品类型",
    "产品系列",
    "图片路径",
    "删除原因",
  ],
  allRemoved
);

writeCsv(
  path.join(
    reportDirectory,
    "02_各文件删除统计.csv"
  ),
  [
    "数据文件",
    "删除前记录",
    "删除记录",
    "删除后记录",
  ],
  fileMatchSummary
);

writeCsv(
  path.join(
    reportDirectory,
    "03_两个文件中原本均不存在的编码.csv"
  ),
  [
    "商品编码",
    "FOREACH型号",
    "建议删除原因",
  ],
  absentFromBoth.map((code) => {
    const target =
      targetByCode.get(code);

    return {
      商品编码: code,
      FOREACH型号:
        clean(target.model),
      建议删除原因:
        clean(target.reason),
    };
  })
);

fs.writeFileSync(
  path.join(
    reportDirectory,
    "00_执行摘要.md"
  ),
  [
    "# 接头兼容型号查询主图清理",
    "",
    `- 审查建议删除商品编码：${targetCodes.size} 个`,
    `- 两个文件合计删除记录：${allRemoved.length} 条`,
    `- 实际涉及商品编码：${unionMatchedCodes.size} 个`,
    `- 两个文件中原本均不存在：${absentFromBoth.length} 个`,
    "",
    "## 修改文件",
    "",
    ...fileMatchSummary.map(
      (item) =>
        `- ${item.数据文件}：${item.删除前记录} → ${item.删除后记录}，删除 ${item.删除记录}`
    ),
    "",
    "## 删除依据",
    "",
    `- ${clean(payload.sourceCsv)}`,
    "",
    "## 未修改",
    "",
    "- 产品中心",
    "- ProductSelectionClient.tsx",
    "- 阀系列、针系列",
    "- 图片文件",
    "- 产品详情数据",
    "- compatible-models.audit.json",
    "- 全站搜索索引",
    "",
  ].join("\n"),
  "utf8"
);

if (
  payload.sourceCsv &&
  fs.existsSync(payload.sourceCsv)
) {
  fs.copyFileSync(
    payload.sourceCsv,
    path.join(
      reportDirectory,
      "04_本次使用的建议删除清单.csv"
    )
  );
}

if (
  payload.sourceSummary &&
  fs.existsSync(payload.sourceSummary)
) {
  fs.copyFileSync(
    payload.sourceSummary,
    path.join(
      reportDirectory,
      "05_原主图审查摘要.md"
    )
  );
}

try {
  for (const item of preparedFiles) {
    if (!item.changed) {
      continue;
    }

    fs.writeFileSync(
      item.filePath,
      item.updatedSource,
      "utf8"
    );

    console.log(
      `已写入：${rel(item.filePath)}`
    );
  }

  for (const item of preparedFiles) {
    const remainingCodes =
      collectCodes(
        item.filePath,
        item.variableName
      );

    const remainingTargets = [
      ...targetCodes,
    ].filter(
      (code) =>
        remainingCodes.has(code)
    );

    if (remainingTargets.length > 0) {
      throw new Error(
        `${rel(item.filePath)} 写入后仍存在目标商品编码：${remainingTargets.join(", ")}`
      );
    }
  }
} catch (error) {
  restore();
  throw error;
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
        args: [
          "run",
          "build",
        ],
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
    "构建失败，已自动恢复两个兼容查询数据文件。\n" +
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
  "接头兼容型号查询无主图及复用图商品已删除"
);
console.log(
  "============================================"
);
console.log(
  `审查建议删除编码：${targetCodes.size} 个`
);
console.log(
  `实际涉及商品编码：${unionMatchedCodes.size} 个`
);
console.log(
  `两个文件合计删除：${allRemoved.length} 条记录`
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
    throw "接头兼容型号查询主图清理未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
