# FOREACH 隔膜泵中英文官网 Reference Model 本地迁移报告

- 日期：2026-08-27
- 项目：`F:\WebsiteProjects\foreach-website-2026`
- 范围：Diaphragm Pump / 隔膜泵，仅中文与英文
- 执行方式：仅本地修改、构建和静态产物验证
- Git 分支：`20260821+与老网址产品相互连接-v001`
- Git HEAD：`51aa19522f858674367ec26070560b61ff9ab623`（执行前后未变化）
- 发布状态：未 commit、未 push、未 deploy

## 1. 迁移结果摘要

本轮已把中文和英文隔膜泵官网身份收敛为 7 个短 Reference Model：

1. `DPL30-DB`
2. `DPL30-BB`
3. `DPL60-DB`
4. `DPL60-BB`
5. `DPL30H-DS`
6. `DPL30H-BS`
7. `DPGL800-BS`

短 Reference Model 只用于官网产品身份、URL、H1、产品卡和搜索结果；采购与配置识别仍使用完整 Ordering Code。最终中英文详情页共保留 27 个正式配置：六个 DPL Reference Model 各 4 个，DPGL800-BS 共 3 个。

最终静态产物检查结果：

- 中文：新 7 个详情页存在，旧 8 个详情页不再生成，4 个 Series 页保留。
- 英文：新 7 个详情页存在，旧 8 个详情页不再生成，4 个 Series 页保留。
- es / fr / ko / ru：各语言新 7 个路径均未生成；各语言原有 8 个详情页和 4 个 Series 页均保留。
- 中文总分类 8 张卡；Liquid 6 张；Gas-Liquid 2 张；Gas 仍为 0 张。

## 2. 修改文件清单

### Reference Model、详情页与页面文案

- `data/products/detail/diaphragm-pump-reference-models.ts`（新增）：7 个 Reference Model 的单一身份、URL、H1、卡片文案、旧路径和 source Series 映射。
- `data/products/detail/diaphragm-pump-copy.ts`：中英文 Reference 页面介绍、FAQ、DPL30H 接口事实和 DPGL800 参数定义。
- `app/products/pumps/diaphragm-pumps/[slug]/page.tsx`：中文 Reference 路由、正式配置聚合、DPL30H 页面事实覆盖、metadata。
- `app/[locale]/products/[...segments]/page.tsx`：仅英文 Reference 路由和英文 metadata；es / fr / ko / ru 路由集合保持原状。
- `data/products/detail/product-detail.intl.ts`：DPL30H 真实接口的正式英文页面翻译。
- `components/products/detail/ProductDetailClient.tsx`：Reference Model 的 ProductModel schema 名称与 Ordering Information；英文订购表技术值保持原值直出，只翻译文本字段。

### 分类页、产品卡与内部入口

- `components/products/selection/ProductSelectionClient.tsx`：中英文隔膜泵分类 H1 与 Reference 卡片覆盖。
- `data/products/selection/card-copy/product-card-copy.intl.ts`：仅中英文隔膜泵卡片使用 Reference 文案。
- `app/products/products.css`：隔膜泵分类 H1 样式；保留产品卡自然换行。
- `data/products/selection/product-route-map.ts`：中文隔膜泵分类/Series SEO 文案。
- `app/products/[category]/[slug]/page.tsx`：中文隔膜泵总分类 metadata。
- `app/products/[category]/[slug]/[seriesSlug]/page.tsx`：中文 Liquid / Gas-Liquid 分类 metadata。
- `components/common/related-resources/RelatedResources.tsx`：仅中英文隔膜泵相关产品入口切换到新 Reference URL。

### 搜索、SEO、LLM 与 301

- `components/search/SiteSearchClient.tsx`：中英文运行时搜索结果切换到 7 个 Reference 身份，并将 DPGL800 合并为一个结果。
- `scripts/search/generate-global-search-overlay-index.ts`：支持 `--locales=zh-CN,en` 的 scoped 生成，并只对中英文应用 Reference 覆盖。
- `public/search-data/global-search-index.zh-CN.v3.json`
- `public/search-data/global-search-index.en.v3.json`
- `public/search-data/global-search-index.v2.json`
- `public/_redirects`：新增 16 条精确永久 301。
- `public/llms.txt`：只更新中文与英文隔膜泵 Reference URL；该文件在本轮开始前已是工作区未跟踪文件，未覆盖其中其他既有内容。

### 未修改的正式数据层

本轮没有修改正式 Excel、ERP/BOM、generator 输出规则、正式 Ordering Code、正式 selection generated data 或通用 product-detail routes generated data。采用中英文 scoped Reference 覆盖，是为了同时满足：

- 8 个既有卡片配置来源收敛为 7 个官网产品身份；
- 27 个正式 Ordering Code 完整保留；
- 不覆盖 es / fr / ko / ru；
- 不把 DPL30H 的正式 DS / BS 擅自改成 DB / BB。

## 3. 中英文新 URL

| Reference Model | 中文 URL | English URL |
|---|---|---|
| DPL30-DB | `/products/pumps/diaphragm-pumps/dpl30-db/` | `/en/products/pumps/diaphragm-pumps/dpl30-db/` |
| DPL30-BB | `/products/pumps/diaphragm-pumps/dpl30-bb/` | `/en/products/pumps/diaphragm-pumps/dpl30-bb/` |
| DPL60-DB | `/products/pumps/diaphragm-pumps/dpl60-db/` | `/en/products/pumps/diaphragm-pumps/dpl60-db/` |
| DPL60-BB | `/products/pumps/diaphragm-pumps/dpl60-bb/` | `/en/products/pumps/diaphragm-pumps/dpl60-bb/` |
| DPL30H-DS | `/products/pumps/diaphragm-pumps/dpl30h-ds/` | `/en/products/pumps/diaphragm-pumps/dpl30h-ds/` |
| DPL30H-BS | `/products/pumps/diaphragm-pumps/dpl30h-bs/` | `/en/products/pumps/diaphragm-pumps/dpl30h-bs/` |
| DPGL800-BS | `/products/pumps/diaphragm-pumps/dpgl800-bs/` | `/en/products/pumps/diaphragm-pumps/dpgl800-bs/` |

最终 canonical 主机为 `https://www.foreachtek.com`，以上 14 个静态页面均已生成真实产品 HTML。

## 4. 精确 301 映射

以下规则均已写入 `public/_redirects`，并被复制到最终 `out/_redirects`；两者字节一致。所有规则均为精确 `301`，没有新增 es / fr / ko / ru redirect。

| 旧 URL | 新 URL |
|---|---|
| `/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpl30-db/` |
| `/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpl30-bb/` |
| `/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpl60-db/` |
| `/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpl60-bb/` |
| `/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpl30h-ds/` |
| `/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpl30h-bs/` |
| `/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpgl800-bs/` |
| `/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/` | `/products/pumps/diaphragm-pumps/dpgl800-bs/` |
| `/en/products/pumps/diaphragm-pumps/dpl30-24db-ep-ps-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl30-db/` |
| `/en/products/pumps/diaphragm-pumps/dpl30-24bb-ep-ps-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl30-bb/` |
| `/en/products/pumps/diaphragm-pumps/dpl60-24db-ep-ps-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl60-db/` |
| `/en/products/pumps/diaphragm-pumps/dpl60-24bb-ep-ps-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl60-bb/` |
| `/en/products/pumps/diaphragm-pumps/dpl30h-24ds-ep-ps-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl30h-ds/` |
| `/en/products/pumps/diaphragm-pumps/dpl30h-24bs-ep-ps-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl30h-bs/` |
| `/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpgl800-bs/` |
| `/en/products/pumps/diaphragm-pumps/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpgl800-bs/` |

由于本轮禁止 deploy，已验证的是本地 Cloudflare Pages `_redirects` 配置和最终构建副本；没有执行线上 HTTP 301 响应测试。

## 5. 7 个产品最终中英文 H1

| Reference | 中文 H1 | English H1 |
|---|---|---|
| DPL30-DB | `DPL30-DB 300 mL/min 12 V / 24 V 有刷微型液体隔膜泵｜恒永达` | `DPL30-DB 300 mL/min Brushed Miniature Liquid Diaphragm Pump, 12 V / 24 V | FOREACH` |
| DPL30-BB | `DPL30-BB 300 mL/min 12 V / 24 V 无刷微型液体隔膜泵｜恒永达` | `DPL30-BB 300 mL/min Brushless Miniature Liquid Diaphragm Pump, 12 V / 24 V | FOREACH` |
| DPL60-DB | `DPL60-DB 600 mL/min 12 V / 24 V 有刷微型液体隔膜泵｜恒永达` | `DPL60-DB 600 mL/min Brushed Miniature Liquid Diaphragm Pump, 12 V / 24 V | FOREACH` |
| DPL60-BB | `DPL60-BB 600 mL/min 12 V / 24 V 无刷微型液体隔膜泵｜恒永达` | `DPL60-BB 600 mL/min Brushless Miniature Liquid Diaphragm Pump, 12 V / 24 V | FOREACH` |
| DPL30H-DS | `DPL30H-DS 600 kPa 12 V / 24 V 有刷高压微型液体隔膜泵｜恒永达` | `DPL30H-DS 600 kPa Brushed High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V | FOREACH` |
| DPL30H-BS | `DPL30H-BS 600 kPa 12 V / 24 V 无刷高压微型液体隔膜泵｜恒永达` | `DPL30H-BS 600 kPa Brushless High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V | FOREACH` |
| DPGL800-BS | `DPGL800-BS 24 V 无刷气液混合隔膜泵｜恒永达` | `DPGL800-BS 24 V Brushless Gas-Liquid Diaphragm Pump for Vacuum Aspiration | FOREACH` |

最终导出的 14 个 HTML 中，`<title>` 与 `<h1>` 均逐字匹配上述文本。

## 6. 产品卡最终文本

| 卡片 | 中文标题 / 副标题 | English title / subtitle | 详情身份 |
|---|---|---|---|
| DPL30 有刷 | `DPL30-DB` / `300 mL/min 12 V / 24 V 有刷微型液体隔膜泵` | `DPL30-DB` / `300 mL/min Brushed Miniature Liquid Diaphragm Pump, 12 V / 24 V` | DPL30-DB |
| DPL30 无刷 | `DPL30-BB` / `300 mL/min 12 V / 24 V 无刷微型液体隔膜泵` | `DPL30-BB` / `300 mL/min Brushless Miniature Liquid Diaphragm Pump, 12 V / 24 V` | DPL30-BB |
| DPL60 有刷 | `DPL60-DB` / `600 mL/min 12 V / 24 V 有刷微型液体隔膜泵` | `DPL60-DB` / `600 mL/min Brushed Miniature Liquid Diaphragm Pump, 12 V / 24 V` | DPL60-DB |
| DPL60 无刷 | `DPL60-BB` / `600 mL/min 12 V / 24 V 无刷微型液体隔膜泵` | `DPL60-BB` / `600 mL/min Brushless Miniature Liquid Diaphragm Pump, 12 V / 24 V` | DPL60-BB |
| DPL30H 有刷 | `DPL30H-DS` / `600 kPa 12 V / 24 V 有刷高压微型液体隔膜泵` | `DPL30H-DS` / `600 kPa Brushed High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V` | DPL30H-DS |
| DPL30H 无刷 | `DPL30H-BS` / `600 kPa 12 V / 24 V 无刷高压微型液体隔膜泵` | `DPL30H-BS` / `600 kPa Brushless High-Pressure Miniature Liquid Diaphragm Pump, 12 V / 24 V` | DPL30H-BS |
| DPGL800 EP/PS | `DPGL800-BS` / `24 V 无刷气液混合隔膜泵，EP/PS 配置` | `DPGL800-BS` / `24 V Brushless Gas-Liquid Diaphragm Pump for Vacuum Aspiration, EP/PS Configuration` | DPGL800-BS |
| DPGL800 FF/PS | `DPGL800-BS` / `24 V 无刷气液混合隔膜泵，FF/PS 配置` | `DPGL800-BS` / `24 V Brushless Gas-Liquid Diaphragm Pump for Vacuum Aspiration, FF/PS Configuration` | DPGL800-BS |

卡片 DOM 没有重新加入固定 `<br>`，继续使用自然换行。

分类页最终 H1：

| 分类 | 中文 | English | 卡片数 |
|---|---|---|---:|
| 总分类 | `微型隔膜泵` | `Miniature Diaphragm Pumps` | 8 |
| Liquid | `微型液体隔膜泵` | `Miniature Liquid Diaphragm Pumps` | 6 |
| Gas-Liquid | `气液混合隔膜泵` | `Gas-Liquid Diaphragm Pumps` | 2 |
| Gas | 保持当前空集合 | 保持当前空集合 | 0 |

## 7. Series 通用 URL 处理

以下 4 个 Series / 通用 URL 没有 redirect，也没有删除；中文和英文均继续生成：

| Series | 中文 | English |
|---|---|---|
| DPL30 | `/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/` |
| DPL60 | `/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/` |
| DPL30H | `/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/` |
| DPGL800 | `/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/` | `/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/` |

原因：DPL30、DPL60、DPL30H Series 各自覆盖两个不同电机 Reference Model，不能随意 301 到其中一个；DPGL800 Series 是通用系列配置入口，也不与单一材料配置旧页等价。最终 Sitemap 中 8 个中英文 Series URL 均保留。

## 8. DPL30H 接口与 DS / BS

最终处理遵循两个边界：

1. 官网 Reference Model 继续使用 `DPL30H-DS` / `DPL30H-BS`。
2. 页面不再把实际接口写成 threaded、compression fitting、螺纹端口或卡套接头。

中英文最终页面的介绍、规格、FAQ 和 Ordering Information 均统一为：

- 中文：`倒刺接口 + 卡箍 / 锁紧结构`
- English：`Barbed Connection with Clamp/Locking Structure`

最终四个 DPL30H HTML（中文 DS/BS、英文 DS/BS）全文搜索结果：`threaded`、`compression`、`螺纹`、`卡套` 均为 0。

正式 DS / BS Ordering Code 未改变。每个 Reference 页面仍显示 4 个正式配置，合计 8 个：12 V / 24 V × EP/PS / FF/PS。由于任务明确禁止擅改 ERP/BOM 和正式 Ordering Code，本轮没有修改正式 Excel 或 generator，而是在中英文 Reference 页面解析层强制使用已确认的真实接口结构。

## 9. DPGL800 EP / FF 合并方式

产品选择数据中的两个现有材料配置来源继续保留，因此总分类和 Gas-Liquid 分类仍显示两张卡：

- EP/PS 卡：标题 `DPGL800-BS`，副标题标明 EP/PS。
- FF/PS 卡：标题 `DPGL800-BS`，副标题标明 FF/PS。

两张卡共同链接到一个 `dpgl800-bs` 详情页；中英文搜索索引也各只保留一个 DPGL800-BS 产品结果。统一详情页的 Ordering Information 保留 3 个正式配置：

1. `DPGL800-24BS6-EP/PS`
2. `DPGL800-24BS6-FF/PS`
3. `DPGL800-24BSC-EP/PS`

页面参数定义已逐项验证：

- `Single-Head No-Load Gas Flow / 单泵头空载气体流量：6 L/min`
- `Maximum Negative Pressure / 最大负压：< -90 kPa`
- `Working Medium / 工作介质：Gas and gas-liquid mixtures / 气体及气液混合物`

没有把 6 L/min 表述成纯液体实际流量。

## 10. Canonical、hreflang、Sitemap、OG 与 JSON-LD

### 14 个新详情页逐页验证

- canonical：14/14 只有一个，且指向自身新 URL。
- `og:url`：14/14 指向自身新 URL。
- hreflang：每页仅 `zh-CN`、`en`、`x-default`；`x-default` 指向中文 Reference URL。
- JSON-LD：每页均包含 `WebPage`、`ProductModel`、`BreadcrumbList`，URL / `@id` 与页面新 URL 一致。
- DPL30H 与 DPGL800 的 FAQPage 结构化数据同步采用最终事实文案。

### 全站 SEO 审计

`npm run seo:audit` 最终结果：

- 可索引页面：5,414
- canonical 缺失：0
- canonical URL 问题：0
- canonical route mismatch：0
- hreflang URL 问题：0
- JSON-LD URL 问题：0
- invalid JSON-LD：0
- 内部链接问题：0
- Sitemap URL：5,414，唯一 URL 5,414，重复 0
- Sitemap 非 canonical：0
- 产品 slug collision candidate：0

### Sitemap 目标集合

- 新中英文 Reference URL：14/14，各出现 1 次。
- 旧中英文详情 URL：0/16。
- 中英文 Series URL：8/8，各出现 1 次。
- es / fr / ko / ru 原有详情 URL：32/32，各出现 1 次。
- es / fr / ko / ru 新 Reference URL：0/28。

### 内部链接与搜索

- 最终中英文 HTML 中指向 8 个旧 slug 的 `<a href>`：0。
- 中文搜索：7 个 Reference 产品结果，旧 8 个结果为 0，DPGL800-BS 为 1 个结果。
- 英文搜索：7 个 Reference 产品结果，旧 8 个结果为 0，DPGL800-BS 为 1 个结果。
- `npm run search:check` 六语言索引检查全部通过；本轮只生成中文、英文和兼容 v2 文件。

## 11. Build、TypeScript 与静态验证

最终执行并通过：

- `node scripts/cloudflare/build-pages.mjs`
  - TypeScript 检查通过。
  - Next.js 16.2.6 / Turbopack 编译通过。
  - 5,423 个静态页面生成完成。
  - `app/api` 在构建后已恢复。
- `node scripts/seo/normalize-static-urls.mjs`
  - 处理 5,414 个可索引页面。
  - canonical 5,414；hreflang 32,336；invalid JSON-LD 0。
- `node scripts/seo/generate-sitemap.mjs`
  - Sitemap 5,414 URL：中文 900、英文 902、es/fr/ko/ru 各 903。
- `node node_modules/typescript/bin/tsc --noEmit --pretty false --incremental false`
  - 通过。
- `npm run seo:audit`
  - 通过，全部 URL 一致性问题为 0。
- `npm run search:check`
  - 通过。
- `git diff --check`
  - exit code 0；只有仓库既有的 LF/CRLF 提示，没有 whitespace error。

最终静态 HTML 还逐项验证了：

- 14 个 H1 / title 精确匹配。
- 27 个 Ordering Information 配置完整。
- 英文 Ordering Code、Item Code、Voltage、EPDM、PTFE、FFKM、PPS 均保持原值，没有尾随句点、拆词或符号丢失。
- DPL30H 接口事实和 DPGL800 参数边界正确。
- 分类 H1 与 8 / 6 / 2 / 0 卡片数量正确。

## 12. 范围与未执行事项确认

- 未修改柱塞泵、移液泵、注射泵、阀、接头或其他产品线的业务数据与页面身份。
- 所有共享文件中的新逻辑均限定为 Diaphragm Pump 且只对中文 / 英文生效。
- 未修改 es / fr / ko / ru 路由、文案或搜索索引。
- es / fr / ko / ru 搜索文件 SHA-256 与修改前一致：
  - es：`6FF79A5632FEB4FBDF105C9A80CDA647073D10AD95824113E94619726A169EED`
  - fr：`E43A6B8CE3DF1C95288A84CCA44881EE7AB041E7D350D5AD59425C46A8B6675F`
  - ko：`0C482D56931C789F5857DD9BD6F0425BD045485585C8A576C8E185DAE6508157`
  - ru：`88BD02036BB43CD110D5B42BCC5CAFA29BB0B2C6D75573E4B15B55A89265F9E9`
- 正式 generated 文件保持不变：
  - `data/products/selection/diaphragm-pump-selection.generated.ts`：`FD1D29735F126EFE36414D0D3998CE6BF4491FF998C4E69DB9DB941BB3C46898`
  - `data/products/product-detail-routes.generated.ts`：`16D5757711D0D733FE983BB1FD4C31BF37BFCFA4389F8E5F28E016483B760C2E`
  - `data/products/detail/diaphragm-pump-copy.generated.json`：`103CA5BAC730C98DF31C4158189A3055DA926571974142C3B7AD76F8A33639A9`
- 未回滚或清理工作区内上一轮及用户既有修改。
- 未 commit。
- 未 push。
- 未 deploy。
- 未执行线上 URL 或线上 301 验证；本报告结论仅针对当前本地源码与最终静态构建产物。
