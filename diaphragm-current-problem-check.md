# 隔膜泵当前问题检查

## 1. 当前 build 报错相关：ProductDetailPageData 类型定义


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 27


import SitePageShell from "@/components/layout/SitePageShell";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 31


import type { CSSProperties, MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 33

import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 34

import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 73

    "-" +
    capacityCode +
    ".pdf#toolbar=0&navpanes=0&scrollbar=1"
  );
}

function isPlungerPumpDisplayModel(value: unknown): boolean {
  const model = String(value || "").trim();

  return /^(EA|SM|TM)-/i.test(model);
}

function getDisplayModelText(data: any): string {
  if (isCustomInquiryMode(data)) {
    return "定制配置请联系我们";
  }

  return (data as any).displayModel || data.model || "";
}

function isCustomInquiryMode(data: any): boolean {
  const detailMode = String(
    data?.detailMode ||

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 79

function isPlungerPumpDisplayModel(value: unknown): boolean {
  const model = String(value || "").trim();

  return /^(EA|SM|TM)-/i.test(model);
}

function getDisplayModelText(data: any): string {
  if (isCustomInquiryMode(data)) {
    return "定制配置请联系我们";
  }

  return (data as any).displayModel || data.model || "";
}

function isCustomInquiryMode(data: any): boolean {
  const detailMode = String(
    data?.detailMode ||
      data?.hero?.detailMode ||
      data?.productMode ||
      data?.mode ||
      ""
  ).trim();


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 84


function getDisplayModelText(data: any): string {
  if (isCustomInquiryMode(data)) {
    return "定制配置请联系我们";
  }

  return (data as any).displayModel || data.model || "";
}

function isCustomInquiryMode(data: any): boolean {
  const detailMode = String(
    data?.detailMode ||
      data?.hero?.detailMode ||
      data?.productMode ||
      data?.mode ||
      ""
  ).trim();

  if (
    detailMode === "custom_inquiry" ||
    detailMode === "custom" ||
    detailMode === "customized"
  ) {

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 121

  }

  if (data?.showConfigurator === true || data?.hasConfigurator === true) {
    return false;
  }

  const displayModel = data?.displayModel || data?.model || "";

  return isPlungerPumpDisplayModel(displayModel);
}

function getModelActionText(data: any): string {
  return isCustomInquiryMode(data) ? "联系我们" : "型号选择";
}

function isPlungerPumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("柱塞泵") ||
    text.includes("plunger pump") ||
    text.includes("plunger-pumps") ||
    text.includes("piston pump") ||

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 123

  if (data?.showConfigurator === true || data?.hasConfigurator === true) {
    return false;
  }

  const displayModel = data?.displayModel || data?.model || "";

  return isPlungerPumpDisplayModel(displayModel);
}

function getModelActionText(data: any): string {
  return isCustomInquiryMode(data) ? "联系我们" : "型号选择";
}

function isPlungerPumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("柱塞泵") ||
    text.includes("plunger pump") ||
    text.includes("plunger-pumps") ||
    text.includes("piston pump") ||
    text.includes("ea-") ||
    text.includes("eas-") ||

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 299


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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 300

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 301

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 312

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 313

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 314


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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 330

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
        data.imageCard ||
        data.image ||
        data.imageUrl ||
        data.mainImage ||
        data.heroImage ||
        "",
      detailHref:
        data.detailHref ||
        data.href ||
        (data.slug ? `/products/pumps/diaphragm-pumps/${data.slug}` : ""),
    };
  }

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 351

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 679

                {data.commonApplications.join("、")}
              </p>
            </div>

            <div className={styles.operationArea}>
              <div data-product-model-row="true" className={styles.modelLine}>
                <div className={styles.modelCodeWrap}>
                  <div className={styles.modelCodeText}>
                    <span className={styles.modelLabel}>型号：</span>
                    <span className={styles.modelCode}>{getDisplayModelText(data)}</span>
                  </div>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => {
                      const href = getModelActionHref(data);

                      if (isCustomInquiryMode(data)) {
                        window.location.href = href;
                        return;
                      }

                      window.open(href, "_blank", "noopener,noreferrer");

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 680

              </p>
            </div>

            <div className={styles.operationArea}>
              <div data-product-model-row="true" className={styles.modelLine}>
                <div className={styles.modelCodeWrap}>
                  <div className={styles.modelCodeText}>
                    <span className={styles.modelLabel}>型号：</span>
                    <span className={styles.modelCode}>{getDisplayModelText(data)}</span>
                  </div>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => {
                      const href = getModelActionHref(data);

                      if (isCustomInquiryMode(data)) {
                        window.location.href = href;
                        return;
                      }

                      window.open(href, "_blank", "noopener,noreferrer");
                    }}

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 682


            <div className={styles.operationArea}>
              <div data-product-model-row="true" className={styles.modelLine}>
                <div className={styles.modelCodeWrap}>
                  <div className={styles.modelCodeText}>
                    <span className={styles.modelLabel}>型号：</span>
                    <span className={styles.modelCode}>{getDisplayModelText(data)}</span>
                  </div>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => {
                      const href = getModelActionHref(data);

                      if (isCustomInquiryMode(data)) {
                        window.location.href = href;
                        return;
                      }

                      window.open(href, "_blank", "noopener,noreferrer");
                    }}
                  >
                    {getModelActionText(data)}

### F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail-faq.zh.ts Line 9

   规则：
   1. FAQ 按产品系列维护
   2. 不按单个型号重复维护
   3. 页面会根据 faqSeries / faqKey 自动读取
========================================================= */

export type ProductDetailFaqZhItem = {
  question: string;
  answer: string;
};

export const productDetailFaqZhBySeries: Record<
  string,
  ProductDetailFaqZhItem[]
> = {
  /*
   * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
   * 同属 EA 常规柱塞泵系列，后续统一在这里补 FAQ。
   */
  "EA常规柱塞泵": [
    {
      question: "EA 常规柱塞泵适合哪些应用场景？",
      answer:

### F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.types.ts Line 17

   当前第一版：
   1. 只做中文
   2. FAQ 只预留，不显示
   3. 按钮只保留业务端口
========================================================= */

export type ProductDetailCategory =
  | "pumps"
  | "valves"
  | "needles"
  | "controllers";

export type ProductDetailFaqItem = {
  question: string;
  answer: string;
};

export type ProductSpecItem = {
  label: string;
  value: string;
};

export type ProductDetailZhRecord = {

### F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.types.ts Line 23

export type ProductDetailCategory =
  | "pumps"
  | "valves"
  | "needles"
  | "controllers";

export type ProductDetailFaqItem = {
  question: string;
  answer: string;
};

export type ProductSpecItem = {
  label: string;
  value: string;
};

export type ProductDetailZhRecord = {
  category: ProductDetailCategory;
  slug: string;
  model: string;
  name: string;
  advantages: string[];
  commonApplications: string[];

### F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.types.ts Line 33


export type ProductSpecItem = {
  label: string;
  value: string;
};

export type ProductDetailZhRecord = {
  category: ProductDetailCategory;
  slug: string;
  model: string;
  name: string;
  advantages: string[];
  commonApplications: string[];

  /**
   * 详情页附属图片。
   * 主图不在这里维护，后续从选型页面基础数据读取。
   * 没有附属图时使用空数组。
   */
  additionalImages: string[];

  showConfigurator: boolean;
  showDatasheetRequest: boolean;

### F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.types.ts Line 70

  /**
   * 用于关联对应产品系列的规格参数数据。
   */
  specSeriesKey: string;
};

export type ProductDetailPageData = ProductDetailZhRecord & {
  /**
   * 后续从选型页面基础数据读取。
   */
  mainImage: string | null;

  /**
   * 后续由产品系列规格 Excel 生成。
   */
  specs: ProductSpecItem[];
};

---

## 2. ProductDetailClient 中刚才新增的清单逻辑


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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 202

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 297

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 299

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 300

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 301


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


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 309

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 310

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 312

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 313

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 314

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 348

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


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 349

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 378

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 379

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 386

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 387

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 728

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

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 747

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

---

## 3. 全项目搜索 HaloFlx / HaloDp 来源


### F:\WebsiteProjects\foreach-website-2026\app\products\products.css Line 2546

/* 产品中心：产品种类介绍区最终整理版
   说明：
   1. 这是产品中心顶部产品种类介绍区的唯一最终样式
   2. 左侧产品图固定占位，右侧正文吃满剩余空间
   3. HaloFlx 仅作为右下角背景装饰，不参与布局、不预留空间
   4. 只加粗 .product-type-intro-emphasis 包住的指定文字
========================================================= */

.products-selection-page .product-type-intro-module {
  position: relative !important;
  isolation: isolate !important;
  width: 100% !important;
  margin: 0 0 28px !important;
  padding: 24px 0 24px 0 !important;
  display: grid !important;
  grid-template-columns: 430px minmax(0, 1fr) !important;
  gap: 46px !important;

### F:\WebsiteProjects\foreach-website-2026\app\products\products.css Line 2625

  color: #111111 !important;
  font-weight: 800 !important;
}

/* HaloFlx 右下角装饰字：背景层，不占空间 */
.products-selection-page .product-type-intro-module::after {
  content: "HaloFlx";
  position: absolute !important;
  z-index: 1 !important;
  top: auto !important;
  right: 28px !important;
  bottom: 18px !important;
  transform: none !important;
  color: #09E9B4 !important;
  font-size: 86px !important;
  font-weight: 840 !important;
  line-height: 1 !important;

### F:\WebsiteProjects\foreach-website-2026\app\products\products.css Line 2627

}

/* HaloFlx 右下角装饰字：背景层，不占空间 */
.products-selection-page .product-type-intro-module::after {
  content: "HaloFlx";
  position: absolute !important;
  z-index: 1 !important;
  top: auto !important;
  right: 28px !important;
  bottom: 18px !important;
  transform: none !important;
  color: #09E9B4 !important;
  font-size: 86px !important;
  font-weight: 840 !important;
  line-height: 1 !important;
  letter-spacing: -0.05em !important;
  opacity: 0.14 !important;

### F:\WebsiteProjects\foreach-website-2026\fix-diaphragm-intro-halodp.js Line 8

let code = fs.readFileSync(file, "utf8");

/*
 * 只改隔膜泵产品介绍区：
 * HaloFlx -> HaloDp
 * 不影响柱塞泵等其他产品线。
 */
const targetKey = "pumps:diaphragm-pump";
const start = code.indexOf(targetKey);

if (start < 0) {
  throw new Error("未找到 pumps:diaphragm-pump，请先检查 product-type-intro.ts");
}

const nextBlockCandidates = [
  code.indexOf('"pumps:', start + targetKey.length),
  code.indexOf("'pumps:", start + targetKey.length),

### F:\WebsiteProjects\foreach-website-2026\fix-diaphragm-intro-halodp.js Line 29

const before = code.slice(0, start);
let block = code.slice(start, end);
const after = code.slice(end);

if (!block.includes("HaloFlx")) {
  console.log("隔膜泵区块内没有 HaloFlx，可能已经改过。");
} else {
  block = block.replace(/HaloFlx/g, "HaloDp");
  code = before + block + after;
  fs.writeFileSync(file, code, "utf8");
  console.log("patched:", file);
  console.log("HaloFlx -> HaloDp only in pumps:diaphragm-pump block");
}

### F:\WebsiteProjects\foreach-website-2026\fix-diaphragm-intro-halodp.js Line 30

let block = code.slice(start, end);
const after = code.slice(end);

if (!block.includes("HaloFlx")) {
  console.log("隔膜泵区块内没有 HaloFlx，可能已经改过。");
} else {
  block = block.replace(/HaloFlx/g, "HaloDp");
  code = before + block + after;
  fs.writeFileSync(file, code, "utf8");
  console.log("patched:", file);
  console.log("HaloFlx -> HaloDp only in pumps:diaphragm-pump block");
}

### F:\WebsiteProjects\foreach-website-2026\fix-diaphragm-intro-halodp.js Line 32


if (!block.includes("HaloFlx")) {
  console.log("隔膜泵区块内没有 HaloFlx，可能已经改过。");
} else {
  block = block.replace(/HaloFlx/g, "HaloDp");
  code = before + block + after;
  fs.writeFileSync(file, code, "utf8");
  console.log("patched:", file);
  console.log("HaloFlx -> HaloDp only in pumps:diaphragm-pump block");
}

### F:\WebsiteProjects\foreach-website-2026\fix-diaphragm-intro-halodp.js Line 36

  block = block.replace(/HaloFlx/g, "HaloDp");
  code = before + block + after;
  fs.writeFileSync(file, code, "utf8");
  console.log("patched:", file);
  console.log("HaloFlx -> HaloDp only in pumps:diaphragm-pump block");
}

---

## 4. 产品介绍区组件来源检查


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 75

    .filter(Boolean);

  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">暂无图片</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{safeTitle}</h3>

        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} 关键参数`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 76


  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">暂无图片</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{safeTitle}</h3>

        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} 关键参数`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>
        ) : safeSubtitle ? (

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 77

  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">暂无图片</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{safeTitle}</h3>

        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} 关键参数`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{safeSubtitle}</p>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 79

      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">暂无图片</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{safeTitle}</h3>

        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} 关键参数`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{safeSubtitle}</p>
        ) : null}


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 17

  getProductTypeFilterOptionsByCategory,
  getProductTypeHrefByIds,
  getSeriesFilterOptionsByProductType,
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 800

   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({
        key: "productType",
        value: activeProductTypeId,
        label: getTaxonomyLabel(locale, activeProductTypeId),
      });
    }

    FILTER_KEYS.forEach((filterKey) => {
      const values = selectedFilters[filterKey];

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1267

      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],
      quantity: 1,
      needDrawing: false,
      imagePath: product.imageCard,
      detailHref: makeDetailHref(product),
    };
  }

  function toggleProductInList(product: ProductSelectionProduct) {
    const currentItem = getItem("pump-selection", product.productId);

    if (currentItem) {
      removeItem(currentItem.id);
      return;
    }

    addItem(createProductCartItem(product));
  }

  return (

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1320

              onToggleMobileCategory={() =>
                setMobileCategoryOpen((current) => !current)
              }
              onCategoryChange={handleCategoryChange}
            />

            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1322

              }
              onCategoryChange={handleCategoryChange}
            />

            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1323

              onCategoryChange={handleCategoryChange}
            />

            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1325


            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1327

              <section
                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1328

                className="product-type-intro-module"
                aria-label={`${activeProductTypeIntro.title}产品种类说明`}
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1333

                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1334

                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1335

                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
                    const emphasisText = "详情页查看或提交选型需求确认";
                    const emphasisIndex = paragraph.indexOf(emphasisText);

                    if (emphasisIndex < 0) {
                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1346

                      return <p key={paragraph}>{paragraph}</p>;
                    }

                    return (
                  <p key={paragraph}>
                    {paragraph.slice(0, emphasisIndex)}
                    <strong className="product-type-intro-emphasis">
                      {emphasisText}
                    </strong>
                    {paragraph.slice(emphasisIndex + emphasisText.length)}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}
        <section className="selection-section">
          <div className="selection-layout">
            <ProductFilterPanel
              activeCategory={activeCategory}
              filterGroups={filterGroups}
              mobileOpenFilterGroups={mobileOpenFilterGroups}
              onToggleMobileGroup={toggleMobileFilterGroup}

---

## 5. 隔膜泵适配层当前标题/型号字段


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


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 173

      const label = getText(item.parameter);
      const value = getText(item.value);
      const note = getText(item.note);

      return {
        label,
        name: label,
        title: label,
        value,
        content: value,
        note,
        remark: note,
      };
    })
    .filter((item) => item.label && item.value);
}


function normalizeSpecGroupTitle(value: unknown) {
  const title = getText(value);

  /*
   * ProductDetailClient 外层已经显示“规格参数”。

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 174

      const value = getText(item.value);
      const note = getText(item.note);

      return {
        label,
        name: label,
        title: label,
        value,
        content: value,
        note,
        remark: note,
      };
    })
    .filter((item) => item.label && item.value);
}


function normalizeSpecGroupTitle(value: unknown) {
  const title = getText(value);

  /*
   * ProductDetailClient 外层已经显示“规格参数”。
   * 如果数据分组标题也叫“规格参数”，页面会出现重复标题。

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 246

        const label = getText(item.parameter);
        const value = getText(item.value);
        const note = getText(item.note);

        return {
          label,
          name: label,
          title: label,
          value,
          content: value,
          note,
          remark: note,
        };
      })
      .filter((item) => item.label && item.value),
  }));

  return groups.filter((group) => group.items.length > 0);
}

function normalizeFaqs(detail: DiaphragmDetail) {
  return (detail.faqs || [])
    .map((item) => ({

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 247

        const value = getText(item.value);
        const note = getText(item.note);

        return {
          label,
          name: label,
          title: label,
          value,
          content: value,
          note,
          remark: note,
        };
      })
      .filter((item) => item.label && item.value),
  }));

  return groups.filter((group) => group.items.length > 0);
}

function normalizeFaqs(detail: DiaphragmDetail) {
  return (detail.faqs || [])
    .map((item) => ({
      question: getText(item.question),

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 272

    .filter((item) => item.question && item.answer);
}

function normalizeModelConfigurations(detail: DiaphragmDetail) {
  return (detail.modelConfigurations || []).map((item) => ({
    itemCode: getText(item.itemCode),
    model: getText(item.model),
    category: getText(item.category),
    motorType: getText(item.motorType),
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

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 495

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

    commonApplications: applications,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 502

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

    commonApplications: applications,
    applications,
    applicationScenarios: applications,

    modelDisplay: cleanModelCode,
    displayModel: cleanModelCode,
    foreachModel: cleanModelCode,
    modelCode: cleanModelCode,

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

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 623

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

  return {
    title: title.includes("FOREACH") ? title : `${title} | FOREACH`,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 639

      data.metaDescription ||
      data.description ||
      data.summary
  );

  return {
    title: title.includes("FOREACH") ? title : `${title} | FOREACH`,
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

## 6. build 报错复现


> foreach-website-2026@0.1.0 build
> next build

鈻?Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
鉁?Compiled successfully in 5.8s
  Running TypeScript ...
Failed to type check.
System.Management.Automation.RemoteException
./components/products/detail/ProductDetailClient.tsx:299:12
Type error: Property 'modelDisplay' does not exist on type 'ProductDetailPageData'.
System.Management.Automation.RemoteException
  [90m297 |[0m   [36mfunction[0m getDetailCartProductCode() {
  [90m298 |[0m     [36mreturn[0m [33mString[0m(
[31m[1m>[0m [90m299 |[0m       data.modelDisplay ||
  [90m    |[0m            [31m[1m^[0m
  [90m300 |[0m         data.displayModel ||
  [90m301 |[0m         data.foreachModel ||
  [90m302 |[0m         data.model ||
Next.js build worker exited with code: 1 and signal: null
