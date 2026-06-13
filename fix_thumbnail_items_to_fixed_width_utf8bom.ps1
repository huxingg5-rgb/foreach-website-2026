param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$tsxPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "fix-fixed-thumbnail-width-$timestamp.cjs"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($tsxPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }
}

Copy-Item -LiteralPath $tsxPath -Destination "$tsxPath.$timestamp.bak" -Force
Copy-Item -LiteralPath $cssPath -Destination "$cssPath.$timestamp.bak" -Force

Write-Host "Backups created." -ForegroundColor Yellow

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const tsxPath = process.argv[3];

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

function getAttributes(node) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.attributes.properties;
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.attributes.properties;
  }

  return [];
}

function getAttribute(node, name, sourceFile) {
  for (const attribute of getAttributes(node)) {
    if (!ts.isJsxAttribute(attribute)) continue;
    if (attribute.name.getText(sourceFile) !== name) continue;

    return attribute.initializer
      ? attribute.initializer.getText(sourceFile)
      : "true";
  }

  return "";
}

function getTagName(node, sourceFile) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.tagName.getText(sourceFile);
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText(sourceFile);
  }

  return "";
}

function findArrowButtons(sourceFile) {
  let previous = null;
  let next = null;

  function visit(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      if (getTagName(node, sourceFile) === "button") {
        const className = getAttribute(node, "className", sourceFile);
        const ariaLabel = getAttribute(node, "aria-label", sourceFile);
        const onClick = getAttribute(node, "onClick", sourceFile);
        const combined = `${className} ${ariaLabel} ${onClick}`;

        if (/styles\.thumbArrow/.test(className)) {
          if (/上一张|handlePreviousThumb/.test(combined)) {
            previous = node;
          }

          if (/下一张|handleNextThumb/.test(combined)) {
            next = node;
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return { previous, next };
}

function getJsxAncestors(node) {
  const ancestors = [];
  let current = node.parent;

  while (current) {
    if (ts.isJsxElement(current)) {
      ancestors.push(current);
    }

    current = current.parent;
  }

  return ancestors;
}

function findCommonAncestor(left, right) {
  const rightAncestors = new Set(getJsxAncestors(right));

  return (
    getJsxAncestors(left).find((node) => rightAncestors.has(node)) ||
    null
  );
}

function directChildUnder(ancestor, descendant) {
  let current = descendant;

  while (current.parent && current.parent !== ancestor) {
    current = current.parent;
  }

  return current.parent === ancestor ? current : null;
}

function addDataAttribute(edits, node, sourceFile, name, value) {
  const existing = getAttribute(node, name, sourceFile);

  if (existing) {
    return;
  }

  const opening = ts.isJsxElement(node)
    ? node.openingElement
    : node;

  const insertPosition = opening.tagName.end;

  edits.push({
    start: insertPosition,
    end: insertPosition,
    text: ` ${name}="${value}"`,
  });
}

let sourceFile = parse(sourceText);
const { previous, next } = findArrowButtons(sourceFile);

if (!previous || !next) {
  throw new Error("Could not locate both real thumbArrow buttons.");
}

const row = findCommonAncestor(previous, next);

if (!row) {
  throw new Error("Could not locate the common thumbnail row.");
}

const previousDirectChild = directChildUnder(row, previous);
const nextDirectChild = directChildUnder(row, next);

const rowChildren = row.children.filter((child) => {
  return (
    ts.isJsxElement(child) ||
    ts.isJsxSelfClosingElement(child)
  );
});

const middleCandidates = rowChildren.filter((child) => {
  return child !== previousDirectChild && child !== nextDirectChild;
});

if (middleCandidates.length === 0) {
  throw new Error("Could not locate the thumbnail viewport between the arrows.");
}

/*
 * 优先选择同时位于两个箭头之间、且包含按钮或图片的节点。
 */
let viewport =
  middleCandidates.find((candidate) => {
    const text = candidate.getText(sourceFile);

    return /<button|<img|map\(/.test(text);
  }) || middleCandidates[0];

const edits = [];

addDataAttribute(
  edits,
  row,
  sourceFile,
  "data-product-thumb-row",
  "true",
);

addDataAttribute(
  edits,
  viewport,
  sourceFile,
  "data-product-thumb-viewport",
  "true",
);

/*
 * 标记可视窗口内所有非箭头按钮为缩略图卡片。
 * 对 map() 内的按钮模板同样有效。
 */
function markThumbnailButtons(node) {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    if (getTagName(node, sourceFile) === "button") {
      const className = getAttribute(node, "className", sourceFile);

      if (!/styles\.thumbArrow/.test(className)) {
        addDataAttribute(
          edits,
          node,
          sourceFile,
          "data-product-thumb-item",
          "true",
        );
      }
    }
  }

  ts.forEachChild(node, markThumbnailButtons);
}

markThumbnailButtons(viewport);

edits
  .sort((left, right) => right.start - left.start)
  .forEach(({ start, end, text }) => {
    sourceText =
      sourceText.slice(0, start) +
      text +
      sourceText.slice(end);
  });

fs.writeFileSync(tsxPath, sourceText, "utf8");

console.log("Added stable data attributes to:");
console.log("  thumbnail row");
console.log("  thumbnail viewport");
console.log("  thumbnail item template(s)");
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($workerPath, $workerContent, $encoding)

try {
  & node $workerPath $projectRoot $tsxPath

  if ($LASTEXITCODE -ne 0) {
    throw "Could not identify the thumbnail viewport structure."
  }

  $cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

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

    return [System.Text.RegularExpressions.Regex]::Replace(
      $Text,
      $pattern,
      ""
    )
  }

  # 删除上一版会拉伸中间直接子元素的规则。
  $cssContent = Remove-MarkedBlock `
    -Text $cssContent `
    -StartMarker "/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_START */" `
    -EndMarker "/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_END */"

  $cssContent = Remove-MarkedBlock `
    -Text $cssContent `
    -StartMarker "/* PRODUCT_DETAIL_FIXED_SIZE_THUMBNAILS_START */" `
    -EndMarker "/* PRODUCT_DETAIL_FIXED_SIZE_THUMBNAILS_END */"

  $cssBlock = @'

/* PRODUCT_DETAIL_FIXED_SIZE_THUMBNAILS_START */
/* =========================================================
   产品详情页｜固定宽度缩略图轨道

   结构：
   左按钮 | 可伸缩可视窗口 | 右按钮

   规则：
   1. 可视窗口占满中间剩余宽度
   2. 每张缩略图固定 96px，不平均拉伸
   3. 图片数量少时，后方区域保持留白
   4. 图片数量多时横向排列，超出部分隐藏
========================================================= */

[data-product-thumb-row="true"] {
  display: grid !important;
  grid-template-columns: 28px minmax(0, 1fr) 28px !important;
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
  align-items: stretch !important;
  column-gap: 6px !important;
  box-sizing: border-box;
}

[data-product-thumb-row="true"]
  > .thumbArrow[aria-label="上一张"] {
  grid-column: 1 !important;
}

[data-product-thumb-row="true"]
  > [data-product-thumb-viewport="true"] {
  grid-column: 2 !important;
  min-width: 0 !important;
  width: 100% !important;
  overflow: hidden !important;

  display: flex !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 8px !important;
}

[data-product-thumb-row="true"]
  > .thumbArrow[aria-label="下一张"] {
  grid-column: 3 !important;
}

/*
 * 如果可视窗口内还有一层轨道容器，
 * 只让轨道按内容宽度排列，不拉伸缩略图。
 */
[data-product-thumb-viewport="true"]
  > :not([data-product-thumb-item="true"]) {
  display: flex !important;
  width: max-content !important;
  min-width: max-content !important;
  max-width: none !important;
  flex: 0 0 auto !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 8px !important;
}

/* 每张缩略图固定 96px */
[data-product-thumb-item="true"] {
  width: 96px !important;
  min-width: 96px !important;
  max-width: 96px !important;
  flex: 0 0 96px !important;
  align-self: stretch;
  box-sizing: border-box;
}

/* 缩略图内部图片保持居中，不被放大填满空白 */
[data-product-thumb-item="true"] img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  object-fit: contain;
}

/* PRODUCT_DETAIL_FIXED_SIZE_THUMBNAILS_END */
'@

  $cssContent =
    $cssContent.TrimEnd() +
    "`r`n" +
    $cssBlock +
    "`r`n"

  [System.IO.File]::WriteAllText(
    $cssPath,
    $cssContent,
    $encoding
  )

  Write-Host "Updated: $tsxPath" -ForegroundColor Green
  Write-Host "Updated: $cssPath" -ForegroundColor Green
  Write-Host ""
  Write-Host "Thumbnail behavior:" -ForegroundColor Cyan
  Write-Host "1 image  -> 96px thumbnail + remaining blank space"
  Write-Host "5 images -> five 96px thumbnails when space allows"
  Write-Host "Overflow -> hidden inside the viewport; arrows remain at both edges"
  Write-Host ""
  Write-Host "Right-side product information and divider were not changed." -ForegroundColor Cyan

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
      throw "The fixed-width thumbnail layout was updated, but npm run build failed. Send the complete error output."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
