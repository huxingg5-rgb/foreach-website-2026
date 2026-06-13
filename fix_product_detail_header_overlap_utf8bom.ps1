param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"

if (-not (Test-Path -LiteralPath $cssPath)) {
  throw "未找到文件：$cssPath"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "$cssPath.$timestamp.bak"
Copy-Item -LiteralPath $cssPath -Destination $backupPath -Force

Write-Host "已备份原文件：$backupPath" -ForegroundColor Yellow

$content = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$desktopPattern = '(?s)(\.page\s*\{.*?min-height:\s*100vh;\s*)padding:\s*42px\s+0\s+80px;'
$desktopReplacement = '${1}padding: 138px 0 80px;'

if ($content -notmatch $desktopPattern) {
  throw "未找到桌面端 .page 顶部间距代码，未执行修改。"
}

$content = [System.Text.RegularExpressions.Regex]::Replace(
  $content,
  $desktopPattern,
  $desktopReplacement,
  1
)

$mobilePattern = '(?s)(@media\s*\(max-width:\s*760px\)\s*\{.*?\.page\s*\{\s*)padding:\s*26px\s+0\s+60px;'
$mobileReplacement = '${1}padding: 104px 0 60px;'

if ($content -match $mobilePattern) {
  $content = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $mobilePattern,
    $mobileReplacement,
    1
  )
}
else {
  Write-Host "未找到移动端原始间距，已跳过移动端替换。" -ForegroundColor Yellow
}

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($cssPath, $content, $encoding)

Write-Host "已修复详情页顶部遮挡。" -ForegroundColor Green
Write-Host "桌面端顶部间距：138px"
Write-Host "移动端顶部间距：104px"

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "开始运行 npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "样式已修改，但 npm run build 未通过，请把完整报错发给我。"
  }

  Write-Host ""
  Write-Host "构建通过。" -ForegroundColor Green
}
else {
  Write-Host "已跳过构建检查。" -ForegroundColor Yellow
}
