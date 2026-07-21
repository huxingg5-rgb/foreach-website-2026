# 官网产品中心 build 类型问题统一清理方案
生成时间：2026/7/7 22:08:16
项目目录：F:\WebsiteProjects\foreach-website-2026

说明：本报告只检查，不修改业务文件。

## 1. 当前 build 结果
build 是否通过：否

当前最前面的 TypeScript 报错：

~~~txt
✓ Compiled successfully in 7.2s
  Running TypeScript ...

Failed to type check.

./data/products/selection/tubing-selection.generated.ts:10:5
Type error: Object literal may only specify known properties, and '"slug"' does not exist in type 'ProductSelectionProduct'.

  [90m 8 |[0m     [32m"seriesId"[0m: [32m"tubing"[0m,
  [90m 9 |[0m     [32m"detailSlug"[0m: [32m"pvc-tubing"[0m,
[31m[1m>[0m [90m10 |[0m     [32m"slug"[0m: [32m"pvc-tubing"[0m,
  [90m   |[0m     [31m[1m^[0m
  [90m11 |[0m     [32m"cardTitle"[0m: {
  [90m12 |[0m       [32m"zh"[0m: [32m"PVC 管"[0m,
  [90m13 |[0m       [32m"en"[0m: [32m"PVC Tubing"[0m
Next.js build worker exited with code: 1 and signal: null
~~~

## 2. ProductSelectionProduct 类型定义位置
| 文件 | 行号 |
|---|---:|
| data/products/selection/product-selection.types.ts | 29 |
| data/products/selection/product-selection.types.ts | 29 |
| data/products/selection/types.ts | 40 |
| data/products/selection/types.ts | 40 |

## 3. ProductSelectionClient.tsx 直接读取 product.xxx 的字段
| 字段 | 次数 | 行号示例 |
|---|---:|---|
| cardSubtitle | 3 | 1316, 1317, 1929 |
| cardTitle | 10 | 499, 500, 555, 556, 592, 1314, 1315, 1793, 1926 |
| categoryId | 9 | 355, 1001, 1015, 1019, 1056, 1075, 1099, 1110, 1310 |
| detailSlug | 7 | 502, 523, 548, 558, 592, 1110, 1313 |
| filters | 5 | 560, 561, 562, 1295, 1320 |
| imageCard | 1 | 1804 |
| productId | 14 | 82, 359, 501, 557, 592, 1027, 1044, 1064, 1083, 1309, 1793, 1799 |
| productTypeId | 17 | 1003, 1010, 1016, 1020, 1057, 1076, 1100, 1204, 1206, 1207, 1208, 1209 |
| searchKeywords | 4 | 563, 564, 1318, 1319 |
| seriesId | 2 | 559, 1312 |

## 4. generated selection 文件字段和 types 引用

### data/products/selection/diaphragm-pump-selection.generated.ts
types 引用：./product-selection.types

~~~txt
cardSubtitle
cardTitle
categoryId
categoryName
categorySlug
detailSlug
en
enabled
filter01
filter02
filter03
filter04
filterKey
filters
flowRate
href
id
imageAlt
imageCard
inputType
label
level
motorType
needDrawing
needModel3d
order
parentId
pressure
productId
productType
productTypeId
productTypeName
productTypeSlug
reservedConfigSlug
series
seriesId
seriesName
seriesSlug
serviceLife
sortOrder
source
tags
visible
zh
~~~

### data/products/selection/pipetting-pump-selection.generated.ts
types 引用：./product-selection.types

~~~txt
cardSubtitle
cardTitle
categoryId
categoryName
detailSlug
en
es
filter01
filter02
filterKey
filters
fr
imageAlt
imageCard
inputType
ko
label
needDrawing
needModel3d
productId
productTypeId
productTypeName
reservedConfigSlug
ru
searchKeywords
seriesId
seriesName
seriesSlug
sortOrder
source
status
tags
visible
zh
~~~

### data/products/selection/probe-selection.generated.ts
types 引用：./product-selection.types

~~~txt
cardSubtitle
cardTitle
category
categoryId
categoryLabel
code
description
detailHref
detailSlug
en
filter01
filter02
filter03
filter04
filters
href
id
image
imageAlt
imagePath
imageUrl
model
name
productCode
productId
productName
productTypeId
productTypeLabel
productTypeSlug
routeSlug
selectionHref
seriesSlug
slug
sourceType
specs
subtitle
summary
tags
title
zh
~~~

### data/products/selection/product-selection.generated.ts
types 引用：./product-selection.types

~~~txt
cardSubtitle
cardTitle
categoryId
detailSlug
en
es
filter01
filter02
filter03
filterKey
filters
fr
id
imageCard
inputType
ko
label
productId
productTypeId
ru
searchKeywords
seriesId
sortOrder
status
type
visible
zh
~~~

### data/products/selection/syringe-pump-selection.generated.ts
types 引用：./types

~~~txt
cardSubtitle
cardTitle
categoryId
detailSlug
en
es
filter01
filter02
filterKey
filters
fr
imagePath
inputType
ko
label
productId
productTypeId
ru
sortOrder
visible
zh
~~~

### data/products/selection/tubing-selection.generated.ts
types 引用：@/data/products/selection/product-selection.types

~~~txt
cardSubtitle
cardTitle
categoryId
description
detailHref
detailSlug
en
filters
href
imageAlt
imageCard
imagePath
productDetailHref
productId
productTypeId
searchKeywords
selectionHref
seriesId
slug
zh
~~~

### data/products/selection/valve-selection.generated.ts
types 引用：./product-selection.types

~~~txt
cardSubtitle
cardTitle
categoryId
categoryLabel
code
description
detailHref
detailSlug
en
filter01
filter02
filter03
filter04
filters
href
id
image
imageAlt
imagePath
imageUrl
model
name
productCode
productId
productName
productTypeId
productTypeLabel
productTypeSlug
routeSlug
selectionHref
seriesSlug
slug
sourceType
specs
subtitle
summary
tags
title
zh
~~~

### data/products/selection/valveless-pump-selection.generated.ts
types 引用：./product-selection.types

~~~txt
cardSubtitle
cardTitle
categoryId
detailSlug
en
es
filter01
filterKey
filters
fr
imageCard
inputType
ko
label
productId
productTypeId
ru
searchKeywords
seriesId
sortOrder
status
visible
zh
~~~

## 5. as any 临时兼容数量
~~~txt
components/products/selection/ProductSelectionClient.tsx：102
components/products/selection/ProductCardGrid.tsx：0
components/products/selection/ProductSelectionCard.tsx：3
app/products/valves/[slug]/page.tsx：0
app/products/probes/[slug]/page.tsx：0
app/products/pumps/syringe-pumps/[slug]/page.tsx：30
app/products/pumps/valveless-pumps/[slug]/page.tsx：9
app/products/pumps/pipetting-pumps/[slug]/page.tsx：0
~~~

## 6. 详情页 toClientData 重复字段风险

### app/products/valves/[slug]/page.tsx
~~~txt
未发现重复顶层字段
~~~

### app/products/probes/[slug]/page.tsx
~~~txt
未发现重复顶层字段
~~~

### app/products/pumps/syringe-pumps/[slug]/page.tsx
~~~txt
未发现重复顶层字段
~~~

### app/products/pumps/valveless-pumps/[slug]/page.tsx
~~~txt
未发现重复顶层字段
~~~

### app/products/pumps/pipetting-pumps/[slug]/page.tsx
~~~txt
未发现重复顶层字段
~~~

## 7. 统一清理结论
- 当前不建议继续按 build 报错逐条补丁式修改。
- 优先统一 ProductSelectionProduct 类型，覆盖真实 generated 数据字段。
- 再统一 ProductSelectionClient.tsx 的字段安全读取方式。
- 再整理 ProductCardGrid / ProductSelectionCard 的入参类型。
- 最后清理各详情页 toClientData 的重复字段和缺字段。

## 8. 建议修改顺序
1. 统一 data/products/selection/types.ts。
2. 统一 ProductSelectionClient.tsx 字段读取。
3. 统一 ProductCardGrid / ProductSelectionCard 类型来源。
4. 整理 valves / probes / syringe / valveless / pipetting 的 toClientData。
5. build 通过后，再逐步减少 as any。
