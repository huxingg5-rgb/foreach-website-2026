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

# 删除之前加入的“单图隐藏左右箭头”规则。
$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_SINGLE_THUMBNAIL_START */" `
  -EndMarker "/* PRODUCT_DETAIL_SINGLE_THUMBNAIL_END */"

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_ALWAYS_SHOW_MAIN_THUMBNAIL_START */" `
  -EndMarker "/* PRODUCT_DETAIL_ALWAYS_SHOW_MAIN_THUMBNAIL_END */"

$content = Remove-MarkedBlock `
  -Text $content `
  -StartMarker "/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_START */" `
  -EndMarker "/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_END */"

$startMarker = "/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_START */"
$endMarker = "/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_END */"

$fixedCss = @'

/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_START */
/* =========================================================
   产品详情页缩略图固定结构

   1. 左右按钮始终保留
   2. 单图和多图时布局宽度不变化
   3. 只有一张图片时，点击按钮仍停留在当前图片
========================================================= */

.thumbnailRow {
  grid-template-columns: 44px minmax(0, 1fr) 44px;
}

.thumbnailArrow {
  display: grid;
  flex: 0 0 44px;
  width: 44px;
  min-width: 44px;
}

.thumbnailList {
  min-width: 0;
}
/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_END */
'@

$fixedPattern =
  [Regex]::Escape($startMarker) +
  '(?s).*?' +
  [Regex]::Escape($endMarker)

if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $fixedPattern)) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $fixedPattern,
    $fixedCss.Trim(),
    1
  )
}
else {
  $content = $content.TrimEnd() + "`r`n" + $fixedCss + "`r`n"
}

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  '\r?\n{3,}',
  "`r`n`r`n"
)

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Thumbnail controls are now fixed:" -ForegroundColor Cyan
Write-Host "1 image  -> left button + thumbnail + right button"
Write-Host "2+ images -> same layout, images can switch"
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
    throw "The thumbnail controls were updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
