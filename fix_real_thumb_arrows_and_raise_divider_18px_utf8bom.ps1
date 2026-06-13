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

# 清理前面使用错误 .thumbnailArrow 选择器的临时覆盖块。
$blocks = @(
  @(
    "/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_START */",
    "/* PRODUCT_DETAIL_BOTTOM_ALIGNMENT_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_START */",
    "/* PRODUCT_DETAIL_FIXED_THUMBNAIL_CONTROLS_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_START */",
    "/* PRODUCT_DETAIL_OPERATION_AND_THUMBNAIL_FIX_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_START */",
    "/* PRODUCT_DETAIL_FINAL_ALIGNMENT_FIX_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_LINE_AND_ARROW_TUNE_START */",
    "/* PRODUCT_DETAIL_LINE_AND_ARROW_TUNE_END */"
  ),
  @(
    "/* PRODUCT_DETAIL_REAL_THUMB_ARROW_FIX_START */",
    "/* PRODUCT_DETAIL_REAL_THUMB_ARROW_FIX_END */"
  )
)

foreach ($block in $blocks) {
  $content = Remove-MarkedBlock `
    -Text $content `
    -StartMarker $block[0] `
    -EndMarker $block[1]
}

$fixBlock = @'

/* PRODUCT_DETAIL_REAL_THUMB_ARROW_FIX_START */
/* =========================================================
   产品详情页｜真实缩略图按钮与型号区域修正

   已确认真实 JSX：
   - 上一张：className={styles.thumbArrow}
   - 下一张：className={styles.thumbArrow}

   修正：
   1. 两个 .thumbArrow 固定为相同宽度
   2. 上一张靠左，下一张靠右
   3. ‹ › 符号加粗并向下微调
   4. operationArea 整体保持下移 120px
   5. 横线单独上移 18px
========================================================= */

/* ---------- 首屏右栏布局 ---------- */

.productTop {
  align-items: stretch;
}

.productInfo {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}

/*
 * 型号与配置选择维持当前下移 120px 的位置。
 * 去掉原本的 border-top，改用 ::before 单独画线。
 */
.operationArea {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-top: 120px !important;
  padding-top: 0 !important;
  border-top: 0 !important;
  box-sizing: border-box;
}

/* 横线比型号区域上边缘再高 18px */
.operationArea::before {
  content: "";
  position: absolute;
  top: -18px;
  right: 0;
  left: 0;
  height: 1px;
  background: rgba(23, 51, 104, 0.12);
  pointer-events: none;
}

/* 四个申请按钮继续贴在右栏底部 */
.actionRow,
.actionGrid {
  flex: 0 0 auto;
  margin-top: auto !important;
}

/* ---------- 真实左右缩略图按钮 ---------- */

.thumbArrow {
  display: flex !important;
  width: 28px !important;
  min-width: 28px !important;
  max-width: 28px !important;
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

/* 按真实 aria-label 分别固定左右位置 */
.thumbArrow[aria-label="上一张"] {
  justify-self: start !important;
}

.thumbArrow[aria-label="下一张"] {
  justify-self: end !important;
}

.thumbArrow:hover,
.thumbArrow:active {
  border-color: #173368 !important;
  background: #173368 !important;
  color: #09e9b4 !important;
}

/* 点击后不持续保持深蓝背景 */
.thumbArrow:focus:not(:hover),
.thumbArrow:focus-visible:not(:hover) {
  background: #ffffff !important;
  color: #173368 !important;
  outline: 1px solid #173368;
  outline-offset: -1px;
}

/* ---------- 移动端恢复自然页面流 ---------- */

@media (max-width: 980px) {
  .productInfo {
    min-height: auto;
  }

  .operationArea {
    display: block;
    flex: none;
    margin-top: 24px !important;
  }

  .operationArea::before {
    top: -12px;
  }

  .actionRow,
  .actionGrid {
    margin-top: 18px !important;
  }
}

/* PRODUCT_DETAIL_REAL_THUMB_ARROW_FIX_END */
'@

$content = $content.TrimEnd() + "`r`n" + $fixBlock + "`r`n"

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  '\r?\n{3,}',
  "`r`n`r`n"
)

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "Updated: $cssPath" -ForegroundColor Green
Write-Host ""
Write-Host "Applied using the real .thumbArrow class:" -ForegroundColor Cyan
Write-Host "1. Previous and next buttons are both fixed at 28px."
Write-Host "2. Arrow symbols are thicker and shifted down by 3px."
Write-Host "3. The divider line moved up by 18px."
Write-Host "4. Model and configuration positions remain unchanged."
Write-Host ""
Write-Host "Only product-detail.module.css was changed." -ForegroundColor Cyan

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
    throw "The real thumbnail-button styles were updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
