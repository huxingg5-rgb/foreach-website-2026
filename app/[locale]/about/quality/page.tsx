import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { draftAboutMetadata } from "@/lib/seo/german-about-metadata";
import QualityPageContent from "@/components/about/QualityPageContent";
import {
  aboutQualityLinks,
  getAboutQualityContent,
  type AboutQualityLocale,
} from "@/data/about-quality";
const supportedLocales = ["en", "es", "fr", "ko", "ru"] as const;

type SupportedLocale = (typeof supportedLocales)[number];

/* ================================
   判断当前 locale 是否为支持语言
================================ */
function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

/* ================================
   页面参数类型
   说明：
   1. Next.js 新版本中 params 可能是 Promise
   2. 这里沿用你当前项目更稳的写法
================================ */
type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* ================================
   静态生成多语言路径
================================ */
export function generateStaticParams() {
  return [
    ...supportedLocales.map((locale) => ({ locale })),
    ...(languageDraftsEnabled ? [{ locale: "de" }, { locale: "it" }, { locale: "hi" }] : []),
  ];
}

/* ================================
   多语言页面 SEO 信息
   说明：
   1. metadata 从 data/about-quality.ts 读取
   2. 如果西语、法语、韩语、俄语暂时没填完整，会先回退到英文内容
   3. alternates.languages 用于告诉搜索引擎不同语言版本的对应关系
================================ */
async function getPageMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (languageDraftsEnabled && (locale === "de" || locale === "it" || locale === "hi")) {
    const pageData = getAboutQualityContent(locale);
    return draftAboutMetadata(locale, "/about/quality/", pageData.metadataTitle, pageData.metadataDescription);
  }

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const pageData = getAboutQualityContent(locale);

  return {
    title: pageData.metadataTitle,
    description: pageData.metadataDescription,
    alternates: {
      canonical: aboutQualityLinks[locale],
      languages: aboutQualityLinks,
    },
  };
}

/* ================================
   多语言质量页面
   说明：
   1. 这里只有路由判断和语言传递
   2. 真正页面结构由 QualityPageContent 统一渲染
================================ */
export default async function QualityLocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (languageDraftsEnabled && (locale === "de" || locale === "it" || locale === "hi")) return <QualityPageContent locale={locale} />;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <QualityPageContent locale={locale as AboutQualityLocale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/about/quality/", getPageMetadata);
