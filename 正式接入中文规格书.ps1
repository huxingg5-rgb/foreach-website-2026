param(
    [string]$ProjectRoot = "F:\WebsiteProjects\foreach-website-2026",
    [string]$SourceRoot = "\\192.168.1.4\sales\03-市场管理\M02品牌推广\04_网站\收集产品规格书\中文产品规格书"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "开始正式接入中文规格书……" -ForegroundColor Cyan
Write-Host ""

$dataFile = Join-Path $ProjectRoot "data\resources\datasheets.zh.ts"
$downloadRoot = Join-Path $ProjectRoot "public\downloads\resources\datasheets\zh-CN"
$reportPath = Join-Path $ProjectRoot "中文规格书正式接入报告.txt"

if (-not (Test-Path -LiteralPath $ProjectRoot)) {
    throw "找不到项目目录：$ProjectRoot"
}

if (-not (Test-Path -LiteralPath $SourceRoot)) {
    throw "找不到中文规格书目录：$SourceRoot`n请确认公司内网连接和目录权限。"
}

if (-not (Test-Path -LiteralPath $dataFile)) {
    throw "找不到中文数据文件：$dataFile"
}

# ============================================================
# 中文与英文资料独立管理。
# 本次仅接入目录中已经实际存在、且与官网产品对应的7份中文资料。
# 不会为了与英文数量一致而创建不存在的中文条目。
# ============================================================

$items = @(
    [PSCustomObject]@{
        RelativeSource = "10.120B-柱塞泵\PS-120B-013_001_cn_HaloFlx-SM规格书.pdf"
        Folder = "Pumps"
        TargetName = "ps-120b-013-001-cn-sm-piston-pump.pdf"
        Id = "sm-piston-pump"
        Category = "pump"
        Keywords = "SM 柱塞泵 微型柱塞泵 piston pump 精密定量 自动化仪器"
        Title = "SM 柱塞泵规格书"
        Label = "泵系列"
        Version = "001"
        Description = "SM 微型柱塞泵适用于紧凑型自动化仪器中的微量液体定量、分配与试剂加注。"
        Image = "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp"
        ProductHref = "/products/"
    },
    [PSCustomObject]@{
        RelativeSource = "3.121B-无阀泵\PS-121B-011_A01_cn_RPL-P6.35系列无阀泵产品规格书.pdf"
        Folder = "Pumps"
        TargetName = "ps-121b-011-a01-cn-rpl-p635-valveless-pump.pdf"
        Id = "rpl-p635-valveless-pump"
        Category = "pump"
        Keywords = "RPL-P6.35 无阀泵 valveless pump 微量定量 液体输送"
        Title = "RPL-P6.35 系列无阀泵规格书"
        Label = "泵系列"
        Version = "A01"
        Description = "RPL-P6.35 系列无阀泵适用于自动化分析仪器中的微量定量、加样、滴定与液体输送。"
        Image = "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp"
        ProductHref = "/products/"
    },
    [PSCustomObject]@{
        RelativeSource = "6.130B-注射泵\PS-SDRV-007_003_cn_HMD3注射泵产品规格书.pdf"
        Folder = "Pumps"
        TargetName = "ps-sdrv-007-003-cn-hmd3-syringe-pump.pdf"
        Id = "hmd3-syringe-pump"
        Category = "pump"
        Keywords = "HMD3 注射泵 电磁阀 syringe pump 30mm 定量 分配"
        Title = "HMD3 电磁阀注射泵规格书"
        Label = "泵系列"
        Version = "003"
        Description = "HMD3 电磁阀注射泵采用30 mm行程，适用于自动化仪器中的高精度定量、分配与多通道液体处理。"
        Image = "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp"
        ProductHref = "/products/"
    },
    [PSCustomObject]@{
        RelativeSource = "6.130B-注射泵\PS-SDRV-001_007_cn_HMD6系列注射泵产品规格书.pdf"
        Folder = "Pumps"
        TargetName = "ps-sdrv-001-007-cn-hmd6-syringe-pump.pdf"
        Id = "hmd6-syringe-pump"
        Category = "pump"
        Keywords = "HMD6 注射泵 电磁阀 syringe pump 60mm 定量 分配"
        Title = "HMD6 电磁阀注射泵规格书"
        Label = "泵系列"
        Version = "007"
        Description = "HMD6 电磁阀注射泵采用60 mm行程，适用于自动化仪器中的微升至毫升级定量与多通道液体操作。"
        Image = "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp"
        ProductHref = "/products/"
    },
    [PSCustomObject]@{
        RelativeSource = "7.150B-隔膜泵\PS-150B-2412-00001_A03_cn_DPL30规格书.pdf"
        Folder = "Pumps"
        TargetName = "ps-150b-2412-00001-a03-cn-dpl30-diaphragm-pump.pdf"
        Id = "dpl30-diaphragm-pump"
        Category = "pump"
        Keywords = "DPL30 隔膜泵 diaphragm pump 自吸 供液 清洗液"
        Title = "DPL30 隔膜泵规格书"
        Label = "泵系列"
        Version = "A03"
        Description = "DPL30 隔膜泵适用于自动化仪器中的液体供给、自吸输送、清洗循环与废液处理。"
        Image = "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp"
        ProductHref = "/products/"
    },
    [PSCustomObject]@{
        RelativeSource = "1.120C-旋转阀\PS-120C-2604-00001_A00_cn_HP二位六通带排气高压旋转阀规格书.pdf"
        Folder = "Valves"
        TargetName = "ps-120c-2604-00001-a00-cn-hp-2-position-6-port-high-pressure-valve.pdf"
        Id = "hp-2-position-6-port-high-pressure-valve"
        Category = "valve"
        Keywords = "HP 二位六通 带排气 高压旋转阀 高压阀 流路切换"
        Title = "HP 二位六通带排气高压阀规格书"
        Label = "阀系列"
        Version = "A00"
        Description = "HP二位六通带排气高压阀适用于高压液路切换、排气控制与精密流体管理。"
        Image = "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp"
        ProductHref = "/products/"
    },
    [PSCustomObject]@{
        RelativeSource = "恒永达连接件及橡塑管产品目录_A02.pdf"
        Folder = "Tubing-and-Fittings"
        TargetName = "foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf"
        Id = "fittings-and-tubing-catalog"
        Category = "tubing"
        Keywords = "连接件 橡塑管 管路 接头 tubing fittings catalog"
        Title = "连接件及橡塑管产品目录"
        Label = "管路及连接件系列"
        Version = "A02"
        Description = "涵盖恒永达连接件、接头、橡塑管及常用管路组件的中文产品目录。"
        Image = "/images/products/fittings/barbed-fittings/products/ba-16c-pa-w-main.jpg"
        ProductHref = "/products/"
    }
)

# ============================================================
# 一、修改前完整校验
# ============================================================

$missing = New-Object System.Collections.Generic.List[string]

foreach ($item in $items) {
    $sourcePath = Join-Path $SourceRoot $item.RelativeSource

    if (-not (Test-Path -LiteralPath $sourcePath)) {
        $missing.Add($sourcePath)
    }
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "以下中文PDF不存在，已停止，没有修改任何文件：" -ForegroundColor Red

    foreach ($path in $missing) {
        Write-Host "  $path" -ForegroundColor Yellow
    }

    throw "缺少 $($missing.Count) 份中文规格书。"
}

$missingImages = New-Object System.Collections.Generic.List[string]

foreach ($image in ($items.Image | Sort-Object -Unique)) {
    $relativeImage = $image.TrimStart("/").Replace(
        "/",
        [System.IO.Path]::DirectorySeparatorChar
    )

    $imagePath = Join-Path (Join-Path $ProjectRoot "public") $relativeImage

    if (-not (Test-Path -LiteralPath $imagePath)) {
        $missingImages.Add($image)
    }
}

if ($missingImages.Count -gt 0) {
    Write-Host ""
    Write-Host "以下产品中心图片不存在，已停止：" -ForegroundColor Red

    foreach ($image in $missingImages) {
        Write-Host "  $image" -ForegroundColor Yellow
    }

    throw "请先检查产品中心图片路径。"
}

# ============================================================
# 二、备份数据文件
# ============================================================

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "$dataFile.bak_chinese_datasheets_$stamp"

Copy-Item `
    -LiteralPath $dataFile `
    -Destination $backupPath `
    -Force

# ============================================================
# 三、复制PDF
# ============================================================

$copied = New-Object System.Collections.Generic.List[object]

foreach ($item in $items) {
    $sourcePath = Join-Path $SourceRoot $item.RelativeSource
    $sourceFile = Get-Item -LiteralPath $sourcePath

    $targetDir = Join-Path $downloadRoot $item.Folder
    $targetPath = Join-Path $targetDir $item.TargetName

    New-Item `
        -ItemType Directory `
        -Path $targetDir `
        -Force |
        Out-Null

    Copy-Item `
        -LiteralPath $sourcePath `
        -Destination $targetPath `
        -Force

    $downloadHref = (
        "/downloads/resources/datasheets/zh-CN/" +
        $item.Folder +
        "/" +
        $item.TargetName
    )

    $copied.Add(
        [PSCustomObject]@{
            Item = $item
            SourcePath = $sourcePath
            TargetPath = $targetPath
            DownloadHref = $downloadHref
            Update = $sourceFile.LastWriteTime.ToString("yyyy-MM")
        }
    )
}

# ============================================================
# 四、生成新的中文列表
# ============================================================

function ConvertTo-TypeScriptString {
    param([AllowNull()][string]$Value)

    if ($null -eq $Value) {
        return '""'
    }

    $escaped = $Value `
        -replace '\\', '\\' `
        -replace '"', '\"' `
        -replace "`r", "" `
        -replace "`n", "\n"

    return '"' + $escaped + '"'
}

$itemBlocks = New-Object System.Collections.Generic.List[string]

foreach ($entry in $copied) {
    $item = $entry.Item

    $block = @(
        "  {",
        "    id: $(ConvertTo-TypeScriptString $item.Id),",
        "    category: $(ConvertTo-TypeScriptString $item.Category),",
        "    keywords: $(ConvertTo-TypeScriptString $item.Keywords),",
        "    title: $(ConvertTo-TypeScriptString $item.Title),",
        "    label: $(ConvertTo-TypeScriptString $item.Label),",
        '    language: "中文",',
        "    version: $(ConvertTo-TypeScriptString $item.Version),",
        "    update: $(ConvertTo-TypeScriptString $entry.Update),",
        "    description: $(ConvertTo-TypeScriptString $item.Description),",
        "    image:",
        "      $(ConvertTo-TypeScriptString $item.Image),",
        "    productHref: $(ConvertTo-TypeScriptString $item.ProductHref),",
        "    downloadHref:",
        "      $(ConvertTo-TypeScriptString $entry.DownloadHref),",
        '    actionType: "download",',
        "  },"
    ) -join "`r`n"

    $itemBlocks.Add($block)
}

# 保留针系列来图定制入口
$probeBlock = @'
  {
    id: "sample-probe",
    category: "needle",
    keywords: "针系列 sample probe 来图定制 定制 采样针 加样针",
    title: "针系列",
    label: "针系列",
    language: "—",
    version: "—",
    update: "—",
    description: "暂无规格书，支持根据图纸或样品进行定制沟通。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-sample-probe-v001.webp",
    productHref: "/products/",
    downloadHref: "/contact?type=custom-probe",
    actionType: "custom",
  },
'@

$itemBlocks.Add($probeBlock.TrimEnd())

$newItemsArray = (
    "export const datasheetZhItems: DatasheetItem[] = [`r`n" +
    ($itemBlocks -join "`r`n") +
    "`r`n];"
)

$newFilters = @'
export const datasheetZhFilterOptions: DatasheetFilterOption[] = [
  { label: "全部", value: "all" },
  { label: "泵系列", value: "pump" },
  { label: "阀系列", value: "valve" },
  { label: "针系列", value: "needle" },
  { label: "管路及连接件系列", value: "tubing" },
];
'@

$content = [System.IO.File]::ReadAllText($dataFile)

$filterPattern = 'export const datasheetZhFilterOptions:\s*DatasheetFilterOption\[\]\s*=\s*\[[\s\S]*?\r?\n\];'
$itemsPattern = 'export const datasheetZhItems:\s*DatasheetItem\[\]\s*=\s*\[[\s\S]*?\r?\n\];\s*$'

$filterRegex = New-Object System.Text.RegularExpressions.Regex(
    $filterPattern,
    [System.Text.RegularExpressions.RegexOptions]::Singleline
)

$itemsRegex = New-Object System.Text.RegularExpressions.Regex(
    $itemsPattern,
    [System.Text.RegularExpressions.RegexOptions]::Singleline
)

if (-not $filterRegex.IsMatch($content)) {
    throw "无法定位 datasheetZhFilterOptions，尚未覆盖中文数据。"
}

if (-not $itemsRegex.IsMatch($content)) {
    throw "无法定位 datasheetZhItems，尚未覆盖中文数据。"
}

$content = $filterRegex.Replace(
    $content,
    [System.Text.RegularExpressions.MatchEvaluator]{
        param($match)
        return $newFilters.TrimEnd()
    },
    1
)

$content = $itemsRegex.Replace(
    $content,
    [System.Text.RegularExpressions.MatchEvaluator]{
        param($match)
        return $newItemsArray
    },
    1
)

# 同步更新页面说明，避免继续暗示存在所有系列资料
$oldDescription = '"当前页面仅收录产品规格书；针系列暂无规格书，支持来图定制；产品图纸建议在对应产品详情页获取。"'
$newDescription = '"当前收录已具备中文资料的产品规格书与产品目录；针系列暂无规格书，支持来图定制。"'

$content = $content.Replace($oldDescription, $newDescription)

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
    $dataFile,
    $content,
    $utf8NoBom
)

# ============================================================
# 五、最终验证
# ============================================================

$verifyErrors = New-Object System.Collections.Generic.List[string]

foreach ($entry in $copied) {
    if (-not (Test-Path -LiteralPath $entry.TargetPath)) {
        $verifyErrors.Add("目标PDF不存在：$($entry.TargetPath)")
    }

    if (-not $content.Contains($entry.DownloadHref)) {
        $verifyErrors.Add("中文数据缺少下载地址：$($entry.DownloadHref)")
    }

    if (-not $content.Contains($entry.Item.Image)) {
        $verifyErrors.Add("中文数据缺少产品图片：$($entry.Item.Image)")
    }
}

if ($verifyErrors.Count -gt 0) {
    Copy-Item `
        -LiteralPath $backupPath `
        -Destination $dataFile `
        -Force

    Write-Host ""
    Write-Host "最终验证失败，已恢复数据文件：" -ForegroundColor Red

    foreach ($message in $verifyErrors) {
        Write-Host "  $message" -ForegroundColor Yellow
    }

    throw "中文规格书接入验证失败。"
}

# ============================================================
# 六、报告
# ============================================================

$report = New-Object System.Collections.Generic.List[string]

$report.Add("中文规格书正式接入报告")
$report.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$report.Add("")
$report.Add("项目目录：$ProjectRoot")
$report.Add("中文源目录：$SourceRoot")
$report.Add("数据文件：$dataFile")
$report.Add("数据备份：$backupPath")
$report.Add("")
$report.Add("已接入中文PDF：$($copied.Count)")
$report.Add("页面条目：$($copied.Count + 1)（含针系列来图定制入口）")
$report.Add("")
$report.Add("本次未接入：EA、EAS、SMTP2/SMTP4、HLD3、HLD6、DPL60、MRV3、6010、ABD、PDM5等当前目录中没有对应中文PDF的产品。")
$report.Add("未接入：HRV、PV、TDS、6VMK等不属于当前确认产品范围的旧资料。")
$report.Add("")
$report.Add("============================================================")

foreach ($entry in $copied) {
    $report.Add("标题：$($entry.Item.Title)")
    $report.Add("版本：$($entry.Item.Version)")
    $report.Add("更新：$($entry.Update)")
    $report.Add("源文件：$($entry.SourcePath)")
    $report.Add("目标文件：$($entry.TargetPath)")
    $report.Add("下载地址：$($entry.DownloadHref)")
    $report.Add("产品图片：$($entry.Item.Image)")
    $report.Add("")
}

$report |
    Set-Content `
        -LiteralPath $reportPath `
        -Encoding UTF8

Write-Host ""
Write-Host "中文规格书接入完成。" -ForegroundColor Green
Write-Host "已接入PDF：$($copied.Count)" -ForegroundColor Green
Write-Host "页面条目：$($copied.Count + 1)" -ForegroundColor Green
Write-Host "数据备份：$backupPath" -ForegroundColor Yellow
Write-Host "接入报告：$reportPath" -ForegroundColor Cyan
Write-Host ""

Push-Location $ProjectRoot

try {
    npm run build

    if ($LASTEXITCODE -ne 0) {
        throw "npm run build 未通过，请保留上方第一条构建错误。"
    }
}
finally {
    Pop-Location
}

Write-Host ""
Write-Host "构建通过，中文规格书正式接入完成。" -ForegroundColor Green
Write-Host ""
