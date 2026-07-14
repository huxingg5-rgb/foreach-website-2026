$ErrorActionPreference = "Stop"

$root = "F:\WebsiteProjects\foreach-website-2026"
$reportPath = Join-Path $root "阀系列筛选页面检查报告.md"

Set-Location -LiteralPath $root

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "开始检查阀系列筛选页面" -ForegroundColor Cyan
Write-Host "本脚本只读取文件，不会修改项目代码" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

function Get-RelativePath {
    param(
        [string]$BasePath,
        [string]$FullPath
    )

    $base = $BasePath.TrimEnd("\") + "\"
    $baseUri = New-Object System.Uri($base)
    $fileUri = New-Object System.Uri($FullPath)

    return [System.Uri]::UnescapeDataString(
        $baseUri.MakeRelativeUri($fileUri).ToString()
    ).Replace("/", "\")
}

function Escape-Markdown {
    param([string]$Text)

    if ($null -eq $Text) {
        return ""
    }

    return $Text.Replace("|", "\|")
}

$sourceFolders = @(
    "app",
    "components",
    "data",
    "lib",
    "scripts",
    "styles"
)

$allowedExtensions = @(
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".css",
    ".scss",
    ".json"
)

$files = New-Object System.Collections.Generic.List[System.IO.FileInfo]

foreach ($folder in $sourceFolders) {
    $fullFolder = Join-Path $root $folder

    if (-not (Test-Path -LiteralPath $fullFolder)) {
        continue
    }

    Get-ChildItem -LiteralPath $fullFolder -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            $allowedExtensions -contains $_.Extension.ToLower() -and
            $_.FullName -notmatch '\\node_modules\\' -and
            $_.FullName -notmatch '\\\.next\\' -and
            $_.FullName -notmatch '\\out\\' -and
            $_.FullName -notmatch '\\dist\\' -and
            $_.FullName -notmatch '\\build\\' -and
            $_.Name -notmatch '\.bak' -and
            $_.Name -notmatch 'backup'
        } |
        ForEach-Object {
            $files.Add($_)
        }
}

$searchTerms = @(
    "valve-selection.generated",
    "valveFilterLabels",
    "valveProducts",
    "productTypeId",
    "productTypeLabel",
    "filter01",
    "selectedProductType",
    "selectedProductTypes",
    "selectedFilters",
    "activeFilters",
    "产品类型",
    "阀系列",
    "旋转阀",
    "高压阀",
    "电磁阀",
    "基础配置",
    "已找到",
    "清除筛选",
    "grid-template-columns",
    "productGrid",
    "filterOption",
    "useState"
)

$fileCache = @{}
$hitsByFile = @{}
$termCounts = @{}

foreach ($term in $searchTerms) {
    $termCounts[$term] = 0
}

foreach ($file in $files) {
    try {
        $lines = @(Get-Content -LiteralPath $file.FullName -Encoding UTF8)
        $fileCache[$file.FullName] = $lines
    }
    catch {
        continue
    }

    for ($index = 0; $index -lt $lines.Count; $index++) {
        $line = [string]$lines[$index]
        $matchedTerms = New-Object System.Collections.Generic.List[string]

        foreach ($term in $searchTerms) {
            if ($line.IndexOf($term, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
                $matchedTerms.Add($term)
                $termCounts[$term]++
            }
        }

        if ($matchedTerms.Count -eq 0) {
            continue
        }

        if (-not $hitsByFile.ContainsKey($file.FullName)) {
            $hitsByFile[$file.FullName] = New-Object System.Collections.ArrayList
        }

        [void]$hitsByFile[$file.FullName].Add(
            [PSCustomObject]@{
                LineNumber = $index + 1
                Text       = $line
                Terms      = @($matchedTerms)
            }
        )
    }
}

$rankedFiles = foreach ($fullPath in $hitsByFile.Keys) {
    $relativePath = Get-RelativePath -BasePath $root -FullPath $fullPath
    $items = @($hitsByFile[$fullPath])
    $uniqueTerms = @(
        $items |
            ForEach-Object { $_.Terms } |
            Select-Object -Unique
    )

    $bonus = 0

    if ($relativePath -match 'valve') {
        $bonus += 100
    }

    if ($relativePath -match 'selection') {
        $bonus += 80
    }

    if ($relativePath -match 'product') {
        $bonus += 30
    }

    if ($relativePath -match '\.(tsx|jsx)$') {
        $bonus += 25
    }

    if ($relativePath -match '\.(css|scss)$') {
        $bonus += 15
    }

    [PSCustomObject]@{
        FullPath    = $fullPath
        Relative    = $relativePath
        HitCount    = $items.Count
        UniqueCount = $uniqueTerms.Count
        UniqueTerms = $uniqueTerms
        Score       = $bonus + ($uniqueTerms.Count * 10) + $items.Count
    }
} | Sort-Object Score -Descending

$md = New-Object System.Collections.Generic.List[string]

$md.Add("# 阀系列筛选页面检查报告")
$md.Add("")
$md.Add("> 本报告由检查脚本生成，只进行了文件读取和代码定位，没有修改任何项目文件。")
$md.Add("")
$md.Add("- 生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$md.Add("- 项目目录：``$root``")
$md.Add("- 扫描源文件数量：$($files.Count)")
$md.Add("- 匹配文件数量：$($rankedFiles.Count)")
$md.Add("")

$md.Add("## 一、当前 Git 状态")
$md.Add("")

try {
    $branch = (& git branch --show-current 2>&1 | Out-String).Trim()

    if ([string]::IsNullOrWhiteSpace($branch)) {
        $branch = "无法读取"
    }

    $md.Add("- 当前分支：``$branch``")
}
catch {
    $md.Add("- 当前分支：无法读取 Git 信息")
}

$md.Add("")
$md.Add("```text")

try {
    $gitStatus = (& git status --short 2>&1 | Out-String).TrimEnd()

    if ([string]::IsNullOrWhiteSpace($gitStatus)) {
        $md.Add("工作区干净，没有未提交修改。")
    }
    else {
        foreach ($line in ($gitStatus -split "`r?`n")) {
            $md.Add($line)
        }
    }
}
catch {
    $md.Add("无法读取 git status。")
}

$md.Add("```")
$md.Add("")

$md.Add("## 二、已确认的阀系列数据文件")
$md.Add("")

$valveDataPath = Join-Path $root "data\products\selection\valve-selection.generated.ts"

if (Test-Path -LiteralPath $valveDataPath) {
    $md.Add("- 已找到：``data\products\selection\valve-selection.generated.ts``")
    $md.Add("- 该文件应包含旋转阀、高压阀、电磁阀三张产品卡片的数据。")
}
else {
    $md.Add("- 未找到预期文件：``data\products\selection\valve-selection.generated.ts``")
}

$md.Add("")

$md.Add("## 三、关键搜索词统计")
$md.Add("")
$md.Add("| 搜索词 | 命中次数 |")
$md.Add("|---|---:|")

foreach ($term in $searchTerms) {
    $md.Add("| $(Escape-Markdown $term) | $($termCounts[$term]) |")
}

$md.Add("")

$md.Add("## 四、最可能需要修改的文件")
$md.Add("")
$md.Add("| 排名 | 文件 | 命中行数 | 命中关键词数 |")
$md.Add("|---:|---|---:|---:|")

$rank = 1

foreach ($item in ($rankedFiles | Select-Object -First 20)) {
    $md.Add(
        "| $rank | ``$($item.Relative)`` | $($item.HitCount) | $($item.UniqueCount) |"
    )
    $rank++
}

if ($rankedFiles.Count -eq 0) {
    $md.Add("| 1 | 没有找到匹配文件 | 0 | 0 |")
}

$md.Add("")

$md.Add("## 五、阀数据文件关键内容")
$md.Add("")

if (
    (Test-Path -LiteralPath $valveDataPath) -and
    $fileCache.ContainsKey($valveDataPath)
) {
    $lines = $fileCache[$valveDataPath]

    $importantPatterns = @(
        "valveFilterLabels",
        "productTypeId",
        "productTypeLabel",
        "cardTitle",
        "filter01",
        "href:",
        "detailHref:"
    )

    $importantLineNumbers = New-Object System.Collections.Generic.HashSet[int]

    for ($index = 0; $index -lt $lines.Count; $index++) {
        $line = [string]$lines[$index]

        foreach ($pattern in $importantPatterns) {
            if ($line.IndexOf($pattern, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
                $start = [Math]::Max(1, ($index + 1) - 2)
                $end = [Math]::Min($lines.Count, ($index + 1) + 3)

                for ($lineNumber = $start; $lineNumber -le $end; $lineNumber++) {
                    [void]$importantLineNumbers.Add($lineNumber)
                }

                break
            }
        }
    }

    $md.Add("```ts")

    $previous = 0

    foreach ($lineNumber in ($importantLineNumbers | Sort-Object)) {
        if ($previous -gt 0 -and $lineNumber -gt ($previous + 1)) {
            $md.Add("...")
        }

        $lineText = [string]$lines[$lineNumber - 1]
        $md.Add(("{0,5}: {1}" -f $lineNumber, $lineText))
        $previous = $lineNumber
    }

    $md.Add("```")
}
else {
    $md.Add("未读取到阀系列数据文件内容。")
}

$md.Add("")

$md.Add("## 六、组件与筛选逻辑上下文")
$md.Add("")
$md.Add("下面展示命中度最高文件的代码上下文，用于判断：")
$md.Add("")
$md.Add("1. 页面是否默认选中了旋转阀。")
$md.Add("2. 左侧标题为何显示为“产品类型”。")
$md.Add("3. 三个阀选项为何分成两行。")
$md.Add("4. 右侧为何只显示一个产品。")
$md.Add("5. 产品卡片区域是否被限制为单列或固定宽度。")
$md.Add("")

$contextFiles = @(
    $rankedFiles |
        Where-Object {
            $_.Relative -notmatch 'valve-selection\.generated\.ts$'
        } |
        Select-Object -First 12
)

foreach ($item in $contextFiles) {
    $fullPath = $item.FullPath

    if (-not $fileCache.ContainsKey($fullPath)) {
        continue
    }

    $lines = $fileCache[$fullPath]
    $hits = @($hitsByFile[$fullPath] | Select-Object -First 30)
    $wantedLines = New-Object System.Collections.Generic.HashSet[int]

    foreach ($hit in $hits) {
        $start = [Math]::Max(1, $hit.LineNumber - 4)
        $end = [Math]::Min($lines.Count, $hit.LineNumber + 5)

        for ($lineNumber = $start; $lineNumber -le $end; $lineNumber++) {
            [void]$wantedLines.Add($lineNumber)
        }
    }

    $extension = [System.IO.Path]::GetExtension($fullPath).TrimStart(".")

    $md.Add("### ``$($item.Relative)``")
    $md.Add("")
    $md.Add("- 命中行数：$($item.HitCount)")
    $md.Add("- 命中关键词：$([string]::Join('、', $item.UniqueTerms))")
    $md.Add("")
    $md.Add("```$extension")

    $previous = 0
    $shown = 0

    foreach ($lineNumber in ($wantedLines | Sort-Object)) {
        if ($shown -ge 220) {
            $md.Add("...")
            $md.Add("该文件匹配内容较多，报告中已截断。")
            break
        }

        if ($previous -gt 0 -and $lineNumber -gt ($previous + 1)) {
            $md.Add("...")
        }

        $lineText = [string]$lines[$lineNumber - 1]
        $md.Add(("{0,5}: {1}" -f $lineNumber, $lineText))

        $previous = $lineNumber
        $shown++
    }

    $md.Add("```")
    $md.Add("")
}

$md.Add("## 七、需要重点确认的逻辑")
$md.Add("")
$md.Add("请根据上面的代码检查以下位置：")
$md.Add("")
$md.Add("- 是否存在类似 ``useState('旋转阀')`` 的默认值。")
$md.Add("- 是否通过 URL 参数自动把旋转阀设为选中状态。")
$md.Add("- 是否将 ``productTypeId`` 作为必须满足的筛选条件。")
$md.Add("- 是否在未选择筛选项时错误地回退到第一项。")
$md.Add("- “产品类型”是否来自通用筛选组件的固定标题。")
$md.Add("- 左侧选项容器是否使用了固定两列布局。")
$md.Add("- 右侧卡片容器是否使用了固定宽度、单列或错误的列数。")
$md.Add("- 顶部“基础配置”标签是否来自默认激活筛选项。")
$md.Add("")

$md.Add("## 八、本次预期修改目标")
$md.Add("")
$md.Add("后续修改应实现：")
$md.Add("")
$md.Add("1. 左侧“产品类型”改为“阀系列”。")
$md.Add("2. 旋转阀、高压阀、电磁阀在 PC 端同一行展示。")
$md.Add("3. 初次进入阀系列页面时不默认选中任何阀。")
$md.Add("4. 初次进入时右侧同时显示三张阀产品卡片。")
$md.Add("5. 点击某个阀后只显示对应产品。")
$md.Add("6. 再次点击已选中的阀时取消选择并恢复三张卡片。")
$md.Add("7. 未筛选时不显示“基础配置”标签。")
$md.Add("8. 不修改产品名称、参数、图片、链接和其他已有数据。")
$md.Add("")

$utf8Bom = New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllLines($reportPath, $md, $utf8Bom)

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "检查完成，未修改任何项目代码" -ForegroundColor Green
Write-Host "报告已生成：" -ForegroundColor Green
Write-Host $reportPath -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
