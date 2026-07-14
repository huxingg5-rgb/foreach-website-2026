$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"

$componentPath = Join-Path $root "components\resources\fitting-replacement\FittingReplacementHome.tsx"
$cssPath = Join-Path $root "app\resources\selection-support\fitting-replacement\fitting-replacement.css"
$dataPath = Join-Path $root "data\resources\fitting-replacement\all-compatible-products.generated.ts"
$builderPath = Join-Path $root "scripts\resources\build-compatible-model-page-data.ts"

foreach ($file in @($componentPath, $cssPath, $dataPath)) {
    if (-not (Test-Path $file)) {
        throw "未找到文件：$file"
    }

    Copy-Item $file "$file.bak_card_media_$stamp" -Force
}

if (Test-Path $builderPath) {
    Copy-Item $builderPath "$builderPath.bak_card_media_$stamp" -Force
}

# ============================================================
# 1. 修复现有生成数据：Logo 不再作为产品图片
# ============================================================

$data = Get-Content $dataPath -Raw -Encoding utf8

$data = $data.Replace(
    '"/images/logo/foreach-logo-color.svg"',
    '"/images/resources/selection-support/fitting-replacement/compatible-model-placeholder.svg"'
)

Set-Content -Path $dataPath -Value $data -Encoding utf8

# ============================================================
# 2. 修复生成脚本：以后重新生成也不会把 Logo 当产品图
# ============================================================

if (Test-Path $builderPath) {
    $builder = Get-Content $builderPath -Raw -Encoding utf8

    $oldFunction = @'
function chooseImagePath(candidates: Candidate[]): string {
  return (
    candidates
      .map((item) => item.imagePath)
      .find((imagePath) => imagePath.startsWith("/")) ??
    PLACEHOLDER_IMAGE
  );
}
'@

    $newFunction = @'
function isUsableProductImage(imagePath: string): boolean {
  if (!imagePath.startsWith("/")) return false;

  return (
    !imagePath.includes("/images/logo/") &&
    !imagePath.endsWith("foreach-logo-color.svg")
  );
}

function chooseImagePath(candidates: Candidate[]): string {
  return (
    candidates
      .map((item) => item.imagePath)
      .find(isUsableProductImage) ??
    PLACEHOLDER_IMAGE
  );
}
'@

    if ($builder.Contains($oldFunction)) {
        $builder = $builder.Replace($oldFunction, $newFunction)
        Set-Content -Path $builderPath -Value $builder -Encoding utf8
    }
    else {
        Write-Host "提示：生成脚本中的 chooseImagePath 结构与预期不同，未自动修改生成脚本。" -ForegroundColor Yellow
        Write-Host "当前生成数据已经修复，不影响页面预览。" -ForegroundColor Yellow
    }
}

# ============================================================
# 3. 给兼容型号页面卡片增加专用 class
#    不修改公共 ProductBasicCard 的默认样式
# ============================================================

$component = Get-Content $componentPath -Raw -Encoding utf8

if ($component -notmatch 'className="frp-compatible-card"') {
    $anchor = @'
                        key={`${product.productCode}-${product.foreachModel}`}
                        imageSrc={product.imagePath}
'@

    $replacement = @'
                        key={`${product.productCode}-${product.foreachModel}`}
                        className="frp-compatible-card"
                        imageClassName="frp-compatible-card-image"
                        visualClassName="frp-compatible-card-visual"
                        bodyClassName="frp-compatible-card-body"
                        imageSrc={product.imagePath}
'@

    if (-not $component.Contains($anchor)) {
        throw "未找到 ProductBasicCard 插入位置，未修改组件。"
    }

    $component = $component.Replace($anchor, $replacement)
    Set-Content -Path $componentPath -Value $component -Encoding utf8
}

# ============================================================
# 4. 写入一份可重复执行的页面专用标准样式
#    先删除旧的同名区块，避免不断叠加补丁
# ============================================================

$css = Get-Content $cssPath -Raw -Encoding utf8

$startMarker = "/* COMPATIBLE_MODEL_CARD_MEDIA_START */"
$endMarker = "/* COMPATIBLE_MODEL_CARD_MEDIA_END */"

$startIndex = $css.IndexOf($startMarker)
$endIndex = $css.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $endIndex += $endMarker.Length
    $css = $css.Remove($startIndex, $endIndex - $startIndex).TrimEnd()
}

$styleBlock = @'

/* COMPATIBLE_MODEL_CARD_MEDIA_START */
/*
  兼容型号查询卡片专用样式：
  1. 不影响其他 ProductBasicCard 使用场景
  2. 图片完整显示，不裁切、不放大
  3. Logo 或缺图产品使用统一占位图
  4. 保持四列网格和原有按钮样式
*/

.fitting-replacement-page .frp-compatible-card {
  width: 100% !important;
  min-width: 0;
  min-height: 0;
}

.fitting-replacement-page .frp-compatible-card-image {
  width: 100%;
  height: auto !important;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  padding: 24px;
  overflow: hidden;
  background: #f4f7fa;
}

.fitting-replacement-page .frp-compatible-card-visual {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: none !important;
}

.fitting-replacement-page .frp-compatible-card-visual img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
}

.fitting-replacement-page
  .frp-compatible-card:hover
  .frp-compatible-card-visual {
  transform: none !important;
}

.fitting-replacement-page .frp-compatible-card-body {
  min-height: 190px;
  padding: 18px 20px 20px;
}

@media (max-width: 1080px) {
  .fitting-replacement-page .frp-compatible-card-image {
    padding: 22px;
  }
}

@media (max-width: 720px) {
  .fitting-replacement-page .frp-compatible-card-image {
    max-height: 320px;
    padding: 18px;
  }

  .fitting-replacement-page .frp-compatible-card-body {
    min-height: 0;
  }
}
/* COMPATIBLE_MODEL_CARD_MEDIA_END */
'@

$css = $css.TrimEnd() + "`r`n" + $styleBlock + "`r`n"
Set-Content -Path $cssPath -Value $css -Encoding utf8

Write-Host ""
Write-Host "兼容型号卡片图片区已调整：" -ForegroundColor Green
Write-Host "1. 不再显示巨大 FOREACH Logo"
Write-Host "2. 图片区域统一为 1:1"
Write-Host "3. 产品图完整显示，不裁切、不放大"
Write-Host "4. 取消卡片图片 hover 放大"
Write-Host "5. 只影响兼容型号查询页面"
Write-Host ""

Write-Host "开始构建检查……" -ForegroundColor Cyan
npm run build

Write-Host ""
Write-Host "构建完成后请刷新页面查看。" -ForegroundColor Green
