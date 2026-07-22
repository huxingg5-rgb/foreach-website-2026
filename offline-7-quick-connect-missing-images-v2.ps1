# ============================================================
# 下架 7 个无有效主图的快插接头，并同步接头替代查询
#
# 数据来源：
# audit-reports\quick-connect-shared-images\最新时间\
# 03_空图占位图或文件缺失.csv
#
# 严格限制：
# - 必须恰好读取 7 个 Active 快插商品
# - 必须恰好在快插选型数据中命中 7 个商品
# - 只把这 7 个商品的 status 从 active 改为 hidden
# - 商品编码优先，商品编码为空时按型号同步删除接头替代查询关联
# - 不接入任何全局过滤 Helper
# - 不修改 ProductSelectionClient.tsx
# - 不修改其他接头、泵、阀、针、管路或智控
# - 构建失败自动回滚
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$auditRoot = Join-Path `
    $projectRoot `
    'audit-reports\quick-connect-shared-images'

$tempTargetJson = Join-Path `
    $projectRoot `
    '.hide-quick-connect-missing-image-targets.json'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.hide-quick-connect-missing-image.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $auditRoot)) {
    throw "没有找到快插图片审计目录：$auditRoot"
}

Set-Location -LiteralPath $projectRoot

# 只使用最新一次快插图片审计报告。
$latestAuditDirectory = Get-ChildItem `
    -LiteralPath $auditRoot `
    -Directory |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if ($null -eq $latestAuditDirectory) {
    throw "快插图片审计目录中没有报告。"
}

$targetCsv = Join-Path `
    $latestAuditDirectory.FullName `
    '03_空图占位图或文件缺失.csv'

if (-not (Test-Path -LiteralPath $targetCsv)) {
    throw "最新审计报告中没有找到：03_空图占位图或文件缺失.csv"
}

$rows = Import-Csv `
    -LiteralPath $targetCsv

if ($rows.Count -ne 7) {
    throw "审计清单数量异常：预期 7 条，实际 $($rows.Count) 条。脚本已停止。"
}

$targets = foreach ($row in $rows) {
    # 优先按表头读取；若中文表头识别异常，再按审计 CSV 固定列顺序兜底。
    $values = @(
        $row.PSObject.Properties |
            ForEach-Object {
                [string]$_.Value
            }
    )

    $codeCandidates = @(
        [string]$row.'商品编码'
        [string]$row.'产品编码'
        [string]$row.'产品ID'
        [string]$row.'productCode'
        $(if ($values.Count -gt 4) { $values[4] } else { '' })
    )

    $modelCandidates = @(
        [string]$row.'型号'
        [string]$row.'model'
        $(if ($values.Count -gt 5) { $values[5] } else { '' })
    )

    $statusCandidates = @(
        [string]$row.'状态'
        [string]$row.'status'
        $(if ($values.Count -gt 6) { $values[6] } else { '' })
    )

    $reasonCandidates = @(
        [string]$row.'结论'
        [string]$row.'reason'
        $(if ($values.Count -gt 1) { $values[1] } else { '' })
    )

    $code = (
        $codeCandidates |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_)
            } |
            Select-Object -First 1
    ).Trim()

    $model = (
        $modelCandidates |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_)
            } |
            Select-Object -First 1
    ).Trim()

    $status = (
        $statusCandidates |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_)
            } |
            Select-Object -First 1
    ).Trim()

    $reason = (
        $reasonCandidates |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_)
            } |
            Select-Object -First 1
    ).Trim()

    if (
        [string]::IsNullOrWhiteSpace($code) -and
        [string]::IsNullOrWhiteSpace($model)
    ) {
        throw "清单中存在商品编码和型号同时为空的记录，脚本已停止。"
    }

    $displayKey = if (
        -not [string]::IsNullOrWhiteSpace($code)
    ) {
        $code
    } else {
        $model
    }

    if ($status -ne 'active') {
        throw "商品 $displayKey 当前审计状态不是 active，而是：$status"
    }

    [PSCustomObject]@{
        code     = $code
        model    = $model
        identity = $displayKey
        status   = $status
        reason   = $reason
    }
}

$uniqueIdentities = @(
    $targets |
        Select-Object -ExpandProperty identity -Unique
)

if ($uniqueIdentities.Count -ne 7) {
    throw "商品编码/型号组合去重后不是 7 个，而是 $($uniqueIdentities.Count) 个。"
}

$fallbackModelCount = @(
    $targets |
        Where-Object {
            [string]::IsNullOrWhiteSpace($_.code)
        }
).Count

Write-Host "审计清单：7 条；其中 $fallbackModelCount 条将使用型号精确匹配。" -ForegroundColor DarkGray

# 无 BOM 写入，避免 Node.js JSON.parse 报错。
$targetJson = $targets |
    ConvertTo-Json -Depth 6

[System.IO.File]::WriteAllText(
    $tempTargetJson,
    $targetJson,
    [System.Text.UTF8Encoding]::new($false)
)

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();

const targetJsonPath = path.join(
  root,
  ".hide-quick-connect-missing-image-targets.json"
);

const quickSelectionPath = path.join(
  root,
  "data/products/selection/quick-connect-fitting-selection.generated.ts"
);

const replacementPaths = [
  path.join(
    root,
    "data/resources/fitting-replacement/all-compatible-products.generated.ts"
  ),
  path.join(
    root,
    "data/resources/fitting-replacement/compatible-models.generated.ts"
  ),
];

const productClientPath = path.join(
  root,
  "components/products/selection/ProductSelectionClient.tsx"
);

const oldHelperPath = path.join(
  root,
  "data/products/selection/quick-connect-offline-products.generated.ts"
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

function timeStamp() {
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

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {
    recursive: true,
  });
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

  if (
    parsed.parseDiagnostics.length === 0
  ) {
    return;
  }

  const message =
    parsed.parseDiagnostics
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        )
      )
      .join("\n");

  throw new Error(
    `${rel(filePath)} TypeScript 语法错误：\n${message}`
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
      typeof ts.isSatisfiesExpression ===
        "function" &&
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
  const map = new Map();

  for (
    const property of
    objectNode.properties
  ) {
    if (
      !ts.isPropertyAssignment(property)
    ) {
      continue;
    }

    const key = propertyName(
      property.name
    );

    if (key) {
      map.set(key, property);
    }
  }

  return map;
}

function getString(
  properties,
  candidates
) {
  for (const candidate of candidates) {
    const property =
      properties.get(candidate);

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

function isExported(statement) {
  return Boolean(
    statement.modifiers?.some(
      (modifier) =>
        modifier.kind ===
        ts.SyntaxKind.ExportKeyword
    )
  );
}

function findExportedArrayObjects(
  parsed
) {
  const arrays = [];

  for (
    const statement of
    parsed.statements
  ) {
    if (
      !ts.isVariableStatement(statement) ||
      !isExported(statement)
    ) {
      continue;
    }

    for (
      const declaration of
      statement.declarationList
        .declarations
    ) {
      if (!declaration.initializer) {
        continue;
      }

      const current = unwrap(
        declaration.initializer
      );

      if (
        !current ||
        !ts.isArrayLiteralExpression(
          current
        )
      ) {
        continue;
      }

      const objects =
        current.elements.filter(
          (element) =>
            ts.isObjectLiteralExpression(
              element
            )
        );

      if (
        objects.length === 0 ||
        objects.length !==
          current.elements.length
      ) {
        continue;
      }

      arrays.push({
        arrayNode: current,
        objects,
      });
    }
  }

  return arrays;
}

if (!fs.existsSync(targetJsonPath)) {
  throw new Error(
    `没有找到目标清单：${rel(
      targetJsonPath
    )}`
  );
}

const targetRows = JSON.parse(
  fs
    .readFileSync(
      targetJsonPath,
      "utf8"
    )
    .replace(/^\uFEFF/, "")
);

if (
  !Array.isArray(targetRows) ||
  targetRows.length !== 7
) {
  throw new Error(
    `目标清单应为 7 条，实际 ${
      Array.isArray(targetRows)
        ? targetRows.length
        : 0
    } 条。`
  );
}

const targetCodes = new Set(
  targetRows
    .map((row) =>
      normalize(row.code)
    )
    .filter(Boolean)
);

const targetModels = new Set(
  targetRows
    .map((row) =>
      normalize(row.model)
    )
    .filter(Boolean)
);

const targetIdentityRows =
  targetRows.map((row) => {
    const code = normalize(row.code);
    const model = normalize(row.model);

    if (!code && !model) {
      throw new Error(
        "目标清单中存在商品编码和型号同时为空的记录。"
      );
    }

    return {
      code,
      model,
      identity: code
        ? `CODE:${code}`
        : `MODEL:${model}`,
    };
  });

const targetIdentitySet = new Set(
  targetIdentityRows.map(
    (row) => row.identity
  )
);

if (targetIdentitySet.size !== 7) {
  throw new Error(
    `目标商品编码/型号组合去重后不是 7 个，而是 ${targetIdentitySet.size} 个。`
  );
}

function getMatchedTargetIdentities(
  codeValues,
  modelValues
) {
  const identities = [];

  for (const target of targetIdentityRows) {
    if (
      target.code &&
      codeValues.includes(target.code)
    ) {
      identities.push(
        target.identity
      );
      continue;
    }

    if (
      target.model &&
      modelValues.includes(target.model)
    ) {
      identities.push(
        target.identity
      );
    }
  }

  return identities;
}

if (
  !fs.existsSync(
    quickSelectionPath
  )
) {
  throw new Error(
    `没有找到快插选型数据：${rel(
      quickSelectionPath
    )}`
  );
}

for (
  const replacementPath of
  replacementPaths
) {
  if (
    !fs.existsSync(
      replacementPath
    )
  ) {
    throw new Error(
      `没有找到接头替代数据：${rel(
        replacementPath
      )}`
    );
  }
}

if (
  !fs.existsSync(productClientPath)
) {
  throw new Error(
    `没有找到产品选型组件：${rel(
      productClientPath
    )}`
  );
}

const clientSource =
  fs.readFileSync(
    productClientPath,
    "utf8"
  );

if (
  !clientSource.includes(
    'product.status === "active"'
  )
) {
  throw new Error(
    "ProductSelectionClient.tsx 当前没有按 active 状态过滤，脚本已停止。"
  );
}

if (
  clientSource.includes(
    "quick-connect-offline-products.generated"
  ) ||
  clientSource.includes(
    "isQuickConnectProductOffline"
  )
) {
  throw new Error(
    "ProductSelectionClient.tsx 当前仍引用旧快插下架 Helper，脚本已停止。"
  );
}

/*
 * 第一步：只准备快插选型文件中的 7 个 status 修改。
 * 此阶段不写文件。
 */
function prepareQuickSelection() {
  const source =
    fs.readFileSync(
      quickSelectionPath,
      "utf8"
    );

  const parsed = parseSource(
    quickSelectionPath,
    source
  );

  const arrays =
    findExportedArrayObjects(parsed);

  const edits = [];
  const matches = [];

  for (const array of arrays) {
    for (
      const objectNode of
      array.objects
    ) {
      const properties =
        objectProperties(objectNode);

      const productTypeId =
        getString(
          properties,
          ["productTypeId"]
        );

      const sourceType =
        getString(
          properties,
          ["sourceType"]
        );

      if (
        productTypeId !==
          "quick-connect-fittings" &&
        !clean(sourceType)
          .toLowerCase()
          .includes("quick-connect")
      ) {
        continue;
      }

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

      const matchedTargetIdentities =
        getMatchedTargetIdentities(
          codeValues,
          modelValues
        );

      const matchedByCode =
        codeValues.some((value) =>
          targetCodes.has(value)
        );

      const matchedByModel =
        modelValues.some((value) =>
          targetModels.has(value)
        );

      if (
        matchedTargetIdentities.length === 0
      ) {
        continue;
      }

      const statusProperty =
        properties.get("status");

      if (!statusProperty) {
        throw new Error(
          `目标商品 ${
            codeValues[0] ||
            modelValues[0]
          } 没有 status 字段。`
        );
      }

      const currentStatus =
        literalValue(
          statusProperty.initializer
        );

      if (currentStatus !== "active") {
        throw new Error(
          `目标商品 ${
            codeValues[0] ||
            modelValues[0]
          } 当前状态不是 active，而是 ${currentStatus}。`
        );
      }

      edits.push({
        start:
          statusProperty.initializer.getStart(
            parsed
          ),
        end:
          statusProperty.initializer.getEnd(),
        replacement: '"hidden"',
      });

      matches.push({
        productCode:
          codeValues[0] || "",
        model:
          modelValues[0] || "",
        matchedTargetIdentities,
        oldStatus:
          currentStatus,
        newStatus: "hidden",
        line:
          parsed.getLineAndCharacterOfPosition(
            objectNode.getStart(parsed)
          ).line + 1,
      });
    }
  }

  const matchedTargetIdentities =
    new Set(
      matches.flatMap(
        (item) =>
          item.matchedTargetIdentities
      )
    );

  const matchedProducts =
    new Set(
      matches.map((item) =>
        normalize(
          item.productCode ||
          item.model
        )
      )
    );

  if (
    matches.length !== 7 ||
    matchedProducts.size !== 7 ||
    matchedTargetIdentities.size !== 7
  ) {
    throw new Error(
      "快插选型匹配数量异常。\n" +
      `预期：7 个目标、7 个商品、7 条记录；实际：${matchedTargetIdentities.size} 个目标、${matchedProducts.size} 个商品、${matches.length} 条记录。\n` +
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
    quickSelectionPath,
    updatedSource
  );

  return {
    filePath:
      quickSelectionPath,
    source,
    updatedSource,
    matches,
  };
}

/*
 * 第二步：准备从接头替代查询导出数组中
 * 删除商品编码精确命中的对象。
 */
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
});

function prepareReplacement(
  filePath
) {
  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const parsed = parseSource(
    filePath,
    source
  );

  const arrays =
    findExportedArrayObjects(parsed);

  const edits = [];
  const removed = [];

  for (const array of arrays) {
    const kept = [];
    let removedFromArray = 0;

    for (
      const objectNode of
      array.objects
    ) {
      const properties =
        objectProperties(objectNode);

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
          ["foreachModel"]
        ),
        getString(
          properties,
          ["productModel"]
        ),
        getString(
          properties,
          ["model"]
        ),
      ]
        .map(normalize)
        .filter(Boolean);

      const matchedTargetIdentities =
        getMatchedTargetIdentities(
          codeValues,
          modelValues
        );

      const matchedByCode =
        codeValues.some((value) =>
          targetCodes.has(value)
        );

      const matchedByModel =
        modelValues.some((value) =>
          targetModels.has(value)
        );

      if (
        matchedTargetIdentities.length > 0
      ) {
        removedFromArray += 1;

        removed.push({
          file: rel(filePath),
          productCode:
            codeValues[0] || "",
          model:
            modelValues[0] || "",
          compatibleModel:
            getString(
              properties,
              [
                "compatibleModel",
                "competitorModel",
              ]
            ),
          matchedBy:
            matchedByCode
              ? "商品编码/产品ID"
              : "FOREACH型号兜底",
          matchedTargetIdentities:
            matchedTargetIdentities.join(" | "),
        });

        continue;
      }

      kept.push(objectNode);
    }

    if (removedFromArray === 0) {
      continue;
    }

    const updatedArray =
      ts.factory.updateArrayLiteralExpression(
        array.arrayNode,
        kept
      );

    const replacement =
      printer.printNode(
        ts.EmitHint.Expression,
        updatedArray,
        parsed
      );

    edits.push({
      start:
        array.arrayNode.getStart(parsed),
      end:
        array.arrayNode.getEnd(),
      replacement,
    });
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
    filePath,
    source,
    updatedSource,
    removed,
    changed:
      edits.length > 0,
  };
}

const quickPrepared =
  prepareQuickSelection();

const replacementPrepared =
  replacementPaths.map(
    prepareReplacement
  );

const replacementRemoved =
  replacementPrepared.flatMap(
    (item) => item.removed
  );

console.log("");
console.log(
  "快插无主图下架复查："
);
console.log(
  `快插选型命中：${quickPrepared.matches.length} 个`
);
console.log(
  `接头替代关联记录：${replacementRemoved.length} 条`
);

for (
  const item of
  replacementPrepared
) {
  console.log(
    `- ${rel(item.filePath)}：删除 ${item.removed.length} 条`
  );
}

const stamp = timeStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/quick-connect-missing-image-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/quick-connect-missing-image-offline/${stamp}`
);

ensureDirectory(
  backupDirectory
);
ensureDirectory(
  reportDirectory
);

const filesToWrite = [
  quickPrepared,
  ...replacementPrepared.filter(
    (item) => item.changed
  ),
];

for (const item of filesToWrite) {
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
  for (
    const item of
    filesToWrite
  ) {
    const backupPath = path.join(
      backupDirectory,
      rel(item.filePath)
    );

    if (
      fs.existsSync(backupPath)
    ) {
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

function writeCsv(
  filePath,
  headers,
  rows
) {
  const lines = [
    headers.map(csvCell).join(","),
    ...rows.map((row) =>
      headers
        .map((header) =>
          csvCell(row[header])
        )
        .join(",")
    ),
  ];

  fs.writeFileSync(
    filePath,
    "\uFEFF" +
      lines.join("\r\n"),
    "utf8"
  );
}

writeCsv(
  path.join(
    reportDirectory,
    "01_下架快插商品.csv"
  ),
  [
    "productCode",
    "model",
    "oldStatus",
    "newStatus",
    "line",
  ],
  quickPrepared.matches
);

writeCsv(
  path.join(
    reportDirectory,
    "02_删除的接头替代关联.csv"
  ),
  [
    "file",
    "productCode",
    "model",
    "compatibleModel",
    "matchedBy",
  ],
  replacementRemoved
);

fs.writeFileSync(
  path.join(
    reportDirectory,
    "执行摘要.md"
  ),
  [
    "# 无有效主图快插下架",
    "",
    `- 下架快插商品：${quickPrepared.matches.length} 个`,
    `- 删除接头替代关联：${replacementRemoved.length} 条`,
    "- 状态修改：active → hidden",
    "- 未修改 ProductSelectionClient.tsx",
    "- 未接入旧快插 Helper",
    `- 旧 Helper 文件存在：${fs.existsSync(oldHelperPath) ? "是" : "否"}`,
    "",
  ].join("\n"),
  "utf8"
);

try {
  for (const item of filesToWrite) {
    fs.writeFileSync(
      item.filePath,
      item.updatedSource,
      "utf8"
    );

    console.log(
      `已修改：${rel(item.filePath)}`
    );
  }

  /*
   * 写入后复查 7 个商品已经变为 hidden。
   */
  const afterSource =
    fs.readFileSync(
      quickSelectionPath,
      "utf8"
    );

  const afterParsed =
    parseSource(
      quickSelectionPath,
      afterSource
    );

  let hiddenCount = 0;
  const hiddenCodes =
    new Set();

  for (
    const array of
    findExportedArrayObjects(
      afterParsed
    )
  ) {
    for (
      const objectNode of
      array.objects
    ) {
      const properties =
        objectProperties(objectNode);

      const codeValues = [
        getString(
          properties,
          [
            "productCode",
            "productId",
            "code",
            "sku",
          ]
        ),
      ]
        .map(normalize)
        .filter(Boolean);

      const modelValues = [
        getString(
          properties,
          ["model", "productModel"]
        ),
      ]
        .map(normalize)
        .filter(Boolean);

      const matchedTargetIdentities =
        getMatchedTargetIdentities(
          codeValues,
          modelValues
        );

      if (
        matchedTargetIdentities.length === 0
      ) {
        continue;
      }

      const status =
        getString(
          properties,
          ["status"]
        );

      if (status === "hidden") {
        hiddenCount += 1;

        for (
          const identity of
          matchedTargetIdentities
        ) {
          hiddenCodes.add(
            identity
          );
        }
      }
    }
  }

  if (
    hiddenCount !== 7 ||
    hiddenCodes.size !== 7
  ) {
    throw new Error(
      `写入后复查失败：hidden 记录 ${hiddenCount} 条，商品 ${hiddenCodes.size} 个。`
    );
  }
} catch (error) {
  restore();
  throw error;
}

/*
 * 避免历史审计目录中的 .ts/.tsx 快照参与 Next.js 类型检查。
 * 只处理 audit-reports，不触碰正式源码。
 */
function quarantineAuditTypeScriptFiles(
  directory
) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const renamed = [];

  function walk(
    currentDirectory
  ) {
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

      if (
        fs.existsSync(targetPath)
      ) {
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
    `已将 ${quarantined.length} 个历史审计 .ts/.tsx 文件改名为 .txt。`
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

const buildResult =
  spawnSync(
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

  for (const item of filesToWrite) {
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
    "构建失败，已自动恢复本次修改前的文件。\n" +
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
  "无有效主图快插下架完成"
);
console.log(
  "============================================"
);
console.log(
  `快插商品：${quickPrepared.matches.length} 个`
);
console.log(
  `接头替代关联：${replacementRemoved.length} 条`
);
console.log(
  `备份目录：${rel(backupDirectory)}`
);
console.log(
  `报告目录：${rel(reportDirectory)}`
);
console.log(
  `旧 Helper 文件：${fs.existsSync(oldHelperPath) ? "保留未动" : "不存在"}`
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '准备下架 7 个无有效主图的快插接头……' -ForegroundColor Cyan
Write-Host "审计来源：$($latestAuditDirectory.FullName)" -ForegroundColor DarkGray
Write-Host '状态将从 active 改为 hidden。' -ForegroundColor Yellow
Write-Host '同时精确同步接头替代查询，不使用全局过滤。' -ForegroundColor Yellow
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
    throw '无有效主图快插下架未完成。请把完整错误和 npm-build.log 发来。'
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
