import { notFound } from "next/navigation"; // 引入 Next.js 的 404 方法，用于处理不支持的语言路径

import HomePageContent from "@/components/home/HomePageContent"; // 引入首页共用内容组件

import {
  isSupportedLocale, // 引入语言判断函数，用来判断 URL 里的语言是否合法
  type LocaleCode, // 引入语言类型，例如 zh-CN / en / es / fr / ko / ru
} from "@/lib/i18n"; // 从统一多语言配置文件读取语言工具


/* ================================
   多语言页面参数类型
   说明：
   1. params.locale 来自 URL
   2. 例如访问 /en 时，params.locale 就是 en
   3. 例如访问 /fr 时，params.locale 就是 fr
   4. Next.js 16 中 params 推荐按 Promise 异步读取
================================ */
type LocalePageProps = {
  params: Promise<{
    locale: string; // URL 里的语言参数
  }>;
};


/* ================================
   预生成多语言首页路径
   说明：
   1. 这里告诉 Next.js：这些语言页面是我们明确支持的
   2. 中文首页不放这里，因为中文首页是 /
   3. /en 显示英文首页
   4. /es 显示西班牙语首页
   5. /fr 显示法语首页
   6. /ko 显示韩语首页
   7. /ru 显示俄语首页
================================ */
export function generateStaticParams() {
  return [
    {
      locale: "en", // 英文首页路径 /en
    },
    {
      locale: "es", // 西班牙语首页路径 /es
    },
    {
      locale: "fr", // 法语首页路径 /fr
    },
    {
      locale: "ko", // 韩语首页路径 /ko
    },
    {
      locale: "ru", // 俄语首页路径 /ru
    },
  ];
}


/**
 * LocaleHomePage
 * 多语言首页入口
 *
 * 说明：
 * 1. 访问 /en 时，显示英文首页
 * 2. 访问 /es 时，显示西班牙语首页
 * 3. 访问 /fr 时，显示法语首页
 * 4. 访问 /ko 时，显示韩语首页
 * 5. 访问 /ru 时，显示俄语首页
 * 6. 中文首页 / 由 app/page.tsx 负责
 */
export default async function LocaleHomePage({ params }: LocalePageProps) {
  // 等待 Next.js 传入 URL 参数
  const resolvedParams = await params;

  // 取出 URL 中的语言参数
  const localeParam = resolvedParams.locale;

  // 如果 URL 里的语言不是我们支持的语言，就显示 404
  if (!isSupportedLocale(localeParam)) {
    notFound();
  }

  // 中文首页只使用 /，不使用 /zh-CN，避免出现重复页面
  if (localeParam === "zh-CN") {
    notFound();
  }

  // 把 URL 里的语言参数转换成项目里的语言类型
  const locale = localeParam as LocaleCode;

  // 渲染对应语言的首页内容
  return <HomePageContent locale={locale} />;
}