# ============================================================
# 修复产品中心合并数据的状态过滤与重复记录覆盖（V2）
#
# 背景：
# ProductSelectionClient.tsx 会合并：
# - product-selection.generated.ts 中的基础产品
# - 各分类 selection.generated.ts 中的产品
#
# 同一个 productId 可能出现两次：
# - 基础数据：active
# - 分类数据：hidden
#
# 原去重规则只保留第一条，导致 hidden 下架状态失效。
#
# 本脚本只修改 selectionProducts 的去重回调：
# - 同一 productId 存在 hidden 时，优先保留第一条 hidden
# - 不存在 hidden 时，仍保留第一条
#
# 安全限制：
# 1. 先确认原 CSV 是 92 条唯一商品编码
# 2. 先确认 5 个分类文件中的 92 个目标已全部为 hidden
# 3. 只修改 ProductSelectionClient.tsx 中 selectionProducts 的回调
# 4. 不添加 Helper，不改产品数据，不改接头替代查询
# 5. 构建失败自动回滚
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$componentPath = Join-Path `
    $projectRoot `
    'components\products\selection\ProductSelectionClient.tsx'

$preferredCsvPath = Join-Path `
    $projectRoot `
    'audit-reports\fitting-main-images\官网接头无主图清单_20260720-173258.csv'

$tempTargetJson = Join-Path `
    $projectRoot `
    '.verify-92-hidden-targets.json'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.fix-selection-hidden-duplicate-priority.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $componentPath)) {
    throw "没有找到 ProductSelectionClient.tsx：$componentPath"
}

Set-Location -LiteralPath $projectRoot

# ------------------------------------------------------------
# 一、读取原始 92 个下架清单
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
    $dataFile = ([string]$row.'数据文件').Trim().Replace('\', '/')

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        $productCode = $productId
    }

    if ([string]::IsNullOrWhiteSpace($productCode)) {
        throw "清单中存在既没有产品编码，也没有产品 ID 的记录。"
    }

    if ([string]::IsNullOrWhiteSpace($dataFile)) {
        throw "商品 $productCode 没有数据文件路径。"
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

$targetJson = $targets | ConvertTo-Json -Depth 6

[System.IO.File]::WriteAllText(
    $tempTargetJson,
    $targetJson,
    [System.Text.UTF8Encoding]::new($false)
)

# ------------------------------------------------------------
# 二、Node：验证 92 个 hidden 并修复合并去重
# ------------------------------------------------------------

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();

const componentPath = path.join(
  root,
  "components/products/selection/ProductSelectionClient.tsx"
);

const targetJsonPath = path.join(
  root,
  ".verify-92-hidden-targets.json"
);

const START_MARKER =
  "SELECTION_PRODUCTS_HIDDEN_STATUS_PRIORITY_START";

const END_MARKER =
  "SELECTION_PRODUCTS_HIDDEN_STATUS_PRIORITY_END";

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

function scriptKind(filePath) {
  if (filePath.endsWith(".tsx")) {
    return ts.ScriptKind.TSX;
  }

  return ts.ScriptKind.TS;
}

function parseSource(filePath, source) {
  return ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind(filePath)
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
    `${rel(filePath)} 语法检查失败：\n${message}`
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

/*
 * 第一步：确认 5 个分类数据文件中的 92 个目标
 * 当前已经全部为 hidden。
 */
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
      target.productCode ||
      target.productId
    ),
    productIdKey: normalize(
      target.productId
    ),
    modelKey: normalize(
      target.model
    ),
  });
}

const verifiedHiddenCodes = new Set();
const verificationRows = [];

for (
  const [
    dataFile,
    fileTargets,
  ] of targetsByFile
) {
  const filePath = path.join(
    root,
    dataFile
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `没有找到分类数据文件：${dataFile}`
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

  function verifyObject(node) {
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

      const matchedCode = codeValues.find(
        (code) =>
          targetCodes.has(code)
      );

      const matchedModel =
        codeValues.length === 0
          ? modelValues.find(
              (model) =>
                targetModels.has(model)
            )
          : "";

      if (!matchedCode && !matchedModel) {
        ts.forEachChild(
          node,
          verifyObject
        );
        return;
      }

      const status = getString(
        properties,
        ["status"]
      );

      if (status !== "hidden") {
        throw new Error(
          `${dataFile} 中目标 ${
            matchedCode ||
            matchedModel
          } 当前不是 hidden，而是 ${status}。`
        );
      }

      const canonicalTarget =
        fileTargets.find((target) => {
          return (
            codeValues.includes(
              target.codeKey
            ) ||
            (
              target.productIdKey &&
              codeValues.includes(
                target.productIdKey
              )
            ) ||
            (
              codeValues.length === 0 &&
              target.modelKey &&
              modelValues.includes(
                target.modelKey
              )
            )
          );
        });

      if (!canonicalTarget) {
        throw new Error(
          `${dataFile} 中无法反查目标清单记录。`
        );
      }

      if (
        verifiedHiddenCodes.has(
          canonicalTarget.codeKey
        )
      ) {
        throw new Error(
          `目标 ${canonicalTarget.codeKey} 在分类文件中重复匹配。`
        );
      }

      verifiedHiddenCodes.add(
        canonicalTarget.codeKey
      );

      verificationRows.push({
        dataFile,
        productCode:
          canonicalTarget.codeKey,
        model:
          modelValues[0] ||
          clean(
            canonicalTarget.model
          ),
        status,
      });
    }

    ts.forEachChild(
      node,
      verifyObject
    );
  }

  verifyObject(parsed);
}

if (
  verifiedHiddenCodes.size !== 92 ||
  verificationRows.length !== 92
) {
  throw new Error(
    "分类文件 hidden 状态验证失败。\n" +
    `预期 92 个，实际 ${verifiedHiddenCodes.size} 个、${verificationRows.length} 条。\n` +
    "脚本已停止，没有修改组件。"
  );
}

/*
 * 第二步：定位 ProductSelectionClient.tsx 中
 * const selectionProducts = [...].filter(callback)
 */
const originalSource = fs.readFileSync(
  componentPath,
  "utf8"
);

assertSyntax(
  componentPath,
  originalSource
);

const parsedComponent = parseSource(
  componentPath,
  originalSource
);

let selectionDeclaration = null;
let filterCall = null;
let callbackNode = null;

function findSelectionProducts(node) {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.name.text ===
      "selectionProducts" &&
    node.initializer
  ) {
    if (selectionDeclaration) {
      throw new Error(
        "发现多个 selectionProducts 声明，脚本已停止。"
      );
    }

    const initializer = unwrap(
      node.initializer
    );

    if (
      !ts.isCallExpression(
        initializer
      ) ||
      !ts.isPropertyAccessExpression(
        initializer.expression
      ) ||
      initializer.expression.name.text !==
        "filter"
    ) {
      throw new Error(
        "selectionProducts 不是预期的数组 filter 合并结构。"
      );
    }

    if (
      initializer.arguments.length !== 1
    ) {
      throw new Error(
        "selectionProducts.filter 参数数量不是 1。"
      );
    }

    const callback =
      initializer.arguments[0];

    if (
      !ts.isArrowFunction(callback) &&
      !ts.isFunctionExpression(
        callback
      )
    ) {
      throw new Error(
        "selectionProducts.filter 回调不是函数。"
      );
    }

    selectionDeclaration = node;
    filterCall = initializer;
    callbackNode = callback;
  }

  ts.forEachChild(
    node,
    findSelectionProducts
  );
}

findSelectionProducts(
  parsedComponent
);

if (
  !selectionDeclaration ||
  !filterCall ||
  !callbackNode
) {
  throw new Error(
    "没有找到 selectionProducts 的合并去重回调。"
  );
}

const oldCallbackText =
  originalSource.slice(
    callbackNode.getStart(
      parsedComponent
    ),
    callbackNode.getEnd()
  );

if (
  oldCallbackText.includes(
    START_MARKER
  )
) {
  throw new Error(
    "hidden 优先去重规则已经存在，不需要重复执行。"
  );
}

if (
  !oldCallbackText.includes(
    "findIndex"
  ) ||
  !oldCallbackText.includes(
    "productId"
  )
) {
  throw new Error(
    "当前去重回调与预期不一致，脚本已停止。"
  );
}

const newCallback = `(product, index, array) => {
  /*
   * ${START_MARKER}
   *
   * 产品中心会把基础数据与各分类数据合并。
   * 同一个 productId 可能同时出现：
   *
   * - 基础数据中的 active 记录；
   * - 分类数据中的 hidden 记录。
   *
   * 正确规则：
   * 1. 同一商品只要任意来源被标记为 hidden，整个商品组都不展示；
   * 2. 没有 hidden 时，只允许 active 商品进入最终数组；
   * 3. 同一个 active 商品仍然只保留第一条，避免重复卡片。
   */
  const hasHiddenRecord = array.some((item) => {
    return (
      item.productId === product.productId &&
      item.status === "hidden"
    );
  });

  if (hasHiddenRecord) {
    return false;
  }

  if (product.status !== "active") {
    return false;
  }

  return (
    index ===
    array.findIndex((item) => {
      return (
        item.productId === product.productId &&
        item.status === "active"
      );
    })
  );

  /*
   * ${END_MARKER}
   */
}`;

const updatedSource =
  originalSource.slice(
    0,
    callbackNode.getStart(
      parsedComponent
    )
  ) +
  newCallback +
  originalSource.slice(
    callbackNode.getEnd()
  );

assertSyntax(
  componentPath,
  updatedSource
);

if (
  !updatedSource.includes(
    START_MARKER
  ) ||
  !updatedSource.includes(
    'item.status === "hidden"'
  ) ||
  !updatedSource.includes(
    'product.status !== "active"'
  ) ||
  !updatedSource.includes(
    'item.status === "active"'
  )
) {
  throw new Error(
    "新状态合并规则生成后校验失败。"
  );
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/selection-hidden-priority-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/selection-hidden-priority/${stamp}`
);

ensureDirectory(
  backupDirectory
);
ensureDirectory(
  reportDirectory
);

const backupPath = path.join(
  backupDirectory,
  rel(componentPath)
);

ensureDirectory(
  path.dirname(backupPath)
);

fs.copyFileSync(
  componentPath,
  backupPath
);

function restore() {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(
      backupPath,
      componentPath
    );
  }
}

function csvCell(value) {
  return `"${String(
    value ?? ""
  ).replace(/"/g, '""')}"`;
}

const csvHeaders = [
  "序号",
  "数据文件",
  "商品编码",
  "型号",
  "状态",
];

const csvLines = [
  csvHeaders
    .map(csvCell)
    .join(","),
];

verificationRows.forEach(
  (row, index) => {
    csvLines.push(
      [
        index + 1,
        row.dataFile,
        row.productCode,
        row.model,
        row.status,
      ]
        .map(csvCell)
        .join(",")
    );
  }
);

fs.writeFileSync(
  path.join(
    reportDirectory,
    "92个分类数据hidden验证.csv"
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
    "# 产品中心状态合并过滤修复",
    "",
    "- 已验证 92 个目标在分类文件中全部为 hidden",
    "- 只修改 ProductSelectionClient.tsx",
    "- 同一 productId 存在 hidden 时，整个商品组不进入最终数组",
    "- 不存在 hidden 时，只保留第一条 active 记录",
    "- 未添加全局 Helper",
    "- 未修改产品数据和接头替代查询",
    "",
  ].join("\n"),
  "utf8"
);

try {
  fs.writeFileSync(
    componentPath,
    updatedSource,
    "utf8"
  );

  const writtenSource =
    fs.readFileSync(
      componentPath,
      "utf8"
    );

  if (
    !writtenSource.includes(
      START_MARKER
    ) ||
    !writtenSource.includes(
      'item.status === "hidden"'
    ) ||
    !writtenSource.includes(
      'product.status !== "active"'
    ) ||
    !writtenSource.includes(
      'item.status === "active"'
    )
  ) {
    throw new Error(
      "写入后状态合并规则复查失败。"
    );
  }
} catch (error) {
  restore();
  throw error;
}

/*
 * 防止历史审计目录中的 .ts / .tsx 快照
 * 被 Next.js 纳入类型检查。
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
  "产品中心状态合并过滤修复："
);
console.log(
  `已验证分类 hidden 商品：${verifiedHiddenCodes.size} 个`
);
console.log(
  `修改组件：${rel(componentPath)}`
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
    componentPath,
    path.join(
      reportDirectory,
      "构建失败时的ProductSelectionClient.tsx.txt"
    )
  );

  restore();

  throw new Error(
    "构建失败，已自动恢复 ProductSelectionClient.tsx。\n" +
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
  "产品中心状态合并过滤修复完成"
);
console.log(
  "============================================"
);
console.log(
  `已验证 hidden：${verifiedHiddenCodes.size} 个`
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
Write-Host '准备修复产品中心合并数据的状态过滤问题……' -ForegroundColor Cyan
Write-Host '先验证 92 个分类记录全部为 hidden。' -ForegroundColor Yellow
Write-Host '只修改 ProductSelectionClient.tsx 的 selectionProducts 合并过滤规则。' -ForegroundColor Yellow
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
    throw "产品中心状态合并过滤修复未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
