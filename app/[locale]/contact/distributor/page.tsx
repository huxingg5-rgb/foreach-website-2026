/* =========================================================
   app/[locale]/contact/distributor/page.tsx
   多语言经销商合作页面入口

   页面访问路径：
   /en/contact/distributor
   /es/contact/distributor
   /fr/contact/distributor
   /ko/contact/distributor
   /ru/contact/distributor

   重要规则：
   1. 中文页面不走 /zh-CN/contact/distributor
   2. 中文经销商页面走 /contact/distributor
   3. 当前 [locale] 动态路由只负责外语页面
   4. 因为 output: export 静态导出，动态路由必须提前声明
   5. 联系方式与地图文案也在服务端按 locale 传入，避免 Hydration mismatch
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DistributorPageContent from "@/components/contact/DistributorPageContent";

import { getContactIntlData } from "@/data/contact-cooperation/contact.intl";

import {
  getDistributorPageData,
  type DistributorLocale,
} from "@/data/contact-cooperation/distributor.intl";

/* =========================================================
   经销商合作页面外语路径

   说明：
   1. 这里只放外语语言代码
   2. 不能放 zh-CN
   3. 否则 build 时会生成 /zh-CN/contact/distributor
========================================================= */

const DISTRIBUTOR_LOCALES: DistributorLocale[] = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
];

/* =========================================================
   generateStaticParams

   说明：
   1. 这里只生成外语路径
   2. 生成结果：
      /en/contact/distributor
      /es/contact/distributor
      /fr/contact/distributor
      /ko/contact/distributor
      /ru/contact/distributor
   3. 不生成：
      /zh-CN/contact/distributor
========================================================= */

export function generateStaticParams() {
  return DISTRIBUTOR_LOCALES.map((locale) => ({
    locale,
  }));
}

/* 不允许未声明语言继续生成页面 */
export const dynamicParams = false;

/* =========================================================
   判断当前 locale 是否为经销商页面支持的外语
========================================================= */

function isDistributorLocale(locale: string): locale is DistributorLocale {
  return DISTRIBUTOR_LOCALES.includes(locale as DistributorLocale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    return {};
  }

  return {
    title: "Distributor Partnerships | FOREACH",
    description:
      "Learn about distributor partnership opportunities with FOREACH for microfluidic components and fluid handling solutions.",
  };
}

/* =========================================================
   页面组件
========================================================= */

export default async function DistributorPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  /*
     说明：
     1. 当前文件只接受 en / es / fr / ko / ru
     2. 如果访问 /zh-CN/contact/distributor，直接 404
     3. 中文页面应该访问 /contact/distributor
  */
  if (!isDistributorLocale(locale)) {
    notFound();
  }

  const content = getDistributorPageData(locale);

  const contactPageData = getContactIntlData(locale);

  return (
    <DistributorPageContent
      content={content}
      contactPageData={contactPageData}
      locale={locale}
    />
  );
}
