// components/home/HomeApplicationFlowSection.tsx
"use client"; // 这一块需要监听滚动和点击，所以必须是客户端组件

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { getLocaleAnchorPath, type LocaleCode } from "@/lib/i18n";

import {
  getHomeFlowText,
  homeApplicationFlowData,
} from "@/data/home-application-flow";

/* ================================
   组件参数类型
================================ */
type HomeApplicationFlowSectionProps = {
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
};

/* ================================
   本组件内部使用的多语言文本类型

   说明：
   这里不强依赖 data 文件导出的类型，
   避免因为类型名不同导致报错。
================================ */
type LocalizedText = Partial<Record<LocaleCode, string>>;

/* ================================
   手机端应用卡片类型

   说明：
   1. 手机端不需要 PC 端的 className
   2. 手机端只需要标题、描述、图片、标签
   3. 这里单独定义，是为了不破坏 PC 端原来的 applicationCards 类型
================================ */
type HomeFlowMobileApplicationCard = {
  key: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  tags: {
    key: string;
    label: LocalizedText;
  }[];
};

/* ================================
   限制数值范围

   说明：
   把数值限制在 min 和 max 之间。
================================ */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/* ================================
   区间映射函数

   说明：
   把滚动进度映射成动画进度。
================================ */
function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const progress = clamp((value - inMin) / (inMax - inMin), 0, 1);

  return outMin + (outMax - outMin) * progress;
}

/* ================================
   卡片图片背景

   说明：
   1. 图片路径来自 data/home-application-flow.ts
   2. 如果图片暂时不存在，仍然会显示渐变底色
================================ */
function createCardImageBackground(imagePath: string): CSSProperties {
  return {
    backgroundImage: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.06)),
      url("${imagePath}")
    `,
  };
}

/* ================================
   PC 端电视机背景图

   说明：
   电视里面的图片路径来自 data/home-application-flow.ts。
================================ */
function createTvBackground(imagePath: string): CSSProperties {
  return {
    backgroundImage: `
      linear-gradient(135deg, rgba(3, 18, 42, 0.62), rgba(0, 38, 86, 0.72)),
      url("${imagePath}")
    `,
  };
}

/* ================================
   手机端电视展示屏背景图

   说明：
   1. 如果是图片路径，就叠加深蓝遮罩，保证文字可读
   2. 如果是渐变背景，就直接使用
   3. 这样后期既能用真实图片，也能用渐变占位
================================ */
function createMobileTvBackground(imagePath: string): CSSProperties {
  const isGradient =
    imagePath.startsWith("linear-gradient") ||
    imagePath.startsWith("radial-gradient");

  if (isGradient) {
    return {
      backgroundImage: imagePath,
    };
  }

  return {
    backgroundImage: `
      linear-gradient(135deg, rgba(3, 18, 42, 0.72), rgba(0, 38, 86, 0.78)),
      url("${imagePath}")
    `,
  };
}

/* ================================
   判断是否为手机 / 触摸设备

   说明：
   1. 手机端旧卡片点击放大逻辑会用到
   2. PC 端继续使用 hover 效果
================================ */
function isTouchLikeDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(
    "(hover: none), (pointer: coarse), (max-width: 768px)",
  ).matches;
}

/**
 * HomeApplicationFlowSection
 * 首页第二屏：应用领域 × 核心部件
 *
 * 当前版本说明：
 * 1. PC 端：保留原来的电视机 + 5 张漂浮卡片 + 滚动动画
 * 2. 手机端：新增“电视展示屏 + 应用按钮切换”结构
 * 3. 手机端：显示 6 个按钮，新增“微流体领域”
 * 4. 手机端：去掉 Application Fields 小标题
 * 5. 手机端：去掉电视机外层和应用按钮外层的大圆角矩形
 */
export default function HomeApplicationFlowSection({
  locale,
}: HomeApplicationFlowSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null); // 第二屏区域
  const tvStageRef = useRef<HTMLDivElement | null>(null); // PC 端电视舞台区域

  // 旧手机端点击放大卡片逻辑保留，避免影响原来代码
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);

  // 新手机端结构：当前选中的应用按钮下标
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // 新手机端结构：切换动效状态
  const [isMobileChanging, setIsMobileChanging] = useState(false);

  // 根据当前语言生成按钮链接
  const applicationsHref = getLocaleAnchorPath(locale, "applications");
  const productsHref = getLocaleAnchorPath(locale, "products");

  /* ================================
     手机端应用数据

     说明：
     1. PC 端继续用 homeApplicationFlowData.applicationCards
     2. 手机端这里单独生成一组数据
     3. 前 5 个从 PC 应用卡片里复用
     4. 第 6 个新增“微流体领域”
     5. 这样你的 data 文件就算没有 mobileApplicationCards，也不会报错
  ================================ */
  const mobileApplicationCards = useMemo<HomeFlowMobileApplicationCard[]>(() => {
    const desktopCards = homeApplicationFlowData.applicationCards.map((card) => ({
      key: card.key,
      title: card.title,
      description: card.description,
      image: card.image,
      imageAlt: card.imageAlt,
      tags: card.tags,
    }));

    const orderedDesktopCards = [...desktopCards].sort((a, b) => {
      const order = [
        "analytical-instruments",
        "life-science",
        "synthetic-biology",
        "lab-automation",
        "ivd",
      ];

      return order.indexOf(a.key) - order.indexOf(b.key);
    });

    const microfluidicsCard: HomeFlowMobileApplicationCard = {
      key: "microfluidics",
      title: {
        "zh-CN": "微流体领域",
      },
      description: {
        "zh-CN":
          "面向微量液体控制、精密分配、低内腔体积流路与模块化微流体系统集成。",
      },
      // 这里先复用电视机背景图，避免因为没有新增图片导致页面空白
      // 后期可以换成：/images/home/application-flow/microfluidics.jpg
      image: homeApplicationFlowData.tv.image,
      imageAlt: {
        "zh-CN": "微流体领域液路应用场景",
      },
      tags: [
        {
          key: "micro-dispensing",
          label: {
            "zh-CN": "微量分配",
          },
        },
        {
          key: "low-internal-volume",
          label: {
            "zh-CN": "低内腔体积",
          },
        },
        {
          key: "precision-fluid-control",
          label: {
            "zh-CN": "精密流控",
          },
        },
        {
          key: "system-integration",
          label: {
            "zh-CN": "系统集成",
          },
        },
      ],
    };

    return [...orderedDesktopCards, microfluidicsCard];
  }, []);

  const activeMobileApplication = mobileApplicationCards[activeMobileIndex];

  useEffect(() => {
    let animationFrameId = 0;

    function updateProductShowcase() {
      const section = sectionRef.current;
      const tvStage = tvStageRef.current;

      if (!section || !tvStage) {
        return;
      }

      const rect = section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const scrollDistance = section.offsetHeight - viewportHeight;

      if (scrollDistance <= 0) {
        return;
      }

      const progress = clamp(-rect.top / scrollDistance, 0, 1);

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      const shrink = isMobile
        ? mapRange(progress, 0.34, 0.9, 0, 1)
        : mapRange(progress, 0.08, 0.7, 0, 1);

      const fade = isMobile
        ? mapRange(progress, 0.64, 0.95, 0, 1)
        : shrink;

      const slogan = isMobile
        ? mapRange(progress, 0.78, 0.98, 0, 1)
        : mapRange(progress, 0.58, 0.9, 0, 1);

      tvStage.style.setProperty("--shrink", shrink.toFixed(4));
      tvStage.style.setProperty("--fade", fade.toFixed(4));
      tvStage.style.setProperty("--slogan", slogan.toFixed(4));

      if (fade > 0.92) {
        tvStage.classList.add("is-finished");
      } else {
        tvStage.classList.remove("is-finished");
      }
    }

    function requestUpdate() {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateProductShowcase);
    }

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  /* ================================
     旧手机端点击卡片逻辑

     说明：
     这部分先保留，避免影响你原来的 PC / 旧手机交互逻辑。
  ================================ */
  function handleCardClick(cardKey: string) {
    if (!isTouchLikeDevice()) {
      return;
    }

    setActiveCardKey((currentKey) => {
      if (currentKey === cardKey) {
        return null;
      }

      return cardKey;
    });
  }

  function handleStageClick() {
    if (!isTouchLikeDevice()) {
      return;
    }

    setActiveCardKey(null);
  }

  function getMobileFillClass(cardKey: string) {
    if (!activeCardKey || activeCardKey === cardKey) {
      return "";
    }

    const otherCards = homeApplicationFlowData.applicationCards.filter(
      (card) => card.key !== activeCardKey,
    );

    const fillIndex = otherCards.findIndex((card) => card.key === cardKey) + 1;

    if (fillIndex <= 0) {
      return "";
    }

    return `mobile-fill-${fillIndex}`;
  }

  /* ================================
     手机端应用按钮切换

     说明：
     1. 点击按钮后切换电视屏幕内容
     2. 加 170ms 动效，和 H5 预览保持一致
  ================================ */
  function handleMobileApplicationChange(nextIndex: number) {
    if (nextIndex === activeMobileIndex) {
      return;
    }

    setIsMobileChanging(true);

    window.setTimeout(() => {
      setActiveMobileIndex(nextIndex);
      setIsMobileChanging(false);
    }, 170);
  }

  return (
    <section
      ref={sectionRef}
      className="home-flow-section"
      id={homeApplicationFlowData.sectionId}
    >
      <div className="home-flow-sticky">
        <div className="home-flow-inner">
          {/* 左侧文案区 */}
          <div className="home-flow-copy">
            <h2 className="home-flow-title">
              {getHomeFlowText(homeApplicationFlowData.titleLine1, locale)}

              <br />

              {getHomeFlowText(homeApplicationFlowData.titleLine2, locale)}
            </h2>

            <p className="home-flow-desc">
              {getHomeFlowText(homeApplicationFlowData.description, locale)}
            </p>

            <div className="home-flow-capability-row">
              {homeApplicationFlowData.capabilityTags.map((tag) => (
                <span key={tag.key}>
                  {getHomeFlowText(tag.label, locale)}
                </span>
              ))}
            </div>

            <div className="home-flow-actions">
              <Link href={applicationsHref} className="home-flow-btn">
                {getHomeFlowText(
                  homeApplicationFlowData.actions.applicationsLabel,
                  locale,
                )}
              </Link>

              <Link href={productsHref} className="home-flow-btn">
                {getHomeFlowText(
                  homeApplicationFlowData.actions.productsLabel,
                  locale,
                )}
              </Link>
            </div>
          </div>

          {/* PC 端右侧电视舞台 */}
          <div
            ref={tvStageRef}
            className="home-flow-tv-stage"
            onClick={handleStageClick}
          >
            <div className="home-flow-tv-frame">
              <div className="home-flow-tv-screen">
                <div
                  className="home-flow-tv-image"
                  style={createTvBackground(homeApplicationFlowData.tv.image)}
                />

                <div className="home-flow-tv-grid" />

                <div className="home-flow-tv-slogan">
                  {homeApplicationFlowData.tv.sloganPrefix}{" "}
                  <span>{homeApplicationFlowData.tv.sloganHighlight}</span>{" "}
                  {homeApplicationFlowData.tv.sloganSuffix}
                </div>
              </div>
            </div>

            {homeApplicationFlowData.applicationCards.map((card) => {
              const isActive = activeCardKey === card.key;
              const mobileFillClass = getMobileFillClass(card.key);

              return (
                <article
                  key={card.key}
                  className={[
                    "home-flow-industry-card",
                    card.className,
                    isActive ? "is-touch-active" : "",
                    mobileFillClass,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCardClick(card.key);
                  }}
                >
                  <div
                    className={`home-flow-industry-image image-${card.className}`}
                    style={createCardImageBackground(card.image)}
                    aria-label={getHomeFlowText(card.imageAlt, locale)}
                  />

                  <h3>{getHomeFlowText(card.title, locale)}</h3>

                  <p>{getHomeFlowText(card.description, locale)}</p>

                  <div className="home-flow-tags">
                    {card.tags.map((tag) => (
                      <span key={tag.key}>
                        {getHomeFlowText(tag.label, locale)}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* 手机端应用展示：电视展示屏 + 6 个按钮 */}
          <div className="home-flow-mobile-stage" aria-label="手机端应用场景展示">
            <section
              className="home-flow-mobile-tv-card"
              aria-label="应用场景展示屏"
            >
              <div className="home-flow-mobile-tv-screen">
                <div
                  className={
                    isMobileChanging
                      ? "home-flow-mobile-tv-image-layer is-changing"
                      : "home-flow-mobile-tv-image-layer"
                  }
                  style={createMobileTvBackground(activeMobileApplication.image)}
                />

                <div
                  className={
                    isMobileChanging
                      ? "home-flow-mobile-tv-content is-changing"
                      : "home-flow-mobile-tv-content"
                  }
                >
                  <div className="home-flow-mobile-tv-topline">
                    <span className="home-flow-mobile-tv-current-index">
                      {String(activeMobileIndex + 1).padStart(2, "0")} /{" "}
                      {String(mobileApplicationCards.length).padStart(2, "0")}
                    </span>

                    <span className="home-flow-mobile-tv-mini-slogan">
                      {homeApplicationFlowData.tv.sloganPrefix}{" "}
                      <span>{homeApplicationFlowData.tv.sloganHighlight}</span>{" "}
                      {homeApplicationFlowData.tv.sloganSuffix}
                    </span>
                  </div>

                  <div className="home-flow-mobile-tv-main">
                    <h3 className="home-flow-mobile-tv-title">
                      {getHomeFlowText(activeMobileApplication.title, locale)}
                    </h3>

                    <p className="home-flow-mobile-tv-desc">
                      {getHomeFlowText(
                        activeMobileApplication.description,
                        locale,
                      )}
                    </p>

                    <div className="home-flow-mobile-tv-tags">
                      {activeMobileApplication.tags.map((tag) => (
                        <span key={tag.key}>
                          {getHomeFlowText(tag.label, locale)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="home-flow-mobile-app-tabs-wrap"
              aria-label="应用领域切换"
            >
              <div className="home-flow-mobile-app-tabs">
                {mobileApplicationCards.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    className={
                      index === activeMobileIndex
                        ? "home-flow-mobile-app-tab is-active"
                        : "home-flow-mobile-app-tab"
                    }
                    onClick={() => handleMobileApplicationChange(index)}
                  >
                    {getHomeFlowText(item.title, locale)}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* 底部流程卡片 */}
        <div className="home-flow-process-gallery">
          <div className="home-flow-process-grid">
            {homeApplicationFlowData.processCards.map((card) => (
              <div className="home-flow-process-card" key={card.key}>
                <strong>{getHomeFlowText(card.title, locale)}</strong>

                <span>{getHomeFlowText(card.description, locale)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}