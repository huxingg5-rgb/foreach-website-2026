param(
    [string]$ProjectRoot = "F:\WebsiteProjects\foreach-website-2026",
    [string]$SourceRoot = "H:\01-官网项目\04_资源中心\规格书页面\英文产品规格书"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "开始接入英文规格书……" -ForegroundColor Cyan
Write-Host ""

$dataFile = Join-Path $ProjectRoot "data\resources\datasheets.en.ts"
$downloadRoot = Join-Path $ProjectRoot "public\downloads\resources\datasheets\en"
$reportPath = Join-Path $ProjectRoot "英文规格书正式接入报告.txt"

if (-not (Test-Path -LiteralPath $ProjectRoot)) {
    throw "找不到项目目录：$ProjectRoot"
}

if (-not (Test-Path -LiteralPath $SourceRoot)) {
    throw "找不到英文规格书源目录：$SourceRoot"
}

if (-not (Test-Path -LiteralPath $dataFile)) {
    throw "找不到英文规格书数据文件：$dataFile"
}

# ============================================================
# 最终白名单
# 仅包含已经手动确认、且当前官网需要展示的英文资料。
# 未列入的 HPP、HRV、LLD、TDS、PV、6VMK、SSTP 等不会复制或登记。
# ============================================================

$items = @(
    [PSCustomObject]@{
        SourceName = "PS-120B-2507-00001_001_en_EA Piston Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-120b-2507-00001-001-en-ea-piston-pump.pdf"
        Id = "ea-piston-pump"
        Category = "pump"
        Keywords = "EA piston pump plunger pump precision metering dispensing 50 uL 20 mL"
        Title = "EA Piston Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "EA piston pumps for precise metering, dispensing, and automated liquid handling across capacities from 50 µL to 20 mL."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-120B-2507-00002_001_en_EAS Piston Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-120b-2507-00002-001-en-eas-piston-pump.pdf"
        Id = "eas-piston-pump"
        Category = "pump"
        Keywords = "EAS piston pump plunger pump easy deaeration priming bubble removal"
        Title = "EAS Piston Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "EAS easy-deaeration piston pumps for precise liquid handling where fast priming and efficient bubble removal are important."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-120B-2507-00004_001_en_SM Piston Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-120b-2507-00004-001-en-sm-piston-pump.pdf"
        Id = "sm-piston-pump"
        Category = "pump"
        Keywords = "SM piston pump compact plunger pump miniature instrument reagent dosing"
        Title = "SM Piston Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "Compact SM piston pumps for precise small-volume dosing and integration into miniature automated instruments."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-121B-2507-00001_001_en_RPL Valveless Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-121b-2507-00001-001-en-rpl-valveless-pump.pdf"
        Id = "rpl-p635-p15-valveless-pump"
        Category = "pump"
        Keywords = "RPL P6.35 P15 valveless pump ceramic piston 50 1200 uL"
        Title = "RPL-P6.35 / RPL-P15 Valveless Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "A combined datasheet for RPL-P6.35 and RPL-P15 valveless pumps, covering precision metering ranges from 50 µL to 1200 µL."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-valveless-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-130A-2507-00001_001_en_SMTP Pipetting Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-130a-2507-00001-001-en-smtp2-smtp4-pipetting-pump.pdf"
        Id = "smtp2-smtp4-pipetting-pump"
        Category = "pump"
        Keywords = "SMTP2 SMTP4 pipetting pump air displacement automatic tip ejection liquid level detection"
        Title = "SMTP2 / SMTP4 Pipetting Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "A combined datasheet for SMTP2 and SMTP4 air-displacement pipetting pumps used in automated sample and reagent handling."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-130B-2507-00001_001_en_HLD3 Syringe Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-130b-2507-00001-001-en-hld3-syringe-pump-rotary-valve.pdf"
        Id = "hld3-syringe-pump"
        Category = "pump"
        Keywords = "HLD3 syringe pump rotary valve 30 mm stroke precision liquid handling"
        Title = "HLD3 Syringe Pump with Rotary Valve Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "HLD3 syringe pump with a 30 mm stroke and rotary-valve configurations for precise liquid handling."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-130B-2507-00002_001_en_HLD6 Syringe Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-130b-2507-00002-001-en-hld6-syringe-pump-rotary-valve.pdf"
        Id = "hld6-syringe-pump"
        Category = "pump"
        Keywords = "HLD6 syringe pump rotary valve 60 mm stroke precision liquid handling"
        Title = "HLD6 Syringe Pump with Rotary Valve Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "HLD6 syringe pump with a 60 mm stroke and rotary-valve configurations for µL-to-mL liquid handling."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-130B-2507-00003_001_en_HMD3 Syringe Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-130b-2507-00003-001-en-hmd3-syringe-pump-solenoid-valve.pdf"
        Id = "hmd3-syringe-pump"
        Category = "pump"
        Keywords = "HMD3 syringe pump solenoid valve 30 mm stroke multi-channel"
        Title = "HMD3 Syringe Pump with Solenoid Valve Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "HMD3 syringe pump with a 30 mm stroke and integrated solenoid-valve configurations for automated dispensing."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-130B-2507-00004_001_en_HMD6 Syringe Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-130b-2507-00004-001-en-hmd6-syringe-pump-solenoid-valve.pdf"
        Id = "hmd6-syringe-pump"
        Category = "pump"
        Keywords = "HMD6 syringe pump solenoid valve 60 mm stroke multi-channel"
        Title = "HMD6 Syringe Pump with Solenoid Valve Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "HMD6 syringe pump with a 60 mm stroke and integrated solenoid valves for multi-channel liquid handling."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-150B-2507-00001_001_en_DPL30 Diaphragm Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-150b-2507-00001-001-en-dpl30-diaphragm-pump.pdf"
        Id = "dpl30-diaphragm-pump"
        Category = "pump"
        Keywords = "DPL30 diaphragm pump 300 mL min self priming liquid transfer"
        Title = "DPL30 Diaphragm Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "DPL30 diaphragm pump for compact liquid-transfer applications, with flow rates up to 300 mL/min."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-diaphragm-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-150B-2507-00002_001_en_DPL60 Diaphragm Pump Specification Sheet.pdf"
        Folder = "Pumps"
        TargetName = "ps-150b-2507-00002-001-en-dpl60-diaphragm-pump.pdf"
        Id = "dpl60-diaphragm-pump"
        Category = "pump"
        Keywords = "DPL60 diaphragm pump 600 mL min self priming liquid transfer"
        Title = "DPL60 Diaphragm Pump Datasheet"
        Label = "Pumps"
        Version = "001"
        Update = "2025-07"
        Description = "DPL60 diaphragm pump for liquid supply and transfer applications, with flow rates up to 600 mL/min."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-diaphragm-pump-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-120C-2507-00003_001_en_MRV3 Multi-channel Rotary Valve Specification Sheet.pdf"
        Folder = "Valves"
        TargetName = "ps-120c-2507-00003-001-en-mrv3-multi-channel-rotary-valve.pdf"
        Id = "mrv3-multi-channel-rotary-valve"
        Category = "valve"
        Keywords = "MRV3 multi-channel rotary valve multi-port flow path switching"
        Title = "MRV3 Multi-Channel Rotary Valve Datasheet"
        Label = "Valves"
        Version = "001"
        Update = "2025-07"
        Description = "MRV3 multi-channel rotary valve for multi-port flow-path switching, reagent distribution, and fluidic integration."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-rotary-valve-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-120C-2604-00001_001_en_HP 2-Position, 6-Port with vent High-Pressure Valve Specification Sheet.pdf"
        Folder = "Valves"
        TargetName = "ps-120c-2604-00001-001-en-hp-2-position-6-port-with-vent-high-pressure-valve.pdf"
        Id = "hp-2-position-6-port-high-pressure-valve"
        Category = "valve"
        Keywords = "HP 2-position 6-port vent high-pressure valve pressure resistant switching"
        Title = "HP 2-Position, 6-Port with Vent High-Pressure Valve Datasheet"
        Label = "Valves"
        Version = "001"
        Update = "2026-04"
        Description = "HP 2-position, 6-port high-pressure valve with a vent path for pressure-resistant liquid-path switching."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-valve-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-122A-2507-00001_001_en_6010 Solenoid Valve Specification Sheet.pdf"
        Folder = "Valves"
        TargetName = "ps-122a-2507-00001-001-en-6010-solenoid-valve.pdf"
        Id = "6010-solenoid-valve"
        Category = "valve"
        Keywords = "6010 SV10 solenoid valve substrate threaded barbed 2-way 3-way"
        Title = "6010 Solenoid Valve Datasheet"
        Label = "Valves"
        Version = "001"
        Update = "2025-07"
        Description = "6010 solenoid valve datasheet covering substrate, threaded, and barbed configurations for 2-way and 3-way control."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-solenoid-valve-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "FITTINGS_AND_TUBING_CATALOGA02.pdf"
        Folder = "Tubing-and-Fittings"
        TargetName = "fittings-and-tubing-catalog-a02.pdf"
        Id = "fittings-and-tubing-catalog"
        Category = "tubing"
        Keywords = "fittings tubing connectors catalog rigid flexible tubing assemblies"
        Title = "Fittings & Tubing Catalog"
        Label = "Tubing & Fittings"
        Version = "A02"
        Update = "—"
        Description = "A combined English catalog covering FOREACH fittings, connectors, rigid tubing, flexible tubing, and tubing assemblies."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-tubing-fitting-v001.webp"
        ProductHref = "/en/products/"
    },
    [PSCustomObject]@{
        SourceName = "PS-110B-2507-00001_001_en_ABD Air Bubble Detector Specification Sheet.pdf"
        Folder = "Smart-Control-Modules"
        TargetName = "ps-110b-2507-00001-001-en-abd-air-bubble-detector.pdf"
        Id = "abd-air-bubble-detector"
        Category = "smart"
        Keywords = "ABD air bubble detector liquid detector tubing Modbus RTU TTL"
        Title = "ABD Air Bubble Detector Datasheet"
        Label = "Smart Control Modules"
        Version = "001"
        Update = "2025-07"
        Description = "ABD non-contact air-bubble and liquid detector for transparent tubing, with TTL communication and Modbus RTU support."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-bubble-detector-v001.webp"
        ProductHref = "/en/products/control/abd-air-bubble-detector"
    },
    [PSCustomObject]@{
        SourceName = "PS-110B-2507-00002_001_en_PDM5 Pressure Sensor Specification Sheet.pdf"
        Folder = "Smart-Control-Modules"
        TargetName = "ps-110b-2507-00002-001-en-pdm5-pressure-sensor-user-manual.pdf"
        Id = "pdm5-pressure-sensor"
        Category = "smart"
        Keywords = "PDM5 pressure sensor user manual I2C fluid pressure monitoring"
        Title = "PDM5 Pressure Sensor User Manual"
        Label = "Smart Control Modules"
        Version = "001"
        Update = "2025-07"
        Description = "PDM5 pressure sensor user manual covering installation, I2C communication, specifications, and fluid-pressure monitoring."
        Image = "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-pressure-sensor-v001.webp"
        ProductHref = "/en/products/control/pdm5-pressure-sensor"
    }
)

# ============================================================
# 一、建立源文件索引并在修改前完成全部校验
# ============================================================

$sourceFiles = @(
    Get-ChildItem `
        -LiteralPath $SourceRoot `
        -Recurse `
        -File `
        -Filter "*.pdf"
)

$sourceIndex = @{}

foreach ($file in $sourceFiles) {
    $key = $file.Name.ToLowerInvariant()

    if ($sourceIndex.ContainsKey($key)) {
        throw "源目录中出现重复文件名，无法安全判断：$($file.Name)"
    }

    $sourceIndex[$key] = $file
}

$missing = New-Object System.Collections.Generic.List[string]

foreach ($item in $items) {
    $key = $item.SourceName.ToLowerInvariant()

    if (-not $sourceIndex.ContainsKey($key)) {
        $missing.Add($item.SourceName)
    }
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "以下英文规格书未找到，已停止，尚未修改任何文件：" -ForegroundColor Red

    foreach ($name in $missing) {
        Write-Host "  $name" -ForegroundColor Yellow
    }

    throw "缺少 $($missing.Count) 份白名单规格书。"
}

# 检查页面正在使用的缩略图是否存在
$missingImages = New-Object System.Collections.Generic.List[string]

foreach ($image in ($items.Image | Sort-Object -Unique)) {
    $relative = $image.TrimStart("/").Replace(
        "/",
        [System.IO.Path]::DirectorySeparatorChar
    )

    $full = Join-Path (Join-Path $ProjectRoot "public") $relative

    if (-not (Test-Path -LiteralPath $full)) {
        $missingImages.Add($image)
    }
}

if ($missingImages.Count -gt 0) {
    Write-Host ""
    Write-Host "以下规格书缩略图不存在，已停止：" -ForegroundColor Red

    foreach ($image in $missingImages) {
        Write-Host "  $image" -ForegroundColor Yellow
    }

    throw "请先确认当前英文规格书页面的通用缩略图文件。"
}

# ============================================================
# 二、备份英文数据文件
# ============================================================

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "$dataFile.bak_english_datasheets_$stamp"

Copy-Item `
    -LiteralPath $dataFile `
    -Destination $backupPath `
    -Force

# ============================================================
# 三、复制最终白名单 PDF
# ============================================================

$copied = New-Object System.Collections.Generic.List[object]

foreach ($item in $items) {
    $source = $sourceIndex[$item.SourceName.ToLowerInvariant()]
    $targetDir = Join-Path $downloadRoot $item.Folder
    $targetPath = Join-Path $targetDir $item.TargetName

    New-Item `
        -ItemType Directory `
        -Path $targetDir `
        -Force |
        Out-Null

    Copy-Item `
        -LiteralPath $source.FullName `
        -Destination $targetPath `
        -Force

    $copied.Add(
        [PSCustomObject]@{
            Title = $item.Title
            Source = $source.FullName
            Target = $targetPath
            DownloadHref = (
                "/downloads/resources/datasheets/en/" +
                $item.Folder +
                "/" +
                $item.TargetName
            )
        }
    )
}

# ============================================================
# 四、生成新的 datasheetEnItems
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

foreach ($item in $items) {
    $downloadHref = (
        "/downloads/resources/datasheets/en/" +
        $item.Folder +
        "/" +
        $item.TargetName
    )

    $block = @(
        "  {",
        "    id: $(ConvertTo-TypeScriptString $item.Id),",
        "    category: $(ConvertTo-TypeScriptString $item.Category),",
        "    keywords: $(ConvertTo-TypeScriptString $item.Keywords),",
        "    title: $(ConvertTo-TypeScriptString $item.Title),",
        "    label: $(ConvertTo-TypeScriptString $item.Label),",
        '    language: "English",',
        "    version: $(ConvertTo-TypeScriptString $item.Version),",
        "    update: $(ConvertTo-TypeScriptString $item.Update),",
        "    description:",
        "      $(ConvertTo-TypeScriptString $item.Description),",
        "    image:",
        "      $(ConvertTo-TypeScriptString $item.Image),",
        "    productHref: $(ConvertTo-TypeScriptString $item.ProductHref),",
        "    downloadHref:",
        "      $(ConvertTo-TypeScriptString $downloadHref),",
        '    actionType: "download",',
        "  },"
    ) -join "`r`n"

    $itemBlocks.Add($block)
}

# 保留官网现有针系列定制入口，不伪造不存在的英文 PDF
$probeBlock = @'
  {
    id: "sample-probe",
    category: "needle",
    keywords: "sample probe probe custom drawing-based customization",
    title: "Probe Series",
    label: "Probes",
    language: "—",
    version: "—",
    update: "—",
    description:
      "Datasheet is not currently available. Drawing-based customization is supported based on drawings or samples.",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-sample-probe-v001.webp",
    productHref: "/en/products/",
    downloadHref: "/en/contact?type=custom-probe",
    actionType: "custom",
  },
'@

$itemBlocks.Add($probeBlock.TrimEnd())

$newArray = (
    "export const datasheetEnItems: DatasheetItem[] = [`r`n" +
    ($itemBlocks -join "`r`n") +
    "`r`n];"
)

$content = [System.IO.File]::ReadAllText($dataFile)

$pattern = 'export const datasheetEnItems:\s*DatasheetItem\[\]\s*=\s*\[[\s\S]*?\r?\n\];\s*$'
$regex = New-Object System.Text.RegularExpressions.Regex(
    $pattern,
    [System.Text.RegularExpressions.RegexOptions]::Singleline
)

if (-not $regex.IsMatch($content)) {
    throw "无法定位 datasheetEnItems 数组。已复制 PDF，但没有覆盖英文数据；可使用备份文件检查。"
}

$updatedContent = $regex.Replace(
    $content,
    [System.Text.RegularExpressions.MatchEvaluator]{
        param($match)
        return $newArray
    },
    1
)

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
    $dataFile,
    $updatedContent,
    $utf8NoBom
)

# ============================================================
# 五、最终检查
# ============================================================

$verificationErrors = New-Object System.Collections.Generic.List[string]

foreach ($entry in $copied) {
    if (-not (Test-Path -LiteralPath $entry.Target)) {
        $verificationErrors.Add("目标 PDF 不存在：$($entry.Target)")
    }

    if (-not $updatedContent.Contains($entry.DownloadHref)) {
        $verificationErrors.Add("英文数据中缺少下载地址：$($entry.DownloadHref)")
    }
}

if ($verificationErrors.Count -gt 0) {
    Write-Host ""
    Write-Host "最终检查发现问题：" -ForegroundColor Red

    foreach ($message in $verificationErrors) {
        Write-Host "  $message" -ForegroundColor Yellow
    }

    throw "英文规格书接入未通过最终检查。"
}

# ============================================================
# 六、生成报告
# ============================================================

$report = New-Object System.Collections.Generic.List[string]

$report.Add("英文规格书正式接入报告")
$report.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$report.Add("")
$report.Add("项目目录：$ProjectRoot")
$report.Add("源目录：$SourceRoot")
$report.Add("英文数据：$dataFile")
$report.Add("数据备份：$backupPath")
$report.Add("")
$report.Add("已接入 PDF：$($copied.Count)")
$report.Add("页面条目：$($copied.Count + 1)（含 Probe Series 定制入口）")
$report.Add("")
$report.Add("未接入：HPP、HRV、LLD、TDS、PV、6VMK、SSTP 等未确认或官网不展示的资料。")
$report.Add("")
$report.Add("============================================================")

foreach ($entry in $copied) {
    $report.Add("标题：$($entry.Title)")
    $report.Add("源文件：$($entry.Source)")
    $report.Add("目标文件：$($entry.Target)")
    $report.Add("下载地址：$($entry.DownloadHref)")
    $report.Add("")
}

$report |
    Set-Content `
        -LiteralPath $reportPath `
        -Encoding UTF8

Write-Host ""
Write-Host "英文规格书文件与页面数据接入完成。" -ForegroundColor Green
Write-Host "已接入 PDF：$($copied.Count)" -ForegroundColor Green
Write-Host "数据备份：$backupPath" -ForegroundColor Yellow
Write-Host "接入报告：$reportPath" -ForegroundColor Cyan
Write-Host ""

# ============================================================
# 七、构建检查
# ============================================================

Push-Location $ProjectRoot

try {
    npm run build

    if ($LASTEXITCODE -ne 0) {
        throw "npm run build 未通过。请保留上方第一条构建错误。"
    }
}
finally {
    Pop-Location
}

Write-Host ""
Write-Host "构建通过，英文规格书接入完成。" -ForegroundColor Green
Write-Host ""
