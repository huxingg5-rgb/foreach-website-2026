param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$filePath = Join-Path $projectRoot "components\products\selection\ProductSelectionCard.tsx"

if (-not (Test-Path -LiteralPath $filePath)) {
  throw "File not found: $filePath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$filePath.$timestamp.bak"
Copy-Item -LiteralPath $filePath -Destination $backupPath -Force

Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

$content = Get-Content -LiteralPath $filePath -Raw -Encoding UTF8

$oldCode = @'
          <a className="product-link" href={detailHref}>
            {detailButtonText}
          </a>
'@

$newCode = @'
          <a
            className="product-link"
            href={detailHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {detailButtonText}
          </a>
'@

if (-not $content.Contains($oldCode)) {
  throw "The expected detail link code was not found. No changes were made."
}

$content = $content.Replace($oldCode, $newCode)

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $encoding)

Write-Host "Updated: $filePath" -ForegroundColor Green
Write-Host ""
Write-Host "Product detail links will now open in a new browser tab." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The file was updated, but npm run build failed. Send the full error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
