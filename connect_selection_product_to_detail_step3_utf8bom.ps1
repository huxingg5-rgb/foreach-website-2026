param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

function Backup-File {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "File not found: $Path"
  }

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $backupPath = "$Path.$timestamp.bak"
  Copy-Item -LiteralPath $Path -Destination $backupPath -Force
  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
}

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
  Write-Host "Updated: $Path" -ForegroundColor Green
}

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$selectionClientPath = Join-Path $projectRoot "components\products\selection\ProductSelectionClient.tsx"
$detailDataPath = Join-Path $projectRoot "data\products\detail\product-detail.zh.ts"
$specsPath = Join-Path $projectRoot "data\products\detail\product-specs.zh.generated.ts"
$servicePath = Join-Path $projectRoot "services\products\detail\getProductDetailPageData.ts"

Backup-File -Path $selectionClientPath
Backup-File -Path $detailDataPath
Backup-File -Path $specsPath
Backup-File -Path $servicePath

# =========================================================
# 1. 修改选型页详情链接
#    从：
#    /products/{category}/{productType}/{detailSlug}
#
#    改为：
#    /products/{category}/{detailSlug}
# =========================================================

$selectionClientContent = Get-Content -LiteralPath $selectionClientPath -Raw -Encoding UTF8

$oldHrefFunction = @'
function makeDetailHref(product: ProductSelectionProduct) {
  return `/products/${product.categoryId}/${product.productTypeId}/${product.detailSlug}`;
}
'@

$newHrefFunction = @'
function makeDetailHref(product: ProductSelectionProduct) {
  return `/products/${product.categoryId}/${product.detailSlug}`;
}
'@

if (-not $selectionClientContent.Contains($oldHrefFunction)) {
  throw "The expected makeDetailHref function was not found. No files were changed."
}

$selectionClientContent = $selectionClientContent.Replace(
  $oldHrefFunction,
  $newHrefFunction
)

Write-Utf8NoBomFile -Path $selectionClientPath -Content $selectionClientContent

# =========================================================
# 2. 详情页测试数据 slug 与选型表统一
# =========================================================

$detailDataContent = @'
/* =========================================================
   product-detail.zh.ts
   恒永达官网｜中文产品详情页测试数据

   说明：
   1. 页面 slug 与产品选型数据中的 detailSlug 保持一致
   2. 主图继续由选型页面基础数据提供
   3. 本文件不重复维护主图
========================================================= */

import type { ProductDetailZhRecord } from "./product-detail.types";

export const productDetailZhData: ProductDetailZhRecord[] = [
  {
    category: "pumps",
    slug: "ea-100ul-pmma",

    model: "EA-100-PMMA",
    name: "常规柱塞泵",

    advantages: [
      "适合对安装空间、控制联动和系统稳定性要求更高的自动化液路系统，可用于复杂设备中的定量输送模块。",
    ],

    commonApplications: [
      "IVD 诊断设备",
      "生命科学仪器",
      "实验室自动化",
      "分析仪器",
    ],

    /*
     * 这里只维护详情页附属图片。
     * 没有附属图片时保持空数组。
     */
    additionalImages: [],

    showConfigurator: true,
    showDatasheetRequest: true,
    showDrawingRequest: true,
    show3DRequest: true,

    /*
     * 第一版只预留 FAQ，不在页面显示。
     */
    faqKey: "ea-conventional-plunger-pump",

    specSeriesKey: "ea-conventional-plunger-pump",
  },
];
'@

Write-Utf8NoBomFile -Path $detailDataPath -Content $detailDataContent

# =========================================================
# 3. 规格测试数据 key 与选型 detailSlug 统一
# =========================================================

$specsContent = Get-Content -LiteralPath $specsPath -Raw -Encoding UTF8

if (-not $specsContent.Contains('"ea-100-pmma"')) {
  throw 'The expected specs key "ea-100-pmma" was not found.'
}

$specsContent = $specsContent.Replace(
  '"ea-100-pmma"',
  '"ea-100ul-pmma"'
)

Write-Utf8NoBomFile -Path $specsPath -Content $specsContent

# =========================================================
# 4. 详情页服务层读取选型页面主图
# =========================================================

$serviceContent = @'
/* =========================================================
   getProductDetailPageData.ts
   恒永达官网｜中文产品详情页数据服务层

   数据来源：
   1. 产品详情页资料：product-detail.zh.ts
   2. 产品主图：产品选型生成数据中的 imageCard
   3. 产品规格：product-specs.zh.generated.ts

   重要：
   详情页资料表不重复维护产品主图。
========================================================= */

import { productDetailZhData } from "@/data/products/detail/product-detail.zh";
import { productSpecsZhGenerated } from "@/data/products/detail/product-specs.zh.generated";
import { selectionProducts } from "@/data/products/selection/product-selection.generated";

import type {
  ProductDetailCategory,
  ProductDetailPageData,
} from "@/data/products/detail/product-detail.types";

export function getProductDetailPageData({
  category,
  slug,
}: {
  category: string;
  slug: string;
}): ProductDetailPageData | null {
  const detailRecord = productDetailZhData.find(
    (item) => item.category === category && item.slug === slug,
  );

  if (!detailRecord) {
    return null;
  }

  /*
   * 根据相同的 categoryId + detailSlug
   * 从产品选型数据中查找当前详情页对应的产品。
   */
  const selectionProduct = selectionProducts.find(
    (item) =>
      item.categoryId === category &&
      item.detailSlug === slug &&
      item.status === "active",
  );

  return {
    ...detailRecord,

    /*
     * 主图只读取选型页面数据，不在详情页资料中重复维护。
     */
    mainImage: selectionProduct?.imageCard || null,

    specs: productSpecsZhGenerated[slug] ?? [],
  };
}

export function getAllProductDetailRouteParams(): Array<{
  category: ProductDetailCategory;
  slug: string;
}> {
  return productDetailZhData.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}
'@

Write-Utf8NoBomFile -Path $servicePath -Content $serviceContent

Write-Host ""
Write-Host "Selection page and product detail page are now connected." -ForegroundColor Cyan
Write-Host "New detail URL:"
Write-Host "http://localhost:3000/products/pumps/ea-100ul-pmma"
Write-Host ""

if (-not $SkipBuild) {
  Write-Host "Running npm run build..." -ForegroundColor Cyan
  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "Files were updated, but npm run build failed. Send the full error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
