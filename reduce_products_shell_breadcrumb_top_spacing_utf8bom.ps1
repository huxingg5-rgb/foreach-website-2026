param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"

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

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  'padding-top:\s*50px\s*!important;',
  'padding-top: 28px !important;',
  1
)

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  'padding-top:\s*39px\s*!important;',
  'padding-top: 22px !important;',
  1
)

if ($content -eq $original) {
  throw "The expected 50px / 39px breadcrumb spacing was not found. No changes were made."
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Breadcrumb spacing updated:" -ForegroundColor Cyan
Write-Host "Desktop top: 28px"
Write-Host "Desktop bottom: 18px"
Write-Host "Mobile top: 22px"
Write-Host "Mobile bottom: 15px"
Write-Host ""
Write-Host "Only product center and product detail pages are affected." -ForegroundColor Cyan

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
