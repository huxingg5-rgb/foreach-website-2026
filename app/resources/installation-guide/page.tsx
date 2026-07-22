/* =========================================================
   page.tsx
   恒永达官网｜中文安装教程页面入口

   文件路径：
   app/resources/installation-guide/page.tsx

   作用：
   1. 负责生成 /resources/installation-guide 页面
   2. 从 service 层读取安装教程页面数据
   3. 渲染 450px Banner
   4. 接入 InstallationGuideClient 交互组件
========================================================= */

import type { Metadata } from "next";
import InstallationGuideClient from "@/components/resources/installation-guide/InstallationGuideClient";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";

/* 复用接头替代查询页面已有搜索栏样式 */
import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";

/* 安装教程页面自己的样式 */
import "./installation-guide.css";
export const metadata: Metadata = {
  title: "安装教程｜FOREACH 恒永达",
  description: "FOREACH 产品安装、调试与使用教程。",
};

export default function InstallationGuidePage() {
  const pageData = getInstallationGuidePageData("zh-CN");

  return (
    <>
      <section className="installation-guide-hero resource-center-banner">
        <div className="installation-guide-hero-inner resource-center-banner__inner">
          <div className="installation-guide-hero-content resource-center-banner__content">

            <h1 className="resource-center-banner__title">{pageData.hero.title}</h1>
            <p className="resource-center-banner__description">{pageData.hero.description}</p>
          </div>
        </div>
      </section>

      <InstallationGuideClient pageData={pageData} />
    </>
  );
} 
