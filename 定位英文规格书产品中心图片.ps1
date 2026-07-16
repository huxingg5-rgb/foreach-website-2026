$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$reportPath = Join-Path $projectRoot "英文规格书产品中心图片定位报告.txt"
$csvPath = Join-Path $projectRoot "英文规格书产品中心图片候选.csv"

$products = @(
    @{ Id="ea-piston-pump";                  Name="EA Piston Pump";                  Tokens=@("EA Piston Pump","EA-0050","EA-0100","EA-0500") },
    @{ Id="eas-piston-pump";                 Name="EAS Piston Pump";                 Tokens=@("EAS Piston Pump","EAS-0100","EAS-0500","EAS-1000") },
    @{ Id="sm-piston-pump";                  Name="SM Piston Pump";                  Tokens=@("SM Piston Pump","SM-") },
    @{ Id="rpl-p635-p15-valveless-pump";     Name="RPL-P6.35 / RPL-P15";             Tokens=@("RPL-P6.35","RPL-P15","RPL Valveless Pump") },
    @{ Id="smtp2-smtp4-pipetting-pump";      Name="SMTP2 / SMTP4";                   Tokens=@("SMTP2","SMTP4") },
    @{ Id="hld3-syringe-pump";               Name="HLD3 Syringe Pump";               Tokens=@("HLD3") },
    @{ Id="hld6-syringe-pump";               Name="HLD6 Syringe Pump";               Tokens=@("HLD6") },
    @{ Id="hmd3-syringe-pump";               Name="HMD3 Syringe Pump";               Tokens=@("HMD3") },
    @{ Id="hmd6-syringe-pump";               Name="HMD6 Syringe Pump";               Tokens=@("HMD6") },
    @{ Id="dpl30-diaphragm-pump";            Name="DPL30 Diaphragm Pump";            Tokens=@("DPL30") },
    @{ Id="dpl60-diaphragm-pump";            Name="DPL60 Diaphragm Pump";            Tokens=@("DPL60") },
    @{ Id="mrv3-multi-channel-rotary-valve"; Name="MRV3 Rotary Valve";               Tokens=@("MRV3") },
    @{ Id="hp-2-position-6-port-high-pressure-valve"; Name="HP High-Pressure Valve"; Tokens=@("2-Position, 6-Port","High-Pressure Valve","HP Valve") },
    @{ Id="6010-solenoid-valve";             Name="6010 Solenoid Valve";             Tokens=@("6010","SV10") },
    @{ Id="fittings-and-tubing-catalog";     Name="Fittings & Tubing";               Tokens=@("Fittings","Tubing","Connector") },
    @{ Id="abd-air-bubble-detector";         Name="ABD Air Bubble Detector";         Tokens=@("ABD Air Bubble Detector","ABD-06M") },
    @{ Id="pdm5-pressure-sensor";             Name="PDM5 Pressure Sensor";             Tokens=@("PDM5") }
)

$sourceRoots = @(
    ".\data\products",
    ".\components\products",
    ".\app"
) | Where-Object {
    Test-Path -LiteralPath $_
}

$codeExtensions = @(
    ".ts", ".tsx", ".js", ".jsx", ".json", ".cjs", ".mjs"
)

$codeFiles = foreach ($root in $sourceRoots) {
    Get-ChildItem `
        -LiteralPath $root `
        -Recurse `
        -File `
        -ErrorAction SilentlyContinue |
    Where-Object {
        $codeExtensions -contains $_.Extension.ToLowerInvariant() -and
        $_.Length -lt 12MB -and
        $_.FullName -notmatch '(?i)[\\/](node_modules|\.next|out)[\\/]' -and
        $_.Name -notmatch '(?i)\.bak|backup|备份'
    }
}

$codeFiles = @(
    $codeFiles |
    Sort-Object FullName -Unique
)

$imageRoot = Join-Path $projectRoot "public"

$imageFiles = @(
    Get-ChildItem `
        -LiteralPath $imageRoot `
        -Recurse `
        -File `
        -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Extension -match '(?i)^\.(webp|png|jpg|jpeg|avif|svg)$' -and
        $_.FullName -match '(?i)[\\/](product|products|selection|detail|pump|valve|control|connector|tubing)'
    }
)

function Convert-ToWebPath {
    param([string]$FullName)

    $relative = $FullName.Substring($imageRoot.Length)
    return "/" + $relative.TrimStart("\").Replace("\", "/")
}

function Get-ImagePathsFromText {
    param([string]$Text)

    $pattern = '["''](?<path>/(?:images|assets)/[^"'']+\.(?:webp|png|jpg|jpeg|avif|svg))["'']'

    return @(
        [regex]::Matches(
            $Text,
            $pattern,
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
        ) |
        ForEach-Object {
            $_.Groups["path"].Value
        } |
        Sort-Object -Unique
    )
}

$results = New-Object System.Collections.Generic.List[object]

foreach ($product in $products) {
    $candidateScores = @{}

    foreach ($file in $codeFiles) {
        try {
            $text = [System.IO.File]::ReadAllText($file.FullName)
        }
        catch {
            continue
        }

        foreach ($token in $product.Tokens) {
            $tokenIndex = $text.IndexOf(
                $token,
                [System.StringComparison]::OrdinalIgnoreCase
            )

            if ($tokenIndex -lt 0) {
                continue
            }

            $start = [Math]::Max(0, $tokenIndex - 5000)
            $length = [Math]::Min(
                10000,
                $text.Length - $start
            )

            $context = $text.Substring($start, $length)
            $paths = Get-ImagePathsFromText $context

            foreach ($path in $paths) {
                $score = 50

                if ($path -match '(?i)(main|hero|primary|selection|card)') {
                    $score += 20
                }

                if ($path -match '(?i)(thumb|thumbnail)') {
                    $score += 8
                }

                if ($path -match [regex]::Escape($token)) {
                    $score += 35
                }

                if (
                    -not $candidateScores.ContainsKey($path) -or
                    $score -gt $candidateScores[$path].Score
                ) {
                    $candidateScores[$path] = [PSCustomObject]@{
                        Score = $score
                        Source = $file.FullName.Substring(
                            $projectRoot.Length
                        ).TrimStart("\")
                    }
                }
            }
        }
    }

    foreach ($imageFile in $imageFiles) {
        $searchText = (
            $imageFile.FullName +
            " " +
            $imageFile.BaseName
        )

        foreach ($token in $product.Tokens) {
            if (
                $searchText.IndexOf(
                    $token,
                    [System.StringComparison]::OrdinalIgnoreCase
                ) -lt 0
            ) {
                continue
            }

            $path = Convert-ToWebPath $imageFile.FullName
            $score = 80

            if ($imageFile.BaseName -match '(?i)(main|hero|primary|selection|card)') {
                $score += 20
            }

            if (
                -not $candidateScores.ContainsKey($path) -or
                $score -gt $candidateScores[$path].Score
            ) {
                $candidateScores[$path] = [PSCustomObject]@{
                    Score = $score
                    Source = "public图片文件名匹配"
                }
            }
        }
    }

    $ordered = @(
        $candidateScores.GetEnumerator() |
        ForEach-Object {
            [PSCustomObject]@{
                产品ID = $product.Id
                产品名称 = $product.Name
                图片路径 = $_.Key
                分数 = $_.Value.Score
                来源 = $_.Value.Source
                文件是否存在 = if (
                    Test-Path -LiteralPath (
                        Join-Path $imageRoot (
                            $_.Key.TrimStart("/").Replace(
                                "/",
                                [System.IO.Path]::DirectorySeparatorChar
                            )
                        )
                    )
                ) {
                    "是"
                } else {
                    "否"
                }
            }
        } |
        Sort-Object `
            @{ Expression = "分数"; Descending = $true },
            @{ Expression = "图片路径"; Descending = $false } |
        Select-Object -First 8
    )

    if ($ordered.Count -eq 0) {
        $results.Add(
            [PSCustomObject]@{
                产品ID = $product.Id
                产品名称 = $product.Name
                图片路径 = ""
                分数 = 0
                来源 = "未找到"
                文件是否存在 = ""
            }
        )
    }
    else {
        foreach ($candidate in $ordered) {
            $results.Add($candidate)
        }
    }
}

$results |
    Export-Csv `
        -LiteralPath $csvPath `
        -NoTypeInformation `
        -Encoding UTF8

$report = New-Object System.Collections.Generic.List[string]

$report.Add("英文规格书产品中心图片定位报告")
$report.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$report.Add("")
$report.Add("说明：")
$report.Add("1. 本报告只定位产品中心现有图片，没有修改任何文件。")
$report.Add("2. 每个产品按匹配可信度从高到低列出。")
$report.Add("3. 最终应优先使用产品中心卡片或详情页主图。")
$report.Add("")

foreach ($product in $products) {
    $report.Add("============================================================")
    $report.Add("$($product.Name)  [$($product.Id)]")
    $report.Add("============================================================")
    $report.Add("")

    $matches = @(
        $results |
        Where-Object {
            $_.产品ID -eq $product.Id
        }
    )

    foreach ($match in $matches) {
        if (-not $match.图片路径) {
            $report.Add("未找到候选图片。")
        }
        else {
            $report.Add("图片：$($match.图片路径)")
            $report.Add("分数：$($match.分数)")
            $report.Add("存在：$($match.文件是否存在)")
            $report.Add("来源：$($match.来源)")
            $report.Add("")
        }
    }
}

$report |
    Set-Content `
        -LiteralPath $reportPath `
        -Encoding UTF8

Write-Host ""
Write-Host "产品中心图片定位完成，没有修改项目文件。" -ForegroundColor Green
Write-Host ""
Write-Host "文字报告：" -ForegroundColor Cyan
Write-Host $reportPath
Write-Host ""
Write-Host "候选表格：" -ForegroundColor Cyan
Write-Host $csvPath
Write-Host ""

notepad $reportPath

