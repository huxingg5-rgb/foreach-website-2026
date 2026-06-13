param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$globalsPath = Join-Path $projectRoot "app\globals.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

foreach ($path in @($clientPath, $cssPath, $globalsPath)) {
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Required file not found: $path"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backups = @{}

foreach ($path in @($clientPath, $cssPath, $globalsPath)) {
  $backupPath = "$path.$timestamp.bak"
  Copy-Item -LiteralPath $path -Destination $backupPath -Force
  $backups[$path] = $backupPath
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
  Write-Host "Adding a real 24px spacer below the breadcrumb divider..." -ForegroundColor Cyan

  # =======================================================
  # 1. ProductDetailClient.tsx
  #    Insert a real DOM spacer directly after breadcrumb.
  #    This is more reliable than margin-bottom.
  # =======================================================

  $client = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8

  if ($client -notmatch 'data-product-breadcrumb-space="true"') {
    $breadcrumbShellPattern =
      '(?s)(?<shell><div\s+data-product-breadcrumb-shell="true"[^>]*>.*?</div>)'

    if ([Regex]::IsMatch($client, $breadcrumbShellPattern)) {
      $client = [Regex]::Replace(
        $client,
        $breadcrumbShellPattern,
        {
          param($match)

          $shell = $match.Groups["shell"].Value
          return (
            $shell +
            "`r`n" +
            '      <div' +
            "`r`n" +
            '        aria-hidden="true"' +
            "`r`n" +
            '        className={styles.breadcrumbBottomSpace}' +
            "`r`n" +
            '        data-product-breadcrumb-space="true"' +
            "`r`n" +
            '      />'
          )
        },
        1
      )
    }
    else {
      throw @"
Could not find:
<div data-product-breadcrumb-shell="true">...</div>

Please confirm ProductDetailClient.tsx still contains the breadcrumb wrapper added previously.
"@
    }
  }

  if ($client -notmatch 'data-product-breadcrumb-space="true"') {
    throw "The breadcrumb spacer could not be inserted."
  }

  Write-Utf8NoBom -Path $clientPath -Content $client
  Write-Host "Inserted the 24px breadcrumb spacer element." -ForegroundColor Green

  # =======================================================
  # 2. product-detail.module.css
  # =======================================================

  $css = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_BREADCRUMB_SPACE_V9_START */"
  $endMarker = "/* PRODUCT_DETAIL_BREADCRUMB_SPACE_V9_END */"

  $css = Remove-MarkedBlock `
    -Text $css `
    -StartMarker $startMarker `
    -EndMarker $endMarker

  $cssBlock = @'

/* PRODUCT_DETAIL_BREADCRUMB_SPACE_V9_START */
/* =========================================================
   面包屑横线下方固定留白

   不再使用 margin-bottom。
   直接在面包屑与产品主体之间插入一个真实的 24px 高度元素，
   避免 margin 合并、定位或父级布局导致间距失效。
========================================================= */

.breadcrumbBottomSpace {
  display: block !important;
  width: 100% !important;
  height: 24px !important;
  min-height: 24px !important;
  max-height: 24px !important;
  margin: 0 !important;
  padding: 0 !important;
  flex: 0 0 24px !important;
  pointer-events: none !important;
}

/* 桌面端和手机端保持同样的 24px */
@media (max-width: 680px) {
  .breadcrumbBottomSpace {
    height: 24px !important;
    min-height: 24px !important;
    max-height: 24px !important;
    flex-basis: 24px !important;
  }
}

/* PRODUCT_DETAIL_BREADCRUMB_SPACE_V9_END */
'@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $cssBlock.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $cssPath -Content $css
  Write-Host "Added .breadcrumbBottomSpace with a fixed 24px height." -ForegroundColor Green

  # =======================================================
  # 3. globals.css
  #    Remove old 18px margin rule to prevent conflicts.
  # =======================================================

  $globals = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

  $globals = Remove-MarkedBlock `
    -Text $globals `
    -StartMarker "/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_START */" `
    -EndMarker "/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_END */"

  Write-Utf8NoBom -Path $globalsPath -Content $globals
  Write-Host "Removed the old 18px breadcrumb margin rule." -ForegroundColor Green

  # =======================================================
  # 4. Clear cache and build
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
  Write-Host " - Breadcrumb divider remains unchanged"
  Write-Host " - A real 24px blank area is added below the divider"
  Write-Host " - Desktop and mobile use the same 24px spacing"
}
catch {
  Write-Host ""
  Write-Host "Update failed. Restoring backups..." -ForegroundColor Yellow

  foreach ($path in $backups.Keys) {
    Copy-Item `
      -LiteralPath $backups[$path] `
      -Destination $path `
      -Force
  }

  Write-Host "All changed files were restored." -ForegroundColor Yellow
  throw
}
