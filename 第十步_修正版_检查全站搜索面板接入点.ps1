$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$report = Join-Path $env:USERPROFILE "Desktop\全站搜索面板接入检查_$stamp.txt"
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

Add-Line "全站搜索面板接入检查"
Add-Line "项目目录：$root"
Add-Line "检查时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# 1. Header 搜索状态与事件
Add-Section "1. SiteHeader 搜索状态与事件"

$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"

if (Test-Path $headerPath) {
    $matches = Select-String `
        -LiteralPath $headerPath `
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
        -Context 4,12

    foreach ($match in $matches) {
        Add-Line $match.ToString()
    }
}
else {
    Add-Line "未找到：components\layout\SiteHeader.tsx"
}

# 2. Header 搜索 CSS
Add-Section "2. Header 搜索相关 CSS"

$cssFiles = Get-ChildItem `
    (Join-Path $root "app"), `
    (Join-Path $root "components") `
    -Recurse -File `
    -Include *.css,*.module.css `
    -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)\\' -and
        $_.Name -notmatch '\.bak'
    }

foreach ($file in $cssFiles) {
    $matches = Select-String `
        -LiteralPath $file.FullName `
        -Pattern @(
            ".site-search-mode-form",
            ".site-search-mode-box",
            ".site-search-mode-input",
            ".site-search-trigger"
        ) `
        -SimpleMatch `
        -Context 3,10

    if ($matches) {
        Add-Line
        Add-Line "--- $($file.FullName.Replace("$root\", "")) ---"

        foreach ($match in $matches) {
            Add-Line $match.ToString()
        }
    }
}

# 3. 模块数据文件
Add-Section "3. 搜索模块候选数据文件"

$moduleRegex = 'installation|tutorial|technical|material-compatibility|datasheet|news|application|industry|fitting-replacement|compatible-model'

$moduleFiles = Get-ChildItem `
    (Join-Path $root "app"), `
    (Join-Path $root "data"), `
    (Join-Path $root "components"), `
    (Join-Path $root "services") `
    -Recurse -File `
    -Include *.ts,*.tsx,*.json `
    -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch '\\(node_modules|\.next|out|\.git)\\' -and
        $_.Name -notmatch '\.bak' -and
        $_.FullName -match $moduleRegex
    } |
    Sort-Object FullName -Unique

foreach ($file in $moduleFiles) {
    Add-Line $file.FullName.Replace("$root\", "")
}

# 4. 数据导出名称、标题与链接
Add-Section "4. 各模块导出名称、标题和链接"

$dataFiles = Get-ChildItem (Join-Path $root "data") `
    -Recurse -File `
    -Include *.ts,*.json `
    -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -notmatch '\.bak' -and
        $_.FullName -match $moduleRegex
    }

foreach ($file in $dataFiles) {
    $matches = Select-String `
        -LiteralPath $file.FullName `
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
        Select-Object -First 15

    if ($matches) {
        Add-Line
        Add-Line "--- $($file.FullName.Replace("$root\", "")) ---"

        foreach ($match in $matches) {
            Add-Line "L$($match.LineNumber)  $($match.Line.Trim())"
        }
    }
}

# 5. 当前搜索实现
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

foreach ($relativePath in $searchFiles) {
    $fullPath = Join-Path $root $relativePath

    if (Test-Path -LiteralPath $fullPath) {
        $file = Get-Item -LiteralPath $fullPath
        $sizeKB = [math]::Round($file.Length / 1KB, 1)
        Add-Line "$relativePath  [$sizeKB KB]"
    }
    else {
        Add-Line "$relativePath  [不存在]"
    }
}

# 6. Header 文件结尾
Add-Section "6. SiteHeader 文件结尾"

if (Test-Path $headerPath) {
    $tail = Get-Content -LiteralPath $headerPath -Encoding utf8 |
        Select-Object -Last 140

    foreach ($line in $tail) {
        Add-Line $line
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
