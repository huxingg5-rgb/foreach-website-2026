param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$tsxPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "responsive-product-detail-$timestamp.cjs"
$reportPath = Join-Path $projectRoot "components\products\detail\product-detail-responsive-report.txt"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($tsxPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

$tsxBackup = "$tsxPath.$timestamp.bak"
$cssBackup = "$cssPath.$timestamp.bak"

Copy-Item -LiteralPath $tsxPath -Destination $tsxBackup -Force
Copy-Item -LiteralPath $cssPath -Destination $cssBackup -Force

Write-Host "Backup created: $tsxBackup" -ForegroundColor Yellow
Write-Host "Backup created: $cssBackup" -ForegroundColor Yellow

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const tsxPath = process.argv[3];
const reportPath = process.argv[4];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

let sourceText = fs.readFileSync(tsxPath, "utf8");

function parse(text) {
  return ts.createSourceFile(
    tsxPath,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}

let sourceFile = parse(sourceText);

function isJsxNode(node) {
  return ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node);
}

function getOpening(node) {
  return ts.isJsxElement(node) ? node.openingElement : node;
}

function getTagName(node) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.tagName.getText(sourceFile);
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText(sourceFile);
  }

  return "";
}

function getAttributes(node) {
  return getOpening(node).attributes.properties;
}

function getAttribute(node, name) {
  for (const attribute of getAttributes(node)) {
    if (!ts.isJsxAttribute(attribute)) continue;
    if (attribute.name.getText(sourceFile) !== name) continue;

    return attribute.initializer
      ? attribute.initializer.getText(sourceFile)
      : "true";
  }

  return "";
}

function getClassName(node) {
  return getAttribute(node, "className");
}

function hasClass(node, className) {
  return new RegExp(`styles\\.${className}\\b`).test(
    getClassName(node),
  );
}

function lineOf(node) {
  return (
    sourceFile.getLineAndCharacterOfPosition(
      node.getStart(sourceFile),
    ).line + 1
  );
}

function getJsxAncestors(node) {
  const result = [];
  let current = node.parent;

  while (current) {
    if (isJsxNode(current)) {
      result.push(current);
    }

    current = current.parent;
  }

  return result;
}

function isDescendantOf(node, ancestor) {
  let current = node.parent;

  while (current) {
    if (current === ancestor) return true;
    current = current.parent;
  }

  return false;
}

const allJsxNodes = [];

function collect(node) {
  if (isJsxNode(node)) {
    allJsxNodes.push(node);
  }

  ts.forEachChild(node, collect);
}

collect(sourceFile);

const edits = [];
const marked = [];

function addDataAttribute(node, name, value = "true") {
  if (!node || !isJsxNode(node)) {
    throw new Error(`Cannot add ${name}: target is not JSX.`);
  }

  if (getAttribute(node, name)) {
    marked.push(`${name}: already present at line ${lineOf(node)}`);
    return;
  }

  const opening = getOpening(node);

  edits.push({
    start: opening.tagName.end,
    text: ` ${name}="${value}"`,
  });

  marked.push(
    `${name}: <${getTagName(node)}> line ${lineOf(node)}`,
  );
}

function chooseSmallest(nodes) {
  if (!nodes.length) return null;

  return [...nodes].sort(
    (a, b) =>
      a.getText(sourceFile).length -
      b.getText(sourceFile).length,
  )[0];
}

/* =========================================================
   1. Thumbnail row and gallery
========================================================= */

const thumbRow = allJsxNodes.find((node) =>
  hasClass(node, "thumbRow"),
);

if (!thumbRow) {
  throw new Error("Could not locate styles.thumbRow.");
}

addDataAttribute(
  thumbRow,
  "data-product-thumb-row",
);

/*
 * Find the nearest gallery ancestor that contains both the
 * thumbnail row and a main Image/img before that row.
 */
const imageNodes = allJsxNodes.filter((node) => {
  const tagName = getTagName(node);

  return tagName === "Image" || tagName === "img";
});

let galleryNode = null;
let mainImageNode = null;
let mainStageNode = null;

for (const ancestor of getJsxAncestors(thumbRow)) {
  const imagesBeforeThumbs = imageNodes.filter(
    (imageNode) =>
      isDescendantOf(imageNode, ancestor) &&
      !isDescendantOf(imageNode, thumbRow) &&
      imageNode.getStart(sourceFile) <
        thumbRow.getStart(sourceFile),
  );

  if (imagesBeforeThumbs.length > 0) {
    galleryNode = ancestor;
    mainImageNode = imagesBeforeThumbs.sort(
      (a, b) =>
        b.getStart(sourceFile) -
        a.getStart(sourceFile),
    )[0];
    break;
  }
}

if (!galleryNode || !mainImageNode) {
  throw new Error(
    "Could not locate the main gallery/image before thumbRow.",
  );
}

addDataAttribute(
  galleryNode,
  "data-product-gallery",
);

/*
 * Prefer the nearest ordinary HTML parent around the main image.
 */
for (const ancestor of getJsxAncestors(mainImageNode)) {
  if (ancestor === galleryNode) break;

  const tagName = getTagName(ancestor);

  if (
    /^[a-z]/.test(tagName) &&
    !hasClass(ancestor, "thumb") &&
    !hasClass(ancestor, "thumbRow")
  ) {
    mainStageNode = ancestor;
    break;
  }
}

if (!mainStageNode) {
  mainStageNode = mainImageNode;
}

addDataAttribute(
  mainStageNode,
  "data-product-main-stage",
);

addDataAttribute(
  mainImageNode,
  "data-product-main-image",
);

/* =========================================================
   2. Breadcrumb shell
========================================================= */

const breadcrumbNode = allJsxNodes.find((node) =>
  /Breadcrumb$/.test(getTagName(node)),
);

if (!breadcrumbNode) {
  throw new Error("Could not locate the breadcrumb component.");
}

const breadcrumbParent = getJsxAncestors(
  breadcrumbNode,
).find((node) => /^[a-z]/.test(getTagName(node)));

if (!breadcrumbParent) {
  throw new Error(
    "Could not locate an HTML wrapper for the breadcrumb.",
  );
}

addDataAttribute(
  breadcrumbParent,
  "data-product-breadcrumb-shell",
);

/* =========================================================
   3. Model + configurator row
========================================================= */

const modelRowCandidates = allJsxNodes.filter((node) => {
  const text = node.getText(sourceFile);

  return (
    text.includes("型号") &&
    text.includes("配置选择") &&
    text.length < 2400
  );
});

const modelRow = chooseSmallest(modelRowCandidates);

if (!modelRow) {
  throw new Error(
    "Could not locate the model/configurator row.",
  );
}

addDataAttribute(
  modelRow,
  "data-product-model-row",
);

/* =========================================================
   4. Four action buttons
========================================================= */

const actionLabels = [
  "添加规格书",
  "添加图纸",
  "申请3D文件",
  "加入清单",
];

const actionCandidates = allJsxNodes.filter((node) => {
  const text = node.getText(sourceFile);

  return (
    actionLabels.every((label) => text.includes(label)) &&
    text.length < 5000
  );
});

const actionGrid = chooseSmallest(actionCandidates);

if (!actionGrid) {
  throw new Error(
    "Could not locate the four-button action container.",
  );
}

addDataAttribute(
  actionGrid,
  "data-product-action-grid",
);

/* =========================================================
   5. Specification row template
========================================================= */

const specRowCandidates = allJsxNodes.filter((node) => {
  const text = node.getText(sourceFile);

  const hasLabelAndValue =
    (
      /\.label\b/.test(text) &&
      /\.value\b/.test(text)
    ) ||
    (
      /\["label"\]/.test(text) &&
      /\["value"\]/.test(text)
    );

  return hasLabelAndValue && text.length < 1800;
});

const specRow = chooseSmallest(specRowCandidates);

if (!specRow) {
  throw new Error(
    "Could not locate the specification row template.",
  );
}

addDataAttribute(
  specRow,
  "data-product-spec-row",
);

/* =========================================================
   Apply edits
========================================================= */

edits
  .sort((a, b) => b.start - a.start)
  .forEach(({ start, text }) => {
    sourceText =
      sourceText.slice(0, start) +
      text +
      sourceText.slice(start);
  });

fs.writeFileSync(tsxPath, sourceText, "utf8");

const report = [
  "Product detail responsive markers",
  "=================================",
  "",
  ...marked,
];

fs.writeFileSync(reportPath, report.join("\n"), "utf8");

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
  Write-Host "Locating the real product-detail structure..." -ForegroundColor Cyan

  & node $workerPath $projectRoot $tsxPath $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "Could not add responsive structure markers."
  }

  $cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_START */"
  $endMarker = "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_END */"

  $cssBlock = @'

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_START */
/* =========================================================
   产品详情页最终响应式规则

   1. 主图预览固定 1:1
   2. 缩略图之间无空白间隔
   3. 面包屑下方增加 18px
   4. 1080px 以下重新排版
   5. 手机端移除 Top 栏与面包屑之间的空隙
========================================================= */

/* ---------- 面包屑 ---------- */

[data-product-breadcrumb-shell="true"] {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 18px !important;
}

/* ---------- 主图与缩略图 ---------- */

[data-product-gallery="true"] {
  width: 100%;
  min-width: 0;
}

[data-product-main-stage="true"] {
  width: 100% !important;
  aspect-ratio: 1 / 1 !important;
  min-height: 0 !important;
  height: auto !important;
  overflow: hidden !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

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

[data-product-thumb-row="true"],
.thumbRow {
  gap: 0 !important;
  column-gap: 0 !important;
  row-gap: 0 !important;
}

/*
 * 每张缩略图固定尺寸并紧密排列。
 * 取消前面为缩略图增加的 6px / 8px 空隙。
 */
[data-product-thumb-row="true"] > .thumb,
.thumbRow > .thumb {
  margin: 0 !important;
}

/* ---------- 1080px 以下 ---------- */

@media (max-width: 1080px) {
  .productTop {
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

  /*
   * 型号、型号值和配置选择保持同一行。
   */
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

  /*
   * 四个按钮两列排列。
   */
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

  /*
   * 规格参数始终保持“名称｜参数值”同一行。
   */
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

/* ---------- 手机端 ---------- */

@media (max-width: 680px) {
  /*
   * Top 栏下方不再保留额外空白。
   * 面包屑自身只在底部留 18px。
   */
  [data-product-breadcrumb-shell="true"] {
    margin-top: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 18px !important;
  }

  /*
   * 主图与缩略图整体居中。
   */
  [data-product-gallery="true"] {
    width: 100% !important;
    max-width: 100% !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  [data-product-main-stage="true"] {
    width: 100% !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  [data-product-main-image="true"] {
    margin-right: auto !important;
    margin-left: auto !important;
    object-position: center center !important;
  }

  /*
   * 型号行保持一行，同时缩小间距与字号。
   */
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

  /*
   * 手机端规格仍保持一排：
   * 页面 slug ｜ ea-100-pmma
   */
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

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_END */
'@

  $pattern =
    [Regex]::Escape($startMarker) +
    '(?s).*?' +
    [Regex]::Escape($endMarker)

  if (
    [System.Text.RegularExpressions.Regex]::IsMatch(
      $cssContent,
      $pattern
    )
  ) {
    $cssContent =
      [System.Text.RegularExpressions.Regex]::Replace(
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
    $cssPath,
    $cssContent,
    $encoding
  )

  Write-Host "Updated: $tsxPath" -ForegroundColor Green
  Write-Host "Updated: $cssPath" -ForegroundColor Green

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
      Write-Host "Build failed. Restoring TSX and CSS..." -ForegroundColor Yellow

      Copy-Item `
        -LiteralPath $tsxBackup `
        -Destination $tsxPath `
        -Force

      Copy-Item `
        -LiteralPath $cssBackup `
        -Destination $cssPath `
        -Force

      throw "Responsive product-detail update failed. Files were restored."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Applied:" -ForegroundColor Green
  Write-Host " - Main preview uses a 1:1 square"
  Write-Host " - Thumbnail gaps removed"
  Write-Host " - 18px space below breadcrumb"
  Write-Host " - Under 1080px the gallery and info stack correctly"
  Write-Host " - Model and configuration stay on one row"
  Write-Host " - Four actions use a 2-column grid"
  Write-Host " - Mobile gallery is centered"
  Write-Host " - Specification label and value stay on one row"
  Write-Host " - Mobile header-to-breadcrumb extra gap removed"
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
