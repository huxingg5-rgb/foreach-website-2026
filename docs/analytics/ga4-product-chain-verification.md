# GA4 产品链路自动核验报告

核验日期：2026-08-03（Asia/Shanghai）

## 1. 核验方式

- 未安装任何新依赖。
- 项目中未发现可直接使用的 Playwright、Puppeteer 或既有端到端测试配置；本机也没有可复用的 Chrome DevTools Protocol 调试端口。
- 使用 Codex 内置浏览器自动化真实打开本地网站、等待产品列表渲染，并点击页面 DOM 中实际存在的产品详情链接。
- 由于该浏览器能力不能在初始文档加载前替换 `window.gtag`，按任务允许的开发环境兜底方案，临时在统一 `trackEvent` 和现有 `page_view` 发送点写入 `window.__foreachAnalyticsDebugEvents`。记录只包含事件名、清理后的非 PII 关键参数、`queued`/`sent`、路径和时间戳。
- 通过页面可见的 Cookie 设置界面选择“拒绝可选项”，然后关闭此前标签并重新执行一次干净链路。最终列表页和详情页都确认 Consent 为 `denied`，`window.__foreachGaReady` 为 `true`。
- 没有打开或提交询盘表单，没有请求询盘接口。
- 核验结束后已删除全部临时内存记录代码、DOM 调试标记和调试日志；源码检索结果为零，也没有保留临时测试文件。

## 2. 实际路径和点击对象

- 列表页：`/products/pumps/plunger-pumps/`
- 实际点击：页面真实 DOM 中的 `EA-100-PMMA`“查看详情”链接
- 详情链接：`/products/pumps/plunger-pumps/ea-100-pmma`
- 详情核验路径：`/products/pumps/plunger-pumps/ea-100-pmma/`
- 链接实际行为：`target="_blank"`，测试未改变链接跳转或打开方式。
- 稳定产品 ID：`pump-ea-100ul-pmma`

## 3. 实际捕获事件顺序

下表是一次干净运行中完整的调试状态记录。`queued` 是同一事件进入内存队列的状态，不是一次 `gtag("event", ...)` 发送；随后对应的 `sent` 才计入事件次数。

| 顺序 | 时间戳（ms） | 事件 | 状态 | pathname | 关键参数摘要 |
| ---: | ---: | --- | --- | --- | --- |
| 1 | 1785768882231 | `page_view` | sent | `/products/pumps/plunger-pumps/` | `page_path=/products/pumps/plunger-pumps/` |
| 2 | 1785768882393 | `view_item_list` | sent | `/products/pumps/plunger-pumps/` | `item_list_id=product_selection:pumps:plunger-pump:page_1`，`item_list_name=product_selection_results`，`locale=zh`，9 个稳定 `item_id` |
| 3 | 1785768883417 | `select_item` | sent | `/products/pumps/plunger-pumps/` | 同一列表 ID/名称，`locale=zh`，`item_id=pump-ea-100ul-pmma` |
| 4 | 1785768883890 | `view_item` | queued | `/products/pumps/plunger-pumps/ea-100-pmma/` | `locale=zh`，`item_id=pump-ea-100ul-pmma` |
| 5 | 1785768883904 | `view_item` | sent | `/products/pumps/plunger-pumps/ea-100-pmma/` | `locale=zh`，`item_id=pump-ea-100ul-pmma` |
| 6 | 1785768883920 | `page_view` | sent | `/products/pumps/plunger-pumps/ea-100-pmma/` | `page_path=/products/pumps/plunger-pumps/ea-100-pmma/` |

实际 `gtag` 发送顺序为：

1. 列表页 `page_view`
2. `view_item_list`
3. 点击时 `select_item`
4. 详情组件提交后的 `view_item`
5. 详情地址 `page_view`

详情页 `view_item` 的 effect 在 GA 就绪前先进入队列，14 ms 后被同一页面的 GA 初始化流程冲刷为一次 `sent`。详情页 `page_view` 由现有的零延时调度稍后发送；本次未修改该逻辑。

## 4. 目标事件次数

`page_view` 的目标次数只统计点击后目标详情地址；列表页首次打开产生的初始化 `page_view` 单独列在完整顺序中，不属于“同一详情地址”的重复。

| 事件 | 次数 | 结果 |
| --- | ---: | --- |
| `view_item_list` | 1 | 通过 |
| `select_item` | 1 | 通过 |
| `page_view`（详情地址） | 1 | 通过 |
| `view_item` | 1 | 通过 |

- 重复：没有重复 `view_item_list`、`select_item`、详情 `page_view` 或 `view_item`。
- 缺失：四个目标事件均实际捕获，无缺失。
- Consent：最终运行是 `denied`，四个事件仍进入现有 `gtag` 流程。

## 5. 事件关键参数

### view_item_list

- `item_list_id`: `product_selection:pumps:plunger-pump:page_1`
- `item_list_name`: `product_selection_results`
- `locale`: `zh`
- `items`: 9 项；稳定 `item_id` 依次为：
  - `pump-ea-100ul-pmma`
  - `pump-ea-100ul-peek`
  - `pump-ea-250ul-pmma`
  - `pump-ea-250ul-peek`
  - `pump-ea-500ul-pmma`
  - `pump-ea-500ul-peek`
  - `pump-ea-1000ul-pmma`
  - `pump-ea-1000ul-peek`
  - `pump-ea-2500ul-pmma`

### select_item

- `item_list_id`: `product_selection:pumps:plunger-pump:page_1`
- `item_list_name`: `product_selection_results`
- `locale`: `zh`
- `items[0].item_id`: `pump-ea-100ul-pmma`

### view_item

- `locale`: `zh`
- `items[0].item_id`: `pump-ea-100ul-pmma`

上述调试记录没有保存 `item_name`，也没有记录姓名、邮箱、电话、搜索词、表单字段或其他用户输入。

## 6. 当前真实组件调用链

### 产品列表与卡片

1. `/products/pumps/plunger-pumps/` 命中 `app/products/[category]/[slug]/page.tsx`。
2. `resolveProductTypeRoute("pumps", "plunger-pumps")` 命中产品类型分支，实际渲染 `ProductSelectionClient`。
3. `ProductSelectionClient` 使用当前筛选和分页结果渲染 `ProductCardGrid`。
4. `ProductCardGrid` 对每个真实产品渲染 `ProductSelectionCard`。
5. `ProductSelectionCard` 中唯一的主要详情 `<a class="product-link">` 点击处理器调用 `trackProductSelect`，随后浏览器按原有 `_blank` 行为打开详情。

### 产品详情

1. `/products/pumps/plunger-pumps/ea-100-pmma/` 命中专用路由 `app/products/pumps/plunger-pumps/[slug]/page.tsx`。
2. 路由以规范化后的详情 slug 在 `selectionProducts` 中查找稳定 `productId`，把 `pump-ea-100ul-pmma` 作为 `analyticsProductId` 传入 `ProductDetailClient`。
3. `ProductDetailClient` 成功提交页面后执行 `useEffect`，调用 `trackProductView`。

不存在本次事件只接在未使用旧组件上的情况。全仓静态检索还发现搜索结果页 `SiteSearchClient` 有独立的列表/选择事件调用；它是搜索链路的有效入口，不是本次产品中心路径，也没有参与本次点击。

## 7. 三个产品事件的触发与去重

### view_item_list

- 调用文件：`components/products/selection/ProductSelectionClient.tsx`
- 触发条件：当前真实分页产品非空，并且最终列表签名发生变化。
- 去重 key：`item_list_id + 当前页按顺序排列的稳定 product_id`。
- 本次发现初始页容量先为 12，客户端根据真实视口计算后变为 9，原 effect 会把两种暂态列表各发送一次。现增加 150 ms 稳定窗口：视口导致的紧邻状态更新会取消前一个待发送任务，只发送最终列表；签名 ref 继续防止相同最终列表因重渲染重复。

### select_item

- 调用文件：`components/products/selection/ProductSelectionCard.tsx`
- 触发位置：真实详情 `<a>` 的唯一 `onClick`，不是卡片外层、图片、标题和按钮多处绑定。
- 单次点击身份由 `item_list_id + product_id + index` 表达。
- 不设置跨点击的永久去重 key，因为用户之后再次主动点击应形成新的选择事件；单次 DOM 点击只有一个处理器，因此本次捕获为 1 次。

### view_item

- 调用文件：`components/products/detail/ProductDetailClient.tsx`
- 触发位置：详情组件提交后的 `useEffect`，不依赖 Tab、滚动或其他交互。
- 去重 key：`pathname + 稳定 product_id`。
- 相同详情的 Strict Mode effect 或重渲染被 ref 阻止；路由或稳定产品 ID 改变后允许新产品再次发送。

## 8. Consent denied 与队列

- `trackProductListView`、`trackProductSelect` 和 `trackProductView` 最终分别调用统一 `trackEvent` 发送 `view_item_list`、`select_item` 和 `view_item`。
- `trackEvent` 不以 Consent granted/denied 作为业务事件开关；它只判断 `window.__foreachGaReady`。
- GA 尚未准备好时，事件进入页面级 `window.__foreachPendingAnalyticsEvents`；不同 App Router chunk 共享同一队列。
- `GoogleAnalytics` 依次完成 consent update、`config(send_page_view: false)`，设置 `__foreachGaReady=true`，再冲刷队列。因此 Consent denied 下事件仍以现有 Consent Mode 方式进入 `gtag`。
- 本次运行实际观察到详情 `view_item` 从 `queued` 到一次 `sent`，证明 ready 前排队和 ready 后冲刷均生效。
- 本次没有修改已经验收的 Consent Mode 或 `page_view` 正式逻辑。

## 9. 发现的问题、原因和修复文件

1. **初始 `view_item_list` 重复**：默认页容量 12 与真实响应式页容量 9 连续生成两个列表状态。修复于 `components/products/selection/ProductSelectionClient.tsx`，增加短暂稳定窗口并保留最终签名去重。
2. **详情 `item_id` 不稳定**：专用柱塞泵详情适配数据可能把展示名称放入通用 fallback 字段，详情客户端无法保证拿到选型数据的稳定 ID。修复于 `app/products/pumps/plunger-pumps/[slug]/page.tsx` 和 `components/products/detail/ProductDetailClient.tsx`，从真实路由 slug 映射到 `selectionProducts.productId` 并优先作为分析 ID。
3. **ready 前事件可能丢失**：产品组件和 GA 初始化组件可位于不同 App Router chunk，模块局部队列不能保证是同一实例。统一队列已位于 `lib/analytics/track-event.ts` 的页面级 window 对象上；实际运行验证 queued 事件被正确冲刷。
4. **浏览器观察上下文**：真实详情链接为 `_blank`，`select_item` 在列表/打开者标签发送，`view_item` 和详情 `page_view` 在新标签发送。只检查详情标签的 Network 会看不到打开者标签中的 `select_item`；本次自动化同时读取两个真实页面上下文。

与本链路有关的正式代码文件：

- `lib/analytics/track-event.ts`
- `components/products/selection/ProductSelectionClient.tsx`
- `components/products/selection/ProductCardGrid.tsx`
- `components/products/selection/ProductSelectionCard.tsx`
- `app/products/pumps/plunger-pumps/[slug]/page.tsx`
- `components/products/detail/ProductDetailClient.tsx`

本报告：`docs/analytics/ga4-product-chain-verification.md`

## 10. 验证命令结果

### TypeScript

- 命令：`npx tsc --noEmit`
- 结果：通过（exit code 0）。

### Cloudflare 构建

- 命令：`npm run build:cloudflare`
- 脚本内 TypeScript 阶段：通过。
- 完整结果：未完成（exit code 1）。
- 原因：构建脚本准备临时隔离 `app/api` 时，Windows 返回 `EPERM`：无法把 `app/api` 重命名到 `node_modules/.cache/foreach-cloudflare-build/app-api`。
- 核验时已有用户 Next dev 进程正在使用本项目（`next dev` 主进程 PID 47712，服务进程 PID 40756，开始时间早于本次测试）。按限制没有结束这些进程。
- 失败后检查：`app/api` 仍存在于原位置，临时目标 `app-api` 不存在，没有发生半完成移动。
- 该失败发生在正式 Cloudflare/Next 构建开始之前，不是 TypeScript 或本次 GA4 代码报错。需要在用户自行停止该 dev server 后重新运行完整构建。

## 11. 清理与 Git 状态声明

- 临时调试代码：已全部删除。
- 临时调试文件：无。
- 新 npm 依赖：无。
- 页面视觉、产品数据、链接行为：未因本次修复改变。
- 现有 Consent Mode 和 `page_view` 正式逻辑：未修改。
- Git：没有提交 Git，没有推送 GitHub，也没有执行 reset、restore、checkout、stash、clean 或切换分支。
