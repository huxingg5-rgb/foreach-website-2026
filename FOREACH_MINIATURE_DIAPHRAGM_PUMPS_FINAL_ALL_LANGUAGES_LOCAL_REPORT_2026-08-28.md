# FOREACH 微型隔膜泵最终全语言本地修改报告

- 日期：2026-08-28
- 项目：`F:\WebsiteProjects\foreach-website-2026`
- 范围：仅隔膜泵体系，六语言（zh-CN / en / es / fr / ko / ru）
- 状态：本地修改完成；未 commit、未 push、未 deploy

> 工作区在本任务开始前已有大量与本任务无关的脏改动（包括其他产品线 PDF、SVG、文章与历史报告）。本报告只列本任务实际改动；既有无关改动全部保留，未回滚、未暂存、未覆盖。

## 1. 修改文件清单

### 1.1 路由、页面与共享组件

- `app/[locale]/products/[...segments]/page.tsx`
- `app/products/pumps/miniature-diaphragm-pumps/[slug]/page.tsx`（新增）
- `app/products/pumps/diaphragm-pumps/[slug]/page.tsx`（删除旧父路径页面，仅保留精确 301）
- `app/products/products.css`
- `components/products/diaphragm-pumps/DiaphragmPumpDetailRoute.tsx`（新增共享详情路由）
- `components/products/detail/ProductDetailClient.tsx`
- `components/products/selection/ProductSelectionClient.tsx`
- `components/products/selection/card-copy/product-card-copy.intl.ts`

实现方式不是为 42 个页面分别复制样式：六语言 7 个 Reference 页面共用 `DiaphragmPumpDetailRoute`、`ProductDetailClient`、统一路由数据和详情页现有 CSS Module。产品介绍、常见应用、定制品型号行、联系按钮及 FAQ Accordion 均复用现有结构与样式，没有新增隔膜泵专用外观。

### 1.2 正式数据、生成器与生成结果

- `data-source/product-center/pumps/FOREACH_隔膜泵系列_产品数据源.xlsx`
- `data/products/detail/diaphragm-pump-routes.ts`（新增单一 URL / redirect 规则源）
- `data/products/detail/diaphragm-pump-reference-models.ts`（新增六语 Reference / H1 / SEO 单一数据源）
- `data/products/detail/diaphragm-pump-copy.generated.json`（恢复六语线上长文案和每页 5 条 FAQ；DPGL800 保留事实修正）
- `data/products/detail/diaphragm-pump-copy.ts`
- `data/products/detail/product-detail.intl.ts`
- `data/products/detail/product-detail.target.intl.ts`
- `data/products/selection/product-route-map.ts`
- `data/products/selection/diaphragm-pump-selection.generated.ts`
- `scripts/products/generate-diaphragm-pump-data.js`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpl30-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpl60-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpl30h-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpgl800-gas-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/index.json`
- `data/products/generated/pumps/diaphragm-pumps/routes/routes.json`
- `data/products/generated/pumps/diaphragm-pumps/selection/cards.json`
- `data/products/generated/pumps/diaphragm-pumps/summary/summary.json`

Excel 中只更新隔膜泵路由和 DPL30H 已确认的真实接口描述；完整 Ordering Code（包括 DPL30H 的 DS / BS 与 12 V / 24 V、EP/PS、FF/PS 配置）继续保留为内部正式数据，没有改成 DB / BB。DPGL800 的 G1/8 内螺纹事实未改。

### 1.3 搜索、重定向与专项审计

- `components/search/SiteSearchClient.tsx`
- `scripts/search/generate-global-search-overlay-index.ts`
- `data/search/site-search-index.generated.ts`
- `public/search-data/global-search-index.v2.json`
- `public/search-data/global-search-index.zh-CN.v3.json`
- `public/search-data/global-search-index.en.v3.json`
- `public/search-data/global-search-index.es.v3.json`
- `public/search-data/global-search-index.fr.v3.json`
- `public/search-data/global-search-index.ko.v3.json`
- `public/search-data/global-search-index.ru.v3.json`
- `scripts/seo/generate-diaphragm-pump-redirects.ts`（新增）
- `scripts/seo/audit-miniature-diaphragm-pumps.ts`（新增）
- `public/_redirects`

### 1.4 隔膜泵内链、相关资源与 llms.txt

- `components/common/related-resources/RelatedResources.tsx`
- `components/home/HomeApplicationFlowSection.tsx`
- `components/resources/technical-articles/TechnicalArticleDetail.tsx`
- `components/resources/technical-articles/articles/BrushlessDiaphragmPumpWiringArticle.tsx`
- `components/resources/technical-articles/articles/Dpl30LiquidDiaphragmPumpArticle.tsx`
- `data/navigation.ts`
- `data/resources/datasheets.en.ts`
- `data/resources/datasheets.zh.ts`
- `data/resources/technical-articles/application-troubleshooting-articles.en.ts`
- `data/resources/technical-articles/application-troubleshooting-articles.es.ts`
- `data/resources/technical-articles/application-troubleshooting-articles.fr.ts`
- `data/resources/technical-articles/application-troubleshooting-articles.ko.ts`
- `data/resources/technical-articles/application-troubleshooting-articles.ru.ts`
- `data/resources/technical-articles/application-troubleshooting-articles.zh.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-curve.zh.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-01-02.en.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-01-02.es.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-01-02.fr.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-01-02.ko.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-01-02.ru.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-01-02.zh.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-03-04.en.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-03-04.es.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-03-04.fr.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-03-04.ko.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-03-04.ru.ts`
- `data/resources/technical-articles/diaphragm-pump-flow-pressure-series-03-04.zh.ts`
- `data/resources/technical-articles/diaphragm-pump-new-articles.shared.ts`
- `data/resources/technical-articles/life-science-instrument-dpl60-selection.zh.ts`
- `data/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life.zh.ts`
- `public/llms.txt`

以上文章文件只迁移隔膜泵 URL 字段，没有改写文章业务正文。

## 2. 六语言最终分类 URL

| 语言 | 最终分类 URL |
| --- | --- |
| zh-CN | `/products/pumps/miniature-diaphragm-pumps/` |
| en | `/en/products/pumps/miniature-diaphragm-pumps/` |
| es | `/es/products/pumps/miniature-diaphragm-pumps/` |
| fr | `/fr/products/pumps/miniature-diaphragm-pumps/` |
| ko | `/ko/products/pumps/miniature-diaphragm-pumps/` |
| ru | `/ru/products/pumps/miniature-diaphragm-pumps/` |

六语言分类 H1 分别为：`微型隔膜泵`、`Miniature Diaphragm Pumps`、`Bombas de diafragma en miniatura`、`Pompes à membrane miniatures`、`소형 다이어프램 펌프`、`Миниатюрные мембранные насосы`。

## 3. 六语言 7 个 Reference URL

### zh-CN

- `/products/pumps/miniature-diaphragm-pumps/dpl30-db/`
- `/products/pumps/miniature-diaphragm-pumps/dpl30-bb/`
- `/products/pumps/miniature-diaphragm-pumps/dpl60-db/`
- `/products/pumps/miniature-diaphragm-pumps/dpl60-bb/`
- `/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/`
- `/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/`
- `/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/`

### en

- `/en/products/pumps/miniature-diaphragm-pumps/dpl30-db/`
- `/en/products/pumps/miniature-diaphragm-pumps/dpl30-bb/`
- `/en/products/pumps/miniature-diaphragm-pumps/dpl60-db/`
- `/en/products/pumps/miniature-diaphragm-pumps/dpl60-bb/`
- `/en/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/`
- `/en/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/`
- `/en/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/`

### es

- `/es/products/pumps/miniature-diaphragm-pumps/dpl30-db/`
- `/es/products/pumps/miniature-diaphragm-pumps/dpl30-bb/`
- `/es/products/pumps/miniature-diaphragm-pumps/dpl60-db/`
- `/es/products/pumps/miniature-diaphragm-pumps/dpl60-bb/`
- `/es/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/`
- `/es/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/`
- `/es/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/`

### fr

- `/fr/products/pumps/miniature-diaphragm-pumps/dpl30-db/`
- `/fr/products/pumps/miniature-diaphragm-pumps/dpl30-bb/`
- `/fr/products/pumps/miniature-diaphragm-pumps/dpl60-db/`
- `/fr/products/pumps/miniature-diaphragm-pumps/dpl60-bb/`
- `/fr/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/`
- `/fr/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/`
- `/fr/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/`

### ko

- `/ko/products/pumps/miniature-diaphragm-pumps/dpl30-db/`
- `/ko/products/pumps/miniature-diaphragm-pumps/dpl30-bb/`
- `/ko/products/pumps/miniature-diaphragm-pumps/dpl60-db/`
- `/ko/products/pumps/miniature-diaphragm-pumps/dpl60-bb/`
- `/ko/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/`
- `/ko/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/`
- `/ko/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/`

### ru

- `/ru/products/pumps/miniature-diaphragm-pumps/dpl30-db/`
- `/ru/products/pumps/miniature-diaphragm-pumps/dpl30-bb/`
- `/ru/products/pumps/miniature-diaphragm-pumps/dpl60-db/`
- `/ru/products/pumps/miniature-diaphragm-pumps/dpl60-bb/`
- `/ru/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/`
- `/ru/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/`
- `/ru/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/`

## 4. 六语言最终 H1

所有 H1 均不含 Reference Model；Reference Model 由共享型号行单独显示。

### zh-CN

| Reference | H1 |
| --- | --- |
| DPL30-DB | 恒永达科技 300 mL/min 直流有刷电机微型隔膜泵，12 V / 24 V 可选 |
| DPL30-BB | 恒永达科技 300 mL/min 直流无刷电机微型隔膜泵，12 V / 24 V 可选 |
| DPL60-DB | 恒永达科技 600 mL/min 直流有刷电机微型隔膜泵，12 V / 24 V 可选 |
| DPL60-BB | 恒永达科技 600 mL/min 直流无刷电机微型隔膜泵，12 V / 24 V 可选 |
| DPL30H-DS | 恒永达科技 600 kPa 直流有刷电机高压微型隔膜泵，12 V / 24 V 可选 |
| DPL30H-BS | 恒永达科技 600 kPa 直流无刷电机高压微型隔膜泵，12 V / 24 V 可选 |
| DPGL800-BS | 恒永达科技 24 V 直流无刷电机气液混合微型隔膜泵 |

### en

| Reference | H1 |
| --- | --- |
| DPL30-DB | FOREACH 300 mL/min Brushed DC Miniature Liquid Diaphragm Pump, 12 V / 24 V |
| DPL30-BB | FOREACH 300 mL/min Brushless DC Miniature Liquid Diaphragm Pump, 12 V / 24 V |
| DPL60-DB | FOREACH 600 mL/min Brushed DC Miniature Liquid Diaphragm Pump, 12 V / 24 V |
| DPL60-BB | FOREACH 600 mL/min Brushless DC Miniature Liquid Diaphragm Pump, 12 V / 24 V |
| DPL30H-DS | FOREACH 600 kPa Brushed DC High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V |
| DPL30H-BS | FOREACH 600 kPa Brushless DC High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V |
| DPGL800-BS | FOREACH 24 V Brushless DC Gas-Liquid Diaphragm Pump for Vacuum Aspiration |

### es

| Reference | H1 |
| --- | --- |
| DPL30-DB | FOREACH Bomba miniatura de diafragma para líquidos de 300 mL/min con motor CC con escobillas, 12 V / 24 V |
| DPL30-BB | FOREACH Bomba miniatura de diafragma para líquidos de 300 mL/min con motor CC sin escobillas, 12 V / 24 V |
| DPL60-DB | FOREACH Bomba miniatura de diafragma para líquidos de 600 mL/min con motor CC con escobillas, 12 V / 24 V |
| DPL60-BB | FOREACH Bomba miniatura de diafragma para líquidos de 600 mL/min con motor CC sin escobillas, 12 V / 24 V |
| DPL30H-DS | FOREACH Bomba miniatura de diafragma para líquidos de alta presión, 600 kPa, con motor CC con escobillas, 12 V / 24 V |
| DPL30H-BS | FOREACH Bomba miniatura de diafragma para líquidos de alta presión, 600 kPa, con motor CC sin escobillas, 12 V / 24 V |
| DPGL800-BS | FOREACH Bomba de diafragma gas-líquido de 24 V con motor CC sin escobillas para aspiración en vacío |

### fr

| Reference | H1 |
| --- | --- |
| DPL30-DB | FOREACH Pompe à membrane miniature pour liquides de 300 mL/min avec moteur CC à balais, 12 V / 24 V |
| DPL30-BB | FOREACH Pompe à membrane miniature pour liquides de 300 mL/min avec moteur CC sans balais, 12 V / 24 V |
| DPL60-DB | FOREACH Pompe à membrane miniature pour liquides de 600 mL/min avec moteur CC à balais, 12 V / 24 V |
| DPL60-BB | FOREACH Pompe à membrane miniature pour liquides de 600 mL/min avec moteur CC sans balais, 12 V / 24 V |
| DPL30H-DS | FOREACH Pompe à membrane miniature haute pression pour liquides, 600 kPa, avec moteur CC à balais, 12 V / 24 V |
| DPL30H-BS | FOREACH Pompe à membrane miniature haute pression pour liquides, 600 kPa, avec moteur CC sans balais, 12 V / 24 V |
| DPGL800-BS | FOREACH Pompe à membrane gaz-liquide 24 V avec moteur CC sans balais pour aspiration à vide |

### ko

| Reference | H1 |
| --- | --- |
| DPL30-DB | FOREACH 300 mL/min 브러시 DC 모터 소형 액체 다이어프램 펌프, 12 V / 24 V |
| DPL30-BB | FOREACH 300 mL/min 브러시리스 DC 모터 소형 액체 다이어프램 펌프, 12 V / 24 V |
| DPL60-DB | FOREACH 600 mL/min 브러시 DC 모터 소형 액체 다이어프램 펌프, 12 V / 24 V |
| DPL60-BB | FOREACH 600 mL/min 브러시리스 DC 모터 소형 액체 다이어프램 펌프, 12 V / 24 V |
| DPL30H-DS | FOREACH 600 kPa 브러시 DC 모터 고압 소형 액체 다이어프램 펌프, 12 V / 24 V |
| DPL30H-BS | FOREACH 600 kPa 브러시리스 DC 모터 고압 소형 액체 다이어프램 펌프, 12 V / 24 V |
| DPGL800-BS | FOREACH 24 V 브러시리스 DC 기액 혼합 다이어프램 펌프, 진공 흡인용 |

### ru

| Reference | H1 |
| --- | --- |
| DPL30-DB | FOREACH Миниатюрный жидкостный мембранный насос 300 mL/min с щёточным двигателем постоянного тока, 12 V / 24 V |
| DPL30-BB | FOREACH Миниатюрный жидкостный мембранный насос 300 mL/min с бесщёточным двигателем постоянного тока, 12 V / 24 V |
| DPL60-DB | FOREACH Миниатюрный жидкостный мембранный насос 600 mL/min с щёточным двигателем постоянного тока, 12 V / 24 V |
| DPL60-BB | FOREACH Миниатюрный жидкостный мембранный насос 600 mL/min с бесщёточным двигателем постоянного тока, 12 V / 24 V |
| DPL30H-DS | FOREACH Миниатюрный жидкостный мембранный насос высокого давления 600 kPa с щёточным двигателем постоянного тока, 12 V / 24 V |
| DPL30H-BS | FOREACH Миниатюрный жидкостный мембранный насос высокого давления 600 kPa с бесщёточным двигателем постоянного тока, 12 V / 24 V |
| DPGL800-BS | FOREACH Газожидкостный мембранный насос 24 V с бесщёточным двигателем постоянного тока для вакуумной аспирации |

## 5. 六语言 Breadcrumb 示例

以 DPL60-BB 为例；可见 breadcrumb 与 BreadcrumbList schema 使用同一组数据，最后一级只保留短 Reference。

| 语言 | Breadcrumb |
| --- | --- |
| zh-CN | `首页 / 产品中心 / 微型隔膜泵 / DPL60-BB` |
| en | `Home / Product Center / Miniature Diaphragm Pumps / DPL60-BB` |
| es | `Inicio / Centro de productos / Bombas de diafragma en miniatura / DPL60-BB` |
| fr | `Accueil / Centre de produits / Pompes à membrane miniatures / DPL60-BB` |
| ko | `홈 / 제품 센터 / 소형 다이어프램 펌프 / DPL60-BB` |
| ru | `Главная / Каталог продукции / Миниатюрные мембранные насосы / DPL60-BB` |

## 6. SEO Title / Meta Description 示例

| 页面 | SEO Title | Meta Description 核心事实 |
| --- | --- | --- |
| zh-CN DPL60-BB | `600 mL/min 直流无刷电机微型液体隔膜泵 | DPL60-BB | 恒永达` | 12 V / 24 V、600 mL/min 空载流量、100 kPa 额定压力 |
| en DPL30H-BS | `600 kPa Brushless DC High-Pressure Diaphragm Pump | DPL30H-BS | FOREACH` | 600 kPa rated pressure、300 mL/min no-load flow、hose barb secured by clamp/locking structure |
| es DPL30H-DS | `Bomba de diafragma de alta presión 600 kPa, motor CC con escobillas | DPL30H-DS | FOREACH` | presión nominal 600 kPa、caudal sin carga 300 mL/min、espiga + abrazadera |
| fr DPGL800-BS | `Pompe à membrane gaz-liquide pour aspiration à vide | DPGL800-BS | FOREACH` | gaz / mélange gaz-liquide、débit gaz sans charge d’une tête 6 L/min、vide maximal < -90 kPa |
| ko DPGL800-BS | `진공 흡인용 기액 혼합 다이어프램 펌프 | DPGL800-BS | FOREACH` | 24 V、기체/기액 혼합물、단일 헤드 무부하 가스 유량 6 L/min、최대 부압 < -90 kPa |
| ru DPL30H-BS | `Мембранный насос высокого давления 600 kPa с бесщёточным двигателем постоянного тока | DPL30H-BS | FOREACH` | 600 kPa、300 mL/min без нагрузки、штуцер с хомутом/фиксацией |

DPL30H 六语言公开 copy 均为实际倒刺/软管接头 + 卡箍/锁紧结构；全量公开 HTML 审计未发现 `threaded`、`compression`、`螺纹端口`、`卡套接头` 等错误映射。Reference 继续是 DS / BS。

## 7. 旧 URL → 最终 URL 301 数量与完整映射位置

- 隔膜泵精确永久 301：**138 条**。
- 构成：六语言 × 每语言 23 条。
  - 旧父级、3 个旧子分类、4 个旧 Series：8 条。
  - 8 个历史长配置 URL（DPGL800 含 EP/PS 与 FF/PS 两条）：8 条。
  - 7 个旧父路径短 Reference URL 的防御性映射：7 条。
- 完整生效映射：`public/_redirects`。
- 可重复生成与检查：`scripts/seo/generate-diaphragm-pump-redirects.ts`。
- `public/_redirects` 中原有 18 条非隔膜泵规则原样保留。

## 8. 无 Redirect Chain

`npx tsx scripts/seo/generate-diaphragm-pump-redirects.ts --check` 与专项静态审计均通过：

- 138 个 source 唯一，无重复。
- 所有 destination 都是最终 `miniature-diaphragm-pumps` URL。
- destination 不再命中任何 source。
- 历史长 URL 不经过 `/diaphragm-pumps/[short-reference]/` 中间层。

## 9. Series URL 迁移结果

以下 4 个 Series slug 在六语言中均迁移到新父路径，共 **24 个最终 Series 页面**：

- `dpl30-liquid-diaphragm-pump`
- `dpl60-liquid-diaphragm-pump`
- `dpl30h-liquid-diaphragm-pump`
- `dpgl800-gas-liquid-diaphragm-pump`

旧 Series URL 分别 301 到新父路径下同名 Series，不会跳到某一个有刷/无刷 Reference 页面。专项审计检查 `seriesHtml = 24`，旧父路径静态页面为 0。

## 10. “型号选择 / 型号列表 / 价格”与线上展示恢复结果

- 六语言 × 7 Reference 页面恢复线上既有的本地化“定制品 + Contact”型号行，不在该可见位置显示短 Reference Model。
- URL、面包屑、搜索和 ProductModel JSON-LD 继续使用短 Reference Model 身份；可见型号行直接复用 `ProductDetailClient` 原有 `modelLine`、`modelCodeWrap`、`button` 等结构与样式。
- 六语言 42 个 Reference 页面和 24 个 Series 页面均恢复上线长介绍、常见应用及每页 5 条 FAQ；FAQ UI 与 FAQPage JSON-LD 使用同一份中央 copy。
- 隔膜泵详情页不渲染 configuration selector、variant list、ordering model list、modal、drawer、dropdown 或配置价格表。
- 完整 Ordering Code 和配置数组留在 Excel / server-side generator 数据中，公共 DTO 使用白名单字段，不把原始配置对象 spread 到 RSC/静态 HTML。
- DPGL800 公开身份合并为一个 `DPGL800-BS`；EP/PS、FF/PS 等材料配置只作为内部正式配置来源保留。

## 11. HTML 中 price / Offer Schema 检查结果

专项审计全量检查 42 个 Reference HTML 与 24 个 Series HTML，结果：

- 无 `price`、`priceCurrency`、`lowPrice`、`highPrice`。
- 无 `Offer`、`Offers`、`AggregateOffer`、`OfferCatalog`。
- 无隐藏价格 DOM。
- ProductModel JSON-LD 保留 brand、model、name、description、url、image 等非报价字段。

浏览器抽查中文 DPL60-BB 与英文 DPL30H-BS，同样未发现价格或 Offer schema。

## 12. Canonical / Hreflang / Sitemap / OG / JSON-LD

专项审计覆盖 **90 个最终隔膜泵 URL**：

- 24 个分类 URL（六语言 × 父分类及 3 个子分类）。
- 24 个 Series URL（六语言 × 4 Series）。
- 42 个 Reference URL（六语言 × 7 Reference）。

结果：

- canonical 全部指向最终 `miniature-diaphragm-pumps` 路径。
- `og:url` 与 canonical 一致。
- 每页 `zh-CN / en-US / es / fr / ko / ru / x-default` hreflang 完整且均指向最终路径。
- WebPage / ProductModel / BreadcrumbList URL 均使用最终路径。
- 可见 breadcrumb 与 BreadcrumbList 文字及 URL 一致。
- Sitemap 包含 90 个最终隔膜泵 URL，不含旧 `diaphragm-pumps` 页面。
- `public/llms.txt` 每种语言只列 1 个最终父分类与 7 个 Reference 页面。

全站构建后的 SEO 审计结果：5410 个 indexable 页面，canonical、hreflang、JSON-LD、内部链接、sitemap 与 URL collision 问题均为 0。

## 13. Liquid / Gas-Liquid 卡片数量

| 筛选 | 卡片数 | Reference 身份 |
| --- | ---: | --- |
| Liquid | 6 | DPL30-DB、DPL30-BB、DPL60-DB、DPL60-BB、DPL30H-DS、DPL30H-BS |
| Gas-Liquid | 1 | 仅保留 DPGL800 FF/PS 卡，链接 Reference `DPGL800-BS`；DPGL800 EP/PS 公开卡已从 Excel 选型源和生成数据中完整删除 |
| Gas | 0 | 无 |

六语言全局搜索每种语言严格为 7 个 Reference 结果，不把完整 Ordering Code 配置作为独立产品结果返回，也不携带已删除的 DPGL800 EP/PS 公开卡关键词、货号或旧卡路径。

删除边界：本次删除的是 `02_选型卡片` 的 EP 发布记录、运行时 selection product object、公开 Reference 映射和搜索索引暴露。`04_型号配置` 中的正式 EP 工程配置及历史 URL 的 301 兼容规则继续保留；它们不会生成选型卡。

## 14. Build / TypeScript / SEO Audit / Search Check

| 检查 | 结果 |
| --- | --- |
| 隔离副本运行 `generate-diaphragm-pump-data.js` | 通过；读取正式 Excel 后生成 7 张选型卡。与当前 generated 目录逐文件比对，仅 `selection/cards.json` 与 `summary/summary.json` 发生预期变化并已同步，避免覆盖工作树中的其他既有修改。生成器仍提示既有源资产库存中部分 curve/datasheet 缺失，未阻断生成，本任务未伪造缺失资产。 |
| `npx tsc --noEmit` | 通过。 |
| `npm run build:cloudflare` | 通过；生成 5419 个静态页面。 |
| 构建 URL normalization | 通过；pages 5410、canonicals 5410、hreflangs 32497、internal links 5833、structured URLs 527、invalid JSON-LD 0。 |
| Sitemap | 通过；5410 URLs，zh 900，en/es/fr/ko/ru 各 902，auto-exclude 11。 |
| `npm run seo:audit` | 通过；canonical 0、hreflang 0、JSON-LD 0、internal link 0、sitemap 0、collision 0。 |
| `npm run search:generate` + `npm run search:check` | 通过；每语言恰好 7 个 Reference Model。 |
| `npx tsx scripts/seo/generate-diaphragm-pump-redirects.ts --check` | 通过；138 条、无重复、无链。 |
| `npx tsx scripts/seo/audit-miniature-diaphragm-pumps.ts` | 通过；locales 6、finalRoutes 90、categoryRoutes 24、seriesHtml 24、referenceHtml 42、redirects 138、sitemapFinalRoutes 90、errors 0。 |
| 本次中央 copy helper 与专项 audit 定向 ESLint | 通过。 |
| `git diff --check` | 通过。 |

补充说明：对包含大型历史组件和既有国际化数据文件的宽范围 ESLint 扫描仍报告 278 个 legacy rule findings（主要为 `no-explicit-any` 和既有 hooks 规则），因此没有把“全范围 lint”虚报为通过；它不影响本次 TypeScript、Cloudflare build、静态 HTML 和 SEO 验收。新增核心文件的定向 ESLint 已通过。

### 视觉检查

- 中文 DPL30-DB desktop：上线长介绍、常见应用与“型号：该产品为定制品 + 联系我们”结构正常，复用现有样式。
- 中文 DPL30 Series desktop：H1、长介绍、常见应用和定制品型号行与上线结构一致。
- FAQ 交互：5 条问题均存在；折叠项点击后 `aria-expanded` 从 `false` 变为 `true`，答案正常显示。
- 西班牙语 DPGL800-BS mobile（390 × 844）：无横向溢出；5 条 FAQ；单泵头空载气体流量 6 L/min、+30 kPa、< -90 kPa 与不用于纯液体输送的事实均可见。

开发服务已恢复在 `http://localhost:3000`，供本地复查。

## 15. 范围与交付声明

- 本任务的业务修改只针对隔膜泵体系。
- 隔膜泵页面复用既有共享详情组件和 CSS Module；未新增按语言或型号重复的样式，也未改变其他产品线的业务身份、URL、H1、参数或页面 copy。
- 工作区内任务开始前的其他产品线 PDF、SVG、文章和历史报告改动均未处理、未回滚、未纳入本任务交付。
- 未 commit。
- 未 push。
- 未 deploy。
- 当前结果仅在本地，等待用户检查。
