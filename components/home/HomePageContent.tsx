// components/home/HomePageContent.tsx
import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于页面内部跳转

import HomeApplicationFlowSection from "@/components/home/HomeApplicationFlowSection"; // 首页第二屏应用领域交互模块

import HomeCompanyStrengthSection from "@/components/home/HomeCompanyStrengthSection";

import {
  getLocaleAnchorPath, // 多语言锚点路径函数，例如中文 /#products，英文 /en#products
  homeI18n, // 首页首屏多语言文案
  type LocaleCode, // 官网语言类型
} from "@/lib/i18n";

/* ================================
   HomePageContent 组件参数类型
================================ */
type HomePageContentProps = {
  locale: LocaleCode;
};

/**
 * HomePageContent
 * 首页内容组件
 *
 * 说明：
 * 1. 首页首屏 Hero 文案继续从 lib/i18n.ts 读取
 * 2. 首页第二屏从 HomeApplicationFlowSection 组件读取
 * 3. 第二屏文字和图片统一在 data/home-application-flow.ts 里维护
 */
export default function HomePageContent({ locale }: HomePageContentProps) {
  const homeText = homeI18n[locale];

  const productsHref = getLocaleAnchorPath(locale, "products");

  const contactHref = getLocaleAnchorPath(locale, "contact");

  
  return (
    <main>
      {/* 首页首屏 Hero 区域 */}
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

      {/* 首页第二屏：应用领域 × 核心部件 */}
      <HomeApplicationFlowSection locale={locale} />

      <HomeCompanyStrengthSection locale={locale} />
    </main>
  );
}