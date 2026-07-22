/* =========================================================
   page.tsx
   恒永达官网｜外语版联系我们页面入口

   文件路径：
   app/[locale]/contact/page.tsx

   页面访问地址：
   /en/contact
   /es/contact
   /fr/contact
   /ko/contact
   /ru/contact

   作用：
   1. 为外语站提供 Contact Us 页面
   2. 页面结构复用 components/contact/ContactPageContent.tsx
   3. 页面数据来自 data/contact-cooperation/contact.intl.ts
   4. 中文 /contact 不受影响
   5. 当前项目使用 output: export，所以必须提供 generateStaticParams()

   说明：
   1. 中文联系我们页面入口仍然是 app/contact/page.tsx
   2. 外语联系我们页面入口就是当前文件
   3. 这里不要再写大段文案，文案统一放 contact.intl.ts
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContactPageContent from "@/components/contact/ContactPageContent";
import {
  CONTACT_INTL_LOCALES,
  getContactIntlData,
  isContactIntlLocale,
} from "@/data/contact-cooperation";

import "../../contact/contact.css";

/* =========================================================
   页面参数类型

   说明：
   Next.js 新版本中，动态路由 params 推荐按 Promise 写法处理
========================================================= */

type ContactIntlPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* =========================================================
   静态导出必需函数

   说明：
   你的项目使用 output: export
   所以必须明确生成哪些 /[locale]/contact 页面
========================================================= */

export function generateStaticParams() {
  return CONTACT_INTL_LOCALES.map((locale) => ({
    locale,
  }));
}

/* =========================================================
   生成页面 SEO

   说明：
   1. 根据当前 locale 读取对应语言的联系我们数据
   2. 如果 locale 不支持，则不生成有效 SEO
========================================================= */

export async function generateMetadata({
  params,
}: ContactIntlPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isContactIntlLocale(locale)) {
    return {};
  }

  const data = getContactIntlData(locale);

  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

/* =========================================================
   ContactIntlPage
   外语版联系我们页面

   说明：
   1. /en/contact 读取英文联系我们数据
   2. /es/contact 读取西语联系我们数据
   3. /fr/contact 读取法语联系我们数据
   4. /ko/contact 读取韩语联系我们数据
   5. /ru/contact 读取俄语联系我们数据
========================================================= */

export default async function ContactIntlPage({
  params,
}: ContactIntlPageProps) {
  const { locale } = await params;

  if (!isContactIntlLocale(locale)) {
    notFound();
  }

  const data = getContactIntlData(locale);

  return <ContactPageContent data={data} />;
} 