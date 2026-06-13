param(
  [switch]$SkipConversion
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$sourceRoot = Join-Path $projectRoot "data-source\product-center\pumps\plunger-pump\ea"

$files = @(
  Join-Path $sourceRoot "01_EA常规柱塞泵_详情页资料_zh.xlsx"
  Join-Path $sourceRoot "02_EA常规柱塞泵_规格参数_zh.xlsx"
  Join-Path $sourceRoot "ea-selection.xlsx"
)

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportPath = Join-Path $sourceRoot "ea-xlsx-health-report.txt"

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-FirstBytes {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [int]$Count = 16
  )

  $stream = [System.IO.File]::Open(
    $Path,
    [System.IO.FileMode]::Open,
    [System.IO.FileAccess]::Read,
    [System.IO.FileShare]::ReadWrite
  )

  try {
    $buffer = New-Object byte[] $Count
    $read = $stream.Read($buffer, 0, $Count)

    if ($read -le 0) {
      return @()
    }

    return @($buffer[0..($read - 1)])
  }
  finally {
    $stream.Dispose()
  }
}

function Convert-BytesToHex {
  param(
    [byte[]]$Bytes
  )

  if ($null -eq $Bytes -or $Bytes.Count -eq 0) {
    return ""
  }

  return (($Bytes | ForEach-Object { $_.ToString("X2") }) -join " ")
}

function Test-ZipArchive {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $stream = $null
  $archive = $null

  try {
    $stream = [System.IO.File]::Open(
      $Path,
      [System.IO.FileMode]::Open,
      [System.IO.FileAccess]::Read,
      [System.IO.FileShare]::ReadWrite
    )

    $archive = New-Object System.IO.Compression.ZipArchive(
      $stream,
      [System.IO.Compression.ZipArchiveMode]::Read,
      $false
    )

    $entryCount = $archive.Entries.Count

    return [pscustomobject]@{
      IsValid = $true
      EntryCount = $entryCount
      Error = ""
    }
  }
  catch {
    return [pscustomobject]@{
      IsValid = $false
      EntryCount = 0
      Error = $_.Exception.Message
    }
  }
  finally {
    if ($null -ne $archive) {
      $archive.Dispose()
    }

    if ($null -ne $stream) {
      $stream.Dispose()
    }
  }
}

function Get-TextPrefix {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [int]$CharacterCount = 300
  )

  try {
    $stream = [System.IO.File]::Open(
      $Path,
      [System.IO.FileMode]::Open,
      [System.IO.FileAccess]::Read,
      [System.IO.FileShare]::ReadWrite
    )

    try {
      $reader = New-Object System.IO.StreamReader(
        $stream,
        [System.Text.Encoding]::UTF8,
        $true,
        1024,
        $true
      )

      try {
        $buffer = New-Object char[] $CharacterCount
        $read = $reader.Read($buffer, 0, $CharacterCount)

        if ($read -le 0) {
          return ""
        }

        return -join $buffer[0..($read - 1)]
      }
      finally {
        $reader.Dispose()
      }
    }
    finally {
      $stream.Dispose()
    }
  }
  catch {
    return ""
  }
}

function Get-FileDiagnosis {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return [pscustomobject]@{
      Path = $Path
      Exists = $false
      Length = 0
      Hex = ""
      Kind = "Missing"
      IsValidXlsx = $false
      ZipError = "File not found"
    }
  }

  $item = Get-Item -LiteralPath $Path
  $bytes = @(Get-FirstBytes -Path $Path -Count 16)
  $hex = Convert-BytesToHex -Bytes $bytes
  $textPrefix = Get-TextPrefix -Path $Path
  $zipResult = Test-ZipArchive -Path $Path

  $kind = "Unknown"

  if ($zipResult.IsValid) {
    $kind = "Valid ZIP/XLSX"
  }
  elseif ($textPrefix -match "^version https://git-lfs\.github\.com/spec/v1") {
    $kind = "Git LFS pointer"
  }
  elseif ($textPrefix -match "(?is)^\s*<!DOCTYPE html|^\s*<html") {
    $kind = "HTML document"
  }
  elseif (
    $bytes.Count -ge 8 -and
    $bytes[0] -eq 0xD0 -and
    $bytes[1] -eq 0xCF -and
    $bytes[2] -eq 0x11 -and
    $bytes[3] -eq 0xE0 -and
    $bytes[4] -eq 0xA1 -and
    $bytes[5] -eq 0xB1 -and
    $bytes[6] -eq 0x1A -and
    $bytes[7] -eq 0xE1
  ) {
    $kind = "Legacy Excel/OLE file"
  }
  elseif ($item.Length -eq 0) {
    $kind = "Empty file"
  }
  elseif ($item.Length -lt 1024) {
    $kind = "Suspiciously small file"
  }
  elseif (
    $bytes.Count -ge 4 -and
    $bytes[0] -eq 0x50 -and
    $bytes[1] -eq 0x4B
  ) {
    $kind = "Broken or incomplete ZIP"
  }

  return [pscustomobject]@{
    Path = $Path
    Exists = $true
    Length = $item.Length
    Hex = $hex
    Kind = $kind
    IsValidXlsx = [bool]$zipResult.IsValid
    ZipError = [string]$zipResult.Error
  }
}

function Repair-WithExcel {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $excel = $null
  $workbook = $null
  $temporaryPath = Join-Path (
    Split-Path -Parent $Path
  ) (
    ([System.IO.Path]::GetFileNameWithoutExtension($Path)) +
    ".repaired-$timestamp.xlsx"
  )

  try {
    try {
      $excel = New-Object -ComObject Excel.Application
    }
    catch {
      return [pscustomobject]@{
        Success = $false
        Message = "Microsoft Excel COM is not available: $($_.Exception.Message)"
        RepairedPath = ""
      }
    }

    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $excel.AskToUpdateLinks = $false

    try {
      # CorruptLoad 1 = xlRepairFile
      $workbook = $excel.Workbooks.Open(
        $Path,
        0,
        $false,
        5,
        "",
        "",
        $true,
        2,
        "",
        $false,
        $false,
        0,
        $true,
        1,
        0
      )
    }
    catch {
      return [pscustomobject]@{
        Success = $false
        Message = "Excel could not open/repair the file: $($_.Exception.Message)"
        RepairedPath = ""
      }
    }

    try {
      # 51 = xlOpenXMLWorkbook (.xlsx)
      $workbook.SaveAs($temporaryPath, 51)
      $workbook.Close($false)
      $workbook = $null
    }
    catch {
      return [pscustomobject]@{
        Success = $false
        Message = "Excel opened the file but could not save a repaired copy: $($_.Exception.Message)"
        RepairedPath = ""
      }
    }

    $test = Test-ZipArchive -Path $temporaryPath

    if (-not $test.IsValid) {
      return [pscustomobject]@{
        Success = $false
        Message = "Excel created a file, but it is still not a valid XLSX: $($test.Error)"
        RepairedPath = $temporaryPath
      }
    }

    $backupPath = "$Path.invalid-$timestamp.bak"
    Move-Item -LiteralPath $Path -Destination $backupPath -Force
    Move-Item -LiteralPath $temporaryPath -Destination $Path -Force

    return [pscustomobject]@{
      Success = $true
      Message = "Repaired successfully. Original backup: $backupPath"
      RepairedPath = $Path
    }
  }
  finally {
    if ($null -ne $workbook) {
      try {
        $workbook.Close($false)
      }
      catch {
      }
    }

    if ($null -ne $excel) {
      try {
        $excel.Quit()
      }
      catch {
      }

      try {
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel)
      }
      catch {
      }
    }

    [gc]::Collect()
    [gc]::WaitForPendingFinalizers()
  }
}

$report = New-Object System.Collections.Generic.List[string]
$report.Add("============================================================")
$report.Add("EA XLSX health check")
$report.Add("Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$report.Add("============================================================")
$report.Add("")

$allValid = $true

foreach ($filePath in $files) {
  Write-Host ""
  Write-Host "Checking: $filePath" -ForegroundColor Cyan

  $diagnosis = Get-FileDiagnosis -Path $filePath

  $report.Add("File: $filePath")
  $report.Add("Exists: $($diagnosis.Exists)")
  $report.Add("Length: $($diagnosis.Length)")
  $report.Add("Header: $($diagnosis.Hex)")
  $report.Add("Kind: $($diagnosis.Kind)")
  $report.Add("ZIP error: $($diagnosis.ZipError)")

  if ($diagnosis.IsValidXlsx) {
    Write-Host "Valid XLSX: $($diagnosis.Length) bytes" -ForegroundColor Green
    $report.Add("Result: valid")
    $report.Add("")
    continue
  }

  $allValid = $false

  Write-Host "Invalid XLSX: $($diagnosis.Kind)" -ForegroundColor Red
  Write-Host "Header: $($diagnosis.Hex)" -ForegroundColor Yellow
  Write-Host "Size: $($diagnosis.Length) bytes" -ForegroundColor Yellow
  Write-Host "ZIP error: $($diagnosis.ZipError)" -ForegroundColor Yellow

  if ($diagnosis.Kind -eq "Git LFS pointer") {
    Write-Host "This is a Git LFS pointer, not the real Excel file." -ForegroundColor Red
    Write-Host "Run: git lfs pull" -ForegroundColor Cyan
    $report.Add("Result: Git LFS pointer; run git lfs pull.")
    $report.Add("")
    continue
  }

  if ($diagnosis.Kind -eq "HTML document") {
    Write-Host "This is an HTML page saved with an .xlsx extension." -ForegroundColor Red
    Write-Host "Download the Excel file again and replace it." -ForegroundColor Cyan
    $report.Add("Result: HTML file; re-download required.")
    $report.Add("")
    continue
  }

  if (
    $diagnosis.Kind -eq "Empty file" -or
    $diagnosis.Kind -eq "Suspiciously small file"
  ) {
    Write-Host "The file is empty or incomplete. Download it again." -ForegroundColor Red
    $report.Add("Result: empty/incomplete; re-download required.")
    $report.Add("")
    continue
  }

  Write-Host "Trying Microsoft Excel automatic repair..." -ForegroundColor Cyan
  $repairResult = Repair-WithExcel -Path $filePath

  if ($repairResult.Success) {
    Write-Host $repairResult.Message -ForegroundColor Green
    $report.Add("Repair: success")
    $report.Add($repairResult.Message)
  }
  else {
    Write-Host $repairResult.Message -ForegroundColor Red
    $report.Add("Repair: failed")
    $report.Add($repairResult.Message)
  }

  $report.Add("")
}

# Re-check after any repairs.
$allValid = $true

foreach ($filePath in $files) {
  $diagnosis = Get-FileDiagnosis -Path $filePath

  if (-not $diagnosis.IsValidXlsx) {
    $allValid = $false
  }
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($reportPath, $report, $encoding)

Write-Host ""
Write-Host "Health report:" -ForegroundColor Cyan
Write-Host $reportPath

if (-not $allValid) {
  Write-Host ""
  Write-Host "At least one workbook is still invalid." -ForegroundColor Red
  Write-Host "Open ea-xlsx-health-report.txt and replace/re-download the invalid file." -ForegroundColor Yellow
  throw "EA workbook health check failed. Conversion was not started."
}

Write-Host ""
Write-Host "All three workbooks are valid XLSX files." -ForegroundColor Green

if ($SkipConversion) {
  Write-Host "Conversion was skipped." -ForegroundColor Yellow
  exit 0
}

$converterPath = Join-Path $projectRoot "generate_ea_product_detail_data_from_excel_v2_utf8bom.ps1"

if (-not (Test-Path -LiteralPath $converterPath)) {
  throw "Conversion script not found: $converterPath"
}

Write-Host ""
Write-Host "Starting EA Excel conversion..." -ForegroundColor Cyan

& powershell `
  -ExecutionPolicy Bypass `
  -File $converterPath

if ($LASTEXITCODE -ne 0) {
  throw "Workbook health check passed, but EA conversion failed."
}

Write-Host ""
Write-Host "EA workbook repair/check and conversion completed." -ForegroundColor Green
