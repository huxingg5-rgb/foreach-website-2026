param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

if (-not (Test-Path -LiteralPath $cssPath)) {
  throw "File not found: $cssPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$cssPath.$timestamp.bak"

Copy-Item -LiteralPath $cssPath -Destination $backupPath -Force
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

$content = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$changed = $false

# Remove the duplicated desktop top spacing.
$desktopPatterns = @(
  'padding:\s*138px\s+0\s+72px;',
  'padding:\s*138px\s+0\s+80px;',
  'padding:\s*138px\s+0\s+88px;'
)

foreach ($pattern in $desktopPatterns) {
  if ($content -match $pattern) {
    $content = [System.Text.RegularExpressions.Regex]::Replace(
      $content,
      $pattern,
      "padding: 0 0 72px;",
      1
    )

    $changed = $true
    break
  }
}

# Remove the duplicated mobile top spacing.
$mobilePatterns = @(
  'padding-top:\s*104px;',
  'padding:\s*104px\s+0\s+60px;'
)

foreach ($pattern in $mobilePatterns) {
  if ($content -match $pattern) {
    $replacement = if ($pattern -like "padding-top*") {
      "padding-top: 0;"
    }
    else {
      "padding: 0 0 60px;"
    }

    $content = [System.Text.RegularExpressions.Regex]::Replace(
      $content,
      $pattern,
      $replacement,
      1
    )

    $changed = $true
  }
}

if (-not $changed) {
  throw "The expected product detail top spacing was not found. No changes were made."
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Removed the extra product-detail top spacing." -ForegroundColor Cyan
Write-Host "The breadcrumb top border will now align directly below the site header." -ForegroundColor Cyan
Write-Host "Breadcrumb internal vertical padding was not changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The spacing was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
