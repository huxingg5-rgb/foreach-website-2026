$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$converterPath = Join-Path $root "scripts\resources\convert-fitting-compatible-models.ts"

if (-not (Test-Path $converterPath)) {
    throw "未找到转换脚本：$converterPath"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "$converterPath.bak_fix_fraction_$stamp"
Copy-Item $converterPath $backupPath -Force

$content = Get-Content $converterPath -Raw -Encoding utf8

$startMarker = "function splitCompatibleModels(rawValue: string): string[] {"
$endMarker = "function findHeaderIndex(headers: Cell[], name: string): number {"

$start = $content.IndexOf($startMarker)
$end = $content.IndexOf($endMarker)

if ($start -lt 0 -or $end -lt 0 -or $end -le $start) {
    throw "未找到 splitCompatibleModels 函数，未执行修改。"
}

$newFunction = @'
function splitSlashOutsideFractions(value: string): string[] {
  const parts: string[] = [];
  let startIndex = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== "/") continue;

    const previous = value[index - 1] ?? "";
    const next = value[index + 1] ?? "";

    /*
      1/4、3/8 等数字分数属于型号的一部分，不能拆开。
      P-213x/P-232x 这类斜杠两侧不是纯数字，应拆成两个可搜索型号。
    */
    if (/\d/.test(previous) && /\d/.test(next)) {
      continue;
    }

    parts.push(value.slice(startIndex, index));
    startIndex = index + 1;
  }

  parts.push(value.slice(startIndex));

  return parts.map((item) => item.trim()).filter(Boolean);
}

function splitCompatibleModels(rawValue: string): string[] {
  if (isEmptyCompatibleValue(rawValue)) return [];

  const firstPass = rawValue
    .replace(/\r/g, "\n")
    .split(/[\n,，;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const expanded = firstPass.flatMap((item) => {
    return splitSlashOutsideFractions(item);
  });

  const unique = new Map<string, string>();

  for (const item of expanded) {
    if (isEmptyCompatibleValue(item)) continue;

    const normalized = normalizeModel(item);

    if (!normalized) continue;
    if (!unique.has(normalized)) unique.set(normalized, item);
  }

  return [...unique.values()];
}

'@

$updated =
    $content.Substring(0, $start) +
    $newFunction +
    $content.Substring($end)

Set-Content -Path $converterPath -Value $updated -Encoding utf8

Write-Host ""
Write-Host "已修复型号中数字分数被错误拆分的问题。" -ForegroundColor Green
Write-Host "备份文件：" -ForegroundColor DarkGray
Write-Host $backupPath
Write-Host ""
Write-Host "重新生成兼容型号数据……" -ForegroundColor Cyan

npx tsx scripts/resources/convert-fitting-compatible-models.ts

Write-Host ""
Write-Host "正确统计预计为：" -ForegroundColor Yellow
Write-Host "FOREACH 产品：241（242 条原始记录中有 1 条完全重复）"
Write-Host "不重复兼容型号：约 414"
Write-Host "型号对应关系：约 423"
Write-Host "一对多兼容型号：3"
Write-Host ""
Write-Host "本步骤仍未修改页面、样式或加入清单逻辑。" -ForegroundColor Green
