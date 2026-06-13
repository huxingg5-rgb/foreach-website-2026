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
$original = $content

# Desktop: match fixed SiteHeader height.
$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  '(\.products-selection-page\s*\{\s*padding-top:\s*)112px(\s*!important;\s*\})',
  '${1}82px${2}',
  1
)

# Mobile: match fixed mobile header height.
$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  '(@media\s*\(max-width:\s*760px\)\s*\{\s*\.products-selection-page\s*\{\s*padding-top:\s*)88px(\s*!important;\s*\})',
  '${1}70px${2}',
  1
)

if ($content -eq $original) {
  throw "The expected 112px / 88px product page offsets were not found. No changes were made."
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Product center top offset updated:" -ForegroundColor Cyan
Write-Host "Desktop: 112px -> 82px"
Write-Host "Mobile: 88px -> 70px"
Write-Host ""
Write-Host "No search, tabs, filters, cards, or breadcrumb styles were changed." -ForegroundColor Cyan

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
    throw "The product page offset was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
