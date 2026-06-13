param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$filePath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

if (-not (Test-Path -LiteralPath $filePath)) {
  throw "File not found: $filePath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$filePath.$timestamp.bak"

Copy-Item -LiteralPath $filePath -Destination $backupPath -Force
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

$content = Get-Content -LiteralPath $filePath -Raw -Encoding UTF8
$original = $content

$wrongPattern = '(?m)^(\s*)const\s+showThumbnailRow\s*=\s*galleryImages\.length\s*>\s*0\s*;\s*$'

$correctCode = @'
  const showThumbnailRow = hasRealImages
    ? realImages.length > 0
    : true;
'@

if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $wrongPattern)) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $wrongPattern,
    $correctCode.TrimEnd(),
    1
  )
}
elseif ($content -match '(?ms)const\s+showThumbnailRow\s*=\s*hasRealImages\s*\?\s*realImages\.length\s*>\s*0\s*:\s*true\s*;') {
  Write-Host "Thumbnail visibility code is already correct." -ForegroundColor Cyan
}
else {
  throw "Could not find the incorrect galleryImages declaration. No changes were made."
}

if ($content -ne $original) {
  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($filePath, $content, $encoding)
  Write-Host "Updated: $filePath" -ForegroundColor Green
}

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
  Write-Host "Removed stale .next cache." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Correct thumbnail rule:" -ForegroundColor Cyan
Write-Host "Real main image count >= 1 -> show thumbnail row"
Write-Host "No real image -> keep the SVG preview thumbnails"
Write-Host ""
Write-Host "No CSS, breadcrumb, SitePageShell, or product-center files were changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The variable reference was repaired, but npm run build still failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
