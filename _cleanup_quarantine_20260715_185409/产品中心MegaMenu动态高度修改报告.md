# 产品中心 Mega Menu 动态高度修改报告

- 检查时间：2026-07-15 17:56:31
- 修改文件：`components/layout/SiteHeader.tsx`
- 修改前备份：`F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx.bak_product_mega_dynamic_height_20260715_175519`
- 动态高度代码开始标记：1
- 动态高度代码结束标记：1

## 修改效果

- 产品中心菜单宽度保持不变
- 左侧分类栏和右侧内容区同步变长、缩短
- 产品分类 hover 延迟 100ms
- 高度过渡时间 180ms
- 右侧内容淡入时间 160ms
- 应用领域不使用这套动态高度逻辑

## 本次精确差异

```diff
diff --git "a/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx.bak_product_mega_dynamic_height_20260715_175519" "b/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx"
index fb66856..5a09a9d 100644
--- "a/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx.bak_product_mega_dynamic_height_20260715_175519"
+++ "b/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx"
@@ -41,6 +41,15 @@ type OpenPanel = "none" | "language" | "mobileNav";
 // 璇█鍋忓ソ Cookie 鍚嶇О
 // 璇存槑锛氳繖閲屽繀椤诲拰 proxy.ts 閲岀殑 LOCALE_COOKIE_NAME 淇濇寔涓€鑷? const LOCALE_COOKIE_NAME = "foreach_locale";
+/**
+ * 浜у搧涓績 Mega Menu 鍔ㄦ晥璁℃椂鍣?+ *
+ * 浠呯敤浜?Products锛?+ * 1. hover 寤惰繜鍒囨崲
+ * 2. 楂樺害鍔ㄧ敾甯ф帶鍒?+ */
+let productMegaCategoryHoverTimer: number | null = null;
+let productMegaHeightAnimationFrame: number | null = null;
 
 const ENGLISH_LANGUAGE_LABELS: Record<LocaleCode, string> = {
   "zh-CN": "Chinese",
@@ -401,6 +410,244 @@ const isFittingReplacementDetailPage =
         // 濡傛灉娌℃湁浠讳綍鍗＄墖閰嶇疆 categoryKey锛屽氨鍏煎鏃ф暟鎹紝鍏ㄩ儴鏄剧ず
         if (!hasCategoryBoundCards) {
           return true;
+
+  /* PRODUCT_MEGA_DYNAMIC_HEIGHT_START */
+
+  /**
+   * 娓呴櫎浜у搧鍒嗙被 hover 寤惰繜銆?+   */
+  const clearProductMegaCategoryHoverTimer = () => {
+    if (productMegaCategoryHoverTimer !== null) {
+      window.clearTimeout(productMegaCategoryHoverTimer);
+      productMegaCategoryHoverTimer = null;
+    }
+  };
+
+  /**
+   * 浜у搧涓績寤惰繜鍒囨崲鍒嗙被銆?+   *
+   * 搴旂敤棰嗗煙淇濇寔鍘熸潵鐨勫嵆鏃跺垏鎹紝涓嶅彈杩欓噷褰卞搷銆?+   */
+  const handleMegaCategoryHover = (categoryKey: string) => {
+    if (activeMegaItem.key !== "products") {
+      setActiveMegaCategoryKey(categoryKey);
+      return;
+    }
+
+    clearProductMegaCategoryHoverTimer();
+
+    productMegaCategoryHoverTimer = window.setTimeout(() => {
+      setActiveMegaCategoryKey(categoryKey);
+      productMegaCategoryHoverTimer = null;
+    }, 100);
+  };
+
+  /**
+   * 缁勪欢閿€姣佹椂娓呯悊璁℃椂鍣ㄣ€?+   */
+  useEffect(() => {
+    return () => {
+      clearProductMegaCategoryHoverTimer();
+
+      if (productMegaHeightAnimationFrame !== null) {
+        window.cancelAnimationFrame(productMegaHeightAnimationFrame);
+        productMegaHeightAnimationFrame = null;
+      }
+    };
+  }, []);
+
+  /**
+   * 浜у搧涓績鍒嗙被鍒囨崲鏃讹細
+   *
+   * 1. 娴嬮噺褰撳墠鍒嗙被鎵€闇€鐨勮嚜鐒堕珮搴︼紱
+   * 2. 鏁翠釜宸﹀彸甯冨眬鍚屾鍙橀暱鎴栫缉鐭紱
+   * 3. 鍙充晶浜у搧鍐呭杞诲井娣″叆锛?+   * 4. 涓嶅奖鍝?Applications銆?+   */
+  useEffect(() => {
+    if (activeMegaItem.key !== "products") {
+      return;
+    }
+
+    const updateProductMegaHeight = () => {
+      const visibleMegaMain = Array.from(
+        document.querySelectorAll<HTMLElement>(".site-nav-mega-main"),
+      ).find((element) => element.offsetParent !== null);
+
+      if (!visibleMegaMain) {
+        return;
+      }
+
+      const megaLayout = visibleMegaMain.parentElement;
+
+      if (!megaLayout) {
+        return;
+      }
+
+      const layoutRect = megaLayout.getBoundingClientRect();
+
+      if (layoutRect.width <= 0) {
+        return;
+      }
+
+      /**
+       * 鍒涘缓涓嶅彲瑙佸壇鏈祴閲忚嚜鐒堕珮搴︺€?+       * 涓嶇洿鎺ユ妸姝ｅ紡鑿滃崟璁句负 height:auto锛?+       * 閬垮厤鍒囨崲鏃跺厛闂竴涓嬪啀鎵ц鍔ㄧ敾銆?+       */
+      const measurementClone = megaLayout.cloneNode(true) as HTMLElement;
+
+      measurementClone.style.position = "fixed";
+      measurementClone.style.left = "-100000px";
+      measurementClone.style.top = "0";
+      measurementClone.style.width = `${layoutRect.width}px`;
+      measurementClone.style.height = "auto";
+      measurementClone.style.minHeight = "0";
+      measurementClone.style.maxHeight = "none";
+      measurementClone.style.visibility = "hidden";
+      measurementClone.style.pointerEvents = "none";
+      measurementClone.style.overflow = "visible";
+      measurementClone.style.transition = "none";
+
+      Array.from(measurementClone.children).forEach((child) => {
+        const element = child as HTMLElement;
+
+        element.style.height = "auto";
+        element.style.minHeight = "0";
+        element.style.maxHeight = "none";
+      });
+
+      measurementClone
+        .querySelectorAll<HTMLElement>(
+          [
+            ".site-nav-mega-main",
+            ".site-nav-mega-product-area",
+            ".site-nav-mega-product-group",
+            ".site-nav-mega-product-grid",
+          ].join(","),
+        )
+        .forEach((element) => {
+          element.style.height = "auto";
+          element.style.minHeight = "0";
+          element.style.maxHeight = "none";
+        });
+
+      document.body.appendChild(measurementClone);
+
+      const targetHeight = Math.ceil(
+        Math.max(
+          measurementClone.scrollHeight,
+          measurementClone.getBoundingClientRect().height,
+        ),
+      );
+
+      measurementClone.remove();
+
+      if (targetHeight <= 0) {
+        return;
+      }
+
+      const currentHeight = Math.ceil(
+        megaLayout.getBoundingClientRect().height,
+      );
+
+      /**
+       * 宸﹀彸涓や晶璺熼殢澶栧眰楂樺害鍚屾浼哥缉銆?+       */
+      megaLayout.style.alignItems = "stretch";
+      megaLayout.style.overflow = "hidden";
+      megaLayout.style.transition =
+        "height 180ms cubic-bezier(0.2, 0.8, 0.2, 1)";
+
+      Array.from(megaLayout.children).forEach((child) => {
+        const element = child as HTMLElement;
+
+        element.style.height = "100%";
+        element.style.minHeight = "0";
+      });
+
+      if (Math.abs(currentHeight - targetHeight) <= 1) {
+        megaLayout.style.height = `${targetHeight}px`;
+      } else {
+        megaLayout.style.height = `${currentHeight}px`;
+
+        // 寮哄埗娴忚鍣ㄨ褰曞姩鐢昏捣濮嬮珮搴?+        megaLayout.getBoundingClientRect();
+
+        window.requestAnimationFrame(() => {
+          megaLayout.style.height = `${targetHeight}px`;
+        });
+      }
+
+      /**
+       * 鍙栨秷涓婁竴娆℃湭缁撴潫鐨勫唴瀹瑰姩鐢汇€?+       */
+      visibleMegaMain.getAnimations().forEach((animation) => {
+        animation.cancel();
+      });
+
+      visibleMegaMain.animate(
+        [
+          {
+            opacity: 0.45,
+            transform: "translateY(5px)",
+          },
+          {
+            opacity: 1,
+            transform: "translateY(0)",
+          },
+        ],
+        {
+          duration: 160,
+          easing: "ease-out",
+          fill: "both",
+        },
+      );
+    };
+
+    const scheduleProductMegaHeightUpdate = () => {
+      if (productMegaHeightAnimationFrame !== null) {
+        window.cancelAnimationFrame(productMegaHeightAnimationFrame);
+      }
+
+      productMegaHeightAnimationFrame = window.requestAnimationFrame(() => {
+        productMegaHeightAnimationFrame = null;
+        updateProductMegaHeight();
+      });
+    };
+
+    scheduleProductMegaHeightUpdate();
+
+    /**
+     * 鍥剧墖鍜屽瓧浣撳畬鎴愬綋鍓嶅抚甯冨眬鍚庡啀鏍″噯涓€娆★紝
+     * 閬垮厤棣栨鎵撳紑鏃堕珮搴﹀皯鍑犲儚绱犮€?+     */
+    const settleTimer = window.setTimeout(
+      scheduleProductMegaHeightUpdate,
+      80,
+    );
+
+    window.addEventListener(
+      "resize",
+      scheduleProductMegaHeightUpdate,
+    );
+
+    return () => {
+      window.clearTimeout(settleTimer);
+
+      window.removeEventListener(
+        "resize",
+        scheduleProductMegaHeightUpdate,
+      );
+
+      if (productMegaHeightAnimationFrame !== null) {
+        window.cancelAnimationFrame(productMegaHeightAnimationFrame);
+        productMegaHeightAnimationFrame = null;
+      }
+    };
+  }, [activeMegaCategoryKey, activeMegaItem.key]);
+
+  /* PRODUCT_MEGA_DYNAMIC_HEIGHT_END */
         }
 
         // 濡傛灉閰嶇疆浜?categoryKey锛屽氨鍙樉绀哄綋鍓嶅乏渚у垎绫诲搴旂殑鍗＄墖
@@ -1220,9 +1467,7 @@ const isFittingReplacementDetailPage =
                           ? "site-nav-mega-category-active"
                           : ""
                           }`}
-                        onMouseEnter={() =>
-                          setActiveMegaCategoryKey(category.key)
-                        }                        onClick={closeAllPanels}
+                        onMouseEnter={() => handleMegaCategoryHover(category.key)}                        onClick={closeAllPanels}
                       >
                         {categoryContent}
                       </Link>
@@ -1239,7 +1484,7 @@ const isFittingReplacementDetailPage =
                         ? "site-nav-mega-category-active"
                         : ""
                         }`}
-                      onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
+                      onMouseEnter={() => handleMegaCategoryHover(category.key)}
                     >
                       {categoryContent}
                     </div>
```
