param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$globalsPath = Join-Path $projectRoot "app\globals.css"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from F:\WebsiteProjects\foreach-website-2026."
}

if (-not (Test-Path -LiteralPath $globalsPath)) {
  throw "Required file not found: $globalsPath"
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

$shellPath = $null
$shellBackup = $null
$globalsBackup = $null

try {
  # =======================================================
  # 1. Search only real source files.
  #    @() forces the result to remain an array even when
  #    only one SitePageShell file is found.
  # =======================================================

  $knownCandidates = @(
    (Join-Path $projectRoot "components\layout\SitePageShell.tsx"),
    (Join-Path $projectRoot "components\layout\SitePageShell.jsx"),
    (Join-Path $projectRoot "components\common\SitePageShell.tsx"),
    (Join-Path $projectRoot "components\common\SitePageShell.jsx")
  )

  $extraCandidates = @()

  foreach ($sourceRoot in @(
    (Join-Path $projectRoot "components"),
    (Join-Path $projectRoot "app")
  )) {
    if (Test-Path -LiteralPath $sourceRoot) {
      $found = @(
        Get-ChildItem `
          -LiteralPath $sourceRoot `
          -Recurse `
          -File |
        Where-Object {
          $_.Name -in @("SitePageShell.tsx", "SitePageShell.jsx")
        } |
        Select-Object -ExpandProperty FullName
      )

      $extraCandidates += $found
    }
  }

  $candidatePaths = @(
    ($knownCandidates + $extraCandidates) |
    Where-Object {
      Test-Path -LiteralPath $_
    } |
    Select-Object -Unique
  )

  if ($candidatePaths.Count -eq 0) {
    throw "Could not find SitePageShell.tsx in components or app."
  }

  $shellContent = $null

  foreach ($candidatePath in $candidatePaths) {
    $content = Get-Content -LiteralPath $candidatePath -Raw -Encoding UTF8

    if ($content -match '<SiteBreadcrumb\b') {
      $shellPath = $candidatePath
      $shellContent = $content
      break
    }
  }

  if (-not $shellPath) {
    throw "SitePageShell files were found, but none contains <SiteBreadcrumb>."
  }

  Write-Host ""
  Write-Host "Found shared page shell:" -ForegroundColor Cyan
  Write-Host "  $shellPath"

  # =======================================================
  # 2. Find the nearest open JSX wrapper around SiteBreadcrumb
  # =======================================================

  $breadcrumbIndex = $shellContent.IndexOf("<SiteBreadcrumb")

  if ($breadcrumbIndex -lt 0) {
    throw "Could not locate <SiteBreadcrumb>."
  }

  $prefix = $shellContent.Substring(0, $breadcrumbIndex)
  $tagPattern = '<(?<close>/)?(?<tag>[A-Za-z][A-Za-z0-9._-]*)\b(?<attrs>[^>]*)>'
  $tagMatches = [Regex]::Matches($prefix, $tagPattern)

  $stack = New-Object System.Collections.ArrayList

  foreach ($tagMatch in $tagMatches) {
    $tagName = $tagMatch.Groups["tag"].Value
    $attrs = $tagMatch.Groups["attrs"].Value
    $isClosing = $tagMatch.Groups["close"].Success
    $isSelfClosing = $attrs.TrimEnd().EndsWith("/")

    if ($isClosing) {
      for ($i = $stack.Count - 1; $i -ge 0; $i--) {
        if ($stack[$i].Tag -eq $tagName) {
          while ($stack.Count -gt $i) {
            $stack.RemoveAt($stack.Count - 1)
          }
          break
        }
      }

      continue
    }

    if (-not $isSelfClosing) {
      $classMatch = [Regex]::Match(
        $attrs,
        'className\s*=\s*\{styles\.(?<class>[A-Za-z0-9_]+)\}'
      )

      $entry = [PSCustomObject]@{
        Tag = $tagName
        Start = $tagMatch.Index
        Length = $tagMatch.Length
        Raw = $tagMatch.Value
        ClassName = if ($classMatch.Success) {
          $classMatch.Groups["class"].Value
        }
        else {
          ""
        }
      }

      [void]$stack.Add($entry)
    }
  }

  $target = $null

  for ($i = $stack.Count - 1; $i -ge 0; $i--) {
    $entry = $stack[$i]

    if (
      $entry.Tag -in @("div", "section", "main", "nav", "header") -and
      -not [string]::IsNullOrWhiteSpace($entry.ClassName)
    ) {
      $target = $entry
      break
    }
  }

  if (-not $target) {
    throw "Could not find the styles.* wrapper around SiteBreadcrumb."
  }

  Write-Host ""
  Write-Host "Detected breadcrumb wrapper:" -ForegroundColor Green
  Write-Host "  Tag: <$($target.Tag)>"
  Write-Host "  Class: styles.$($target.ClassName)"

  # =======================================================
  # 3. Add a stable attribute to the exact wrapper
  # =======================================================

  if ($target.Raw -notmatch 'data-mobile-breadcrumb-wrap=') {
    $insertAt = $target.Start + $target.Length - 1

    $shellContent =
      $shellContent.Substring(0, $insertAt) +
      ' data-mobile-breadcrumb-wrap="true"' +
      $shellContent.Substring($insertAt)
  }

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $shellBackup = "$shellPath.$timestamp.bak"
  $globalsBackup = "$globalsPath.$timestamp.bak"

  Copy-Item -LiteralPath $shellPath -Destination $shellBackup -Force
  Copy-Item -LiteralPath $globalsPath -Destination $globalsBackup -Force

  Write-Host ""
  Write-Host "Backup created: $shellBackup" -ForegroundColor Yellow
  Write-Host "Backup created: $globalsBackup" -ForegroundColor Yellow

  Write-Utf8NoBom -Path $shellPath -Content $shellContent

  # =======================================================
  # 4. Apply the shared mobile-only spacing correction
  # =======================================================

  $globals = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

  foreach ($markers in @(
    @(
      "/* MOBILE_BREADCRUMB_TOP_GAP_V12_START */",
      "/* MOBILE_BREADCRUMB_TOP_GAP_V12_END */"
    ),
    @(
      "/* MOBILE_BREADCRUMB_TOP_GAP_V13_START */",
      "/* MOBILE_BREADCRUMB_TOP_GAP_V13_END */"
    ),
    @(
      "/* MOBILE_BREADCRUMB_TOP_GAP_V14_START */",
      "/* MOBILE_BREADCRUMB_TOP_GAP_V14_END */"
    )
  )) {
    $globals = Remove-MarkedBlock `
      -Text $globals `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $block = @'

/* MOBILE_BREADCRUMB_TOP_GAP_V14_START */
/* 手机端：去掉 Top 栏和公共面包屑之间的额外空白 */
@media (max-width: 680px) {
  [data-mobile-breadcrumb-wrap="true"] {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
/* MOBILE_BREADCRUMB_TOP_GAP_V14_END */
'@

  $globals =
    $globals.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $globalsPath -Content $globals

  Write-Host ""
  Write-Host "Applied the mobile breadcrumb correction." -ForegroundColor Green

  # =======================================================
  # 5. Clear cache and build
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
  Write-Host " - Fixed the PowerShell single-item Count error"
  Write-Host " - Product center and product detail share the correction"
  Write-Host " - Only mobile top spacing was changed"
  Write-Host " - Desktop layout remains unchanged"
}
catch {
  Write-Host ""
  Write-Host "Update failed: $($_.Exception.Message)" -ForegroundColor Red

  if (
    $shellPath -and
    $shellBackup -and
    (Test-Path -LiteralPath $shellBackup)
  ) {
    Copy-Item `
      -LiteralPath $shellBackup `
      -Destination $shellPath `
      -Force
  }

  if (
    $globalsBackup -and
    (Test-Path -LiteralPath $globalsBackup)
  ) {
    Copy-Item `
      -LiteralPath $globalsBackup `
      -Destination $globalsPath `
      -Force
  }

  if ($shellBackup -or $globalsBackup) {
    Write-Host "Changed files were restored from backup." -ForegroundColor Yellow
  }

  throw
}
