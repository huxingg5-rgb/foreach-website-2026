param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

$shellCssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"
$breadcrumbCssPath = Join-Path $projectRoot "components\common\SiteBreadcrumb.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($shellCssPath, $breadcrumbCssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }

  Copy-Item `
    -LiteralPath $filePath `
    -Destination "$filePath.$timestamp.bak" `
    -Force

  Write-Host "Backup created: $filePath.$timestamp.bak" -ForegroundColor Yellow
}

# =========================================================
# 1. SitePageShell:
#    remove spacing below breadcrumb.
# =========================================================

$shellCss = Get-Content -LiteralPath $shellCssPath -Raw -Encoding UTF8

$shellCss = [System.Text.RegularExpressions.Regex]::Replace(
  $shellCss,
  '--site-shell-content-gap:\s*32px;',
  '--site-shell-content-gap: 0;'
)

$shellCss = [System.Text.RegularExpressions.Regex]::Replace(
  $shellCss,
  '--site-shell-content-gap:\s*24px;',
  '--site-shell-content-gap: 0;'
)

$shellCss = [System.Text.RegularExpressions.Regex]::Replace(
  $shellCss,
  'padding-top:\s*var\(--site-shell-content-gap\);',
  'padding-top: 0;'
)

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($shellCssPath, $shellCss, $encoding)

Write-Host "Updated: $shellCssPath" -ForegroundColor Green

# =========================================================
# 2. SiteBreadcrumb:
#    move the former content gap above breadcrumb text.
#
#    Desktop:
#    original top 18 + former gap 32 = 50
#    bottom remains 18
#
#    Mobile:
#    original top 15 + former gap 24 = 39
#    bottom remains 15
# =========================================================

$breadcrumbCss = Get-Content -LiteralPath $breadcrumbCssPath -Raw -Encoding UTF8

$breadcrumbCss = [System.Text.RegularExpressions.Regex]::Replace(
  $breadcrumbCss,
  'padding:\s*18px\s+0;',
  'padding: 50px 0 18px;',
  1
)

$breadcrumbCss = [System.Text.RegularExpressions.Regex]::Replace(
  $breadcrumbCss,
  'padding:\s*15px\s+0;',
  'padding: 39px 0 15px;',
  1
)

[System.IO.File]::WriteAllText(
  $breadcrumbCssPath,
  $breadcrumbCss,
  $encoding
)

Write-Host "Updated: $breadcrumbCssPath" -ForegroundColor Green

Write-Host ""
Write-Host "Spacing was moved above the breadcrumb text." -ForegroundColor Cyan
Write-Host ""
Write-Host "Desktop:" -ForegroundColor Cyan
Write-Host "  Above breadcrumb text: 50px"
Write-Host "  Below breadcrumb text: 18px"
Write-Host "  Breadcrumb to page content: 0px"
Write-Host ""
Write-Host "Mobile:" -ForegroundColor Cyan
Write-Host "  Above breadcrumb text: 39px"
Write-Host "  Below breadcrumb text: 15px"
Write-Host "  Breadcrumb to page content: 0px"

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
