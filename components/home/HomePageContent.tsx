import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于页面内部跳转

import {
  getLocaleAnchorPath, // 引入多语言锚点路径函数，例如中文 /#products，英文 /en#products
  homeI18n, // 引入首页多语言文案
  type LocaleCode, // 引入语言类型，例如 zh-CN / en / es / fr / ko / ru
} from "@/lib/i18n"; // 从统一多语言配置文件读取内容

/* ================================
   HomePageContent 组件参数类型
   说明：
   1. locale 表示当前页面语言
   2. 例如中文首页传 zh-CN
   3. 英文首页传 en
================================ */
type HomePageContentProps = {
  locale: LocaleCode; // 当前页面语言
};

/**
 * HomePageContent
 * 首页内容组件
 *
 * 说明：
 * 1. 所有语言首页共用这个组件
 * 2. 页面显示什么语言，由 locale 参数决定
 * 3. 文字统一从 lib/i18n.ts 读取
 * 4. 后期接后端 / CMS 时，也可以从这里替换为接口数据
 */
export default function HomePageContent({ locale }: HomePageContentProps) {
  // 根据当前语言读取首页文案
  const homeText = homeI18n[locale];

  // 根据当前语言生成“产品中心”按钮链接
  const productsHref = getLocaleAnchorPath(locale, "products");

  // 根据当前语言生成“联系我们”按钮链接
  const contactHref = getLocaleAnchorPath(locale, "contact");

  // 返回首页页面结构
  return (
    <main>
      {/* 首页首屏 Hero 区域 */}
      <section className="home-hero" id="home">
        {/* 首页首屏内容容器 */}
        <div className="home-hero-inner">
          {/* 首页首屏主标题 */}
          <h1 className="home-hero-title">
            {/* 首页主标题第一行 */}
            {homeText.heroTitleLine1}

            {/* 标题换行 */}
            <br />

            {/* 首页主标题第二行 */}
            {homeText.heroTitleLine2}
          </h1>

          {/* 首页首屏副标题 */}
          <p className="home-hero-subtitle">
            {homeText.heroSubtitle}
          </p>

          {/* 首页首屏按钮区域 */}
          <div className="home-hero-actions">
            {/* 产品中心按钮 */}
            <Link
              href={productsHref}
              className="home-hero-btn home-hero-btn-primary"
            >
              {homeText.productButton}
            </Link>

            {/* 联系我们按钮 */}
            <Link
              href={contactHref}
              className="home-hero-btn home-hero-btn-secondary"
            >
              {homeText.contactButton}
            </Link>
          </div>
        </div>
      </section>

      {/* 首页测试滚动区域 */}
      <section className="home-test-section">
        {/* 首页测试滚动区域内容容器 */}
        <div className="home-test-inner">
          {/* 测试区域标题 */}
          <h2>{homeText.testTitle}</h2>

          {/* 测试区域说明 */}
          <p>{homeText.testDescription}</p>
        </div>
      </section>
    </main>
  );
}