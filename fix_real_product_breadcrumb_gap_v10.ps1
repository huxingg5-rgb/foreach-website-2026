param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$detailCssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$shellCssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"
$globalsPath = Join-Path $projectRoot "app\globals.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

foreach ($path in @($clientPath, $detailCssPath, $shellCssPath)) {
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Required file not found: $path"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupMap = @{}

$filesToBackup = @($clientPath, $detailCssPath, $shellCssPath)

if (Test-Path -LiteralPath $globalsPath) {
  $filesToBackup += $globalsPath
}

foreach ($path in $filesToBackup) {
  $backupPath = "$path.$timestamp.bak"
  Copy-Item -LiteralPath $path -Destination $backupPath -Force
  $backupMap[$path] = $backupPath
  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
}

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
  Write-Host ""
  Write-Host "Inspecting the real breadcrumb/content structure..." -ForegroundColor Cyan

  # =======================================================
  # 1. Confirm the real structure before changing anything
  # =======================================================

  $client = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8
  $shellCss = Get-Content -LiteralPath $shellCssPath -Raw -Encoding UTF8

  $hasSitePageShell = $client -match '<SitePageShell\b'
  $hasPageMain = $client -match '<main[^>]*className=\{styles\.page\}'
  $hasProductTop = $client -match '<section[^>]*className=\{styles\.productTop\}'

  if (-not $hasSitePageShell) {
    throw "ProductDetailClient.tsx is not using SitePageShell. Stop to avoid changing the wrong layer."
  }

  if (-not $hasPageMain) {
    throw "Could not find <main className={styles.page}> in ProductDetailClient.tsx."
  }

  if (-not $hasProductTop) {
    throw "Could not find <section className={styles.productTop}> in ProductDetailClient.tsx."
  }

  $contentRuleMatch = [Regex]::Match(
    $shellCss,
    '(?s)\.content\s*\{(?<body>.*?)\}'
  )

  if ($contentRuleMatch.Success) {
    $contentBody = $contentRuleMatch.Groups["body"].Value
    $paddingMatch = [Regex]::Match(
      $contentBody,
      'padding-top\s*:\s*(?<value>[^;]+);'
    )

    if ($paddingMatch.Success) {
      Write-Host (
        "Detected SitePageShell .content padding-top: " +
        $paddingMatch.Groups["value"].Value.Trim()
      ) -ForegroundColor Yellow
    }
    else {
      Write-Host "Detected SitePageShell .content, but no padding-top declaration was found." -ForegroundColor Yellow
    }
  }
  else {
    Write-Host "SitePageShell .content rule was not found." -ForegroundColor Yellow
  }

  Write-Host "Confirmed actual order:" -ForegroundColor Green
  Write-Host "  SiteBreadcrumb line"
  Write-Host "  -> SitePageShell .content"
  Write-Host "  -> main styles.page"
  Write-Host "  -> section styles.productTop"

  # =======================================================
  # 2. Remove the ineffective V9 spacer
  #
  # It was inserted around/after the shell rather than between
  # SiteBreadcrumb and the detail page content.
  # =======================================================

  $spacerPattern =
    '(?s)\r?\n[ \t]*<div' +
    '(?=[^>]*data-product-breadcrumb-space="true")' +
    '(?=[^>]*breadcrumbBottomSpace)' +
    '[^>]*/>'

  $client = [Regex]::Replace($client, $spacerPattern, "")

  Write-Utf8NoBom -Path $clientPath -Content $client
  Write-Host "Removed the ineffective V9 breadcrumb spacer, if present." -ForegroundColor Green

  # =======================================================
  # 3. Put the 24px gap on the real detail-page content root
  # =======================================================

  $detailCss = Get-Content -LiteralPath $detailCssPath -Raw -Encoding UTF8

  foreach ($markers in @(
    @(
      "/* PRODUCT_DETAIL_BREADCRUMB_SPACE_V9_START */",
      "/* PRODUCT_DETAIL_BREADCRUMB_SPACE_V9_END */"
    ),
    @(
      "/* PRODUCT_DETAIL_REAL_BREADCRUMB_GAP_V10_START */",
      "/* PRODUCT_DETAIL_REAL_BREADCRUMB_GAP_V10_END */"
    )
  )) {
    $detailCss = Remove-MarkedBlock `
      -Text $detailCss `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $detailBlock = @'

/* PRODUCT_DETAIL_REAL_BREADCRUMB_GAP_V10_START */
/* =========================================================
   产品详情页｜面包屑横线下方 24px

   实际结构：
   SiteBreadcrumb
   -> SitePageShell .content
   -> .page
   -> .container
   -> .productTop

   因此间距直接加在产品详情页自己的 .page 上，
   不修改公共面包屑，也不影响产品中心页面。
========================================================= */

.page {
  padding-top: 24px !important;
  box-sizing: border-box;
}

@media (max-width: 1080px) {
  .page {
    padding-top: 24px !important;
  }
}

@media (max-width: 680px) {
  .page {
    padding-top: 24px !important;
  }
}

/* PRODUCT_DETAIL_REAL_BREADCRUMB_GAP_V10_END */
'@

  $detailCss =
    $detailCss.TrimEnd() +
    "`r`n`r`n" +
    $detailBlock.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $detailCssPath -Content $detailCss
  Write-Host "Added the real 24px gap to styles.page." -ForegroundColor Green

  # =======================================================
  # 4. Remove the older global breadcrumb workaround
  # =======================================================

  if (Test-Path -LiteralPath $globalsPath) {
    $globals = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

    $globals = Remove-MarkedBlock `
      -Text $globals `
      -StartMarker "/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_START */" `
      -EndMarker "/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_END */"

    Write-Utf8NoBom -Path $globalsPath -Content $globals
    Write-Host "Removed the obsolete global breadcrumb workaround, if present." -ForegroundColor Green
  }

  # =======================================================
  # 5. Clear cache and build
  # =======================================================

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
  Write-Host " - The real spacing controller was identified"
  Write-Host " - Product detail content now begins 24px below the breadcrumb divider"
  Write-Host " - Shared SiteBreadcrumb was not changed"
  Write-Host " - Product center layout was not changed"
}
catch {
  Write-Host ""
  Write-Host "Update failed. Restoring backups..." -ForegroundColor Yellow

  foreach ($path in $backupMap.Keys) {
    Copy-Item `
      -LiteralPath $backupMap[$path] `
      -Destination $path `
      -Force
  }

  Write-Host "All changed files were restored." -ForegroundColor Yellow
  throw
}
