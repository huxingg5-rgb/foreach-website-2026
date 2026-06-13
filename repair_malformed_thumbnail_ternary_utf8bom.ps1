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
# 1. Repair the malformed thumbnail declaration.
#
# Supports both:
#
# const showThumbnailRow = galleryImages.length > 0;
#   ? realImages.length > 1
#   : true;
#
# and the original:
#
# const showThumbnailRow = hasRealImages
#   ? realImages.length > 1
#   : true;
# =========================================================

$clientContent = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8
$originalClientContent = $clientContent

$patterns = @(
  '(?ms)^(\s*)const\s+showThumbnailRow\s*=\s*galleryImages\.length\s*>\s*0\s*;\s*\?\s*realImages\.length\s*>\s*1\s*:\s*true\s*;',
  '(?ms)^(\s*)const\s+showThumbnailRow\s*=\s*hasRealImages\s*\?\s*realImages\.length\s*>\s*1\s*:\s*true\s*;',
  '(?m)^(\s*)const\s+showThumbnailRow\s*=\s*hasRealImages\s*;?\s*$'
)

$repaired = $false

foreach ($pattern in $patterns) {
  if ([System.Text.RegularExpressions.Regex]::IsMatch(
    $clientContent,
    $pattern
  )) {
    $clientContent = [System.Text.RegularExpressions.Regex]::Replace(
      $clientContent,
      $pattern,
      '${1}const showThumbnailRow = galleryImages.length > 0;',
      1
    )

    $repaired = $true
    break
  }
}

if (-not $repaired) {
  if ($clientContent -match '(?m)^\s*const\s+showThumbnailRow\s*=\s*galleryImages\.length\s*>\s*0\s*;\s*$') {
    Write-Host "Thumbnail declaration is already correct." -ForegroundColor Cyan
  }
  else {
    throw "Could not find the showThumbnailRow declaration. No changes were made."
  }
}

# Remove any orphaned ternary lines left immediately after the declaration.
$clientContent = [System.Text.RegularExpressions.Regex]::Replace(
  $clientContent,
  '(?ms)(const\s+showThumbnailRow\s*=\s*galleryImages\.length\s*>\s*0\s*;)\s*\?\s*realImages\.length\s*>\s*1\s*:\s*true\s*;',
  '$1',
  1
)

[System.IO.File]::WriteAllText(
  $clientPath,
  $clientContent,
  $encoding
)

Write-Host "Updated: $clientPath" -ForegroundColor Green

# =========================================================
# 2. Ensure the single-image thumbnail layout exists.
# =========================================================

$cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$startMarker = "/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_START */"
$endMarker = "/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_END */"

$cssBlock = @'

/* PRODUCT_DETAIL_SINGLE_IMAGE_THUMBNAIL_START */
/* 只有一张主图时仍显示缩略图，但隐藏左右箭头 */
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
Write-Host "Thumbnail logic repaired:" -ForegroundColor Cyan
Write-Host "1 image  -> show one thumbnail, hide arrows"
Write-Host "2+ images -> show thumbnails with the existing gallery controls"
Write-Host ""
Write-Host "SitePageShell, breadcrumb, and product center were not changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The syntax was repaired, but npm run build still failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
