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
$workerPath = Join-Path $env:TEMP "product-responsive-v4-$timestamp.cjs"
$reportPath = Join-Path $projectRoot "components\products\detail\product-responsive-v4-report.txt"

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

$breadcrumbFiles = @(
  Get-ChildItem `
    -Path (Join-Path $projectRoot "components\products") `
    -Recurse `
    -File `
    -Filter "*.tsx" |
  Where-Object {
    $_.FullName -match "\\components\\products\\(detail|selection)\\" -and
    (Select-String `
      -LiteralPath $_.FullName `
      -Pattern "Breadcrumb" `
      -Quiet)
  } |
  Select-Object -ExpandProperty FullName
)

$filesToBackup = @(
  $detailClientPath,
  $detailCssPath,
  $globalsPath
) + $breadcrumbFiles

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
const reportPath = process.argv[4];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

function walk(dir) {
  const result = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...walk(fullPath));
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

function createContext(filePath, sourceText = null) {
  const text =
    sourceText === null
      ? fs.readFileSync(filePath, "utf8")
      : sourceText;

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

  function hasClass(node, name) {
    return new RegExp(`styles\\.${name}\\b`).test(className(node));
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

function addAttributes(context, targets, log) {
  const edits = [];

  for (const { node, name } of targets) {
    if (!node) {
      log.push(`WARNING: target not found for ${name}`);
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
      text: ` ${name}="true"`,
    });

    log.push(
      `${name}: <${context.tagName(node)}> in ${path.relative(
        projectRoot,
        context.filePath,
      )} line ${context.line(node)}`,
    );
  }

  let updated = context.text;

  edits
    .sort((a, b) => b.position - a.position)
    .forEach(({ position, text }) => {
      updated =
        updated.slice(0, position) +
        text +
        updated.slice(position);
    });

  return updated;
}

function markBreadcrumbFile(filePath, log) {
  let text = fs.readFileSync(filePath, "utf8");
  let context = createContext(filePath, text);

  const breadcrumbs = context.nodes.filter((node) =>
    /Breadcrumb/i.test(context.tagName(node)),
  );

  if (!breadcrumbs.length) return false;

  for (const breadcrumb of breadcrumbs) {
    const ordinaryParent = context
      .ancestors(breadcrumb)
      .find((node) => {
        const tag = context.tagName(node);

        return (
          /^[a-z]/.test(tag) &&
          node.getText(context.sourceFile).length < 5000
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
      context = createContext(filePath);
      continue;
    }

    const start = breadcrumb.getStart(context.sourceFile);
    const end = breadcrumb.getEnd();
    const original = context.text.slice(start, end);

    text =
      context.text.slice(0, start) +
      `<div data-product-breadcrumb-shell="true">\n` +
      original +
      `\n</div>` +
      context.text.slice(end);

    fs.writeFileSync(filePath, text, "utf8");

    log.push(
      `data-product-breadcrumb-shell: wrapper added in ${path.relative(
        projectRoot,
        filePath,
      )} line ${context.line(breadcrumb)}`,
    );

    context = createContext(filePath);
  }

  return true;
}

const log = [];
const warnings = [];

/* =========================================================
   Locate every product-only breadcrumb
========================================================= */

const productsRoot = path.join(
  projectRoot,
  "components",
  "products",
);

const productTsxFiles = walk(productsRoot).filter(
  (filePath) =>
    filePath.endsWith(".tsx") &&
    (
      filePath.includes(`${path.sep}detail${path.sep}`) ||
      filePath.includes(`${path.sep}selection${path.sep}`)
    ),
);

let breadcrumbFileCount = 0;

for (const filePath of productTsxFiles) {
  const source = fs.readFileSync(filePath, "utf8");

  if (!/Breadcrumb/i.test(source)) continue;

  if (markBreadcrumbFile(filePath, log)) {
    breadcrumbFileCount += 1;
  }
}

if (breadcrumbFileCount === 0) {
  warnings.push(
    "No product detail/selection breadcrumb component was found. " +
    "Responsive detail styles will still be applied.",
  );
}

/* =========================================================
   Product detail structure
========================================================= */

let detail = createContext(detailClientPath);

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
      text.length < 3000
    );
  }),
  detail.sourceFile,
);

if (!modelRow) {
  warnings.push(
    "Model/configuration row marker was not added; CSS class fallback will be used.",
  );
}

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
      text.length < 6000
    );
  }),
  detail.sourceFile,
);

if (!actionGrid) {
  warnings.push(
    "Action grid marker was not added; CSS class fallback will be used.",
  );
}

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
      ) && text.length < 2600;
    }),
    detail.sourceFile,
  );
}

if (!specRow) {
  warnings.push(
    "Specification row marker was not added; CSS class fallback will be used.",
  );
}

const updatedDetail = addAttributes(
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

fs.writeFileSync(detailClientPath, updatedDetail, "utf8");

const report = [
  "Product responsive V4",
  "=====================",
  "",
  `Breadcrumb files found: ${breadcrumbFileCount}`,
  "",
  ...log,
  "",
  "Warnings:",
  ...(warnings.length ? warnings : ["None"]),
];

fs.writeFileSync(reportPath, report.join("\n"), "utf8");

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
  Write-Host "Searching real product breadcrumbs and detail structure..." -ForegroundColor Cyan

  & node `
    $workerPath `
    $projectRoot `
    $detailClientPath `
    $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "V4 structure update failed."
  }

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
    )
  )) {
    $detailCss = Remove-MarkedBlock `
      -Text $detailCss `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $detailCssBlock = @'

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V4_START */
/* =========================================================
   产品详情页主图与响应式布局 V4
========================================================= */

/* 主图预览固定 1:1 */
[data-product-gallery="true"] {
  width: 100%;
  min-width: 0;
}

[data-product-main-stage="true"] {
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

[data-product-main-image="true"] {
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
[data-product-thumb-row="true"],
.thumbRow {
  gap: 0 !important;
  column-gap: 0 !important;
  row-gap: 0 !important;
}

[data-product-thumb-row="true"] > .thumb,
.thumbRow > .thumb {
  margin: 0 !important;
}

@media (max-width: 1080px) {
  .productTop {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    align-items: start !important;
    gap: 34px !important;
  }

  [data-product-gallery="true"] {
    width: min(100%, 720px) !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .productInfo {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* 型号与配置选择保持同一行 */
  [data-product-model-row="true"],
  .modelRow,
  .modelLine {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  [data-product-model-row="true"] > *,
  .modelRow > *,
  .modelLine > * {
    min-width: 0;
  }

  [data-product-model-row="true"] button,
  .modelRow button,
  .modelLine button {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }

  /* 四个按钮两个一排 */
  [data-product-action-grid="true"],
  .actionRow,
  .actionGrid {
    display: grid !important;
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
    width: 100% !important;
  }

  [data-product-action-grid="true"] > *,
  .actionRow > *,
  .actionGrid > * {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* 规格名称与参数值同一行 */
  [data-product-spec-row="true"],
  .specRow,
  .specItem,
  .specTableRow {
    display: grid !important;
    grid-template-columns:
      minmax(112px, 34%)
      minmax(0, 1fr) !important;
    align-items: center !important;
  }

  [data-product-spec-row="true"] > *,
  .specRow > *,
  .specItem > *,
  .specTableRow > * {
    min-width: 0 !important;
    margin: 0 !important;
  }
}

@media (max-width: 680px) {
  [data-product-gallery="true"],
  [data-product-main-stage="true"] {
    width: 100% !important;
    max-width: 100% !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  [data-product-main-image="true"] {
    margin-right: auto !important;
    margin-left: auto !important;
    object-position: center center !important;
  }

  [data-product-model-row="true"],
  .modelRow,
  .modelLine {
    gap: 8px !important;
    font-size: 18px !important;
  }

  [data-product-model-row="true"] button,
  .modelRow button,
  .modelLine button {
    min-height: 42px;
    padding-right: 12px !important;
    padding-left: 12px !important;
  }

  [data-product-action-grid="true"],
  .actionRow,
  .actionGrid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }

  [data-product-spec-row="true"],
  .specRow,
  .specItem,
  .specTableRow {
    grid-template-columns:
      minmax(108px, 36%)
      minmax(0, 1fr) !important;
  }

  [data-product-spec-row="true"] > *,
  .specRow > *,
  .specItem > *,
  .specTableRow > * {
    white-space: normal !important;
    word-break: break-word;
  }
}

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V4_END */
'@

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
 * 只作用于产品中心与产品详情组件中
 * 被标记的后加面包屑。
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
      Write-Host "Build failed. Restoring all backed-up files..." -ForegroundColor Yellow

      foreach ($filePath in $backupMap.Keys) {
        Copy-Item `
          -LiteralPath $backupMap[$filePath] `
          -Destination $filePath `
          -Force
      }

      throw "V4 build failed. All changed files were restored."
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
  Write-Host " - Real product-only breadcrumbs located automatically"
  Write-Host " - Main preview changed to 1:1"
  Write-Host " - Thumbnail gaps removed"
  Write-Host " - 1080px layout stacked"
  Write-Host " - Model/configuration kept on one row"
  Write-Host " - Four actions arranged two per row"
  Write-Host " - Mobile main image centered"
  Write-Host " - Specification rows kept in two columns"
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
