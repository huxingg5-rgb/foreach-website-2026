param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

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

  if ($css -notmatch '(?m)^\s*\.specTable\s+td\s*\{') {
    throw "Could not find the exact selector '.specTable td' in product-detail.module.css."
  }

  Write-Host "Found specification value selector: .specTable td" -ForegroundColor Green

  $startMarker = "/* PRODUCT_DETAIL_SPEC_VALUE_WEIGHT_V11_START */"
  $endMarker = "/* PRODUCT_DETAIL_SPEC_VALUE_WEIGHT_V11_END */"

  $css = Remove-MarkedBlock `
    -Text $css `
    -StartMarker $startMarker `
    -EndMarker $endMarker

  $block = @'

/* PRODUCT_DETAIL_SPEC_VALUE_WEIGHT_V11_START */
/* 规格表右侧参数值：降低字重 */
.specTable td {
  font-weight: 400 !important;
}
/* PRODUCT_DETAIL_SPEC_VALUE_WEIGHT_V11_END */
'@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $cssPath -Content $css

  Write-Host "Changed .specTable td font-weight to 400." -ForegroundColor Green

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
  Write-Host " - Only the right-side specification values were changed"
  Write-Host " - Font weight is now 400"
  Write-Host " - Left-side specification labels remain unchanged"
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
