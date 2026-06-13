param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $directory = Split-Path -Parent $Path

  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
  }

  if (Test-Path -LiteralPath $Path) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupPath = "$Path.$timestamp.bak"
    Copy-Item -LiteralPath $Path -Destination $backupPath -Force
    Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Created: $Path" -ForegroundColor Green
}

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "app"))) {
  throw "The app directory was not found."
}

Write-Host ""
Write-Host "Creating product detail route files..." -ForegroundColor Cyan
Write-Host "Project root: $projectRoot"
Write-Host ""

$typesPath = Join-Path $projectRoot "data\products\detail\product-detail.types.ts"
$dataPath = Join-Path $projectRoot "data\products\detail\product-detail.zh.ts"
$servicePath = Join-Path $projectRoot "services\products\detail\getProductDetailPageData.ts"
$pagePath = Join-Path $projectRoot "app\products\[category]\[slug]\page.tsx"
$cssPath = Join-Path $projectRoot "app\products\[category]\[slug]\product-detail-route.module.css"

$typesContent = @'
/* =========================================================
   product-detail.types.ts
   恒永达官网｜中文产品详情页数据类型

   适用范围：
   1. 泵
   2. 阀
   3. 针
   4. 智控

   当前第一版：
   1. 只做中文
   2. FAQ 只预留，不显示
   3. 按钮只保留业务端口
========================================================= */

export type ProductDetailCategory =
  | "pumps"
  | "valves"
  | "needles"
  | "controllers";

export type ProductSpecItem = {
  label: string;
  value: string;
};

export type ProductDetailZhRecord = {
  category: ProductDetailCategory;
  slug: string;
  model: string;
  name: string;
  advantages: string[];
  commonApplications: string[];

  /**
   * 详情页附属图片。
   * 主图不在这里维护，后续从选型页面基础数据读取。
   * 没有附属图时使用空数组。
   */
  additionalImages: string[];

  showConfigurator: boolean;
  showDatasheetRequest: boolean;
  showDrawingRequest: boolean;
  show3DRequest: boolean;

  /**
   * FAQ 第一版只预留，不渲染。
   */
  faqKey?: string;

  /**
   * 用于关联对应产品系列的规格参数数据。
   */
  specSeriesKey: string;
};

export type ProductDetailPageData = ProductDetailZhRecord & {
  /**
   * 后续从选型页面基础数据读取。
   */
  mainImage: string | null;

  /**
   * 后续由产品系列规格 Excel 生成。
   */
  specs: ProductSpecItem[];
};
'@

$dataContent = @'
/* =========================================================
   product-detail.zh.ts
   恒永达官网｜中文产品详情页测试数据

   当前只建立 EA-100-PMMA 测试详情页。
========================================================= */

import type { ProductDetailZhRecord } from "./product-detail.types";

export const productDetailZhData: ProductDetailZhRecord[] = [
  {
    category: "pumps",
    slug: "ea-100-pmma",

    model: "EA-100-PMMA",
    name: "常规柱塞泵",

    advantages: [
      "适合自动化液路系统中的精密定量输送。",
      "兼顾安装空间、控制联动与系统运行稳定性。",
      "适合整合到复杂设备的液体输送模块中。",
    ],

    commonApplications: [
      "IVD 诊断设备",
      "生命科学仪器",
      "实验室自动化",
      "分析仪器",
    ],

    /**
     * 主图后续从选型页面基础数据读取。
     * 此处仅保存详情页附属图；当前先留空。
     */
    additionalImages: [],

    showConfigurator: true,
    showDatasheetRequest: true,
    showDrawingRequest: true,
    show3DRequest: true,

    /**
     * 第一版不显示 FAQ，只预留关联键。
     */
    faqKey: "ea-conventional-plunger-pump",

    specSeriesKey: "ea-conventional-plunger-pump",
  },
];
'@

$serviceContent = @'
/* =========================================================
   getProductDetailPageData.ts
   恒永达官网｜中文产品详情页数据服务层

   当前阶段：
   1. 根据 category + slug 查找详情资料
   2. 主图暂时返回 null
   3. 规格暂时返回空数组
   4. 后续在这里合并选型页面数据和规格数据
========================================================= */

import { productDetailZhData } from "@/data/products/detail/product-detail.zh";

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
  const product = productDetailZhData.find(
    (item) => item.category === category && item.slug === slug,
  );

  if (!product) {
    return null;
  }

  return {
    ...product,
    mainImage: null,
    specs: [],
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

$pageContent = @'
/* =========================================================
   page.tsx
   恒永达官网｜中文产品独立详情页动态路由

   页面示例：
   /products/pumps/ea-100-pmma

   当前步骤：
   1. 验证独立详情页路由
   2. 验证 category + slug 数据匹配
   3. 暂时使用路由测试骨架
========================================================= */

import { notFound } from "next/navigation";

import {
  getAllProductDetailRouteParams,
  getProductDetailPageData,
} from "@/services/products/detail/getProductDetailPageData";

import styles from "./product-detail-route.module.css";

type ProductDetailRoutePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProductDetailRouteParams();
}

export default async function ProductDetailRoutePage({
  params,
}: ProductDetailRoutePageProps) {
  const { category, slug } = await params;

  const pageData = getProductDetailPageData({
    category,
    slug,
  });

  if (!pageData) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.status}>独立产品详情页路由已建立</div>

        <section className={styles.header}>
          <div>
            <p className={styles.path}>
              /products/{pageData.category}/{pageData.slug}
            </p>

            <h1>{pageData.model}</h1>
            <p className={styles.name}>{pageData.name}</p>
          </div>

          <div className={styles.category}>
            产品分类：{pageData.category}
          </div>
        </section>

        <section className={styles.grid}>
          <article className={styles.block}>
            <h2>产品优势</h2>

            <ul>
              {pageData.advantages.map((advantage) => (
                <li key={advantage}>{advantage}</li>
              ))}
            </ul>
          </article>

          <article className={styles.block}>
            <h2>常见应用</h2>

            <ul>
              {pageData.commonApplications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.next}>
          <h2>下一步接入内容</h2>
          <p>
            下一步建立正式详情页组件，并接入选型页面主图、附属图片、
            规格参数、资料申请按钮和主图悬停放大。
          </p>
        </section>
      </div>
    </main>
  );
}
'@

$cssContent = @'
/* =========================================================
   product-detail-route.module.css
   恒永达官网｜中文产品详情页路由测试样式

   当前只用于验证独立动态详情页。
   正式详情页组件完成后再替换。
========================================================= */

.page {
  min-height: 100vh;
  padding: 56px 0 88px;
  background: #ffffff;
  color: #111111;
}

.container {
  width: min(calc(100% - 96px), 1180px);
  margin: 0 auto;
}

.status {
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  padding: 0 14px;
  border: 1px solid #173368;
  color: #173368;
  font-size: 14px;
  line-height: 1;
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-top: 34px;
  padding-bottom: 28px;
  border-bottom: 1px solid #d8dee8;
}

.path {
  margin: 0 0 12px;
  color: #6d7888;
  font-size: 14px;
  line-height: 1.5;
}

.header h1 {
  margin: 0;
  color: #173368;
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.name {
  margin: 12px 0 0;
  color: #111111;
  font-size: 24px;
  line-height: 1.4;
  font-weight: 500;
}

.category {
  flex: 0 0 auto;
  color: #536274;
  font-size: 15px;
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  margin-top: 42px;
}

.block {
  padding: 30px;
  border: 1px solid #d8dee8;
  background: #ffffff;
}

.block h2,
.next h2 {
  margin: 0;
  color: #173368;
  font-size: 21px;
  line-height: 1.4;
  font-weight: 700;
}

.block ul {
  margin: 20px 0 0;
  padding-left: 20px;
}

.block li {
  margin-top: 10px;
  color: #263241;
  font-size: 16px;
  line-height: 1.7;
}

.block li:first-child {
  margin-top: 0;
}

.next {
  margin-top: 32px;
  padding: 30px;
  background: #f4f7fb;
}

.next p {
  max-width: 760px;
  margin: 14px 0 0;
  color: #536274;
  font-size: 16px;
  line-height: 1.75;
}

@media (max-width: 760px) {
  .page {
    padding: 32px 0 60px;
  }

  .container {
    width: min(calc(100% - 28px), 1180px);
  }

  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .block,
  .next {
    padding: 22px 20px;
  }
}
'@

Write-Utf8NoBomFile -Path $typesPath -Content $typesContent
Write-Utf8NoBomFile -Path $dataPath -Content $dataContent
Write-Utf8NoBomFile -Path $servicePath -Content $serviceContent
Write-Utf8NoBomFile -Path $pagePath -Content $pageContent
Write-Utf8NoBomFile -Path $cssPath -Content $cssContent

Write-Host ""
Write-Host "Step 1 files were created successfully." -ForegroundColor Cyan
Write-Host "Test URL: http://localhost:3000/products/pumps/ea-100-pmma"
Write-Host ""

if (-not $SkipBuild) {
  Write-Host "Running npm run build..." -ForegroundColor Cyan
  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "Files were created, but npm run build failed. Send the full error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
