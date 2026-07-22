# ============================================================
# 接头兼容型号查询｜主图与复用图片审查
#
# 本脚本只审查，不删除、不修改任何官网数据。
#
# 检查对象：
# 1. data/resources/fitting-replacement/all-compatible-products.generated.ts
# 2. data/resources/fitting-replacement/compatible-models.generated.ts
#
# 检查内容：
# - 商品编码是否唯一
# - 图片路径是否为空
# - 是否使用 Logo / placeholder / default / no-image 等占位图
# - public 中对应图片文件是否存在
# - 多个商品编码是否复用同一图片路径
# - 图片路径不同，但文件内容是否完全相同（SHA256）
# - 两份兼容查询数据的商品编码集合是否一致
#
# 输出：
# audit-reports/fitting-replacement-main-image-audit/<时间>/
#
# 重要：
# - “建议删除清单”只是审查结果
# - 本脚本不会删除商品
# - 下一步再按唯一商品编码从两份数据中同步删除
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.audit-fitting-replacement-main-images.cjs'

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

const allProductsPath = path.join(
  root,
  "data/resources/fitting-replacement/all-compatible-products.generated.ts"
);

const compatibleModelsPath = path.join(
  root,
  "data/resources/fitting-replacement/compatible-models.generated.ts"
);

const publicDirectory = path.join(
  root,
  "public"
);

function clean(value) {
  return String(value ?? "").trim();
}

function normalizeCode(value) {
  return clean(value).toUpperCase();
}

function normalizeWebPath(value) {
  const raw = clean(value);

  if (!raw) {
    return "";
  }

  const withoutQuery = raw
    .split("?")[0]
    .split("#")[0]
    .replace(/\\/g, "/");

  if (
    /^https?:\/\//i.test(withoutQuery) ||
    /^data:/i.test(withoutQuery)
  ) {
    return withoutQuery;
  }

  return `/${withoutQuery.replace(/^\/+/, "")}`;
}

function relative(filePath) {
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

function expressionValue(expression) {
  const current = unwrap(expression);

  if (!current) {
    return undefined;
  }

  if (
    ts.isStringLiteral(current) ||
    ts.isNoSubstitutionTemplateLiteral(current) ||
    ts.isNumericLiteral(current)
  ) {
    return String(current.text);
  }

  if (current.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (current.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (current.kind === ts.SyntaxKind.NullKeyword) {
    return null;
  }

  if (ts.isArrayLiteralExpression(current)) {
    return current.elements.map((item) =>
      expressionValue(item)
    );
  }

  if (ts.isObjectLiteralExpression(current)) {
    return objectLiteralValue(current);
  }

  return undefined;
}

function objectLiteralValue(objectNode) {
  const result = {};

  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = propertyName(property.name);

    if (!key) {
      continue;
    }

    result[key] = expressionValue(
      property.initializer
    );
  }

  return result;
}

function extractExportedArray(
  filePath,
  variableName
) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `没有找到数据文件：${relative(filePath)}`
    );
  }

  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const parsed = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  if (parsed.parseDiagnostics.length > 0) {
    const message = parsed.parseDiagnostics
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        )
      )
      .join("\n");

    throw new Error(
      `${relative(filePath)} TypeScript 解析失败：\n${message}`
    );
  }

  let arrayNode = null;
  let declarationCount = 0;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === variableName
    ) {
      declarationCount += 1;

      const initializer = unwrap(
        node.initializer
      );

      if (
        !initializer ||
        !ts.isArrayLiteralExpression(initializer)
      ) {
        throw new Error(
          `${variableName} 不是直接数组结构。`
        );
      }

      arrayNode = initializer;
    }

    ts.forEachChild(node, visit);
  }

  visit(parsed);

  if (
    declarationCount !== 1 ||
    !arrayNode
  ) {
    throw new Error(
      `${relative(filePath)} 中 ${variableName} 声明数量异常：${declarationCount}`
    );
  }

  const records = [];

  for (const element of arrayNode.elements) {
    const current = unwrap(element);

    if (!ts.isObjectLiteralExpression(current)) {
      throw new Error(
        `${variableName} 中发现非对象记录。`
      );
    }

    records.push(
      objectLiteralValue(current)
    );
  }

  return records;
}

function fileHash(filePath) {
  const hash = crypto.createHash(
    "sha256"
  );

  hash.update(
    fs.readFileSync(filePath)
  );

  return hash.digest("hex");
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

function groupBy(items, keyGetter) {
  const groups = new Map();

  for (const item of items) {
    const key = keyGetter(item);

    if (!key) {
      continue;
    }

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(item);
  }

  return groups;
}

function duplicateCodes(records) {
  const groups = groupBy(
    records,
    (item) =>
      normalizeCode(item.productCode)
  );

  return [...groups.entries()]
    .filter(
      ([code, items]) =>
        code && items.length > 1
    )
    .flatMap(([code, items]) =>
      items.map((item) => ({
        商品编码: code,
        型号:
          clean(item.foreachModel),
        产品类型:
          clean(item.productType),
        产品系列:
          clean(item.productSeries),
        重复次数: items.length,
      }))
    );
}

const allProducts = extractExportedArray(
  allProductsPath,
  "fittingReplacementAllCompatibleProducts"
);

const compatibleProducts =
  extractExportedArray(
    compatibleModelsPath,
    "fittingCompatibleModelProducts"
  );

if (allProducts.length === 0) {
  throw new Error(
    "接头兼容型号查询首页产品数据为空。"
  );
}

const placeholderPattern =
  /(placeholder|no[-_ ]?image|no[-_ ]?photo|default[-_ ]?image|coming[-_ ]?soon|empty[-_ ]?image|blank[-_ ]?image|foreach[-_ ]?logo|brand[-_ ]?logo|\/logo(?:s)?\/|compatible-model-placeholder)/i;

const auditRows = [];

for (const product of allProducts) {
  const productCode = normalizeCode(
    product.productCode
  );

  const imagePath = normalizeWebPath(
    product.imagePath
  );

  const reasons = [];

  let localPath = "";
  let exists = false;
  let hash = "";
  let fileSize = "";
  let imageKind = "";

  if (!productCode) {
    reasons.push(
      "商品编码为空"
    );
  }

  if (!imagePath) {
    reasons.push(
      "图片路径为空"
    );
    imageKind = "空路径";
  } else if (
    /^https?:\/\//i.test(imagePath) ||
    /^data:/i.test(imagePath)
  ) {
    reasons.push(
      "外部或内嵌图片，需人工确认"
    );
    imageKind = "外部图片";
  } else {
    localPath = path.join(
      publicDirectory,
      imagePath.replace(/^\/+/, "")
    );

    exists =
      fs.existsSync(localPath) &&
      fs.statSync(localPath).isFile();

    if (placeholderPattern.test(imagePath)) {
      reasons.push(
        "Logo/占位图/默认图"
      );
      imageKind = "占位图";
    } else {
      imageKind = "产品图";
    }

    if (!exists) {
      reasons.push(
        "public 中图片文件不存在"
      );
    } else {
      const stat = fs.statSync(
        localPath
      );

      fileSize = stat.size;
      hash = fileHash(localPath);
    }
  }

  auditRows.push({
    productCode,
    foreachModel:
      clean(product.foreachModel),
    productType:
      clean(product.productType),
    productSeries:
      clean(product.productSeries),
    imagePath,
    localPath: localPath
      ? relative(localPath)
      : "",
    exists,
    hash,
    fileSize,
    imageKind,
    directReasons: reasons,
    showOnHome:
      product.showOnHome === false
        ? "false"
        : "true",
    detailHref:
      clean(product.detailHref),
  });
}

/*
 * 同一路径复用：
 * 至少 2 个不同商品编码使用同一个图片路径。
 */
const pathGroups = groupBy(
  auditRows.filter(
    (item) => item.imagePath
  ),
  (item) =>
    item.imagePath.toLowerCase()
);

const sharedPathGroups = [
  ...pathGroups.entries(),
]
  .map(([imagePath, items]) => {
    const uniqueCodes = [
      ...new Set(
        items
          .map((item) =>
            item.productCode
          )
          .filter(Boolean)
      ),
    ];

    return {
      imagePath,
      items,
      uniqueCodes,
    };
  })
  .filter(
    (group) =>
      group.uniqueCodes.length >= 2
  )
  .sort(
    (a, b) =>
      b.uniqueCodes.length -
      a.uniqueCodes.length
  );

/*
 * 图片内容复用：
 * 即使路径不同，只要 SHA256 相同，也归入同图组。
 */
const hashGroups = groupBy(
  auditRows.filter(
    (item) =>
      item.exists &&
      item.hash
  ),
  (item) => item.hash
);

const sharedHashGroups = [
  ...hashGroups.entries(),
]
  .map(([hash, items]) => {
    const uniqueCodes = [
      ...new Set(
        items
          .map((item) =>
            item.productCode
          )
          .filter(Boolean)
      ),
    ];

    const uniquePaths = [
      ...new Set(
        items
          .map((item) =>
            item.imagePath
          )
          .filter(Boolean)
      ),
    ];

    return {
      hash,
      items,
      uniqueCodes,
      uniquePaths,
    };
  })
  .filter(
    (group) =>
      group.uniqueCodes.length >= 2
  )
  .sort(
    (a, b) =>
      b.uniqueCodes.length -
      a.uniqueCodes.length
  );

const sharedPathCodeReasons =
  new Map();

for (const group of sharedPathGroups) {
  for (const item of group.items) {
    if (!item.productCode) {
      continue;
    }

    if (
      !sharedPathCodeReasons.has(
        item.productCode
      )
    ) {
      sharedPathCodeReasons.set(
        item.productCode,
        []
      );
    }

    sharedPathCodeReasons
      .get(item.productCode)
      .push(
        `同一路径被 ${group.uniqueCodes.length} 个商品编码复用`
      );
  }
}

const sharedHashCodeReasons =
  new Map();

for (const group of sharedHashGroups) {
  for (const item of group.items) {
    if (!item.productCode) {
      continue;
    }

    if (
      !sharedHashCodeReasons.has(
        item.productCode
      )
    ) {
      sharedHashCodeReasons.set(
        item.productCode,
        []
      );
    }

    sharedHashCodeReasons
      .get(item.productCode)
      .push(
        `相同图片内容被 ${group.uniqueCodes.length} 个商品编码复用`
      );
  }
}

for (const item of auditRows) {
  item.sharedPathReasons =
    sharedPathCodeReasons.get(
      item.productCode
    ) || [];

  item.sharedHashReasons =
    sharedHashCodeReasons.get(
      item.productCode
    ) || [];

  item.allReasons = [
    ...item.directReasons,
    ...item.sharedPathReasons,
    ...item.sharedHashReasons,
  ];
}

const directInvalidRows =
  auditRows.filter(
    (item) =>
      item.directReasons.length > 0
  );

const sharedImageRows =
  auditRows.filter(
    (item) =>
      item.sharedPathReasons.length > 0 ||
      item.sharedHashReasons.length > 0
  );

const proposedRemovalRows =
  auditRows.filter(
    (item) =>
      item.allReasons.length > 0
  );

const keepCandidateRows =
  auditRows.filter(
    (item) =>
      item.allReasons.length === 0
  );

const allCodeSet = new Set(
  allProducts
    .map((item) =>
      normalizeCode(item.productCode)
    )
    .filter(Boolean)
);

const compatibleCodeSet = new Set(
  compatibleProducts
    .map((item) =>
      normalizeCode(item.productCode)
    )
    .filter(Boolean)
);

const onlyInAllProducts = [
  ...allCodeSet,
]
  .filter(
    (code) =>
      !compatibleCodeSet.has(code)
  )
  .sort();

const onlyInCompatible = [
  ...compatibleCodeSet,
]
  .filter(
    (code) =>
      !allCodeSet.has(code)
  )
  .sort();

const codeDiffRows = [
  ...onlyInAllProducts.map(
    (code) => ({
      商品编码: code,
      差异:
        "仅存在于 all-compatible-products.generated.ts",
    })
  ),
  ...onlyInCompatible.map(
    (code) => ({
      商品编码: code,
      差异:
        "仅存在于 compatible-models.generated.ts",
    })
  ),
];

const duplicateCodeRows = [
  ...duplicateCodes(allProducts).map(
    (item) => ({
      数据文件:
        "all-compatible-products.generated.ts",
      ...item,
    })
  ),
  ...duplicateCodes(
    compatibleProducts
  ).map((item) => ({
    数据文件:
      "compatible-models.generated.ts",
    ...item,
  })),
];

const stamp = createStamp();

const reportDirectory = path.join(
  root,
  "audit-reports",
  "fitting-replacement-main-image-audit",
  stamp
);

ensureDirectory(
  reportDirectory
);

const allHeaders = [
  "商品编码",
  "FOREACH型号",
  "产品类型",
  "产品系列",
  "图片路径",
  "本地文件",
  "文件存在",
  "文件大小",
  "图片SHA256",
  "图片分类",
  "直接异常",
  "同路径复用",
  "同内容复用",
  "全部原因",
  "首页显示",
  "详情地址",
];

function mapAuditRow(item) {
  return {
    商品编码: item.productCode,
    FOREACH型号:
      item.foreachModel,
    产品类型:
      item.productType,
    产品系列:
      item.productSeries,
    图片路径:
      item.imagePath,
    本地文件:
      item.localPath,
    文件存在:
      item.exists ? "是" : "否",
    文件大小:
      item.fileSize,
    图片SHA256:
      item.hash,
    图片分类:
      item.imageKind,
    直接异常:
      item.directReasons.join(
        "；"
      ),
    同路径复用:
      item.sharedPathReasons.join(
        "；"
      ),
    同内容复用:
      item.sharedHashReasons.join(
        "；"
      ),
    全部原因:
      item.allReasons.join(
        "；"
      ),
    首页显示:
      item.showOnHome,
    详情地址:
      item.detailHref,
  };
}

writeCsv(
  path.join(
    reportDirectory,
    "01_全部兼容查询产品图片审查.csv"
  ),
  allHeaders,
  auditRows.map(mapAuditRow)
);

writeCsv(
  path.join(
    reportDirectory,
    "02_空图占位图或文件缺失.csv"
  ),
  allHeaders,
  directInvalidRows.map(mapAuditRow)
);

const sharedPathRows =
  sharedPathGroups.flatMap(
    (group, groupIndex) =>
      group.items.map((item) => ({
        组号:
          groupIndex + 1,
        复用商品数:
          group.uniqueCodes.length,
        图片路径:
          group.imagePath,
        商品编码:
          item.productCode,
        FOREACH型号:
          item.foreachModel,
        产品类型:
          item.productType,
        产品系列:
          item.productSeries,
        是否占位图:
          item.imageKind === "占位图"
            ? "是"
            : "否",
        文件存在:
          item.exists ? "是" : "否",
      }))
  );

writeCsv(
  path.join(
    reportDirectory,
    "03_同一图片路径复用组.csv"
  ),
  [
    "组号",
    "复用商品数",
    "图片路径",
    "商品编码",
    "FOREACH型号",
    "产品类型",
    "产品系列",
    "是否占位图",
    "文件存在",
  ],
  sharedPathRows
);

const sharedHashRows =
  sharedHashGroups.flatMap(
    (group, groupIndex) =>
      group.items.map((item) => ({
        组号:
          groupIndex + 1,
        复用商品数:
          group.uniqueCodes.length,
        不同路径数:
          group.uniquePaths.length,
        图片SHA256:
          group.hash,
        图片路径:
          item.imagePath,
        商品编码:
          item.productCode,
        FOREACH型号:
          item.foreachModel,
        产品类型:
          item.productType,
        产品系列:
          item.productSeries,
      }))
  );

writeCsv(
  path.join(
    reportDirectory,
    "04_相同图片文件内容复用组.csv"
  ),
  [
    "组号",
    "复用商品数",
    "不同路径数",
    "图片SHA256",
    "图片路径",
    "商品编码",
    "FOREACH型号",
    "产品类型",
    "产品系列",
  ],
  sharedHashRows
);

writeCsv(
  path.join(
    reportDirectory,
    "05_建议删除商品编码清单.csv"
  ),
  [
    "商品编码",
    "FOREACH型号",
    "产品类型",
    "产品系列",
    "图片路径",
    "建议删除原因",
  ],
  proposedRemovalRows.map(
    (item) => ({
      商品编码:
        item.productCode,
      FOREACH型号:
        item.foreachModel,
      产品类型:
        item.productType,
      产品系列:
        item.productSeries,
      图片路径:
        item.imagePath,
      建议删除原因:
        item.allReasons.join("；"),
    })
  )
);

writeCsv(
  path.join(
    reportDirectory,
    "06_可保留候选清单.csv"
  ),
  [
    "商品编码",
    "FOREACH型号",
    "产品类型",
    "产品系列",
    "图片路径",
    "图片SHA256",
  ],
  keepCandidateRows.map(
    (item) => ({
      商品编码:
        item.productCode,
      FOREACH型号:
        item.foreachModel,
      产品类型:
        item.productType,
      产品系列:
        item.productSeries,
      图片路径:
        item.imagePath,
      图片SHA256:
        item.hash,
    })
  )
);

writeCsv(
  path.join(
    reportDirectory,
    "07_两份数据商品编码差异.csv"
  ),
  [
    "商品编码",
    "差异",
  ],
  codeDiffRows
);

writeCsv(
  path.join(
    reportDirectory,
    "08_重复商品编码.csv"
  ),
  [
    "数据文件",
    "商品编码",
    "型号",
    "产品类型",
    "产品系列",
    "重复次数",
  ],
  duplicateCodeRows
);

const summaryLines = [
  "# 接头兼容型号查询主图审查",
  "",
  `- 审查时间：${new Date().toISOString()}`,
  `- 首页产品记录：${allProducts.length}`,
  `- 首页唯一商品编码：${allCodeSet.size}`,
  `- 完整兼容数据记录：${compatibleProducts.length}`,
  `- 完整兼容数据唯一商品编码：${compatibleCodeSet.size}`,
  "",
  "## 图片结果",
  "",
  `- 空图、占位图、文件缺失或外部图片：${directInvalidRows.length}`,
  `- 涉及同一路径复用的商品：${sharedImageRows.filter((item) => item.sharedPathReasons.length > 0).length}`,
  `- 同一路径复用组：${sharedPathGroups.length}`,
  `- 相同文件内容复用组：${sharedHashGroups.length}`,
  `- 建议删除商品编码：${proposedRemovalRows.length}`,
  `- 可保留候选：${keepCandidateRows.length}`,
  "",
  "## 数据一致性",
  "",
  `- 仅存在于首页产品数据：${onlyInAllProducts.length}`,
  `- 仅存在于完整兼容数据：${onlyInCompatible.length}`,
  `- 重复商品编码记录：${duplicateCodeRows.length}`,
  "",
  "## 删除规则说明",
  "",
  "建议删除清单当前取以下条件的并集：",
  "",
  "1. 图片路径为空；",
  "2. Logo、placeholder、default、no-image 等占位图；",
  "3. public 中图片文件不存在；",
  "4. 多个商品编码复用同一图片路径；",
  "5. 图片路径不同，但文件 SHA256 完全相同。",
  "",
  "本次仅生成审查报告，没有修改或删除任何官网数据。",
  "",
];

fs.writeFileSync(
  path.join(
    reportDirectory,
    "00_审查摘要.md"
  ),
  summaryLines.join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(
    reportDirectory,
    "09_审查原始数据.json"
  ),
  JSON.stringify(
    {
      generatedAt:
        new Date().toISOString(),
      sourceFiles: [
        relative(allProductsPath),
        relative(
          compatibleModelsPath
        ),
      ],
      summary: {
        allProducts:
          allProducts.length,
        compatibleProducts:
          compatibleProducts.length,
        directInvalid:
          directInvalidRows.length,
        sharedPathGroups:
          sharedPathGroups.length,
        sharedHashGroups:
          sharedHashGroups.length,
        proposedRemoval:
          proposedRemovalRows.length,
        keepCandidates:
          keepCandidateRows.length,
        onlyInAllProducts:
          onlyInAllProducts.length,
        onlyInCompatible:
          onlyInCompatible.length,
        duplicateCodeRows:
          duplicateCodeRows.length,
      },
      proposedRemovalCodes:
        proposedRemovalRows.map(
          (item) =>
            item.productCode
        ),
    },
    null,
    2
  ),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "接头兼容型号查询主图审查完成"
);
console.log(
  "============================================"
);
console.log(
  `首页产品记录：${allProducts.length}`
);
console.log(
  `空图/占位图/文件缺失：${directInvalidRows.length}`
);
console.log(
  `同一路径复用组：${sharedPathGroups.length}`
);
console.log(
  `相同图片内容复用组：${sharedHashGroups.length}`
);
console.log(
  `建议删除商品编码：${proposedRemovalRows.length}`
);
console.log(
  `可保留候选：${keepCandidateRows.length}`
);
console.log(
  `报告目录：${relative(reportDirectory)}`
);
console.log("");
console.log(
  "本次只审查，没有修改任何数据文件。"
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '开始审查接头兼容型号查询主图……' -ForegroundColor Cyan
Write-Host '本次只生成报告，不删除任何商品。' -ForegroundColor Yellow
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
    throw "接头兼容型号查询主图审查失败，请把完整错误发来。"
}

$latestReport = Get-ChildItem `
    -LiteralPath (Join-Path $projectRoot 'audit-reports\fitting-replacement-main-image-audit') `
    -Directory |
    Sort-Object Name -Descending |
    Select-Object -First 1

if ($null -ne $latestReport) {
    Write-Host ''
    Write-Host "审查报告：$($latestReport.FullName)" -ForegroundColor Green
    Write-Host ''
    explorer.exe $latestReport.FullName
}
