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

# 清理前面针对这两处添加的覆盖规则，避免叠加。
$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_START */" `
  -EndMarker "/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_END */"

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_START */" `
  -EndMarker "/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_END */"

$fixBlock = @'

/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_START */
/* =========================================================
   产品详情页最终对齐修正

   1. 左右缩略图箭头固定同宽
   2. 右侧箭头不再拉伸
   3. 型号与配置选择整体向下移动 120px
   4. 下方四个申请按钮继续贴在右栏底部
========================================================= */

/* ---------- 首屏左右两栏 ---------- */

.productTop {
  align-items: stretch;
}

.productInfo {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

/* ---------- 型号与配置选择下移 ---------- */

.operationArea {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-top: 0 !important;
  padding-top: 120px !important;
  box-sizing: border-box;
}

/*
 * 型号行通常是 operationArea 的第一个直接子元素。
 * 保持它和“配置选择”按钮在同一行。
 */
.operationArea > :first-child {
  flex: 0 0 auto;
}

/* 四个申请按钮继续贴在最底部 */
.actionRow,
.actionGrid {
  flex: 0 0 auto;
  margin-top: auto !important;
}

/* ---------- 缩略图固定三栏结构 ---------- */

.thumbnailRow {
  display: grid !important;
  grid-template-columns: 28px minmax(0, 1fr) 28px !important;
  width: 100% !important;
  align-items: stretch;
  column-gap: 6px !important;
  box-sizing: border-box;
}

/* 左箭头固定在第一栏 */
.thumbnailRow > .thumbnailArrow:first-child,
.thumbnailRow > button.thumbnailArrow:first-child {
  grid-column: 1 !important;
}

/* 缩略图区域固定在中间栏 */
.thumbnailRow > .thumbnailList {
  grid-column: 2 !important;
  width: 100% !important;
  min-width: 0 !important;
  overflow: hidden;
}

/* 右箭头固定在第三栏 */
.thumbnailRow > .thumbnailArrow:last-child,
.thumbnailRow > button.thumbnailArrow:last-child {
  grid-column: 3 !important;
}

/* 两侧按钮始终保持相同窄宽度 */
.thumbnailRow > .thumbnailArrow,
.thumbnailRow > button.thumbnailArrow,
.thumbnailArrow {
  display: grid !important;
  width: 28px !important;
  min-width: 28px !important;
  max-width: 28px !important;
  height: 100% !important;
  min-height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  flex: 0 0 28px !important;
  place-items: center;
  justify-self: stretch;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff !important;
  color: #173368 !important;
  box-sizing: border-box;
}

/* 只有悬停和按下时变为品牌深蓝 */
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

/* ---------- 平板与移动端恢复自然布局 ---------- */

@media (max-width: 980px) {
  .productInfo {
    min-height: auto;
  }

  .operationArea {
    display: block;
    flex: none;
    padding-top: 24px !important;
  }

  .actionRow,
  .actionGrid {
    margin-top: 18px !important;
  }
}

/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_END */
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
Write-Host "1. Both thumbnail arrows are fixed at 28px."
Write-Host "2. The right arrow can no longer stretch."
Write-Host "3. Model row moved down by 120px."
Write-Host "4. Application buttons remain aligned at the bottom."
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
    throw "The layout was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
