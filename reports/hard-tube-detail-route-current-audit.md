# 硬管接头详情失效检查

生成时间：2026/7/13 00:36:48

> 本次只检查，没有修改任何项目文件。

## 1. 初步结论

硬管详情数据和公共路由表面完整，下一步重点检查卡片跳转地址或开发缓存。

## 2. 硬管详情数据

- 文件：`data/products/generated/fittings/hard-tube-fittings/detail/index.json`
- 详情数量：147
- 空slug：0
- 重复slug：0

### 前5个有效测试地址

- `/products/fittings/hard-tube-fittings/hf-m6-20-pk-n`
- `/products/fittings/hard-tube-fittings/hf-m6-20-ps-b`
- `/products/fittings/hard-tube-fittings/hf-m6-20-pv-n`
- `/products/fittings/hard-tube-fittings/hf-m6-25-pk-n`
- `/products/fittings/hard-tube-fittings/hf-m6-25-ps-b`

## 3. 公共动态路由检查

- 文件：`app/products/[category]/[slug]/[seriesSlug]/page.tsx`
- TSX语法错误：0
- 未通过检查项：无

```json
{
  "hardImport": true,
  "hardCollection": true,
  "hardResolveBranch": true,
  "hardStaticDeclaration": true,
  "hardStaticSpread": true,
  "returnRouteMap": true
}
```

## 4. 当前 findFittingDetail

```tsx
function findFittingDetail(
  category: string,
  slug: string,
  seriesSlug: string
): ResolvedFittingDetail | null {
  if (category !== "fittings") {
    return null;
  }

  if (
    slug ===
    "hard-tube-fittings"
  ) {
    const detail =
      findDetailInCollection(
        hardTubeDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "hard-tube-fittings",
          fallbackName:
            "硬管接头",
        }
      : null;
  }

  if (
    slug ===
    "thread-to-barbed-fittings"
  ) {
    const detail =
      findDetailInCollection(
        threadToBarbedDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "thread-to-barbed-fittings",
          fallbackName:
            "螺纹转倒刺接头",
        }
      : null;
  }

  /* LUER_FEMALE_DETAIL_RESOLVE_START */

  if (
    category ===
      "fittings" &&
    slug ===
      "luer-fittings"
  ) {
    const detail =
      findDetailInCollection(
        luerDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "luer-fittings",
          fallbackName:
            "鲁尔接头",
        }
      : null;
  }

  if (
    category ===
      "fittings" &&
    slug ===
      "female-thread-adapters"
  ) {
    const detail =
      findDetailInCollection(
        femaleThreadDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "female-thread-adapters",
          fallbackName:
            "内螺纹互转接头",
        }
      : null;
  }

  /* LUER_FEMALE_DETAIL_RESOLVE_END */

  return null;
}
```

## 5. 当前 generateStaticParams

```tsx
export function generateStaticParams() {
  const existingSeriesParams =
    getSeriesRouteParams();

  const hardTubeParams =
    hardTubeDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "hard-tube-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const threadToBarbedParams =
    threadToBarbedDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "thread-to-barbed-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const luerParams =
    luerDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "luer-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const femaleThreadParams =
    femaleThreadDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "female-thread-adapters",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const routeMap =
    new Map<
      string,
      {
        category: string;
        slug: string;
        seriesSlug: string;
      }
    >();

  [
    ...existingSeriesParams,
    ...hardTubeParams,
    ...threadToBarbedParams,
    ...luerParams,
    ...femaleThreadParams,
  ]
    .filter(
      (item) =>
        Boolean(
          item &&
          item.category &&
          item.slug &&
          item.seriesSlug
        )
    )
    .forEach((item) => {
      const key = [
        item.category,
        item.slug,
        item.seriesSlug,
      ].join("/");

      routeMap.set(
        key,
        item
      );
    });

  return Array.from(
    routeMap.values()
  );
}
```

## 6. 硬管选型数据文件

### data/products/selection/hard-tube-fitting-selection.generated.ts

- 硬管产品记录：152
- detailSlug字段：147
- detailHref字段：0

```ts
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
   28 |     "cardSubtitle": {
   29 |       "zh": "密封方式：法兰垫片底面密封\n螺纹规格：M6×1\n接管外径：1.6–2.0 mm",
   30 |       "en": "Sealing method: Flange gasket bottom seal\nThread: M6×1\nTube OD: 1.6–2.0 mm"
   31 |     },
   32 |     "filters": {
   33 |       "filter01": "标滚平底接头",
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
```

## 7. ProductSelectionClient跳转逻辑

- 文件存在：true
- hard-tube-fittings出现次数：3

### hard-tube-fittings

```tsx
  538 |       filterKey,
  539 |       selectedFilters,
  540 |     });
  541 |   }
  542 | 
  543 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  544 | 
  545 |   if (
  546 |     productTypeId === "hard-tube-fittings" &&
  547 |     filterKey === "filter03"
  548 |   ) {
  549 |     const expandedProducts = products.flatMap((product) => {
  550 |       const values = splitFilterValues(
  551 |         (product.filters || {})[filterKey]
  552 |       );
  553 | 
  554 |       if (values.length <= 1) {
  555 |         return [product];
  556 |       }
  557 | 
  558 |       return values.map((value) => ({
  559 |         ...product,
  560 |         productId: `${product.productId}__${value}`,
  561 |         filters: {
  562 |           ...(product.filters || {}),
  563 |           [filterKey]: value,
  564 |         },
  565 |       }));
  566 |     });
  567 | 
  568 |     return getProductFilterOptions({
```

### makeDetailHref

```tsx
  828 |   ) {
  829 |     return `/products/pumps/plunger-pumps/${hrefSlug}`;
  830 |   }
  831 | 
  832 |   return rawHref;
  833 | }
  834 | 
  835 | 
  836 | function makeDetailHref(product: ProductSelectionProduct) {
  837 |   /*
  838 |     QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712
  839 | 
  840 |     快插接头卡片优先使用生成数据中的真实详情链接：
  841 |     /products/fittings/quick-connect-fittings/q20#商品编码
  842 | 
  843 |     避免后续通用逻辑把链接改回产品类型筛选页。
  844 |   */
  845 |   {
  846 |     const rawProductTypeId =
  847 |       String(
  848 |         (product as any)?.productTypeId ||
  849 |         ""
  850 |       ).trim();
  851 | 
  852 |     const rawSourceType =
  853 |       String(
  854 |         (product as any)?.sourceType ||
  855 |         ""
  856 |       ).trim();
  857 | 
  858 |     const rawExistingHref =
```

### detailSlug

```tsx
  684 |   return "";
  685 | }
  686 | 
  687 | function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  688 |   const candidates = [
  689 |     getSelectionLocalizedText(product.cardTitle, "en"),
  690 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  691 |     product.productId,
  692 |     product.detailSlug,
  693 |   ]
  694 |     .map(normalizeModelKey)
  695 |     .filter(Boolean);
  696 | 
  697 |   const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
  698 |     const detailCandidates = [
  699 |       detail.model,
  700 |       detail.productId,
  701 |       detail.slug,
  702 |       detail.detailSlug,
  703 |     ]
  704 |       .map(normalizeModelKey)
  705 |       .filter(Boolean);
  706 | 
  707 |     return detailCandidates.some((item) => candidates.includes(item));
  708 |   });
  709 | 
  710 |   return normalizeDetailPathPart(
  711 |     matchedDetail?.slug ||
  712 |       matchedDetail?.detailSlug ||
  713 |       product.detailSlug
  714 |   );
```

### detailHref

```tsx
  852 |     const rawSourceType =
  853 |       String(
  854 |         (product as any)?.sourceType ||
  855 |         ""
  856 |       ).trim();
  857 | 
  858 |     const rawExistingHref =
  859 |       String(
  860 |         (product as any)?.detailHref ||
  861 |         (product as any)?.href ||
  862 |         ""
  863 |       ).trim();
  864 | 
  865 |     const rawProductText =
  866 |       JSON.stringify(
  867 |         product || {}
  868 |       );
  869 | 
  870 |     const isQuickConnect =
  871 |       rawProductTypeId ===
  872 |         "quick-connect-fittings" ||
  873 |       rawSourceType ===
  874 |         "quick-connect-selection" ||
  875 |       rawExistingHref.includes(
  876 |         "/products/fittings/quick-connect-fittings/"
  877 |       ) ||
  878 |       rawProductText.includes(
  879 |         "快插接头"
  880 |       );
  881 | 
  882 |     if (isQuickConnect) {
```

## 8. 数据异常明细

未发现空slug或重复slug。

