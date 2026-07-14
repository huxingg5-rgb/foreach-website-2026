# 接头产品种类数据来源检查

生成时间：2026/7/13 01:16:57

> 本次只检查，没有修改任何文件。

## components/products/selection/ProductFilterPanel.tsx

### import

```tsx
import { useEffect, useState } from "react";
import type {
```

### 组件或函数入口

```tsx
  238 | }
  239 | 
  240 | /* BARBED_PORT_FILTER_GROUP_END */
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257 |     useState(false);
  258 | 
  259 |   /*
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
  263 |   useEffect(() => {
  264 |     setIsFittingProductTypeOpen(false);
  265 |   }, [activeCategory.id]);
  266 | 
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
```

### 关键词匹配：99

匹配：filter，第 7 行

```tsx
    1 | ﻿"use client";
    2 | 
    3 | import { useEffect, useState } from "react";
    4 | 
    5 | import type {
    6 |   ProductSelectionCategoryItem,
    7 |   ProductSelectionFilterGroup,
    8 | } from "./product-selection-ui.types";
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
```

匹配：filter，第 10 行

```tsx
    1 | ﻿"use client";
    2 | 
    3 | import { useEffect, useState } from "react";
    4 | 
    5 | import type {
    6 |   ProductSelectionCategoryItem,
    7 |   ProductSelectionFilterGroup,
    8 | } from "./product-selection-ui.types";
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
```

匹配：productTypeId，第 12 行

```tsx
    2 | 
    3 | import { useEffect, useState } from "react";
    4 | 
    5 | import type {
    6 |   ProductSelectionCategoryItem,
    7 |   ProductSelectionFilterGroup,
    8 | } from "./product-selection-ui.types";
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
```

匹配：filter，第 13 行

```tsx
    3 | import { useEffect, useState } from "react";
    4 | 
    5 | import type {
    6 |   ProductSelectionCategoryItem,
    7 |   ProductSelectionFilterGroup,
    8 | } from "./product-selection-ui.types";
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
```

匹配：filter，第 14 行

```tsx
    4 | 
    5 | import type {
    6 |   ProductSelectionCategoryItem,
    7 |   ProductSelectionFilterGroup,
    8 | } from "./product-selection-ui.types";
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
```

匹配：filter，第 19 行

```tsx
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
```

匹配：filter，第 22 行

```tsx
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
```

匹配：filter，第 26 行

```tsx
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
```

匹配：filter，第 30 行

```tsx
   20 |   ) => void;
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
```

匹配：filter，第 31 行

```tsx
   21 |   isOptionActive: (
   22 |     group: ProductSelectionFilterGroup,
   23 |     value: string
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
```

匹配：filter，第 34 行

```tsx
   24 |   ) => boolean;
   25 |   isOptionDisabled?: (
   26 |     group: ProductSelectionFilterGroup,
   27 |     value: string
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
   48 |   "2.4 mm",
   49 |   "3.2 mm",
   50 |   "4.0 mm",
```

匹配：filter，第 38 行

```tsx
   28 |   ) => boolean;
   29 | 
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
   48 |   "2.4 mm",
   49 |   "3.2 mm",
   50 |   "4.0 mm",
   51 |   "4.8 mm",
   52 |   "6.4 mm",
   53 |   "7.9 mm",
   54 |   "9.5 mm",
```

匹配：filter，第 40 行

```tsx
   30 |   onFilterChange: (
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
   48 |   "2.4 mm",
   49 |   "3.2 mm",
   50 |   "4.0 mm",
   51 |   "4.8 mm",
   52 |   "6.4 mm",
   53 |   "7.9 mm",
   54 |   "9.5 mm",
   55 |   "12.7 mm",
   56 |   "16.0 mm",
```

匹配：filter，第 41 行

```tsx
   31 |     group: ProductSelectionFilterGroup,
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
   48 |   "2.4 mm",
   49 |   "3.2 mm",
   50 |   "4.0 mm",
   51 |   "4.8 mm",
   52 |   "6.4 mm",
   53 |   "7.9 mm",
   54 |   "9.5 mm",
   55 |   "12.7 mm",
   56 |   "16.0 mm",
   57 | ];
```

匹配：filter，第 42 行

```tsx
   32 |     value: string
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
   48 |   "2.4 mm",
   49 |   "3.2 mm",
   50 |   "4.0 mm",
   51 |   "4.8 mm",
   52 |   "6.4 mm",
   53 |   "7.9 mm",
   54 |   "9.5 mm",
   55 |   "12.7 mm",
   56 |   "16.0 mm",
   57 | ];
   58 | 
```

匹配：filter，第 43 行

```tsx
   33 |   ) => void;
   34 |   onResetFilters?: () => void;
   35 | };
   36 | 
   37 | 
   38 | /* BARBED_PORT_FILTER_GROUP_START */
   39 | 
   40 | const BARBED_PORT_FILTER_KEYS = [
   41 |   "filter02",
   42 |   "filter03",
   43 |   "filter04",
   44 | ] as const;
   45 | 
   46 | const BARBED_PORT_SIZE_OPTIONS = [
   47 |   "1.6 mm",
   48 |   "2.4 mm",
   49 |   "3.2 mm",
   50 |   "4.0 mm",
   51 |   "4.8 mm",
   52 |   "6.4 mm",
   53 |   "7.9 mm",
   54 |   "9.5 mm",
   55 |   "12.7 mm",
   56 |   "16.0 mm",
   57 | ];
   58 | 
   59 | function getBarbedPortCount(
```

匹配：堵头，第 72 行

```tsx
   62 |   const portCountMap: Record<
   63 |     string,
   64 |     number
   65 |   > = {
   66 |     "直通型": 2,
   67 |     "L型": 2,
   68 |     "T型": 3,
   69 |     "Y型": 3,
   70 |     "π型": 1,
   71 |     "十字型": 1,
   72 |     "倒刺堵头": 1,
   73 |   };
   74 | 
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
```

匹配：filter，第 78 行

```tsx
   68 |     "T型": 3,
   69 |     "Y型": 3,
   70 |     "π型": 1,
   71 |     "十字型": 1,
   72 |     "倒刺堵头": 1,
   73 |   };
   74 | 
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
```

匹配：filter，第 79 行

```tsx
   69 |     "Y型": 3,
   70 |     "π型": 1,
   71 |     "十字型": 1,
   72 |     "倒刺堵头": 1,
   73 |   };
   74 | 
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
```

匹配：filter，第 82 行

```tsx
   72 |     "倒刺堵头": 1,
   73 |   };
   74 | 
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
```

匹配：filter，第 84 行

```tsx
   74 | 
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
```

匹配：filter，第 85 行

```tsx
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
```

匹配：filter，第 89 行

```tsx
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
  102 |     value: string
  103 |   ) => void;
  104 | }) {
  105 |   const structureGroup =
```

匹配：filter，第 95 行

```tsx
   85 |     ProductSelectionFilterGroup[];
   86 | 
   87 |   isOptionActive: (
   88 |     group:
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
  102 |     value: string
  103 |   ) => void;
  104 | }) {
  105 |   const structureGroup =
  106 |     filterGroups.find(
  107 |       (group) =>
  108 |         group.key === "filter01"
  109 |     );
  110 | 
  111 |   const activeStructure =
```

匹配：filter，第 99 行

```tsx
   89 |       ProductSelectionFilterGroup,
   90 |     value: string
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
  102 |     value: string
  103 |   ) => void;
  104 | }) {
  105 |   const structureGroup =
  106 |     filterGroups.find(
  107 |       (group) =>
  108 |         group.key === "filter01"
  109 |     );
  110 | 
  111 |   const activeStructure =
  112 |     structureGroup?.options.find(
  113 |       (option) =>
  114 |         isOptionActive(
  115 |           structureGroup,
```

匹配：filter，第 101 行

```tsx
   91 |   ) => boolean;
   92 | 
   93 |   isOptionDisabled?: (
   94 |     group:
   95 |       ProductSelectionFilterGroup,
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
  102 |     value: string
  103 |   ) => void;
  104 | }) {
  105 |   const structureGroup =
  106 |     filterGroups.find(
  107 |       (group) =>
  108 |         group.key === "filter01"
  109 |     );
  110 | 
  111 |   const activeStructure =
  112 |     structureGroup?.options.find(
  113 |       (option) =>
  114 |         isOptionActive(
  115 |           structureGroup,
  116 |           option.value
  117 |         )
```

匹配：filter，第 106 行

```tsx
   96 |     value: string
   97 |   ) => boolean;
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
  102 |     value: string
  103 |   ) => void;
  104 | }) {
  105 |   const structureGroup =
  106 |     filterGroups.find(
  107 |       (group) =>
  108 |         group.key === "filter01"
  109 |     );
  110 | 
  111 |   const activeStructure =
  112 |     structureGroup?.options.find(
  113 |       (option) =>
  114 |         isOptionActive(
  115 |           structureGroup,
  116 |           option.value
  117 |         )
  118 |     )?.value || "";
  119 | 
  120 |   const enabledPortCount =
  121 |     getBarbedPortCount(
  122 |       activeStructure
```

匹配：filter，第 108 行

```tsx
   98 | 
   99 |   onFilterChange: (
  100 |     group:
  101 |       ProductSelectionFilterGroup,
  102 |     value: string
  103 |   ) => void;
  104 | }) {
  105 |   const structureGroup =
  106 |     filterGroups.find(
  107 |       (group) =>
  108 |         group.key === "filter01"
  109 |     );
  110 | 
  111 |   const activeStructure =
  112 |     structureGroup?.options.find(
  113 |       (option) =>
  114 |         isOptionActive(
  115 |           structureGroup,
  116 |           option.value
  117 |         )
  118 |     )?.value || "";
  119 | 
  120 |   const enabledPortCount =
  121 |     getBarbedPortCount(
  122 |       activeStructure
  123 |     );
  124 | 
```

匹配：filter，第 127 行

```tsx
  117 |         )
  118 |     )?.value || "";
  119 | 
  120 |   const enabledPortCount =
  121 |     getBarbedPortCount(
  122 |       activeStructure
  123 |     );
  124 | 
  125 |   return (
  126 |     <section
  127 |       className="filter-group barbed-port-filter-group is-mobile-open"
  128 |       data-barbed-port-filter="true"
  129 |     >
  130 |       <div className="barbed-port-heading-grid">
  131 |         <div>接管内径1</div>
  132 |         <div>接管内径2</div>
  133 |         <div>接管内径3</div>
  134 |       </div>
  135 | 
  136 |       <div className="barbed-port-columns">
  137 |         {BARBED_PORT_FILTER_KEYS.map(
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
```

匹配：filter，第 128 行

```tsx
  118 |     )?.value || "";
  119 | 
  120 |   const enabledPortCount =
  121 |     getBarbedPortCount(
  122 |       activeStructure
  123 |     );
  124 | 
  125 |   return (
  126 |     <section
  127 |       className="filter-group barbed-port-filter-group is-mobile-open"
  128 |       data-barbed-port-filter="true"
  129 |     >
  130 |       <div className="barbed-port-heading-grid">
  131 |         <div>接管内径1</div>
  132 |         <div>接管内径2</div>
  133 |         <div>接管内径3</div>
  134 |       </div>
  135 | 
  136 |       <div className="barbed-port-columns">
  137 |         {BARBED_PORT_FILTER_KEYS.map(
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
  144 |                 (item) =>
```

匹配：filter，第 137 行

```tsx
  127 |       className="filter-group barbed-port-filter-group is-mobile-open"
  128 |       data-barbed-port-filter="true"
  129 |     >
  130 |       <div className="barbed-port-heading-grid">
  131 |         <div>接管内径1</div>
  132 |         <div>接管内径2</div>
  133 |         <div>接管内径3</div>
  134 |       </div>
  135 | 
  136 |       <div className="barbed-port-columns">
  137 |         {BARBED_PORT_FILTER_KEYS.map(
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
  144 |                 (item) =>
  145 |                   item.key === filterKey
  146 |               ) ??
  147 |               ({
  148 |                 key: filterKey,
  149 |                 title:
  150 |                   `接管内径${portNumber}`,
  151 |                 inputType: "single",
  152 |                 options: [],
  153 |               } as ProductSelectionFilterGroup);
```

匹配：filter，第 138 行

```tsx
  128 |       data-barbed-port-filter="true"
  129 |     >
  130 |       <div className="barbed-port-heading-grid">
  131 |         <div>接管内径1</div>
  132 |         <div>接管内径2</div>
  133 |         <div>接管内径3</div>
  134 |       </div>
  135 | 
  136 |       <div className="barbed-port-columns">
  137 |         {BARBED_PORT_FILTER_KEYS.map(
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
  144 |                 (item) =>
  145 |                   item.key === filterKey
  146 |               ) ??
  147 |               ({
  148 |                 key: filterKey,
  149 |                 title:
  150 |                   `接管内径${portNumber}`,
  151 |                 inputType: "single",
  152 |                 options: [],
  153 |               } as ProductSelectionFilterGroup);
  154 | 
```

匹配：filter，第 143 行

```tsx
  133 |         <div>接管内径3</div>
  134 |       </div>
  135 | 
  136 |       <div className="barbed-port-columns">
  137 |         {BARBED_PORT_FILTER_KEYS.map(
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
  144 |                 (item) =>
  145 |                   item.key === filterKey
  146 |               ) ??
  147 |               ({
  148 |                 key: filterKey,
  149 |                 title:
  150 |                   `接管内径${portNumber}`,
  151 |                 inputType: "single",
  152 |                 options: [],
  153 |               } as ProductSelectionFilterGroup);
  154 | 
  155 |             const portDisabled =
  156 |               portNumber >
  157 |               enabledPortCount;
  158 | 
  159 |             return (
```

匹配：filter，第 145 行

```tsx
  135 | 
  136 |       <div className="barbed-port-columns">
  137 |         {BARBED_PORT_FILTER_KEYS.map(
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
  144 |                 (item) =>
  145 |                   item.key === filterKey
  146 |               ) ??
  147 |               ({
  148 |                 key: filterKey,
  149 |                 title:
  150 |                   `接管内径${portNumber}`,
  151 |                 inputType: "single",
  152 |                 options: [],
  153 |               } as ProductSelectionFilterGroup);
  154 | 
  155 |             const portDisabled =
  156 |               portNumber >
  157 |               enabledPortCount;
  158 | 
  159 |             return (
  160 |               <div
  161 |                 className={
```

匹配：filter，第 148 行

```tsx
  138 |           (filterKey, index) => {
  139 |             const portNumber =
  140 |               index + 1;
  141 | 
  142 |             const group =
  143 |               filterGroups.find(
  144 |                 (item) =>
  145 |                   item.key === filterKey
  146 |               ) ??
  147 |               ({
  148 |                 key: filterKey,
  149 |                 title:
  150 |                   `接管内径${portNumber}`,
  151 |                 inputType: "single",
  152 |                 options: [],
  153 |               } as ProductSelectionFilterGroup);
  154 | 
  155 |             const portDisabled =
  156 |               portNumber >
  157 |               enabledPortCount;
  158 | 
  159 |             return (
  160 |               <div
  161 |                 className={
  162 |                   portDisabled
  163 |                     ? "barbed-port-column is-disabled"
  164 |                     : "barbed-port-column"
```

匹配：filter，第 153 行

```tsx
  143 |               filterGroups.find(
  144 |                 (item) =>
  145 |                   item.key === filterKey
  146 |               ) ??
  147 |               ({
  148 |                 key: filterKey,
  149 |                 title:
  150 |                   `接管内径${portNumber}`,
  151 |                 inputType: "single",
  152 |                 options: [],
  153 |               } as ProductSelectionFilterGroup);
  154 | 
  155 |             const portDisabled =
  156 |               portNumber >
  157 |               enabledPortCount;
  158 | 
  159 |             return (
  160 |               <div
  161 |                 className={
  162 |                   portDisabled
  163 |                     ? "barbed-port-column is-disabled"
  164 |                     : "barbed-port-column"
  165 |                 }
  166 |                 key={filterKey}
  167 |               >
  168 |                 <div className="barbed-port-options">
  169 |                   {BARBED_PORT_SIZE_OPTIONS.map(
```

匹配：filter，第 166 行

```tsx
  156 |               portNumber >
  157 |               enabledPortCount;
  158 | 
  159 |             return (
  160 |               <div
  161 |                 className={
  162 |                   portDisabled
  163 |                     ? "barbed-port-column is-disabled"
  164 |                     : "barbed-port-column"
  165 |                 }
  166 |                 key={filterKey}
  167 |               >
  168 |                 <div className="barbed-port-options">
  169 |                   {BARBED_PORT_SIZE_OPTIONS.map(
  170 |                     (value) => {
  171 |                       const active =
  172 |                         isOptionActive(
  173 |                           group,
  174 |                           value
  175 |                         );
  176 | 
  177 |                       const disabled =
  178 |                         !active &&
  179 |                         (
  180 |                           portDisabled ||
  181 |                           Boolean(
  182 |                             isOptionDisabled?.(
```

匹配：filter，第 193 行

```tsx
  183 |                               group,
  184 |                               value
  185 |                             )
  186 |                           )
  187 |                         );
  188 | 
  189 |                       return (
  190 |                         <button
  191 |                           className={
  192 |                             [
  193 |                               "filter-option",
  194 |                               "is-single",
  195 |                               "barbed-port-option",
  196 |                               active
  197 |                                 ? "active"
  198 |                                 : "",
  199 |                               disabled
  200 |                                 ? "is-disabled"
  201 |                                 : "",
  202 |                             ]
  203 |                               .filter(Boolean)
  204 |                               .join(" ")
  205 |                           }
  206 |                           type="button"
  207 |                           key={value}
  208 |                           disabled={disabled}
  209 |                           aria-disabled={disabled}
```

匹配：filter，第 203 行

```tsx
  193 |                               "filter-option",
  194 |                               "is-single",
  195 |                               "barbed-port-option",
  196 |                               active
  197 |                                 ? "active"
  198 |                                 : "",
  199 |                               disabled
  200 |                                 ? "is-disabled"
  201 |                                 : "",
  202 |                             ]
  203 |                               .filter(Boolean)
  204 |                               .join(" ")
  205 |                           }
  206 |                           type="button"
  207 |                           key={value}
  208 |                           disabled={disabled}
  209 |                           aria-disabled={disabled}
  210 |                           onClick={() => {
  211 |                             if (disabled) {
  212 |                               return;
  213 |                             }
  214 | 
  215 |                             onFilterChange(
  216 |                               group,
  217 |                               value
  218 |                             );
  219 |                           }}
```

匹配：filter，第 215 行

```tsx
  205 |                           }
  206 |                           type="button"
  207 |                           key={value}
  208 |                           disabled={disabled}
  209 |                           aria-disabled={disabled}
  210 |                           onClick={() => {
  211 |                             if (disabled) {
  212 |                               return;
  213 |                             }
  214 | 
  215 |                             onFilterChange(
  216 |                               group,
  217 |                               value
  218 |                             );
  219 |                           }}
  220 |                         >
  221 |                           <span className="filter-check" />
  222 | 
  223 |                           <span className="barbed-port-option-label">
  224 |                             {value}
  225 |                           </span>
  226 |                         </button>
  227 |                       );
  228 |                     }
  229 |                   )}
  230 |                 </div>
  231 |               </div>
```

匹配：filter，第 221 行

```tsx
  211 |                             if (disabled) {
  212 |                               return;
  213 |                             }
  214 | 
  215 |                             onFilterChange(
  216 |                               group,
  217 |                               value
  218 |                             );
  219 |                           }}
  220 |                         >
  221 |                           <span className="filter-check" />
  222 | 
  223 |                           <span className="barbed-port-option-label">
  224 |                             {value}
  225 |                           </span>
  226 |                         </button>
  227 |                       );
  228 |                     }
  229 |                   )}
  230 |                 </div>
  231 |               </div>
  232 |             );
  233 |           }
  234 |         )}
  235 |       </div>
  236 |     </section>
  237 |   );
```

匹配：filter，第 240 行

```tsx
  230 |                 </div>
  231 |               </div>
  232 |             );
  233 |           }
  234 |         )}
  235 |       </div>
  236 |     </section>
  237 |   );
  238 | }
  239 | 
  240 | /* BARBED_PORT_FILTER_GROUP_END */
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
```

匹配：filter，第 243 行

```tsx
  233 |           }
  234 |         )}
  235 |       </div>
  236 |     </section>
  237 |   );
  238 | }
  239 | 
  240 | /* BARBED_PORT_FILTER_GROUP_END */
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257 |     useState(false);
  258 | 
  259 |   /*
```

匹配：productTypeId，第 245 行

```tsx
  235 |       </div>
  236 |     </section>
  237 |   );
  238 | }
  239 | 
  240 | /* BARBED_PORT_FILTER_GROUP_END */
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257 |     useState(false);
  258 | 
  259 |   /*
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
```

匹配：filter，第 246 行

```tsx
  236 |     </section>
  237 |   );
  238 | }
  239 | 
  240 | /* BARBED_PORT_FILTER_GROUP_END */
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257 |     useState(false);
  258 | 
  259 |   /*
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
```

匹配：filter，第 250 行

```tsx
  240 | /* BARBED_PORT_FILTER_GROUP_END */
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257 |     useState(false);
  258 | 
  259 |   /*
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
  263 |   useEffect(() => {
  264 |     setIsFittingProductTypeOpen(false);
  265 |   }, [activeCategory.id]);
  266 | 
```

匹配：filter，第 251 行

```tsx
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
  254 |    * 其余所有筛选组始终展开。
  255 |    */
  256 |   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257 |     useState(false);
  258 | 
  259 |   /*
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
  263 |   useEffect(() => {
  264 |     setIsFittingProductTypeOpen(false);
  265 |   }, [activeCategory.id]);
  266 | 
  267 |   return (
```

匹配：filter，第 269 行

```tsx
  259 |   /*
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
  263 |   useEffect(() => {
  264 |     setIsFittingProductTypeOpen(false);
  265 |   }, [activeCategory.id]);
  266 | 
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
```

匹配：productTypeId，第 270 行

```tsx
  260 |    * 切换顶部产品大类后，
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
  263 |   useEffect(() => {
  264 |     setIsFittingProductTypeOpen(false);
  265 |   }, [activeCategory.id]);
  266 | 
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
```

匹配：filter，第 271 行

```tsx
  261 |    * 接头系列的产品种类恢复为收起状态。
  262 |    */
  263 |   useEffect(() => {
  264 |     setIsFittingProductTypeOpen(false);
  265 |   }, [activeCategory.id]);
  266 | 
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
```

匹配：filter，第 276 行

```tsx
  266 | 
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
```

匹配：filter，第 277 行

```tsx
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
```

匹配：productTypeId，第 279 行

```tsx
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
```

匹配：filter，第 280 行

```tsx
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
```

匹配：filter，第 284 行

```tsx
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
```

匹配：filter，第 285 行

```tsx
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
```

匹配：filter，第 287 行

```tsx
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
```

匹配：filter，第 288 行

```tsx
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
  304 |             return null;
```

匹配：filter，第 291 行

```tsx
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
  304 |             return null;
  305 |           }
  306 | 
  307 |           const isProductTypeGroup =
```

匹配：productTypeId，第 298 行

```tsx
  288 |                   filterGroups={filterGroups}
  289 |                   isOptionActive={isOptionActive}
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
  304 |             return null;
  305 |           }
  306 | 
  307 |           const isProductTypeGroup =
  308 |             group.key === "productType";
  309 | 
  310 |           /*
  311 |            * 只有这一组折叠：
  312 |            * 接头系列 + 第一个产品种类。
  313 |            */
  314 |           const isCollapsibleProductType =
```

匹配：filter，第 300 行

```tsx
  290 |                 isOptionDisabled={isOptionDisabled}
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
  304 |             return null;
  305 |           }
  306 | 
  307 |           const isProductTypeGroup =
  308 |             group.key === "productType";
  309 | 
  310 |           /*
  311 |            * 只有这一组折叠：
  312 |            * 接头系列 + 第一个产品种类。
  313 |            */
  314 |           const isCollapsibleProductType =
  315 |             activeCategory.id === "fittings" &&
  316 |             isProductTypeGroup;
```

匹配：filter，第 301 行

```tsx
  291 |                   onFilterChange={onFilterChange}
  292 |                 />
  293 |               </div>
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
  304 |             return null;
  305 |           }
  306 | 
  307 |           const isProductTypeGroup =
  308 |             group.key === "productType";
  309 | 
  310 |           /*
  311 |            * 只有这一组折叠：
  312 |            * 接头系列 + 第一个产品种类。
  313 |            */
  314 |           const isCollapsibleProductType =
  315 |             activeCategory.id === "fittings" &&
  316 |             isProductTypeGroup;
  317 | 
```

匹配：filter，第 320 行

```tsx
  310 |           /*
  311 |            * 只有这一组折叠：
  312 |            * 接头系列 + 第一个产品种类。
  313 |            */
  314 |           const isCollapsibleProductType =
  315 |             activeCategory.id === "fittings" &&
  316 |             isProductTypeGroup;
  317 | 
  318 |           const isSingleSelectGroup =
  319 |             group.key === "productType" ||
  320 |             group.key === "filter01";
  321 | 
  322 |           const activeOption = group.options.find(
  323 |             (option) =>
  324 |               isOptionActive(group, option.value)
  325 |           );
  326 | 
  327 |           const optionTypeClass = isSingleSelectGroup
  328 |             ? "is-single"
  329 |             : "is-multi";
  330 | 
  331 |           /*
  332 |            * 保留原有列数逻辑。
  333 |            */
  334 |                     /*
  335 |            * QUICK_CONNECT_TWO_COLUMN_FILTERS
  336 |            *
```

匹配：filter，第 335 行

```tsx
  325 |           );
  326 | 
  327 |           const optionTypeClass = isSingleSelectGroup
  328 |             ? "is-single"
  329 |             : "is-multi";
  330 | 
  331 |           /*
  332 |            * 保留原有列数逻辑。
  333 |            */
  334 |                     /*
  335 |            * QUICK_CONNECT_TWO_COLUMN_FILTERS
  336 |            *
  337 |            * 继续使用现有 filter-options two 样式，
  338 |            * 不新建快插接头专属CSS。
  339 |            */
  340 |           const quickConnectTwoColumnTitles = [
  341 |             "阀门配置",
  342 |             "Valve Configuration",
  343 |             "形状",
  344 |             "Shape",
  345 |             "外壳材质",
  346 |             "Housing Material",
  347 |             "密封圈材质",
  348 |             "Seal Material",
  349 |           ];
  350 | 
  351 |           const isThreadToBarbed =
```

匹配：filter，第 337 行

```tsx
  327 |           const optionTypeClass = isSingleSelectGroup
  328 |             ? "is-single"
  329 |             : "is-multi";
  330 | 
  331 |           /*
  332 |            * 保留原有列数逻辑。
  333 |            */
  334 |                     /*
  335 |            * QUICK_CONNECT_TWO_COLUMN_FILTERS
  336 |            *
  337 |            * 继续使用现有 filter-options two 样式，
  338 |            * 不新建快插接头专属CSS。
  339 |            */
  340 |           const quickConnectTwoColumnTitles = [
  341 |             "阀门配置",
  342 |             "Valve Configuration",
  343 |             "形状",
  344 |             "Shape",
  345 |             "外壳材质",
  346 |             "Housing Material",
  347 |             "密封圈材质",
  348 |             "Seal Material",
  349 |           ];
  350 | 
  351 |           const isThreadToBarbed =
  352 |             activeProductTypeId ===
  353 |             "thread-to-barbed-fittings";
```

匹配：productTypeId，第 352 行

```tsx
  342 |             "Valve Configuration",
  343 |             "形状",
  344 |             "Shape",
  345 |             "外壳材质",
  346 |             "Housing Material",
  347 |             "密封圈材质",
  348 |             "Seal Material",
  349 |           ];
  350 | 
  351 |           const isThreadToBarbed =
  352 |             activeProductTypeId ===
  353 |             "thread-to-barbed-fittings";
  354 | 
  355 |           /*
  356 |            * LUER_FITTING_FILTER_LAYOUT_START
  357 |            *
  358 |            * 鲁尔接头：
  359 |            * filter01 产品类型文字较长，每项独占一行；
  360 |            * filter02 产品系列使用两列。
  361 |            */
  362 |           const isLuerFitting =
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
```

匹配：filter，第 356 行

```tsx
  346 |             "Housing Material",
  347 |             "密封圈材质",
  348 |             "Seal Material",
  349 |           ];
  350 | 
  351 |           const isThreadToBarbed =
  352 |             activeProductTypeId ===
  353 |             "thread-to-barbed-fittings";
  354 | 
  355 |           /*
  356 |            * LUER_FITTING_FILTER_LAYOUT_START
  357 |            *
  358 |            * 鲁尔接头：
  359 |            * filter01 产品类型文字较长，每项独占一行；
  360 |            * filter02 产品系列使用两列。
  361 |            */
  362 |           const isLuerFitting =
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
```

匹配：filter，第 359 行

```tsx
  349 |           ];
  350 | 
  351 |           const isThreadToBarbed =
  352 |             activeProductTypeId ===
  353 |             "thread-to-barbed-fittings";
  354 | 
  355 |           /*
  356 |            * LUER_FITTING_FILTER_LAYOUT_START
  357 |            *
  358 |            * 鲁尔接头：
  359 |            * filter01 产品类型文字较长，每项独占一行；
  360 |            * filter02 产品系列使用两列。
  361 |            */
  362 |           const isLuerFitting =
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
```

匹配：filter，第 360 行

```tsx
  350 | 
  351 |           const isThreadToBarbed =
  352 |             activeProductTypeId ===
  353 |             "thread-to-barbed-fittings";
  354 | 
  355 |           /*
  356 |            * LUER_FITTING_FILTER_LAYOUT_START
  357 |            *
  358 |            * 鲁尔接头：
  359 |            * filter01 产品类型文字较长，每项独占一行；
  360 |            * filter02 产品系列使用两列。
  361 |            */
  362 |           const isLuerFitting =
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
```

匹配：productTypeId，第 363 行

```tsx
  353 |             "thread-to-barbed-fittings";
  354 | 
  355 |           /*
  356 |            * LUER_FITTING_FILTER_LAYOUT_START
  357 |            *
  358 |            * 鲁尔接头：
  359 |            * filter01 产品类型文字较长，每项独占一行；
  360 |            * filter02 产品系列使用两列。
  361 |            */
  362 |           const isLuerFitting =
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
```

匹配：filter，第 367 行

```tsx
  357 |            *
  358 |            * 鲁尔接头：
  359 |            * filter01 产品类型文字较长，每项独占一行；
  360 |            * filter02 产品系列使用两列。
  361 |            */
  362 |           const isLuerFitting =
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
```

匹配：productTypeId，第 373 行

```tsx
  363 |             activeProductTypeId ===
  364 |             "luer-fittings";
  365 | 
  366 | /*
  367 |  * FEMALE_THREAD_FILTER_LAYOUT_START
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
```

匹配：filter，第 378 行

```tsx
  368 |  *
  369 |  * 连接结构文字较长，使用一列；
  370 |  * 其余工程筛选项使用两列。
  371 |  */
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
```

匹配：filter，第 382 行

```tsx
  372 |           const isFemaleThreadAdapter =
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
```

匹配：filter，第 383 行

```tsx
  373 |             activeProductTypeId ===
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
```

匹配：filter，第 384 行

```tsx
  374 |             "female-thread-adapters";
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
```

匹配：filter，第 385 行

```tsx
  375 | 
  376 |           const shouldUseTwoColumns =
  377 |             isFemaleThreadAdapter &&
  378 |             group.key === "filter01"
  379 |               ? false
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
```

匹配：filter，第 390 行

```tsx
  380 |               : isFemaleThreadAdapter &&
  381 |                   (
  382 |                     group.key === "filter02" ||
  383 |                     group.key === "filter03" ||
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
```

匹配：filter，第 394 行

```tsx
  384 |                     group.key === "filter04" ||
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
```

匹配：filter，第 395 行

```tsx
  385 |                     group.key === "filter05"
  386 |                   )
  387 |                 ? true
  388 |                 :
  389 |             isLuerFitting &&
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
  411 |                   group.options.length > 4;
```

匹配：filter，第 400 行

```tsx
  390 |             group.key === "filter01"
  391 |               ? false
  392 |               : isLuerFitting &&
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
  411 |                   group.options.length > 4;
  412 | 
  413 |           const filterOptionsClass = `filter-options${
  414 |             shouldUseTwoColumns ? " two" : " one"
  415 |           }`;
  416 | 
```

匹配：filter，第 403 行

```tsx
  393 |                   (
  394 |                     group.key === "filter02" ||
  395 |                     group.key === "filter05"
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
  411 |                   group.options.length > 4;
  412 | 
  413 |           const filterOptionsClass = `filter-options${
  414 |             shouldUseTwoColumns ? " two" : " one"
  415 |           }`;
  416 | 
  417 |           /*
  418 |            * 只有接头的产品种类使用状态控制。
  419 |            * 其他所有组始终展开。
```

匹配：filter，第 406 行

```tsx
  396 |                   )
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
  411 |                   group.options.length > 4;
  412 | 
  413 |           const filterOptionsClass = `filter-options${
  414 |             shouldUseTwoColumns ? " two" : " one"
  415 |           }`;
  416 | 
  417 |           /*
  418 |            * 只有接头的产品种类使用状态控制。
  419 |            * 其他所有组始终展开。
  420 |            */
  421 |           const isGroupOpen = isCollapsibleProductType
  422 |             ? isFittingProductTypeOpen
```

匹配：filter，第 407 行

```tsx
  397 |                 ? true
  398 |                 :
  399 |             isThreadToBarbed &&
  400 |             group.key === "filter02"
  401 |               ? false
  402 |               : isThreadToBarbed &&
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
  411 |                   group.options.length > 4;
  412 | 
  413 |           const filterOptionsClass = `filter-options${
  414 |             shouldUseTwoColumns ? " two" : " one"
  415 |           }`;
  416 | 
  417 |           /*
  418 |            * 只有接头的产品种类使用状态控制。
  419 |            * 其他所有组始终展开。
  420 |            */
  421 |           const isGroupOpen = isCollapsibleProductType
  422 |             ? isFittingProductTypeOpen
  423 |             : true;
```

匹配：filter，第 413 行

```tsx
  403 |                   group.key === "filter01"
  404 |                 ? true
  405 |                 : group.key === "productType" ||
  406 |                   group.key === "filter02" ||
  407 |                   group.key === "filter03" ||
  408 |                   quickConnectTwoColumnTitles.includes(
  409 |                     group.title
  410 |                   ) ||
  411 |                   group.options.length > 4;
  412 | 
  413 |           const filterOptionsClass = `filter-options${
  414 |             shouldUseTwoColumns ? " two" : " one"
  415 |           }`;
  416 | 
  417 |           /*
  418 |            * 只有接头的产品种类使用状态控制。
  419 |            * 其他所有组始终展开。
  420 |            */
  421 |           const isGroupOpen = isCollapsibleProductType
  422 |             ? isFittingProductTypeOpen
  423 |             : true;
  424 | 
  425 |           const groupClassName = `filter-group${
  426 |             isProductTypeGroup
  427 |               ? " product-type-filter-group"
  428 |               : ""
  429 |           }${
```

匹配：filter，第 425 行

```tsx
  415 |           }`;
  416 | 
  417 |           /*
  418 |            * 只有接头的产品种类使用状态控制。
  419 |            * 其他所有组始终展开。
  420 |            */
  421 |           const isGroupOpen = isCollapsibleProductType
  422 |             ? isFittingProductTypeOpen
  423 |             : true;
  424 | 
  425 |           const groupClassName = `filter-group${
  426 |             isProductTypeGroup
  427 |               ? " product-type-filter-group"
  428 |               : ""
  429 |           }${
  430 |             isCollapsibleProductType
  431 |               ? " fittings-product-type-filter-group"
  432 |               : ""
  433 |           }${isGroupOpen ? " is-mobile-open" : ""}`;
  434 | 
  435 |           const handleToggleGroup = () => {
  436 |             if (!isCollapsibleProductType) {
  437 |               return;
  438 |             }
  439 | 
  440 |             setIsFittingProductTypeOpen(
  441 |               (current) => !current
```

匹配：filter，第 427 行

```tsx
  417 |           /*
  418 |            * 只有接头的产品种类使用状态控制。
  419 |            * 其他所有组始终展开。
  420 |            */
  421 |           const isGroupOpen = isCollapsibleProductType
  422 |             ? isFittingProductTypeOpen
  423 |             : true;
  424 | 
  425 |           const groupClassName = `filter-group${
  426 |             isProductTypeGroup
  427 |               ? " product-type-filter-group"
  428 |               : ""
  429 |           }${
  430 |             isCollapsibleProductType
  431 |               ? " fittings-product-type-filter-group"
  432 |               : ""
  433 |           }${isGroupOpen ? " is-mobile-open" : ""}`;
  434 | 
  435 |           const handleToggleGroup = () => {
  436 |             if (!isCollapsibleProductType) {
  437 |               return;
  438 |             }
  439 | 
  440 |             setIsFittingProductTypeOpen(
  441 |               (current) => !current
  442 |             );
  443 |           };
```

匹配：filter，第 431 行

```tsx
  421 |           const isGroupOpen = isCollapsibleProductType
  422 |             ? isFittingProductTypeOpen
  423 |             : true;
  424 | 
  425 |           const groupClassName = `filter-group${
  426 |             isProductTypeGroup
  427 |               ? " product-type-filter-group"
  428 |               : ""
  429 |           }${
  430 |             isCollapsibleProductType
  431 |               ? " fittings-product-type-filter-group"
  432 |               : ""
  433 |           }${isGroupOpen ? " is-mobile-open" : ""}`;
  434 | 
  435 |           const handleToggleGroup = () => {
  436 |             if (!isCollapsibleProductType) {
  437 |               return;
  438 |             }
  439 | 
  440 |             setIsFittingProductTypeOpen(
  441 |               (current) => !current
  442 |             );
  443 |           };
  444 | 
  445 |           /*
  446 |            * THREAD_TO_BARBED_GENERIC_DISABLED_RENDER
  447 |            *
```

匹配：filter，第 455 行

```tsx
  445 |           /*
  446 |            * THREAD_TO_BARBED_GENERIC_DISABLED_RENDER
  447 |            *
  448 |            * 普通筛选按钮支持：
  449 |            * - 灰色禁用状态
  450 |            * - disabled 属性
  451 |            * - aria-disabled
  452 |            * - 禁止触发筛选事件
  453 |            */
  454 |           const renderOptions = () => (
  455 |             <div className={filterOptionsClass}>
  456 |               {group.options.map((option) => {
  457 |                 const active = isOptionActive(
  458 |                   group,
  459 |                   option.value
  460 |                 );
  461 | 
  462 |                 const disabled =
  463 |                   !active &&
  464 |                   Boolean(
  465 |                     isOptionDisabled?.(
  466 |                       group,
  467 |                       option.value
  468 |                     )
  469 |                   );
  470 | 
  471 |                 return (
```

匹配：filter，第 474 行

```tsx
  464 |                   Boolean(
  465 |                     isOptionDisabled?.(
  466 |                       group,
  467 |                       option.value
  468 |                     )
  469 |                   );
  470 | 
  471 |                 return (
  472 |                   <button
  473 |                     className={[
  474 |                       "filter-option",
  475 |                       optionTypeClass,
  476 |                       active ? "active" : "",
  477 |                       disabled
  478 |                         ? "is-disabled"
  479 |                         : "",
  480 |                     ]
  481 |                       .filter(Boolean)
  482 |                       .join(" ")}
  483 |                     type="button"
  484 |                     key={option.value}
  485 |                     disabled={disabled}
  486 |                     aria-disabled={disabled}
  487 |                     onClick={() => {
  488 |                       if (disabled) {
  489 |                         return;
  490 |                       }
```

匹配：filter，第 481 行

```tsx
  471 |                 return (
  472 |                   <button
  473 |                     className={[
  474 |                       "filter-option",
  475 |                       optionTypeClass,
  476 |                       active ? "active" : "",
  477 |                       disabled
  478 |                         ? "is-disabled"
  479 |                         : "",
  480 |                     ]
  481 |                       .filter(Boolean)
  482 |                       .join(" ")}
  483 |                     type="button"
  484 |                     key={option.value}
  485 |                     disabled={disabled}
  486 |                     aria-disabled={disabled}
  487 |                     onClick={() => {
  488 |                       if (disabled) {
  489 |                         return;
  490 |                       }
  491 | 
  492 |                       onFilterChange(
  493 |                         group,
  494 |                         option.value
  495 |                       );
  496 | 
  497 |                       /*
```

匹配：filter，第 492 行

```tsx
  482 |                       .join(" ")}
  483 |                     type="button"
  484 |                     key={option.value}
  485 |                     disabled={disabled}
  486 |                     aria-disabled={disabled}
  487 |                     onClick={() => {
  488 |                       if (disabled) {
  489 |                         return;
  490 |                       }
  491 | 
  492 |                       onFilterChange(
  493 |                         group,
  494 |                         option.value
  495 |                       );
  496 | 
  497 |                       /*
  498 |                        * 选择接头产品种类后自动收起。
  499 |                        */
  500 |                       if (
  501 |                         isCollapsibleProductType
  502 |                       ) {
  503 |                         setIsFittingProductTypeOpen(
  504 |                           false
  505 |                         );
  506 |                       }
  507 |                     }}
  508 |                   >
```

匹配：filter，第 509 行

```tsx
  499 |                        */
  500 |                       if (
  501 |                         isCollapsibleProductType
  502 |                       ) {
  503 |                         setIsFittingProductTypeOpen(
  504 |                           false
  505 |                         );
  506 |                       }
  507 |                     }}
  508 |                   >
  509 |                     <span className="filter-check" />
  510 |                     <span>{option.label}</span>
  511 |                   </button>
  512 |                 );
  513 |               })}
  514 |             </div>
  515 |           );
  516 | 
  517 |           return (
  518 |             <section
  519 |               className={groupClassName}
  520 |               key={group.key}
  521 |             >
  522 |               <button
  523 |                 className={`filter-group-trigger${
  524 |                   isCollapsibleProductType
  525 |                     ? " product-type-filter-toggle"
```

匹配：filter，第 523 行

```tsx
  513 |               })}
  514 |             </div>
  515 |           );
  516 | 
  517 |           return (
  518 |             <section
  519 |               className={groupClassName}
  520 |               key={group.key}
  521 |             >
  522 |               <button
  523 |                 className={`filter-group-trigger${
  524 |                   isCollapsibleProductType
  525 |                     ? " product-type-filter-toggle"
  526 |                     : ""
  527 |                 }`}
  528 |                 type="button"
  529 |                 onClick={handleToggleGroup}
  530 |                 aria-expanded={isGroupOpen}
  531 |               >
  532 |                 <span>{group.title}</span>
  533 | 
  534 |                 {isCollapsibleProductType ? (
  535 |                   <span
  536 |                     className="filter-group-symbol"
  537 |                     aria-hidden="true"
  538 |                   >
  539 |                     {isGroupOpen ? "−" : "+"}
```

匹配：filter，第 525 行

```tsx
  515 |           );
  516 | 
  517 |           return (
  518 |             <section
  519 |               className={groupClassName}
  520 |               key={group.key}
  521 |             >
  522 |               <button
  523 |                 className={`filter-group-trigger${
  524 |                   isCollapsibleProductType
  525 |                     ? " product-type-filter-toggle"
  526 |                     : ""
  527 |                 }`}
  528 |                 type="button"
  529 |                 onClick={handleToggleGroup}
  530 |                 aria-expanded={isGroupOpen}
  531 |               >
  532 |                 <span>{group.title}</span>
  533 | 
  534 |                 {isCollapsibleProductType ? (
  535 |                   <span
  536 |                     className="filter-group-symbol"
  537 |                     aria-hidden="true"
  538 |                   >
  539 |                     {isGroupOpen ? "−" : "+"}
  540 |                   </span>
  541 |                 ) : null}
```

匹配：filter，第 536 行

```tsx
  526 |                     : ""
  527 |                 }`}
  528 |                 type="button"
  529 |                 onClick={handleToggleGroup}
  530 |                 aria-expanded={isGroupOpen}
  531 |               >
  532 |                 <span>{group.title}</span>
  533 | 
  534 |                 {isCollapsibleProductType ? (
  535 |                   <span
  536 |                     className="filter-group-symbol"
  537 |                     aria-hidden="true"
  538 |                   >
  539 |                     {isGroupOpen ? "−" : "+"}
  540 |                   </span>
  541 |                 ) : null}
  542 |               </button>
  543 | 
  544 |               {isCollapsibleProductType &&
  545 |               !isFittingProductTypeOpen &&
  546 |               activeOption ? (
  547 |                 <div className="product-type-current-option">
  548 |                   <button
  549 |                     className="filter-option is-single active"
  550 |                     type="button"
  551 |                     onClick={() =>
  552 |                       setIsFittingProductTypeOpen(
```

匹配：filter，第 549 行

```tsx
  539 |                     {isGroupOpen ? "−" : "+"}
  540 |                   </span>
  541 |                 ) : null}
  542 |               </button>
  543 | 
  544 |               {isCollapsibleProductType &&
  545 |               !isFittingProductTypeOpen &&
  546 |               activeOption ? (
  547 |                 <div className="product-type-current-option">
  548 |                   <button
  549 |                     className="filter-option is-single active"
  550 |                     type="button"
  551 |                     onClick={() =>
  552 |                       setIsFittingProductTypeOpen(
  553 |                         true
  554 |                       )
  555 |                     }
  556 |                   >
  557 |                     <span className="filter-check" />
  558 |                     <span>
  559 |                       当前：{activeOption.label}
  560 |                     </span>
  561 |                   </button>
  562 |                 </div>
  563 |               ) : null}
  564 | 
  565 |               {isGroupOpen ? renderOptions() : null}
```

匹配：filter，第 557 行

```tsx
  547 |                 <div className="product-type-current-option">
  548 |                   <button
  549 |                     className="filter-option is-single active"
  550 |                     type="button"
  551 |                     onClick={() =>
  552 |                       setIsFittingProductTypeOpen(
  553 |                         true
  554 |                       )
  555 |                     }
  556 |                   >
  557 |                     <span className="filter-check" />
  558 |                     <span>
  559 |                       当前：{activeOption.label}
  560 |                     </span>
  561 |                   </button>
  562 |                 </div>
  563 |               ) : null}
  564 | 
  565 |               {isGroupOpen ? renderOptions() : null}
  566 |             </section>
  567 |           );
  568 |         })
  569 |       ) : (
  570 |         <div className="filter-empty">
  571 |           {emptyText}
  572 |         </div>
  573 |       )}
```

匹配：filter，第 570 行

```tsx
  560 |                     </span>
  561 |                   </button>
  562 |                 </div>
  563 |               ) : null}
  564 | 
  565 |               {isGroupOpen ? renderOptions() : null}
  566 |             </section>
  567 |           );
  568 |         })
  569 |       ) : (
  570 |         <div className="filter-empty">
  571 |           {emptyText}
  572 |         </div>
  573 |       )}
  574 |     </aside>
  575 |   );
  576 | }
  577 | 
  578 | 
```

## components/products/selection/ProductSelectionClient.tsx

### import

```tsx
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
import SitePageShell from "@/components/layout/SitePageShell";
import {
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
import {
import {
import {
import {
import {
import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
import {
import {
import {
import {
import {
import {
import {
import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
import {
import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
import type {
import type {
import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
```

### 组件或函数入口

```tsx
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
 1975 |   initialProductTypeId,
 1976 |   initialFilters,
 1977 | }: ProductSelectionClientProps) {
 1978 |   const router = useRouter();
 1979 |   const searchParams = useSearchParams();
 1980 |   const requestedCategoryId = searchParams.get("category");
 1981 |   const requestedProductTypeId = searchParams.get("productType");
 1982 | 
 1983 |   const pageText =
 1984 |     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 1985 | 
 1986 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1987 | 
 1988 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
 1992 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 1993 |     const initialActiveCategoryId =
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
```

### 关键词匹配：503

匹配：filter，第 11 行

```tsx
    1 | ﻿"use client";
    2 | 
    3 | import { useEffect, useMemo, useState } from "react";
    4 | import { useRouter, useSearchParams } from "next/navigation";
    5 | import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
    6 | import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
    7 | import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
    8 | 
    9 | import SitePageShell from "@/components/layout/SitePageShell";
   10 | import {
   11 |   getProductTypeFilterOptionsByCategory,
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
```

匹配：filter，第 13 行

```tsx
    3 | import { useEffect, useMemo, useState } from "react";
    4 | import { useRouter, useSearchParams } from "next/navigation";
    5 | import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
    6 | import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
    7 | import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
    8 | 
    9 | import SitePageShell from "@/components/layout/SitePageShell";
   10 | import {
   11 |   getProductTypeFilterOptionsByCategory,
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
```

匹配：filter，第 14 行

```tsx
    4 | import { useRouter, useSearchParams } from "next/navigation";
    5 | import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
    6 | import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
    7 | import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
    8 | 
    9 | import SitePageShell from "@/components/layout/SitePageShell";
   10 | import {
   11 |   getProductTypeFilterOptionsByCategory,
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
```

匹配：filter，第 18 行

```tsx
    8 | 
    9 | import SitePageShell from "@/components/layout/SitePageShell";
   10 | import {
   11 |   getProductTypeFilterOptionsByCategory,
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
```

匹配：filter、filterLabels，第 20 行

```tsx
   10 | import {
   11 |   getProductTypeFilterOptionsByCategory,
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
```

匹配：taxonomyItems，第 22 行

```tsx
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
```

匹配：taxonomyItems，第 26 行

```tsx
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
```

匹配：filter、filterLabels，第 27 行

```tsx
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
```

匹配：filter、filterLabels，第 31 行

```tsx
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
```

匹配：filter、filterLabels，第 35 行

```tsx
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
   48 | import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
   49 | import {
   50 |   hardTubeFittingFilterLabels,
   51 |   hardTubeFittingSelectionProducts,
```

匹配：filter、filterLabels，第 39 行

```tsx
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
   48 | import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
   49 | import {
   50 |   hardTubeFittingFilterLabels,
   51 |   hardTubeFittingSelectionProducts,
   52 |   hardTubeFittingTaxonomyItems,
   53 | } from "@/data/products/selection/hard-tube-fitting-selection.generated";
   54 | import {
   55 |   barbedFittingFilterLabels,
```

匹配：filter、filterLabels，第 43 行

```tsx
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
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
   59 | import {
```

匹配：filter、filterLabels，第 50 行

```tsx
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
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
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
```

匹配：taxonomyItems，第 52 行

```tsx
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
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
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
```

匹配：filter、filterLabels，第 55 行

```tsx
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
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
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
```

匹配：taxonomyItems，第 57 行

```tsx
   47 | 
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
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
```

匹配：filter、filterLabels，第 60 行

```tsx
   50 |   hardTubeFittingFilterLabels,
   51 |   hardTubeFittingSelectionProducts,
   52 |   hardTubeFittingTaxonomyItems,
   53 | } from "@/data/products/selection/hard-tube-fitting-selection.generated";
   54 | import {
   55 |   barbedFittingFilterLabels,
   56 |   barbedFittingSelectionProducts,
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
```

匹配：taxonomyItems，第 62 行

```tsx
   52 |   hardTubeFittingTaxonomyItems,
   53 | } from "@/data/products/selection/hard-tube-fitting-selection.generated";
   54 | import {
   55 |   barbedFittingFilterLabels,
   56 |   barbedFittingSelectionProducts,
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
```

匹配：filter、filterLabels，第 65 行

```tsx
   55 |   barbedFittingFilterLabels,
   56 |   barbedFittingSelectionProducts,
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
```

匹配：taxonomyItems，第 67 行

```tsx
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
```

匹配：filter、filterLabels，第 71 行

```tsx
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
```

匹配：taxonomyItems，第 73 行

```tsx
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
```

匹配：filter、filterLabels，第 77 行

```tsx
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
```

匹配：taxonomyItems，第 79 行

```tsx
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
```

匹配：filter，第 90 行

```tsx
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
   96 |   syringePumpSelectionProducts,
   97 | } from "@/data/products/selection/syringe-pump-selection.generated";
   98 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
```

匹配：filter，第 93 行

```tsx
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
   96 |   syringePumpSelectionProducts,
   97 | } from "@/data/products/selection/syringe-pump-selection.generated";
   98 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
```

匹配：filter、filterLabels，第 95 行

```tsx
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
   96 |   syringePumpSelectionProducts,
   97 | } from "@/data/products/selection/syringe-pump-selection.generated";
   98 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
  110 |   ProductSelectionSelectedTag,
  111 | } from "./product-selection-ui.types";
```

匹配：filter、taxonomyItems、filterLabels，第 98 行

```tsx
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
   96 |   syringePumpSelectionProducts,
   97 | } from "@/data/products/selection/syringe-pump-selection.generated";
   98 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
  110 |   ProductSelectionSelectedTag,
  111 | } from "./product-selection-ui.types";
  112 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
  113 | 
  114 | const selectionProducts = [
```

匹配：filter，第 101 行

```tsx
   91 | import ProductSelectionPagination from "./ProductSelectionPagination";
   92 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
   96 |   syringePumpSelectionProducts,
   97 | } from "@/data/products/selection/syringe-pump-selection.generated";
   98 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
  110 |   ProductSelectionSelectedTag,
  111 | } from "./product-selection-ui.types";
  112 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
  113 | 
  114 | const selectionProducts = [
  115 |     ...femaleThreadAdapterSelectionProducts,
  116 | ...luerFittingSelectionProducts,
  117 |     ...quickConnectFittingSelectionProducts,
```

匹配：filter，第 103 行

```tsx
   93 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   94 | import {
   95 |   syringePumpFilterLabels,
   96 |   syringePumpSelectionProducts,
   97 | } from "@/data/products/selection/syringe-pump-selection.generated";
   98 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
  110 |   ProductSelectionSelectedTag,
  111 | } from "./product-selection-ui.types";
  112 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
  113 | 
  114 | const selectionProducts = [
  115 |     ...femaleThreadAdapterSelectionProducts,
  116 | ...luerFittingSelectionProducts,
  117 |     ...quickConnectFittingSelectionProducts,
  118 |   ...threadToBarbedFittingSelectionProducts,
  119 | ...baseSelectionProducts,
```

匹配：filter，第 109 行

```tsx
   99 | 
  100 | import type {
  101 |   ProductSelectionFilterLabel,
  102 |   ProductSelectionProduct,
  103 |   SelectionFilterKey,
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
  110 |   ProductSelectionSelectedTag,
  111 | } from "./product-selection-ui.types";
  112 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
  113 | 
  114 | const selectionProducts = [
  115 |     ...femaleThreadAdapterSelectionProducts,
  116 | ...luerFittingSelectionProducts,
  117 |     ...quickConnectFittingSelectionProducts,
  118 |   ...threadToBarbedFittingSelectionProducts,
  119 | ...baseSelectionProducts,
  120 |   ...diaphragmPumpSelectionProducts,
  121 |   ...pipettingPumpSelectionProducts,
  122 |   ...valvelessPumpSelectionProducts,
  123 |   ...valveSelectionProducts,
  124 |   ...probeSelectionProducts,
  125 |   ...tubingSelectionProducts,
```

匹配：filter，第 130 行

```tsx
  120 |   ...diaphragmPumpSelectionProducts,
  121 |   ...pipettingPumpSelectionProducts,
  122 |   ...valvelessPumpSelectionProducts,
  123 |   ...valveSelectionProducts,
  124 |   ...probeSelectionProducts,
  125 |   ...tubingSelectionProducts,
  126 |   ...hardTubeFittingSelectionProducts,
  127 |   ...barbedFittingSelectionProducts,
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
```

匹配：taxonomyItems，第 134 行

```tsx
  124 |   ...probeSelectionProducts,
  125 |   ...tubingSelectionProducts,
  126 |   ...hardTubeFittingSelectionProducts,
  127 |   ...barbedFittingSelectionProducts,
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
```

匹配：taxonomyItems，第 135 行

```tsx
  125 |   ...tubingSelectionProducts,
  126 |   ...hardTubeFittingSelectionProducts,
  127 |   ...barbedFittingSelectionProducts,
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
```

匹配：taxonomyItems，第 136 行

```tsx
  126 |   ...hardTubeFittingSelectionProducts,
  127 |   ...barbedFittingSelectionProducts,
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
```

匹配：taxonomyItems，第 137 行

```tsx
  127 |   ...barbedFittingSelectionProducts,
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
```

匹配：taxonomyItems，第 138 行

```tsx
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
```

匹配：taxonomyItems，第 139 行

```tsx
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
```

匹配：taxonomyItems，第 140 行

```tsx
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
```

匹配：taxonomyItems，第 141 行

```tsx
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
```

匹配：taxonomyItems，第 142 行

```tsx
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
```

匹配：taxonomyItems，第 143 行

```tsx
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
```

匹配：filter，第 144 行

```tsx
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
```

匹配：filter、filterLabels，第 148 行

```tsx
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
```

匹配：filter、filterLabels，第 149 行

```tsx
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
```

匹配：filter、filterLabels，第 150 行

```tsx
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
```

匹配：filter、filterLabels，第 151 行

```tsx
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
```

匹配：filter、filterLabels，第 152 行

```tsx
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
```

匹配：filter、filterLabels，第 153 行

```tsx
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
```

匹配：filter、filterLabels，第 154 行

```tsx
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
```

匹配：filter、filterLabels，第 155 行

```tsx
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
```

匹配：filter、filterLabels，第 156 行

```tsx
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
```

匹配：filter、filterLabels，第 157 行

```tsx
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
```

匹配：filter、filterLabels，第 158 行

```tsx
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
```

匹配：filter、filterLabels，第 159 行

```tsx
  149 |     ...femaleThreadAdapterFilterLabels,
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
```

匹配：filter、filterLabels，第 160 行

```tsx
  150 | ...luerFittingSelectionFilterLabels,
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
```

匹配：filter、filterLabels，第 161 行

```tsx
  151 |     ...quickConnectFittingFilterLabels,
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
```

匹配：filter、filterLabels，第 162 行

```tsx
  152 |   ...threadToBarbedFittingFilterLabels,
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
```

匹配：filter，第 163 行

```tsx
  153 | ...baseSelectionFilterLabels,
  154 |   ...hardTubeFittingFilterLabels,
  155 |   ...barbedFittingFilterLabels,
  156 |   ...diaphragmPumpFilterLabels,
  157 |   ...pipettingPumpFilterLabels,
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
```

匹配：productTypeId，第 168 行

```tsx
  158 |   ...valvelessPumpFilterLabels,
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
```

匹配：filter，第 169 行

```tsx
  159 |   ...valveFilterLabels,
  160 |   ...probeFilterLabels,
  161 |   ...syringePumpFilterLabels,
  162 |   ...controlModuleFilterLabels,
  163 | ].filter((label, index, array) => {
  164 |   return (
  165 |     index ===
  166 |     array.findIndex((item) => {
  167 |       return (
  168 |         (item as any).productTypeId === (label as any).productTypeId &&
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
```

匹配：productTypeId，第 179 行

```tsx
  169 |         (item as any).filterKey === (label as any).filterKey
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
```

匹配：filter，第 180 行

```tsx
  170 |       );
  171 |     })
  172 |   );
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
```

匹配：filter，第 183 行

```tsx
  173 | });
  174 | 
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
```

匹配：filter，第 185 行

```tsx
  175 | type ProductSelectionClientProps = {
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
```

匹配：filter，第 186 行

```tsx
  176 |   locale?: SelectionLocale;
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
```

匹配：filter，第 187 行

```tsx
  177 |   pageData?: unknown;
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
```

匹配：filter，第 188 行

```tsx
  178 |   initialCategoryId?: string;
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
```

匹配：filter，第 189 行

```tsx
  179 |   initialProductTypeId?: string;
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
```

匹配：filter，第 190 行

```tsx
  180 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
  206 |     resetFilters: "清除筛选",
```

匹配：filter，第 191 行

```tsx
  181 | };
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
  206 |     resetFilters: "清除筛选",
  207 |     submitRequirement: "提交需求",
```

匹配：filter，第 192 行

```tsx
  182 | 
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
  206 |     resetFilters: "清除筛选",
  207 |     submitRequirement: "提交需求",
  208 |     detailButton: "查看详情",
```

匹配：filter，第 193 行

```tsx
  183 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  184 | 
  185 | const FILTER_KEYS: SelectionFilterKey[] = [
  186 |   "filter01",
  187 |   "filter02",
  188 |   "filter03",
  189 |   "filter04",
  190 |   "filter05",
  191 |   "filter06",
  192 |   "filter07",
  193 |   "filter08",
  194 | ];
  195 | 
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
  206 |     resetFilters: "清除筛选",
  207 |     submitRequirement: "提交需求",
  208 |     detailButton: "查看详情",
  209 |     addToList: "加入清单",
```

匹配：filter，第 206 行

```tsx
  196 | const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  197 |   zh: {
  198 |     breadcrumbHome: "首页",
  199 |     breadcrumbCurrent: "产品中心",
  200 |     searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
  201 |     searchButton: "搜索",
  202 |     mobileCategoryPrefix: "产品大类：",
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
  206 |     resetFilters: "清除筛选",
  207 |     submitRequirement: "提交需求",
  208 |     detailButton: "查看详情",
  209 |     addToList: "加入清单",
  210 |     addedToList: "已加入清单",
  211 |     previousPage: "上一页",
  212 |     nextPage: "下一页",
  213 |     filterEmpty: "当前产品大类暂无可用筛选项。",
  214 |     emptyTitle: "暂无匹配配置",
  215 |     emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  216 |   },
  217 |   en: {
  218 |     breadcrumbHome: "Home",
  219 |     breadcrumbCurrent: "Product Center",
  220 |     searchPlaceholder: "Search by product name, series, volume, material, or keyword",
  221 |     searchButton: "Search",
  222 |     mobileCategoryPrefix: "Category: ",
```

匹配：filter，第 213 行

```tsx
  203 |     productTypeLabel: "产品类型",
  204 |     resultPrefix: "已找到 ",
  205 |     resultSuffix: " 个基础配置",
  206 |     resetFilters: "清除筛选",
  207 |     submitRequirement: "提交需求",
  208 |     detailButton: "查看详情",
  209 |     addToList: "加入清单",
  210 |     addedToList: "已加入清单",
  211 |     previousPage: "上一页",
  212 |     nextPage: "下一页",
  213 |     filterEmpty: "当前产品大类暂无可用筛选项。",
  214 |     emptyTitle: "暂无匹配配置",
  215 |     emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  216 |   },
  217 |   en: {
  218 |     breadcrumbHome: "Home",
  219 |     breadcrumbCurrent: "Product Center",
  220 |     searchPlaceholder: "Search by product name, series, volume, material, or keyword",
  221 |     searchButton: "Search",
  222 |     mobileCategoryPrefix: "Category: ",
  223 |     productTypeLabel: "Product Type",
  224 |     resultPrefix: "",
  225 |     resultSuffix: " configurations found",
  226 |     resetFilters: "Clear Filters",
  227 |     submitRequirement: "Submit Request",
  228 |     detailButton: "View Details",
  229 |     addToList: "Add to List",
```

匹配：filter，第 226 行

```tsx
  216 |   },
  217 |   en: {
  218 |     breadcrumbHome: "Home",
  219 |     breadcrumbCurrent: "Product Center",
  220 |     searchPlaceholder: "Search by product name, series, volume, material, or keyword",
  221 |     searchButton: "Search",
  222 |     mobileCategoryPrefix: "Category: ",
  223 |     productTypeLabel: "Product Type",
  224 |     resultPrefix: "",
  225 |     resultSuffix: " configurations found",
  226 |     resetFilters: "Clear Filters",
  227 |     submitRequirement: "Submit Request",
  228 |     detailButton: "View Details",
  229 |     addToList: "Add to List",
  230 |     addedToList: "Added",
  231 |     previousPage: "Previous",
  232 |     nextPage: "Next",
  233 |     filterEmpty: "No filters are available for this category.",
  234 |     emptyTitle: "No matching configurations",
  235 |     emptyDescription: "Try removing some filters or submit your requirements for engineering support.",
  236 |   },
  237 |   es: {
  238 |     breadcrumbHome: "Inicio",
  239 |     breadcrumbCurrent: "Centro de productos",
  240 |     searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
  241 |     searchButton: "Buscar",
  242 |     mobileCategoryPrefix: "Categoría: ",
```

匹配：filter，第 233 行

```tsx
  223 |     productTypeLabel: "Product Type",
  224 |     resultPrefix: "",
  225 |     resultSuffix: " configurations found",
  226 |     resetFilters: "Clear Filters",
  227 |     submitRequirement: "Submit Request",
  228 |     detailButton: "View Details",
  229 |     addToList: "Add to List",
  230 |     addedToList: "Added",
  231 |     previousPage: "Previous",
  232 |     nextPage: "Next",
  233 |     filterEmpty: "No filters are available for this category.",
  234 |     emptyTitle: "No matching configurations",
  235 |     emptyDescription: "Try removing some filters or submit your requirements for engineering support.",
  236 |   },
  237 |   es: {
  238 |     breadcrumbHome: "Inicio",
  239 |     breadcrumbCurrent: "Centro de productos",
  240 |     searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
  241 |     searchButton: "Buscar",
  242 |     mobileCategoryPrefix: "Categoría: ",
  243 |     productTypeLabel: "Tipo de producto",
  244 |     resultPrefix: "",
  245 |     resultSuffix: " configuraciones encontradas",
  246 |     resetFilters: "Borrar filtros",
  247 |     submitRequirement: "Enviar solicitud",
  248 |     detailButton: "Ver detalles",
  249 |     addToList: "Añadir",
```

匹配：filter，第 235 行

```tsx
  225 |     resultSuffix: " configurations found",
  226 |     resetFilters: "Clear Filters",
  227 |     submitRequirement: "Submit Request",
  228 |     detailButton: "View Details",
  229 |     addToList: "Add to List",
  230 |     addedToList: "Added",
  231 |     previousPage: "Previous",
  232 |     nextPage: "Next",
  233 |     filterEmpty: "No filters are available for this category.",
  234 |     emptyTitle: "No matching configurations",
  235 |     emptyDescription: "Try removing some filters or submit your requirements for engineering support.",
  236 |   },
  237 |   es: {
  238 |     breadcrumbHome: "Inicio",
  239 |     breadcrumbCurrent: "Centro de productos",
  240 |     searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
  241 |     searchButton: "Buscar",
  242 |     mobileCategoryPrefix: "Categoría: ",
  243 |     productTypeLabel: "Tipo de producto",
  244 |     resultPrefix: "",
  245 |     resultSuffix: " configuraciones encontradas",
  246 |     resetFilters: "Borrar filtros",
  247 |     submitRequirement: "Enviar solicitud",
  248 |     detailButton: "Ver detalles",
  249 |     addToList: "Añadir",
  250 |     addedToList: "Añadido",
  251 |     previousPage: "Anterior",
```

匹配：filter，第 246 行

```tsx
  236 |   },
  237 |   es: {
  238 |     breadcrumbHome: "Inicio",
  239 |     breadcrumbCurrent: "Centro de productos",
  240 |     searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
  241 |     searchButton: "Buscar",
  242 |     mobileCategoryPrefix: "Categoría: ",
  243 |     productTypeLabel: "Tipo de producto",
  244 |     resultPrefix: "",
  245 |     resultSuffix: " configuraciones encontradas",
  246 |     resetFilters: "Borrar filtros",
  247 |     submitRequirement: "Enviar solicitud",
  248 |     detailButton: "Ver detalles",
  249 |     addToList: "Añadir",
  250 |     addedToList: "Añadido",
  251 |     previousPage: "Anterior",
  252 |     nextPage: "Siguiente",
  253 |     filterEmpty: "No hay filtros disponibles para esta categoría.",
  254 |     emptyTitle: "No hay configuraciones coincidentes",
  255 |     emptyDescription: "Reduzca los filtros o envíe sus requisitos para recibir soporte técnico.",
  256 |   },
  257 |   fr: {
  258 |     breadcrumbHome: "Accueil",
  259 |     breadcrumbCurrent: "Centre produits",
  260 |     searchPlaceholder: "Rechercher par produit, série, volume, matériau ou mot-clé",
  261 |     searchButton: "Rechercher",
  262 |     mobileCategoryPrefix: "Catégorie : ",
```

匹配：filter，第 253 行

```tsx
  243 |     productTypeLabel: "Tipo de producto",
  244 |     resultPrefix: "",
  245 |     resultSuffix: " configuraciones encontradas",
  246 |     resetFilters: "Borrar filtros",
  247 |     submitRequirement: "Enviar solicitud",
  248 |     detailButton: "Ver detalles",
  249 |     addToList: "Añadir",
  250 |     addedToList: "Añadido",
  251 |     previousPage: "Anterior",
  252 |     nextPage: "Siguiente",
  253 |     filterEmpty: "No hay filtros disponibles para esta categoría.",
  254 |     emptyTitle: "No hay configuraciones coincidentes",
  255 |     emptyDescription: "Reduzca los filtros o envíe sus requisitos para recibir soporte técnico.",
  256 |   },
  257 |   fr: {
  258 |     breadcrumbHome: "Accueil",
  259 |     breadcrumbCurrent: "Centre produits",
  260 |     searchPlaceholder: "Rechercher par produit, série, volume, matériau ou mot-clé",
  261 |     searchButton: "Rechercher",
  262 |     mobileCategoryPrefix: "Catégorie : ",
  263 |     productTypeLabel: "Type de produit",
  264 |     resultPrefix: "",
  265 |     resultSuffix: " configurations trouvées",
  266 |     resetFilters: "Effacer les filtres",
  267 |     submitRequirement: "Envoyer une demande",
  268 |     detailButton: "Voir les détails",
  269 |     addToList: "Ajouter",
```

匹配：filter，第 266 行

```tsx
  256 |   },
  257 |   fr: {
  258 |     breadcrumbHome: "Accueil",
  259 |     breadcrumbCurrent: "Centre produits",
  260 |     searchPlaceholder: "Rechercher par produit, série, volume, matériau ou mot-clé",
  261 |     searchButton: "Rechercher",
  262 |     mobileCategoryPrefix: "Catégorie : ",
  263 |     productTypeLabel: "Type de produit",
  264 |     resultPrefix: "",
  265 |     resultSuffix: " configurations trouvées",
  266 |     resetFilters: "Effacer les filtres",
  267 |     submitRequirement: "Envoyer une demande",
  268 |     detailButton: "Voir les détails",
  269 |     addToList: "Ajouter",
  270 |     addedToList: "Ajouté",
  271 |     previousPage: "Précédent",
  272 |     nextPage: "Suivant",
  273 |     filterEmpty: "Aucun filtre disponible pour cette catégorie.",
  274 |     emptyTitle: "Aucune configuration correspondante",
  275 |     emptyDescription: "Réduisez les filtres ou envoyez vos besoins pour obtenir une assistance technique.",
  276 |   },
  277 |   ko: {
  278 |     breadcrumbHome: "홈",
  279 |     breadcrumbCurrent: "제품 센터",
  280 |     searchPlaceholder: "제품명, 시리즈, 용량, 재질 또는 키워드로 검색",
  281 |     searchButton: "검색",
  282 |     mobileCategoryPrefix: "제품 분류: ",
```

匹配：filter，第 273 行

```tsx
  263 |     productTypeLabel: "Type de produit",
  264 |     resultPrefix: "",
  265 |     resultSuffix: " configurations trouvées",
  266 |     resetFilters: "Effacer les filtres",
  267 |     submitRequirement: "Envoyer une demande",
  268 |     detailButton: "Voir les détails",
  269 |     addToList: "Ajouter",
  270 |     addedToList: "Ajouté",
  271 |     previousPage: "Précédent",
  272 |     nextPage: "Suivant",
  273 |     filterEmpty: "Aucun filtre disponible pour cette catégorie.",
  274 |     emptyTitle: "Aucune configuration correspondante",
  275 |     emptyDescription: "Réduisez les filtres ou envoyez vos besoins pour obtenir une assistance technique.",
  276 |   },
  277 |   ko: {
  278 |     breadcrumbHome: "홈",
  279 |     breadcrumbCurrent: "제품 센터",
  280 |     searchPlaceholder: "제품명, 시리즈, 용량, 재질 또는 키워드로 검색",
  281 |     searchButton: "검색",
  282 |     mobileCategoryPrefix: "제품 분류: ",
  283 |     productTypeLabel: "제품 유형",
  284 |     resultPrefix: "",
  285 |     resultSuffix: "개 기본 구성을 찾았습니다",
  286 |     resetFilters: "필터 초기화",
  287 |     submitRequirement: "요청 제출",
  288 |     detailButton: "상세 보기",
  289 |     addToList: "목록 추가",
```

匹配：filter，第 286 行

```tsx
  276 |   },
  277 |   ko: {
  278 |     breadcrumbHome: "홈",
  279 |     breadcrumbCurrent: "제품 센터",
  280 |     searchPlaceholder: "제품명, 시리즈, 용량, 재질 또는 키워드로 검색",
  281 |     searchButton: "검색",
  282 |     mobileCategoryPrefix: "제품 분류: ",
  283 |     productTypeLabel: "제품 유형",
  284 |     resultPrefix: "",
  285 |     resultSuffix: "개 기본 구성을 찾았습니다",
  286 |     resetFilters: "필터 초기화",
  287 |     submitRequirement: "요청 제출",
  288 |     detailButton: "상세 보기",
  289 |     addToList: "목록 추가",
  290 |     addedToList: "추가됨",
  291 |     previousPage: "이전",
  292 |     nextPage: "다음",
  293 |     filterEmpty: "이 제품 분류에는 사용할 수 있는 필터가 없습니다.",
  294 |     emptyTitle: "일치하는 구성이 없습니다",
  295 |     emptyDescription: "필터를 줄이거나 요구사항을 제출해 엔지니어 지원을 받아보세요.",
  296 |   },
  297 |   ru: {
  298 |     breadcrumbHome: "Главная",
  299 |     breadcrumbCurrent: "Центр продуктов",
  300 |     searchPlaceholder: "Поиск по названию, серии, объему, материалу или ключевому слову",
  301 |     searchButton: "Поиск",
  302 |     mobileCategoryPrefix: "Категория: ",
```

匹配：filter，第 293 行

```tsx
  283 |     productTypeLabel: "제품 유형",
  284 |     resultPrefix: "",
  285 |     resultSuffix: "개 기본 구성을 찾았습니다",
  286 |     resetFilters: "필터 초기화",
  287 |     submitRequirement: "요청 제출",
  288 |     detailButton: "상세 보기",
  289 |     addToList: "목록 추가",
  290 |     addedToList: "추가됨",
  291 |     previousPage: "이전",
  292 |     nextPage: "다음",
  293 |     filterEmpty: "이 제품 분류에는 사용할 수 있는 필터가 없습니다.",
  294 |     emptyTitle: "일치하는 구성이 없습니다",
  295 |     emptyDescription: "필터를 줄이거나 요구사항을 제출해 엔지니어 지원을 받아보세요.",
  296 |   },
  297 |   ru: {
  298 |     breadcrumbHome: "Главная",
  299 |     breadcrumbCurrent: "Центр продуктов",
  300 |     searchPlaceholder: "Поиск по названию, серии, объему, материалу или ключевому слову",
  301 |     searchButton: "Поиск",
  302 |     mobileCategoryPrefix: "Категория: ",
  303 |     productTypeLabel: "Тип продукта",
  304 |     resultPrefix: "Найдено ",
  305 |     resultSuffix: " конфигураций",
  306 |     resetFilters: "Сбросить фильтры",
  307 |     submitRequirement: "Отправить запрос",
  308 |     detailButton: "Подробнее",
  309 |     addToList: "В список",
```

匹配：filter，第 306 行

```tsx
  296 |   },
  297 |   ru: {
  298 |     breadcrumbHome: "Главная",
  299 |     breadcrumbCurrent: "Центр продуктов",
  300 |     searchPlaceholder: "Поиск по названию, серии, объему, материалу или ключевому слову",
  301 |     searchButton: "Поиск",
  302 |     mobileCategoryPrefix: "Категория: ",
  303 |     productTypeLabel: "Тип продукта",
  304 |     resultPrefix: "Найдено ",
  305 |     resultSuffix: " конфигураций",
  306 |     resetFilters: "Сбросить фильтры",
  307 |     submitRequirement: "Отправить запрос",
  308 |     detailButton: "Подробнее",
  309 |     addToList: "В список",
  310 |     addedToList: "Добавлено",
  311 |     previousPage: "Назад",
  312 |     nextPage: "Далее",
  313 |     filterEmpty: "Для этой категории нет доступных фильтров.",
  314 |     emptyTitle: "Нет подходящих конфигураций",
  315 |     emptyDescription: "Уменьшите количество фильтров или отправьте требования для инженерной поддержки.",
  316 |   },
  317 | };
  318 | 
  319 | const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  320 |   {
  321 |     id: "pumps",
  322 |     label: "泵系列",
```

匹配：filter，第 313 行

```tsx
  303 |     productTypeLabel: "Тип продукта",
  304 |     resultPrefix: "Найдено ",
  305 |     resultSuffix: " конфигураций",
  306 |     resetFilters: "Сбросить фильтры",
  307 |     submitRequirement: "Отправить запрос",
  308 |     detailButton: "Подробнее",
  309 |     addToList: "В список",
  310 |     addedToList: "Добавлено",
  311 |     previousPage: "Назад",
  312 |     nextPage: "Далее",
  313 |     filterEmpty: "Для этой категории нет доступных фильтров.",
  314 |     emptyTitle: "Нет подходящих конфигураций",
  315 |     emptyDescription: "Уменьшите количество фильтров или отправьте требования для инженерной поддержки.",
  316 |   },
  317 | };
  318 | 
  319 | const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  320 |   {
  321 |     id: "pumps",
  322 |     label: "泵系列",
  323 |     description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
  324 |     sortOrder: 10,
  325 |   },
  326 |   {
  327 |     id: "valves",
  328 |     label: "阀系列",
  329 |     description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
```

匹配：taxonomyItems，第 369 行

```tsx
  359 |   locale: SelectionLocale,
  360 |   value: Partial<Record<SelectionLocale, string>> | undefined,
  361 |   fallback = ""
  362 | ) {
  363 |   if (!value) return fallback;
  364 | 
  365 |   return value[locale] || value.zh || value.en || fallback;
  366 | }
  367 | 
  368 | function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  369 |   const item = selectionTaxonomyItems.find((entry) => entry.id === id);
  370 | 
  371 |   return getText(locale, item?.label, id);
  372 | }
  373 | 
  374 | function getCategoryItems(locale: SelectionLocale) {
  375 |   const generatedCategories = selectionTaxonomyItems
  376 |     .filter((item) => item.type === "category")
  377 |     .map((item) => {
  378 |       const fallback = DEFAULT_CATEGORIES.find(
  379 |         (category) => category.id === item.id
  380 |       );
  381 | 
  382 |       return {
  383 |         id: item.id,
  384 |         label: getText(locale, item.label, fallback?.label || item.id),
  385 |         description:
```

匹配：taxonomyItems，第 375 行

```tsx
  365 |   return value[locale] || value.zh || value.en || fallback;
  366 | }
  367 | 
  368 | function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  369 |   const item = selectionTaxonomyItems.find((entry) => entry.id === id);
  370 | 
  371 |   return getText(locale, item?.label, id);
  372 | }
  373 | 
  374 | function getCategoryItems(locale: SelectionLocale) {
  375 |   const generatedCategories = selectionTaxonomyItems
  376 |     .filter((item) => item.type === "category")
  377 |     .map((item) => {
  378 |       const fallback = DEFAULT_CATEGORIES.find(
  379 |         (category) => category.id === item.id
  380 |       );
  381 | 
  382 |       return {
  383 |         id: item.id,
  384 |         label: getText(locale, item.label, fallback?.label || item.id),
  385 |         description:
  386 |           fallback?.description ||
  387 |           "根据产品类型、系列和筛选条件选择基础配置。",
  388 |         sortOrder: item.sortOrder,
  389 |       };
  390 |     });
  391 | 
```

匹配：filter，第 376 行

```tsx
  366 | }
  367 | 
  368 | function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  369 |   const item = selectionTaxonomyItems.find((entry) => entry.id === id);
  370 | 
  371 |   return getText(locale, item?.label, id);
  372 | }
  373 | 
  374 | function getCategoryItems(locale: SelectionLocale) {
  375 |   const generatedCategories = selectionTaxonomyItems
  376 |     .filter((item) => item.type === "category")
  377 |     .map((item) => {
  378 |       const fallback = DEFAULT_CATEGORIES.find(
  379 |         (category) => category.id === item.id
  380 |       );
  381 | 
  382 |       return {
  383 |         id: item.id,
  384 |         label: getText(locale, item.label, fallback?.label || item.id),
  385 |         description:
  386 |           fallback?.description ||
  387 |           "根据产品类型、系列和筛选条件选择基础配置。",
  388 |         sortOrder: item.sortOrder,
  389 |       };
  390 |     });
  391 | 
  392 |   const categoryMap = new Map<string, ProductSelectionCategoryItem>();
```

匹配：filter，第 418 行

```tsx
  408 |   
  409 |   /*
  410 |     TUBING_GET_PRODUCTS_BY_CATEGORY_20260707
  411 |     管路系列直接返回 6 张材料卡片。
  412 |   */
  413 |   if (String(arguments[0] || "") === "tubing") {
  414 |     return tubingSelectionProducts;
  415 |   }
  416 | 
  417 | return selectionProducts
  418 |     .filter((product) => product.categoryId === categoryId)
  419 |     .filter((product, index, array) => {
  420 |       return (
  421 |         index ===
  422 |         array.findIndex((item) => item.productId === product.productId)
  423 |       );
  424 |     });
  425 | }
  426 | 
  427 | function getFirstProductTypeId(categoryId: string) {
  428 |   
  429 |   /*
  430 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  431 |   */
  432 |   if (String(arguments[0] || "") === "tubing") {
  433 |     return "tubing";
  434 |   }
```

匹配：filter，第 419 行

```tsx
  409 |   /*
  410 |     TUBING_GET_PRODUCTS_BY_CATEGORY_20260707
  411 |     管路系列直接返回 6 张材料卡片。
  412 |   */
  413 |   if (String(arguments[0] || "") === "tubing") {
  414 |     return tubingSelectionProducts;
  415 |   }
  416 | 
  417 | return selectionProducts
  418 |     .filter((product) => product.categoryId === categoryId)
  419 |     .filter((product, index, array) => {
  420 |       return (
  421 |         index ===
  422 |         array.findIndex((item) => item.productId === product.productId)
  423 |       );
  424 |     });
  425 | }
  426 | 
  427 | function getFirstProductTypeId(categoryId: string) {
  428 |   
  429 |   /*
  430 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  431 |   */
  432 |   if (String(arguments[0] || "") === "tubing") {
  433 |     return "tubing";
  434 |   }
  435 | 
```

匹配：productTypeId，第 427 行

```tsx
  417 | return selectionProducts
  418 |     .filter((product) => product.categoryId === categoryId)
  419 |     .filter((product, index, array) => {
  420 |       return (
  421 |         index ===
  422 |         array.findIndex((item) => item.productId === product.productId)
  423 |       );
  424 |     });
  425 | }
  426 | 
  427 | function getFirstProductTypeId(categoryId: string) {
  428 |   
  429 |   /*
  430 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  431 |   */
  432 |   if (String(arguments[0] || "") === "tubing") {
  433 |     return "tubing";
  434 |   }
  435 | 
  436 | const products = getProductsByCategory(categoryId);
  437 |   const first = products[0];
  438 | 
  439 |   if (first?.productTypeId) {
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
```

匹配：productTypeId，第 439 行

```tsx
  429 |   /*
  430 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  431 |   */
  432 |   if (String(arguments[0] || "") === "tubing") {
  433 |     return "tubing";
  434 |   }
  435 | 
  436 | const products = getProductsByCategory(categoryId);
  437 |   const first = products[0];
  438 | 
  439 |   if (first?.productTypeId) {
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
  444 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  445 |   );
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
```

匹配：productTypeId，第 440 行

```tsx
  430 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  431 |   */
  432 |   if (String(arguments[0] || "") === "tubing") {
  433 |     return "tubing";
  434 |   }
  435 | 
  436 | const products = getProductsByCategory(categoryId);
  437 |   const first = products[0];
  438 | 
  439 |   if (first?.productTypeId) {
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
  444 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  445 |   );
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
  456 |           label.productTypeId === productTypeId &&
```

匹配：filter，第 444 行

```tsx
  434 |   }
  435 | 
  436 | const products = getProductsByCategory(categoryId);
  437 |   const first = products[0];
  438 | 
  439 |   if (first?.productTypeId) {
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
  444 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  445 |   );
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
  456 |           label.productTypeId === productTypeId &&
  457 |           label.visible
  458 |       );
  459 |     })
  460 |     .sort((current, next) => {
```

匹配：filter、filterLabels、productTypeId，第 448 行

```tsx
  438 | 
  439 |   if (first?.productTypeId) {
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
  444 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  445 |   );
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
  456 |           label.productTypeId === productTypeId &&
  457 |           label.visible
  458 |       );
  459 |     })
  460 |     .sort((current, next) => {
  461 |       const currentSortOrder = Number((current as any).sortOrder ?? 0);
  462 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  463 | 
  464 |       return currentSortOrder - nextSortOrder;
```

匹配：filter、filterLabels，第 449 行

```tsx
  439 |   if (first?.productTypeId) {
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
  444 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  445 |   );
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
  456 |           label.productTypeId === productTypeId &&
  457 |           label.visible
  458 |       );
  459 |     })
  460 |     .sort((current, next) => {
  461 |       const currentSortOrder = Number((current as any).sortOrder ?? 0);
  462 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  463 | 
  464 |       return currentSortOrder - nextSortOrder;
  465 |     });
```

匹配：filter，第 450 行

```tsx
  440 |     return first.productTypeId;
  441 |   }
  442 | 
  443 |   return (
  444 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  445 |   );
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
  456 |           label.productTypeId === productTypeId &&
  457 |           label.visible
  458 |       );
  459 |     })
  460 |     .sort((current, next) => {
  461 |       const currentSortOrder = Number((current as any).sortOrder ?? 0);
  462 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  463 | 
  464 |       return currentSortOrder - nextSortOrder;
  465 |     });
  466 | }
```

匹配：productTypeId，第 456 行

```tsx
  446 | }
  447 | 
  448 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  449 |   return selectionFilterLabels
  450 |     .filter((item): item is ProductSelectionFilterLabel => {
  451 |       const label = item as any;
  452 | 
  453 |       return Boolean(
  454 |         label &&
  455 |           typeof label === "object" &&
  456 |           label.productTypeId === productTypeId &&
  457 |           label.visible
  458 |       );
  459 |     })
  460 |     .sort((current, next) => {
  461 |       const currentSortOrder = Number((current as any).sortOrder ?? 0);
  462 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  463 | 
  464 |       return currentSortOrder - nextSortOrder;
  465 |     });
  466 | }
  467 | 
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
```

匹配：filter，第 468 行

```tsx
  458 |       );
  459 |     })
  460 |     .sort((current, next) => {
  461 |       const currentSortOrder = Number((current as any).sortOrder ?? 0);
  462 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  463 | 
  464 |       return currentSortOrder - nextSortOrder;
  465 |     });
  466 | }
  467 | 
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
  473 | }
  474 | function getFilterOptions(
  475 |   products: ProductSelectionProduct[],
  476 |   filterKey: SelectionFilterKey,
  477 |   selectedFilters: SelectedFilterMap,
  478 |   productTypeId: string
  479 | ) {
  480 |   /*
  481 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  482 |    *
  483 |    * 例如：
  484 |    * 1.6 mm|1.8 mm|2.0 mm
```

匹配：filter，第 472 行

```tsx
  462 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  463 | 
  464 |       return currentSortOrder - nextSortOrder;
  465 |     });
  466 | }
  467 | 
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
  473 | }
  474 | function getFilterOptions(
  475 |   products: ProductSelectionProduct[],
  476 |   filterKey: SelectionFilterKey,
  477 |   selectedFilters: SelectedFilterMap,
  478 |   productTypeId: string
  479 | ) {
  480 |   /*
  481 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  482 |    *
  483 |    * 例如：
  484 |    * 1.6 mm|1.8 mm|2.0 mm
  485 |    *
  486 |    * 左侧筛选必须拆成三个独立选项。
  487 |    */
  488 |   /*
```

匹配：filter，第 474 行

```tsx
  464 |       return currentSortOrder - nextSortOrder;
  465 |     });
  466 | }
  467 | 
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
  473 | }
  474 | function getFilterOptions(
  475 |   products: ProductSelectionProduct[],
  476 |   filterKey: SelectionFilterKey,
  477 |   selectedFilters: SelectedFilterMap,
  478 |   productTypeId: string
  479 | ) {
  480 |   /*
  481 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  482 |    *
  483 |    * 例如：
  484 |    * 1.6 mm|1.8 mm|2.0 mm
  485 |    *
  486 |    * 左侧筛选必须拆成三个独立选项。
  487 |    */
  488 |   /*
  489 |    * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
  490 |    *
```

匹配：filter，第 476 行

```tsx
  466 | }
  467 | 
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
  473 | }
  474 | function getFilterOptions(
  475 |   products: ProductSelectionProduct[],
  476 |   filterKey: SelectionFilterKey,
  477 |   selectedFilters: SelectedFilterMap,
  478 |   productTypeId: string
  479 | ) {
  480 |   /*
  481 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  482 |    *
  483 |    * 例如：
  484 |    * 1.6 mm|1.8 mm|2.0 mm
  485 |    *
  486 |    * 左侧筛选必须拆成三个独立选项。
  487 |    */
  488 |   /*
  489 |    * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
  490 |    *
  491 |    * 内螺纹互转接头中：
  492 |    * PU-U32-U28 同时包含两个液路螺纹。
```

匹配：filter，第 477 行

```tsx
  467 | 
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
  473 | }
  474 | function getFilterOptions(
  475 |   products: ProductSelectionProduct[],
  476 |   filterKey: SelectionFilterKey,
  477 |   selectedFilters: SelectedFilterMap,
  478 |   productTypeId: string
  479 | ) {
  480 |   /*
  481 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  482 |    *
  483 |    * 例如：
  484 |    * 1.6 mm|1.8 mm|2.0 mm
  485 |    *
  486 |    * 左侧筛选必须拆成三个独立选项。
  487 |    */
  488 |   /*
  489 |    * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
  490 |    *
  491 |    * 内螺纹互转接头中：
  492 |    * PU-U32-U28 同时包含两个液路螺纹。
  493 |    *
```

匹配：productTypeId，第 478 行

```tsx
  468 | function splitFilterValues(value: unknown): string[] {
  469 |   return String(value || "")
  470 |     .split("|")
  471 |     .map((item) => item.trim())
  472 |     .filter(Boolean);
  473 | }
  474 | function getFilterOptions(
  475 |   products: ProductSelectionProduct[],
  476 |   filterKey: SelectionFilterKey,
  477 |   selectedFilters: SelectedFilterMap,
  478 |   productTypeId: string
  479 | ) {
  480 |   /*
  481 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  482 |    *
  483 |    * 例如：
  484 |    * 1.6 mm|1.8 mm|2.0 mm
  485 |    *
  486 |    * 左侧筛选必须拆成三个独立选项。
  487 |    */
  488 |   /*
  489 |    * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
  490 |    *
  491 |    * 内螺纹互转接头中：
  492 |    * PU-U32-U28 同时包含两个液路螺纹。
  493 |    *
  494 |    * 在生成任意筛选组之前，
```

匹配：filter，第 495 行

```tsx
  485 |    *
  486 |    * 左侧筛选必须拆成三个独立选项。
  487 |    */
  488 |   /*
  489 |    * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
  490 |    *
  491 |    * 内螺纹互转接头中：
  492 |    * PU-U32-U28 同时包含两个液路螺纹。
  493 |    *
  494 |    * 在生成任意筛选组之前，
  495 |    * 先将 filter02 拆成独立产品副本，
  496 |    * 确保螺纹选项和其他筛选条件可以正常联动。
  497 |    */
  498 |   if (
  499 |     productTypeId ===
  500 |     "female-thread-adapters"
  501 |   ) {
  502 |     const expandedProducts =
  503 |       products.flatMap(
  504 |         (product) => {
  505 |           const threadValues =
  506 |             splitFilterValues(
  507 |               (product.filters || {})
  508 |                 .filter02
  509 |             );
  510 | 
  511 |           if (
```

匹配：productTypeId，第 499 行

```tsx
  489 |    * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
  490 |    *
  491 |    * 内螺纹互转接头中：
  492 |    * PU-U32-U28 同时包含两个液路螺纹。
  493 |    *
  494 |    * 在生成任意筛选组之前，
  495 |    * 先将 filter02 拆成独立产品副本，
  496 |    * 确保螺纹选项和其他筛选条件可以正常联动。
  497 |    */
  498 |   if (
  499 |     productTypeId ===
  500 |     "female-thread-adapters"
  501 |   ) {
  502 |     const expandedProducts =
  503 |       products.flatMap(
  504 |         (product) => {
  505 |           const threadValues =
  506 |             splitFilterValues(
  507 |               (product.filters || {})
  508 |                 .filter02
  509 |             );
  510 | 
  511 |           if (
  512 |             threadValues.length <= 1
  513 |           ) {
  514 |             return [product];
  515 |           }
```

匹配：filter，第 506 行

```tsx
  496 |    * 确保螺纹选项和其他筛选条件可以正常联动。
  497 |    */
  498 |   if (
  499 |     productTypeId ===
  500 |     "female-thread-adapters"
  501 |   ) {
  502 |     const expandedProducts =
  503 |       products.flatMap(
  504 |         (product) => {
  505 |           const threadValues =
  506 |             splitFilterValues(
  507 |               (product.filters || {})
  508 |                 .filter02
  509 |             );
  510 | 
  511 |           if (
  512 |             threadValues.length <= 1
  513 |           ) {
  514 |             return [product];
  515 |           }
  516 | 
  517 |           return threadValues.map(
  518 |             (threadValue) => ({
  519 |               ...product,
  520 | 
  521 |               productId:
  522 |                 `${product.productId}__thread__${threadValue}`,
```

匹配：filter，第 507 行

```tsx
  497 |    */
  498 |   if (
  499 |     productTypeId ===
  500 |     "female-thread-adapters"
  501 |   ) {
  502 |     const expandedProducts =
  503 |       products.flatMap(
  504 |         (product) => {
  505 |           const threadValues =
  506 |             splitFilterValues(
  507 |               (product.filters || {})
  508 |                 .filter02
  509 |             );
  510 | 
  511 |           if (
  512 |             threadValues.length <= 1
  513 |           ) {
  514 |             return [product];
  515 |           }
  516 | 
  517 |           return threadValues.map(
  518 |             (threadValue) => ({
  519 |               ...product,
  520 | 
  521 |               productId:
  522 |                 `${product.productId}__thread__${threadValue}`,
  523 | 
```

匹配：filter，第 508 行

```tsx
  498 |   if (
  499 |     productTypeId ===
  500 |     "female-thread-adapters"
  501 |   ) {
  502 |     const expandedProducts =
  503 |       products.flatMap(
  504 |         (product) => {
  505 |           const threadValues =
  506 |             splitFilterValues(
  507 |               (product.filters || {})
  508 |                 .filter02
  509 |             );
  510 | 
  511 |           if (
  512 |             threadValues.length <= 1
  513 |           ) {
  514 |             return [product];
  515 |           }
  516 | 
  517 |           return threadValues.map(
  518 |             (threadValue) => ({
  519 |               ...product,
  520 | 
  521 |               productId:
  522 |                 `${product.productId}__thread__${threadValue}`,
  523 | 
  524 |               filters: {
```

匹配：filter，第 524 行

```tsx
  514 |             return [product];
  515 |           }
  516 | 
  517 |           return threadValues.map(
  518 |             (threadValue) => ({
  519 |               ...product,
  520 | 
  521 |               productId:
  522 |                 `${product.productId}__thread__${threadValue}`,
  523 | 
  524 |               filters: {
  525 |                 ...(product.filters || {}),
  526 | 
  527 |                 filter02:
  528 |                   threadValue,
  529 |               },
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
```

匹配：filter，第 525 行

```tsx
  515 |           }
  516 | 
  517 |           return threadValues.map(
  518 |             (threadValue) => ({
  519 |               ...product,
  520 | 
  521 |               productId:
  522 |                 `${product.productId}__thread__${threadValue}`,
  523 | 
  524 |               filters: {
  525 |                 ...(product.filters || {}),
  526 | 
  527 |                 filter02:
  528 |                   threadValue,
  529 |               },
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
```

匹配：filter，第 527 行

```tsx
  517 |           return threadValues.map(
  518 |             (threadValue) => ({
  519 |               ...product,
  520 | 
  521 |               productId:
  522 |                 `${product.productId}__thread__${threadValue}`,
  523 | 
  524 |               filters: {
  525 |                 ...(product.filters || {}),
  526 | 
  527 |                 filter02:
  528 |                   threadValue,
  529 |               },
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
```

匹配：filter，第 535 行

```tsx
  525 |                 ...(product.filters || {}),
  526 | 
  527 |                 filter02:
  528 |                   threadValue,
  529 |               },
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
```

匹配：productTypeId，第 536 行

```tsx
  526 | 
  527 |                 filter02:
  528 |                   threadValue,
  529 |               },
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
```

匹配：filter，第 539 行

```tsx
  529 |               },
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
```

匹配：filter，第 540 行

```tsx
  530 |             })
  531 |           );
  532 |         }
  533 |       );
  534 | 
  535 |     return getProductFilterOptions({
  536 |       productTypeId,
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
```

匹配：productTypeId，第 547 行

```tsx
  537 |       products:
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
```

匹配：filter，第 548 行

```tsx
  538 |         expandedProducts,
  539 |       filterKey,
  540 |       selectedFilters,
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
```

匹配：filter，第 551 行

```tsx
  541 |     });
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
```

匹配：filter，第 552 行

```tsx
  542 |   }
  543 | 
  544 |   /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */
  545 | 
  546 |   if (
  547 |     productTypeId === "hard-tube-fittings" &&
  548 |     filterKey === "filter03"
  549 |   ) {
  550 |     const expandedProducts = products.flatMap((product) => {
  551 |       const values = splitFilterValues(
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
```

匹配：filter，第 562 行

```tsx
  552 |         (product.filters || {})[filterKey]
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
```

匹配：filter，第 563 行

```tsx
  553 |       );
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
```

匹配：filter，第 564 行

```tsx
  554 | 
  555 |       if (values.length <= 1) {
  556 |         return [product];
  557 |       }
  558 | 
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
```

匹配：filter，第 569 行

```tsx
  559 |       return values.map((value) => ({
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
```

匹配：productTypeId，第 570 行

```tsx
  560 |         ...product,
  561 |         productId: `${product.productId}__${value}`,
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
```

匹配：filter，第 572 行

```tsx
  562 |         filters: {
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
```

匹配：filter，第 573 行

```tsx
  563 |           ...(product.filters || {}),
  564 |           [filterKey]: value,
  565 |         },
  566 |       }));
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
```

匹配：filter，第 577 行

```tsx
  567 |     });
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
```

匹配：productTypeId，第 578 行

```tsx
  568 | 
  569 |     return getProductFilterOptions({
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
```

匹配：filter，第 580 行

```tsx
  570 |       productTypeId,
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
```

匹配：filter，第 581 行

```tsx
  571 |       products: expandedProducts,
  572 |       filterKey,
  573 |       selectedFilters,
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
```

匹配：filter，第 584 行

```tsx
  574 |     });
  575 |   }
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
```

匹配：productTypeId，第 586 行

```tsx
  576 | 
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
```

匹配：filter，第 587 行

```tsx
  577 |   return getProductFilterOptions({
  578 |     productTypeId,
  579 |     products,
  580 |     filterKey,
  581 |     selectedFilters,
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
```

匹配：filter，第 592 行

```tsx
  582 |   });
  583 | }
  584 | function getDefaultSelectedFilters(
  585 |   _categoryId: string,
  586 |   _productTypeId: string
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
```

匹配：filter，第 597 行

```tsx
  587 | ): SelectedFilterMap {
  588 |   /*
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
```

匹配：productTypeId，第 599 行

```tsx
  589 |    * 说明：
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
```

匹配：filter，第 600 行

```tsx
  590 |    * 1. 二级产品类型页只代表“柱塞泵”
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
```

匹配：filter，第 601 行

```tsx
  591 |    * 2. 不应该默认选中 EA / SM / TM
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
  617 | 
```

匹配：filter、productTypeId，第 602 行

```tsx
  592 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  593 |    */
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
  617 | 
  618 |   return selected;
```

匹配：filter，第 604 行

```tsx
  594 |   return {};
  595 | }
  596 | 
  597 | function getInitialSelectedFilters(
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
  617 | 
  618 |   return selected;
  619 | }
  620 | 
```

匹配：filter，第 608 行

```tsx
  598 |   categoryId: string,
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
  617 | 
  618 |   return selected;
  619 | }
  620 | 
  621 | function getResponsiveProductPageSize() {
  622 |   if (typeof window === "undefined") {
  623 |     return 12;
  624 |   }
```

匹配：filter，第 609 行

```tsx
  599 |   productTypeId: string,
  600 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  601 | ): SelectedFilterMap {
  602 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  603 | 
  604 |   if (!initialFilters) {
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
  617 | 
  618 |   return selected;
  619 | }
  620 | 
  621 | function getResponsiveProductPageSize() {
  622 |   if (typeof window === "undefined") {
  623 |     return 12;
  624 |   }
  625 | 
```

匹配：filter，第 615 行

```tsx
  605 |     return selected;
  606 |   }
  607 | 
  608 |   FILTER_KEYS.forEach((filterKey) => {
  609 |     const values = initialFilters[filterKey];
  610 | 
  611 |     if (!values || values.length === 0) {
  612 |       return;
  613 |     }
  614 | 
  615 |     selected[filterKey] = new Set(values.filter(Boolean));
  616 |   });
  617 | 
  618 |   return selected;
  619 | }
  620 | 
  621 | function getResponsiveProductPageSize() {
  622 |   if (typeof window === "undefined") {
  623 |     return 12;
  624 |   }
  625 | 
  626 |   const width = window.innerWidth;
  627 | 
  628 |   if (width <= 760) {
  629 |     return 6;
  630 |   }
  631 | 
```

匹配：filter、productTypeId，第 639 行

```tsx
  629 |     return 6;
  630 |   }
  631 | 
  632 |   if (width <= 1280) {
  633 |     return 9;
  634 |   }
  635 | 
  636 |   return 12;
  637 | }
  638 | 
  639 | function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  640 |   const openGroups: Record<string, boolean> = {
  641 |     productType: false,
  642 |   };
  643 | 
  644 |   getVisibleFilterLabels(productTypeId).forEach((filter) => {
  645 |     openGroups[filter.filterKey] = false;
  646 |   });
  647 | 
  648 |   return openGroups;
  649 | }
  650 | 
  651 | function normalizeDetailPathPart(value: unknown) {
  652 |   return String(value || "")
  653 |     .trim()
  654 |     .replace(/^\/+|\/+$/g, "")
  655 |     .split("/")
```

匹配：filter、filterLabels、productTypeId，第 644 行

```tsx
  634 |   }
  635 | 
  636 |   return 12;
  637 | }
  638 | 
  639 | function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  640 |   const openGroups: Record<string, boolean> = {
  641 |     productType: false,
  642 |   };
  643 | 
  644 |   getVisibleFilterLabels(productTypeId).forEach((filter) => {
  645 |     openGroups[filter.filterKey] = false;
  646 |   });
  647 | 
  648 |   return openGroups;
  649 | }
  650 | 
  651 | function normalizeDetailPathPart(value: unknown) {
  652 |   return String(value || "")
  653 |     .trim()
  654 |     .replace(/^\/+|\/+$/g, "")
  655 |     .split("/")
  656 |     .filter(Boolean)
  657 |     .pop() || "";
  658 | }
  659 | 
  660 | function normalizeModelKey(value: unknown) {
```

匹配：filter，第 645 行

```tsx
  635 | 
  636 |   return 12;
  637 | }
  638 | 
  639 | function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  640 |   const openGroups: Record<string, boolean> = {
  641 |     productType: false,
  642 |   };
  643 | 
  644 |   getVisibleFilterLabels(productTypeId).forEach((filter) => {
  645 |     openGroups[filter.filterKey] = false;
  646 |   });
  647 | 
  648 |   return openGroups;
  649 | }
  650 | 
  651 | function normalizeDetailPathPart(value: unknown) {
  652 |   return String(value || "")
  653 |     .trim()
  654 |     .replace(/^\/+|\/+$/g, "")
  655 |     .split("/")
  656 |     .filter(Boolean)
  657 |     .pop() || "";
  658 | }
  659 | 
  660 | function normalizeModelKey(value: unknown) {
  661 |   return String(value || "")
```

匹配：filter，第 656 行

```tsx
  646 |   });
  647 | 
  648 |   return openGroups;
  649 | }
  650 | 
  651 | function normalizeDetailPathPart(value: unknown) {
  652 |   return String(value || "")
  653 |     .trim()
  654 |     .replace(/^\/+|\/+$/g, "")
  655 |     .split("/")
  656 |     .filter(Boolean)
  657 |     .pop() || "";
  658 | }
  659 | 
  660 | function normalizeModelKey(value: unknown) {
  661 |   return String(value || "")
  662 |     .trim()
  663 |     .toLowerCase()
  664 |     .replace(/μ/g, "u")
  665 |     .replace(/[^a-z0-9]+/g, "-")
  666 |     .replace(/^-+|-+$/g, "");
  667 | }
  668 | 
  669 | 
  670 | function getSelectionLocalizedText(value: unknown, locale: "zh" | "en" = "zh"): string {
  671 |   if (!value) return "";
  672 |   if (typeof value === "string") return value;
```

匹配：filter，第 696 行

```tsx
  686 | }
  687 | 
  688 | function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  689 |   const candidates = [
  690 |     getSelectionLocalizedText(product.cardTitle, "en"),
  691 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  692 |     product.productId,
  693 |     product.detailSlug,
  694 |   ]
  695 |     .map(normalizeModelKey)
  696 |     .filter(Boolean);
  697 | 
  698 |   const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
  699 |     const detailCandidates = [
  700 |       detail.model,
  701 |       detail.productId,
  702 |       detail.slug,
  703 |       detail.detailSlug,
  704 |     ]
  705 |       .map(normalizeModelKey)
  706 |       .filter(Boolean);
  707 | 
  708 |     return detailCandidates.some((item) => candidates.includes(item));
  709 |   });
  710 | 
  711 |   return normalizeDetailPathPart(
  712 |     matchedDetail?.slug ||
```

匹配：filter，第 706 行

```tsx
  696 |     .filter(Boolean);
  697 | 
  698 |   const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
  699 |     const detailCandidates = [
  700 |       detail.model,
  701 |       detail.productId,
  702 |       detail.slug,
  703 |       detail.detailSlug,
  704 |     ]
  705 |       .map(normalizeModelKey)
  706 |       .filter(Boolean);
  707 | 
  708 |     return detailCandidates.some((item) => candidates.includes(item));
  709 |   });
  710 | 
  711 |   return normalizeDetailPathPart(
  712 |     matchedDetail?.slug ||
  713 |       matchedDetail?.detailSlug ||
  714 |       product.detailSlug
  715 |   );
  716 | }
  717 | 
  718 | 
  719 | /* ===== FOREACH plunger pump model detail href helpers START ===== */
  720 | 
  721 | function cleanPlungerHrefText(value: unknown) {
  722 |   return String(value || "").trim();
```

匹配：filter，第 726 行

```tsx
  716 | }
  717 | 
  718 | 
  719 | /* ===== FOREACH plunger pump model detail href helpers START ===== */
  720 | 
  721 | function cleanPlungerHrefText(value: unknown) {
  722 |   return String(value || "").trim();
  723 | }
  724 | 
  725 | function normalizePlungerPathPart(value: unknown) {
  726 |   const parts = cleanPlungerHrefText(value).split("/").filter(Boolean);
  727 |   return parts.length > 0 ? parts[parts.length - 1] : "";
  728 | }
  729 | 
  730 | function normalizePlungerModelSlug(value: unknown) {
  731 |   return cleanPlungerHrefText(value)
  732 |     .toLowerCase()
  733 |     .replace(/μ/g, "u")
  734 |     .replace(/[^a-z0-9]+/g, "-")
  735 |     .replace(/^-+|-+$/g, "");
  736 | }
  737 | 
  738 | function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  739 |   const existingSlug = normalizePlungerPathPart(product.detailSlug);
  740 | 
  741 |   if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
  742 |     return existingSlug.toLowerCase();
```

匹配：filter，第 751 行

```tsx
  741 |   if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
  742 |     return existingSlug.toLowerCase();
  743 |   }
  744 | 
  745 |   const text = [
  746 |     getSelectionLocalizedText(product.cardTitle, "en"),
  747 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  748 |     product.productId,
  749 |     product.detailSlug,
  750 |     product.seriesId,
  751 |     product.filters?.filter01,
  752 |     product.filters?.filter02,
  753 |     product.filters?.filter03,
  754 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  755 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
  756 |   ]
  757 |     .map(cleanPlungerHrefText)
  758 |     .filter(Boolean)
  759 |     .join(" ");
  760 | 
  761 |   const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);
  762 | 
  763 |   if (directModel) {
  764 |     return [
  765 |       directModel[1].toLowerCase(),
  766 |       String(Number(directModel[2])),
  767 |       directModel[3].toLowerCase(),
```

匹配：filter，第 752 行

```tsx
  742 |     return existingSlug.toLowerCase();
  743 |   }
  744 | 
  745 |   const text = [
  746 |     getSelectionLocalizedText(product.cardTitle, "en"),
  747 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  748 |     product.productId,
  749 |     product.detailSlug,
  750 |     product.seriesId,
  751 |     product.filters?.filter01,
  752 |     product.filters?.filter02,
  753 |     product.filters?.filter03,
  754 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  755 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
  756 |   ]
  757 |     .map(cleanPlungerHrefText)
  758 |     .filter(Boolean)
  759 |     .join(" ");
  760 | 
  761 |   const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);
  762 | 
  763 |   if (directModel) {
  764 |     return [
  765 |       directModel[1].toLowerCase(),
  766 |       String(Number(directModel[2])),
  767 |       directModel[3].toLowerCase(),
  768 |     ].join("-");
```

匹配：filter，第 753 行

```tsx
  743 |   }
  744 | 
  745 |   const text = [
  746 |     getSelectionLocalizedText(product.cardTitle, "en"),
  747 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  748 |     product.productId,
  749 |     product.detailSlug,
  750 |     product.seriesId,
  751 |     product.filters?.filter01,
  752 |     product.filters?.filter02,
  753 |     product.filters?.filter03,
  754 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  755 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
  756 |   ]
  757 |     .map(cleanPlungerHrefText)
  758 |     .filter(Boolean)
  759 |     .join(" ");
  760 | 
  761 |   const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);
  762 | 
  763 |   if (directModel) {
  764 |     return [
  765 |       directModel[1].toLowerCase(),
  766 |       String(Number(directModel[2])),
  767 |       directModel[3].toLowerCase(),
  768 |     ].join("-");
  769 |   }
```

匹配：filter，第 758 行

```tsx
  748 |     product.productId,
  749 |     product.detailSlug,
  750 |     product.seriesId,
  751 |     product.filters?.filter01,
  752 |     product.filters?.filter02,
  753 |     product.filters?.filter03,
  754 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  755 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
  756 |   ]
  757 |     .map(cleanPlungerHrefText)
  758 |     .filter(Boolean)
  759 |     .join(" ");
  760 | 
  761 |   const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);
  762 | 
  763 |   if (directModel) {
  764 |     return [
  765 |       directModel[1].toLowerCase(),
  766 |       String(Number(directModel[2])),
  767 |       directModel[3].toLowerCase(),
  768 |     ].join("-");
  769 |   }
  770 | 
  771 |   const seriesMatch = text.match(/\b(EA|SM|TM)\b/i);
  772 |   const capacityMatch = text.match(/(\d{2,5})\s*(?:μL|uL|UL|U)/i);
  773 |   const materialMatch = text.match(/\b(PMMA|PEEK)\b/i);
  774 | 
```

匹配：filter，第 805 行

```tsx
  795 |   只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
  796 | */
  797 | function normalizeFinalProductDetailHref(
  798 |   product: ProductSelectionProduct,
  799 |   href: string
  800 | ): string {
  801 |   const rawHref = String(href || "").trim();
  802 | 
  803 |   const hrefSlug = rawHref
  804 |     .split("/")
  805 |     .filter(Boolean)
  806 |     .pop()
  807 |     ?.toLowerCase();
  808 | 
  809 |   const rawSlug = String(
  810 |     (product as any).detailSlug ||
  811 |       (product as any).slug ||
  812 |       (product as any).productId ||
  813 |       hrefSlug ||
  814 |       ""
  815 |   )
  816 |     .split("/")
  817 |     .filter(Boolean)
  818 |     .pop()
  819 |     ?.toLowerCase();
  820 | 
  821 |   if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
```

匹配：filter，第 817 行

```tsx
  807 |     ?.toLowerCase();
  808 | 
  809 |   const rawSlug = String(
  810 |     (product as any).detailSlug ||
  811 |       (product as any).slug ||
  812 |       (product as any).productId ||
  813 |       hrefSlug ||
  814 |       ""
  815 |   )
  816 |     .split("/")
  817 |     .filter(Boolean)
  818 |     .pop()
  819 |     ?.toLowerCase();
  820 | 
  821 |   if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
  822 |     return `/products/pumps/plunger-pumps/${rawSlug}`;
  823 |   }
  824 | 
  825 |   if (
  826 |     rawHref.includes("/products/probes/") &&
  827 |     hrefSlug &&
  828 |     /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(hrefSlug)
  829 |   ) {
  830 |     return `/products/pumps/plunger-pumps/${hrefSlug}`;
  831 |   }
  832 | 
  833 |   return rawHref;
```

匹配：productTypeId，第 843 行

```tsx
  833 |   return rawHref;
  834 | }
  835 | 
  836 | 
  837 | function makeDetailHref(product: ProductSelectionProduct) {
  838 | 
  839 |   /* HARD_TUBE_DETAIL_HREF_START */
  840 | 
  841 |   if (
  842 |     String(
  843 |       (product as any)?.productTypeId ||
  844 |       ""
  845 |     ).trim() ===
  846 |       "hard-tube-fittings"
  847 |   ) {
  848 |     /*
  849 |      * filter03 多值展开后，
  850 |      * productId 可能变成：
  851 |      *
  852 |      * 809746__1.6 mm
  853 |      *
  854 |      * 匹配详情前先恢复真实商品ID。
  855 |      */
  856 |     const rawProductId =
  857 |       String(
  858 |         (product as any)?.productId ||
  859 |         ""
```

匹配：filter，第 849 行

```tsx
  839 |   /* HARD_TUBE_DETAIL_HREF_START */
  840 | 
  841 |   if (
  842 |     String(
  843 |       (product as any)?.productTypeId ||
  844 |       ""
  845 |     ).trim() ===
  846 |       "hard-tube-fittings"
  847 |   ) {
  848 |     /*
  849 |      * filter03 多值展开后，
  850 |      * productId 可能变成：
  851 |      *
  852 |      * 809746__1.6 mm
  853 |      *
  854 |      * 匹配详情前先恢复真实商品ID。
  855 |      */
  856 |     const rawProductId =
  857 |       String(
  858 |         (product as any)?.productId ||
  859 |         ""
  860 |       )
  861 |         .split("__")[0]
  862 |         .trim();
  863 | 
  864 |     const productCandidates = [
  865 |       rawProductId,
```

匹配：filter，第 880 行

```tsx
  870 |       ),
  871 | 
  872 |       getSelectionLocalizedText(
  873 |         product.cardTitle,
  874 |         "en"
  875 |       ),
  876 |     ]
  877 |       .map(
  878 |         normalizeModelKey
  879 |       )
  880 |       .filter(Boolean);
  881 | 
  882 |     const matchedDetail =
  883 |       (
  884 |         hardTubeDetailsJson as any[]
  885 |       ).find((detail) => {
  886 |         const detailCandidates = [
  887 |           detail?.productId,
  888 |           detail?.model,
  889 |           detail?.slug,
  890 |           detail?.displayModel,
  891 |           detail?.foreachModel,
  892 |           detail?.modelDisplay,
  893 |         ]
  894 |           .map(
  895 |             normalizeModelKey
  896 |           )
```

匹配：filter，第 897 行

```tsx
  887 |           detail?.productId,
  888 |           detail?.model,
  889 |           detail?.slug,
  890 |           detail?.displayModel,
  891 |           detail?.foreachModel,
  892 |           detail?.modelDisplay,
  893 |         ]
  894 |           .map(
  895 |             normalizeModelKey
  896 |           )
  897 |           .filter(Boolean);
  898 | 
  899 |         return detailCandidates.some(
  900 |           (value) =>
  901 |             productCandidates.includes(
  902 |               value
  903 |             )
  904 |         );
  905 |       });
  906 | 
  907 |     const matchedHref =
  908 |       String(
  909 |         matchedDetail?.detailHref ||
  910 |         ""
  911 |       ).trim();
  912 | 
  913 |     if (matchedHref) {
```

匹配：productTypeId，第 947 行

```tsx
  937 | 
  938 |   /*
  939 |     QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712
  940 | 
  941 |     快插接头卡片优先使用生成数据中的真实详情链接：
  942 |     /products/fittings/quick-connect-fittings/q20#商品编码
  943 | 
  944 |     避免后续通用逻辑把链接改回产品类型筛选页。
  945 |   */
  946 |   {
  947 |     const rawProductTypeId =
  948 |       String(
  949 |         (product as any)?.productTypeId ||
  950 |         ""
  951 |       ).trim();
  952 | 
  953 |     const rawSourceType =
  954 |       String(
  955 |         (product as any)?.sourceType ||
  956 |         ""
  957 |       ).trim();
  958 | 
  959 |     const rawExistingHref =
  960 |       String(
  961 |         (product as any)?.detailHref ||
  962 |         (product as any)?.href ||
  963 |         ""
```

匹配：productTypeId，第 949 行

```tsx
  939 |     QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712
  940 | 
  941 |     快插接头卡片优先使用生成数据中的真实详情链接：
  942 |     /products/fittings/quick-connect-fittings/q20#商品编码
  943 | 
  944 |     避免后续通用逻辑把链接改回产品类型筛选页。
  945 |   */
  946 |   {
  947 |     const rawProductTypeId =
  948 |       String(
  949 |         (product as any)?.productTypeId ||
  950 |         ""
  951 |       ).trim();
  952 | 
  953 |     const rawSourceType =
  954 |       String(
  955 |         (product as any)?.sourceType ||
  956 |         ""
  957 |       ).trim();
  958 | 
  959 |     const rawExistingHref =
  960 |       String(
  961 |         (product as any)?.detailHref ||
  962 |         (product as any)?.href ||
  963 |         ""
  964 |       ).trim();
  965 | 
```

匹配：productTypeId，第 972 行

```tsx
  962 |         (product as any)?.href ||
  963 |         ""
  964 |       ).trim();
  965 | 
  966 |     const rawProductText =
  967 |       JSON.stringify(
  968 |         product || {}
  969 |       );
  970 | 
  971 |     const isQuickConnect =
  972 |       rawProductTypeId ===
  973 |         "quick-connect-fittings" ||
  974 |       rawSourceType ===
  975 |         "quick-connect-selection" ||
  976 |       rawExistingHref.includes(
  977 |         "/products/fittings/quick-connect-fittings/"
  978 |       ) ||
  979 |       rawProductText.includes(
  980 |         "快插接头"
  981 |       );
  982 | 
  983 |     if (isQuickConnect) {
  984 | 
  985 |       /*
  986 |         QUICK_CONNECT_MODEL_DETAIL_HREF_20260712
  987 | 
  988 |         快插接头进入具体型号详情页，
```

匹配：productTypeId，第 1112 行

```tsx
 1102 |   }
 1103 |   /* THREAD_TO_BARBED_DETAIL_HREF_START */
 1104 | 
 1105 |   /*
 1106 |    * 螺纹转倒刺接头具体型号详情链接。
 1107 |    *
 1108 |    * 优先按商品编码匹配，
 1109 |    * 避免相同基础型号、不同 O 圈配置产生重复地址。
 1110 |    */
 1111 |   {
 1112 |     const rawProductTypeId =
 1113 |       String(
 1114 |         (product as any)
 1115 |           ?.productTypeId ||
 1116 |         ""
 1117 |       ).trim();
 1118 | 
 1119 |     const rawExistingHref =
 1120 |       String(
 1121 |         (product as any)
 1122 |           ?.detailHref ||
 1123 |         (product as any)
 1124 |           ?.href ||
 1125 |         ""
 1126 |       ).trim();
 1127 | 
 1128 |     const isThreadToBarbed =
```

匹配：productTypeId，第 1115 行

```tsx
 1105 |   /*
 1106 |    * 螺纹转倒刺接头具体型号详情链接。
 1107 |    *
 1108 |    * 优先按商品编码匹配，
 1109 |    * 避免相同基础型号、不同 O 圈配置产生重复地址。
 1110 |    */
 1111 |   {
 1112 |     const rawProductTypeId =
 1113 |       String(
 1114 |         (product as any)
 1115 |           ?.productTypeId ||
 1116 |         ""
 1117 |       ).trim();
 1118 | 
 1119 |     const rawExistingHref =
 1120 |       String(
 1121 |         (product as any)
 1122 |           ?.detailHref ||
 1123 |         (product as any)
 1124 |           ?.href ||
 1125 |         ""
 1126 |       ).trim();
 1127 | 
 1128 |     const isThreadToBarbed =
 1129 |       rawProductTypeId ===
 1130 |         "thread-to-barbed-fittings" ||
 1131 |       rawExistingHref.includes(
```

匹配：productTypeId，第 1129 行

```tsx
 1119 |     const rawExistingHref =
 1120 |       String(
 1121 |         (product as any)
 1122 |           ?.detailHref ||
 1123 |         (product as any)
 1124 |           ?.href ||
 1125 |         ""
 1126 |       ).trim();
 1127 | 
 1128 |     const isThreadToBarbed =
 1129 |       rawProductTypeId ===
 1130 |         "thread-to-barbed-fittings" ||
 1131 |       rawExistingHref.includes(
 1132 |         "/products/fittings/thread-to-barbed-fittings"
 1133 |       );
 1134 | 
 1135 |     if (isThreadToBarbed) {
 1136 |       const productCode =
 1137 |         String(
 1138 |           (product as any)
 1139 |             ?.productCode ||
 1140 |           (product as any)
 1141 |             ?.productId ||
 1142 |           ""
 1143 |         ).trim();
 1144 | 
 1145 |       const rawCardTitle =
```

匹配：productTypeId，第 1204 行

```tsx
 1194 |   /* THREAD_TO_BARBED_DETAIL_HREF_END */
 1195 | 
 1196 |   /* BARBED_FITTING_DETAIL_HREF_START */
 1197 | 
 1198 |   /*
 1199 |    * 倒刺接头标准型号详情链接。
 1200 |    * 页面结构继续复用 ProductDetailClient，
 1201 |    * 这里只负责把卡片导向具体型号。
 1202 |    */
 1203 |   {
 1204 |     const rawProductTypeId =
 1205 |       String(
 1206 |         (product as any)?.productTypeId ||
 1207 |         ""
 1208 |       ).trim();
 1209 | 
 1210 |     const rawExistingHref =
 1211 |       String(
 1212 |         (product as any)?.detailHref ||
 1213 |         (product as any)?.href ||
 1214 |         ""
 1215 |       ).trim();
 1216 | 
 1217 |     const isBarbedFitting =
 1218 |       rawProductTypeId ===
 1219 |         "barbed-fittings" ||
 1220 |       rawExistingHref.includes(
```

匹配：productTypeId，第 1206 行

```tsx
 1196 |   /* BARBED_FITTING_DETAIL_HREF_START */
 1197 | 
 1198 |   /*
 1199 |    * 倒刺接头标准型号详情链接。
 1200 |    * 页面结构继续复用 ProductDetailClient，
 1201 |    * 这里只负责把卡片导向具体型号。
 1202 |    */
 1203 |   {
 1204 |     const rawProductTypeId =
 1205 |       String(
 1206 |         (product as any)?.productTypeId ||
 1207 |         ""
 1208 |       ).trim();
 1209 | 
 1210 |     const rawExistingHref =
 1211 |       String(
 1212 |         (product as any)?.detailHref ||
 1213 |         (product as any)?.href ||
 1214 |         ""
 1215 |       ).trim();
 1216 | 
 1217 |     const isBarbedFitting =
 1218 |       rawProductTypeId ===
 1219 |         "barbed-fittings" ||
 1220 |       rawExistingHref.includes(
 1221 |         "/products/fittings/barbed-fittings"
 1222 |       );
```

匹配：productTypeId，第 1218 行

```tsx
 1208 |       ).trim();
 1209 | 
 1210 |     const rawExistingHref =
 1211 |       String(
 1212 |         (product as any)?.detailHref ||
 1213 |         (product as any)?.href ||
 1214 |         ""
 1215 |       ).trim();
 1216 | 
 1217 |     const isBarbedFitting =
 1218 |       rawProductTypeId ===
 1219 |         "barbed-fittings" ||
 1220 |       rawExistingHref.includes(
 1221 |         "/products/fittings/barbed-fittings"
 1222 |       );
 1223 | 
 1224 |     if (isBarbedFitting) {
 1225 |       const rawCardTitle =
 1226 |         (product as any)?.cardTitle;
 1227 | 
 1228 |       const cardTitleText =
 1229 |         typeof rawCardTitle ===
 1230 |         "string"
 1231 |           ? rawCardTitle
 1232 |           : String(
 1233 |               rawCardTitle?.zh ||
 1234 |               rawCardTitle?.["zh-CN"] ||
```

匹配：productTypeId，第 1296 行

```tsx
 1286 | 
 1287 |     return controlSlug ? `/products/control/${controlSlug}` : "/products";
 1288 |   }
 1289 |   /*
 1290 |     CONTROL_MODULE_DETAIL_HREF_PATCH_20260708
 1291 |     智控系列选型卡片强制跳转到正式详情页。
 1292 |   */
 1293 |   if (
 1294 |     (product as any)?.categoryId === "control" ||
 1295 |     (product as any)?.category === "control" ||
 1296 |     (product as any)?.productTypeId === "control-module" ||
 1297 |     (product as any)?.productTypeLabel === "智控模块"
 1298 |   ) {
 1299 |     const rawHref = String(
 1300 |       (product as any).detailHref ||
 1301 |         (product as any).href ||
 1302 |         ""
 1303 |     ).trim();
 1304 | 
 1305 |     if (rawHref.includes("/products/control-modules/")) {
 1306 |       return rawHref;
 1307 |     }
 1308 | 
 1309 |     const rawSlug = String(
 1310 |       (product as any).detailSlug ||
 1311 |         (product as any).slug ||
 1312 |         (product as any).productId ||
```

匹配：filter，第 1316 行

```tsx
 1306 |       return rawHref;
 1307 |     }
 1308 | 
 1309 |     const rawSlug = String(
 1310 |       (product as any).detailSlug ||
 1311 |         (product as any).slug ||
 1312 |         (product as any).productId ||
 1313 |         ""
 1314 |     )
 1315 |       .split("/")
 1316 |       .filter(Boolean)
 1317 |       .pop();
 1318 | 
 1319 |     if (rawSlug === "abd-air-bubble-detector" || rawSlug === "control-abd-air-bubble-detector") {
 1320 |       return "/products/control/abd-air-bubble-detector";
 1321 |     }
 1322 | 
 1323 |     if (rawSlug === "pdm5-pressure-sensor" || rawSlug === "control-pdm5-pressure-sensor") {
 1324 |       return "/products/control/pdm5-pressure-sensor";
 1325 |     }
 1326 | 
 1327 |     return "/products/control";
 1328 |   }
 1329 | 
 1330 | 
 1331 |   /*
 1332 |     PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707
```

匹配：filter，第 1356 行

```tsx
 1346 |       return rawHref;
 1347 |     }
 1348 | 
 1349 |     const rawSlug = String(
 1350 |       (product as any).detailSlug ||
 1351 |         (product as any).slug ||
 1352 |         (product as any).productId ||
 1353 |         ""
 1354 |     )
 1355 |       .split("/")
 1356 |       .filter(Boolean)
 1357 |       .pop()
 1358 |       ?.toLowerCase();
 1359 | 
 1360 |     if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
 1361 |       return `/products/pumps/plunger-pumps/${rawSlug}`;
 1362 |     }
 1363 | 
 1364 |     const textForModel = [
 1365 |       (product as any).productId,
 1366 |       (product as any).detailSlug,
 1367 |       (product as any).slug,
 1368 |       (product as any).cardTitle?.zh,
 1369 |       (product as any).cardTitle?.en,
 1370 |     ]
 1371 |       .filter(Boolean)
 1372 |       .join(" ")
```

匹配：filter，第 1371 行

```tsx
 1361 |       return `/products/pumps/plunger-pumps/${rawSlug}`;
 1362 |     }
 1363 | 
 1364 |     const textForModel = [
 1365 |       (product as any).productId,
 1366 |       (product as any).detailSlug,
 1367 |       (product as any).slug,
 1368 |       (product as any).cardTitle?.zh,
 1369 |       (product as any).cardTitle?.en,
 1370 |     ]
 1371 |       .filter(Boolean)
 1372 |       .join(" ")
 1373 |       .toLowerCase();
 1374 | 
 1375 |     const modelMatch = textForModel.match(/\b(ea|sm|tm)[-_\s]*(\d{2,5})[-_\s]*(pmma|peek)\b/i);
 1376 | 
 1377 |     if (modelMatch) {
 1378 |       return `/products/pumps/plunger-pumps/${modelMatch[1].toLowerCase()}-${modelMatch[2]}-${modelMatch[3].toLowerCase()}`;
 1379 |     }
 1380 |   }
 1381 | 
 1382 | /*
 1383 |     TUBING_MAKE_DETAIL_HREF_20260707
 1384 |     管路卡片优先使用 detailHref / href。
 1385 |   */
 1386 |   {
 1387 |     const rawHref = String(
```

匹配：filter，第 1405 行

```tsx
 1395 |       return rawHref;
 1396 |     }
 1397 | 
 1398 |     const rawSlug = String(
 1399 |       (product as any).detailSlug ||
 1400 |         (product as any).slug ||
 1401 |         (product as any).productId ||
 1402 |         ""
 1403 |     )
 1404 |       .split("/")
 1405 |       .filter(Boolean)
 1406 |       .pop()
 1407 |       ?.toLowerCase();
 1408 | 
 1409 |     if (
 1410 |       rawSlug === "pvc-tubing" ||
 1411 |       rawSlug === "tpu-tubing" ||
 1412 |       rawSlug === "fep-tubing" ||
 1413 |       rawSlug === "ptfe-tubing" ||
 1414 |       rawSlug === "peek-tubing" ||
 1415 |       rawSlug === "pfa-tubing"
 1416 |     ) {
 1417 |       return `/products/tubing/${rawSlug}`;
 1418 |     }
 1419 |   }
 1420 | 
 1421 | /*
```

匹配：filter，第 1470 行

```tsx
 1460 |     if (isTubingProduct) {
 1461 |       const rawSlug = String(
 1462 |         (product as any).detailSlug ||
 1463 |           (product as any).routeSlug ||
 1464 |           (product as any).slug ||
 1465 |           (product as any).seriesSlug ||
 1466 |           (product as any).productId ||
 1467 |           ""
 1468 |       )
 1469 |         .split("/")
 1470 |         .filter(Boolean)
 1471 |         .pop()
 1472 |         ?.toLowerCase();
 1473 | 
 1474 |       if (
 1475 |         rawSlug === "pvc-tubing" ||
 1476 |         rawSlug === "tpu-tubing" ||
 1477 |         rawSlug === "fep-tubing" ||
 1478 |         rawSlug === "ptfe-tubing" ||
 1479 |         rawSlug === "peek-tubing" ||
 1480 |         rawSlug === "pfa-tubing"
 1481 |       ) {
 1482 |         return `/products/tubing/${rawSlug}`;
 1483 |       }
 1484 | 
 1485 |       if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
 1486 |       if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
```

匹配：filter，第 1518 行

```tsx
 1508 |     (product as any)?.categoryLabel === "针系列"
 1509 |   ) {
 1510 |     const rawHref = String(
 1511 |       (product as any).detailHref ||
 1512 |         (product as any).href ||
 1513 |         ""
 1514 |     );
 1515 | 
 1516 |     const slugFromHref = rawHref
 1517 |       .split("/")
 1518 |       .filter(Boolean)
 1519 |       .pop();
 1520 | 
 1521 |     const rawSlug =
 1522 |       (product as any).productTypeSlug ||
 1523 |       (product as any).detailSlug ||
 1524 |       (product as any).routeSlug ||
 1525 |       (product as any).slug ||
 1526 |       (product as any).seriesSlug ||
 1527 |       slugFromHref;
 1528 | 
 1529 |     const probeSlug = String(rawSlug || "")
 1530 |       .split("/")
 1531 |       .filter(Boolean)
 1532 |       .pop();
 1533 | 
 1534 |     if (
```

匹配：productTypes，第 1522 行

```tsx
 1512 |         (product as any).href ||
 1513 |         ""
 1514 |     );
 1515 | 
 1516 |     const slugFromHref = rawHref
 1517 |       .split("/")
 1518 |       .filter(Boolean)
 1519 |       .pop();
 1520 | 
 1521 |     const rawSlug =
 1522 |       (product as any).productTypeSlug ||
 1523 |       (product as any).detailSlug ||
 1524 |       (product as any).routeSlug ||
 1525 |       (product as any).slug ||
 1526 |       (product as any).seriesSlug ||
 1527 |       slugFromHref;
 1528 | 
 1529 |     const probeSlug = String(rawSlug || "")
 1530 |       .split("/")
 1531 |       .filter(Boolean)
 1532 |       .pop();
 1533 | 
 1534 |     if (
 1535 |       probeSlug &&
 1536 |       probeSlug !== "undefined" &&
 1537 |       probeSlug !== "null"
 1538 |     ) {
```

匹配：filter，第 1531 行

```tsx
 1521 |     const rawSlug =
 1522 |       (product as any).productTypeSlug ||
 1523 |       (product as any).detailSlug ||
 1524 |       (product as any).routeSlug ||
 1525 |       (product as any).slug ||
 1526 |       (product as any).seriesSlug ||
 1527 |       slugFromHref;
 1528 | 
 1529 |     const probeSlug = String(rawSlug || "")
 1530 |       .split("/")
 1531 |       .filter(Boolean)
 1532 |       .pop();
 1533 | 
 1534 |     if (
 1535 |       probeSlug &&
 1536 |       probeSlug !== "undefined" &&
 1537 |       probeSlug !== "null"
 1538 |     ) {
 1539 |       return `/products/probes/${probeSlug}`;
 1540 |     }
 1541 | 
 1542 |     return "/products";
 1543 |   }
 1544 | 
 1545 |   /*
 1546 |     PROBE_DETAIL_HREF_PATCH_20260709
 1547 | 
```

匹配：productTypeId，第 1548 行

```tsx
 1538 |     ) {
 1539 |       return `/products/probes/${probeSlug}`;
 1540 |     }
 1541 | 
 1542 |     return "/products";
 1543 |   }
 1544 | 
 1545 |   /*
 1546 |     PROBE_DETAIL_HREF_PATCH_20260709
 1547 | 
 1548 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1549 |     详情路由不能依赖 productTypeId。
 1550 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1551 |   */
 1552 |   if (
 1553 |     (product as any)?.sourceType === "probe-selection" ||
 1554 |     (product as any)?.category === "probes" ||
 1555 |     (product as any)?.categoryLabel === "针系列"
 1556 |   ) {
 1557 |     const rawHref = String(
 1558 |       (product as any).detailHref ||
 1559 |         (product as any).href ||
 1560 |         ""
 1561 |     );
 1562 | 
 1563 |     const slugFromHref = rawHref
 1564 |       .split("/")
```

匹配：productTypeId，第 1549 行

```tsx
 1539 |       return `/products/probes/${probeSlug}`;
 1540 |     }
 1541 | 
 1542 |     return "/products";
 1543 |   }
 1544 | 
 1545 |   /*
 1546 |     PROBE_DETAIL_HREF_PATCH_20260709
 1547 | 
 1548 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1549 |     详情路由不能依赖 productTypeId。
 1550 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1551 |   */
 1552 |   if (
 1553 |     (product as any)?.sourceType === "probe-selection" ||
 1554 |     (product as any)?.category === "probes" ||
 1555 |     (product as any)?.categoryLabel === "针系列"
 1556 |   ) {
 1557 |     const rawHref = String(
 1558 |       (product as any).detailHref ||
 1559 |         (product as any).href ||
 1560 |         ""
 1561 |     );
 1562 | 
 1563 |     const slugFromHref = rawHref
 1564 |       .split("/")
 1565 |       .filter(Boolean)
```

匹配：productTypes，第 1550 行

```tsx
 1540 |     }
 1541 | 
 1542 |     return "/products";
 1543 |   }
 1544 | 
 1545 |   /*
 1546 |     PROBE_DETAIL_HREF_PATCH_20260709
 1547 | 
 1548 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1549 |     详情路由不能依赖 productTypeId。
 1550 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1551 |   */
 1552 |   if (
 1553 |     (product as any)?.sourceType === "probe-selection" ||
 1554 |     (product as any)?.category === "probes" ||
 1555 |     (product as any)?.categoryLabel === "针系列"
 1556 |   ) {
 1557 |     const rawHref = String(
 1558 |       (product as any).detailHref ||
 1559 |         (product as any).href ||
 1560 |         ""
 1561 |     );
 1562 | 
 1563 |     const slugFromHref = rawHref
 1564 |       .split("/")
 1565 |       .filter(Boolean)
 1566 |       .pop();
```

匹配：filter，第 1565 行

```tsx
 1555 |     (product as any)?.categoryLabel === "针系列"
 1556 |   ) {
 1557 |     const rawHref = String(
 1558 |       (product as any).detailHref ||
 1559 |         (product as any).href ||
 1560 |         ""
 1561 |     );
 1562 | 
 1563 |     const slugFromHref = rawHref
 1564 |       .split("/")
 1565 |       .filter(Boolean)
 1566 |       .pop();
 1567 | 
 1568 |     const rawSlug =
 1569 |       (product as any).productTypeSlug ||
 1570 |       (product as any).detailSlug ||
 1571 |       (product as any).routeSlug ||
 1572 |       (product as any).slug ||
 1573 |       (product as any).seriesSlug ||
 1574 |       slugFromHref;
 1575 | 
 1576 |     const probeSlug = String(rawSlug || "")
 1577 |       .split("/")
 1578 |       .filter(Boolean)
 1579 |       .pop();
 1580 | 
 1581 |     if (
```

匹配：productTypes，第 1569 行

```tsx
 1559 |         (product as any).href ||
 1560 |         ""
 1561 |     );
 1562 | 
 1563 |     const slugFromHref = rawHref
 1564 |       .split("/")
 1565 |       .filter(Boolean)
 1566 |       .pop();
 1567 | 
 1568 |     const rawSlug =
 1569 |       (product as any).productTypeSlug ||
 1570 |       (product as any).detailSlug ||
 1571 |       (product as any).routeSlug ||
 1572 |       (product as any).slug ||
 1573 |       (product as any).seriesSlug ||
 1574 |       slugFromHref;
 1575 | 
 1576 |     const probeSlug = String(rawSlug || "")
 1577 |       .split("/")
 1578 |       .filter(Boolean)
 1579 |       .pop();
 1580 | 
 1581 |     if (
 1582 |       probeSlug &&
 1583 |       probeSlug !== "undefined" &&
 1584 |       probeSlug !== "null"
 1585 |     ) {
```

匹配：filter，第 1578 行

```tsx
 1568 |     const rawSlug =
 1569 |       (product as any).productTypeSlug ||
 1570 |       (product as any).detailSlug ||
 1571 |       (product as any).routeSlug ||
 1572 |       (product as any).slug ||
 1573 |       (product as any).seriesSlug ||
 1574 |       slugFromHref;
 1575 | 
 1576 |     const probeSlug = String(rawSlug || "")
 1577 |       .split("/")
 1578 |       .filter(Boolean)
 1579 |       .pop();
 1580 | 
 1581 |     if (
 1582 |       probeSlug &&
 1583 |       probeSlug !== "undefined" &&
 1584 |       probeSlug !== "null"
 1585 |     ) {
 1586 |       return `/products/probes/${probeSlug}`;
 1587 |     }
 1588 | 
 1589 |     return "/products";
 1590 |   }
 1591 | 
 1592 |   /*
 1593 |     PROBE_DETAIL_HREF_PATCH_20260708
 1594 | 
```

匹配：productTypeId，第 1595 行

```tsx
 1585 |     ) {
 1586 |       return `/products/probes/${probeSlug}`;
 1587 |     }
 1588 | 
 1589 |     return "/products";
 1590 |   }
 1591 | 
 1592 |   /*
 1593 |     PROBE_DETAIL_HREF_PATCH_20260708
 1594 | 
 1595 |     针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
 1596 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1597 |     避免生成 /products/probes/undefined。
 1598 |   */
 1599 |   if (
 1600 |     (product as any)?.sourceType === "probe-selection" ||
 1601 |     (product as any)?.category === "probes" ||
 1602 |     (product as any)?.categoryLabel === "针系列"
 1603 |   ) {
 1604 |     const rawHref = String(
 1605 |       (product as any).detailHref ||
 1606 |         (product as any).href ||
 1607 |         ""
 1608 |     );
 1609 | 
 1610 |     const slugFromHref = rawHref
 1611 |       .split("/")
```

匹配：productTypes，第 1596 行

```tsx
 1586 |       return `/products/probes/${probeSlug}`;
 1587 |     }
 1588 | 
 1589 |     return "/products";
 1590 |   }
 1591 | 
 1592 |   /*
 1593 |     PROBE_DETAIL_HREF_PATCH_20260708
 1594 | 
 1595 |     针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
 1596 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1597 |     避免生成 /products/probes/undefined。
 1598 |   */
 1599 |   if (
 1600 |     (product as any)?.sourceType === "probe-selection" ||
 1601 |     (product as any)?.category === "probes" ||
 1602 |     (product as any)?.categoryLabel === "针系列"
 1603 |   ) {
 1604 |     const rawHref = String(
 1605 |       (product as any).detailHref ||
 1606 |         (product as any).href ||
 1607 |         ""
 1608 |     );
 1609 | 
 1610 |     const slugFromHref = rawHref
 1611 |       .split("/")
 1612 |       .filter(Boolean)
```

匹配：filter，第 1612 行

```tsx
 1602 |     (product as any)?.categoryLabel === "针系列"
 1603 |   ) {
 1604 |     const rawHref = String(
 1605 |       (product as any).detailHref ||
 1606 |         (product as any).href ||
 1607 |         ""
 1608 |     );
 1609 | 
 1610 |     const slugFromHref = rawHref
 1611 |       .split("/")
 1612 |       .filter(Boolean)
 1613 |       .pop();
 1614 | 
 1615 |     const rawSlug =
 1616 |       (product as any).productTypeSlug ||
 1617 |       (product as any).detailSlug ||
 1618 |       (product as any).routeSlug ||
 1619 |       (product as any).slug ||
 1620 |       (product as any).seriesSlug ||
 1621 |       slugFromHref;
 1622 | 
 1623 |     const probeSlug = String(rawSlug || "")
 1624 |       .split("/")
 1625 |       .filter(Boolean)
 1626 |       .pop();
 1627 | 
 1628 |     if (
```

匹配：productTypes，第 1616 行

```tsx
 1606 |         (product as any).href ||
 1607 |         ""
 1608 |     );
 1609 | 
 1610 |     const slugFromHref = rawHref
 1611 |       .split("/")
 1612 |       .filter(Boolean)
 1613 |       .pop();
 1614 | 
 1615 |     const rawSlug =
 1616 |       (product as any).productTypeSlug ||
 1617 |       (product as any).detailSlug ||
 1618 |       (product as any).routeSlug ||
 1619 |       (product as any).slug ||
 1620 |       (product as any).seriesSlug ||
 1621 |       slugFromHref;
 1622 | 
 1623 |     const probeSlug = String(rawSlug || "")
 1624 |       .split("/")
 1625 |       .filter(Boolean)
 1626 |       .pop();
 1627 | 
 1628 |     if (
 1629 |       probeSlug &&
 1630 |       probeSlug !== "undefined" &&
 1631 |       probeSlug !== "null"
 1632 |     ) {
```

匹配：filter，第 1625 行

```tsx
 1615 |     const rawSlug =
 1616 |       (product as any).productTypeSlug ||
 1617 |       (product as any).detailSlug ||
 1618 |       (product as any).routeSlug ||
 1619 |       (product as any).slug ||
 1620 |       (product as any).seriesSlug ||
 1621 |       slugFromHref;
 1622 | 
 1623 |     const probeSlug = String(rawSlug || "")
 1624 |       .split("/")
 1625 |       .filter(Boolean)
 1626 |       .pop();
 1627 | 
 1628 |     if (
 1629 |       probeSlug &&
 1630 |       probeSlug !== "undefined" &&
 1631 |       probeSlug !== "null"
 1632 |     ) {
 1633 |       return `/products/probes/${probeSlug}`;
 1634 |     }
 1635 | 
 1636 |     return "/products";
 1637 |   }
 1638 | 
 1639 |   /*
 1640 |     VALVE_DETAIL_HREF_PATCH_20260707
 1641 | 
```

匹配：productTypeId，第 1642 行

```tsx
 1632 |     ) {
 1633 |       return `/products/probes/${probeSlug}`;
 1634 |     }
 1635 | 
 1636 |     return "/products";
 1637 |   }
 1638 | 
 1639 |   /*
 1640 |     VALVE_DETAIL_HREF_PATCH_20260707
 1641 | 
 1642 |     阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
 1643 |     因此详情链接不能只依赖 productTypeId。
 1644 |     这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
 1645 |     避免生成 /products/valves/undefined/。
 1646 |   */
 1647 |   if ((product as any)?.categoryId === "valves") {
 1648 |     const rawHref = String(
 1649 |       (product as any).detailHref ||
 1650 |         (product as any).href ||
 1651 |         ""
 1652 |     );
 1653 | 
 1654 |     const slugFromHref = rawHref
 1655 |       .split("/")
 1656 |       .filter(Boolean)
 1657 |       .pop();
 1658 | 
```

匹配：productTypeId，第 1643 行

```tsx
 1633 |       return `/products/probes/${probeSlug}`;
 1634 |     }
 1635 | 
 1636 |     return "/products";
 1637 |   }
 1638 | 
 1639 |   /*
 1640 |     VALVE_DETAIL_HREF_PATCH_20260707
 1641 | 
 1642 |     阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
 1643 |     因此详情链接不能只依赖 productTypeId。
 1644 |     这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
 1645 |     避免生成 /products/valves/undefined/。
 1646 |   */
 1647 |   if ((product as any)?.categoryId === "valves") {
 1648 |     const rawHref = String(
 1649 |       (product as any).detailHref ||
 1650 |         (product as any).href ||
 1651 |         ""
 1652 |     );
 1653 | 
 1654 |     const slugFromHref = rawHref
 1655 |       .split("/")
 1656 |       .filter(Boolean)
 1657 |       .pop();
 1658 | 
 1659 |     const rawSlug =
```

匹配：filter，第 1656 行

```tsx
 1646 |   */
 1647 |   if ((product as any)?.categoryId === "valves") {
 1648 |     const rawHref = String(
 1649 |       (product as any).detailHref ||
 1650 |         (product as any).href ||
 1651 |         ""
 1652 |     );
 1653 | 
 1654 |     const slugFromHref = rawHref
 1655 |       .split("/")
 1656 |       .filter(Boolean)
 1657 |       .pop();
 1658 | 
 1659 |     const rawSlug =
 1660 |       (product as any).detailSlug ||
 1661 |       (product as any).routeSlug ||
 1662 |       (product as any).slug ||
 1663 |       (product as any).seriesSlug ||
 1664 |       (product as any).seriesId ||
 1665 |       slugFromHref;
 1666 | 
 1667 |     const valveSlug = String(rawSlug || "")
 1668 |       .split("/")
 1669 |       .filter(Boolean)
 1670 |       .pop();
 1671 | 
 1672 |     if (
```

匹配：filter，第 1669 行

```tsx
 1659 |     const rawSlug =
 1660 |       (product as any).detailSlug ||
 1661 |       (product as any).routeSlug ||
 1662 |       (product as any).slug ||
 1663 |       (product as any).seriesSlug ||
 1664 |       (product as any).seriesId ||
 1665 |       slugFromHref;
 1666 | 
 1667 |     const valveSlug = String(rawSlug || "")
 1668 |       .split("/")
 1669 |       .filter(Boolean)
 1670 |       .pop();
 1671 | 
 1672 |     if (
 1673 |       valveSlug &&
 1674 |       valveSlug !== "undefined" &&
 1675 |       valveSlug !== "null"
 1676 |     ) {
 1677 |       return `/products/valves/${valveSlug}`;
 1678 |     }
 1679 | 
 1680 |     return "/products";
 1681 |   }
 1682 | 
 1683 |   
 1684 |   const isValveProduct =
 1685 |     product.categoryId === "valves" &&
```

匹配：productTypeId，第 1686 行

```tsx
 1676 |     ) {
 1677 |       return `/products/valves/${valveSlug}`;
 1678 |     }
 1679 | 
 1680 |     return "/products";
 1681 |   }
 1682 | 
 1683 |   
 1684 |   const isValveProduct =
 1685 |     product.categoryId === "valves" &&
 1686 |     ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(String(product.productTypeId || ""));
 1687 | 
 1688 |   if (isValveProduct) {
 1689 |     return (
 1690 |       (product as any).detailHref ||
 1691 |       (product as any).href ||
 1692 |       `/products/valves/${product.productTypeId}`
 1693 |     );
 1694 |   }
 1695 | 
 1696 |   const isValvelessPump =
 1697 |     product.categoryId === "pumps" &&
 1698 |     ["valveless-pump", "valveless-pumps"].includes(String(product.productTypeId || ""));
 1699 | 
 1700 |   const isSyringePump =
 1701 |     product.categoryId === "pumps" &&
 1702 |     ["syringe-pump", "syringe-pumps"].includes(String(product.productTypeId || ""));
```

匹配：productTypeId，第 1692 行

```tsx
 1682 | 
 1683 |   
 1684 |   const isValveProduct =
 1685 |     product.categoryId === "valves" &&
 1686 |     ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(String(product.productTypeId || ""));
 1687 | 
 1688 |   if (isValveProduct) {
 1689 |     return (
 1690 |       (product as any).detailHref ||
 1691 |       (product as any).href ||
 1692 |       `/products/valves/${product.productTypeId}`
 1693 |     );
 1694 |   }
 1695 | 
 1696 |   const isValvelessPump =
 1697 |     product.categoryId === "pumps" &&
 1698 |     ["valveless-pump", "valveless-pumps"].includes(String(product.productTypeId || ""));
 1699 | 
 1700 |   const isSyringePump =
 1701 |     product.categoryId === "pumps" &&
 1702 |     ["syringe-pump", "syringe-pumps"].includes(String(product.productTypeId || ""));
 1703 | 
 1704 |   if (isValvelessPump) {
 1705 |     const rawSlug =
 1706 |       (product as any).detailSlug ||
 1707 |       (product as any).seriesSlug ||
 1708 |       (product as any).seriesId ||
```

匹配：productTypeId，第 1698 行

```tsx
 1688 |   if (isValveProduct) {
 1689 |     return (
 1690 |       (product as any).detailHref ||
 1691 |       (product as any).href ||
 1692 |       `/products/valves/${product.productTypeId}`
 1693 |     );
 1694 |   }
 1695 | 
 1696 |   const isValvelessPump =
 1697 |     product.categoryId === "pumps" &&
 1698 |     ["valveless-pump", "valveless-pumps"].includes(String(product.productTypeId || ""));
 1699 | 
 1700 |   const isSyringePump =
 1701 |     product.categoryId === "pumps" &&
 1702 |     ["syringe-pump", "syringe-pumps"].includes(String(product.productTypeId || ""));
 1703 | 
 1704 |   if (isValvelessPump) {
 1705 |     const rawSlug =
 1706 |       (product as any).detailSlug ||
 1707 |       (product as any).seriesSlug ||
 1708 |       (product as any).seriesId ||
 1709 |       product.productId;
 1710 | 
 1711 |     const slug = String(rawSlug || "")
 1712 |       .split("/")
 1713 |       .filter(Boolean)
 1714 |       .pop();
```

匹配：productTypeId，第 1702 行

```tsx
 1692 |       `/products/valves/${product.productTypeId}`
 1693 |     );
 1694 |   }
 1695 | 
 1696 |   const isValvelessPump =
 1697 |     product.categoryId === "pumps" &&
 1698 |     ["valveless-pump", "valveless-pumps"].includes(String(product.productTypeId || ""));
 1699 | 
 1700 |   const isSyringePump =
 1701 |     product.categoryId === "pumps" &&
 1702 |     ["syringe-pump", "syringe-pumps"].includes(String(product.productTypeId || ""));
 1703 | 
 1704 |   if (isValvelessPump) {
 1705 |     const rawSlug =
 1706 |       (product as any).detailSlug ||
 1707 |       (product as any).seriesSlug ||
 1708 |       (product as any).seriesId ||
 1709 |       product.productId;
 1710 | 
 1711 |     const slug = String(rawSlug || "")
 1712 |       .split("/")
 1713 |       .filter(Boolean)
 1714 |       .pop();
 1715 | 
 1716 |     return slug
 1717 |       ? `/products/pumps/valveless-pumps/${slug}`
 1718 |       : "/products/pumps/valveless-pumps";
```

匹配：filter，第 1713 行

```tsx
 1703 | 
 1704 |   if (isValvelessPump) {
 1705 |     const rawSlug =
 1706 |       (product as any).detailSlug ||
 1707 |       (product as any).seriesSlug ||
 1708 |       (product as any).seriesId ||
 1709 |       product.productId;
 1710 | 
 1711 |     const slug = String(rawSlug || "")
 1712 |       .split("/")
 1713 |       .filter(Boolean)
 1714 |       .pop();
 1715 | 
 1716 |     return slug
 1717 |       ? `/products/pumps/valveless-pumps/${slug}`
 1718 |       : "/products/pumps/valveless-pumps";
 1719 |   }
 1720 | 
 1721 |   if (isSyringePump) {
 1722 |     const rawSlug =
 1723 |       (product as any).detailSlug ||
 1724 |       (product as any).seriesSlug ||
 1725 |       (product as any).seriesId ||
 1726 |       product.productId;
 1727 | 
 1728 |     const slug = String(rawSlug || "")
 1729 |       .split("/")
```

匹配：filter，第 1730 行

```tsx
 1720 | 
 1721 |   if (isSyringePump) {
 1722 |     const rawSlug =
 1723 |       (product as any).detailSlug ||
 1724 |       (product as any).seriesSlug ||
 1725 |       (product as any).seriesId ||
 1726 |       product.productId;
 1727 | 
 1728 |     const slug = String(rawSlug || "")
 1729 |       .split("/")
 1730 |       .filter(Boolean)
 1731 |       .pop();
 1732 | 
 1733 |     return slug
 1734 |       ? `/products/pumps/syringe-pumps/${slug}`
 1735 |       : "/products/pumps/syringe-pumps";
 1736 |   }
 1737 | const isDiaphragmPump =
 1738 |     product.categoryId === "pumps" &&
 1739 |     ["diaphragm-pump", "diaphragm-pumps"].includes(String(product.productTypeId || ""));
 1740 | 
 1741 |   if (isDiaphragmPump) {
 1742 |     const rawSlug =
 1743 |       (product as any).detailSlug ||
 1744 |       (product as any).seriesSlug ||
 1745 |       (product as any).seriesId ||
 1746 |       product.productId;
```

匹配：productTypeId，第 1739 行

```tsx
 1729 |       .split("/")
 1730 |       .filter(Boolean)
 1731 |       .pop();
 1732 | 
 1733 |     return slug
 1734 |       ? `/products/pumps/syringe-pumps/${slug}`
 1735 |       : "/products/pumps/syringe-pumps";
 1736 |   }
 1737 | const isDiaphragmPump =
 1738 |     product.categoryId === "pumps" &&
 1739 |     ["diaphragm-pump", "diaphragm-pumps"].includes(String(product.productTypeId || ""));
 1740 | 
 1741 |   if (isDiaphragmPump) {
 1742 |     const rawSlug =
 1743 |       (product as any).detailSlug ||
 1744 |       (product as any).seriesSlug ||
 1745 |       (product as any).seriesId ||
 1746 |       product.productId;
 1747 | 
 1748 |     const slug = String(rawSlug || "")
 1749 |       .split("/")
 1750 |       .filter(Boolean)
 1751 |       .pop();
 1752 | 
 1753 |     return slug
 1754 |       ? `/products/pumps/diaphragm-pumps/${slug}`
 1755 |       : "/products/pumps/diaphragm-pumps";
```

匹配：filter，第 1750 行

```tsx
 1740 | 
 1741 |   if (isDiaphragmPump) {
 1742 |     const rawSlug =
 1743 |       (product as any).detailSlug ||
 1744 |       (product as any).seriesSlug ||
 1745 |       (product as any).seriesId ||
 1746 |       product.productId;
 1747 | 
 1748 |     const slug = String(rawSlug || "")
 1749 |       .split("/")
 1750 |       .filter(Boolean)
 1751 |       .pop();
 1752 | 
 1753 |     return slug
 1754 |       ? `/products/pumps/diaphragm-pumps/${slug}`
 1755 |       : "/products/pumps/diaphragm-pumps";
 1756 |   }  const isPipettingPump =
 1757 |     product.categoryId === "pumps" &&
 1758 |     ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(String(product.productTypeId || ""));
 1759 | 
 1760 |   if (isPipettingPump) {
 1761 |     const rawSlug =
 1762 |       (product as any).detailSlug ||
 1763 |       (product as any).seriesSlug ||
 1764 |       (product as any).seriesId ||
 1765 |       product.productId;
 1766 | 
```

匹配：productTypeId，第 1758 行

```tsx
 1748 |     const slug = String(rawSlug || "")
 1749 |       .split("/")
 1750 |       .filter(Boolean)
 1751 |       .pop();
 1752 | 
 1753 |     return slug
 1754 |       ? `/products/pumps/diaphragm-pumps/${slug}`
 1755 |       : "/products/pumps/diaphragm-pumps";
 1756 |   }  const isPipettingPump =
 1757 |     product.categoryId === "pumps" &&
 1758 |     ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(String(product.productTypeId || ""));
 1759 | 
 1760 |   if (isPipettingPump) {
 1761 |     const rawSlug =
 1762 |       (product as any).detailSlug ||
 1763 |       (product as any).seriesSlug ||
 1764 |       (product as any).seriesId ||
 1765 |       product.productId;
 1766 | 
 1767 |     const slug = String(rawSlug || "")
 1768 |       .split("/")
 1769 |       .filter(Boolean)
 1770 |       .pop();
 1771 | 
 1772 |     return slug
 1773 |       ? `/products/pumps/pipetting-pumps/${slug}`
 1774 |       : "/products/pumps/pipetting-pumps";
```

匹配：filter，第 1769 行

```tsx
 1759 | 
 1760 |   if (isPipettingPump) {
 1761 |     const rawSlug =
 1762 |       (product as any).detailSlug ||
 1763 |       (product as any).seriesSlug ||
 1764 |       (product as any).seriesId ||
 1765 |       product.productId;
 1766 | 
 1767 |     const slug = String(rawSlug || "")
 1768 |       .split("/")
 1769 |       .filter(Boolean)
 1770 |       .pop();
 1771 | 
 1772 |     return slug
 1773 |       ? `/products/pumps/pipetting-pumps/${slug}`
 1774 |       : "/products/pumps/pipetting-pumps";
 1775 |   }
 1776 | 
 1777 | 
 1778 | 
 1779 | 
 1780 |   const isPlungerPump =
 1781 |     product.categoryId === "pumps" &&
 1782 |     ["plunger-pump", "plunger-pumps"].includes(String(product.productTypeId || ""));
 1783 | 
 1784 |   if (isPlungerPump) {
 1785 |     const slug = getPlungerPumpModelSlugForDetailHref(product);
```

匹配：productTypeId，第 1782 行

```tsx
 1772 |     return slug
 1773 |       ? `/products/pumps/pipetting-pumps/${slug}`
 1774 |       : "/products/pumps/pipetting-pumps";
 1775 |   }
 1776 | 
 1777 | 
 1778 | 
 1779 | 
 1780 |   const isPlungerPump =
 1781 |     product.categoryId === "pumps" &&
 1782 |     ["plunger-pump", "plunger-pumps"].includes(String(product.productTypeId || ""));
 1783 | 
 1784 |   if (isPlungerPump) {
 1785 |     const slug = getPlungerPumpModelSlugForDetailHref(product);
 1786 | 
 1787 |     return slug
 1788 |       ? `/products/pumps/plunger-pumps/${slug}`
 1789 |       : "/products/pumps/plunger-pumps";
 1790 |   }
 1791 | 
 1792 |   return `/products/${product.categoryId}/${product.detailSlug}`;
 1793 | }
 1794 | 
 1795 | /*
 1796 |  * 硬管接头接管外径筛选排序
 1797 |  *
 1798 |  * 仅作用于：
```

匹配：productTypeId，第 1799 行

```tsx
 1789 |       : "/products/pumps/plunger-pumps";
 1790 |   }
 1791 | 
 1792 |   return `/products/${product.categoryId}/${product.detailSlug}`;
 1793 | }
 1794 | 
 1795 | /*
 1796 |  * 硬管接头接管外径筛选排序
 1797 |  *
 1798 |  * 仅作用于：
 1799 |  * productTypeId = hard-tube-fittings
 1800 |  * filter03 = 接管外径
 1801 |  */
 1802 | function sortHardTubeFilterOptionsForDisplay(
 1803 |   productTypeId: string,
 1804 |   filterKey: SelectionFilterKey,
 1805 |   options: Array<{
 1806 |     value: string;
 1807 |     label: string;
 1808 |   }>
 1809 | ) {
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
```

匹配：filter，第 1800 行

```tsx
 1790 |   }
 1791 | 
 1792 |   return `/products/${product.categoryId}/${product.detailSlug}`;
 1793 | }
 1794 | 
 1795 | /*
 1796 |  * 硬管接头接管外径筛选排序
 1797 |  *
 1798 |  * 仅作用于：
 1799 |  * productTypeId = hard-tube-fittings
 1800 |  * filter03 = 接管外径
 1801 |  */
 1802 | function sortHardTubeFilterOptionsForDisplay(
 1803 |   productTypeId: string,
 1804 |   filterKey: SelectionFilterKey,
 1805 |   options: Array<{
 1806 |     value: string;
 1807 |     label: string;
 1808 |   }>
 1809 | ) {
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
```

匹配：filter，第 1802 行

```tsx
 1792 |   return `/products/${product.categoryId}/${product.detailSlug}`;
 1793 | }
 1794 | 
 1795 | /*
 1796 |  * 硬管接头接管外径筛选排序
 1797 |  *
 1798 |  * 仅作用于：
 1799 |  * productTypeId = hard-tube-fittings
 1800 |  * filter03 = 接管外径
 1801 |  */
 1802 | function sortHardTubeFilterOptionsForDisplay(
 1803 |   productTypeId: string,
 1804 |   filterKey: SelectionFilterKey,
 1805 |   options: Array<{
 1806 |     value: string;
 1807 |     label: string;
 1808 |   }>
 1809 | ) {
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1817 |    * 3. 不改变硬管接头和其他产品筛选。
 1818 |    */
```

匹配：productTypeId，第 1803 行

```tsx
 1793 | }
 1794 | 
 1795 | /*
 1796 |  * 硬管接头接管外径筛选排序
 1797 |  *
 1798 |  * 仅作用于：
 1799 |  * productTypeId = hard-tube-fittings
 1800 |  * filter03 = 接管外径
 1801 |  */
 1802 | function sortHardTubeFilterOptionsForDisplay(
 1803 |   productTypeId: string,
 1804 |   filterKey: SelectionFilterKey,
 1805 |   options: Array<{
 1806 |     value: string;
 1807 |     label: string;
 1808 |   }>
 1809 | ) {
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1817 |    * 3. 不改变硬管接头和其他产品筛选。
 1818 |    */
 1819 |   if (
```

匹配：filter，第 1804 行

```tsx
 1794 | 
 1795 | /*
 1796 |  * 硬管接头接管外径筛选排序
 1797 |  *
 1798 |  * 仅作用于：
 1799 |  * productTypeId = hard-tube-fittings
 1800 |  * filter03 = 接管外径
 1801 |  */
 1802 | function sortHardTubeFilterOptionsForDisplay(
 1803 |   productTypeId: string,
 1804 |   filterKey: SelectionFilterKey,
 1805 |   options: Array<{
 1806 |     value: string;
 1807 |     label: string;
 1808 |   }>
 1809 | ) {
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1817 |    * 3. 不改变硬管接头和其他产品筛选。
 1818 |    */
 1819 |   if (
 1820 |     productTypeId === "quick-connect-fittings" &&
```

匹配：filter，第 1810 行

```tsx
 1800 |  * filter03 = 接管外径
 1801 |  */
 1802 | function sortHardTubeFilterOptionsForDisplay(
 1803 |   productTypeId: string,
 1804 |   filterKey: SelectionFilterKey,
 1805 |   options: Array<{
 1806 |     value: string;
 1807 |     label: string;
 1808 |   }>
 1809 | ) {
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1817 |    * 3. 不改变硬管接头和其他产品筛选。
 1818 |    */
 1819 |   if (
 1820 |     productTypeId === "quick-connect-fittings" &&
 1821 |     filterKey === "filter02"
 1822 |   ) {
 1823 |     const diameterOrder = [
 1824 |       "1.6 mm",
 1825 |       "3.2 mm",
 1826 |       "4.8 mm",
```

匹配：productTypeId，第 1820 行

```tsx
 1810 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1817 |    * 3. 不改变硬管接头和其他产品筛选。
 1818 |    */
 1819 |   if (
 1820 |     productTypeId === "quick-connect-fittings" &&
 1821 |     filterKey === "filter02"
 1822 |   ) {
 1823 |     const diameterOrder = [
 1824 |       "1.6 mm",
 1825 |       "3.2 mm",
 1826 |       "4.8 mm",
 1827 |       "6.4 mm",
 1828 |       "7.9 mm",
 1829 |       "9.5 mm",
 1830 |       "12.7 mm",
 1831 |       "16.0 mm",
 1832 |       "19.0 mm",
 1833 |     ];
 1834 | 
 1835 |     const threadOrder = [
 1836 |       "1/8\"-27 NPT",
```

匹配：filter，第 1821 行

```tsx
 1811 | 
 1812 |   /*
 1813 |    * 快插接头的“接管内径或螺纹”排序：
 1814 |    *
 1815 |    * 1. 软管内径按照毫米数值从小到大；
 1816 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1817 |    * 3. 不改变硬管接头和其他产品筛选。
 1818 |    */
 1819 |   if (
 1820 |     productTypeId === "quick-connect-fittings" &&
 1821 |     filterKey === "filter02"
 1822 |   ) {
 1823 |     const diameterOrder = [
 1824 |       "1.6 mm",
 1825 |       "3.2 mm",
 1826 |       "4.8 mm",
 1827 |       "6.4 mm",
 1828 |       "7.9 mm",
 1829 |       "9.5 mm",
 1830 |       "12.7 mm",
 1831 |       "16.0 mm",
 1832 |       "19.0 mm",
 1833 |     ];
 1834 | 
 1835 |     const threadOrder = [
 1836 |       "1/8\"-27 NPT",
 1837 |       "1/4\"-18 NPT",
```

匹配：filter，第 1909 行

```tsx
 1899 |           nextValue,
 1900 |           "zh-CN",
 1901 |           {
 1902 |             numeric: true,
 1903 |           }
 1904 |         );
 1905 |       }
 1906 |     );
 1907 |   }
 1908 | 
 1909 |   /* QUICK_CONNECT_FILTER02_SORT_END */
 1910 | 
 1911 | 
 1912 | 
 1913 | 
 1914 |   if (
 1915 |     productTypeId !== "hard-tube-fittings" ||
 1916 |     filterKey !== "filter03"
 1917 |   ) {
 1918 |     return options;
 1919 |   }
 1920 | 
 1921 |   const tubeOdOrder = new Map<string, number>([
 1922 |     ["1.6 mm", 10],
 1923 |     ["1.8 mm", 20],
 1924 |     ["2.0 mm", 30],
 1925 |     ["2.5 mm", 40],
```

匹配：productTypeId，第 1915 行

```tsx
 1905 |       }
 1906 |     );
 1907 |   }
 1908 | 
 1909 |   /* QUICK_CONNECT_FILTER02_SORT_END */
 1910 | 
 1911 | 
 1912 | 
 1913 | 
 1914 |   if (
 1915 |     productTypeId !== "hard-tube-fittings" ||
 1916 |     filterKey !== "filter03"
 1917 |   ) {
 1918 |     return options;
 1919 |   }
 1920 | 
 1921 |   const tubeOdOrder = new Map<string, number>([
 1922 |     ["1.6 mm", 10],
 1923 |     ["1.8 mm", 20],
 1924 |     ["2.0 mm", 30],
 1925 |     ["2.5 mm", 40],
 1926 |     ["3.0 mm", 50],
 1927 |     ["3.2 mm", 60],
 1928 |   ]);
 1929 | 
 1930 |   return [...options].sort((current, next) => {
 1931 |     const currentNumber = Number.parseFloat(current.value);
```

匹配：filter，第 1916 行

```tsx
 1906 |     );
 1907 |   }
 1908 | 
 1909 |   /* QUICK_CONNECT_FILTER02_SORT_END */
 1910 | 
 1911 | 
 1912 | 
 1913 | 
 1914 |   if (
 1915 |     productTypeId !== "hard-tube-fittings" ||
 1916 |     filterKey !== "filter03"
 1917 |   ) {
 1918 |     return options;
 1919 |   }
 1920 | 
 1921 |   const tubeOdOrder = new Map<string, number>([
 1922 |     ["1.6 mm", 10],
 1923 |     ["1.8 mm", 20],
 1924 |     ["2.0 mm", 30],
 1925 |     ["2.5 mm", 40],
 1926 |     ["3.0 mm", 50],
 1927 |     ["3.2 mm", 60],
 1928 |   ]);
 1929 | 
 1930 |   return [...options].sort((current, next) => {
 1931 |     const currentNumber = Number.parseFloat(current.value);
 1932 |     const nextNumber = Number.parseFloat(next.value);
```

匹配：filter，第 1948 行

```tsx
 1938 |     const nextOrder =
 1939 |       tubeOdOrder.get(next.value) ??
 1940 |       (Number.isFinite(nextNumber) ? nextNumber : 999);
 1941 | 
 1942 |     return currentOrder - nextOrder;
 1943 |   });
 1944 | }
 1945 | 
 1946 | 
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
```

匹配：filter，第 1951 行

```tsx
 1941 | 
 1942 |     return currentOrder - nextOrder;
 1943 |   });
 1944 | }
 1945 | 
 1946 | 
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
```

匹配：filter，第 1952 行

```tsx
 1942 |     return currentOrder - nextOrder;
 1943 |   });
 1944 | }
 1945 | 
 1946 | 
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
```

匹配：filter，第 1954 行

```tsx
 1944 | }
 1945 | 
 1946 | 
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
```

匹配：productTypeId，第 1955 行

```tsx
 1945 | 
 1946 | 
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
```

匹配：filter，第 1956 行

```tsx
 1946 | 
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
```

匹配：filter，第 1957 行

```tsx
 1947 | /*
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
```

匹配：productTypeId，第 1958 行

```tsx
 1948 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1949 |  *
 1950 |  * 螺纹转倒刺接头：
 1951 |  * filter02 = 密封方式，每项独占一行
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
```

匹配：filter，第 1962 行

```tsx
 1952 |  * filter01 = 连接结构，两个一排
 1953 |  */
 1954 | function getProductFilterGroupLayout(
 1955 |   productTypeId: string,
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
 1975 |   initialProductTypeId,
 1976 |   initialFilters,
 1977 | }: ProductSelectionClientProps) {
 1978 |   const router = useRouter();
```

匹配：filter，第 1966 行

```tsx
 1956 |   filterKey: SelectionFilterKey
 1957 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1958 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1959 |     return undefined;
 1960 |   }
 1961 | 
 1962 |   if (filterKey === "filter02") {
 1963 |     return "one";
 1964 |   }
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
 1975 |   initialProductTypeId,
 1976 |   initialFilters,
 1977 | }: ProductSelectionClientProps) {
 1978 |   const router = useRouter();
 1979 |   const searchParams = useSearchParams();
 1980 |   const requestedCategoryId = searchParams.get("category");
 1981 |   const requestedProductTypeId = searchParams.get("productType");
 1982 | 
```

匹配：productTypeId，第 1975 行

```tsx
 1965 | 
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
 1975 |   initialProductTypeId,
 1976 |   initialFilters,
 1977 | }: ProductSelectionClientProps) {
 1978 |   const router = useRouter();
 1979 |   const searchParams = useSearchParams();
 1980 |   const requestedCategoryId = searchParams.get("category");
 1981 |   const requestedProductTypeId = searchParams.get("productType");
 1982 | 
 1983 |   const pageText =
 1984 |     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 1985 | 
 1986 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1987 | 
 1988 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
```

匹配：filter，第 1976 行

```tsx
 1966 |   if (filterKey === "filter01") {
 1967 |     return "two";
 1968 |   }
 1969 | 
 1970 |   return undefined;
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
 1975 |   initialProductTypeId,
 1976 |   initialFilters,
 1977 | }: ProductSelectionClientProps) {
 1978 |   const router = useRouter();
 1979 |   const searchParams = useSearchParams();
 1980 |   const requestedCategoryId = searchParams.get("category");
 1981 |   const requestedProductTypeId = searchParams.get("productType");
 1982 | 
 1983 |   const pageText =
 1984 |     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 1985 | 
 1986 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1987 | 
 1988 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
 1992 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
```

匹配：productTypeId，第 1981 行

```tsx
 1971 | }
 1972 | export default function ProductSelectionClient({
 1973 |   locale = "zh",
 1974 |   initialCategoryId,
 1975 |   initialProductTypeId,
 1976 |   initialFilters,
 1977 | }: ProductSelectionClientProps) {
 1978 |   const router = useRouter();
 1979 |   const searchParams = useSearchParams();
 1980 |   const requestedCategoryId = searchParams.get("category");
 1981 |   const requestedProductTypeId = searchParams.get("productType");
 1982 | 
 1983 |   const pageText =
 1984 |     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 1985 | 
 1986 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1987 | 
 1988 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
 1992 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 1993 |     const initialActiveCategoryId =
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
```

匹配：productTypeId，第 1992 行

```tsx
 1982 | 
 1983 |   const pageText =
 1984 |     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 1985 | 
 1986 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1987 | 
 1988 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
 1992 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 1993 |     const initialActiveCategoryId =
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
```

匹配：productTypeId，第 1996 行

```tsx
 1986 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1987 | 
 1988 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
 1992 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 1993 |     const initialActiveCategoryId =
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
```

匹配：filter，第 1999 行

```tsx
 1989 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1990 |   });
 1991 | 
 1992 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 1993 |     const initialActiveCategoryId =
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
```

匹配：productTypeId，第 2003 行

```tsx
 1993 |     const initialActiveCategoryId =
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
 2016 |     removeItem,
 2017 |     getItem,
 2018 |   } = useSelectionCart();
 2019 | 
```

匹配：productTypeId，第 2004 行

```tsx
 1994 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1995 | 
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
 2016 |     removeItem,
 2017 |     getItem,
 2018 |   } = useSelectionCart();
 2019 | 
 2020 |   const selectedList = useMemo(() => {
```

匹配：filter，第 2006 行

```tsx
 1996 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1997 |   });
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
 2016 |     removeItem,
 2017 |     getItem,
 2018 |   } = useSelectionCart();
 2019 | 
 2020 |   const selectedList = useMemo(() => {
 2021 |     return new Set(
 2022 |       selectionCartItems
```

匹配：productTypeId，第 2008 行

```tsx
 1998 | 
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
 2016 |     removeItem,
 2017 |     getItem,
 2018 |   } = useSelectionCart();
 2019 | 
 2020 |   const selectedList = useMemo(() => {
 2021 |     return new Set(
 2022 |       selectionCartItems
 2023 |         .filter((item) => item.sourceType === "pump-selection")
 2024 |         .map((item) => item.productCode)
```

匹配：filter，第 2009 行

```tsx
 1999 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 2000 |     () => {
 2001 |       const initialActiveCategoryId =
 2002 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 2003 |       const initialActiveProductTypeId =
 2004 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2005 | 
 2006 |       return getInitialSelectedFilters(
 2007 |         initialActiveCategoryId,
 2008 |         initialActiveProductTypeId,
 2009 |         initialFilters
 2010 |       );
 2011 |     }
 2012 |   );
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
 2016 |     removeItem,
 2017 |     getItem,
 2018 |   } = useSelectionCart();
 2019 | 
 2020 |   const selectedList = useMemo(() => {
 2021 |     return new Set(
 2022 |       selectionCartItems
 2023 |         .filter((item) => item.sourceType === "pump-selection")
 2024 |         .map((item) => item.productCode)
 2025 |     );
```

匹配：filter，第 2023 行

```tsx
 2013 |   const {
 2014 |     items: selectionCartItems,
 2015 |     addItem,
 2016 |     removeItem,
 2017 |     getItem,
 2018 |   } = useSelectionCart();
 2019 | 
 2020 |   const selectedList = useMemo(() => {
 2021 |     return new Set(
 2022 |       selectionCartItems
 2023 |         .filter((item) => item.sourceType === "pump-selection")
 2024 |         .map((item) => item.productCode)
 2025 |     );
 2026 |   }, [selectionCartItems]);
 2027 | const [searchKeyword, setSearchKeyword] = useState("");
 2028 |   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
 2029 |   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
 2030 |     Record<string, boolean>
 2031 |   >(() => {
 2032 |     const initialActiveCategoryId =
 2033 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 2034 |     const initialActiveProductTypeId =
 2035 |       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2036 | 
 2037 |     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 2038 |   });
 2039 |   const [currentProductPage, setCurrentProductPage] = useState(1);
```

匹配：filter，第 2029 行

```tsx
 2019 | 
 2020 |   const selectedList = useMemo(() => {
 2021 |     return new Set(
 2022 |       selectionCartItems
 2023 |         .filter((item) => item.sourceType === "pump-selection")
 2024 |         .map((item) => item.productCode)
 2025 |     );
 2026 |   }, [selectionCartItems]);
 2027 | const [searchKeyword, setSearchKeyword] = useState("");
 2028 |   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
 2029 |   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
 2030 |     Record<string, boolean>
 2031 |   >(() => {
 2032 |     const initialActiveCategoryId =
 2033 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 2034 |     const initialActiveProductTypeId =
 2035 |       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2036 | 
 2037 |     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 2038 |   });
 2039 |   const [currentProductPage, setCurrentProductPage] = useState(1);
 2040 |   const [productsPageSize, setProductsPageSize] = useState(12);
 2041 | 
 2042 |   const activeCategory = useMemo(() => {
 2043 |     return (
 2044 |       categoryItems.find((category) => category.id === activeCategoryId) ||
 2045 |       categoryItems[0] ||
```

匹配：productTypeId，第 2034 行

```tsx
 2024 |         .map((item) => item.productCode)
 2025 |     );
 2026 |   }, [selectionCartItems]);
 2027 | const [searchKeyword, setSearchKeyword] = useState("");
 2028 |   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
 2029 |   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
 2030 |     Record<string, boolean>
 2031 |   >(() => {
 2032 |     const initialActiveCategoryId =
 2033 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 2034 |     const initialActiveProductTypeId =
 2035 |       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2036 | 
 2037 |     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 2038 |   });
 2039 |   const [currentProductPage, setCurrentProductPage] = useState(1);
 2040 |   const [productsPageSize, setProductsPageSize] = useState(12);
 2041 | 
 2042 |   const activeCategory = useMemo(() => {
 2043 |     return (
 2044 |       categoryItems.find((category) => category.id === activeCategoryId) ||
 2045 |       categoryItems[0] ||
 2046 |       DEFAULT_CATEGORIES[0]
 2047 |     );
 2048 |   }, [activeCategoryId, categoryItems]);
 2049 | 
 2050 |   const categoryProducts = useMemo(() => {
```

匹配：productTypeId，第 2035 行

```tsx
 2025 |     );
 2026 |   }, [selectionCartItems]);
 2027 | const [searchKeyword, setSearchKeyword] = useState("");
 2028 |   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
 2029 |   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
 2030 |     Record<string, boolean>
 2031 |   >(() => {
 2032 |     const initialActiveCategoryId =
 2033 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 2034 |     const initialActiveProductTypeId =
 2035 |       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2036 | 
 2037 |     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 2038 |   });
 2039 |   const [currentProductPage, setCurrentProductPage] = useState(1);
 2040 |   const [productsPageSize, setProductsPageSize] = useState(12);
 2041 | 
 2042 |   const activeCategory = useMemo(() => {
 2043 |     return (
 2044 |       categoryItems.find((category) => category.id === activeCategoryId) ||
 2045 |       categoryItems[0] ||
 2046 |       DEFAULT_CATEGORIES[0]
 2047 |     );
 2048 |   }, [activeCategoryId, categoryItems]);
 2049 | 
 2050 |   const categoryProducts = useMemo(() => {
 2051 |     return getProductsByCategory(activeCategoryId);
```

匹配：filter、productTypeId，第 2037 行

```tsx
 2027 | const [searchKeyword, setSearchKeyword] = useState("");
 2028 |   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
 2029 |   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
 2030 |     Record<string, boolean>
 2031 |   >(() => {
 2032 |     const initialActiveCategoryId =
 2033 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 2034 |     const initialActiveProductTypeId =
 2035 |       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 2036 | 
 2037 |     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 2038 |   });
 2039 |   const [currentProductPage, setCurrentProductPage] = useState(1);
 2040 |   const [productsPageSize, setProductsPageSize] = useState(12);
 2041 | 
 2042 |   const activeCategory = useMemo(() => {
 2043 |     return (
 2044 |       categoryItems.find((category) => category.id === activeCategoryId) ||
 2045 |       categoryItems[0] ||
 2046 |       DEFAULT_CATEGORIES[0]
 2047 |     );
 2048 |   }, [activeCategoryId, categoryItems]);
 2049 | 
 2050 |   const categoryProducts = useMemo(() => {
 2051 |     return getProductsByCategory(activeCategoryId);
 2052 |   }, [activeCategoryId]);
 2053 | 
```

匹配：productTypeOptions、typeOptions，第 2054 行

```tsx
 2044 |       categoryItems.find((category) => category.id === activeCategoryId) ||
 2045 |       categoryItems[0] ||
 2046 |       DEFAULT_CATEGORIES[0]
 2047 |     );
 2048 |   }, [activeCategoryId, categoryItems]);
 2049 | 
 2050 |   const categoryProducts = useMemo(() => {
 2051 |     return getProductsByCategory(activeCategoryId);
 2052 |   }, [activeCategoryId]);
 2053 | 
 2054 |   const productTypeOptions = useMemo(() => {
 2055 |     const optionMap = new Map<string, { value: string; label: string }>();
 2056 | 
 2057 |     /*
 2058 |      * 说明：
 2059 |      * 1. 先读取已有产品数据中的产品类型
 2060 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 2061 |      */
 2062 |     categoryProducts.forEach((product) => {
 2063 |       if (!product.productTypeId) return;
 2064 | 
 2065 |       if (!optionMap.has(product.productTypeId)) {
 2066 |         optionMap.set(product.productTypeId, {
 2067 |           value: product.productTypeId,
 2068 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2069 |         });
 2070 |       }
```

匹配：productTypeId，第 2063 行

```tsx
 2053 | 
 2054 |   const productTypeOptions = useMemo(() => {
 2055 |     const optionMap = new Map<string, { value: string; label: string }>();
 2056 | 
 2057 |     /*
 2058 |      * 说明：
 2059 |      * 1. 先读取已有产品数据中的产品类型
 2060 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 2061 |      */
 2062 |     categoryProducts.forEach((product) => {
 2063 |       if (!product.productTypeId) return;
 2064 | 
 2065 |       if (!optionMap.has(product.productTypeId)) {
 2066 |         optionMap.set(product.productTypeId, {
 2067 |           value: product.productTypeId,
 2068 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2069 |         });
 2070 |       }
 2071 |     });
 2072 | 
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
```

匹配：productTypeId，第 2065 行

```tsx
 2055 |     const optionMap = new Map<string, { value: string; label: string }>();
 2056 | 
 2057 |     /*
 2058 |      * 说明：
 2059 |      * 1. 先读取已有产品数据中的产品类型
 2060 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 2061 |      */
 2062 |     categoryProducts.forEach((product) => {
 2063 |       if (!product.productTypeId) return;
 2064 | 
 2065 |       if (!optionMap.has(product.productTypeId)) {
 2066 |         optionMap.set(product.productTypeId, {
 2067 |           value: product.productTypeId,
 2068 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2069 |         });
 2070 |       }
 2071 |     });
 2072 | 
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 2080 |       if (!optionMap.has(option.value)) {
 2081 |         optionMap.set(option.value, {
```

匹配：productTypeId，第 2066 行

```tsx
 2056 | 
 2057 |     /*
 2058 |      * 说明：
 2059 |      * 1. 先读取已有产品数据中的产品类型
 2060 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 2061 |      */
 2062 |     categoryProducts.forEach((product) => {
 2063 |       if (!product.productTypeId) return;
 2064 | 
 2065 |       if (!optionMap.has(product.productTypeId)) {
 2066 |         optionMap.set(product.productTypeId, {
 2067 |           value: product.productTypeId,
 2068 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2069 |         });
 2070 |       }
 2071 |     });
 2072 | 
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 2080 |       if (!optionMap.has(option.value)) {
 2081 |         optionMap.set(option.value, {
 2082 |           value: option.value,
```

匹配：productTypeId，第 2067 行

```tsx
 2057 |     /*
 2058 |      * 说明：
 2059 |      * 1. 先读取已有产品数据中的产品类型
 2060 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 2061 |      */
 2062 |     categoryProducts.forEach((product) => {
 2063 |       if (!product.productTypeId) return;
 2064 | 
 2065 |       if (!optionMap.has(product.productTypeId)) {
 2066 |         optionMap.set(product.productTypeId, {
 2067 |           value: product.productTypeId,
 2068 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2069 |         });
 2070 |       }
 2071 |     });
 2072 | 
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 2080 |       if (!optionMap.has(option.value)) {
 2081 |         optionMap.set(option.value, {
 2082 |           value: option.value,
 2083 |           label: getLocalizedFilterOptionLabel(option.label, locale),
```

匹配：productTypeId，第 2068 行

```tsx
 2058 |      * 说明：
 2059 |      * 1. 先读取已有产品数据中的产品类型
 2060 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 2061 |      */
 2062 |     categoryProducts.forEach((product) => {
 2063 |       if (!product.productTypeId) return;
 2064 | 
 2065 |       if (!optionMap.has(product.productTypeId)) {
 2066 |         optionMap.set(product.productTypeId, {
 2067 |           value: product.productTypeId,
 2068 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2069 |         });
 2070 |       }
 2071 |     });
 2072 | 
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 2080 |       if (!optionMap.has(option.value)) {
 2081 |         optionMap.set(option.value, {
 2082 |           value: option.value,
 2083 |           label: getLocalizedFilterOptionLabel(option.label, locale),
 2084 |         });
```

匹配：filter，第 2079 行

```tsx
 2069 |         });
 2070 |       }
 2071 |     });
 2072 | 
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 2080 |       if (!optionMap.has(option.value)) {
 2081 |         optionMap.set(option.value, {
 2082 |           value: option.value,
 2083 |           label: getLocalizedFilterOptionLabel(option.label, locale),
 2084 |         });
 2085 |       }
 2086 |     });
 2087 | 
 2088 |     return Array.from(optionMap.values());
 2089 |   }, [activeCategoryId, categoryProducts, locale]);
 2090 | 
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
```

匹配：filter，第 2083 行

```tsx
 2073 |     /*
 2074 |      * 说明：
 2075 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 2076 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 2077 |      * 3. 左侧“产品类型”里也会先显示对应入口
 2078 |      */
 2079 |     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 2080 |       if (!optionMap.has(option.value)) {
 2081 |         optionMap.set(option.value, {
 2082 |           value: option.value,
 2083 |           label: getLocalizedFilterOptionLabel(option.label, locale),
 2084 |         });
 2085 |       }
 2086 |     });
 2087 | 
 2088 |     return Array.from(optionMap.values());
 2089 |   }, [activeCategoryId, categoryProducts, locale]);
 2090 | 
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
```

匹配：productTypeId，第 2092 行

```tsx
 2082 |           value: option.value,
 2083 |           label: getLocalizedFilterOptionLabel(option.label, locale),
 2084 |         });
 2085 |       }
 2086 |     });
 2087 | 
 2088 |     return Array.from(optionMap.values());
 2089 |   }, [activeCategoryId, categoryProducts, locale]);
 2090 | 
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
```

匹配：filter，第 2096 行

```tsx
 2086 |     });
 2087 | 
 2088 |     return Array.from(optionMap.values());
 2089 |   }, [activeCategoryId, categoryProducts, locale]);
 2090 | 
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
```

匹配：productTypeId，第 2097 行

```tsx
 2087 | 
 2088 |     return Array.from(optionMap.values());
 2089 |   }, [activeCategoryId, categoryProducts, locale]);
 2090 | 
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
```

匹配：productTypeId，第 2099 行

```tsx
 2089 |   }, [activeCategoryId, categoryProducts, locale]);
 2090 | 
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
```

匹配：filter、filterLabels，第 2101 行

```tsx
 2091 |   const currentTypeProducts = useMemo(() => {
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
```

匹配：filter、filterLabels、productTypeId，第 2102 行

```tsx
 2092 |     if (!activeProductTypeId) {
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
```

匹配：productTypeId，第 2103 行

```tsx
 2093 |       return categoryProducts;
 2094 |     }
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
```

匹配：filter，第 2105 行

```tsx
 2095 | 
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
```

匹配：filter，第 2106 行

```tsx
 2096 |     return categoryProducts.filter((product) => {
 2097 |       return product.productTypeId === activeProductTypeId;
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
```

匹配：productTypeOptions、typeOptions，第 2108 行

```tsx
 2098 |     });
 2099 |   }, [activeProductTypeId, categoryProducts]);
 2100 | 
 2101 |   const activeFilterLabels = useMemo(() => {
 2102 |     return getVisibleFilterLabels(activeProductTypeId);
 2103 |   }, [activeProductTypeId]);
 2104 | 
 2105 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
```

匹配：productTypeOptions、typeOptions，第 2116 行

```tsx
 2106 |     const groups: ProductSelectionFilterGroup[] = [];
 2107 | 
 2108 |     if (productTypeOptions.length > 0) {
 2109 |       groups.push({
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
```

匹配：filter、filterLabels，第 2120 行

```tsx
 2110 |         key: "productType",
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
```

匹配：filter，第 2121 行

```tsx
 2111 |         title:
 2112 |           activeCategoryId === "fittings" && locale === "zh"
 2113 |             ? "产品种类"
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
```

匹配：filter，第 2124 行

```tsx
 2114 |             : pageText.productTypeLabel,
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
```

匹配：filter，第 2125 行

```tsx
 2115 |         inputType: "single",
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
```

匹配：productTypeId，第 2126 行

```tsx
 2116 |         options: productTypeOptions,
 2117 |       });
 2118 |     }
 2119 | 
 2120 |     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 2121 |       const options = getFilterOptions(
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
```

匹配：filter，第 2132 行

```tsx
 2122 |         currentTypeProducts as any,
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
```

匹配：filter，第 2133 行

```tsx
 2123 | 
 2124 |         (label as any).filterKey,
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
```

匹配：filter，第 2135 行

```tsx
 2125 |         selectedFilters,
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
```

匹配：productTypeId，第 2136 行

```tsx
 2126 |         activeProductTypeId
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
```

匹配：filter，第 2137 行

```tsx
 2127 |       );
 2128 | 
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
```

匹配：filter，第 2139 行

```tsx
 2129 |       if (options.length === 0) return;
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
```

匹配：productTypeId，第 2140 行

```tsx
 2130 | 
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
```

匹配：filter，第 2141 行

```tsx
 2131 |       groups.push({
 2132 |         key: (label as any).filterKey,
 2133 |         title: getText(locale, label.label, (label as any).filterKey),
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
```

匹配：filter，第 2144 行

```tsx
 2134 |         inputType: label.inputType,
 2135 |         layout: getProductFilterGroupLayout(
 2136 |           activeProductTypeId,
 2137 |           (label as any).filterKey as SelectionFilterKey
 2138 |         ),
 2139 |         options: sortHardTubeFilterOptionsForDisplay(
 2140 |           activeProductTypeId,
 2141 |           (label as any).filterKey,
 2142 |           options.map((option) => ({
 2143 |             ...option,
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
 2158 | 
 2159 |     return categoryProducts.filter((product) => {
 2160 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
```

匹配：filter、productTypeOptions、filterLabels、typeOptions、productTypeId，第 2154 行

```tsx
 2144 |             label: getLocalizedFilterOptionLabel(
 2145 |               option.label || option.value,
 2146 |               locale
 2147 |             ),
 2148 |           }))
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
 2158 | 
 2159 |     return categoryProducts.filter((product) => {
 2160 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 2161 |         return false;
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
```

匹配：filter，第 2159 行

```tsx
 2149 |         ),
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
 2158 | 
 2159 |     return categoryProducts.filter((product) => {
 2160 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 2161 |         return false;
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
```

匹配：productTypeId，第 2160 行

```tsx
 2150 |       });
 2151 |     });
 2152 | 
 2153 |     return groups;
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
 2158 | 
 2159 |     return categoryProducts.filter((product) => {
 2160 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 2161 |         return false;
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
 2176 |         );
```

匹配：filter，第 2164 行

```tsx
 2154 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
 2158 | 
 2159 |     return categoryProducts.filter((product) => {
 2160 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 2161 |         return false;
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
 2176 |         );
 2177 |       });
 2178 | 
 2179 |       if (!filterMatched) {
 2180 |         return false;
```

匹配：filter，第 2165 行

```tsx
 2155 | 
 2156 |   const matchedProducts = useMemo(() => {
 2157 |     const keyword = searchKeyword.trim().toLowerCase();
 2158 | 
 2159 |     return categoryProducts.filter((product) => {
 2160 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 2161 |         return false;
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
 2176 |         );
 2177 |       });
 2178 | 
 2179 |       if (!filterMatched) {
 2180 |         return false;
 2181 |       }
```

匹配：filter，第 2171 行

```tsx
 2161 |         return false;
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
 2176 |         );
 2177 |       });
 2178 | 
 2179 |       if (!filterMatched) {
 2180 |         return false;
 2181 |       }
 2182 | 
 2183 |       if (!keyword) {
 2184 |         return true;
 2185 |       }
 2186 | 
 2187 |       const searchText = [
```

匹配：filter，第 2172 行

```tsx
 2162 |       }
 2163 | 
 2164 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 2165 |         const selectedValues = selectedFilters[filterKey];
 2166 | 
 2167 |         if (!selectedValues || selectedValues.size === 0) {
 2168 |           return true;
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
 2176 |         );
 2177 |       });
 2178 | 
 2179 |       if (!filterMatched) {
 2180 |         return false;
 2181 |       }
 2182 | 
 2183 |       if (!keyword) {
 2184 |         return true;
 2185 |       }
 2186 | 
 2187 |       const searchText = [
 2188 |         product.productId,
```

匹配：filter，第 2179 行

```tsx
 2169 |         }
 2170 | 
 2171 |         const value = (product.filters || {})[filterKey];
 2172 |         const productValues = splitFilterValues(value);
 2173 | 
 2174 |         return productValues.some((item) =>
 2175 |           selectedValues.has(item)
 2176 |         );
 2177 |       });
 2178 | 
 2179 |       if (!filterMatched) {
 2180 |         return false;
 2181 |       }
 2182 | 
 2183 |       if (!keyword) {
 2184 |         return true;
 2185 |       }
 2186 | 
 2187 |       const searchText = [
 2188 |         product.productId,
 2189 |         product.categoryId,
 2190 |         product.productTypeId,
 2191 |         product.seriesId,
 2192 |         product.detailSlug,
 2193 |         ((product.cardTitle as any)?.zh || ""),
 2194 |         ((product.cardTitle as any)?.en || ""),
 2195 |         ((product.cardSubtitle as any)?.zh || ""),
```

匹配：productTypeId，第 2190 行

```tsx
 2180 |         return false;
 2181 |       }
 2182 | 
 2183 |       if (!keyword) {
 2184 |         return true;
 2185 |       }
 2186 | 
 2187 |       const searchText = [
 2188 |         product.productId,
 2189 |         product.categoryId,
 2190 |         product.productTypeId,
 2191 |         product.seriesId,
 2192 |         product.detailSlug,
 2193 |         ((product.cardTitle as any)?.zh || ""),
 2194 |         ((product.cardTitle as any)?.en || ""),
 2195 |         ((product.cardSubtitle as any)?.zh || ""),
 2196 |         ((product.cardSubtitle as any)?.en || ""),
 2197 |         ((product.searchKeywords as any)?.zh || ""),
 2198 |         ((product.searchKeywords as any)?.en || ""),
 2199 |         ...Object.values(product.filters || {}),
 2200 |       ]
 2201 |         .filter(Boolean)
 2202 |         .join(" ")
 2203 |         .toLowerCase();
 2204 | 
 2205 |       return searchText.includes(keyword);
 2206 |     });
```

匹配：filter，第 2199 行

```tsx
 2189 |         product.categoryId,
 2190 |         product.productTypeId,
 2191 |         product.seriesId,
 2192 |         product.detailSlug,
 2193 |         ((product.cardTitle as any)?.zh || ""),
 2194 |         ((product.cardTitle as any)?.en || ""),
 2195 |         ((product.cardSubtitle as any)?.zh || ""),
 2196 |         ((product.cardSubtitle as any)?.en || ""),
 2197 |         ((product.searchKeywords as any)?.zh || ""),
 2198 |         ((product.searchKeywords as any)?.en || ""),
 2199 |         ...Object.values(product.filters || {}),
 2200 |       ]
 2201 |         .filter(Boolean)
 2202 |         .join(" ")
 2203 |         .toLowerCase();
 2204 | 
 2205 |       return searchText.includes(keyword);
 2206 |     });
 2207 |   }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);
 2208 | 
 2209 |   /*
 2210 |    * 当前产品种类介绍数据
 2211 |    * 说明：
 2212 |    * 1. 根据当前产品大类和产品类型匹配介绍内容
 2213 |    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 2214 |    * 3. 找不到时不显示横幅
 2215 |    */
```

匹配：filter，第 2201 行

```tsx
 2191 |         product.seriesId,
 2192 |         product.detailSlug,
 2193 |         ((product.cardTitle as any)?.zh || ""),
 2194 |         ((product.cardTitle as any)?.en || ""),
 2195 |         ((product.cardSubtitle as any)?.zh || ""),
 2196 |         ((product.cardSubtitle as any)?.en || ""),
 2197 |         ((product.searchKeywords as any)?.zh || ""),
 2198 |         ((product.searchKeywords as any)?.en || ""),
 2199 |         ...Object.values(product.filters || {}),
 2200 |       ]
 2201 |         .filter(Boolean)
 2202 |         .join(" ")
 2203 |         .toLowerCase();
 2204 | 
 2205 |       return searchText.includes(keyword);
 2206 |     });
 2207 |   }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);
 2208 | 
 2209 |   /*
 2210 |    * 当前产品种类介绍数据
 2211 |    * 说明：
 2212 |    * 1. 根据当前产品大类和产品类型匹配介绍内容
 2213 |    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 2214 |    * 3. 找不到时不显示横幅
 2215 |    */
 2216 |   const activeProductTypeIntro = getProductTypeIntroByIds(
 2217 |     activeCategoryId,
```

匹配：filter、productTypeId，第 2207 行

```tsx
 2197 |         ((product.searchKeywords as any)?.zh || ""),
 2198 |         ((product.searchKeywords as any)?.en || ""),
 2199 |         ...Object.values(product.filters || {}),
 2200 |       ]
 2201 |         .filter(Boolean)
 2202 |         .join(" ")
 2203 |         .toLowerCase();
 2204 | 
 2205 |       return searchText.includes(keyword);
 2206 |     });
 2207 |   }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);
 2208 | 
 2209 |   /*
 2210 |    * 当前产品种类介绍数据
 2211 |    * 说明：
 2212 |    * 1. 根据当前产品大类和产品类型匹配介绍内容
 2213 |    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 2214 |    * 3. 找不到时不显示横幅
 2215 |    */
 2216 |   const activeProductTypeIntro = getProductTypeIntroByIds(
 2217 |     activeCategoryId,
 2218 |     activeProductTypeId
 2219 |   );
 2220 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
```

匹配：productTypeId，第 2218 行

```tsx
 2208 | 
 2209 |   /*
 2210 |    * 当前产品种类介绍数据
 2211 |    * 说明：
 2212 |    * 1. 根据当前产品大类和产品类型匹配介绍内容
 2213 |    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 2214 |    * 3. 找不到时不显示横幅
 2215 |    */
 2216 |   const activeProductTypeIntro = getProductTypeIntroByIds(
 2217 |     activeCategoryId,
 2218 |     activeProductTypeId
 2219 |   );
 2220 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
 2224 |       tags.push({
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
```

匹配：productTypeId，第 2223 行

```tsx
 2213 |    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 2214 |    * 3. 找不到时不显示横幅
 2215 |    */
 2216 |   const activeProductTypeIntro = getProductTypeIntroByIds(
 2217 |     activeCategoryId,
 2218 |     activeProductTypeId
 2219 |   );
 2220 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
 2224 |       tags.push({
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
```

匹配：productTypeId，第 2226 行

```tsx
 2216 |   const activeProductTypeIntro = getProductTypeIntroByIds(
 2217 |     activeCategoryId,
 2218 |     activeProductTypeId
 2219 |   );
 2220 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
 2224 |       tags.push({
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
```

匹配：productTypeOptions、typeOptions，第 2228 行

```tsx
 2218 |     activeProductTypeId
 2219 |   );
 2220 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
 2224 |       tags.push({
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
```

匹配：productTypeId，第 2229 行

```tsx
 2219 |   );
 2220 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
 2224 |       tags.push({
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
```

匹配：productTypeId，第 2231 行

```tsx
 2221 |     const tags: ProductSelectionSelectedTag[] = [];
 2222 | 
 2223 |     if (activeProductTypeId) {
 2224 |       tags.push({
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
 2246 |       });
 2247 |     });
```

匹配：filter，第 2235 行

```tsx
 2225 |         key: "productType",
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
 2246 |       });
 2247 |     });
 2248 | 
 2249 |     return tags;
 2250 |   }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);
 2251 | 
```

匹配：filter，第 2236 行

```tsx
 2226 |         value: activeProductTypeId,
 2227 |         label:
 2228 |           productTypeOptions.find(
 2229 |             (option) => option.value === activeProductTypeId
 2230 |           )?.label ||
 2231 |           getTaxonomyLabel(locale, activeProductTypeId),
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
 2246 |       });
 2247 |     });
 2248 | 
 2249 |     return tags;
 2250 |   }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);
 2251 | 
 2252 |   const totalProductPages = Math.max(
```

匹配：filter，第 2242 行

```tsx
 2232 |       });
 2233 |     }
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
 2246 |       });
 2247 |     });
 2248 | 
 2249 |     return tags;
 2250 |   }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);
 2251 | 
 2252 |   const totalProductPages = Math.max(
 2253 |     1,
 2254 |     Math.ceil(matchedProducts.length / productsPageSize)
 2255 |   );
 2256 | 
 2257 |   const safeCurrentProductPage = Math.min(
 2258 |     currentProductPage,
```

匹配：filter，第 2244 行

```tsx
 2234 | 
 2235 |     FILTER_KEYS.forEach((filterKey) => {
 2236 |       const values = selectedFilters[filterKey];
 2237 | 
 2238 |       if (!values || values.size === 0) return;
 2239 | 
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
 2246 |       });
 2247 |     });
 2248 | 
 2249 |     return tags;
 2250 |   }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);
 2251 | 
 2252 |   const totalProductPages = Math.max(
 2253 |     1,
 2254 |     Math.ceil(matchedProducts.length / productsPageSize)
 2255 |   );
 2256 | 
 2257 |   const safeCurrentProductPage = Math.min(
 2258 |     currentProductPage,
 2259 |     totalProductPages
 2260 |   );
```

匹配：filter、productTypeOptions、typeOptions、productTypeId，第 2250 行

```tsx
 2240 |       values.forEach((value) => {
 2241 |         tags.push({
 2242 |           key: filterKey,
 2243 |           value,
 2244 |           label: getLocalizedFilterOptionLabel(value, locale),
 2245 |         });
 2246 |       });
 2247 |     });
 2248 | 
 2249 |     return tags;
 2250 |   }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);
 2251 | 
 2252 |   const totalProductPages = Math.max(
 2253 |     1,
 2254 |     Math.ceil(matchedProducts.length / productsPageSize)
 2255 |   );
 2256 | 
 2257 |   const safeCurrentProductPage = Math.min(
 2258 |     currentProductPage,
 2259 |     totalProductPages
 2260 |   );
 2261 | 
 2262 |   const pagedProducts = matchedProducts.slice(
 2263 |     (safeCurrentProductPage - 1) * productsPageSize,
 2264 |     safeCurrentProductPage * productsPageSize
 2265 |   );
 2266 | 
```

匹配：productTypeId，第 2292 行

```tsx
 2282 |     const fallbackCategoryId = categoryItems[0]?.id || "pumps";
 2283 |     const preferredCategoryId = requestedCategoryId || initialCategoryId;
 2284 | 
 2285 |     const nextCategoryId =
 2286 |       preferredCategoryId &&
 2287 |       categoryItems.some((category) => category.id === preferredCategoryId)
 2288 |         ? preferredCategoryId
 2289 |         : fallbackCategoryId;
 2290 | 
 2291 |     const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
 2292 |     const preferredProductTypeId =
 2293 |       requestedProductTypeId || initialProductTypeId;
 2294 | 
 2295 |     const productTypeExistsInProducts = Boolean(
 2296 |       preferredProductTypeId &&
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
```

匹配：productTypeId，第 2293 行

```tsx
 2283 |     const preferredCategoryId = requestedCategoryId || initialCategoryId;
 2284 | 
 2285 |     const nextCategoryId =
 2286 |       preferredCategoryId &&
 2287 |       categoryItems.some((category) => category.id === preferredCategoryId)
 2288 |         ? preferredCategoryId
 2289 |         : fallbackCategoryId;
 2290 | 
 2291 |     const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
 2292 |     const preferredProductTypeId =
 2293 |       requestedProductTypeId || initialProductTypeId;
 2294 | 
 2295 |     const productTypeExistsInProducts = Boolean(
 2296 |       preferredProductTypeId &&
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
```

匹配：productTypeId，第 2296 行

```tsx
 2286 |       preferredCategoryId &&
 2287 |       categoryItems.some((category) => category.id === preferredCategoryId)
 2288 |         ? preferredCategoryId
 2289 |         : fallbackCategoryId;
 2290 | 
 2291 |     const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
 2292 |     const preferredProductTypeId =
 2293 |       requestedProductTypeId || initialProductTypeId;
 2294 | 
 2295 |     const productTypeExistsInProducts = Boolean(
 2296 |       preferredProductTypeId &&
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
```

匹配：productTypeId，第 2298 行

```tsx
 2288 |         ? preferredCategoryId
 2289 |         : fallbackCategoryId;
 2290 | 
 2291 |     const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
 2292 |     const preferredProductTypeId =
 2293 |       requestedProductTypeId || initialProductTypeId;
 2294 | 
 2295 |     const productTypeExistsInProducts = Boolean(
 2296 |       preferredProductTypeId &&
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
```

匹配：productTypeId，第 2303 行

```tsx
 2293 |       requestedProductTypeId || initialProductTypeId;
 2294 | 
 2295 |     const productTypeExistsInProducts = Boolean(
 2296 |       preferredProductTypeId &&
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
```

匹配：productTypeId，第 2304 行

```tsx
 2294 | 
 2295 |     const productTypeExistsInProducts = Boolean(
 2296 |       preferredProductTypeId &&
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
```

匹配：productTypeId，第 2307 行

```tsx
 2297 |         categoryProductsForUrl.some(
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
```

匹配：productTypeId，第 2308 行

```tsx
 2298 |           (product) => product.productTypeId === preferredProductTypeId
 2299 |         )
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
```

匹配：productTypeId，第 2310 行

```tsx
 2300 |     );
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
```

匹配：productTypeId，第 2311 行

```tsx
 2301 | 
 2302 |     const productTypeExistsInRouteMap = Boolean(
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
```

匹配：productTypeId，第 2313 行

```tsx
 2303 |       preferredProductTypeId &&
 2304 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2305 |     );
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
```

匹配：productTypeId，第 2316 行

```tsx
 2306 | 
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
```

匹配：filter，第 2317 行

```tsx
 2307 |     const nextProductTypeId =
 2308 |       preferredProductTypeId &&
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
```

匹配：filter、productTypeId，第 2319 行

```tsx
 2309 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
```

匹配：filter，第 2320 行

```tsx
 2310 |         ? preferredProductTypeId
 2311 |         : getFirstProductTypeId(nextCategoryId);
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
```

匹配：productTypeId，第 2322 行

```tsx
 2312 | 
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
```

匹配：filter，第 2323 行

```tsx
 2313 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2314 | 
 2315 |     setActiveCategoryId(nextCategoryId);
 2316 |     setActiveProductTypeId(nextProductTypeId);
 2317 |     setSelectedFilters(
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
```

匹配：filter，第 2328 行

```tsx
 2318 |       hasQuerySelection
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
```

匹配：filter、productTypeId，第 2329 行

```tsx
 2319 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2320 |         : getInitialSelectedFilters(
 2321 |             nextCategoryId,
 2322 |             nextProductTypeId,
 2323 |             initialFilters
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
```

匹配：productTypeId，第 2334 行

```tsx
 2324 |           )
 2325 |     );
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
```

匹配：productTypeId，第 2336 行

```tsx
 2326 |     setSearchKeyword("");
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
```

匹配：filter，第 2337 行

```tsx
 2327 |     setMobileCategoryOpen(false);
 2328 |     setMobileOpenFilterGroups(
 2329 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2330 |     );
 2331 |   }, [
 2332 |     categoryItems,
 2333 |     requestedCategoryId,
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
```

匹配：productTypeId，第 2344 行

```tsx
 2334 |     requestedProductTypeId,
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
```

匹配：filter，第 2345 行

```tsx
 2335 |     initialCategoryId,
 2336 |     initialProductTypeId,
 2337 |     initialFilters,
 2338 |   ]);
 2339 | 
 2340 |   useEffect(() => {
 2341 |     setCurrentProductPage(1);
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
```

匹配：filter，第 2352 行

```tsx
 2342 |   }, [
 2343 |     activeCategoryId,
 2344 |     activeProductTypeId,
 2345 |     selectedFilters,
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
```

匹配：filter，第 2356 行

```tsx
 2346 |     searchKeyword,
 2347 |     productsPageSize,
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
```

匹配：filter，第 2358 行

```tsx
 2348 |   ]);
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
```

匹配：filter，第 2359 行

```tsx
 2349 |   /*
 2350 |    * 筛选项联动后的自动清理：
 2351 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2352 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
```

匹配：filter，第 2363 行

```tsx
 2353 |    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
```

匹配：filter，第 2364 行

```tsx
 2354 |    */
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
```

匹配：filter，第 2365 行

```tsx
 2355 |   useEffect(() => {
 2356 |     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 2357 | 
 2358 |     filterGroups.forEach((group) => {
 2359 |       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
```

匹配：filter，第 2370 行

```tsx
 2360 |         return;
 2361 |       }
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
```

匹配：filter，第 2372 行

```tsx
 2362 | 
 2363 |       const filterKey = group.key as SelectionFilterKey;
 2364 |       allowedValuesByFilterKey.set(
 2365 |         filterKey,
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
 2387 |           changed = true;
 2388 |           return;
```

匹配：filter，第 2376 行

```tsx
 2366 |         new Set(group.options.map((option) => option.value))
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
 2387 |           changed = true;
 2388 |           return;
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
```

匹配：filter，第 2377 行

```tsx
 2367 |       );
 2368 |     });
 2369 | 
 2370 |     setSelectedFilters((current) => {
 2371 |       let changed = false;
 2372 |       const next: SelectedFilterMap = {
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
 2387 |           changed = true;
 2388 |           return;
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
 2393 |         );
```

匹配：filter，第 2383 行

```tsx
 2373 |         ...current,
 2374 |       };
 2375 | 
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
 2387 |           changed = true;
 2388 |           return;
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
 2393 |         );
 2394 | 
 2395 |         if (validValues.length !== currentValues.size) {
 2396 |           if (validValues.length > 0) {
 2397 |             next[filterKey] = new Set(validValues);
 2398 |           } else {
 2399 |             delete next[filterKey];
```

匹配：filter，第 2386 行

```tsx
 2376 |       FILTER_KEYS.forEach((filterKey) => {
 2377 |         const currentValues = next[filterKey];
 2378 | 
 2379 |         if (!currentValues || currentValues.size === 0) {
 2380 |           return;
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
 2387 |           changed = true;
 2388 |           return;
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
 2393 |         );
 2394 | 
 2395 |         if (validValues.length !== currentValues.size) {
 2396 |           if (validValues.length > 0) {
 2397 |             next[filterKey] = new Set(validValues);
 2398 |           } else {
 2399 |             delete next[filterKey];
 2400 |           }
 2401 | 
 2402 |           changed = true;
```

匹配：filter，第 2391 行

```tsx
 2381 |         }
 2382 | 
 2383 |         const allowedValues = allowedValuesByFilterKey.get(filterKey);
 2384 | 
 2385 |         if (!allowedValues || allowedValues.size === 0) {
 2386 |           delete next[filterKey];
 2387 |           changed = true;
 2388 |           return;
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
 2393 |         );
 2394 | 
 2395 |         if (validValues.length !== currentValues.size) {
 2396 |           if (validValues.length > 0) {
 2397 |             next[filterKey] = new Set(validValues);
 2398 |           } else {
 2399 |             delete next[filterKey];
 2400 |           }
 2401 | 
 2402 |           changed = true;
 2403 |         }
 2404 |       });
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
```

匹配：filter，第 2397 行

```tsx
 2387 |           changed = true;
 2388 |           return;
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
 2393 |         );
 2394 | 
 2395 |         if (validValues.length !== currentValues.size) {
 2396 |           if (validValues.length > 0) {
 2397 |             next[filterKey] = new Set(validValues);
 2398 |           } else {
 2399 |             delete next[filterKey];
 2400 |           }
 2401 | 
 2402 |           changed = true;
 2403 |         }
 2404 |       });
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
```

匹配：filter，第 2399 行

```tsx
 2389 |         }
 2390 | 
 2391 |         const validValues = Array.from(currentValues).filter((value) =>
 2392 |           allowedValues.has(value)
 2393 |         );
 2394 | 
 2395 |         if (validValues.length !== currentValues.size) {
 2396 |           if (validValues.length > 0) {
 2397 |             next[filterKey] = new Set(validValues);
 2398 |           } else {
 2399 |             delete next[filterKey];
 2400 |           }
 2401 | 
 2402 |           changed = true;
 2403 |         }
 2404 |       });
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
```

匹配：filter，第 2408 行

```tsx
 2398 |           } else {
 2399 |             delete next[filterKey];
 2400 |           }
 2401 | 
 2402 |           changed = true;
 2403 |         }
 2404 |       });
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
```

匹配：productTypeId，第 2411 行

```tsx
 2401 | 
 2402 |           changed = true;
 2403 |         }
 2404 |       });
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
```

匹配：productTypeId，第 2414 行

```tsx
 2404 |       });
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
```

匹配：filter、productTypeId，第 2415 行

```tsx
 2405 | 
 2406 |       return changed ? next : current;
 2407 |     });
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
 2431 |      * 1. 点击产品类型时，优先跳转正式 URL
```

匹配：filter、productTypeId，第 2418 行

```tsx
 2408 |   }, [filterGroups]);
 2409 | 
 2410 |   function handleCategoryChange(categoryId: string) {
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
 2431 |      * 1. 点击产品类型时，优先跳转正式 URL
 2432 |      * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
 2433 |      * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
 2434 |      */
```

匹配：filter，第 2421 行

```tsx
 2411 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
 2431 |      * 1. 点击产品类型时，优先跳转正式 URL
 2432 |      * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
 2433 |      * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
 2434 |      */
 2435 |     const productTypeHref = getProductTypeHrefByIds(
 2436 |       activeCategoryId,
 2437 |       productTypeId
```

匹配：filter，第 2422 行

```tsx
 2412 | 
 2413 |     setActiveCategoryId(categoryId);
 2414 |     setActiveProductTypeId(firstProductTypeId);
 2415 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2416 |     setSearchKeyword("");
 2417 |     setMobileCategoryOpen(false);
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
 2431 |      * 1. 点击产品类型时，优先跳转正式 URL
 2432 |      * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
 2433 |      * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
 2434 |      */
 2435 |     const productTypeHref = getProductTypeHrefByIds(
 2436 |       activeCategoryId,
 2437 |       productTypeId
 2438 |     );
```

匹配：productTypeId，第 2428 行

```tsx
 2418 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2419 |   }
 2420 | 
 2421 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2422 |     setMobileOpenFilterGroups((current) => ({
 2423 |       ...current,
 2424 |       [key]: !current[key],
 2425 |     }));
 2426 |   }
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
 2431 |      * 1. 点击产品类型时，优先跳转正式 URL
 2432 |      * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
 2433 |      * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
 2434 |      */
 2435 |     const productTypeHref = getProductTypeHrefByIds(
 2436 |       activeCategoryId,
 2437 |       productTypeId
 2438 |     );
 2439 | 
 2440 |     if (productTypeHref) {
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
```

匹配：productTypeId，第 2437 行

```tsx
 2427 | 
 2428 |   function handleProductTypeChange(productTypeId: string) {
 2429 |     /*
 2430 |      * 说明：
 2431 |      * 1. 点击产品类型时，优先跳转正式 URL
 2432 |      * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
 2433 |      * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
 2434 |      */
 2435 |     const productTypeHref = getProductTypeHrefByIds(
 2436 |       activeCategoryId,
 2437 |       productTypeId
 2438 |     );
 2439 | 
 2440 |     if (productTypeHref) {
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
 2445 |     setActiveProductTypeId(productTypeId);
 2446 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2447 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2448 |   }
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
```

匹配：productTypeId，第 2445 行

```tsx
 2435 |     const productTypeHref = getProductTypeHrefByIds(
 2436 |       activeCategoryId,
 2437 |       productTypeId
 2438 |     );
 2439 | 
 2440 |     if (productTypeHref) {
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
 2445 |     setActiveProductTypeId(productTypeId);
 2446 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2447 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2448 |   }
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
 2454 |     /*
 2455 |      * 说明：
 2456 |      * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
 2457 |      * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
 2458 |      * 3. 系列点击改为：
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
```

匹配：filter、productTypeId，第 2446 行

```tsx
 2436 |       activeCategoryId,
 2437 |       productTypeId
 2438 |     );
 2439 | 
 2440 |     if (productTypeHref) {
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
 2445 |     setActiveProductTypeId(productTypeId);
 2446 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2447 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2448 |   }
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
 2454 |     /*
 2455 |      * 说明：
 2456 |      * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
 2457 |      * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
 2458 |      * 3. 系列点击改为：
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
 2462 |      * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
```

匹配：filter、productTypeId，第 2447 行

```tsx
 2437 |       productTypeId
 2438 |     );
 2439 | 
 2440 |     if (productTypeHref) {
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
 2445 |     setActiveProductTypeId(productTypeId);
 2446 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2447 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2448 |   }
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
 2454 |     /*
 2455 |      * 说明：
 2456 |      * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
 2457 |      * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
 2458 |      * 3. 系列点击改为：
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
 2462 |      * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
 2463 |      */
```

匹配：filter，第 2450 行

```tsx
 2440 |     if (productTypeHref) {
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
 2445 |     setActiveProductTypeId(productTypeId);
 2446 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2447 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2448 |   }
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
 2454 |     /*
 2455 |      * 说明：
 2456 |      * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
 2457 |      * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
 2458 |      * 3. 系列点击改为：
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
 2462 |      * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
 2463 |      */
 2464 |     if (group.key === "productType") {
 2465 |       handleProductTypeChange(value);
 2466 |       return;
```

匹配：filter，第 2451 行

```tsx
 2441 |       router.push(productTypeHref);
 2442 |       return;
 2443 |     }
 2444 | 
 2445 |     setActiveProductTypeId(productTypeId);
 2446 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2447 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2448 |   }
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
 2454 |     /*
 2455 |      * 说明：
 2456 |      * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
 2457 |      * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
 2458 |      * 3. 系列点击改为：
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
 2462 |      * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
 2463 |      */
 2464 |     if (group.key === "productType") {
 2465 |       handleProductTypeChange(value);
 2466 |       return;
 2467 |     }
```

匹配：filter，第 2459 行

```tsx
 2449 | 
 2450 |   function handleFilterChange(
 2451 |     group: ProductSelectionFilterGroup,
 2452 |     value: string
 2453 |   ) {
 2454 |     /*
 2455 |      * 说明：
 2456 |      * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
 2457 |      * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
 2458 |      * 3. 系列点击改为：
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
 2462 |      * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
 2463 |      */
 2464 |     if (group.key === "productType") {
 2465 |       handleProductTypeChange(value);
 2466 |       return;
 2467 |     }
 2468 | 
 2469 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2470 |       return;
 2471 |     }
 2472 | 
 2473 |     const filterKey = group.key as SelectionFilterKey;
 2474 | 
 2475 |     /*
```

匹配：filter，第 2469 行

```tsx
 2459 |      *    - 原地更新 selectedFilters
 2460 |      *    - 用 window.history.pushState 同步地址栏
 2461 |      *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
 2462 |      * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
 2463 |      */
 2464 |     if (group.key === "productType") {
 2465 |       handleProductTypeChange(value);
 2466 |       return;
 2467 |     }
 2468 | 
 2469 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2470 |       return;
 2471 |     }
 2472 | 
 2473 |     const filterKey = group.key as SelectionFilterKey;
 2474 | 
 2475 |     /*
 2476 |      * 说明：
 2477 |      * 1. 先判断当前筛选项是否命中正式系列路由
 2478 |      * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
 2479 |      * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
 2480 |      */
 2481 |     const seriesHref = getSeriesHrefByFilterValue(
 2482 |       activeCategoryId,
 2483 |       activeProductTypeId,
 2484 |       group.key,
 2485 |       value
```

匹配：filter，第 2473 行

```tsx
 2463 |      */
 2464 |     if (group.key === "productType") {
 2465 |       handleProductTypeChange(value);
 2466 |       return;
 2467 |     }
 2468 | 
 2469 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2470 |       return;
 2471 |     }
 2472 | 
 2473 |     const filterKey = group.key as SelectionFilterKey;
 2474 | 
 2475 |     /*
 2476 |      * 说明：
 2477 |      * 1. 先判断当前筛选项是否命中正式系列路由
 2478 |      * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
 2479 |      * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
 2480 |      */
 2481 |     const seriesHref = getSeriesHrefByFilterValue(
 2482 |       activeCategoryId,
 2483 |       activeProductTypeId,
 2484 |       group.key,
 2485 |       value
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
```

匹配：filter，第 2481 行

```tsx
 2471 |     }
 2472 | 
 2473 |     const filterKey = group.key as SelectionFilterKey;
 2474 | 
 2475 |     /*
 2476 |      * 说明：
 2477 |      * 1. 先判断当前筛选项是否命中正式系列路由
 2478 |      * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
 2479 |      * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
 2480 |      */
 2481 |     const seriesHref = getSeriesHrefByFilterValue(
 2482 |       activeCategoryId,
 2483 |       activeProductTypeId,
 2484 |       group.key,
 2485 |       value
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2490 |       const productTypeHref = getProductTypeHrefByIds(
 2491 |         activeCategoryId,
 2492 |         activeProductTypeId
 2493 |       );
 2494 | 
 2495 |       setSelectedFilters((current) => {
 2496 |         const next: SelectedFilterMap = {
 2497 |           ...current,
```

匹配：productTypeId，第 2483 行

```tsx
 2473 |     const filterKey = group.key as SelectionFilterKey;
 2474 | 
 2475 |     /*
 2476 |      * 说明：
 2477 |      * 1. 先判断当前筛选项是否命中正式系列路由
 2478 |      * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
 2479 |      * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
 2480 |      */
 2481 |     const seriesHref = getSeriesHrefByFilterValue(
 2482 |       activeCategoryId,
 2483 |       activeProductTypeId,
 2484 |       group.key,
 2485 |       value
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2490 |       const productTypeHref = getProductTypeHrefByIds(
 2491 |         activeCategoryId,
 2492 |         activeProductTypeId
 2493 |       );
 2494 | 
 2495 |       setSelectedFilters((current) => {
 2496 |         const next: SelectedFilterMap = {
 2497 |           ...current,
 2498 |         };
 2499 | 
```

匹配：filter，第 2489 行

```tsx
 2479 |      * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
 2480 |      */
 2481 |     const seriesHref = getSeriesHrefByFilterValue(
 2482 |       activeCategoryId,
 2483 |       activeProductTypeId,
 2484 |       group.key,
 2485 |       value
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2490 |       const productTypeHref = getProductTypeHrefByIds(
 2491 |         activeCategoryId,
 2492 |         activeProductTypeId
 2493 |       );
 2494 | 
 2495 |       setSelectedFilters((current) => {
 2496 |         const next: SelectedFilterMap = {
 2497 |           ...current,
 2498 |         };
 2499 | 
 2500 |         /*
 2501 |          * 说明：
 2502 |          * 系列筛选属于单选逻辑：
 2503 |          * - 选择 EA 时，不再同时保留 SM / TM
 2504 |          * - 选择 SM 时，不再同时保留 EA / TM
 2505 |          * - 再次点击已选中的系列，则取消选择
```

匹配：productTypeId，第 2492 行

```tsx
 2482 |       activeCategoryId,
 2483 |       activeProductTypeId,
 2484 |       group.key,
 2485 |       value
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2490 |       const productTypeHref = getProductTypeHrefByIds(
 2491 |         activeCategoryId,
 2492 |         activeProductTypeId
 2493 |       );
 2494 | 
 2495 |       setSelectedFilters((current) => {
 2496 |         const next: SelectedFilterMap = {
 2497 |           ...current,
 2498 |         };
 2499 | 
 2500 |         /*
 2501 |          * 说明：
 2502 |          * 系列筛选属于单选逻辑：
 2503 |          * - 选择 EA 时，不再同时保留 SM / TM
 2504 |          * - 选择 SM 时，不再同时保留 EA / TM
 2505 |          * - 再次点击已选中的系列，则取消选择
 2506 |          */
 2507 |         if (isAlreadySelected) {
 2508 |           delete next[filterKey];
```

匹配：filter，第 2495 行

```tsx
 2485 |       value
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2490 |       const productTypeHref = getProductTypeHrefByIds(
 2491 |         activeCategoryId,
 2492 |         activeProductTypeId
 2493 |       );
 2494 | 
 2495 |       setSelectedFilters((current) => {
 2496 |         const next: SelectedFilterMap = {
 2497 |           ...current,
 2498 |         };
 2499 | 
 2500 |         /*
 2501 |          * 说明：
 2502 |          * 系列筛选属于单选逻辑：
 2503 |          * - 选择 EA 时，不再同时保留 SM / TM
 2504 |          * - 选择 SM 时，不再同时保留 EA / TM
 2505 |          * - 再次点击已选中的系列，则取消选择
 2506 |          */
 2507 |         if (isAlreadySelected) {
 2508 |           delete next[filterKey];
 2509 |         } else {
 2510 |           next[filterKey] = new Set([value]);
 2511 |         }
```

匹配：filter，第 2496 行

```tsx
 2486 |     );
 2487 | 
 2488 |     if (seriesHref) {
 2489 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2490 |       const productTypeHref = getProductTypeHrefByIds(
 2491 |         activeCategoryId,
 2492 |         activeProductTypeId
 2493 |       );
 2494 | 
 2495 |       setSelectedFilters((current) => {
 2496 |         const next: SelectedFilterMap = {
 2497 |           ...current,
 2498 |         };
 2499 | 
 2500 |         /*
 2501 |          * 说明：
 2502 |          * 系列筛选属于单选逻辑：
 2503 |          * - 选择 EA 时，不再同时保留 SM / TM
 2504 |          * - 选择 SM 时，不再同时保留 EA / TM
 2505 |          * - 再次点击已选中的系列，则取消选择
 2506 |          */
 2507 |         if (isAlreadySelected) {
 2508 |           delete next[filterKey];
 2509 |         } else {
 2510 |           next[filterKey] = new Set([value]);
 2511 |         }
 2512 | 
```

匹配：filter，第 2508 行

```tsx
 2498 |         };
 2499 | 
 2500 |         /*
 2501 |          * 说明：
 2502 |          * 系列筛选属于单选逻辑：
 2503 |          * - 选择 EA 时，不再同时保留 SM / TM
 2504 |          * - 选择 SM 时，不再同时保留 EA / TM
 2505 |          * - 再次点击已选中的系列，则取消选择
 2506 |          */
 2507 |         if (isAlreadySelected) {
 2508 |           delete next[filterKey];
 2509 |         } else {
 2510 |           next[filterKey] = new Set([value]);
 2511 |         }
 2512 | 
 2513 |         return next;
 2514 |       });
 2515 | 
 2516 |       /*
 2517 |        * 说明：
 2518 |        * 1. 选中系列时，同步到三级 URL
 2519 |        * 2. 取消系列时，回到二级产品类型 URL
 2520 |        * 3. 使用 pushState 不触发 Next 路由跳转，页面不会明显跳动
 2521 |        */
 2522 |       const nextHref = isAlreadySelected
 2523 |         ? productTypeHref
 2524 |         : seriesHref;
```

匹配：filter，第 2510 行

```tsx
 2500 |         /*
 2501 |          * 说明：
 2502 |          * 系列筛选属于单选逻辑：
 2503 |          * - 选择 EA 时，不再同时保留 SM / TM
 2504 |          * - 选择 SM 时，不再同时保留 EA / TM
 2505 |          * - 再次点击已选中的系列，则取消选择
 2506 |          */
 2507 |         if (isAlreadySelected) {
 2508 |           delete next[filterKey];
 2509 |         } else {
 2510 |           next[filterKey] = new Set([value]);
 2511 |         }
 2512 | 
 2513 |         return next;
 2514 |       });
 2515 | 
 2516 |       /*
 2517 |        * 说明：
 2518 |        * 1. 选中系列时，同步到三级 URL
 2519 |        * 2. 取消系列时，回到二级产品类型 URL
 2520 |        * 3. 使用 pushState 不触发 Next 路由跳转，页面不会明显跳动
 2521 |        */
 2522 |       const nextHref = isAlreadySelected
 2523 |         ? productTypeHref
 2524 |         : seriesHref;
 2525 | 
 2526 |       if (nextHref) {
```

匹配：filter，第 2541 行

```tsx
 2531 |         window.history.pushState(null, "", normalizedHref);
 2532 |       }
 2533 | 
 2534 |       return;
 2535 |     }
 2536 | 
 2537 |     /*
 2538 |      * 说明：
 2539 |      * 普通筛选项仍然走前端筛选，不改 URL。
 2540 |      */
 2541 |     setSelectedFilters((current) => {
 2542 |       const next: SelectedFilterMap = {
 2543 |         ...current,
 2544 |       };
 2545 | 
 2546 |       const values = new Set(next[filterKey] || []);
 2547 |       const shouldSelect = !values.has(value);
 2548 | 
 2549 |       if (group.inputType === "single") {
 2550 |         values.clear();
 2551 |       }
 2552 | 
 2553 |       if (shouldSelect) {
 2554 |         values.add(value);
 2555 |       } else {
 2556 |         values.delete(value);
 2557 |       }
```

匹配：filter，第 2542 行

```tsx
 2532 |       }
 2533 | 
 2534 |       return;
 2535 |     }
 2536 | 
 2537 |     /*
 2538 |      * 说明：
 2539 |      * 普通筛选项仍然走前端筛选，不改 URL。
 2540 |      */
 2541 |     setSelectedFilters((current) => {
 2542 |       const next: SelectedFilterMap = {
 2543 |         ...current,
 2544 |       };
 2545 | 
 2546 |       const values = new Set(next[filterKey] || []);
 2547 |       const shouldSelect = !values.has(value);
 2548 | 
 2549 |       if (group.inputType === "single") {
 2550 |         values.clear();
 2551 |       }
 2552 | 
 2553 |       if (shouldSelect) {
 2554 |         values.add(value);
 2555 |       } else {
 2556 |         values.delete(value);
 2557 |       }
 2558 | 
```

匹配：filter，第 2546 行

```tsx
 2536 | 
 2537 |     /*
 2538 |      * 说明：
 2539 |      * 普通筛选项仍然走前端筛选，不改 URL。
 2540 |      */
 2541 |     setSelectedFilters((current) => {
 2542 |       const next: SelectedFilterMap = {
 2543 |         ...current,
 2544 |       };
 2545 | 
 2546 |       const values = new Set(next[filterKey] || []);
 2547 |       const shouldSelect = !values.has(value);
 2548 | 
 2549 |       if (group.inputType === "single") {
 2550 |         values.clear();
 2551 |       }
 2552 | 
 2553 |       if (shouldSelect) {
 2554 |         values.add(value);
 2555 |       } else {
 2556 |         values.delete(value);
 2557 |       }
 2558 | 
 2559 |       if (values.size === 0) {
 2560 |         delete next[filterKey];
 2561 |       } else {
 2562 |         next[filterKey] = values;
```

匹配：filter，第 2560 行

```tsx
 2550 |         values.clear();
 2551 |       }
 2552 | 
 2553 |       if (shouldSelect) {
 2554 |         values.add(value);
 2555 |       } else {
 2556 |         values.delete(value);
 2557 |       }
 2558 | 
 2559 |       if (values.size === 0) {
 2560 |         delete next[filterKey];
 2561 |       } else {
 2562 |         next[filterKey] = values;
 2563 |       }
 2564 | 
 2565 |       return next;
 2566 |     });
 2567 |   }
 2568 | 
 2569 | /* BARBED_PORT_OPTION_DISABLED_START */
 2570 | 
 2571 | 
 2572 | function isBarbedPortOptionDisabled(
 2573 | 
 2574 |   group: ProductSelectionFilterGroup,
 2575 | 
 2576 |   value: string
```

匹配：filter，第 2562 行

```tsx
 2552 | 
 2553 |       if (shouldSelect) {
 2554 |         values.add(value);
 2555 |       } else {
 2556 |         values.delete(value);
 2557 |       }
 2558 | 
 2559 |       if (values.size === 0) {
 2560 |         delete next[filterKey];
 2561 |       } else {
 2562 |         next[filterKey] = values;
 2563 |       }
 2564 | 
 2565 |       return next;
 2566 |     });
 2567 |   }
 2568 | 
 2569 | /* BARBED_PORT_OPTION_DISABLED_START */
 2570 | 
 2571 | 
 2572 | function isBarbedPortOptionDisabled(
 2573 | 
 2574 |   group: ProductSelectionFilterGroup,
 2575 | 
 2576 |   value: string
 2577 | 
 2578 | ) {
```

匹配：filter，第 2574 行

```tsx
 2564 | 
 2565 |       return next;
 2566 |     });
 2567 |   }
 2568 | 
 2569 | /* BARBED_PORT_OPTION_DISABLED_START */
 2570 | 
 2571 | 
 2572 | function isBarbedPortOptionDisabled(
 2573 | 
 2574 |   group: ProductSelectionFilterGroup,
 2575 | 
 2576 |   value: string
 2577 | 
 2578 | ) {
 2579 | 
 2580 |   if (
 2581 | 
 2582 |     activeProductTypeId !==
 2583 | 
 2584 |     "barbed-fittings"
 2585 | 
 2586 |   ) {
 2587 | 
 2588 |     return false;
 2589 | 
 2590 |   }
```

匹配：productTypeId，第 2582 行

```tsx
 2572 | function isBarbedPortOptionDisabled(
 2573 | 
 2574 |   group: ProductSelectionFilterGroup,
 2575 | 
 2576 |   value: string
 2577 | 
 2578 | ) {
 2579 | 
 2580 |   if (
 2581 | 
 2582 |     activeProductTypeId !==
 2583 | 
 2584 |     "barbed-fittings"
 2585 | 
 2586 |   ) {
 2587 | 
 2588 |     return false;
 2589 | 
 2590 |   }
 2591 | 
 2592 | 
 2593 |   if (
 2594 | 
 2595 |     group.key !== "filter02" &&
 2596 | 
 2597 |     group.key !== "filter03" &&
 2598 | 
```

匹配：filter，第 2595 行

```tsx
 2585 | 
 2586 |   ) {
 2587 | 
 2588 |     return false;
 2589 | 
 2590 |   }
 2591 | 
 2592 | 
 2593 |   if (
 2594 | 
 2595 |     group.key !== "filter02" &&
 2596 | 
 2597 |     group.key !== "filter03" &&
 2598 | 
 2599 |     group.key !== "filter04"
 2600 | 
 2601 |   ) {
 2602 | 
 2603 |     return false;
 2604 | 
 2605 |   }
 2606 | 
 2607 | 
 2608 |   const candidateKey =
 2609 | 
 2610 |     group.key as SelectionFilterKey;
 2611 | 
```

匹配：filter，第 2597 行

```tsx
 2587 | 
 2588 |     return false;
 2589 | 
 2590 |   }
 2591 | 
 2592 | 
 2593 |   if (
 2594 | 
 2595 |     group.key !== "filter02" &&
 2596 | 
 2597 |     group.key !== "filter03" &&
 2598 | 
 2599 |     group.key !== "filter04"
 2600 | 
 2601 |   ) {
 2602 | 
 2603 |     return false;
 2604 | 
 2605 |   }
 2606 | 
 2607 | 
 2608 |   const candidateKey =
 2609 | 
 2610 |     group.key as SelectionFilterKey;
 2611 | 
 2612 | 
 2613 |   /*
```

匹配：filter，第 2599 行

```tsx
 2589 | 
 2590 |   }
 2591 | 
 2592 | 
 2593 |   if (
 2594 | 
 2595 |     group.key !== "filter02" &&
 2596 | 
 2597 |     group.key !== "filter03" &&
 2598 | 
 2599 |     group.key !== "filter04"
 2600 | 
 2601 |   ) {
 2602 | 
 2603 |     return false;
 2604 | 
 2605 |   }
 2606 | 
 2607 | 
 2608 |   const candidateKey =
 2609 | 
 2610 |     group.key as SelectionFilterKey;
 2611 | 
 2612 | 
 2613 |   /*
 2614 | 
 2615 |    * 当前已经选中的值不能禁用，
```

匹配：filter，第 2610 行

```tsx
 2600 | 
 2601 |   ) {
 2602 | 
 2603 |     return false;
 2604 | 
 2605 |   }
 2606 | 
 2607 | 
 2608 |   const candidateKey =
 2609 | 
 2610 |     group.key as SelectionFilterKey;
 2611 | 
 2612 | 
 2613 |   /*
 2614 | 
 2615 |    * 当前已经选中的值不能禁用，
 2616 | 
 2617 |    * 保留再次点击取消的能力。
 2618 | 
 2619 |    */
 2620 | 
 2621 |   if (
 2622 | 
 2623 |     selectedFilters[
 2624 | 
 2625 |       candidateKey
 2626 | 
```

匹配：filter，第 2623 行

```tsx
 2613 |   /*
 2614 | 
 2615 |    * 当前已经选中的值不能禁用，
 2616 | 
 2617 |    * 保留再次点击取消的能力。
 2618 | 
 2619 |    */
 2620 | 
 2621 |   if (
 2622 | 
 2623 |     selectedFilters[
 2624 | 
 2625 |       candidateKey
 2626 | 
 2627 |     ]?.has(value)
 2628 | 
 2629 |   ) {
 2630 | 
 2631 |     return false;
 2632 | 
 2633 |   }
 2634 | 
 2635 | 
 2636 |   /*
 2637 | 
 2638 |    * 顺序联动：
 2639 | 
```

匹配：filter，第 2652 行

```tsx
 2642 |    * 内径1不受内径2、3反向影响；
 2643 | 
 2644 |    * 内径2受内径1影响；
 2645 | 
 2646 |    * 内径3受内径1、2影响。
 2647 | 
 2648 |    */
 2649 | 
 2650 |   const dependencyMap: Record<
 2651 | 
 2652 |     "filter02" |
 2653 | 
 2654 |     "filter03" |
 2655 | 
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
```

匹配：filter，第 2654 行

```tsx
 2644 |    * 内径2受内径1影响；
 2645 | 
 2646 |    * 内径3受内径1、2影响。
 2647 | 
 2648 |    */
 2649 | 
 2650 |   const dependencyMap: Record<
 2651 | 
 2652 |     "filter02" |
 2653 | 
 2654 |     "filter03" |
 2655 | 
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
```

匹配：filter，第 2656 行

```tsx
 2646 |    * 内径3受内径1、2影响。
 2647 | 
 2648 |    */
 2649 | 
 2650 |   const dependencyMap: Record<
 2651 | 
 2652 |     "filter02" |
 2653 | 
 2654 |     "filter03" |
 2655 | 
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
```

匹配：filter，第 2658 行

```tsx
 2648 |    */
 2649 | 
 2650 |   const dependencyMap: Record<
 2651 | 
 2652 |     "filter02" |
 2653 | 
 2654 |     "filter03" |
 2655 | 
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
```

匹配：filter，第 2662 行

```tsx
 2652 |     "filter02" |
 2653 | 
 2654 |     "filter03" |
 2655 | 
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
```

匹配：filter，第 2664 行

```tsx
 2654 |     "filter03" |
 2655 | 
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
```

匹配：filter，第 2666 行

```tsx
 2656 |     "filter04",
 2657 | 
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
```

匹配：filter，第 2668 行

```tsx
 2658 |     SelectionFilterKey[]
 2659 | 
 2660 |   > = {
 2661 | 
 2662 |     filter02: [
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
```

匹配：filter，第 2673 行

```tsx
 2663 | 
 2664 |       "filter01",
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
```

匹配：filter，第 2675 行

```tsx
 2665 | 
 2666 |       "filter05",
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
```

匹配：filter，第 2677 行

```tsx
 2667 | 
 2668 |       "filter06",
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
```

匹配：filter，第 2679 行

```tsx
 2669 | 
 2670 |     ],
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
```

匹配：filter，第 2681 行

```tsx
 2671 | 
 2672 | 
 2673 |     filter03: [
 2674 | 
 2675 |       "filter01",
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
```

匹配：filter，第 2686 行

```tsx
 2676 | 
 2677 |       "filter02",
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
 2698 |     ],
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
```

匹配：filter，第 2688 行

```tsx
 2678 | 
 2679 |       "filter05",
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
 2698 |     ],
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
```

匹配：filter，第 2690 行

```tsx
 2680 | 
 2681 |       "filter06",
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
 2698 |     ],
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
```

匹配：filter，第 2692 行

```tsx
 2682 | 
 2683 |     ],
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
 2698 |     ],
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
 2707 |       candidateKey as
 2708 | 
```

匹配：filter，第 2694 行

```tsx
 2684 | 
 2685 | 
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
 2698 |     ],
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
 2707 |       candidateKey as
 2708 | 
 2709 |         | "filter02"
 2710 | 
```

匹配：filter，第 2696 行

```tsx
 2686 |     filter04: [
 2687 | 
 2688 |       "filter01",
 2689 | 
 2690 |       "filter02",
 2691 | 
 2692 |       "filter03",
 2693 | 
 2694 |       "filter05",
 2695 | 
 2696 |       "filter06",
 2697 | 
 2698 |     ],
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
 2707 |       candidateKey as
 2708 | 
 2709 |         | "filter02"
 2710 | 
 2711 |         | "filter03"
 2712 | 
```

匹配：filter，第 2709 行

```tsx
 2699 | 
 2700 |   };
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
 2707 |       candidateKey as
 2708 | 
 2709 |         | "filter02"
 2710 | 
 2711 |         | "filter03"
 2712 | 
 2713 |         | "filter04"
 2714 | 
 2715 |     ];
 2716 | 
 2717 | 
 2718 |   const hasMatchingProduct =
 2719 | 
 2720 |     currentTypeProducts.some(
 2721 | 
 2722 |       (product) => {
 2723 | 
 2724 |         const candidateValues =
 2725 | 
```

匹配：filter，第 2711 行

```tsx
 2701 | 
 2702 | 
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
 2707 |       candidateKey as
 2708 | 
 2709 |         | "filter02"
 2710 | 
 2711 |         | "filter03"
 2712 | 
 2713 |         | "filter04"
 2714 | 
 2715 |     ];
 2716 | 
 2717 | 
 2718 |   const hasMatchingProduct =
 2719 | 
 2720 |     currentTypeProducts.some(
 2721 | 
 2722 |       (product) => {
 2723 | 
 2724 |         const candidateValues =
 2725 | 
 2726 |           splitFilterValues(
 2727 | 
```

匹配：filter，第 2713 行

```tsx
 2703 |   const dependencies =
 2704 | 
 2705 |     dependencyMap[
 2706 | 
 2707 |       candidateKey as
 2708 | 
 2709 |         | "filter02"
 2710 | 
 2711 |         | "filter03"
 2712 | 
 2713 |         | "filter04"
 2714 | 
 2715 |     ];
 2716 | 
 2717 | 
 2718 |   const hasMatchingProduct =
 2719 | 
 2720 |     currentTypeProducts.some(
 2721 | 
 2722 |       (product) => {
 2723 | 
 2724 |         const candidateValues =
 2725 | 
 2726 |           splitFilterValues(
 2727 | 
 2728 |             (product.filters || {})[
 2729 | 
```

匹配：filter，第 2726 行

```tsx
 2716 | 
 2717 | 
 2718 |   const hasMatchingProduct =
 2719 | 
 2720 |     currentTypeProducts.some(
 2721 | 
 2722 |       (product) => {
 2723 | 
 2724 |         const candidateValues =
 2725 | 
 2726 |           splitFilterValues(
 2727 | 
 2728 |             (product.filters || {})[
 2729 | 
 2730 |               candidateKey
 2731 | 
 2732 |             ]
 2733 | 
 2734 |           );
 2735 | 
 2736 | 
 2737 |         if (
 2738 | 
 2739 |           !candidateValues.includes(
 2740 | 
 2741 |             value
 2742 | 
```

匹配：filter，第 2728 行

```tsx
 2718 |   const hasMatchingProduct =
 2719 | 
 2720 |     currentTypeProducts.some(
 2721 | 
 2722 |       (product) => {
 2723 | 
 2724 |         const candidateValues =
 2725 | 
 2726 |           splitFilterValues(
 2727 | 
 2728 |             (product.filters || {})[
 2729 | 
 2730 |               candidateKey
 2731 | 
 2732 |             ]
 2733 | 
 2734 |           );
 2735 | 
 2736 | 
 2737 |         if (
 2738 | 
 2739 |           !candidateValues.includes(
 2740 | 
 2741 |             value
 2742 | 
 2743 |           )
 2744 | 
```

匹配：filter，第 2758 行

```tsx
 2748 | 
 2749 |         }
 2750 | 
 2751 | 
 2752 |         return dependencies.every(
 2753 | 
 2754 |           (dependencyKey) => {
 2755 | 
 2756 |             const selectedValues =
 2757 | 
 2758 |               selectedFilters[
 2759 | 
 2760 |                 dependencyKey
 2761 | 
 2762 |               ];
 2763 | 
 2764 | 
 2765 |             if (
 2766 | 
 2767 |               !selectedValues ||
 2768 | 
 2769 |               selectedValues.size === 0
 2770 | 
 2771 |             ) {
 2772 | 
 2773 |               return true;
 2774 | 
```

匹配：filter，第 2780 行

```tsx
 2770 | 
 2771 |             ) {
 2772 | 
 2773 |               return true;
 2774 | 
 2775 |             }
 2776 | 
 2777 | 
 2778 |             const productValues =
 2779 | 
 2780 |               splitFilterValues(
 2781 | 
 2782 |                 (product.filters || {})[
 2783 | 
 2784 |                   dependencyKey
 2785 | 
 2786 |                 ]
 2787 | 
 2788 |               );
 2789 | 
 2790 | 
 2791 |             return productValues.some(
 2792 | 
 2793 |               (productValue) =>
 2794 | 
 2795 |                 selectedValues.has(
 2796 | 
```

匹配：filter，第 2782 行

```tsx
 2772 | 
 2773 |               return true;
 2774 | 
 2775 |             }
 2776 | 
 2777 | 
 2778 |             const productValues =
 2779 | 
 2780 |               splitFilterValues(
 2781 | 
 2782 |                 (product.filters || {})[
 2783 | 
 2784 |                   dependencyKey
 2785 | 
 2786 |                 ]
 2787 | 
 2788 |               );
 2789 | 
 2790 | 
 2791 |             return productValues.some(
 2792 | 
 2793 |               (productValue) =>
 2794 | 
 2795 |                 selectedValues.has(
 2796 | 
 2797 |                   productValue
 2798 | 
```

匹配：filter，第 2830 行

```tsx
 2820 | 
 2821 | /*
 2822 |  * 螺纹转倒刺接头筛选联动：
 2823 |  *
 2824 |  * 1. 选择接管内径后，不兼容的螺纹变灰；
 2825 |  * 2. 选择螺纹后，不兼容的接管内径变灰；
 2826 |  * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 2827 |  * 4. 已选中的选项保留取消能力，不设置为禁用；
 2828 |  * 5. 只影响 thread-to-barbed-fittings。
 2829 |  */
 2830 | function isProductFilterOptionDisabled(
 2831 |   group: ProductSelectionFilterGroup,
 2832 |   value: string
 2833 | ) {
 2834 | 
 2835 |   /*
 2836 |    * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
 2837 |    *
 2838 |    * 内螺纹互转接头筛选规则：
 2839 |    *
 2840 |    * 1. filter01 连接结构为单选；
 2841 |    * 2. 二通、三通始终允许切换，不互相置灰；
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
```

匹配：filter，第 2831 行

```tsx
 2821 | /*
 2822 |  * 螺纹转倒刺接头筛选联动：
 2823 |  *
 2824 |  * 1. 选择接管内径后，不兼容的螺纹变灰；
 2825 |  * 2. 选择螺纹后，不兼容的接管内径变灰；
 2826 |  * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 2827 |  * 4. 已选中的选项保留取消能力，不设置为禁用；
 2828 |  * 5. 只影响 thread-to-barbed-fittings。
 2829 |  */
 2830 | function isProductFilterOptionDisabled(
 2831 |   group: ProductSelectionFilterGroup,
 2832 |   value: string
 2833 | ) {
 2834 | 
 2835 |   /*
 2836 |    * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
 2837 |    *
 2838 |    * 内螺纹互转接头筛选规则：
 2839 |    *
 2840 |    * 1. filter01 连接结构为单选；
 2841 |    * 2. 二通、三通始终允许切换，不互相置灰；
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
 2847 |     activeProductTypeId ===
```

匹配：filter，第 2840 行

```tsx
 2830 | function isProductFilterOptionDisabled(
 2831 |   group: ProductSelectionFilterGroup,
 2832 |   value: string
 2833 | ) {
 2834 | 
 2835 |   /*
 2836 |    * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
 2837 |    *
 2838 |    * 内螺纹互转接头筛选规则：
 2839 |    *
 2840 |    * 1. filter01 连接结构为单选；
 2841 |    * 2. 二通、三通始终允许切换，不互相置灰；
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
 2847 |     activeProductTypeId ===
 2848 |     "female-thread-adapters"
 2849 |   ) {
 2850 |     if (
 2851 |       !FILTER_KEYS.includes(
 2852 |         group.key as SelectionFilterKey
 2853 |       )
 2854 |     ) {
 2855 |       return false;
 2856 |     }
```

匹配：filter，第 2842 行

```tsx
 2832 |   value: string
 2833 | ) {
 2834 | 
 2835 |   /*
 2836 |    * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
 2837 |    *
 2838 |    * 内螺纹互转接头筛选规则：
 2839 |    *
 2840 |    * 1. filter01 连接结构为单选；
 2841 |    * 2. 二通、三通始终允许切换，不互相置灰；
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
 2847 |     activeProductTypeId ===
 2848 |     "female-thread-adapters"
 2849 |   ) {
 2850 |     if (
 2851 |       !FILTER_KEYS.includes(
 2852 |         group.key as SelectionFilterKey
 2853 |       )
 2854 |     ) {
 2855 |       return false;
 2856 |     }
 2857 | 
 2858 |     const candidateKey =
```

匹配：productTypeId，第 2847 行

```tsx
 2837 |    *
 2838 |    * 内螺纹互转接头筛选规则：
 2839 |    *
 2840 |    * 1. filter01 连接结构为单选；
 2841 |    * 2. 二通、三通始终允许切换，不互相置灰；
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
 2847 |     activeProductTypeId ===
 2848 |     "female-thread-adapters"
 2849 |   ) {
 2850 |     if (
 2851 |       !FILTER_KEYS.includes(
 2852 |         group.key as SelectionFilterKey
 2853 |       )
 2854 |     ) {
 2855 |       return false;
 2856 |     }
 2857 | 
 2858 |     const candidateKey =
 2859 |       group.key as SelectionFilterKey;
 2860 | 
 2861 |     /*
 2862 |      * 二通和三通必须始终允许互相切换。
 2863 |      */
```

匹配：filter，第 2851 行

```tsx
 2841 |    * 2. 二通、三通始终允许切换，不互相置灰；
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
 2847 |     activeProductTypeId ===
 2848 |     "female-thread-adapters"
 2849 |   ) {
 2850 |     if (
 2851 |       !FILTER_KEYS.includes(
 2852 |         group.key as SelectionFilterKey
 2853 |       )
 2854 |     ) {
 2855 |       return false;
 2856 |     }
 2857 | 
 2858 |     const candidateKey =
 2859 |       group.key as SelectionFilterKey;
 2860 | 
 2861 |     /*
 2862 |      * 二通和三通必须始终允许互相切换。
 2863 |      */
 2864 |     if (
 2865 |       candidateKey === "filter01"
 2866 |     ) {
 2867 |       return false;
```

匹配：filter，第 2852 行

```tsx
 2842 |    * 3. filter02 至 filter05 根据当前组合判断；
 2843 |    * 4. 没有对应在售型号的选项保留显示并变灰；
 2844 |    * 5. 已选中的选项保持可点击，允许取消。
 2845 |    */
 2846 |   if (
 2847 |     activeProductTypeId ===
 2848 |     "female-thread-adapters"
 2849 |   ) {
 2850 |     if (
 2851 |       !FILTER_KEYS.includes(
 2852 |         group.key as SelectionFilterKey
 2853 |       )
 2854 |     ) {
 2855 |       return false;
 2856 |     }
 2857 | 
 2858 |     const candidateKey =
 2859 |       group.key as SelectionFilterKey;
 2860 | 
 2861 |     /*
 2862 |      * 二通和三通必须始终允许互相切换。
 2863 |      */
 2864 |     if (
 2865 |       candidateKey === "filter01"
 2866 |     ) {
 2867 |       return false;
 2868 |     }
```

匹配：filter，第 2859 行

```tsx
 2849 |   ) {
 2850 |     if (
 2851 |       !FILTER_KEYS.includes(
 2852 |         group.key as SelectionFilterKey
 2853 |       )
 2854 |     ) {
 2855 |       return false;
 2856 |     }
 2857 | 
 2858 |     const candidateKey =
 2859 |       group.key as SelectionFilterKey;
 2860 | 
 2861 |     /*
 2862 |      * 二通和三通必须始终允许互相切换。
 2863 |      */
 2864 |     if (
 2865 |       candidateKey === "filter01"
 2866 |     ) {
 2867 |       return false;
 2868 |     }
 2869 | 
 2870 |     /*
 2871 |      * 已选中的项目保持可点击，
 2872 |      * 允许再次点击取消。
 2873 |      */
 2874 |     if (
 2875 |       selectedFilters[
```

匹配：filter，第 2865 行

```tsx
 2855 |       return false;
 2856 |     }
 2857 | 
 2858 |     const candidateKey =
 2859 |       group.key as SelectionFilterKey;
 2860 | 
 2861 |     /*
 2862 |      * 二通和三通必须始终允许互相切换。
 2863 |      */
 2864 |     if (
 2865 |       candidateKey === "filter01"
 2866 |     ) {
 2867 |       return false;
 2868 |     }
 2869 | 
 2870 |     /*
 2871 |      * 已选中的项目保持可点击，
 2872 |      * 允许再次点击取消。
 2873 |      */
 2874 |     if (
 2875 |       selectedFilters[
 2876 |         candidateKey
 2877 |       ]?.has(value)
 2878 |     ) {
 2879 |       return false;
 2880 |     }
 2881 | 
```

匹配：filter，第 2875 行

```tsx
 2865 |       candidateKey === "filter01"
 2866 |     ) {
 2867 |       return false;
 2868 |     }
 2869 | 
 2870 |     /*
 2871 |      * 已选中的项目保持可点击，
 2872 |      * 允许再次点击取消。
 2873 |      */
 2874 |     if (
 2875 |       selectedFilters[
 2876 |         candidateKey
 2877 |       ]?.has(value)
 2878 |     ) {
 2879 |       return false;
 2880 |     }
 2881 | 
 2882 |     const hasMatchingProduct =
 2883 |       currentTypeProducts.some(
 2884 |         (product) => {
 2885 |           const candidateValues =
 2886 |             splitFilterValues(
 2887 |               (product.filters || {})[
 2888 |                 candidateKey
 2889 |               ]
 2890 |             );
 2891 | 
```

匹配：filter，第 2886 行

```tsx
 2876 |         candidateKey
 2877 |       ]?.has(value)
 2878 |     ) {
 2879 |       return false;
 2880 |     }
 2881 | 
 2882 |     const hasMatchingProduct =
 2883 |       currentTypeProducts.some(
 2884 |         (product) => {
 2885 |           const candidateValues =
 2886 |             splitFilterValues(
 2887 |               (product.filters || {})[
 2888 |                 candidateKey
 2889 |               ]
 2890 |             );
 2891 | 
 2892 |           if (
 2893 |             !candidateValues.includes(
 2894 |               value
 2895 |             )
 2896 |           ) {
 2897 |             return false;
 2898 |           }
 2899 | 
 2900 |           /*
 2901 |            * 候选值必须同时满足其他已选条件。
 2902 |            *
```

匹配：filter，第 2887 行

```tsx
 2877 |       ]?.has(value)
 2878 |     ) {
 2879 |       return false;
 2880 |     }
 2881 | 
 2882 |     const hasMatchingProduct =
 2883 |       currentTypeProducts.some(
 2884 |         (product) => {
 2885 |           const candidateValues =
 2886 |             splitFilterValues(
 2887 |               (product.filters || {})[
 2888 |                 candidateKey
 2889 |               ]
 2890 |             );
 2891 | 
 2892 |           if (
 2893 |             !candidateValues.includes(
 2894 |               value
 2895 |             )
 2896 |           ) {
 2897 |             return false;
 2898 |           }
 2899 | 
 2900 |           /*
 2901 |            * 候选值必须同时满足其他已选条件。
 2902 |            *
 2903 |            * 同一个筛选组不参与自身判断，
```

匹配：filter，第 2906 行

```tsx
 2896 |           ) {
 2897 |             return false;
 2898 |           }
 2899 | 
 2900 |           /*
 2901 |            * 候选值必须同时满足其他已选条件。
 2902 |            *
 2903 |            * 同一个筛选组不参与自身判断，
 2904 |            * 其他组之间采用组合交集判断。
 2905 |            */
 2906 |           return FILTER_KEYS.every(
 2907 |             (dependencyKey) => {
 2908 |               if (
 2909 |                 dependencyKey ===
 2910 |                 candidateKey
 2911 |               ) {
 2912 |                 return true;
 2913 |               }
 2914 | 
 2915 |               const selectedValues =
 2916 |                 selectedFilters[
 2917 |                   dependencyKey
 2918 |                 ];
 2919 | 
 2920 |               if (
 2921 |                 !selectedValues ||
 2922 |                 selectedValues.size === 0
```

匹配：filter，第 2916 行

```tsx
 2906 |           return FILTER_KEYS.every(
 2907 |             (dependencyKey) => {
 2908 |               if (
 2909 |                 dependencyKey ===
 2910 |                 candidateKey
 2911 |               ) {
 2912 |                 return true;
 2913 |               }
 2914 | 
 2915 |               const selectedValues =
 2916 |                 selectedFilters[
 2917 |                   dependencyKey
 2918 |                 ];
 2919 | 
 2920 |               if (
 2921 |                 !selectedValues ||
 2922 |                 selectedValues.size === 0
 2923 |               ) {
 2924 |                 return true;
 2925 |               }
 2926 | 
 2927 |               const productValues =
 2928 |                 splitFilterValues(
 2929 |                   (product.filters || {})[
 2930 |                     dependencyKey
 2931 |                   ]
 2932 |                 );
```

匹配：filter，第 2928 行

```tsx
 2918 |                 ];
 2919 | 
 2920 |               if (
 2921 |                 !selectedValues ||
 2922 |                 selectedValues.size === 0
 2923 |               ) {
 2924 |                 return true;
 2925 |               }
 2926 | 
 2927 |               const productValues =
 2928 |                 splitFilterValues(
 2929 |                   (product.filters || {})[
 2930 |                     dependencyKey
 2931 |                   ]
 2932 |                 );
 2933 | 
 2934 |               return productValues.some(
 2935 |                 (productValue) =>
 2936 |                   selectedValues.has(
 2937 |                     productValue
 2938 |                   )
 2939 |               );
 2940 |             }
 2941 |           );
 2942 |         }
 2943 |       );
 2944 | 
```

匹配：filter，第 2929 行

```tsx
 2919 | 
 2920 |               if (
 2921 |                 !selectedValues ||
 2922 |                 selectedValues.size === 0
 2923 |               ) {
 2924 |                 return true;
 2925 |               }
 2926 | 
 2927 |               const productValues =
 2928 |                 splitFilterValues(
 2929 |                   (product.filters || {})[
 2930 |                     dependencyKey
 2931 |                   ]
 2932 |                 );
 2933 | 
 2934 |               return productValues.some(
 2935 |                 (productValue) =>
 2936 |                   selectedValues.has(
 2937 |                     productValue
 2938 |                   )
 2939 |               );
 2940 |             }
 2941 |           );
 2942 |         }
 2943 |       );
 2944 | 
 2945 |     return !hasMatchingProduct;
```

匹配：filter，第 2963 行

```tsx
 2953 |   if (
 2954 |     isBarbedPortOptionDisabled(
 2955 |       group,
 2956 |       value
 2957 |     )
 2958 |   ) {
 2959 |     return true;
 2960 |   }
 2961 | 
 2962 |   /*
 2963 |    * FEMALE_THREAD_FILTER_OPTION_DISABLED_START
 2964 |    *
 2965 |    * 内螺纹互转接头双向筛选联动：
 2966 |    * - 连接结构
 2967 |    * - 螺纹规格
 2968 |    * - 流道内径
 2969 |    * - 材质
 2970 |    * - 颜色
 2971 |    *
 2972 |    * 当前组合不存在对应在售型号时，
 2973 |    * 选项保留显示，但变灰且不可点击。
 2974 |    */
 2975 |   if (
 2976 |     activeProductTypeId ===
 2977 |     "female-thread-adapters"
 2978 |   ) {
 2979 |     if (
```

匹配：productTypeId，第 2976 行

```tsx
 2966 |    * - 连接结构
 2967 |    * - 螺纹规格
 2968 |    * - 流道内径
 2969 |    * - 材质
 2970 |    * - 颜色
 2971 |    *
 2972 |    * 当前组合不存在对应在售型号时，
 2973 |    * 选项保留显示，但变灰且不可点击。
 2974 |    */
 2975 |   if (
 2976 |     activeProductTypeId ===
 2977 |     "female-thread-adapters"
 2978 |   ) {
 2979 |     if (
 2980 |       !FILTER_KEYS.includes(
 2981 |         group.key as SelectionFilterKey
 2982 |       )
 2983 |     ) {
 2984 |       return false;
 2985 |     }
 2986 | 
 2987 |     const candidateKey =
 2988 |       group.key as SelectionFilterKey;
 2989 | 
 2990 |     /*
 2991 |      * 已经选中的项目不能禁用，
 2992 |      * 保留再次点击取消的能力。
```

匹配：filter，第 2980 行

```tsx
 2970 |    * - 颜色
 2971 |    *
 2972 |    * 当前组合不存在对应在售型号时，
 2973 |    * 选项保留显示，但变灰且不可点击。
 2974 |    */
 2975 |   if (
 2976 |     activeProductTypeId ===
 2977 |     "female-thread-adapters"
 2978 |   ) {
 2979 |     if (
 2980 |       !FILTER_KEYS.includes(
 2981 |         group.key as SelectionFilterKey
 2982 |       )
 2983 |     ) {
 2984 |       return false;
 2985 |     }
 2986 | 
 2987 |     const candidateKey =
 2988 |       group.key as SelectionFilterKey;
 2989 | 
 2990 |     /*
 2991 |      * 已经选中的项目不能禁用，
 2992 |      * 保留再次点击取消的能力。
 2993 |      */
 2994 |     if (
 2995 |       selectedFilters[
 2996 |         candidateKey
```

匹配：filter，第 2981 行

```tsx
 2971 |    *
 2972 |    * 当前组合不存在对应在售型号时，
 2973 |    * 选项保留显示，但变灰且不可点击。
 2974 |    */
 2975 |   if (
 2976 |     activeProductTypeId ===
 2977 |     "female-thread-adapters"
 2978 |   ) {
 2979 |     if (
 2980 |       !FILTER_KEYS.includes(
 2981 |         group.key as SelectionFilterKey
 2982 |       )
 2983 |     ) {
 2984 |       return false;
 2985 |     }
 2986 | 
 2987 |     const candidateKey =
 2988 |       group.key as SelectionFilterKey;
 2989 | 
 2990 |     /*
 2991 |      * 已经选中的项目不能禁用，
 2992 |      * 保留再次点击取消的能力。
 2993 |      */
 2994 |     if (
 2995 |       selectedFilters[
 2996 |         candidateKey
 2997 |       ]?.has(value)
```

匹配：filter，第 2988 行

```tsx
 2978 |   ) {
 2979 |     if (
 2980 |       !FILTER_KEYS.includes(
 2981 |         group.key as SelectionFilterKey
 2982 |       )
 2983 |     ) {
 2984 |       return false;
 2985 |     }
 2986 | 
 2987 |     const candidateKey =
 2988 |       group.key as SelectionFilterKey;
 2989 | 
 2990 |     /*
 2991 |      * 已经选中的项目不能禁用，
 2992 |      * 保留再次点击取消的能力。
 2993 |      */
 2994 |     if (
 2995 |       selectedFilters[
 2996 |         candidateKey
 2997 |       ]?.has(value)
 2998 |     ) {
 2999 |       return false;
 3000 |     }
 3001 | 
 3002 |     const hasMatchingProduct =
 3003 |       currentTypeProducts.some(
 3004 |         (product) => {
```

匹配：filter，第 2995 行

```tsx
 2985 |     }
 2986 | 
 2987 |     const candidateKey =
 2988 |       group.key as SelectionFilterKey;
 2989 | 
 2990 |     /*
 2991 |      * 已经选中的项目不能禁用，
 2992 |      * 保留再次点击取消的能力。
 2993 |      */
 2994 |     if (
 2995 |       selectedFilters[
 2996 |         candidateKey
 2997 |       ]?.has(value)
 2998 |     ) {
 2999 |       return false;
 3000 |     }
 3001 | 
 3002 |     const hasMatchingProduct =
 3003 |       currentTypeProducts.some(
 3004 |         (product) => {
 3005 |           const candidateValues =
 3006 |             splitFilterValues(
 3007 |               (product.filters || {})[
 3008 |                 candidateKey
 3009 |               ]
 3010 |             );
 3011 | 
```

匹配：filter，第 3006 行

```tsx
 2996 |         candidateKey
 2997 |       ]?.has(value)
 2998 |     ) {
 2999 |       return false;
 3000 |     }
 3001 | 
 3002 |     const hasMatchingProduct =
 3003 |       currentTypeProducts.some(
 3004 |         (product) => {
 3005 |           const candidateValues =
 3006 |             splitFilterValues(
 3007 |               (product.filters || {})[
 3008 |                 candidateKey
 3009 |               ]
 3010 |             );
 3011 | 
 3012 |           if (
 3013 |             !candidateValues.includes(
 3014 |               value
 3015 |             )
 3016 |           ) {
 3017 |             return false;
 3018 |           }
 3019 | 
 3020 |           return FILTER_KEYS.every(
 3021 |             (dependencyKey) => {
 3022 |               /*
```

匹配：filter，第 3007 行

```tsx
 2997 |       ]?.has(value)
 2998 |     ) {
 2999 |       return false;
 3000 |     }
 3001 | 
 3002 |     const hasMatchingProduct =
 3003 |       currentTypeProducts.some(
 3004 |         (product) => {
 3005 |           const candidateValues =
 3006 |             splitFilterValues(
 3007 |               (product.filters || {})[
 3008 |                 candidateKey
 3009 |               ]
 3010 |             );
 3011 | 
 3012 |           if (
 3013 |             !candidateValues.includes(
 3014 |               value
 3015 |             )
 3016 |           ) {
 3017 |             return false;
 3018 |           }
 3019 | 
 3020 |           return FILTER_KEYS.every(
 3021 |             (dependencyKey) => {
 3022 |               /*
 3023 |                * 当前候选组内仍然保持多选 OR 逻辑。
```

匹配：filter，第 3020 行

```tsx
 3010 |             );
 3011 | 
 3012 |           if (
 3013 |             !candidateValues.includes(
 3014 |               value
 3015 |             )
 3016 |           ) {
 3017 |             return false;
 3018 |           }
 3019 | 
 3020 |           return FILTER_KEYS.every(
 3021 |             (dependencyKey) => {
 3022 |               /*
 3023 |                * 当前候选组内仍然保持多选 OR 逻辑。
 3024 |                */
 3025 |               if (
 3026 |                 dependencyKey ===
 3027 |                 candidateKey
 3028 |               ) {
 3029 |                 return true;
 3030 |               }
 3031 | 
 3032 |               const selectedValues =
 3033 |                 selectedFilters[
 3034 |                   dependencyKey
 3035 |                 ];
 3036 | 
```

匹配：filter，第 3033 行

```tsx
 3023 |                * 当前候选组内仍然保持多选 OR 逻辑。
 3024 |                */
 3025 |               if (
 3026 |                 dependencyKey ===
 3027 |                 candidateKey
 3028 |               ) {
 3029 |                 return true;
 3030 |               }
 3031 | 
 3032 |               const selectedValues =
 3033 |                 selectedFilters[
 3034 |                   dependencyKey
 3035 |                 ];
 3036 | 
 3037 |               if (
 3038 |                 !selectedValues ||
 3039 |                 selectedValues.size === 0
 3040 |               ) {
 3041 |                 return true;
 3042 |               }
 3043 | 
 3044 |               const productValues =
 3045 |                 splitFilterValues(
 3046 |                   (product.filters || {})[
 3047 |                     dependencyKey
 3048 |                   ]
 3049 |                 );
```

匹配：filter，第 3045 行

```tsx
 3035 |                 ];
 3036 | 
 3037 |               if (
 3038 |                 !selectedValues ||
 3039 |                 selectedValues.size === 0
 3040 |               ) {
 3041 |                 return true;
 3042 |               }
 3043 | 
 3044 |               const productValues =
 3045 |                 splitFilterValues(
 3046 |                   (product.filters || {})[
 3047 |                     dependencyKey
 3048 |                   ]
 3049 |                 );
 3050 | 
 3051 |               return productValues.some(
 3052 |                 (productValue) =>
 3053 |                   selectedValues.has(
 3054 |                     productValue
 3055 |                   )
 3056 |               );
 3057 |             }
 3058 |           );
 3059 |         }
 3060 |       );
 3061 | 
```

匹配：filter，第 3046 行

```tsx
 3036 | 
 3037 |               if (
 3038 |                 !selectedValues ||
 3039 |                 selectedValues.size === 0
 3040 |               ) {
 3041 |                 return true;
 3042 |               }
 3043 | 
 3044 |               const productValues =
 3045 |                 splitFilterValues(
 3046 |                   (product.filters || {})[
 3047 |                     dependencyKey
 3048 |                   ]
 3049 |                 );
 3050 | 
 3051 |               return productValues.some(
 3052 |                 (productValue) =>
 3053 |                   selectedValues.has(
 3054 |                     productValue
 3055 |                   )
 3056 |               );
 3057 |             }
 3058 |           );
 3059 |         }
 3060 |       );
 3061 | 
 3062 |     return !hasMatchingProduct;
```

匹配：filter，第 3065 行

```tsx
 3055 |                   )
 3056 |               );
 3057 |             }
 3058 |           );
 3059 |         }
 3060 |       );
 3061 | 
 3062 |     return !hasMatchingProduct;
 3063 |   }
 3064 | 
 3065 |   /* FEMALE_THREAD_FILTER_OPTION_DISABLED_END */
 3066 | 
 3067 |   /*
 3068 |    * LUER_FILTER_OPTION_DISABLED_START
 3069 |    *
 3070 |    * 鲁尔接头双向组合联动：
 3071 |    * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
 3072 |    * 2. 当前组合没有对应在售型号时，选项变灰；
 3073 |    * 3. 已选中的项目保留取消能力；
 3074 |    * 4. filter01 产品类型已隐藏，不参与联动。
 3075 |    */
 3076 |   if (
 3077 |     activeProductTypeId ===
 3078 |     "luer-fittings"
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
```

匹配：filter，第 3068 行

```tsx
 3058 |           );
 3059 |         }
 3060 |       );
 3061 | 
 3062 |     return !hasMatchingProduct;
 3063 |   }
 3064 | 
 3065 |   /* FEMALE_THREAD_FILTER_OPTION_DISABLED_END */
 3066 | 
 3067 |   /*
 3068 |    * LUER_FILTER_OPTION_DISABLED_START
 3069 |    *
 3070 |    * 鲁尔接头双向组合联动：
 3071 |    * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
 3072 |    * 2. 当前组合没有对应在售型号时，选项变灰；
 3073 |    * 3. 已选中的项目保留取消能力；
 3074 |    * 4. filter01 产品类型已隐藏，不参与联动。
 3075 |    */
 3076 |   if (
 3077 |     activeProductTypeId ===
 3078 |     "luer-fittings"
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
```

匹配：filter，第 3074 行

```tsx
 3064 | 
 3065 |   /* FEMALE_THREAD_FILTER_OPTION_DISABLED_END */
 3066 | 
 3067 |   /*
 3068 |    * LUER_FILTER_OPTION_DISABLED_START
 3069 |    *
 3070 |    * 鲁尔接头双向组合联动：
 3071 |    * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
 3072 |    * 2. 当前组合没有对应在售型号时，选项变灰；
 3073 |    * 3. 已选中的项目保留取消能力；
 3074 |    * 4. filter01 产品类型已隐藏，不参与联动。
 3075 |    */
 3076 |   if (
 3077 |     activeProductTypeId ===
 3078 |     "luer-fittings"
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
```

匹配：productTypeId，第 3077 行

```tsx
 3067 |   /*
 3068 |    * LUER_FILTER_OPTION_DISABLED_START
 3069 |    *
 3070 |    * 鲁尔接头双向组合联动：
 3071 |    * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
 3072 |    * 2. 当前组合没有对应在售型号时，选项变灰；
 3073 |    * 3. 已选中的项目保留取消能力；
 3074 |    * 4. filter01 产品类型已隐藏，不参与联动。
 3075 |    */
 3076 |   if (
 3077 |     activeProductTypeId ===
 3078 |     "luer-fittings"
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
 3091 |     /*
 3092 |      * 产品类型 filter01 已隐藏。
 3093 |      */
```

匹配：filter，第 3081 行

```tsx
 3071 |    * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
 3072 |    * 2. 当前组合没有对应在售型号时，选项变灰；
 3073 |    * 3. 已选中的项目保留取消能力；
 3074 |    * 4. filter01 产品类型已隐藏，不参与联动。
 3075 |    */
 3076 |   if (
 3077 |     activeProductTypeId ===
 3078 |     "luer-fittings"
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
 3091 |     /*
 3092 |      * 产品类型 filter01 已隐藏。
 3093 |      */
 3094 |     if (
 3095 |       candidateKey === "filter01"
 3096 |     ) {
 3097 |       return false;
```

匹配：filter，第 3082 行

```tsx
 3072 |    * 2. 当前组合没有对应在售型号时，选项变灰；
 3073 |    * 3. 已选中的项目保留取消能力；
 3074 |    * 4. filter01 产品类型已隐藏，不参与联动。
 3075 |    */
 3076 |   if (
 3077 |     activeProductTypeId ===
 3078 |     "luer-fittings"
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
 3091 |     /*
 3092 |      * 产品类型 filter01 已隐藏。
 3093 |      */
 3094 |     if (
 3095 |       candidateKey === "filter01"
 3096 |     ) {
 3097 |       return false;
 3098 |     }
```

匹配：filter，第 3089 行

```tsx
 3079 |   ) {
 3080 |     if (
 3081 |       !FILTER_KEYS.includes(
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
 3091 |     /*
 3092 |      * 产品类型 filter01 已隐藏。
 3093 |      */
 3094 |     if (
 3095 |       candidateKey === "filter01"
 3096 |     ) {
 3097 |       return false;
 3098 |     }
 3099 | 
 3100 |     /*
 3101 |      * 已选项目必须能够再次点击取消。
 3102 |      */
 3103 |     if (
 3104 |       selectedFilters[
 3105 |         candidateKey
```

匹配：filter，第 3092 行

```tsx
 3082 |         group.key as SelectionFilterKey
 3083 |       )
 3084 |     ) {
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
 3091 |     /*
 3092 |      * 产品类型 filter01 已隐藏。
 3093 |      */
 3094 |     if (
 3095 |       candidateKey === "filter01"
 3096 |     ) {
 3097 |       return false;
 3098 |     }
 3099 | 
 3100 |     /*
 3101 |      * 已选项目必须能够再次点击取消。
 3102 |      */
 3103 |     if (
 3104 |       selectedFilters[
 3105 |         candidateKey
 3106 |       ]?.has(value)
 3107 |     ) {
 3108 |       return false;
```

匹配：filter，第 3095 行

```tsx
 3085 |       return false;
 3086 |     }
 3087 | 
 3088 |     const candidateKey =
 3089 |       group.key as SelectionFilterKey;
 3090 | 
 3091 |     /*
 3092 |      * 产品类型 filter01 已隐藏。
 3093 |      */
 3094 |     if (
 3095 |       candidateKey === "filter01"
 3096 |     ) {
 3097 |       return false;
 3098 |     }
 3099 | 
 3100 |     /*
 3101 |      * 已选项目必须能够再次点击取消。
 3102 |      */
 3103 |     if (
 3104 |       selectedFilters[
 3105 |         candidateKey
 3106 |       ]?.has(value)
 3107 |     ) {
 3108 |       return false;
 3109 |     }
 3110 | 
 3111 |     const hasMatchingProduct =
```

匹配：filter，第 3104 行

```tsx
 3094 |     if (
 3095 |       candidateKey === "filter01"
 3096 |     ) {
 3097 |       return false;
 3098 |     }
 3099 | 
 3100 |     /*
 3101 |      * 已选项目必须能够再次点击取消。
 3102 |      */
 3103 |     if (
 3104 |       selectedFilters[
 3105 |         candidateKey
 3106 |       ]?.has(value)
 3107 |     ) {
 3108 |       return false;
 3109 |     }
 3110 | 
 3111 |     const hasMatchingProduct =
 3112 |       currentTypeProducts.some(
 3113 |         (product) => {
 3114 |           const candidateValues =
 3115 |             splitFilterValues(
 3116 |               (product.filters || {})[
 3117 |                 candidateKey
 3118 |               ]
 3119 |             );
 3120 | 
```

匹配：filter，第 3115 行

```tsx
 3105 |         candidateKey
 3106 |       ]?.has(value)
 3107 |     ) {
 3108 |       return false;
 3109 |     }
 3110 | 
 3111 |     const hasMatchingProduct =
 3112 |       currentTypeProducts.some(
 3113 |         (product) => {
 3114 |           const candidateValues =
 3115 |             splitFilterValues(
 3116 |               (product.filters || {})[
 3117 |                 candidateKey
 3118 |               ]
 3119 |             );
 3120 | 
 3121 |           if (
 3122 |             !candidateValues.includes(
 3123 |               value
 3124 |             )
 3125 |           ) {
 3126 |             return false;
 3127 |           }
 3128 | 
 3129 |           /*
 3130 |            * 检查其他所有已选筛选项。
 3131 |            *
```

匹配：filter，第 3116 行

```tsx
 3106 |       ]?.has(value)
 3107 |     ) {
 3108 |       return false;
 3109 |     }
 3110 | 
 3111 |     const hasMatchingProduct =
 3112 |       currentTypeProducts.some(
 3113 |         (product) => {
 3114 |           const candidateValues =
 3115 |             splitFilterValues(
 3116 |               (product.filters || {})[
 3117 |                 candidateKey
 3118 |               ]
 3119 |             );
 3120 | 
 3121 |           if (
 3122 |             !candidateValues.includes(
 3123 |               value
 3124 |             )
 3125 |           ) {
 3126 |             return false;
 3127 |           }
 3128 | 
 3129 |           /*
 3130 |            * 检查其他所有已选筛选项。
 3131 |            *
 3132 |            * 当前分组使用多选逻辑，
```

匹配：filter，第 3136 行

```tsx
 3126 |             return false;
 3127 |           }
 3128 | 
 3129 |           /*
 3130 |            * 检查其他所有已选筛选项。
 3131 |            *
 3132 |            * 当前分组使用多选逻辑，
 3133 |            * 因此判断候选项时忽略当前分组
 3134 |            * 已选的其他值。
 3135 |            */
 3136 |           return FILTER_KEYS.every(
 3137 |             (dependencyKey) => {
 3138 |               if (
 3139 |                 dependencyKey ===
 3140 |                   candidateKey ||
 3141 |                 dependencyKey ===
 3142 |                   "filter01"
 3143 |               ) {
 3144 |                 return true;
 3145 |               }
 3146 | 
 3147 |               const selectedValues =
 3148 |                 selectedFilters[
 3149 |                   dependencyKey
 3150 |                 ];
 3151 | 
 3152 |               if (
```

匹配：filter，第 3142 行

```tsx
 3132 |            * 当前分组使用多选逻辑，
 3133 |            * 因此判断候选项时忽略当前分组
 3134 |            * 已选的其他值。
 3135 |            */
 3136 |           return FILTER_KEYS.every(
 3137 |             (dependencyKey) => {
 3138 |               if (
 3139 |                 dependencyKey ===
 3140 |                   candidateKey ||
 3141 |                 dependencyKey ===
 3142 |                   "filter01"
 3143 |               ) {
 3144 |                 return true;
 3145 |               }
 3146 | 
 3147 |               const selectedValues =
 3148 |                 selectedFilters[
 3149 |                   dependencyKey
 3150 |                 ];
 3151 | 
 3152 |               if (
 3153 |                 !selectedValues ||
 3154 |                 selectedValues.size === 0
 3155 |               ) {
 3156 |                 return true;
 3157 |               }
 3158 | 
```

匹配：filter，第 3148 行

```tsx
 3138 |               if (
 3139 |                 dependencyKey ===
 3140 |                   candidateKey ||
 3141 |                 dependencyKey ===
 3142 |                   "filter01"
 3143 |               ) {
 3144 |                 return true;
 3145 |               }
 3146 | 
 3147 |               const selectedValues =
 3148 |                 selectedFilters[
 3149 |                   dependencyKey
 3150 |                 ];
 3151 | 
 3152 |               if (
 3153 |                 !selectedValues ||
 3154 |                 selectedValues.size === 0
 3155 |               ) {
 3156 |                 return true;
 3157 |               }
 3158 | 
 3159 |               const productValues =
 3160 |                 splitFilterValues(
 3161 |                   (product.filters || {})[
 3162 |                     dependencyKey
 3163 |                   ]
 3164 |                 );
```

匹配：filter，第 3160 行

```tsx
 3150 |                 ];
 3151 | 
 3152 |               if (
 3153 |                 !selectedValues ||
 3154 |                 selectedValues.size === 0
 3155 |               ) {
 3156 |                 return true;
 3157 |               }
 3158 | 
 3159 |               const productValues =
 3160 |                 splitFilterValues(
 3161 |                   (product.filters || {})[
 3162 |                     dependencyKey
 3163 |                   ]
 3164 |                 );
 3165 | 
 3166 |               return productValues.some(
 3167 |                 (productValue) =>
 3168 |                   selectedValues.has(
 3169 |                     productValue
 3170 |                   )
 3171 |               );
 3172 |             }
 3173 |           );
 3174 |         }
 3175 |       );
 3176 | 
```

匹配：filter，第 3161 行

```tsx
 3151 | 
 3152 |               if (
 3153 |                 !selectedValues ||
 3154 |                 selectedValues.size === 0
 3155 |               ) {
 3156 |                 return true;
 3157 |               }
 3158 | 
 3159 |               const productValues =
 3160 |                 splitFilterValues(
 3161 |                   (product.filters || {})[
 3162 |                     dependencyKey
 3163 |                   ]
 3164 |                 );
 3165 | 
 3166 |               return productValues.some(
 3167 |                 (productValue) =>
 3168 |                   selectedValues.has(
 3169 |                     productValue
 3170 |                   )
 3171 |               );
 3172 |             }
 3173 |           );
 3174 |         }
 3175 |       );
 3176 | 
 3177 |     return !hasMatchingProduct;
```

匹配：filter，第 3180 行

```tsx
 3170 |                   )
 3171 |               );
 3172 |             }
 3173 |           );
 3174 |         }
 3175 |       );
 3176 | 
 3177 |     return !hasMatchingProduct;
 3178 |   }
 3179 | 
 3180 |   /* LUER_FILTER_OPTION_DISABLED_END */
 3181 | 
 3182 | 
 3183 |   if (
 3184 |     activeProductTypeId !==
 3185 |     "thread-to-barbed-fittings"
 3186 |   ) {
 3187 |     return false;
 3188 |   }
 3189 | 
 3190 |   if (
 3191 |     !FILTER_KEYS.includes(
 3192 |       group.key as SelectionFilterKey
 3193 |     )
 3194 |   ) {
 3195 |     return false;
 3196 |   }
```

匹配：productTypeId，第 3184 行

```tsx
 3174 |         }
 3175 |       );
 3176 | 
 3177 |     return !hasMatchingProduct;
 3178 |   }
 3179 | 
 3180 |   /* LUER_FILTER_OPTION_DISABLED_END */
 3181 | 
 3182 | 
 3183 |   if (
 3184 |     activeProductTypeId !==
 3185 |     "thread-to-barbed-fittings"
 3186 |   ) {
 3187 |     return false;
 3188 |   }
 3189 | 
 3190 |   if (
 3191 |     !FILTER_KEYS.includes(
 3192 |       group.key as SelectionFilterKey
 3193 |     )
 3194 |   ) {
 3195 |     return false;
 3196 |   }
 3197 | 
 3198 |   const candidateKey =
 3199 |     group.key as SelectionFilterKey;
 3200 | 
```

匹配：filter，第 3191 行

```tsx
 3181 | 
 3182 | 
 3183 |   if (
 3184 |     activeProductTypeId !==
 3185 |     "thread-to-barbed-fittings"
 3186 |   ) {
 3187 |     return false;
 3188 |   }
 3189 | 
 3190 |   if (
 3191 |     !FILTER_KEYS.includes(
 3192 |       group.key as SelectionFilterKey
 3193 |     )
 3194 |   ) {
 3195 |     return false;
 3196 |   }
 3197 | 
 3198 |   const candidateKey =
 3199 |     group.key as SelectionFilterKey;
 3200 | 
 3201 |   /*
 3202 |    * 当前已选项不能禁用，
 3203 |    * 用户需要能够再次点击取消。
 3204 |    */
 3205 |   if (
 3206 |     selectedFilters[
 3207 |       candidateKey
```

匹配：filter，第 3192 行

```tsx
 3182 | 
 3183 |   if (
 3184 |     activeProductTypeId !==
 3185 |     "thread-to-barbed-fittings"
 3186 |   ) {
 3187 |     return false;
 3188 |   }
 3189 | 
 3190 |   if (
 3191 |     !FILTER_KEYS.includes(
 3192 |       group.key as SelectionFilterKey
 3193 |     )
 3194 |   ) {
 3195 |     return false;
 3196 |   }
 3197 | 
 3198 |   const candidateKey =
 3199 |     group.key as SelectionFilterKey;
 3200 | 
 3201 |   /*
 3202 |    * 当前已选项不能禁用，
 3203 |    * 用户需要能够再次点击取消。
 3204 |    */
 3205 |   if (
 3206 |     selectedFilters[
 3207 |       candidateKey
 3208 |     ]?.has(value)
```

匹配：filter，第 3199 行

```tsx
 3189 | 
 3190 |   if (
 3191 |     !FILTER_KEYS.includes(
 3192 |       group.key as SelectionFilterKey
 3193 |     )
 3194 |   ) {
 3195 |     return false;
 3196 |   }
 3197 | 
 3198 |   const candidateKey =
 3199 |     group.key as SelectionFilterKey;
 3200 | 
 3201 |   /*
 3202 |    * 当前已选项不能禁用，
 3203 |    * 用户需要能够再次点击取消。
 3204 |    */
 3205 |   if (
 3206 |     selectedFilters[
 3207 |       candidateKey
 3208 |     ]?.has(value)
 3209 |   ) {
 3210 |     return false;
 3211 |   }
 3212 | 
 3213 |   /*
 3214 |    * 查找是否至少存在一个真实型号：
 3215 |    *
```

匹配：filter，第 3206 行

```tsx
 3196 |   }
 3197 | 
 3198 |   const candidateKey =
 3199 |     group.key as SelectionFilterKey;
 3200 | 
 3201 |   /*
 3202 |    * 当前已选项不能禁用，
 3203 |    * 用户需要能够再次点击取消。
 3204 |    */
 3205 |   if (
 3206 |     selectedFilters[
 3207 |       candidateKey
 3208 |     ]?.has(value)
 3209 |   ) {
 3210 |     return false;
 3211 |   }
 3212 | 
 3213 |   /*
 3214 |    * 查找是否至少存在一个真实型号：
 3215 |    *
 3216 |    * - 当前候选字段等于 value；
 3217 |    * - 同时满足其他已选筛选条件。
 3218 |    */
 3219 |   const hasMatchingProduct =
 3220 |     currentTypeProducts.some(
 3221 |       (product) => {
 3222 |         const candidateValues =
```

匹配：filter，第 3223 行

```tsx
 3213 |   /*
 3214 |    * 查找是否至少存在一个真实型号：
 3215 |    *
 3216 |    * - 当前候选字段等于 value；
 3217 |    * - 同时满足其他已选筛选条件。
 3218 |    */
 3219 |   const hasMatchingProduct =
 3220 |     currentTypeProducts.some(
 3221 |       (product) => {
 3222 |         const candidateValues =
 3223 |           splitFilterValues(
 3224 |             (product.filters || {})[
 3225 |               candidateKey
 3226 |             ]
 3227 |           );
 3228 | 
 3229 |         if (
 3230 |           !candidateValues.includes(value)
 3231 |         ) {
 3232 |           return false;
 3233 |         }
 3234 | 
 3235 |         return FILTER_KEYS.every(
 3236 |           (filterKey) => {
 3237 |             /*
 3238 |              * 判断候选字段时，
 3239 |              * 不使用该字段当前已有选择限制自己。
```

匹配：filter，第 3224 行

```tsx
 3214 |    * 查找是否至少存在一个真实型号：
 3215 |    *
 3216 |    * - 当前候选字段等于 value；
 3217 |    * - 同时满足其他已选筛选条件。
 3218 |    */
 3219 |   const hasMatchingProduct =
 3220 |     currentTypeProducts.some(
 3221 |       (product) => {
 3222 |         const candidateValues =
 3223 |           splitFilterValues(
 3224 |             (product.filters || {})[
 3225 |               candidateKey
 3226 |             ]
 3227 |           );
 3228 | 
 3229 |         if (
 3230 |           !candidateValues.includes(value)
 3231 |         ) {
 3232 |           return false;
 3233 |         }
 3234 | 
 3235 |         return FILTER_KEYS.every(
 3236 |           (filterKey) => {
 3237 |             /*
 3238 |              * 判断候选字段时，
 3239 |              * 不使用该字段当前已有选择限制自己。
 3240 |              */
```

匹配：filter，第 3235 行

```tsx
 3225 |               candidateKey
 3226 |             ]
 3227 |           );
 3228 | 
 3229 |         if (
 3230 |           !candidateValues.includes(value)
 3231 |         ) {
 3232 |           return false;
 3233 |         }
 3234 | 
 3235 |         return FILTER_KEYS.every(
 3236 |           (filterKey) => {
 3237 |             /*
 3238 |              * 判断候选字段时，
 3239 |              * 不使用该字段当前已有选择限制自己。
 3240 |              */
 3241 |             if (
 3242 |               filterKey === candidateKey
 3243 |             ) {
 3244 |               return true;
 3245 |             }
 3246 | 
 3247 |             const selectedValues =
 3248 |               selectedFilters[filterKey];
 3249 | 
 3250 |             if (
 3251 |               !selectedValues ||
```

匹配：filter，第 3236 行

```tsx
 3226 |             ]
 3227 |           );
 3228 | 
 3229 |         if (
 3230 |           !candidateValues.includes(value)
 3231 |         ) {
 3232 |           return false;
 3233 |         }
 3234 | 
 3235 |         return FILTER_KEYS.every(
 3236 |           (filterKey) => {
 3237 |             /*
 3238 |              * 判断候选字段时，
 3239 |              * 不使用该字段当前已有选择限制自己。
 3240 |              */
 3241 |             if (
 3242 |               filterKey === candidateKey
 3243 |             ) {
 3244 |               return true;
 3245 |             }
 3246 | 
 3247 |             const selectedValues =
 3248 |               selectedFilters[filterKey];
 3249 | 
 3250 |             if (
 3251 |               !selectedValues ||
 3252 |               selectedValues.size === 0
```

匹配：filter，第 3242 行

```tsx
 3232 |           return false;
 3233 |         }
 3234 | 
 3235 |         return FILTER_KEYS.every(
 3236 |           (filterKey) => {
 3237 |             /*
 3238 |              * 判断候选字段时，
 3239 |              * 不使用该字段当前已有选择限制自己。
 3240 |              */
 3241 |             if (
 3242 |               filterKey === candidateKey
 3243 |             ) {
 3244 |               return true;
 3245 |             }
 3246 | 
 3247 |             const selectedValues =
 3248 |               selectedFilters[filterKey];
 3249 | 
 3250 |             if (
 3251 |               !selectedValues ||
 3252 |               selectedValues.size === 0
 3253 |             ) {
 3254 |               return true;
 3255 |             }
 3256 | 
 3257 |             const productValues =
 3258 |               splitFilterValues(
```

匹配：filter，第 3248 行

```tsx
 3238 |              * 判断候选字段时，
 3239 |              * 不使用该字段当前已有选择限制自己。
 3240 |              */
 3241 |             if (
 3242 |               filterKey === candidateKey
 3243 |             ) {
 3244 |               return true;
 3245 |             }
 3246 | 
 3247 |             const selectedValues =
 3248 |               selectedFilters[filterKey];
 3249 | 
 3250 |             if (
 3251 |               !selectedValues ||
 3252 |               selectedValues.size === 0
 3253 |             ) {
 3254 |               return true;
 3255 |             }
 3256 | 
 3257 |             const productValues =
 3258 |               splitFilterValues(
 3259 |                 (product.filters || {})[
 3260 |                   filterKey
 3261 |                 ]
 3262 |               );
 3263 | 
 3264 |             return productValues.some(
```

匹配：filter，第 3258 行

```tsx
 3248 |               selectedFilters[filterKey];
 3249 | 
 3250 |             if (
 3251 |               !selectedValues ||
 3252 |               selectedValues.size === 0
 3253 |             ) {
 3254 |               return true;
 3255 |             }
 3256 | 
 3257 |             const productValues =
 3258 |               splitFilterValues(
 3259 |                 (product.filters || {})[
 3260 |                   filterKey
 3261 |                 ]
 3262 |               );
 3263 | 
 3264 |             return productValues.some(
 3265 |               (productValue) =>
 3266 |                 selectedValues.has(
 3267 |                   productValue
 3268 |                 )
 3269 |             );
 3270 |           }
 3271 |         );
 3272 |       }
 3273 |     );
 3274 | 
```

匹配：filter，第 3259 行

```tsx
 3249 | 
 3250 |             if (
 3251 |               !selectedValues ||
 3252 |               selectedValues.size === 0
 3253 |             ) {
 3254 |               return true;
 3255 |             }
 3256 | 
 3257 |             const productValues =
 3258 |               splitFilterValues(
 3259 |                 (product.filters || {})[
 3260 |                   filterKey
 3261 |                 ]
 3262 |               );
 3263 | 
 3264 |             return productValues.some(
 3265 |               (productValue) =>
 3266 |                 selectedValues.has(
 3267 |                   productValue
 3268 |                 )
 3269 |             );
 3270 |           }
 3271 |         );
 3272 |       }
 3273 |     );
 3274 | 
 3275 |   return !hasMatchingProduct;
```

匹配：filter，第 3260 行

```tsx
 3250 |             if (
 3251 |               !selectedValues ||
 3252 |               selectedValues.size === 0
 3253 |             ) {
 3254 |               return true;
 3255 |             }
 3256 | 
 3257 |             const productValues =
 3258 |               splitFilterValues(
 3259 |                 (product.filters || {})[
 3260 |                   filterKey
 3261 |                 ]
 3262 |               );
 3263 | 
 3264 |             return productValues.some(
 3265 |               (productValue) =>
 3266 |                 selectedValues.has(
 3267 |                   productValue
 3268 |                 )
 3269 |             );
 3270 |           }
 3271 |         );
 3272 |       }
 3273 |     );
 3274 | 
 3275 |   return !hasMatchingProduct;
 3276 | }
```

匹配：filter，第 3282 行

```tsx
 3272 |       }
 3273 |     );
 3274 | 
 3275 |   return !hasMatchingProduct;
 3276 | }
 3277 | 
 3278 | /* THREAD_TO_BARBED_OPTION_DISABLED_END */
 3279 | 
 3280 | 
 3281 | 
 3282 | function isFilterOptionActive(
 3283 |     group: ProductSelectionFilterGroup,
 3284 |     value: string
 3285 |   ) {
 3286 |     /*
 3287 |      * 说明：
 3288 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 3289 |      * 2. productType 是产品类型，例如“柱塞泵”
 3290 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
```

匹配：filter，第 3283 行

```tsx
 3273 |     );
 3274 | 
 3275 |   return !hasMatchingProduct;
 3276 | }
 3277 | 
 3278 | /* THREAD_TO_BARBED_OPTION_DISABLED_END */
 3279 | 
 3280 | 
 3281 | 
 3282 | function isFilterOptionActive(
 3283 |     group: ProductSelectionFilterGroup,
 3284 |     value: string
 3285 |   ) {
 3286 |     /*
 3287 |      * 说明：
 3288 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 3289 |      * 2. productType 是产品类型，例如“柱塞泵”
 3290 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
```

匹配：filter，第 3290 行

```tsx
 3280 | 
 3281 | 
 3282 | function isFilterOptionActive(
 3283 |     group: ProductSelectionFilterGroup,
 3284 |     value: string
 3285 |   ) {
 3286 |     /*
 3287 |      * 说明：
 3288 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 3289 |      * 2. productType 是产品类型，例如“柱塞泵”
 3290 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
 3300 | 
 3301 |     const filterKey = group.key as SelectionFilterKey;
 3302 | 
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
```

匹配：filter，第 3291 行

```tsx
 3281 | 
 3282 | function isFilterOptionActive(
 3283 |     group: ProductSelectionFilterGroup,
 3284 |     value: string
 3285 |   ) {
 3286 |     /*
 3287 |      * 说明：
 3288 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 3289 |      * 2. productType 是产品类型，例如“柱塞泵”
 3290 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
 3300 | 
 3301 |     const filterKey = group.key as SelectionFilterKey;
 3302 | 
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
 3307 |     value: string
```

匹配：productTypeId，第 3294 行

```tsx
 3284 |     value: string
 3285 |   ) {
 3286 |     /*
 3287 |      * 说明：
 3288 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 3289 |      * 2. productType 是产品类型，例如“柱塞泵”
 3290 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
 3300 | 
 3301 |     const filterKey = group.key as SelectionFilterKey;
 3302 | 
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
 3307 |     value: string
 3308 |   ) {
 3309 |     /*
 3310 |      * 说明：
```

匹配：filter，第 3297 行

```tsx
 3287 |      * 说明：
 3288 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 3289 |      * 2. productType 是产品类型，例如“柱塞泵”
 3290 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
 3300 | 
 3301 |     const filterKey = group.key as SelectionFilterKey;
 3302 | 
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
 3307 |     value: string
 3308 |   ) {
 3309 |     /*
 3310 |      * 说明：
 3311 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 3312 |      * 2. productType 是产品类型，例如“柱塞泵”
 3313 |      * 3. filter01 是产品系列，例如 EA / SM / TM
```

匹配：filter，第 3301 行

```tsx
 3291 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 3292 |      */
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
 3300 | 
 3301 |     const filterKey = group.key as SelectionFilterKey;
 3302 | 
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
 3307 |     value: string
 3308 |   ) {
 3309 |     /*
 3310 |      * 说明：
 3311 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 3312 |      * 2. productType 是产品类型，例如“柱塞泵”
 3313 |      * 3. filter01 是产品系列，例如 EA / SM / TM
 3314 |      * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
 3315 |      */
 3316 | 
 3317 |     if (key === "productType") {
```

匹配：filter，第 3303 行

```tsx
 3293 |     if (group.key === "productType") {
 3294 |       return activeProductTypeId === value;
 3295 |     }
 3296 | 
 3297 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 3298 |       return false;
 3299 |     }
 3300 | 
 3301 |     const filterKey = group.key as SelectionFilterKey;
 3302 | 
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
 3307 |     value: string
 3308 |   ) {
 3309 |     /*
 3310 |      * 说明：
 3311 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 3312 |      * 2. productType 是产品类型，例如“柱塞泵”
 3313 |      * 3. filter01 是产品系列，例如 EA / SM / TM
 3314 |      * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
 3315 |      */
 3316 | 
 3317 |     if (key === "productType") {
 3318 |       setActiveProductTypeId("");
 3319 |       setSelectedFilters({});
```

匹配：filter，第 3313 行

```tsx
 3303 |     return selectedFilters[filterKey]?.has(value) || false;
 3304 |   }
 3305 |   function removeSelectedTag(
 3306 |     key: string,
 3307 |     value: string
 3308 |   ) {
 3309 |     /*
 3310 |      * 说明：
 3311 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 3312 |      * 2. productType 是产品类型，例如“柱塞泵”
 3313 |      * 3. filter01 是产品系列，例如 EA / SM / TM
 3314 |      * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
 3315 |      */
 3316 | 
 3317 |     if (key === "productType") {
 3318 |       setActiveProductTypeId("");
 3319 |       setSelectedFilters({});
 3320 |       return;
 3321 |     }
 3322 | 
 3323 |     /*
 3324 |      * 说明：
 3325 |      * 1. 判断当前清除的标签是否命中正式系列路由
 3326 |      * 2. 例如 EA 常规柱塞泵命中：
 3327 |      *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
 3328 |      * 3. 清除后跳回产品类型页：
 3329 |      *    /products/pumps/plunger-pumps/
```

匹配：productTypeId，第 3318 行

```tsx
 3308 |   ) {
 3309 |     /*
 3310 |      * 说明：
 3311 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 3312 |      * 2. productType 是产品类型，例如“柱塞泵”
 3313 |      * 3. filter01 是产品系列，例如 EA / SM / TM
 3314 |      * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
 3315 |      */
 3316 | 
 3317 |     if (key === "productType") {
 3318 |       setActiveProductTypeId("");
 3319 |       setSelectedFilters({});
 3320 |       return;
 3321 |     }
 3322 | 
 3323 |     /*
 3324 |      * 说明：
 3325 |      * 1. 判断当前清除的标签是否命中正式系列路由
 3326 |      * 2. 例如 EA 常规柱塞泵命中：
 3327 |      *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
 3328 |      * 3. 清除后跳回产品类型页：
 3329 |      *    /products/pumps/plunger-pumps/
 3330 |      */
 3331 |     const seriesHref = getSeriesHrefByFilterValue(
 3332 |       activeCategoryId,
 3333 |       activeProductTypeId,
 3334 |       key,
```

匹配：filter，第 3319 行

```tsx
 3309 |     /*
 3310 |      * 说明：
 3311 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 3312 |      * 2. productType 是产品类型，例如“柱塞泵”
 3313 |      * 3. filter01 是产品系列，例如 EA / SM / TM
 3314 |      * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
 3315 |      */
 3316 | 
 3317 |     if (key === "productType") {
 3318 |       setActiveProductTypeId("");
 3319 |       setSelectedFilters({});
 3320 |       return;
 3321 |     }
 3322 | 
 3323 |     /*
 3324 |      * 说明：
 3325 |      * 1. 判断当前清除的标签是否命中正式系列路由
 3326 |      * 2. 例如 EA 常规柱塞泵命中：
 3327 |      *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
 3328 |      * 3. 清除后跳回产品类型页：
 3329 |      *    /products/pumps/plunger-pumps/
 3330 |      */
 3331 |     const seriesHref = getSeriesHrefByFilterValue(
 3332 |       activeCategoryId,
 3333 |       activeProductTypeId,
 3334 |       key,
 3335 |       value
```

匹配：filter，第 3331 行

```tsx
 3321 |     }
 3322 | 
 3323 |     /*
 3324 |      * 说明：
 3325 |      * 1. 判断当前清除的标签是否命中正式系列路由
 3326 |      * 2. 例如 EA 常规柱塞泵命中：
 3327 |      *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
 3328 |      * 3. 清除后跳回产品类型页：
 3329 |      *    /products/pumps/plunger-pumps/
 3330 |      */
 3331 |     const seriesHref = getSeriesHrefByFilterValue(
 3332 |       activeCategoryId,
 3333 |       activeProductTypeId,
 3334 |       key,
 3335 |       value
 3336 |     );
 3337 | 
 3338 |     if (seriesHref) {
 3339 |       const productTypeHref = getProductTypeHrefByIds(
 3340 |         activeCategoryId,
 3341 |         activeProductTypeId
 3342 |       );
 3343 | 
 3344 |       if (productTypeHref) {
 3345 |         router.push(productTypeHref);
 3346 |         return;
 3347 |       }
```

匹配：productTypeId，第 3333 行

```tsx
 3323 |     /*
 3324 |      * 说明：
 3325 |      * 1. 判断当前清除的标签是否命中正式系列路由
 3326 |      * 2. 例如 EA 常规柱塞泵命中：
 3327 |      *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
 3328 |      * 3. 清除后跳回产品类型页：
 3329 |      *    /products/pumps/plunger-pumps/
 3330 |      */
 3331 |     const seriesHref = getSeriesHrefByFilterValue(
 3332 |       activeCategoryId,
 3333 |       activeProductTypeId,
 3334 |       key,
 3335 |       value
 3336 |     );
 3337 | 
 3338 |     if (seriesHref) {
 3339 |       const productTypeHref = getProductTypeHrefByIds(
 3340 |         activeCategoryId,
 3341 |         activeProductTypeId
 3342 |       );
 3343 | 
 3344 |       if (productTypeHref) {
 3345 |         router.push(productTypeHref);
 3346 |         return;
 3347 |       }
 3348 |     }
 3349 | 
```

匹配：productTypeId，第 3341 行

```tsx
 3331 |     const seriesHref = getSeriesHrefByFilterValue(
 3332 |       activeCategoryId,
 3333 |       activeProductTypeId,
 3334 |       key,
 3335 |       value
 3336 |     );
 3337 | 
 3338 |     if (seriesHref) {
 3339 |       const productTypeHref = getProductTypeHrefByIds(
 3340 |         activeCategoryId,
 3341 |         activeProductTypeId
 3342 |       );
 3343 | 
 3344 |       if (productTypeHref) {
 3345 |         router.push(productTypeHref);
 3346 |         return;
 3347 |       }
 3348 |     }
 3349 | 
 3350 |     /*
 3351 |      * 说明：
 3352 |      * selectedFilters 的 key 只能是 SelectionFilterKey。
 3353 |      * removeSelectedTag 传进来的 key 是 string，
 3354 |      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
 3355 |      */
 3356 |     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
 3357 |       return;
```

匹配：filter，第 3352 行

```tsx
 3342 |       );
 3343 | 
 3344 |       if (productTypeHref) {
 3345 |         router.push(productTypeHref);
 3346 |         return;
 3347 |       }
 3348 |     }
 3349 | 
 3350 |     /*
 3351 |      * 说明：
 3352 |      * selectedFilters 的 key 只能是 SelectionFilterKey。
 3353 |      * removeSelectedTag 传进来的 key 是 string，
 3354 |      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
 3355 |      */
 3356 |     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
 3357 |       return;
 3358 |     }
 3359 | 
 3360 |     const filterKey = key as SelectionFilterKey;
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
```

匹配：filter，第 3354 行

```tsx
 3344 |       if (productTypeHref) {
 3345 |         router.push(productTypeHref);
 3346 |         return;
 3347 |       }
 3348 |     }
 3349 | 
 3350 |     /*
 3351 |      * 说明：
 3352 |      * selectedFilters 的 key 只能是 SelectionFilterKey。
 3353 |      * removeSelectedTag 传进来的 key 是 string，
 3354 |      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
 3355 |      */
 3356 |     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
 3357 |       return;
 3358 |     }
 3359 | 
 3360 |     const filterKey = key as SelectionFilterKey;
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
```

匹配：filter，第 3356 行

```tsx
 3346 |         return;
 3347 |       }
 3348 |     }
 3349 | 
 3350 |     /*
 3351 |      * 说明：
 3352 |      * selectedFilters 的 key 只能是 SelectionFilterKey。
 3353 |      * removeSelectedTag 传进来的 key 是 string，
 3354 |      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
 3355 |      */
 3356 |     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
 3357 |       return;
 3358 |     }
 3359 | 
 3360 |     const filterKey = key as SelectionFilterKey;
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
```

匹配：filter，第 3360 行

```tsx
 3350 |     /*
 3351 |      * 说明：
 3352 |      * selectedFilters 的 key 只能是 SelectionFilterKey。
 3353 |      * removeSelectedTag 传进来的 key 是 string，
 3354 |      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
 3355 |      */
 3356 |     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
 3357 |       return;
 3358 |     }
 3359 | 
 3360 |     const filterKey = key as SelectionFilterKey;
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
```

匹配：filter，第 3362 行

```tsx
 3352 |      * selectedFilters 的 key 只能是 SelectionFilterKey。
 3353 |      * removeSelectedTag 传进来的 key 是 string，
 3354 |      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
 3355 |      */
 3356 |     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
 3357 |       return;
 3358 |     }
 3359 | 
 3360 |     const filterKey = key as SelectionFilterKey;
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
```

匹配：filter，第 3367 行

```tsx
 3357 |       return;
 3358 |     }
 3359 | 
 3360 |     const filterKey = key as SelectionFilterKey;
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
```

匹配：filter，第 3371 行

```tsx
 3361 | 
 3362 |     setSelectedFilters((current) => {
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
```

匹配：filter，第 3373 行

```tsx
 3363 |       const next = {
 3364 |         ...current,
 3365 |       };
 3366 | 
 3367 |       const values = new Set(next[filterKey] || []);
 3368 |       values.delete(value);
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
```

匹配：filter，第 3379 行

```tsx
 3369 | 
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
 3390 |     const title = getText(locale, product.cardTitle, product.productId);
 3391 | 
 3392 |     return {
 3393 |       sourceType: "pump-selection",
 3394 |       sourceLabel: "产品中心",
 3395 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
```

匹配：productTypeId，第 3380 行

```tsx
 3370 |       if (values.size === 0) {
 3371 |         delete next[filterKey];
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
 3390 |     const title = getText(locale, product.cardTitle, product.productId);
 3391 | 
 3392 |     return {
 3393 |       sourceType: "pump-selection",
 3394 |       sourceLabel: "产品中心",
 3395 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 3396 |       productCode: product.productId,
```

匹配：productTypeId，第 3382 行

```tsx
 3372 |       } else {
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
 3390 |     const title = getText(locale, product.cardTitle, product.productId);
 3391 | 
 3392 |     return {
 3393 |       sourceType: "pump-selection",
 3394 |       sourceLabel: "产品中心",
 3395 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 3396 |       productCode: product.productId,
 3397 |       foreachModel: title,
 3398 |       competitorModels: [],
```

匹配：filter、productTypeId，第 3383 行

```tsx
 3373 |         next[filterKey] = values;
 3374 |       }
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
 3390 |     const title = getText(locale, product.cardTitle, product.productId);
 3391 | 
 3392 |     return {
 3393 |       sourceType: "pump-selection",
 3394 |       sourceLabel: "产品中心",
 3395 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 3396 |       productCode: product.productId,
 3397 |       foreachModel: title,
 3398 |       competitorModels: [],
 3399 |       quantity: 1,
```

匹配：filter、productTypeId，第 3385 行

```tsx
 3375 | 
 3376 |       return next;
 3377 |     });
 3378 |   }
 3379 |   function resetCurrentFilters() {
 3380 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 3381 | 
 3382 |     setActiveProductTypeId(firstProductTypeId);
 3383 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 3384 |     setSearchKeyword("");
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
 3390 |     const title = getText(locale, product.cardTitle, product.productId);
 3391 | 
 3392 |     return {
 3393 |       sourceType: "pump-selection",
 3394 |       sourceLabel: "产品中心",
 3395 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 3396 |       productCode: product.productId,
 3397 |       foreachModel: title,
 3398 |       competitorModels: [],
 3399 |       quantity: 1,
 3400 |       needDrawing: false,
 3401 |       imagePath:
```

匹配：productTypeId，第 3395 行

```tsx
 3385 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 3386 |   }
 3387 |   function createProductCartItem(
 3388 |     product: ProductSelectionProduct
 3389 |   ): SelectionCartItemInput {
 3390 |     const title = getText(locale, product.cardTitle, product.productId);
 3391 | 
 3392 |     return {
 3393 |       sourceType: "pump-selection",
 3394 |       sourceLabel: "产品中心",
 3395 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 3396 |       productCode: product.productId,
 3397 |       foreachModel: title,
 3398 |       competitorModels: [],
 3399 |       quantity: 1,
 3400 |       needDrawing: false,
 3401 |       imagePath:
 3402 |       product.imageCard ||
 3403 |       (() => {
 3404 |         const text = Object.values(product as Record<string, unknown>).join(" ");
 3405 | 
 3406 |         if (/DPGL800/i.test(text)) {
 3407 |           return "/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp";
 3408 |         }
 3409 | 
 3410 |         if (/DPL30H/i.test(text)) {
 3411 |           return /(BB|brushless|无刷)/i.test(text)
```

匹配：productTypeId，第 3489 行

```tsx
 3479 |               mobileCategoryPrefix={pageText.mobileCategoryPrefix}
 3480 |               onToggleMobileCategory={() =>
 3481 |                 setMobileCategoryOpen((current) => !current)
 3482 |               }
 3483 |               onCategoryChange={handleCategoryChange}
 3484 |             />
 3485 | 
 3486 |             {activeProductTypeIntro ? (
 3487 |               <section
 3488 |                 className="product-type-intro-module"
 3489 |                 data-product-type-id={activeProductTypeId || ""}
 3490 |                 aria-label={locale === "zh" ? `${activeProductTypeIntro.title}产品种类说明` : `${activeProductTypeIntro.title} product type overview`}
 3491 |               >
 3492 |                 <div className="product-type-intro-image">
 3493 |                   <img
 3494 |                     src={activeProductTypeIntro.image.src}
 3495 |                     alt={activeProductTypeIntro.image.alt}
 3496 |                     loading="lazy"
 3497 |                   />
 3498 |                 </div>
 3499 | 
 3500 |                 <div className="product-type-intro-copy">
 3501 |                   <h2>{activeProductTypeIntro.title}</h2>
 3502 |                   {activeProductTypeIntro.paragraphs.map((paragraph) => {
 3503 |                     const emphasisText = "详情页查看或提交选型需求确认";
 3504 |                     const emphasisIndex = paragraph.indexOf(emphasisText);
 3505 | 
```

匹配：filter，第 3525 行

```tsx
 3515 |                     </strong>
 3516 |                     {paragraph.slice(emphasisIndex + emphasisText.length)}
 3517 |                   </p>
 3518 |                 );
 3519 |               })}
 3520 |             </div>
 3521 |           </section>
 3522 |         ) : null}
 3523 |         <section className="selection-section">
 3524 |           <div className="selection-layout">
 3525 |             <ProductFilterPanel
 3526 |               activeCategory={{
 3527 |                 ...activeCategory,
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
```

匹配：productTypeId，第 3533 行

```tsx
 3523 |         <section className="selection-section">
 3524 |           <div className="selection-layout">
 3525 |             <ProductFilterPanel
 3526 |               activeCategory={{
 3527 |                 ...activeCategory,
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
```

匹配：filter，第 3534 行

```tsx
 3524 |           <div className="selection-layout">
 3525 |             <ProductFilterPanel
 3526 |               activeCategory={{
 3527 |                 ...activeCategory,
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
```

匹配：filter，第 3535 行

```tsx
 3525 |             <ProductFilterPanel
 3526 |               activeCategory={{
 3527 |                 ...activeCategory,
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
```

匹配：filter，第 3536 行

```tsx
 3526 |               activeCategory={{
 3527 |                 ...activeCategory,
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
```

匹配：filter，第 3537 行

```tsx
 3527 |                 ...activeCategory,
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
 3553 | 
```

匹配：filter，第 3538 行

```tsx
 3528 |                 description:
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
 3553 | 
 3554 |               {matchedProducts.length > 0 ? (
```

匹配：filter，第 3539 行

```tsx
 3529 |                   typeof activeCategory.description === "string"
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
 3553 | 
 3554 |               {matchedProducts.length > 0 ? (
 3555 |                 <>
```

匹配：filter，第 3540 行

```tsx
 3530 |                     ? activeCategory.description
 3531 |                     : getText(locale, activeCategory.description as any, ""),
 3532 |               }}
 3533 |               activeProductTypeId={activeProductTypeId}
 3534 |               filterGroups={filterGroups}
 3535 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3536 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3537 |               isOptionActive={isFilterOptionActive}
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
 3553 | 
 3554 |               {matchedProducts.length > 0 ? (
 3555 |                 <>
 3556 |                   <ProductCardGrid
```

匹配：filter，第 3548 行

```tsx
 3538 |               isOptionDisabled={isProductFilterOptionDisabled}
 3539 |               onFilterChange={handleFilterChange}
 3540 |               emptyText={pageText.filterEmpty}
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
 3553 | 
 3554 |               {matchedProducts.length > 0 ? (
 3555 |                 <>
 3556 |                   <ProductCardGrid
 3557 |                     products={pagedProducts as any}
 3558 |                     selectedList={selectedList}
 3559 |                     detailButtonText={pageText.detailButton}
 3560 |                     addToListText={pageText.addToList}
 3561 |                     addedToListText={pageText.addedToList}
 3562 |                     getTitle={(product) =>
 3563 |                       getText(locale, product.cardTitle, product.productId)
 3564 |                     }
```

匹配：filter，第 3551 行

```tsx
 3541 |             />
 3542 | 
 3543 |             <section className="product-area">
 3544 |               <ProductSelectionToolbar
 3545 |                 total={matchedProducts.length}
 3546 |                 resultPrefix={pageText.resultPrefix}
 3547 |                 resultSuffix={pageText.resultSuffix}
 3548 |                 resetButtonText={pageText.resetFilters}
 3549 |                 selectedTags={selectedTagItems}
 3550 |                 onRemoveTag={removeSelectedTag}
 3551 |                 onResetFilters={resetCurrentFilters}
 3552 |               />
 3553 | 
 3554 |               {matchedProducts.length > 0 ? (
 3555 |                 <>
 3556 |                   <ProductCardGrid
 3557 |                     products={pagedProducts as any}
 3558 |                     selectedList={selectedList}
 3559 |                     detailButtonText={pageText.detailButton}
 3560 |                     addToListText={pageText.addToList}
 3561 |                     addedToListText={pageText.addedToList}
 3562 |                     getTitle={(product) =>
 3563 |                       getText(locale, product.cardTitle, product.productId)
 3564 |                     }
 3565 |                     getSubtitle={(product) =>
 3566 |                       getText(locale, product.cardSubtitle, "")
 3567 |                     }
```

## data/products/selection/product-route-map.ts

### import

```tsx
import type { SelectionFilterKey } from "./product-selection.types";
```

### 组件或函数入口

```tsx
未识别
```

### 关键词匹配：102

匹配：filter，第 17 行

```tsx
    7 |    2. query 链接继续作为临时筛选状态使用
    8 |    3. 动态路由用于 SEO / GEO / AI 抓取 / sitemap / canonical
    9 |    4. 当前建立：
   10 |       泵系列 → 产品类型 → 产品系列
   11 |    5. 产品类型先补齐：
   12 |       柱塞泵 / 隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵
   13 |    6. 柱塞泵下先预留：
   14 |       EA 常规柱塞泵 / SM 微型柱塞泵 / TM 超微型柱塞泵
   15 | ========================================================= */
   16 | 
   17 | import type { SelectionFilterKey } from "./product-selection.types";
   18 | 
   19 | export type ProductRouteInitialFilters = Partial<
   20 |   Record<SelectionFilterKey, string[]>
   21 | >;
   22 | 
   23 | export type ProductCategoryRouteEntry = {
   24 |   categoryId: string;
   25 |   label: string;
   26 |   title: string;
   27 |   description: string;
   28 | };
   29 | 
   30 | export type ProductTypeRouteEntry = {
   31 |   category: string;
   32 |   categoryId: string;
   33 |   productTypeId: string;
```

匹配：filter，第 19 行

```tsx
    9 |    4. 当前建立：
   10 |       泵系列 → 产品类型 → 产品系列
   11 |    5. 产品类型先补齐：
   12 |       柱塞泵 / 隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵
   13 |    6. 柱塞泵下先预留：
   14 |       EA 常规柱塞泵 / SM 微型柱塞泵 / TM 超微型柱塞泵
   15 | ========================================================= */
   16 | 
   17 | import type { SelectionFilterKey } from "./product-selection.types";
   18 | 
   19 | export type ProductRouteInitialFilters = Partial<
   20 |   Record<SelectionFilterKey, string[]>
   21 | >;
   22 | 
   23 | export type ProductCategoryRouteEntry = {
   24 |   categoryId: string;
   25 |   label: string;
   26 |   title: string;
   27 |   description: string;
   28 | };
   29 | 
   30 | export type ProductTypeRouteEntry = {
   31 |   category: string;
   32 |   categoryId: string;
   33 |   productTypeId: string;
   34 |   label: string;
   35 |   title: string;
```

匹配：filter，第 20 行

```tsx
   10 |       泵系列 → 产品类型 → 产品系列
   11 |    5. 产品类型先补齐：
   12 |       柱塞泵 / 隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵
   13 |    6. 柱塞泵下先预留：
   14 |       EA 常规柱塞泵 / SM 微型柱塞泵 / TM 超微型柱塞泵
   15 | ========================================================= */
   16 | 
   17 | import type { SelectionFilterKey } from "./product-selection.types";
   18 | 
   19 | export type ProductRouteInitialFilters = Partial<
   20 |   Record<SelectionFilterKey, string[]>
   21 | >;
   22 | 
   23 | export type ProductCategoryRouteEntry = {
   24 |   categoryId: string;
   25 |   label: string;
   26 |   title: string;
   27 |   description: string;
   28 | };
   29 | 
   30 | export type ProductTypeRouteEntry = {
   31 |   category: string;
   32 |   categoryId: string;
   33 |   productTypeId: string;
   34 |   label: string;
   35 |   title: string;
   36 |   description: string;
```

匹配：productTypeId，第 33 行

```tsx
   23 | export type ProductCategoryRouteEntry = {
   24 |   categoryId: string;
   25 |   label: string;
   26 |   title: string;
   27 |   description: string;
   28 | };
   29 | 
   30 | export type ProductTypeRouteEntry = {
   31 |   category: string;
   32 |   categoryId: string;
   33 |   productTypeId: string;
   34 |   label: string;
   35 |   title: string;
   36 |   description: string;
   37 | };
   38 | 
   39 | export type ProductSeriesRouteEntry = {
   40 |   category: string;
   41 |   slug: string;
   42 |   categoryId: string;
   43 |   productTypeId: string;
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
```

匹配：productTypeId，第 43 行

```tsx
   33 |   productTypeId: string;
   34 |   label: string;
   35 |   title: string;
   36 |   description: string;
   37 | };
   38 | 
   39 | export type ProductSeriesRouteEntry = {
   40 |   category: string;
   41 |   slug: string;
   42 |   categoryId: string;
   43 |   productTypeId: string;
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
   50 | };
   51 | 
   52 | export const productRouteMap: {
   53 |   categories: Record<string, ProductCategoryRouteEntry>;
   54 |   productTypes: Record<string, ProductTypeRouteEntry>;
   55 |   series: Record<string, ProductSeriesRouteEntry>;
   56 | } = {
   57 |   categories: {
   58 |     pumps: {
   59 |       categoryId: "pumps",
```

匹配：filter，第 44 行

```tsx
   34 |   label: string;
   35 |   title: string;
   36 |   description: string;
   37 | };
   38 | 
   39 | export type ProductSeriesRouteEntry = {
   40 |   category: string;
   41 |   slug: string;
   42 |   categoryId: string;
   43 |   productTypeId: string;
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
   50 | };
   51 | 
   52 | export const productRouteMap: {
   53 |   categories: Record<string, ProductCategoryRouteEntry>;
   54 |   productTypes: Record<string, ProductTypeRouteEntry>;
   55 |   series: Record<string, ProductSeriesRouteEntry>;
   56 | } = {
   57 |   categories: {
   58 |     pumps: {
   59 |       categoryId: "pumps",
   60 |       label: "泵系列",
```

匹配：filter，第 45 行

```tsx
   35 |   title: string;
   36 |   description: string;
   37 | };
   38 | 
   39 | export type ProductSeriesRouteEntry = {
   40 |   category: string;
   41 |   slug: string;
   42 |   categoryId: string;
   43 |   productTypeId: string;
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
   50 | };
   51 | 
   52 | export const productRouteMap: {
   53 |   categories: Record<string, ProductCategoryRouteEntry>;
   54 |   productTypes: Record<string, ProductTypeRouteEntry>;
   55 |   series: Record<string, ProductSeriesRouteEntry>;
   56 | } = {
   57 |   categories: {
   58 |     pumps: {
   59 |       categoryId: "pumps",
   60 |       label: "泵系列",
   61 |       title: "泵系列 | FOREACH",
```

匹配：filter，第 46 行

```tsx
   36 |   description: string;
   37 | };
   38 | 
   39 | export type ProductSeriesRouteEntry = {
   40 |   category: string;
   41 |   slug: string;
   42 |   categoryId: string;
   43 |   productTypeId: string;
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
   50 | };
   51 | 
   52 | export const productRouteMap: {
   53 |   categories: Record<string, ProductCategoryRouteEntry>;
   54 |   productTypes: Record<string, ProductTypeRouteEntry>;
   55 |   series: Record<string, ProductSeriesRouteEntry>;
   56 | } = {
   57 |   categories: {
   58 |     pumps: {
   59 |       categoryId: "pumps",
   60 |       label: "泵系列",
   61 |       title: "泵系列 | FOREACH",
   62 |       description:
```

匹配：productTypes，第 54 行

```tsx
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
   50 | };
   51 | 
   52 | export const productRouteMap: {
   53 |   categories: Record<string, ProductCategoryRouteEntry>;
   54 |   productTypes: Record<string, ProductTypeRouteEntry>;
   55 |   series: Record<string, ProductSeriesRouteEntry>;
   56 | } = {
   57 |   categories: {
   58 |     pumps: {
   59 |       categoryId: "pumps",
   60 |       label: "泵系列",
   61 |       title: "泵系列 | FOREACH",
   62 |       description:
   63 |         "恒永达泵系列产品覆盖自动化分析仪器、IVD、生命科学与实验室自动化设备中的精密液体处理需求。",
   64 |     },
   65 | 
   66 |     valves: {
   67 |       categoryId: "valves",
   68 |       label: "阀系列",
   69 |       title: "阀系列 | FOREACH",
   70 |       description:
```

匹配：堵头、过滤器、单向阀，第 95 行

```tsx
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
  108 | 
  109 |     "diaphragm-pumps": {
  110 |       category: "pumps",
  111 |       categoryId: "pumps",
```

匹配：productTypes，第 98 行

```tsx
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
  108 | 
  109 |     "diaphragm-pumps": {
  110 |       category: "pumps",
  111 |       categoryId: "pumps",
  112 |       productTypeId: "diaphragm-pump",
  113 |       label: "隔膜泵",
  114 |       title: "隔膜泵 | FOREACH",
```

匹配：productTypeId，第 102 行

```tsx
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
  108 | 
  109 |     "diaphragm-pumps": {
  110 |       category: "pumps",
  111 |       categoryId: "pumps",
  112 |       productTypeId: "diaphragm-pump",
  113 |       label: "隔膜泵",
  114 |       title: "隔膜泵 | FOREACH",
  115 |       description:
  116 |         "隔膜泵适用于清洗、废液、试剂输送和仪器内部中低流量液体传输场景。",
  117 |     },
  118 | 
```

匹配：productTypeId，第 112 行

```tsx
  102 |       productTypeId: "plunger-pump",
  103 |       label: "柱塞泵",
  104 |       title: "柱塞泵 | FOREACH",
  105 |       description:
  106 |         "柱塞泵适用于自动化分析仪器、IVD、生命科学和实验室自动化设备中的精密液体处理。",
  107 |     },
  108 | 
  109 |     "diaphragm-pumps": {
  110 |       category: "pumps",
  111 |       categoryId: "pumps",
  112 |       productTypeId: "diaphragm-pump",
  113 |       label: "隔膜泵",
  114 |       title: "隔膜泵 | FOREACH",
  115 |       description:
  116 |         "隔膜泵适用于清洗、废液、试剂输送和仪器内部中低流量液体传输场景。",
  117 |     },
  118 | 
  119 |     "pipetting-pumps": {
  120 |       category: "pumps",
  121 |       categoryId: "pumps",
  122 |       productTypeId: "pipette-pump",
  123 |       label: "移液泵",
  124 |       title: "移液泵 | FOREACH",
  125 |       description:
  126 |         "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
  127 |     },
  128 | 
```

匹配：productTypeId，第 122 行

```tsx
  112 |       productTypeId: "diaphragm-pump",
  113 |       label: "隔膜泵",
  114 |       title: "隔膜泵 | FOREACH",
  115 |       description:
  116 |         "隔膜泵适用于清洗、废液、试剂输送和仪器内部中低流量液体传输场景。",
  117 |     },
  118 | 
  119 |     "pipetting-pumps": {
  120 |       category: "pumps",
  121 |       categoryId: "pumps",
  122 |       productTypeId: "pipette-pump",
  123 |       label: "移液泵",
  124 |       title: "移液泵 | FOREACH",
  125 |       description:
  126 |         "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
  127 |     },
  128 | 
  129 |     "syringe-pumps": {
  130 |       category: "pumps",
  131 |       categoryId: "pumps",
  132 |       productTypeId: "syringe-pump",
  133 |       label: "注射泵",
  134 |       title: "注射泵 | FOREACH",
  135 |       description:
  136 |         "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
  137 |     },
  138 | 
```

匹配：productTypeId，第 132 行

```tsx
  122 |       productTypeId: "pipette-pump",
  123 |       label: "移液泵",
  124 |       title: "移液泵 | FOREACH",
  125 |       description:
  126 |         "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
  127 |     },
  128 | 
  129 |     "syringe-pumps": {
  130 |       category: "pumps",
  131 |       categoryId: "pumps",
  132 |       productTypeId: "syringe-pump",
  133 |       label: "注射泵",
  134 |       title: "注射泵 | FOREACH",
  135 |       description:
  136 |         "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
  137 |     },
  138 | 
  139 |     "valveless-pumps": {
  140 |       category: "pumps",
  141 |       categoryId: "pumps",
  142 |       productTypeId: "valveless-pump",
  143 |       label: "无阀泵",
  144 |       title: "无阀泵 | FOREACH",
  145 |       description:
  146 |         "无阀泵适用于简化液路结构、降低阀件依赖和提高系统集成度的精密液体处理场景。",
  147 |   
  148 |     },
```

匹配：productTypeId，第 142 行

```tsx
  132 |       productTypeId: "syringe-pump",
  133 |       label: "注射泵",
  134 |       title: "注射泵 | FOREACH",
  135 |       description:
  136 |         "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
  137 |     },
  138 | 
  139 |     "valveless-pumps": {
  140 |       category: "pumps",
  141 |       categoryId: "pumps",
  142 |       productTypeId: "valveless-pump",
  143 |       label: "无阀泵",
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
```

匹配：productTypeId，第 153 行

```tsx
  143 |       label: "无阀泵",
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
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
```

匹配：productTypeId，第 163 行

```tsx
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

匹配：productTypeId，第 173 行

```tsx
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

匹配：productTypeId，第 183 行

```tsx
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

匹配：productTypeId，第 193 行

```tsx
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

匹配：plug，第 200 行

```tsx
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
  210 |     "filters": {
  211 |       category: "fittings",
  212 |       categoryId: "fittings",
  213 |       productTypeId: "filters",
  214 |       label: "过滤器",
  215 |       title: "过滤器 | FOREACH",
  216 |       description:
```

匹配：plug、productTypeId，第 203 行

```tsx
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
```

匹配：堵头，第 204 行

```tsx
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
```

匹配：堵头，第 205 行

```tsx
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
  218 |     },
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
```

匹配：堵头，第 207 行

```tsx
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
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
  222 |       categoryId: "fittings",
  223 |       productTypeId: "check-valves",
```

匹配：filter，第 210 行

```tsx
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
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
  222 |       categoryId: "fittings",
  223 |       productTypeId: "check-valves",
  224 |       label: "单向阀",
  225 |       title: "单向阀 | FOREACH",
  226 |       description:
```

匹配：filter、productTypeId，第 213 行

```tsx
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
  229 | },
```

匹配：过滤器，第 214 行

```tsx
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
  229 | },
  230 | 
```

匹配：过滤器，第 215 行

```tsx
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
  228 | 
  229 | },
  230 | 
  231 |   },
```

匹配：过滤器，第 217 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
```

匹配：check-valve，第 220 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
```

匹配：check-valve、productTypeId，第 223 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
```

匹配：单向阀，第 224 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
```

匹配：单向阀，第 225 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
```

匹配：单向阀，第 227 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
```

匹配：productTypeId，第 238 行

```tsx
  228 | 
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
```

匹配：filter，第 239 行

```tsx
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
```

匹配：filter，第 240 行

```tsx
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
```

匹配：filter，第 241 行

```tsx
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
```

匹配：filter，第 242 行

```tsx
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
```

匹配：productTypeId，第 254 行

```tsx
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
  259 |       },
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
```

匹配：filter，第 255 行

```tsx
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
  259 |       },
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
```

匹配：filter，第 256 行

```tsx
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
  259 |       },
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
```

匹配：filter，第 257 行

```tsx
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
  259 |       },
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
```

匹配：filter，第 258 行

```tsx
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
  259 |       },
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
```

匹配：productTypeId，第 270 行

```tsx
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
  275 |       },
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
```

匹配：filter，第 271 行

```tsx
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
  275 |       },
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
```

匹配：filter，第 272 行

```tsx
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
  275 |       },
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
```

匹配：filter，第 273 行

```tsx
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
  275 |       },
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
```

匹配：filter，第 274 行

```tsx
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
  275 |       },
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
```

匹配：productTypeId，第 286 行

```tsx
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
  291 |       },
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
```

匹配：filter，第 287 行

```tsx
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
  291 |       },
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
```

匹配：filter，第 288 行

```tsx
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
  291 |       },
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
```

匹配：filter，第 289 行

```tsx
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
  291 |       },
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
```

匹配：filter，第 290 行

```tsx
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
  291 |       },
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
```

匹配：productTypeId，第 302 行

```tsx
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
  307 |       },
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
```

匹配：filter，第 303 行

```tsx
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
  307 |       },
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
```

匹配：filter，第 304 行

```tsx
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
  307 |       },
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
```

匹配：filter，第 305 行

```tsx
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
  307 |       },
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
```

匹配：filter，第 306 行

```tsx
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
  307 |       },
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
```

匹配：productTypeId，第 318 行

```tsx
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
  323 |       },
  324 |       label: "气液混合泵",
  325 |       title: "气液混合隔膜泵 | FOREACH",
  326 |       description:
  327 |         "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
  328 |     },
  329 | },
  330 | 
  331 | 
  332 | };
  333 | 
  334 | export function getCategoryRouteParams() {
```

匹配：filter，第 319 行

```tsx
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
  323 |       },
  324 |       label: "气液混合泵",
  325 |       title: "气液混合隔膜泵 | FOREACH",
  326 |       description:
  327 |         "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
  328 |     },
  329 | },
  330 | 
  331 | 
  332 | };
  333 | 
  334 | export function getCategoryRouteParams() {
  335 |   return Object.keys(productRouteMap.categories).map((category) => ({
```

匹配：filter，第 320 行

```tsx
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
  323 |       },
  324 |       label: "气液混合泵",
  325 |       title: "气液混合隔膜泵 | FOREACH",
  326 |       description:
  327 |         "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
  328 |     },
  329 | },
  330 | 
  331 | 
  332 | };
  333 | 
  334 | export function getCategoryRouteParams() {
  335 |   return Object.keys(productRouteMap.categories).map((category) => ({
  336 |     category,
```

匹配：filter，第 321 行

```tsx
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
  323 |       },
  324 |       label: "气液混合泵",
  325 |       title: "气液混合隔膜泵 | FOREACH",
  326 |       description:
  327 |         "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
  328 |     },
  329 | },
  330 | 
  331 | 
  332 | };
  333 | 
  334 | export function getCategoryRouteParams() {
  335 |   return Object.keys(productRouteMap.categories).map((category) => ({
  336 |     category,
  337 |   }));
```

匹配：filter，第 322 行

```tsx
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
  323 |       },
  324 |       label: "气液混合泵",
  325 |       title: "气液混合隔膜泵 | FOREACH",
  326 |       description:
  327 |         "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
  328 |     },
  329 | },
  330 | 
  331 | 
  332 | };
  333 | 
  334 | export function getCategoryRouteParams() {
  335 |   return Object.keys(productRouteMap.categories).map((category) => ({
  336 |     category,
  337 |   }));
  338 | }
```

匹配：productTypes，第 341 行

```tsx
  331 | 
  332 | };
  333 | 
  334 | export function getCategoryRouteParams() {
  335 |   return Object.keys(productRouteMap.categories).map((category) => ({
  336 |     category,
  337 |   }));
  338 | }
  339 | 
  340 | export function getProductTypeRouteParams() {
  341 |   return Object.entries(productRouteMap.productTypes).map(([slug, route]) => ({
  342 |     category: route.category,
  343 |     slug,
  344 |   }));
  345 | }
  346 | 
  347 | export function getSeriesRouteParams() {
  348 |   return Object.entries(productRouteMap.series).map(([seriesSlug, route]) => ({
  349 |     category: route.category,
  350 |     slug: route.slug,
  351 |     seriesSlug,
  352 |   }));
  353 | }
  354 | 
  355 | export function resolveCategoryRoute(category: string) {
  356 |   return productRouteMap.categories[category] || null;
  357 | }
```

匹配：productTypes，第 360 行

```tsx
  350 |     slug: route.slug,
  351 |     seriesSlug,
  352 |   }));
  353 | }
  354 | 
  355 | export function resolveCategoryRoute(category: string) {
  356 |   return productRouteMap.categories[category] || null;
  357 | }
  358 | 
  359 | export function resolveProductTypeRoute(category: string, slug: string) {
  360 |   const route = productRouteMap.productTypes[slug];
  361 | 
  362 |   if (!route || route.category !== category) {
  363 |     return null;
  364 |   }
  365 | 
  366 |   return route;
  367 | }
  368 | 
  369 | export function resolveSeriesRoute(
  370 |   category: string,
  371 |   slug: string,
  372 |   seriesSlug: string
  373 | ) {
  374 |   const route = productRouteMap.series[seriesSlug];
  375 | 
  376 |   if (!route || route.category !== category || route.slug !== slug) {
```

匹配：productTypeId，第 385 行

```tsx
  375 | 
  376 |   if (!route || route.category !== category || route.slug !== slug) {
  377 |     return null;
  378 |   }
  379 | 
  380 |   return route;
  381 | }
  382 | 
  383 | export function hasProductTypeRouteByIds(
  384 |   categoryId: string,
  385 |   productTypeId: string
  386 | ) {
  387 |   return Object.values(productRouteMap.productTypes).some((route) => {
  388 |     return (
  389 |       route.categoryId === categoryId &&
  390 |       route.productTypeId === productTypeId
  391 |     );
  392 |   });
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
```

匹配：productTypes，第 387 行

```tsx
  377 |     return null;
  378 |   }
  379 | 
  380 |   return route;
  381 | }
  382 | 
  383 | export function hasProductTypeRouteByIds(
  384 |   categoryId: string,
  385 |   productTypeId: string
  386 | ) {
  387 |   return Object.values(productRouteMap.productTypes).some((route) => {
  388 |     return (
  389 |       route.categoryId === categoryId &&
  390 |       route.productTypeId === productTypeId
  391 |     );
  392 |   });
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
  402 |         route.categoryId === categoryId &&
  403 |         route.productTypeId === productTypeId
```

匹配：productTypeId，第 390 行

```tsx
  380 |   return route;
  381 | }
  382 | 
  383 | export function hasProductTypeRouteByIds(
  384 |   categoryId: string,
  385 |   productTypeId: string
  386 | ) {
  387 |   return Object.values(productRouteMap.productTypes).some((route) => {
  388 |     return (
  389 |       route.categoryId === categoryId &&
  390 |       route.productTypeId === productTypeId
  391 |     );
  392 |   });
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
  402 |         route.categoryId === categoryId &&
  403 |         route.productTypeId === productTypeId
  404 |       );
  405 |     }
  406 |   );
```

匹配：productTypeId，第 397 行

```tsx
  387 |   return Object.values(productRouteMap.productTypes).some((route) => {
  388 |     return (
  389 |       route.categoryId === categoryId &&
  390 |       route.productTypeId === productTypeId
  391 |     );
  392 |   });
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
  402 |         route.categoryId === categoryId &&
  403 |         route.productTypeId === productTypeId
  404 |       );
  405 |     }
  406 |   );
  407 | 
  408 |   if (!matchedRoute) {
  409 |     return null;
  410 |   }
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
```

匹配：productTypes，第 399 行

```tsx
  389 |       route.categoryId === categoryId &&
  390 |       route.productTypeId === productTypeId
  391 |     );
  392 |   });
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
  402 |         route.categoryId === categoryId &&
  403 |         route.productTypeId === productTypeId
  404 |       );
  405 |     }
  406 |   );
  407 | 
  408 |   if (!matchedRoute) {
  409 |     return null;
  410 |   }
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
```

匹配：productTypeId，第 403 行

```tsx
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
  402 |         route.categoryId === categoryId &&
  403 |         route.productTypeId === productTypeId
  404 |       );
  405 |     }
  406 |   );
  407 | 
  408 |   if (!matchedRoute) {
  409 |     return null;
  410 |   }
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
  416 | 
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
```

匹配：filter，第 417 行

```tsx
  407 | 
  408 |   if (!matchedRoute) {
  409 |     return null;
  410 |   }
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
  416 | 
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
```

匹配：productTypes，第 418 行

```tsx
  408 |   if (!matchedRoute) {
  409 |     return null;
  410 |   }
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
  416 | 
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
```

匹配：filter，第 419 行

```tsx
  409 |     return null;
  410 |   }
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
  416 | 
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
```

匹配：productTypeId，第 421 行

```tsx
  411 | 
  412 |   const [slug, route] = matchedRoute;
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
  416 | 
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
```

匹配：productTypeId，第 423 行

```tsx
  413 | 
  414 |   return `/products/${route.category}/${slug}`;
  415 | }
  416 | 
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
```

匹配：filter，第 427 行

```tsx
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
```

匹配：productTypeId，第 429 行

```tsx
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
```

匹配：filter，第 430 行

```tsx
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
  446 |   }
```

匹配：filter，第 431 行

```tsx
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
  446 |   }
  447 | 
```

匹配：productTypeId，第 437 行

```tsx
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
  446 |   }
  447 | 
  448 |   const [seriesSlug, route] = matchedRoute;
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
```

匹配：filter，第 438 行

```tsx
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
  446 |   }
  447 | 
  448 |   const [seriesSlug, route] = matchedRoute;
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
```

匹配：filter，第 439 行

```tsx
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
  446 |   }
  447 | 
  448 |   const [seriesSlug, route] = matchedRoute;
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
```

匹配：filter，第 453 行

```tsx
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
  446 |   }
  447 | 
  448 |   const [seriesSlug, route] = matchedRoute;
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
```

匹配：productTypeId，第 455 行

```tsx
  445 |     return null;
  446 |   }
  447 | 
  448 |   const [seriesSlug, route] = matchedRoute;
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
  471 | }
```

匹配：filter，第 456 行

```tsx
  446 |   }
  447 | 
  448 |   const [seriesSlug, route] = matchedRoute;
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
  471 | }
  472 | 
```

匹配：filter，第 459 行

```tsx
  449 | 
  450 |   return `/products/${route.category}/${route.slug}/${seriesSlug}`;
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
  471 | }
  472 | 
  473 | /* =========================================================
  474 |    productTypeIntroMap
  475 |    恒永达官网｜产品类型介绍模块数据
```

匹配：productTypeId，第 462 行

```tsx
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
  471 | }
  472 | 
  473 | /* =========================================================
  474 |    productTypeIntroMap
  475 |    恒永达官网｜产品类型介绍模块数据
  476 | 
  477 |    说明：
  478 |    1. 这里专门管理产品类型介绍横幅的数据
```

匹配：filter，第 463 行

```tsx
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
  471 | }
  472 | 
  473 | /* =========================================================
  474 |    productTypeIntroMap
  475 |    恒永达官网｜产品类型介绍模块数据
  476 | 
  477 |    说明：
  478 |    1. 这里专门管理产品类型介绍横幅的数据
  479 |    2. 每个产品类型都有独立标题、段落、图片路径和 alt
```

匹配：filter，第 467 行

```tsx
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
  471 | }
  472 | 
  473 | /* =========================================================
  474 |    productTypeIntroMap
  475 |    恒永达官网｜产品类型介绍模块数据
  476 | 
  477 |    说明：
  478 |    1. 这里专门管理产品类型介绍横幅的数据
  479 |    2. 每个产品类型都有独立标题、段落、图片路径和 alt
  480 |    3. 图片当前使用 WebP 占位文件，后续直接同名替换真实图片即可
  481 |    4. 该模块用于 SEO / GEO，让搜索引擎和 AI 明确识别每个产品类型页面
  482 | ========================================================= */
  483 | 
```

匹配：productTypeId，第 486 行

```tsx
  476 | 
  477 |    说明：
  478 |    1. 这里专门管理产品类型介绍横幅的数据
  479 |    2. 每个产品类型都有独立标题、段落、图片路径和 alt
  480 |    3. 图片当前使用 WebP 占位文件，后续直接同名替换真实图片即可
  481 |    4. 该模块用于 SEO / GEO，让搜索引擎和 AI 明确识别每个产品类型页面
  482 | ========================================================= */
  483 | 
  484 | export type ProductTypeIntroEntry = {
  485 |   categoryId: string;
  486 |   productTypeId: string;
  487 |   title: string;
  488 |   paragraphs: string[];
  489 |   image: {
  490 |     src: string;
  491 |     alt: string;
  492 |   };
  493 | };
  494 | 
  495 | export const productTypeIntroMap: Record<string, ProductTypeIntroEntry> = {
  496 |   "pumps:plunger-pump": {
  497 |     categoryId: "pumps",
  498 |     productTypeId: "plunger-pump",
  499 |     title: "柱塞泵系列",
  500 |     paragraphs: [
  501 |       "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
  502 |       "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型，并支持与电磁阀、控制器、光耦反馈及泵阀一体化方案组合使用。",
```

匹配：productTypeId，第 498 行

```tsx
  488 |   paragraphs: string[];
  489 |   image: {
  490 |     src: string;
  491 |     alt: string;
  492 |   };
  493 | };
  494 | 
  495 | export const productTypeIntroMap: Record<string, ProductTypeIntroEntry> = {
  496 |   "pumps:plunger-pump": {
  497 |     categoryId: "pumps",
  498 |     productTypeId: "plunger-pump",
  499 |     title: "柱塞泵系列",
  500 |     paragraphs: [
  501 |       "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
  502 |       "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型，并支持与电磁阀、控制器、光耦反馈及泵阀一体化方案组合使用。",
  503 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  504 |     ],
  505 |     image: {
  506 |       src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
  507 |       alt: "FOREACH 柱塞泵系列产品图，用于IVD、生命科学和实验室自动化设备中的精密液体处理"
  508 |     }
  509 |   },
  510 | 
  511 |   "pumps:diaphragm-pump": {
  512 |     categoryId: "pumps",
  513 |     productTypeId: "diaphragm-pump",
  514 |     title: "隔膜泵系列",
```

匹配：productTypeId，第 513 行

```tsx
  503 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  504 |     ],
  505 |     image: {
  506 |       src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
  507 |       alt: "FOREACH 柱塞泵系列产品图，用于IVD、生命科学和实验室自动化设备中的精密液体处理"
  508 |     }
  509 |   },
  510 | 
  511 |   "pumps:diaphragm-pump": {
  512 |     categoryId: "pumps",
  513 |     productTypeId: "diaphragm-pump",
  514 |     title: "隔膜泵系列",
  515 |     paragraphs: [
  516 |       "恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
  517 |       "产品按应用介质和工况分为气体隔膜泵、液体隔膜泵和气液混合隔膜泵三类，可根据流量、耐压、自吸能力、膜片材质、阀片材质和安装空间进行选型。",
  518 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
  519 |     ],
  520 |     image: {
  521 |       src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
  522 |       alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
  523 |     }
  524 |   },
  525 | 
  526 |   "pumps:pipette-pump": {
  527 |     categoryId: "pumps",
  528 |     productTypeId: "pipette-pump",
  529 |     title: "移液泵系列",
```

匹配：productTypeId，第 528 行

```tsx
  518 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
  519 |     ],
  520 |     image: {
  521 |       src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
  522 |       alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
  523 |     }
  524 |   },
  525 | 
  526 |   "pumps:pipette-pump": {
  527 |     categoryId: "pumps",
  528 |     productTypeId: "pipette-pump",
  529 |     title: "移液泵系列",
  530 |     paragraphs: [
  531 |       "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
  532 |       "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
  533 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  534 |     ],
  535 |     image: {
  536 |       src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
  537 |       alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"
  538 |     }
  539 |   },
  540 | 
  541 |   "pumps:syringe-pump": {
  542 |     categoryId: "pumps",
  543 |     productTypeId: "syringe-pump",
  544 |     title: "注射泵系列",
```

匹配：productTypeId，第 543 行

```tsx
  533 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  534 |     ],
  535 |     image: {
  536 |       src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
  537 |       alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"
  538 |     }
  539 |   },
  540 | 
  541 |   "pumps:syringe-pump": {
  542 |     categoryId: "pumps",
  543 |     productTypeId: "syringe-pump",
  544 |     title: "注射泵系列",
  545 |     paragraphs: [
  546 |       "恒永达注射泵系列适用于高精度进样、注液、梯度控制和稳定流量输出，可应用于分析仪器、实验室自动化、生命科学和精密液体处理系统。",
  547 |       "注射泵可根据注射器规格、行程分辨率、速度范围、控制方式和系统安装空间进行选型，适合需要稳定体积控制和精密注液的设备平台。",
  548 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  549 |     ],
  550 |     image: {
  551 |       src: "/images/products/pumps/product-types/syringe-pumps/foreach-syringe-pumps-product-type-intro.webp",
  552 |       alt: "FOREACH 注射泵系列产品图，用于高精度进样、注液和稳定流量输出"
  553 |     }
  554 |   },
  555 | 
  556 |   "pumps:valveless-pump": {
  557 |     categoryId: "pumps",
  558 |     productTypeId: "valveless-pump",
  559 |     title: "无阀泵系列",
```

匹配：productTypeId，第 558 行

```tsx
  548 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  549 |     ],
  550 |     image: {
  551 |       src: "/images/products/pumps/product-types/syringe-pumps/foreach-syringe-pumps-product-type-intro.webp",
  552 |       alt: "FOREACH 注射泵系列产品图，用于高精度进样、注液和稳定流量输出"
  553 |     }
  554 |   },
  555 | 
  556 |   "pumps:valveless-pump": {
  557 |     categoryId: "pumps",
  558 |     productTypeId: "valveless-pump",
  559 |     title: "无阀泵系列",
  560 |     paragraphs: [
  561 |       "恒永达无阀泵系列适用于需要简化液路结构、减少阀件依赖和提高系统集成度的精密液体处理场景，可用于紧凑型分析仪器和自动化设备。",
  562 |       "无阀泵通过结构设计减少传统阀件带来的维护和集成复杂度，适合对紧凑空间、低维护需求和稳定输送性能有要求的仪器液路。",
  563 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  564 |     ],
  565 |     image: {
  566 |       src: "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp",
  567 |       alt: "FOREACH 无阀泵系列产品图，用于紧凑型仪器中的精密液体处理"
  568 |     }
  569 |   },
  570 | 
  571 |   "pumps:high-pressure-pump": {
  572 |     categoryId: "pumps",
  573 |     productTypeId: "high-pressure-pump",
  574 |     title: "高压泵系列",
```

匹配：productTypeId，第 573 行

```tsx
  563 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  564 |     ],
  565 |     image: {
  566 |       src: "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp",
  567 |       alt: "FOREACH 无阀泵系列产品图，用于紧凑型仪器中的精密液体处理"
  568 |     }
  569 |   },
  570 | 
  571 |   "pumps:high-pressure-pump": {
  572 |     categoryId: "pumps",
  573 |     productTypeId: "high-pressure-pump",
  574 |     title: "高压泵系列",
  575 |     paragraphs: [
  576 |       "恒永达高压泵系列适用于对压力稳定性、耐压能力和连续输送性能要求较高的分析仪器液路场景。",
  577 |       "该系列可用于需要稳定压力输出、精密流量控制和高可靠性液体输送的仪器平台，并可根据压力范围、流量需求、材料兼容性和系统接口进行配置。",
  578 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  579 |     ],
  580 |     image: {
  581 |       src: "/images/products/pumps/product-types/high-pressure-pumps/foreach-high-pressure-pumps-product-type-intro.webp",
  582 |       alt: "FOREACH 高压泵系列产品图，用于高压力稳定输送和分析仪器液路"
  583 |     }
  584 |   }
  585 | };
  586 | 
  587 | export function getProductTypeIntroByIds(
  588 |   categoryId: string,
  589 |   productTypeId: string
```

匹配：productTypeId，第 589 行

```tsx
  579 |     ],
  580 |     image: {
  581 |       src: "/images/products/pumps/product-types/high-pressure-pumps/foreach-high-pressure-pumps-product-type-intro.webp",
  582 |       alt: "FOREACH 高压泵系列产品图，用于高压力稳定输送和分析仪器液路"
  583 |     }
  584 |   }
  585 | };
  586 | 
  587 | export function getProductTypeIntroByIds(
  588 |   categoryId: string,
  589 |   productTypeId: string
  590 | ) {
  591 |   return productTypeIntroMap[`${categoryId}:${productTypeId}`] || null;
  592 | }
  593 | 
  594 | 
  595 | 
  596 | export const tubingProductRouteMap = {
  597 |   "pvc-tubing": "/products/tubing/pvc-tubing",
  598 |   "tpu-tubing": "/products/tubing/tpu-tubing",
  599 |   "fep-tubing": "/products/tubing/fep-tubing",
  600 |   "ptfe-tubing": "/products/tubing/ptfe-tubing",
  601 |   "peek-tubing": "/products/tubing/peek-tubing",
  602 |   "pfa-tubing": "/products/tubing/pfa-tubing",
  603 | };
  604 | 
  605 | 
```

匹配：productTypeId，第 591 行

```tsx
  581 |       src: "/images/products/pumps/product-types/high-pressure-pumps/foreach-high-pressure-pumps-product-type-intro.webp",
  582 |       alt: "FOREACH 高压泵系列产品图，用于高压力稳定输送和分析仪器液路"
  583 |     }
  584 |   }
  585 | };
  586 | 
  587 | export function getProductTypeIntroByIds(
  588 |   categoryId: string,
  589 |   productTypeId: string
  590 | ) {
  591 |   return productTypeIntroMap[`${categoryId}:${productTypeId}`] || null;
  592 | }
  593 | 
  594 | 
  595 | 
  596 | export const tubingProductRouteMap = {
  597 |   "pvc-tubing": "/products/tubing/pvc-tubing",
  598 |   "tpu-tubing": "/products/tubing/tpu-tubing",
  599 |   "fep-tubing": "/products/tubing/fep-tubing",
  600 |   "ptfe-tubing": "/products/tubing/ptfe-tubing",
  601 |   "peek-tubing": "/products/tubing/peek-tubing",
  602 |   "pfa-tubing": "/products/tubing/pfa-tubing",
  603 | };
  604 | 
  605 | 
  606 | 
  607 | 
```

## 选型目录全局精确搜索

### components/products/selection/ProductFilterPanel.tsx

匹配：堵头，第 72 行

```tsx
   64 |     number
   65 |   > = {
   66 |     "直通型": 2,
   67 |     "L型": 2,
   68 |     "T型": 3,
   69 |     "Y型": 3,
   70 |     "π型": 1,
   71 |     "十字型": 1,
   72 |     "倒刺堵头": 1,
   73 |   };
   74 | 
   75 |   return portCountMap[structure] || 3;
   76 | }
   77 | 
   78 | function BarbedPortFilterGroup({
   79 |   filterGroups,
   80 |   isOptionActive,
   81 |   isOptionDisabled,
   82 |   onFilterChange,
   83 | }: {
   84 |   filterGroups:
   85 |     ProductSelectionFilterGroup[];
   86 | 
```

### data/products/selection/barbed-fitting-selection.generated.ts

匹配：堵头，第 9372 行

```tsx
 9364 |     "productCode": "809283",
 9365 |     "sourceType": "barbed-fitting-selection",
 9366 |     "categoryId": "fittings",
 9367 |     "categoryLabel": "接头系列",
 9368 |     "productTypeId": "barbed-fittings",
 9369 |     "productTypeName": "倒刺接头",
 9370 |     "seriesId": "bbl",
 9371 |     "seriesCode": "BBL",
 9372 |     "seriesName": "倒刺堵头",
 9373 |     "model": "BBL-16D-PP-N",
 9374 |     "cardTitle": {
 9375 |       "zh": "BBL-16D-PP-N",
 9376 |       "en": "BBL-16D-PP-N",
 9377 |       "es": "BBL-16D-PP-N",
 9378 |       "fr": "BBL-16D-PP-N",
 9379 |       "ko": "BBL-16D-PP-N",
 9380 |       "ru": "BBL-16D-PP-N"
 9381 |     },
 9382 |     "cardSubtitle": {
 9383 |       "zh": "倒刺堵头\n适用1.6 mm内径软管\nPP材质，本色",
 9384 |       "en": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9385 |       "es": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9386 |       "fr": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
```

匹配：堵头，第 9383 行

```tsx
 9375 |       "zh": "BBL-16D-PP-N",
 9376 |       "en": "BBL-16D-PP-N",
 9377 |       "es": "BBL-16D-PP-N",
 9378 |       "fr": "BBL-16D-PP-N",
 9379 |       "ko": "BBL-16D-PP-N",
 9380 |       "ru": "BBL-16D-PP-N"
 9381 |     },
 9382 |     "cardSubtitle": {
 9383 |       "zh": "倒刺堵头\n适用1.6 mm内径软管\nPP材质，本色",
 9384 |       "en": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9385 |       "es": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9386 |       "fr": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9387 |       "ko": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9388 |       "ru": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色"
 9389 |     },
 9390 |     "filters": {
 9391 |       "filter01": "倒刺堵头",
 9392 |       "filter02": "1.6 mm",
 9393 |       "filter03": "",
 9394 |       "filter04": "",
 9395 |       "filter05": "PP",
 9396 |       "filter06": "本色"
 9397 |     },
```

匹配：堵头，第 9391 行

```tsx
 9383 |       "zh": "倒刺堵头\n适用1.6 mm内径软管\nPP材质，本色",
 9384 |       "en": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9385 |       "es": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9386 |       "fr": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9387 |       "ko": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色",
 9388 |       "ru": "Barbed Plug\nTube ID: 1.6 mm\nPP body | 本色"
 9389 |     },
 9390 |     "filters": {
 9391 |       "filter01": "倒刺堵头",
 9392 |       "filter02": "1.6 mm",
 9393 |       "filter03": "",
 9394 |       "filter04": "",
 9395 |       "filter05": "PP",
 9396 |       "filter06": "本色"
 9397 |     },
 9398 |     "portCount": 1,
 9399 |     "portValues": [
 9400 |       "1.6 mm"
 9401 |     ],
 9402 |     "materialCode": "PP",
 9403 |     "colorCode": "N",
 9404 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-16d-pp-n-main.jpg",
 9405 |     "detailSlug": "barbed-fittings",
```

匹配：堵头，第 9411 行

```tsx
 9403 |     "colorCode": "N",
 9404 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-16d-pp-n-main.jpg",
 9405 |     "detailSlug": "barbed-fittings",
 9406 |     "detailHref": "/products/fittings/barbed-fittings",
 9407 |     "status": "active",
 9408 |     "sourceIndex": 154,
 9409 |     "sortOrder": 70154,
 9410 |     "searchKeywords": {
 9411 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-16D-PP-N 809283 1.6 mm PP 本色",
 9412 |       "en": "barbed fitting Barbed Plug BBL BBL-16D-PP-N 809283 1.6 mm PP 本色",
 9413 |       "es": "barbed fitting Barbed Plug BBL BBL-16D-PP-N 809283 1.6 mm PP 本色",
 9414 |       "fr": "barbed fitting Barbed Plug BBL BBL-16D-PP-N 809283 1.6 mm PP 本色",
 9415 |       "ko": "barbed fitting Barbed Plug BBL BBL-16D-PP-N 809283 1.6 mm PP 本色",
 9416 |       "ru": "barbed fitting Barbed Plug BBL BBL-16D-PP-N 809283 1.6 mm PP 本色"
 9417 |     }
 9418 |   },
 9419 |   {
 9420 |     "productId": "809284",
 9421 |     "productCode": "809284",
 9422 |     "sourceType": "barbed-fitting-selection",
 9423 |     "categoryId": "fittings",
 9424 |     "categoryLabel": "接头系列",
 9425 |     "productTypeId": "barbed-fittings",
```

匹配：堵头，第 9429 行

```tsx
 9421 |     "productCode": "809284",
 9422 |     "sourceType": "barbed-fitting-selection",
 9423 |     "categoryId": "fittings",
 9424 |     "categoryLabel": "接头系列",
 9425 |     "productTypeId": "barbed-fittings",
 9426 |     "productTypeName": "倒刺接头",
 9427 |     "seriesId": "bbl",
 9428 |     "seriesCode": "BBL",
 9429 |     "seriesName": "倒刺堵头",
 9430 |     "model": "BBL-24D-PP-N",
 9431 |     "cardTitle": {
 9432 |       "zh": "BBL-24D-PP-N",
 9433 |       "en": "BBL-24D-PP-N",
 9434 |       "es": "BBL-24D-PP-N",
 9435 |       "fr": "BBL-24D-PP-N",
 9436 |       "ko": "BBL-24D-PP-N",
 9437 |       "ru": "BBL-24D-PP-N"
 9438 |     },
 9439 |     "cardSubtitle": {
 9440 |       "zh": "倒刺堵头\n适用2.4 mm内径软管\nPP材质，本色",
 9441 |       "en": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9442 |       "es": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9443 |       "fr": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
```

匹配：堵头，第 9440 行

```tsx
 9432 |       "zh": "BBL-24D-PP-N",
 9433 |       "en": "BBL-24D-PP-N",
 9434 |       "es": "BBL-24D-PP-N",
 9435 |       "fr": "BBL-24D-PP-N",
 9436 |       "ko": "BBL-24D-PP-N",
 9437 |       "ru": "BBL-24D-PP-N"
 9438 |     },
 9439 |     "cardSubtitle": {
 9440 |       "zh": "倒刺堵头\n适用2.4 mm内径软管\nPP材质，本色",
 9441 |       "en": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9442 |       "es": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9443 |       "fr": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9444 |       "ko": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9445 |       "ru": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色"
 9446 |     },
 9447 |     "filters": {
 9448 |       "filter01": "倒刺堵头",
 9449 |       "filter02": "2.4 mm",
 9450 |       "filter03": "",
 9451 |       "filter04": "",
 9452 |       "filter05": "PP",
 9453 |       "filter06": "本色"
 9454 |     },
```

匹配：堵头，第 9448 行

```tsx
 9440 |       "zh": "倒刺堵头\n适用2.4 mm内径软管\nPP材质，本色",
 9441 |       "en": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9442 |       "es": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9443 |       "fr": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9444 |       "ko": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色",
 9445 |       "ru": "Barbed Plug\nTube ID: 2.4 mm\nPP body | 本色"
 9446 |     },
 9447 |     "filters": {
 9448 |       "filter01": "倒刺堵头",
 9449 |       "filter02": "2.4 mm",
 9450 |       "filter03": "",
 9451 |       "filter04": "",
 9452 |       "filter05": "PP",
 9453 |       "filter06": "本色"
 9454 |     },
 9455 |     "portCount": 1,
 9456 |     "portValues": [
 9457 |       "2.4 mm"
 9458 |     ],
 9459 |     "materialCode": "PP",
 9460 |     "colorCode": "N",
 9461 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-24d-pp-n-main.jpg",
 9462 |     "detailSlug": "barbed-fittings",
```

匹配：堵头，第 9468 行

```tsx
 9460 |     "colorCode": "N",
 9461 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-24d-pp-n-main.jpg",
 9462 |     "detailSlug": "barbed-fittings",
 9463 |     "detailHref": "/products/fittings/barbed-fittings",
 9464 |     "status": "active",
 9465 |     "sourceIndex": 155,
 9466 |     "sortOrder": 70155,
 9467 |     "searchKeywords": {
 9468 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-24D-PP-N 809284 2.4 mm PP 本色",
 9469 |       "en": "barbed fitting Barbed Plug BBL BBL-24D-PP-N 809284 2.4 mm PP 本色",
 9470 |       "es": "barbed fitting Barbed Plug BBL BBL-24D-PP-N 809284 2.4 mm PP 本色",
 9471 |       "fr": "barbed fitting Barbed Plug BBL BBL-24D-PP-N 809284 2.4 mm PP 本色",
 9472 |       "ko": "barbed fitting Barbed Plug BBL BBL-24D-PP-N 809284 2.4 mm PP 本色",
 9473 |       "ru": "barbed fitting Barbed Plug BBL BBL-24D-PP-N 809284 2.4 mm PP 本色"
 9474 |     }
 9475 |   },
 9476 |   {
 9477 |     "productId": "809285",
 9478 |     "productCode": "809285",
 9479 |     "sourceType": "barbed-fitting-selection",
 9480 |     "categoryId": "fittings",
 9481 |     "categoryLabel": "接头系列",
 9482 |     "productTypeId": "barbed-fittings",
```

匹配：堵头，第 9486 行

```tsx
 9478 |     "productCode": "809285",
 9479 |     "sourceType": "barbed-fitting-selection",
 9480 |     "categoryId": "fittings",
 9481 |     "categoryLabel": "接头系列",
 9482 |     "productTypeId": "barbed-fittings",
 9483 |     "productTypeName": "倒刺接头",
 9484 |     "seriesId": "bbl",
 9485 |     "seriesCode": "BBL",
 9486 |     "seriesName": "倒刺堵头",
 9487 |     "model": "BBL-32D-PP-N",
 9488 |     "cardTitle": {
 9489 |       "zh": "BBL-32D-PP-N",
 9490 |       "en": "BBL-32D-PP-N",
 9491 |       "es": "BBL-32D-PP-N",
 9492 |       "fr": "BBL-32D-PP-N",
 9493 |       "ko": "BBL-32D-PP-N",
 9494 |       "ru": "BBL-32D-PP-N"
 9495 |     },
 9496 |     "cardSubtitle": {
 9497 |       "zh": "倒刺堵头\n适用3.2 mm内径软管\nPP材质，本色",
 9498 |       "en": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9499 |       "es": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9500 |       "fr": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
```

匹配：堵头，第 9497 行

```tsx
 9489 |       "zh": "BBL-32D-PP-N",
 9490 |       "en": "BBL-32D-PP-N",
 9491 |       "es": "BBL-32D-PP-N",
 9492 |       "fr": "BBL-32D-PP-N",
 9493 |       "ko": "BBL-32D-PP-N",
 9494 |       "ru": "BBL-32D-PP-N"
 9495 |     },
 9496 |     "cardSubtitle": {
 9497 |       "zh": "倒刺堵头\n适用3.2 mm内径软管\nPP材质，本色",
 9498 |       "en": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9499 |       "es": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9500 |       "fr": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9501 |       "ko": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9502 |       "ru": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色"
 9503 |     },
 9504 |     "filters": {
 9505 |       "filter01": "倒刺堵头",
 9506 |       "filter02": "3.2 mm",
 9507 |       "filter03": "",
 9508 |       "filter04": "",
 9509 |       "filter05": "PP",
 9510 |       "filter06": "本色"
 9511 |     },
```

匹配：堵头，第 9505 行

```tsx
 9497 |       "zh": "倒刺堵头\n适用3.2 mm内径软管\nPP材质，本色",
 9498 |       "en": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9499 |       "es": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9500 |       "fr": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9501 |       "ko": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色",
 9502 |       "ru": "Barbed Plug\nTube ID: 3.2 mm\nPP body | 本色"
 9503 |     },
 9504 |     "filters": {
 9505 |       "filter01": "倒刺堵头",
 9506 |       "filter02": "3.2 mm",
 9507 |       "filter03": "",
 9508 |       "filter04": "",
 9509 |       "filter05": "PP",
 9510 |       "filter06": "本色"
 9511 |     },
 9512 |     "portCount": 1,
 9513 |     "portValues": [
 9514 |       "3.2 mm"
 9515 |     ],
 9516 |     "materialCode": "PP",
 9517 |     "colorCode": "N",
 9518 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-32d-pp-n-main.jpg",
 9519 |     "detailSlug": "barbed-fittings",
```

匹配：堵头，第 9525 行

```tsx
 9517 |     "colorCode": "N",
 9518 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-32d-pp-n-main.jpg",
 9519 |     "detailSlug": "barbed-fittings",
 9520 |     "detailHref": "/products/fittings/barbed-fittings",
 9521 |     "status": "active",
 9522 |     "sourceIndex": 156,
 9523 |     "sortOrder": 70156,
 9524 |     "searchKeywords": {
 9525 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-32D-PP-N 809285 3.2 mm PP 本色",
 9526 |       "en": "barbed fitting Barbed Plug BBL BBL-32D-PP-N 809285 3.2 mm PP 本色",
 9527 |       "es": "barbed fitting Barbed Plug BBL BBL-32D-PP-N 809285 3.2 mm PP 本色",
 9528 |       "fr": "barbed fitting Barbed Plug BBL BBL-32D-PP-N 809285 3.2 mm PP 本色",
 9529 |       "ko": "barbed fitting Barbed Plug BBL BBL-32D-PP-N 809285 3.2 mm PP 本色",
 9530 |       "ru": "barbed fitting Barbed Plug BBL BBL-32D-PP-N 809285 3.2 mm PP 本色"
 9531 |     }
 9532 |   },
 9533 |   {
 9534 |     "productId": "809406",
 9535 |     "productCode": "809406",
 9536 |     "sourceType": "barbed-fitting-selection",
 9537 |     "categoryId": "fittings",
 9538 |     "categoryLabel": "接头系列",
 9539 |     "productTypeId": "barbed-fittings",
```

匹配：堵头，第 9543 行

```tsx
 9535 |     "productCode": "809406",
 9536 |     "sourceType": "barbed-fitting-selection",
 9537 |     "categoryId": "fittings",
 9538 |     "categoryLabel": "接头系列",
 9539 |     "productTypeId": "barbed-fittings",
 9540 |     "productTypeName": "倒刺接头",
 9541 |     "seriesId": "bbl",
 9542 |     "seriesCode": "BBL",
 9543 |     "seriesName": "倒刺堵头",
 9544 |     "model": "BBL-16D-PA-W",
 9545 |     "cardTitle": {
 9546 |       "zh": "BBL-16D-PA-W",
 9547 |       "en": "BBL-16D-PA-W",
 9548 |       "es": "BBL-16D-PA-W",
 9549 |       "fr": "BBL-16D-PA-W",
 9550 |       "ko": "BBL-16D-PA-W",
 9551 |       "ru": "BBL-16D-PA-W"
 9552 |     },
 9553 |     "cardSubtitle": {
 9554 |       "zh": "倒刺堵头\n适用1.6 mm内径软管\nPA材质，白色",
 9555 |       "en": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9556 |       "es": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9557 |       "fr": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
```

匹配：堵头，第 9554 行

```tsx
 9546 |       "zh": "BBL-16D-PA-W",
 9547 |       "en": "BBL-16D-PA-W",
 9548 |       "es": "BBL-16D-PA-W",
 9549 |       "fr": "BBL-16D-PA-W",
 9550 |       "ko": "BBL-16D-PA-W",
 9551 |       "ru": "BBL-16D-PA-W"
 9552 |     },
 9553 |     "cardSubtitle": {
 9554 |       "zh": "倒刺堵头\n适用1.6 mm内径软管\nPA材质，白色",
 9555 |       "en": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9556 |       "es": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9557 |       "fr": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9558 |       "ko": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9559 |       "ru": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色"
 9560 |     },
 9561 |     "filters": {
 9562 |       "filter01": "倒刺堵头",
 9563 |       "filter02": "1.6 mm",
 9564 |       "filter03": "",
 9565 |       "filter04": "",
 9566 |       "filter05": "PA",
 9567 |       "filter06": "白色"
 9568 |     },
```

匹配：堵头，第 9562 行

```tsx
 9554 |       "zh": "倒刺堵头\n适用1.6 mm内径软管\nPA材质，白色",
 9555 |       "en": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9556 |       "es": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9557 |       "fr": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9558 |       "ko": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色",
 9559 |       "ru": "Barbed Plug\nTube ID: 1.6 mm\nPA body | 白色"
 9560 |     },
 9561 |     "filters": {
 9562 |       "filter01": "倒刺堵头",
 9563 |       "filter02": "1.6 mm",
 9564 |       "filter03": "",
 9565 |       "filter04": "",
 9566 |       "filter05": "PA",
 9567 |       "filter06": "白色"
 9568 |     },
 9569 |     "portCount": 1,
 9570 |     "portValues": [
 9571 |       "1.6 mm"
 9572 |     ],
 9573 |     "materialCode": "PA",
 9574 |     "colorCode": "W",
 9575 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-16d-pa-w-main.jpg",
 9576 |     "detailSlug": "barbed-fittings",
```

匹配：堵头，第 9582 行

```tsx
 9574 |     "colorCode": "W",
 9575 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-16d-pa-w-main.jpg",
 9576 |     "detailSlug": "barbed-fittings",
 9577 |     "detailHref": "/products/fittings/barbed-fittings",
 9578 |     "status": "active",
 9579 |     "sourceIndex": 157,
 9580 |     "sortOrder": 70157,
 9581 |     "searchKeywords": {
 9582 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-16D-PA-W 809406 1.6 mm PA 白色",
 9583 |       "en": "barbed fitting Barbed Plug BBL BBL-16D-PA-W 809406 1.6 mm PA 白色",
 9584 |       "es": "barbed fitting Barbed Plug BBL BBL-16D-PA-W 809406 1.6 mm PA 白色",
 9585 |       "fr": "barbed fitting Barbed Plug BBL BBL-16D-PA-W 809406 1.6 mm PA 白色",
 9586 |       "ko": "barbed fitting Barbed Plug BBL BBL-16D-PA-W 809406 1.6 mm PA 白色",
 9587 |       "ru": "barbed fitting Barbed Plug BBL BBL-16D-PA-W 809406 1.6 mm PA 白色"
 9588 |     }
 9589 |   },
 9590 |   {
 9591 |     "productId": "809407",
 9592 |     "productCode": "809407",
 9593 |     "sourceType": "barbed-fitting-selection",
 9594 |     "categoryId": "fittings",
 9595 |     "categoryLabel": "接头系列",
 9596 |     "productTypeId": "barbed-fittings",
```

匹配：堵头，第 9600 行

```tsx
 9592 |     "productCode": "809407",
 9593 |     "sourceType": "barbed-fitting-selection",
 9594 |     "categoryId": "fittings",
 9595 |     "categoryLabel": "接头系列",
 9596 |     "productTypeId": "barbed-fittings",
 9597 |     "productTypeName": "倒刺接头",
 9598 |     "seriesId": "bbl",
 9599 |     "seriesCode": "BBL",
 9600 |     "seriesName": "倒刺堵头",
 9601 |     "model": "BBL-24D-PA-W",
 9602 |     "cardTitle": {
 9603 |       "zh": "BBL-24D-PA-W",
 9604 |       "en": "BBL-24D-PA-W",
 9605 |       "es": "BBL-24D-PA-W",
 9606 |       "fr": "BBL-24D-PA-W",
 9607 |       "ko": "BBL-24D-PA-W",
 9608 |       "ru": "BBL-24D-PA-W"
 9609 |     },
 9610 |     "cardSubtitle": {
 9611 |       "zh": "倒刺堵头\n适用2.4 mm内径软管\nPA材质，白色",
 9612 |       "en": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9613 |       "es": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9614 |       "fr": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
```

匹配：堵头，第 9611 行

```tsx
 9603 |       "zh": "BBL-24D-PA-W",
 9604 |       "en": "BBL-24D-PA-W",
 9605 |       "es": "BBL-24D-PA-W",
 9606 |       "fr": "BBL-24D-PA-W",
 9607 |       "ko": "BBL-24D-PA-W",
 9608 |       "ru": "BBL-24D-PA-W"
 9609 |     },
 9610 |     "cardSubtitle": {
 9611 |       "zh": "倒刺堵头\n适用2.4 mm内径软管\nPA材质，白色",
 9612 |       "en": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9613 |       "es": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9614 |       "fr": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9615 |       "ko": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9616 |       "ru": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色"
 9617 |     },
 9618 |     "filters": {
 9619 |       "filter01": "倒刺堵头",
 9620 |       "filter02": "2.4 mm",
 9621 |       "filter03": "",
 9622 |       "filter04": "",
 9623 |       "filter05": "PA",
 9624 |       "filter06": "白色"
 9625 |     },
```

匹配：堵头，第 9619 行

```tsx
 9611 |       "zh": "倒刺堵头\n适用2.4 mm内径软管\nPA材质，白色",
 9612 |       "en": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9613 |       "es": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9614 |       "fr": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9615 |       "ko": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色",
 9616 |       "ru": "Barbed Plug\nTube ID: 2.4 mm\nPA body | 白色"
 9617 |     },
 9618 |     "filters": {
 9619 |       "filter01": "倒刺堵头",
 9620 |       "filter02": "2.4 mm",
 9621 |       "filter03": "",
 9622 |       "filter04": "",
 9623 |       "filter05": "PA",
 9624 |       "filter06": "白色"
 9625 |     },
 9626 |     "portCount": 1,
 9627 |     "portValues": [
 9628 |       "2.4 mm"
 9629 |     ],
 9630 |     "materialCode": "PA",
 9631 |     "colorCode": "W",
 9632 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-24d-pa-w-main.jpg",
 9633 |     "detailSlug": "barbed-fittings",
```

匹配：堵头，第 9639 行

```tsx
 9631 |     "colorCode": "W",
 9632 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-24d-pa-w-main.jpg",
 9633 |     "detailSlug": "barbed-fittings",
 9634 |     "detailHref": "/products/fittings/barbed-fittings",
 9635 |     "status": "active",
 9636 |     "sourceIndex": 158,
 9637 |     "sortOrder": 70158,
 9638 |     "searchKeywords": {
 9639 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-24D-PA-W 809407 2.4 mm PA 白色",
 9640 |       "en": "barbed fitting Barbed Plug BBL BBL-24D-PA-W 809407 2.4 mm PA 白色",
 9641 |       "es": "barbed fitting Barbed Plug BBL BBL-24D-PA-W 809407 2.4 mm PA 白色",
 9642 |       "fr": "barbed fitting Barbed Plug BBL BBL-24D-PA-W 809407 2.4 mm PA 白色",
 9643 |       "ko": "barbed fitting Barbed Plug BBL BBL-24D-PA-W 809407 2.4 mm PA 白色",
 9644 |       "ru": "barbed fitting Barbed Plug BBL BBL-24D-PA-W 809407 2.4 mm PA 白色"
 9645 |     }
 9646 |   },
 9647 |   {
 9648 |     "productId": "809408",
 9649 |     "productCode": "809408",
 9650 |     "sourceType": "barbed-fitting-selection",
 9651 |     "categoryId": "fittings",
 9652 |     "categoryLabel": "接头系列",
 9653 |     "productTypeId": "barbed-fittings",
```

匹配：堵头，第 9657 行

```tsx
 9649 |     "productCode": "809408",
 9650 |     "sourceType": "barbed-fitting-selection",
 9651 |     "categoryId": "fittings",
 9652 |     "categoryLabel": "接头系列",
 9653 |     "productTypeId": "barbed-fittings",
 9654 |     "productTypeName": "倒刺接头",
 9655 |     "seriesId": "bbl",
 9656 |     "seriesCode": "BBL",
 9657 |     "seriesName": "倒刺堵头",
 9658 |     "model": "BBL-32D-PA-W",
 9659 |     "cardTitle": {
 9660 |       "zh": "BBL-32D-PA-W",
 9661 |       "en": "BBL-32D-PA-W",
 9662 |       "es": "BBL-32D-PA-W",
 9663 |       "fr": "BBL-32D-PA-W",
 9664 |       "ko": "BBL-32D-PA-W",
 9665 |       "ru": "BBL-32D-PA-W"
 9666 |     },
 9667 |     "cardSubtitle": {
 9668 |       "zh": "倒刺堵头\n适用3.2 mm内径软管\nPA材质，白色",
 9669 |       "en": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9670 |       "es": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9671 |       "fr": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
```

匹配：堵头，第 9668 行

```tsx
 9660 |       "zh": "BBL-32D-PA-W",
 9661 |       "en": "BBL-32D-PA-W",
 9662 |       "es": "BBL-32D-PA-W",
 9663 |       "fr": "BBL-32D-PA-W",
 9664 |       "ko": "BBL-32D-PA-W",
 9665 |       "ru": "BBL-32D-PA-W"
 9666 |     },
 9667 |     "cardSubtitle": {
 9668 |       "zh": "倒刺堵头\n适用3.2 mm内径软管\nPA材质，白色",
 9669 |       "en": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9670 |       "es": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9671 |       "fr": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9672 |       "ko": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9673 |       "ru": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色"
 9674 |     },
 9675 |     "filters": {
 9676 |       "filter01": "倒刺堵头",
 9677 |       "filter02": "3.2 mm",
 9678 |       "filter03": "",
 9679 |       "filter04": "",
 9680 |       "filter05": "PA",
 9681 |       "filter06": "白色"
 9682 |     },
```

匹配：堵头，第 9676 行

```tsx
 9668 |       "zh": "倒刺堵头\n适用3.2 mm内径软管\nPA材质，白色",
 9669 |       "en": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9670 |       "es": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9671 |       "fr": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9672 |       "ko": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色",
 9673 |       "ru": "Barbed Plug\nTube ID: 3.2 mm\nPA body | 白色"
 9674 |     },
 9675 |     "filters": {
 9676 |       "filter01": "倒刺堵头",
 9677 |       "filter02": "3.2 mm",
 9678 |       "filter03": "",
 9679 |       "filter04": "",
 9680 |       "filter05": "PA",
 9681 |       "filter06": "白色"
 9682 |     },
 9683 |     "portCount": 1,
 9684 |     "portValues": [
 9685 |       "3.2 mm"
 9686 |     ],
 9687 |     "materialCode": "PA",
 9688 |     "colorCode": "W",
 9689 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-32d-pa-w-main.jpg",
 9690 |     "detailSlug": "barbed-fittings",
```

匹配：堵头，第 9696 行

```tsx
 9688 |     "colorCode": "W",
 9689 |     "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-32d-pa-w-main.jpg",
 9690 |     "detailSlug": "barbed-fittings",
 9691 |     "detailHref": "/products/fittings/barbed-fittings",
 9692 |     "status": "active",
 9693 |     "sourceIndex": 159,
 9694 |     "sortOrder": 70159,
 9695 |     "searchKeywords": {
 9696 |       "zh": "倒刺接头 倒刺堵头 BBL BBL-32D-PA-W 809408 3.2 mm PA 白色",
 9697 |       "en": "barbed fitting Barbed Plug BBL BBL-32D-PA-W 809408 3.2 mm PA 白色",
 9698 |       "es": "barbed fitting Barbed Plug BBL BBL-32D-PA-W 809408 3.2 mm PA 白色",
 9699 |       "fr": "barbed fitting Barbed Plug BBL BBL-32D-PA-W 809408 3.2 mm PA 白色",
 9700 |       "ko": "barbed fitting Barbed Plug BBL BBL-32D-PA-W 809408 3.2 mm PA 白色",
 9701 |       "ru": "barbed fitting Barbed Plug BBL BBL-32D-PA-W 809408 3.2 mm PA 白色"
 9702 |     }
 9703 |   }
 9704 | ] as ProductSelectionProduct[];
 9705 | 
 9706 | export const barbedFittingTaxonomyItems =
 9707 | [
 9708 |   {
 9709 |     "type": "productType",
 9710 |     "id": "barbed-fittings",
```

### data/products/selection/hard-tube-fitting-selection.generated.ts

匹配：堵头，第 8 行

```tsx
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
   12 |   ProductSelectionFilterLabel,
   13 |   ProductSelectionProduct,
   14 |   ProductSelectionTaxonomyItem,
   15 | } from "./product-selection.types";
   16 | 
   17 | export const hardTubeFittingSelectionProducts =
   18 | [
   19 |   {
   20 |     "productId": "809746",
   21 |     "categoryId": "fittings",
   22 |     "productTypeId": "hard-tube-fittings",
```

### data/products/selection/product-route-map.ts

匹配：堵头、过滤器、单向阀，第 95 行

```tsx
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
  108 | 
  109 |     "diaphragm-pumps": {
```

匹配：堵头，第 204 行

```tsx
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

匹配：堵头，第 205 行

```tsx
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
  219 | 
```

匹配：堵头，第 207 行

```tsx
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
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
```

匹配：过滤器，第 214 行

```tsx
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

匹配：过滤器，第 215 行

```tsx
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
  229 | },
```

匹配：过滤器，第 217 行

```tsx
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
  229 | },
  230 | 
  231 |   },
```

匹配：单向阀，第 224 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
```

匹配：单向阀，第 225 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
```

匹配：单向阀，第 227 行

```tsx
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
  229 | },
  230 | 
  231 |   },
  232 | 
  233 |   series: {
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
```

