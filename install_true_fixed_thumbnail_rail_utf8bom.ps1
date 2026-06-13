param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$tsxPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($tsxPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

Copy-Item -LiteralPath $tsxPath -Destination "$tsxPath.$timestamp.bak" -Force
Copy-Item -LiteralPath $cssPath -Destination "$cssPath.$timestamp.bak" -Force

Write-Host "Backups created." -ForegroundColor Yellow

$encoding = New-Object System.Text.UTF8Encoding($false)

# =========================================================
# 1. ProductDetailClient.tsx
#    Allow up to five real thumbnails instead of three.
# =========================================================

$tsxContent = Get-Content -LiteralPath $tsxPath -Raw -Encoding UTF8
$originalTsx = $tsxContent

$tsxContent = [System.Text.RegularExpressions.Regex]::Replace(
  $tsxContent,
  'realImages\.slice\(\s*0\s*,\s*3\s*\)\.map',
  'realImages.slice(0, 5).map',
  1
)

if ($tsxContent -ne $originalTsx) {
  [System.IO.File]::WriteAllText($tsxPath, $tsxContent, $encoding)
  Write-Host "Updated thumbnail limit: 3 -> 5" -ForegroundColor Green
}
elseif ($tsxContent -match 'realImages\.slice\(\s*0\s*,\s*5\s*\)\.map') {
  Write-Host "Thumbnail limit is already 5." -ForegroundColor Cyan
}
else {
  Write-Host "Warning: realImages.slice(0, 3).map was not found; TSX was not changed." -ForegroundColor Yellow
}

# =========================================================
# 2. product-detail.module.css
#    Remove the previous stretch rule and install the real
#    fixed-width thumbnail rail.
# =========================================================

$cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

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

  return [System.Text.RegularExpressions.Regex]::Replace(
    $Text,
    $pattern,
    ""
  )
}

$blocksToRemove = @(
  @(
    "/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_START */",
    "/* PRODUCT_DETAIL_THUMB_ROW_FULL_WIDTH_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_FIXED_SIZE_THUMBNAILS_START */",
    "/* PRODUCT_DETAIL_FIXED_SIZE_THUMBNAILS_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_TRUE_FIXED_THUMB_RAIL_START */",
    "/* PRODUCT_DETAIL_TRUE_FIXED_THUMB_RAIL_END */"
  )
)

foreach ($block in $blocksToRemove) {
  $cssContent = Remove-MarkedBlock `
    -Text $cssContent `
    -StartMarker $block[0] `
    -EndMarker $block[1]
}

$cssBlock = @'

/* PRODUCT_DETAIL_TRUE_FIXED_THUMB_RAIL_START */
/* =========================================================
   产品详情页｜真实固定宽度缩略图轨道

   真实 DOM：
   .thumbRow
     .thumbArrow[上一张]
     .thumb
     .thumb
     ...
     .thumbArrow[下一张]

   规则：
   1. 左右按钮固定在主图区域两端
   2. 每张缩略图固定 96px，禁止拉伸
   3. 图片少时，后方区域自然留白
   4. 最多展示 5 张真实缩略图
   5. 宽度不足时可横向滚动，滚动条隐藏
========================================================= */

.thumbRow {
  position: relative !important;
  display: flex !important;
  width: 100% !important;
  height: 96px !important;
  min-width: 0 !important;
  margin-top: 12px;
  padding: 0 34px !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 8px !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  scroll-behavior: smooth;
  scrollbar-width: none;
  box-sizing: border-box;
}

.thumbRow::-webkit-scrollbar {
  display: none;
}

/* 左右按钮脱离缩略图排列，固定在主图区域两端 */
.thumbRow > .thumbArrow {
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  z-index: 3;

  display: flex !important;
  width: 28px !important;
  min-width: 28px !important;
  max-width: 28px !important;
  height: 100% !important;
  padding: 3px 0 0 !important;
  margin: 0 !important;
  flex: 0 0 28px !important;
  align-items: center !important;
  justify-content: center !important;

  border: 1px solid rgba(23, 51, 104, 0.16);
  background: #ffffff !important;
  color: #173368 !important;
  box-sizing: border-box;

  font-family: Arial, sans-serif;
  font-size: 22px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  text-shadow:
    0.4px 0 currentColor,
    -0.4px 0 currentColor;
}

.thumbRow > .thumbArrow[aria-label="上一张"] {
  left: 0 !important;
}

.thumbRow > .thumbArrow[aria-label="下一张"] {
  right: 0 !important;
}

.thumbRow > .thumbArrow:hover,
.thumbRow > .thumbArrow:active {
  border-color: #173368 !important;
  background: #173368 !important;
  color: #09e9b4 !important;
}

.thumbRow > .thumbArrow:focus:not(:hover),
.thumbRow > .thumbArrow:focus-visible:not(:hover) {
  background: #ffffff !important;
  color: #173368 !important;
  outline: 1px solid #173368;
  outline-offset: -1px;
}

/* 每张缩略图固定 96px，不再使用 1fr 拉伸 */
.thumbRow > .thumb {
  position: relative;
  width: 96px !important;
  min-width: 96px !important;
  max-width: 96px !important;
  height: 96px !important;
  flex: 0 0 96px !important;
  align-self: stretch;
  box-sizing: border-box;
}

/* 图片在固定缩略图内居中 */
.thumbRow > .thumb img,
.thumbRow > .thumb svg {
  display: block;
  max-width: 78%;
  max-height: 78%;
  margin: auto;
  object-fit: contain;
}

/* 移动端缩略图稍小，但仍不伸缩 */
@media (max-width: 680px) {
  .thumbRow {
    height: 78px !important;
    padding-right: 32px !important;
    padding-left: 32px !important;
    gap: 6px !important;
  }

  .thumbRow > .thumb {
    width: 78px !important;
    min-width: 78px !important;
    max-width: 78px !important;
    height: 78px !important;
    flex-basis: 78px !important;
  }
}

/* PRODUCT_DETAIL_TRUE_FIXED_THUMB_RAIL_END */
'@

$cssContent = $cssContent.TrimEnd() + "`r`n" + $cssBlock + "`r`n"

$cssContent = [System.Text.RegularExpressions.Regex]::Replace(
  $cssContent,
  '\r?\n{3,}',
  "`r`n`r`n"
)

[System.IO.File]::WriteAllText($cssPath, $cssContent, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Thumbnail rail behavior:" -ForegroundColor Cyan
Write-Host "1 image  -> one fixed 96px thumbnail, remaining area stays blank"
Write-Host "5 images -> five fixed 96px thumbnails in sequence"
Write-Host "Not enough width -> horizontal scroll, arrows stay fixed at both edges"
Write-Host ""
Write-Host "Right-side product information and divider were not changed." -ForegroundColor Cyan

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
    throw "The fixed thumbnail rail was installed, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
