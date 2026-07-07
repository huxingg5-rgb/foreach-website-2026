# ProductDetailClient 按钮重复与残留检查

## 1. 关键代码出现次数

- $p：2 次
- $p：2 次
- $p：5 次
- $p：5 次
- $p：3 次
- $p：3 次
- $p：4 次
- $p：1 次
- $p：3 次
- $p：3 次
- $p：3 次
- $p：1 次
- $p：1 次
- $p：0 次
- $p：0 次
- $p：2 次
- $p：1 次
- $p：1 次

---

## 2. ProductDetailClient 关键位置上下文


### Line 4

"use client";


import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
/* =========================================================
   ProductDetailClient.tsx
   恒永达官网｜中文产品详情页

   重要说明：
   1. 页面结构严格按照用户提供的 HTML 转换。
   2. 未经要求，不调整原始布局、间距、字号与视觉。
   3. 当前明确改动仅包括：
      - 主型号 EA-100-PMMA
      - 添加规格书按钮
      - 申请3D文件按钮
      - 中文不显示保修
      - 主图悬停放大

### Line 226

  );
}

export default function ProductDetailClient({
  data,
}: ProductDetailClientProps) {
    const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();

const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  const realImages = useMemo(() => {
    const images: string[] = [];

    if (data.mainImage) {

### Line 372

        data.detailHref ||
        data.href ||
        (data.slug ? `/products/pumps/diaphragm-pumps/${data.slug}` : ""),
    };
  }

  function addDetailProductToCart(needDrawing: boolean) {
    const item = createDetailCartItem(needDrawing);

    if (!item.productCode || !item.foreachModel) {
      console.warn("详情页清单参数不完整", data);
      return;
    }

    const existingItem = getItem("pump-selection", item.productCode);

    if (existingItem) {
      if (needDrawing && !existingItem.needDrawing) {
        toggleDrawingNeed(existingItem.id, true);
      } else {
        addItem(item);

### Line 393

      }
      return;
    }

    addItem(item);
  }
  const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
  const isDetailProductSelected = Boolean(currentDetailCartItem);
  const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    const item = createDetailCartItem(true);


### Line 394

      return;
    }

    addItem(item);
  }
  const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
  const isDetailProductSelected = Boolean(currentDetailCartItem);
  const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    const item = createDetailCartItem(true);

    if (!item.productCode || !item.foreachModel) {

### Line 395

    }

    addItem(item);
  }
  const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
  const isDetailProductSelected = Boolean(currentDetailCartItem);
  const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    const item = createDetailCartItem(true);

    if (!item.productCode || !item.foreachModel) {
      console.warn("详情页清单参数不完整", data);

### Line 405

  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    const item = createDetailCartItem(true);

    if (!item.productCode || !item.foreachModel) {
      console.warn("详情页清单参数不完整", data);
      return;
    }

    const existingItem = getItem("pump-selection", item.productCode);

    if (existingItem) {
      toggleDrawingNeed(existingItem.id, !existingItem.needDrawing);
      return;
    }


### Line 427

  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    const item = createDetailCartItem(false);

    if (!item.productCode || !item.foreachModel) {
      console.warn("详情页清单参数不完整", data);
      return;
    }

    const existingItem = getItem("pump-selection", item.productCode);

    if (existingItem) {
      removeItem(existingItem.id);
      return;
    }


### Line 783

                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    {isDetailDrawingSelected ? "已添加图纸" : "添加图纸"}
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>

### Line 784


                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    {isDetailDrawingSelected ? "已添加图纸" : "添加图纸"}
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

### Line 786

                  <button
                    className={styles.button}
                    type="button"
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    {isDetailDrawingSelected ? "已添加图纸" : "添加图纸"}
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button

### Line 803

                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  {isDetailProductSelected ? "已加入清单" : "加入清单"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label="产品资料切换">
            <button
              className={[
                styles.tabButton,

### Line 804

                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  {isDetailProductSelected ? "已加入清单" : "加入清单"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label="产品资料切换">
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",

### Line 806

                <button
                  className={styles.button}
                  type="button"
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  {isDetailProductSelected ? "已加入清单" : "加入清单"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label="产品资料切换">
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)

---

## 3. 精准提取添加图纸按钮块 / 加入清单按钮块

### handleAddDrawing锛岃捣濮嬭锛?80
```tsx
<button
                    className={styles.button}
                    type="button"
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    {isDetailDrawingSelected ? "宸叉坊鍔犲浘绾? : "娣诲姞鍥剧焊"}
                  </button>
```

### handleAddList锛岃捣濮嬭锛?00
```tsx
<button
                  className={styles.button}
                  type="button"
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  {isDetailProductSelected ? "宸插姞鍏ユ竻鍗? : "鍔犲叆娓呭崟"}
                </button>
```

### addDetailProductToCart锛岃捣濮嬭锛?72
```tsx
function addDetailProductToCart(needDrawing: boolean) {
    const item = createDetailCartItem(needDrawing);

    if (!item.productCode || !item.foreachModel) {
      console.warn("璇︽儏椤垫竻鍗曞弬鏁颁笉瀹屾暣", data);
      return;
    }

    const existingItem = getItem("pump-selection", item.productCode);

    if (existingItem) {
      if (needDrawing && !existingItem.needDrawing) {
        toggleDrawingNeed(existingItem.id, true);
      } else {
        addItem(item);
      }
      return;
    }

    addItem(item);
  }
```

### handleAddDrawing锛岃捣濮嬭锛?05
```tsx
function handleAddDrawing() {
    const item = createDetailCartItem(true);

    if (!item.productCode || !item.foreachModel) {
      console.warn("璇︽儏椤垫竻鍗曞弬鏁颁笉瀹屾暣", data);
      return;
    }

    const existingItem = getItem("pump-selection", item.productCode);

    if (existingItem) {
      toggleDrawingNeed(existingItem.id, !existingItem.needDrawing);
      return;
    }

    addItem(item);
  }
```

### handleAddList锛岃捣濮嬭锛?27
```tsx
function handleAddList() {
    const item = createDetailCartItem(false);

    if (!item.productCode || !item.foreachModel) {
      console.warn("璇︽儏椤垫竻鍗曞弬鏁颁笉瀹屾暣", data);
      return;
    }

    const existingItem = getItem("pump-selection", item.productCode);

    if (existingItem) {
      removeItem(existingItem.id);
      return;
    }

    addItem(item);
  }
```


---

## 4. CSS 里可能重复的按钮选中样式

- $p：2 次
- $p：0 次
- $p：0 次
- $p：0 次
- $p：0 次

### CSS Line 2209

/* ===== FOREACH product detail FAQ fixed area final END ===== */



/* ===== FOREACH product detail button pressed state START ===== */
/* 详情页按钮选中态：保持原按钮结构，只在 aria-pressed=true 时显示已选中 */
.button[aria-pressed="true"] {
  background: var(--brand-blue, #005bac) !important;
  border-color: var(--brand-blue, #005bac) !important;
  color: #ffffff !important;
}

.button[aria-pressed="true"]:hover {
  background: var(--brand-blue, #005bac) !important;
  border-color: var(--brand-blue, #005bac) !important;
  color: #ffffff !important;
}

### CSS Line 2222

  background: var(--brand-blue, #005bac) !important;
  border-color: var(--brand-blue, #005bac) !important;
  color: #ffffff !important;
}
/* ===== FOREACH product detail button pressed state END ===== */

---

## 5. 当前 git diff

diff --git a/components/products/detail/ProductDetailClient.tsx b/components/products/detail/ProductDetailClient.tsx
index 98c85a6..f5a32e4 100644
--- a/components/products/detail/ProductDetailClient.tsx
+++ b/components/products/detail/ProductDetailClient.tsx
@@ -1,5 +1,8 @@
 "use client";
 
+
+import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
+import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
 /* =========================================================
    ProductDetailClient.tsx
    鎭掓案杈惧畼缃戯綔涓枃浜у搧璇︽儏椤?@@ -28,7 +31,7 @@ import styles from "./product-detail.module.css";
 type ProductDetailTab = "spec" | "model3d" | "drawing";
 
 type ProductDetailClientProps = {
-  data: ProductDetailPageData;
+  data: ProductDetailPageData & Record<string, any>;
 };
 
 type ZoomStyle = CSSProperties & {
@@ -139,17 +142,41 @@ function isPlungerPumpDetailData(data: any): boolean {
   );
 }
 
+function isDiaphragmPumpDetailData(data: any): boolean {
+  const text = JSON.stringify(data || {}).toLowerCase();
+
+  return (
+    text.includes("闅旇啘娉?) ||
+    text.includes("diaphragm pump") ||
+    text.includes("diaphragm-pump") ||
+    text.includes("diaphragm-pumps") ||
+    text.includes("dpl30") ||
+    text.includes("dpl60") ||
+    text.includes("dpl30h") ||
+    text.includes("dpgl800")
+  );
+}
+
 function getPlungerPumpBottomCta(data: any) {
-  if (!isPlungerPumpDetailData(data)) {
-    return null;
+  if (isPlungerPumpDetailData(data)) {
+    return {
+      title: "鏌卞娉靛彲鏍规嵁鎮ㄧ殑璁惧闇€姹傝繘琛屽畾鍒?,
+      desc: "鎭掓案杈惧彲鏍规嵁鎮ㄧ殑璁惧缁撴瀯銆佺洰鏍囧閲忋€佹恫浣撳吋瀹规€с€佹帴鍙ｆ柟寮忋€佹帶鍒舵柟寮忓拰浣跨敤瀵垮懡瑕佹眰锛屽崗鍔╃‘璁ゆ煴濉炴车閰嶇疆銆佹车澶存潗璐ㄣ€佹煴濉炴潗璐ㄥ強娑茶矾闆嗘垚鏂规锛岄€傜敤浜?IVD 鍒嗘瀽浠€佸疄楠屽鑷姩鍖栬澶囧拰鐢熷懡绉戝浠櫒涓殑绮惧瘑娑蹭綋澶勭悊鍦烘櫙銆?,
+      button: "鎻愪氦瀹氬埗闇€姹?,
+      href: "/contact"
+    };
   }
 
-  return {
-    title: "鏌卞娉靛彲鏍规嵁鎮ㄧ殑璁惧闇€姹傝繘琛屽畾鍒?,
-    desc: "鎭掓案杈惧彲鏍规嵁鎮ㄧ殑璁惧缁撴瀯銆佺洰鏍囧閲忋€佹恫浣撳吋瀹规€с€佹帴鍙ｆ柟寮忋€佹帶鍒舵柟寮忓拰浣跨敤瀵垮懡瑕佹眰锛屽崗鍔╃‘璁ゆ煴濉炴车閰嶇疆銆佹车澶存潗璐ㄣ€佹煴濉炴潗璐ㄥ強娑茶矾闆嗘垚鏂规锛岄€傜敤浜?IVD 鍒嗘瀽浠€佸疄楠屽鑷姩鍖栬澶囧拰鐢熷懡绉戝浠櫒涓殑绮惧瘑娑蹭綋澶勭悊鍦烘櫙銆?,
-    button: "鎻愪氦瀹氬埗闇€姹?,
-    href: "/contact"
-  };
+  if (isDiaphragmPumpDetailData(data)) {
+    return {
+      title: "涓嶇‘瀹氬浣曢€夋嫨闅旇啘娉靛瀷鍙凤紵",
+      desc: "濡傛灉鎮ㄤ笉纭畾鍏蜂綋鍨嬪彿锛屽彲鏍规嵁浠嬭川绫诲瀷銆佹祦閲忋€佽€愬帇銆佽嚜鍚歌兘鍔涖€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄣ€佹车澶存潗璐ㄣ€佹帴鍙ｆ柟寮忓拰瀹夎绌洪棿绛変俊鎭仈绯绘垜浠€傛亽姘歌揪鍙崗鍔╂偍纭閫傚悎鑷姩鍖栦华鍣ㄦ恫璺殑闅旇啘娉甸厤缃€?,
+      button: "鑱旂郴宸ョ▼甯堢‘璁?,
+      href: "/contact"
+    };
+  }
+
+  return null;
 }
 
 function getModelActionHref(data: any): string {
@@ -196,7 +223,9 @@ function PlungerPumpBottomCta({ data }: { data: any }) {
 export default function ProductDetailClient({
   data,
 }: ProductDetailClientProps) {
-  const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
+    const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();
+
+const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
   const [activeThumb, setActiveThumb] = useState(0);
   const [isZooming, setIsZooming] = useState(false);
@@ -289,6 +318,82 @@ export default function ProductDetailClient({
     setActiveThumb((current) => (current === 2 ? 0 : current + 1));
   }
 
+  function getDetailCartProductCode() {
+    return String(
+      data.modelDisplay ||
+        data.displayModel ||
+        data.foreachModel ||
+        data.model ||
+        data.productCode ||
+        data.slug ||
+        ""
+    ).trim();
+  }
+
+  function createDetailCartItem(needDrawing: boolean): SelectionCartItemInput {
+    const productCode = getDetailCartProductCode();
+    const modelText = String(
+      data.modelDisplay ||
+        data.displayModel ||
+        data.foreachModel ||
+        data.model ||
+        data.title ||
+        productCode
+    ).trim();
+
+    return {
+      sourceType: "pump-selection",
+      sourceLabel: "浜у搧璇︽儏椤?,
+      productName: String(
+        data.productTypeName ||
+          data.seriesName ||
+          data.series ||
+          "闅旇啘娉?
+      ).trim(),
+      productCode,
+      foreachModel: modelText,
+      competitorModels: [],
+      quantity: 1,
+      needDrawing,
+      imagePath:
+        data.imageCard ||
+        data.image ||
+        data.imageUrl ||
+        data.mainImage ||
+        data.heroImage ||
+        "",
+      detailHref:
+        data.detailHref ||
+        data.href ||
+        (data.slug ? `/products/pumps/diaphragm-pumps/${data.slug}` : ""),
+    };
+  }
+
+  function addDetailProductToCart(needDrawing: boolean) {
+    const item = createDetailCartItem(needDrawing);
+
+    if (!item.productCode || !item.foreachModel) {
+      console.warn("璇︽儏椤垫竻鍗曞弬鏁颁笉瀹屾暣", data);
+      return;
+    }
+
+    const existingItem = getItem("pump-selection", item.productCode);
+
+    if (existingItem) {
+      if (needDrawing && !existingItem.needDrawing) {
+        toggleDrawingNeed(existingItem.id, true);
+      } else {
+        addItem(item);
+      }
+      return;
+    }
+
+    addItem(item);
+  }
+  const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
+  const isDetailProductSelected = Boolean(currentDetailCartItem);
+  const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);
+
   function handleOpenConfigurator() {
     console.info("閰嶇疆閫夋嫨绔彛棰勭暀", data.slug);
   }
@@ -298,7 +403,21 @@ export default function ProductDetailClient({
   }
 
   function handleAddDrawing() {
-    console.info("娣诲姞鍥剧焊绔彛棰勭暀", data.slug);
+    const item = createDetailCartItem(true);
+
+    if (!item.productCode || !item.foreachModel) {
+      console.warn("璇︽儏椤垫竻鍗曞弬鏁颁笉瀹屾暣", data);
+      return;
+    }
+
+    const existingItem = getItem("pump-selection", item.productCode);
+
+    if (existingItem) {
+      toggleDrawingNeed(existingItem.id, !existingItem.needDrawing);
+      return;
+    }
+
+    addItem(item);
   }
 
   function handleRequest3DFile() {
@@ -306,7 +425,21 @@ export default function ProductDetailClient({
   }
 
   function handleAddList() {
-    console.info("鍔犲叆娓呭崟绔彛棰勭暀", data.slug);
+    const item = createDetailCartItem(false);
+
+    if (!item.productCode || !item.foreachModel) {
+      console.warn("璇︽儏椤垫竻鍗曞弬鏁颁笉瀹屾暣", data);
+      return;
+    }
+
+    const existingItem = getItem("pump-selection", item.productCode);
+
+    if (existingItem) {
+      removeItem(existingItem.id);
+      return;
+    }
+
+    addItem(item);
   }
 
   return (
@@ -607,7 +740,14 @@ export default function ProductDetailClient({
                     className={styles.button}
                     type="button"
                     onClick={() => {
-                      window.location.href = getModelActionHref(data);
+                      const href = getModelActionHref(data);
+
+                      if (isCustomInquiryMode(data)) {
+                        window.location.href = href;
+                        return;
+                      }
+
+                      window.open(href, "_blank", "noopener,noreferrer");
                     }}
                   >
                     {getModelActionText(data)}
@@ -640,9 +780,10 @@ export default function ProductDetailClient({
                   <button
                     className={styles.button}
                     type="button"
+                    aria-pressed={isDetailDrawingSelected}
                     onClick={handleAddDrawing}
                   >
-                    娣诲姞鍥剧焊
+                    {isDetailDrawingSelected ? "宸叉坊鍔犲浘绾? : "娣诲姞鍥剧焊"}
                   </button>
                 ) : null}
 
@@ -659,9 +800,10 @@ export default function ProductDetailClient({
                 <button
                   className={styles.button}
                   type="button"
+                  aria-pressed={isDetailProductSelected}
                   onClick={handleAddList}
                 >
-                  鍔犲叆娓呭崟
+                  {isDetailProductSelected ? "宸插姞鍏ユ竻鍗? : "鍔犲叆娓呭崟"}
                 </button>
               </div>
             </div>
diff --git a/components/products/detail/product-detail.module.css b/components/products/detail/product-detail.module.css
index 3f367c5..e2becd1 100644
--- a/components/products/detail/product-detail.module.css
+++ b/components/products/detail/product-detail.module.css
@@ -2103,3 +2103,120 @@
 
 /* ===== FOREACH model text same size bold END ===== */
 
+
+
+
+
+
+
+/* 璇︽儏椤碉細甯歌搴旂敤鏍囬涓嶅彉锛屽彧璋冩暣涓嬫柟搴旂敤鍐呭瀛楀彿 */
+.commonApplicationsText,
+.commonApplicationText,
+.applicationText,
+.applicationContent,
+.applicationItems,
+.applicationList,
+.productApplications,
+.productApplicationList,
+.scenarioText,
+.scenarioContent {
+  font-size: 18px;
+  line-height: 1.75;
+  font-weight: 400;
+}
+
+.commonApplicationsText li,
+.commonApplicationText li,
+.applicationText li,
+.applicationContent li,
+.applicationItems li,
+.applicationList li,
+.productApplications li,
+.productApplicationList li,
+.scenarioText li,
+.scenarioContent li,
+.commonApplicationsText span,
+.commonApplicationText span,
+.applicationText span,
+.applicationContent span,
+.applicationItems span,
+.applicationList span,
+.productApplications span,
+.productApplicationList span,
+.scenarioText span,
+.scenarioContent span {
+  font-size: 18px;
+  line-height: 1.75;
+  font-weight: 400;
+}
+
+
+
+
+
+
+
+
+
+
+
+
+/* ===== FOREACH product detail FAQ fixed area final START ===== */
+.faqSection {
+  height: 560px !important;
+  min-height: 560px !important;
+  margin-top: 36px !important;
+  margin-bottom: 50px !important;
+  padding-top: 0 !important;
+  padding-bottom: 0 !important;
+  overflow: hidden !important;
+}
+
+.faqList {
+  margin-bottom: 0 !important;
+  overflow: visible !important;
+}
+
+.faqItemOpen .faqAnswerWrap {
+  max-height: 190px !important;
+}
+
+.plungerBottomCta {
+  margin-top: 0 !important;
+}
+
+.plungerBottomCtaInner {
+  min-height: 250px !important;
+  padding: 58px 0 !important;
+}
+
+@media (max-width: 768px) {
+  .faqSection {
+    height: 520px !important;
+    min-height: 520px !important;
+    margin-top: 28px !important;
+    margin-bottom: 42px !important;
+  }
+
+  .faqItemOpen .faqAnswerWrap {
+    max-height: 220px !important;
+  }
+}
+/* ===== FOREACH product detail FAQ fixed area final END ===== */
+
+
+
+/* ===== FOREACH product detail button pressed state START ===== */
+/* 璇︽儏椤垫寜閽€変腑鎬侊細淇濇寔鍘熸寜閽粨鏋勶紝鍙湪 aria-pressed=true 鏃舵樉绀哄凡閫変腑 */
+.button[aria-pressed="true"] {
+  background: var(--brand-blue, #005bac) !important;
+  border-color: var(--brand-blue, #005bac) !important;
+  color: #ffffff !important;
+}
+
+.button[aria-pressed="true"]:hover {
+  background: var(--brand-blue, #005bac) !important;
+  border-color: var(--brand-blue, #005bac) !important;
+  color: #ffffff !important;
+}
+/* ===== FOREACH product detail button pressed state END ===== */

---

## 6. build 检查


> foreach-website-2026@0.1.0 build
> next build

鈻?Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
鉁?Compiled successfully in 6.0s
  Running TypeScript ...
  Finished TypeScript in 4.3s ...
  Collecting page data using 23 workers ...
  Generating static pages using 23 workers (0/577) ...
  Generating static pages using 23 workers (144/577) 
  Generating static pages using 23 workers (288/577) 
  Generating static pages using 23 workers (432/577) 
鉁?Generating static pages using 23 workers (577/577) in 1902ms
  Finalizing page optimization ...

Route (app)
鈹?鈼?/
鈹?鈼?/_not-found
鈹?鈼?/[locale]
鈹?鈹?/en
鈹?鈹?/es
鈹?鈹?/fr
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/culture
鈹?鈹?/en/about/culture
鈹?鈹?/es/about/culture
鈹?鈹?/fr/about/culture
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/foreach
鈹?鈹?/en/about/foreach
鈹?鈹?/es/about/foreach
鈹?鈹?/fr/about/foreach
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/history
鈹?鈹?/en/about/history
鈹?鈹?/es/about/history
鈹?鈹?/fr/about/history
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/quality
鈹?鈹?/en/about/quality
鈹?鈹?/es/about/quality
鈹?鈹?/fr/about/quality
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/research-manufacturing
鈹?鈹?/en/about/research-manufacturing
鈹?鈹?/es/about/research-manufacturing
鈹?鈹?/fr/about/research-manufacturing
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/analytical-instruments
鈹?鈹?/en/applications/analytical-instruments
鈹?鈹?/es/applications/analytical-instruments
鈹?鈹?/fr/applications/analytical-instruments
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/environmental-monitoring
鈹?鈹?/en/applications/environmental-monitoring
鈹?鈹?/es/applications/environmental-monitoring
鈹?鈹?/fr/applications/environmental-monitoring
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/ivd
鈹?鈹?/en/applications/ivd
鈹?鈹?/es/applications/ivd
鈹?鈹?/fr/applications/ivd
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/lab-automation
鈹?鈹?/en/applications/lab-automation
鈹?鈹?/es/applications/lab-automation
鈹?鈹?/fr/applications/lab-automation
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/life-science
鈹?鈹?/en/applications/life-science
鈹?鈹?/es/applications/life-science
鈹?鈹?/fr/applications/life-science
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/synthetic-biology
鈹?鈹?/en/applications/synthetic-biology
鈹?鈹?/es/applications/synthetic-biology
鈹?鈹?/fr/applications/synthetic-biology
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact
鈹?鈹?/en/contact
鈹?鈹?/es/contact
鈹?鈹?/fr/contact
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact/distributor
鈹?鈹?/en/contact/distributor
鈹?鈹?/es/contact/distributor
鈹?鈹?/fr/contact/distributor
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/products
鈹?鈹?/en/products
鈹?鈹?/es/products
鈹?鈹?/fr/products
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources
鈹?鈹?/en/resources
鈹?鈹?/es/resources
鈹?鈹?/fr/resources
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/datasheets
鈹?鈹?/en/resources/datasheets
鈹?鈹?/es/resources/datasheets
鈹?鈹?/fr/resources/datasheets
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide
鈹?鈹?/en/resources/installation-guide
鈹?鈹?/es/resources/installation-guide
鈹?鈹?/fr/resources/installation-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide/[slug]
鈹?鈹?/en/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/en/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/en/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+22 more paths]
鈹?鈼?/[locale]/resources/material-compatibility
鈹?鈹?/en/resources/material-compatibility
鈹?鈹?/es/resources/material-compatibility
鈹?鈹?/fr/resources/material-compatibility
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news
鈹?鈹?/en/resources/news
鈹?鈹?/es/resources/news
鈹?鈹?/fr/resources/news
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news/[slug]
鈹?鈹?/en/resources/news/adlm-2026
鈹?鈹?/en/resources/news/whx-labs-dubai-2026
鈹?鈹?/en/resources/news/gazelle-enterprise-2025
鈹?鈹?[+47 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement
鈹?鈹?/en/resources/selection-support/fitting-replacement
鈹?鈹?/es/resources/selection-support/fitting-replacement
鈹?鈹?/fr/resources/selection-support/fitting-replacement
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+172 more paths]
鈹?鈼?/[locale]/resources/technical-articles
鈹?鈹?/en/resources/technical-articles
鈹?鈹?/es/resources/technical-articles
鈹?鈹?/fr/resources/technical-articles
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/technical-articles/[slug]
鈹?鈹?/en/resources/technical-articles/selecting-microfluidic-fittings
鈹?鈹?/en/resources/technical-articles/peek-ptfe-pfa-material-differences
鈹?鈹?/en/resources/technical-articles/low-pressure-vs-high-pressure-fittings
鈹?鈹?[+57 more paths]
鈹?鈼?/about/culture
鈹?鈼?/about/foreach
鈹?鈼?/about/history
鈹?鈼?/about/quality
鈹?鈼?/about/research-manufacturing
鈹?鈼?/applications/analytical-instruments
鈹?鈼?/applications/environmental-monitoring
鈹?鈼?/applications/ivd
鈹?鈼?/applications/lab-automation
鈹?鈼?/applications/life-science
鈹?鈼?/applications/synthetic-biology
鈹?鈼?/contact
鈹?鈼?/contact/distributor
鈹?鈼?/products
鈹?鈼?/products/[category]
鈹?鈹?/products/pumps
鈹?鈼?/products/[category]/[slug]
鈹?鈹?/products/pumps/plunger-pumps
鈹?鈹?/products/pumps/diaphragm-pumps
鈹?鈹?/products/pumps/pipetting-pumps
鈹?鈹?[+17 more paths]
鈹?鈼?/products/[category]/[slug]/[seriesSlug]
鈹?鈹?/products/pumps/plunger-pumps/ea-standard-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/sm-miniature-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/tm-ultra-compact-piston-pumps
鈹?鈹?[+3 more paths]
鈹?鈼?/products/pumps/diaphragm-pumps/[slug]
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump
鈹?鈹?[+9 more paths]
鈹?鈼?/products/pumps/plunger-pumps/[slug]
鈹?鈹?/products/pumps/plunger-pumps/ea-100-pmma
鈹?鈹?/products/pumps/plunger-pumps/ea-100-peek
鈹?鈹?/products/pumps/plunger-pumps/ea-250-pmma
鈹?鈹?[+30 more paths]
鈹?鈼?/resources
鈹?鈼?/resources/datasheets
鈹?鈼?/resources/installation-guide
鈹?鈼?/resources/installation-guide/[slug]
鈹?鈹?/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/resources/material-compatibility
鈹?鈼?/resources/news
鈹?鈼?/resources/news/[slug]
鈹?鈹?/resources/news/adlm-2026
鈹?鈹?/resources/news/whx-labs-dubai-2026
鈹?鈹?/resources/news/gazelle-enterprise-2025
鈹?鈹?[+7 more paths]
鈹?鈼?/resources/selection-support/fitting-replacement
鈹?鈼?/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+32 more paths]
鈹?鈼?/resources/technical-articles
鈹?鈼?/resources/technical-articles/[slug]
  鈹?/resources/technical-articles/selecting-microfluidic-fittings
  鈹?/resources/technical-articles/peek-ptfe-pfa-material-differences
  鈹?/resources/technical-articles/low-pressure-vs-high-pressure-fittings
  鈹?[+9 more paths]


鈼? (Static)  prerendered as static content
鈼? (SSG)     prerendered as static HTML (uses generateStaticParams)

