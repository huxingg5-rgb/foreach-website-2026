# 柱塞泵错误跳转到 probes 最终检查报告

生成时间：2026-07-07 21:18:40

本次只检查，不修改业务文件。

当前错误：
/products/probes/ea-100-pmma

正确路径应为：
/products/pumps/plunger-pumps/ea-100-pmma


## 1. 关键文件是否存在与修改时间

存在：components\products\selection\ProductSelectionClient.tsx | 修改时间：2026-07-07 21:12:07
存在：components\products\selection\ProductCardGrid.tsx | 修改时间：2026-07-06 16:37:43
存在：components\products\selection\ProductSelectionCard.tsx | 修改时间：2026-07-07 21:14:25
存在：data\products\generated\pumps\pump-series.selection.generated.ts | 修改时间：2026-07-04 18:45:45
存在：data\products\selection\probe-selection.generated.ts | 修改时间：2026-07-07 19:29:41
缺失：app\products\probes\[slug]\page.tsx
缺失：app\products\pumps\plunger-pumps\[slug]\page.tsx

## 2. ProductSelectionCard 最终 a 标签是否还用 detailHref


--- components\products\selection\ProductSelectionCard.tsx line 56 ---

  return "";
}


/*
  FINAL_CARD_HREF_GUARD_20260707

  卡片最终 href 出口保护：
  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
*/
function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {

--- components\products\selection\ProductSelectionCard.tsx line 62 ---
  FINAL_CARD_HREF_GUARD_20260707

  卡片最终 href 出口保护：
  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
*/
function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)
    .pop()

--- components\products\selection\ProductSelectionCard.tsx line 112 ---
  addToListText,
  addedToListText,
  onToggleList,
}: ProductSelectionCardProps) {
  const safeTitle = toDisplayText(title) || product.productId;
  const safeSubtitle = toDisplayText(subtitle);
  const safeDetailHref = normalizeCardDetailHref(product, detailHref);
  const cardSpecs = getProductCardSpecs(product)
    .map((spec) => toDisplayText(spec))
    .filter(Boolean);

  return (
    <article className="product-card" title={safeTitle}>

--- components\products\selection\ProductSelectionCard.tsx line 143 ---
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{safeSubtitle}</p>
        ) : null}

        <div className="product-actions">
          <a className="product-link" href={safeDetailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"

## 3. ProductCardGrid 给卡片传入的 detailHref


--- components\products\selection\ProductCardGrid.tsx line 3 ---
"use client";

import ProductSelectionCard from "./ProductSelectionCard";
import type { ProductSelectionProductItem } from "./product-selection-ui.types";

type ProductCardGridProps = {
  products: ProductSelectionProductItem[];
  selectedList: ReadonlySet<string>;
  detailButtonText: string;

--- components\products\selection\ProductCardGrid.tsx line 14 ---
  selectedList: ReadonlySet<string>;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  getTitle: (product: ProductSelectionProductItem) => string;
  getSubtitle: (product: ProductSelectionProductItem) => string;
  getDetailHref: (product: ProductSelectionProductItem) => string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

export default function ProductCardGrid({
  products,
  selectedList,

--- components\products\selection\ProductCardGrid.tsx line 26 ---
  selectedList,
  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,
  onToggleList,
}: ProductCardGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);

--- components\products\selection\ProductCardGrid.tsx line 36 ---
    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);
        const subtitle = getSubtitle(product);

        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}

--- components\products\selection\ProductCardGrid.tsx line 40 ---

        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}
            addToListText={addToListText}
            addedToListText={addedToListText}
            key={product.productId}
            onToggleList={onToggleList}

## 4. ProductSelectionClient 的详情链接出口


--- components\products\selection\ProductSelectionClient.tsx line 586 ---
  return normalizePlungerModelSlug(product.cardTitle?.en || product.cardTitle?.zh || product.productId || product.detailSlug);
}

/* ===== FOREACH plunger pump model detail href helpers END ===== */



/*
  FORCE_FIX_PLUNGER_WRONG_PROBE_HREF_20260707

  最终详情链接出口保护：
  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
*/
function normalizeFinalProductDetailHref(
  product: ProductSelectionProduct,
  href: string

--- components\products\selection\ProductSelectionClient.tsx line 592 ---

/*
  FORCE_FIX_PLUNGER_WRONG_PROBE_HREF_20260707

  最终详情链接出口保护：
  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
*/
function normalizeFinalProductDetailHref(
  product: ProductSelectionProduct,
  href: string
): string {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)

--- components\products\selection\ProductSelectionClient.tsx line 632 ---
  ) {
    return `/products/pumps/plunger-pumps/${hrefSlug}`;
  }

  return rawHref;
}


function makeDetailHref(product: ProductSelectionProduct) {
  /*
    PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707

    柱塞泵详情链接优先处理。
    防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
  */
  {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 634 ---
  }

  return rawHref;
}


function makeDetailHref(product: ProductSelectionProduct) {
  /*
    PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707

    柱塞泵详情链接优先处理。
    防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||

--- components\products\selection\ProductSelectionClient.tsx line 1916 ---
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={(product) => normalizeFinalProductDetailHref(product, makeDetailHref(product))}
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}
                    previousText={pageText.previousPage}
                    nextText={pageText.nextPage}

## 5. ProductSelectionClient 里是否仍有错误的 pumps 判断进入 probes 分支


--- components\products\selection\ProductSelectionClient.tsx line 589 ---
/* ===== FOREACH plunger pump model detail href helpers END ===== */



/*
  FORCE_FIX_PLUNGER_WRONG_PROBE_HREF_20260707

  最终详情链接出口保护：
  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
*/
function normalizeFinalProductDetailHref(
  product: ProductSelectionProduct,
  href: string
): string {
  const rawHref = String(href || "").trim();


--- components\products\selection\ProductSelectionClient.tsx line 621 ---
    .pop()
    ?.toLowerCase();

  if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
    return `/products/pumps/plunger-pumps/${rawSlug}`;
  }

  if (
    rawHref.includes("/products/probes/") &&
    hrefSlug &&
    /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(hrefSlug)
  ) {
    return `/products/pumps/plunger-pumps/${hrefSlug}`;
  }

  return rawHref;
}

--- components\products\selection\ProductSelectionClient.tsx line 637 ---
}


function makeDetailHref(product: ProductSelectionProduct) {
  /*
    PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707

    柱塞泵详情链接优先处理。
    防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        ""
    ).trim();

--- components\products\selection\ProductSelectionClient.tsx line 800 ---
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";
    }
  }


  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||

--- components\products\selection\ProductSelectionClient.tsx line 803 ---
    }
  }


  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"
  ) {

--- components\products\selection\ProductSelectionClient.tsx line 804 ---
  }


  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(

--- components\products\selection\ProductSelectionClient.tsx line 841 ---
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260709


--- components\products\selection\ProductSelectionClient.tsx line 848 ---
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260709

    针系列在产品中心中使用中文 productTypeId 显示筛选项，
    详情路由不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||

--- components\products\selection\ProductSelectionClient.tsx line 888 ---
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260708


--- components\products\selection\ProductSelectionClient.tsx line 895 ---
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260708

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||

--- components\products\selection\ProductSelectionClient.tsx line 899 ---
    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260708

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(
      (product as any).detailHref ||

--- components\products\selection\ProductSelectionClient.tsx line 935 ---
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    VALVE_DETAIL_HREF_PATCH_20260707


--- components\products\selection\ProductSelectionClient.tsx line 1001 ---
    return (
      product.detailHref ||
      product.href ||
      `/products/valves/${product.productTypeId}`
    );
  }

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {
    const rawSlug =

--- components\products\selection\ProductSelectionClient.tsx line 1005 ---
    );
  }

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);

  if (isValvelessPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

--- components\products\selection\ProductSelectionClient.tsx line 1042 ---
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

--- components\products\selection\ProductSelectionClient.tsx line 1061 ---
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);

  if (isPipettingPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

--- components\products\selection\ProductSelectionClient.tsx line 1085 ---
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }




  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";

## 6. 全项目搜索 ea-100-pmma 与 probes 错误来源

F:\WebsiteProjects\foreach-website-2026\app\products\probes\[slug]\page.tsx:183  detailHref: "/products/probes/" + detail.slug,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:27  "ea-standard-piston-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:28  "ea-standard-plunger-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:14  - 主型号 EA-100-PMMA
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx:59  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx:88  rawHref.includes("/products/probes/") &&
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:589  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:621  rawHref.includes("/products/probes/") &&
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:637  防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:803  详情页路由使用 /products/probes/[slug]。
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:804  避免生成 /products/probes/undefined。
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:841  return `/products/probes/${probeSlug}`;
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:888  return `/products/probes/${probeSlug}`;
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:899  避免生成 /products/probes/undefined。
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:935  return `/products/probes/${probeSlug}`;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:37  "slug":  "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:38  "model":  "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:408  "ea-100-pmma":  [
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:411  "value":  "ea-100-pmma"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts:415  "value":  "EA-100-PMMA"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:19  "model": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:20  "slug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:21  "title": "EA-100-PMMA 常规柱塞泵",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.summary.json:13  "model": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail-faq.zh.ts:19  * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.zh.ts:18  model: "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-specs.zh.generated.ts:5  当前为 EA-100-PMMA 测试数据。
F:\WebsiteProjects\foreach-website-2026\data\products\generated\probes\detail\index.json:12  "image": "/images/products/probes/sampling-probes/sampling-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\probes\detail\index.json:202  "image": "/images/products/probes/piercing-probes/piercing-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\probes\detail\index.json:392  "image": "/images/products/probes/wash-probes/wash-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\probes\detail\index.json:582  "image": "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16  "routeSlug": "ea-100-pmma",
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
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:14  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:16  "routeSlug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:19  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts:20  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:14  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:17  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:23  "title": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:29  "title": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:37  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:40  "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:47  "subtitle": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts:53  "subtitle": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.summary.json:28  "productId": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.summary.json:31  "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts:27  "EA-100-PMMA": [
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:53  image: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:54  imagePath: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:55  imageUrl: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:85  href: "/products/probes/sampling-probes",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:86  detailHref: "/products/probes/sampling-probes",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:125  image: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:126  imagePath: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:127  imageUrl: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:157  href: "/products/probes/piercing-probes",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:158  detailHref: "/products/probes/piercing-probes",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:197  image: "/images/products/probes/wash-probes/wash-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:198  imagePath: "/images/products/probes/wash-probes/wash-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:199  imageUrl: "/images/products/probes/wash-probes/wash-probes-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:229  href: "/products/probes/wash-probes",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:230  detailHref: "/products/probes/wash-probes",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:269  image: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:270  imagePath: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:271  imageUrl: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:301  href: "/products/probes/stirring-paddles",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\probe-selection.generated.ts:302  detailHref: "/products/probes/stirring-paddles",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:26  "zh": "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:27  "en": "EA-100-PMMA"
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts:39  "detailSlug": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts:2  "EA-100-PMMA": "FOREACH EA-100-PMMA 100 碌L standard piston pump with PMMA pump head for low-volume reagent dispensing and small-volume sample handling in IVD analyzers",
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.types.ts:26  /** 页面型号，例如 EA-100-PMMA */
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
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:199  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:321  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:322  descriptionZh: "EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:359  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:362  cardTitleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:371  cardImage: "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:372  detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\apply-plunger-pump-formal-copy.js:373  databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\audit-pump-series-data.js:51  md += "1. 中文 H1 是否保持型号式标题，例如：EA-100-PMMA 柱塞泵。\n";
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:114  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:115  slug: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:116  routeSlug: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:121  internalModelRef: "EA-100-PMMA",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:164  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:165  routeSlug: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:166  canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:167  detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:168  legacyRedirectFrom: "/products/pumps/plunger-pumps/ea-100-pmma/",
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
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:348  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:359  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:370  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:381  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:392  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:404  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:416  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:428  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:445  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:448  cardTitleZh: "EA-100-PMMA 柱塞泵",
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
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:613  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\create-pump-series-xlsx-template.js:621  productId: "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:216  "ea-standard-piston-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-plunger-detail-link-final.js:217  "ea-standard-plunger-pumps": "ea-100-pmma",
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:10  /images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
F:\WebsiteProjects\foreach-website-2026\scripts\products\fix-pump-series-selection-card-assets.js:72  * /images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:97  "ea-100-pmma": {
F:\WebsiteProjects\foreach-website-2026\scripts\products\normalize-pump-series-data-source.js:98  cardTitleZh: "EA-100-PMMA 柱塞泵",
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-detail-slug.js:11  详情页真实路由是 ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-detail-slug.js:54  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:10  1. 将产品中心卡片标题从 EA · 100 μL · PMMA 改为 EA-100-PMMA
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-ea-selection-title-to-model.js:11  2. 将 detailSlug 统一为 ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\scripts\products\patch-product-detail-tab-font-24.js:29  将详情页 Tab 文字调整到接近“型号：EA-100-PMMA”的大小
F:\WebsiteProjects\foreach-website-2026\scripts\products\reset-product-detail-tab-clean.js:70  - 字号接近“型号：EA-100-PMMA”
F:\WebsiteProjects\foreach-website-2026\scripts\products\search-ea-full-models-in-xlsx.js:11  2. 查找 EA-100-PMMA-UF-N 这类完整工程型号
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:17  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:19  2. 当前不再生成旧测试路由 ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:45  ea-100-pmma
F:\WebsiteProjects\foreach-website-2026\services\products\detail\getProductDetailPageData.ts:48  ea-100-pmma

## 7. pump-series.selection.generated.ts 里 EA-100-PMMA 数据上下文


--- data\products\generated\pumps\pump-series.selection.generated.ts line 14 ---
   3. 如需修改内容，请修改 xlsx 数据源后重新运行：
      npm run build:pump-series-data
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

export const pumpSeriesSelectionCards = [
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
    "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
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
        "title": "EA-100-PMMA",
        "subtitle": "100 μL PMMA 常规柱塞泵",
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
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",
        "specs": []
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
    "content": {
      "zh": {
        "title": "100 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 47 ---
    "cardImage": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
    "badges": [],
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
        "subtitle": "EA-100-PMMA",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",
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

--- data\products\generated\pumps\pump-series.selection.generated.ts line 63 ---
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
    "content": {
      "zh": {
        "title": "EA-100-PEEK",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 86 ---
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
    "content": {
      "zh": {
        "title": "100 µL PEEK Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 109 ---
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
    "content": {
      "zh": {
        "title": "EA-250-PMMA",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 132 ---
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
    "content": {
      "zh": {
        "title": "250 µL PMMA Pump Head Standard Plunger Pump",

--- data\products\generated\pumps\pump-series.selection.generated.ts line 155 ---
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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
    }
  },
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

## 8. probe-selection.generated.ts 是否误含 EA-100-PMMA


--- data\products\selection\probe-selection.generated.ts line 85 ---
      filter03: "内壁抛光",
      filter04: "来图定制",
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data\products\selection\probe-selection.generated.ts line 86 ---
      filter04: "来图定制",
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },


--- data\products\selection\probe-selection.generated.ts line 87 ---
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {

--- data\products\selection\probe-selection.generated.ts line 157 ---
      filter03: "排气结构",
      filter04: "来图定制",
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data\products\selection\probe-selection.generated.ts line 158 ---
      filter04: "来图定制",
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },


--- data\products\selection\probe-selection.generated.ts line 159 ---
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {

--- data\products\selection\probe-selection.generated.ts line 229 ---
      filter03: "侧孔加工",
      filter04: "来图定制",
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data\products\selection\probe-selection.generated.ts line 230 ---
      filter04: "来图定制",
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },


--- data\products\selection\probe-selection.generated.ts line 231 ---
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {

--- data\products\selection\probe-selection.generated.ts line 301 ---
      filter03: "涂层处理",
      filter04: "来图定制",
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data\products\selection\probe-selection.generated.ts line 302 ---
      filter04: "来图定制",
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },
] as const;

--- data\products\selection\probe-selection.generated.ts line 303 ---
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },
] as const;


## 9. probes 动态路由 generateStaticParams 当前允许的 slug

缺失：app\products\probes\[slug]\page.tsx

## 10. 当前页面 HTML 中是否已经包含错误链接

无法请求 http://localhost:3000/products/，可能 dev 服务未启动或页面仍在报错。
无法连接到远程服务器

## 11. .next 编译缓存里是否仍有错误链接

.next 中未发现 /products/probes/ea-100-pmma。

## 12. Git 状态

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
?? audit-plunger-wrong-probe-route-final.md
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
?? components/products/selection/ProductSelectionCard.tsx.bak_final_card_href_guard_20260707131425
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
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_plunger_wrong_probe_route_20260707131054
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_probe_filter_client_20260707_192436
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_product_selection_type_20260706_162332
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_return_intro_20260706_152558
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_valve_href_20260707_171257
?? components/products/selection/ProductSelectionClient.tsx.bak_force_diaphragm_pool_20260706_211545
?? components/products/selection/ProductSelectionClient.tsx.bak_force_fix_plunger_probe_href_20260707131207
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
?? scripts/products/final-guard-product-card-href.cjs
?? scripts/products/fix-hp-description-copy.cjs
?? scripts/products/fix-hp-solenoid-detail-copy-and-specs.cjs
?? scripts/products/fix-mrv3-detail-copy-and-specs.cjs
?? scripts/products/fix-plunger-card-subtitle-mojibake.cjs
?? scripts/products/fix-plunger-wrong-probe-route.cjs
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
?? scripts/products/force-fix-plunger-wrong-probe-href.cjs
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
