# 鲁尔接头与内螺纹互转接头详情页接入检查

生成时间：2026/7/13 00:02:14

> 本次只检查现有路由、详情页组件、数据结构、选型卡片链接和资源空状态，没有修改任何项目文件。

## 1. 截图中现有接头详情页的数据来源

### app/products/products.css

- 匹配内容：`螺纹转倒刺接头`
- 起始行：3496

```css
 3488 |   color: #a8b0bc !important;
 3489 | }
 3490 | 
 3491 | /* BARBED_PORT_FINAL_LAYOUT_END */
 3492 | 
 3493 | /* =========================================================
 3494 |    THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_START
 3495 | 
 3496 |    螺纹转倒刺接头筛选布局：
 3497 |    1. 密封方式 filter02：每个选项独占一整行
 3498 |    2. 连接结构 filter01：两个选项一排
 3499 |    3. 只影响 thread-to-barbed-fittings
 3500 |    ========================================================= */
 3501 | 
 3502 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3503 |   .filter-group-filter02
 3504 |   .filter-options,
 3505 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3506 |   [data-filter-key="filter02"]
 3507 |   .filter-options {
 3508 |   display: grid !important;
 3509 |   grid-template-columns: minmax(0, 1fr) !important;
 3510 | }
 3511 | 
 3512 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3513 |   .filter-group-filter01
 3514 |   .filter-options,
 3515 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3516 |   [data-filter-key="filter01"]
 3517 |   .filter-options {
 3518 |   display: grid !important;
```

### app/products/[category]/[slug]/[seriesSlug]/page.tsx

- 匹配内容：`螺纹转倒刺接头`
- 起始行：177

```tsx
  169 |       );
  170 | 
  171 |     return detail
  172 |       ? {
  173 |           detail,
  174 |           productTypeId:
  175 |             "thread-to-barbed-fittings",
  176 |           fallbackName:
  177 |             "螺纹转倒刺接头",
  178 |         }
  179 |       : null;
  180 |   }
  181 | 
  182 |   return null;
  183 | }
  184 | 
  185 | function toFittingClientData(
  186 |   resolved:
  187 |     ResolvedFittingDetail
  188 | ) {
  189 |   const {
  190 |     detail,
  191 |     productTypeId,
  192 |     fallbackName,
  193 |   } = resolved;
  194 | 
  195 |   const mainImage =
  196 |     detail.mainImage ||
  197 |     detail.image ||
  198 |     detail.heroImage ||
  199 |     detail.imageCard ||
```

### components/products/selection/ProductFilterGroup.tsx

- 匹配内容：`螺纹转倒刺接头`
- 起始行：19

```tsx
   11 |   onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
   12 | };
   13 | 
   14 | function getLayoutClass(
   15 |   group: ProductSelectionFilterGroup,
   16 |   activeProductTypeId?: string
   17 | ) {
   18 |   /*
   19 |    * 螺纹转倒刺接头专属布局：
   20 |    *
   21 |    * filter02 = 密封方式，每个选项占一整行；
   22 |    * filter01 = 连接结构，两个选项一排。
   23 |    */
   24 |   if (
   25 |     activeProductTypeId ===
   26 |     "thread-to-barbed-fittings"
   27 |   ) {
   28 |     if (group.key === "filter02") {
   29 |       return "one";
   30 |     }
   31 | 
   32 |     if (group.key === "filter01") {
   33 |       return "two";
   34 |     }
   35 |   }
   36 | 
   37 |   /*
   38 |    * 其他产品继续保持原来的公共布局。
   39 |    */
   40 |   if (
   41 |     group.key === "productType" ||
```

### components/products/selection/ProductSelectionClient.tsx

- 匹配内容：`螺纹转倒刺接头`
- 起始行：1005

```tsx
  997 | 
  998 |       return rawExistingHref ||
  999 |         "/products/fittings/quick-connect-fittings";
 1000 |     }
 1001 |   }
 1002 |   /* THREAD_TO_BARBED_DETAIL_HREF_START */
 1003 | 
 1004 |   /*
 1005 |    * 螺纹转倒刺接头具体型号详情链接。
 1006 |    *
 1007 |    * 优先按商品编码匹配，
 1008 |    * 避免相同基础型号、不同 O 圈配置产生重复地址。
 1009 |    */
 1010 |   {
 1011 |     const rawProductTypeId =
 1012 |       String(
 1013 |         (product as any)
 1014 |           ?.productTypeId ||
 1015 |         ""
 1016 |       ).trim();
 1017 | 
 1018 |     const rawExistingHref =
 1019 |       String(
 1020 |         (product as any)
 1021 |           ?.detailHref ||
 1022 |         (product as any)
 1023 |           ?.href ||
 1024 |         ""
 1025 |       ).trim();
 1026 | 
 1027 |     const isThreadToBarbed =
```

### data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：233

```json
  225 |     "productTypeName": "直通螺纹密封螺纹转倒刺接头",
  226 |     "productTypeLabel": "螺纹转倒刺接头",
  227 |     "productId": "809269",
  228 |     "productCode": "809269",
  229 |     "seriesId": "sa",
  230 |     "seriesCode": "SA",
  231 |     "seriesName": "直通螺纹密封螺纹转倒刺接头",
  232 |     "slug": "sa-u32-32f-pp-n",
  233 |     "model": "SA-U32-32F-PP-N",
  234 |     "name": "直通螺纹密封螺纹转倒刺接头",
  235 |     "title": "直通螺纹密封螺纹转倒刺接头",
  236 |     "displayName": "直通螺纹密封螺纹转倒刺接头",
  237 |     "productName": "直通螺纹密封螺纹转倒刺接头",
  238 |     "modelDisplay": "SA-U32-32F-PP-N",
  239 |     "displayModel": "SA-U32-32F-PP-N",
  240 |     "foreachModel": "SA-U32-32F-PP-N",
  241 |     "description": "SA-U32-32F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与3.2 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
  242 |     "shortDescription": "SA-U32-32F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与3.2 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
  243 |     "heroDescription": "SA-U32-32F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与3.2 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
  244 |     "advantages": [
  245 |       "10-32 UNF转3.2 mm内径软管",
  246 |       "螺纹密封",
  247 |       "直通型",
  248 |       "PP材质"
  249 |     ],
  250 |     "commonApplications": [
  251 |       "仪器内部液路转接",
  252 |       "泵阀螺纹接口与软管连接",
  253 |       "IVD与分析仪器流路",
  254 |       "实验室自动化设备液路"
  255 |     ],
```

### data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json

- 匹配内容：`809269`
- 起始行：227

```json
  219 |   {
  220 |     "sourceType": "fitting-detail",
  221 |     "category": "fittings",
  222 |     "categoryId": "fittings",
  223 |     "categoryLabel": "接头系列",
  224 |     "productTypeId": "thread-to-barbed-fittings",
  225 |     "productTypeName": "直通螺纹密封螺纹转倒刺接头",
  226 |     "productTypeLabel": "螺纹转倒刺接头",
  227 |     "productId": "809269",
  228 |     "productCode": "809269",
  229 |     "seriesId": "sa",
  230 |     "seriesCode": "SA",
  231 |     "seriesName": "直通螺纹密封螺纹转倒刺接头",
  232 |     "slug": "sa-u32-32f-pp-n",
  233 |     "model": "SA-U32-32F-PP-N",
  234 |     "name": "直通螺纹密封螺纹转倒刺接头",
  235 |     "title": "直通螺纹密封螺纹转倒刺接头",
  236 |     "displayName": "直通螺纹密封螺纹转倒刺接头",
  237 |     "productName": "直通螺纹密封螺纹转倒刺接头",
  238 |     "modelDisplay": "SA-U32-32F-PP-N",
  239 |     "displayModel": "SA-U32-32F-PP-N",
  240 |     "foreachModel": "SA-U32-32F-PP-N",
  241 |     "description": "SA-U32-32F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与3.2 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
  242 |     "shortDescription": "SA-U32-32F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与3.2 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
  243 |     "heroDescription": "SA-U32-32F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与3.2 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
  244 |     "advantages": [
  245 |       "10-32 UNF转3.2 mm内径软管",
  246 |       "螺纹密封",
  247 |       "直通型",
  248 |       "PP材质"
  249 |     ],
```

### data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json

- 匹配内容：`螺纹转倒刺接头`
- 起始行：8

```json
    1 | [
    2 |   {
    3 |     "sourceType": "fitting-detail",
    4 |     "category": "fittings",
    5 |     "categoryId": "fittings",
    6 |     "categoryLabel": "接头系列",
    7 |     "productTypeId": "thread-to-barbed-fittings",
    8 |     "productTypeName": "直通螺纹密封螺纹转倒刺接头",
    9 |     "productTypeLabel": "螺纹转倒刺接头",
   10 |     "productId": "809268",
   11 |     "productCode": "809268",
   12 |     "seriesId": "sa",
   13 |     "seriesCode": "SA",
   14 |     "seriesName": "直通螺纹密封螺纹转倒刺接头",
   15 |     "slug": "sa-u32-24f-pp-n",
   16 |     "model": "SA-U32-24F-PP-N",
   17 |     "name": "直通螺纹密封螺纹转倒刺接头",
   18 |     "title": "直通螺纹密封螺纹转倒刺接头",
   19 |     "displayName": "直通螺纹密封螺纹转倒刺接头",
   20 |     "productName": "直通螺纹密封螺纹转倒刺接头",
   21 |     "modelDisplay": "SA-U32-24F-PP-N",
   22 |     "displayModel": "SA-U32-24F-PP-N",
   23 |     "foreachModel": "SA-U32-24F-PP-N",
   24 |     "description": "SA-U32-24F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与2.4 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
   25 |     "shortDescription": "SA-U32-24F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与2.4 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
   26 |     "heroDescription": "SA-U32-24F-PP-N是一款直通螺纹密封螺纹转倒刺接头，适配10-32 UNF螺纹与2.4 mm内径软管，用于设备螺纹接口与软管液路之间的转接。采用PP材质，密封方式为螺纹密封，颜色为本色。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。",
   27 |     "advantages": [
   28 |       "10-32 UNF转2.4 mm内径软管",
   29 |       "螺纹密封",
   30 |       "直通型",
```

### data/products/selection/thread-to-barbed-detail-route-map.generated.ts

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：120

```ts
  112 |   "809953": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pk-n-o-ring",
  113 |   "839936": "/products/fittings/thread-to-barbed-fittings/sa-3-8npt-127-pp-n"
  114 | };
  115 | 
  116 | export const threadToBarbedDetailHrefByModel:
  117 |   Record<string, string> =
  118 | {
  119 |   "SA-U32-24F-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  120 |   "SA-U32-32F-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  121 |   "SA-U32-24F-PA-W": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  122 |   "SA-U32-16F-PA-W": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  123 |   "SA-U32-32F-PA-W": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  124 |   "SAL-U32-16D-PP-N": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  125 |   "SAL-U32-16D-PA-W": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  126 |   "SAL-U32-32D-PP-N": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  127 |   "SAL-U32-32D-PA-W": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  128 |   "SAL-U28-16D-PP-N": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  129 |   "SAL-U28-16D-PA-W": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  130 |   "SAL-U28-32D-PP-N": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  131 |   "SAL-U28-32D-PA-W": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  132 |   "SA-U28-16D-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  133 |   "SA-U28-24D-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  134 |   "SA-U28-32D-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  135 |   "SA-U28-40D-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  136 |   "SA-U28-48D-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  137 |   "SA-1/8NPT-24C-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  138 |   "SA-1/8NPT-32C-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
  139 |   "SA-1/8NPT-40C-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-40c-pp-n",
  140 |   "SA-1/8NPT-48C-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-48c-pp-n",
  141 |   "SA-1/8NPT-64C-PP-N": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-64c-pp-n",
  142 |   "SAL-1/8NPT-64D-PP-N": "/products/fittings/thread-to-barbed-fittings/sal-1-8npt-64d-pp-n",
```

### data/products/selection/thread-to-barbed-detail-route-map.generated.ts

- 匹配内容：`809269`
- 起始行：41

```ts
   33 |   "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
   34 |   "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
   35 |   "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
   36 |   "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
   37 |   "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
   38 |   "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
   39 |   "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
   40 |   "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
   41 |   "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
   42 |   "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
   43 |   "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
   44 |   "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
   45 |   "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
   46 |   "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
   47 |   "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
   48 |   "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
   49 |   "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
   50 |   "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
   51 |   "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
   52 |   "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
   53 |   "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
   54 |   "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
   55 |   "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
   56 |   "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
   57 |   "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
   58 |   "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
   59 |   "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
   60 |   "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
   61 |   "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
   62 |   "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
   63 |   "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
```

### data/products/selection/thread-to-barbed-detail-route-map.generated.ts

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```ts
    1 | /*
    2 |  * 自动生成：螺纹转倒刺接头详情路由映射
    3 |  *
    4 |  * 数据源：
    5 |  * data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json
    6 |  *
    7 |  * 不要手工修改。
    8 |  */
    9 | 
   10 | export const threadToBarbedDetailHrefByProductCode:
   11 |   Record<string, string> =
   12 | {
   13 |   "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
   14 |   "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
   15 |   "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
   16 |   "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
   17 |   "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
   18 |   "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
   19 |   "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
   20 |   "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
   21 |   "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
   22 |   "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
   23 |   "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
   24 |   "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
```

### data/products/selection/thread-to-barbed-fitting-selection.generated.ts

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：92

```ts
   84 |     "sourceType": "thread-to-barbed-fitting-selection",
   85 |     "categoryId": "fittings",
   86 |     "categoryLabel": "接头系列",
   87 |     "productTypeId": "thread-to-barbed-fittings",
   88 |     "productTypeName": "螺纹转倒刺接头",
   89 |     "seriesId": "sa",
   90 |     "seriesCode": "SA",
   91 |     "seriesName": "直通螺纹密封螺纹转倒刺接头",
   92 |     "model": "SA-U32-32F-PP-N",
   93 |     "cardTitle": {
   94 |       "zh": "SA-U32-32F-PP-N",
   95 |       "en": "SA-U32-32F-PP-N",
   96 |       "es": "SA-U32-32F-PP-N",
   97 |       "fr": "SA-U32-32F-PP-N",
   98 |       "ko": "SA-U32-32F-PP-N",
   99 |       "ru": "SA-U32-32F-PP-N"
  100 |     },
  101 |     "cardSubtitle": {
  102 |       "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转3.2 mm内径软管\nPP材质",
  103 |       "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
  104 |       "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
  105 |       "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
  106 |       "ko": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
  107 |       "ru": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material"
  108 |     },
  109 |     "filters": {
  110 |       "filter01": "直通型",
  111 |       "filter02": "螺纹密封",
  112 |       "filter03": "10-32 UNF",
  113 |       "filter04": "3.2 mm",
  114 |       "filter05": "PP",
```

### data/products/selection/thread-to-barbed-fitting-selection.generated.ts

- 匹配内容：`809269`
- 起始行：82

```ts
   74 |     "connectionStructure": "直通型",
   75 |     "sealingMethod": "螺纹密封",
   76 |     "threadSpecification": "10-32 UNF",
   77 |     "tubingInnerDiameter": "2.4 mm",
   78 |     "modelNote": "",
   79 |     "selectionHref": "/products/fittings/thread-to-barbed-fittings"
   80 |   },
   81 |   {
   82 |     "productId": "809269",
   83 |     "productCode": "809269",
   84 |     "sourceType": "thread-to-barbed-fitting-selection",
   85 |     "categoryId": "fittings",
   86 |     "categoryLabel": "接头系列",
   87 |     "productTypeId": "thread-to-barbed-fittings",
   88 |     "productTypeName": "螺纹转倒刺接头",
   89 |     "seriesId": "sa",
   90 |     "seriesCode": "SA",
   91 |     "seriesName": "直通螺纹密封螺纹转倒刺接头",
   92 |     "model": "SA-U32-32F-PP-N",
   93 |     "cardTitle": {
   94 |       "zh": "SA-U32-32F-PP-N",
   95 |       "en": "SA-U32-32F-PP-N",
   96 |       "es": "SA-U32-32F-PP-N",
   97 |       "fr": "SA-U32-32F-PP-N",
   98 |       "ko": "SA-U32-32F-PP-N",
   99 |       "ru": "SA-U32-32F-PP-N"
  100 |     },
  101 |     "cardSubtitle": {
  102 |       "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转3.2 mm内径软管\nPP材质",
  103 |       "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
  104 |       "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
```

### data/products/selection/thread-to-barbed-fitting-selection.generated.ts

- 匹配内容：`螺纹转倒刺接头`
- 起始行：3

```ts
    1 | /* =========================================================
    2 |    thread-to-barbed-fitting-selection.generated.ts
    3 |    来源：05_螺纹转倒刺接头
    4 |    数量：101
    5 |    筛选顺序：密封方式 → 连接结构 → 螺纹规格 → 接管内径 → 材质 → 颜色
    6 |    ========================================================= */
    7 | 
    8 | import type {
    9 |   ProductSelectionFilterLabel,
   10 |   ProductSelectionProduct,
   11 |   ProductSelectionTaxonomyItem,
   12 | } from "./product-selection.types";
   13 | 
   14 | export const threadToBarbedFittingSelectionProducts =
   15 | [
   16 |   {
   17 |     "productId": "809268",
   18 |     "productCode": "809268",
   19 |     "sourceType": "thread-to-barbed-fitting-selection",
   20 |     "categoryId": "fittings",
   21 |     "categoryLabel": "接头系列",
   22 |     "productTypeId": "thread-to-barbed-fittings",
   23 |     "productTypeName": "螺纹转倒刺接头",
   24 |     "seriesId": "sa",
   25 |     "seriesCode": "SA",
```

### data/products/selection/thread-to-barbed-fitting-selection.summary.json

- 匹配内容：`螺纹转倒刺接头`
- 起始行：4

```json
    1 | {
    2 |   "generatedAt": "2026-07-12T12:18:23.156Z",
    3 |   "sourceWorkbook": "data-source\\product-center\\fittings\\FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx",
    4 |   "sourceSheet": "05_螺纹转倒刺接头",
    5 |   "productTypeId": "thread-to-barbed-fittings",
    6 |   "total": 101,
    7 |   "seriesCounts": {
    8 |     "SA": 45,
    9 |     "SAL": 10,
   10 |     "SB": 34,
   11 |     "SBS": 4,
   12 |     "SBR": 3,
   13 |     "SC": 5
   14 |   },
   15 |   "structureCounts": {
   16 |     "直通型": 83,
   17 |     "L型": 10,
   18 |     "可旋转直通型": 3,
   19 |     "内螺纹直通型": 5
   20 |   },
   21 |   "sealingCounts": {
   22 |     "螺纹密封": 55,
   23 |     "底面密封": 41,
   24 |     "内螺纹连接": 5
   25 |   },
   26 |   "threadCounts": {
```

### reports/female-thread-adapter-selection-integration-audit.md

- 匹配内容：`螺纹转倒刺接头`
- 起始行：1715

```md
 1707 |  2842 |         ) {
 1708 | ```
 1709 | 
 1710 | 其余 1 处已省略。
 1711 | 
 1712 | ### 搜索：`isProductFilterOptionDisabled`
 1713 | 
 1714 | ```ts
 1715 |  2654 |  * 螺纹转倒刺接头筛选联动：
 1716 |  2655 |  *
 1717 |  2656 |  * 1. 选择接管内径后，不兼容的螺纹变灰；
 1718 |  2657 |  * 2. 选择螺纹后，不兼容的接管内径变灰；
 1719 |  2658 |  * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 1720 |  2659 |  * 4. 已选中的选项保留取消能力，不设置为禁用；
 1721 |  2660 |  * 5. 只影响 thread-to-barbed-fittings。
 1722 |  2661 |  */
 1723 |  2662 | function isProductFilterOptionDisabled(
 1724 |  2663 |   group: ProductSelectionFilterGroup,
 1725 |  2664 |   value: string
 1726 |  2665 | ) {
 1727 |  2666 |   /*
 1728 |  2667 |    * 保留原倒刺接头三端口禁用逻辑。
 1729 |  2668 |    */
 1730 |  2669 |   if (
 1731 |  2670 |     isBarbedPortOptionDisabled(
 1732 | ```
 1733 | 
 1734 | ```ts
 1735 |  3141 |                     ? activeCategory.description
 1736 |  3142 |                     : getText(locale, activeCategory.description as any, ""),
 1737 |  3143 |               }}
```

### reports/luer-fitting-selection-integration-audit.md

- 匹配内容：`螺纹转倒刺接头`
- 起始行：1899

```md
 1891 |  1742 |   }
 1892 |  1743 | 
 1893 |  1744 |   const tubeOdOrder = new Map<string, number>([
 1894 |  1745 |     ["1.6 mm", 10],
 1895 |  1746 |     ["1.8 mm", 20],
 1896 | ...
 1897 |  1771 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1898 |  1772 |  *
 1899 |  1773 |  * 螺纹转倒刺接头：
 1900 |  1774 |  * filter02 = 密封方式，每项独占一行
 1901 |  1775 |  * filter01 = 连接结构，两个一排
 1902 |  1776 |  */
 1903 |  1777 | function getProductFilterGroupLayout(
 1904 |  1778 |   productTypeId: string,
 1905 |  1779 |   filterKey: SelectionFilterKey
 1906 |  1780 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1907 |  1781 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1908 |  1782 |     return undefined;
 1909 |  1783 |   }
 1910 |  1784 | 
 1911 |  1785 |   if (filterKey === "filter02") {
 1912 |  1786 |     return "one";
 1913 |  1787 |   }
 1914 |  1788 | 
 1915 |  1789 |   if (filterKey === "filter01") {
 1916 |  1790 |     return "two";
 1917 |  1791 |   }
 1918 |  1792 | 
 1919 |  1793 |   return undefined;
 1920 |  1794 | }
 1921 |  1795 | export default function ProductSelectionClient({
```

### reports/thread-to-barbed-detail-audit.md

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：51

```md
   43 | productTypeId: "thread-to-barbed-fittings"
   44 | ```
   45 | 
   46 | ## 4. 型号与资源匹配
   47 | 
   48 | | 商品编码 | 型号 | slug | JPG | PDF |
   49 | |---|---|---|---|---|
   50 | | 809268 | SA-U32-24F-PP-N | sa-u32-24f-pp-n | SA-U32-24F-PP-N.jpg | 缺失 |
   51 | | 809269 | SA-U32-32F-PP-N | sa-u32-32f-pp-n | SA-U32-32F-PP-N.jpg | 缺失 |
   52 | | 809323 | SA-U32-24F-PA-W | sa-u32-24f-pa-w | SA-U32-24F-PA-W.jpg | 缺失 |
   53 | | 809339 | SA-U32-16F-PA-W | sa-u32-16f-pa-w | SA-U32-16F-PA-W.jpg | 缺失 |
   54 | | 809340 | SA-U32-32F-PA-W | sa-u32-32f-pa-w | SA-U32-32F-PA-W.jpg | 缺失 |
   55 | | 809382 | SAL-U32-16D-PP-N | sal-u32-16d-pp-n | SAL-U32-16D-PP-N.jpg | 缺失 |
   56 | | 809383 | SAL-U32-16D-PA-W | sal-u32-16d-pa-w | SAL-U32-16D-PA-W.jpg | 缺失 |
   57 | | 809384 | SAL-U32-32D-PP-N | sal-u32-32d-pp-n | SAL-U32-32D-PP-N.jpg | 缺失 |
   58 | | 809385 | SAL-U32-32D-PA-W | sal-u32-32d-pa-w | SAL-U32-32D-PA-W.jpg | 缺失 |
   59 | | 809386 | SAL-U28-16D-PP-N | sal-u28-16d-pp-n | SAL-U28-16D-PP-N.jpg | 缺失 |
   60 | | 809387 | SAL-U28-16D-PA-W | sal-u28-16d-pa-w | SAL-U28-16D-PA-W.jpg | 缺失 |
   61 | | 809388 | SAL-U28-32D-PP-N | sal-u28-32d-pp-n | SAL-U28-32D-PP-N.jpg | 缺失 |
   62 | | 809389 | SAL-U28-32D-PA-W | sal-u28-32d-pa-w | SAL-U28-32D-PA-W.jpg | 缺失 |
   63 | | 809465 | SA-U28-16D-PP-N | sa-u28-16d-pp-n | SA-U28-16D-PP-N.jpg | 缺失 |
   64 | | 809466 | SA-U28-24D-PP-N | sa-u28-24d-pp-n | SA-U28-24D-PP-N.jpg | 缺失 |
   65 | | 809467 | SA-U28-32D-PP-N | sa-u28-32d-pp-n | SA-U28-32D-PP-N.jpg | 缺失 |
   66 | | 809468 | SA-U28-40D-PP-N | sa-u28-40d-pp-n | SA-U28-40D-PP-N.jpg | 缺失 |
   67 | | 809469 | SA-U28-48D-PP-N | sa-u28-48d-pp-n | SA-U28-48D-PP-N.jpg | 缺失 |
   68 | | 809470 | SA-1/8NPT-24C-PP-N | sa-1-8npt-24c-pp-n | 缺失 | 缺失 |
   69 | | 809471 | SA-1/8NPT-32C-PP-N | sa-1-8npt-32c-pp-n | 缺失 | 缺失 |
   70 | | 809472 | SA-1/8NPT-40C-PP-N | sa-1-8npt-40c-pp-n | 缺失 | 缺失 |
   71 | | 809473 | SA-1/8NPT-48C-PP-N | sa-1-8npt-48c-pp-n | 缺失 | 缺失 |
   72 | | 809474 | SA-1/8NPT-64C-PP-N | sa-1-8npt-64c-pp-n | 缺失 | 缺失 |
   73 | | 809475 | SAL-1/8NPT-64D-PP-N | sal-1-8npt-64d-pp-n | 缺失 | 缺失 |
```

### reports/thread-to-barbed-detail-audit.md

- 匹配内容：`809269`
- 起始行：51

```md
   43 | productTypeId: "thread-to-barbed-fittings"
   44 | ```
   45 | 
   46 | ## 4. 型号与资源匹配
   47 | 
   48 | | 商品编码 | 型号 | slug | JPG | PDF |
   49 | |---|---|---|---|---|
   50 | | 809268 | SA-U32-24F-PP-N | sa-u32-24f-pp-n | SA-U32-24F-PP-N.jpg | 缺失 |
   51 | | 809269 | SA-U32-32F-PP-N | sa-u32-32f-pp-n | SA-U32-32F-PP-N.jpg | 缺失 |
   52 | | 809323 | SA-U32-24F-PA-W | sa-u32-24f-pa-w | SA-U32-24F-PA-W.jpg | 缺失 |
   53 | | 809339 | SA-U32-16F-PA-W | sa-u32-16f-pa-w | SA-U32-16F-PA-W.jpg | 缺失 |
   54 | | 809340 | SA-U32-32F-PA-W | sa-u32-32f-pa-w | SA-U32-32F-PA-W.jpg | 缺失 |
   55 | | 809382 | SAL-U32-16D-PP-N | sal-u32-16d-pp-n | SAL-U32-16D-PP-N.jpg | 缺失 |
   56 | | 809383 | SAL-U32-16D-PA-W | sal-u32-16d-pa-w | SAL-U32-16D-PA-W.jpg | 缺失 |
   57 | | 809384 | SAL-U32-32D-PP-N | sal-u32-32d-pp-n | SAL-U32-32D-PP-N.jpg | 缺失 |
   58 | | 809385 | SAL-U32-32D-PA-W | sal-u32-32d-pa-w | SAL-U32-32D-PA-W.jpg | 缺失 |
   59 | | 809386 | SAL-U28-16D-PP-N | sal-u28-16d-pp-n | SAL-U28-16D-PP-N.jpg | 缺失 |
   60 | | 809387 | SAL-U28-16D-PA-W | sal-u28-16d-pa-w | SAL-U28-16D-PA-W.jpg | 缺失 |
   61 | | 809388 | SAL-U28-32D-PP-N | sal-u28-32d-pp-n | SAL-U28-32D-PP-N.jpg | 缺失 |
   62 | | 809389 | SAL-U28-32D-PA-W | sal-u28-32d-pa-w | SAL-U28-32D-PA-W.jpg | 缺失 |
   63 | | 809465 | SA-U28-16D-PP-N | sa-u28-16d-pp-n | SA-U28-16D-PP-N.jpg | 缺失 |
   64 | | 809466 | SA-U28-24D-PP-N | sa-u28-24d-pp-n | SA-U28-24D-PP-N.jpg | 缺失 |
   65 | | 809467 | SA-U28-32D-PP-N | sa-u28-32d-pp-n | SA-U28-32D-PP-N.jpg | 缺失 |
   66 | | 809468 | SA-U28-40D-PP-N | sa-u28-40d-pp-n | SA-U28-40D-PP-N.jpg | 缺失 |
   67 | | 809469 | SA-U28-48D-PP-N | sa-u28-48d-pp-n | SA-U28-48D-PP-N.jpg | 缺失 |
   68 | | 809470 | SA-1/8NPT-24C-PP-N | sa-1-8npt-24c-pp-n | 缺失 | 缺失 |
   69 | | 809471 | SA-1/8NPT-32C-PP-N | sa-1-8npt-32c-pp-n | 缺失 | 缺失 |
   70 | | 809472 | SA-1/8NPT-40C-PP-N | sa-1-8npt-40c-pp-n | 缺失 | 缺失 |
   71 | | 809473 | SA-1/8NPT-48C-PP-N | sa-1-8npt-48c-pp-n | 缺失 | 缺失 |
   72 | | 809474 | SA-1/8NPT-64C-PP-N | sa-1-8npt-64c-pp-n | 缺失 | 缺失 |
   73 | | 809475 | SAL-1/8NPT-64D-PP-N | sal-1-8npt-64d-pp-n | 缺失 | 缺失 |
```

### reports/thread-to-barbed-detail-audit.md

- 匹配内容：`螺纹转倒刺接头`
- 起始行：1

```md
    1 | # 螺纹转倒刺接头详情页接入审计
    2 | 
    3 | 生成时间：2026/7/12 21:12:07
    4 | 
    5 | > 本次只检查，没有修改任何代码或文件。
    6 | 
    7 | ## 1. 数据概况
    8 | 
    9 | - 筛选型号数量：**101**
   10 | - JPG 文件数量：**90**
   11 | - PDF 文件数量：**59**
   12 | - JPG 成功匹配：**68**
   13 | - JPG 未匹配型号：**33**
   14 | - PDF 成功匹配：**0**
   15 | - PDF 未匹配型号：**101**
   16 | - 重复 slug 组数：**2**
   17 | 
   18 | ## 2. 系列数量
   19 | 
   20 | ```json
   21 | {
   22 |   "SA": 45,
   23 |   "SAL": 10,
```

### reports/thread-to-barbed-detail-generation-report.json

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：17

```json
    9 |   "missingJpgCount": 19,
   10 |   "copiedPdfCount": 0,
   11 |   "missingPdfCount": 101,
   12 |   "detailOutputPath": "F:\\WebsiteProjects\\foreach-website-2026\\data\\products\\generated\\fittings\\thread-to-barbed-fittings\\detail\\index.json",
   13 |   "jpgTargetDir": "F:\\WebsiteProjects\\foreach-website-2026\\public\\images\\products\\fittings\\thread-to-barbed-fittings\\details",
   14 |   "pdfTargetDir": "F:\\WebsiteProjects\\foreach-website-2026\\public\\documents\\products\\fittings\\thread-to-barbed-fittings\\drawings",
   15 |   "copiedJpg": [
   16 |     {
   17 |       "model": "SA-U32-32F-PP-N",
   18 |       "sourceFileName": "SA-U32-32F-PP-N.jpg",
   19 |       "targetFileName": "sa-u32-32f-pp-n.jpg"
   20 |     },
   21 |     {
   22 |       "model": "SA-U32-32F-PA-W",
   23 |       "sourceFileName": "SA-U32-32F-PA-W.jpg",
   24 |       "targetFileName": "sa-u32-32f-pa-w.jpg"
   25 |     },
   26 |     {
   27 |       "model": "SAL-U32-16D-PP-N",
   28 |       "sourceFileName": "SAL-U32-16D-PP-N.jpg",
   29 |       "targetFileName": "sal-u32-16d-pp-n.jpg"
   30 |     },
   31 |     {
   32 |       "model": "SAL-U32-16D-PA-W",
   33 |       "sourceFileName": "SAL-U32-16D-PA-W.jpg",
   34 |       "targetFileName": "sal-u32-16d-pa-w.jpg"
   35 |     },
   36 |     {
   37 |       "model": "SAL-U32-32D-PP-N",
   38 |       "sourceFileName": "SAL-U32-32D-PP-N.jpg",
   39 |       "targetFileName": "sal-u32-32d-pp-n.jpg"
```

### reports/thread-to-barbed-detail-generation-report.json

- 匹配内容：`809269`
- 起始行：533

```json
  525 |   "missingPdf": [
  526 |     {
  527 |       "model": "SA-U32-24F-PP-N",
  528 |       "productCode": "809268",
  529 |       "drawingCode": "√"
  530 |     },
  531 |     {
  532 |       "model": "SA-U32-32F-PP-N",
  533 |       "productCode": "809269",
  534 |       "drawingCode": "√"
  535 |     },
  536 |     {
  537 |       "model": "SA-U32-24F-PA-W",
  538 |       "productCode": "809323",
  539 |       "drawingCode": "√"
  540 |     },
  541 |     {
  542 |       "model": "SA-U32-16F-PA-W",
  543 |       "productCode": "809339",
  544 |       "drawingCode": "√"
  545 |     },
  546 |     {
  547 |       "model": "SA-U32-32F-PA-W",
  548 |       "productCode": "809340",
  549 |       "drawingCode": "√"
  550 |     },
  551 |     {
  552 |       "model": "SAL-U32-16D-PP-N",
  553 |       "productCode": "809382",
  554 |       "drawingCode": "√"
  555 |     },
```

### reports/thread-to-barbed-detail-generation-report.json

- 匹配内容：`螺纹转倒刺接头`
- 起始行：4

```json
    1 | {
    2 |   "generatedAt": "2026-07-12T13:16:17.313Z",
    3 |   "sourceWorkbook": "F:\\WebsiteProjects\\foreach-website-2026\\data-source\\product-center\\fittings\\FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx",
    4 |   "sourceSheet": "05_螺纹转倒刺接头",
    5 |   "selectionCount": 101,
    6 |   "excelRecordCount": 101,
    7 |   "generatedDetailCount": 101,
    8 |   "copiedJpgCount": 82,
    9 |   "missingJpgCount": 19,
   10 |   "copiedPdfCount": 0,
   11 |   "missingPdfCount": 101,
   12 |   "detailOutputPath": "F:\\WebsiteProjects\\foreach-website-2026\\data\\products\\generated\\fittings\\thread-to-barbed-fittings\\detail\\index.json",
   13 |   "jpgTargetDir": "F:\\WebsiteProjects\\foreach-website-2026\\public\\images\\products\\fittings\\thread-to-barbed-fittings\\details",
   14 |   "pdfTargetDir": "F:\\WebsiteProjects\\foreach-website-2026\\public\\documents\\products\\fittings\\thread-to-barbed-fittings\\drawings",
   15 |   "copiedJpg": [
   16 |     {
   17 |       "model": "SA-U32-32F-PP-N",
   18 |       "sourceFileName": "SA-U32-32F-PP-N.jpg",
   19 |       "targetFileName": "sa-u32-32f-pp-n.jpg"
   20 |     },
   21 |     {
   22 |       "model": "SA-U32-32F-PA-W",
   23 |       "sourceFileName": "SA-U32-32F-PA-W.jpg",
   24 |       "targetFileName": "sa-u32-32f-pa-w.jpg"
   25 |     },
   26 |     {
```

### reports/thread-to-barbed-filter-layout-audit.md

- 匹配内容：`螺纹转倒刺接头`
- 起始行：1

```md
    1 | # 螺纹转倒刺接头筛选布局检查报告
    2 | 
    3 | 生成时间：2026/7/12 21:00:33
    4 | 
    5 | > 本报告只读取当前本地项目，没有修改任何代码。
    6 | 
    7 | ## 1. 项目状态
    8 | 
    9 | - 当前分支：`dev-selection-cart-product-type-fix-20260710`
   10 | - 最新提交：`054bd43 wip: add hard tube fitting data and filter logic`
   11 | 
   12 | ```text
   13 | M app/products/[category]/[slug]/[seriesSlug]/page.tsx
   14 |  M app/products/products.css
   15 |  M components/products/detail/ProductDetailClient.tsx
   16 |  M components/products/selection/ProductFilterGroup.tsx
   17 |  M components/products/selection/ProductFilterPanel.tsx
   18 |  M components/products/selection/ProductSelectionClient.tsx
   19 |  M components/products/selection/product-selection-ui.types.ts
   20 |  M "data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_\350\277\236\346\216\245\344\273\266\346\240\207\345\223\201\345\234\250\345\224\256\346\270\205\345\215\225.xlsx"
   21 |  M "data-source/product-center/pumps/FOREACH_\346\263\265\347\263\273\345\210\227_\344\272\247\345\223\201\346\225\260\346\215\256\346\272\220.xlsx"
   22 |  M "data-source/product-center/pumps/FOREACH_\351\232\224\350\206\234\346\263\265\347\263\273\345\210\227_\344\272\247\345\223\201\346\225\260\346\215\256\346\272\220.xlsx"
   23 |  M "data-source/product-center/pumps/plunger-pump/FOREACH_\346\237\261\345\241\236\346\263\265\345\256\230\347\275\221\350\241\250\346\240\274\347\273\264\346\212\244\347\211\210_v4_\347\247\201\346\234\211\350\265\204\346\226\231\346\230\240\345\260\204\346\240\241\346\255\243\347\211\210.xlsx"
```

### reports/thread-to-barbed-jpg-import-report.json

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：23

```json
   15 |       "productCode": "809268",
   16 |       "model": "SA-U32-24F-PP-N",
   17 |       "sourceFileName": "SA-U32-24F-PP-N.jpg",
   18 |       "targetFileName": "sa-u32-24f-pp-n.jpg",
   19 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-24f-pp-n.jpg"
   20 |     },
   21 |     {
   22 |       "productCode": "809269",
   23 |       "model": "SA-U32-32F-PP-N",
   24 |       "sourceFileName": "SA-U32-32F-PP-N.jpg",
   25 |       "targetFileName": "sa-u32-32f-pp-n.jpg",
   26 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pp-n.jpg"
   27 |     },
   28 |     {
   29 |       "productCode": "809323",
   30 |       "model": "SA-U32-24F-PA-W",
   31 |       "sourceFileName": "SA-U32-24F-PA-W.jpg",
   32 |       "targetFileName": "sa-u32-24f-pa-w.jpg",
   33 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-24f-pa-w.jpg"
   34 |     },
   35 |     {
   36 |       "productCode": "809339",
   37 |       "model": "SA-U32-16F-PA-W",
   38 |       "sourceFileName": "SA-U32-16F-PA-W.jpg",
   39 |       "targetFileName": "sa-u32-16f-pa-w.jpg",
   40 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-16f-pa-w.jpg"
   41 |     },
   42 |     {
   43 |       "productCode": "809340",
   44 |       "model": "SA-U32-32F-PA-W",
   45 |       "sourceFileName": "SA-U32-32F-PA-W.jpg",
```

### reports/thread-to-barbed-jpg-import-report.json

- 匹配内容：`809269`
- 起始行：22

```json
   14 |     {
   15 |       "productCode": "809268",
   16 |       "model": "SA-U32-24F-PP-N",
   17 |       "sourceFileName": "SA-U32-24F-PP-N.jpg",
   18 |       "targetFileName": "sa-u32-24f-pp-n.jpg",
   19 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-24f-pp-n.jpg"
   20 |     },
   21 |     {
   22 |       "productCode": "809269",
   23 |       "model": "SA-U32-32F-PP-N",
   24 |       "sourceFileName": "SA-U32-32F-PP-N.jpg",
   25 |       "targetFileName": "sa-u32-32f-pp-n.jpg",
   26 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pp-n.jpg"
   27 |     },
   28 |     {
   29 |       "productCode": "809323",
   30 |       "model": "SA-U32-24F-PA-W",
   31 |       "sourceFileName": "SA-U32-24F-PA-W.jpg",
   32 |       "targetFileName": "sa-u32-24f-pa-w.jpg",
   33 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-24f-pa-w.jpg"
   34 |     },
   35 |     {
   36 |       "productCode": "809339",
   37 |       "model": "SA-U32-16F-PA-W",
   38 |       "sourceFileName": "SA-U32-16F-PA-W.jpg",
   39 |       "targetFileName": "sa-u32-16f-pa-w.jpg",
   40 |       "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-16f-pa-w.jpg"
   41 |     },
   42 |     {
   43 |       "productCode": "809340",
   44 |       "model": "SA-U32-32F-PA-W",
```

### reports/thread-to-barbed-real-render-audit.md

- 匹配内容：`螺纹转倒刺接头`
- 起始行：1908

```md
 1900 |  3488:   color: #a8b0bc !important;
 1901 |  3489: }
 1902 |  3490: 
 1903 |  3491: /* BARBED_PORT_FINAL_LAYOUT_END */
 1904 |  3492: 
 1905 |  3493: /* =========================================================
 1906 |  3494:    THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_START
 1907 |  3495: 
 1908 |  3496:    螺纹转倒刺接头筛选布局：
 1909 |  3497:    1. 密封方式 filter02：每个选项独占一整行
 1910 |  3498:    2. 连接结构 filter01：两个选项一排
 1911 |  3499:    3. 只影响 thread-to-barbed-fittings
 1912 |  3500:    ========================================================= */
 1913 |  3501: 
 1914 |  3502: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 1915 |  3503:   .filter-group-filter02
 1916 |  3504:   .filter-options,
 1917 |  3505: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 1918 |  3506:   [data-filter-key="filter02"]
 1919 |  3507:   .filter-options {
 1920 |  3508:   display: grid !important;
 1921 |  3509:   grid-template-columns: minmax(0, 1fr) !important;
 1922 |  3510: }
 1923 |  3511: 
 1924 |  3512: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 1925 |  3513:   .filter-group-filter01
 1926 |  3514:   .filter-options,
 1927 |  3515: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 1928 |  3516:   [data-filter-key="filter01"]
 1929 |  3517:   .filter-options {
 1930 |  3518:   display: grid !important;
```

### scripts/products/add-thread-to-barbed-disabled-linkage.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：65

```cjs
   57 |     "utf8"
   58 |   );
   59 | 
   60 |   console.log("已修改：" + filePath);
   61 | }
   62 | 
   63 | /* =========================================================
   64 |    1. ProductSelectionClient
   65 |    增加螺纹转倒刺接头选项联动判断
   66 |    ========================================================= */
   67 | 
   68 | let clientSource = read(clientPath);
   69 | 
   70 | const clientStartMarker =
   71 |   "THREAD_TO_BARBED_OPTION_DISABLED_START";
   72 | 
   73 | if (!clientSource.includes(clientStartMarker)) {
   74 |   const insertAnchor =
   75 |     "/* BARBED_PORT_OPTION_DISABLED_END */";
   76 | 
   77 |   if (!clientSource.includes(insertAnchor)) {
   78 |     throw new Error(
   79 |       "ProductSelectionClient.tsx 中未找到 BARBED_PORT_OPTION_DISABLED_END。"
   80 |     );
   81 |   }
   82 | 
   83 |   const disabledFunction = `
   84 | 
   85 | /* THREAD_TO_BARBED_OPTION_DISABLED_START */
   86 | 
   87 | /*
```

### scripts/products/audit-luer-female-thread-detail-integration.cjs

- 匹配内容：`SA-U32-32F-PP-N`
- 起始行：309

```cjs
  301 | const allFiles =
  302 |   walk(root);
  303 | 
  304 | /* =========================================================
  305 |    1. 查找截图中的现有详情页来源
  306 |    ========================================================= */
  307 | 
  308 | const sampleTerms = [
  309 |   "SA-U32-32F-PP-N",
  310 |   "809269",
  311 |   "螺纹转倒刺接头",
  312 | ];
  313 | 
  314 | const sampleMatches = [];
  315 | 
  316 | for (
  317 |   const filePath
  318 |   of allFiles
  319 | ) {
  320 |   let source = "";
  321 | 
  322 |   try {
  323 |     source =
  324 |       read(filePath);
  325 |   } catch {
  326 |     continue;
  327 |   }
  328 | 
  329 |   for (
  330 |     const term
  331 |     of sampleTerms
```

### scripts/products/audit-luer-female-thread-detail-integration.cjs

- 匹配内容：`809269`
- 起始行：310

```cjs
  302 |   walk(root);
  303 | 
  304 | /* =========================================================
  305 |    1. 查找截图中的现有详情页来源
  306 |    ========================================================= */
  307 | 
  308 | const sampleTerms = [
  309 |   "SA-U32-32F-PP-N",
  310 |   "809269",
  311 |   "螺纹转倒刺接头",
  312 | ];
  313 | 
  314 | const sampleMatches = [];
  315 | 
  316 | for (
  317 |   const filePath
  318 |   of allFiles
  319 | ) {
  320 |   let source = "";
  321 | 
  322 |   try {
  323 |     source =
  324 |       read(filePath);
  325 |   } catch {
  326 |     continue;
  327 |   }
  328 | 
  329 |   for (
  330 |     const term
  331 |     of sampleTerms
  332 |   ) {
```

### scripts/products/audit-luer-female-thread-detail-integration.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：311

```cjs
  303 | 
  304 | /* =========================================================
  305 |    1. 查找截图中的现有详情页来源
  306 |    ========================================================= */
  307 | 
  308 | const sampleTerms = [
  309 |   "SA-U32-32F-PP-N",
  310 |   "809269",
  311 |   "螺纹转倒刺接头",
  312 | ];
  313 | 
  314 | const sampleMatches = [];
  315 | 
  316 | for (
  317 |   const filePath
  318 |   of allFiles
  319 | ) {
  320 |   let source = "";
  321 | 
  322 |   try {
  323 |     source =
  324 |       read(filePath);
  325 |   } catch {
  326 |     continue;
  327 |   }
  328 | 
  329 |   for (
  330 |     const term
  331 |     of sampleTerms
  332 |   ) {
  333 |     const index =
```

### scripts/products/audit-thread-to-barbed-detail.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | /**
    2 |  * 螺纹转倒刺接头详情页接入审计
    3 |  *
    4 |  * 只读取，不修改任何项目文件。
    5 |  *
    6 |  * 输出：
    7 |  * reports/thread-to-barbed-detail-audit.md
    8 |  *
    9 |  * 使用：
   10 |  * node scripts/products/audit-thread-to-barbed-detail.cjs
   11 |  */
   12 | 
   13 | const fs = require("fs");
   14 | const path = require("path");
   15 | const Module = require("module");
   16 | const ts = require("typescript");
   17 | 
   18 | const root = process.cwd();
   19 | 
   20 | const sourceJpgDir = String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图_JPG`;
   21 | const sourcePdfDir = String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图纸_PDF`;
   22 | 
   23 | const selectionPath = path.join(
   24 |   root,
```

### scripts/products/audit-thread-to-barbed-filter-layout.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | ﻿/**
    2 |  * 审计螺纹转倒刺接头筛选布局
    3 |  *
    4 |  * 只读取，不修改任何项目文件。
    5 |  *
    6 |  * 输出：
    7 |  * reports/thread-to-barbed-filter-layout-audit.md
    8 |  *
    9 |  * 使用：
   10 |  * node scripts/products/audit-thread-to-barbed-filter-layout.cjs
   11 |  */
   12 | 
   13 | const fs = require("fs");
   14 | const path = require("path");
   15 | const childProcess = require("child_process");
   16 | 
   17 | const root = process.cwd();
   18 | 
   19 | const files = {
   20 |   client: path.join(
   21 |     root,
   22 |     "components",
   23 |     "products",
   24 |     "selection",
```

### scripts/products/connect-thread-to-barbed-detail-href.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：140

```cjs
  132 |   if (model) {
  133 |     hrefByModel[
  134 |       model
  135 |     ] = href;
  136 |   }
  137 | }
  138 | 
  139 | const routeMapSource = `/*
  140 |  * 自动生成：螺纹转倒刺接头详情路由映射
  141 |  *
  142 |  * 数据源：
  143 |  * data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json
  144 |  *
  145 |  * 不要手工修改。
  146 |  */
  147 | 
  148 | export const threadToBarbedDetailHrefByProductCode:
  149 |   Record<string, string> =
  150 | ${JSON.stringify(
  151 |   hrefByProductCode,
  152 |   null,
  153 |   2
  154 | )};
  155 | 
  156 | export const threadToBarbedDetailHrefByModel:
  157 |   Record<string, string> =
  158 | ${JSON.stringify(
  159 |   hrefByModel,
  160 |   null,
  161 |   2
  162 | )};
```

### scripts/products/connect-thread-to-barbed-selection-client.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | /**
    2 |  * 将螺纹转倒刺接头筛选数据接入 ProductSelectionClient.tsx
    3 |  *
    4 |  * 仅修改：
    5 |  * components/products/selection/ProductSelectionClient.tsx
    6 |  *
    7 |  * 不修改：
    8 |  * - product-route-map.ts
    9 |  * - 详情页
   10 |  * - 公共样式
   11 |  *
   12 |  * 使用：
   13 |  * node scripts/products/connect-thread-to-barbed-selection-client.cjs
   14 |  */
   15 | 
   16 | const fs = require("fs");
   17 | const path = require("path");
   18 | 
   19 | const root = process.cwd();
   20 | 
   21 | const targetPath = path.join(
   22 |   root,
   23 |   "components",
   24 |   "products",
```

### scripts/products/fix-thread-to-barbed-filter-layout-css.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：113

```cjs
  105 |   .replace(oldBlockPattern, "")
  106 |   .trimEnd();
  107 | 
  108 | const cssPatch = `
  109 | 
  110 | /* =========================================================
  111 |    THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_START
  112 | 
  113 |    螺纹转倒刺接头筛选布局：
  114 |    1. 密封方式 filter02：每个选项独占一整行
  115 |    2. 连接结构 filter01：两个选项一排
  116 |    3. 只影响 thread-to-barbed-fittings
  117 |    ========================================================= */
  118 | 
  119 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  120 |   .filter-group-filter02
  121 |   .filter-options,
  122 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  123 |   [data-filter-key="filter02"]
  124 |   .filter-options {
  125 |   display: grid !important;
  126 |   grid-template-columns: minmax(0, 1fr) !important;
  127 | }
  128 | 
  129 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  130 |   .filter-group-filter01
  131 |   .filter-options,
  132 | .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  133 |   [data-filter-key="filter01"]
  134 |   .filter-options {
  135 |   display: grid !important;
```

### scripts/products/fix-thread-to-barbed-filter-layout-final.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：115

```cjs
  107 | const layoutFunctionPattern =
  108 |   /function getLayoutClass\([\s\S]*?\n\}/;
  109 | 
  110 | const newLayoutFunction = `function getLayoutClass(
  111 |   group: ProductSelectionFilterGroup,
  112 |   activeProductTypeId?: string
  113 | ) {
  114 |   /*
  115 |    * 螺纹转倒刺接头专属布局：
  116 |    *
  117 |    * filter02 = 密封方式，每个选项占一整行；
  118 |    * filter01 = 连接结构，两个选项一排。
  119 |    */
  120 |   if (
  121 |     activeProductTypeId ===
  122 |     "thread-to-barbed-fittings"
  123 |   ) {
  124 |     if (group.key === "filter02") {
  125 |       return "one";
  126 |     }
  127 | 
  128 |     if (group.key === "filter01") {
  129 |       return "two";
  130 |     }
  131 |   }
  132 | 
  133 |   /*
  134 |    * 其他产品继续保持原来的公共布局。
  135 |    */
  136 |   if (
  137 |     group.key === "productType" ||
```

### scripts/products/fix-thread-to-barbed-filter-order.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | /**
    2 |  * 调整螺纹转倒刺接头筛选顺序与分类
    3 |  *
    4 |  * 调整后：
    5 |  * 1. 密封方式排在连接结构前面
    6 |  * 2. SA / SAL = 螺纹密封
    7 |  * 3. SB / SBS / SBR = 底面密封
    8 |  * 4. SC = 内螺纹转倒刺
    9 |  * 5. SC 的连接结构改为直通型
   10 |  *
   11 |  * 同时修改：
   12 |  * - 当前生成数据
   13 |  * - 后续数据生成脚本
   14 |  *
   15 |  * 使用：
   16 |  * node scripts/products/fix-thread-to-barbed-filter-order.cjs
   17 |  */
   18 | 
   19 | const fs = require("fs");
   20 | const path = require("path");
   21 | const Module = require("module");
   22 | const ts = require("typescript");
   23 | 
   24 | const root = process.cwd();
```

### scripts/products/generate-thread-to-barbed-detail-data.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：13

```cjs
    5 | const ts = require("typescript");
    6 | 
    7 | const root = process.cwd();
    8 | 
    9 | const PRODUCT_TYPE_ID =
   10 |   "thread-to-barbed-fittings";
   11 | 
   12 | const SOURCE_SHEET =
   13 |   "05_螺纹转倒刺接头";
   14 | 
   15 | const selectionPath = path.join(
   16 |   root,
   17 |   "data",
   18 |   "products",
   19 |   "selection",
   20 |   "thread-to-barbed-fitting-selection.generated.ts"
   21 | );
   22 | 
   23 | const detailOutputPath = path.join(
   24 |   root,
   25 |   "data",
   26 |   "products",
   27 |   "generated",
   28 |   "fittings",
   29 |   PRODUCT_TYPE_ID,
   30 |   "detail",
   31 |   "index.json"
   32 | );
   33 | 
   34 | const reportPath = path.join(
   35 |   root,
```

### scripts/products/generate-thread-to-barbed-fitting-selection.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | /**
    2 |  * 生成螺纹转倒刺接头筛选数据
    3 |  *
    4 |  * 仅生成：
    5 |  * 1. data/products/selection/thread-to-barbed-fitting-selection.generated.ts
    6 |  * 2. data/products/selection/thread-to-barbed-fitting-selection.summary.json
    7 |  *
    8 |  * 不修改：
    9 |  * - ProductSelectionClient.tsx
   10 |  * - product-route-map.ts
   11 |  * - 详情页
   12 |  *
   13 |  * 使用：
   14 |  * node scripts/products/generate-thread-to-barbed-fitting-selection.cjs
   15 |  */
   16 | 
   17 | const fs = require("fs");
   18 | const path = require("path");
   19 | const Module = require("module");
   20 | const XLSX = require("xlsx");
   21 | const ts = require("typescript");
   22 | 
   23 | const root = process.cwd();
   24 | 
```

### scripts/products/import-thread-to-barbed-jpg-images.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | /**
    2 |  * 导入螺纹转倒刺接头 JPG 产品图，并写入筛选卡片 imageCard
    3 |  *
    4 |  * 本步骤只处理 JPG：
    5 |  * 来源：
    6 |  * H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图_JPG
    7 |  *
    8 |  * 目标：
    9 |  * public/images/products/fittings/thread-to-barbed-fittings/products/
   10 |  *
   11 |  * 同时更新：
   12 |  * data/products/selection/thread-to-barbed-fitting-selection.generated.ts
   13 |  *
   14 |  * 不处理 PDF，不创建详情页。
   15 |  *
   16 |  * 使用：
   17 |  * node scripts/products/import-thread-to-barbed-jpg-images.cjs
   18 |  */
   19 | 
   20 | const fs = require("fs");
   21 | const path = require("path");
   22 | const Module = require("module");
   23 | const ts = require("typescript");
   24 | 
```

### scripts/products/remove-thread-to-barbed-three-images.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：94

```cjs
   86 |   loaded._compile(compiled, filePath);
   87 | 
   88 |   return loaded.exports;
   89 | }
   90 | 
   91 | function createGeneratedSource(products, taxonomyItems, filterLabels) {
   92 |   return `/* =========================================================
   93 |    thread-to-barbed-fitting-selection.generated.ts
   94 |    来源：05_螺纹转倒刺接头
   95 |    数量：${products.length}
   96 |    指定型号产品图已移除
   97 |    自动生成，请勿手工修改
   98 |    ========================================================= */
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   ProductSelectionTaxonomyItem,
  104 | } from "./product-selection.types";
  105 | 
  106 | export const threadToBarbedFittingSelectionProducts =
  107 | ${JSON.stringify(products, null, 2)} as ProductSelectionProduct[];
  108 | 
  109 | export const threadToBarbedFittingTaxonomyItems =
  110 | ${JSON.stringify(taxonomyItems, null, 2)} as ProductSelectionTaxonomyItem[];
  111 | 
  112 | export const threadToBarbedFittingFilterLabels =
  113 | ${JSON.stringify(filterLabels, null, 2)} as ProductSelectionFilterLabel[];
  114 | `;
  115 | }
  116 | 
```

### scripts/products/set-thread-to-barbed-filter-layout.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：153

```cjs
  145 |   );
  146 | 
  147 |   write(groupFile, groupSource);
  148 | } else {
  149 |   console.log("ProductFilterGroup 已支持自定义布局，跳过。");
  150 | }
  151 | 
  152 | /* =========================================================
  153 |    3. 螺纹转倒刺接头指定布局
  154 |    filter02 密封方式：3个一排
  155 |    filter01 连接结构：2个一排
  156 |    ========================================================= */
  157 | 
  158 | let clientSource = read(clientFile);
  159 | 
  160 | const clientMarker =
  161 |   "THREAD_TO_BARBED_FILTER_GROUP_LAYOUT";
  162 | 
  163 | if (!clientSource.includes(clientMarker)) {
  164 |   const oldClientBlock = `groups.push({
  165 |         key: (label as any).filterKey,
  166 |         title: getText(locale, label.label, (label as any).filterKey),
  167 |         inputType: label.inputType,
  168 |         options: sortHardTubeFilterOptionsForDisplay(
  169 |           activeProductTypeId,
  170 |           (label as any).filterKey,
  171 |           options.map((option) => ({
  172 |             ...option,
  173 |             label: getLocalizedFilterOptionLabel(
  174 |               option.label || option.value,
  175 |               locale
```

### scripts/products/update-thread-to-barbed-card-copy.cjs

- 匹配内容：`螺纹转倒刺接头`
- 起始行：2

```cjs
    1 | /**
    2 |  * 修改螺纹转倒刺接头筛选卡片三行文案
    3 |  *
    4 |  * 只更新：
    5 |  * data/products/selection/thread-to-barbed-fitting-selection.generated.ts
    6 |  *
    7 |  * 不修改：
    8 |  * - 筛选字段
    9 |  * - 产品图片
   10 |  * - 页面路由
   11 |  * - 详情页
   12 |  *
   13 |  * 使用：
   14 |  * node scripts/products/update-thread-to-barbed-card-copy.cjs
   15 |  */
   16 | 
   17 | const fs = require("fs");
   18 | const path = require("path");
   19 | const Module = require("module");
   20 | const ts = require("typescript");
   21 | 
   22 | const root = process.cwd();
   23 | 
   24 | const generatedPath = path.join(
```

## 2. 动态详情路由

### app/products/[category]/[slug]/[seriesSlug]/page.tsx

- 文件：`app/products/[category]/[slug]/[seriesSlug]/page.tsx`
- 行数：512
- 大小：8399 bytes

#### 1. 页面入口与参数（第 33 行）

```tsx
   27 | 
   28 | import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";
   29 | 
   30 | import "../../../products.css";
   31 | 
   32 | type ProductsSeriesRoutePageProps = {
   33 |   params: Promise<{
   34 |     category: string;
   35 |     slug: string;
   36 |     seriesSlug: string;
   37 |   }>;
   38 | };
   39 | 
   40 | type FittingDetailRecord = {
   41 |   slug: string;
   42 |   model: string;
   43 | 
   44 |   title?: string;
   45 |   name?: string;
   46 |   description?: string;
   47 | 
   48 |   sourceType?: string;
   49 |   category?: string;
```

#### 2. 页面入口与参数（第 324 行）

```tsx
  318 | 
  319 |     selectionHref:
  320 |       `/products/fittings/${productTypeId}`,
  321 |   };
  322 | }
  323 | 
  324 | export function generateStaticParams() {
  325 |   const existingSeriesParams =
  326 |     getSeriesRouteParams();
  327 | 
  328 |   const hardTubeParams =
  329 |     hardTubeDetails.map(
  330 |       (detail) => ({
  331 |         category:
  332 |           "fittings",
  333 | 
  334 |         slug:
  335 |           "hard-tube-fittings",
  336 | 
  337 |         seriesSlug:
  338 |           normalizeSegment(
  339 |             detail.slug
  340 |           ),
```

#### 3. 页面入口与参数（第 393 行）

```tsx
  387 |   return Array.from(
  388 |     routeMap.values()
  389 |   );
  390 | }
  391 | 
  392 | export async function generateMetadata({
  393 |   params,
  394 | }: ProductsSeriesRoutePageProps): Promise<Metadata> {
  395 |   const {
  396 |     category,
  397 |     slug,
  398 |     seriesSlug,
  399 |   } = await params;
  400 | 
  401 |   const fittingDetail =
  402 |     findFittingDetail(
  403 |       category,
  404 |       slug,
  405 |       seriesSlug
  406 |     );
  407 | 
  408 |   if (fittingDetail) {
  409 |     const {
```

#### 4. 页面入口与参数（第 399 行）

```tsx
  393 |   params,
  394 | }: ProductsSeriesRoutePageProps): Promise<Metadata> {
  395 |   const {
  396 |     category,
  397 |     slug,
  398 |     seriesSlug,
  399 |   } = await params;
  400 | 
  401 |   const fittingDetail =
  402 |     findFittingDetail(
  403 |       category,
  404 |       slug,
  405 |       seriesSlug
  406 |     );
  407 | 
  408 |   if (fittingDetail) {
  409 |     const {
  410 |       detail,
  411 |       fallbackName,
  412 |     } = fittingDetail;
  413 | 
  414 |     return {
  415 |       title:
```

#### 5. 页面入口与参数（第 450 行）

```tsx
  444 | 
  445 |     description:
  446 |       route.description,
  447 |   };
  448 | }
  449 | 
  450 | export default async function ProductsSeriesRoutePage({
  451 |   params,
  452 | }: ProductsSeriesRoutePageProps) {
  453 |   const {
  454 |     category,
  455 |     slug,
  456 |     seriesSlug,
  457 |   } = await params;
  458 | 
  459 |   const fittingDetail =
  460 |     findFittingDetail(
  461 |       category,
  462 |       slug,
  463 |       seriesSlug
  464 |     );
  465 | 
  466 |   if (fittingDetail) {
```

#### 6. 页面入口与参数（第 451 行）

```tsx
  445 |     description:
  446 |       route.description,
  447 |   };
  448 | }
  449 | 
  450 | export default async function ProductsSeriesRoutePage({
  451 |   params,
  452 | }: ProductsSeriesRoutePageProps) {
  453 |   const {
  454 |     category,
  455 |     slug,
  456 |     seriesSlug,
  457 |   } = await params;
  458 | 
  459 |   const fittingDetail =
  460 |     findFittingDetail(
  461 |       category,
  462 |       slug,
  463 |       seriesSlug
  464 |     );
  465 | 
  466 |   if (fittingDetail) {
  467 |     return (
```

#### 7. 页面入口与参数（第 457 行）

```tsx
  451 |   params,
  452 | }: ProductsSeriesRoutePageProps) {
  453 |   const {
  454 |     category,
  455 |     slug,
  456 |     seriesSlug,
  457 |   } = await params;
  458 | 
  459 |   const fittingDetail =
  460 |     findFittingDetail(
  461 |       category,
  462 |       slug,
  463 |       seriesSlug
  464 |     );
  465 | 
  466 |   if (fittingDetail) {
  467 |     return (
  468 |       <ProductDetailView
  469 |         data={
  470 |           toFittingClientData(
  471 |             fittingDetail
  472 |           )
  473 |         }
```

#### 8. 产品数据读取（第 18 行）

```tsx
   12 | 
   13 | import {
   14 |   Suspense,
   15 | } from "react";
   16 | 
   17 | import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
   18 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   19 | import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
   20 | 
   21 | import {
   22 |   getSeriesRouteParams,
   23 |   resolveSeriesRoute,
   24 | } from "@/data/products/selection/product-route-map";
   25 | 
   26 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
   27 | 
   28 | import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";
   29 | 
   30 | import "../../../products.css";
   31 | 
   32 | type ProductsSeriesRoutePageProps = {
   33 |   params: Promise<{
   34 |     category: string;
```

#### 9. 产品数据读取（第 18 行）

```tsx
   12 | 
   13 | import {
   14 |   Suspense,
   15 | } from "react";
   16 | 
   17 | import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
   18 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   19 | import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
   20 | 
   21 | import {
   22 |   getSeriesRouteParams,
   23 |   resolveSeriesRoute,
   24 | } from "@/data/products/selection/product-route-map";
   25 | 
   26 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
   27 | 
   28 | import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";
   29 | 
   30 | import "../../../products.css";
   31 | 
   32 | type ProductsSeriesRoutePageProps = {
   33 |   params: Promise<{
   34 |     category: string;
```

#### 10. 产品数据读取（第 94 行）

```tsx
   88 |   hardTubeDetailsJson as FittingDetailRecord[];
   89 | 
   90 | const threadToBarbedDetails =
   91 |   threadToBarbedDetailsJson as FittingDetailRecord[];
   92 | 
   93 | const ProductDetailView =
   94 |   ProductDetailClient as unknown as ComponentType<{
   95 |     data: any;
   96 |   }>;
   97 | 
   98 | export const dynamicParams =
   99 |   false;
  100 | 
  101 | function normalizeSegment(
  102 |   value: unknown
  103 | ) {
  104 |   return (
  105 |     String(value || "")
  106 |       .trim()
  107 |       .toLowerCase()
  108 |       .split("/")
  109 |       .filter(Boolean)
  110 |       .pop() || ""
```

#### 11. 404处理（第 10 行）

```tsx
    4 | 
    5 | import type {
    6 |   Metadata,
    7 | } from "next";
    8 | 
    9 | import {
   10 |   notFound,
   11 | } from "next/navigation";
   12 | 
   13 | import {
   14 |   Suspense,
   15 | } from "react";
   16 | 
   17 | import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
   18 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   19 | import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
   20 | 
   21 | import {
   22 |   getSeriesRouteParams,
   23 |   resolveSeriesRoute,
   24 | } from "@/data/products/selection/product-route-map";
   25 | 
   26 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
```

#### 12. 404处理（第 486 行）

```tsx
  480 |       category,
  481 |       slug,
  482 |       seriesSlug
  483 |     );
  484 | 
  485 |   if (!route) {
  486 |     notFound();
  487 |   }
  488 | 
  489 |   return (
  490 |     <Suspense
  491 |       fallback={
  492 |         <ProductPageSkeleton
  493 |           variant="selection"
  494 |         />
  495 |       }
  496 |     >
  497 |       <ProductSelectionClient
  498 |         locale="zh"
  499 |         initialCategoryId={
  500 |           route.categoryId
  501 |         }
  502 |         initialProductTypeId={
```

### app/[locale]/products/[category]/[slug]/[seriesSlug]/page.tsx

未找到：`app/[locale]/products/[category]/[slug]/[seriesSlug]/page.tsx`

## 3. ProductDetailClient 数据结构和功能

### components/products/detail/ProductDetailClient.tsx

- 文件：`components/products/detail/ProductDetailClient.tsx`
- 行数：1347
- 大小：42597 bytes

#### 1. 组件参数与详情数据类型（第 27 行）

```tsx
   21 | 
   22 | import SitePageShell from "@/components/layout/SitePageShell";
   23 | import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
   24 | import { useMemo, useState } from "react";
   25 | 
   26 | import type { CSSProperties, MouseEvent } from "react";
   27 | import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
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
   39 |   "--zoom-y"?: string;
   40 | };
   41 | 
   42 | function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
   43 |   const normalizedConfiguredUrl = configuredUrl?.trim();
```

#### 2. 组件参数与详情数据类型（第 31 行）

```tsx
   25 | 
   26 | import type { CSSProperties, MouseEvent } from "react";
   27 | import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
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
   39 |   "--zoom-y"?: string;
   40 | };
   41 | 
   42 | function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
   43 |   const normalizedConfiguredUrl = configuredUrl?.trim();
   44 | 
   45 |   if (normalizedConfiguredUrl) {
   46 |     return normalizedConfiguredUrl.includes("#")
   47 |       ? normalizedConfiguredUrl
```

#### 3. 组件参数与详情数据类型（第 33 行）

```tsx
   27 | import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
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
   39 |   "--zoom-y"?: string;
   40 | };
   41 | 
   42 | function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
   43 |   const normalizedConfiguredUrl = configuredUrl?.trim();
   44 | 
   45 |   if (normalizedConfiguredUrl) {
   46 |     return normalizedConfiguredUrl.includes("#")
   47 |       ? normalizedConfiguredUrl
   48 |       : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
   49 |   }
```

#### 4. 组件参数与详情数据类型（第 515 行）

```tsx
  509 |         </a>
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
  523 |   const [isZooming, setIsZooming] = useState(false);
  524 |   const [zoomPosition, setZoomPosition] = useState({
  525 |     x: 50,
  526 |     y: 50,
  527 |   });
  528 | 
  529 |   const realImages = useMemo(() => {
  530 |     const images: string[] = [];
  531 | 
```

#### 5. 主图与缩略图（第 530 行）

```tsx
  524 |   const [zoomPosition, setZoomPosition] = useState({
  525 |     x: 50,
  526 |     y: 50,
  527 |   });
  528 | 
  529 |   const realImages = useMemo(() => {
  530 |     const images: string[] = [];
  531 | 
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
```

#### 6. 主图与缩略图（第 532 行）

```tsx
  526 |     y: 50,
  527 |   });
  528 | 
  529 |   const realImages = useMemo(() => {
  530 |     const images: string[] = [];
  531 | 
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
```

#### 7. 主图与缩略图（第 533 行）

```tsx
  527 |   });
  528 | 
  529 |   const realImages = useMemo(() => {
  530 |     const images: string[] = [];
  531 | 
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
```

#### 8. 主图与缩略图（第 533 行）

```tsx
  527 |   });
  528 | 
  529 |   const realImages = useMemo(() => {
  530 |     const images: string[] = [];
  531 | 
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
```

#### 9. 主图与缩略图（第 536 行）

```tsx
  530 |     const images: string[] = [];
  531 | 
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
  550 |   /*
  551 |    * 正式数据中：
  552 |    * 只有主图且没有附属图时，不显示缩略图栏。
```

#### 10. 主图与缩略图（第 537 行）

```tsx
  531 | 
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
  550 |   /*
  551 |    * 正式数据中：
  552 |    * 只有主图且没有附属图时，不显示缩略图栏。
  553 |    *
```

#### 11. 主图与缩略图（第 538 行）

```tsx
  532 |     if (data.mainImage) {
  533 |       images.push(data.mainImage);
  534 |     }
  535 | 
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
  550 |   /*
  551 |    * 正式数据中：
  552 |    * 只有主图且没有附属图时，不显示缩略图栏。
  553 |    *
  554 |    * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
```

#### 12. 主图与缩略图（第 542 行）

```tsx
  536 |     data.additionalImages.forEach((image) => {
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
  550 |   /*
  551 |    * 正式数据中：
  552 |    * 只有主图且没有附属图时，不显示缩略图栏。
  553 |    *
  554 |    * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
  555 |    * 三个 SVG 缩略图，便于核对版式。
  556 |    */
  557 |   const showThumbnailRow = hasRealImages
  558 |     ? realImages.length > 0
```

#### 13. 主图与缩略图（第 543 行）

```tsx
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
  550 |   /*
  551 |    * 正式数据中：
  552 |    * 只有主图且没有附属图时，不显示缩略图栏。
  553 |    *
  554 |    * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
  555 |    * 三个 SVG 缩略图，便于核对版式。
  556 |    */
  557 |   const showThumbnailRow = hasRealImages
  558 |     ? realImages.length > 0
  559 |     : true;
```

#### 14. 主图与缩略图（第 543 行）

```tsx
  537 |       if (image && !images.includes(image)) {
  538 |         images.push(image);
  539 |       }
  540 |     });
  541 | 
  542 |     return images;
  543 |   }, [data.additionalImages, data.mainImage]);
  544 | 
  545 |   const hasRealImages = realImages.length > 0;
  546 |   const activeRealImage = hasRealImages
  547 |     ? realImages[Math.min(activeThumb, realImages.length - 1)]
  548 |     : null;
  549 | 
  550 |   /*
  551 |    * 正式数据中：
  552 |    * 只有主图且没有附属图时，不显示缩略图栏。
  553 |    *
  554 |    * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
  555 |    * 三个 SVG 缩略图，便于核对版式。
  556 |    */
  557 |   const showThumbnailRow = hasRealImages
  558 |     ? realImages.length > 0
  559 |     : true;
```

#### 15. 主图与缩略图（第 671 行）

```tsx
  665 |       productName,
  666 |       productCode,
  667 |       foreachModel: modelText,
  668 |       competitorModels: [],
  669 |       quantity: 1,
  670 |       needDrawing,
  671 |       imagePath:
  672 |         data.imageCard ||
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
  687 |   const isDetailProductSelected = Boolean(currentDetailCartItem);
```

#### 16. 主图与缩略图（第 675 行）

```tsx
  669 |       quantity: 1,
  670 |       needDrawing,
  671 |       imagePath:
  672 |         data.imageCard ||
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
  687 |   const isDetailProductSelected = Boolean(currentDetailCartItem);
  688 |   const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);
  689 | 
  690 |   function handleOpenConfigurator() {
  691 |     console.info("配置选择端口预留", data.slug);
```

#### 17. 主图与缩略图（第 760 行）

```tsx
  754 |       ]}
  755 |     >
  756 |       <main className={styles.page} data-product-detail-page="true">
  757 |       <div className={styles.container}>
  758 |         
  759 |         <section className={styles.productTop}>
  760 |           <div data-product-gallery="true" className={styles.gallery} aria-label="产品图片区域">
  761 |             <div data-product-main-stage="true"
  762 |               className={[
  763 |                 styles.mainImage,
  764 |                 isZooming ? styles.isZooming : "",
  765 |               ]
  766 |                 .filter(Boolean)
  767 |                 .join(" ")}
  768 |               style={zoomStyle}
  769 |               onMouseEnter={() => setIsZooming(true)}
  770 |               onMouseLeave={() => setIsZooming(false)}
  771 |               onMouseMove={handleMainImageMove}
  772 |             >
  773 |               {activeRealImage ? (
  774 |                 <img data-product-main-image="true"
  775 |                   src={activeRealImage}
  776 |                   alt={(data as any).imageAltEn || (data as any).mainImageAlt || (data as any).imageAlt || `${data.model} ${data.name}`}
```

#### 18. 主图与缩略图（第 760 行）

```tsx
  754 |       ]}
  755 |     >
  756 |       <main className={styles.page} data-product-detail-page="true">
  757 |       <div className={styles.container}>
  758 |         
  759 |         <section className={styles.productTop}>
  760 |           <div data-product-gallery="true" className={styles.gallery} aria-label="产品图片区域">
  761 |             <div data-product-main-stage="true"
  762 |               className={[
  763 |                 styles.mainImage,
  764 |                 isZooming ? styles.isZooming : "",
  765 |               ]
  766 |                 .filter(Boolean)
  767 |                 .join(" ")}
  768 |               style={zoomStyle}
  769 |               onMouseEnter={() => setIsZooming(true)}
  770 |               onMouseLeave={() => setIsZooming(false)}
  771 |               onMouseMove={handleMainImageMove}
  772 |             >
  773 |               {activeRealImage ? (
  774 |                 <img data-product-main-image="true"
  775 |                   src={activeRealImage}
  776 |                   alt={(data as any).imageAltEn || (data as any).mainImageAlt || (data as any).imageAlt || `${data.model} ${data.name}`}
```

#### 19. 主图与缩略图（第 763 行）

```tsx
  757 |       <div className={styles.container}>
  758 |         
  759 |         <section className={styles.productTop}>
  760 |           <div data-product-gallery="true" className={styles.gallery} aria-label="产品图片区域">
  761 |             <div data-product-main-stage="true"
  762 |               className={[
  763 |                 styles.mainImage,
  764 |                 isZooming ? styles.isZooming : "",
  765 |               ]
  766 |                 .filter(Boolean)
  767 |                 .join(" ")}
  768 |               style={zoomStyle}
  769 |               onMouseEnter={() => setIsZooming(true)}
  770 |               onMouseLeave={() => setIsZooming(false)}
  771 |               onMouseMove={handleMainImageMove}
  772 |             >
  773 |               {activeRealImage ? (
  774 |                 <img data-product-main-image="true"
  775 |                   src={activeRealImage}
  776 |                   alt={(data as any).imageAltEn || (data as any).mainImageAlt || (data as any).imageAlt || `${data.model} ${data.name}`}
  777 |                 />
  778 |               ) : (
  779 |                 <svg
```

#### 20. 主图与缩略图（第 776 行）

```tsx
  770 |               onMouseLeave={() => setIsZooming(false)}
  771 |               onMouseMove={handleMainImageMove}
  772 |             >
  773 |               {activeRealImage ? (
  774 |                 <img data-product-main-image="true"
  775 |                   src={activeRealImage}
  776 |                   alt={(data as any).imageAltEn || (data as any).mainImageAlt || (data as any).imageAlt || `${data.model} ${data.name}`}
  777 |                 />
  778 |               ) : (
  779 |                 <svg
  780 |                   className={styles.pumpSvg}
  781 |                   viewBox="0 0 520 310"
  782 |                   aria-hidden="true"
  783 |                 >
  784 |                   <g transform="translate(34, 84)">
  785 |                     <rect
  786 |                       x="0"
  787 |                       y="52"
  788 |                       width="54"
  789 |                       height="20"
  790 |                       fill="#ffffff"
  791 |                       stroke="#d7dee8"
  792 |                       strokeWidth="2"
```

#### 21. 型号选择（第 164 行）

```tsx
  158 | 
  159 | function getModelActionText(data: any): string {
  160 |   if (isTubingDetailData(data)) {
  161 |     return "选择型号";
  162 |   }
  163 | 
  164 |   return isCustomInquiryMode(data) ? "联系我们" : "型号选择";
  165 | }
  166 | 
  167 | function isPlungerPumpDetailData(data: any): boolean {
  168 |   const text = JSON.stringify(data || {}).toLowerCase();
  169 | 
  170 |   return (
  171 |     text.includes("柱塞泵") ||
  172 |     text.includes("plunger pump") ||
  173 |     text.includes("plunger-pumps") ||
  174 |     text.includes("piston pump") ||
  175 |     text.includes("ea-") ||
  176 |     text.includes("eas-") ||
  177 |     text.includes("sm-") ||
  178 |     text.includes("tm-")
  179 |   );
  180 | }
```

#### 22. 型号选择（第 469 行）

```tsx
  463 |   }
  464 | return null;
  465 | }
  466 | 
  467 | function getModelActionHref(data: any): string {
  468 |   if (isTubingDetailData(data)) {
  469 |     return data?.modelSelectionHref || "#model-selection";
  470 |   }
  471 | 
  472 |   if (isCustomInquiryMode(data) || isValvelessPumpDetailData(data)) {
  473 |     return data?.customInquiryHref || data?.contactHref || "/contact";
  474 |   }
  475 | if (isCustomInquiryMode(data)) {
  476 |     return (
  477 |       data.primaryButtonHref ||
  478 |       data.contactHref ||
  479 |       data.requestHref ||
  480 |       "/contact"
  481 |     );
  482 |   }
  483 | 
  484 |   return (
  485 |     data.configuratorHref ||
```

#### 23. 型号选择（第 487 行）

```tsx
  481 |     );
  482 |   }
  483 | 
  484 |   return (
  485 |     data.configuratorHref ||
  486 |     data.selectionHref ||
  487 |     data.modelSelectionHref ||
  488 |     "#model-selection"
  489 |   );
  490 | }
  491 | 
  492 | 
  493 | function PlungerPumpBottomCta({ data }: { data: any }) {
  494 |   const cta = getPlungerPumpBottomCta(data);
  495 | 
  496 |   if (!cta) {
  497 |     return null;
  498 |   }
  499 | 
  500 |   return (
  501 |     <section className={styles.plungerBottomCta}>
  502 |       <div className={styles.plungerBottomCtaInner}>
  503 |         <div className={styles.plungerBottomCtaText}>
```

#### 24. 添加图纸（第 625 行）

```tsx
  619 |         data.productCode ||
  620 |         data.slug ||
  621 |         ""
  622 |     ).trim();
  623 |   }
  624 | 
  625 |   function createDetailCartItem(needDrawing: boolean): SelectionCartItemInput {
  626 |     const productCode = getDetailCartProductCode();
  627 |     const modelText = String(
  628 |       data.modelDisplay ||
  629 |         data.displayModel ||
  630 |         data.foreachModel ||
  631 |         data.model ||
  632 |         data.title ||
  633 |         productCode
  634 |     ).trim();
  635 | 
  636 |     const productName = isPlungerPumpDetailData(data)
  637 |       ? "柱塞泵"
  638 |       : String(
  639 |           data.productTypeName ||
  640 |             data.productTypeLabel ||
  641 |             data.seriesName ||
```

#### 25. 添加图纸（第 670 行）

```tsx
  664 |       sourceLabel: "产品详情页",
  665 |       productName,
  666 |       productCode,
  667 |       foreachModel: modelText,
  668 |       competitorModels: [],
  669 |       quantity: 1,
  670 |       needDrawing,
  671 |       imagePath:
  672 |         data.imageCard ||
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

#### 26. 添加图纸（第 688 行）

```tsx
  682 |     };
  683 |   }
  684 | 
  685 |   
  686 |   const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
  687 |   const isDetailProductSelected = Boolean(currentDetailCartItem);
  688 |   const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);
  689 | 
  690 |   function handleOpenConfigurator() {
  691 |     console.info("配置选择端口预留", data.slug);
  692 |   }
  693 | 
  694 |   function handleAddDatasheet() {
  695 |     console.info("添加规格书端口预留", data.slug);
  696 |   }
  697 | 
  698 |   function handleAddDrawing() {
  699 |     const item = createDetailCartItem(true);
  700 | 
  701 |     if (!item.productCode || !item.foreachModel) {
  702 |       console.warn("详情页清单参数不完整", data);
  703 |       return;
  704 |     }
```

#### 27. 添加图纸（第 688 行）

```tsx
  682 |     };
  683 |   }
  684 | 
  685 |   
  686 |   const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
  687 |   const isDetailProductSelected = Boolean(currentDetailCartItem);
  688 |   const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);
  689 | 
  690 |   function handleOpenConfigurator() {
  691 |     console.info("配置选择端口预留", data.slug);
  692 |   }
  693 | 
  694 |   function handleAddDatasheet() {
  695 |     console.info("添加规格书端口预留", data.slug);
  696 |   }
  697 | 
  698 |   function handleAddDrawing() {
  699 |     const item = createDetailCartItem(true);
  700 | 
  701 |     if (!item.productCode || !item.foreachModel) {
  702 |       console.warn("详情页清单参数不完整", data);
  703 |       return;
  704 |     }
```

#### 28. 添加图纸（第 698 行）

```tsx
  692 |   }
  693 | 
  694 |   function handleAddDatasheet() {
  695 |     console.info("添加规格书端口预留", data.slug);
  696 |   }
  697 | 
  698 |   function handleAddDrawing() {
  699 |     const item = createDetailCartItem(true);
  700 | 
  701 |     if (!item.productCode || !item.foreachModel) {
  702 |       console.warn("详情页清单参数不完整", data);
  703 |       return;
  704 |     }
  705 | 
  706 |     const existingItem = getItem("pump-selection", item.productCode);
  707 | 
  708 |     if (existingItem) {
  709 |       toggleDrawingNeed(existingItem.id, !existingItem.needDrawing);
  710 |       return;
  711 |     }
  712 | 
  713 |     addItem(item);
  714 |   }
```

#### 29. 添加图纸（第 709 行）

```tsx
  703 |       return;
  704 |     }
  705 | 
  706 |     const existingItem = getItem("pump-selection", item.productCode);
  707 | 
  708 |     if (existingItem) {
  709 |       toggleDrawingNeed(existingItem.id, !existingItem.needDrawing);
  710 |       return;
  711 |     }
  712 | 
  713 |     addItem(item);
  714 |   }
  715 | 
  716 |   function handleRequest3DFile() {
  717 |     console.info("申请3D文件端口预留", data.slug);
  718 |   }
  719 | 
  720 |   function handleAddList() {
  721 |     const item = createDetailCartItem(false);
  722 | 
  723 |     if (!item.productCode || !item.foreachModel) {
  724 |       console.warn("详情页清单参数不完整", data);
  725 |       return;
```

#### 30. 添加图纸（第 1076 行）

```tsx
 1070 |                 ) : null}
 1071 | 
 1072 |                 {data.showDrawingRequest ? (
 1073 |                   <button
 1074 |                     className={styles.button}
 1075 |                     type="button"
 1076 |                     aria-pressed={isDetailDrawingSelected}
 1077 |                     onClick={handleAddDrawing}
 1078 |                   >
 1079 |                     {isDetailDrawingSelected ? "已添加图纸" : "添加图纸"}
 1080 |                   </button>
 1081 |                 ) : null}
 1082 | 
 1083 |                 {data.show3DRequest ? (
 1084 |                   <button
 1085 |                     className={styles.button}
 1086 |                     type="button"
 1087 |                     onClick={handleRequest3DFile}
 1088 |                   >
 1089 |                     申请3D文件
 1090 |                   </button>
 1091 |                 ) : null}
 1092 | 
```

### components/products/detail/product-detail-client.tsx

未找到：`components/products/detail/product-detail-client.tsx`

## 4. 详情数据类型定义

### data/products/product-detail.types.ts

未找到：`data/products/product-detail.types.ts`

### data/products/detail/product-detail.types.ts

- 文件：`data/products/detail/product-detail.types.ts`
- 行数：80
- 大小：1724 bytes

#### 1. 完整类型定义（第 17 行）

```ts
   11 |    当前第一版：
   12 |    1. 只做中文
   13 |    2. FAQ 只预留，不显示
   14 |    3. 按钮只保留业务端口
   15 | ========================================================= */
   16 | 
   17 | export type ProductDetailCategory =
   18 |   | "pumps"
   19 |   | "valves"
   20 |   | "needles"
   21 |   | "controllers";
   22 | 
   23 | export type ProductDetailFaqItem = {
   24 |   question: string;
   25 |   answer: string;
   26 | };
   27 | 
   28 | export type ProductSpecItem = {
   29 |   label: string;
   30 |   value: string;
   31 | };
   32 | 
   33 | export type ProductDetailZhRecord = {
```

#### 2. 完整类型定义（第 23 行）

```ts
   17 | export type ProductDetailCategory =
   18 |   | "pumps"
   19 |   | "valves"
   20 |   | "needles"
   21 |   | "controllers";
   22 | 
   23 | export type ProductDetailFaqItem = {
   24 |   question: string;
   25 |   answer: string;
   26 | };
   27 | 
   28 | export type ProductSpecItem = {
   29 |   label: string;
   30 |   value: string;
   31 | };
   32 | 
   33 | export type ProductDetailZhRecord = {
   34 |   category: ProductDetailCategory;
   35 |   slug: string;
   36 |   model: string;
   37 |   name: string;
   38 |   advantages: string[];
   39 |   commonApplications: string[];
```

#### 3. 完整类型定义（第 28 行）

```ts
   22 | 
   23 | export type ProductDetailFaqItem = {
   24 |   question: string;
   25 |   answer: string;
   26 | };
   27 | 
   28 | export type ProductSpecItem = {
   29 |   label: string;
   30 |   value: string;
   31 | };
   32 | 
   33 | export type ProductDetailZhRecord = {
   34 |   category: ProductDetailCategory;
   35 |   slug: string;
   36 |   model: string;
   37 |   name: string;
   38 |   advantages: string[];
   39 |   commonApplications: string[];
   40 | 
   41 |   /**
   42 |    * 详情页附属图片。
   43 |    * 主图不在这里维护，后续从选型页面基础数据读取。
   44 |    * 没有附属图时使用空数组。
```

#### 4. 完整类型定义（第 33 行）

```ts
   27 | 
   28 | export type ProductSpecItem = {
   29 |   label: string;
   30 |   value: string;
   31 | };
   32 | 
   33 | export type ProductDetailZhRecord = {
   34 |   category: ProductDetailCategory;
   35 |   slug: string;
   36 |   model: string;
   37 |   name: string;
   38 |   advantages: string[];
   39 |   commonApplications: string[];
   40 | 
   41 |   /**
   42 |    * 详情页附属图片。
   43 |    * 主图不在这里维护，后续从选型页面基础数据读取。
   44 |    * 没有附属图时使用空数组。
   45 |    */
   46 |   additionalImages: string[];
   47 | 
   48 |   showConfigurator: boolean;
   49 |   showDatasheetRequest: boolean;
```

#### 5. 完整类型定义（第 70 行）

```ts
   64 |   /**
   65 |    * 用于关联对应产品系列的规格参数数据。
   66 |    */
   67 |   specSeriesKey: string;
   68 | };
   69 | 
   70 | export type ProductDetailPageData = ProductDetailZhRecord & {
   71 |   /**
   72 |    * 后续从选型页面基础数据读取。
   73 |    */
   74 |   mainImage: string | null;
   75 | 
   76 |   /**
   77 |    * 后续由产品系列规格 Excel 生成。
   78 |    */
   79 |   specs: ProductSpecItem[];
   80 | };
```

#### 6. 规格字段（第 29 行）

```ts
   23 | export type ProductDetailFaqItem = {
   24 |   question: string;
   25 |   answer: string;
   26 | };
   27 | 
   28 | export type ProductSpecItem = {
   29 |   label: string;
   30 |   value: string;
   31 | };
   32 | 
   33 | export type ProductDetailZhRecord = {
   34 |   category: ProductDetailCategory;
   35 |   slug: string;
   36 |   model: string;
   37 |   name: string;
   38 |   advantages: string[];
   39 |   commonApplications: string[];
   40 | 
   41 |   /**
   42 |    * 详情页附属图片。
   43 |    * 主图不在这里维护，后续从选型页面基础数据读取。
   44 |    * 没有附属图时使用空数组。
   45 |    */
```

#### 7. 规格字段（第 30 行）

```ts
   24 |   question: string;
   25 |   answer: string;
   26 | };
   27 | 
   28 | export type ProductSpecItem = {
   29 |   label: string;
   30 |   value: string;
   31 | };
   32 | 
   33 | export type ProductDetailZhRecord = {
   34 |   category: ProductDetailCategory;
   35 |   slug: string;
   36 |   model: string;
   37 |   name: string;
   38 |   advantages: string[];
   39 |   commonApplications: string[];
   40 | 
   41 |   /**
   42 |    * 详情页附属图片。
   43 |    * 主图不在这里维护，后续从选型页面基础数据读取。
   44 |    * 没有附属图时使用空数组。
   45 |    */
   46 |   additionalImages: string[];
```

#### 8. 规格字段（第 79 行）

```ts
   73 |    */
   74 |   mainImage: string | null;
   75 | 
   76 |   /**
   77 |    * 后续由产品系列规格 Excel 生成。
   78 |    */
   79 |   specs: ProductSpecItem[];
   80 | };
```

### components/products/detail/product-detail.types.ts

未找到：`components/products/detail/product-detail.types.ts`

## 5. 产品路由映射

### data/products/selection/product-route-map.ts

- 文件：`data/products/selection/product-route-map.ts`
- 行数：607
- 大小：20485 bytes

#### 1. 鲁尔接头路由（第 170 行）

```ts
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
```

#### 2. 鲁尔接头路由（第 173 行）

```ts
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
```

#### 3. 内螺纹互转接头路由（第 190 行）

```ts
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
```

#### 4. 内螺纹互转接头路由（第 193 行）

```ts
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
  209 | 
```

#### 5. 现有接头详情路由（第 90 行）

```ts
   84 |       label: "针系列",
   85 |       title: "针系列 | FOREACH",
   86 |       description:
   87 |         "恒永达针系列产品覆盖采样针、穿刺针、清洗针和搅拌桨等自动化仪器定制需求。",
   88 |     },
   89 | 
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
  101 |       categoryId: "pumps",
  102 |       productTypeId: "plunger-pump",
  103 |       label: "柱塞泵",
  104 |       title: "柱塞泵 | FOREACH",
  105 |       description:
  106 |         "柱塞泵适用于自动化分析仪器、IVD、生命科学和实验室自动化设备中的精密液体处理。",
```

#### 6. 现有接头详情路由（第 91 行）

```ts
   85 |       title: "针系列 | FOREACH",
   86 |       description:
   87 |         "恒永达针系列产品覆盖采样针、穿刺针、清洗针和搅拌桨等自动化仪器定制需求。",
   88 |     },
   89 | 
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
  101 |       categoryId: "pumps",
  102 |       productTypeId: "plunger-pump",
  103 |       label: "柱塞泵",
  104 |       title: "柱塞泵 | FOREACH",
  105 |       description:
  106 |         "柱塞泵适用于自动化分析仪器、IVD、生命科学和实验室自动化设备中的精密液体处理。",
  107 |     },
```

#### 7. 现有接头详情路由（第 150 行）

```ts
  144 |       title: "无阀泵 | FOREACH",
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
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
```

#### 8. 现有接头详情路由（第 151 行）

```ts
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
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
```

#### 9. 现有接头详情路由（第 152 行）

```ts
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
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
```

#### 10. 现有接头详情路由（第 153 行）

```ts
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
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
```

#### 11. 现有接头详情路由（第 160 行）

```ts
  154 |       label: "硬管接头",
  155 |       title: "硬管接头 | FOREACH",
  156 |       description:
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
```

#### 12. 现有接头详情路由（第 160 行）

```ts
  154 |       label: "硬管接头",
  155 |       title: "硬管接头 | FOREACH",
  156 |       description:
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
```

#### 13. 现有接头详情路由（第 161 行）

```ts
  155 |       title: "硬管接头 | FOREACH",
  156 |       description:
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
```

#### 14. 现有接头详情路由（第 162 行）

```ts
  156 |       description:
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
```

#### 15. 现有接头详情路由（第 163 行）

```ts
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
```

#### 16. 现有接头详情路由（第 163 行）

```ts
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
```

#### 17. 现有接头详情路由（第 170 行）

```ts
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
```

#### 18. 现有接头详情路由（第 171 行）

```ts
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
```

#### 19. 现有接头详情路由（第 172 行）

```ts
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
```

#### 20. 现有接头详情路由（第 173 行）

```ts
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
```

#### 21. 现有接头详情路由（第 180 行）

```ts
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
```

#### 22. 现有接头详情路由（第 181 行）

```ts
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
```

#### 23. 现有接头详情路由（第 182 行）

```ts
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
```

#### 24. 现有接头详情路由（第 183 行）

```ts
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
```

#### 25. 现有接头详情路由（第 191 行）

```ts
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
```

#### 26. 现有接头详情路由（第 192 行）

```ts
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
```

#### 27. 现有接头详情路由（第 201 行）

```ts
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
  209 | 
  210 |     "filters": {
  211 |       category: "fittings",
  212 |       categoryId: "fittings",
  213 |       productTypeId: "filters",
  214 |       label: "过滤器",
  215 |       title: "过滤器 | FOREACH",
  216 |       description:
  217 |         "过滤器用于自动化仪器液路中的颗粒拦截、流体净化和水循环过滤。",
```

#### 28. 现有接头详情路由（第 202 行）

```ts
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
  209 | 
  210 |     "filters": {
  211 |       category: "fittings",
  212 |       categoryId: "fittings",
  213 |       productTypeId: "filters",
  214 |       label: "过滤器",
  215 |       title: "过滤器 | FOREACH",
  216 |       description:
  217 |         "过滤器用于自动化仪器液路中的颗粒拦截、流体净化和水循环过滤。",
  218 |     },
```

#### 29. 现有接头详情路由（第 211 行）

```ts
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
  209 | 
  210 |     "filters": {
  211 |       category: "fittings",
  212 |       categoryId: "fittings",
  213 |       productTypeId: "filters",
  214 |       label: "过滤器",
  215 |       title: "过滤器 | FOREACH",
  216 |       description:
  217 |         "过滤器用于自动化仪器液路中的颗粒拦截、流体净化和水循环过滤。",
  218 |     },
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
  222 |       categoryId: "fittings",
  223 |       productTypeId: "check-valves",
  224 |       label: "单向阀",
  225 |       title: "单向阀 | FOREACH",
  226 |       description:
  227 |         "单向阀用于控制流体单向流动并降低液路回流风险。",
```

#### 30. 现有接头详情路由（第 212 行）

```ts
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
  209 | 
  210 |     "filters": {
  211 |       category: "fittings",
  212 |       categoryId: "fittings",
  213 |       productTypeId: "filters",
  214 |       label: "过滤器",
  215 |       title: "过滤器 | FOREACH",
  216 |       description:
  217 |         "过滤器用于自动化仪器液路中的颗粒拦截、流体净化和水循环过滤。",
  218 |     },
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
  222 |       categoryId: "fittings",
  223 |       productTypeId: "check-valves",
  224 |       label: "单向阀",
  225 |       title: "单向阀 | FOREACH",
  226 |       description:
  227 |         "单向阀用于控制流体单向流动并降低液路回流风险。",
  228 | 
```

## 6. 筛选卡片详情链接生成

### components/products/selection/ProductSelectionClient.tsx

- 文件：`components/products/selection/ProductSelectionClient.tsx`
- 行数：3497
- 大小：90794 bytes

#### 1. 详情链接生成（第 207 行）

```tsx
  201 |     mobileCategoryPrefix: "产品大类：",
  202 |     productTypeLabel: "产品类型",
  203 |     resultPrefix: "已找到 ",
  204 |     resultSuffix: " 个基础配置",
  205 |     resetFilters: "清除筛选",
  206 |     submitRequirement: "提交需求",
  207 |     detailButton: "查看详情",
  208 |     addToList: "加入清单",
  209 |     addedToList: "已加入清单",
  210 |     previousPage: "上一页",
  211 |     nextPage: "下一页",
  212 |     filterEmpty: "当前产品大类暂无可用筛选项。",
  213 |     emptyTitle: "暂无匹配配置",
  214 |     emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  215 |   },
  216 |   en: {
  217 |     breadcrumbHome: "Home",
  218 |     breadcrumbCurrent: "Product Center",
  219 |     searchPlaceholder: "Search by product name, series, volume, material, or keyword",
  220 |     searchButton: "Search",
  221 |     mobileCategoryPrefix: "Category: ",
  222 |     productTypeLabel: "Product Type",
  223 |     resultPrefix: "",
```

#### 2. 详情链接生成（第 692 行）

```tsx
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
```

#### 3. 详情链接生成（第 702 行）

```tsx
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
  715 | }
  716 | 
  717 | 
  718 | /* ===== FOREACH plunger pump model detail href helpers START ===== */
```

#### 4. 详情链接生成（第 712 行）

```tsx
  706 | 
  707 |     return detailCandidates.some((item) => candidates.includes(item));
  708 |   });
  709 | 
  710 |   return normalizeDetailPathPart(
  711 |     matchedDetail?.slug ||
  712 |       matchedDetail?.detailSlug ||
  713 |       product.detailSlug
  714 |   );
  715 | }
  716 | 
  717 | 
  718 | /* ===== FOREACH plunger pump model detail href helpers START ===== */
  719 | 
  720 | function cleanPlungerHrefText(value: unknown) {
  721 |   return String(value || "").trim();
  722 | }
  723 | 
  724 | function normalizePlungerPathPart(value: unknown) {
  725 |   const parts = cleanPlungerHrefText(value).split("/").filter(Boolean);
  726 |   return parts.length > 0 ? parts[parts.length - 1] : "";
  727 | }
  728 | 
```

#### 5. 详情链接生成（第 713 行）

```tsx
  707 |     return detailCandidates.some((item) => candidates.includes(item));
  708 |   });
  709 | 
  710 |   return normalizeDetailPathPart(
  711 |     matchedDetail?.slug ||
  712 |       matchedDetail?.detailSlug ||
  713 |       product.detailSlug
  714 |   );
  715 | }
  716 | 
  717 | 
  718 | /* ===== FOREACH plunger pump model detail href helpers START ===== */
  719 | 
  720 | function cleanPlungerHrefText(value: unknown) {
  721 |   return String(value || "").trim();
  722 | }
  723 | 
  724 | function normalizePlungerPathPart(value: unknown) {
  725 |   const parts = cleanPlungerHrefText(value).split("/").filter(Boolean);
  726 |   return parts.length > 0 ? parts[parts.length - 1] : "";
  727 | }
  728 | 
  729 | function normalizePlungerModelSlug(value: unknown) {
```

#### 6. 详情链接生成（第 738 行）

```tsx
  732 |     .replace(/μ/g, "u")
  733 |     .replace(/[^a-z0-9]+/g, "-")
  734 |     .replace(/^-+|-+$/g, "");
  735 | }
  736 | 
  737 | function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  738 |   const existingSlug = normalizePlungerPathPart(product.detailSlug);
  739 | 
  740 |   if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
  741 |     return existingSlug.toLowerCase();
  742 |   }
  743 | 
  744 |   const text = [
  745 |     getSelectionLocalizedText(product.cardTitle, "en"),
  746 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  747 |     product.productId,
  748 |     product.detailSlug,
  749 |     product.seriesId,
  750 |     product.filters?.filter01,
  751 |     product.filters?.filter02,
  752 |     product.filters?.filter03,
  753 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  754 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
```

#### 7. 详情链接生成（第 748 行）

```tsx
  742 |   }
  743 | 
  744 |   const text = [
  745 |     getSelectionLocalizedText(product.cardTitle, "en"),
  746 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  747 |     product.productId,
  748 |     product.detailSlug,
  749 |     product.seriesId,
  750 |     product.filters?.filter01,
  751 |     product.filters?.filter02,
  752 |     product.filters?.filter03,
  753 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  754 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
  755 |   ]
  756 |     .map(cleanPlungerHrefText)
  757 |     .filter(Boolean)
  758 |     .join(" ");
  759 | 
  760 |   const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);
  761 | 
  762 |   if (directModel) {
  763 |     return [
  764 |       directModel[1].toLowerCase(),
```

#### 8. 详情链接生成（第 782 行）

```tsx
  776 |       seriesMatch[1].toLowerCase(),
  777 |       String(Number(capacityMatch[1])),
  778 |       materialMatch[1].toLowerCase(),
  779 |     ].join("-");
  780 |   }
  781 | 
  782 |   return normalizePlungerModelSlug(getSelectionLocalizedText(product.cardTitle, "en") || getSelectionLocalizedText(product.cardTitle, "zh") || product.productId || product.detailSlug);
  783 | }
  784 | 
  785 | /* ===== FOREACH plunger pump model detail href helpers END ===== */
  786 | 
  787 | 
  788 | 
  789 | /*
  790 |   FORCE_FIX_PLUNGER_WRONG_PROBE_HREF_20260707
  791 | 
  792 |   最终详情链接出口保护：
  793 |   防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  794 |   只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
  795 | */
  796 | function normalizeFinalProductDetailHref(
  797 |   product: ProductSelectionProduct,
  798 |   href: string
```

#### 9. 详情链接生成（第 809 行）

```tsx
  803 |     .split("/")
  804 |     .filter(Boolean)
  805 |     .pop()
  806 |     ?.toLowerCase();
  807 | 
  808 |   const rawSlug = String(
  809 |     (product as any).detailSlug ||
  810 |       (product as any).slug ||
  811 |       (product as any).productId ||
  812 |       hrefSlug ||
  813 |       ""
  814 |   )
  815 |     .split("/")
  816 |     .filter(Boolean)
  817 |     .pop()
  818 |     ?.toLowerCase();
  819 | 
  820 |   if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
  821 |     return `/products/pumps/plunger-pumps/${rawSlug}`;
  822 |   }
  823 | 
  824 |   if (
  825 |     rawHref.includes("/products/probes/") &&
```

#### 10. 详情链接生成（第 860 行）

```tsx
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
```

#### 11. 详情链接生成（第 1021 行）

```tsx
 1015 |         ""
 1016 |       ).trim();
 1017 | 
 1018 |     const rawExistingHref =
 1019 |       String(
 1020 |         (product as any)
 1021 |           ?.detailHref ||
 1022 |         (product as any)
 1023 |           ?.href ||
 1024 |         ""
 1025 |       ).trim();
 1026 | 
 1027 |     const isThreadToBarbed =
 1028 |       rawProductTypeId ===
 1029 |         "thread-to-barbed-fittings" ||
 1030 |       rawExistingHref.includes(
 1031 |         "/products/fittings/thread-to-barbed-fittings"
 1032 |       );
 1033 | 
 1034 |     if (isThreadToBarbed) {
 1035 |       const productCode =
 1036 |         String(
 1037 |           (product as any)
```

#### 12. 详情链接生成（第 1111 行）

```tsx
 1105 |         (product as any)?.productTypeId ||
 1106 |         ""
 1107 |       ).trim();
 1108 | 
 1109 |     const rawExistingHref =
 1110 |       String(
 1111 |         (product as any)?.detailHref ||
 1112 |         (product as any)?.href ||
 1113 |         ""
 1114 |       ).trim();
 1115 | 
 1116 |     const isBarbedFitting =
 1117 |       rawProductTypeId ===
 1118 |         "barbed-fittings" ||
 1119 |       rawExistingHref.includes(
 1120 |         "/products/fittings/barbed-fittings"
 1121 |       );
 1122 | 
 1123 |     if (isBarbedFitting) {
 1124 |       const rawCardTitle =
 1125 |         (product as any)?.cardTitle;
 1126 | 
 1127 |       const cardTitleText =
```

#### 13. 详情链接生成（第 1176 行）

```tsx
 1170 |     CONTROL_MODULE_DETAIL_HREF_20260708
 1171 | 
 1172 |     说明：
 1173 |     1. 智控模块属于 control 分类；
 1174 |     2. 卡片详情页不走 /products/control-modules 这种孤立页面；
 1175 |     3. 统一走现有通用路由 /products/control/[slug]；
 1176 |     4. slug 来自 control-module-selection.generated.ts 里的 detailSlug。
 1177 |   */
 1178 |   if (String(product.categoryId || "") === "control") {
 1179 |     const controlSlug = String(
 1180 |       (product as any).detailSlug ||
 1181 |         (product as any).slug ||
 1182 |         (product as any).productSlug ||
 1183 |         ""
 1184 |     ).trim();
 1185 | 
 1186 |     return controlSlug ? `/products/control/${controlSlug}` : "/products";
 1187 |   }
 1188 |   /*
 1189 |     CONTROL_MODULE_DETAIL_HREF_PATCH_20260708
 1190 |     智控系列选型卡片强制跳转到正式详情页。
 1191 |   */
 1192 |   if (
```

#### 14. 详情链接生成（第 1180 行）

```tsx
 1174 |     2. 卡片详情页不走 /products/control-modules 这种孤立页面；
 1175 |     3. 统一走现有通用路由 /products/control/[slug]；
 1176 |     4. slug 来自 control-module-selection.generated.ts 里的 detailSlug。
 1177 |   */
 1178 |   if (String(product.categoryId || "") === "control") {
 1179 |     const controlSlug = String(
 1180 |       (product as any).detailSlug ||
 1181 |         (product as any).slug ||
 1182 |         (product as any).productSlug ||
 1183 |         ""
 1184 |     ).trim();
 1185 | 
 1186 |     return controlSlug ? `/products/control/${controlSlug}` : "/products";
 1187 |   }
 1188 |   /*
 1189 |     CONTROL_MODULE_DETAIL_HREF_PATCH_20260708
 1190 |     智控系列选型卡片强制跳转到正式详情页。
 1191 |   */
 1192 |   if (
 1193 |     (product as any)?.categoryId === "control" ||
 1194 |     (product as any)?.category === "control" ||
 1195 |     (product as any)?.productTypeId === "control-module" ||
 1196 |     (product as any)?.productTypeLabel === "智控模块"
```

#### 15. 详情链接生成（第 1199 行）

```tsx
 1193 |     (product as any)?.categoryId === "control" ||
 1194 |     (product as any)?.category === "control" ||
 1195 |     (product as any)?.productTypeId === "control-module" ||
 1196 |     (product as any)?.productTypeLabel === "智控模块"
 1197 |   ) {
 1198 |     const rawHref = String(
 1199 |       (product as any).detailHref ||
 1200 |         (product as any).href ||
 1201 |         ""
 1202 |     ).trim();
 1203 | 
 1204 |     if (rawHref.includes("/products/control-modules/")) {
 1205 |       return rawHref;
 1206 |     }
 1207 | 
 1208 |     const rawSlug = String(
 1209 |       (product as any).detailSlug ||
 1210 |         (product as any).slug ||
 1211 |         (product as any).productId ||
 1212 |         ""
 1213 |     )
 1214 |       .split("/")
 1215 |       .filter(Boolean)
```

#### 16. 详情链接生成（第 1209 行）

```tsx
 1203 | 
 1204 |     if (rawHref.includes("/products/control-modules/")) {
 1205 |       return rawHref;
 1206 |     }
 1207 | 
 1208 |     const rawSlug = String(
 1209 |       (product as any).detailSlug ||
 1210 |         (product as any).slug ||
 1211 |         (product as any).productId ||
 1212 |         ""
 1213 |     )
 1214 |       .split("/")
 1215 |       .filter(Boolean)
 1216 |       .pop();
 1217 | 
 1218 |     if (rawSlug === "abd-air-bubble-detector" || rawSlug === "control-abd-air-bubble-detector") {
 1219 |       return "/products/control/abd-air-bubble-detector";
 1220 |     }
 1221 | 
 1222 |     if (rawSlug === "pdm5-pressure-sensor" || rawSlug === "control-pdm5-pressure-sensor") {
 1223 |       return "/products/control/pdm5-pressure-sensor";
 1224 |     }
 1225 | 
```

#### 17. 详情链接生成（第 1238 行）

```tsx
 1232 | 
 1233 |     柱塞泵详情链接优先处理。
 1234 |     防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
 1235 |   */
 1236 |   {
 1237 |     const rawHref = String(
 1238 |       (product as any).detailHref ||
 1239 |         (product as any).productDetailHref ||
 1240 |         (product as any).href ||
 1241 |         ""
 1242 |     ).trim();
 1243 | 
 1244 |     if (rawHref.includes("/products/pumps/plunger-pumps/")) {
 1245 |       return rawHref;
 1246 |     }
 1247 | 
 1248 |     const rawSlug = String(
 1249 |       (product as any).detailSlug ||
 1250 |         (product as any).slug ||
 1251 |         (product as any).productId ||
 1252 |         ""
 1253 |     )
 1254 |       .split("/")
```

#### 18. 详情链接生成（第 1249 行）

```tsx
 1243 | 
 1244 |     if (rawHref.includes("/products/pumps/plunger-pumps/")) {
 1245 |       return rawHref;
 1246 |     }
 1247 | 
 1248 |     const rawSlug = String(
 1249 |       (product as any).detailSlug ||
 1250 |         (product as any).slug ||
 1251 |         (product as any).productId ||
 1252 |         ""
 1253 |     )
 1254 |       .split("/")
 1255 |       .filter(Boolean)
 1256 |       .pop()
 1257 |       ?.toLowerCase();
 1258 | 
 1259 |     if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
 1260 |       return `/products/pumps/plunger-pumps/${rawSlug}`;
 1261 |     }
 1262 | 
 1263 |     const textForModel = [
 1264 |       (product as any).productId,
 1265 |       (product as any).detailSlug,
```

#### 19. 详情链接生成（第 1265 行）

```tsx
 1259 |     if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
 1260 |       return `/products/pumps/plunger-pumps/${rawSlug}`;
 1261 |     }
 1262 | 
 1263 |     const textForModel = [
 1264 |       (product as any).productId,
 1265 |       (product as any).detailSlug,
 1266 |       (product as any).slug,
 1267 |       (product as any).cardTitle?.zh,
 1268 |       (product as any).cardTitle?.en,
 1269 |     ]
 1270 |       .filter(Boolean)
 1271 |       .join(" ")
 1272 |       .toLowerCase();
 1273 | 
 1274 |     const modelMatch = textForModel.match(/\b(ea|sm|tm)[-_\s]*(\d{2,5})[-_\s]*(pmma|peek)\b/i);
 1275 | 
 1276 |     if (modelMatch) {
 1277 |       return `/products/pumps/plunger-pumps/${modelMatch[1].toLowerCase()}-${modelMatch[2]}-${modelMatch[3].toLowerCase()}`;
 1278 |     }
 1279 |   }
 1280 | 
 1281 | /*
```

#### 20. 详情链接生成（第 1283 行）

```tsx
 1277 |       return `/products/pumps/plunger-pumps/${modelMatch[1].toLowerCase()}-${modelMatch[2]}-${modelMatch[3].toLowerCase()}`;
 1278 |     }
 1279 |   }
 1280 | 
 1281 | /*
 1282 |     TUBING_MAKE_DETAIL_HREF_20260707
 1283 |     管路卡片优先使用 detailHref / href。
 1284 |   */
 1285 |   {
 1286 |     const rawHref = String(
 1287 |       (product as any).detailHref ||
 1288 |         (product as any).productDetailHref ||
 1289 |         (product as any).href ||
 1290 |         ""
 1291 |     ).trim();
 1292 | 
 1293 |     if (rawHref.includes("/products/tubing/")) {
 1294 |       return rawHref;
 1295 |     }
 1296 | 
 1297 |     const rawSlug = String(
 1298 |       (product as any).detailSlug ||
 1299 |         (product as any).slug ||
```

#### 21. 详情链接生成（第 1287 行）

```tsx
 1281 | /*
 1282 |     TUBING_MAKE_DETAIL_HREF_20260707
 1283 |     管路卡片优先使用 detailHref / href。
 1284 |   */
 1285 |   {
 1286 |     const rawHref = String(
 1287 |       (product as any).detailHref ||
 1288 |         (product as any).productDetailHref ||
 1289 |         (product as any).href ||
 1290 |         ""
 1291 |     ).trim();
 1292 | 
 1293 |     if (rawHref.includes("/products/tubing/")) {
 1294 |       return rawHref;
 1295 |     }
 1296 | 
 1297 |     const rawSlug = String(
 1298 |       (product as any).detailSlug ||
 1299 |         (product as any).slug ||
 1300 |         (product as any).productId ||
 1301 |         ""
 1302 |     )
 1303 |       .split("/")
```

#### 22. 详情链接生成（第 1298 行）

```tsx
 1292 | 
 1293 |     if (rawHref.includes("/products/tubing/")) {
 1294 |       return rawHref;
 1295 |     }
 1296 | 
 1297 |     const rawSlug = String(
 1298 |       (product as any).detailSlug ||
 1299 |         (product as any).slug ||
 1300 |         (product as any).productId ||
 1301 |         ""
 1302 |     )
 1303 |       .split("/")
 1304 |       .filter(Boolean)
 1305 |       .pop()
 1306 |       ?.toLowerCase();
 1307 | 
 1308 |     if (
 1309 |       rawSlug === "pvc-tubing" ||
 1310 |       rawSlug === "tpu-tubing" ||
 1311 |       rawSlug === "fep-tubing" ||
 1312 |       rawSlug === "ptfe-tubing" ||
 1313 |       rawSlug === "peek-tubing" ||
 1314 |       rawSlug === "pfa-tubing"
```

#### 23. 详情链接生成（第 1329 行）

```tsx
 1323 |     管路系列详情链接分支。
 1324 |     只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
 1325 |     其它产品仍走原来的针、阀、泵逻辑。
 1326 |   */
 1327 |   {
 1328 |     const rawHref = String(
 1329 |       (product as any).detailHref ||
 1330 |         (product as any).productDetailHref ||
 1331 |         (product as any).href ||
 1332 |         (product as any).url ||
 1333 |         (product as any).path ||
 1334 |         ""
 1335 |     ).trim();
 1336 | 
 1337 |     if (rawHref.includes("/products/tubing/")) {
 1338 |       return rawHref;
 1339 |     }
 1340 | 
 1341 |     const rawText = JSON.stringify(product || {}).toLowerCase();
 1342 | 
 1343 |     const isTubingProduct =
 1344 |       rawText.includes("tubing") ||
 1345 |       rawText.includes("管路") ||
```

#### 24. 详情链接生成（第 1361 行）

```tsx
 1355 |       rawText.includes("ptfe-tubing") ||
 1356 |       rawText.includes("peek-tubing") ||
 1357 |       rawText.includes("pfa-tubing");
 1358 | 
 1359 |     if (isTubingProduct) {
 1360 |       const rawSlug = String(
 1361 |         (product as any).detailSlug ||
 1362 |           (product as any).routeSlug ||
 1363 |           (product as any).slug ||
 1364 |           (product as any).seriesSlug ||
 1365 |           (product as any).productId ||
 1366 |           ""
 1367 |       )
 1368 |         .split("/")
 1369 |         .filter(Boolean)
 1370 |         .pop()
 1371 |         ?.toLowerCase();
 1372 | 
 1373 |       if (
 1374 |         rawSlug === "pvc-tubing" ||
 1375 |         rawSlug === "tpu-tubing" ||
 1376 |         rawSlug === "fep-tubing" ||
 1377 |         rawSlug === "ptfe-tubing" ||
```

#### 25. 详情链接生成（第 1410 行）

```tsx
 1404 |     (product as any)?.sourceType === "probe-selection" ||
 1405 |     (product as any)?.categoryId === "needles" ||
 1406 |     (product as any)?.category === "needles" ||
 1407 |     (product as any)?.categoryLabel === "针系列"
 1408 |   ) {
 1409 |     const rawHref = String(
 1410 |       (product as any).detailHref ||
 1411 |         (product as any).href ||
 1412 |         ""
 1413 |     );
 1414 | 
 1415 |     const slugFromHref = rawHref
 1416 |       .split("/")
 1417 |       .filter(Boolean)
 1418 |       .pop();
 1419 | 
 1420 |     const rawSlug =
 1421 |       (product as any).productTypeSlug ||
 1422 |       (product as any).detailSlug ||
 1423 |       (product as any).routeSlug ||
 1424 |       (product as any).slug ||
 1425 |       (product as any).seriesSlug ||
 1426 |       slugFromHref;
```

#### 26. 详情链接生成（第 1422 行）

```tsx
 1416 |       .split("/")
 1417 |       .filter(Boolean)
 1418 |       .pop();
 1419 | 
 1420 |     const rawSlug =
 1421 |       (product as any).productTypeSlug ||
 1422 |       (product as any).detailSlug ||
 1423 |       (product as any).routeSlug ||
 1424 |       (product as any).slug ||
 1425 |       (product as any).seriesSlug ||
 1426 |       slugFromHref;
 1427 | 
 1428 |     const probeSlug = String(rawSlug || "")
 1429 |       .split("/")
 1430 |       .filter(Boolean)
 1431 |       .pop();
 1432 | 
 1433 |     if (
 1434 |       probeSlug &&
 1435 |       probeSlug !== "undefined" &&
 1436 |       probeSlug !== "null"
 1437 |     ) {
 1438 |       return `/products/probes/${probeSlug}`;
```

#### 27. 详情链接生成（第 1449 行）

```tsx
 1443 | 
 1444 |   /*
 1445 |     PROBE_DETAIL_HREF_PATCH_20260709
 1446 | 
 1447 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1448 |     详情路由不能依赖 productTypeId。
 1449 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1450 |   */
 1451 |   if (
 1452 |     (product as any)?.sourceType === "probe-selection" ||
 1453 |     (product as any)?.category === "probes" ||
 1454 |     (product as any)?.categoryLabel === "针系列"
 1455 |   ) {
 1456 |     const rawHref = String(
 1457 |       (product as any).detailHref ||
 1458 |         (product as any).href ||
 1459 |         ""
 1460 |     );
 1461 | 
 1462 |     const slugFromHref = rawHref
 1463 |       .split("/")
 1464 |       .filter(Boolean)
 1465 |       .pop();
```

#### 28. 详情链接生成（第 1449 行）

```tsx
 1443 | 
 1444 |   /*
 1445 |     PROBE_DETAIL_HREF_PATCH_20260709
 1446 | 
 1447 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1448 |     详情路由不能依赖 productTypeId。
 1449 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1450 |   */
 1451 |   if (
 1452 |     (product as any)?.sourceType === "probe-selection" ||
 1453 |     (product as any)?.category === "probes" ||
 1454 |     (product as any)?.categoryLabel === "针系列"
 1455 |   ) {
 1456 |     const rawHref = String(
 1457 |       (product as any).detailHref ||
 1458 |         (product as any).href ||
 1459 |         ""
 1460 |     );
 1461 | 
 1462 |     const slugFromHref = rawHref
 1463 |       .split("/")
 1464 |       .filter(Boolean)
 1465 |       .pop();
```

#### 29. 详情链接生成（第 1457 行）

```tsx
 1451 |   if (
 1452 |     (product as any)?.sourceType === "probe-selection" ||
 1453 |     (product as any)?.category === "probes" ||
 1454 |     (product as any)?.categoryLabel === "针系列"
 1455 |   ) {
 1456 |     const rawHref = String(
 1457 |       (product as any).detailHref ||
 1458 |         (product as any).href ||
 1459 |         ""
 1460 |     );
 1461 | 
 1462 |     const slugFromHref = rawHref
 1463 |       .split("/")
 1464 |       .filter(Boolean)
 1465 |       .pop();
 1466 | 
 1467 |     const rawSlug =
 1468 |       (product as any).productTypeSlug ||
 1469 |       (product as any).detailSlug ||
 1470 |       (product as any).routeSlug ||
 1471 |       (product as any).slug ||
 1472 |       (product as any).seriesSlug ||
 1473 |       slugFromHref;
```

#### 30. 详情链接生成（第 1469 行）

```tsx
 1463 |       .split("/")
 1464 |       .filter(Boolean)
 1465 |       .pop();
 1466 | 
 1467 |     const rawSlug =
 1468 |       (product as any).productTypeSlug ||
 1469 |       (product as any).detailSlug ||
 1470 |       (product as any).routeSlug ||
 1471 |       (product as any).slug ||
 1472 |       (product as any).seriesSlug ||
 1473 |       slugFromHref;
 1474 | 
 1475 |     const probeSlug = String(rawSlug || "")
 1476 |       .split("/")
 1477 |       .filter(Boolean)
 1478 |       .pop();
 1479 | 
 1480 |     if (
 1481 |       probeSlug &&
 1482 |       probeSlug !== "undefined" &&
 1483 |       probeSlug !== "null"
 1484 |     ) {
 1485 |       return `/products/probes/${probeSlug}`;
```

## 7. 两个系列当前选型数据

### data/products/selection/luer-fitting-selection.generated.ts

- 产品数量：151
- detailSlug 数量：151
- 唯一 detailSlug：151
- 空产品图数量：1

#### 第一条产品数据

```json
{
    "productId": "809558",
    "categoryId": "fittings",
    "productTypeId": "luer-fittings",
    "seriesId": "lsl",
    "cardTitle": {
      "zh": "LSL-16-PP-N",
      "en": "LSL-16-PP-N"
    },
    "cardSubtitle": {
      "zh": "固定公鲁尔芯子\n适配1.6mm内径软管\nPP材质",
      "en": "固定公鲁尔芯子\n适配1.6mm内径软管\nPP材质"
    },
    "filters": {
      "filter01": "公鲁尔芯子",
      "filter02": "LSL 固定芯子",
      "filter03": "1.6 mm",
      "filter05": "PP",
      "filter06": "N - 本色"
    },
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-16-PP-N.jpg",
    "detailSlug": "lsl-16-pp-n",
    "status": "active",
    "sortOrder": 1,
    "searchKeywords": {
      "zh": "公鲁尔芯子 固定 LSL-16-PP-N LSL-16-PP-N 809558 443-02-00142 公鲁尔芯子 LSL 固定公鲁尔芯子 1.6 mm PP 本色",
      "en": "LSL-16-PP-N 809558 443-02-00142 LSL 1.6 mm PP"
    }
```

### data/products/selection/female-thread-adapter-selection.generated.ts

- 产品数量：24
- detailSlug 数量：24
- 唯一 detailSlug：24
- 空产品图数量：5

#### 第一条产品数据

```json
{
    "productId": "809484",
    "categoryId": "fittings",
    "productTypeId": "female-thread-adapters",
    "seriesId": "us",
    "cardTitle": {
      "zh": "US-M6-05-AC-B",
      "en": "US-M6-05-AC-B"
    },
    "cardSubtitle": {
      "zh": "二通M6螺纹互转\n通径为0.5mm\nAC材质",
      "en": "二通M6螺纹互转\n通径为0.5mm\nAC材质"
    },
    "filters": {
      "filter01": "二通",
      "filter02": "M6",
      "filter03": "0.5 mm",
      "filter04": "AC",
      "filter05": "B - 黑色"
    },
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-05-AC-B.jpg",
    "detailSlug": "us-m6-05-ac-b",
    "status": "active",
    "sortOrder": 1,
    "searchKeywords": {
      "zh": "二通内螺纹方形 方形US-M6-05-AC-B US-M6-05-AC-B 809484 443-02-00061 二通-三通 US 方形二通 M6 0.5 mm AC 黑色",
      "en": "US-M6-05-AC-B 809484 443-02-00061 US M6 0.5 mm AC"
    }
```

## 8. 已有详情数据、服务、适配器和生成脚本

- `app/products/fittings/barbed-fittings/[slug]/page.tsx`
- `app/resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css`
- `components/products/detail/product-detail.module.css`
- `components/products/detail/ProductDetail.module.css`
- `components/products/detail/ProductDetailClient.tsx`
- `components/resources/fitting-replacement/FittingReplacementDetail.tsx`
- `data/products/detail/ea-product-details.zh.generated.ts`
- `data/products/detail/product-detail-faq.zh.ts`
- `data/products/detail/product-detail.types.ts`
- `data/products/detail/product-detail.zh.ts`
- `data/products/generated/fittings/barbed-fittings/detail/index.json`
- `data/products/generated/fittings/hard-tube-fittings/detail/index.json`
- `data/products/generated/fittings/quick-connect-fittings/detail/index.json`
- `data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json`
- `data/products/selection/barbed-fitting-selection.generated.ts`
- `data/products/selection/female-thread-adapter-asset-map.generated.json`
- `data/products/selection/female-thread-adapter-selection.generated.ts`
- `data/products/selection/female-thread-adapter-selection.summary.json`
- `data/products/selection/luer-fitting-asset-map.generated.json`
- `data/products/selection/luer-fitting-selection.generated.ts`
- `data/products/selection/luer-fitting-selection.summary.json`
- `data/products/selection/product-route-map.ts`
- `data/products/selection/thread-to-barbed-detail-route-map.generated.ts`
- `data/products/selection/thread-to-barbed-fitting-selection.generated.ts`
- `data/products/selection/thread-to-barbed-fitting-selection.summary.json`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl.ts`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.zh.ts`
- `reports/barbed-fitting-detail-error.md`
- `reports/barbed-fitting-detail-setup-report.json`
- `reports/barbed-fitting-selection-report.json`
- `reports/female-thread-adapter-assets-audit.md`
- `reports/female-thread-adapter-selection-integration-audit.md`
- `reports/female-thread-adapter-source-audit.md`
- `reports/luer-fitting-assets-audit.md`
- `reports/luer-fitting-column-audit.md`
- `reports/luer-fitting-selection-integration-audit.md`
- `reports/luer-fitting-source-audit.md`
- `reports/rigid-fitting-detail-audit.md`
- `reports/thread-to-barbed-detail-audit.md`
- `reports/thread-to-barbed-detail-generation-report.json`
- `reports/thread-to-barbed-filter-layout-audit.md`
- `reports/thread-to-barbed-jpg-import-report.json`
- `reports/thread-to-barbed-real-render-audit.md`
- `scripts/products/add-thread-to-barbed-disabled-linkage.cjs`
- `scripts/products/audit-female-thread-adapter-assets.cjs`
- `scripts/products/audit-female-thread-adapter-selection-integration.cjs`
- `scripts/products/audit-female-thread-adapter-source.cjs`
- `scripts/products/audit-luer-fitting-assets.cjs`
- `scripts/products/audit-luer-fitting-columns.cjs`
- `scripts/products/audit-luer-fitting-source.cjs`
- `scripts/products/audit-thread-to-barbed-detail.cjs`
- `scripts/products/audit-thread-to-barbed-filter-layout.cjs`
- `scripts/products/connect-thread-to-barbed-detail-href.cjs`
- `scripts/products/connect-thread-to-barbed-selection-client.cjs`
- `scripts/products/fine-tune-product-detail-tab-spacing.js`
- `scripts/products/fix-product-detail-client-asset-fields.js`
- `scripts/products/fix-product-detail-spec-table-width.js`
- `scripts/products/fix-thread-to-barbed-filter-layout-css.cjs`
- `scripts/products/fix-thread-to-barbed-filter-layout-final.cjs`
- `scripts/products/fix-thread-to-barbed-filter-order.cjs`
- `scripts/products/fix-thread-to-barbed-static-params.cjs`
- `scripts/products/force-product-detail-tab-size.js`
- `scripts/products/generate-female-thread-adapter-selection-and-assets.cjs`
- `scripts/products/generate-female-thread-adapter-selection-and-assets.clean (1).cjs`
- `scripts/products/generate-female-thread-adapter-selection-and-assets.clean.cjs`
- `scripts/products/generate-hard-tube-fitting-detail-data.cjs`
- `scripts/products/generate-luer-fitting-selection-and-assets.cjs`
- `scripts/products/generate-thread-to-barbed-detail-data.cjs`
- `scripts/products/generate-thread-to-barbed-fitting-selection.cjs`
- `scripts/products/import-thread-to-barbed-jpg-images.cjs`
- `scripts/products/integrate-female-thread-adapter-selection.cjs`
- `scripts/products/integrate-luer-fitting-selection.cjs`
- `scripts/products/move-product-detail-spec-value-right.js`
- `scripts/products/patch-product-detail-spec-table-style.js`
- `scripts/products/patch-product-detail-spec-text-indent.js`
- `scripts/products/patch-product-detail-tab-active-style.js`
- `scripts/products/patch-product-detail-tab-bigger-underline.js`
- `scripts/products/patch-product-detail-tab-center-style.js`
- `scripts/products/patch-product-detail-tab-clean-style.js`
- `scripts/products/patch-product-detail-tab-font-24.js`
- `scripts/products/patch-product-detail-tab-font-size.js`
- `scripts/products/patch-product-detail-tab-spacing.js`
- `scripts/products/refine-barbed-fitting-detail-content.cjs`
- `scripts/products/remove-thread-to-barbed-three-images.cjs`
- `scripts/products/reset-product-detail-tab-clean.js`
- `scripts/products/set-thread-to-barbed-filter-layout.cjs`
- `scripts/products/setup-barbed-fitting-detail-like-hard-tube.cjs`
- `scripts/products/setup-barbed-fitting-selection-step1.cjs`
- `scripts/products/update-thread-to-barbed-card-copy.cjs`
- `services/products/adapters/getPumpSeriesProductDetailAdapter.ts`
- `services/products/detail/getProductDetailPageData.ts`
- `services/resources/getFittingReplacementDetailData.ts`

## 9. 需要确认的实现点

1. SA-U32-32F-PP-N 当前详情页究竟由哪个详情数据文件和适配器生成。
2. 公共动态路由是否已经支持 fittings 下的新 productTypeId。
3. ProductDetailClient 对空 model3dUrl 和 drawingPdfUrl 当前如何处理。
4. 3D模型和零件图标签是否会因资源为空而被隐藏。
5. 型号选择是否已经支持标准品之间切换。
6. 加入清单时需要哪些必填字段。
7. 详情页静态参数是否需要显式加入151个鲁尔型号和24个内螺纹互转型号。

