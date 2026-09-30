/* =========================================================
   page.tsx
   恒永达官网｜多语言安装教程详情页临时入口

   文件路径：
   app/[locale]/resources/installation-guide/[slug]/page.tsx

   作用：
   1. 生成多语言安装教程详情页路径：
      /en/resources/installation-guide/[slug]
      /es/resources/installation-guide/[slug]
      /fr/resources/installation-guide/[slug]
      /ko/resources/installation-guide/[slug]
      /ru/resources/installation-guide/[slug]
   2. 当前阶段先做空白页，确保列表卡片可以跳转
   3. 因为项目使用 output: "export"，动态路由必须写 generateStaticParams()
   4. 后续再补视频、图文步骤和多语言文案
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import Sv10VideoPage from "@/components/resources/installation-guide/Sv10VideoPage";
import { sv10Video } from "@/data/resources/installation-guide/installation-guide.sv10.en";
import { getCanonicalUrl } from "@/lib/seo/site-url";

const INSTALLATION_GUIDE_DETAIL_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type InstallationGuideDetailLocale =
  (typeof INSTALLATION_GUIDE_DETAIL_LOCALES)[number];

type InstallationGuideIntlDetailPageProps = {
  params: Promise<{
    locale: InstallationGuideDetailLocale;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: InstallationGuideIntlDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (locale === "en" && slug === sv10Video.id) {
    const url = getCanonicalUrl(sv10Video.detailHref);
    return {
      title: sv10Video.seoTitle,
      description: sv10Video.description,
      alternates: { canonical: url },
      openGraph: { title: sv10Video.title, description: sv10Video.description, url,
        type: "website", locale: "en_US", images: [{ url: sv10Video.thumbnail, alt: sv10Video.title }] },
      twitter: { card: "summary_large_image", title: sv10Video.title,
        description: sv10Video.description, images: [sv10Video.thumbnail] },
    };
  }

  if (locale === "en") {
    return {
      title: "Installation Guide Detail｜Foreach Technology",
      description: "Foreach product installation guide detail page.",
    };
  }

  const guide = getInstallationGuidePageData(locale).guides.find((item) => item.id === slug);
  if (!guide) return {};

  return {
    title: `${guide.title}｜Foreach Technology`,
    description: guide.description,
    openGraph: { title: `${guide.title}｜Foreach Technology`, description: guide.description },
  };
}

/* =========================================================
   静态导出参数
   说明：
   1. 项目使用 output: "export"
   2. /[locale]/resources/installation-guide/[slug] 是双动态路由
   3. 所以必须提前生成 locale + slug 的所有组合
   4. 当前外语页面先复用中文教程数据的 guide.id
========================================================= */

export function generateStaticParams() {
  return INSTALLATION_GUIDE_DETAIL_LOCALES.flatMap((locale) => {
    return getInstallationGuidePageData(locale).guides.map((guide) => ({
      locale,
      slug: guide.id,
    }));
  });
}

export default async function InstallationGuideIntlDetailPage({
  params,
}: InstallationGuideIntlDetailPageProps) {
  const { locale, slug } = await params;

  if (!INSTALLATION_GUIDE_DETAIL_LOCALES.includes(locale)) {
    notFound();
  }

  const currentGuide = getInstallationGuidePageData(locale).guides.find((guide) => {
    return guide.id === slug;
  });

  if (!currentGuide) {
    notFound();
  }

  if (locale === "en" && slug === sv10Video.id) return <Sv10VideoPage />;

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* 
        临时空白页：
        1. 当前只保留 locale 和 slug，方便确认路由已生效
        2. 后续正式做详情页时，再替换为 InstallationGuideDetail 组件
      */}
      <div style={{ display: "none" }}>
        {locale}-{currentGuide.id}
      </div>
    </main>
  );
}
