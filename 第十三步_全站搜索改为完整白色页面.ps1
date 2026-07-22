$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"
$globalsPath = Join-Path $root "app\globals.css"
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

foreach ($path in @($headerPath, $globalsPath)) {
    if (-not (Test-Path -LiteralPath $path)) {
        throw "未找到文件：$path"
    }

    Copy-Item `
        -LiteralPath $path `
        -Destination "$path.bak_full_search_page_$stamp" `
        -Force
}

# ============================================================
# 1. 把搜索面板移出 Header 中间搜索表单
#    避免 fixed 被表单定位范围限制
# ============================================================

$header = Get-Content `
    -LiteralPath $headerPath `
    -Raw `
    -Encoding utf8

$panelPattern = '(?s)\s*<GlobalSearchPanel\s+isOpen=\{isSearchOpen\}.*?\/>'
$panelMatch = [regex]::Match($header, $panelPattern)

if (-not $panelMatch.Success) {
    throw "未找到 GlobalSearchPanel 接入代码，未执行修改。"
}

$panelBlock = $panelMatch.Value.Trim()
$header = $header.Remove(
    $panelMatch.Index,
    $panelMatch.Length
)

$closingHeaderIndex = $header.LastIndexOf("</header>")

if ($closingHeaderIndex -lt 0) {
    throw "未找到 SiteHeader 的 </header>。"
}

$panelAtHeaderRoot = @"

        $panelBlock
"@

$header = $header.Insert(
    $closingHeaderIndex,
    $panelAtHeaderRoot
)

Set-Content `
    -LiteralPath $headerPath `
    -Value $header `
    -Encoding utf8

# ============================================================
# 2. 搜索面板改成 Header 下方完整白色页面
# ============================================================

$css = Get-Content `
    -LiteralPath $globalsPath `
    -Raw `
    -Encoding utf8

$startMarker = "/* GLOBAL_SEARCH_FULL_PAGE_OVERRIDE_START */"
$endMarker = "/* GLOBAL_SEARCH_FULL_PAGE_OVERRIDE_END */"

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

/* GLOBAL_SEARCH_FULL_PAGE_OVERRIDE_START */

/*
  顶部全站搜索：
  1. 从 Header 下方铺满整个剩余页面
  2. 搜索结果区域统一白底
  3. 不再显示悬浮卡片和灰色遮罩
*/
.global-search-backdrop {
  display: none !important;
}

.global-search-panel {
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  max-height: none !important;
  border-top: 1px solid #e1e7ef !important;
  background: #ffffff !important;
  box-shadow: none !important;
}

.global-search-panel-inner {
  width: min(1440px, calc(100% - 64px)) !important;
  min-height: 100%;
  padding: 22px 0 56px !important;
  background: #ffffff;
}

.global-search-panel-head {
  position: sticky;
  top: 0;
  z-index: 5;
  padding: 4px 0 18px;
  background: #ffffff;
}

.global-search-modules,
.global-search-module,
.global-search-start,
.global-search-status {
  background: #ffffff;
}

/*
  搜索面板按钮继承官网既有按钮语言：
  默认白底深蓝字，交互后深蓝底荧光字。
  不使用上浮、阴影和大圆角。
*/
.global-search-close,
.global-search-more,
.global-search-suggestions button {
  border: 1px solid #173368 !important;
  border-radius: 7px !important;
  background: #ffffff !important;
  color: #173368 !important;
  box-shadow: none !important;
  transform: none !important;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease !important;
}

.global-search-close:hover,
.global-search-close:focus-visible,
.global-search-more:hover,
.global-search-more:focus-visible,
.global-search-suggestions button:hover,
.global-search-suggestions button:focus-visible {
  border-color: #173368 !important;
  background: #173368 !important;
  color: #09e9b4 !important;
  transform: none !important;
}

.global-search-result {
  border-radius: 0 !important;
  box-shadow: none !important;
}

.global-search-result:hover {
  border-color: #09e9b4 !important;
  transform: none !important;
}

body.global-search-lock {
  overflow: hidden;
  background: #ffffff;
}

@media (max-width: 720px) {
  .global-search-panel-inner {
    width: calc(100% - 28px) !important;
    padding-bottom: 38px !important;
  }
}

/* GLOBAL_SEARCH_FULL_PAGE_OVERRIDE_END */
'@

$css = $css.TrimEnd() + "`r`n" + $overrideCss + "`r`n"

Set-Content `
    -LiteralPath $globalsPath `
    -Value $css `
    -Encoding utf8

Write-Host ""
Write-Host "已将全站搜索改为完整白色页面。" -ForegroundColor Green
Write-Host "按钮已恢复官网既有样式：" -ForegroundColor Cyan
Write-Host "白底深蓝字 → 深蓝底荧光字"
Write-Host ""
Write-Host "开始构建检查……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "构建未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "构建通过。" -ForegroundColor Green
Write-Host "请重新启动开发服务后测试：" -ForegroundColor Yellow
Write-Host "npm run dev"
Write-Host "============================================" -ForegroundColor Cyan
