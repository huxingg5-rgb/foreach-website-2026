"use client";

/* =========================================================
   FittingReplacementFaq.tsx
   恒永达官网｜接头型号替代查询详情页 FAQ 组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementFaq.tsx

   作用：
   1. 用于 Q20 接头型号替代详情页底部常见问题
   2. 解释客户在替代型号、图纸预览、图纸需求、清单提交时的常见疑问
   3. 默认展开第一个问题
   4. 点击问题标题可以展开 / 收起
   5. 当前为中文静态内容，后期做多语言时可以再抽到 data 层
========================================================= */

import { useState } from "react";

/* =========================================================
   FAQ 数据

   说明：
   1. 当前先写在组件内部，方便快速完成中文页面
   2. 后期如果 FAQ 要接后端、CMS 或多语言，再抽到：
      data/resources/fitting-replacement/faq.zh.ts
   3. 不影响当前详情页结构
========================================================= */
const FITTING_REPLACEMENT_FAQS = [
  {
    question: "这个替代型号可以直接替换原型号吗？",
    answer:
      "页面提供的是型号与结构参数的对应关系。最终适配仍需结合管径、材质、密封圈、安装空间、耐压要求和实际工况确认。",
  },
  {
    question: "预览图纸和添加图纸有什么区别？",
    answer:
      "预览图纸用于在线查看结构和尺寸；添加图纸表示后续提交清单时，希望我们把该型号的正式 2D 图纸纳入图纸发送范围。",
  },
  {
    question: "为什么图纸不是直接下载？",
    answer:
      "图纸会根据客户加入清单并标记的型号统一整理，避免客户下载错误型号。后续可通过需求提交、邮件或资料包方式统一发送。",
  },
  {
    question: "可以一次选择多个型号吗？",
    answer:
      "可以。多个型号可以加入同一个选型清单，并且每个型号都可以单独标记是否需要 2D 图纸。",
  },
  {
    question: "如果我不确定现有型号是否对应怎么办？",
    answer:
      "可以把现用型号、样品照片、BOM 或图纸提交给我们，由工程师进一步确认对应关系和适配风险。",
  },
  {
    question: "材质、密封圈或接口形式可以调整吗？",
    answer:
      "部分型号可根据应用需求进一步确认材质、密封圈或接口组合。具体能否调整，需要结合实际应用环境和工程评估结果确认。",
  },
];

/* =========================================================
   FAQ 组件
========================================================= */
export default function FittingReplacementFaq() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="frd-faq-section" aria-labelledby="frd-faq-title">
      <div className="frd-faq-layout">
        <div className="frd-faq-heading">
          <span>FAQ</span>
          <h2 id="frd-faq-title">常见问题</h2>
          <p>
            关于型号替代、图纸预览、图纸需求和清单提交的常见说明。
          </p>
        </div>

        <div className="frd-faq-list">
          {FITTING_REPLACEMENT_FAQS.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                className={isActive ? "frd-faq-item is-active" : "frd-faq-item"}
                key={item.question}
              >
                <button
                  className="frd-faq-question"
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => {
                    setActiveIndex(isActive ? -1 : index);
                  }}
                >
                  <span>{item.question}</span>
                  <em>{isActive ? "－" : "+"}</em>
                </button>

                {isActive && (
                  <div className="frd-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
} 