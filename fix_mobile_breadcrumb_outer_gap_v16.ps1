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
  throw "Required file not found: $cssPath"
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
  Write-Host "Found actual breadcrumb class: .shellBreadcrumb" -ForegroundColor Green
  Write-Host "Applying a 14px upward offset on mobile to cancel the outer gray spacer." -ForegroundColor Cyan

  foreach ($markers in @(
    @(
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_START */",
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_END */"
    ),
    @(
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V16_START */",
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V16_END */"
    )
  )) {
    $css = Remove-MarkedBlock `
      -Text $css `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $block = @'

/* MOBILE_SHELL_BREADCRUMB_TOP_V16_START */
/* =========================================================
   手机端 Top 栏与面包屑之间的灰色空白修正

   说明：
   1. 面包屑自身的 padding-top 已经不是问题
   2. 截图中的空白来自面包屑外层约 14px 的占位
   3. 使用负外边距抵消该占位，不改变面包屑内部高度
   4. 产品中心和产品详情页共用 SitePageShell，因此同时生效
========================================================= */

@media (max-width: 900px) {
  .shellBreadcrumb {
    padding-top: 0 !important;
    margin-top: -14px !important;
  }
}

/* MOBILE_SHELL_BREADCRUMB_TOP_V16_END */
'@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $cssPath -Content $css

  Write-Host "Updated .shellBreadcrumb with margin-top: -14px on mobile." -ForegroundColor Green

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
  Write-Host " - Mobile gray gap above breadcrumb is offset by 14px"
  Write-Host " - Breadcrumb internal spacing is unchanged"
  Write-Host " - Product center and product detail pages both inherit the fix"
  Write-Host " - Desktop layout remains unchanged"
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
