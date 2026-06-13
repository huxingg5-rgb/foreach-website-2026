param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$detailClientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$detailCssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$globalsPath = Join-Path $projectRoot "app\globals.css"

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "product-responsive-v5-$timestamp.cjs"
$metadataPath = Join-Path $env:TEMP "product-responsive-v5-$timestamp.json"
$reportPath = Join-Path $projectRoot "components\products\detail\product-responsive-v5-report.txt"

foreach ($filePath in @(
  $detailClientPath,
  $detailCssPath,
  $globalsPath
)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

# Collect likely product-only breadcrumb files for backup.
$breadcrumbCandidateFiles = @(
  Get-ChildItem `
    -Path (Join-Path $projectRoot "components\products"), (Join-Path $projectRoot "app\products") `
    -Recurse `
    -File `
    -Filter "*.tsx" `
    -ErrorAction SilentlyContinue |
  Where-Object {
    Select-String `
      -LiteralPath $_.FullName `
      -Pattern "Breadcrumb|breadcrumb|首页|产品中心|SitePageShell" `
      -Quiet
  } |
  Select-Object -ExpandProperty FullName
)

$filesToBackup = @(
  $detailClientPath,
  $detailCssPath,
  $globalsPath
) + $breadcrumbCandidateFiles

$backupMap = @{}

foreach ($filePath in ($filesToBackup | Select-Object -Unique)) {
  $backupPath = "$filePath.$timestamp.bak"
  Copy-Item -LiteralPath $filePath -Destination $backupPath -Force
  $backupMap[$filePath] = $backupPath
  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
}

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const detailClientPath = process.argv[3];
const metadataPath = process.argv[4];
const reportPath = process.argv[5];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  const result = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      result.push(...walk(fullPath));
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

function createContext(filePath, providedText = null) {
  const text =
    providedText === null
      ? fs.readFileSync(filePath, "utf8")
      : providedText;

  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  function isJsx(node) {
    return ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node);
  }

  function opening(node) {
    return ts.isJsxElement(node) ? node.openingElement : node;
  }

  function tagName(node) {
    if (ts.isJsxElement(node)) {
      return node.openingElement.tagName.getText(sourceFile);
    }

    if (ts.isJsxSelfClosingElement(node)) {
      return node.tagName.getText(sourceFile);
    }

    return "";
  }

  function attributes(node) {
    return opening(node).attributes.properties;
  }

  function attribute(node, name) {
    for (const item of attributes(node)) {
      if (!ts.isJsxAttribute(item)) continue;
      if (item.name.getText(sourceFile) !== name) continue;

      return item.initializer
        ? item.initializer.getText(sourceFile)
        : "true";
    }

    return "";
  }

  function className(node) {
    return attribute(node, "className");
  }

  function localClassTokens(node) {
    const matches = className(node).match(/styles\.([A-Za-z0-9_]+)/g) || [];

    return matches.map((value) => value.replace("styles.", ""));
  }

  function hasClass(node, classToken) {
    return localClassTokens(node).includes(classToken);
  }

  function ancestors(node) {
    const result = [];
    let current = node.parent;

    while (current) {
      if (isJsx(current)) result.push(current);
      current = current.parent;
    }

    return result;
  }

  function descendantOf(node, ancestor) {
    let current = node.parent;

    while (current) {
      if (current === ancestor) return true;
      current = current.parent;
    }

    return false;
  }

  function line(node) {
    return (
      sourceFile.getLineAndCharacterOfPosition(
        node.getStart(sourceFile),
      ).line + 1
    );
  }

  const nodes = [];

  function visit(node) {
    if (isJsx(node)) nodes.push(node);
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return {
    filePath,
    text,
    sourceFile,
    isJsx,
    opening,
    tagName,
    attribute,
    className,
    localClassTokens,
    hasClass,
    ancestors,
    descendantOf,
    line,
    nodes,
  };
}

function chooseSmallest(nodes, sourceFile) {
  if (!nodes.length) return null;

  return [...nodes].sort(
    (left, right) =>
      left.getText(sourceFile).length -
      right.getText(sourceFile).length,
  )[0];
}

function commonAncestors(context, firstNode, secondNode) {
  const secondSet = new Set(context.ancestors(secondNode));

  return context
    .ancestors(firstNode)
    .filter((node) => secondSet.has(node));
}

function addAttributes(context, targets, log) {
  const edits = [];

  for (const { node, name } of targets) {
    if (!node) {
      log.push(`WARNING: target missing for ${name}`);
      continue;
    }

    if (context.attribute(node, name)) {
      log.push(
        `${name}: already present in ${path.relative(
          projectRoot,
          context.filePath,
        )}`,
      );
      continue;
    }

    edits.push({
      position: context.opening(node).tagName.end,
      insertion: ` ${name}="true"`,
    });

    log.push(
      `${name}: <${context.tagName(node)}> in ${path.relative(
        projectRoot,
        context.filePath,
      )} line ${context.line(node)}`,
    );
  }

  let updatedText = context.text;

  edits
    .sort((left, right) => right.position - left.position)
    .forEach(({ position, insertion }) => {
      updatedText =
        updatedText.slice(0, position) +
        insertion +
        updatedText.slice(position);
    });

  return updatedText;
}

function hasMarkedAncestor(context, node) {
  return context.ancestors(node).some(
    (ancestor) =>
      context.attribute(
        ancestor,
        "data-product-breadcrumb-shell",
      ),
  );
}

function markBreadcrumbInFile(filePath, log) {
  let text = fs.readFileSync(filePath, "utf8");
  let context = createContext(filePath, text);

  const candidates = context.nodes.filter((node) => {
    const tag = context.tagName(node);
    const className = context.className(node);
    const nodeText = node.getText(context.sourceFile);

    return (
      /Breadcrumb/i.test(tag) ||
      /breadcrumb/i.test(className) ||
      (
        nodeText.includes("首页") &&
        nodeText.includes("产品中心") &&
        nodeText.length < 5000
      ) ||
      (
        /SitePageShell/i.test(tag) &&
        /breadcrumb/i.test(nodeText)
      )
    );
  });

  if (!candidates.length) return false;

  const candidate = chooseSmallest(
    candidates,
    context.sourceFile,
  );

  if (hasMarkedAncestor(context, candidate)) {
    log.push(
      `breadcrumb: already marked in ${path.relative(
        projectRoot,
        filePath,
      )}`,
    );
    return true;
  }

  const ordinaryParent = context
    .ancestors(candidate)
    .find((node) => {
      const tag = context.tagName(node);

      return (
        /^[a-z]/.test(tag) &&
        node.getText(context.sourceFile).length < 6000
      );
    });

  if (ordinaryParent) {
    text = addAttributes(
      context,
      [
        {
          node: ordinaryParent,
          name: "data-product-breadcrumb-shell",
        },
      ],
      log,
    );

    fs.writeFileSync(filePath, text, "utf8");
    return true;
  }

  const start = candidate.getStart(context.sourceFile);
  const end = candidate.getEnd();
  const original = context.text.slice(start, end);

  text =
    context.text.slice(0, start) +
    `<div data-product-breadcrumb-shell="true">\n` +
    original +
    `\n</div>` +
    context.text.slice(end);

  fs.writeFileSync(filePath, text, "utf8");

  log.push(
    `breadcrumb: wrapper added in ${path.relative(
      projectRoot,
      filePath,
    )} line ${context.line(candidate)}`,
  );

  return true;
}

const log = [];
const warnings = [];

/* =========================================================
   Detail page structure
========================================================= */

const detail = createContext(detailClientPath);

const thumbRow = detail.nodes.find((node) =>
  detail.hasClass(node, "thumbRow"),
);

if (!thumbRow) {
  throw new Error("styles.thumbRow was not found.");
}

const imageNodes = detail.nodes.filter((node) => {
  const tag = detail.tagName(node);
  return tag === "Image" || tag === "img";
});

let gallery = null;
let mainImage = null;

for (const ancestor of detail.ancestors(thumbRow)) {
  const candidates = imageNodes.filter(
    (imageNode) =>
      detail.descendantOf(imageNode, ancestor) &&
      !detail.descendantOf(imageNode, thumbRow) &&
      imageNode.getStart(detail.sourceFile) <
        thumbRow.getStart(detail.sourceFile),
  );

  if (candidates.length) {
    gallery = ancestor;
    mainImage = candidates.sort(
      (left, right) =>
        right.getStart(detail.sourceFile) -
        left.getStart(detail.sourceFile),
    )[0];
    break;
  }
}

if (!gallery || !mainImage) {
  throw new Error(
    "The main gallery or main product image was not found.",
  );
}

let mainStage = null;

for (const ancestor of detail.ancestors(mainImage)) {
  if (ancestor === gallery) break;

  if (/^[a-z]/.test(detail.tagName(ancestor))) {
    mainStage = ancestor;

    if (
      /main|stage|preview|image|zoom|visual/i.test(
        detail.className(ancestor),
      )
    ) {
      break;
    }
  }
}

if (!mainStage) mainStage = mainImage;

const modelRow = chooseSmallest(
  detail.nodes.filter((node) => {
    const text = node.getText(detail.sourceFile);

    return (
      text.includes("型号") &&
      text.includes("配置选择") &&
      text.length < 3200
    );
  }),
  detail.sourceFile,
);

const actionLabels = [
  "添加规格书",
  "添加图纸",
  "申请3D文件",
  "加入清单",
];

const actionGrid = chooseSmallest(
  detail.nodes.filter((node) => {
    const text = node.getText(detail.sourceFile);

    return (
      actionLabels.every((label) => text.includes(label)) &&
      text.length < 6500
    );
  }),
  detail.sourceFile,
);

let specRow = detail.nodes.find((node) =>
  /styles\.(specRow|specItem|specTableRow)\b/.test(
    detail.className(node),
  ),
);

if (!specRow) {
  specRow = chooseSmallest(
    detail.nodes.filter((node) => {
      const text = node.getText(detail.sourceFile);

      return (
        (
          /\bspec\.(label|name)\b/.test(text) &&
          /\bspec\.value\b/.test(text)
        ) ||
        (
          /\bitem\.(label|name)\b/.test(text) &&
          /\bitem\.value\b/.test(text)
        )
      ) && text.length < 3000;
    }),
    detail.sourceFile,
  );
}

if (!modelRow) {
  warnings.push("Model/configuration row marker not found.");
}

if (!actionGrid) {
  warnings.push("Four-button action container marker not found.");
}

if (!specRow) {
  warnings.push("Specification row marker not found.");
}

/*
 * Find a local CSS-module class that contains the whole detail section.
 * Every attribute selector in product-detail.module.css will be prefixed
 * with this class so CSS Modules accepts it as a pure selector.
 */
const commonRootCandidates =
  specRow
    ? commonAncestors(detail, gallery, specRow)
    : detail.ancestors(gallery);

let rootClass = "";

for (const candidate of commonRootCandidates) {
  const tokens = detail.localClassTokens(candidate);

  if (tokens.length) {
    rootClass = tokens[0];
    break;
  }
}

if (!rootClass) {
  /*
   * Fall back to the closest local-class ancestor of the gallery.
   */
  for (const candidate of [
    gallery,
    ...detail.ancestors(gallery),
  ]) {
    const tokens = detail.localClassTokens(candidate);

    if (tokens.length) {
      rootClass = tokens[0];
      break;
    }
  }
}

if (!rootClass) {
  throw new Error(
    "Could not determine a local CSS-module root class for the detail page.",
  );
}

const updatedDetailText = addAttributes(
  detail,
  [
    { node: gallery, name: "data-product-gallery" },
    { node: mainStage, name: "data-product-main-stage" },
    { node: mainImage, name: "data-product-main-image" },
    { node: thumbRow, name: "data-product-thumb-row" },
    { node: modelRow, name: "data-product-model-row" },
    { node: actionGrid, name: "data-product-action-grid" },
    { node: specRow, name: "data-product-spec-row" },
  ],
  log,
);

fs.writeFileSync(
  detailClientPath,
  updatedDetailText,
  "utf8",
);

/* =========================================================
   Product-center/detail breadcrumbs
========================================================= */

const productDirectories = [
  path.join(projectRoot, "components", "products"),
  path.join(projectRoot, "app", "products"),
];

const productFiles = productDirectories
  .flatMap((directory) => walk(directory))
  .filter((filePath) => filePath.endsWith(".tsx"));

let breadcrumbCount = 0;
const breadcrumbFiles = [];

for (const filePath of productFiles) {
  const source = fs.readFileSync(filePath, "utf8");

  if (
    !/Breadcrumb|breadcrumb|首页|产品中心|SitePageShell/i.test(
      source,
    )
  ) {
    continue;
  }

  if (markBreadcrumbInFile(filePath, log)) {
    breadcrumbCount += 1;
    breadcrumbFiles.push(filePath);
  }
}

if (breadcrumbCount === 0) {
  warnings.push(
    "No breadcrumb JSX wrapper was found. Main responsive layout will still be applied.",
  );
}

const report = [
  "Product responsive V5",
  "=====================",
  "",
  `Detected local CSS root class: .${rootClass}`,
  `Breadcrumb files marked: ${breadcrumbCount}`,
  "",
  ...log,
  "",
  "Warnings:",
  ...(warnings.length ? warnings : ["None"]),
];

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8",
);

fs.writeFileSync(
  metadataPath,
  JSON.stringify(
    {
      rootClass,
      breadcrumbCount,
      breadcrumbFiles,
      warnings,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(report.join("\n"));
'@

$encoding = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
  $workerPath,
  $workerContent,
  $encoding
)

function Remove-MarkedBlock {
  param(
    [string]$Text,
    [string]$StartMarker,
    [string]$EndMarker
  )

  $pattern =
    [Regex]::Escape($StartMarker) +
    '(?s).*?' +
    [Regex]::Escape($EndMarker)

  return [regex]::Replace($Text, $pattern, "")
}

try {
  Write-Host ""
  Write-Host "Detecting local CSS scope and real product structure..." -ForegroundColor Cyan

  & node `
    $workerPath `
    $projectRoot `
    $detailClientPath `
    $metadataPath `
    $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "V5 structure detection failed."
  }

  if (-not (Test-Path -LiteralPath $metadataPath)) {
    throw "V5 metadata file was not created."
  }

  $metadata = Get-Content `
    -LiteralPath $metadataPath `
    -Raw `
    -Encoding UTF8 |
    ConvertFrom-Json

  $rootClass = [string]$metadata.rootClass

  if ([string]::IsNullOrWhiteSpace($rootClass)) {
    throw "Detected local CSS root class is empty."
  }

  Write-Host ""
  Write-Host "Detected local detail root class: .$rootClass" -ForegroundColor Green
  Write-Host "Breadcrumb files marked: $($metadata.breadcrumbCount)" -ForegroundColor Cyan

  # =======================================================
  # CSS module: every data selector is scoped under a local class.
  # =======================================================

  $detailCss = Get-Content `
    -LiteralPath $detailCssPath `
    -Raw `
    -Encoding UTF8

  foreach ($markers in @(
    @(
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_START */",
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_END */"
    ),
    @(
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V2_START */",
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V2_END */"
    ),
    @(
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V3_START */",
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V3_END */"
    ),
    @(
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V4_START */",
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V4_END */"
    ),
    @(
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V5_START */",
      "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V5_END */"
    )
  )) {
    $detailCss = Remove-MarkedBlock `
      -Text $detailCss `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $scope = ".$rootClass"

  $detailCssBlock = @"

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V5_START */
/* =========================================================
   产品详情页主图与响应式布局 V5

   CSS Modules 本地作用域：$scope
========================================================= */

/* 主图预览固定 1:1 */
$scope [data-product-gallery="true"] {
  width: 100%;
  min-width: 0;
}

$scope [data-product-main-stage="true"] {
  position: relative !important;
  display: flex !important;
  width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  aspect-ratio: 1 / 1 !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  margin-right: auto !important;
  margin-left: auto !important;
  box-sizing: border-box;
}

$scope [data-product-main-image="true"] {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  margin: auto !important;
  object-fit: contain !important;
  object-position: center center !important;
}

/* 缩略图之间不留空白 */
$scope [data-product-thumb-row="true"],
$scope .thumbRow {
  gap: 0 !important;
  column-gap: 0 !important;
  row-gap: 0 !important;
}

$scope [data-product-thumb-row="true"] > .thumb,
$scope .thumbRow > .thumb {
  margin: 0 !important;
}

@media (max-width: 1080px) {
  $scope .productTop {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    align-items: start !important;
    gap: 34px !important;
  }

  $scope [data-product-gallery="true"] {
    width: min(100%, 720px) !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  $scope .productInfo {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* 型号与配置选择保持同一行 */
  $scope [data-product-model-row="true"],
  $scope .modelRow,
  $scope .modelLine {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  $scope [data-product-model-row="true"] > *,
  $scope .modelRow > *,
  $scope .modelLine > * {
    min-width: 0;
  }

  $scope [data-product-model-row="true"] button,
  $scope .modelRow button,
  $scope .modelLine button {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }

  /* 四个按钮两个一排 */
  $scope [data-product-action-grid="true"],
  $scope .actionRow,
  $scope .actionGrid {
    display: grid !important;
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
    width: 100% !important;
  }

  $scope [data-product-action-grid="true"] > *,
  $scope .actionRow > *,
  $scope .actionGrid > * {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* 规格名称与参数值保持同一行 */
  $scope [data-product-spec-row="true"],
  $scope .specRow,
  $scope .specItem,
  $scope .specTableRow {
    display: grid !important;
    grid-template-columns:
      minmax(112px, 34%)
      minmax(0, 1fr) !important;
    align-items: center !important;
  }

  $scope [data-product-spec-row="true"] > *,
  $scope .specRow > *,
  $scope .specItem > *,
  $scope .specTableRow > * {
    min-width: 0 !important;
    margin: 0 !important;
  }
}

@media (max-width: 680px) {
  /* 手机端主图居中 */
  $scope [data-product-gallery="true"],
  $scope [data-product-main-stage="true"] {
    width: 100% !important;
    max-width: 100% !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  $scope [data-product-main-image="true"] {
    margin-right: auto !important;
    margin-left: auto !important;
    object-position: center center !important;
  }

  $scope [data-product-model-row="true"],
  $scope .modelRow,
  $scope .modelLine {
    gap: 8px !important;
    font-size: 18px !important;
  }

  $scope [data-product-model-row="true"] button,
  $scope .modelRow button,
  $scope .modelLine button {
    min-height: 42px;
    padding-right: 12px !important;
    padding-left: 12px !important;
  }

  $scope [data-product-action-grid="true"],
  $scope .actionRow,
  $scope .actionGrid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }

  $scope [data-product-spec-row="true"],
  $scope .specRow,
  $scope .specItem,
  $scope .specTableRow {
    grid-template-columns:
      minmax(108px, 36%)
      minmax(0, 1fr) !important;
  }

  $scope [data-product-spec-row="true"] > *,
  $scope .specRow > *,
  $scope .specItem > *,
  $scope .specTableRow > * {
    white-space: normal !important;
    word-break: break-word;
  }
}

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V5_END */
"@

  $detailCss =
    $detailCss.TrimEnd() +
    "`r`n`r`n" +
    $detailCssBlock +
    "`r`n"

  [System.IO.File]::WriteAllText(
    $detailCssPath,
    $detailCss,
    $encoding
  )

  # =======================================================
  # Global breadcrumb spacing: no CSS Modules purity issue.
  # =======================================================

  $globalsCss = Get-Content `
    -LiteralPath $globalsPath `
    -Raw `
    -Encoding UTF8

  $globalStart = "/* PRODUCT_LOCAL_BREADCRUMB_SPACING_START */"
  $globalEnd = "/* PRODUCT_LOCAL_BREADCRUMB_SPACING_END */"

  $globalsCss = Remove-MarkedBlock `
    -Text $globalsCss `
    -StartMarker $globalStart `
    -EndMarker $globalEnd

  $globalBlock = @'

/* PRODUCT_LOCAL_BREADCRUMB_SPACING_START */
/*
 * 只作用于产品中心和产品详情页中，
 * 由 V5 自动找到并标记的面包屑外层。
 */
[data-product-breadcrumb-shell="true"] {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 18px !important;
}

@media (max-width: 680px) {
  [data-product-breadcrumb-shell="true"] {
    margin-top: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 18px !important;
  }
}
/* PRODUCT_LOCAL_BREADCRUMB_SPACING_END */
'@

  $globalsCss =
    $globalsCss.TrimEnd() +
    "`r`n`r`n" +
    $globalBlock +
    "`r`n"

  [System.IO.File]::WriteAllText(
    $globalsPath,
    $globalsCss,
    $encoding
  )

  $nextPath = Join-Path $projectRoot ".next"

  if (Test-Path -LiteralPath $nextPath) {
    Remove-Item -LiteralPath $nextPath -Recurse -Force
    Write-Host "Removed stale .next cache." -ForegroundColor Yellow
  }

  if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Cyan

    & npm run build

    if ($LASTEXITCODE -ne 0) {
      Write-Host ""
      Write-Host "Build failed. Restoring every backed-up file..." -ForegroundColor Yellow

      foreach ($filePath in $backupMap.Keys) {
        Copy-Item `
          -LiteralPath $backupMap[$filePath] `
          -Destination $filePath `
          -Force
      }

      throw "V5 build failed. All changed files were restored."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Completed:" -ForegroundColor Green
  Write-Host " - CSS-module selectors are scoped under .$rootClass"
  Write-Host " - Main preview is 1:1"
  Write-Host " - Thumbnail gaps are removed"
  Write-Host " - Under 1080px the layout stacks"
  Write-Host " - Model and configuration remain one row"
  Write-Host " - Four actions use two columns"
  Write-Host " - Mobile main image is centered"
  Write-Host " - Specification rows remain label/value columns"
  Write-Host " - Product breadcrumb bottom spacing is 18px"
}
finally {
  foreach ($temporaryPath in @($workerPath, $metadataPath)) {
    if (Test-Path -LiteralPath $temporaryPath) {
      Remove-Item -LiteralPath $temporaryPath -Force
    }
  }
}
