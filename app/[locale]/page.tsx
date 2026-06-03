/* ================================
   app/[locale]/page.tsx
   多语言首页入口

   对应路径：
   /en
   /es
   /fr
   /ko
   /ru

   说明：
   1. 中文首页不走这里，中文首页走 app/page.tsx
   2. 这个文件负责外语首页
   3. 因为 next.config.ts 使用 output: "export"
   4. 所以这里必须提供 generateStaticParams
================================ */

import { notFound } from "next/navigation";

import HomePageContent from "@/components/home/HomePageContent";
import {
  getEnabledLanguages,
  type LocaleCode,
} from "@/data/languages";

/* ================================
   禁止未知语言路径

   说明：
   1. 只允许 generateStaticParams 里声明的语言访问
   2. /en、/es、/fr、/ko、/ru 可以访问
   3. /abc 这种无效路径进入 404
================================ */

export const dynamicParams = false;

/* ================================
   根据 URL 里的 locale 参数匹配真实语言

   举例：
   1. routeSegment = "en" -> 返回 "en"
   2. routeSegment = "es" -> 返回 "es"
   3. routeSegment = "zh" -> 返回 null，因为中文默认路径是 /
================================ */

function getLocaleFromRouteSegment(routeSegment: string): LocaleCode | null {
  const matchedLanguage = getEnabledLanguages().find((language) => {
    if (language.isDefault) {
      return false;
    }

    const segment = language.href.replace(/^\/+/, "");

    return segment === routeSegment;
  });

  return matchedLanguage?.code ?? null;
}

/* ================================
   生成静态多语言首页路径

   说明：
   1. 这里先写死 5 个外语路径
   2. 不先依赖 getEnabledLanguages()
   3. 这样对 output: "export" 更稳定
================================ */

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "es" },
    { locale: "fr" },
    { locale: "ko" },
    { locale: "ru" },
  ];
}

/* ================================
   页面参数类型

   说明：
   当前项目使用 Next.js 新版本，params 按 Promise 写法处理。
================================ */

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* ================================
   多语言首页页面组件
================================ */

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  const currentLocale = getLocaleFromRouteSegment(locale);

  if (!currentLocale) {
    notFound();
  }

  return <HomePageContent locale={currentLocale} />;
}  