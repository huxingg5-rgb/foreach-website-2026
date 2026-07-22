# ============================================================
# 快插接头复用图片审计
#
# 只读脚本：
# - 不修改产品状态
# - 不修改选型数据
# - 不修改 ProductSelectionClient
# - 不删除 quick-connect-offline-products.generated.ts
#
# 检查方式：
# 1. 读取快插接头选型数据
# 2. 按图片路径分组
# 3. 按图片文件 SHA-256 分组，识别不同文件名但内容相同
# 4. 区分：
#    - 相同结构，仅材质/密封圈不同：建议保留
#    - 不同结构复用同图：进入下架候选
#    - 空图、占位图、图片文件不存在：单独列出
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$tempNodeScript = Join-Path `
    $projectRoot `
    '.audit-quick-connect-shared-images.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

Set-Location -LiteralPath $projectRoot

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ts = require("typescript");

const root = process.cwd();

const selectionPath = path.join(
  root,
  "data/products/selection/quick-connect-fitting-selection.generated.ts"
);

const imageMapPath = path.join(
  root,
  "data/products/selection/quick-connect-fitting-image-map.generated.json"
);

const existingOfflineHelperPath = path.join(
  root,
  "data/products/selection/quick-connect-offline-products.generated.ts"
);

const productClientPath = path.join(
  root,
  "components/products/selection/ProductSelectionClient.tsx"
);

function stamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");

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

const reportDirectory = path.join(
  root,
  `audit-reports/quick-connect-shared-images/${stamp()}`
);

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {
    recursive: true,
  });
}

function clean(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return clean(value)
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function rel(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function sha256Buffer(buffer) {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
}

function sha256File(filePath) {
  return sha256Buffer(
    fs.readFileSync(filePath)
  );
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

  if (
    current.kind === ts.SyntaxKind.TrueKeyword
  ) {
    return "true";
  }

  if (
    current.kind === ts.SyntaxKind.FalseKeyword
  ) {
    return "false";
  }

  return "";
}

function objectPropertyMap(objectNode) {
  const map = new Map();

  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = propertyName(property.name);

    if (!key) {
      continue;
    }

    map.set(
      key,
      property.initializer
    );
  }

  return map;
}

function getString(properties, candidates) {
  for (const candidate of candidates) {
    const expression = properties.get(candidate);

    if (!expression) {
      continue;
    }

    const value = literalValue(expression);

    if (value) {
      return value;
    }
  }

  return "";
}

function getNestedStringMap(properties, candidates) {
  for (const candidate of candidates) {
    const expression = properties.get(candidate);
    const current = expression
      ? unwrap(expression)
      : null;

    if (
      !current ||
      !ts.isObjectLiteralExpression(current)
    ) {
      continue;
    }

    const values = {};

    for (const property of current.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue;
      }

      const key = propertyName(property.name);
      const value = literalValue(
        property.initializer
      );

      if (key) {
        values[key] = value;
      }
    }

    return values;
  }

  return {};
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

function findProductObjects(parsed) {
  const objects = [];

  for (const statement of parsed.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !isExported(statement)
    ) {
      continue;
    }

    for (
      const declaration of
      statement.declarationList.declarations
    ) {
      if (!declaration.initializer) {
        continue;
      }

      const current = unwrap(
        declaration.initializer
      );

      if (
        !current ||
        !ts.isArrayLiteralExpression(current)
      ) {
        continue;
      }

      const objectElements =
        current.elements.filter((element) =>
          ts.isObjectLiteralExpression(element)
        );

      if (
        objectElements.length === 0 ||
        objectElements.length !==
          current.elements.length
      ) {
        continue;
      }

      objects.push(...objectElements);
    }
  }

  return objects;
}

function resolvePublicImage(imagePath) {
  const value = clean(imagePath);

  if (!value) {
    return {
      imagePath: "",
      publicFile: "",
      exists: false,
      external: false,
    };
  }

  if (/^(https?:)?\/\//i.test(value)) {
    return {
      imagePath: value,
      publicFile: "",
      exists: true,
      external: true,
    };
  }

  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  decoded = decoded
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  const publicFile = path.join(
    root,
    "public",
    decoded
  );

  return {
    imagePath: value,
    publicFile,
    exists: fs.existsSync(publicFile),
    external: false,
  };
}

function isPlaceholderImage(imagePath) {
  const value = normalize(imagePath);

  if (!value) {
    return false;
  }

  return (
    value.includes("placeholder") ||
    value.includes("no-image") ||
    value.includes("no_image") ||
    value.includes("/images/logo/") ||
    value.includes("foreach-logo") ||
    value.includes(
      "quick connector_200x200_01_v001"
    )
  );
}

function normalizeStructureValue(value) {
  return normalize(value)
    .replace(/毫米/g, "mm")
    .replace(/\s+/g, "");
}

function deriveStructure(record) {
  const filters = record.filters;

  /*
   * 当前快插选型筛选结构：
   * filter01：系列（Q20/Q40/Q60）
   * filter02：接管内径/口径
   * filter03：公端/母端
   * filter04：穿板/非穿板
   * filter05：带阀/不带阀
   * filter06：直通/L型
   * filter07：材质
   * filter08：密封圈（若存在）
   *
   * 结构签名明确排除材质和密封圈。
   */
  const structuralFields = [
    filters.filter01,
    filters.filter02,
    filters.filter03,
    filters.filter04,
    filters.filter05,
    filters.filter06,
  ].map(normalizeStructureValue);

  const structuralSignature =
    structuralFields.join("|");

  return {
    structuralSignature,
    series: clean(filters.filter01),
    size: clean(filters.filter02),
    gender: clean(filters.filter03),
    mounting: clean(filters.filter04),
    valve: clean(filters.filter05),
    shape: clean(filters.filter06),
    material: clean(filters.filter07),
    seal: clean(
      filters.filter08 ||
      filters.filter09
    ),
  };
}

if (!fs.existsSync(selectionPath)) {
  throw new Error(
    `没有找到快插接头选型数据：${rel(selectionPath)}`
  );
}

const sourceBefore = fs.readFileSync(
  selectionPath
);
const sourceHashBefore = sha256Buffer(
  sourceBefore
);
const sourceText = sourceBefore.toString("utf8");
const parsed = parseSource(
  selectionPath,
  sourceText
);

if (parsed.parseDiagnostics.length > 0) {
  throw new Error(
    "快插接头选型数据存在 TypeScript 语法错误，已停止审计。"
  );
}

const objectNodes = findProductObjects(parsed);

if (objectNodes.length === 0) {
  throw new Error(
    "没有在快插接头选型文件中找到产品数组。"
  );
}

const records = [];

for (const objectNode of objectNodes) {
  const properties =
    objectPropertyMap(objectNode);

  const productTypeId = getString(
    properties,
    ["productTypeId"]
  );

  const sourceType = getString(
    properties,
    ["sourceType"]
  );

  if (
    productTypeId !==
      "quick-connect-fittings" &&
    !normalize(sourceType).includes(
      "quick-connect"
    )
  ) {
    continue;
  }

  const productCode = getString(
    properties,
    [
      "productCode",
      "productId",
      "code",
      "sku",
    ]
  );

  const model = getString(
    properties,
    [
      "model",
      "productModel",
      "name",
    ]
  );

  const status =
    getString(
      properties,
      ["status"]
    ) || "active";

  const imageCard = getString(
    properties,
    [
      "imageCard",
      "mainImage",
      "image",
      "imageUrl",
    ]
  );

  const filters = getNestedStringMap(
    properties,
    ["filters"]
  );

  const structure = deriveStructure({
    filters,
  });

  const resolved =
    resolvePublicImage(imageCard);

  const placeholder =
    isPlaceholderImage(imageCard);

  let imageHash = "";
  let imageBytes = 0;

  if (
    resolved.exists &&
    !resolved.external
  ) {
    imageHash = sha256File(
      resolved.publicFile
    );

    imageBytes = fs.statSync(
      resolved.publicFile
    ).size;
  }

  const line =
    parsed.getLineAndCharacterOfPosition(
      objectNode.getStart(parsed)
    ).line + 1;

  records.push({
    productCode,
    model,
    status,
    imageCard,
    publicFile: resolved.publicFile
      ? rel(resolved.publicFile)
      : "",
    imageExists: resolved.exists,
    externalImage: resolved.external,
    placeholder,
    imageHash,
    imageBytes,
    line,
    ...structure,
  });
}

const activeRecords = records.filter(
  (record) =>
    normalize(record.status) === "active"
);

if (activeRecords.length === 0) {
  throw new Error(
    "没有找到 active 状态的快插接头。"
  );
}

const missingRecords =
  activeRecords.filter((record) => {
    return (
      !record.imageCard ||
      record.placeholder ||
      (
        !record.externalImage &&
        !record.imageExists
      )
    );
  });

const validImageRecords =
  activeRecords.filter((record) => {
    return (
      record.imageCard &&
      !record.placeholder &&
      (
        record.externalImage ||
        record.imageExists
      )
    );
  });

const groups = new Map();

for (const record of validImageRecords) {
  /*
   * 优先按图片真实内容哈希分组。
   * 外部图片或无法计算哈希时退回路径。
   */
  const groupKey =
    record.imageHash ||
    `path:${normalize(record.imageCard)}`;

  if (!groups.has(groupKey)) {
    groups.set(groupKey, []);
  }

  groups.get(groupKey).push(record);
}

const sharedGroups = [];
const sameStructureRows = [];
const differentStructureRows = [];

let groupIndex = 0;

for (const [
  groupKey,
  groupRecords,
] of groups.entries()) {
  const uniqueProducts = new Set(
    groupRecords
      .map((record) =>
        clean(
          record.productCode ||
          record.model
        )
      )
      .filter(Boolean)
  );

  if (uniqueProducts.size <= 1) {
    continue;
  }

  groupIndex += 1;

  const structureSet = new Set(
    groupRecords
      .map((record) =>
        record.structuralSignature
      )
      .filter(Boolean)
  );

  const pathSet = new Set(
    groupRecords
      .map((record) =>
        record.imageCard
      )
      .filter(Boolean)
  );

  const isSameStructure =
    structureSet.size === 1;

  const conclusion = isSameStructure
    ? "同结构，仅材质或密封圈差异，建议保留"
    : "不同结构复用同一张图片，进入下架复核";

  const summary = {
    groupId: `G${String(
      groupIndex
    ).padStart(3, "0")}`,
    productCount: uniqueProducts.size,
    structureCount: structureSet.size,
    imagePathCount: pathSet.size,
    imageHash: groupKey.startsWith("path:")
      ? ""
      : groupKey,
    conclusion,
    records: groupRecords,
  };

  sharedGroups.push(summary);

  for (const record of groupRecords) {
    const row = {
      groupId: summary.groupId,
      conclusion,
      groupProductCount:
        summary.productCount,
      groupStructureCount:
        summary.structureCount,
      ...record,
    };

    if (isSameStructure) {
      sameStructureRows.push(row);
    } else {
      differentStructureRows.push(row);
    }
  }
}

ensureDirectory(reportDirectory);

function csvCell(value) {
  return `"${String(
    value ?? ""
  ).replace(/"/g, '""')}"`;
}

function writeCsv(filePath, rows) {
  const headers = [
    "分组",
    "结论",
    "分组产品数",
    "分组结构数",
    "商品编码",
    "型号",
    "状态",
    "系列",
    "口径",
    "公母端",
    "穿板状态",
    "带阀状态",
    "结构形式",
    "材质",
    "密封圈",
    "结构签名",
    "主图路径",
    "实际文件",
    "图片存在",
    "占位图",
    "图片SHA256",
    "图片字节",
    "数据行",
  ];

  const lines = [
    headers.map(csvCell).join(","),
  ];

  for (const row of rows) {
    lines.push(
      [
        row.groupId || "",
        row.conclusion || "",
        row.groupProductCount || "",
        row.groupStructureCount || "",
        row.productCode,
        row.model,
        row.status,
        row.series,
        row.size,
        row.gender,
        row.mounting,
        row.valve,
        row.shape,
        row.material,
        row.seal,
        row.structuralSignature,
        row.imageCard,
        row.publicFile,
        row.imageExists
          ? "是"
          : "否",
        row.placeholder
          ? "是"
          : "否",
        row.imageHash,
        row.imageBytes,
        row.line,
      ]
        .map(csvCell)
        .join(",")
    );
  }

  fs.writeFileSync(
    filePath,
    "\uFEFF" + lines.join("\r\n"),
    "utf8"
  );
}

writeCsv(
  path.join(
    reportDirectory,
    "01_不同结构复用同图_下架候选.csv"
  ),
  differentStructureRows
);

writeCsv(
  path.join(
    reportDirectory,
    "02_同结构材质密封差异_建议保留.csv"
  ),
  sameStructureRows
);

writeCsv(
  path.join(
    reportDirectory,
    "03_空图占位图或文件缺失.csv"
  ),
  missingRecords.map((record) => ({
    conclusion: !record.imageCard
      ? "未配置主图"
      : record.placeholder
      ? "使用占位图或通用图"
      : "图片文件不存在",
    ...record,
  }))
);

writeCsv(
  path.join(
    reportDirectory,
    "04_全部Active快插图片状态.csv"
  ),
  activeRecords
);

const groupSummaryRows =
  sharedGroups.map((group) => ({
    groupId: group.groupId,
    conclusion: group.conclusion,
    groupProductCount:
      group.productCount,
    groupStructureCount:
      group.structureCount,
    productCode: group.records
      .map((record) =>
        record.productCode
      )
      .join(" | "),
    model: group.records
      .map((record) =>
        record.model
      )
      .join(" | "),
    imageCard: [
      ...new Set(
        group.records.map(
          (record) =>
            record.imageCard
        )
      ),
    ].join(" | "),
    imageHash: group.imageHash,
  }));

writeCsv(
  path.join(
    reportDirectory,
    "05_复用图片分组汇总.csv"
  ),
  groupSummaryRows
);

let imageMapSummary = {
  exists: fs.existsSync(
    imageMapPath
  ),
  parsed: false,
  generatedAt: "",
  rawKeys: [],
};

if (imageMapSummary.exists) {
  try {
    const imageMap = JSON.parse(
      fs
        .readFileSync(
          imageMapPath,
          "utf8"
        )
        .replace(/^\uFEFF/, "")
    );

    imageMapSummary = {
      exists: true,
      parsed: true,
      generatedAt:
        imageMap.generatedAt || "",
      rawKeys: Object.keys(imageMap),
    };
  } catch (error) {
    imageMapSummary = {
      exists: true,
      parsed: false,
      generatedAt: "",
      rawKeys: [],
      error:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}

const clientContent =
  fs.existsSync(productClientPath)
    ? fs.readFileSync(
        productClientPath,
        "utf8"
      )
    : "";

const existingOfflineHelper = {
  exists: fs.existsSync(
    existingOfflineHelperPath
  ),
  importedByClient:
    clientContent.includes(
      "quick-connect-offline-products.generated"
    ) ||
    clientContent.includes(
      "isQuickConnectProductOffline"
    ),
};

const summary = {
  generatedAt:
    new Date().toISOString(),
  selectionFile:
    rel(selectionPath),
  totalQuickConnectRecords:
    records.length,
  activeRecords:
    activeRecords.length,
  missingOrPlaceholderRecords:
    missingRecords.length,
  validImageRecords:
    validImageRecords.length,
  sharedImageGroups:
    sharedGroups.length,
  sameStructureSharedGroups:
    sharedGroups.filter(
      (group) =>
        group.structureCount === 1
    ).length,
  differentStructureSharedGroups:
    sharedGroups.filter(
      (group) =>
        group.structureCount > 1
    ).length,
  sameStructureRows:
    sameStructureRows.length,
  differentStructureCandidateRows:
    differentStructureRows.length,
  imageMapSummary,
  existingOfflineHelper,
  sourceHashBefore,
};

fs.writeFileSync(
  path.join(
    reportDirectory,
    "审计摘要.json"
  ),
  JSON.stringify(
    summary,
    null,
    2
  ),
  "utf8"
);

const markdown = [
  "# 快插接头复用图片审计",
  "",
  `- 快插接头总记录：${records.length}`,
  `- Active 记录：${activeRecords.length}`,
  `- 空图、占位图或文件缺失：${missingRecords.length}`,
  `- 有效图片记录：${validImageRecords.length}`,
  `- 复用图片分组：${sharedGroups.length}`,
  `- 同结构共图分组：${summary.sameStructureSharedGroups}`,
  `- 不同结构共图分组：${summary.differentStructureSharedGroups}`,
  `- 不同结构共图下架候选产品行：${differentStructureRows.length}`,
  "",
  "## 判断规则",
  "",
  "- 系列、口径、公端/母端、穿板/非穿板、带阀/不带阀、直通/L型属于结构条件。",
  "- 材质与密封圈不参与结构签名，仅材质或密封圈不同的共图产品归入建议保留。",
  "- 图片路径不同但 SHA-256 一致，仍按同一张图片处理。",
  "- 本次只生成报告，没有修改产品数据和页面代码。",
  "",
  "## 现有旧下架 Helper",
  "",
  `- 文件存在：${existingOfflineHelper.exists ? "是" : "否"}`,
  `- ProductSelectionClient 当前引用：${existingOfflineHelper.importedByClient ? "是" : "否"}`,
  "",
  "## 输出文件",
  "",
  "- `01_不同结构复用同图_下架候选.csv`",
  "- `02_同结构材质密封差异_建议保留.csv`",
  "- `03_空图占位图或文件缺失.csv`",
  "- `04_全部Active快插图片状态.csv`",
  "- `05_复用图片分组汇总.csv`",
  "",
].join("\n");

fs.writeFileSync(
  path.join(
    reportDirectory,
    "审计摘要.md"
  ),
  markdown,
  "utf8"
);

const sourceHashAfter =
  sha256File(selectionPath);

if (
  sourceHashAfter !==
  sourceHashBefore
) {
  throw new Error(
    "只读审计异常：快插选型文件哈希发生变化。"
  );
}

console.log("");
console.log("============================================");
console.log("快插接头复用图片审计完成");
console.log("============================================");
console.log(`Active 快插：${activeRecords.length}`);
console.log(
  `空图/占位图/文件缺失：${missingRecords.length}`
);
console.log(
  `复用图片分组：${sharedGroups.length}`
);
console.log(
  `同结构共图分组：${summary.sameStructureSharedGroups}`
);
console.log(
  `不同结构共图分组：${summary.differentStructureSharedGroups}`
);
console.log(
  `不同结构共图下架候选行：${differentStructureRows.length}`
);
console.log("");
console.log(
  `报告目录：${rel(reportDirectory)}`
);
console.log("");
console.log(
  "本次没有修改任何产品数据或页面代码。"
);
console.log(
  "请先查看 01_不同结构复用同图_下架候选.csv。"
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '开始审计快插接头复用图片……' -ForegroundColor Cyan
Write-Host '本次只生成报告，不会下架或修改任何产品。' -ForegroundColor Yellow
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
}

if ($nodeExitCode -ne 0) {
    throw '快插接头复用图片审计失败，请把完整错误发来。'
}

Write-Host ''
Write-Host '审计完成。没有执行 git commit 或 git push。' -ForegroundColor Green
