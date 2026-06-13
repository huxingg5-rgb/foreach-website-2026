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

$startMarker = "/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_START */"
$endMarker = "/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_END */"

$cssBlock = @'

/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_START */
/* =========================================================
   产品详情首屏左右底部对齐

   目标：
   1. 左侧缩略图最底部
   2. 右侧资料申请按钮最底部
   两者保持同一水平线。

   原理：
   - productTop 两列等高
   - productInfo 使用纵向 flex
   - operationArea 自动推到底部
========================================================= */

.productTop {
  align-items: stretch;
}

.productInfo {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

.operationArea {
  margin-top: auto;
}

/*
 * 兼容当前两种按钮容器命名。
 * 不改变按钮尺寸，只保证按钮组自身贴在右栏底部。
 */
.actionRow,
.actionGrid {
  flex: 0 0 auto;
}

@media (max-width: 980px) {
  /*
   * 单列布局时恢复自然文档流，
   * 避免移动端出现被强行拉长的空白。
   */
  .productInfo {
    min-height: auto;
  }

  .operationArea {
    margin-top: 0;
  }
}
/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_END */
'@

$pattern =
  [Regex]::Escape($startMarker) +
  '(?s).*?' +
  [Regex]::Escape($endMarker)

if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $pattern)) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $pattern,
    $cssBlock.Trim(),
    1
  )

  Write-Host "Existing bottom-alignment rule was updated." -ForegroundColor Cyan
}
else {
  $content = $content.TrimEnd() + "`r`n" + $cssBlock + "`r`n"
  Write-Host "Bottom-alignment rule was added." -ForegroundColor Cyan
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Desktop alignment:" -ForegroundColor Cyan
Write-Host "Thumbnail bottom = application-button bottom"
Write-Host ""
Write-Host "No TSX, thumbnail logic, breadcrumb, SitePageShell, or product-center files were changed." -ForegroundColor Cyan

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
    throw "The alignment rule was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
