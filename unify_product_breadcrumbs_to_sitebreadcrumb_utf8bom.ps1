param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

function Backup-File {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "File not found: $Path"
  }

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $backupPath = "$Path.$timestamp.bak"

  Copy-Item -LiteralPath $Path -Destination $backupPath -Force

  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
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

$siteBreadcrumbPath = Join-Path $projectRoot "components\common\SiteBreadcrumb.tsx"
$selectionClientPath = Join-Path $projectRoot "components\products\selection\ProductSelectionClient.tsx"
$detailClientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"

if (-not (Test-Path -LiteralPath $siteBreadcrumbPath)) {
  throw "Existing SiteBreadcrumb component was not found: $siteBreadcrumbPath"
}

Backup-File -Path $selectionClientPath
Backup-File -Path $detailClientPath

# =========================================================
# 1. Product selection page
#    Replace the manual breadcrumb with SiteBreadcrumb.
# =========================================================

$selectionContent = Get-Content -LiteralPath $selectionClientPath -Raw -Encoding UTF8

$siteImport = 'import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";'

if (-not $selectionContent.Contains($siteImport)) {
  $importAnchor = 'import ResourceSearchBar from "@/components/resources/ResourceSearchBar";'

  if (-not $selectionContent.Contains($importAnchor)) {
    throw "Could not find ResourceSearchBar import anchor in ProductSelectionClient.tsx."
  }

  $selectionContent = $selectionContent.Replace(
    $importAnchor,
    "$siteImport`r`n$importAnchor"
  )
}

# Remove accidental duplicate Breadcrumb import if it exists.
$selectionContent = [System.Text.RegularExpressions.Regex]::Replace(
  $selectionContent,
  '(?m)^\s*import\s+Breadcrumb\s+from\s+["'']@/components/common/breadcrumb/Breadcrumb["''];\s*\r?\n',
  ""
)

$manualSelectionPattern = '(?s)\s*<section\s+className="products-breadcrumb-row">\s*<div\s+className="products-breadcrumb">\s*<span>\{pageText\.breadcrumbHome\}</span>\s*<span>/</span>\s*<strong>\{pageText\.breadcrumbCurrent\}</strong>\s*</div>\s*</section>'

$selectionBreadcrumb = @'

        <SiteBreadcrumb
          ariaLabel={locale === "zh" ? "面包屑导航" : "Breadcrumb"}
          variant="inline"
          items={[
            {
              label: pageText.breadcrumbHome,
              href: locale === "zh" ? "/" : `/${locale}`,
            },
            {
              label: pageText.breadcrumbCurrent,
            },
          ]}
        />
'@

if ([System.Text.RegularExpressions.Regex]::IsMatch($selectionContent, $manualSelectionPattern)) {
  $selectionContent = [System.Text.RegularExpressions.Regex]::Replace(
    $selectionContent,
    $manualSelectionPattern,
    $selectionBreadcrumb,
    1
  )
}
elseif (-not $selectionContent.Contains("<SiteBreadcrumb")) {
  throw "Could not find the manual product selection breadcrumb markup."
}

Write-Utf8NoBomFile -Path $selectionClientPath -Content $selectionContent

# =========================================================
# 2. Product detail page
#    Replace the secondary Breadcrumb component with
#    the existing SiteBreadcrumb component.
# =========================================================

$detailContent = Get-Content -LiteralPath $detailClientPath -Raw -Encoding UTF8

$oldDetailImportPattern = '(?m)^\s*import\s+Breadcrumb\s+from\s+["'']@/components/common/breadcrumb/Breadcrumb["''];\s*$'

if ([System.Text.RegularExpressions.Regex]::IsMatch($detailContent, $oldDetailImportPattern)) {
  $detailContent = [System.Text.RegularExpressions.Regex]::Replace(
    $detailContent,
    $oldDetailImportPattern,
    $siteImport,
    1
  )
}
elseif (-not $detailContent.Contains($siteImport)) {
  $cssImport = 'import styles from "./product-detail.module.css";'

  if (-not $detailContent.Contains($cssImport)) {
    throw "Could not find the CSS import anchor in ProductDetailClient.tsx."
  }

  $detailContent = $detailContent.Replace(
    $cssImport,
    "$siteImport`r`n`r`n$cssImport"
  )
}

$oldDetailMarkupPattern = '(?s)\s*<Breadcrumb\s+items=\{\[\s*\{\s*label:\s*"首页",\s*href:\s*"/"\s*\},\s*\{\s*label:\s*"产品中心",\s*href:\s*"/products/"\s*\},\s*\{\s*label:\s*data\.model\s*\},\s*\]\}\s*/>'

$detailBreadcrumb = @'

        <SiteBreadcrumb
          ariaLabel="面包屑导航"
          variant="inline"
          items={[
            {
              label: "首页",
              href: "/",
            },
            {
              label: "产品中心",
              href: "/products/",
            },
            {
              label: data.model,
            },
          ]}
        />
'@

if ([System.Text.RegularExpressions.Regex]::IsMatch($detailContent, $oldDetailMarkupPattern)) {
  $detailContent = [System.Text.RegularExpressions.Regex]::Replace(
    $detailContent,
    $oldDetailMarkupPattern,
    $detailBreadcrumb,
    1
  )
}
elseif (-not $detailContent.Contains("<SiteBreadcrumb")) {
  throw "Could not find the current product detail breadcrumb markup."
}

Write-Utf8NoBomFile -Path $detailClientPath -Content $detailContent

Write-Host ""
Write-Host "Product center and product detail now use:" -ForegroundColor Cyan
Write-Host "components/common/SiteBreadcrumb.tsx" -ForegroundColor Green
Write-Host ""
Write-Host "Both use variant=`"inline`" and the same component styles." -ForegroundColor Cyan
Write-Host ""
Write-Host "The older components/common/breadcrumb/Breadcrumb.tsx was not deleted" -ForegroundColor Yellow
Write-Host "because fitting replacement pages still depend on it." -ForegroundColor Yellow
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
