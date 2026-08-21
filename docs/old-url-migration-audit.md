# Old URL → New URL Migration Audit & Pilot Implementation

## 2026-08-21 实施更新

本节是当前状态；下方 2026-08-11 内容保留为实施前基线，不能再代表现状。

### 已完成

- 从旧 CMS 后台导出并核验 813 个旧产品 ID，建立 82 个栏目页、813 个产品页的旧 URL 清单。
- 抓取新版站点 888 个中文 URL，其中 746 个产品 URL；通过自动匹配与人工核验形成第一版迁移表。
- 在旧站 IIS 上仅上线 4 条隔膜泵试点 301；修改前的 `web.config` 已备份到 `wwwroot/url-migration-backup-20260821/`。
- 四条旧 URL 均已验证为单跳 `301`，目标页返回 `200`；旧站首页与未配置产品 ID 仍保持原行为。

| 旧 ID | 旧产品 | 中文新页面 |
|---:|---|---|
| 12634 | 300mL/min 液体隔膜泵（DPL30） | `/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/` |
| 12635 | 300mL/min 高压液体隔膜泵（DPL30H） | `/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump/` |
| 12636 | 600mL/min 液体隔膜泵（DPL60） | `/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/` |
| 12637 | 6L/min 气液混合泵（DPGL800） | `/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/` |

### 本仓库 v002 的作用范围

- `functions/legacy-product-redirects.ts` 是四条试点映射的本地事实源，同时提供中英文目标。
- `functions/_middleware.ts` 只对 `www.foreachtek.com`、`GET/HEAD`、精确的 `ProductInfo.aspx?Id=<已确认ID>` 返回 301；未知 ID、缺失 ID、其他 Host 和非读取请求全部放行。
- `_routes.json` 明确让中英文 ProductInfo 进入 Function；`_redirects` 中原先“所有英文 ProductInfo 跳英文首页”的宽泛规则已删除。
- `npm run seo:audit:legacy-products` 回归检查 4 个 ID、8 个中英文目标、未知 ID 放行及路由配置。
- `.com.cn` 当前仍由旧站 IIS 执行已上线的四条 301；本仓库代码不声称接管该域名。未来迁移 DNS 或托管架构时再统一入口。

### 后续上线原则

剩余 ID 只有在旧 CMS 身份、新页面内容和目标 200 均核验后才可加入事实源。禁止把未知产品统一跳到首页，也禁止仅凭相似标题创建永久跳转。

---

审计日期：2026-08-11（Asia/Shanghai）  
审计对象：`https://www.foreachtek.com/` 线上正式站点与当前项目中的迁移配置  
审计方式：真实 GET 请求（不跟随跳转与跟随跳转两种）、Googlebot / Bytespider / GPTBot User-Agent 复核、项目全局搜索、构建产物检查、Internet Archive 公开历史索引抽样。  
本轮变更：仅新增本报告；未修改 redirect、Cloudflare、robots、产品页面或其他代码。

## 结论摘要

当前旧产品 URL 迁移不具备产品级一对一能力，属于高风险未收口状态。

- 中文 `/cn/ProductInfo.aspx` 当前返回真实 `404`；携带 `?Id=`、`?id=` 或 `?productId=` 仍为 `404`。
- 英文 `/en/ProductInfo.aspx` 当前返回真实 `301`，但所有请求统一跳到英文首页。携带的查询参数会被原样带到首页，例如 `?Id=11172` 跳到 `/en/?Id=11172`，最终读取的是首页，而不是对应产品。
- Googlebot、Bytespider、GPTBot 与普通请求收到相同结果：中文 `404`，英文 `301 → 英文首页`。
- 旧站公开存档确认的主要中文产品详情格式是 `/cn/ProductInfo.aspx?Id=<数字>`，参数名为大写 `Id`。在设置 200 条上限的公开存档抽样中，已返回至少 200 个不同旧产品 URL。
- 项目中不存在旧 `Id` 到新版产品 slug 的映射表，也不存在按 Query 参数选择目标的运行时代码。
- DPL30 的中英文新版详情页均在线并返回 `200`，但未在项目、搜索结果或最新可用旧版产品中心公开存档中找到可核验的 DPL30 旧 `Id`。在确认旧 ID 前，不能安全创建所谓“旧 DPL30 一对一跳转”。
- 技术上存在若干真实 `301`，但产品身份没有迁移；英文产品详情统一跳首页还可能被搜索引擎视为不相关跳转或 soft 404。Google 明确建议建立旧 URL 到对应新 URL 的映射，不要把大量旧 URL 统一跳到不相关首页：[Google Search Central：Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)。

## 审计边界与证据可信度

### 已验证

- 线上正式域名的实际状态码、首跳 `Location`、最终 URL、跳转次数和最终页面类型。
- `www` / 裸域、HTTP / HTTPS 的代表性链路。
- 普通客户端及 Googlebot、Bytespider、GPTBot 的响应是否一致。
- 当前仓库的 `_redirects`、Cloudflare Pages Function、`_routes.json`、Next.js 配置、生成产品路由字段及最终 `out` 构建产物。
- Internet Archive 中公开可见的旧 URL 形式及部分旧产品身份。

### 本轮无法直接验证

- Cloudflare AI Crawl Control / Logpush 中每一个完整请求 URI 的频次；用户提供的信息只确认 `/cn/ProductInfo.aspx` 和 `/en/ProductInfo.aspx` 是高频路径，未提供 Query 维度的旧产品 ID 排名。
- Cloudflare Dashboard 中可能存在但未纳入代码仓库的 Redirect Rules / Bulk Redirect Lists。本报告只能确认项目内没有这类导出配置，线上行为也没有显示出产品级规则生效。
- 旧 CMS 数据库或完整导出，因此公开存档只能作为发现线索，不能替代业务方对产品身份的最终确认。

## 1. ProductInfo.aspx 线上实测

### 1.1 核心结果

| 请求 URL | 首跳状态 | 首跳目标 | 最终状态 / 页面 | 判断 |
|---|---:|---|---|---|
| `https://www.foreachtek.com/cn/ProductInfo.aspx` | 404 | — | 404 页面，`noindex` | 没有迁移 |
| `https://www.foreachtek.com/cn/ProductInfo.aspx?Id=11172` | 404 | — | 404 页面，`noindex` | 旧产品身份完全丢失 |
| `https://www.foreachtek.com/cn/ProductInfo.aspx?id=1` | 404 | — | 404 页面 | 与参数名无关，路径未覆盖 |
| `https://www.foreachtek.com/cn/ProductInfo.aspx?productId=1` | 404 | — | 404 页面 | 项目与历史证据均不认识该格式 |
| `https://www.foreachtek.com/en/ProductInfo.aspx` | 301 | `/en/` | 200 英文首页 | 有永久跳转，但目标不相关 |
| `https://www.foreachtek.com/en/ProductInfo.aspx?Id=11172` | 301 | `/en/?Id=11172` | 200 英文首页 | 查询参数保留，产品身份未使用 |
| `https://www.foreachtek.com/en/ProductInfo.aspx?id=1` | 301 | `/en/?id=1` | 200 英文首页 | 同上 |
| `https://www.foreachtek.com/en/ProductInfo.aspx?productId=1` | 301 | `/en/?productId=1` | 200 英文首页 | 同上 |
| `https://www.foreachtek.com/en/productinfo.aspx?Id=11172` | 404 | — | 404 页面 | 路径大小写敏感 |

英文旧产品 URL 最终页的实际标题是 `FOREACH | Microfluidic Components and Fluidic Solutions`，即英文首页标题，不是产品标题。

### 1.2 Crawler User-Agent 复核

对 `?Id=11172` 使用 Googlebot、Bytespider 和 GPTBot User-Agent 复测，三者结果完全相同：

| User-Agent | 中文旧产品 URL | 英文旧产品 URL |
|---|---|---|
| Googlebot | 404 | 301 → `/en/?Id=11172` |
| Bytespider | 404 | 301 → `/en/?Id=11172` |
| GPTBot | 404 | 301 → `/en/?Id=11172` |

当前问题不是普通浏览器与 crawler 的差异，而是迁移规则本身缺失或目标错误。

### 1.3 Host 与协议变体

- `http://www.foreachtek.com/cn/ProductInfo.aspx?Id=11172` 先升级到 HTTPS，随后最终 `404`。
- `http://www.foreachtek.com/en/ProductInfo.aspx?Id=11172` 经两跳最终到 `https://www.foreachtek.com/en/?Id=11172`，返回 `200` 首页。
- 裸域 `https://foreachtek.com/cn/ProductInfo.aspx?Id=11172` 同样 `404`。
- 裸域 `https://foreachtek.com/en/ProductInfo.aspx?Id=11172` 同样跳到裸域英文首页并保留 `Id`。

因此，无论历史链接使用 HTTP、HTTPS、`www` 或裸域，都没有形成产品级迁移。

## 2. 已知旧 URL 格式

### 2.1 项目内已知路径

当前 `public/_redirects` 列出 18 条旧 ASPX 路径，涵盖首页、产品中心、产品列表、新闻、下载、公司和联系页面。与产品有关的只有：

- `/cn/ProductIndex.aspx`
- `/cn/ProductList.aspx`
- `/en/ProductIndex.aspx`
- `/en/ProductInfo.aspx`

其中中文 `/cn/ProductInfo.aspx` 未被列入。

### 2.2 公开旧站证据

Internet Archive 的公开 CDX 索引确认：

- 产品详情：`/cn/ProductInfo.aspx?Id=<数字>`
- 产品分类/列表：`/cn/ProductList.aspx?TypeId=<数字>`
- 旧详情页内部下载：`downloadfile.aspx?Id=<数字>&type=<数字>`
- 旧站搜索脚本使用：`SearchProduct.aspx?keys=<关键词>`

公开索引抽样链接：

- [ProductInfo.aspx 历史 URL 索引（上限 200）](https://web.archive.org/cdx/search/cdx?url=www.foreachtek.com/cn/ProductInfo.aspx*&output=json&fl=timestamp,original,statuscode,mimetype,digest&filter=statuscode:200&collapse=urlkey&limit=200)
- [ProductList.aspx 历史 URL 索引](https://web.archive.org/cdx/search/cdx?url=www.foreachtek.com/cn/ProductList.aspx*&output=json&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&collapse=urlkey&limit=1000)

结论：旧产品详情页可确认的主参数是大小写为 `Id` 的数字 ID。项目和本次公开历史抽样都没有发现 `productId` 是 FOREACH 旧站正式格式的证据；`?id=` 小写也未在抽样中出现。实现时仍应根据真实访问日志决定是否兼容大小写变体，不能凭空假设。

### 2.3 可恢复的一对一样本

公开旧页证据显示 `/cn/ProductInfo.aspx?Id=11172` 的产品标题为“柱塞泵 TM 0500μL”。新版存在并在线返回 `200` 的候选页面：

- 中文：`/products/pumps/plunger-pumps/tm-500-pmma/`
- 英文：`/en/products/pumps/plunger-pumps/tm-500-pmma/`

该样本说明可以用“旧 ID + 历史标题/型号/商品编码”与新版路由数据建立候选一对一映射，但在正式上线前仍应核对材质、容量和 SKU，不能只靠标题模糊匹配。

### 2.4 DPL30 旧 URL

新版 DPL30 页面已上线并返回 `200`：

- 中文：`https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/`
- 英文：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/`

但本轮没有找到可验证的旧 DPL30 `Id`：

- 项目中没有旧 ID 字段或映射。
- 搜索引擎结果未暴露旧 DPL30 URL。
- 最新可用的旧版产品中心公开存档（2025-08-15）中没有出现 `DPL30`、`DPL60` 或“隔膜泵”文本。

因此当前不能证明“旧 DPL30 URL”具体是哪一个，也不能安全写出 DPL30 专属 301。应优先从 Cloudflare 含 Query 的请求日志、旧 CMS 数据库/导出、GA4 历史落地页或服务器日志中找出真实 `Id`，再验证旧页面内容。

## 3. 当前迁移实现审计

| 机制 | 当前情况 | ProductInfo 影响 |
|---|---|---|
| `next.config.ts` | 没有 `redirects()` | Next.js 层没有旧 ASPX 映射 |
| `public/_redirects` | 18 条路径级 301；`/en/ProductInfo.aspx /en/ 301`；没有中文 ProductInfo | 英文统一跳首页且保留任意 Query；中文未覆盖 |
| `functions/_middleware.ts` | `LEGACY_REDIRECTS` 共 13 个路径，目标几乎都是语言首页；匹配后主动清空 Query | 完全没有 ProductInfo 规则，无法读取 `Id` |
| `public/_routes.json` | 只把部分旧路径交给 Pages Function | ProductInfo 与 ProductList 不进入 Function，走静态规则或 404 |
| 根目录 `middleware.ts` / `proxy.ts` | 未发现 | 没有 Next 运行时补充逻辑 |
| `legacyRedirectFrom` 产品字段 | 生成泵路由中有 25 个字段，25 个全部为空 | 无旧产品数据；且项目中没有运行时消费者 |
| old-site mapping JSON / TS | 未发现 | 不存在 `Id → slug` 事实来源 |
| Cloudflare Dashboard Redirect Rules | 仓库没有导出或声明文件 | 无法仅从仓库证明 Dashboard 是否另有规则；线上未显示产品级规则生效 |
| `out/_redirects` / `out/_routes.json` | 与源文件一致 | 构建产物会复现当前缺陷 |

### 两套规则的行为不一致

- Pages Function 中已覆盖的旧路径会清空查询参数，例如 `/cn/ProductIndex.aspx?TypeId=10322` 首跳到 `/`。
- 未进入 Function、由 `_redirects` 处理的路径会保留查询参数，例如 `/en/ProductInfo.aspx?Id=11172` 首跳到 `/en/?Id=11172`，`/cn/ProductList.aspx?TypeId=10322` 首跳到 `/?TypeId=10322`。

这不是一对一映射，而是同一站点内两种不同的参数丢弃/保留策略。它会增加测试难度，也会让 crawler 得到不一致信号。

## 4. Old URL → New URL 审计表

| Old URL | 当前状态 | 当前目标 | 推荐新 URL | 是否需要修 |
|---|---|---|---|---|
| `/cn/ProductInfo.aspx` | 404 | — | 无 `Id` 时保持 404/410，或经业务确认后到 `/products/`；不要假装是某个产品 | 是，需定义无效请求策略 |
| `/cn/ProductInfo.aspx?Id=<known-id>` | 404 | — | 301 到该 ID 对应的中文新版详情页 | **是，P0** |
| `/en/ProductInfo.aspx` | 301 | `/en/` | 无 `Id` 时 404/410；不应统一到首页 | **是，P0** |
| `/en/ProductInfo.aspx?Id=<known-id>` | 301 | `/en/?Id=<known-id>` | 301 到对应英文新版详情页 | **是，P0** |
| `/cn/ProductInfo.aspx?Id=<DPL30-id>` | 404；旧 ID 未确认 | — | `/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/` | **是，P0；先确认 ID** |
| `/en/ProductInfo.aspx?Id=<DPL30-id>` | 301 到英文首页；旧 ID 未确认 | `/en/?Id=<DPL30-id>` | `/en/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump/` | **是，P0；先确认 ID** |
| `/cn/ProductInfo.aspx?Id=11172` | 404 | — | 候选 `/products/pumps/plunger-pumps/tm-500-pmma/`，需产品事实复核 | 是，P0 样本 |
| `/en/ProductInfo.aspx?Id=11172` | 301 | `/en/?Id=11172` | 候选 `/en/products/pumps/plunger-pumps/tm-500-pmma/`，需确认英文旧页身份 | 是，P0 样本 |
| `/cn/ProductList.aspx?TypeId=<known-type>` | 301 | `/?TypeId=<known-type>`；无 Cookie 测试最终可能再到英文首页 | 对应中文产品分类页 | **是，P1** |
| `/cn/ProductIndex.aspx` | 301 | `/` | `/products/` | 是，P1 |
| `/en/ProductIndex.aspx` | 301 | `/en/` | `/en/products/` | 是，P1 |
| `/cn/NewsInfo.aspx?Id=<known-id>` | 301 | `/`，Query 被清空 | 对应中文新闻或技术文章；无替代时 404/410 | 是，P1 |
| `/en/News.aspx` | 301 | `/en/` | `/en/resources/technical-articles/`（需核对旧栏目语义） | 是，P1 |
| `/en/DownList.aspx` | 301 | `/en/` | `/en/resources/datasheets/` | 是，P1 |
| `/cn/history.aspx` | 301 | `/` | `/about/history/` | 是，P1 |
| `/en/history.aspx` | 301 | `/en/` | `/en/about/history/` | 是，P1 |
| `/cn/contact.aspx` | 301 | `/` | `/contact/` | 是，P1 |
| `/en/contact.aspx` | 301 | `/en/` | `/en/contact/` | 是，P1 |
| `/en/aboutInfo.aspx` | 301 | `/en/` | `/en/about/foreach/` | 是，P1 |
| `/en/NewsList.aspx` | 301 | `/en/` | `/en/resources/news/` | 是，P1 |
| `/cn/Index.aspx`、`/cn/index.aspx` | 301 | `/` | `/` | 否，目标合理 |
| `/en/Index.aspx`、`/en/index.aspx` | 301 | `/en/` | `/en/` | 否，目标合理 |
| `/en/JobList.aspx` | 301 | `/en/` | 当前无已确认等价招聘页；应人工确认外部招聘站或返回 410 | 是，P2 |
| 大小写变体 `/en/productinfo.aspx?...` | 404 | — | 只在日志证明有真实流量时兼容到同一映射逻辑 | 观察后决定，P2 |

## 5. 是否存在真正的 301

存在，但要区分“HTTP 状态正确”和“迁移目标正确”。

- `/en/ProductInfo.aspx` 的响应确实是服务器端 `301 Moved Permanently`，不是前端 JavaScript 跳转，也不是 `302`。
- 多数已列入旧路径配置的 ASPX 页面也确实返回 `301`。
- `/cn/ProductInfo.aspx` 没有 301，直接为真实 `404`。
- 英文 ProductInfo 的 301 目标是英文首页，不是对应产品；因此它不能算完成了产品迁移。

## 6. 一对一映射能力判断

### 当前能力：没有

当前代码只按 pathname 匹配，不读取或解析 `Id`，也没有映射数据。`/en/ProductInfo.aspx?Id=10082` 与 `?Id=11448` 会进入同一个首页目标；中文两者都会 404。

### 技术可行性：可以建立

建议的数据链是：

`旧请求完整 URI` → `旧 Id` → `历史标题 / 型号 / 商品编码 / 语言` → `新版产品记录` → `经人工确认的新 URL` → `301`

可用事实来源按优先级排序：

1. 旧 CMS 数据库、后台导出或旧站备份。
2. Cloudflare Logpush / 请求日志中的完整 `ClientRequestURI`，用于确定当前仍被抓取的 ID 与频次。
3. GA4 / 旧 Analytics 的历史 landing page 报告。
4. Internet Archive 历史页面，用于补充标题、型号、商品编码和内容证据。
5. 新站产品搜索索引与产品数据，用于生成候选新 URL；必须人工验真。

## 7. Google / AI crawler 高频旧 URL 判断

用户提供的 Cloudflare AI Crawl Control 证据证明两个 pathname 仍被频繁访问，但 pathname 本身不足以决定一对一目标。真正需要排序的是完整 URI 中的 `Id`。

当前可以下的结论：

- `/cn/ProductInfo.aspx` 高频请求全部浪费在 404。
- `/en/ProductInfo.aspx` 高频请求全部被汇入英文首页，旧产品信号没有传递到新产品页。
- 在没有 Query 级日志前，无法可靠回答“哪些旧产品 ID 最常被 Google / AI crawler 访问”。
- 公共存档中至少有 200 个不同旧产品 ID，说明这不是补一条 DPL30 规则即可彻底解决的问题。

## 8. 优先级

### P0

1. 从 Cloudflare 导出 `/cn/ProductInfo.aspx`、`/en/ProductInfo.aspx` 的完整 URI（包含 Query）、User-Agent、请求次数、最近访问时间和状态码，至少覆盖最近 90 天；同时索取旧 CMS 产品导出。
2. 建立权威 `legacy-product-id-map`，逐条记录语言、旧 `Id`、旧标题、型号、商品编码、推荐新 URL、证据来源和人工确认状态。
3. 用 Query-aware 的单一运行时规则处理 ProductInfo：已确认 ID 精确 301；未确认 ID 保持可监控的 404/410，不能跳首页。
4. 立即停止英文 ProductInfo 的路径级“全部跳首页”策略；中文和英文应共享同一映射事实源。
5. 找到并验证 DPL30 的真实旧 `Id`。只有确认旧页确实是 DPL30 后，才建立到中英文 DPL30 新详情页的 301。
6. 为真实高频前 20–50 个旧 ID 优先完成映射，并逐个使用 Googlebot、Bytespider、GPTBot UA 验证首跳为单跳 301、目标为 200 产品页。

### P1

1. 建立 `TypeId → 新产品分类页` 映射，替换 `/cn/ProductList.aspx` 到首页的宽泛跳转。
2. 把 ProductIndex、DownList、News、history、contact、aboutInfo 等路径迁移到语义对应的新栏目，而不是语言首页。
3. 合并 `_redirects` 与 Pages Function 的迁移事实源，避免一套保留 Query、另一套清空 Query。
4. 增加自动化回归审计：状态码、Location、跳转次数、目标 200、目标 canonical、未知 ID 行为、大小写、HTTP/HTTPS、www/裸域及 crawler UA。
5. 在 Search Console 和 Cloudflare 中持续监控旧 URL 的抓取量、404、soft 404 与目标页收录变化。

### P2

1. 利用公开存档和旧产品资料回填低频长尾 ID，并对已下架且无等价替代的产品明确返回 410。
2. 清理仍指向旧 ASPX URL 的站外可控链接、PDF、经销商资料和历史营销物料。
3. 建立迁移数据治理：产品下架、改名或 URL 变化时，旧 URL 映射与回归测试必须同步更新。

## 9. 推荐下一步

下一步先不要直接写某个猜测性的 DPL30 redirect。应先完成一件事：取得含 Query 的 Cloudflare 请求日志与旧 CMS 产品导出，建立第一版 `Id → 新 URL` 权威映射表。

原因：当前最大缺口不是缺少 301 语法，而是不知道每个高频旧 `Id` 的真实产品身份。先补规则而没有事实映射，只会把“404”变成“错误的永久跳转”。映射表确认后，再用一个 Query-aware 的 Cloudflare Pages Function 实现单跳、产品级 301，并优先上线高频 ID 与经确认的 DPL30 ID。

