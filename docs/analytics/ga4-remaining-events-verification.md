# GA4 剩余业务事件自动核验报告

核验日期：2026-08-03（Asia/Shanghai）

## 1. 核验结论

本次要求的 16 个剩余业务事件均在本地网站的真实 DOM 交互中捕获到 `sent`。主要核验保持 `analytics_storage=denied`；另以 `filter_apply` 抽查 `granted`，事件仍发送且 Consent 切换没有额外产生 `page_view`。未修改已通过验收的 Consent Mode、`page_view` 和产品浏览链路。

发现并修复三个真实运行问题：

1. 产品详情的 2D 图纸 Tab 原来只发送 `product_tab_select`，没有发送 `resource_view`。
2. 产品详情加入询盘清单时使用展示编码 `EA-100-PMMA`，与列表页稳定 ID `pump-ea-100ul-pmma` 不一致，导致同一产品可能被当作两个条目并多发加入事件。
3. 安装教程卡片原来打开播放器但没有资源事件；现已在真实点击处理器中发送一次稳定 ID 的 `resource_view`。

## 2. 核验方式与数据口径

- 未安装任何 npm 依赖，复用了已经运行的本地 Next 开发服务器。
- 使用 Codex 内置浏览器自动化打开真实页面、操作真实筛选器、搜索框、产品卡、抽屉、Tab、资源卡、内容链接、联系方式和语言菜单。
- 在开发环境临时把统一 `trackEvent` 的低维度安全参数写入页面级内存数组，记录 `eventName`、`queued/sent`、`pathname`、`timestamp` 和清理后的参数。
- 搜索调试数据只保留“是否存在、长度、结果数”，不保留搜索词正文；表单值、邮箱、电话、公司、留言、验证码、附件名和接口错误正文均不进入调试记录。
- 成功询盘仅使用开发环境临时本地 mock。mock 在请求函数入口直接返回与成功流程一致的结果，没有向询盘接口发出请求；使用明显虚构的测试值，未触发打印或外部销售流程。
- 每个场景在操作前建立新基线或清空目标记录。下方 `sent` 次数是各最终验收场景的目标事件合计，不把修复前诊断、重复复测和恢复语言/清单状态的清理动作计入验收次数。
- 若事件先 `queued`、之后冲刷为 `sent`，只把最终 `sent` 计为一次。本次剩余事件的最终验收场景中 `__foreachGaReady=true`，目标事件均直接为 `sent`；既有队列逻辑未改动。

## 3. 自动化访问的真实路径

- 产品中心：`/products/pumps/plunger-pumps/`
- 产品详情：`/products/pumps/plunger-pumps/ea-100-pmma/`
- 联系页面：`/contact/`
- 规格书：`/resources/datasheets/`
- 安装教程：`/resources/installation-guide/`
- 首页及内容入口：`/`
- 语言跳转：`/` → `/en/` → `/es/`，测试后恢复中文

实际操作过的产品包括 `EA-100-PMMA`、`EA-250-PMMA` 和 `EA-500-PMMA`；事件参数使用对应稳定 ID，例如 `pump-ea-100ul-pmma`、`pump-ea-250ul-pmma`、`pump-ea-500ul-pmma`。

## 4. 捕获到的完整目标事件顺序

以下按隔离场景列出真实操作后的完整目标事件顺序；括号内为本场景事件结果。

1. 初始打开柱塞泵列表：仅页面初始化事件；没有自动发送 `filter_apply`。
2. 点击材质 `PEEK`：`filter_apply(sent)`；结果数为 9。
3. 点击容量 `500μL`：`filter_apply(sent)`；结果数为 1。
4. 多选材质 `PEEK`、`PMMA`：`filter_apply(sent)`；`filter_value=PEEK|PMMA`，结果数为 25。
5. 接受分析 Cookie 后点击 `PEEK`：`filter_apply(sent)`；切换 Consent 前后当前地址的 `page_view` 都是 1。
6. 输入 `DPL30`：输入字符期间无事件；正式提交后 `search(sent)`。
7. 提交 `zz-test-no-product-92831`：`search(sent)` → `search_no_results(sent)`。
8. 提交邮箱或电话号码句子：网站结果正常更新；无 `search`，无 `search_no_results`。
9. 依次提交 `Q2001-PMV-SACN`、`EA-0100UL`、`DPL30 300ml`：每次均有 `search(sent)`；当前柱塞泵子集结果为 0，因此每次随后各有 `search_no_results(sent)`。
10. 从已持久化清单恢复页面：没有 `add_to_inquiry_list`。
11. 从真实产品列表加入 `EA-250-PMMA`：`add_to_inquiry_list(sent)`。
12. 打开清单：`view_inquiry_list(sent)`；关闭无事件；再次打开：`view_inquiry_list(sent)`。
13. 移除 `EA-250-PMMA`：`remove_from_inquiry_list(sent)`。
14. 交叉重复检查：加入 `EA-500-PMMA` 时只有 `add_to_inquiry_list(sent)`，没有 `select_item`；再移除时只有 `remove_from_inquiry_list(sent)`。
15. 从全局清单点击“申请图纸”：`begin_inquiry(sent)`；只打开表单没有 `form_start`；第一次修改字段后 `form_start(sent)`；继续修改第二字段无重复。
16. 联系页点击支持卡：`begin_inquiry(sent)`；同一流程再次点击其他支持卡无重复；首次修改联系表单后 `form_start(sent)`，继续填写无重复。
17. 联系表单原生必填校验失败：`inquiry_submit_error(sent)`；没有 `generate_lead`。
18. 验证码未通过的安全失败：`inquiry_submit_error(sent)`；没有 `generate_lead`。
19. 本地 mock 成功流程：成功响应确认后 `generate_lead(sent)`；没有 `inquiry_submit_error`，也没有真实网络提交。
20. 产品详情点击联系入口：`contact_click(sent)` → `begin_inquiry(sent)` → 联系页 `page_view(sent)`，三个事件各一次。
21. 初始规格 Tab：无 `product_tab_select`。切换 2D：`product_tab_select(sent)` → `resource_view(sent)`；再次点击当前 2D 无事件。切换 3D：`product_tab_select(sent)` → `resource_view(sent)`；切回规格：`product_tab_select(sent)`。
22. 点击真实安装教程卡：`resource_view(sent)`，没有 `resource_download` 或 `select_content`。
23. 点击规格书真实下载按钮：`resource_download(sent)`，没有 `resource_view` 或 `select_content`。
24. 分别点击应用领域、新闻、资源工具：每次各 `select_content(sent)`，共 3 次。
25. 点击页脚邮箱入口：`contact_click(sent)`；浏览器随后基于安全策略阻止启动外部邮件应用，但 GA4 点击处理器已经执行。点击站内联系表单入口：`contact_click(sent)`。产品详情联系入口另有一次 `contact_click(sent)`。
26. 中文切英文：`language_change(sent)` → 英文页一次 `page_view`；英文切西语：`language_change(sent)` → 西语页一次 `page_view`；再次选择当前西语只有正常页面行为，没有 `language_change`。测试后恢复中文产生的清理事件不计入验收表。

## 5. 事件次数与关键参数

| 事件 | sent 次数 | 关键参数实测摘要 | 结果 |
| --- | ---: | --- | --- |
| `filter_apply` | 4 | `filter_category=pumps`；`filter_name=filter03/filter02`；`filter_value=PEEK/500μL/PEEK\|PMMA`；含 `result_count`、`source_section=product_selection`、`locale` | 通过 |
| `product_tab_select` | 3 | `tab_name=2d/3d/specifications`；`product_id=pump-ea-100ul-pmma`；含分类、系列、语言 | 通过 |
| `search` | 5 | 包含清理后的 `search_term`、`search_location`、`locale`、`result_count`；安全记录只存长度，不存正文 | 通过 |
| `search_no_results` | 4 | 与对应无结果搜索各一次；`result_count=0` 由配对的 `search` 验证 | 通过 |
| `add_to_inquiry_list` | 2 | 稳定 `product_id`、分类、系列、`list_size`、来源、语言、`items` | 通过 |
| `remove_from_inquiry_list` | 2 | 与真实状态删除一一对应；删除后 `list_size` 正确 | 通过 |
| `view_inquiry_list` | 2 | 两个独立打开周期各一次；`source_section=global_selection_cart`、`list_size=3`、稳定 `item_id` 列表 | 通过 |
| `begin_inquiry` | 3 | 全局图纸申请、联系支持卡、产品详情联系；含 `form_id`、`form_type`、来源、语言及可选产品 ID | 通过 |
| `form_start` | 2 | 图纸申请表和联系表各在首次有效修改时一次；不含字段值 | 通过 |
| `generate_lead` | 1 | `form_id=contact_inquiry_form`、`form_type=general_inquiry`、`source_section=contact_form_section`、`locale=zh-CN` | 通过 |
| `inquiry_submit_error` | 2 | `validation_error/client_validation` 与 `captcha_error/email_verification`；不含原始错误或输入 | 通过 |
| `resource_view` | 3 | 2D：`pump-ea-100ul-pmma:drawing2d`/`pdf`；3D：`pump-ea-100ul-pmma:model3d`/`glb`；教程：`installation_guide:<stable-id>`/`mp4` | 通过 |
| `resource_download` | 1 | `resource_id=sm-piston-pump`、`resource_type=datasheet`、`file_type=pdf`、`source_section=datasheet_library` | 通过 |
| `select_content` | 3 | `applications:ivd`、`resources:news:adlm-2026-onsite`、`resources:calculators:fluid-resistance`；来源分别为页面内容/页脚 | 通过 |
| `contact_click` | 3 | 渠道为 `email` 或 `contact_form`；仅含渠道、来源、语言及可选稳定产品 ID，不含地址或号码 | 通过 |
| `language_change` | 2 | `zh-CN→en`、`en→es`；`source_section=site_header` | 通过 |

## 6. 搜索 PII 结果

- `联系test@example.com咨询DPL30`：网站搜索正常执行，GA4 的 `search`/`search_no_results` 均为 0。
- `电话138-0013-8000咨询`：网站搜索正常执行，GA4 的两个搜索事件均为 0；调试数据中也未出现 `138`。
- `Q2001-PMV-SACN`、`EA-0100UL`、`DPL30 300ml`：均实际发送 `search`，没有被电话号码规则误拦截。
- 统一 `sanitizeSearchTerm` 同时供 `trackSiteSearch` 和 `trackSearchNoResults` 使用；检测到疑似邮箱或达到电话特征的数字序列时直接返回空字符串并终止事件，不替换后继续发送。

## 7. Consent、queued/sent 与 page_view 抽查

- 主要 16 项运行时页面标记为 Consent `denied`、`__foreachGaReady=true`，事件仍进入统一 `gtag` 流程。
- 通过可见 Cookie 设置切换为接受后，`filter_apply` 仍发送一次；切换前、切换后、触发筛选后当前地址的 `page_view` 始终为 1。随后通过界面恢复拒绝状态。
- 本轮浏览器能力不允许直接读取 Cookie/profile 存储，因此没有重复读取 `_ga`；“接受生成、撤销清除 `_ga`”沿用任务开始时已通过的 Consent 验收结论，相关代码未改动。
- 本次剩余事件最终样本均在 GA ready 后直接 `sent`，没有把 `queued` 加入次数。页面级 pending queue 和 ready 后冲刷逻辑保持原样。

## 8. 重复与缺失检查

- 资源预览只产生 `resource_view`；明确下载只产生 `resource_download`；两者都没有额外产生 `select_content`。
- 产品详情联系入口按语义允许同时产生一次 `contact_click` 和一次 `begin_inquiry`；两者均无重复。
- 产品加入清单只产生一次 `add_to_inquiry_list`，没有触发产品卡 `select_item`。
- 两种失败场景各只有一次 `inquiry_submit_error`，没有 `generate_lead`。
- mock 成功只有一次 `generate_lead`，没有 `inquiry_submit_error`。
- 默认 Tab、再次点击当前 Tab、初始化筛选、搜索逐字输入、只打开未填写的表单、选择当前语言均没有误发事件。
- App Router/真实导航抽查没有恢复 `page_view` 重复问题。
- 最终 16 个目标事件没有缺失。

## 9. 真实组件调用链与防重复

所有语义函数最终都进入 `lib/analytics/track-event.ts` 的统一 `trackEvent`。

| 事件 | 真实路由 → 页面/交互组件 → 语义函数 | 防重复方式 |
| --- | --- | --- |
| `filter_apply` | `app/products/[category]/[slug]/page.tsx` → `ProductSelectionClient` 真实筛选回调 → `trackFilterApply` | 等结果更新；pending filter ref 合并同一次变化；初始化不触发 |
| `product_tab_select` | 柱塞泵 `[slug]/page.tsx` → `ProductDetailClient.handleProductTabChange` → `trackProductTabSelect` | `nextTab === currentTab` 直接返回 |
| `search` / `search_no_results` | 产品路由 → `ProductSelectionClient` 正式搜索处理器 → `trackSiteSearch` / `trackSearchNoResults` | pending search ref；不在逐字输入时发送；两者共用 PII 清理 |
| `add_to_inquiry_list` / `remove_from_inquiry_list` | `app/layout.tsx` → `SelectionCartProvider`，由真实产品卡/详情/抽屉调用 → 对应语义函数 | 已存在条目不新增；不存在条目不删除；只在状态真实变化后发送 |
| `view_inquiry_list` | `app/layout.tsx` → `GlobalSelectionCartDrawer`/`SelectionCartProvider.openCart` → `trackInquiryListView` | 仅 `!isOpen` 时发送；关闭不发送；新打开周期允许再次发送 |
| `begin_inquiry` | 全局抽屉、`ContactPageContent` 支持卡、`ProductDetailClient` 联系处理器 → `trackBeginInquiry` | 联系页以 ref 限制同一流程一次；点击动作触发，初始化不触发 |
| `form_start` | `ContactInquiryForm`、`CompanyInfoRequestModal` → `trackFormStart` | 每个表单实例的 `formStartedRef`，首次有效修改后置位 |
| `generate_lead` | `/contact/` → `ContactPageContent` → `ContactInquiryForm` 成功分支 → `trackLeadGenerated` | 只在后端成功确认后调用；提交锁阻止重复点击 |
| `inquiry_submit_error` | 同一真实表单的校验/验证码/请求失败分支 → `trackInquirySubmitError` | 每个真实失败分支单点调用；成功分支不调用 |
| `resource_view` | `ProductDetailClient` 2D/3D Tab、安装教程路由 → `InstallationGuideClient.handleGuideClick`，或全局显式 view → `trackResourceView` | Tab 相同值返回；手动入口与全局监听通过显式动作/skip 分流，一次点击一处发送 |
| `resource_download` | `/resources/datasheets/` → `DatasheetsClient` 显式 download 属性 → `AnalyticsInteractionTracker` → `trackResourceDownload` | 显式 action/download 优先；资源分支发送后 return，不落入内容事件 |
| `select_content` | `app/layout.tsx` → `AnalyticsInteractionTracker` 单一 document click listener → `trackContentSelect` | 排除产品路径、资源路径与当前路径；每次点击只有一个全局处理点 |
| `contact_click` | 全局 tracker 的 mailto/tel/联系路径，或 `ProductDetailClient` 联系处理器 → `trackContactClick` | 渠道命中后立即 return；手动入口避免再由全局同名追踪 |
| `language_change` | `app/layout.tsx` → `SiteHeader.handleLanguageItemClick` → `trackLanguageChange` | `localeCode !== currentLocale` 才发送；自动加载/偏好恢复不调用 |

静态检查未发现这 16 项在当前测试路径中只接到未使用旧组件的情况。全局事件监听由根布局挂载一次。

## 10. 发现问题、原因、修复前后

### 10.1 2D 图纸缺少 resource_view

- 修复前：切换 2D 只捕获 `product_tab_select`，没有 `resource_view`。
- 原因：`handleProductTabChange` 的资源逻辑只处理 `3d` 分支。
- 修复：在 `components/products/detail/ProductDetailClient.tsx` 中为真实 drawing Tab 复用同一处理器，使用稳定 `resource_id=<product-id>:drawing2d`、`resource_type=2d_drawing` 和 URL 推导的低维 `file_type`。
- 修复后：2D 切换按顺序发送一次 `product_tab_select`、一次 `resource_view`；重复点击当前 Tab 为 0。

### 10.2 安装教程打开缺少 resource_view

- 修复前：点击真实教程卡并打开播放器，目标事件为空。
- 原因：教程卡处理器只设置播放器状态，没有语义化资源事件。
- 修复：在 `components/resources/installation-guide/InstallationGuideClient.tsx` 的真实 `handleGuideClick` 中，在解析出有效播放源后发送一次 `trackResourceView`；ID 为 `installation_guide:<guide.id>`，不发送文件名。
- 修复后：实际点击捕获 `resource_view × 1`，无下载或内容事件重复。

### 10.3 详情与列表的询盘 product_id 不一致

- 修复前：列表已有 `pump-ea-100ul-pmma` 时，详情按钮仍显示可加入；点击后新增展示编码 `EA-100-PMMA`，产生第三条重复清单项和额外加入事件。
- 原因：详情清单编码优先取展示字段，没有优先使用路由传入的稳定 `analyticsProductId`。
- 修复：在 `components/products/detail/ProductDetailClient.tsx` 的详情清单 ID 解析中优先使用 `analyticsProductId`。
- 修复后：详情识别到已存在的稳定条目，按钮显示已加入，数量保持 2，没有新增或额外 `add_to_inquiry_list`。

## 11. 修改文件

- `components/products/detail/ProductDetailClient.tsx`
- `components/resources/installation-guide/InstallationGuideClient.tsx`
- `docs/analytics/ga4-remaining-events-verification.md`

临时核验期间曾短暂加入开发环境安全记录和本地询盘 mock；它们已从 `lib/analytics/track-event.ts`、`components/analytics/GoogleAnalytics.tsx`、`components/contact/ContactInquiryForm.tsx` 全部移除，不属于最终修改。

## 12. 未完全运行的边界项

- 浏览器在一次 `mailto:` 测试后按安全策略阻止启动外部邮件应用；事件处理器在阻止前已真实捕获 `contact_click`。为避免再次触发外部应用，没有运行电话拨号；联系方式要求仍由“邮箱 + 站内联系表单”两个真实渠道满足。
- 没有实际执行“取消清空”和“删除不存在项”，以免冒险修改用户持久化清单。静态检查确认：取消确认时不进入清空分支；`removeItem` 找不到条目时直接返回；确认清空多个条目时当前实现逐条发送 `remove_from_inquiry_list`，不是一次汇总。
- 没有直接检查浏览器 `_ga` Cookie，原因见 Consent 小节；本任务开始时该项目已验收通过，且本次未修改相关实现。

上述限制不影响 16 个主要事件的真实运行通过结论。

## 13. TypeScript 与 Cloudflare 构建

### TypeScript

- 命令：`npx tsc --noEmit`
- 结果：通过，exit code 0。

### Cloudflare

- 命令：`npm run build:cloudflare`
- 脚本内 TypeScript 阶段：通过。
- 完整构建：因环境占用未完成，exit code 1；不是本次 GA4 代码编译失败。
- 具体阻塞：脚本准备临时隔离 `app/api` 时，Windows 返回 `EPERM`，不能把它重命名到 `node_modules/.cache/foreach-cloudflare-build/app-api`。
- 已确认占用进程为本次任务开始前就在运行的用户 Next dev：主进程 PID 47712、服务进程 PID 40756，创建于 20:53。按限制没有结束它。
- 失败后确认：`app/api` 仍在原位，临时目标 `app-api` 不存在，没有发生半移动。用户停止该开发服务器后可重新执行完整构建。

## 14. 清理和 Git 声明

- 全仓扫描确认临时事件数组、DOM 调试属性、调试函数、开发询盘 mock 和 `[GA4 DEBUG]` 日志均为零。
- 没有创建或遗留临时测试文件。
- 没有安装依赖，没有改变视觉、产品数据、资源内容、询盘业务行为或正常导航。
- 没有执行 reset、restore、checkout、stash、clean 或切换分支。
- **没有提交 Git，也没有推送 GitHub。**
