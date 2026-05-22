/* =========================================================
   ResearchManufacturingPageContent.tsx
   恒永达官网｜研发与制造能力页面内容组件

   文件路径：
   components/about/ResearchManufacturingPageContent.tsx

   说明：
   1. 这个文件只负责“页面结构 + 页面交互”
   2. 所有文字、图片路径、SEO 数据都放在 data/about-research-manufacturing.ts
   3. 当前组件是客户端组件，因为应用场景卡片需要点击居中
   4. 样式统一放在 app/globals.css
========================================================= */

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
    getResearchManufacturingText,
    researchManufacturingImages,
    type ResearchManufacturingLocale,
} from "@/data/about-research-manufacturing";

/* =========================================================
   组件参数类型
   说明：
   1. 中文页面传 locale="zh-CN"
   2. 多语言页面传 locale="en" / "es" / "fr" / "ko" / "ru"
========================================================= */
type ResearchManufacturingPageContentProps = {
    locale: ResearchManufacturingLocale;
};

/* =========================================================
   页面主组件
========================================================= */

/* =========================================================
   为什么选择恒永达｜SVG 图标组件
   说明：
   1. index = 0 对应研发前置
   2. index = 1 对应定制与灵活配套
   3. index = 2 对应工程服务支持
   4. 图标颜色通过 CSS 的 currentColor 控制
========================================================= */
function ResearchManufacturingWhyIcon({ index }: { index: number }) {
    if (index === 0) {
        return (
            <svg
                className="rm-why-svg"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
            >
                <path
                    d="M730.88 59.392l4.416-4.288 152.192 147.2-46.592 45.056-152.256-147.136 42.24-40.832zM138.432 548.224c0-14.72 5.44-27.264 16.192-37.632l415.488-399.68a53.504 53.504 0 0 1 38.4-15.68 54.528 54.528 0 0 1 38.784 15.68l197.888 191.808a49.28 49.28 0 0 1 16.448 37.44c0 14.72-5.504 27.2-16.384 37.376l-124.544 120c1.92 3.072 3.584 6.144 5.12 9.344 93.568 67.776 141.44 142.848 143.616 225.216v0.512a302.72 302.72 0 0 1-62.848 169.792h148.608v64H368.128v-64h350.08a254.72 254.72 0 0 0 59.008-75.84c14.976-29.44 23.872-60.48 26.496-93.12a228.288 228.288 0 0 0-71.552-141.12c-6.912 21.76-19.776 40.128-38.528 55.04a119.04 119.04 0 0 1-75.52 26.24 120.192 120.192 0 0 1-62.08-16.32L431.36 777.216a53.376 53.376 0 0 1-38.912 15.68 54.72 54.72 0 0 1-38.272-15.104L154.688 585.856a50.304 50.304 0 0 1-16.192-37.632z m20.608-33.024z m449.408-351.872L210.688 548.48l181.888 175.872 118.08-113.728a111.36 111.36 0 0 1-13.376-53.12 110.4 110.4 0 0 1 35.072-82.56 117.76 117.76 0 0 1 84.992-34.176 120.896 120.896 0 0 1 56.96 13.76l116.672-112.32-182.464-178.88z m-29.632 431.36a53.504 53.504 0 0 0 38.784 15.488 53.44 53.44 0 0 0 38.656-15.68 49.664 49.664 0 0 0 15.68-37.312 49.152 49.152 0 0 0-15.744-36.672 53.056 53.056 0 0 0-38.272-15.232 53.504 53.504 0 0 0-38.848 15.168 49.664 49.664 0 0 0-16.128 37.12c0 14.464 5.248 26.88 15.872 37.12z m-492.16 2.112l4.544-4.224 234.304 236.352-47.616 44.16-234.24-236.416 43.008-39.872z"
                    fill="currentColor"
                />
            </svg>
        );
    }

    if (index === 1) {
        return (
            <svg
                className="rm-why-svg"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
            >
                <path
                    d="M872.06052 415.040651L356.162486 930.938684l-17.32175 10.410116-273.521526 55.378403h-6.954298a34.600836 34.600836 0 0 1-34.600836-41.555134l55.378403-273.521526a34.472842 34.472842 0 0 1 10.410116-17.32175L608.94911 144.932277 747.437781 9.899423a34.600836 34.600836 0 0 1 48.466769 0l218.143123 218.143123c13.225967 13.481953 13.225967 34.984815 0 48.466769L872.06052 415.040651zM144.930997 705.883927l-41.555134 211.188825 211.231489-41.51247L802.816184 390.764602 633.13983 221.130912 144.930997 705.883927zM768.215349 82.599576l-86.608751 86.60875 169.676355 169.63369 86.60875-86.566086-169.676354-169.676354zM439.870057 270.920277L259.186285 99.921326 89.595259 269.640345l31.145018 34.600836 62.290038-62.290038a34.600836 34.600836 0 0 1 48.509433 48.466769L165.708565 356.163766l13.865933 17.32175 58.876884-58.876884A34.600836 34.600836 0 1 1 286.875486 363.075401L224.585449 425.408102a34.6435 34.6435 0 0 1-51.922586 41.555135L9.898143 293.831065a34.6435 34.6435 0 0 1 0-48.466769L228.041266 27.221173a34.6435 34.6435 0 0 1 48.466769 0l205.941102 205.941102-42.57908 37.758002z m148.258821 531.939852l69.287-69.287001a34.600836 34.600836 0 0 1 48.466769 48.509433l-62.332702 62.290038 24.233385 20.777567 65.788518-65.788519a34.600836 34.600836 0 0 1 48.509434 48.509433l-65.831184 65.788519 31.145019 27.689201 169.719019-169.676354-175.692036-183.670281 42.024443-42.067107L989.814289 747.481726c13.225967 13.439289 13.225967 34.984815 0 48.466768l-218.143123 218.143124a34.6435 34.6435 0 0 1-48.466769 0l-169.676355-152.354605a35.667446 35.667446 0 0 1 34.600836-58.876884z"
                    fill="currentColor"
                />
            </svg>
        );
    }

    return (
        <svg
            className="rm-why-svg"
            viewBox="0 0 1024 1024"
            aria-hidden="true"
        >
            <path
                d="M781.568 667.648V356.394667L512 200.746667 242.346667 356.394667v311.253333L512 823.296l269.568-155.648zM157.056 344.021333l0.597333-8.448a64 64 0 0 1 31.402667-46.933333l290.944-167.978667 7.637333-3.754666a64 64 0 0 1 48.725334 0l7.637333 3.754666 290.901333 167.936a64 64 0 0 1 31.402667 46.933334l0.597333 8.490666v335.914667c0 22.869333-12.202667 44.032-32 55.466667l-290.901333 167.936a64 64 0 0 1-64 0L189.013333 735.402667a64.042667 64.042667 0 0 1-32-55.466667V344.021333z"
                fill="currentColor"
            />
            <path
                className="rm-why-svg-accent"
                d="M720.896 391.552a42.666667 42.666667 0 0 1-15.616 58.282667l-150.357333 86.784v170.112a42.666667 42.666667 0 1 1-85.333334 0v-170.154667l-144.64-83.456a42.666667 42.666667 0 1 1 42.666667-73.898667l144.64 83.498667 150.357333-86.784a42.666667 42.666667 0 0 1 58.282667 15.616z"
                fill="var(--rm-cyan)"
            />
        </svg>
    );
}

export default function ResearchManufacturingPageContent({
    locale,
}: ResearchManufacturingPageContentProps) {
    /* =========================================================
       从 data 文件中获取当前语言的页面文案
    ========================================================= */
    const text = getResearchManufacturingText(locale);

    /* =========================================================
       三大中心卡片当前展开项
       null 代表没有卡片展开
    ========================================================= */
    const [activeAbility, setActiveAbility] = useState<number | null>(null);

    /* =========================================================
       流程模块当前悬停项
       null 代表显示默认标题
    ========================================================= */
    const [processIndex, setProcessIndex] = useState<number | null>(null);

    /* =========================================================
       产品应用场景当前居中卡片
       默认 2 = 第三张，也就是“高端分析仪器”
    ========================================================= */
    const [applicationIndex, setApplicationIndex] = useState(2);

    /* =========================================================
       产品应用场景卡片轨道 DOM
       用来计算点击后卡片居中的偏移距离
    ========================================================= */
    const applicationTrackRef = useRef<HTMLDivElement | null>(null);

    /* =========================================================
       当前流程步骤内容
    ========================================================= */
    const currentProcess =
        processIndex === null ? null : text.processSteps[processIndex];

    /* =========================================================
       三大中心图片数组
       说明：
       文字在 data 里，图片路径在 data 的 images 里
    ========================================================= */
    const abilityImages = [
        researchManufacturingImages.ability.researchCenter,
        researchManufacturingImages.ability.machiningCenter,
        researchManufacturingImages.ability.extrusionCenter,
    ];

    /* =========================================================
       应用场景图片数组
    ========================================================= */
    const applicationImages = [
        researchManufacturingImages.applications.ivd,
        researchManufacturingImages.applications.lifeScience,
        researchManufacturingImages.applications.analyticalInstrument,
        researchManufacturingImages.applications.syntheticBiology,
        researchManufacturingImages.applications.labAutomation,
    ];

    /* =========================================================
       应用场景卡片居中逻辑
  
       重点说明：
       1. 点击下方文字节点可以居中
       2. 点击上方图片卡片也可以居中
       3. 使用 offsetWidth，而不是 getBoundingClientRect().width
          因为卡片有 scale 放大缩小，getBoundingClientRect 会受视觉缩放影响
          容易导致 IVD 第一次点击不完全居中
    ========================================================= */
    useEffect(() => {
        const track = applicationTrackRef.current;
        if (!track) return;

        const windowEl = track.parentElement;
        const activeCard = track.children[applicationIndex] as
            | HTMLElement
            | undefined;

        if (!windowEl || !activeCard) return;

        const windowWidth = windowEl.getBoundingClientRect().width;
        const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
        const distance = cardCenter - windowWidth / 2;

        track.style.transform = `translateX(-${distance}px)`;
    }, [applicationIndex]);

    /* =========================================================
       浏览器窗口变化时，重新计算应用场景卡片居中位置
    ========================================================= */
    useEffect(() => {
        const handleResize = () => {
            const track = applicationTrackRef.current;
            if (!track) return;

            const windowEl = track.parentElement;
            const activeCard = track.children[applicationIndex] as
                | HTMLElement
                | undefined;

            if (!windowEl || !activeCard) return;

            const windowWidth = windowEl.getBoundingClientRect().width;
            const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
            const distance = cardCenter - windowWidth / 2;

            /*
              resize 时先关闭动画，避免窗口变化时卡片来回滑动
            */
            track.style.transition = "none";
            track.style.transform = `translateX(-${distance}px)`;

            /*
              下一帧恢复动画
            */
            window.requestAnimationFrame(() => {
                track.style.transition = "transform 0.48s ease";
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [applicationIndex]);

    return (
        <main className="rm-page">
            {/* ================================
          第一屏：Banner
      ================================= */}
            <section className="rm-hero">
                <Image
                    className="rm-hero-image"
                    src={researchManufacturingImages.banner}
                    alt={text.hero.alt}
                    fill
                    priority
                    sizes="100vw"
                />

                <div className="rm-hero-overlay" />

                <div className="rm-container rm-hero-inner">
                    <h1 className="rm-hero-title">{text.hero.title}</h1>
                    <p className="rm-hero-desc">{text.hero.desc}</p>
                    <div className="rm-hero-line" />
                </div>
            </section>

            {/* ================================
          第二屏：页面导入
      ================================= */}
            <section className="rm-intro">
                <div className="rm-container rm-intro-layout">
                    <div className="rm-intro-image">
                        <Image
                            src={researchManufacturingImages.intro}
                            alt={text.intro.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 55vw"
                        />

                        {/* 
  左下角图片说明标签
  说明：
  1. 如果 data 里 intro.imageMark 有文字，就显示标签
  2. 如果 intro.imageMark 是空字符串，就不显示这个标签
*/}
                        {text.intro.imageMark ? (
                            <div className="rm-image-mark">{text.intro.imageMark}</div>
                        ) : null}
                    </div>

                    <div className="rm-intro-copy">
                        <h2 className="rm-section-title">{text.intro.title}</h2>
                        <p className="rm-section-desc">{text.intro.desc}</p>
                    </div>
                </div>
            </section>

            {/* ================================
          第三屏：研发与制造实力
      ================================= */}
            <section className="rm-ability">
                <div className="rm-container-wide">
                    <div className="rm-section-head">
                        <h2 className="rm-section-title">{text.abilityTitle}</h2>
                    </div>

                    <div className="rm-card-grid">
                        {text.abilityCards.map((card, index) => (
                            <article
                                className={`rm-card ${activeAbility === index ? "is-expanded" : ""
                                    }`}
                                key={card.title}
                                onMouseEnter={() => setActiveAbility(index)}
                                onMouseLeave={() => setActiveAbility(null)}
                            >
                                <div className="rm-card-image">
                                    <Image
                                        src={abilityImages[index]}
                                        alt={card.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                <div className="rm-card-body">
                                    <h3 className="rm-card-title">{card.title}</h3>

                                    <div className="rm-card-list-area">
                                        <ul className="rm-card-list">
                                            {card.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================
          第四屏：从需求到交付流程
      ================================= */}
            <section
                className={`rm-process ${processIndex !== null ? "is-hovering" : ""}`}
                onMouseLeave={() => setProcessIndex(null)}
            >
                <Image
                    className="rm-process-image"
                    src={researchManufacturingImages.process}
                    alt={text.processAlt}
                    fill
                    sizes="100vw"
                />

                <div className="rm-process-overlay" />

                <div className="rm-process-content">
                    <div className="rm-process-title">
                        {currentProcess ? (
                            <>
                                <span className="rm-process-title-main">
                                    {currentProcess.title}
                                </span>

                                <ul className="rm-process-title-list">
                                    {currentProcess.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            text.processDefault
                        )}
                    </div>

                    <div className="rm-process-steps">
                        {text.processSteps.map((step, index) => (
                            <button
                                className={`rm-process-step ${processIndex === index ? "is-active" : ""
                                    }`}
                                key={step.no}
                                type="button"
                                onMouseEnter={() => setProcessIndex(index)}
                            >
                                <span>{step.no}</span>
                                <strong>{step.title}</strong>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================
          第五屏：产品应用与验证场景
      ================================= */}
            <section className="rm-supply">
                <div className="rm-container-wide">
                    <div className="rm-supply-head">
                        <h2 className="rm-section-title">{text.applications.title}</h2>
                        <p className="rm-section-desc">{text.applications.desc}</p>
                    </div>

                    <div className="rm-supply-carousel">
                        <div className="rm-supply-window">
                            <div className="rm-supply-track" ref={applicationTrackRef}>
                                {text.applications.cards.map((card, index) => {
                                    const isActive = applicationIndex === index;
                                    const isNeighbor =
                                        applicationIndex - 1 === index ||
                                        applicationIndex + 1 === index;

                                    return (
                                        <button
                                            className={`rm-supply-card ${isActive ? "is-active" : ""
                                                } ${isNeighbor ? "is-neighbor" : ""}`}
                                            key={card.title}
                                            type="button"
                                            onClick={() => setApplicationIndex(index)}
                                        >
                                            <Image
                                                className="rm-supply-image"
                                                src={applicationImages[index]}
                                                alt={card.alt}
                                                fill
                                                sizes="650px"
                                            />

                                            <div className="rm-supply-mask" />

                                            <div className="rm-supply-copy">
                                                <h3 className="rm-supply-title">{card.title}</h3>
                                                <p className="rm-supply-desc">{card.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rm-supply-navigator">
                            <div
                                className="rm-supply-timeline"
                                aria-label={text.applications.title}
                            >
                                {text.applications.cards.map((card, index) => (
                                    <button
                                        className={`rm-supply-nav-item ${applicationIndex === index ? "is-active" : ""
                                            }`}
                                        key={card.title}
                                        type="button"
                                        onClick={() => setApplicationIndex(index)}
                                    >
                                        <span>{card.title}</span>
                                        <span className="rm-supply-nav-dot" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

  {/* ================================
    第六屏：为什么选择恒永达
================================ */}
<section className="rm-why">
  <Image
    className="rm-why-bg"
    src={researchManufacturingImages.why}
    alt={text.why.alt}
    fill
    sizes="100vw"
  />

  <div className="rm-why-bg-mask" />

  <div className="rm-container-wide">
    <div className="rm-why-head">
      <h2 className="rm-why-title">{text.why.title}</h2>
      <p className="rm-why-subtitle">{text.why.subtitle}</p>
    </div>

    {/* 
      这里注意：
      rm-why-grid 只能出现一次。
      里面通过 map 渲染 3 张卡片。
      不要在 map 外面再套一层 map。
    */}
    <div className="rm-why-grid">
      {text.why.cards.map((card, index) => (
        <article className="rm-why-card" key={card.title}>
          <div className="rm-why-icon">
            <ResearchManufacturingWhyIcon index={index} />
          </div>

          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </article>
      ))}
    </div>
  </div>
</section> 

            {/* ================================
          第七屏：底部联系
      ================================= */}
            <section className="rm-cta">
                <Image
                    className="rm-cta-bg"
                    src={researchManufacturingImages.cta}
                    alt={text.cta.alt}
                    fill
                    sizes="100vw"
                />

                <div className="rm-cta-mask" />

                <div className="rm-container">
                    <div className="rm-cta-panel">
                        <div>
                            <h2 className="rm-cta-title">{text.cta.title}</h2>
                            <p className="rm-cta-desc">{text.cta.desc}</p>
                        </div>

                        <a
                            className="rm-cta-button"
                            href={locale === "zh-CN" ? "/contact" : `/${locale}/contact`}
                        >
                            {text.cta.button}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
} 