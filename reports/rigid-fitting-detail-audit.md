# 硬管接头详情页定位报告

生成时间：2026-07-12 05:56:21

目标：定位硬管接头详情页的路由、数据、适配器、组件和生成脚本，后续倒刺接头直接复用其页面结构。

## 命中文件

- `app\products\probes\[slug]\page.tsx`
- `app\products\pumps\diaphragm-pumps\[slug]\page.tsx`
- `app\products\pumps\pipetting-pumps\[slug]\page.tsx`
- `app\products\pumps\plunger-pumps\[slug]\page.tsx`
- `app\products\pumps\syringe-pumps\[slug]\page.tsx`
- `app\products\pumps\valveless-pumps\[slug]\page.tsx`
- `app\products\tubing\_components\TubingDetailStaticPage.tsx`
- `app\products\valves\[slug]\page.tsx`
- `app\products\[category]\[slug]\[seriesSlug]\page.tsx`
- `app\products\[category]\[slug]\page.tsx`
- `components\products\detail\ProductDetailClient.tsx`
- `components\products\detail\ProductModelViewer.tsx`
- `components\products\selection\ProductCardGrid.tsx`
- `components\products\selection\ProductSelectionCard.tsx`
- `components\products\selection\ProductSelectionClient.tsx`
- `data\products\generated\fittings\hard-tube-fittings\detail\index.json`
- `data\products\generated\pumps\pipetting-pumps\detail\index.json`
- `data\products\generated\pumps\pipetting-pumps\selection.generated.ts`
- `data\products\generated\pumps\syringe-pumps\detail\index.json`
- `data\products\generated\pumps\valveless-pumps\detail\index.json`
- `data\products\generated\pumps\valveless-pumps\selection\index.json`
- `data\products\generated\pumps\pump-series.detail.generated.ts`
- `data\products\generated\pumps\pump-series.routes.generated.ts`
- `data\products\generated\pumps\pump-series.selection.generated.ts`
- `data\products\selection\barbed-fitting-selection.generated.ts`
- `data\products\selection\hard-tube-fitting-image-map.generated.json`
- `data\products\selection\hard-tube-fitting-selection.generated.ts`
- `data\products\selection\hard-tube-fitting-selection.summary.json`
- `data\products\selection\probe-selection.generated.ts`
- `data\products\selection\product-route-map.ts`
- `data\products\selection\product-selection.types.ts`
- `data\products\selection\tubing-selection.generated.ts`
- `data\products\selection\types.ts`
- `data\products\selection\valve-selection.generated.ts`
- `scripts\products\add-probe-series-pages.cjs`
- `scripts\products\add-series-faq-structure.js`
- `scripts\products\add-tubing-detail-pages-clean.cjs`
- `scripts\products\add-valve-series-selection.cjs`
- `scripts\products\apply-plunger-pump-formal-copy.js`
- `scripts\products\audit-plunger-wrong-route-md.cjs`
- `scripts\products\audit-pump-series-content-detail.js`
- `scripts\products\audit-valveless-pump-detail-specs.js`
- `scripts\products\build-pump-series-data.js`
- `scripts\products\check-probe-faq-display.cjs`
- `scripts\products\check-selection-detail-copy-separation.js`
- `scripts\products\connect-syringe-pump-selection-page.cjs`
- `scripts\products\connect-tubing-selection-products.cjs`
- `scripts\products\create-pump-series-xlsx-template.js`
- `scripts\products\create-static-tubing-pages.cjs`
- `scripts\products\create-syringe-pump-detail-pages.cjs`
- `scripts\products\final-guard-product-card-href.cjs`
- `scripts\products\fix-mrv3-detail-copy-and-specs.cjs`
- `scripts\products\fix-plunger-assets-use-current-public-folder.js`
- `scripts\products\fix-plunger-card-subtitle-mojibake.cjs`
- `scripts\products\fix-plunger-detail-adapter-clean.js`
- `scripts\products\fix-plunger-detail-assets-request-links.js`
- `scripts\products\fix-plunger-detail-image-and-assets-safe.js`
- `scripts\products\fix-plunger-detail-image-and-assets.js`
- `scripts\products\fix-plunger-detail-link-final.js`
- `scripts\products\fix-plunger-public-assets-auto-match.js`
- `scripts\products\fix-plunger-public-assets-final-clean.js`
- `scripts\products\fix-plunger-pump-detail-routing.js`
- `scripts\products\fix-plunger-wrong-probe-route.cjs`
- `scripts\products\fix-probe-selection-filter.cjs`
- `scripts\products\fix-product-detail-client-asset-fields.js`
- `scripts\products\fix-product-model-viewer-stage.js`
- `scripts\products\fix-selection-client-detailhref-href-type.cjs`
- `scripts\products\fix-selection-types-missing.cjs`
- `scripts\products\fix-syringe-detail-data-type-cast.cjs`
- `scripts\products\fix-syringe-detail-required-fields.cjs`
- `scripts\products\fix-syringe-pump-detail-faq-cta.cjs`
- `scripts\products\fix-syringe-pump-detail-specs-alias.cjs`
- `scripts\products\fix-tubing-card-subtitle-three-lines.cjs`
- `scripts\products\fix-tubing-image-and-use-existing-cta.cjs`
- `scripts\products\fix-tubing-images-and-engineer-cta.cjs`
- `scripts\products\fix-tubing-selection-links.cjs`
- `scripts\products\fix-valve-bottom-cta-render.cjs`
- `scripts\products\fix-valve-type-display.cjs`
- `scripts\products\fix-valve-undefined-link.cjs`
- `scripts\products\fix-valveless-detail-required-fields-and-type.cjs`
- `scripts\products\fix-valveless-pump-detail-specs.js`
- `scripts\products\force-fix-plunger-wrong-probe-href.cjs`
- `scripts\products\force-fix-probe-selection-visible.cjs`
- `scripts\products\generate-hard-tube-fitting-detail-data.cjs`
- `scripts\products\generate-hard-tube-fitting-selection.cjs`
- `scripts\products\generate-pipetting-pump-detail-data.js`
- `scripts\products\generate-valveless-pump-detail-data.js`
- `scripts\products\hide-detail-product-name.js`
- `scripts\products\import-hard-tube-fitting-images.cjs`
- `scripts\products\move-valve-cta-up-200px.cjs`
- `scripts\products\normalize-pump-series-data-source.js`
- `scripts\products\optimize-valve-detail-h1-app-cta.cjs`
- `scripts\products\patch-faq-accordion.js`
- `scripts\products\patch-faq-clean-accordion-style.js`
- `scripts\products\patch-faq-spacing-animation.js`
- `scripts\products\patch-tubing-model-placeholder-only.cjs`
- `scripts\products\patch-tubing-selection-make-detail-href.cjs`
- `scripts\products\remove-zh-faq-label.js`
- `scripts\products\repair-valve-current-errors.cjs`
- `scripts\products\restore-valve-detail-to-rpl-style.cjs`
- `scripts\products\rewrite-valve-detail-seo-copy.cjs`
- `scripts\products\rewrite-valve-selection-by-type.cjs`
- `scripts\products\setup-barbed-fitting-selection-step1.cjs`
- `scripts\products\split-drpl-detail-pages.js`
- `scripts\products\unify-product-selection-product-types.cjs`
- `scripts\products\update-probe-custom-confirm-items.cjs`
- `scripts\products\write-valve-faq-and-cta.cjs`

## app\products\probes\[slug]\page.tsx

```text
    1 | import type { ComponentType } from "react";
    2 | 
    3 | import { notFound } from "next/navigation";
    4 | 
    5 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    6 | import probeDetailData from "@/data/products/generated/probes/detail/index.json";
    7 | 
    8 | type ProbeDetailRecord = {
    9 |   slug: string;
   10 |   productTypeId: string;
   35 |   bottomCtaHref?: string;
   36 | };
   37 | 
   38 | const details = probeDetailData as ProbeDetailRecord[];
   39 | 
   40 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   41 |   data: any;
   42 | }>;
   43 | 
   44 | export const dynamicParams = false;
   45 | 
  204 |       buttonText: detail.bottomCtaButtonText || "联系工程师",
  205 |       href: detail.bottomCtaHref || "/contact",
  206 |     },
  207 | 
  208 |     selectionHref: "/products",
  209 |     detailHref: "/products/probes/" + detail.slug,
  210 | 
  211 |     sourceType: "probe-detail",
  212 |   };
  213 | }
  214 | 
```

## app\products\pumps\diaphragm-pumps\[slug]\page.tsx

```text
    1 | import { notFound } from "next/navigation";
    2 | import type { ComponentType } from "react";
    3 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    4 | 
    5 | import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";
    6 | 
    7 | export const dynamicParams = false;
    8 | 
   82 |   media?: DiaphragmMedia[];
   83 | };
   84 | 
   85 | const details = detailsJson as DiaphragmDetail[];
   86 | 
   87 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   88 |   data: any;
   89 | }>;
   90 | 
   91 | function getText(value: unknown) {
   92 |   return String(value || "").trim();
  184 | 
  185 | function normalizeSpecGroupTitle(value: unknown) {
  186 |   const title = getText(value);
  187 | 
  188 |   /*
  189 |    * ProductDetailClient 外层已经显示“规格参数”。
  190 |    * 如果数据分组标题也叫“规格参数”，页面会出现重复标题。
  191 |    * 这里仅针对隔膜泵详情页做显示层归一，不改原始参数数据。
  192 |    */
  193 |   if (!title || title === "规格参数") {
  194 |     return "技术参数";
  440 |   const parts = [series, motorType, productType].filter(Boolean);
  441 | 
  442 |   return parts.length > 0 ? parts.join(" ") : fallbackTitle;
  443 | }
  444 | 
  445 | function adaptToProductDetailClientData(detail: DiaphragmDetail) {
  446 |   const slug = normalizeSlug(detail.slug);
  447 |   const title = getText(detail.title || detail.displayName || detail.seriesId);
  448 |   const cleanModelCode = getCleanDiaphragmModelCode(detail);
  449 |   const seoProductTitle = getDiaphragmSeoProductTitle(detail, cleanModelCode, title);
  450 |   const seriesId = getText(detail.seriesId);
  602 | 
  603 |   if (!detail) {
  604 |     return null;
  605 |   }
  606 | 
  607 |   return adaptToProductDetailClientData(detail);
  608 | }
  609 | 
  610 | export function generateStaticParams() {
  611 |   return details
  612 |     .map((item) => normalizeSlug(item.slug))
```

## app\products\pumps\pipetting-pumps\[slug]\page.tsx

```text
    1 | import { notFound } from "next/navigation";
    2 | import type { ComponentType } from "react";
    3 | import type { Metadata } from "next";
    4 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    5 | 
    6 | import detailsJson from "@/data/products/generated/pumps/pipetting-pumps/detail/index.json";
    7 | 
    8 | export const dynamicParams = false;
    9 | 
   52 |   additionalImages?: string[];
   53 |   showConfigurator?: boolean;
   54 |   showDatasheetRequest?: boolean;
   55 |   showDrawingRequest?: boolean;
   56 |   show3DRequest?: boolean;
   57 |   detailHref?: string;
   58 |   selectionHref?: string;
   59 |   specSeriesKey?: string;
   60 |   model3dUrl?: string;
   61 |   drawing2dUrl?: string;
   62 |   drawingPdfUrl?: string;
   77 |   };
   78 | };
   79 | 
   80 | const details = detailsJson as DetailRecord[];
   81 | 
   82 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   83 |   data: any;
   84 | }>;
   85 | 
   86 | function getText(value: unknown) {
   87 |   return String(value || "").trim();
  170 |         title: "技术参数",
  171 |         items: specs,
  172 |       },
  173 |     ],
  174 |     faqs,
  175 |     detailHref: detail.detailHref || `/products/pumps/pipetting-pumps/${detail.slug}`,
  176 |     href: detail.detailHref || `/products/pumps/pipetting-pumps/${detail.slug}`,
  177 |     selectionHref: detail.selectionHref || "/products/pumps/pipetting-pumps",
  178 |     modelDisplay: detail.modelDisplay || detail.model,
  179 |     displayModel: detail.displayModel || detail.model,
  180 |     foreachModel: detail.foreachModel || detail.model,
  181 |     productCode: detail.productCode || detail.modelDisplay || detail.displayModel || detail.model,
```

## app\products\pumps\plunger-pumps\[slug]\page.tsx

```text
    1 | import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
    2 | import nodePath from "node:path";
    3 | import nodeFs from "node:fs";
    4 | import { notFound } from "next/navigation";
    5 | import type { ComponentType } from "react";
    6 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    7 | import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
    8 | import { selectionProducts } from "@/data/products/selection/product-selection.generated";
    9 | 
   10 | function getLocalizedSelectionText(
   11 |   value: string | { zh?: string; en?: string; [key: string]: string | undefined } | undefined,
   27 |   params: Promise<PageParams>;
   28 | };
   29 | 
   30 | type DetailRecord = Record<string, any>;
   31 | 
   32 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   33 |   data: any;
   34 | }>;
   35 | 
   36 | const LEGACY_SLUG_ALIASES: Record<string, string> = {
   37 |   "ea-standard-piston-pumps": "ea-100-pmma",
  407 | 
  408 | 
  409 | 
  410 | 
  411 | 
  412 | function adaptToProductDetailClientData(detail: DetailRecord) {
  413 |   const model = getText(detail.model || detail.name || detail.title);
  414 |   const slug = getRecordSlug(detail);
  415 |   const seriesName = getText(detail.seriesName || detail.series);
  416 |   const seriesCode = getText(detail.seriesCode);
  417 |   const capacity = getText(detail.capacity);
  573 | 
  574 |   if (!legacyDetail) {
  575 |     return null;
  576 |   }
  577 | 
  578 |   return adaptToProductDetailClientData(legacyDetail);
  579 | }
  580 | 
  581 | export function generateStaticParams() {
  582 |   const detailParams = getDetailList()
  583 |     .map((item) => getRecordSlug(item))
```

## app\products\pumps\syringe-pumps\[slug]\page.tsx

```text
    1 | import { notFound } from "next/navigation";
    2 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    3 | import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
    4 | 
    5 | type Detail = (typeof syringePumpDetails)[number];
    6 | 
    7 | function toClientData(detail: Detail) {
   36 |     showDatasheetRequest: false,
   37 | 
   38 |     customInquiryHref: "/contact",
   39 |     contactHref: "/contact",
   40 |     selectionHref: "/products/pumps/syringe-pumps",
   41 |     detailHref: `/products/pumps/syringe-pumps/${detail.slug}`,
   42 | 
   43 |     specs: Array.isArray((detail as any).specs)
   44 |       ? (detail as any).specs
   45 |       : Array.isArray((detail as any).specifications)
   46 |         ? (detail as any).specifications
   97 | 
   98 |   if (!detail) {
   99 |     notFound();
  100 |   }
  101 | 
  102 |   return <ProductDetailClient data={toClientData(detail) as any} />;
  103 | }
```

## app\products\pumps\valveless-pumps\[slug]\page.tsx

```text
    1 | import type { Metadata } from "next";
    2 | import { notFound } from "next/navigation";
    3 | 
    4 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    5 | import details from "@/data/products/generated/pumps/valveless-pumps/detail/index.json";
    6 | 
    7 | type ValvelessPumpDetail = (typeof details)[number];
    8 | 
    9 | type ValvelessPumpDetailPageProps = {
   97 |           },
   98 |         ],
   99 | 
  100 |     faqs,
  101 | 
  102 |     detailHref:
  103 |       detail.detailHref || `/products/pumps/valveless-pumps/${detail.slug}`,
  104 |     href: detail.href || `/products/pumps/valveless-pumps/${detail.slug}`,
  105 |     selectionHref: detail.selectionHref || "/products/pumps/valveless-pumps",
  106 | 
  107 |     modelDisplay: detail.modelDisplay || "定制配置请联系我们",
  108 |     displayModel: detail.displayModel || "定制配置请联系我们",
  155 | 
  156 |   if (!detail) {
  157 |     notFound();
  158 |   }
  159 | 
  160 |   return <ProductDetailClient data={toClientData(detail) as any} />;
  161 | }
```

## app\products\tubing\_components\TubingDetailStaticPage.tsx

```text
    1 | import type { ComponentType } from "react";
    2 | import type { Metadata } from "next";
    3 | import { notFound } from "next/navigation";
    4 | 
    5 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    6 | import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
    7 | 
    8 | type FaqItem = {
    9 |   question?: string;
   10 |   answer?: string;
   40 |   bottomCtaHref?: string;
   41 | };
   42 | 
   43 | const records = tubingDetailData as TubingDetailRecord[];
   44 | 
   45 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   46 |   data: any;
   47 | }>;
   48 | 
   49 | function findDetail(slug: string) {
   50 |   return records.find((item) => item.slug === slug);
```

## app\products\valves\[slug]\page.tsx

```text
    1 | import type { ComponentType } from "react";
    2 | 
    3 | import { notFound } from "next/navigation";
    4 | 
    5 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    6 | import valveDetailData from "@/data/products/generated/valves/detail/index.json";
    7 | 
    8 | type ValveDetailRecord = {
    9 |   slug: string;
   10 |   productTypeId: string;
   38 | };
   39 | 
   40 | const details = valveDetailData as ValveDetailRecord[];
   41 | 
   42 | /*
   43 |   ProductDetailClient 是官网已有公共详情页组件。
   44 |   阀系列详情页不重新设计页面，只把数据适配成该组件需要的结构。
   45 | */
   46 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   47 |   data: any;
   48 | }>;
   49 | 
   50 | export const dynamicParams = false;
   51 | 
   66 | function getDetailBySlug(slug: string) {
   67 |   return details.find((item) => item.slug === slug);
   68 | }
   69 | 
   70 | /*
   71 |   将阀系列数据转换为 ProductDetailClient 可以识别的数据。
   72 |   这里参考 RPL 无阀泵定制品写法：
   73 |   - 型号显示为“定制配置请联系我们”
   74 |   - 不显示标准型号选择
   75 |   - 保留添加图纸 / 加入清单逻辑
   76 |   - 传 additionalImages / images / thumbnails 空数组，避免轮播读取报错
  178 |     datasheetUrl: "",
  179 | 
  180 |     /*
  181 |       公共详情页图片字段。
  182 |       additionalImages / images / thumbnails 必须给空数组，
  183 |       避免 ProductDetailClient 读取 forEach / map 时报错。
  184 |     */
  185 |     image,
  186 |     imagePath: image,
  187 |     imageUrl: image,
  188 |     mainImage: valveMainImage,
  194 |     additionalImages: valveExtraImages,
  195 |     images: [],
  196 |     thumbnails: valveExtraImages,
  197 | 
  198 |     selectionHref: "/products",
  199 |     detailHref: "/products/valves/" + detail.slug,
  200 | 
  201 |     faqs: Array.isArray(detail.faq)
  202 |       ? detail.faq.map((item) => ({
  203 |           ...item,
  204 |           q: item.question,
```

## app\products\[category]\[slug]\[seriesSlug]\page.tsx

```text
    2 | import type { Metadata } from "next";
    3 | import { notFound } from "next/navigation";
    4 | import { Suspense } from "react";
    5 | 
    6 | import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
    7 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    8 | import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
    9 | 
   10 | import {
   11 |   getSeriesRouteParams,
   12 |   resolveSeriesRoute,
   13 | } from "@/data/products/selection/product-route-map";
   14 | 
   15 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
   16 | 
   17 | import "../../../products.css";
   18 | 
   19 | type ProductsSeriesRoutePageProps = {
   20 |   params: Promise<{
   67 | 
   68 | const hardTubeDetails =
   69 |   hardTubeDetailsJson as HardTubeDetailRecord[];
   70 | 
   71 | const ProductDetailView =
   72 |   ProductDetailClient as unknown as ComponentType<{
   73 |     data: any;
   74 |   }>;
   75 | 
   76 | export const dynamicParams = false;
   77 | 
   89 |   slug: string,
   90 |   seriesSlug: string
   91 | ) {
   92 |   if (
   93 |     category !== "fittings" ||
   94 |     slug !== "hard-tube-fittings"
   95 |   ) {
   96 |     return null;
   97 |   }
   98 | 
   99 |   const targetSlug =
  127 |     category: "fittings",
  128 |     categoryId: "fittings",
  129 |     categoryLabel: "接头系列",
  130 | 
  131 |     productTypeId:
  132 |       "hard-tube-fittings",
  133 | 
  134 |     productTypeName:
  135 |       detail.productTypeName ||
  136 |       detail.name ||
  137 |       "硬管接头",
  138 | 
  139 |     slug: detail.slug,
  140 |     model: detail.model,
  141 | 
  142 |     name:
  191 | 
  192 |     detailMode: "standard_model",
  193 | 
  194 |     /*
  195 |      * 保留公共详情页原来的型号选择按钮。
  196 |      * 硬管接头会显示“此功能暂未开通”。
  197 |      */
  198 |     hideModelAction: false,
  199 | 
  200 |     showConfigurator: false,
  201 |     showDatasheetRequest: false,
  205 |      */
  206 |     showDrawingRequest: true,
  207 | 
  208 |     show3DRequest: false,
  209 | 
  210 |     detailHref:
  211 |       `/products/fittings/hard-tube-fittings/${detail.slug}`,
  212 | 
  213 |     href:
  214 |       `/products/fittings/hard-tube-fittings/${detail.slug}`,
  215 | 
  216 |     selectionHref:
  217 |       "/products/fittings/hard-tube-fittings",
  218 |   };
  219 | }
  220 | 
  221 | export function generateStaticParams() {
  222 |   const existingSeriesParams =
  223 |     getSeriesRouteParams();
  224 | 
  225 |   const hardTubeParams =
  226 |     hardTubeDetails.map((detail) => ({
  227 |       category: "fittings",
  228 |       slug: "hard-tube-fittings",
  229 |       seriesSlug:
  230 |         normalizeSegment(detail.slug),
  231 |     }));
  232 | 
  233 |   const routeMap = new Map<
```

## app\products\[category]\[slug]\page.tsx

```text
   20 | import type { Metadata } from "next";
   21 | import { notFound } from "next/navigation";
   22 | import { Suspense } from "react";
   23 | 
   24 | import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
   25 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   26 | import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
   27 | 
   28 | import {
   29 |   getProductTypeRouteParams,
   30 |   resolveProductTypeRoute,
   81 | /* =========================================================
   82 |    智控模块详情数据适配器
   83 | 
   84 |    说明：
   85 |    1. control-module-detail.generated.ts 是智控模块自己的数据结构；
   86 |    2. ProductDetailClient 使用的是统一详情页展示结构；
   87 |    3. 这里把智控数据转成 ProductDetailClient 可以直接渲染的字段；
   88 |    4. 不新建独立页面，不新建独立样式，继续复用公共详情页。
   89 | ========================================================= */
   90 | 
   91 | const CONTROL_MODULE_DETAIL_IMAGE_MAP: Record<string, string> = {
   92 |   "abd-air-bubble-detector": "/images/products/control/foreach-abd-air-bubble-detector.webp",
  138 |     imagePath: controlModuleMainImage,
  139 |     imageUrl: controlModuleMainImage,
  140 |     heroImage: mainImage,
  141 |     additionalImages: [],
  142 | 
  143 |     detailHref: `/products/control/${detail.slug}`,
  144 |     href: `/products/control/${detail.slug}`,
  145 |     selectionHref: "/products",
  146 |     modelSelectionHref: "/products",
  147 |     contactHref: "/contact",
  148 | 
  250 |     if (!controlDetail) {
  251 |       notFound();
  252 |     }
  253 | 
  254 |     return (
  255 |       <ProductDetailClient
  256 |         data={getControlModuleProductDetailData(controlDetail)}
  257 |       />
  258 |     );
  259 |   }
  260 | 
  265 | 
  266 |   if (!pageData) {
  267 |     notFound();
  268 |   }
  269 | 
  270 |   return <ProductDetailClient data={pageData} />;
  271 | }
```

## components\products\detail\ProductDetailClient.tsx

```text
    2 | 
    3 | 
    4 | import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
    5 | import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
    6 | /* =========================================================
    7 |    ProductDetailClient.tsx
    8 |    恒永达官网｜中文产品详情页
    9 | 
   10 |    重要说明：
   11 |    1. 页面结构严格按照用户提供的 HTML 转换。
   12 |    2. 未经要求，不调整原始布局、间距、字号与视觉。
   28 | import ProductModelViewer from "./ProductModelViewer";
   29 | import styles from "./product-detail.module.css";
   30 | 
   31 | type ProductDetailTab = "spec" | "model3d" | "drawing";
   32 | 
   33 | type ProductDetailClientProps = {
   34 |   data: ProductDetailPageData & Record<string, any>;
   35 | };
   36 | 
   37 | type ZoomStyle = CSSProperties & {
   38 |   "--zoom-x"?: string;
  149 | function isHardTubeFittingDetailData(data: any): boolean {
  150 |   return (
  151 |     data?.sourceType === "fitting-detail" ||
  152 |     (
  153 |       data?.categoryId === "fittings" &&
  154 |       data?.productTypeId === "hard-tube-fittings"
  155 |     )
  156 |   );
  157 | }
  158 | 
  159 | function getModelActionText(data: any): string {
  242 | 
  243 | 
  244 | /*
  245 |   VALVE_DETAIL_BOTTOM_CTA_20260708
  246 | 
  247 |   阀系列详情页复用公共 ProductDetailClient。
  248 |   这里单独识别阀系列数据，避免底部 CTA 回退到柱塞泵，或直接不显示。
  249 | */
  250 | function isValveDetailData(data: any): boolean {
  251 |   return (
  252 |     data?.sourceType === "valve-detail" ||
  308 | 
  309 | 
  310 | /*
  311 |   PROBE_DETAIL_BOTTOM_CTA_20260708
  312 | 
  313 |   针系列详情页复用公共 ProductDetailClient。
  314 |   这里单独识别针系列数据，避免底部 CTA 回退到其他产品系列，或直接不显示。
  315 | */
  316 | function isProbeDetailData(data: any): boolean {
  317 |   return (
  318 |     data?.sourceType === "probe-detail" ||
  510 |       </div>
  511 |     </section>
  512 |   );
  513 | }
  514 | 
  515 | export default function ProductDetailClient({
  516 |   data,
  517 | }: ProductDetailClientProps) {
  518 |     const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();
  519 | 
  520 | const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  521 |   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  522 |   const [activeThumb, setActiveThumb] = useState(0);
  645 |               : isPipettingPumpDetailData(data)
  646 |                 ? "移液泵"
  647 |                 : "产品")
  648 |         ).trim();
  649 | 
  650 |     const fallbackDetailHref = data.slug
  651 |       ? isPlungerPumpDetailData(data)
  652 |         ? `/products/pumps/plunger-pumps/${data.slug}`
  653 |         : isDiaphragmPumpDetailData(data)
  654 |           ? `/products/pumps/diaphragm-pumps/${data.slug}`
  655 |           : isPipettingPumpDetailData(data)
  673 |         data.image ||
  674 |         data.imageUrl ||
  675 |         data.mainImage ||
  676 |         data.heroImage ||
  677 |         "",
  678 |       detailHref:
  679 |         data.detailHref ||
  680 |         data.href ||
  681 |         fallbackDetailHref,
  682 |     };
  683 |   }
  684 | 
  685 |   
  686 |   const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
```

## components\products\detail\ProductModelViewer.tsx

```text
    6 | 
    7 |    说明：
    8 |    1. @google/model-viewer 是浏览器端 Web Component
    9 |    2. 不能在文件顶部直接 import，否则构建时可能报 self is not defined
   10 |    3. 这里改为 useEffect 内动态 import，只在浏览器端加载
   11 |    4. 同时兼容现有 ProductDetailClient.tsx 传入的 slug / modelName / modelUrl
   12 | ========================================================= */
   13 | 
   14 | import { createElement, useEffect, useState } from "react";
   15 | import styles from "./product-detail.module.css";
   16 | 
```

## components\products\selection\ProductCardGrid.tsx

```text
    9 |   detailButtonText: string;
   10 |   addToListText: string;
   11 |   addedToListText: string;
   12 |   getTitle: (product: ProductSelectionProductItem) => string;
   13 |   getSubtitle: (product: ProductSelectionProductItem) => string;
   14 |   getDetailHref: (product: ProductSelectionProductItem) => string;
   15 |   onToggleList: (product: ProductSelectionProductItem) => void;
   16 | };
   17 | 
   18 | export default function ProductCardGrid({
   19 |   products,
   21 |   detailButtonText,
   22 |   addToListText,
   23 |   addedToListText,
   24 |   getTitle,
   25 |   getSubtitle,
   26 |   getDetailHref,
   27 |   onToggleList,
   28 | }: ProductCardGridProps) {
   29 |   return (
   30 |     <div className="product-grid">
   31 |       {products.map((product) => {
   35 |         return (
   36 |           <ProductSelectionCard
   37 |             product={product}
   38 |             title={title}
   39 |             subtitle={subtitle}
   40 |             detailHref={getDetailHref(product)}
   41 |             isAdded={selectedList.has(product.productId)}
   42 |             detailButtonText={detailButtonText}
   43 |             addToListText={addToListText}
   44 |             addedToListText={addedToListText}
   45 |             key={product.productId}
```

## components\products\selection\ProductSelectionCard.tsx

```text
    8 | 
    9 | type ProductSelectionCardProps = {
   10 |   product: ProductSelectionProductItem;
   11 |   title: string;
   12 |   subtitle: string;
   13 |   detailHref: string;
   14 |   isAdded: boolean;
   15 |   detailButtonText: string;
   16 |   addToListText: string;
   17 |   addedToListText: string;
   18 |   onToggleList: (product: ProductSelectionProductItem) => void;
  112 | 
  113 |   卡片最终 href 出口保护：
  114 |   如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  115 |   在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
  116 | */
  117 | function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {
  118 |   const rawHref = String(href || "").trim();
  119 | 
  120 |   const hrefSlug = rawHref
  121 |     .split("/")
  122 |     .filter(Boolean)
  153 | 
  154 | export default function ProductSelectionCard({
  155 |   product,
  156 |   title,
  157 |   subtitle,
  158 |   detailHref,
  159 |   isAdded,
  160 |   detailButtonText,
  161 |   addToListText,
  162 |   addedToListText,
  163 |   onToggleList,
  165 |   const pathname = usePathname();
  166 |   const locale = getLocaleFromPathname(pathname);
  167 |   const cardText = CARD_TEXT[locale];
  168 |   const safeTitle = toDisplayText(title) || product.productId;
  169 |   const safeSubtitle = toDisplayText(subtitle);
  170 |   const safeDetailHref = normalizeCardDetailHref(product, detailHref);
  171 |   const cardSpecs = getProductCardSpecs(product, locale)
  172 |     .map((spec) => toDisplayText(spec))
  173 |     .filter(Boolean);
  174 | 
  175 |   return (
  196 |         ) : safeSubtitle ? (
  197 |           <p className="product-card-summary">{safeSubtitle}</p>
  198 |         ) : null}
  199 | 
  200 |         <div className="product-actions">
  201 |           <a className="product-link" href={safeDetailHref} target="_blank" rel="noopener noreferrer">
  202 |             {detailButtonText}
  203 |           </a>
  204 | 
  205 |           <button
  206 |             className={isAdded ? "list-toggle active" : "list-toggle"}
```

## components\products\selection\ProductSelectionClient.tsx

```text
   48 | import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
   49 | import {
   50 |   hardTubeFittingFilterLabels,
   51 |   hardTubeFittingSelectionProducts,
   52 |   hardTubeFittingTaxonomyItems,
   53 | } from "@/data/products/selection/hard-tube-fitting-selection.generated";
   54 | import {
   55 |   barbedFittingFilterLabels,
   56 |   barbedFittingSelectionProducts,
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
  435 |   filterKey: SelectionFilterKey,
  436 |   selectedFilters: SelectedFilterMap,
  437 |   productTypeId: string
  438 | ) {
  439 |   /*
  440 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  441 |    *
  442 |    * 例如：
  443 |    * 1.6 mm|1.8 mm|2.0 mm
  444 |    *
  445 |    * 左侧筛选必须拆成三个独立选项。
  446 |    */
  447 |   if (
  448 |     productTypeId === "hard-tube-fittings" &&
  449 |     filterKey === "filter03"
  450 |   ) {
  451 |     const expandedProducts = products.flatMap((product) => {
  452 |       const values = splitFilterValues(
  453 |         (product.filters || {})[filterKey]
  634 |     .replace(/μ/g, "u")
  635 |     .replace(/[^a-z0-9]+/g, "-")
  636 |     .replace(/^-+|-+$/g, "");
  637 | }
  638 | 
  639 | function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  640 |   const existingSlug = normalizePlungerPathPart(product.detailSlug);
  641 | 
  642 |   if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
  643 |     return existingSlug.toLowerCase();
  644 |   }
  693 | 
  694 |   最终详情链接出口保护：
  695 |   防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  696 |   只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
  697 | */
  698 | function normalizeFinalProductDetailHref(
  699 |   product: ProductSelectionProduct,
  700 |   href: string
  701 | ): string {
  702 |   const rawHref = String(href || "").trim();
  703 | 
  733 | 
  734 |   return rawHref;
  735 | }
  736 | 
  737 | 
  738 | function makeDetailHref(product: ProductSelectionProduct) {
  739 |   /*
  740 |     CONTROL_MODULE_DETAIL_HREF_20260708
  741 | 
  742 |     说明：
  743 |     1. 智控模块属于 control 分类；
  764 |     (product as any)?.category === "control" ||
  765 |     (product as any)?.productTypeId === "control-module" ||
  766 |     (product as any)?.productTypeLabel === "智控模块"
  767 |   ) {
  768 |     const rawHref = String(
  769 |       (product as any).detailHref ||
  770 |         (product as any).href ||
  771 |         ""
  772 |     ).trim();
  773 | 
  774 |     if (rawHref.includes("/products/control-modules/")) {
  803 |     柱塞泵详情链接优先处理。
  804 |     防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
  805 |   */
  806 |   {
  807 |     const rawHref = String(
  808 |       (product as any).detailHref ||
  809 |         (product as any).productDetailHref ||
  810 |         (product as any).href ||
  811 |         ""
  812 |     ).trim();
  813 | 
  814 |     if (rawHref.includes("/products/pumps/plunger-pumps/")) {
  848 |     }
  849 |   }
  850 | 
  851 | /*
  852 |     TUBING_MAKE_DETAIL_HREF_20260707
  853 |     管路卡片优先使用 detailHref / href。
  854 |   */
  855 |   {
  856 |     const rawHref = String(
  857 |       (product as any).detailHref ||
  858 |         (product as any).productDetailHref ||
  859 |         (product as any).href ||
  860 |         ""
  861 |     ).trim();
  862 | 
  863 |     if (rawHref.includes("/products/tubing/")) {
  894 |     只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
  895 |     其它产品仍走原来的针、阀、泵逻辑。
  896 |   */
  897 |   {
  898 |     const rawHref = String(
  899 |       (product as any).detailHref ||
  900 |         (product as any).productDetailHref ||
  901 |         (product as any).href ||
  902 |         (product as any).url ||
  903 |         (product as any).path ||
  904 |         ""
  905 |     ).trim();
  975 |     (product as any)?.categoryId === "needles" ||
  976 |     (product as any)?.category === "needles" ||
  977 |     (product as any)?.categoryLabel === "针系列"
  978 |   ) {
  979 |     const rawHref = String(
  980 |       (product as any).detailHref ||
  981 |         (product as any).href ||
  982 |         ""
  983 |     );
  984 | 
  985 |     const slugFromHref = rawHref
 1014 |   /*
 1015 |     PROBE_DETAIL_HREF_PATCH_20260709
 1016 | 
 1017 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1018 |     详情路由不能依赖 productTypeId。
 1019 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1020 |   */
 1021 |   if (
 1022 |     (product as any)?.sourceType === "probe-selection" ||
 1023 |     (product as any)?.category === "probes" ||
 1024 |     (product as any)?.categoryLabel === "针系列"
 1025 |   ) {
 1026 |     const rawHref = String(
 1027 |       (product as any).detailHref ||
 1028 |         (product as any).href ||
 1029 |         ""
 1030 |     );
 1031 | 
 1032 |     const slugFromHref = rawHref
 1060 | 
 1061 |   /*
 1062 |     PROBE_DETAIL_HREF_PATCH_20260708
 1063 | 
 1064 |     针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
 1065 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1066 |     避免生成 /products/probes/undefined。
 1067 |   */
 1068 |   if (
 1069 |     (product as any)?.sourceType === "probe-selection" ||
 1070 |     (product as any)?.category === "probes" ||
 1071 |     (product as any)?.categoryLabel === "针系列"
 1072 |   ) {
 1073 |     const rawHref = String(
 1074 |       (product as any).detailHref ||
 1075 |         (product as any).href ||
 1076 |         ""
 1077 |     );
 1078 | 
 1079 |     const slugFromHref = rawHref
 1108 |   /*
 1109 |     VALVE_DETAIL_HREF_PATCH_20260707
 1110 | 
 1111 |     阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
 1112 |     因此详情链接不能只依赖 productTypeId。
 1113 |     这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
 1114 |     避免生成 /products/valves/undefined/。
 1115 |   */
 1116 |   if ((product as any)?.categoryId === "valves") {
 1117 |     const rawHref = String(
 1118 |       (product as any).detailHref ||
 1119 |         (product as any).href ||
 1120 |         ""
 1121 |     );
 1122 | 
 1123 |     const slugFromHref = rawHref
 1154 |     product.categoryId === "valves" &&
 1155 |     ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(String(product.productTypeId || ""));
 1156 | 
 1157 |   if (isValveProduct) {
 1158 |     return (
 1159 |       (product as any).detailHref ||
 1160 |       (product as any).href ||
 1161 |       `/products/valves/${product.productTypeId}`
 1162 |     );
 1163 |   }
 1164 | 
 1249 |   const isPlungerPump =
 1250 |     product.categoryId === "pumps" &&
 1251 |     ["plunger-pump", "plunger-pumps"].includes(String(product.productTypeId || ""));
 1252 | 
 1253 |   if (isPlungerPump) {
 1254 |     const slug = getPlungerPumpModelSlugForDetailHref(product);
 1255 | 
 1256 |     return slug
 1257 |       ? `/products/pumps/plunger-pumps/${slug}`
 1258 |       : "/products/pumps/plunger-pumps";
 1259 |   }
 1260 | 
 1261 |   return `/products/${product.categoryId}/${product.detailSlug}`;
 1262 | }
 1263 | 
 1264 | /*
 1265 |  * 硬管接头接管外径筛选排序
 1266 |  *
 1267 |  * 仅作用于：
 1268 |  * productTypeId = hard-tube-fittings
 1269 |  * filter03 = 接管外径
 1270 |  */
 1271 | function sortHardTubeFilterOptionsForDisplay(
 1272 |   productTypeId: string,
 1273 |   filterKey: SelectionFilterKey,
 1275 |     value: string;
 1276 |     label: string;
 1277 |   }>
 1278 | ) {
 1279 |   if (
 1280 |     productTypeId !== "hard-tube-fittings" ||
 1281 |     filterKey !== "filter03"
 1282 |   ) {
 1283 |     return options;
 1284 |   }
 1285 | 
 2302 |           return "/images/products/pumps/diaphragm-pump.jpg";
 2303 |         }
 2304 | 
 2305 |         return undefined;
 2306 |       })(),
 2307 |       detailHref: makeDetailHref(product),
 2308 |     };
 2309 |   }
 2310 | 
 2311 |   function toggleProductInList(product: ProductSelectionProduct) {
 2312 |     const currentItem = getItem("pump-selection", product.productId);
 2436 |                       getText(locale, product.cardTitle, product.productId)
 2437 |                     }
 2438 |                     getSubtitle={(product) =>
 2439 |                       getText(locale, product.cardSubtitle, "")
 2440 |                     }
 2441 |                     getDetailHref={(product) => normalizeFinalProductDetailHref(product, makeDetailHref(product))}
 2442 |                     onToggleList={toggleProductInList}
 2443 |                   />
 2444 | 
 2445 |                   <ProductSelectionPagination
 2446 |                     currentPage={safeCurrentProductPage}
```

## data\products\generated\fittings\hard-tube-fittings\detail\index.json

```text
    2 |   {
    3 |     "sourceType": "fitting-detail",
    4 |     "category": "fittings",
    5 |     "categoryId": "fittings",
    6 |     "categoryLabel": "接头系列",
    7 |     "productTypeId": "hard-tube-fittings",
    8 |     "productTypeName": "标滚平底接头",
    9 |     "productId": "809717",
   10 |     "productCode": "809717",
   11 |     "seriesId": "standard-flat-bottom-fitting",
   12 |     "seriesName": "标滚平底接头",
   28 |       "微流体液路连接",
   29 |       "泵阀接口连接",
   30 |       "流路基板连接",
   31 |       "IVD与分析仪器"
   32 |     ],
   33 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
   34 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
   35 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
   36 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
   37 |     "additionalImages": [],
   38 |     "imageAlt": "HF-M6-20-PK-N 标滚平底接头 PEEK",
   39 |     "detailMode": "standard_model",
   40 |     "hideModelAction": false,
   41 |     "showConfigurator": false,
  137 |       {
  138 |         "question": "HF-M6-20-PK-N是否可以申请2D图纸？",
  139 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
  140 |       }
  141 |     ],
  142 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-20-pk-n",
  143 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-20-pk-n",
  144 |     "selectionHref": "/products/fittings/hard-tube-fittings",
  145 |     "seo": {
  146 |       "title": "HF-M6-20-PK-N 标滚平底接头 | FOREACH",
  147 |       "description": "HF-M6-20-PK-N是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
  148 |     },
  149 |     "sectionTitleMap": {
  154 |   {
  155 |     "sourceType": "fitting-detail",
  156 |     "category": "fittings",
  157 |     "categoryId": "fittings",
  158 |     "categoryLabel": "接头系列",
  159 |     "productTypeId": "hard-tube-fittings",
  160 |     "productTypeName": "标滚平底接头",
  161 |     "productId": "809747",
  162 |     "productCode": "809747",
  163 |     "seriesId": "standard-flat-bottom-fitting",
  164 |     "seriesName": "标滚平底接头",
  180 |       "微流体液路连接",
  181 |       "泵阀接口连接",
  182 |       "流路基板连接",
  183 |       "IVD与分析仪器"
  184 |     ],
  185 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
  186 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
  187 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
  188 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
  189 |     "additionalImages": [],
  190 |     "imageAlt": "HF-M6-20-PS-B 标滚平底接头 PPS",
  191 |     "detailMode": "standard_model",
  192 |     "hideModelAction": false,
  193 |     "showConfigurator": false,
  289 |       {
  290 |         "question": "HF-M6-20-PS-B是否可以申请2D图纸？",
  291 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
  292 |       }
  293 |     ],
  294 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-20-ps-b",
  295 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-20-ps-b",
  296 |     "selectionHref": "/products/fittings/hard-tube-fittings",
  297 |     "seo": {
  298 |       "title": "HF-M6-20-PS-B 标滚平底接头 | FOREACH",
  299 |       "description": "HF-M6-20-PS-B是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
  300 |     },
  301 |     "sectionTitleMap": {
  306 |   {
  307 |     "sourceType": "fitting-detail",
  308 |     "category": "fittings",
  309 |     "categoryId": "fittings",
  310 |     "categoryLabel": "接头系列",
  311 |     "productTypeId": "hard-tube-fittings",
  312 |     "productTypeName": "标滚平底接头",
  313 |     "productId": "809746",
  314 |     "productCode": "809746",
  315 |     "seriesId": "standard-flat-bottom-fitting",
  316 |     "seriesName": "标滚平底接头",
  332 |       "微流体液路连接",
  333 |       "泵阀接口连接",
  334 |       "流路基板连接",
  335 |       "IVD与分析仪器"
  336 |     ],
  337 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
  338 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
  339 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
  340 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
  341 |     "additionalImages": [],
  342 |     "imageAlt": "HF-M6-20-PV-N 标滚平底接头 PVDF",
  343 |     "detailMode": "standard_model",
  344 |     "hideModelAction": false,
  345 |     "showConfigurator": false,
  441 |       {
  442 |         "question": "HF-M6-20-PV-N是否可以申请2D图纸？",
  443 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
  444 |       }
  445 |     ],
  446 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-20-pv-n",
  447 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-20-pv-n",
  448 |     "selectionHref": "/products/fittings/hard-tube-fittings",
  449 |     "seo": {
  450 |       "title": "HF-M6-20-PV-N 标滚平底接头 | FOREACH",
  451 |       "description": "HF-M6-20-PV-N是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
  452 |     },
  453 |     "sectionTitleMap": {
  458 |   {
  459 |     "sourceType": "fitting-detail",
  460 |     "category": "fittings",
  461 |     "categoryId": "fittings",
  462 |     "categoryLabel": "接头系列",
  463 |     "productTypeId": "hard-tube-fittings",
  464 |     "productTypeName": "标滚平底接头",
  465 |     "productId": "809718",
  466 |     "productCode": "809718",
  467 |     "seriesId": "standard-flat-bottom-fitting",
  468 |     "seriesName": "标滚平底接头",
  484 |       "微流体液路连接",
  485 |       "泵阀接口连接",
  486 |       "流路基板连接",
  487 |       "IVD与分析仪器"
  488 |     ],
  489 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
  490 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
  491 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
  492 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
  493 |     "additionalImages": [],
  494 |     "imageAlt": "HF-M6-25-PK-N 标滚平底接头 PEEK",
  495 |     "detailMode": "standard_model",
  496 |     "hideModelAction": false,
  497 |     "showConfigurator": false,
  593 |       {
  594 |         "question": "HF-M6-25-PK-N是否可以申请2D图纸？",
  595 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
  596 |       }
  597 |     ],
  598 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-25-pk-n",
  599 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-25-pk-n",
  600 |     "selectionHref": "/products/fittings/hard-tube-fittings",
  601 |     "seo": {
  602 |       "title": "HF-M6-25-PK-N 标滚平底接头 | FOREACH",
  603 |       "description": "HF-M6-25-PK-N是一款适用于外径2.5 mm硬管的标滚平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
  604 |     },
  605 |     "sectionTitleMap": {
  610 |   {
  611 |     "sourceType": "fitting-detail",
  612 |     "category": "fittings",
  613 |     "categoryId": "fittings",
  614 |     "categoryLabel": "接头系列",
  615 |     "productTypeId": "hard-tube-fittings",
  616 |     "productTypeName": "标滚平底接头",
  617 |     "productId": "809749",
  618 |     "productCode": "809749",
  619 |     "seriesId": "standard-flat-bottom-fitting",
  620 |     "seriesName": "标滚平底接头",
  636 |       "微流体液路连接",
  637 |       "泵阀接口连接",
  638 |       "流路基板连接",
  639 |       "IVD与分析仪器"
  640 |     ],
  641 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
  642 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
  643 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
  644 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
  645 |     "additionalImages": [],
  646 |     "imageAlt": "HF-M6-25-PS-B 标滚平底接头 PPS",
  647 |     "detailMode": "standard_model",
  648 |     "hideModelAction": false,
  649 |     "showConfigurator": false,
  745 |       {
  746 |         "question": "HF-M6-25-PS-B是否可以申请2D图纸？",
  747 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
  748 |       }
  749 |     ],
  750 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-25-ps-b",
  751 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-25-ps-b",
  752 |     "selectionHref": "/products/fittings/hard-tube-fittings",
  753 |     "seo": {
  754 |       "title": "HF-M6-25-PS-B 标滚平底接头 | FOREACH",
  755 |       "description": "HF-M6-25-PS-B是一款适用于外径2.5 mm硬管的标滚平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
  756 |     },
  757 |     "sectionTitleMap": {
  762 |   {
  763 |     "sourceType": "fitting-detail",
  764 |     "category": "fittings",
  765 |     "categoryId": "fittings",
  766 |     "categoryLabel": "接头系列",
  767 |     "productTypeId": "hard-tube-fittings",
  768 |     "productTypeName": "标滚平底接头",
  769 |     "productId": "809748",
  770 |     "productCode": "809748",
  771 |     "seriesId": "standard-flat-bottom-fitting",
  772 |     "seriesName": "标滚平底接头",
  788 |       "微流体液路连接",
  789 |       "泵阀接口连接",
  790 |       "流路基板连接",
  791 |       "IVD与分析仪器"
  792 |     ],
  793 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
  794 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
  795 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
  796 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
  797 |     "additionalImages": [],
  798 |     "imageAlt": "HF-M6-25-PV-N 标滚平底接头 PVDF",
  799 |     "detailMode": "standard_model",
  800 |     "hideModelAction": false,
  801 |     "showConfigurator": false,
  897 |       {
  898 |         "question": "HF-M6-25-PV-N是否可以申请2D图纸？",
  899 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
  900 |       }
  901 |     ],
  902 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-25-pv-n",
  903 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-25-pv-n",
  904 |     "selectionHref": "/products/fittings/hard-tube-fittings",
  905 |     "seo": {
  906 |       "title": "HF-M6-25-PV-N 标滚平底接头 | FOREACH",
  907 |       "description": "HF-M6-25-PV-N是一款适用于外径2.5 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
  908 |     },
  909 |     "sectionTitleMap": {
  914 |   {
  915 |     "sourceType": "fitting-detail",
  916 |     "category": "fittings",
  917 |     "categoryId": "fittings",
  918 |     "categoryLabel": "接头系列",
  919 |     "productTypeId": "hard-tube-fittings",
  920 |     "productTypeName": "标滚平底接头",
  921 |     "productId": "809719",
  922 |     "productCode": "809719",
  923 |     "seriesId": "standard-flat-bottom-fitting",
  924 |     "seriesName": "标滚平底接头",
  940 |       "微流体液路连接",
  941 |       "泵阀接口连接",
  942 |       "流路基板连接",
  943 |       "IVD与分析仪器"
  944 |     ],
  945 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
  946 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
  947 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
  948 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
  949 |     "additionalImages": [],
  950 |     "imageAlt": "HF-M6-32-PK-N 标滚平底接头 PEEK",
  951 |     "detailMode": "standard_model",
  952 |     "hideModelAction": false,
  953 |     "showConfigurator": false,
 1049 |       {
 1050 |         "question": "HF-M6-32-PK-N是否可以申请2D图纸？",
 1051 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1052 |       }
 1053 |     ],
 1054 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-32-pk-n",
 1055 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-32-pk-n",
 1056 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1057 |     "seo": {
 1058 |       "title": "HF-M6-32-PK-N 标滚平底接头 | FOREACH",
 1059 |       "description": "HF-M6-32-PK-N是一款适用于外径3.2 mm硬管的标滚平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1060 |     },
 1061 |     "sectionTitleMap": {
 1066 |   {
 1067 |     "sourceType": "fitting-detail",
 1068 |     "category": "fittings",
 1069 |     "categoryId": "fittings",
 1070 |     "categoryLabel": "接头系列",
 1071 |     "productTypeId": "hard-tube-fittings",
 1072 |     "productTypeName": "标滚平底接头",
 1073 |     "productId": "809751",
 1074 |     "productCode": "809751",
 1075 |     "seriesId": "standard-flat-bottom-fitting",
 1076 |     "seriesName": "标滚平底接头",
 1092 |       "微流体液路连接",
 1093 |       "泵阀接口连接",
 1094 |       "流路基板连接",
 1095 |       "IVD与分析仪器"
 1096 |     ],
 1097 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
 1098 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
 1099 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
 1100 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
 1101 |     "additionalImages": [],
 1102 |     "imageAlt": "HF-M6-32-PS-B 标滚平底接头 PPS",
 1103 |     "detailMode": "standard_model",
 1104 |     "hideModelAction": false,
 1105 |     "showConfigurator": false,
 1201 |       {
 1202 |         "question": "HF-M6-32-PS-B是否可以申请2D图纸？",
 1203 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1204 |       }
 1205 |     ],
 1206 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-32-ps-b",
 1207 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-32-ps-b",
 1208 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1209 |     "seo": {
 1210 |       "title": "HF-M6-32-PS-B 标滚平底接头 | FOREACH",
 1211 |       "description": "HF-M6-32-PS-B是一款适用于外径3.2 mm硬管的标滚平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1212 |     },
 1213 |     "sectionTitleMap": {
 1218 |   {
 1219 |     "sourceType": "fitting-detail",
 1220 |     "category": "fittings",
 1221 |     "categoryId": "fittings",
 1222 |     "categoryLabel": "接头系列",
 1223 |     "productTypeId": "hard-tube-fittings",
 1224 |     "productTypeName": "标滚平底接头",
 1225 |     "productId": "809750",
 1226 |     "productCode": "809750",
 1227 |     "seriesId": "standard-flat-bottom-fitting",
 1228 |     "seriesName": "标滚平底接头",
 1244 |       "微流体液路连接",
 1245 |       "泵阀接口连接",
 1246 |       "流路基板连接",
 1247 |       "IVD与分析仪器"
 1248 |     ],
 1249 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
 1250 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
 1251 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
 1252 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
 1253 |     "additionalImages": [],
 1254 |     "imageAlt": "HF-M6-32-PV-N 标滚平底接头 PVDF",
 1255 |     "detailMode": "standard_model",
 1256 |     "hideModelAction": false,
 1257 |     "showConfigurator": false,
 1353 |       {
 1354 |         "question": "HF-M6-32-PV-N是否可以申请2D图纸？",
 1355 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1356 |       }
 1357 |     ],
 1358 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-32-pv-n",
 1359 |     "href": "/products/fittings/hard-tube-fittings/hf-m6-32-pv-n",
 1360 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1361 |     "seo": {
 1362 |       "title": "HF-M6-32-PV-N 标滚平底接头 | FOREACH",
 1363 |       "description": "HF-M6-32-PV-N是一款适用于外径3.2 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1364 |     },
 1365 |     "sectionTitleMap": {
 1370 |   {
 1371 |     "sourceType": "fitting-detail",
 1372 |     "category": "fittings",
 1373 |     "categoryId": "fittings",
 1374 |     "categoryLabel": "接头系列",
 1375 |     "productTypeId": "hard-tube-fittings",
 1376 |     "productTypeName": "标滚平底接头",
 1377 |     "productId": "809714",
 1378 |     "productCode": "809714",
 1379 |     "seriesId": "standard-flat-bottom-fitting",
 1380 |     "seriesName": "标滚平底接头",
 1396 |       "微流体液路连接",
 1397 |       "泵阀接口连接",
 1398 |       "流路基板连接",
 1399 |       "IVD与分析仪器"
 1400 |     ],
 1401 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
 1402 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
 1403 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
 1404 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
 1405 |     "additionalImages": [],
 1406 |     "imageAlt": "HF-U28-20-PK-N 标滚平底接头 PEEK",
 1407 |     "detailMode": "standard_model",
 1408 |     "hideModelAction": false,
 1409 |     "showConfigurator": false,
 1505 |       {
 1506 |         "question": "HF-U28-20-PK-N是否可以申请2D图纸？",
 1507 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1508 |       }
 1509 |     ],
 1510 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-20-pk-n",
 1511 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-20-pk-n",
 1512 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1513 |     "seo": {
 1514 |       "title": "HF-U28-20-PK-N 标滚平底接头 | FOREACH",
 1515 |       "description": "HF-U28-20-PK-N是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1516 |     },
 1517 |     "sectionTitleMap": {
 1522 |   {
 1523 |     "sourceType": "fitting-detail",
 1524 |     "category": "fittings",
 1525 |     "categoryId": "fittings",
 1526 |     "categoryLabel": "接头系列",
 1527 |     "productTypeId": "hard-tube-fittings",
 1528 |     "productTypeName": "标滚平底接头",
 1529 |     "productId": "809741",
 1530 |     "productCode": "809741",
 1531 |     "seriesId": "standard-flat-bottom-fitting",
 1532 |     "seriesName": "标滚平底接头",
 1548 |       "微流体液路连接",
 1549 |       "泵阀接口连接",
 1550 |       "流路基板连接",
 1551 |       "IVD与分析仪器"
 1552 |     ],
 1553 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
 1554 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
 1555 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
 1556 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
 1557 |     "additionalImages": [],
 1558 |     "imageAlt": "HF-U28-20-PS-B 标滚平底接头 PPS",
 1559 |     "detailMode": "standard_model",
 1560 |     "hideModelAction": false,
 1561 |     "showConfigurator": false,
 1657 |       {
 1658 |         "question": "HF-U28-20-PS-B是否可以申请2D图纸？",
 1659 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1660 |       }
 1661 |     ],
 1662 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-20-ps-b",
 1663 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-20-ps-b",
 1664 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1665 |     "seo": {
 1666 |       "title": "HF-U28-20-PS-B 标滚平底接头 | FOREACH",
 1667 |       "description": "HF-U28-20-PS-B是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1668 |     },
 1669 |     "sectionTitleMap": {
 1674 |   {
 1675 |     "sourceType": "fitting-detail",
 1676 |     "category": "fittings",
 1677 |     "categoryId": "fittings",
 1678 |     "categoryLabel": "接头系列",
 1679 |     "productTypeId": "hard-tube-fittings",
 1680 |     "productTypeName": "标滚平底接头",
 1681 |     "productId": "809740",
 1682 |     "productCode": "809740",
 1683 |     "seriesId": "standard-flat-bottom-fitting",
 1684 |     "seriesName": "标滚平底接头",
 1700 |       "微流体液路连接",
 1701 |       "泵阀接口连接",
 1702 |       "流路基板连接",
 1703 |       "IVD与分析仪器"
 1704 |     ],
 1705 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
 1706 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
 1707 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
 1708 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
 1709 |     "additionalImages": [],
 1710 |     "imageAlt": "HF-U28-20-PV-N 标滚平底接头 PVDF",
 1711 |     "detailMode": "standard_model",
 1712 |     "hideModelAction": false,
 1713 |     "showConfigurator": false,
 1809 |       {
 1810 |         "question": "HF-U28-20-PV-N是否可以申请2D图纸？",
 1811 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1812 |       }
 1813 |     ],
 1814 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-20-pv-n",
 1815 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-20-pv-n",
 1816 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1817 |     "seo": {
 1818 |       "title": "HF-U28-20-PV-N 标滚平底接头 | FOREACH",
 1819 |       "description": "HF-U28-20-PV-N是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1820 |     },
 1821 |     "sectionTitleMap": {
 1826 |   {
 1827 |     "sourceType": "fitting-detail",
 1828 |     "category": "fittings",
 1829 |     "categoryId": "fittings",
 1830 |     "categoryLabel": "接头系列",
 1831 |     "productTypeId": "hard-tube-fittings",
 1832 |     "productTypeName": "标滚平底接头",
 1833 |     "productId": "809715",
 1834 |     "productCode": "809715",
 1835 |     "seriesId": "standard-flat-bottom-fitting",
 1836 |     "seriesName": "标滚平底接头",
 1852 |       "微流体液路连接",
 1853 |       "泵阀接口连接",
 1854 |       "流路基板连接",
 1855 |       "IVD与分析仪器"
 1856 |     ],
 1857 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
 1858 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
 1859 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
 1860 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
 1861 |     "additionalImages": [],
 1862 |     "imageAlt": "HF-U28-25-PK-N 标滚平底接头 PEEK",
 1863 |     "detailMode": "standard_model",
 1864 |     "hideModelAction": false,
 1865 |     "showConfigurator": false,
 1961 |       {
 1962 |         "question": "HF-U28-25-PK-N是否可以申请2D图纸？",
 1963 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 1964 |       }
 1965 |     ],
 1966 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-25-pk-n",
 1967 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-25-pk-n",
 1968 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 1969 |     "seo": {
 1970 |       "title": "HF-U28-25-PK-N 标滚平底接头 | FOREACH",
 1971 |       "description": "HF-U28-25-PK-N是一款适用于外径2.5 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 1972 |     },
 1973 |     "sectionTitleMap": {
 1978 |   {
 1979 |     "sourceType": "fitting-detail",
 1980 |     "category": "fittings",
 1981 |     "categoryId": "fittings",
 1982 |     "categoryLabel": "接头系列",
 1983 |     "productTypeId": "hard-tube-fittings",
 1984 |     "productTypeName": "标滚平底接头",
 1985 |     "productId": "809743",
 1986 |     "productCode": "809743",
 1987 |     "seriesId": "standard-flat-bottom-fitting",
 1988 |     "seriesName": "标滚平底接头",
 2004 |       "微流体液路连接",
 2005 |       "泵阀接口连接",
 2006 |       "流路基板连接",
 2007 |       "IVD与分析仪器"
 2008 |     ],
 2009 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
 2010 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
 2011 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
 2012 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
 2013 |     "additionalImages": [],
 2014 |     "imageAlt": "HF-U28-25-PS-B 标滚平底接头 PPS",
 2015 |     "detailMode": "standard_model",
 2016 |     "hideModelAction": false,
 2017 |     "showConfigurator": false,
 2113 |       {
 2114 |         "question": "HF-U28-25-PS-B是否可以申请2D图纸？",
 2115 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 2116 |       }
 2117 |     ],
 2118 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-25-ps-b",
 2119 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-25-ps-b",
 2120 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 2121 |     "seo": {
 2122 |       "title": "HF-U28-25-PS-B 标滚平底接头 | FOREACH",
 2123 |       "description": "HF-U28-25-PS-B是一款适用于外径2.5 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 2124 |     },
 2125 |     "sectionTitleMap": {
 2130 |   {
 2131 |     "sourceType": "fitting-detail",
 2132 |     "category": "fittings",
 2133 |     "categoryId": "fittings",
 2134 |     "categoryLabel": "接头系列",
 2135 |     "productTypeId": "hard-tube-fittings",
 2136 |     "productTypeName": "标滚平底接头",
 2137 |     "productId": "809742",
 2138 |     "productCode": "809742",
 2139 |     "seriesId": "standard-flat-bottom-fitting",
 2140 |     "seriesName": "标滚平底接头",
 2156 |       "微流体液路连接",
 2157 |       "泵阀接口连接",
 2158 |       "流路基板连接",
 2159 |       "IVD与分析仪器"
 2160 |     ],
 2161 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
 2162 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
 2163 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
 2164 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
 2165 |     "additionalImages": [],
 2166 |     "imageAlt": "HF-U28-25-PV-N 标滚平底接头 PVDF",
 2167 |     "detailMode": "standard_model",
 2168 |     "hideModelAction": false,
 2169 |     "showConfigurator": false,
 2265 |       {
 2266 |         "question": "HF-U28-25-PV-N是否可以申请2D图纸？",
 2267 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 2268 |       }
 2269 |     ],
 2270 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-25-pv-n",
 2271 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-25-pv-n",
 2272 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 2273 |     "seo": {
 2274 |       "title": "HF-U28-25-PV-N 标滚平底接头 | FOREACH",
 2275 |       "description": "HF-U28-25-PV-N是一款适用于外径2.5 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 2276 |     },
 2277 |     "sectionTitleMap": {
 2282 |   {
 2283 |     "sourceType": "fitting-detail",
 2284 |     "category": "fittings",
 2285 |     "categoryId": "fittings",
 2286 |     "categoryLabel": "接头系列",
 2287 |     "productTypeId": "hard-tube-fittings",
 2288 |     "productTypeName": "标滚平底接头",
 2289 |     "productId": "809716",
 2290 |     "productCode": "809716",
 2291 |     "seriesId": "standard-flat-bottom-fitting",
 2292 |     "seriesName": "标滚平底接头",
 2308 |       "微流体液路连接",
 2309 |       "泵阀接口连接",
 2310 |       "流路基板连接",
 2311 |       "IVD与分析仪器"
 2312 |     ],
 2313 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
 2314 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
 2315 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
 2316 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
 2317 |     "additionalImages": [],
 2318 |     "imageAlt": "HF-U28-32-PK-N 标滚平底接头 PEEK",
 2319 |     "detailMode": "standard_model",
 2320 |     "hideModelAction": false,
 2321 |     "showConfigurator": false,
 2417 |       {
 2418 |         "question": "HF-U28-32-PK-N是否可以申请2D图纸？",
 2419 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 2420 |       }
 2421 |     ],
 2422 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-32-pk-n",
 2423 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-32-pk-n",
 2424 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 2425 |     "seo": {
 2426 |       "title": "HF-U28-32-PK-N 标滚平底接头 | FOREACH",
 2427 |       "description": "HF-U28-32-PK-N是一款适用于外径3.2 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 2428 |     },
 2429 |     "sectionTitleMap": {
 2434 |   {
 2435 |     "sourceType": "fitting-detail",
 2436 |     "category": "fittings",
 2437 |     "categoryId": "fittings",
 2438 |     "categoryLabel": "接头系列",
 2439 |     "productTypeId": "hard-tube-fittings",
 2440 |     "productTypeName": "标滚平底接头",
 2441 |     "productId": "809745",
 2442 |     "productCode": "809745",
 2443 |     "seriesId": "standard-flat-bottom-fitting",
 2444 |     "seriesName": "标滚平底接头",
 2460 |       "微流体液路连接",
 2461 |       "泵阀接口连接",
 2462 |       "流路基板连接",
 2463 |       "IVD与分析仪器"
 2464 |     ],
 2465 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
 2466 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
 2467 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
 2468 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
 2469 |     "additionalImages": [],
 2470 |     "imageAlt": "HF-U28-32-PS-B 标滚平底接头 PPS",
 2471 |     "detailMode": "standard_model",
 2472 |     "hideModelAction": false,
 2473 |     "showConfigurator": false,
 2569 |       {
 2570 |         "question": "HF-U28-32-PS-B是否可以申请2D图纸？",
 2571 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 2572 |       }
 2573 |     ],
 2574 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-32-ps-b",
 2575 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-32-ps-b",
 2576 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 2577 |     "seo": {
 2578 |       "title": "HF-U28-32-PS-B 标滚平底接头 | FOREACH",
 2579 |       "description": "HF-U28-32-PS-B是一款适用于外径3.2 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 2580 |     },
 2581 |     "sectionTitleMap": {
 2586 |   {
 2587 |     "sourceType": "fitting-detail",
 2588 |     "category": "fittings",
 2589 |     "categoryId": "fittings",
 2590 |     "categoryLabel": "接头系列",
 2591 |     "productTypeId": "hard-tube-fittings",
 2592 |     "productTypeName": "标滚平底接头",
 2593 |     "productId": "809744",
 2594 |     "productCode": "809744",
 2595 |     "seriesId": "standard-flat-bottom-fitting",
 2596 |     "seriesName": "标滚平底接头",
 2612 |       "微流体液路连接",
 2613 |       "泵阀接口连接",
 2614 |       "流路基板连接",
 2615 |       "IVD与分析仪器"
 2616 |     ],
 2617 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
 2618 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
 2619 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
 2620 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
 2621 |     "additionalImages": [],
 2622 |     "imageAlt": "HF-U28-32-PV-N 标滚平底接头 PVDF",
 2623 |     "detailMode": "standard_model",
 2624 |     "hideModelAction": false,
 2625 |     "showConfigurator": false,
 2721 |       {
 2722 |         "question": "HF-U28-32-PV-N是否可以申请2D图纸？",
 2723 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 2724 |       }
 2725 |     ],
 2726 |     "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-32-pv-n",
 2727 |     "href": "/products/fittings/hard-tube-fittings/hf-u28-32-pv-n",
 2728 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 2729 |     "seo": {
 2730 |       "title": "HF-U28-32-PV-N 标滚平底接头 | FOREACH",
 2731 |       "description": "HF-U28-32-PV-N是一款适用于外径3.2 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 2732 |     },
 2733 |     "sectionTitleMap": {
 2738 |   {
 2739 |     "sourceType": "fitting-detail",
 2740 |     "category": "fittings",
 2741 |     "categoryId": "fittings",
 2742 |     "categoryLabel": "接头系列",
 2743 |     "productTypeId": "hard-tube-fittings",
 2744 |     "productTypeName": "紧凑平底接头",
 2745 |     "productId": "809723",
 2746 |     "productCode": "809723",
 2747 |     "seriesId": "compact-flat-bottom-fitting",
 2748 |     "seriesName": "紧凑平底接头",
 2764 |       "微流体液路连接",
 2765 |       "泵阀接口连接",
 2766 |       "流路基板连接",
 2767 |       "IVD与分析仪器"
 2768 |     ],
 2769 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
 2770 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
 2771 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
 2772 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
 2773 |     "additionalImages": [],
 2774 |     "imageAlt": "HF6-M6-20-PK-N 紧凑平底接头 PEEK",
 2775 |     "detailMode": "standard_model",
 2776 |     "hideModelAction": false,
 2777 |     "showConfigurator": false,
 2873 |       {
 2874 |         "question": "HF6-M6-20-PK-N是否可以申请2D图纸？",
 2875 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 2876 |       }
 2877 |     ],
 2878 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-20-pk-n",
 2879 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-20-pk-n",
 2880 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 2881 |     "seo": {
 2882 |       "title": "HF6-M6-20-PK-N 紧凑平底接头 | FOREACH",
 2883 |       "description": "HF6-M6-20-PK-N是一款适用于外径1.6–2.0 mm硬管的紧凑平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 2884 |     },
 2885 |     "sectionTitleMap": {
 2890 |   {
 2891 |     "sourceType": "fitting-detail",
 2892 |     "category": "fittings",
 2893 |     "categoryId": "fittings",
 2894 |     "categoryLabel": "接头系列",
 2895 |     "productTypeId": "hard-tube-fittings",
 2896 |     "productTypeName": "紧凑平底接头",
 2897 |     "productId": "809759",
 2898 |     "productCode": "809759",
 2899 |     "seriesId": "compact-flat-bottom-fitting",
 2900 |     "seriesName": "紧凑平底接头",
 2916 |       "微流体液路连接",
 2917 |       "泵阀接口连接",
 2918 |       "流路基板连接",
 2919 |       "IVD与分析仪器"
 2920 |     ],
 2921 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
 2922 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
 2923 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
 2924 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
 2925 |     "additionalImages": [],
 2926 |     "imageAlt": "HF6-M6-20-PS-B 紧凑平底接头 PPS",
 2927 |     "detailMode": "standard_model",
 2928 |     "hideModelAction": false,
 2929 |     "showConfigurator": false,
 3025 |       {
 3026 |         "question": "HF6-M6-20-PS-B是否可以申请2D图纸？",
 3027 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3028 |       }
 3029 |     ],
 3030 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-20-ps-b",
 3031 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-20-ps-b",
 3032 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3033 |     "seo": {
 3034 |       "title": "HF6-M6-20-PS-B 紧凑平底接头 | FOREACH",
 3035 |       "description": "HF6-M6-20-PS-B是一款适用于外径1.6–2.0 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3036 |     },
 3037 |     "sectionTitleMap": {
 3042 |   {
 3043 |     "sourceType": "fitting-detail",
 3044 |     "category": "fittings",
 3045 |     "categoryId": "fittings",
 3046 |     "categoryLabel": "接头系列",
 3047 |     "productTypeId": "hard-tube-fittings",
 3048 |     "productTypeName": "紧凑平底接头",
 3049 |     "productId": "809758",
 3050 |     "productCode": "809758",
 3051 |     "seriesId": "compact-flat-bottom-fitting",
 3052 |     "seriesName": "紧凑平底接头",
 3068 |       "微流体液路连接",
 3069 |       "泵阀接口连接",
 3070 |       "流路基板连接",
 3071 |       "IVD与分析仪器"
 3072 |     ],
 3073 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
 3074 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
 3075 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
 3076 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
 3077 |     "additionalImages": [],
 3078 |     "imageAlt": "HF6-M6-20-PV-N 紧凑平底接头 PVDF",
 3079 |     "detailMode": "standard_model",
 3080 |     "hideModelAction": false,
 3081 |     "showConfigurator": false,
 3177 |       {
 3178 |         "question": "HF6-M6-20-PV-N是否可以申请2D图纸？",
 3179 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3180 |       }
 3181 |     ],
 3182 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-20-pv-n",
 3183 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-20-pv-n",
 3184 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3185 |     "seo": {
 3186 |       "title": "HF6-M6-20-PV-N 紧凑平底接头 | FOREACH",
 3187 |       "description": "HF6-M6-20-PV-N是一款适用于外径1.6–2.0 mm硬管的紧凑平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3188 |     },
 3189 |     "sectionTitleMap": {
 3194 |   {
 3195 |     "sourceType": "fitting-detail",
 3196 |     "category": "fittings",
 3197 |     "categoryId": "fittings",
 3198 |     "categoryLabel": "接头系列",
 3199 |     "productTypeId": "hard-tube-fittings",
 3200 |     "productTypeName": "紧凑平底接头",
 3201 |     "productId": "809724",
 3202 |     "productCode": "809724",
 3203 |     "seriesId": "compact-flat-bottom-fitting",
 3204 |     "seriesName": "紧凑平底接头",
 3220 |       "微流体液路连接",
 3221 |       "泵阀接口连接",
 3222 |       "流路基板连接",
 3223 |       "IVD与分析仪器"
 3224 |     ],
 3225 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
 3226 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
 3227 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
 3228 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
 3229 |     "additionalImages": [],
 3230 |     "imageAlt": "HF6-M6-25-PK-N 紧凑平底接头 PEEK",
 3231 |     "detailMode": "standard_model",
 3232 |     "hideModelAction": false,
 3233 |     "showConfigurator": false,
 3329 |       {
 3330 |         "question": "HF6-M6-25-PK-N是否可以申请2D图纸？",
 3331 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3332 |       }
 3333 |     ],
 3334 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-25-pk-n",
 3335 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-25-pk-n",
 3336 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3337 |     "seo": {
 3338 |       "title": "HF6-M6-25-PK-N 紧凑平底接头 | FOREACH",
 3339 |       "description": "HF6-M6-25-PK-N是一款适用于外径2.5 mm硬管的紧凑平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3340 |     },
 3341 |     "sectionTitleMap": {
 3346 |   {
 3347 |     "sourceType": "fitting-detail",
 3348 |     "category": "fittings",
 3349 |     "categoryId": "fittings",
 3350 |     "categoryLabel": "接头系列",
 3351 |     "productTypeId": "hard-tube-fittings",
 3352 |     "productTypeName": "紧凑平底接头",
 3353 |     "productId": "809761",
 3354 |     "productCode": "809761",
 3355 |     "seriesId": "compact-flat-bottom-fitting",
 3356 |     "seriesName": "紧凑平底接头",
 3372 |       "微流体液路连接",
 3373 |       "泵阀接口连接",
 3374 |       "流路基板连接",
 3375 |       "IVD与分析仪器"
 3376 |     ],
 3377 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
 3378 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
 3379 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
 3380 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
 3381 |     "additionalImages": [],
 3382 |     "imageAlt": "HF6-M6-25-PS-B 紧凑平底接头 PPS",
 3383 |     "detailMode": "standard_model",
 3384 |     "hideModelAction": false,
 3385 |     "showConfigurator": false,
 3481 |       {
 3482 |         "question": "HF6-M6-25-PS-B是否可以申请2D图纸？",
 3483 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3484 |       }
 3485 |     ],
 3486 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-25-ps-b",
 3487 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-25-ps-b",
 3488 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3489 |     "seo": {
 3490 |       "title": "HF6-M6-25-PS-B 紧凑平底接头 | FOREACH",
 3491 |       "description": "HF6-M6-25-PS-B是一款适用于外径2.5 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3492 |     },
 3493 |     "sectionTitleMap": {
 3498 |   {
 3499 |     "sourceType": "fitting-detail",
 3500 |     "category": "fittings",
 3501 |     "categoryId": "fittings",
 3502 |     "categoryLabel": "接头系列",
 3503 |     "productTypeId": "hard-tube-fittings",
 3504 |     "productTypeName": "紧凑平底接头",
 3505 |     "productId": "809760",
 3506 |     "productCode": "809760",
 3507 |     "seriesId": "compact-flat-bottom-fitting",
 3508 |     "seriesName": "紧凑平底接头",
 3524 |       "微流体液路连接",
 3525 |       "泵阀接口连接",
 3526 |       "流路基板连接",
 3527 |       "IVD与分析仪器"
 3528 |     ],
 3529 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
 3530 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
 3531 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
 3532 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
 3533 |     "additionalImages": [],
 3534 |     "imageAlt": "HF6-M6-25-PV-N 紧凑平底接头 PVDF",
 3535 |     "detailMode": "standard_model",
 3536 |     "hideModelAction": false,
 3537 |     "showConfigurator": false,
 3633 |       {
 3634 |         "question": "HF6-M6-25-PV-N是否可以申请2D图纸？",
 3635 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3636 |       }
 3637 |     ],
 3638 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-25-pv-n",
 3639 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-25-pv-n",
 3640 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3641 |     "seo": {
 3642 |       "title": "HF6-M6-25-PV-N 紧凑平底接头 | FOREACH",
 3643 |       "description": "HF6-M6-25-PV-N是一款适用于外径2.5 mm硬管的紧凑平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3644 |     },
 3645 |     "sectionTitleMap": {
 3650 |   {
 3651 |     "sourceType": "fitting-detail",
 3652 |     "category": "fittings",
 3653 |     "categoryId": "fittings",
 3654 |     "categoryLabel": "接头系列",
 3655 |     "productTypeId": "hard-tube-fittings",
 3656 |     "productTypeName": "紧凑平底接头",
 3657 |     "productId": "809725",
 3658 |     "productCode": "809725",
 3659 |     "seriesId": "compact-flat-bottom-fitting",
 3660 |     "seriesName": "紧凑平底接头",
 3676 |       "微流体液路连接",
 3677 |       "泵阀接口连接",
 3678 |       "流路基板连接",
 3679 |       "IVD与分析仪器"
 3680 |     ],
 3681 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
 3682 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
 3683 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
 3684 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
 3685 |     "additionalImages": [],
 3686 |     "imageAlt": "HF6-M6-32-PK-N 紧凑平底接头 PEEK",
 3687 |     "detailMode": "standard_model",
 3688 |     "hideModelAction": false,
 3689 |     "showConfigurator": false,
 3785 |       {
 3786 |         "question": "HF6-M6-32-PK-N是否可以申请2D图纸？",
 3787 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3788 |       }
 3789 |     ],
 3790 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-32-pk-n",
 3791 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-32-pk-n",
 3792 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3793 |     "seo": {
 3794 |       "title": "HF6-M6-32-PK-N 紧凑平底接头 | FOREACH",
 3795 |       "description": "HF6-M6-32-PK-N是一款适用于外径3.2 mm硬管的紧凑平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3796 |     },
 3797 |     "sectionTitleMap": {
 3802 |   {
 3803 |     "sourceType": "fitting-detail",
 3804 |     "category": "fittings",
 3805 |     "categoryId": "fittings",
 3806 |     "categoryLabel": "接头系列",
 3807 |     "productTypeId": "hard-tube-fittings",
 3808 |     "productTypeName": "紧凑平底接头",
 3809 |     "productId": "809763",
 3810 |     "productCode": "809763",
 3811 |     "seriesId": "compact-flat-bottom-fitting",
 3812 |     "seriesName": "紧凑平底接头",
 3828 |       "微流体液路连接",
 3829 |       "泵阀接口连接",
 3830 |       "流路基板连接",
 3831 |       "IVD与分析仪器"
 3832 |     ],
 3833 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
 3834 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
 3835 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
 3836 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
 3837 |     "additionalImages": [],
 3838 |     "imageAlt": "HF6-M6-32-PS-B 紧凑平底接头 PPS",
 3839 |     "detailMode": "standard_model",
 3840 |     "hideModelAction": false,
 3841 |     "showConfigurator": false,
 3937 |       {
 3938 |         "question": "HF6-M6-32-PS-B是否可以申请2D图纸？",
 3939 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 3940 |       }
 3941 |     ],
 3942 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-32-ps-b",
 3943 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-32-ps-b",
 3944 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 3945 |     "seo": {
 3946 |       "title": "HF6-M6-32-PS-B 紧凑平底接头 | FOREACH",
 3947 |       "description": "HF6-M6-32-PS-B是一款适用于外径3.2 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 3948 |     },
 3949 |     "sectionTitleMap": {
 3954 |   {
 3955 |     "sourceType": "fitting-detail",
 3956 |     "category": "fittings",
 3957 |     "categoryId": "fittings",
 3958 |     "categoryLabel": "接头系列",
 3959 |     "productTypeId": "hard-tube-fittings",
 3960 |     "productTypeName": "紧凑平底接头",
 3961 |     "productId": "809762",
 3962 |     "productCode": "809762",
 3963 |     "seriesId": "compact-flat-bottom-fitting",
 3964 |     "seriesName": "紧凑平底接头",
 3980 |       "微流体液路连接",
 3981 |       "泵阀接口连接",
 3982 |       "流路基板连接",
 3983 |       "IVD与分析仪器"
 3984 |     ],
 3985 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
 3986 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
 3987 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
 3988 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
 3989 |     "additionalImages": [],
 3990 |     "imageAlt": "HF6-M6-32-PV-N 紧凑平底接头 PVDF",
 3991 |     "detailMode": "standard_model",
 3992 |     "hideModelAction": false,
 3993 |     "showConfigurator": false,
 4089 |       {
 4090 |         "question": "HF6-M6-32-PV-N是否可以申请2D图纸？",
 4091 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 4092 |       }
 4093 |     ],
 4094 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-32-pv-n",
 4095 |     "href": "/products/fittings/hard-tube-fittings/hf6-m6-32-pv-n",
 4096 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 4097 |     "seo": {
 4098 |       "title": "HF6-M6-32-PV-N 紧凑平底接头 | FOREACH",
 4099 |       "description": "HF6-M6-32-PV-N是一款适用于外径3.2 mm硬管的紧凑平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 4100 |     },
 4101 |     "sectionTitleMap": {
 4106 |   {
 4107 |     "sourceType": "fitting-detail",
 4108 |     "category": "fittings",
 4109 |     "categoryId": "fittings",
 4110 |     "categoryLabel": "接头系列",
 4111 |     "productTypeId": "hard-tube-fittings",
 4112 |     "productTypeName": "紧凑平底接头",
 4113 |     "productId": "809720",
 4114 |     "productCode": "809720",
 4115 |     "seriesId": "compact-flat-bottom-fitting",
 4116 |     "seriesName": "紧凑平底接头",
 4132 |       "微流体液路连接",
 4133 |       "泵阀接口连接",
 4134 |       "流路基板连接",
 4135 |       "IVD与分析仪器"
 4136 |     ],
 4137 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
 4138 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
 4139 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
 4140 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
 4141 |     "additionalImages": [],
 4142 |     "imageAlt": "HF6-U28-20-PK-N 紧凑平底接头 PEEK",
 4143 |     "detailMode": "standard_model",
 4144 |     "hideModelAction": false,
 4145 |     "showConfigurator": false,
 4241 |       {
 4242 |         "question": "HF6-U28-20-PK-N是否可以申请2D图纸？",
 4243 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 4244 |       }
 4245 |     ],
 4246 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-20-pk-n",
 4247 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-20-pk-n",
 4248 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 4249 |     "seo": {
 4250 |       "title": "HF6-U28-20-PK-N 紧凑平底接头 | FOREACH",
 4251 |       "description": "HF6-U28-20-PK-N是一款适用于外径1.6–2.0 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 4252 |     },
 4253 |     "sectionTitleMap": {
 4258 |   {
 4259 |     "sourceType": "fitting-detail",
 4260 |     "category": "fittings",
 4261 |     "categoryId": "fittings",
 4262 |     "categoryLabel": "接头系列",
 4263 |     "productTypeId": "hard-tube-fittings",
 4264 |     "productTypeName": "紧凑平底接头",
 4265 |     "productId": "809753",
 4266 |     "productCode": "809753",
 4267 |     "seriesId": "compact-flat-bottom-fitting",
 4268 |     "seriesName": "紧凑平底接头",
 4284 |       "微流体液路连接",
 4285 |       "泵阀接口连接",
 4286 |       "流路基板连接",
 4287 |       "IVD与分析仪器"
 4288 |     ],
 4289 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
 4290 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
 4291 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
 4292 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
 4293 |     "additionalImages": [],
 4294 |     "imageAlt": "HF6-U28-20-PS-B 紧凑平底接头 PPS",
 4295 |     "detailMode": "standard_model",
 4296 |     "hideModelAction": false,
 4297 |     "showConfigurator": false,
 4393 |       {
 4394 |         "question": "HF6-U28-20-PS-B是否可以申请2D图纸？",
 4395 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 4396 |       }
 4397 |     ],
 4398 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-20-ps-b",
 4399 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-20-ps-b",
 4400 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 4401 |     "seo": {
 4402 |       "title": "HF6-U28-20-PS-B 紧凑平底接头 | FOREACH",
 4403 |       "description": "HF6-U28-20-PS-B是一款适用于外径1.6–2.0 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 4404 |     },
 4405 |     "sectionTitleMap": {
 4410 |   {
 4411 |     "sourceType": "fitting-detail",
 4412 |     "category": "fittings",
 4413 |     "categoryId": "fittings",
 4414 |     "categoryLabel": "接头系列",
 4415 |     "productTypeId": "hard-tube-fittings",
 4416 |     "productTypeName": "紧凑平底接头",
 4417 |     "productId": "809752",
 4418 |     "productCode": "809752",
 4419 |     "seriesId": "compact-flat-bottom-fitting",
 4420 |     "seriesName": "紧凑平底接头",
 4436 |       "微流体液路连接",
 4437 |       "泵阀接口连接",
 4438 |       "流路基板连接",
 4439 |       "IVD与分析仪器"
 4440 |     ],
 4441 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
 4442 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
 4443 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
 4444 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
 4445 |     "additionalImages": [],
 4446 |     "imageAlt": "HF6-U28-20-PV-N 紧凑平底接头 PVDF",
 4447 |     "detailMode": "standard_model",
 4448 |     "hideModelAction": false,
 4449 |     "showConfigurator": false,
 4545 |       {
 4546 |         "question": "HF6-U28-20-PV-N是否可以申请2D图纸？",
 4547 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 4548 |       }
 4549 |     ],
 4550 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-20-pv-n",
 4551 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-20-pv-n",
 4552 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 4553 |     "seo": {
 4554 |       "title": "HF6-U28-20-PV-N 紧凑平底接头 | FOREACH",
 4555 |       "description": "HF6-U28-20-PV-N是一款适用于外径1.6–2.0 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 4556 |     },
 4557 |     "sectionTitleMap": {
 4562 |   {
 4563 |     "sourceType": "fitting-detail",
 4564 |     "category": "fittings",
 4565 |     "categoryId": "fittings",
 4566 |     "categoryLabel": "接头系列",
 4567 |     "productTypeId": "hard-tube-fittings",
 4568 |     "productTypeName": "紧凑平底接头",
 4569 |     "productId": "809721",
 4570 |     "productCode": "809721",
 4571 |     "seriesId": "compact-flat-bottom-fitting",
 4572 |     "seriesName": "紧凑平底接头",
 4588 |       "微流体液路连接",
 4589 |       "泵阀接口连接",
 4590 |       "流路基板连接",
 4591 |       "IVD与分析仪器"
 4592 |     ],
 4593 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
 4594 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
 4595 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
 4596 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
 4597 |     "additionalImages": [],
 4598 |     "imageAlt": "HF6-U28-25-PK-N 紧凑平底接头 PEEK",
 4599 |     "detailMode": "standard_model",
 4600 |     "hideModelAction": false,
 4601 |     "showConfigurator": false,
 4697 |       {
 4698 |         "question": "HF6-U28-25-PK-N是否可以申请2D图纸？",
 4699 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 4700 |       }
 4701 |     ],
 4702 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-25-pk-n",
 4703 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-25-pk-n",
 4704 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 4705 |     "seo": {
 4706 |       "title": "HF6-U28-25-PK-N 紧凑平底接头 | FOREACH",
 4707 |       "description": "HF6-U28-25-PK-N是一款适用于外径2.5 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 4708 |     },
 4709 |     "sectionTitleMap": {
 4714 |   {
 4715 |     "sourceType": "fitting-detail",
 4716 |     "category": "fittings",
 4717 |     "categoryId": "fittings",
 4718 |     "categoryLabel": "接头系列",
 4719 |     "productTypeId": "hard-tube-fittings",
 4720 |     "productTypeName": "紧凑平底接头",
 4721 |     "productId": "809755",
 4722 |     "productCode": "809755",
 4723 |     "seriesId": "compact-flat-bottom-fitting",
 4724 |     "seriesName": "紧凑平底接头",
 4740 |       "微流体液路连接",
 4741 |       "泵阀接口连接",
 4742 |       "流路基板连接",
 4743 |       "IVD与分析仪器"
 4744 |     ],
 4745 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
 4746 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
 4747 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
 4748 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
 4749 |     "additionalImages": [],
 4750 |     "imageAlt": "HF6-U28-25-PS-B 紧凑平底接头 PPS",
 4751 |     "detailMode": "standard_model",
 4752 |     "hideModelAction": false,
 4753 |     "showConfigurator": false,
 4849 |       {
 4850 |         "question": "HF6-U28-25-PS-B是否可以申请2D图纸？",
 4851 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 4852 |       }
 4853 |     ],
 4854 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-25-ps-b",
 4855 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-25-ps-b",
 4856 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 4857 |     "seo": {
 4858 |       "title": "HF6-U28-25-PS-B 紧凑平底接头 | FOREACH",
 4859 |       "description": "HF6-U28-25-PS-B是一款适用于外径2.5 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 4860 |     },
 4861 |     "sectionTitleMap": {
 4866 |   {
 4867 |     "sourceType": "fitting-detail",
 4868 |     "category": "fittings",
 4869 |     "categoryId": "fittings",
 4870 |     "categoryLabel": "接头系列",
 4871 |     "productTypeId": "hard-tube-fittings",
 4872 |     "productTypeName": "紧凑平底接头",
 4873 |     "productId": "809754",
 4874 |     "productCode": "809754",
 4875 |     "seriesId": "compact-flat-bottom-fitting",
 4876 |     "seriesName": "紧凑平底接头",
 4892 |       "微流体液路连接",
 4893 |       "泵阀接口连接",
 4894 |       "流路基板连接",
 4895 |       "IVD与分析仪器"
 4896 |     ],
 4897 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
 4898 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
 4899 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
 4900 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
 4901 |     "additionalImages": [],
 4902 |     "imageAlt": "HF6-U28-25-PV-N 紧凑平底接头 PVDF",
 4903 |     "detailMode": "standard_model",
 4904 |     "hideModelAction": false,
 4905 |     "showConfigurator": false,
 5001 |       {
 5002 |         "question": "HF6-U28-25-PV-N是否可以申请2D图纸？",
 5003 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5004 |       }
 5005 |     ],
 5006 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-25-pv-n",
 5007 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-25-pv-n",
 5008 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5009 |     "seo": {
 5010 |       "title": "HF6-U28-25-PV-N 紧凑平底接头 | FOREACH",
 5011 |       "description": "HF6-U28-25-PV-N是一款适用于外径2.5 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5012 |     },
 5013 |     "sectionTitleMap": {
 5018 |   {
 5019 |     "sourceType": "fitting-detail",
 5020 |     "category": "fittings",
 5021 |     "categoryId": "fittings",
 5022 |     "categoryLabel": "接头系列",
 5023 |     "productTypeId": "hard-tube-fittings",
 5024 |     "productTypeName": "紧凑平底接头",
 5025 |     "productId": "809722",
 5026 |     "productCode": "809722",
 5027 |     "seriesId": "compact-flat-bottom-fitting",
 5028 |     "seriesName": "紧凑平底接头",
 5044 |       "微流体液路连接",
 5045 |       "泵阀接口连接",
 5046 |       "流路基板连接",
 5047 |       "IVD与分析仪器"
 5048 |     ],
 5049 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
 5050 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
 5051 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
 5052 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
 5053 |     "additionalImages": [],
 5054 |     "imageAlt": "HF6-U28-32-PK-N 紧凑平底接头 PEEK",
 5055 |     "detailMode": "standard_model",
 5056 |     "hideModelAction": false,
 5057 |     "showConfigurator": false,
 5153 |       {
 5154 |         "question": "HF6-U28-32-PK-N是否可以申请2D图纸？",
 5155 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5156 |       }
 5157 |     ],
 5158 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-32-pk-n",
 5159 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-32-pk-n",
 5160 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5161 |     "seo": {
 5162 |       "title": "HF6-U28-32-PK-N 紧凑平底接头 | FOREACH",
 5163 |       "description": "HF6-U28-32-PK-N是一款适用于外径3.2 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5164 |     },
 5165 |     "sectionTitleMap": {
 5170 |   {
 5171 |     "sourceType": "fitting-detail",
 5172 |     "category": "fittings",
 5173 |     "categoryId": "fittings",
 5174 |     "categoryLabel": "接头系列",
 5175 |     "productTypeId": "hard-tube-fittings",
 5176 |     "productTypeName": "紧凑平底接头",
 5177 |     "productId": "809757",
 5178 |     "productCode": "809757",
 5179 |     "seriesId": "compact-flat-bottom-fitting",
 5180 |     "seriesName": "紧凑平底接头",
 5196 |       "微流体液路连接",
 5197 |       "泵阀接口连接",
 5198 |       "流路基板连接",
 5199 |       "IVD与分析仪器"
 5200 |     ],
 5201 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
 5202 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
 5203 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
 5204 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
 5205 |     "additionalImages": [],
 5206 |     "imageAlt": "HF6-U28-32-PS-B 紧凑平底接头 PPS",
 5207 |     "detailMode": "standard_model",
 5208 |     "hideModelAction": false,
 5209 |     "showConfigurator": false,
 5305 |       {
 5306 |         "question": "HF6-U28-32-PS-B是否可以申请2D图纸？",
 5307 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5308 |       }
 5309 |     ],
 5310 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-32-ps-b",
 5311 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-32-ps-b",
 5312 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5313 |     "seo": {
 5314 |       "title": "HF6-U28-32-PS-B 紧凑平底接头 | FOREACH",
 5315 |       "description": "HF6-U28-32-PS-B是一款适用于外径3.2 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5316 |     },
 5317 |     "sectionTitleMap": {
 5322 |   {
 5323 |     "sourceType": "fitting-detail",
 5324 |     "category": "fittings",
 5325 |     "categoryId": "fittings",
 5326 |     "categoryLabel": "接头系列",
 5327 |     "productTypeId": "hard-tube-fittings",
 5328 |     "productTypeName": "紧凑平底接头",
 5329 |     "productId": "809756",
 5330 |     "productCode": "809756",
 5331 |     "seriesId": "compact-flat-bottom-fitting",
 5332 |     "seriesName": "紧凑平底接头",
 5348 |       "微流体液路连接",
 5349 |       "泵阀接口连接",
 5350 |       "流路基板连接",
 5351 |       "IVD与分析仪器"
 5352 |     ],
 5353 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
 5354 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
 5355 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
 5356 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
 5357 |     "additionalImages": [],
 5358 |     "imageAlt": "HF6-U28-32-PV-N 紧凑平底接头 PVDF",
 5359 |     "detailMode": "standard_model",
 5360 |     "hideModelAction": false,
 5361 |     "showConfigurator": false,
 5457 |       {
 5458 |         "question": "HF6-U28-32-PV-N是否可以申请2D图纸？",
 5459 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5460 |       }
 5461 |     ],
 5462 |     "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-32-pv-n",
 5463 |     "href": "/products/fittings/hard-tube-fittings/hf6-u28-32-pv-n",
 5464 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5465 |     "seo": {
 5466 |       "title": "HF6-U28-32-PV-N 紧凑平底接头 | FOREACH",
 5467 |       "description": "HF6-U28-32-PV-N是一款适用于外径3.2 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5468 |     },
 5469 |     "sectionTitleMap": {
 5474 |   {
 5475 |     "sourceType": "fitting-detail",
 5476 |     "category": "fittings",
 5477 |     "categoryId": "fittings",
 5478 |     "categoryLabel": "接头系列",
 5479 |     "productTypeId": "hard-tube-fittings",
 5480 |     "productTypeName": "标滚平底接头",
 5481 |     "productId": "809421",
 5482 |     "productCode": "809421",
 5483 |     "seriesId": "standard-flat-bottom-fitting",
 5484 |     "seriesName": "标滚平底接头",
 5500 |       "微流体液路连接",
 5501 |       "泵阀接口连接",
 5502 |       "流路基板连接",
 5503 |       "IVD与分析仪器"
 5504 |     ],
 5505 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
 5506 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
 5507 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
 5508 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
 5509 |     "additionalImages": [],
 5510 |     "imageAlt": "HFL-M6-16-PV-B 标滚平底接头 PVDF",
 5511 |     "detailMode": "standard_model",
 5512 |     "hideModelAction": false,
 5513 |     "showConfigurator": false,
 5609 |       {
 5610 |         "question": "HFL-M6-16-PV-B是否可以申请2D图纸？",
 5611 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5612 |       }
 5613 |     ],
 5614 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-b",
 5615 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-b",
 5616 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5617 |     "seo": {
 5618 |       "title": "HFL-M6-16-PV-B 标滚平底接头 | FOREACH",
 5619 |       "description": "HFL-M6-16-PV-B是一款适用于外径1.6 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5620 |     },
 5621 |     "sectionTitleMap": {
 5626 |   {
 5627 |     "sourceType": "fitting-detail",
 5628 |     "category": "fittings",
 5629 |     "categoryId": "fittings",
 5630 |     "categoryLabel": "接头系列",
 5631 |     "productTypeId": "hard-tube-fittings",
 5632 |     "productTypeName": "标滚平底接头",
 5633 |     "productId": "809032",
 5634 |     "productCode": "809032",
 5635 |     "seriesId": "standard-flat-bottom-fitting",
 5636 |     "seriesName": "标滚平底接头",
 5652 |       "微流体液路连接",
 5653 |       "泵阀接口连接",
 5654 |       "流路基板连接",
 5655 |       "IVD与分析仪器"
 5656 |     ],
 5657 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
 5658 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
 5659 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
 5660 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
 5661 |     "additionalImages": [],
 5662 |     "imageAlt": "HFL-M6-16-PV-N 标滚平底接头 PVDF",
 5663 |     "detailMode": "standard_model",
 5664 |     "hideModelAction": false,
 5665 |     "showConfigurator": false,
 5761 |       {
 5762 |         "question": "HFL-M6-16-PV-N是否可以申请2D图纸？",
 5763 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5764 |       }
 5765 |     ],
 5766 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n",
 5767 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n",
 5768 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5769 |     "seo": {
 5770 |       "title": "HFL-M6-16-PV-N 标滚平底接头 | FOREACH",
 5771 |       "description": "HFL-M6-16-PV-N是一款适用于外径1.6 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5772 |     },
 5773 |     "sectionTitleMap": {
 5778 |   {
 5779 |     "sourceType": "fitting-detail",
 5780 |     "category": "fittings",
 5781 |     "categoryId": "fittings",
 5782 |     "categoryLabel": "接头系列",
 5783 |     "productTypeId": "hard-tube-fittings",
 5784 |     "productTypeName": "标滚平底接头",
 5785 |     "productId": "809044",
 5786 |     "productCode": "809044",
 5787 |     "seriesId": "standard-flat-bottom-fitting",
 5788 |     "seriesName": "标滚平底接头",
 5804 |       "微流体液路连接",
 5805 |       "泵阀接口连接",
 5806 |       "流路基板连接",
 5807 |       "IVD与分析仪器"
 5808 |     ],
 5809 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
 5810 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
 5811 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
 5812 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
 5813 |     "additionalImages": [],
 5814 |     "imageAlt": "HFL-M6-20-PV-B 标滚平底接头 PVDF",
 5815 |     "detailMode": "standard_model",
 5816 |     "hideModelAction": false,
 5817 |     "showConfigurator": false,
 5913 |       {
 5914 |         "question": "HFL-M6-20-PV-B是否可以申请2D图纸？",
 5915 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 5916 |       }
 5917 |     ],
 5918 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-20-pv-b",
 5919 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-20-pv-b",
 5920 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 5921 |     "seo": {
 5922 |       "title": "HFL-M6-20-PV-B 标滚平底接头 | FOREACH",
 5923 |       "description": "HFL-M6-20-PV-B是一款适用于外径2.0 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 5924 |     },
 5925 |     "sectionTitleMap": {
 5930 |   {
 5931 |     "sourceType": "fitting-detail",
 5932 |     "category": "fittings",
 5933 |     "categoryId": "fittings",
 5934 |     "categoryLabel": "接头系列",
 5935 |     "productTypeId": "hard-tube-fittings",
 5936 |     "productTypeName": "标滚平底接头",
 5937 |     "productId": "809043",
 5938 |     "productCode": "809043",
 5939 |     "seriesId": "standard-flat-bottom-fitting",
 5940 |     "seriesName": "标滚平底接头",
 5956 |       "微流体液路连接",
 5957 |       "泵阀接口连接",
 5958 |       "流路基板连接",
 5959 |       "IVD与分析仪器"
 5960 |     ],
 5961 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
 5962 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
 5963 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
 5964 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
 5965 |     "additionalImages": [],
 5966 |     "imageAlt": "HFL-M6-20-PV-N 标滚平底接头 PVDF",
 5967 |     "detailMode": "standard_model",
 5968 |     "hideModelAction": false,
 5969 |     "showConfigurator": false,
 6065 |       {
 6066 |         "question": "HFL-M6-20-PV-N是否可以申请2D图纸？",
 6067 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6068 |       }
 6069 |     ],
 6070 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-20-pv-n",
 6071 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-20-pv-n",
 6072 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6073 |     "seo": {
 6074 |       "title": "HFL-M6-20-PV-N 标滚平底接头 | FOREACH",
 6075 |       "description": "HFL-M6-20-PV-N是一款适用于外径2.0 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6076 |     },
 6077 |     "sectionTitleMap": {
 6082 |   {
 6083 |     "sourceType": "fitting-detail",
 6084 |     "category": "fittings",
 6085 |     "categoryId": "fittings",
 6086 |     "categoryLabel": "接头系列",
 6087 |     "productTypeId": "hard-tube-fittings",
 6088 |     "productTypeName": "标滚平底接头",
 6089 |     "productId": "809422",
 6090 |     "productCode": "809422",
 6091 |     "seriesId": "standard-flat-bottom-fitting",
 6092 |     "seriesName": "标滚平底接头",
 6108 |       "微流体液路连接",
 6109 |       "泵阀接口连接",
 6110 |       "流路基板连接",
 6111 |       "IVD与分析仪器"
 6112 |     ],
 6113 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
 6114 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
 6115 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
 6116 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
 6117 |     "additionalImages": [],
 6118 |     "imageAlt": "HFL-M6-25-PV-B 标滚平底接头 PVDF",
 6119 |     "detailMode": "standard_model",
 6120 |     "hideModelAction": false,
 6121 |     "showConfigurator": false,
 6217 |       {
 6218 |         "question": "HFL-M6-25-PV-B是否可以申请2D图纸？",
 6219 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6220 |       }
 6221 |     ],
 6222 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-b",
 6223 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-b",
 6224 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6225 |     "seo": {
 6226 |       "title": "HFL-M6-25-PV-B 标滚平底接头 | FOREACH",
 6227 |       "description": "HFL-M6-25-PV-B是一款适用于外径2.5 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6228 |     },
 6229 |     "sectionTitleMap": {
 6234 |   {
 6235 |     "sourceType": "fitting-detail",
 6236 |     "category": "fittings",
 6237 |     "categoryId": "fittings",
 6238 |     "categoryLabel": "接头系列",
 6239 |     "productTypeId": "hard-tube-fittings",
 6240 |     "productTypeName": "标滚平底接头",
 6241 |     "productId": "809054",
 6242 |     "productCode": "809054",
 6243 |     "seriesId": "standard-flat-bottom-fitting",
 6244 |     "seriesName": "标滚平底接头",
 6260 |       "微流体液路连接",
 6261 |       "泵阀接口连接",
 6262 |       "流路基板连接",
 6263 |       "IVD与分析仪器"
 6264 |     ],
 6265 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
 6266 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
 6267 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
 6268 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
 6269 |     "additionalImages": [],
 6270 |     "imageAlt": "HFL-M6-25-PV-N 标滚平底接头 PVDF",
 6271 |     "detailMode": "standard_model",
 6272 |     "hideModelAction": false,
 6273 |     "showConfigurator": false,
 6369 |       {
 6370 |         "question": "HFL-M6-25-PV-N是否可以申请2D图纸？",
 6371 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6372 |       }
 6373 |     ],
 6374 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-n",
 6375 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-n",
 6376 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6377 |     "seo": {
 6378 |       "title": "HFL-M6-25-PV-N 标滚平底接头 | FOREACH",
 6379 |       "description": "HFL-M6-25-PV-N是一款适用于外径2.5 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6380 |     },
 6381 |     "sectionTitleMap": {
 6386 |   {
 6387 |     "sourceType": "fitting-detail",
 6388 |     "category": "fittings",
 6389 |     "categoryId": "fittings",
 6390 |     "categoryLabel": "接头系列",
 6391 |     "productTypeId": "hard-tube-fittings",
 6392 |     "productTypeName": "标滚平底接头",
 6393 |     "productId": "809049",
 6394 |     "productCode": "809049",
 6395 |     "seriesId": "standard-flat-bottom-fitting",
 6396 |     "seriesName": "标滚平底接头",
 6412 |       "微流体液路连接",
 6413 |       "泵阀接口连接",
 6414 |       "流路基板连接",
 6415 |       "IVD与分析仪器"
 6416 |     ],
 6417 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
 6418 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
 6419 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
 6420 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
 6421 |     "additionalImages": [],
 6422 |     "imageAlt": "HFL-M6-30-PV-B 标滚平底接头 PVDF",
 6423 |     "detailMode": "standard_model",
 6424 |     "hideModelAction": false,
 6425 |     "showConfigurator": false,
 6521 |       {
 6522 |         "question": "HFL-M6-30-PV-B是否可以申请2D图纸？",
 6523 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6524 |       }
 6525 |     ],
 6526 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-30-pv-b",
 6527 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-30-pv-b",
 6528 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6529 |     "seo": {
 6530 |       "title": "HFL-M6-30-PV-B 标滚平底接头 | FOREACH",
 6531 |       "description": "HFL-M6-30-PV-B是一款适用于外径3.0 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6532 |     },
 6533 |     "sectionTitleMap": {
 6538 |   {
 6539 |     "sourceType": "fitting-detail",
 6540 |     "category": "fittings",
 6541 |     "categoryId": "fittings",
 6542 |     "categoryLabel": "接头系列",
 6543 |     "productTypeId": "hard-tube-fittings",
 6544 |     "productTypeName": "标滚平底接头",
 6545 |     "productId": "809048",
 6546 |     "productCode": "809048",
 6547 |     "seriesId": "standard-flat-bottom-fitting",
 6548 |     "seriesName": "标滚平底接头",
 6564 |       "微流体液路连接",
 6565 |       "泵阀接口连接",
 6566 |       "流路基板连接",
 6567 |       "IVD与分析仪器"
 6568 |     ],
 6569 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
 6570 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
 6571 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
 6572 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
 6573 |     "additionalImages": [],
 6574 |     "imageAlt": "HFL-M6-30-PV-N 标滚平底接头 PVDF",
 6575 |     "detailMode": "standard_model",
 6576 |     "hideModelAction": false,
 6577 |     "showConfigurator": false,
 6673 |       {
 6674 |         "question": "HFL-M6-30-PV-N是否可以申请2D图纸？",
 6675 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6676 |       }
 6677 |     ],
 6678 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-30-pv-n",
 6679 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-30-pv-n",
 6680 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6681 |     "seo": {
 6682 |       "title": "HFL-M6-30-PV-N 标滚平底接头 | FOREACH",
 6683 |       "description": "HFL-M6-30-PV-N是一款适用于外径3.0 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6684 |     },
 6685 |     "sectionTitleMap": {
 6690 |   {
 6691 |     "sourceType": "fitting-detail",
 6692 |     "category": "fittings",
 6693 |     "categoryId": "fittings",
 6694 |     "categoryLabel": "接头系列",
 6695 |     "productTypeId": "hard-tube-fittings",
 6696 |     "productTypeName": "标滚平底接头",
 6697 |     "productId": "809423",
 6698 |     "productCode": "809423",
 6699 |     "seriesId": "standard-flat-bottom-fitting",
 6700 |     "seriesName": "标滚平底接头",
 6716 |       "微流体液路连接",
 6717 |       "泵阀接口连接",
 6718 |       "流路基板连接",
 6719 |       "IVD与分析仪器"
 6720 |     ],
 6721 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
 6722 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
 6723 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
 6724 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
 6725 |     "additionalImages": [],
 6726 |     "imageAlt": "HFL-M6-32-PV-B 标滚平底接头 PVDF",
 6727 |     "detailMode": "standard_model",
 6728 |     "hideModelAction": false,
 6729 |     "showConfigurator": false,
 6825 |       {
 6826 |         "question": "HFL-M6-32-PV-B是否可以申请2D图纸？",
 6827 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6828 |       }
 6829 |     ],
 6830 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-32-pv-b",
 6831 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-32-pv-b",
 6832 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6833 |     "seo": {
 6834 |       "title": "HFL-M6-32-PV-B 标滚平底接头 | FOREACH",
 6835 |       "description": "HFL-M6-32-PV-B是一款适用于外径3.2 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6836 |     },
 6837 |     "sectionTitleMap": {
 6842 |   {
 6843 |     "sourceType": "fitting-detail",
 6844 |     "category": "fittings",
 6845 |     "categoryId": "fittings",
 6846 |     "categoryLabel": "接头系列",
 6847 |     "productTypeId": "hard-tube-fittings",
 6848 |     "productTypeName": "标滚平底接头",
 6849 |     "productId": "809037",
 6850 |     "productCode": "809037",
 6851 |     "seriesId": "standard-flat-bottom-fitting",
 6852 |     "seriesName": "标滚平底接头",
 6868 |       "微流体液路连接",
 6869 |       "泵阀接口连接",
 6870 |       "流路基板连接",
 6871 |       "IVD与分析仪器"
 6872 |     ],
 6873 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
 6874 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
 6875 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
 6876 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
 6877 |     "additionalImages": [],
 6878 |     "imageAlt": "HFL-M6-32-PV-N 标滚平底接头 PVDF",
 6879 |     "detailMode": "standard_model",
 6880 |     "hideModelAction": false,
 6881 |     "showConfigurator": false,
 6977 |       {
 6978 |         "question": "HFL-M6-32-PV-N是否可以申请2D图纸？",
 6979 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 6980 |       }
 6981 |     ],
 6982 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-32-pv-n",
 6983 |     "href": "/products/fittings/hard-tube-fittings/hfl-m6-32-pv-n",
 6984 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 6985 |     "seo": {
 6986 |       "title": "HFL-M6-32-PV-N 标滚平底接头 | FOREACH",
 6987 |       "description": "HFL-M6-32-PV-N是一款适用于外径3.2 mm硬管的标滚平底接头，采用M6×1螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 6988 |     },
 6989 |     "sectionTitleMap": {
 6994 |   {
 6995 |     "sourceType": "fitting-detail",
 6996 |     "category": "fittings",
 6997 |     "categoryId": "fittings",
 6998 |     "categoryLabel": "接头系列",
 6999 |     "productTypeId": "hard-tube-fittings",
 7000 |     "productTypeName": "标滚平底接头",
 7001 |     "productId": "809391",
 7002 |     "productCode": "809391",
 7003 |     "seriesId": "standard-flat-bottom-fitting",
 7004 |     "seriesName": "标滚平底接头",
 7020 |       "微流体液路连接",
 7021 |       "泵阀接口连接",
 7022 |       "流路基板连接",
 7023 |       "IVD与分析仪器"
 7024 |     ],
 7025 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
 7026 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
 7027 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
 7028 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
 7029 |     "additionalImages": [],
 7030 |     "imageAlt": "HFL-U28-16-PV-B 标滚平底接头 PVDF",
 7031 |     "detailMode": "standard_model",
 7032 |     "hideModelAction": false,
 7033 |     "showConfigurator": false,
 7129 |       {
 7130 |         "question": "HFL-U28-16-PV-B是否可以申请2D图纸？",
 7131 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 7132 |       }
 7133 |     ],
 7134 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-16-pv-b",
 7135 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-16-pv-b",
 7136 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 7137 |     "seo": {
 7138 |       "title": "HFL-U28-16-PV-B 标滚平底接头 | FOREACH",
 7139 |       "description": "HFL-U28-16-PV-B是一款适用于外径1.6 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 7140 |     },
 7141 |     "sectionTitleMap": {
 7146 |   {
 7147 |     "sourceType": "fitting-detail",
 7148 |     "category": "fittings",
 7149 |     "categoryId": "fittings",
 7150 |     "categoryLabel": "接头系列",
 7151 |     "productTypeId": "hard-tube-fittings",
 7152 |     "productTypeName": "标滚平底接头",
 7153 |     "productId": "809030",
 7154 |     "productCode": "809030",
 7155 |     "seriesId": "standard-flat-bottom-fitting",
 7156 |     "seriesName": "标滚平底接头",
 7172 |       "微流体液路连接",
 7173 |       "泵阀接口连接",
 7174 |       "流路基板连接",
 7175 |       "IVD与分析仪器"
 7176 |     ],
 7177 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
 7178 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
 7179 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
 7180 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
 7181 |     "additionalImages": [],
 7182 |     "imageAlt": "HFL-U28-16-PV-N 标滚平底接头 PVDF",
 7183 |     "detailMode": "standard_model",
 7184 |     "hideModelAction": false,
 7185 |     "showConfigurator": false,
 7281 |       {
 7282 |         "question": "HFL-U28-16-PV-N是否可以申请2D图纸？",
 7283 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 7284 |       }
 7285 |     ],
 7286 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-16-pv-n",
 7287 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-16-pv-n",
 7288 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 7289 |     "seo": {
 7290 |       "title": "HFL-U28-16-PV-N 标滚平底接头 | FOREACH",
 7291 |       "description": "HFL-U28-16-PV-N是一款适用于外径1.6 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 7292 |     },
 7293 |     "sectionTitleMap": {
 7298 |   {
 7299 |     "sourceType": "fitting-detail",
 7300 |     "category": "fittings",
 7301 |     "categoryId": "fittings",
 7302 |     "categoryLabel": "接头系列",
 7303 |     "productTypeId": "hard-tube-fittings",
 7304 |     "productTypeName": "标滚平底接头",
 7305 |     "productId": "809041",
 7306 |     "productCode": "809041",
 7307 |     "seriesId": "standard-flat-bottom-fitting",
 7308 |     "seriesName": "标滚平底接头",
 7324 |       "微流体液路连接",
 7325 |       "泵阀接口连接",
 7326 |       "流路基板连接",
 7327 |       "IVD与分析仪器"
 7328 |     ],
 7329 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
 7330 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
 7331 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
 7332 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
 7333 |     "additionalImages": [],
 7334 |     "imageAlt": "HFL-U28-20-PV-B 标滚平底接头 PVDF",
 7335 |     "detailMode": "standard_model",
 7336 |     "hideModelAction": false,
 7337 |     "showConfigurator": false,
 7433 |       {
 7434 |         "question": "HFL-U28-20-PV-B是否可以申请2D图纸？",
 7435 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 7436 |       }
 7437 |     ],
 7438 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-20-pv-b",
 7439 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-20-pv-b",
 7440 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 7441 |     "seo": {
 7442 |       "title": "HFL-U28-20-PV-B 标滚平底接头 | FOREACH",
 7443 |       "description": "HFL-U28-20-PV-B是一款适用于外径2.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 7444 |     },
 7445 |     "sectionTitleMap": {
 7450 |   {
 7451 |     "sourceType": "fitting-detail",
 7452 |     "category": "fittings",
 7453 |     "categoryId": "fittings",
 7454 |     "categoryLabel": "接头系列",
 7455 |     "productTypeId": "hard-tube-fittings",
 7456 |     "productTypeName": "标滚平底接头",
 7457 |     "productId": "809040",
 7458 |     "productCode": "809040",
 7459 |     "seriesId": "standard-flat-bottom-fitting",
 7460 |     "seriesName": "标滚平底接头",
 7476 |       "微流体液路连接",
 7477 |       "泵阀接口连接",
 7478 |       "流路基板连接",
 7479 |       "IVD与分析仪器"
 7480 |     ],
 7481 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
 7482 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
 7483 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
 7484 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
 7485 |     "additionalImages": [],
 7486 |     "imageAlt": "HFL-U28-20-PV-N 标滚平底接头 PVDF",
 7487 |     "detailMode": "standard_model",
 7488 |     "hideModelAction": false,
 7489 |     "showConfigurator": false,
 7585 |       {
 7586 |         "question": "HFL-U28-20-PV-N是否可以申请2D图纸？",
 7587 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 7588 |       }
 7589 |     ],
 7590 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-20-pv-n",
 7591 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-20-pv-n",
 7592 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 7593 |     "seo": {
 7594 |       "title": "HFL-U28-20-PV-N 标滚平底接头 | FOREACH",
 7595 |       "description": "HFL-U28-20-PV-N是一款适用于外径2.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 7596 |     },
 7597 |     "sectionTitleMap": {
 7602 |   {
 7603 |     "sourceType": "fitting-detail",
 7604 |     "category": "fittings",
 7605 |     "categoryId": "fittings",
 7606 |     "categoryLabel": "接头系列",
 7607 |     "productTypeId": "hard-tube-fittings",
 7608 |     "productTypeName": "标滚平底接头",
 7609 |     "productId": "809392",
 7610 |     "productCode": "809392",
 7611 |     "seriesId": "standard-flat-bottom-fitting",
 7612 |     "seriesName": "标滚平底接头",
 7628 |       "微流体液路连接",
 7629 |       "泵阀接口连接",
 7630 |       "流路基板连接",
 7631 |       "IVD与分析仪器"
 7632 |     ],
 7633 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
 7634 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
 7635 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
 7636 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
 7637 |     "additionalImages": [],
 7638 |     "imageAlt": "HFL-U28-25-PV-B 标滚平底接头 PVDF",
 7639 |     "detailMode": "standard_model",
 7640 |     "hideModelAction": false,
 7641 |     "showConfigurator": false,
 7737 |       {
 7738 |         "question": "HFL-U28-25-PV-B是否可以申请2D图纸？",
 7739 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 7740 |       }
 7741 |     ],
 7742 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-25-pv-b",
 7743 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-25-pv-b",
 7744 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 7745 |     "seo": {
 7746 |       "title": "HFL-U28-25-PV-B 标滚平底接头 | FOREACH",
 7747 |       "description": "HFL-U28-25-PV-B是一款适用于外径2.5 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 7748 |     },
 7749 |     "sectionTitleMap": {
 7754 |   {
 7755 |     "sourceType": "fitting-detail",
 7756 |     "category": "fittings",
 7757 |     "categoryId": "fittings",
 7758 |     "categoryLabel": "接头系列",
 7759 |     "productTypeId": "hard-tube-fittings",
 7760 |     "productTypeName": "标滚平底接头",
 7761 |     "productId": "809052",
 7762 |     "productCode": "809052",
 7763 |     "seriesId": "standard-flat-bottom-fitting",
 7764 |     "seriesName": "标滚平底接头",
 7780 |       "微流体液路连接",
 7781 |       "泵阀接口连接",
 7782 |       "流路基板连接",
 7783 |       "IVD与分析仪器"
 7784 |     ],
 7785 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
 7786 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
 7787 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
 7788 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
 7789 |     "additionalImages": [],
 7790 |     "imageAlt": "HFL-U28-25-PV-N 标滚平底接头 PVDF",
 7791 |     "detailMode": "standard_model",
 7792 |     "hideModelAction": false,
 7793 |     "showConfigurator": false,
 7889 |       {
 7890 |         "question": "HFL-U28-25-PV-N是否可以申请2D图纸？",
 7891 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 7892 |       }
 7893 |     ],
 7894 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-25-pv-n",
 7895 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-25-pv-n",
 7896 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 7897 |     "seo": {
 7898 |       "title": "HFL-U28-25-PV-N 标滚平底接头 | FOREACH",
 7899 |       "description": "HFL-U28-25-PV-N是一款适用于外径2.5 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 7900 |     },
 7901 |     "sectionTitleMap": {
 7906 |   {
 7907 |     "sourceType": "fitting-detail",
 7908 |     "category": "fittings",
 7909 |     "categoryId": "fittings",
 7910 |     "categoryLabel": "接头系列",
 7911 |     "productTypeId": "hard-tube-fittings",
 7912 |     "productTypeName": "标滚平底接头",
 7913 |     "productId": "809394",
 7914 |     "productCode": "809394",
 7915 |     "seriesId": "standard-flat-bottom-fitting",
 7916 |     "seriesName": "标滚平底接头",
 7932 |       "微流体液路连接",
 7933 |       "泵阀接口连接",
 7934 |       "流路基板连接",
 7935 |       "IVD与分析仪器"
 7936 |     ],
 7937 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
 7938 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
 7939 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
 7940 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
 7941 |     "additionalImages": [],
 7942 |     "imageAlt": "HFL-U28-30-PV-B 标滚平底接头 PVDF",
 7943 |     "detailMode": "standard_model",
 7944 |     "hideModelAction": false,
 7945 |     "showConfigurator": false,
 8041 |       {
 8042 |         "question": "HFL-U28-30-PV-B是否可以申请2D图纸？",
 8043 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8044 |       }
 8045 |     ],
 8046 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-30-pv-b",
 8047 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-30-pv-b",
 8048 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8049 |     "seo": {
 8050 |       "title": "HFL-U28-30-PV-B 标滚平底接头 | FOREACH",
 8051 |       "description": "HFL-U28-30-PV-B是一款适用于外径3.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8052 |     },
 8053 |     "sectionTitleMap": {
 8058 |   {
 8059 |     "sourceType": "fitting-detail",
 8060 |     "category": "fittings",
 8061 |     "categoryId": "fittings",
 8062 |     "categoryLabel": "接头系列",
 8063 |     "productTypeId": "hard-tube-fittings",
 8064 |     "productTypeName": "标滚平底接头",
 8065 |     "productId": "809047",
 8066 |     "productCode": "809047",
 8067 |     "seriesId": "standard-flat-bottom-fitting",
 8068 |     "seriesName": "标滚平底接头",
 8084 |       "微流体液路连接",
 8085 |       "泵阀接口连接",
 8086 |       "流路基板连接",
 8087 |       "IVD与分析仪器"
 8088 |     ],
 8089 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
 8090 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
 8091 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
 8092 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
 8093 |     "additionalImages": [],
 8094 |     "imageAlt": "HFL-U28-30-PV-N 标滚平底接头 PVDF",
 8095 |     "detailMode": "standard_model",
 8096 |     "hideModelAction": false,
 8097 |     "showConfigurator": false,
 8193 |       {
 8194 |         "question": "HFL-U28-30-PV-N是否可以申请2D图纸？",
 8195 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8196 |       }
 8197 |     ],
 8198 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-30-pv-n",
 8199 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-30-pv-n",
 8200 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8201 |     "seo": {
 8202 |       "title": "HFL-U28-30-PV-N 标滚平底接头 | FOREACH",
 8203 |       "description": "HFL-U28-30-PV-N是一款适用于外径3.0 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8204 |     },
 8205 |     "sectionTitleMap": {
 8210 |   {
 8211 |     "sourceType": "fitting-detail",
 8212 |     "category": "fittings",
 8213 |     "categoryId": "fittings",
 8214 |     "categoryLabel": "接头系列",
 8215 |     "productTypeId": "hard-tube-fittings",
 8216 |     "productTypeName": "标滚平底接头",
 8217 |     "productId": "809393",
 8218 |     "productCode": "809393",
 8219 |     "seriesId": "standard-flat-bottom-fitting",
 8220 |     "seriesName": "标滚平底接头",
 8236 |       "微流体液路连接",
 8237 |       "泵阀接口连接",
 8238 |       "流路基板连接",
 8239 |       "IVD与分析仪器"
 8240 |     ],
 8241 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
 8242 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
 8243 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
 8244 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
 8245 |     "additionalImages": [],
 8246 |     "imageAlt": "HFL-U28-32-PV-B 标滚平底接头 PVDF",
 8247 |     "detailMode": "standard_model",
 8248 |     "hideModelAction": false,
 8249 |     "showConfigurator": false,
 8345 |       {
 8346 |         "question": "HFL-U28-32-PV-B是否可以申请2D图纸？",
 8347 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8348 |       }
 8349 |     ],
 8350 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-32-pv-b",
 8351 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-32-pv-b",
 8352 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8353 |     "seo": {
 8354 |       "title": "HFL-U28-32-PV-B 标滚平底接头 | FOREACH",
 8355 |       "description": "HFL-U28-32-PV-B是一款适用于外径3.2 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8356 |     },
 8357 |     "sectionTitleMap": {
 8362 |   {
 8363 |     "sourceType": "fitting-detail",
 8364 |     "category": "fittings",
 8365 |     "categoryId": "fittings",
 8366 |     "categoryLabel": "接头系列",
 8367 |     "productTypeId": "hard-tube-fittings",
 8368 |     "productTypeName": "标滚平底接头",
 8369 |     "productId": "809035",
 8370 |     "productCode": "809035",
 8371 |     "seriesId": "standard-flat-bottom-fitting",
 8372 |     "seriesName": "标滚平底接头",
 8388 |       "微流体液路连接",
 8389 |       "泵阀接口连接",
 8390 |       "流路基板连接",
 8391 |       "IVD与分析仪器"
 8392 |     ],
 8393 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
 8394 |     "image": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
 8395 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
 8396 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
 8397 |     "additionalImages": [],
 8398 |     "imageAlt": "HFL-U28-32-PV-N 标滚平底接头 PVDF",
 8399 |     "detailMode": "standard_model",
 8400 |     "hideModelAction": false,
 8401 |     "showConfigurator": false,
 8497 |       {
 8498 |         "question": "HFL-U28-32-PV-N是否可以申请2D图纸？",
 8499 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8500 |       }
 8501 |     ],
 8502 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-32-pv-n",
 8503 |     "href": "/products/fittings/hard-tube-fittings/hfl-u28-32-pv-n",
 8504 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8505 |     "seo": {
 8506 |       "title": "HFL-U28-32-PV-N 标滚平底接头 | FOREACH",
 8507 |       "description": "HFL-U28-32-PV-N是一款适用于外径3.2 mm硬管的标滚平底接头，采用1/4-28 UNF螺纹、PVDF主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8508 |     },
 8509 |     "sectionTitleMap": {
 8514 |   {
 8515 |     "sourceType": "fitting-detail",
 8516 |     "category": "fittings",
 8517 |     "categoryId": "fittings",
 8518 |     "categoryLabel": "接头系列",
 8519 |     "productTypeId": "hard-tube-fittings",
 8520 |     "productTypeName": "紧凑平底接头",
 8521 |     "productId": "809058",
 8522 |     "productCode": "809058",
 8523 |     "seriesId": "compact-flat-bottom-fitting",
 8524 |     "seriesName": "紧凑平底接头",
 8540 |       "微流体液路连接",
 8541 |       "泵阀接口连接",
 8542 |       "流路基板连接",
 8543 |       "IVD与分析仪器"
 8544 |     ],
 8545 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
 8546 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
 8547 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
 8548 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
 8549 |     "additionalImages": [
 8550 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-ps-b-main.jpg"
 8551 |     ],
 8552 |     "imageAlt": "HFL6-M6-16-PS-B 紧凑平底接头 PPS",
 8553 |     "detailMode": "standard_model",
 8554 |     "hideModelAction": false,
 8555 |     "showConfigurator": false,
 8651 |       {
 8652 |         "question": "HFL6-M6-16-PS-B是否可以申请2D图纸？",
 8653 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8654 |       }
 8655 |     ],
 8656 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-16-ps-b",
 8657 |     "href": "/products/fittings/hard-tube-fittings/hfl6-m6-16-ps-b",
 8658 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8659 |     "seo": {
 8660 |       "title": "HFL6-M6-16-PS-B 紧凑平底接头 | FOREACH",
 8661 |       "description": "HFL6-M6-16-PS-B是一款适用于外径1.6 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8662 |     },
 8663 |     "sectionTitleMap": {
 8668 |   {
 8669 |     "sourceType": "fitting-detail",
 8670 |     "category": "fittings",
 8671 |     "categoryId": "fittings",
 8672 |     "categoryLabel": "接头系列",
 8673 |     "productTypeId": "hard-tube-fittings",
 8674 |     "productTypeName": "紧凑平底接头",
 8675 |     "productId": "809078",
 8676 |     "productCode": "809078",
 8677 |     "seriesId": "compact-flat-bottom-fitting",
 8678 |     "seriesName": "紧凑平底接头",
 8694 |       "微流体液路连接",
 8695 |       "泵阀接口连接",
 8696 |       "流路基板连接",
 8697 |       "IVD与分析仪器"
 8698 |     ],
 8699 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
 8700 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
 8701 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
 8702 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
 8703 |     "additionalImages": [
 8704 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-ps-b-main.jpg"
 8705 |     ],
 8706 |     "imageAlt": "HFL6-M6-20-PS-B 紧凑平底接头 PPS",
 8707 |     "detailMode": "standard_model",
 8708 |     "hideModelAction": false,
 8709 |     "showConfigurator": false,
 8805 |       {
 8806 |         "question": "HFL6-M6-20-PS-B是否可以申请2D图纸？",
 8807 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8808 |       }
 8809 |     ],
 8810 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-20-ps-b",
 8811 |     "href": "/products/fittings/hard-tube-fittings/hfl6-m6-20-ps-b",
 8812 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8813 |     "seo": {
 8814 |       "title": "HFL6-M6-20-PS-B 紧凑平底接头 | FOREACH",
 8815 |       "description": "HFL6-M6-20-PS-B是一款适用于外径2.0 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8816 |     },
 8817 |     "sectionTitleMap": {
 8822 |   {
 8823 |     "sourceType": "fitting-detail",
 8824 |     "category": "fittings",
 8825 |     "categoryId": "fittings",
 8826 |     "categoryLabel": "接头系列",
 8827 |     "productTypeId": "hard-tube-fittings",
 8828 |     "productTypeName": "紧凑平底接头",
 8829 |     "productId": "809098",
 8830 |     "productCode": "809098",
 8831 |     "seriesId": "compact-flat-bottom-fitting",
 8832 |     "seriesName": "紧凑平底接头",
 8848 |       "微流体液路连接",
 8849 |       "泵阀接口连接",
 8850 |       "流路基板连接",
 8851 |       "IVD与分析仪器"
 8852 |     ],
 8853 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 8854 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 8855 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 8856 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 8857 |     "additionalImages": [
 8858 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-ps-b-main.jpg"
 8859 |     ],
 8860 |     "imageAlt": "HFL6-M6-25-PS-B 紧凑平底接头 PPS",
 8861 |     "detailMode": "standard_model",
 8862 |     "hideModelAction": false,
 8863 |     "showConfigurator": false,
 8959 |       {
 8960 |         "question": "HFL6-M6-25-PS-B是否可以申请2D图纸？",
 8961 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 8962 |       }
 8963 |     ],
 8964 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-25-ps-b",
 8965 |     "href": "/products/fittings/hard-tube-fittings/hfl6-m6-25-ps-b",
 8966 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 8967 |     "seo": {
 8968 |       "title": "HFL6-M6-25-PS-B 紧凑平底接头 | FOREACH",
 8969 |       "description": "HFL6-M6-25-PS-B是一款适用于外径2.5 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 8970 |     },
 8971 |     "sectionTitleMap": {
 8976 |   {
 8977 |     "sourceType": "fitting-detail",
 8978 |     "category": "fittings",
 8979 |     "categoryId": "fittings",
 8980 |     "categoryLabel": "接头系列",
 8981 |     "productTypeId": "hard-tube-fittings",
 8982 |     "productTypeName": "紧凑平底接头",
 8983 |     "productId": "809549",
 8984 |     "productCode": "809549",
 8985 |     "seriesId": "compact-flat-bottom-fitting",
 8986 |     "seriesName": "紧凑平底接头",
 9002 |       "微流体液路连接",
 9003 |       "泵阀接口连接",
 9004 |       "流路基板连接",
 9005 |       "IVD与分析仪器"
 9006 |     ],
 9007 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 9008 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 9009 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 9010 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 9011 |     "additionalImages": [],
 9012 |     "imageAlt": "HFL6-M6-25-PS-U 紧凑平底接头 PPS",
 9013 |     "detailMode": "standard_model",
 9014 |     "hideModelAction": false,
 9015 |     "showConfigurator": false,
 9111 |       {
 9112 |         "question": "HFL6-M6-25-PS-U是否可以申请2D图纸？",
 9113 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 9114 |       }
 9115 |     ],
 9116 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-25-ps-u",
 9117 |     "href": "/products/fittings/hard-tube-fittings/hfl6-m6-25-ps-u",
 9118 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 9119 |     "seo": {
 9120 |       "title": "HFL6-M6-25-PS-U 紧凑平底接头 | FOREACH",
 9121 |       "description": "HFL6-M6-25-PS-U是一款适用于外径2.5 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 9122 |     },
 9123 |     "sectionTitleMap": {
 9128 |   {
 9129 |     "sourceType": "fitting-detail",
 9130 |     "category": "fittings",
 9131 |     "categoryId": "fittings",
 9132 |     "categoryLabel": "接头系列",
 9133 |     "productTypeId": "hard-tube-fittings",
 9134 |     "productTypeName": "紧凑平底接头",
 9135 |     "productId": "809088",
 9136 |     "productCode": "809088",
 9137 |     "seriesId": "compact-flat-bottom-fitting",
 9138 |     "seriesName": "紧凑平底接头",
 9154 |       "微流体液路连接",
 9155 |       "泵阀接口连接",
 9156 |       "流路基板连接",
 9157 |       "IVD与分析仪器"
 9158 |     ],
 9159 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
 9160 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
 9161 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
 9162 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
 9163 |     "additionalImages": [
 9164 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-ps-b-main.jpg"
 9165 |     ],
 9166 |     "imageAlt": "HFL6-M6-30-PS-B 紧凑平底接头 PPS",
 9167 |     "detailMode": "standard_model",
 9168 |     "hideModelAction": false,
 9169 |     "showConfigurator": false,
 9265 |       {
 9266 |         "question": "HFL6-M6-30-PS-B是否可以申请2D图纸？",
 9267 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 9268 |       }
 9269 |     ],
 9270 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-30-ps-b",
 9271 |     "href": "/products/fittings/hard-tube-fittings/hfl6-m6-30-ps-b",
 9272 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 9273 |     "seo": {
 9274 |       "title": "HFL6-M6-30-PS-B 紧凑平底接头 | FOREACH",
 9275 |       "description": "HFL6-M6-30-PS-B是一款适用于外径3.0 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 9276 |     },
 9277 |     "sectionTitleMap": {
 9282 |   {
 9283 |     "sourceType": "fitting-detail",
 9284 |     "category": "fittings",
 9285 |     "categoryId": "fittings",
 9286 |     "categoryLabel": "接头系列",
 9287 |     "productTypeId": "hard-tube-fittings",
 9288 |     "productTypeName": "紧凑平底接头",
 9289 |     "productId": "809068",
 9290 |     "productCode": "809068",
 9291 |     "seriesId": "compact-flat-bottom-fitting",
 9292 |     "seriesName": "紧凑平底接头",
 9308 |       "微流体液路连接",
 9309 |       "泵阀接口连接",
 9310 |       "流路基板连接",
 9311 |       "IVD与分析仪器"
 9312 |     ],
 9313 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
 9314 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
 9315 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
 9316 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
 9317 |     "additionalImages": [
 9318 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-ps-b-main.jpg"
 9319 |     ],
 9320 |     "imageAlt": "HFL6-M6-32-PS-B 紧凑平底接头 PPS",
 9321 |     "detailMode": "standard_model",
 9322 |     "hideModelAction": false,
 9323 |     "showConfigurator": false,
 9419 |       {
 9420 |         "question": "HFL6-M6-32-PS-B是否可以申请2D图纸？",
 9421 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 9422 |       }
 9423 |     ],
 9424 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-32-ps-b",
 9425 |     "href": "/products/fittings/hard-tube-fittings/hfl6-m6-32-ps-b",
 9426 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 9427 |     "seo": {
 9428 |       "title": "HFL6-M6-32-PS-B 紧凑平底接头 | FOREACH",
 9429 |       "description": "HFL6-M6-32-PS-B是一款适用于外径3.2 mm硬管的紧凑平底接头，采用M6×1螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 9430 |     },
 9431 |     "sectionTitleMap": {
 9436 |   {
 9437 |     "sourceType": "fitting-detail",
 9438 |     "category": "fittings",
 9439 |     "categoryId": "fittings",
 9440 |     "categoryLabel": "接头系列",
 9441 |     "productTypeId": "hard-tube-fittings",
 9442 |     "productTypeName": "紧凑平底接头",
 9443 |     "productId": "809057",
 9444 |     "productCode": "809057",
 9445 |     "seriesId": "compact-flat-bottom-fitting",
 9446 |     "seriesName": "紧凑平底接头",
 9462 |       "微流体液路连接",
 9463 |       "泵阀接口连接",
 9464 |       "流路基板连接",
 9465 |       "IVD与分析仪器"
 9466 |     ],
 9467 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9468 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9469 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9470 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9471 |     "additionalImages": [
 9472 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-ps-b-main.jpg"
 9473 |     ],
 9474 |     "imageAlt": "HFL6-U28-16-PS-B 紧凑平底接头 PPS",
 9475 |     "detailMode": "standard_model",
 9476 |     "hideModelAction": false,
 9477 |     "showConfigurator": false,
 9573 |       {
 9574 |         "question": "HFL6-U28-16-PS-B是否可以申请2D图纸？",
 9575 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 9576 |       }
 9577 |     ],
 9578 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-16-ps-b",
 9579 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-16-ps-b",
 9580 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 9581 |     "seo": {
 9582 |       "title": "HFL6-U28-16-PS-B 紧凑平底接头 | FOREACH",
 9583 |       "description": "HFL6-U28-16-PS-B是一款适用于外径1.6 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 9584 |     },
 9585 |     "sectionTitleMap": {
 9590 |   {
 9591 |     "sourceType": "fitting-detail",
 9592 |     "category": "fittings",
 9593 |     "categoryId": "fittings",
 9594 |     "categoryLabel": "接头系列",
 9595 |     "productTypeId": "hard-tube-fittings",
 9596 |     "productTypeName": "紧凑平底接头",
 9597 |     "productId": "809550",
 9598 |     "productCode": "809550",
 9599 |     "seriesId": "compact-flat-bottom-fitting",
 9600 |     "seriesName": "紧凑平底接头",
 9616 |       "微流体液路连接",
 9617 |       "泵阀接口连接",
 9618 |       "流路基板连接",
 9619 |       "IVD与分析仪器"
 9620 |     ],
 9621 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9622 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9623 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9624 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 9625 |     "additionalImages": [],
 9626 |     "imageAlt": "HFL6-U28-16-PS-U 紧凑平底接头 PPS",
 9627 |     "detailMode": "standard_model",
 9628 |     "hideModelAction": false,
 9629 |     "showConfigurator": false,
 9725 |       {
 9726 |         "question": "HFL6-U28-16-PS-U是否可以申请2D图纸？",
 9727 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 9728 |       }
 9729 |     ],
 9730 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-16-ps-u",
 9731 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-16-ps-u",
 9732 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 9733 |     "seo": {
 9734 |       "title": "HFL6-U28-16-PS-U 紧凑平底接头 | FOREACH",
 9735 |       "description": "HFL6-U28-16-PS-U是一款适用于外径1.6 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 9736 |     },
 9737 |     "sectionTitleMap": {
 9742 |   {
 9743 |     "sourceType": "fitting-detail",
 9744 |     "category": "fittings",
 9745 |     "categoryId": "fittings",
 9746 |     "categoryLabel": "接头系列",
 9747 |     "productTypeId": "hard-tube-fittings",
 9748 |     "productTypeName": "紧凑平底接头",
 9749 |     "productId": "809077",
 9750 |     "productCode": "809077",
 9751 |     "seriesId": "compact-flat-bottom-fitting",
 9752 |     "seriesName": "紧凑平底接头",
 9768 |       "微流体液路连接",
 9769 |       "泵阀接口连接",
 9770 |       "流路基板连接",
 9771 |       "IVD与分析仪器"
 9772 |     ],
 9773 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9774 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9775 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9776 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9777 |     "additionalImages": [
 9778 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-ps-b-main.jpg"
 9779 |     ],
 9780 |     "imageAlt": "HFL6-U28-20-PS-B 紧凑平底接头 PPS",
 9781 |     "detailMode": "standard_model",
 9782 |     "hideModelAction": false,
 9783 |     "showConfigurator": false,
 9879 |       {
 9880 |         "question": "HFL6-U28-20-PS-B是否可以申请2D图纸？",
 9881 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
 9882 |       }
 9883 |     ],
 9884 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-20-ps-b",
 9885 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-20-ps-b",
 9886 |     "selectionHref": "/products/fittings/hard-tube-fittings",
 9887 |     "seo": {
 9888 |       "title": "HFL6-U28-20-PS-B 紧凑平底接头 | FOREACH",
 9889 |       "description": "HFL6-U28-20-PS-B是一款适用于外径2.0 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
 9890 |     },
 9891 |     "sectionTitleMap": {
 9896 |   {
 9897 |     "sourceType": "fitting-detail",
 9898 |     "category": "fittings",
 9899 |     "categoryId": "fittings",
 9900 |     "categoryLabel": "接头系列",
 9901 |     "productTypeId": "hard-tube-fittings",
 9902 |     "productTypeName": "紧凑平底接头",
 9903 |     "productId": "809551",
 9904 |     "productCode": "809551",
 9905 |     "seriesId": "compact-flat-bottom-fitting",
 9906 |     "seriesName": "紧凑平底接头",
 9922 |       "微流体液路连接",
 9923 |       "泵阀接口连接",
 9924 |       "流路基板连接",
 9925 |       "IVD与分析仪器"
 9926 |     ],
 9927 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9928 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9929 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9930 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 9931 |     "additionalImages": [],
 9932 |     "imageAlt": "HFL6-U28-20-PS-U 紧凑平底接头 PPS",
 9933 |     "detailMode": "standard_model",
 9934 |     "hideModelAction": false,
 9935 |     "showConfigurator": false,
10031 |       {
10032 |         "question": "HFL6-U28-20-PS-U是否可以申请2D图纸？",
10033 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10034 |       }
10035 |     ],
10036 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-20-ps-u",
10037 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-20-ps-u",
10038 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10039 |     "seo": {
10040 |       "title": "HFL6-U28-20-PS-U 紧凑平底接头 | FOREACH",
10041 |       "description": "HFL6-U28-20-PS-U是一款适用于外径2.0 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10042 |     },
10043 |     "sectionTitleMap": {
10048 |   {
10049 |     "sourceType": "fitting-detail",
10050 |     "category": "fittings",
10051 |     "categoryId": "fittings",
10052 |     "categoryLabel": "接头系列",
10053 |     "productTypeId": "hard-tube-fittings",
10054 |     "productTypeName": "紧凑平底接头",
10055 |     "productId": "809097",
10056 |     "productCode": "809097",
10057 |     "seriesId": "compact-flat-bottom-fitting",
10058 |     "seriesName": "紧凑平底接头",
10074 |       "微流体液路连接",
10075 |       "泵阀接口连接",
10076 |       "流路基板连接",
10077 |       "IVD与分析仪器"
10078 |     ],
10079 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
10080 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
10081 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
10082 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
10083 |     "additionalImages": [
10084 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-ps-b-main.jpg"
10085 |     ],
10086 |     "imageAlt": "HFL6-U28-25-PS-B 紧凑平底接头 PPS",
10087 |     "detailMode": "standard_model",
10088 |     "hideModelAction": false,
10089 |     "showConfigurator": false,
10185 |       {
10186 |         "question": "HFL6-U28-25-PS-B是否可以申请2D图纸？",
10187 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10188 |       }
10189 |     ],
10190 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-25-ps-b",
10191 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-25-ps-b",
10192 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10193 |     "seo": {
10194 |       "title": "HFL6-U28-25-PS-B 紧凑平底接头 | FOREACH",
10195 |       "description": "HFL6-U28-25-PS-B是一款适用于外径2.5 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10196 |     },
10197 |     "sectionTitleMap": {
10202 |   {
10203 |     "sourceType": "fitting-detail",
10204 |     "category": "fittings",
10205 |     "categoryId": "fittings",
10206 |     "categoryLabel": "接头系列",
10207 |     "productTypeId": "hard-tube-fittings",
10208 |     "productTypeName": "紧凑平底接头",
10209 |     "productId": "809087",
10210 |     "productCode": "809087",
10211 |     "seriesId": "compact-flat-bottom-fitting",
10212 |     "seriesName": "紧凑平底接头",
10228 |       "微流体液路连接",
10229 |       "泵阀接口连接",
10230 |       "流路基板连接",
10231 |       "IVD与分析仪器"
10232 |     ],
10233 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
10234 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
10235 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
10236 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
10237 |     "additionalImages": [
10238 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-ps-b-main.jpg"
10239 |     ],
10240 |     "imageAlt": "HFL6-U28-30-PS-B 紧凑平底接头 PPS",
10241 |     "detailMode": "standard_model",
10242 |     "hideModelAction": false,
10243 |     "showConfigurator": false,
10339 |       {
10340 |         "question": "HFL6-U28-30-PS-B是否可以申请2D图纸？",
10341 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10342 |       }
10343 |     ],
10344 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-30-ps-b",
10345 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-30-ps-b",
10346 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10347 |     "seo": {
10348 |       "title": "HFL6-U28-30-PS-B 紧凑平底接头 | FOREACH",
10349 |       "description": "HFL6-U28-30-PS-B是一款适用于外径3.0 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10350 |     },
10351 |     "sectionTitleMap": {
10356 |   {
10357 |     "sourceType": "fitting-detail",
10358 |     "category": "fittings",
10359 |     "categoryId": "fittings",
10360 |     "categoryLabel": "接头系列",
10361 |     "productTypeId": "hard-tube-fittings",
10362 |     "productTypeName": "紧凑平底接头",
10363 |     "productId": "809067",
10364 |     "productCode": "809067",
10365 |     "seriesId": "compact-flat-bottom-fitting",
10366 |     "seriesName": "紧凑平底接头",
10382 |       "微流体液路连接",
10383 |       "泵阀接口连接",
10384 |       "流路基板连接",
10385 |       "IVD与分析仪器"
10386 |     ],
10387 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
10388 |     "image": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
10389 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
10390 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
10391 |     "additionalImages": [
10392 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-ps-b-main.jpg"
10393 |     ],
10394 |     "imageAlt": "HFL6-U28-32-PS-B 紧凑平底接头 PPS",
10395 |     "detailMode": "standard_model",
10396 |     "hideModelAction": false,
10397 |     "showConfigurator": false,
10493 |       {
10494 |         "question": "HFL6-U28-32-PS-B是否可以申请2D图纸？",
10495 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10496 |       }
10497 |     ],
10498 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-32-ps-b",
10499 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u28-32-ps-b",
10500 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10501 |     "seo": {
10502 |       "title": "HFL6-U28-32-PS-B 紧凑平底接头 | FOREACH",
10503 |       "description": "HFL6-U28-32-PS-B是一款适用于外径3.2 mm硬管的紧凑平底接头，采用1/4-28 UNF螺纹、PPS主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10504 |     },
10505 |     "sectionTitleMap": {
10510 |   {
10511 |     "sourceType": "fitting-detail",
10512 |     "category": "fittings",
10513 |     "categoryId": "fittings",
10514 |     "categoryLabel": "接头系列",
10515 |     "productTypeId": "hard-tube-fittings",
10516 |     "productTypeName": "紧凑平底接头",
10517 |     "productId": "809841",
10518 |     "productCode": "809841",
10519 |     "seriesId": "compact-flat-bottom-fitting",
10520 |     "seriesName": "紧凑平底接头",
10645 |       {
10646 |         "question": "HFL6-U40-16-PK-N是否可以申请2D图纸？",
10647 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10648 |       }
10649 |     ],
10650 |     "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u40-16-pk-n",
10651 |     "href": "/products/fittings/hard-tube-fittings/hfl6-u40-16-pk-n",
10652 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10653 |     "seo": {
10654 |       "title": "HFL6-U40-16-PK-N 紧凑平底接头 | FOREACH",
10655 |       "description": "HFL6-U40-16-PK-N是一款适用于外径1.6 mm硬管的紧凑平底接头，采用6-40 UNF螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10656 |     },
10657 |     "sectionTitleMap": {
10662 |   {
10663 |     "sourceType": "fitting-detail",
10664 |     "category": "fittings",
10665 |     "categoryId": "fittings",
10666 |     "categoryLabel": "接头系列",
10667 |     "productTypeId": "hard-tube-fittings",
10668 |     "productTypeName": "标滚卡箍接头",
10669 |     "productId": "809795",
10670 |     "productCode": "809795",
10671 |     "seriesId": "standard-ferrule-fitting",
10672 |     "seriesName": "标滚卡箍接头",
10688 |       "微流体液路连接",
10689 |       "泵阀接口连接",
10690 |       "流路基板连接",
10691 |       "IVD与分析仪器"
10692 |     ],
10693 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg",
10694 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg",
10695 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg",
10696 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg",
10697 |     "additionalImages": [],
10698 |     "imageAlt": "HN-M6-16-AC-B 标滚卡箍接头 POM",
10699 |     "detailMode": "standard_model",
10700 |     "hideModelAction": false,
10701 |     "showConfigurator": false,
10797 |       {
10798 |         "question": "HN-M6-16-AC-B是否可以申请2D图纸？",
10799 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10800 |       }
10801 |     ],
10802 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-16-ac-b",
10803 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-16-ac-b",
10804 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10805 |     "seo": {
10806 |       "title": "HN-M6-16-AC-B 标滚卡箍接头 | FOREACH",
10807 |       "description": "HN-M6-16-AC-B是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用M6×1螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10808 |     },
10809 |     "sectionTitleMap": {
10814 |   {
10815 |     "sourceType": "fitting-detail",
10816 |     "category": "fittings",
10817 |     "categoryId": "fittings",
10818 |     "categoryLabel": "接头系列",
10819 |     "productTypeId": "hard-tube-fittings",
10820 |     "productTypeName": "标滚卡箍接头",
10821 |     "productId": "809728",
10822 |     "productCode": "809728",
10823 |     "seriesId": "standard-ferrule-fitting",
10824 |     "seriesName": "标滚卡箍接头",
10840 |       "微流体液路连接",
10841 |       "泵阀接口连接",
10842 |       "流路基板连接",
10843 |       "IVD与分析仪器"
10844 |     ],
10845 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
10846 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
10847 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
10848 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
10849 |     "additionalImages": [],
10850 |     "imageAlt": "HN-M6-16-PK-N 标滚卡箍接头 PEEK",
10851 |     "detailMode": "standard_model",
10852 |     "hideModelAction": false,
10853 |     "showConfigurator": false,
10949 |       {
10950 |         "question": "HN-M6-16-PK-N是否可以申请2D图纸？",
10951 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
10952 |       }
10953 |     ],
10954 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-16-pk-n",
10955 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-16-pk-n",
10956 |     "selectionHref": "/products/fittings/hard-tube-fittings",
10957 |     "seo": {
10958 |       "title": "HN-M6-16-PK-N 标滚卡箍接头 | FOREACH",
10959 |       "description": "HN-M6-16-PK-N是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用M6×1螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
10960 |     },
10961 |     "sectionTitleMap": {
10966 |   {
10967 |     "sourceType": "fitting-detail",
10968 |     "category": "fittings",
10969 |     "categoryId": "fittings",
10970 |     "categoryLabel": "接头系列",
10971 |     "productTypeId": "hard-tube-fittings",
10972 |     "productTypeName": "标滚卡箍接头",
10973 |     "productId": "809769",
10974 |     "productCode": "809769",
10975 |     "seriesId": "standard-ferrule-fitting",
10976 |     "seriesName": "标滚卡箍接头",
10992 |       "微流体液路连接",
10993 |       "泵阀接口连接",
10994 |       "流路基板连接",
10995 |       "IVD与分析仪器"
10996 |     ],
10997 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg",
10998 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg",
10999 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg",
11000 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg",
11001 |     "additionalImages": [],
11002 |     "imageAlt": "HN-M6-16-PS-B 标滚卡箍接头 PPS",
11003 |     "detailMode": "standard_model",
11004 |     "hideModelAction": false,
11005 |     "showConfigurator": false,
11101 |       {
11102 |         "question": "HN-M6-16-PS-B是否可以申请2D图纸？",
11103 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
11104 |       }
11105 |     ],
11106 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-16-ps-b",
11107 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-16-ps-b",
11108 |     "selectionHref": "/products/fittings/hard-tube-fittings",
11109 |     "seo": {
11110 |       "title": "HN-M6-16-PS-B 标滚卡箍接头 | FOREACH",
11111 |       "description": "HN-M6-16-PS-B是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
11112 |     },
11113 |     "sectionTitleMap": {
11118 |   {
11119 |     "sourceType": "fitting-detail",
11120 |     "category": "fittings",
11121 |     "categoryId": "fittings",
11122 |     "categoryLabel": "接头系列",
11123 |     "productTypeId": "hard-tube-fittings",
11124 |     "productTypeName": "标滚卡箍接头",
11125 |     "productId": "809768",
11126 |     "productCode": "809768",
11127 |     "seriesId": "standard-ferrule-fitting",
11128 |     "seriesName": "标滚卡箍接头",
11144 |       "微流体液路连接",
11145 |       "泵阀接口连接",
11146 |       "流路基板连接",
11147 |       "IVD与分析仪器"
11148 |     ],
11149 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
11150 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
11151 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
11152 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
11153 |     "additionalImages": [],
11154 |     "imageAlt": "HN-M6-16-PV-N 标滚卡箍接头 PVDF",
11155 |     "detailMode": "standard_model",
11156 |     "hideModelAction": false,
11157 |     "showConfigurator": false,
11253 |       {
11254 |         "question": "HN-M6-16-PV-N是否可以申请2D图纸？",
11255 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
11256 |       }
11257 |     ],
11258 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-16-pv-n",
11259 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-16-pv-n",
11260 |     "selectionHref": "/products/fittings/hard-tube-fittings",
11261 |     "seo": {
11262 |       "title": "HN-M6-16-PV-N 标滚卡箍接头 | FOREACH",
11263 |       "description": "HN-M6-16-PV-N是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
11264 |     },
11265 |     "sectionTitleMap": {
11270 |   {
11271 |     "sourceType": "fitting-detail",
11272 |     "category": "fittings",
11273 |     "categoryId": "fittings",
11274 |     "categoryLabel": "接头系列",
11275 |     "productTypeId": "hard-tube-fittings",
11276 |     "productTypeName": "标滚卡箍接头",
11277 |     "productId": "809796",
11278 |     "productCode": "809796",
11279 |     "seriesId": "standard-ferrule-fitting",
11280 |     "seriesName": "标滚卡箍接头",
11296 |       "微流体液路连接",
11297 |       "泵阀接口连接",
11298 |       "流路基板连接",
11299 |       "IVD与分析仪器"
11300 |     ],
11301 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg",
11302 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg",
11303 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg",
11304 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg",
11305 |     "additionalImages": [],
11306 |     "imageAlt": "HN-M6-32-AC-B 标滚卡箍接头 POM",
11307 |     "detailMode": "standard_model",
11308 |     "hideModelAction": false,
11309 |     "showConfigurator": false,
11405 |       {
11406 |         "question": "HN-M6-32-AC-B是否可以申请2D图纸？",
11407 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
11408 |       }
11409 |     ],
11410 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-32-ac-b",
11411 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-32-ac-b",
11412 |     "selectionHref": "/products/fittings/hard-tube-fittings",
11413 |     "seo": {
11414 |       "title": "HN-M6-32-AC-B 标滚卡箍接头 | FOREACH",
11415 |       "description": "HN-M6-32-AC-B是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用M6×1螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
11416 |     },
11417 |     "sectionTitleMap": {
11422 |   {
11423 |     "sourceType": "fitting-detail",
11424 |     "category": "fittings",
11425 |     "categoryId": "fittings",
11426 |     "categoryLabel": "接头系列",
11427 |     "productTypeId": "hard-tube-fittings",
11428 |     "productTypeName": "标滚卡箍接头",
11429 |     "productId": "809729",
11430 |     "productCode": "809729",
11431 |     "seriesId": "standard-ferrule-fitting",
11432 |     "seriesName": "标滚卡箍接头",
11448 |       "微流体液路连接",
11449 |       "泵阀接口连接",
11450 |       "流路基板连接",
11451 |       "IVD与分析仪器"
11452 |     ],
11453 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
11454 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
11455 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
11456 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
11457 |     "additionalImages": [],
11458 |     "imageAlt": "HN-M6-32-PK-N 标滚卡箍接头 PEEK",
11459 |     "detailMode": "standard_model",
11460 |     "hideModelAction": false,
11461 |     "showConfigurator": false,
11557 |       {
11558 |         "question": "HN-M6-32-PK-N是否可以申请2D图纸？",
11559 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
11560 |       }
11561 |     ],
11562 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-32-pk-n",
11563 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-32-pk-n",
11564 |     "selectionHref": "/products/fittings/hard-tube-fittings",
11565 |     "seo": {
11566 |       "title": "HN-M6-32-PK-N 标滚卡箍接头 | FOREACH",
11567 |       "description": "HN-M6-32-PK-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用M6×1螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
11568 |     },
11569 |     "sectionTitleMap": {
11574 |   {
11575 |     "sourceType": "fitting-detail",
11576 |     "category": "fittings",
11577 |     "categoryId": "fittings",
11578 |     "categoryLabel": "接头系列",
11579 |     "productTypeId": "hard-tube-fittings",
11580 |     "productTypeName": "标滚卡箍接头",
11581 |     "productId": "809771",
11582 |     "productCode": "809771",
11583 |     "seriesId": "standard-ferrule-fitting",
11584 |     "seriesName": "标滚卡箍接头",
11600 |       "微流体液路连接",
11601 |       "泵阀接口连接",
11602 |       "流路基板连接",
11603 |       "IVD与分析仪器"
11604 |     ],
11605 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg",
11606 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg",
11607 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg",
11608 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg",
11609 |     "additionalImages": [],
11610 |     "imageAlt": "HN-M6-32-PS-B 标滚卡箍接头 PPS",
11611 |     "detailMode": "standard_model",
11612 |     "hideModelAction": false,
11613 |     "showConfigurator": false,
11709 |       {
11710 |         "question": "HN-M6-32-PS-B是否可以申请2D图纸？",
11711 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
11712 |       }
11713 |     ],
11714 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-32-ps-b",
11715 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-32-ps-b",
11716 |     "selectionHref": "/products/fittings/hard-tube-fittings",
11717 |     "seo": {
11718 |       "title": "HN-M6-32-PS-B 标滚卡箍接头 | FOREACH",
11719 |       "description": "HN-M6-32-PS-B是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
11720 |     },
11721 |     "sectionTitleMap": {
11726 |   {
11727 |     "sourceType": "fitting-detail",
11728 |     "category": "fittings",
11729 |     "categoryId": "fittings",
11730 |     "categoryLabel": "接头系列",
11731 |     "productTypeId": "hard-tube-fittings",
11732 |     "productTypeName": "标滚卡箍接头",
11733 |     "productId": "809770",
11734 |     "productCode": "809770",
11735 |     "seriesId": "standard-ferrule-fitting",
11736 |     "seriesName": "标滚卡箍接头",
11752 |       "微流体液路连接",
11753 |       "泵阀接口连接",
11754 |       "流路基板连接",
11755 |       "IVD与分析仪器"
11756 |     ],
11757 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
11758 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
11759 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
11760 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
11761 |     "additionalImages": [],
11762 |     "imageAlt": "HN-M6-32-PV-N 标滚卡箍接头 PVDF",
11763 |     "detailMode": "standard_model",
11764 |     "hideModelAction": false,
11765 |     "showConfigurator": false,
11861 |       {
11862 |         "question": "HN-M6-32-PV-N是否可以申请2D图纸？",
11863 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
11864 |       }
11865 |     ],
11866 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-32-pv-n",
11867 |     "href": "/products/fittings/hard-tube-fittings/hn-m6-32-pv-n",
11868 |     "selectionHref": "/products/fittings/hard-tube-fittings",
11869 |     "seo": {
11870 |       "title": "HN-M6-32-PV-N 标滚卡箍接头 | FOREACH",
11871 |       "description": "HN-M6-32-PV-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
11872 |     },
11873 |     "sectionTitleMap": {
11878 |   {
11879 |     "sourceType": "fitting-detail",
11880 |     "category": "fittings",
11881 |     "categoryId": "fittings",
11882 |     "categoryLabel": "接头系列",
11883 |     "productTypeId": "hard-tube-fittings",
11884 |     "productTypeName": "标滚卡箍接头",
11885 |     "productId": "809799",
11886 |     "productCode": "809799",
11887 |     "seriesId": "standard-ferrule-fitting",
11888 |     "seriesName": "标滚卡箍接头",
11904 |       "微流体液路连接",
11905 |       "泵阀接口连接",
11906 |       "流路基板连接",
11907 |       "IVD与分析仪器"
11908 |     ],
11909 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg",
11910 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg",
11911 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg",
11912 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg",
11913 |     "additionalImages": [],
11914 |     "imageAlt": "HN-U28-16-AC-B 标滚卡箍接头 POM",
11915 |     "detailMode": "standard_model",
11916 |     "hideModelAction": false,
11917 |     "showConfigurator": false,
12013 |       {
12014 |         "question": "HN-U28-16-AC-B是否可以申请2D图纸？",
12015 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12016 |       }
12017 |     ],
12018 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-16-ac-b",
12019 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-16-ac-b",
12020 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12021 |     "seo": {
12022 |       "title": "HN-U28-16-AC-B 标滚卡箍接头 | FOREACH",
12023 |       "description": "HN-U28-16-AC-B是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12024 |     },
12025 |     "sectionTitleMap": {
12030 |   {
12031 |     "sourceType": "fitting-detail",
12032 |     "category": "fittings",
12033 |     "categoryId": "fittings",
12034 |     "categoryLabel": "接头系列",
12035 |     "productTypeId": "hard-tube-fittings",
12036 |     "productTypeName": "标滚卡箍接头",
12037 |     "productId": "809726",
12038 |     "productCode": "809726",
12039 |     "seriesId": "standard-ferrule-fitting",
12040 |     "seriesName": "标滚卡箍接头",
12056 |       "微流体液路连接",
12057 |       "泵阀接口连接",
12058 |       "流路基板连接",
12059 |       "IVD与分析仪器"
12060 |     ],
12061 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
12062 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
12063 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
12064 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
12065 |     "additionalImages": [],
12066 |     "imageAlt": "HN-U28-16-PK-N 标滚卡箍接头 PEEK",
12067 |     "detailMode": "standard_model",
12068 |     "hideModelAction": false,
12069 |     "showConfigurator": false,
12165 |       {
12166 |         "question": "HN-U28-16-PK-N是否可以申请2D图纸？",
12167 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12168 |       }
12169 |     ],
12170 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-16-pk-n",
12171 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-16-pk-n",
12172 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12173 |     "seo": {
12174 |       "title": "HN-U28-16-PK-N 标滚卡箍接头 | FOREACH",
12175 |       "description": "HN-U28-16-PK-N是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12176 |     },
12177 |     "sectionTitleMap": {
12182 |   {
12183 |     "sourceType": "fitting-detail",
12184 |     "category": "fittings",
12185 |     "categoryId": "fittings",
12186 |     "categoryLabel": "接头系列",
12187 |     "productTypeId": "hard-tube-fittings",
12188 |     "productTypeName": "标滚卡箍接头",
12189 |     "productId": "809765",
12190 |     "productCode": "809765",
12191 |     "seriesId": "standard-ferrule-fitting",
12192 |     "seriesName": "标滚卡箍接头",
12208 |       "微流体液路连接",
12209 |       "泵阀接口连接",
12210 |       "流路基板连接",
12211 |       "IVD与分析仪器"
12212 |     ],
12213 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg",
12214 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg",
12215 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg",
12216 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg",
12217 |     "additionalImages": [],
12218 |     "imageAlt": "HN-U28-16-PS-B 标滚卡箍接头 PPS",
12219 |     "detailMode": "standard_model",
12220 |     "hideModelAction": false,
12221 |     "showConfigurator": false,
12317 |       {
12318 |         "question": "HN-U28-16-PS-B是否可以申请2D图纸？",
12319 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12320 |       }
12321 |     ],
12322 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-16-ps-b",
12323 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-16-ps-b",
12324 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12325 |     "seo": {
12326 |       "title": "HN-U28-16-PS-B 标滚卡箍接头 | FOREACH",
12327 |       "description": "HN-U28-16-PS-B是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12328 |     },
12329 |     "sectionTitleMap": {
12334 |   {
12335 |     "sourceType": "fitting-detail",
12336 |     "category": "fittings",
12337 |     "categoryId": "fittings",
12338 |     "categoryLabel": "接头系列",
12339 |     "productTypeId": "hard-tube-fittings",
12340 |     "productTypeName": "标滚卡箍接头",
12341 |     "productId": "809764",
12342 |     "productCode": "809764",
12343 |     "seriesId": "standard-ferrule-fitting",
12344 |     "seriesName": "标滚卡箍接头",
12360 |       "微流体液路连接",
12361 |       "泵阀接口连接",
12362 |       "流路基板连接",
12363 |       "IVD与分析仪器"
12364 |     ],
12365 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
12366 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
12367 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
12368 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
12369 |     "additionalImages": [],
12370 |     "imageAlt": "HN-U28-16-PV-N 标滚卡箍接头 PVDF",
12371 |     "detailMode": "standard_model",
12372 |     "hideModelAction": false,
12373 |     "showConfigurator": false,
12469 |       {
12470 |         "question": "HN-U28-16-PV-N是否可以申请2D图纸？",
12471 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12472 |       }
12473 |     ],
12474 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-16-pv-n",
12475 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-16-pv-n",
12476 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12477 |     "seo": {
12478 |       "title": "HN-U28-16-PV-N 标滚卡箍接头 | FOREACH",
12479 |       "description": "HN-U28-16-PV-N是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12480 |     },
12481 |     "sectionTitleMap": {
12486 |   {
12487 |     "sourceType": "fitting-detail",
12488 |     "category": "fittings",
12489 |     "categoryId": "fittings",
12490 |     "categoryLabel": "接头系列",
12491 |     "productTypeId": "hard-tube-fittings",
12492 |     "productTypeName": "标滚卡箍接头",
12493 |     "productId": "809794",
12494 |     "productCode": "809794",
12495 |     "seriesId": "standard-ferrule-fitting",
12496 |     "seriesName": "标滚卡箍接头",
12512 |       "微流体液路连接",
12513 |       "泵阀接口连接",
12514 |       "流路基板连接",
12515 |       "IVD与分析仪器"
12516 |     ],
12517 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg",
12518 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg",
12519 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg",
12520 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg",
12521 |     "additionalImages": [],
12522 |     "imageAlt": "HN-U28-32-AC-B 标滚卡箍接头 POM",
12523 |     "detailMode": "standard_model",
12524 |     "hideModelAction": false,
12525 |     "showConfigurator": false,
12621 |       {
12622 |         "question": "HN-U28-32-AC-B是否可以申请2D图纸？",
12623 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12624 |       }
12625 |     ],
12626 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-32-ac-b",
12627 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-32-ac-b",
12628 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12629 |     "seo": {
12630 |       "title": "HN-U28-32-AC-B 标滚卡箍接头 | FOREACH",
12631 |       "description": "HN-U28-32-AC-B是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12632 |     },
12633 |     "sectionTitleMap": {
12638 |   {
12639 |     "sourceType": "fitting-detail",
12640 |     "category": "fittings",
12641 |     "categoryId": "fittings",
12642 |     "categoryLabel": "接头系列",
12643 |     "productTypeId": "hard-tube-fittings",
12644 |     "productTypeName": "标滚卡箍接头",
12645 |     "productId": "809727",
12646 |     "productCode": "809727",
12647 |     "seriesId": "standard-ferrule-fitting",
12648 |     "seriesName": "标滚卡箍接头",
12664 |       "微流体液路连接",
12665 |       "泵阀接口连接",
12666 |       "流路基板连接",
12667 |       "IVD与分析仪器"
12668 |     ],
12669 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
12670 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
12671 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
12672 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
12673 |     "additionalImages": [],
12674 |     "imageAlt": "HN-U28-32-PK-N 标滚卡箍接头 PEEK",
12675 |     "detailMode": "standard_model",
12676 |     "hideModelAction": false,
12677 |     "showConfigurator": false,
12773 |       {
12774 |         "question": "HN-U28-32-PK-N是否可以申请2D图纸？",
12775 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12776 |       }
12777 |     ],
12778 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-32-pk-n",
12779 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-32-pk-n",
12780 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12781 |     "seo": {
12782 |       "title": "HN-U28-32-PK-N 标滚卡箍接头 | FOREACH",
12783 |       "description": "HN-U28-32-PK-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12784 |     },
12785 |     "sectionTitleMap": {
12790 |   {
12791 |     "sourceType": "fitting-detail",
12792 |     "category": "fittings",
12793 |     "categoryId": "fittings",
12794 |     "categoryLabel": "接头系列",
12795 |     "productTypeId": "hard-tube-fittings",
12796 |     "productTypeName": "标滚卡箍接头",
12797 |     "productId": "809767",
12798 |     "productCode": "809767",
12799 |     "seriesId": "standard-ferrule-fitting",
12800 |     "seriesName": "标滚卡箍接头",
12816 |       "微流体液路连接",
12817 |       "泵阀接口连接",
12818 |       "流路基板连接",
12819 |       "IVD与分析仪器"
12820 |     ],
12821 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg",
12822 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg",
12823 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg",
12824 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg",
12825 |     "additionalImages": [],
12826 |     "imageAlt": "HN-U28-32-PS-B 标滚卡箍接头 PPS",
12827 |     "detailMode": "standard_model",
12828 |     "hideModelAction": false,
12829 |     "showConfigurator": false,
12925 |       {
12926 |         "question": "HN-U28-32-PS-B是否可以申请2D图纸？",
12927 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
12928 |       }
12929 |     ],
12930 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-32-ps-b",
12931 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-32-ps-b",
12932 |     "selectionHref": "/products/fittings/hard-tube-fittings",
12933 |     "seo": {
12934 |       "title": "HN-U28-32-PS-B 标滚卡箍接头 | FOREACH",
12935 |       "description": "HN-U28-32-PS-B是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
12936 |     },
12937 |     "sectionTitleMap": {
12942 |   {
12943 |     "sourceType": "fitting-detail",
12944 |     "category": "fittings",
12945 |     "categoryId": "fittings",
12946 |     "categoryLabel": "接头系列",
12947 |     "productTypeId": "hard-tube-fittings",
12948 |     "productTypeName": "标滚卡箍接头",
12949 |     "productId": "809766",
12950 |     "productCode": "809766",
12951 |     "seriesId": "standard-ferrule-fitting",
12952 |     "seriesName": "标滚卡箍接头",
12968 |       "微流体液路连接",
12969 |       "泵阀接口连接",
12970 |       "流路基板连接",
12971 |       "IVD与分析仪器"
12972 |     ],
12973 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
12974 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
12975 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
12976 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
12977 |     "additionalImages": [],
12978 |     "imageAlt": "HN-U28-32-PV-N 标滚卡箍接头 PVDF",
12979 |     "detailMode": "standard_model",
12980 |     "hideModelAction": false,
12981 |     "showConfigurator": false,
13077 |       {
13078 |         "question": "HN-U28-32-PV-N是否可以申请2D图纸？",
13079 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13080 |       }
13081 |     ],
13082 |     "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-32-pv-n",
13083 |     "href": "/products/fittings/hard-tube-fittings/hn-u28-32-pv-n",
13084 |     "selectionHref": "/products/fittings/hard-tube-fittings",
13085 |     "seo": {
13086 |       "title": "HN-U28-32-PV-N 标滚卡箍接头 | FOREACH",
13087 |       "description": "HN-U28-32-PV-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
13088 |     },
13089 |     "sectionTitleMap": {
13094 |   {
13095 |     "sourceType": "fitting-detail",
13096 |     "category": "fittings",
13097 |     "categoryId": "fittings",
13098 |     "categoryLabel": "接头系列",
13099 |     "productTypeId": "hard-tube-fittings",
13100 |     "productTypeName": "紧凑卡箍接头",
13101 |     "productId": "809797",
13102 |     "productCode": "809797",
13103 |     "seriesId": "compact-ferrule-fitting",
13104 |     "seriesName": "紧凑卡箍接头",
13120 |       "微流体液路连接",
13121 |       "泵阀接口连接",
13122 |       "流路基板连接",
13123 |       "IVD与分析仪器"
13124 |     ],
13125 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg",
13126 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg",
13127 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg",
13128 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg",
13129 |     "additionalImages": [],
13130 |     "imageAlt": "HN6-M6-16-AC-B 紧凑卡箍接头 POM",
13131 |     "detailMode": "standard_model",
13132 |     "hideModelAction": false,
13133 |     "showConfigurator": false,
13229 |       {
13230 |         "question": "HN6-M6-16-AC-B是否可以申请2D图纸？",
13231 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13232 |       }
13233 |     ],
13234 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-16-ac-b",
13235 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-16-ac-b",
13236 |     "selectionHref": "/products/fittings/hard-tube-fittings",
13237 |     "seo": {
13238 |       "title": "HN6-M6-16-AC-B 紧凑卡箍接头 | FOREACH",
13239 |       "description": "HN6-M6-16-AC-B是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用M6×1螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
13240 |     },
13241 |     "sectionTitleMap": {
13246 |   {
13247 |     "sourceType": "fitting-detail",
13248 |     "category": "fittings",
13249 |     "categoryId": "fittings",
13250 |     "categoryLabel": "接头系列",
13251 |     "productTypeId": "hard-tube-fittings",
13252 |     "productTypeName": "紧凑卡箍接头",
13253 |     "productId": "809732",
13254 |     "productCode": "809732",
13255 |     "seriesId": "compact-ferrule-fitting",
13256 |     "seriesName": "紧凑卡箍接头",
13272 |       "微流体液路连接",
13273 |       "泵阀接口连接",
13274 |       "流路基板连接",
13275 |       "IVD与分析仪器"
13276 |     ],
13277 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
13278 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
13279 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
13280 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
13281 |     "additionalImages": [],
13282 |     "imageAlt": "HN6-M6-16-PK-N 紧凑卡箍接头 PEEK",
13283 |     "detailMode": "standard_model",
13284 |     "hideModelAction": false,
13285 |     "showConfigurator": false,
13381 |       {
13382 |         "question": "HN6-M6-16-PK-N是否可以申请2D图纸？",
13383 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13384 |       }
13385 |     ],
13386 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-16-pk-n",
13387 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-16-pk-n",
13388 |     "selectionHref": "/products/fittings/hard-tube-fittings",
13389 |     "seo": {
13390 |       "title": "HN6-M6-16-PK-N 紧凑卡箍接头 | FOREACH",
13391 |       "description": "HN6-M6-16-PK-N是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
13392 |     },
13393 |     "sectionTitleMap": {
13398 |   {
13399 |     "sourceType": "fitting-detail",
13400 |     "category": "fittings",
13401 |     "categoryId": "fittings",
13402 |     "categoryLabel": "接头系列",
13403 |     "productTypeId": "hard-tube-fittings",
13404 |     "productTypeName": "紧凑卡箍接头",
13405 |     "productId": "809777",
13406 |     "productCode": "809777",
13407 |     "seriesId": "compact-ferrule-fitting",
13408 |     "seriesName": "紧凑卡箍接头",
13424 |       "微流体液路连接",
13425 |       "泵阀接口连接",
13426 |       "流路基板连接",
13427 |       "IVD与分析仪器"
13428 |     ],
13429 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg",
13430 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg",
13431 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg",
13432 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg",
13433 |     "additionalImages": [],
13434 |     "imageAlt": "HN6-M6-16-PS-B 紧凑卡箍接头 PPS",
13435 |     "detailMode": "standard_model",
13436 |     "hideModelAction": false,
13437 |     "showConfigurator": false,
13533 |       {
13534 |         "question": "HN6-M6-16-PS-B是否可以申请2D图纸？",
13535 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13536 |       }
13537 |     ],
13538 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-16-ps-b",
13539 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-16-ps-b",
13540 |     "selectionHref": "/products/fittings/hard-tube-fittings",
13541 |     "seo": {
13542 |       "title": "HN6-M6-16-PS-B 紧凑卡箍接头 | FOREACH",
13543 |       "description": "HN6-M6-16-PS-B是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
13544 |     },
13545 |     "sectionTitleMap": {
13550 |   {
13551 |     "sourceType": "fitting-detail",
13552 |     "category": "fittings",
13553 |     "categoryId": "fittings",
13554 |     "categoryLabel": "接头系列",
13555 |     "productTypeId": "hard-tube-fittings",
13556 |     "productTypeName": "紧凑卡箍接头",
13557 |     "productId": "809776",
13558 |     "productCode": "809776",
13559 |     "seriesId": "compact-ferrule-fitting",
13560 |     "seriesName": "紧凑卡箍接头",
13576 |       "微流体液路连接",
13577 |       "泵阀接口连接",
13578 |       "流路基板连接",
13579 |       "IVD与分析仪器"
13580 |     ],
13581 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
13582 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
13583 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
13584 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
13585 |     "additionalImages": [],
13586 |     "imageAlt": "HN6-M6-16-PV-N 紧凑卡箍接头 PVDF",
13587 |     "detailMode": "standard_model",
13588 |     "hideModelAction": false,
13589 |     "showConfigurator": false,
13685 |       {
13686 |         "question": "HN6-M6-16-PV-N是否可以申请2D图纸？",
13687 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13688 |       }
13689 |     ],
13690 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-16-pv-n",
13691 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-16-pv-n",
13692 |     "selectionHref": "/products/fittings/hard-tube-fittings",
13693 |     "seo": {
13694 |       "title": "HN6-M6-16-PV-N 紧凑卡箍接头 | FOREACH",
13695 |       "description": "HN6-M6-16-PV-N是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
13696 |     },
13697 |     "sectionTitleMap": {
13702 |   {
13703 |     "sourceType": "fitting-detail",
13704 |     "category": "fittings",
13705 |     "categoryId": "fittings",
13706 |     "categoryLabel": "接头系列",
13707 |     "productTypeId": "hard-tube-fittings",
13708 |     "productTypeName": "紧凑卡箍接头",
13709 |     "productId": "809798",
13710 |     "productCode": "809798",
13711 |     "seriesId": "compact-ferrule-fitting",
13712 |     "seriesName": "紧凑卡箍接头",
13728 |       "微流体液路连接",
13729 |       "泵阀接口连接",
13730 |       "流路基板连接",
13731 |       "IVD与分析仪器"
13732 |     ],
13733 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
13734 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
13735 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
13736 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
13737 |     "additionalImages": [
13738 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-main.jpg"
13739 |     ],
13740 |     "imageAlt": "HN6-M6-32-AC-B 紧凑卡箍接头 POM",
13741 |     "detailMode": "standard_model",
13742 |     "hideModelAction": false,
13743 |     "showConfigurator": false,
13839 |       {
13840 |         "question": "HN6-M6-32-AC-B是否可以申请2D图纸？",
13841 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13842 |       }
13843 |     ],
13844 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-32-ac-b",
13845 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-32-ac-b",
13846 |     "selectionHref": "/products/fittings/hard-tube-fittings",
13847 |     "seo": {
13848 |       "title": "HN6-M6-32-AC-B 紧凑卡箍接头 | FOREACH",
13849 |       "description": "HN6-M6-32-AC-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用M6×1螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
13850 |     },
13851 |     "sectionTitleMap": {
13856 |   {
13857 |     "sourceType": "fitting-detail",
13858 |     "category": "fittings",
13859 |     "categoryId": "fittings",
13860 |     "categoryLabel": "接头系列",
13861 |     "productTypeId": "hard-tube-fittings",
13862 |     "productTypeName": "紧凑卡箍接头",
13863 |     "productId": "809733",
13864 |     "productCode": "809733",
13865 |     "seriesId": "compact-ferrule-fitting",
13866 |     "seriesName": "紧凑卡箍接头",
13882 |       "微流体液路连接",
13883 |       "泵阀接口连接",
13884 |       "流路基板连接",
13885 |       "IVD与分析仪器"
13886 |     ],
13887 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
13888 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
13889 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
13890 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
13891 |     "additionalImages": [
13892 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-main.jpg"
13893 |     ],
13894 |     "imageAlt": "HN6-M6-32-PK-N 紧凑卡箍接头 PEEK",
13895 |     "detailMode": "standard_model",
13896 |     "hideModelAction": false,
13897 |     "showConfigurator": false,
13993 |       {
13994 |         "question": "HN6-M6-32-PK-N是否可以申请2D图纸？",
13995 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
13996 |       }
13997 |     ],
13998 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-32-pk-n",
13999 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-32-pk-n",
14000 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14001 |     "seo": {
14002 |       "title": "HN6-M6-32-PK-N 紧凑卡箍接头 | FOREACH",
14003 |       "description": "HN6-M6-32-PK-N是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14004 |     },
14005 |     "sectionTitleMap": {
14010 |   {
14011 |     "sourceType": "fitting-detail",
14012 |     "category": "fittings",
14013 |     "categoryId": "fittings",
14014 |     "categoryLabel": "接头系列",
14015 |     "productTypeId": "hard-tube-fittings",
14016 |     "productTypeName": "紧凑卡箍接头",
14017 |     "productId": "809779",
14018 |     "productCode": "809779",
14019 |     "seriesId": "compact-ferrule-fitting",
14020 |     "seriesName": "紧凑卡箍接头",
14036 |       "微流体液路连接",
14037 |       "泵阀接口连接",
14038 |       "流路基板连接",
14039 |       "IVD与分析仪器"
14040 |     ],
14041 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
14042 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
14043 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
14044 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
14045 |     "additionalImages": [
14046 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-main.jpg"
14047 |     ],
14048 |     "imageAlt": "HN6-M6-32-PS-B 紧凑卡箍接头 PPS",
14049 |     "detailMode": "standard_model",
14050 |     "hideModelAction": false,
14051 |     "showConfigurator": false,
14147 |       {
14148 |         "question": "HN6-M6-32-PS-B是否可以申请2D图纸？",
14149 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
14150 |       }
14151 |     ],
14152 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-32-ps-b",
14153 |     "href": "/products/fittings/hard-tube-fittings/hn6-m6-32-ps-b",
14154 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14155 |     "seo": {
14156 |       "title": "HN6-M6-32-PS-B 紧凑卡箍接头 | FOREACH",
14157 |       "description": "HN6-M6-32-PS-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14158 |     },
14159 |     "sectionTitleMap": {
14164 |   {
14165 |     "sourceType": "fitting-detail",
14166 |     "category": "fittings",
14167 |     "categoryId": "fittings",
14168 |     "categoryLabel": "接头系列",
14169 |     "productTypeId": "hard-tube-fittings",
14170 |     "productTypeName": "紧凑卡箍接头",
14171 |     "productId": "809800",
14172 |     "productCode": "809800",
14173 |     "seriesId": "compact-ferrule-fitting",
14174 |     "seriesName": "紧凑卡箍接头",
14190 |       "微流体液路连接",
14191 |       "泵阀接口连接",
14192 |       "流路基板连接",
14193 |       "IVD与分析仪器"
14194 |     ],
14195 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg",
14196 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg",
14197 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg",
14198 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg",
14199 |     "additionalImages": [],
14200 |     "imageAlt": "HN6-U28-16-AC-B 紧凑卡箍接头 POM",
14201 |     "detailMode": "standard_model",
14202 |     "hideModelAction": false,
14203 |     "showConfigurator": false,
14299 |       {
14300 |         "question": "HN6-U28-16-AC-B是否可以申请2D图纸？",
14301 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
14302 |       }
14303 |     ],
14304 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-16-ac-b",
14305 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-16-ac-b",
14306 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14307 |     "seo": {
14308 |       "title": "HN6-U28-16-AC-B 紧凑卡箍接头 | FOREACH",
14309 |       "description": "HN6-U28-16-AC-B是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14310 |     },
14311 |     "sectionTitleMap": {
14316 |   {
14317 |     "sourceType": "fitting-detail",
14318 |     "category": "fittings",
14319 |     "categoryId": "fittings",
14320 |     "categoryLabel": "接头系列",
14321 |     "productTypeId": "hard-tube-fittings",
14322 |     "productTypeName": "紧凑卡箍接头",
14323 |     "productId": "809730",
14324 |     "productCode": "809730",
14325 |     "seriesId": "compact-ferrule-fitting",
14326 |     "seriesName": "紧凑卡箍接头",
14342 |       "微流体液路连接",
14343 |       "泵阀接口连接",
14344 |       "流路基板连接",
14345 |       "IVD与分析仪器"
14346 |     ],
14347 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
14348 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
14349 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
14350 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
14351 |     "additionalImages": [],
14352 |     "imageAlt": "HN6-U28-16-PK-N 紧凑卡箍接头 PEEK",
14353 |     "detailMode": "standard_model",
14354 |     "hideModelAction": false,
14355 |     "showConfigurator": false,
14451 |       {
14452 |         "question": "HN6-U28-16-PK-N是否可以申请2D图纸？",
14453 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
14454 |       }
14455 |     ],
14456 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-16-pk-n",
14457 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-16-pk-n",
14458 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14459 |     "seo": {
14460 |       "title": "HN6-U28-16-PK-N 紧凑卡箍接头 | FOREACH",
14461 |       "description": "HN6-U28-16-PK-N是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14462 |     },
14463 |     "sectionTitleMap": {
14468 |   {
14469 |     "sourceType": "fitting-detail",
14470 |     "category": "fittings",
14471 |     "categoryId": "fittings",
14472 |     "categoryLabel": "接头系列",
14473 |     "productTypeId": "hard-tube-fittings",
14474 |     "productTypeName": "紧凑卡箍接头",
14475 |     "productId": "809773",
14476 |     "productCode": "809773",
14477 |     "seriesId": "compact-ferrule-fitting",
14478 |     "seriesName": "紧凑卡箍接头",
14494 |       "微流体液路连接",
14495 |       "泵阀接口连接",
14496 |       "流路基板连接",
14497 |       "IVD与分析仪器"
14498 |     ],
14499 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg",
14500 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg",
14501 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg",
14502 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg",
14503 |     "additionalImages": [],
14504 |     "imageAlt": "HN6-U28-16-PS-B 紧凑卡箍接头 PPS",
14505 |     "detailMode": "standard_model",
14506 |     "hideModelAction": false,
14507 |     "showConfigurator": false,
14603 |       {
14604 |         "question": "HN6-U28-16-PS-B是否可以申请2D图纸？",
14605 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
14606 |       }
14607 |     ],
14608 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-16-ps-b",
14609 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-16-ps-b",
14610 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14611 |     "seo": {
14612 |       "title": "HN6-U28-16-PS-B 紧凑卡箍接头 | FOREACH",
14613 |       "description": "HN6-U28-16-PS-B是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14614 |     },
14615 |     "sectionTitleMap": {
14620 |   {
14621 |     "sourceType": "fitting-detail",
14622 |     "category": "fittings",
14623 |     "categoryId": "fittings",
14624 |     "categoryLabel": "接头系列",
14625 |     "productTypeId": "hard-tube-fittings",
14626 |     "productTypeName": "紧凑卡箍接头",
14627 |     "productId": "809772",
14628 |     "productCode": "809772",
14629 |     "seriesId": "compact-ferrule-fitting",
14630 |     "seriesName": "紧凑卡箍接头",
14646 |       "微流体液路连接",
14647 |       "泵阀接口连接",
14648 |       "流路基板连接",
14649 |       "IVD与分析仪器"
14650 |     ],
14651 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
14652 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
14653 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
14654 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
14655 |     "additionalImages": [],
14656 |     "imageAlt": "HN6-U28-16-PV-N 紧凑卡箍接头 PVDF",
14657 |     "detailMode": "standard_model",
14658 |     "hideModelAction": false,
14659 |     "showConfigurator": false,
14755 |       {
14756 |         "question": "HN6-U28-16-PV-N是否可以申请2D图纸？",
14757 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
14758 |       }
14759 |     ],
14760 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-16-pv-n",
14761 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-16-pv-n",
14762 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14763 |     "seo": {
14764 |       "title": "HN6-U28-16-PV-N 紧凑卡箍接头 | FOREACH",
14765 |       "description": "HN6-U28-16-PV-N是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14766 |     },
14767 |     "sectionTitleMap": {
14772 |   {
14773 |     "sourceType": "fitting-detail",
14774 |     "category": "fittings",
14775 |     "categoryId": "fittings",
14776 |     "categoryLabel": "接头系列",
14777 |     "productTypeId": "hard-tube-fittings",
14778 |     "productTypeName": "紧凑卡箍接头",
14779 |     "productId": "809793",
14780 |     "productCode": "809793",
14781 |     "seriesId": "compact-ferrule-fitting",
14782 |     "seriesName": "紧凑卡箍接头",
14798 |       "微流体液路连接",
14799 |       "泵阀接口连接",
14800 |       "流路基板连接",
14801 |       "IVD与分析仪器"
14802 |     ],
14803 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
14804 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
14805 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
14806 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
14807 |     "additionalImages": [
14808 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg"
14809 |     ],
14810 |     "imageAlt": "HN6-U28-32-AC-B 紧凑卡箍接头 POM",
14811 |     "detailMode": "standard_model",
14812 |     "hideModelAction": false,
14813 |     "showConfigurator": false,
14909 |       {
14910 |         "question": "HN6-U28-32-AC-B是否可以申请2D图纸？",
14911 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
14912 |       }
14913 |     ],
14914 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-32-ac-b",
14915 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-32-ac-b",
14916 |     "selectionHref": "/products/fittings/hard-tube-fittings",
14917 |     "seo": {
14918 |       "title": "HN6-U28-32-AC-B 紧凑卡箍接头 | FOREACH",
14919 |       "description": "HN6-U28-32-AC-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、POM主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
14920 |     },
14921 |     "sectionTitleMap": {
14926 |   {
14927 |     "sourceType": "fitting-detail",
14928 |     "category": "fittings",
14929 |     "categoryId": "fittings",
14930 |     "categoryLabel": "接头系列",
14931 |     "productTypeId": "hard-tube-fittings",
14932 |     "productTypeName": "紧凑卡箍接头",
14933 |     "productId": "809935",
14934 |     "productCode": "809935",
14935 |     "seriesId": "compact-ferrule-fitting",
14936 |     "seriesName": "紧凑卡箍接头",
14952 |       "微流体液路连接",
14953 |       "泵阀接口连接",
14954 |       "流路基板连接",
14955 |       "IVD与分析仪器"
14956 |     ],
14957 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
14958 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
14959 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
14960 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
14961 |     "additionalImages": [],
14962 |     "imageAlt": "HN6-U28-32-ET-N 紧凑卡箍接头 ETFE",
14963 |     "detailMode": "standard_model",
14964 |     "hideModelAction": false,
14965 |     "showConfigurator": false,
15061 |       {
15062 |         "question": "HN6-U28-32-ET-N是否可以申请2D图纸？",
15063 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15064 |       }
15065 |     ],
15066 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-32-et-n",
15067 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-32-et-n",
15068 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15069 |     "seo": {
15070 |       "title": "HN6-U28-32-ET-N 紧凑卡箍接头 | FOREACH",
15071 |       "description": "HN6-U28-32-ET-N是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、ETFE主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15072 |     },
15073 |     "sectionTitleMap": {
15078 |   {
15079 |     "sourceType": "fitting-detail",
15080 |     "category": "fittings",
15081 |     "categoryId": "fittings",
15082 |     "categoryLabel": "接头系列",
15083 |     "productTypeId": "hard-tube-fittings",
15084 |     "productTypeName": "紧凑卡箍接头",
15085 |     "productId": "809923",
15086 |     "productCode": "809923",
15087 |     "seriesId": "compact-ferrule-fitting",
15088 |     "seriesName": "紧凑卡箍接头",
15104 |       "微流体液路连接",
15105 |       "泵阀接口连接",
15106 |       "流路基板连接",
15107 |       "IVD与分析仪器"
15108 |     ],
15109 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15110 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15111 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15112 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15113 |     "additionalImages": [],
15114 |     "imageAlt": "HN6-U28-32-PK-B 紧凑卡箍接头 PEEK",
15115 |     "detailMode": "standard_model",
15116 |     "hideModelAction": false,
15117 |     "showConfigurator": false,
15213 |       {
15214 |         "question": "HN6-U28-32-PK-B是否可以申请2D图纸？",
15215 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15216 |       }
15217 |     ],
15218 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-32-pk-b",
15219 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-32-pk-b",
15220 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15221 |     "seo": {
15222 |       "title": "HN6-U28-32-PK-B 紧凑卡箍接头 | FOREACH",
15223 |       "description": "HN6-U28-32-PK-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PEEK主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15224 |     },
15225 |     "sectionTitleMap": {
15230 |   {
15231 |     "sourceType": "fitting-detail",
15232 |     "category": "fittings",
15233 |     "categoryId": "fittings",
15234 |     "categoryLabel": "接头系列",
15235 |     "productTypeId": "hard-tube-fittings",
15236 |     "productTypeName": "紧凑卡箍接头",
15237 |     "productId": "809775",
15238 |     "productCode": "809775",
15239 |     "seriesId": "compact-ferrule-fitting",
15240 |     "seriesName": "紧凑卡箍接头",
15256 |       "微流体液路连接",
15257 |       "泵阀接口连接",
15258 |       "流路基板连接",
15259 |       "IVD与分析仪器"
15260 |     ],
15261 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15262 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15263 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15264 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15265 |     "additionalImages": [
15266 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ps-b-main.jpg"
15267 |     ],
15268 |     "imageAlt": "HN6-U28-32-PS-B 紧凑卡箍接头 PPS",
15269 |     "detailMode": "standard_model",
15270 |     "hideModelAction": false,
15271 |     "showConfigurator": false,
15367 |       {
15368 |         "question": "HN6-U28-32-PS-B是否可以申请2D图纸？",
15369 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15370 |       }
15371 |     ],
15372 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-32-ps-b",
15373 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-32-ps-b",
15374 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15375 |     "seo": {
15376 |       "title": "HN6-U28-32-PS-B 紧凑卡箍接头 | FOREACH",
15377 |       "description": "HN6-U28-32-PS-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15378 |     },
15379 |     "sectionTitleMap": {
15384 |   {
15385 |     "sourceType": "fitting-detail",
15386 |     "category": "fittings",
15387 |     "categoryId": "fittings",
15388 |     "categoryLabel": "接头系列",
15389 |     "productTypeId": "hard-tube-fittings",
15390 |     "productTypeName": "紧凑卡箍接头",
15391 |     "productId": "809774",
15392 |     "productCode": "809774",
15393 |     "seriesId": "compact-ferrule-fitting",
15394 |     "seriesName": "紧凑卡箍接头",
15410 |       "微流体液路连接",
15411 |       "泵阀接口连接",
15412 |       "流路基板连接",
15413 |       "IVD与分析仪器"
15414 |     ],
15415 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15416 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15417 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15418 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
15419 |     "additionalImages": [
15420 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-pv-n-main.jpg"
15421 |     ],
15422 |     "imageAlt": "HN6-U28-32-PV-N 紧凑卡箍接头 PVDF",
15423 |     "detailMode": "standard_model",
15424 |     "hideModelAction": false,
15425 |     "showConfigurator": false,
15521 |       {
15522 |         "question": "HN6-U28-32-PV-N是否可以申请2D图纸？",
15523 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15524 |       }
15525 |     ],
15526 |     "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-32-pv-n",
15527 |     "href": "/products/fittings/hard-tube-fittings/hn6-u28-32-pv-n",
15528 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15529 |     "seo": {
15530 |       "title": "HN6-U28-32-PV-N 紧凑卡箍接头 | FOREACH",
15531 |       "description": "HN6-U28-32-PV-N是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15532 |     },
15533 |     "sectionTitleMap": {
15538 |   {
15539 |     "sourceType": "fitting-detail",
15540 |     "category": "fittings",
15541 |     "categoryId": "fittings",
15542 |     "categoryLabel": "接头系列",
15543 |     "productTypeId": "hard-tube-fittings",
15544 |     "productTypeName": "标滚卡箍接头",
15545 |     "productId": "809927",
15546 |     "productCode": "809927",
15547 |     "seriesId": "standard-ferrule-fitting",
15548 |     "seriesName": "标滚卡箍接头",
15673 |       {
15674 |         "question": "HNE-U28-32-PP-N是否可以申请2D图纸？",
15675 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15676 |       }
15677 |     ],
15678 |     "detailHref": "/products/fittings/hard-tube-fittings/hne-u28-32-pp-n",
15679 |     "href": "/products/fittings/hard-tube-fittings/hne-u28-32-pp-n",
15680 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15681 |     "seo": {
15682 |       "title": "HNE-U28-32-PP-N 标滚卡箍接头 | FOREACH",
15683 |       "description": "HNE-U28-32-PP-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PP主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15684 |     },
15685 |     "sectionTitleMap": {
15690 |   {
15691 |     "sourceType": "fitting-detail",
15692 |     "category": "fittings",
15693 |     "categoryId": "fittings",
15694 |     "categoryLabel": "接头系列",
15695 |     "productTypeId": "hard-tube-fittings",
15696 |     "productTypeName": "紧凑卡箍接头",
15697 |     "productId": "809922",
15698 |     "productCode": "809922",
15699 |     "seriesId": "compact-ferrule-fitting",
15700 |     "seriesName": "紧凑卡箍接头",
15825 |       {
15826 |         "question": "HNE6-U28-32-PS-B是否可以申请2D图纸？",
15827 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15828 |       }
15829 |     ],
15830 |     "detailHref": "/products/fittings/hard-tube-fittings/hne6-u28-32-ps-b",
15831 |     "href": "/products/fittings/hard-tube-fittings/hne6-u28-32-ps-b",
15832 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15833 |     "seo": {
15834 |       "title": "HNE6-U28-32-PS-B 紧凑卡箍接头 | FOREACH",
15835 |       "description": "HNE6-U28-32-PS-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15836 |     },
15837 |     "sectionTitleMap": {
15842 |   {
15843 |     "sourceType": "fitting-detail",
15844 |     "category": "fittings",
15845 |     "categoryId": "fittings",
15846 |     "categoryLabel": "接头系列",
15847 |     "productTypeId": "hard-tube-fittings",
15848 |     "productTypeName": "标滚卡箍接头",
15849 |     "productId": "809401",
15850 |     "productCode": "809401",
15851 |     "seriesId": "standard-ferrule-fitting",
15852 |     "seriesName": "标滚卡箍接头",
15868 |       "微流体液路连接",
15869 |       "泵阀接口连接",
15870 |       "流路基板连接",
15871 |       "IVD与分析仪器"
15872 |     ],
15873 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
15874 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
15875 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
15876 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
15877 |     "additionalImages": [],
15878 |     "imageAlt": "HNF-M6-16-PV-B 标滚卡箍接头 PVDF",
15879 |     "detailMode": "standard_model",
15880 |     "hideModelAction": false,
15881 |     "showConfigurator": false,
15977 |       {
15978 |         "question": "HNF-M6-16-PV-B是否可以申请2D图纸？",
15979 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
15980 |       }
15981 |     ],
15982 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-16-pv-b",
15983 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-16-pv-b",
15984 |     "selectionHref": "/products/fittings/hard-tube-fittings",
15985 |     "seo": {
15986 |       "title": "HNF-M6-16-PV-B 标滚卡箍接头 | FOREACH",
15987 |       "description": "HNF-M6-16-PV-B是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
15988 |     },
15989 |     "sectionTitleMap": {
15994 |   {
15995 |     "sourceType": "fitting-detail",
15996 |     "category": "fittings",
15997 |     "categoryId": "fittings",
15998 |     "categoryLabel": "接头系列",
15999 |     "productTypeId": "hard-tube-fittings",
16000 |     "productTypeName": "标滚卡箍接头",
16001 |     "productId": "809108",
16002 |     "productCode": "809108",
16003 |     "seriesId": "standard-ferrule-fitting",
16004 |     "seriesName": "标滚卡箍接头",
16020 |       "微流体液路连接",
16021 |       "泵阀接口连接",
16022 |       "流路基板连接",
16023 |       "IVD与分析仪器"
16024 |     ],
16025 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
16026 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
16027 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
16028 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
16029 |     "additionalImages": [],
16030 |     "imageAlt": "HNF-M6-16-PV-N 标滚卡箍接头 PVDF",
16031 |     "detailMode": "standard_model",
16032 |     "hideModelAction": false,
16033 |     "showConfigurator": false,
16129 |       {
16130 |         "question": "HNF-M6-16-PV-N是否可以申请2D图纸？",
16131 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
16132 |       }
16133 |     ],
16134 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-16-pv-n",
16135 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-16-pv-n",
16136 |     "selectionHref": "/products/fittings/hard-tube-fittings",
16137 |     "seo": {
16138 |       "title": "HNF-M6-16-PV-N 标滚卡箍接头 | FOREACH",
16139 |       "description": "HNF-M6-16-PV-N是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
16140 |     },
16141 |     "sectionTitleMap": {
16146 |   {
16147 |     "sourceType": "fitting-detail",
16148 |     "category": "fittings",
16149 |     "categoryId": "fittings",
16150 |     "categoryLabel": "接头系列",
16151 |     "productTypeId": "hard-tube-fittings",
16152 |     "productTypeName": "标滚卡箍接头",
16153 |     "productId": "809415",
16154 |     "productCode": "809415",
16155 |     "seriesId": "standard-ferrule-fitting",
16156 |     "seriesName": "标滚卡箍接头",
16172 |       "微流体液路连接",
16173 |       "泵阀接口连接",
16174 |       "流路基板连接",
16175 |       "IVD与分析仪器"
16176 |     ],
16177 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
16178 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
16179 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
16180 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
16181 |     "additionalImages": [],
16182 |     "imageAlt": "HNF-M6-20-PV-B 标滚卡箍接头 PVDF",
16183 |     "detailMode": "standard_model",
16184 |     "hideModelAction": false,
16185 |     "showConfigurator": false,
16281 |       {
16282 |         "question": "HNF-M6-20-PV-B是否可以申请2D图纸？",
16283 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
16284 |       }
16285 |     ],
16286 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-20-pv-b",
16287 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-20-pv-b",
16288 |     "selectionHref": "/products/fittings/hard-tube-fittings",
16289 |     "seo": {
16290 |       "title": "HNF-M6-20-PV-B 标滚卡箍接头 | FOREACH",
16291 |       "description": "HNF-M6-20-PV-B是一款适用于外径2.0 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
16292 |     },
16293 |     "sectionTitleMap": {
16298 |   {
16299 |     "sourceType": "fitting-detail",
16300 |     "category": "fittings",
16301 |     "categoryId": "fittings",
16302 |     "categoryLabel": "接头系列",
16303 |     "productTypeId": "hard-tube-fittings",
16304 |     "productTypeName": "标滚卡箍接头",
16305 |     "productId": "809116",
16306 |     "productCode": "809116",
16307 |     "seriesId": "standard-ferrule-fitting",
16308 |     "seriesName": "标滚卡箍接头",
16324 |       "微流体液路连接",
16325 |       "泵阀接口连接",
16326 |       "流路基板连接",
16327 |       "IVD与分析仪器"
16328 |     ],
16329 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
16330 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
16331 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
16332 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
16333 |     "additionalImages": [],
16334 |     "imageAlt": "HNF-M6-20-PV-N 标滚卡箍接头 PVDF",
16335 |     "detailMode": "standard_model",
16336 |     "hideModelAction": false,
16337 |     "showConfigurator": false,
16433 |       {
16434 |         "question": "HNF-M6-20-PV-N是否可以申请2D图纸？",
16435 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
16436 |       }
16437 |     ],
16438 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-20-pv-n",
16439 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-20-pv-n",
16440 |     "selectionHref": "/products/fittings/hard-tube-fittings",
16441 |     "seo": {
16442 |       "title": "HNF-M6-20-PV-N 标滚卡箍接头 | FOREACH",
16443 |       "description": "HNF-M6-20-PV-N是一款适用于外径2.0 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
16444 |     },
16445 |     "sectionTitleMap": {
16450 |   {
16451 |     "sourceType": "fitting-detail",
16452 |     "category": "fittings",
16453 |     "categoryId": "fittings",
16454 |     "categoryLabel": "接头系列",
16455 |     "productTypeId": "hard-tube-fittings",
16456 |     "productTypeName": "标滚卡箍接头",
16457 |     "productId": "809413",
16458 |     "productCode": "809413",
16459 |     "seriesId": "standard-ferrule-fitting",
16460 |     "seriesName": "标滚卡箍接头",
16476 |       "微流体液路连接",
16477 |       "泵阀接口连接",
16478 |       "流路基板连接",
16479 |       "IVD与分析仪器"
16480 |     ],
16481 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
16482 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
16483 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
16484 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
16485 |     "additionalImages": [],
16486 |     "imageAlt": "HNF-M6-25-PV-B 标滚卡箍接头 PVDF",
16487 |     "detailMode": "standard_model",
16488 |     "hideModelAction": false,
16489 |     "showConfigurator": false,
16585 |       {
16586 |         "question": "HNF-M6-25-PV-B是否可以申请2D图纸？",
16587 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
16588 |       }
16589 |     ],
16590 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-25-pv-b",
16591 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-25-pv-b",
16592 |     "selectionHref": "/products/fittings/hard-tube-fittings",
16593 |     "seo": {
16594 |       "title": "HNF-M6-25-PV-B 标滚卡箍接头 | FOREACH",
16595 |       "description": "HNF-M6-25-PV-B是一款适用于外径2.5 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
16596 |     },
16597 |     "sectionTitleMap": {
16602 |   {
16603 |     "sourceType": "fitting-detail",
16604 |     "category": "fittings",
16605 |     "categoryId": "fittings",
16606 |     "categoryLabel": "接头系列",
16607 |     "productTypeId": "hard-tube-fittings",
16608 |     "productTypeName": "标滚卡箍接头",
16609 |     "productId": "809124",
16610 |     "productCode": "809124",
16611 |     "seriesId": "standard-ferrule-fitting",
16612 |     "seriesName": "标滚卡箍接头",
16628 |       "微流体液路连接",
16629 |       "泵阀接口连接",
16630 |       "流路基板连接",
16631 |       "IVD与分析仪器"
16632 |     ],
16633 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
16634 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
16635 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
16636 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
16637 |     "additionalImages": [],
16638 |     "imageAlt": "HNF-M6-25-PV-N 标滚卡箍接头 PVDF",
16639 |     "detailMode": "standard_model",
16640 |     "hideModelAction": false,
16641 |     "showConfigurator": false,
16737 |       {
16738 |         "question": "HNF-M6-25-PV-N是否可以申请2D图纸？",
16739 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
16740 |       }
16741 |     ],
16742 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-25-pv-n",
16743 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-25-pv-n",
16744 |     "selectionHref": "/products/fittings/hard-tube-fittings",
16745 |     "seo": {
16746 |       "title": "HNF-M6-25-PV-N 标滚卡箍接头 | FOREACH",
16747 |       "description": "HNF-M6-25-PV-N是一款适用于外径2.5 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
16748 |     },
16749 |     "sectionTitleMap": {
16754 |   {
16755 |     "sourceType": "fitting-detail",
16756 |     "category": "fittings",
16757 |     "categoryId": "fittings",
16758 |     "categoryLabel": "接头系列",
16759 |     "productTypeId": "hard-tube-fittings",
16760 |     "productTypeName": "标滚卡箍接头",
16761 |     "productId": "809416",
16762 |     "productCode": "809416",
16763 |     "seriesId": "standard-ferrule-fitting",
16764 |     "seriesName": "标滚卡箍接头",
16780 |       "微流体液路连接",
16781 |       "泵阀接口连接",
16782 |       "流路基板连接",
16783 |       "IVD与分析仪器"
16784 |     ],
16785 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
16786 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
16787 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
16788 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
16789 |     "additionalImages": [],
16790 |     "imageAlt": "HNF-M6-30-PV-B 标滚卡箍接头 PVDF",
16791 |     "detailMode": "standard_model",
16792 |     "hideModelAction": false,
16793 |     "showConfigurator": false,
16889 |       {
16890 |         "question": "HNF-M6-30-PV-B是否可以申请2D图纸？",
16891 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
16892 |       }
16893 |     ],
16894 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-30-pv-b",
16895 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-30-pv-b",
16896 |     "selectionHref": "/products/fittings/hard-tube-fittings",
16897 |     "seo": {
16898 |       "title": "HNF-M6-30-PV-B 标滚卡箍接头 | FOREACH",
16899 |       "description": "HNF-M6-30-PV-B是一款适用于外径3.0 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
16900 |     },
16901 |     "sectionTitleMap": {
16906 |   {
16907 |     "sourceType": "fitting-detail",
16908 |     "category": "fittings",
16909 |     "categoryId": "fittings",
16910 |     "categoryLabel": "接头系列",
16911 |     "productTypeId": "hard-tube-fittings",
16912 |     "productTypeName": "标滚卡箍接头",
16913 |     "productId": "809120",
16914 |     "productCode": "809120",
16915 |     "seriesId": "standard-ferrule-fitting",
16916 |     "seriesName": "标滚卡箍接头",
16932 |       "微流体液路连接",
16933 |       "泵阀接口连接",
16934 |       "流路基板连接",
16935 |       "IVD与分析仪器"
16936 |     ],
16937 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
16938 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
16939 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
16940 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
16941 |     "additionalImages": [],
16942 |     "imageAlt": "HNF-M6-30-PV-N 标滚卡箍接头 PVDF",
16943 |     "detailMode": "standard_model",
16944 |     "hideModelAction": false,
16945 |     "showConfigurator": false,
17041 |       {
17042 |         "question": "HNF-M6-30-PV-N是否可以申请2D图纸？",
17043 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17044 |       }
17045 |     ],
17046 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-30-pv-n",
17047 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-30-pv-n",
17048 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17049 |     "seo": {
17050 |       "title": "HNF-M6-30-PV-N 标滚卡箍接头 | FOREACH",
17051 |       "description": "HNF-M6-30-PV-N是一款适用于外径3.0 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17052 |     },
17053 |     "sectionTitleMap": {
17058 |   {
17059 |     "sourceType": "fitting-detail",
17060 |     "category": "fittings",
17061 |     "categoryId": "fittings",
17062 |     "categoryLabel": "接头系列",
17063 |     "productTypeId": "hard-tube-fittings",
17064 |     "productTypeName": "标滚卡箍接头",
17065 |     "productId": "809414",
17066 |     "productCode": "809414",
17067 |     "seriesId": "standard-ferrule-fitting",
17068 |     "seriesName": "标滚卡箍接头",
17084 |       "微流体液路连接",
17085 |       "泵阀接口连接",
17086 |       "流路基板连接",
17087 |       "IVD与分析仪器"
17088 |     ],
17089 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
17090 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
17091 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
17092 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
17093 |     "additionalImages": [],
17094 |     "imageAlt": "HNF-M6-32-PV-B 标滚卡箍接头 PVDF",
17095 |     "detailMode": "standard_model",
17096 |     "hideModelAction": false,
17097 |     "showConfigurator": false,
17193 |       {
17194 |         "question": "HNF-M6-32-PV-B是否可以申请2D图纸？",
17195 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17196 |       }
17197 |     ],
17198 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-32-pv-b",
17199 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-32-pv-b",
17200 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17201 |     "seo": {
17202 |       "title": "HNF-M6-32-PV-B 标滚卡箍接头 | FOREACH",
17203 |       "description": "HNF-M6-32-PV-B是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17204 |     },
17205 |     "sectionTitleMap": {
17210 |   {
17211 |     "sourceType": "fitting-detail",
17212 |     "category": "fittings",
17213 |     "categoryId": "fittings",
17214 |     "categoryLabel": "接头系列",
17215 |     "productTypeId": "hard-tube-fittings",
17216 |     "productTypeName": "标滚卡箍接头",
17217 |     "productId": "809112",
17218 |     "productCode": "809112",
17219 |     "seriesId": "standard-ferrule-fitting",
17220 |     "seriesName": "标滚卡箍接头",
17236 |       "微流体液路连接",
17237 |       "泵阀接口连接",
17238 |       "流路基板连接",
17239 |       "IVD与分析仪器"
17240 |     ],
17241 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
17242 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
17243 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
17244 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
17245 |     "additionalImages": [],
17246 |     "imageAlt": "HNF-M6-32-PV-N 标滚卡箍接头 PVDF",
17247 |     "detailMode": "standard_model",
17248 |     "hideModelAction": false,
17249 |     "showConfigurator": false,
17345 |       {
17346 |         "question": "HNF-M6-32-PV-N是否可以申请2D图纸？",
17347 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17348 |       }
17349 |     ],
17350 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-32-pv-n",
17351 |     "href": "/products/fittings/hard-tube-fittings/hnf-m6-32-pv-n",
17352 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17353 |     "seo": {
17354 |       "title": "HNF-M6-32-PV-N 标滚卡箍接头 | FOREACH",
17355 |       "description": "HNF-M6-32-PV-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用M6×1螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17356 |     },
17357 |     "sectionTitleMap": {
17362 |   {
17363 |     "sourceType": "fitting-detail",
17364 |     "category": "fittings",
17365 |     "categoryId": "fittings",
17366 |     "categoryLabel": "接头系列",
17367 |     "productTypeId": "hard-tube-fittings",
17368 |     "productTypeName": "标滚卡箍接头",
17369 |     "productId": "809395",
17370 |     "productCode": "809395",
17371 |     "seriesId": "standard-ferrule-fitting",
17372 |     "seriesName": "标滚卡箍接头",
17388 |       "微流体液路连接",
17389 |       "泵阀接口连接",
17390 |       "流路基板连接",
17391 |       "IVD与分析仪器"
17392 |     ],
17393 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
17394 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
17395 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
17396 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
17397 |     "additionalImages": [],
17398 |     "imageAlt": "HNF-U28-16-PV-B 标滚卡箍接头 PVDF",
17399 |     "detailMode": "standard_model",
17400 |     "hideModelAction": false,
17401 |     "showConfigurator": false,
17497 |       {
17498 |         "question": "HNF-U28-16-PV-B是否可以申请2D图纸？",
17499 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17500 |       }
17501 |     ],
17502 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-16-pv-b",
17503 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-16-pv-b",
17504 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17505 |     "seo": {
17506 |       "title": "HNF-U28-16-PV-B 标滚卡箍接头 | FOREACH",
17507 |       "description": "HNF-U28-16-PV-B是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17508 |     },
17509 |     "sectionTitleMap": {
17514 |   {
17515 |     "sourceType": "fitting-detail",
17516 |     "category": "fittings",
17517 |     "categoryId": "fittings",
17518 |     "categoryLabel": "接头系列",
17519 |     "productTypeId": "hard-tube-fittings",
17520 |     "productTypeName": "标滚卡箍接头",
17521 |     "productId": "809107",
17522 |     "productCode": "809107",
17523 |     "seriesId": "standard-ferrule-fitting",
17524 |     "seriesName": "标滚卡箍接头",
17540 |       "微流体液路连接",
17541 |       "泵阀接口连接",
17542 |       "流路基板连接",
17543 |       "IVD与分析仪器"
17544 |     ],
17545 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
17546 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
17547 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
17548 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
17549 |     "additionalImages": [],
17550 |     "imageAlt": "HNF-U28-16-PV-N 标滚卡箍接头 PVDF",
17551 |     "detailMode": "standard_model",
17552 |     "hideModelAction": false,
17553 |     "showConfigurator": false,
17649 |       {
17650 |         "question": "HNF-U28-16-PV-N是否可以申请2D图纸？",
17651 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17652 |       }
17653 |     ],
17654 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-16-pv-n",
17655 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-16-pv-n",
17656 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17657 |     "seo": {
17658 |       "title": "HNF-U28-16-PV-N 标滚卡箍接头 | FOREACH",
17659 |       "description": "HNF-U28-16-PV-N是一款适用于外径1.6 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17660 |     },
17661 |     "sectionTitleMap": {
17666 |   {
17667 |     "sourceType": "fitting-detail",
17668 |     "category": "fittings",
17669 |     "categoryId": "fittings",
17670 |     "categoryLabel": "接头系列",
17671 |     "productTypeId": "hard-tube-fittings",
17672 |     "productTypeName": "标滚卡箍接头",
17673 |     "productId": "809398",
17674 |     "productCode": "809398",
17675 |     "seriesId": "standard-ferrule-fitting",
17676 |     "seriesName": "标滚卡箍接头",
17692 |       "微流体液路连接",
17693 |       "泵阀接口连接",
17694 |       "流路基板连接",
17695 |       "IVD与分析仪器"
17696 |     ],
17697 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
17698 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
17699 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
17700 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
17701 |     "additionalImages": [],
17702 |     "imageAlt": "HNF-U28-20-PV-B 标滚卡箍接头 PVDF",
17703 |     "detailMode": "standard_model",
17704 |     "hideModelAction": false,
17705 |     "showConfigurator": false,
17801 |       {
17802 |         "question": "HNF-U28-20-PV-B是否可以申请2D图纸？",
17803 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17804 |       }
17805 |     ],
17806 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-20-pv-b",
17807 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-20-pv-b",
17808 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17809 |     "seo": {
17810 |       "title": "HNF-U28-20-PV-B 标滚卡箍接头 | FOREACH",
17811 |       "description": "HNF-U28-20-PV-B是一款适用于外径2.0 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17812 |     },
17813 |     "sectionTitleMap": {
17818 |   {
17819 |     "sourceType": "fitting-detail",
17820 |     "category": "fittings",
17821 |     "categoryId": "fittings",
17822 |     "categoryLabel": "接头系列",
17823 |     "productTypeId": "hard-tube-fittings",
17824 |     "productTypeName": "标滚卡箍接头",
17825 |     "productId": "809115",
17826 |     "productCode": "809115",
17827 |     "seriesId": "standard-ferrule-fitting",
17828 |     "seriesName": "标滚卡箍接头",
17844 |       "微流体液路连接",
17845 |       "泵阀接口连接",
17846 |       "流路基板连接",
17847 |       "IVD与分析仪器"
17848 |     ],
17849 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
17850 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
17851 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
17852 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
17853 |     "additionalImages": [],
17854 |     "imageAlt": "HNF-U28-20-PV-N 标滚卡箍接头 PVDF",
17855 |     "detailMode": "standard_model",
17856 |     "hideModelAction": false,
17857 |     "showConfigurator": false,
17953 |       {
17954 |         "question": "HNF-U28-20-PV-N是否可以申请2D图纸？",
17955 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
17956 |       }
17957 |     ],
17958 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-20-pv-n",
17959 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-20-pv-n",
17960 |     "selectionHref": "/products/fittings/hard-tube-fittings",
17961 |     "seo": {
17962 |       "title": "HNF-U28-20-PV-N 标滚卡箍接头 | FOREACH",
17963 |       "description": "HNF-U28-20-PV-N是一款适用于外径2.0 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
17964 |     },
17965 |     "sectionTitleMap": {
17970 |   {
17971 |     "sourceType": "fitting-detail",
17972 |     "category": "fittings",
17973 |     "categoryId": "fittings",
17974 |     "categoryLabel": "接头系列",
17975 |     "productTypeId": "hard-tube-fittings",
17976 |     "productTypeName": "标滚卡箍接头",
17977 |     "productId": "809396",
17978 |     "productCode": "809396",
17979 |     "seriesId": "standard-ferrule-fitting",
17980 |     "seriesName": "标滚卡箍接头",
17996 |       "微流体液路连接",
17997 |       "泵阀接口连接",
17998 |       "流路基板连接",
17999 |       "IVD与分析仪器"
18000 |     ],
18001 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
18002 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
18003 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
18004 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
18005 |     "additionalImages": [],
18006 |     "imageAlt": "HNF-U28-25-PV-B 标滚卡箍接头 PVDF",
18007 |     "detailMode": "standard_model",
18008 |     "hideModelAction": false,
18009 |     "showConfigurator": false,
18105 |       {
18106 |         "question": "HNF-U28-25-PV-B是否可以申请2D图纸？",
18107 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
18108 |       }
18109 |     ],
18110 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-25-pv-b",
18111 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-25-pv-b",
18112 |     "selectionHref": "/products/fittings/hard-tube-fittings",
18113 |     "seo": {
18114 |       "title": "HNF-U28-25-PV-B 标滚卡箍接头 | FOREACH",
18115 |       "description": "HNF-U28-25-PV-B是一款适用于外径2.5 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
18116 |     },
18117 |     "sectionTitleMap": {
18122 |   {
18123 |     "sourceType": "fitting-detail",
18124 |     "category": "fittings",
18125 |     "categoryId": "fittings",
18126 |     "categoryLabel": "接头系列",
18127 |     "productTypeId": "hard-tube-fittings",
18128 |     "productTypeName": "标滚卡箍接头",
18129 |     "productId": "809123",
18130 |     "productCode": "809123",
18131 |     "seriesId": "standard-ferrule-fitting",
18132 |     "seriesName": "标滚卡箍接头",
18148 |       "微流体液路连接",
18149 |       "泵阀接口连接",
18150 |       "流路基板连接",
18151 |       "IVD与分析仪器"
18152 |     ],
18153 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
18154 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
18155 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
18156 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
18157 |     "additionalImages": [],
18158 |     "imageAlt": "HNF-U28-25-PV-N 标滚卡箍接头 PVDF",
18159 |     "detailMode": "standard_model",
18160 |     "hideModelAction": false,
18161 |     "showConfigurator": false,
18257 |       {
18258 |         "question": "HNF-U28-25-PV-N是否可以申请2D图纸？",
18259 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
18260 |       }
18261 |     ],
18262 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-25-pv-n",
18263 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-25-pv-n",
18264 |     "selectionHref": "/products/fittings/hard-tube-fittings",
18265 |     "seo": {
18266 |       "title": "HNF-U28-25-PV-N 标滚卡箍接头 | FOREACH",
18267 |       "description": "HNF-U28-25-PV-N是一款适用于外径2.5 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
18268 |     },
18269 |     "sectionTitleMap": {
18274 |   {
18275 |     "sourceType": "fitting-detail",
18276 |     "category": "fittings",
18277 |     "categoryId": "fittings",
18278 |     "categoryLabel": "接头系列",
18279 |     "productTypeId": "hard-tube-fittings",
18280 |     "productTypeName": "标滚卡箍接头",
18281 |     "productId": "809399",
18282 |     "productCode": "809399",
18283 |     "seriesId": "standard-ferrule-fitting",
18284 |     "seriesName": "标滚卡箍接头",
18300 |       "微流体液路连接",
18301 |       "泵阀接口连接",
18302 |       "流路基板连接",
18303 |       "IVD与分析仪器"
18304 |     ],
18305 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
18306 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
18307 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
18308 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
18309 |     "additionalImages": [],
18310 |     "imageAlt": "HNF-U28-30-PV-B 标滚卡箍接头 PVDF",
18311 |     "detailMode": "standard_model",
18312 |     "hideModelAction": false,
18313 |     "showConfigurator": false,
18409 |       {
18410 |         "question": "HNF-U28-30-PV-B是否可以申请2D图纸？",
18411 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
18412 |       }
18413 |     ],
18414 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-30-pv-b",
18415 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-30-pv-b",
18416 |     "selectionHref": "/products/fittings/hard-tube-fittings",
18417 |     "seo": {
18418 |       "title": "HNF-U28-30-PV-B 标滚卡箍接头 | FOREACH",
18419 |       "description": "HNF-U28-30-PV-B是一款适用于外径3.0 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
18420 |     },
18421 |     "sectionTitleMap": {
18426 |   {
18427 |     "sourceType": "fitting-detail",
18428 |     "category": "fittings",
18429 |     "categoryId": "fittings",
18430 |     "categoryLabel": "接头系列",
18431 |     "productTypeId": "hard-tube-fittings",
18432 |     "productTypeName": "标滚卡箍接头",
18433 |     "productId": "809119",
18434 |     "productCode": "809119",
18435 |     "seriesId": "standard-ferrule-fitting",
18436 |     "seriesName": "标滚卡箍接头",
18452 |       "微流体液路连接",
18453 |       "泵阀接口连接",
18454 |       "流路基板连接",
18455 |       "IVD与分析仪器"
18456 |     ],
18457 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
18458 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
18459 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
18460 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
18461 |     "additionalImages": [],
18462 |     "imageAlt": "HNF-U28-30-PV-N 标滚卡箍接头 PVDF",
18463 |     "detailMode": "standard_model",
18464 |     "hideModelAction": false,
18465 |     "showConfigurator": false,
18561 |       {
18562 |         "question": "HNF-U28-30-PV-N是否可以申请2D图纸？",
18563 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
18564 |       }
18565 |     ],
18566 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-30-pv-n",
18567 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-30-pv-n",
18568 |     "selectionHref": "/products/fittings/hard-tube-fittings",
18569 |     "seo": {
18570 |       "title": "HNF-U28-30-PV-N 标滚卡箍接头 | FOREACH",
18571 |       "description": "HNF-U28-30-PV-N是一款适用于外径3.0 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
18572 |     },
18573 |     "sectionTitleMap": {
18578 |   {
18579 |     "sourceType": "fitting-detail",
18580 |     "category": "fittings",
18581 |     "categoryId": "fittings",
18582 |     "categoryLabel": "接头系列",
18583 |     "productTypeId": "hard-tube-fittings",
18584 |     "productTypeName": "标滚卡箍接头",
18585 |     "productId": "809397",
18586 |     "productCode": "809397",
18587 |     "seriesId": "standard-ferrule-fitting",
18588 |     "seriesName": "标滚卡箍接头",
18604 |       "微流体液路连接",
18605 |       "泵阀接口连接",
18606 |       "流路基板连接",
18607 |       "IVD与分析仪器"
18608 |     ],
18609 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
18610 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
18611 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
18612 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
18613 |     "additionalImages": [],
18614 |     "imageAlt": "HNF-U28-32-PV-B 标滚卡箍接头 PVDF",
18615 |     "detailMode": "standard_model",
18616 |     "hideModelAction": false,
18617 |     "showConfigurator": false,
18713 |       {
18714 |         "question": "HNF-U28-32-PV-B是否可以申请2D图纸？",
18715 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
18716 |       }
18717 |     ],
18718 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-32-pv-b",
18719 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-32-pv-b",
18720 |     "selectionHref": "/products/fittings/hard-tube-fittings",
18721 |     "seo": {
18722 |       "title": "HNF-U28-32-PV-B 标滚卡箍接头 | FOREACH",
18723 |       "description": "HNF-U28-32-PV-B是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
18724 |     },
18725 |     "sectionTitleMap": {
18730 |   {
18731 |     "sourceType": "fitting-detail",
18732 |     "category": "fittings",
18733 |     "categoryId": "fittings",
18734 |     "categoryLabel": "接头系列",
18735 |     "productTypeId": "hard-tube-fittings",
18736 |     "productTypeName": "标滚卡箍接头",
18737 |     "productId": "809111",
18738 |     "productCode": "809111",
18739 |     "seriesId": "standard-ferrule-fitting",
18740 |     "seriesName": "标滚卡箍接头",
18756 |       "微流体液路连接",
18757 |       "泵阀接口连接",
18758 |       "流路基板连接",
18759 |       "IVD与分析仪器"
18760 |     ],
18761 |     "mainImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
18762 |     "image": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
18763 |     "heroImage": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
18764 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
18765 |     "additionalImages": [],
18766 |     "imageAlt": "HNF-U28-32-PV-N 标滚卡箍接头 PVDF",
18767 |     "detailMode": "standard_model",
18768 |     "hideModelAction": false,
18769 |     "showConfigurator": false,
18865 |       {
18866 |         "question": "HNF-U28-32-PV-N是否可以申请2D图纸？",
18867 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
18868 |       }
18869 |     ],
18870 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-32-pv-n",
18871 |     "href": "/products/fittings/hard-tube-fittings/hnf-u28-32-pv-n",
18872 |     "selectionHref": "/products/fittings/hard-tube-fittings",
18873 |     "seo": {
18874 |       "title": "HNF-U28-32-PV-N 标滚卡箍接头 | FOREACH",
18875 |       "description": "HNF-U28-32-PV-N是一款适用于外径3.2 mm硬管的标滚卡箍接头，采用1/4-28 UNF螺纹、PVDF主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
18876 |     },
18877 |     "sectionTitleMap": {
18882 |   {
18883 |     "sourceType": "fitting-detail",
18884 |     "category": "fittings",
18885 |     "categoryId": "fittings",
18886 |     "categoryLabel": "接头系列",
18887 |     "productTypeId": "hard-tube-fittings",
18888 |     "productTypeName": "紧凑卡箍接头",
18889 |     "productId": "809128",
18890 |     "productCode": "809128",
18891 |     "seriesId": "compact-ferrule-fitting",
18892 |     "seriesName": "紧凑卡箍接头",
18908 |       "微流体液路连接",
18909 |       "泵阀接口连接",
18910 |       "流路基板连接",
18911 |       "IVD与分析仪器"
18912 |     ],
18913 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
18914 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
18915 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
18916 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
18917 |     "additionalImages": [],
18918 |     "imageAlt": "HNF6-M6-16-PS-B 紧凑卡箍接头 PPS",
18919 |     "detailMode": "standard_model",
18920 |     "hideModelAction": false,
18921 |     "showConfigurator": false,
19017 |       {
19018 |         "question": "HNF6-M6-16-PS-B是否可以申请2D图纸？",
19019 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19020 |       }
19021 |     ],
19022 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-16-ps-b",
19023 |     "href": "/products/fittings/hard-tube-fittings/hnf6-m6-16-ps-b",
19024 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19025 |     "seo": {
19026 |       "title": "HNF6-M6-16-PS-B 紧凑卡箍接头 | FOREACH",
19027 |       "description": "HNF6-M6-16-PS-B是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19028 |     },
19029 |     "sectionTitleMap": {
19034 |   {
19035 |     "sourceType": "fitting-detail",
19036 |     "category": "fittings",
19037 |     "categoryId": "fittings",
19038 |     "categoryLabel": "接头系列",
19039 |     "productTypeId": "hard-tube-fittings",
19040 |     "productTypeName": "紧凑卡箍接头",
19041 |     "productId": "809148",
19042 |     "productCode": "809148",
19043 |     "seriesId": "compact-ferrule-fitting",
19044 |     "seriesName": "紧凑卡箍接头",
19060 |       "微流体液路连接",
19061 |       "泵阀接口连接",
19062 |       "流路基板连接",
19063 |       "IVD与分析仪器"
19064 |     ],
19065 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
19066 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
19067 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
19068 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
19069 |     "additionalImages": [],
19070 |     "imageAlt": "HNF6-M6-20-PS-B 紧凑卡箍接头 PPS",
19071 |     "detailMode": "standard_model",
19072 |     "hideModelAction": false,
19073 |     "showConfigurator": false,
19169 |       {
19170 |         "question": "HNF6-M6-20-PS-B是否可以申请2D图纸？",
19171 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19172 |       }
19173 |     ],
19174 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-20-ps-b",
19175 |     "href": "/products/fittings/hard-tube-fittings/hnf6-m6-20-ps-b",
19176 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19177 |     "seo": {
19178 |       "title": "HNF6-M6-20-PS-B 紧凑卡箍接头 | FOREACH",
19179 |       "description": "HNF6-M6-20-PS-B是一款适用于外径2.0 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19180 |     },
19181 |     "sectionTitleMap": {
19186 |   {
19187 |     "sourceType": "fitting-detail",
19188 |     "category": "fittings",
19189 |     "categoryId": "fittings",
19190 |     "categoryLabel": "接头系列",
19191 |     "productTypeId": "hard-tube-fittings",
19192 |     "productTypeName": "紧凑卡箍接头",
19193 |     "productId": "809168",
19194 |     "productCode": "809168",
19195 |     "seriesId": "compact-ferrule-fitting",
19196 |     "seriesName": "紧凑卡箍接头",
19212 |       "微流体液路连接",
19213 |       "泵阀接口连接",
19214 |       "流路基板连接",
19215 |       "IVD与分析仪器"
19216 |     ],
19217 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
19218 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
19219 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
19220 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
19221 |     "additionalImages": [],
19222 |     "imageAlt": "HNF6-M6-25-PS-B 紧凑卡箍接头 PPS",
19223 |     "detailMode": "standard_model",
19224 |     "hideModelAction": false,
19225 |     "showConfigurator": false,
19321 |       {
19322 |         "question": "HNF6-M6-25-PS-B是否可以申请2D图纸？",
19323 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19324 |       }
19325 |     ],
19326 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-25-ps-b",
19327 |     "href": "/products/fittings/hard-tube-fittings/hnf6-m6-25-ps-b",
19328 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19329 |     "seo": {
19330 |       "title": "HNF6-M6-25-PS-B 紧凑卡箍接头 | FOREACH",
19331 |       "description": "HNF6-M6-25-PS-B是一款适用于外径2.5 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19332 |     },
19333 |     "sectionTitleMap": {
19338 |   {
19339 |     "sourceType": "fitting-detail",
19340 |     "category": "fittings",
19341 |     "categoryId": "fittings",
19342 |     "categoryLabel": "接头系列",
19343 |     "productTypeId": "hard-tube-fittings",
19344 |     "productTypeName": "紧凑卡箍接头",
19345 |     "productId": "809158",
19346 |     "productCode": "809158",
19347 |     "seriesId": "compact-ferrule-fitting",
19348 |     "seriesName": "紧凑卡箍接头",
19364 |       "微流体液路连接",
19365 |       "泵阀接口连接",
19366 |       "流路基板连接",
19367 |       "IVD与分析仪器"
19368 |     ],
19369 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
19370 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
19371 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
19372 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
19373 |     "additionalImages": [],
19374 |     "imageAlt": "HNF6-M6-30-PS-B 紧凑卡箍接头 PPS",
19375 |     "detailMode": "standard_model",
19376 |     "hideModelAction": false,
19377 |     "showConfigurator": false,
19473 |       {
19474 |         "question": "HNF6-M6-30-PS-B是否可以申请2D图纸？",
19475 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19476 |       }
19477 |     ],
19478 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-30-ps-b",
19479 |     "href": "/products/fittings/hard-tube-fittings/hnf6-m6-30-ps-b",
19480 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19481 |     "seo": {
19482 |       "title": "HNF6-M6-30-PS-B 紧凑卡箍接头 | FOREACH",
19483 |       "description": "HNF6-M6-30-PS-B是一款适用于外径3.0 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19484 |     },
19485 |     "sectionTitleMap": {
19490 |   {
19491 |     "sourceType": "fitting-detail",
19492 |     "category": "fittings",
19493 |     "categoryId": "fittings",
19494 |     "categoryLabel": "接头系列",
19495 |     "productTypeId": "hard-tube-fittings",
19496 |     "productTypeName": "紧凑卡箍接头",
19497 |     "productId": "809138",
19498 |     "productCode": "809138",
19499 |     "seriesId": "compact-ferrule-fitting",
19500 |     "seriesName": "紧凑卡箍接头",
19516 |       "微流体液路连接",
19517 |       "泵阀接口连接",
19518 |       "流路基板连接",
19519 |       "IVD与分析仪器"
19520 |     ],
19521 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
19522 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
19523 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
19524 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
19525 |     "additionalImages": [],
19526 |     "imageAlt": "HNF6-M6-32-PS-B 紧凑卡箍接头 PPS",
19527 |     "detailMode": "standard_model",
19528 |     "hideModelAction": false,
19529 |     "showConfigurator": false,
19625 |       {
19626 |         "question": "HNF6-M6-32-PS-B是否可以申请2D图纸？",
19627 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19628 |       }
19629 |     ],
19630 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-32-ps-b",
19631 |     "href": "/products/fittings/hard-tube-fittings/hnf6-m6-32-ps-b",
19632 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19633 |     "seo": {
19634 |       "title": "HNF6-M6-32-PS-B 紧凑卡箍接头 | FOREACH",
19635 |       "description": "HNF6-M6-32-PS-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用M6×1螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19636 |     },
19637 |     "sectionTitleMap": {
19642 |   {
19643 |     "sourceType": "fitting-detail",
19644 |     "category": "fittings",
19645 |     "categoryId": "fittings",
19646 |     "categoryLabel": "接头系列",
19647 |     "productTypeId": "hard-tube-fittings",
19648 |     "productTypeName": "紧凑卡箍接头",
19649 |     "productId": "809127",
19650 |     "productCode": "809127",
19651 |     "seriesId": "compact-ferrule-fitting",
19652 |     "seriesName": "紧凑卡箍接头",
19668 |       "微流体液路连接",
19669 |       "泵阀接口连接",
19670 |       "流路基板连接",
19671 |       "IVD与分析仪器"
19672 |     ],
19673 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19674 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19675 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19676 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19677 |     "additionalImages": [],
19678 |     "imageAlt": "HNF6-U28-16-PS-B 紧凑卡箍接头 PPS",
19679 |     "detailMode": "standard_model",
19680 |     "hideModelAction": false,
19681 |     "showConfigurator": false,
19777 |       {
19778 |         "question": "HNF6-U28-16-PS-B是否可以申请2D图纸？",
19779 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19780 |       }
19781 |     ],
19782 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-16-ps-b",
19783 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-16-ps-b",
19784 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19785 |     "seo": {
19786 |       "title": "HNF6-U28-16-PS-B 紧凑卡箍接头 | FOREACH",
19787 |       "description": "HNF6-U28-16-PS-B是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19788 |     },
19789 |     "sectionTitleMap": {
19794 |   {
19795 |     "sourceType": "fitting-detail",
19796 |     "category": "fittings",
19797 |     "categoryId": "fittings",
19798 |     "categoryLabel": "接头系列",
19799 |     "productTypeId": "hard-tube-fittings",
19800 |     "productTypeName": "紧凑卡箍接头",
19801 |     "productId": "809553",
19802 |     "productCode": "809553",
19803 |     "seriesId": "compact-ferrule-fitting",
19804 |     "seriesName": "紧凑卡箍接头",
19820 |       "微流体液路连接",
19821 |       "泵阀接口连接",
19822 |       "流路基板连接",
19823 |       "IVD与分析仪器"
19824 |     ],
19825 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19826 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19827 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19828 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
19829 |     "additionalImages": [],
19830 |     "imageAlt": "HNF6-U28-16-PS-U 紧凑卡箍接头 PPS",
19831 |     "detailMode": "standard_model",
19832 |     "hideModelAction": false,
19833 |     "showConfigurator": false,
19929 |       {
19930 |         "question": "HNF6-U28-16-PS-U是否可以申请2D图纸？",
19931 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
19932 |       }
19933 |     ],
19934 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-16-ps-u",
19935 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-16-ps-u",
19936 |     "selectionHref": "/products/fittings/hard-tube-fittings",
19937 |     "seo": {
19938 |       "title": "HNF6-U28-16-PS-U 紧凑卡箍接头 | FOREACH",
19939 |       "description": "HNF6-U28-16-PS-U是一款适用于外径1.6 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
19940 |     },
19941 |     "sectionTitleMap": {
19946 |   {
19947 |     "sourceType": "fitting-detail",
19948 |     "category": "fittings",
19949 |     "categoryId": "fittings",
19950 |     "categoryLabel": "接头系列",
19951 |     "productTypeId": "hard-tube-fittings",
19952 |     "productTypeName": "紧凑卡箍接头",
19953 |     "productId": "809147",
19954 |     "productCode": "809147",
19955 |     "seriesId": "compact-ferrule-fitting",
19956 |     "seriesName": "紧凑卡箍接头",
19972 |       "微流体液路连接",
19973 |       "泵阀接口连接",
19974 |       "流路基板连接",
19975 |       "IVD与分析仪器"
19976 |     ],
19977 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
19978 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
19979 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
19980 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
19981 |     "additionalImages": [],
19982 |     "imageAlt": "HNF6-U28-20-PS-B 紧凑卡箍接头 PPS",
19983 |     "detailMode": "standard_model",
19984 |     "hideModelAction": false,
19985 |     "showConfigurator": false,
20081 |       {
20082 |         "question": "HNF6-U28-20-PS-B是否可以申请2D图纸？",
20083 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20084 |       }
20085 |     ],
20086 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-20-ps-b",
20087 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-20-ps-b",
20088 |     "selectionHref": "/products/fittings/hard-tube-fittings",
20089 |     "seo": {
20090 |       "title": "HNF6-U28-20-PS-B 紧凑卡箍接头 | FOREACH",
20091 |       "description": "HNF6-U28-20-PS-B是一款适用于外径2.0 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
20092 |     },
20093 |     "sectionTitleMap": {
20098 |   {
20099 |     "sourceType": "fitting-detail",
20100 |     "category": "fittings",
20101 |     "categoryId": "fittings",
20102 |     "categoryLabel": "接头系列",
20103 |     "productTypeId": "hard-tube-fittings",
20104 |     "productTypeName": "紧凑卡箍接头",
20105 |     "productId": "809554",
20106 |     "productCode": "809554",
20107 |     "seriesId": "compact-ferrule-fitting",
20108 |     "seriesName": "紧凑卡箍接头",
20124 |       "微流体液路连接",
20125 |       "泵阀接口连接",
20126 |       "流路基板连接",
20127 |       "IVD与分析仪器"
20128 |     ],
20129 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
20130 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
20131 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
20132 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
20133 |     "additionalImages": [],
20134 |     "imageAlt": "HNF6-U28-20-PS-U 紧凑卡箍接头 PPS",
20135 |     "detailMode": "standard_model",
20136 |     "hideModelAction": false,
20137 |     "showConfigurator": false,
20233 |       {
20234 |         "question": "HNF6-U28-20-PS-U是否可以申请2D图纸？",
20235 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20236 |       }
20237 |     ],
20238 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-20-ps-u",
20239 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-20-ps-u",
20240 |     "selectionHref": "/products/fittings/hard-tube-fittings",
20241 |     "seo": {
20242 |       "title": "HNF6-U28-20-PS-U 紧凑卡箍接头 | FOREACH",
20243 |       "description": "HNF6-U28-20-PS-U是一款适用于外径2.0 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
20244 |     },
20245 |     "sectionTitleMap": {
20250 |   {
20251 |     "sourceType": "fitting-detail",
20252 |     "category": "fittings",
20253 |     "categoryId": "fittings",
20254 |     "categoryLabel": "接头系列",
20255 |     "productTypeId": "hard-tube-fittings",
20256 |     "productTypeName": "紧凑卡箍接头",
20257 |     "productId": "809167",
20258 |     "productCode": "809167",
20259 |     "seriesId": "compact-ferrule-fitting",
20260 |     "seriesName": "紧凑卡箍接头",
20276 |       "微流体液路连接",
20277 |       "泵阀接口连接",
20278 |       "流路基板连接",
20279 |       "IVD与分析仪器"
20280 |     ],
20281 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
20282 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
20283 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
20284 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
20285 |     "additionalImages": [],
20286 |     "imageAlt": "HNF6-U28-25-PS-B 紧凑卡箍接头 PPS",
20287 |     "detailMode": "standard_model",
20288 |     "hideModelAction": false,
20289 |     "showConfigurator": false,
20385 |       {
20386 |         "question": "HNF6-U28-25-PS-B是否可以申请2D图纸？",
20387 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20388 |       }
20389 |     ],
20390 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-25-ps-b",
20391 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-25-ps-b",
20392 |     "selectionHref": "/products/fittings/hard-tube-fittings",
20393 |     "seo": {
20394 |       "title": "HNF6-U28-25-PS-B 紧凑卡箍接头 | FOREACH",
20395 |       "description": "HNF6-U28-25-PS-B是一款适用于外径2.5 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
20396 |     },
20397 |     "sectionTitleMap": {
20402 |   {
20403 |     "sourceType": "fitting-detail",
20404 |     "category": "fittings",
20405 |     "categoryId": "fittings",
20406 |     "categoryLabel": "接头系列",
20407 |     "productTypeId": "hard-tube-fittings",
20408 |     "productTypeName": "紧凑卡箍接头",
20409 |     "productId": "809157",
20410 |     "productCode": "809157",
20411 |     "seriesId": "compact-ferrule-fitting",
20412 |     "seriesName": "紧凑卡箍接头",
20428 |       "微流体液路连接",
20429 |       "泵阀接口连接",
20430 |       "流路基板连接",
20431 |       "IVD与分析仪器"
20432 |     ],
20433 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
20434 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
20435 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
20436 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
20437 |     "additionalImages": [],
20438 |     "imageAlt": "HNF6-U28-30-PS-B 紧凑卡箍接头 PPS",
20439 |     "detailMode": "standard_model",
20440 |     "hideModelAction": false,
20441 |     "showConfigurator": false,
20537 |       {
20538 |         "question": "HNF6-U28-30-PS-B是否可以申请2D图纸？",
20539 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20540 |       }
20541 |     ],
20542 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-30-ps-b",
20543 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-30-ps-b",
20544 |     "selectionHref": "/products/fittings/hard-tube-fittings",
20545 |     "seo": {
20546 |       "title": "HNF6-U28-30-PS-B 紧凑卡箍接头 | FOREACH",
20547 |       "description": "HNF6-U28-30-PS-B是一款适用于外径3.0 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
20548 |     },
20549 |     "sectionTitleMap": {
20554 |   {
20555 |     "sourceType": "fitting-detail",
20556 |     "category": "fittings",
20557 |     "categoryId": "fittings",
20558 |     "categoryLabel": "接头系列",
20559 |     "productTypeId": "hard-tube-fittings",
20560 |     "productTypeName": "紧凑卡箍接头",
20561 |     "productId": "809137",
20562 |     "productCode": "809137",
20563 |     "seriesId": "compact-ferrule-fitting",
20564 |     "seriesName": "紧凑卡箍接头",
20580 |       "微流体液路连接",
20581 |       "泵阀接口连接",
20582 |       "流路基板连接",
20583 |       "IVD与分析仪器"
20584 |     ],
20585 |     "mainImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
20586 |     "image": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
20587 |     "heroImage": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
20588 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
20589 |     "additionalImages": [],
20590 |     "imageAlt": "HNF6-U28-32-PS-B 紧凑卡箍接头 PPS",
20591 |     "detailMode": "standard_model",
20592 |     "hideModelAction": false,
20593 |     "showConfigurator": false,
20689 |       {
20690 |         "question": "HNF6-U28-32-PS-B是否可以申请2D图纸？",
20691 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20692 |       }
20693 |     ],
20694 |     "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-32-ps-b",
20695 |     "href": "/products/fittings/hard-tube-fittings/hnf6-u28-32-ps-b",
20696 |     "selectionHref": "/products/fittings/hard-tube-fittings",
20697 |     "seo": {
20698 |       "title": "HNF6-U28-32-PS-B 紧凑卡箍接头 | FOREACH",
20699 |       "description": "HNF6-U28-32-PS-B是一款适用于外径3.2 mm硬管的紧凑卡箍接头，采用1/4-28 UNF螺纹、PPS主体和卡箍密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
20700 |     },
20701 |     "sectionTitleMap": {
20706 |   {
20707 |     "sourceType": "fitting-detail",
20708 |     "category": "fittings",
20709 |     "categoryId": "fittings",
20710 |     "categoryLabel": "接头系列",
20711 |     "productTypeId": "hard-tube-fittings",
20712 |     "productTypeName": "卡环接头",
20713 |     "productId": "809937",
20714 |     "productCode": "809937",
20715 |     "seriesId": "retaining-ring-fitting",
20716 |     "seriesName": "卡环接头",
20841 |       {
20842 |         "question": "HSF-U28-16-PK-N是否可以申请2D图纸？",
20843 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20844 |       }
20845 |     ],
20846 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf-u28-16-pk-n",
20847 |     "href": "/products/fittings/hard-tube-fittings/hsf-u28-16-pk-n",
20848 |     "selectionHref": "/products/fittings/hard-tube-fittings",
20849 |     "seo": {
20850 |       "title": "HSF-U28-16-PK-N 卡环接头 | FOREACH",
20851 |       "description": "HSF-U28-16-PK-N是一款适用于外径1.6 mm硬管的卡环接头，采用1/4-28 UNF螺纹、PEEK主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
20852 |     },
20853 |     "sectionTitleMap": {
20858 |   {
20859 |     "sourceType": "fitting-detail",
20860 |     "category": "fittings",
20861 |     "categoryId": "fittings",
20862 |     "categoryLabel": "接头系列",
20863 |     "productTypeId": "hard-tube-fittings",
20864 |     "productTypeName": "卡环接头",
20865 |     "productId": "809861",
20866 |     "productCode": "809861",
20867 |     "seriesId": "retaining-ring-fitting",
20868 |     "seriesName": "卡环接头",
20993 |       {
20994 |         "question": "HSF-U28-32-PEEK-N是否可以申请2D图纸？",
20995 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
20996 |       }
20997 |     ],
20998 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf-u28-32-peek-n",
20999 |     "href": "/products/fittings/hard-tube-fittings/hsf-u28-32-peek-n",
21000 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21001 |     "seo": {
21002 |       "title": "HSF-U28-32-PEEK-N 卡环接头 | FOREACH",
21003 |       "description": "HSF-U28-32-PEEK-N是一款适用于外径3.2 mm硬管的卡环接头，采用1/4-28 UNF螺纹、PEEK主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21004 |     },
21005 |     "sectionTitleMap": {
21010 |   {
21011 |     "sourceType": "fitting-detail",
21012 |     "category": "fittings",
21013 |     "categoryId": "fittings",
21014 |     "categoryLabel": "接头系列",
21015 |     "productTypeId": "hard-tube-fittings",
21016 |     "productTypeName": "卡环接头",
21017 |     "productId": "809816",
21018 |     "productCode": "809816",
21019 |     "seriesId": "retaining-ring-fitting",
21020 |     "seriesName": "卡环接头",
21145 |       {
21146 |         "question": "HSF6-M6-16-PS-B是否可以申请2D图纸？",
21147 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
21148 |       }
21149 |     ],
21150 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf6-m6-16-ps-b",
21151 |     "href": "/products/fittings/hard-tube-fittings/hsf6-m6-16-ps-b",
21152 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21153 |     "seo": {
21154 |       "title": "HSF6-M6-16-PS-B 卡环接头 | FOREACH",
21155 |       "description": "HSF6-M6-16-PS-B是一款适用于外径1.6 mm硬管的卡环接头，采用M6×1螺纹、PPS主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21156 |     },
21157 |     "sectionTitleMap": {
21162 |   {
21163 |     "sourceType": "fitting-detail",
21164 |     "category": "fittings",
21165 |     "categoryId": "fittings",
21166 |     "categoryLabel": "接头系列",
21167 |     "productTypeId": "hard-tube-fittings",
21168 |     "productTypeName": "卡环接头",
21169 |     "productId": "809837",
21170 |     "productCode": "809837",
21171 |     "seriesId": "retaining-ring-fitting",
21172 |     "seriesName": "卡环接头",
21297 |       {
21298 |         "question": "HSF6-M6-18-PS-B是否可以申请2D图纸？",
21299 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
21300 |       }
21301 |     ],
21302 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf6-m6-18-ps-b",
21303 |     "href": "/products/fittings/hard-tube-fittings/hsf6-m6-18-ps-b",
21304 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21305 |     "seo": {
21306 |       "title": "HSF6-M6-18-PS-B 卡环接头 | FOREACH",
21307 |       "description": "HSF6-M6-18-PS-B是一款适用于外径1.8 mm硬管的卡环接头，采用M6×1螺纹、PPS主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21308 |     },
21309 |     "sectionTitleMap": {
21314 |   {
21315 |     "sourceType": "fitting-detail",
21316 |     "category": "fittings",
21317 |     "categoryId": "fittings",
21318 |     "categoryLabel": "接头系列",
21319 |     "productTypeId": "hard-tube-fittings",
21320 |     "productTypeName": "卡环接头",
21321 |     "productId": "809945",
21322 |     "productCode": "809945",
21323 |     "seriesId": "retaining-ring-fitting",
21324 |     "seriesName": "卡环接头",
21449 |       {
21450 |         "question": "HSF6-U28-16-PK-N是否可以申请2D图纸？",
21451 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
21452 |       }
21453 |     ],
21454 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf6-u28-16-pk-n",
21455 |     "href": "/products/fittings/hard-tube-fittings/hsf6-u28-16-pk-n",
21456 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21457 |     "seo": {
21458 |       "title": "HSF6-U28-16-PK-N 卡环接头 | FOREACH",
21459 |       "description": "HSF6-U28-16-PK-N是一款适用于外径1.6 mm硬管的卡环接头，采用1/4-28 UNF螺纹、PEEK主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21460 |     },
21461 |     "sectionTitleMap": {
21466 |   {
21467 |     "sourceType": "fitting-detail",
21468 |     "category": "fittings",
21469 |     "categoryId": "fittings",
21470 |     "categoryLabel": "接头系列",
21471 |     "productTypeId": "hard-tube-fittings",
21472 |     "productTypeName": "卡环接头",
21473 |     "productId": "809814",
21474 |     "productCode": "809814",
21475 |     "seriesId": "retaining-ring-fitting",
21476 |     "seriesName": "卡环接头",
21601 |       {
21602 |         "question": "HSF6-U28-16-PS-B是否可以申请2D图纸？",
21603 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
21604 |       }
21605 |     ],
21606 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf6-u28-16-ps-b",
21607 |     "href": "/products/fittings/hard-tube-fittings/hsf6-u28-16-ps-b",
21608 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21609 |     "seo": {
21610 |       "title": "HSF6-U28-16-PS-B 卡环接头 | FOREACH",
21611 |       "description": "HSF6-U28-16-PS-B是一款适用于外径1.6 mm硬管的卡环接头，采用1/4-28 UNF螺纹、PPS主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21612 |     },
21613 |     "sectionTitleMap": {
21618 |   {
21619 |     "sourceType": "fitting-detail",
21620 |     "category": "fittings",
21621 |     "categoryId": "fittings",
21622 |     "categoryLabel": "接头系列",
21623 |     "productTypeId": "hard-tube-fittings",
21624 |     "productTypeName": "卡环接头",
21625 |     "productId": "809828",
21626 |     "productCode": "809828",
21627 |     "seriesId": "retaining-ring-fitting",
21628 |     "seriesName": "卡环接头",
21753 |       {
21754 |         "question": "HSF6-U28-32-PK-N是否可以申请2D图纸？",
21755 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
21756 |       }
21757 |     ],
21758 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf6-u28-32-pk-n",
21759 |     "href": "/products/fittings/hard-tube-fittings/hsf6-u28-32-pk-n",
21760 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21761 |     "seo": {
21762 |       "title": "HSF6-U28-32-PK-N 卡环接头 | FOREACH",
21763 |       "description": "HSF6-U28-32-PK-N是一款适用于外径3.2 mm硬管的卡环接头，采用1/4-28 UNF螺纹、PEEK主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21764 |     },
21765 |     "sectionTitleMap": {
21770 |   {
21771 |     "sourceType": "fitting-detail",
21772 |     "category": "fittings",
21773 |     "categoryId": "fittings",
21774 |     "categoryLabel": "接头系列",
21775 |     "productTypeId": "hard-tube-fittings",
21776 |     "productTypeName": "卡环接头",
21777 |     "productId": "809815",
21778 |     "productCode": "809815",
21779 |     "seriesId": "retaining-ring-fitting",
21780 |     "seriesName": "卡环接头",
21905 |       {
21906 |         "question": "HSF6-U28-32-PS-B是否可以申请2D图纸？",
21907 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
21908 |       }
21909 |     ],
21910 |     "detailHref": "/products/fittings/hard-tube-fittings/hsf6-u28-32-ps-b",
21911 |     "href": "/products/fittings/hard-tube-fittings/hsf6-u28-32-ps-b",
21912 |     "selectionHref": "/products/fittings/hard-tube-fittings",
21913 |     "seo": {
21914 |       "title": "HSF6-U28-32-PS-B 卡环接头 | FOREACH",
21915 |       "description": "HSF6-U28-32-PS-B是一款适用于外径3.2 mm硬管的卡环接头，采用1/4-28 UNF螺纹、PPS主体和卡环密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。"
21916 |     },
21917 |     "sectionTitleMap": {
21922 |   {
21923 |     "sourceType": "fitting-detail",
21924 |     "category": "fittings",
21925 |     "categoryId": "fittings",
21926 |     "categoryLabel": "接头系列",
21927 |     "productTypeId": "hard-tube-fittings",
21928 |     "productTypeName": "高压接头",
21929 |     "productId": "809791",
21930 |     "productCode": "809791",
21931 |     "seriesId": "high-pressure-fitting",
21932 |     "seriesName": "高压接头",
21948 |       "高压微流体液路",
21949 |       "分析仪器",
21950 |       "样品前处理设备",
21951 |       "实验室自动化设备"
21952 |     ],
21953 |     "mainImage": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
21954 |     "image": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
21955 |     "heroImage": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
21956 |     "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
21957 |     "additionalImages": [],
21958 |     "imageAlt": "PNC-U32-16-PK-N 高压接头 PEEK",
21959 |     "detailMode": "standard_model",
21960 |     "hideModelAction": false,
21961 |     "showConfigurator": false,
22065 |       {
22066 |         "question": "PNC-U32-16-PK-N是否可以申请2D图纸？",
22067 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
22068 |       }
22069 |     ],
22070 |     "detailHref": "/products/fittings/hard-tube-fittings/pnc-u32-16-pk-n",
22071 |     "href": "/products/fittings/hard-tube-fittings/pnc-u32-16-pk-n",
22072 |     "selectionHref": "/products/fittings/hard-tube-fittings",
22073 |     "seo": {
22074 |       "title": "PNC-U32-16-PK-N 高压接头 | FOREACH",
22075 |       "description": "PNC-U32-16-PK-N是一款适用于外径1.6 mm硬管的高压接头，采用10-32 UNF螺纹和PEEK主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。"
22076 |     },
22077 |     "sectionTitleMap": {
22082 |   {
22083 |     "sourceType": "fitting-detail",
22084 |     "category": "fittings",
22085 |     "categoryId": "fittings",
22086 |     "categoryLabel": "接头系列",
22087 |     "productTypeId": "hard-tube-fittings",
22088 |     "productTypeName": "高压接头",
22089 |     "productId": "809661",
22090 |     "productCode": "809661",
22091 |     "seriesId": "high-pressure-fitting",
22092 |     "seriesName": "高压接头",
22108 |       "高压微流体液路",
22109 |       "分析仪器",
22110 |       "样品前处理设备",
22111 |       "实验室自动化设备"
22112 |     ],
22113 |     "mainImage": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
22114 |     "image": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
22115 |     "heroImage": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
22116 |     "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
22117 |     "additionalImages": [
22118 |       "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-02.jpg"
22119 |     ],
22120 |     "imageAlt": "PNC6-U32-16-PK-N 高压接头 PEEK",
22121 |     "detailMode": "standard_model",
22122 |     "hideModelAction": false,
22123 |     "showConfigurator": false,
22227 |       {
22228 |         "question": "PNC6-U32-16-PK-N是否可以申请2D图纸？",
22229 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
22230 |       }
22231 |     ],
22232 |     "detailHref": "/products/fittings/hard-tube-fittings/pnc6-u32-16-pk-n",
22233 |     "href": "/products/fittings/hard-tube-fittings/pnc6-u32-16-pk-n",
22234 |     "selectionHref": "/products/fittings/hard-tube-fittings",
22235 |     "seo": {
22236 |       "title": "PNC6-U32-16-PK-N 高压接头 | FOREACH",
22237 |       "description": "PNC6-U32-16-PK-N是一款适用于外径1.6 mm硬管的高压接头，采用10-32 UNF螺纹和PEEK主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。"
22238 |     },
22239 |     "sectionTitleMap": {
22244 |   {
22245 |     "sourceType": "fitting-detail",
22246 |     "category": "fittings",
22247 |     "categoryId": "fittings",
22248 |     "categoryLabel": "接头系列",
22249 |     "productTypeId": "hard-tube-fittings",
22250 |     "productTypeName": "高压接头",
22251 |     "productId": "809696",
22252 |     "productCode": "809696",
22253 |     "seriesId": "high-pressure-fitting",
22254 |     "seriesName": "高压接头",
22387 |       {
22388 |         "question": "PNF-U32-16-SS-N是否可以申请2D图纸？",
22389 |         "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
22390 |       }
22391 |     ],
22392 |     "detailHref": "/products/fittings/hard-tube-fittings/pnf-u32-16-ss-n",
22393 |     "href": "/products/fittings/hard-tube-fittings/pnf-u32-16-ss-n",
22394 |     "selectionHref": "/products/fittings/hard-tube-fittings",
22395 |     "seo": {
22396 |       "title": "PNF-U32-16-SS-N 高压接头 | FOREACH",
22397 |       "description": "PNF-U32-16-SS-N是一款适用于外径1.6 mm硬管的高压接头，采用10-32 UNF螺纹和SUS主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。"
22398 |     },
22399 |     "sectionTitleMap": {
```

## data\products\generated\pumps\pipetting-pumps\detail\index.json

```text
   27 | 
   28 |                              ],
   29 |         "showConfigurator":  false,
   30 |         "showDatasheetRequest":  false,
   31 |         "showDrawingRequest":  true,
   32 |         "detailHref":  "/products/pumps/pipetting-pumps/smtp2-1000ul",
   33 |         "selectionHref":  "/products/pumps/pipetting-pumps",
   34 |         "specSeriesKey":  "smtp2-1000ul",
   35 |         "mainImage":  "/images/products/pumps/pipetting-pumps/foreach-smtp2-1000ul-programmable-gas-displacement-pipetting-pump.webp",
   36 |         "imageAltEn":  "FOREACH SMTP2 1000μL programmable gas displacement pipetting pump for automated sample transfer and reagent dispensing",
   37 |         "imageAlt":  "FOREACH SMTP2 1000μL programmable gas displacement pipetting pump for automated sample transfer and reagent dispensing",
  543 | 
  544 |                              ],
  545 |         "showConfigurator":  false,
  546 |         "showDatasheetRequest":  false,
  547 |         "showDrawingRequest":  true,
  548 |         "detailHref":  "/products/pumps/pipetting-pumps/smtp4-100ul",
  549 |         "selectionHref":  "/products/pumps/pipetting-pumps",
  550 |         "specSeriesKey":  "smtp4-100ul",
  551 |         "mainImage":  "/images/products/pumps/pipetting-pumps/foreach-smtp4-100ul-gas-displacement-pipetting-pump.webp",
  552 |         "imageAltEn":  "FOREACH SMTP4 100μL gas displacement pipetting pump for small-volume automated pipetting",
  553 |         "imageAlt":  "FOREACH SMTP4 100μL gas displacement pipetting pump for small-volume automated pipetting",
 1055 | 
 1056 |                              ],
 1057 |         "showConfigurator":  false,
 1058 |         "showDatasheetRequest":  false,
 1059 |         "showDrawingRequest":  true,
 1060 |         "detailHref":  "/products/pumps/pipetting-pumps/smtp4-500ul",
 1061 |         "selectionHref":  "/products/pumps/pipetting-pumps",
 1062 |         "specSeriesKey":  "smtp4-500ul",
 1063 |         "mainImage":  "/images/products/pumps/pipetting-pumps/foreach-smtp4-500ul-gas-displacement-pipetting-pump.webp",
 1064 |         "imageAltEn":  "FOREACH SMTP4 500μL gas displacement pipetting pump for automated sample transfer and reagent dispensing",
 1065 |         "imageAlt":  "FOREACH SMTP4 500μL gas displacement pipetting pump for automated sample transfer and reagent dispensing",
```

## data\products\generated\pumps\pipetting-pumps\selection.generated.ts

```text
    3 |   slug: string;
    4 |   productType: "移液泵";
    5 |   pumpType: "SMTP2 可编程气体置换式移液泵" | "SMTP4 气体置换式移液泵";
    6 |   volume: "100 μL" | "500 μL" | "1000 μL";
    7 |   cardLines: [string, string, string];
    8 |   detailHref: string;
    9 |   imagePath: string;
   10 |   needDrawing: boolean;
   11 |   needModel3d: boolean;
   12 | };
   13 | 
   36 |     cardLines: [
   37 |       "定量分辨率 0.02 μL/微步",
   38 |       "液面检测与堵塞检测",
   39 |       "自动脱吸头",
   40 |     ],
   41 |     detailHref: "/products/pumps/pipetting-pumps/smtp2-1000ul",
   42 |     imagePath: "/images/products/pumps/pipetting-pumps/smtp2-1000ul.webp",
   43 |     needDrawing: true,
   44 |     needModel3d: true,
   45 |   },
   46 |   {
   52 |     cardLines: [
   53 |       "定量分辨率 0.05 μL/步",
   54 |       "吸头配置可定制",
   55 |       "自动脱吸头",
   56 |     ],
   57 |     detailHref: "/products/pumps/pipetting-pumps/smtp4-100ul",
   58 |     imagePath: "/images/products/pumps/pipetting-pumps/smtp4-100ul.webp",
   59 |     needDrawing: true,
   60 |     needModel3d: true,
   61 |   },
   62 |   {
   68 |     cardLines: [
   69 |       "定量分辨率 0.25 μL/步",
   70 |       "吸头配置可定制",
   71 |       "自动脱吸头",
   72 |     ],
   73 |     detailHref: "/products/pumps/pipetting-pumps/smtp4-500ul",
   74 |     imagePath: "/images/products/pumps/pipetting-pumps/smtp4-500ul.webp",
   75 |     needDrawing: true,
   76 |     needModel3d: true,
   77 |   },
   78 | ];
```

## data\products\generated\pumps\syringe-pumps\detail\index.json

```text
  152 |     "drawingPdf": "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hmd3-solenoid-valve-syringe-pump-2d-drawing.pdf",
  153 |     "model3d": "/models/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.glb",
  154 |     "customInquiryHref": "/contact",
  155 |     "contactHref": "/contact",
  156 |     "selectionHref": "/products/pumps/syringe-pumps",
  157 |     "detailHref": "/products/pumps/syringe-pumps/hmd3-30mm-solenoid-syringe-pump",
  158 |     "specs": [
  159 |       {
  160 |         "label": "产品系列",
  161 |         "value": "HMD3 电磁阀系列注射泵"
  162 |       },
  500 |     "drawingPdf": "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hmd6-solenoid-valve-syringe-pump-2d-drawing.pdf",
  501 |     "model3d": "/models/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.glb",
  502 |     "customInquiryHref": "/contact",
  503 |     "contactHref": "/contact",
  504 |     "selectionHref": "/products/pumps/syringe-pumps",
  505 |     "detailHref": "/products/pumps/syringe-pumps/hmd6-60mm-solenoid-syringe-pump",
  506 |     "specs": [
  507 |       {
  508 |         "label": "产品系列",
  509 |         "value": "HMD6 电磁阀系列注射泵"
  510 |       },
  856 |     "drawingPdf": "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hld3-rotary-valve-syringe-pump-2d-drawing.pdf",
  857 |     "model3d": "/models/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.glb",
  858 |     "customInquiryHref": "/contact",
  859 |     "contactHref": "/contact",
  860 |     "selectionHref": "/products/pumps/syringe-pumps",
  861 |     "detailHref": "/products/pumps/syringe-pumps/hld3-30mm-rotary-valve-syringe-pump",
  862 |     "specs": [
  863 |       {
  864 |         "label": "产品系列",
  865 |         "value": "HLD3 旋转阀系列注射泵"
  866 |       },
 1216 |     "drawingPdf": "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hld6-rotary-valve-syringe-pump-2d-drawing.pdf",
 1217 |     "model3d": "/models/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.glb",
 1218 |     "customInquiryHref": "/contact",
 1219 |     "contactHref": "/contact",
 1220 |     "selectionHref": "/products/pumps/syringe-pumps",
 1221 |     "detailHref": "/products/pumps/syringe-pumps/hld6-60mm-rotary-valve-syringe-pump",
 1222 |     "specs": [
 1223 |       {
 1224 |         "label": "产品系列",
 1225 |         "value": "HLD6 / HLD6M 旋转阀系列注射泵"
 1226 |       },
```

## data\products\generated\pumps\valveless-pumps\detail\index.json

```text
  377 |                                                       }
  378 |                                                   ]
  379 |                                     }
  380 |                                 ],
  381 |         "selectionHref":  "/products/pumps/valveless-pumps",
  382 |         "detailHref":  "/products/pumps/valveless-pumps/rpl-p4",
  383 |         "href":  "/products/pumps/valveless-pumps/rpl-p4"
  384 |     },
  385 |     {
  386 |         "slug":  "rpl-p635",
  387 |         "productId":  "valveless-rpl-p635",
  801 |                                                       }
  802 |                                                   ]
  803 |                                     }
  804 |                                 ],
  805 |         "selectionHref":  "/products/pumps/valveless-pumps",
  806 |         "detailHref":  "/products/pumps/valveless-pumps/rpl-p635",
  807 |         "href":  "/products/pumps/valveless-pumps/rpl-p635"
  808 |     },
  809 |     {
  810 |         "slug":  "rpl-p15",
  811 |         "productId":  "valveless-rpl-p15",
 1224 |                                                       }
 1225 |                                                   ]
 1226 |                                     }
 1227 |                                 ],
 1228 |         "selectionHref":  "/products/pumps/valveless-pumps",
 1229 |         "detailHref":  "/products/pumps/valveless-pumps/rpl-p15",
 1230 |         "href":  "/products/pumps/valveless-pumps/rpl-p15"
 1231 |     },
 1232 |     {
 1233 |         "slug":  "drpl-0109",
 1234 |         "productId":  "drpl-0109",
 1754 |                                    "value":  "20,000,000 Cycles",
 1755 |                                    "content":  "20,000,000 Cycles"
 1756 |                                }
 1757 |                            ],
 1758 |         "selectionHref":  "/products/pumps/valveless-pumps",
 1759 |         "detailHref":  "/products/pumps/valveless-pumps/drpl-0109",
 1760 |         "href":  "/products/pumps/valveless-pumps/drpl-0109",
 1761 |         "showStandardModelSelector":  false,
 1762 |         "showCustomInquiryCta":  true,
 1763 |         "h1Title":  "DRPL-0109 稀释比1:9 双头无阀泵",
 1764 |         "pageTitle":  "DRPL-0109 稀释比1:9 双头无阀泵",
 2291 |                                    "value":  "20,000,000 Cycles",
 2292 |                                    "content":  "20,000,000 Cycles"
 2293 |                                }
 2294 |                            ],
 2295 |         "selectionHref":  "/products/pumps/valveless-pumps",
 2296 |         "detailHref":  "/products/pumps/valveless-pumps/drpl-0119",
 2297 |         "href":  "/products/pumps/valveless-pumps/drpl-0119",
 2298 |         "showStandardModelSelector":  false,
 2299 |         "showCustomInquiryCta":  true,
 2300 |         "h1Title":  "DRPL-0119 稀释比1:19 双头无阀泵",
 2301 |         "pageTitle":  "DRPL-0119 稀释比1:19 双头无阀泵",
```

## data\products\generated\pumps\valveless-pumps\selection\index.json

```text
   21 |                                           "适用于微量加样、滴定场景。",
   22 |                                           "支持定制排量与接口配置。"
   23 |                                       ],
   24 |                       "image":  "/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-pump.webp",
   25 |                       "imageAltEn":  "FOREACH RPL-P4 valveless ceramic piston pump for small-volume dispensing",
   26 |                       "detailHref":  "/products/pumps/valveless-pumps/rpl-p4"
   27 |                   },
   28 |                   {
   29 |                       "slug":  "rpl-p635",
   30 |                       "title":  "RPL-P6.35 无阀泵",
   31 |                       "type":  "RPL 无阀泵",
   35 |                                           "适用于加样、灌装场景。",
   36 |                                           "支持清洗口与液路配置。"
   37 |                                       ],
   38 |                       "image":  "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
   39 |                       "imageAltEn":  "FOREACH RPL-P6.35 valveless ceramic piston pump for reagent dispensing and filling",
   40 |                       "detailHref":  "/products/pumps/valveless-pumps/rpl-p635"
   41 |                   },
   42 |                   {
   43 |                       "slug":  "rpl-p15",
   44 |                       "title":  "RPL-P15 无阀泵",
   45 |                       "type":  "RPL 无阀泵",
   49 |                                           "适用于加液、灌装场景。",
   50 |                                           "支持接口与安装方式定制。"
   51 |                                       ],
   52 |                       "image":  "/images/products/pumps/valveless-pumps/foreach-rpl-p15-valveless-pump.webp",
   53 |                       "imageAltEn":  "FOREACH RPL-P15 valveless ceramic piston pump for larger-volume dispensing and filling",
   54 |                       "detailHref":  "/products/pumps/valveless-pumps/rpl-p15"
   55 |                   },
   56 |                   {
   57 |                       "slug":  "drpl",
   58 |                       "title":  "DRPL 双头无阀泵",
   59 |                       "type":  "DRPL 双头无阀泵",
   63 |                                           "支持 1:9 至 1:19 配比范围。",
   64 |                                           "适用于双液路配比加液。"
   65 |                                       ],
   66 |                       "image":  "/images/products/pumps/valveless-pumps/foreach-drpl-dual-head-valveless-pump.webp",
   67 |                       "imageAltEn":  "FOREACH DRPL dual-head valveless pump for proportional fluid dispensing",
   68 |                       "detailHref":  "/products/pumps/valveless-pumps/drpl"
   69 |                   }
   70 |               ]
   71 | }
```

## data\products\generated\pumps\pump-series.detail.generated.ts

```text
   15 |       "slug": "",
   16 |       "routeSlug": "ea-100-pmma",
   17 |       "pumpTypeSlug": "plunger-pumps",
   18 |       "seriesSlug": "ea-standard-piston-pumps",
   19 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
   20 |       "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
   21 |       "legacyRedirectFrom": "",
   22 |       "trailingSlashPolicy": "no_trailing_slash"
   23 |     },
   24 |     "content": {
   25 |       "zh": {
  890 |       "slug": "",
  891 |       "routeSlug": "ea-100-peek",
  892 |       "pumpTypeSlug": "plunger-pumps",
  893 |       "seriesSlug": "ea-standard-piston-pumps",
  894 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
  895 |       "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
  896 |       "legacyRedirectFrom": "",
  897 |       "trailingSlashPolicy": "no_trailing_slash"
  898 |     },
  899 |     "content": {
  900 |       "zh": {
 1765 |       "slug": "",
 1766 |       "routeSlug": "ea-250-pmma",
 1767 |       "pumpTypeSlug": "plunger-pumps",
 1768 |       "seriesSlug": "ea-standard-piston-pumps",
 1769 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
 1770 |       "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
 1771 |       "legacyRedirectFrom": "",
 1772 |       "trailingSlashPolicy": "no_trailing_slash"
 1773 |     },
 1774 |     "content": {
 1775 |       "zh": {
 2640 |       "slug": "",
 2641 |       "routeSlug": "ea-250-peek",
 2642 |       "pumpTypeSlug": "plunger-pumps",
 2643 |       "seriesSlug": "ea-standard-piston-pumps",
 2644 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
 2645 |       "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
 2646 |       "legacyRedirectFrom": "",
 2647 |       "trailingSlashPolicy": "no_trailing_slash"
 2648 |     },
 2649 |     "content": {
 2650 |       "zh": {
 3515 |       "slug": "",
 3516 |       "routeSlug": "ea-500-pmma",
 3517 |       "pumpTypeSlug": "plunger-pumps",
 3518 |       "seriesSlug": "ea-standard-piston-pumps",
 3519 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-500-pmma",
 3520 |       "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
 3521 |       "legacyRedirectFrom": "",
 3522 |       "trailingSlashPolicy": "no_trailing_slash"
 3523 |     },
 3524 |     "content": {
 3525 |       "zh": {
 4390 |       "slug": "",
 4391 |       "routeSlug": "ea-500-peek",
 4392 |       "pumpTypeSlug": "plunger-pumps",
 4393 |       "seriesSlug": "ea-standard-piston-pumps",
 4394 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-500-peek",
 4395 |       "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
 4396 |       "legacyRedirectFrom": "",
 4397 |       "trailingSlashPolicy": "no_trailing_slash"
 4398 |     },
 4399 |     "content": {
 4400 |       "zh": {
 5265 |       "slug": "",
 5266 |       "routeSlug": "ea-1000-pmma",
 5267 |       "pumpTypeSlug": "plunger-pumps",
 5268 |       "seriesSlug": "ea-standard-piston-pumps",
 5269 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-pmma",
 5270 |       "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
 5271 |       "legacyRedirectFrom": "",
 5272 |       "trailingSlashPolicy": "no_trailing_slash"
 5273 |     },
 5274 |     "content": {
 5275 |       "zh": {
 6140 |       "slug": "",
 6141 |       "routeSlug": "ea-1000-peek",
 6142 |       "pumpTypeSlug": "plunger-pumps",
 6143 |       "seriesSlug": "ea-standard-piston-pumps",
 6144 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-peek",
 6145 |       "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
 6146 |       "legacyRedirectFrom": "",
 6147 |       "trailingSlashPolicy": "no_trailing_slash"
 6148 |     },
 6149 |     "content": {
 6150 |       "zh": {
 7015 |       "slug": "",
 7016 |       "routeSlug": "ea-2500-pmma",
 7017 |       "pumpTypeSlug": "plunger-pumps",
 7018 |       "seriesSlug": "ea-standard-piston-pumps",
 7019 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-pmma",
 7020 |       "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
 7021 |       "legacyRedirectFrom": "",
 7022 |       "trailingSlashPolicy": "no_trailing_slash"
 7023 |     },
 7024 |     "content": {
 7025 |       "zh": {
 7890 |       "slug": "",
 7891 |       "routeSlug": "ea-2500-peek",
 7892 |       "pumpTypeSlug": "plunger-pumps",
 7893 |       "seriesSlug": "ea-standard-piston-pumps",
 7894 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-peek",
 7895 |       "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
 7896 |       "legacyRedirectFrom": "",
 7897 |       "trailingSlashPolicy": "no_trailing_slash"
 7898 |     },
 7899 |     "content": {
 7900 |       "zh": {
 8765 |       "slug": "",
 8766 |       "routeSlug": "ea-5000-pmma",
 8767 |       "pumpTypeSlug": "plunger-pumps",
 8768 |       "seriesSlug": "ea-standard-piston-pumps",
 8769 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-pmma",
 8770 |       "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
 8771 |       "legacyRedirectFrom": "",
 8772 |       "trailingSlashPolicy": "no_trailing_slash"
 8773 |     },
 8774 |     "content": {
 8775 |       "zh": {
 9640 |       "slug": "",
 9641 |       "routeSlug": "ea-5000-peek",
 9642 |       "pumpTypeSlug": "plunger-pumps",
 9643 |       "seriesSlug": "ea-standard-piston-pumps",
 9644 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-peek",
 9645 |       "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
 9646 |       "legacyRedirectFrom": "",
 9647 |       "trailingSlashPolicy": "no_trailing_slash"
 9648 |     },
 9649 |     "content": {
 9650 |       "zh": {
10515 |       "slug": "",
10516 |       "routeSlug": "ea-10000-pmma",
10517 |       "pumpTypeSlug": "plunger-pumps",
10518 |       "seriesSlug": "ea-standard-piston-pumps",
10519 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-pmma",
10520 |       "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
10521 |       "legacyRedirectFrom": "",
10522 |       "trailingSlashPolicy": "no_trailing_slash"
10523 |     },
10524 |     "content": {
10525 |       "zh": {
11390 |       "slug": "",
11391 |       "routeSlug": "ea-10000-peek",
11392 |       "pumpTypeSlug": "plunger-pumps",
11393 |       "seriesSlug": "ea-standard-piston-pumps",
11394 |       "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-peek",
11395 |       "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
11396 |       "legacyRedirectFrom": "",
11397 |       "trailingSlashPolicy": "no_trailing_slash"
11398 |     },
11399 |     "content": {
11400 |       "zh": {
12265 |       "slug": "",
12266 |       "routeSlug": "sm-50-pmma",
12267 |       "pumpTypeSlug": "plunger-pumps",
12268 |       "seriesSlug": "sm-miniature-piston-pumps",
12269 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-50-pmma",
12270 |       "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
12271 |       "legacyRedirectFrom": "",
12272 |       "trailingSlashPolicy": "no_trailing_slash"
12273 |     },
12274 |     "content": {
12275 |       "zh": {
13124 |       "slug": "",
13125 |       "routeSlug": "sm-100-pmma",
13126 |       "pumpTypeSlug": "plunger-pumps",
13127 |       "seriesSlug": "sm-miniature-piston-pumps",
13128 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-100-pmma",
13129 |       "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
13130 |       "legacyRedirectFrom": "",
13131 |       "trailingSlashPolicy": "no_trailing_slash"
13132 |     },
13133 |     "content": {
13134 |       "zh": {
13983 |       "slug": "",
13984 |       "routeSlug": "sm-100-peek",
13985 |       "pumpTypeSlug": "plunger-pumps",
13986 |       "seriesSlug": "sm-miniature-piston-pumps",
13987 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-100-peek",
13988 |       "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
13989 |       "legacyRedirectFrom": "",
13990 |       "trailingSlashPolicy": "no_trailing_slash"
13991 |     },
13992 |     "content": {
13993 |       "zh": {
14842 |       "slug": "",
14843 |       "routeSlug": "sm-250-pmma",
14844 |       "pumpTypeSlug": "plunger-pumps",
14845 |       "seriesSlug": "sm-miniature-piston-pumps",
14846 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-250-pmma",
14847 |       "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
14848 |       "legacyRedirectFrom": "",
14849 |       "trailingSlashPolicy": "no_trailing_slash"
14850 |     },
14851 |     "content": {
14852 |       "zh": {
15701 |       "slug": "",
15702 |       "routeSlug": "sm-250-peek",
15703 |       "pumpTypeSlug": "plunger-pumps",
15704 |       "seriesSlug": "sm-miniature-piston-pumps",
15705 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-250-peek",
15706 |       "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
15707 |       "legacyRedirectFrom": "",
15708 |       "trailingSlashPolicy": "no_trailing_slash"
15709 |     },
15710 |     "content": {
15711 |       "zh": {
16560 |       "slug": "",
16561 |       "routeSlug": "sm-500-pmma",
16562 |       "pumpTypeSlug": "plunger-pumps",
16563 |       "seriesSlug": "sm-miniature-piston-pumps",
16564 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-500-pmma",
16565 |       "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
16566 |       "legacyRedirectFrom": "",
16567 |       "trailingSlashPolicy": "no_trailing_slash"
16568 |     },
16569 |     "content": {
16570 |       "zh": {
17419 |       "slug": "",
17420 |       "routeSlug": "sm-1000-pmma",
17421 |       "pumpTypeSlug": "plunger-pumps",
17422 |       "seriesSlug": "sm-miniature-piston-pumps",
17423 |       "canonicalPath": "/products/pumps/plunger-pumps/sm-1000-pmma",
17424 |       "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
17425 |       "legacyRedirectFrom": "",
17426 |       "trailingSlashPolicy": "no_trailing_slash"
17427 |     },
17428 |     "content": {
17429 |       "zh": {
18278 |       "slug": "",
18279 |       "routeSlug": "tm-50-pmma",
18280 |       "pumpTypeSlug": "plunger-pumps",
18281 |       "seriesSlug": "tm-ultra-compact-piston-pumps",
18282 |       "canonicalPath": "/products/pumps/plunger-pumps/tm-50-pmma",
18283 |       "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
18284 |       "legacyRedirectFrom": "",
18285 |       "trailingSlashPolicy": "no_trailing_slash"
18286 |     },
18287 |     "content": {
18288 |       "zh": {
19137 |       "slug": "",
19138 |       "routeSlug": "tm-100-pmma",
19139 |       "pumpTypeSlug": "plunger-pumps",
19140 |       "seriesSlug": "tm-ultra-compact-piston-pumps",
19141 |       "canonicalPath": "/products/pumps/plunger-pumps/tm-100-pmma",
19142 |       "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
19143 |       "legacyRedirectFrom": "",
19144 |       "trailingSlashPolicy": "no_trailing_slash"
19145 |     },
19146 |     "content": {
19147 |       "zh": {
19996 |       "slug": "",
19997 |       "routeSlug": "tm-250-pmma",
19998 |       "pumpTypeSlug": "plunger-pumps",
19999 |       "seriesSlug": "tm-ultra-compact-piston-pumps",
20000 |       "canonicalPath": "/products/pumps/plunger-pumps/tm-250-pmma",
20001 |       "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
20002 |       "legacyRedirectFrom": "",
20003 |       "trailingSlashPolicy": "no_trailing_slash"
20004 |     },
20005 |     "content": {
20006 |       "zh": {
20855 |       "slug": "",
20856 |       "routeSlug": "tm-500-pmma",
20857 |       "pumpTypeSlug": "plunger-pumps",
20858 |       "seriesSlug": "tm-ultra-compact-piston-pumps",
20859 |       "canonicalPath": "/products/pumps/plunger-pumps/tm-500-pmma",
20860 |       "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
20861 |       "legacyRedirectFrom": "",
20862 |       "trailingSlashPolicy": "no_trailing_slash"
20863 |     },
20864 |     "content": {
20865 |       "zh": {
```

## data\products\generated\pumps\pump-series.routes.generated.ts

```text
   15 |     "slug": "",
   16 |     "routeSlug": "ea-100-pmma",
   17 |     "pumpTypeSlug": "plunger-pumps",
   18 |     "seriesSlug": "ea-standard-piston-pumps",
   19 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
   20 |     "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
   21 |     "legacyRedirectFrom": "",
   22 |     "trailingSlashPolicy": "no_trailing_slash"
   23 |   },
   24 |   {
   25 |     "productId": "ea-100-peek",
   26 |     "slug": "",
   27 |     "routeSlug": "ea-100-peek",
   28 |     "pumpTypeSlug": "plunger-pumps",
   29 |     "seriesSlug": "ea-standard-piston-pumps",
   30 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
   31 |     "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
   32 |     "legacyRedirectFrom": "",
   33 |     "trailingSlashPolicy": "no_trailing_slash"
   34 |   },
   35 |   {
   36 |     "productId": "ea-250-pmma",
   37 |     "slug": "",
   38 |     "routeSlug": "ea-250-pmma",
   39 |     "pumpTypeSlug": "plunger-pumps",
   40 |     "seriesSlug": "ea-standard-piston-pumps",
   41 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
   42 |     "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
   43 |     "legacyRedirectFrom": "",
   44 |     "trailingSlashPolicy": "no_trailing_slash"
   45 |   },
   46 |   {
   47 |     "productId": "ea-250-peek",
   48 |     "slug": "",
   49 |     "routeSlug": "ea-250-peek",
   50 |     "pumpTypeSlug": "plunger-pumps",
   51 |     "seriesSlug": "ea-standard-piston-pumps",
   52 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
   53 |     "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
   54 |     "legacyRedirectFrom": "",
   55 |     "trailingSlashPolicy": "no_trailing_slash"
   56 |   },
   57 |   {
   58 |     "productId": "ea-500-pmma",
   59 |     "slug": "",
   60 |     "routeSlug": "ea-500-pmma",
   61 |     "pumpTypeSlug": "plunger-pumps",
   62 |     "seriesSlug": "ea-standard-piston-pumps",
   63 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-500-pmma",
   64 |     "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
   65 |     "legacyRedirectFrom": "",
   66 |     "trailingSlashPolicy": "no_trailing_slash"
   67 |   },
   68 |   {
   69 |     "productId": "ea-500-peek",
   70 |     "slug": "",
   71 |     "routeSlug": "ea-500-peek",
   72 |     "pumpTypeSlug": "plunger-pumps",
   73 |     "seriesSlug": "ea-standard-piston-pumps",
   74 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-500-peek",
   75 |     "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
   76 |     "legacyRedirectFrom": "",
   77 |     "trailingSlashPolicy": "no_trailing_slash"
   78 |   },
   79 |   {
   80 |     "productId": "ea-1000-pmma",
   81 |     "slug": "",
   82 |     "routeSlug": "ea-1000-pmma",
   83 |     "pumpTypeSlug": "plunger-pumps",
   84 |     "seriesSlug": "ea-standard-piston-pumps",
   85 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-pmma",
   86 |     "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
   87 |     "legacyRedirectFrom": "",
   88 |     "trailingSlashPolicy": "no_trailing_slash"
   89 |   },
   90 |   {
   91 |     "productId": "ea-1000-peek",
   92 |     "slug": "",
   93 |     "routeSlug": "ea-1000-peek",
   94 |     "pumpTypeSlug": "plunger-pumps",
   95 |     "seriesSlug": "ea-standard-piston-pumps",
   96 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-1000-peek",
   97 |     "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
   98 |     "legacyRedirectFrom": "",
   99 |     "trailingSlashPolicy": "no_trailing_slash"
  100 |   },
  101 |   {
  102 |     "productId": "ea-2500-pmma",
  103 |     "slug": "",
  104 |     "routeSlug": "ea-2500-pmma",
  105 |     "pumpTypeSlug": "plunger-pumps",
  106 |     "seriesSlug": "ea-standard-piston-pumps",
  107 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-pmma",
  108 |     "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
  109 |     "legacyRedirectFrom": "",
  110 |     "trailingSlashPolicy": "no_trailing_slash"
  111 |   },
  112 |   {
  113 |     "productId": "ea-2500-peek",
  114 |     "slug": "",
  115 |     "routeSlug": "ea-2500-peek",
  116 |     "pumpTypeSlug": "plunger-pumps",
  117 |     "seriesSlug": "ea-standard-piston-pumps",
  118 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-2500-peek",
  119 |     "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
  120 |     "legacyRedirectFrom": "",
  121 |     "trailingSlashPolicy": "no_trailing_slash"
  122 |   },
  123 |   {
  124 |     "productId": "ea-5000-pmma",
  125 |     "slug": "",
  126 |     "routeSlug": "ea-5000-pmma",
  127 |     "pumpTypeSlug": "plunger-pumps",
  128 |     "seriesSlug": "ea-standard-piston-pumps",
  129 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-pmma",
  130 |     "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
  131 |     "legacyRedirectFrom": "",
  132 |     "trailingSlashPolicy": "no_trailing_slash"
  133 |   },
  134 |   {
  135 |     "productId": "ea-5000-peek",
  136 |     "slug": "",
  137 |     "routeSlug": "ea-5000-peek",
  138 |     "pumpTypeSlug": "plunger-pumps",
  139 |     "seriesSlug": "ea-standard-piston-pumps",
  140 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-5000-peek",
  141 |     "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
  142 |     "legacyRedirectFrom": "",
  143 |     "trailingSlashPolicy": "no_trailing_slash"
  144 |   },
  145 |   {
  146 |     "productId": "ea-10000-pmma",
  147 |     "slug": "",
  148 |     "routeSlug": "ea-10000-pmma",
  149 |     "pumpTypeSlug": "plunger-pumps",
  150 |     "seriesSlug": "ea-standard-piston-pumps",
  151 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-pmma",
  152 |     "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
  153 |     "legacyRedirectFrom": "",
  154 |     "trailingSlashPolicy": "no_trailing_slash"
  155 |   },
  156 |   {
  157 |     "productId": "ea-10000-peek",
  158 |     "slug": "",
  159 |     "routeSlug": "ea-10000-peek",
  160 |     "pumpTypeSlug": "plunger-pumps",
  161 |     "seriesSlug": "ea-standard-piston-pumps",
  162 |     "canonicalPath": "/products/pumps/plunger-pumps/ea-10000-peek",
  163 |     "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
  164 |     "legacyRedirectFrom": "",
  165 |     "trailingSlashPolicy": "no_trailing_slash"
  166 |   },
  167 |   {
  168 |     "productId": "sm-50-pmma",
  169 |     "slug": "",
  170 |     "routeSlug": "sm-50-pmma",
  171 |     "pumpTypeSlug": "plunger-pumps",
  172 |     "seriesSlug": "sm-miniature-piston-pumps",
  173 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-50-pmma",
  174 |     "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
  175 |     "legacyRedirectFrom": "",
  176 |     "trailingSlashPolicy": "no_trailing_slash"
  177 |   },
  178 |   {
  179 |     "productId": "sm-100-pmma",
  180 |     "slug": "",
  181 |     "routeSlug": "sm-100-pmma",
  182 |     "pumpTypeSlug": "plunger-pumps",
  183 |     "seriesSlug": "sm-miniature-piston-pumps",
  184 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-100-pmma",
  185 |     "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
  186 |     "legacyRedirectFrom": "",
  187 |     "trailingSlashPolicy": "no_trailing_slash"
  188 |   },
  189 |   {
  190 |     "productId": "sm-100-peek",
  191 |     "slug": "",
  192 |     "routeSlug": "sm-100-peek",
  193 |     "pumpTypeSlug": "plunger-pumps",
  194 |     "seriesSlug": "sm-miniature-piston-pumps",
  195 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-100-peek",
  196 |     "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
  197 |     "legacyRedirectFrom": "",
  198 |     "trailingSlashPolicy": "no_trailing_slash"
  199 |   },
  200 |   {
  201 |     "productId": "sm-250-pmma",
  202 |     "slug": "",
  203 |     "routeSlug": "sm-250-pmma",
  204 |     "pumpTypeSlug": "plunger-pumps",
  205 |     "seriesSlug": "sm-miniature-piston-pumps",
  206 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-250-pmma",
  207 |     "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
  208 |     "legacyRedirectFrom": "",
  209 |     "trailingSlashPolicy": "no_trailing_slash"
  210 |   },
  211 |   {
  212 |     "productId": "sm-250-peek",
  213 |     "slug": "",
  214 |     "routeSlug": "sm-250-peek",
  215 |     "pumpTypeSlug": "plunger-pumps",
  216 |     "seriesSlug": "sm-miniature-piston-pumps",
  217 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-250-peek",
  218 |     "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
  219 |     "legacyRedirectFrom": "",
  220 |     "trailingSlashPolicy": "no_trailing_slash"
  221 |   },
  222 |   {
  223 |     "productId": "sm-500-pmma",
  224 |     "slug": "",
  225 |     "routeSlug": "sm-500-pmma",
  226 |     "pumpTypeSlug": "plunger-pumps",
  227 |     "seriesSlug": "sm-miniature-piston-pumps",
  228 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-500-pmma",
  229 |     "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
  230 |     "legacyRedirectFrom": "",
  231 |     "trailingSlashPolicy": "no_trailing_slash"
  232 |   },
  233 |   {
  234 |     "productId": "sm-1000-pmma",
  235 |     "slug": "",
  236 |     "routeSlug": "sm-1000-pmma",
  237 |     "pumpTypeSlug": "plunger-pumps",
  238 |     "seriesSlug": "sm-miniature-piston-pumps",
  239 |     "canonicalPath": "/products/pumps/plunger-pumps/sm-1000-pmma",
  240 |     "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
  241 |     "legacyRedirectFrom": "",
  242 |     "trailingSlashPolicy": "no_trailing_slash"
  243 |   },
  244 |   {
  245 |     "productId": "tm-50-pmma",
  246 |     "slug": "",
  247 |     "routeSlug": "tm-50-pmma",
  248 |     "pumpTypeSlug": "plunger-pumps",
  249 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
  250 |     "canonicalPath": "/products/pumps/plunger-pumps/tm-50-pmma",
  251 |     "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
  252 |     "legacyRedirectFrom": "",
  253 |     "trailingSlashPolicy": "no_trailing_slash"
  254 |   },
  255 |   {
  256 |     "productId": "tm-100-pmma",
  257 |     "slug": "",
  258 |     "routeSlug": "tm-100-pmma",
  259 |     "pumpTypeSlug": "plunger-pumps",
  260 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
  261 |     "canonicalPath": "/products/pumps/plunger-pumps/tm-100-pmma",
  262 |     "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
  263 |     "legacyRedirectFrom": "",
  264 |     "trailingSlashPolicy": "no_trailing_slash"
  265 |   },
  266 |   {
  267 |     "productId": "tm-250-pmma",
  268 |     "slug": "",
  269 |     "routeSlug": "tm-250-pmma",
  270 |     "pumpTypeSlug": "plunger-pumps",
  271 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
  272 |     "canonicalPath": "/products/pumps/plunger-pumps/tm-250-pmma",
  273 |     "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
  274 |     "legacyRedirectFrom": "",
  275 |     "trailingSlashPolicy": "no_trailing_slash"
  276 |   },
  277 |   {
  278 |     "productId": "tm-500-pmma",
  279 |     "slug": "",
  280 |     "routeSlug": "tm-500-pmma",
  281 |     "pumpTypeSlug": "plunger-pumps",
  282 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
  283 |     "canonicalPath": "/products/pumps/plunger-pumps/tm-500-pmma",
  284 |     "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
  285 |     "legacyRedirectFrom": "",
  286 |     "trailingSlashPolicy": "no_trailing_slash"
  287 |   }
  288 | ] as const;
```

## data\products\generated\pumps\pump-series.selection.generated.ts

```text
   12 | export const pumpSeriesSelectionCards = [
   13 |   {
   14 |     "productId": "ea-100-pmma",
   15 |     "pumpTypeSlug": "",
   16 |     "seriesSlug": "ea-standard-piston-pumps",
   17 |     "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
   18 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
   19 |     "badges": [],
   20 |     "sort": 1,
   21 |     "content": {
   22 |       "zh": {
   35 |   },
   36 |   {
   37 |     "productId": "ea-100-pmma",
   38 |     "pumpTypeSlug": "",
   39 |     "seriesSlug": "ea-standard-piston-pumps",
   40 |     "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
   41 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
   42 |     "badges": [],
   43 |     "sort": 1,
   44 |     "content": {
   45 |       "zh": {
   58 |   },
   59 |   {
   60 |     "productId": "ea-100-peek",
   61 |     "pumpTypeSlug": "",
   62 |     "seriesSlug": "ea-standard-piston-pumps",
   63 |     "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
   64 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
   65 |     "badges": [],
   66 |     "sort": 2,
   67 |     "content": {
   68 |       "zh": {
   81 |   },
   82 |   {
   83 |     "productId": "ea-100-peek",
   84 |     "pumpTypeSlug": "",
   85 |     "seriesSlug": "ea-standard-piston-pumps",
   86 |     "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
   87 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
   88 |     "badges": [],
   89 |     "sort": 2,
   90 |     "content": {
   91 |       "zh": {
  104 |   },
  105 |   {
  106 |     "productId": "ea-250-pmma",
  107 |     "pumpTypeSlug": "",
  108 |     "seriesSlug": "ea-standard-piston-pumps",
  109 |     "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
  110 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
  111 |     "badges": [],
  112 |     "sort": 3,
  113 |     "content": {
  114 |       "zh": {
  127 |   },
  128 |   {
  129 |     "productId": "ea-250-pmma",
  130 |     "pumpTypeSlug": "",
  131 |     "seriesSlug": "ea-standard-piston-pumps",
  132 |     "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
  133 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
  134 |     "badges": [],
  135 |     "sort": 3,
  136 |     "content": {
  137 |       "zh": {
  150 |   },
  151 |   {
  152 |     "productId": "ea-250-peek",
  153 |     "pumpTypeSlug": "",
  154 |     "seriesSlug": "ea-standard-piston-pumps",
  155 |     "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
  156 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
  157 |     "badges": [],
  158 |     "sort": 4,
  159 |     "content": {
  160 |       "zh": {
  173 |   },
  174 |   {
  175 |     "productId": "ea-250-peek",
  176 |     "pumpTypeSlug": "",
  177 |     "seriesSlug": "ea-standard-piston-pumps",
  178 |     "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
  179 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
  180 |     "badges": [],
  181 |     "sort": 4,
  182 |     "content": {
  183 |       "zh": {
  196 |   },
  197 |   {
  198 |     "productId": "ea-500-pmma",
  199 |     "pumpTypeSlug": "",
  200 |     "seriesSlug": "ea-standard-piston-pumps",
  201 |     "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
  202 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
  203 |     "badges": [],
  204 |     "sort": 5,
  205 |     "content": {
  206 |       "zh": {
  219 |   },
  220 |   {
  221 |     "productId": "ea-500-pmma",
  222 |     "pumpTypeSlug": "",
  223 |     "seriesSlug": "ea-standard-piston-pumps",
  224 |     "detailHref": "/products/pumps/plunger-pumps/ea-500-pmma",
  225 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
  226 |     "badges": [],
  227 |     "sort": 5,
  228 |     "content": {
  229 |       "zh": {
  242 |   },
  243 |   {
  244 |     "productId": "ea-500-peek",
  245 |     "pumpTypeSlug": "",
  246 |     "seriesSlug": "ea-standard-piston-pumps",
  247 |     "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
  248 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
  249 |     "badges": [],
  250 |     "sort": 6,
  251 |     "content": {
  252 |       "zh": {
  265 |   },
  266 |   {
  267 |     "productId": "ea-500-peek",
  268 |     "pumpTypeSlug": "",
  269 |     "seriesSlug": "ea-standard-piston-pumps",
  270 |     "detailHref": "/products/pumps/plunger-pumps/ea-500-peek",
  271 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
  272 |     "badges": [],
  273 |     "sort": 6,
  274 |     "content": {
  275 |       "zh": {
  288 |   },
  289 |   {
  290 |     "productId": "ea-1000-pmma",
  291 |     "pumpTypeSlug": "",
  292 |     "seriesSlug": "ea-standard-piston-pumps",
  293 |     "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
  294 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
  295 |     "badges": [],
  296 |     "sort": 7,
  297 |     "content": {
  298 |       "zh": {
  311 |   },
  312 |   {
  313 |     "productId": "ea-1000-pmma",
  314 |     "pumpTypeSlug": "",
  315 |     "seriesSlug": "ea-standard-piston-pumps",
  316 |     "detailHref": "/products/pumps/plunger-pumps/ea-1000-pmma",
  317 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
  318 |     "badges": [],
  319 |     "sort": 7,
  320 |     "content": {
  321 |       "zh": {
  334 |   },
  335 |   {
  336 |     "productId": "ea-1000-peek",
  337 |     "pumpTypeSlug": "",
  338 |     "seriesSlug": "ea-standard-piston-pumps",
  339 |     "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
  340 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
  341 |     "badges": [],
  342 |     "sort": 8,
  343 |     "content": {
  344 |       "zh": {
  357 |   },
  358 |   {
  359 |     "productId": "ea-1000-peek",
  360 |     "pumpTypeSlug": "",
  361 |     "seriesSlug": "ea-standard-piston-pumps",
  362 |     "detailHref": "/products/pumps/plunger-pumps/ea-1000-peek",
  363 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
  364 |     "badges": [],
  365 |     "sort": 8,
  366 |     "content": {
  367 |       "zh": {
  380 |   },
  381 |   {
  382 |     "productId": "ea-2500-pmma",
  383 |     "pumpTypeSlug": "",
  384 |     "seriesSlug": "ea-standard-piston-pumps",
  385 |     "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
  386 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
  387 |     "badges": [],
  388 |     "sort": 9,
  389 |     "content": {
  390 |       "zh": {
  403 |   },
  404 |   {
  405 |     "productId": "ea-2500-pmma",
  406 |     "pumpTypeSlug": "",
  407 |     "seriesSlug": "ea-standard-piston-pumps",
  408 |     "detailHref": "/products/pumps/plunger-pumps/ea-2500-pmma",
  409 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
  410 |     "badges": [],
  411 |     "sort": 9,
  412 |     "content": {
  413 |       "zh": {
  426 |   },
  427 |   {
  428 |     "productId": "ea-2500-peek",
  429 |     "pumpTypeSlug": "",
  430 |     "seriesSlug": "ea-standard-piston-pumps",
  431 |     "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
  432 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
  433 |     "badges": [],
  434 |     "sort": 10,
  435 |     "content": {
  436 |       "zh": {
  449 |   },
  450 |   {
  451 |     "productId": "ea-2500-peek",
  452 |     "pumpTypeSlug": "",
  453 |     "seriesSlug": "ea-standard-piston-pumps",
  454 |     "detailHref": "/products/pumps/plunger-pumps/ea-2500-peek",
  455 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
  456 |     "badges": [],
  457 |     "sort": 10,
  458 |     "content": {
  459 |       "zh": {
  472 |   },
  473 |   {
  474 |     "productId": "ea-5000-pmma",
  475 |     "pumpTypeSlug": "",
  476 |     "seriesSlug": "ea-standard-piston-pumps",
  477 |     "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
  478 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
  479 |     "badges": [],
  480 |     "sort": 11,
  481 |     "content": {
  482 |       "zh": {
  495 |   },
  496 |   {
  497 |     "productId": "ea-5000-pmma",
  498 |     "pumpTypeSlug": "",
  499 |     "seriesSlug": "ea-standard-piston-pumps",
  500 |     "detailHref": "/products/pumps/plunger-pumps/ea-5000-pmma",
  501 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
  502 |     "badges": [],
  503 |     "sort": 11,
  504 |     "content": {
  505 |       "zh": {
  518 |   },
  519 |   {
  520 |     "productId": "ea-5000-peek",
  521 |     "pumpTypeSlug": "",
  522 |     "seriesSlug": "ea-standard-piston-pumps",
  523 |     "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
  524 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
  525 |     "badges": [],
  526 |     "sort": 12,
  527 |     "content": {
  528 |       "zh": {
  541 |   },
  542 |   {
  543 |     "productId": "ea-5000-peek",
  544 |     "pumpTypeSlug": "",
  545 |     "seriesSlug": "ea-standard-piston-pumps",
  546 |     "detailHref": "/products/pumps/plunger-pumps/ea-5000-peek",
  547 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
  548 |     "badges": [],
  549 |     "sort": 12,
  550 |     "content": {
  551 |       "zh": {
  564 |   },
  565 |   {
  566 |     "productId": "ea-10000-pmma",
  567 |     "pumpTypeSlug": "",
  568 |     "seriesSlug": "ea-standard-piston-pumps",
  569 |     "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
  570 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
  571 |     "badges": [],
  572 |     "sort": 13,
  573 |     "content": {
  574 |       "zh": {
  587 |   },
  588 |   {
  589 |     "productId": "ea-10000-pmma",
  590 |     "pumpTypeSlug": "",
  591 |     "seriesSlug": "ea-standard-piston-pumps",
  592 |     "detailHref": "/products/pumps/plunger-pumps/ea-10000-pmma",
  593 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
  594 |     "badges": [],
  595 |     "sort": 13,
  596 |     "content": {
  597 |       "zh": {
  610 |   },
  611 |   {
  612 |     "productId": "ea-10000-peek",
  613 |     "pumpTypeSlug": "",
  614 |     "seriesSlug": "ea-standard-piston-pumps",
  615 |     "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
  616 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
  617 |     "badges": [],
  618 |     "sort": 14,
  619 |     "content": {
  620 |       "zh": {
  633 |   },
  634 |   {
  635 |     "productId": "ea-10000-peek",
  636 |     "pumpTypeSlug": "",
  637 |     "seriesSlug": "ea-standard-piston-pumps",
  638 |     "detailHref": "/products/pumps/plunger-pumps/ea-10000-peek",
  639 |     "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
  640 |     "badges": [],
  641 |     "sort": 14,
  642 |     "content": {
  643 |       "zh": {
  656 |   },
  657 |   {
  658 |     "productId": "sm-50-pmma",
  659 |     "pumpTypeSlug": "",
  660 |     "seriesSlug": "sm-miniature-piston-pumps",
  661 |     "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
  662 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
  663 |     "badges": [],
  664 |     "sort": 15,
  665 |     "content": {
  666 |       "zh": {
  679 |   },
  680 |   {
  681 |     "productId": "sm-50-pmma",
  682 |     "pumpTypeSlug": "",
  683 |     "seriesSlug": "sm-miniature-piston-pumps",
  684 |     "detailHref": "/products/pumps/plunger-pumps/sm-50-pmma",
  685 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
  686 |     "badges": [],
  687 |     "sort": 15,
  688 |     "content": {
  689 |       "zh": {
  702 |   },
  703 |   {
  704 |     "productId": "sm-100-pmma",
  705 |     "pumpTypeSlug": "",
  706 |     "seriesSlug": "sm-miniature-piston-pumps",
  707 |     "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
  708 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
  709 |     "badges": [],
  710 |     "sort": 16,
  711 |     "content": {
  712 |       "zh": {
  725 |   },
  726 |   {
  727 |     "productId": "sm-100-pmma",
  728 |     "pumpTypeSlug": "",
  729 |     "seriesSlug": "sm-miniature-piston-pumps",
  730 |     "detailHref": "/products/pumps/plunger-pumps/sm-100-pmma",
  731 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
  732 |     "badges": [],
  733 |     "sort": 16,
  734 |     "content": {
  735 |       "zh": {
  748 |   },
  749 |   {
  750 |     "productId": "sm-100-peek",
  751 |     "pumpTypeSlug": "",
  752 |     "seriesSlug": "sm-miniature-piston-pumps",
  753 |     "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
  754 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
  755 |     "badges": [],
  756 |     "sort": 17,
  757 |     "content": {
  758 |       "zh": {
  771 |   },
  772 |   {
  773 |     "productId": "sm-100-peek",
  774 |     "pumpTypeSlug": "",
  775 |     "seriesSlug": "sm-miniature-piston-pumps",
  776 |     "detailHref": "/products/pumps/plunger-pumps/sm-100-peek",
  777 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
  778 |     "badges": [],
  779 |     "sort": 17,
  780 |     "content": {
  781 |       "zh": {
  794 |   },
  795 |   {
  796 |     "productId": "sm-250-pmma",
  797 |     "pumpTypeSlug": "",
  798 |     "seriesSlug": "sm-miniature-piston-pumps",
  799 |     "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
  800 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
  801 |     "badges": [],
  802 |     "sort": 18,
  803 |     "content": {
  804 |       "zh": {
  817 |   },
  818 |   {
  819 |     "productId": "sm-250-pmma",
  820 |     "pumpTypeSlug": "",
  821 |     "seriesSlug": "sm-miniature-piston-pumps",
  822 |     "detailHref": "/products/pumps/plunger-pumps/sm-250-pmma",
  823 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
  824 |     "badges": [],
  825 |     "sort": 18,
  826 |     "content": {
  827 |       "zh": {
  840 |   },
  841 |   {
  842 |     "productId": "sm-250-peek",
  843 |     "pumpTypeSlug": "",
  844 |     "seriesSlug": "sm-miniature-piston-pumps",
  845 |     "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
  846 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
  847 |     "badges": [],
  848 |     "sort": 19,
  849 |     "content": {
  850 |       "zh": {
  863 |   },
  864 |   {
  865 |     "productId": "sm-250-peek",
  866 |     "pumpTypeSlug": "",
  867 |     "seriesSlug": "sm-miniature-piston-pumps",
  868 |     "detailHref": "/products/pumps/plunger-pumps/sm-250-peek",
  869 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
  870 |     "badges": [],
  871 |     "sort": 19,
  872 |     "content": {
  873 |       "zh": {
  886 |   },
  887 |   {
  888 |     "productId": "sm-500-pmma",
  889 |     "pumpTypeSlug": "",
  890 |     "seriesSlug": "sm-miniature-piston-pumps",
  891 |     "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
  892 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
  893 |     "badges": [],
  894 |     "sort": 20,
  895 |     "content": {
  896 |       "zh": {
  909 |   },
  910 |   {
  911 |     "productId": "sm-500-pmma",
  912 |     "pumpTypeSlug": "",
  913 |     "seriesSlug": "sm-miniature-piston-pumps",
  914 |     "detailHref": "/products/pumps/plunger-pumps/sm-500-pmma",
  915 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
  916 |     "badges": [],
  917 |     "sort": 20,
  918 |     "content": {
  919 |       "zh": {
  932 |   },
  933 |   {
  934 |     "productId": "sm-1000-pmma",
  935 |     "pumpTypeSlug": "",
  936 |     "seriesSlug": "sm-miniature-piston-pumps",
  937 |     "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
  938 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
  939 |     "badges": [],
  940 |     "sort": 21,
  941 |     "content": {
  942 |       "zh": {
  955 |   },
  956 |   {
  957 |     "productId": "sm-1000-pmma",
  958 |     "pumpTypeSlug": "",
  959 |     "seriesSlug": "sm-miniature-piston-pumps",
  960 |     "detailHref": "/products/pumps/plunger-pumps/sm-1000-pmma",
  961 |     "cardImage": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
  962 |     "badges": [],
  963 |     "sort": 21,
  964 |     "content": {
  965 |       "zh": {
  978 |   },
  979 |   {
  980 |     "productId": "tm-50-pmma",
  981 |     "pumpTypeSlug": "",
  982 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
  983 |     "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
  984 |     "cardImage": "/images/products/common/product-placeholder.svg",
  985 |     "badges": [],
  986 |     "sort": 22,
  987 |     "content": {
  988 |       "zh": {
 1001 |   },
 1002 |   {
 1003 |     "productId": "tm-50-pmma",
 1004 |     "pumpTypeSlug": "",
 1005 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1006 |     "detailHref": "/products/pumps/plunger-pumps/tm-50-pmma",
 1007 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1008 |     "badges": [],
 1009 |     "sort": 22,
 1010 |     "content": {
 1011 |       "zh": {
 1024 |   },
 1025 |   {
 1026 |     "productId": "tm-100-pmma",
 1027 |     "pumpTypeSlug": "",
 1028 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1029 |     "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
 1030 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1031 |     "badges": [],
 1032 |     "sort": 23,
 1033 |     "content": {
 1034 |       "zh": {
 1047 |   },
 1048 |   {
 1049 |     "productId": "tm-100-pmma",
 1050 |     "pumpTypeSlug": "",
 1051 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1052 |     "detailHref": "/products/pumps/plunger-pumps/tm-100-pmma",
 1053 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1054 |     "badges": [],
 1055 |     "sort": 23,
 1056 |     "content": {
 1057 |       "zh": {
 1070 |   },
 1071 |   {
 1072 |     "productId": "tm-250-pmma",
 1073 |     "pumpTypeSlug": "",
 1074 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1075 |     "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
 1076 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1077 |     "badges": [],
 1078 |     "sort": 24,
 1079 |     "content": {
 1080 |       "zh": {
 1093 |   },
 1094 |   {
 1095 |     "productId": "tm-250-pmma",
 1096 |     "pumpTypeSlug": "",
 1097 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1098 |     "detailHref": "/products/pumps/plunger-pumps/tm-250-pmma",
 1099 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1100 |     "badges": [],
 1101 |     "sort": 24,
 1102 |     "content": {
 1103 |       "zh": {
 1116 |   },
 1117 |   {
 1118 |     "productId": "tm-500-pmma",
 1119 |     "pumpTypeSlug": "",
 1120 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1121 |     "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
 1122 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1123 |     "badges": [],
 1124 |     "sort": 25,
 1125 |     "content": {
 1126 |       "zh": {
 1139 |   },
 1140 |   {
 1141 |     "productId": "tm-500-pmma",
 1142 |     "pumpTypeSlug": "",
 1143 |     "seriesSlug": "tm-ultra-compact-piston-pumps",
 1144 |     "detailHref": "/products/pumps/plunger-pumps/tm-500-pmma",
 1145 |     "cardImage": "/images/products/common/product-placeholder.svg",
 1146 |     "badges": [],
 1147 |     "sort": 25,
 1148 |     "content": {
 1149 |       "zh": {
```

## data\products\selection\barbed-fitting-selection.generated.ts

```text
   55 |     ],
   56 |     "materialCode": "PP",
   57 |     "colorCode": "N",
   58 |     "imageCard": "/images/logo/foreach-logo-color.svg",
   59 |     "detailSlug": "barbed-fittings",
   60 |     "detailHref": "/products/fittings/barbed-fittings",
   61 |     "status": "active",
   62 |     "sourceIndex": 0,
   63 |     "sortOrder": 10000,
   64 |     "searchKeywords": {
   65 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色",
  113 |     ],
  114 |     "materialCode": "PP",
  115 |     "colorCode": "N",
  116 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  117 |     "detailSlug": "barbed-fittings",
  118 |     "detailHref": "/products/fittings/barbed-fittings",
  119 |     "status": "active",
  120 |     "sourceIndex": 1,
  121 |     "sortOrder": 10001,
  122 |     "searchKeywords": {
  123 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24F-PP-N 809277 2.4 mm 2.4 mm PP 本色",
  171 |     ],
  172 |     "materialCode": "PP",
  173 |     "colorCode": "N",
  174 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  175 |     "detailSlug": "barbed-fittings",
  176 |     "detailHref": "/products/fittings/barbed-fittings",
  177 |     "status": "active",
  178 |     "sourceIndex": 2,
  179 |     "sortOrder": 10002,
  180 |     "searchKeywords": {
  181 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32F-PP-N 809278 3.2 mm 3.2 mm PP 本色",
  229 |     ],
  230 |     "materialCode": "PP",
  231 |     "colorCode": "N",
  232 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  233 |     "detailSlug": "barbed-fittings",
  234 |     "detailHref": "/products/fittings/barbed-fittings",
  235 |     "status": "active",
  236 |     "sourceIndex": 3,
  237 |     "sortOrder": 10003,
  238 |     "searchKeywords": {
  239 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-40F-PP-N 809279 4.0 mm 4.0 mm PP 本色",
  287 |     ],
  288 |     "materialCode": "PP",
  289 |     "colorCode": "N",
  290 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  291 |     "detailSlug": "barbed-fittings",
  292 |     "detailHref": "/products/fittings/barbed-fittings",
  293 |     "status": "active",
  294 |     "sourceIndex": 4,
  295 |     "sortOrder": 10004,
  296 |     "searchKeywords": {
  297 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-24F-PP-N 809288 1.6 mm 2.4 mm PP 本色",
  345 |     ],
  346 |     "materialCode": "PP",
  347 |     "colorCode": "N",
  348 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  349 |     "detailSlug": "barbed-fittings",
  350 |     "detailHref": "/products/fittings/barbed-fittings",
  351 |     "status": "active",
  352 |     "sourceIndex": 5,
  353 |     "sortOrder": 10005,
  354 |     "searchKeywords": {
  355 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24F-32F-PP-N 809289 2.4 mm 3.2 mm PP 本色",
  403 |     ],
  404 |     "materialCode": "PA",
  405 |     "colorCode": "W",
  406 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  407 |     "detailSlug": "barbed-fittings",
  408 |     "detailHref": "/products/fittings/barbed-fittings",
  409 |     "status": "active",
  410 |     "sourceIndex": 6,
  411 |     "sortOrder": 10006,
  412 |     "searchKeywords": {
  413 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-PA-W 809321 1.6 mm 1.6 mm PA 白色",
  461 |     ],
  462 |     "materialCode": "PA",
  463 |     "colorCode": "W",
  464 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  465 |     "detailSlug": "barbed-fittings",
  466 |     "detailHref": "/products/fittings/barbed-fittings",
  467 |     "status": "active",
  468 |     "sourceIndex": 7,
  469 |     "sortOrder": 10007,
  470 |     "searchKeywords": {
  471 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-24F-PA-W 809322 1.6 mm 2.4 mm PA 白色",
  519 |     ],
  520 |     "materialCode": "PA",
  521 |     "colorCode": "W",
  522 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  523 |     "detailSlug": "barbed-fittings",
  524 |     "detailHref": "/products/fittings/barbed-fittings",
  525 |     "status": "active",
  526 |     "sourceIndex": 8,
  527 |     "sortOrder": 10008,
  528 |     "searchKeywords": {
  529 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24F-PA-W 809324 2.4 mm 2.4 mm PA 白色",
  577 |     ],
  578 |     "materialCode": "PA",
  579 |     "colorCode": "W",
  580 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  581 |     "detailSlug": "barbed-fittings",
  582 |     "detailHref": "/products/fittings/barbed-fittings",
  583 |     "status": "active",
  584 |     "sourceIndex": 9,
  585 |     "sortOrder": 10009,
  586 |     "searchKeywords": {
  587 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24F-32F-PA-W 809325 2.4 mm 3.2 mm PA 白色",
  635 |     ],
  636 |     "materialCode": "PA",
  637 |     "colorCode": "W",
  638 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  639 |     "detailSlug": "barbed-fittings",
  640 |     "detailHref": "/products/fittings/barbed-fittings",
  641 |     "status": "active",
  642 |     "sourceIndex": 10,
  643 |     "sortOrder": 10010,
  644 |     "searchKeywords": {
  645 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32F-PA-W 809328 3.2 mm 3.2 mm PA 白色",
  693 |     ],
  694 |     "materialCode": "PA",
  695 |     "colorCode": "W",
  696 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  697 |     "detailSlug": "barbed-fittings",
  698 |     "detailHref": "/products/fittings/barbed-fittings",
  699 |     "status": "active",
  700 |     "sourceIndex": 11,
  701 |     "sortOrder": 10011,
  702 |     "searchKeywords": {
  703 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-40F-PA-W 809329 4.0 mm 4.0 mm PA 白色",
  751 |     ],
  752 |     "materialCode": "PP",
  753 |     "colorCode": "N",
  754 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  755 |     "detailSlug": "barbed-fittings",
  756 |     "detailHref": "/products/fittings/barbed-fittings",
  757 |     "status": "active",
  758 |     "sourceIndex": 12,
  759 |     "sortOrder": 10012,
  760 |     "searchKeywords": {
  761 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-32F-PP-N 809330 1.6 mm 3.2 mm PP 本色",
  809 |     ],
  810 |     "materialCode": "PA",
  811 |     "colorCode": "W",
  812 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  813 |     "detailSlug": "barbed-fittings",
  814 |     "detailHref": "/products/fittings/barbed-fittings",
  815 |     "status": "active",
  816 |     "sourceIndex": 13,
  817 |     "sortOrder": 10013,
  818 |     "searchKeywords": {
  819 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-32F-PA-W 809332 1.6 mm 3.2 mm PA 白色",
  867 |     ],
  868 |     "materialCode": "PA",
  869 |     "colorCode": "W",
  870 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  871 |     "detailSlug": "barbed-fittings",
  872 |     "detailHref": "/products/fittings/barbed-fittings",
  873 |     "status": "active",
  874 |     "sourceIndex": 14,
  875 |     "sortOrder": 10014,
  876 |     "searchKeywords": {
  877 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32C-64C-PA-W 809371 3.2 mm 6.4 mm PA 白色",
  925 |     ],
  926 |     "materialCode": "PP",
  927 |     "colorCode": "N",
  928 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  929 |     "detailSlug": "barbed-fittings",
  930 |     "detailHref": "/products/fittings/barbed-fittings",
  931 |     "status": "active",
  932 |     "sourceIndex": 15,
  933 |     "sortOrder": 10015,
  934 |     "searchKeywords": {
  935 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32C-64C-PP-N 809370 3.2 mm 6.4 mm PP 本色",
  983 |     ],
  984 |     "materialCode": "PP",
  985 |     "colorCode": "N",
  986 |     "imageCard": "/images/logo/foreach-logo-color.svg",
  987 |     "detailSlug": "barbed-fittings",
  988 |     "detailHref": "/products/fittings/barbed-fittings",
  989 |     "status": "active",
  990 |     "sourceIndex": 16,
  991 |     "sortOrder": 10016,
  992 |     "searchKeywords": {
  993 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32V-40V-PP-N 809374 3.2 mm 4.0 mm PP 本色",
 1041 |     ],
 1042 |     "materialCode": "PA",
 1043 |     "colorCode": "W",
 1044 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1045 |     "detailSlug": "barbed-fittings",
 1046 |     "detailHref": "/products/fittings/barbed-fittings",
 1047 |     "status": "active",
 1048 |     "sourceIndex": 17,
 1049 |     "sortOrder": 10017,
 1050 |     "searchKeywords": {
 1051 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32V-40V-PA-W 809375 3.2 mm 4.0 mm PA 白色",
 1099 |     ],
 1100 |     "materialCode": "PP",
 1101 |     "colorCode": "N",
 1102 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1103 |     "detailSlug": "barbed-fittings",
 1104 |     "detailHref": "/products/fittings/barbed-fittings",
 1105 |     "status": "active",
 1106 |     "sourceIndex": 18,
 1107 |     "sortOrder": 10018,
 1108 |     "searchKeywords": {
 1109 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24V-40V-PP-N 809376 2.4 mm 4.0 mm PP 本色",
 1157 |     ],
 1158 |     "materialCode": "PA",
 1159 |     "colorCode": "W",
 1160 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1161 |     "detailSlug": "barbed-fittings",
 1162 |     "detailHref": "/products/fittings/barbed-fittings",
 1163 |     "status": "active",
 1164 |     "sourceIndex": 19,
 1165 |     "sortOrder": 10019,
 1166 |     "searchKeywords": {
 1167 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24V-40V-PA-W 809377 2.4 mm 4.0 mm PA 白色",
 1215 |     ],
 1216 |     "materialCode": "PP",
 1217 |     "colorCode": "N",
 1218 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1219 |     "detailSlug": "barbed-fittings",
 1220 |     "detailHref": "/products/fittings/barbed-fittings",
 1221 |     "status": "active",
 1222 |     "sourceIndex": 20,
 1223 |     "sortOrder": 10020,
 1224 |     "searchKeywords": {
 1225 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64V-79V-PP-N 809378 6.4 mm 7.9 mm PP 本色",
 1273 |     ],
 1274 |     "materialCode": "PA",
 1275 |     "colorCode": "W",
 1276 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1277 |     "detailSlug": "barbed-fittings",
 1278 |     "detailHref": "/products/fittings/barbed-fittings",
 1279 |     "status": "active",
 1280 |     "sourceIndex": 21,
 1281 |     "sortOrder": 10021,
 1282 |     "searchKeywords": {
 1283 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64V-79V-PA-W 809379 6.4 mm 7.9 mm PA 白色",
 1331 |     ],
 1332 |     "materialCode": "PP",
 1333 |     "colorCode": "N",
 1334 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1335 |     "detailSlug": "barbed-fittings",
 1336 |     "detailHref": "/products/fittings/barbed-fittings",
 1337 |     "status": "active",
 1338 |     "sourceIndex": 22,
 1339 |     "sortOrder": 10022,
 1340 |     "searchKeywords": {
 1341 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64C-PP-N 809424 6.4 mm 6.4 mm PP 本色",
 1389 |     ],
 1390 |     "materialCode": "PA",
 1391 |     "colorCode": "W",
 1392 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1393 |     "detailSlug": "barbed-fittings",
 1394 |     "detailHref": "/products/fittings/barbed-fittings",
 1395 |     "status": "active",
 1396 |     "sourceIndex": 23,
 1397 |     "sortOrder": 10023,
 1398 |     "searchKeywords": {
 1399 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64C-PA-W 809425 6.4 mm 6.4 mm PA 白色",
 1447 |     ],
 1448 |     "materialCode": "PP",
 1449 |     "colorCode": "N",
 1450 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1451 |     "detailSlug": "barbed-fittings",
 1452 |     "detailHref": "/products/fittings/barbed-fittings",
 1453 |     "status": "active",
 1454 |     "sourceIndex": 24,
 1455 |     "sortOrder": 10024,
 1456 |     "searchKeywords": {
 1457 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64V-95V-PP-N 809426 6.4 mm 9.5 mm PP 本色",
 1505 |     ],
 1506 |     "materialCode": "PA",
 1507 |     "colorCode": "W",
 1508 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1509 |     "detailSlug": "barbed-fittings",
 1510 |     "detailHref": "/products/fittings/barbed-fittings",
 1511 |     "status": "active",
 1512 |     "sourceIndex": 25,
 1513 |     "sortOrder": 10025,
 1514 |     "searchKeywords": {
 1515 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64V-95V-PA-W 809427 6.4 mm 9.5 mm PA 白色",
 1563 |     ],
 1564 |     "materialCode": "PP",
 1565 |     "colorCode": "N",
 1566 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1567 |     "detailSlug": "barbed-fittings",
 1568 |     "detailHref": "/products/fittings/barbed-fittings",
 1569 |     "status": "active",
 1570 |     "sourceIndex": 26,
 1571 |     "sortOrder": 10026,
 1572 |     "searchKeywords": {
 1573 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64X-127X-PP-N 809428 6.4 mm 12.7 mm PP 本色",
 1621 |     ],
 1622 |     "materialCode": "PA",
 1623 |     "colorCode": "W",
 1624 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1625 |     "detailSlug": "barbed-fittings",
 1626 |     "detailHref": "/products/fittings/barbed-fittings",
 1627 |     "status": "active",
 1628 |     "sourceIndex": 27,
 1629 |     "sortOrder": 10027,
 1630 |     "searchKeywords": {
 1631 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-64X-127X-PA-W 809429 6.4 mm 12.7 mm PA 白色",
 1679 |     ],
 1680 |     "materialCode": "PP",
 1681 |     "colorCode": "N",
 1682 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1683 |     "detailSlug": "barbed-fittings",
 1684 |     "detailHref": "/products/fittings/barbed-fittings",
 1685 |     "status": "active",
 1686 |     "sourceIndex": 28,
 1687 |     "sortOrder": 10028,
 1688 |     "searchKeywords": {
 1689 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16C-PP-N 809547 1.6 mm 1.6 mm PP 本色",
 1737 |     ],
 1738 |     "materialCode": "PP",
 1739 |     "colorCode": "N",
 1740 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1741 |     "detailSlug": "barbed-fittings",
 1742 |     "detailHref": "/products/fittings/barbed-fittings",
 1743 |     "status": "active",
 1744 |     "sourceIndex": 29,
 1745 |     "sortOrder": 10029,
 1746 |     "searchKeywords": {
 1747 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16D-24D-PP-N 809604 1.6 mm 2.4 mm PP 本色",
 1795 |     ],
 1796 |     "materialCode": "PA",
 1797 |     "colorCode": "W",
 1798 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1799 |     "detailSlug": "barbed-fittings",
 1800 |     "detailHref": "/products/fittings/barbed-fittings",
 1801 |     "status": "active",
 1802 |     "sourceIndex": 30,
 1803 |     "sortOrder": 10030,
 1804 |     "searchKeywords": {
 1805 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16D-24D-PA-W 809605 1.6 mm 2.4 mm PA 白色",
 1853 |     ],
 1854 |     "materialCode": "PP",
 1855 |     "colorCode": "N",
 1856 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1857 |     "detailSlug": "barbed-fittings",
 1858 |     "detailHref": "/products/fittings/barbed-fittings",
 1859 |     "status": "active",
 1860 |     "sourceIndex": 31,
 1861 |     "sortOrder": 10031,
 1862 |     "searchKeywords": {
 1863 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24D-32D-PP-N 809606 2.4 mm 3.2 mm PP 本色",
 1911 |     ],
 1912 |     "materialCode": "PA",
 1913 |     "colorCode": "W",
 1914 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1915 |     "detailSlug": "barbed-fittings",
 1916 |     "detailHref": "/products/fittings/barbed-fittings",
 1917 |     "status": "active",
 1918 |     "sourceIndex": 32,
 1919 |     "sortOrder": 10032,
 1920 |     "searchKeywords": {
 1921 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24D-32D-PA-W 809607 2.4 mm 3.2 mm PA 白色",
 1969 |     ],
 1970 |     "materialCode": "PP",
 1971 |     "colorCode": "N",
 1972 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 1973 |     "detailSlug": "barbed-fittings",
 1974 |     "detailHref": "/products/fittings/barbed-fittings",
 1975 |     "status": "active",
 1976 |     "sourceIndex": 33,
 1977 |     "sortOrder": 10033,
 1978 |     "searchKeywords": {
 1979 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24D-PP-N 809625 2.4 mm 2.4 mm PP 本色",
 2027 |     ],
 2028 |     "materialCode": "PA",
 2029 |     "colorCode": "W",
 2030 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2031 |     "detailSlug": "barbed-fittings",
 2032 |     "detailHref": "/products/fittings/barbed-fittings",
 2033 |     "status": "active",
 2034 |     "sourceIndex": 34,
 2035 |     "sortOrder": 10034,
 2036 |     "searchKeywords": {
 2037 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24D-PA-W 809626 2.4 mm 2.4 mm PA 白色",
 2085 |     ],
 2086 |     "materialCode": "PP",
 2087 |     "colorCode": "N",
 2088 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2089 |     "detailSlug": "barbed-fittings",
 2090 |     "detailHref": "/products/fittings/barbed-fittings",
 2091 |     "status": "active",
 2092 |     "sourceIndex": 35,
 2093 |     "sortOrder": 10035,
 2094 |     "searchKeywords": {
 2095 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32D-PP-N 809627 3.2 mm 3.2 mm PP 本色",
 2143 |     ],
 2144 |     "materialCode": "PA",
 2145 |     "colorCode": "W",
 2146 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2147 |     "detailSlug": "barbed-fittings",
 2148 |     "detailHref": "/products/fittings/barbed-fittings",
 2149 |     "status": "active",
 2150 |     "sourceIndex": 36,
 2151 |     "sortOrder": 10036,
 2152 |     "searchKeywords": {
 2153 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32D-PA-W 809628 3.2 mm 3.2 mm PA 白色",
 2201 |     ],
 2202 |     "materialCode": "PP",
 2203 |     "colorCode": "N",
 2204 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2205 |     "detailSlug": "barbed-fittings",
 2206 |     "detailHref": "/products/fittings/barbed-fittings",
 2207 |     "status": "active",
 2208 |     "sourceIndex": 37,
 2209 |     "sortOrder": 10037,
 2210 |     "searchKeywords": {
 2211 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16D-32D-PP-N 809629 1.6 mm 3.2 mm PP 本色",
 2259 |     ],
 2260 |     "materialCode": "PA",
 2261 |     "colorCode": "W",
 2262 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2263 |     "detailSlug": "barbed-fittings",
 2264 |     "detailHref": "/products/fittings/barbed-fittings",
 2265 |     "status": "active",
 2266 |     "sourceIndex": 38,
 2267 |     "sortOrder": 10038,
 2268 |     "searchKeywords": {
 2269 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16D-32D-PA-W 809630 1.6 mm 3.2 mm PA 白色",
 2317 |     ],
 2318 |     "materialCode": "PA",
 2319 |     "colorCode": "W",
 2320 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2321 |     "detailSlug": "barbed-fittings",
 2322 |     "detailHref": "/products/fittings/barbed-fittings",
 2323 |     "status": "active",
 2324 |     "sourceIndex": 39,
 2325 |     "sortOrder": 10039,
 2326 |     "searchKeywords": {
 2327 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16C-PA-W 809300 1.6 mm 1.6 mm PA 白色",
 2375 |     ],
 2376 |     "materialCode": "PV",
 2377 |     "colorCode": "N",
 2378 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2379 |     "detailSlug": "barbed-fittings",
 2380 |     "detailHref": "/products/fittings/barbed-fittings",
 2381 |     "status": "active",
 2382 |     "sourceIndex": 40,
 2383 |     "sortOrder": 10040,
 2384 |     "searchKeywords": {
 2385 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-24F-PV-N 809788 1.6 mm 2.4 mm PVDF 本色",
 2433 |     ],
 2434 |     "materialCode": "PP",
 2435 |     "colorCode": "N",
 2436 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2437 |     "detailSlug": "barbed-fittings",
 2438 |     "detailHref": "/products/fittings/barbed-fittings",
 2439 |     "status": "active",
 2440 |     "sourceIndex": 41,
 2441 |     "sortOrder": 10041,
 2442 |     "searchKeywords": {
 2443 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24C-48C-PP-N 809519 2.4 mm 4.8 mm PP 本色",
 2491 |     ],
 2492 |     "materialCode": "PA",
 2493 |     "colorCode": "W",
 2494 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2495 |     "detailSlug": "barbed-fittings",
 2496 |     "detailHref": "/products/fittings/barbed-fittings",
 2497 |     "status": "active",
 2498 |     "sourceIndex": 42,
 2499 |     "sortOrder": 10042,
 2500 |     "searchKeywords": {
 2501 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24C-48C-PA-W 809520 2.4 mm 4.8 mm PA 白色",
 2549 |     ],
 2550 |     "materialCode": "PA",
 2551 |     "colorCode": "W",
 2552 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2553 |     "detailSlug": "barbed-fittings",
 2554 |     "detailHref": "/products/fittings/barbed-fittings",
 2555 |     "status": "active",
 2556 |     "sourceIndex": 43,
 2557 |     "sortOrder": 10043,
 2558 |     "searchKeywords": {
 2559 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16V-40V-PA-W 809843 1.6 mm 4.0 mm PA 白色",
 2607 |     ],
 2608 |     "materialCode": "PP",
 2609 |     "colorCode": "N",
 2610 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2611 |     "detailSlug": "barbed-fittings",
 2612 |     "detailHref": "/products/fittings/barbed-fittings",
 2613 |     "status": "active",
 2614 |     "sourceIndex": 44,
 2615 |     "sortOrder": 10044,
 2616 |     "searchKeywords": {
 2617 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-16V-40V-PP-N 809854 1.6 mm 4.0 mm PP 本色",
 2665 |     ],
 2666 |     "materialCode": "PP",
 2667 |     "colorCode": "N",
 2668 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2669 |     "detailSlug": "barbed-fittings",
 2670 |     "detailHref": "/products/fittings/barbed-fittings",
 2671 |     "status": "active",
 2672 |     "sourceIndex": 45,
 2673 |     "sortOrder": 10045,
 2674 |     "searchKeywords": {
 2675 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-40D-64D-PP-N 809862 4.0 mm 6.4 mm PP 本色",
 2723 |     ],
 2724 |     "materialCode": "PP",
 2725 |     "colorCode": "N",
 2726 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2727 |     "detailSlug": "barbed-fittings",
 2728 |     "detailHref": "/products/fittings/barbed-fittings",
 2729 |     "status": "active",
 2730 |     "sourceIndex": 46,
 2731 |     "sortOrder": 10046,
 2732 |     "searchKeywords": {
 2733 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-40-64-PP-N 806037 4.0 mm 6.4 mm PP 本色",
 2781 |     ],
 2782 |     "materialCode": "PP",
 2783 |     "colorCode": "N",
 2784 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2785 |     "detailSlug": "barbed-fittings",
 2786 |     "detailHref": "/products/fittings/barbed-fittings",
 2787 |     "status": "active",
 2788 |     "sourceIndex": 47,
 2789 |     "sortOrder": 10047,
 2790 |     "searchKeywords": {
 2791 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32-95-PP-N 806148 3.2 mm 9.5 mm PP 本色",
 2839 |     ],
 2840 |     "materialCode": "PP",
 2841 |     "colorCode": "N",
 2842 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2843 |     "detailSlug": "barbed-fittings",
 2844 |     "detailHref": "/products/fittings/barbed-fittings",
 2845 |     "status": "active",
 2846 |     "sourceIndex": 48,
 2847 |     "sortOrder": 10048,
 2848 |     "searchKeywords": {
 2849 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-48-95-PP-N 806276 4.8 mm 9.5 mm PP 本色",
 2897 |     ],
 2898 |     "materialCode": "PP",
 2899 |     "colorCode": "N",
 2900 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2901 |     "detailSlug": "barbed-fittings",
 2902 |     "detailHref": "/products/fittings/barbed-fittings",
 2903 |     "status": "active",
 2904 |     "sourceIndex": 49,
 2905 |     "sortOrder": 10049,
 2906 |     "searchKeywords": {
 2907 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-24-40-PP-N 806036 2.4 mm 4.0 mm PP 本色",
 2955 |     ],
 2956 |     "materialCode": "PP",
 2957 |     "colorCode": "N",
 2958 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2959 |     "detailSlug": "barbed-fittings",
 2960 |     "detailHref": "/products/fittings/barbed-fittings",
 2961 |     "status": "active",
 2962 |     "sourceIndex": 50,
 2963 |     "sortOrder": 10050,
 2964 |     "searchKeywords": {
 2965 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32-64-PP-N 806033 3.2 mm 6.4 mm PP 本色",
 3013 |     ],
 3014 |     "materialCode": "PP",
 3015 |     "colorCode": "N",
 3016 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3017 |     "detailSlug": "barbed-fittings",
 3018 |     "detailHref": "/products/fittings/barbed-fittings",
 3019 |     "status": "active",
 3020 |     "sourceIndex": 51,
 3021 |     "sortOrder": 10051,
 3022 |     "searchKeywords": {
 3023 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-127-PP-N 806201 12.7 mm 12.7 mm PP 本色",
 3071 |     ],
 3072 |     "materialCode": "PP",
 3073 |     "colorCode": "N",
 3074 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3075 |     "detailSlug": "barbed-fittings",
 3076 |     "detailHref": "/products/fittings/barbed-fittings",
 3077 |     "status": "active",
 3078 |     "sourceIndex": 52,
 3079 |     "sortOrder": 10052,
 3080 |     "searchKeywords": {
 3081 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-95-127-PP-N 806256 9.5 mm 12.7 mm PP 本色",
 3129 |     ],
 3130 |     "materialCode": "AC",
 3131 |     "colorCode": "W",
 3132 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3133 |     "detailSlug": "barbed-fittings",
 3134 |     "detailHref": "/products/fittings/barbed-fittings",
 3135 |     "status": "active",
 3136 |     "sourceIndex": 53,
 3137 |     "sortOrder": 10053,
 3138 |     "searchKeywords": {
 3139 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-40-79-AC-W 806272 4.0 mm 7.9 mm AC 白色",
 3187 |     ],
 3188 |     "materialCode": "PP",
 3189 |     "colorCode": "N",
 3190 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3191 |     "detailSlug": "barbed-fittings",
 3192 |     "detailHref": "/products/fittings/barbed-fittings",
 3193 |     "status": "active",
 3194 |     "sourceIndex": 54,
 3195 |     "sortOrder": 10054,
 3196 |     "searchKeywords": {
 3197 |       "zh": "倒刺接头 直通型倒刺接头 BA BA-32-48-PP-N 806147 3.2 mm 4.8 mm PP 本色",
 3245 |     ],
 3246 |     "materialCode": "PA",
 3247 |     "colorCode": "W",
 3248 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3249 |     "detailSlug": "barbed-fittings",
 3250 |     "detailHref": "/products/fittings/barbed-fittings",
 3251 |     "status": "active",
 3252 |     "sourceIndex": 128,
 3253 |     "sortOrder": 20128,
 3254 |     "searchKeywords": {
 3255 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16F-PA-W 809345 1.6 mm 1.6 mm PA 白色",
 3303 |     ],
 3304 |     "materialCode": "PA",
 3305 |     "colorCode": "W",
 3306 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3307 |     "detailSlug": "barbed-fittings",
 3308 |     "detailHref": "/products/fittings/barbed-fittings",
 3309 |     "status": "active",
 3310 |     "sourceIndex": 129,
 3311 |     "sortOrder": 20129,
 3312 |     "searchKeywords": {
 3313 |       "zh": "倒刺接头 L型倒刺接头 BL BL-24F-PA-W 809346 2.4 mm 2.4 mm PA 白色",
 3361 |     ],
 3362 |     "materialCode": "PA",
 3363 |     "colorCode": "W",
 3364 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3365 |     "detailSlug": "barbed-fittings",
 3366 |     "detailHref": "/products/fittings/barbed-fittings",
 3367 |     "status": "active",
 3368 |     "sourceIndex": 130,
 3369 |     "sortOrder": 20130,
 3370 |     "searchKeywords": {
 3371 |       "zh": "倒刺接头 L型倒刺接头 BL BL-32F-PA-W 809347 3.2 mm 3.2 mm PA 白色",
 3419 |     ],
 3420 |     "materialCode": "PA",
 3421 |     "colorCode": "W",
 3422 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3423 |     "detailSlug": "barbed-fittings",
 3424 |     "detailHref": "/products/fittings/barbed-fittings",
 3425 |     "status": "active",
 3426 |     "sourceIndex": 131,
 3427 |     "sortOrder": 20131,
 3428 |     "searchKeywords": {
 3429 |       "zh": "倒刺接头 L型倒刺接头 BL BL-40F-PA-W 809348 4.0 mm 4.0 mm PA 白色",
 3477 |     ],
 3478 |     "materialCode": "PA",
 3479 |     "colorCode": "W",
 3480 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3481 |     "detailSlug": "barbed-fittings",
 3482 |     "detailHref": "/products/fittings/barbed-fittings",
 3483 |     "status": "active",
 3484 |     "sourceIndex": 132,
 3485 |     "sortOrder": 20132,
 3486 |     "searchKeywords": {
 3487 |       "zh": "倒刺接头 L型倒刺接头 BL BL-64F-PA-W 809349 6.4 mm 6.4 mm PA 白色",
 3535 |     ],
 3536 |     "materialCode": "PA",
 3537 |     "colorCode": "W",
 3538 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3539 |     "detailSlug": "barbed-fittings",
 3540 |     "detailHref": "/products/fittings/barbed-fittings",
 3541 |     "status": "active",
 3542 |     "sourceIndex": 133,
 3543 |     "sortOrder": 20133,
 3544 |     "searchKeywords": {
 3545 |       "zh": "倒刺接头 L型倒刺接头 BL BL-95D-PA-W 809350 9.5 mm 9.5 mm PA 白色",
 3593 |     ],
 3594 |     "materialCode": "PP",
 3595 |     "colorCode": "N",
 3596 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3597 |     "detailSlug": "barbed-fittings",
 3598 |     "detailHref": "/products/fittings/barbed-fittings",
 3599 |     "status": "active",
 3600 |     "sourceIndex": 134,
 3601 |     "sortOrder": 20134,
 3602 |     "searchKeywords": {
 3603 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16F-PP-N 809357 1.6 mm 1.6 mm PP 本色",
 3651 |     ],
 3652 |     "materialCode": "PP",
 3653 |     "colorCode": "N",
 3654 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3655 |     "detailSlug": "barbed-fittings",
 3656 |     "detailHref": "/products/fittings/barbed-fittings",
 3657 |     "status": "active",
 3658 |     "sourceIndex": 135,
 3659 |     "sortOrder": 20135,
 3660 |     "searchKeywords": {
 3661 |       "zh": "倒刺接头 L型倒刺接头 BL BL-24F-PP-N 809358 2.4 mm 2.4 mm PP 本色",
 3709 |     ],
 3710 |     "materialCode": "PP",
 3711 |     "colorCode": "N",
 3712 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3713 |     "detailSlug": "barbed-fittings",
 3714 |     "detailHref": "/products/fittings/barbed-fittings",
 3715 |     "status": "active",
 3716 |     "sourceIndex": 136,
 3717 |     "sortOrder": 20136,
 3718 |     "searchKeywords": {
 3719 |       "zh": "倒刺接头 L型倒刺接头 BL BL-32F-PP-N 809359 3.2 mm 3.2 mm PP 本色",
 3767 |     ],
 3768 |     "materialCode": "PP",
 3769 |     "colorCode": "N",
 3770 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3771 |     "detailSlug": "barbed-fittings",
 3772 |     "detailHref": "/products/fittings/barbed-fittings",
 3773 |     "status": "active",
 3774 |     "sourceIndex": 137,
 3775 |     "sortOrder": 20137,
 3776 |     "searchKeywords": {
 3777 |       "zh": "倒刺接头 L型倒刺接头 BL BL-40F-PP-N 809360 4.0 mm 4.0 mm PP 本色",
 3825 |     ],
 3826 |     "materialCode": "PP",
 3827 |     "colorCode": "N",
 3828 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3829 |     "detailSlug": "barbed-fittings",
 3830 |     "detailHref": "/products/fittings/barbed-fittings",
 3831 |     "status": "active",
 3832 |     "sourceIndex": 138,
 3833 |     "sortOrder": 20138,
 3834 |     "searchKeywords": {
 3835 |       "zh": "倒刺接头 L型倒刺接头 BL BL-64F-PP-N 809361 6.4 mm 6.4 mm PP 本色",
 3883 |     ],
 3884 |     "materialCode": "PP",
 3885 |     "colorCode": "N",
 3886 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3887 |     "detailSlug": "barbed-fittings",
 3888 |     "detailHref": "/products/fittings/barbed-fittings",
 3889 |     "status": "active",
 3890 |     "sourceIndex": 139,
 3891 |     "sortOrder": 20139,
 3892 |     "searchKeywords": {
 3893 |       "zh": "倒刺接头 L型倒刺接头 BL BL-95D-PP-N 809362 9.5 mm 9.5 mm PP 本色",
 3941 |     ],
 3942 |     "materialCode": "PP",
 3943 |     "colorCode": "N",
 3944 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3945 |     "detailSlug": "barbed-fittings",
 3946 |     "detailHref": "/products/fittings/barbed-fittings",
 3947 |     "status": "active",
 3948 |     "sourceIndex": 140,
 3949 |     "sortOrder": 20140,
 3950 |     "searchKeywords": {
 3951 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16D-PP-N 809632 1.6 mm 1.6 mm PP 本色",
 3999 |     ],
 4000 |     "materialCode": "PA",
 4001 |     "colorCode": "W",
 4002 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4003 |     "detailSlug": "barbed-fittings",
 4004 |     "detailHref": "/products/fittings/barbed-fittings",
 4005 |     "status": "active",
 4006 |     "sourceIndex": 141,
 4007 |     "sortOrder": 20141,
 4008 |     "searchKeywords": {
 4009 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16D-PA-W 809633 1.6 mm 1.6 mm PA 白色",
 4057 |     ],
 4058 |     "materialCode": "PP",
 4059 |     "colorCode": "N",
 4060 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4061 |     "detailSlug": "barbed-fittings",
 4062 |     "detailHref": "/products/fittings/barbed-fittings",
 4063 |     "status": "active",
 4064 |     "sourceIndex": 142,
 4065 |     "sortOrder": 20142,
 4066 |     "searchKeywords": {
 4067 |       "zh": "倒刺接头 L型倒刺接头 BL BL-24D-PP-N 809634 2.4 mm 2.4 mm PP 本色",
 4115 |     ],
 4116 |     "materialCode": "PA",
 4117 |     "colorCode": "W",
 4118 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4119 |     "detailSlug": "barbed-fittings",
 4120 |     "detailHref": "/products/fittings/barbed-fittings",
 4121 |     "status": "active",
 4122 |     "sourceIndex": 143,
 4123 |     "sortOrder": 20143,
 4124 |     "searchKeywords": {
 4125 |       "zh": "倒刺接头 L型倒刺接头 BL BL-24D-PA-W 809635 2.4 mm 2.4 mm PA 白色",
 4173 |     ],
 4174 |     "materialCode": "PP",
 4175 |     "colorCode": "N",
 4176 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4177 |     "detailSlug": "barbed-fittings",
 4178 |     "detailHref": "/products/fittings/barbed-fittings",
 4179 |     "status": "active",
 4180 |     "sourceIndex": 144,
 4181 |     "sortOrder": 20144,
 4182 |     "searchKeywords": {
 4183 |       "zh": "倒刺接头 L型倒刺接头 BL BL-32D-PP-N 809636 3.2 mm 3.2 mm PP 本色",
 4231 |     ],
 4232 |     "materialCode": "PA",
 4233 |     "colorCode": "W",
 4234 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4235 |     "detailSlug": "barbed-fittings",
 4236 |     "detailHref": "/products/fittings/barbed-fittings",
 4237 |     "status": "active",
 4238 |     "sourceIndex": 145,
 4239 |     "sortOrder": 20145,
 4240 |     "searchKeywords": {
 4241 |       "zh": "倒刺接头 L型倒刺接头 BL BL-32D-PA-W 809637 3.2 mm 3.2 mm PA 白色",
 4289 |     ],
 4290 |     "materialCode": "PP",
 4291 |     "colorCode": "N",
 4292 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4293 |     "detailSlug": "barbed-fittings",
 4294 |     "detailHref": "/products/fittings/barbed-fittings",
 4295 |     "status": "active",
 4296 |     "sourceIndex": 146,
 4297 |     "sortOrder": 20146,
 4298 |     "searchKeywords": {
 4299 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16D-24D-PP-N 809638 1.6 mm 2.4 mm PP 本色",
 4347 |     ],
 4348 |     "materialCode": "PA",
 4349 |     "colorCode": "W",
 4350 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4351 |     "detailSlug": "barbed-fittings",
 4352 |     "detailHref": "/products/fittings/barbed-fittings",
 4353 |     "status": "active",
 4354 |     "sourceIndex": 147,
 4355 |     "sortOrder": 20147,
 4356 |     "searchKeywords": {
 4357 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16D-24D-PA-W 809639 1.6 mm 2.4 mm PA 白色",
 4405 |     ],
 4406 |     "materialCode": "PP",
 4407 |     "colorCode": "N",
 4408 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4409 |     "detailSlug": "barbed-fittings",
 4410 |     "detailHref": "/products/fittings/barbed-fittings",
 4411 |     "status": "active",
 4412 |     "sourceIndex": 148,
 4413 |     "sortOrder": 20148,
 4414 |     "searchKeywords": {
 4415 |       "zh": "倒刺接头 L型倒刺接头 BL BL-24D-32D-PP-N 809640 2.4 mm 3.2 mm PP 本色",
 4463 |     ],
 4464 |     "materialCode": "PA",
 4465 |     "colorCode": "W",
 4466 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4467 |     "detailSlug": "barbed-fittings",
 4468 |     "detailHref": "/products/fittings/barbed-fittings",
 4469 |     "status": "active",
 4470 |     "sourceIndex": 149,
 4471 |     "sortOrder": 20149,
 4472 |     "searchKeywords": {
 4473 |       "zh": "倒刺接头 L型倒刺接头 BL BL-24D-32D-PA-W 809641 2.4 mm 3.2 mm PA 白色",
 4521 |     ],
 4522 |     "materialCode": "PP",
 4523 |     "colorCode": "N",
 4524 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4525 |     "detailSlug": "barbed-fittings",
 4526 |     "detailHref": "/products/fittings/barbed-fittings",
 4527 |     "status": "active",
 4528 |     "sourceIndex": 150,
 4529 |     "sortOrder": 20150,
 4530 |     "searchKeywords": {
 4531 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16D-32D-PP-N 809642 1.6 mm 3.2 mm PP 本色",
 4579 |     ],
 4580 |     "materialCode": "PA",
 4581 |     "colorCode": "W",
 4582 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4583 |     "detailSlug": "barbed-fittings",
 4584 |     "detailHref": "/products/fittings/barbed-fittings",
 4585 |     "status": "active",
 4586 |     "sourceIndex": 151,
 4587 |     "sortOrder": 20151,
 4588 |     "searchKeywords": {
 4589 |       "zh": "倒刺接头 L型倒刺接头 BL BL-16D-32D-PA-W 809643 1.6 mm 3.2 mm PA 白色",
 4637 |     ],
 4638 |     "materialCode": "PP",
 4639 |     "colorCode": "N",
 4640 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4641 |     "detailSlug": "barbed-fittings",
 4642 |     "detailHref": "/products/fittings/barbed-fittings",
 4643 |     "status": "active",
 4644 |     "sourceIndex": 152,
 4645 |     "sortOrder": 20152,
 4646 |     "searchKeywords": {
 4647 |       "zh": "倒刺接头 L型倒刺接头 BL BL-127V-PP-N 809645 12.7 mm 12.7 mm PP 本色",
 4695 |     ],
 4696 |     "materialCode": "PP",
 4697 |     "colorCode": "N",
 4698 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4699 |     "detailSlug": "barbed-fittings",
 4700 |     "detailHref": "/products/fittings/barbed-fittings",
 4701 |     "status": "active",
 4702 |     "sourceIndex": 153,
 4703 |     "sortOrder": 20153,
 4704 |     "searchKeywords": {
 4705 |       "zh": "倒刺接头 L型倒刺接头 BL BL-160-PP-N 809881 16.0 mm 16.0 mm PP 本色",
 4754 |     ],
 4755 |     "materialCode": "PP",
 4756 |     "colorCode": "N",
 4757 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4758 |     "detailSlug": "barbed-fittings",
 4759 |     "detailHref": "/products/fittings/barbed-fittings",
 4760 |     "status": "active",
 4761 |     "sourceIndex": 55,
 4762 |     "sortOrder": 30055,
 4763 |     "searchKeywords": {
 4764 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16F-PP-N 809309 1.6 mm 1.6 mm 1.6 mm PP 本色",
 4813 |     ],
 4814 |     "materialCode": "PP",
 4815 |     "colorCode": "N",
 4816 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4817 |     "detailSlug": "barbed-fittings",
 4818 |     "detailHref": "/products/fittings/barbed-fittings",
 4819 |     "status": "active",
 4820 |     "sourceIndex": 56,
 4821 |     "sortOrder": 30056,
 4822 |     "searchKeywords": {
 4823 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24F-PP-N 809310 2.4 mm 2.4 mm 2.4 mm PP 本色",
 4872 |     ],
 4873 |     "materialCode": "PP",
 4874 |     "colorCode": "N",
 4875 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4876 |     "detailSlug": "barbed-fittings",
 4877 |     "detailHref": "/products/fittings/barbed-fittings",
 4878 |     "status": "active",
 4879 |     "sourceIndex": 57,
 4880 |     "sortOrder": 30057,
 4881 |     "searchKeywords": {
 4882 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32F-PP-N 809311 3.2 mm 3.2 mm 3.2 mm PP 本色",
 4931 |     ],
 4932 |     "materialCode": "PA",
 4933 |     "colorCode": "W",
 4934 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4935 |     "detailSlug": "barbed-fittings",
 4936 |     "detailHref": "/products/fittings/barbed-fittings",
 4937 |     "status": "active",
 4938 |     "sourceIndex": 58,
 4939 |     "sortOrder": 30058,
 4940 |     "searchKeywords": {
 4941 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24F-PA-W 809327 2.4 mm 2.4 mm 2.4 mm PA 白色",
 4990 |     ],
 4991 |     "materialCode": "PA",
 4992 |     "colorCode": "W",
 4993 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4994 |     "detailSlug": "barbed-fittings",
 4995 |     "detailHref": "/products/fittings/barbed-fittings",
 4996 |     "status": "active",
 4997 |     "sourceIndex": 59,
 4998 |     "sortOrder": 30059,
 4999 |     "searchKeywords": {
 5000 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16F-PA-W 809337 1.6 mm 1.6 mm 1.6 mm PA 白色",
 5049 |     ],
 5050 |     "materialCode": "PA",
 5051 |     "colorCode": "W",
 5052 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5053 |     "detailSlug": "barbed-fittings",
 5054 |     "detailHref": "/products/fittings/barbed-fittings",
 5055 |     "status": "active",
 5056 |     "sourceIndex": 60,
 5057 |     "sortOrder": 30060,
 5058 |     "searchKeywords": {
 5059 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32F-PA-W 809338 3.2 mm 3.2 mm 3.2 mm PA 白色",
 5108 |     ],
 5109 |     "materialCode": "PP",
 5110 |     "colorCode": "N",
 5111 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5112 |     "detailSlug": "barbed-fittings",
 5113 |     "detailHref": "/products/fittings/barbed-fittings",
 5114 |     "status": "active",
 5115 |     "sourceIndex": 61,
 5116 |     "sortOrder": 30061,
 5117 |     "searchKeywords": {
 5118 |       "zh": "倒刺接头 T型倒刺接头 BT BT-40C-PP-N 809438 4.0 mm 4.0 mm 4.0 mm PP 本色",
 5167 |     ],
 5168 |     "materialCode": "PA",
 5169 |     "colorCode": "W",
 5170 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5171 |     "detailSlug": "barbed-fittings",
 5172 |     "detailHref": "/products/fittings/barbed-fittings",
 5173 |     "status": "active",
 5174 |     "sourceIndex": 62,
 5175 |     "sortOrder": 30062,
 5176 |     "searchKeywords": {
 5177 |       "zh": "倒刺接头 T型倒刺接头 BT BT-40C-PA-W 809439 4.0 mm 4.0 mm 4.0 mm PA 白色",
 5226 |     ],
 5227 |     "materialCode": "PP",
 5228 |     "colorCode": "N",
 5229 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5230 |     "detailSlug": "barbed-fittings",
 5231 |     "detailHref": "/products/fittings/barbed-fittings",
 5232 |     "status": "active",
 5233 |     "sourceIndex": 63,
 5234 |     "sortOrder": 30063,
 5235 |     "searchKeywords": {
 5236 |       "zh": "倒刺接头 T型倒刺接头 BT BT-64C-PP-N 809440 6.4 mm 6.4 mm 6.4 mm PP 本色",
 5285 |     ],
 5286 |     "materialCode": "PA",
 5287 |     "colorCode": "W",
 5288 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5289 |     "detailSlug": "barbed-fittings",
 5290 |     "detailHref": "/products/fittings/barbed-fittings",
 5291 |     "status": "active",
 5292 |     "sourceIndex": 64,
 5293 |     "sortOrder": 30064,
 5294 |     "searchKeywords": {
 5295 |       "zh": "倒刺接头 T型倒刺接头 BT BT-64C-PA-W 809441 6.4 mm 6.4 mm 6.4 mm PA 白色",
 5344 |     ],
 5345 |     "materialCode": "PP",
 5346 |     "colorCode": "N",
 5347 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5348 |     "detailSlug": "barbed-fittings",
 5349 |     "detailHref": "/products/fittings/barbed-fittings",
 5350 |     "status": "active",
 5351 |     "sourceIndex": 65,
 5352 |     "sortOrder": 30065,
 5353 |     "searchKeywords": {
 5354 |       "zh": "倒刺接头 T型倒刺接头 BT BT-95X-PP-N 809442 9.5 mm 9.5 mm 9.5 mm PP 本色",
 5403 |     ],
 5404 |     "materialCode": "PA",
 5405 |     "colorCode": "W",
 5406 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5407 |     "detailSlug": "barbed-fittings",
 5408 |     "detailHref": "/products/fittings/barbed-fittings",
 5409 |     "status": "active",
 5410 |     "sourceIndex": 66,
 5411 |     "sortOrder": 30066,
 5412 |     "searchKeywords": {
 5413 |       "zh": "倒刺接头 T型倒刺接头 BT BT-95X-PA-W 809443 9.5 mm 9.5 mm 9.5 mm PA 白色",
 5462 |     ],
 5463 |     "materialCode": "PP",
 5464 |     "colorCode": "N",
 5465 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5466 |     "detailSlug": "barbed-fittings",
 5467 |     "detailHref": "/products/fittings/barbed-fittings",
 5468 |     "status": "active",
 5469 |     "sourceIndex": 67,
 5470 |     "sortOrder": 30067,
 5471 |     "searchKeywords": {
 5472 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-32D-16D-PP-N 809444 3.2 mm 3.2 mm 1.6 mm PP 本色",
 5521 |     ],
 5522 |     "materialCode": "PA",
 5523 |     "colorCode": "W",
 5524 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5525 |     "detailSlug": "barbed-fittings",
 5526 |     "detailHref": "/products/fittings/barbed-fittings",
 5527 |     "status": "active",
 5528 |     "sourceIndex": 68,
 5529 |     "sortOrder": 30068,
 5530 |     "searchKeywords": {
 5531 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-32D-16D-PA-W 809445 3.2 mm 3.2 mm 1.6 mm PA 白色",
 5580 |     ],
 5581 |     "materialCode": "PP",
 5582 |     "colorCode": "N",
 5583 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5584 |     "detailSlug": "barbed-fittings",
 5585 |     "detailHref": "/products/fittings/barbed-fittings",
 5586 |     "status": "active",
 5587 |     "sourceIndex": 69,
 5588 |     "sortOrder": 30069,
 5589 |     "searchKeywords": {
 5590 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24D-24D-16D-PP-N 809446 2.4 mm 2.4 mm 1.6 mm PP 本色",
 5639 |     ],
 5640 |     "materialCode": "PA",
 5641 |     "colorCode": "W",
 5642 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5643 |     "detailSlug": "barbed-fittings",
 5644 |     "detailHref": "/products/fittings/barbed-fittings",
 5645 |     "status": "active",
 5646 |     "sourceIndex": 70,
 5647 |     "sortOrder": 30070,
 5648 |     "searchKeywords": {
 5649 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24D-24D-16D-PA-W 809447 2.4 mm 2.4 mm 1.6 mm PA 白色",
 5698 |     ],
 5699 |     "materialCode": "PP",
 5700 |     "colorCode": "N",
 5701 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5702 |     "detailSlug": "barbed-fittings",
 5703 |     "detailHref": "/products/fittings/barbed-fittings",
 5704 |     "status": "active",
 5705 |     "sourceIndex": 71,
 5706 |     "sortOrder": 30071,
 5707 |     "searchKeywords": {
 5708 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-32D-24D-PP-N 809448 3.2 mm 3.2 mm 2.4 mm PP 本色",
 5757 |     ],
 5758 |     "materialCode": "PA",
 5759 |     "colorCode": "W",
 5760 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5761 |     "detailSlug": "barbed-fittings",
 5762 |     "detailHref": "/products/fittings/barbed-fittings",
 5763 |     "status": "active",
 5764 |     "sourceIndex": 72,
 5765 |     "sortOrder": 30072,
 5766 |     "searchKeywords": {
 5767 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-32D-24D-PA-W 809449 3.2 mm 3.2 mm 2.4 mm PA 白色",
 5816 |     ],
 5817 |     "materialCode": "PP",
 5818 |     "colorCode": "N",
 5819 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5820 |     "detailSlug": "barbed-fittings",
 5821 |     "detailHref": "/products/fittings/barbed-fittings",
 5822 |     "status": "active",
 5823 |     "sourceIndex": 73,
 5824 |     "sortOrder": 30073,
 5825 |     "searchKeywords": {
 5826 |       "zh": "倒刺接头 T型倒刺接头 BT BT-64D-64D-32D-PP-N 809450 6.4 mm 6.4 mm 3.2 mm PP 本色",
 5875 |     ],
 5876 |     "materialCode": "PA",
 5877 |     "colorCode": "W",
 5878 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5879 |     "detailSlug": "barbed-fittings",
 5880 |     "detailHref": "/products/fittings/barbed-fittings",
 5881 |     "status": "active",
 5882 |     "sourceIndex": 74,
 5883 |     "sortOrder": 30074,
 5884 |     "searchKeywords": {
 5885 |       "zh": "倒刺接头 T型倒刺接头 BT BT-64D-64D-32D-PA-W 809451 6.4 mm 6.4 mm 3.2 mm PA 白色",
 5934 |     ],
 5935 |     "materialCode": "PP",
 5936 |     "colorCode": "N",
 5937 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5938 |     "detailSlug": "barbed-fittings",
 5939 |     "detailHref": "/products/fittings/barbed-fittings",
 5940 |     "status": "active",
 5941 |     "sourceIndex": 75,
 5942 |     "sortOrder": 30075,
 5943 |     "searchKeywords": {
 5944 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24D-32D-32D-PP-N 809452 2.4 mm 3.2 mm 3.2 mm PP 本色",
 5993 |     ],
 5994 |     "materialCode": "PA",
 5995 |     "colorCode": "W",
 5996 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 5997 |     "detailSlug": "barbed-fittings",
 5998 |     "detailHref": "/products/fittings/barbed-fittings",
 5999 |     "status": "active",
 6000 |     "sourceIndex": 76,
 6001 |     "sortOrder": 30076,
 6002 |     "searchKeywords": {
 6003 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24D-32D-32D-PA-W 809453 2.4 mm 3.2 mm 3.2 mm PA 白色",
 6052 |     ],
 6053 |     "materialCode": "PP",
 6054 |     "colorCode": "N",
 6055 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6056 |     "detailSlug": "barbed-fittings",
 6057 |     "detailHref": "/products/fittings/barbed-fittings",
 6058 |     "status": "active",
 6059 |     "sourceIndex": 77,
 6060 |     "sortOrder": 30077,
 6061 |     "searchKeywords": {
 6062 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-16D-16D-PP-N 809454 3.2 mm 1.6 mm 1.6 mm PP 本色",
 6111 |     ],
 6112 |     "materialCode": "PA",
 6113 |     "colorCode": "W",
 6114 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6115 |     "detailSlug": "barbed-fittings",
 6116 |     "detailHref": "/products/fittings/barbed-fittings",
 6117 |     "status": "active",
 6118 |     "sourceIndex": 78,
 6119 |     "sortOrder": 30078,
 6120 |     "searchKeywords": {
 6121 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-16D-16D-PA-W 809455 3.2 mm 1.6 mm 1.6 mm PA 白色",
 6170 |     ],
 6171 |     "materialCode": "PP",
 6172 |     "colorCode": "N",
 6173 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6174 |     "detailSlug": "barbed-fittings",
 6175 |     "detailHref": "/products/fittings/barbed-fittings",
 6176 |     "status": "active",
 6177 |     "sourceIndex": 79,
 6178 |     "sortOrder": 30079,
 6179 |     "searchKeywords": {
 6180 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-24D-24D-PP-N 809456 3.2 mm 2.4 mm 2.4 mm PP 本色",
 6229 |     ],
 6230 |     "materialCode": "PA",
 6231 |     "colorCode": "W",
 6232 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6233 |     "detailSlug": "barbed-fittings",
 6234 |     "detailHref": "/products/fittings/barbed-fittings",
 6235 |     "status": "active",
 6236 |     "sourceIndex": 80,
 6237 |     "sortOrder": 30080,
 6238 |     "searchKeywords": {
 6239 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-24D-24D-PA-W 809457 3.2 mm 2.4 mm 2.4 mm PA 白色",
 6288 |     ],
 6289 |     "materialCode": "PP",
 6290 |     "colorCode": "N",
 6291 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6292 |     "detailSlug": "barbed-fittings",
 6293 |     "detailHref": "/products/fittings/barbed-fittings",
 6294 |     "status": "active",
 6295 |     "sourceIndex": 81,
 6296 |     "sortOrder": 30081,
 6297 |     "searchKeywords": {
 6298 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-64T-64T-PP-N 809458 3.2 mm 6.4 mm 6.4 mm PP 本色",
 6347 |     ],
 6348 |     "materialCode": "PA",
 6349 |     "colorCode": "W",
 6350 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6351 |     "detailSlug": "barbed-fittings",
 6352 |     "detailHref": "/products/fittings/barbed-fittings",
 6353 |     "status": "active",
 6354 |     "sourceIndex": 82,
 6355 |     "sortOrder": 30082,
 6356 |     "searchKeywords": {
 6357 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-64T-64T-PA-W 809459 3.2 mm 6.4 mm 6.4 mm PA 白色",
 6406 |     ],
 6407 |     "materialCode": "PP",
 6408 |     "colorCode": "N",
 6409 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6410 |     "detailSlug": "barbed-fittings",
 6411 |     "detailHref": "/products/fittings/barbed-fittings",
 6412 |     "status": "active",
 6413 |     "sourceIndex": 83,
 6414 |     "sortOrder": 30083,
 6415 |     "searchKeywords": {
 6416 |       "zh": "倒刺接头 T型倒刺接头 BT BT-64V-95V-95V-PP-N 809460 6.4 mm 9.5 mm 9.5 mm PP 本色",
 6465 |     ],
 6466 |     "materialCode": "PA",
 6467 |     "colorCode": "W",
 6468 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6469 |     "detailSlug": "barbed-fittings",
 6470 |     "detailHref": "/products/fittings/barbed-fittings",
 6471 |     "status": "active",
 6472 |     "sourceIndex": 84,
 6473 |     "sortOrder": 30084,
 6474 |     "searchKeywords": {
 6475 |       "zh": "倒刺接头 T型倒刺接头 BT BT-64V-95V-95V-PA-W 809461 6.4 mm 9.5 mm 9.5 mm PA 白色",
 6524 |     ],
 6525 |     "materialCode": "PP",
 6526 |     "colorCode": "N",
 6527 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6528 |     "detailSlug": "barbed-fittings",
 6529 |     "detailHref": "/products/fittings/barbed-fittings",
 6530 |     "status": "active",
 6531 |     "sourceIndex": 85,
 6532 |     "sortOrder": 30085,
 6533 |     "searchKeywords": {
 6534 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24-16-16-PP-N 806197 2.4 mm 1.6 mm 1.6 mm PP 本色",
 6583 |     ],
 6584 |     "materialCode": "PP",
 6585 |     "colorCode": "N",
 6586 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6587 |     "detailSlug": "barbed-fittings",
 6588 |     "detailHref": "/products/fittings/barbed-fittings",
 6589 |     "status": "active",
 6590 |     "sourceIndex": 86,
 6591 |     "sortOrder": 30086,
 6592 |     "searchKeywords": {
 6593 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16D-PP-N 809521 1.6 mm 1.6 mm 1.6 mm PP 本色",
 6642 |     ],
 6643 |     "materialCode": "PA",
 6644 |     "colorCode": "W",
 6645 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6646 |     "detailSlug": "barbed-fittings",
 6647 |     "detailHref": "/products/fittings/barbed-fittings",
 6648 |     "status": "active",
 6649 |     "sourceIndex": 87,
 6650 |     "sortOrder": 30087,
 6651 |     "searchKeywords": {
 6652 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16D-PA-W 809545 1.6 mm 1.6 mm 1.6 mm PA 白色",
 6701 |     ],
 6702 |     "materialCode": "PP",
 6703 |     "colorCode": "N",
 6704 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6705 |     "detailSlug": "barbed-fittings",
 6706 |     "detailHref": "/products/fittings/barbed-fittings",
 6707 |     "status": "active",
 6708 |     "sourceIndex": 88,
 6709 |     "sortOrder": 30088,
 6710 |     "searchKeywords": {
 6711 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24D-PP-N 809610 2.4 mm 2.4 mm 2.4 mm PP 本色",
 6760 |     ],
 6761 |     "materialCode": "PA",
 6762 |     "colorCode": "W",
 6763 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6764 |     "detailSlug": "barbed-fittings",
 6765 |     "detailHref": "/products/fittings/barbed-fittings",
 6766 |     "status": "active",
 6767 |     "sourceIndex": 89,
 6768 |     "sortOrder": 30089,
 6769 |     "searchKeywords": {
 6770 |       "zh": "倒刺接头 T型倒刺接头 BT BT-24D-PA-W 809611 2.4 mm 2.4 mm 2.4 mm PA 白色",
 6819 |     ],
 6820 |     "materialCode": "PP",
 6821 |     "colorCode": "N",
 6822 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6823 |     "detailSlug": "barbed-fittings",
 6824 |     "detailHref": "/products/fittings/barbed-fittings",
 6825 |     "status": "active",
 6826 |     "sourceIndex": 90,
 6827 |     "sortOrder": 30090,
 6828 |     "searchKeywords": {
 6829 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-PP-N 809621 3.2 mm 3.2 mm 3.2 mm PP 本色",
 6878 |     ],
 6879 |     "materialCode": "PA",
 6880 |     "colorCode": "W",
 6881 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6882 |     "detailSlug": "barbed-fittings",
 6883 |     "detailHref": "/products/fittings/barbed-fittings",
 6884 |     "status": "active",
 6885 |     "sourceIndex": 91,
 6886 |     "sortOrder": 30091,
 6887 |     "searchKeywords": {
 6888 |       "zh": "倒刺接头 T型倒刺接头 BT BT-32D-PA-W 809622 3.2 mm 3.2 mm 3.2 mm PA 白色",
 6937 |     ],
 6938 |     "materialCode": "PP",
 6939 |     "colorCode": "N",
 6940 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 6941 |     "detailSlug": "barbed-fittings",
 6942 |     "detailHref": "/products/fittings/barbed-fittings",
 6943 |     "status": "active",
 6944 |     "sourceIndex": 92,
 6945 |     "sortOrder": 30092,
 6946 |     "searchKeywords": {
 6947 |       "zh": "倒刺接头 T型倒刺接头 BT BT-127V-PP-N 809644 12.7 mm 12.7 mm 12.7 mm PP 本色",
 6996 |     ],
 6997 |     "materialCode": "PP",
 6998 |     "colorCode": "N",
 6999 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7000 |     "detailSlug": "barbed-fittings",
 7001 |     "detailHref": "/products/fittings/barbed-fittings",
 7002 |     "status": "active",
 7003 |     "sourceIndex": 93,
 7004 |     "sortOrder": 30093,
 7005 |     "searchKeywords": {
 7006 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16D-24D-24D-PP-N 809287 1.6 mm 2.4 mm 2.4 mm PP 本色",
 7055 |     ],
 7056 |     "materialCode": "PA",
 7057 |     "colorCode": "W",
 7058 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7059 |     "detailSlug": "barbed-fittings",
 7060 |     "detailHref": "/products/fittings/barbed-fittings",
 7061 |     "status": "active",
 7062 |     "sourceIndex": 94,
 7063 |     "sortOrder": 30094,
 7064 |     "searchKeywords": {
 7065 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16D-24D-24D-PA-W 809410 1.6 mm 2.4 mm 2.4 mm PA 白色",
 7114 |     ],
 7115 |     "materialCode": "PA",
 7116 |     "colorCode": "W",
 7117 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7118 |     "detailSlug": "barbed-fittings",
 7119 |     "detailHref": "/products/fittings/barbed-fittings",
 7120 |     "status": "active",
 7121 |     "sourceIndex": 95,
 7122 |     "sortOrder": 30095,
 7123 |     "searchKeywords": {
 7124 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16D-32D-32D-PA-W 809842 1.6 mm 3.2 mm 3.2 mm PA 白色",
 7173 |     ],
 7174 |     "materialCode": "PP",
 7175 |     "colorCode": "N",
 7176 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7177 |     "detailSlug": "barbed-fittings",
 7178 |     "detailHref": "/products/fittings/barbed-fittings",
 7179 |     "status": "active",
 7180 |     "sourceIndex": 96,
 7181 |     "sortOrder": 30096,
 7182 |     "searchKeywords": {
 7183 |       "zh": "倒刺接头 T型倒刺接头 BT BT-16D-32D-32D-PP-N 809851 1.6 mm 3.2 mm 3.2 mm PP 本色",
 7232 |     ],
 7233 |     "materialCode": "PP",
 7234 |     "colorCode": "N",
 7235 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7236 |     "detailSlug": "barbed-fittings",
 7237 |     "detailHref": "/products/fittings/barbed-fittings",
 7238 |     "status": "active",
 7239 |     "sourceIndex": 97,
 7240 |     "sortOrder": 30097,
 7241 |     "searchKeywords": {
 7242 |       "zh": "倒刺接头 T型倒刺接头 BT BT-48D-PP-N 809863 4.8 mm 4.8 mm 4.8 mm PP 本色",
 7291 |     ],
 7292 |     "materialCode": "PP",
 7293 |     "colorCode": "N",
 7294 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7295 |     "detailSlug": "barbed-fittings",
 7296 |     "detailHref": "/products/fittings/barbed-fittings",
 7297 |     "status": "active",
 7298 |     "sourceIndex": 98,
 7299 |     "sortOrder": 30098,
 7300 |     "searchKeywords": {
 7301 |       "zh": "倒刺接头 T型倒刺接头 BT BT-79D-PP-N 809865 7.9 mm 7.9 mm 7.9 mm PP 本色",
 7350 |     ],
 7351 |     "materialCode": "PP",
 7352 |     "colorCode": "N",
 7353 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7354 |     "detailSlug": "barbed-fittings",
 7355 |     "detailHref": "/products/fittings/barbed-fittings",
 7356 |     "status": "active",
 7357 |     "sourceIndex": 99,
 7358 |     "sortOrder": 40099,
 7359 |     "searchKeywords": {
 7360 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-16F-PP-N 809294 1.6 mm 1.6 mm 1.6 mm PP 本色",
 7409 |     ],
 7410 |     "materialCode": "PP",
 7411 |     "colorCode": "N",
 7412 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7413 |     "detailSlug": "barbed-fittings",
 7414 |     "detailHref": "/products/fittings/barbed-fittings",
 7415 |     "status": "active",
 7416 |     "sourceIndex": 100,
 7417 |     "sortOrder": 40100,
 7418 |     "searchKeywords": {
 7419 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-24F-PP-N 809295 2.4 mm 2.4 mm 2.4 mm PP 本色",
 7468 |     ],
 7469 |     "materialCode": "PP",
 7470 |     "colorCode": "N",
 7471 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7472 |     "detailSlug": "barbed-fittings",
 7473 |     "detailHref": "/products/fittings/barbed-fittings",
 7474 |     "status": "active",
 7475 |     "sourceIndex": 101,
 7476 |     "sortOrder": 40101,
 7477 |     "searchKeywords": {
 7478 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-32F-PP-N 809296 3.2 mm 3.2 mm 3.2 mm PP 本色",
 7527 |     ],
 7528 |     "materialCode": "PP",
 7529 |     "colorCode": "N",
 7530 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7531 |     "detailSlug": "barbed-fittings",
 7532 |     "detailHref": "/products/fittings/barbed-fittings",
 7533 |     "status": "active",
 7534 |     "sourceIndex": 102,
 7535 |     "sortOrder": 40102,
 7536 |     "searchKeywords": {
 7537 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-40D-PP-N 809297 4.0 mm 4.0 mm 4.0 mm PP 本色",
 7586 |     ],
 7587 |     "materialCode": "PP",
 7588 |     "colorCode": "N",
 7589 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7590 |     "detailSlug": "barbed-fittings",
 7591 |     "detailHref": "/products/fittings/barbed-fittings",
 7592 |     "status": "active",
 7593 |     "sourceIndex": 103,
 7594 |     "sortOrder": 40103,
 7595 |     "searchKeywords": {
 7596 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-64F-PP-N 809298 6.4 mm 6.4 mm 6.4 mm PP 本色",
 7645 |     ],
 7646 |     "materialCode": "PA",
 7647 |     "colorCode": "W",
 7648 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7649 |     "detailSlug": "barbed-fittings",
 7650 |     "detailHref": "/products/fittings/barbed-fittings",
 7651 |     "status": "active",
 7652 |     "sourceIndex": 104,
 7653 |     "sortOrder": 40104,
 7654 |     "searchKeywords": {
 7655 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-24F-PA-W 809326 2.4 mm 2.4 mm 2.4 mm PA 白色",
 7704 |     ],
 7705 |     "materialCode": "PA",
 7706 |     "colorCode": "W",
 7707 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7708 |     "detailSlug": "barbed-fittings",
 7709 |     "detailHref": "/products/fittings/barbed-fittings",
 7710 |     "status": "active",
 7711 |     "sourceIndex": 105,
 7712 |     "sortOrder": 40105,
 7713 |     "searchKeywords": {
 7714 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-16F-PA-W 809334 1.6 mm 1.6 mm 1.6 mm PA 白色",
 7763 |     ],
 7764 |     "materialCode": "PA",
 7765 |     "colorCode": "W",
 7766 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7767 |     "detailSlug": "barbed-fittings",
 7768 |     "detailHref": "/products/fittings/barbed-fittings",
 7769 |     "status": "active",
 7770 |     "sourceIndex": 106,
 7771 |     "sortOrder": 40106,
 7772 |     "searchKeywords": {
 7773 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-32F-PA-W 809335 3.2 mm 3.2 mm 3.2 mm PA 白色",
 7822 |     ],
 7823 |     "materialCode": "PA",
 7824 |     "colorCode": "W",
 7825 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7826 |     "detailSlug": "barbed-fittings",
 7827 |     "detailHref": "/products/fittings/barbed-fittings",
 7828 |     "status": "active",
 7829 |     "sourceIndex": 107,
 7830 |     "sortOrder": 40107,
 7831 |     "searchKeywords": {
 7832 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-64F-PA-W 809336 6.4 mm 6.4 mm 6.4 mm PA 白色",
 7881 |     ],
 7882 |     "materialCode": "PP",
 7883 |     "colorCode": "N",
 7884 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7885 |     "detailSlug": "barbed-fittings",
 7886 |     "detailHref": "/products/fittings/barbed-fittings",
 7887 |     "status": "active",
 7888 |     "sourceIndex": 108,
 7889 |     "sortOrder": 40108,
 7890 |     "searchKeywords": {
 7891 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-48F-PP-N 809341 4.8 mm 4.8 mm 4.8 mm PP 本色",
 7940 |     ],
 7941 |     "materialCode": "PA",
 7942 |     "colorCode": "W",
 7943 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 7944 |     "detailSlug": "barbed-fittings",
 7945 |     "detailHref": "/products/fittings/barbed-fittings",
 7946 |     "status": "active",
 7947 |     "sourceIndex": 109,
 7948 |     "sortOrder": 40109,
 7949 |     "searchKeywords": {
 7950 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-48F-PA-W 809343 4.8 mm 4.8 mm 4.8 mm PA 白色",
 7999 |     ],
 8000 |     "materialCode": "PA",
 8001 |     "colorCode": "W",
 8002 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8003 |     "detailSlug": "barbed-fittings",
 8004 |     "detailHref": "/products/fittings/barbed-fittings",
 8005 |     "status": "active",
 8006 |     "sourceIndex": 110,
 8007 |     "sortOrder": 40110,
 8008 |     "searchKeywords": {
 8009 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-40D-PA-W 809369 4.0 mm 4.0 mm 4.0 mm PA 白色",
 8058 |     ],
 8059 |     "materialCode": "PP",
 8060 |     "colorCode": "N",
 8061 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8062 |     "detailSlug": "barbed-fittings",
 8063 |     "detailHref": "/products/fittings/barbed-fittings",
 8064 |     "status": "active",
 8065 |     "sourceIndex": 111,
 8066 |     "sortOrder": 40111,
 8067 |     "searchKeywords": {
 8068 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-24D-16D-16D-PP-N 809380 2.4 mm 1.6 mm 1.6 mm PP 本色",
 8117 |     ],
 8118 |     "materialCode": "PA",
 8119 |     "colorCode": "W",
 8120 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8121 |     "detailSlug": "barbed-fittings",
 8122 |     "detailHref": "/products/fittings/barbed-fittings",
 8123 |     "status": "active",
 8124 |     "sourceIndex": 112,
 8125 |     "sortOrder": 40112,
 8126 |     "searchKeywords": {
 8127 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-24D-16D-16D-PA-W 809381 2.4 mm 1.6 mm 1.6 mm PA 白色",
 8176 |     ],
 8177 |     "materialCode": "PP",
 8178 |     "colorCode": "N",
 8179 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8180 |     "detailSlug": "barbed-fittings",
 8181 |     "detailHref": "/products/fittings/barbed-fittings",
 8182 |     "status": "active",
 8183 |     "sourceIndex": 113,
 8184 |     "sortOrder": 40113,
 8185 |     "searchKeywords": {
 8186 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-32D-PP-N 809430 3.2 mm 3.2 mm 3.2 mm PP 本色",
 8235 |     ],
 8236 |     "materialCode": "PA",
 8237 |     "colorCode": "W",
 8238 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8239 |     "detailSlug": "barbed-fittings",
 8240 |     "detailHref": "/products/fittings/barbed-fittings",
 8241 |     "status": "active",
 8242 |     "sourceIndex": 114,
 8243 |     "sortOrder": 40114,
 8244 |     "searchKeywords": {
 8245 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-32D-PA-W 809431 3.2 mm 3.2 mm 3.2 mm PA 白色",
 8294 |     ],
 8295 |     "materialCode": "PP",
 8296 |     "colorCode": "N",
 8297 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8298 |     "detailSlug": "barbed-fittings",
 8299 |     "detailHref": "/products/fittings/barbed-fittings",
 8300 |     "status": "active",
 8301 |     "sourceIndex": 115,
 8302 |     "sortOrder": 40115,
 8303 |     "searchKeywords": {
 8304 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-95X-PP-N 809432 9.5 mm 9.5 mm 9.5 mm PP 本色",
 8353 |     ],
 8354 |     "materialCode": "PA",
 8355 |     "colorCode": "W",
 8356 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8357 |     "detailSlug": "barbed-fittings",
 8358 |     "detailHref": "/products/fittings/barbed-fittings",
 8359 |     "status": "active",
 8360 |     "sourceIndex": 116,
 8361 |     "sortOrder": 40116,
 8362 |     "searchKeywords": {
 8363 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-95X-PA-W 809433 9.5 mm 9.5 mm 9.5 mm PA 白色",
 8412 |     ],
 8413 |     "materialCode": "PP",
 8414 |     "colorCode": "N",
 8415 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8416 |     "detailSlug": "barbed-fittings",
 8417 |     "detailHref": "/products/fittings/barbed-fittings",
 8418 |     "status": "active",
 8419 |     "sourceIndex": 117,
 8420 |     "sortOrder": 40117,
 8421 |     "searchKeywords": {
 8422 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-32D-16D-16D-PP-N 809434 3.2 mm 1.6 mm 1.6 mm PP 本色",
 8471 |     ],
 8472 |     "materialCode": "PA",
 8473 |     "colorCode": "W",
 8474 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8475 |     "detailSlug": "barbed-fittings",
 8476 |     "detailHref": "/products/fittings/barbed-fittings",
 8477 |     "status": "active",
 8478 |     "sourceIndex": 118,
 8479 |     "sortOrder": 40118,
 8480 |     "searchKeywords": {
 8481 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-32D-16D-16D-PA-W 809435 3.2 mm 1.6 mm 1.6 mm PA 白色",
 8530 |     ],
 8531 |     "materialCode": "PP",
 8532 |     "colorCode": "N",
 8533 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8534 |     "detailSlug": "barbed-fittings",
 8535 |     "detailHref": "/products/fittings/barbed-fittings",
 8536 |     "status": "active",
 8537 |     "sourceIndex": 119,
 8538 |     "sortOrder": 40119,
 8539 |     "searchKeywords": {
 8540 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-64D-32D-32D-PP-N 809436 6.4 mm 3.2 mm 3.2 mm PP 本色",
 8589 |     ],
 8590 |     "materialCode": "PA",
 8591 |     "colorCode": "W",
 8592 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8593 |     "detailSlug": "barbed-fittings",
 8594 |     "detailHref": "/products/fittings/barbed-fittings",
 8595 |     "status": "active",
 8596 |     "sourceIndex": 120,
 8597 |     "sortOrder": 40120,
 8598 |     "searchKeywords": {
 8599 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-64D-32D-32D-PA-W 809437 6.4 mm 3.2 mm 3.2 mm PA 白色",
 8648 |     ],
 8649 |     "materialCode": "PP",
 8650 |     "colorCode": "N",
 8651 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8652 |     "detailSlug": "barbed-fittings",
 8653 |     "detailHref": "/products/fittings/barbed-fittings",
 8654 |     "status": "active",
 8655 |     "sourceIndex": 121,
 8656 |     "sortOrder": 40121,
 8657 |     "searchKeywords": {
 8658 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-24D-PP-N 809608 2.4 mm 2.4 mm 2.4 mm PP 本色",
 8707 |     ],
 8708 |     "materialCode": "PA",
 8709 |     "colorCode": "W",
 8710 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8711 |     "detailSlug": "barbed-fittings",
 8712 |     "detailHref": "/products/fittings/barbed-fittings",
 8713 |     "status": "active",
 8714 |     "sourceIndex": 122,
 8715 |     "sortOrder": 40122,
 8716 |     "searchKeywords": {
 8717 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-24D-PA-W 809609 2.4 mm 2.4 mm 2.4 mm PA 白色",
 8766 |     ],
 8767 |     "materialCode": "PP",
 8768 |     "colorCode": "N",
 8769 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8770 |     "detailSlug": "barbed-fittings",
 8771 |     "detailHref": "/products/fittings/barbed-fittings",
 8772 |     "status": "active",
 8773 |     "sourceIndex": 123,
 8774 |     "sortOrder": 40123,
 8775 |     "searchKeywords": {
 8776 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-16D-PP-N 809623 1.6 mm 1.6 mm 1.6 mm PP 本色",
 8825 |     ],
 8826 |     "materialCode": "PA",
 8827 |     "colorCode": "W",
 8828 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8829 |     "detailSlug": "barbed-fittings",
 8830 |     "detailHref": "/products/fittings/barbed-fittings",
 8831 |     "status": "active",
 8832 |     "sourceIndex": 124,
 8833 |     "sortOrder": 40124,
 8834 |     "searchKeywords": {
 8835 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-16D-PA-W 809624 1.6 mm 1.6 mm 1.6 mm PA 白色",
 8884 |     ],
 8885 |     "materialCode": "PP",
 8886 |     "colorCode": "N",
 8887 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8888 |     "detailSlug": "barbed-fittings",
 8889 |     "detailHref": "/products/fittings/barbed-fittings",
 8890 |     "status": "active",
 8891 |     "sourceIndex": 125,
 8892 |     "sortOrder": 40125,
 8893 |     "searchKeywords": {
 8894 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-127V-PP-N 809646 12.7 mm 12.7 mm 12.7 mm PP 本色",
 8943 |     ],
 8944 |     "materialCode": "PP",
 8945 |     "colorCode": "N",
 8946 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 8947 |     "detailSlug": "barbed-fittings",
 8948 |     "detailHref": "/products/fittings/barbed-fittings",
 8949 |     "status": "active",
 8950 |     "sourceIndex": 126,
 8951 |     "sortOrder": 40126,
 8952 |     "searchKeywords": {
 8953 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-64-40-40-PP-N 806208 6.4 mm 4.0 mm 4.0 mm PP 本色",
 9002 |     ],
 9003 |     "materialCode": "PP",
 9004 |     "colorCode": "N",
 9005 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9006 |     "detailSlug": "barbed-fittings",
 9007 |     "detailHref": "/products/fittings/barbed-fittings",
 9008 |     "status": "active",
 9009 |     "sourceIndex": 127,
 9010 |     "sortOrder": 40127,
 9011 |     "searchKeywords": {
 9012 |       "zh": "倒刺接头 Y型倒刺接头 BY BY-79-PP-N 806282 7.9 mm 7.9 mm 7.9 mm PP 本色",
 9059 |     ],
 9060 |     "materialCode": "PP",
 9061 |     "colorCode": "N",
 9062 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9063 |     "detailSlug": "barbed-fittings",
 9064 |     "detailHref": "/products/fittings/barbed-fittings",
 9065 |     "status": "active",
 9066 |     "sourceIndex": 160,
 9067 |     "sortOrder": 50160,
 9068 |     "searchKeywords": {
 9069 |       "zh": "倒刺接头 π型倒刺接头 BF4 BF4-16-PP-N 806224 1.6 mm PP 本色",
 9116 |     ],
 9117 |     "materialCode": "PP",
 9118 |     "colorCode": "N",
 9119 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9120 |     "detailSlug": "barbed-fittings",
 9121 |     "detailHref": "/products/fittings/barbed-fittings",
 9122 |     "status": "active",
 9123 |     "sourceIndex": 161,
 9124 |     "sortOrder": 50161,
 9125 |     "searchKeywords": {
 9126 |       "zh": "倒刺接头 π型倒刺接头 BF4 BF4-24-PP-N 806055 2.4 mm PP 本色",
 9173 |     ],
 9174 |     "materialCode": "PP",
 9175 |     "colorCode": "N",
 9176 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9177 |     "detailSlug": "barbed-fittings",
 9178 |     "detailHref": "/products/fittings/barbed-fittings",
 9179 |     "status": "active",
 9180 |     "sourceIndex": 162,
 9181 |     "sortOrder": 50162,
 9182 |     "searchKeywords": {
 9183 |       "zh": "倒刺接头 π型倒刺接头 BF4 BF4-32-PP-N 806189 3.2 mm PP 本色",
 9230 |     ],
 9231 |     "materialCode": "PP",
 9232 |     "colorCode": "N",
 9233 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9234 |     "detailSlug": "barbed-fittings",
 9235 |     "detailHref": "/products/fittings/barbed-fittings",
 9236 |     "status": "active",
 9237 |     "sourceIndex": 163,
 9238 |     "sortOrder": 60163,
 9239 |     "searchKeywords": {
 9240 |       "zh": "倒刺接头 十字型倒刺接头 BX4 BX4-16-PP-N 806220 1.6 mm PP 本色",
 9287 |     ],
 9288 |     "materialCode": "PP",
 9289 |     "colorCode": "N",
 9290 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9291 |     "detailSlug": "barbed-fittings",
 9292 |     "detailHref": "/products/fittings/barbed-fittings",
 9293 |     "status": "active",
 9294 |     "sourceIndex": 164,
 9295 |     "sortOrder": 60164,
 9296 |     "searchKeywords": {
 9297 |       "zh": "倒刺接头 十字型倒刺接头 BX4 BX4-24-PP-N 806192 2.4 mm PP 本色",
 9344 |     ],
 9345 |     "materialCode": "PP",
 9346 |     "colorCode": "N",
 9347 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9348 |     "detailSlug": "barbed-fittings",
 9349 |     "detailHref": "/products/fittings/barbed-fittings",
 9350 |     "status": "active",
 9351 |     "sourceIndex": 165,
 9352 |     "sortOrder": 60165,
 9353 |     "searchKeywords": {
 9354 |       "zh": "倒刺接头 十字型倒刺接头 BX4 BX4-32-PP-N 806221 3.2 mm PP 本色",
 9401 |     ],
 9402 |     "materialCode": "PP",
 9403 |     "colorCode": "N",
 9404 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9405 |     "detailSlug": "barbed-fittings",
 9406 |     "detailHref": "/products/fittings/barbed-fittings",
 9407 |     "status": "active",
 9408 |     "sourceIndex": 154,
 9409 |     "sortOrder": 70154,
 9410 |     "searchKeywords": {
 9411 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-16D-PP-N 809283 1.6 mm PP 本色",
 9458 |     ],
 9459 |     "materialCode": "PP",
 9460 |     "colorCode": "N",
 9461 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9462 |     "detailSlug": "barbed-fittings",
 9463 |     "detailHref": "/products/fittings/barbed-fittings",
 9464 |     "status": "active",
 9465 |     "sourceIndex": 155,
 9466 |     "sortOrder": 70155,
 9467 |     "searchKeywords": {
 9468 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-24D-PP-N 809284 2.4 mm PP 本色",
 9515 |     ],
 9516 |     "materialCode": "PP",
 9517 |     "colorCode": "N",
 9518 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9519 |     "detailSlug": "barbed-fittings",
 9520 |     "detailHref": "/products/fittings/barbed-fittings",
 9521 |     "status": "active",
 9522 |     "sourceIndex": 156,
 9523 |     "sortOrder": 70156,
 9524 |     "searchKeywords": {
 9525 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-32D-PP-N 809285 3.2 mm PP 本色",
 9572 |     ],
 9573 |     "materialCode": "PA",
 9574 |     "colorCode": "W",
 9575 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9576 |     "detailSlug": "barbed-fittings",
 9577 |     "detailHref": "/products/fittings/barbed-fittings",
 9578 |     "status": "active",
 9579 |     "sourceIndex": 157,
 9580 |     "sortOrder": 70157,
 9581 |     "searchKeywords": {
 9582 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-16D-PA-W 809406 1.6 mm PA 白色",
 9629 |     ],
 9630 |     "materialCode": "PA",
 9631 |     "colorCode": "W",
 9632 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9633 |     "detailSlug": "barbed-fittings",
 9634 |     "detailHref": "/products/fittings/barbed-fittings",
 9635 |     "status": "active",
 9636 |     "sourceIndex": 158,
 9637 |     "sortOrder": 70158,
 9638 |     "searchKeywords": {
 9639 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-24D-PA-W 809407 2.4 mm PA 白色",
 9686 |     ],
 9687 |     "materialCode": "PA",
 9688 |     "colorCode": "W",
 9689 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 9690 |     "detailSlug": "barbed-fittings",
 9691 |     "detailHref": "/products/fittings/barbed-fittings",
 9692 |     "status": "active",
 9693 |     "sourceIndex": 159,
 9694 |     "sortOrder": 70159,
 9695 |     "searchKeywords": {
 9696 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-32D-PA-W 809408 3.2 mm PA 白色",
```

## data\products\selection\hard-tube-fitting-image-map.generated.json

```text
    1 | {
    2 |   "HF-M6-20-PK-N": {
    3 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
    4 |     "images": [
    5 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg"
    6 |     ],
    7 |     "sourceFiles": [
    8 |       "HF-M6-20-PK-N.jpg"
    9 |     ]
   10 |   },
   11 |   "HF-M6-20-PS-B": {
   12 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
   13 |     "images": [
   14 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg"
   15 |     ],
   16 |     "sourceFiles": [
   17 |       "HF-M6-20-PS-B.jpg"
   18 |     ]
   19 |   },
   20 |   "HF-M6-20-PV-N": {
   21 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
   22 |     "images": [
   23 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg"
   24 |     ],
   25 |     "sourceFiles": [
   26 |       "HF-M6-20-PV-N.jpg"
   27 |     ]
   28 |   },
   29 |   "HF-M6-25-PK-N": {
   30 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
   31 |     "images": [
   32 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg"
   33 |     ],
   34 |     "sourceFiles": [
   35 |       "HF-M6-25-PK-N.jpg"
   36 |     ]
   37 |   },
   38 |   "HF-M6-25-PS-B": {
   39 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
   40 |     "images": [
   41 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg"
   42 |     ],
   43 |     "sourceFiles": [
   44 |       "HF-M6-25-PS-B.jpg"
   45 |     ]
   46 |   },
   47 |   "HF-M6-25-PV-N": {
   48 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
   49 |     "images": [
   50 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg"
   51 |     ],
   52 |     "sourceFiles": [
   53 |       "HF-M6-25-PV-N.jpg"
   54 |     ]
   55 |   },
   56 |   "HF-M6-32-PK-N": {
   57 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
   58 |     "images": [
   59 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg"
   60 |     ],
   61 |     "sourceFiles": [
   62 |       "HF-M6-32-PK-N.jpg"
   63 |     ]
   64 |   },
   65 |   "HF-M6-32-PS-B": {
   66 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
   67 |     "images": [
   68 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg"
   69 |     ],
   70 |     "sourceFiles": [
   71 |       "HF-M6-32-PS-B.jpg"
   72 |     ]
   73 |   },
   74 |   "HF-M6-32-PV-N": {
   75 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
   76 |     "images": [
   77 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg"
   78 |     ],
   79 |     "sourceFiles": [
   80 |       "HF-M6-32-PV-N.jpg"
   81 |     ]
   82 |   },
   83 |   "HF-U28-20-PK-N": {
   84 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
   85 |     "images": [
   86 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg"
   87 |     ],
   88 |     "sourceFiles": [
   89 |       "HF-U28-20-PK-N.jpg"
   90 |     ]
   91 |   },
   92 |   "HF-U28-20-PS-B": {
   93 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
   94 |     "images": [
   95 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg"
   96 |     ],
   97 |     "sourceFiles": [
   98 |       "HF-U28-20-PS-B.jpg"
   99 |     ]
  100 |   },
  101 |   "HF-U28-20-PV-N": {
  102 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
  103 |     "images": [
  104 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg"
  105 |     ],
  106 |     "sourceFiles": [
  107 |       "HF-U28-20-PV-N.jpg"
  108 |     ]
  109 |   },
  110 |   "HF-U28-25-PK-N": {
  111 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
  112 |     "images": [
  113 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg"
  114 |     ],
  115 |     "sourceFiles": [
  116 |       "HF-U28-25-PK-N.jpg"
  117 |     ]
  118 |   },
  119 |   "HF-U28-25-PS-B": {
  120 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
  121 |     "images": [
  122 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg"
  123 |     ],
  124 |     "sourceFiles": [
  125 |       "HF-U28-25-PS-B.jpg"
  126 |     ]
  127 |   },
  128 |   "HF-U28-25-PV-N": {
  129 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
  130 |     "images": [
  131 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg"
  132 |     ],
  133 |     "sourceFiles": [
  134 |       "HF-U28-25-PV-N.jpg"
  135 |     ]
  136 |   },
  137 |   "HF-U28-32-PK-N": {
  138 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
  139 |     "images": [
  140 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg"
  141 |     ],
  142 |     "sourceFiles": [
  143 |       "HF-U28-32-PK-N.jpg"
  144 |     ]
  145 |   },
  146 |   "HF-U28-32-PS-B": {
  147 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
  148 |     "images": [
  149 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg"
  150 |     ],
  151 |     "sourceFiles": [
  152 |       "HF-U28-32-PS-B.jpg"
  153 |     ]
  154 |   },
  155 |   "HF-U28-32-PV-N": {
  156 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
  157 |     "images": [
  158 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg"
  159 |     ],
  160 |     "sourceFiles": [
  161 |       "HF-U28-32-PV-N.jpg"
  162 |     ]
  163 |   },
  164 |   "HF6-M6-20-PK-N": {
  165 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
  166 |     "images": [
  167 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg"
  168 |     ],
  169 |     "sourceFiles": [
  170 |       "HF6-M6-20-PK-N.jpg"
  171 |     ]
  172 |   },
  173 |   "HF6-M6-20-PS-B": {
  174 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
  175 |     "images": [
  176 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg"
  177 |     ],
  178 |     "sourceFiles": [
  179 |       "HF6-M6-20-PS-B.jpg"
  180 |     ]
  181 |   },
  182 |   "HF6-M6-20-PV-N": {
  183 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
  184 |     "images": [
  185 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg"
  186 |     ],
  187 |     "sourceFiles": [
  188 |       "HF6-M6-20-PV-N.jpg"
  189 |     ]
  190 |   },
  191 |   "HF6-M6-25-PK-N": {
  192 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
  193 |     "images": [
  194 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg"
  195 |     ],
  196 |     "sourceFiles": [
  197 |       "HF6-M6-25-PK-N.jpg"
  198 |     ]
  199 |   },
  200 |   "HF6-M6-25-PS-B": {
  201 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
  202 |     "images": [
  203 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg"
  204 |     ],
  205 |     "sourceFiles": [
  206 |       "HF6-M6-25-PS-B.jpg"
  207 |     ]
  208 |   },
  209 |   "HF6-M6-25-PV-N": {
  210 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
  211 |     "images": [
  212 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg"
  213 |     ],
  214 |     "sourceFiles": [
  215 |       "HF6-M6-25-PV-N.jpg"
  216 |     ]
  217 |   },
  218 |   "HF6-M6-32-PK-N": {
  219 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
  220 |     "images": [
  221 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg"
  222 |     ],
  223 |     "sourceFiles": [
  224 |       "HF6-M6-32-PK-N.jpg"
  225 |     ]
  226 |   },
  227 |   "HF6-M6-32-PS-B": {
  228 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
  229 |     "images": [
  230 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg"
  231 |     ],
  232 |     "sourceFiles": [
  233 |       "HF6-M6-32-PS-B.jpg"
  234 |     ]
  235 |   },
  236 |   "HF6-M6-32-PV-N": {
  237 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
  238 |     "images": [
  239 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg"
  240 |     ],
  241 |     "sourceFiles": [
  242 |       "HF6-M6-32-PV-N.jpg"
  243 |     ]
  244 |   },
  245 |   "HF6-U28-20-PK-N": {
  246 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
  247 |     "images": [
  248 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg"
  249 |     ],
  250 |     "sourceFiles": [
  251 |       "HF6-U28-20-PK-N.jpg"
  252 |     ]
  253 |   },
  254 |   "HF6-U28-20-PS-B": {
  255 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
  256 |     "images": [
  257 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg"
  258 |     ],
  259 |     "sourceFiles": [
  260 |       "HF6-U28-20-PS-B.jpg"
  261 |     ]
  262 |   },
  263 |   "HF6-U28-20-PV-N": {
  264 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
  265 |     "images": [
  266 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg"
  267 |     ],
  268 |     "sourceFiles": [
  269 |       "HF6-U28-20-PV-N.jpg"
  270 |     ]
  271 |   },
  272 |   "HF6-U28-25-PK-N": {
  273 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
  274 |     "images": [
  275 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg"
  276 |     ],
  277 |     "sourceFiles": [
  278 |       "HF6-U28-25-PK-N.jpg"
  279 |     ]
  280 |   },
  281 |   "HF6-U28-25-PS-B": {
  282 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
  283 |     "images": [
  284 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg"
  285 |     ],
  286 |     "sourceFiles": [
  287 |       "HF6-U28-25-PS-B.jpg"
  288 |     ]
  289 |   },
  290 |   "HF6-U28-25-PV-N": {
  291 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
  292 |     "images": [
  293 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg"
  294 |     ],
  295 |     "sourceFiles": [
  296 |       "HF6-U28-25-PV-N.jpg"
  297 |     ]
  298 |   },
  299 |   "HF6-U28-32-PK-N": {
  300 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
  301 |     "images": [
  302 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg"
  303 |     ],
  304 |     "sourceFiles": [
  305 |       "HF6-U28-32-PK-N.jpg"
  306 |     ]
  307 |   },
  308 |   "HF6-U28-32-PS-B": {
  309 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
  310 |     "images": [
  311 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg"
  312 |     ],
  313 |     "sourceFiles": [
  314 |       "HF6-U28-32-PS-B.jpg"
  315 |     ]
  316 |   },
  317 |   "HF6-U28-32-PV-N": {
  318 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
  319 |     "images": [
  320 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg"
  321 |     ],
  322 |     "sourceFiles": [
  323 |       "HF6-U28-32-PV-N.jpg"
  324 |     ]
  325 |   },
  326 |   "HFL-M6-16-PV-B": {
  327 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
  328 |     "images": [
  329 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg"
  330 |     ],
  331 |     "sourceFiles": [
  332 |       "HFL-M6-16-PV-B.jpg"
  333 |     ]
  334 |   },
  335 |   "HFL-M6-16-PV-N": {
  336 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
  337 |     "images": [
  338 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg"
  339 |     ],
  340 |     "sourceFiles": [
  341 |       "HFL-M6-16-PV-N.jpg"
  342 |     ]
  343 |   },
  344 |   "HFL-M6-20-PV-B": {
  345 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
  346 |     "images": [
  347 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg"
  348 |     ],
  349 |     "sourceFiles": [
  350 |       "HFL-M6-20-PV-B.jpg"
  351 |     ]
  352 |   },
  353 |   "HFL-M6-20-PV-N": {
  354 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
  355 |     "images": [
  356 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg"
  357 |     ],
  358 |     "sourceFiles": [
  359 |       "HFL-M6-20-PV-N.jpg"
  360 |     ]
  361 |   },
  362 |   "HFL-M6-25-PV-B": {
  363 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
  364 |     "images": [
  365 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg"
  366 |     ],
  367 |     "sourceFiles": [
  368 |       "HFL-M6-25-PV-B.jpg"
  369 |     ]
  370 |   },
  371 |   "HFL-M6-25-PV-N": {
  372 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
  373 |     "images": [
  374 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg"
  375 |     ],
  376 |     "sourceFiles": [
  377 |       "HFL-M6-25-PV-N.jpg"
  378 |     ]
  379 |   },
  380 |   "HFL-M6-30-PV-B": {
  381 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
  382 |     "images": [
  383 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg"
  384 |     ],
  385 |     "sourceFiles": [
  386 |       "HFL-M6-30-PV-B.jpg"
  387 |     ]
  388 |   },
  389 |   "HFL-M6-30-PV-N": {
  390 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
  391 |     "images": [
  392 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg"
  393 |     ],
  394 |     "sourceFiles": [
  395 |       "HFL-M6-30-PV-N.jpg"
  396 |     ]
  397 |   },
  398 |   "HFL-M6-32-PV-B": {
  399 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
  400 |     "images": [
  401 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg"
  402 |     ],
  403 |     "sourceFiles": [
  404 |       "HFL-M6-32-PV-B.jpg"
  405 |     ]
  406 |   },
  407 |   "HFL-M6-32-PV-N": {
  408 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
  409 |     "images": [
  410 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg"
  411 |     ],
  412 |     "sourceFiles": [
  413 |       "HFL-M6-32-PV-N.jpg"
  414 |     ]
  415 |   },
  416 |   "HFL-U28-16-PV-B": {
  417 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
  418 |     "images": [
  419 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg"
  420 |     ],
  421 |     "sourceFiles": [
  422 |       "HFL-U28-16-PV-B.jpg"
  423 |     ]
  424 |   },
  425 |   "HFL-U28-16-PV-N": {
  426 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
  427 |     "images": [
  428 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg"
  429 |     ],
  430 |     "sourceFiles": [
  431 |       "HFL-U28-16-PV-N.jpg"
  432 |     ]
  433 |   },
  434 |   "HFL-U28-20-PV-B": {
  435 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
  436 |     "images": [
  437 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg"
  438 |     ],
  439 |     "sourceFiles": [
  440 |       "HFL-U28-20-PV-B.jpg"
  441 |     ]
  442 |   },
  443 |   "HFL-U28-20-PV-N": {
  444 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
  445 |     "images": [
  446 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg"
  447 |     ],
  448 |     "sourceFiles": [
  449 |       "HFL-U28-20-PV-N.jpg"
  450 |     ]
  451 |   },
  452 |   "HFL-U28-25-PV-B": {
  453 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
  454 |     "images": [
  455 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg"
  456 |     ],
  457 |     "sourceFiles": [
  458 |       "HFL-U28-25-PV-B.jpg"
  459 |     ]
  460 |   },
  461 |   "HFL-U28-25-PV-N": {
  462 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
  463 |     "images": [
  464 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg"
  465 |     ],
  466 |     "sourceFiles": [
  467 |       "HFL-U28-25-PV-N.jpg"
  468 |     ]
  469 |   },
  470 |   "HFL-U28-30-PV-B": {
  471 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
  472 |     "images": [
  473 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg"
  474 |     ],
  475 |     "sourceFiles": [
  476 |       "HFL-U28-30-PV-B.jpg"
  477 |     ]
  478 |   },
  479 |   "HFL-U28-30-PV-N": {
  480 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
  481 |     "images": [
  482 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg"
  483 |     ],
  484 |     "sourceFiles": [
  485 |       "HFL-U28-30-PV-N.jpg"
  486 |     ]
  487 |   },
  488 |   "HFL-U28-32-PV-B": {
  489 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
  490 |     "images": [
  491 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg"
  492 |     ],
  493 |     "sourceFiles": [
  494 |       "HFL-U28-32-PV-B.jpg"
  495 |     ]
  496 |   },
  497 |   "HFL-U28-32-PV-N": {
  498 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
  499 |     "images": [
  500 |       "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg"
  501 |     ],
  502 |     "sourceFiles": [
  503 |       "HFL-U28-32-PV-N.jpg"
  504 |     ]
  505 |   },
  506 |   "HFL6-M6-16-PS-B": {
  507 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
  508 |     "images": [
  509 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
  510 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-ps-b-main.jpg"
  511 |     ],
  512 |     "sourceFiles": [
  513 |       "HFL6-M6-16-N.jpg",
  514 |       "HFL6-M6-16-PS-B.jpg"
  515 |     ]
  516 |   },
  517 |   "HFL6-M6-20-PS-B": {
  518 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
  519 |     "images": [
  520 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
  521 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-ps-b-main.jpg"
  522 |     ],
  523 |     "sourceFiles": [
  524 |       "HFL6-M6-20-N.jpg",
  525 |       "HFL6-M6-20-PS-B.jpg"
  526 |     ]
  527 |   },
  528 |   "HFL6-M6-25-PS-B": {
  529 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
  530 |     "images": [
  531 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
  532 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-ps-b-main.jpg"
  533 |     ],
  534 |     "sourceFiles": [
  535 |       "HFL6-M6-25-N.jpg",
  536 |       "HFL6-M6-25-PS-B.jpg"
  537 |     ]
  538 |   },
  539 |   "HFL6-M6-25-PS-U": {
  540 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
  541 |     "images": [
  542 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg"
  543 |     ],
  544 |     "sourceFiles": [
  545 |       "HFL6-M6-25-N.jpg"
  546 |     ]
  547 |   },
  548 |   "HFL6-M6-30-PS-B": {
  549 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
  550 |     "images": [
  551 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
  552 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-ps-b-main.jpg"
  553 |     ],
  554 |     "sourceFiles": [
  555 |       "HFL6-M6-30-N.jpg",
  556 |       "HFL6-M6-30-PS-B.jpg"
  557 |     ]
  558 |   },
  559 |   "HFL6-M6-32-PS-B": {
  560 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
  561 |     "images": [
  562 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
  563 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-ps-b-main.jpg"
  564 |     ],
  565 |     "sourceFiles": [
  566 |       "HFL6-M6-32-N.jpg",
  567 |       "HFL6-M6-32-PS-B.jpg"
  568 |     ]
  569 |   },
  570 |   "HFL6-U28-16-PS-B": {
  571 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
  572 |     "images": [
  573 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
  574 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-ps-b-main.jpg"
  575 |     ],
  576 |     "sourceFiles": [
  577 |       "HFL6-U28-16-N.jpg",
  578 |       "HFL6-U28-16-PS-B.jpg"
  579 |     ]
  580 |   },
  581 |   "HFL6-U28-16-PS-U": {
  582 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
  583 |     "images": [
  584 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg"
  585 |     ],
  586 |     "sourceFiles": [
  587 |       "HFL6-U28-16-N.jpg"
  588 |     ]
  589 |   },
  590 |   "HFL6-U28-20-PS-B": {
  591 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
  592 |     "images": [
  593 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
  594 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-ps-b-main.jpg"
  595 |     ],
  596 |     "sourceFiles": [
  597 |       "HFL6-U28-20-N.jpg",
  598 |       "HFL6-U28-20-PS-B.jpg"
  599 |     ]
  600 |   },
  601 |   "HFL6-U28-20-PS-U": {
  602 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
  603 |     "images": [
  604 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg"
  605 |     ],
  606 |     "sourceFiles": [
  607 |       "HFL6-U28-20-N.jpg"
  608 |     ]
  609 |   },
  610 |   "HFL6-U28-25-PS-B": {
  611 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
  612 |     "images": [
  613 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
  614 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-ps-b-main.jpg"
  615 |     ],
  616 |     "sourceFiles": [
  617 |       "HFL6-U28-25-N.jpg",
  618 |       "HFL6-U28-25-PS-B.jpg"
  619 |     ]
  620 |   },
  621 |   "HFL6-U28-30-PS-B": {
  622 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
  623 |     "images": [
  624 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
  625 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-ps-b-main.jpg"
  626 |     ],
  627 |     "sourceFiles": [
  628 |       "HFL6-U28-30-N.jpg",
  629 |       "HFL6-U28-30-PS-B.jpg"
  630 |     ]
  631 |   },
  632 |   "HFL6-U28-32-PS-B": {
  633 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
  634 |     "images": [
  635 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
  636 |       "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-ps-b-main.jpg"
  637 |     ],
  638 |     "sourceFiles": [
  639 |       "HFL6-U28-32-N.jpg",
  640 |       "HFL6-U28-32-PS-B.jpg"
  641 |     ]
  642 |   },
  643 |   "HN-M6-16-AC-B": {
  644 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg",
  645 |     "images": [
  646 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg"
  647 |     ],
  648 |     "sourceFiles": [
  649 |       "HN-M6-16-AC-B.jpg"
  650 |     ]
  651 |   },
  652 |   "HN-M6-16-PK-N": {
  653 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
  654 |     "images": [
  655 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg"
  656 |     ],
  657 |     "sourceFiles": [
  658 |       "HN-M6-16-PK-N.jpg"
  659 |     ]
  660 |   },
  661 |   "HN-M6-16-PS-B": {
  662 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg",
  663 |     "images": [
  664 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg"
  665 |     ],
  666 |     "sourceFiles": [
  667 |       "HN-M6-16-PS-B.jpg"
  668 |     ]
  669 |   },
  670 |   "HN-M6-16-PV-N": {
  671 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
  672 |     "images": [
  673 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg"
  674 |     ],
  675 |     "sourceFiles": [
  676 |       "HN-M6-16-PV-N.jpg"
  677 |     ]
  678 |   },
  679 |   "HN-M6-32-AC-B": {
  680 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg",
  681 |     "images": [
  682 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg"
  683 |     ],
  684 |     "sourceFiles": [
  685 |       "HN-M6-32-AC-B.jpg"
  686 |     ]
  687 |   },
  688 |   "HN-M6-32-PK-N": {
  689 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
  690 |     "images": [
  691 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg"
  692 |     ],
  693 |     "sourceFiles": [
  694 |       "HN-M6-32-PK-N.jpg"
  695 |     ]
  696 |   },
  697 |   "HN-M6-32-PS-B": {
  698 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg",
  699 |     "images": [
  700 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg"
  701 |     ],
  702 |     "sourceFiles": [
  703 |       "HN-M6-32-PS-B.jpg"
  704 |     ]
  705 |   },
  706 |   "HN-M6-32-PV-N": {
  707 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
  708 |     "images": [
  709 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg"
  710 |     ],
  711 |     "sourceFiles": [
  712 |       "HN-M6-32-PV-N.jpg"
  713 |     ]
  714 |   },
  715 |   "HN-U28-16-AC-B": {
  716 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg",
  717 |     "images": [
  718 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg"
  719 |     ],
  720 |     "sourceFiles": [
  721 |       "HN-U28-16-AC-B.jpg"
  722 |     ]
  723 |   },
  724 |   "HN-U28-16-PK-N": {
  725 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
  726 |     "images": [
  727 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg"
  728 |     ],
  729 |     "sourceFiles": [
  730 |       "HN-U28-16-PK-N.jpg"
  731 |     ]
  732 |   },
  733 |   "HN-U28-16-PS-B": {
  734 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg",
  735 |     "images": [
  736 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg"
  737 |     ],
  738 |     "sourceFiles": [
  739 |       "HN-U28-16-PS-B.jpg"
  740 |     ]
  741 |   },
  742 |   "HN-U28-16-PV-N": {
  743 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
  744 |     "images": [
  745 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg"
  746 |     ],
  747 |     "sourceFiles": [
  748 |       "HN-U28-16-PV-N.jpg"
  749 |     ]
  750 |   },
  751 |   "HN-U28-32-AC-B": {
  752 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg",
  753 |     "images": [
  754 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg"
  755 |     ],
  756 |     "sourceFiles": [
  757 |       "HN-U28-32-AC-B.jpg"
  758 |     ]
  759 |   },
  760 |   "HN-U28-32-PK-N": {
  761 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
  762 |     "images": [
  763 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg"
  764 |     ],
  765 |     "sourceFiles": [
  766 |       "HN-U28-32-PK-N.jpg"
  767 |     ]
  768 |   },
  769 |   "HN-U28-32-PS-B": {
  770 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg",
  771 |     "images": [
  772 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg"
  773 |     ],
  774 |     "sourceFiles": [
  775 |       "HN-U28-32-PS-B.jpg"
  776 |     ]
  777 |   },
  778 |   "HN-U28-32-PV-N": {
  779 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
  780 |     "images": [
  781 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg"
  782 |     ],
  783 |     "sourceFiles": [
  784 |       "HN-U28-32-PV-N.jpg"
  785 |     ]
  786 |   },
  787 |   "HN6-M6-16-AC-B": {
  788 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg",
  789 |     "images": [
  790 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg"
  791 |     ],
  792 |     "sourceFiles": [
  793 |       "HN6-M6-16-AC-B.jpg"
  794 |     ]
  795 |   },
  796 |   "HN6-M6-16-PK-N": {
  797 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
  798 |     "images": [
  799 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg"
  800 |     ],
  801 |     "sourceFiles": [
  802 |       "HN6-M6-16-PK-N.jpg"
  803 |     ]
  804 |   },
  805 |   "HN6-M6-16-PS-B": {
  806 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg",
  807 |     "images": [
  808 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg"
  809 |     ],
  810 |     "sourceFiles": [
  811 |       "HN6-M6-16-PS-B.jpg"
  812 |     ]
  813 |   },
  814 |   "HN6-M6-16-PV-N": {
  815 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
  816 |     "images": [
  817 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg"
  818 |     ],
  819 |     "sourceFiles": [
  820 |       "HN6-M6-16-PV-N.jpg"
  821 |     ]
  822 |   },
  823 |   "HN6-M6-32-AC-B": {
  824 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
  825 |     "images": [
  826 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
  827 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-main.jpg"
  828 |     ],
  829 |     "sourceFiles": [
  830 |       "HN6-M6-32-AC-B.jpg",
  831 |       "HN6-M6-32-PV-N.jpg"
  832 |     ]
  833 |   },
  834 |   "HN6-M6-32-PK-N": {
  835 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
  836 |     "images": [
  837 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
  838 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-main.jpg"
  839 |     ],
  840 |     "sourceFiles": [
  841 |       "HN6-M6-32-PK-N.jpg",
  842 |       "HN6-M6-32-PV-N.jpg"
  843 |     ]
  844 |   },
  845 |   "HN6-M6-32-PS-B": {
  846 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
  847 |     "images": [
  848 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
  849 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-main.jpg"
  850 |     ],
  851 |     "sourceFiles": [
  852 |       "HN6-M6-32-PS-B.jpg",
  853 |       "HN6-M6-32-PV-N.jpg"
  854 |     ]
  855 |   },
  856 |   "HN6-U28-16-AC-B": {
  857 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg",
  858 |     "images": [
  859 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg"
  860 |     ],
  861 |     "sourceFiles": [
  862 |       "HN6-U28-16-AC-B.jpg"
  863 |     ]
  864 |   },
  865 |   "HN6-U28-16-PK-N": {
  866 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
  867 |     "images": [
  868 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg"
  869 |     ],
  870 |     "sourceFiles": [
  871 |       "HN6-U28-16-PK-N.jpg"
  872 |     ]
  873 |   },
  874 |   "HN6-U28-16-PS-B": {
  875 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg",
  876 |     "images": [
  877 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg"
  878 |     ],
  879 |     "sourceFiles": [
  880 |       "HN6-U28-16-PS-B.jpg"
  881 |     ]
  882 |   },
  883 |   "HN6-U28-16-PV-N": {
  884 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
  885 |     "images": [
  886 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg"
  887 |     ],
  888 |     "sourceFiles": [
  889 |       "HN6-U28-16-PV-N.jpg"
  890 |     ]
  891 |   },
  892 |   "HN6-U28-32-AC-B": {
  893 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
  894 |     "images": [
  895 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
  896 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg"
  897 |     ],
  898 |     "sourceFiles": [
  899 |       "HN6-U28-32-AC-B.jpg",
  900 |       "HN6-U28-32-PK-N.jpg"
  901 |     ]
  902 |   },
  903 |   "HN6-U28-32-ET-N": {
  904 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
  905 |     "images": [
  906 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg"
  907 |     ],
  908 |     "sourceFiles": [
  909 |       "HN6-U28-32-PK-N.jpg"
  910 |     ]
  911 |   },
  912 |   "HN6-U28-32-PK-B": {
  913 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
  914 |     "images": [
  915 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg"
  916 |     ],
  917 |     "sourceFiles": [
  918 |       "HN6-U28-32-PK-N.jpg"
  919 |     ]
  920 |   },
  921 |   "HN6-U28-32-PS-B": {
  922 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
  923 |     "images": [
  924 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
  925 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ps-b-main.jpg"
  926 |     ],
  927 |     "sourceFiles": [
  928 |       "HN6-U28-32-PK-N.jpg",
  929 |       "HN6-U28-32-PS-B.jpg"
  930 |     ]
  931 |   },
  932 |   "HN6-U28-32-PV-N": {
  933 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
  934 |     "images": [
  935 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
  936 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-pv-n-main.jpg"
  937 |     ],
  938 |     "sourceFiles": [
  939 |       "HN6-U28-32-PK-N.jpg",
  940 |       "HN6-U28-32-PV-N.jpg"
  941 |     ]
  942 |   },
  943 |   "HNF-M6-16-PV-B": {
  944 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
  945 |     "images": [
  946 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg"
  947 |     ],
  948 |     "sourceFiles": [
  949 |       "HNF-M6-16-PV-B.jpg"
  950 |     ]
  951 |   },
  952 |   "HNF-M6-16-PV-N": {
  953 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
  954 |     "images": [
  955 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg"
  956 |     ],
  957 |     "sourceFiles": [
  958 |       "HNF-M6-16-PV-N.jpg"
  959 |     ]
  960 |   },
  961 |   "HNF-M6-20-PV-B": {
  962 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
  963 |     "images": [
  964 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg"
  965 |     ],
  966 |     "sourceFiles": [
  967 |       "HNF-M6-20-PV-B.jpg"
  968 |     ]
  969 |   },
  970 |   "HNF-M6-20-PV-N": {
  971 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
  972 |     "images": [
  973 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg"
  974 |     ],
  975 |     "sourceFiles": [
  976 |       "HNF-M6-20-PV-N.jpg"
  977 |     ]
  978 |   },
  979 |   "HNF-M6-25-PV-B": {
  980 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
  981 |     "images": [
  982 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg"
  983 |     ],
  984 |     "sourceFiles": [
  985 |       "HNF-M6-25-PV-B.jpg"
  986 |     ]
  987 |   },
  988 |   "HNF-M6-25-PV-N": {
  989 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
  990 |     "images": [
  991 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg"
  992 |     ],
  993 |     "sourceFiles": [
  994 |       "HNF-M6-25-PV-N.jpg"
  995 |     ]
  996 |   },
  997 |   "HNF-M6-30-PV-B": {
  998 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
  999 |     "images": [
 1000 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg"
 1001 |     ],
 1002 |     "sourceFiles": [
 1003 |       "HNF-M6-30-PV-B.jpg"
 1004 |     ]
 1005 |   },
 1006 |   "HNF-M6-30-PV-N": {
 1007 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
 1008 |     "images": [
 1009 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg"
 1010 |     ],
 1011 |     "sourceFiles": [
 1012 |       "HNF-M6-30-PV-N.jpg"
 1013 |     ]
 1014 |   },
 1015 |   "HNF-M6-32-PV-B": {
 1016 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
 1017 |     "images": [
 1018 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg"
 1019 |     ],
 1020 |     "sourceFiles": [
 1021 |       "HNF-M6-32-PV-B.jpg"
 1022 |     ]
 1023 |   },
 1024 |   "HNF-M6-32-PV-N": {
 1025 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
 1026 |     "images": [
 1027 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg"
 1028 |     ],
 1029 |     "sourceFiles": [
 1030 |       "HNF-M6-32-PV-N.jpg"
 1031 |     ]
 1032 |   },
 1033 |   "HNF-U28-16-PV-B": {
 1034 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
 1035 |     "images": [
 1036 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg"
 1037 |     ],
 1038 |     "sourceFiles": [
 1039 |       "HNF-U28-16-PV-B.jpg"
 1040 |     ]
 1041 |   },
 1042 |   "HNF-U28-16-PV-N": {
 1043 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
 1044 |     "images": [
 1045 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg"
 1046 |     ],
 1047 |     "sourceFiles": [
 1048 |       "HNF-U28-16-PV-N.jpg"
 1049 |     ]
 1050 |   },
 1051 |   "HNF-U28-20-PV-B": {
 1052 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
 1053 |     "images": [
 1054 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg"
 1055 |     ],
 1056 |     "sourceFiles": [
 1057 |       "HNF-U28-20-PV-B.jpg"
 1058 |     ]
 1059 |   },
 1060 |   "HNF-U28-20-PV-N": {
 1061 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
 1062 |     "images": [
 1063 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg"
 1064 |     ],
 1065 |     "sourceFiles": [
 1066 |       "HNF-U28-20-PV-N.jpg"
 1067 |     ]
 1068 |   },
 1069 |   "HNF-U28-25-PV-B": {
 1070 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
 1071 |     "images": [
 1072 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg"
 1073 |     ],
 1074 |     "sourceFiles": [
 1075 |       "HNF-U28-25-PV-B.jpg"
 1076 |     ]
 1077 |   },
 1078 |   "HNF-U28-25-PV-N": {
 1079 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
 1080 |     "images": [
 1081 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg"
 1082 |     ],
 1083 |     "sourceFiles": [
 1084 |       "HNF-U28-25-PV-N.jpg"
 1085 |     ]
 1086 |   },
 1087 |   "HNF-U28-30-PV-B": {
 1088 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
 1089 |     "images": [
 1090 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg"
 1091 |     ],
 1092 |     "sourceFiles": [
 1093 |       "HNF-U28-30-PV-B.jpg"
 1094 |     ]
 1095 |   },
 1096 |   "HNF-U28-30-PV-N": {
 1097 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
 1098 |     "images": [
 1099 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg"
 1100 |     ],
 1101 |     "sourceFiles": [
 1102 |       "HNF-U28-30-PV-N.jpg"
 1103 |     ]
 1104 |   },
 1105 |   "HNF-U28-32-PV-B": {
 1106 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
 1107 |     "images": [
 1108 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg"
 1109 |     ],
 1110 |     "sourceFiles": [
 1111 |       "HNF-U28-32-PV-B.jpg"
 1112 |     ]
 1113 |   },
 1114 |   "HNF-U28-32-PV-N": {
 1115 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
 1116 |     "images": [
 1117 |       "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg"
 1118 |     ],
 1119 |     "sourceFiles": [
 1120 |       "HNF-U28-32-PV-N.jpg"
 1121 |     ]
 1122 |   },
 1123 |   "HNF6-M6-16-PS-B": {
 1124 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
 1125 |     "images": [
 1126 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg"
 1127 |     ],
 1128 |     "sourceFiles": [
 1129 |       "HNF6-M6-16-B.jpg"
 1130 |     ]
 1131 |   },
 1132 |   "HNF6-M6-20-PS-B": {
 1133 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
 1134 |     "images": [
 1135 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg"
 1136 |     ],
 1137 |     "sourceFiles": [
 1138 |       "HNF6-M6-20-B.jpg"
 1139 |     ]
 1140 |   },
 1141 |   "HNF6-M6-25-PS-B": {
 1142 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
 1143 |     "images": [
 1144 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg"
 1145 |     ],
 1146 |     "sourceFiles": [
 1147 |       "HNF6-M6-25-B.jpg"
 1148 |     ]
 1149 |   },
 1150 |   "HNF6-M6-30-PS-B": {
 1151 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
 1152 |     "images": [
 1153 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg"
 1154 |     ],
 1155 |     "sourceFiles": [
 1156 |       "HNF6-M6-30-B.jpg"
 1157 |     ]
 1158 |   },
 1159 |   "HNF6-M6-32-PS-B": {
 1160 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
 1161 |     "images": [
 1162 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg"
 1163 |     ],
 1164 |     "sourceFiles": [
 1165 |       "HNF6-M6-32-B.jpg"
 1166 |     ]
 1167 |   },
 1168 |   "HNF6-U28-16-PS-B": {
 1169 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
 1170 |     "images": [
 1171 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg"
 1172 |     ],
 1173 |     "sourceFiles": [
 1174 |       "HNF6-U28-16-B.jpg"
 1175 |     ]
 1176 |   },
 1177 |   "HNF6-U28-16-PS-U": {
 1178 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
 1179 |     "images": [
 1180 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg"
 1181 |     ],
 1182 |     "sourceFiles": [
 1183 |       "HNF6-U28-16-B.jpg"
 1184 |     ]
 1185 |   },
 1186 |   "HNF6-U28-20-PS-B": {
 1187 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
 1188 |     "images": [
 1189 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg"
 1190 |     ],
 1191 |     "sourceFiles": [
 1192 |       "HNF6-U28-20-B.jpg"
 1193 |     ]
 1194 |   },
 1195 |   "HNF6-U28-20-PS-U": {
 1196 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
 1197 |     "images": [
 1198 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg"
 1199 |     ],
 1200 |     "sourceFiles": [
 1201 |       "HNF6-U28-20-B.jpg"
 1202 |     ]
 1203 |   },
 1204 |   "HNF6-U28-25-PS-B": {
 1205 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
 1206 |     "images": [
 1207 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg"
 1208 |     ],
 1209 |     "sourceFiles": [
 1210 |       "HNF6-U28-25-B.jpg"
 1211 |     ]
 1212 |   },
 1213 |   "HNF6-U28-30-PS-B": {
 1214 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
 1215 |     "images": [
 1216 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg"
 1217 |     ],
 1218 |     "sourceFiles": [
 1219 |       "HNF6-U28-30-B.jpg"
 1220 |     ]
 1221 |   },
 1222 |   "HNF6-U28-32-PS-B": {
 1223 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
 1224 |     "images": [
 1225 |       "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg"
 1226 |     ],
 1227 |     "sourceFiles": [
 1228 |       "HNF6-U28-32-B.jpg"
 1229 |     ]
 1230 |   },
 1231 |   "PNC-U32-16-PK-N": {
 1232 |     "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
 1233 |     "images": [
 1234 |       "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg"
 1235 |     ],
 1236 |     "sourceFiles": [
 1237 |       "PNC-U32-16-PK-N.jpg"
 1238 |     ]
 1239 |   },
 1240 |   "PNC6-U32-16-PK-N": {
 1241 |     "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
 1242 |     "images": [
 1243 |       "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
 1244 |       "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-02.jpg"
 1245 |     ],
 1246 |     "sourceFiles": [
 1247 |       "PNC6-U32-16-PK-N-1.jpg",
 1248 |       "PNC6-U32-16-PK-N.jpg"
 1249 |     ]
```

## data\products\selection\hard-tube-fitting-selection.generated.ts

```text
    1 | /* =========================================================
    2 |    hard-tube-fitting-selection.generated.ts
    3 |    由 FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx 自动生成
    4 | 
    5 |    数据范围：
    6 |    - 工作表：01_硬管接头
    7 |    - 包含：平底、卡箍、卡环和高压接头
    8 |    - 不包含：堵头、卡箍、卡环套件
    9 |    ========================================================= */
   10 | 
   11 | import type {
   17 | export const hardTubeFittingSelectionProducts =
   18 | [
   19 |   {
   20 |     "productId": "809746",
   21 |     "categoryId": "fittings",
   22 |     "productTypeId": "hard-tube-fittings",
   23 |     "seriesId": "standard-flat-bottom-fitting",
   24 |     "cardTitle": {
   25 |       "zh": "HF-M6-20-PV-N",
   26 |       "en": "HF-M6-20-PV-N"
   27 |     },
   34 |       "filter02": "M6×1",
   35 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
   36 |       "filter04": "PVDF",
   37 |       "filter05": "本色"
   38 |     },
   39 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
   40 |     "detailSlug": "hard-tube-fittings",
   41 |     "status": "active",
   42 |     "sortOrder": 1,
   43 |     "searchKeywords": {
   44 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-20-PV-N 809746 443-02-00412 新版标滚平底接头 M6×1 1.6–2.0 mm PVDF 本色",
   45 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-20-PV-N 809746 443-02-00412 M6×1 1.6–2.0 mm PVDF Natural"
   46 |     }
   47 |   },
   48 |   {
   49 |     "productId": "809747",
   50 |     "categoryId": "fittings",
   51 |     "productTypeId": "hard-tube-fittings",
   52 |     "seriesId": "standard-flat-bottom-fitting",
   53 |     "cardTitle": {
   54 |       "zh": "HF-M6-20-PS-B",
   55 |       "en": "HF-M6-20-PS-B"
   56 |     },
   63 |       "filter02": "M6×1",
   64 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
   65 |       "filter04": "PPS",
   66 |       "filter05": "黑色"
   67 |     },
   68 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
   69 |     "detailSlug": "hard-tube-fittings",
   70 |     "status": "active",
   71 |     "sortOrder": 2,
   72 |     "searchKeywords": {
   73 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-20-PS-B 809747 443-02-00413 新版标滚平底接头 M6×1 1.6–2.0 mm PPS 黑色",
   74 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-20-PS-B 809747 443-02-00413 M6×1 1.6–2.0 mm PPS Black"
   75 |     }
   76 |   },
   77 |   {
   78 |     "productId": "809717",
   79 |     "categoryId": "fittings",
   80 |     "productTypeId": "hard-tube-fittings",
   81 |     "seriesId": "standard-flat-bottom-fitting",
   82 |     "cardTitle": {
   83 |       "zh": "HF-M6-20-PK-N",
   84 |       "en": "HF-M6-20-PK-N"
   85 |     },
   92 |       "filter02": "M6×1",
   93 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
   94 |       "filter04": "PEEK",
   95 |       "filter05": "本色"
   96 |     },
   97 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
   98 |     "detailSlug": "hard-tube-fittings",
   99 |     "status": "active",
  100 |     "sortOrder": 3,
  101 |     "searchKeywords": {
  102 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-20-PK-N 809717 443-02-00359 新版标滚平底接头 M6×1 1.6–2.0 mm PEEK 本色",
  103 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-20-PK-N 809717 443-02-00359 M6×1 1.6–2.0 mm PEEK Natural"
  104 |     }
  105 |   },
  106 |   {
  107 |     "productId": "809748",
  108 |     "categoryId": "fittings",
  109 |     "productTypeId": "hard-tube-fittings",
  110 |     "seriesId": "standard-flat-bottom-fitting",
  111 |     "cardTitle": {
  112 |       "zh": "HF-M6-25-PV-N",
  113 |       "en": "HF-M6-25-PV-N"
  114 |     },
  121 |       "filter02": "M6×1",
  122 |       "filter03": "2.5 mm",
  123 |       "filter04": "PVDF",
  124 |       "filter05": "本色"
  125 |     },
  126 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
  127 |     "detailSlug": "hard-tube-fittings",
  128 |     "status": "active",
  129 |     "sortOrder": 4,
  130 |     "searchKeywords": {
  131 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-25-PV-N 809748 443-02-00414 新版标滚平底接头 M6×1 2.5 mm PVDF 本色",
  132 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-25-PV-N 809748 443-02-00414 M6×1 2.5 mm PVDF Natural"
  133 |     }
  134 |   },
  135 |   {
  136 |     "productId": "809749",
  137 |     "categoryId": "fittings",
  138 |     "productTypeId": "hard-tube-fittings",
  139 |     "seriesId": "standard-flat-bottom-fitting",
  140 |     "cardTitle": {
  141 |       "zh": "HF-M6-25-PS-B",
  142 |       "en": "HF-M6-25-PS-B"
  143 |     },
  150 |       "filter02": "M6×1",
  151 |       "filter03": "2.5 mm",
  152 |       "filter04": "PPS",
  153 |       "filter05": "黑色"
  154 |     },
  155 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
  156 |     "detailSlug": "hard-tube-fittings",
  157 |     "status": "active",
  158 |     "sortOrder": 5,
  159 |     "searchKeywords": {
  160 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-25-PS-B 809749 443-02-00415 新版标滚平底接头 M6×1 2.5 mm PPS 黑色",
  161 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-25-PS-B 809749 443-02-00415 M6×1 2.5 mm PPS Black"
  162 |     }
  163 |   },
  164 |   {
  165 |     "productId": "809718",
  166 |     "categoryId": "fittings",
  167 |     "productTypeId": "hard-tube-fittings",
  168 |     "seriesId": "standard-flat-bottom-fitting",
  169 |     "cardTitle": {
  170 |       "zh": "HF-M6-25-PK-N",
  171 |       "en": "HF-M6-25-PK-N"
  172 |     },
  179 |       "filter02": "M6×1",
  180 |       "filter03": "2.5 mm",
  181 |       "filter04": "PEEK",
  182 |       "filter05": "本色"
  183 |     },
  184 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
  185 |     "detailSlug": "hard-tube-fittings",
  186 |     "status": "active",
  187 |     "sortOrder": 6,
  188 |     "searchKeywords": {
  189 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-25-PK-N 809718 443-02-00360 新版标滚平底接头 M6×1 2.5 mm PEEK 本色",
  190 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-25-PK-N 809718 443-02-00360 M6×1 2.5 mm PEEK Natural"
  191 |     }
  192 |   },
  193 |   {
  194 |     "productId": "809750",
  195 |     "categoryId": "fittings",
  196 |     "productTypeId": "hard-tube-fittings",
  197 |     "seriesId": "standard-flat-bottom-fitting",
  198 |     "cardTitle": {
  199 |       "zh": "HF-M6-32-PV-N",
  200 |       "en": "HF-M6-32-PV-N"
  201 |     },
  208 |       "filter02": "M6×1",
  209 |       "filter03": "3.2 mm",
  210 |       "filter04": "PVDF",
  211 |       "filter05": "本色"
  212 |     },
  213 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
  214 |     "detailSlug": "hard-tube-fittings",
  215 |     "status": "active",
  216 |     "sortOrder": 7,
  217 |     "searchKeywords": {
  218 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-32-PV-N 809750 443-02-00416 新版标滚平底接头 M6×1 3.2 mm PVDF 本色",
  219 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-32-PV-N 809750 443-02-00416 M6×1 3.2 mm PVDF Natural"
  220 |     }
  221 |   },
  222 |   {
  223 |     "productId": "809751",
  224 |     "categoryId": "fittings",
  225 |     "productTypeId": "hard-tube-fittings",
  226 |     "seriesId": "standard-flat-bottom-fitting",
  227 |     "cardTitle": {
  228 |       "zh": "HF-M6-32-PS-B",
  229 |       "en": "HF-M6-32-PS-B"
  230 |     },
  237 |       "filter02": "M6×1",
  238 |       "filter03": "3.2 mm",
  239 |       "filter04": "PPS",
  240 |       "filter05": "黑色"
  241 |     },
  242 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
  243 |     "detailSlug": "hard-tube-fittings",
  244 |     "status": "active",
  245 |     "sortOrder": 8,
  246 |     "searchKeywords": {
  247 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-32-PS-B 809751 443-02-00417 新版标滚平底接头 M6×1 3.2 mm PPS 黑色",
  248 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-32-PS-B 809751 443-02-00417 M6×1 3.2 mm PPS Black"
  249 |     }
  250 |   },
  251 |   {
  252 |     "productId": "809719",
  253 |     "categoryId": "fittings",
  254 |     "productTypeId": "hard-tube-fittings",
  255 |     "seriesId": "standard-flat-bottom-fitting",
  256 |     "cardTitle": {
  257 |       "zh": "HF-M6-32-PK-N",
  258 |       "en": "HF-M6-32-PK-N"
  259 |     },
  266 |       "filter02": "M6×1",
  267 |       "filter03": "3.2 mm",
  268 |       "filter04": "PEEK",
  269 |       "filter05": "本色"
  270 |     },
  271 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
  272 |     "detailSlug": "hard-tube-fittings",
  273 |     "status": "active",
  274 |     "sortOrder": 9,
  275 |     "searchKeywords": {
  276 |       "zh": "硬管接头 标滚平底接头 HF HF-M6-32-PK-N 809719 443-02-00361 新版标滚平底接头 M6×1 3.2 mm PEEK 本色",
  277 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-M6-32-PK-N 809719 443-02-00361 M6×1 3.2 mm PEEK Natural"
  278 |     }
  279 |   },
  280 |   {
  281 |     "productId": "809740",
  282 |     "categoryId": "fittings",
  283 |     "productTypeId": "hard-tube-fittings",
  284 |     "seriesId": "standard-flat-bottom-fitting",
  285 |     "cardTitle": {
  286 |       "zh": "HF-U28-20-PV-N",
  287 |       "en": "HF-U28-20-PV-N"
  288 |     },
  295 |       "filter02": "1/4-28 UNF",
  296 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
  297 |       "filter04": "PVDF",
  298 |       "filter05": "本色"
  299 |     },
  300 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
  301 |     "detailSlug": "hard-tube-fittings",
  302 |     "status": "active",
  303 |     "sortOrder": 10,
  304 |     "searchKeywords": {
  305 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-20-PV-N 809740 443-02-00406 新版标滚平底接头 1/4-28 UNF 1.6–2.0 mm PVDF 本色",
  306 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-20-PV-N 809740 443-02-00406 1/4-28 UNF 1.6–2.0 mm PVDF Natural"
  307 |     }
  308 |   },
  309 |   {
  310 |     "productId": "809741",
  311 |     "categoryId": "fittings",
  312 |     "productTypeId": "hard-tube-fittings",
  313 |     "seriesId": "standard-flat-bottom-fitting",
  314 |     "cardTitle": {
  315 |       "zh": "HF-U28-20-PS-B",
  316 |       "en": "HF-U28-20-PS-B"
  317 |     },
  324 |       "filter02": "1/4-28 UNF",
  325 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
  326 |       "filter04": "PPS",
  327 |       "filter05": "黑色"
  328 |     },
  329 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
  330 |     "detailSlug": "hard-tube-fittings",
  331 |     "status": "active",
  332 |     "sortOrder": 11,
  333 |     "searchKeywords": {
  334 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-20-PS-B 809741 443-02-00407 新版标滚平底接头 1/4-28 UNF 1.6–2.0 mm PPS 黑色",
  335 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-20-PS-B 809741 443-02-00407 1/4-28 UNF 1.6–2.0 mm PPS Black"
  336 |     }
  337 |   },
  338 |   {
  339 |     "productId": "809714",
  340 |     "categoryId": "fittings",
  341 |     "productTypeId": "hard-tube-fittings",
  342 |     "seriesId": "standard-flat-bottom-fitting",
  343 |     "cardTitle": {
  344 |       "zh": "HF-U28-20-PK-N",
  345 |       "en": "HF-U28-20-PK-N"
  346 |     },
  353 |       "filter02": "1/4-28 UNF",
  354 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
  355 |       "filter04": "PEEK",
  356 |       "filter05": "本色"
  357 |     },
  358 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
  359 |     "detailSlug": "hard-tube-fittings",
  360 |     "status": "active",
  361 |     "sortOrder": 12,
  362 |     "searchKeywords": {
  363 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-20-PK-N 809714 443-02-00356 新版标滚平底接头 1/4-28 UNF 1.6–2.0 mm PEEK 本色",
  364 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-20-PK-N 809714 443-02-00356 1/4-28 UNF 1.6–2.0 mm PEEK Natural"
  365 |     }
  366 |   },
  367 |   {
  368 |     "productId": "809742",
  369 |     "categoryId": "fittings",
  370 |     "productTypeId": "hard-tube-fittings",
  371 |     "seriesId": "standard-flat-bottom-fitting",
  372 |     "cardTitle": {
  373 |       "zh": "HF-U28-25-PV-N",
  374 |       "en": "HF-U28-25-PV-N"
  375 |     },
  382 |       "filter02": "1/4-28 UNF",
  383 |       "filter03": "2.5 mm",
  384 |       "filter04": "PVDF",
  385 |       "filter05": "本色"
  386 |     },
  387 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
  388 |     "detailSlug": "hard-tube-fittings",
  389 |     "status": "active",
  390 |     "sortOrder": 13,
  391 |     "searchKeywords": {
  392 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-25-PV-N 809742 443-02-00408 新版标滚平底接头 1/4-28 UNF 2.5 mm PVDF 本色",
  393 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-25-PV-N 809742 443-02-00408 1/4-28 UNF 2.5 mm PVDF Natural"
  394 |     }
  395 |   },
  396 |   {
  397 |     "productId": "809743",
  398 |     "categoryId": "fittings",
  399 |     "productTypeId": "hard-tube-fittings",
  400 |     "seriesId": "standard-flat-bottom-fitting",
  401 |     "cardTitle": {
  402 |       "zh": "HF-U28-25-PS-B",
  403 |       "en": "HF-U28-25-PS-B"
  404 |     },
  411 |       "filter02": "1/4-28 UNF",
  412 |       "filter03": "2.5 mm",
  413 |       "filter04": "PPS",
  414 |       "filter05": "黑色"
  415 |     },
  416 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
  417 |     "detailSlug": "hard-tube-fittings",
  418 |     "status": "active",
  419 |     "sortOrder": 14,
  420 |     "searchKeywords": {
  421 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-25-PS-B 809743 443-02-00409 新版标滚平底接头 1/4-28 UNF 2.5 mm PPS 黑色",
  422 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-25-PS-B 809743 443-02-00409 1/4-28 UNF 2.5 mm PPS Black"
  423 |     }
  424 |   },
  425 |   {
  426 |     "productId": "809715",
  427 |     "categoryId": "fittings",
  428 |     "productTypeId": "hard-tube-fittings",
  429 |     "seriesId": "standard-flat-bottom-fitting",
  430 |     "cardTitle": {
  431 |       "zh": "HF-U28-25-PK-N",
  432 |       "en": "HF-U28-25-PK-N"
  433 |     },
  440 |       "filter02": "1/4-28 UNF",
  441 |       "filter03": "2.5 mm",
  442 |       "filter04": "PEEK",
  443 |       "filter05": "本色"
  444 |     },
  445 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
  446 |     "detailSlug": "hard-tube-fittings",
  447 |     "status": "active",
  448 |     "sortOrder": 15,
  449 |     "searchKeywords": {
  450 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-25-PK-N 809715 443-02-00357 新版标滚平底接头 1/4-28 UNF 2.5 mm PEEK 本色",
  451 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-25-PK-N 809715 443-02-00357 1/4-28 UNF 2.5 mm PEEK Natural"
  452 |     }
  453 |   },
  454 |   {
  455 |     "productId": "809744",
  456 |     "categoryId": "fittings",
  457 |     "productTypeId": "hard-tube-fittings",
  458 |     "seriesId": "standard-flat-bottom-fitting",
  459 |     "cardTitle": {
  460 |       "zh": "HF-U28-32-PV-N",
  461 |       "en": "HF-U28-32-PV-N"
  462 |     },
  469 |       "filter02": "1/4-28 UNF",
  470 |       "filter03": "3.2 mm",
  471 |       "filter04": "PVDF",
  472 |       "filter05": "本色"
  473 |     },
  474 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
  475 |     "detailSlug": "hard-tube-fittings",
  476 |     "status": "active",
  477 |     "sortOrder": 16,
  478 |     "searchKeywords": {
  479 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-32-PV-N 809744 443-02-00410 新版标滚平底接头 1/4-28 UNF 3.2 mm PVDF 本色",
  480 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-32-PV-N 809744 443-02-00410 1/4-28 UNF 3.2 mm PVDF Natural"
  481 |     }
  482 |   },
  483 |   {
  484 |     "productId": "809745",
  485 |     "categoryId": "fittings",
  486 |     "productTypeId": "hard-tube-fittings",
  487 |     "seriesId": "standard-flat-bottom-fitting",
  488 |     "cardTitle": {
  489 |       "zh": "HF-U28-32-PS-B",
  490 |       "en": "HF-U28-32-PS-B"
  491 |     },
  498 |       "filter02": "1/4-28 UNF",
  499 |       "filter03": "3.2 mm",
  500 |       "filter04": "PPS",
  501 |       "filter05": "黑色"
  502 |     },
  503 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
  504 |     "detailSlug": "hard-tube-fittings",
  505 |     "status": "active",
  506 |     "sortOrder": 17,
  507 |     "searchKeywords": {
  508 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-32-PS-B 809745 443-02-00411 新版标滚平底接头 1/4-28 UNF 3.2 mm PPS 黑色",
  509 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-32-PS-B 809745 443-02-00411 1/4-28 UNF 3.2 mm PPS Black"
  510 |     }
  511 |   },
  512 |   {
  513 |     "productId": "809716",
  514 |     "categoryId": "fittings",
  515 |     "productTypeId": "hard-tube-fittings",
  516 |     "seriesId": "standard-flat-bottom-fitting",
  517 |     "cardTitle": {
  518 |       "zh": "HF-U28-32-PK-N",
  519 |       "en": "HF-U28-32-PK-N"
  520 |     },
  527 |       "filter02": "1/4-28 UNF",
  528 |       "filter03": "3.2 mm",
  529 |       "filter04": "PEEK",
  530 |       "filter05": "本色"
  531 |     },
  532 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
  533 |     "detailSlug": "hard-tube-fittings",
  534 |     "status": "active",
  535 |     "sortOrder": 18,
  536 |     "searchKeywords": {
  537 |       "zh": "硬管接头 标滚平底接头 HF HF-U28-32-PK-N 809716 443-02-00358 新版标滚平底接头 1/4-28 UNF 3.2 mm PEEK 本色",
  538 |       "en": "hard tube fitting Standard Flanged Fitting HF HF-U28-32-PK-N 809716 443-02-00358 1/4-28 UNF 3.2 mm PEEK Natural"
  539 |     }
  540 |   },
  541 |   {
  542 |     "productId": "809032",
  543 |     "categoryId": "fittings",
  544 |     "productTypeId": "hard-tube-fittings",
  545 |     "seriesId": "standard-flat-bottom-fitting",
  546 |     "cardTitle": {
  547 |       "zh": "HFL-M6-16-PV-N",
  548 |       "en": "HFL-M6-16-PV-N"
  549 |     },
  556 |       "filter02": "M6×1",
  557 |       "filter03": "1.6 mm",
  558 |       "filter04": "PVDF",
  559 |       "filter05": "本色"
  560 |     },
  561 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
  562 |     "detailSlug": "hard-tube-fittings",
  563 |     "status": "active",
  564 |     "sortOrder": 19,
  565 |     "searchKeywords": {
  566 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-16-PV-N 809032 443-00-00201 旧版标滚平底接头 M6×1 1.6 mm PVDF 本色",
  567 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-16-PV-N 809032 443-00-00201 M6×1 1.6 mm PVDF Natural"
  568 |     }
  569 |   },
  570 |   {
  571 |     "productId": "809421",
  572 |     "categoryId": "fittings",
  573 |     "productTypeId": "hard-tube-fittings",
  574 |     "seriesId": "standard-flat-bottom-fitting",
  575 |     "cardTitle": {
  576 |       "zh": "HFL-M6-16-PV-B",
  577 |       "en": "HFL-M6-16-PV-B"
  578 |     },
  585 |       "filter02": "M6×1",
  586 |       "filter03": "1.6 mm",
  587 |       "filter04": "PVDF",
  588 |       "filter05": "黑色"
  589 |     },
  590 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
  591 |     "detailSlug": "hard-tube-fittings",
  592 |     "status": "active",
  593 |     "sortOrder": 20,
  594 |     "searchKeywords": {
  595 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-16-PV-B 809421 443-01-00164 旧版标滚平底接头 M6×1 1.6 mm PVDF 黑色",
  596 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-16-PV-B 809421 443-01-00164 M6×1 1.6 mm PVDF Black"
  597 |     }
  598 |   },
  599 |   {
  600 |     "productId": "809043",
  601 |     "categoryId": "fittings",
  602 |     "productTypeId": "hard-tube-fittings",
  603 |     "seriesId": "standard-flat-bottom-fitting",
  604 |     "cardTitle": {
  605 |       "zh": "HFL-M6-20-PV-N",
  606 |       "en": "HFL-M6-20-PV-N"
  607 |     },
  614 |       "filter02": "M6×1",
  615 |       "filter03": "2.0 mm",
  616 |       "filter04": "PVDF",
  617 |       "filter05": "本色"
  618 |     },
  619 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
  620 |     "detailSlug": "hard-tube-fittings",
  621 |     "status": "active",
  622 |     "sortOrder": 21,
  623 |     "searchKeywords": {
  624 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-20-PV-N 809043 443-00-00204 旧版标滚平底接头 M6×1 2.0 mm PVDF 本色",
  625 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-20-PV-N 809043 443-00-00204 M6×1 2.0 mm PVDF Natural"
  626 |     }
  627 |   },
  628 |   {
  629 |     "productId": "809044",
  630 |     "categoryId": "fittings",
  631 |     "productTypeId": "hard-tube-fittings",
  632 |     "seriesId": "standard-flat-bottom-fitting",
  633 |     "cardTitle": {
  634 |       "zh": "HFL-M6-20-PV-B",
  635 |       "en": "HFL-M6-20-PV-B"
  636 |     },
  643 |       "filter02": "M6×1",
  644 |       "filter03": "2.0 mm",
  645 |       "filter04": "PVDF",
  646 |       "filter05": "黑色"
  647 |     },
  648 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
  649 |     "detailSlug": "hard-tube-fittings",
  650 |     "status": "active",
  651 |     "sortOrder": 22,
  652 |     "searchKeywords": {
  653 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-20-PV-B 809044 443-01-00005 旧版标滚平底接头 M6×1 2.0 mm PVDF 黑色",
  654 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-20-PV-B 809044 443-01-00005 M6×1 2.0 mm PVDF Black"
  655 |     }
  656 |   },
  657 |   {
  658 |     "productId": "809054",
  659 |     "categoryId": "fittings",
  660 |     "productTypeId": "hard-tube-fittings",
  661 |     "seriesId": "standard-flat-bottom-fitting",
  662 |     "cardTitle": {
  663 |       "zh": "HFL-M6-25-PV-N",
  664 |       "en": "HFL-M6-25-PV-N"
  665 |     },
  672 |       "filter02": "M6×1",
  673 |       "filter03": "2.5 mm",
  674 |       "filter04": "PVDF",
  675 |       "filter05": "本色"
  676 |     },
  677 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
  678 |     "detailSlug": "hard-tube-fittings",
  679 |     "status": "active",
  680 |     "sortOrder": 23,
  681 |     "searchKeywords": {
  682 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-25-PV-N 809054 443-00-00202 旧版标滚平底接头 M6×1 2.5 mm PVDF 本色",
  683 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-25-PV-N 809054 443-00-00202 M6×1 2.5 mm PVDF Natural"
  684 |     }
  685 |   },
  686 |   {
  687 |     "productId": "809422",
  688 |     "categoryId": "fittings",
  689 |     "productTypeId": "hard-tube-fittings",
  690 |     "seriesId": "standard-flat-bottom-fitting",
  691 |     "cardTitle": {
  692 |       "zh": "HFL-M6-25-PV-B",
  693 |       "en": "HFL-M6-25-PV-B"
  694 |     },
  701 |       "filter02": "M6×1",
  702 |       "filter03": "2.5 mm",
  703 |       "filter04": "PVDF",
  704 |       "filter05": "黑色"
  705 |     },
  706 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
  707 |     "detailSlug": "hard-tube-fittings",
  708 |     "status": "active",
  709 |     "sortOrder": 24,
  710 |     "searchKeywords": {
  711 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-25-PV-B 809422 443-01-00165 旧版标滚平底接头 M6×1 2.5 mm PVDF 黑色",
  712 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-25-PV-B 809422 443-01-00165 M6×1 2.5 mm PVDF Black"
  713 |     }
  714 |   },
  715 |   {
  716 |     "productId": "809048",
  717 |     "categoryId": "fittings",
  718 |     "productTypeId": "hard-tube-fittings",
  719 |     "seriesId": "standard-flat-bottom-fitting",
  720 |     "cardTitle": {
  721 |       "zh": "HFL-M6-30-PV-N",
  722 |       "en": "HFL-M6-30-PV-N"
  723 |     },
  730 |       "filter02": "M6×1",
  731 |       "filter03": "3.0 mm",
  732 |       "filter04": "PVDF",
  733 |       "filter05": "本色"
  734 |     },
  735 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
  736 |     "detailSlug": "hard-tube-fittings",
  737 |     "status": "active",
  738 |     "sortOrder": 25,
  739 |     "searchKeywords": {
  740 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-30-PV-N 809048 443-00-00227 旧版标滚平底接头 M6×1 3.0 mm PVDF 本色",
  741 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-30-PV-N 809048 443-00-00227 M6×1 3.0 mm PVDF Natural"
  742 |     }
  743 |   },
  744 |   {
  745 |     "productId": "809049",
  746 |     "categoryId": "fittings",
  747 |     "productTypeId": "hard-tube-fittings",
  748 |     "seriesId": "standard-flat-bottom-fitting",
  749 |     "cardTitle": {
  750 |       "zh": "HFL-M6-30-PV-B",
  751 |       "en": "HFL-M6-30-PV-B"
  752 |     },
  759 |       "filter02": "M6×1",
  760 |       "filter03": "3.0 mm",
  761 |       "filter04": "PVDF",
  762 |       "filter05": "黑色"
  763 |     },
  764 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
  765 |     "detailSlug": "hard-tube-fittings",
  766 |     "status": "active",
  767 |     "sortOrder": 26,
  768 |     "searchKeywords": {
  769 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-30-PV-B 809049 443-01-00006 旧版标滚平底接头 M6×1 3.0 mm PVDF 黑色",
  770 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-30-PV-B 809049 443-01-00006 M6×1 3.0 mm PVDF Black"
  771 |     }
  772 |   },
  773 |   {
  774 |     "productId": "809037",
  775 |     "categoryId": "fittings",
  776 |     "productTypeId": "hard-tube-fittings",
  777 |     "seriesId": "standard-flat-bottom-fitting",
  778 |     "cardTitle": {
  779 |       "zh": "HFL-M6-32-PV-N",
  780 |       "en": "HFL-M6-32-PV-N"
  781 |     },
  788 |       "filter02": "M6×1",
  789 |       "filter03": "3.2 mm",
  790 |       "filter04": "PVDF",
  791 |       "filter05": "本色"
  792 |     },
  793 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
  794 |     "detailSlug": "hard-tube-fittings",
  795 |     "status": "active",
  796 |     "sortOrder": 27,
  797 |     "searchKeywords": {
  798 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-32-PV-N 809037 443-00-00203 旧版标滚平底接头 M6×1 3.2 mm PVDF 本色",
  799 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-32-PV-N 809037 443-00-00203 M6×1 3.2 mm PVDF Natural"
  800 |     }
  801 |   },
  802 |   {
  803 |     "productId": "809423",
  804 |     "categoryId": "fittings",
  805 |     "productTypeId": "hard-tube-fittings",
  806 |     "seriesId": "standard-flat-bottom-fitting",
  807 |     "cardTitle": {
  808 |       "zh": "HFL-M6-32-PV-B",
  809 |       "en": "HFL-M6-32-PV-B"
  810 |     },
  817 |       "filter02": "M6×1",
  818 |       "filter03": "3.2 mm",
  819 |       "filter04": "PVDF",
  820 |       "filter05": "黑色"
  821 |     },
  822 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
  823 |     "detailSlug": "hard-tube-fittings",
  824 |     "status": "active",
  825 |     "sortOrder": 28,
  826 |     "searchKeywords": {
  827 |       "zh": "硬管接头 标滚平底接头 HFL HFL-M6-32-PV-B 809423 443-01-00166 旧版标滚平底接头 M6×1 3.2 mm PVDF 黑色",
  828 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-M6-32-PV-B 809423 443-01-00166 M6×1 3.2 mm PVDF Black"
  829 |     }
  830 |   },
  831 |   {
  832 |     "productId": "809030",
  833 |     "categoryId": "fittings",
  834 |     "productTypeId": "hard-tube-fittings",
  835 |     "seriesId": "standard-flat-bottom-fitting",
  836 |     "cardTitle": {
  837 |       "zh": "HFL-U28-16-PV-N",
  838 |       "en": "HFL-U28-16-PV-N"
  839 |     },
  846 |       "filter02": "1/4-28 UNF",
  847 |       "filter03": "1.6 mm",
  848 |       "filter04": "PVDF",
  849 |       "filter05": "本色"
  850 |     },
  851 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
  852 |     "detailSlug": "hard-tube-fittings",
  853 |     "status": "active",
  854 |     "sortOrder": 29,
  855 |     "searchKeywords": {
  856 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-16-PV-N 809030 443-00-00056 旧版标滚平底接头 1/4-28 UNF 1.6 mm PVDF 本色",
  857 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-16-PV-N 809030 443-00-00056 1/4-28 UNF 1.6 mm PVDF Natural"
  858 |     }
  859 |   },
  860 |   {
  861 |     "productId": "809391",
  862 |     "categoryId": "fittings",
  863 |     "productTypeId": "hard-tube-fittings",
  864 |     "seriesId": "standard-flat-bottom-fitting",
  865 |     "cardTitle": {
  866 |       "zh": "HFL-U28-16-PV-B",
  867 |       "en": "HFL-U28-16-PV-B"
  868 |     },
  875 |       "filter02": "1/4-28 UNF",
  876 |       "filter03": "1.6 mm",
  877 |       "filter04": "PVDF",
  878 |       "filter05": "黑色"
  879 |     },
  880 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
  881 |     "detailSlug": "hard-tube-fittings",
  882 |     "status": "active",
  883 |     "sortOrder": 30,
  884 |     "searchKeywords": {
  885 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-16-PV-B 809391 443-00-00078 旧版标滚平底接头 1/4-28 UNF 1.6 mm PVDF 黑色",
  886 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-16-PV-B 809391 443-00-00078 1/4-28 UNF 1.6 mm PVDF Black"
  887 |     }
  888 |   },
  889 |   {
  890 |     "productId": "809040",
  891 |     "categoryId": "fittings",
  892 |     "productTypeId": "hard-tube-fittings",
  893 |     "seriesId": "standard-flat-bottom-fitting",
  894 |     "cardTitle": {
  895 |       "zh": "HFL-U28-20-PV-N",
  896 |       "en": "HFL-U28-20-PV-N"
  897 |     },
  904 |       "filter02": "1/4-28 UNF",
  905 |       "filter03": "2.0 mm",
  906 |       "filter04": "PVDF",
  907 |       "filter05": "本色"
  908 |     },
  909 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
  910 |     "detailSlug": "hard-tube-fittings",
  911 |     "status": "active",
  912 |     "sortOrder": 31,
  913 |     "searchKeywords": {
  914 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-20-PV-N 809040 443-00-00222 旧版标滚平底接头 1/4-28 UNF 2.0 mm PVDF 本色",
  915 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-20-PV-N 809040 443-00-00222 1/4-28 UNF 2.0 mm PVDF Natural"
  916 |     }
  917 |   },
  918 |   {
  919 |     "productId": "809041",
  920 |     "categoryId": "fittings",
  921 |     "productTypeId": "hard-tube-fittings",
  922 |     "seriesId": "standard-flat-bottom-fitting",
  923 |     "cardTitle": {
  924 |       "zh": "HFL-U28-20-PV-B",
  925 |       "en": "HFL-U28-20-PV-B"
  926 |     },
  933 |       "filter02": "1/4-28 UNF",
  934 |       "filter03": "2.0 mm",
  935 |       "filter04": "PVDF",
  936 |       "filter05": "黑色"
  937 |     },
  938 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
  939 |     "detailSlug": "hard-tube-fittings",
  940 |     "status": "active",
  941 |     "sortOrder": 32,
  942 |     "searchKeywords": {
  943 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-20-PV-B 809041 443-00-00522 旧版标滚平底接头 1/4-28 UNF 2.0 mm PVDF 黑色",
  944 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-20-PV-B 809041 443-00-00522 1/4-28 UNF 2.0 mm PVDF Black"
  945 |     }
  946 |   },
  947 |   {
  948 |     "productId": "809052",
  949 |     "categoryId": "fittings",
  950 |     "productTypeId": "hard-tube-fittings",
  951 |     "seriesId": "standard-flat-bottom-fitting",
  952 |     "cardTitle": {
  953 |       "zh": "HFL-U28-25-PV-N",
  954 |       "en": "HFL-U28-25-PV-N"
  955 |     },
  962 |       "filter02": "1/4-28 UNF",
  963 |       "filter03": "2.5 mm",
  964 |       "filter04": "PVDF",
  965 |       "filter05": "本色"
  966 |     },
  967 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
  968 |     "detailSlug": "hard-tube-fittings",
  969 |     "status": "active",
  970 |     "sortOrder": 33,
  971 |     "searchKeywords": {
  972 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-25-PV-N 809052 443-00-00221 旧版标滚平底接头 1/4-28 UNF 2.5 mm PVDF 本色",
  973 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-25-PV-N 809052 443-00-00221 1/4-28 UNF 2.5 mm PVDF Natural"
  974 |     }
  975 |   },
  976 |   {
  977 |     "productId": "809392",
  978 |     "categoryId": "fittings",
  979 |     "productTypeId": "hard-tube-fittings",
  980 |     "seriesId": "standard-flat-bottom-fitting",
  981 |     "cardTitle": {
  982 |       "zh": "HFL-U28-25-PV-B",
  983 |       "en": "HFL-U28-25-PV-B"
  984 |     },
  991 |       "filter02": "1/4-28 UNF",
  992 |       "filter03": "2.5 mm",
  993 |       "filter04": "PVDF",
  994 |       "filter05": "黑色"
  995 |     },
  996 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
  997 |     "detailSlug": "hard-tube-fittings",
  998 |     "status": "active",
  999 |     "sortOrder": 34,
 1000 |     "searchKeywords": {
 1001 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-25-PV-B 809392 443-01-00146 旧版标滚平底接头 1/4-28 UNF 2.5 mm PVDF 黑色",
 1002 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-25-PV-B 809392 443-01-00146 1/4-28 UNF 2.5 mm PVDF Black"
 1003 |     }
 1004 |   },
 1005 |   {
 1006 |     "productId": "809047",
 1007 |     "categoryId": "fittings",
 1008 |     "productTypeId": "hard-tube-fittings",
 1009 |     "seriesId": "standard-flat-bottom-fitting",
 1010 |     "cardTitle": {
 1011 |       "zh": "HFL-U28-30-PV-N",
 1012 |       "en": "HFL-U28-30-PV-N"
 1013 |     },
 1020 |       "filter02": "1/4-28 UNF",
 1021 |       "filter03": "3.0 mm",
 1022 |       "filter04": "PVDF",
 1023 |       "filter05": "本色"
 1024 |     },
 1025 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
 1026 |     "detailSlug": "hard-tube-fittings",
 1027 |     "status": "active",
 1028 |     "sortOrder": 35,
 1029 |     "searchKeywords": {
 1030 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-30-PV-N 809047 443-00-00225 旧版标滚平底接头 1/4-28 UNF 3.0 mm PVDF 本色",
 1031 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-30-PV-N 809047 443-00-00225 1/4-28 UNF 3.0 mm PVDF Natural"
 1032 |     }
 1033 |   },
 1034 |   {
 1035 |     "productId": "809394",
 1036 |     "categoryId": "fittings",
 1037 |     "productTypeId": "hard-tube-fittings",
 1038 |     "seriesId": "standard-flat-bottom-fitting",
 1039 |     "cardTitle": {
 1040 |       "zh": "HFL-U28-30-PV-B",
 1041 |       "en": "HFL-U28-30-PV-B"
 1042 |     },
 1049 |       "filter02": "1/4-28 UNF",
 1050 |       "filter03": "3.0 mm",
 1051 |       "filter04": "PVDF",
 1052 |       "filter05": "黑色"
 1053 |     },
 1054 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
 1055 |     "detailSlug": "hard-tube-fittings",
 1056 |     "status": "active",
 1057 |     "sortOrder": 36,
 1058 |     "searchKeywords": {
 1059 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-30-PV-B 809394 443-01-00147 旧版标滚平底接头 1/4-28 UNF 3.0 mm PVDF 黑色",
 1060 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-30-PV-B 809394 443-01-00147 1/4-28 UNF 3.0 mm PVDF Black"
 1061 |     }
 1062 |   },
 1063 |   {
 1064 |     "productId": "809035",
 1065 |     "categoryId": "fittings",
 1066 |     "productTypeId": "hard-tube-fittings",
 1067 |     "seriesId": "standard-flat-bottom-fitting",
 1068 |     "cardTitle": {
 1069 |       "zh": "HFL-U28-32-PV-N",
 1070 |       "en": "HFL-U28-32-PV-N"
 1071 |     },
 1078 |       "filter02": "1/4-28 UNF",
 1079 |       "filter03": "3.2 mm",
 1080 |       "filter04": "PVDF",
 1081 |       "filter05": "本色"
 1082 |     },
 1083 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
 1084 |     "detailSlug": "hard-tube-fittings",
 1085 |     "status": "active",
 1086 |     "sortOrder": 37,
 1087 |     "searchKeywords": {
 1088 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-32-PV-N 809035 443-00-00057 旧版标滚平底接头 1/4-28 UNF 3.2 mm PVDF 本色",
 1089 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-32-PV-N 809035 443-00-00057 1/4-28 UNF 3.2 mm PVDF Natural"
 1090 |     }
 1091 |   },
 1092 |   {
 1093 |     "productId": "809393",
 1094 |     "categoryId": "fittings",
 1095 |     "productTypeId": "hard-tube-fittings",
 1096 |     "seriesId": "standard-flat-bottom-fitting",
 1097 |     "cardTitle": {
 1098 |       "zh": "HFL-U28-32-PV-B",
 1099 |       "en": "HFL-U28-32-PV-B"
 1100 |     },
 1107 |       "filter02": "1/4-28 UNF",
 1108 |       "filter03": "3.2 mm",
 1109 |       "filter04": "PVDF",
 1110 |       "filter05": "黑色"
 1111 |     },
 1112 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
 1113 |     "detailSlug": "hard-tube-fittings",
 1114 |     "status": "active",
 1115 |     "sortOrder": 38,
 1116 |     "searchKeywords": {
 1117 |       "zh": "硬管接头 标滚平底接头 HFL HFL-U28-32-PV-B 809393 443-00-00082 旧版标滚平底接头 1/4-28 UNF 3.2 mm PVDF 黑色",
 1118 |       "en": "hard tube fitting Standard Flanged Fitting HFL HFL-U28-32-PV-B 809393 443-00-00082 1/4-28 UNF 3.2 mm PVDF Black"
 1119 |     }
 1120 |   },
 1121 |   {
 1122 |     "productId": "809758",
 1123 |     "categoryId": "fittings",
 1124 |     "productTypeId": "hard-tube-fittings",
 1125 |     "seriesId": "compact-flat-bottom-fitting",
 1126 |     "cardTitle": {
 1127 |       "zh": "HF6-M6-20-PV-N",
 1128 |       "en": "HF6-M6-20-PV-N"
 1129 |     },
 1136 |       "filter02": "M6×1",
 1137 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
 1138 |       "filter04": "PVDF",
 1139 |       "filter05": "本色"
 1140 |     },
 1141 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
 1142 |     "detailSlug": "hard-tube-fittings",
 1143 |     "status": "active",
 1144 |     "sortOrder": 39,
 1145 |     "searchKeywords": {
 1146 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-20-PV-N 809758 443-02-00424 新版紧凑平底接头 M6×1 1.6–2.0 mm PVDF 本色",
 1147 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-20-PV-N 809758 443-02-00424 M6×1 1.6–2.0 mm PVDF Natural"
 1148 |     }
 1149 |   },
 1150 |   {
 1151 |     "productId": "809759",
 1152 |     "categoryId": "fittings",
 1153 |     "productTypeId": "hard-tube-fittings",
 1154 |     "seriesId": "compact-flat-bottom-fitting",
 1155 |     "cardTitle": {
 1156 |       "zh": "HF6-M6-20-PS-B",
 1157 |       "en": "HF6-M6-20-PS-B"
 1158 |     },
 1165 |       "filter02": "M6×1",
 1166 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
 1167 |       "filter04": "PPS",
 1168 |       "filter05": "黑色"
 1169 |     },
 1170 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
 1171 |     "detailSlug": "hard-tube-fittings",
 1172 |     "status": "active",
 1173 |     "sortOrder": 40,
 1174 |     "searchKeywords": {
 1175 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-20-PS-B 809759 443-02-00425 新版紧凑平底接头 M6×1 1.6–2.0 mm PPS 黑色",
 1176 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-20-PS-B 809759 443-02-00425 M6×1 1.6–2.0 mm PPS Black"
 1177 |     }
 1178 |   },
 1179 |   {
 1180 |     "productId": "809723",
 1181 |     "categoryId": "fittings",
 1182 |     "productTypeId": "hard-tube-fittings",
 1183 |     "seriesId": "compact-flat-bottom-fitting",
 1184 |     "cardTitle": {
 1185 |       "zh": "HF6-M6-20-PK-N",
 1186 |       "en": "HF6-M6-20-PK-N"
 1187 |     },
 1194 |       "filter02": "M6×1",
 1195 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
 1196 |       "filter04": "PEEK",
 1197 |       "filter05": "本色"
 1198 |     },
 1199 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
 1200 |     "detailSlug": "hard-tube-fittings",
 1201 |     "status": "active",
 1202 |     "sortOrder": 41,
 1203 |     "searchKeywords": {
 1204 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-20-PK-N 809723 443-02-00365 新版紧凑平底接头 M6×1 1.6–2.0 mm PEEK 本色",
 1205 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-20-PK-N 809723 443-02-00365 M6×1 1.6–2.0 mm PEEK Natural"
 1206 |     }
 1207 |   },
 1208 |   {
 1209 |     "productId": "809760",
 1210 |     "categoryId": "fittings",
 1211 |     "productTypeId": "hard-tube-fittings",
 1212 |     "seriesId": "compact-flat-bottom-fitting",
 1213 |     "cardTitle": {
 1214 |       "zh": "HF6-M6-25-PV-N",
 1215 |       "en": "HF6-M6-25-PV-N"
 1216 |     },
 1223 |       "filter02": "M6×1",
 1224 |       "filter03": "2.5 mm",
 1225 |       "filter04": "PVDF",
 1226 |       "filter05": "本色"
 1227 |     },
 1228 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
 1229 |     "detailSlug": "hard-tube-fittings",
 1230 |     "status": "active",
 1231 |     "sortOrder": 42,
 1232 |     "searchKeywords": {
 1233 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-25-PV-N 809760 443-02-00426 新版紧凑平底接头 M6×1 2.5 mm PVDF 本色",
 1234 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-25-PV-N 809760 443-02-00426 M6×1 2.5 mm PVDF Natural"
 1235 |     }
 1236 |   },
 1237 |   {
 1238 |     "productId": "809761",
 1239 |     "categoryId": "fittings",
 1240 |     "productTypeId": "hard-tube-fittings",
 1241 |     "seriesId": "compact-flat-bottom-fitting",
 1242 |     "cardTitle": {
 1243 |       "zh": "HF6-M6-25-PS-B",
 1244 |       "en": "HF6-M6-25-PS-B"
 1245 |     },
 1252 |       "filter02": "M6×1",
 1253 |       "filter03": "2.5 mm",
 1254 |       "filter04": "PPS",
 1255 |       "filter05": "黑色"
 1256 |     },
 1257 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
 1258 |     "detailSlug": "hard-tube-fittings",
 1259 |     "status": "active",
 1260 |     "sortOrder": 43,
 1261 |     "searchKeywords": {
 1262 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-25-PS-B 809761 443-02-00427 新版紧凑平底接头 M6×1 2.5 mm PPS 黑色",
 1263 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-25-PS-B 809761 443-02-00427 M6×1 2.5 mm PPS Black"
 1264 |     }
 1265 |   },
 1266 |   {
 1267 |     "productId": "809724",
 1268 |     "categoryId": "fittings",
 1269 |     "productTypeId": "hard-tube-fittings",
 1270 |     "seriesId": "compact-flat-bottom-fitting",
 1271 |     "cardTitle": {
 1272 |       "zh": "HF6-M6-25-PK-N",
 1273 |       "en": "HF6-M6-25-PK-N"
 1274 |     },
 1281 |       "filter02": "M6×1",
 1282 |       "filter03": "2.5 mm",
 1283 |       "filter04": "PEEK",
 1284 |       "filter05": "本色"
 1285 |     },
 1286 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
 1287 |     "detailSlug": "hard-tube-fittings",
 1288 |     "status": "active",
 1289 |     "sortOrder": 44,
 1290 |     "searchKeywords": {
 1291 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-25-PK-N 809724 443-02-00366 新版紧凑平底接头 M6×1 2.5 mm PEEK 本色",
 1292 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-25-PK-N 809724 443-02-00366 M6×1 2.5 mm PEEK Natural"
 1293 |     }
 1294 |   },
 1295 |   {
 1296 |     "productId": "809762",
 1297 |     "categoryId": "fittings",
 1298 |     "productTypeId": "hard-tube-fittings",
 1299 |     "seriesId": "compact-flat-bottom-fitting",
 1300 |     "cardTitle": {
 1301 |       "zh": "HF6-M6-32-PV-N",
 1302 |       "en": "HF6-M6-32-PV-N"
 1303 |     },
 1310 |       "filter02": "M6×1",
 1311 |       "filter03": "3.2 mm",
 1312 |       "filter04": "PVDF",
 1313 |       "filter05": "本色"
 1314 |     },
 1315 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
 1316 |     "detailSlug": "hard-tube-fittings",
 1317 |     "status": "active",
 1318 |     "sortOrder": 45,
 1319 |     "searchKeywords": {
 1320 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-32-PV-N 809762 443-02-00428 新版紧凑平底接头 M6×1 3.2 mm PVDF 本色",
 1321 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-32-PV-N 809762 443-02-00428 M6×1 3.2 mm PVDF Natural"
 1322 |     }
 1323 |   },
 1324 |   {
 1325 |     "productId": "809763",
 1326 |     "categoryId": "fittings",
 1327 |     "productTypeId": "hard-tube-fittings",
 1328 |     "seriesId": "compact-flat-bottom-fitting",
 1329 |     "cardTitle": {
 1330 |       "zh": "HF6-M6-32-PS-B",
 1331 |       "en": "HF6-M6-32-PS-B"
 1332 |     },
 1339 |       "filter02": "M6×1",
 1340 |       "filter03": "3.2 mm",
 1341 |       "filter04": "PPS",
 1342 |       "filter05": "黑色"
 1343 |     },
 1344 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
 1345 |     "detailSlug": "hard-tube-fittings",
 1346 |     "status": "active",
 1347 |     "sortOrder": 46,
 1348 |     "searchKeywords": {
 1349 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-32-PS-B 809763 443-02-00429 新版紧凑平底接头 M6×1 3.2 mm PPS 黑色",
 1350 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-32-PS-B 809763 443-02-00429 M6×1 3.2 mm PPS Black"
 1351 |     }
 1352 |   },
 1353 |   {
 1354 |     "productId": "809725",
 1355 |     "categoryId": "fittings",
 1356 |     "productTypeId": "hard-tube-fittings",
 1357 |     "seriesId": "compact-flat-bottom-fitting",
 1358 |     "cardTitle": {
 1359 |       "zh": "HF6-M6-32-PK-N",
 1360 |       "en": "HF6-M6-32-PK-N"
 1361 |     },
 1368 |       "filter02": "M6×1",
 1369 |       "filter03": "3.2 mm",
 1370 |       "filter04": "PEEK",
 1371 |       "filter05": "本色"
 1372 |     },
 1373 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
 1374 |     "detailSlug": "hard-tube-fittings",
 1375 |     "status": "active",
 1376 |     "sortOrder": 47,
 1377 |     "searchKeywords": {
 1378 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-M6-32-PK-N 809725 443-02-00367 新版紧凑平底接头 M6×1 3.2 mm PEEK 本色",
 1379 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-M6-32-PK-N 809725 443-02-00367 M6×1 3.2 mm PEEK Natural"
 1380 |     }
 1381 |   },
 1382 |   {
 1383 |     "productId": "809752",
 1384 |     "categoryId": "fittings",
 1385 |     "productTypeId": "hard-tube-fittings",
 1386 |     "seriesId": "compact-flat-bottom-fitting",
 1387 |     "cardTitle": {
 1388 |       "zh": "HF6-U28-20-PV-N",
 1389 |       "en": "HF6-U28-20-PV-N"
 1390 |     },
 1397 |       "filter02": "1/4-28 UNF",
 1398 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
 1399 |       "filter04": "PVDF",
 1400 |       "filter05": "本色"
 1401 |     },
 1402 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
 1403 |     "detailSlug": "hard-tube-fittings",
 1404 |     "status": "active",
 1405 |     "sortOrder": 48,
 1406 |     "searchKeywords": {
 1407 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-20-PV-N 809752 443-02-00418 新版紧凑平底接头 1/4-28 UNF 1.6–2.0 mm PVDF 本色",
 1408 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-20-PV-N 809752 443-02-00418 1/4-28 UNF 1.6–2.0 mm PVDF Natural"
 1409 |     }
 1410 |   },
 1411 |   {
 1412 |     "productId": "809753",
 1413 |     "categoryId": "fittings",
 1414 |     "productTypeId": "hard-tube-fittings",
 1415 |     "seriesId": "compact-flat-bottom-fitting",
 1416 |     "cardTitle": {
 1417 |       "zh": "HF6-U28-20-PS-B",
 1418 |       "en": "HF6-U28-20-PS-B"
 1419 |     },
 1426 |       "filter02": "1/4-28 UNF",
 1427 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
 1428 |       "filter04": "PPS",
 1429 |       "filter05": "黑色"
 1430 |     },
 1431 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
 1432 |     "detailSlug": "hard-tube-fittings",
 1433 |     "status": "active",
 1434 |     "sortOrder": 49,
 1435 |     "searchKeywords": {
 1436 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-20-PS-B 809753 443-02-00419 新版紧凑平底接头 1/4-28 UNF 1.6–2.0 mm PPS 黑色",
 1437 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-20-PS-B 809753 443-02-00419 1/4-28 UNF 1.6–2.0 mm PPS Black"
 1438 |     }
 1439 |   },
 1440 |   {
 1441 |     "productId": "809720",
 1442 |     "categoryId": "fittings",
 1443 |     "productTypeId": "hard-tube-fittings",
 1444 |     "seriesId": "compact-flat-bottom-fitting",
 1445 |     "cardTitle": {
 1446 |       "zh": "HF6-U28-20-PK-N",
 1447 |       "en": "HF6-U28-20-PK-N"
 1448 |     },
 1455 |       "filter02": "1/4-28 UNF",
 1456 |       "filter03": "1.6 mm|1.8 mm|2.0 mm",
 1457 |       "filter04": "PEEK",
 1458 |       "filter05": "本色"
 1459 |     },
 1460 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
 1461 |     "detailSlug": "hard-tube-fittings",
 1462 |     "status": "active",
 1463 |     "sortOrder": 50,
 1464 |     "searchKeywords": {
 1465 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-20-PK-N 809720 443-02-00362 新版紧凑平底接头 1/4-28 UNF 1.6–2.0 mm PEEK 本色",
 1466 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-20-PK-N 809720 443-02-00362 1/4-28 UNF 1.6–2.0 mm PEEK Natural"
 1467 |     }
 1468 |   },
 1469 |   {
 1470 |     "productId": "809754",
 1471 |     "categoryId": "fittings",
 1472 |     "productTypeId": "hard-tube-fittings",
 1473 |     "seriesId": "compact-flat-bottom-fitting",
 1474 |     "cardTitle": {
 1475 |       "zh": "HF6-U28-25-PV-N",
 1476 |       "en": "HF6-U28-25-PV-N"
 1477 |     },
 1484 |       "filter02": "1/4-28 UNF",
 1485 |       "filter03": "2.5 mm",
 1486 |       "filter04": "PVDF",
 1487 |       "filter05": "本色"
 1488 |     },
 1489 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
 1490 |     "detailSlug": "hard-tube-fittings",
 1491 |     "status": "active",
 1492 |     "sortOrder": 51,
 1493 |     "searchKeywords": {
 1494 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-25-PV-N 809754 443-02-00420 新版紧凑平底接头 1/4-28 UNF 2.5 mm PVDF 本色",
 1495 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-25-PV-N 809754 443-02-00420 1/4-28 UNF 2.5 mm PVDF Natural"
 1496 |     }
 1497 |   },
 1498 |   {
 1499 |     "productId": "809755",
 1500 |     "categoryId": "fittings",
 1501 |     "productTypeId": "hard-tube-fittings",
 1502 |     "seriesId": "compact-flat-bottom-fitting",
 1503 |     "cardTitle": {
 1504 |       "zh": "HF6-U28-25-PS-B",
 1505 |       "en": "HF6-U28-25-PS-B"
 1506 |     },
 1513 |       "filter02": "1/4-28 UNF",
 1514 |       "filter03": "2.5 mm",
 1515 |       "filter04": "PPS",
 1516 |       "filter05": "黑色"
 1517 |     },
 1518 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
 1519 |     "detailSlug": "hard-tube-fittings",
 1520 |     "status": "active",
 1521 |     "sortOrder": 52,
 1522 |     "searchKeywords": {
 1523 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-25-PS-B 809755 443-02-00421 新版紧凑平底接头 1/4-28 UNF 2.5 mm PPS 黑色",
 1524 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-25-PS-B 809755 443-02-00421 1/4-28 UNF 2.5 mm PPS Black"
 1525 |     }
 1526 |   },
 1527 |   {
 1528 |     "productId": "809721",
 1529 |     "categoryId": "fittings",
 1530 |     "productTypeId": "hard-tube-fittings",
 1531 |     "seriesId": "compact-flat-bottom-fitting",
 1532 |     "cardTitle": {
 1533 |       "zh": "HF6-U28-25-PK-N",
 1534 |       "en": "HF6-U28-25-PK-N"
 1535 |     },
 1542 |       "filter02": "1/4-28 UNF",
 1543 |       "filter03": "2.5 mm",
 1544 |       "filter04": "PEEK",
 1545 |       "filter05": "本色"
 1546 |     },
 1547 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
 1548 |     "detailSlug": "hard-tube-fittings",
 1549 |     "status": "active",
 1550 |     "sortOrder": 53,
 1551 |     "searchKeywords": {
 1552 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-25-PK-N 809721 443-02-00363 新版紧凑平底接头 1/4-28 UNF 2.5 mm PEEK 本色",
 1553 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-25-PK-N 809721 443-02-00363 1/4-28 UNF 2.5 mm PEEK Natural"
 1554 |     }
 1555 |   },
 1556 |   {
 1557 |     "productId": "809756",
 1558 |     "categoryId": "fittings",
 1559 |     "productTypeId": "hard-tube-fittings",
 1560 |     "seriesId": "compact-flat-bottom-fitting",
 1561 |     "cardTitle": {
 1562 |       "zh": "HF6-U28-32-PV-N",
 1563 |       "en": "HF6-U28-32-PV-N"
 1564 |     },
 1571 |       "filter02": "1/4-28 UNF",
 1572 |       "filter03": "3.2 mm",
 1573 |       "filter04": "PVDF",
 1574 |       "filter05": "本色"
 1575 |     },
 1576 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
 1577 |     "detailSlug": "hard-tube-fittings",
 1578 |     "status": "active",
 1579 |     "sortOrder": 54,
 1580 |     "searchKeywords": {
 1581 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-32-PV-N 809756 443-02-00422 新版紧凑平底接头 1/4-28 UNF 3.2 mm PVDF 本色",
 1582 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-32-PV-N 809756 443-02-00422 1/4-28 UNF 3.2 mm PVDF Natural"
 1583 |     }
 1584 |   },
 1585 |   {
 1586 |     "productId": "809757",
 1587 |     "categoryId": "fittings",
 1588 |     "productTypeId": "hard-tube-fittings",
 1589 |     "seriesId": "compact-flat-bottom-fitting",
 1590 |     "cardTitle": {
 1591 |       "zh": "HF6-U28-32-PS-B",
 1592 |       "en": "HF6-U28-32-PS-B"
 1593 |     },
 1600 |       "filter02": "1/4-28 UNF",
 1601 |       "filter03": "3.2 mm",
 1602 |       "filter04": "PPS",
 1603 |       "filter05": "黑色"
 1604 |     },
 1605 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
 1606 |     "detailSlug": "hard-tube-fittings",
 1607 |     "status": "active",
 1608 |     "sortOrder": 55,
 1609 |     "searchKeywords": {
 1610 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-32-PS-B 809757 443-02-00423 新版紧凑平底接头 1/4-28 UNF 3.2 mm PPS 黑色",
 1611 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-32-PS-B 809757 443-02-00423 1/4-28 UNF 3.2 mm PPS Black"
 1612 |     }
 1613 |   },
 1614 |   {
 1615 |     "productId": "809722",
 1616 |     "categoryId": "fittings",
 1617 |     "productTypeId": "hard-tube-fittings",
 1618 |     "seriesId": "compact-flat-bottom-fitting",
 1619 |     "cardTitle": {
 1620 |       "zh": "HF6-U28-32-PK-N",
 1621 |       "en": "HF6-U28-32-PK-N"
 1622 |     },
 1629 |       "filter02": "1/4-28 UNF",
 1630 |       "filter03": "3.2 mm",
 1631 |       "filter04": "PEEK",
 1632 |       "filter05": "本色"
 1633 |     },
 1634 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
 1635 |     "detailSlug": "hard-tube-fittings",
 1636 |     "status": "active",
 1637 |     "sortOrder": 56,
 1638 |     "searchKeywords": {
 1639 |       "zh": "硬管接头 紧凑平底接头 HF6 HF6-U28-32-PK-N 809722 443-02-00364 新版紧凑平底接头 1/4-28 UNF 3.2 mm PEEK 本色",
 1640 |       "en": "hard tube fitting Compact Flanged Fitting HF6 HF6-U28-32-PK-N 809722 443-02-00364 1/4-28 UNF 3.2 mm PEEK Natural"
 1641 |     }
 1642 |   },
 1643 |   {
 1644 |     "productId": "809058",
 1645 |     "categoryId": "fittings",
 1646 |     "productTypeId": "hard-tube-fittings",
 1647 |     "seriesId": "compact-flat-bottom-fitting",
 1648 |     "cardTitle": {
 1649 |       "zh": "HFL6-M6-16-PS-B",
 1650 |       "en": "HFL6-M6-16-PS-B"
 1651 |     },
 1658 |       "filter02": "M6×1",
 1659 |       "filter03": "1.6 mm",
 1660 |       "filter04": "PPS",
 1661 |       "filter05": "黑色"
 1662 |     },
 1663 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
 1664 |     "detailSlug": "hard-tube-fittings",
 1665 |     "status": "active",
 1666 |     "sortOrder": 57,
 1667 |     "searchKeywords": {
 1668 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-M6-16-PS-B 809058 443-02-00652 旧版紧凑平底接头 M6×1 1.6 mm PPS 黑色",
 1669 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-M6-16-PS-B 809058 443-02-00652 M6×1 1.6 mm PPS Black"
 1670 |     }
 1671 |   },
 1672 |   {
 1673 |     "productId": "809078",
 1674 |     "categoryId": "fittings",
 1675 |     "productTypeId": "hard-tube-fittings",
 1676 |     "seriesId": "compact-flat-bottom-fitting",
 1677 |     "cardTitle": {
 1678 |       "zh": "HFL6-M6-20-PS-B",
 1679 |       "en": "HFL6-M6-20-PS-B"
 1680 |     },
 1687 |       "filter02": "M6×1",
 1688 |       "filter03": "2.0 mm",
 1689 |       "filter04": "PPS",
 1690 |       "filter05": "黑色"
 1691 |     },
 1692 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
 1693 |     "detailSlug": "hard-tube-fittings",
 1694 |     "status": "active",
 1695 |     "sortOrder": 58,
 1696 |     "searchKeywords": {
 1697 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-M6-20-PS-B 809078 443-02-00649 旧版紧凑平底接头 M6×1 2.0 mm PPS 黑色",
 1698 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-M6-20-PS-B 809078 443-02-00649 M6×1 2.0 mm PPS Black"
 1699 |     }
 1700 |   },
 1701 |   {
 1702 |     "productId": "809098",
 1703 |     "categoryId": "fittings",
 1704 |     "productTypeId": "hard-tube-fittings",
 1705 |     "seriesId": "compact-flat-bottom-fitting",
 1706 |     "cardTitle": {
 1707 |       "zh": "HFL6-M6-25-PS-B",
 1708 |       "en": "HFL6-M6-25-PS-B"
 1709 |     },
 1716 |       "filter02": "M6×1",
 1717 |       "filter03": "2.5 mm",
 1718 |       "filter04": "PPS",
 1719 |       "filter05": "黑色"
 1720 |     },
 1721 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 1722 |     "detailSlug": "hard-tube-fittings",
 1723 |     "status": "active",
 1724 |     "sortOrder": 59,
 1725 |     "searchKeywords": {
 1726 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-M6-25-PS-B 809098 443-02-00651 旧版紧凑平底接头 M6×1 2.5 mm PPS 黑色",
 1727 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-M6-25-PS-B 809098 443-02-00651 M6×1 2.5 mm PPS Black"
 1728 |     }
 1729 |   },
 1730 |   {
 1731 |     "productId": "809549",
 1732 |     "categoryId": "fittings",
 1733 |     "productTypeId": "hard-tube-fittings",
 1734 |     "seriesId": "compact-flat-bottom-fitting",
 1735 |     "cardTitle": {
 1736 |       "zh": "HFL6-M6-25-PS-U",
 1737 |       "en": "HFL6-M6-25-PS-U"
 1738 |     },
 1745 |       "filter02": "M6×1",
 1746 |       "filter03": "2.5 mm",
 1747 |       "filter04": "PPS",
 1748 |       "filter05": "蓝色"
 1749 |     },
 1750 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-25-main.jpg",
 1751 |     "detailSlug": "hard-tube-fittings",
 1752 |     "status": "active",
 1753 |     "sortOrder": 60,
 1754 |     "searchKeywords": {
 1755 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-M6-25-PS-U 809549 443-02-00667 旧版紧凑平底接头 M6×1 2.5 mm PPS 蓝色",
 1756 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-M6-25-PS-U 809549 443-02-00667 M6×1 2.5 mm PPS Blue"
 1757 |     }
 1758 |   },
 1759 |   {
 1760 |     "productId": "809088",
 1761 |     "categoryId": "fittings",
 1762 |     "productTypeId": "hard-tube-fittings",
 1763 |     "seriesId": "compact-flat-bottom-fitting",
 1764 |     "cardTitle": {
 1765 |       "zh": "HFL6-M6-30-PS-B",
 1766 |       "en": "HFL6-M6-30-PS-B"
 1767 |     },
 1774 |       "filter02": "M6×1",
 1775 |       "filter03": "3.0 mm",
 1776 |       "filter04": "PPS",
 1777 |       "filter05": "黑色"
 1778 |     },
 1779 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
 1780 |     "detailSlug": "hard-tube-fittings",
 1781 |     "status": "active",
 1782 |     "sortOrder": 61,
 1783 |     "searchKeywords": {
 1784 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-M6-30-PS-B 809088 443-02-00648 旧版紧凑平底接头 M6×1 3.0 mm PPS 黑色",
 1785 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-M6-30-PS-B 809088 443-02-00648 M6×1 3.0 mm PPS Black"
 1786 |     }
 1787 |   },
 1788 |   {
 1789 |     "productId": "809068",
 1790 |     "categoryId": "fittings",
 1791 |     "productTypeId": "hard-tube-fittings",
 1792 |     "seriesId": "compact-flat-bottom-fitting",
 1793 |     "cardTitle": {
 1794 |       "zh": "HFL6-M6-32-PS-B",
 1795 |       "en": "HFL6-M6-32-PS-B"
 1796 |     },
 1803 |       "filter02": "M6×1",
 1804 |       "filter03": "3.2 mm",
 1805 |       "filter04": "PPS",
 1806 |       "filter05": "黑色"
 1807 |     },
 1808 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
 1809 |     "detailSlug": "hard-tube-fittings",
 1810 |     "status": "active",
 1811 |     "sortOrder": 62,
 1812 |     "searchKeywords": {
 1813 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-M6-32-PS-B 809068 443-02-00650 旧版紧凑平底接头 M6×1 3.2 mm PPS 黑色",
 1814 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-M6-32-PS-B 809068 443-02-00650 M6×1 3.2 mm PPS Black"
 1815 |     }
 1816 |   },
 1817 |   {
 1818 |     "productId": "809057",
 1819 |     "categoryId": "fittings",
 1820 |     "productTypeId": "hard-tube-fittings",
 1821 |     "seriesId": "compact-flat-bottom-fitting",
 1822 |     "cardTitle": {
 1823 |       "zh": "HFL6-U28-16-PS-B",
 1824 |       "en": "HFL6-U28-16-PS-B"
 1825 |     },
 1832 |       "filter02": "1/4-28 UNF",
 1833 |       "filter03": "1.6 mm",
 1834 |       "filter04": "PPS",
 1835 |       "filter05": "黑色"
 1836 |     },
 1837 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 1838 |     "detailSlug": "hard-tube-fittings",
 1839 |     "status": "active",
 1840 |     "sortOrder": 63,
 1841 |     "searchKeywords": {
 1842 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-16-PS-B 809057 443-02-00647 旧版紧凑平底接头 1/4-28 UNF 1.6 mm PPS 黑色",
 1843 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-16-PS-B 809057 443-02-00647 1/4-28 UNF 1.6 mm PPS Black"
 1844 |     }
 1845 |   },
 1846 |   {
 1847 |     "productId": "809550",
 1848 |     "categoryId": "fittings",
 1849 |     "productTypeId": "hard-tube-fittings",
 1850 |     "seriesId": "compact-flat-bottom-fitting",
 1851 |     "cardTitle": {
 1852 |       "zh": "HFL6-U28-16-PS-U",
 1853 |       "en": "HFL6-U28-16-PS-U"
 1854 |     },
 1861 |       "filter02": "1/4-28 UNF",
 1862 |       "filter03": "1.6 mm",
 1863 |       "filter04": "PPS",
 1864 |       "filter05": "蓝色"
 1865 |     },
 1866 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-16-main.jpg",
 1867 |     "detailSlug": "hard-tube-fittings",
 1868 |     "status": "active",
 1869 |     "sortOrder": 64,
 1870 |     "searchKeywords": {
 1871 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-16-PS-U 809550 443-02-00668 旧版紧凑平底接头 1/4-28 UNF 1.6 mm PPS 蓝色",
 1872 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-16-PS-U 809550 443-02-00668 1/4-28 UNF 1.6 mm PPS Blue"
 1873 |     }
 1874 |   },
 1875 |   {
 1876 |     "productId": "809077",
 1877 |     "categoryId": "fittings",
 1878 |     "productTypeId": "hard-tube-fittings",
 1879 |     "seriesId": "compact-flat-bottom-fitting",
 1880 |     "cardTitle": {
 1881 |       "zh": "HFL6-U28-20-PS-B",
 1882 |       "en": "HFL6-U28-20-PS-B"
 1883 |     },
 1890 |       "filter02": "1/4-28 UNF",
 1891 |       "filter03": "2.0 mm",
 1892 |       "filter04": "PPS",
 1893 |       "filter05": "黑色"
 1894 |     },
 1895 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 1896 |     "detailSlug": "hard-tube-fittings",
 1897 |     "status": "active",
 1898 |     "sortOrder": 65,
 1899 |     "searchKeywords": {
 1900 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-20-PS-B 809077 443-02-00644 旧版紧凑平底接头 1/4-28 UNF 2.0 mm PPS 黑色",
 1901 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-20-PS-B 809077 443-02-00644 1/4-28 UNF 2.0 mm PPS Black"
 1902 |     }
 1903 |   },
 1904 |   {
 1905 |     "productId": "809551",
 1906 |     "categoryId": "fittings",
 1907 |     "productTypeId": "hard-tube-fittings",
 1908 |     "seriesId": "compact-flat-bottom-fitting",
 1909 |     "cardTitle": {
 1910 |       "zh": "HFL6-U28-20-PS-U",
 1911 |       "en": "HFL6-U28-20-PS-U"
 1912 |     },
 1919 |       "filter02": "1/4-28 UNF",
 1920 |       "filter03": "2.0 mm",
 1921 |       "filter04": "PPS",
 1922 |       "filter05": "蓝色"
 1923 |     },
 1924 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-20-main.jpg",
 1925 |     "detailSlug": "hard-tube-fittings",
 1926 |     "status": "active",
 1927 |     "sortOrder": 66,
 1928 |     "searchKeywords": {
 1929 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-20-PS-U 809551 443-02-00676 旧版紧凑平底接头 1/4-28 UNF 2.0 mm PPS 蓝色",
 1930 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-20-PS-U 809551 443-02-00676 1/4-28 UNF 2.0 mm PPS Blue"
 1931 |     }
 1932 |   },
 1933 |   {
 1934 |     "productId": "809097",
 1935 |     "categoryId": "fittings",
 1936 |     "productTypeId": "hard-tube-fittings",
 1937 |     "seriesId": "compact-flat-bottom-fitting",
 1938 |     "cardTitle": {
 1939 |       "zh": "HFL6-U28-25-PS-B",
 1940 |       "en": "HFL6-U28-25-PS-B"
 1941 |     },
 1948 |       "filter02": "1/4-28 UNF",
 1949 |       "filter03": "2.5 mm",
 1950 |       "filter04": "PPS",
 1951 |       "filter05": "黑色"
 1952 |     },
 1953 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
 1954 |     "detailSlug": "hard-tube-fittings",
 1955 |     "status": "active",
 1956 |     "sortOrder": 67,
 1957 |     "searchKeywords": {
 1958 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-25-PS-B 809097 443-02-00646 旧版紧凑平底接头 1/4-28 UNF 2.5 mm PPS 黑色",
 1959 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-25-PS-B 809097 443-02-00646 1/4-28 UNF 2.5 mm PPS Black"
 1960 |     }
 1961 |   },
 1962 |   {
 1963 |     "productId": "809087",
 1964 |     "categoryId": "fittings",
 1965 |     "productTypeId": "hard-tube-fittings",
 1966 |     "seriesId": "compact-flat-bottom-fitting",
 1967 |     "cardTitle": {
 1968 |       "zh": "HFL6-U28-30-PS-B",
 1969 |       "en": "HFL6-U28-30-PS-B"
 1970 |     },
 1977 |       "filter02": "1/4-28 UNF",
 1978 |       "filter03": "3.0 mm",
 1979 |       "filter04": "PPS",
 1980 |       "filter05": "黑色"
 1981 |     },
 1982 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
 1983 |     "detailSlug": "hard-tube-fittings",
 1984 |     "status": "active",
 1985 |     "sortOrder": 68,
 1986 |     "searchKeywords": {
 1987 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-30-PS-B 809087 443-02-00643 旧版紧凑平底接头 1/4-28 UNF 3.0 mm PPS 黑色",
 1988 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-30-PS-B 809087 443-02-00643 1/4-28 UNF 3.0 mm PPS Black"
 1989 |     }
 1990 |   },
 1991 |   {
 1992 |     "productId": "809067",
 1993 |     "categoryId": "fittings",
 1994 |     "productTypeId": "hard-tube-fittings",
 1995 |     "seriesId": "compact-flat-bottom-fitting",
 1996 |     "cardTitle": {
 1997 |       "zh": "HFL6-U28-32-PS-B",
 1998 |       "en": "HFL6-U28-32-PS-B"
 1999 |     },
 2006 |       "filter02": "1/4-28 UNF",
 2007 |       "filter03": "3.2 mm",
 2008 |       "filter04": "PPS",
 2009 |       "filter05": "黑色"
 2010 |     },
 2011 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
 2012 |     "detailSlug": "hard-tube-fittings",
 2013 |     "status": "active",
 2014 |     "sortOrder": 69,
 2015 |     "searchKeywords": {
 2016 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U28-32-PS-B 809067 443-02-00645 旧版紧凑平底接头 1/4-28 UNF 3.2 mm PPS 黑色",
 2017 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U28-32-PS-B 809067 443-02-00645 1/4-28 UNF 3.2 mm PPS Black"
 2018 |     }
 2019 |   },
 2020 |   {
 2021 |     "productId": "809841",
 2022 |     "categoryId": "fittings",
 2023 |     "productTypeId": "hard-tube-fittings",
 2024 |     "seriesId": "compact-flat-bottom-fitting",
 2025 |     "cardTitle": {
 2026 |       "zh": "HFL6-U40-16-PK-N",
 2027 |       "en": "HFL6-U40-16-PK-N"
 2028 |     },
 2036 |       "filter03": "1.6 mm",
 2037 |       "filter04": "PEEK",
 2038 |       "filter05": "本色"
 2039 |     },
 2040 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 2041 |     "detailSlug": "hard-tube-fittings",
 2042 |     "status": "active",
 2043 |     "sortOrder": 70,
 2044 |     "searchKeywords": {
 2045 |       "zh": "硬管接头 紧凑平底接头 HFL6 HFL6-U40-16-PK-N 809841 443-02-00692 新版紧凑平底接头 6-40 UNF 1.6 mm PEEK 本色",
 2046 |       "en": "hard tube fitting Compact Flanged Fitting HFL6 HFL6-U40-16-PK-N 809841 443-02-00692 6-40 UNF 1.6 mm PEEK Natural"
 2047 |     }
 2048 |   },
 2049 |   {
 2050 |     "productId": "809768",
 2051 |     "categoryId": "fittings",
 2052 |     "productTypeId": "hard-tube-fittings",
 2053 |     "seriesId": "standard-ferrule-fitting",
 2054 |     "cardTitle": {
 2055 |       "zh": "HN-M6-16-PV-N",
 2056 |       "en": "HN-M6-16-PV-N"
 2057 |     },
 2064 |       "filter02": "M6×1",
 2065 |       "filter03": "1.6 mm",
 2066 |       "filter04": "PVDF",
 2067 |       "filter05": "本色"
 2068 |     },
 2069 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
 2070 |     "detailSlug": "hard-tube-fittings",
 2071 |     "status": "active",
 2072 |     "sortOrder": 71,
 2073 |     "searchKeywords": {
 2074 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-16-PV-N 809768 443-02-00434 新版标滚卡箍接头 M6×1 1.6 mm PVDF 本色",
 2075 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-16-PV-N 809768 443-02-00434 M6×1 1.6 mm PVDF Natural"
 2076 |     }
 2077 |   },
 2078 |   {
 2079 |     "productId": "809769",
 2080 |     "categoryId": "fittings",
 2081 |     "productTypeId": "hard-tube-fittings",
 2082 |     "seriesId": "standard-ferrule-fitting",
 2083 |     "cardTitle": {
 2084 |       "zh": "HN-M6-16-PS-B",
 2085 |       "en": "HN-M6-16-PS-B"
 2086 |     },
 2093 |       "filter02": "M6×1",
 2094 |       "filter03": "1.6 mm",
 2095 |       "filter04": "PPS",
 2096 |       "filter05": "黑色"
 2097 |     },
 2098 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ps-b-main.jpg",
 2099 |     "detailSlug": "hard-tube-fittings",
 2100 |     "status": "active",
 2101 |     "sortOrder": 72,
 2102 |     "searchKeywords": {
 2103 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-16-PS-B 809769 443-02-00435 新版标滚卡箍接头 M6×1 1.6 mm PPS 黑色",
 2104 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-16-PS-B 809769 443-02-00435 M6×1 1.6 mm PPS Black"
 2105 |     }
 2106 |   },
 2107 |   {
 2108 |     "productId": "809728",
 2109 |     "categoryId": "fittings",
 2110 |     "productTypeId": "hard-tube-fittings",
 2111 |     "seriesId": "standard-ferrule-fitting",
 2112 |     "cardTitle": {
 2113 |       "zh": "HN-M6-16-PK-N",
 2114 |       "en": "HN-M6-16-PK-N"
 2115 |     },
 2122 |       "filter02": "M6×1",
 2123 |       "filter03": "1.6 mm",
 2124 |       "filter04": "PEEK",
 2125 |       "filter05": "本色"
 2126 |     },
 2127 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
 2128 |     "detailSlug": "hard-tube-fittings",
 2129 |     "status": "active",
 2130 |     "sortOrder": 73,
 2131 |     "searchKeywords": {
 2132 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-16-PK-N 809728 443-02-00370 新版标滚卡箍接头 M6×1 1.6 mm PEEK 本色",
 2133 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-16-PK-N 809728 443-02-00370 M6×1 1.6 mm PEEK Natural"
 2134 |     }
 2135 |   },
 2136 |   {
 2137 |     "productId": "809795",
 2138 |     "categoryId": "fittings",
 2139 |     "productTypeId": "hard-tube-fittings",
 2140 |     "seriesId": "standard-ferrule-fitting",
 2141 |     "cardTitle": {
 2142 |       "zh": "HN-M6-16-AC-B",
 2143 |       "en": "HN-M6-16-AC-B"
 2144 |     },
 2151 |       "filter02": "M6×1",
 2152 |       "filter03": "1.6 mm",
 2153 |       "filter04": "POM",
 2154 |       "filter05": "黑色"
 2155 |     },
 2156 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-ac-b-main.jpg",
 2157 |     "detailSlug": "hard-tube-fittings",
 2158 |     "status": "active",
 2159 |     "sortOrder": 74,
 2160 |     "searchKeywords": {
 2161 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-16-AC-B 809795 443-02-00481 新版标滚卡箍接头 M6×1 1.6 mm POM 黑色",
 2162 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-16-AC-B 809795 443-02-00481 M6×1 1.6 mm POM Black"
 2163 |     }
 2164 |   },
 2165 |   {
 2166 |     "productId": "809770",
 2167 |     "categoryId": "fittings",
 2168 |     "productTypeId": "hard-tube-fittings",
 2169 |     "seriesId": "standard-ferrule-fitting",
 2170 |     "cardTitle": {
 2171 |       "zh": "HN-M6-32-PV-N",
 2172 |       "en": "HN-M6-32-PV-N"
 2173 |     },
 2180 |       "filter02": "M6×1",
 2181 |       "filter03": "3.2 mm",
 2182 |       "filter04": "PVDF",
 2183 |       "filter05": "本色"
 2184 |     },
 2185 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
 2186 |     "detailSlug": "hard-tube-fittings",
 2187 |     "status": "active",
 2188 |     "sortOrder": 75,
 2189 |     "searchKeywords": {
 2190 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-32-PV-N 809770 443-02-00436 新版标滚卡箍接头 M6×1 3.2 mm PVDF 本色",
 2191 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-32-PV-N 809770 443-02-00436 M6×1 3.2 mm PVDF Natural"
 2192 |     }
 2193 |   },
 2194 |   {
 2195 |     "productId": "809771",
 2196 |     "categoryId": "fittings",
 2197 |     "productTypeId": "hard-tube-fittings",
 2198 |     "seriesId": "standard-ferrule-fitting",
 2199 |     "cardTitle": {
 2200 |       "zh": "HN-M6-32-PS-B",
 2201 |       "en": "HN-M6-32-PS-B"
 2202 |     },
 2209 |       "filter02": "M6×1",
 2210 |       "filter03": "3.2 mm",
 2211 |       "filter04": "PPS",
 2212 |       "filter05": "黑色"
 2213 |     },
 2214 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ps-b-main.jpg",
 2215 |     "detailSlug": "hard-tube-fittings",
 2216 |     "status": "active",
 2217 |     "sortOrder": 76,
 2218 |     "searchKeywords": {
 2219 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-32-PS-B 809771 443-02-00437 新版标滚卡箍接头 M6×1 3.2 mm PPS 黑色",
 2220 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-32-PS-B 809771 443-02-00437 M6×1 3.2 mm PPS Black"
 2221 |     }
 2222 |   },
 2223 |   {
 2224 |     "productId": "809729",
 2225 |     "categoryId": "fittings",
 2226 |     "productTypeId": "hard-tube-fittings",
 2227 |     "seriesId": "standard-ferrule-fitting",
 2228 |     "cardTitle": {
 2229 |       "zh": "HN-M6-32-PK-N",
 2230 |       "en": "HN-M6-32-PK-N"
 2231 |     },
 2238 |       "filter02": "M6×1",
 2239 |       "filter03": "3.2 mm",
 2240 |       "filter04": "PEEK",
 2241 |       "filter05": "本色"
 2242 |     },
 2243 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
 2244 |     "detailSlug": "hard-tube-fittings",
 2245 |     "status": "active",
 2246 |     "sortOrder": 77,
 2247 |     "searchKeywords": {
 2248 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-32-PK-N 809729 443-02-00371 新版标滚卡箍接头 M6×1 3.2 mm PEEK 本色",
 2249 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-32-PK-N 809729 443-02-00371 M6×1 3.2 mm PEEK Natural"
 2250 |     }
 2251 |   },
 2252 |   {
 2253 |     "productId": "809796",
 2254 |     "categoryId": "fittings",
 2255 |     "productTypeId": "hard-tube-fittings",
 2256 |     "seriesId": "standard-ferrule-fitting",
 2257 |     "cardTitle": {
 2258 |       "zh": "HN-M6-32-AC-B",
 2259 |       "en": "HN-M6-32-AC-B"
 2260 |     },
 2267 |       "filter02": "M6×1",
 2268 |       "filter03": "3.2 mm",
 2269 |       "filter04": "POM",
 2270 |       "filter05": "黑色"
 2271 |     },
 2272 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-ac-b-main.jpg",
 2273 |     "detailSlug": "hard-tube-fittings",
 2274 |     "status": "active",
 2275 |     "sortOrder": 78,
 2276 |     "searchKeywords": {
 2277 |       "zh": "硬管接头 标滚卡箍接头 HN HN-M6-32-AC-B 809796 443-02-00482 新版标滚卡箍接头 M6×1 3.2 mm POM 黑色",
 2278 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-M6-32-AC-B 809796 443-02-00482 M6×1 3.2 mm POM Black"
 2279 |     }
 2280 |   },
 2281 |   {
 2282 |     "productId": "809764",
 2283 |     "categoryId": "fittings",
 2284 |     "productTypeId": "hard-tube-fittings",
 2285 |     "seriesId": "standard-ferrule-fitting",
 2286 |     "cardTitle": {
 2287 |       "zh": "HN-U28-16-PV-N",
 2288 |       "en": "HN-U28-16-PV-N"
 2289 |     },
 2296 |       "filter02": "1/4-28 UNF",
 2297 |       "filter03": "1.6 mm",
 2298 |       "filter04": "PVDF",
 2299 |       "filter05": "本色"
 2300 |     },
 2301 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
 2302 |     "detailSlug": "hard-tube-fittings",
 2303 |     "status": "active",
 2304 |     "sortOrder": 79,
 2305 |     "searchKeywords": {
 2306 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-16-PV-N 809764 443-02-00430 新版标滚卡箍接头 1/4-28 UNF 1.6 mm PVDF 本色",
 2307 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-16-PV-N 809764 443-02-00430 1/4-28 UNF 1.6 mm PVDF Natural"
 2308 |     }
 2309 |   },
 2310 |   {
 2311 |     "productId": "809765",
 2312 |     "categoryId": "fittings",
 2313 |     "productTypeId": "hard-tube-fittings",
 2314 |     "seriesId": "standard-ferrule-fitting",
 2315 |     "cardTitle": {
 2316 |       "zh": "HN-U28-16-PS-B",
 2317 |       "en": "HN-U28-16-PS-B"
 2318 |     },
 2325 |       "filter02": "1/4-28 UNF",
 2326 |       "filter03": "1.6 mm",
 2327 |       "filter04": "PPS",
 2328 |       "filter05": "黑色"
 2329 |     },
 2330 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ps-b-main.jpg",
 2331 |     "detailSlug": "hard-tube-fittings",
 2332 |     "status": "active",
 2333 |     "sortOrder": 80,
 2334 |     "searchKeywords": {
 2335 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-16-PS-B 809765 443-02-00431 新版标滚卡箍接头 1/4-28 UNF 1.6 mm PPS 黑色",
 2336 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-16-PS-B 809765 443-02-00431 1/4-28 UNF 1.6 mm PPS Black"
 2337 |     }
 2338 |   },
 2339 |   {
 2340 |     "productId": "809726",
 2341 |     "categoryId": "fittings",
 2342 |     "productTypeId": "hard-tube-fittings",
 2343 |     "seriesId": "standard-ferrule-fitting",
 2344 |     "cardTitle": {
 2345 |       "zh": "HN-U28-16-PK-N",
 2346 |       "en": "HN-U28-16-PK-N"
 2347 |     },
 2354 |       "filter02": "1/4-28 UNF",
 2355 |       "filter03": "1.6 mm",
 2356 |       "filter04": "PEEK",
 2357 |       "filter05": "本色"
 2358 |     },
 2359 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
 2360 |     "detailSlug": "hard-tube-fittings",
 2361 |     "status": "active",
 2362 |     "sortOrder": 81,
 2363 |     "searchKeywords": {
 2364 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-16-PK-N 809726 443-02-00368 新版标滚卡箍接头 1/4-28 UNF 1.6 mm PEEK 本色",
 2365 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-16-PK-N 809726 443-02-00368 1/4-28 UNF 1.6 mm PEEK Natural"
 2366 |     }
 2367 |   },
 2368 |   {
 2369 |     "productId": "809799",
 2370 |     "categoryId": "fittings",
 2371 |     "productTypeId": "hard-tube-fittings",
 2372 |     "seriesId": "standard-ferrule-fitting",
 2373 |     "cardTitle": {
 2374 |       "zh": "HN-U28-16-AC-B",
 2375 |       "en": "HN-U28-16-AC-B"
 2376 |     },
 2383 |       "filter02": "1/4-28 UNF",
 2384 |       "filter03": "1.6 mm",
 2385 |       "filter04": "POM",
 2386 |       "filter05": "黑色"
 2387 |     },
 2388 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-ac-b-main.jpg",
 2389 |     "detailSlug": "hard-tube-fittings",
 2390 |     "status": "active",
 2391 |     "sortOrder": 82,
 2392 |     "searchKeywords": {
 2393 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-16-AC-B 809799 443-02-00485 新版标滚卡箍接头 1/4-28 UNF 1.6 mm POM 黑色",
 2394 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-16-AC-B 809799 443-02-00485 1/4-28 UNF 1.6 mm POM Black"
 2395 |     }
 2396 |   },
 2397 |   {
 2398 |     "productId": "809766",
 2399 |     "categoryId": "fittings",
 2400 |     "productTypeId": "hard-tube-fittings",
 2401 |     "seriesId": "standard-ferrule-fitting",
 2402 |     "cardTitle": {
 2403 |       "zh": "HN-U28-32-PV-N",
 2404 |       "en": "HN-U28-32-PV-N"
 2405 |     },
 2412 |       "filter02": "1/4-28 UNF",
 2413 |       "filter03": "3.2 mm",
 2414 |       "filter04": "PVDF",
 2415 |       "filter05": "本色"
 2416 |     },
 2417 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
 2418 |     "detailSlug": "hard-tube-fittings",
 2419 |     "status": "active",
 2420 |     "sortOrder": 83,
 2421 |     "searchKeywords": {
 2422 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-32-PV-N 809766 443-02-00432 新版标滚卡箍接头 1/4-28 UNF 3.2 mm PVDF 本色",
 2423 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-32-PV-N 809766 443-02-00432 1/4-28 UNF 3.2 mm PVDF Natural"
 2424 |     }
 2425 |   },
 2426 |   {
 2427 |     "productId": "809767",
 2428 |     "categoryId": "fittings",
 2429 |     "productTypeId": "hard-tube-fittings",
 2430 |     "seriesId": "standard-ferrule-fitting",
 2431 |     "cardTitle": {
 2432 |       "zh": "HN-U28-32-PS-B",
 2433 |       "en": "HN-U28-32-PS-B"
 2434 |     },
 2441 |       "filter02": "1/4-28 UNF",
 2442 |       "filter03": "3.2 mm",
 2443 |       "filter04": "PPS",
 2444 |       "filter05": "黑色"
 2445 |     },
 2446 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ps-b-main.jpg",
 2447 |     "detailSlug": "hard-tube-fittings",
 2448 |     "status": "active",
 2449 |     "sortOrder": 84,
 2450 |     "searchKeywords": {
 2451 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-32-PS-B 809767 443-02-00433 新版标滚卡箍接头 1/4-28 UNF 3.2 mm PPS 黑色",
 2452 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-32-PS-B 809767 443-02-00433 1/4-28 UNF 3.2 mm PPS Black"
 2453 |     }
 2454 |   },
 2455 |   {
 2456 |     "productId": "809727",
 2457 |     "categoryId": "fittings",
 2458 |     "productTypeId": "hard-tube-fittings",
 2459 |     "seriesId": "standard-ferrule-fitting",
 2460 |     "cardTitle": {
 2461 |       "zh": "HN-U28-32-PK-N",
 2462 |       "en": "HN-U28-32-PK-N"
 2463 |     },
 2470 |       "filter02": "1/4-28 UNF",
 2471 |       "filter03": "3.2 mm",
 2472 |       "filter04": "PEEK",
 2473 |       "filter05": "本色"
 2474 |     },
 2475 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
 2476 |     "detailSlug": "hard-tube-fittings",
 2477 |     "status": "active",
 2478 |     "sortOrder": 85,
 2479 |     "searchKeywords": {
 2480 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-32-PK-N 809727 443-02-00369 新版标滚卡箍接头 1/4-28 UNF 3.2 mm PEEK 本色",
 2481 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-32-PK-N 809727 443-02-00369 1/4-28 UNF 3.2 mm PEEK Natural"
 2482 |     }
 2483 |   },
 2484 |   {
 2485 |     "productId": "809794",
 2486 |     "categoryId": "fittings",
 2487 |     "productTypeId": "hard-tube-fittings",
 2488 |     "seriesId": "standard-ferrule-fitting",
 2489 |     "cardTitle": {
 2490 |       "zh": "HN-U28-32-AC-B",
 2491 |       "en": "HN-U28-32-AC-B"
 2492 |     },
 2499 |       "filter02": "1/4-28 UNF",
 2500 |       "filter03": "3.2 mm",
 2501 |       "filter04": "POM",
 2502 |       "filter05": "黑色"
 2503 |     },
 2504 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-ac-b-main.jpg",
 2505 |     "detailSlug": "hard-tube-fittings",
 2506 |     "status": "active",
 2507 |     "sortOrder": 86,
 2508 |     "searchKeywords": {
 2509 |       "zh": "硬管接头 标滚卡箍接头 HN HN-U28-32-AC-B 809794 443-02-00480 新版标滚卡箍接头 1/4-28 UNF 3.2 mm POM 黑色",
 2510 |       "en": "hard tube fitting Standard Ferrule Fitting HN HN-U28-32-AC-B 809794 443-02-00480 1/4-28 UNF 3.2 mm POM Black"
 2511 |     }
 2512 |   },
 2513 |   {
 2514 |     "productId": "809108",
 2515 |     "categoryId": "fittings",
 2516 |     "productTypeId": "hard-tube-fittings",
 2517 |     "seriesId": "standard-ferrule-fitting",
 2518 |     "cardTitle": {
 2519 |       "zh": "HNF-M6-16-PV-N",
 2520 |       "en": "HNF-M6-16-PV-N"
 2521 |     },
 2528 |       "filter02": "M6×1",
 2529 |       "filter03": "1.6 mm",
 2530 |       "filter04": "PVDF",
 2531 |       "filter05": "本色"
 2532 |     },
 2533 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
 2534 |     "detailSlug": "hard-tube-fittings",
 2535 |     "status": "active",
 2536 |     "sortOrder": 87,
 2537 |     "searchKeywords": {
 2538 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-16-PV-N 809108 443-00-00205 旧版标滚卡箍接头 M6×1 1.6 mm PVDF 本色",
 2539 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-16-PV-N 809108 443-00-00205 M6×1 1.6 mm PVDF Natural"
 2540 |     }
 2541 |   },
 2542 |   {
 2543 |     "productId": "809401",
 2544 |     "categoryId": "fittings",
 2545 |     "productTypeId": "hard-tube-fittings",
 2546 |     "seriesId": "standard-ferrule-fitting",
 2547 |     "cardTitle": {
 2548 |       "zh": "HNF-M6-16-PV-B",
 2549 |       "en": "HNF-M6-16-PV-B"
 2550 |     },
 2557 |       "filter02": "M6×1",
 2558 |       "filter03": "1.6 mm",
 2559 |       "filter04": "PVDF",
 2560 |       "filter05": "黑色"
 2561 |     },
 2562 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
 2563 |     "detailSlug": "hard-tube-fittings",
 2564 |     "status": "active",
 2565 |     "sortOrder": 88,
 2566 |     "searchKeywords": {
 2567 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-16-PV-B 809401 443-00-00478 旧版标滚卡箍接头 M6×1 1.6 mm PVDF 黑色",
 2568 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-16-PV-B 809401 443-00-00478 M6×1 1.6 mm PVDF Black"
 2569 |     }
 2570 |   },
 2571 |   {
 2572 |     "productId": "809116",
 2573 |     "categoryId": "fittings",
 2574 |     "productTypeId": "hard-tube-fittings",
 2575 |     "seriesId": "standard-ferrule-fitting",
 2576 |     "cardTitle": {
 2577 |       "zh": "HNF-M6-20-PV-N",
 2578 |       "en": "HNF-M6-20-PV-N"
 2579 |     },
 2586 |       "filter02": "M6×1",
 2587 |       "filter03": "2.0 mm",
 2588 |       "filter04": "PVDF",
 2589 |       "filter05": "本色"
 2590 |     },
 2591 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
 2592 |     "detailSlug": "hard-tube-fittings",
 2593 |     "status": "active",
 2594 |     "sortOrder": 89,
 2595 |     "searchKeywords": {
 2596 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-20-PV-N 809116 443-00-00208 旧版标滚卡箍接头 M6×1 2.0 mm PVDF 本色",
 2597 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-20-PV-N 809116 443-00-00208 M6×1 2.0 mm PVDF Natural"
 2598 |     }
 2599 |   },
 2600 |   {
 2601 |     "productId": "809415",
 2602 |     "categoryId": "fittings",
 2603 |     "productTypeId": "hard-tube-fittings",
 2604 |     "seriesId": "standard-ferrule-fitting",
 2605 |     "cardTitle": {
 2606 |       "zh": "HNF-M6-20-PV-B",
 2607 |       "en": "HNF-M6-20-PV-B"
 2608 |     },
 2615 |       "filter02": "M6×1",
 2616 |       "filter03": "2.0 mm",
 2617 |       "filter04": "PVDF",
 2618 |       "filter05": "黑色"
 2619 |     },
 2620 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
 2621 |     "detailSlug": "hard-tube-fittings",
 2622 |     "status": "active",
 2623 |     "sortOrder": 90,
 2624 |     "searchKeywords": {
 2625 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-20-PV-B 809415 443-01-00154 旧版标滚卡箍接头 M6×1 2.0 mm PVDF 黑色",
 2626 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-20-PV-B 809415 443-01-00154 M6×1 2.0 mm PVDF Black"
 2627 |     }
 2628 |   },
 2629 |   {
 2630 |     "productId": "809124",
 2631 |     "categoryId": "fittings",
 2632 |     "productTypeId": "hard-tube-fittings",
 2633 |     "seriesId": "standard-ferrule-fitting",
 2634 |     "cardTitle": {
 2635 |       "zh": "HNF-M6-25-PV-N",
 2636 |       "en": "HNF-M6-25-PV-N"
 2637 |     },
 2644 |       "filter02": "M6×1",
 2645 |       "filter03": "2.5 mm",
 2646 |       "filter04": "PVDF",
 2647 |       "filter05": "本色"
 2648 |     },
 2649 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
 2650 |     "detailSlug": "hard-tube-fittings",
 2651 |     "status": "active",
 2652 |     "sortOrder": 91,
 2653 |     "searchKeywords": {
 2654 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-25-PV-N 809124 443-00-00206 旧版标滚卡箍接头 M6×1 2.5 mm PVDF 本色",
 2655 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-25-PV-N 809124 443-00-00206 M6×1 2.5 mm PVDF Natural"
 2656 |     }
 2657 |   },
 2658 |   {
 2659 |     "productId": "809413",
 2660 |     "categoryId": "fittings",
 2661 |     "productTypeId": "hard-tube-fittings",
 2662 |     "seriesId": "standard-ferrule-fitting",
 2663 |     "cardTitle": {
 2664 |       "zh": "HNF-M6-25-PV-B",
 2665 |       "en": "HNF-M6-25-PV-B"
 2666 |     },
 2673 |       "filter02": "M6×1",
 2674 |       "filter03": "2.5 mm",
 2675 |       "filter04": "PVDF",
 2676 |       "filter05": "黑色"
 2677 |     },
 2678 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
 2679 |     "detailSlug": "hard-tube-fittings",
 2680 |     "status": "active",
 2681 |     "sortOrder": 92,
 2682 |     "searchKeywords": {
 2683 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-25-PV-B 809413 443-01-00152 旧版标滚卡箍接头 M6×1 2.5 mm PVDF 黑色",
 2684 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-25-PV-B 809413 443-01-00152 M6×1 2.5 mm PVDF Black"
 2685 |     }
 2686 |   },
 2687 |   {
 2688 |     "productId": "809120",
 2689 |     "categoryId": "fittings",
 2690 |     "productTypeId": "hard-tube-fittings",
 2691 |     "seriesId": "standard-ferrule-fitting",
 2692 |     "cardTitle": {
 2693 |       "zh": "HNF-M6-30-PV-N",
 2694 |       "en": "HNF-M6-30-PV-N"
 2695 |     },
 2702 |       "filter02": "M6×1",
 2703 |       "filter03": "3.0 mm",
 2704 |       "filter04": "PVDF",
 2705 |       "filter05": "本色"
 2706 |     },
 2707 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
 2708 |     "detailSlug": "hard-tube-fittings",
 2709 |     "status": "active",
 2710 |     "sortOrder": 93,
 2711 |     "searchKeywords": {
 2712 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-30-PV-N 809120 443-00-00228 旧版标滚卡箍接头 M6×1 3.0 mm PVDF 本色",
 2713 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-30-PV-N 809120 443-00-00228 M6×1 3.0 mm PVDF Natural"
 2714 |     }
 2715 |   },
 2716 |   {
 2717 |     "productId": "809416",
 2718 |     "categoryId": "fittings",
 2719 |     "productTypeId": "hard-tube-fittings",
 2720 |     "seriesId": "standard-ferrule-fitting",
 2721 |     "cardTitle": {
 2722 |       "zh": "HNF-M6-30-PV-B",
 2723 |       "en": "HNF-M6-30-PV-B"
 2724 |     },
 2731 |       "filter02": "M6×1",
 2732 |       "filter03": "3.0 mm",
 2733 |       "filter04": "PVDF",
 2734 |       "filter05": "黑色"
 2735 |     },
 2736 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
 2737 |     "detailSlug": "hard-tube-fittings",
 2738 |     "status": "active",
 2739 |     "sortOrder": 94,
 2740 |     "searchKeywords": {
 2741 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-30-PV-B 809416 443-01-00155 旧版标滚卡箍接头 M6×1 3.0 mm PVDF 黑色",
 2742 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-30-PV-B 809416 443-01-00155 M6×1 3.0 mm PVDF Black"
 2743 |     }
 2744 |   },
 2745 |   {
 2746 |     "productId": "809112",
 2747 |     "categoryId": "fittings",
 2748 |     "productTypeId": "hard-tube-fittings",
 2749 |     "seriesId": "standard-ferrule-fitting",
 2750 |     "cardTitle": {
 2751 |       "zh": "HNF-M6-32-PV-N",
 2752 |       "en": "HNF-M6-32-PV-N"
 2753 |     },
 2760 |       "filter02": "M6×1",
 2761 |       "filter03": "3.2 mm",
 2762 |       "filter04": "PVDF",
 2763 |       "filter05": "本色"
 2764 |     },
 2765 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
 2766 |     "detailSlug": "hard-tube-fittings",
 2767 |     "status": "active",
 2768 |     "sortOrder": 95,
 2769 |     "searchKeywords": {
 2770 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-32-PV-N 809112 443-00-00207 旧版标滚卡箍接头 M6×1 3.2 mm PVDF 本色",
 2771 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-32-PV-N 809112 443-00-00207 M6×1 3.2 mm PVDF Natural"
 2772 |     }
 2773 |   },
 2774 |   {
 2775 |     "productId": "809414",
 2776 |     "categoryId": "fittings",
 2777 |     "productTypeId": "hard-tube-fittings",
 2778 |     "seriesId": "standard-ferrule-fitting",
 2779 |     "cardTitle": {
 2780 |       "zh": "HNF-M6-32-PV-B",
 2781 |       "en": "HNF-M6-32-PV-B"
 2782 |     },
 2789 |       "filter02": "M6×1",
 2790 |       "filter03": "3.2 mm",
 2791 |       "filter04": "PVDF",
 2792 |       "filter05": "黑色"
 2793 |     },
 2794 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
 2795 |     "detailSlug": "hard-tube-fittings",
 2796 |     "status": "active",
 2797 |     "sortOrder": 96,
 2798 |     "searchKeywords": {
 2799 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-M6-32-PV-B 809414 443-01-00153 旧版标滚卡箍接头 M6×1 3.2 mm PVDF 黑色",
 2800 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-M6-32-PV-B 809414 443-01-00153 M6×1 3.2 mm PVDF Black"
 2801 |     }
 2802 |   },
 2803 |   {
 2804 |     "productId": "809107",
 2805 |     "categoryId": "fittings",
 2806 |     "productTypeId": "hard-tube-fittings",
 2807 |     "seriesId": "standard-ferrule-fitting",
 2808 |     "cardTitle": {
 2809 |       "zh": "HNF-U28-16-PV-N",
 2810 |       "en": "HNF-U28-16-PV-N"
 2811 |     },
 2818 |       "filter02": "1/4-28 UNF",
 2819 |       "filter03": "1.6 mm",
 2820 |       "filter04": "PVDF",
 2821 |       "filter05": "本色"
 2822 |     },
 2823 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
 2824 |     "detailSlug": "hard-tube-fittings",
 2825 |     "status": "active",
 2826 |     "sortOrder": 97,
 2827 |     "searchKeywords": {
 2828 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-16-PV-N 809107 443-00-00058 旧版标滚卡箍接头 1/4-28 UNF 1.6 mm PVDF 本色",
 2829 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-16-PV-N 809107 443-00-00058 1/4-28 UNF 1.6 mm PVDF Natural"
 2830 |     }
 2831 |   },
 2832 |   {
 2833 |     "productId": "809395",
 2834 |     "categoryId": "fittings",
 2835 |     "productTypeId": "hard-tube-fittings",
 2836 |     "seriesId": "standard-ferrule-fitting",
 2837 |     "cardTitle": {
 2838 |       "zh": "HNF-U28-16-PV-B",
 2839 |       "en": "HNF-U28-16-PV-B"
 2840 |     },
 2847 |       "filter02": "1/4-28 UNF",
 2848 |       "filter03": "1.6 mm",
 2849 |       "filter04": "PVDF",
 2850 |       "filter05": "黑色"
 2851 |     },
 2852 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
 2853 |     "detailSlug": "hard-tube-fittings",
 2854 |     "status": "active",
 2855 |     "sortOrder": 98,
 2856 |     "searchKeywords": {
 2857 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-16-PV-B 809395 443-00-00088 旧版标滚卡箍接头 1/4-28 UNF 1.6 mm PVDF 黑色",
 2858 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-16-PV-B 809395 443-00-00088 1/4-28 UNF 1.6 mm PVDF Black"
 2859 |     }
 2860 |   },
 2861 |   {
 2862 |     "productId": "809115",
 2863 |     "categoryId": "fittings",
 2864 |     "productTypeId": "hard-tube-fittings",
 2865 |     "seriesId": "standard-ferrule-fitting",
 2866 |     "cardTitle": {
 2867 |       "zh": "HNF-U28-20-PV-N",
 2868 |       "en": "HNF-U28-20-PV-N"
 2869 |     },
 2876 |       "filter02": "1/4-28 UNF",
 2877 |       "filter03": "2.0 mm",
 2878 |       "filter04": "PVDF",
 2879 |       "filter05": "本色"
 2880 |     },
 2881 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
 2882 |     "detailSlug": "hard-tube-fittings",
 2883 |     "status": "active",
 2884 |     "sortOrder": 99,
 2885 |     "searchKeywords": {
 2886 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-20-PV-N 809115 443-00-00224 旧版标滚卡箍接头 1/4-28 UNF 2.0 mm PVDF 本色",
 2887 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-20-PV-N 809115 443-00-00224 1/4-28 UNF 2.0 mm PVDF Natural"
 2888 |     }
 2889 |   },
 2890 |   {
 2891 |     "productId": "809398",
 2892 |     "categoryId": "fittings",
 2893 |     "productTypeId": "hard-tube-fittings",
 2894 |     "seriesId": "standard-ferrule-fitting",
 2895 |     "cardTitle": {
 2896 |       "zh": "HNF-U28-20-PV-B",
 2897 |       "en": "HNF-U28-20-PV-B"
 2898 |     },
 2905 |       "filter02": "1/4-28 UNF",
 2906 |       "filter03": "2.0 mm",
 2907 |       "filter04": "PVDF",
 2908 |       "filter05": "黑色"
 2909 |     },
 2910 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
 2911 |     "detailSlug": "hard-tube-fittings",
 2912 |     "status": "active",
 2913 |     "sortOrder": 100,
 2914 |     "searchKeywords": {
 2915 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-20-PV-B 809398 443-01-00149 旧版标滚卡箍接头 1/4-28 UNF 2.0 mm PVDF 黑色",
 2916 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-20-PV-B 809398 443-01-00149 1/4-28 UNF 2.0 mm PVDF Black"
 2917 |     }
 2918 |   },
 2919 |   {
 2920 |     "productId": "809123",
 2921 |     "categoryId": "fittings",
 2922 |     "productTypeId": "hard-tube-fittings",
 2923 |     "seriesId": "standard-ferrule-fitting",
 2924 |     "cardTitle": {
 2925 |       "zh": "HNF-U28-25-PV-N",
 2926 |       "en": "HNF-U28-25-PV-N"
 2927 |     },
 2934 |       "filter02": "1/4-28 UNF",
 2935 |       "filter03": "2.5 mm",
 2936 |       "filter04": "PVDF",
 2937 |       "filter05": "本色"
 2938 |     },
 2939 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
 2940 |     "detailSlug": "hard-tube-fittings",
 2941 |     "status": "active",
 2942 |     "sortOrder": 101,
 2943 |     "searchKeywords": {
 2944 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-25-PV-N 809123 443-00-00223 旧版标滚卡箍接头 1/4-28 UNF 2.5 mm PVDF 本色",
 2945 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-25-PV-N 809123 443-00-00223 1/4-28 UNF 2.5 mm PVDF Natural"
 2946 |     }
 2947 |   },
 2948 |   {
 2949 |     "productId": "809396",
 2950 |     "categoryId": "fittings",
 2951 |     "productTypeId": "hard-tube-fittings",
 2952 |     "seriesId": "standard-ferrule-fitting",
 2953 |     "cardTitle": {
 2954 |       "zh": "HNF-U28-25-PV-B",
 2955 |       "en": "HNF-U28-25-PV-B"
 2956 |     },
 2963 |       "filter02": "1/4-28 UNF",
 2964 |       "filter03": "2.5 mm",
 2965 |       "filter04": "PVDF",
 2966 |       "filter05": "黑色"
 2967 |     },
 2968 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
 2969 |     "detailSlug": "hard-tube-fittings",
 2970 |     "status": "active",
 2971 |     "sortOrder": 102,
 2972 |     "searchKeywords": {
 2973 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-25-PV-B 809396 443-01-00148 旧版标滚卡箍接头 1/4-28 UNF 2.5 mm PVDF 黑色",
 2974 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-25-PV-B 809396 443-01-00148 1/4-28 UNF 2.5 mm PVDF Black"
 2975 |     }
 2976 |   },
 2977 |   {
 2978 |     "productId": "809119",
 2979 |     "categoryId": "fittings",
 2980 |     "productTypeId": "hard-tube-fittings",
 2981 |     "seriesId": "standard-ferrule-fitting",
 2982 |     "cardTitle": {
 2983 |       "zh": "HNF-U28-30-PV-N",
 2984 |       "en": "HNF-U28-30-PV-N"
 2985 |     },
 2992 |       "filter02": "1/4-28 UNF",
 2993 |       "filter03": "3.0 mm",
 2994 |       "filter04": "PVDF",
 2995 |       "filter05": "本色"
 2996 |     },
 2997 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
 2998 |     "detailSlug": "hard-tube-fittings",
 2999 |     "status": "active",
 3000 |     "sortOrder": 103,
 3001 |     "searchKeywords": {
 3002 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-30-PV-N 809119 443-00-00226 旧版标滚卡箍接头 1/4-28 UNF 3.0 mm PVDF 本色",
 3003 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-30-PV-N 809119 443-00-00226 1/4-28 UNF 3.0 mm PVDF Natural"
 3004 |     }
 3005 |   },
 3006 |   {
 3007 |     "productId": "809399",
 3008 |     "categoryId": "fittings",
 3009 |     "productTypeId": "hard-tube-fittings",
 3010 |     "seriesId": "standard-ferrule-fitting",
 3011 |     "cardTitle": {
 3012 |       "zh": "HNF-U28-30-PV-B",
 3013 |       "en": "HNF-U28-30-PV-B"
 3014 |     },
 3021 |       "filter02": "1/4-28 UNF",
 3022 |       "filter03": "3.0 mm",
 3023 |       "filter04": "PVDF",
 3024 |       "filter05": "黑色"
 3025 |     },
 3026 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
 3027 |     "detailSlug": "hard-tube-fittings",
 3028 |     "status": "active",
 3029 |     "sortOrder": 104,
 3030 |     "searchKeywords": {
 3031 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-30-PV-B 809399 443-01-00150 旧版标滚卡箍接头 1/4-28 UNF 3.0 mm PVDF 黑色",
 3032 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-30-PV-B 809399 443-01-00150 1/4-28 UNF 3.0 mm PVDF Black"
 3033 |     }
 3034 |   },
 3035 |   {
 3036 |     "productId": "809111",
 3037 |     "categoryId": "fittings",
 3038 |     "productTypeId": "hard-tube-fittings",
 3039 |     "seriesId": "standard-ferrule-fitting",
 3040 |     "cardTitle": {
 3041 |       "zh": "HNF-U28-32-PV-N",
 3042 |       "en": "HNF-U28-32-PV-N"
 3043 |     },
 3050 |       "filter02": "1/4-28 UNF",
 3051 |       "filter03": "3.2 mm",
 3052 |       "filter04": "PVDF",
 3053 |       "filter05": "本色"
 3054 |     },
 3055 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
 3056 |     "detailSlug": "hard-tube-fittings",
 3057 |     "status": "active",
 3058 |     "sortOrder": 105,
 3059 |     "searchKeywords": {
 3060 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-32-PV-N 809111 443-00-00059 旧版标滚卡箍接头 1/4-28 UNF 3.2 mm PVDF 本色",
 3061 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-32-PV-N 809111 443-00-00059 1/4-28 UNF 3.2 mm PVDF Natural"
 3062 |     }
 3063 |   },
 3064 |   {
 3065 |     "productId": "809397",
 3066 |     "categoryId": "fittings",
 3067 |     "productTypeId": "hard-tube-fittings",
 3068 |     "seriesId": "standard-ferrule-fitting",
 3069 |     "cardTitle": {
 3070 |       "zh": "HNF-U28-32-PV-B",
 3071 |       "en": "HNF-U28-32-PV-B"
 3072 |     },
 3079 |       "filter02": "1/4-28 UNF",
 3080 |       "filter03": "3.2 mm",
 3081 |       "filter04": "PVDF",
 3082 |       "filter05": "黑色"
 3083 |     },
 3084 |     "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
 3085 |     "detailSlug": "hard-tube-fittings",
 3086 |     "status": "active",
 3087 |     "sortOrder": 106,
 3088 |     "searchKeywords": {
 3089 |       "zh": "硬管接头 标滚卡箍接头 HNF HNF-U28-32-PV-B 809397 443-00-00094 旧版标滚卡箍接头 1/4-28 UNF 3.2 mm PVDF 黑色",
 3090 |       "en": "hard tube fitting Standard Ferrule Fitting HNF HNF-U28-32-PV-B 809397 443-00-00094 1/4-28 UNF 3.2 mm PVDF Black"
 3091 |     }
 3092 |   },
 3093 |   {
 3094 |     "productId": "809927",
 3095 |     "categoryId": "fittings",
 3096 |     "productTypeId": "hard-tube-fittings",
 3097 |     "seriesId": "standard-ferrule-fitting",
 3098 |     "cardTitle": {
 3099 |       "zh": "HNE-U28-32-PP-N",
 3100 |       "en": "HNE-U28-32-PP-N"
 3101 |     },
 3109 |       "filter03": "3.2 mm",
 3110 |       "filter04": "PP",
 3111 |       "filter05": "本色"
 3112 |     },
 3113 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3114 |     "detailSlug": "hard-tube-fittings",
 3115 |     "status": "active",
 3116 |     "sortOrder": 107,
 3117 |     "searchKeywords": {
 3118 |       "zh": "硬管接头 标滚卡箍接头 HNE HNE-U28-32-PP-N 809927 443-02-00690 环保接头 1/4-28 UNF 3.2 mm PP 本色",
 3119 |       "en": "hard tube fitting Standard Ferrule Fitting HNE HNE-U28-32-PP-N 809927 443-02-00690 1/4-28 UNF 3.2 mm PP Natural"
 3120 |     }
 3121 |   },
 3122 |   {
 3123 |     "productId": "809776",
 3124 |     "categoryId": "fittings",
 3125 |     "productTypeId": "hard-tube-fittings",
 3126 |     "seriesId": "compact-ferrule-fitting",
 3127 |     "cardTitle": {
 3128 |       "zh": "HN6-M6-16-PV-N",
 3129 |       "en": "HN6-M6-16-PV-N"
 3130 |     },
 3137 |       "filter02": "M6×1",
 3138 |       "filter03": "1.6 mm",
 3139 |       "filter04": "PVDF",
 3140 |       "filter05": "本色"
 3141 |     },
 3142 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
 3143 |     "detailSlug": "hard-tube-fittings",
 3144 |     "status": "active",
 3145 |     "sortOrder": 108,
 3146 |     "searchKeywords": {
 3147 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-16-PV-N 809776 443-02-00442 新版紧凑卡箍接头 M6×1 1.6 mm PVDF 本色",
 3148 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-16-PV-N 809776 443-02-00442 M6×1 1.6 mm PVDF Natural"
 3149 |     }
 3150 |   },
 3151 |   {
 3152 |     "productId": "809777",
 3153 |     "categoryId": "fittings",
 3154 |     "productTypeId": "hard-tube-fittings",
 3155 |     "seriesId": "compact-ferrule-fitting",
 3156 |     "cardTitle": {
 3157 |       "zh": "HN6-M6-16-PS-B",
 3158 |       "en": "HN6-M6-16-PS-B"
 3159 |     },
 3166 |       "filter02": "M6×1",
 3167 |       "filter03": "1.6 mm",
 3168 |       "filter04": "PPS",
 3169 |       "filter05": "黑色"
 3170 |     },
 3171 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ps-b-main.jpg",
 3172 |     "detailSlug": "hard-tube-fittings",
 3173 |     "status": "active",
 3174 |     "sortOrder": 109,
 3175 |     "searchKeywords": {
 3176 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-16-PS-B 809777 443-02-00443 新版紧凑卡箍接头 M6×1 1.6 mm PPS 黑色",
 3177 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-16-PS-B 809777 443-02-00443 M6×1 1.6 mm PPS Black"
 3178 |     }
 3179 |   },
 3180 |   {
 3181 |     "productId": "809732",
 3182 |     "categoryId": "fittings",
 3183 |     "productTypeId": "hard-tube-fittings",
 3184 |     "seriesId": "compact-ferrule-fitting",
 3185 |     "cardTitle": {
 3186 |       "zh": "HN6-M6-16-PK-N",
 3187 |       "en": "HN6-M6-16-PK-N"
 3188 |     },
 3195 |       "filter02": "M6×1",
 3196 |       "filter03": "1.6 mm",
 3197 |       "filter04": "PEEK",
 3198 |       "filter05": "本色"
 3199 |     },
 3200 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
 3201 |     "detailSlug": "hard-tube-fittings",
 3202 |     "status": "active",
 3203 |     "sortOrder": 110,
 3204 |     "searchKeywords": {
 3205 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-16-PK-N 809732 443-02-00374 新版紧凑卡箍接头 M6×1 1.6 mm PEEK 本色",
 3206 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-16-PK-N 809732 443-02-00374 M6×1 1.6 mm PEEK Natural"
 3207 |     }
 3208 |   },
 3209 |   {
 3210 |     "productId": "809797",
 3211 |     "categoryId": "fittings",
 3212 |     "productTypeId": "hard-tube-fittings",
 3213 |     "seriesId": "compact-ferrule-fitting",
 3214 |     "cardTitle": {
 3215 |       "zh": "HN6-M6-16-AC-B",
 3216 |       "en": "HN6-M6-16-AC-B"
 3217 |     },
 3224 |       "filter02": "M6×1",
 3225 |       "filter03": "1.6 mm",
 3226 |       "filter04": "POM",
 3227 |       "filter05": "黑色"
 3228 |     },
 3229 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-ac-b-main.jpg",
 3230 |     "detailSlug": "hard-tube-fittings",
 3231 |     "status": "active",
 3232 |     "sortOrder": 111,
 3233 |     "searchKeywords": {
 3234 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-16-AC-B 809797 443-02-00483 新版紧凑卡箍接头 M6×1 1.6 mm POM 黑色",
 3235 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-16-AC-B 809797 443-02-00483 M6×1 1.6 mm POM Black"
 3236 |     }
 3237 |   },
 3238 |   {
 3239 |     "productId": "809779",
 3240 |     "categoryId": "fittings",
 3241 |     "productTypeId": "hard-tube-fittings",
 3242 |     "seriesId": "compact-ferrule-fitting",
 3243 |     "cardTitle": {
 3244 |       "zh": "HN6-M6-32-PS-B",
 3245 |       "en": "HN6-M6-32-PS-B"
 3246 |     },
 3253 |       "filter02": "M6×1",
 3254 |       "filter03": "3.2 mm",
 3255 |       "filter04": "PPS",
 3256 |       "filter05": "黑色"
 3257 |     },
 3258 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ps-b-main.jpg",
 3259 |     "detailSlug": "hard-tube-fittings",
 3260 |     "status": "active",
 3261 |     "sortOrder": 112,
 3262 |     "searchKeywords": {
 3263 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-32-PS-B 809779 443-02-00445 新版紧凑卡箍接头 M6×1 3.2 mm PPS 黑色",
 3264 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-32-PS-B 809779 443-02-00445 M6×1 3.2 mm PPS Black"
 3265 |     }
 3266 |   },
 3267 |   {
 3268 |     "productId": "809733",
 3269 |     "categoryId": "fittings",
 3270 |     "productTypeId": "hard-tube-fittings",
 3271 |     "seriesId": "compact-ferrule-fitting",
 3272 |     "cardTitle": {
 3273 |       "zh": "HN6-M6-32-PK-N",
 3274 |       "en": "HN6-M6-32-PK-N"
 3275 |     },
 3282 |       "filter02": "M6×1",
 3283 |       "filter03": "3.2 mm",
 3284 |       "filter04": "PEEK",
 3285 |       "filter05": "本色"
 3286 |     },
 3287 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
 3288 |     "detailSlug": "hard-tube-fittings",
 3289 |     "status": "active",
 3290 |     "sortOrder": 113,
 3291 |     "searchKeywords": {
 3292 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-32-PK-N 809733 443-02-00375 新版紧凑卡箍接头 M6×1 3.2 mm PEEK 本色",
 3293 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-32-PK-N 809733 443-02-00375 M6×1 3.2 mm PEEK Natural"
 3294 |     }
 3295 |   },
 3296 |   {
 3297 |     "productId": "809798",
 3298 |     "categoryId": "fittings",
 3299 |     "productTypeId": "hard-tube-fittings",
 3300 |     "seriesId": "compact-ferrule-fitting",
 3301 |     "cardTitle": {
 3302 |       "zh": "HN6-M6-32-AC-B",
 3303 |       "en": "HN6-M6-32-AC-B"
 3304 |     },
 3311 |       "filter02": "M6×1",
 3312 |       "filter03": "3.2 mm",
 3313 |       "filter04": "POM",
 3314 |       "filter05": "黑色"
 3315 |     },
 3316 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-ac-b-main.jpg",
 3317 |     "detailSlug": "hard-tube-fittings",
 3318 |     "status": "active",
 3319 |     "sortOrder": 114,
 3320 |     "searchKeywords": {
 3321 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-M6-32-AC-B 809798 443-02-00484 新版紧凑卡箍接头 M6×1 3.2 mm POM 黑色",
 3322 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-M6-32-AC-B 809798 443-02-00484 M6×1 3.2 mm POM Black"
 3323 |     }
 3324 |   },
 3325 |   {
 3326 |     "productId": "809772",
 3327 |     "categoryId": "fittings",
 3328 |     "productTypeId": "hard-tube-fittings",
 3329 |     "seriesId": "compact-ferrule-fitting",
 3330 |     "cardTitle": {
 3331 |       "zh": "HN6-U28-16-PV-N",
 3332 |       "en": "HN6-U28-16-PV-N"
 3333 |     },
 3340 |       "filter02": "1/4-28 UNF",
 3341 |       "filter03": "1.6 mm",
 3342 |       "filter04": "PVDF",
 3343 |       "filter05": "本色"
 3344 |     },
 3345 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
 3346 |     "detailSlug": "hard-tube-fittings",
 3347 |     "status": "active",
 3348 |     "sortOrder": 115,
 3349 |     "searchKeywords": {
 3350 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-16-PV-N 809772 443-02-00438 新版紧凑卡箍接头 1/4-28 UNF 1.6 mm PVDF 本色",
 3351 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-16-PV-N 809772 443-02-00438 1/4-28 UNF 1.6 mm PVDF Natural"
 3352 |     }
 3353 |   },
 3354 |   {
 3355 |     "productId": "809773",
 3356 |     "categoryId": "fittings",
 3357 |     "productTypeId": "hard-tube-fittings",
 3358 |     "seriesId": "compact-ferrule-fitting",
 3359 |     "cardTitle": {
 3360 |       "zh": "HN6-U28-16-PS-B",
 3361 |       "en": "HN6-U28-16-PS-B"
 3362 |     },
 3369 |       "filter02": "1/4-28 UNF",
 3370 |       "filter03": "1.6 mm",
 3371 |       "filter04": "PPS",
 3372 |       "filter05": "黑色"
 3373 |     },
 3374 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ps-b-main.jpg",
 3375 |     "detailSlug": "hard-tube-fittings",
 3376 |     "status": "active",
 3377 |     "sortOrder": 116,
 3378 |     "searchKeywords": {
 3379 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-16-PS-B 809773 443-02-00439 新版紧凑卡箍接头 1/4-28 UNF 1.6 mm PPS 黑色",
 3380 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-16-PS-B 809773 443-02-00439 1/4-28 UNF 1.6 mm PPS Black"
 3381 |     }
 3382 |   },
 3383 |   {
 3384 |     "productId": "809730",
 3385 |     "categoryId": "fittings",
 3386 |     "productTypeId": "hard-tube-fittings",
 3387 |     "seriesId": "compact-ferrule-fitting",
 3388 |     "cardTitle": {
 3389 |       "zh": "HN6-U28-16-PK-N",
 3390 |       "en": "HN6-U28-16-PK-N"
 3391 |     },
 3398 |       "filter02": "1/4-28 UNF",
 3399 |       "filter03": "1.6 mm",
 3400 |       "filter04": "PEEK",
 3401 |       "filter05": "本色"
 3402 |     },
 3403 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
 3404 |     "detailSlug": "hard-tube-fittings",
 3405 |     "status": "active",
 3406 |     "sortOrder": 117,
 3407 |     "searchKeywords": {
 3408 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-16-PK-N 809730 443-02-00372 新版紧凑卡箍接头 1/4-28 UNF 1.6 mm PEEK 本色",
 3409 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-16-PK-N 809730 443-02-00372 1/4-28 UNF 1.6 mm PEEK Natural"
 3410 |     }
 3411 |   },
 3412 |   {
 3413 |     "productId": "809800",
 3414 |     "categoryId": "fittings",
 3415 |     "productTypeId": "hard-tube-fittings",
 3416 |     "seriesId": "compact-ferrule-fitting",
 3417 |     "cardTitle": {
 3418 |       "zh": "HN6-U28-16-AC-B",
 3419 |       "en": "HN6-U28-16-AC-B"
 3420 |     },
 3427 |       "filter02": "1/4-28 UNF",
 3428 |       "filter03": "1.6 mm",
 3429 |       "filter04": "POM",
 3430 |       "filter05": "黑色"
 3431 |     },
 3432 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-ac-b-main.jpg",
 3433 |     "detailSlug": "hard-tube-fittings",
 3434 |     "status": "active",
 3435 |     "sortOrder": 118,
 3436 |     "searchKeywords": {
 3437 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-16-AC-B 809800 443-02-00486 新版紧凑卡箍接头 1/4-28 UNF 1.6 mm POM 黑色",
 3438 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-16-AC-B 809800 443-02-00486 1/4-28 UNF 1.6 mm POM Black"
 3439 |     }
 3440 |   },
 3441 |   {
 3442 |     "productId": "809774",
 3443 |     "categoryId": "fittings",
 3444 |     "productTypeId": "hard-tube-fittings",
 3445 |     "seriesId": "compact-ferrule-fitting",
 3446 |     "cardTitle": {
 3447 |       "zh": "HN6-U28-32-PV-N",
 3448 |       "en": "HN6-U28-32-PV-N"
 3449 |     },
 3456 |       "filter02": "1/4-28 UNF",
 3457 |       "filter03": "3.2 mm",
 3458 |       "filter04": "PVDF",
 3459 |       "filter05": "本色"
 3460 |     },
 3461 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
 3462 |     "detailSlug": "hard-tube-fittings",
 3463 |     "status": "active",
 3464 |     "sortOrder": 119,
 3465 |     "searchKeywords": {
 3466 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-32-PV-N 809774 443-02-00440 新版紧凑卡箍接头 1/4-28 UNF 3.2 mm PVDF 本色",
 3467 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-32-PV-N 809774 443-02-00440 1/4-28 UNF 3.2 mm PVDF Natural"
 3468 |     }
 3469 |   },
 3470 |   {
 3471 |     "productId": "809775",
 3472 |     "categoryId": "fittings",
 3473 |     "productTypeId": "hard-tube-fittings",
 3474 |     "seriesId": "compact-ferrule-fitting",
 3475 |     "cardTitle": {
 3476 |       "zh": "HN6-U28-32-PS-B",
 3477 |       "en": "HN6-U28-32-PS-B"
 3478 |     },
 3485 |       "filter02": "1/4-28 UNF",
 3486 |       "filter03": "3.2 mm",
 3487 |       "filter04": "PPS",
 3488 |       "filter05": "黑色"
 3489 |     },
 3490 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
 3491 |     "detailSlug": "hard-tube-fittings",
 3492 |     "status": "active",
 3493 |     "sortOrder": 120,
 3494 |     "searchKeywords": {
 3495 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-32-PS-B 809775 443-02-00441 新版紧凑卡箍接头 1/4-28 UNF 3.2 mm PPS 黑色",
 3496 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-32-PS-B 809775 443-02-00441 1/4-28 UNF 3.2 mm PPS Black"
 3497 |     }
 3498 |   },
 3499 |   {
 3500 |     "productId": "809923",
 3501 |     "categoryId": "fittings",
 3502 |     "productTypeId": "hard-tube-fittings",
 3503 |     "seriesId": "compact-ferrule-fitting",
 3504 |     "cardTitle": {
 3505 |       "zh": "HN6-U28-32-PK-B",
 3506 |       "en": "HN6-U28-32-PK-B"
 3507 |     },
 3514 |       "filter02": "1/4-28 UNF",
 3515 |       "filter03": "3.2 mm",
 3516 |       "filter04": "PEEK",
 3517 |       "filter05": "黑色"
 3518 |     },
 3519 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
 3520 |     "detailSlug": "hard-tube-fittings",
 3521 |     "status": "active",
 3522 |     "sortOrder": 121,
 3523 |     "searchKeywords": {
 3524 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-32-PK-B 809923 443-02-00678 新版紧凑卡箍接头 1/4-28 UNF 3.2 mm PEEK 黑色",
 3525 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-32-PK-B 809923 443-02-00678 1/4-28 UNF 3.2 mm PEEK Black"
 3526 |     }
 3527 |   },
 3528 |   {
 3529 |     "productId": "809793",
 3530 |     "categoryId": "fittings",
 3531 |     "productTypeId": "hard-tube-fittings",
 3532 |     "seriesId": "compact-ferrule-fitting",
 3533 |     "cardTitle": {
 3534 |       "zh": "HN6-U28-32-AC-B",
 3535 |       "en": "HN6-U28-32-AC-B"
 3536 |     },
 3543 |       "filter02": "1/4-28 UNF",
 3544 |       "filter03": "3.2 mm",
 3545 |       "filter04": "POM",
 3546 |       "filter05": "黑色"
 3547 |     },
 3548 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-ac-b-main.jpg",
 3549 |     "detailSlug": "hard-tube-fittings",
 3550 |     "status": "active",
 3551 |     "sortOrder": 122,
 3552 |     "searchKeywords": {
 3553 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-32-AC-B 809793 443-02-00479 新版紧凑卡箍接头 1/4-28 UNF 3.2 mm POM 黑色",
 3554 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-32-AC-B 809793 443-02-00479 1/4-28 UNF 3.2 mm POM Black"
 3555 |     }
 3556 |   },
 3557 |   {
 3558 |     "productId": "809935",
 3559 |     "categoryId": "fittings",
 3560 |     "productTypeId": "hard-tube-fittings",
 3561 |     "seriesId": "compact-ferrule-fitting",
 3562 |     "cardTitle": {
 3563 |       "zh": "HN6-U28-32-ET-N",
 3564 |       "en": "HN6-U28-32-ET-N"
 3565 |     },
 3572 |       "filter02": "1/4-28 UNF",
 3573 |       "filter03": "3.2 mm",
 3574 |       "filter04": "ETFE",
 3575 |       "filter05": "本色"
 3576 |     },
 3577 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-32-main.jpg",
 3578 |     "detailSlug": "hard-tube-fittings",
 3579 |     "status": "active",
 3580 |     "sortOrder": 123,
 3581 |     "searchKeywords": {
 3582 |       "zh": "硬管接头 紧凑卡箍接头 HN6 HN6-U28-32-ET-N 809935 443-02-00705 新版紧凑卡箍接头 1/4-28 UNF 3.2 mm ETFE 本色",
 3583 |       "en": "hard tube fitting Compact Ferrule Fitting HN6 HN6-U28-32-ET-N 809935 443-02-00705 1/4-28 UNF 3.2 mm ETFE Natural"
 3584 |     }
 3585 |   },
 3586 |   {
 3587 |     "productId": "809128",
 3588 |     "categoryId": "fittings",
 3589 |     "productTypeId": "hard-tube-fittings",
 3590 |     "seriesId": "compact-ferrule-fitting",
 3591 |     "cardTitle": {
 3592 |       "zh": "HNF6-M6-16-PS-B",
 3593 |       "en": "HNF6-M6-16-PS-B"
 3594 |     },
 3601 |       "filter02": "M6×1",
 3602 |       "filter03": "1.6 mm",
 3603 |       "filter04": "PPS",
 3604 |       "filter05": "黑色"
 3605 |     },
 3606 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
 3607 |     "detailSlug": "hard-tube-fittings",
 3608 |     "status": "active",
 3609 |     "sortOrder": 124,
 3610 |     "searchKeywords": {
 3611 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-M6-16-PS-B 809128 443-02-00662 旧版紧凑卡箍接头 M6×1 1.6 mm PPS 黑色",
 3612 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-M6-16-PS-B 809128 443-02-00662 M6×1 1.6 mm PPS Black"
 3613 |     }
 3614 |   },
 3615 |   {
 3616 |     "productId": "809148",
 3617 |     "categoryId": "fittings",
 3618 |     "productTypeId": "hard-tube-fittings",
 3619 |     "seriesId": "compact-ferrule-fitting",
 3620 |     "cardTitle": {
 3621 |       "zh": "HNF6-M6-20-PS-B",
 3622 |       "en": "HNF6-M6-20-PS-B"
 3623 |     },
 3630 |       "filter02": "M6×1",
 3631 |       "filter03": "2.0 mm",
 3632 |       "filter04": "PPS",
 3633 |       "filter05": "黑色"
 3634 |     },
 3635 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
 3636 |     "detailSlug": "hard-tube-fittings",
 3637 |     "status": "active",
 3638 |     "sortOrder": 125,
 3639 |     "searchKeywords": {
 3640 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-M6-20-PS-B 809148 443-02-00660 旧版紧凑卡箍接头 M6×1 2.0 mm PPS 黑色",
 3641 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-M6-20-PS-B 809148 443-02-00660 M6×1 2.0 mm PPS Black"
 3642 |     }
 3643 |   },
 3644 |   {
 3645 |     "productId": "809168",
 3646 |     "categoryId": "fittings",
 3647 |     "productTypeId": "hard-tube-fittings",
 3648 |     "seriesId": "compact-ferrule-fitting",
 3649 |     "cardTitle": {
 3650 |       "zh": "HNF6-M6-25-PS-B",
 3651 |       "en": "HNF6-M6-25-PS-B"
 3652 |     },
 3659 |       "filter02": "M6×1",
 3660 |       "filter03": "2.5 mm",
 3661 |       "filter04": "PPS",
 3662 |       "filter05": "黑色"
 3663 |     },
 3664 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
 3665 |     "detailSlug": "hard-tube-fittings",
 3666 |     "status": "active",
 3667 |     "sortOrder": 126,
 3668 |     "searchKeywords": {
 3669 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-M6-25-PS-B 809168 443-02-00661 旧版紧凑卡箍接头 M6×1 2.5 mm PPS 黑色",
 3670 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-M6-25-PS-B 809168 443-02-00661 M6×1 2.5 mm PPS Black"
 3671 |     }
 3672 |   },
 3673 |   {
 3674 |     "productId": "809158",
 3675 |     "categoryId": "fittings",
 3676 |     "productTypeId": "hard-tube-fittings",
 3677 |     "seriesId": "compact-ferrule-fitting",
 3678 |     "cardTitle": {
 3679 |       "zh": "HNF6-M6-30-PS-B",
 3680 |       "en": "HNF6-M6-30-PS-B"
 3681 |     },
 3688 |       "filter02": "M6×1",
 3689 |       "filter03": "3.0 mm",
 3690 |       "filter04": "PPS",
 3691 |       "filter05": "黑色"
 3692 |     },
 3693 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
 3694 |     "detailSlug": "hard-tube-fittings",
 3695 |     "status": "active",
 3696 |     "sortOrder": 127,
 3697 |     "searchKeywords": {
 3698 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-M6-30-PS-B 809158 443-02-00658 旧版紧凑卡箍接头 M6×1 3.0 mm PPS 黑色",
 3699 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-M6-30-PS-B 809158 443-02-00658 M6×1 3.0 mm PPS Black"
 3700 |     }
 3701 |   },
 3702 |   {
 3703 |     "productId": "809138",
 3704 |     "categoryId": "fittings",
 3705 |     "productTypeId": "hard-tube-fittings",
 3706 |     "seriesId": "compact-ferrule-fitting",
 3707 |     "cardTitle": {
 3708 |       "zh": "HNF6-M6-32-PS-B",
 3709 |       "en": "HNF6-M6-32-PS-B"
 3710 |     },
 3717 |       "filter02": "M6×1",
 3718 |       "filter03": "3.2 mm",
 3719 |       "filter04": "PPS",
 3720 |       "filter05": "黑色"
 3721 |     },
 3722 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
 3723 |     "detailSlug": "hard-tube-fittings",
 3724 |     "status": "active",
 3725 |     "sortOrder": 128,
 3726 |     "searchKeywords": {
 3727 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-M6-32-PS-B 809138 443-02-00659 旧版紧凑卡箍接头 M6×1 3.2 mm PPS 黑色",
 3728 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-M6-32-PS-B 809138 443-02-00659 M6×1 3.2 mm PPS Black"
 3729 |     }
 3730 |   },
 3731 |   {
 3732 |     "productId": "809127",
 3733 |     "categoryId": "fittings",
 3734 |     "productTypeId": "hard-tube-fittings",
 3735 |     "seriesId": "compact-ferrule-fitting",
 3736 |     "cardTitle": {
 3737 |       "zh": "HNF6-U28-16-PS-B",
 3738 |       "en": "HNF6-U28-16-PS-B"
 3739 |     },
 3746 |       "filter02": "1/4-28 UNF",
 3747 |       "filter03": "1.6 mm",
 3748 |       "filter04": "PPS",
 3749 |       "filter05": "黑色"
 3750 |     },
 3751 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
 3752 |     "detailSlug": "hard-tube-fittings",
 3753 |     "status": "active",
 3754 |     "sortOrder": 129,
 3755 |     "searchKeywords": {
 3756 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-16-PS-B 809127 443-02-00657 旧版紧凑卡箍接头 1/4-28 UNF 1.6 mm PPS 黑色",
 3757 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-16-PS-B 809127 443-02-00657 1/4-28 UNF 1.6 mm PPS Black"
 3758 |     }
 3759 |   },
 3760 |   {
 3761 |     "productId": "809553",
 3762 |     "categoryId": "fittings",
 3763 |     "productTypeId": "hard-tube-fittings",
 3764 |     "seriesId": "compact-ferrule-fitting",
 3765 |     "cardTitle": {
 3766 |       "zh": "HNF6-U28-16-PS-U",
 3767 |       "en": "HNF6-U28-16-PS-U"
 3768 |     },
 3775 |       "filter02": "1/4-28 UNF",
 3776 |       "filter03": "1.6 mm",
 3777 |       "filter04": "PPS",
 3778 |       "filter05": "蓝色"
 3779 |     },
 3780 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-16-main.jpg",
 3781 |     "detailSlug": "hard-tube-fittings",
 3782 |     "status": "active",
 3783 |     "sortOrder": 130,
 3784 |     "searchKeywords": {
 3785 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-16-PS-U 809553 443-02-00665 旧版紧凑卡箍接头 1/4-28 UNF 1.6 mm PPS 蓝色",
 3786 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-16-PS-U 809553 443-02-00665 1/4-28 UNF 1.6 mm PPS Blue"
 3787 |     }
 3788 |   },
 3789 |   {
 3790 |     "productId": "809147",
 3791 |     "categoryId": "fittings",
 3792 |     "productTypeId": "hard-tube-fittings",
 3793 |     "seriesId": "compact-ferrule-fitting",
 3794 |     "cardTitle": {
 3795 |       "zh": "HNF6-U28-20-PS-B",
 3796 |       "en": "HNF6-U28-20-PS-B"
 3797 |     },
 3804 |       "filter02": "1/4-28 UNF",
 3805 |       "filter03": "2.0 mm",
 3806 |       "filter04": "PPS",
 3807 |       "filter05": "黑色"
 3808 |     },
 3809 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
 3810 |     "detailSlug": "hard-tube-fittings",
 3811 |     "status": "active",
 3812 |     "sortOrder": 131,
 3813 |     "searchKeywords": {
 3814 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-20-PS-B 809147 443-02-00655 旧版紧凑卡箍接头 1/4-28 UNF 2.0 mm PPS 黑色",
 3815 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-20-PS-B 809147 443-02-00655 1/4-28 UNF 2.0 mm PPS Black"
 3816 |     }
 3817 |   },
 3818 |   {
 3819 |     "productId": "809554",
 3820 |     "categoryId": "fittings",
 3821 |     "productTypeId": "hard-tube-fittings",
 3822 |     "seriesId": "compact-ferrule-fitting",
 3823 |     "cardTitle": {
 3824 |       "zh": "HNF6-U28-20-PS-U",
 3825 |       "en": "HNF6-U28-20-PS-U"
 3826 |     },
 3833 |       "filter02": "1/4-28 UNF",
 3834 |       "filter03": "2.0 mm",
 3835 |       "filter04": "PPS",
 3836 |       "filter05": "蓝色"
 3837 |     },
 3838 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-20-main.jpg",
 3839 |     "detailSlug": "hard-tube-fittings",
 3840 |     "status": "active",
 3841 |     "sortOrder": 132,
 3842 |     "searchKeywords": {
 3843 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-20-PS-U 809554 443-02-00666 旧版紧凑卡箍接头 1/4-28 UNF 2.0 mm PPS 蓝色",
 3844 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-20-PS-U 809554 443-02-00666 1/4-28 UNF 2.0 mm PPS Blue"
 3845 |     }
 3846 |   },
 3847 |   {
 3848 |     "productId": "809167",
 3849 |     "categoryId": "fittings",
 3850 |     "productTypeId": "hard-tube-fittings",
 3851 |     "seriesId": "compact-ferrule-fitting",
 3852 |     "cardTitle": {
 3853 |       "zh": "HNF6-U28-25-PS-B",
 3854 |       "en": "HNF6-U28-25-PS-B"
 3855 |     },
 3862 |       "filter02": "1/4-28 UNF",
 3863 |       "filter03": "2.5 mm",
 3864 |       "filter04": "PPS",
 3865 |       "filter05": "黑色"
 3866 |     },
 3867 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
 3868 |     "detailSlug": "hard-tube-fittings",
 3869 |     "status": "active",
 3870 |     "sortOrder": 133,
 3871 |     "searchKeywords": {
 3872 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-25-PS-B 809167 443-02-00656 旧版紧凑卡箍接头 1/4-28 UNF 2.5 mm PPS 黑色",
 3873 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-25-PS-B 809167 443-02-00656 1/4-28 UNF 2.5 mm PPS Black"
 3874 |     }
 3875 |   },
 3876 |   {
 3877 |     "productId": "809157",
 3878 |     "categoryId": "fittings",
 3879 |     "productTypeId": "hard-tube-fittings",
 3880 |     "seriesId": "compact-ferrule-fitting",
 3881 |     "cardTitle": {
 3882 |       "zh": "HNF6-U28-30-PS-B",
 3883 |       "en": "HNF6-U28-30-PS-B"
 3884 |     },
 3891 |       "filter02": "1/4-28 UNF",
 3892 |       "filter03": "3.0 mm",
 3893 |       "filter04": "PPS",
 3894 |       "filter05": "黑色"
 3895 |     },
 3896 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
 3897 |     "detailSlug": "hard-tube-fittings",
 3898 |     "status": "active",
 3899 |     "sortOrder": 134,
 3900 |     "searchKeywords": {
 3901 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-30-PS-B 809157 443-02-00653 旧版紧凑卡箍接头 1/4-28 UNF 3.0 mm PPS 黑色",
 3902 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-30-PS-B 809157 443-02-00653 1/4-28 UNF 3.0 mm PPS Black"
 3903 |     }
 3904 |   },
 3905 |   {
 3906 |     "productId": "809137",
 3907 |     "categoryId": "fittings",
 3908 |     "productTypeId": "hard-tube-fittings",
 3909 |     "seriesId": "compact-ferrule-fitting",
 3910 |     "cardTitle": {
 3911 |       "zh": "HNF6-U28-32-PS-B",
 3912 |       "en": "HNF6-U28-32-PS-B"
 3913 |     },
 3920 |       "filter02": "1/4-28 UNF",
 3921 |       "filter03": "3.2 mm",
 3922 |       "filter04": "PPS",
 3923 |       "filter05": "黑色"
 3924 |     },
 3925 |     "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
 3926 |     "detailSlug": "hard-tube-fittings",
 3927 |     "status": "active",
 3928 |     "sortOrder": 135,
 3929 |     "searchKeywords": {
 3930 |       "zh": "硬管接头 紧凑卡箍接头 HNF6 HNF6-U28-32-PS-B 809137 443-02-00654 旧版紧凑卡箍接头 1/4-28 UNF 3.2 mm PPS 黑色",
 3931 |       "en": "hard tube fitting Compact Ferrule Fitting HNF6 HNF6-U28-32-PS-B 809137 443-02-00654 1/4-28 UNF 3.2 mm PPS Black"
 3932 |     }
 3933 |   },
 3934 |   {
 3935 |     "productId": "809922",
 3936 |     "categoryId": "fittings",
 3937 |     "productTypeId": "hard-tube-fittings",
 3938 |     "seriesId": "compact-ferrule-fitting",
 3939 |     "cardTitle": {
 3940 |       "zh": "HNE6-U28-32-PS-B",
 3941 |       "en": "HNE6-U28-32-PS-B"
 3942 |     },
 3950 |       "filter03": "3.2 mm",
 3951 |       "filter04": "PPS",
 3952 |       "filter05": "黑色"
 3953 |     },
 3954 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3955 |     "detailSlug": "hard-tube-fittings",
 3956 |     "status": "active",
 3957 |     "sortOrder": 136,
 3958 |     "searchKeywords": {
 3959 |       "zh": "硬管接头 紧凑卡箍接头 HNE6 HNE6-U28-32-PS-B 809922 443-02-00677 环保接头 1/4-28 UNF 3.2 mm PPS 黑色",
 3960 |       "en": "hard tube fitting Compact Ferrule Fitting HNE6 HNE6-U28-32-PS-B 809922 443-02-00677 1/4-28 UNF 3.2 mm PPS Black"
 3961 |     }
 3962 |   },
 3963 |   {
 3964 |     "productId": "809937",
 3965 |     "categoryId": "fittings",
 3966 |     "productTypeId": "hard-tube-fittings",
 3967 |     "seriesId": "retaining-ring-fitting",
 3968 |     "cardTitle": {
 3969 |       "zh": "HSF-U28-16-PK-N",
 3970 |       "en": "HSF-U28-16-PK-N"
 3971 |     },
 3979 |       "filter03": "1.6 mm",
 3980 |       "filter04": "PEEK",
 3981 |       "filter05": "本色"
 3982 |     },
 3983 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 3984 |     "detailSlug": "hard-tube-fittings",
 3985 |     "status": "active",
 3986 |     "sortOrder": 137,
 3987 |     "searchKeywords": {
 3988 |       "zh": "硬管接头 卡环接头 HSF HSF-U28-16-PK-N 809937 441-09-00260 卡环接头 1/4-28 UNF 1.6 mm PEEK 本色",
 3989 |       "en": "hard tube fitting Retaining-ring Fitting HSF HSF-U28-16-PK-N 809937 441-09-00260 1/4-28 UNF 1.6 mm PEEK Natural"
 3990 |     }
 3991 |   },
 3992 |   {
 3993 |     "productId": "809861",
 3994 |     "categoryId": "fittings",
 3995 |     "productTypeId": "hard-tube-fittings",
 3996 |     "seriesId": "retaining-ring-fitting",
 3997 |     "cardTitle": {
 3998 |       "zh": "HSF-U28-32-PEEK-N",
 3999 |       "en": "HSF-U28-32-PEEK-N"
 4000 |     },
 4008 |       "filter03": "3.2 mm",
 4009 |       "filter04": "PEEK",
 4010 |       "filter05": "本色"
 4011 |     },
 4012 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4013 |     "detailSlug": "hard-tube-fittings",
 4014 |     "status": "active",
 4015 |     "sortOrder": 138,
 4016 |     "searchKeywords": {
 4017 |       "zh": "硬管接头 卡环接头 HSF HSF-U28-32-PEEK-N 809861 443-02-00614 卡环接头 1/4-28 UNF 3.2 mm PEEK 本色",
 4018 |       "en": "hard tube fitting Retaining-ring Fitting HSF HSF-U28-32-PEEK-N 809861 443-02-00614 1/4-28 UNF 3.2 mm PEEK Natural"
 4019 |     }
 4020 |   },
 4021 |   {
 4022 |     "productId": "809816",
 4023 |     "categoryId": "fittings",
 4024 |     "productTypeId": "hard-tube-fittings",
 4025 |     "seriesId": "retaining-ring-fitting",
 4026 |     "cardTitle": {
 4027 |       "zh": "HSF6-M6-16-PS-B",
 4028 |       "en": "HSF6-M6-16-PS-B"
 4029 |     },
 4037 |       "filter03": "1.6 mm",
 4038 |       "filter04": "PPS",
 4039 |       "filter05": "黑色"
 4040 |     },
 4041 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4042 |     "detailSlug": "hard-tube-fittings",
 4043 |     "status": "active",
 4044 |     "sortOrder": 139,
 4045 |     "searchKeywords": {
 4046 |       "zh": "硬管接头 卡环接头 HSF6 HSF6-M6-16-PS-B 809816 443-02-00706 卡环接头 M6×1 1.6 mm PPS 黑色",
 4047 |       "en": "hard tube fitting Retaining-ring Fitting HSF6 HSF6-M6-16-PS-B 809816 443-02-00706 M6×1 1.6 mm PPS Black"
 4048 |     }
 4049 |   },
 4050 |   {
 4051 |     "productId": "809837",
 4052 |     "categoryId": "fittings",
 4053 |     "productTypeId": "hard-tube-fittings",
 4054 |     "seriesId": "retaining-ring-fitting",
 4055 |     "cardTitle": {
 4056 |       "zh": "HSF6-M6-18-PS-B",
 4057 |       "en": "HSF6-M6-18-PS-B"
 4058 |     },
 4066 |       "filter03": "1.8 mm",
 4067 |       "filter04": "PPS",
 4068 |       "filter05": "黑色"
 4069 |     },
 4070 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4071 |     "detailSlug": "hard-tube-fittings",
 4072 |     "status": "active",
 4073 |     "sortOrder": 140,
 4074 |     "searchKeywords": {
 4075 |       "zh": "硬管接头 卡环接头 HSF6 HSF6-M6-18-PS-B 809837 443-02-00708 卡环接头 M6×1 1.8 mm PPS 黑色",
 4076 |       "en": "hard tube fitting Retaining-ring Fitting HSF6 HSF6-M6-18-PS-B 809837 443-02-00708 M6×1 1.8 mm PPS Black"
 4077 |     }
 4078 |   },
 4079 |   {
 4080 |     "productId": "809814",
 4081 |     "categoryId": "fittings",
 4082 |     "productTypeId": "hard-tube-fittings",
 4083 |     "seriesId": "retaining-ring-fitting",
 4084 |     "cardTitle": {
 4085 |       "zh": "HSF6-U28-16-PS-B",
 4086 |       "en": "HSF6-U28-16-PS-B"
 4087 |     },
 4095 |       "filter03": "1.6 mm",
 4096 |       "filter04": "PPS",
 4097 |       "filter05": "黑色"
 4098 |     },
 4099 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4100 |     "detailSlug": "hard-tube-fittings",
 4101 |     "status": "active",
 4102 |     "sortOrder": 141,
 4103 |     "searchKeywords": {
 4104 |       "zh": "硬管接头 卡环接头 HSF6 HSF6-U28-16-PS-B 809814 443-02-00709 卡环接头 1/4-28 UNF 1.6 mm PPS 黑色",
 4105 |       "en": "hard tube fitting Retaining-ring Fitting HSF6 HSF6-U28-16-PS-B 809814 443-02-00709 1/4-28 UNF 1.6 mm PPS Black"
 4106 |     }
 4107 |   },
 4108 |   {
 4109 |     "productId": "809945",
 4110 |     "categoryId": "fittings",
 4111 |     "productTypeId": "hard-tube-fittings",
 4112 |     "seriesId": "retaining-ring-fitting",
 4113 |     "cardTitle": {
 4114 |       "zh": "HSF6-U28-16-PK-N",
 4115 |       "en": "HSF6-U28-16-PK-N"
 4116 |     },
 4124 |       "filter03": "1.6 mm",
 4125 |       "filter04": "PEEK",
 4126 |       "filter05": "本色"
 4127 |     },
 4128 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4129 |     "detailSlug": "hard-tube-fittings",
 4130 |     "status": "active",
 4131 |     "sortOrder": 142,
 4132 |     "searchKeywords": {
 4133 |       "zh": "硬管接头 卡环接头 HSF6 HSF6-U28-16-PK-N 809945 443-02-00724 卡环接头 1/4-28 UNF 1.6 mm PEEK 本色",
 4134 |       "en": "hard tube fitting Retaining-ring Fitting HSF6 HSF6-U28-16-PK-N 809945 443-02-00724 1/4-28 UNF 1.6 mm PEEK Natural"
 4135 |     }
 4136 |   },
 4137 |   {
 4138 |     "productId": "809815",
 4139 |     "categoryId": "fittings",
 4140 |     "productTypeId": "hard-tube-fittings",
 4141 |     "seriesId": "retaining-ring-fitting",
 4142 |     "cardTitle": {
 4143 |       "zh": "HSF6-U28-32-PS-B",
 4144 |       "en": "HSF6-U28-32-PS-B"
 4145 |     },
 4153 |       "filter03": "3.2 mm",
 4154 |       "filter04": "PPS",
 4155 |       "filter05": "黑色"
 4156 |     },
 4157 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4158 |     "detailSlug": "hard-tube-fittings",
 4159 |     "status": "active",
 4160 |     "sortOrder": 143,
 4161 |     "searchKeywords": {
 4162 |       "zh": "硬管接头 卡环接头 HSF6 HSF6-U28-32-PS-B 809815 443-02-00710 卡环接头 1/4-28 UNF 3.2 mm PPS 黑色",
 4163 |       "en": "hard tube fitting Retaining-ring Fitting HSF6 HSF6-U28-32-PS-B 809815 443-02-00710 1/4-28 UNF 3.2 mm PPS Black"
 4164 |     }
 4165 |   },
 4166 |   {
 4167 |     "productId": "809828",
 4168 |     "categoryId": "fittings",
 4169 |     "productTypeId": "hard-tube-fittings",
 4170 |     "seriesId": "retaining-ring-fitting",
 4171 |     "cardTitle": {
 4172 |       "zh": "HSF6-U28-32-PK-N",
 4173 |       "en": "HSF6-U28-32-PK-N"
 4174 |     },
 4182 |       "filter03": "3.2 mm",
 4183 |       "filter04": "PEEK",
 4184 |       "filter05": "本色"
 4185 |     },
 4186 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4187 |     "detailSlug": "hard-tube-fittings",
 4188 |     "status": "active",
 4189 |     "sortOrder": 144,
 4190 |     "searchKeywords": {
 4191 |       "zh": "硬管接头 卡环接头 HSF6 HSF6-U28-32-PK-N 809828 441-09-00289 卡环接头 1/4-28 UNF 3.2 mm PEEK 本色",
 4192 |       "en": "hard tube fitting Retaining-ring Fitting HSF6 HSF6-U28-32-PK-N 809828 441-09-00289 1/4-28 UNF 3.2 mm PEEK Natural"
 4193 |     }
 4194 |   },
 4195 |   {
 4196 |     "productId": "809791",
 4197 |     "categoryId": "fittings",
 4198 |     "productTypeId": "hard-tube-fittings",
 4199 |     "seriesId": "high-pressure-fitting",
 4200 |     "cardTitle": {
 4201 |       "zh": "PNC-U32-16-PK-N",
 4202 |       "en": "PNC-U32-16-PK-N"
 4203 |     },
 4210 |       "filter02": "10-32 UNF",
 4211 |       "filter03": "1.6 mm",
 4212 |       "filter04": "PEEK",
 4213 |       "filter05": "本色"
 4214 |     },
 4215 |     "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
 4216 |     "detailSlug": "hard-tube-fittings",
 4217 |     "status": "active",
 4218 |     "sortOrder": 145,
 4219 |     "searchKeywords": {
 4220 |       "zh": "硬管接头 高压接头 PNC PNC-U32-16-PK-N 809791 443-02-00478 高压接头 10-32 UNF 1.6 mm PEEK 本色",
 4221 |       "en": "hard tube fitting High-pressure Fitting PNC PNC-U32-16-PK-N 809791 443-02-00478 10-32 UNF 1.6 mm PEEK Natural"
 4222 |     }
 4223 |   },
 4224 |   {
 4225 |     "productId": "809661",
 4226 |     "categoryId": "fittings",
 4227 |     "productTypeId": "hard-tube-fittings",
 4228 |     "seriesId": "high-pressure-fitting",
 4229 |     "cardTitle": {
 4230 |       "zh": "PNC6-U32-16-PK-N",
 4231 |       "en": "PNC6-U32-16-PK-N"
 4232 |     },
 4239 |       "filter02": "10-32 UNF",
 4240 |       "filter03": "1.6 mm",
 4241 |       "filter04": "PEEK",
 4242 |       "filter05": "本色"
 4243 |     },
 4244 |     "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
 4245 |     "detailSlug": "hard-tube-fittings",
 4246 |     "status": "active",
 4247 |     "sortOrder": 146,
 4248 |     "searchKeywords": {
 4249 |       "zh": "硬管接头 高压接头 PNC6 PNC6-U32-16-PK-N 809661 441-09-00040 高压接头 10-32 UNF 1.6 mm PEEK 本色",
 4250 |       "en": "hard tube fitting High-pressure Fitting PNC6 PNC6-U32-16-PK-N 809661 441-09-00040 10-32 UNF 1.6 mm PEEK Natural"
 4251 |     }
 4252 |   },
 4253 |   {
 4254 |     "productId": "809696",
 4255 |     "categoryId": "fittings",
 4256 |     "productTypeId": "hard-tube-fittings",
 4257 |     "seriesId": "high-pressure-fitting",
 4258 |     "cardTitle": {
 4259 |       "zh": "PNF-U32-16-SS-N",
 4260 |       "en": "PNF-U32-16-SS-N"
 4261 |     },
 4269 |       "filter03": "1.6 mm",
 4270 |       "filter04": "SUS",
 4271 |       "filter05": "本色"
 4272 |     },
 4273 |     "imageCard": "/images/logo/foreach-logo-color.svg",
 4274 |     "detailSlug": "hard-tube-fittings",
 4275 |     "status": "active",
 4276 |     "sortOrder": 147,
 4277 |     "searchKeywords": {
 4278 |       "zh": "硬管接头 高压接头 PNF PNF-U32-16-SS-N 809696 515-00-02910 高压接头 10-32 UNF 1.6 mm SUS 本色",
 4279 |       "en": "hard tube fitting High-pressure Fitting PNF PNF-U32-16-SS-N 809696 515-00-02910 10-32 UNF 1.6 mm Stainless Steel Natural"
 4280 |     }
 4281 |   }
 4282 | ] as ProductSelectionProduct[];
 4283 | 
 4284 | export const hardTubeFittingFilterLabels =
 4285 | [
 4286 |   {
 4287 |     "categoryId": "fittings",
 4288 |     "productTypeId": "hard-tube-fittings",
 4289 |     "filterKey": "filter01",
 4290 |     "label": {
 4291 |       "zh": "产品系列",
 4292 |       "en": "Product Series",
 4293 |       "es": "Product Series",
 4299 |     "sortOrder": 10,
 4300 |     "visible": true
 4301 |   },
 4302 |   {
 4303 |     "categoryId": "fittings",
 4304 |     "productTypeId": "hard-tube-fittings",
 4305 |     "filterKey": "filter02",
 4306 |     "label": {
 4307 |       "zh": "螺纹规格",
 4308 |       "en": "Thread",
 4309 |       "es": "Thread",
 4315 |     "sortOrder": 20,
 4316 |     "visible": true
 4317 |   },
 4318 |   {
 4319 |     "categoryId": "fittings",
 4320 |     "productTypeId": "hard-tube-fittings",
 4321 |     "filterKey": "filter03",
 4322 |     "label": {
 4323 |       "zh": "接管外径",
 4324 |       "en": "Tube OD",
 4325 |       "es": "Tube OD",
 4331 |     "sortOrder": 30,
 4332 |     "visible": true
 4333 |   },
 4334 |   {
 4335 |     "categoryId": "fittings",
 4336 |     "productTypeId": "hard-tube-fittings",
 4337 |     "filterKey": "filter04",
 4338 |     "label": {
 4339 |       "zh": "主体材质",
 4340 |       "en": "Body Material",
 4341 |       "es": "Body Material",
 4347 |     "sortOrder": 40,
 4348 |     "visible": true
 4349 |   },
 4350 |   {
 4351 |     "categoryId": "fittings",
 4352 |     "productTypeId": "hard-tube-fittings",
 4353 |     "filterKey": "filter05",
 4354 |     "label": {
 4355 |       "zh": "颜色",
 4356 |       "en": "Color",
 4357 |       "es": "Color",
 4367 | 
 4368 | export const hardTubeFittingTaxonomyItems =
 4369 | [
 4370 |   {
 4371 |     "type": "productType",
 4372 |     "id": "hard-tube-fittings",
 4373 |     "label": {
 4374 |       "zh": "硬管接头",
 4375 |       "en": "Hard Tube Fittings",
 4376 |       "es": "Hard Tube Fittings",
 4377 |       "fr": "Hard Tube Fittings",
 4378 |       "ko": "Hard Tube Fittings",
 4379 |       "ru": "Hard Tube Fittings"
```

## data\products\selection\hard-tube-fitting-selection.summary.json

```text
    1 | {
    2 |   "sourcePath": "F:\\WebsiteProjects\\foreach-website-2026\\data-source\\product-center\\fittings\\FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx",
    3 |   "sheetName": "01_硬管接头",
    4 |   "sourceRows": 216,
    5 |   "generatedProducts": 147,
    6 |   "skippedRows": [],
    7 |   "seriesCounts": {
    8 |     "标滚平底接头": 38,
```

## data\products\selection\probe-selection.generated.ts

```text
   91 |       filter03: "内壁抛光",
   92 |       filter04: "来图定制",
   93 |     },
   94 | 
   95 |     href: "/products/probes/sampling-probes",
   96 |     detailHref: "/products/probes/sampling-probes",
   97 |     selectionHref: "/products",
   98 |     sourceType: "probe-selection",
   99 |   },
  100 | 
  101 |   {
  173 |       filter03: "排气结构",
  174 |       filter04: "来图定制",
  175 |     },
  176 | 
  177 |     href: "/products/probes/piercing-probes",
  178 |     detailHref: "/products/probes/piercing-probes",
  179 |     selectionHref: "/products",
  180 |     sourceType: "probe-selection",
  181 |   },
  182 | 
  183 |   {
  255 |       filter03: "侧孔加工",
  256 |       filter04: "来图定制",
  257 |     },
  258 | 
  259 |     href: "/products/probes/wash-probes",
  260 |     detailHref: "/products/probes/wash-probes",
  261 |     selectionHref: "/products",
  262 |     sourceType: "probe-selection",
  263 |   },
  264 | 
  265 |   {
  337 |       filter03: "涂层处理",
  338 |       filter04: "来图定制",
  339 |     },
  340 | 
  341 |     href: "/products/probes/stirring-paddles",
  342 |     detailHref: "/products/probes/stirring-paddles",
  343 |     selectionHref: "/products",
  344 |     sourceType: "probe-selection",
  345 |   },
  346 | ] as const;
  347 | 
```

## data\products\selection\product-route-map.ts

```text
   90 |     fittings: {
   91 |       categoryId: "fittings",
   92 |       label: "接头系列",
   93 |       title: "接头系列 | FOREACH",
   94 |       description:
   95 |         "恒永达接头产品覆盖硬管接头、软管接头、鲁尔接头、快插接头、内螺纹互转接头、堵头、过滤器和单向阀。",
   96 |     },  },
   97 | 
   98 |   productTypes: {
   99 |     "plunger-pumps": {
  100 |       category: "pumps",
  145 |       description:
  146 |         "无阀泵适用于简化液路结构、降低阀件依赖和提高系统集成度的精密液体处理场景。",
  147 |   
  148 |     },
  149 | 
  150 |     "hard-tube-fittings": {
  151 |       category: "fittings",
  152 |       categoryId: "fittings",
  153 |       productTypeId: "hard-tube-fittings",
  154 |       label: "硬管接头",
  155 |       title: "硬管接头 | FOREACH",
  156 |       description:
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
```

## data\products\selection\product-selection.types.ts

```text
   62 |   routeSlug?: string;
   63 |   reservedConfigSlug?: string;
   64 |   slug?: string;
   65 | 
   66 |   href?: string;
   67 |   detailHref?: string;
   68 |   productDetailHref?: string;
   69 |   selectionHref?: string;
   70 | 
   71 |   model?: string;
   72 |   title?: any;
   73 |   name?: any;
```

## data\products\selection\tubing-selection.generated.ts

```text
   25 |     "imageAlt": {
   26 |       "zh": "PVC 管",
   27 |       "en": "PVC Tubing"
   28 |     },
   29 |     "href": "/products/tubing/pvc-tubing",
   30 |     "detailHref": "/products/tubing/pvc-tubing",
   31 |     "productDetailHref": "/products/tubing/pvc-tubing",
   32 |     "selectionHref": "/products",
   33 |     "filters": {},
   34 |     "searchKeywords": {
   35 |       "zh": "PVC 管 聚氯乙烯（PVC） 管路 管材",
   36 |       "en": "PVC Tubing Polyvinyl Chloride (PVC) tubing"
   60 |     "imageAlt": {
   61 |       "zh": "TPU 管",
   62 |       "en": "TPU Tubing"
   63 |     },
   64 |     "href": "/products/tubing/tpu-tubing",
   65 |     "detailHref": "/products/tubing/tpu-tubing",
   66 |     "productDetailHref": "/products/tubing/tpu-tubing",
   67 |     "selectionHref": "/products",
   68 |     "filters": {},
   69 |     "searchKeywords": {
   70 |       "zh": "TPU 管 热塑性聚氨酯（TPU） 管路 管材",
   71 |       "en": "TPU Tubing Thermoplastic Polyurethane (TPU) tubing"
   95 |     "imageAlt": {
   96 |       "zh": "FEP 管",
   97 |       "en": "FEP Tubing"
   98 |     },
   99 |     "href": "/products/tubing/fep-tubing",
  100 |     "detailHref": "/products/tubing/fep-tubing",
  101 |     "productDetailHref": "/products/tubing/fep-tubing",
  102 |     "selectionHref": "/products",
  103 |     "filters": {},
  104 |     "searchKeywords": {
  105 |       "zh": "FEP 管 氟化乙烯丙烯共聚物（FEP） 管路 管材",
  106 |       "en": "FEP Tubing Fluorinated Ethylene Propylene (FEP) tubing"
  130 |     "imageAlt": {
  131 |       "zh": "PTFE 管",
  132 |       "en": "PTFE Tubing"
  133 |     },
  134 |     "href": "/products/tubing/ptfe-tubing",
  135 |     "detailHref": "/products/tubing/ptfe-tubing",
  136 |     "productDetailHref": "/products/tubing/ptfe-tubing",
  137 |     "selectionHref": "/products",
  138 |     "filters": {},
  139 |     "searchKeywords": {
  140 |       "zh": "PTFE 管 聚四氟乙烯（PTFE） 管路 管材",
  141 |       "en": "PTFE Tubing Polytetrafluoroethylene (PTFE) tubing"
  165 |     "imageAlt": {
  166 |       "zh": "PEEK 管",
  167 |       "en": "PEEK Tubing"
  168 |     },
  169 |     "href": "/products/tubing/peek-tubing",
  170 |     "detailHref": "/products/tubing/peek-tubing",
  171 |     "productDetailHref": "/products/tubing/peek-tubing",
  172 |     "selectionHref": "/products",
  173 |     "filters": {},
  174 |     "searchKeywords": {
  175 |       "zh": "PEEK 管 聚醚醚酮（PEEK） 管路 管材",
  176 |       "en": "PEEK Tubing Polyether Ether Ketone (PEEK) tubing"
  200 |     "imageAlt": {
  201 |       "zh": "PFA 管",
  202 |       "en": "PFA Tubing"
  203 |     },
  204 |     "href": "/products/tubing/pfa-tubing",
  205 |     "detailHref": "/products/tubing/pfa-tubing",
  206 |     "productDetailHref": "/products/tubing/pfa-tubing",
  207 |     "selectionHref": "/products",
  208 |     "filters": {},
  209 |     "searchKeywords": {
  210 |       "zh": "PFA 管 全氟烷氧基树脂（PFA） 管路 管材",
  211 |       "en": "PFA Tubing Perfluoroalkoxy Alkane (PFA) tubing"
```

## data\products\selection\types.ts

```text
   61 |   routeSlug?: string;
   62 |   reservedConfigSlug?: string;
   63 |   slug?: string;
   64 | 
   65 |   href?: string;
   66 |   detailHref?: string;
   67 |   productDetailHref?: string;
   68 |   selectionHref?: string;
   69 | 
   70 |   model?: string;
   71 |   title?: any;
   72 |   name?: any;
```

## data\products\selection\valve-selection.generated.ts

```text
   92 |       filter03: "0.7MPa",
   93 |       filter04: "定制配置",
   94 |     },
   95 | 
   96 |     href: "/products/valves/rotary-valves",
   97 |     detailHref: "/products/valves/rotary-valves",
   98 |     selectionHref: "/products",
   99 |     sourceType: "valve-selection",
  100 |   },
  101 | 
  102 |   {
  173 |       filter03: "25MPa",
  174 |       filter04: "定制配置",
  175 |     },
  176 | 
  177 |     href: "/products/valves/high-pressure-valves",
  178 |     detailHref: "/products/valves/high-pressure-valves",
  179 |     selectionHref: "/products",
  180 |     sourceType: "valve-selection",
  181 |   },
  182 | 
  183 |   {
  254 |       filter03: "-75kPa~0.25MPa",
  255 |       filter04: "定制配置",
  256 |     },
  257 | 
  258 |     href: "/products/valves/solenoid-valves",
  259 |     detailHref: "/products/valves/solenoid-valves",
  260 |     selectionHref: "/products",
  261 |     sourceType: "valve-selection",
  262 |   },
  263 | ] as const;
  264 | 
```

## scripts\products\add-probe-series-pages.cjs

```text
  202 |       filter03: "内壁抛光",
  203 |       filter04: "来图定制",
  204 |     },
  205 | 
  206 |     href: "/products/probes/sampling-probes",
  207 |     detailHref: "/products/probes/sampling-probes",
  208 |     selectionHref: "/products",
  209 |     sourceType: "probe-selection",
  210 |   },
  211 | 
  212 |   {
  274 |       filter03: "排气结构",
  275 |       filter04: "来图定制",
  276 |     },
  277 | 
  278 |     href: "/products/probes/piercing-probes",
  279 |     detailHref: "/products/probes/piercing-probes",
  280 |     selectionHref: "/products",
  281 |     sourceType: "probe-selection",
  282 |   },
  283 | 
  284 |   {
  346 |       filter03: "侧孔加工",
  347 |       filter04: "来图定制",
  348 |     },
  349 | 
  350 |     href: "/products/probes/wash-probes",
  351 |     detailHref: "/products/probes/wash-probes",
  352 |     selectionHref: "/products",
  353 |     sourceType: "probe-selection",
  354 |   },
  355 | 
  356 |   {
  418 |       filter03: "涂层处理",
  419 |       filter04: "来图定制",
  420 |     },
  421 | 
  422 |     href: "/products/probes/stirring-paddles",
  423 |     detailHref: "/products/probes/stirring-paddles",
  424 |     selectionHref: "/products",
  425 |     sourceType: "probe-selection",
  426 |   },
  427 | ] as const;
  428 | 
  699 | 
  700 | const pageTsx = String.raw`import type { ComponentType } from "react";
  701 | 
  702 | import { notFound } from "next/navigation";
  703 | 
  704 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
  705 | import probeDetailData from "@/data/products/generated/probes/detail/index.json";
  706 | 
  707 | type ProbeDetailRecord = {
  708 |   slug: string;
  709 |   productTypeId: string;
  734 |   bottomCtaHref?: string;
  735 | };
  736 | 
  737 | const details = probeDetailData as ProbeDetailRecord[];
  738 | 
  739 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  740 |   data: any;
  741 | }>;
  742 | 
  743 | export const dynamicParams = false;
  744 | 
  877 |       buttonText: detail.bottomCtaButtonText || "联系工程师",
  878 |       href: detail.bottomCtaHref || "/contact",
  879 |     },
  880 | 
  881 |     selectionHref: "/products",
  882 |     detailHref: "/products/probes/" + detail.slug,
  883 | 
  884 |     sourceType: "probe-detail",
  885 |   };
  886 | }
  887 | 
  988 |     const patchBlock = `
  989 |   /*
  990 |     PROBE_DETAIL_HREF_PATCH_20260708
  991 | 
  992 |     针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
  993 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  994 |     避免生成 /products/probes/undefined。
  995 |   */
  996 |   if (
  997 |     (product as any)?.sourceType === "probe-selection" ||
  998 |     (product as any)?.category === "probes" ||
  999 |     (product as any)?.categoryId === "${probeCategoryId}" ||
 1000 |     (product as any)?.categoryLabel === "针系列"
 1001 |   ) {
 1002 |     const rawHref = String(
 1003 |       (product as any).detailHref ||
 1004 |         (product as any).href ||
 1005 |         ""
 1006 |     );
 1007 | 
 1008 |     const slugFromHref = rawHref
 1034 |     return "/products";
 1035 |   }
 1036 | `;
 1037 | 
 1038 |     const functionPattern =
 1039 |       /(function\s+makeDetailHref\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/;
 1040 | 
 1041 |     const arrowPattern =
 1042 |       /(const\s+makeDetailHref\s*=\s*\([^)]*\)\s*(?::\s*[^=]+)?=>\s*\{)/;
 1043 | 
 1044 |     if (functionPattern.test(text)) {
 1045 |       text = text.replace(functionPattern, `$1${patchBlock}`);
 1046 |     } else if (arrowPattern.test(text)) {
 1047 |       text = text.replace(arrowPattern, `$1${patchBlock}`);
 1048 |     } else {
 1049 |       console.log("没有找到 makeDetailHref 函数，暂未自动插入针系列详情链接补丁。");
 1050 |     }
 1051 |   }
 1052 | 
 1053 |   fs.writeFileSync(clientPath, text, "utf8");
 1054 |   console.log("已接入 ProductSelectionClient。");
 1055 | }
 1056 | 
 1057 | /* =========================================================
 1058 |    6. 修复 ProductDetailClient 底部 CTA 识别
 1059 | ========================================================= */
 1060 | 
 1061 | const detailClientPath = abs("components/products/detail/ProductDetailClient.tsx");
 1062 | 
 1063 | if (fs.existsSync(detailClientPath)) {
 1064 |   backup(detailClientPath, "probe_bottom_cta");
 1065 | 
 1066 |   let text = fs.readFileSync(detailClientPath, "utf8");
 1068 |   if (!text.includes("PROBE_DETAIL_BOTTOM_CTA_20260708")) {
 1069 |     const helper = `
 1070 | /*
 1071 |   PROBE_DETAIL_BOTTOM_CTA_20260708
 1072 | 
 1073 |   针系列详情页复用公共 ProductDetailClient。
 1074 |   这里单独识别针系列数据，避免底部 CTA 回退到其他产品系列，或直接不显示。
 1075 | */
 1076 | function isProbeDetailData(data: any): boolean {
 1077 |   return (
 1078 |     data?.sourceType === "probe-detail" ||
 1140 | ${anchor}`);
 1141 |     } else if (text.includes("function getValveDetailBottomCta")) {
 1142 |       text = text.replace("function getValveDetailBottomCta", `${helper}
 1143 | function getValveDetailBottomCta`);
 1144 |     } else {
 1145 |       console.log("没有找到底部 CTA 函数锚点，跳过 ProductDetailClient CTA 补丁。");
 1146 |     }
 1147 |   }
 1148 | 
 1149 |   if (
 1150 |     text.includes("function getPlungerPumpBottomCta") &&
 1165 |       });
 1166 |     }
 1167 |   }
 1168 | 
 1169 |   fs.writeFileSync(detailClientPath, text, "utf8");
 1170 |   console.log("已确认 ProductDetailClient 针系列底部 CTA 识别。");
 1171 | }
 1172 | 
 1173 | console.log("");
 1174 | console.log("针系列已生成并接入：");
 1175 | console.log("- /products/probes/sampling-probes");
```

## scripts\products\add-series-faq-structure.js

```text
   30 | const clientFile = path.join(
   31 |   root,
   32 |   "components",
   33 |   "products",
   34 |   "detail",
   35 |   "ProductDetailClient.tsx"
   36 | );
   37 | 
   38 | const cssFile = path.join(
   39 |   root,
   40 |   "components",
  196 |     clientContent =
  197 |       clientContent.slice(0, firstIndex + insertAfter.length) +
  198 |       faqBlock +
  199 |       clientContent.slice(firstIndex + insertAfter.length);
  200 |   } else {
  201 |     console.warn("没有找到 detailSection 结束位置，请手动检查 ProductDetailClient.tsx。");
  202 |   }
  203 | }
  204 | 
  205 | fs.writeFileSync(clientFile, clientContent, "utf8");
  206 | 
```

## scripts\products\add-tubing-detail-pages-clean.cjs

```text
  216 | 
  217 | const pageCode = `import type { ComponentType } from "react";
  218 | import type { Metadata } from "next";
  219 | import { notFound } from "next/navigation";
  220 | 
  221 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
  222 | import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
  223 | 
  224 | type TubingDetailRecord = {
  225 |   slug: string;
  226 |   title: string;
  250 |   bottomCtaHref?: string;
  251 | };
  252 | 
  253 | const details = tubingDetailData as TubingDetailRecord[];
  254 | 
  255 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  256 |   data: any;
  257 | }>;
  258 | 
  259 | export const dynamicParams = false;
  260 | 
  375 | }
  376 | `;
  377 | 
  378 | writeUtf8(pagePath, pageCode);
  379 | 
  380 | const clientPath = path.join(root, "components/products/detail/ProductDetailClient.tsx");
  381 | 
  382 | if (fs.existsSync(clientPath)) {
  383 |   backup(clientPath, "tubing_bottom_cta_before_patch");
  384 | 
  385 |   let client = fs.readFileSync(clientPath, "utf8");
  444 |     );
  445 |   }
  446 | 
  447 |   writeUtf8(clientPath, client);
  448 | } else {
  449 |   console.log("鏈壘鍒?ProductDetailClient.tsx锛岃烦杩囧簳閮?CTA 琛ヤ竵銆?);
  450 | }
  451 | 
  452 | console.log("");
  453 | console.log("绠¤矾璇︽儏椤靛凡鐢熸垚锛?);
  454 | for (const item of normalized) {
```

## scripts\products\add-valve-series-selection.cjs

```text
   15 |    - 电磁阀 solenoid-valves
   16 | 
   17 |    重要说明：
   18 |    这一步是“阀系列第一版官网接入”，先解决产品中心有内容、
   19 |    卡片能显示、详情页不 404。后续拿到完整规格表后，再做
   20 |    xlsx -> generated -> service -> ProductDetailClient 的正式数据库化详情页。
   21 | ========================================================= */
   22 | 
   23 | const fs = require("fs");
   24 | const path = require("path");
   25 | 
  182 |       filter02: "多通道切换",
  183 |       filter03: "常规压力",
  184 |       filter04: "定制配置",
  185 |     },
  186 |     href: "/products/valves/rotary-valves",
  187 |     detailHref: "/products/valves/rotary-valves",
  188 |     selectionHref: "/products",
  189 |     sourceType: "valve-selection",
  190 |   },
  191 |   {
  192 |     id: "high-pressure-valves",
  229 |       filter02: "高压控制",
  230 |       filter03: "高压",
  231 |       filter04: "定制配置",
  232 |     },
  233 |     href: "/products/valves/high-pressure-valves",
  234 |     detailHref: "/products/valves/high-pressure-valves",
  235 |     selectionHref: "/products",
  236 |     sourceType: "valve-selection",
  237 |   },
  238 |   {
  239 |     id: "solenoid-valves",
  276 |       filter02: "通断控制",
  277 |       filter03: "常规压力",
  278 |       filter04: "定制配置",
  279 |     },
  280 |     href: "/products/valves/solenoid-valves",
  281 |     detailHref: "/products/valves/solenoid-valves",
  282 |     selectionHref: "/products",
  283 |     sourceType: "valve-selection",
  284 |   },
  285 | ] as const;
  286 | 
  402 |    恒永达官网｜阀系列详情页入口
  403 | 
  404 |    说明：
  405 |    1. 当前页面用于阀系列第一版详情页
  406 |    2. 数据读取自 data/products/generated/valves/detail/index.json
  407 |    3. 后续阀系列完成参数表后，可再改成正式 ProductDetailClient 统一详情页
  408 |    4. 当前页面支持静态导出 generateStaticParams
  409 | ========================================================= */
  410 | 
  411 | import type { Metadata } from "next";
  412 | import Image from "next/image";
  942 |     );
  943 |   }
  944 | 
  945 |   /**
  946 |    * 5.4 给阀系列卡片详情链接增加兜底逻辑。
  947 |    * 如果卡片自身有 detailHref，就使用 detailHref。
  948 |    */
  949 |   if (!next.includes("const isValveProduct =")) {
  950 |     const routeAnchor = "const isValvelessPump =";
  951 | 
  952 |     if (!next.includes(routeAnchor)) {
  953 |       throw new Error(
  954 |         "没有找到详情链接锚点 const isValvelessPump =，请检查 getDetailHref 相关函数。",
  955 |       );
  956 |     }
  957 | 
  958 |     next = next.replace(
  959 |       routeAnchor,
  963 |       product.productTypeId,
  964 |     );
  965 | 
  966 |   if (isValveProduct) {
  967 |     return (
  968 |       product.detailHref ||
  969 |       product.href ||
  970 |       \`/products/valves/\${product.productTypeId}\`
  971 |     );
  972 |   }
  973 | 
```

## scripts\products\apply-plunger-pump-formal-copy.js

```text
  367 |     cardDescriptionEn: "Suitable for micro-volume aspiration, dispensing, and transfer tasks in IVD analyzers, laboratory automation systems, and analytical instruments.",
  368 |     cardSpecsZh: "容量：100 µL|泵头材料：PMMA|类型：定制柱塞泵",
  369 |     cardSpecsEn: "Volume: 100 µL|Pump head: PMMA|Type: Custom plunger pump",
  370 |     cardBadges: "Custom|100 µL|PMMA",
  371 |     cardImage: "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
  372 |     detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
  373 |     databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-100-pmma",
  374 |     showInSelection: "yes",
  375 |     sort: 100,
  376 |   },
  377 |   {
  386 |     cardDescriptionEn: "Suitable for reagent dispensing, sample transfer, and medium-small volume liquid handling tasks in automated analytical instruments.",
  387 |     cardSpecsZh: "容量：250 µL|泵头材料：PMMA|类型：定制柱塞泵",
  388 |     cardSpecsEn: "Volume: 250 µL|Pump head: PMMA|Type: Custom plunger pump",
  389 |     cardBadges: "Custom|250 µL|PMMA",
  390 |     cardImage: "/images/products/pumps/plunger-pump/ea/ea-250-pmma-card.webp",
  391 |     detailHref: "/products/pumps/plunger-pumps/ea-250-pmma",
  392 |     databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-250-pmma",
  393 |     showInSelection: "yes",
  394 |     sort: 110,
  395 |   },
  396 |   {
  405 |     cardDescriptionEn: "Suitable for micro-volume aspiration, dispensing, and transfer in space-limited automated instruments and compact fluidic systems.",
  406 |     cardSpecsZh: "容量：100 µL|泵头材料：PMMA|类型：微型定制柱塞泵",
  407 |     cardSpecsEn: "Volume: 100 µL|Pump head: PMMA|Type: Miniature custom plunger pump",
  408 |     cardBadges: "Custom|Miniature|PMMA",
  409 |     cardImage: "/images/products/pumps/plunger-pump/sm/sm-100-pmma-card.webp",
  410 |     detailHref: "/products/pumps/plunger-pumps/sm-100-pmma",
  411 |     databasePreviewHref: "/products/pumps-db/plunger-pumps/sm-miniature-piston-pumps/sm-100-pmma",
  412 |     showInSelection: "yes",
  413 |     sort: 200,
  414 |   },
  415 | ]);
```

## scripts\products\audit-plunger-wrong-route-md.cjs

```text
  205 |   codeBlock(
  206 |     findMatchesInFile(
  207 |       "components/products/selection/ProductSelectionCard.tsx",
  208 |       [
  209 |         /FINAL_CARD_HREF_GUARD_20260707/g,
  210 |         /function normalizeCardDetailHref/g,
  211 |         /const safeDetailHref = normalizeCardDetailHref/g,
  212 |         /href=\{detailHref\}/g,
  213 |         /href=\{safeDetailHref\}/g,
  214 |         /className="product-link"/g,
  215 |       ],
  216 |       6
  217 |     ).join("\n\n"),
  218 |     "tsx"
  222 | 
  223 |   codeBlock(
  224 |     findMatchesInFile(
  225 |       "components/products/selection/ProductSelectionClient.tsx",
  226 |       [
  227 |         /function normalizeFinalProductDetailHref/g,
  228 |         /function makeDetailHref/g,
  229 |         /getDetailHref=\{\(product\) => normalizeFinalProductDetailHref\(product, makeDetailHref\(product\)\)\}/g,
  230 |         /PROBE_DETAIL_HREF_PATCH/g,
  231 |         /return `\/products\/probes\/\$\{probeSlug\}`;/g,
  232 |         /const isPlungerPump/g,
  233 |         /return slug\s*\?\s*`\/products\/pumps\/plunger-pumps\/\$\{slug\}`/g,
  234 |       ],
  253 |   codeBlock(
  254 |     findMatchesInFile(
  255 |       "data/products/generated/pumps/pump-series.selection.generated.ts",
  256 |       [
  257 |         /"productId": "ea-100-pmma"/g,
  258 |         /"detailHref": "\/products\/pumps\/plunger-pumps\/ea-100-pmma"/g,
  259 |         /"title": "EA-100-PMMA"/g,
  260 |       ],
  261 |       8
  262 |     ).join("\n\n"),
  263 |     "ts"
  273 |   codeBlock(
  274 |     findMatchesInFile(
  275 |       "data/products/selection/probe-selection.generated.ts",
  276 |       [
  277 |         /href: "\/products\/probes\//g,
  278 |         /detailHref: "\/products\/probes\//g,
  279 |         /sourceType: "probe-selection"/g,
  280 |       ],
  281 |       3
  282 |     ).join("\n\n"),
  283 |     "ts"
  375 | 
  376 |   section("10. 判断结论");
  377 | 
  378 |   const cardText = read("components/products/selection/ProductSelectionCard.tsx");
  379 |   const clientText = read("components/products/selection/ProductSelectionClient.tsx");
  380 |   const hasSafeHref = cardText.includes("href={safeDetailHref}");
  381 |   const stillDirectHref = cardText.includes("href={detailHref}");
  382 |   const hasFinalClientGuard = clientText.includes("normalizeFinalProductDetailHref(product, makeDetailHref(product))");
  383 |   const activeWrongHardLink = allMatches.some((line) => line.includes("/products/probes/ea-100-pmma"));
  384 | 
  385 |   add(`- ProductSelectionCard 是否使用 safeDetailHref：${hasSafeHref ? "是" : "否"}`);
  386 |   add(`- ProductSelectionCard 是否仍存在 href={detailHref}：${stillDirectHref ? "是，有风险" : "否"}`);
  387 |   add(`- ProductSelectionClient 是否包了最终纠正函数：${hasFinalClientGuard ? "是" : "否"}`);
  388 |   add(`- 活跃源码里是否存在 /products/probes/ea-100-pmma：${activeWrongHardLink ? "是，有问题" : "否"}`);
  389 | 
  390 |   if (hasSafeHref && !stillDirectHref && hasFinalClientGuard && !activeWrongHardLink) {
  391 |     add("\n初步判断：活跃源码里已经没有直接生成 /products/probes/ea-100-pmma 的来源。如果 dev 终端仍报这个地址，更可能是旧页面、旧窗口、旧缓存或曾经打开的 500 页面继续请求。");
```

## scripts\products\audit-pump-series-content-detail.js

```text
   70 |   md += `- seriesSlug：${item.seriesSlug}\n`;
   71 |   md += `- internalModelRef：${item.internalModelRef}\n`;
   72 |   md += `- capacity：${item.capacity}\n`;
   73 |   md += `- material：${item.material}\n`;
   74 |   md += `- canonicalPath：${item.route?.canonicalPath || ""}\n`;
   75 |   md += `- detailHref：${item.route?.detailHref || ""}\n\n`;
   76 | 
   77 |   md += "### 2. H1 / SEO\n\n";
   78 |   md += `- 中文 H1：${zh.h1 || ""}\n`;
   79 |   md += `- 英文 H1：${en.h1 || ""}\n`;
   80 |   md += `- 中文 titleTag：${seoZh.titleTag || ""}\n`;
  171 | 
  172 | md += "# 二、选型卡片内容\n\n";
  173 | 
  174 | for (const card of cards) {
  175 |   md += `## ${card.productId}\n\n`;
  176 |   md += `- detailHref：${card.detailHref || ""}\n`;
  177 |   md += `- cardImage：${card.cardImage || ""}\n`;
  178 |   md += `- badges：${list(card.badges)}\n`;
  179 |   md += `- 中文标题：${card.content?.zh?.title || ""}\n`;
  180 |   md += `- 中文副标题：${card.content?.zh?.subtitle || ""}\n`;
  181 |   md += `- 中文描述：${card.content?.zh?.description || ""}\n`;
```

## scripts\products\audit-valveless-pump-detail-specs.js

```text
  201 |   console.log("规格字段全部匹配。");
  202 | }
  203 | 
  204 | console.log("\n===== 4. 当前无阀泵详情页列表 =====");
  205 | for (const item of details.filter((x) => expected[x.slug])) {
  206 |   console.log(`${item.slug} | ${item.title} | ${item.detailHref}`);
  207 | }
  208 | 
  209 | console.log("\n===== 检查完成：本脚本没有修改任何文件 =====");
```

## scripts\products\build-pump-series-data.js

```text
  712 |       pumpTypeSlug: cleanText(product.pumpTypeSlug || product.productTypeSlug),
  713 |       seriesSlug: cleanText(product.seriesSlug),
  714 |       canonicalPath:
  715 |         cleanText(route.canonicalPath) ||
  716 |         `/products/pumps/${cleanText(product.pumpTypeSlug || product.productTypeSlug)}/${routeSlug}`,
  717 |       detailHref:
  718 |         cleanText(route.detailHref) ||
  719 |         `/products/pumps/${cleanText(product.pumpTypeSlug || product.productTypeSlug)}/${routeSlug}`,
  720 |       legacyRedirectFrom: cleanText(route.legacyRedirectFrom),
  721 |       trailingSlashPolicy: cleanText(route.trailingSlashPolicy || "no_trailing_slash"),
  722 |     };
  723 |   });
  748 |     .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
  749 |     .map((row) => ({
  750 |       productId: cleanText(row.productId),
  751 |       pumpTypeSlug: cleanText(row.pumpTypeSlug || row.productTypeSlug),
  752 |       seriesSlug: cleanText(row.seriesSlug),
  753 |       detailHref: cleanText(row.detailHref),
  754 |       cardImage: cleanText(row.cardImage),
  755 |       badges: splitPipe(row.cardBadges),
  756 |       sort: toNumber(row.sort),
  757 |       content: {
  758 |         zh: {
```

## scripts\products\check-probe-faq-display.cjs

```text
  134 |     ],
  135 |     4
  136 |   ));
  137 | }
  138 | 
  139 | line("4. 检查 ProductDetailClient FAQ 渲染逻辑");
  140 | 
  141 | const detailClientPath = "components/products/detail/ProductDetailClient.tsx";
  142 | const detailClientText = read(detailClientPath);
  143 | 
  144 | if (!detailClientText) {
  145 |   code("找不到文件：" + detailClientPath);
  146 | } else {
  166 | }
  167 | 
  168 | line("5. 专门检查是否存在 FAQ 数量限制");
  169 | 
  170 | if (!detailClientText) {
  171 |   code("未检查，因为 ProductDetailClient.tsx 不存在");
  172 | } else {
  173 |   const limitPatterns = [
  174 |     /\.slice\(\s*0\s*,\s*3\s*\)/g,
  175 |     /\.slice\(\s*0\s*,\s*4\s*\)/g,
  176 |     /\.slice\(\s*0\s*,\s*5\s*\)/g,
  184 | }
  185 | 
  186 | line("6. 检查是否仍有柱塞泵 FAQ fallback 影响针系列");
  187 | 
  188 | if (!detailClientText) {
  189 |   code("未检查，因为 ProductDetailClient.tsx 不存在");
  190 | } else {
  191 |   code(findLines(
  192 |     detailClientText,
  193 |     [
  194 |       "getPlungerPump",
```

## scripts\products\check-selection-detail-copy-separation.js

```text
   29 |   detailClient: path.join(
   30 |     root,
   31 |     "components",
   32 |     "products",
   33 |     "detail",
   34 |     "ProductDetailClient.tsx"
   35 |   ),
   36 |   selectionClient: path.join(
   37 |     root,
   38 |     "components",
   39 |     "products",
```

## scripts\products\connect-syringe-pump-selection-page.cjs

```text
  373 |       console.warn("警告：没有找到 ...valvelessPumpFilterLabels, 请手动合并 syringePumpFilterLabels");
  374 |     }
  375 |   }
  376 | 
  377 |   /**
  378 |    * 5. 给 makeDetailHref 增加注射泵分支
  379 |    */
  380 |   if (!text.includes("/products/pumps/syringe-pumps/${slug}")) {
  381 |     const valvelessBranchRegex =
  382 |       /(const\s+isValvelessPump\s*=[\s\S]*?;\s*)(\n\s*if\s*\(\s*isValvelessPump\s*\)\s*{[\s\S]*?return\s+slug\s*\?\s*`\/products\/pumps\/valveless-pumps\/\$\{slug\}`\s*:\s*["']\/products\/pumps\/valveless-pumps["'];\s*\n\s*})/;
  383 | 
  408 |   }`;
  409 |         return syringeConst + syringeIf;
  410 |       });
  411 |       changed = true;
  412 |     } else {
  413 |       console.warn("警告：没有自动找到无阀泵 makeDetailHref 分支。详情链接可能需要后续手动补。");
  414 |     }
  415 |   }
  416 | 
  417 |   if (changed) {
  418 |     write(clientRel, text);
```

## scripts\products\connect-tubing-selection-products.cjs

```text
  129 |       zh: item.titleZh,
  130 |       en: item.titleEn
  131 |     },
  132 | 
  133 |     href: item.href,
  134 |     detailHref: item.href,
  135 |     productDetailHref: item.href,
  136 |     selectionHref: "/products",
  137 | 
  138 |     filters: {},
  139 |     searchKeywords: {
  140 |       zh: `${item.titleZh} ${item.materialZh} 管路 管材`,
  155 | /*
  156 |   2. 接入 ProductSelectionClient：
  157 |      - 导入 tubingSelectionProducts
  158 |      - getProductsByCategory("tubing") 返回管路 6 张卡片
  159 |      - getFirstProductTypeId("tubing") 返回 tubing
  160 |      - makeDetailHref 优先识别 /products/tubing/
  161 | */
  162 | const clientFile = path.join(root, "components/products/selection/ProductSelectionClient.tsx");
  163 | 
  164 | if (!fs.existsSync(clientFile)) {
  165 |   console.error("找不到 ProductSelectionClient.tsx");
  217 | `
  218 |   );
  219 | }
  220 | 
  221 | /*
  222 |   2.3 makeDetailHref 增加 tubing 分支。
  223 | */
  224 | if (!text.includes("TUBING_MAKE_DETAIL_HREF_20260707")) {
  225 |   text = text.replace(
  226 |     /function makeDetailHref\(product: ProductSelectionProduct\)\s*\{\s*/,
  227 |     (match) => `${match}
  228 |   /*
  229 |     TUBING_MAKE_DETAIL_HREF_20260707
  230 |     管路卡片优先使用 detailHref / href。
  231 |   */
  232 |   {
  233 |     const rawHref = String(
  234 |       (product as any).detailHref ||
  235 |         (product as any).productDetailHref ||
  236 |         (product as any).href ||
  237 |         ""
  238 |     ).trim();
  239 | 
  240 |     if (rawHref.includes("/products/tubing/")) {
```

## scripts\products\create-pump-series-xlsx-template.js

```text
  162 |     rows: [
  163 |       {
  164 |         productId: "ea-100-pmma",
  165 |         routeSlug: "ea-100-pmma",
  166 |         canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
  167 |         detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
  168 |         legacyRedirectFrom: "/products/pumps/plunger-pumps/ea-100-pmma/",
  169 |         trailingSlashPolicy: "no_trailing_slash",
  170 |         routeEnabled: "yes",
  171 |       },
  172 |       {
  173 |         productId: "ea-250-pmma",
  174 |         routeSlug: "ea-250-pmma",
  175 |         canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
  176 |         detailHref: "/products/pumps/plunger-pumps/ea-250-pmma",
  177 |         legacyRedirectFrom: "/products/pumps/plunger-pumps/ea-250-pmma/",
  178 |         trailingSlashPolicy: "no_trailing_slash",
  179 |         routeEnabled: "yes",
  180 |       },
  181 |       {
  182 |         productId: "sm-100-pmma",
  183 |         routeSlug: "sm-100-pmma",
  184 |         canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
  185 |         detailHref: "/products/pumps/plunger-pumps/sm-100-pmma",
  186 |         legacyRedirectFrom: "/products/pumps/plunger-pumps/sm-100-pmma/",
  187 |         trailingSlashPolicy: "no_trailing_slash",
  188 |         routeEnabled: "yes",
  189 |       },
  190 |     ],
  457 |         cardSpecsZh: "容量：100 µL|泵头材料：PMMA|类型：定制柱塞泵",
  458 |         cardSpecsEn: "Volume: 100 µL|Pump head: PMMA|Type: Custom plunger pump",
  459 |         cardBadges: "Custom|Precision Dispensing|PMMA",
  460 |         cardImage:
  461 |           "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
  462 |         detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
  463 |         showInSelection: "yes",
  464 |         sort: 100,
  465 |       },
  466 |     ],
  467 |   },
```

## scripts\products\create-static-tubing-pages.cjs

```text
   11 | 
   12 | const shared = `import type { ComponentType } from "react";
   13 | import type { Metadata } from "next";
   14 | import { notFound } from "next/navigation";
   15 | 
   16 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   17 | import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
   18 | 
   19 | type FaqItem = {
   20 |   question?: string;
   21 |   answer?: string;
   46 |   bottomCtaHref?: string;
   47 | };
   48 | 
   49 | const records = tubingDetailData as TubingDetailRecord[];
   50 | 
   51 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
   52 |   data: any;
   53 | }>;
   54 | 
   55 | function findDetail(slug: string) {
   56 |   return records.find((item) => item.slug === slug);
```

## scripts\products\create-syringe-pump-detail-pages.cjs

```text
  128 |     model3d: "/models/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.glb",
  129 | 
  130 |     customInquiryHref: "/contact",
  131 |     contactHref: "/contact",
  132 |     selectionHref: "/products/pumps/syringe-pumps",
  133 |     detailHref: "/products/pumps/syringe-pumps/hmd3-30mm-solenoid-syringe-pump"
  134 |   },
  135 |   {
  136 |     slug: "hmd6-60mm-solenoid-syringe-pump",
  137 |     category: "pumps",
  138 |     productTypeId: "syringe-pump",
  227 |     model3d: "/models/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.glb",
  228 | 
  229 |     customInquiryHref: "/contact",
  230 |     contactHref: "/contact",
  231 |     selectionHref: "/products/pumps/syringe-pumps",
  232 |     detailHref: "/products/pumps/syringe-pumps/hmd6-60mm-solenoid-syringe-pump"
  233 |   },
  234 |   {
  235 |     slug: "hld3-30mm-rotary-valve-syringe-pump",
  236 |     category: "pumps",
  237 |     productTypeId: "syringe-pump",
  325 |     model3d: "/models/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.glb",
  326 | 
  327 |     customInquiryHref: "/contact",
  328 |     contactHref: "/contact",
  329 |     selectionHref: "/products/pumps/syringe-pumps",
  330 |     detailHref: "/products/pumps/syringe-pumps/hld3-30mm-rotary-valve-syringe-pump"
  331 |   },
  332 |   {
  333 |     slug: "hld6-60mm-rotary-valve-syringe-pump",
  334 |     category: "pumps",
  335 |     productTypeId: "syringe-pump",
  424 |     model3d: "/models/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.glb",
  425 | 
  426 |     customInquiryHref: "/contact",
  427 |     contactHref: "/contact",
  428 |     selectionHref: "/products/pumps/syringe-pumps",
  429 |     detailHref: "/products/pumps/syringe-pumps/hld6-60mm-rotary-valve-syringe-pump"
  430 |   }
  431 | ];
  432 | 
  433 | write(
  434 |   "data/products/generated/pumps/syringe-pumps/detail/index.json",
  435 |   JSON.stringify(details, null, 2)
  436 | );
  437 | 
  438 | const pageTsx = `import { notFound } from "next/navigation";
  439 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
  440 | import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
  441 | 
  442 | type Detail = (typeof syringePumpDetails)[number];
  443 | 
  444 | function toClientData(detail: Detail) {
  470 |     showDatasheetRequest: false,
  471 | 
  472 |     customInquiryHref: "/contact",
  473 |     contactHref: "/contact",
  474 |     selectionHref: "/products/pumps/syringe-pumps",
  475 |     detailHref: \`/products/pumps/syringe-pumps/\${detail.slug}\`,
  476 | 
  477 |     additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
  478 |     images: Array.isArray(detail.images) ? detail.images : [],
  479 |     thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],
  480 |   };
  496 | 
  497 |   if (!detail) {
  498 |     notFound();
  499 |   }
  500 | 
  501 |   return <ProductDetailClient data={toClientData(detail)} />;
  502 | }
  503 | `;
  504 | 
  505 | write("app/products/pumps/syringe-pumps/[slug]/page.tsx", pageTsx);
  506 | 
```

## scripts\products\final-guard-product-card-href.cjs

```text
   23 | 
   24 |   卡片最终 href 出口保护：
   25 |   如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
   26 |   在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
   27 | */
   28 | function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {
   29 |   const rawHref = String(href || "").trim();
   30 | 
   31 |   const hrefSlug = rawHref
   32 |     .split("/")
   33 |     .filter(Boolean)
   67 |     "export default function ProductSelectionCard({",
   68 |     helper + "\nexport default function ProductSelectionCard({"
   69 |   );
   70 | }
   71 | 
   72 | if (!text.includes("const safeDetailHref = normalizeCardDetailHref(product, detailHref);")) {
   73 |   text = text.replace(
   74 |     "const safeSubtitle = toDisplayText(subtitle);",
   75 |     `const safeSubtitle = toDisplayText(subtitle);
   76 |   const safeDetailHref = normalizeCardDetailHref(product, detailHref);`
   77 |   );
   78 | }
   79 | 
   80 | text = text.replace(
   81 |   /<a className="product-link" href=\{detailHref\}/g,
   82 |   '<a className="product-link" href={safeDetailHref}'
   83 | );
   84 | 
   85 | fs.writeFileSync(file, text, "utf8");
   86 | 
   87 | console.log("已在 ProductSelectionCard 最终 href 出口增加保护。");
```

## scripts\products\fix-mrv3-detail-copy-and-specs.cjs

```text
  154 | console.log("- 正文已加入多通道、10/16/24通道、0.7MPa、内容积、接口等信息");
  155 | console.log("- 规格表已按规格书参数重写");
  156 | console.log("- 常见应用已缩短");
  157 | 
  158 | /*
  159 |   再补一次 page.tsx 字段透传，确保 ProductDetailClient 能读到 h1Title / bottom CTA。
  160 | */
  161 | const pagePath = abs("app/products/valves/[slug]/page.tsx");
  162 | 
  163 | if (fs.existsSync(pagePath)) {
  164 |   backup(pagePath, "mrv3_field_passthrough");
```

## scripts\products\fix-plunger-assets-use-current-public-folder.js

```text
  109 | 
  110 | if (replacedPublicAssetHelper) {
  111 |   content = replacedPublicAssetHelper;
  112 | } else {
  113 |   content = content.replace(
  114 |     "function adaptToProductDetailClientData",
  115 |     publicAssetHelper + "\n\nfunction adaptToProductDetailClientData"
  116 |   );
  117 | }
  118 | 
  119 | content = content.replace(
  120 |   /const publicAssetUrls = getPublicAssetUrls\(detail\);/g,
  126 | 
  127 | /*
  128 |   确保适配函数里存在 publicAssetUrls。
  129 | */
  130 | if (
  131 |   content.includes("function adaptToProductDetailClientData") &&
  132 |   !content.includes("const publicAssetUrls = getPublicAssetUrls(detail);")
  133 | ) {
  134 |   content = content.replace(
  135 |     "const assetFiles = getPrivateAssetFileNames(detail);",
  136 |     "const assetFiles = getPrivateAssetFileNames(detail);\n  const publicAssetUrls = getPublicAssetUrls(detail);"
```

## scripts\products\fix-plunger-card-subtitle-mojibake.cjs

```text
   31 | ): string {
   32 |   const originalSubtitle = getText(locale, product.cardSubtitle, "");
   33 | 
   34 |   const productId = String((product as any).productId || "").toLowerCase();
   35 |   const productTypeId = String((product as any).productTypeId || "").toLowerCase();
   36 |   const detailHref = String((product as any).detailHref || (product as any).href || "").toLowerCase();
   37 |   const detailSlug = String((product as any).detailSlug || (product as any).slug || "").toLowerCase();
   38 | 
   39 |   const isPlungerPump =
   40 |     productTypeId === "plunger-pump" ||
   41 |     productTypeId === "plunger-pumps" ||
   42 |     detailHref.includes("/products/pumps/plunger-pumps/") ||
   43 |     detailSlug.includes("plunger-pumps") ||
   44 |     /^(ea|sm|tm)-\\d+-(pmma|peek)$/i.test(productId);
   45 | 
   46 |   if (!isPlungerPump) {
   47 |     return originalSubtitle;
   75 |   ].join("\\n");
   76 | }
   77 | 
   78 | `;
   79 | 
   80 |   const insertBefore = "function makeDetailHref(product: ProductSelectionProduct)";
   81 |   if (!text.includes(insertBefore)) {
   82 |     console.error("没有找到 makeDetailHref 位置，无法插入修复函数。");
   83 |     process.exit(1);
   84 |   }
   85 | 
   86 |   text = text.replace(insertBefore, helper + "\n" + insertBefore);
   87 | }
```

## scripts\products\fix-plunger-detail-adapter-clean.js

```text
   67 | 
   68 | backup(pageFile);
   69 | 
   70 | let content = fs.readFileSync(pageFile, "utf8");
   71 | 
   72 | const cleanAdapterFunction = `function adaptToProductDetailClientData(detail: DetailRecord) {
   73 |   const model = getText(detail.model || detail.name || detail.title);
   74 |   const slug = getRecordSlug(detail);
   75 |   const seriesName = getText(detail.seriesName || detail.series);
   76 |   const seriesCode = getText(detail.seriesCode);
   77 |   const capacity = getText(detail.capacity);
  138 |     intro: description,
  139 |     productIntro: description,
  140 |     overview: description,
  141 | 
  142 |     /*
  143 |       ProductDetailClient 原逻辑：
  144 |       - data.advantages.join("") 渲染产品描述
  145 |       - data.commonApplications.join("、") 渲染常见应用
  146 |       所以这里必须保持数组类型。
  147 |     */
  148 |     advantages: description ? [description] : [],
  199 |   };
  200 | }`;
  201 | 
  202 | content = replaceFunctionByName(
  203 |   content,
  204 |   "adaptToProductDetailClientData",
  205 |   cleanAdapterFunction
  206 | );
  207 | 
  208 | fs.writeFileSync(pageFile, content, "utf8");
  209 | 
  210 | console.log("已重写柱塞泵详情页数据适配函数。");
  211 | console.log("没有修改 ProductDetailClient.tsx。");
  212 | console.log("没有修改 product-detail.module.css。");
```

## scripts\products\fix-plunger-detail-assets-request-links.js

```text
  111 | }
  112 | `;
  113 | 
  114 | if (!content.includes("function getPrivateAssetFileNames")) {
  115 |   content = content.replace(
  116 |     "function adaptToProductDetailClientData",
  117 |     assetHelper + "\n\nfunction adaptToProductDetailClientData"
  118 |   );
  119 | }
  120 | 
  121 | /*
  122 |   重写适配函数：
  123 |   - 3D模型 / 零件图 Tab 给申请链接
  124 |   - 不给 PDF / GLB 真实路径
  125 | */
  126 | const cleanAdapterFunction = String.raw`
  127 | function adaptToProductDetailClientData(detail: DetailRecord) {
  128 |   const model = getText(detail.model || detail.name || detail.title);
  129 |   const slug = getRecordSlug(detail);
  130 |   const seriesName = getText(detail.seriesName || detail.series);
  131 |   const seriesCode = getText(detail.seriesCode);
  132 |   const capacity = getText(detail.capacity);
  279 | }
  280 | `;
  281 | 
  282 | content = replaceFunctionByName(
  283 |   content,
  284 |   "adaptToProductDetailClientData",
  285 |   cleanAdapterFunction
  286 | );
  287 | 
  288 | fs.writeFileSync(pageFile, content, "utf8");
  289 | 
  290 | console.log("已接入 3D模型 / 零件图申请链接。");
  291 | console.log("注意：没有暴露 private-assets 中的 PDF / GLB 路径。");
  292 | console.log("没有修改 ProductDetailClient.tsx。");
  293 | console.log("没有修改 product-detail.module.css。");
```

## scripts\products\fix-plunger-detail-image-and-assets-safe.js

```text
  132 | 
  133 | if (content.includes("function getImagePath(detail: DetailRecord)")) {
  134 |   content = replaceFunctionByName(content, "getImagePath", imageHelper);
  135 | } else {
  136 |   content = content.replace(
  137 |     "function adaptToProductDetailClientData",
  138 |     `${imageHelper}\n\nfunction adaptToProductDetailClientData`
  139 |   );
  140 | }
  141 | 
  142 | /* 2D / 3D 文件名：只做内部状态，不暴露 private-assets 路径 */
  143 | const assetHelper = String.raw`
  175 | }
  176 | `;
  177 | 
  178 | if (!content.includes("function getPrivateAssetFileNames")) {
  179 |   content = content.replace(
  180 |     "function adaptToProductDetailClientData",
  181 |     `${assetHelper}\n\nfunction adaptToProductDetailClientData`
  182 |   );
  183 | }
  184 | 
  185 | /* 重写适配函数：保留原详情页组件逻辑，只补字段 */
  186 | const cleanAdapterFunction = String.raw`
  187 | function adaptToProductDetailClientData(detail: DetailRecord) {
  188 |   const model = getText(detail.model || detail.name || detail.title);
  189 |   const slug = getRecordSlug(detail);
  190 |   const seriesName = getText(detail.seriesName || detail.series);
  191 |   const seriesCode = getText(detail.seriesCode);
  192 |   const capacity = getText(detail.capacity);
  323 | }
  324 | `;
  325 | 
  326 | content = replaceFunctionByName(
  327 |   content,
  328 |   "adaptToProductDetailClientData",
  329 |   cleanAdapterFunction
  330 | );
  331 | 
  332 | fs.writeFileSync(pageFile, content, "utf8");
  333 | 
  334 | console.log("已修复：图片引用来自 product-selection.generated.ts 的 imageCard。");
  335 | console.log("已修复：2D / 3D 只作为可申请资料，不暴露 private-assets 路径。");
  336 | console.log("没有修改 ProductDetailClient.tsx。");
  337 | console.log("没有修改 product-detail.module.css。");
```

## scripts\products\fix-plunger-detail-image-and-assets.js

```text
  137 | }`;
  138 | 
  139 | if (content.includes("function getImagePath(detail: DetailRecord)")) {
  140 |   content = replaceFunctionByName(content, "getImagePath", imageHelper);
  141 | } else {
  142 |   const insertBefore = "function adaptToProductDetailClientData";
  143 |   content = content.replace(insertBefore, `${imageHelper}\n\n${insertBefore}`);
  144 | }
  145 | 
  146 | /*
  147 |   3. 生成 2D / 3D 文件名，但不生成真实路径。
  179 |     model3dFileName: `${seriesCode}-${capacityCode}.glb`,
  180 |   };
  181 | }`;
  182 | 
  183 | if (!content.includes("function getPrivateAssetFileNames")) {
  184 |   const insertBefore = "function adaptToProductDetailClientData";
  185 |   content = content.replace(insertBefore, `${assetHelper}\n\n${insertBefore}`);
  186 | }
  187 | 
  188 | /*
  189 |   4. 重写 adaptToProductDetailClientData：
  190 |   - image 来自 selectionProducts 的 imageCard
  191 |   - 2D / 3D 只放 requestOnly + 文件名
  192 |   - 不暴露 private-assets 路径
  193 | */
  194 | const cleanAdapterFunction = `function adaptToProductDetailClientData(detail: DetailRecord) {
  195 |   const model = getText(detail.model || detail.name || detail.title);
  196 |   const slug = getRecordSlug(detail);
  197 |   const seriesName = getText(detail.seriesName || detail.series);
  198 |   const seriesCode = getText(detail.seriesCode);
  199 |   const capacity = getText(detail.capacity);
  333 |   };
  334 | }`;
  335 | 
  336 | content = replaceFunctionByName(
  337 |   content,
  338 |   "adaptToProductDetailClientData",
  339 |   cleanAdapterFunction
  340 | );
  341 | 
  342 | fs.writeFileSync(pageFile, content, "utf8");
  343 | 
  344 | console.log("已修复：图片引用来自 product-selection.generated.ts 的 imageCard。");
  345 | console.log("已修复：2D / 3D 只作为可申请资料引用，不暴露 private-assets 路径。");
  346 | console.log("没有修改 ProductDetailClient.tsx。");
  347 | console.log("没有修改 product-detail.module.css。");
```

## scripts\products\fix-plunger-detail-link-final.js

```text
  104 |     .replace(/μ/g, "u")
  105 |     .replace(/[^a-z0-9]+/g, "-")
  106 |     .replace(/^-+|-+$/g, "");
  107 | }
  108 | 
  109 | function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  110 |   const existingSlug = normalizePlungerPathPart(product.detailSlug);
  111 | 
  112 |   if (/^(ea|sm|tm)-\\d+-(pmma|peek)$/i.test(existingSlug)) {
  113 |     return existingSlug.toLowerCase();
  114 |   }
  155 | }
  156 | 
  157 | ${helperEnd}
  158 | `;
  159 | 
  160 | const makeDetailHrefReplacement = `${helpers}
  161 | 
  162 | function makeDetailHref(product: ProductSelectionProduct) {
  163 |   const isPlungerPump =
  164 |     product.categoryId === "pumps" &&
  165 |     ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
  166 | 
  167 |   if (isPlungerPump) {
  168 |     const slug = getPlungerPumpModelSlugForDetailHref(product);
  169 | 
  170 |     return slug
  171 |       ? \`/products/pumps/plunger-pumps/\${slug}\`
  172 |       : "/products/pumps/plunger-pumps";
  173 |   }
  175 |   return \`/products/\${product.categoryId}/\${product.detailSlug}\`;
  176 | }`;
  177 | 
  178 | clientContent = replaceFunctionByName(
  179 |   clientContent,
  180 |   "makeDetailHref",
  181 |   makeDetailHrefReplacement
  182 | );
  183 | 
  184 | write(selectionClientFile, clientContent);
  185 | 
  186 | console.log("已修正产品卡片跳转逻辑：", path.relative(root, selectionClientFile));
```

## scripts\products\fix-plunger-public-assets-auto-match.js

```text
  174 | 
  175 | if (replaced) {
  176 |   content = replaced;
  177 | } else {
  178 |   content = content.replace(
  179 |     "function adaptToProductDetailClientData",
  180 |     publicAssetHelper + "\n\nfunction adaptToProductDetailClientData"
  181 |   );
  182 | }
  183 | 
  184 | fs.writeFileSync(pageFile, content, "utf8");
  185 | 
```

## scripts\products\fix-plunger-public-assets-final-clean.js

```text
  115 | 
  116 | if (replacedPublicHelper) {
  117 |   content = replacedPublicHelper;
  118 | } else {
  119 |   content = content.replace(
  120 |     "function adaptToProductDetailClientData",
  121 |     publicAssetHelper + "\n\nfunction adaptToProductDetailClientData"
  122 |   );
  123 | }
  124 | 
  125 | /**
  126 |  * 2. 确保 getPrivateAssetFileNames 存在
  160 | }
  161 | `;
  162 | 
  163 | if (!content.includes("function getPrivateAssetFileNames")) {
  164 |   content = content.replace(
  165 |     "function adaptToProductDetailClientData",
  166 |     privateFileNameHelper + "\n\nfunction adaptToProductDetailClientData"
  167 |   );
  168 | }
  169 | 
  170 | /**
  171 |  * 3. 重写适配函数
  172 |  * 不再用批量正则，避免再次污染 getPublicAssetUrls。
  173 |  */
  174 | const cleanAdapterFunction = String.raw`
  175 | function adaptToProductDetailClientData(detail: DetailRecord) {
  176 |   const model = getText(detail.model || detail.name || detail.title);
  177 |   const slug = getRecordSlug(detail);
  178 |   const seriesName = getText(detail.seriesName || detail.series);
  179 |   const seriesCode = getText(detail.seriesCode);
  180 |   const capacity = getText(detail.capacity);
  322 | }
  323 | `;
  324 | 
  325 | const replacedAdapter = replaceFunctionByName(
  326 |   content,
  327 |   "adaptToProductDetailClientData",
  328 |   cleanAdapterFunction
  329 | );
  330 | 
  331 | if (!replacedAdapter) {
  332 |   throw new Error("没有找到 adaptToProductDetailClientData 函数");
  333 | }
  334 | 
  335 | content = replacedAdapter;
  336 | 
  337 | fs.writeFileSync(pageFile, content, "utf8");
  338 | 
  339 | console.log("已彻底修复 getPublicAssetUrls，不再污染函数内部返回值。");
  340 | console.log("已指向当前 public 目录：/assets/products/ea/2d-drawings/ 等。");
  341 | console.log("没有修改 ProductDetailClient.tsx。");
  342 | console.log("没有修改 product-detail.module.css。");
```

## scripts\products\fix-plunger-pump-detail-routing.js

```text
  136 |       matchedDetail?.detailSlug ||
  137 |       product.detailSlug
  138 |   );
  139 | }
  140 | 
  141 | function makeDetailHref(product: ProductSelectionProduct) {
  142 |   const isPlungerPump =
  143 |     product.categoryId === "pumps" &&
  144 |     ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
  145 | 
  146 |   if (isPlungerPump) {
  164 |     "\n\n" +
  165 |     newHrefBlock.trim() +
  166 |     "\n\n" +
  167 |     client.slice(exportDefaultIndex);
  168 | } else {
  169 |   const makeDetailHrefPattern =
  170 |     /function\s+makeDetailHref\s*\(\s*product:\s*ProductSelectionProduct\s*\)\s*\{[\s\S]*?\n\}/;
  171 | 
  172 |   if (!makeDetailHrefPattern.test(client)) {
  173 |     console.error("没有找到 makeDetailHref 函数，请手动检查 ProductSelectionClient.tsx。");
  174 |     process.exit(1);
  175 |   }
  176 | 
  177 |   client = client.replace(makeDetailHrefPattern, newHrefBlock.trim());
  178 | }
  179 | 
  180 | write(clientFile, client);
  181 | console.log("已修正产品卡片详情链接：", path.relative(root, clientFile));
  182 | 
```

## scripts\products\fix-plunger-wrong-probe-route.cjs

```text
   19 |   这个错误会导致柱塞泵 EA-100-PMMA 被当成 probes 处理。
   20 | */
   21 | text = text.replace(/\s*\|\|\s*\(product as any\)\?\.categoryId === "pumps"/g, "");
   22 | 
   23 | /*
   24 |   2. 在 makeDetailHref 顶部增加柱塞泵强制优先分支。
   25 |   只要识别到 EA / SM / TM 柱塞泵，就直接返回 /products/pumps/plunger-pumps/[slug]
   26 |   避免后面的针系列、阀系列分支误判。
   27 | */
   28 | const marker = "PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707";
   29 | 
   30 | if (!text.includes(marker)) {
   31 |   text = text.replace(
   32 |     /function makeDetailHref\(product: ProductSelectionProduct\)\s*\{\s*/,
   33 |     `function makeDetailHref(product: ProductSelectionProduct) {
   34 |   /*
   35 |     ${marker}
   36 | 
   37 |     柱塞泵详情链接优先处理。
   38 |     防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
   39 |   */
   40 |   {
   41 |     const rawHref = String(
   42 |       (product as any).detailHref ||
   43 |         (product as any).productDetailHref ||
   44 |         (product as any).href ||
   45 |         ""
   46 |     ).trim();
   47 | 
   48 |     if (rawHref.includes("/products/pumps/plunger-pumps/")) {
```

## scripts\products\fix-probe-selection-filter.cjs

```text
  254 |   /*
  255 |     PROBE_DETAIL_HREF_PATCH_20260709
  256 | 
  257 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
  258 |     详情路由不能依赖 productTypeId。
  259 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  260 |   */
  261 |   if (
  262 |     (product as any)?.sourceType === "probe-selection" ||
  263 |     (product as any)?.category === "probes" ||
  264 |     (product as any)?.categoryId === "${needleCategoryId}" ||
  265 |     (product as any)?.categoryLabel === "针系列"
  266 |   ) {
  267 |     const rawHref = String(
  268 |       (product as any).detailHref ||
  269 |         (product as any).href ||
  270 |         ""
  271 |     );
  272 | 
  273 |     const slugFromHref = rawHref
  299 |     return "/products";
  300 |   }
  301 | `;
  302 | 
  303 |   const functionPattern =
  304 |     /(function\s+makeDetailHref\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/;
  305 | 
  306 |   const arrowPattern =
  307 |     /(const\s+makeDetailHref\s*=\s*\([^)]*\)\s*(?::\s*[^=]+)?=>\s*\{)/;
  308 | 
  309 |   if (functionPattern.test(clientText)) {
  310 |     clientText = clientText.replace(functionPattern, `$1${patchBlock}`);
  311 |     console.log("已补充针系列 makeDetailHref 补丁。");
  312 |   } else if (arrowPattern.test(clientText)) {
  313 |     clientText = clientText.replace(arrowPattern, `$1${patchBlock}`);
  314 |     console.log("已补充针系列 makeDetailHref 补丁。");
  315 |   } else {
  316 |     console.log("没有找到 makeDetailHref 函数，跳过详情链接补丁。");
  317 |   }
  318 | }
  319 | 
  320 | fs.writeFileSync(clientPath, clientText, "utf8");
  321 | 
```

## scripts\products\fix-product-detail-client-asset-fields.js

```text
    6 | const clientFile = path.join(
    7 |   root,
    8 |   "components",
    9 |   "products",
   10 |   "detail",
   11 |   "ProductDetailClient.tsx"
   12 | );
   13 | 
   14 | const viewerFile = path.join(
   15 |   root,
   16 |   "components",
  179 | }
  180 | `;
  181 | 
  182 | fs.writeFileSync(viewerFile, viewer, "utf8");
  183 | 
  184 | console.log("已修复 ProductDetailClient 的 2D / 3D 字段读取。");
  185 | console.log("已修复 ProductModelViewer，支持 modelUrl。");
  186 | console.log("资源路径仍然使用当前目录：public/assets/products/{ea|sm|tm}/...");
```

## scripts\products\fix-product-model-viewer-stage.js

```text
  287 | fs.writeFileSync(cssFile, css, "utf8");
  288 | 
  289 | console.log("已优化 3D 模型展示区：增加展示舞台、标题、提示、背景和阴影。");
  290 | console.log("没有修改路由。");
  291 | console.log("没有修改 2D / 3D 资源路径。");
  292 | console.log("没有修改 ProductDetailClient 主结构。");
```

## scripts\products\fix-selection-client-detailhref-href-type.cjs

```text
   12 | /*
   13 |   备份原文件。
   14 |   这次只修 TypeScript 类型问题，不改页面样式，不改产品数据。
   15 | */
   16 | const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
   17 | fs.copyFileSync(file, `${file}.bak_fix_detailHref_href_type_${stamp}`);
   18 | 
   19 | let text = fs.readFileSync(file, "utf8");
   20 | 
   21 | let changed = 0;
   22 | 
   23 | /*
   24 |   修复原因：
   25 |   ProductSelectionProduct 类型里没有明确声明 detailHref / href。
   26 |   但部分生成数据实际带有 detailHref / href 字段。
   27 |   因此在选型页适配层用 (product as any) 读取，避免 TypeScript build 失败。
   28 | */
   29 | function replaceOnce(oldText, newText) {
   30 |   if (text.includes(oldText)) {
   31 |     text = text.replaceAll(oldText, newText);
   32 |     changed++;
   33 |     console.log("已替换：" + oldText + " -> " + newText);
   34 |   }
   35 | }
   36 | 
   37 | replaceOnce("product.detailHref", "(product as any).detailHref");
   38 | replaceOnce("product.href", "(product as any).href");
   39 | 
   40 | fs.writeFileSync(file, text, "utf8");
   41 | 
   42 | console.log("");
   43 | console.log("完成：ProductSelectionClient.tsx detailHref / href 类型兼容修复。");
   44 | console.log("替换类型数量：" + changed);
```

## scripts\products\fix-selection-types-missing.cjs

```text
   75 |   imagePath?: string;
   76 |   imageUrl?: string;
   77 |   cardImage?: string;
   78 | 
   79 |   href?: string;
   80 |   detailHref?: string;
   81 |   selectionHref?: string;
   82 |   detailSlug?: string;
   83 |   slug?: string;
   84 |   routeSlug?: string;
   85 |   seriesSlug?: string;
```

## scripts\products\fix-syringe-detail-data-type-cast.cjs

```text
   12 | const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
   13 | fs.copyFileSync(file, `${file}.bak_cast_client_data_${stamp}`);
   14 | 
   15 | let text = fs.readFileSync(file, "utf8");
   16 | 
   17 | const oldLine = "return <ProductDetailClient data={toClientData(detail)} />;";
   18 | const newLine = "return <ProductDetailClient data={toClientData(detail) as any} />;";
   19 | 
   20 | if (!text.includes(oldLine)) {
   21 |   if (text.includes(newLine)) {
   22 |     console.log("已经加过 as any 类型兼容，不重复修改。");
   23 |     process.exit(0);
   29 | 
   30 | text = text.replace(oldLine, newLine);
   31 | 
   32 | fs.writeFileSync(file, text, "utf8");
   33 | 
   34 | console.log("已修复注射泵详情页 ProductDetailClient data 类型兼容。");
   35 | console.log("修改：data={toClientData(detail)} -> data={toClientData(detail) as any}");
```

## scripts\products\fix-syringe-detail-required-fields.cjs

```text
   55 |   additions.join("\n") +
   56 |   text.slice(insertIndex);
   57 | 
   58 | fs.writeFileSync(file, text, "utf8");
   59 | 
   60 | console.log("已补齐注射泵详情页 ProductDetailClient 必需字段：");
   61 | console.log(additions.join("\n"));
```

## scripts\products\fix-syringe-pump-detail-faq-cta.cjs

```text
  124 | }
  125 | 
  126 | write(jsonRel, JSON.stringify(details, null, 2));
  127 | 
  128 | /**
  129 |  * 2. 修复详情路由：把 FAQ / CTA 字段传给 ProductDetailClient
  130 |  */
  131 | const pageRel = "app/products/pumps/syringe-pumps/[slug]/page.tsx";
  132 | 
  133 | if (fs.existsSync(p(pageRel))) {
  134 |   let page = read(pageRel);
  173 |     console.log("详情路由已包含 FAQ / CTA 兼容字段，跳过:", pageRel);
  174 |   }
  175 | }
  176 | 
  177 | /**
  178 |  * 3. 修复 ProductDetailClient：增加注射泵识别 + 底部 CTA
  179 |  */
  180 | const clientRel = "components/products/detail/ProductDetailClient.tsx";
  181 | 
  182 | if (fs.existsSync(p(clientRel))) {
  183 |   let client = read(clientRel);
  184 |   let changed = false;
  185 | 
  246 |   }
  247 | 
  248 |   if (changed) {
  249 |     write(clientRel, client);
  250 |   } else {
  251 |     console.log("ProductDetailClient 无需修改或未找到可自动修改位置");
  252 |   }
  253 | }
  254 | 
  255 | console.log("");
  256 | console.log("FAQ 与注射泵底部 CTA 修复完成。");
```

## scripts\products\fix-syringe-pump-detail-specs-alias.cjs

```text
   22 |   console.log("已修改:", rel);
   23 | }
   24 | 
   25 | /**
   26 |  * 1. 给详情 JSON 补 specs 字段
   27 |  * ProductDetailClient 当前读取 data.specs，不读取 data.specifications
   28 |  */
   29 | const jsonRel = "data/products/generated/pumps/syringe-pumps/detail/index.json";
   30 | 
   31 | if (!fs.existsSync(p(jsonRel))) {
   32 |   console.error("未找到:", jsonRel);
```

## scripts\products\fix-tubing-card-subtitle-three-lines.cjs

```text
  130 |     zh: item.titleZh,
  131 |     en: item.titleEn
  132 |   },
  133 | 
  134 |   href: item.href,
  135 |   detailHref: item.href,
  136 |   productDetailHref: item.href,
  137 |   selectionHref: "/products",
  138 | 
  139 |   filters: {},
  140 |   searchKeywords: {
  141 |     zh: `${item.titleZh} ${item.materialZh} 管路 管材`,
```

## scripts\products\fix-tubing-image-and-use-existing-cta.cjs

```text
   79 | console.log("已更新管路 JSON 主图路径和 CTA 文案。");
   80 | 
   81 | /*
   82 |   2. 重写管路静态详情页组件
   83 |   注意：这里不写任何新样式，不额外渲染新的 CTA。
   84 |   只把数据交给 ProductDetailClient，让它用原来的详情页样式。
   85 | */
   86 | const sharedPath = path.join(root, "app/products/tubing/_components/TubingDetailStaticPage.tsx");
   87 | backup(sharedPath, "before_remove_custom_cta_style");
   88 | 
   89 | const shared = `import type { ComponentType } from "react";
   90 | import type { Metadata } from "next";
   91 | import { notFound } from "next/navigation";
   92 | 
   93 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   94 | import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
   95 | 
   96 | type FaqItem = {
   97 |   question?: string;
   98 |   answer?: string;
  128 |   bottomCtaHref?: string;
  129 | };
  130 | 
  131 | const records = tubingDetailData as TubingDetailRecord[];
  132 | 
  133 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  134 |   data: any;
  135 | }>;
  136 | 
  137 | function findDetail(slug: string) {
  138 |   return records.find((item) => item.slug === slug);
  252 | `;
  253 | 
  254 | write(sharedPath, shared);
  255 | 
  256 | /*
  257 |   3. 只给 ProductDetailClient 增加 tubing CTA 数据入口
  258 |   不改 CSS，不写新样式。
  259 | */
  260 | const clientPath = path.join(root, "components/products/detail/ProductDetailClient.tsx");
  261 | 
  262 | if (fs.existsSync(clientPath)) {
  263 |   backup(clientPath, "before_tubing_cta_data_patch");
  264 | 
  265 |   let client = fs.readFileSync(clientPath, "utf8");
  313 |     );
  314 | 
  315 |     fs.writeFileSync(clientPath, client, "utf8");
  316 |     console.log("已接入管路 CTA 数据，未修改样式。");
  317 |   } else {
  318 |     console.log("ProductDetailClient 已有管路 CTA 数据入口，或未找到 getPlungerPumpBottomCta，已跳过。");
  319 |   }
  320 | }
  321 | 
  322 | console.log("");
  323 | console.log("图片位置：");
```

## scripts\products\fix-tubing-images-and-engineer-cta.cjs

```text
   85 | 
   86 | const shared = `import type { ComponentType, CSSProperties } from "react";
   87 | import type { Metadata } from "next";
   88 | import { notFound } from "next/navigation";
   89 | 
   90 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   91 | import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
   92 | 
   93 | type FaqItem = {
   94 |   question?: string;
   95 |   answer?: string;
  125 |   bottomCtaHref?: string;
  126 | };
  127 | 
  128 | const records = tubingDetailData as TubingDetailRecord[];
  129 | 
  130 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  131 |   data: any;
  132 | }>;
  133 | 
  134 | function findDetail(slug: string) {
  135 |   return records.find((item) => item.slug === slug);
```

## scripts\products\fix-tubing-selection-links.cjs

```text
   23 |     model: "PVC 管",
   24 |     materialFullName: "聚氯乙烯（PVC）",
   25 |     innerDiameterRange: "1.6mm~19.1mm",
   26 |     workingTemperature: "-42℃~75℃",
   27 |     href: "/products/tubing/pvc-tubing",
   28 |     detailHref: "/products/tubing/pvc-tubing",
   29 |     image: "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
   30 |   },
   31 |   {
   32 |     slug: "tpu-tubing",
   33 |     title: "TPU 管",
   34 |     model: "TPU 管",
   35 |     materialFullName: "热塑性聚氨酯（TPU）",
   36 |     innerDiameterRange: "3.7mm~7.0mm",
   37 |     workingTemperature: "-30℃~70℃",
   38 |     href: "/products/tubing/tpu-tubing",
   39 |     detailHref: "/products/tubing/tpu-tubing",
   40 |     image: "/images/products/tubing/tpu-tubing/tpu-tubing-main.webp",
   41 |   },
   42 |   {
   43 |     slug: "fep-tubing",
   44 |     title: "FEP 管",
   45 |     model: "FEP 管",
   46 |     materialFullName: "氟化乙烯丙烯共聚物（FEP）",
   47 |     innerDiameterRange: "0.3mm~2.0mm",
   48 |     workingTemperature: "-230℃~200℃",
   49 |     href: "/products/tubing/fep-tubing",
   50 |     detailHref: "/products/tubing/fep-tubing",
   51 |     image: "/images/products/tubing/fep-tubing/fep-tubing-main.webp",
   52 |   },
   53 |   {
   54 |     slug: "ptfe-tubing",
   55 |     title: "PTFE 管",
   56 |     model: "PTFE 管",
   57 |     materialFullName: "聚四氟乙烯（PTFE）",
   58 |     innerDiameterRange: "1.5mm~2.0mm",
   59 |     workingTemperature: "-200℃~260℃",
   60 |     href: "/products/tubing/ptfe-tubing",
   61 |     detailHref: "/products/tubing/ptfe-tubing",
   62 |     image: "/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp",
   63 |   },
   64 |   {
   65 |     slug: "peek-tubing",
   66 |     title: "PEEK 管",
   67 |     model: "PEEK 管",
   68 |     materialFullName: "聚醚醚酮（PEEK）",
   69 |     innerDiameterRange: "0.2mm~0.8mm",
   70 |     workingTemperature: "-180℃~225℃",
   71 |     href: "/products/tubing/peek-tubing",
   72 |     detailHref: "/products/tubing/peek-tubing",
   73 |     image: "/images/products/tubing/peek-tubing/peek-tubing-main.webp",
   74 |   },
   75 |   {
   76 |     slug: "pfa-tubing",
   77 |     title: "PFA 管",
   78 |     model: "PFA 管",
   79 |     materialFullName: "全氟烷氧基树脂（PFA）",
   80 |     innerDiameterRange: "0.5mm~1.0mm",
   81 |     workingTemperature: "-230℃~200℃",
   82 |     href: "/products/tubing/pfa-tubing",
   83 |     detailHref: "/products/tubing/pfa-tubing",
   84 |     image: "/images/products/tubing/pfa-tubing/pfa-tubing-main.webp",
   85 |   },
   86 | ];
   87 | 
   88 | /*
   89 |   1. 写入管路筛选页数据文件。
   90 |   这里给足 href/detailHref/productDetailHref/url/path，避免不同卡片组件取不同字段导致没链接。
   91 | */
   92 | const selectionFile = path.join(root, "data/products/selection/tubing-selection.generated.ts");
   93 | backup(selectionFile, "before_tubing_selection_links");
   94 | 
   95 | const selectionCode = `export type TubingSelectionCard = {
   98 |   model: string;
   99 |   materialFullName: string;
  100 |   innerDiameterRange: string;
  101 |   workingTemperature: string;
  102 |   href: string;
  103 |   detailHref: string;
  104 |   productDetailHref: string;
  105 |   url: string;
  106 |   path: string;
  107 |   image: string;
  108 |   imagePath: string;
  109 |   cardSubtitle: {
  117 | };
  118 | 
  119 | export const tubingSelectionCards: TubingSelectionCard[] = ${JSON.stringify(
  120 |   tubingCards.map((item) => ({
  121 |     ...item,
  122 |     productDetailHref: item.detailHref,
  123 |     url: item.detailHref,
  124 |     path: item.detailHref,
  125 |     imagePath: item.image,
  126 |     cardSubtitle: {
  127 |       zh: `${item.materialFullName}\\n内径范围：${item.innerDiameterRange}\\n工作温度：${item.workingTemperature}`,
  128 |       en: `${item.materialFullName}\\nID range: ${item.innerDiameterRange}\\nWorking temperature: ${item.workingTemperature}`,
  129 |     },
  142 | `;
  143 | 
  144 | write(selectionFile, selectionCode);
  145 | 
  146 | /*
  147 |   2. 修复已有筛选数据里管路卡片没有 href/detailHref 的问题。
  148 |   扫描 data/products/selection 下所有 ts/tsx/json，把 pvc-tubing 等对象中的链接字段补齐。
  149 | */
  150 | const selectionDir = path.join(root, "data/products/selection");
  151 | 
  152 | function walk(dir, out = []) {
  163 |   let text = fs.readFileSync(file, "utf8");
  164 |   let original = text;
  165 | 
  166 |   for (const card of tubingCards) {
  167 |     const slug = card.slug;
  168 |     const href = card.detailHref;
  169 | 
  170 |     if (!text.includes(slug)) continue;
  171 | 
  172 |     /*
  173 |       如果对象里有 slug: "xxx-tubing"，但没有 detailHref/href，则在 slug 后补字段。
  174 |       这个替换尽量保守，只在包含该 slug 的位置附近补。
  175 |     */
  176 |     const slugPattern1 = new RegExp(`slug:\\s*["']${slug}["']\\s*,`, "g");
  177 |     text = text.replace(slugPattern1, (match) => {
  178 |       const insert = `${match}
  179 |     href: "${href}",
  180 |     detailHref: "${href}",
  181 |     productDetailHref: "${href}",
  182 |     url: "${href}",
  183 |     path: "${href}",`;
  184 |       return insert;
  185 |     });
  186 | 
  187 |     const slugPattern2 = new RegExp(`"slug"\\s*:\\s*"${slug}"\\s*,`, "g");
  188 |     text = text.replace(slugPattern2, (match) => {
  189 |       const insert = `${match}
  190 |     "href": "${href}",
  191 |     "detailHref": "${href}",
  192 |     "productDetailHref": "${href}",
  193 |     "url": "${href}",
  194 |     "path": "${href}",`;
  195 |       return insert;
  196 |     });
  197 |   }
```

## scripts\products\fix-valve-bottom-cta-render.cjs

```text
   19 |     fs.copyFileSync(filePath, backupPath);
   20 |     console.log("已备份：" + path.relative(root, backupPath));
   21 |   }
   22 | }
   23 | 
   24 | const clientPath = abs("components/products/detail/ProductDetailClient.tsx");
   25 | 
   26 | if (!fs.existsSync(clientPath)) {
   27 |   console.error("找不到 ProductDetailClient.tsx");
   28 |   process.exit(1);
   29 | }
   30 | 
   31 | backup(clientPath, "valve_bottom_cta");
   32 | 
   38 | if (!text.includes("VALVE_DETAIL_BOTTOM_CTA_20260708")) {
   39 |   const helper = `
   40 | /*
   41 |   VALVE_DETAIL_BOTTOM_CTA_20260708
   42 | 
   43 |   阀系列详情页复用公共 ProductDetailClient。
   44 |   这里单独识别阀系列数据，避免底部 CTA 回退到柱塞泵，或直接不显示。
   45 | */
   46 | function isValveDetailData(data: any): boolean {
   47 |   return (
   48 |     data?.sourceType === "valve-detail" ||
  105 | 
  106 |   const anchor = "function getPlungerPumpBottomCta";
  107 | 
  108 |   if (!text.includes(anchor)) {
  109 |     console.error("没有找到 getPlungerPumpBottomCta 函数，无法自动插入阀系列 CTA 逻辑。");
  110 |     console.error("请把 ProductDetailClient.tsx 中 bottom CTA 附近代码发我。");
  111 |     process.exit(1);
  112 |   }
  113 | 
  114 |   text = text.replace(anchor, `${helper}\n${anchor}`);
  115 | }
  137 |   });
  138 | }
  139 | 
  140 | fs.writeFileSync(clientPath, text, "utf8");
  141 | 
  142 | console.log("已修复 ProductDetailClient 阀系列底部 CTA 识别。");
  143 | 
  144 | /*
  145 |   3. 再确认阀详情 JSON 中有底部联系字段
  146 | */
  147 | const jsonPath = abs("data/products/generated/valves/detail/index.json");
```

## scripts\products\fix-valve-type-display.cjs

```text
   19 |   修复目标：
   20 |   页面左侧筛选和上方已选标签正在直接显示 productTypeId，
   21 |   所以把 productTypeId 改成中文。
   22 | 
   23 |   注意：
   24 |   slug / id / href / detailHref 不改，仍然保留英文路由。
   25 | */
   26 | 
   27 | const rotary = "\u65cb\u8f6c\u9600";      // 旋转阀
   28 | const highPressure = "\u9ad8\u538b\u9600"; // 高压阀
   29 | const solenoid = "\u7535\u78c1\u9600";    // 电磁阀
```

## scripts\products\fix-valve-undefined-link.cjs

```text
   63 | valveText = insertSlugFields(valveText, "rotary-valves");
   64 | valveText = insertSlugFields(valveText, "high-pressure-valves");
   65 | valveText = insertSlugFields(valveText, "solenoid-valves");
   66 | 
   67 | /*
   68 |   保证 href / detailHref 是真实路径，不是 undefined。
   69 | */
   70 | valveText = valveText
   71 |   .replace(/href:\s*"\/products\/valves\/undefined"/g, 'href: "/products/valves/rotary-valves"')
   72 |   .replace(/detailHref:\s*"\/products\/valves\/undefined"/g, 'detailHref: "/products/valves/rotary-valves"');
   73 | 
   74 | fs.writeFileSync(valveSelectionPath, valveText, "utf8");
   75 | 
   76 | console.log("已补齐阀系列卡片 detailSlug / routeSlug。");
   77 | 
   78 | /* =========================================================
   79 |    2. 修复 ProductSelectionClient 详情链接
   80 |    说明：
   81 |    只在 makeDetailHref 开头加阀系列兜底分支。
   82 |    不改页面样式，不改其他产品逻辑。
   83 | ========================================================= */
   84 | 
   85 | const clientPath = abs("components/products/selection/ProductSelectionClient.tsx");
   86 | 
  100 |   /*
  101 |     VALVE_DETAIL_HREF_PATCH_20260707
  102 | 
  103 |     阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
  104 |     因此详情链接不能只依赖 productTypeId。
  105 |     这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
  106 |     避免生成 /products/valves/undefined/。
  107 |   */
  108 |   if ((product as any)?.categoryId === "valves") {
  109 |     const rawHref = String(
  110 |       (product as any).detailHref ||
  111 |         (product as any).href ||
  112 |         ""
  113 |     );
  114 | 
  115 |     const slugFromHref = rawHref
  141 |     return "/products";
  142 |   }
  143 | `;
  144 | 
  145 |   const functionPattern =
  146 |     /(function\s+makeDetailHref\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/;
  147 | 
  148 |   const arrowPattern =
  149 |     /(const\s+makeDetailHref\s*=\s*\([^)]*\)\s*(?::\s*[^=]+)?=>\s*\{)/;
  150 | 
  151 |   if (functionPattern.test(clientText)) {
  152 |     clientText = clientText.replace(functionPattern, `$1${patchBlock}`);
  153 |   } else if (arrowPattern.test(clientText)) {
  154 |     clientText = clientText.replace(arrowPattern, `$1${patchBlock}`);
  155 |   } else {
  156 |     console.error("没有找到 makeDetailHref 函数，无法自动修复。");
  157 |     console.error("请把 components/products/selection/ProductSelectionClient.tsx 中 makeDetailHref 附近代码发我。");
  158 |     process.exit(1);
  159 |   }
  160 | 
  161 |   fs.writeFileSync(clientPath, clientText, "utf8");
  162 |   console.log("已修复 ProductSelectionClient 阀系列详情链接。");
```

## scripts\products\fix-valveless-detail-required-fields-and-type.cjs

```text
   13 | fs.copyFileSync(file, `${file}.bak_fix_required_fields_and_type_cast_${stamp}`);
   14 | 
   15 | let text = fs.readFileSync(file, "utf8");
   16 | 
   17 | /*
   18 |   1. 补齐 ProductDetailClient 必需字段：
   19 |      showConfigurator / specSeriesKey
   20 | */
   21 | const functionIndex = text.indexOf("function toClientData");
   22 | 
   23 | if (functionIndex < 0) {
   64 | } else {
   65 |   console.log("showConfigurator / specSeriesKey 已存在，不重复添加。");
   66 | }
   67 | 
   68 | /*
   69 |   2. 修复 ProductDetailClient data 类型兼容。
   70 | */
   71 | const oldLine = "return <ProductDetailClient data={toClientData(detail)} />;";
   72 | const newLine = "return <ProductDetailClient data={toClientData(detail) as any} />;";
   73 | 
   74 | if (text.includes(oldLine)) {
   75 |   text = text.replace(oldLine, newLine);
   76 |   console.log("已添加 data={toClientData(detail) as any} 类型兼容。");
   77 | } else if (text.includes(newLine)) {
   78 |   console.log("data as any 已存在，不重复修改。");
   79 | } else {
   80 |   console.warn("没有找到标准 ProductDetailClient 返回行，字段已补齐，但 data 类型可能还需要手动检查。");
   81 | }
   82 | 
   83 | fs.writeFileSync(file, text, "utf8");
   84 | 
   85 | console.log("完成：无阀泵详情页字段与类型兼容修复。");
```

## scripts\products\fix-valveless-pump-detail-specs.js

```text
  181 |               title: "技术参数",
  182 |               items: specs,
  183 |             },
  184 |           ],
  185 |     selectionHref: "/products/pumps/valveless-pumps",
  186 |     detailHref: \`/products/pumps/valveless-pumps/\${detail.slug}\`,
  187 |     href: \`/products/pumps/valveless-pumps/\${detail.slug}\`,
  188 |   };
  189 | }`
  190 |   );
  191 | 
```

## scripts\products\force-fix-plunger-wrong-probe-href.cjs

```text
   23 | 
   24 |   最终详情链接出口保护：
   25 |   防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
   26 |   只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
   27 | */
   28 | function normalizeFinalProductDetailHref(
   29 |   product: ProductSelectionProduct,
   30 |   href: string
   31 | ): string {
   32 |   const rawHref = String(href || "").trim();
   33 | 
   64 |   return rawHref;
   65 | }
   66 | 
   67 | `;
   68 | 
   69 |   const anchor = "function makeDetailHref(product: ProductSelectionProduct)";
   70 |   if (text.includes(anchor)) {
   71 |     text = text.replace(anchor, helper + "\n" + anchor);
   72 |   } else {
   73 |     console.error("没有找到 makeDetailHref，无法插入链接保护函数。");
   74 |     process.exit(1);
   75 |   }
   76 | }
   77 | 
   78 | /*
   79 |   把传给 ProductCardGrid 的 getDetailHref 包一层最终纠正。
   80 | */
   81 | const old1 = "getDetailHref={makeDetailHref}";
   82 | const new1 = "getDetailHref={(product) => normalizeFinalProductDetailHref(product, makeDetailHref(product))}";
   83 | 
   84 | if (text.includes(old1)) {
   85 |   text = text.replace(old1, new1);
   86 |   console.log("已替换 ProductCardGrid 的 getDetailHref 出口。");
   87 | } else if (text.includes("normalizeFinalProductDetailHref(product, makeDetailHref(product))")) {
   88 |   console.log("ProductCardGrid 的 getDetailHref 已经是安全出口。");
   89 | } else {
   90 |   console.error("没有找到 getDetailHref={makeDetailHref}，需要继续查 ProductCardGrid 调用位置。");
   91 |   process.exit(1);
   92 | }
   93 | 
   94 | /*
   95 |   顺手删除针系列分支中错误的 categoryId === pumps 条件。
```

## scripts\products\force-fix-probe-selection-visible.cjs

```text
  166 |     (product as any)?.categoryId === "needles" ||
  167 |     (product as any)?.category === "needles" ||
  168 |     (product as any)?.categoryLabel === "针系列"
  169 |   ) {
  170 |     const rawHref = String(
  171 |       (product as any).detailHref ||
  172 |         (product as any).href ||
  173 |         ""
  174 |     );
  175 | 
  176 |     const slugFromHref = rawHref
  202 |     return "/products";
  203 |   }
  204 | `;
  205 | 
  206 |   const functionPattern =
  207 |     /(function\s+makeDetailHref\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/;
  208 | 
  209 |   const arrowPattern =
  210 |     /(const\s+makeDetailHref\s*=\s*\([^)]*\)\s*(?::\s*[^=]+)?=>\s*\{)/;
  211 | 
  212 |   if (functionPattern.test(clientText)) {
  213 |     clientText = clientText.replace(functionPattern, `$1${patchBlock}`);
  214 |     console.log("已补充针系列详情链接补丁。");
  215 |   } else if (arrowPattern.test(clientText)) {
  216 |     clientText = clientText.replace(arrowPattern, `$1${patchBlock}`);
  217 |     console.log("已补充针系列详情链接补丁。");
  218 |   } else {
  219 |     console.log("没有找到 makeDetailHref，跳过详情链接补丁。");
  220 |   }
  221 | }
  222 | 
  223 | fs.writeFileSync(clientPath, clientText, "utf8");
  224 | 
```

## scripts\products\generate-hard-tube-fitting-detail-data.cjs

```text
    6 | const selectionPath = path.join(
    7 |   root,
    8 |   "data",
    9 |   "products",
   10 |   "selection",
   11 |   "hard-tube-fitting-selection.generated.ts"
   12 | );
   13 | 
   14 | const imageMapPath = path.join(
   15 |   root,
   16 |   "data",
   17 |   "products",
   18 |   "selection",
   19 |   "hard-tube-fitting-image-map.generated.json"
   20 | );
   21 | 
   22 | const outputPath = path.join(
   23 |   root,
   24 |   "data",
   25 |   "products",
   26 |   "generated",
   27 |   "fittings",
   28 |   "hard-tube-fittings",
   29 |   "detail",
   30 |   "index.json"
   31 | );
   32 | 
   33 | function getText(value) {
  366 |       model.toLowerCase();
  367 | 
  368 |     const seriesName =
  369 |       getText(
  370 |         product.filters?.filter01
  371 |       ) || "硬管接头";
  372 | 
  373 |     const thread =
  374 |       getText(
  375 |         product.filters?.filter02
  376 |       );
  464 |       category: "fittings",
  465 |       categoryId: "fittings",
  466 |       categoryLabel: "接头系列",
  467 | 
  468 |       productTypeId:
  469 |         "hard-tube-fittings",
  470 | 
  471 |       productTypeName:
  472 |         seriesName,
  473 | 
  474 |       productId:
  554 |         thread,
  555 |         material,
  556 |         seriesName,
  557 |       }),
  558 | 
  559 |       detailHref:
  560 |         `/products/fittings/hard-tube-fittings/${slug}`,
  561 | 
  562 |       href:
  563 |         `/products/fittings/hard-tube-fittings/${slug}`,
  564 | 
  565 |       selectionHref:
  566 |         "/products/fittings/hard-tube-fittings",
  567 | 
  568 |       seo: {
  569 |         title:
  570 |           `${model} ${seriesName} | FOREACH`,
  571 | 
  586 |     )
  587 |   );
  588 | 
  589 | if (details.length === 0) {
  590 |   throw new Error(
  591 |     "没有读取到任何硬管接头产品"
  592 |   );
  593 | }
  594 | 
  595 | fs.mkdirSync(
  596 |   path.dirname(outputPath),
  609 |   "utf8"
  610 | );
  611 | 
  612 | console.log("");
  613 | console.log(
  614 |   "===== 硬管接头详情数据已生成 ====="
  615 | );
  616 | console.log(
  617 |   `详情数量：${details.length}`
  618 | );
  619 | console.log(
```

## scripts\products\generate-hard-tube-fitting-selection.cjs

```text
   12 | const workbook = XLSX.readFile(sourcePath, {
   13 |   cellDates: false,
   14 |   raw: false,
   15 | });
   16 | 
   17 | const sheetName = "01_硬管接头";
   18 | const worksheet = workbook.Sheets[sheetName];
   19 | 
   20 | if (!worksheet) {
   21 |   throw new Error(`未找到工作表：${sheetName}`);
   22 | }
  387 |   );
  388 | });
  389 | 
  390 | if (records.length < 140) {
  391 |   throw new Error(
  392 |     `硬管接头解析数量异常：${records.length}。预期至少140条。`
  393 |   );
  394 | }
  395 | 
  396 | function buildHardTubeCardSubtitle(record) {
  397 |   const {
  484 | const imageMapPath = path.join(
  485 |   root,
  486 |   "data",
  487 |   "products",
  488 |   "selection",
  489 |   "hard-tube-fitting-image-map.generated.json"
  490 | );
  491 | 
  492 | const imageMap = fs.existsSync(imageMapPath)
  493 |   ? JSON.parse(
  494 |       fs.readFileSync(imageMapPath, "utf8")
  516 |     `hard-tube-${modelCode.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  517 | 
  518 |   return {
  519 |     productId: stableId,
  520 |     categoryId: "fittings",
  521 |     productTypeId: "hard-tube-fittings",
  522 |     seriesId: prefixInfo.seriesId,
  523 | 
  524 |     cardTitle: {
  525 |       zh: modelCode,
  526 |       en: modelCode,
  539 |     imageCard:
  540 |       imageMap[modelCode]?.imageCard ||
  541 |       "/images/logo/foreach-logo-color.svg",
  542 | 
  543 |     /*
  544 |      * 详情页尚未建立前，先回到硬管接头选型页，
  545 |      * 避免生成不存在的具体SKU详情路径。
  546 |      */
  547 |     detailSlug: "hard-tube-fittings",
  548 | 
  549 |     status: "active",
  550 |     sortOrder: index + 1,
  551 | 
  552 |     searchKeywords: {
  553 |       zh: [
  554 |         "硬管接头",
  555 |         prefixInfo.seriesZh,
  556 |         prefix,
  557 |         modelCode,
  558 |         productCode,
  559 |         partNumber,
  585 | });
  586 | 
  587 | const filterLabels = [
  588 |   {
  589 |     categoryId: "fittings",
  590 |     productTypeId: "hard-tube-fittings",
  591 |     filterKey: "filter01",
  592 |     label: localeText("产品系列", "Product Series"),
  593 |     inputType: "single",
  594 |     sortOrder: 10,
  595 |     visible: true,
  596 |   },
  597 |   {
  598 |     categoryId: "fittings",
  599 |     productTypeId: "hard-tube-fittings",
  600 |     filterKey: "filter02",
  601 |     label: localeText("螺纹规格", "Thread"),
  602 |     inputType: "multiple",
  603 |     sortOrder: 20,
  604 |     visible: true,
  605 |   },
  606 |   {
  607 |     categoryId: "fittings",
  608 |     productTypeId: "hard-tube-fittings",
  609 |     filterKey: "filter03",
  610 |     label: localeText("接管外径", "Tube OD"),
  611 |     inputType: "multiple",
  612 |     sortOrder: 30,
  613 |     visible: true,
  614 |   },
  615 |   {
  616 |     categoryId: "fittings",
  617 |     productTypeId: "hard-tube-fittings",
  618 |     filterKey: "filter04",
  619 |     label: localeText("主体材质", "Body Material"),
  620 |     inputType: "multiple",
  621 |     sortOrder: 40,
  622 |     visible: true,
  623 |   },
  624 |   {
  625 |     categoryId: "fittings",
  626 |     productTypeId: "hard-tube-fittings",
  627 |     filterKey: "filter05",
  628 |     label: localeText("颜色", "Color"),
  629 |     inputType: "multiple",
  630 |     sortOrder: 50,
  631 |     visible: true,
  649 |   }));
  650 | 
  651 | const taxonomyItems = [
  652 |   {
  653 |     type: "productType",
  654 |     id: "hard-tube-fittings",
  655 |     label: localeText("硬管接头", "Hard Tube Fittings"),
  656 |     sortOrder: 410,
  657 |   },
  658 |   ...seriesTaxonomy,
  659 | ];
  660 | 
  661 | const outputPath = path.join(
  662 |   root,
  663 |   "data",
  664 |   "products",
  665 |   "selection",
  666 |   "hard-tube-fitting-selection.generated.ts"
  667 | );
  668 | 
  669 | fs.mkdirSync(path.dirname(outputPath), {
  670 |   recursive: true,
  671 | });
  672 | 
  673 | const output = `/* =========================================================
  674 |    hard-tube-fitting-selection.generated.ts
  675 |    由 FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx 自动生成
  676 | 
  677 |    数据范围：
  678 |    - 工作表：01_硬管接头
  679 |    - 包含：平底、卡箍、卡环和高压接头
  680 |    - 不包含：堵头、卡箍、卡环套件
  681 |    ========================================================= */
  682 | 
  683 | import type {
  714 | const summaryPath = path.join(
  715 |   root,
  716 |   "data",
  717 |   "products",
  718 |   "selection",
  719 |   "hard-tube-fitting-selection.summary.json"
  720 | );
  721 | 
  722 | fs.writeFileSync(
  723 |   summaryPath,
  724 |   JSON.stringify(summary, null, 2),
  725 |   "utf8"
  726 | );
  727 | 
  728 | console.log("硬管接头选型数据生成完成");
  729 | console.log(`输出产品数：${products.length}`);
  730 | console.log(summary.seriesCounts);
  731 | 
  732 | if (skippedRows.length > 0) {
  733 |   console.log(`未识别行数：${skippedRows.length}`);
```

## scripts\products\generate-pipetting-pump-detail-data.js

```text
  136 |     showConfigurator: false,
  137 |     showDatasheetRequest: false,
  138 |     showDrawingRequest: true,
  139 |     show3DRequest: false,
  140 | 
  141 |     detailHref: "/products/pumps/pipetting-pumps/smtp2-1000ul",
  142 |     selectionHref: "/products/pumps/pipetting-pumps",
  143 |     specSeriesKey: "smtp2-1000ul",
  144 | 
  145 |     ...resources("smtp2_1000ul"),
  146 | 
  233 |     showConfigurator: false,
  234 |     showDatasheetRequest: false,
  235 |     showDrawingRequest: true,
  236 |     show3DRequest: false,
  237 | 
  238 |     detailHref: "/products/pumps/pipetting-pumps/smtp4-100ul",
  239 |     selectionHref: "/products/pumps/pipetting-pumps",
  240 |     specSeriesKey: "smtp4-100ul",
  241 | 
  242 |     ...resources("smtp4_100ul"),
  243 | 
  326 |     showConfigurator: false,
  327 |     showDatasheetRequest: false,
  328 |     showDrawingRequest: true,
  329 |     show3DRequest: false,
  330 | 
  331 |     detailHref: "/products/pumps/pipetting-pumps/smtp4-500ul",
  332 |     selectionHref: "/products/pumps/pipetting-pumps",
  333 |     specSeriesKey: "smtp4-500ul",
  334 | 
  335 |     ...resources("smtp4_500ul"),
  336 | 
```

## scripts\products\generate-valveless-pump-detail-data.js

```text
   70 |         title: "技术参数",
   71 |         items: specs,
   72 |       },
   73 |     ],
   74 |     selectionHref: "/products/pumps/valveless-pumps",
   75 |     detailHref: `/products/pumps/valveless-pumps/${detail.slug}`,
   76 |     href: `/products/pumps/valveless-pumps/${detail.slug}`,
   77 |   };
   78 | }
   79 | 
   80 | const details = [
```

## scripts\products\hide-detail-product-name.js

```text
    4 | const file = path.join(
    5 |   process.cwd(),
    6 |   "components",
    7 |   "products",
    8 |   "detail",
    9 |   "ProductDetailClient.tsx"
   10 | );
   11 | 
   12 | let content = fs.readFileSync(file, "utf8");
   13 | 
   14 | /*
```

## scripts\products\import-hard-tube-fitting-images.cjs

```text
   17 | const generatedPath = path.join(
   18 |   root,
   19 |   "data",
   20 |   "products",
   21 |   "selection",
   22 |   "hard-tube-fitting-selection.generated.ts"
   23 | );
   24 | 
   25 | const generatorPath = path.join(
   26 |   root,
   27 |   "scripts",
   28 |   "products",
   29 |   "generate-hard-tube-fitting-selection.cjs"
   30 | );
   31 | 
   32 | const imageMapPath = path.join(
   33 |   root,
   34 |   "data",
   35 |   "products",
   36 |   "selection",
   37 |   "hard-tube-fitting-image-map.generated.json"
   38 | );
   39 | 
   40 | const outputRoot = path.join(
   41 |   root,
   42 |   "public",
   43 |   "images",
   44 |   "products",
   45 |   "fittings",
   46 |   "hard-tube-fittings"
   47 | );
   48 | 
   49 | const reportPath = path.join(
   50 |   root,
   51 |   "hard-tube-fitting-image-import-report.md"
   52 | );
   53 | 
   54 | const allowedExtensions = new Set([
   55 |   ".png",
   56 |   ".jpg",
  162 |     seen.add(key);
  163 |     return true;
  164 |   });
  165 | }
  166 | 
  167 | ensureFile(workbookPath, "硬管接头在售清单");
  168 | ensureFile(generatedPath, "硬管接头生成数据");
  169 | ensureFile(generatorPath, "硬管接头生成脚本");
  170 | 
  171 | if (!sourceDir || !fs.existsSync(sourceDir)) {
  172 |   throw new Error(`找不到图片源目录：${sourceDir}`);
  173 | }
  174 | 
  179 | /*
  180 |  * 读取权威Excel，取得：
  181 |  * 型号、商品编码、料号、产品系列。
  182 |  */
  183 | const workbook = XLSX.readFile(workbookPath);
  184 | const sheet = workbook.Sheets["01_硬管接头"];
  185 | 
  186 | if (!sheet) {
  187 |   throw new Error("Excel中找不到工作表：01_硬管接头");
  188 | }
  189 | 
  190 | const rows = XLSX.utils.sheet_to_json(sheet, {
  191 |   header: 1,
  192 |   defval: "",
  269 |   (record) => record.modelCode
  270 | );
  271 | 
  272 | if (uniqueRecords.length < 100) {
  273 |   throw new Error(
  274 |     `从网站数据中只读取到 ${uniqueRecords.length} 个硬管接头型号，停止导入。`
  275 |   );
  276 | }
  277 | 
  278 | /*
  279 |  * 建立所有产品系列文件夹。
  292 |     }
  293 |   );
  294 | }
  295 | 
  296 | const rootReadme = [
  297 |   "FOREACH 硬管接头图片目录",
  298 |   "",
  299 |   "目录结构：",
  300 |   "hard-tube-fittings / 产品系列 / 图片",
  301 |   "",
  302 |   "图片与SKU的对应关系由以下文件维护：",
  303 |   "data/products/selection/hard-tube-fitting-image-map.generated.json",
  304 |   "",
  305 |   "请不要直接修改 generated.ts 中的图片路径。",
  306 |   "重新运行图片导入脚本即可更新映射。",
  307 |   "",
  308 | ].join("\r\n");
  574 |   ) + "\n",
  575 |   "utf8"
  576 | );
  577 | 
  578 | /*
  579 |  * 将图片映射接入硬管接头生成脚本。
  580 |  */
  581 | let generatorContent = fs.readFileSync(
  582 |   generatorPath,
  583 |   "utf8"
  584 | );
  590 |   const productsAnchor =
  591 |     "const products = records.map((record, index) => {";
  592 | 
  593 |   if (!generatorContent.includes(productsAnchor)) {
  594 |     throw new Error(
  595 |       "没有找到硬管接头products生成位置。"
  596 |     );
  597 |   }
  598 | 
  599 |   const mapLoader = `/* HARD_TUBE_IMAGE_MAP_START */
  600 | const imageMapPath = path.join(
  601 |   root,
  602 |   "data",
  603 |   "products",
  604 |   "selection",
  605 |   "hard-tube-fitting-image-map.generated.json"
  606 | );
  607 | 
  608 | const imageMap = fs.existsSync(imageMapPath)
  609 |   ? JSON.parse(
  610 |       fs.readFileSync(imageMapPath, "utf8")
  649 |   generatorContent,
  650 |   "utf8"
  651 | );
  652 | 
  653 | /*
  654 |  * 重新生成硬管接头卡片数据。
  655 |  */
  656 | const generateResult = spawnSync(
  657 |   process.execPath,
  658 |   [
  659 |     generatorPath,
  665 |   }
  666 | );
  667 | 
  668 | if (generateResult.status !== 0) {
  669 |   throw new Error(
  670 |     "硬管接头数据重新生成失败。"
  671 |   );
  672 | }
  673 | 
  674 | /*
  675 |  * 输出检查报告。
  676 |  */
  677 | const matchedModelCount =
  678 |   Object.keys(sortedImageMap).length;
  679 | 
  680 | const reportLines = [
  681 |   "# 硬管接头图片导入报告",
  682 |   "",
  683 |   `- 图片源目录：${sourceDir}`,
  684 |   `- 网站图片目录：${outputRoot}`,
  685 |   `- 网站硬管接头型号数：${uniqueRecords.length}`,
  686 |   `- 扫描到支持的图片数：${supportedFiles.length}`,
  687 |   `- 成功复制图片数：${copiedFiles.length}`,
  688 |   `- 已匹配型号数：${matchedModelCount}`,
  689 |   `- 未匹配图片数：${unmatchedFiles.length}`,
  690 |   `- 匹配冲突图片数：${ambiguousFiles.length}`,
  763 |   reportLines.join("\n"),
  764 |   "utf8"
  765 | );
  766 | 
  767 | console.log("");
  768 | console.log("===== 硬管接头图片导入完成 =====");
  769 | console.log(`扫描图片：${supportedFiles.length}`);
  770 | console.log(`复制图片：${copiedFiles.length}`);
  771 | console.log(`匹配型号：${matchedModelCount}`);
  772 | console.log(`未匹配图片：${unmatchedFiles.length}`);
  773 | console.log(`匹配冲突：${ambiguousFiles.length}`);
```

## scripts\products\move-valve-cta-up-200px.cjs

```text
   31 |       {/*
   32 |         VALVE_DETAIL_CTA_OFFSET_200PX
   33 | 
   34 |         只作用于阀系列详情页。
   35 |         目的：减少 FAQ 区域下方到蓝色定制 CTA 之间的空白，
   36 |         不改公共 ProductDetailClient 结构，不影响泵系列详情页。
   37 |       */}
   38 |       <style
   39 |         dangerouslySetInnerHTML={{
   40 |           __html: \`
   41 |             [data-valve-detail-page="true"] > main > section:last-of-type,
```

## scripts\products\normalize-pump-series-data-source.js

```text
   73 | 
   74 |   return {
   75 |     ...route,
   76 |     routeSlug,
   77 |     canonicalPath: officialPath,
   78 |     detailHref: officialPath,
   79 |     databasePreviewHref: previewPath,
   80 |     legacyRedirectFrom: text(route.legacyRedirectFrom),
   81 |     trailingSlashPolicy: "no_trailing_slash",
   82 |     routeEnabled: "yes",
   83 |   };
  155 |     cardDescriptionEn: defaults.cardDescriptionEn || "Plunger pumps are custom-engineered products. Final configuration should be confirmed by application.",
  156 |     cardSpecsZh: `容量：${capacity}|泵头材料：${material}|类型：定制柱塞泵`,
  157 |     cardSpecsEn: `Volume: ${capacity}|Pump head: ${material}|Type: Custom plunger pump`,
  158 |     cardBadges: defaults.cardBadges || `Custom|${capacity}|${material}`,
  159 |     cardImage: `/images/products/pumps/plunger-pump/${text(product.seriesCode).toLowerCase()}/${productId}-card.webp`,
  160 |     detailHref: `/products/pumps/${pumpTypeSlug}/${routeSlug}`,
  161 |     databasePreviewHref: `/products/pumps-db/${pumpTypeSlug}/${seriesSlug}/${routeSlug}`,
  162 |     showInSelection: "yes",
  163 |     sort: text(product.sort) || 999,
  164 |   });
  165 | }
```

## scripts\products\optimize-valve-detail-h1-app-cta.cjs

```text
  140 | 
  141 | /*
  142 |   修复 page.tsx：
  143 |   1. H1 优先读取 h1Title / pageTitle
  144 |   2. metadata 优先读取 seoTitle / seoDescription
  145 |   3. 给 ProductDetailClient 传 bottom CTA 字段
  146 | */
  147 | 
  148 | const pagePath = abs("app/products/valves/[slug]/page.tsx");
  149 | 
  150 | if (fs.existsSync(pagePath)) {
```

## scripts\products\patch-faq-accordion.js

```text
    6 | const clientFile = path.join(
    7 |   root,
    8 |   "components",
    9 |   "products",
   10 |   "detail",
   11 |   "ProductDetailClient.tsx"
   12 | );
   13 | 
   14 | const cssFile = path.join(
   15 |   root,
   16 |   "components",
   36 | 
   37 | backup(clientFile);
   38 | backup(cssFile);
   39 | 
   40 | /* =========================================================
   41 |    1. 修改 ProductDetailClient.tsx
   42 |    将 FAQ 从普通列表改为折叠式 Accordion
   43 | ========================================================= */
   44 | 
   45 | let client = fs.readFileSync(clientFile, "utf8");
   46 | 
  111 |               })}`;
  112 | 
  113 | if (oldFaqMapPattern.test(client)) {
  114 |   client = client.replace(oldFaqMapPattern, newFaqMap);
  115 | } else {
  116 |   console.warn("没有自动匹配到旧 FAQ map，请检查 ProductDetailClient.tsx 中 FAQ 区块。");
  117 | }
  118 | 
  119 | fs.writeFileSync(clientFile, client, "utf8");
  120 | 
  121 | /* =========================================================
```

## scripts\products\patch-faq-clean-accordion-style.js

```text
    6 | const clientFile = path.join(
    7 |   root,
    8 |   "components",
    9 |   "products",
   10 |   "detail",
   11 |   "ProductDetailClient.tsx"
   12 | );
   13 | 
   14 | const cssFile = path.join(
   15 |   root,
   16 |   "components",
   38 | 
   39 | const clientBackup = backup(clientFile, "faq-clean-accordion");
   40 | const cssBackup = backup(cssFile, "faq-clean-accordion");
   41 | 
   42 | /* =========================================================
   43 |    1. ProductDetailClient.tsx
   44 |    去掉 FAQ 左侧 01 / 02 编号
   45 | ========================================================= */
   46 | 
   47 | let client = fs.readFileSync(clientFile, "utf8");
   48 | 
```

## scripts\products\patch-faq-spacing-animation.js

```text
    6 | const clientFile = path.join(
    7 |   root,
    8 |   "components",
    9 |   "products",
   10 |   "detail",
   11 |   "ProductDetailClient.tsx"
   12 | );
   13 | 
   14 | const cssFile = path.join(
   15 |   root,
   16 |   "components",
```

## scripts\products\patch-tubing-model-placeholder-only.cjs

```text
    1 | const fs = require("fs");
    2 | const path = require("path");
    3 | 
    4 | const root = process.cwd();
    5 | const file = path.join(root, "components/products/detail/ProductDetailClient.tsx");
    6 | 
    7 | if (!fs.existsSync(file)) {
    8 |   console.error("找不到文件：components/products/detail/ProductDetailClient.tsx");
    9 |   process.exit(1);
   10 | }
   11 | 
   12 | const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
   13 | fs.copyFileSync(file, `${file}.bak_tubing_model_placeholder_${stamp}`);
```

## scripts\products\patch-tubing-selection-make-detail-href.cjs

```text
   17 | const marker = "TUBING_SELECTION_DETAIL_HREF_PATCH_20260707";
   18 | 
   19 | if (text.includes(marker)) {
   20 |   console.log("管路详情链接补丁已存在，不重复添加。");
   21 | } else {
   22 |   const patch = `function makeDetailHref(product: ProductSelectionProduct) {
   23 |   /*
   24 |     ${marker}
   25 | 
   26 |     管路系列详情链接分支。
   27 |     只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
   28 |     其它产品仍走原来的针、阀、泵逻辑。
   29 |   */
   30 |   {
   31 |     const rawHref = String(
   32 |       (product as any).detailHref ||
   33 |         (product as any).productDetailHref ||
   34 |         (product as any).href ||
   35 |         (product as any).url ||
   36 |         (product as any).path ||
   37 |         ""
   38 |     ).trim();
   95 |     }
   96 |   }
   97 | 
   98 | `;
   99 | 
  100 |   if (!text.includes("function makeDetailHref(product: ProductSelectionProduct) {")) {
  101 |     console.error("没有找到 makeDetailHref 函数，请把 ProductSelectionClient.tsx 发我。");
  102 |     process.exit(1);
  103 |   }
  104 | 
  105 |   text = text.replace(
  106 |     "function makeDetailHref(product: ProductSelectionProduct) {",
  107 |     patch
  108 |   );
  109 | 
  110 |   fs.writeFileSync(file, text, "utf8");
  111 |   console.log("已加入管路筛选页详情链接分支。");
```

## scripts\products\remove-zh-faq-label.js

```text
    4 | const file = path.join(
    5 |   process.cwd(),
    6 |   "components",
    7 |   "products",
    8 |   "detail",
    9 |   "ProductDetailClient.tsx"
   10 | );
   11 | 
   12 | if (!fs.existsSync(file)) {
   13 |   console.error("找不到文件：", file);
   14 |   process.exit(1);
```

## scripts\products\repair-valve-current-errors.cjs

```text
  220 |       filter03: "0.7MPa",
  221 |       filter04: "定制配置",
  222 |     },
  223 | 
  224 |     href: "/products/valves/rotary-valves",
  225 |     detailHref: "/products/valves/rotary-valves",
  226 |     selectionHref: "/products",
  227 |     sourceType: "valve-selection",
  228 |   },
  229 | 
  230 |   {
  291 |       filter03: "25MPa",
  292 |       filter04: "定制配置",
  293 |     },
  294 | 
  295 |     href: "/products/valves/high-pressure-valves",
  296 |     detailHref: "/products/valves/high-pressure-valves",
  297 |     selectionHref: "/products",
  298 |     sourceType: "valve-selection",
  299 |   },
  300 | 
  301 |   {
  362 |       filter03: "-75kPa~0.25MPa",
  363 |       filter04: "定制配置",
  364 |     },
  365 | 
  366 |     href: "/products/valves/solenoid-valves",
  367 |     detailHref: "/products/valves/solenoid-valves",
  368 |     selectionHref: "/products",
  369 |     sourceType: "valve-selection",
  370 |   },
  371 | ] as const;
  372 | 
```

## scripts\products\restore-valve-detail-to-rpl-style.cjs

```text
   33 | 
   34 | /* =========================================================
   35 |    1. 阀系列详情数据
   36 |    说明：
   37 |    这里不做新页面设计，只提供数据。
   38 |    page.tsx 会把这些数据适配成 ProductDetailClient 需要的结构。
   39 | ========================================================= */
   40 | 
   41 | const valveDetailData = [
   42 |   {
   43 |     slug: "rotary-valves",
  184 |   "data/products/generated/valves/detail/index.json",
  185 |   JSON.stringify(valveDetailData, null, 2) + "\n"
  186 | );
  187 | 
  188 | /* =========================================================
  189 |    2. 阀系列详情页：恢复为 RPL 同款 ProductDetailClient
  190 |    说明：
  191 |    不再使用单独设计的 CSS Module 页面。
  192 |    这里沿用公共产品详情页组件。
  193 | ========================================================= */
  194 | 
  195 | const pageTsx = String.raw`import type { ComponentType } from "react";
  196 | 
  197 | import { notFound } from "next/navigation";
  198 | 
  199 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
  200 | import valveDetailData from "@/data/products/generated/valves/detail/index.json";
  201 | 
  202 | type ValveDetailRecord = {
  203 |   slug: string;
  204 |   productTypeId: string;
  220 | };
  221 | 
  222 | const details = valveDetailData as ValveDetailRecord[];
  223 | 
  224 | /*
  225 |   ProductDetailClient 是官网已有公共详情页组件。
  226 |   阀系列详情页不重新设计页面，只把数据适配成该组件需要的结构。
  227 | */
  228 | const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  229 |   data: any;
  230 | }>;
  231 | 
  232 | export const dynamicParams = false;
  233 | 
  248 | function getDetailBySlug(slug: string) {
  249 |   return details.find((item) => item.slug === slug);
  250 | }
  251 | 
  252 | /*
  253 |   将阀系列数据转换为 ProductDetailClient 可以识别的数据。
  254 |   这里参考 RPL 无阀泵定制品写法：
  255 |   - 型号显示为“定制配置请联系我们”
  256 |   - 不显示标准型号选择
  257 |   - 保留添加图纸 / 加入清单逻辑
  258 |   - 传 additionalImages / images / thumbnails 空数组，避免轮播读取报错
  334 |     datasheetUrl: "",
  335 | 
  336 |     /*
  337 |       公共详情页图片字段。
  338 |       additionalImages / images / thumbnails 必须给空数组，
  339 |       避免 ProductDetailClient 读取 forEach / map 时报错。
  340 |     */
  341 |     image,
  342 |     imagePath: image,
  343 |     imageUrl: image,
  344 |     mainImage: image,
  350 |     additionalImages: [],
  351 |     images: [],
  352 |     thumbnails: [],
  353 | 
  354 |     selectionHref: "/products",
  355 |     detailHref: "/products/valves/" + detail.slug,
  356 | 
  357 |     sourceType: "valve-detail",
  358 |   };
  359 | }
  360 | 
  389 | writeFileWithBackup("app/products/valves/[slug]/page.tsx", pageTsx);
  390 | 
  391 | /* =========================================================
  392 |    3. 移除刚才新设计页面用的 CSS 文件
  393 |    说明：
  394 |    详情页样式回到 ProductDetailClient 自带样式。
  395 | ========================================================= */
  396 | 
  397 | const oldCssFiles = [
  398 |   "app/products/valves/[slug]/valve-detail.css",
  399 |   "app/products/valves/[slug]/valve-detail.module.css"
  409 |     console.log("已移除旧设计 CSS，并备份：" + path.relative(root, backupPath));
  410 |   }
  411 | }
  412 | 
  413 | console.log("");
  414 | console.log("阀系列详情页已恢复为 RPL 同款 ProductDetailClient 结构。");
  415 | console.log("请测试：");
  416 | console.log("/products/valves/rotary-valves");
  417 | console.log("/products/valves/high-pressure-valves");
  418 | console.log("/products/valves/solenoid-valves");
```

## scripts\products\rewrite-valve-detail-seo-copy.cjs

```text
  226 | fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");
  227 | console.log("已优化阀系列详情页文案，规格表 specs 未改。");
  228 | 
  229 | /*
  230 |   让 generateMetadata 优先读取 seoTitle / seoDescription。
  231 |   不改页面布局，不改 ProductDetailClient。
  232 | */
  233 | 
  234 | const pagePath = abs("app/products/valves/[slug]/page.tsx");
  235 | 
  236 | if (fs.existsSync(pagePath)) {
```

## scripts\products\rewrite-valve-selection-by-type.cjs

```text
  138 |       filter03: "0.7MPa",
  139 |       filter04: "定制配置",
  140 |     },
  141 | 
  142 |     href: "/products/valves/rotary-valves",
  143 |     detailHref: "/products/valves/rotary-valves",
  144 |     selectionHref: "/products",
  145 |     sourceType: "valve-selection",
  146 |   },
  147 | 
  148 |   {
  208 |       filter03: "25MPa",
  209 |       filter04: "定制配置",
  210 |     },
  211 | 
  212 |     href: "/products/valves/high-pressure-valves",
  213 |     detailHref: "/products/valves/high-pressure-valves",
  214 |     selectionHref: "/products",
  215 |     sourceType: "valve-selection",
  216 |   },
  217 | 
  218 |   {
  279 |       filter03: "-75kPa～0.25MPa",
  280 |       filter04: "定制配置",
  281 |     },
  282 | 
  283 |     href: "/products/valves/solenoid-valves",
  284 |     detailHref: "/products/valves/solenoid-valves",
  285 |     selectionHref: "/products",
  286 |     sourceType: "valve-selection",
  287 |   },
  288 | ] as const;
  289 | 
```

## scripts\products\setup-barbed-fitting-selection-step1.cjs

```text
  486 |           "/images/logo/foreach-logo-color.svg",
  487 | 
  488 |         detailSlug:
  489 |           "barbed-fittings",
  490 | 
  491 |         detailHref:
  492 |           "/products/fittings/barbed-fittings",
  493 | 
  494 |         status:
  495 |           "active",
  496 | 
  713 |     !content.includes(
  714 |       "barbed-fitting-selection.generated"
  715 |     )
  716 |   ) {
  717 |     const anchor =
  718 |       '} from "@/data/products/selection/hard-tube-fitting-selection.generated";';
  719 | 
  720 |     content = replaceOnce(
  721 |       content,
  722 |       anchor,
  723 |       `${anchor}
 1203 | 
 1204 | `;
 1205 | 
 1206 |   const oldStart =
 1207 |     content.indexOf(
 1208 |       '    "soft-tube-fittings": {'
 1209 |     );
 1210 | 
 1211 |   const nextStart =
 1212 |     content.indexOf(
 1213 |       '    "luer-fittings": {',
```

## scripts\products\split-drpl-detail-pages.js

```text
  118 |   item.model3dUrl = item.model3dUrl || modelBase;
  119 |   item.drawing2dUrl = item.drawing2dUrl || drawingBase;
  120 |   item.drawingPdfUrl = item.drawingPdfUrl || drawingBase;
  121 | 
  122 |   item.selectionHref = "/products/pumps/valveless-pumps";
  123 |   item.detailHref = `/products/pumps/valveless-pumps/${config.slug}`;
  124 |   item.href = item.detailHref;
  125 | 
  126 |   item.imageAlt = `FOREACH ${config.shortCode} ${config.ratio} dual-head valveless pump`;
  127 |   item.imageAltEn = item.imageAlt;
  128 |   item.mainImageAlt = item.imageAlt;
  129 | 
  444 |   console.log("规格字段全部匹配。");
  445 | }
  446 | 
  447 | console.log("\\n===== 4. 当前无阀泵详情页列表 =====");
  448 | for (const item of details.filter((x) => expected[x.slug])) {
  449 |   console.log(\`\${item.slug} | \${item.title} | \${item.detailHref}\`);
  450 | }
  451 | 
  452 | console.log("\\n===== 检查完成：本脚本没有修改任何文件 =====");
  453 | `;
  454 | 
```

## scripts\products\unify-product-selection-product-types.cjs

```text
   44 |   routeSlug?: string;
   45 |   reservedConfigSlug?: string;
   46 |   slug?: string;
   47 | 
   48 |   href?: string;
   49 |   detailHref?: string;
   50 |   productDetailHref?: string;
   51 |   selectionHref?: string;
   52 | 
   53 |   model?: string;
   54 |   title?: string;
   55 |   name?: string;
```

## scripts\products\update-probe-custom-confirm-items.cjs

```text
  230 | }
  231 | 
  232 | /*
  233 |   2.3 给针系列详情页加前台文字替换脚本。
  234 |   目的：
  235 |   ProductDetailClient 是公共组件，Tab 默认叫“规格”。
  236 |   针系列不是标准规格页，因此在针详情页里把“规格”改成“定制确认项”。
  237 | */
  238 | if (!pageText.includes("PROBE_DETAIL_CUSTOM_CONFIRM_TAB_20260709")) {
  239 |   const oldReturn = "return <ProductDetailView data={toClientData(detail)} />;";
  240 | 
  242 |     <div data-probe-detail-page="true">
  243 |       {/*
  244 |         PROBE_DETAIL_CUSTOM_CONFIRM_TAB_20260709
  245 | 
  246 |         针系列为来图定制产品。
  247 |         公共 ProductDetailClient 默认 Tab 文案为“规格”，
  248 |         这里仅在针系列详情页中将其替换为“定制确认项”。
  249 |       */}
  250 |       <script
  251 |         dangerouslySetInnerHTML={{
  252 |           __html: \`
```

## scripts\products\write-valve-faq-and-cta.cjs

```text
  197 |   pageText = pageText.replace(
  198 |     /sourceType:\s*"valve-detail",/,
  199 |     `/*
  200 |       VALVE_FAQ_CTA_PASSTHROUGH_20260708
  201 | 
  202 |       阀系列详情页使用公共 ProductDetailClient。
  203 |       为避免公共组件回退到柱塞泵 FAQ / CTA，
  204 |       这里同时传入 faq / faqs / faqItems / bottomCta / customInquiryCta 等字段。
  205 |     */
  206 |     faqs: Array.isArray(detail.faq)
  207 |       ? detail.faq.map((item) => ({
```
