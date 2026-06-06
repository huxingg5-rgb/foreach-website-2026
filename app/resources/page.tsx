/* =========================================================
   page.tsx
   恒永达官网｜资源中心｜中文入口页

   文件路径：
   app/resources/page.tsx

   页面访问地址：
   /resources

   说明：
   1. 这是中文资源中心首页入口
   2. 当前阶段资源中心首页还没有正式设计
   3. 为避免 /resources 为空或 404，暂时复用规格书下载页
   4. 后期资源中心首页做好后，再把这里改成真正的资源中心首页
========================================================= */

import type { Metadata } from "next";

import DatasheetsClient from "@/components/resources/DatasheetsClient";

import { getDatasheetsPageData } from "@/services/resources/getDatasheetsPageData";

import "@/app/resources/datasheets/datasheets.css";

/* =========================================================
   页面 SEO
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getDatasheetsPageData("zh-CN");

  return {
    title: "资源中心 | 恒永达",
    description:
      "恒永达资源中心，提供产品规格书、选型支持、安装教程、材料兼容、常见问题与公司新闻等资料。",
    alternates: {
      canonical: "/resources",
    },
  };
}

/* =========================================================
   ResourcesPage
   中文资源中心临时入口页
========================================================= */

export default async function ResourcesPage() {
  const pageData = await getDatasheetsPageData("zh-CN");

  return (
    <DatasheetsClient
      pageText={pageData.pageText}
      filterOptions={pageData.filterOptions}
      datasheetItems={pageData.datasheetItems}
    />
  );
} 