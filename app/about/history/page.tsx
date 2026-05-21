/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 发展历程页面

   路径：
   /about/history

   说明：
   1. 这是服务端页面
   2. 页面数据来自 data/historyMilestones.ts
   3. Banner 图片路径放在当前页面中，后续方便接后端
   4. 具体时间轴交互由 HistoryTimeline 客户端组件负责
   5. 当前页面结构：
      顶部小 Banner
      ↓
      页面标题：发展 历程
      ↓
      发展历程时间轴
      ↓
      时间轴结束后的纯图片 Banner
========================================================= */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import { historyMilestones } from "@/data/historyMilestones";

/* 页面 SEO 信息 */
export const metadata: Metadata = {
  title: "发展历程｜恒永达科技",
  description:
    "深圳市恒永达科技股份有限公司发展历程，展示公司在微流体核心部件、泵阀产品、技术攻关、企业认证与市场拓展方面的关键节点。",
};

/* 顶部小 Banner 配置 */
const historyBanner = {
  image: "/images/about/history/history-banner.jpg",
  description: "用每一寸专注的光明丈量微流体发展",
};

/* 时间轴结束后的纯图片 Banner 配置
   图片放置位置：
   public/images/about/history/history-bottom-banner.jpg
*/
const historyBottomBanner = {
  image: "/images/about/history/history-bottom-banner.jpg",
};

export default function AboutHistoryPage() {
  const historyItems = historyMilestones
    .filter((item) => item.enabled)
    .sort((a, b) => b.year - a.year);

  return (
    <main className="about-history-page">
      {/* 顶部小 Banner */}
      <section
        className="about-history-inner-banner"
        aria-label="恒永达发展历程 Banner"
        style={
          {
            "--history-banner-image": `url("${historyBanner.image}")`,
          } as CSSProperties
        }
      >
        <div className="about-history-inner-banner-content">
          <p>{historyBanner.description}</p>
        </div>
      </section>

      {/* 页面标题区域 */}
      <header className="about-history-page-title">
        <h1>
          发展<span>历程</span>
        </h1>
        <div className="about-history-title-line" aria-hidden="true" />
      </header>

      {/* 发展历程时间轴 */}
      <HistoryTimeline items={historyItems} />

      {/* 时间轴结束后的纯图片 Banner：放在 2012 年下面 */}
      <section
        className="about-history-bottom-banner"
        aria-label="恒永达发展历程底部图片 Banner"
        style={
          {
            "--history-bottom-banner-image": `url("${historyBottomBanner.image}")`,
          } as CSSProperties
        }
      />
    </main>
  );
} 