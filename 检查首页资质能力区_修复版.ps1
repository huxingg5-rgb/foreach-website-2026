$ErrorActionPreference = "Stop"

# =========================================================
# 官网首页资质 / 能力区域检查脚本
# 只检查，不修改项目文件
# =========================================================

$projectRoot = "F:\WebsiteProjects\foreach-website-2026"
$sourceImageRoot = "C:\Users\Administrator\Desktop\新建文件夹\新建文件夹"

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$desktopPath = [Environment]::GetFolderPath("Desktop")
$reportFileName = "官网首页资质能力区检查_$stamp.md"
$reportPath = Join-Path $desktopPath $reportFileName
$tempReportPath = Join-Path $env:TEMP $reportFileName

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "项目目录不存在：$projectRoot"
}

if (-not (Test-Path -LiteralPath $sourceImageRoot)) {
    throw "证书图片目录不存在：$sourceImageRoot"
}

# 使用内存列表收集报告内容，最后一次性写入。
$script:reportLines = New-Object "System.Collections.Generic.List[string]"

function Add-Line {
    param(
        [AllowEmptyString()]
        [string]$Text = ""
    )

    $script:reportLines.Add($Text) | Out-Null
}

function Get-RelativePathSafe {
    param(
        [string]$BasePath,
        [string]$TargetPath
    )

    try {
        $baseFull = [System.IO.Path]::GetFullPath($BasePath).TrimEnd("\")
        $targetFull = [System.IO.Path]::GetFullPath($TargetPath)

        if ($targetFull.StartsWith($baseFull, [System.StringComparison]::OrdinalIgnoreCase)) {
            return $targetFull.Substring($baseFull.Length).TrimStart("\")
        }

        return $targetFull
    }
    catch {
        return $TargetPath
    }
}

function Add-FileContext {
    param(
        [string]$Path,
        [int]$LineNumber,
        [int]$Before = 25,
        [int]$After = 35
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        return
    }

    $lines = @(Get-Content -LiteralPath $Path -Encoding utf8)

    if ($lines.Count -eq 0) {
        return
    }

    $start = [Math]::Max(1, $LineNumber - $Before)
    $end = [Math]::Min($lines.Count, $LineNumber + $After)
    $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $Path

    Add-Line
    Add-Line "### $relative"
    Add-Line
    Add-Line "命中行：$LineNumber"
    Add-Line
    Add-Line '```text'

    for ($i = $start; $i -le $end; $i++) {
        $marker = if ($i -eq $LineNumber) { ">>" } else { "  " }
        Add-Line ("{0} {1,5}: {2}" -f $marker, $i, $lines[$i - 1])
    }

    Add-Line '```'
}

function Get-ImageInfo {
    param([string]$Path)

    $width = ""
    $height = ""

    try {
        Add-Type -AssemblyName System.Drawing -ErrorAction SilentlyContinue
        $imageObject = [System.Drawing.Image]::FromFile($Path)
        $width = $imageObject.Width
        $height = $imageObject.Height
        $imageObject.Dispose()
    }
    catch {
        $width = "读取失败"
        $height = "读取失败"
    }

    return [PSCustomObject]@{
        Width  = $width
        Height = $height
    }
}

# =========================================================
# 1. 报告标题
# =========================================================
Add-Line "# 官网首页资质 / 能力区域检查报告"
Add-Line
Add-Line "- 生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "- 项目目录：$projectRoot"
Add-Line "- 证书源图目录：$sourceImageRoot"
Add-Line "- 本报告只检查，不修改任何文件。"
Add-Line

# =========================================================
# 2. Git 状态
# =========================================================
Add-Line "## 1. 当前 Git 状态"
Add-Line
Add-Line '```text'

Push-Location $projectRoot
try {
    $gitBranch = git branch --show-current 2>&1
    $gitStatus = git status --short 2>&1

    Add-Line "分支：$gitBranch"

    if ([string]::IsNullOrWhiteSpace(($gitStatus -join "`n"))) {
        Add-Line "工作区：干净，无未提交修改"
    }
    else {
        Add-Line "未提交内容："

        foreach ($line in $gitStatus) {
            Add-Line $line
        }
    }
}
catch {
    Add-Line "Git 状态读取失败：$($_.Exception.Message)"
}
finally {
    Pop-Location
}

Add-Line '```'
Add-Line

# =========================================================
# 3. 搜索范围
# =========================================================
$searchRoots = @(
    (Join-Path $projectRoot "app"),
    (Join-Path $projectRoot "components"),
    (Join-Path $projectRoot "data"),
    (Join-Path $projectRoot "lib"),
    (Join-Path $projectRoot "src")
) | Where-Object {
    Test-Path -LiteralPath $_
}

$codeExtensions = @(
    ".tsx", ".ts", ".jsx", ".js",
    ".json", ".md", ".mdx",
    ".css", ".scss"
)

$searchFiles = @(
    foreach ($root in $searchRoots) {
        Get-ChildItem -LiteralPath $root -Recurse -File -ErrorAction SilentlyContinue |
            Where-Object {
                $_.Extension.ToLowerInvariant() -in $codeExtensions -and
                $_.FullName -notmatch "\\node_modules\\" -and
                $_.FullName -notmatch "\\\.next\\" -and
                $_.FullName -notmatch "\\out\\" -and
                $_.FullName -notmatch "\\dist\\" -and
                $_.Name -notmatch "\.bak"
            }
    }
)

$targetLabels = @(
    "质量管理体系",
    "研发制造能力",
    "产品测试验证",
    "企业资质认证",
    "供应链协同",
    "项目交付经验"
)

# =========================================================
# 4. 定位红框区域
# =========================================================
Add-Line "## 2. 红框区域文字定位"
Add-Line

$targetMatches = New-Object System.Collections.Generic.List[object]
$componentSet = New-Object "System.Collections.Generic.HashSet[string]"

foreach ($file in $searchFiles) {
    foreach ($label in $targetLabels) {
        $matches = Select-String `
            -LiteralPath $file.FullName `
            -Pattern $label `
            -SimpleMatch `
            -Encoding utf8 `
            -ErrorAction SilentlyContinue

        foreach ($match in $matches) {
            $targetMatches.Add([PSCustomObject]@{
                Label      = $label
                Path       = $file.FullName
                LineNumber = $match.LineNumber
                Line       = $match.Line.Trim()
            })

            $null = $componentSet.Add($file.FullName)
        }
    }
}

if ($targetMatches.Count -eq 0) {
    Add-Line "没有直接找到六个中文标题。可能由数组、翻译文件或接口数据生成。"
}
else {
    Add-Line "| 标题 | 文件 | 行号 |"
    Add-Line "|---|---|---:|"

    foreach ($match in $targetMatches) {
        $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $match.Path
        Add-Line "| $($match.Label) | ``$relative`` | $($match.LineNumber) |"
    }

    Add-Line
    Add-Line "### 组件上下文"

    foreach ($match in $targetMatches) {
        Add-FileContext `
            -Path $match.Path `
            -LineNumber $match.LineNumber `
            -Before 45 `
            -After 75
    }
}

# =========================================================
# 5. 提取组件中使用的 className
# =========================================================
Add-Line
Add-Line "## 3. 红框区域使用的样式类"
Add-Line

$classSet = New-Object "System.Collections.Generic.HashSet[string]"
$literalClassSet = New-Object "System.Collections.Generic.HashSet[string]"

foreach ($match in $targetMatches) {
    $lines = @(Get-Content -LiteralPath $match.Path -Encoding utf8)

    if ($lines.Count -eq 0) {
        continue
    }

    $start = [Math]::Max(0, $match.LineNumber - 120)
    $end = [Math]::Min($lines.Count - 1, $match.LineNumber + 160)

    if ($end -lt $start) {
        continue
    }

    $chunk = ($lines[$start..$end] -join "`n")

    foreach ($classMatch in [regex]::Matches(
        $chunk,
        'styles\.([A-Za-z_][A-Za-z0-9_-]*)'
    )) {
        $null = $classSet.Add($classMatch.Groups[1].Value)
    }

    foreach ($literalMatch in [regex]::Matches(
        $chunk,
        'className\s*=\s*["'']([^"'']+)["'']'
    )) {
        foreach ($className in ($literalMatch.Groups[1].Value -split "\s+")) {
            if (-not [string]::IsNullOrWhiteSpace($className)) {
                $null = $literalClassSet.Add($className)
            }
        }
    }
}

Add-Line "### CSS Module 类名"
Add-Line

if ($classSet.Count -eq 0) {
    Add-Line "未提取到 ``styles.xxx`` 类名。"
}
else {
    foreach ($className in ($classSet | Sort-Object)) {
        Add-Line "- ``$className``"
    }
}

Add-Line
Add-Line "### 普通 className"
Add-Line

if ($literalClassSet.Count -eq 0) {
    Add-Line "未提取到普通字符串类名。"
}
else {
    foreach ($className in ($literalClassSet | Sort-Object)) {
        Add-Line "- ``$className``"
    }
}

# =========================================================
# 6. 查找组件导入的 CSS
# =========================================================
Add-Line
Add-Line "## 4. 组件导入的样式文件"
Add-Line

$cssSet = New-Object "System.Collections.Generic.HashSet[string]"
$allCssFiles = @(
    $searchFiles | Where-Object {
        $_.Extension.ToLowerInvariant() -in @(".css", ".scss")
    }
)

foreach ($componentPath in $componentSet) {
    $raw = Get-Content -LiteralPath $componentPath -Raw -Encoding utf8

    $importMatches = [regex]::Matches(
        $raw,
        'from\s+["''](?<path>[^"'']+\.(?:css|scss))["'']'
    )

    foreach ($importMatch in $importMatches) {
        $cssRelative = $importMatch.Groups["path"].Value
        $resolvedCss = $null

        if ($cssRelative.StartsWith(".")) {
            try {
                $resolvedCss = [System.IO.Path]::GetFullPath(
                    (Join-Path (Split-Path $componentPath -Parent) $cssRelative)
                )
            }
            catch {
                $resolvedCss = $null
            }
        }

        if ($resolvedCss -and (Test-Path -LiteralPath $resolvedCss)) {
            $null = $cssSet.Add($resolvedCss)
        }
        else {
            $cssBaseName = Split-Path $cssRelative -Leaf

            foreach ($candidate in $allCssFiles) {
                if ($candidate.Name -eq $cssBaseName) {
                    $null = $cssSet.Add($candidate.FullName)
                }
            }
        }
    }
}

foreach ($cssFile in $allCssFiles) {
    $cssRaw = Get-Content -LiteralPath $cssFile.FullName -Raw -Encoding utf8

    foreach ($className in $classSet) {
        if ($cssRaw -match ("\." + [regex]::Escape($className) + "(?![A-Za-z0-9_-])")) {
            $null = $cssSet.Add($cssFile.FullName)
        }
    }

    foreach ($className in $literalClassSet) {
        if ($cssRaw -match ("\." + [regex]::Escape($className) + "(?![A-Za-z0-9_-])")) {
            $null = $cssSet.Add($cssFile.FullName)
        }
    }
}

if ($cssSet.Count -eq 0) {
    Add-Line "未定位到相关 CSS 文件。"
}
else {
    foreach ($cssPath in ($cssSet | Sort-Object)) {
        $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $cssPath
        Add-Line "- ``$relative``"
    }
}

# =========================================================
# 7. 输出相关 CSS 上下文与断点
# =========================================================
Add-Line
Add-Line "## 5. 当前 PC 与手机端 CSS"
Add-Line

foreach ($cssPath in ($cssSet | Sort-Object)) {
    $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $cssPath

    Add-Line
    Add-Line "### $relative"
    Add-Line

    $reportedLines = New-Object "System.Collections.Generic.HashSet[int]"

    foreach ($className in $classSet) {
        $selectorMatches = Select-String `
            -LiteralPath $cssPath `
            -Pattern ".$className" `
            -SimpleMatch `
            -Encoding utf8 `
            -ErrorAction SilentlyContinue

        foreach ($selectorMatch in $selectorMatches) {
            if ($reportedLines.Add($selectorMatch.LineNumber)) {
                Add-FileContext `
                    -Path $cssPath `
                    -LineNumber $selectorMatch.LineNumber `
                    -Before 18 `
                    -After 45
            }
        }
    }

    foreach ($className in $literalClassSet) {
        $selectorMatches = Select-String `
            -LiteralPath $cssPath `
            -Pattern ".$className" `
            -SimpleMatch `
            -Encoding utf8 `
            -ErrorAction SilentlyContinue

        foreach ($selectorMatch in $selectorMatches) {
            if ($reportedLines.Add($selectorMatch.LineNumber)) {
                Add-FileContext `
                    -Path $cssPath `
                    -LineNumber $selectorMatch.LineNumber `
                    -Before 18 `
                    -After 45
            }
        }
    }

    Add-Line
    Add-Line "#### 文件中的响应式断点"
    Add-Line

    $mediaMatches = Select-String `
        -LiteralPath $cssPath `
        -Pattern "@media" `
        -SimpleMatch `
        -Encoding utf8 `
        -ErrorAction SilentlyContinue

    if (-not $mediaMatches) {
        Add-Line "该文件没有找到 ``@media``。"
    }
    else {
        Add-Line '```text'

        foreach ($mediaMatch in $mediaMatches) {
            Add-Line ("{0,5}: {1}" -f $mediaMatch.LineNumber, $mediaMatch.Line.Trim())
        }

        Add-Line '```'
    }
}

# =========================================================
# 8. 检查组件当前图片引用
# =========================================================
Add-Line
Add-Line "## 6. 红框区域组件中的图片引用"
Add-Line

$imageReferencePattern = 'src\s*=|backgroundImage|background-image|url\(|\.png|\.jpg|\.jpeg|\.webp|\.svg'

foreach ($componentPath in ($componentSet | Sort-Object)) {
    $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $componentPath
    $imageMatches = Select-String `
        -LiteralPath $componentPath `
        -Pattern $imageReferencePattern `
        -Encoding utf8 `
        -ErrorAction SilentlyContinue

    Add-Line
    Add-Line "### $relative"
    Add-Line

    if (-not $imageMatches) {
        Add-Line "没有直接图片引用。"
        continue
    }

    Add-Line '```text'

    foreach ($imageMatch in ($imageMatches | Select-Object -First 100)) {
        Add-Line ("{0,5}: {1}" -f $imageMatch.LineNumber, $imageMatch.Line.Trim())
    }

    Add-Line '```'
}

# =========================================================
# 9. 检查 public 中现有证书或资质图片
# =========================================================
Add-Line
Add-Line "## 7. public 中现有的证书 / 资质相关素材"
Add-Line

$publicRoot = Join-Path $projectRoot "public"
$publicImageExtensions = @(".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif")

if (Test-Path -LiteralPath $publicRoot) {
    $existingPublicImages = @(
        Get-ChildItem `
            -LiteralPath $publicRoot `
            -Recurse `
            -File `
            -ErrorAction SilentlyContinue |
            Where-Object {
                $_.Extension.ToLowerInvariant() -in $publicImageExtensions -and
                (
                    $_.FullName -match "(?i)cert|certificate|qualification|quality|iso|rohs|patent|honor" -or
                    $_.FullName -match "证书|资质|认证|荣誉|专利|质量"
                )
            }
    )

    if ($existingPublicImages.Count -eq 0) {
        Add-Line "没有发现明显命名为证书、资质、认证或质量的图片。"
    }
    else {
        foreach ($imageFile in $existingPublicImages) {
            $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $imageFile.FullName
            Add-Line "- ``$relative``"
        }
    }
}
else {
    Add-Line "项目中不存在 public 目录。"
}

# =========================================================
# 10. 源证书图片清单与尺寸
# =========================================================
Add-Line
Add-Line "## 8. 待使用证书图片清单"
Add-Line

$sourceImages = @(
    Get-ChildItem `
        -LiteralPath $sourceImageRoot `
        -Recurse `
        -File `
        -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Extension.ToLowerInvariant() -in @(
                ".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"
            )
        } |
        Sort-Object Name
)

if ($sourceImages.Count -eq 0) {
    Add-Line "源目录中没有找到图片。"
}
else {
    Add-Line "| 序号 | 文件名 | 尺寸 | 文件大小 |"
    Add-Line "|---:|---|---:|---:|"

    $index = 1

    foreach ($sourceImage in $sourceImages) {
        $imageInfo = Get-ImageInfo -Path $sourceImage.FullName
        $sizeKb = [Math]::Round($sourceImage.Length / 1KB, 1)
        $safeName = $sourceImage.Name.Replace("|", "\|")

        Add-Line "| $index | $safeName | $($imageInfo.Width) × $($imageInfo.Height) | $sizeKb KB |"
        $index++
    }
}

# =========================================================
# 11. 首页入口文件与相关组件
# =========================================================
Add-Line
Add-Line "## 9. 首页入口文件与相关组件"
Add-Line

$homeCandidates = @(
    (Join-Path $projectRoot "app\page.tsx"),
    (Join-Path $projectRoot "app\page.jsx"),
    (Join-Path $projectRoot "app\home\page.tsx"),
    (Join-Path $projectRoot "app\[locale]\page.tsx")
)

foreach ($homeCandidate in $homeCandidates) {
    if (Test-Path -LiteralPath $homeCandidate) {
        $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $homeCandidate
        Add-Line "- ``$relative``"
    }
}

foreach ($componentPath in ($componentSet | Sort-Object)) {
    $relative = Get-RelativePathSafe -BasePath $projectRoot -TargetPath $componentPath
    Add-Line "- 红框组件候选：``$relative``"
}

# =========================================================
# 12. 下一步检查重点
# =========================================================
Add-Line
Add-Line "## 10. 下一步修改重点"
Add-Line
Add-Line "1. 红框区域外层高度、背景图和遮罩透明度。"
Add-Line "2. 六个卡片当前是否使用空白占位图、背景图或伪元素。"
Add-Line "3. PC 端六列布局的宽度、图片比例、文字位置和 hover。"
Add-Line "4. 手机端是一列、两列还是横向滑动，以及图片裁切方式。"
Add-Line "5. 证书图片复制到 public 后的统一命名和数据映射。"
Add-Line "6. 是否存在全局 CSS 覆盖模块样式。"
Add-Line
Add-Line "检查报告结束。"

# =========================================================
# 13. 最后一次性写入
# =========================================================
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (Test-Path -LiteralPath $tempReportPath) {
    Remove-Item -LiteralPath $tempReportPath -Force
}

[System.IO.File]::WriteAllLines(
    $tempReportPath,
    [string[]]$script:reportLines.ToArray(),
    $utf8NoBom
)

try {
    Move-Item -LiteralPath $tempReportPath -Destination $reportPath -Force
}
catch {
    $fallbackDirectory = Join-Path $projectRoot "_inspection-reports"

    if (-not (Test-Path -LiteralPath $fallbackDirectory)) {
        New-Item -ItemType Directory -Path $fallbackDirectory -Force | Out-Null
    }

    $reportPath = Join-Path $fallbackDirectory $reportFileName
    Move-Item -LiteralPath $tempReportPath -Destination $reportPath -Force
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "检查完成，未修改项目文件。" -ForegroundColor Green
Write-Host "报告位置：" -ForegroundColor Yellow
Write-Host $reportPath
Write-Host "============================================" -ForegroundColor Cyan
