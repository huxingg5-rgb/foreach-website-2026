param(
    [string]$ProjectRoot = "F:\WebsiteProjects\foreach-website-2026",
    [string]$SourceRoot = "\\192.168.1.4\sales\03-市场管理\M02品牌推广\04_网站\收集产品规格书\中文产品规格书"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "开始检查中文产品规格书……" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path -LiteralPath $ProjectRoot)) {
    throw "找不到项目目录：$ProjectRoot"
}

if (-not (Test-Path -LiteralPath $SourceRoot)) {
    throw "找不到中文规格书目录：$SourceRoot`n请先确认已连接公司内网并且当前账号有访问权限。"
}

$dataFile = Join-Path $ProjectRoot "data\resources\datasheets.zh.ts"
$reportPath = Join-Path $ProjectRoot "中文规格书文件清单与匹配报告.txt"
$csvPath = Join-Path $ProjectRoot "中文规格书候选匹配.csv"

if (-not (Test-Path -LiteralPath $dataFile)) {
    throw "找不到中文规格书数据文件：$dataFile"
}

# 与已确认的英文规格书页面保持同一产品范围。
# 这里只做文件定位，不复制、不修改官网数据。
$targets = @(
    [PSCustomObject]@{
        Order = 1
        Id = "ea-piston-pump"
        PageTitle = "EA 柱塞泵规格书"
        Patterns = @("(?i)\bEA\b", "EA柱塞泵", "EA 柱塞泵")
        Excludes = @("(?i)\bEAS\b")
    },
    [PSCustomObject]@{
        Order = 2
        Id = "eas-piston-pump"
        PageTitle = "EAS 柱塞泵规格书"
        Patterns = @("(?i)\bEAS\b", "EAS柱塞泵", "EAS 柱塞泵")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 3
        Id = "sm-piston-pump"
        PageTitle = "SM 柱塞泵规格书"
        Patterns = @("(?i)\bSM\b", "SM柱塞泵", "SM 柱塞泵")
        Excludes = @("(?i)SMTP")
    },
    [PSCustomObject]@{
        Order = 4
        Id = "rpl-p635-p15-valveless-pump"
        PageTitle = "RPL-P6.35 / RPL-P15 无阀泵规格书"
        Patterns = @("(?i)\bRPL\b", "RPL-P6\.?35", "RPL-P15", "无阀泵")
        Excludes = @("(?i)DRPL")
    },
    [PSCustomObject]@{
        Order = 5
        Id = "smtp2-smtp4-pipetting-pump"
        PageTitle = "SMTP2 / SMTP4 移液泵规格书"
        Patterns = @("(?i)SMTP", "SMTP2", "SMTP4", "移液泵")
        Excludes = @("(?i)SSTP")
    },
    [PSCustomObject]@{
        Order = 6
        Id = "hld3-syringe-pump"
        PageTitle = "HLD3 旋转阀注射泵规格书"
        Patterns = @("(?i)\bHLD3\b")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 7
        Id = "hld6-syringe-pump"
        PageTitle = "HLD6 旋转阀注射泵规格书"
        Patterns = @("(?i)\bHLD6\b")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 8
        Id = "hmd3-syringe-pump"
        PageTitle = "HMD3 电磁阀注射泵规格书"
        Patterns = @("(?i)\bHMD3\b")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 9
        Id = "hmd6-syringe-pump"
        PageTitle = "HMD6 电磁阀注射泵规格书"
        Patterns = @("(?i)\bHMD6\b")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 10
        Id = "dpl30-diaphragm-pump"
        PageTitle = "DPL30 隔膜泵规格书"
        Patterns = @("(?i)\bDPL30\b")
        Excludes = @("(?i)DPL30H")
    },
    [PSCustomObject]@{
        Order = 11
        Id = "dpl60-diaphragm-pump"
        PageTitle = "DPL60 隔膜泵规格书"
        Patterns = @("(?i)\bDPL60\b")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 12
        Id = "mrv3-multi-channel-rotary-valve"
        PageTitle = "MRV3 多通道旋转阀规格书"
        Patterns = @("(?i)\bMRV3\b", "多通道旋转阀")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 13
        Id = "hp-2-position-6-port-high-pressure-valve"
        PageTitle = "HP 两位六通带泄压高压阀规格书"
        Patterns = @(
            "(?i)\bHP\b",
            "两位六通",
            "2位6通",
            "二位六通",
            "带泄压高压阀",
            "高压阀"
        )
        Excludes = @("(?i)\bHRV\b", "高压泵")
    },
    [PSCustomObject]@{
        Order = 14
        Id = "6010-solenoid-valve"
        PageTitle = "6010 电磁阀规格书"
        Patterns = @("6010", "(?i)\bSV10\b")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 15
        Id = "fittings-and-tubing-catalog"
        PageTitle = "连接件与管路产品目录"
        Patterns = @(
            "连接件.*管",
            "管.*连接件",
            "接头.*管",
            "管路.*接头",
            "连接件产品手册",
            "接头产品手册",
            "管路产品手册",
            "FITTINGS.*TUBING",
            "TUBING.*FITTINGS"
        )
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 16
        Id = "abd-air-bubble-detector"
        PageTitle = "ABD 气泡检测模块规格书"
        Patterns = @("(?i)\bABD\b", "气泡检测", "气泡探测")
        Excludes = @()
    },
    [PSCustomObject]@{
        Order = 17
        Id = "pdm5-pressure-sensor"
        PageTitle = "PDM5 压力传感器使用手册"
        Patterns = @("(?i)\bPDM5\b", "压力传感器")
        Excludes = @("(?i)\bPDM(?!5)")
    }
)

$pdfFiles = @(
    Get-ChildItem `
        -LiteralPath $SourceRoot `
        -Recurse `
        -File `
        -Filter "*.pdf" `
        -ErrorAction Stop |
    Sort-Object FullName
)

if ($pdfFiles.Count -eq 0) {
    throw "中文规格书目录中没有找到 PDF 文件：$SourceRoot"
}

function Get-RelativePath {
    param(
        [string]$Root,
        [string]$FullName
    )

    $rootUri = New-Object System.Uri(
        ($Root.TrimEnd("\") + "\")
    )
    $fileUri = New-Object System.Uri($FullName)

    return [System.Uri]::UnescapeDataString(
        $rootUri.MakeRelativeUri($fileUri).ToString()
    ).Replace("/", "\")
}

function Test-AnyPattern {
    param(
        [string]$Text,
        [object[]]$Patterns
    )

    foreach ($pattern in $Patterns) {
        if ($Text -match [string]$pattern) {
            return $true
        }
    }

    return $false
}

$matchRows = New-Object System.Collections.Generic.List[object]
$matchedPaths = New-Object System.Collections.Generic.HashSet[string]

foreach ($target in $targets) {
    $candidates = New-Object System.Collections.Generic.List[object]

    foreach ($file in $pdfFiles) {
        $relativePath = Get-RelativePath $SourceRoot $file.FullName
        $searchText = "$($file.Name) $relativePath"

        $included = Test-AnyPattern $searchText $target.Patterns
        $excluded = Test-AnyPattern $searchText $target.Excludes

        if (-not $included -or $excluded) {
            continue
        }

        $score = 0

        foreach ($pattern in $target.Patterns) {
            if ($searchText -match [string]$pattern) {
                $score += 20
            }
        }

        if ($file.BaseName -match [regex]::Escape($target.Id)) {
            $score += 20
        }

        if ($relativePath -match "规格书|使用手册|产品手册|目录") {
            $score += 5
        }

        $candidates.Add(
            [PSCustomObject]@{
                目标顺序 = $target.Order
                目标ID = $target.Id
                官网中文标题 = $target.PageTitle
                匹配分数 = $score
                文件名 = $file.Name
                相对路径 = $relativePath
                完整路径 = $file.FullName
                文件大小MB = [Math]::Round($file.Length / 1MB, 2)
                修改时间 = $file.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
            }
        )
    }

    $orderedCandidates = @(
        $candidates |
        Sort-Object `
            @{ Expression = "匹配分数"; Descending = $true },
            @{ Expression = "修改时间"; Descending = $true },
            @{ Expression = "文件名"; Descending = $false }
    )

    if ($orderedCandidates.Count -eq 0) {
        $matchRows.Add(
            [PSCustomObject]@{
                目标顺序 = $target.Order
                目标ID = $target.Id
                官网中文标题 = $target.PageTitle
                匹配分数 = 0
                文件名 = ""
                相对路径 = ""
                完整路径 = ""
                文件大小MB = ""
                修改时间 = ""
            }
        )
    }
    else {
        foreach ($candidate in $orderedCandidates) {
            $matchRows.Add($candidate)
            [void]$matchedPaths.Add($candidate.完整路径)
        }
    }
}

$matchRows |
    Export-Csv `
        -LiteralPath $csvPath `
        -NoTypeInformation `
        -Encoding UTF8

$currentDataText = [System.IO.File]::ReadAllText($dataFile)
$currentIds = @(
    [regex]::Matches(
        $currentDataText,
        '\bid\s*:\s*["''](?<id>[^"'']+)["'']'
    ) |
    ForEach-Object {
        $_.Groups["id"].Value
    }
)

$unmatchedFiles = @(
    $pdfFiles |
    Where-Object {
        -not $matchedPaths.Contains($_.FullName)
    }
)

$report = New-Object System.Collections.Generic.List[string]

$report.Add("中文规格书文件清单与匹配报告")
$report.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$report.Add("")
$report.Add("项目目录：$ProjectRoot")
$report.Add("中文规格书目录：$SourceRoot")
$report.Add("中文数据文件：$dataFile")
$report.Add("")
$report.Add("源目录 PDF 总数：$($pdfFiles.Count)")
$report.Add("目标产品范围：$($targets.Count)")
$report.Add("当前中文页面数据 ID 数：$($currentIds.Count)")
$report.Add("")
$report.Add("说明：")
$report.Add("1. 本次只检查和匹配，没有复制 PDF，也没有修改官网。")
$report.Add("2. 中文页面将与已确认的英文页面保持同一产品范围。")
$report.Add("3. 中文与英文 PDF 独立管理，不因英文存在就自动使用中文文件。")
$report.Add("4. 最终图片将复用产品中心图片，不使用旧的规格书通用缩略图。")
$report.Add("")
$report.Add("============================================================")

foreach ($target in $targets) {
    $report.Add("")
    $report.Add("[$($target.Order)] $($target.PageTitle)")
    $report.Add("ID：$($target.Id)")

    $rows = @(
        $matchRows |
        Where-Object {
            $_.目标ID -eq $target.Id
        }
    )

    $validRows = @(
        $rows |
        Where-Object {
            -not [string]::IsNullOrWhiteSpace($_.完整路径)
        }
    )

    if ($validRows.Count -eq 0) {
        $report.Add("结果：未找到候选 PDF")
        continue
    }

    $report.Add("候选数量：$($validRows.Count)")

    $index = 0

    foreach ($row in $validRows) {
        $index++
        $report.Add("")
        $report.Add("候选 $index")
        $report.Add("匹配分数：$($row.匹配分数)")
        $report.Add("文件名：$($row.文件名)")
        $report.Add("相对路径：$($row.相对路径)")
        $report.Add("大小：$($row.文件大小MB) MB")
        $report.Add("修改时间：$($row.修改时间)")
    }
}

$report.Add("")
$report.Add("============================================================")
$report.Add("未匹配到17个目标产品的其他 PDF")
$report.Add("============================================================")

if ($unmatchedFiles.Count -eq 0) {
    $report.Add("无")
}
else {
    foreach ($file in $unmatchedFiles) {
        $relativePath = Get-RelativePath $SourceRoot $file.FullName
        $report.Add($relativePath)
    }
}

$report.Add("")
$report.Add("============================================================")
$report.Add("当前中文页面数据 ID")
$report.Add("============================================================")

foreach ($id in $currentIds) {
    $report.Add($id)
}

$report |
    Set-Content `
        -LiteralPath $reportPath `
        -Encoding UTF8

Write-Host ""
Write-Host "中文规格书检查完成，没有修改任何项目文件。" -ForegroundColor Green
Write-Host ""
Write-Host "匹配报告：" -ForegroundColor Cyan
Write-Host $reportPath
Write-Host ""
Write-Host "候选表格：" -ForegroundColor Cyan
Write-Host $csvPath
Write-Host ""

notepad $reportPath
