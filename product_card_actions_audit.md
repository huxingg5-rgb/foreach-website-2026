# 产品卡片按钮功能接入检查报告

生成时间：2026-07-06 14:29:35


## 1. 当前分支

```text
dev-plunger-pump-xlsx-database-v2-optimization-20260704
```

## 2. Git 当前状态

```text
 M app/products/products.css
?? app/products/products.css.bak_20260706_140218
?? app/products/products.css.bak_mobile_card_final_append_20260706_142435
?? app/products/products.css.bak_mobile_card_font_20260706_142035
?? app/products/products.css.bak_mobile_card_real_fix_20260706_142254
?? product_card_actions_audit.md
?? product_center_intro_layout_check_and_fix.md
?? product_intro_layout_audit.md
?? product_intro_layout_code_context.md
```

## 3. 搜索按钮文字与相关 class

```text
F:\WebsiteProjects\foreach-website-2026\components\contact\buildContactPdfHtml.ts:405: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildContactPdfHtml.ts:572: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildContactPdfHtml.ts:633: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildContactPdfHtml.ts:647: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildDistributorPdfHtml.ts:407: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildDistributorPdfHtml.ts:570: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildDistributorPdfHtml.ts:629: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\contact\buildDistributorPdfHtml.ts:643: color: #12233d;
F:\WebsiteProjects\foreach-website-2026\components\forms\company-info-request\CompanyInfoRequestModal.tsx:12: 2. 当前用于：申请图纸
F:\WebsiteProjects\foreach-website-2026\components\forms\company-info-request\CompanyInfoRequestModal.tsx:102: /* 弹窗主标题，例如 申请图纸 */
F:\WebsiteProjects\foreach-website-2026\components\products\detail\product-detail.module.css:1969: - 只增加“型号/联系我们”和“添加图纸/加入清单”之间的空隙
F:\WebsiteProjects\foreach-website-2026\components\products\detail\product-detail.module.css:1986: /* ===== FOREACH 3d model global height START ===== */
F:\WebsiteProjects\foreach-website-2026\components\products\detail\product-detail.module.css:1988: 3D 模型全端高度修复：
F:\WebsiteProjects\foreach-website-2026\components\products\detail\product-detail.module.css:1993: - 只给 3D 模型容器和 model-viewer 明确高度
F:\WebsiteProjects\foreach-website-2026\components\products\detail\product-detail.module.css:2067: /* ===== FOREACH 3d model global height END ===== */
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetail.module.css:7: 2. 主要解决 3D 模型预览组件的样式引用
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:13: - 申请3D文件按钮
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:28: type ProductDetailTab = "spec" | "model3d" | "drawing";
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:301: console.info("添加图纸端口预留", data.slug);
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:304: function handleRequest3DFile() {
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:305: console.info("申请3D文件端口预留", data.slug);
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:309: console.info("加入清单端口预留", data.slug);
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:645: 添加图纸
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:649: {data.show3DRequest ? (
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:653: onClick={handleRequest3DFile}
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:655: 申请3D文件
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:664: 加入清单
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:689: activeTab === "model3d" ? styles.isActive : "",
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:694: onClick={() => setActiveTab("model3d")}
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:696: 3D模型
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:744: activeTab === "model3d" ? styles.isActive : "",
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:751: data-product-model3d-panel="true"
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx:756: modelUrl={(data as any).model3dUrl || (data as any).resources?.model3dUrl}
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.module.css:27: 3D控制按钮
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx:5: 恒永达官网｜产品 3D 模型预览组件
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx:27: /* 3D 模型文件路径 */
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx:56: console.error("3D 模型预览组件加载失败：", error);
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx:74: 暂未配置 3D 模型文件
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx:82: 3D 模型加载中...
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx:98: alt: `${finalProductName} 3D model`,
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx:9: selectedList: ReadonlySet<string>;
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx:21: selectedList,
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx:42: isAdded={selectedList.has(product.productId)}
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx:56: className="product-link"
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx:65: className={`list-toggle ${isAdded ? "active" : ""}`}
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:88: addToList: "加入清单",
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:89: addedToList: "已加入清单",
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:564: const [selectedList, setSelectedList] = useState<Set<string>>(() => new Set());
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1188: setSelectedList((current) => {
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx:1306: selectedList={selectedList}
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:15: 5. 支持加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:27: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:115: const { addItem, getItem, removeItem, toggleDrawingNeed } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:173: 1. 避免“加入清单”和“添加图纸”两处重复写一大段
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:199: 1. 未加入清单时，点击加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:200: 2. 已加入清单时，点击取消加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:205: removeItem(currentCartItem.id);
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:209: addItem(createCurrentProductCartItem(false));
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:218: addItem(createCurrentProductCartItem(true));
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:25: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:276: const { addItem, getItem, removeItem } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:390: addItem({
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:409: 1. 未加入清单时，点击加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:410: 2. 已加入清单时，点击取消加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:420: removeItem(currentCartItem.id);
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:569: ? productCardText?.addedToCart ?? "已加入清单"
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:570: : productCardText?.addToCart ?? "加入清单",
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:18: 8. 首页加入清单后，写入全局选型清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:35: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:177: const { addItem, getItem, removeItem } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:311: addItem({
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:330: 1. 未加入清单时，点击加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:331: 2. 已加入清单时，点击取消加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:341: removeItem(currentCartItem.id);
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:542: "已加入清单"
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:543: : homeText?.productCard.addToCart ?? "加入清单",
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:4: FittingSelectionCart.tsx
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:8: components/resources/fitting-replacement/FittingSelectionCart.tsx
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:18: 1. 加入清单 = 加入产品需求
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:34: export type FittingSelectionCartItem = FittingReplacementProduct & {
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:42: interface FittingSelectionCartProps {
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:44: cartItems: FittingSelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:62: onRemoveItem: (productCode: string) => void;
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:80: export default function FittingSelectionCart({
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:87: onRemoveItem,
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:92: }: FittingSelectionCartProps) {
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:143: 可先选择型号并加入清单
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:177: onRemoveItem(item.productCode);
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:206: {item.needDrawing ? "已添加图纸" : "添加图纸"}
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:250: 产品加入清单后不会默认发送图纸。需要图纸的型号，可在详情页或清单中切换。
F:\WebsiteProjects\foreach-website-2026\components\resources\news\NewsArticleClient.module.css:24: --news-text: #14233d;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:2: GlobalSelectionCartDrawer.module.css
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:6: components/selection-cart/GlobalSelectionCartDrawer.module.css
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:117: 加入清单后的轻动效
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:121: animation: selectionCartBump 0.42s ease;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:125: animation: selectionCartBadgeBump 0.42s ease;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:128: @keyframes selectionCartBump {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:142: @keyframes selectionCartBadgeBump {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:626: color: #14233d;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css:708: color: #14233d;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:4: GlobalSelectionCartDrawer.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:8: components/selection-cart/GlobalSelectionCartDrawer.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:16: 6. 点击加入清单 / 添加图纸后，不自动打开清单，只让右下角清单按钮轻微动效提示
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:17: 7. “申请图纸”弹窗使用通用 CompanyInfoRequestModal 组件
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:35: import styles from "./GlobalSelectionCartDrawer.module.css";
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:36: import { useSelectionCart } from "./SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:82: export default function GlobalSelectionCartDrawer() {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:90: removeItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:95: } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:107: /* 已经标记“已添加图纸”的型号 */
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:188: 点击申请图纸
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:192: 2. 如果没有添加图纸，弹窗内会显示空状态
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:400: 可先选择型号并加入清单
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:427: removeItem(item.id);
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:463: {item.needDrawing ? "已添加图纸" : "添加图纸"}
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:507: 产品加入清单后不会默认发送图纸。需要图纸的型号，可在详情页或清单中切换。
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:519: 申请图纸
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:551: 通用公司信息弹窗｜当前用于申请图纸
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:555: title="申请图纸"
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:559: emptyDescription="请先回到清单，在需要图纸的型号旁点击“添加图纸”，再提交图纸申请。"
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:560: submitLabel="提交申请图纸"
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:18: export type SelectionCartSourceType =
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:26: export interface SelectionCartItem {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:31: sourceType: SelectionCartSourceType;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:61: /* 加入清单时的输入结构
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:65: export type SelectionCartItemInput = Omit<
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:66: SelectionCartItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:4: SelectionCartProvider.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:8: components/selection-cart/SelectionCartProvider.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:12: 2. 首页、详情页、后续产品页都通过 useSelectionCart 使用同一个清单
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:27: SelectionCartItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:28: SelectionCartItemInput,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:29: SelectionCartSourceType,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:41: interface SelectionCartContextValue {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:42: items: SelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:48: addItem: (item: SelectionCartItemInput) => void;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:49: removeItem: (id: string) => void;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:56: sourceType: SelectionCartSourceType,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:58: ) => SelectionCartItem | undefined;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:66: const SelectionCartContext = createContext<SelectionCartContextValue | null>(
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:74: sourceType: SelectionCartSourceType;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:84: 旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:87: function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:94: const raw = item as Partial<SelectionCartItem> & {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:105: const normalizedItem: SelectionCartItem = {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:126: .filter(Boolean) as SelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:132: function buildCartText(items: SelectionCartItem[]) {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:162: export function SelectionCartProvider({
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:167: const [items, setItems] = useState<SelectionCartItem[]>([]);
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:178: const parsedGlobalCart = JSON.parse(rawGlobalCart) as SelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:227: function addItem(input: SelectionCartItemInput) {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:264: function removeItem(id: string) {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:302: function getItem(sourceType: SelectionCartSourceType, productCode: string) {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:335: const contextValue = useMemo<SelectionCartContextValue>(() => {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:341: addItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:342: removeItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:354: <SelectionCartContext.Provider value={contextValue}>
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:356: </SelectionCartContext.Provider>
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:361: useSelectionCart
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:363: export function useSelectionCart() {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:364: const context = useContext(SelectionCartContext);
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:368: "useSelectionCart must be used inside SelectionCartProvider."
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:282: model3dFileName: "",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:288: model3dFileName: seriesCode + "-" + capacityCode + ".glb",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:295: function makeAssetRequestUrl(model: string, assetType: "2d" | "3d") {
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:299: : "Request 3D Model - " + model;
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:378: model3dUrl: "",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:389: model3dUrl: pickExistingPublicAssetUrl(
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:391: "3d-models",
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:515: model3dRequestOnly: false,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:517: model3dFileName: assetFiles.model3dFileName,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:519: model3dUrl: publicAssetUrls.model3dUrl,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:523: model3dRequestOnly: false,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:525: model3dFileName: assetFiles.model3dFileName,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:527: model3dUrl: publicAssetUrls.model3dUrl,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:531: model3dHref: publicAssetUrls.model3dUrl,
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx:537: model3dText: "查看 3D 模型",
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:561: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:562: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:580: .products-selection-page .product-link:hover,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:581: .products-selection-page .list-toggle:hover,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:582: .products-selection-page .list-toggle.active {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:868: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:869: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1742: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1743: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1762: .products-selection-page .product-link:hover,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1763: .products-selection-page .list-toggle:hover,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1764: .products-selection-page .list-toggle.active {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1928: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:1929: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2237: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2238: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2277: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2278: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2296: .products-selection-page .product-card:has(.list-toggle.active) .product-title,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2297: .products-selection-page .product-card:has(.list-toggle[aria-pressed="true"]) .product-title,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2298: .products-selection-page .product-card:has(.list-toggle[data-active="true"]) .product-title,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2299: .products-selection-page .product-card:has(.list-toggle.is-active) .product-title,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2849: .products-selection-page .product-link,
F:\WebsiteProjects\foreach-website-2026\app\products\products.css:2850: .products-selection-page .list-toggle {
F:\WebsiteProjects\foreach-website-2026\app\resources\installation-guide\installation-guide.css:35: --installation-guide-text: #14233d;
F:\WebsiteProjects\foreach-website-2026\app\resources\material-compatibility\material-compatibility.css:19: --mc-text: #14213d;
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\q20\[productCode]\fitting-replacement-detail.css:23: color: #14233d;
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\q20\[productCode]\fitting-replacement-detail.css:142: color: #14233d;
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\q20\[productCode]\fitting-replacement-detail.css:161: 1. 加入清单
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\q20\[productCode]\fitting-replacement-detail.css:162: 2. 添加图纸
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\fitting-replacement.css:27: color: #14233d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:4851: border-color: #061b3d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:4852: background: #061b3d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:4985: linear-gradient(145deg, #173368 0%, #0c2857 52%, #061b3d 100%);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:5005: linear-gradient(145deg, #1c3f78 0%, #0d2d62 52%, #061b3d 100%);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:5050: color: #061b3d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:5063: color: #061b3d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:5228: border-color: #061b3d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:5229: background: #061b3d;
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11928: transform: translate3d(-44px, 32px, 0) scale(1);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11938: transform: translate3d(44px, 32px, 0) scale(1);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11944: transform: translate3d(0, 0, 0) scale(1);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11952: transform: translate3d(0, 0, 0) scale(1.035);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11961: transform: translate3d(44px, 32px, 0);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11970: transform: translate3d(-44px, 32px, 0);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11976: transform: translate3d(0, 0, 0);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:11981: transform: translate3d(0, -6px, 0);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:12126: transform: translate3d(0, 28px, 0);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:12131: transform: translate3d(0, 0, 0);
F:\WebsiteProjects\foreach-website-2026\app\globals.css:12136: transform: translate3d(0, 0, 0) scale(1.025);
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:25: import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:26: import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:59: <SelectionCartProvider>
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:241: 3. 后续页面内部不再单独渲染 FittingSelectionCart
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:243: <GlobalSelectionCartDrawer />
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:244: </SelectionCartProvider>
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:29: show3DRequest: boolean;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:63: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:95: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:127: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:159: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:191: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:223: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:255: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:287: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:319: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:351: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:383: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:415: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:447: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts:479: "show3DRequest":  true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:12: 5. 2D / 3D 私有路径只用于脚本校验，不写入前端数据
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:130: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:136: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:137: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:138: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:255: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:261: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:262: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:263: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:380: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:386: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:387: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:388: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:505: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:511: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:512: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:513: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:630: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:636: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:637: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:638: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:755: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:761: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:762: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:763: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:880: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:886: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:887: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:888: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1005: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1011: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1012: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1013: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1130: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1136: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1137: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1138: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1255: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1261: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1262: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1263: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1380: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1386: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1387: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1388: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1505: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1511: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1512: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1513: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1630: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1636: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1637: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1638: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1755: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1761: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1762: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1763: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1876: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1882: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1883: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1884: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:1997: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2003: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2004: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2005: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2118: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2124: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2125: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2126: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2239: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2245: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2246: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2247: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2360: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2366: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2367: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2368: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2481: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2487: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2488: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2489: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2602: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2608: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2609: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2610: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2723: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2729: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2730: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2731: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2844: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2850: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2851: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2852: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2965: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2971: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2972: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:2973: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3086: "model3dRequestOnly": true,
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3092: "model3d": {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3093: "zh": "申请 3D 模型",
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts:3094: "en": "Request 3D Model"
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:26: model3d: {
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts:34: model3dRequestOnly: boolean;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.types.ts:51: show3DRequest: boolean;
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.zh.ts:41: show3DRequest: true,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:371: "model3dUrl": "/assets/products/ea/3d-models/EA-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:375: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:758: "model3dUrl": "/assets/products/ea/3d-models/EA-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:762: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1246: "model3dUrl": "/assets/products/ea/3d-models/EA-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1250: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1633: "model3dUrl": "/assets/products/ea/3d-models/EA-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:1637: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2121: "model3dUrl": "/assets/products/ea/3d-models/EA-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2125: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2508: "model3dUrl": "/assets/products/ea/3d-models/EA-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2512: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:2996: "model3dUrl": "/assets/products/ea/3d-models/EA-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3000: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3383: "model3dUrl": "/assets/products/ea/3d-models/EA-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3387: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3871: "model3dUrl": "/assets/products/ea/3d-models/EA-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:3875: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4258: "model3dUrl": "/assets/products/ea/3d-models/EA-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4262: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4746: "model3dUrl": "/assets/products/ea/3d-models/EA-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:4750: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5133: "model3dUrl": "/assets/products/ea/3d-models/EA-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5137: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5621: "model3dUrl": "/assets/products/ea/3d-models/EA-1000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:5625: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6008: "model3dUrl": "/assets/products/ea/3d-models/EA-1000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6012: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6496: "model3dUrl": "/assets/products/ea/3d-models/EA-1000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6500: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6883: "model3dUrl": "/assets/products/ea/3d-models/EA-1000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:6887: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7371: "model3dUrl": "/assets/products/ea/3d-models/EA-2500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7375: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7758: "model3dUrl": "/assets/products/ea/3d-models/EA-2500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:7762: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8246: "model3dUrl": "/assets/products/ea/3d-models/EA-2500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8250: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8633: "model3dUrl": "/assets/products/ea/3d-models/EA-2500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:8637: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9121: "model3dUrl": "/assets/products/ea/3d-models/EA-5000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9125: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9508: "model3dUrl": "/assets/products/ea/3d-models/EA-5000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9512: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:9996: "model3dUrl": "/assets/products/ea/3d-models/EA-5000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10000: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10383: "model3dUrl": "/assets/products/ea/3d-models/EA-5000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10387: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10871: "model3dUrl": "/assets/products/ea/3d-models/EA-10000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:10875: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11258: "model3dUrl": "/assets/products/ea/3d-models/EA-10000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11262: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11746: "model3dUrl": "/assets/products/ea/3d-models/EA-10000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:11750: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12133: "model3dUrl": "/assets/products/ea/3d-models/EA-10000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12137: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12613: "model3dUrl": "/assets/products/sm/3d-models/SM-0050UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12617: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12992: "model3dUrl": "/assets/products/sm/3d-models/SM-0050UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:12996: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13472: "model3dUrl": "/assets/products/sm/3d-models/SM-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13476: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13851: "model3dUrl": "/assets/products/sm/3d-models/SM-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:13855: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14331: "model3dUrl": "/assets/products/sm/3d-models/SM-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14335: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14710: "model3dUrl": "/assets/products/sm/3d-models/SM-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:14714: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15190: "model3dUrl": "/assets/products/sm/3d-models/SM-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15194: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15569: "model3dUrl": "/assets/products/sm/3d-models/SM-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:15573: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16049: "model3dUrl": "/assets/products/sm/3d-models/SM-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16053: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16428: "model3dUrl": "/assets/products/sm/3d-models/SM-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16432: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16908: "model3dUrl": "/assets/products/sm/3d-models/SM-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:16912: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17287: "model3dUrl": "/assets/products/sm/3d-models/SM-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17291: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17767: "model3dUrl": "/assets/products/sm/3d-models/SM-1000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:17771: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18146: "model3dUrl": "/assets/products/sm/3d-models/SM-1000UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18150: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18626: "model3dUrl": "/assets/products/tm/3d-models/TM-0050UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:18630: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19005: "model3dUrl": "/assets/products/tm/3d-models/TM-0050UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19009: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19485: "model3dUrl": "/assets/products/tm/3d-models/TM-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19489: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19864: "model3dUrl": "/assets/products/tm/3d-models/TM-0100UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:19868: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20344: "model3dUrl": "/assets/products/tm/3d-models/TM-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20348: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20723: "model3dUrl": "/assets/products/tm/3d-models/TM-0250UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:20727: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:21203: "model3dUrl": "/assets/products/tm/3d-models/TM-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:21207: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:21582: "model3dUrl": "/assets/products/tm/3d-models/TM-0500UL.glb",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts:21586: "show3D": false,
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.footnotes.generated.ts:78: "noteZh": "公开图纸和 3D 文件仅用于网页预览和初步评估。",
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.footnotes.generated.ts:79: "noteEn": "Public drawings and 3D files are provided for web preview and preliminary evaluation only.",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:58: addToCart: "加入清单",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:59: addedToCart: "已加入清单",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:60: addDrawing: "添加图纸",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:61: addedDrawing: "已添加图纸",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:77: question: "预览图纸和添加图纸有什么区别？",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:79: "预览图纸用于在线查看结构和尺寸；添加图纸表示后续提交清单时，希望我们把该型号的正式 2D 图纸纳入图纸发送范围。",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts:84: "图纸会根据客户加入清单并标记的型号统一整理，避免客户下载错误型号。后续可通过需求提交、邮件或资料包方式统一发送。",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.zh.ts:54: addToCart: "加入清单",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.zh.ts:55: addedToCart: "已加入清单",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.zh.ts:56: addDrawing: "添加图纸",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.zh.ts:57: drawingAdded: "已添加图纸",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.page.intl.ts:91: addToCart: "加入清单",
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.page.intl.ts:92: addedToCart: "已加入清单",
```

## 4. 搜索清单 Provider / Drawer 用法

```text
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:27: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx:115: const { addItem, getItem, removeItem, toggleDrawingNeed } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:25: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementGuide.tsx:276: const { addItem, getItem, removeItem } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:35: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementHome.tsx:177: const { addItem, getItem, removeItem } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:34: export type FittingSelectionCartItem = FittingReplacementProduct & {
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx:44: cartItems: FittingSelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:4: GlobalSelectionCartDrawer.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:8: components/selection-cart/GlobalSelectionCartDrawer.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:35: import styles from "./GlobalSelectionCartDrawer.module.css";
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:36: import { useSelectionCart } from "./SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:82: export default function GlobalSelectionCartDrawer() {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:95: } = useSelectionCart();
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:204: 2. 给 body 添加 selection-cart-printing 类名
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:215: document.documentElement.classList.add("selection-cart-printing");
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:216: document.body.classList.add("selection-cart-printing");
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:219: document.documentElement.classList.remove("selection-cart-printing");
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:220: document.body.classList.remove("selection-cart-printing");
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx:266: <section className={`${styles.printArea} selection-cart-print-root`}>
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:2: selection-cart.types.ts
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:6: components/selection-cart/selection-cart.types.ts
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:26: export interface SelectionCartItem {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:65: export type SelectionCartItemInput = Omit<
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts:66: SelectionCartItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:4: SelectionCartProvider.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:8: components/selection-cart/SelectionCartProvider.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:12: 2. 首页、详情页、后续产品页都通过 useSelectionCart 使用同一个清单
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:27: SelectionCartItem,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:28: SelectionCartItemInput,
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:30: } from "./selection-cart.types";
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:42: items: SelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:48: addItem: (item: SelectionCartItemInput) => void;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:58: ) => SelectionCartItem | undefined;
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:84: 旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:87: function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:94: const raw = item as Partial<SelectionCartItem> & {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:105: const normalizedItem: SelectionCartItem = {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:126: .filter(Boolean) as SelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:132: function buildCartText(items: SelectionCartItem[]) {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:162: export function SelectionCartProvider({
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:167: const [items, setItems] = useState<SelectionCartItem[]>([]);
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:178: const parsedGlobalCart = JSON.parse(rawGlobalCart) as SelectionCartItem[];
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:227: function addItem(input: SelectionCartItemInput) {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:361: useSelectionCart
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:363: export function useSelectionCart() {
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx:368: "useSelectionCart must be used inside SelectionCartProvider."
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:25: import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:26: import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:59: <SelectionCartProvider>
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:243: <GlobalSelectionCartDrawer />
F:\WebsiteProjects\foreach-website-2026\app\layout.tsx:244: </SelectionCartProvider>
```

## 5. ProductSelectionClient：按钮渲染区域前后

文件路径：F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx

`$Lang
1120:     }
1121: 
1122:     /*
1123:      * 说明：
1124:      * 1. 判断当前清除的标签是否命中正式系列路由
1125:      * 2. 例如 EA 常规柱塞泵命中：
1126:      *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
1127:      * 3. 清除后跳回产品类型页：
1128:      *    /products/pumps/plunger-pumps/
1129:      */
1130:     const seriesHref = getSeriesHrefByFilterValue(
1131:       activeCategoryId,
1132:       activeProductTypeId,
1133:       key,
1134:       value
1135:     );
1136: 
1137:     if (seriesHref) {
1138:       const productTypeHref = getProductTypeHrefByIds(
1139:         activeCategoryId,
1140:         activeProductTypeId
1141:       );
1142: 
1143:       if (productTypeHref) {
1144:         router.push(productTypeHref);
1145:         return;
1146:       }
1147:     }
1148: 
1149:     /*
1150:      * 说明：
1151:      * selectedFilters 的 key 只能是 SelectionFilterKey。
1152:      * removeSelectedTag 传进来的 key 是 string，
1153:      * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
1154:      */
1155:     if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
1156:       return;
1157:     }
1158: 
1159:     const filterKey = key as SelectionFilterKey;
1160: 
1161:     setSelectedFilters((current) => {
1162:       const next = {
1163:         ...current,
1164:       };
1165: 
1166:       const values = new Set(next[filterKey] || []);
1167:       values.delete(value);
1168: 
1169:       if (values.size === 0) {
1170:         delete next[filterKey];
1171:       } else {
1172:         next[filterKey] = values;
1173:       }
1174: 
1175:       return next;
1176:     });
1177:   }
1178:   function resetCurrentFilters() {
1179:     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
1180: 
1181:     setActiveProductTypeId(firstProductTypeId);
1182:     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
1183:     setSearchKeyword("");
1184:     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
1185:   }
1186: 
1187:   function toggleProductInList(productId: string) {
1188:     setSelectedList((current) => {
1189:       const next = new Set(current);
1190: 
1191:       if (next.has(productId)) {
1192:         next.delete(productId);
1193:       } else {
1194:         next.add(productId);
1195:       }
1196: 
1197:       return next;
1198:     });
1199:   }
1200: 
1201:   return (
1202:     <div data-product-breadcrumb-shell="true" data-product-center-page="true">
1203: <SitePageShell
1204:       breadcrumbAriaLabel={
1205:         locale === "zh" ? "面包屑导航" : "Breadcrumb"
1206:       }
1207:       breadcrumbItems={[
1208:         {
1209:           label: pageText.breadcrumbHome,
1210:           href: locale === "zh" ? "/" : `/${locale}`,
1211:         },
1212:         {
1213:           label: pageText.breadcrumbCurrent,
1214:         },
1215:       ]}
1216:     >
1217:       <main className="products-selection-page page">
1218:       <div className="container">
1219:         
1220: 
1221:         <ResourceSearchBar
1222:           value={searchKeyword}
1223:           onChange={setSearchKeyword}
1224:           onSearch={setSearchKeyword}
1225:           placeholder={pageText.searchPlaceholder}
1226:           searchButtonText={pageText.searchButton}
1227:           showRecentKeywords={false}
1228:         />
1229: 
1230:         <ProductCategoryTabs
1231:           categories={categoryItems}
1232:           activeCategoryId={activeCategoryId}
1233:           activeCategoryLabel={activeCategory.label}
1234:           mobileCategoryOpen={mobileCategoryOpen}
1235:           mobileCategoryPrefix={pageText.mobileCategoryPrefix}
1236:           onToggleMobileCategory={() =>
1237:             setMobileCategoryOpen((current) => !current)
1238:           }
1239:           onCategoryChange={handleCategoryChange}
1240:         />
1241: 
1242:         {activeProductTypeIntro ? (
1243:           <section
1244:             className="product-type-intro-module"
1245:             aria-label={`${activeProductTypeIntro.title}产品种类说明`}
1246:           >
1247:             <div className="product-type-intro-image">
1248:               <img
1249:                 src={activeProductTypeIntro.image.src}
1250:                 alt={activeProductTypeIntro.image.alt}
1251:                 loading="lazy"
1252:               />
1253:             </div>
1254: 
1255:             <div className="product-type-intro-copy">
1256:               <h2>{activeProductTypeIntro.title}</h2>
1257: 
1258:               {activeProductTypeIntro.paragraphs.map((paragraph) => {
1259:                 const emphasisText = "详情页查看或提交选型需求确认";
1260:                 const emphasisIndex = paragraph.indexOf(emphasisText);
1261: 
1262:                 if (emphasisIndex < 0) {
1263:                   return <p key={paragraph}>{paragraph}</p>;
1264:                 }
1265: 
1266:                 return (
1267:                   <p key={paragraph}>
1268:                     {paragraph.slice(0, emphasisIndex)}
1269:                     <strong className="product-type-intro-emphasis">
1270:                       {emphasisText}
1271:                     </strong>
1272:                     {paragraph.slice(emphasisIndex + emphasisText.length)}
1273:                   </p>
1274:                 );
1275:               })}
1276:             </div>
1277:           </section>
1278:         ) : null}
1279:         <section className="selection-section">
1280:           <div className="selection-layout">
1281:             <ProductFilterPanel
1282:               activeCategory={activeCategory}
1283:               filterGroups={filterGroups}
1284:               mobileOpenFilterGroups={mobileOpenFilterGroups}
1285:               onToggleMobileGroup={toggleMobileFilterGroup}
1286:               isOptionActive={isFilterOptionActive}
1287:               onFilterChange={handleFilterChange}
1288:               emptyText={pageText.filterEmpty}
1289:             />
1290: 
1291:             <section className="product-area">
1292:               <ProductSelectionToolbar
1293:                 total={matchedProducts.length}
1294:                 resultPrefix={pageText.resultPrefix}
1295:                 resultSuffix={pageText.resultSuffix}
1296:                 resetButtonText={pageText.resetFilters}
1297:                 selectedTags={selectedTagItems}
1298:                 onRemoveTag={removeSelectedTag}
1299:                 onResetFilters={resetCurrentFilters}
1300:               />
1301: 
1302:               {matchedProducts.length > 0 ? (
1303:                 <>
1304:                   <ProductCardGrid
1305:                     products={pagedProducts}
1306:                     selectedList={selectedList}
1307:                     detailButtonText={pageText.detailButton}
1308:                     addToListText={pageText.addToList}
1309:                     addedToListText={pageText.addedToList}
1310:                     getTitle={(product) =>
1311:                       getText(locale, product.cardTitle, product.productId)
1312:                     }
1313:                     getSubtitle={(product) =>
1314:                       getText(locale, product.cardSubtitle, "")
1315:                     }
1316:                     getDetailHref={makeDetailHref}
1317:                     onToggleList={toggleProductInList}
1318:                   />
1319: 
1320:                   <ProductSelectionPagination
1321:                     currentPage={safeCurrentProductPage}
1322:                     totalPages={totalProductPages}
1323:                     previousText={pageText.previousPage}
1324:                     nextText={pageText.nextPage}
1325:                     onPageChange={setCurrentProductPage}
1326:                   />
1327:                 </>
1328:               ) : (
1329:                 <ProductEmptyState
1330:                   title={pageText.emptyTitle}
1331:                   description={pageText.emptyDescription}
1332:                 />
1333:               )}
1334:             </section>
1335:           </div>
1336:         </section>
1337:       </div>
1338:     </main>
1339:     </SitePageShell>
1340: </div>
1341:   );
1342: }
```

## 6. ProductSelectionClient：selectedList 状态和事件函数区域

文件路径：F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx

`$Lang
 520: }
 521: 
 522: export default function ProductSelectionClient({
 523:   locale = "zh",
 524:   initialCategoryId,
 525:   initialProductTypeId,
 526:   initialFilters,
 527: }: ProductSelectionClientProps) {
 528:   const router = useRouter();
 529:   const searchParams = useSearchParams();
 530:   const requestedCategoryId = searchParams.get("category");
 531:   const requestedProductTypeId = searchParams.get("productType");
 532: 
 533:   const pageText =
 534:     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 535: 
 536:   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 537: 
 538:   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 539:     return initialCategoryId || categoryItems[0]?.id || "pumps";
 540:   });
 541: 
 542:   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 543:     const initialActiveCategoryId =
 544:       initialCategoryId || categoryItems[0]?.id || "pumps";
 545: 
 546:     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 547:   });
 548: 
 549:   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 550:     () => {
 551:       const initialActiveCategoryId =
 552:         initialCategoryId || categoryItems[0]?.id || "pumps";
 553:       const initialActiveProductTypeId =
 554:         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 555: 
 556:       return getInitialSelectedFilters(
 557:         initialActiveCategoryId,
 558:         initialActiveProductTypeId,
 559:         initialFilters
 560:       );
 561:     }
 562:   );
 563: 
 564:   const [selectedList, setSelectedList] = useState<Set<string>>(() => new Set());
 565:   const [searchKeyword, setSearchKeyword] = useState("");
 566:   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
 567:   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
 568:     Record<string, boolean>
 569:   >(() => {
 570:     const initialActiveCategoryId =
 571:       initialCategoryId || categoryItems[0]?.id || "pumps";
 572:     const initialActiveProductTypeId =
 573:       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 574: 
 575:     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 576:   });
 577:   const [currentProductPage, setCurrentProductPage] = useState(1);
 578:   const [productsPageSize, setProductsPageSize] = useState(12);
 579: 
 580:   const activeCategory = useMemo(() => {
 581:     return (
 582:       categoryItems.find((category) => category.id === activeCategoryId) ||
 583:       categoryItems[0] ||
 584:       DEFAULT_CATEGORIES[0]
 585:     );
 586:   }, [activeCategoryId, categoryItems]);
 587: 
 588:   const categoryProducts = useMemo(() => {
 589:     return getProductsByCategory(activeCategoryId);
 590:   }, [activeCategoryId]);
 591: 
 592:   const productTypeOptions = useMemo(() => {
 593:     const optionMap = new Map<string, { value: string; label: string }>();
 594: 
 595:     /*
 596:      * 说明：
 597:      * 1. 先读取已有产品数据中的产品类型
 598:      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 599:      */
 600:     categoryProducts.forEach((product) => {
 601:       if (!product.productTypeId) return;
 602: 
 603:       if (!optionMap.has(product.productTypeId)) {
 604:         optionMap.set(product.productTypeId, {
 605:           value: product.productTypeId,
 606:           label: getTaxonomyLabel(locale, product.productTypeId),
 607:         });
 608:       }
 609:     });
 610: 
 611:     /*
 612:      * 说明：
 613:      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 614:      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
 615:      * 3. 左侧“产品类型”里也会先显示对应入口
 616:      */
 617:     getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
 618:       if (!optionMap.has(option.value)) {
 619:         optionMap.set(option.value, {
 620:           value: option.value,
 621:           label: option.label,
 622:         });
 623:       }
 624:     });
 625: 
 626:     return Array.from(optionMap.values());
 627:   }, [activeCategoryId, categoryProducts, locale]);
 628: 
 629:   const currentTypeProducts = useMemo(() => {
 630:     if (!activeProductTypeId) {
 631:       return categoryProducts;
 632:     }
 633: 
 634:     return categoryProducts.filter((product) => {
 635:       return product.productTypeId === activeProductTypeId;
 636:     });
 637:   }, [activeProductTypeId, categoryProducts]);
 638: 
 639:   const activeFilterLabels = useMemo(() => {
 640:     return getVisibleFilterLabels(activeProductTypeId);
 641:   }, [activeProductTypeId]);
 642: 
 643:   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 644:     const groups: ProductSelectionFilterGroup[] = [];
 645: 
 646:     if (productTypeOptions.length > 0) {
 647:       groups.push({
 648:         key: "productType",
 649:         title: pageText.productTypeLabel,
 650:         inputType: "single",
 651:         options: productTypeOptions,
 652:       });
 653:     }
 654: 
 655:     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 656:       const options = getFilterOptions(
 657:         currentTypeProducts,
 658:         label.filterKey,
 659:         selectedFilters,
 660:         activeProductTypeId
 661:       );
 662: 
 663:       if (options.length === 0) return;
 664: 
 665:       groups.push({
 666:         key: label.filterKey,
 667:         title: getText(locale, label.label, label.filterKey),
 668:         inputType: label.inputType,
 669:         options,
 670:       });
 671:     });
 672: 
 673:     return groups;
 674:   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 675: 
 676:   const matchedProducts = useMemo(() => {
 677:     const keyword = searchKeyword.trim().toLowerCase();
 678: 
 679:     return categoryProducts.filter((product) => {
 680:       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 681:         return false;
 682:       }
 683: 
 684:       const filterMatched = FILTER_KEYS.every((filterKey) => {
 685:         const selectedValues = selectedFilters[filterKey];
 686: 
 687:         if (!selectedValues || selectedValues.size === 0) {
 688:           return true;
 689:         }
 690: 
 691:         const value = product.filters[filterKey];
 692: 
 693:         return Boolean(value && selectedValues.has(value));
 694:       });
 695: 
 696:       if (!filterMatched) {
 697:         return false;
 698:       }
 699: 
 700:       if (!keyword) {
 701:         return true;
 702:       }
 703: 
 704:       const searchText = [
 705:         product.productId,
 706:         product.categoryId,
 707:         product.productTypeId,
 708:         product.seriesId,
 709:         product.detailSlug,
 710:         product.cardTitle.zh,
 711:         product.cardTitle.en,
 712:         product.cardSubtitle.zh,
 713:         product.cardSubtitle.en,
 714:         product.searchKeywords.zh,
 715:         product.searchKeywords.en,
 716:         ...Object.values(product.filters),
 717:       ]
 718:         .filter(Boolean)
 719:         .join(" ")
 720:         .toLowerCase();
 721: 
 722:       return searchText.includes(keyword);
 723:     });
 724:   }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);
 725: 
 726:   /*
 727:    * 当前产品种类介绍数据
 728:    * 说明：
 729:    * 1. 根据当前产品大类和产品类型匹配介绍内容
 730:    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 731:    * 3. 找不到时不显示横幅
 732:    */
 733:   const activeProductTypeIntro = getProductTypeIntroByIds(
 734:     activeCategoryId,
 735:     activeProductTypeId
 736:   );
 737:   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 738:     const tags: ProductSelectionSelectedTag[] = [];
 739: 
 740:     if (activeProductTypeId) {
 741:       tags.push({
 742:         key: "productType",
 743:         value: activeProductTypeId,
 744:         label: getTaxonomyLabel(locale, activeProductTypeId),
 745:       });
 746:     }
 747: 
 748:     FILTER_KEYS.forEach((filterKey) => {
 749:       const values = selectedFilters[filterKey];
 750: 
 751:       if (!values || values.size === 0) return;
 752: 
 753:       values.forEach((value) => {
 754:         tags.push({
 755:           key: filterKey,
 756:           value,
 757:           label: value,
 758:         });
 759:       });
 760:     });
 761: 
 762:     return tags;
 763:   }, [activeProductTypeId, locale, selectedFilters]);
 764: 
 765:   const totalProductPages = Math.max(
 766:     1,
 767:     Math.ceil(matchedProducts.length / productsPageSize)
 768:   );
 769: 
 770:   const safeCurrentProductPage = Math.min(
 771:     currentProductPage,
 772:     totalProductPages
 773:   );
 774: 
 775:   const pagedProducts = matchedProducts.slice(
 776:     (safeCurrentProductPage - 1) * productsPageSize,
 777:     safeCurrentProductPage * productsPageSize
 778:   );
 779: 
 780:   useEffect(() => {
 781:     function updateProductsPageSize() {
 782:       setProductsPageSize(getResponsiveProductPageSize());
 783:     }
 784: 
 785:     updateProductsPageSize();
 786: 
 787:     window.addEventListener("resize", updateProductsPageSize);
 788: 
 789:     return () => {
 790:       window.removeEventListener("resize", updateProductsPageSize);
 791:     };
 792:   }, []);
 793: 
 794:   useEffect(() => {
 795:     const fallbackCategoryId = categoryItems[0]?.id || "pumps";
 796:     const preferredCategoryId = requestedCategoryId || initialCategoryId;
 797: 
 798:     const nextCategoryId =
 799:       preferredCategoryId &&
 800:       categoryItems.some((category) => category.id === preferredCategoryId)
 801:         ? preferredCategoryId
 802:         : fallbackCategoryId;
 803: 
 804:     const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
 805:     const preferredProductTypeId =
 806:       requestedProductTypeId || initialProductTypeId;
 807: 
 808:     const productTypeExistsInProducts = Boolean(
 809:       preferredProductTypeId &&
 810:         categoryProductsForUrl.some(
 811:           (product) => product.productTypeId === preferredProductTypeId
 812:         )
 813:     );
 814: 
 815:     const productTypeExistsInRouteMap = Boolean(
 816:       preferredProductTypeId &&
 817:         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 818:     );
 819: 
 820:     const nextProductTypeId =
 821:       preferredProductTypeId &&
 822:       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 823:         ? preferredProductTypeId
 824:         : getFirstProductTypeId(nextCategoryId);
 825: 
 826:     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 827: 
 828:     setActiveCategoryId(nextCategoryId);
 829:     setActiveProductTypeId(nextProductTypeId);
 830:     setSelectedFilters(
 831:       hasQuerySelection
 832:         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 833:         : getInitialSelectedFilters(
 834:             nextCategoryId,
 835:             nextProductTypeId,
 836:             initialFilters
 837:           )
 838:     );
 839:     setSearchKeyword("");
 840:     setMobileCategoryOpen(false);
 841:     setMobileOpenFilterGroups(
 842:       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 843:     );
 844:   }, [
 845:     categoryItems,
 846:     requestedCategoryId,
 847:     requestedProductTypeId,
 848:     initialCategoryId,
 849:     initialProductTypeId,
 850:     initialFilters,
 851:   ]);
 852: 
 853:   useEffect(() => {
 854:     setCurrentProductPage(1);
 855:   }, [
 856:     activeCategoryId,
 857:     activeProductTypeId,
 858:     selectedFilters,
 859:     searchKeyword,
 860:     productsPageSize,
 861:   ]);
 862:   /*
 863:    * 筛选项联动后的自动清理：
 864:    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 865:    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
 866:    * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
 867:    */
 868:   useEffect(() => {
 869:     const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();
 870: 
 871:     filterGroups.forEach((group) => {
 872:       if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 873:         return;
 874:       }
 875: 
 876:       const filterKey = group.key as SelectionFilterKey;
 877:       allowedValuesByFilterKey.set(
 878:         filterKey,
 879:         new Set(group.options.map((option) => option.value))
 880:       );
```

## 7. ProductCardGrid

文件路径：F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx

`$Lang
   1: "use client";
   2: 
   3: import ProductSelectionCard from "./ProductSelectionCard";
   4: 
   5: import type { ProductSelectionProductItem } from "./product-selection-ui.types";
   6: 
   7: type ProductCardGridProps = {
   8:   products: ProductSelectionProductItem[];
   9:   selectedList: ReadonlySet<string>;
  10:   detailButtonText: string;
  11:   addToListText: string;
  12:   addedToListText: string;
  13:   getTitle: (product: ProductSelectionProductItem) => string;
  14:   getSubtitle: (product: ProductSelectionProductItem) => string;
  15:   getDetailHref: (product: ProductSelectionProductItem) => string;
  16:   onToggleList: (productId: string) => void;
  17: };
  18: 
  19: export default function ProductCardGrid({
  20:   products,
  21:   selectedList,
  22:   detailButtonText,
  23:   addToListText,
  24:   addedToListText,
  25:   getTitle,
  26:   getSubtitle,
  27:   getDetailHref,
  28:   onToggleList,
  29: }: ProductCardGridProps) {
  30:   return (
  31:     <div className="product-grid">
  32:       {products.map((product) => {
  33:         const title = getTitle(product);
  34:         const subtitle = getSubtitle(product);
  35: 
  36:         return (
  37:           <ProductSelectionCard
  38:             product={product}
  39:             title={title}
  40:             subtitle={subtitle}
  41:             detailHref={getDetailHref(product)}
  42:             isAdded={selectedList.has(product.productId)}
  43:             detailButtonText={detailButtonText}
  44:             addToListText={addToListText}
  45:             addedToListText={addedToListText}
  46:             key={product.productId}
  47:             onToggleList={onToggleList}
  48:           />
  49:         );
  50:       })}
  51:     </div>
  52:   );
  53: }
```

## 8. ProductSelectionCard

文件路径：F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx

`$Lang
   1: "use client";
   2: 
   3: import type { ProductSelectionProductItem } from "./product-selection-ui.types";
   4: import { getProductCardSpecs } from "@/data/products/selection/card-copy/plunger-pump-card-copy";
   5: 
   6: type ProductSelectionCardProps = {
   7:   product: ProductSelectionProductItem;
   8:   title: string;
   9:   subtitle: string;
  10:   detailHref: string;
  11:   isAdded: boolean;
  12:   detailButtonText: string;
  13:   addToListText: string;
  14:   addedToListText: string;
  15:   onToggleList: (productId: string) => void;
  16: };
  17: 
  18: export default function ProductSelectionCard({
  19:   product,
  20:   title,
  21:   subtitle,
  22:   detailHref,
  23:   isAdded,
  24:   detailButtonText,
  25:   addToListText,
  26:   addedToListText,
  27:   onToggleList,
  28: }: ProductSelectionCardProps) {
  29: 
  30:   const cardSpecs = getProductCardSpecs(product);
  31: 
  32:   return (
  33:     <article className="product-card" title={title}>
  34:       <span className="selected-bar" />
  35: 
  36:       <div className="product-image" aria-label={title}>
  37:         {product.imageCard ? (
  38:           <img src={product.imageCard} alt={title} loading="lazy" />
  39:         ) : (
  40:           <div className="product-image-placeholder">鏆傛棤鍥剧墖</div>
  41:         )}
  42:       </div>
  43: 
  44:       <div className="product-body">
  45:         <h3 className="product-title">{title}</h3>
  46:         {cardSpecs.length > 0 ? (
  47:           <ul className="product-card-specs" aria-label={`${title} 核心参数`}>
  48:             {cardSpecs.map((spec) => (
  49:               <li key={spec.label}>{spec.label}</li>
  50:             ))}
  51:           </ul>
  52:         ) : null}
  53: 
  54:         <div className="product-actions">
  55:           <a
  56:             className="product-link"
  57:             href={detailHref}
  58:             target="_blank"
  59:             rel="noopener noreferrer"
  60:           >
  61:             {detailButtonText}
  62:           </a>
  63: 
  64:           <button
  65:             className={`list-toggle ${isAdded ? "active" : ""}`}
  66:             type="button"
  67:             onClick={() => onToggleList(product.productId)}
  68:           >
  69:             {isAdded ? addedToListText : addToListText}
  70:           </button>
  71:         </div>
  72:       </div>
  73:     </article>
  74:   );
  75: }
  76: 
  77: 
  78: 
  79: 
```

## 9. SelectionCartProvider

文件路径：F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx

`$Lang
   1: "use client";
   2: 
   3: /* =========================================================
   4:    SelectionCartProvider.tsx
   5:    恒永达官网｜全局选型清单状态 Provider
   6: 
   7:    文件路径：
   8:    components/selection-cart/SelectionCartProvider.tsx
   9: 
  10:    作用：
  11:    1. 在全站最高层维护统一选型清单
  12:    2. 首页、详情页、后续产品页都通过 useSelectionCart 使用同一个清单
  13:    3. 清单数据写入 localStorage，刷新页面后仍可保留
  14:    4. 后续统一提交需求、生成资料包、发送邮件都基于这里的数据
  15: ========================================================= */
  16: 
  17: import {
  18:   createContext,
  19:   useContext,
  20:   useEffect,
  21:   useMemo,
  22:   useState,
  23:   type ReactNode,
  24: } from "react";
  25: 
  26: import type {
  27:   SelectionCartItem,
  28:   SelectionCartItemInput,
  29:   SelectionCartSourceType,
  30: } from "./selection-cart.types";
  31: 
  32: /* 新版全局清单缓存 key */
  33: const GLOBAL_CART_STORAGE_KEY = "foreach_global_selection_cart_v1";
  34: 
  35: /* 旧版接头清单缓存 key
  36:    说明：
  37:    用于兼容之前已经写入浏览器的清单数据。
  38: */
  39: const LEGACY_FITTING_CART_STORAGE_KEY = "foreach_fitting_replacement_cart_v1";
  40: 
  41: interface SelectionCartContextValue {
  42:   items: SelectionCartItem[];
  43:   isOpen: boolean;
  44: 
  45:   openCart: () => void;
  46:   closeCart: () => void;
  47: 
  48:   addItem: (item: SelectionCartItemInput) => void;
  49:   removeItem: (id: string) => void;
  50:   clearCart: () => void;
  51: 
  52:   changeQuantity: (id: string, quantity: number) => void;
  53:   toggleDrawingNeed: (id: string, needDrawing: boolean) => void;
  54: 
  55:   getItem: (
  56:     sourceType: SelectionCartSourceType,
  57:     productCode: string
  58:   ) => SelectionCartItem | undefined;
  59: 
  60:   copyCartText: () => Promise<void>;
  61:   generatePdfList: () => void;
  62: 
  63:   printTime: string;
  64: }
  65: 
  66: const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  67:   null
  68: );
  69: 
  70: /* =========================================================
  71:    生成清单项 ID
  72: ========================================================= */
  73: function buildCartItemId(item: {
  74:   sourceType: SelectionCartSourceType;
  75:   productCode: string;
  76: }) {
  77:   return `${item.sourceType}:${item.productCode}`;
  78: }
  79: 
  80: /* =========================================================
  81:    兼容旧版接头清单数据
  82: 
  83:    说明：
  84:    旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
  85:    这里做一次兼容转换。
  86: ========================================================= */
  87: function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  88:   if (!Array.isArray(rawItems)) return [];
  89: 
  90:   return rawItems
  91:     .map((item) => {
  92:       if (!item || typeof item !== "object") return null;
  93: 
  94:       const raw = item as Partial<SelectionCartItem> & {
  95:         productCode?: string;
  96:         foreachModel?: string;
  97:         competitorModels?: string[];
  98:         quantity?: number;
  99:         needDrawing?: boolean;
 100:         imagePath?: string;
 101:       };
 102: 
 103:       if (!raw.productCode || !raw.foreachModel) return null;
 104: 
 105:       const normalizedItem: SelectionCartItem = {
 106:         id: buildCartItemId({
 107:           sourceType: "fitting-replacement",
 108:           productCode: raw.productCode,
 109:         }),
 110:         sourceType: "fitting-replacement",
 111:         sourceLabel: "接头型号替代查询",
 112:         productName: "Q20 快插接头",
 113:         productCode: raw.productCode,
 114:         foreachModel: raw.foreachModel,
 115:         competitorModels: Array.isArray(raw.competitorModels)
 116:           ? raw.competitorModels
 117:           : [],
 118:         quantity: Math.max(1, Number(raw.quantity || 1)),
 119:         needDrawing: Boolean(raw.needDrawing),
 120:         imagePath: raw.imagePath,
 121:         detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
 122:       };
 123: 
 124:       return normalizedItem;
 125:     })
 126:     .filter(Boolean) as SelectionCartItem[];
 127: }
 128: 
 129: /* =========================================================
 130:    生成复制文本
 131: ========================================================= */
 132: function buildCartText(items: SelectionCartItem[]) {
 133:   if (items.length === 0) {
 134:     return "暂无选型产品";
 135:   }
 136: 
 137:   const lines = items.map((item, index) => {
 138:     return [
 139:       `${index + 1}. ${item.foreachModel}`,
 140:       `来源：${item.sourceLabel}`,
 141:       `商品编码：${item.productCode}`,
 142:       `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
 143:       `数量：${item.quantity}`,
 144:       `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
 145:     ].join("\n");
 146:   });
 147: 
 148:   return [
 149:     "恒永达选型清单",
 150:     "",
 151:     "请协助确认以下型号、数量及图纸需求：",
 152:     "",
 153:     lines.join("\n\n"),
 154:     "",
 155:     "说明：最终适配性需结合管径、材质、密封件、连接方式、耐压要求及实际应用环境进行确认。",
 156:   ].join("\n");
 157: }
 158: 
 159: /* =========================================================
 160:    Provider
 161: ========================================================= */
 162: export function SelectionCartProvider({
 163:   children,
 164: }: {
 165:   children: ReactNode;
 166: }) {
 167:   const [items, setItems] = useState<SelectionCartItem[]>([]);
 168:   const [isOpen, setIsOpen] = useState(false);
 169:   const [hasMounted, setHasMounted] = useState(false);
 170:   const [printTime, setPrintTime] = useState("");
 171: 
 172:   /* 读取本地缓存 */
 173:   useEffect(() => {
 174:     try {
 175:       const rawGlobalCart = window.localStorage.getItem(GLOBAL_CART_STORAGE_KEY);
 176: 
 177:       if (rawGlobalCart) {
 178:         const parsedGlobalCart = JSON.parse(rawGlobalCart) as SelectionCartItem[];
 179: 
 180:         setItems(
 181:           parsedGlobalCart.map((item) => {
 182:             return {
 183:               ...item,
 184:               quantity: Math.max(1, Number(item.quantity || 1)),
 185:               needDrawing: Boolean(item.needDrawing),
 186:             };
 187:           })
 188:         );
 189: 
 190:         setHasMounted(true);
 191:         return;
 192:       }
 193: 
 194:       /* 兼容旧版接头清单 */
 195:       const rawLegacyCart = window.localStorage.getItem(
 196:         LEGACY_FITTING_CART_STORAGE_KEY
 197:       );
 198: 
 199:       if (rawLegacyCart) {
 200:         const parsedLegacyCart = JSON.parse(rawLegacyCart);
 201:         const migratedItems = normalizeLegacyFittingItems(parsedLegacyCart);
 202: 
 203:         setItems(migratedItems);
 204:       }
 205:     } catch {
 206:       setItems([]);
 207:     }
 208: 
 209:     setHasMounted(true);
 210:   }, []);
 211: 
 212:   /* 写入本地缓存 */
 213:   useEffect(() => {
 214:     if (!hasMounted) return;
 215: 
 216:     window.localStorage.setItem(GLOBAL_CART_STORAGE_KEY, JSON.stringify(items));
 217:   }, [items, hasMounted]);
 218: 
 219:   function openCart() {
 220:     setIsOpen(true);
 221:   }
 222: 
 223:   function closeCart() {
 224:     setIsOpen(false);
 225:   }
 226: 
 227:   function addItem(input: SelectionCartItemInput) {
 228:     const id =
 229:       input.id ||
 230:       buildCartItemId({
 231:         sourceType: input.sourceType,
 232:         productCode: input.productCode,
 233:       });
 234: 
 235:     const quantity = Math.max(1, Number(input.quantity || 1));
 236: 
 237:     setItems((prev) => {
 238:       const existingItem = prev.find((item) => item.id === id);
 239: 
 240:       if (existingItem) {
 241:         return prev.map((item) => {
 242:           if (item.id !== id) return item;
 243: 
 244:           return {
 245:             ...item,
 246:             quantity: item.quantity + quantity,
 247:             needDrawing: Boolean(item.needDrawing || input.needDrawing),
 248:           };
 249:         });
 250:       }
 251: 
 252:       return [
 253:         ...prev,
 254:         {
 255:           ...input,
 256:           id,
 257:           quantity,
 258:           needDrawing: Boolean(input.needDrawing),
 259:         },
 260:       ];
 261:     });
 262:   }
 263: 
 264:   function removeItem(id: string) {
 265:     setItems((prev) => prev.filter((item) => item.id !== id));
 266:   }
 267: 
 268:   function clearCart() {
 269:     const confirmed = window.confirm("确认清空当前选型清单？");
 270: 
 271:     if (!confirmed) return;
 272: 
 273:     setItems([]);
 274:   }
 275: 
 276:   function changeQuantity(id: string, quantity: number) {
 277:     setItems((prev) => {
 278:       return prev.map((item) => {
 279:         if (item.id !== id) return item;
 280: 
 281:         return {
 282:           ...item,
 283:           quantity: Math.max(1, Number(quantity || 1)),
 284:         };
 285:       });
 286:     });
 287:   }
 288: 
 289:   function toggleDrawingNeed(id: string, needDrawing: boolean) {
 290:     setItems((prev) => {
 291:       return prev.map((item) => {
 292:         if (item.id !== id) return item;
 293: 
 294:         return {
 295:           ...item,
 296:           needDrawing,
 297:         };
 298:       });
 299:     });
 300:   }
 301: 
 302:   function getItem(sourceType: SelectionCartSourceType, productCode: string) {
 303:     const id = buildCartItemId({
 304:       sourceType,
 305:       productCode,
 306:     });
 307: 
 308:     return items.find((item) => item.id === id);
 309:   }
 310: 
 311:   async function copyCartText() {
 312:     const text = buildCartText(items);
 313: 
 314:     try {
 315:       await window.navigator.clipboard.writeText(text);
 316:       window.alert("清单已复制");
 317:     } catch {
 318:       window.alert(text);
 319:     }
 320:   }
 321: 
 322:   function generatePdfList() {
 323:     if (items.length === 0) {
 324:       window.alert("当前清单为空，请先加入产品。");
 325:       return;
 326:     }
 327: 
 328:     setPrintTime(new Date().toLocaleString());
 329: 
 330:     window.setTimeout(() => {
 331:       window.print();
 332:     }, 80);
 333:   }
 334: 
 335:   const contextValue = useMemo<SelectionCartContextValue>(() => {
 336:     return {
 337:       items,
 338:       isOpen,
 339:       openCart,
 340:       closeCart,
 341:       addItem,
 342:       removeItem,
 343:       clearCart,
 344:       changeQuantity,
 345:       toggleDrawingNeed,
 346:       getItem,
 347:       copyCartText,
 348:       generatePdfList,
 349:       printTime,
 350:     };
 351:   }, [items, isOpen, printTime]);
 352: 
 353:   return (
 354:     <SelectionCartContext.Provider value={contextValue}>
 355:       {children}
 356:     </SelectionCartContext.Provider>
 357:   );
 358: }
 359: 
 360: /* =========================================================
```

## 10. selection-cart.types

文件路径：F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts

`$Lang
   1: /* =========================================================
   2:    selection-cart.types.ts
   3:    恒永达官网｜全局选型清单类型定义
   4: 
   5:    文件路径：
   6:    components/selection-cart/selection-cart.types.ts
   7: 
   8:    作用：
   9:    1. 定义全站统一选型清单的数据结构
  10:    2. 后续接头、泵、阀、传感器等产品都可以加入同一个清单
  11:    3. 当前先服务：接头型号替代查询
  12: ========================================================= */
  13: 
  14: /* 清单来源类型
  15:    说明：
  16:    后续如果增加泵、阀、传感器，可以继续扩展字符串。
  17: */
  18: export type SelectionCartSourceType =
  19:   | "fitting-replacement"
  20:   | "pump-selection"
  21:   | "valve-selection"
  22:   | "sensor-selection"
  23:   | "custom";
  24: 
  25: /* 全局清单单项 */
  26: export interface SelectionCartItem {
  27:   /* 全局唯一 ID，建议格式：sourceType:productCode */
  28:   id: string;
  29: 
  30:   /* 来源模块 */
  31:   sourceType: SelectionCartSourceType;
  32: 
  33:   /* 来源模块中文名称，例如：接头型号替代查询 */
  34:   sourceLabel: string;
  35: 
  36:   /* 产品分类名称，例如：Q20 快插接头 */
  37:   productName: string;
  38: 
  39:   /* 商品编码，例如：839034 */
  40:   productCode: string;
  41: 
  42:   /* 恒永达型号，例如：Q2001-PNV-SACN */
  43:   foreachModel: string;
  44: 
  45:   /* 兼容编码，例如：A0015 / B0004 / C0004 */
  46:   competitorModels: string[];
  47: 
  48:   /* 数量 */
  49:   quantity: number;
  50: 
  51:   /* 是否需要 2D 图纸 */
  52:   needDrawing: boolean;
  53: 
  54:   /* 产品详情页链接 */
  55:   detailHref?: string;
  56: 
  57:   /* 产品图片路径 */
  58:   imagePath?: string;
  59: }
  60: 
  61: /* 加入清单时的输入结构
  62:    说明：
  63:    id 和 quantity 可以自动补齐。
  64: */
  65: export type SelectionCartItemInput = Omit<
  66:   SelectionCartItem,
  67:   "id" | "quantity"
  68: > & {
  69:   id?: string;
  70:   quantity?: number;
  71: }; 
```

## 11. GlobalSelectionCartDrawer

文件路径：F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx

`$Lang
   1: "use client";
   2: 
   3: /* =========================================================
   4:    GlobalSelectionCartDrawer.tsx
   5:    恒永达官网｜全局选型清单抽屉
   6: 
   7:    文件路径：
   8:    components/selection-cart/GlobalSelectionCartDrawer.tsx
   9: 
  10:    作用：
  11:    1. 全站只挂载一次
  12:    2. 固定在页面最高层
  13:    3. 首页、详情页、后续产品页共用同一个清单
  14:    4. 支持修改数量、切换图纸需求、删除、清空、复制、生成 PDF 清单
  15:    5. 支持从清单点击型号进入对应详情页
  16:    6. 点击加入清单 / 添加图纸后，不自动打开清单，只让右下角清单按钮轻微动效提示
  17:    7. “申请图纸”弹窗使用通用 CompanyInfoRequestModal 组件
  18:    8. 当前阶段不真正发送邮件，后续再接 services/resources/requestDrawing.ts
  19:    9. 生成 PDF 清单：
  20:       - 页眉使用 request-form-header-graphic.svg
  21:       - 页脚使用 request-form-footer-graphic.svg
  22:       - 不额外添加 Logo
  23:       - 打印区域通过 portal 挂到 body 最高层，避免多页空白
  24: ========================================================= */
  25: 
  26: import Link from "next/link";
  27: import { createPortal } from "react-dom";
  28: import { useEffect, useMemo, useRef, useState } from "react";
  29: 
  30: import CompanyInfoRequestModal, {
  31:   type CompanyInfoFormValue,
  32:   type CompanyInfoRequestItem,
  33: } from "@/components/forms/company-info-request/CompanyInfoRequestModal";
  34: 
  35: import styles from "./GlobalSelectionCartDrawer.module.css";
  36: import { useSelectionCart } from "./SelectionCartProvider";
  37: 
  38: /* =========================================================
  39:    PDF 页眉 / 页脚 SVG 路径
  40: 
  41:    注意：
  42:    1. 文件实际放在 public/images/contact-cooperation/pdf/
  43:    2. 页面引用时不写 public
  44:    3. 所以路径从 /images/... 开始
  45:    4. 不在页面中额外添加 Logo，直接使用 SVG 作为页眉 / 页脚
  46: ========================================================= */
  47: const PDF_HEADER_GRAPHIC_SRC =
  48:   "/images/contact-cooperation/pdf/request-form-header-graphic.svg";
  49: 
  50: const PDF_FOOTER_GRAPHIC_SRC =
  51:   "/images/contact-cooperation/pdf/request-form-footer-graphic.svg";
  52: 
  53: /* =========================================================
  54:    预加载图片
  55: 
  56:    说明：
  57:    1. 生成 PDF 前先预加载页眉 / 页脚 SVG
  58:    2. 避免浏览器打印时图片还没加载完成
  59:    3. 如果加载失败，也不阻断打印，避免功能卡死
  60: ========================================================= */
  61: function preloadPrintImage(src: string) {
  62:   return new Promise<void>((resolve) => {
  63:     if (typeof window === "undefined") {
  64:       resolve();
  65:       return;
  66:     }
  67: 
  68:     const image = new window.Image();
  69: 
  70:     image.onload = () => {
  71:       resolve();
  72:     };
  73: 
  74:     image.onerror = () => {
  75:       resolve();
  76:     };
  77: 
  78:     image.src = src;
  79:   });
  80: }
  81: 
  82: export default function GlobalSelectionCartDrawer() {
  83:   const {
  84:     items,
  85:     isOpen,
  86:     openCart,
  87:     closeCart,
  88:     changeQuantity,
  89:     toggleDrawingNeed,
  90:     removeItem,
  91:     clearCart,
  92:     copyCartText,
  93:     generatePdfList,
  94:     printTime,
  95:   } = useSelectionCart();
  96: 
  97:   /* =========================================================
  98:      是否已经在浏览器端挂载
  99: 
 100:      说明：
 101:      1. 打印区域使用 createPortal 挂到 document.body
 102:      2. document 只在浏览器端存在
 103:      3. 所以需要等组件挂载后再创建 portal
 104:   ========================================================= */
 105:   const [isMounted, setIsMounted] = useState(false);
 106: 
 107:   /* 已经标记“已添加图纸”的型号 */
 108:   const requestDrawingItems = useMemo(() => {
 109:     return items.filter((item) => item.needDrawing);
 110:   }, [items]);
 111: 
 112:   /* 图纸需求数量 */
 113:   const drawingNeedCount = requestDrawingItems.length;
 114: 
 115:   /* 右下角清单按钮动效状态 */
 116:   const [isCartButtonBumping, setIsCartButtonBumping] = useState(false);
 117: 
 118:   /* 图纸申请弹窗是否打开 */
 119:   const [isDrawingRequestModalOpen, setIsDrawingRequestModalOpen] =
 120:     useState(false);
 121: 
 122:   /* 用于记录清单变化，避免页面初次加载时触发动效 */
 123:   const previousCartSignatureRef = useRef("");
 124: 
 125:   useEffect(() => {
 126:     setIsMounted(true);
 127:   }, []);
 128: 
 129:   /* =========================================================
 130:      把清单中的图纸需求转换成通用弹窗条目
 131: 
 132:      说明：
 133:      1. CompanyInfoRequestModal 不依赖具体业务字段
 134:      2. 所以这里把 productCode / competitorModels 转成 metaLines
 135:      3. 后续规格书申请也可以用类似方式转换数据
 136:   ========================================================= */
 137:   const drawingRequestModalItems = useMemo<CompanyInfoRequestItem[]>(() => {
 138:     return requestDrawingItems.map((item) => {
 139:       return {
 140:         id: item.id,
 141:         title: item.foreachModel,
 142:         metaLines: [
 143:           `商品编码：${item.productCode}`,
 144:           `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
 145:           `数量：${item.quantity}`,
 146:         ],
 147:       };
 148:     });
 149:   }, [requestDrawingItems]);
 150: 
 151:   /* =========================================================
 152:      右下角清单按钮轻动效
 153: 
 154:      说明：
 155:      1. 当清单数量、数量值、图纸需求状态发生变化时触发
 156:      2. 不自动打开清单
 157:      3. 只让右下角清单入口轻微提示
 158:      4. 初次加载 localStorage 数据时不触发动效
 159:   ========================================================= */
 160:   useEffect(() => {
 161:     const currentSignature = items
 162:       .map((item) => `${item.id}:${item.quantity}:${item.needDrawing}`)
 163:       .join("|");
 164: 
 165:     if (!previousCartSignatureRef.current) {
 166:       previousCartSignatureRef.current = currentSignature;
 167:       return;
 168:     }
 169: 
 170:     if (previousCartSignatureRef.current !== currentSignature) {
 171:       setIsCartButtonBumping(true);
 172: 
 173:       const timer = window.setTimeout(() => {
 174:         setIsCartButtonBumping(false);
 175:       }, 420);
 176: 
 177:       previousCartSignatureRef.current = currentSignature;
 178: 
 179:       return () => {
 180:         window.clearTimeout(timer);
 181:       };
 182:     }
 183: 
 184:     previousCartSignatureRef.current = currentSignature;
 185:   }, [items]);
 186: 
 187:   /* =========================================================
 188:      点击申请图纸
 189: 
 190:      说明：
 191:      1. 当前打开通用公司信息弹窗
 192:      2. 如果没有添加图纸，弹窗内会显示空状态
 193:      3. 不使用浏览器 alert，体验更像官网表单
 194:   ========================================================= */
 195:   function handleOpenDrawingRequestModal() {
 196:     setIsDrawingRequestModalOpen(true);
 197:   }
 198: 
 199:   /* =========================================================
 200:      生成 PDF 清单
 201: 
 202:      说明：
 203:      1. 预加载页眉 / 页脚 SVG
 204:      2. 给 body 添加 selection-cart-printing 类名
 205:      3. 打印样式只显示 portal 到 body 的打印区域
 206:      4. 打印结束后移除类名
 207:      5. 这样可以避免原网页高度导致打印多页空白
 208:   ========================================================= */
 209:   async function handleGeneratePdfList() {
 210:     await Promise.all([
 211:       preloadPrintImage(PDF_HEADER_GRAPHIC_SRC),
 212:       preloadPrintImage(PDF_FOOTER_GRAPHIC_SRC),
 213:     ]);
 214: 
 215:     document.documentElement.classList.add("selection-cart-printing");
 216:     document.body.classList.add("selection-cart-printing");
 217: 
 218:     function cleanupPrintClass() {
 219:       document.documentElement.classList.remove("selection-cart-printing");
 220:       document.body.classList.remove("selection-cart-printing");
 221:       window.removeEventListener("afterprint", cleanupPrintClass);
 222:     }
 223: 
 224:     window.addEventListener("afterprint", cleanupPrintClass);
 225: 
 226:     /*
 227:        兜底清理：
 228:        部分浏览器关闭打印预览后 afterprint 触发不稳定。
 229:        这里增加兜底，避免页面一直停留在打印状态。
 230:     */
 231:     window.setTimeout(() => {
 232:       cleanupPrintClass();
 233:     }, 5000);
 234: 
 235:     await generatePdfList();
 236:   }
 237: 
 238:   /* =========================================================
 239:      图纸申请模拟提交
 240: 
 241:      说明：
 242:      1. 当前只打印数据，方便后续确认字段结构
 243:      2. 不发送邮件
 244:      3. 后续正式提交改为调用：
 245:         services/resources/requestDrawing.ts
 246:   ========================================================= */
 247:   function handleSubmitDrawingRequest(formValue: CompanyInfoFormValue) {
 248:     const payload = {
 249:       customer: formValue,
 250:       drawingItems: requestDrawingItems,
 251:       fullCartItems: items,
 252:     };
 253: 
 254:     console.log("图纸申请前端模拟数据：", payload);
 255:   }
 256: 
 257:   /* =========================================================
 258:      打印区域
 259: 
 260:      说明：
 261:      1. 这里做成变量，后面通过 createPortal 挂载到 body
 262:      2. 挂到 body 后，打印时可以直接隐藏 body 下其他元素
 263:      3. 这样可以解决打印出现多页空白的问题
 264:   ========================================================= */
 265:   const printDocument = (
 266:     <section className={`${styles.printArea} selection-cart-print-root`}>
 267:       <div className={styles.printPage}>
 268:         {/* PDF 正式页眉 SVG */}
 269:         <header className={styles.printGraphicHeader}>
 270:           <img src={PDF_HEADER_GRAPHIC_SRC} alt="FOREACH PDF Header" />
 271:         </header>
 272: 
 273:         <main className={styles.printContent}>
 274:           <section className={styles.printTitleBlock}>
 275:             <h1>恒永达选型清单</h1>
 276:             <p>
 277:               本清单根据客户选择的型号生成，用于型号确认、报价沟通及内部技术确认。
 278:             </p>
 279:           </section>
 280: 
 281:           <section className={styles.printMetaGrid}>
 282:             <div>
 283:               <span>生成时间</span>
 284:               <strong>{printTime || "-"}</strong>
 285:             </div>
 286: 
 287:             <div>
 288:               <span>产品数量</span>
 289:               <strong>{items.length} 项</strong>
 290:             </div>
 291: 
 292:             <div>
 293:               <span>图纸需求</span>
 294:               <strong>{drawingNeedCount} 项</strong>
 295:             </div>
 296:           </section>
 297: 
 298:           <table className={styles.printTable}>
 299:             <thead>
 300:               <tr>
 301:                 <th>序号</th>
 302:                 <th>来源</th>
 303:                 <th>商品编码</th>
 304:                 <th>兼容编码</th>
 305:                 <th>恒永达型号</th>
 306:                 <th>数量</th>
 307:                 <th>2D 图纸</th>
 308:               </tr>
 309:             </thead>
 310: 
 311:             <tbody>
 312:               {items.length === 0 ? (
 313:                 <tr>
 314:                   <td colSpan={7}>暂无选型产品</td>
 315:                 </tr>
 316:               ) : (
 317:                 items.map((item, index) => {
 318:                   return (
 319:                     <tr key={item.id}>
 320:                       <td>{index + 1}</td>
 321:                       <td>{item.sourceLabel}</td>
 322:                       <td>{item.productCode}</td>
 323:                       <td>{item.competitorModels.join(" / ") || "-"}</td>
 324:                       <td>{item.foreachModel}</td>
 325:                       <td>{item.quantity}</td>
 326:                       <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
 327:                     </tr>
 328:                   );
 329:                 })
 330:               )}
 331:             </tbody>
 332:           </table>
 333:         </main>
 334: 
 335:         {/* PDF 正式页脚 SVG */}
 336:         <footer className={styles.printGraphicFooter}>
 337:           <img src={PDF_FOOTER_GRAPHIC_SRC} alt="FOREACH PDF Footer" />
 338:         </footer>
 339:       </div>
 340:     </section>
 341:   );
 342: 
 343:   return (
 344:     <>
 345:       {/* =====================================================
 346:           右下角浮动按钮
 347:       ===================================================== */}
 348:       <div
 349:         className={`${styles.floatingActions} ${
 350:           isOpen ? styles.hidden : ""
 351:         } ${isCartButtonBumping ? styles.bump : ""}`}
 352:       >
 353:         <button
 354:           type="button"
 355:           onClick={() => {
 356:             window.scrollTo({
 357:               top: 0,
 358:               behavior: "smooth",
 359:             });
 360:           }}
 361:         >
 362:           顶部
 363:         </button>
 364: 
 365:         <button type="button" onClick={openCart}>
 366:           清单
 367:           <span>{items.length}</span>
 368:         </button>
 369:       </div>
 370: 
 371:       {/* =====================================================
 372:           右侧选型清单抽屉
 373:       ===================================================== */}
 374:       {isOpen && (
 375:         <>
 376:           <button
 377:             className={styles.mask}
 378:             type="button"
 379:             aria-label="关闭选型清单"
 380:             onClick={closeCart}
 381:           />
 382: 
 383:           <aside className={styles.drawer} aria-label="选型清单">
 384:             <div className={styles.head}>
 385:               <div>
 386:                 <h2>选型清单</h2>
 387:                 <p>确认型号、数量与图纸需求，后续可统一提交或生成资料包。</p>
 388:               </div>
 389: 
 390:               <button type="button" onClick={closeCart} aria-label="关闭选型清单">
 391:                 ×
 392:               </button>
 393:             </div>
 394: 
 395:             <div className={styles.body}>
 396:               {items.length === 0 ? (
 397:                 <div className={styles.empty}>
 398:                   暂无选型产品
 399:                   <br />
 400:                   可先选择型号并加入清单
 401:                 </div>
 402:               ) : (
 403:                 <>
 404:                   <div className={styles.summary}>
 405:                     <div>
 406:                       <span>产品数量</span>
 407:                       <strong>{items.length}</strong>
 408:                       <em>项</em>
 409:                     </div>
 410: 
 411:                     <div>
 412:                       <span>图纸需求</span>
 413:                       <strong>{drawingNeedCount}</strong>
 414:                       <em>项</em>
 415:                     </div>
 416:                   </div>
 417: 
 418:                   <div className={styles.list}>
 419:                     {items.map((item) => {
 420:                       return (
```

## 12. layout.tsx 检查 Provider 是否挂载

文件路径：F:\WebsiteProjects\foreach-website-2026\app\layout.tsx

`$Lang
   1: /* =========================================================
   2:    app/layout.tsx
   3:    恒永达官网｜全站根布局
   4: 
   5:    说明：
   6:    1. 这个文件是所有页面共用的根布局
   7:    2. 当前为了适配 Cloudflare Pages 免费版静态导出，不使用 cookies()
   8:    3. 语言不再从 Cookie 判断，页面语言由具体页面路径控制
   9:    4. SiteHeader 仍然全站共用
  10:    5. SiteFooter 当前先默认使用中文 zh-CN
  11:    6. 浏览器端交互脚本使用 next/script，避免 React 直接渲染 <script> 报错
  12:    7. 全局选型清单 Provider 和 Drawer 挂载在这里，后续所有产品页共用同一个清单
  13: ========================================================= */
  14: 
  15: import type { Metadata } from "next";
  16: import Script from "next/script";
  17: import type { ReactNode } from "react";
  18: 
  19: import "./globals.css";
  20: import "./language-typography.css";
  21: 
  22: import SiteHeader from "@/components/layout/SiteHeader";
  23: import SiteFooter from "@/components/layout/SiteFooter";
  24: 
  25: import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
  26: import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
  27: import "./products/products.css";
  28: 
  29: /* =========================================================
  30:    网站基础 SEO 信息
  31: 
  32:    说明：
  33:    后续每个页面可以在自己的 page.tsx 里单独设置 metadata
  34: ========================================================= */
  35: export const metadata: Metadata = {
  36:   title: "恒永达 FOREACH 官网",
  37:   description:
  38:     "恒永达专注于微流体系统核心零部件与液路系统解决方案，服务 IVD、生命科学、高端分析仪器、合成生物和实验室自动化领域。",
  39: };
  40: 
  41: /* =========================================================
  42:    RootLayout
  43:    全站根布局
  44: 
  45:    注意：
  46:    1. 静态导出 output: export 模式下，不要使用 cookies()
  47:    2. 不要写 export const runtime = "edge"
  48:    3. 不要在这里根据 Cookie 判断语言
  49:    4. 不要直接写原生 <script>，浏览器脚本统一用 next/script
  50: ========================================================= */
  51: export default function RootLayout({
  52:   children,
  53: }: {
  54:   children: ReactNode;
  55: }) {
  56:   return (
  57:     <html lang="zh-CN">
  58:       <body>
  59:         <SelectionCartProvider>
  60:           {/* =================================================
  61:               页面滚动、移动端菜单、语言菜单交互脚本
  62: 
  63:               说明：
  64:               1. 使用 Next.js 的 Script 组件，而不是原生 <script>
  65:               2. strategy="afterInteractive" 表示页面可以交互后再执行
  66:               3. 不依赖 Cookie，不影响静态导出
  67:               4. 主要控制：
  68:                  - 滚动后导航栏状态
  69:                  - 手机端菜单打开 / 关闭
  70:                  - 手机端语言下拉打开 / 关闭
  71:           ================================================= */}
  72:           <Script id="foreach-layout-interactions" strategy="afterInteractive">
  73:             {`
  74:               (function () {
  75:                 function updatePageScrolled() {
  76:                   var y =
  77:                     window.scrollY ||
  78:                     window.pageYOffset ||
  79:                     document.documentElement.scrollTop ||
  80:                     document.body.scrollTop ||
  81:                     0;
  82: 
  83:                   document.documentElement.classList.toggle("page-scrolled", y > 1);
  84:                 }
  85: 
  86:                 updatePageScrolled();
  87: 
  88:                 window.addEventListener("scroll", updatePageScrolled, { passive: true });
  89:                 window.addEventListener("touchmove", updatePageScrolled, { passive: true });
  90:                 window.addEventListener("touchend", updatePageScrolled, { passive: true });
  91: 
  92:                 document.addEventListener("click", function (event) {
  93:                   var target = event.target;
  94: 
  95:                   if (!target || !target.closest) return;
  96: 
  97:                   var menuButton = target.closest(".mobile-menu-btn");
  98: 
  99:                   if (menuButton) {
 100:                     event.preventDefault();
 101: 
 102:                     var openLanguageWrap = document.querySelector(".language-switcher-open");
 103: 
 104:                     if (openLanguageWrap) {
 105:                       openLanguageWrap.classList.remove("language-switcher-open");
 106: 
 107:                       var openLanguageButton = openLanguageWrap.querySelector(".language-current");
 108: 
 109:                       if (openLanguageButton) {
 110:                         openLanguageButton.setAttribute("aria-expanded", "false");
 111:                       }
 112:                     }
 113: 
 114:                     var nextMenuOpen =
 115:                       !document.documentElement.classList.contains("mobile-nav-open");
 116: 
 117:                     document.documentElement.classList.toggle(
 118:                       "mobile-nav-open",
 119:                       nextMenuOpen
 120:                     );
 121: 
 122:                     menuButton.setAttribute("aria-expanded", String(nextMenuOpen));
 123:                     return;
 124:                   }
 125: 
 126:                   var languageButton = target.closest(".language-current");
 127: 
 128:                   if (languageButton) {
 129:                     var isPc = window.matchMedia(
 130:                       "(hover: hover) and (pointer: fine)"
 131:                     ).matches;
 132: 
 133:                     if (isPc) return;
 134: 
 135:                     event.preventDefault();
 136: 
 137:                     var languageWrap = languageButton.closest(".language-switcher");
 138: 
 139:                     document.documentElement.classList.remove("mobile-nav-open");
 140: 
 141:                     var openMenuButton = document.querySelector(".mobile-menu-btn");
 142: 
 143:                     if (openMenuButton) {
 144:                       openMenuButton.setAttribute("aria-expanded", "false");
 145:                     }
 146: 
 147:                     if (!languageWrap) return;
 148: 
 149:                     var nextLanguageOpen =
 150:                       !languageWrap.classList.contains("language-switcher-open");
 151: 
 152:                     languageWrap.classList.toggle(
 153:                       "language-switcher-open",
 154:                       nextLanguageOpen
 155:                     );
 156: 
 157:                     languageButton.setAttribute(
 158:                       "aria-expanded",
 159:                       String(nextLanguageOpen)
 160:                     );
 161: 
 162:                     return;
 163:                   }
 164: 
 165:                   var mobileNavLink = target.closest(".mobile-nav-link");
 166: 
 167:                   if (mobileNavLink) {
 168:                     document.documentElement.classList.remove("mobile-nav-open");
 169: 
 170:                     var currentMenuButton = document.querySelector(".mobile-menu-btn");
 171: 
 172:                     if (currentMenuButton) {
 173:                       currentMenuButton.setAttribute("aria-expanded", "false");
 174:                     }
 175: 
 176:                     return;
 177:                   }
 178: 
 179:                   var languageItem = target.closest(".language-menu-item");
 180: 
```

## 13. products.css 按钮区域

文件路径：F:\WebsiteProjects\foreach-website-2026\app\products\products.css

`$Lang
2200:   display: flex !important;
2201:   flex: 1 !important;
2202:   flex-direction: column !important;
2203:   border-top: 1px solid var(--line, #e5ebf2) !important;
2204:   box-sizing: border-box !important;
2205: }
2206: 
2207: /* 型号保持大和粗，只让它靠左 */
2208: .products-selection-page .product-title {
2209:   margin: 0 0 10px !important;
2210:   color: var(--brand-blue, #173368) !important;
2211:   font-size: 22px !important;
2212:   line-height: 1.25 !important;
2213:   font-weight: 650 !important;
2214:   text-align: left !important;
2215:   white-space: nowrap !important;
2216: }
2217: 
2218: /* 参数文字靠左 */
2219: .products-selection-page .product-param-line {
2220:   margin-top: 0 !important;
2221:   color: rgba(23, 51, 104, 0.82) !important;
2222:   font-size: 15px !important;
2223:   line-height: 1.55 !important;
2224:   font-weight: 400 !important;
2225:   text-align: left !important;
2226: }
2227: 
2228: /* 按钮区域压缩，不再留太多空白 */
2229: .products-selection-page .product-actions {
2230:   margin-top: 12px !important;
2231:   padding-top: 0 !important;
2232:   display: grid !important;
2233:   grid-template-columns: 1fr 1fr !important;
2234:   gap: 10px !important;
2235: }
2236: 
2237: .products-selection-page .product-link,
2238: .products-selection-page .list-toggle {
2239:   height: 38px !important;
2240:   min-height: 38px !important;
2241:   padding: 0 12px !important;
2242:   font-size: 13px !important;
2243:   font-weight: 700 !important;
2244: }
2245: 
2246: @media (max-width: 760px) {
2247:   .products-selection-page .product-card {
2248:     min-height: auto !important;
2249:   }
2250: 
2251:   .products-selection-page .product-image {
2252:     height: 190px !important;
2253:   }
2254: 
2255:   .products-selection-page .product-image img {
2256:     max-height: 170px !important;
2257:   }
2258: 
2259:   .products-selection-page .product-body {
2260:     min-height: auto !important;
2261:     padding: 16px 12px 16px !important;
2262:   }
2263: 
2264:   .products-selection-page .product-title {
2265:     font-size: 18px !important;
2266:   }
2267: 
2268:   .products-selection-page .product-param-line {
2269:     font-size: 13px !important;
2270:   }
2271: 
2272:   .products-selection-page .product-actions {
2273:     margin-top: 10px !important;
2274:     gap: 8px !important;
2275:   }
2276: 
2277:   .products-selection-page .product-link,
2278:   .products-selection-page .list-toggle {
2279:     height: 36px !important;
2280:     min-height: 36px !important;
2281:   }
2282: }
2283: 
2284: /* ===== FOREACH product card final stable END ===== */
2285: 
2286: 
2287: /* ===== FOREACH force product card title green START ===== */
2288: 
2289: /*
2290:   强制产品卡片型号在 hover / 选中状态下变为品牌绿色。
2291:   放在 CSS 最后，覆盖前面 final stable 里把标题改回深蓝色的规则。
2292: */
2293: 
2294: .products-selection-page .product-card:hover .product-title,
2295: .products-selection-page .product-card:focus-within .product-title,
2296: .products-selection-page .product-card:has(.list-toggle.active) .product-title,
2297: .products-selection-page .product-card:has(.list-toggle[aria-pressed="true"]) .product-title,
2298: .products-selection-page .product-card:has(.list-toggle[data-active="true"]) .product-title,
2299: .products-selection-page .product-card:has(.list-toggle.is-active) .product-title,
2300: .products-selection-page .product-card.active .product-title,
2301: .products-selection-page .product-card.selected .product-title,
2302: .products-selection-page .product-card.is-selected .product-title,
2303: .products-selection-page .product-card[data-selected="true"] .product-title {
2304:   color: var(--brand-cyan, #09e9b4) !important;
2305: }
2306: 
2307: /* ===== FOREACH force product card title green END ===== */
2308: 
2309: /* 产品中心：产品卡片响应式布局
2310:    说明：
2311:    1. 大屏保持一排 3 张产品卡片
2312:    2. 中等屏幕、浏览器缩放、笔记本屏幕改为一排 2 张
2313:    3. 手机屏幕也保持一排 2 张
2314:    4. 只作用于产品中心页面，不影响全站样式
2315: ========================================================= */
2316: 
2317: .products-selection-page {
2318:   max-width: 100%;
2319:   overflow-x: clip;
2320: }
2321: 
2322: .products-selection-page .product-area,
2323: .products-selection-page .product-grid,
2324: .products-selection-page .product-grid > * {
2325:   min-width: 0 !important;
2326: }
2327: 
2328: /* 中等屏幕及以下：统一 2 个一排 */
2329: @media (max-width: 1500px) {
2330:   .products-selection-page .product-grid {
2331:     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
2332:   }
2333: 
2334:   .products-selection-page .product-card,
2335:   .products-selection-page .product-card-link {
2336:     min-width: 0 !important;
2337:   }
2338: }
2339: 
2340: /* 手机屏幕：仍然保持 2 个一排，不切成 1 个一排 */
2341: @media (max-width: 900px) {
2342:   .products-selection-page .product-grid {
2343:     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
2344:   }
2345: }
2346: 
2347: /* 极窄屏保护：防止按钮和文字撑破卡片 */
2348: @media (max-width: 520px) {
2349:   .products-selection-page .product-grid {
2350:     gap: 10px !important;
2351:   }
2352: 
2353:   .products-selection-page .product-card {
2354:     min-width: 0 !important;
2355:   }
2356: 
2357:   .products-selection-page .product-card h3,
2358:   .products-selection-page .product-card-title,
2359:   .products-selection-page .product-name {
2360:     font-size: 16px !important;
2361:     line-height: 1.25 !important;
2362:   }
2363: }
2364: 
2365: /* 产品型号保护：允许换行，不强制省略 */
2366: .products-selection-page .product-card h3,
2367: .products-selection-page .product-card-title,
2368: .products-selection-page .product-name {
2369:   white-space: normal !important;
2370:   overflow: visible !important;
2371:   text-overflow: clip !important;
2372:   overflow-wrap: anywhere;
2373: }
2374: 
2375: /* 产品中心：固定产品卡片视觉比例
2376:    说明：
2377:    1. 不写死卡片宽度，让 grid 负责 3 列 / 2 列布局
2378:    2. 固定产品图区域比例，避免缩放时图片区域忽高忽低
2379:    3. 固定内容区最小高度，保证同一行卡片视觉统一
2380:    4. 按钮区域靠底，避免按钮上下跳动
2381: ========================================================= */
2382: 
2383: .products-selection-page .product-card {
2384:   height: 100%;
2385:   min-height: 430px;
2386:   display: flex;
2387:   flex-direction: column;
2388: }
2389: 
2390: /* 产品图区域：固定比例 */
2391: .products-selection-page .product-card-image,
2392: .products-selection-page .product-image,
2393: .products-selection-page .product-card-media {
2394:   aspect-ratio: 4 / 3;
2395:   min-height: 210px;
2396:   max-height: 260px;
2397:   display: flex;
2398:   align-items: center;
2399:   justify-content: center;
2400:   overflow: hidden;
2401: }
2402: 
2403: /* 产品图本身：保持完整显示，不裁切产品 */
2404: .products-selection-page .product-card-image img,
2405: .products-selection-page .product-image img,
2406: .products-selection-page .product-card-media img {
2407:   width: 100%;
2408:   height: 100%;
2409:   object-fit: contain;
2410: }
2411: 
2412: /* 产品文字区域：统一高度，避免按钮被内容挤得上下不齐 */
2413: .products-selection-page .product-card-content,
2414: .products-selection-page .product-card-body {
2415:   flex: 1;
2416:   display: flex;
2417:   flex-direction: column;
2418: }
2419: 
2420: /* 产品型号：允许换行，但不要被省略 */
2421: .products-selection-page .product-card h3,
2422: .products-selection-page .product-card-title,
2423: .products-selection-page .product-name {
2424:   min-height: 32px;
2425:   white-space: normal !important;
2426:   overflow: visible !important;
2427:   text-overflow: clip !important;
2428:   overflow-wrap: anywhere;
2429: }
2430: 
2431: /* 产品描述：给一个稳定高度 */
2432: .products-selection-page .product-card-description,
2433: .products-selection-page .product-card-specs,
2434: .products-selection-page .product-summary {
2435:   min-height: 72px;
2436: }
2437: 
2438: /* 按钮区域固定在底部 */
2439: .products-selection-page .product-card-actions,
2440: .products-selection-page .product-actions {
2441:   margin-top: auto;
2442: }
2443: 
2444: /* 中等屏幕：卡片略微降低高度，避免页面过长 */
2445: @media (max-width: 1500px) {
2446:   .products-selection-page .product-card {
2447:     min-height: 400px;
2448:   }
2449: 
2450:   .products-selection-page .product-card-image,
2451:   .products-selection-page .product-image,
2452:   .products-selection-page .product-card-media {
2453:     min-height: 190px;
2454:     max-height: 230px;
2455:   }
2456: }
2457: 
2458: /* 手机 / 小窗口：仍保持 2 个一排，但卡片比例压缩一点 */
2459: @media (max-width: 520px) {
2460:   .products-selection-page .product-card {
2461:     min-height: 360px;
2462:   }
2463: 
2464:   .products-selection-page .product-card-image,
2465:   .products-selection-page .product-image,
2466:   .products-selection-page .product-card-media {
2467:     min-height: 150px;
2468:     max-height: 180px;
2469:   }
2470: 
2471:   .products-selection-page .product-card h3,
2472:   .products-selection-page .product-card-title,
2473:   .products-selection-page .product-name {
2474:     font-size: 15px !important;
2475:   }
2476: }
2477: 
2478: /* 产品中心：修复产品类型当前项宽度
2479:    说明：
2480:    1. 产品类型是唯一一个桌面端也需要折叠的筛选组
2481:    2. 折叠后仍然要显示“当前：柱塞泵”
2482:    3. 当前项要和普通筛选项一样撑满一整行
2483:    4. 桌面端产品类型标题右侧必须显示 + / -
2484: ========================================================= */
2485: 
2486: /* 桌面端：产品类型标题保持原筛选标题风格，同时右侧显示 + / - */
2487: .products-selection-page .product-type-filter-group .filter-group-trigger {
2488:   width: 100%;
2489:   min-height: auto;
2490:   margin: 0;
2491:   padding: 15px 18px 8px;
2492:   border: 0;
2493:   background: transparent;
2494:   display: flex !important;
2495:   align-items: center;
2496:   justify-content: space-between;
2497:   color: var(--brand-blue);
2498:   font-family: inherit;
2499:   font-size: 14px;
2500:   font-weight: 920;
2501:   line-height: 1.35;
2502:   text-align: left;
2503:   cursor: pointer;
2504: }
2505: 
2506: /* 桌面端：强制产品类型右侧 + / - 显示出来 */
2507: .products-selection-page .product-type-filter-group .filter-group-symbol {
2508:   display: inline-flex !important;
2509:   align-items: center;
2510:   justify-content: center;
2511:   min-width: 20px;
2512:   margin-left: auto;
2513:   color: var(--brand-blue);
2514:   font-size: 18px;
2515:   font-weight: 900;
2516:   line-height: 1;
2517: }
2518: 
2519: /* 产品类型折叠后的当前项区域：恢复和普通筛选项一致的左右间距 */
2520: .products-selection-page .product-type-current-option {
2521:   padding: 0 12px 16px;
2522: }
2523: 
2524: /* 当前：柱塞泵 要撑满整行，不要只包住文字 */
2525: .products-selection-page .product-type-current-option .filter-option {
2526:   width: 100%;
2527:   min-height: 42px;
2528:   justify-content: flex-start;
2529: }
2530: 
2531: /* 桌面端：产品类型未展开时只显示当前项，不显示完整选项 */
2532: @media (min-width: 901px) {
2533:   .products-selection-page .product-type-filter-group:not(.is-mobile-open) > .filter-options {
2534:     display: none !important;
2535:   }
2536: 
2537:   .products-selection-page .product-type-filter-group.is-mobile-open > .filter-options {
2538:     display: grid !important;
2539:   }
2540: }
2541: 
2542: /* 产品中心：产品种类介绍区最终整理版
2543:    说明：
2544:    1. 这是产品中心顶部产品种类介绍区的唯一最终样式
2545:    2. 左侧产品图固定占位，右侧正文吃满剩余空间
2546:    3. HaloFlx 仅作为右下角背景装饰，不参与布局、不预留空间
2547:    4. 只加粗 .product-type-intro-emphasis 包住的指定文字
2548: ========================================================= */
2549: 
2550: .products-selection-page .product-type-intro-module {
2551:   position: relative !important;
2552:   isolation: isolate !important;
2553:   width: 100% !important;
2554:   margin: 0 0 28px !important;
2555:   padding: 24px 0 24px 0 !important;
2556:   display: grid !important;
2557:   grid-template-columns: 430px minmax(0, 1fr) !important;
2558:   gap: 46px !important;
2559:   align-items: center !important;
2560:   justify-content: stretch !important;
2561:   overflow: hidden !important;
2562:   border: 0 !important;
2563:   border-top: 1px solid var(--line) !important;
2564:   background: transparent !important;
2565: }
2566: 
2567: /* 左侧产品图 */
2568: .products-selection-page .product-type-intro-image {
2569:   position: relative !important;
2570:   z-index: 2 !important;
2571:   width: 430px !important;
2572:   height: 320px !important;
2573:   display: flex !important;
2574:   align-items: center !important;
2575:   justify-content: center !important;
2576:   overflow: visible !important;
2577:   border: 0 !important;
2578:   background: transparent !important;
2579: }
2580: 
2581: .products-selection-page .product-type-intro-image img {
2582:   width: 100% !important;
2583:   height: 100% !important;
2584:   object-fit: contain !important;
2585:   transform: scale(1.16) !important;
2586:   transform-origin: center center !important;
2587: }
2588: 
2589: /* 右侧文字：不再限宽，让正文铺到右侧 */
2590: .products-selection-page .product-type-intro-copy {
2591:   position: relative !important;
2592:   z-index: 2 !important;
2593:   width: 100% !important;
2594:   max-width: none !important;
2595:   min-width: 0 !important;
2596:   padding-top: 2px !important;
2597: }
2598: 
2599: .products-selection-page .product-type-intro-copy h2 {
2600:   margin: 0 0 14px !important;
2601:   color: var(--brand-blue) !important;
2602:   font-size: 31px !important;
2603:   font-weight: 820 !important;
2604:   line-height: 1.22 !important;
2605: }
2606: 
2607: .products-selection-page .product-type-intro-copy p {
2608:   margin: 0 !important;
2609:   color: #111111 !important;
2610:   font-size: 16.5px !important;
2611:   font-weight: 460 !important;
2612:   line-height: 1.95 !important;
2613: }
2614: 
2615: .products-selection-page .product-type-intro-copy p + p {
2616:   margin-top: 14px !important;
2617: }
2618: 
2619: /* 只加粗指定文字，不加粗整段 */
2620: .products-selection-page .product-type-intro-copy .product-type-intro-emphasis {
2621:   color: #111111 !important;
2622:   font-weight: 800 !important;
2623: }
2624: 
2625: /* HaloFlx 右下角装饰字：背景层，不占空间 */
2626: .products-selection-page .product-type-intro-module::after {
2627:   content: "HaloFlx";
2628:   position: absolute !important;
2629:   z-index: 1 !important;
2630:   top: auto !important;
2631:   right: 28px !important;
2632:   bottom: 18px !important;
2633:   transform: none !important;
2634:   color: #09E9B4 !important;
2635:   font-size: 86px !important;
2636:   font-weight: 840 !important;
2637:   line-height: 1 !important;
2638:   letter-spacing: -0.05em !important;
2639:   opacity: 0.14 !important;
2640:   white-space: nowrap !important;
2641:   pointer-events: none !important;
2642:   user-select: none !important;
2643: }
2644: 
2645: /* 中等屏幕 */
2646: @media (max-width: 1400px) {
2647:   .products-selection-page .product-type-intro-module {
2648:     padding: 24px 0 22px 0 !important;
2649:     grid-template-columns: 390px minmax(0, 1fr) !important;
2650:     gap: 38px !important;
2651:   }
2652: 
2653:   .products-selection-page .product-type-intro-image {
2654:     width: 390px !important;
2655:     height: 290px !important;
2656:   }
2657: 
2658:   .products-selection-page .product-type-intro-image img {
2659:     transform: scale(1.14) !important;
2660:   }
2661: 
2662:   .products-selection-page .product-type-intro-copy h2 {
2663:     font-size: 28px !important;
2664:   }
2665: 
2666:   .products-selection-page .product-type-intro-copy p {
2667:     font-size: 16px !important;
2668:     line-height: 1.9 !important;
2669:   }
2670: 
2671:   .products-selection-page .product-type-intro-module::after {
2672:     right: 18px !important;
2673:     bottom: 16px !important;
2674:     font-size: 70px !important;
2675:     opacity: 0.13 !important;
2676:   }
2677: }
2678: 
2679: /* 手机端 */
2680: @media (max-width: 900px) {
2681:   .products-selection-page .product-type-intro-module {
2682:     margin-bottom: 20px !important;
2683:     padding: 22px 0 20px !important;
2684:     grid-template-columns: 1fr !important;
2685:     gap: 14px !important;
2686:   }
2687: 
2688:   .products-selection-page .product-type-intro-image {
2689:     width: 100% !important;
2690:     height: 230px !important;
2691:   }
2692: 
2693:   .products-selection-page .product-type-intro-image img {
2694:     transform: scale(1.08) !important;
2695:   }
2696: 
2697:   .products-selection-page .product-type-intro-copy {
2698:     max-width: none !important;
2699:     padding-top: 0 !important;
2700:   }
2701: 
2702:   .products-selection-page .product-type-intro-copy h2 {
2703:     font-size: 22px !important;
2704:     font-weight: 800 !important;
2705:   }
2706: 
2707:   .products-selection-page .product-type-intro-copy p {
2708:     font-size: 14px !important;
2709:     line-height: 1.78 !important;
2710:   }
2711: 
2712:   .products-selection-page .product-type-intro-module::after {
2713:     display: none !important;
2714:   }
2715: }
2716: /* 产品中心：取消左侧筛选栏吸顶
2717:    说明：
2718:    1. 左侧筛选栏不再随着页面滚动一直停在顶部
2719:    2. 让筛选栏恢复普通文档流位置
2720:    3. 只影响产品中心页面，不影响 Header、顶部搜索、产品卡片
2721: ========================================================= */
2722: 
2723: .products-selection-page .filter-panel,
2724: .products-selection-page .product-filter-panel,
2725: .products-selection-page .selection-filter-panel,
2726: .products-selection-page .selection-layout > aside {
2727:   position: static !important;
2728:   top: auto !important;
2729:   align-self: start !important;
2730:   height: auto !important;
2731:   max-height: none !important;
2732:   overflow: visible !important;
2733: }
2734: 
2735: 
2736: /* =========================================================
2737:    产品中心：产品卡片核心参数三行文案
2738:    说明：
2739:    1. 文案来自数据层，不在组件里写死
2740:    2. 只展示接口、重复性、满量程分辨率
2741:    3. 不做电商风标签，保持 B2B 工业精密感
2742: ========================================================= */
2743: 
2744: .product-card-specs {
2745:   display: grid;
2746:   gap: 5px;
2747:   margin: 10px 0 0;
2748:   padding: 0;
2749:   list-style: none;
2750:   color: #233a5a;
2751:   font-size: 13px;
2752:   line-height: 1.45;
2753:   text-align: left;
2754: }
2755: 
2756: .product-card-specs li {
2757:   position: relative;
2758:   padding-left: 12px;
2759: }
2760: 
2761: .product-card-specs li::before {
2762:   content: "";
2763:   position: absolute;
2764:   left: 0;
2765:   top: 0.72em;
2766:   width: 4px;
2767:   height: 4px;
2768:   border-radius: 999px;
2769:   background: #09E9B4;
2770: }
2771: 
2772: /* =========================================================
2773:    产品中心：卡片三行参数文字微调
2774:    说明：
2775:    1. 不修改产品图片
2776:    2. 去掉绿色圆点
2777:    3. 三行参数整体略微上移
2778:    4. 参数文字加大 4px
2779: ========================================================= */
2780: 
2781: .products-selection-page .product-card-specs {
2782:   margin-top: -4px;
2783:   font-size: 15px;
2784:   line-height: 1.55;
2785: }
2786: 
2787: .products-selection-page .product-card-specs li {
2788:   padding-left: 0;
2789: }
2790: 
2791: .products-selection-page .product-card-specs li::before {
2792:   display: none;
2793: }
2794: 
2795: 
2796: /* =========================================================
2797:    产品中心：卡片三行参数间距收紧
2798:    说明：
2799:    1. 只调整三行参数之间的距离
2800:    2. 不修改图片、标题、按钮
2801: ========================================================= */
2802: 
2803: .products-selection-page .product-card-specs {
2804:   gap: 3px;
2805:   line-height: 1.35;
2806: }
2807: 
2808: 
2809: /* =========================================================
2810:    产品中心：手机端产品卡片字号最终修正
2811:    说明：
2812:    1. 放在 products.css 最后，用于压住前面重复样式
2813:    2. 只影响手机端产品卡片
2814:    3. 收小型号、三行参数和按钮文字
2815:    4. 不影响桌面端
2816: ========================================================= */
2817: @media (max-width: 900px) {
2818:   .products-selection-page .product-card .product-title,
2819:   .products-selection-page .product-card h3,
2820:   .products-selection-page .product-card-title,
2821:   .products-selection-page .product-name {
2822:     font-size: 16px !important;
2823:     line-height: 1.22 !important;
2824:     min-height: auto !important;
2825:     margin-bottom: 8px !important;
2826:   }
2827: 
2828:   .products-selection-page .product-param-line,
2829:   .products-selection-page .product-card-specs,
2830:   .products-selection-page .product-card-specs li,
2831:   .products-selection-page .product-card-description,
2832:   .products-selection-page .product-summary {
2833:     font-size: 12px !important;
2834:     line-height: 1.38 !important;
2835:   }
2836: 
2837:   .products-selection-page .product-card-specs {
2838:     min-height: 56px !important;
2839:     margin-top: -2px !important;
2840:     gap: 2px !important;
2841:   }
2842: 
2843:   .products-selection-page .product-actions,
2844:   .products-selection-page .product-card-actions {
2845:     margin-top: 8px !important;
2846:     gap: 8px !important;
2847:   }
2848: 
2849:   .products-selection-page .product-link,
2850:   .products-selection-page .list-toggle {
2851:     height: 32px !important;
2852:     min-height: 32px !important;
2853:     padding: 0 8px !important;
2854:     font-size: 12px !important;
2855:     line-height: 1 !important;
2856:   }
2857: }
2858: 
```

## 14. 目标功能判断

1. 添加图纸：应把当前产品加入清单，并标记 requestType = drawing。
2. 申请3D：应把当前产品加入清单，并标记 requestType = model3d。
3. 加入清单：应把当前产品加入普通清单，并标记 requestType = product。
4. 三个动作都不直接下载文件。
5. 如果现有 SelectionCartProvider 已经支持 item 类型，就复用；如果不支持，需要扩展 type。
6. 移动端按钮需要考虑三按钮排布，不能挤爆卡片。
