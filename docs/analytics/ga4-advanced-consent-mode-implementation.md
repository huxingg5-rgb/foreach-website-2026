# FOREACH 官网 GA4 高级 Consent Mode 与第一阶段获客闭环实施说明

更新日期：2026-08-03

## 1. 项目目标

在不新增统计 SDK、不改变业务视觉和询盘接口的前提下，将现有 GA4 改为高级 Consent Mode，并用统一、无 PII 的语义事件覆盖“访问 → 内容/产品 → 搜索/筛选/资源 → 询盘清单 → 表单 → 成功或失败”的第一阶段获客闭环。

## 2. 本次闭环边界

本次覆盖官网客户端从流量进入到 `generate_lead` 的行为。明确不实现 `working_lead`、`qualify_lead`、报价、成交、CRM 回传、订单金额或销售结果；这些必须由后续询盘后台或 CRM 以真实状态回传，官网不得伪造。

## 3. 原有 GA4 问题

- 分析授权前不加载 Google Tag，并使用 `ga-disable-*` 完全阻断测量，不符合高级 Consent Mode。
- `track-event.ts` 在授权未开启时直接丢弃业务事件，内存队列也只在授权后发送。
- App Router `page_view` 没有完整覆盖 search/hash，且 Consent 更新或重复渲染存在重复风险。
- 已有事件工具未接入主要产品、搜索、资源和询盘路径，无法形成获客漏斗。

## 4. 高级 Consent Mode 修改说明

初始化顺序固定为：

1. 根布局的 `beforeInteractive` 脚本初始化 `dataLayer`/`gtag`。
2. 在任何 `config` 或事件前写入 Consent Default：`analytics_storage`、`ad_storage`、`ad_user_data`、`ad_personalization` 全部 `denied`。
3. 客户端读取已有选择并立即执行 Consent Update；广告相关状态始终为 `denied`。
4. 只要 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 存在，就用 `afterInteractive` 加载 `gtag.js`，不再按授权状态决定是否加载。
5. Tag 就绪后执行 `config`，保留 `send_page_view:false`，标记统一事件工具可发送，冲刷最多 50 条的页面内存队列。
6. 未选择、拒绝或撤销授权时，`page_view` 和业务事件继续由 Consent Mode 发送无 Cookie 测量；不生成自定义访客 ID，也不把队列写入任何持久存储。
7. 接受/拒绝/保存设置通过现有 `foreach:cookie-consent-updated` 事件在当前点击周期更新 Consent，无需刷新。
8. 撤销时继续调用现有 Cookie 清理，并补充父域候选，清理 `_ga`、`_gid`、`_ga_*` 的主机域和可注册父域版本。
9. 手动 `page_view` 使用 `pathname + search + hash`；完整地址签名、防抖计时器和就绪标记共同避免 Strict Mode、重复渲染、重复 `onReady` 与 Consent 更新导致的重复。

代码中已不存在 `ga-disable-*`，事件工具也不再按分析授权直接 `return`。

## 5. 修改文件清单

核心统计与 Consent：

- `app/layout.tsx`
- `components/analytics/GoogleAnalytics.tsx`
- `components/analytics/AnalyticsInteractionTracker.tsx`（新增）
- `lib/analytics/track-event.ts`
- `lib/privacy/cookie-consent.ts`

真实业务入口：

- `components/layout/SiteHeader.tsx`
- `components/products/selection/ProductSelectionClient.tsx`
- `components/products/selection/ProductSelectionCard.tsx`
- `components/products/selection/ProductCardGrid.tsx`
- `components/products/detail/ProductDetailClient.tsx`
- `components/search/SiteSearchClient.tsx`
- `components/search/GlobalSearchPanel.tsx`
- `components/resources/DatasheetsClient.tsx`
- `components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx`
- `components/selection-cart/SelectionCartProvider.tsx`
- `components/selection-cart/GlobalSelectionCartDrawer.tsx`
- `components/contact/ContactPageContent.tsx`
- `components/contact/ContactInquiryForm.tsx`
- `components/contact/DistributorPageContent.tsx`
- `components/home/HomeInquirySection.tsx`
- `components/forms/company-info-request/CompanyInfoRequestModal.tsx`

复用了 `components/privacy/CookieConsent.tsx` 的现有保存、拒绝、撤销和 Cookie 清理调用，没有改动其视觉或多语言文案。

## 6–10. 第一阶段事件测量计划

以下 20 个事件均已接入真实功能。参数统一使用 snake_case；产品唯一标识使用稳定产品 ID、产品代码或 slug，不用翻译文案作为唯一标识。

| 事件名称 | 业务目标 | 触发条件 | 事件参数 | 调用文件 | 触发组件 | 防重复方式 | 是否关键事件 | 对应 GA4 报告或漏斗 | 对应后续优化动作 | 多语言覆盖 |
|---|---|---|---|---|---|---|---|---|---|---|
| `page_view` | 衡量真实页面访问 | 首次进入，或 pathname/search/hash 变化 | `page_title`, `page_location`, `page_path` | `components/analytics/GoogleAnalytics.tsx` | `GoogleAnalytics` | 完整路径 `useRef` 签名、单一计时器、`send_page_view:false`、仅配置一次 | 否 | 页面与落地页报告 | 优化高流量低转化页 | 全语言路径 |
| `view_item_list` | 衡量产品/搜索列表曝光 | 非空产品分页、筛选结果或搜索结果集合真实展示 | `item_list_id`, `item_list_name`, `locale`, `items` | `ProductSelectionClient.tsx`, `SiteSearchClient.tsx` | 产品中心、站内搜索 | 列表 ID + 稳定产品 ID 集合签名；空列表不发 | 否 | 产品漏斗起点 | 优化列表排序和产品卡信息 | 中文、英文及其余 locale |
| `select_item` | 衡量从列表选择产品 | 点击产品卡进入详情；点击产品型搜索结果 | `item_list_id`, `item_list_name`, `locale`, `items` | `ProductSelectionCard.tsx`, `SiteSearchClient.tsx` | 产品卡、搜索结果项 | 只绑定实际导航链接的一次 click，不在卡片子元素重复绑定 | 否 | 产品/搜索漏斗 | 优化低点击卡片 | 全语言路径 |
| `view_item` | 衡量产品详情关注 | 产品详情路由真实显示 | `locale`, `items` | `ProductDetailClient.tsx` | 产品详情 | 路由 + 稳定产品 ID 签名 | 否 | 产品漏斗 | 识别热门产品/系列 | 全语言路径 |
| `filter_apply` | 衡量筛选偏好 | 用户修改产品类型、系列或普通筛选，结果更新 | `filter_category`, `filter_name`, `filter_value`, `result_count`, `source_section`, `locale` | `ProductSelectionClient.tsx` | 产品筛选 | 只在用户处理器设置 pending，结果 effect 消费一次；多选排序标准化 | 否 | 自定义探索 | 优化筛选器、产品属性与库存表达 | 全语言路径 |
| `product_tab_select` | 衡量详情内容兴趣 | 用户主动切换 specifications/3d/2d/other | `tab_name`, `product_id`, `product_category`, `product_series`, `locale` | `ProductDetailClient.tsx` | 产品详情 Tab | 默认 Tab 不发；相同当前 Tab 点击不发 | 否 | 产品内容探索 | 补充高需求规格/模型/图纸 | 全语言路径 |
| `search` | 衡量有效站内搜索 | 用户提交产品中心搜索，或站内搜索最终结果形成 | `search_term`, `search_location`, `locale`, `result_count` | `ProductSelectionClient.tsx`, `SiteSearchClient.tsx` | 产品搜索、站内搜索 | 搜索词 + 结果数签名/pending；不按每次输入发送；同词主动重提可再次发送 | 否 | 搜索漏斗 | SEO/GEO、同义词和产品命名优化 | 全语言路径 |
| `search_no_results` | 找到产品/内容缺口 | 完成搜索且最终结果严格为 0 | `search_term`, `search_location`, `locale` | `ProductSelectionClient.tsx`, `SiteSearchClient.tsx` | 产品搜索、站内搜索 | 与 `search` 使用相同完成态去重 | 否 | 无结果搜索探索 | 补产品、内容和同义词 | 全语言路径 |
| `add_to_inquiry_list` | 衡量选型意向 | 新产品真正加入全局清单 | `locale`, `source_section`, `list_size`, `product_id`, `product_category`, `product_series`, `items` | `SelectionCartProvider.tsx` | 全局选型清单 Provider | 加入前检查稳定条目 ID；已存在只加数量时不发；恢复 localStorage 不发 | 否 | 产品漏斗 | 识别高意向产品 | 全语言路径 |
| `remove_from_inquiry_list` | 衡量选型流失 | 用户删除单项或确认清空清单 | 同上 | `SelectionCartProvider.tsx` | 清单删除/清空 | 条目必须真实存在；取消清空不发；迁移/初始化不发 | 否 | 清单流失探索 | 检查型号匹配、价格/资料障碍 | 全语言路径 |
| `view_inquiry_list` | 衡量清单查看 | 用户主动把关闭的全局清单打开 | `locale`, `source_section`, `list_size`, `items` | `SelectionCartProvider.tsx` | 全局清单抽屉 | 只在 `isOpen=false` 的打开动作发送；同次打开一次，关闭后可再次发送 | 否 | 产品漏斗 | 优化清单 CTA 与信息密度 | 全语言路径 |
| `begin_inquiry` | 衡量进入询盘流程 | 产品详情进入询盘、联系页 CTA、清单申请图纸、首页/经销商首次填写 | `form_id`, `form_type`, `source_section`, `locale`, 可选 `item_count`, `product_id`, `product_category` | `ProductDetailClient.tsx`, `ContactPageContent.tsx`, `HomeInquirySection.tsx`, `DistributorPageContent.tsx`, `GlobalSelectionCartDrawer.tsx` | 询盘入口 | 页面级 ref、首次交互 ref 或每次弹窗打开动作；初始化不发 | 可选 | 产品/资源漏斗 | 优化入口文案与来源区块 | 全语言路径 |
| `form_start` | 衡量真实开始填写 | 首次有效字段修改、选择或添加文件 | `form_id`, `form_type`, `source_section`, `locale`, 可选 `item_count` | `ContactInquiryForm.tsx`, `HomeInquirySection.tsx`, `DistributorPageContent.tsx`, `CompanyInfoRequestModal.tsx` | 询盘表单 | 当前表单会话 ref；打开未填写不发；成功/重新打开后重置 | 否 | 询盘漏斗 | 找到打开但未填写的流失 | 全语言路径 |
| `generate_lead` | 衡量已被后端接收的线索 | 询盘 API/提交回调明确成功后 | `form_id`, `form_type`, `source_section`, `locale`, 可选产品维度 | 同上四个表单文件 | 联系、首页、经销商、图纸申请表单 | 仅成功分支；`isSubmitting` 阻止重复；失败不发 | **是** | 核心转化、所有推荐漏斗终点 | 评估渠道/语言/产品真实获客 | 全语言路径 |
| `inquiry_submit_error` | 衡量提交障碍 | 用户提交后发生客户端校验、验证码、附件、网络、API 或限流错误 | `form_id`, `form_type`, `source_section`, `locale`, `error_type`, `submission_stage` | 同上四个表单文件 | 询盘表单 | 每个失败分支一次；只发标准枚举，不发原始报错或输入 | 否 | 询盘错误探索 | 修复高频验证/API/附件障碍 | 全语言路径 |
| `resource_view` | 衡量资源预览兴趣 | 用户打开有效的 3D 模型、点击 2D 在线预览或打开可预览资源链接 | `resource_id`, `resource_type`, `file_type`, `source_section`, `locale`, 可选 `product_id` | `ProductDetailClient.tsx`, `AnalyticsInteractionTracker.tsx`, `FittingReplacementDrawingPreview.tsx`, 两个搜索组件 | 产品 3D Tab、2D 预览按钮、搜索规格书结果 | 显式 `action=view` 优先；未标记的资源文件打开默认 view；3D 局部埋点用 `analytics-skip` 跳过全局监听 | 否 | 资源漏斗 | 补充高需求技术资源 | 全语言路径 |
| `resource_download` | 衡量下载意图 | 用户点击显式下载按钮或带 HTML `download` 属性的链接 | 同上 | `AnalyticsInteractionTracker.tsx`, `DatasheetsClient.tsx` | 规格书库下载、全站明确下载入口 | 仅显式 `action=download` 或 HTML `download` 判定下载；单次委托 click；资源 ID 使用业务 ID 或路径哈希，不发送完整文件名 | 否 | 资源漏斗 | 优化下载入口和资料覆盖 | 全语言路径 |
| `select_content` | 衡量重要非产品内容 | 点击应用、新闻、技术文章、资源/工具等入口 | `content_type`, `content_id`, `content_name`, `source_section`, `locale` | `AnalyticsInteractionTracker.tsx` | 全站重要内容链接 | 单次委托 click；产品和资源链接提前分流，不重复记作内容 | 否 | 内容路径探索 | 优化内容推荐与 CTA | 全语言路径 |
| `contact_click` | 衡量联系渠道偏好 | 点击 email/phone/WhatsApp/WeChat/联系表单入口 | `contact_channel`, `source_section`, `locale`, 可选 `product_id` | `AnalyticsInteractionTracker.tsx`, `ProductDetailClient.tsx` | 全站联系链接、产品详情 CTA | 单次 click；只发渠道枚举，绝不发送号码/地址 | 可选 | 联系微转化 | 调整联系方式和入口位置 | 全语言路径 |
| `language_change` | 衡量主动语言切换 | 用户在站点 Header 选择与当前不同的语言 | `from_locale`, `to_locale`, `source_section` | `SiteHeader.tsx` | Header 语言菜单 | 比较目标与当前 locale；加载、恢复、同语言选择不发 | 否 | 语言路径探索 | 优化目标市场内容 | 所有语言选项 |

## 11. 多语言覆盖情况

- 事件名和参数名不随语言变化。
- 产品中心、搜索、详情、清单和 Header 从路由解析 locale；表单使用其页面 locale 或 `document.documentElement.lang`。
- 稳定产品 ID、产品代码、slug、类别代码和标准枚举用于关联多语言行为；翻译名称只作为可选展示维度。
- 代码路径覆盖中文、英文、西班牙语、法语、韩语和俄语路由；人工验收仍需至少抽查中文、英文及一个其他语言路径。

## 12. 暂未覆盖的页面和原因

- 当前产品详情没有真实 FAQ Tab，因此未伪造 `tab_name=faq`；将来增加真实 Tab 时接入 `trackProductTabSelect`。
- 产品详情中仍为占位逻辑、没有资源 URL 的“下载规格书/申请 3D”操作不发送资源成功事件；只有真实链接或真实模型/图纸打开才发送。
- 本次没有新增本地 MP4 的播放进度事件。普通资源入口可记 `resource_view`，但播放器的 start/progress/complete 需后续单独设计；YouTube 嵌入前应先检查增强型衡量自动视频事件。
- 没有 CRM 状态和销售结果的真实来源，因此未接入任何下游线索、报价或成交事件。

以上不是 20 个规划事件的缺失：20 个事件均至少有一个真实入口；未存在的具体子场景没有伪造。

## 13. 自动事件与手动事件去重方案

GA4 后台建议：

- 页面浏览：保留代码中的 `send_page_view:false`；关闭增强型衡量“基于浏览器历史事件的页面变化”，并用 Tag Assistant 验证首次加载也只有一个手动 `page_view`。
- 表单交互：关闭增强型衡量的 Form interactions。本项目的 `form_start` 仅覆盖询盘表单，边界更准确。
- 站内搜索：建议关闭增强型衡量的 Site search，避免自动 `view_search_results` 与手动 `search`/`search_no_results` 被重复解释；如保留，报告必须分开，不得合计成一次搜索两次。
- 文件下载：自定义 `resource_download` 含稳定资源/产品/来源维度，自动事件则叫 `file_download`。建议关闭自动 File downloads；如保留，只用于技术核对并在报告中严格分开。
- 视频：只有确认使用 YouTube 嵌入且不与未来手动事件重复时才保留自动 Video engagement；本地 MP4 不会被该自动功能完整覆盖。

## 14. 明确不采集的数据

不向 GA4 发送姓名、邮箱、电话、WhatsApp/微信号、公司名称、详细地址、自定义 IP 字段、验证码、询盘留言、表单字段正文、附件内容或原始文件名、完整接口错误、堆栈、证件、自定义访客 ID。联系事件只含渠道枚举；错误只含低维度 `error_type`；站内搜索词先 trim 并合并空格，只要任意位置出现疑似邮箱或至少 7 位数字组成的常见电话格式就整次停止发送，确认无 PII 后才截取最多 100 字符。

## 15. TypeScript 检查结果

命令：`npx tsc --noEmit`

结果：**通过（exit code 0）**。在全部埋点和表单接入完成后再次执行仍通过。

## 16. ESLint 检查结果

命令：`npm run lint`

结果：**全仓未通过，原因是当前仓库既有历史问题**。主要来源包括 `_backup/**` 历史快照，以及现有大型产品详情/选型组件中的 `no-explicit-any`、`set-state-in-effect` 等规则错误。代表性既有位置包括 `_backup/contact-formdata-submit-20260730-213342/ContactInquiryForm.tsx`、`ProductDetailClient.tsx`、`SelectionCartProvider.tsx` 等；没有为本任务删除或重构这些业务代码。

补充隔离验证：

- 核心新增/改造统计文件 `app/layout.tsx`、两个 analytics 组件、`track-event.ts`、`cookie-consent.ts` 单独 ESLint：**0 error / 0 warning**。
- 其他本次调用点在关闭其文件中已存在的 `set-state-in-effect`、`no-explicit-any`、`prefer-rest-params` 基线规则后以 `--quiet` 检查：**0 error**。

因此没有发现由本次 GA4 代码新增的 ESLint 错误，但全仓历史 lint 基线仍需另行治理。

## 17. Cloudflare 构建结果

命令：`npm run build:cloudflare`

结果：**通过（exit code 0）**。构建脚本完成 TypeScript 检查、临时隔离并恢复 `app/api`、Next.js 16.2.6 生产编译以及 5,317 个静态页面生成；静态导出目录为 `out`，Cloudflare Functions 保持不变。

## 18. 浏览器人工验证步骤与矩阵

### 准备

1. 停止 dev server 后先重跑 `npm run build:cloudflare`；再启动待验收版本。
2. 打开 Network，过滤 `gtag/js`、`g/collect`；打开 Application → Cookies；同时连接 Google Tag Assistant 和 GA4 DebugView。
3. 每个场景清空本域 Consent Cookie 和 GA Cookie后重新开始，避免跨场景状态污染。

### Consent 矩阵

| Consent 状态 | 必查项 |
|---|---|
| 未做选择 | `gtag.js` 加载；analytics/ad 全 denied；无 `_ga/_gid/_ga_*`；`page_view` 与业务事件有无 Cookie 请求 |
| 明确拒绝 | 同上；拒绝点击不刷新页面；后续事件仍发送无 Cookie 请求 |
| 明确接受 | analytics granted；广告仍 denied；允许 GA Cookie；页面和业务事件各一次 |
| 接受 → 拒绝 | 当前页立即 update denied；GA Cookie 被清除；不刷新；后续仍有无 Cookie测量 |
| 拒绝 → 接受 | 当前页立即 update granted；无需刷新；后续事件正常且不重复 |

页面环境需交叉覆盖：中文、英文、至少一个其他语言；桌面和移动；首次加载和 App Router 跳转；再单独修改 query 与 hash 验证 `page_path`。

### 事件矩阵

对 20 个事件逐项检查：正常操作只触发一次；重渲染不重复；初始化不误触发；失败操作不发 `generate_lead`；事件名在各语言一致；payload 无 PII。重点场景：

- 产品：列表 → 卡片 → 详情 → 筛选 → Tab。
- 搜索：有结果与 0 结果，确认 0 结果同时有 `search` 和 `search_no_results`。
- 清单：新增、重复新增、打开、关闭再开、移除、取消/确认清空、localStorage 恢复。
- 表单：打开不填、首次输入、前端校验失败、验证码失败、网络/API 失败、成功。
- Consent 切换后重复以上任一业务事件，确认 denied 仍发送且不写 GA Cookie。

## 19. GA4 后台配置清单

1. 按第 13 节检查增强型衡量：页面浏览/历史变化、表单、站内搜索、文件下载和视频。
2. 建议注册事件级自定义维度：`locale`、`source_section`、`search_location`、`filter_category`、`filter_name`、`filter_value`、`tab_name`、`resource_type`、`form_type`、`error_type`、`submission_stage`、`contact_channel`、`content_type`。不要为 `items` 中 GA4 已支持的标准电商字段重复注册。
3. 将 `generate_lead` 标记为关键事件；`begin_inquiry`、`contact_click` 可按运营需求作为微转化。普通浏览、列表、点击不要全部设为关键事件。
4. 内部流量过滤先设为 Testing，验证无误后再设 Active；不要直接不可逆过滤正式数据。
5. 建立统一 UTM 规范：`utm_source`、`utm_medium`、`utm_campaign`、`utm_content`、`utm_term`；渠道至少覆盖 LinkedIn、Google、微信、邮件、展会、合作伙伴和其他社交媒体。值使用小写、稳定枚举和统一分隔符，活动命名保留市场/主题/日期。

## 20. 推荐漏斗

- 产品漏斗：`view_item_list → select_item → view_item → add_to_inquiry_list → view_inquiry_list → begin_inquiry → form_start → generate_lead`
- 搜索漏斗：`search → select_item → view_item → generate_lead`
- 资源漏斗：`resource_view → resource_download → begin_inquiry → generate_lead`

漏斗建议按 `locale`、`source_section`、产品类别/系列和 UTM 分段；无 Cookie 数据用于总体建模与趋势，不能被误当作可识别用户级路径。

## 21. 事件与业务问题对应表

| 业务问题 | 主要事件/维度 |
|---|---|
| 哪些页面带来产品浏览 | `page_view`, `view_item_list`, `source_section`, UTM |
| 哪些产品和系列最受关注 | `select_item`, `view_item`, `items.item_id/category` |
| 哪些产品加入最多、移除最多 | `add_to_inquiry_list`, `remove_from_inquiry_list` |
| 用户偏好哪些筛选参数 | `filter_apply`, `filter_name`, `filter_value` |
| 用户更关心规格、3D 还是 2D | `product_tab_select`, `tab_name` |
| 用户搜索什么、哪些无结果 | `search`, `search_no_results`, `search_location` |
| 哪些资料被预览和下载 | `resource_view`, `resource_download`, `resource_type` |
| 哪些内容和联系入口有效 | `select_content`, `contact_click`, `source_section` |
| 询盘在哪一步流失 | `begin_inquiry → form_start → generate_lead` |
| 哪些失败类型最多 | `inquiry_submit_error`, `error_type`, `submission_stage` |
| 哪些语言/来源产生有效询盘 | `generate_lead` 按 `locale`、`source_section`、UTM 分段 |

## 22. 每周和每月数据使用建议

每周检查流量来源、热门产品/系列、搜索与无结果词、筛选偏好、资源预览/下载、清单增删、询盘漏斗、错误类别和语言差异。每月形成产品内容缺口、CTA 优化、SEO/GEO 词库、无结果同义词、技术资源缺口、有效渠道、清单高但提交低的产品以及表单阻碍清单。

每次优化保留同一记录格式：发现问题 → 假设与方案 → 修改日期 → 上线 → 固定观察窗口 → 对比前后指标 → 保留/回滚结论。避免同时修改多个关键变量而无法归因。

## 23. 后续 CRM 阶段规划（本次未实现）

后续应由服务端/CRM 以稳定的非 PII 业务主键回传线索状态，在完成数据治理、Consent 评估和 GA4 Measurement Protocol 方案后，再设计 `working_lead`、`qualify_lead`、`disqualify_lead`、报价与成交事件。必须保证：状态来自真实销售流程；不把邮箱/电话等 PII 传给 GA4；官网 `generate_lead` 与 CRM 后续状态可审计；测试环境与正式数据隔离。

## 最终实现状态

- 高级 Consent Mode：已完成代码实现。
- denied 下无 Cookie `page_view`/业务事件：代码路径已允许，待按第 18 节浏览器实测网络请求。
- 第一阶段 20 个事件：全部已接入至少一个真实交互入口。
- 因功能不存在而伪造的事件：无；未存在的 FAQ、占位资源、CRM 状态均未伪造。
- TypeScript：通过。
- 全仓 ESLint：被历史基线问题阻断；本次核心统计文件隔离检查通过。
- Cloudflare 正式构建：通过，`app/api` 已由构建脚本恢复。
- Git：未提交，未推送。
