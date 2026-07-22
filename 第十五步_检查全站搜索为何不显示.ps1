$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$report = Join-Path $env:USERPROFILE "Desktop\全站搜索显示故障检查_$stamp.txt"
$sb = New-Object System.Text.StringBuilder

function Add-Line {
    param([string]$Text = "")
    [void]$sb.AppendLine($Text)
}

function Add-Section {
    param([string]$Title)
    Add-Line
    Add-Line "===== $Title ====="
}

function Add-FileSnippet {
    param(
        [string]$Path,
        [string[]]$Patterns,
        [int]$Context = 8
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        Add-Line "未找到：$Path"
        return
    }

    foreach ($pattern in $Patterns) {
        $matches = Select-String `
            -LiteralPath $Path `
            -Pattern $pattern `
            -SimpleMatch `
            -Context $Context,$Context

        foreach ($match in $matches) {
            Add-Line $match.ToString()
        }
    }
}

Add-Line "全站搜索显示故障检查"
Add-Line "项目目录：$root"
Add-Line "检查时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"
$panelPath = Join-Path $root "components\search\GlobalSearchPanel.tsx"
$globalsPath = Join-Path $root "app\globals.css"
$jsonPath = Join-Path $root "public\search\global-search-index.v1.json"

# 1. JSON 文件
Add-Section "1. 轻量搜索 JSON 文件"

if (Test-Path -LiteralPath $jsonPath) {
    $jsonFile = Get-Item -LiteralPath $jsonPath
    Add-Line "文件存在：是"
    Add-Line "文件大小：$([math]::Round($jsonFile.Length / 1KB, 1)) KB"

    try {
        $jsonRaw = Get-Content -LiteralPath $jsonPath -Raw -Encoding utf8
        $items = $jsonRaw | ConvertFrom-Json
        Add-Line "JSON 解析：成功"
        Add-Line "记录数量：$($items.Count)"

        $moduleCounts = $items |
            Group-Object m |
            Sort-Object Name

        foreach ($group in $moduleCounts) {
            Add-Line "$($group.Name)：$($group.Count)"
        }

        Add-Line
        Add-Line "前 3 条记录："

        $items |
            Select-Object -First 3 |
            ConvertTo-Json -Depth 5 |
            ForEach-Object { Add-Line $_ }
    }
    catch {
        Add-Line "JSON 解析：失败"
        Add-Line $_.Exception.Message
    }
}
else {
    Add-Line "文件存在：否"
    Add-Line "缺少：public\search\global-search-index.v1.json"
}

# 2. 本地开发服务器是否能返回 JSON
Add-Section "2. 浏览器可访问的 JSON 地址"

try {
    $response = Invoke-WebRequest `
        -Uri "http://localhost:3000/search/global-search-index.v1.json" `
        -UseBasicParsing `
        -TimeoutSec 8

    Add-Line "HTTP 状态：$($response.StatusCode)"
    Add-Line "Content-Type：$($response.Headers['Content-Type'])"
    Add-Line "响应大小：$([math]::Round($response.RawContentLength / 1KB, 1)) KB"

    try {
        $remoteItems = $response.Content | ConvertFrom-Json
        Add-Line "远程 JSON 解析：成功"
        Add-Line "远程记录数量：$($remoteItems.Count)"
    }
    catch {
        Add-Line "远程 JSON 解析：失败"
        Add-Line $_.Exception.Message
    }
}
catch {
    Add-Line "访问失败：http://localhost:3000/search/global-search-index.v1.json"
    Add-Line $_.Exception.Message
}

# 3. Header 接入
Add-Section "3. SiteHeader 搜索面板接入"

Add-FileSnippet `
    -Path $headerPath `
    -Patterns @(
        'import GlobalSearchPanel',
        'preloadGlobalSearchIndex',
        'const [isSearchOpen',
        'const [searchQuery',
        '<GlobalSearchPanel',
        'aria-expanded={isSearchOpen}',
        'onClick={handleSearchButtonClick}'
    ) `
    -Context 10

# 4. 确认面板是否在 form 外面
Add-Section "4. GlobalSearchPanel 与 form 的位置关系"

if (Test-Path -LiteralPath $headerPath) {
    $headerRaw = Get-Content -LiteralPath $headerPath -Raw -Encoding utf8

    $formStart = $headerRaw.IndexOf('<form')
    $formEnd = $headerRaw.IndexOf('</form>', $formStart)
    $panelIndex = $headerRaw.IndexOf('<GlobalSearchPanel')

    Add-Line "form 开始位置：$formStart"
    Add-Line "form 结束位置：$formEnd"
    Add-Line "GlobalSearchPanel 位置：$panelIndex"

    if ($panelIndex -gt $formStart -and $panelIndex -lt $formEnd) {
        Add-Line "结论：GlobalSearchPanel 仍然在 form 内部"
    }
    elseif ($panelIndex -gt $formEnd) {
        Add-Line "结论：GlobalSearchPanel 已在 form 外部"
    }
    else {
        Add-Line "结论：无法确认位置，可能未正确插入"
    }

    Add-Line
    Add-Line "GlobalSearchPanel 附近代码："

    $lines = Get-Content -LiteralPath $headerPath -Encoding utf8
    $match = Select-String `
        -LiteralPath $headerPath `
        -Pattern '<GlobalSearchPanel' `
        -SimpleMatch |
        Select-Object -First 1

    if ($match) {
        $start = [math]::Max(0, $match.LineNumber - 16)
        $lines |
            Select-Object -Skip $start -First 42 |
            ForEach-Object { Add-Line $_ }
    }
}

# 5. 面板组件加载逻辑
Add-Section "5. GlobalSearchPanel 加载与显示逻辑"

Add-FileSnippet `
    -Path $panelPath `
    -Patterns @(
        'SEARCH_INDEX_URL',
        'preloadGlobalSearchIndex',
        'if (!isOpen) return null',
        'showLoading',
        'global-search-panel',
        'loadState === "error"'
    ) `
    -Context 12

# 6. CSS 覆盖
Add-Section "6. 全屏搜索 CSS"

Add-FileSnippet `
    -Path $globalsPath `
    -Patterns @(
        'GLOBAL_SEARCH_OVERLAY_START',
        'GLOBAL_SEARCH_FULL_PAGE_OVERRIDE_START',
        '.global-search-panel {',
        '.global-search-backdrop {',
        'body.global-search-lock'
    ) `
    -Context 12

# 7. 检查关键 CSS 是否冲突
Add-Section "7. 可能隐藏搜索面板的 CSS"

if (Test-Path -LiteralPath $globalsPath) {
    $cssMatches = Select-String `
        -LiteralPath $globalsPath `
        -Pattern @(
            'display: none',
            'visibility: hidden',
            'opacity: 0',
            'z-index:'
        ) `
        -SimpleMatch

    $relevant = $cssMatches |
        Where-Object {
            $_.LineNumber -gt 14000
        } |
        Select-Object -Last 80

    foreach ($match in $relevant) {
        Add-Line "L$($match.LineNumber)  $($match.Line.Trim())"
    }
}

[System.IO.File]::WriteAllText(
    $report,
    $sb.ToString(),
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "检查完成，没有修改代码。" -ForegroundColor Green
Write-Host "报告：" -ForegroundColor Cyan
Write-Host $report
