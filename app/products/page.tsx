/* =========================================================
   page.tsx
   恒永达官网｜中文产品中心选型页入口

   文件路径：
   app/products/page.tsx

   说明：
   1. 中文产品中心访问路径为 /products
   2. 中文默认不加 /zh-CN 前缀
   3. 页面结构严格交给 ProductSelectionClient 渲染
   4. 不在这里单独渲染面包屑，避免和 HTML 预览结构不一致
========================================================= */

import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import "./products.css";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient locale="zh" />
    </Suspense>
  );
}
