# 快插接头实施前检查报告

生成时间：2026-07-11T22:20:19.631Z

## 一、实施结构

- 产品中心入口：快插接头
- 产品系列：Q20、Q40、Q60
- 页面形式：系列页 + 系列内筛选 + 完整型号表
- 不为全部SKU逐个建立独立详情页
- 现有Q20竞品替代模块继续独立保留

## 二、权威Excel

- 文件：`data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx`

### 工作表：04_快插接头

- 表头行：第1行
- 有效数据：192条
- Q20：98条
- Q40：58条
- Q60：35条
- 其他：1条

#### 字段

- 产品类型
- 产品系列
- 恒永达型号
- 商品编码
- 竞品型号
- 未命名列6
- 未命名列7
- 未命名列8
- 未命名列9
- 2D图编码
- 3D图编码

#### 前8条数据

| 产品类型 | 产品系列 | 恒永达型号 | 商品编码 | 竞品型号 | 未命名列6 | 未命名列7 | 未命名列8 | 未命名列9 | 2D图编码 | 3D图编码 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  | 威路 |  |  |  |  |  |  |
| 快插接头 | Q20 | Q2001-SNX-SACN | 839001 |  |  |  |  |  | √ | √ |
| 快插接头 | Q20 | Q2002-SNX-SACN | 839002 |  |  |  |  |  | √ | √ |
| 快插接头 | Q20 | Q2003-SNX-SACN | 839003 |  |  |  |  |  | √ | √ |
| 快插接头 | Q20 | Q2004-SNX-SACN | 839004 |  |  |  |  |  | √ | √ |
| 快插接头 | Q20 | Q2002-SNX-LACN | 839005 |  |  |  |  |  | √ | √ |
| 快插接头 | Q20 | Q2004-SNX-LACN | 839006 |  |  |  |  |  | √ | √ |
| 快插接头 | Q20 | Q2018N-SNX-SACN | 839007 |  |  |  |  |  | √ | √ |

## 三、现有快插相关代码

### `app/resources/installation-guide/installation-guide.css`

- L115：`app/resources/selection-support/fitting-replacement/fitting-replacement.css`

### `app/resources/installation-guide/page.tsx`

- L20：`import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";`

### `app/resources/material-compatibility/page.tsx`

- L28：`import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";`

### `app/resources/selection-support/fitting-replacement/fitting-replacement.css`

- L2：`fitting-replacement.css`
- L6：`app/resources/selection-support/fitting-replacement/fitting-replacement.css`
- L10：`/resources/selection-support/fitting-replacement`
- L12：`/en/resources/selection-support/fitting-replacement 绛?`
- L24：`.fitting-replacement-page {`
- L67：`url("/images/resources/selection-support/banner/resources-selection-support-fitting-replacement-banner-1920x520-v001.webp")`
- L836：`app/resources/selection-support/fitting-replacement/fitting-replacement.css`
- L846：`.fitting-replacement-page .frp-container {`
- L853：`.fitting-replacement-page .frp-search-row,`
- L854：`.fitting-replacement-page .frp-history-row {`
- L859：`.fitting-replacement-page .frp-tab-bar {`
- L864：`.fitting-replacement-page .frp-card-grid {`
- L873：`app/resources/selection-support/fitting-replacement/fitting-replacement.css`
- L883：`.fitting-replacement-page .frp-card-grid {`
- L891：`.fitting-replacement-page .frp-card-grid {`
- L898：`.fitting-replacement-page .frp-card-grid {`
- L905：`.fitting-replacement-page .frp-card-grid {`

### `app/resources/selection-support/fitting-replacement/page.tsx`

- L6：`app/resources/selection-support/fitting-replacement/page.tsx`
- L9：`/resources/selection-support/fitting-replacement`
- L16：`5. 当前默认加载 Q20 快插接头`
- L22：`import FittingReplacementHome from "@/components/resources/fitting-replacement/FittingReplacementHome";`
- L24：`import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L28：`import "./fitting-replacement.css";`
- L31：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`

### `app/resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css`

- L2：`fitting-replacement-detail.css`
- L3：`恒永达官网｜Q20 接头替代查询详情页样式`
- L6：`app/resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css`
- L9：`1. 只服务 Q20 接头替代查询详情页`
- L20：`.fitting-replacement-detail-page {`

### `app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx`

- L3：`恒永达官网｜接头替代查询 Q20 详情页入口`
- L6：`app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx`
- L9：`/resources/selection-support/fitting-replacement/q20/[productCode]`
- L12：`1. 中文 Q20 接头替代查询详情页入口`
- L21：`import FittingReplacementDetail from "@/components/resources/fitting-replacement/FittingReplacementDetail";`
- L23：`import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L30：`import "./fitting-replacement-detail.css";`
- L33：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`
- L78：`中文 Q20 详情页`

### `app/[locale]/resources/installation-guide/page.tsx`

- L36：`1. fitting-replacement.css 提供 frp-* 搜索栏样式`
- L40：`import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";`

### `app/[locale]/resources/material-compatibility/page.tsx`

- L35：`import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";`

### `app/[locale]/resources/selection-support/fitting-replacement/page.tsx`

- L6：`app/[locale]/resources/selection-support/fitting-replacement/page.tsx`
- L9：`/en/resources/selection-support/fitting-replacement`
- L10：`/es/resources/selection-support/fitting-replacement`
- L11：`/fr/resources/selection-support/fitting-replacement`
- L12：`/ko/resources/selection-support/fitting-replacement`
- L13：`/ru/resources/selection-support/fitting-replacement`
- L17：`2. 当前加载 Q20 快插接头数据`
- L18：`3. 产品数据仍然复用 q20.zh.ts`
- L19：`4. 首页文案根据 locale 从 q20.page.intl.ts 读取`
- L26：`import FittingReplacementHome from "@/components/resources/fitting-replacement/FittingReplacementHome";`
- L28：`import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L32：`import "../../../../resources/selection-support/fitting-replacement/fitting-replacement.css";`
- L46：`/* 当前页面暂时使用 Q20 系列配置 */`
- L47：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`

### `app/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx`

- L3：`恒永达官网｜多语言接头替代查询 Q20 详情页入口`
- L6：`app/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx`
- L9：`/en/resources/selection-support/fitting-replacement/q20/[productCode]`
- L10：`/es/resources/selection-support/fitting-replacement/q20/[productCode]`
- L11：`/fr/resources/selection-support/fitting-replacement/q20/[productCode]`
- L12：`/ko/resources/selection-support/fitting-replacement/q20/[productCode]`
- L13：`/ru/resources/selection-support/fitting-replacement/q20/[productCode]`
- L16：`1. 外语 Q20 接头替代查询详情页入口`
- L18：`3. 产品数据仍然复用 Q20 静态产品数据`
- L24：`import FittingReplacementDetail from "@/components/resources/fitting-replacement/FittingReplacementDetail";`
- L26：`import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L33：`import "../../../../../../resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css";`
- L48：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`
- L119：`多语言 Q20 详情页`

### `components/common/PdfDrawingPreview.tsx`

- L14：`import FittingReplacementDrawingPreview from "@/components/resources/fitting-replacement/FittingReplacementDrawingPreview";`

### `components/layout/SiteHeader.tsx`

- L241：`"/resources/selection-support/fitting-replacement/q20/",`

### `components/resources/fitting-replacement/FittingReplacementDetail.tsx`

- L5：`恒永达官网｜Q20 接头替代查询详情页组件`
- L8：`components/resources/fitting-replacement/FittingReplacementDetail.tsx`
- L11：`1. 展示单个 Q20 接头替代查询详情`
- L21：`11. Q20 路径、清单来源、产品名称、图纸路径统一从系列配置读取`
- L32：`} from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L35：`Q20_FITTING_REPLACEMENT_SERIES_CONFIG,`
- L38：`} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L45：`} from "@/services/resources/fitting-replacement/fittingReplacementModelParser";`
- L50：`/* 当前详情页暂时使用 Q20 系列配置 */`
- L51：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`
- L222：`<div className="fitting-replacement-detail-page">`

### `components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx`

- L8：`components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx`

### `components/resources/fitting-replacement/FittingReplacementFaq.tsx`

- L8：`components/resources/fitting-replacement/FittingReplacementFaq.tsx`
- L11：`1. 用于 Q20 接头替代查询详情页底部 FAQ`
- L18：`1. q20.detail.intl.ts 使用 as const`

### `components/resources/fitting-replacement/FittingReplacementGuide.tsx`

- L8：`components/resources/fitting-replacement/FittingReplacementGuide.tsx`
- L19：`9. Q20 路径、清单来源、产品名称统一从系列配置读取`
- L32：`} from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L35：`Q20_FITTING_REPLACEMENT_SERIES_CONFIG,`
- L37：`} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L39：`import { parseFittingModelWithRules } from "@/services/resources/fitting-replacement/fittingReplacementModelParser";`
- L41：`/* 当前页面暂时使用 Q20 系列配置 */`
- L42：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`
- L47：`/* 选型指引字段，不包含 series，因为当前页面已经固定为 Q20 */`

### `components/resources/fitting-replacement/FittingReplacementHome.tsx`

- L8：`components/resources/fitting-replacement/FittingReplacementHome.tsx`
- L23：`13. Q20 路径、清单来源、产品名称统一从系列配置读取`
- L28：`3. 后续 Q40 / Q60 只需要扩展系列配置与数据`
- L40：`} from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L43：`Q20_FITTING_REPLACEMENT_SERIES_CONFIG,`
- L45：`} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L49：`/* 当前页面暂时使用 Q20 系列配置 */`
- L50：`const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;`
- L61：`"Q2001-PMV-SPPE",`
- L349：`<div className="fitting-replacement-page">`

### `components/resources/fitting-replacement/FittingSelectionCart.tsx`

- L8：`components/resources/fitting-replacement/FittingSelectionCart.tsx`
- L23：`import type { FittingReplacementProduct } from "@/data/resources/fitting-replacement/fitting-replacement.types";`

### `components/resources/ResourceSearchBar.tsx`

- L54：`recentKeywords = ["柱塞泵", "Q20", "电磁阀", "高压阀", "压力传感器"],`

### `components/selection-cart/selection-cart.types.ts`

- L19：`\| "fitting-replacement"`
- L36：`/* 产品分类名称，例如：Q20 快插接头 */`
- L42：`/* 恒永达型号，例如：Q2001-PNV-SACN */`

### `components/selection-cart/SelectionCartProvider.tsx`

- L107：`sourceType: "fitting-replacement",`
- L110：`sourceType: "fitting-replacement",`
- L112：`productName: "Q20 快插接头",`
- L121：`detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,`

### `data/applications/analytical-instruments/analytical-instruments-application.zh.ts`

- L122：`params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],`

### `data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts`

- L122：`params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],`

### `data/applications/ivd/ivd-application.zh.ts`

- L159：`params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],`

### `data/applications/lab-automation/lab-automation-application.zh.ts`

- L130：`params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],`

### `data/applications/life-science/life-science-application.zh.ts`

- L130：`params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],`

### `data/applications/synthetic-biology/synthetic-biology-application.zh.ts`

- L122：`params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],`

### `data/historyMilestones.ts`

- L358：`"新型电磁阀、快插接头、微型隔膜气泵等产品发布",`

### `data/navigation.ts`

- L504：`productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick Connector", "Conector rápido", "Connecteur rapide", "퀵 커넥터", "Быстроразъемный соединитель"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para montaje eficiente", "Connexion et déconnexion rapides pour assemblage efficace", "효율적인 조립을 위한 빠른 연결 및 분리", "Быстрое соединение и разъединение для эффективной сборки")),`
- L1789：`key: "mobile-resource-fitting-replacement",`
- L1798：`href: localizedPath("/resources/selection-support/fitting-replacement"),`

### `data/products/generated/pumps/valveless-pumps/detail/index.json`

- L1349：`"value":  "G1/8（默认带金属快插接头）",`
- L1350：`"content":  "G1/8（默认带金属快插接头）"`
- L1494：`"value":  "G1/8（默认带金属快插接头）",`
- L1495：`"content":  "G1/8（默认带金属快插接头）"`
- L1691：`"value":  "G1/8（默认带金属快插接头）",`
- L1692：`"content":  "G1/8（默认带金属快插接头）"`
- L1886：`"value":  "G1/8（默认带金属快插接头）",`
- L1887：`"content":  "G1/8（默认带金属快插接头）"`
- L2031：`"value":  "G1/8（默认带金属快插接头）",`
- L2032：`"content":  "G1/8（默认带金属快插接头）"`
- L2228：`"value":  "G1/8（默认带金属快插接头）",`
- L2229：`"content":  "G1/8（默认带金属快插接头）"`

### `data/products/generated/tubing/detail/index.json`

- L92：`"answer": "PVC 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L114：`"answer": "PVC 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L136：`"answer": "PVC 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L158：`"answer": "PVC 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L279：`"answer": "TPU 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L301：`"answer": "TPU 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L323：`"answer": "TPU 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`
- L345：`"answer": "TPU 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"`

### `data/products/selection/product-route-map.ts`

- L95：`"恒永达接头产品覆盖硬管接头、软管接头、鲁尔接头、快插接头、内螺纹互转接头、堵头、过滤器和单向阀。",`
- L180：`"quick-connect-fittings": {`
- L183：`productTypeId: "quick-connect-fittings",`
- L184：`label: "快插接头",`
- L185：`title: "快插接头 \| FOREACH",`
- L187：`"快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",`

### `data/resources/fitting-replacement/fitting-replacement-series.config.ts`

- L2：`fitting-replacement-series.config.ts`
- L6：`data/resources/fitting-replacement/fitting-replacement-series.config.ts`
- L10：`2. 避免在 Home / Detail / Guide 组件里到处写死 q20 路径`
- L11：`3. 为后续 Q40 / Q60 / 其他接头系列做模板`
- L16：`1. Q20 快插接头`
- L19：`q40: {`
- L20：`seriesKey: "q40",`
- L21：`seriesCode: "Q40",`
- L22：`productName: "Q40 快插接头",`
- L27：`export type FittingReplacementSeriesKey = "q20";`
- L33：`1. seriesKey：用于 URL 路径，例如 q20`
- L34：`2. seriesCode：用于显示系列，例如 Q20`
- L46：`sourceType: "fitting-replacement";`
- L54：`Q20 系列配置`
- L61：`export const Q20_FITTING_REPLACEMENT_SERIES_CONFIG: FittingReplacementSeriesConfig =`
- L63：`seriesKey: "q20",`
- L64：`seriesCode: "Q20",`
- L65：`productName: "Q20 快插接头",`
- L66：`sourceType: "fitting-replacement",`
- L68：`homeHref: "/resources/selection-support/fitting-replacement",`

### `data/resources/fitting-replacement/fitting-replacement.types.ts`

- L2：`fitting-replacement.types.ts`
- L6：`data/resources/fitting-replacement/fitting-replacement.types.ts`
- L12：`- Q20 快插接头替代查询`
- L13：`- 中文页面 /resources/selection-support/fitting-replacement`
- L14：`- 多语言页面 /en/resources/selection-support/fitting-replacement 等`
- L15：`4. 后续 Q40 / Q60 / 硬管接头 / 倒刺接头 / 鲁尔接头扩展时继续复用`
- L40：`Q2001-PMV-SPPE`
- L42：`Q20 \| 01 \| P \| M \| V \| S \| PP \| E`
- L52：`/* 适用系列，例如 Q20 */`
- L75：`/* 代码，例如 Q20、01、P、M、V、S、PP、E */`
- L96：`/* 恒永达型号，例如 Q2001-PMV-SPPE */`
- L140：`3. 由 q20.page.intl.ts 提供多语言内容`
- L141：`4. 后续 Q40 / Q60 / 硬管 / 倒刺接头也可以复用这个结构`

### `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl.ts`

- L2：`q20.detail.intl.ts`
- L3：`恒永达官网｜接头替代查询｜快插接头 Q20 详情页多语言文案`
- L6：`data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl.ts`
- L9：`1. 存放 Q20 接头替代查询详情页多语言文案`
- L12：`4. 产品数据来自 q20.zh.ts`
- L13：`5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增`
- L33：`Q20 详情页多语言文案`
- L35：`export const fittingReplacementQuickConnectQ20DetailIntl = {`
- L48：`href: "/resources/selection-support/fitting-replacement",`
- L107：`href: "/en/resources/selection-support/fitting-replacement",`
- L168：`href: "/es/resources/selection-support/fitting-replacement",`
- L230：`href: "/fr/resources/selection-support/fitting-replacement",`
- L293：`href: "/ko/resources/selection-support/fitting-replacement",`
- L353：`href: "/ru/resources/selection-support/fitting-replacement",`
- L405：`获取 Q20 详情页指定语言文案`
- L407：`export function getFittingReplacementQuickConnectQ20DetailIntl(`
- L410：`if (locale in fittingReplacementQuickConnectQ20DetailIntl) {`
- L411：`return fittingReplacementQuickConnectQ20DetailIntl[`
- L416：`return fittingReplacementQuickConnectQ20DetailIntl.en;`

### `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.zh.ts`

- L2：`fitting-replacement.detail.zh.ts`
- L6：`data/resources/fitting-replacement/fitting-replacement.detail.zh.ts`
- L12：`/resources/selection-support/fitting-replacement/q20/[productCode]`
- L16：`2. 不会被 convert-q20-fitting-replacement.ts 覆盖`
- L19：`data/resources/fitting-replacement/fitting-replacement.zh.ts`
- L21：`fitting-replacement.detail.en.ts`
- L22：`fitting-replacement.detail.es.ts`
- L23：`fitting-replacement.detail.fr.ts`
- L24：`fitting-replacement.detail.ko.ts`
- L25：`fitting-replacement.detail.ru.ts`
- L28：`export const fittingReplacementQuickConnectQ20DetailZh = {`
- L46：`href: "/resources/selection-support/fitting-replacement",`
- L83：`productNameFallback: "Q20 快插接头",`

### `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts`

- L2：`q20.page.intl.ts`
- L3：`恒永达官网｜接头替代查询｜快插接头 Q20 首页多语言文案`
- L6：`data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts`
- L9：`1. 存放 Q20 接头替代查询首页多语言文案`
- L12：`4. 产品数据来自 q20.zh.ts`
- L13：`5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增`
- L27：`Q20 首页多语言文案`
- L29：`export const fittingReplacementQuickConnectQ20PageIntl = {`
- L34：`"输入竞品编码、商品编码或恒永达型号，快速查找 Q20 快插接头对应产品，并查看型号解析信息。",`
- L48：`href: "/resources/selection-support/fitting-replacement",`
- L86：`productName: "Q20 快插接头",`
- L112：`"Enter a competitor model, product code, or FOREACH model to quickly find matching Q20 quick-connect fittings and model details.",`
- L126：`href: "/en/resources/selection-support/fitting-replacement",`
- L167：`productName: "Q20 Quick-connect Fitting",`
- L193：`"Introduzca un modelo de la competencia, código de producto o modelo FOREACH para encontrar rápidamente conectores rápidos Q20 equivalentes y sus detalles.",`
- L207：`href: "/es/resources/selection-support/fitting-replacement",`
- L248：`productName: "Conector Q20",`
- L274：`"Saisissez une référence concurrente, un code produit ou un modèle FOREACH pour trouver rapidement les raccords rapides Q20 correspondants et leurs détails.",`
- L288：`href: "/fr/resources/selection-support/fitting-replacement",`
- L329：`productName: "Raccord Q20",`

### `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.zh.ts`

- L2：`fitting-replacement.page.zh.ts`
- L6：`data/resources/fitting-replacement/fitting-replacement.page.zh.ts`
- L11：`/resources/selection-support/fitting-replacement`
- L17：`1. fitting-replacement.zh.ts`
- L23：`2. fitting-replacement.page.zh.ts`
- L28：`fitting-replacement.page.en.ts`
- L29：`fitting-replacement.page.es.ts`
- L30：`fitting-replacement.page.fr.ts`
- L31：`fitting-replacement.page.ko.ts`
- L32：`fitting-replacement.page.ru.ts`
- L51：`fitting-replacement.zh.ts`
- L54：`fitting-replacement.page.zh.ts`
- L60：`components/resources/fitting-replacement/FittingReplacementHome.tsx`
- L64：`fitting-replacement.page.zh.ts`
- L68：`data/resources/fitting-replacement/fitting-replacement.page.zh.ts`
- L72：`2. 不会被 convert-q20-fitting-replacement.ts 覆盖`
- L78：`export const fittingReplacementQuickConnectQ20PageZh = {`
- L103：`href: "/resources/selection-support/fitting-replacement",`

### `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts`

- L2：`q20.zh.ts`
- L3：`恒永达官网｜接头替代查询｜快插接头 Q20 中文数据`
- L6：`data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts`
- L9：`1. 存放快插接头 Q20 的产品数据`
- L10：`2. 存放 Q20 型号解析规则`
- L14：`1. 此文件由 scripts/resources/convert-q20-fitting-replacement.ts 自动生成`
- L17：`data-source/resources/fitting-replacement/Q20系列_测试数据.xlsx`
- L19：`npx tsx scripts/resources/convert-q20-fitting-replacement.ts`
- L22：`import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L24：`export const fittingReplacementQuickConnectQ20ZhData: FittingReplacementPageData = {`
- L29：`"输入竞品编码、商品编码或恒永达型号，快速查找 Q20 快插接头对应产品。",`
- L43：`href: "/resources/selection-support/fitting-replacement",`
- L55：`"foreachModel": "Q2001-PMV-SACN",`
- L64：`"imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",`
- L65：`"drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf"`
- L69：`"foreachModel": "Q2001-PMV-SACN",`
- L78：`"imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",`
- L79：`"drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf"`
- L83：`"foreachModel": "Q2001-PMX-SACN",`
- L92：`"imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMX-SACN.webp",`

### `data/resources/installation-guide/installation-guide.zh.ts`

- L30：`recentKeywords: ["柱塞泵", "Q20", "电磁阀", "高压阀", "压力传感器"],`
- L108：`keywords: ["硬管", "接头", "Q20", "Q40", "Q60", "管路", "密封"],`

### `data/resources/technical-articles/technical-articles.intl.ts`

- L315：`id: "fitting-replacement-by-drawings-or-samples",`
- L316：`slug: "fitting-replacement-by-drawings-or-samples",`

### `data/resources/technical-articles/technical-articles.zh.ts`

- L320：`id: "fitting-replacement-by-drawings-or-samples",`
- L321：`slug: "fitting-replacement-by-drawings-or-samples",`

### `data/site-footer.ts`

- L77：`{ key: "fitting-replacement", label: { china: "接头替代查询", global: "Fitting Replacement" }, href: href("/resources/selection-support/fitting-replacement") },`

### `scripts/products/audit-quick-connect-implementation.cjs`

- L10：`"quick-connect-implementation-audit.md"`
- L247：`Q20: 0,`
- L248：`Q40: 0,`
- L249：`Q60: 0,`
- L264：`/\bQ20\b/i.test(`
- L268：`counts.Q20 += 1;`
- L270：`/\bQ40\b/i.test(`
- L274：`counts.Q40 += 1;`
- L276：`/\bQ60\b/i.test(`
- L280：`counts.Q60 += 1;`
- L331：`/快插\|Q20\|Q40\|Q60/i.test(`
- L334：`/快插\|Q20\|Q40\|Q60/i.test(`
- L428：`"quick-connect",`
- L429：`"quick-connect-fittings",`
- L430：`"fitting-replacement",`
- L431：`"Q20",`
- L432：`"Q40",`
- L433：`"Q60",`
- L434：`"快插接头",`
- L536：`"# 快插接头实施前检查报告"`

### `scripts/products/audit-valveless-pump-detail-specs.js`

- L121：`"试剂B 工作液路接口": "G1/8（默认带金属快插接头）",`
- L146：`"试剂B 工作液路接口": "G1/8（默认带金属快插接头）",`

### `scripts/products/create-tubing-detail-json.cjs`

- L8：`["pvc-tubing", "PVC 管", "PVC", "聚氯乙烯（PVC）", "1.6mm~19.1mm", "-42℃~75℃", "55A / 65A 硬度，按目录规格选择", "倒刺接头、快插接头等软管连接件"],`
- L9：`["tpu-tubing", "TPU 管", "TPU", "热塑性聚氨酯（TPU）", "3.7mm~7.0mm", "-30℃~70℃", "85A / 95A 硬度，按目录规格选择", "倒刺接头、快插接头等软管连接件"],`

### `scripts/products/split-drpl-detail-pages.js`

- L71：`spec("试剂B 工作液路接口", "G1/8（默认带金属快插接头）"),`
- L364：`"试剂B 工作液路接口": "G1/8（默认带金属快插接头）",`
- L389：`"试剂B 工作液路接口": "G1/8（默认带金属快插接头）",`

### `scripts/resources/convert-q20-fitting-replacement.ts`

- L2：`convert-q20-fitting-replacement.ts`
- L3：`恒永达官网｜快插接头 Q20 型号替代资料 Excel 转换脚本`
- L6：`scripts/resources/convert-q20-fitting-replacement.ts`
- L12：`4. 只筛选 Q20 数据`
- L14：`data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts`
- L17：`fitting-replacement`
- L19：`└─ quick-connect`
- L20：`└─ q20`
- L24：`2. q20.zh.ts 是 Next.js 页面读取的 Q20 产品数据文件`
- L38：`npx tsx scripts/resources/convert-q20-fitting-replacement.ts`
- L47：`"fitting-replacement",`
- L48：`"Q20系列_测试数据.xlsx"`
- L56：`"fitting-replacement",`
- L58：`"quick-connect",`
- L59：`"q20",`
- L60：`"q20.zh.ts"`
- L67：`/* 当前第一版只生成 Q20 */`
- L68：`const TARGET_SERIES = "Q20";`
- L206：`本脚本只读取 Q20：`
- L207：`系列 === Q20`

### `services/resources/fitting-replacement/fittingReplacementModelParser.ts`

- L6：`services/resources/fitting-replacement/fittingReplacementModelParser.ts`
- L11：`3. 为后续 Q40 / Q60 / 其他系列接头做模板基础`
- L15：`1. Q20 系列`
- L16：`2. 后续 Q40 / Q60 如果编码结构一致，可以继续复用`
- L29：`} from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L35：`Q2001-PMV-SPPE`
- L38：`Q20 \| 01 \| P \| M \| V \| S \| PP \| E`
- L65：`Q2001-PMV-SPPE`
- L67：`firstPart  = Q2001`
- L72：`1. 当前 Q20 编码按这个结构拆`
- L73：`2. Q40 / Q60 如果结构一致，可以直接复用`
- L150：`1. 当前 Q20 统一显示为 Q20 快插接头`
- L151：`2. 后续 Q40 / Q60 可以通过 rules 里的 series meaning 自动返回名称`
- L156：`fallback = "Q20 快插接头"`

### `services/resources/getFittingReplacementDetailData.ts`

- L11：`fittings / quick-connect / q20`
- L12：`3. 产品数据来自 q20.zh.ts`
- L13：`4. 详情页多语言文案来自 q20.detail.intl.ts`
- L18：`import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";`
- L20：`import { getFittingReplacementQuickConnectQ20DetailIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl";`
- L25：`} from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L27：`import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L33：`typeof getFittingReplacementQuickConnectQ20DetailIntl`
- L62：`3. 详情页文案统一从 q20.detail.intl.ts 按 locale 读取`
- L65：`pageData: typeof fittingReplacementQuickConnectQ20ZhData;`
- L72：`q20 = fittings / quick-connect / q20`
- L75：`q40       = fittings / quick-connect / q40`
- L83：`q20: {`
- L84：`pageData: fittingReplacementQuickConnectQ20ZhData,`
- L99：`seriesKey: FittingReplacementSeriesKey = "q20"`
- L129：`1. 基础层级来自 q20.detail.intl.ts`
- L157：`2. seriesKey：接头系列，当前默认 q20`
- L162：`seriesKey: FittingReplacementSeriesKey = "q20",`
- L166：`const detailText = getFittingReplacementQuickConnectQ20DetailIntl(locale);`
- L190：`/resources/selection-support/fitting-replacement/q20/[productCode]`

### `services/resources/getFittingReplacementHomeData.ts`

- L11：`fittings / quick-connect / q20`
- L12：`3. 产品数据来自 q20.zh.ts`
- L13：`4. 首页多语言文案来自 q20.page.intl.ts`
- L15：`6. 后续新增 Q40、硬管接头、倒刺接头时，在数据源映射里继续扩展`
- L19：`fitting-replacement`
- L21：`└─ quick-connect`
- L22：`└─ q20`
- L25：`import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";`
- L27：`import { getFittingReplacementQuickConnectQ20PageIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl";`
- L29：`import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";`
- L31：`import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L33：`import { getFittingReplacementSeriesConfig } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";`
- L41：`3. 页面文案统一从 q20.page.intl.ts 按 locale 读取`
- L44：`productData: typeof fittingReplacementQuickConnectQ20ZhData;`
- L51：`q20 = fittings / quick-connect / q20`
- L54：`q40       = fittings / quick-connect / q40`
- L62：`q20: {`
- L63：`productData: fittingReplacementQuickConnectQ20ZhData,`
- L71：`seriesKey: FittingReplacementSeriesKey = "q20"`
- L80：`1. 基础面包屑来自 q20.page.intl.ts`

## 四、下一步实施内容

- 生成Q20、Q40、Q60系列数据
- 建立快插接头产品中心入口
- 建立Q20、Q40、Q60系列页面
- 增加系列内筛选
- 增加完整型号表
- 接入加入清单功能
- 接入产品中心路由
- 增加系列页FAQ和底部CTA

