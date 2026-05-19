// 这是关于 components/home/HomeHeroSection.tsx 的文件：用于管理首页第一屏 Hero 首屏内容
// 这个文件的作用：把首页首屏从 HomePageContent.tsx 中拆出来，方便后续维护

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内页面跳转

import { // 从 lib/i18n.ts 中引入首页首屏需要的多语言工具
  getLocaleAnchorPath, // 根据当前语言生成锚点链接，例如中文 /#products，英文 /en#products
  homeI18n, // 首页首屏多语言文案数据
  type LocaleCode, // 官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru
} from "@/lib/i18n"; // 多语言工具文件路径

type HomeHeroSectionProps = { // 定义 HomeHeroSection 组件接收的参数类型
  locale: LocaleCode; // 当前页面语言，例如 "zh-CN"、"en"、"es"
}; // 参数类型定义结束

export default function HomeHeroSection({ locale }: HomeHeroSectionProps) { // 定义并导出首页 Hero 首屏组件
  const homeText = homeI18n[locale]; // 根据当前语言读取首页首屏文案

  const productsHref = getLocaleAnchorPath(locale, "products"); // 生成“产品中心”按钮跳转链接

  const contactHref = getLocaleAnchorPath(locale, "contact"); // 生成“联系我们”按钮跳转链接

  return ( // 返回首页 Hero 首屏的页面结构
    <section className="home-hero" id="home"> {/* 首页第一屏 Hero 区域，id="home" 用于锚点定位 */}
      <div className="home-hero-inner"> {/* Hero 内容居中容器 */}
        <h1 className="home-hero-title"> {/* 首页主标题 */}
          {homeText.heroTitleLine1} {/* 首页主标题第一行 */}

          <br /> {/* 主标题换行 */}

          {homeText.heroTitleLine2} {/* 首页主标题第二行 */}
        </h1> {/* 首页主标题结束 */}

        <p className="home-hero-subtitle"> {/* 首页副标题 */}
          {homeText.heroSubtitle} {/* 首页副标题多语言文字 */}
        </p> {/* 首页副标题结束 */}

        <div className="home-hero-actions"> {/* 首页按钮区域 */}
          <Link // 产品中心按钮开始
            href={productsHref} // 产品中心按钮跳转地址
            className="home-hero-btn home-hero-btn-primary" // 产品中心按钮样式 class
          > {/* 产品中心按钮开始标签结束 */}
            {homeText.productButton} {/* 产品中心按钮文字 */}
          </Link> {/* 产品中心按钮结束 */}

          <Link // 联系我们按钮开始
            href={contactHref} // 联系我们按钮跳转地址
            className="home-hero-btn home-hero-btn-secondary" // 联系我们按钮样式 class
          > {/* 联系我们按钮开始标签结束 */}
            {homeText.contactButton} {/* 联系我们按钮文字 */}
          </Link> {/* 联系我们按钮结束 */}
        </div> {/* 首页按钮区域结束 */}
      </div> {/* Hero 内容居中容器结束 */}

      {/* 首页第一屏 Hero 区域结束 */}
    </section>
  ); // 返回页面结构结束
} // HomeHeroSection 组件结束