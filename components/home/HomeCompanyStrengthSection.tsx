// components/home/HomeCompanyStrengthSection.tsx

import Link from "next/link"; // 引入 Next.js Link，用于站内跳转

import {
  getLocaleAnchorPath, // 多语言锚点路径，例如中文 /#contact，英文 /en#contact
  type LocaleCode, // 官网语言类型
} from "@/lib/i18n";

type HomeCompanyStrengthSectionProps = {
  locale: LocaleCode; // 当前语言
};

const metrics = [
  { value: "10", suffix: "+", label: "年微流体部件研发与应用积累" },
  { value: "6", suffix: "类", label: "核心液路部件产品体系" },
  { value: "50", suffix: "+", label: "自动化仪器集成场景经验" },
  { value: "24", suffix: "h", label: "技术响应与项目支持机制" },
];

const honors = [
  "质量管理体系",
  "研发制造能力",
  "产品测试验证",
  "企业资质认证",
  "供应链协同",
  "项目交付经验",
];

const advantages = [
  {
    className: "home-advantage-rd",
    index: "01",
    title: "研发能力",
    brief: "围绕泵、阀、传感器和液路模块持续打磨产品结构。",
    detail: "支持从样机验证、参数匹配到批量应用的工程化协同。",
  },
  {
    className: "home-advantage-manufacturing",
    index: "02",
    title: "制造交付",
    brief: "建立稳定的装配、测试和交付流程。",
    detail: "面向 IVD、生命科学和自动化设备客户提供持续供货支持。",
  },
  {
    className: "home-advantage-quality",
    index: "03",
    title: "质量体系",
    brief: "关注关键尺寸、流量、压力、寿命与一致性。",
    detail: "用过程管理和测试验证降低客户整机集成风险。",
  },
  {
    className: "home-advantage-custom",
    index: "04",
    title: "定制支持",
    brief: "可根据空间、接口、介质和控制方式调整方案。",
    detail: "帮助客户把核心部件更顺畅地嵌入整机液路系统。",
  },
  {
    className: "home-advantage-service",
    index: "05",
    title: "技术服务",
    brief: "从选型、测试到问题定位提供工程支持。",
    detail: "让产品沟通不止停留在规格表，而是落到真实应用场景。",
  },
];

/**
 * HomeCompanyStrengthSection
 * 首页第三屏 + 第四屏：公司介绍、能力数据、企业优势
 *
 * 说明：
 * 1. 样式继续使用 app/globals.css 中已有的 home-company-* 类名
 * 2. 组件只负责结构和内容，避免再把 HomePageContent 写进来造成循环引用
 */
export default function HomeCompanyStrengthSection({
  locale,
}: HomeCompanyStrengthSectionProps) {
  const contactHref = getLocaleAnchorPath(locale, "contact");

  return (
    <>
      <section className="home-company-about-section" id="about">
        <div className="home-company-about-shell">
          <div className="home-company-about-main">
            <div className="home-company-about-left">
              <h2 className="home-company-about-title">
                关于 FOREACH
                <span>MICROFLUIDIC SYSTEM PARTNER</span>
              </h2>

              <div className="home-company-video-wrap" aria-label="公司能力展示">
                <div className="home-company-video-media" aria-hidden="true" />
                <button className="home-company-video-play" type="button" aria-label="播放公司视频" />
              </div>
            </div>

            <div className="home-company-about-right">
              <h3 className="home-company-intro-title">
                专注于微流体系统核心零部件与液路集成支持
              </h3>

              <p className="home-company-intro-desc">
                FOREACH 围绕泵、阀、传感器、管路连接件、采样针和驱动控制模块，
                为 IVD、生命科学、高端分析仪器、合成生物和实验室自动化客户提供稳定的产品与系统级液路支持。
              </p>

              <div className="home-company-metrics-grid">
                {metrics.map((metric) => (
                  <div className="home-company-metric-card" key={metric.label}>
                    <strong>
                      <span className="home-metric-number">{metric.value}</span>
                      <span className="home-metric-suffix">{metric.suffix}</span>
                    </strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="home-company-about-actions">
                <Link className="home-company-primary-btn" href={contactHref}>
                  联系我们
                </Link>
              </div>
            </div>
          </div>

          <div className="home-honor-carousel-section" aria-label="公司能力与资质">
            <div className="home-honor-carousel-mask">
              <div className="home-honor-track">
                {[...honors, ...honors].map((honor, index) => (
                  <div className="home-honor-card" key={`${honor}-${index}`}>
                    <div className="home-honor-image" aria-hidden="true" />
                    <strong>{honor}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-company-advantages-section" aria-labelledby="advantages-title">
        <div className="home-advantages-head">
          <p className="home-advantages-kicker">COMPANY STRENGTH</p>
          <h2 className="home-advantages-title" id="advantages-title">
            从核心部件到液路系统的长期能力
          </h2>
          <p className="home-advantages-desc">
            以研发、制造、质量、定制和服务能力为基础，帮助客户降低液路集成复杂度。
          </p>
        </div>

        <div className="home-advantage-panels">
          {advantages.map((advantage) => (
            <article
              className={`home-advantage-panel ${advantage.className}`}
              key={advantage.title}
            >
              <div className="home-panel-content">
                <span className="home-panel-index">{advantage.index}</span>
                <h3 className="home-panel-title">{advantage.title}</h3>
                <span className="home-panel-line" />
                <p className="home-panel-brief">{advantage.brief}</p>
                <p className="home-panel-detail">{advantage.detail}</p>
                <span className="home-panel-arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
