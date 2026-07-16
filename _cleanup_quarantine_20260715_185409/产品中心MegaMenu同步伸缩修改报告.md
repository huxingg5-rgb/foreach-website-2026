# 产品中心 Mega Menu 同步伸缩修改报告

- 修改时间：2026-07-15 18:02:12
- 修改文件：`components/layout/SiteHeader.tsx`
- 修改前备份：`.\components\layout\SiteHeader.tsx.bak_product_mega_sync_height_20260715_180210`

## 修改效果

- 产品中心左右两侧同步变长和缩短
- 产品中心分类 hover 延迟 100ms
- 整体高度动画 190ms
- 右侧产品内容淡入 150ms
- 应用领域保持原来的即时切换和自然高度
- 产品中心小字继续保留
- 应用领域小字继续隐藏

## 结构检查

- 开始标记：1
- 结束标记：1
- 主内容 ref：1
- hover 调用：2

## 本次精确差异

```diff
diff --git "a/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx.bak_product_mega_sync_height_20260715_180210" "b/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx"
index fb66856..9b0fce6 100644
--- "a/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx.bak_product_mega_sync_height_20260715_180210"
+++ "b/F:\\WebsiteProjects\\foreach-website-2026\\components\\layout\\SiteHeader.tsx"
@@ -299,6 +299,10 @@ const isFittingReplacementDetailPage =
 
   // 鎼滅储杈撳叆妗嗭紝鐢ㄤ簬鎵撳紑鎼滅储妯″紡鍚庤嚜鍔ㄨ仛鐒?   const searchInputRef = useRef<HTMLInputElement | null>(null);
+  // Product Mega Menu height animation refs
+  const productMegaMainRef = useRef<HTMLDivElement | null>(null);
+  const productMegaHoverTimerRef = useRef<number | null>(null);
+  const productMegaAnimationFrameRef = useRef<number | null>(null);
 
   const isLanguageOpen = openPanel === "language"; // 鍒ゆ柇璇█鑿滃崟鏄惁灞曞紑
 
@@ -407,6 +411,197 @@ const isFittingReplacementDetailPage =
         return card.categoryKey === currentMegaCategoryKey;
       })
       .sort((a, b) => a.order - b.order) ?? [];
+  /* PRODUCT_MEGA_SYNC_HEIGHT_START */
+
+  /**
+   * Products uses a short hover delay.
+   * Other Mega Menus continue switching immediately.
+   */
+  const handleMegaCategoryHover = (categoryKey: string) => {
+    if (activeMegaItem?.key !== "products") {
+      setActiveMegaCategoryKey(categoryKey);
+      return;
+    }
+
+    if (productMegaHoverTimerRef.current !== null) {
+      window.clearTimeout(productMegaHoverTimerRef.current);
+    }
+
+    productMegaHoverTimerRef.current = window.setTimeout(() => {
+      setActiveMegaCategoryKey(categoryKey);
+      productMegaHoverTimerRef.current = null;
+    }, 100);
+  };
+
+  /**
+   * Clear pending hover and animation tasks on unmount.
+   */
+  useEffect(() => {
+    return () => {
+      if (productMegaHoverTimerRef.current !== null) {
+        window.clearTimeout(productMegaHoverTimerRef.current);
+      }
+
+      if (productMegaAnimationFrameRef.current !== null) {
+        window.cancelAnimationFrame(
+          productMegaAnimationFrameRef.current,
+        );
+      }
+    };
+  }, []);
+
+  /**
+   * Animate the shared parent height.
+   *
+   * The left category area and right product area are siblings,
+   * so changing their shared parent height keeps both sides equal.
+   */
+  useEffect(() => {
+    const megaMain = productMegaMainRef.current;
+    const megaLayout = megaMain?.parentElement as HTMLElement | null;
+
+    if (!megaMain || !megaLayout) {
+      return;
+    }
+
+    const layoutChildren = Array.from(
+      megaLayout.children,
+    ) as HTMLElement[];
+
+    /**
+     * Applications and other menus must keep their original sizing.
+     */
+    if (activeMegaItem?.key !== "products") {
+      megaLayout.style.removeProperty("height");
+      megaLayout.style.removeProperty("min-height");
+      megaLayout.style.removeProperty("overflow");
+      megaLayout.style.removeProperty("transition");
+
+      layoutChildren.forEach((child) => {
+        child.style.removeProperty("height");
+        child.style.removeProperty("min-height");
+      });
+
+      return;
+    }
+
+    const updateProductMegaHeight = () => {
+      const currentHeight =
+        megaLayout.getBoundingClientRect().height;
+
+      /**
+       * Temporarily restore natural height for measurement.
+       * This happens inside one rendering frame, so it does not flash.
+       */
+      megaLayout.style.transition = "none";
+      megaLayout.style.height = "auto";
+      megaLayout.style.minHeight = "0";
+      megaLayout.style.overflow = "hidden";
+
+      layoutChildren.forEach((child) => {
+        child.style.height = "auto";
+        child.style.minHeight = "0";
+      });
+
+      const targetHeight = Math.ceil(megaLayout.scrollHeight);
+
+      if (targetHeight <= 0) {
+        return;
+      }
+
+      const animationStartHeight =
+        currentHeight > 80 ? currentHeight : targetHeight;
+
+      /**
+       * Restore the current visible height before starting transition.
+       */
+      megaLayout.style.height = `${animationStartHeight}px`;
+
+      layoutChildren.forEach((child) => {
+        child.style.height = "100%";
+        child.style.minHeight = "0";
+      });
+
+      // Force the browser to register the starting height.
+      void megaLayout.offsetHeight;
+
+      megaLayout.style.transition =
+        "height 190ms cubic-bezier(0.2, 0.8, 0.2, 1)";
+
+      if (productMegaAnimationFrameRef.current !== null) {
+        window.cancelAnimationFrame(
+          productMegaAnimationFrameRef.current,
+        );
+      }
+
+      productMegaAnimationFrameRef.current =
+        window.requestAnimationFrame(() => {
+          megaLayout.style.height = `${targetHeight}px`;
+          productMegaAnimationFrameRef.current = null;
+        });
+
+      /**
+       * Softly reveal the newly selected product content.
+       */
+      megaMain.getAnimations().forEach((animation) => {
+        animation.cancel();
+      });
+
+      megaMain.animate(
+        [
+          {
+            opacity: 0.58,
+            transform: "translateY(4px)",
+          },
+          {
+            opacity: 1,
+            transform: "translateY(0)",
+          },
+        ],
+        {
+          duration: 150,
+          easing: "ease-out",
+          fill: "both",
+        },
+      );
+    };
+
+    updateProductMegaHeight();
+
+    const settleTimer = window.setTimeout(
+      updateProductMegaHeight,
+      80,
+    );
+
+    window.addEventListener(
+      "resize",
+      updateProductMegaHeight,
+    );
+
+    return () => {
+      window.clearTimeout(settleTimer);
+
+      window.removeEventListener(
+        "resize",
+        updateProductMegaHeight,
+      );
+
+      if (productMegaAnimationFrameRef.current !== null) {
+        window.cancelAnimationFrame(
+          productMegaAnimationFrameRef.current,
+        );
+
+        productMegaAnimationFrameRef.current = null;
+      }
+    };
+  }, [
+    activeMegaItem?.key,
+    currentMegaCategoryKey,
+    currentLocale,
+    desktopMegaKey,
+  ]);
+
+  /* PRODUCT_MEGA_SYNC_HEIGHT_END */
 
   /**
    * 鍒ゆ柇褰撳墠鏄笉鏄?PC 榧犳爣璁惧
@@ -1220,9 +1415,8 @@ const isFittingReplacementDetailPage =
                           ? "site-nav-mega-category-active"
                           : ""
                           }`}
-                        onMouseEnter={() =>
-                          setActiveMegaCategoryKey(category.key)
-                        }                        onClick={closeAllPanels}
+                        onMouseEnter={() => handleMegaCategoryHover(category.key)}
+                        onClick={closeAllPanels}
                       >
                         {categoryContent}
                       </Link>
@@ -1239,7 +1433,7 @@ const isFittingReplacementDetailPage =
                         ? "site-nav-mega-category-active"
                         : ""
                         }`}
-                      onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
+                      onMouseEnter={() => handleMegaCategoryHover(category.key)}
                     >
                       {categoryContent}
                     </div>
@@ -1248,7 +1442,11 @@ const isFittingReplacementDetailPage =
               </div>
 
               {/* 鍙充晶鍐呭鍖?*/}
-              <div className="site-nav-mega-main" style={{ gridTemplateRows: "1fr", gap: 0, alignContent: "start" }}>
+              <div
+                ref={productMegaMainRef}
+                className="site-nav-mega-main"
+                style={{ gridTemplateRows: "1fr", gap: 0, alignContent: "start" }}
+              >
                 {/* 鍙充晶椤堕儴璇存槑鍖?*/}
                 <div className="site-nav-mega-heading" style={{ display: "none" }}>
                   <p>
```
