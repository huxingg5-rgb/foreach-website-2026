param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$sourceRoot = Join-Path $projectRoot "data-source\product-center\pumps\plunger-pump\ea"
$detailWorkbookPath = Join-Path $sourceRoot "01_EA常规柱塞泵_详情页资料_zh.xlsx"
$specWorkbookPath = Join-Path $sourceRoot "02_EA常规柱塞泵_规格参数_zh.xlsx"
$imageRoot = Join-Path $projectRoot "public\images\products\pumps\plunger-pump\ea"

$outputRoot = Join-Path $projectRoot "data\products\detail"
$detailOutputPath = Join-Path $outputRoot "ea-product-details.zh.generated.ts"
$specOutputPath = Join-Path $outputRoot "ea-product-specs.zh.generated.ts"
$reportPath = Join-Path $sourceRoot "ea-product-data-validation.txt"

$requiredFiles = @(
  $detailWorkbookPath,
  $specWorkbookPath
)

foreach ($filePath in $requiredFiles) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

if (-not (Test-Path -LiteralPath $imageRoot)) {
  throw "EA image directory not found: $imageRoot"
}

function Test-XlsxHeader {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $stream = [System.IO.File]::OpenRead($Path)

  try {
    $buffer = New-Object byte[] 4
    $read = $stream.Read($buffer, 0, 4)

    return (
      $read -eq 4 -and
      $buffer[0] -eq 0x50 -and
      $buffer[1] -eq 0x4B -and
      $buffer[2] -eq 0x03 -and
      $buffer[3] -eq 0x04
    )
  }
  finally {
    $stream.Dispose()
  }
}

foreach ($filePath in $requiredFiles) {
  if (-not (Test-XlsxHeader -Path $filePath)) {
    throw "Invalid XLSX file: $filePath. Replace it with the clean file from the ZIP package before running this script."
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

function Get-ExcelCellText {
  param(
    [Parameter(Mandatory = $true)]
    [object]$Worksheet,

    [Parameter(Mandatory = $true)]
    [int]$Row,

    [Parameter(Mandatory = $true)]
    [int]$Column
  )

  $cell = $Worksheet.Cells.Item($Row, $Column)

  try {
    return (Normalize-Text $cell.Text)
  }
  finally {
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($cell)
  }
}

function Release-ComObjectSafe {
  param(
    [AllowNull()]
    [object]$ComObject
  )

  if ($null -ne $ComObject) {
    try {
      [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($ComObject)
    }
    catch {
    }
  }
}

$expectedCapacities = @("100", "250", "500", "1000", "2500", "5000", "10000")
$expectedMaterials = @("PMMA", "PEEK")
$expectedSlugs = @()

foreach ($capacity in $expectedCapacities) {
  foreach ($material in $expectedMaterials) {
    $expectedSlugs += (
      "ea-{0}-{1}" -f $capacity, $material.ToLowerInvariant()
    )
  }
}

$errors = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$detailRecords = @()
$specificationMap = [ordered]@{}

$excel = $null
$detailWorkbook = $null
$specWorkbook = $null

try {
  try {
    $excel = New-Object -ComObject Excel.Application
  }
  catch {
    throw "Microsoft Excel is required for this conversion script: $($_.Exception.Message)"
  }

  $excel.Visible = $false
  $excel.DisplayAlerts = $false
  $excel.AskToUpdateLinks = $false

  Write-Host ""
  Write-Host "Reading EA detail workbook with Microsoft Excel..." -ForegroundColor Cyan

  $detailWorkbook = $excel.Workbooks.Open(
    $detailWorkbookPath,
    0,
    $true
  )

  $detailSheet = $detailWorkbook.Worksheets.Item(1)

  try {
    $usedRange = $detailSheet.UsedRange

    try {
      $rowCount = [int]$usedRange.Rows.Count
      $columnCount = [int]$usedRange.Columns.Count
    }
    finally {
      Release-ComObjectSafe $usedRange
    }

    if ($rowCount -lt 2) {
      $errors.Add("详情页资料表没有数据行。")
    }

    $headerMap = @{}

    for ($column = 1; $column -le $columnCount; $column++) {
      $header = Get-ExcelCellText `
        -Worksheet $detailSheet `
        -Row 1 `
        -Column $column

      if (-not [string]::IsNullOrWhiteSpace($header)) {
        $headerMap[$header] = $column
      }
    }

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

    foreach ($header in $requiredDetailHeaders) {
      if (-not $headerMap.ContainsKey($header)) {
        $errors.Add("详情页资料表缺少列：$header")
      }
    }

    if ($errors.Count -eq 0) {
      $actualSlugs = @()

      for ($row = 2; $row -le $rowCount; $row++) {
        $slug = (
          Get-ExcelCellText `
            -Worksheet $detailSheet `
            -Row $row `
            -Column ([int]$headerMap["页面 slug"])
        ).ToLowerInvariant()

        if ([string]::IsNullOrWhiteSpace($slug)) {
          continue
        }

        if ($actualSlugs -contains $slug) {
          $errors.Add("详情页资料表 slug 重复：$slug")
          continue
        }

        $actualSlugs += $slug

        $model = Get-ExcelCellText `
          -Worksheet $detailSheet `
          -Row $row `
          -Column ([int]$headerMap["型号"])

        $name = Get-ExcelCellText `
          -Worksheet $detailSheet `
          -Row $row `
          -Column ([int]$headerMap["名称"])

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

        $advantagesText = Get-ExcelCellText `
          -Worksheet $detailSheet `
          -Row $row `
          -Column ([int]$headerMap["优势"])

        $applicationsText = Get-ExcelCellText `
          -Worksheet $detailSheet `
          -Row $row `
          -Column ([int]$headerMap["常见应用"])

        $additionalImagesText = Get-ExcelCellText `
          -Worksheet $detailSheet `
          -Row $row `
          -Column ([int]$headerMap["附属图片"])

        $additionalImages = @()

        foreach ($imageValue in (Split-TextList $additionalImagesText)) {
          $publicPath = Convert-ImageValueToPublicPath $imageValue
          $fileName = [System.IO.Path]::GetFileName($publicPath)
          $absoluteImagePath = Join-Path $imageRoot $fileName

          if (-not (Test-Path -LiteralPath $absoluteImagePath)) {
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
            "Slug '$slug' 对应主图不存在：$mainImagePublicPath"
          )
        }

        try {
          $showConfiguration = Convert-YesNoToBoolean `
            -Value (Get-ExcelCellText `
              -Worksheet $detailSheet `
              -Row $row `
              -Column ([int]$headerMap["显示配置选择"])) `
            -FieldName "显示配置选择" `
            -Slug $slug

          $showDatasheetRequest = Convert-YesNoToBoolean `
            -Value (Get-ExcelCellText `
              -Worksheet $detailSheet `
              -Row $row `
              -Column ([int]$headerMap["显示规格书申请"])) `
            -FieldName "显示规格书申请" `
            -Slug $slug

          $show2DRequest = Convert-YesNoToBoolean `
            -Value (Get-ExcelCellText `
              -Worksheet $detailSheet `
              -Row $row `
              -Column ([int]$headerMap["显示2D申请"])) `
            -FieldName "显示2D申请" `
            -Slug $slug

          $show3DRequest = Convert-YesNoToBoolean `
            -Value (Get-ExcelCellText `
              -Worksheet $detailSheet `
              -Row $row `
              -Column ([int]$headerMap["显示3D申请"])) `
            -FieldName "显示3D申请" `
            -Slug $slug
        }
        catch {
          $errors.Add($_.Exception.Message)
          continue
        }

        $faqSeries = Get-ExcelCellText `
          -Worksheet $detailSheet `
          -Row $row `
          -Column ([int]$headerMap["FAQ系列"])

        $detailRecords += [ordered]@{
          category = "pumps"
          productFamily = "EA常规柱塞泵"
          slug = $slug
          model = $model
          name = $name
          capacity = [int]$capacity
          material = $material
          advantages = @(Split-TextList $advantagesText)
          commonApplications = @(Split-TextList $applicationsText)
          mainImage = $mainImagePublicPath
          additionalImages = @($additionalImages)
          showConfiguration = $showConfiguration
          showDatasheetRequest = $showDatasheetRequest
          show2DRequest = $show2DRequest
          show3DRequest = $show3DRequest
          faqSeries = $faqSeries
        }
      }

      foreach ($expectedSlug in $expectedSlugs) {
        if (-not ($actualSlugs -contains $expectedSlug)) {
          $errors.Add("详情页资料表缺少 slug：$expectedSlug")
        }
      }

      foreach ($actualSlug in $actualSlugs) {
        if (-not ($expectedSlugs -contains $actualSlug)) {
          $errors.Add("详情页资料表包含不应存在的 slug：$actualSlug")
        }
      }

      if ($actualSlugs.Count -ne 14) {
        $errors.Add(
          "详情页资料表应包含 14 个 slug，实际为 $($actualSlugs.Count)。"
        )
      }
    }
  }
  finally {
    Release-ComObjectSafe $detailSheet
  }

  $detailWorkbook.Close($false)
  Release-ComObjectSafe $detailWorkbook
  $detailWorkbook = $null

  Write-Host "Reading EA specification workbook with Microsoft Excel..." -ForegroundColor Cyan

  $specWorkbook = $excel.Workbooks.Open(
    $specWorkbookPath,
    0,
    $true
  )

  $sheetCount = [int]$specWorkbook.Worksheets.Count
  $actualSpecSheets = @()

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

  for ($sheetIndex = 1; $sheetIndex -le $sheetCount; $sheetIndex++) {
    $sheet = $specWorkbook.Worksheets.Item($sheetIndex)

    try {
      $sheetName = ([string]$sheet.Name).Trim().ToLowerInvariant()
      $actualSpecSheets += $sheetName

      if (-not ($expectedSlugs -contains $sheetName)) {
        $errors.Add("规格参数表包含不应存在的 Sheet：$sheetName")
      }

      $usedRange = $sheet.UsedRange

      try {
        $rowCount = [int]$usedRange.Rows.Count
        $columnCount = [int]$usedRange.Columns.Count
      }
      finally {
        Release-ComObjectSafe $usedRange
      }

      $header1 = Get-ExcelCellText `
        -Worksheet $sheet `
        -Row 1 `
        -Column 1

      $header2 = Get-ExcelCellText `
        -Worksheet $sheet `
        -Row 1 `
        -Column 2

      if ($header1 -ne "参数名称" -or $header2 -ne "参数值") {
        $errors.Add(
          "规格 Sheet '$sheetName' 的表头必须是 '参数名称 / 参数值'。"
        )
      }

      if ($columnCount -gt 2) {
        for ($row = 1; $row -le $rowCount; $row++) {
          for ($column = 3; $column -le $columnCount; $column++) {
            $extraText = Get-ExcelCellText `
              -Worksheet $sheet `
              -Row $row `
              -Column $column

            if (-not [string]::IsNullOrWhiteSpace($extraText)) {
              $errors.Add(
                "规格 Sheet '$sheetName' 第 $row 行存在第三列及以后数据。"
              )
              break
            }
          }
        }
      }

      $parameterMap = [ordered]@{}
      $parameterRows = @()

      for ($row = 2; $row -le $rowCount; $row++) {
        $parameterName = Get-ExcelCellText `
          -Worksheet $sheet `
          -Row $row `
          -Column 1

        $parameterValue = Get-ExcelCellText `
          -Worksheet $sheet `
          -Row $row `
          -Column 2

        if (
          [string]::IsNullOrWhiteSpace($parameterName) -and
          [string]::IsNullOrWhiteSpace($parameterValue)
        ) {
          continue
        }

        if ([string]::IsNullOrWhiteSpace($parameterName)) {
          $errors.Add(
            "规格 Sheet '$sheetName' 第 $row 行参数名称为空。"
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
    finally {
      Release-ComObjectSafe $sheet
    }
  }

  foreach ($expectedSlug in $expectedSlugs) {
    if (-not ($actualSpecSheets -contains $expectedSlug)) {
      $errors.Add("规格参数表缺少 Sheet：$expectedSlug")
    }
  }

  if ($actualSpecSheets.Count -ne 14) {
    $errors.Add(
      "规格参数表应包含 14 个 Sheet，实际为 $($actualSpecSheets.Count)。"
    )
  }

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
}
finally {
  if ($null -ne $detailWorkbook) {
    try {
      $detailWorkbook.Close($false)
    }
    catch {
    }

    Release-ComObjectSafe $detailWorkbook
  }

  if ($null -ne $specWorkbook) {
    try {
      $specWorkbook.Close($false)
    }
    catch {
    }

    Release-ComObjectSafe $specWorkbook
  }

  if ($null -ne $excel) {
    try {
      $excel.Quit()
    }
    catch {
    }

    Release-ComObjectSafe $excel
  }

  [gc]::Collect()
  [gc]::WaitForPendingFinalizers()
}

$reportLines = New-Object System.Collections.Generic.List[string]
$reportLines.Add("============================================================")
$reportLines.Add("EA 产品详情数据校验报告")
$reportLines.Add("生成时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$reportLines.Add("============================================================")
$reportLines.Add("")
$reportLines.Add("详情页资料：$($detailRecords.Count) 条。")
$reportLines.Add("规格参数：$($specificationMap.Count) 个 Sheet。")
$reportLines.Add("主图目录：$imageRoot")
$reportLines.Add("统一附属图片：pump-ea-duanzi.webp、pump-ea-guangou.webp")
$reportLines.Add("")
$reportLines.Add("错误数量：$($errors.Count)")
$reportLines.Add("警告数量：$($warnings.Count)")
$reportLines.Add("")

if ($errors.Count -gt 0) {
  $reportLines.Add("【错误】")

  foreach ($errorItem in $errors) {
    $reportLines.Add("- $errorItem")
  }

  $reportLines.Add("")
}

if ($warnings.Count -gt 0) {
  $reportLines.Add("【警告】")

  foreach ($warningItem in $warnings) {
    $reportLines.Add("- $warningItem")
  }

  $reportLines.Add("")
}

if ($errors.Count -eq 0) {
  $reportLines.Add("校验结果：通过")
}
else {
  $reportLines.Add("校验结果：未通过，不生成网站数据。")
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines(
  $reportPath,
  $reportLines,
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
  }
}

$detailJson = $detailRecords | ConvertTo-Json -Depth 30

$detailTypeScript = @"
/* =========================================================
   AUTO-GENERATED FILE — DO NOT EDIT MANUALLY

   Source:
   data-source/product-center/pumps/plunger-pump/ea/
   01_EA常规柱塞泵_详情页资料_zh.xlsx

   Generated by:
   generate_ea_product_detail_data_v3_excel_com_utf8bom.ps1
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

$specJson = $specRecordsForJson | ConvertTo-Json -Depth 30

$specTypeScript = @"
/* =========================================================
   AUTO-GENERATED FILE — DO NOT EDIT MANUALLY

   Source:
   data-source/product-center/pumps/plunger-pump/ea/
   02_EA常规柱塞泵_规格参数_zh.xlsx

   Generated by:
   generate_ea_product_detail_data_v3_excel_com_utf8bom.ps1
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
Write-Host ""
Write-Host "ea-selection.xlsx was intentionally ignored in V3." -ForegroundColor Yellow

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
}

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "EA data files were generated, but npm run build failed."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
