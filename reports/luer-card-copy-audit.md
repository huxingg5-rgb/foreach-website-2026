# 鲁尔接头卡片文案检查

生成时间：2026/7/12 23:49:40

> 本次只检查现有生成逻辑、生成数据和页面接入，没有修改产品数据或页面代码。

## 1. 鲁尔相关文件

- `scripts\products\add-luer-filter-disabled-linkage.cjs`
- `scripts\products\audit-luer-card-copy.cjs`
- `scripts\products\audit-luer-fitting-assets.cjs`
- `scripts\products\audit-luer-fitting-columns.cjs`
- `scripts\products\audit-luer-fitting-source.cjs`
- `scripts\products\audit-luer-selection-integration.cjs`
- `scripts\products\fix-luer-filter-color-labels.cjs`
- `scripts\products\generate-luer-fitting-selection-and-assets.cjs`
- `scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_color_map_20260712_215913`
- `scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_duplicate_slug_20260712_214217`
- `scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_filter_color_labels_20260712145555`
- `scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_hide_luer_filter01_20260712135353`
- `scripts\products\hide-luer-product-type-filter.cjs`
- `scripts\products\integrate-luer-fitting-selection.cjs`
- `data\products\selection\luer-fitting-asset-map.generated.json`
- `data\products\selection\luer-fitting-asset-map.generated.json.bak_20260712145555`
- `data\products\selection\luer-fitting-selection.generated.ts`
- `data\products\selection\luer-fitting-selection.generated.ts.bak_20260712145555`
- `data\products\selection\luer-fitting-selection.generated.ts.bak_hide_luer_filter01_20260712135353`
- `data\products\selection\luer-fitting-selection.summary.json`
- `data\products\selection\luer-fitting-selection.summary.json.bak_20260712145555`
- `scripts\products\audit-female-thread-adapter-selection-integration.cjs`
- `scripts\products\fix-female-thread-integration-anchor.cjs`
- `scripts\products\integrate-female-thread-adapter-selection.cjs`
- `scripts\products\setup-barbed-fitting-selection-step1.cjs`
- `data\products\selection\product-route-map.ts`

## 2. 鲁尔生成脚本

| 文件 | 行数 | 大小 | Node语法 |
|---|---:|---:|---|
| scripts\products\add-luer-filter-disabled-linkage.cjs | 370 | 7656 | ✅ 通过 |
| scripts\products\audit-luer-card-copy.cjs | 827 | 14262 | ✅ 通过 |
| scripts\products\audit-luer-fitting-assets.cjs | 710 | 11551 | ✅ 通过 |
| scripts\products\audit-luer-fitting-columns.cjs | 562 | 9195 | ✅ 通过 |
| scripts\products\audit-luer-fitting-source.cjs | 592 | 10520 | ✅ 通过 |
| scripts\products\audit-luer-selection-integration.cjs | 251 | 4651 | ✅ 通过 |
| scripts\products\fix-luer-filter-color-labels.cjs | 210 | 3617 | ✅ 通过 |
| scripts\products\generate-luer-fitting-selection-and-assets.cjs | 1000 | 19975 | ✅ 通过 |
| scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_color_map_20260712_215913 | 985 | 19717 | 未检查 |
| scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_duplicate_slug_20260712_214217 | 955 | 19193 | 未检查 |
| scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_filter_color_labels_20260712145555 | 986 | 19751 | 未检查 |
| scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_hide_luer_filter01_20260712135353 | 985 | 19716 | 未检查 |
| scripts\products\hide-luer-product-type-filter.cjs | 128 | 2289 | ✅ 通过 |
| scripts\products\integrate-luer-fitting-selection.cjs | 400 | 7213 | ✅ 通过 |
| scripts\products\audit-female-thread-adapter-selection-integration.cjs | 561 | 9926 | ✅ 通过 |
| scripts\products\fix-female-thread-integration-anchor.cjs | 140 | 2796 | ✅ 通过 |
| scripts\products\integrate-female-thread-adapter-selection.cjs | 893 | 17057 | ✅ 通过 |
| scripts\products\setup-barbed-fitting-selection-step1.cjs | 1440 | 27601 | ✅ 通过 |

### scripts\products\add-luer-filter-disabled-linkage.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\audit-luer-card-copy.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

起始行：392

```text
  387 |             getSnippet(
  388 |               source,
  389 |               /function\s+createCardSubtitle\s*\(/
  390 |             ),
  391 | 
  392 |           cardTitle:
  393 |             getSnippet(
  394 |               source,
  395 |               /cardTitle\s*:/
  396 |             ),
  397 | 
  398 |           structureMap:
  399 |             getSnippet(
  400 |               source,
  401 |               /const\s+(structureMap|seriesMap|productNameMap)\s*=/
  402 |             ),
  403 | 
  404 |           colorMap:
  405 |             getSnippet(
  406 |               source,
```

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\audit-luer-fitting-assets.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\audit-luer-fitting-columns.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

起始行：223

```text
  218 |   headers.findIndex(
  219 |     (header) =>
  220 |       header === "产品类型"
  221 |   );
  222 | 
  223 | const seriesMap =
  224 |   new Map();
  225 | 
  226 | if (seriesColumnIndex >= 0) {
  227 |   for (const row of dataRows) {
  228 |     const series =
  229 |       row.values[
  230 |         seriesColumnIndex
  231 |       ];
  232 | 
  233 |     if (!series) {
  234 |       continue;
  235 |     }
  236 | 
  237 |     if (!seriesMap.has(series)) {
```

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\audit-luer-fitting-source.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\audit-luer-selection-integration.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\fix-luer-filter-color-labels.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

起始行：53

```text
   48 | 
   49 | /*
   50 |  * 卡片显示普通中文颜色；
   51 |  * 筛选项显示颜色代码和中文名称。
   52 |  */
   53 | const colorMapCode = `const colorMap = {
   54 |   B: "黑色",
   55 |   Y: "黄色",
   56 |   U: "蓝色",
   57 |   R: "红色",
   58 |   O: "橙色",
   59 |   G: "绿色",
   60 |   W: "白色",
   61 |   N: "本色",
   62 | };
   63 | 
   64 | const colorFilterMap = {
   65 |   B: "B - 黑色",
   66 |   Y: "Y - 黄色",
   67 |   U: "U - 蓝色",
```

#### 筛选标签

未找到。

### scripts\products\generate-luer-fitting-selection-and-assets.cjs

#### 型号解析 parseModel

起始行：264

```text
  259 |   LPR: "旋转锁圈公鲁尔接头LPR-C.pdf",
  260 |   LPS: "LPS-C.pdf",
  261 |   LP: "一体式公鲁尔集合-C.pdf",
  262 | };
  263 | 
  264 | function parseModel(modelCode) {
  265 |   const parts = modelCode.split("-").filter(Boolean);
  266 | 
  267 |   const series = parts[0] || "";
  268 | 
  269 |   const materialCode =
  270 |     parts.length >= 2
  271 |       ? parts[parts.length - 2]
  272 |       : "";
  273 | 
  274 |   const colorCode =
  275 |     parts.length >= 1
  276 |       ? parts[parts.length - 1]
  277 |       : "";
  278 | 
```

#### 卡片描述 createCardSubtitle

起始行：315

```text
  310 |       "",
  311 |     thread,
  312 |   };
  313 | }
  314 | 
  315 | function createCardSubtitle({
  316 |   series,
  317 |   tubeInnerDiameter,
  318 |   thread,
  319 |   material,
  320 |   color,
  321 | }) {
  322 |   let secondLine = "";
  323 | 
  324 |   if (thread && tubeInnerDiameter) {
  325 |     secondLine =
  326 |       `${thread}｜适配${tubeInnerDiameter}内径软管`;
  327 |   } else if (tubeInnerDiameter) {
  328 |     secondLine =
  329 |       `适配${tubeInnerDiameter}内径软管`;
```

#### 卡片标题 cardTitle

起始行：664

```text
  659 |     productId: record.productCode,
  660 |     categoryId: "fittings",
  661 |     productTypeId: PRODUCT_TYPE_ID,
  662 |     seriesId:
  663 |       parsed.series.toLowerCase(),
  664 |     cardTitle: {
  665 |       zh: productName,
  666 |       en: productName,
  667 |     },
  668 |     cardSubtitle: {
  669 |       zh: cardSubtitle,
  670 |       en: cardSubtitle,
  671 |     },
  672 |     filters,
  673 |     imageCard,
  674 |     detailSlug: slug,
  675 |     status: "active",
  676 |     sortOrder: index + 1,
  677 |     searchKeywords: {
  678 |       zh: [
```

#### 系列或结构映射

未找到。

#### 颜色映射

起始行：230

```text
  225 |   PP: "PP",
  226 |   PA: "PA",
  227 |   PV: "PVDF",
  228 | };
  229 | 
  230 | const colorMap = {
  231 |   B: "黑色",
  232 |   Y: "黄色",
  233 |   U: "蓝色",
  234 |   R: "红色",
  235 |   O: "橙色",
  236 |   G: "绿色",
  237 |   W: "白色",
  238 |   N: "本色",
  239 | };
  240 | 
  241 | const colorFilterMap = {
  242 |   B: "B - 黑色",
  243 |   Y: "Y - 黄色",
  244 |   U: "U - 蓝色",
```

#### 筛选标签

起始行：753

```text
  748 |   throw new Error(
  749 |     `发现重复详情 slug：${JSON.stringify(duplicateSlugs)}`
  750 |   );
  751 | }
  752 | 
  753 | const filterLabels = [
  754 |   {
  755 |     categoryId: "fittings",
  756 |     productTypeId: PRODUCT_TYPE_ID,
  757 |     filterKey: "filter01",
  758 |     label: i18n(
  759 |       "产品类型",
  760 |       "Product Type"
  761 |     ),
  762 |     inputType: "single",
  763 |     sortOrder: 10,
  764 |     visible: false,
  765 |   },
  766 |   {
  767 |     categoryId: "fittings",
```

### scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_color_map_20260712_215913

#### 型号解析 parseModel

起始行：253

```text
  248 |   LPR: "旋转锁圈公鲁尔接头LPR-C.pdf",
  249 |   LPS: "LPS-C.pdf",
  250 |   LP: "一体式公鲁尔集合-C.pdf",
  251 | };
  252 | 
  253 | function parseModel(modelCode) {
  254 |   const parts = modelCode.split("-").filter(Boolean);
  255 | 
  256 |   const series = parts[0] || "";
  257 | 
  258 |   const materialCode =
  259 |     parts.length >= 2
  260 |       ? parts[parts.length - 2]
  261 |       : "";
  262 | 
  263 |   const colorCode =
  264 |     parts.length >= 1
  265 |       ? parts[parts.length - 1]
  266 |       : "";
  267 | 
```

#### 卡片描述 createCardSubtitle

起始行：301

```text
  296 |       "",
  297 |     thread,
  298 |   };
  299 | }
  300 | 
  301 | function createCardSubtitle({
  302 |   series,
  303 |   tubeInnerDiameter,
  304 |   thread,
  305 |   material,
  306 |   color,
  307 | }) {
  308 |   let secondLine = "";
  309 | 
  310 |   if (thread && tubeInnerDiameter) {
  311 |     secondLine =
  312 |       `${thread}｜适配${tubeInnerDiameter}内径软管`;
  313 |   } else if (tubeInnerDiameter) {
  314 |     secondLine =
  315 |       `适配${tubeInnerDiameter}内径软管`;
```

#### 卡片标题 cardTitle

起始行：650

```text
  645 |     productId: record.productCode,
  646 |     categoryId: "fittings",
  647 |     productTypeId: PRODUCT_TYPE_ID,
  648 |     seriesId:
  649 |       parsed.series.toLowerCase(),
  650 |     cardTitle: {
  651 |       zh: productName,
  652 |       en: productName,
  653 |     },
  654 |     cardSubtitle: {
  655 |       zh: cardSubtitle,
  656 |       en: cardSubtitle,
  657 |     },
  658 |     filters,
  659 |     imageCard,
  660 |     detailSlug: slug,
  661 |     status: "active",
  662 |     sortOrder: index + 1,
  663 |     searchKeywords: {
  664 |       zh: [
```

#### 系列或结构映射

未找到。

#### 颜色映射

起始行：230

```text
  225 |   PP: "PP",
  226 |   PA: "PA",
  227 |   PV: "PVDF",
  228 | };
  229 | 
  230 | const colorMap = {
  231 |   N: "本色",
  232 |   W: "白色",
  233 |   B: "蓝色",
  234 |   R: "红色",
  235 |   G: "绿色",
  236 |   U: "紫色",
  237 |   O: "橙色",
  238 |   Y: "黄色",
  239 | };
  240 | 
  241 | const tubeSizeMap = {
  242 |   "16": "1.6 mm",
  243 |   "24": "2.4 mm",
  244 |   "32": "3.2 mm",
```

#### 筛选标签

起始行：739

```text
  734 |   throw new Error(
  735 |     `发现重复详情 slug：${JSON.stringify(duplicateSlugs)}`
  736 |   );
  737 | }
  738 | 
  739 | const filterLabels = [
  740 |   {
  741 |     categoryId: "fittings",
  742 |     productTypeId: PRODUCT_TYPE_ID,
  743 |     filterKey: "filter01",
  744 |     label: i18n(
  745 |       "产品类型",
  746 |       "Product Type"
  747 |     ),
  748 |     inputType: "single",
  749 |     sortOrder: 10,
  750 |     visible: false,
  751 |   },
  752 |   {
  753 |     categoryId: "fittings",
```

### scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_duplicate_slug_20260712_214217

#### 型号解析 parseModel

起始行：253

```text
  248 |   LPR: "旋转锁圈公鲁尔接头LPR-C.pdf",
  249 |   LPS: "LPS-C.pdf",
  250 |   LP: "一体式公鲁尔集合-C.pdf",
  251 | };
  252 | 
  253 | function parseModel(modelCode) {
  254 |   const parts = modelCode.split("-").filter(Boolean);
  255 | 
  256 |   const series = parts[0] || "";
  257 | 
  258 |   const materialCode =
  259 |     parts.length >= 2
  260 |       ? parts[parts.length - 2]
  261 |       : "";
  262 | 
  263 |   const colorCode =
  264 |     parts.length >= 1
  265 |       ? parts[parts.length - 1]
  266 |       : "";
  267 | 
```

#### 卡片描述 createCardSubtitle

起始行：301

```text
  296 |       "",
  297 |     thread,
  298 |   };
  299 | }
  300 | 
  301 | function createCardSubtitle({
  302 |   series,
  303 |   tubeInnerDiameter,
  304 |   thread,
  305 |   material,
  306 |   color,
  307 | }) {
  308 |   let secondLine = "";
  309 | 
  310 |   if (thread && tubeInnerDiameter) {
  311 |     secondLine =
  312 |       `${thread}｜适配${tubeInnerDiameter}内径软管`;
  313 |   } else if (tubeInnerDiameter) {
  314 |     secondLine =
  315 |       `适配${tubeInnerDiameter}内径软管`;
```

#### 卡片标题 cardTitle

起始行：621

```text
  616 |     productId: record.productCode,
  617 |     categoryId: "fittings",
  618 |     productTypeId: PRODUCT_TYPE_ID,
  619 |     seriesId:
  620 |       parsed.series.toLowerCase(),
  621 |     cardTitle: {
  622 |       zh: productName,
  623 |       en: productName,
  624 |     },
  625 |     cardSubtitle: {
  626 |       zh: cardSubtitle,
  627 |       en: cardSubtitle,
  628 |     },
  629 |     filters,
  630 |     imageCard,
  631 |     detailSlug: slug,
  632 |     status: "active",
  633 |     sortOrder: index + 1,
  634 |     searchKeywords: {
  635 |       zh: [
```

#### 系列或结构映射

未找到。

#### 颜色映射

起始行：230

```text
  225 |   PP: "PP",
  226 |   PA: "PA",
  227 |   PV: "PVDF",
  228 | };
  229 | 
  230 | const colorMap = {
  231 |   N: "本色",
  232 |   W: "白色",
  233 |   B: "蓝色",
  234 |   R: "红色",
  235 |   G: "绿色",
  236 |   U: "紫色",
  237 |   O: "橙色",
  238 |   Y: "黄色",
  239 | };
  240 | 
  241 | const tubeSizeMap = {
  242 |   "16": "1.6 mm",
  243 |   "24": "2.4 mm",
  244 |   "32": "3.2 mm",
```

#### 筛选标签

起始行：710

```text
  705 |   throw new Error(
  706 |     `发现重复详情 slug：${JSON.stringify(duplicateSlugs)}`
  707 |   );
  708 | }
  709 | 
  710 | const filterLabels = [
  711 |   {
  712 |     categoryId: "fittings",
  713 |     productTypeId: PRODUCT_TYPE_ID,
  714 |     filterKey: "filter01",
  715 |     label: i18n(
  716 |       "产品类型",
  717 |       "Product Type"
  718 |     ),
  719 |     inputType: "single",
  720 |     sortOrder: 10,
  721 |     visible: true,
  722 |   },
  723 |   {
  724 |     categoryId: "fittings",
```

### scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_filter_color_labels_20260712145555

#### 型号解析 parseModel

起始行：253

```text
  248 |   LPR: "旋转锁圈公鲁尔接头LPR-C.pdf",
  249 |   LPS: "LPS-C.pdf",
  250 |   LP: "一体式公鲁尔集合-C.pdf",
  251 | };
  252 | 
  253 | function parseModel(modelCode) {
  254 |   const parts = modelCode.split("-").filter(Boolean);
  255 | 
  256 |   const series = parts[0] || "";
  257 | 
  258 |   const materialCode =
  259 |     parts.length >= 2
  260 |       ? parts[parts.length - 2]
  261 |       : "";
  262 | 
  263 |   const colorCode =
  264 |     parts.length >= 1
  265 |       ? parts[parts.length - 1]
  266 |       : "";
  267 | 
```

#### 卡片描述 createCardSubtitle

起始行：301

```text
  296 |       "",
  297 |     thread,
  298 |   };
  299 | }
  300 | 
  301 | function createCardSubtitle({
  302 |   series,
  303 |   tubeInnerDiameter,
  304 |   thread,
  305 |   material,
  306 |   color,
  307 | }) {
  308 |   let secondLine = "";
  309 | 
  310 |   if (thread && tubeInnerDiameter) {
  311 |     secondLine =
  312 |       `${thread}｜适配${tubeInnerDiameter}内径软管`;
  313 |   } else if (tubeInnerDiameter) {
  314 |     secondLine =
  315 |       `适配${tubeInnerDiameter}内径软管`;
```

#### 卡片标题 cardTitle

起始行：650

```text
  645 |     productId: record.productCode,
  646 |     categoryId: "fittings",
  647 |     productTypeId: PRODUCT_TYPE_ID,
  648 |     seriesId:
  649 |       parsed.series.toLowerCase(),
  650 |     cardTitle: {
  651 |       zh: productName,
  652 |       en: productName,
  653 |     },
  654 |     cardSubtitle: {
  655 |       zh: cardSubtitle,
  656 |       en: cardSubtitle,
  657 |     },
  658 |     filters,
  659 |     imageCard,
  660 |     detailSlug: slug,
  661 |     status: "active",
  662 |     sortOrder: index + 1,
  663 |     searchKeywords: {
  664 |       zh: [
```

#### 系列或结构映射

未找到。

#### 颜色映射

起始行：230

```text
  225 |   PP: "PP",
  226 |   PA: "PA",
  227 |   PV: "PVDF",
  228 | };
  229 | 
  230 | const colorMap = {
  231 |   B: "B - 黑色",
  232 |   Y: "Y - 黄色",
  233 |   U: "U - 蓝色",
  234 |   R: "R - 红色",
  235 |   O: "O - 橙色",
  236 |   G: "G - 绿色",
  237 |   W: "W - 白色",
  238 |   N: "N - 本色",
  239 | };
  240 | 
  241 | const tubeSizeMap = {
  242 |   "16": "1.6 mm",
  243 |   "24": "2.4 mm",
  244 |   "32": "3.2 mm",
```

#### 筛选标签

起始行：739

```text
  734 |   throw new Error(
  735 |     `发现重复详情 slug：${JSON.stringify(duplicateSlugs)}`
  736 |   );
  737 | }
  738 | 
  739 | const filterLabels = [
  740 |   {
  741 |     categoryId: "fittings",
  742 |     productTypeId: PRODUCT_TYPE_ID,
  743 |     filterKey: "filter01",
  744 |     label: i18n(
  745 |       "产品类型",
  746 |       "Product Type"
  747 |     ),
  748 |     inputType: "single",
  749 |     sortOrder: 10,
  750 |     visible: false,
  751 |   },
  752 |   {
  753 |     categoryId: "fittings",
```

### scripts\products\generate-luer-fitting-selection-and-assets.cjs.bak_hide_luer_filter01_20260712135353

#### 型号解析 parseModel

起始行：253

```text
  248 |   LPR: "旋转锁圈公鲁尔接头LPR-C.pdf",
  249 |   LPS: "LPS-C.pdf",
  250 |   LP: "一体式公鲁尔集合-C.pdf",
  251 | };
  252 | 
  253 | function parseModel(modelCode) {
  254 |   const parts = modelCode.split("-").filter(Boolean);
  255 | 
  256 |   const series = parts[0] || "";
  257 | 
  258 |   const materialCode =
  259 |     parts.length >= 2
  260 |       ? parts[parts.length - 2]
  261 |       : "";
  262 | 
  263 |   const colorCode =
  264 |     parts.length >= 1
  265 |       ? parts[parts.length - 1]
  266 |       : "";
  267 | 
```

#### 卡片描述 createCardSubtitle

起始行：301

```text
  296 |       "",
  297 |     thread,
  298 |   };
  299 | }
  300 | 
  301 | function createCardSubtitle({
  302 |   series,
  303 |   tubeInnerDiameter,
  304 |   thread,
  305 |   material,
  306 |   color,
  307 | }) {
  308 |   let secondLine = "";
  309 | 
  310 |   if (thread && tubeInnerDiameter) {
  311 |     secondLine =
  312 |       `${thread}｜适配${tubeInnerDiameter}内径软管`;
  313 |   } else if (tubeInnerDiameter) {
  314 |     secondLine =
  315 |       `适配${tubeInnerDiameter}内径软管`;
```

#### 卡片标题 cardTitle

起始行：650

```text
  645 |     productId: record.productCode,
  646 |     categoryId: "fittings",
  647 |     productTypeId: PRODUCT_TYPE_ID,
  648 |     seriesId:
  649 |       parsed.series.toLowerCase(),
  650 |     cardTitle: {
  651 |       zh: productName,
  652 |       en: productName,
  653 |     },
  654 |     cardSubtitle: {
  655 |       zh: cardSubtitle,
  656 |       en: cardSubtitle,
  657 |     },
  658 |     filters,
  659 |     imageCard,
  660 |     detailSlug: slug,
  661 |     status: "active",
  662 |     sortOrder: index + 1,
  663 |     searchKeywords: {
  664 |       zh: [
```

#### 系列或结构映射

未找到。

#### 颜色映射

起始行：230

```text
  225 |   PP: "PP",
  226 |   PA: "PA",
  227 |   PV: "PVDF",
  228 | };
  229 | 
  230 | const colorMap = {
  231 |   N: "本色",
  232 |   W: "白色",
  233 |   B: "蓝色",
  234 |   R: "红色",
  235 |   G: "绿色",
  236 |   U: "紫色",
  237 |   O: "橙色",
  238 |   Y: "黄色",
  239 | };
  240 | 
  241 | const tubeSizeMap = {
  242 |   "16": "1.6 mm",
  243 |   "24": "2.4 mm",
  244 |   "32": "3.2 mm",
```

#### 筛选标签

起始行：739

```text
  734 |   throw new Error(
  735 |     `发现重复详情 slug：${JSON.stringify(duplicateSlugs)}`
  736 |   );
  737 | }
  738 | 
  739 | const filterLabels = [
  740 |   {
  741 |     categoryId: "fittings",
  742 |     productTypeId: PRODUCT_TYPE_ID,
  743 |     filterKey: "filter01",
  744 |     label: i18n(
  745 |       "产品类型",
  746 |       "Product Type"
  747 |     ),
  748 |     inputType: "single",
  749 |     sortOrder: 10,
  750 |     visible: true,
  751 |   },
  752 |   {
  753 |     categoryId: "fittings",
```

### scripts\products\hide-luer-product-type-filter.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\integrate-luer-fitting-selection.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\audit-female-thread-adapter-selection-integration.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\fix-female-thread-integration-anchor.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\integrate-female-thread-adapter-selection.cjs

#### 型号解析 parseModel

未找到。

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

未找到。

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

未找到。

### scripts\products\setup-barbed-fitting-selection-step1.cjs

#### 型号解析 parseModel

起始行：215

```text
  210 |   const number = Number(match[1]);
  211 | 
  212 |   return `${(number / 10).toFixed(1)} mm`;
  213 | }
  214 | 
  215 | function parseModel(model, seriesCode) {
  216 |   const parts = model
  217 |     .toUpperCase()
  218 |     .split("-")
  219 |     .map((item) => item.trim())
  220 |     .filter(Boolean);
  221 | 
  222 |   const materialCode = parts.at(-2);
  223 |   const colorCode = parts.at(-1);
  224 |   const diameterTokens = parts.slice(1, -2);
  225 | 
  226 |   const series = SERIES_MAP[seriesCode];
  227 | 
  228 |   if (!series) {
  229 |     throw new Error(
```

#### 卡片描述 createCardSubtitle

未找到。

#### 卡片标题 cardTitle

起始行：436

```text
  431 |         seriesName:
  432 |           series.cardName,
  433 | 
  434 |         model,
  435 | 
  436 |         cardTitle:
  437 |           i18n(model, model),
  438 | 
  439 |         cardSubtitle:
  440 |           i18n(
  441 |             [
  442 |               series.cardName,
  443 |               `接管内径：${diameterSummary}`,
  444 |               `${material}主体｜${color}`,
  445 |             ].join("\n"),
  446 |             [
  447 |               series.en,
  448 |               `Tube ID: ${diameterSummary}`,
  449 |               `${material} body | ${color}`,
  450 |             ].join("\n")
```

#### 系列或结构映射

未找到。

#### 颜色映射

未找到。

#### 筛选标签

起始行：553

```text
  548 |       ),
  549 |       sortOrder: 402,
  550 |     },
  551 |   ];
  552 | 
  553 |   const filterLabels = [
  554 |     {
  555 |       categoryId: "fittings",
  556 |       productTypeId: "barbed-fittings",
  557 |       filterKey: "filter01",
  558 |       label: i18n(
  559 |         "产品结构",
  560 |         "Structure"
  561 |       ),
  562 |       inputType: "single",
  563 |       sortOrder: 10,
  564 |       visible: true,
  565 |     },
  566 | 
  567 |     {
```

## 3. 当前生成数据

### data\products\selection\luer-fitting-asset-map.generated.json

- 产品数量：0
- productTypeId：未找到
- 系列：未找到
- 型号式标题数量：0/0
- filter01 inputType：未找到

#### 当前卡片示例

### data\products\selection\luer-fitting-asset-map.generated.json.bak_20260712145555

- 产品数量：0
- productTypeId：未找到
- 系列：未找到
- 型号式标题数量：0/0
- filter01 inputType：未找到

#### 当前卡片示例

### data\products\selection\luer-fitting-selection.generated.ts

- 产品数量：151
- productTypeId：luer-fittings
- 系列：lsl、lrl、lpr、lps、lp、ls、pmls、lcr、lpt、lns
- 型号式标题数量：0/151
- filter01 inputType：single

#### 当前卡片示例

**示例 1**

```text
固定公鲁尔芯子
适配1.6 mm内径软管
PP材质｜本色
```

**示例 2**

```text
固定公鲁尔芯子
适配1.6 mm内径软管
PA材质｜白色
```

**示例 3**

```text
固定公鲁尔芯子
适配2.4 mm内径软管
PP材质｜本色
```

**示例 4**

```text
固定公鲁尔芯子
适配2.4 mm内径软管
PA材质｜白色
```

**示例 5**

```text
固定公鲁尔芯子
适配3.2 mm内径软管
PP材质｜本色
```

**示例 6**

```text
固定公鲁尔芯子
适配3.2 mm内径软管
PA材质｜白色
```

**示例 7**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PP材质｜本色
```

**示例 8**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PA材质｜白色
```

**示例 9**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PVDF材质｜本色
```

**示例 10**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PP材质｜本色
```

**示例 11**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PA材质｜白色
```

**示例 12**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PVDF材质｜本色
```

### data\products\selection\luer-fitting-selection.generated.ts.bak_20260712145555

- 产品数量：151
- productTypeId：luer-fittings
- 系列：lsl、lrl、lpr、lps、lp、ls、pmls、lcr、lpt、lns
- 型号式标题数量：0/151
- filter01 inputType：single

#### 当前卡片示例

**示例 1**

```text
固定公鲁尔芯子
适配1.6 mm内径软管
PP材质｜本色
```

**示例 2**

```text
固定公鲁尔芯子
适配1.6 mm内径软管
PA材质｜白色
```

**示例 3**

```text
固定公鲁尔芯子
适配2.4 mm内径软管
PP材质｜本色
```

**示例 4**

```text
固定公鲁尔芯子
适配2.4 mm内径软管
PA材质｜白色
```

**示例 5**

```text
固定公鲁尔芯子
适配3.2 mm内径软管
PP材质｜本色
```

**示例 6**

```text
固定公鲁尔芯子
适配3.2 mm内径软管
PA材质｜白色
```

**示例 7**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PP材质｜本色
```

**示例 8**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PA材质｜白色
```

**示例 9**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PVDF材质｜本色
```

**示例 10**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PP材质｜本色
```

**示例 11**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PA材质｜白色
```

**示例 12**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PVDF材质｜本色
```

### data\products\selection\luer-fitting-selection.generated.ts.bak_hide_luer_filter01_20260712135353

- 产品数量：151
- productTypeId：luer-fittings
- 系列：lsl、lrl、lpr、lps、lp、ls、pmls、lcr、lpt、lns
- 型号式标题数量：0/151
- filter01 inputType：single

#### 当前卡片示例

**示例 1**

```text
固定公鲁尔芯子
适配1.6 mm内径软管
PP材质｜本色
```

**示例 2**

```text
固定公鲁尔芯子
适配1.6 mm内径软管
PA材质｜白色
```

**示例 3**

```text
固定公鲁尔芯子
适配2.4 mm内径软管
PP材质｜本色
```

**示例 4**

```text
固定公鲁尔芯子
适配2.4 mm内径软管
PA材质｜白色
```

**示例 5**

```text
固定公鲁尔芯子
适配3.2 mm内径软管
PP材质｜本色
```

**示例 6**

```text
固定公鲁尔芯子
适配3.2 mm内径软管
PA材质｜白色
```

**示例 7**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PP材质｜本色
```

**示例 8**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PA材质｜白色
```

**示例 9**

```text
旋转公鲁尔芯子
适配1.6 mm内径软管
PVDF材质｜本色
```

**示例 10**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PP材质｜本色
```

**示例 11**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PA材质｜白色
```

**示例 12**

```text
旋转公鲁尔芯子
适配2.4 mm内径软管
PVDF材质｜本色
```

### data\products\selection\luer-fitting-selection.summary.json

- 产品数量：0
- productTypeId：未找到
- 系列：未找到
- 型号式标题数量：0/0
- filter01 inputType：未找到

#### 当前卡片示例

### data\products\selection\luer-fitting-selection.summary.json.bak_20260712145555

- 产品数量：0
- productTypeId：未找到
- 系列：未找到
- 型号式标题数量：0/0
- filter01 inputType：未找到

#### 当前卡片示例

### data\products\selection\product-route-map.ts

- 产品数量：0
- productTypeId：未找到
- 系列：未找到
- 型号式标题数量：0/0
- filter01 inputType：未找到

#### 当前卡片示例

## 4. 页面接入情况

### components\products\selection\ProductSelectionClient.tsx

| 行号 | 内容 |
|---:|---|
| 71 | `luerFittingSelectionFilterLabels,` |
| 72 | `luerFittingSelectionProducts,` |
| 73 | `luerFittingSelectionTaxonomyItems,` |
| 74 | `} from "@/data/products/selection/luer-fitting-selection.generated";` |
| 115 | `...luerFittingSelectionProducts,` |
| 135 | `...luerFittingSelectionTaxonomyItems,` |
| 149 | `...luerFittingSelectionFilterLabels,` |
| 2967 | `* LUER_FILTER_OPTION_DISABLED_START` |
| 2969 | `* 鲁尔接头双向组合联动：` |
| 2977 | `"luer-fittings"` |
| 3079 | `/* LUER_FILTER_OPTION_DISABLED_END */` |

## 5. 下一步修改目标

确认生成脚本和型号解析无误后，按以下规则修改：

1. 卡片标题改为完整型号。
2. 普通鲁尔接头描述为：结构名称 / 接管或螺纹规格 / 材质。
3. 普通产品颜色只保留在筛选中。
4. LCR 色环保留材质和颜色。
5. LPT、LNS按附件逻辑显示，不套用软管适配描述。
6. 不修改现有筛选、联动置灰和详情链接。

