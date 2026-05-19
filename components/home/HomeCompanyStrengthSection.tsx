// components/home/HomeCompanyStrengthSection.tsx
"use client";

// 首页第三 / 第四屏：公司介绍 + 企业优势
//
// 说明：
// 1. 这个组件只负责页面结构、数字动画和内容渲染
// 2. 具体文字、数据卡片、能力轮播、企业优势内容，统一从 data/home-company-strength.ts 读取
// 3. 这样后续做多语言时，不需要在组件里到处找中文文字
// 4. 样式继续使用 app/globals.css 中已有的 home-company-* 类名

import Link from "next/link"; // Next.js 站内跳转组件
import { useEffect, useRef, useState } from "react";

import {
  getLocaleAnchorPath, // 多语言锚点路径，例如中文 /#contact，英文 /en#contact
  type LocaleCode, // 官网语言类型
} from "@/lib/i18n";

import {
  getHomeCompanyText, // 公司实力模块多语言读取函数
  homeCompanyStrengthData, // 公司实力模块数据
} from "@/data/home-company-strength";

/* ================================
   组件参数类型
================================ */

type HomeCompanyStrengthSectionProps = {
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
};

/**
 * HomeCompanyStrengthSection
 * 首页第三屏 + 第四屏：公司介绍、能力数据、企业优势
 *
 * 页面结构：
 * 1. 第三屏：走进恒永达科技 / 公司介绍 / 数据卡片 / 能力轮播
 * 2. 第四屏：COMPANY STRENGTH / 企业优势卡片
 *
 * 多语言说明：
 * 1. 所有文字从 data/home-company-strength.ts 读取
 * 2. 如果某个语言没有写，会自动回退到中文
 */
export default function HomeCompanyStrengthSection({
  locale,
}: HomeCompanyStrengthSectionProps) {
  // 公司介绍区域数据
  const aboutData = homeCompanyStrengthData.about;

  // 公司数据卡片
  const metrics = homeCompanyStrengthData.metrics;

  // 公司能力与资质轮播
  const honors = homeCompanyStrengthData.honors;

  // 企业优势标题区
  const advantagesSection = homeCompanyStrengthData.advantagesSection;

  // 企业优势卡片
  const advantages = homeCompanyStrengthData.advantages;

  // 数据卡片区域 DOM，用于判断是否进入视口
  const metricsGridRef = useRef<HTMLDivElement | null>(null);
  const companyVideoRef = useRef<HTMLVideoElement | null>(null);

  // requestAnimationFrame 的 id，用于组件卸载时取消动画
  const animationFrameRef = useRef<number | null>(null);

  // 是否开始数字计数动画
  const [shouldAnimateMetrics, setShouldAnimateMetrics] = useState(false);
  const [isCompanyVideoPosterVisible, setIsCompanyVideoPosterVisible] =
    useState(true);

  // 当前动画中的数字值
  const [animatedMetricValues, setAnimatedMetricValues] = useState(() =>
    metrics.map(() => 0),
  );

  // 联系我们按钮链接
  // 中文：/#contact
  // 英文：/en#contact
  const contactHref = getLocaleAnchorPath(locale, "contact");

function handleCompanyVideoPosterClick() {
  const video = companyVideoRef.current;

  setIsCompanyVideoPosterVisible(false);

  if (video) {
    video.controls = true;
    void video.play();
  }
}

  /* ================================
     监听数据卡片是否进入视口

     说明：
     1. 进入视口后启动数字动画
     2. 只触发一次，触发后 observer.disconnect()
  ================================ */

  useEffect(() => {
    const metricsGrid = metricsGridRef.current;

    if (!metricsGrid) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldAnimateMetrics(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
      },
    );

    observer.observe(metricsGrid);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ================================
     数据卡片数字动画

     说明：
     1. shouldAnimateMetrics 变为 true 后开始动画
     2. 动画时长 1200ms
     3. 使用 easeOutCubic，让数字变化更自然
  ================================ */

  useEffect(() => {
    if (!shouldAnimateMetrics) {
      return;
    }

    const startedAt = performance.now();
    const duration = 1200;

    function easeOutCubic(progress: number) {
      return 1 - Math.pow(1 - progress, 3);
    }

    function updateMetricValues(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setAnimatedMetricValues(
        metrics.map((metric) => Math.round(metric.value * easedProgress)),
      );

      if (progress < 1) {
        animationFrameRef.current =
          window.requestAnimationFrame(updateMetricValues);
      }
    }

    animationFrameRef.current = window.requestAnimationFrame(updateMetricValues);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldAnimateMetrics, metrics]);

  return (
    <>
      {/* ================================
          第三屏：公司介绍区域
      ================================ */}
      <section className="home-company-about-section" id={aboutData.sectionId}>
        <div className="home-company-about-shell">
          <div className="home-company-about-main">
            {/* 左侧：标题 + 视频占位 */}
            <div className="home-company-about-left">
              <h2 className="home-company-about-title">
                {getHomeCompanyText(aboutData.title, locale)}

                <span>{getHomeCompanyText(aboutData.subtitle, locale)}</span>
              </h2>

<div
  className="home-company-video-wrap"
  aria-label={getHomeCompanyText(aboutData.videoAriaLabel, locale)}
>
  {/* 
    公司介绍视频

    说明：
    1. controls={false}：未点击前不显示浏览器自带控制条
    2. 点击封面后，隐藏封面，并通过 JS 播放视频
    3. poster 可以保留，但真正固定封面靠下面的 img
    4. preload="metadata"：只加载视频基础信息，不让首页太重
  */}
  <video
    ref={companyVideoRef}
    className="home-company-video-media"
    src="/images/home/foreach-company-intro.mp4"
    poster="/images/home/tv-foreach.png"
    controls={!isCompanyVideoPosterVisible}
    preload="metadata"
    playsInline
    onPlay={() => setIsCompanyVideoPosterVisible(false)}
    onPlaying={() => setIsCompanyVideoPosterVisible(false)}
    onEnded={() => setIsCompanyVideoPosterVisible(true)}
    onPause={(event) => {
      /*
        只有视频回到开头时，才重新显示封面。
        如果用户只是暂停在中间，不要把封面盖回来。
      */
      if (event.currentTarget.currentTime <= 0.1) {
        setIsCompanyVideoPosterVisible(true);
      }
    }}
  >
    当前浏览器不支持视频播放。
  </video>

  {/* 
    固定封面层

    说明：
    1. 未播放前显示
    2. 点击后隐藏
    3. 这里是真正固定封面的关键，不再只依赖 video 的 poster
  */}
  {isCompanyVideoPosterVisible && (
    <button
      className="home-company-video-poster-button"
      type="button"
      aria-label={getHomeCompanyText(aboutData.videoPlayAriaLabel, locale)}
      onClick={handleCompanyVideoPosterClick}
    >
      <img
        className="home-company-video-poster-image"
        src="/images/home/tv-foreach.png"
        alt="恒永达公司宣传片封面"
      />

      <span className="home-company-video-play" aria-hidden="true" />
    </button>
  )}
</div>

            </div>

            {/* 右侧：公司介绍 + 数据卡片 + 联系按钮 */}
            <div className="home-company-about-right">
              <h3 className="home-company-intro-title">
                {getHomeCompanyText(aboutData.introTitle, locale)}
              </h3>

<p className="home-company-intro-desc">
  {getHomeCompanyText(homeCompanyStrengthData.about.introDescription, locale)}
</p>

              <div
                ref={metricsGridRef}
                className={
                  shouldAnimateMetrics
                    ? "home-company-metrics-grid is-counting"
                    : "home-company-metrics-grid"
                }
              >
                {metrics.map((metric, index) => (
                  <div className="home-company-metric-card" key={metric.key}>
                    <strong>
                      <span className="home-metric-number">
                        {animatedMetricValues[index]}
                      </span>

                      <span className="home-metric-suffix">
                        {getHomeCompanyText(metric.suffix, locale)}
                      </span>
                    </strong>

                    <span>{getHomeCompanyText(metric.label, locale)}</span>
                  </div>
                ))}
              </div>

              <div className="home-company-about-actions">
                <Link className="home-company-primary-btn" href={contactHref}>
                  {getHomeCompanyText(aboutData.contactButton, locale)}
                </Link>
              </div>
            </div>
          </div>

          {/* 公司能力与资质轮播 */}
          <div
            className="home-honor-carousel-section"
            aria-label={getHomeCompanyText(
              homeCompanyStrengthData.honorsAriaLabel,
              locale,
            )}
          >
            <div className="home-honor-carousel-mask">
              <div className="home-honor-track">
                {[...honors, ...honors].map((honor, index) => (
                  <div
                    className="home-honor-card"
                    key={`${honor.key}-${index}`}
                  >
                    <div className="home-honor-image" aria-hidden="true" />

                    <strong>{getHomeCompanyText(honor.title, locale)}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          第四屏：企业优势区域
      ================================ */}
      <section
        className="home-company-advantages-section"
        aria-labelledby="advantages-title"
      >
        <div className="home-advantages-head">
          <p className="home-advantages-kicker">
            {getHomeCompanyText(advantagesSection.kicker, locale)}
          </p>

          <h2 className="home-advantages-title" id="advantages-title">
            {getHomeCompanyText(advantagesSection.title, locale)}
          </h2>

          <p className="home-advantages-desc">
            {getHomeCompanyText(advantagesSection.description, locale)}
          </p>
        </div>

        <div className="home-advantage-panels">
          {advantages.map((advantage) => (
            <article
              className={`home-advantage-panel ${advantage.className}`}
              key={advantage.key}
            >
              <div className="home-panel-content">
                <span className="home-panel-index">{advantage.index}</span>

                <h3 className="home-panel-title">
                  {getHomeCompanyText(advantage.title, locale)}
                </h3>

                <span className="home-panel-line" />

                <p className="home-panel-brief">
                  {getHomeCompanyText(advantage.brief, locale)}
                </p>

                <p className="home-panel-detail">
                  {getHomeCompanyText(advantage.detail, locale)}
                </p>

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
