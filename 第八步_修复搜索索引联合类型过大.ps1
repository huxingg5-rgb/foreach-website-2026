$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$generatorPath = Join-Path $root "scripts\search\generate-site-search-index.ts"
$generatedPath = Join-Path $root "data\search\site-search-index.generated.ts"
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

if (-not (Test-Path $generatorPath)) {
    throw "未找到搜索索引生成脚本：$generatorPath"
}

Copy-Item $generatorPath "$generatorPath.bak_fix_complex_union_$stamp" -Force

if (Test-Path $generatedPath) {
    Copy-Item $generatedPath "$generatedPath.bak_fix_complex_union_$stamp" -Force
}

$content = Get-Content -LiteralPath $generatorPath -Raw -Encoding utf8

$startMarker = "function buildOutput(items: SiteSearchItem[]): string {"
$endMarker = "async function main() {"

$startIndex = $content.IndexOf($startMarker)
$endIndex = $content.IndexOf($endMarker)

if ($startIndex -lt 0 -or $endIndex -le $startIndex) {
    throw "未找到 buildOutput 函数，未执行修改。"
}

$newBuildOutput = @'
function buildOutput(items: SiteSearchItem[]): string {
  /*
    不直接输出超大的数组字面量。
    否则 TypeScript 会尝试推导数千条记录形成的联合类型，
    并报：union type is too complex to represent。
  */
  const serializedItems = JSON.stringify(items);
  const serializedLiteral = JSON.stringify(serializedItems);

  return `/* =========================================================
   site-search-index.generated.ts
   恒永达官网｜全站搜索静态索引

   自动生成，请勿手动修改。
   使用 JSON.parse 避免超大数组触发 TypeScript 联合类型推导。
========================================================= */

import type { SiteSearchItem } from "./site-search.types";

const siteSearchIndexJson = ${serializedLiteral};

export const siteSearchIndex =
  JSON.parse(siteSearchIndexJson) as SiteSearchItem[];
`;
}

'@

$updatedContent =
    $content.Substring(0, $startIndex) +
    $newBuildOutput +
    $content.Substring($endIndex)

Set-Content -LiteralPath $generatorPath -Value $updatedContent -Encoding utf8

Write-Host ""
Write-Host "已修复搜索索引的超大联合类型问题。" -ForegroundColor Green
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
Write-Host "搜索索引修复完成，构建已通过。" -ForegroundColor Green
Write-Host "可测试：" -ForegroundColor Yellow
Write-Host "http://localhost:3000/search?q=Q2002"
Write-Host "http://localhost:3000/search?q=PMC1702"
Write-Host "http://localhost:3000/search?q=柱塞泵"
Write-Host "============================================" -ForegroundColor Cyan
