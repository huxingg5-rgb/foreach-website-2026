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

  # 清理上一次无效的缩略图间距补丁
  $oldBlocks = @(
    @(
      "/* PRODUCT_DETAIL_THUMBNAIL_GAP_V7_START */",
      "/* PRODUCT_DETAIL_THUMBNAIL_GAP_V7_END */"
    ),
    @(
      "/* PRODUCT_DETAIL_THUMBNAIL_EXACT_GAP_V8_START */",
      "/* PRODUCT_DETAIL_THUMBNAIL_EXACT_GAP_V8_END */"
    )
  )

  foreach ($block in $oldBlocks) {
    $css = Remove-MarkedBlock `
      -Text $css `
      -StartMarker $block[0] `
      -EndMarker $block[1]
  }

  $cssBlock = @'

/* PRODUCT_DETAIL_THUMBNAIL_EXACT_GAP_V8_START */
/* =========================================================
   产品详情页｜缩略图方框精确间距

   已确认真实结构：
   .thumbRow
     .thumbArrow
     .thumb
     .thumb
     .thumb
     .thumbArrow

   因此：
   1. 缩略图方框类名是 .thumb
   2. 外层排列容器类名是 .thumbRow
   3. 左右按钮类名是 .thumbArrow
   4. 不再依赖 gap
   5. 直接给相邻的两个 .thumb 增加 14px 左外边距
========================================================= */

.thumbRow {
  display: flex !important;
  gap: 0 !important;
  column-gap: 0 !important;
  row-gap: 0 !important;
}

/* 每个缩略图方框本身不留外边距和内边距 */
.thumbRow > .thumb {
  margin: 0 !important;
  padding: 0 !important;
  flex-shrink: 0 !important;
  overflow: hidden !important;
}

/*
 * 只要前一个元素也是缩略图，
 * 当前缩略图左侧就固定增加 14px。
 * 这不会影响左右箭头。
 */
.thumbRow > .thumb + .thumb {
  margin-left: 14px !important;
}

/* 图片继续完整铺满方框内部 */
.thumbRow > .thumb img,
.thumbRow > .thumb svg {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  margin: 0 !important;
  object-fit: contain !important;
  object-position: center center !important;
}

/* 手机端同样固定为 14px */
@media (max-width: 680px) {
  .thumbRow > .thumb + .thumb {
    margin-left: 14px !important;
  }
}

/* PRODUCT_DETAIL_THUMBNAIL_EXACT_GAP_V8_END */
'@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $cssBlock.Trim() +
    "`r`n"

  Write-Utf8NoBom `
    -Path $cssPath `
    -Content $css

  Write-Host "Updated: $cssPath" -ForegroundColor Green
  Write-Host "Applied exact 14px spacing between adjacent .thumb boxes." -ForegroundColor Green

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
  Write-Host " - Thumbnail box class: .thumb"
  Write-Host " - Thumbnail row class: .thumbRow"
  Write-Host " - Arrow class: .thumbArrow"
  Write-Host " - Adjacent thumbnail boxes now have an exact 14px gap"
  Write-Host " - Images remain 100% inside each thumbnail box"
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
