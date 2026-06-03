// 这是关于 components/home/HomePageContent.tsx 的文件：用于管理首页所有模块的排列顺序
// 这个文件的作用：只负责“首页结构组合”，不直接写 Hero 首屏的具体内容

import HomeApplicationFlowSection from "@/components/home/HomeApplicationFlowSection"; // 引入首页第二屏：应用领域 × 核心部件组件
import HomeCompanyStrengthSection from "@/components/home/HomeCompanyStrengthSection"; // 引入首页第三 / 第四屏：公司介绍与企业优势组件
import HomeHeroSection from "@/components/home/HomeHeroSection"; // 引入首页第一屏：Hero 首屏组件
import HomeInquirySection from "@/components/home/HomeInquirySection"; // 引入首页第六屏：在线询盘组件
import HomeNewsSection from "@/components/home/HomeNewsSection"; // 引入首页第五屏：资讯中心组件

import { getLanguageTextLayoutClass } from "@/data/languages"; // 引入根据当前语言获取排版 class 的方法

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型

/* =========================================================
   首页内容组件参数类型
   说明：
   1. locale 是当前页面语言
   2. 例如：
      - zh-CN 中文
      - en 英文
      - es 西班牙语
      - fr 法语
      - ko 韩语
      - ru 俄语
========================================================= */

type HomePageContentProps = {
  locale: LocaleCode;
};

/* =========================================================
   首页内容总入口组件
   说明：
   1. 这个组件只负责组合首页模块
   2. 每个模块的具体内容分别放在对应组件里
   3. languageTextLayoutClass 用于给不同语言提供排版密度 class
   4. 如果多语言页面出现文字“先大后小”的跳动问题，
      不建议在这里删除 languageTextLayoutClass，
      应该去 app/language-typography.css 里修正字号/动画规则
========================================================= */

export default function HomePageContent({ locale }: HomePageContentProps) {
  // 根据当前语言获取页面排版 class
  // 例如可能返回：
  // site-page--compact
  // site-page--standard
  // site-page--expanded
  const languageTextLayoutClass = getLanguageTextLayoutClass(locale);

  return (
    <div className={`site-page ${languageTextLayoutClass}`}>
      <main>
        {/* 第一屏：Hero 首屏区域 */}
        <HomeHeroSection locale={locale} />

        {/* 第二屏：应用领域 × 核心部件 */}
        <HomeApplicationFlowSection locale={locale} />

        {/* 第三 / 第四屏：公司介绍与企业优势 */}
        <HomeCompanyStrengthSection locale={locale} />

        {/* 第五屏：资讯中心 */}
        <HomeNewsSection locale={locale} />

        {/* 第六屏：在线询盘 */}
        <HomeInquirySection locale={locale} />
      </main>
    </div>
  );
} 