# 柱塞泵选型页乱码检查报告

生成时间：2026-07-07 21:05:37

本次只检查，不修改文件。


## 1. 重点文件是否存在

存在：components\products\selection\ProductSelectionClient.tsx
存在：data\products\generated\pumps\pump-series.selection.generated.ts
存在：data\products\selection\product-route-map.ts
存在：data\products\selection\product-type-intro.ts
存在：data\products\selection\filter-rules\product-filter-rules.index.ts

## 2. 查找柱塞泵卡片数据来源

F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:7  import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:27  "ea-standard-piston-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:28  "ea-standard-plunger-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:30  "sm-micro-plunger-pumps": "sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:32  "sm-miniature-plunger-pumps": "sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:34  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:91  Object.values(plungerPumpDetailModule).forEach((value) => {
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:461  productType: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:462  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:545  { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:546  { label: model, href: "/products/pumps/plunger-pumps/" + slug },
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:612  export default async function PlungerPumpDetailPage({ params }: PageProps) {
F:\WebsiteProjects\foreach-website-2026\app\products\[category]\[slug]\page.tsx:11  示例：/products/pumps/plunger-pumps
F:\WebsiteProjects\foreach-website-2026\app\products\[category]\[slug]\page.tsx:15  /products/pumps/plunger-pumps/[slug]
F:\WebsiteProjects\foreach-website-2026\app\resources\installation-guide\[slug]\page.tsx:16  /resources/installation-guide/plunger-pump-install-guide
F:\WebsiteProjects\foreach-website-2026\app\[locale]\products\page.tsx:18  /products/pumps/plunger-pumps/[slug]
F:\WebsiteProjects\foreach-website-2026\app\[locale]\products\page.tsx:20  app/[locale]/products/pumps/plunger-pumps/[slug]/page.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:14  - 主型号 EA-100-PMMA
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:73  function isPlungerPumpDisplayModel(value: unknown): boolean {
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:146  return isPlungerPumpDisplayModel(displayModel);
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:157  function isPlungerPumpDetailData(data: any): boolean {
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:163  text.includes("plunger-pumps") ||
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:392  function getPlungerPumpBottomCta(data: any) {
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:428  if (isPlungerPumpDetailData(data)) {
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:483  function PlungerPumpBottomCta({ data }: { data: any }) {
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:484  const cta = getPlungerPumpBottomCta(data);
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:1239  <PlungerPumpBottomCta data={data} />
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx:4  import { getProductCardSpecs } from "@/data/products/selection/card-copy/plunger-pump-card-copy";
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:46  import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:483  function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:493  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:533  function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:988  const isPlungerPump =
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:990  ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:992  if (isPlungerPump) {
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:993  const slug = getPlungerPumpModelSlugForDetailHref(product);
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:996  ? `/products/pumps/plunger-pumps/${slug}`
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:997  : "/products/pumps/plunger-pumps";
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1205  product.cardSubtitle.zh,
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1206  product.cardSubtitle.en,
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1223  * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1438  * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1619  *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1621  *    /products/pumps/plunger-pumps/
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1818  getText(locale, product.cardSubtitle, "")
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:5  data-source/product-center/pumps/plunger-pump/ea/
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:37  "slug":  "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:38  "model":  "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:55  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:57  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:58  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:69  "slug":  "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:70  "model":  "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:87  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:89  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:90  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:119  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:121  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:122  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:151  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:153  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:154  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:183  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:185  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:186  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:215  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:217  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:218  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:247  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:249  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:250  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:279  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:281  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:282  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:311  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:313  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:314  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:343  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:345  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:346  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:375  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:377  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:378  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:407  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:409  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:410  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:439  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:441  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:442  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:471  "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:473  "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:474  "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:5  data-source/product-center/pumps/plunger-pump/ea/
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:330  "ea-100-peek":  [
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:333  "value":  "ea-100-peek"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:337  "value":  "EA-100-PEEK"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:408  "ea-100-pmma":  [
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:411  "value":  "ea-100-pmma"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:415  "value":  "EA-100-PMMA"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2  plunger-pump-detail.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:5  来源：data-source/product-center/pumps/plunger-pump/FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:15  import type { PlungerPumpDetail } from "./plunger-pump-detail.types";
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:17  export const plungerPumpDetails: PlungerPumpDetail[] = [
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:19  "model": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:20  "slug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:21  "title": "EA-100-PMMA 常规柱塞泵",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:24  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:144  "model": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:145  "slug": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:146  "title": "EA-100-PEEK 常规柱塞泵",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:149  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:274  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:399  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:524  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:649  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:774  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:899  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1024  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1149  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1274  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1399  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1524  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1649  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1774  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1895  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2016  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2137  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2258  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2379  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2500  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2621  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2742  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2863  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2984  "productTypeCode": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3101  export const plungerPumpDetailBySlug: Record<string, PlungerPumpDetail> = Object.fromEntries(
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3102  plungerPumpDetails.map((detail) => [detail.slug, detail]),
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3105  export function getPlungerPumpDetailBySlug(
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3107  ): PlungerPumpDetail | undefined {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3108  return plungerPumpDetailBySlug[slug];
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3111  export function getPlungerPumpDetailByModel(
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3113  ): PlungerPumpDetail | undefined {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3114  return plungerPumpDetails.find((detail) => detail.model === model);
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:2  plunger-pump-detail.types.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:5  本文件由 scripts/products/build-plunger-pump-detail-data.js 生成。
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:9  export type PlungerPumpSeriesCode = "EA" | "SM" | "TM";
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:11  export type PlungerPumpSpecification = {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:16  export type PlungerPumpFaq = {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:21  export type PlungerPumpResourceButtons = {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:32  export type PlungerPumpResources = {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:35  buttons: PlungerPumpResourceButtons;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:38  export type PlungerPumpDetail = {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:46  seriesCode: PlungerPumpSeriesCode;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:52  specifications: PlungerPumpSpecification[];
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:53  faqs: PlungerPumpFaq[];
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:54  resources: PlungerPumpResources;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail-faq.zh.ts:19  * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.zh.ts:18  model: "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.zh.ts:46  faqKey: "ea-conventional-plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.zh.ts:48  specSeriesKey: "ea-conventional-plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-specs.zh.generated.ts:5  当前为 EA-100-PMMA 测试数据。
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16  "routeSlug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:30  "titleTag": "EA-100-PMMA 常规柱塞泵｜100 μL PMMA 精密液体分配泵｜FOREACH 恒永达",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:31  "metaDescription": "EA-100-PMMA 是100 μL PMMA 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:32  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:40  "displayModel": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:421  "titleTag": "EA-100-PMMA Standard Plunger Pump | 100 µL PMMA Precision Dispensing Pump | FOREACH",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:422  "metaDescription": "EA-100-PMMA is a custom-engineered 100 µL PMMA pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:423  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:431  "displayModel": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:441  "description": "EA-100-PMMA is a custom-engineered 100 µL PMMA pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:878  "productId": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:882  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:889  "productId": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:891  "routeSlug": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:892  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:894  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:895  "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:905  "titleTag": "EA-100-PEEK 常规柱塞泵｜100 μL PEEK 精密液体分配泵｜FOREACH 恒永达",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:906  "metaDescription": "EA-100-PEEK 是100 μL PEEK 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:907  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:915  "displayModel": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1296  "titleTag": "EA-100-PEEK Standard Plunger Pump | 100 µL PEEK Precision Dispensing Pump | FOREACH",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1297  "metaDescription": "EA-100-PEEK is a custom-engineered 100 µL PEEK pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1298  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1306  "displayModel": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1316  "description": "EA-100-PEEK is a custom-engineered 100 µL PEEK pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1757  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1767  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1769  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1770  "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1782  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2173  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2632  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2642  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2644  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2645  "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2657  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3048  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3507  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3517  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3519  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3520  "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3532  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3923  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4382  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4392  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4394  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4395  "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4407  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4798  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5257  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5267  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5269  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5270  "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5282  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5673  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6132  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6142  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6144  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6145  "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6157  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6548  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7007  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7017  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7019  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7020  "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7032  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7423  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7882  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7892  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7894  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7895  "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7907  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8298  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8757  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8767  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8769  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8770  "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8782  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9173  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9632  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9642  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9644  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9645  "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9657  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10048  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10507  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10517  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10519  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10520  "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10532  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10923  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11382  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11392  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11394  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11395  "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11407  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11798  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12257  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12267  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12269  "canonicalPath": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12270  "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12282  "canonicalPath": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12665  "canonicalPath": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13116  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13126  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13128  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13129  "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13141  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13524  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13975  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13985  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13987  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13988  "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14000  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14383  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14834  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14844  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14846  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14847  "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14859  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15242  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15693  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15703  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15705  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15706  "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15718  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16101  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16552  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16562  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16564  "canonicalPath": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16565  "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16577  "canonicalPath": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16960  "canonicalPath": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17411  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17421  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17423  "canonicalPath": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17424  "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17436  "canonicalPath": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17819  "canonicalPath": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18270  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18280  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18282  "canonicalPath": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18283  "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18295  "canonicalPath": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18678  "canonicalPath": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19129  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19139  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19141  "canonicalPath": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19142  "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19154  "canonicalPath": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19537  "canonicalPath": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19988  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19998  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20000  "canonicalPath": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20001  "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20013  "canonicalPath": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20396  "canonicalPath": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20847  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20857  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20859  "canonicalPath": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20860  "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20872  "canonicalPath": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:21255  "canonicalPath": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:14  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:16  "routeSlug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:17  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:19  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:20  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:25  "productId": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:27  "routeSlug": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:28  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:30  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:31  "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:39  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:41  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:42  "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:50  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:52  "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:53  "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:61  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:63  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:64  "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:72  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:74  "canonicalPath": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:75  "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:83  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:85  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:86  "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:94  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:96  "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:97  "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:105  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:107  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:108  "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:116  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:118  "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:119  "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:127  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:129  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:130  "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:138  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:140  "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:141  "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:149  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:151  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:152  "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:160  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:162  "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:163  "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:171  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:173  "canonicalPath": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:174  "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:182  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:184  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:185  "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:193  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:195  "canonicalPath": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:196  "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:204  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:206  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:207  "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:215  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:217  "canonicalPath": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:218  "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:226  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:228  "canonicalPath": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:229  "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:237  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:239  "canonicalPath": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:240  "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:248  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:250  "canonicalPath": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:251  "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:259  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:261  "canonicalPath": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:262  "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:270  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:272  "canonicalPath": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:273  "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:281  "pumpTypeSlug": "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:283  "canonicalPath": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:284  "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:2  pump-series.selection.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:14  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:17  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:18  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:23  "title": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:29  "title": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:37  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:40  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:41  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:47  "subtitle": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:53  "subtitle": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:60  "productId": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:63  "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:64  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:69  "title": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:75  "title": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:83  "productId": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:86  "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:87  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:93  "subtitle": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:99  "subtitle": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:109  "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:110  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:132  "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:133  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:155  "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:156  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:178  "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:179  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:201  "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:202  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:224  "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:225  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:247  "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:248  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:270  "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:271  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:293  "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:294  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:316  "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:317  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:339  "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:340  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:362  "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:363  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:385  "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:386  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:408  "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:409  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:431  "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:432  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:454  "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:455  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:477  "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:478  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:500  "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:501  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:523  "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:524  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:546  "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:547  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:569  "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:570  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:592  "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:593  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:615  "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:616  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:638  "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:639  "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:661  "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:662  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:684  "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:685  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:707  "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:708  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:730  "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:731  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:753  "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:754  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:776  "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:777  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:799  "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:800  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:822  "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:823  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:845  "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:846  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:868  "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:869  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:891  "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:892  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:914  "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:915  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:937  "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:938  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:960  "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:961  "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:983  "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1006  "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1029  "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1052  "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1075  "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1098  "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1121  "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:1144  "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts:2  plunger-pump-card-copy.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts:27  "EA-100-PMMA": [
F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts:32  "EA-100-PEEK": [
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\pumps\plunger-pump-filter-rules.ts:2  plunger-pump-filter-rules.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\pumps\plunger-pump-filter-rules.ts:38  export function getPlungerPumpFilterOptions(
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.index.ts:16  import { getPlungerPumpFilterOptions } from "./pumps/plunger-pump-filter-rules";
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.index.ts:19  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.index.ts:20  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.index.ts:31  return getPlungerPumpFilterOptions(context);
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:18  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:84  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:150  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:216  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:282  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:348  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:414  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts:480  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\pipetting-pump-selection.generated.ts:15  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\pipetting-pump-selection.generated.ts:71  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\pipetting-pump-selection.generated.ts:126  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:48  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:120  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:192  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:264  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:68  "plunger-pumps": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:71  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:132  slug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:134  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:148  slug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:150  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:164  slug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:166  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:392  "pumps:plunger-pump": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:394  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts:402  src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:23  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:26  "zh": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:27  "en": "EA-100-PMMA"
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:29  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:38  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:39  "detailSlug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:50  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:53  "zh": "EA-100-PEEK",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:54  "en": "EA-100-PEEK"
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:56  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:65  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:66  "detailSlug": "ea-100-peek",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:77  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:83  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:92  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:104  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:110  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:119  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:131  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:137  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:146  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:158  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:164  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:173  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:185  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:191  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:200  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:212  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:218  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:227  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:239  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:245  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:254  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:266  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:272  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:281  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:293  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:299  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:308  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:320  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:326  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:335  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:347  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:353  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:362  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:374  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:380  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:389  "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:401  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:407  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:416  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:428  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:434  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:443  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:455  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:461  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:470  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:482  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:488  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:497  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:509  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:515  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:524  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:536  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:542  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:551  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:563  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:569  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:578  "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:590  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:596  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:605  "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-50ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:617  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:623  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:632  "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-100ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:644  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:650  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:659  "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-250ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:671  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:677  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:686  "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-500ul-pmma.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:700  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:716  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:732  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:748  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:764  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:780  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:796  "productTypeId": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:828  "id": "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.types.ts:38  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-type-intro.ts:22  "pumps:plunger-pump": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-type-intro.ts:30  src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts:54  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts:82  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts:110  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts:138  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\tubing-selection.generated.ts:15  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\tubing-selection.generated.ts:50  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\tubing-selection.generated.ts:85  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\tubing-selection.generated.ts:120  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\tubing-selection.generated.ts:155  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\tubing-selection.generated.ts:190  "cardSubtitle": {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valve-selection.generated.ts:49  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valve-selection.generated.ts:120  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valve-selection.generated.ts:191  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts:26  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts:51  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts:76  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts:101  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts:126  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:1  export const plungerPumpImageAltMap = {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:2  "EA-100-PMMA": "FOREACH EA-100-PMMA 100 碌L standard piston pump with PMMA pump head for low-volume reagent dispensing and small-volume sample handling in IVD analyzers",
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:3  "EA-100-PEEK": "FOREACH EA-100-PEEK 100 碌L standard piston pump with PEEK pump head for special reagent dispensing and molecular diagnostics liquid handling",
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:32  export const PLUNGER_PUMP_IMAGE_ALT_BY_PRODUCT_ID = plungerPumpImageAltMap;
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:46  export type PlungerPumpImageAltKey = keyof typeof plungerPumpImageAltMap;
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:102  export function getPlungerPumpSeriesPhrase(input: ProductImageAltInput): string {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:116  export function getPlungerPumpMaterialPhrase(input: ProductImageAltInput): string {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:130  export function getPlungerPumpDefaultApplicationPhrase(): string {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:134  export function getPlungerPumpApplicationPhrase(input: ProductImageAltInput): string {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:172  function buildFallbackPlungerPumpAlt(input: ProductImageAltInput): string {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:174  const seriesPhrase = getPlungerPumpSeriesPhrase(input);
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:175  const materialPhrase = getPlungerPumpMaterialPhrase(input);
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:176  const applicationPhrase = getPlungerPumpApplicationPhrase(input);
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:183  return `FOREACH ${seriesPhrase} product image for ${getPlungerPumpDefaultApplicationPhrase()}`;
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:186  export function getPlungerPumpImageAlt(input: ProductImageAltInput): string {
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:190  plungerPumpImageAltMap[model as PlungerPumpImageAltKey] ||
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:191  buildFallbackPlungerPumpAlt(input)
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts:11  getPlungerPumpImageAlt,
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts:12  getPlungerPumpApplicationPhrase,
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts:13  getPlungerPumpDefaultApplicationPhrase,
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts:14  getPlungerPumpMaterialPhrase,
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts:15  getPlungerPumpSeriesPhrase,
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts:19  } from "./plunger-pump-image-alt";
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.index.ts:13  import { getPlungerPumpImageAlt } from "./pumps/plunger-pump-image-alt";
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.index.ts:16  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.index.ts:17  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.index.ts:26  return getPlungerPumpImageAlt(input);
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.index.ts:33  export { getPlungerPumpImageAlt } from "./pumps/plunger-pump-image-alt";
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.types.ts:23  /** 产品类型，例如 plunger-pumps / diaphragm-pumps */
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.types.ts:26  /** 页面型号，例如 EA-100-PMMA */
F:\WebsiteProjects\foreach-website-2026\data\resources\installation-guide\installation-guide.zh.ts:53  { id: "plunger-pump", name: "柱塞泵" },
F:\WebsiteProjects\foreach-website-2026\data\resources\installation-guide\installation-guide.zh.ts:126  id: "plunger-pump-install-guide",
F:\WebsiteProjects\foreach-website-2026\data\resources\installation-guide\installation-guide.zh.ts:129  series: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\resources\technical-articles\technical-articles.intl.ts:183  id: "micro-plunger-pump-selection",
F:\WebsiteProjects\foreach-website-2026\data\resources\technical-articles\technical-articles.intl.ts:184  slug: "micro-plunger-pump-selection",
F:\WebsiteProjects\foreach-website-2026\data\resources\technical-articles\technical-articles.zh.ts:188  id: "micro-plunger-pump-selection",
F:\WebsiteProjects\foreach-website-2026\data\resources\technical-articles\technical-articles.zh.ts:189  slug: "micro-plunger-pump-selection",
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.en.ts:106  id: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.en.ts:117  "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp",
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.i18n.ts:340  "plunger-pump": {
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.i18n.ts:439  "plunger-pump": {
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.i18n.ts:538  "plunger-pump": {
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.i18n.ts:637  "plunger-pump": {
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.zh.ts:148  id: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\data\resources\datasheets.zh.ts:158  "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp",
F:\WebsiteProjects\foreach-website-2026\data\navigation.ts:423  localizedPath("/products/pumps/plunger-pumps")
F:\WebsiteProjects\foreach-website-2026\scripts\products\add-series-faq-structure.js:79  * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:57  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:58  titleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:62  displayModel: "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:122  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:124  titleTag: "EA-100-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:125  metaDescription: "EA-100-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的微量液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:126  h1: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:127  canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:129  ogTitle: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:133  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:138  canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:149  canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:160  canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:171  canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:182  canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:199  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:321  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:322  descriptionZh: "EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:359  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:360  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:362  cardTitleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:364  cardSubtitleZh: "微量精密分配与自动化液路集成",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:365  cardSubtitleEn: "Micro-volume precision dispensing and fluidic integration",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:371  cardImage: "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:372  detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:373  databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:379  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:383  cardSubtitleZh: "中小容量精密分配与液路模块集成",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:384  cardSubtitleEn: "Medium-small volume dispensing and fluidic module integration",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:390  cardImage: "/images/products/pumps/plunger-pump/ea/ea-250-pmma-card.webp",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:391  detailHref: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:392  databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:398  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:402  cardSubtitleZh: "紧凑型仪器用微量液体分配方案",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:403  cardSubtitleEn: "Micro-volume dispensing for compact instruments",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:409  cardImage: "/images/products/pumps/plunger-pump/sm/sm-100-pmma-card.webp",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:410  detailHref: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:411  databasePreviewHref: "/products/pumps-db/plunger-pumps/sm-miniature-piston-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\audit-pump-series-content-detail.js:11  "data/products/generated/pumps/pump-series.selection.generated.ts"
F:\WebsiteProjects\foreach-website-2026\scripts\products\audit-pump-series-data.js:51  md += "1. 中文 H1 是否保持型号式标题，例如：EA-100-PMMA 柱塞泵。\n";
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:7  const typesPath = path.join(outputDir, "plunger-pump-detail.types.ts");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:8  const generatedPath = path.join(outputDir, "plunger-pump-detail.generated.ts");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:9  const summaryPath = path.join(outputDir, "plunger-pump-detail.summary.json");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:103  console.error("data-source/product-center/pumps/plunger-pumps/FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:226  plunger-pump-detail.types.ts
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:229  本文件由 scripts/products/build-plunger-pump-detail-data.js 生成。
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:233  export type PlungerPumpSeriesCode = "EA" | "SM" | "TM";
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:235  export type PlungerPumpSpecification = {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:240  export type PlungerPumpFaq = {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:245  export type PlungerPumpResourceButtons = {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:256  export type PlungerPumpResources = {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:259  buttons: PlungerPumpResourceButtons;
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:262  export type PlungerPumpDetail = {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:270  seriesCode: PlungerPumpSeriesCode;
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:276  specifications: PlungerPumpSpecification[];
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:277  faqs: PlungerPumpFaq[];
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:278  resources: PlungerPumpResources;
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:351  productTypeCode: cleanCell(assetRow["产品类型代码"] || "plunger-pumps"),
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:392  plunger-pump-detail.generated.ts
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:405  import type { PlungerPumpDetail } from "./plunger-pump-detail.types";
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:407  export const plungerPumpDetails: PlungerPumpDetail[] = ${JSON.stringify(details, null, 2)};
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:409  export const plungerPumpDetailBySlug: Record<string, PlungerPumpDetail> = Object.fromEntries(
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:410  plungerPumpDetails.map((detail) => [detail.slug, detail]),
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:413  export function getPlungerPumpDetailBySlug(
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:415  ): PlungerPumpDetail | undefined {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:416  return plungerPumpDetailBySlug[slug];
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:419  export function getPlungerPumpDetailByModel(
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:421  ): PlungerPumpDetail | undefined {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:422  return plungerPumpDetails.find((detail) => detail.model === model);
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:443  console.log("- 已生成：data/products/detail/plunger-pump-detail.types.ts");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:444  console.log("- 已生成：data/products/detail/plunger-pump-detail.generated.ts");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-plunger-pump-detail-data.js:445  console.log("- 已生成：data/products/detail/plunger-pump-detail.summary.json");
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-product-selection-data.js:176  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-product-selection-data.js:258  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-product-selection-data.js:259  zh: cleanCell(row.cardSubtitleZh),
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-product-selection-data.js:260  en: cleanCell(row.cardSubtitleEn),
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-pump-series-data.js:36  "data-source/product-center/pumps/plunger-pump/FOREACH_柱塞泵_自动解析数据源模板_v4_脚注独立引用.xlsx",
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-pump-series-data.js:760  subtitle: getLocalized(row, "cardSubtitle", "zh"),
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-pump-series-data.js:766  subtitle: getLocalized(row, "cardSubtitle", "en"),
F:\WebsiteProjects\foreach-website-2026\scripts\products\build-pump-series-data.js:775  writeGeneratedTs("pump-series.selection.generated.ts", "pumpSeriesSelectionCards", selectionCards);
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-ea-full-model-codes.js:7  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "01_EA常规柱塞泵_详情页资料_zh.xlsx"),
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-ea-full-model-codes.js:8  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "02_EA常规柱塞泵_规格参数_zh.xlsx"),
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-ea-full-model-codes.js:9  path.join(root, "data-source", "product-center", "pumps", "plunger-pump", "ea", "ea-selection.xlsx"),
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-product-selection-data.js:96  if (!product.cardSubtitle?.zh) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-product-selection-data.js:97  warnings.push(`${product.productId} 缺少中文卡片副标题 cardSubtitle.zh`);
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:9  1. 检查详情页组件是否误用产品中心 cardSubtitle
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:92  1. 详情页不应该使用 cardSubtitle
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:96  if (/cardSubtitle/.test(detailLayerContent)) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:98  reportError("详情页代码中出现 cardSubtitle，可能误用了产品中心卡片短文。");
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:100  reportOk("详情页代码没有使用 cardSubtitle。");
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:145  判断方式：cardSubtitle 中如果出现过长段落，提示人工检查。
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:148  /"cardSubtitle":\s*\{[\s\S]*?\}/g
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:159  `发现 ${suspiciousLongSubtitles.length} 个 cardSubtitle 过长，可能把详情页长文放进了产品中心卡片。`
F:\WebsiteProjects\foreach-website-2026\scripts\products\check-selection-detail-copy-separation.js:162  reportOk("产品中心 cardSubtitle 未发现明显长文。");
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:71  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:114  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:115  slug: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:116  routeSlug: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:118  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:121  internalModelRef: "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:133  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:148  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:164  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:165  routeSlug: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:166  canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:167  detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:168  legacyRedirectFrom: "/products/pumps/plunger-pumps/ea-100-pmma/",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:175  canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:176  detailHref: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:177  legacyRedirectFrom: "/products/pumps/plunger-pumps/ea-250-pmma/",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:184  canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:185  detailHref: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:186  legacyRedirectFrom: "/products/pumps/plunger-pumps/sm-100-pmma/",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:196  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:197  titleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:201  displayModel: "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:261  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:263  titleTag: "EA-100-PMMA 柱塞泵｜恒永达 FOREACH",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:265  "EA-100-PMMA 柱塞泵适用于精密液体分配、自动化分析仪器和 IVD 液路系统。柱塞泵为定制品，具体方案需根据应用确认。",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:266  h1: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:267  canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:269  ogTitle: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:274  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:281  canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:294  canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:308  canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:321  canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:335  canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:348  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:359  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:370  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:381  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:392  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:404  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:416  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:428  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:445  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:446  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:448  cardTitleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:450  cardSubtitleZh: "适用于精密液体分配与自动化仪器液路集成",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:451  cardSubtitleEn:
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:461  "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:462  detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:472  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:474  "EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体分配、吸排和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、控制方式和液路集成形式需根据实际应用确认。",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:492  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:505  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:518  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:536  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:539  "/images/products/pumps/plunger-pump/ea/ea-100-pmma-main.webp；/images/products/pumps/plunger-pump/ea/ea-100-pmma-detail.webp",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:540  imageAltZh: "EA-100-PMMA 柱塞泵产品图；EA-100-PMMA 柱塞泵泵头细节图",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:542  "EA-100-PMMA plunger pump product image；EA-100-PMMA plunger pump head detail image",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:557  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:577  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:578  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:594  pumpTypeSlug: "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:613  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:621  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:640  outputFile: "pump-series.selection.generated.ts",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-assets-use-current-public-folder.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-adapter-clean.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-adapter-clean.js:129  productType: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-adapter-clean.js:130  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-adapter-clean.js:196  { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-adapter-clean.js:197  { label: model, href: \`/products/pumps/plunger-pumps/\${slug}\` },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-assets-request-links.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-assets-request-links.js:188  productType: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-assets-request-links.js:189  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-assets-request-links.js:275  { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-assets-request-links.js:276  { label: model, href: "/products/pumps/plunger-pumps/" + slug },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:70  'import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";',
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:71  'import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";\nimport { selectionProducts } from "@/data/products/selection/product-selection.generated";'
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:245  productType: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:246  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:319  { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets-safe.js:320  { label: model, href: "/products/pumps/plunger-pumps/" + slug },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:73  'import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";',
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:74  `import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:252  productType: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:253  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:330  { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-image-and-assets.js:331  { label: model, href: \`/products/pumps/plunger-pumps/\${slug}\` },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:109  function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:163  const isPlungerPump =
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:165  ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:167  if (isPlungerPump) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:168  const slug = getPlungerPumpModelSlugForDetailHref(product);
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:171  ? \`/products/pumps/plunger-pumps/\${slug}\`
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:172  : "/products/pumps/plunger-pumps";
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:197  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:205  import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:216  "ea-standard-piston-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:217  "ea-standard-plunger-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:219  "sm-micro-plunger-pumps": "sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:221  "sm-miniature-plunger-pumps": "sm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:223  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:280  Object.values(plungerPumpDetailModule).forEach((value) => {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:354  export default function PlungerPumpDetailPage({
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-public-assets-auto-match.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-public-assets-final-clean.js:11  "plunger-pumps",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-public-assets-final-clean.js:234  productType: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-public-assets-final-clean.js:235  productTypeId: "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-public-assets-final-clean.js:318  { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-public-assets-final-clean.js:319  { label: model, href: "/products/pumps/plunger-pumps/" + slug },
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:31  console.error("没有在 plunger-pump-detail.generated.ts 中找到导出的数组。");
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:44  "plunger-pump-detail.generated.ts"
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:76  const importLine = `import { ${exportName} as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";`;
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:78  if (!client.includes("@/data/products/detail/plunger-pump-detail.generated")) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:84  if (!client.includes("@/data/products/detail/plunger-pump-detail.generated")) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:111  function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:121  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:142  const isPlungerPump =
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:144  ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:146  if (isPlungerPump) {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:147  const slug = findPlungerPumpDetailSlug(product);
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:150  ? \`/products/pumps/plunger-pumps/\${slug}\`
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:151  : "/products/pumps/plunger-pumps";
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:192  "plunger-pumps"
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:210  import { ${exportName} as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:227  return (plungerPumpDetails as any[]).find((item) => {
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:233  return (plungerPumpDetails as any[])
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-pump-detail-routing.js:254  export default function PlungerPumpDetailPage({
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-image-assets.js:27  /\/images\/products\/pumps\/plunger-pump\/(ea|sm)\/\1-(\d+)-(pmma|peek)-(main|detail)\.webp/gi,
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-image-assets.js:29  `/images/products/pumps/plunger-pump/${series.toLowerCase()}/pump-${series.toLowerCase()}-${capacity}ul-${material.toLowerCase()}.webp`
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-image-assets.js:40  item[key].includes("/images/products/pumps/plunger-pump/")
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:5  fix-pump-series-selection-card-assets.js
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:10  /images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:12  /images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:22  "data/products/generated/pumps/pump-series.selection.generated.ts"
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:72  * /images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:74  * /images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:86  /\/images\/products\/pumps\/plunger-pump\/(ea|sm)\/(?:ea|sm)-(\d+)-(pmma|peek)-card\.webp/gi,
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:90  const nextPath = `/images/products/pumps/plunger-pump/${normalizedSeries}/pump-${normalizedSeries}-${capacity}ul-${normalizedMaterial}.webp`;
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:8  3. 正式页面路径保持 /products/pumps/plunger-pumps/[slug]
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:9  4. 数据库预览路径单独使用 /products/pumps-db/plunger-pumps/[seriesSlug]/[slug]
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:56  /products/pumps/plunger-pumps/[slug]
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:59  /products/pumps-db/plunger-pumps/[seriesSlug]/[slug]
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:65  const pumpTypeSlug = text(product.pumpTypeSlug || product.productTypeSlug || "plunger-pumps");
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:97  "ea-100-pmma": {
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:98  cardTitleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:100  cardSubtitleZh: "适用于精密液体分配与自动化仪器液路集成",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:101  cardSubtitleEn: "For precision dispensing and automated fluidic integration",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:111  cardSubtitleZh: "适用于中小容量精密分配与自动化液路模块",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:112  cardSubtitleEn: "For medium-small volume precision dispensing and fluidic modules",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:122  cardSubtitleZh: "适用于空间紧凑型仪器中的微量液体分配",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:123  cardSubtitleEn: "For micro-volume dispensing in compact instruments",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:139  const pumpTypeSlug = text(product.pumpTypeSlug || "plunger-pumps");
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:152  cardSubtitleZh: defaults.cardSubtitleZh || "适用于自动化仪器液路集成",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:153  cardSubtitleEn: defaults.cardSubtitleEn || "For automated fluidic integration",
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:159  cardImage: `/images/products/pumps/plunger-pump/${text(product.seriesCode).toLowerCase()}/${productId}-card.webp`,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:10  1. 只修改 ea-selection.xlsx 里的 cardTitle / cardSubtitle
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:11  2. cardSubtitle 改为真正的换行文本
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:23  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:54  row.cardSubtitleZh,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:55  row.cardSubtitleEn,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:116  Object.prototype.hasOwnProperty.call(row, "cardSubtitleZh") ||
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:117  Object.prototype.hasOwnProperty.call(row, "cardSubtitleEn")
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:125  ["cardTitleZh", "cardTitleEn", "cardSubtitleZh", "cardSubtitleEn"].forEach((key) => {
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:136  row.cardSubtitleZh = zhSubtitle;
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text-lines.js:137  row.cardSubtitleEn = enSubtitle;
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:25  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:57  row.cardSubtitleZh,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:58  row.cardSubtitleEn,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:112  Object.prototype.hasOwnProperty.call(row, "cardSubtitleZh") ||
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:113  Object.prototype.hasOwnProperty.call(row, "cardSubtitleEn")
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:121  ["cardTitleZh", "cardTitleEn", "cardSubtitleZh", "cardSubtitleEn"].forEach(
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:134  row.cardSubtitleZh = zhSubtitle;
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-card-text.js:135  row.cardSubtitleEn = enSubtitle;
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-detail-slug.js:11  详情页真实路由是 ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-detail-slug.js:28  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-detail-slug.js:54  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:10  1. 将产品中心卡片标题从 EA · 100 μL · PMMA 改为 EA-100-PMMA
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:11  2. 将 detailSlug 统一为 ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:24  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:47  row.cardSubtitleZh,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:48  row.cardSubtitleEn,
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-font-24.js:29  将详情页 Tab 文字调整到接近“型号：EA-100-PMMA”的大小
F:\WebsiteProjects\foreach-website-2026\scripts\products\reset-product-detail-tab-clean.js:70  - 字号接近“型号：EA-100-PMMA”
F:\WebsiteProjects\foreach-website-2026\scripts\products\search-ea-full-models-in-xlsx.js:11  2. 查找 EA-100-PMMA-UF-N 这类完整工程型号
F:\WebsiteProjects\foreach-website-2026\services\products\adapters\getPumpSeriesProductDetailAdapter.ts:195  `/images/products/pumps/plunger-pump/${seriesCode}/pump-${seriesCode}-${capacity}ul-${material}.webp`,
F:\WebsiteProjects\foreach-website-2026\services\products\adapters\getPumpSeriesProductDetailAdapter.ts:196  `/images/products/pumps/plunger-pump/${seriesCode}/pump-${seriesCode}-${capacity}ul-pmma.webp`,
F:\WebsiteProjects\foreach-website-2026\services\products\adapters\getPumpSeriesProductDetailAdapter.ts:197  `/images/products/pumps/plunger-pump/${seriesCode}/pump-${seriesCode}-${capacity}ul-peek.webp`,
F:\WebsiteProjects\foreach-website-2026\services\products\adapters\getPumpSeriesProductDetailAdapter.ts:212  "plunger-pump",
F:\WebsiteProjects\foreach-website-2026\services\products\adapters\getPumpSeriesProductDetailAdapter.ts:223  return `/images/products/pumps/plunger-pump/${seriesCode}/${firstImage}`;
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:17  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:18  ea-100-peek
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:19  2. 当前不再生成旧测试路由 ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:45  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:48  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\getPumpSeriesDetailData.ts:17  import { pumpSeriesSelectionCards } from "@/data/products/generated/pumps/pump-series.selection.generated";
F:\WebsiteProjects\foreach-website-2026\services\products\getPumpSeriesDetailData.ts:250  绀轰緥锛?   pumpTypeSlug = plunger-pumps
F:\WebsiteProjects\foreach-website-2026\services\products\getPumpSeriesDetailData.ts:263  /products/pumps/plunger-pumps/[slug]
F:\WebsiteProjects\foreach-website-2026\add-diaphragm-bottom-cta.js:11  /function getPlungerPumpBottomCta\(data: any\) \{/,
F:\WebsiteProjects\foreach-website-2026\add-diaphragm-bottom-cta.js:27  function getPlungerPumpBottomCta(data: any) {`
F:\WebsiteProjects\foreach-website-2026\add-diaphragm-bottom-cta.js:35  const oldBlock = `  if (!isPlungerPumpDetailData(data)) {
F:\WebsiteProjects\foreach-website-2026\add-diaphragm-bottom-cta.js:46  const newBlock = `  if (isPlungerPumpDetailData(data)) {
F:\WebsiteProjects\foreach-website-2026\add-diaphragm-bottom-cta.js:67  throw new Error("未找到原柱塞泵 CTA 逻辑，请先检查 getPlungerPumpBottomCta 函数。");
F:\WebsiteProjects\foreach-website-2026\generate-diaphragm-selection-bridge.js:137  cardSubtitle: {
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:63  const isPlungerPump =
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:65  ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:67  if (isPlungerPump) {
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:68  const slug = getPlungerPumpModelSlugForDetailHref(product);
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:71  ? \`/products/pumps/plunger-pumps/\${slug}\`
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:72  : "/products/pumps/plunger-pumps";
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:97  const isPlungerPump =
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:99  ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:101  if (isPlungerPump) {
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:102  const slug = getPlungerPumpModelSlugForDetailHref(product);
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:105  ? \`/products/pumps/plunger-pumps/\${slug}\`
F:\WebsiteProjects\foreach-website-2026\patch-diaphragm-selection-client.js:106  : "/products/pumps/plunger-pumps";

## 3. 检查柱塞泵生成数据中的乱码字符


文件：data\products\generated\pumps\pump-series.selection.generated.ts
疑似乱码字符 [涓] 出现次数：1
疑似乱码字符 [寰] 出现次数：14
疑似乱码字符 [鍐] 出现次数：1
疑似乱码字符 [鍨] 出现次数：50
疑似乱码字符 [鍔] 出现次数：1
跳过，文件不存在：data\products\generated\pumps\detail\index.json
跳过，文件不存在：data\products\generated\pumps\selection\index.json
跳过，文件不存在：data\products\selection\plunger-pump-selection.generated.ts

## 4. 抽取 EA-100-PMMA / EA-100-PEEK 卡片上下文


--- data\products\generated\pumps\pump-series.selection.generated.ts line 14 ---
========================================================= */

export const pumpSeriesSelectionCards = [
  {
    "productId": "ea-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
    "badges": [],
    "sort": 1,

--- data\products\generated\pumps\pump-series.selection.generated.ts line 17 ---
  {
    "productId": "ea-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
    "badges": [],
    "sort": 1,
    "content": {
      "zh": {
        "title": "EA-100-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 23 ---
    "badges": [],
    "sort": 1,
    "content": {
      "zh": {
        "title": "EA-100-PMMA",
        "subtitle": "100 μL PMMA 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      },
      "en": {
        "title": "EA-100-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 29 ---
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      },
      "en": {
        "title": "EA-100-PMMA",
        "subtitle": "100 μL PMMA 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      }
    }
  },

--- data\products\generated\pumps\pump-series.selection.generated.ts line 37 ---
      }
    }
  },
  {
    "productId": "ea-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
    "badges": [],
    "sort": 1,

--- data\products\generated\pumps\pump-series.selection.generated.ts line 40 ---
  {
    "productId": "ea-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
    "badges": [],
    "sort": 1,
    "content": {
      "zh": {
        "title": "100 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 47 ---
    "sort": 1,
    "content": {
      "zh": {
        "title": "100 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PMMA",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
        "specs": []
      },
      "en": {
        "title": "100 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 53 ---
        "specs": []
      },
      "en": {
        "title": "100 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PMMA",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
        "specs": []
      }
    }
  },
  {

--- data\products\generated\pumps\pump-series.selection.generated.ts line 60 ---
      }
    }
  },
  {
    "productId": "ea-100-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
    "badges": [],
    "sort": 2,

--- data\products\generated\pumps\pump-series.selection.generated.ts line 63 ---
  {
    "productId": "ea-100-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
    "badges": [],
    "sort": 2,
    "content": {
      "zh": {
        "title": "EA-100-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 69 ---
    "badges": [],
    "sort": 2,
    "content": {
      "zh": {
        "title": "EA-100-PEEK",
        "subtitle": "100 μL PEEK 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      },
      "en": {
        "title": "EA-100-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 75 ---
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      },
      "en": {
        "title": "EA-100-PEEK",
        "subtitle": "100 μL PEEK 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      }
    }
  },

--- data\products\generated\pumps\pump-series.selection.generated.ts line 83 ---
      }
    }
  },
  {
    "productId": "ea-100-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
    "badges": [],
    "sort": 2,

--- data\products\generated\pumps\pump-series.selection.generated.ts line 86 ---
  {
    "productId": "ea-100-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
    "badges": [],
    "sort": 2,
    "content": {
      "zh": {
        "title": "100 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 93 ---
    "sort": 2,
    "content": {
      "zh": {
        "title": "100 µL PEEK Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PEEK",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
        "specs": []
      },
      "en": {
        "title": "100 µL PEEK Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 99 ---
        "specs": []
      },
      "en": {
        "title": "100 µL PEEK Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PEEK",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
        "specs": []
      }
    }
  },
  {

--- data\products\generated\pumps\pump-series.selection.generated.ts line 106 ---
      }
    }
  },
  {
    "productId": "ea-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
    "badges": [],
    "sort": 3,

--- data\products\generated\pumps\pump-series.selection.generated.ts line 109 ---
  {
    "productId": "ea-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
    "badges": [],
    "sort": 3,
    "content": {
      "zh": {
        "title": "EA-250-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 115 ---
    "badges": [],
    "sort": 3,
    "content": {
      "zh": {
        "title": "EA-250-PMMA",
        "subtitle": "250 μL PMMA 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      },
      "en": {
        "title": "EA-250-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 121 ---
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      },
      "en": {
        "title": "EA-250-PMMA",
        "subtitle": "250 μL PMMA 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
      }
    }
  },

--- data\products\generated\pumps\pump-series.selection.generated.ts line 129 ---
      }
    }
  },
  {
    "productId": "ea-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
    "badges": [],
    "sort": 3,

--- data\products\generated\pumps\pump-series.selection.generated.ts line 132 ---
  {
    "productId": "ea-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
    "badges": [],
    "sort": 3,
    "content": {
      "zh": {
        "title": "250 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 139 ---
    "sort": 3,
    "content": {
      "zh": {
        "title": "250 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-250-PMMA",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
        "specs": []
      },
      "en": {
        "title": "250 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-250-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 145 ---
        "specs": []
      },
      "en": {
        "title": "250 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-250-PMMA",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
        "specs": []
      }
    }
  },
  {

--- data\products\generated\pumps\pump-series.selection.generated.ts line 155 ---
  {
    "productId": "ea-250-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
    "badges": [],
    "sort": 4,
    "content": {
      "zh": {
        "title": "EA-250-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 178 ---
  {
    "productId": "ea-250-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
    "badges": [],
    "sort": 4,
    "content": {
      "zh": {
        "title": "250 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 201 ---
  {
    "productId": "ea-500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
    "badges": [],
    "sort": 5,
    "content": {
      "zh": {
        "title": "EA-500-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 224 ---
  {
    "productId": "ea-500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
    "badges": [],
    "sort": 5,
    "content": {
      "zh": {
        "title": "500 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 247 ---
  {
    "productId": "ea-500-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
    "badges": [],
    "sort": 6,
    "content": {
      "zh": {
        "title": "EA-500-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 270 ---
  {
    "productId": "ea-500-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
    "badges": [],
    "sort": 6,
    "content": {
      "zh": {
        "title": "500 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 293 ---
  {
    "productId": "ea-1000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
    "badges": [],
    "sort": 7,
    "content": {
      "zh": {
        "title": "EA-1000-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 316 ---
  {
    "productId": "ea-1000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
    "badges": [],
    "sort": 7,
    "content": {
      "zh": {
        "title": "1000 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 339 ---
  {
    "productId": "ea-1000-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
    "badges": [],
    "sort": 8,
    "content": {
      "zh": {
        "title": "EA-1000-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 362 ---
  {
    "productId": "ea-1000-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
    "badges": [],
    "sort": 8,
    "content": {
      "zh": {
        "title": "1000 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 385 ---
  {
    "productId": "ea-2500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
    "badges": [],
    "sort": 9,
    "content": {
      "zh": {
        "title": "EA-2500-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 408 ---
  {
    "productId": "ea-2500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
    "badges": [],
    "sort": 9,
    "content": {
      "zh": {
        "title": "2500 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 431 ---
  {
    "productId": "ea-2500-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
    "badges": [],
    "sort": 10,
    "content": {
      "zh": {
        "title": "EA-2500-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 454 ---
  {
    "productId": "ea-2500-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
    "badges": [],
    "sort": 10,
    "content": {
      "zh": {
        "title": "2500 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 477 ---
  {
    "productId": "ea-5000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
    "badges": [],
    "sort": 11,
    "content": {
      "zh": {
        "title": "EA-5000-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 500 ---
  {
    "productId": "ea-5000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
    "badges": [],
    "sort": 11,
    "content": {
      "zh": {
        "title": "5000 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 523 ---
  {
    "productId": "ea-5000-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
    "badges": [],
    "sort": 12,
    "content": {
      "zh": {
        "title": "EA-5000-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 546 ---
  {
    "productId": "ea-5000-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
    "badges": [],
    "sort": 12,
    "content": {
      "zh": {
        "title": "5000 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 569 ---
  {
    "productId": "ea-10000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
    "badges": [],
    "sort": 13,
    "content": {
      "zh": {
        "title": "EA-10000-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 592 ---
  {
    "productId": "ea-10000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
    "badges": [],
    "sort": 13,
    "content": {
      "zh": {
        "title": "10000 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 615 ---
  {
    "productId": "ea-10000-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
    "badges": [],
    "sort": 14,
    "content": {
      "zh": {
        "title": "EA-10000-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 638 ---
  {
    "productId": "ea-10000-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
    "badges": [],
    "sort": 14,
    "content": {
      "zh": {
        "title": "10000 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 661 ---
  {
    "productId": "sm-50-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
    "badges": [],
    "sort": 15,
    "content": {
      "zh": {
        "title": "SM-50-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 684 ---
  {
    "productId": "sm-50-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
    "badges": [],
    "sort": 15,
    "content": {
      "zh": {
        "title": "50 µL PMMA Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 707 ---
  {
    "productId": "sm-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
    "badges": [],
    "sort": 16,
    "content": {
      "zh": {
        "title": "SM-100-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 730 ---
  {
    "productId": "sm-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
    "badges": [],
    "sort": 16,
    "content": {
      "zh": {
        "title": "100 µL PMMA Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 753 ---
  {
    "productId": "sm-100-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
    "badges": [],
    "sort": 17,
    "content": {
      "zh": {
        "title": "SM-100-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 776 ---
  {
    "productId": "sm-100-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
    "badges": [],
    "sort": 17,
    "content": {
      "zh": {
        "title": "100 µL PEEK Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 799 ---
  {
    "productId": "sm-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
    "badges": [],
    "sort": 18,
    "content": {
      "zh": {
        "title": "SM-250-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 822 ---
  {
    "productId": "sm-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
    "badges": [],
    "sort": 18,
    "content": {
      "zh": {
        "title": "250 µL PMMA Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 845 ---
  {
    "productId": "sm-250-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
    "badges": [],
    "sort": 19,
    "content": {
      "zh": {
        "title": "SM-250-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 868 ---
  {
    "productId": "sm-250-peek",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
    "badges": [],
    "sort": 19,
    "content": {
      "zh": {
        "title": "250 µL PEEK Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 891 ---
  {
    "productId": "sm-500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
    "badges": [],
    "sort": 20,
    "content": {
      "zh": {
        "title": "SM-500-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 914 ---
  {
    "productId": "sm-500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
    "badges": [],
    "sort": 20,
    "content": {
      "zh": {
        "title": "500 µL PMMA Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 937 ---
  {
    "productId": "sm-1000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
    "badges": [],
    "sort": 21,
    "content": {
      "zh": {
        "title": "SM-1000-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 960 ---
  {
    "productId": "sm-1000-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "sm-miniature-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
    "badges": [],
    "sort": 21,
    "content": {
      "zh": {
        "title": "1000 µL PMMA Pump Head Miniature Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 983 ---
  {
    "productId": "tm-50-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 22,
    "content": {
      "zh": {
        "title": "TM-50-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1006 ---
  {
    "productId": "tm-50-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 22,
    "content": {
      "zh": {
        "title": "50 µL PMMA Pump Head Ultra-Compact Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1029 ---
  {
    "productId": "tm-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 23,
    "content": {
      "zh": {
        "title": "TM-100-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1052 ---
  {
    "productId": "tm-100-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 23,
    "content": {
      "zh": {
        "title": "100 µL PMMA Pump Head Ultra-Compact Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1075 ---
  {
    "productId": "tm-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 24,
    "content": {
      "zh": {
        "title": "TM-250-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1098 ---
  {
    "productId": "tm-250-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 24,
    "content": {
      "zh": {
        "title": "250 µL PMMA Pump Head Ultra-Compact Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1121 ---
  {
    "productId": "tm-500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 25,
    "content": {
      "zh": {
        "title": "TM-500-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 1144 ---
  {
    "productId": "tm-500-pmma",
    "pumpTypeSlug": "",
    "seriesSlug": "tm-ultra-compact-piston-pumps",
    "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
    "cardImage": "/images/products/common/product-placeholder.svg",
    "badges": [],
    "sort": 25,
    "content": {
      "zh": {
        "title": "500 µL PMMA Pump Head Ultra-Compact Plunger Pump",

## 5. 检查 ProductSelectionClient 如何读取副标题


--- components\products\selection\ProductSelectionClient.tsx line 49 ---

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import {

--- components\products\selection\ProductSelectionClient.tsx line 295 ---
    sortOrder: 60,
  },
];

function getText(
  locale: SelectionLocale,
  value: Partial<Record<SelectionLocale, string>> | undefined,
  fallback = ""
) {
  if (!value) return fallback;


--- components\products\selection\ProductSelectionClient.tsx line 308 ---

function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  const item = selectionTaxonomyItems.find((entry) => entry.id === id);

  return getText(locale, item?.label, id);
}

function getCategoryItems(locale: SelectionLocale) {
  const generatedCategories = selectionTaxonomyItems
    .filter((item) => item.type === "category")
    .map((item) => {

--- components\products\selection\ProductSelectionClient.tsx line 321 ---
      );

      return {
        id: item.id,
        label: getText(locale, item.label, fallback?.label || item.id),
        description:
          fallback?.description ||
          "根据产品类型、系列和筛选条件选择基础配置。",
        sortOrder: item.sortOrder,
      };
    });

--- components\products\selection\ProductSelectionClient.tsx line 1160 ---
      if (options.length === 0) return;

      groups.push({
        key: label.filterKey,
        title: getText(locale, label.label, label.filterKey),
        inputType: label.inputType,
        options,
      });
    });

    return groups;

--- components\products\selection\ProductSelectionClient.tsx line 1205 ---
        product.seriesId,
        product.detailSlug,
        product.cardTitle.zh,
        product.cardTitle.en,
        product.cardSubtitle.zh,
        product.cardSubtitle.en,
        product.searchKeywords.zh,
        product.searchKeywords.en,
        ...Object.values(product.filters),
      ]
        .filter(Boolean)

--- components\products\selection\ProductSelectionClient.tsx line 1206 ---
        product.detailSlug,
        product.cardTitle.zh,
        product.cardTitle.en,
        product.cardSubtitle.zh,
        product.cardSubtitle.en,
        product.searchKeywords.zh,
        product.searchKeywords.en,
        ...Object.values(product.filters),
      ]
        .filter(Boolean)
        .join(" ")

--- components\products\selection\ProductSelectionClient.tsx line 1268 ---
    currentProductPage,
    totalProductPages
  );

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );

  useEffect(() => {
    function updateProductsPageSize() {

--- components\products\selection\ProductSelectionClient.tsx line 1682 ---
  }
  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,

--- components\products\selection\ProductSelectionClient.tsx line 1808 ---
              />

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>

--- components\products\selection\ProductSelectionClient.tsx line 1809 ---

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)

--- components\products\selection\ProductSelectionClient.tsx line 1815 ---
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}

--- components\products\selection\ProductSelectionClient.tsx line 1817 ---
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />


--- components\products\selection\ProductSelectionClient.tsx line 1818 ---
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination

## 6. 检查是否有备份文件可恢复

2026-07-07 16:29:19  F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts.bak_force_safe_getProductCardSpecs_20260707_163025
2026-07-07 15:34:09  F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts.bak.image-paths
2026-07-07 15:30:54  F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts.bak.series-labels
2026-07-07 15:25:35  F:\WebsiteProjects\foreach-website-2026\data\products\selection\syringe-pump-selection.generated.ts.bak
2026-07-07 14:42:28  F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts.bak_split_drpl_detail_20260707_144438
2026-07-07 14:40:09  F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts.bak_short_drpl_title_20260707_144228
2026-07-07 14:39:07  F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts.bak_rewrite_clean_20260707_144009
2026-07-07 14:29:32  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-valveless-pump-detail-data.js.bak_force_drpl_h1_model_20260707_144905
2026-07-07 14:26:59  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-valveless-pump-detail-data.js.bak_force_drpl_specs_20260707_142932
2026-07-07 14:26:59  F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts.bak_split_drpl_selection_only_20260707_143907
2026-07-07 14:23:22  F:\WebsiteProjects\foreach-website-2026\scripts\products\audit-valveless-pump-detail-specs.js.bak_split_drpl_detail_20260707_144438
2026-07-07 13:44:57  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-valveless-pump-detail-data.js.bak_fix_specs_20260707_142659
2026-07-07 13:37:43  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-valveless-pump-detail-data.js.bak_20260707_134457
2026-07-07 13:35:27  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-valveless-pump-detail-data.js.bak_fix_additional_images_20260707_133743
2026-07-07 11:27:52  F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts.bak_fix_specs_20260707_142659
2026-07-07 11:26:24  F:\WebsiteProjects\foreach-website-2026\data\products\selection\valveless-pump-selection.generated.ts.bak_add_rpl_drpl_filter_20260707_112752
2026-07-07 11:18:04  F:\WebsiteProjects\foreach-website-2026\app\products\pumps\valveless-pumps\valveless-pumps.module.css.bak_wrong_standalone_style_20260707_112148
2026-07-07 10:28:30  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-pipetting-pump-detail-data.js.bak_20260707_134743
2026-07-07 10:10:56  F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-pipetting-pump-detail-data.js.bak_copy_update_20260707_102830
2026-07-06 22:41:22  F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts.bak_patch_8_model_detail_slug_20260706144617
2026-07-06 21:51:16  F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts.bak_force_8_model_links_20260706144122
2026-07-03 18:31:50  F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts.bak_safe_getProductCardSpecs_20260707_162919

## 7. 当前 Git 状态

```txt
 M app/products/[category]/[slug]/page.tsx
 M app/products/products.css
 M app/products/pumps/pipetting-pumps/[slug]/page.tsx
 M components/products/detail/ProductDetailClient.tsx
 M components/products/detail/product-detail.module.css
 M components/products/selection/ProductCardGrid.tsx
 M components/products/selection/ProductFilterPanel.tsx
 M components/products/selection/ProductSelectionCard.tsx
 M components/products/selection/ProductSelectionClient.tsx
 M components/selection-cart/GlobalSelectionCartDrawer.tsx
 M components/selection-cart/SelectionCartProvider.tsx
 M components/selection-cart/selection-cart.types.ts
 M data/products/generated/pumps/pipetting-pumps/detail/index.json
 M data/products/selection/card-copy/plunger-pump-card-copy.ts
 M data/products/selection/product-route-map.ts
 M data/products/selection/product-type-intro.ts
 M package.json
 M scripts/products/generate-pipetting-pump-detail-data.js
?? "add-tubing-detail-pages-clean (1).ps1"
?? add-tubing-detail-pages-clean.ps1
?? app/products/[category]/[slug]/page.tsx.bak_add_tubing_static_params_20260707_201603
?? app/products/probes/
?? app/products/products.css.bak_20260706_140218
?? app/products/products.css.bak_card_actions_20260706_145558
?? app/products/products.css.bak_card_actions_continue_20260706_145741
?? app/products/products.css.bak_diaphragm_card_style_20260706_211722
?? app/products/products.css.bak_diaphragm_halodp_css_20260706_233805
?? app/products/products.css.bak_diaphragm_subtitle_multiline_20260706_212104
?? app/products/products.css.bak_drawing_cart_only_20260706_151114
?? app/products/products.css.bak_final_detail_cart_20260706_163743
?? app/products/products.css.bak_mobile_card_final_append_20260706_142435
?? app/products/products.css.bak_mobile_card_font_20260706_142035
?? app/products/products.css.bak_mobile_card_real_fix_20260706_142254
?? app/products/products.css.bak_overall_fix_20260706_162940
?? app/products/products.css.bak_remove_wrong_top_controls_20260706_220032
?? app/products/pumps/diaphragm-pumps/
?? app/products/pumps/syringe-pumps/
?? app/products/pumps/valveless-pumps/
?? app/products/tubing/
?? app/products/valves/
?? audit-plunger-selection-mojibake-report.md
?? audit-product-selection-data-source.md
?? audit-tubing-selection-links-report.md
?? bind-drawing-button-to-cart.js
?? check-and-repair-broken-json.ps1
?? check-diaphragm-spec-life-motor.js
?? check-diaphragm-xlsx.js
?? components/products/detail/ProductDetailClient.tsx.bak.syringe-cta
?? components/products/detail/ProductDetailClient.tsx.bak_20260707_133527
?? components/products/detail/ProductDetailClient.tsx.bak_20260707_134457
?? components/products/detail/ProductDetailClient.tsx.bak_add_diaphragm_bottom_cta_20260706_234250
?? components/products/detail/ProductDetailClient.tsx.bak_add_pipetting_cta_20260707_105053
?? components/products/detail/ProductDetailClient.tsx.bak_add_pipetting_cta_correct_20260707_105316
?? components/products/detail/ProductDetailClient.tsx.bak_before_tubing_cta_data_patch_20260707123420
?? components/products/detail/ProductDetailClient.tsx.bak_bind_drawing_to_cart_20260706_235717
?? components/products/detail/ProductDetailClient.tsx.bak_detail_buttons_toggle_cancel_20260707_001417
?? components/products/detail/ProductDetailClient.tsx.bak_detail_cart_button_selected_state_20260707_000251
?? components/products/detail/ProductDetailClient.tsx.bak_fix_button_block_direct_20260707_001112
?? components/products/detail/ProductDetailClient.tsx.bak_fix_description_20260707_104831
?? components/products/detail/ProductDetailClient.tsx.bak_fix_detail_cart_actions_20260706_232258
?? components/products/detail/ProductDetailClient.tsx.bak_fix_detail_data_extra_type_20260706_233804
?? components/products/detail/ProductDetailClient.tsx.bak_fix_detail_extra_data_type_20260707_000048
?? components/products/detail/ProductDetailClient.tsx.bak_fix_remaining_list_toggle_runtime_20260707_000953
?? components/products/detail/ProductDetailClient.tsx.bak_fix_valveless_cta_priority_20260707_134111
?? components/products/detail/ProductDetailClient.tsx.bak_image_alt_en_20260707_103533
?? components/products/detail/ProductDetailClient.tsx.bak_model_action_open_new_page_20260706_230725
?? components/products/detail/ProductDetailClient.tsx.bak_no_auto_open_cart_20260706_232627
?? components/products/detail/ProductDetailClient.tsx.bak_pipetting_alt_20260707_102830
?? components/products/detail/ProductDetailClient.tsx.bak_probe_bottom_cta_20260707_192030
?? components/products/detail/ProductDetailClient.tsx.bak_remove_unused_addDetailProductToCart_20260707_002047
?? components/products/detail/ProductDetailClient.tsx.bak_restore_detail_button_state_text_20260707_000704
?? components/products/detail/ProductDetailClient.tsx.bak_safe_button_text_state_20260707_000817
?? components/products/detail/ProductDetailClient.tsx.bak_tubing_model_placeholder_20260707124729
?? components/products/detail/ProductDetailClient.tsx.bak_use_plunger_list_toggle_style_20260707_000443
?? components/products/detail/ProductDetailClient.tsx.bak_valve_bottom_cta_20260707_174106
?? components/products/detail/ProductDetailClient.tsx.bak_valveless_contact_buttons_20260707_134320
?? components/products/detail/product-detail.module.css.bak_application_content_18px_20260706_223105
?? components/products/detail/product-detail.module.css.bak_cta_height_compact_20260706_234610
?? components/products/detail/product-detail.module.css.bak_cta_move_down_50px_20260706_234833
?? components/products/detail/product-detail.module.css.bak_detail_button_pressed_state_20260707_001229
?? components/products/detail/product-detail.module.css.bak_detail_cart_button_selected_state_20260707_000252
?? components/products/detail/product-detail.module.css.bak_faq_cta_move_up_20260706_234438
?? components/products/detail/product-detail.module.css.bak_faq_fixed_area_final_20260706_235148
?? components/products/detail/product-detail.module.css.bak_faq_to_cta_gap_50px_20260706_234946
?? components/products/detail/product-detail.module.css.bak_fix_application_content_smaller_20260706_223014
?? components/products/detail/product-detail.module.css.bak_fix_common_application_same_as_desc_20260706_222853
?? components/products/detail/product-detail.module.css.bak_remove_custom_detail_action_style_20260707_000444
?? components/products/detail/product-detail.module.css.bak_remove_wrong_button_selected_styles_20260707_000704
?? components/products/detail/product-detail.module.css.bak_restore_cta_height_move_down_20260706_234725
?? components/products/selection/ProductCardGrid.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductCardGrid.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductCardGrid.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductCardGrid.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductCardGrid.tsx.bak_open_detail_new_page_20260706_225910
?? components/products/selection/ProductCardGrid.tsx.bak_overall_fix_20260706_162940
?? components/products/selection/ProductCardGrid.tsx.bak_remove_get_detail_href_20260706_162127
?? components/products/selection/ProductFilterPanel.tsx.bak_filter04_two_columns_20260706_215540
?? components/products/selection/ProductSelectionCard.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionCard.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionCard.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_object_child_20260706_163934
?? components/products/selection/ProductSelectionCard.tsx.bak_open_detail_new_page_20260706_230217
?? components/products/selection/ProductSelectionCard.tsx.bak_remove_detail_link_20260706_161438
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_filter_labels_20260706_213305
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_medium_filter_20260706_212928
?? components/products/selection/ProductSelectionClient.tsx.bak_add_intro_product_type_attr_20260706_233805
?? components/products/selection/ProductSelectionClient.tsx.bak_add_valveless_20260707_112624
?? components/products/selection/ProductSelectionClient.tsx.bak_add_valveless_detail_href_20260707_141849
?? components/products/selection/ProductSelectionClient.tsx.bak_before_connect_tubing_selection_20260707130123
?? components/products/selection/ProductSelectionClient.tsx.bak_broken_encoding_20260707_163852
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_continue_20260706_145741
?? components/products/selection/ProductSelectionClient.tsx.bak_diaphragm_selection_20260706_210016
?? components/products/selection/ProductSelectionClient.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionClient.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_base_selection_import_20260706_214932
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_breadcrumb_props_20260706_152816
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_diaphragm_filter01_label_20260706_213533
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_grid_props_format_20260706_162432
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_parse_tail_20260706_145849
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_probe_filter_client_20260707_192436
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_product_selection_type_20260706_162332
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_return_intro_20260706_152558
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_valve_href_20260707_171257
?? components/products/selection/ProductSelectionClient.tsx.bak_force_diaphragm_pool_20260706_211545
?? components/products/selection/ProductSelectionClient.tsx.bak_force_merge_filter04_20260706_214812
?? components/products/selection/ProductSelectionClient.tsx.bak_force_probe_selection_client_20260707_192622
?? components/products/selection/ProductSelectionClient.tsx.bak_merge_diaphragm_filter_labels_20260706_213802
?? components/products/selection/ProductSelectionClient.tsx.bak_overall_fix_20260706_162940
?? components/products/selection/ProductSelectionClient.tsx.bak_probe_series_patch_20260707_192030
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_cart_display_20260706_153601
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_custom_cart_20260706_154636
?? components/products/selection/ProductSelectionClient.tsx.bak_remove_get_detail_href_20260706_162127
?? components/products/selection/ProductSelectionClient.tsx.bak_remove_wrong_top_controls_20260706_220032
?? components/products/selection/ProductSelectionClient.tsx.bak_restore_original_top_components_20260706_220427
?? components/products/selection/ProductSelectionClient.tsx.bak_restore_required_imports_20260706_215310
?? components/products/selection/ProductSelectionClient.tsx.bak_restore_search_category_tabs_20260706_215828
?? components/products/selection/ProductSelectionClient.tsx.bak_runtime_baseSelectionProducts_fix_20260706_215116
?? components/products/selection/ProductSelectionClient.tsx.bak_tubing_make_detail_href_20260707125504
?? components/products/selection/ProductSelectionClient.tsx.bak_valve_route_like_valveless_20260707_163731
?? components/products/selection/ProductSelectionClient.tsx.bak_valve_series_20260707_162504
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_fix_cart_table_header_20260706_155155
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_overall_fix_20260706_162940
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_drawer_body_20260706_154833
?? components/selection-cart/SelectionCartProvider.tsx.bak_card_actions_20260706_145558
?? components/selection-cart/SelectionCartProvider.tsx.bak_final_detail_cart_20260706_163743
?? components/selection-cart/SelectionCartProvider.tsx.bak_force_safe_cart_json_20260707_202732
?? components/selection-cart/SelectionCartProvider.tsx.bak_overall_fix_20260706_162940
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/SelectionCartProvider.tsx.bak_safe_cart_json_20260707_202640
?? components/selection-cart/SelectionCartProvider.tsx.bak_safe_json_parse_20260707_202359
?? components/selection-cart/selection-cart.types.ts.bak_card_actions_20260706_145558
?? data/products/generated/probes/
?? data/products/generated/pumps/diaphragm-pumps/
?? data/products/generated/pumps/pipetting-pumps/detail/index.json.bak_20260707_134743
?? data/products/generated/pumps/pipetting-pumps/detail/index.json.bak_copy_update_20260707_102830
?? data/products/generated/pumps/syringe-pumps/
?? data/products/generated/pumps/valveless-pumps/
?? data/products/generated/tubing/
?? data/products/generated/valves/
?? data/products/selection/card-copy/plunger-pump-card-copy.ts.bak_force_safe_getProductCardSpecs_20260707_163025
?? data/products/selection/card-copy/plunger-pump-card-copy.ts.bak_safe_getProductCardSpecs_20260707_162919
?? data/products/selection/diaphragm-pump-selection.generated.ts
?? data/products/selection/diaphragm-pump-selection.generated.ts.bak_force_8_model_links_20260706144122
?? data/products/selection/diaphragm-pump-selection.generated.ts.bak_patch_8_model_detail_slug_20260706144617
?? data/products/selection/probe-selection.generated.ts
?? data/products/selection/probe-selection.generated.ts.bak_fix_probe_filter_category_20260707_192436
?? data/products/selection/probe-selection.generated.ts.bak_force_needles_category_20260707_192622
?? data/products/selection/probe-selection.generated.ts.bak_probe_show_all_cards_20260707_192941
?? data/products/selection/product-route-map.ts.bak_before_tubing_route_map_20260707125134
?? data/products/selection/product-route-map.ts.bak_diaphragm_intro_text_20260706140919
?? data/products/selection/product-route-map.ts.bak_diaphragm_intro_three_types_20260706141622
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_filter_20260706_212515
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_routes_safe_20260706_212652
?? data/products/selection/product-route-map.ts.bak_fix_series_insert_position_20260706_212801
?? data/products/selection/product-type-intro.ts.bak.image-paths
?? data/products/selection/product-type-intro.ts.bak_diaphragm_halodp_20260706_233513
?? data/products/selection/product-type-intro.ts.bak_diaphragm_intro_text_20260706140919
?? data/products/selection/product-type-intro.ts.bak_diaphragm_intro_three_types_20260706141622
?? data/products/selection/product-type-intro.ts.bak_fix_diaphragm_intro_text_20260706_220635
?? data/products/selection/product-type-intro.ts.bak_remove_detail_text_20260706_161958
?? data/products/selection/product-type-intro.ts.bak_valveless_intro_20260707_112624
?? data/products/selection/syringe-pump-selection.generated.ts
?? data/products/selection/syringe-pump-selection.generated.ts.bak.image-paths
?? data/products/selection/syringe-pump-selection.generated.ts.bak.series-labels
?? data/products/selection/tubing-selection.generated.ts
?? data/products/selection/tubing-selection.generated.ts.bak_before_fix_card_subtitle_newlines_20260707130350
?? data/products/selection/tubing-selection.generated.ts.bak_before_patch_tubing_links_20260707125134
?? data/products/selection/tubing-selection.generated.ts.bak_before_rewrite_clean_tubing_selection_20260707130123
?? data/products/selection/valve-selection.generated.ts
?? data/products/selection/valve-selection.generated.ts.bak_align_like_valveless_20260707_163731
?? data/products/selection/valve-selection.generated.ts.bak_broken_encoding_20260707_162808
?? data/products/selection/valve-selection.generated.ts.bak_chinese_display_20260707_163332
?? data/products/selection/valve-selection.generated.ts.bak_fix_valve_chinese_type_20260707085203
?? data/products/selection/valve-selection.generated.ts.bak_fix_valve_filter_labels_20260707_162717
?? data/products/selection/valve-selection.generated.ts.bak_fix_valve_selection_undefined_20260707_174437
?? data/products/selection/valve-selection.generated.ts.bak_fix_valve_slug_20260707_171257
?? data/products/selection/valve-selection.generated.ts.bak_image_slots_20260707_171950
?? data/products/selection/valve-selection.generated.ts.bak_valve_type_20260707_164928
?? data/products/selection/valveless-pump-selection.generated.ts
?? data/products/selection/valveless-pump-selection.generated.ts.bak_add_rpl_drpl_filter_20260707_112752
?? data/products/selection/valveless-pump-selection.generated.ts.bak_fix_specs_20260707_142659
?? data/products/selection/valveless-pump-selection.generated.ts.bak_rewrite_clean_20260707_144009
?? data/products/selection/valveless-pump-selection.generated.ts.bak_short_drpl_title_20260707_144228
?? data/products/selection/valveless-pump-selection.generated.ts.bak_split_drpl_detail_20260707_144438
?? data/products/selection/valveless-pump-selection.generated.ts.bak_split_drpl_selection_only_20260707_143907
?? detail-button-duplicate-check.md
?? detail-click-real-problem-check.md
?? detail-drawing-cart-real-check.md
?? detail-route-files-check.md
?? diaphragm-current-problem-check.md
?? diaphragm-detail-buttons-check.md
?? diaphragm-detail-final-check.md
?? diaphragm-detail-vs-plunger-detail-check.md
?? diaphragm-faq-real-source-check.md
?? diaphragm-pump-filter-fix-context.md
?? diaphragm-pump-selection-inspect.txt
?? diaphragm-spec-life-motor-check.md
?? extract-detail-button-blocks.js
?? generate-diaphragm-selection-bridge.js
?? "iteProjectsforeach-website-2026componentsselection-cartGlobalSelectionCartDrawer.tsx\357\200\242"
?? plunger-selection-structure-check.txt
?? probe-faq-check-report.md
?? product-selection-top-components-check.md
?? product-type-intro-text-check.md
?? product_card_actions_audit.md
?? product_center_intro_layout_check_and_fix.md
?? product_intro_layout_audit.md
?? product_intro_layout_code_context.md
?? "productsselectionProductSelectionClient.tsx\357\200\242"
?? public/documents/
?? public/images/products/TUBING/fep-tubing/
?? public/images/products/TUBING/peek-tubing/
?? public/images/products/TUBING/pfa-tubing/
?? public/images/products/TUBING/ptfe-tubing/
?? public/images/products/TUBING/pvc-tubing/
?? public/images/products/TUBING/tpu-tubing/
?? public/images/products/probes/
?? public/images/products/pumps/pipetting-pumps/
?? public/images/products/valves/
?? public/models/
?? rewrite-diaphragm-clean-faqs.js
?? safe-detail-button-text-state.js
?? scripts/products/add-probe-faq-2-items.cjs
?? scripts/products/add-probe-series-pages.cjs
?? scripts/products/add-tubing-detail-pages-clean.cjs
?? scripts/products/add-valve-series-selection.cjs
?? scripts/products/adjust-valve-cta-offset-65px.cjs
?? scripts/products/adjust-valve-cta-offset-90px.cjs
?? scripts/products/audit-syringe-pump-detail-pages.cjs
?? scripts/products/audit-syringe-pump-selection-page.cjs
?? scripts/products/audit-valveless-pump-detail-specs.js
?? scripts/products/audit-valveless-pump-detail-specs.js.bak_split_drpl_detail_20260707_144438
?? scripts/products/check-probe-faq-display.cjs
?? scripts/products/connect-syringe-pump-selection-page.cjs
?? scripts/products/connect-tubing-selection-products.cjs
?? scripts/products/create-static-tubing-pages.cjs
?? scripts/products/create-syringe-pump-detail-pages.cjs
?? scripts/products/create-tubing-detail-json.cjs
?? scripts/products/fix-hp-description-copy.cjs
?? scripts/products/fix-hp-solenoid-detail-copy-and-specs.cjs
?? scripts/products/fix-mrv3-detail-copy-and-specs.cjs
?? scripts/products/fix-probe-selection-filter.cjs
?? scripts/products/fix-rotary-solenoid-description-copy.cjs
?? scripts/products/fix-syringe-pump-detail-faq-cta.cjs
?? scripts/products/fix-syringe-pump-detail-specs-alias.cjs
?? scripts/products/fix-syringe-pump-image-paths.cjs
?? scripts/products/fix-syringe-pump-real-specs.cjs
?? scripts/products/fix-tubing-card-subtitle-three-lines.cjs
?? scripts/products/fix-tubing-generic-static-params.cjs
?? scripts/products/fix-tubing-image-and-use-existing-cta.cjs
?? scripts/products/fix-tubing-images-and-engineer-cta.cjs
?? scripts/products/fix-tubing-selection-links.cjs
?? scripts/products/fix-tubing-specs-catalog-only.cjs
?? scripts/products/fix-tubing-specs-from-catalog-table.cjs
?? scripts/products/fix-valve-bottom-cta-render.cjs
?? scripts/products/fix-valve-cta-overlap-safe-40px.cjs
?? scripts/products/fix-valve-cta-visible-safe-spacing.cjs
?? scripts/products/fix-valve-detail-css-module.cjs
?? scripts/products/fix-valve-detail-static-params.cjs
?? scripts/products/fix-valve-type-display.cjs
?? scripts/products/fix-valve-undefined-link.cjs
?? scripts/products/force-fix-probe-selection-visible.cjs
?? scripts/products/force-probe-5-faq.cjs
?? scripts/products/generate-pipetting-pump-detail-data.js.bak_20260707_134743
?? scripts/products/generate-pipetting-pump-detail-data.js.bak_copy_update_20260707_102830
?? scripts/products/generate-valveless-pump-detail-data.js
?? scripts/products/generate-valveless-pump-detail-data.js.bak_20260707_134457
?? scripts/products/generate-valveless-pump-detail-data.js.bak_fix_additional_images_20260707_133743
?? scripts/products/generate-valveless-pump-detail-data.js.bak_fix_specs_20260707_142659
?? scripts/products/generate-valveless-pump-detail-data.js.bak_force_drpl_h1_model_20260707_144905
?? scripts/products/generate-valveless-pump-detail-data.js.bak_force_drpl_specs_20260707_142932
?? scripts/products/make-probe-show-all-cards.cjs
?? scripts/products/move-probe-inquiry-banner-up-20px.cjs
?? scripts/products/move-valve-cta-up-200px.cjs
?? scripts/products/optimize-valve-detail-h1-app-cta.cjs
?? scripts/products/patch-tubing-model-placeholder-only.cjs
?? scripts/products/patch-tubing-selection-make-detail-href.cjs
?? scripts/products/remove-solenoid-spec-rows.cjs
?? scripts/products/remove-syringe-pump-config-mode-spec.cjs
?? scripts/products/remove-syringe-pump-model-code-specs.cjs
?? scripts/products/repair-broken-json-small.cjs
?? scripts/products/repair-probe-json-and-force-5-faq.cjs
?? scripts/products/repair-valve-current-errors.cjs
?? scripts/products/restore-valve-detail-to-rpl-style.cjs
?? scripts/products/rewrite-all-probe-custom-items.cjs
?? scripts/products/rewrite-valve-custom-detail.cjs
?? scripts/products/rewrite-valve-detail-seo-copy.cjs
?? scripts/products/rewrite-valve-selection-by-type.cjs
?? scripts/products/shorten-valve-apps-and-set-image-slots.cjs
?? scripts/products/split-drpl-detail-pages.js
?? scripts/products/update-probe-custom-confirm-items.cjs
?? scripts/products/update-syringe-pump-series-labels.cjs
?? scripts/products/update-valve-cta-button-text.cjs
?? scripts/products/write-valve-faq-and-cta.cjs
?? selection_cart_overall_audit.md
?? stabilize-diaphragm-button-flags.js
?? use-plunger-list-toggle-style.js
?? valve-series-code-scan-report.md
?? valveless-selection-key-files.txt
?? "\357\200\272"
?? "\357\200\272s\357\200\252subtitles\357\200\252\357\200\277s\357\200\252[s\357\200\252subtitles\357\200\252]s\357\200\252\357\200\272s\357\200\252[s\357\200\252],',"
```
