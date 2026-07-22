/* =========================================================
   page.tsx
   恒永达官网｜中文公司新闻列表页入口

   页面路径：
   /resources/news

   说明：
   1. page.tsx 只做页面入口
   2. 数据统一从 service 层获取
   3. 页面交互交给 NewsListClient
========================================================= */

import type { Metadata } from "next";

import NewsListClient from "@/components/resources/news/NewsListClient";
import { getNewsPageData } from "@/services/resources/news/getNewsPageData";

import "./news.css";

export const metadata: Metadata = {
  title: "公司新闻｜资源中心｜FOREACH 恒永达",
  description:
    "了解恒永达在展会活动、企业发展、技术创新、质量体系与重要公告中的最新动态。",
};

export default function NewsPage() {
  const pageData = getNewsPageData("zh-CN");

  return <NewsListClient pageData={pageData} />;
} 