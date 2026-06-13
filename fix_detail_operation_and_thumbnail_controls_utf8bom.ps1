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

# 清理前面针对这两处布局添加的覆盖块，避免规则叠加。
$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_START */" `
  -EndMarker "/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_END */"

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_START */" `
  -EndMarker "/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_END */"

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_START */" `
  -EndMarker "/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_END */"

$fixBlock = @'

/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_START */
/* =========================================================
   产品详情页｜操作区域与缩略图控制修正

   1. 型号与“配置选择”保持在正常内容位置
   2. 只把下面的资料申请按钮推到右栏底部
   3. 申请按钮底边与左侧缩略图区底边对齐
   4. 左右缩略图箭头固定同宽，不随图片数量拉伸
========================================================= */

/* ---------- 右侧信息与操作区 ---------- */

.productTop {
  align-items: stretch;
}

.productInfo {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

/*
 * operationArea 自身占据右栏剩余高度，
 * 但不再整体 margin-top: auto，
 * 因此型号与配置选择不会被推到最底部。
 */
.operationArea {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-top: 24px !important;
}

/*
 * 仅将最下面的申请按钮组推到底部。
 * 兼容当前可能使用的两种 class 命名。
 */
.actionRow,
.actionGrid {
  flex: 0 0 auto;
  margin-top: auto !important;
}

/* ---------- 左侧缩略图控制 ---------- */

.thumbnailRow {
  display: grid !important;
  grid-template-columns: 44px minmax(0, 1fr) 44px !important;
  width: 100%;
  align-items: stretch;
  column-gap: 8px;
}

/* 左右按钮固定为完全相同的尺寸 */
.thumbnailArrow,
.thumbnailArrow:first-child,
.thumbnailArrow:last-child {
  display: grid !important;
  width: 44px !important;
  min-width: 44px !important;
  max-width: 44px !important;
  height: auto;
  padding: 0 !important;
  flex: 0 0 44px !important;
  place-items: center;
  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff !important;
  color: #173368 !important;
  box-sizing: border-box;
}

/* 只有悬停或按下时才使用品牌深蓝 */
.thumbnailArrow:hover,
.thumbnailArrow:active {
  background: #173368 !important;
  color: #09e9b4 !important;
}

/* 点击后获得焦点时，不保持整块深蓝 */
.thumbnailArrow:focus:not(:hover),
.thumbnailArrow:focus-visible:not(:hover) {
  background: #ffffff !important;
  color: #173368 !important;
  outline: 1px solid #173368;
  outline-offset: -1px;
}

.thumbnailList {
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

/* 单张缩略图仍保持正常尺寸，不拉伸填满中间区域 */
.thumbnailList .thumbnail {
  width: 96px;
  min-width: 96px;
}

/* ---------- 平板和移动端恢复自然文档流 ---------- */

@media (max-width: 980px) {
  .productInfo {
    min-height: auto;
  }

  .operationArea {
    display: block;
    flex: none;
    margin-top: 24px !important;
  }

  .actionRow,
  .actionGrid {
    margin-top: 18px !important;
  }
}

/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_END */
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
Write-Host "Fixed:" -ForegroundColor Cyan
Write-Host "1. Configuration button stays with the model row."
Write-Host "2. Only the application-button row is pushed to the bottom."
Write-Host "3. Left and right thumbnail arrows have the same fixed width."
Write-Host "4. Arrow focus no longer stays dark blue."
Write-Host ""
Write-Host "No TSX, breadcrumb, SitePageShell, or product-center files were changed." -ForegroundColor Cyan

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
    throw "The detail layout was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
