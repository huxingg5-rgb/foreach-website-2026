$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$globalsPath = Join-Path $root "app\globals.css"
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

if (-not (Test-Path -LiteralPath $globalsPath)) {
    throw "未找到文件：$globalsPath"
}

Copy-Item `
    -LiteralPath $globalsPath `
    -Destination "$globalsPath.bak_search_image_square_$stamp" `
    -Force

$css = Get-Content `
    -LiteralPath $globalsPath `
    -Raw `
    -Encoding utf8

$startMarker = "/* GLOBAL_SEARCH_SQUARE_IMAGE_START */"
$endMarker = "/* GLOBAL_SEARCH_SQUARE_IMAGE_END */"

$startIndex = $css.IndexOf($startMarker)
$endIndex = $css.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $endIndex += $endMarker.Length

    $css = $css.Remove(
        $startIndex,
        $endIndex - $startIndex
    ).TrimEnd()
}

$overrideCss = @'

/* GLOBAL_SEARCH_SQUARE_IMAGE_START */

/*
  全站搜索结果图片：
  1. 统一 1:1 方形容器
  2. 图片完整显示，不裁切
  3. 图片区域背景统一白色
*/
.global-search-result {
  grid-template-columns: 112px minmax(0, 1fr) !important;
  min-height: 128px !important;
  align-items: stretch;
}

.global-search-result-image {
  width: 96px !important;
  height: 96px !important;
  min-width: 96px !important;
  min-height: 96px !important;
  margin: 16px 0 16px 16px !important;
  padding: 8px !important;
  align-self: start;
  background: #ffffff !important;
  border: 0 !important;
  box-sizing: border-box;
}

.global-search-result-image img {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  display: block;
  object-fit: contain !important;
  object-position: center !important;
  background: #ffffff !important;
}

.global-search-result-image-empty {
  background: #ffffff !important;
  color: rgba(23, 51, 104, 0.24) !important;
}

.global-search-result-copy {
  min-height: 128px;
  padding: 15px 16px 14px !important;
}

@media (max-width: 1100px) {
  .global-search-result {
    grid-template-columns: 104px minmax(0, 1fr) !important;
  }

  .global-search-result-image {
    width: 88px !important;
    height: 88px !important;
    min-width: 88px !important;
    min-height: 88px !important;
  }
}

@media (max-width: 720px) {
  .global-search-result {
    grid-template-columns: 90px minmax(0, 1fr) !important;
    min-height: 112px !important;
  }

  .global-search-result-image {
    width: 76px !important;
    height: 76px !important;
    min-width: 76px !important;
    min-height: 76px !important;
    margin: 14px 0 14px 14px !important;
    padding: 6px !important;
  }

  .global-search-result-copy {
    min-height: 112px;
    padding: 13px 14px 12px !important;
  }
}

/* GLOBAL_SEARCH_SQUARE_IMAGE_END */
'@

$css = $css.TrimEnd() + "`r`n" + $overrideCss + "`r`n"

Set-Content `
    -LiteralPath $globalsPath `
    -Value $css `
    -Encoding utf8

Write-Host ""
Write-Host "搜索结果图片已改为 1:1 方形白底。" -ForegroundColor Green
Write-Host "图片使用 contain 完整显示，不裁切。" -ForegroundColor Cyan
Write-Host ""
Write-Host "开始构建检查……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "构建未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "构建通过。" -ForegroundColor Green
Write-Host "请重新启动开发服务并刷新页面：" -ForegroundColor Yellow
Write-Host "npm run dev"
Write-Host "============================================" -ForegroundColor Cyan
