# 详情页添加图纸加入清单问题检查

## 1. ProductDetailClient 当前清单 hook / 按钮函数


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 4

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
      - 所有业务按钮只留端口
========================================================= */

import SitePageShell from "@/components/layout/SitePageShell";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 226

      </div>
    </section>
  );
}

export default function ProductDetailClient({
  data,
}: ProductDetailClientProps) {
    const { addItem, getItem, toggleDrawingNeed } = useSelectionCart();

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
      images.push(data.mainImage);
    }

    data.additionalImages.forEach((image) => {
      if (image && !images.includes(image)) {
        images.push(image);
      }
    });

    return images;

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 321

        current === realImages.length - 1 ? 0 : current + 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 2 ? 0 : current + 1));
  }

  function getDetailCartProductCode() {
    return String(
      data.modelDisplay ||
        data.displayModel ||
        data.foreachModel ||
        data.model ||
        data.productCode ||
        data.slug ||
        ""
    ).trim();
  }

  function createDetailCartItem(needDrawing: boolean): SelectionCartItemInput {
    const productCode = getDetailCartProductCode();
    const modelText = String(
      data.modelDisplay ||
        data.displayModel ||
        data.foreachModel ||
        data.model ||
        data.title ||
        productCode
    ).trim();

    return {
      sourceType: "pump-selection",

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 333

        data.foreachModel ||
        data.model ||
        data.productCode ||
        data.slug ||
        ""
    ).trim();
  }

  function createDetailCartItem(needDrawing: boolean): SelectionCartItemInput {
    const productCode = getDetailCartProductCode();
    const modelText = String(
      data.modelDisplay ||
        data.displayModel ||
        data.foreachModel ||
        data.model ||
        data.title ||
        productCode
    ).trim();

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品详情页",
      productName: String(
        data.productTypeName ||
          data.seriesName ||
          data.series ||
          "隔膜泵"
      ).trim(),
      productCode,
      foreachModel: modelText,
      competitorModels: [],
      quantity: 1,
      needDrawing,

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 334

        data.model ||
        data.productCode ||
        data.slug ||
        ""
    ).trim();
  }

  function createDetailCartItem(needDrawing: boolean): SelectionCartItemInput {
    const productCode = getDetailCartProductCode();
    const modelText = String(
      data.modelDisplay ||
        data.displayModel ||
        data.foreachModel ||
        data.model ||
        data.title ||
        productCode
    ).trim();

    return {
      sourceType: "pump-selection",
      sourceLabel: "产品详情页",
      productName: String(
        data.productTypeName ||
          data.seriesName ||
          data.series ||
          "隔膜泵"
      ).trim(),
      productCode,
      foreachModel: modelText,
      competitorModels: [],
      quantity: 1,
      needDrawing,
      imagePath:

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 372

        "",
      detailHref:
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
      }
      return;
    }

    addItem(item);
  }

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 373

      detailHref:
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
      }
      return;
    }

    addItem(item);
  }

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 380

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
      }
      return;
    }

    addItem(item);
  }

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 384

      console.warn("详情页清单参数不完整", data);
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

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 386

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

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 391

      if (needDrawing && !existingItem.needDrawing) {
        toggleDrawingNeed(existingItem.id, true);
      } else {
        addItem(item);
      }
      return;
    }

    addItem(item);
  }

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    addDetailProductToCart(false);
  }

  return (
    <div data-product-breadcrumb-shell="true">

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 402

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    addDetailProductToCart(false);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 403

    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    addDetailProductToCart(false);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 410

  function handleAddDrawing() {
    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    addDetailProductToCart(false);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {
          label: data.model,
        },
      ]}
    >
      <main className={styles.page} data-product-detail-page="true">
      <div className={styles.container}>
        

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 411

    addDetailProductToCart(true);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    addDetailProductToCart(false);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {
          label: data.model,
        },
      ]}
    >
      <main className={styles.page} data-product-detail-page="true">
      <div className={styles.container}>
        
        <section className={styles.productTop}>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 752

                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
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
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>
              </div>
            </div>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 754

                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
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
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>
              </div>
            </div>
          </div>
        </section>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 771

                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
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
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >
              规格
            </button>

            <button

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 773

                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
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
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >
              规格
            </button>

            <button
              className={[
                styles.tabButton,

---

## 2. 添加图纸按钮实际渲染位置


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 737

                    type="button"
                    onClick={handleOpenConfigurator}
                  >
                    配置选择
                  </button>
                ) : null}
              </div>

              <div data-product-action-grid="true" className={styles.actionRow}>
                {data.showDatasheetRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 748

                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
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
                  className={styles.button}
                  type="button"

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 752

                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
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
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 771

                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
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
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >
              规格
            </button>

---

## 3. SelectionCartProvider 是否包住全站


### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 25

import "./globals.css";
import "./language-typography.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
import "./products/products.css";

/* =========================================================
   网站基础 SEO 信息

   说明：
   后续每个页面可以在自己的 page.tsx 里单独设置 metadata
========================================================= */
export const metadata: Metadata = {
  title: "恒永达 FOREACH 官网",
  description:
    "恒永达专注于微流体系统核心零部件与液路系统解决方案，服务 IVD、生命科学、高端分析仪器、合成生物和实验室自动化领域。",
};

/* =========================================================
   RootLayout
   全站根布局

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 26

import "./language-typography.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
import "./products/products.css";

/* =========================================================
   网站基础 SEO 信息

   说明：
   后续每个页面可以在自己的 page.tsx 里单独设置 metadata
========================================================= */
export const metadata: Metadata = {
  title: "恒永达 FOREACH 官网",
  description:
    "恒永达专注于微流体系统核心零部件与液路系统解决方案，服务 IVD、生命科学、高端分析仪器、合成生物和实验室自动化领域。",
};

/* =========================================================
   RootLayout
   全站根布局


### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 52

   1. 静态导出 output: export 模式下，不要使用 cookies()
   2. 不要写 export const runtime = "edge"
   3. 不要在这里根据 Cookie 判断语言
   4. 不要直接写原生 <script>，浏览器脚本统一用 next/script
========================================================= */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <SelectionCartProvider>
          {/* =================================================
              页面滚动、移动端菜单、语言菜单交互脚本

              说明：
              1. 使用 Next.js 的 Script 组件，而不是原生 <script>
              2. strategy="afterInteractive" 表示页面可以交互后再执行
              3. 不依赖 Cookie，不影响静态导出
              4. 主要控制：
                 - 滚动后导航栏状态
                 - 手机端菜单打开 / 关闭
                 - 手机端语言下拉打开 / 关闭

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 54

   3. 不要在这里根据 Cookie 判断语言
   4. 不要直接写原生 <script>，浏览器脚本统一用 next/script
========================================================= */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <SelectionCartProvider>
          {/* =================================================
              页面滚动、移动端菜单、语言菜单交互脚本

              说明：
              1. 使用 Next.js 的 Script 组件，而不是原生 <script>
              2. strategy="afterInteractive" 表示页面可以交互后再执行
              3. 不依赖 Cookie，不影响静态导出
              4. 主要控制：
                 - 滚动后导航栏状态
                 - 手机端菜单打开 / 关闭
                 - 手机端语言下拉打开 / 关闭
          ================================================= */}
          <Script id="foreach-layout-interactions" strategy="afterInteractive">

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 59

}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <SelectionCartProvider>
          {/* =================================================
              页面滚动、移动端菜单、语言菜单交互脚本

              说明：
              1. 使用 Next.js 的 Script 组件，而不是原生 <script>
              2. strategy="afterInteractive" 表示页面可以交互后再执行
              3. 不依赖 Cookie，不影响静态导出
              4. 主要控制：
                 - 滚动后导航栏状态
                 - 手机端菜单打开 / 关闭
                 - 手机端语言下拉打开 / 关闭
          ================================================= */}
          <Script id="foreach-layout-interactions" strategy="afterInteractive">
            {`
              (function () {
                function updatePageScrolled() {
                  var y =
                    window.scrollY ||

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 227

              })();
            `}
          </Script>

          <SiteHeader />

          {children}

          {/* 
            当前静态导出版先固定中文 Footer。
            后续如果需要 Footer 也根据 /en、/fr 自动切换，
            再把语言判断放到具体页面或前端组件里处理。
          */}
          <SiteFooter locale="zh-CN" />

          {/* 
            全局选型清单抽屉
            说明：
            1. 全站只挂载一次
            2. 首页、详情页、后续产品页都共用这一套清单
            3. 后续页面内部不再单独渲染 FittingSelectionCart
          */}
          <GlobalSelectionCartDrawer />
        </SelectionCartProvider>
      </body>

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 241


          {/* 
            全局选型清单抽屉
            说明：
            1. 全站只挂载一次
            2. 首页、详情页、后续产品页都共用这一套清单
            3. 后续页面内部不再单独渲染 FittingSelectionCart
          */}
          <GlobalSelectionCartDrawer />
        </SelectionCartProvider>
      </body>
    </html>
  );
} 

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 243

            全局选型清单抽屉
            说明：
            1. 全站只挂载一次
            2. 首页、详情页、后续产品页都共用这一套清单
            3. 后续页面内部不再单独渲染 FittingSelectionCart
          */}
          <GlobalSelectionCartDrawer />
        </SelectionCartProvider>
      </body>
    </html>
  );
} 

### F:\WebsiteProjects\foreach-website-2026\app\layout.tsx Line 244

            说明：
            1. 全站只挂载一次
            2. 首页、详情页、后续产品页都共用这一套清单
            3. 后续页面内部不再单独渲染 FittingSelectionCart
          */}
          <GlobalSelectionCartDrawer />
        </SelectionCartProvider>
      </body>
    </html>
  );
} 

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 564

        setDesktopMegaKey(item.key);
        setActiveMegaCategoryKey(firstCategory?.key ?? null);

        return;
      }

      if (item.dropdownType === "simple" && item.mobileChildren) {
        /*
           Simple 小下拉：
           用于资源中心、外语版 Contact & Partnership 等简单入口
        */
        setDesktopMegaKey(item.key);
        setActiveMegaCategoryKey(null);

        return;
      }

      /*
         没有下拉：
         中文版“联系我们”等普通导航
      */
      setDesktopMegaKey(null);
      setActiveMegaCategoryKey(null);
    }


### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 817

                const hasMegaDropdown =
                  item.dropdownType === "mega" && Boolean(item.megaDropdown);

                // 判断是否是资源中心 / 联系与合作这种简单下拉
                const hasSimpleDropdown =
                  item.dropdownType === "simple" &&
                  Boolean(item.mobileChildren?.length);

                // simple 下拉栏的数据
                const simpleChildren =
                  item.mobileChildren
                    ?.filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order) ?? [];

                // 当前 simple 下拉是否打开
                const isSimpleDropdownOpen =
                  desktopMegaKey === item.key && hasSimpleDropdown;

                return (
                  <div
                    key={item.key}
                    className={`site-nav-item ${hasMegaDropdown || hasSimpleDropdown
                      ? "site-nav-item-has-dropdown"
                      : ""
                      } ${hasSimpleDropdown

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 820

                // 判断是否是资源中心 / 联系与合作这种简单下拉
                const hasSimpleDropdown =
                  item.dropdownType === "simple" &&
                  Boolean(item.mobileChildren?.length);

                // simple 下拉栏的数据
                const simpleChildren =
                  item.mobileChildren
                    ?.filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order) ?? [];

                // 当前 simple 下拉是否打开
                const isSimpleDropdownOpen =
                  desktopMegaKey === item.key && hasSimpleDropdown;

                return (
                  <div
                    key={item.key}
                    className={`site-nav-item ${hasMegaDropdown || hasSimpleDropdown
                      ? "site-nav-item-has-dropdown"
                      : ""
                      } ${hasSimpleDropdown
                        ? "site-nav-item-has-simple-dropdown"
                        : ""
                      } ${isSimpleDropdownOpen ? "site-nav-item-simple-open" : ""

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 821

                const hasSimpleDropdown =
                  item.dropdownType === "simple" &&
                  Boolean(item.mobileChildren?.length);

                // simple 下拉栏的数据
                const simpleChildren =
                  item.mobileChildren
                    ?.filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order) ?? [];

                // 当前 simple 下拉是否打开
                const isSimpleDropdownOpen =
                  desktopMegaKey === item.key && hasSimpleDropdown;

                return (
                  <div
                    key={item.key}
                    className={`site-nav-item ${hasMegaDropdown || hasSimpleDropdown
                      ? "site-nav-item-has-dropdown"
                      : ""
                      } ${hasSimpleDropdown
                        ? "site-nav-item-has-simple-dropdown"
                        : ""
                      } ${isSimpleDropdownOpen ? "site-nav-item-simple-open" : ""
                      }`}

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 881

                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"
                            onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {/* PC 端搜索模式：点击右侧搜索图标后显示 */}
            <form

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 1038

              >
                {navigationItems.map((item) => {
                  const navLabel = getLocalizedText(item.label, currentLocale);

                  const navHref = getLocalizedHref(item.href, currentLocale);

                  const mobileChildren = (item.mobileChildren || [])
                    .filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order);

                  const hasMobileChildren = mobileChildren.length > 0;

                  if (hasMobileChildren) {
                    return (
                      <details
                        className="mobile-nav-section"
                        key={item.key}
                        open={openMobileSectionKey === item.key}
                      >
                        <summary
                          className="mobile-nav-summary"
                          onClick={(event) => {
                            event.preventDefault();

                            setOpenMobileSectionKey((currentKey) =>

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 1042

                  const navHref = getLocalizedHref(item.href, currentLocale);

                  const mobileChildren = (item.mobileChildren || [])
                    .filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order);

                  const hasMobileChildren = mobileChildren.length > 0;

                  if (hasMobileChildren) {
                    return (
                      <details
                        className="mobile-nav-section"
                        key={item.key}
                        open={openMobileSectionKey === item.key}
                      >
                        <summary
                          className="mobile-nav-summary"
                          onClick={(event) => {
                            event.preventDefault();

                            setOpenMobileSectionKey((currentKey) =>
                              currentKey === item.key ? null : item.key,
                            );
                          }}
                        >

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 1044

                  const mobileChildren = (item.mobileChildren || [])
                    .filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order);

                  const hasMobileChildren = mobileChildren.length > 0;

                  if (hasMobileChildren) {
                    return (
                      <details
                        className="mobile-nav-section"
                        key={item.key}
                        open={openMobileSectionKey === item.key}
                      >
                        <summary
                          className="mobile-nav-summary"
                          onClick={(event) => {
                            event.preventDefault();

                            setOpenMobileSectionKey((currentKey) =>
                              currentKey === item.key ? null : item.key,
                            );
                          }}
                        >
                          <span className="mobile-nav-summary-text">
                            {navLabel}

### F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx Line 1067

                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
                        </summary>

                        <div className="mobile-nav-submenu">
                          {mobileChildren.map((child) => (
                            <Link
                              key={child.key}
                              href={getLocalizedHref(child.href, currentLocale)}
                              className="mobile-nav-submenu-link"
                              onClick={closeAllPanels}
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}

### F:\WebsiteProjects\foreach-website-2026\components\layout\SitePageShell.tsx Line 22

  type SiteBreadcrumbItem,
} from "@/components/common/SiteBreadcrumb";

import styles from "./SitePageShell.module.css";

type SitePageShellProps = {
  children: ReactNode;
  breadcrumbItems: SiteBreadcrumbItem[];
  breadcrumbAriaLabel?: string;
  className?: string;
};

export default function SitePageShell({
  children,
  breadcrumbItems,
  breadcrumbAriaLabel = "Breadcrumb",
  className = "",
}: SitePageShellProps) {
  return (
    <div
      className={[styles.shell, className]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteBreadcrumb

### F:\WebsiteProjects\foreach-website-2026\components\layout\SitePageShell.tsx Line 29

  breadcrumbItems: SiteBreadcrumbItem[];
  breadcrumbAriaLabel?: string;
  className?: string;
};

export default function SitePageShell({
  children,
  breadcrumbItems,
  breadcrumbAriaLabel = "Breadcrumb",
  className = "",
}: SitePageShellProps) {
  return (
    <div
      className={[styles.shell, className]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteBreadcrumb
        items={breadcrumbItems}
        ariaLabel={breadcrumbAriaLabel}
        variant="bar"
        className={styles.shellBreadcrumb}
      />

      <div className={styles.content}>{children}</div>

### F:\WebsiteProjects\foreach-website-2026\components\layout\SitePageShell.tsx Line 47

        items={breadcrumbItems}
        ariaLabel={breadcrumbAriaLabel}
        variant="bar"
        className={styles.shellBreadcrumb}
      />

      <div className={styles.content}>{children}</div>
    </div>
  );
}

---

## 4. 清单类型和 addItem 逻辑


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 13

   文件路径：
   components/selection-cart/SelectionCartProvider.tsx

   作用：
   1. 在全站最高层维护统一选型清单
   2. 首页、详情页、后续产品页都通过 useSelectionCart 使用同一个清单
   3. 清单数据写入 localStorage，刷新页面后仍可保留
   4. 后续统一提交需求、生成资料包、发送邮件都基于这里的数据
========================================================= */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  SelectionCartItem,
  SelectionCartItemInput,
  SelectionCartSourceType,
} from "./selection-cart.types";

/* 新版全局清单缓存 key */
const GLOBAL_CART_STORAGE_KEY = "foreach_global_selection_cart_v1";

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 29

  type ReactNode,
} from "react";

import type {
  SelectionCartItem,
  SelectionCartItemInput,
  SelectionCartSourceType,
} from "./selection-cart.types";

/* 新版全局清单缓存 key */
const GLOBAL_CART_STORAGE_KEY = "foreach_global_selection_cart_v1";

/* 旧版接头清单缓存 key
   说明：
   用于兼容之前已经写入浏览器的清单数据。
*/
const LEGACY_FITTING_CART_STORAGE_KEY = "foreach_fitting_replacement_cart_v1";

interface SelectionCartContextValue {
  items: SelectionCartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 33

  SelectionCartItem,
  SelectionCartItemInput,
  SelectionCartSourceType,
} from "./selection-cart.types";

/* 新版全局清单缓存 key */
const GLOBAL_CART_STORAGE_KEY = "foreach_global_selection_cart_v1";

/* 旧版接头清单缓存 key
   说明：
   用于兼容之前已经写入浏览器的清单数据。
*/
const LEGACY_FITTING_CART_STORAGE_KEY = "foreach_fitting_replacement_cart_v1";

interface SelectionCartContextValue {
  items: SelectionCartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 39

const GLOBAL_CART_STORAGE_KEY = "foreach_global_selection_cart_v1";

/* 旧版接头清单缓存 key
   说明：
   用于兼容之前已经写入浏览器的清单数据。
*/
const LEGACY_FITTING_CART_STORAGE_KEY = "foreach_fitting_replacement_cart_v1";

interface SelectionCartContextValue {
  items: SelectionCartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 48

  items: SelectionCartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 53


  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 55

  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 56

  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 57


  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 74

);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;
}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 75


/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;
}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 77

   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;
}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 84

}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 95


  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 96

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 99


      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 103

        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 107

      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 108


      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 110


      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 113

          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 114

          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 119

        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";
  }

  const lines = items.map((item, index) => {
    const isPumpSelection = item.sourceType === "pump-selection";


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 121

        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";
  }

  const lines = items.map((item, index) => {
    const isPumpSelection = item.sourceType === "pump-selection";

    if (isPumpSelection) {
      return [

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 138

function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";
  }

  const lines = items.map((item, index) => {
    const isPumpSelection = item.sourceType === "pump-selection";

    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 145


    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 147

      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 155

    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");

  /* 读取本地缓存 */

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 156


    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");

  /* 读取本地缓存 */
  useEffect(() => {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 159

      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");

  /* 读取本地缓存 */
  useEffect(() => {
    try {
      const rawGlobalCart = window.localStorage.getItem(GLOBAL_CART_STORAGE_KEY);


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 178

  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");

  /* 读取本地缓存 */
  useEffect(() => {
    try {
      const rawGlobalCart = window.localStorage.getItem(GLOBAL_CART_STORAGE_KEY);

      if (rawGlobalCart) {
        const parsedGlobalCart = JSON.parse(rawGlobalCart) as SelectionCartItem[];

        setItems(
          parsedGlobalCart.map((item) => {
            return {
              ...item,
              quantity: Math.max(1, Number(item.quantity || 1)),
              needDrawing: Boolean(item.needDrawing),
            };
          })
        );

        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 188


        setItems(
          parsedGlobalCart.map((item) => {
            return {
              ...item,
              quantity: Math.max(1, Number(item.quantity || 1)),
              needDrawing: Boolean(item.needDrawing),
            };
          })
        );

        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(
        LEGACY_FITTING_CART_STORAGE_KEY
      );

      if (rawLegacyCart) {
        const parsedLegacyCart = JSON.parse(rawLegacyCart);
        const migratedItems = normalizeLegacyFittingItems(parsedLegacyCart);

        setItems(migratedItems);
      }
    } catch {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 198


        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(
        LEGACY_FITTING_CART_STORAGE_KEY
      );

      if (rawLegacyCart) {
        const parsedLegacyCart = JSON.parse(rawLegacyCart);
        const migratedItems = normalizeLegacyFittingItems(parsedLegacyCart);

        setItems(migratedItems);
      }
    } catch {
      setItems([]);
    }

    setHasMounted(true);
  }, []);

  /* 写入本地缓存 */
  useEffect(() => {
    if (!hasMounted) return;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 199

        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(
        LEGACY_FITTING_CART_STORAGE_KEY
      );

      if (rawLegacyCart) {
        const parsedLegacyCart = JSON.parse(rawLegacyCart);
        const migratedItems = normalizeLegacyFittingItems(parsedLegacyCart);

        setItems(migratedItems);
      }
    } catch {
      setItems([]);
    }

    setHasMounted(true);
  }, []);

  /* 写入本地缓存 */
  useEffect(() => {
    if (!hasMounted) return;

    window.localStorage.setItem(GLOBAL_CART_STORAGE_KEY, JSON.stringify(items));

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 219

  }, []);

  /* 写入本地缓存 */
  useEffect(() => {
    if (!hasMounted) return;

    window.localStorage.setItem(GLOBAL_CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hasMounted]);

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 230

  }

  function closeCart() {
    setIsOpen(false);
  }

  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 234

  }

  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 235


  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }

      return [

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 250

        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }

      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 261

      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    const confirmed = window.confirm("确认清空当前选型清单？");

    if (!confirmed) return;

    setItems([]);
  }

  function changeQuantity(id: string, quantity: number) {
    setItems((prev) => {
      return prev.map((item) => {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 292

          quantity: Math.max(1, Number(quantity || 1)),
        };
      });
    });
  }

  function toggleDrawingNeed(id: string, needDrawing: boolean) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 299

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 305

          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");
    } catch {
      window.alert(text);
    }
  }

  function generatePdfList() {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 307

      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");
    } catch {
      window.alert(text);
    }
  }

  function generatePdfList() {
    if (items.length === 0) {
      window.alert("当前清单为空，请先加入产品。");

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 308

    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");
    } catch {
      window.alert(text);
    }
  }

  function generatePdfList() {
    if (items.length === 0) {
      window.alert("当前清单为空，请先加入产品。");
      return;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 344

  const contextValue = useMemo<SelectionCartContextValue>(() => {
    return {
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );
}

/* =========================================================
   useSelectionCart

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 348

      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );
}

/* =========================================================
   useSelectionCart
========================================================= */
export function useSelectionCart() {
  const context = useContext(SelectionCartContext);


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 349

      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );
}

/* =========================================================
   useSelectionCart
========================================================= */
export function useSelectionCart() {
  const context = useContext(SelectionCartContext);

  if (!context) {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 18

========================================================= */

/* 清单来源类型
   说明：
   后续如果增加泵、阀、传感器，可以继续扩展字符串。
*/
export type SelectionCartSourceType =
  | "fitting-replacement"
  | "pump-selection"
  | "valve-selection"
  | "sensor-selection"
  | "custom";

/* 全局清单单项 */
export interface SelectionCartItem {
  /* 全局唯一 ID，建议格式：sourceType:productCode */
  id: string;

  /* 来源模块 */
  sourceType: SelectionCartSourceType;

  /* 来源模块中文名称，例如：接头型号替代查询 */
  sourceLabel: string;

  /* 产品分类名称，例如：Q20 快插接头 */
  productName: string;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 20

/* 清单来源类型
   说明：
   后续如果增加泵、阀、传感器，可以继续扩展字符串。
*/
export type SelectionCartSourceType =
  | "fitting-replacement"
  | "pump-selection"
  | "valve-selection"
  | "sensor-selection"
  | "custom";

/* 全局清单单项 */
export interface SelectionCartItem {
  /* 全局唯一 ID，建议格式：sourceType:productCode */
  id: string;

  /* 来源模块 */
  sourceType: SelectionCartSourceType;

  /* 来源模块中文名称，例如：接头型号替代查询 */
  sourceLabel: string;

  /* 产品分类名称，例如：Q20 快插接头 */
  productName: string;

  /* 商品编码，例如：839034 */
  productCode: string;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 27

  | "valve-selection"
  | "sensor-selection"
  | "custom";

/* 全局清单单项 */
export interface SelectionCartItem {
  /* 全局唯一 ID，建议格式：sourceType:productCode */
  id: string;

  /* 来源模块 */
  sourceType: SelectionCartSourceType;

  /* 来源模块中文名称，例如：接头型号替代查询 */
  sourceLabel: string;

  /* 产品分类名称，例如：Q20 快插接头 */
  productName: string;

  /* 商品编码，例如：839034 */
  productCode: string;

  /* 恒永达型号，例如：Q2001-PNV-SACN */
  foreachModel: string;

  /* 兼容编码，例如：A0015 / B0004 / C0004 */
  competitorModels: string[];


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 31

/* 全局清单单项 */
export interface SelectionCartItem {
  /* 全局唯一 ID，建议格式：sourceType:productCode */
  id: string;

  /* 来源模块 */
  sourceType: SelectionCartSourceType;

  /* 来源模块中文名称，例如：接头型号替代查询 */
  sourceLabel: string;

  /* 产品分类名称，例如：Q20 快插接头 */
  productName: string;

  /* 商品编码，例如：839034 */
  productCode: string;

  /* 恒永达型号，例如：Q2001-PNV-SACN */
  foreachModel: string;

  /* 兼容编码，例如：A0015 / B0004 / C0004 */
  competitorModels: string[];

  /* 数量 */
  quantity: number;

  /* 是否需要 2D 图纸 */

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 40

  sourceLabel: string;

  /* 产品分类名称，例如：Q20 快插接头 */
  productName: string;

  /* 商品编码，例如：839034 */
  productCode: string;

  /* 恒永达型号，例如：Q2001-PNV-SACN */
  foreachModel: string;

  /* 兼容编码，例如：A0015 / B0004 / C0004 */
  competitorModels: string[];

  /* 数量 */
  quantity: number;

  /* 是否需要 2D 图纸 */
  needDrawing: boolean;

  /* 产品详情页链接 */
  detailHref?: string;

  /* 产品图片路径 */
  imagePath?: string;
}


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 43

  productName: string;

  /* 商品编码，例如：839034 */
  productCode: string;

  /* 恒永达型号，例如：Q2001-PNV-SACN */
  foreachModel: string;

  /* 兼容编码，例如：A0015 / B0004 / C0004 */
  competitorModels: string[];

  /* 数量 */
  quantity: number;

  /* 是否需要 2D 图纸 */
  needDrawing: boolean;

  /* 产品详情页链接 */
  detailHref?: string;

  /* 产品图片路径 */
  imagePath?: string;
}

/* 加入清单时的输入结构
   说明：
   id 和 quantity 可以自动补齐。

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 52

  competitorModels: string[];

  /* 数量 */
  quantity: number;

  /* 是否需要 2D 图纸 */
  needDrawing: boolean;

  /* 产品详情页链接 */
  detailHref?: string;

  /* 产品图片路径 */
  imagePath?: string;
}

/* 加入清单时的输入结构
   说明：
   id 和 quantity 可以自动补齐。
*/
export type SelectionCartItemInput = Omit<
  SelectionCartItem,
  "id" | "quantity"
> & {
  id?: string;
  quantity?: number;
}; 

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 65

}

/* 加入清单时的输入结构
   说明：
   id 和 quantity 可以自动补齐。
*/
export type SelectionCartItemInput = Omit<
  SelectionCartItem,
  "id" | "quantity"
> & {
  id?: string;
  quantity?: number;
}; 

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 89

  const {
    items,
    isOpen,
    openCart,
    closeCart,
    changeQuantity,
    toggleDrawingNeed,
    removeItem,
    clearCart,
    copyCartText,
    generatePdfList,
    printTime,
  } = useSelectionCart();

  /* =========================================================
     是否已经在浏览器端挂载

     说明：
     1. 打印区域使用 createPortal 挂到 document.body
     2. document 只在浏览器端存在
     3. 所以需要等组件挂载后再创建 portal
  ========================================================= */
  const [isMounted, setIsMounted] = useState(false);

  /* 已经标记“已添加图纸”的型号 */
  const requestDrawingItems = useMemo(() => {
    return items.filter((item) => item.needDrawing);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 109

     3. 所以需要等组件挂载后再创建 portal
  ========================================================= */
  const [isMounted, setIsMounted] = useState(false);

  /* 已经标记“已添加图纸”的型号 */
  const requestDrawingItems = useMemo(() => {
    return items.filter((item) => item.needDrawing);
  }, [items]);

  /* 图纸需求数量 */
  const drawingNeedCount = requestDrawingItems.length;

  /* 右下角清单按钮动效状态 */
  const [isCartButtonBumping, setIsCartButtonBumping] = useState(false);

  /* 图纸申请弹窗是否打开 */
  const [isDrawingRequestModalOpen, setIsDrawingRequestModalOpen] =
    useState(false);

  /* 用于记录清单变化，避免页面初次加载时触发动效 */
  const previousCartSignatureRef = useRef("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* =========================================================

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 134


  /* =========================================================
     把清单中的图纸需求转换成通用弹窗条目

     说明：
     1. CompanyInfoRequestModal 不依赖具体业务字段
     2. 所以这里把 productCode / competitorModels 转成 metaLines
     3. 后续规格书申请也可以用类似方式转换数据
  ========================================================= */
  const drawingRequestModalItems = useMemo<CompanyInfoRequestItem[]>(() => {
    return requestDrawingItems.map((item) => {
      return {
        id: item.id,
        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 141

     3. 后续规格书申请也可以用类似方式转换数据
  ========================================================= */
  const drawingRequestModalItems = useMemo<CompanyInfoRequestItem[]>(() => {
    return requestDrawingItems.map((item) => {
      return {
        id: item.id,
        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 143

  const drawingRequestModalItems = useMemo<CompanyInfoRequestItem[]>(() => {
    return requestDrawingItems.map((item) => {
      return {
        id: item.id,
        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 146

        id: item.id,
        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单
     3. 只让右下角清单入口轻微提示
     4. 初次加载 localStorage 数据时不触发动效
  ========================================================= */

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 150

            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单
     3. 只让右下角清单入口轻微提示
     4. 初次加载 localStorage 数据时不触发动效
  ========================================================= */
  useEffect(() => {
    const currentSignature = items
      .map((item) => `${item.id}:${item.quantity}:${item.needDrawing}`)
      .join("|");

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 165

     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单
     3. 只让右下角清单入口轻微提示
     4. 初次加载 localStorage 数据时不触发动效
  ========================================================= */
  useEffect(() => {
    const currentSignature = items
      .map((item) => `${item.id}:${item.quantity}:${item.needDrawing}`)
      .join("|");

    if (!previousCartSignatureRef.current) {
      previousCartSignatureRef.current = currentSignature;
      return;
    }

    if (previousCartSignatureRef.current !== currentSignature) {
      setIsCartButtonBumping(true);

      const timer = window.setTimeout(() => {
        setIsCartButtonBumping(false);
      }, 420);

      previousCartSignatureRef.current = currentSignature;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 169

     2. 不自动打开清单
     3. 只让右下角清单入口轻微提示
     4. 初次加载 localStorage 数据时不触发动效
  ========================================================= */
  useEffect(() => {
    const currentSignature = items
      .map((item) => `${item.id}:${item.quantity}:${item.needDrawing}`)
      .join("|");

    if (!previousCartSignatureRef.current) {
      previousCartSignatureRef.current = currentSignature;
      return;
    }

    if (previousCartSignatureRef.current !== currentSignature) {
      setIsCartButtonBumping(true);

      const timer = window.setTimeout(() => {
        setIsCartButtonBumping(false);
      }, 420);

      previousCartSignatureRef.current = currentSignature;

      return () => {
        window.clearTimeout(timer);
      };
    }

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 330

                items.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.sourceLabel}</td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

        {/* PDF 正式页脚 SVG */}

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 332

                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.sourceLabel}</td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

        {/* PDF 正式页脚 SVG */}
        <footer className={styles.printGraphicFooter}>
          <img src={PDF_FOOTER_GRAPHIC_SRC} alt="FOREACH PDF Footer" />

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 335

                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

        {/* PDF 正式页脚 SVG */}
        <footer className={styles.printGraphicFooter}>
          <img src={PDF_FOOTER_GRAPHIC_SRC} alt="FOREACH PDF Footer" />
        </footer>
      </div>
    </section>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 339

                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

        {/* PDF 正式页脚 SVG */}
        <footer className={styles.printGraphicFooter}>
          <img src={PDF_FOOTER_GRAPHIC_SRC} alt="FOREACH PDF Footer" />
        </footer>
      </div>
    </section>
  );

  return (
    <>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 341

                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

        {/* PDF 正式页脚 SVG */}
        <footer className={styles.printGraphicFooter}>
          <img src={PDF_FOOTER_GRAPHIC_SRC} alt="FOREACH PDF Footer" />
        </footer>
      </div>
    </section>
  );

  return (
    <>
      {/* =====================================================
          右下角浮动按钮

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 452

                          </button>

                          <div className={styles.itemHead}>
                            <div>
                              <span>{item.sourceLabel}</span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
                                >
                                  {item.foreachModel}
                                </Link>
                              ) : (
                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>

                            <button
                              className={
                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 460

                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
                                >
                                  {item.foreachModel}
                                </Link>
                              ) : (
                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>

                            <button
                              className={
                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 463

                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
                                >
                                  {item.foreachModel}
                                </Link>
                              ) : (
                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>

                            <button
                              className={
                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 469

                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>

                            <button
                              className={
                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 475

                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>兼容编码</span>
                                <strong>
                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 478

                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>兼容编码</span>
                                <strong>
                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

                              <div className={styles.infoRow}>
                                <span>商品编码</span>
                                <strong>{item.productCode}</strong>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 482

                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>兼容编码</span>
                                <strong>
                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

                              <div className={styles.infoRow}>
                                <span>商品编码</span>
                                <strong>{item.productCode}</strong>
                              </div>
                            </>
                          )}


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 498

                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

                              <div className={styles.infoRow}>
                                <span>商品编码</span>
                                <strong>{item.productCode}</strong>
                              </div>
                            </>
                          )}

                          <div className={styles.quantityRow}>
                            <label htmlFor={`global-cart-qty-${item.id}`}>
                              数量
                            </label>

                            <input
                              id={`global-cart-qty-${item.id}`}
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => {
                                changeQuantity(
                                  item.id,
                                  Number(event.target.value || 1),
                                );
                              }}

---

## 5. 隔膜泵详情页传给 ProductDetailClient 的关键字段


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 10


import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

type DiaphragmMedia = {
  resourceId?: string;
  version?: string;
  displayName?: string;
  resourceType?: string;
  pagePosition?: string;
  fileName?: string;
  path?: string;
  fullPath?: string;
  alt?: string;
  caption?: string;
  sourcePdfPage?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 50

  voltage?: string;
  connectionType?: string;
  portDirection?: string;
  diaphragm?: string;
  valvePlate?: string;
  pumpHead?: string;
  detailSlug?: string;
  reservedModelSlug?: string;
  note?: string;
};

type DiaphragmFaq = {
  question?: string;
  answer?: string;
  seoDirection?: string;
};

type DiaphragmDetail = {
  seriesId: string;
  slug: string;
  category?: string;
  title?: string;
  displayName?: string;
  path?: string;
  description?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 51

  connectionType?: string;
  portDirection?: string;
  diaphragm?: string;
  valvePlate?: string;
  pumpHead?: string;
  detailSlug?: string;
  reservedModelSlug?: string;
  note?: string;
};

type DiaphragmFaq = {
  question?: string;
  answer?: string;
  seoDirection?: string;
};

type DiaphragmDetail = {
  seriesId: string;
  slug: string;
  category?: string;
  title?: string;
  displayName?: string;
  path?: string;
  description?: string;
  commonApplications?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 63

  answer?: string;
  seoDirection?: string;
};

type DiaphragmDetail = {
  seriesId: string;
  slug: string;
  category?: string;
  title?: string;
  displayName?: string;
  path?: string;
  description?: string;
  commonApplications?: string;
  modelDisplay?: string;
  modelButtonText?: string;
  status?: string;
  seo?: {
    title?: string;
    description?: string;
    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 70

  category?: string;
  title?: string;
  displayName?: string;
  path?: string;
  description?: string;
  commonApplications?: string;
  modelDisplay?: string;
  modelButtonText?: string;
  status?: string;
  seo?: {
    title?: string;
    description?: string;
    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 95

}>;

function getText(value: unknown) {
  return String(value || "").trim();
}

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function findDetail(slug: string) {
  const targetSlug = normalizeSlug(slug);

  return details.find((item) => {
    return normalizeSlug(item.slug) === targetSlug;
  });
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

  if (value.startsWith("public/")) {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 100


function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function findDetail(slug: string) {
  const targetSlug = normalizeSlug(slug);

  return details.find((item) => {
    return normalizeSlug(item.slug) === targetSlug;
  });
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

  if (value.startsWith("public/")) {
    return "/" + value.slice("public/".length);
  }

  if (value.startsWith("/public/")) {
    return value.replace(/^\/public\//, "/");

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 101

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function findDetail(slug: string) {
  const targetSlug = normalizeSlug(slug);

  return details.find((item) => {
    return normalizeSlug(item.slug) === targetSlug;
  });
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

  if (value.startsWith("public/")) {
    return "/" + value.slice("public/".length);
  }

  if (value.startsWith("/public/")) {
    return value.replace(/^\/public\//, "/");
  }

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 104

}

function findDetail(slug: string) {
  const targetSlug = normalizeSlug(slug);

  return details.find((item) => {
    return normalizeSlug(item.slug) === targetSlug;
  });
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

  if (value.startsWith("public/")) {
    return "/" + value.slice("public/".length);
  }

  if (value.startsWith("/public/")) {
    return value.replace(/^\/public\//, "/");
  }

  return value.startsWith("/") ? value : "/" + value;
}

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 281

    voltage: getText(item.voltage),
    connectionType: getText(item.connectionType),
    portDirection: getText(item.portDirection),
    diaphragm: getText(item.diaphragm),
    valvePlate: getText(item.valvePlate),
    pumpHead: getText(item.pumpHead),
    detailSlug: getText(item.detailSlug),
    reservedModelSlug: getText(item.reservedModelSlug),
    note: getText(item.note),
  }));
}

function getSeriesTypeLabel(detail: DiaphragmDetail) {
  const category = getText(detail.category);

  if (category) return category;

  const title = getText(detail.title);

  if (title.includes("气液")) return "气液混合隔膜泵";
  if (title.includes("液体")) return "液体隔膜泵";
  if (title.includes("气体")) return "气体隔膜泵";

  return "隔膜泵";
}

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 282

    connectionType: getText(item.connectionType),
    portDirection: getText(item.portDirection),
    diaphragm: getText(item.diaphragm),
    valvePlate: getText(item.valvePlate),
    pumpHead: getText(item.pumpHead),
    detailSlug: getText(item.detailSlug),
    reservedModelSlug: getText(item.reservedModelSlug),
    note: getText(item.note),
  }));
}

function getSeriesTypeLabel(detail: DiaphragmDetail) {
  const category = getText(detail.category);

  if (category) return category;

  const title = getText(detail.title);

  if (title.includes("气液")) return "气液混合隔膜泵";
  if (title.includes("液体")) return "液体隔膜泵";
  if (title.includes("气体")) return "气体隔膜泵";

  return "隔膜泵";
}


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 301

  if (title.includes("液体")) return "液体隔膜泵";
  if (title.includes("气体")) return "气体隔膜泵";

  return "隔膜泵";
}

function getModelDisplay(detail: DiaphragmDetail) {
  return (
    getText(detail.modelDisplay) ||
    `${getText(detail.seriesId)} 标准型号`
  );
}

function toPublicAssetHref(value: unknown) {
  const text = getText(value).replaceAll("\\", "/");

  if (!text) return "";

  if (text.startsWith("/public/")) {
    return text.replace(/^\/public/, "");
  }

  if (text.startsWith("public/")) {
    return "/" + text.slice("public/".length);
  }

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 303


  return "隔膜泵";
}

function getModelDisplay(detail: DiaphragmDetail) {
  return (
    getText(detail.modelDisplay) ||
    `${getText(detail.seriesId)} 标准型号`
  );
}

function toPublicAssetHref(value: unknown) {
  const text = getText(value).replaceAll("\\", "/");

  if (!text) return "";

  if (text.startsWith("/public/")) {
    return text.replace(/^\/public/, "");
  }

  if (text.startsWith("public/")) {
    return "/" + text.slice("public/".length);
  }

  return text.startsWith("/") ? text : "/" + text;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 347

  return matched
    ? toPublicAssetHref((matched as any).url || matched.fullPath || matched.path || matched.fileName)
    : "";
}


function getCleanDiaphragmModelCode(detail: DiaphragmDetail) {
  const text = [
    detail.modelDisplay,
    detail.modelConfigurations?.[0]?.model,
    detail.title,
    detail.displayName,
    detail.seriesId,
    detail.slug,
  ]
    .map(getText)
    .filter(Boolean)
    .join(" ")
    .toUpperCase();

  const directMatch = text.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})\/([A-Z]{2})\b/i);

  if (directMatch) {
    return [
      directMatch[1],

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 349

    : "";
}


function getCleanDiaphragmModelCode(detail: DiaphragmDetail) {
  const text = [
    detail.modelDisplay,
    detail.modelConfigurations?.[0]?.model,
    detail.title,
    detail.displayName,
    detail.seriesId,
    detail.slug,
  ]
    .map(getText)
    .filter(Boolean)
    .join(" ")
    .toUpperCase();

  const directMatch = text.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})\/([A-Z]{2})\b/i);

  if (directMatch) {
    return [
      directMatch[1],
      directMatch[2],
      directMatch[3] + "/" + directMatch[4],

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 354

  const text = [
    detail.modelDisplay,
    detail.modelConfigurations?.[0]?.model,
    detail.title,
    detail.displayName,
    detail.seriesId,
    detail.slug,
  ]
    .map(getText)
    .filter(Boolean)
    .join(" ")
    .toUpperCase();

  const directMatch = text.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})\/([A-Z]{2})\b/i);

  if (directMatch) {
    return [
      directMatch[1],
      directMatch[2],
      directMatch[3] + "/" + directMatch[4],
    ].join("-").toUpperCase();
  }

  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 371

      directMatch[1],
      directMatch[2],
      directMatch[3] + "/" + directMatch[4],
    ].join("-").toUpperCase();
  }

  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 372

      directMatch[2],
      directMatch[3] + "/" + directMatch[4],
    ].join("-").toUpperCase();
  }

  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 374

    ].join("-").toUpperCase();
  }

  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 376


  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 377

  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 378

  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 382

      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,
  ]
    .map(getText)
    .join(" ")
    .toUpperCase();

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 387


  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,
  ]
    .map(getText)
    .join(" ")
    .toUpperCase();

  let series = "";

  if (sourceText.includes("DPGL800")) {
    series = "DPGL800";

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 389

    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,
  ]
    .map(getText)
    .join(" ")
    .toUpperCase();

  let series = "";

  if (sourceText.includes("DPGL800")) {
    series = "DPGL800";
  } else if (sourceText.includes("DPL30H")) {
    series = "DPL30H";

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 390

    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,
  ]
    .map(getText)
    .join(" ")
    .toUpperCase();

  let series = "";

  if (sourceText.includes("DPGL800")) {
    series = "DPGL800";
  } else if (sourceText.includes("DPL30H")) {
    series = "DPL30H";
  } else if (sourceText.includes("DPL60")) {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 393

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,
  ]
    .map(getText)
    .join(" ")
    .toUpperCase();

  let series = "";

  if (sourceText.includes("DPGL800")) {
    series = "DPGL800";
  } else if (sourceText.includes("DPL30H")) {
    series = "DPL30H";
  } else if (sourceText.includes("DPL60")) {
    series = "DPL60";
  } else if (sourceText.includes("DPL30")) {
    series = "DPL30";

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 446

  const parts = [series, motorType, productType].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : fallbackTitle;
}

function adaptToProductDetailClientData(detail: DiaphragmDetail) {
  const slug = normalizeSlug(detail.slug);
  const title = getText(detail.title || detail.displayName || detail.seriesId);
  const cleanModelCode = getCleanDiaphragmModelCode(detail);
  const seoProductTitle = getDiaphragmSeoProductTitle(detail, cleanModelCode, title);
  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl =
    findMediaUrlByType(detail, "主图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["images"]);

  const drawing2dUrl =
    findMediaUrlByType(detail, "2D") ||

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 448

  return parts.length > 0 ? parts.join(" ") : fallbackTitle;
}

function adaptToProductDetailClientData(detail: DiaphragmDetail) {
  const slug = normalizeSlug(detail.slug);
  const title = getText(detail.title || detail.displayName || detail.seriesId);
  const cleanModelCode = getCleanDiaphragmModelCode(detail);
  const seoProductTitle = getDiaphragmSeoProductTitle(detail, cleanModelCode, title);
  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl =
    findMediaUrlByType(detail, "主图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["images"]);

  const drawing2dUrl =
    findMediaUrlByType(detail, "2D") ||
    findMediaUrlByType(detail, "零件图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["drawings", ".pdf"]);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 449

}

function adaptToProductDetailClientData(detail: DiaphragmDetail) {
  const slug = normalizeSlug(detail.slug);
  const title = getText(detail.title || detail.displayName || detail.seriesId);
  const cleanModelCode = getCleanDiaphragmModelCode(detail);
  const seoProductTitle = getDiaphragmSeoProductTitle(detail, cleanModelCode, title);
  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl =
    findMediaUrlByType(detail, "主图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["images"]);

  const drawing2dUrl =
    findMediaUrlByType(detail, "2D") ||
    findMediaUrlByType(detail, "零件图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["drawings", ".pdf"]);


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 463

  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl =
    findMediaUrlByType(detail, "主图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["images"]);

  const drawing2dUrl =
    findMediaUrlByType(detail, "2D") ||
    findMediaUrlByType(detail, "零件图") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["drawings", ".pdf"]);

  const model3dUrl =
    findMediaUrlByType(detail, "3D") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["models", ".glb"]);

  const curveImageUrl =
    findMediaUrlByType(detail, "曲线") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["curves"]);

  const datasheetUrl =
    findMediaUrlByType(detail, "规格书") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["datasheets", ".pdf"]);

  return {
    ...detail,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 483

    findMediaUrlByType(detail, "规格书") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["datasheets", ".pdf"]);

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 484

    findDiaphragmMediaUrlByPathKeywords(detail, ["datasheets", ".pdf"]);

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 485


  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 486

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 488


    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,
    summary: description,
    intro: description,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 489

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,
    summary: description,
    intro: description,
    productIntro: description,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 490

    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 491

    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,
    advantages: description ? [description] : [],

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 492

    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,
    advantages: description ? [description] : [],


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 515

    advantages: description ? [description] : [],

    commonApplications: applications,
    applications,
    applicationScenarios: applications,

    modelDisplay: cleanModelCode,
    displayModel: cleanModelCode,
    foreachModel: cleanModelCode,
    modelCode: cleanModelCode,
    modelButtonText: getText(detail.modelButtonText || "型号配置"),
    modelConfigurations,

    image: mainImageUrl,
    imageUrl: mainImageUrl,
    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 516


    commonApplications: applications,
    applications,
    applicationScenarios: applications,

    modelDisplay: cleanModelCode,
    displayModel: cleanModelCode,
    foreachModel: cleanModelCode,
    modelCode: cleanModelCode,
    modelButtonText: getText(detail.modelButtonText || "型号配置"),
    modelConfigurations,

    image: mainImageUrl,
    imageUrl: mainImageUrl,
    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 517

    commonApplications: applications,
    applications,
    applicationScenarios: applications,

    modelDisplay: cleanModelCode,
    displayModel: cleanModelCode,
    foreachModel: cleanModelCode,
    modelCode: cleanModelCode,
    modelButtonText: getText(detail.modelButtonText || "型号配置"),
    modelConfigurations,

    image: mainImageUrl,
    imageUrl: mainImageUrl,
    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl
      ? {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 518

    applications,
    applicationScenarios: applications,

    modelDisplay: cleanModelCode,
    displayModel: cleanModelCode,
    foreachModel: cleanModelCode,
    modelCode: cleanModelCode,
    modelButtonText: getText(detail.modelButtonText || "型号配置"),
    modelConfigurations,

    image: mainImageUrl,
    imageUrl: mainImageUrl,
    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl
      ? {
          main: {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 528

    image: mainImageUrl,
    imageUrl: mainImageUrl,
    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl
      ? {
          main: {
            src: mainImageUrl,
            alt: seoProductTitle,
          },
        }
      : undefined,

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 530

    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl
      ? {
          main: {
            src: mainImageUrl,
            alt: seoProductTitle,
          },
        }
      : undefined,

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 538

    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl
      ? {
          main: {
            src: mainImageUrl,
            alt: seoProductTitle,
          },
        }
      : undefined,

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 554


    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    showDatasheetRequest: false,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 564

    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    showDatasheetRequest: false,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 568


    showDatasheetRequest: false,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 569

    showDatasheetRequest: false,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 572


    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 573

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 574

    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 575

    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

    seoTitle: getText(detail.seo?.title || seoProductTitle),

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 590

    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

    seoTitle: getText(detail.seo?.title || seoProductTitle),
    seoDescription: getText(detail.seo?.description || description),
    metaTitle: getText(detail.seo?.title || seoProductTitle),
    metaDescription: getText(detail.seo?.description || description),
  };
}

function getPreferredProductDetailData(slug: string) {
  const detail = findDetail(slug);

  if (!detail) {
    return null;
  }

  return adaptToProductDetailClientData(detail);
}

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 593

      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

    seoTitle: getText(detail.seo?.title || seoProductTitle),
    seoDescription: getText(detail.seo?.description || description),
    metaTitle: getText(detail.seo?.title || seoProductTitle),
    metaDescription: getText(detail.seo?.description || description),
  };
}

function getPreferredProductDetailData(slug: string) {
  const detail = findDetail(slug);

  if (!detail) {
    return null;
  }

  return adaptToProductDetailClientData(detail);
}

export function generateStaticParams() {
  return details

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 595

      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

    seoTitle: getText(detail.seo?.title || seoProductTitle),
    seoDescription: getText(detail.seo?.description || description),
    metaTitle: getText(detail.seo?.title || seoProductTitle),
    metaDescription: getText(detail.seo?.description || description),
  };
}

function getPreferredProductDetailData(slug: string) {
  const detail = findDetail(slug);

  if (!detail) {
    return null;
  }

  return adaptToProductDetailClientData(detail);
}

export function generateStaticParams() {
  return details
    .map((item) => normalizeSlug(item.slug))
    .filter(Boolean)

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 600

    seoDescription: getText(detail.seo?.description || description),
    metaTitle: getText(detail.seo?.title || seoProductTitle),
    metaDescription: getText(detail.seo?.description || description),
  };
}

function getPreferredProductDetailData(slug: string) {
  const detail = findDetail(slug);

  if (!detail) {
    return null;
  }

  return adaptToProductDetailClientData(detail);
}

export function generateStaticParams() {
  return details
    .map((item) => normalizeSlug(item.slug))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 601

    metaTitle: getText(detail.seo?.title || seoProductTitle),
    metaDescription: getText(detail.seo?.description || description),
  };
}

function getPreferredProductDetailData(slug: string) {
  const detail = findDetail(slug);

  if (!detail) {
    return null;
  }

  return adaptToProductDetailClientData(detail);
}

export function generateStaticParams() {
  return details
    .map((item) => normalizeSlug(item.slug))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 612


  return adaptToProductDetailClientData(detail);
}

export function generateStaticParams() {
  return details
    .map((item) => normalizeSlug(item.slug))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    return {
      title: "隔膜泵详情 | FOREACH",
    };
  }

  const title =
    getText(data.seoTitle || data.metaTitle || data.model || data.title) ||
    "隔膜泵详情";


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 614

}

export function generateStaticParams() {
  return details
    .map((item) => normalizeSlug(item.slug))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    return {
      title: "隔膜泵详情 | FOREACH",
    };
  }

  const title =
    getText(data.seoTitle || data.metaTitle || data.model || data.title) ||
    "隔膜泵详情";

  const description = getText(
    data.seoDescription ||

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 619

    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    return {
      title: "隔膜泵详情 | FOREACH",
    };
  }

  const title =
    getText(data.seoTitle || data.metaTitle || data.model || data.title) ||
    "隔膜泵详情";

  const description = getText(
    data.seoDescription ||
      data.metaDescription ||
      data.description ||
      data.summary
  );


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 646

    description,
  };
}

export default async function DiaphragmPumpDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return <ProductDetailView data={data} />;
}

---

## 6. build 检查


> foreach-website-2026@0.1.0 build
> next build

鈻?Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
鉁?Compiled successfully in 6.0s
  Running TypeScript ...
  Finished TypeScript in 4.4s ...
  Collecting page data using 23 workers ...
  Generating static pages using 23 workers (0/577) ...
  Generating static pages using 23 workers (144/577) 
  Generating static pages using 23 workers (288/577) 
  Generating static pages using 23 workers (432/577) 
鉁?Generating static pages using 23 workers (577/577) in 2.0s
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

