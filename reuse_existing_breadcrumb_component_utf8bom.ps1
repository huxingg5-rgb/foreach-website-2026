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

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
  Write-Host "Updated: $Path" -ForegroundColor Green
}

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$sharedBreadcrumbPath = Join-Path $projectRoot "components\common\breadcrumb\Breadcrumb.tsx"
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$localBreadcrumbPath = Join-Path $projectRoot "components\products\detail\ProductDetailBreadcrumb.tsx"

if (-not (Test-Path -LiteralPath $sharedBreadcrumbPath)) {
  throw "Existing shared breadcrumb component was not found: $sharedBreadcrumbPath"
}

if (-not (Test-Path -LiteralPath $clientPath)) {
  throw "File not found: $clientPath"
}

if (-not (Test-Path -LiteralPath $cssPath)) {
  throw "File not found: $cssPath"
}

Backup-File -Path $clientPath
Backup-File -Path $cssPath
Backup-File -Path $localBreadcrumbPath

# =========================================================
# 1. Replace the detail-page-only breadcrumb import
#    with the existing shared Breadcrumb component.
# =========================================================

$clientContent = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8

$oldImport = 'import ProductDetailBreadcrumb from "./ProductDetailBreadcrumb";'
$newImport = 'import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";'

if ($clientContent.Contains($oldImport)) {
  $clientContent = $clientContent.Replace($oldImport, $newImport)
}
elseif (-not $clientContent.Contains($newImport)) {
  $cssImport = 'import styles from "./product-detail.module.css";'

  if (-not $clientContent.Contains($cssImport)) {
    throw "Could not find the expected import position in ProductDetailClient.tsx."
  }

  $clientContent = $clientContent.Replace(
    $cssImport,
    "$newImport`r`n`r`n$cssImport"
  )
}

# =========================================================
# 2. Replace local breadcrumb JSX with the shared component.
# =========================================================

$oldMarkup = '        <ProductDetailBreadcrumb currentLabel={data.model} />'

$newMarkup = @'
        <Breadcrumb
          items={[
            { label: "首页", href: "/" },
            { label: "产品中心", href: "/products/" },
            { label: data.model },
          ]}
        />
'@

if ($clientContent.Contains($oldMarkup)) {
  $clientContent = $clientContent.Replace($oldMarkup, $newMarkup.TrimEnd())
}
elseif (-not $clientContent.Contains('<Breadcrumb')) {
  throw "Could not find the local breadcrumb markup in ProductDetailClient.tsx."
}

Write-Utf8NoBomFile -Path $clientPath -Content $clientContent

# =========================================================
# 3. Remove only the locally-created breadcrumb styles.
#    Keep all other detail page styles, including 2K rules.
# =========================================================

$cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$breadcrumbStylePattern = '(?s)\r?\n/\* Product detail breadcrumb \*/.*?(?=\r?\n/\* =========================================================|\r?\n/\* 2K display adaptation|\z)'

if ([System.Text.RegularExpressions.Regex]::IsMatch($cssContent, $breadcrumbStylePattern)) {
  $cssContent = [System.Text.RegularExpressions.Regex]::Replace(
    $cssContent,
    $breadcrumbStylePattern,
    "",
    1
  )
  Write-Host "Removed local breadcrumb styles from product-detail.module.css." -ForegroundColor Green
}
else {
  Write-Host "Local breadcrumb styles were not found; no CSS removal was needed." -ForegroundColor Yellow
}

Write-Utf8NoBomFile -Path $cssPath -Content $cssContent

# =========================================================
# 4. Remove the redundant local breadcrumb component.
# =========================================================

if (Test-Path -LiteralPath $localBreadcrumbPath) {
  Remove-Item -LiteralPath $localBreadcrumbPath -Force
  Write-Host "Removed redundant file: $localBreadcrumbPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "The product detail page now references the existing shared Breadcrumb component." -ForegroundColor Cyan
Write-Host "No new breadcrumb component or breadcrumb style was created." -ForegroundColor Cyan
Write-Host ""

if (-not $SkipBuild) {
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "Files were updated, but npm run build failed. Send the full error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
