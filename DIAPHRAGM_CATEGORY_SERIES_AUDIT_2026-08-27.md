# FOREACH 微型隔膜泵分类页与 Series 页面结构审计

- 审计日期：2026-08-27（Asia/Shanghai）
- 项目目录：`F:\WebsiteProjects\foreach-website-2026`
- 线上主域：[https://www.foreachtek.com](https://www.foreachtek.com)
- 审计方式：线上原始 HTML、响应头、Sitemap、项目路由/组件/生成数据、正式 Excel 产品数据源交叉核查
- 审计性质：只读检查；除本报告外，未修改代码、产品数据、分类、SEO 元数据、URL、Sitemap、Canonical、Hreflang 或 JSON-LD，未 commit，未 deploy

## 1. 执行摘要

1. 中文和英文的 Liquid、Gas-Liquid、Gas 三个分类页均返回 HTTP 200，但原始 SSR HTML 都显示 0 个配置、空状态，且没有产品卡、产品链接或产品 JSON-LD。
2. 因此这不是“只有计数文案显示错误”，而是分类页实际关联结果为空；按题目给出的四种情况判断，属于“情况 2 + 路由层面的情况 4”。
3. Liquid 的直接根因是路由筛选值为“液体隔膜泵”，运行时卡片值却是“液泵”，严格匹配后 6 张卡全部被排除。
4. Gas-Liquid 的直接根因是路由筛选值为“气液混合隔膜泵”，运行时卡片值却是“气液混合泵”，DPGL800 卡片被排除。
5. Gas 使用同一筛选机制，但当前正式数据中确实没有纯气体隔膜泵，因此其业务数据真实为 0。
6. 三个分类页的 UI 归零链路相同，但 Liquid/Gas-Liquid 是命名错配，Gas 是无正式产品，不能简单归为完全相同的业务根因。
7. Diaphragm Pumps 总页中英文均实际输出 7 张卡：DPL30、DPL60、DPL30H 各 2 张，DPGL800 仅 FF/PS 1 张。
8. 正式 Excel 数据源包含 4 个 Series、27 条型号配置和 8 张选型卡；当前运行时只有 7 张卡，漏掉 DPGL800-24BS6-EP/PS。
9. 当前已发布 8 个独立 SKU 详情页；“27 条配置”不等于“27 个已发布 SKU 页面”，报告中已分层统计。
10. DPL30、DPL60、DPL30H、DPGL800 四个 Series URL 全部已经存在、HTTP 200、自引用 canonical、在 Sitemap 中，并输出 ProductModel 与 FAQPage JSON-LD。
11. 现有 Series 页并非缺页或薄中转页，但与 SKU 共用同一详情模板，并由首个配置推导 Title/H1，导致三个 DPL Series 被错误表达成“有刷”单一版本。
12. Series 数据中有 8/8/8/3 条型号配置，但组件只渲染 `modelRows`，当前传入的 `modelConfigurations` 未形成可见、可抓取的型号表或 SKU 链接。
13. 当前产品发现链是“Diaphragm Pumps 总页 → 7 个 SKU”，而不是“总类 → 子类 → Series → SKU”；产品导航中没有到子类和 Series 的普通链接。
14. DPGL800 在正式数据中归属 Gas-Liquid，不属于 Liquid；它出现在总页是同一 product type 的自动聚合，不是被人工归入 Liquid。
15. DPGL800 页面同时存在“工作介质：气体、气液混合物”和“可输送液体/可只抽液体”的冲突，并把“单头空载流量/最大正压”写成“额定流量/额定压力”。
16. 四个 Series 页按本任务评级标准均为 B：页面存在、可索引且内容不薄，但需要恢复系列级语义、显示配置、建立内链并消除与 SKU 的内容重叠。
17. 不建议新建第二套 Series Landing Page；应优先重构现有四个 Series URL 的页面职责。
18. 在没有纯气体产品和明确近期产品路线图证据的前提下，Gas 分类当前建议选 B（保留页面但 noindex）；若确认近期会上线正式产品，则可转为 D（未来产品页暂时保留）。

## 2. 三个分类页现状

### 2.1 中文与英文原始 HTML 结果

| 分类页 | URL | HTTP | 正式数据应关联 | HTML 实际产品卡数 | 页面显示数 | “0配置” | 空状态 | 产品 JSON-LD | Sitemap | 是否异常 |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| 中文 Liquid | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/) | 200 | 6 张运行时卡 / 3 Series | 0 | 0 | 是 | “暂无匹配配置” | 无 | 有 | 是 |
| 中文 Gas-Liquid | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/) | 200 | 1 张运行时卡 / 1 Series | 0 | 0 | 是 | “暂无匹配配置” | 无 | 有 | 是 |
| 中文 Gas | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/gas-diaphragm-pumps/) | 200 | 0 | 0 | 0 | 是 | “暂无匹配配置” | 无 | 有 | 数据上合理，索引策略异常 |
| English Liquid | [page](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/) | 200 | 6 cards / 3 Series | 0 | 0 | 是 | “No matching configurations” | 无 | 有 | 是 |
| English Gas-Liquid | [page](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/) | 200 | 1 card / 1 Series | 0 | 0 | 是 | “No matching configurations” | 无 | 有 | 是 |
| English Gas | [page](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-diaphragm-pumps/) | 200 | 0 | 0 | 0 | 是 | “No matching configurations” | 无 | 有 | 数据上合理，索引策略异常 |

补充核查：

- 六页均为 `Content-Type: text/html; charset=utf-8`，自引用 canonical。
- 六页原始 HTML 中 `class="product-card"`、`class="product-link"` 和 `application/ld+json` 数量都为 0。
- 六页都没有 H1。
- 中文页没有显式 robots meta；英文页显式 `index, follow`，因此当前都可索引。
- 英文页 selected tag 仍显示中文内部筛选值，如 `Diaphragm Pump | 液体隔膜泵`，说明英文页共用中文值域。
- 结论：**两边都有问题**；同一逻辑还影响 es/fr/ko/ru。

### 2.2 Metadata

| 页面 | Title | H1 | Meta Description | Canonical |
| --- | --- | --- | --- | --- |
| 中文 Liquid | 液体隔膜泵 \| FOREACH | 缺失 | 液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。 | 自引用 |
| 中文 Gas-Liquid | 气液混合隔膜泵 \| FOREACH | 缺失 | 气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。 | 自引用 |
| 中文 Gas | 气体隔膜泵 \| FOREACH | 缺失 | 气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。 | 自引用 |
| English Liquid | Liquid Diaphragm Pumps \| FOREACH | 缺失 | Explore Liquid Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. | 自引用 |
| English Gas-Liquid | GAS Liquid Diaphragm Pumps \| FOREACH | 缺失 | Explore GAS Liquid Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. | 自引用 |
| English Gas | GAS Diaphragm Pumps \| FOREACH | 缺失 | Explore GAS Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. | 自引用 |

### 2.3 “只是显示错误”判定

| 题目给定情况 | 是否符合 | 证据 |
| --- | --- | --- |
| 情况 1：产品存在，仅文字显示 0 | 否 | HTML 中没有产品卡或产品链接 |
| 情况 2：产品卡也完全没有显示 | 是 | 六页产品卡均为 0 |
| 情况 3：前端不显示，但 HTML/JSON-LD 有产品 | 否 | HTML 与 JSON-LD 中均无产品 |
| 情况 4：整个页面没有关联任何产品 | 路由结果层面是 | 过滤后 `matchedProducts=[]`；但 Liquid/Gas-Liquid 的底层正式产品仍存在 |

精确结论：**前端与 SSR 都得到空关联结果，是情况 2；从页面路由结果看也是情况 4。Liquid/Gas-Liquid 并不是数据库没有产品，而是严格筛选将产品全部排除。**

## 3. 根因分析

### 3.1 实际路由与组件链

中文三级页面：

- `app/products/[category]/[slug]/[seriesSlug]/page.tsx:25-28`：导入路由解析器。
- `app/products/[category]/[slug]/[seriesSlug]/page.tsx:416-418`：通过路由表生成静态参数。
- `app/products/[category]/[slug]/[seriesSlug]/page.tsx:625-655`：解析路由并把 `initialFilters` 传给 `ProductSelectionClient`。

国际页面：

- `app/[locale]/products/[...segments]/page.tsx:135-145`：为 en/es/fr/ko/ru 静态生成。
- `app/[locale]/products/[...segments]/page.tsx:176-195`：共用同一个选择组件和筛选值。
- `app/[locale]/products/[...segments]/page.tsx:345-353`：三级分类路由解析与渲染。

路由映射：

- `data/products/selection/product-route-map.ts:282-296`：Gas，注入 `filter01=["气体隔膜泵"]`。
- `data/products/selection/product-route-map.ts:298-312`：Liquid，注入 `filter01=["液体隔膜泵"]`。
- `data/products/selection/product-route-map.ts:314-328`：Gas-Liquid，注入 `filter01=["气液混合隔膜泵"]`。
- `data/products/selection/product-route-map.ts:347-352`：生成三级路由参数。
- `data/products/selection/product-route-map.ts:369-380`：按 category/slug/seriesSlug 解析。

运行时卡片数据：

- `data/products/selection/diaphragm-pump-selection.generated.ts:5-136`：DPL30 两卡，`filter01="液泵"`。
- `data/products/selection/diaphragm-pump-selection.generated.ts:139-270`：DPL60 两卡，`filter01="液泵"`。
- `data/products/selection/diaphragm-pump-selection.generated.ts:273-404`：DPL30H 两卡，`filter01="液泵"`。
- `data/products/selection/diaphragm-pump-selection.generated.ts:407-472`：DPGL800 仅 FF/PS 一卡，`filter01="气液混合泵"`。
- 该数组中没有任何 Gas 卡片。

过滤组件：

- `components/products/selection/ProductSelectionClient.tsx:198-220`：把隔膜泵卡片并入全局产品集合。
- `components/products/selection/ProductSelectionClient.tsx:1200-1235`：把路由 `initialFilters` 原样放入 `Set`。
- `components/products/selection/ProductSelectionClient.tsx:3591-3621`：通过 `selectedValues.has(item)` 做严格匹配。
- `components/products/selection/ProductSelectionClient.tsx:5017-5019`：显示 `matchedProducts.length`。
- `components/products/selection/ProductSelectionClient.tsx:5032-5084`：0 条时显示空状态。

### 3.2 精确失败链

```text
Liquid route.initialFilters = "液体隔膜泵"
运行时 DPL 卡片 filter01 = "液泵"
Set("液体隔膜泵").has("液泵") = false
6 张 DPL 卡全部排除
matchedProducts = []
SSR/前端显示 0 个配置
```

```text
Gas-Liquid route.initialFilters = "气液混合隔膜泵"
运行时 DPGL800 卡片 filter01 = "气液混合泵"
Set("气液混合隔膜泵").has("气液混合泵") = false
DPGL800 被排除
matchedProducts = []
SSR/前端显示 0 个配置
```

```text
Gas route.initialFilters = "气体隔膜泵"
运行时无任何 Gas 卡片
matchedProducts = []
显示 0 个配置
```

### 3.3 A—G 排查结论

| 排查项 | 结论 |
| --- | --- |
| A. Category slug 不一致 | 否。三个 URL slug 与路由表一致。 |
| B. Category ID / Type 不一致 | 否。`categoryId="pumps"`、`productTypeId="diaphragm-pump"` 正确。 |
| C. Series 与 SKU 数据层不同 | 存在结构问题，但不是分类页归零的直接原因；归零发生在选择卡 `filter01`。 |
| D. Locale 问题 | 不是单一 locale 问题；所有语言复用同一路由筛选值和组件。 |
| E. 静态生成问题 | 否。路由已静态生成、HTTP 200、Sitemap 收录；SSR 已稳定输出空结果。 |
| F. 前端过滤逻辑错误 | 是。严格相等本身可用，但路由与运行时数据使用了不同词表，导致全部被排除。 |
| G. 数据分类标签缺失/错误 | 正式 Excel 分类标签正确；错误出现在运行时生成卡片把正式名称缩写为“液泵/气液混合泵”。Gas 则确实无数据。 |

### 3.4 生成数据漂移

- 正式 Excel `02_选型卡片!A1:L9` 有 8 张卡，DPGL800 同时有 EP/PS 和 FF/PS。
- `data/products/generated/pumps/diaphragm-pumps/summary/summary.json:4-11` 仍记录 `selectionCardCount=8`。
- 但当前 `selection/cards.json` 与运行时 `diaphragm-pump-selection.generated.ts` 实际只有 7 张，仅保留 DPGL800 FF/PS。
- 这不是分类页归零的唯一原因，但会在修复词表后继续造成 Gas-Liquid 只显示 1 张卡、总页漏 1 个已发布 SKU。

## 4. 产品数据真实统计

### 4.1 必须区分的四个数量层级

| Category | Series | Excel 正式型号配置 | 已发布独立 SKU 详情页 | Excel 选型卡 | 当前运行时卡 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Liquid Diaphragm Pump | 3 | 24 | 6 | 6 | 6 |
| Gas-Liquid Diaphragm Pump | 1 | 3 | 2 | 2 | 1 |
| Gas Diaphragm Pump | 0 | 0 | 0 | 0 | 0 |
| 合计 | 4 | 27 | 8 | 8 | 7 |

本报告后文回答“SKU 数量”时，默认指**已发布独立 SKU 详情页**；同时附上 Excel 正式型号配置数，避免把配置行误当作已发布页面。

### 4.2 每个 Series 的真实数量

| Series | 分类 | Series 数 | Excel 具体配置 | 已发布 SKU 页 | 当前运行时卡 |
| --- | --- | ---: | ---: | ---: | ---: |
| DPL30 | Liquid | 1 | 8 | 2 | 2 |
| DPL60 | Liquid | 1 | 8 | 2 | 2 |
| DPL30H | Liquid | 1 | 8 | 2 | 2 |
| DPGL800 | Gas-Liquid | 1 | 3 | 2 | 1 |

配置维度：

- DPL30 / DPL60 / DPL30H：12V/24V × 有刷/无刷 × EP/PS 或 FF/PS，共各 8 条。
- DPGL800：`24BS6-EP/PS`、`24BS6-FF/PS`、`24BSC-EP/PS`，共 3 条。
- Gas-Liquid 除 DPGL800 外没有其他正式 Series 或 SKU。
- **当前产品数据库中没有 Gas Diaphragm Pump 正式产品。**

### 4.3 当前 8 个已发布 SKU 页面

Liquid：

- [DPL30-24DB-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/)
- [DPL30-24BB-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/)
- [DPL60-24DB-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/)
- [DPL60-24BB-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/)
- [DPL30H-24DS-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/)
- [DPL30H-24BS-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/)

Gas-Liquid：

- [DPGL800-24BS6-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/)
- [DPGL800-24BS6-FF/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/)

## 5. Series 页面现状

### 5.1 总表与 SEO 评级

| Series | URL | 是否存在 | HTTP | SEO 等级 | 是否值得作为 SEO 主页面 | 推荐角色 |
| --- | --- | --- | ---: | --- | --- | --- |
| DPL30 | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/) | 是 | 200 | B | 是 | DPL30 品牌系列、300 mL/min / 100 kPa 系列 Primary |
| DPL60 | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/) | 是 | 200 | B | 是 | DPL60 品牌系列、600 mL/min 系列 Primary |
| DPL30H | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/) | 是 | 200 | B | 是 | 高压 600 kPa、300 mL/min 系列 Primary |
| DPGL800 | [页面](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/) | 是 | 200 | B | 是，但须先统一产品边界 | 气液混合、负压抽吸、6 L/min 系列 Primary |

评级理由：

- 不是 A：页面职责和层级尚未建立，Title/H1 被首个配置带偏，配置不可见，且与 SKU 正文高度重复。
- 是 B：URL 已存在、可索引、自 canonical、有完整介绍、规格、FAQ、资源与相关文章，并非薄页。
- 不是 C：页面不是只有 SKU 列表或中转信息。
- 不是 D：全部 HTTP 200、在 Sitemap 中，且可索引。

### 5.2 每个中文 Series 的真实 Metadata

#### DPL30

- URL / Canonical：[https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/)
- HTTP：200
- Current Title：`DPL30 有刷液体隔膜泵｜300 mL/min 100 kPa｜FOREACH`
- H1：`DPL30系列有刷液体隔膜泵`
- Meta Description：`DPL30 有刷液体隔膜泵适用于常规液体输送和成本敏感型应用，流量 300 mL/min，额定压力 100 kPa。`
- Sitemap：是
- JSON-LD：有，含 ProductModel、FAQPage、BreadcrumbList、WebPage、WebSite、Organization

#### DPL60

- URL / Canonical：[https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/)
- HTTP：200
- Current Title：`DPL60 有刷液体隔膜泵｜600 mL/min 100 kPa｜FOREACH`
- H1：`DPL60系列有刷液体隔膜泵`
- Meta Description：`DPL60 有刷液体隔膜泵适用于较高流量常规液体输送与排液场景，流量 600 mL/min，额定压力 100 kPa。`
- Sitemap：是
- JSON-LD：有，含 ProductModel、FAQPage、BreadcrumbList、WebPage、WebSite、Organization

#### DPL30H

- URL / Canonical：[https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/)
- HTTP：200
- Current Title：`DPL30H 有刷液体隔膜泵｜300 mL/min 600 kPa｜FOREACH`
- H1：`DPL30H系列有刷高压液体隔膜泵`
- Meta Description：`DPL30H 有刷液体隔膜泵适用于较高出口压力液路系统，流量 300 mL/min，额定压力 600 kPa。`
- Sitemap：是
- JSON-LD：有，含 ProductModel、FAQPage、BreadcrumbList、WebPage、WebSite、Organization

#### DPGL800

- URL / Canonical：[https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/)
- HTTP：200
- Current Title：`DPGL800 无刷气液混合隔膜泵｜6 L/min｜FOREACH`
- H1：`DPGL800系列无刷气液混合隔膜泵`
- Meta Description：`DPGL800 无刷气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排，流量 6 L/min，最大负压＜-90 kPa。`
- Sitemap：是
- JSON-LD：有，含 ProductModel、FAQPage、BreadcrumbList、WebPage、WebSite、Organization

### 5.3 英文 Series 同步情况

| Series | English Title | English H1 | English Meta Description |
| --- | --- | --- | --- |
| DPL30 | DPL30 Liquid Diaphragm PUMP \| FOREACH | DPL30 Series Brushed Liquid Diaphragm Pump | Explore DPL30 Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. |
| DPL60 | DPL60 Liquid Diaphragm PUMP \| FOREACH | DPL60 Series Brushed Liquid Diaphragm Pump | Explore DPL60 Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. |
| DPL30H | DPL30H Liquid Diaphragm PUMP \| FOREACH | DPL30H Series Brushed High-Pressure Liquid Diaphragm Pump | Explore DPL30H Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. |
| DPGL800 | DPGL800 GAS Liquid Diaphragm PUMP \| FOREACH | DPGL800 Series Brushless Gas-Liquid Diaphragm Pump | Explore DPGL800 GAS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH. |

英文四页均 HTTP 200、自引用 canonical、在 Sitemap 中、有 H1 与 JSON-LD；DPL Series 同样被首配置表达成 Brushed。

### 5.4 页面内容组成

| Series | Series 介绍 | 核心规格行 | 配置数据 | Brushed/Brushless | 材料差异 | 可抓取 SKU 链接 | Datasheet/图纸 | FAQ | 技术文章链接 |
| --- | --- | ---: | --- | --- | --- | ---: | --- | ---: | ---: |
| DPL30 | 有 | 19 | 8 条，仅序列化/未形成可见型号表 | 数据中有，Title/H1 偏有刷 | 有 | 0 | 中文无普通 PDF；英文有 Datasheet + Drawing | 5 | 11 |
| DPL60 | 有 | 17 | 8 条，仅序列化/未形成可见型号表 | 数据中有，Title/H1 偏有刷 | 有 | 0 | 中文无普通 PDF；英文有 Datasheet + Drawing | 5 | 11 |
| DPL30H | 有 | 17 | 8 条，仅序列化/未形成可见型号表 | 数据中有，Title/H1 偏有刷 | 有 | 0 | 中文无普通 PDF；英文只有 Drawing | 5 | 8 |
| DPGL800 | 有 | 15 | 3 条，仅序列化/未形成可见型号表 | 仅无刷结构 | 有 | 0 | 中文无普通 PDF；英文只有 Drawing | 5 | 4 |

共同结构问题：

1. `app/products/pumps/diaphragm-pumps/[slug]/page.tsx:1-8` 读取同一个 `detail/index.json`。
2. `page.tsx:998-1012` 对 Series + SKU 共 12 条详情记录生成相同路由模板。
3. `page.tsx:354-449` 从首个 `modelConfigurations[0]` 推导型号/电机，导致 Series 被首 SKU 身份覆盖。
4. `page.tsx:841-918` 将数据适配给 `ProductDetailClient`，并传出 `modelConfigurations`。
5. `components/products/detail/ProductDetailClient.tsx:3450-3514` 实际只识别/渲染 `modelRows`，因此 8/3 条 Series 配置未形成可见表。
6. `ProductDetailClient.tsx:872-934` 将 pumps 页面统一回退成“该产品为定制品/联系我们”，进一步隐藏已存在的标准型号。
7. Series 与 SKU 面包屑都直接回到 Diaphragm Pumps 总页，没有 Category → Series 层级。

结论：**不需要新建 Series URL；需要让现有 Series URL 真正承担 Series Landing Page 角色。**

## 6. DPL 系列与 SKU 关键词关系

### 6.1 DPL30 Brushed / Brushless

| 项目 | 24DB 有刷 | 24BB 无刷 | 判断 |
| --- | --- | --- | --- |
| URL | [24DB](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/) | [24BB](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/) | 两个独立页 |
| Title | DPL30-24DB-EP/PS 液体隔膜泵 \| FOREACH | DPL30-24BB-EP/PS 液体隔膜泵 \| FOREACH | 料号区分明确 |
| H1 | DPL30系列有刷液体隔膜泵 | DPL30系列无刷液体隔膜泵 | 未显示完整 SKU，仍是系列级表达 |
| Description | 成本/基础输送 | 长期稳定/低维护 | 有电机定位差异 |
| 流量/压力 | 300 mL/min / 100 kPa | 300 mL/min / 100 kPa | 完全相同 |
| 电机/寿命 | 有刷 / 3,000 h | 无刷 / 10,000 h | 核心真实差异 |
| 材料 | EP/PS | EP/PS | 当前两页相同 |
| 正文 | 与 Series/另一 SKU 高度重叠 | 与 Series/另一 SKU 高度重叠 | 存在共同竞争宽词风险 |

当前 DPL30 Series 的可见正文与首个有刷 SKU 高度重叠，且 Title/H1 也被“有刷化”。未来 `300 mL/min diaphragm pump` 的宽泛、常规压力意图应优先由 **DPL30 Series** 承接；DPL30H 只承接高压限定意图；SKU 页只承接完整料号和电机/寿命等配置意图。

### 6.2 DPL60 Brushed / Brushless

| 项目 | 24DB 有刷 | 24BB 无刷 | 判断 |
| --- | --- | --- | --- |
| URL | [24DB](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/) | [24BB](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/) | 两个独立页 |
| Title | DPL60-24DB-EP/PS 液体隔膜泵 \| FOREACH | DPL60-24BB-EP/PS 液体隔膜泵 \| FOREACH | 料号区分明确 |
| H1 | DPL60系列有刷液体隔膜泵 | DPL60系列无刷液体隔膜泵 | 未显示完整 SKU |
| 流量/压力 | 600 mL/min / 100 kPa | 600 mL/min / 100 kPa | 完全相同 |
| 电机/寿命 | 有刷 / 3,000 h | 无刷 / 10,000 h | 核心真实差异 |
| 材料 | EP/PS | EP/PS | 当前两页相同 |
| 正文 | 与 Series/另一 SKU 高度重叠 | 与 Series/另一 SKU 高度重叠 | 存在宽词竞争 |

`600 mL/min diaphragm pump` 未来最适合由 **DPL60 Series** 作为 Primary Page；Liquid 分类承接更宽的品类意图，SKU 承接完整料号、有刷/无刷、寿命及配置意图。

### 6.3 DPL30H 高压意图

| 项目 | 24DS 有刷 | 24BS 无刷 | 判断 |
| --- | --- | --- | --- |
| URL | [24DS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/) | [24BS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/) | 两个独立页 |
| Title | DPL30H-24DS-EP/PS 液体隔膜泵 \| FOREACH | DPL30H-24BS-EP/PS 液体隔膜泵 \| FOREACH | 料号区分明确 |
| H1 | DPL30H系列有刷高压液体隔膜泵 | DPL30H系列无刷高压液体隔膜泵 | 高压语义存在，但不显示完整 SKU |
| 流量/压力 | 300 mL/min / 600 kPa | 300 mL/min / 600 kPa | 完全相同 |
| 电机/寿命 | 有刷 / 3,000 h | 无刷 / 10,000 h | 核心真实差异 |
| 连接 | 6×4 mm 硬管卡套 | 6×4 mm 硬管卡套 | 相同 |

`600 kPa diaphragm pump`、`high pressure diaphragm pump` 以及“300 mL/min + 600 kPa”的组合意图，未来最适合由 **现有 DPL30H Series URL** 承接。DPL30 不应与它共同争夺“300 mL/min”而不带压力限定的同一主查询。

## 7. DPGL800 事实与分类审计

### 7.1 正式分类

正式 Excel 与生成详情数据一致：

- `01_系列详情!A5:K5`：DPGL800 = 气液混合隔膜泵。
- `02_选型卡片!A8:L9`：两张 DPGL800 选型卡均为气液混合隔膜泵。
- `04_型号配置!A26:N28`：3 个 DPGL800 型号均为气液混合隔膜泵。
- `03_规格参数!A107:E122`：产品类型为气液混合隔膜泵，工作介质为“气体、气液混合物”。

结论：**DPGL800 没有被正式归入 Liquid。**

### 7.2 当前页面出现位置与原因

| 页面 | 当前是否显示 DPGL800 | 原因 |
| --- | --- | --- |
| Diaphragm Pumps 总页 | 是，仅 FF/PS 1 张卡 | 同属 `categoryId=pumps` + `productTypeId=diaphragm-pump` 的自动聚合 |
| Liquid Diaphragm Pumps | 否 | 正式分类不是 Liquid；该页面当前也因词表错配而整体为 0 |
| Gas-Liquid Diaphragm Pumps | 否，但应该显示 | 运行时值“气液混合泵”与路由值“气液混合隔膜泵”不相等 |
| Gas Diaphragm Pumps | 否 | 不属于纯 Gas，且当前无 Gas 正式产品 |

### 7.3 事实冲突明细

涉及三个中文 URL：

- [DPGL800 Series](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/)
- [DPGL800-24BS6-EP/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/)
- [DPGL800-24BS6-FF/PS](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/)

| URL 范围 | 位置 | 当前原文/口径 | 冲突 |
| --- | --- | --- | --- |
| Series + 两 SKU | 正式规格表 | `工作介质：气体、气液混合物` | 不包含普通纯液体 |
| Series + 两 SKU | 正文/JSON-LD | `可用于气体、液体及气液混合介质的抽吸和输送` | 将边界扩展到纯液体 |
| Series + 两 SKU | FAQ | `DPGL800可用于气体、液体以及气液混合介质……` | 与正式规格冲突 |
| Series + 两 SKU | FAQ | `DPGL800可以只抽液体吗？` / `产品可用于液体及气液混合介质输送……` | 暗示普通纯液体工况被正式支持 |
| Series + 两 SKU | 相关文章卡 | `DPGL800面向气体与气液混合介质。典型任务不是只把液体从A点输送到B点……` | 与同页 FAQ/正文相反 |
| 两 SKU | Meta Description | `额定流量 6 L/min，额定压力 30 kPa` | 正式参数是“单头空载流量 6 L/min、最大正压 30 kPa”，不是额定工况 |
| 英文 Series + SKU | 规格表 | `Working Medium` 值为空 | 英文正文/FAQ仍声称 gas、liquid、gas-liquid，字段缺失加剧事实不一致 |

代码证据：

- `data/products/generated/pumps/diaphragm-pumps/detail/index.json:1198-1219`：正式介质/流量/压力口径。
- `data/products/detail/diaphragm-pump-copy.generated.json:238`：正文扩展到 liquid。
- `data/products/detail/diaphragm-pump-copy.generated.json:249-261`：FAQ 声称可输送液体/可只抽液体。
- `detail/index.json:3135-3149` 等 SKU 元数据：把空载/最大值写成额定值。

### 7.4 DPGL800 的页面重叠

- 两个 SKU 的 Title、Meta Description 和 canonical 能区分 EP/PS 与 FF/PS。
- 但两个 SKU 的可见主正文完全相同，H1 也都是 `DPGL800系列无刷气液混合隔膜泵`。
- EP/PS 与 FF/PS 的真实差异是膜片/阀片材料，当前正文规格仍并列展示 `EPDM / PTFE`、`EPDM / FFKM`，没有把页面收敛到单一 SKU。
- DPGL800 Series 与两个 SKU 的主正文同样高度重复。
- 因此 DPGL800 目前应由 Series 承接气液混合、负压、6 L/min 宽意图；SKU 只有在输出真实单配置材料、图纸/CAD、料号参数和独立应用边界后才适合继续独立索引。

## 8. Diaphragm Pumps 总页与站点真实层级

### 8.1 总页线上结果

中文与英文总页均：

- HTTP 200、自引用 canonical、H1 缺失、无产品 JSON-LD。
- 显示 7 个基础配置，没有“0 配置”。
- 7 个普通产品链接分别为：
  - DPL30：24DB EP/PS、24BB EP/PS
  - DPL60：24DB EP/PS、24BB EP/PS
  - DPL30H：24DS EP/PS、24BS EP/PS
  - DPGL800：24BS6 FF/PS
- 原始 HTML 中没有 Liquid/Gas-Liquid/Gas 三个分类页的普通链接。
- 原始 HTML 中没有 DPL30/DPL60/DPL30H/DPGL800 四个 Series 的普通链接。
- DPGL800 EP/PS 已有 200 页面且在 Sitemap 中，但未出现在总页。

### 8.2 当前真实产品导航树

```text
Diaphragm Pumps 总页
├── DPL30-24DB-EP/PS SKU
├── DPL30-24BB-EP/PS SKU
├── DPL60-24DB-EP/PS SKU
├── DPL60-24BB-EP/PS SKU
├── DPL30H-24DS-EP/PS SKU
├── DPL30H-24BS-EP/PS SKU
└── DPGL800-24BS6-FF/PS SKU

未进入上述产品导航链，但存在并被 Sitemap 收录：
├── Liquid Diaphragm Pumps（0 产品）
├── Gas-Liquid Diaphragm Pumps（0 产品）
├── Gas Diaphragm Pumps（0 产品）
├── DPL30 Series（有相关文章入链，但产品导航无入口）
├── DPL60 Series（有相关文章入链，但产品导航无入口）
├── DPL30H Series（有相关文章入链，但产品导航无入口）
├── DPGL800 Series（有相关文章入链，但产品导航无入口）
└── DPGL800-24BS6-EP/PS SKU（当前产品导航无入口）
```

### 8.3 应有角色关系（建议，不执行）

```text
Diaphragm Pumps
├── Liquid Diaphragm Pumps
│   ├── DPL30 Series
│   │   ├── 24DB SKU（若独立内容足够）
│   │   └── 24BB SKU（若独立内容足够）
│   ├── DPL60 Series
│   │   ├── 24DB SKU
│   │   └── 24BB SKU
│   └── DPL30H Series
│       ├── 24DS SKU
│       └── 24BS SKU
└── Gas-Liquid Diaphragm Pumps
    └── DPGL800 Series
        ├── EP/PS SKU（若独立内容足够）
        └── FF/PS SKU（若独立内容足够）

Gas Diaphragm Pumps
└── 当前无正式产品，不应作为可索引空列表页参与主导航
```

## 9. 内链发现链

### 9.1 当前链路

| 起点 → 目标 | 普通 `<a href>` | 仅 JS | 当前结果 |
| --- | --- | --- | --- |
| 总页 → 三个子分类 | 无 | 筛选 UI 存在，但 HTML 无正式子分类 URL | 爬取链断 |
| 总页 → 四个 Series | 无 | 无可替代普通链接 | 爬取链断 |
| 总页 → SKU | 有 | 否 | 仅 7 个 SKU 可达 |
| 子分类 → Series/SKU | 无 | 无产品卡 | 爬取链断 |
| Series → SKU | 无 | 配置仅序列化，未形成链接 | 爬取链断 |
| SKU → Series | 无 | 面包屑直接回总页 | 层级缺失 |
| 技术文章 → Series | 部分有 | 否 | Series 不是全站严格孤儿，但在产品导航中近似孤儿 |

### 9.2 孤儿与 Sitemap-only 风险

- 四个 Series 有部分技术文章入链，因此不是全站“零入链”孤儿；但从产品中心主链无法到达。
- DPGL800 EP/PS SKU 在当前审计链中只有 Sitemap，未从总页、分类或 Series 获得入口。
- Gas-Liquid 与 Gas 分类页没有产品链接；静态链路审计还显示二者缺少有效产品中心入链。
- Sitemap 能帮助发现 URL，但不能替代清晰的普通 HTML 层级和上下文内链。

## 10. Gas 分类存在合理性

当前证据：

- 正式 Excel、生成详情、选型卡和已发布 SKU 中均没有 Gas Diaphragm Pump。
- 页面正文也明确写“当前型号数据待补充”。
- 页面中英文均可索引、在 Sitemap 中、H1 缺失、0 产品、无产品 JSON-LD。
- 未发现已确认的近期纯气体产品上线计划。

四选一结论：**当前建议 B：保留页面，但 noindex。**

理由：

- 不选 A：可索引的空产品页没有独立商业承接价值。
- 暂不直接选 C：保留稳定 URL 可以兼容未来产品线和现有 sitemap/hreflang 结构。
- 不能直接选 D：本轮没有证据证明近期一定会有纯气体正式产品。
- 如果业务确认近期有明确产品和上线时间，则可把建议从 B 调整为 D；在正式产品上线并完善内容后再恢复 index。

## 11. 问题优先级

### P0

1. **Liquid 与 Gas-Liquid 分类页中英文全部归零。** 已有正式产品却在 SSR、前端和 JSON-LD 中完全消失，直接破坏分类承接与发现。
2. **DPGL800 产品事实冲突。** 介质边界、是否可输送纯液体、空载/最大参数与“额定”口径互相矛盾；英文 Working Medium 还为空。

### P1

1. **Series 被首个 SKU 身份覆盖。** DPL30/DPL60/DPL30H Series 的 Title/H1/Meta 均偏向有刷，未代表整个 Series。
2. **Series 配置不可见。** 8/8/8/3 条 `modelConfigurations` 未转为可见配置表或 SKU 链接，页面还统一显示“定制品”。
3. **产品层级和内链断链。** 当前总页直接到 7 个 SKU，缺失总类 → 子类 → Series → SKU 的普通链接链；DPGL800 EP/PS 漏入口。
4. **Series 与 SKU 关键词/正文竞争。** 三个 DPL Series 与首个有刷 SKU 高度重叠；DPGL800 Series/两 SKU 主正文高度重复。
5. **生成物漂移。** Excel/summary 为 8 张选型卡，运行时只有 7 张，导致一个已发布 DPGL800 SKU 未参与选择。

### P2

1. **Gas 空分类当前仍可索引。** 在无产品和无已确认路线图时，建议保留 URL 但 noindex。
2. **结构化数据未表达 Series → SKU。** Series 与 SKU 都使用 ProductModel，缺少 Series 级 ProductGroup/hasVariant 关系；SKU 还缺少可用 sku 字段。
3. **分类页基础 SEO 结构不足。** 总页与三个子分类均无 H1，分类页无产品 JSON-LD。
4. **英文数据质量。** 选中标签泄漏中文值，DPGL800 Working Medium 值缺失，英文命名中 `GAS` / `PUMP` 大写不自然。

### P3

1. 为保留索引的 SKU 增加真正的单配置参数、CAD/图纸、接线/控制、材料兼容性、寿命与维护信息。
2. Sitemap 当前 5,416 个 URL 且没有 `lastmod`；后续应让收录清单与可发现、可索引、有内容的页面保持一致。
3. 当前不存在“DPGL800 被错误归入 Liquid”这个问题，不应把它列为待移动的分类错误。
4. 当前不存在“Series 页面缺失”问题；真正问题是现有页面角色、数据展示和内链。

## 12. 15 个问题的直接答案

### 1. Liquid Diaphragm Pumps 为什么显示 0 个配置？

路由注入 `filter01="液体隔膜泵"`，6 张 DPL 运行时卡片却使用 `filter01="液泵"`；组件以 `selectedValues.has(item)` 严格比较，全部不相等，因此过滤结果为 0。

### 2. Gas-Liquid Diaphragm Pumps 为什么显示 0 个配置？

路由注入 `filter01="气液混合隔膜泵"`，DPGL800 运行时卡片使用 `filter01="气液混合泵"`；严格比较失败，卡片被排除。

### 3. Gas Diaphragm Pumps 为什么显示 0 个配置？

当前正式产品数据库、独立 SKU 页面和运行时卡片中都没有纯 Gas Diaphragm Pump，所以筛选后真实为 0。

### 4. 这三个问题是不是同一个根因？

不完全是。同一组件和严格筛选链导致三页都进入空状态；Liquid/Gas-Liquid 是词表错配，Gas 是确实没有正式产品。

### 5. 实际数据库里 Liquid 类有多少 Series 和多少 SKU？

3 个 Series（DPL30、DPL60、DPL30H），6 个已发布独立 SKU 页面；正式 Excel 另有 24 条型号配置（每 Series 8 条），不能与已发布 SKU 页混为一谈。

### 6. Gas-Liquid 类有多少 Series 和多少 SKU？

1 个 Series（DPGL800），2 个已发布独立 SKU 页面；正式 Excel 有 3 条 DPGL800 型号配置。没有其他 Gas-Liquid Series。

### 7. Gas 类到底有没有正式产品？

没有。**当前产品数据库中没有 Gas Diaphragm Pump 正式产品。**

### 8. DPL30 Series 页面是否已经存在？

是。现有 URL 为 [DPL30 Series](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/)，HTTP 200、自 canonical、在 Sitemap 中。

### 9. DPL60 Series 页面是否已经存在？

是。现有 URL 为 [DPL60 Series](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/)，HTTP 200、自 canonical、在 Sitemap 中。

### 10. DPL30H Series 页面是否已经存在？

是。现有 URL 为 [DPL30H Series](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/)，HTTP 200、自 canonical、在 Sitemap 中。

### 11. DPGL800 Series 页面是否已经存在？

是。现有 URL 为 [DPGL800 Series](https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/)，HTTP 200、自 canonical、在 Sitemap 中。

### 12. 是否还需要新建 Series Landing Page？

不需要新建第二套 URL。应把现有四个 Series URL 重构为真正的 Series Landing Page：系列级 Title/H1、可见配置比较、材料/电机差异、SKU 链接和 Series 级结构化数据。

### 13. DPGL800 目前是否被错误归入 Liquid Diaphragm Pumps？

没有。正式 Excel、生成详情和运行时卡片均把它归为 Gas-Liquid；它出现在总 Diaphragm Pumps 页是 product type 自动聚合。当前 Liquid 页本身为 0，也没有 DPGL800。

### 14. DPGL800 页面是否存在“纯液体输送”与“气液混合”事实冲突？

存在。正式规格写“工作介质：气体、气液混合物”，正文/FAQ 却写可输送液体、甚至可只抽液体；SKU 元数据还把单头空载流量和最大正压写成额定值。

### 15. 当前最应该先修的前 5 个问题是什么？

1. 统一分类路由与运行时卡片的正式筛选词表，恢复 Liquid/Gas-Liquid 中英文产品结果。
2. 统一 DPGL800 的介质边界和参数工况口径，并同步修复英文 Working Medium。
3. 让现有 Series 页恢复系列级身份，停止自动继承首个 SKU 的有刷/无刷 Title、H1 和正文。
4. 将 8/8/8/3 条 Series 配置渲染为可见比较表，并建立总类 → 子类 → Series → SKU 的普通链接链。
5. 解决 Excel 8 卡与运行时 7 卡的生成漂移，补回 DPGL800 EP/PS 发现入口，同时收敛 Series/SKU 重复内容与关键词竞争。

## 13. 证据索引

### 13.1 正式数据源

- `data-source/product-center/pumps/FOREACH_隔膜泵系列_产品数据源.xlsx`
  - `00_说明!A1:C8`：分类、选型页和“详情页以系列页为主”的设计口径。
  - `01_系列详情!A1:K5`：4 个 Series 与正式分类。
  - `02_选型卡片!A1:L9`：8 张正式选型卡。
  - `03_规格参数!A107:E122`：DPGL800 正式介质与参数。
  - `04_型号配置!A1:N28`：27 条型号配置。
  - `07_路由SEO!A1:I12`：4 个本期 Series URL 与 7 个后续预留配置页。

### 13.2 生成数据与页面

- `data/products/generated/pumps/diaphragm-pumps/summary/summary.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/index.json`
- `data/products/generated/pumps/diaphragm-pumps/selection/cards.json`
- `data/products/selection/diaphragm-pump-selection.generated.ts`
- `data/products/selection/product-route-map.ts`
- `data/products/detail/diaphragm-pump-copy.generated.json`
- `components/products/selection/ProductSelectionClient.tsx`
- `components/products/detail/ProductDetailClient.tsx`
- `app/products/[category]/[slug]/[seriesSlug]/page.tsx`
- `app/[locale]/products/[...segments]/page.tsx`
- `app/products/pumps/diaphragm-pumps/[slug]/page.tsx`

### 13.3 线上核查边界

- 线上 HTML 与 HTTP 核查时间：2026-08-27。
- Sitemap：`https://www.foreachtek.com/sitemap.xml`，当次读取共 5,416 个 `loc`，无 `lastmod`。
- 分类页、Series 页和 8 个已发布 SKU 均核对中文；分类页和 Series 页同步核对英文。
- 本报告仅给出审计结论与建议，没有执行任何修复。
