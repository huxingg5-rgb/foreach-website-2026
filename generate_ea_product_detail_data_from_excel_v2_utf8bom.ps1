param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
# Windows PowerShell 5.1 compatible version.
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$sourceRoot = Join-Path $projectRoot "data-source\product-center\pumps\plunger-pump\ea"
$detailWorkbookPath = Join-Path $sourceRoot "01_EA常规柱塞泵_详情页资料_zh.xlsx"
$specWorkbookPath = Join-Path $sourceRoot "02_EA常规柱塞泵_规格参数_zh.xlsx"
$selectionWorkbookPath = Join-Path $sourceRoot "ea-selection.xlsx"
$imageRoot = Join-Path $projectRoot "public\images\products\pumps\plunger-pump\ea"

$outputRoot = Join-Path $projectRoot "data\products\detail"
$detailOutputPath = Join-Path $outputRoot "ea-product-details.zh.generated.ts"
$specOutputPath = Join-Path $outputRoot "ea-product-specs.zh.generated.ts"
$reportPath = Join-Path $sourceRoot "ea-product-data-validation.txt"

$requiredFiles = @(
  $detailWorkbookPath,
  $specWorkbookPath,
  $selectionWorkbookPath
)

foreach ($filePath in $requiredFiles) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

if (-not (Test-Path -LiteralPath $imageRoot)) {
  throw "EA image directory not found: $imageRoot"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-ColumnIndexFromReference {
  param(
    [Parameter(Mandatory = $true)]
    [string]$CellReference
  )

  $letters = ([regex]::Match($CellReference, "^[A-Z]+")).Value
  $index = 0

  foreach ($char in $letters.ToCharArray()) {
    $index = ($index * 26) + ([int][char]$char - [int][char]'A' + 1)
  }

  return $index - 1
}

function Get-CellText {
  param(
    [Parameter(Mandatory = $true)]
    [System.Xml.XmlElement]$Cell,

    [Parameter(Mandatory = $true)]
    [string[]]$SharedStrings,

    [Parameter(Mandatory = $true)]
    [System.Xml.XmlNamespaceManager]$NamespaceManager
  )

  $cellType = $Cell.GetAttribute("t")

  if ($cellType -eq "inlineStr") {
    $textNodes = $Cell.SelectNodes("./x:is//x:t", $NamespaceManager)

    if ($null -eq $textNodes) {
      return ""
    }

    return (($textNodes | ForEach-Object { $_.InnerText }) -join "")
  }

  $valueNode = $Cell.SelectSingleNode("./x:v", $NamespaceManager)

  if ($null -eq $valueNode) {
    return ""
  }

  $rawValue = [string]$valueNode.InnerText

  switch ($cellType) {
    "s" {
      $sharedIndex = 0

      if (
        [int]::TryParse(
          $rawValue,
          [System.Globalization.NumberStyles]::Integer,
          [System.Globalization.CultureInfo]::InvariantCulture,
          [ref]$sharedIndex
        ) -and
        $sharedIndex -ge 0 -and
        $sharedIndex -lt $SharedStrings.Count
      ) {
        return [string]$SharedStrings[$sharedIndex]
      }

      return $rawValue
    }

    "b" {
      if ($rawValue -eq "1") {
        return "TRUE"
      }

      return "FALSE"
    }

    default {
      return $rawValue
    }
  }
}

function Read-XlsxWorkbook {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $temporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) (
    "foreach-xlsx-" + [guid]::NewGuid().ToString("N")
  )

  New-Item -ItemType Directory -Force -Path $temporaryRoot | Out-Null

  try {
    [System.IO.Compression.ZipFile]::ExtractToDirectory(
      $Path,
      $temporaryRoot
    )

    $sharedStrings = @()
    $sharedStringsPath = Join-Path $temporaryRoot "xl\sharedStrings.xml"

    if (Test-Path -LiteralPath $sharedStringsPath) {
      [xml]$sharedXml = Get-Content -LiteralPath $sharedStringsPath -Raw -Encoding UTF8
      $sharedNamespace = New-Object System.Xml.XmlNamespaceManager($sharedXml.NameTable)
      $sharedNamespace.AddNamespace(
        "x",
        "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      )

      $sharedItems = $sharedXml.SelectNodes(
        "/x:sst/x:si",
        $sharedNamespace
      )

      foreach ($sharedItem in $sharedItems) {
        $textNodes = $sharedItem.SelectNodes(".//x:t", $sharedNamespace)
        $sharedStrings += (($textNodes | ForEach-Object { $_.InnerText }) -join "")
      }
    }

    $workbookPath = Join-Path $temporaryRoot "xl\workbook.xml"
    $relationshipPath = Join-Path $temporaryRoot "xl\_rels\workbook.xml.rels"

    [xml]$workbookXml = Get-Content -LiteralPath $workbookPath -Raw -Encoding UTF8
    [xml]$relationshipXml = Get-Content -LiteralPath $relationshipPath -Raw -Encoding UTF8

    $workbookNamespace = New-Object System.Xml.XmlNamespaceManager($workbookXml.NameTable)
    $workbookNamespace.AddNamespace(
      "x",
      "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    )

    $relationshipNamespace = New-Object System.Xml.XmlNamespaceManager($relationshipXml.NameTable)
    $relationshipNamespace.AddNamespace(
      "r",
      "http://schemas.openxmlformats.org/package/2006/relationships"
    )

    $relationshipMap = @{}

    foreach (
      $relationship in $relationshipXml.SelectNodes(
        "/r:Relationships/r:Relationship",
        $relationshipNamespace
      )
    ) {
      $relationshipMap[[string]$relationship.Id] = [string]$relationship.Target
    }

    $sheets = @()

    foreach (
      $sheetNode in $workbookXml.SelectNodes(
        "/x:workbook/x:sheets/x:sheet",
        $workbookNamespace
      )
    ) {
      $sheetName = [string]$sheetNode.name
      $relationshipId = $sheetNode.GetAttribute(
        "id",
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
      )

      if (-not $relationshipMap.ContainsKey($relationshipId)) {
        throw "Workbook relationship not found for sheet '$sheetName'."
      }

      $target = [string]$relationshipMap[$relationshipId]
      $target = $target.Replace("/", "\")

      if ($target.StartsWith("\")) {
        $target = $target.TrimStart("\")
      }

      if ($target.StartsWith("xl\")) {
        $sheetXmlPath = Join-Path $temporaryRoot $target
      }
      else {
        $sheetXmlPath = Join-Path (Join-Path $temporaryRoot "xl") $target
      }

      [xml]$sheetXml = Get-Content -LiteralPath $sheetXmlPath -Raw -Encoding UTF8
      $sheetNamespace = New-Object System.Xml.XmlNamespaceManager($sheetXml.NameTable)
      $sheetNamespace.AddNamespace(
        "x",
        "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      )

      $rows = @()

      foreach (
        $rowNode in $sheetXml.SelectNodes(
          "/x:worksheet/x:sheetData/x:row",
          $sheetNamespace
        )
      ) {
        $cellMap = @{}
        $maximumColumnIndex = -1

        foreach ($cellNode in $rowNode.SelectNodes("./x:c", $sheetNamespace)) {
          $cellReference = [string]$cellNode.r
          $columnIndex = Get-ColumnIndexFromReference -CellReference $cellReference
          $cellText = Get-CellText `
            -Cell $cellNode `
            -SharedStrings $sharedStrings `
            -NamespaceManager $sheetNamespace

          $cellMap[$columnIndex] = $cellText

          if ($columnIndex -gt $maximumColumnIndex) {
            $maximumColumnIndex = $columnIndex
          }
        }

        if ($maximumColumnIndex -lt 0) {
          $rows += ,@()
          continue
        }

        $rowValues = New-Object string[] ($maximumColumnIndex + 1)

        for ($columnIndex = 0; $columnIndex -le $maximumColumnIndex; $columnIndex++) {
          if ($cellMap.ContainsKey($columnIndex)) {
            $rowValues[$columnIndex] = [string]$cellMap[$columnIndex]
          }
          else {
            $rowValues[$columnIndex] = ""
          }
        }

        $rows += ,$rowValues
      }

      $sheets += [pscustomobject]@{
        Name = $sheetName
        Rows = $rows
      }
    }

    return [pscustomobject]@{
      Path = $Path
      Sheets = $sheets
    }
  }
  finally {
    if (Test-Path -LiteralPath $temporaryRoot) {
      Remove-Item -LiteralPath $temporaryRoot -Recurse -Force
    }
  }
}

function Normalize-Text {
  param(
    [AllowNull()]
    [object]$Value
  )

  if ($null -eq $Value) {
    return ""
  }

  return ([string]$Value).Trim()
}

function Split-TextList {
  param(
    [AllowNull()]
    [object]$Value
  )

  $text = Normalize-Text $Value

  if ([string]::IsNullOrWhiteSpace($text)) {
    return @()
  }

  return @(
    $text -split "[；;、,\r\n]+" |
      ForEach-Object { $_.Trim() } |
      Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
  )
}

function Convert-YesNoToBoolean {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value,

    [Parameter(Mandatory = $true)]
    [string]$FieldName,

    [Parameter(Mandatory = $true)]
    [string]$Slug
  )

  switch ($Value.Trim()) {
    "是" { return $true }
    "否" { return $false }
    default {
      throw "Slug '$Slug': field '$FieldName' must be 是 or 否, but found '$Value'."
    }
  }
}

function Convert-ImageValueToPublicPath {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  $trimmed = $Value.Trim().Replace("\", "/")

  if ($trimmed.StartsWith("/")) {
    return $trimmed
  }

  if ($trimmed.StartsWith("public/")) {
    return "/" + $trimmed.Substring("public/".Length)
  }

  return "/images/products/pumps/plunger-pump/ea/" + $trimmed
}

function Escape-TypeScriptString {
  param(
    [AllowNull()]
    [object]$Value
  )

  $text = Normalize-Text $Value
  $text = $text.Replace('\', '\\')
  $text = $text.Replace("`r", '\r')
  $text = $text.Replace("`n", '\n')
  $text = $text.Replace('"', '\"')

  return $text
}

function Convert-ToTypeScriptJson {
  param(
    [Parameter(Mandatory = $true)]
    [object]$Value
  )

  return ($Value | ConvertTo-Json -Depth 30)
}

$errors = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$reportLines = New-Object System.Collections.Generic.List[string]

$expectedCapacities = @("100", "250", "500", "1000", "2500", "5000", "10000")
$expectedMaterials = @("PMMA", "PEEK")
$expectedSlugs = New-Object System.Collections.Generic.HashSet[string]

foreach ($capacity in $expectedCapacities) {
  foreach ($material in $expectedMaterials) {
    [void]$expectedSlugs.Add(
      ("ea-{0}-{1}" -f $capacity, $material.ToLowerInvariant())
    )
  }
}

Write-Host ""
Write-Host "Reading EA Excel workbooks..." -ForegroundColor Cyan

$detailWorkbook = Read-XlsxWorkbook -Path $detailWorkbookPath
$specWorkbook = Read-XlsxWorkbook -Path $specWorkbookPath
$selectionWorkbook = Read-XlsxWorkbook -Path $selectionWorkbookPath

if ($detailWorkbook.Sheets.Count -lt 1) {
  throw "Detail workbook contains no worksheets."
}

$detailSheet = $detailWorkbook.Sheets[0]
$detailRows = @($detailSheet.Rows)

$requiredDetailHeaders = @(
  "页面 slug",
  "型号",
  "名称",
  "优势",
  "常见应用",
  "附属图片",
  "显示配置选择",
  "显示规格书申请",
  "显示2D申请",
  "显示3D申请",
  "FAQ系列"
)

if ($detailRows.Count -lt 2) {
  $errors.Add("详情页资料表没有数据行。")
}

$headerMap = @{}

if ($detailRows.Count -ge 1) {
  for ($columnIndex = 0; $columnIndex -lt $detailRows[0].Count; $columnIndex++) {
    $headerName = Normalize-Text $detailRows[0][$columnIndex]

    if (-not [string]::IsNullOrWhiteSpace($headerName)) {
      $headerMap[$headerName] = $columnIndex
    }
  }
}

foreach ($requiredHeader in $requiredDetailHeaders) {
  if (-not $headerMap.ContainsKey($requiredHeader)) {
    $errors.Add("详情页资料表缺少列：$requiredHeader")
  }
}

$detailRecords = @()
$actualSlugs = New-Object System.Collections.Generic.HashSet[string]

if ($errors.Count -eq 0) {
  for ($rowIndex = 1; $rowIndex -lt $detailRows.Count; $rowIndex++) {
    $row = $detailRows[$rowIndex]

    $hasContent = $false

    foreach ($cell in $row) {
      if (-not [string]::IsNullOrWhiteSpace((Normalize-Text $cell))) {
        $hasContent = $true
        break
      }
    }

    if (-not $hasContent) {
      continue
    }

    $getValue = {
      param([string]$Header)

      $columnIndex = [int]$headerMap[$Header]

      if ($columnIndex -ge $row.Count) {
        return ""
      }

      return Normalize-Text $row[$columnIndex]
    }

    $slug = (& $getValue "页面 slug").ToLowerInvariant()
    $model = & $getValue "型号"
    $name = & $getValue "名称"

    if ([string]::IsNullOrWhiteSpace($slug)) {
      $errors.Add("详情页资料表第 $($rowIndex + 1) 行 slug 为空。")
      continue
    }

    if (-not $actualSlugs.Add($slug)) {
      $errors.Add("详情页资料表 slug 重复：$slug")
      continue
    }

    $modelMatch = [regex]::Match(
      $model,
      "^EA-(100|250|500|1000|2500|5000|10000)-(PMMA|PEEK)$",
      [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )

    if (-not $modelMatch.Success) {
      $errors.Add("Slug '$slug' 的型号不符合基础型号规则：$model")
      continue
    }

    $capacity = $modelMatch.Groups[1].Value
    $material = $modelMatch.Groups[2].Value.ToUpperInvariant()
    $expectedSlug = (
      "ea-{0}-{1}" -f $capacity, $material.ToLowerInvariant()
    )

    if ($slug -ne $expectedSlug) {
      $errors.Add(
        "型号 '$model' 应对应 slug '$expectedSlug'，实际为 '$slug'。"
      )
    }

    $additionalImages = @()

    foreach ($imageValue in (Split-TextList (& $getValue "附属图片"))) {
      $publicPath = Convert-ImageValueToPublicPath $imageValue
      $relativeFilePath = $publicPath.TrimStart("/").Replace("/", "\")
      $absoluteFilePath = Join-Path $projectRoot ("public\" + $relativeFilePath.Substring("images\".Length))

      # Build the real local path directly from the filename if the URL uses the EA image base.
      if ($publicPath.StartsWith("/images/products/pumps/plunger-pump/ea/")) {
        $fileName = [System.IO.Path]::GetFileName($publicPath)
        $absoluteFilePath = Join-Path $imageRoot $fileName
      }

      if (-not (Test-Path -LiteralPath $absoluteFilePath)) {
        $errors.Add(
          "Slug '$slug' 的附属图片不存在：$publicPath"
        )
      }

      $additionalImages += $publicPath
    }

    $mainImageFileName = (
      "pump-ea-{0}ul-{1}.webp" -f
      $capacity,
      $material.ToLowerInvariant()
    )
    $mainImageAbsolutePath = Join-Path $imageRoot $mainImageFileName
    $mainImagePublicPath = (
      "/images/products/pumps/plunger-pump/ea/{0}" -f
      $mainImageFileName
    )

    if (-not (Test-Path -LiteralPath $mainImageAbsolutePath)) {
      $errors.Add(
        "Slug '$slug' 对应的选型主图不存在：$mainImagePublicPath"
      )
    }

    try {
      $showConfiguration = Convert-YesNoToBoolean `
        -Value (& $getValue "显示配置选择") `
        -FieldName "显示配置选择" `
        -Slug $slug

      $showDatasheetRequest = Convert-YesNoToBoolean `
        -Value (& $getValue "显示规格书申请") `
        -FieldName "显示规格书申请" `
        -Slug $slug

      $show2DRequest = Convert-YesNoToBoolean `
        -Value (& $getValue "显示2D申请") `
        -FieldName "显示2D申请" `
        -Slug $slug

      $show3DRequest = Convert-YesNoToBoolean `
        -Value (& $getValue "显示3D申请") `
        -FieldName "显示3D申请" `
        -Slug $slug
    }
    catch {
      $errors.Add($_.Exception.Message)
      continue
    }

    $detailRecords += [ordered]@{
      category = "pumps"
      productFamily = "EA常规柱塞泵"
      slug = $slug
      model = $model
      name = $name
      capacity = [int]$capacity
      material = $material
      advantages = @(Split-TextList (& $getValue "优势"))
      commonApplications = @(Split-TextList (& $getValue "常见应用"))
      mainImage = $mainImagePublicPath
      additionalImages = @($additionalImages)
      showConfiguration = $showConfiguration
      showDatasheetRequest = $showDatasheetRequest
      show2DRequest = $show2DRequest
      show3DRequest = $show3DRequest
      faqSeries = (& $getValue "FAQ系列")
    }
  }
}

foreach ($expectedSlug in $expectedSlugs) {
  if (-not $actualSlugs.Contains($expectedSlug)) {
    $errors.Add("详情页资料表缺少 slug：$expectedSlug")
  }
}

foreach ($actualSlug in $actualSlugs) {
  if (-not $expectedSlugs.Contains($actualSlug)) {
    $errors.Add("详情页资料表包含不应存在的 slug：$actualSlug")
  }
}

if ($actualSlugs.Count -ne 14) {
  $errors.Add(
    "详情页资料表应包含 14 个 slug，实际为 $($actualSlugs.Count)。"
  )
}

$requiredSpecParameters = @(
  "页面 slug",
  "型号",
  "名称",
  "容量",
  "泵头材质",
  "系列代号",
  "分辨率",
  "全行程步数",
  "螺距",
  "泵类型",
  "柱塞材质",
  "安装尺寸",
  "接口",
  "回程差",
  "满量程准确度",
  "满量程重复性",
  "2%量程准确度",
  "2%量程重复性",
  "流体压力"
)

$specificationMap = [ordered]@{}
$actualSpecSheets = New-Object System.Collections.Generic.HashSet[string]

foreach ($sheet in $specWorkbook.Sheets) {
  $sheetName = ([string]$sheet.Name).Trim().ToLowerInvariant()

  if (-not $actualSpecSheets.Add($sheetName)) {
    $errors.Add("规格参数表存在重复 Sheet：$sheetName")
    continue
  }

  if (-not $expectedSlugs.Contains($sheetName)) {
    $errors.Add("规格参数表包含不应存在的 Sheet：$sheetName")
  }

  $rows = @($sheet.Rows)

  if ($rows.Count -lt 2) {
    $errors.Add("规格 Sheet '$sheetName' 没有参数数据。")
    continue
  }

  $header1 = if ($rows[0].Count -ge 1) { Normalize-Text $rows[0][0] } else { "" }
  $header2 = if ($rows[0].Count -ge 2) { Normalize-Text $rows[0][1] } else { "" }

  if ($header1 -ne "参数名称" -or $header2 -ne "参数值") {
    $errors.Add(
      "规格 Sheet '$sheetName' 的表头必须是 '参数名称 / 参数值'。"
    )
  }

  $parameterMap = [ordered]@{}
  $parameterRows = @()

  for ($rowIndex = 1; $rowIndex -lt $rows.Count; $rowIndex++) {
    $row = $rows[$rowIndex]
    $parameterName = if ($row.Count -ge 1) { Normalize-Text $row[0] } else { "" }
    $parameterValue = if ($row.Count -ge 2) { Normalize-Text $row[1] } else { "" }

    $extraValues = @()

    if ($row.Count -gt 2) {
      for ($columnIndex = 2; $columnIndex -lt $row.Count; $columnIndex++) {
        $extraValue = Normalize-Text $row[$columnIndex]

        if (-not [string]::IsNullOrWhiteSpace($extraValue)) {
          $extraValues += $extraValue
        }
      }
    }

    if ($extraValues.Count -gt 0) {
      $errors.Add(
        "规格 Sheet '$sheetName' 第 $($rowIndex + 1) 行存在第三列及以后数据。"
      )
    }

    if (
      [string]::IsNullOrWhiteSpace($parameterName) -and
      [string]::IsNullOrWhiteSpace($parameterValue)
    ) {
      continue
    }

    if ([string]::IsNullOrWhiteSpace($parameterName)) {
      $errors.Add(
        "规格 Sheet '$sheetName' 第 $($rowIndex + 1) 行参数名称为空。"
      )
      continue
    }

    if ($parameterMap.Contains($parameterName)) {
      $errors.Add(
        "规格 Sheet '$sheetName' 参数名称重复：$parameterName"
      )
      continue
    }

    $parameterMap[$parameterName] = $parameterValue
    $parameterRows += [ordered]@{
      name = $parameterName
      value = $parameterValue
    }
  }

  foreach ($requiredParameter in $requiredSpecParameters) {
    if (-not $parameterMap.Contains($requiredParameter)) {
      $errors.Add(
        "规格 Sheet '$sheetName' 缺少参数：$requiredParameter"
      )
    }
  }

  if (
    $parameterMap.Contains("页面 slug") -and
    ([string]$parameterMap["页面 slug"]).Trim().ToLowerInvariant() -ne $sheetName
  ) {
    $errors.Add(
      "规格 Sheet '$sheetName' 内的页面 slug 与 Sheet 名不一致。"
    )
  }

  $specificationMap[$sheetName] = [ordered]@{
    rows = @($parameterRows)
    values = $parameterMap
  }
}

foreach ($expectedSlug in $expectedSlugs) {
  if (-not $actualSpecSheets.Contains($expectedSlug)) {
    $errors.Add("规格参数表缺少 Sheet：$expectedSlug")
  }
}

if ($actualSpecSheets.Count -ne 14) {
  $errors.Add(
    "规格参数表应包含 14 个 Sheet，实际为 $($actualSpecSheets.Count)。"
  )
}

# Compare PMMA and PEEK specification values for the same capacity.
$ignoredComparisonParameters = @(
  "页面 slug",
  "型号",
  "泵头材质"
)

foreach ($capacity in $expectedCapacities) {
  $pmmaSlug = "ea-$capacity-pmma"
  $peekSlug = "ea-$capacity-peek"

  if (
    $specificationMap.Contains($pmmaSlug) -and
    $specificationMap.Contains($peekSlug)
  ) {
    $pmmaValues = $specificationMap[$pmmaSlug].values
    $peekValues = $specificationMap[$peekSlug].values

    foreach ($parameterName in $requiredSpecParameters) {
      if ($ignoredComparisonParameters -contains $parameterName) {
        continue
      }

      if (
        $pmmaValues.Contains($parameterName) -and
        $peekValues.Contains($parameterName)
      ) {
        $pmmaValue = Normalize-Text $pmmaValues[$parameterName]
        $peekValue = Normalize-Text $peekValues[$parameterName]

        if ($pmmaValue -ne $peekValue) {
          $errors.Add(
            "容量 $capacity μL 的 PMMA / PEEK 参数不一致：" +
            "$parameterName（PMMA='$pmmaValue'，PEEK='$peekValue'）"
          )
        }
      }
    }
  }
}

if ($selectionWorkbook.Sheets.Count -lt 1) {
  $errors.Add("ea-selection.xlsx 没有任何 Sheet。")
}
else {
  $reportLines.Add(
    "ea-selection.xlsx：检测到 $($selectionWorkbook.Sheets.Count) 个 Sheet。"
  )
}

$reportLines.Add("详情页资料：$($detailRecords.Count) 条。")
$reportLines.Add("规格参数：$($specificationMap.Count) 个 Sheet。")
$reportLines.Add("主图目录：$imageRoot")
$reportLines.Add("统一附属图片：pump-ea-duanzi.webp、pump-ea-guangou.webp")

$reportContent = New-Object System.Collections.Generic.List[string]
$reportContent.Add("============================================================")
$reportContent.Add("EA 产品详情数据校验报告")
$reportContent.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$reportContent.Add("============================================================")
$reportContent.Add("")
$reportContent.Add("输入目录：$sourceRoot")
$reportContent.Add("图片目录：$imageRoot")
$reportContent.Add("")

foreach ($line in $reportLines) {
  $reportContent.Add($line)
}

$reportContent.Add("")
$reportContent.Add("错误数量：$($errors.Count)")
$reportContent.Add("警告数量：$($warnings.Count)")
$reportContent.Add("")

if ($errors.Count -gt 0) {
  $reportContent.Add("【错误】")

  foreach ($errorItem in $errors) {
    $reportContent.Add("- $errorItem")
  }

  $reportContent.Add("")
}

if ($warnings.Count -gt 0) {
  $reportContent.Add("【警告】")

  foreach ($warningItem in $warnings) {
    $reportContent.Add("- $warningItem")
  }

  $reportContent.Add("")
}

if ($errors.Count -eq 0) {
  $reportContent.Add("校验结果：通过")
}
else {
  $reportContent.Add("校验结果：未通过，不生成网站数据。")
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines(
  $reportPath,
  $reportContent,
  $utf8NoBom
)

Write-Host ""
Write-Host "Validation report:" -ForegroundColor Cyan
Write-Host $reportPath

if ($errors.Count -gt 0) {
  Write-Host ""
  Write-Host "EA data validation failed:" -ForegroundColor Red

  foreach ($errorItem in $errors) {
    Write-Host " - $errorItem" -ForegroundColor Red
  }

  throw "EA Excel validation failed. Generated TypeScript files were not changed."
}

if (-not (Test-Path -LiteralPath $outputRoot)) {
  New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

foreach ($outputPath in @($detailOutputPath, $specOutputPath)) {
  if (Test-Path -LiteralPath $outputPath) {
    Copy-Item `
      -LiteralPath $outputPath `
      -Destination "$outputPath.$timestamp.bak" `
      -Force

    Write-Host "Backup created: $outputPath.$timestamp.bak" -ForegroundColor Yellow
  }
}

$detailJson = Convert-ToTypeScriptJson $detailRecords

$detailTypeScript = @"
/* =========================================================
   AUTO-GENERATED FILE — DO NOT EDIT MANUALLY

   Source:
   data-source/product-center/pumps/plunger-pump/ea/
   01_EA常规柱塞泵_详情页资料_zh.xlsx
   ea-selection.xlsx

   Run the EA Excel conversion script to regenerate.
========================================================= */

export type EaProductMaterial = "PMMA" | "PEEK";

export type EaProductDetailZh = {
  category: "pumps";
  productFamily: "EA常规柱塞泵";
  slug: string;
  model: string;
  name: string;
  capacity: number;
  material: EaProductMaterial;
  advantages: string[];
  commonApplications: string[];
  mainImage: string;
  additionalImages: string[];
  showConfiguration: boolean;
  showDatasheetRequest: boolean;
  show2DRequest: boolean;
  show3DRequest: boolean;
  faqSeries: string;
};

export const eaProductDetailsZh = $detailJson as EaProductDetailZh[];

export const eaProductDetailZhBySlug: Record<string, EaProductDetailZh> =
  Object.fromEntries(
    eaProductDetailsZh.map((item) => [item.slug, item]),
  );

export const eaProductDetailStaticParams = eaProductDetailsZh.map(
  (item) => ({
    category: item.category,
    slug: item.slug,
  }),
);

export function getEaProductDetailZhBySlug(
  slug: string,
): EaProductDetailZh | null {
  return eaProductDetailZhBySlug[slug.toLowerCase()] ?? null;
}
"@

$specRecordsForJson = [ordered]@{}

foreach ($slug in ($specificationMap.Keys | Sort-Object)) {
  $specRecordsForJson[$slug] = $specificationMap[$slug].rows
}

$specJson = Convert-ToTypeScriptJson $specRecordsForJson

$specTypeScript = @"
/* =========================================================
   AUTO-GENERATED FILE — DO NOT EDIT MANUALLY

   Source:
   data-source/product-center/pumps/plunger-pump/ea/
   02_EA常规柱塞泵_规格参数_zh.xlsx

   Run the EA Excel conversion script to regenerate.
========================================================= */

export type EaProductSpecRow = {
  name: string;
  value: string;
};

export const eaProductSpecsZhBySlug = $specJson as Record<
  string,
  EaProductSpecRow[]
>;

export function getEaProductSpecsZhBySlug(
  slug: string,
): EaProductSpecRow[] {
  return eaProductSpecsZhBySlug[slug.toLowerCase()] ?? [];
}
"@

[System.IO.File]::WriteAllText(
  $detailOutputPath,
  $detailTypeScript,
  $utf8NoBom
)

[System.IO.File]::WriteAllText(
  $specOutputPath,
  $specTypeScript,
  $utf8NoBom
)

Write-Host ""
Write-Host "Generated:" -ForegroundColor Green
Write-Host $detailOutputPath
Write-Host $specOutputPath
Write-Host ""
Write-Host "Validation passed:" -ForegroundColor Green
Write-Host " - 14 detail records"
Write-Host " - 14 specification sheets"
Write-Host " - 7 capacities x PMMA / PEEK"
Write-Host " - No 50 uL or 20000 uL records"
Write-Host " - Main and additional images exist"

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
  Write-Host "Removed stale .next cache." -ForegroundColor Yellow
}

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "EA data files were generated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
