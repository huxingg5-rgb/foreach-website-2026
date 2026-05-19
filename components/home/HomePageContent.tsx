// 这是关于 components/home/HomePageContent.tsx 的文件：用于管理首页所有模块的排列顺序
// 这个文件的作用：只负责“首页结构组合”，不再直接写 Hero 首屏的具体内容

import HomeApplicationFlowSection from "@/components/home/HomeApplicationFlowSection"; // 引入首页第二屏：应用领域 × 核心部件组件
import HomeCompanyStrengthSection from "@/components/home/HomeCompanyStrengthSection"; // 引入首页第三 / 第四屏：公司介绍与企业优势组件
import HomeHeroSection from "@/components/home/HomeHeroSection"; // 引入首页第一屏：Hero 首屏组件
import HomeInquirySection from "@/components/home/HomeInquirySection"; // 引入首页第六屏：在线询盘组件
import HomeNewsSection from "@/components/home/HomeNewsSection"; // 引入首页第五屏：资讯中心组件
import SiteFooter from "@/components/layout/SiteFooter"; // 引入网站底部 Footer 组件

import { getLanguageTextLayoutClass } from "@/data/languages"; // 引入根据当前语言获取排版 class 的方法

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型

type HomePageContentProps = { // 定义 HomePageContent 组件接收的参数类型
  locale: LocaleCode; // 当前页面语言，例如 "zh-CN"、"en"、"es"
}; // 参数类型定义结束

export default function HomePageContent({ locale }: HomePageContentProps) { // 定义并导出首页内容总入口组件
  const languageTextLayoutClass = getLanguageTextLayoutClass(locale); // 根据当前语言获取页面排版 class

  return ( // 返回首页完整页面结构
    <div className={`site-page ${languageTextLayoutClass}`}> {/* 首页最外层容器，同时挂载不同语言的排版 class */}
      <main> {/* 首页主体内容区域 */}

        {/* 第一屏：Hero 首屏区域 */}
        <HomeHeroSection locale={locale} /> {/* 调用首页第一屏 Hero 组件，并把当前语言传进去 */}

        {/* 第二屏：应用领域 × 核心部件 */}
        <HomeApplicationFlowSection locale={locale} /> {/* 调用首页第二屏应用领域组件，并把当前语言传进去 */}

        {/* 第三 / 第四屏：公司介绍与企业优势 */}
        <HomeCompanyStrengthSection locale={locale} /> {/* 调用公司实力组件，并把当前语言传进去 */}

        {/* 第五屏：资讯中心 */}
        <HomeNewsSection locale={locale} /> {/* 调用首页新闻模块，并把当前语言传进去 */}

        {/* 第六屏：在线询盘 */}
        <HomeInquirySection locale={locale} /> {/* 调用首页询盘模块，并把当前语言传进去 */}

      </main> {/* 首页主体内容区域结束 */}

      {/* 网站底部 Footer */}
      <SiteFooter locale={locale} /> {/* 调用网站底部组件，并把当前语言传进去 */}
    </div> // 首页最外层容器结束
  ); // 返回首页完整页面结构结束
} // HomePageContent 组件结束