/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 研发与制造能力 中文页面入口

   页面路径：
   /about/research-manufacturing

   文件路径：
   app/about/research-manufacturing/page.tsx

   说明：
   1. 这个文件只负责中文页面入口和 SEO 信息
   2. 页面主体内容由 components/about/ResearchManufacturingPageContent 渲染
   3. 这里不能写 "use client"，否则 metadata 会报错
========================================================= */

import type { Metadata } from "next";

import ResearchManufacturingPageContent from "@/components/about/ResearchManufacturingPageContent";
import { getResearchManufacturingSeo } from "@/data/about-research-manufacturing";

/* =========================================================
   中文页面 SEO 信息
========================================================= */
const seo = getResearchManufacturingSeo("zh-CN");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: "/about/research-manufacturing",
  },
};

/* =========================================================
   中文研发与制造能力页面
========================================================= */
export default function AboutResearchManufacturingPage() {
  return <ResearchManufacturingPageContent locale="zh-CN" />;
} 