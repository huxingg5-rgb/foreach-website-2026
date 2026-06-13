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

try {
  # =======================================================
  # 1. Only search real source folders and exact file names.
  #    This avoids V12 accidentally reading its own .ps1 file.
  # =======================================================

  $candidatePaths = @(
    (Join-Path $projectRoot "components\layout\SitePageShell.tsx"),
    (Join-Path $projectRoot "components\layout\SitePageShell.jsx"),
    (Join-Path $projectRoot "components\common\SitePageShell.tsx"),
    (Join-Path $projectRoot "components\common\SitePageShell.jsx")
  )

  $sourceRoots = @(
    (Join-Path $projectRoot "components"),
    (Join-Path $projectRoot "app")
  )

  $extraCandidates = @()

  foreach ($sourceRoot in $sourceRoots) {
    if (Test-Path -LiteralPath $sourceRoot) {
      $extraCandidates += Get-ChildItem `
        -LiteralPath $sourceRoot `
        -Recurse `
        -File |
        Where-Object {
          $_.Name -in @("SitePageShell.tsx", "SitePageShell.jsx")
        } |
        Select-Object -ExpandProperty FullName
    }
  }

  $candidatePaths += $extraCandidates
  $candidatePaths = $candidatePaths | Where-Object {
    Test-Path -LiteralPath $_
  } | Select-Object -Unique

  if (-not $candidatePaths -or $candidatePaths.Count -eq 0) {
    throw "Could not find SitePageShell.tsx in components or app."
  }

  $shellPath = $null
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
  Write-Host "Found the real shared page shell:" -ForegroundColor Cyan
  Write-Host "  $shellPath"

  # =======================================================
  # 2. Find the actual open ancestor around SiteBreadcrumb
  #    with a small JSX tag stack.
  # =======================================================

  $breadcrumbIndex = $shellContent.IndexOf("<SiteBreadcrumb")

  if ($breadcrumbIndex -lt 0) {
    throw "Could not locate <SiteBreadcrumb>."
  }

  $prefix = $shellContent.Substring(0, $breadcrumbIndex)

  $tagPattern = '<(?<close>/)?(?<tag>[A-Za-z][A-Za-z0-9._-]*)\b(?<attrs>[^>]*)>'
  $matches = [Regex]::Matches($prefix, $tagPattern)

  $stack = New-Object System.Collections.ArrayList

  foreach ($match in $matches) {
    $tagName = $match.Groups["tag"].Value
    $attrs = $match.Groups["attrs"].Value
    $isClosing = $match.Groups["close"].Success
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
        Start = $match.Index
        Length = $match.Length
        Raw = $match.Value
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
      $entry.ClassName
    ) {
      $target = $entry
      break
    }
  }

  if (-not $target) {
    throw "Could not find the real styles.* wrapper around SiteBreadcrumb."
  }

  Write-Host ""
  Write-Host "Detected breadcrumb wrapper:" -ForegroundColor Green
  Write-Host "  Tag: <$($target.Tag)>"
  Write-Host "  Class: styles.$($target.ClassName)"

  # =======================================================
  # 3. Add a stable data attribute to that exact wrapper.
  #    No CSS-module import parsing is needed.
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
  # 4. Remove only the mobile top gap.
  #    Product center and product detail share this wrapper.
  # =======================================================

  $globals = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

  $startMarker = "/* MOBILE_BREADCRUMB_TOP_GAP_V13_START */"
  $endMarker = "/* MOBILE_BREADCRUMB_TOP_GAP_V13_END */"

  $globals = Remove-MarkedBlock `
    -Text $globals `
    -StartMarker $startMarker `
    -EndMarker $endMarker

  $block = @'

/* MOBILE_BREADCRUMB_TOP_GAP_V13_START */
/* 手机端：Top 栏下方直接连接面包屑，不保留额外顶部空白 */
@media (max-width: 680px) {
  [data-mobile-breadcrumb-wrap="true"] {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
/* MOBILE_BREADCRUMB_TOP_GAP_V13_END */
'@

  $globals =
    $globals.TrimEnd() +
    "`r`n`r`n" +
    $block.Trim() +
    "`r`n"

  Write-Utf8NoBom -Path $globalsPath -Content $globals

  Write-Host ""
  Write-Host "Applied the mobile breadcrumb top-gap correction." -ForegroundColor Green

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
  Write-Host " - V12 self-file detection bug is avoided"
  Write-Host " - The real breadcrumb wrapper was detected"
  Write-Host " - Mobile top padding and margin were removed"
  Write-Host " - Product center and product detail both inherit the change"
  Write-Host " - Desktop layout remains unchanged"
}
catch {
  Write-Host ""
  Write-Host "Update failed: $($_.Exception.Message)" -ForegroundColor Red
  throw
}
