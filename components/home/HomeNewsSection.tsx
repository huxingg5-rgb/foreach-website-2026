"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * HomeNewsSection
 * 首页第 5 屏：资讯中心
 *
 * 说明：
 * 1. 当前新闻内容先写在前端数组里，方便第一阶段快速上线
 * 2. 后续开发后台时，可以把这里改成从数据库 / CMS / API 获取
 * 3. 顶部分类按钮默认不选中，点击后才显示选中状态
 */
export default function HomeNewsSection() {
  /** 当前选中的资讯分类 */
  const [activeTab, setActiveTab] = useState("");

  /** 顶部资讯分类 */
  const tabs = ["公司动态", "通知公告", "知识分享"];

  /** 右侧新闻列表，后续可由后端接口返回 */
  const newsList = [
    {
      title: "微流体液路系统中泵阀传感器如何协同工作？",
      desc: "从样本处理、试剂分配、清洗废液和多通道切换场景，理解核心部件的系统价值。",
    },
    {
      title: "如何为自动化分析仪器选择合适的隔膜泵？",
      desc: "围绕流量、压力、寿命、介质兼容性和噪音等因素，梳理常见选型维度。",
    },
    {
      title: "高压流体控制场景下旋转阀的关键选型因素",
      desc: "关注耐压、内腔体积、接口形式、通道数量与长期稳定性，辅助系统方案判断。",
    },
  ];

  return (
    <section className="screen-section news-screen" aria-labelledby="news-title">
      <div className="screen-inner">
        <header className="news-header">
          <h2 id="news-title" className="news-main-title">
            资讯中心
          </h2>

          <div className="news-tabs" aria-label="资讯分类切换">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`news-tab-btn ${activeTab === tab ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link className="more-news-link" href="/news">
            更多新闻 <span>›</span>
          </Link>
        </header>

        <div className="news-layout">
          <article className="news-card news-feature-card">
            <div className="news-feature-image" aria-hidden="true">
              <span className="news-feature-lines" />
            </div>

            <div className="news-feature-body">
              <div className="news-meta-row">
                <span className="news-category">公司动态</span>
                <span className="news-date">2026/05/16</span>
              </div>

              <h3 className="news-title">
                恒永达持续推进微流体系统核心零部件与液路方案能力建设，为
                IVD、生命科学与实验室自动化客户提供稳定的产品支持。
              </h3>

              <div className="news-card-footer">
                <Link className="text-link" href="/news">
                  查看详情 <span>→</span>
                </Link>
              </div>
            </div>
          </article>

          <article className="news-highlight-card">
            <div className="highlight-meta">
              <span className="highlight-type">通知公告</span>
              <span className="highlight-date">2026/05/16</span>
            </div>

            <h3 className="highlight-title">
              恒永达官网升级项目启动，将围绕产品展示、技术内容、询盘承接与后续优化持续完善。
            </h3>

            <p className="highlight-desc">
              本次升级将重点优化首页信息结构、产品中心、应用领域、技术文章与联系我们模块，
              提升客户获取资料、了解产品与提交询盘的效率，并为多语言内容和后续运营预留空间。
            </p>

            <div className="highlight-footer">
              <Link className="highlight-btn" href="/news" aria-label="查看公告详情">
                →
              </Link>
            </div>
          </article>

          <aside className="news-list-panel" aria-label="新闻列表">
            {newsList.map((item) => (
              <article className="news-list-item" key={item.title}>
                <div className="list-thumb" aria-hidden="true" />

                <div>
                  <h3 className="news-list-title">{item.title}</h3>
                  <p className="news-list-desc">{item.desc}</p>
                  <Link className="news-list-arrow" href="/news" aria-label="查看详情">
                    →
                  </Link>
                </div>
              </article>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
