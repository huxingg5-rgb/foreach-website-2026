import ApplicationPageSkeleton from "@/components/common/ApplicationPageSkeleton";
import { Suspense } from "react";
/* =========================================================
   page.tsx
   恒永达官网｜中文 IVD 应用领域页入口

   路径：
   /applications/ivd

   说明：
   1. page.tsx 只负责页面入口
   2. 数据统一从 service 层获取
   3. 展示和交互交给 IvdApplicationClient
   4. CSS 使用页面专用文件，不放进 globals.css
========================================================= */

import type { Metadata } from "next";

import IvdApplicationClient from "@/components/applications/ivd/IvdApplicationClient";
import { getIvdApplicationPageData } from "@/services/applications/ivd/getIvdApplicationPageData";

import "./ivd-application.css";

export const metadata: Metadata = {
  title: "IVD 体外诊断液路系统产品支持｜恒永达",
  description:
    "恒永达为生化、免疫、血液、凝血、分子诊断等 IVD 仪器提供泵、阀、接头、管路、传感器等微流体核心部件支持。",
};

export default function IvdApplicationPage() {
  const pageData = getIvdApplicationPageData("zh-CN");

  return (
    <Suspense fallback={<ApplicationPageSkeleton />}>
      <IvdApplicationClient data={pageData} />
    </Suspense>
  );
}