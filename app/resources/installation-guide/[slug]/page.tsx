/* =========================================================
   page.tsx
   恒永达官网｜中文安装教程详情页临时入口

   文件路径：
   app/resources/installation-guide/[slug]/page.tsx

   作用：
   1. 生成中文安装教程详情页路径
   2. 当前阶段先做空白页，确保列表卡片可以跳转
   3. 因为项目使用 output: "export"，动态路由必须写 generateStaticParams()
   4. 后续正式做详情页时，再替换为 InstallationGuideDetail 组件

   当前生成路径示例：
   /resources/installation-guide/hard-tube-fitting-guide
   /resources/installation-guide/plunger-pump-install-guide
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { installationGuideZhData } from "@/data/resources/installation-guide/installation-guide.zh";

type InstallationGuideDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: "安装教程详情｜FOREACH 恒永达",
  description: "FOREACH 产品安装教程详情页。",
};

/* =========================================================
   静态导出参数
   说明：
   1. 项目使用 output: "export"
   2. /resources/installation-guide/[slug] 是动态路由
   3. 所以必须提前告诉 Next.js 要生成哪些 slug 页面
   4. 当前直接从中文安装教程静态数据里读取 guide.id
========================================================= */

export function generateStaticParams() {
  return installationGuideZhData.guides.map((guide) => ({
    slug: guide.id,
  }));
}

export default async function InstallationGuideDetailPage({
  params,
}: InstallationGuideDetailPageProps) {
  const { slug } = await params;

  const currentGuide = installationGuideZhData.guides.find((guide) => {
    return guide.id === slug;
  });

  if (!currentGuide) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* 
        临时空白页：
        1. 当前只保留 slug，方便确认路由已生效
        2. 后续正式做详情页时，再替换为 InstallationGuideDetail 组件
      */}
      <div style={{ display: "none" }}>{currentGuide.id}</div>
    </main>
  );
} 