$ErrorActionPreference = "Stop"

$project = "F:\WebsiteProjects\foreach-website-2026"
$sourceDir = "H:\01-官网项目\02_产品中心\fit\Quick connector\快插2D图纸_PDF"
$detailJson = Join-Path $project "data\products\generated\fittings\quick-connect-fittings\detail\index.json"
$reportPath = Join-Path $project "快插2D图纸导入前核查报告.txt"

$mappingCandidates = @(
    (Join-Path $PSScriptRoot "快插接头_图纸映射.json"),
    (Join-Path $project "快插接头_图纸映射.json")
)

$mappingPath = $mappingCandidates |
    Where-Object { Test-Path -LiteralPath $_ } |
    Select-Object -First 1

if (-not $mappingPath) {
    throw @"
未找到映射文件：快插接头_图纸映射.json

请把它与本脚本放在同一目录，或者复制到：
$project
"@
}

foreach ($requiredPath in @($project, $sourceDir, $detailJson)) {
    if (-not (Test-Path -LiteralPath $requiredPath)) {
        throw "未找到：$requiredPath"
    }
}

$mappingDoc = Get-Content -LiteralPath $mappingPath -Raw -Encoding UTF8 |
    ConvertFrom-Json

$mappings = @($mappingDoc.mappings)

if ($mappings.Count -eq 0) {
    throw "映射文件中没有 mappings 数据。"
}

function Get-ObjectProductCode {
    param([object]$Object)

    foreach ($name in @(
        "productCode",
        "product_code",
        "code",
        "sku",
        "itemCode",
        "item_code"
    )) {
        $property = $Object.PSObject.Properties[$name]

        if ($null -ne $property -and $null -ne $property.Value) {
            $value = [string]$property.Value

            if (-not [string]::IsNullOrWhiteSpace($value)) {
                return $value.Trim()
            }
        }
    }

    return ""
}

function Find-ProductObjects {
    param(
        [object]$Value,
        [System.Collections.Generic.List[object]]$Results,
        [int]$Depth = 0
    )

    if ($null -eq $Value -or $Depth -gt 15) {
        return
    }

    if ($Value -is [string]) {
        return
    }

    if (
        $Value -is [System.Collections.IEnumerable] -and
        $Value -isnot [System.Management.Automation.PSCustomObject] -and
        $Value -isnot [System.Collections.IDictionary]
    ) {
        foreach ($item in $Value) {
            Find-ProductObjects -Value $item -Results $Results -Depth ($Depth + 1)
        }

        return
    }

    $code = Get-ObjectProductCode -Object $Value

    if ($code -match '^\d{6}$') {
        $Results.Add($Value)
    }

    foreach ($property in $Value.PSObject.Properties) {
        $propertyValue = $property.Value

        if (
            $null -ne $propertyValue -and
            $propertyValue -isnot [string]
        ) {
            Find-ProductObjects `
                -Value $propertyValue `
                -Results $Results `
                -Depth ($Depth + 1)
        }
    }
}

$detailRaw = Get-Content -LiteralPath $detailJson -Raw -Encoding UTF8
$detailData = $detailRaw | ConvertFrom-Json

$productObjects = New-Object System.Collections.Generic.List[object]
Find-ProductObjects -Value $detailData -Results $productObjects

$siteCodes = @(
    $productObjects |
    ForEach-Object { Get-ObjectProductCode -Object $_ } |
    Where-Object { $_ -match '^\d{6}$' } |
    Sort-Object -Unique
)

$mappingCodes = @(
    $mappings |
    ForEach-Object { [string]$_.productCode } |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)

$duplicateMappingCodes = @(
    $mappingCodes |
    Group-Object |
    Where-Object { $_.Count -gt 1 }
)

$uniquePdfNames = @(
    $mappings |
    ForEach-Object { [string]$_.pdfFile } |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    Sort-Object -Unique
)

$sourcePdfIndex = @{}

Get-ChildItem -LiteralPath $sourceDir -Recurse -File -Filter *.pdf |
    ForEach-Object {
        $key = $_.Name.ToLowerInvariant()

        if (-not $sourcePdfIndex.ContainsKey($key)) {
            $sourcePdfIndex[$key] =
                New-Object System.Collections.Generic.List[string]
        }

        $sourcePdfIndex[$key].Add($_.FullName)
    }

$missingSourcePdfs = New-Object System.Collections.Generic.List[string]
$duplicateSourcePdfs = New-Object System.Collections.Generic.List[object]
$resolvedPdfs = New-Object System.Collections.Generic.List[object]

foreach ($pdfName in $uniquePdfNames) {
    $key = $pdfName.ToLowerInvariant()

    if (-not $sourcePdfIndex.ContainsKey($key)) {
        $missingSourcePdfs.Add($pdfName)
        continue
    }

    $paths = @($sourcePdfIndex[$key])

    if ($paths.Count -gt 1) {
        $duplicateSourcePdfs.Add(
            [PSCustomObject]@{
                Pdf = $pdfName
                Paths = ($paths -join " | ")
            }
        )
    }

    $resolvedPdfs.Add(
        [PSCustomObject]@{
            Pdf = $pdfName
            SourcePath = $paths[0]
        }
    )
}

$mappingCodeSet = @{}
foreach ($code in $mappingCodes) {
    $mappingCodeSet[$code] = $true
}

$siteCodeSet = @{}
foreach ($code in $siteCodes) {
    $siteCodeSet[$code] = $true
}

$mappingCodesMissingFromSite = @(
    $mappingCodes |
    Sort-Object -Unique |
    Where-Object { -not $siteCodeSet.ContainsKey($_) }
)

$siteCodesWithoutMapping = @(
    $siteCodes |
    Where-Object { -not $mappingCodeSet.ContainsKey($_) }
)

$mappingRowsWithMissingPdf = @(
    $mappings |
    Where-Object {
        $pdfName = [string]$_.pdfFile
        -not $sourcePdfIndex.ContainsKey($pdfName.ToLowerInvariant())
    }
)

$seriesStats = @(
    $mappings |
    ForEach-Object {
        $model = [string]$_.websiteStructuralModel
        $series =
            if ($model.StartsWith("Q20")) { "Q20" }
            elseif ($model.StartsWith("Q40")) { "Q40" }
            elseif ($model.StartsWith("Q60")) { "Q60" }
            else { "其他" }

        [PSCustomObject]@{
            Series = $series
            MatchResult = [string]$_.matchResult
        }
    } |
    Group-Object Series |
    Sort-Object Name
)

$lines = New-Object System.Collections.Generic.List[string]

$lines.Add("快插 2D 图纸导入前核查报告")
$lines.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$lines.Add("项目：$project")
$lines.Add("图纸源目录：$sourceDir")
$lines.Add("映射文件：$mappingPath")
$lines.Add("官网数据：$detailJson")
$lines.Add("")

$lines.Add("============================================================")
$lines.Add("一、总体结果")
$lines.Add("============================================================")
$lines.Add("映射清单产品数：$($mappings.Count)")
$lines.Add("映射清单唯一商品编码：$(($mappingCodes | Sort-Object -Unique).Count)")
$lines.Add("映射清单唯一 PDF：$($uniquePdfNames.Count)")
$lines.Add("官网快插商品编码：$($siteCodes.Count)")
$lines.Add("源目录找到 PDF：$($resolvedPdfs.Count)")
$lines.Add("源目录缺少 PDF：$($missingSourcePdfs.Count)")
$lines.Add("映射编码在官网不存在：$($mappingCodesMissingFromSite.Count)")
$lines.Add("官网产品尚无映射：$($siteCodesWithoutMapping.Count)")
$lines.Add("映射编码重复：$($duplicateMappingCodes.Count)")
$lines.Add("源目录同名 PDF 重复：$($duplicateSourcePdfs.Count)")
$lines.Add("")

foreach ($group in $seriesStats) {
    $exactCount = @(
        $group.Group |
        Where-Object { $_.MatchResult -eq "商品编码精确匹配" }
    ).Count

    $sharedCount = $group.Count - $exactCount

    $lines.Add(
        ("{0}：{1} 个产品（精确 {2}，同结构共用 {3}）" -f `
            $group.Name,
            $group.Count,
            $exactCount,
            $sharedCount
        )
    )
}

$lines.Add("")
$lines.Add("============================================================")
$lines.Add("二、源目录缺少的 PDF")
$lines.Add("============================================================")

if ($missingSourcePdfs.Count -eq 0) {
    $lines.Add("没有发现。")
}
else {
    foreach ($pdf in ($missingSourcePdfs | Sort-Object)) {
        $lines.Add($pdf)
    }
}

$lines.Add("")
$lines.Add("============================================================")
$lines.Add("三、映射编码在官网数据中不存在")
$lines.Add("============================================================")

if ($mappingCodesMissingFromSite.Count -eq 0) {
    $lines.Add("没有发现。")
}
else {
    foreach ($code in $mappingCodesMissingFromSite) {
        $row = $mappings |
            Where-Object { [string]$_.productCode -eq $code } |
            Select-Object -First 1

        $lines.Add(
            ("{0} | {1} | {2}" -f `
                $code,
                $row.websiteStructuralModel,
                $row.pdfFile
            )
        )
    }
}

$lines.Add("")
$lines.Add("============================================================")
$lines.Add("四、官网产品尚无映射")
$lines.Add("============================================================")

if ($siteCodesWithoutMapping.Count -eq 0) {
    $lines.Add("没有发现。")
}
else {
    foreach ($code in $siteCodesWithoutMapping) {
        $product = $productObjects |
            Where-Object {
                (Get-ObjectProductCode -Object $_) -eq $code
            } |
            Select-Object -First 1

        $model = ""

        foreach ($name in @("model", "name", "title", "slug")) {
            $property = $product.PSObject.Properties[$name]

            if ($null -ne $property -and $null -ne $property.Value) {
                $model = [string]$property.Value

                if (-not [string]::IsNullOrWhiteSpace($model)) {
                    break
                }
            }
        }

        $lines.Add(("{0} | {1}" -f $code, $model))
    }
}

$lines.Add("")
$lines.Add("============================================================")
$lines.Add("五、同名 PDF 在源目录重复")
$lines.Add("============================================================")

if ($duplicateSourcePdfs.Count -eq 0) {
    $lines.Add("没有发现。")
}
else {
    foreach ($item in $duplicateSourcePdfs) {
        $lines.Add("")
        $lines.Add("PDF：$($item.Pdf)")
        $lines.Add("位置：$($item.Paths)")
    }
}

$lines.Add("")
$lines.Add("============================================================")
$lines.Add("六、导入判定")
$lines.Add("============================================================")

$canImport =
    $missingSourcePdfs.Count -eq 0 -and
    $mappingCodesMissingFromSite.Count -eq 0 -and
    $duplicateMappingCodes.Count -eq 0

if ($canImport) {
    $lines.Add("可以进入导入步骤。")
    $lines.Add("计划导入产品：$($mappings.Count)")
    $lines.Add("计划复制唯一 PDF：$($uniquePdfNames.Count)")
    $lines.Add("官网未映射产品将继续保持空图纸状态：$($siteCodesWithoutMapping.Count)")
}
else {
    $lines.Add("暂不建议导入，请先处理上面的异常。")
}

$utf8Bom = New-Object System.Text.UTF8Encoding($true)

[System.IO.File]::WriteAllLines(
    $reportPath,
    $lines,
    $utf8Bom
)

Write-Host ""
Write-Host "核查完成，没有复制 PDF，也没有修改 JSON。" -ForegroundColor Green
Write-Host "映射产品：$($mappings.Count)"
Write-Host "唯一 PDF：$($uniquePdfNames.Count)"
Write-Host "源目录缺 PDF：$($missingSourcePdfs.Count)"
Write-Host "官网无映射产品：$($siteCodesWithoutMapping.Count)"
Write-Host ""
Write-Host "报告：" -ForegroundColor Cyan
Write-Host $reportPath
Write-Host ""

notepad $reportPath
