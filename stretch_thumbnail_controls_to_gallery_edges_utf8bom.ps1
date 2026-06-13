param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$tsxPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "fix-thumb-row-span-$timestamp.cjs"

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

function parse() {
  return ts.createSourceFile(
    tsxPath,
    sourceText,
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

function findButtons(sourceFile) {
  let previousButton = null;
  let nextButton = null;

  function visit(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = ts.isJsxElement(node)
        ? node.openingElement.tagName.getText(sourceFile)
        : node.tagName.getText(sourceFile);

      if (tagName === "button") {
        const className = getAttribute(node, "className", sourceFile);
        const ariaLabel = getAttribute(node, "aria-label", sourceFile);
        const onClick = getAttribute(node, "onClick", sourceFile);

        if (/styles\.thumbArrow/.test(className)) {
          if (/上一张|handlePreviousThumb/.test(`${ariaLabel} ${onClick}`)) {
            previousButton = node;
          }

          if (/下一张|handleNextThumb/.test(`${ariaLabel} ${onClick}`)) {
            nextButton = node;
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return { previousButton, nextButton };
}

function getJsxAncestors(node) {
  const result = [];
  let current = node.parent;

  while (current) {
    if (ts.isJsxElement(current)) {
      result.push(current);
    }

    current = current.parent;
  }

  return result;
}

function findCommonAncestor(left, right) {
  const leftAncestors = getJsxAncestors(left);
  const rightSet = new Set(getJsxAncestors(right));

  return leftAncestors.find((node) => rightSet.has(node)) || null;
}

function getClassNameToken(node, sourceFile) {
  const classNameText = getAttribute(node, "className", sourceFile);
  const match = classNameText.match(/styles\.([A-Za-z0-9_]+)/);

  return match ? match[1] : "";
}

let sourceFile = parse();
let { previousButton, nextButton } = findButtons(sourceFile);

if (!previousButton || !nextButton) {
  throw new Error("Could not locate both real thumbArrow buttons.");
}

let commonAncestor = findCommonAncestor(previousButton, nextButton);

if (!commonAncestor) {
  throw new Error("Could not locate the common thumbnail-row ancestor.");
}

let rowClassName = getClassNameToken(commonAncestor, sourceFile);

if (!rowClassName) {
  const openingElement = commonAncestor.openingElement;
  const insertPosition = openingElement.tagName.end;
  const insertedText = ' className={styles.thumbNavigationRow}';

  sourceText =
    sourceText.slice(0, insertPosition) +
    insertedText +
    sourceText.slice(insertPosition);

  fs.writeFileSync(tsxPath, sourceText, "utf8");
  rowClassName = "thumbNavigationRow";

  console.log(
    "Added className={styles.thumbNavigationRow} to the common thumbnail container.",
  );
} else {
  console.log(`Detected thumbnail-row class: styles.${rowClassName}`);
}

console.log(`ROW_CLASS=${rowClassName}`);
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($workerPath, $workerContent, $encoding)

try {
  $workerOutput = & node $workerPath $projectRoot $tsxPath

  if ($LASTEXITCODE -ne 0) {
    throw "Could not detect the real thumbnail-row container."
  }

  $workerOutput | ForEach-Object {
    Write-Host $_
  }

  $rowClassLine = $workerOutput |
    Where-Object { $_ -like "ROW_CLASS=*" } |
    Select-Object -Last 1

  if (-not $rowClassLine) {
    throw "The thumbnail-row class was not returned."
  }

  $rowClassName = $rowClassLine.Substring("ROW_CLASS=".Length)

  if (-not $rowClassName) {
    throw "The detected thumbnail-row class is empty."
  }

  $cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_START */"
  $endMarker = "/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_END */"

  $cssBlock = @"

/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_START */
/* =========================================================
   缩略图导航铺满主图预览宽度

   真实父容器：.$rowClassName
   布局：左按钮 | 自适应缩略图区 | 右按钮
========================================================= */

.$rowClassName {
  display: flex !important;
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
  align-self: stretch !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 6px !important;
  box-sizing: border-box;
}

.$rowClassName > .thumbArrow {
  width: 28px !important;
  min-width: 28px !important;
  max-width: 28px !important;
  flex: 0 0 28px !important;
}

/*
 * 两个按钮之间的直接子容器自动占满剩余空间，
 * 因此下一张按钮固定在主图预览最右侧。
 */
.$rowClassName > :not(.thumbArrow) {
  min-width: 0 !important;
  flex: 1 1 auto !important;
}

/* 明确固定左右两个真实按钮的位置 */
.$rowClassName > .thumbArrow[aria-label="上一张"] {
  order: 1;
}

.$rowClassName > :not(.thumbArrow) {
  order: 2;
}

.$rowClassName > .thumbArrow[aria-label="下一张"] {
  order: 3;
  margin-left: auto !important;
}

/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_END */
"@

  $pattern =
    [Regex]::Escape($startMarker) +
    '(?s).*?' +
    [Regex]::Escape($endMarker)

  if ([System.Text.RegularExpressions.Regex]::IsMatch(
    $cssContent,
    $pattern
  )) {
    $cssContent = [System.Text.RegularExpressions.Regex]::Replace(
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

  Write-Host "Updated: $cssPath" -ForegroundColor Green
  Write-Host ""
  Write-Host "Thumbnail controls now span the full gallery width:" -ForegroundColor Cyan
  Write-Host "Previous button -> far left"
  Write-Host "Thumbnail viewport -> flexible middle"
  Write-Host "Next button -> far right"
  Write-Host ""
  Write-Host "Divider line and right-side product information were not changed." -ForegroundColor Cyan

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
      throw "The thumbnail-row layout was updated, but npm run build failed. Send the complete error output."
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
