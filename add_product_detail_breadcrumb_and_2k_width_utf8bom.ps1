param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

function Backup-File {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (Test-Path -LiteralPath $Path) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupPath = "$Path.$timestamp.bak"
    Copy-Item -LiteralPath $Path -Destination $backupPath -Force
    Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
  }
}

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $directory = Split-Path -Parent $Path

  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Updated: $Path" -ForegroundColor Green
}

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$breadcrumbPath = Join-Path $projectRoot "components\products\detail\ProductDetailBreadcrumb.tsx"
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath $clientPath)) {
  throw "File not found: $clientPath"
}

if (-not (Test-Path -LiteralPath $cssPath)) {
  throw "File not found: $cssPath"
}

Backup-File -Path $breadcrumbPath
Backup-File -Path $clientPath
Backup-File -Path $cssPath

# =========================================================
# 1. Create a dedicated breadcrumb component
# =========================================================

$breadcrumbContent = @'
/* =========================================================
   ProductDetailBreadcrumb.tsx
   恒永达官网｜中文产品详情页面包屑

   当前结构：
   首页 / 产品中心 / 当前产品型号
========================================================= */

import Link from "next/link";

import styles from "./product-detail.module.css";

type ProductDetailBreadcrumbProps = {
  currentLabel: string;
};

export default function ProductDetailBreadcrumb({
  currentLabel,
}: ProductDetailBreadcrumbProps) {
  return (
    <nav className={styles.breadcrumbRow} aria-label="面包屑导航">
      <div className={styles.breadcrumb}>
        <Link href="/">首页</Link>
        <span aria-hidden="true">/</span>
        <Link href="/products/">产品中心</Link>
        <span aria-hidden="true">/</span>
        <strong>{currentLabel}</strong>
      </div>
    </nav>
  );
}
'@

Write-Utf8NoBomFile -Path $breadcrumbPath -Content $breadcrumbContent

# =========================================================
# 2. Insert breadcrumb into the existing detail page
#    Do not rewrite any other page structure
# =========================================================

$clientContent = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8

$importLine = 'import ProductDetailBreadcrumb from "./ProductDetailBreadcrumb";'

if (-not $clientContent.Contains($importLine)) {
  $importAnchor = 'import styles from "./product-detail.module.css";'

  if (-not $clientContent.Contains($importAnchor)) {
    throw "Could not find the CSS import anchor in ProductDetailClient.tsx."
  }

  $clientContent = $clientContent.Replace(
    $importAnchor,
    "$importLine`r`n`r`n$importAnchor"
  )
}

$breadcrumbMarkup = '        <ProductDetailBreadcrumb currentLabel={data.model} />'

if (-not $clientContent.Contains($breadcrumbMarkup)) {
  $containerAnchor = '      <div className={styles.container}>'

  if (-not $clientContent.Contains($containerAnchor)) {
    throw "Could not find the container anchor in ProductDetailClient.tsx."
  }

  $clientContent = $clientContent.Replace(
    $containerAnchor,
    "$containerAnchor`r`n$breadcrumbMarkup"
  )
}

Write-Utf8NoBomFile -Path $clientPath -Content $clientContent

# =========================================================
# 3. Add breadcrumb styles and 2K-only width adaptation
#    Existing desktop/mobile layout remains untouched
# =========================================================

$cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$breadcrumbCssMarker = "/* Product detail breadcrumb */"

if (-not $cssContent.Contains($breadcrumbCssMarker)) {
  $containerBlock = @'
.container {
  width: min(calc(100% - 96px), var(--page-width));
  margin: 0 auto;
}
'@

  if (-not $cssContent.Contains($containerBlock)) {
    throw "Could not find the original .container block."
  }

  $breadcrumbCss = @'

/* Product detail breadcrumb */

.breadcrumbRow {
  margin-bottom: 26px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  color: var(--sub);
  font-size: 14px;
  line-height: 1.5;
}

.breadcrumb a {
  color: var(--sub);
  text-decoration: none;
  transition: color 0.18s ease;
}

.breadcrumb a:hover {
  color: var(--blue);
}

.breadcrumb strong {
  min-width: 0;
  color: var(--blue);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
'@

  $cssContent = $cssContent.Replace(
    $containerBlock,
    "$containerBlock$breadcrumbCss"
  )
}

$twoKMarker = "/* 2K display adaptation */"

if (-not $cssContent.Contains($twoKMarker)) {
  $twoKCss = @'

/* 2K display adaptation
   只影响 1800px 及以上屏幕，不修改普通桌面和移动端。 */

@media (min-width: 1800px) {
  .page {
    --page-width: 1600px;
  }

  .productTop {
    grid-template-columns: 520px minmax(0, 1fr);
    gap: 88px;
  }

  .mainImage {
    height: 420px;
  }

  .pumpSvg,
  .mainImage img {
    width: 430px;
  }

  .productInfo {
    max-width: none;
  }

  .productDesc {
    max-width: 860px;
  }
}
'@

  $cssContent = "$cssContent$twoKCss"
}

Write-Utf8NoBomFile -Path $cssPath -Content $cssContent

Write-Host ""
Write-Host "Breadcrumb and 2K layout adaptation were added." -ForegroundColor Cyan
Write-Host ""
Write-Host "Only these changes were made:"
Write-Host "1. Added ProductDetailBreadcrumb.tsx"
Write-Host "2. Inserted the breadcrumb above the original product layout"
Write-Host "3. Expanded the page to 1600px only on screens >= 1800px"
Write-Host ""

if (-not $SkipBuild) {
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The files were updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
