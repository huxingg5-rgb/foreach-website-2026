"use client";

// components/home/HomeNewsSection.tsx
// 首页第 5 屏：资讯中心模块
//
// 说明：
// 1. 这一版由 H5 预览版本转换为 Next.js 组件
// 2. 左侧为推荐新闻大卡片
// 3. 中间为重点公告深蓝卡片
// 4. 右侧为 4 条推荐资讯列表
// 5. 顶部分类按钮默认不选中，因为首页默认展示“推荐新闻”
// 6. 当前阶段按钮只做选中状态交互，后续接后台后可按分类筛选新闻
// 7. 图片先使用 public/images/home/news/ 下的本地路径
// 8. 如果图片暂时不存在，页面不会报错，只是图片区域为空背景

import Link from "next/link";
import { useState } from "react";

import type { LocaleCode } from "@/lib/i18n";

/* ================================
   01. 类型定义
================================ */

// 组件接收的参数
type HomeNewsSectionProps = {
  locale: LocaleCode; // 当前语言，例如 zh-CN、en、es、fr、ko、ru
};

// 顶部分类按钮类型
type NewsTabKey = "company" | "notice" | "knowledge";

// 大卡片数据类型
type HomeNewsMainCard = {
  category: string; // 分类名称
  date: string; // 日期
  title: string; // 标题
  desc: string; // 描述
  image: string; // 图片路径
  href: string; // 跳转链接
};

// 右侧新闻列表数据类型
type HomeNewsSideItem = {
  id: string; // 稳定 ID
  title: string; // 新闻标题
  desc: string; // 新闻描述
  date: string; // 日期
  image: string; // 图片路径
  href: string; // 跳转链接
};

/* ================================
   02. 中文内容
   说明：
   第一阶段先把首页资讯内容写在前端。
   后续接后台 / CMS 时，可以把这里改成接口返回数据。
================================ */

const zhNewsContent = {
  sectionTitle: "资讯中心",
  detailText: "查看详情",
  viewAllText: "查看全部",

  tabs: [
    { key: "company" as const, label: "公司动态" },
    { key: "notice" as const, label: "通知公告" },
    { key: "knowledge" as const, label: "知识分享" },
  ],

  featureCard: {
    category: "公司动态",
    date: "2026 / 05 / 16",
    title:
      "恒永达持续推进微流体系统核心零部件与液路方案能力建设，为 IVD、生命科学与实验室自动化客户提供稳定的产品支持。",
    desc:
      "围绕泵、阀、传感器、管路连接件和采样针等核心部件，持续完善面向自动化分析仪器的液路系统支持能力，帮助客户更高效地完成样本处理、试剂分配、清洗废液及多通道流路控制。",
    image: "/images/home/news/news-feature-01.webp",
    href: "/news",
  } satisfies HomeNewsMainCard,

  highlightCard: {
    category: "通知公告",
    date: "2026 / 05 / 16",
    title:
      "恒永达官网升级项目启动，将围绕产品展示、技术内容、询盘承接与后续优化持续完善。",
    desc:
      "本次升级将重点优化首页信息结构、产品中心、应用领域、技术文章与联系我们模块，提升客户获取资料、了解产品与提交询盘的效率，并为多语言内容和后续运营预留空间，同时为后端内容管理、SEO 和 GEO 布局打下基础。",
    image: "",
    href: "/news",
  } satisfies HomeNewsMainCard,

  sideNews: [
    {
      id: "news-01",
      title: "微流体液路系统中泵阀传感器如何协同工作？",
      desc:
        "从样本处理、试剂分配、清洗废液和多通道切换场景，理解核心部件的系统价值。",
      date: "2026 / 05 / 16",
      image: "/images/home/news/news-side-01.webp",
      href: "/news",
    },
    {
      id: "news-02",
      title: "如何为自动化分析仪器选择合适的隔膜泵？",
      desc:
        "围绕流量、压力、寿命、介质兼容性和噪音等因素，梳理常见选型维度。",
      date: "2026 / 05 / 15",
      image: "/images/home/news/news-side-02.webp",
      href: "/news",
    },
    {
      id: "news-03",
      title: "高压流体控制场景下旋转阀的关键选型因素",
      desc:
        "关注耐压、内腔体积、接口形式、通道数量与长期稳定性，辅助系统方案判断。",
      date: "2026 / 05 / 14",
      image: "/images/home/news/news-side-03.webp",
      href: "/news",
    },
    {
      id: "news-04",
      title: "管路连接件在微流体系统稳定性中的作用",
      desc:
        "从密封、死体积、材料兼容性和安装一致性等角度，理解连接件对整机液路可靠性的影响。",
      date: "2026 / 05 / 13",
      image: "/images/home/news/news-side-04.webp",
      href: "/news",
    },
  ] satisfies HomeNewsSideItem[],
};

/* ================================
   03. 英文兜底内容
   说明：
   目前非中文语言先统一显示英文。
   后续做完整 6 语言时，可以继续扩展为 en / es / fr / ko / ru。
================================ */

const enNewsContent = {
  sectionTitle: "News Center",
  detailText: "View Details",
  viewAllText: "View All",

  tabs: [
    { key: "company" as const, label: "Company News" },
    { key: "notice" as const, label: "Notices" },
    { key: "knowledge" as const, label: "Knowledge" },
  ],

  featureCard: {
    category: "Company News",
    date: "2026 / 05 / 16",
    title:
      "FOREACH continues to strengthen its microfluidic core components and fluidic solution capabilities for IVD, life sciences, and laboratory automation customers.",
    desc:
      "Focused on pumps, valves, sensors, fittings, tubing, and sampling probes, FOREACH continues to improve fluidic system support for automated analytical instruments.",
    image: "/images/home/news/news-feature-01.webp",
    href: "/news",
  } satisfies HomeNewsMainCard,

  highlightCard: {
    category: "Notice",
    date: "2026 / 05 / 16",
    title:
      "FOREACH website upgrade project has started, focusing on product presentation, technical content, inquiry conversion, and continuous optimization.",
    desc:
      "The upgrade will improve homepage structure, product center, application fields, technical articles, and contact modules, while reserving space for multilingual content and future operations.",
    image: "",
    href: "/news",
  } satisfies HomeNewsMainCard,

  sideNews: [
    {
      id: "news-01",
      title: "How do pumps, valves, and sensors work together in a microfluidic system?",
      desc:
        "Understand the system value of core components from sample handling, reagent dispensing, cleaning, waste liquid processing, and multi-channel switching.",
      date: "2026 / 05 / 16",
      image: "/images/home/news/news-side-01.webp",
      href: "/news",
    },
    {
      id: "news-02",
      title: "How to select the right diaphragm pump for automated analytical instruments?",
      desc:
        "Review common selection dimensions including flow rate, pressure, lifetime, media compatibility, and noise.",
      date: "2026 / 05 / 15",
      image: "/images/home/news/news-side-02.webp",
      href: "/news",
    },
    {
      id: "news-03",
      title: "Key selection factors for rotary valves in high-pressure fluid control",
      desc:
        "Focus on pressure resistance, internal volume, port type, channel count, and long-term stability.",
      date: "2026 / 05 / 14",
      image: "/images/home/news/news-side-03.webp",
      href: "/news",
    },
    {
      id: "news-04",
      title: "The role of fittings in microfluidic system stability",
      desc:
        "Understand how sealing, dead volume, material compatibility, and installation consistency affect fluidic reliability.",
      date: "2026 / 05 / 13",
      image: "/images/home/news/news-side-04.webp",
      href: "/news",
    },
  ] satisfies HomeNewsSideItem[],
};

/* ================================
   04. 根据当前语言获取资讯内容
================================ */

function getHomeNewsContent(locale: LocaleCode) {
  // 中文显示中文内容
  if (locale === "zh-CN") {
    return zhNewsContent;
  }

  // 其他语言当前先显示英文兜底
  return enNewsContent;
}

/* ================================
   05. HomeNewsSection 组件
================================ */

export default function HomeNewsSection({ locale }: HomeNewsSectionProps) {
  // 当前资讯内容
  const newsContent = getHomeNewsContent(locale);

  // 当前选中的分类
  // 说明：默认是空字符串，表示首页自动推荐新闻，不选中任何按钮
  const [activeTab, setActiveTab] = useState<NewsTabKey | "">("");

  return (
    <section className="home-news-screen" id="news" aria-labelledby="news-title">
      <div className="home-news-inner">
        {/* 顶部标题与分类按钮 */}
        <header className="home-news-header">
          <div className="home-news-title-wrap">
            <h2 id="news-title" className="home-news-main-title">
              {newsContent.sectionTitle}
            </h2>
          </div>

          <nav className="home-news-controls" aria-label="资讯分类切换">
            {newsContent.tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`home-news-tab-btn ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => {
                  // 再次点击同一个按钮时取消选中
                  setActiveTab((current) =>
                    current === tab.key ? "" : tab.key
                  );
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* 三栏主体内容 */}
        <div className="home-news-layout">
          {/* 左侧：推荐新闻大卡片 */}
          <article className="home-news-feature-card">
            <div
              className="home-news-feature-image"
              style={{
                backgroundImage: `url(${newsContent.featureCard.image})`,
              }}
              aria-hidden="true"
            />

            <div className="home-news-feature-body">
              <div className="home-news-meta-row">
                <span className="home-news-category">
                  {newsContent.featureCard.category}
                </span>
                <span className="home-news-date">
                  {newsContent.featureCard.date}
                </span>
              </div>

              <h3 className="home-news-feature-title text-limit limit-3">
                {newsContent.featureCard.title}
              </h3>

              <p className="home-news-feature-desc text-limit limit-4">
                {newsContent.featureCard.desc}
              </p>

              <div className="home-news-card-footer">
                <Link
                  className="home-news-text-link"
                  href={newsContent.featureCard.href}
                >
                  {newsContent.detailText}
                </Link>
              </div>
            </div>
          </article>

          {/* 中间：重点公告深蓝卡片 */}
          <article className="home-news-highlight-card">
            <div className="home-news-highlight-meta">
              <span className="home-news-highlight-type">
                {newsContent.highlightCard.category}
              </span>
              <span className="home-news-highlight-date">
                {newsContent.highlightCard.date}
              </span>
            </div>

            <h3 className="home-news-highlight-title text-limit limit-3">
              {newsContent.highlightCard.title}
            </h3>

            <p className="home-news-highlight-desc text-limit limit-5">
              {newsContent.highlightCard.desc}
            </p>

            <div className="home-news-highlight-footer">
              <Link
                className="home-news-highlight-btn"
                href={newsContent.highlightCard.href}
                aria-label={newsContent.detailText}
              >
                {newsContent.detailText}
              </Link>
            </div>
          </article>

          {/* 右侧：推荐资讯列表 */}
          <aside className="home-news-right" aria-label="新闻列表">
            <div className="home-news-list-panel">
              {newsContent.sideNews.map((item) => (
                <article className="home-news-list-item" key={item.id}>
                  <div
                    className="home-news-list-thumb"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="home-news-list-content">
                    <div className="home-news-list-header">
                      <h3 className="home-news-list-title">{item.title}</h3>
                    </div>

                    <p className="home-news-list-desc text-limit limit-2">
                      {item.desc}
                    </p>

                    <div className="home-news-list-bottom">
                      <span className="home-news-list-date">{item.date}</span>

                      <Link className="home-news-list-more" href={item.href}>
                        {newsContent.detailText}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 右下角查看全部按钮 */}
            <div className="home-news-bottom-actions">
              <Link className="home-news-view-all-btn" href="/news">
                {newsContent.viewAllText} <span>›</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}