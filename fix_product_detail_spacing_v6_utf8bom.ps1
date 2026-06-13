param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

$detailClientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$detailCssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$globalsPath = Join-Path $projectRoot "app\globals.css"

foreach ($filePath in @(
  $detailClientPath,
  $detailCssPath,
  $globalsPath
)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupMap = @{}

foreach ($filePath in @(
  $detailClientPath,
  $detailCssPath,
  $globalsPath
)) {
  $backupPath = "$filePath.$timestamp.bak"
  Copy-Item -LiteralPath $filePath -Destination $backupPath -Force
  $backupMap[$filePath] = $backupPath
  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
}

$encoding = New-Object System.Text.UTF8Encoding($false)

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
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
  Write-Host "Applying product detail spacing corrections..." -ForegroundColor Cyan

  # =======================================================
  # 1. ProductDetailClient.tsx
  #    Add stable markers without changing the page structure.
  # =======================================================

  $clientContent = Get-Content `
    -LiteralPath $detailClientPath `
    -Raw `
    -Encoding UTF8

  if ($clientContent -notmatch 'data-product-detail-page=') {
    $clientContent = [Regex]::Replace(
      $clientContent,
      '<main\s+className=\{styles\.page\}>',
      '<main className={styles.page} data-product-detail-page="true">',
      1
    )
  }

  if ($clientContent -notmatch 'data-product-model-row=') {
    $clientContent = [Regex]::Replace(
      $clientContent,
      '<div\s+className=\{styles\.modelLine\}>',
      '<div className={styles.modelLine} data-product-model-row="true">',
      1
    )
  }

  if ($clientContent -notmatch 'data-product-thumb-row=') {
    $clientContent = [Regex]::Replace(
      $clientContent,
      '<div\s+className=\{styles\.thumbRow\}',
      '<div data-product-thumb-row="true" className={styles.thumbRow}',
      1
    )
  }

  if ($clientContent -notmatch 'data-product-breadcrumb-shell=') {
    $breadcrumbPattern = '(?s)(?<indent>^[ \t]*)(?<component><(?:SiteBreadcrumb|Breadcrumb)\b.*?/>)'

    if (-not [Regex]::IsMatch(
      $clientContent,
      $breadcrumbPattern,
      [System.Text.RegularExpressions.RegexOptions]::Multiline
    )) {
      throw "Could not find SiteBreadcrumb or Breadcrumb in ProductDetailClient.tsx."
    }

    $clientContent = [Regex]::Replace(
      $clientContent,
      $breadcrumbPattern,
      {
        param($match)

        $indent = $match.Groups["indent"].Value
        $component = $match.Groups["component"].Value

        return (
          $indent +
          '<div data-product-breadcrumb-shell="true">' +
          "`r`n" +
          $indent +
          "  " +
          $component +
          "`r`n" +
          $indent +
          '</div>'
        )
      },
      [System.Text.RegularExpressions.RegexOptions]::Multiline,
      [TimeSpan]::FromSeconds(3)
    )
  }

  if ($clientContent -notmatch 'data-product-model-row=') {
    throw "The model row marker could not be added."
  }

  if ($clientContent -notmatch 'data-product-thumb-row=') {
    throw "The thumbnail row marker could not be added."
  }

  if ($clientContent -notmatch 'data-product-breadcrumb-shell=') {
    throw "The breadcrumb shell marker could not be added."
  }

  Write-Utf8NoBom `
    -Path $detailClientPath `
    -Content $clientContent

  Write-Host "Updated ProductDetailClient.tsx markers." -ForegroundColor Green

  # =======================================================
  # 2. product-detail.module.css
  # =======================================================

  $detailCss = Get-Content `
    -LiteralPath $detailCssPath `
    -Raw `
    -Encoding UTF8

  $detailStart = "/* PRODUCT_DETAIL_SPACING_CORRECTION_V6_START */"
  $detailEnd = "/* PRODUCT_DETAIL_SPACING_CORRECTION_V6_END */"

  $detailCss = Remove-MarkedBlock `
    -Text $detailCss `
    -StartMarker $detailStart `
    -EndMarker $detailEnd

  $detailBlock = @'

/* PRODUCT_DETAIL_SPACING_CORRECTION_V6_START */
/* =========================================================
   产品详情页本轮修正

   1. 手机端型号、型号值、配置选择保持同一排
   2. 手机端页面紧贴固定 Top 栏
   3. 缩略图内部不留 CSS 空白
   4. 缩略图方框之间保持 14px
========================================================= */

/* 型号区域默认始终是一排 */
.modelLine {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

.modelCodeWrap {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: baseline !important;
  min-width: 0 !important;
  white-space: nowrap !important;
}

.modelLabel,
.modelCode {
  white-space: nowrap !important;
}

/* 缩略图之间是 14px；方框内部不再人为缩小图片 */
.thumbRow {
  gap: 14px !important;
  column-gap: 14px !important;
  row-gap: 14px !important;
}

.thumb {
  padding: 0 !important;
}

.thumb img,
.thumb svg {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  margin: 0 !important;
  object-fit: contain !important;
  object-position: center center !important;
}

@media (max-width: 680px) {
  /*
   * 原来是 104px：
   * 80px 固定导航 + 24px 额外空白。
   * 现在去掉额外的 24px，只保留导航占位。
   */
  .page {
    padding-top: 80px !important;
  }

  .modelLine {
    width: 100% !important;
    gap: 10px !important;
  }

  .modelCodeWrap {
    flex: 1 1 auto !important;
    gap: 6px !important;
    overflow: hidden !important;
  }

  .modelLabel {
    flex: 0 0 auto !important;
    font-size: 18px !important;
  }

  .modelCode {
    min-width: 0 !important;
    overflow: hidden !important;
    font-size: 22px !important;
    text-overflow: ellipsis !important;
  }

  /*
   * 手机端通用 .button 原规则是 width: 100%；
   * 这里只把配置选择按钮恢复为自动宽度。
   */
  .modelLine .button {
    width: auto !important;
    min-width: 112px !important;
    height: 42px !important;
    padding-right: 14px !important;
    padding-left: 14px !important;
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }
}

/* PRODUCT_DETAIL_SPACING_CORRECTION_V6_END */
'@

  $detailCss =
    $detailCss.TrimEnd() +
    "`r`n`r`n" +
    $detailBlock.Trim() +
    "`r`n"

  Write-Utf8NoBom `
    -Path $detailCssPath `
    -Content $detailCss

  Write-Host "Updated product-detail.module.css." -ForegroundColor Green

  # =======================================================
  # 3. app/globals.css
  #    The 18px space must be below the breadcrumb line,
  #    therefore use margin-bottom instead of padding-bottom.
  # =======================================================

  $globalsCss = Get-Content `
    -LiteralPath $globalsPath `
    -Raw `
    -Encoding UTF8

  $globalStart = "/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_START */"
  $globalEnd = "/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_END */"

  $globalsCss = Remove-MarkedBlock `
    -Text $globalsCss `
    -StartMarker $globalStart `
    -EndMarker $globalEnd

  $globalBlock = @'

/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_START */
/*
 * 横线属于面包屑组件自身。
 * 这里用 margin-bottom: 18px，
 * 保证空白出现在横线下面，而不是横线上面。
 */
[data-product-detail-page="true"]
[data-product-breadcrumb-shell="true"] {
  margin-top: 0 !important;
  margin-bottom: 18px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

@media (max-width: 680px) {
  [data-product-detail-page="true"]
  [data-product-breadcrumb-shell="true"] {
    margin-top: 0 !important;
    margin-bottom: 18px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
/* PRODUCT_DETAIL_BREADCRUMB_CORRECTION_V6_END */
'@

  $globalsCss =
    $globalsCss.TrimEnd() +
    "`r`n`r`n" +
    $globalBlock.Trim() +
    "`r`n"

  Write-Utf8NoBom `
    -Path $globalsPath `
    -Content $globalsCss

  Write-Host "Updated app/globals.css." -ForegroundColor Green

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
  Write-Host " - Mobile model, model value and configuration button are one row"
  Write-Host " - Breadcrumb line has 18px space below it"
  Write-Host " - Mobile breadcrumb touches the Top bar without extra gap"
  Write-Host " - Thumbnail boxes keep a 14px gap"
  Write-Host " - Thumbnail images no longer have CSS inner spacing"
}
catch {
  Write-Host ""
  Write-Host "Update failed. Restoring backups..." -ForegroundColor Yellow

  foreach ($filePath in $backupMap.Keys) {
    Copy-Item `
      -LiteralPath $backupMap[$filePath] `
      -Destination $filePath `
      -Force
  }

  Write-Host "All changed files were restored." -ForegroundColor Yellow
  throw
}
