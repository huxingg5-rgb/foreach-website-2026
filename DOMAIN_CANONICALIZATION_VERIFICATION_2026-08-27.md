# FOREACH 域名 Canonicalization 最终验收报告

检查日期：2026-08-27 09:54:26 +08:00  
SEO主域：`https://www.foreachtek.com`  
Cloudflare规则：Active；匹配 `(http.host eq "foreachtek.com")`；目标 `concat("https://www.foreachtek.com", http.request.uri.path)`；`308 Permanent Redirect`；Preserve query string 开启。

## 1. 最终结论

**FINAL RESULT: FAIL**

域名 canonicalization 本身验收通过：13 个裸域 HTTPS 样本首跳全部为 308，Location 全部指向 `www.foreachtek.com`，pathname 和 query string 均保留；www 正式页面、搜索引擎爬虫、POST、Canonical、Hreflang、Robots、Sitemap 和 JSON-LD 均通过。

唯一失败项：英文首页 `https://www.foreachtek.com/en/` 的实际 HTML 中未输出 `<meta property="og:url">`。默认 curl、Chrome User-Agent 和 Googlebot User-Agent 复核结果均为 0 条。产品页和文章页的 `og:url` 正常。根据本次“一项不满足即 FAIL”的判定标准，最终结果必须为 FAIL。

## 2. 裸域 Redirect

首页  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

/en/  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/en/`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

Sitemap  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/sitemap.xml`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

Robots  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/robots.txt`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

产品分类  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

DPL60产品页  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

技术文章  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/en/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/`  
Location hostname：`www.foreachtek.com`；pathname 保持：是；query 保持：是

单 Query  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/contact?type=datasheet`  
Query是否保留：是，`?type=datasheet` 完整保留  
Location hostname：`www.foreachtek.com`；pathname 保持：是

多 Query  
状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/contact?type=datasheet&source=redirect-test`  
Query是否保留：是，`?type=datasheet&source=redirect-test` 完整保留  
Location hostname：`www.foreachtek.com`；pathname 保持：是

## 3. 多语言

es：裸域 `/es/` 为 `308`，Location `https://www.foreachtek.com/es/`；www `/es/` 为 `200 OK`。  
fr：裸域 `/fr/` 为 `308`，Location `https://www.foreachtek.com/fr/`；www `/fr/` 为 `200 OK`。  
ko：裸域 `/ko/` 为 `308`，Location `https://www.foreachtek.com/ko/`；www `/ko/` 为 `200 OK`。  
ru：裸域 `/ru/` 为 `308`，Location `https://www.foreachtek.com/ru/`；www `/ru/` 为 `200 OK`。

## 4. www 正式站

/en/：`200 OK`  
Sitemap：`200 OK`  
Robots：`200 OK`  
产品分类：`200 OK`  
产品页：`200 OK`  
文章页：`200 OK`  
es：`200 OK`  
fr：`200 OK`  
ko：`200 OK`  
ru：`200 OK`

补充：www 根首页为既有语言入口逻辑，实际链路是 `https://www.foreachtek.com/` → `307 Temporary Redirect` → `https://www.foreachtek.com/en/`，属于预期行为。

## 5. Redirect Chain

裸域首页完整链：  
`https://foreachtek.com/` → `308` → `https://www.foreachtek.com/` → `307` → `https://www.foreachtek.com/en/` → `200`。无循环，重定向次数 2。

裸域 /en/ 完整链：  
`https://foreachtek.com/en/` → `308` → `https://www.foreachtek.com/en/` → `200`。无循环，重定向次数 1。

裸域产品页完整链：  
`https://foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/` → `308` → `https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/` → `200`。无循环，重定向次数 1。

单 Query 完整链：  
`https://foreachtek.com/contact?type=datasheet` → `308` → `https://www.foreachtek.com/contact?type=datasheet` → `308` → `https://www.foreachtek.com/contact/?type=datasheet` → `200`。第二个 308 是 www 应用既有的尾斜杠规范化；query 全程保留，不属于 hostname 统一异常。

最终URL：  
- `/en/`：`https://www.foreachtek.com/en/`；HTTP `200`；重定向次数 `1`
- DPL60产品页：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`；HTTP `200`；重定向次数 `1`
- 单 Query：`https://www.foreachtek.com/contact/?type=datasheet`；HTTP `200`；重定向次数 `2`

HTTP 非 HTTPS 补充：  
- `http://foreachtek.com/` → `308` → `https://www.foreachtek.com/` → `307` → `https://www.foreachtek.com/en/` → `200`
- `http://www.foreachtek.com/` → `301` → `https://www.foreachtek.com/` → `307` → `https://www.foreachtek.com/en/` → `200`

两个 HTTP 入口最终均到达 www HTTPS，未停留在 HTTPS 裸域，也未形成循环。

## 6. 搜索引擎爬虫

Googlebot：裸域 `/en/` 为 `308`，Location `https://www.foreachtek.com/en/`；www `/en/` 为 `200 OK`。Googlebot 无法再从裸域 `/en/` 获得 200。  
Baiduspider：裸域 `/en/` 为 `308`，Location `https://www.foreachtek.com/en/`。  
Bingbot：裸域 `/en/` 为 `308`，Location `https://www.foreachtek.com/en/`。  
Bytespider：裸域 `/en/` 为 `308`，Location `https://www.foreachtek.com/en/`。

## 7. POST

状态：`308 Permanent Redirect`  
Location：`https://www.foreachtek.com/en/`

仅检查第一跳，未使用跟随重定向参数，POST 请求没有被发送到 www 正式站。

## 8. Canonical

英文首页：`https://www.foreachtek.com/en/`  
产品页：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
文章页：`https://www.foreachtek.com/en/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/`

非www Canonical数量：`0`

三个页面各提取到 1 条 canonical，hostname 均为 `www.foreachtek.com`。

## 9. Hreflang

zh-CN：`https://www.foreachtek.com/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
en：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
es：`https://www.foreachtek.com/es/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
fr：`https://www.foreachtek.com/fr/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
ko：`https://www.foreachtek.com/ko/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
ru：`https://www.foreachtek.com/ru/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`

非www Hreflang数量：`0`

实际共提取 6 条 hreflang，全部使用 `www.foreachtek.com`；中文无语言前缀符合当前 URL 约定。

## 10. Robots

实际 Sitemap 声明：`Sitemap: https://www.foreachtek.com/sitemap.xml`

www robots 为 `200 OK`；裸域 robots 为 `308`，Location `https://www.foreachtek.com/robots.txt`。

## 11. Sitemap

总 URL：`5416`  
www URL：`5416`  
非www URL：`0`  
其他hostname：`0`  
重复 URL：`0`

线上 `sitemap.xml` 为单个 `urlset`，不是 sitemap index，子 sitemap 数量为 0。所有 `<loc>` 均按实际 URI hostname 解析；无无效绝对 URL。

## 12. OpenGraph

首页 og:url：**缺失（0 条，FAIL）**  
产品页 og:url：`https://www.foreachtek.com/en/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump/`  
文章页 og:url：`https://www.foreachtek.com/en/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/`

产品页和文章页均为 www；英文首页实际 HTML 未输出 `og:url`。这是本次验收唯一失败项。

## 13. JSON-LD

产品页：1 个 JSON-LD script，解析错误 0  
www URL：`22`  
非www URL：`0`

文章页：1 个 JSON-LD script，解析错误 0  
www URL：`24`  
非www URL：`0`

统计口径为 JSON-LD 中绝对 URL 的实际出现次数。产品页另有 1 个外部 `schema.org` URL，文章页另有 1 个外部 `schema.org` URL；均不属于 FOREACH 官网 URL。官网 URL 未发现裸域或其他 foreachtek 子域。

## 14. 风险检查

Redirect loop：否；所有跟随重定向检查均在允许次数内完成，未出现最大重定向错误。  
www → 裸域：否；www `/en/`、Sitemap、Robots、产品页以及其他抽查页面均未返回指向裸域的 Location。  
Path丢失：否；13 个裸域 HTTPS 首跳均保留原 pathname。  
Query丢失：否；单参数和多参数首跳及完整链路均保留全部 query 参数。

## 15. 最终SEO状态

主域：`https://www.foreachtek.com`  
裸域：PASS，抽查 URL 全部 `308 → www`  
Canonical：PASS，3/3 为 www  
Sitemap：PASS，5416/5416 为 www  
Hreflang：PASS，6/6 为 www  
Robots：PASS，Sitemap 声明为 www  
OpenGraph：**FAIL，英文首页缺少 og:url**  
JSON-LD：PASS，产品页和文章页官网 URL 全部为 www

因此域名统一和 canonicalization 修复本身已生效，但本次完整验收依据严格条件判定为 `FINAL RESULT: FAIL`。本报告不执行自动修复。

## 16. 本轮修改声明

本轮仅检查，没有修改生产代码或线上配置。未修改 Cloudflare Redirect Rule、Sitemap、Canonical、Hreflang、Robots、JSON-LD、OpenGraph、Title、Meta Description 或页面正文；未 commit，未 deploy。唯一写入内容为本验收 Markdown 报告。
