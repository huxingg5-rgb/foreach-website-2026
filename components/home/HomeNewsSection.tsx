// 这是关于 components/home/HomeNewsSection.tsx 的文件：用于管理首页第 5 屏“资讯中心”模块
// 这个文件的作用：负责资讯中心整体布局，包括顶部分类按钮、左侧推荐新闻、中间重点公告、右侧新闻列表

"use client"; // 这个组件需要点击分类按钮并切换 activeTab 状态，所以必须是客户端组件

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于新闻页面跳转
import { useState } from "react"; // 引入 React 的 useState，用于控制顶部分类按钮选中状态

import HomeNewsListItem from "@/components/home/HomeNewsListItem"; // 引入右侧单条新闻列表卡片组件

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru

type HomeNewsSectionProps = { // 定义 HomeNewsSection 组件接收的参数类型
  locale: LocaleCode; // 当前语言，例如 zh-CN、en、es、fr、ko、ru
}; // HomeNewsSectionProps 类型定义结束

type NewsTabKey = "company" | "notice" | "knowledge"; // 定义顶部资讯分类按钮的 key 类型

type HomeNewsMainCard = { // 定义左侧大卡片和中间公告卡片的数据类型
  category: string; // 新闻分类名称
  date: string; // 新闻日期
  title: string; // 新闻标题
  desc: string; // 新闻描述
  image: string; // 新闻图片路径，后期可替换为后端返回的图片 URL
  href: string; // 新闻跳转链接，后期可替换为真实新闻详情页链接
}; // HomeNewsMainCard 类型定义结束

type HomeNewsSideItem = { // 定义右侧新闻列表单条数据类型
  id: string; // 新闻稳定 ID，用于 React 列表 key，也方便后端数据识别
  title: string; // 新闻标题
  desc: string; // 新闻描述
  date: string; // 新闻日期
  image: string; // 新闻缩略图路径，后期可替换为后端返回的图片 URL
  href: string; // 新闻跳转链接，后期可替换为真实新闻详情页链接
}; // HomeNewsSideItem 类型定义结束

const zhNewsContent = { // 定义中文资讯中心内容，第一阶段先写在前端
  sectionTitle: "资讯中心", // 资讯模块标题
  detailText: "查看详情", // 查看详情按钮文字
  viewAllText: "查看全部", // 查看全部按钮文字

  tabs: [ // 顶部分类按钮数据
    { key: "company" as const, label: "公司动态" }, // 公司动态按钮
    { key: "notice" as const, label: "通知公告" }, // 通知公告按钮
    { key: "knowledge" as const, label: "知识分享" }, // 知识分享按钮
  ], // 顶部分类按钮数据结束

  featureCard: { // 左侧推荐新闻大卡片数据
    category: "公司动态", // 左侧大卡片分类
    date: "2026 / 05 / 16", // 左侧大卡片日期
    title: "恒永达持续推进微流体系统核心零部件与液路方案能力建设，为 IVD、生命科学与实验室自动化客户提供稳定的产品支持。", // 左侧大卡片标题
    desc: "围绕泵、阀、传感器、管路连接件和采样针等核心部件，持续完善面向自动化分析仪器的液路系统支持能力，帮助客户更高效地完成样本处理、试剂分配、清洗废液及多通道流路控制。", // 左侧大卡片描述
    image: "/images/home/news/news-feature-01.webp", // 左侧大卡片图片
    href: "/news", // 左侧大卡片跳转地址
  } satisfies HomeNewsMainCard, // 限定 featureCard 必须符合 HomeNewsMainCard 类型

  highlightCard: { // 中间重点公告深蓝卡片数据
    category: "通知公告", // 中间公告卡片分类
    date: "2026 / 05 / 16", // 中间公告卡片日期
    title: "恒永达官网升级项目启动，将围绕产品展示、技术内容、询盘承接与后续优化持续完善。", // 中间公告卡片标题
    desc: "本次升级将重点优化首页信息结构、产品中心、应用领域、技术文章与联系我们模块，提升客户获取资料、了解产品与提交询盘的效率，并为多语言内容和后续运营预留空间，同时为后端内容管理、SEO 和 GEO 布局打下基础。", // 中间公告卡片描述
    image: "", // 中间公告卡片暂时不使用图片
    href: "/news", // 中间公告卡片跳转地址
  } satisfies HomeNewsMainCard, // 限定 highlightCard 必须符合 HomeNewsMainCard 类型

  sideNews: [ // 右侧推荐资讯列表数据
    { // 第一条右侧新闻
      id: "news-01", // 新闻 ID
      title: "微流体液路系统中泵阀传感器如何协同工作？", // 新闻标题
      desc: "从样本处理、试剂分配、清洗废液和多通道切换场景，理解核心部件的系统价值。", // 新闻描述
      date: "2026 / 05 / 16", // 新闻日期
      image: "/images/home/news/news-side-01.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 第一条右侧新闻结束
    { // 第二条右侧新闻
      id: "news-02", // 新闻 ID
      title: "如何为自动化分析仪器选择合适的隔膜泵？", // 新闻标题
      desc: "围绕流量、压力、寿命、介质兼容性和噪音等因素，梳理常见选型维度。", // 新闻描述
      date: "2026 / 05 / 15", // 新闻日期
      image: "/images/home/news/news-side-02.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 第二条右侧新闻结束
    { // 第三条右侧新闻
      id: "news-03", // 新闻 ID
      title: "高压流体控制场景下旋转阀的关键选型因素", // 新闻标题
      desc: "关注耐压、内腔体积、接口形式、通道数量与长期稳定性，辅助系统方案判断。", // 新闻描述
      date: "2026 / 05 / 14", // 新闻日期
      image: "/images/home/news/news-side-03.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 第三条右侧新闻结束
    { // 第四条右侧新闻
      id: "news-04", // 新闻 ID
      title: "管路连接件在微流体系统稳定性中的作用", // 新闻标题
      desc: "从密封、死体积、材料兼容性和安装一致性等角度，理解连接件对整机液路可靠性的影响。", // 新闻描述
      date: "2026 / 05 / 13", // 新闻日期
      image: "/images/home/news/news-side-04.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 第四条右侧新闻结束
  ] satisfies HomeNewsSideItem[], // 限定 sideNews 必须符合 HomeNewsSideItem 数组类型
}; // 中文资讯中心内容结束

const enNewsContent = { // 定义英文兜底资讯中心内容，当前非中文语言先统一显示英文
  sectionTitle: "News Center", // 英文资讯模块标题
  detailText: "View Details", // 英文查看详情按钮文字
  viewAllText: "View All", // 英文查看全部按钮文字

  tabs: [ // 英文顶部分类按钮数据
    { key: "company" as const, label: "Company News" }, // 公司新闻按钮
    { key: "notice" as const, label: "Notices" }, // 通知公告按钮
    { key: "knowledge" as const, label: "Knowledge" }, // 知识分享按钮
  ], // 英文顶部分类按钮数据结束

  featureCard: { // 英文左侧推荐新闻大卡片数据
    category: "Company News", // 英文左侧大卡片分类
    date: "2026 / 05 / 16", // 英文左侧大卡片日期
    title: "FOREACH continues to strengthen its microfluidic core components and fluidic solution capabilities for IVD, life sciences, and laboratory automation customers.", // 英文左侧大卡片标题
    desc: "Focused on pumps, valves, sensors, fittings, tubing, and sampling probes, FOREACH continues to improve fluidic system support for automated analytical instruments.", // 英文左侧大卡片描述
    image: "/images/home/news/news-feature-01.webp", // 英文左侧大卡片图片
    href: "/news", // 英文左侧大卡片跳转地址
  } satisfies HomeNewsMainCard, // 限定 featureCard 必须符合 HomeNewsMainCard 类型

  highlightCard: { // 英文中间重点公告深蓝卡片数据
    category: "Notice", // 英文中间公告卡片分类
    date: "2026 / 05 / 16", // 英文中间公告卡片日期
    title: "FOREACH website upgrade project has started, focusing on product presentation, technical content, inquiry conversion, and continuous optimization.", // 英文中间公告卡片标题
    desc: "The upgrade will improve homepage structure, product center, application fields, technical articles, and contact modules, while reserving space for multilingual content and future operations.", // 英文中间公告卡片描述
    image: "", // 英文中间公告卡片暂时不使用图片
    href: "/news", // 英文中间公告卡片跳转地址
  } satisfies HomeNewsMainCard, // 限定 highlightCard 必须符合 HomeNewsMainCard 类型

  sideNews: [ // 英文右侧推荐资讯列表数据
    { // 英文第一条右侧新闻
      id: "news-01", // 新闻 ID
      title: "How do pumps, valves, and sensors work together in a microfluidic system?", // 新闻标题
      desc: "Understand the system value of core components from sample handling, reagent dispensing, cleaning, waste liquid processing, and multi-channel switching.", // 新闻描述
      date: "2026 / 05 / 16", // 新闻日期
      image: "/images/home/news/news-side-01.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 英文第一条右侧新闻结束
    { // 英文第二条右侧新闻
      id: "news-02", // 新闻 ID
      title: "How to select the right diaphragm pump for automated analytical instruments?", // 新闻标题
      desc: "Review common selection dimensions including flow rate, pressure, lifetime, media compatibility, and noise.", // 新闻描述
      date: "2026 / 05 / 15", // 新闻日期
      image: "/images/home/news/news-side-02.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 英文第二条右侧新闻结束
    { // 英文第三条右侧新闻
      id: "news-03", // 新闻 ID
      title: "Key selection factors for rotary valves in high-pressure fluid control", // 新闻标题
      desc: "Focus on pressure resistance, internal volume, port type, channel count, and long-term stability.", // 新闻描述
      date: "2026 / 05 / 14", // 新闻日期
      image: "/images/home/news/news-side-03.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 英文第三条右侧新闻结束
    { // 英文第四条右侧新闻
      id: "news-04", // 新闻 ID
      title: "The role of fittings in microfluidic system stability", // 新闻标题
      desc: "Understand how sealing, dead volume, material compatibility, and installation consistency affect fluidic reliability.", // 新闻描述
      date: "2026 / 05 / 13", // 新闻日期
      image: "/images/home/news/news-side-04.webp", // 新闻缩略图
      href: "/news", // 新闻跳转地址
    }, // 英文第四条右侧新闻结束
  ] satisfies HomeNewsSideItem[], // 限定 sideNews 必须符合 HomeNewsSideItem 数组类型
}; // 英文资讯中心内容结束

function getHomeNewsContent(locale: LocaleCode) { // 根据当前语言获取资讯中心内容
  if (locale === "zh-CN") { // 如果当前语言是中文
    return zhNewsContent; // 返回中文资讯内容
  } // 中文判断结束

  return enNewsContent; // 其他语言当前统一返回英文兜底内容
} // getHomeNewsContent 函数结束

export default function HomeNewsSection({ locale }: HomeNewsSectionProps) { // 定义并导出首页资讯中心组件
  const newsContent = getHomeNewsContent(locale); // 根据当前语言获取资讯中心内容

  const [activeTab, setActiveTab] = useState<NewsTabKey | "">(""); // 当前选中的分类，默认空字符串表示首页推荐状态

  return ( // 返回资讯中心模块结构
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
                <HomeNewsListItem
                  key={item.id}
                  item={item}
                  detailText={newsContent.detailText}
                />
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
  ); // 返回资讯中心模块结构结束
} // HomeNewsSection 组件结束