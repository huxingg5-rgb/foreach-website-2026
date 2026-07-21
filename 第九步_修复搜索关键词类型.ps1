$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$generatorPath = Join-Path $root "scripts\search\generate-site-search-index.ts"
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

if (-not (Test-Path $generatorPath)) {
    throw "未找到文件：$generatorPath"
}

Copy-Item $generatorPath "$generatorPath.bak_fix_keyword_type_$stamp" -Force

$content = Get-Content -LiteralPath $generatorPath -Raw -Encoding utf8

if ($content -notmatch "function isNonEmptyString") {
    $anchor = @'
function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}
'@

    $replacement = @'
function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function isNonEmptyString(
  value: string | undefined | null
): value is string {
  return Boolean(value);
}
'@

    if (-not $content.Contains($anchor)) {
        throw "未找到 normalize 函数，未执行修改。"
    }

    $content = $content.Replace($anchor, $replacement)
}

$content = $content.Replace(
    ".filter(Boolean)",
    ".filter(isNonEmptyString)"
)

Set-Content -LiteralPath $generatorPath -Value $content -Encoding utf8

Write-Host ""
Write-Host "已修复 keywords 的 TypeScript 类型收窄。" -ForegroundColor Green
Write-Host "正在重新生成搜索索引……" -ForegroundColor Cyan

npx tsx scripts/search/generate-site-search-index.ts

if ($LASTEXITCODE -ne 0) {
    throw "搜索索引重新生成失败。"
}

Write-Host ""
Write-Host "正在重新构建网站……" -ForegroundColor Cyan

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "网站构建仍未通过，请把新的报错发给我。"
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "全站搜索构建已通过。" -ForegroundColor Green
Write-Host "可测试：" -ForegroundColor Yellow
Write-Host "http://localhost:3000/search?q=Q2002"
Write-Host "http://localhost:3000/search?q=PMC1702"
Write-Host "http://localhost:3000/search?q=柱塞泵"
Write-Host "============================================" -ForegroundColor Cyan
