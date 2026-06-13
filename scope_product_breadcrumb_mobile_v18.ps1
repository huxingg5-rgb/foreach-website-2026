param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$shellCssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"
$detailPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

foreach ($path in @($shellCssPath, $detailPath)) {
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Required file not found: $path"
  }
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

function Add-AttributeToFirstTag {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text,

    [Parameter(Mandatory = $true)]
    [string]$Attribute,

    [Parameter(Mandatory = $true)]
    [string[]]$Tags
  )

  if ($Text -match [Regex]::Escape($Attribute)) {
    return $Text
  }

  foreach ($tag in $Tags) {
    $pattern = '<' + $tag + '\b(?<attrs>[^>]*)>'

    $match = [Regex]::Match(
      $Text,
      $pattern,
      [System.Text.RegularExpressions.RegexOptions]::Singleline
    )

    if ($match.Success) {
      $replacement =
        '<' +
        $tag +
        $match.Groups["attrs"].Value +
        ' ' +
        $Attribute +
        '>'

      return (
        $Text.Substring(0, $match.Index) +
        $replacement +
        $Text.Substring($match.Index + $match.Length)
      )
    }
  }

  throw "Could not find a suitable <main>, <section>, or <div> tag for: $Attribute"
}

function Find-ProductCenterFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Root
  )

  $searchRoots = @(
    (Join-Path $Root "app\products"),
    (Join-Path $Root "components\products")
  )

  $files = @()

  foreach ($searchRoot in $searchRoots) {
    if (Test-Path -LiteralPath $searchRoot) {
      $files += @(
        Get-ChildItem `
          -LiteralPath $searchRoot `
          -Recurse `
          -File `
          -Include "*.tsx", "*.jsx" |
        Where-Object {
          $_.FullName -notmatch '\\detail\\|\\selection\\|\\node_modules\\|\\\.next\\'
        }
      )
    }
  }

  if ($files.Count -eq 0) {
    throw "Could not find product-center TSX/JSX files."
  }

  $scored = @()

  foreach ($file in $files) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    $score = 0

    if ($file.FullName -match '\\app\\products\\page\.tsx$') {
      $score += 100
    }

    if ($file.Name -match 'ProductCenter|ProductsClient|ProductsPage') {
      $score += 80
    }

    if ($content -match '产品中心|Product Center') {
      $score += 30
    }

    if ($content -match '<SitePageShell\b') {
      $score += 20
    }

    if ($content -match '<main\b') {
      $score += 20
    }
    elseif ($content -match '<section\b') {
      $score += 10
    }

    if ($content -match 'data-product-center-page=') {
      $score += 200
    }

    if ($score -gt 0) {
      $scored += [PSCustomObject]@{
        Path = $file.FullName
        Content = $content
        Score = $score
      }
    }
  }

  if ($scored.Count -eq 0) {
    throw "Could not identify the product-center component."
  }

  $sorted = @(
    $scored |
    Sort-Object `
      -Property `
        @{ Expression = { $_.Score }; Descending = $true },
        @{ Expression = { $_.Path }; Descending = $false }
  )

  return $sorted[0]
}

$backupMap = @{}

try {
  # =======================================================
  # 1. Ensure product detail has its own page marker
  # =======================================================

  $detailContent = Get-Content -LiteralPath $detailPath -Raw -Encoding UTF8

  if ($detailContent -notmatch 'data-product-detail-page="true"') {
    $detailContent = Add-AttributeToFirstTag `
      -Text $detailContent `
      -Attribute 'data-product-detail-page="true"' `
      -Tags @("main", "section", "div")
  }

  # =======================================================
  # 2. Find and mark only the real product-center page
  # =======================================================

  $productCenter = Find-ProductCenterFile -Root $projectRoot
  $productCenterPath = $productCenter.Path
  $productCenterContent = $productCenter.Content

  Write-Host ""
  Write-Host "Detected product-center file:" -ForegroundColor Cyan
  Write-Host "  $productCenterPath"
  Write-Host "  Score: $($productCenter.Score)"

  if ($productCenterContent -notmatch 'data-product-center-page="true"') {
    $productCenterContent = Add-AttributeToFirstTag `
      -Text $productCenterContent `
      -Attribute 'data-product-center-page="true"' `
      -Tags @("main", "section", "div")
  }

  # =======================================================
  # 3. Back up all files before writing
  # =======================================================

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

  $pathsToBackup = @(
    $shellCssPath,
    $detailPath,
    $productCenterPath
  ) | Select-Object -Unique

  foreach ($path in $pathsToBackup) {
    $backupPath = "$path.$timestamp.bak"
    Copy-Item -LiteralPath $path -Destination $backupPath -Force
    $backupMap[$path] = $backupPath
    Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
  }

  Write-Utf8NoBom -Path $detailPath -Content $detailContent
  Write-Utf8NoBom -Path $productCenterPath -Content $productCenterContent

  # =======================================================
  # 4. Remove shared V15/V16 override and scope behavior
  # =======================================================

  $shellCss = Get-Content -LiteralPath $shellCssPath -Raw -Encoding UTF8

  foreach ($markers in @(
    @(
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_START */",
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_END */"
    ),
    @(
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V16_START */",
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V16_END */"
    ),
    @(
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V17_START */",
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V17_END */"
    ),
    @(
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V18_START */",
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V18_END */"
    )
  )) {
    $shellCss = Remove-MarkedBlock `
      -Text $shellCss `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $block = @'

/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V18_START */
/* =========================================================
   产品中心 / 产品详情页｜独立控制手机端面包屑

   不再直接修改所有页面共用的 .shellBreadcrumb。
   只有页面内部存在对应 data 标记时才生效。
========================================================= */

@media (max-width: 900px) {
  :global(body:has([data-product-center-page="true"])) .shellBreadcrumb,
  :global(body:has([data-product-detail-page="true"])) .shellBreadcrumb {
    padding-top: 0 !important;
    margin-top: -14px !important;
  }
}

/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V18_END */
'@

  $shellCss =
    $shellCss.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $shellCssPath -Content $shellCss

  Write-Host ""
  Write-Host "Breadcrumb behavior is now scoped to product pages only." -ForegroundColor Green

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
  Write-Host " - Fixed the Sort-Object parser error"
  Write-Host " - Product center has its own page marker"
  Write-Host " - Product detail has its own page marker"
  Write-Host " - Mobile breadcrumb adjustment affects only these two pages"
  Write-Host " - Other SitePageShell pages remain unchanged"
}
catch {
  Write-Host ""
  Write-Host "Update failed: $($_.Exception.Message)" -ForegroundColor Red

  foreach ($path in $backupMap.Keys) {
    if (Test-Path -LiteralPath $backupMap[$path]) {
      Copy-Item `
        -LiteralPath $backupMap[$path] `
        -Destination $path `
        -Force
    }
  }

  if ($backupMap.Count -gt 0) {
    Write-Host "Changed files were restored from backup." -ForegroundColor Yellow
  }

  throw
}
