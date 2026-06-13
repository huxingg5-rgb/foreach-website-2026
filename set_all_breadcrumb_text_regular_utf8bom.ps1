param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$globalsPath = Join-Path $projectRoot "app\globals.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

if (-not (Test-Path -LiteralPath $globalsPath)) {
  throw "File not found: $globalsPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$globalsPath.$timestamp.bak"

Copy-Item -LiteralPath $globalsPath -Destination $backupPath -Force
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

$content = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

$startMarker = "/* FOREACH_GLOBAL_BREADCRUMB_FONT_WEIGHT_START */"
$endMarker = "/* FOREACH_GLOBAL_BREADCRUMB_FONT_WEIGHT_END */"

$overrideBlock = @'

/* FOREACH_GLOBAL_BREADCRUMB_FONT_WEIGHT_START */
/* =========================================================
   全站面包屑字体粗细统一

   说明：
   1. 只修改面包屑文字字重
   2. 不修改结构、间距、颜色、尺寸和位置
   3. 所有普通文字、链接和当前页面文字统一为 400
========================================================= */

html body [class*="breadcrumb" i],
html body [class*="breadcrumb" i] a,
html body [class*="breadcrumb" i] span,
html body [class*="breadcrumb" i] strong,
html body [class*="breadcrumb" i] em,
html body nav[aria-label*="breadcrumb" i],
html body nav[aria-label*="breadcrumb" i] a,
html body nav[aria-label*="breadcrumb" i] span,
html body nav[aria-label*="breadcrumb" i] strong,
html body nav[aria-label*="breadcrumb" i] em,
html body nav[aria-label*="面包屑"],
html body nav[aria-label*="面包屑"] a,
html body nav[aria-label*="面包屑"] span,
html body nav[aria-label*="面包屑"] strong,
html body nav[aria-label*="面包屑"] em {
  font-weight: 400 !important;
  font-style: normal;
}

/* FOREACH_GLOBAL_BREADCRUMB_FONT_WEIGHT_END */
'@

$pattern = [Regex]::Escape($startMarker) + '(?s).*?' + [Regex]::Escape($endMarker)

if ([System.Text.RegularExpressions.Regex]::IsMatch($content, $pattern)) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $pattern,
    $overrideBlock.Trim(),
    1
  )

  Write-Host "Existing breadcrumb font override was updated." -ForegroundColor Cyan
}
else {
  $content = $content.TrimEnd() + "`r`n" + $overrideBlock + "`r`n"
  Write-Host "Breadcrumb font override was appended." -ForegroundColor Cyan
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($globalsPath, $content, $encoding)

Write-Host "Updated: $globalsPath" -ForegroundColor Green
Write-Host ""
Write-Host "All breadcrumb text now uses font-weight: 400." -ForegroundColor Cyan
Write-Host "No breadcrumb layout or component structure was changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The CSS was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
