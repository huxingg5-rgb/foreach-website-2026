/* =========================================================
   HistoryPageContent.tsx
   恒永达官网｜关于我们 / 发展历程统一内容组件

   作用：
   1. 中文页面 /about/history 使用这个组件
   2. 多语言页面 /en/about/history 等也使用这个组件
   3. 页面结构只写一份，后期改 Banner、时间轴、底图只改这里
   4. 页面数据仍然来自 data/historyMilestones.ts
========================================================= */

import type { CSSProperties } from "react";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import { getAboutBreadcrumb } from "@/data/about-breadcrumb";
import {
  getHistoryMilestones,
  getHistoryPageText,
} from "@/data/historyMilestones";

/* ================================
   根据已有函数自动推导历史页面语言类型
   说明：
   这样不需要依赖 data/historyMilestones.ts 是否导出了 HistoryLocale 类型
================================ */
type HistoryPageLocale = Parameters<typeof getHistoryPageText>[0];

type HistoryPageContentProps = {
  /* 当前语言：
     中文一般是 zh-CN
     其他语言一般是 en / es / fr / ko / ru
  */
  locale: HistoryPageLocale;
};

/* ================================
   顶部小 Banner 配置
   说明：
   1. 目前仍沿用你原来的图片路径
   2. 后续如果改成 webp，只需要改这里
================================ */
const historyBanner = {
  image: "/images/about/about-banner-desktop.webp",
};

/* ================================
   时间轴结束后的纯图片 Banner 配置
   说明：
   1. 放在 2012 年下面
   2. 目前沿用你原来的图片路径
================================ */
const historyBottomBanner = {
  image: "/images/about/history/history-bottom-banner.jpg",
};

/* ================================
   面包屑多语言文案
   说明：
   1. 先在组件里集中管理
   2. 后续如果想进一步规范，也可以移动到 data/historyMilestones.ts
================================ */
export default function HistoryPageContent({
  locale,
}: HistoryPageContentProps) {
  /* ================================
     获取当前语言页面文案
  ================================ */
  const pageText = getHistoryPageText(locale);

  /* ================================
     获取当前语言时间轴数据
     说明：
     1. 过滤掉 enabled: false 的节点
     2. 按年份倒序排列
  ================================ */
  const historyItems = getHistoryMilestones(locale)
    .filter((item) => item.enabled)
    .sort((a, b) => b.year - a.year);

  const breadcrumb = getAboutBreadcrumb(
    locale,
    `${pageText.titleMain}${pageText.titleAccent}`,
  );

  return (
    <main className="about-history-page">
      {/* ================================
          顶部小 Banner
      ================================ */}
      <section
        className="about-history-inner-banner"
        aria-label={pageText.topBannerAriaLabel}
        style={
          {
            "--history-banner-image": `url("${historyBanner.image}")`,
          } as CSSProperties
        }
      >
        <div className="about-history-inner-banner-content">
          <p>{pageText.bannerDescription}</p>
        </div>
      </section>

      {/* ================================
          面包屑导航
          说明：
          1. 继续复用企业文化页面的面包屑样式
          2. 链接根据当前语言自动生成
      ================================ */}
      <SiteBreadcrumb
        ariaLabel={breadcrumb.ariaLabel}
        items={breadcrumb.items}
        variant="bar"
      />

      {/* ================================
          页面标题区域
      ================================ */}
      <header className="about-history-page-title">
        <h1>
          {pageText.titleMain}
          <span>{pageText.titleAccent}</span>
        </h1>

        <div className="about-history-title-line" aria-hidden="true" />
      </header>

      {/* ================================
          发展历程时间轴
          说明：
          具体交互仍然由 HistoryTimeline 客户端组件负责
      ================================ */}
      <HistoryTimeline items={historyItems} locale={locale} />

      {/* ================================
          时间轴结束后的纯图片 Banner
          说明：
          放在 2012 年下面
      ================================ */}
      <section
        className="about-history-bottom-banner"
        aria-label={pageText.bottomBannerAriaLabel}
        style={
          {
            "--history-bottom-banner-image": `url("${historyBottomBanner.image}")`,
          } as CSSProperties
        }
      >
        <p
          className="about-history-bottom-slogan"
          aria-label="MAKE FLOW EASY"
        >
          <span>MAKE</span>
          <span className="about-history-bottom-slogan-flow">
            FLOW
          </span>
          <span>EASY</span>
        </p>
      </section>
    </main>
  );
}
