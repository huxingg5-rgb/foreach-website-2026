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

$encoding = New-Object System.Text.UTF8Encoding($false)

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
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
  $css = Get-Content `
    -LiteralPath $cssPath `
    -Raw `
    -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_THUMBNAIL_GAP_V7_START */"
  $endMarker = "/* PRODUCT_DETAIL_THUMBNAIL_GAP_V7_END */"

  $css = Remove-MarkedBlock `
    -Text $css `
    -StartMarker $startMarker `
    -EndMarker $endMarker

  $block = @'

/* PRODUCT_DETAIL_THUMBNAIL_GAP_V7_START */
/* =========================================================
   缩略图间距修正

   说明：
   1. thumbRow 是外层区域，控制箭头与缩略图区域之间的间距
   2. thumbTrack / thumbList 是真正承载缩略图按钮的内层
   3. 图片继续保持 100% 占满方框
   4. 每个方框之间固定保留 14px
========================================================= */

.thumbRow {
  display: flex !important;
  align-items: stretch !important;
  gap: 14px !important;
  column-gap: 14px !important;
}

/* 真正承载多个缩略图的内层轨道 */
.thumbTrack,
.thumbList,
.thumbnailTrack,
.thumbnailList {
  display: flex !important;
  align-items: stretch !important;
  gap: 14px !important;
  column-gap: 14px !important;
}

/* 避免旧 margin 规则与 gap 叠加 */
.thumbTrack > .thumb,
.thumbList > .thumb,
.thumbnailTrack > .thumb,
.thumbnailList > .thumb {
  margin: 0 !important;
  flex: 0 0 auto !important;
}

/* 缩略图内部不留白，图片继续占满 */
.thumb {
  padding: 0 !important;
  overflow: hidden !important;
}

.thumb img,
.thumb svg {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  margin: 0 !important;
  object-fit: contain !important;
  object-position: center center !important;
}

/* PRODUCT_DETAIL_THUMBNAIL_GAP_V7_END */
'@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom `
    -Path $cssPath `
    -Content $css

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
  Write-Host " - Thumbnail images remain 100% inside each box"
  Write-Host " - Thumbnail boxes keep a fixed 14px gap"
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
