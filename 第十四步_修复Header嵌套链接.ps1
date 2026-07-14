$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$headerPath = Join-Path $root "components\layout\SiteHeader.tsx"
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

if (-not (Test-Path -LiteralPath $headerPath)) {
    throw "未找到文件：$headerPath"
}

Copy-Item `
    -LiteralPath $headerPath `
    -Destination "$headerPath.bak_fix_nested_link_$stamp" `
    -Force

$content = Get-Content `
    -LiteralPath $headerPath `
    -Raw `
    -Encoding utf8

$pattern = '(?s)return\s+cardImageHref\s*\?\s*\(\s*<Link\b.*?style=\{\{\s*display:\s*"contents".*?</Link>\s*\)\s*:\s*\(\s*cardImageContent\s*\);'

$matches = [regex]::Matches($content, $pattern)

if ($matches.Count -eq 0) {
    throw "未找到嵌套 Link 代码块，未修改文件。"
}

$updated = [regex]::Replace(
    $content,
    $pattern,
    'return cardImageContent;',
    1
)

Set-Content `
    -LiteralPath $headerPath `
    -Value $updated `
    -Encoding utf8

Write-Host ""
Write-Host "已移除 Header Mega Menu 的外层重复 Link。" -ForegroundColor Green
Write-Host "保留内部正式产品链接，不影响点击跳转。" -ForegroundColor Cyan
Write-Host ""
Write-Host "开始构建检查……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "构建未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "构建通过。" -ForegroundColor Green
Write-Host "请重新启动开发服务并刷新页面：" -ForegroundColor Yellow
Write-Host "npm run dev"
Write-Host ""
Write-Host "浏览器控制台中的以下警告应消失：" -ForegroundColor Yellow
Write-Host "<a> cannot be a descendant of <a>"
Write-Host "============================================" -ForegroundColor Cyan
