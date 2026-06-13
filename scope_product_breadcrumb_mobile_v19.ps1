param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$packagePath = Join-Path $projectRoot "package.json"
$shellCssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"
$productPagePath = Join-Path $projectRoot "app\products\page.tsx"
$detailPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"

foreach ($path in @(
  $packagePath,
  $shellCssPath,
  $productPagePath,
  $detailPath
)) {
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Required file not found: $path"
  }
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

function Resolve-ImportPath {
  param(
    [Parameter(Mandatory = $true)]
    [string]$FromFile,

    [Parameter(Mandatory = $true)]
    [string]$ImportPath
  )

  if ($ImportPath.StartsWith("@/")) {
    $basePath = Join-Path $projectRoot $ImportPath.Substring(2)
  }
  elseif ($ImportPath.StartsWith(".")) {
    $basePath = Join-Path (Split-Path -Parent $FromFile) $ImportPath
  }
  else {
    return $null
  }

  $basePath = [System.IO.Path]::GetFullPath($basePath)

  $candidates = @(
    $basePath,
    "$basePath.tsx",
    "$basePath.jsx",
    "$basePath.ts",
    "$basePath.js",
    (Join-Path $basePath "index.tsx"),
    (Join-Path $basePath "index.jsx"),
    (Join-Path $basePath "index.ts"),
    (Join-Path $basePath "index.js")
  )

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate -PathType Leaf) {
      return $candidate
    }
  }

  return $null
}

function Get-ReturnedRootComponent {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $patterns = @(
    '(?s)return\s*\(\s*<(?<name>[A-Z][A-Za-z0-9_]*)\b',
    '(?s)return\s+<(?<name>[A-Z][A-Za-z0-9_]*)\b',
    '(?s)=>\s*\(\s*<(?<name>[A-Z][A-Za-z0-9_]*)\b'
  )

  foreach ($pattern in $patterns) {
    $match = [Regex]::Match($Content, $pattern)

    if ($match.Success) {
      return $match.Groups["name"].Value
    }
  }

  return $null
}

function Has-ReturnedHtmlRoot {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  return [Regex]::IsMatch(
    $Content,
    '(?s)(return\s*\(\s*|return\s+|=>\s*\(\s*)<(main|section|div)\b'
  )
}

function Get-ImportedComponentPath {
  param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath,

    [Parameter(Mandatory = $true)]
    [string]$Content,

    [Parameter(Mandatory = $true)]
    [string]$ComponentName
  )

  $escapedName = [Regex]::Escape($ComponentName)

  $defaultImport = [Regex]::Match(
    $Content,
    '(?m)^\s*import\s+' +
    $escapedName +
    '\s+from\s+["''](?<path>[^"'']+)["''];?'
  )

  if ($defaultImport.Success) {
    return Resolve-ImportPath `
      -FromFile $FilePath `
      -ImportPath $defaultImport.Groups["path"].Value
  }

  $namedImports = [Regex]::Matches(
    $Content,
    '(?ms)^\s*import\s*\{(?<names>.*?)\}\s*from\s*["''](?<path>[^"'']+)["''];?'
  )

  foreach ($importMatch in $namedImports) {
    $names = $importMatch.Groups["names"].Value

    if (
      $names -match (
        '(^|,)\s*' +
        $escapedName +
        '\s*(,|$)'
      ) -or
      $names -match (
        '(^|,)\s*[A-Za-z0-9_]+\s+as\s+' +
        $escapedName +
        '\s*(,|$)'
      )
    ) {
      return Resolve-ImportPath `
        -FromFile $FilePath `
        -ImportPath $importMatch.Groups["path"].Value
    }
  }

  return $null
}

function Find-RenderableProductCenterComponent {
  param(
    [Parameter(Mandatory = $true)]
    [string]$StartPath,

    [int]$Depth = 0,

    [string[]]$Visited = @()
  )

  if ($Depth -gt 12) {
    throw "Component resolution exceeded 12 levels."
  }

  $fullPath = [System.IO.Path]::GetFullPath($StartPath)

  if ($Visited -contains $fullPath) {
    throw "Circular component import detected at: $fullPath"
  }

  $content = Get-Content -LiteralPath $fullPath -Raw -Encoding UTF8

  if (
    $content -match 'data-product-center-page="true"' -or
    (Has-ReturnedHtmlRoot -Content $content)
  ) {
    return [PSCustomObject]@{
      Path = $fullPath
      Content = $content
    }
  }

  $componentName = Get-ReturnedRootComponent -Content $content

  if (-not $componentName) {
    throw "Could not find the rendered root component in: $fullPath"
  }

  $nextPath = Get-ImportedComponentPath `
    -FilePath $fullPath `
    -Content $content `
    -ComponentName $componentName

  if (-not $nextPath) {
    throw "Could not resolve import for component '$componentName' in: $fullPath"
  }

  Write-Host "Following component: $componentName" -ForegroundColor DarkCyan
  Write-Host "  -> $nextPath" -ForegroundColor DarkCyan

  return Find-RenderableProductCenterComponent `
    -StartPath $nextPath `
    -Depth ($Depth + 1) `
    -Visited ($Visited + $fullPath)
}

function Add-AttributeToReturnedHtmlRoot {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Content,

    [Parameter(Mandatory = $true)]
    [string]$Attribute
  )

  if ($Content -match [Regex]::Escape($Attribute)) {
    return $Content
  }

  $pattern =
    '(?s)(?<prefix>return\s*\(\s*|return\s+|=>\s*\(\s*)' +
    '(?<open><(?<tag>main|section|div)\b(?<attrs>[^>]*)>)'

  $match = [Regex]::Match($Content, $pattern)

  if (-not $match.Success) {
    throw "Could not find a returned <main>, <section>, or <div> root."
  }

  $newOpen =
    '<' +
    $match.Groups["tag"].Value +
    $match.Groups["attrs"].Value +
    ' ' +
    $Attribute +
    '>'

  $replacement =
    $match.Groups["prefix"].Value +
    $newOpen

  return (
    $Content.Substring(0, $match.Index) +
    $replacement +
    $Content.Substring($match.Index + $match.Length)
  )
}

$backupMap = @{}

try {
  Write-Host ""
  Write-Host "Resolving the real product-center render component..." -ForegroundColor Cyan

  $productCenterTarget = Find-RenderableProductCenterComponent `
    -StartPath $productPagePath

  $productCenterPath = $productCenterTarget.Path
  $productCenterContent = $productCenterTarget.Content

  Write-Host ""
  Write-Host "Real product-center component found:" -ForegroundColor Green
  Write-Host "  $productCenterPath"

  if ($productCenterContent -notmatch 'data-product-center-page="true"') {
    $productCenterContent = Add-AttributeToReturnedHtmlRoot `
      -Content $productCenterContent `
      -Attribute 'data-product-center-page="true"'
  }

  $detailContent = Get-Content -LiteralPath $detailPath -Raw -Encoding UTF8

  if ($detailContent -notmatch 'data-product-detail-page="true"') {
    $detailContent = Add-AttributeToReturnedHtmlRoot `
      -Content $detailContent `
      -Attribute 'data-product-detail-page="true"'
  }

  $shellCss = Get-Content -LiteralPath $shellCssPath -Raw -Encoding UTF8

  foreach ($markers in @(
    @(
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_START */",
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V15_END */"
    ),
    @(
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V16_START */",
      "/* MOBILE_SHELL_BREADCRUMB_TOP_V16_END */"
    ),
    @(
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V17_START */",
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V17_END */"
    ),
    @(
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V18_START */",
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V18_END */"
    ),
    @(
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V19_START */",
      "/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V19_END */"
    )
  )) {
    $shellCss = Remove-MarkedBlock `
      -Text $shellCss `
      -StartMarker $markers[0] `
      -EndMarker $markers[1]
  }

  $cssBlock = @'

/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V19_START */
/* 产品中心与产品详情页：仅在手机端取消 Top 栏下的额外空白 */
@media (max-width: 900px) {
  :global(body:has([data-product-center-page="true"])) .shellBreadcrumb,
  :global(body:has([data-product-detail-page="true"])) .shellBreadcrumb {
    padding-top: 0 !important;
    margin-top: -14px !important;
  }
}
/* PRODUCT_PAGE_BREADCRUMB_SCOPE_V19_END */
'@

  $shellCss =
    $shellCss.TrimEnd() +
    "`r`n`r`n" +
    $cssBlock.Trim() +
    "`r`n"

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

  $pathsToWrite = @(
    $productCenterPath,
    $detailPath,
    $shellCssPath
  ) | Select-Object -Unique

  foreach ($path in $pathsToWrite) {
    $backupPath = "$path.$timestamp.bak"
    Copy-Item -LiteralPath $path -Destination $backupPath -Force
    $backupMap[$path] = $backupPath
    Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
  }

  Write-Utf8NoBom `
    -Path $productCenterPath `
    -Content $productCenterContent

  Write-Utf8NoBom `
    -Path $detailPath `
    -Content $detailContent

  Write-Utf8NoBom `
    -Path $shellCssPath `
    -Content $shellCss

  Write-Host ""
  Write-Host "Scoped breadcrumb rules were applied successfully." -ForegroundColor Green

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
  Write-Host " - app/products/page.tsx is no longer treated as the visual component"
  Write-Host " - The script followed its imported render component"
  Write-Host " - Product center and product detail are scoped independently"
  Write-Host " - Other SitePageShell pages are unchanged"
}
catch {
  Write-Host ""
  Write-Host "Update failed: $($_.Exception.Message)" -ForegroundColor Red

  foreach ($path in $backupMap.Keys) {
    if (Test-Path -LiteralPath $backupMap[$path]) {
      Copy-Item `
        -LiteralPath $backupMap[$path] `
        -Destination $path `
        -Force
    }
  }

  if ($backupMap.Count -gt 0) {
    Write-Host "Changed files were restored from backup." -ForegroundColor Yellow
  }

  throw
}
