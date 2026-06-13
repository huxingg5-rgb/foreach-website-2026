param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

function Resolve-ImportedCssModule {
  param(
    [Parameter(Mandatory = $true)]
    [string]$ComponentPath,

    [Parameter(Mandatory = $true)]
    [string]$ComponentContent
  )

  $match = [Regex]::Match(
    $ComponentContent,
    'import\s+styles\s+from\s+["''](?<path>[^"'']+\.module\.css)["'']'
  )

  if (-not $match.Success) {
    throw "Could not find the CSS module import in: $ComponentPath"
  }

  $relativeImport = $match.Groups["path"].Value
  $componentDirectory = Split-Path -Parent $ComponentPath

  $resolvedPath = [System.IO.Path]::GetFullPath(
    (Join-Path $componentDirectory $relativeImport)
  )

  if (-not (Test-Path -LiteralPath $resolvedPath)) {
    throw "Imported CSS module was not found: $resolvedPath"
  }

  return $resolvedPath
}

function Get-CssClassBody {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Css,

    [Parameter(Mandatory = $true)]
    [string]$ClassName
  )

  $pattern =
    '(?s)(?:^|\r?\n)\s*\.' +
    [Regex]::Escape($ClassName) +
    '\s*\{(?<body>.*?)\}'

  $match = [Regex]::Match($Css, $pattern)

  if ($match.Success) {
    return $match.Groups["body"].Value
  }

  return ""
}

function Remove-MarkedBlock {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text,

    [Parameter(Mandatory = $true)]
    [string]$StartMarker,

    [Parameter(Mandatory = $true)]
    [string]$EndMarker
  )

  $pattern =
    [Regex]::Escape($StartMarker) +
    '(?s).*?' +
    [Regex]::Escape($EndMarker)

  return [Regex]::Replace($Text, $pattern, "")
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

try {
  # =======================================================
  # 1. Find the shared page shell that contains SiteBreadcrumb
  # =======================================================

  $shellCandidates = Get-ChildItem `
    -LiteralPath $projectRoot `
    -Recurse `
    -File `
    -Include "SitePageShell.tsx", "SitePageShell.jsx" |
    Where-Object {
      $_.FullName -notmatch '\\node_modules\\|\\\.next\\|\\\.git\\'
    }

  if ($shellCandidates.Count -eq 0) {
    throw "Could not find SitePageShell.tsx or SitePageShell.jsx."
  }

  $shellPath = $null
  $shellContent = $null

  foreach ($candidate in $shellCandidates) {
    $content = Get-Content -LiteralPath $candidate.FullName -Raw -Encoding UTF8

    if ($content -match '<SiteBreadcrumb\b') {
      $shellPath = $candidate.FullName
      $shellContent = $content
      break
    }
  }

  if (-not $shellPath) {
    throw "SitePageShell was found, but none of the files contains <SiteBreadcrumb>."
  }

  $cssPath = Resolve-ImportedCssModule `
    -ComponentPath $shellPath `
    -ComponentContent $shellContent

  $css = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  Write-Host ""
  Write-Host "Found shared breadcrumb shell:" -ForegroundColor Cyan
  Write-Host "  Component: $shellPath"
  Write-Host "  CSS module: $cssPath"

  # =======================================================
  # 2. Find the actual ancestor class immediately above
  #    <SiteBreadcrumb>, instead of guessing a class name.
  # =======================================================

  $breadcrumbIndex = $shellContent.IndexOf("<SiteBreadcrumb")

  if ($breadcrumbIndex -lt 0) {
    throw "Could not locate <SiteBreadcrumb> in the shared shell."
  }

  $prefixStart = [Math]::Max(0, $breadcrumbIndex - 2500)
  $prefixLength = $breadcrumbIndex - $prefixStart
  $prefix = $shellContent.Substring($prefixStart, $prefixLength)

  $classMatches = [Regex]::Matches(
    $prefix,
    '<(?:div|section|main|nav|header|aside)\b[^>]*className=\{styles\.(?<class>[A-Za-z0-9_]+)\}[^>]*>'
  )

  if ($classMatches.Count -eq 0) {
    throw "Could not detect a styles.* ancestor before <SiteBreadcrumb>."
  }

  $ancestorClasses = New-Object System.Collections.Generic.List[string]

  for ($i = $classMatches.Count - 1; $i -ge 0; $i--) {
    $className = $classMatches[$i].Groups["class"].Value

    if (-not $ancestorClasses.Contains($className)) {
      $ancestorClasses.Add($className)
    }

    if ($ancestorClasses.Count -ge 5) {
      break
    }
  }

  Write-Host ""
  Write-Host "Nearest breadcrumb ancestor classes:" -ForegroundColor Cyan

  foreach ($className in $ancestorClasses) {
    $body = Get-CssClassBody -Css $css -ClassName $className
    $summary = ($body -replace '\s+', ' ').Trim()

    if ($summary.Length -gt 180) {
      $summary = $summary.Substring(0, 180) + "..."
    }

    Write-Host "  .$className"
    if ($summary) {
      Write-Host "    $summary"
    }
  }

  # Prefer the nearest ancestor that actually controls top spacing.
  $targetClass = $null

  foreach ($className in $ancestorClasses) {
    $body = Get-CssClassBody -Css $css -ClassName $className

    if (
      $body -match '(?i)\bpadding-top\s*:' -or
      $body -match '(?i)\bmargin-top\s*:' -or
      $body -match '(?i)\bpadding\s*:'
    ) {
      $targetClass = $className
      break
    }
  }

  if (-not $targetClass) {
    $targetClass = $ancestorClasses[0]
  }

  Write-Host ""
  Write-Host "Actual mobile spacing controller selected: .$targetClass" -ForegroundColor Green

  # =======================================================
  # 3. Add a mobile-only override to the exact detected class
  # =======================================================

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $backupPath = "$cssPath.$timestamp.bak"

  Copy-Item -LiteralPath $cssPath -Destination $backupPath -Force
  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

  $startMarker = "/* MOBILE_BREADCRUMB_TOP_GAP_V12_START */"
  $endMarker = "/* MOBILE_BREADCRUMB_TOP_GAP_V12_END */"

  $css = Remove-MarkedBlock `
    -Text $css `
    -StartMarker $startMarker `
    -EndMarker $endMarker

  $block = @"

/* MOBILE_BREADCRUMB_TOP_GAP_V12_START */
/* 手机端：去掉 Top 栏与公共面包屑之间的额外空白 */
@media (max-width: 680px) {
  .$targetClass {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
/* MOBILE_BREADCRUMB_TOP_GAP_V12_END */
"@

  $css =
    $css.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $cssPath -Content $css

  Write-Host "Mobile top spacing removed from .$targetClass." -ForegroundColor Green

  # =======================================================
  # 4. Clear Next cache and build
  # =======================================================

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
      throw "Build failed."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Completed:" -ForegroundColor Green
  Write-Host " - The script found the real shared breadcrumb ancestor"
  Write-Host " - Only the mobile top gap was removed"
  Write-Host " - Desktop spacing was not changed"
  Write-Host " - Product center and product detail inherit the same correction"
}
catch {
  Write-Host ""
  Write-Host "Update failed: $($_.Exception.Message)" -ForegroundColor Red
  throw
}
