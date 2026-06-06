/* =========================================================
   page.tsx
   恒永达官网｜Q20 接头型号替代详情页入口

   文件路径：
   app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx

   页面路径示例：
   /resources/selection-support/fitting-replacement/q20/839085

   作用：
   1. 根据商品编码生成 Q20 详情页
   2. 从 service 层读取详情数据
   3. 渲染 FittingReplacementDetail 组件
   4. 为静态导出预生成所有 Q20 商品编码页面

   为什么用商品编码做路径：
   1. 商品编码是唯一 ID
   2. 同一个型号可能对应多个商品编码
   3. 用商品编码做详情页路径更稳定
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FittingReplacementDetail from "@/components/resources/fitting-replacement/FittingReplacementDetail";

import {
  getFittingReplacementDetailData,
  getFittingReplacementDetailStaticParams,
} from "../../../../../../services/resources/getFittingReplacementDetailData";

import "../../fitting-replacement.css";
import "./fitting-replacement-detail.css";

/* =========================================================
   页面参数类型

   说明：
   1. 当前项目使用较新的 Next.js 写法
   2. params 按 Promise 处理更稳
========================================================= */
interface FittingReplacementDetailPageProps {
  params: Promise<{
    productCode: string;
  }>;
}

/* =========================================================
   静态导出参数

   说明：
   如果 next.config.js 使用 output: "export"，
   动态详情页必须提前生成所有商品编码路径。
========================================================= */
export function generateStaticParams() {
  return getFittingReplacementDetailStaticParams();
}

/* =========================================================
   SEO 信息

   说明：
   1. 根据商品编码找到产品
   2. 用恒永达型号生成页面标题
========================================================= */
export async function generateMetadata({
  params,
}: FittingReplacementDetailPageProps): Promise<Metadata> {
  const { productCode } = await params;
  const pageData = await getFittingReplacementDetailData(productCode);

  if (!pageData) {
    return {
      title: "接头型号替代详情｜恒永达",
    };
  }

  return {
    title: `${pageData.product.foreachModel}｜接头型号替代详情｜恒永达`,
    description: `查看 ${pageData.product.foreachModel} 对应商品编码、兼容编码与 Q20 快插接头参数信息。`,
  };
}

/* =========================================================
   Q20 接头型号替代详情页
========================================================= */
export default async function FittingReplacementDetailPage({
  params,
}: FittingReplacementDetailPageProps) {
  const { productCode } = await params;
  const pageData = await getFittingReplacementDetailData(productCode);

  if (!pageData) {
    notFound();
  }

  return <FittingReplacementDetail data={pageData} />;
} 