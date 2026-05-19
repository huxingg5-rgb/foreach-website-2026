// components/home/HomePageContent.tsx
// 首页内容总入口组件
//
// 说明：
// 1. 这个文件负责组织首页每一屏的显示顺序
// 2. 第一屏 Hero 目前直接写在这个文件里
// 3. 第二屏、第三/四屏、新闻、询盘、页脚分别拆成独立组件
// 4. 多语言文字从 lib/i18n.ts 和各 data 文件中读取
// 5. 这个文件只负责“页面结构”，尽量不要写太多具体业务文案
// 6. 当前新增 site-page--compact / standard / expanded，用于控制不同语言的排版密度

import Link from "next/link"; // Next.js 内部跳转组件，用于站内链接跳转

import HomeApplicationFlowSection from "@/components/home/HomeApplicationFlowSection"; // 首页第二屏：应用领域 × 核心部件
import HomeCompanyStrengthSection from "@/components/home/HomeCompanyStrengthSection"; // 首页第三 / 第四屏：公司介绍与企业优势
import HomeInquirySection from "@/components/home/HomeInquirySection"; // 首页第六屏：在线询盘模块
import HomeNewsSection from "@/components/home/HomeNewsSection"; // 首页第五屏：资讯中心模块
import SiteFooter from "@/components/layout/SiteFooter"; // 网站底部 Footer

import { getLanguageTextLayoutClass } from "@/data/languages"; // 根据当前语言获取排版 class

import {
  getLocaleAnchorPath, // 根据当前语言生成锚点链接，例如中文 /#products，英文 /en#products
  homeI18n, // 首页首屏多语言文案
  type LocaleCode, // 官网支持的语言代码类型
} from "@/lib/i18n";

/* ================================
   HomePageContent 组件参数类型
================================ */

type HomePageContentProps = {
  locale: LocaleCode; // 当前页面语言，例如 "zh-CN"、"en"、"es"
};

/**
 * HomePageContent
 * 首页内容组件
 *
 * 页面结构：
 * 1. 第一屏：Hero 首屏
 * 2. 第二屏：应用领域 × 核心部件
 * 3. 第三 / 第四屏：公司介绍与企业优势
 * 4. 第五屏：资讯中心
 * 5. 第六屏：在线询盘
 * 6. Footer：网站底部
 *
 * 语言排版说明：
 * 1. zh-CN / ko 使用 compact
 * 2. en 使用 standard
 * 3. es / fr / ru 使用 expanded
 * 4. 后续在 app/globals.css 中根据 class 控制字号、行高、卡片高度和间距
 */
export default function HomePageContent({ locale }: HomePageContentProps) {
  // 根据当前语言读取首页首屏文案
  const homeText = homeI18n[locale];

  // 产品中心按钮链接
  const productsHref = getLocaleAnchorPath(locale, "products");

  // 联系我们按钮链接
  const contactHref = getLocaleAnchorPath(locale, "contact");

  // 根据当前语言获取页面排版 class
  // 例如：
  // zh-CN -> site-page--compact
  // en -> site-page--standard
  // es -> site-page--expanded
  const languageTextLayoutClass = getLanguageTextLayoutClass(locale);

  return (
    <div className={`site-page ${languageTextLayoutClass}`}>
      <main>
        {/* 第一屏：Hero 首屏区域 */}
        <section className="home-hero" id="home">
          <div className="home-hero-inner">
            <h1 className="home-hero-title">
              {homeText.heroTitleLine1}

              <br />

              {homeText.heroTitleLine2}
            </h1>

            <p className="home-hero-subtitle">{homeText.heroSubtitle}</p>

            <div className="home-hero-actions">
              <Link
                href={productsHref}
                className="home-hero-btn home-hero-btn-primary"
              >
                {homeText.productButton}
              </Link>

              <Link
                href={contactHref}
                className="home-hero-btn home-hero-btn-secondary"
              >
                {homeText.contactButton}
              </Link>
            </div>
          </div>
        </section>

        {/* 第二屏：应用领域 × 核心部件 */}
        <HomeApplicationFlowSection locale={locale} />

        {/* 第三 / 第四屏：公司介绍与企业优势 */}
        <HomeCompanyStrengthSection locale={locale} />

        {/* 第五屏：资讯中心 */}
        <HomeNewsSection locale={locale} />

        {/* 第六屏：在线询盘 */}
        <HomeInquirySection locale={locale} />
      </main>

      {/* 网站底部 Footer */}
      <SiteFooter locale={locale} />
    </div>
  );
}