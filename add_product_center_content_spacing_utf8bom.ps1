param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "app\products\products.css"

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

$startMarker = "/* FOREACH_PRODUCT_CENTER_BREADCRUMB_CONTENT_GAP_START */"
$endMarker = "/* FOREACH_PRODUCT_CENTER_BREADCRUMB_CONTENT_GAP_END */"

$cssBlock = @'

/* FOREACH_PRODUCT_CENTER_BREADCRUMB_CONTENT_GAP_START */
/* 产品中心：面包屑与搜索区域之间保留 32px 间距 */
.products-selection-page > .container > nav[aria-label] {
  margin-bottom: 32px;
}
/* FOREACH_PRODUCT_CENTER_BREADCRUMB_CONTENT_GAP_END */
'@

$pattern = [Regex]::Escape($startMarker) + '(?s).*?' + [Regex]::Escape($endMarker)

if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $pattern)) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $pattern,
    $cssBlock.Trim(),
    1
  )

  Write-Host "Existing product-center spacing rule was updated." -ForegroundColor Cyan
}
else {
  $content = $content.TrimEnd() + "`r`n" + $cssBlock + "`r`n"
  Write-Host "Product-center spacing rule was added." -ForegroundColor Cyan
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Added 32px between the product-center breadcrumb and search area." -ForegroundColor Cyan
Write-Host "No breadcrumb, search, category, filter, or card styles were changed." -ForegroundColor Cyan

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
    throw "The spacing was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
