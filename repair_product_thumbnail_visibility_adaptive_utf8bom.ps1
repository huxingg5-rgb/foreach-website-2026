param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "repair-product-thumbnail-$timestamp.cjs"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($clientPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }
}

Copy-Item -LiteralPath $clientPath -Destination "$clientPath.$timestamp.bak" -Force
Copy-Item -LiteralPath $cssPath -Destination "$cssPath.$timestamp.bak" -Force

Write-Host "Backups created." -ForegroundColor Yellow

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const clientPath = process.argv[3];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

const original = fs.readFileSync(clientPath, "utf8");
const sourceFile = ts.createSourceFile(
  clientPath,
  original,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

const replacements = [];

function addReplacement(start, end, text) {
  replacements.push({ start, end, text });
}

function isGalleryLengthGreaterThanOne(node) {
  if (!ts.isBinaryExpression(node)) return false;

  const leftText = node.left.getText(sourceFile).replace(/\s+/g, "");
  const rightText = node.right.getText(sourceFile).trim();

  return (
    leftText === "galleryImages.length" &&
    node.operatorToken.kind === ts.SyntaxKind.GreaterThanToken &&
    rightText === "1"
  );
}

let rowConditionFound = false;
let rowConditionAlreadyCorrect = false;

function visit(node) {
  /*
   * 优先处理明确用于控制缩略图行的变量：
   * showThumbnails
   * showThumbnailRow
   *
   * 不修改 showThumbnailArrows，因为箭头仍然要求多图才显示。
   */
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    const variableName = node.name.text;

    if (
      /^(showThumbnails|showThumbnailRow)$/i.test(variableName) &&
      node.initializer
    ) {
      const initializerText = node.initializer
        .getText(sourceFile)
        .replace(/\s+/g, "");

      if (initializerText === "galleryImages.length>1") {
        addReplacement(
          node.initializer.getStart(sourceFile),
          node.initializer.getEnd(),
          "galleryImages.length > 0",
        );

        rowConditionFound = true;
        return;
      }

      if (initializerText === "galleryImages.length>0") {
        rowConditionAlreadyCorrect = true;
        return;
      }
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

/*
 * 兼容没有单独变量、直接在 JSX 中写：
 * galleryImages.length > 1 ? (...)
 */
if (!rowConditionFound && !rowConditionAlreadyCorrect) {
  function visitInline(node) {
    if (rowConditionFound) return;

    if (isGalleryLengthGreaterThanOne(node)) {
      let parent = node.parent;
      let depth = 0;

      while (parent && depth < 8) {
        const parentText = parent.getText(sourceFile);

        if (/thumbnailRow|thumbnailList|缩略图/i.test(parentText)) {
          addReplacement(
            node.getStart(sourceFile),
            node.getEnd(),
            "galleryImages.length > 0",
          );

          rowConditionFound = true;
          return;
        }

        parent = parent.parent;
        depth += 1;
      }
    }

    ts.forEachChild(node, visitInline);
  }

  visitInline(sourceFile);
}

if (!rowConditionFound && !rowConditionAlreadyCorrect) {
  const diagnosticLines = original
    .split(/\r?\n/)
    .map((line, index) => ({ line, index: index + 1 }))
    .filter(({ line }) => /thumbnail|galleryImages/i.test(line))
    .slice(0, 30)
    .map(({ line, index }) => `L${index}: ${line.trim()}`)
    .join("\n");

  throw new Error(
    "Could not locate the thumbnail row visibility condition.\n" +
    diagnosticLines,
  );
}

let next = original;

replacements
  .sort((a, b) => b.start - a.start)
  .forEach(({ start, end, text }) => {
    next = next.slice(0, start) + text + next.slice(end);
  });

if (next !== original) {
  fs.writeFileSync(clientPath, next, "utf8");
  console.log("Thumbnail row condition changed to galleryImages.length > 0.");
} else {
  console.log("Thumbnail row condition was already galleryImages.length > 0.");
}
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($workerPath, $workerContent, $encoding)

try {
  & node $workerPath $projectRoot $clientPath

  if ($LASTEXITCODE -ne 0) {
    throw "Thumbnail code parser failed."
  }

  $cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_ALWAYS_SHOW_MAIN_THUMBNAIL_START */"
  $endMarker = "/* PRODUCT_DETAIL_ALWAYS_SHOW_MAIN_THUMBNAIL_END */"

  $cssBlock = @'

/* PRODUCT_DETAIL_ALWAYS_SHOW_MAIN_THUMBNAIL_START */
/* =========================================================
   产品详情页缩略图规则

   1. 只要有主图，就显示缩略图
   2. 只有一张图时隐藏左右箭头
   3. 多张图时保持原来的缩略图滑动结构
========================================================= */

.thumbnailRow:not(:has(.thumbnail:nth-child(2))) {
  grid-template-columns: minmax(0, 1fr);
}

.thumbnailRow:not(:has(.thumbnail:nth-child(2))) .thumbnailArrow {
  display: none;
}

.thumbnailRow:not(:has(.thumbnail:nth-child(2))) .thumbnailList {
  grid-auto-columns: 96px;
  justify-content: start;
}
/* PRODUCT_DETAIL_ALWAYS_SHOW_MAIN_THUMBNAIL_END */
'@

  $pattern =
    [Regex]::Escape($startMarker) +
    '(?s).*?' +
    [Regex]::Escape($endMarker)

  if ([System.Text.RegularExpressions.Regex]::IsMatch($cssContent, $pattern)) {
    $cssContent = [System.Text.RegularExpressions.Regex]::Replace(
      $cssContent,
      $pattern,
      $cssBlock.Trim(),
      1
    )
  }
  else {
    $cssContent = $cssContent.TrimEnd() + "`r`n" + $cssBlock + "`r`n"
  }

  [System.IO.File]::WriteAllText($cssPath, $cssContent, $encoding)
  Write-Host "Updated: $cssPath" -ForegroundColor Green

  $nextPath = Join-Path $projectRoot ".next"

  if (Test-Path -LiteralPath $nextPath) {
    Remove-Item -LiteralPath $nextPath -Recurse -Force
    Write-Host "Removed stale .next cache." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Thumbnail behavior:" -ForegroundColor Cyan
  Write-Host "1 image: main thumbnail is shown; arrows are hidden"
  Write-Host "2+ images: all thumbnails and arrows are shown"

  if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Cyan

    & npm run build

    if ($LASTEXITCODE -ne 0) {
      throw "Thumbnail logic was updated, but npm run build failed."
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
