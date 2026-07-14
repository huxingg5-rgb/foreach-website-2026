$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$report = Join-Path $env:USERPROFILE "Desktop\全站搜索面板接入检查.txt"

function Add-Section {
    param([string]$Title)

    "`r`n===== $Title =====" |
        Add-Content -LiteralPath $report -Encoding utf8
}

"全站搜索面板接入检查" |
    Set-Content -LiteralPath $report -Encoding utf8

# 1. Header 搜索状态、事件和 JSX
Add-Section "1. SiteHeader 搜索状态与事件"

Select-String `
    -LiteralPath "components\layout\SiteHeader.tsx" `
    -Pattern @(
        "isSearchOpen",
        "searchModeRef",
        "searchInputRef",
        "searchTriggerRef",
        "handleSearchButtonClick",
        "closeAllPanels",
        "site-search-mode-form"
    ) `
    -SimpleMatch `
    -Context 5,14 |
    ForEach-Object { $_.ToString() } |
    Add-Content -LiteralPath $report -Encoding utf8

# 2. Header 搜索 CSS
Add-Section "2. Header 搜索相关 CSS"

Get-ChildItem "app","components" -Recurse -File `
    -Include *.css,*.module.css `
    -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)\\' -and
        $_.Name -notmatch '\.bak'
    } |
    Select-String `
        -Pattern @(
            ".site-search-mode-form",
            ".site-search-mode-box",
            ".site-search-mode-input",
            ".site-search-trigger",
            ".site-header",
            "z-index"
        ) `
        -SimpleMatch `
        -Context 3,10 |
    ForEach-Object {
        $path = $_.Path.Replace("$root\", "")
        "`r`n--- $path : L$($_.LineNumber) ---"
        $_.ToString()
    } |
    Add-Content -LiteralPath $report -Encoding utf8

# 3. 搜索模块候选数据文件
Add-Section "3. 各搜索模块的数据文件与页面路由"

$modulePatterns = @(
    "installation",
    "tutorial",
    "technical-article",
    "technical_articles",
    "material-compatibility",
    "materialCompatibility",
    "datasheet",
    "news",
    "application",
    "industry",
    "fitting-replacement",
    "compatible-model",
    "search"
)

Get-ChildItem "app","data","components","services" -Recurse -File `
    -Include *.ts,*.tsx,*.json `
    -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)\\' -and
        $_.Name -notmatch '\.bak'
    } |
    Where-Object {
        $relative = $_.FullName.Replace("$root\", "")
        $modulePatterns | Where-Object {
            $relative -match [regex]::Escape($_)
        }
    } |
    ForEach-Object {
        $_.FullName.Replace("$root\", "")
    } |
    Sort-Object -Unique |
    Add-Content -LiteralPath $report -Encoding utf8

# 4. 各模块导出名称与 href / slug 结构
Add-Section "4. 各模块导出名称、href 和 slug"

Get-ChildItem "data" -Recurse -File `
    -Include *.ts,*.json `
    -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)\\' -and
        $_.Name -notmatch '\.bak' -and
        (
            $_.FullName -match 'installation|technical|material|datasheet|news|application|fitting-replacement|compatible-model'
        )
    } |
    ForEach-Object {
        $matches = Select-String `
            -LiteralPath $_.FullName `
            -Pattern @(
                "export const ",
                '"title"',
                "title:",
                '"slug"',
                "slug:",
                '"href"',
                "href:",
                '"keywords"',
                "keywords:"
            ) `
            -SimpleMatch |
            Select-Object -First 18

        if ($matches) {
            $relative = $_.FullName.Replace("$root\", "")
            "`r`n--- $relative ---" |
                Add-Content -LiteralPath $report -Encoding utf8

            $matches |
                ForEach-Object {
                    "L$($_.LineNumber)  $($_.Line.Trim())"
                } |
                Add-Content -LiteralPath $report -Encoding utf8
        }
    }

# 5. 当前搜索文件与大小
Add-Section "5. 当前搜索实现文件"

$searchFiles = @(
    "app\search\page.tsx",
    "app\[locale]\search\page.tsx",
    "components\search\SiteSearchClient.tsx",
    "components\search\site-search.css",
    "data\search\site-search.types.ts",
    "data\search\site-search-index.generated.ts",
    "scripts\search\generate-site-search-index.ts"
)

foreach ($relative in $searchFiles) {
    $full = Join-Path $root $relative

    if (Test-Path -LiteralPath $full) {
        $file = Get-Item -LiteralPath $full
        $sizeKB = [math]::Round($file.Length / 1KB, 1)
        "$relative  [$sizeKB KB]" |
            Add-Content -LiteralPath $report -Encoding utf8
    }
    else {
        "$relative  [不存在]" |
            Add-Content -LiteralPath $report -Encoding utf8
    }
}

# 6. Header 组件结尾，确认插入面板的位置
Add-Section "6. SiteHeader 文件结尾"

Get-Content -LiteralPath "components\layout\SiteHeader.tsx" -Encoding utf8 |
    Select-Object -Last 140 |
    Add-Content -LiteralPath $report -Encoding utf8

Write-Host ""
Write-Host "检查完成，没有修改代码。" -ForegroundColor Green
Write-Host $report -ForegroundColor Cyan
