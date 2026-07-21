$ErrorActionPreference = "Stop"

$repo = "F:\WebsiteProjects\foreach-website-2026"
$file = Join-Path $repo "components\products\detail\ProductDetailClient.tsx"

if (-not (Test-Path $file)) {
    throw "未找到文件：$file"
}

$content = Get-Content -LiteralPath $file -Raw -Encoding UTF8
$backup = "$file.bak-no-drawing-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item -LiteralPath $file -Destination $backup -Force

# 1. 禁止在没有实际 drawing2dUrl 时，根据 slug 猜测 PDF 地址。
$oldFunction = @'
function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }

  const normalizedSlug = slug.trim().toLowerCase();
  const match = normalizedSlug.match(/^(ea|sm|tm)-(\d+)/);

  if (!match) {
    return "";
  }

  const seriesCode = match[1];
  const seriesUpper = seriesCode.toUpperCase();
  const capacityCode = String(Number(match[2])).padStart(4, "0") + "UL";

  return (
    "/assets/products/" +
    seriesCode +
    "/2d-drawings/" +
    seriesUpper +
    "-" +
    capacityCode +
    ".pdf#toolbar=0&navpanes=0&scrollbar=1"
  );
}
'@

$newFunction = @'
function getProductDrawingPreviewUrl(_slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (!normalizedConfiguredUrl) {
    return "";
  }

  return normalizedConfiguredUrl.includes("#")
    ? normalizedConfiguredUrl
    : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
}
'@

if (-not $content.Contains($oldFunction)) {
    throw "未找到 getProductDrawingPreviewUrl 原始代码，已停止修改。"
}
$content = $content.Replace($oldFunction, $newFunction)

# 2. 将无图纸时的纯文字改成提示文案 + 联系我们按钮。
$oldFallback = @'
              ) : (
                <div className={styles.panelBox}>
                  {copy.noDrawing}
                </div>
              )}
'@

$newFallback = @'
              ) : (
                <div
                  className={styles.panelBox}
                  style={{
                    minHeight: "360px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "40px 24px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ margin: 0, lineHeight: 1.8 }}>
                    {isEnglish
                      ? "The 2D drawing for this product has not been uploaded yet. Please contact us if you need the drawing or other technical documentation."
                      : "该产品的 2D 图纸暂未上传。如需图纸或其他技术资料，请联系我们获取。"}
                  </p>

                  <a
                    className={styles.button}
                    href={isEnglish ? "/en/contact" : "/contact"}
                  >
                    {isEnglish ? "Contact Us" : "联系我们"}
                  </a>
                </div>
              )}
'@

if (-not $content.Contains($oldFallback)) {
    throw "未找到无图纸提示区域，已停止修改。"
}
$content = $content.Replace($oldFallback, $newFallback)

Set-Content -LiteralPath $file -Value $content -Encoding UTF8

Write-Host ""
Write-Host "修改完成：" -ForegroundColor Green
Write-Host $file
Write-Host ""
Write-Host "备份文件：" -ForegroundColor Yellow
Write-Host $backup
Write-Host ""
Write-Host "正在执行构建检查..." -ForegroundColor Cyan

Set-Location $repo
npm run build
