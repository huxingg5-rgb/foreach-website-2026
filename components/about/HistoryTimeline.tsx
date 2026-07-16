"use client";

/* =========================================================
   HistoryTimeline.tsx
   恒永达官网｜发展历程时间轴组件

例如以后要加 2026 年，你只需要做两件事。
第一，把图片放进去：
public/images/about/history/history-2026.jpg
第二，在 data/historyMilestones.ts 里加一条：
{
  id: "2026",
  year: 2026,
  image: "/images/about/history/history-2026.jpg",
  imageAlt: "恒永达 2026 年发展历程配图",
  imageSide: "left",
  events: [
    "这里写 2026 年第一条事件",
    "这里写 2026 年第二条事件",
  ],
  enabled: true,
},


   作用：
   1. 接收年份数据 items
   2. 自动渲染左右交错时间轴
   3. 支持滚动进入动效
   4. 支持图片和文字 hover 后，中轴圆点变为荧光青
   5. 后续接后端时，只要把接口数据传进 items 即可

   注意：
   这个组件用到了 IntersectionObserver，所以必须是客户端组件。
========================================================= */

import { useEffect, useRef } from "react";
import type { HistoryMilestone } from "@/data/historyMilestones";

type HistoryTimelineProps = {
  /* 发展历程数据列表 */
  items: HistoryMilestone[];
  locale: string;
};

export default function HistoryTimeline({
  items,
  locale,
}: HistoryTimelineProps) {
  /* 保存每一行年份节点的 DOM，用于滚动进入动效 */
  const rowRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    /* IntersectionObserver：
       当年份模块进入屏幕时，给它加上 is-visible 类名
    */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          /* 进入后就停止观察，避免反复滚动造成动画重复触发 */
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="about-history-section"
      aria-label={locale === "zh-CN" ? "恒永达发展历程" : "FOREACH milestones"}
    >
      <div className="about-history-container">
        {/* 中间竖线 */}
        <div className="about-history-center-line" aria-hidden="true" />

        {items.map((item, index) => {
          /* imageSide 为 right 时：左边文字，右边图片 */
          const isReverse = item.imageSide === "right";

          return (
            <article
              key={item.id}
              id={`y${item.id}`}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className={
                isReverse
                  ? "about-history-row about-history-row--reverse"
                  : "about-history-row"
              }
            >
              {/* 左侧区域：
                  - 默认情况：左边是图片
                  - reverse 情况：左边是文字
              */}
              <div className="about-history-col about-history-col--left">
                {isReverse ? renderText(item, locale) : renderImage(item)}
              </div>

              {/* 中间圆点 */}
              <div className="about-history-node" aria-hidden="true" />

              {/* 右侧区域：
                  - 默认情况：右边是文字
                  - reverse 情况：右边是图片
              */}
              <div className="about-history-col about-history-col--right">
                {isReverse ? renderImage(item) : renderText(item, locale)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   渲染图片区域
   说明：
   1. 使用 background-image，而不是直接 import 图片
   2. 后续你只要替换 public/images/about/history/ 里的图片即可
   3. 即使图片暂时不存在，也会显示渐变占位背景
   4. aspect-ratio 保证图片不变形
========================================================= */
function renderImage(item: HistoryMilestone) {
  return (
    <div
      className="about-history-image"
      role="img"
      aria-label={item.imageAlt}
      style={{
        backgroundImage: `
          linear-gradient(rgba(23, 51, 104, 0.08), rgba(23, 51, 104, 0.08)),
          url("${item.image}"),
          linear-gradient(135deg, #dce7f5 0%, #8ea9c8 100%)
        `,
      }}
    />
  );
}

/* =========================================================
   渲染文字区域
   说明：
   1. 年份为主标题
   2. 多条事件直接分行展示
   3. 不使用 1、2、3
   4. 不使用项目符号
========================================================= */
function renderText(item: HistoryMilestone, locale: string) {
  return (
    <div className="about-history-text">
      <h2 className="about-history-year">
        {item.year}
        {locale === "zh-CN" ? "年" : ""}
      </h2>

      <ul className="about-history-list">
        {item.events.map((event) => (
          <li key={event}>{event}</li>
        ))}
      </ul>
    </div>
  );
}
