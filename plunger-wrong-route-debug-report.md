# 柱塞泵错误跳转到 probes 自动检查报告

生成时间：2026/7/7 21:24:42

项目目录：F:\WebsiteProjects\foreach-website-2026


本报告只检查，不修改业务文件。


## 1. 当前关键文件是否存在

- 存在：components/products/selection/ProductSelectionClient.tsx | 修改时间：2026/7/7 21:12:07
- 存在：components/products/selection/ProductCardGrid.tsx | 修改时间：2026/7/6 16:37:43
- 存在：components/products/selection/ProductSelectionCard.tsx | 修改时间：2026/7/7 21:14:25
- 存在：data/products/generated/pumps/pump-series.selection.generated.ts | 修改时间：2026/7/4 18:45:45
- 存在：data/products/selection/probe-selection.generated.ts | 修改时间：2026/7/7 19:29:41
- 存在：app/products/probes/[slug]/page.tsx | 修改时间：2026/7/7 19:40:37
- 存在：app/products/pumps/plunger-pumps/[slug]/page.tsx | 修改时间：2026/7/4 09:24:23

## 2. ProductSelectionCard 最终按钮 href 代码

```tsx
--- components/products/selection/ProductSelectionCard.tsx line 56 | pattern: /FINAL_CARD_HREF_GUARD_20260707/g ---

  return "";
}


/*
  FINAL_CARD_HREF_GUARD_20260707

  卡片最终 href 出口保护：
  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  在最终 <a> 前强制改回 /products/pumps/plunger-pumps/[slug]。
*/
function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {

--- components/products/selection/ProductSelectionCard.tsx line 62 | pattern: /function normalizeCardDetailHref/g ---
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

--- components/products/selection/ProductSelectionCard.tsx line 112 | pattern: /const safeDetailHref = normalizeCardDetailHref/g ---
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

--- components/products/selection/ProductSelectionCard.tsx line 143 | pattern: /href=\{safeDetailHref\}/g ---
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

--- components/products/selection/ProductSelectionCard.tsx line 143 | pattern: /className="product-link"/g ---
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
```


## 3. ProductSelectionClient 详情链接出口代码

```tsx
--- components/products/selection/ProductSelectionClient.tsx line 592 | pattern: /function normalizeFinalProductDetailHref/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 632 | pattern: /function makeDetailHref/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 1916 | pattern: /getDetailHref=\{\(product\) => normalizeFinalProductDetailHref\(product, makeDetailHref\(product\)\)\}/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 800 | pattern: /PROBE_DETAIL_HREF_PATCH/g ---

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

--- components/products/selection/ProductSelectionClient.tsx line 848 | pattern: /PROBE_DETAIL_HREF_PATCH/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 895 | pattern: /PROBE_DETAIL_HREF_PATCH/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 841 | pattern: /return `\/products\/probes\/\$\{probeSlug\}`;/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 888 | pattern: /return `\/products\/probes\/\$\{probeSlug\}`;/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 935 | pattern: /return `\/products\/probes\/\$\{probeSlug\}`;/g ---
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

--- components/products/selection/ProductSelectionClient.tsx line 1084 | pattern: /const isPlungerPump/g ---
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }




  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug

--- components/products/selection/ProductSelectionClient.tsx line 1091 | pattern: /return slug\s*\?\s*`\/products\/pumps\/plunger-pumps\/\$\{slug\}`/g ---
  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;
}
```


## 4. 全项目搜索错误链接与 probes 链接来源

```txt
app/products/probes/[slug]/page.tsx:183  detailHref: "/products/probes/" + detail.slug,
components/products/selection/ProductSelectionCard.tsx:59  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
components/products/selection/ProductSelectionCard.tsx:88  rawHref.includes("/products/probes/") &&
components/products/selection/ProductSelectionClient.tsx:841  return `/products/probes/${probeSlug}`;
components/products/selection/ProductSelectionClient.tsx:888  return `/products/probes/${probeSlug}`;
components/products/selection/ProductSelectionClient.tsx:935  return `/products/probes/${probeSlug}`;
components/products/selection/ProductSelectionClient.tsx:589  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
components/products/selection/ProductSelectionClient.tsx:621  rawHref.includes("/products/probes/") &&
components/products/selection/ProductSelectionClient.tsx:637  防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
components/products/selection/ProductSelectionClient.tsx:803  详情页路由使用 /products/probes/[slug]。
components/products/selection/ProductSelectionClient.tsx:804  避免生成 /products/probes/undefined。
components/products/selection/ProductSelectionClient.tsx:841  return `/products/probes/${probeSlug}`;
components/products/selection/ProductSelectionClient.tsx:888  return `/products/probes/${probeSlug}`;
components/products/selection/ProductSelectionClient.tsx:899  避免生成 /products/probes/undefined。
components/products/selection/ProductSelectionClient.tsx:935  return `/products/probes/${probeSlug}`;
data/products/generated/probes/detail/index.json:12  "image": "/images/products/probes/sampling-probes/sampling-probes-main.webp",
data/products/generated/probes/detail/index.json:202  "image": "/images/products/probes/piercing-probes/piercing-probes-main.webp",
data/products/generated/probes/detail/index.json:392  "image": "/images/products/probes/wash-probes/wash-probes-main.webp",
data/products/generated/probes/detail/index.json:582  "image": "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
data/products/selection/probe-selection.generated.ts:53  image: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
data/products/selection/probe-selection.generated.ts:54  imagePath: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
data/products/selection/probe-selection.generated.ts:55  imageUrl: "/images/products/probes/sampling-probes/sampling-probes-main.webp",
data/products/selection/probe-selection.generated.ts:85  href: "/products/probes/sampling-probes",
data/products/selection/probe-selection.generated.ts:86  detailHref: "/products/probes/sampling-probes",
data/products/selection/probe-selection.generated.ts:125  image: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
data/products/selection/probe-selection.generated.ts:126  imagePath: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
data/products/selection/probe-selection.generated.ts:127  imageUrl: "/images/products/probes/piercing-probes/piercing-probes-main.webp",
data/products/selection/probe-selection.generated.ts:157  href: "/products/probes/piercing-probes",
data/products/selection/probe-selection.generated.ts:158  detailHref: "/products/probes/piercing-probes",
data/products/selection/probe-selection.generated.ts:197  image: "/images/products/probes/wash-probes/wash-probes-main.webp",
data/products/selection/probe-selection.generated.ts:198  imagePath: "/images/products/probes/wash-probes/wash-probes-main.webp",
data/products/selection/probe-selection.generated.ts:199  imageUrl: "/images/products/probes/wash-probes/wash-probes-main.webp",
data/products/selection/probe-selection.generated.ts:229  href: "/products/probes/wash-probes",
data/products/selection/probe-selection.generated.ts:230  detailHref: "/products/probes/wash-probes",
data/products/selection/probe-selection.generated.ts:269  image: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
data/products/selection/probe-selection.generated.ts:270  imagePath: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
data/products/selection/probe-selection.generated.ts:271  imageUrl: "/images/products/probes/stirring-paddles/stirring-paddles-main.webp",
data/products/selection/probe-selection.generated.ts:301  href: "/products/probes/stirring-paddles",
data/products/selection/probe-selection.generated.ts:302  detailHref: "/products/probes/stirring-paddles",
```


## 5. EA-100-PMMA 在柱塞泵生成数据中的上下文

```ts
--- data/products/generated/pumps/pump-series.selection.generated.ts line 14 | pattern: /"productId": "ea-100-pmma"/g ---
   1. 本文件由 scripts/products/build-pump-series-data.js 自动生成
   2. 不要手动修改本文件
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
    "content": {
      "zh": {

--- data/products/generated/pumps/pump-series.selection.generated.ts line 37 | pattern: /"productId": "ea-100-pmma"/g ---
        "title": "EA-100-PMMA",
        "subtitle": "100 μL PMMA 常规柱塞泵",
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
    "content": {
      "zh": {

--- data/products/generated/pumps/pump-series.selection.generated.ts line 17 | pattern: /"detailHref": "\/products\/pumps\/plunger-pumps\/ea-100-pmma"/g ---
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
    "content": {
      "zh": {
        "title": "EA-100-PMMA",
        "subtitle": "100 μL PMMA 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",

--- data/products/generated/pumps/pump-series.selection.generated.ts line 40 | pattern: /"detailHref": "\/products\/pumps\/plunger-pumps\/ea-100-pmma"/g ---
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
    "content": {
      "zh": {
        "title": "100 µL PMMA Pump Head Standard Plunger Pump",
        "subtitle": "EA-100-PMMA",
        "description": "Custom-engineered plunger pump model for preliminary selection and quotation reference.",

--- data/products/generated/pumps/pump-series.selection.generated.ts line 23 | pattern: /"title": "EA-100-PMMA"/g ---
    "pumpTypeSlug": "",
    "seriesSlug": "ea-standard-piston-pumps",
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
        "subtitle": "100 μL PMMA 常规柱塞泵",
        "description": "页面型号用于初步选型和报价识别，最终配置需结合应用确认。",

--- data/products/generated/pumps/pump-series.selection.generated.ts line 29 | pattern: /"title": "EA-100-PMMA"/g ---
    "content": {
      "zh": {
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
  {
    "productId": "ea-100-pmma",
```


## 6. probe-selection.generated.ts 是否误含 EA-100-PMMA

probe-selection.generated.ts 是否包含 EA-100-PMMA：否，未发现
```ts
--- data/products/selection/probe-selection.generated.ts line 85 | pattern: /href: "\/products\/probes\//g ---
      filter04: "来图定制",
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",

--- data/products/selection/probe-selection.generated.ts line 157 | pattern: /href: "\/products\/probes\//g ---
      filter04: "来图定制",
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",

--- data/products/selection/probe-selection.generated.ts line 229 | pattern: /href: "\/products\/probes\//g ---
      filter04: "来图定制",
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",

--- data/products/selection/probe-selection.generated.ts line 301 | pattern: /href: "\/products\/probes\//g ---
      filter04: "来图定制",
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",

--- data/products/selection/probe-selection.generated.ts line 86 | pattern: /detailHref: "\/products\/probes\//g ---
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data/products/selection/probe-selection.generated.ts line 158 | pattern: /detailHref: "\/products\/probes\//g ---
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data/products/selection/probe-selection.generated.ts line 230 | pattern: /detailHref: "\/products\/probes\//g ---
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data/products/selection/probe-selection.generated.ts line 302 | pattern: /detailHref: "\/products\/probes\//g ---
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

--- data/products/selection/probe-selection.generated.ts line 88 | pattern: /sourceType: "probe-selection"/g ---
    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {

--- data/products/selection/probe-selection.generated.ts line 160 | pattern: /sourceType: "probe-selection"/g ---
    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {

--- data/products/selection/probe-selection.generated.ts line 232 | pattern: /sourceType: "probe-selection"/g ---
    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {

--- data/products/selection/probe-selection.generated.ts line 304 | pattern: /sourceType: "probe-selection"/g ---
    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },
] as const;
```


## 7. 按当前最终保护逻辑模拟 href 结果

```txt
测试：柱塞泵被错误传入 probes 路径时，应自动纠正
输入 href：/products/probes/ea-100-pmma
输出 href：/products/pumps/plunger-pumps/ea-100-pmma

测试：柱塞泵正确路径保持正确
输入 href：/products/pumps/plunger-pumps/ea-100-pmma
输出 href：/products/pumps/plunger-pumps/ea-100-pmma

测试：真正针系列路径不应被改成柱塞泵
输入 href：/products/probes/sampling-probes
输出 href：/products/probes/sampling-probes
```


## 8. 检查本地 dev 页面 HTML 中是否含错误链接

无法请求 http://localhost:3000/products/：

说明：如果 npm run dev 没有启动，这一项可以忽略。

## 9. .next 编译缓存是否还含错误链接

```txt
.next 中未发现 /products/probes/ea-100-pmma。
```


## 10. 判断结论

- ProductSelectionCard 是否使用 safeDetailHref：是
- ProductSelectionCard 是否仍存在 href={detailHref}：否
- ProductSelectionClient 是否包了最终纠正函数：是
- 活跃源码里是否存在 /products/probes/ea-100-pmma：否

初步判断：活跃源码里已经没有直接生成 /products/probes/ea-100-pmma 的来源。如果 dev 终端仍报这个地址，更可能是旧页面、旧窗口、旧缓存或曾经打开的 500 页面继续请求。