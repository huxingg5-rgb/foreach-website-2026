# 快插接头详情页复用检查报告

生成时间：2026-07-11T23:45:17.009Z

## 一、当前项目状态

- 当前分支：dev-selection-cart-product-type-fix-20260710
- 未提交文件数：174

## 二、硬管接头详情数据

### `data/products/generated/fittings/hard-tube-fittings/detail/index.json`

- 数据数量：147
- 顶层字段：sourceType、category、categoryId、categoryLabel、productTypeId、productTypeName、productId、productCode、seriesId、seriesName、slug、model、modelDisplay、displayModel、foreachModel、name、title、description、advantages、commonApplications、mainImage、image、heroImage、imageCard、additionalImages、imageAlt、detailMode、hideModelAction、showConfigurator、showDatasheetRequest、showDrawingRequest、show3DRequest、drawing2dUrl、drawingPdfUrl、resources、specSeriesKey、specs、specifications、faqs、detailHref、href、selectionHref、seo、sectionTitleMap

#### 第一条数据摘要

- slug：hf-m6-20-pk-n
- model：HF-M6-20-PK-N
- title：HF-M6-20-PK-N
- name：标滚平底接头
- productCode：809717
- description：HF-M6-20-PK-N是一款适用于外径1.6–2.0 mm硬管的标滚平底接头，采用M6×1螺纹、PEEK主体和法兰垫片底面密封结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。
- image：/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg
- detailHref：/products/fittings/hard-tube-fittings/hf-m6-20-pk-n

## 三、硬管接头详情路由

### `app/products/fittings/barbed-fittings/[slug]/page.tsx`

- L13：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L19：`slug: string;`
- L33：`slug: string;`
- L41：`ProductDetailClient as unknown as ComponentType<{`
- L57：`slug: string`
- L60：`normalizeSegment(slug);`
- L65：`item.slug`
- L70：`export function generateStaticParams() {`
- L73：`slug:`
- L74：`detail.slug,`
- L83：`slug,`
- L87：`findDetail(slug);`
- L108：`slug,`
- L112：`findDetail(slug);`

### `app/products/probes/[slug]/page.tsx`

- L5：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L9：`slug: string;`
- L40：`const ProductDetailView = ProductDetailClient as unknown as ComponentType<{`
- L46：`export function generateStaticParams() {`
- L48：`{ slug: "sampling-probes" },`
- L49：`{ slug: "piercing-probes" },`
- L50：`{ slug: "wash-probes" },`
- L51：`{ slug: "stirring-paddles" },`
- L57：`slug: string;`
- L61：`function getDetailBySlug(slug: string) {`
- L62：`return details.find((item) => item.slug === slug);`
- L110：`productTypeSlug: detail.slug,`
- L115：`slug: detail.slug,`
- L209：`detailHref: "/products/probes/" + detail.slug,`
- L216：`const { slug } = await params;`
- L217：`const detail = getDetailBySlug(slug);`
- L232：`const { slug } = await params;`
- L233：`const detail = getDetailBySlug(slug);`

### `app/products/pumps/diaphragm-pumps/[slug]/page.tsx`

- L3：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L10：`slug: string;`
- L63：`slug: string;`
- L87：`const ProductDetailView = ProductDetailClient as unknown as ComponentType<{`
- L100：`function findDetail(slug: string) {`
- L101：`const targetSlug = normalizeSlug(slug);`
- L104：`return normalizeSlug(item.slug) === targetSlug;`
- L189：`* ProductDetailClient 外层已经显示“规格参数”。`
- L354：`detail.slug,`
- L371：`const slugText = getText(detail.slug).toUpperCase();`
- L372：`const slugMatch = slugText.match(/\b(DPL\d+H?\|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);`
- L374：`if (slugMatch) {`
- L376：`slugMatch[1],`
- L377：`slugMatch[2],`
- L378：`slugMatch[3] + "/" + slugMatch[4],`
- L393：`detail.slug,`
- L445：`function adaptToProductDetailClientData(detail: DiaphragmDetail) {`
- L446：`const slug = normalizeSlug(detail.slug);`
- L483：`id: slug,`
- L484：`productId: slug,`
- L485：`slug,`
- L486：`detailSlug: slug,`
- L590：`{ label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },`
- L600：`function getPreferredProductDetailData(slug: string) {`
- L601：`const detail = findDetail(slug);`
- L607：`return adaptToProductDetailClientData(detail);`
- L610：`export function generateStaticParams() {`
- L612：`.map((item) => normalizeSlug(item.slug))`
- L614：`.map((slug) => ({ slug }));`
- L619：`const data = getPreferredProductDetailData(resolvedParams.slug);`

### `app/products/pumps/pipetting-pumps/[slug]/page.tsx`

- L4：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L11：`slug: string;`
- L32：`slug: string;`
- L43：`seriesSlug?: string;`
- L82：`const ProductDetailView = ProductDetailClient as unknown as ComponentType<{`
- L95：`function findDetail(slug: string) {`
- L96：`const targetSlug = normalizeSlug(slug);`
- L99：`return normalizeSlug(item.slug) === targetSlug;`
- L145：`slug: detail.slug,`
- L146：`productId: detail.productId \|\| `pipetting-${detail.slug}`,`
- L165：`specSeriesKey: detail.specSeriesKey \|\| detail.slug,`
- L175：`detailHref: detail.detailHref \|\| `/products/pumps/pipetting-pumps/${detail.slug}`,`
- L176：`href: detail.detailHref \|\| `/products/pumps/pipetting-pumps/${detail.slug}`,`
- L194：`export function generateStaticParams() {`
- L196：`slug: normalizeSlug(item.slug),`
- L201：`const { slug } = await params;`
- L202：`const detail = findDetail(slug);`
- L215：`const { slug } = await params;`
- L216：`const detail = findDetail(slug);`

### `app/products/pumps/plunger-pumps/[slug]/page.tsx`

- L6：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L23：`slug: string;`
- L32：`const ProductDetailView = ProductDetailClient as unknown as ComponentType<{`
- L73：`value.slug \|\|`
- L98：`function getDetailList(): DetailRecord[] {`
- L108：`const slug = getRecordSlug(item);`
- L110：`if (slug && !map.has(slug)) {`
- L111：`map.set(slug, item);`
- L120：`normalizeSlug(item.slug) \|\|`
- L127：`function resolveLegacySlug(slug: string) {`
- L128：`const cleanSlug = normalizeSlug(slug);`
- L132：`function getDetailBySlug(slug: string) {`
- L133：`const targetSlug = resolveLegacySlug(slug);`
- L135：`return getDetailList().find((item) => {`
- L138：`normalizeSlug(item.slug),`
- L224：`detail.slug,`
- L412：`function adaptToProductDetailClientData(detail: DetailRecord) {`
- L414：`const slug = getRecordSlug(detail);`
- L455：`id: getText(detail.productId) \|\| slug,`
- L456：`productId: getText(detail.productId) \|\| slug,`
- L457：`slug,`
- L458：`detailSlug: slug,`
- L556：`{ label: model, href: "/products/pumps/plunger-pumps/" + slug },`
- L565：`function getPreferredProductDetailData(slug: string) {`
- L566：`const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");`
- L572：`const legacyDetail = getDetailBySlug(slug);`
- L578：`return adaptToProductDetailClientData(legacyDetail);`
- L581：`export function generateStaticParams() {`
- L582：`const detailParams = getDetailList()`
- L585：`.map((slug) => ({ slug }));`

### `app/products/pumps/syringe-pumps/[slug]/page.tsx`

- L2：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L41：`detailHref: `/products/pumps/syringe-pumps/${detail.slug}`,`
- L84：`export function generateStaticParams() {`
- L86：`slug: detail.slug,`
- L93：`params: Promise<{ slug: string }>;`
- L95：`const { slug } = await params;`
- L96：`const detail = (syringePumpDetails as Detail[]).find((item) => item.slug === slug);`
- L102：`return <ProductDetailClient data={toClientData(detail) as any} />;`

### `app/products/pumps/valveless-pumps/[slug]/page.tsx`

- L4：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L11：`slug: string;`
- L17：`export function generateStaticParams() {`
- L19：`slug: detail.slug,`
- L23：`function getDetailBySlug(slug: string): ValvelessPumpDetail \| null {`
- L24：`return details.find((detail) => detail.slug === slug) \|\| null;`
- L30：`const { slug } = await params;`
- L31：`const detail = getDetailBySlug(slug);`
- L59：`slug: detail.slug,`
- L60：`productId: detail.productId \|\| `valveless-${detail.slug}`,`
- L103：`detail.detailHref \|\| `/products/pumps/valveless-pumps/${detail.slug}`,`
- L104：`href: detail.href \|\| `/products/pumps/valveless-pumps/${detail.slug}`,`
- L153：`const { slug } = await params;`
- L154：`const detail = getDetailBySlug(slug);`
- L160：`return <ProductDetailClient data={toClientData(detail) as any} />;`

### `app/products/tubing/_components/TubingDetailStaticPage.tsx`

- L5：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L16：`slug: string;`
- L45：`const ProductDetailView = ProductDetailClient as unknown as ComponentType<{`
- L49：`function findDetail(slug: string) {`
- L50：`return records.find((item) => item.slug === slug);`
- L136：`export function getTubingMetadata(slug: string): Metadata {`
- L137：`const detail = findDetail(slug);`
- L151：`export default function TubingDetailStaticPage({ slug }: { slug: string }) {`
- L152：`const detail = findDetail(slug);`

### `app/products/valves/[slug]/page.tsx`

- L5：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L9：`slug: string;`
- L43：`ProductDetailClient 是官网已有公共详情页组件。`
- L46：`const ProductDetailView = ProductDetailClient as unknown as ComponentType<{`
- L52：`export function generateStaticParams() {`
- L54：`{ slug: "rotary-valves" },`
- L55：`{ slug: "high-pressure-valves" },`
- L56：`{ slug: "solenoid-valves" },`
- L62：`slug: string;`
- L66：`function getDetailBySlug(slug: string) {`
- L67：`return details.find((item) => item.slug === slug);`
- L71：`将阀系列数据转换为 ProductDetailClient 可以识别的数据。`
- L115：`productTypeSlug: detail.slug,`
- L120：`slug: detail.slug,`
- L183：`避免 ProductDetailClient 读取 forEach / map 时报错。`
- L199：`detailHref: "/products/valves/" + detail.slug,`
- L263：`const { slug } = await params;`
- L264：`const detail = getDetailBySlug(slug);`
- L279：`const { slug } = await params;`
- L280：`const detail = getDetailBySlug(slug);`

### `app/products/[category]/[slug]/page.tsx`

- L6：`app/products/[category]/[slug]/page.tsx`
- L9：`1. /products/{category}/{slug}`
- L10：`2. 如果 slug 命中 product-route-map.ts，则显示产品类型筛选页`
- L17：`/products/pumps/plunger-pumps/[slug]`
- L25：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L49：`slug: string;`
- L58：`{ category: "tubing", slug: "pvc-tubing" },`
- L59：`{ category: "tubing", slug: "tpu-tubing" },`
- L60：`{ category: "tubing", slug: "fep-tubing" },`
- L61：`{ category: "tubing", slug: "ptfe-tubing" },`
- L62：`{ category: "tubing", slug: "peek-tubing" },`
- L63：`{ category: "tubing", slug: "pfa-tubing" },`
- L71：`2. dynamicParams = false 时，所有动态路径必须在 generateStaticParams 中列出；`
- L75：`return getControlModuleDetailSlugs().map((slug) => ({`
- L77：`slug,`
- L86：`2. ProductDetailClient 使用的是统一详情页展示结构；`
- L87：`3. 这里把智控数据转成 ProductDetailClient 可以直接渲染的字段；`
- L98：`CONTROL_MODULE_DETAIL_IMAGE_MAP[detail.slug] \|\|`
- L113：`slug: detail.slug,`
- L143：`detailHref: `/products/control/${detail.slug}`,`
- L144：`href: `/products/control/${detail.slug}`,`
- L170：`export function generateStaticParams() {`
- L188：`const { category, slug } = await params;`
- L190：`const productTypeRoute = resolveProductTypeRoute(category, slug);`
- L200：`const detail = getControlModuleDetailBySlug(slug);`
- L216：`slug,`
- L224：`title: `${slug} \| FOREACH`,`
- L231：`const { category, slug } = await params;`
- L233：`const productTypeRoute = resolveProductTypeRoute(category, slug);`
- L248：`const controlDetail = getControlModuleDetailBySlug(slug);`

### `app/products/[category]/[slug]/[seriesSlug]/page.tsx`

- L7：`import ProductDetailClient from "@/components/products/detail/ProductDetailClient";`
- L15：`import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";`
- L22：`slug: string;`
- L23：`seriesSlug: string;`
- L28：`slug: string;`
- L72：`ProductDetailClient as unknown as ComponentType<{`
- L89：`slug: string,`
- L90：`seriesSlug: string`
- L94：`slug !== "hard-tube-fittings"`
- L100：`normalizeSegment(seriesSlug);`
- L105：`normalizeSegment(item.slug) ===`
- L132：`"hard-tube-fittings",`
- L139：`slug: detail.slug,`
- L211：``/products/fittings/hard-tube-fittings/${detail.slug}`,`
- L214：``/products/fittings/hard-tube-fittings/${detail.slug}`,`
- L217：`"/products/fittings/hard-tube-fittings",`
- L221：`export function generateStaticParams() {`
- L228：`slug: "hard-tube-fittings",`
- L229：`seriesSlug:`
- L230：`normalizeSegment(detail.slug),`
- L237：`slug: string;`
- L238：`seriesSlug: string;`
- L248：`item.slug,`
- L249：`item.seriesSlug,`
- L263：`slug,`
- L264：`seriesSlug,`
- L270：`slug,`
- L271：`seriesSlug`
- L290：`slug,`
- L291：`seriesSlug`

### `components/products/detail/ProductDetailClient.tsx`

- L7：`ProductDetailClient.tsx`
- L33：`type ProductDetailClientProps = {`
- L42：`function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {`
- L51：`const normalizedSlug = slug.trim().toLowerCase();`
- L86：`(typeof data?.slug === "string" && data.slug.includes("-tubing"))`
- L154：`data?.productTypeId === "hard-tube-fittings"`
- L247：`阀系列详情页复用公共 ProductDetailClient。`
- L313：`针系列详情页复用公共 ProductDetailClient。`
- L386：`(typeof data?.slug === "string" && data.slug.includes("-tubing"));`
- L515：`export default function ProductDetailClient({`
- L517：`}: ProductDetailClientProps) {`
- L613：`function getDetailCartProductCode() {`
- L620：`data.slug \|\|`
- L626：`const productCode = getDetailCartProductCode();`
- L650：`const fallbackDetailHref = data.slug`
- L652：`? `/products/pumps/plunger-pumps/${data.slug}``
- L654：`? `/products/pumps/diaphragm-pumps/${data.slug}``
- L656：`? `/products/pumps/pipetting-pumps/${data.slug}``
- L658：`? `/products/tubing/${data.slug}``
- L686：`const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());`
- L691：`console.info("配置选择端口预留", data.slug);`
- L695：`console.info("添加规格书端口预留", data.slug);`
- L717：`console.info("申请3D文件端口预留", data.slug);`
- L1189：`slug={data.slug}`
- L1204：`{getProductDrawingPreviewUrl(data.slug, (data as any).drawing2dUrl \|\| (data as any).drawingPdfUrl \|\| (data as any).partDrawingUrl \|\| (data as any).resources?.drawing2dUrl) ? (`
- L1206：`pdfPreviewUrl={getProductDrawingPreviewUrl(data.slug, (data as any).drawing2dUrl \|\| (data as any).drawingPdfUrl \|\| (data as any).partDrawingUrl \|\| (data as any).resources?.drawing2dUrl)}`

### `components/products/detail/ProductModelViewer.tsx`

- L11：`4. 同时兼容现有 ProductDetailClient.tsx 传入的 slug / modelName / modelUrl`
- L18：`/* 当前产品 slug，旧详情页组件会传入 */`
- L19：`slug?: string;`
- L32：`slug,`
- L39：`const finalProductName = productModel \|\| modelName \|\| slug \|\| "Product";`

### `components/products/selection/ProductSelectionClient.tsx`

- L457：`productTypeId === "hard-tube-fittings" &&`
- L612：`detail.slug,`
- L622：`matchedDetail?.slug \|\|`
- L704：`防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。`
- L721：`(product as any).slug \|\|`
- L752：`* 页面结构继续复用 ProductDetailClient，`
- L828：`3. 统一走现有通用路由 /products/control/[slug]；`
- L829：`4. slug 来自 control-module-selection.generated.ts 里的 detailSlug。`
- L834：`(product as any).slug \|\|`
- L863：`(product as any).slug \|\|`
- L887：`防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。`
- L903：`(product as any).slug \|\|`
- L919：`(product as any).slug,`
- L952：`(product as any).slug \|\|`
- L1016：`(product as any).slug \|\|`
- L1017：`(product as any).seriesSlug \|\|`
- L1053：`详情页路由使用 /products/probes/[slug]。`
- L1068：`const slugFromHref = rawHref`
- L1077：`(product as any).slug \|\|`
- L1078：`(product as any).seriesSlug \|\|`
- L1079：`slugFromHref;`
- L1102：`这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。`
- L1115：`const slugFromHref = rawHref`
- L1124：`(product as any).slug \|\|`
- L1125：`(product as any).seriesSlug \|\|`
- L1126：`slugFromHref;`
- L1148：`这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。`
- L1162：`const slugFromHref = rawHref`
- L1171：`(product as any).slug \|\|`
- L1172：`(product as any).seriesSlug \|\|`

### `data/products/selection/hard-tube-fitting-selection.generated.ts`

- L22：`"productTypeId": "hard-tube-fittings",`
- L39：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",`
- L40：`"detailSlug": "hard-tube-fittings",`
- L51：`"productTypeId": "hard-tube-fittings",`
- L68：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",`
- L69：`"detailSlug": "hard-tube-fittings",`
- L80：`"productTypeId": "hard-tube-fittings",`
- L97：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",`
- L98：`"detailSlug": "hard-tube-fittings",`
- L109：`"productTypeId": "hard-tube-fittings",`
- L126：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",`
- L127：`"detailSlug": "hard-tube-fittings",`
- L138：`"productTypeId": "hard-tube-fittings",`
- L155：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",`
- L156：`"detailSlug": "hard-tube-fittings",`
- L167：`"productTypeId": "hard-tube-fittings",`
- L184：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",`
- L185：`"detailSlug": "hard-tube-fittings",`
- L196：`"productTypeId": "hard-tube-fittings",`
- L213：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",`
- L214：`"detailSlug": "hard-tube-fittings",`
- L225：`"productTypeId": "hard-tube-fittings",`
- L242：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",`
- L243：`"detailSlug": "hard-tube-fittings",`
- L254：`"productTypeId": "hard-tube-fittings",`
- L271：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",`
- L272：`"detailSlug": "hard-tube-fittings",`
- L283：`"productTypeId": "hard-tube-fittings",`
- L300：`"imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",`
- L301：`"detailSlug": "hard-tube-fittings",`

### `data/products/selection/product-route-map.ts`

- L41：`slug: string;`
- L150：`"hard-tube-fittings": {`
- L153：`productTypeId: "hard-tube-fittings",`
- L236：`slug: "plunger-pumps",`
- L252：`slug: "plunger-pumps",`
- L268：`slug: "plunger-pumps",`
- L284：`slug: "diaphragm-pumps",`
- L300：`slug: "diaphragm-pumps",`
- L316：`slug: "diaphragm-pumps",`
- L341：`return Object.entries(productRouteMap.productTypes).map(([slug, route]) => ({`
- L343：`slug,`
- L348：`return Object.entries(productRouteMap.series).map(([seriesSlug, route]) => ({`
- L350：`slug: route.slug,`
- L351：`seriesSlug,`
- L359：`export function resolveProductTypeRoute(category: string, slug: string) {`
- L360：`const route = productRouteMap.productTypes[slug];`
- L371：`slug: string,`
- L372：`seriesSlug: string`
- L374：`const route = productRouteMap.series[seriesSlug];`
- L376：`if (!route \|\| route.category !== category \|\| route.slug !== slug) {`
- L412：`const [slug, route] = matchedRoute;`
- L414：`return `/products/${route.category}/${slug}`;`
- L448：`const [seriesSlug, route] = matchedRoute;`
- L450：`return `/products/${route.category}/${route.slug}/${seriesSlug}`;`
- L466：`.map(([seriesSlug, route]) => ({`
- L469：`href: `/products/${route.category}/${route.slug}/${seriesSlug}`,`

## 四、ProductDetailClient结构

- 文件：`components/products/detail/ProductDetailClient.tsx`
- 总行数：1279

### `components/products/detail/ProductDetailClient.tsx`

- L4：`import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";`
- L5：`import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";`
- L31：`type ProductDetailTab = "spec" \| "model3d" \| "drawing";`
- L33：`type ProductDetailClientProps = {`
- L74：`const model = String(value \|\| "").trim();`
- L76：`return /^(EA\|SM\|TM)-/i.test(model);`
- L85：`data?.detailMode === "material_selection" \|\|`
- L99：`return (data as any).displayModel \|\| data.model \|\| "";`
- L128：`detailMode === "standard_model" \|\|`
- L130：`detailMode === "selection" \|\|`
- L144：`const displayModel = data?.displayModel \|\| data?.model \|\| "";`
- L385：`data?.detailMode === "material_selection" \|\|`
- L469：`return data?.modelSelectionHref \|\| "#model-selection";`
- L486：`data.selectionHref \|\|`
- L487：`data.modelSelectionHref \|\|`
- L488：`"#model-selection"`
- L530：`const images: string[] = [];`
- L533：`images.push(data.mainImage);`
- L537：`if (image && !images.includes(image)) {`
- L538：`images.push(image);`
- L542：`return images;`
- L615：`data.modelDisplay \|\|`
- L618：`data.model \|\|`
- L619：`data.productCode \|\|`
- L626：`const productCode = getDetailCartProductCode();`
- L627：`const modelText = String(`
- L628：`data.modelDisplay \|\|`
- L631：`data.model \|\|`
- L633：`productCode`
- L663：`sourceType: "pump-selection",`
- L666：`productCode,`
- L667：`foreachModel: modelText,`
- L686：`const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());`
- L701：`if (!item.productCode \|\| !item.foreachModel) {`
- L706：`const existingItem = getItem("pump-selection", item.productCode);`
- L723：`if (!item.productCode \|\| !item.foreachModel) {`
- L728：`const existingItem = getItem("pump-selection", item.productCode);`
- L752：`label: data.model,`
- L776：`alt={(data as any).imageAltEn \|\| (data as any).mainImageAlt \|\| (data as any).imageAlt \|\| `${data.model} ${data.name}`}`
- L1011：`<h1 className={styles.productModelTitle}>{data.model}</h1>`
- L1021：`{data.commonApplications.join("、")}`
- L1026：`<div data-product-model-row="true" className={styles.modelLine}>`
- L1027：`<div className={styles.modelCodeWrap}>`
- L1028：`<div className={styles.modelCodeText}>`
- L1029：`<span className={styles.modelLabel}>型号：</span>`
- L1030：`<span className={styles.modelCode}>{getDisplayModelText(data)}</span>`
- L1072：`{data.showDrawingRequest ? (`
- L1124：`activeTab === "model3d" ? styles.isActive : "",`
- L1129：`onClick={() => setActiveTab("model3d")}`
- L1165：`{data.specs.map((item) => (`
- L1179：`activeTab === "model3d" ? styles.isActive : "",`
- L1186：`data-product-model3d-panel="true"`
- L1190：`modelName={data.model}`
- L1191：`modelUrl={(data as any).model3dUrl \|\| (data as any).resources?.model3dUrl}`
- L1207：`documentTitle={data.model}`
- L1217：`{data.faqs && data.faqs.length > 0 ? (`
- L1219：`<section className={styles.faqSection}>`
- L1220：`<div className={styles.faqHeader}>`
- L1221：`<h2>{getDbSectionTitle("faq", "常见问题")}</h2>`
- L1224：`<div className={styles.faqList}>`

## 五、硬管接头服务和适配器

- `components/products/detail/ProductDetailClient.tsx`
- `components/products/selection/ProductSelectionClient.tsx`

## 六、快插接头当前文件

- `data/products/generated/fittings/quick-connect-fittings/index.json`
- `data/products/generated/fittings/quick-connect-fittings/summary.json`
- `data/products/selection/quick-connect-fitting-selection.generated.ts`
- `data/products/selection/quick-connect-fitting-selection.generated.ts.bak_card_copy_20260711230431`
- `data/products/selection/quick-connect-fitting-selection.generated.ts.bak_quick_connect_data_20260711225116`
- `data/products/selection/quick-connect-fitting-selection.generated.ts.bak_quick_connect_data_20260711230304`
- `data/products/selection/quick-connect-fitting-selection.summary.json`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl.ts`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.zh.ts`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.zh.ts`
- `data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts`
- `scripts/products/audit-quick-connect-detail-reuse.cjs`
- `scripts/products/audit-quick-connect-implementation.cjs`
- `scripts/products/fix-quick-connect-filter-layout-and-size.cjs`
- `scripts/products/generate-and-connect-quick-connect-selection.cjs`
- `scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_card_copy_20260711230304`
- `scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224051`
- `scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224310`
- `scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224444`
- `scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224911`
- `scripts/products/generate-quick-connect-series.cjs`
- `scripts/products/postprocess-quick-connect-card-copy.cjs`
- `scripts/products/update-quick-connect-card-copy.cjs`

## 七、快插接头图片资源

- `public/images/products/FIT/Barbed connector_200x200_01_v001.jpg`
- `public/images/products/FIT/Quick connector_200x200_01_v001.jpg`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNV-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNV-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNX-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNX-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2002-SNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PNX-SACN_2.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-PNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2003-SNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNV-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNV-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNX-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNX-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-PNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SMV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SMV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SMX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SMX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNV-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNV-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNX-LACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNX-LPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2004-SNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-PNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-PNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-PNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-PNX-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-SNV-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-SNV-SPPE.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-SNX-SACN.webp`
- `public/images/resources/selection-support/fitting-replacement/q20/products/Q2018N-SNX-SPPE.webp`

## 八、实施原则

- 复用硬管接头详情页路由和组件。
- 复用ProductDetailClient。
- 不新增快插接头专属CSS。
- Q20、Q40、Q60各建立一个系列详情页。
- 不为191个商品编码分别建立详情页。
- 现有接头替代查询模块保持独立。

