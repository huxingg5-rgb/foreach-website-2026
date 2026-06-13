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
$original = $content

$productTopPattern = '(?s)(\.productTop\s*\{)(.*?)(\})'

if (-not [System.Text.RegularExpressions.Regex]::IsMatch($content, $productTopPattern)) {
  throw "The .productTop style block was not found. No changes were made."
}

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  $productTopPattern,
  {
    param($match)

    $start = $match.Groups[1].Value
    $body = $match.Groups[2].Value
    $end = $match.Groups[3].Value

    if ($body -match '(?m)^\s*margin-top\s*:') {
      $body = [System.Text.RegularExpressions.Regex]::Replace(
        $body,
        '(?m)^(\s*)margin-top\s*:\s*[^;]+;',
        '${1}margin-top: 32px;',
        1
      )
    }
    else {
      $body = "`r`n  margin-top: 32px;" + $body
    }

    return $start + $body + $end
  },
  1
)

if ($content -eq $original) {
  throw "No CSS change was produced."
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Added 32px between the breadcrumb and product content." -ForegroundColor Cyan
Write-Host "Header offset and breadcrumb styles were not changed." -ForegroundColor Cyan

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
    throw "The spacing was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
