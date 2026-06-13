param()

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$scanRoots = @(
  (Join-Path $projectRoot "app"),
  (Join-Path $projectRoot "components")
)

$extensions = @("*.tsx", "*.ts", "*.jsx", "*.js", "*.css")
$patterns = @(
  "Breadcrumb",
  "breadcrumb",
  "面包屑"
)

Write-Host ""
Write-Host "Breadcrumb audit (read-only)" -ForegroundColor Cyan
Write-Host "Project: $projectRoot"
Write-Host ""

$sharedComponent = Join-Path $projectRoot "components\common\breadcrumb\Breadcrumb.tsx"
$sharedCss = Join-Path $projectRoot "components\common\breadcrumb\Breadcrumb.module.css"

Write-Host "Shared component status:" -ForegroundColor Yellow
Write-Host ("  Breadcrumb.tsx:       " + $(if (Test-Path -LiteralPath $sharedComponent) { "FOUND" } else { "NOT FOUND" }))
Write-Host ("  Breadcrumb.module.css:" + $(if (Test-Path -LiteralPath $sharedCss) { " FOUND" } else { " NOT FOUND" }))
Write-Host ""

$allFiles = @()

foreach ($root in $scanRoots) {
  if (-not (Test-Path -LiteralPath $root)) {
    continue
  }

  foreach ($extension in $extensions) {
    $allFiles += Get-ChildItem `
      -LiteralPath $root `
      -Recurse `
      -File `
      -Filter $extension `
      -ErrorAction SilentlyContinue |
      Where-Object {
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\\.next\\' -and
        $_.Name -notmatch '\.bak$'
      }
  }
}

$allFiles = $allFiles | Sort-Object FullName -Unique

$results = @()

foreach ($file in $allFiles) {
  $lines = Get-Content -LiteralPath $file.FullName -Encoding UTF8

  for ($index = 0; $index -lt $lines.Count; $index++) {
    $line = $lines[$index]

    $matched = $false

    foreach ($pattern in $patterns) {
      if ($line -match [Regex]::Escape($pattern)) {
        $matched = $true
        break
      }
    }

    if ($matched) {
      $results += [PSCustomObject]@{
        File = $file.FullName.Substring($projectRoot.Length + 1)
        Line = $index + 1
        Text = $line.Trim()
      }
    }
  }
}

if ($results.Count -eq 0) {
  Write-Host "No breadcrumb references were found." -ForegroundColor Yellow
}
else {
  Write-Host "Found breadcrumb references:" -ForegroundColor Green
  Write-Host ""

  foreach ($group in ($results | Group-Object File)) {
    Write-Host $group.Name -ForegroundColor Cyan

    foreach ($item in $group.Group) {
      Write-Host ("  L{0}: {1}" -f $item.Line, $item.Text)
    }

    Write-Host ""
  }
}

Write-Host "Summary:" -ForegroundColor Yellow
Write-Host ("  Files with matches: " + (($results | Select-Object -ExpandProperty File -Unique).Count))
Write-Host ("  Total matching lines: " + $results.Count)
Write-Host ""
Write-Host "This script did not modify any files." -ForegroundColor Green
