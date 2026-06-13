param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($clientPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

Copy-Item `
  -LiteralPath $clientPath `
  -Destination "$clientPath.$timestamp.bak" `
  -Force

Copy-Item `
  -LiteralPath $cssPath `
  -Destination "$cssPath.$timestamp.bak" `
  -Force

Write-Host "Backups created." -ForegroundColor Yellow

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Updated: $Path" -ForegroundColor Green
}

# =========================================================
# 1. ProductDetailClient.tsx
#
# - Always show thumbnail row when at least one image exists.
# - Only show previous/next arrows when there are multiple images.
# =========================================================

$clientContent = Get-Content -LiteralPath $clientPath -Raw -Encoding UTF8

$oldState = @'
  const activeImage = galleryImages[activeImageIndex] ?? null;
  const showThumbnails = galleryImages.length > 1;
'@

$newState = @'
  const activeImage = galleryImages[activeImageIndex] ?? null;
  const showThumbnailRow = galleryImages.length > 0;
  const showThumbnailArrows = galleryImages.length > 1;
'@

if (-not $clientContent.Contains($oldState)) {
  throw "Could not find the current thumbnail visibility logic."
}

$clientContent = $clientContent.Replace($oldState, $newState)

$oldThumbnailBlock = @'
            {showThumbnails ? (
              <div className={styles.thumbnailRow}>
                <button
                  className={styles.thumbnailArrow}
                  type="button"
                  aria-label="上一张产品图"
                  onClick={handlePreviousImage}
                >
                  ‹
                </button>

                <div className={styles.thumbnailList}>
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      className={[
                        styles.thumbnail,
                        index === activeImageIndex
                          ? styles.thumbnailActive
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`查看第 ${index + 1} 张产品图`}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>

                <button
                  className={styles.thumbnailArrow}
                  type="button"
                  aria-label="下一张产品图"
                  onClick={handleNextImage}
                >
                  ›
                </button>
              </div>
            ) : null}
'@

$newThumbnailBlock = @'
            {showThumbnailRow ? (
              <div
                className={[
                  styles.thumbnailRow,
                  !showThumbnailArrows
                    ? styles.thumbnailRowSingle
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {showThumbnailArrows ? (
                  <button
                    className={styles.thumbnailArrow}
                    type="button"
                    aria-label="上一张产品图"
                    onClick={handlePreviousImage}
                  >
                    ‹
                  </button>
                ) : null}

                <div className={styles.thumbnailList}>
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      className={[
                        styles.thumbnail,
                        index === activeImageIndex
                          ? styles.thumbnailActive
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`查看第 ${index + 1} 张产品图`}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>

                {showThumbnailArrows ? (
                  <button
                    className={styles.thumbnailArrow}
                    type="button"
                    aria-label="下一张产品图"
                    onClick={handleNextImage}
                  >
                    ›
                  </button>
                ) : null}
              </div>
            ) : null}
'@

if (-not $clientContent.Contains($oldThumbnailBlock)) {
  throw "Could not find the current thumbnail JSX block."
}

$clientContent = $clientContent.Replace(
  $oldThumbnailBlock,
  $newThumbnailBlock
)

Write-Utf8NoBomFile -Path $clientPath -Content $clientContent

# =========================================================
# 2. product-detail.module.css
#
# Single image:
# - Keep one 96px thumbnail.
# - Do not stretch it across the full gallery width.
# =========================================================

$cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$markerStart = "/* PRODUCT_DETAIL_SINGLE_THUMBNAIL_START */"
$markerEnd = "/* PRODUCT_DETAIL_SINGLE_THUMBNAIL_END */"

$singleThumbnailCss = @'

/* PRODUCT_DETAIL_SINGLE_THUMBNAIL_START */
/* 只有主图时仍显示一张缩略图，不显示左右箭头 */
.thumbnailRowSingle {
  grid-template-columns: minmax(0, 1fr);
}

.thumbnailRowSingle .thumbnailList {
  grid-auto-columns: 96px;
  justify-content: start;
}
/* PRODUCT_DETAIL_SINGLE_THUMBNAIL_END */
'@

$pattern =
  [Regex]::Escape($markerStart) +
  '(?s).*?' +
  [Regex]::Escape($markerEnd)

if ([System.Text.RegularExpressions.Regex]::IsMatch($cssContent, $pattern)) {
  $cssContent = [System.Text.RegularExpressions.Regex]::Replace(
    $cssContent,
    $pattern,
    $singleThumbnailCss.Trim(),
    1
  )
}
else {
  $thumbnailListPattern = '(?s)(\.thumbnailList\s*\{.*?\})'

  if ([System.Text.RegularExpressions.Regex]::IsMatch(
    $cssContent,
    $thumbnailListPattern
  )) {
    $cssContent = [System.Text.RegularExpressions.Regex]::Replace(
      $cssContent,
      $thumbnailListPattern,
      '$1' + $singleThumbnailCss,
      1
    )
  }
  else {
    $cssContent = $cssContent.TrimEnd() + "`r`n" + $singleThumbnailCss + "`r`n"
  }
}

Write-Utf8NoBomFile -Path $cssPath -Content $cssContent

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
  Write-Host "Removed stale .next cache." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Thumbnail behavior restored:" -ForegroundColor Cyan
Write-Host "1 image  -> show one main-image thumbnail, no arrows"
Write-Host "2+ images -> show all thumbnails and both arrows"
Write-Host ""
Write-Host "SitePageShell and breadcrumb spacing were not changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "The thumbnail logic was updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
