/* =========================================================
   page.tsx
   恒永达官网｜资源中心｜规格书下载｜中文页面

   文件路径：
   app/resources/datasheets/page.tsx

   页面访问地址：
   /resources/datasheets

   说明：
   1. 中文页面不使用 /zh-CN 前缀
   2. 当前文件只负责中文规格书页面入口
   3. 页面数据统一从 service 层获取
   4. 后期接后端、CMS、数据库时，当前文件不用改
========================================================= */

import type { Metadata } from "next"; // 引入 Next.js 页面 SEO 类型

import DatasheetsClient from "@/components/resources/DatasheetsClient"; // 引入规格书页面客户端组件

import { getDatasheetsPageData } from "@/services/resources/getDatasheetsPageData"; // 从 service 层获取规格书页面数据

import "@/app/resources/datasheets/datasheets.css"; // 引入规格书页面专用样式文件

/* =========================================================
   generateMetadata
   生成中文规格书页面 SEO
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getDatasheetsPageData("zh-CN");

  return {
    title: pageData.pageText.seo.title,
    description: pageData.pageText.seo.description,
  };
}

/* =========================================================
   DatasheetsPage
   中文规格书下载页面
========================================================= */

export default async function DatasheetsPage() {
  const pageData = await getDatasheetsPageData("zh-CN");

  return (
    <DatasheetsClient
      pageText={pageData.pageText}
      filterOptions={pageData.filterOptions}
      datasheetItems={pageData.datasheetItems}
    />
  );
}