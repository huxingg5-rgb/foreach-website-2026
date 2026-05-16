// app/[locale]/page.tsx
// 多语言首页入口
//
// 说明：
// 1. 这个文件负责 /en、/es、/fr、/ko、/ru 这些多语言首页
// 2. 中文首页不走这里，中文首页走 app/page.tsx
// 3. 语言路径统一从 data/languages.ts 读取
// 4. 后期如果新增语言，只要改 data/languages.ts，这里不用大改

import { notFound } from "next/navigation"; // 引入 Next.js 的 404 方法

import HomePageContent from "@/components/home/HomePageContent"; // 引入首页内容组件
import {
  getEnabledLanguages, // 获取已启用语言列表
  type LocaleCode, // 官网支持的语言代码类型
} from "@/data/languages"; // 从统一语言配置文件读取语言信息

// 关闭未知动态路径
// 说明：
// 1. 只允许 generateStaticParams 里生成的语言路径访问
// 2. 比如 /en、/es、/fr、/ko、/ru 可以访问
// 3. /abc 这种无效路径会进入 404
export const dynamicParams = false;

/**
 * 根据 URL 里的 locale 参数，找到真实的 LocaleCode
 *
 * 举例：
 * 1. routeSegment = "en" -> 返回 "en"
 * 2. routeSegment = "es" -> 返回 "es"
 * 3. routeSegment = "zh" -> 返回 null，因为中文默认路径是 /
 */
function getLocaleFromRouteSegment(routeSegment: string): LocaleCode | null {
  const matchedLanguage = getEnabledLanguages().find((language) => {
    // 中文是默认语言，路径是 /，不应该出现在 app/[locale] 里
    if (language.isDefault) {
      return false;
    }

    // 去掉 href 前面的 /，例如 /en 变成 en
    const segment = language.href.replace(/^\/+/, "");

    return segment === routeSegment;
  });

  return matchedLanguage?.code ?? null;
}

/**
 * 生成静态多语言首页路径
 *
 * 说明：
 * 1. 中文默认首页 / 不在这里生成
 * 2. 这里只生成 /en、/es、/fr、/ko、/ru
 * 3. 后期新增语言，只要在 data/languages.ts 里 enabled: true 即可
 */
export function generateStaticParams() {
  return getEnabledLanguages()
    .filter((language) => !language.isDefault)
    .map((language) => ({
      locale: language.href.replace(/^\/+/, ""),
    }));
}

// 页面参数类型
// 说明：
// 1. 新版 Next.js 里 params 可能是 Promise
// 2. 使用 Promise 写法更适合当前 Next.js 新版本
type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/**
 * LocalePage
 * 多语言首页页面
 *
 * 说明：
 * 1. 根据 URL 判断当前语言
 * 2. 如果语言不支持，显示 404
 * 3. 如果语言支持，把 locale 传给 HomePageContent
 */
export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  const currentLocale = getLocaleFromRouteSegment(locale);

  if (!currentLocale) {
    notFound();
  }

  return <HomePageContent locale={currentLocale} />;
}
