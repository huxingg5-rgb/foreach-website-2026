param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

$detailClientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$detailCssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$selectionClientPath = Join-Path $projectRoot "components\products\selection\ProductSelectionClient.tsx"

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "product-responsive-v3-$timestamp.cjs"
$reportPath = Join-Path $projectRoot "components\products\detail\product-responsive-v3-report.txt"

foreach ($filePath in @(
  $detailClientPath,
  $detailCssPath,
  $selectionClientPath
)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$detailClientBackup = "$detailClientPath.$timestamp.bak"
$detailCssBackup = "$detailCssPath.$timestamp.bak"
$selectionClientBackup = "$selectionClientPath.$timestamp.bak"

Copy-Item $detailClientPath $detailClientBackup -Force
Copy-Item $detailCssPath $detailCssBackup -Force
Copy-Item $selectionClientPath $selectionClientBackup -Force

Write-Host "Backups created." -ForegroundColor Yellow

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const detailClientPath = process.argv[3];
const selectionClientPath = process.argv[4];
const reportPath = process.argv[5];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

function createContext(filePath) {
  let sourceText = fs.readFileSync(filePath, "utf8");

  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
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
    sourceText,
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
    (a, b) =>
      a.getText(sourceFile).length -
      b.getText(sourceFile).length,
  )[0];
}

function parentHasMarker(context, node, marker) {
  return context.ancestors(node).some(
    (ancestor) => context.attribute(ancestor, marker),
  );
}

function wrapNode(
  context,
  node,
  marker,
  marked,
) {
  if (parentHasMarker(context, node, marker)) {
    marked.push(
      `${marker}: already wrapped in ${path.basename(context.filePath)}`,
    );
    return context.sourceText;
  }

  const start = node.getStart(context.sourceFile);
  const end = node.getEnd();
  const original = context.sourceText.slice(start, end);

  marked.push(
    `${marker}: wrapped <${context.tagName(node)}> in ${path.basename(
      context.filePath,
    )} line ${context.line(node)}`,
  );

  return (
    context.sourceText.slice(0, start) +
    `<div ${marker}="true">\n${original}\n</div>` +
    context.sourceText.slice(end)
  );
}

function applyAttributes(
  context,
  targets,
  marked,
) {
  const edits = [];

  for (const { node, name } of targets) {
    if (context.attribute(node, name)) {
      marked.push(
        `${name}: already present in ${path.basename(context.filePath)}`,
      );
      continue;
    }

    edits.push({
      position: context.opening(node).tagName.end,
      text: ` ${name}="true"`,
    });

    marked.push(
      `${name}: <${context.tagName(node)}> in ${path.basename(
        context.filePath,
      )} line ${context.line(node)}`,
    );
  }

  let text = context.sourceText;

  edits
    .sort((a, b) => b.position - a.position)
    .forEach(({ position, text: insertion }) => {
      text =
        text.slice(0, position) +
        insertion +
        text.slice(position);
    });

  return text;
}

const marked = [];

/* =========================================================
   Detail component
========================================================= */

const detail = createContext(detailClientPath);

const detailBreadcrumb = detail.nodes.find((node) =>
  /SiteBreadcrumb$/.test(detail.tagName(node)),
);

if (!detailBreadcrumb) {
  throw new Error(
    "SiteBreadcrumb was not found in ProductDetailClient.tsx.",
  );
}

const thumbRow = detail.nodes.find((node) =>
  detail.hasClass(node, "thumbRow"),
);

if (!thumbRow) {
  throw new Error("styles.thumbRow was not found.");
}

const images = detail.nodes.filter((node) => {
  const tag = detail.tagName(node);
  return tag === "Image" || tag === "img";
});

let gallery = null;
let mainImage = null;

for (const ancestor of detail.ancestors(thumbRow)) {
  const candidates = images.filter(
    (image) =>
      detail.descendantOf(image, ancestor) &&
      !detail.descendantOf(image, thumbRow) &&
      image.getStart(detail.sourceFile) <
        thumbRow.getStart(detail.sourceFile),
  );

  if (candidates.length) {
    gallery = ancestor;
    mainImage = candidates.sort(
      (a, b) =>
        b.getStart(detail.sourceFile) -
        a.getStart(detail.sourceFile),
    )[0];
    break;
  }
}

if (!gallery || !mainImage) {
  throw new Error("Main gallery or main image was not found.");
}

let mainStage = null;

for (const ancestor of detail.ancestors(mainImage)) {
  if (ancestor === gallery) break;

  if (/^[a-z]/.test(detail.tagName(ancestor))) {
    mainStage = ancestor;

    if (
      /main|stage|preview|image|zoom/i.test(
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
      text.length < 2600
    );
  }),
  detail.sourceFile,
);

if (!modelRow) {
  throw new Error("Model/configuration row was not found.");
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
      text.length < 5200
    );
  }),
  detail.sourceFile,
);

if (!actionGrid) {
  throw new Error("Four-button action area was not found.");
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
      ) && text.length < 2200;
    }),
    detail.sourceFile,
  );
}

if (!specRow) {
  throw new Error("Specification row template was not found.");
}

/*
 * First add attributes, then reparse before wrapping breadcrumb
 * so offsets cannot conflict.
 */
let detailText = applyAttributes(
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
  marked,
);

fs.writeFileSync(detailClientPath, detailText, "utf8");

const detailAfterAttributes = createContext(detailClientPath);
const detailBreadcrumbAfter = detailAfterAttributes.nodes.find((node) =>
  /SiteBreadcrumb$/.test(detailAfterAttributes.tagName(node)),
);

detailText = wrapNode(
  detailAfterAttributes,
  detailBreadcrumbAfter,
  "data-product-breadcrumb-shell",
  marked,
);

fs.writeFileSync(detailClientPath, detailText, "utf8");

/* =========================================================
   Product center breadcrumb only
========================================================= */

const selection = createContext(selectionClientPath);

const selectionBreadcrumb = selection.nodes.find((node) =>
  /SiteBreadcrumb$/.test(selection.tagName(node)),
);

if (!selectionBreadcrumb) {
  throw new Error(
    "SiteBreadcrumb was not found in ProductSelectionClient.tsx.",
  );
}

const selectionText = wrapNode(
  selection,
  selectionBreadcrumb,
  "data-product-breadcrumb-shell",
  marked,
);

fs.writeFileSync(selectionClientPath, selectionText, "utf8");

fs.writeFileSync(
  reportPath,
  [
    "Product responsive V3",
    "=====================",
    "",
    ...marked,
  ].join("\n"),
  "utf8",
);

console.log(marked.join("\n"));
console.log(`Report written to: ${reportPath}`);
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText(
  $workerPath,
  $workerContent,
  $encoding
)

try {
  Write-Host ""
  Write-Host "Updating product-center/detail breadcrumbs and detail layout..." -ForegroundColor Cyan

  & node `
    $workerPath `
    $projectRoot `
    $detailClientPath `
    $selectionClientPath `
    $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "V3 structure update failed."
  }

  $cssContent = Get-Content $detailCssPath -Raw -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V3_START */"
  $endMarker = "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V3_END */"

  $cssBlock = @'

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V3_START */
/* =========================================================
   产品详情页最终响应式规则 V3
========================================================= */

/* 面包屑：紧贴 Top 栏，下面留 18px */
[data-product-breadcrumb-shell="true"] {
  margin: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 18px !important;
}

/* 主图固定为 1:1 */
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

/* 缩略图之间取消间隔 */
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
  [data-product-model-row="true"] {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  [data-product-model-row="true"] > * {
    min-width: 0;
  }

  [data-product-model-row="true"] button {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }

  /* 四个按钮：2 个一排 */
  [data-product-action-grid="true"] {
    display: grid !important;
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
    width: 100% !important;
  }

  [data-product-action-grid="true"] > * {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* 规格名称与值保持同一行 */
  [data-product-spec-row="true"] {
    display: grid !important;
    grid-template-columns:
      minmax(112px, 34%)
      minmax(0, 1fr) !important;
    align-items: center !important;
  }

  [data-product-spec-row="true"] > * {
    min-width: 0 !important;
    margin: 0 !important;
  }
}

@media (max-width: 680px) {
  [data-product-breadcrumb-shell="true"] {
    margin-top: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 18px !important;
  }

  /* 手机端主图整体居中 */
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

  [data-product-model-row="true"] {
    gap: 8px !important;
    font-size: clamp(16px, 4.2vw, 22px) !important;
  }

  [data-product-model-row="true"] button {
    min-height: 42px;
    padding-right: 14px !important;
    padding-left: 14px !important;
  }

  [data-product-action-grid="true"] {
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }

  [data-product-spec-row="true"] {
    grid-template-columns:
      minmax(102px, 36%)
      minmax(0, 1fr) !important;
  }

  [data-product-spec-row="true"] > * {
    white-space: normal !important;
    word-break: break-word;
  }
}

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V3_END */
'@

  $pattern =
    [Regex]::Escape($startMarker) +
    '(?s).*?' +
    [Regex]::Escape($endMarker)

  if ([regex]::IsMatch($cssContent, $pattern)) {
    $cssContent = [regex]::Replace(
      $cssContent,
      $pattern,
      $cssBlock.Trim(),
      1
    )
  }
  else {
    $cssContent =
      $cssContent.TrimEnd() +
      "`r`n`r`n" +
      $cssBlock +
      "`r`n"
  }

  [System.IO.File]::WriteAllText(
    $detailCssPath,
    $cssContent,
    $encoding
  )

  $nextPath = Join-Path $projectRoot ".next"

  if (Test-Path $nextPath) {
    Remove-Item $nextPath -Recurse -Force
  }

  if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Cyan

    & npm run build

    if ($LASTEXITCODE -ne 0) {
      Write-Host "Build failed. Restoring files..." -ForegroundColor Yellow

      Copy-Item $detailClientBackup $detailClientPath -Force
      Copy-Item $detailCssBackup $detailCssPath -Force
      Copy-Item $selectionClientBackup $selectionClientPath -Force

      throw "V3 build failed. Files were restored."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }

  Write-Host ""
  Write-Host "Completed:" -ForegroundColor Green
  Write-Host " - Breadcrumbs only targeted in product center and detail components"
  Write-Host " - No route file was modified"
  Write-Host " - Main preview is 1:1"
  Write-Host " - Thumbnail gaps removed"
  Write-Host " - 1080px/mobile layout fixed"
}
finally {
  if (Test-Path $workerPath) {
    Remove-Item $workerPath -Force
  }
}
