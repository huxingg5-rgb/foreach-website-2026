import type { Metadata } from "next";
import AboutForeachClient from "./AboutForeachClient";
import CompanyPageStructuredData from "@/components/common/CompanyPageStructuredData";

/* =========================================================
   文件路径：
   app/about/foreach/page.tsx

   作用：
   1. 保留 metadata，利于 SEO
   2. 页面主体交给 AboutForeachClient
   3. 不在 page.tsx 里写 use client
========================================================= */

const pageSeo = {
  title: "关于恒永达｜深圳市恒永达科技股份有限公司",
  description:
    "深圳市恒永达科技股份有限公司专注于微流体系统核心零部件与液路解决方案，为 IVD、生命科学、高端分析仪器、合成生物和实验室自动化设备提供关键流体控制产品与系统级支持。",
};

export const metadata: Metadata = pageSeo;

export default function AboutForeachPage() {
  return (
    <>
      <CompanyPageStructuredData
        type="AboutPage"
        path="/about/foreach/"
        name={pageSeo.title}
        description={pageSeo.description}
        locale="zh-CN"
      />
      <AboutForeachClient />
    </>
  );
}
