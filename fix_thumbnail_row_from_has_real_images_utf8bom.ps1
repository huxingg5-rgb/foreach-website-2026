param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($clientPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

Copy-Item `
  -LiteralPath $clientPath `
  -Destination "$clientPath.$timestamp.bak" `
  -Force

Copy-Item `
  -LiteralPath $cssPath `
  -Destination "$cssPath.$timestamp.bak" `
  -Force

Write-Host "Backups created." -ForegroundColor Yellow

$encoding = New-Object System.Text.UTF8Encoding($false)

# =========================================================
# 1. 修改真实存在的缩略图显示条件
# =========================================================

$clientContent = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8
$originalClientContent = $clientContent

$visibilityPattern = '(?m)^(\s*)const\s+showThumbnailRow\s*=\s*hasRealImages\s*;?\s*$'

if ([System.Text.RegularExpressions.Regex]::IsMatch(
  $clientContent,
  $visibilityPattern
)) {
  $clientContent = [System.Text.RegularExpressions.Regex]::Replace(
    $clientContent,
    $visibilityPattern,
    '${1}const showThumbnailRow = galleryImages.length > 0;',
    1
  )
}
elseif ($clientContent -match '(?m)^\s*const\s+showThumbnailRow\s*=\s*galleryImages\.length\s*>\s*0\s*;?\s*$') {
  Write-Host "Thumbnail visibility logic is already correct." -ForegroundColor Cyan
}
else {
  $matches = Select-String `
    -InputObject $clientContent `
    -Pattern "showThumbnailRow|hasRealImages|galleryImages" `
    -AllMatches

  throw "Could not find 'const showThumbnailRow = hasRealImages'. No changes were made."
}

if ($clientContent -ne $originalClientContent) {
  [System.IO.File]::WriteAllText(
    $clientPath,
    $clientContent,
    $encoding
  )

  Write-Host "Updated: $clientPath" -ForegroundColor Green
}

# =========================================================
# 2. 单张主图时保留一个缩略图，隐藏左右箭头
# =========================================================

$cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$startMarker = "/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_START */"
$endMarker = "/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_END */"

$cssBlock = @'

/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_START */
/* =========================================================
   产品详情页单图缩略图

   1. 只要图库中有主图，就显示缩略图
   2. 只有一张图时隐藏左右箭头
   3. 单张缩略图保持 96px，不拉伸
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
/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_END */
'@

$cssPattern =
  [Regex]::Escape($startMarker) +
  '(?s).*?' +
  [Regex]::Escape($endMarker)

if ([System.Text.RegularExpressions.Regex]::IsMatch(
  $cssContent,
  $cssPattern
)) {
  $cssContent = [System.Text.RegularExpressions.Regex]::Replace(
    $cssContent,
    $cssPattern,
    $cssBlock.Trim(),
    1
  )
}
else {
  $cssContent =
    $cssContent.TrimEnd() +
    "`r`n" +
    $cssBlock +
    "`r`n"
}

[System.IO.File]::WriteAllText(
  $cssPath,
  $cssContent,
  $encoding
)

Write-Host "Updated: $cssPath" -ForegroundColor Green

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
  Write-Host "Removed stale .next cache." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Thumbnail rule corrected:" -ForegroundColor Cyan
Write-Host "Main image exists -> show thumbnail row"
Write-Host "Only one image -> show one thumbnail and hide arrows"
Write-Host "Multiple images -> keep the existing gallery behavior"
Write-Host ""
Write-Host "SitePageShell, breadcrumb, product center, and product text layout were not changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The thumbnail rule was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
