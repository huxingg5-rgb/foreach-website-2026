/* =========================================================
   page.tsx
   恒永达官网｜中文产品中心入口页

   文件路径：
   app/products/page.tsx

   说明：
   1. 对应中文默认产品中心路径：/products
   2. 中文页面不加 /zh-CN 路径前缀
   3. 页面结构交给 ProductSelectionClient 渲染
   4. 当前阶段产品中心数据来自本地静态数据与 generated 数据
   5. 后续如果接后端 / CMS / 数据库，优先改 service 或 data 层
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
