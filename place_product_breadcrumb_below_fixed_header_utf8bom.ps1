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

# =========================================================
# Desktop:
# Fixed SiteHeader height is 82px.
# Breadcrumb should begin immediately below it.
# =========================================================

$desktopPatterns = @(
  'padding:\s*0\s+0\s+72px;',
  'padding:\s*0\s+0\s+80px;',
  'padding:\s*0\s+0\s+88px;',
  'padding-top:\s*0;'
)

foreach ($pattern in $desktopPatterns) {
  $pagePattern = '(?s)(\.page\s*\{.*?)(?<target>' + $pattern + ')'

  if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $pagePattern)) {
    $content = [System.Text.RegularExpressions.Regex]::Replace(
      $content,
      $pagePattern,
      {
        param($match)

        $prefix = $match.Groups[1].Value
        $target = $match.Groups["target"].Value

        if ($target -match '^padding-top') {
          return $prefix + "padding-top: 82px;"
        }

        return $prefix + "padding: 82px 0 72px;"
      },
      1
    )

    $changed = $true
    break
  }
}

# =========================================================
# Mobile:
# Fixed mobile SiteHeader height is 70px.
# =========================================================

$mobilePattern = '(?s)(@media\s*\(max-width:\s*680px\)\s*\{.*?\.page\s*\{.*?)(padding-top:\s*0;|padding:\s*0\s+0\s+60px;)'

if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $mobilePattern)) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $mobilePattern,
    {
      param($match)

      $prefix = $match.Groups[1].Value
      return $prefix + "padding-top: 70px;"
    },
    1
  )

  $changed = $true
}
else {
  # Support max-width: 760px if the current file uses that breakpoint.
  $mobilePattern760 = '(?s)(@media\s*\(max-width:\s*760px\)\s*\{.*?\.page\s*\{.*?)(padding-top:\s*0;|padding:\s*0\s+0\s+60px;)'

  if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $mobilePattern760)) {
    $content = [System.Text.RegularExpressions.Regex]::Replace(
      $content,
      $mobilePattern760,
      {
        param($match)

        $prefix = $match.Groups[1].Value
        return $prefix + "padding-top: 70px;"
      },
      1
    )

    $changed = $true
  }
}

if (-not $changed) {
  throw "The expected product detail page spacing rules were not found. No changes were made."
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Product detail flow is now:" -ForegroundColor Cyan
Write-Host "Fixed header -> breadcrumb -> product content"
Write-Host ""
Write-Host "Desktop header offset: 82px"
Write-Host "Mobile header offset: 70px"
Write-Host "Breadcrumb internal spacing was not changed."

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
    throw "The layout was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
