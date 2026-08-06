# 结构化数据综合处理报告

- 项目：`F:\WebsiteProjects\foreach-website-2026`
- 处理日期：2026-08-06
- 最终分支：`feat/dpl30-article-multilingual`
- 最终状态：修改保留在本地工作区，未执行 `git add`、`git commit`、`git push`。

本报告只记录实际 Git 操作、源码检查、构建结果和 `out/` 静态 HTML 扫描结果，不把未经验证的状态描述为“全部正确”。

## 1. Git 状态与分支安全转移

开始前执行的检查为：

```text
git branch --show-current
git status --short
git log --oneline --decorate --graph -10 --all
```

开始前结果：

- 当前分支：`backup/2026-08-06-before-product-schema-fix`
- 工作区：`M components/products/detail/ProductDetailClient.tsx`
- 未跟踪目录：`docs/reports/`（包含原产品修复报告）
- 备份分支提交：`23375c4 backup: save state before product schema fix`
- 工作分支原提交：`cf7504e feat: add multilingual DPL30 article and website updates`

按要求执行了以下安全流程：

1. `git stash push -u -m "wip-structured-data-fix-2026-08-06"`，同时保存已跟踪和未跟踪修改。
2. `git switch feat/dpl30-article-multilingual`。
3. 检查提交关系，确认备份分支是工作分支的后继提交。
4. `git merge --ff-only backup/2026-08-06-before-product-schema-fix` 成功，没有创建普通 merge commit。
5. `git stash pop` 成功恢复本地修改，没有冲突。

最终确认：

- 当前分支是 `feat/dpl30-article-multilingual`。
- 备份分支仍指向 `23375c4`，没有把本次新修改提交到备份分支。
- 没有修改远程仓库，也没有执行被禁止的 `git add`、`git commit`、`git push`、`git reset`、`git restore` 或 `git clean`。

## 2. 原有产品结构化数据问题与保留结果

原公共产品详情组件曾为页面生成 `Product` JSON-LD，但工业品页面没有真实公开报价、库存、评论或评分，因而不能安全补写 `offers`、`price`、`availability`、`review` 或 `aggregateRating` 来满足校验。该问题来自公共模板，而不是单个产品数据。

现有产品修复被完整保留，修改文件为：

- `components/products/detail/ProductDetailClient.tsx`

修复后的产品详情图谱只保留：

```text
Organization
WebSite
BreadcrumbList
WebPage
FAQPage（仅页面存在真实 FAQ 时）
```

产品详情页不再输出 `Product`、`ProductGroup`、`ProductModel`、`Offer`、`AggregateOffer`、`price`、`availability`、`review`、`aggregateRating`、`ratingValue` 或 `reviewCount`。本次文章 JSON-LD 没有让产品页重新出现 `Product`。

具体代码变化：

- 删除 Product、Brand、PropertyValue、产品图片数组、SKU、分类和关键词的 JSON-LD 生成逻辑。
- 删除只服务于 Product JSON-LD 的图片和规格收集函数。
- 将公共生成函数调整为 `buildProductPageStructuredData`，只生成页面、站点、组织、面包屑和真实 FAQ。
- 为 `zh-CN`、`en`、`es`、`fr`、`ko`、`ru` 使用当前语言的面包屑名称和路径。
- FAQ 只来自页面真实 `faqs` 数据。

## 3. 技术文章模板、路由与数据来源

技术文章详情页有两套路由，但共用同一个详情组件：

- 中文：`app/resources/technical-articles/[slug]/page.tsx`
- 英文、西班牙语、法语、韩语、俄语：`app/[locale]/resources/technical-articles/[slug]/page.tsx`
- 公共详情模板：`components/resources/technical-articles/TechnicalArticleDetail.tsx`

详情页把展示交给既有 `NewsArticleClient`，文章正文仍由既有的 DPL30/CvKv 专用正文组件或数据块渲染。列表页使用 `TechnicalArticlesClient`，不经过 `TechnicalArticleDetail`；公司新闻详情页直接使用新闻路由和 `NewsArticleClient`，本次没有向新闻页注入 Article。

数据调用链为：

```text
getTechnicalArticleData
  -> getTechnicalArticlesPageData
     -> technical-articles.zh.ts
     -> technical-articles.intl.ts
     -> technical-articles.translations.ts
     -> dpl30-liquid-diaphragm-pump.article.ts 及 zh/en/es/fr/ko/ru 文案
```

字段来源对应关系：

| Article 字段 | 实际来源 |
| --- | --- |
| `headline` | `article.title`，同时是页面真实 H1 |
| `description` | 优先 `article.seoDescription`，否则 `article.summary` |
| `image` | `article.coverImage`，相对地址转换为 `https://www.foreachtek.com` 绝对地址 |
| `datePublished` | `article.date` |
| `dateModified` | 没有真实修改日期字段，因此省略 |
| `author` | 页面没有个人作者，复用项目既有 Organization 稳定 ID |
| `publisher` | 项目既有 Organization：`https://www.foreachtek.com/#organization` |
| `inLanguage` | 当前路由语言：`zh-CN` / `en` / `es` / `fr` / `ko` / `ru` |
| `articleSection` | `pageData.categories` 中与 `article.category` 对应的当前语言标签 |
| `keywords` | 数据模型没有 `tags`、`keywords` 或真实关键词字段，因此省略 |
| `isAccessibleForFree` | 文章无需登录、付费或订阅即可访问，输出 `true` |

## 4. Article JSON-LD 新增位置与结构

新增位置：`components/resources/technical-articles/TechnicalArticleDetail.tsx` 的详情组件根节点。仅详情页渲染该脚本，因此不会给列表页、产品页、安装教程、规格书、关于我们、联系我们、首页或公司新闻页错误添加 Article。

每个详情页生成一个 JSON-LD 脚本，使用 `JSON.stringify`，并将 `<` 转义为 `\\u003c`，避免标题或数据中的特殊字符破坏脚本标签。主要结构为：

```text
Organization (@id https://www.foreachtek.com/#organization)
WebSite (@id https://www.foreachtek.com/#website)
BreadcrumbList（当前语言真实路径）
WebPage (@id 文章 canonical)
Article (@id 文章 canonical#article)
```

Article 使用 `@type: "Article"`，没有仅使用 `TechArticle`。`mainEntityOfPage` 指向当前文章 WebPage；`publisher`、`author` 均引用既有 Organization；`url` 和 `mainEntityOfPage.@id` 使用当前语言正式 HTTPS 路径。没有新增随机 ID、虚构标题、宣传文案、日期、作者姓名或关键词。

`dateModified` 和 `keywords` 在 84 个详情页中均省略，因为源数据没有可验证的对应字段；`additionalType` 也没有添加，保持图谱简单可维护。84 个页面均有真实封面图，且构建后对应文件存在于 `public/` 并被转换成 HTTPS 绝对地址。

## 5. 实际 `out/` 扫描结果

扫描目录：`F:\WebsiteProjects\foreach-website-2026\out`。扫描对象是构建后实际 HTML 和其中的 `application/ld+json` 脚本，不是只检查 TypeScript 源码。

### 产品页面复核

- HTML 文件总数：**5,324**
- JSON-LD 脚本总数：**4,412**
- 包含 Product JSON-LD 的 HTML 文件：**0**
- Product JSON-LD 对象残留：**0**
- 产品 JSON-LD 中包含 `offers`、`aggregateRating`、`review`、`price`、`availability` 等禁止字段的文件：**0**

### 技术文章 Article 扫描

- 技术文章详情页总数：**84**
- 包含 Article 的详情页：**84**
- 缺少 Article 的详情页：**0**
- 详情页 JSON-LD 解析失败页：**0**
- 全站 JSON-LD 解析失败脚本：**0**
- 技术文章列表页 Article 数量：**0**（列表页 6 个）
- 非技术文章页面误出现 Article 的数量：**0**
- 详情页出现 Product 的数量：**0**

逐页字段校验结果：84/84 页面均满足以下检查：Article 类型、H1/headline、canonical URL、`@id`、`mainEntityOfPage`、语言、description、HTTPS image、真实日期、Organization author/publisher、BreadcrumbList 和免费访问标记。84/84 封面图在 `public/` 中实际存在。`dateModified` 为 0/84，`keywords` 为 0/84，均为按真实数据省略而非解析失败。

六种语言的详情页数量：

| 语言 | 详情页 | Article 覆盖 | Article 缺失 | `inLanguage` 校验 |
| --- | ---: | ---: | ---: | --- |
| `zh-CN` | 14 | 14 | 0 | 14/14 |
| `en` | 14 | 14 | 0 | 14/14 |
| `es` | 14 | 14 | 0 | 14/14 |
| `fr` | 14 | 14 | 0 | 14/14 |
| `ko` | 14 | 14 | 0 | 14/14 |
| `ru` | 14 | 14 | 0 | 14/14 |

重点中文文章的实际六种语言路径均存在并已检查：`/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/` 以及对应的 `/en/`、`/es/`、`/fr/`、`/ko/`、`/ru/` 路径。另抽查了 Cv/Kv 文章、DPL30 产品详情、技术文章列表和 ADLM 新闻详情：文章详情有 Article，产品页和列表页没有 Article，新闻页没有因本次修改被标记为 Article，所有 JSON-LD 均可解析。

## 6. canonical、hreflang、正文与视觉影响

- 未修改 canonical 生成规则、hreflang 生成规则、URL、slug、sitemap 规则或 metadata 路由逻辑。
- Article 的 canonical URL 按 `next.config.ts` 的 `trailingSlash: true` 和实际 `out/` 路由生成；84/84 页的 `url` 与实际导出路由一致。
- 技术文章详情的既有 `generateMetadata` 当前只提供标题和 description，没有单独声明 `alternates.canonical`；本次没有扩大范围补写，建议部署后另行评估这项既有 SEO 配置。
- 未修改技术文章正文、H1、产品正文、参数、图片源、布局、CSS 或交互逻辑；本次只在详情组件中新增不可见 JSON-LD `<script>`。
- 公司新闻保持现状，因其没有复用本次新增脚本的 `TechnicalArticleDetail` 包装层。

## 7. 代码检查与构建

### `npm run lint`

- 全项目结果：**失败（退出码 1）**。
- 实际汇总：**4,053 problems = 2,335 errors + 1,718 warnings**。
- 主要来自 `_backup/` 历史备份目录及现有源码中的 `no-explicit-any`、`set-state-in-effect`、未使用变量和 `<img>` 规则。
- 本次新增的 `TechnicalArticleDetail.tsx` 单文件 lint：0 个问题；与 Git HEAD 版本对比同样为 0 个问题。
- `ProductDetailClient.tsx` 当前为 42 errors / 4 warnings；Git HEAD 版本为 44 errors / 4 warnings。本次没有新增该文件 lint 问题，删除 Product 辅助逻辑后减少了 2 个既有错误。
- 按要求没有为通过全项目 lint 而修改无关历史文件。

### `npm run build`

- **通过，退出码 0**。
- Next.js 16.2.6/Turbopack 编译通过。
- TypeScript 检查通过。
- 静态页面生成 **5,323 / 5,323**，页面优化完成。

### `npm run build:cloudflare`

- **通过，退出码 0**。
- TypeScript 检查通过。
- `app/api` 构建前临时隔离，构建结束后已恢复。
- Cloudflare 静态导出成功，输出目录为 `F:\WebsiteProjects\foreach-website-2026\out`。
- sitemap 生成成功：**5,315** 个 URL；中文 885、英文 886、西班牙文 886、法文 886、韩文 886、俄文 886；自动排除 9 条。
- `out/sitemap.xml` 实际 URL 节点数为 5,315；`app/api` 当前已恢复。
- 构建没有报告静态导出失败或新增路由错误；`out/404.html` 和 `_not-found/index.html` 为标准构建产物，未观察到本次修改导致的新增 404；没有生成 `500.html`。

## 8. 报告文件处理与本次修改文件

最终新增综合报告：

- `docs/reports/2026-08-06-structured-data-fix-report.md`

原文件 `docs/reports/2026-08-06-product-schema-fix-report.md` 经 `git ls-files` 确认为未跟踪文件。其产品修复结论已合并到本综合报告，随后删除原未跟踪文件，避免留下两份相互独立的报告。

本次工作区最终涉及的文件：

1. `components/products/detail/ProductDetailClient.tsx`：恢复并保留原有产品结构化数据修复。
2. `components/resources/technical-articles/TechnicalArticleDetail.tsx`：新增多语言 Article JSON-LD 公共生成和安全输出。
3. `docs/reports/2026-08-06-structured-data-fix-report.md`：新增本综合报告。

没有修改技术文章正文、产品数据、新闻内容、URL/slug、canonical/hreflang 规则、sitemap、robots、百度验证、GA4 或远程仓库。

## 9. 与本次任务无关但发现的问题

1. 全项目 lint 仍有 4,053 个历史问题，主要集中在 `_backup/` 和既有源码；不影响本次两个改动文件的定向 lint 和构建。
2. 技术文章详情 metadata 原本没有 `alternates.canonical`，本次遵守范围限制未修改；上线后应单独评估 canonical/hreflang 策略。
3. 多语言源文件中存在历史编码显示异常字符；本次未修改文章正文或翻译数据，避免扩大任务范围。

## 10. 部署后 Google 验证步骤

1. 人工审阅工作区 diff，确认产品页没有虚构价格、报价、库存、评价或评分。
2. 部署后清理 Cloudflare/CDN 缓存，打开六种语言的 DPL30 URL，查看页面源代码确认 Article JSON-LD 已上线。
3. 用 [Google Rich Results Test](https://search.google.com/test/rich-results) 检查 DPL30 和 Cv/Kv 文章各一个语言版本。
4. 用 [Schema Markup Validator](https://validator.schema.org/) 检查 Organization、WebSite、WebPage、BreadcrumbList 和 Article 的稳定 `@id` 关系。
5. 在 Google Search Console 对文章 URL 使用“网址检查”并请求重新编入索引；在增强功能报告中观察 Article/Breadcrumb 状态。
6. 确认 `https://www.foreachtek.com/sitemap.xml` 可访问且包含本次文章详情 URL。
7. 产品页问题应在重新抓取后通过产品增强功能中的“验证修复”复核；Google 状态更新可能有延迟。

## 11. 最终建议

代码与静态产物已经完成验证，但当前工作区仍有未提交修改，且全项目 lint 的历史问题尚未清理。建议先进行人工 diff/页面源代码检查，再由维护者执行提交和部署；本次代理没有执行提交、推送或远程部署。

