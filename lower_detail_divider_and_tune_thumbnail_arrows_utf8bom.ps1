param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

if (-not (Test-Path -LiteralPath $cssPath)) {
  throw "File not found: $cssPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$cssPath.$timestamp.bak"

Copy-Item -LiteralPath $cssPath -Destination $backupPath -Force
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

$content = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

function Remove-MarkedBlock {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text,

    [Parameter(Mandatory = $true)]
    [string]$StartMarker,

    [Parameter(Mandatory = $true)]
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

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_START */" `
  -EndMarker "/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_END */"

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_LINE_AND_ARROW_TUNE_START */" `
  -EndMarker "/* PRODUCT_DETAIL_LINE_AND_ARROW_TUNE_END */"

$fixBlock = @'

/* PRODUCT_DETAIL_LINE_AND_ARROW_TUNE_START */
/* =========================================================
   产品详情页｜横线、型号区与缩略图箭头微调

   1. operationArea 整体下移 120px
   2. 横线、型号和配置选择一起下降
   3. 四个申请按钮继续贴在右栏底部
   4. 左右箭头符号加粗并向下微调
========================================================= */

.productTop {
  align-items: stretch;
}

.productInfo {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

/*
 * 用 margin-top 移动整个区域，
 * 因此上边线也会随型号区一起下降。
 */
.operationArea {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-top: 120px !important;
  padding-top: 0 !important;
  box-sizing: border-box;
}

/* 四个申请按钮保持在右侧栏底部 */
.actionRow,
.actionGrid {
  flex: 0 0 auto;
  margin-top: auto !important;
}

/* 缩略图区域固定为：左按钮 / 图片 / 右按钮 */
.thumbnailRow {
  display: grid !important;
  grid-template-columns: 28px minmax(0, 1fr) 28px !important;
  width: 100% !important;
  align-items: stretch;
  column-gap: 6px !important;
  box-sizing: border-box;
}

.thumbnailRow > .thumbnailList {
  grid-column: 2 !important;
  width: 100% !important;
  min-width: 0 !important;
  overflow: hidden;
}

.thumbnailRow > .thumbnailArrow:first-child,
.thumbnailRow > button.thumbnailArrow:first-child {
  grid-column: 1 !important;
}

.thumbnailRow > .thumbnailArrow:last-child,
.thumbnailRow > button.thumbnailArrow:last-child {
  grid-column: 3 !important;
}

/*
 * 按钮外框保持固定宽度；
 * 通过字号、字重和 text-shadow 让 ‹ › 更粗。
 */
.thumbnailRow > .thumbnailArrow,
.thumbnailRow > button.thumbnailArrow,
.thumbnailArrow {
  display: grid !important;
  width: 28px !important;
  min-width: 28px !important;
  max-width: 28px !important;
  height: 100% !important;
  min-height: 100% !important;
  padding: 2px 0 0 !important;
  margin: 0 !important;
  flex: 0 0 28px !important;
  place-items: center;
  justify-self: stretch;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff !important;
  color: #173368 !important;
  box-sizing: border-box;

  font-family: Arial, sans-serif;
  font-size: 18px !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  text-shadow:
    0.35px 0 currentColor,
    -0.35px 0 currentColor;
}

.thumbnailArrow:hover,
.thumbnailArrow:active {
  background: #173368 !important;
  color: #09e9b4 !important;
}

.thumbnailArrow:focus,
.thumbnailArrow:focus-visible {
  background: #ffffff !important;
  color: #173368 !important;
  outline: 1px solid #173368;
  outline-offset: -1px;
}

@media (max-width: 980px) {
  .productInfo {
    min-height: auto;
  }

  .operationArea {
    display: block;
    flex: none;
    margin-top: 24px !important;
    padding-top: 0 !important;
  }

  .actionRow,
  .actionGrid {
    margin-top: 18px !important;
  }
}

/* PRODUCT_DETAIL_LINE_AND_ARROW_TUNE_END */
'@

$content = $content.TrimEnd() + "`r`n" + $fixBlock + "`r`n"

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  '\r?\n{3,}',
  "`r`n`r`n"
)

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Applied:" -ForegroundColor Cyan
Write-Host "1. Divider line and model area moved down together by 120px."
Write-Host "2. Thumbnail arrow symbols are thicker."
Write-Host "3. Arrow symbols are shifted down by 2px."
Write-Host "4. Arrow button widths remain fixed at 28px."
Write-Host ""
Write-Host "Only product-detail.module.css was changed." -ForegroundColor Cyan

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
    throw "The detail styles were updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
