$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

$componentPath = Join-Path $root "components\resources\fitting-replacement\FittingReplacementHome.tsx"
$cssPath = Join-Path $root "app\resources\selection-support\fitting-replacement\fitting-replacement.css"

foreach ($file in @($componentPath, $cssPath)) {
    if (-not (Test-Path $file)) {
        throw "未找到文件：$file"
    }

    Copy-Item $file "$file.bak_full_width_search_$stamp" -Force
}

# ============================================================
# 1. 调整组件结构
#    面包屑继续在内容宽度内
#    搜索灰色区域移到容器外，成为全宽区域
# ============================================================

$component = Get-Content $componentPath -Raw -Encoding utf8

$oldOpen = @'
        <div className="frp-container">
          <Breadcrumb items={data.breadcrumbs} />

          <section className="frp-search-panel">
            <div className="frp-search-row">
'@

$newOpen = @'
        <div className="frp-container">
          <Breadcrumb items={data.breadcrumbs} />
        </div>

        <section className="frp-search-panel">
          <div className="frp-container frp-search-panel-inner">
            <div className="frp-search-row">
'@

if (-not $component.Contains($oldOpen)) {
    throw "未找到搜索区开始位置，未修改文件。"
}

$component = $component.Replace($oldOpen, $newOpen)

$oldClose = @'
            </div>
          </section>
        </div>

        <section className="frp-card-section">
'@

$newClose = @'
            </div>
          </div>
        </section>

        <section className="frp-card-section">
'@

if (-not $component.Contains($oldClose)) {
    throw "未找到搜索区结束位置，未修改文件。"
}

$component = $component.Replace($oldClose, $newClose)

Set-Content -Path $componentPath -Value $component -Encoding utf8

# ============================================================
# 2. 添加全宽搜索区样式
#    只让灰色背景全宽，输入框仍保持居中和合理宽度
# ============================================================

$css = Get-Content $cssPath -Raw -Encoding utf8

$startMarker = "/* COMPATIBLE_MODEL_FULL_WIDTH_SEARCH_START */"
$endMarker = "/* COMPATIBLE_MODEL_FULL_WIDTH_SEARCH_END */"

$startIndex = $css.IndexOf($startMarker)
$endIndex = $css.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $endIndex += $endMarker.Length
    $css = $css.Remove($startIndex, $endIndex - $startIndex).TrimEnd()
}

$styleBlock = @'

/* COMPATIBLE_MODEL_FULL_WIDTH_SEARCH_START */
/*
  接头兼容型号查询：
  搜索背景横向铺满整个屏幕，
  搜索框与示例型号继续居中显示。
*/

.fitting-replacement-page .frp-search-panel {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  background: #f4f7fa;
  border-top: 1px solid rgba(23, 51, 104, 0.1);
  border-bottom: 1px solid rgba(23, 51, 104, 0.1);
}

.fitting-replacement-page .frp-search-panel-inner {
  padding-top: 20px;
  padding-bottom: 18px;
}

.fitting-replacement-page .frp-search-row,
.fitting-replacement-page .frp-history-row {
  width: min(760px, 100%);
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 720px) {
  .fitting-replacement-page .frp-search-panel-inner {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .fitting-replacement-page .frp-search-row,
  .fitting-replacement-page .frp-history-row {
    width: 100%;
  }
}
/* COMPATIBLE_MODEL_FULL_WIDTH_SEARCH_END */
'@

$css = $css.TrimEnd() + "`r`n" + $styleBlock + "`r`n"
Set-Content -Path $cssPath -Value $css -Encoding utf8

Write-Host ""
Write-Host "搜索区域已改为全屏宽度。" -ForegroundColor Green
Write-Host "面包屑和搜索内容仍保持居中内容宽度。" -ForegroundColor Green
Write-Host ""

Write-Host "开始构建检查……" -ForegroundColor Cyan
npm run build
