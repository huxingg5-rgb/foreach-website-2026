# FOREACH Diaphragm Pump SEO Title / H1 / Meta Description 分析报告

**分析日期：** 2026-08-27  
**分析范围：** 英文站 Diaphragm Pump 体系  
**SEO 主域：** `https://www.foreachtek.com`  
**执行边界：** 本轮仅分析；除本报告外，未修改 Title、H1、Meta Description、正文、分类、URL、Sitemap、Canonical、Hreflang、JSON-LD 或任何网站代码，也未 commit、deploy。  

> **数据声明：本轮未使用实际 Search Console query 数据，也未使用 Bing Webmaster 实时 query 数据。**
>
> 本报告不包含虚构的搜索量、排名、Impressions、Clicks、CTR 或 Average Position。对 cannibalization 的判断是基于页面结构、搜索意图、线上元数据、可见内容和内链形成的“结构性风险判断”，不是对实际 query 竞争的伪造结论。

---

## 0. 执行摘要

1. 本轮从 Sitemap、线上 HTTP HTML、浏览器 hydration 后的最终 DOM、项目路由和正式产品生成数据交叉确认了 **4 个分类 URL、4 个现有系列 URL、8 个公开 SKU URL、18 篇相关英文技术文章**。
2. 核心抽查页均为 `200`，Canonical 自指；`og:title`、`og:description`、`og:url` 与普通 SEO 字段一致。Canonical / OpenGraph 不是本轮问题。
3. 没有发现完全相同的普通 Title，但已发现的 4 个分类 + 4 个通用系列候选页 + 8 个 SKU 页（共 16 页）均使用高度机械的 Title / Description 结构；即使排除无产品的 Gas 分类，试点中的其余 15 页仍全部模板化。Description 固定骨架达 108 个字符，仅替换页面名。
4. 三个重点分类页没有可见的主题 H1。浏览器 hydration 后只有打印区域里的隐藏 H1 `FOREACH Product Selection List`，不能替代页面主题 H1。
5. **P0 结构异常：** Liquid 与 Gas-Liquid 的服务器 HTML 因筛选值不匹配显示“无匹配”，hydration 后又清除/忽略失效筛选，最终与总分类一样显示同一组 7 个配置。
6. 因而 Liquid 页确实显示 DPGL800，Gas-Liquid 页也显示 6 个纯液体 DPL 配置；两页主题互相污染，比单纯 Title 长短更急。
7. 推荐结构是方案 B：Liquid 只保留 DPL30、DPL60、DPL30H；DPGL800 只出现在总分类和 Gas-Liquid 分类。这里首先是修正筛选/渲染，不是新建 URL。
8. DPL30、DPL60、DPL30H、DPGL800 的 4 个 Series Landing URL **已经存在、200、self-canonical**；不应再建 `/dpl30/` 等重复 URL，而应把现有通用页改造成真正的系列页。
9. 当前 DPL30/DPL60/DPL30H 通用页 H1 与对应 Brushed SKU 完全相同；DPGL800 通用页与两个材料 SKU 的 H1 完全相同，系列页与 SKU 页的搜索意图没有分开。
10. 推荐由现有 Series 页承接 300 mL/min、600 mL/min、600 kPa、DPGL800/vacuum 等系列级商业词；SKU 页承接完整型号、电机和材料配置词。
11. DPGL800 的 `6 L/min` 是**单泵头空载气体流量**，不是液体流量；真空正式值是最大负压 `< -90 kPa`，不是等值 `-90 kPa`，且两个极限值不是同一工况点。
12. GPT 第一版 Title 方案整体评分为 **64/100**。最大问题是忽略已经存在的 Series URL，把同一个系列级数字词重复分配给每个 SKU；其次是 DPGL800 数值限定不严谨。
13. 建议先完成分类筛选和可见 H1 的 Phase 0，再做约 19 页的英文试点；不要把未修复的分类页与元数据实验混在一起测量。

---

## 1. 方法、范围与证据边界

### 1.1 使用的证据

- 生产站 Sitemap：共 5,416 条 URL。
- 生产站实时 HTTP HTML：提取 `title`、主题 H1、Meta Description、Canonical、OpenGraph。
- 浏览器最终 DOM：专门复核分类页 hydration 后的 H1、筛选状态与产品集合。
- 项目路由、产品选择数据、生成的产品详情数据、文章数据与内链。
- 当前正式产品页、选型指南及已链接 PDF 的交叉核验。

产品主数据证据位置：

- `data/products/generated/pumps/diaphragm-pumps/summary/summary.json:2-8`
- `data/products/generated/pumps/diaphragm-pumps/detail/index.json`
- `data/products/selection/product-route-map.ts:298-327`
- `data/products/selection/diaphragm-pump-selection.generated.ts:42,444`
- `components/products/selection/ProductSelectionClient.tsx`（精确筛选与 hydration 状态处理）

### 1.2 数据限制

- 原始 `FOREACH_隔膜泵系列_产品数据源.xlsx` 当前文件头不是有效 XLSX ZIP，因此不能直接审查源工作簿；参数结论以项目生成 JSON、当前线上产品页、指南/PDF交叉核验。
- 未登录或读取 GSC / Bing Webmaster query 报表，因此不能声称某两个 URL 已经在某个真实 query 上互相抢排名。
- 字符长度是诊断辅助项，不作为“短必错、长必对”的机械规则。

---

## 2. 真实页面发现

### 2.1 分类、Series 与 SKU URL

| 页面类型 | 页面 | 实际 URL | 线上状态 |
|---|---|---|---:|
| 总分类 | Diaphragm Pumps | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/ | 200 |
| 分类 | Liquid Diaphragm Pumps | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/ | 200 |
| 分类 | Gas-Liquid Diaphragm Pumps | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/ | 200 |
| 分类 | Gas Diaphragm Pumps | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-diaphragm-pumps/ | 200；当前无有效产品集合 |
| 现有通用系列候选 URL | DPL30 | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/ | 200 |
| SKU | DPL30-24DB-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/ | 200 |
| SKU | DPL30-24BB-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/ | 200 |
| 现有通用系列候选 URL | DPL60 | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/ | 200 |
| SKU | DPL60-24DB-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/ | 200 |
| SKU | DPL60-24BB-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/ | 200 |
| 现有通用系列候选 URL | DPL30H | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/ | 200 |
| SKU | DPL30H-24DS-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/ | 200 |
| SKU | DPL30H-24BS-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/ | 200 |
| 现有通用系列候选 URL | DPGL800 | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/ | 200 |
| SKU | DPGL800-24BS6-EP/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/ | 200 |
| SKU | DPGL800-24BS6-FF/PS | https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/ | 200 |

重要边界：项目正式配置表共有 27 个 configuration，但当前独立、公开、可确认的英文 SKU URL 只有上表 8 个。DPL 系列的其他 12/24 V、EP/PS、FF/PS 组合没有已确认独立页面；`DPGL800-24BSC-EP/PS` 的推测详情 URL实测为 404。不能为这些配置编造 URL、Title 或页面。

为简化后文，报告把上述 4 个“现有通用系列候选 URL”简称为 **Series URL**。这是建议承担的未来页面角色，不表示它们当前已经是成熟、中立的 Series Landing Page；实测恰好证明它们目前偏向默认 Brushed/Brushless SKU。

### 2.2 已发现的 18 篇相关英文技术文章

1. https://www.foreachtek.com/en/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/
2. https://www.foreachtek.com/en/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/
3. https://www.foreachtek.com/en/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide/
4. https://www.foreachtek.com/en/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump-selection-guide/
5. https://www.foreachtek.com/en/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/
6. https://www.foreachtek.com/en/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/
7. https://www.foreachtek.com/en/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin/
8. https://www.foreachtek.com/en/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/
9. https://www.foreachtek.com/en/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/
10. https://www.foreachtek.com/en/resources/technical-articles/diaphragm-pump-pressure-rating-terms/
11. https://www.foreachtek.com/en/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection/
12. https://www.foreachtek.com/en/resources/technical-articles/high-backpressure-fluid-path-pressure-budget/
13. https://www.foreachtek.com/en/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/
14. https://www.foreachtek.com/en/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/
15. https://www.foreachtek.com/en/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/
16. https://www.foreachtek.com/en/resources/technical-articles/ivd-waste-aspiration-liquid-pump-vs-vacuum-pump/
17. https://www.foreachtek.com/en/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/
18. https://www.foreachtek.com/en/resources/technical-articles/life-science-dpl60-600ml-min-diaphragm-pump-selection-guide/

以上 18 个 URL 均在生产 Sitemap 中且实时返回 200。没有发现一篇独立的“self-priming diaphragm pump”主文章；自吸主题分布在 DPL30/DPL60/DPL30H 选型文章、life-science DPL60 文章及吸入/排出阻力文章中。现阶段不应仅为关键词再建重复文章。

---

## 3. 表1：页面现状

### 3.1 统一 Canonical / OpenGraph 结果

本报告涉及的 **34 个唯一线上 URL**（16 个分类/通用/SKU + 18 篇文章）已做全量实时审计，结果为：

- HTTP 200：34/34
- `Canonical = 当前 URL`（self-canonical）：34/34，异常 0
- `og:url = 当前 URL`：34/34，异常 0
- `og:title = Current Title`：34/34，异常 0
- `og:description = Current Meta Description`：34/34，异常 0
- 上述字段缺失：0

因此下表不重复抄写同一 URL 四次；若未来修改普通 Title / Description，OpenGraph 应继续同步，但本轮不需要修 Canonical 或 OG URL。

### 3.2 分类、Series、SKU 当前状态

| URL | Current Title（字符） | Current H1 | Current Meta Description（字符） | 主要问题 |
|---|---|---|---|---|
| [Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/) | `Diaphragm Pumps \| FOREACH`（25） | 无可见主题 H1 | `Explore Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（123） | Title 过泛；无可见主题 H1；Description 为统一模板 |
| [Liquid Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/) | `Liquid Diaphragm Pumps \| FOREACH`（32） | 无可见主题 H1 | `Explore Liquid Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（130） | 最终 DOM 混入 DPGL800；与总分类/Gas-Liquid 显示相同 7 项；模板 Description |
| [Gas-Liquid Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/) | `GAS Liquid Diaphragm Pumps \| FOREACH`（36） | 无可见主题 H1 | `Explore GAS Liquid Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（134） | `GAS` 大写不自然；最终 DOM 混入全部 DPL；无可见主题 H1 |
| [Gas Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-diaphragm-pumps/) | `GAS Diaphragm Pumps \| FOREACH`（29） | 无可见主题 H1 | `Explore GAS Diaphragm Pumps specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（127） | 当前无有效气泵数据，不宜进入增长试点 |
| [DPL30 Series URL](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/) | `DPL30 Liquid Diaphragm PUMP \| FOREACH`（37） | `DPL30 Series Brushed Liquid Diaphragm Pump` | `Explore DPL30 Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（135） | 通用页被写成 Brushed；H1 与 Brushed SKU 重复；未承接系列意图 |
| [DPL30-24DB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/) | `DPL30 24DB EP PS Liquid Diaphragm PUMP \| FOREACH`（48） | `DPL30 Series Brushed Liquid Diaphragm Pump` | `Explore DPL30 24DB EP PS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（146） | H1 未含完整 SKU；与 Series H1 完全重复；Description 无参数差异 |
| [DPL30-24BB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/) | `DPL30 24BB EP PS Liquid Diaphragm PUMP \| FOREACH`（48） | `DPL30 Series Brushless Liquid Diaphragm Pump` | `Explore DPL30 24BB EP PS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（146） | Title 型号分隔丢失且未显式写 Brushless；模板 Description |
| [DPL60 Series URL](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/) | `DPL60 Liquid Diaphragm PUMP \| FOREACH`（37） | `DPL60 Series Brushed Liquid Diaphragm Pump` | `Explore DPL60 Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（135） | 通用页偏向 Brushed；与 Brushed SKU H1 重复 |
| [DPL60-24DB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/) | `DPL60 24DB EP PS Liquid Diaphragm PUMP \| FOREACH`（48） | `DPL60 Series Brushed Liquid Diaphragm Pump` | `Explore DPL60 24DB EP PS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（146） | 与 Series H1 完全重复；模板 Description |
| [DPL60-24BB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/) | `DPL60 24BB EP PS Liquid Diaphragm PUMP \| FOREACH`（48） | `DPL60 Series Brushless Liquid Diaphragm Pump` | `Explore DPL60 24BB EP PS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（146） | 未显式表达 Brushless；模板 Description |
| [DPL30H Series URL](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/) | `DPL30H Liquid Diaphragm PUMP \| FOREACH`（38） | `DPL30H Series Brushed High-Pressure Liquid Diaphragm Pump` | `Explore DPL30H Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（136） | Title 未体现 600 kPa / high-pressure；通用页偏向 Brushed |
| [DPL30H-24DS-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/) | `DPL30H 24DS EP PS Liquid Diaphragm PUMP \| FOREACH`（49） | `DPL30H Series Brushed High-Pressure Liquid Diaphragm Pump` | `Explore DPL30H 24DS EP PS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（147） | 与 Series H1 完全重复；Title 未保留正式型号分隔符，也未表达 600 kPa 差异 |
| [DPL30H-24BS-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/) | `DPL30H 24BS EP PS Liquid Diaphragm PUMP \| FOREACH`（49） | `DPL30H Series Brushless High-Pressure Liquid Diaphragm Pump` | `Explore DPL30H 24BS EP PS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（147） | 未把完整 SKU / motor 差异清楚写入 Title；模板 Description |
| [DPGL800 Series URL](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/) | `DPGL800 GAS Liquid Diaphragm PUMP \| FOREACH`（43） | `DPGL800 Series Brushless Gas-Liquid Diaphragm Pump` | `Explore DPGL800 GAS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（141） | 与两个材料 SKU H1 完全重复；Title 未体现 vacuum / gas-flow 意图 |
| [DPGL800-24BS6-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/) | `DPGL800 24BS6 EP PS GAS Liquid Diaphragm PUMP \| FOREACH`（55） | `DPGL800 Series Brushless Gas-Liquid Diaphragm Pump` | `Explore DPGL800 24BS6 EP PS GAS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（153） | 与 Series、FF SKU H1 完全重复；材料/性能差异未进入摘要 |
| [DPGL800-24BS6-FF/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/) | `DPGL800 24BS6 FF PS GAS Liquid Diaphragm PUMP \| FOREACH`（55） | `DPGL800 Series Brushless Gas-Liquid Diaphragm Pump` | `Explore DPGL800 24BS6 FF PS GAS Liquid Diaphragm PUMP specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`（153） | 与 Series、EP SKU H1 完全重复；FFKM/PTFE 差异未表达 |

### 3.3 重点技术文章当前状态

| URL | Current Title（字符） | Current H1 | Current Meta Description（字符） | 主要问题 |
|---|---|---|---|---|
| [DPL30 guide](https://www.foreachtek.com/en/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/) | `How to Select a 300 mL/min Liquid Diaphragm Pump \| DPL30 Model Guide｜Technical Articles｜FOREACH`（95） | `How to Select a 300 mL/min Liquid Diaphragm Pump: DPL30 Working Principle and Model Guide` | `Learn the DPL30 liquid diaphragm pump working principle, 300 mL/min no-load flow, 100 kPa rated pressure, flow-pressure curve, wetted materials, brushed and brushless versions, and model selection method.`（204） | 内容准确；栏目字样消耗 Title；Description 可压缩 |
| [DPL60 guide](https://www.foreachtek.com/en/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/) | `600 mL/min Liquid Diaphragm Pump Selection: DPL60 Operating Point and Models｜Technical Articles｜FOREACH`（103） | `How to Select a 600 mL/min Liquid Diaphragm Pump: DPL60 Flow, Pressure and Model Guide` | `Select a FOREACH DPL60 miniature liquid diaphragm pump by no-load flow, 100 kPa rated pressure, flow-pressure curve, motor, wetted materials, model coding, configuration logic and selection method.`（197） | Title/Description 偏长；信息意图正确 |
| [DPL30H guide](https://www.foreachtek.com/en/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide/) | `DPL30H High-Pressure Diaphragm Pump Selection Guide \| FOREACH`（61） | `How to Select a High-Pressure Diaphragm Pump: DPL30H 300 mL/min and 600 kPa Guide` | `Select the FOREACH DPL30H by flow at target backpressure, 600 kPa rated pressure, 6×4 mm rigid tubing, motor, wetted materials, model code and selection method.`（160） | 当前已经较好；需明确 300 是空载、600 是额定压力 |
| [DPGL800 guide](https://www.foreachtek.com/en/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump-selection-guide/) | `How to Select a Gas-Liquid Diaphragm Pump \| DPGL800 Vacuum Guide \| FOREACH`（74） | `How to Select a Gas-Liquid Diaphragm Pump: DPGL800 Flow, Vacuum and Build-Up Time` | `Select the DPGL800 gas-liquid diaphragm pump by its 6 L/min no-load gas flow, ＜-90 kPa vacuum, 30 kPa pressure and 5 L test-chamber vacuum build-up time.`（153） | 参数限定基本正确；标点与“最大”定义可更严谨 |
| [Flow-pressure curve](https://www.foreachtek.com/en/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/) | `Diaphragm Pump Flow-Pressure Curves: Operating Point Guide \| FOREACH`（68） | `How to Read a Diaphragm Pump Flow-Pressure Curve—and Predict Installed Flow` | `Learn how pump curves, system resistance, inlet vacuum, outlet backpressure, tubing ID, viscosity and test conditions determine the installed flow of a miniature diaphragm pump.`（177） | 主题清晰；仅需轻量压缩，不是结构性问题 |
| [300 vs 600](https://www.foreachtek.com/en/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/) | `300 vs 600 mL/min Miniature Diaphragm Pump: Task Flow and Operating Point Guide \| FOREACH`（89） | `How Do You Choose Between a 300 mL/min and 600 mL/min Miniature Diaphragm Pump? Calculate Task Flow First, Then Check the Actual Operating Point` | `When comparing 300 mL/min and 600 mL/min miniature diaphragm pumps, free-flow rate alone is not enough. This guide builds a selection path around task volume, effective pumping time, system differential pressure, pump curves and prototype validation.`（250） | 比较意图正确；Title/H1/Description 均可压缩 |
| [100 vs 600 kPa](https://www.foreachtek.com/en/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection/) | `100 kPa vs 600 kPa Miniature Diaphragm Pumps: Select by Fluid-Path Pressure Budget \| FOREACH`（92） | `Is 100 kPa Enough? How to Determine Whether a Fluid Path Needs a 600 kPa High-Pressure Miniature Diaphragm Pump` | `Whether 100 kPa is sufficient cannot be decided from the application name alone. Evaluate target flow, tubing, valves, filter, needle, endpoint pressure, and the pump curve to determine whether a 600 kPa high-pressure miniature diaphragm pump is needed.`（253） | 信息价值高；Title/Description 可收敛；当前未链接 DPL30H Series |
| [300 mL/min flow margin](https://www.foreachtek.com/en/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin/) | `300 mL/min Miniature Diaphragm Pump Flow Margin: Worst-Case Conditions and Acceptance Criteria \| FOREACH`（104） | `How Much Installed Flow Margin Should a 300 mL/min Miniature Diaphragm Pump Have? A FOREACH Example` | `Installed margin for a 300 mL/min miniature diaphragm pump is not a fixed percentage. Learn how to define credible worst-case scenarios and include backpressure, filter loading, power supply, fluid, sample variation, measurement uncertainty and release criteria in the calculation.`（281） | 搜索问题清楚；摘要过长；存在无 `/en/` 的 Series 内链 |
| [Tubing ID and flow](https://www.foreachtek.com/en/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/) | `Diaphragm Pump Flow After a Tubing Change: Find Fluid-Path Restrictions with Pressure Measurements \| FOREACH`（108） | `Why Does Actual Flow Change So Much When the Tubing Size Changes on the Same Miniature Diaphragm Pump?` | `When flow drops after replacing tubing on a miniature diaphragm pump, how can you tell whether the cause is tube ID, tube length, a restricted fitting, or the pump? This guide provides a diagnostic procedure based on simultaneous inlet-pressure, outlet-pressure, and flow measurements.`（285） | 非模板，但 Title/Description 很长 |
| [Suction vs discharge](https://www.foreachtek.com/en/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/) | `Diaphragm Pump Suction Resistance vs. Outlet Backpressure: Which Matters More? \| FOREACH`（88） | `Which Has a Greater Effect on a Miniature Diaphragm Pump: Suction-Line or Discharge-Line Resistance?` | `Resistance on both the suction and discharge sides increases the differential-pressure burden on a miniature diaphragm pump, but the failure symptoms differ. This guide uses inlet absolute pressure, outlet backpressure, and flow measurements to distinguish failure to prime, cavitation, and pressure without flow.`（313） | 描述非常长；存在无语言前缀的分类链接 |
| [Pressure terms](https://www.foreachtek.com/en/resources/technical-articles/diaphragm-pump-pressure-rating-terms/) | `Diaphragm Pump Rated Pressure vs Maximum Output, Proof, and Burst Pressure \| FOREACH`（84） | `What Is the Difference Between Rated Working Pressure, Maximum Output Pressure, Proof Pressure, and Burst Pressure for a Miniature Diaphragm Pump?` | `Rated working pressure, maximum output pressure, proof pressure, and burst pressure are not interchangeable for a miniature diaphragm pump. This guide compares the terms and provides a parameter checklist and specification-review method.`（237） | 搜索意图正确；可压缩摘要 |
| [High-backpressure budget](https://www.foreachtek.com/en/resources/technical-articles/high-backpressure-fluid-path-pressure-budget/) | `High-Backpressure Fluid-Path Pressure Budget: 600 kPa Miniature Diaphragm Pump Selection \| FOREACH`（98） | `How Do You Build a Pressure Budget for a High-Backpressure Fluid Path? A FOREACH 600 kPa Miniature Diaphragm Pump Selection Example` | `Before selecting a pump for a high-backpressure fluid path, include the suction tube, discharge tube, valves, filter, needle, endpoint chamber, and static head in the steady-state budget, then review transient protection and pressure margin separately.`（252） | 与 100 vs 600 kPa 形成相邻信息簇；应支持 DPL30H 而非另争商业主词 |
| [Brushed vs brushless life](https://www.foreachtek.com/en/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/) | `Brushed vs. Brushless Diaphragm Pump Life: 3,000 vs. 10,000 Hours \| FOREACH`（75） | `Why Do Brushed Diaphragm Pumps Last Around 3,000 Hours and Brushless Pumps Around 10,000 Hours?` | `Learn why brushed diaphragm pumps are commonly rated around 3,000 hours and brushless pumps around 10,000 hours, including commutation, brush wear, bearings and operating conditions.`（182） | 主题清楚；轻量压缩即可 |
| [2-wire vs 5-wire](https://www.foreachtek.com/en/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/) | `2-Wire vs 5-Wire Brushless Diaphragm Pumps \| FOREACH`（52） | `2-Wire vs 5-Wire Brushless Diaphragm Pumps: What Is the Difference and Which Should You Choose?` | `Learn the differences between 2-wire and 5-wire brushless diaphragm pump configurations, including VCC, GND, PWM, DIR and FG signals, when to use each option, and configuration considerations for FOREACH DPL30, DPL60, DPL30H and DPGL800 series.`（244） | Title 已简洁；Description 可压缩 |
| [Continuous duty](https://www.foreachtek.com/en/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/) | `Miniature Diaphragm Pump Continuous Duty and Service Life \| FOREACH`（67） | `How Long Can a Miniature Diaphragm Pump Run Continuously? A Duty-Cycle and Life Guide` | `Understand continuous duty, brushed versus brushless life, duty profiles, load, start-stop cycles, failure criteria, durability tests and B10 reliability for miniature diaphragm pumps.`（184） | 信息意图清楚；非优先 |
| [IVD waste: liquid vs vacuum](https://www.foreachtek.com/en/resources/technical-articles/ivd-waste-aspiration-liquid-pump-vs-vacuum-pump/) | `IVD Waste Aspiration: Liquid Pump or Vacuum Pump? Direct vs Indirect Methods｜Technical Articles｜FOREACH`（103） | `IVD Waste Aspiration: Liquid Pump or Vacuum Pump? Direct vs Indirect Aspiration` | `Understand direct liquid pumping, indirect vacuum aspiration, and gas–liquid conditions in IVD probe washing and reaction-cup waste removal. Compare medium paths, flow, vacuum, overflow protection, material compatibility, and complete-system validation.`（253） | 主题独立且有价值；栏目字样和摘要偏长 |
| [Lab waste aspiration troubleshooting](https://www.foreachtek.com/en/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/) | `Laboratory Waste Aspiration Pump Losing Suction? Check Leaks, Filters, and Liquid Carryover｜Technical Articles｜FOREACH`（118） | `What to Do When a Laboratory Waste Aspiration Pump Loses Suction: Troubleshooting Leaks, Filter Blockage, and Liquid Carryover` | `What should you do when a laboratory waste aspiration pump loses suction, cannot aspirate liquid, or takes longer to build vacuum? Troubleshoot leaks at bottle caps and tubing, blocked hydrophobic filters, activated overflow protection, clogged tips, and liquid carryover, then verify vacuum level, gas flow, and the complete system.`（333） | 搜索问题明确；Title/Description 过长，但不是商业词主页面 |
| [Life-science DPL60](https://www.foreachtek.com/en/resources/technical-articles/life-science-dpl60-600ml-min-diaphragm-pump-selection-guide/) | `DPL60 Diaphragm Pump Selection for Life-Science Instrument Fluid Paths \| FOREACH`（80） | `How to Select a Miniature Diaphragm Pump for Life-Science Instruments: DPL60 Washing, Drainage and Waste-Fluid Guide` | `Evaluate DPL60 miniature liquid diaphragm pumps for life-science instrument washing, flushing, drainage and waste lines using actual flow, back pressure, self-priming, materials and service-life tests.`（201） | 应保留 life-science 意图区隔，避免与通用 DPL60 guide 合并 |

### 3.4 重复与模板化结论

#### Title

- 抽查范围内没有完全相同的普通 Title。
- 但 Series/SKU Title 高度模板化，主要差别仅为型号字符串；`Brushed`、`Brushless`、材料和真正性能差异未稳定进入 Title。
- `PUMP`、`GAS` 全大写不自然，不应作为 SEO 差异化手段。

#### H1 精确重复组

| H1 | 重复页面 |
|---|---|
| `DPL30 Series Brushed Liquid Diaphragm Pump` | DPL30 Series URL + DPL30-24DB，共 2 页 |
| `DPL60 Series Brushed Liquid Diaphragm Pump` | DPL60 Series URL + DPL60-24DB，共 2 页 |
| `DPL30H Series Brushed High-Pressure Liquid Diaphragm Pump` | DPL30H Series URL + DPL30H-24DS，共 2 页 |
| `DPGL800 Series Brushless Gas-Liquid Diaphragm Pump` | DPGL800 Series URL + EP/PS SKU + FF/PS SKU，共 3 页 |

此外，hydration 后每页会插入隐藏 H1 `FOREACH Product Selection List`。产品/文章页因此是“可见主题 H1 + 隐藏全局 H1”；三个重点分类页只有隐藏全局 H1，没有可见主题 H1。

#### Meta Description

4 个已发现分类页 + 4 个 Series URL + 8 个 SKU 页，共 16 页，全部使用同一骨架；其中无实际产品的 Gas 分类不进入首轮 SEO 试点，因此试点产品体系仍是 15 页：

```text
Explore {page name} specifications, materials, interfaces,
model configurations, and fluidic applications from FOREACH.
```

固定骨架约 108 个字符。字符串不是逐字完全相同，但搜索摘要语义高度近重复，也没有表达 no-load flow、rated pressure、motor、life、material 或 gas-liquid/vacuum 等真实差异。`og:description` 同步继承此问题。

文章没有精确重复 Title/H1/Description；文章问题主要是冗长和栏目字样，不是模板重复。在最初统计的 15 篇核心样本中，Title 中位数约 84 字符，14/15 超过 60；Description 中位数约 204 字符，13/15 超过 160；另外 3 篇补充文章也分别为 98/103/118 字符 Title 和 252/253/333 字符 Description。这里应逐篇按意图压缩，而不是机械套字符数。

---

## 4. Liquid / Gas-Liquid 分类结构实测

### 4.1 服务器 HTML 与最终 DOM 不一致

项目路由传入的筛选值是：

- Liquid：`液体隔膜泵`
- Gas-Liquid：`气液混合隔膜泵`

而生成选择数据实际使用：

- Liquid：`液泵`
- Gas-Liquid：`气液混合泵`

精确匹配失败后：

1. 服务器返回 HTML 中 Liquid / Gas-Liquid 显示无匹配配置；
2. 浏览器 hydration 后失效筛选被清除或忽略；
3. 最终可见 DOM 中，总分类、Liquid、Gas-Liquid 都显示同一组 7 项：DPL30 Brushed/Brushless、DPL60 Brushed/Brushless、DPL30H Brushed/Brushless、DPGL800 FF/PS。

这意味着不同抓取/渲染路径可能看到不同的分类语义，同时用户最终看到的三个页面又高度重复。

### 4.2 方案判断

**推荐方案 B，但实现含义应准确理解为“修复分类筛选与渲染”，不是另造分类或 URL。**

- Diaphragm Pumps 总分类：DPL30、DPL60、DPL30H、DPGL800。
- Liquid Diaphragm Pumps：只展示 DPL30、DPL60、DPL30H。
- Gas-Liquid Diaphragm Pumps：只展示 DPGL800。
- Gas Diaphragm Pumps：在真实气泵数据就绪前，不纳入本轮 SEO 增长试点。

DPGL800 从 Liquid 可见集合中移出，不会否认它能处理气液混合介质；这只是让 `liquid diaphragm pump` 分类保持主题纯度。DPGL800 仍应出现在总分类和 Gas-Liquid 分类。

**不要先只改 Liquid Title 再观察。** 如果产品集合仍混杂，Title 变化无法与分类内容修复分开评估。

---

## 5. 参数真实性与文案边界

### 5.1 已确认参数

| 系列 / SKU | 已确认正式定义 | 电机/寿命 | 已确认材料 | SEO 文案边界 |
|---|---|---|---|---|
| DPL30 | `300 mL/min` 为**空载流量**；`100 kPa` 为额定压力；当前项目/页面自吸 6 mH₂O | 24DB 有刷 3,000 h；24BB 无刷 10,000 h（额定电压连续运行） | EP/PS：EPDM 膜片 + EPDM 阀 + PPS 泵头 | 不得暗示 `300 mL/min @ 100 kPa`；自吸值存在 PDF 冲突，暂不放进推荐 Title/Description |
| DPL60 | `600 mL/min` 为空载流量；`100 kPa` 为额定压力；自吸 3 mH₂O | 24DB 3,000 h；24BB 10,000 h | EP/PS：EPDM 膜片 + EPDM 阀 + PPS 泵头 | 不得暗示 `600 mL/min @ 100 kPa` |
| DPL30H | `300 mL/min` 为空载流量；`600 kPa` 为额定压力；自吸 3 mH₂O | 24DS 3,000 h；24BS 10,000 h | EP/PS：EPDM 膜片 + EPDM 阀 + PPS 泵头；6×4 mm 硬管接口 | `High-Pressure` 和 `600 kPa rated pressure` 可用；绝不能写成 `300 mL/min at 600 kPa` |
| DPGL800 | `6 L/min` 为**单泵头空载气体流量**；最大正压 30 kPa；最大负压 `< -90 kPa`；介质为气体及气液混合物 | 24BS6 无刷 10,000 h | EP/PS：EPDM+EPDM+PPS；FF/PS：PTFE 膜片 + FFKM 阀 + PPS 泵头 | 不能称 6 L/min 液体流量；不能写等值 `-90 kPa`；两个极限值不是同一工况点 |

### 5.2 需要人工确认的文档冲突

1. DPL30 当前项目页/新指南为自吸 6 mH₂O、介质温度 +80°C；仍链接的 2025-07 英文 PDF 为自吸 5 m、+40°C。
2. DPL60 当前页和英文 PDF 为 +40°C，而 2026 选型指南为 +80°C。
3. DPL60 英文 PDF 的订货表文本提取疑似把 EP/PS 膜片写成 PTFE，但型号代码、项目配置和新指南均为 EPDM；应人工检查 PDF 原图或源表。
4. DPGL800 线上详情的 `Working Medium` 当前渲染为逗号，但项目正式数据和指南均为“Gas and gas-liquid mixtures”。
5. 部分生成摘要把空载流量称为 rated flow、把 DPGL800 最大正压称为 rated pressure；推荐 SEO 文案不沿用这些不准确表达。

因此本报告的推荐 Title/Description 刻意不使用有冲突的温度与 DPL30 自吸值。

---

## 6. Cannibalization 独立判断

### 6.1 风险判断

- **DPL30：** Series URL 与 Brushed SKU H1 完全相同；两个 SKU 与通用页都围绕同一个系列词。存在较高结构性竞争风险。
- **DPL60：** 同样存在 Series/Brushed H1 重复和 SKU 语义趋同，风险较高。
- **DPL30H：** 600 kPa 是最强差异词，应由 Series URL 主承接；两个 SKU 应承接具体型号和 motor，避免三个页面都以 600 kPa 为主标题起点。
- **DPGL800：** Series + 两个材料 SKU 三页 H1 完全相同，且 Gas-Liquid 分类也可能争 broad term。应由分类承接 broad category，由 Series 承接 DPGL800/vacuum/performance，由 SKU 承接完整型号和材料。

没有实际 query 报表时，以上不能写成“GSC 已证实互抢”，但页面信号足以支持在上线实验前先明确归属。

### 6.2 推荐分工

```text
Broad category keyword
→ 分类页

Series-level flow / pressure / vacuum keyword
→ 已存在的 Series URL

Exact model / motor / material keyword
→ SKU URL

Selection question / troubleshooting query
→ 技术文章
```

这样并不是把数字从 SKU 正文中删除。SKU 正文和 Description 仍可准确说明性能；只是不让所有 SKU 同时以同一个系列级 head term 作为 Title 主入口。

---

## 7. GPT 第一版 15 个 Title 逐条评价

| # | 候选 Title | 评价 | 理由 / 建议方向 |
|---:|---|---|---|
| 1 | `Miniature Diaphragm Pumps for Liquid & Gas \| FOREACH` | 小改 | 当前成熟范围是 liquid 与 gas-liquid，不应暗示已有独立纯气体产品线。改为 `Liquid & Gas-Liquid Media` 或同义自然表达。 |
| 2 | `Miniature Liquid Diaphragm Pumps \| 300–600 mL/min \| FOREACH` | 大改 | 数字来自 DPL 空载级别，但先决条件是修复分类、移出 DPGL800。Broad category 不应抢两个 Series 数字词；最终建议把范围移入 Description。 |
| 3 | `300 mL/min Brushless Liquid Diaphragm Pump \| DPL30 \| FOREACH` | 大改 | 数字真实但属于空载；未包含实际 SKU `DPL30-24BB-EP/PS`，并与 DPL30 Series 争 300 mL/min 主词。 |
| 4 | `300 mL/min Brushed Liquid Diaphragm Pump \| DPL30 \| FOREACH` | 大改 | 同上；SKU Title 应以 `DPL30-24DB-EP/PS` 开头。 |
| 5 | `600 mL/min Brushless Liquid Diaphragm Pump \| DPL60 \| FOREACH` | 大改 | Series 应主承接 600 mL/min；SKU 应以 `DPL60-24BB-EP/PS` 和 motor 差异开头。 |
| 6 | `600 mL/min Brushed Liquid Diaphragm Pump \| DPL60 \| FOREACH` | 大改 | 同上；改用完整 `DPL60-24DB-EP/PS`。 |
| 7 | `600 kPa Brushless High-Pressure Diaphragm Pump \| DPL30H \| FOREACH` | 大改 | 600 kPa 真实且重要，但应首先归属 Series；SKU 应以 `DPL30H-24BS-EP/PS` 为主体。 |
| 8 | `600 kPa Brushed High-Pressure Diaphragm Pump \| DPL30H \| FOREACH` | 大改 | 同上；改用完整 `DPL30H-24DS-EP/PS`。 |
| 9 | `6 L/min Gas-Liquid Diaphragm Pump \| -90 kPa Vacuum \| FOREACH` | 大改 | 6 L/min 必须限定为 single-head no-load gas flow；正式真空为 `< -90 kPa`；两者非同一工况，且未写具体型号/材料。 |
| 10 | `300 mL/min Liquid Diaphragm Pump Selection Guide \| DPL30 \| FOREACH` | 保留 | 搜索问题和系列明确；Description 中补 `no-load` 即可。 |
| 11 | `600 mL/min Liquid Diaphragm Pump Selection Guide \| DPL60 \| FOREACH` | 保留 | 意图准确，优于当前冗长栏目式 Title。 |
| 12 | `600 kPa High-Pressure Diaphragm Pump Guide \| DPL30H \| FOREACH` | 保留 | 600 kPa 是确认的额定压力，也是该系列最强差异词。 |
| 13 | `Gas-Liquid Diaphragm Pump Selection \| 6 L/min, -90 kPa \| FOREACH` | 大改 | 同样缺少 no-load gas-flow 限定并把 `< -90` 写成等值；数字宜移入严谨的 Description。 |
| 14 | `Diaphragm Pump Flow-Pressure Curve: Predict Installed Flow \| FOREACH` | 保留 | 明确回答工程问题，信息意图清楚；比产品式标题更合适。 |
| 15 | `300 vs 600 mL/min Diaphragm Pump: How to Choose \| FOREACH` | 小改 | 比较型意图清楚；建议把 singular `Pump` 微调为 plural `Pumps`，正文/Description 再解释都是空载基准，选型必须看工作点。 |

**整体评分：64/100。**

最大问题不是字符长度，而是页面角色设计：忽略已有 Series URL，把系列级核心词重复放到每个 SKU Title；这会削弱 Series 与 SKU 的搜索意图区分。第二大问题是 DPGL800 的数字缺少工况和不等号限定。

这是结构性审稿分，不是排名模型或搜索量评分。评分维度如下：

| 维度 | 得分 | 满分 | 判断 |
|---|---:|---:|---|
| 参数准确性与限定 | 18 | 25 | DPL 数字基本真实；DPGL800 缺 no-load gas-flow 和 `< -90 kPa` 限定 |
| 搜索意图匹配 | 17 | 20 | 5 个文章候选整体较好；分类候选仍需按真实介质和页面角色调整 |
| 页面角色 / Cannibalization 控制 | 8 | 25 | 忽略现有 Series URL，把系列级数字主词重复分给 SKU，是最大扣分项 |
| 唯一性与型号差异 | 10 | 15 | Brushed/Brushless 有区分，但缺完整 SKU code 与 material configuration |
| 自然度与摘要可读性 | 11 | 15 | 大部分自然；`Gas` 范围、DPGL 极限值和个别 singular/plural 需修正 |
| **合计** | **64** | **100** | 可作为草案，但不能原样批量实施 |

---

## 8. 表2：推荐方案

以下均是未来实施建议，**本轮没有上线这些文字**。

### 8.1 分类、Series 与 SKU

| URL | Target Keyword | Recommended Title | Recommended H1 | Recommended Meta Description |
|---|---|---|---|---|
| [Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/) | miniature diaphragm pump | `Miniature Diaphragm Pumps for Liquid & Gas-Liquid Media \| FOREACH` | `Miniature Diaphragm Pumps` | `Compare FOREACH miniature diaphragm pumps for liquid and gas-liquid media across the DPL30, DPL60, DPL30H and DPGL800 series, including standard and high-pressure options.` |
| [Liquid category](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/) | liquid diaphragm pump | `Miniature Liquid Diaphragm Pumps \| FOREACH` | `Miniature Liquid Diaphragm Pumps` | `Compare DPL30, DPL60 and DPL30H miniature liquid diaphragm pumps by no-load flow, rated pressure, motor type and wetted materials for fluid-path selection.` |
| [Gas-Liquid category](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/) | gas-liquid diaphragm pump | `Gas-Liquid Diaphragm Pumps \| FOREACH` | `Gas-Liquid Diaphragm Pumps` | `Browse FOREACH gas-liquid diaphragm pumps for gas and gas-liquid media, and compare available series and configurations by motor, wetted materials and product specifications.` |
| [DPL30 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/) | 300 mL/min diaphragm pump | `300 mL/min Liquid Diaphragm Pump \| DPL30 Series \| FOREACH` | `DPL30 Series Liquid Diaphragm Pumps` | `Compare DPL30 brushed and brushless liquid diaphragm pumps with 300 mL/min no-load flow, 100 kPa rated pressure, motor-life and material options.` |
| [DPL30-24DB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/) | DPL30-24DB; brushed liquid diaphragm pump | `DPL30-24DB-EP/PS Brushed Liquid Diaphragm Pump \| FOREACH` | `DPL30-24DB-EP/PS Brushed Liquid Diaphragm Pump` | `DPL30-24DB-EP/PS is a 24 V brushed liquid diaphragm pump with 300 mL/min no-load flow, 100 kPa rated pressure and 3,000-hour rated life under rated-voltage continuous operation.` |
| [DPL30-24BB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/) | DPL30-24BB; brushless liquid diaphragm pump | `DPL30-24BB-EP/PS Brushless Liquid Diaphragm Pump \| FOREACH` | `DPL30-24BB-EP/PS Brushless Liquid Diaphragm Pump` | `DPL30-24BB-EP/PS is a 24 V brushless liquid diaphragm pump with 300 mL/min no-load flow, 100 kPa rated pressure and 10,000-hour rated life under rated-voltage continuous operation.` |
| [DPL60 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/) | 600 mL/min diaphragm pump | `600 mL/min Liquid Diaphragm Pump \| DPL60 Series \| FOREACH` | `DPL60 Series Liquid Diaphragm Pumps` | `Compare DPL60 brushed and brushless liquid diaphragm pumps with 600 mL/min no-load flow, 100 kPa rated pressure, 3 mH₂O self-priming and motor-life options.` |
| [DPL60-24DB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/) | DPL60-24DB; brushed liquid diaphragm pump | `DPL60-24DB-EP/PS Brushed Liquid Diaphragm Pump \| FOREACH` | `DPL60-24DB-EP/PS Brushed Liquid Diaphragm Pump` | `DPL60-24DB-EP/PS is a 24 V brushed liquid diaphragm pump with 600 mL/min no-load flow, 100 kPa rated pressure and 3,000-hour rated life under rated-voltage continuous operation.` |
| [DPL60-24BB-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/) | DPL60-24BB; brushless liquid diaphragm pump | `DPL60-24BB-EP/PS Brushless Liquid Diaphragm Pump \| FOREACH` | `DPL60-24BB-EP/PS Brushless Liquid Diaphragm Pump` | `DPL60-24BB-EP/PS is a 24 V brushless liquid diaphragm pump with 600 mL/min no-load flow, 100 kPa rated pressure and 10,000-hour rated life under rated-voltage continuous operation.` |
| [DPL30H Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/) | 600 kPa / high-pressure diaphragm pump | `600 kPa High-Pressure Diaphragm Pump \| DPL30H Series \| FOREACH` | `DPL30H Series High-Pressure Liquid Diaphragm Pumps` | `Compare DPL30H brushed and brushless pumps with 600 kPa rated pressure, 300 mL/min no-load flow, 3 mH₂O self-priming and motor-life options.` |
| [DPL30H-24DS-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/) | DPL30H-24DS; brushed high-pressure pump | `DPL30H-24DS-EP/PS Brushed High-Pressure Diaphragm Pump \| FOREACH` | `DPL30H-24DS-EP/PS Brushed High-Pressure Liquid Diaphragm Pump` | `DPL30H-24DS-EP/PS is a 24 V brushed liquid diaphragm pump with 600 kPa rated pressure, 300 mL/min no-load flow and 3,000-hour rated life under rated-voltage continuous operation.` |
| [DPL30H-24BS-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/) | DPL30H-24BS; brushless high-pressure pump | `DPL30H-24BS-EP/PS Brushless High-Pressure Diaphragm Pump \| FOREACH` | `DPL30H-24BS-EP/PS Brushless High-Pressure Liquid Diaphragm Pump` | `DPL30H-24BS-EP/PS is a 24 V brushless liquid diaphragm pump with 600 kPa rated pressure, 300 mL/min no-load flow and 10,000-hour rated life under rated-voltage continuous operation.` |
| [DPGL800 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/) | DPGL800; vacuum diaphragm pump | `DPGL800 Gas-Liquid Diaphragm Pump \| Flow & Vacuum \| FOREACH` | `DPGL800 Series Gas-Liquid Diaphragm Pumps` | `Compare DPGL800 configurations with 6 L/min single-head no-load gas flow, maximum positive pressure of 30 kPa and maximum negative pressure below -90 kPa.` |
| [DPGL800-24BS6-EP/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/) | DPGL800-24BS6-EP/PS; EPDM configuration | `DPGL800-24BS6-EP/PS Gas-Liquid Diaphragm Pump \| FOREACH` | `DPGL800-24BS6-EP/PS Brushless Gas-Liquid Diaphragm Pump` | `DPGL800-24BS6-EP/PS is a 24 V brushless gas-liquid diaphragm pump with EPDM diaphragm and valves, a PPS pump head, and 10,000-hour rated life under rated-voltage continuous operation.` |
| [DPGL800-24BS6-FF/PS](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/) | DPGL800-24BS6-FF/PS; FFKM configuration | `DPGL800-24BS6-FF/PS Gas-Liquid Diaphragm Pump \| FOREACH` | `DPGL800-24BS6-FF/PS Brushless Gas-Liquid Diaphragm Pump` | `DPGL800-24BS6-FF/PS is a 24 V brushless gas-liquid diaphragm pump with a PTFE diaphragm, FFKM valves, a PPS pump head, and 10,000-hour rated life under rated-voltage continuous operation.` |

说明：

- Product Title/H1 不要求机械地完全不同。SKU 的完整身份本身就是最重要 H1；Title 在其后添加品牌是合理一致，而不是无意义重复。
- 系列数字可以出现在 SKU Description 和正文，但应明确 `no-load flow` / `rated pressure`，不要让 SKU Title 与 Series 主词形成完全相同的入口。
- DPGL800 两个 SKU 的 Title 优先用完整 material code 区分，Series Title 才承担 vacuum / gas-flow 主词。

#### Title → H1 → 首段的分工

- **Title**：回答搜索结果页中的“这是什么页面、承接哪个主意图”。
- **H1**：准确命名页面实体；分类页用产品品类，Series 页用中立系列名，SKU 页用完整型号和真实版本。
- **首段**：补足 Title 无法安全容纳的参数定义、工况和页面选择价值，不机械重复 Title。

DPL60 Series 示例：

```text
Title: 600 mL/min Liquid Diaphragm Pump | DPL60 Series | FOREACH
H1: DPL60 Series Liquid Diaphragm Pumps
First paragraph: The FOREACH DPL60 Series includes brushed and brushless
miniature liquid diaphragm pumps with 600 mL/min no-load flow and
100 kPa rated pressure. Compare motor life and configuration before
checking the flow-pressure curve at the required operating point.
```

DPGL800 SKU 示例：

```text
Title: DPGL800-24BS6-FF/PS Gas-Liquid Diaphragm Pump | FOREACH
H1: DPGL800-24BS6-FF/PS Brushless Gas-Liquid Diaphragm Pump
First paragraph: DPGL800-24BS6-FF/PS is the 24 V brushless configuration
with a PTFE diaphragm, FFKM valves and PPS pump head. Its 6 L/min value
is single-head no-load gas flow; maximum negative pressure is below
-90 kPa and is not the same operating point as the no-load flow value.
```

同一逻辑可直接套用到表中每个重点页，但具体首段必须与该页真实正文和配置一致；本轮不改正文。

### 8.2 核心技术文章

| URL | Target Keyword | Recommended Title | Recommended H1 | Recommended Meta Description |
|---|---|---|---|---|
| [DPL30 guide](https://www.foreachtek.com/en/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/) | 300 mL/min diaphragm pump selection | `300 mL/min Liquid Diaphragm Pump Selection Guide \| DPL30 \| FOREACH` | `How to Select a 300 mL/min Liquid Diaphragm Pump: DPL30 Model Guide` | `Learn how to select a DPL30 by 300 mL/min no-load flow, 100 kPa rated pressure, flow-pressure curve, motor life, model code and wetted materials.` |
| [DPL60 guide](https://www.foreachtek.com/en/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/) | 600 mL/min diaphragm pump selection | `600 mL/min Liquid Diaphragm Pump Selection Guide \| DPL60 \| FOREACH` | `How to Select a 600 mL/min Liquid Diaphragm Pump: DPL60 Model Guide` | `Select a DPL60 by 600 mL/min no-load flow, 100 kPa rated pressure, operating point, motor life, model code and wetted-material configuration.` |
| [DPL30H guide](https://www.foreachtek.com/en/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide/) | 600 kPa high-pressure pump guide | `600 kPa High-Pressure Diaphragm Pump Guide \| DPL30H \| FOREACH` | `How to Select a 600 kPa High-Pressure Diaphragm Pump: DPL30H Guide` | `Select a DPL30H by target operating flow, 600 kPa rated pressure, tubing, motor life, wetted materials and model code without treating no-load flow as loaded flow.` |
| [DPGL800 guide](https://www.foreachtek.com/en/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump-selection-guide/) | gas-liquid diaphragm pump selection | `Gas-Liquid Diaphragm Pump Selection Guide \| DPGL800 \| FOREACH` | `How to Select a DPGL800 Gas-Liquid Diaphragm Pump for Flow and Vacuum` | `Select a DPGL800 by 6 L/min single-head no-load gas flow, 30 kPa maximum positive pressure, maximum negative pressure below -90 kPa, motor and materials.` |
| [Flow-pressure curve](https://www.foreachtek.com/en/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/) | diaphragm pump flow-pressure curve | `Diaphragm Pump Flow-Pressure Curve: Predict Installed Flow \| FOREACH` | `How to Read a Diaphragm Pump Flow-Pressure Curve and Predict Installed Flow` | `Learn how a pump curve and system resistance set the operating point, and how tubing, viscosity, inlet vacuum and outlet backpressure change installed flow.` |
| [300 vs 600](https://www.foreachtek.com/en/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/) | 300 vs 600 mL/min diaphragm pump | `300 vs 600 mL/min Diaphragm Pumps: How to Choose \| FOREACH` | `How to Choose Between 300 and 600 mL/min Diaphragm Pumps` | `Compare 300 and 600 mL/min no-load flow classes using task volume, pumping time, system pressure, pump curves and prototype testing—not free-flow alone.` |
| [100 vs 600 kPa](https://www.foreachtek.com/en/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection/) | 100 vs 600 kPa diaphragm pump | `100 vs 600 kPa Diaphragm Pumps: How to Choose \| FOREACH` | `When Does a Fluid Path Need a 600 kPa High-Pressure Diaphragm Pump?` | `Compare 100 and 600 kPa rated-pressure classes using target flow, tubing, valves, filters, endpoints, system pressure budget and the pump operating curve.` |
| [Life-science DPL60](https://www.foreachtek.com/en/resources/technical-articles/life-science-dpl60-600ml-min-diaphragm-pump-selection-guide/) | DPL60 life-science fluid paths | `DPL60 Diaphragm Pump Selection for Life-Science Fluid Paths \| FOREACH` | `How to Select a DPL60 for Life-Science Washing, Drainage and Waste-Fluid Paths` | `Evaluate DPL60 pumps for life-science instrument fluid paths using installed flow, backpressure, priming, materials, duty profile and service-life validation.` |

这些文章仍是信息型支持页，不应取代 Series 的商业主页面。保留“如何选、如何判断、如何预测”的问题式意图，比把文章 Title 改成产品销售式标题更重要。

---

## 9. 是否需要新增 Series Landing Page

### 明确结论

**额外新建 `/dpl30/`、`/dpl60/`、`/dpl30h/`、`/dpgl800/`：不建议建。**

**把现有 4 个通用 URL 改造成真正 Series Landing Page：建议在第一轮做。**

原因：

1. 4 个通用 Series URL 已经上线、200、self-canonical，并已进入 Sitemap。
2. 新 URL 会与现有 URL 重复，新增 canonical、重定向、内链迁移和关键词归属问题。
3. 当前真正的问题不是缺 URL，而是通用页复用了 Brushed/Brushless SKU 的内容和 H1，没有形成中立的系列比较入口。
4. 现有 Series 页可以展示 brushed/brushless、material、voltage、life、flow/pressure curve、选型表，并链接当前 8 个公开 SKU。
5. 配置表中的未发布组合不应自动生成或链接到不存在的 SKU 页面。

Series 页和 SKU 页建议结构：

```text
Series URL
├─ 系列级流量/压力/真空意图
├─ 完整配置比较与选型逻辑
├─ Brushed / Brushless / Material 入口
└─ 链接真实公开 SKU

SKU URL
├─ 完整型号
├─ 电机、寿命、材料和接口差异
└─ 回链对应 Series
```

---

## 10. 内链分析

| 来源文章 | 当前实际 anchor → target | 问题 | 推荐的未来内链 |
|---|---|---|---|
| DPL30 selection guide | `DPL30 Series Brushed Liquid Diaphragm Pump` → `/en/.../dpl30-24db.../`<br>`DPL30 Series Brushless Liquid Diaphragm Pump` → `/en/.../dpl30-24bb.../` | 两个 anchor 有描述性，但都直达 SKU；没有 DPL30 Series 主入口 | 先链 `DPL30 300 mL/min liquid diaphragm pump series`，具体 motor 段落再链 SKU |
| DPL60 selection guide | `DPL60 liquid diaphragm pump product page` → DPL60 Series<br>`liquid diaphragm pump category` → 总分类（实际不是 Liquid 子分类）<br>两个 `DPL60 Series Brushed/Brushless...` → 对应 SKU | Series 与 SKU 均有链接，但分类 anchor/target 不完全一致 | Series 保持主入口；把分类链接明确到 Liquid 分类；具体 motor 段落再链 SKU |
| DPL30H selection guide | `DPL30H high-pressure liquid diaphragm pump series page` → DPL30H Series<br>`diaphragm pump category` → 总分类<br>两个 `DPL30H Series Brushed/Brushless...` → 对应 SKU | 基本完整；SKU anchor 仍以 Series 开头，角色稍混 | Series 用 `DPL30H 600 kPa high-pressure diaphragm pump`；SKU anchor 使用完整型号 |
| DPGL800 selection guide | `DPGL800 gas-liquid diaphragm pump product page` → DPGL800 Series<br>`diaphragm pumps` → 总分类<br>`DPGL800 Series Brushless Gas-Liquid Diaphragm Pump` → FF/PS SKU | EP/PS SKU 缺失；FF/PS anchor 未体现材料 code | Series 主链；材料比较处分别使用 `DPGL800-24BS6-EP/PS` 与 `...FF/PS` |
| Flow-pressure curve | 四个 `DPL30/DPL60 Series Brushed/Brushless...` → 对应 SKU<br>`View diaphragm pumps` → 总分类 | `View...` 较泛；缺 DPL30H Series；过早直达 SKU | 增加 DPL30/DPL60/DPL30H Series，用系列 + operating-point 上下文锚文本 |
| 300 vs 600 | `DPL30 liquid diaphragm pump` → **无 `/en/`** DPL30 Series<br>`DPL60 liquid diaphragm pump` → **无 `/en/`** DPL60 Series<br>四个 motor anchor → 对应英文 SKU<br>`View diaphragm pumps` → 英文总分类 | 两个最关键 Series 链接缺语言前缀；`View...` 较泛 | 改为英文 DPL30/DPL60 Series，并用 `300 mL/min DPL30 series` / `600 mL/min DPL60 series` |
| 100 vs 600 kPa | 四个 `DPL30/DPL60 Series Brushed/Brushless...` → 对应 SKU<br>`View Diaphragm Pumps` → 总分类 | 最相关 DPL30H Series 未链接；也没有 600 kPa 描述性 anchor | 增加 `DPL30H 600 kPa high-pressure diaphragm pump series` |
| 300 mL/min flow margin | `DPL30 liquid diaphragm pump` → **无 `/en/`** DPL30 Series<br>两个 motor anchor → 英文 SKU<br>`View diaphragm pumps` → 总分类 | Series 主链接缺语言前缀；分类 anchor 较泛 | 修正英文 DPL30 Series，并用 `DPL30 300 mL/min liquid diaphragm pump` |
| Suction vs discharge | 四个 `DPL30/DPL60 Series Brushed/Brushless...` → 英文 SKU<br>`View Diaphragm Pumps` → **无 `/en/`** 总分类 | 总分类链接缺语言前缀；没有 Series 主入口 | 修正英文分类/Series 链接；按示例系列自然链接，而非仅直达 SKU |
| Life-science DPL60 | `DPL60/DPL30/DPL30H/DPGL800 ... pump` → 四个英文 Series<br>两个 `DPL60 Series Brushed/Brushless...` → SKU<br>`Explore diaphragm pumps` → 总分类 | 链接广但语义相关；泛锚文本只出现在汇总 CTA | DPL60 Series 作为主转化入口，其他 Series 只在真实比较段落保留 |

表内 `/en/.../` 仅为控制列宽的显示缩写，对应完整真实 target URL 已逐一列在 2.1 节；无 `/en/` 的三类异常链接则按实际相对路径明确标注，不是推测。

结论：当前锚文本并非全部是 `Learn More`，不需要机械全站替换。推荐路径是：

```text
技术文章 → 对应 Series 主页面 → 具体 SKU
```

只有文章段落明确讨论 Brushed/Brushless 或 EP/FF 材料时，才直接链接 SKU。无 `/en/` 的内部产品链接和 `100 vs 600 kPa` 未链接 DPL30H 是 P1。

---

## 11. 表3：关键词—页面映射

| Keyword Cluster | Primary Page | Secondary Support | 不建议竞争的页面 | Cannibalization Risk |
|---|---|---|---|---|
| miniature diaphragm pump | [Diaphragm Pumps 总分类](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/) | Liquid、Gas-Liquid 分类 | 各 SKU | 中：总分类 Title/H1 目前信号不足 |
| liquid diaphragm pump | [Liquid Diaphragm Pumps 分类](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/)（P0 修复后） | 总分类；DPL30/DPL60/DPL30H Series | DPGL800；各 SKU 的宽泛 Title | 高：当前最终 DOM 与其他分类相同 |
| 300 mL/min diaphragm pump | [DPL30 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/) | DPL30 guide；300 mL/min flow-margin article | DPL30 brushed/brushless SKU 作为同词主页面 | 高：Series 与 Brushed H1 完全重复 |
| 600 mL/min diaphragm pump | [DPL60 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/) | DPL60 guide；300 vs 600 article | DPL60 brushed/brushless SKU 作为同词主页面 | 高：Series 与 Brushed H1 完全重复 |
| 600 kPa diaphragm pump | [DPL30H Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/) | DPL30H guide；100 vs 600 kPa article | 两个 DPL30H SKU 作为同词主页面 | 高：Series 与 Brushed H1 重复，关键文章缺链 |
| high-pressure diaphragm pump | [DPL30H Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/) | DPL30H guide；pressure-budget articles | DPL30/DPL60 普通液泵页 | 中高 |
| gas-liquid diaphragm pump | [Gas-Liquid 分类](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/)（P0 修复后） | DPGL800 Series；DPGL800 guide | Liquid 分类 | 高：当前 Gas-Liquid 页面显示所有 DPL |
| vacuum diaphragm pump | [DPGL800 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/) | DPGL800 selection guide | Liquid 分类、DPL Series、DPGL SKU 作为 broad 主页面 | 高：Series + 两个 SKU H1 完全相同 |
| diaphragm pump flow-pressure curve | [Flow-pressure curve article](https://www.foreachtek.com/en/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/) | DPL30/DPL60/DPL30H Series | 各 SKU 作为信息型主页面 | 低到中：主题已有清晰文章，但内链不完整 |

注意：`gas-liquid diaphragm pump` 由分类页承接 broad plural/category intent；`DPGL800`、`vacuum`、`6 L/min no-load gas flow` 由 DPGL800 Series 承接。两页正文与内链必须按这一分工写清，否则一系列只有一个产品族时仍可能发生重叠。

---

## 12. 分阶段执行建议

### Phase 0：先修正测量前提

1. 修正 Liquid / Gas-Liquid 路由筛选值与数据枚举不一致。
2. 确保服务器 HTML 与 hydration 后 DOM 显示同一分类集合。
3. 为总分类、Liquid、Gas-Liquid 增加唯一且可见的主题 H1。
4. Liquid 仅显示 DPL30/DPL60/DPL30H；Gas-Liquid 仅显示 DPGL800。

Phase 0 不完成，就不适合把 Title 改动的结果当成单一变量进行观察。

### Phase 1：约 19 个英文页面

- 3 个重点分类页。
- 4 个现有 Series URL。
- 8 个当前公开 SKU URL。
- 4 篇系列选型核心文章：DPL30、DPL60、DPL30H、DPGL800。

合计约 **19 页**。Flow-pressure curve、300 vs 600、100 vs 600 可作为紧随其后的 3 个信息型页面；如果希望严格控制在 20 页内，第一轮先加 Flow-pressure curve，另外两篇进入下一小批。

### Phase 2：观察与判断

- 2–4 周查看抓取、索引、Impressions、Clicks、CTR、query 分布等领先信号。
- 对 Average Position、主页面归属和 cannibalization 的耐久判断，建议至少观察 4–6 周或两个有效重抓周期。
- 以 GSC/Bing 的真实 query-page 对照为依据，不根据单日波动下结论。

### Phase 3：扩展

在 Diaphragm Pump 试点证实有效后，再把“页面角色—关键词归属—唯一描述—内链”方法复制到 Plunger Pump、Pipetting Pump、Syringe Pump、Valve、Fitting。复制方法，不复制具体 Title 模板。

---

## 13. 表4：P0–P3 优先级

| Priority | Page / Problem | Why | Recommended Action |
|---|---|---|---|
| P0 | Liquid / Gas-Liquid 筛选与 hydration 不一致 | 服务器 HTML 无匹配，最终 DOM 又显示未过滤的 7 项；搜索引擎和用户可能获得不同语义 | 先修正筛选枚举和 hydration fallback，确保 SSR/DOM一致 |
| P0 | Liquid 显示 DPGL800；Gas-Liquid 显示全部 DPL | 三个分类可见产品集合相同，直接削弱主题并制造分类级竞争 | Liquid 仅 DPL30/DPL60/DPL30H；Gas-Liquid 仅 DPGL800 |
| P0 | 三个重点分类缺可见主题 H1 | 页面主题层级不足，隐藏打印 H1 不能替代 | 增加唯一、可见、与 Title/首段一致的 H1 |
| P1 | 4 个 Series 页与 SKU 角色不清 | 通用页复用 Brushed/Brushless H1，Series 与 SKU 结构性竞争 | 用现有通用 URL 承接系列词；SKU 承接完整型号/motor/material |
| P1 | 16 个已发现产品体系 Description 高度模板化（首轮试点 15 页） | 搜索摘要无法表达真实差异；OG 同步继承 | 按 no-load flow、rated pressure、motor life、material 写唯一描述 |
| P1 | 产品 Title 未保留正式型号格式和真实差异 | 当前虽含型号片段，但 `-`、`/` 被空格化，且 `PUMP/GAS` 大写，用户可读性弱 | SKU 用正式 code + motor/material + product type |
| P1 | 关键文章内链缺失或无 `/en/` | 分散 Series 主题权重，可能送英文用户到错误语言路径 | 文章优先链接 Series；修正无语言前缀链接 |
| P1 | 100 vs 600 kPa 未链接 DPL30H | 最相关高压商业页没有上下文支持 | 增加自然的 DPL30H Series 锚文本 |
| P1 | 正式页面/指南/PDF 参数冲突 | 未来摘要可能误用自吸、温度或材料值 | 在使用这些字段前人工确认并统一资料版本 |
| P2 | 多篇文章 Title/Description 偏长 | 可能降低摘要可控性，但不是分类/意图错误 | 按问题意图逐篇压缩，优先去掉栏目冗词 |
| P2 | DPGL Working Medium 线上渲染为空/逗号 | 降低用户理解和参数可信度，但不需要改 SEO 数值来掩盖 | 单独修正翻译/渲染，正式语义保持 gas and gas-liquid mixtures |
| P2 | Gas 分类当前无有效产品 | 目前不适合争增长型关键词 | 产品数据成熟前不纳入 Title 试点，也不强行扩写 |
| P3 | 为未发布 12V/FF/BSC 配置建 URL | 会制造 404、薄页或重复页 | 只有确认公开销售和独立内容后再评估 |
| P3 | 扩展到其他产品线 | 第一轮尚无 query 结果 | 完成试点复盘后再扩展 |

---

## 14. 对 10 个问题的明确回答

### 1. 当前 Diaphragm Pumps 总分类 Title 是否应该改？

**是。** 当前 `Diaphragm Pumps | FOREACH` 太泛，无法表达 miniature 和真实介质范围。建议总分类承接 `miniature diaphragm pump`，但不要暗示已有成熟的纯 gas 产品线。

### 2. Liquid Diaphragm Pumps 分类 Title 是否应该改？

**是，但必须在 P0 分类筛选修复后一起上线。** 只改 Title、不修最终产品集合，会让标题与内容更不一致，也无法公平测量效果。

### 3. DPGL800 是否应该从 Liquid Diaphragm Pumps 分类中移出？

**是。** 从 Liquid 的可见集合移出；继续保留在 Diaphragm Pumps 总分类和 Gas-Liquid 分类。此举是提高主题聚焦，不是否认 DPGL800 的气液混合能力。

### 4. DPL30 Brushed / Brushless 是否存在关键词竞争？

**存在较高结构性风险，但没有实际 query 数据证明已经发生。** Series URL 应承接 `300 mL/min diaphragm pump`；两个 SKU 分别承接完整型号与 Brushed/Brushless 精确意图。

### 5. DPL60 Brushed / Brushless 是否存在关键词竞争？

**同样存在较高结构性风险。** Series 承接 600 mL/min 主词，SKU 承接完整型号、电机和配置。

### 6. DPL30H 是否应该重点围绕 `600 kPa`？

**是。** `600 kPa` 是确认的额定压力和最强差异属性，应由 DPL30H Series 主承接。若同时写 300 mL/min，必须明确它是空载流量，不能写成 `300 mL/min at 600 kPa`。

### 7. DPGL800 是否应该重点围绕 `6 L/min + gas-liquid + vacuum`？

**是，但必须严格限定。** `6 L/min` 是单泵头空载气体流量；真空正式值是最大负压 `< -90 kPa`；两者不是同一工况。Series 可围绕 DPGL800/vacuum，数字放在严谨 Title 或 Description 中。

### 8. 是否需要建立 DPL30 / DPL60 / DPL30H Series Landing Page？

**不需要新增 URL。** 4 个 Series 式通用 URL 已经存在。建议现在把现有页面改造成真正的 Series Landing Page，而不是再建 `/dpl30/` 等重复地址。

### 9. 第一轮应该改多少个页面？

**约 19 个英文页面。** 前提是先完成 Phase 0。建议 3 分类 + 4 Series + 8 SKU + 4 核心选型文章。后续小批再处理 Flow-pressure、300 vs 600、100 vs 600。

### 10. GPT 第一版 Title 方案整体评分是多少，最大问题是什么？

**64/100。** 最大问题是忽略已有 Series URL，把系列级数字词重复分配给每个 SKU，并遗漏完整 SKU 型号，增加结构性 cannibalization 风险；其次是 DPGL800 的 6 L/min / -90 kPa 缺少正式定义限定。

---

## 15. 最优先的前 5 个页面

| 顺序 | 页面 | 为什么先做 |
|---:|---|---|
| 1 | [Liquid Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps/) | P0：SSR/DOM 筛选不一致、混入 DPGL800、无可见 H1 |
| 2 | [Gas-Liquid Diaphragm Pumps](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/gas-liquid-diaphragm-pumps/) | P0：最终显示全部 DPL、与 Liquid/总分类集合相同、无可见 H1 |
| 3 | [Diaphragm Pumps 总分类](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/) | `miniature diaphragm pump` 的应有主页面，当前 Title/Description/H1 信号不足 |
| 4 | [DPL30 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/) | 300 mL/min 主要商业页；当前与 Brushed SKU H1 重复 |
| 5 | [DPL60 Series](https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/) | 600 mL/min 主要商业页；当前与 Brushed SKU H1 重复 |

DPL30H Series 与 DPGL800 Series 紧随其后；它们分别承担 600 kPa/high-pressure 与 DPGL800/vacuum 的核心意图。

---

## 16. 最终结论与本轮修改声明

最合理的第一步不是批量“加长 Title”，而是先使分类页的服务器 HTML、最终 DOM、可见 H1 和产品集合一致。随后用现有 Series URL 建立系列级关键词主页面，用完整 SKU 型号、电机和材料差异建立精确产品页，再让信息型文章通过自然内链支持 Series。

本轮实际修改确认：

- 网站代码：否
- Title：否
- H1：否
- Meta Description：否
- 页面正文：否
- 产品分类：否
- URL：否
- Sitemap：否
- Canonical：否
- Hreflang：否
- JSON-LD：否
- OpenGraph：否
- commit：否
- deploy：否
- **新增文件：仅本分析报告**
