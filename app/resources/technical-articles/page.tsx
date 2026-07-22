/* =========================================================
   page.tsx
   恒永达官网｜中文技术文章列表页入口

   页面路径：
   /resources/technical-articles
========================================================= */

import type { Metadata } from "next";

import TechnicalArticlesClient from "@/components/resources/technical-articles/TechnicalArticlesClient";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";

import "./technical-articles.css";

export const metadata: Metadata = {
  title: "技术文章｜资源中心｜FOREACH 恒永达",
  description:
    "恒永达技术文章，分享微流体系统中的产品选型、材料兼容、管路连接、密封方式与应用设计经验。",
};

export default function TechnicalArticlesPage() {
  const pageData = getTechnicalArticlesPageData("zh-CN");

  return <TechnicalArticlesClient pageData={pageData} />;
}