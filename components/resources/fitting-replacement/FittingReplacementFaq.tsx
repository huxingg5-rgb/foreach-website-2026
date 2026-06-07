"use client";

/* =========================================================
   FittingReplacementFaq.tsx
   恒永达官网｜接头替代查询详情页 FAQ 组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementFaq.tsx

   作用：
   1. 用于 Q20 接头替代查询详情页底部 FAQ
   2. FAQ 文案从详情页 detailText.faq 传入
   3. 支持中文 / 英文 / 西语 / 法语 / 韩语 / 俄语
   4. 默认展开第一个问题
   5. 点击问题标题可以展开 / 收起

   注意：
   1. q20.detail.intl.ts 使用 as const
   2. 所以这里 items 必须支持 readonly 数组
========================================================= */

import { useState } from "react";

interface FittingReplacementFaqItem {
  readonly question: string;
  readonly answer: string;
}

interface FittingReplacementFaqText {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly FittingReplacementFaqItem[];
}

interface FittingReplacementFaqProps {
  text: FittingReplacementFaqText;
}

export default function FittingReplacementFaq({
  text,
}: FittingReplacementFaqProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="frd-faq-section" aria-labelledby="frd-faq-title">
      <div className="frd-faq-layout">
        <div className="frd-faq-heading">
          <span>{text.eyebrow}</span>
          <h2 id="frd-faq-title">{text.title}</h2>
          <p>{text.description}</p>
        </div>

        <div className="frd-faq-list">
          {text.items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                className={isActive ? "frd-faq-item is-active" : "frd-faq-item"}
                key={`${item.question}-${index}`}
              >
                <button
                  className="frd-faq-question"
                  type="button"
                  onClick={() => {
                    setActiveIndex(isActive ? -1 : index);
                  }}
                >
                  <span>{item.question}</span>
                  <em>{isActive ? "−" : "+"}</em>
                </button>

                {isActive ? (
                  <div className="frd-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 