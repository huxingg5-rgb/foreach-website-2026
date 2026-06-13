param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

if (-not (Test-Path -LiteralPath $cssPath)) {
  throw "File not found: $cssPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$cssPath.$timestamp.bak"

Copy-Item -LiteralPath $cssPath -Destination $backupPath -Force
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

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

  return [Regex]::Replace($Text, $pattern, "")
}

try {
  $css = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  if ($css -notmatch '(?m)^\s*\.shellBreadcrumb\s*\{') {
    throw "Could not find '.shellBreadcrumb' in SitePageShell.module.css."
  }

  Write-Host ""
  Write-Host "Found the actual breadcrumb class: .shellBreadcrumb" -ForegroundColor Green

  $startMarker = "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_START */"
  $endMarker = "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_END */"

  $css = Remove-MarkedBlock `
    -Text $css `
    -StartMarker $startMarker `
    -EndMarker $endMarker

  $block = @'

/* MOBILE_SHELL_BREADCRUMB_TOP_V15_START */
/* 手机端：Top 栏下方直接进入面包屑，不保留顶部空白 */
@media (max-width: 900px) {
  .shellBreadcrumb {
    padding-top: 0 !important;
  }
}
/* MOBILE_SHELL_BREADCRUMB_TOP_V15_END */
'@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $cssPath -Content $css

  Write-Host "Updated mobile .shellBreadcrumb padding-top to 0." -ForegroundColor Green
  Write-Host "Desktop spacing remains unchanged." -ForegroundColor Cyan
  Write-Host "Product center and product detail pages will both use this change." -ForegroundColor Cyan

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
      throw "Build failed."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Completed:" -ForegroundColor Green
  Write-Host " - Mobile breadcrumb moved upward"
  Write-Host " - Top bar and breadcrumb no longer have the extra 22px gap"
  Write-Host " - Breadcrumb bottom padding remains unchanged"
}
catch {
  Write-Host ""
  Write-Host "Update failed. Restoring backup..." -ForegroundColor Yellow

  Copy-Item `
    -LiteralPath $backupPath `
    -Destination $cssPath `
    -Force

  Write-Host "The CSS file was restored." -ForegroundColor Yellow
  throw
}
